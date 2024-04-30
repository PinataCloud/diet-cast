"use client";

import { QRCode } from "react-qrcode-logo";
import { Button } from "./ui/button";
import { SignInButton } from "@farcaster/auth-kit";
import { CastForm } from "@/components/cast-form";
import { useEffect, useState } from "react";
import Link from "next/link";

export function SignIn() {
  const [deepLink, setDeepLink]: any = useState();
  const [openQR, setOpenQR] = useState(false);
  const [fid, setFid]: any = useState();
  const [signerId, setSignerId]: any = useState();

  async function createSigner() {
    try {
      const signerReq = await fetch(`/api/signer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const signerRes = await signerReq.json();
      setDeepLink(signerRes.deep_link_url);
      setOpenQR(true);

      const pollReq = await fetch(`/api/poll?token=${signerRes.token}`);
      const pollRes = await pollReq.json();
      const pollStartTime = Date.now();
      while (pollRes.state != "completed") {
        if (Date.now() - pollStartTime > 120000) {
          console.log("Polling timeout reached");
          alert("Request timed out");
          setOpenQR(false);
          break;
        }
        const pollReq = await fetch(`/api/poll?token=${signerRes.token}`);
        const pollRes = await pollReq.json();
        if (pollRes.state === "completed") {
          setDeepLink(null);
          setOpenQR(false);
          setSignerId(signerRes.signer_id);
          localStorage.setItem("signer_id", signerRes.signer_id);
          return pollRes;
        }
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function checkStorage(signature?: any, message?: any, nonce?: any) {
    try {
      if (typeof window != "undefined") {
        const signer = localStorage.getItem("signer_id");
        if (signer != null) {
          setSignerId(signer);
        } else {
          const data = JSON.stringify({
            message: message,
            signature: signature,
            nonce: nonce,
          });
          const signerReq = await fetch(`/api/retrieveSigner`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: data,
          });
          const signerRes = await signerReq.json();
          if (signerRes.signers && signerRes.signers.length > 0) {
            console.log("signer found and set");
            setSignerId(signerRes.signers[0].signer_uuid);
            localStorage.setItem("signer_id", signerRes.signers[0].signer_uuid);
          } else {
            console.log("no signer found");
            return;
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSignInSuccess({ fid, signature, message, nonce } : any){
    setFid(fid)
    checkStorage(signature, message, nonce)
  }

  useEffect(() => {
    checkStorage();
  }, []);

  return (
    <div className="mx-auto">
      {!signerId && fid && (
        <div className="flex flex-col gap-3">
          <Button onClick={createSigner}>Create Signer</Button>
          {openQR && (
            <div className="flex flex-col gap-3">
              <QRCode
                value={deepLink}
                size={250}
                qrStyle="fluid"
                eyeRadius={15}
              />
              <Link className="w-full" href={deepLink}>
                <Button className="w-full">Mobile Link</Button>
              </Link>
            </div>
          )}
        </div>
      )}

      {signerId && <CastForm signerId={signerId} />}

      {!fid && !signerId && (
        <SignInButton
          onSuccess={handleSignInSuccess}
        />
      )}
    </div>
  );
}

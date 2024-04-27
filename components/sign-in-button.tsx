"use client";

import { useSignIn, QRCode } from "@farcaster/auth-kit";
import { Button } from "./ui/button";

export function SignInButton() {
  const { signIn, url, data, connect, reconnect } = useSignIn({
    onSuccess: ({ fid }) => console.log("Your fid:", fid),
    onError: (error) => console.log("error: ", error),
  });

  async function submitHandler(){
    await connect()
    signIn()
    reconnect()
  }

  return (
    <div>
      <Button onClick={submitHandler}>Sign In</Button>
      {url && (
        <span>
          Scan this: <QRCode uri={url} />
        </span>
      )}
      {data?.username && `Hello, ${data?.username}!`}
    </div>
  );
}

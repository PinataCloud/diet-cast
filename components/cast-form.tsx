"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

import { z } from "zod";
import { uploadFile } from "@/utils/upload-file";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Image as Photo } from "lucide-react";

const formSchema = z.object({
  cast: z.string().min(2).max(320),
  file: z.any(),
});

interface FormProps {
  signerId: string;
}

export function CastForm({ signerId }: FormProps) {
  const [loading, setLoading] = useState(false);
  const [castComplete, setCastComplete] = useState(false);
  const [selectedFile, setSelecteFile] = useState();
  const [imageLoading, setImageLoading] = useState(false);

  async function fileChangeHandler(event: any) {
    setImageLoading(true);
    const file = event.target.files[0];
    console.log(file);
    setSelecteFile(file);
    setImageLoading(false);
  }

  async function reset() {
    setSelecteFile(undefined);
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cast: "",
      file: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      let fileLink;
      if (selectedFile) {
        fileLink = await uploadFile(selectedFile);
      }
      const data = JSON.stringify({
        signerId: signerId,
        castMessage: values.cast,
        fileLink: fileLink,
      });
      const submitMessage = await fetch("/api/cast", {
        method: "POST",
        headers: {
          contentType: "application/json",
        },
        body: data,
      });
      const messageJson = await submitMessage.json();
      console.log(messageJson);
      setLoading(false);
      if (!submitMessage.ok) {
        alert("Error sending cast");
        return;
      }
      setCastComplete(true);
    } catch (error) {
      console.log(error);
      alert("Error sending cast");
      setLoading(false);
    }
  }

  function ButtonLoading() {
    return (
      <Button className="w-full" disabled>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Please wait
      </Button>
    );
  }

  if (castComplete) {
    return (
      <div className="flex justify-center items-center h-full">
        <h2 className="text-xl font-bold">Cast Sent!</h2>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          {selectedFile && !imageLoading && (
            <div className="relative">
              <Image
                className="max-h-[250px] rounded-md sm:max-h-[500px] h-auto object-cover hover:cursor-pointer hover:opacity-80"
                width={500}
                height={500}
                src={URL.createObjectURL(selectedFile)}
                alt="User image"
                onClick={reset}
              />
            </div>
          )}
          {imageLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}

          <FormField
            control={form.control}
            name="cast"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Send a Cast to /diet-coke</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="mmmm diet coke"
                    className="resize-none w-[300px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {loading ? (
            ButtonLoading()
          ) : (
            <div className="flex justify-center items-center gap-4">
              <Label htmlFor="file-upload" className="cursor-pointer">
                <Photo className="h-10 w-10 hover:opacity-65" />
              </Label>
              <Input
                id="file-upload"
                type="file"
                onChange={fileChangeHandler}
                className="hidden"
              />
              <Button className="w-full" type="submit">
                Submit
              </Button>
            </div>
          )}
        </form>
      </Form>
    </div>
  );
}

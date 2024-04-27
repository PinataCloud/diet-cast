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
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea"


import { z } from "zod";

const formSchema = z.object({
  cast: z.string().min(2).max(320),
});

interface FormProps {
  signerId: any
}

export function CastForm({ signerId }: FormProps) {
  const [loading, setLoading] = useState(false);
  const [castComplete, setCastComplete] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cast: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true)
      const data = JSON.stringify({
        signerId: signerId,
        castMessage: values.cast,
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
      if(!submitMessage.ok){
        alert("Error sending cast");
        return
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
          <FormField
            control={form.control}
            name="cast"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Send a Cast</FormLabel>
                <FormControl>
                  <Textarea
                  placeholder="Hello World!"
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
            <Button className="w-full" type="submit">
              Submit
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
}

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import TextInput from "@/common/form/TextInput";
import "./style.css";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useStore } from "@/stores/store";
import { LoginRequestDto } from "@/models/user";
import { toast } from "react-toastify";

const FormSchema = z.object({
  email: z.string().email({
    message: "This must be a valid email",
  }),
  password: z.string().min(6, {
    message: "Password is too short.",
  }),
});

export function LoginPage() {
  const { userStore } = useStore();
  const { login } = userStore;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    login(data.email, data.password);
  }

  return (
    <div className="loginPageContainer">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-6"
            >
              <TextInput
                name="email"
                type="text"
                form={form}
                placeholder="Email"
                label="Email"
              />
              <TextInput
                name="password"
                type="password"
                form={form}
                placeholder="Password"
                label="Password"
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default LoginPage;

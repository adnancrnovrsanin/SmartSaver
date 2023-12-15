import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import TextInput from "@/common/form/TextInput";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import "./style.css";

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "This has to be a valid email.",
  }),
  password: z.string().min(6, {
    message: "Password is too short",
  }),
  confirmPassword: z.string().min(6, {
    message: "Password is too short",
  }),
});

export function RegisterPage() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <div className="registerPageContainer">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-6"
            >
              <TextInput
                name="username"
                type="text"
                label="Username"
                placeholder="Username"
                form={form}
              />
              <TextInput
                name="firstName"
                type="text"
                label="First name"
                placeholder="First name"
                form={form}
              />
              <TextInput
                name="lastName"
                type="text"
                label="Last name"
                placeholder="Last name"
                form={form}
              />
              <TextInput
                name="email"
                type="text"
                label="Email"
                placeholder="Email"
                form={form}
              />
              <TextInput
                name="password"
                type="password"
                label="Password"
                placeholder="Password"
                form={form}
              />
              <TextInput
                name="confirmPassword"
                type="password"
                label="Confirm password"
                placeholder="Confirm password"
                form={form}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default RegisterPage;

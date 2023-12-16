import React from "react";
import TextInput from "@/common/form/TextInput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CustomH1 } from "@/components/Typography/CustomH1";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { observer } from "mobx-react-lite";
import { useStore } from "@/stores/store";

const FormSchema = z.object({
  name: z.string().min(3, {
    message: "Name is too short.",
  }),
  address: z.string().min(3, {
    message: "Address is too short.",
  }),
  city: z.string().min(3, {
    message: "City is too short.",
  }),
  state: z.string().min(3, {
    message: "State is too short.",
  }),
  zipCode: z.string().min(3, {
    message: "Zip Code is too short.",
  }),
});

const AddNewHome: React.FC = () => {
  const { devicesStore } = useStore();
  const { setHomeData } = devicesStore;
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
    },
  });

  return (
    <div className="flex flex-col items-center justify-center">
      <CustomH1 text="Fill out the form" />
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Home registering</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="w-full space-y-6">
              <TextInput
                name="name"
                type="text"
                form={form}
                placeholder="Name"
              />
              <TextInput
                name="address"
                type="text"
                form={form}
                placeholder="Address"
              />
              <TextInput
                name="city"
                type="text"
                form={form}
                placeholder="City"
              />
              <TextInput
                name="state"
                type="text"
                form={form}
                placeholder="State"
              />
              <TextInput
                name="zipCode"
                type="text"
                form={form}
                placeholder="Zip Code"
              />

              <Button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  setHomeData({
                    name: form.getValues("name"),
                    address: form.getValues("address"),
                    city: form.getValues("city"),
                    state: form.getValues("state"),
                    zipCode: form.getValues("zipCode")
                  });
                }}
              >
                Submit
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default observer(AddNewHome);

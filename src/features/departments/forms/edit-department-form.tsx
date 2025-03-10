"use client";
import React, { FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUpdateDepartment } from "../mutations";
import { Button } from "@/components/ui/button";
import { useGetDepartmentBySlug } from "../queries";

type Props = {
  onSuccessCallback?: () => void;
  slug?: string;
};

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
});

const EditDepartmentForm: FC<Props> = ({ onSuccessCallback, slug }) => {
  const mutation = useUpdateDepartment({
    onSuccessCallback,
    slug: slug as string,
  });
  const { data, isLoading, isError } = useGetDepartmentBySlug(slug as string);

  const department = data?.data;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: department?.name,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate(values);
  }

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>An error occurred: </p>;

  if (!data) return <p>No data found</p>;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Department Name"
                  {...field}
                  value={field.value ?? department?.name ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" isLoading={mutation.isPending} variant="outline">
          Update
        </Button>
      </form>
    </Form>
  );
};

export default EditDepartmentForm;

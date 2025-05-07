"use client";

import React, { FC, useEffect } from "react";
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
import { useUpdateSubject } from "../mutations";
import { Button } from "@/components/ui/button";
import { useGetSubjectBySlug } from "../queries";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

import { useGetAllDepartments } from "@/features/departments/queries";

type Props = {
  onSuccessCallback?: () => void;
  slug?: string;
};

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  description: z.string(),
  departmentId: z.string(),
});

const EditSubjectForm: FC<Props> = ({ onSuccessCallback, slug }) => {
  const mutation = useUpdateSubject({
    onSuccessCallback,
    slug: slug as string,
  });

  const {
    data: departmentsData,
    isLoading: departmentsLoading,
    isError: departmentsError,
  } = useGetAllDepartments();
  const { data: subjectData, isLoading, isError } = useGetSubjectBySlug(slug);

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate(values);
  }

  const defaultValues = {
    name: "",
    description: "",
    departmentId: "",
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  useEffect(() => {
    if (subjectData) {
      form.reset({
        name: subjectData.name,
        description: subjectData.description,
        departmentId: subjectData.departmentId,
      });
    }
  }, [subjectData, form]);

  console.log("state", form.formState.defaultValues);

  if (isLoading || departmentsLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-32" />
      </div>
    );
  }

  // if (isError || departmentsError) return <p>An error occurred.</p>;

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
                <Input placeholder="Subject Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Subject Description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="departmentId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Department</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                value={field.value}
                disabled={departmentsLoading || departmentsError}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {departmentsData?.map((department) => (
                    <SelectItem key={department.id} value={department.id}>
                      {department.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={mutation.isPending} variant="outline">
          {mutation.isPending ? "Updating..." : "Update"}
        </Button>
      </form>
    </Form>
  );
};

export default EditSubjectForm;

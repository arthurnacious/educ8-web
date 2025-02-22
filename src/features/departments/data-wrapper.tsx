"use client";
import { DataTable } from "@/components/data-table";
import React, { FC, useState } from "react";
import { columns } from "./columns";
import { useGetAllDepartments } from "./queries/useGetAllDepartments";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import FlexDialog from "@/components/ui/flex-dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { set, useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useCreateDepartment } from "./mutations";

type Props = object;

// const filterColumns = [
//   { label: "Name", value: "name" },
//   { label: "Courses", value: "coursesCount" },
//   { label: "Lecturers", value: "lecturersCount" },
//   { label: "Leaders", value: "leadersCount" },
// ];
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
});

const DataWrapper: FC<Props> = ({}) => {
  const mutation = useCreateDepartment();
  const [open, setOpen] = useState(false);
  const { data: departments, isLoading, isError } = useGetAllDepartments();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate(values);
    setOpen(false);
  }

  return (
    <div>
      <div>
        <FlexDialog
          trigger={
            <Button onClick={() => setOpen(!open)}>
              Create new department
            </Button>
          }
          open={open}
          title="Create new department"
          description="Create a new department"
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Department Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" isLoading={mutation.isPending}>
                Create
              </Button>
            </form>
          </Form>
        </FlexDialog>
      </div>
      {isLoading && <p>Loading...</p>}
      {isError && <p>An error occurred: </p>}
      {departments && (
        <DataTable
          columns={columns}
          data={departments.data}
          defaultSortingColumn="name"
          // filterColumns={filterColumns}
        />
      )}
    </div>
  );
};

export default DataWrapper;

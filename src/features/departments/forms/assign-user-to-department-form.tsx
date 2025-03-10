"use client";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { FC } from "react";
import { departmentUserRole } from "@/types/roles";
import { useGetAllUsers } from "@/features/users/queries";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetDepartmentBySlug } from "../queries";
import { useAssignUserToDepartment } from "../mutations";
import SearchableSelect from "@/components/searchable-select";

interface Props {
  slug: string;
  onSuccess?: () => void;
}

const roles = Object.values(departmentUserRole);

const formSchema = z.object({
  userId: z.string().min(1, {
    message: "User Must be selected",
  }),
  role: z.nativeEnum(departmentUserRole).default(roles[0]),
});

const AssignUserToDepartmentForm: FC<Props> = ({ slug, onSuccess }) => {
  const { data: usersData, isLoading, isError } = useGetAllUsers();
  const { data: departmentsData } = useGetDepartmentBySlug(slug);
  const { mutate, isPending: isAssigning } = useAssignUserToDepartment({
    onSuccess,
    slug,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId: "",
      role: roles[0],
    },
  });

  const users = usersData?.data;
  const isDisabled = isLoading || (users && users.length === 0) || isAssigning;
  const department = departmentsData?.data;

  console.log({ users });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    mutate({ ...values, departmentId: department?.id as string });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="">
        <FormField
          control={form.control}
          name="userId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>User</FormLabel>
              <SearchableSelect
                path="/users"
                displayKey="name"
                valueKey="id"
                onValueChange={field.onChange}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={roles[0]}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="mt-6">
          <Button
            type="submit"
            className="w-full"
            variant="outline"
            disabled={isDisabled}
          >
            Assign Role
          </Button>
        </div>
      </form>
    </Form>
  );
};
export default AssignUserToDepartmentForm;

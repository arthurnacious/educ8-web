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
import { useGetAllUsers } from "@/features/users/queries";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetDepartmentBySlug, useGetDepartmentRoles } from "../queries";
import { useAssignUserToDepartment } from "../mutations";
import SearchableSelect from "@/components/searchable-select";

interface Props {
  slug: string;
  onSuccess?: () => void;
}

const formSchema = z.object({
  userId: z.string().min(1, {
    message: "User Must be selected",
  }),
  role: z.string().min(1, {
    message: "Role must be selected",
  }),
});

const AssignUserToDepartmentForm: FC<Props> = ({ slug, onSuccess }) => {
  const { data: usersData, isLoading: isLoadingUsers } = useGetAllUsers();
  const { data: departmentsData } = useGetDepartmentBySlug(slug);
  const { data: departmentRolesData, isLoading: isLoadingRoles } =
    useGetDepartmentRoles();

  const { mutate, isPending: isAssigning } = useAssignUserToDepartment({
    onSuccess,
    slug,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId: "",
      role: "",
    },
  });

  const users = usersData?.data;
  const department = departmentsData?.data;

  // Use dynamic roles if available, otherwise fallback to static roles
  const roles = departmentRolesData?.data;

  const isDisabled =
    isLoadingUsers ||
    isLoadingRoles ||
    (users && users.length === 0) ||
    isAssigning ||
    !department;

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    if (!department?.id) return;

    mutate({ ...values, departmentId: department.id });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
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
        {roles && (
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={isDisabled}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role.id} value={role.id}>
                        {role.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <Button
          type="submit"
          className="w-full mt-6"
          disabled={isDisabled}
          isLoading={isAssigning}
        >
          Attach Member
        </Button>
      </form>
    </Form>
  );
};

export default AssignUserToDepartmentForm;

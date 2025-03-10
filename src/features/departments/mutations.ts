import { useToast } from "@/hooks/use-toast";
import { api_url } from "@/lib/config";
import { departmentUserRole } from "@/types/roles";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type CreateProps = {
  setOpen: (open: boolean) => void;
};

type AssingUserToDepartmentProps = {
  onSuccess?: () => void;
  slug: string;
};

type UpdateProps = {
  onSuccessCallback?: () => void;
  slug: string;
};

export const useCreateDepartment = ({ setOpen }: CreateProps) => {
  const queryClient = useQueryClient();

  const createDepartment = async ({ name }: { name: string }) => {
    console.log("Submitting form", name);
    const response = await fetch(`${api_url}/departments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    if (!response.ok) {
      throw new Error("Failed to create department");
    }

    return response.json();
  };

  const mutation = useMutation({
    mutationFn: createDepartment,
    onSuccess: (data) => {
      console.log("Successfully created department", data);
      queryClient.invalidateQueries({ queryKey: ["departments"] });
      setOpen(false);
    },
    onError: (error) => {
      console.error("Error creating department:", error);
    },
  });

  return mutation;
};

export const useUpdateDepartment = ({
  onSuccessCallback,
  slug,
}: UpdateProps) => {
  const queryClient = useQueryClient();

  const createDepartment = async ({ name }: { name: string }) => {
    const response = await fetch(`${api_url}/departments/${slug}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    if (!response.ok) {
      throw new Error("Failed to create department");
    }

    return response.json();
  };

  const mutation = useMutation({
    mutationFn: createDepartment,
    onSuccess: (data) => {
      console.log(`Successfully updated department ${slug}`, data);
      queryClient.invalidateQueries({ queryKey: ["departments"] });
      queryClient.invalidateQueries({ queryKey: ["departments", slug] });
      if (onSuccessCallback) onSuccessCallback();
    },
    onError: (error) => {
      console.error("Error updating department:", error);
    },
  });

  return mutation;
};

export const useAssignUserToDepartment = ({
  onSuccess: callback,
  slug,
}: AssingUserToDepartmentProps) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const attachUserToDepartment = async ({
    userId,
    departmentId,
    role,
  }: {
    userId: string;
    departmentId: string;
    role: departmentUserRole;
  }) => {
    console.log("Submitting form", userId, departmentId, role);

    const response = await fetch(`${api_url}/departments/members`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, departmentId, role }),
    });

    if (!response.ok) {
      throw new Error("Failed to create department");
    }

    return response.json();
  };

  const mutation = useMutation({
    mutationFn: attachUserToDepartment,
    onSuccess: (data) => {
      console.log("Successfully attached User To department", data);

      queryClient.invalidateQueries({
        queryKey: ["departments", slug],
      });
      toast({
        title: "Success!",
        description: "User Successfully Assigned to Department",
      });
      if (callback) callback();
    },
    onError: (error) => {
      console.error("Error Attaching User To department:", error);
    },
  });

  return mutation;
};

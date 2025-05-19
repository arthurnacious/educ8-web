"use client";
import { useToast } from "@/hooks/use-toast";
import { api_url } from "@/lib/config";
import { useFetchClient } from "@/lib/fetch-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Department } from "./interface";

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
  const { fetchClient } = useFetchClient();
  const { toast } = useToast();

  const createDepartment = async ({ name }: { name: string }) => {
    const response = await fetchClient<{ data: Department }>(
      `${api_url}/departments`,
      {
        method: "POST",
        body: JSON.stringify({ name }),
      }
    );

    if (!response) {
      throw new Error("Failed to create department");
    }

    return response;
  };

  const mutation = useMutation({
    mutationFn: createDepartment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["departments"] });
      toast({
        title: "Success!",
        description: "Successfully created Department",
      });
      setOpen(false);
    },
    onError: (error) => {
      console.error("Error creating department:", error);
      toast({
        title: "Error!",
        description: "An error occurred while creating department",
        variant: "destructive",
      });
    },
  });

  return mutation;
};

export const useDeleteDepartments = ({
  onSuccess: callback,
}: {
  onSuccess?: () => void;
}) => {
  const { fetchClient } = useFetchClient();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: async ({ ids }: { ids: string[] }) => {
      const res = await fetchClient<{ data: Department[] }>(
        `${api_url}/departments`,
        {
          method: "PATCH",
          body: JSON.stringify({ ids }),
        }
      );

      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["departments"] });
      toast({
        title: "Success!",
        description: "Successfully deleted department(s).",
      });
      callback?.();
    },
    onError: (error) => {
      console.error("Error deleting departments:", error);
      toast({
        title: "Error!",
        description: "An error occurred while deleting departments.",
        variant: "destructive",
      });
    },
  });

  return mutation;
};

export const useUpdateDepartment = ({
  onSuccessCallback,
  slug,
}: UpdateProps) => {
  const { fetchClient } = useFetchClient();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const createDepartment = async ({ name }: { name: string }) => {
    const response = await fetchClient<{ data: Department }>(
      `${api_url}/departments/${slug}`,
      {
        method: "PUT",
        body: JSON.stringify({ name }),
      }
    );

    if (!response.data) {
      throw new Error("Failed to update department");
    }

    return response;
  };

  const mutation = useMutation({
    mutationFn: createDepartment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["departments"] });
      queryClient.invalidateQueries({ queryKey: ["departments", slug] });
      toast({
        title: "Success!",
        description: "Successfully updated to Department",
      });
      if (onSuccessCallback) onSuccessCallback();
    },
    onError: (error) => {
      console.error("Error updating department:", error);
      toast({
        title: "Error!",
        description: "An error occurred while updating department",
        variant: "destructive",
      });
    },
  });

  return mutation;
};

export const useAssignUserToDepartment = ({
  onSuccess: callback,
  slug,
}: AssingUserToDepartmentProps) => {
  const { fetchClient } = useFetchClient();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const attachUserToDepartment = async ({
    userId,
    departmentId,
    role,
  }: {
    userId: string;
    departmentId: string;
    role: string;
  }) => {
    const response = await fetchClient(`${api_url}/departments/members`, {
      method: "POST",
      body: JSON.stringify({ userId, departmentId, role }),
    });

    if (!response) {
      throw new Error("Failed to attach user to department");
    }

    return response;
  };

  const mutation = useMutation({
    mutationFn: attachUserToDepartment,
    onSuccess: () => {
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
      toast({
        title: "Error!",
        description: "An error occurred while assigning user to department",
        variant: "destructive",
      });
    },
  });

  return mutation;
};

export const useUnassignedMembersWithIds = ({
  onSuccess: callback,
  slug,
}: AssingUserToDepartmentProps) => {
  const { fetchClient } = useFetchClient();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const unassignUsersToDeprtment = async ({
    idObject,
  }: {
    idObject: { userId: string; departmentId: string }[];
  }) => {
    const response = await fetchClient(`${api_url}/departments/members`, {
      method: "PATCH",
      body: JSON.stringify({ idObject }),
    });

    if (!response) {
      throw new Error("Failed to remove users from department");
    }

    return response;
  };

  const mutation = useMutation({
    mutationFn: unassignUsersToDeprtment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["departments", slug],
      });
      toast({
        title: "Success!",
        description: "User Successfully Unassigned from Department",
      });
      if (callback) callback();
    },
    onError: (error) => {
      console.error("Error Unassigning User From department:", error);
      toast({
        title: "Error!",
        description: "An error occurred while Unassigning user to department",
        variant: "destructive",
      });
    },
  });

  return mutation;
};

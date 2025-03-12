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
  const { toast } = useToast();

  const createDepartment = async ({ name }: { name: string }) => {
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
  onSucces: callback,
}: {
  onSucces?: () => void;
}) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const deleteDepartment = async ({ ids }: { ids: string[] }) => {
    console.log(ids);
    const response = await fetch(`${api_url}/departments`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ids }),
    });

    if (!response.ok) {
      throw new Error("Failed to delete departments");
    }

    return response.json();
  };

  const mutation = useMutation({
    mutationFn: deleteDepartment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["departments"] });
      toast({
        title: "Success!",
        description: "Successfully deleted to Department",
      });
      if (callback) callback();
    },
    onError: (error) => {
      console.error("Error deleting departments:", error);
      toast({
        title: "Error!",
        description: "An error occurred while deleting departments",
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
  const queryClient = useQueryClient();
  const { toast } = useToast();

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
    const response = await fetch(`${api_url}/departments/members`, {
      method: "POST",
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
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const unassignUsersToDeprtment = async ({
    idObject,
  }: {
    idObject: { userId: string; departmentId: string }[];
  }) => {
    const response = await fetch(`${api_url}/departments/members`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idObject }),
    });

    if (!response.ok) {
      throw new Error("Failed to create department");
    }

    return response.json();
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

import { api_url } from "@/lib/config";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type CreateProps = {
  setOpen: (open: boolean) => void;
};

type UpdateProps = {
  closeModal: () => void;
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

export const useUpdateDepartment = ({ closeModal, slug }: UpdateProps) => {
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
      closeModal();
    },
    onError: (error) => {
      console.error("Error updating department:", error);
    },
  });

  return mutation;
};

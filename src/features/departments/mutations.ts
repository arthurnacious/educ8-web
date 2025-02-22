import { api_url } from "@/lib/config";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateDepartment = () => {
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
    },
    onError: (error) => {
      console.error("Error creating department:", error);
    },
  });

  return mutation;
};

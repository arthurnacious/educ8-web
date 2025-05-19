import { useToast } from "@/hooks/use-toast";
import { api_url } from "@/lib/config";
import { useFetchClient } from "@/lib/fetch-client";
import { Subject } from "@/types/subjects";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type UpdateProps = {
  onSuccessCallback?: () => void;
  slug: string;
};

export const useDeleteSubjects = ({
  onSuccess: callback,
  slug,
}: {
  onSuccess?: () => void;
  slug?: string;
}) => {
  const { fetchClient } = useFetchClient();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const deletSubjects = async ({ idsArray }: { idsArray: string[] }) => {
    const response = await fetchClient(`${api_url}/subjects/multi-delete`, {
      method: "PATCH",
      body: JSON.stringify({ idsArray }),
    });

    if (!response) {
      throw new Error("Failed to delete subjects");
    }

    return response;
  };

  const mutation = useMutation({
    mutationFn: deletSubjects,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["departments", slug],
      });
      queryClient.invalidateQueries({
        queryKey: ["subjects"],
      });
      toast({
        title: "Success!",
        description: "Successfully deleted Subjects",
      });
      if (callback) callback();
    },
    onError: (error) => {
      console.error("Error Deleting Subjects:", error);
      toast({
        title: "Error!",
        description: "An error occurred while deleting subjects",
        variant: "destructive",
      });
    },
  });

  return mutation;
};

export const useUpdateSubject = ({ onSuccessCallback, slug }: UpdateProps) => {
  const { fetchClient } = useFetchClient();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const updateSubject = async ({
    name,
    description,
    departmentId,
  }: {
    name: string;
    description: string;
    departmentId: string;
  }) => {
    const response = await fetchClient<{ data: Subject }>(
      `${api_url}/subjects/${slug}`,
      {
        method: "PUT",
        body: JSON.stringify({ name, description, departmentId }),
      }
    );

    console.log("response", response);

    if (!response.data) {
      throw new Error("Failed to update subject");
    }

    return response.data;
  };

  const mutation = useMutation({
    mutationFn: updateSubject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["departments"] });
      queryClient.invalidateQueries({ queryKey: ["departments", slug] });
      toast({
        title: "Success!",
        description: "Successfully updated to Subject",
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

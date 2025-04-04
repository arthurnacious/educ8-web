import { useToast } from "@/hooks/use-toast";
import { api_url } from "@/lib/config";
import { useFetchClient } from "@/lib/fetch-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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

    if (!response.ok) {
      throw new Error("Failed to delete subjects");
    }

    return response.json();
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

import { useToast } from "@/hooks/use-toast";
import { api_url } from "@/lib/config";
import { useFetchClient } from "@/lib/fetch-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteCourses = ({
  onSuccess: callback,
  slug,
}: {
  onSuccess?: () => void;
  slug?: string;
}) => {
  const { fetchClient } = useFetchClient();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const deletCourses = async ({ idsArray }: { idsArray: string[] }) => {
    const response = await fetchClient(`${api_url}/courses/multi-delete`, {
      method: "PATCH",
      body: JSON.stringify({ idsArray }),
    });

    if (!response.ok) {
      throw new Error("Failed to delete courses");
    }

    return response.json();
  };

  const mutation = useMutation({
    mutationFn: deletCourses,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["departments", slug],
      });
      queryClient.invalidateQueries({
        queryKey: ["courses"],
      });
      toast({
        title: "Success!",
        description: "Successfully deleted Courses",
      });
      if (callback) callback();
    },
    onError: (error) => {
      console.error("Error Deleting Courses:", error);
      toast({
        title: "Error!",
        description: "An error occurred while deleting courses",
        variant: "destructive",
      });
    },
  });

  return mutation;
};

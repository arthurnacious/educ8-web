import { useToast } from "@/hooks/use-toast";
import { api_url } from "@/lib/config";
import { useFetchClient } from "@/lib/fetch-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type StudentRemoveProps = {
  onSuccess?: () => void;
  courseId: string;
};

export const useRemoveStudentsFromClass = ({
  onSuccess: callback,
  courseId,
}: StudentRemoveProps) => {
  const { fetchClient } = useFetchClient();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const removeStudents = async ({ studentIds }: { studentIds: string[] }) => {
    const response = await fetchClient<{ data: unknown }>(
      `${api_url}/courses/${courseId}/students/remove`,
      {
        method: "PATCH",
        body: JSON.stringify({ studentIds }),
      }
    );

    if (!response) {
      throw new Error("Failed to remove Students");
    }

    return response;
  };

  const mutation = useMutation({
    mutationFn: removeStudents,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["class", courseId],
      });
      toast({
        title: "Success!",
        description: "Students Successfully Removed from Class",
      });
      if (callback) callback();
    },
    onError: (error) => {
      console.error("Error removing Students from Class:", error);
      toast({
        title: "Error!",
        description: "An error occurred while removeing Students from Class",
        variant: "destructive",
      });
    },
  });

  return mutation;
};

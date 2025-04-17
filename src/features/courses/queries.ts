import { useQuery } from "@tanstack/react-query";
import { api_url } from "@/lib/config";
import { useFetchClient } from "@/lib/fetch-client";
import { Enrollment, Field, Session } from "./types";

type ClassData = {
  id: string;
  name: string;
  sessions: Session[];
  enrollments: Enrollment[];
  marks: Field[];
};

export function useGetClassById({ courseId }: { courseId: string }) {
  const { fetchClient, isAuthenticated } = useFetchClient();
  const getClassById = async (
    courseId: string
  ): Promise<{ data: ClassData }> => {
    const data = await fetchClient(`${api_url}/courses/${courseId}`).then(
      async (res) => await res.json()
    );

    return data;
  };

  return useQuery({
    queryKey: ["class", courseId],
    queryFn: () => getClassById(courseId),
    enabled: isAuthenticated,
  });
}

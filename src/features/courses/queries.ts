import { useQuery } from "@tanstack/react-query";
import { api_url } from "@/lib/config";
import { useFetchClient } from "@/lib/fetch-client";
import { Enrollment, Field, Session } from "./types";

type Course = {
  id: string;
  name: string;
  sessions: Session[];
  enrollments: Enrollment[];
  marks: Field[];
};

export function useGetClassById({ courseId }: { courseId: string }) {
  const { fetchClient, isAuthenticated } = useFetchClient();
  const getClassById = async (courseId: string) => {
    const data = await fetchClient<{ data: Course }>(
      `${api_url}/courses/${courseId}`
    );

    return data;
  };

  return useQuery({
    queryKey: ["class", courseId],
    queryFn: () => getClassById(courseId),
    enabled: isAuthenticated,
  });
}

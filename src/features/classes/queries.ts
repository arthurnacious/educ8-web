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

export function useGetClassById({ classId }: { classId: string }) {
  const { fetchClient, isAuthenticated } = useFetchClient();
  const getClassById = async (
    classId: string
  ): Promise<{ data: ClassData }> => {
    const data = await fetchClient(`${api_url}/classes/${classId}`).then(
      async (res) => await res.json()
    );

    return data;
  };

  return useQuery({
    queryKey: ["class", classId],
    queryFn: () => getClassById(classId),
    enabled: isAuthenticated,
  });
}

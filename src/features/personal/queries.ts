import { useQuery } from "@tanstack/react-query";
import { api_url } from "@/lib/config";
import { useFetchClient } from "@/lib/fetch-client";

export function useGetPersonalCourses() {
  const { fetchClient, isAuthenticated } = useFetchClient();
  const getPersonalCourses = async (): Promise<{
    data: {
      presentedCourses: {
        id: string;
        subjectName: string;
        departmentName: string;
        createdAt: Date;
      }[];
      enrolledCourses: {
        id: string;
        subjectName: string;
        departmentName: string;
        lecturer: {
          name: string;
          image?: string;
        };
        createdAt: Date;
      }[];
      departmentCourses: {
        id: string;
        subjectName: string;
        departmentName: string;
        lecturer: {
          name: string;
          image?: string;
        };
        createdAt: Date;
      }[];
    };
  }> => {
    const data = await fetchClient(`${api_url}/personal/courses`).then((res) =>
      res.json()
    );

    return data;
  };

  return useQuery({
    queryKey: ["personal", "courses"],
    queryFn: getPersonalCourses,
    enabled: isAuthenticated,
  });
}

import { useQuery } from "@tanstack/react-query";
import { api_url } from "@/lib/config";
import { useFetchClient } from "@/lib/fetch-client";

export function useGetPersonalClasses() {
  const { fetchClient, isAuthenticated } = useFetchClient();
  const getPersonalClasses = async (): Promise<{
    data: {
      presentedClasses: {
        id: string;
        subjectName: string;
        departmentName: string;
        createdAt: Date;
      }[];
      enrolledClasses: {
        id: string;
        subjectName: string;
        departmentName: string;
        lecturer: {
          name: string;
          image?: string;
        };
        createdAt: Date;
      }[];
      departmentClasses: {
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
    const data = await fetchClient(`${api_url}/personal/classes`).then((res) =>
      res.json()
    );

    return data;
  };

  return useQuery({
    queryKey: ["personal", "classes"],
    queryFn: getPersonalClasses,
    enabled: isAuthenticated,
  });
}

import { useQuery } from "@tanstack/react-query";
// import { Department } from "../interface";
import { api_url } from "@/lib/config";
import { Department, GetDepartmentBySlugType } from "@/types/departments";
import { useFetchClient } from "@/lib/fetch-client";

// interface DepartmentWithCounts extends Department {
//   lecturersCount: number;
//   leadersCount: number;
//   coursesCount: number;
// }

export function useGetAllDepartments() {
  const { fetchClient, isAuthenticated } = useFetchClient();
  return useQuery({
    queryKey: ["departments"],
    queryFn: async () =>
      fetchClient<{ data: Department[] }>(`${api_url}/departments`).then(
        (res) => res.data
      ),
    enabled: isAuthenticated,
  });
}

export function useGetDepartmentBySlug(slug: string) {
  const { fetchClient, isAuthenticated } = useFetchClient();
  const getDepartmentBySlug = async (): Promise<{
    data: GetDepartmentBySlugType;
  }> => {
    const data = await fetchClient<{ data: GetDepartmentBySlugType }>(
      `${api_url}/departments/${slug}`
    );

    return data;
  };

  return useQuery({
    queryKey: ["departments", slug],
    queryFn: getDepartmentBySlug,
    enabled: !!slug && isAuthenticated,
  });
}

export function useGetDepartmentRoles() {
  const { fetchClient, isAuthenticated } = useFetchClient();
  const getDepartmentRoles = async (): Promise<{
    data: {
      id: string;
      name: string;
    }[];
  }> => {
    const data = await fetchClient<{ data: { id: string; name: string }[] }>(
      `${api_url}/departments/roles`
    );

    return data;
  };

  return useQuery({
    queryKey: ["departments", "roles"],
    queryFn: getDepartmentRoles,
    enabled: isAuthenticated,
  });
}

import { useQuery } from "@tanstack/react-query";
// import { Department } from "../interface";
import { api_url } from "@/lib/config";
import { GetDepartmentBySlugType } from "@/types/departments";

// interface DepartmentWithCounts extends Department {
//   lecturersCount: number;
//   leadersCount: number;
//   coursesCount: number;
// }

export function useGetAllDepartments() {
  const getAllDepartments = async () => {
    const data = await fetch(`${api_url}/departments`).then((res) =>
      res.json()
    );

    return data;
  };

  return useQuery({
    queryKey: ["departments"],
    queryFn: getAllDepartments,
  });
}

export function useGetDepartmentBySlug(slug: string) {
  const getAllDepartments = async (): Promise<{
    data: GetDepartmentBySlugType;
  }> => {
    const data = await fetch(`${api_url}/departments/${slug}`).then((res) =>
      res.json()
    );

    return data;
  };

  return useQuery({
    queryKey: ["departments", slug],
    queryFn: getAllDepartments,
    enabled: !!slug,
  });
}

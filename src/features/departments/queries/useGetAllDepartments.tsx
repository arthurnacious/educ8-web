import { useQuery } from "@tanstack/react-query";
import { Department } from "../interface";
import { api_url } from "@/lib/config";

// interface DepartmentWithCounts extends Department {
//   lecturersCount: number;
//   leadersCount: number;
//   coursesCount: number;
// }

export function useGetAllDepartments() {
  const getAllDepartments = async () => {
    console.log(`${api_url}/departments`);
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

import { api_url } from "@/lib/config";
import { useQuery } from "@tanstack/react-query";

export function useGetAllUsers() {
  const getAllUsers = async () => {
    const data = await fetch(`${api_url}/users`).then((res) => res.json());

    return data;
  };

  return useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });
}

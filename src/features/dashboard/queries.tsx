import { useQuery } from "@tanstack/react-query";
import { api_url } from "@/lib/config";
import { useFetchClient } from "@/lib/fetch-client";

export function useGetAuditLogs() {
  const { fetchClient, isAuthenticated } = useFetchClient();
  const useGetAuditLogs = async () => {
    const data = await fetchClient(`${api_url}/audit-logs`).then((res) =>
      res.json()
    );

    return data;
  };

  return useQuery({
    queryKey: ["audit-logs"],
    queryFn: useGetAuditLogs,
    enabled: isAuthenticated,
  });
}

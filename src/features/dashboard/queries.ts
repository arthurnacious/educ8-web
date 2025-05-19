import { useQuery } from "@tanstack/react-query";
import { api_url } from "@/lib/config";
import { useFetchClient } from "@/lib/fetch-client";
import { AuditLog } from "@/types/audit-logs";

export function useGetAuditLogs() {
  const { fetchClient, isAuthenticated } = useFetchClient();
  const getAuditLogs = async () => {
    const data = await fetchClient<{ data: AuditLog[] }>(
      `${api_url}/audit-logs`
    );

    return data;
  };

  return useQuery({
    queryKey: ["audit-logs"],
    queryFn: getAuditLogs,
    enabled: isAuthenticated,
  });
}

import { useQuery } from "@tanstack/react-query";
import { api_url } from "@/lib/config";
import { useFetchClient } from "@/lib/fetch-client";
import { Subject } from "@/types/subjects";

export function useGetAllSubjects() {
  const { fetchClient, isAuthenticated } = useFetchClient();

  return useQuery({
    queryKey: ["subjects"],
    queryFn: async () =>
      fetchClient<{ data: Subject[] }>(`${api_url}/subjects`).then(
        (res) => res.data
      ),
    enabled: isAuthenticated,
  });
}

export function useGetSubjectBySlug(slug?: string) {
  const { fetchClient, isAuthenticated } = useFetchClient();

  return useQuery({
    queryKey: ["subjects", slug],
    queryFn: () =>
      fetchClient<{ data: Subject }>(`${api_url}/subjects/${slug}`).then(
        (res) => res.data
      ),
    enabled: !!slug && isAuthenticated,
  });
}

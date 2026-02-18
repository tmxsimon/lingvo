import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchGroup } from "../services";

const PATH = "/dictionary";

export function useDictionaryGroup(id: number, language: string) {
  const queryClient = useQueryClient();

  const {
    data: group,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["group", id, language],
    queryFn: () => fetchGroup(id, language),
  });

  return {
    group,
    isLoading,
    error,
  };
}

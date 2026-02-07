import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchGroup } from "../services";

const PATH = "/dictionary";

export function useDictionaryGroup(id: number) {
  const queryClient = useQueryClient();

  const {
    data: group,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["group"],
    queryFn: () => fetchGroup(id),
  });

  return {
    group,
    isLoading,
    error,
  };
}

import { useQuery } from "@tanstack/react-query";
import { fetchFlippersEntries } from "../services";

export default function useFetchFlippers(
  groupId: number | null,
  language: number,
) {
  const {
    data: { flippers_pages, group } = { flippers_pages: null, group: null },
    isLoading,
    error,
  } = useQuery({
    queryKey: [groupId, language, "flippersEntries"],
    queryFn: () => fetchFlippersEntries(groupId, language),
    refetchOnWindowFocus: false,
  });

  return {
    flippersPages: flippers_pages,
    group,
    isLoading,
    error,
  };
}

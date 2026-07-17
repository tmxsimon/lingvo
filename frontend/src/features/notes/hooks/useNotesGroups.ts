import {
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import api from "../../../lib/api";
import { fetchGroups } from "../services";
import { useEffect, useMemo, useState } from "react";
import { FETCH_LIMIT } from "../../../constants/fetchLimit";
import { useInView } from "react-intersection-observer";

const PATH = "/notes";

export function useNotesGroups(language: number) {
  const queryClient = useQueryClient();

  const [searchValue, setSearchValue] = useState<string>("");

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteQuery({
    queryKey: ["groups", language],
    initialPageParam: 0,
    queryFn: ({ pageParam }) =>
      fetchGroups(language, FETCH_LIMIT, pageParam).then((data) => ({
        groups: data,
      })),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.groups.length < FETCH_LIMIT) {
        return undefined;
      }

      return allPages.length * FETCH_LIMIT;
    },
  });

  const groups = data?.pages.flatMap((page) => page.groups) ?? [];

  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage]);

  const searchGroups = useMemo(() => {
    return searchValue
      ? groups?.filter((group) =>
          group.name.toLowerCase().includes(searchValue.toLowerCase()),
        )
      : groups;
  }, [searchValue, groups]);

  const addGroup = useMutation({
    mutationFn: ({ name }: { name: string }) =>
      api.post(`${PATH}/groups`, null, {
        params: { name: name, language: language },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groups"] });
    },
  });

  const editGroup = useMutation({
    mutationFn: ({ id, name }: { id: number; name?: string }) =>
      api.put(`${PATH}/groups/${id}`, null, {
        params: { name: name },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groups"] });
    },
  });

  const deleteGroup = useMutation({
    mutationFn: (id: number) => api.delete(`${PATH}/groups/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groups"] });
    },
  });

  const reorderGroups = useMutation({
    mutationFn: (orderedIds: number[]) =>
      api.put(`${PATH}/groups/reorder`, orderedIds),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groups"] });
    },
  });

  return {
    groups: searchGroups,
    addGroup,
    editGroup,
    deleteGroup,
    reorderGroups,
    setSearchValue,
    isLoading,
    error,
    ref,
    isFetchingNextPage,
  };
}

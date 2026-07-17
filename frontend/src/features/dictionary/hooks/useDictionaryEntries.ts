import {
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import api from "../../../lib/api";
import { fetchGroupAndEntries } from "../services";
import { useState, useMemo, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { FETCH_LIMIT } from "../../../constants/fetchLimit";

const PATH = "/dictionary";

export function useDictionaryEntries(
  groupId: number | undefined,
  language: number,
) {
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
    queryKey: ["entries", groupId, language],
    initialPageParam: 0,
    queryFn: ({ pageParam }) =>
      fetchGroupAndEntries(language, groupId, FETCH_LIMIT, pageParam).then(
        (data) => ({
          group: data.group,
          entries: data.entries,
        }),
      ),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.entries.length < FETCH_LIMIT) {
        return undefined;
      }

      return allPages.length * FETCH_LIMIT;
    },
  });

  const entries = data?.pages.flatMap((page) => page.entries) ?? [];
  const group = data?.pages[0]?.group ?? null;

  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage]);

  const searchEntries = useMemo(() => {
    return searchValue
      ? entries?.filter(
          (entry) =>
            entry.content.toLowerCase().includes(searchValue.toLowerCase()) ||
            entry.translation
              .toLowerCase()
              .includes(searchValue.toLowerCase()) ||
            (entry.note &&
              entry.note.toLowerCase().includes(searchValue.toLowerCase())),
        )
      : entries;
  }, [searchValue, entries]);

  const addEntry = useMutation({
    mutationFn: ({
      content,
      translation,
      note,
    }: {
      content: string;
      translation: string;
      note?: string;
    }) =>
      api.post(`${PATH}/entries`, null, {
        params: {
          content: content,
          translation: translation,
          note: note,
          group_id: groupId,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["entries"] });
    },
  });

  const editEntry = useMutation({
    mutationFn: ({
      id,
      groupId,
      content,
      translation,
      note,
    }: {
      id: number;
      groupId?: number;
      content?: string;
      translation?: string;
      note?: string;
    }) =>
      api.put(`${PATH}/entries/${id}`, null, {
        params: {
          group_id: groupId,
          content: content,
          translation: translation,
          note: note,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["entries"] });
    },
  });

  const deleteEntry = useMutation({
    mutationFn: (id: number) => api.delete(`${PATH}/entries/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["entries"] });
    },
  });

  const reorderEntries = useMutation({
    mutationFn: (orderedIds: number[]) =>
      api.put(`${PATH}/entries/reorder`, orderedIds),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["entries"] });
    },
  });

  return {
    group,
    entries: searchEntries,
    setSearchValue,
    ref,
    isFetchingNextPage,
    isLoading,
    error,
    addEntry,
    editEntry,
    deleteEntry,
    reorderEntries,
  };
}

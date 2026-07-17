import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import api from "../../../lib/api";
import { fetchGroupAndNotes } from "../services";
import { useEffect, useMemo, useState } from "react";
import { FETCH_LIMIT } from "../../../constants/fetchLimit";
import { useInView } from "react-intersection-observer";

const PATH = "/notes";

export function useNotes(language: number, groupId?: number) {
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
    queryKey: ["notes", groupId, language],
    initialPageParam: 0,
    queryFn: ({ pageParam }) =>
      fetchGroupAndNotes(language, groupId, FETCH_LIMIT, pageParam).then(
        (data) => ({
          group: data.group,
          notes: data.notes,
        }),
      ),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.notes.length < FETCH_LIMIT) {
        return undefined;
      }

      return allPages.length * FETCH_LIMIT;
    },
  });

  const notes = data?.pages.flatMap((page) => page.notes) ?? [];
  const group = data?.pages[0]?.group ?? null;

  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage]);

  const searchNotes = useMemo(() => {
    return searchValue
      ? notes?.filter((note) =>
          note.name.toLowerCase().includes(searchValue.toLowerCase()),
        )
      : notes;
  }, [searchValue, notes]);

  const addNote = useMutation({
    mutationFn: ({ name }: { name: string }) =>
      api.post(`${PATH}/notes`, null, {
        params: {
          name: name,
          group_id: groupId,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  const editNote = useMutation({
    mutationFn: ({
      id,
      name,
      content,
      groupId,
    }: {
      id: number;
      name?: string;
      content?: string;
      groupId?: number;
    }) =>
      api.put(`${PATH}/notes/${id}`, null, {
        params: {
          name: name,
          content: content,
          group_id: groupId,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  const deleteNote = useMutation({
    mutationFn: (id: number) => api.delete(`${PATH}/notes/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  const reorderNotes = useMutation({
    mutationFn: (orderedIds: number[]) =>
      api.put(`${PATH}/notes/reorder`, orderedIds),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  return {
    group,
    notes: searchNotes,
    setSearchValue,
    addNote,
    editNote,
    deleteNote,
    reorderNotes,
    ref,
    isFetchingNextPage,
    isLoading,
    error,
  };
}

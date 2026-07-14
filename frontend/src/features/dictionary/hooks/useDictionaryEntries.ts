import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../lib/api";
import { fetchGroupAndEntries, fetchEntries } from "../services";
import { useState, useMemo } from "react";
import type { DictionaryEntryType, DictionaryGroupType } from "../types";

const PATH = "/dictionary";

export function useDictionaryEntries(
  groupId: number | undefined,
  language?: number,
) {
  const queryClient = useQueryClient();

  const [searchValue, setSearchValue] = useState<string>("");

  const {
    data: { group, entries } = { group: null, entries: [] },
    isLoading,
    error,
  } = useQuery<{
    group: DictionaryGroupType | null;
    entries: DictionaryEntryType[];
  }>({
    queryKey: ["entries", groupId, language],
    queryFn: () =>
      groupId !== undefined
        ? fetchGroupAndEntries(groupId)
        : fetchEntries(language!).then((entries) => ({
            group: null,
            entries,
          })),
    enabled: groupId !== undefined || language !== undefined,
  });

  const searchEntries = useMemo(() => {
    return searchValue
      ? entries?.filter(
          (entry) =>
            entry.content.toLowerCase().includes(searchValue.toLowerCase()) ||
            entry.translation.toLowerCase().includes(searchValue.toLowerCase()) ||
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
    isLoading,
    error,
    addEntry,
    editEntry,
    deleteEntry,
    reorderEntries,
  };
}

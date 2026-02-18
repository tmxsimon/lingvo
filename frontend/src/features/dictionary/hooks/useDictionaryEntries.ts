import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../lib/api";
import { fetchGroupEntries } from "../services";

const PATH = "/dictionary";

export function useDictionaryEntries(groupId: number, language: string) {
  const queryClient = useQueryClient();

  const {
    data: group,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["entries", groupId, language],
    queryFn: () => fetchGroupEntries(groupId, language),
  });

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
      api.post(`${PATH}/${language}/entries`, null, {
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
      content,
      translation,
      note,
    }: {
      id: number;
      content?: string;
      translation?: string;
      note?: string;
    }) =>
      api.put(`${PATH}/${language}/entries/${id}`, null, {
        params: { content: content, translation: translation, note: note },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["entries"] });
    },
  });

  const deleteEntry = useMutation({
    mutationFn: (id: number) => api.delete(`${PATH}/${language}/entries/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["entries"] });
    },
  });

  return {
    group,
    isLoading,
    error,
    addEntry,
    editEntry,
    deleteEntry,
  };
}

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../lib/api";
import { fetchGroupEntries } from "../services";

const PATH = "/dictionary";

export function useDictionaryEntries(groupId?: number) {
  const queryClient = useQueryClient();

  const {
    data: entries,
    isLoading: isLoading,
    error: error,
  } = useQuery({
    queryKey: ["entries", groupId],
    queryFn: () => fetchGroupEntries(groupId),
  });

  const addEntry = useMutation({
    mutationFn: ({
      content,
      translation,
    }: {
      content: string;
      translation: string;
    }) =>
      api.post(`${PATH}/entries`, null, {
        params: {
          content: content,
          translation: translation,
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
    }: {
      id: number;
      content?: string;
      translation?: string;
    }) =>
      api.put(`${PATH}/entries/${id}`, null, {
        params: { content: content, translation: translation },
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

  return {
    entries,
    isLoading,
    error,
    addEntry,
    editEntry,
    deleteEntry,
  };
}

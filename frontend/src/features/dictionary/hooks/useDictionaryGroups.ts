import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../lib/api";
import { fetchGroups } from "../services";
import { useState } from "react";

const PATH = "/dictionary";

export function useDictionaryGroups(language: number) {
  const queryClient = useQueryClient();

  const [searchValue, setSearchValue] = useState<string>("");

  const {
    data: groups,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["groups", language],
    queryFn: () => fetchGroups(language),
  });

  const searchGroups = searchValue
    ? groups?.filter((group) =>
        group.name.toLowerCase().includes(searchValue.toLowerCase()),
      )
    : groups;

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
  });

  return {
    groups: searchGroups,
    setSearchValue,
    isLoading,
    error,
    addGroup,
    editGroup,
    deleteGroup,
    reorderGroups,
  };
}

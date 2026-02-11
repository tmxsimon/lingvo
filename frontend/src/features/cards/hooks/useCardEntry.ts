import { useEffect, useState } from "react";
import type { DictionaryEntryType } from "../../dictionary/types";
import { fetchEntries, fetchGroupEntries } from "../../dictionary/services";
import { useMutation, useQuery } from "@tanstack/react-query";
import api from "../../../lib/api";

const PATH = "/dictionary";

// the code is quite trash i generated most of it with ai... but it works
// TODO: fix the code 😭
export default function useCardEntry(groupId?: number) {
  const {
    data: group,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["group", groupId && groupId],
    queryFn: () => (groupId ? fetchGroupEntries(groupId) : fetchEntries()),
  });

  const [currentEntry, setCurrentEntry] = useState<
    DictionaryEntryType | undefined
  >(undefined);

  const [isActive, setIsActive] = useState<boolean>(false);

  const sortedEntries = group?.entries
    ?.slice()
    .sort((a, b) => b.temperature - a.temperature);

  useEffect(() => {
    if (!sortedEntries?.length) {
      setCurrentEntry(undefined);
      return;
    }
    setIsActive(false);
    setCurrentEntry((prev) => {
      if (prev && sortedEntries.some((e) => e.id === prev.id)) {
        return prev;
      }
      return sortedEntries[0];
    });
  }, [group]);

  const handleNext = () => {
    if (!sortedEntries) return;
    const currentIndex = sortedEntries.findIndex(
      (e) => e.id === currentEntry?.id,
    );
    if (currentIndex !== -1 && currentIndex < sortedEntries.length - 1) {
      setCurrentEntry(sortedEntries[currentIndex + 1]);
    } else if (sortedEntries.length > 0) {
      setCurrentEntry(sortedEntries[0]);
    }
    setIsActive(false);
  };

  const changeTemperature = useMutation({
    mutationFn: ({
      action,
      step = 20,
    }: {
      action: "increase" | "decrease";
      step?: number;
    }) =>
      api.put(`${PATH}/entries/${currentEntry?.id}/temperature`, null, {
        params: { action: action, step: step },
      }),
    onSuccess: (response) => {
      setCurrentEntry(response.data);
    },
  });

  return {
    group,
    isActive,
    setIsActive,
    currentEntry,
    setCurrentEntry,
    sortedEntries,
    handleNext,
    changeTemperature,
    isLoading,
    error,
  };
}

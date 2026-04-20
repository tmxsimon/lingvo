import { use, useEffect, useMemo, useState } from "react";
import type { DictionaryEntryType } from "../../dictionary/types";
import { fetchCardsEntries } from "../../dictionary/services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../../../lib/api";

const PATH = "/dictionary";

// the code is quite trash i generated most of it with ai... but it works
// TODO: fix the code 😭
export default function useCardEntry(
  groupId: number | null,
  language: number,
  isOpen: boolean = false,
) {
  const queryClient = useQueryClient();

  const {
    data: { entries, group } = { entries: [], group: null },
    isLoading,
    error,
  } = useQuery({
    queryKey: [groupId, language, "cardEntries"],
    queryFn: () => fetchCardsEntries(groupId, language),
  });

  const [currentEntry, setCurrentEntry] = useState<DictionaryEntryType | null>(
    null,
  );

  const [isActive, setIsActive] = useState<boolean>(false);
  const [isReversed, setIsReversed] = useState<boolean>(
    localStorage.getItem("isReversed") === "true",
  );

  useEffect(() => {
    localStorage.setItem("isReversed", JSON.stringify(isReversed));
  }, [isReversed]);

  const sortedEntries = useMemo(() => {
    return entries?.slice().sort((a, b) => b.temperature - a.temperature);
  }, [entries]);

  useEffect(() => {
    if (!sortedEntries?.length) {
      setCurrentEntry(null);
      return;
    }
    setCurrentEntry((prev) => {
      if (prev && sortedEntries.some((e) => e.id === prev.id)) {
        return prev;
      }
      return sortedEntries[0];
    });
  }, [sortedEntries]);

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
      api.put(`${PATH}/entries/${currentEntry!.id}/temperature`, null, {
        params: { action: action, step: step },
      }),
    onSuccess: (response) => {
      setCurrentEntry(response.data);
      queryClient.setQueryData(
        [groupId, language, "cardEntries"],
        (oldData: any) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            entries: oldData.entries.map((entry: DictionaryEntryType) =>
              entry.id === response.data.id ? response.data : entry,
            ),
          };
        },
      );
    },
  });

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!currentEntry || isOpen) return;

      if (event.key === "ArrowUp") {
        event.preventDefault();
        changeTemperature.mutate({ action: "increase" });
      } else if (event.key === "ArrowDown") {
        event.preventDefault();
        changeTemperature.mutate({ action: "decrease" });
      } else if (
        event.key === "ArrowRight" ||
        (event.key === " " && isActive)
      ) {
        event.preventDefault();
        handleNext();
      } else if (event.key === " ") {
        event.preventDefault();
        setIsActive(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    currentEntry,
    changeTemperature,
    handleNext,
    isOpen,
    isActive,
    setIsActive,
  ]);

  return {
    group,
    currentEntry,
    setCurrentEntry,
    isActive,
    setIsActive,
    isReversed,
    setIsReversed,
    handleNext,
    changeTemperature,
    isLoading,
    error,
  };
}

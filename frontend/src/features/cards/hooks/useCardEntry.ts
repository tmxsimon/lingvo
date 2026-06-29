import { useCallback, useEffect, useMemo, useState } from "react";
import type { DictionaryEntryType } from "../../dictionary/types";
import { fetchCardsEntries } from "../../dictionary/services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../../../lib/api";

const PATH = "/dictionary";

// the code is trash but it works
// TODO: fix the code
export default function useCardEntry(
  groupId: number | null,
  language: number,
  isAuto: boolean,
  isOpen: boolean = false,
) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: [groupId, language, "cardEntries"],
    queryFn: () => fetchCardsEntries(groupId, language),
    refetchOnWindowFocus: false,
  });

  const entries: DictionaryEntryType[] = query.data?.entries ?? [];
  const group = query.data?.group ?? null;
  const { isLoading, error } = query;

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

    if (!currentEntry) {
      setCurrentEntry(sortedEntries[0]);
      return;
    }

    const updated = sortedEntries.find((e) => e.id === currentEntry.id);
    if (updated) {
      if (updated !== currentEntry) {
        setCurrentEntry(updated);
      }
      return;
    }
  }, [sortedEntries]);

  const handleNext = useCallback(() => {
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
  }, [currentEntry?.id, sortedEntries]);

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

  const setNextState = useCallback(() => {
    if (!isActive) {
      setIsActive(true);
    } else {
      handleNext();
    }
  }, [handleNext, isActive]);

  useEffect(() => {
    if (!isAuto) return;

    const id = window.setInterval(() => {
      setNextState();
    }, 5000);

    return () => clearInterval(id);
  }, [isAuto, setNextState]);

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

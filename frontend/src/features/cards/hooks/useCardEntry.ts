import { useCallback, useEffect, useState } from "react";
import type { DictionaryEntryType } from "../../dictionary/types";
import { fetchCardsEntries } from "../services";
import { useQuery } from "@tanstack/react-query";
import {
  TEMPERATURE_STEP,
  type TemperatureActionType,
} from "../../../hooks/useTemperature";

// the code is TRASH but it works
// TODO: fix the code
export default function useCardEntry(
  groupId: number | null,
  language: number,
  isOpenSettings: boolean = false,
  isAuto: boolean = false,
  isSentenceMode: boolean = false,
  openModalSentence: () => void,
  isOpenSentence: boolean = false,
  durationSeconds: number = 5,
  changeTemperature: (
    entryId: number,
    action: TemperatureActionType,
    step?: number,
    onSuccess?: () => void,
  ) => Promise<void> = async () => {},
) {
  const query = useQuery({
    queryKey: [groupId, language, "cardEntries"],
    queryFn: () => fetchCardsEntries(groupId, language),
    refetchOnWindowFocus: false,
  });

  const entries: DictionaryEntryType[] = query.data?.entries ?? [];
  const group = query.data?.group ?? null;
  const { isLoading, error } = query;

  const [queue, setQueue] = useState<DictionaryEntryType[]>([]);

  useEffect(() => {
    setQueue(entries);
  }, [entries]);
  const [currentEntry, setCurrentEntry] = useState<DictionaryEntryType | null>(
    null,
  );

  const [temperature, setTemperature] = useState<number>(
    currentEntry?.temperature ?? 100,
  );

  const [isActive, setIsActive] = useState<boolean>(false);
  const [isReversed, setIsReversed] = useState<boolean>(
    localStorage.getItem("isReversed") === "true",
  );

  useEffect(() => {
    localStorage.setItem("isReversed", JSON.stringify(isReversed));
  }, [isReversed]);

  useEffect(() => {
    if (!queue?.length) {
      setCurrentEntry(null);
      return;
    }

    if (!currentEntry) {
      setCurrentEntry(queue[0]);
      return;
    }
  }, [queue]);

  // pick next entry using weighted random by temperature (temperature + 1 to
  // give even 0 temperature entries a chance)
  const handleNext = useCallback(() => {
    if (queue.length < 2) return;

    const candidates = queue.filter((e) => e.id !== currentEntry?.id);
    if (candidates.length === 0) return;

    const weights = candidates.map((e) => e.temperature + 1);
    const total = weights.reduce((s, w) => s + w, 0);
    let r = Math.random() * total;
    let selected = candidates[0];
    for (let i = 0; i < candidates.length; i++) {
      r -= weights[i];
      if (r <= 0) {
        selected = candidates[i];
        break;
      }
    }

    setCurrentEntry(selected);
    setTemperature(selected.temperature);
    setIsActive(false);
  }, [queue, currentEntry?.id]);

  const changeTemperatureCards = useCallback(
    async (action: TemperatureActionType) => {
      const newTemperature =
        action === "increase"
          ? Math.min(temperature + TEMPERATURE_STEP, 100)
          : Math.max(temperature - TEMPERATURE_STEP, 0);
      setTemperature(newTemperature);
      await changeTemperature(currentEntry!.id, action, 20);
    },
    [changeTemperature, temperature],
  );

  const handleNextState = useCallback(() => {
    if (!isActive) {
      setIsActive(true);
    } else if (!isSentenceMode) {
      handleNext();
    } else {
      openModalSentence();
    }
  }, [handleNext, isActive, openModalSentence]);

  useEffect(() => {
    if (!isAuto) return;

    const id = window.setInterval(
      () => {
        handleNextState();
      },
      (durationSeconds * 1000) / 2, // half of duration for each state
    );

    return () => clearInterval(id);
  }, [isAuto, handleNextState, durationSeconds]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!currentEntry || isOpenSettings) return;

      if (!isOpenSentence) {
        if (event.key === "ArrowUp") {
          event.preventDefault();
          changeTemperatureCards("increase");
        } else if (event.key === "ArrowDown") {
          event.preventDefault();
          changeTemperatureCards("decrease");
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          handleNext();
        }
      }

      if (event.key === " ") {
        if (!isOpenSentence) event.preventDefault();
        handleNextState();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    currentEntry,
    changeTemperatureCards,
    handleNext,
    isOpenSettings,
    isActive,
    setIsActive,
  ]);

  return {
    group,
    currentEntry,
    setCurrentEntry,
    temperature,
    isActive,
    setIsActive,
    isReversed,
    setIsReversed,
    handleNext,
    handleNextState,
    changeTemperatureCards,
    isLoading,
    error,
  };
}

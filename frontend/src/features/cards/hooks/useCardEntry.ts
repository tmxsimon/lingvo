import { useEffect, useState } from "react";
import type {
  DictionaryEntryType,
  DictionaryGroupType,
} from "../../dictionary/types";
import { fetchGroup, fetchGroupEntries } from "../../dictionary/services";

type ChangeTemperatureMutation = {
  mutate: (
    variables: { id: number; action: "increase" | "decrease"; step: number },
    options?: { onSuccess?: (updatedEntry: any) => void },
  ) => void;
};

const temperatureStep = 15;

export default function useCardEntry(
  entries: DictionaryEntryType[] | undefined,
  changeTemperature: ChangeTemperatureMutation,
) {
  const [currentEntry, setCurrentEntry] = useState<
    DictionaryEntryType | undefined
  >(undefined);

  const [isActive, setIsActive] = useState<boolean>(false);

  const sortedEntries = entries
    ?.slice()
    .sort((a, b) => b.temperature - a.temperature);

  useEffect(() => {
    if (!sortedEntries?.length) return;
    else if (!sortedEntries.some((e) => e.id === currentEntry?.id)) {
      setCurrentEntry(sortedEntries[0]);
    }
  }, [sortedEntries]);

  const changeGroup = async (
    id: number | "",
    setCurrentGroup: React.Dispatch<
      React.SetStateAction<DictionaryGroupType | undefined>
    >,
  ) => {
    setCurrentEntry(undefined);
    setCurrentGroup(undefined);
    setIsActive(false);
    if (id) {
      const group = await fetchGroup(id);
      setCurrentGroup(group);
    }
  };

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

  const handleChangeTemperature = ({
    id,
    action,
    step = temperatureStep,
  }: {
    id: number;
    action: "increase" | "decrease";
    step?: number;
  }) => {
    changeTemperature.mutate(
      { id, action, step },
      {
        onSuccess: (updatedEntry) => {
          setCurrentEntry(updatedEntry?.data || updatedEntry);
        },
      },
    );
  };

  return {
    isActive,
    setIsActive,
    currentEntry,
    setCurrentEntry,
    sortedEntries,
    changeGroup,
    handleNext,
    handleChangeTemperature,
  };
}

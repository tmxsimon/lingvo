import { useMutation } from "@tanstack/react-query";
import api from "../lib/api";
import type { DictionaryEntryType } from "../features/dictionary/types";

const PATH = "/dictionary";

export const TEMPERATURE_STEP = 20;
export type TemperatureActionType = "increase" | "decrease";

export default function useTemperature() {
  const changeTemperatureMutation = useMutation({
    mutationFn: ({
      entryId,
      action,
      step = TEMPERATURE_STEP,
    }: {
      entryId: number;
      action: TemperatureActionType;
      step?: number;
      onSuccess?: (updatedEntry: DictionaryEntryType) => void;
    }) =>
      api.put(`${PATH}/entries/${entryId}/temperature`, null, {
        params: { action: action, step: step },
      }),
    onSuccess: (response, { onSuccess }) => {
      onSuccess?.(response.data);
    },
  });

  const changeTemperature = async (
    entryId: number,
    action: TemperatureActionType,
    step: number = TEMPERATURE_STEP,
    onSuccess?: (updatedEntry: DictionaryEntryType) => void,
  ) => {
    await changeTemperatureMutation.mutateAsync({
      entryId,
      action,
      step,
      onSuccess,
    });
  };

  return { changeTemperature };
}

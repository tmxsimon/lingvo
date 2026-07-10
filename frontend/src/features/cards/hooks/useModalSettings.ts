import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import type { SelectOptionType } from "../../../types";
import type { DictionaryGroupType } from "../../dictionary/types";

const useModalSettings = (
  group: DictionaryGroupType | null,
  durationSeconds: number,
) => {
  const { t } = useTranslation();

  const [currentGroupOption, setCurrentGroupOption] = useState<
    SelectOptionType | ""
  >(group ? { value: group.id, text: group.name } : "");

  const maxDurationSeconds = 120;
  const [durationSecondsInput, setDurationSecondsInput] =
    useState<number>(durationSeconds);

  const validate = () => {
    if (durationSecondsInput < 1 || durationSecondsInput > maxDurationSeconds) {
      toast.error(t("cards.validation.duration"));
      return false;
    }
    return true;
  };

  return {
    currentGroupOption,
    setCurrentGroupOption,
    durationSecondsInput,
    setDurationSecondsInput,
    maxDurationSeconds,
    validate,
  };
};

export default useModalSettings;

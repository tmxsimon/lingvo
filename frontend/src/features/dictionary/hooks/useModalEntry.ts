import { useState } from "react";
import { useTranslation } from "react-i18next";
import validator from "validator";
import { toast } from "react-toastify";

const useModalEntry = () => {
  const { t } = useTranslation();

  const [content, setContent] = useState<string>("");
  const [translation, setTranslation] = useState<string>("");
  const [note, setNote] = useState<string>("");

  const validate = () => {
    if (validator.isLength(content, { min: 1, max: 30 })) {
    } else {
      toast.error(t("dictionary.validation.contentLength"));
      return false;
    }
    if (validator.isLength(translation, { min: 1, max: 30 })) {
    } else {
      toast.error(t("dictionary.validation.translationLength"));
      return false;
    }
    if (validator.isLength(note, { max: 350 })) {
    } else {
      toast.error(t("dictionary.validation.noteLength"));
      return false;
    }
    return true;
  };

  return {
    content,
    setContent,
    translation,
    setTranslation,
    note,
    setNote,
    validate,
  };
};

export default useModalEntry;

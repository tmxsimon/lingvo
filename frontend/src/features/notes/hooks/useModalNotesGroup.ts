import { useState } from "react";
import { useTranslation } from "react-i18next";
import validator from "validator";
import { toast } from "react-toastify";

const useModalNotesGroup = () => {
  const { t } = useTranslation();

  const [name, setName] = useState<string>("");

  const validate = () => {
    if (validator.isLength(name, { min: 1, max: 30 })) {
    } else {
      toast.error(t("notes.validation.nameLength"));
      return false;
    }
    return true;
  };

  return {
    name,
    setName,
    validate,
  };
};

export default useModalNotesGroup;

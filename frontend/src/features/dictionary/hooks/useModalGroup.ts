import { useState } from "react";
import { useTranslation } from "react-i18next";
import validator from "validator";
import { toast } from "react-toastify";

const useModalGroup = () => {
  const { t } = useTranslation();

  const [name, setName] = useState<string>("");

  const validate = () => {
    if (validator.isLength(name, { min: 1, max: 30 })) {
    } else {
      toast.error(t("dictionary.validation.nameLength"));
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

export default useModalGroup;

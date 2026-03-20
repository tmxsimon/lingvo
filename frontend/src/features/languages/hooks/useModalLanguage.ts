import { useState } from "react";
import { useTranslation } from "react-i18next";
import validator from "validator";
import { toast } from "react-toastify";

const useModalLanguage = () => {
  const { t } = useTranslation();

  const [name, setName] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);

  const validate = () => {
    if (validator.isLength(name, { min: 1, max: 30 })) {
    } else {
      toast.error(t("languages.validation.nameLength"));
      return false;
    }
    return true;
  };

  return {
    name,
    setName,
    image,
    setImage,
    validate,
  };
};

export default useModalLanguage;

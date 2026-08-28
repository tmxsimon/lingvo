import { useState } from "react";
import { useTranslation } from "react-i18next";
import validator from "validator";
import { toast } from "react-toastify";

const useModalUser = () => {
  const { t } = useTranslation();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);

  const validate = () => {
    if (validator.isLength(username, { min: 1, max: 16 })) {
    } else {
      toast.error(t("dictionary.validation.contentLength"));
      return false;
    }
    return true;
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    image,
    setImage,
    validate,
  };
};

export default useModalUser;

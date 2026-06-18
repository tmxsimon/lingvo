import { useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const useSignIn = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const validate = () => {
    if (username) {
    } else {
      toast.error(t("dictionary.validation.contentLength"));
      return false;
    }
    if (password) {
    } else {
      toast.error(t("dictionary.validation.translationLength"));
      return false;
    }
    return true;
  };

  const handleSubmit = async (
    signIn: (username: string, password: string) => void,
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      await signIn(username, password);
      navigate(`/`);
    } catch (error) {
      toast.error(t("users.validation.signInIncorrect"));
    }
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    handleSubmit,
    validate,
  };
};

export default useSignIn;

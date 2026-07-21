import Input from "../../../components/Input";
import { useAuth } from "../contexts/authProvider";
import Button from "../../../components/Button";
import SignBox from "../components/SignBox";
import { useTranslation } from "react-i18next";
import useSignUp from "../hooks/useSignUp";
import ModalTitle from "../../../components/ModalTitle";
import FilePicker from "../../../components/FilePicker";

const SignUpPage = () => {
  const { t } = useTranslation();
  const { signUp } = useAuth();
  const {
    username,
    setUsername,
    password,
    setPassword,
    image,
    setImage,
    handleSubmit,
  } = useSignUp();

  const content = [
    <div>
      <ModalTitle text={t("users.username")} />
      <Input
        size="large"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        required
      />
    </div>,
    <div>
      <ModalTitle text={t("users.password")} />
      <Input
        size="large"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        type="password"
        required
      />
    </div>,
    <div>
      <ModalTitle text={t("users.profilePicture")} />
      <FilePicker
        id="profile-picture"
        label={t("chooseImage")}
        size="large"
        accept="image/*"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const file = e.target.files?.[0] || null;
          setImage(file);
        }}
      />
    </div>,
  ];

  const buttons = [
    <Button
      size="large"
      style="primary"
      text={t("users.signUp")}
      className="rounded-base-sm bg-brand-300 px-base py-base-sm text-adaptive-white w-full hover:brightness-105"
    />,
  ];

  return (
    <div className="px-base-lg h-screen-no-navbar-page flex w-full items-center justify-center">
      <SignBox
        title={t("users.signUpTitle")}
        content={content}
        buttons={buttons}
        onSubmit={(e) => handleSubmit(signUp, e)}
      />
    </div>
  );
};

export default SignUpPage;

import Modal from "../../../../components/Modal";
import Input from "../../../../components/Input";
import Button from "../../../../components/Button";
import { useTranslation } from "react-i18next";
import useModalLanguage from "../../hooks/useModalLanguage";
import Title from "../../../../components/Title";
import FilePicker from "../../../../components/FilePicker";

type ModalAddLanguageProps = {
  isOpen: boolean;
  closeModal: () => void;
  addLanguage: (name: string, image: File) => void;
};

const ModalAddLanguage = ({
  isOpen,
  closeModal,
  addLanguage,
}: ModalAddLanguageProps) => {
  const { t } = useTranslation();

  const { name, setName, image, setImage, validate } = useModalLanguage();

  return (
    <Modal
      open={isOpen}
      closeModal={() => {
        setName("");
        setImage(null);
        closeModal();
      }}
      title={t("languages.addLanguage")}
      content={[
        <div>
          <Title text={t("languages.name")} />
          <Input
            minLength={1}
            maxLength={30}
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>,
        <div>
          <Title text={t("languages.image")} />
          <FilePicker
            id="language-image"
            label={t("chooseImage")}
            accept="image/*"
            required
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const file = e.target.files?.[0] || null;
              setImage(file);
            }}
          />
        </div>,
      ]}
      buttons={[
        <Button
          text={t("add")}
          size="large"
          autoWidth
          onClick={() => {
            if (!validate()) return;
            addLanguage(name, image!);
            setName("");
            setImage(null);
            closeModal();
          }}
        />,
      ]}
    />
  );
};

export default ModalAddLanguage;

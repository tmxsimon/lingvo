import { useState } from "react";
import Modal from "../../../../components/Modal";
import Input from "../../../../components/Input";
import Button from "../../../../components/Button";
import { useTranslation } from "react-i18next";

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

  const [name, setName] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);

  return (
    <Modal
      open={isOpen}
      closeModal={closeModal}
      title={t("languages.addLanguage")}
      content={[
        <div>
          <div className="text-2xl">{t("languages.name")}</div>
          <Input
            minLength={1}
            maxLength={30}
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>,
        <div>
          <div className="text-2xl">{t("languages.image")}</div>
          <Input
            minLength={1}
            type="file"
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

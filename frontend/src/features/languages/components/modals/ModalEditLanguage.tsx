import { useEffect, useState } from "react";
import Modal from "../../../../components/Modal";
import Input from "../../../../components/Input";
import Button from "../../../../components/Button";
import type { LanguageType } from "../../types";
import { useTranslation } from "react-i18next";

type ModalEditLanguageProps = {
  language: LanguageType | null;
  isOpen: boolean;
  closeModal: () => void;
  editLanguage: (id: number, name: string, image: File) => void;
  deleteLanguage: (id: number) => void;
};

const ModalEditLanguage = ({
  language,
  isOpen,
  closeModal,
  editLanguage,
  deleteLanguage,
}: ModalEditLanguageProps) => {
  const { t } = useTranslation();

  const [name, setName] = useState(language?.name || "");
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    setName(language?.name || "");
  }, [language]);

  return (
    <Modal
      open={isOpen}
      closeModal={closeModal}
      title={t("languages.editLanguage")}
      content={[
        <div>
          <div className="text-2xl">{t("languages.name")}</div>
          <Input
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
            minLength={1}
            maxLength={30}
            required
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
          text={t("delete")}
          theme="danger"
          size="large"
          autoWidth
          onClick={() => {
            deleteLanguage(language!.id);
            setImage(null);
            closeModal();
          }}
        />,
        <Button
          text={t("edit")}
          size="large"
          autoWidth
          onClick={() => {
            editLanguage(language!.id, name || "", image!);
            setImage(null);
            closeModal();
          }}
        />,
      ]}
    />
  );
};

export default ModalEditLanguage;

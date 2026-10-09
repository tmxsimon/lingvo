import { useEffect } from "react";
import Modal from "../../../../components/Modal";
import Input from "../../../../components/Input";
import Button from "../../../../components/Button";
import type { LanguageType } from "../../types";
import { useTranslation } from "react-i18next";
import useModalLanguage from "../../hooks/useModalLanguage";
import ModalTitle from "../../../../components/ModalTitle";
import FilePicker from "../../../../components/FilePicker";
import ModalPage from "../../../../components/ModalPage";

type ModalEditLanguageProps = {
  language: LanguageType | null;
  // canDelete: boolean;
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
  // canDelete,
}: ModalEditLanguageProps) => {
  const { t } = useTranslation();

  const { name, setName, image, setImage, validate } = useModalLanguage();
  const canDelete = Boolean(language?.user_permissions?.can_delete);
  const canEdit = Boolean(language?.user_permissions?.can_edit);

  useEffect(() => {
    setName(language?.name || "");
  }, [language]);

  const page = (
    <ModalPage
      title={t("languages.editLanguage")}
      content={[
        <div>
          <ModalTitle text={t("languages.name")} />
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
          <ModalTitle text={t("languages.image")} />
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
          text={t("delete")}
          theme="danger"
          size="large"
          confirm
          autoWidth
          disabled={!canDelete}
          onClick={() => {
            if (!canDelete) return;
            deleteLanguage(language!.id);
            setImage(null);
            closeModal();
          }}
        />,
        <Button
          text={t("edit")}
          size="large"
          autoWidth
          disabled={!canEdit}
          onClick={() => {
            if (!validate() || !canEdit) return;
            editLanguage(language!.id, name || "", image!);
            setImage(null);
            closeModal();
          }}
        />,
      ]}
    />
  );

  return <Modal pages={[page]} open={isOpen} closeModal={closeModal} />;
};

export default ModalEditLanguage;

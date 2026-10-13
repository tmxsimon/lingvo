import { useEffect, useMemo } from "react";
import Modal from "../../../../components/Modal";
import Input from "../../../../components/Input";
import Button from "../../../../components/Button";
import type { DictionaryGroupType } from "../../types";
import { useTranslation } from "react-i18next";
import useModalGroup from "../../hooks/useModalGroup";
import ModalTitle from "../../../../components/ModalTitle";
import ModalPage from "../../../../components/ModalPage";
import { useLanguageContext } from "../../../languages/contexts/languageProvider";
import useLanguage from "../../../languages/hooks/useLanguage";

type ModalEditGroupProps = {
  group: DictionaryGroupType | null;
  isOpen: boolean;
  closeModal: () => void;
  editGroup: (id: number, name: string) => void;
  deleteGroup: (id: number) => void;
};

const ModalEditGroup = ({
  group,
  isOpen,
  closeModal,
  editGroup,
  deleteGroup,
}: ModalEditGroupProps) => {
  const { t } = useTranslation();

  const { name, setName, validate } = useModalGroup();

  useEffect(() => {
    setName(group?.name || "");
  }, [group]);

  const { language } = useLanguage();

  const canDelete = language?.user_permissions?.can_delete;
  const canEdit = language?.user_permissions?.can_edit;

  const page = (
    <ModalPage
      title={t("dictionary.editGroup")}
      content={[
        <div>
          <ModalTitle text={t("dictionary.name")} />
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
            deleteGroup(group!.id);
            closeModal();
          }}
        />,
        <Button
          text={t("edit")}
          size="large"
          autoWidth
          disabled={!canEdit}
          onClick={() => {
            if (!validate()) return;
            editGroup(group!.id, name || "");
            closeModal();
          }}
        />,
      ]}
    />
  );

  return <Modal pages={[page]} open={isOpen} closeModal={closeModal} />;
};

export default ModalEditGroup;

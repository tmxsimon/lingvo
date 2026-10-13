import { useEffect, useMemo } from "react";
import Modal from "../../../../components/Modal";
import Input from "../../../../components/Input";
import Button from "../../../../components/Button";
import type { NotesGroupType } from "../../types";
import { useTranslation } from "react-i18next";
import useModalGroup from "../../hooks/useModalNotesGroup";
import ModalTitle from "../../../../components/ModalTitle";
import ModalPage from "../../../../components/ModalPage";
import useLanguage from "../../../languages/hooks/useLanguage";

type ModalEditNotesGroupProps = {
  group: NotesGroupType | null;
  isOpen: boolean;
  closeModal: () => void;
  editGroup: (id: number, name: string) => void;
  deleteGroup: (id: number) => void;
};

const ModalEditNotesGroup = ({
  group,
  isOpen,
  closeModal,
  editGroup,
  deleteGroup,
}: ModalEditNotesGroupProps) => {
  const { t } = useTranslation();

  const { name, setName, validate } = useModalGroup();

  const { language } = useLanguage();

  const canEdit = useMemo(() => {
    if (!language) return false;
    return language.user_permissions?.can_edit;
  }, [language]);

  const canDelete = useMemo(() => {
    if (!language) return false;
    return language.user_permissions?.can_delete;
  }, [language]);

  useEffect(() => {
    setName(group?.name || "");
  }, [group]);

  const page = (
    <ModalPage
      title={t("notes.editGroup")}
      content={[
        <div>
          <ModalTitle text={t("notes.name")} />
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

export default ModalEditNotesGroup;

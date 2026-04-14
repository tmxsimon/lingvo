import { useEffect } from "react";
import Modal from "../../../../components/Modal";
import Input from "../../../../components/Input";
import Button from "../../../../components/Button";
import type { NotesGroupType } from "../../types";
import { useTranslation } from "react-i18next";
import useModalGroup from "../../hooks/useModalNotesGroup";

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

  useEffect(() => {
    setName(group?.name || "");
  }, [group]);

  return (
    <Modal
      open={isOpen}
      closeModal={closeModal}
      title={t("notes.editGroup")}
      content={[
        <div>
          <div className="text-2xl">{t("notes.name")}</div>
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
          autoWidth
          onClick={() => {
            deleteGroup(group!.id);
            closeModal();
          }}
        />,
        <Button
          text={t("edit")}
          size="large"
          autoWidth
          onClick={() => {
            if (!validate()) return;
            editGroup(group!.id, name || "");
            closeModal();
          }}
        />,
      ]}
    />
  );
};

export default ModalEditNotesGroup;

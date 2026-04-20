import { useEffect, useState } from "react";
import Modal from "../../../../components/Modal";
import Input from "../../../../components/Input";
import Button from "../../../../components/Button";
import type { NoteType, NotesGroupType } from "../../types";
import { useTranslation } from "react-i18next";
import Select from "../../../../components/Select";
import type { SelectOptionType } from "../../../../types";
import useModalnote from "../../hooks/useModalNote";

type ModalEditnoteProps = {
  note: NoteType | null;
  groups: NotesGroupType[];
  group: NotesGroupType;
  isOpen: boolean;
  closeModal: () => void;
  editNote: (id: number, name: string, groupId: number) => void;
  deleteNote: (id: number) => void;
};

const ModalEditnote = ({
  note,
  groups,
  group,
  isOpen,
  closeModal,
  editNote,
  deleteNote,
}: ModalEditnoteProps) => {
  const { t } = useTranslation();

  const { name, setName, validate } = useModalnote();
  const [currentGroupOption, setCurrentGroupOption] =
    useState<SelectOptionType>({ value: group.id, text: group.name });

  useEffect(() => {
    setName(note?.name || "");
    setCurrentGroupOption({
      value: note?.group_id || group.id,
      text: groups.find((g) => g.id === note?.group_id)?.name || "",
    });
  }, [note]);

  const options: SelectOptionType[] = [];

  groups?.forEach((group) => {
    options.push({ value: group.id, text: group.name });
  });

  return (
    <Modal
      open={isOpen}
      closeModal={closeModal}
      title={t("notes.editNote")}
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
        <div>
          <div className="text-2xl">{t("group")}</div>
          <Select
            value={
              (typeof currentGroupOption !== "string" &&
                currentGroupOption?.value) ||
              ""
            }
            options={options}
            onChange={(e) => {
              setCurrentGroupOption({
                value: e.target.value,
                text: "",
              });
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
            deleteNote(note!.id);
            closeModal();
          }}
        />,
        <Button
          text={t("edit")}
          size="large"
          autoWidth
          onClick={() => {
            if (!validate()) return;
            editNote(note!.id, name || "", currentGroupOption.value as number);
            closeModal();
          }}
        />,
      ]}
    />
  );
};

export default ModalEditnote;

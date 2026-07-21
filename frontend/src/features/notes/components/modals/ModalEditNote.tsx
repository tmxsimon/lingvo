import { useEffect, useMemo, useState } from "react";
import Modal from "../../../../components/Modal";
import Input from "../../../../components/Input";
import Button from "../../../../components/Button";
import type { NoteType, NotesGroupType } from "../../types";
import { useTranslation } from "react-i18next";
import Select from "../../../../components/Select";
import type { SelectOptionType } from "../../../../types";
import useModalnote from "../../hooks/useModalNote";
import ModalTitle from "../../../../components/ModalTitle";

type ModalEditnoteProps = {
  note: NoteType | null;
  groups: NotesGroupType[];
  group: NotesGroupType | null;
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
    useState<SelectOptionType>({
      value: groups.find((g) => g.id === note?.group_id)?.id,
      text: groups.find((g) => g.id === note?.group_id)?.name,
    });

  useEffect(() => {
    setName(note?.name || "");
    setCurrentGroupOption({
      value: note?.group_id || group?.id,
      text: groups.find((g) => g.id === note?.group_id)?.name || "",
    });
  }, [note, groups, group, setName]);

  const options: SelectOptionType[] = useMemo(() => {
    const opts: SelectOptionType[] = [];
    groups?.forEach((group) => {
      opts.push({ value: group.id, text: group.name });
    });
    return opts;
  }, [groups]);

  return (
    <Modal
      open={isOpen}
      closeModal={closeModal}
      title={t("notes.editNote")}
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
        <div>
          <ModalTitle text={t("group")} />
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

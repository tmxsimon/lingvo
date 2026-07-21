import { useEffect, useState, useMemo } from "react";
import Modal from "../../../../components/Modal";
import Input from "../../../../components/Input";
import Button from "../../../../components/Button";
import type { DictionaryEntryType, DictionaryGroupType } from "../../types";
import { useTranslation } from "react-i18next";
import Select from "../../../../components/Select";
import type { SelectOptionType } from "../../../../types";
import useModalEntry from "../../hooks/useModalEntry";
import ModalTitle from "../../../../components/ModalTitle";

type ModalEditEntryProps = {
  entry: DictionaryEntryType | null;
  groups: DictionaryGroupType[];
  group: DictionaryGroupType | null;
  isOpen: boolean;
  closeModal: () => void;
  editEntry: (
    id: number,
    groupId: number,
    content: string,
    translation: string,
    note?: string,
  ) => void;
  deleteEntry: (id: number) => void;
};

const ModalEditEntry = ({
  entry,
  groups,
  group,
  isOpen,
  closeModal,
  editEntry,
  deleteEntry,
}: ModalEditEntryProps) => {
  const { t } = useTranslation();

  const {
    content,
    setContent,
    translation,
    setTranslation,
    note,
    setNote,
    validate,
  } = useModalEntry();
  const [currentGroupOption, setCurrentGroupOption] =
    useState<SelectOptionType>({
      value: groups.find((g) => g.id === entry?.group_id)?.id,
      text: groups.find((g) => g.id === entry?.group_id)?.name,
    });

  useEffect(() => {
    setContent(entry?.content || "");
    setTranslation(entry?.translation || "");
    setNote(entry?.note || "");
    setCurrentGroupOption({
      value: entry?.group_id || group?.id,
      text: groups.find((g) => g.id === entry?.group_id)?.name || "",
    });
  }, [entry, groups, group, setContent, setTranslation, setNote]);

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
      title={t("dictionary.editEntry")}
      content={[
        <div>
          <ModalTitle text={t("dictionary.content")} />
          <Input
            value={content}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setContent(e.target.value)
            }
            minLength={1}
            maxLength={30}
            required
          />
        </div>,
        <div>
          <ModalTitle text={t("dictionary.translation")} />
          <Input
            value={translation}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTranslation(e.target.value)
            }
            minLength={1}
            maxLength={30}
            required
          />
        </div>,
        <div>
          <ModalTitle text={t("dictionary.note")} />
          <Input
            value={note}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNote(e.target.value)
            }
            maxLength={350}
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
            deleteEntry(entry!.id);
            closeModal();
          }}
        />,
        <Button
          text={t("edit")}
          size="large"
          autoWidth
          onClick={() => {
            if (!validate()) return;
            editEntry(
              entry!.id,
              currentGroupOption.value as number,
              content || "",
              translation || "",
              note,
            );
            closeModal();
          }}
        />,
      ]}
    />
  );
};

export default ModalEditEntry;

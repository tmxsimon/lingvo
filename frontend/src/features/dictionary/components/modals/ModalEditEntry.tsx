import { useEffect, useState } from "react";
import Modal from "../../../../components/Modal";
import Input from "../../../../components/Input";
import Button from "../../../../components/Button";
import type { DictionaryEntryType, DictionaryGroupType } from "../../types";
import { useTranslation } from "react-i18next";
import Select from "../../../../components/Select";
import type { SelectOptionType } from "../../../../types";

type ModalEditEntryProps = {
  entry: DictionaryEntryType | null;
  groups: DictionaryGroupType[];
  group: DictionaryGroupType;
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

  const [content, setContent] = useState(entry?.content || "");
  const [translation, setTranslation] = useState(entry?.translation || "");
  const [note, setNote] = useState(entry?.note || "");
  const [currentGroupOption, setCurrentGroupOption] =
    useState<SelectOptionType>({ value: group.id, text: group.name });

  useEffect(() => {
    setContent(entry?.content || "");
    setTranslation(entry?.translation || "");
    setNote(entry?.note || "");
  }, [entry]);

  const options: SelectOptionType[] = [];

  groups?.forEach((group) => {
    options.push({ value: group.id, text: group.name });
  });

  return (
    <Modal
      open={isOpen}
      closeModal={closeModal}
      title="Edit entry"
      content={[
        <div>
          <div className="text-2xl">{t("dictionary.content")}</div>{" "}
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
          <div className="text-2xl">{t("dictionary.translation")}</div>
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
          <div className="text-2xl">{t("dictionary.note")}</div>
          <Input
            value={note}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNote(e.target.value)
            }
            maxLength={350}
          />
        </div>,
        <div className="text-2xl">{t("group")}</div>,
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
        />,
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

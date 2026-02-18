import { useEffect, useState } from "react";
import Modal from "../../../../components/Modal";
import Input from "../../../../components/Input";
import Button from "../../../../components/Button";
import type { DictionaryEntryType } from "../../types";
import { useTranslation } from "react-i18next";

type ModalEditEntryProps = {
  entry: DictionaryEntryType | null;
  isOpen: boolean;
  closeModal: () => void;
  editEntry: (
    id: number,
    content: string,
    translation: string,
    note?: string,
  ) => void;
  deleteEntry: (id: number) => void;
};

const ModalEditEntry = ({
  entry,
  isOpen,
  closeModal,
  editEntry,
  deleteEntry,
}: ModalEditEntryProps) => {
  const { t } = useTranslation();

  const [content, setContent] = useState(entry?.content || "");
  const [translation, setTranslation] = useState(entry?.translation || "");
  const [note, setNote] = useState(entry?.note || "");

  useEffect(() => {
    setContent(entry?.content || "");
    setTranslation(entry?.translation || "");
    setNote(entry?.note || "");
  }, [entry]);

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
            editEntry(entry!.id, content || "", translation || "", note);
            closeModal();
          }}
        />,
      ]}
    />
  );
};

export default ModalEditEntry;

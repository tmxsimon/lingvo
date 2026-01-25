import { useEffect, useState } from "react";
import Modal from "../../../../components/Modal";
import Input from "../../../../components/Input";
import Button from "../../../../components/Button";
import type { DictionaryEntryType } from "../../types";
import resetStateValues from "../../../../utils/resetStateValues";

type ModalEditEntryProps = {
  entry: DictionaryEntryType | null;
  isOpen: boolean;
  closeModal: () => void;
  editEntry: (id: number, content: string, translation: string) => void;
  deleteEntry: (id: number) => void;
};

const ModalEditEntry = ({
  entry,
  isOpen,
  closeModal,
  editEntry,
  deleteEntry,
}: ModalEditEntryProps) => {
  const [content, setContent] = useState(entry?.content || "");
  const [translation, setTranslation] = useState(entry?.translation || "");

  useEffect(() => {
    setContent(entry?.content || "");
    setTranslation(entry?.translation || "");
  }, [entry]);

  return (
    <Modal
      open={isOpen}
      closeModal={closeModal}
      title="Edit entry"
      content={[
        <div>
          <div className="text-2xl">Content</div>{" "}
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
          <div className="text-2xl">Translation</div>
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
      ]}
      buttons={[
        <Button
          text="Delete"
          theme="danger"
          size="large"
          autoWidth
          onClick={() => deleteEntry(entry!.id)}
        />,
        <Button
          text="Edit"
          size="large"
          autoWidth
          onClick={() => {
            editEntry(entry!.id, content || "", translation || "");
            resetStateValues([setContent, setTranslation]);
          }}
        />,
      ]}
    />
  );
};

export default ModalEditEntry;

import { useEffect, useRef, useState } from "react";
import Modal from "../../../../components/Modal";
import Input from "../../../../components/Input";
import Button from "../../../../components/Button";
import type { DictionaryEntryType } from "../../types";

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
  const contentRef = useRef<HTMLInputElement>(null);
  const translationRef = useRef<HTMLInputElement>(null);

  const [inputContent, setInputContent] = useState(entry?.content || "");
  const [inputTranslation, setInputTranslation] = useState(
    entry?.translation || "",
  );

  useEffect(() => {
    setInputContent(entry?.content || "");
    setInputTranslation(entry?.translation || "");
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
            value={inputContent}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setInputContent(e.target.value)
            }
            maxLength={30}
            ref={contentRef}
            required
          />
        </div>,
        <div>
          <div className="text-2xl">Translation</div>
          <Input
            value={inputTranslation}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setInputTranslation(e.target.value)
            }
            maxLength={30}
            ref={translationRef}
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
          onClick={() =>
            editEntry(
              entry!.id,
              contentRef.current?.value || "",
              translationRef.current?.value || "",
            )
          }
        />,
      ]}
    />
  );
};

export default ModalEditEntry;

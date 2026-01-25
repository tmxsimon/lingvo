import { useState } from "react";
import Modal from "../../../../components/Modal";
import Input from "../../../../components/Input";
import Button from "../../../../components/Button";
import resetStateValues from "../../../../utils/resetStateValues";

type ModalAddEntryProps = {
  isOpen: boolean;
  closeModal: () => void;
  addEntry: (content: string, translation: string) => void;
};

const ModalAddEntry = ({
  isOpen,
  closeModal,
  addEntry,
}: ModalAddEntryProps) => {
  const [content, setContent] = useState<string>();
  const [translation, setTranslation] = useState<string>();

  return (
    <Modal
      open={isOpen}
      closeModal={closeModal}
      title="Add entry"
      content={[
        <div>
          <div className="text-2xl">Content</div>
          <Input
            minLength={1}
            maxLength={30}
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>,
        <div>
          <div className="text-2xl">Translation</div>
          <Input
            minLength={1}
            maxLength={30}
            required
            value={translation}
            onChange={(e) => setTranslation(e.target.value)}
          />
        </div>,
      ]}
      buttons={[
        <Button
          text="Add"
          size="large"
          autoWidth
          onClick={() => {
            addEntry(content || "", translation || "");
            resetStateValues([setContent, setTranslation]);
          }}
        />,
      ]}
    />
  );
};

export default ModalAddEntry;

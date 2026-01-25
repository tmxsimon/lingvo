import { useRef } from "react";
import Modal from "../../../../components/Modal";
import Input from "../../../../components/Input";
import Button from "../../../../components/Button";

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
  const contentRef = useRef<HTMLInputElement>(null);
  const translationRef = useRef<HTMLInputElement>(null);

  return (
    <Modal
      open={isOpen}
      closeModal={closeModal}
      title="Add entry"
      content={[
        <div>
          <div className="text-2xl">Content</div> <Input ref={contentRef} />
        </div>,
        <div>
          <div className="text-2xl">Translation</div>
          <Input ref={translationRef} />
        </div>,
      ]}
      buttons={[
        <Button
          text="Add"
          size="large"
          autoWidth
          onClick={() =>
            addEntry(
              contentRef.current?.value || "",
              translationRef.current?.value || "",
            )
          }
        />,
      ]}
    />
  );
};

export default ModalAddEntry;

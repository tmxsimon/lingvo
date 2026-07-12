import { useState } from "react";
import Button from "../../../../components/Button";
import Input from "../../../../components/Input";
import Modal from "../../../../components/Modal";
import { useTranslation } from "react-i18next";

type SentenceModalProps = {
  entryContent?: string;
  isOpen: boolean;
  closeModal: () => void;
  handleNext: () => void;
};

const SentenceModal = ({
  entryContent,
  isOpen = true,
  closeModal,
  handleNext,
}: SentenceModalProps) => {
  const { t } = useTranslation();
  const [value, setValue] = useState<string>("");

  const content = [
    <div className="w-112">
      <div className="gap-base flex flex-col justify-center">
        <div>
          {t("cards.sentenceMessage")}: {entryContent}
        </div>
        <Input
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
        />
      </div>
    </div>,
  ];

  const handleClose = () => {
    setValue("");
    closeModal();
    handleNext();
  };

  const buttons = [
    <Button text={t("close")} onClick={handleClose} autoWidth />,
  ];

  return (
    <Modal
      content={content}
      buttons={buttons}
      autoSize
      closable={false}
      open={isOpen}
      closeModal={closeModal}
    />
  );
};

export default SentenceModal;

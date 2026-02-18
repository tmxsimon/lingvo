import { useState } from "react";
import Modal from "../../../../components/Modal";
import Input from "../../../../components/Input";
import Button from "../../../../components/Button";
import resetStateValues from "../../../../utils/resetStateValues";
import { useTranslation } from "react-i18next";

type ModalAddEntryProps = {
  isOpen: boolean;
  closeModal: () => void;
  addEntry: (content: string, translation: string, note?: string) => void;
};

const ModalAddEntry = ({
  isOpen,
  closeModal,
  addEntry,
}: ModalAddEntryProps) => {
  const { t } = useTranslation();

  const [content, setContent] = useState<string>("");
  const [translation, setTranslation] = useState<string>("");
  const [note, setNote] = useState<string>("");

  return (
    <Modal
      open={isOpen}
      closeModal={closeModal}
      title={t("dictionary.addEntry")}
      content={[
        <div>
          <div className="text-2xl">{t("dictionary.content")}</div>
          <Input
            minLength={1}
            maxLength={30}
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>,
        <div>
          <div className="text-2xl">{t("dictionary.translation")}</div>
          <Input
            minLength={1}
            maxLength={30}
            required
            value={translation}
            onChange={(e) => setTranslation(e.target.value)}
          />
        </div>,
        <div>
          <div className="text-2xl">{t("dictionary.note")}</div>
          <Input
            value={note}
            onChange={(e) => setNote(e.target.value)}
            maxLength={350}
          />
        </div>,
      ]}
      buttons={[
        <Button
          text={t("add")}
          size="large"
          autoWidth
          onClick={() => {
            addEntry(content || "", translation || "", note);
            resetStateValues([setContent, setTranslation, setNote]);
            closeModal();
          }}
        />,
      ]}
    />
  );
};

export default ModalAddEntry;

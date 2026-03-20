import { useState } from "react";
import Modal from "../../../../components/Modal";
import Input from "../../../../components/Input";
import Button from "../../../../components/Button";
import resetStateValues from "../../../../utils/resetStateValues";
import { useTranslation } from "react-i18next";
import validator from "validator";
import { toast } from "react-toastify";
import useModalEntry from "../../hooks/useModalEntry";

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

  const {
    content,
    setContent,
    translation,
    setTranslation,
    note,
    setNote,
    validate,
  } = useModalEntry();

  return (
    <Modal
      open={isOpen}
      closeModal={() => {
        resetStateValues([setContent, setTranslation, setNote]);
        closeModal();
      }}
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
            if (!validate()) return;
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

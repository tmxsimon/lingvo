import Modal from "../../../../components/Modal";
import Input from "../../../../components/Input";
import Button from "../../../../components/Button";
import resetStateValues from "../../../../utils/resetStateValues";
import { useTranslation } from "react-i18next";
import useModalNote from "../../hooks/useModalNote";

type ModalAddEntryProps = {
  isOpen: boolean;
  closeModal: () => void;
  addNote: (name: string) => void;
};

const ModalAddEntry = ({ isOpen, closeModal, addNote }: ModalAddEntryProps) => {
  const { t } = useTranslation();

  const { name, setName, validate } = useModalNote();

  return (
    <Modal
      open={isOpen}
      closeModal={() => {
        resetStateValues([setName]);
        closeModal();
      }}
      title={t("notes.addNote")}
      content={[
        <div>
          <div className="text-2xl">{t("notes.name")}</div>
          <Input
            minLength={1}
            maxLength={30}
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            addNote(name || "");
            resetStateValues([setName]);
            closeModal();
          }}
        />,
      ]}
    />
  );
};

export default ModalAddEntry;

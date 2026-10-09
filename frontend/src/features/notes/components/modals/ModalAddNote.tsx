import Modal from "../../../../components/Modal";
import Input from "../../../../components/Input";
import Button from "../../../../components/Button";
import resetStateValues from "../../../../utils/resetStateValues";
import { useTranslation } from "react-i18next";
import useModalNote from "../../hooks/useModalNote";
import ModalTitle from "../../../../components/ModalTitle";
import ModalPage from "../../../../components/ModalPage";

type ModalAddEntryProps = {
  isOpen: boolean;
  closeModal: () => void;
  addNote: (name: string) => void;
};

const ModalAddEntry = ({ isOpen, closeModal, addNote }: ModalAddEntryProps) => {
  const { t } = useTranslation();

  const { name, setName, validate } = useModalNote();

  const page = (
    <ModalPage
      title={t("notes.addNote")}
      content={[
        <div>
          <ModalTitle text={t("notes.name")} />
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

  return (
    <Modal
      pages={[page]}
      open={isOpen}
      closeModal={() => {
        resetStateValues([setName]);
        closeModal();
      }}
    />
  );
};

export default ModalAddEntry;

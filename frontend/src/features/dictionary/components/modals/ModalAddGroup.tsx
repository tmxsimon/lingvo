import { useState } from "react";
import Modal from "../../../../components/Modal";
import Input from "../../../../components/Input";
import Button from "../../../../components/Button";
import resetStateValues from "../../../../utils/resetStateValues";
import { useTranslation } from "react-i18next";

type ModalAddGroupProps = {
  isOpen: boolean;
  closeModal: () => void;
  addGroup: (name: string) => void;
};

const ModalAddGroup = ({
  isOpen,
  closeModal,
  addGroup,
}: ModalAddGroupProps) => {
  const { t } = useTranslation();
  const [name, setName] = useState<string>();

  return (
    <Modal
      open={isOpen}
      closeModal={closeModal}
      title={t("dictionary.addGroup")}
      content={[
        <div>
          <div className="text-2xl">{t("dictionary.name")}</div>
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
            addGroup(name || "");
            resetStateValues([setName]);
          }}
        />,
      ]}
    />
  );
};

export default ModalAddGroup;

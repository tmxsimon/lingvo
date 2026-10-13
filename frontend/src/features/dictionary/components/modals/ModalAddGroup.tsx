import Modal from "../../../../components/Modal";
import Input from "../../../../components/Input";
import Button from "../../../../components/Button";
import resetStateValues from "../../../../utils/resetStateValues";
import { useTranslation } from "react-i18next";
import useModalGroup from "../../hooks/useModalGroup";
import ModalTitle from "../../../../components/ModalTitle";
import ModalPage from "../../../../components/ModalPage";
import useLanguage from "../../../languages/hooks/useLanguage";
import { useMemo } from "react";

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

  const { name, setName, validate } = useModalGroup();

  const { language } = useLanguage();

  const canWrite = useMemo(() => {
    if (!language) return false;
    return language.user_permissions?.can_write;
  }, [language]);

  const page = (
    <ModalPage
      title={t("dictionary.addGroup")}
      content={[
        <div>
          <ModalTitle text={t("dictionary.name")} />
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
          disabled={!canWrite}
          onClick={() => {
            if (!validate()) return;
            addGroup(name || "");
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

export default ModalAddGroup;

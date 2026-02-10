import { useEffect, useState } from "react";
import Modal from "../../../../components/Modal";
import Input from "../../../../components/Input";
import Button from "../../../../components/Button";
import type { DictionaryGroupType } from "../../types";
import { useTranslation } from "react-i18next";

type ModalEditGroupProps = {
  group: DictionaryGroupType | null;
  isOpen: boolean;
  closeModal: () => void;
  editGroup: (id: number, name: string) => void;
  deleteGroup: (id: number) => void;
};

const ModalEditGroup = ({
  group,
  isOpen,
  closeModal,
  editGroup,
  deleteGroup,
}: ModalEditGroupProps) => {
  const { t } = useTranslation();
  const [name, setName] = useState(group?.name || "");

  useEffect(() => {
    setName(group?.name || "");
  }, [group]);

  return (
    <Modal
      open={isOpen}
      closeModal={closeModal}
      title={t("dictionary.editGroup")}
      content={[
        <div>
          <div className="text-2xl">{t("dictionary.content")}</div>
          <Input
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
            minLength={1}
            maxLength={30}
            required
          />
        </div>,
      ]}
      buttons={[
        <Button
          text={t("delete")}
          theme="danger"
          size="large"
          autoWidth
          onClick={() => deleteGroup(group!.id)}
        />,
        <Button
          text={t("edit")}
          size="large"
          autoWidth
          onClick={() => editGroup(group!.id, name || "")}
        />,
      ]}
    />
  );
};

export default ModalEditGroup;

import { useEffect, useState } from "react";
import Modal from "../../../../components/Modal";
import Input from "../../../../components/Input";
import Button from "../../../../components/Button";
import type { DictionaryGroupType } from "../../types";
import resetStateValues from "../../../../utils/resetStateValues";

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
  const [name, setName] = useState(group?.name || "");

  useEffect(() => {
    setName(group?.name || "");
  }, [group]);

  return (
    <Modal
      open={isOpen}
      closeModal={closeModal}
      title="Edit group"
      content={[
        <div>
          <div className="text-2xl">Content</div>{" "}
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
          text="Delete"
          theme="danger"
          size="large"
          autoWidth
          onClick={() => deleteGroup(group!.id)}
        />,
        <Button
          text="Edit"
          size="large"
          autoWidth
          onClick={() => {
            editGroup(group!.id, name || "");
            resetStateValues([setName]);
          }}
        />,
      ]}
    />
  );
};

export default ModalEditGroup;

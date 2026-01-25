import { useEffect, useRef, useState } from "react";
import Modal from "../../../../components/Modal";
import Input from "../../../../components/Input";
import Button from "../../../../components/Button";
import type { DictionaryGroupType } from "../../types";

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
  const nameRef = useRef<HTMLInputElement>(null);
  const [inputName, setInputName] = useState(group?.name || "");

  useEffect(() => {
    setInputName(group?.name || "");
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
            value={inputName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setInputName(e.target.value)
            }
            maxLength={30}
            ref={nameRef}
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
          onClick={() => editGroup(group!.id, nameRef.current?.value || "")}
        />,
      ]}
    />
  );
};

export default ModalEditGroup;

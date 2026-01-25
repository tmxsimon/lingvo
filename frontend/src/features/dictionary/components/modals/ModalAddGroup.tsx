import { useState } from "react";
import Modal from "../../../../components/Modal";
import Input from "../../../../components/Input";
import Button from "../../../../components/Button";
import resetStateValues from "../../../../utils/resetStateValues";

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
  const [name, setName] = useState<string>();

  return (
    <Modal
      open={isOpen}
      closeModal={closeModal}
      title="Add group"
      content={[
        <div>
          <div className="text-2xl">Name</div>{" "}
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
          text="Add"
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

import { useRef } from "react";
import Modal from "../../../../components/Modal";
import Input from "../../../../components/Input";
import Button from "../../../../components/Button";

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
  const nameRef = useRef<HTMLInputElement>(null);

  return (
    <Modal
      open={isOpen}
      closeModal={closeModal}
      title="Add group"
      content={[
        <div>
          <div className="text-2xl">Name</div> <Input ref={nameRef} />
        </div>,
      ]}
      buttons={[
        <Button
          text="Add"
          size="large"
          autoWidth
          onClick={() => addGroup(nameRef.current?.value || "")}
        />,
      ]}
    />
  );
};

export default ModalAddGroup;

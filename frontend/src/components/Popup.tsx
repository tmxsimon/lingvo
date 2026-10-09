import Modal from "./Modal";
import ModalPage from "./ModalPage";

type PopupProps = {
  title?: string;
  text: string;
  buttons: React.ReactNode[];
  isOpen?: boolean;
  closeModal?: () => void;
};

const Popup = ({
  title = "",
  text,
  buttons,
  isOpen = true,
  closeModal,
}: PopupProps) => {
  const content = [
    <div className="flex h-24 w-112 items-center justify-center">
      <div className="text-lg">{text}</div>
    </div>,
  ];

  const page = <ModalPage title={title} content={content} buttons={buttons} />;

  return (
    <Modal
      pages={[page]}
      autoSize
      closable={false}
      open={isOpen}
      closeModal={closeModal}
    />
  );
};

export default Popup;

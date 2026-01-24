import useModal from "../hooks/useModal";
import Icon from "./Icon";

type ModalProps = {
  content: React.ReactNode[];
  buttons: React.ReactNode[]; // autoWidth must be on
  closable?: boolean;
  open?: boolean;
  closeModal?: () => void;
};

const Modal = ({
  content,
  buttons,
  closable = true,
  open = false,
  closeModal,
}: ModalProps) => {
  return (
    <>
      {open && (
        <div className="absolute z-50 flex h-screen w-screen items-center justify-center backdrop-brightness-70">
          <div className="bg-brand-neutral-100 border-brand-neutral-200 rounded-base px-base pb-base-lg relative flex h-136 w-112 flex-col justify-between border pt-12">
            {closable && (
              <Icon
                name="dismiss"
                className="right-base top-base text-brand-neutral-300 absolute size-8 cursor-pointer"
                onClick={closeModal}
              />
            )}
            <div className="gap-base flex w-full flex-col">
              {content.map((part, i) => {
                return <div key={i}>{part}</div>;
              })}
            </div>

            <div className="gap-base flex justify-between">
              {buttons.map((button, i) => {
                return (
                  <div key={i} className="flex-1">
                    {button}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;

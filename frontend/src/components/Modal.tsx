import { useEffect } from "react";
import Icon from "./Icon";

type ModalProps = {
  title?: string;
  content: React.ReactNode[];
  buttons: React.ReactNode[];
  centeredButtons?: boolean;
  closable?: boolean;
  open?: boolean;
  autoSize?: boolean;
  closeModal?: () => void;
};

const Modal = ({
  title,
  content,
  buttons,
  centeredButtons = false,
  closable = true,
  open = false,
  autoSize = false,
  closeModal,
}: ModalProps) => {
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (open && e.target === e.currentTarget && closable) {
      closeModal?.();
    }
  };

  useEffect(() => {
    if (!open || !closeModal) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && closable) {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, closeModal]);

  return (
    <>
      {open && (
        <>
          <div className="fixed inset-0 z-100 backdrop-brightness-50"></div>
          <div
            className="fixed inset-0 z-100 flex h-screen w-screen items-center justify-center"
            onClick={handleBackdropClick}
          >
            <div
              className={`border-brand-neutral-200 backdrop-blur-base-lg rounded-base px-base pb-base-lg relative flex ${autoSize ? "h-auto w-auto" : "h-136 w-112"} flex-col justify-between border ${title ? "pt-12" : "pt-base-lg"} backdrop-brightness-150`}
            >
              <div className="top-base text-brand-neutral-300 absolute self-center">
                {title}
              </div>
              {closable && (
                <Icon
                  name="close"
                  className="right-base top-base text-brand-neutral-300 absolute size-8 cursor-pointer"
                  onClick={closeModal}
                />
              )}
              <div className="gap-base flex w-full flex-col">
                {content.map((part, i) => {
                  return <div key={i}>{part}</div>;
                })}
              </div>

              <div
                className={`gap-base mt-base flex w-full ${centeredButtons ? "justify-center" : "justify-between"}`}
              >
                {buttons.map((button, i) => {
                  return (
                    <div
                      key={i}
                      className={`${!centeredButtons ? "flex-1" : ""}`}
                    >
                      {button}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Modal;

import { useEffect, useState } from "react";
import Icon from "./Icon";

type ModalProps = {
  pages: React.ReactNode[];
  pagesIcons?: React.ReactNode[];
  haveTitle?: boolean;
  closable?: boolean;
  open?: boolean;
  autoSize?: boolean;
  closeModal?: () => void;
};

const Modal = ({
  pages,
  pagesIcons,
  haveTitle = true,
  closable = true,
  open = false,
  autoSize = false,
  closeModal,
}: ModalProps) => {
  const [pageIndex, setPageIndex] = useState(0);

  const currentPage = pages.find((page) => pages.indexOf(page) === pageIndex);

  const handleCloseModal = () => {
    if (closable && closeModal) {
      closeModal();
      // setPageIndex(0);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (open && e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  useEffect(() => {
    if (open) {
      document.documentElement.classList.add("overflow-y-hidden");
    } else {
      document.documentElement.classList.remove("overflow-y-hidden");
    }

    if (!open || !closeModal) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleCloseModal();
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
            className="px-base fixed inset-0 z-100 flex h-screen w-screen items-center justify-center"
            onClick={handleBackdropClick}
          >
            <div
              className={`border-brand-neutral-200 backdrop-blur-base-lg rounded-base px-base pb-base-lg relative flex ${autoSize ? "h-auto w-auto" : "h-146 w-116"} flex-col justify-between border ${haveTitle ? "pt-12" : "pt-base-lg"} backdrop-brightness-150`}
            >
              {!!pagesIcons && (
                <div className="gap-base-sm left-base top-base absolute flex">
                  {pagesIcons.map((icon, i) => (
                    <div
                      key={i}
                      onClick={() => setPageIndex(i)}
                      className="cursor-pointer"
                    >
                      {icon}
                    </div>
                  ))}
                </div>
              )}

              {closable && (
                <Icon
                  name="close"
                  className="right-base top-base text-brand-neutral-300 absolute size-8 cursor-pointer"
                  onClick={handleCloseModal}
                />
              )}
              <div className="flex h-full flex-col justify-between">
                {currentPage}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Modal;

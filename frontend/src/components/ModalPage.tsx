import { useEffect } from "react";

type ModalPageProps = {
  title?: string;
  content: React.ReactNode[];
  buttons: React.ReactNode[];
  centeredButtons?: boolean;
  onOpen?: () => void;
};

const ModalPage = ({
  title,
  content,
  buttons,
  centeredButtons,
  onOpen,
}: ModalPageProps) => {
  return (
    <>
      <div className="top-base text-brand-neutral-300 absolute self-center">
        {title}
      </div>
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
            <div key={i} className={`${!centeredButtons ? "flex-1" : ""}`}>
              {button}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ModalPage;

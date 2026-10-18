import Icon from "./Icon";

type ModalTitleProps = {
  text: string;
  noteId?: string;
  size?: "small" | "medium" | "large";
  className?: string;
};

const ModalTitle = ({
  text,
  noteId,
  size = "medium",
  className = "",
}: ModalTitleProps) => {
  const classNameSize =
    size === "small" ? "text-xl" : size === "medium" ? "text-2xl" : "text-3xl";

  return (
    <div className="gap-base-sm flex items-center">
      <div className={`${classNameSize} ${className}`}>{text}</div>
      {noteId && (
        <div className="cursor-pointer" data-tooltip-id={noteId}>
          <Icon name="info" className="size-6" />
        </div>
      )}
    </div>
  );
};

export default ModalTitle;

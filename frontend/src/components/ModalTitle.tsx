type ModalTitleProps = {
  text: string;
  size?: "small" | "medium" | "large";
  className?: string;
};

const ModalTitle = ({
  text,
  size = "medium",
  className = "",
}: ModalTitleProps) => {
  const classNameSize =
    size === "small" ? "text-xl" : size === "medium" ? "text-2xl" : "text-3xl";

  return <div className={`${classNameSize} ${className}`}>{text}</div>;
};

export default ModalTitle;

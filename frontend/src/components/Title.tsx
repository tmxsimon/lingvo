type TitleProps = {
  text: string;
  size?: "small" | "medium" | "large";
  className?: string;
};

const Title = ({ text, size = "medium", className = "" }: TitleProps) => {
  const classNameSize =
    size === "small" ? "text-xl" : size === "medium" ? "text-2xl" : "text-3xl";

  return <div className={`${classNameSize} ${className}`}>{text}</div>;
};

export default Title;

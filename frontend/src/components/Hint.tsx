import { Tooltip } from "react-tooltip";

const style = {
  backgroundColor: "var(--color-brand-neutral-100)",
  borderRadius: "var(--radius-base-xs)",
};

type HintProps = {
  id: string;
  children?: React.ReactNode;
  width?: "small" | "medium" | "large";
};

const Hint = ({ id, children, width = "medium" }: HintProps) => {
  const classNameSize =
    width === "small"
      ? "max-w-82"
      : width === "medium"
        ? "max-w-108"
        : "max-w-144";

  return (
    <Tooltip
      id={id}
      opacity={1}
      className={`z-1000 break-all ${classNameSize}`}
      style={style}
      border="1px solid var(--color-brand-neutral-200)"
    >
      {children}
    </Tooltip>
  );
};

export default Hint;

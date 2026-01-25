import { buttonColorMap, buttonHeightMap } from "../utils/buttonMaps";

type IconButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "size" | "type"
> & {
  icon: React.ReactNode;
  type?: "primary" | "secondary" | "tertiary";
  theme?: "brand" | "neutral" | "danger" | "warning";
  size?: "small" | "medium" | "large" | "auto";
  hoverEffect?: boolean;
};

const IconButton = ({
  icon,
  type = "primary",
  theme = "brand",
  size = "medium",
  hoverEffect = true,
  className = "",
  ...buttonProps
}: IconButtonProps) => {
  className += ` ${buttonColorMap[theme][type]} ${buttonHeightMap[size]}`;

  return (
    <button
      className={`rounded-base-sm flex cursor-pointer items-center justify-center p-2 ${hoverEffect ? "hover:brightness-103" : ""} active:brightness-97 ${className}`}
      {...buttonProps}
    >
      {icon}
    </button>
  );
};

export default IconButton;

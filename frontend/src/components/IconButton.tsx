import { buttonColorMap, buttonHeightMap } from "../utils/buttonMaps";

type IconButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "size" | "type"
> & {
  icon: React.ReactNode;
  type?: "primary" | "secondary" | "tertiary" | "text";
  theme?: "brand" | "neutral" | "danger" | "warning";
  size?: "small" | "medium" | "large" | "auto";
  hoverEffect?: boolean;
  activeEffect?: boolean;
  padding?: boolean;
};

const IconButton = ({
  icon,
  type = "primary",
  theme = "brand",
  size = "medium",
  hoverEffect = true,
  activeEffect = true,
  padding = true,
  className = "",
  ...buttonProps
}: IconButtonProps) => {
  className += ` ${buttonColorMap[theme][type]} ${buttonHeightMap[size]}`;

  return (
    <button
      className={`rounded-base-sm ${padding ? "p-base-sm" : ""} flex cursor-pointer items-center justify-center ${hoverEffect ? "hover:brightness-103" : ""} ${activeEffect ? "active:brightness-97" : ""} ${className}`}
      {...buttonProps}
    >
      {icon}
    </button>
  );
};

export default IconButton;

import { buttonColorMap, buttonHeightMap } from "../utils/buttonMaps";

type ButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "size" | "type"
> & {
  text?: string;
  icon?: React.ReactNode;
  iconFront?: React.ReactNode;
  iconBack?: React.ReactNode;
  type?: "primary" | "secondary" | "tertiary";
  theme?: "brand" | "neutral" | "danger" | "warning";
  size?: "small" | "medium" | "large" | "auto";
  autoWidth?: boolean;
  underline?: boolean;
  hoverEffect?: boolean;
};

const sizeMap: Record<string, string> = {
  small: `px-base-sm py-2 text-sm ${buttonHeightMap["small"]}`,
  medium: `px-base py-2 text-md ${buttonHeightMap["medium"]}`,
  large: `px-base-lg py-2 text-lg ${buttonHeightMap["large"]}`,
};

const Button = ({
  text,
  icon,
  iconFront,
  iconBack,
  type = "primary",
  theme = "brand",
  size = "medium",
  autoWidth = false,
  underline = false,
  hoverEffect = true,
  className = "",
  ...buttonProps
}: ButtonProps) => {
  className += ` ${buttonColorMap[theme][type]} ${sizeMap[size]}`;

  return (
    <button
      className={`rounded-base-sm ${autoWidth ? "w-full" : ""} cursor-pointer ${underline ? "hover:underline" : ""} ${hoverEffect ? "hover:brightness-103" : ""} active:brightness-97 ${className}`}
      {...buttonProps}
    >
      <div className="flex h-full items-center justify-center">
        {iconFront && <div className="mr-1">{iconFront}</div>}
        {text}
        {icon}
        {iconBack && <div className="ml-1">{iconBack}</div>}
      </div>
    </button>
  );
};

export default Button;

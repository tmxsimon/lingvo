import type { button } from "motion/react-client";

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

const colorMap: Record<string, Record<string, string>> = {
  brand: {
    primary: "bg-brand-300 text-white",
    secondary: "bg-brand-100 text-brand-300",
    tertiary: "border border-brand-300 text-brand-300",
  },
  neutral: {
    primary: "bg-neutral-400 text-white",
    secondary: "bg-neutral-100 text-neutral-400",
    tertiary: "border border-neutral-400 text-neutral-400",
  },
  warning: {
    primary: "bg-warning-300 text-white",
    secondary: "bg-warning-100 text-warning-300",
    tertiary: "border border-warning-300 text-warning-300",
  },
  danger: {
    primary: "bg-danger-300 text-white",
    secondary: "bg-danger-100 text-danger-300",
    tertiary: "border border-danger-300 text-danger-300",
  },
};

const sizeMap: Record<string, string> = {
  small: "px-base-sm py-2 text-sm",
  medium: "px-base py-2 text-md",
  large: "px-base-lg py-2 text-lg",
};

const iconSizeMap: Record<string, string> = {
  small: "size-4",
  medium: "size-5",
  large: "size-6",
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
  className += ` ${colorMap[theme][type]} ${sizeMap[size]}`;
  const iconSizeClass = iconSizeMap[size];

  return (
    <button
      className={`rounded-base-sm ${autoWidth ? "w-full" : ""} cursor-pointer ${underline ? "hover:underline" : ""} ${hoverEffect ? "hover:brightness-103" : ""} active:brightness-97 ${className}`}
      {...buttonProps}
    >
      <div className="flex items-center justify-center">
        {iconFront && (
          <div className={`mr-1 ${iconSizeClass}`}>{iconFront}</div>
        )}
        {text}
        {icon}
        {iconBack && <div className={`ml-1 ${iconSizeClass}`}>{iconBack}</div>}
      </div>
    </button>
  );
};

export default Button;

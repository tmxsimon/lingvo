import { useEffect, useState } from "react";
import { buttonColorMap, buttonHeightMap } from "../utils/buttonMaps";
import { useTranslation } from "react-i18next";

type ButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "size"
> & {
  text: string;
  icon?: React.ReactNode;
  iconFront?: React.ReactNode;
  iconBack?: React.ReactNode;
  confirm?: boolean;
  style?: "primary" | "secondary" | "tertiary" | "text";
  theme?: "brand" | "neutral" | "danger" | "warning";
  size?: "small" | "medium" | "large" | "auto";
  onClick: any;
  autoWidth?: boolean;
  underline?: boolean;
  hoverEffect?: boolean;
  activeEffect?: boolean;
};

const sizeMap: Record<string, string> = {
  small: `px-base-sm text-sm ${buttonHeightMap["small"]}`,
  medium: `px-base text-md ${buttonHeightMap["medium"]}`,
  large: `px-base-lg text-lg ${buttonHeightMap["large"]}`,
  auto: `px-base ${buttonHeightMap["auto"]}`,
};

const Button = ({
  text,
  icon,
  iconFront,
  iconBack,
  confirm = false,
  style = "primary",
  theme = "brand",
  size = "medium",
  onClick,
  autoWidth = false,
  underline = false,
  hoverEffect = true,
  activeEffect = true,
  className = "",
  ...buttonProps
}: ButtonProps) => {
  className += ` ${buttonColorMap[theme][style]} ${sizeMap[size]}`;
  const { t } = useTranslation();

  const [textToDisplay, setTextToDisplay] = useState<string>(text);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const handleConfirm = () => {
    if (isClicked) {
      onClick();
      return;
    }
    setIsClicked(true);
  };

  useEffect(() => {
    if (isClicked) {
      setTextToDisplay(t("confirm"));
      setTimeout(() => {
        setIsClicked(false);
      }, 3000);
    } else {
      setTextToDisplay(text);
    }
  }, [isClicked]);

  return (
    <button
      className={`rounded-base-sm ${autoWidth ? "w-full" : ""} cursor-pointer ${underline ? "hover:underline" : ""} ${hoverEffect ? "hover:brightness-103" : ""} ${activeEffect ? "active:brightness-97" : ""} ${className}`}
      onClick={!confirm ? onClick : handleConfirm}
      {...buttonProps}
    >
      <div className="flex h-full items-center justify-center">
        {iconFront && <div className="mr-1">{iconFront}</div>}
        {textToDisplay}
        {icon}
        {iconBack && <div className="ml-1">{iconBack}</div>}
      </div>
    </button>
  );
};

export default Button;

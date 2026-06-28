import type React from "react";
import { buttonHeightMap } from "../utils/buttonMaps";

type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> & {
  placeholder?: string;
  size?: "small" | "medium" | "large" | "auto";
  autoWidth?: boolean;
  className?: string;
};

const sizeMap: Record<string, string> = {
  small: `px-base-sm text-sm ${buttonHeightMap["small"]}`,
  medium: `px-base text-md ${buttonHeightMap["medium"]}`,
  large: `px-base-lg text-lg ${buttonHeightMap["large"]}`,
};

const Input = ({
  placeholder,
  size = "medium",
  autoWidth = true,
  className = "",
  ...inputProps
}: InputProps) => {
  className += ` ${sizeMap[size]}`;

  return (
    <input
      className={`p-base-sm rounded-base border-brand-neutral-200 bg-brand-neutral-100 appearance-none border ${autoWidth && "w-full"} ${className}`}
      placeholder={placeholder}
      {...inputProps}
    />
  );
};

export default Input;

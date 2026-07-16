import type React from "react";
import { inputSizeMap } from "../utils/inputMaps";

type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> & {
  placeholder?: string;
  size?: "small" | "medium" | "large" | "auto";
  autoWidth?: boolean;
  className?: string;
};

const Input = ({
  placeholder,
  size = "medium",
  autoWidth = true,
  className = "",
  ...inputProps
}: InputProps) => {
  className += ` ${inputSizeMap[size]}`;

  return (
    <input
      className={`p-base-sm rounded-base border-brand-neutral-200 bg-brand-neutral-100 appearance-none border ${autoWidth && "w-full"} ${className}`}
      placeholder={placeholder}
      {...inputProps}
    />
  );
};

export default Input;

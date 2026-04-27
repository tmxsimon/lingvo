import type React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> &
  React.RefAttributes<HTMLInputElement> & {
    placeholder?: string;
    autoWidth?: boolean;
    className?: string;
  };

const Input = ({
  placeholder,
  autoWidth = true,
  className = "",
  ...inputProps
}: InputProps) => {
  return (
    <input
      className={`p-base-sm rounded-base-xs border-brand-neutral-200 bg-bg border ${autoWidth && "w-full"} ${className}`}
      placeholder={placeholder}
      {...inputProps}
    />
  );
};

export default Input;

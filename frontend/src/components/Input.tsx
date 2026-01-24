import type React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> &
  React.RefAttributes<HTMLInputElement> & {
    placeholder?: string;
    className?: string;
  };

const Input = ({ placeholder, className, ...inputProps }: InputProps) => {
  return (
    <input
      className={`p-base-sm rounded-base-xs border-brand-neutral-200 w-full border bg-white ${className}`}
      placeholder={placeholder}
      {...inputProps}
    ></input>
  );
};

export default Input;

import type React from "react";
import type { SelectOptionType } from "../types";

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  options: SelectOptionType[];
  className?: string;
};

const Select = ({ options, className, ...selectProps }: SelectProps) => {
  return (
    <select
      className={`p-base-sm rounded-base-xs border-brand-neutral-200 w-full border bg-white ${className}`}
      {...selectProps}
    >
      {options.map((option, i) => (
        <option key={i} value={option.value}>
          {option.text}
        </option>
      ))}
    </select>
  );
};

export default Select;

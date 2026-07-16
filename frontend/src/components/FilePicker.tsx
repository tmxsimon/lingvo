import { useState } from "react";
import { inputSizeMap } from "../utils/inputMaps";

type FilePickerProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size"
> & {
  size?: "small" | "medium" | "large" | "auto";
  label: string;
};

const FilePicker = ({
  size = "medium",
  label,
  id,
  className = "",
  onChange,
  ...inputProps
}: FilePickerProps) => {
  const [fileName, setFileName] = useState("");
  const displayedLabel = fileName || label;

  className += ` ${inputSizeMap[size]}`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFileName(file?.name ?? "");

    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div className="flex">
      <label
        htmlFor={id}
        className={`p-base-sm rounded-base border-brand-neutral-200 bg-brand-neutral-100 w-full cursor-pointer appearance-none border ${className}`}
      >
        {displayedLabel}
      </label>
      <input
        id={id}
        type="file"
        className="hidden"
        onChange={handleChange}
        {...inputProps}
      />
    </div>
  );
};

export default FilePicker;

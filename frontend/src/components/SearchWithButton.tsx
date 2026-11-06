import { useState } from "react";
import Icon from "./Icon";
import IconButton from "./IconButton";
import Search from "./Search";
import { useTranslation } from "react-i18next";

type SearchWithButtonProps = {
  onSearch: (value: string) => void;
};

const SearchWithButton = ({ onSearch }: SearchWithButtonProps) => {
  const { t } = useTranslation();
  const [value, setValue] = useState<string>("");

  return (
    <div className="gap-base-sm flex w-full max-w-72">
      <Search
        className="flex-1"
        value={value}
        placeholder={t("search")}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSearch(value);
          }
        }}
      />
      <IconButton
        icon={<Icon name="search" className="size-6" />}
        onClick={() => onSearch(value)}
      />
    </div>
  );
};

export default SearchWithButton;

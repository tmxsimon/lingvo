import Icon from "../../../components/Icon";
import FilterDropdown from "./FilterDropdown";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { Filter } from "../hooks/useNotebookFilter";

type FilterBarProps = {
  filters: Filter[];
  onToggle: (id: string) => void;
};

const FilterBar = ({ filters, onToggle }: FilterBarProps) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        className="flex items-center gap-base rounded-2xl px-base-lg py-base border border-brand-neutral-200 bg-brand-neutral-100 shadow-(--shadow-search-bar) hover:brightness-95 active:brightness-90"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="text-brand-300 size-5">
          <Icon name="filter" />
        </div>
        <span className="text-brand-300 text-base font-medium">{t("notebook.filter")}</span>
      </button> 
      <FilterDropdown
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        options={filters}
        onToggle={onToggle}
      />
    </div>
  );
};

export default FilterBar;
import Icon from "../../../components/Icon";
import ICONS from "../../../constants/icons";

type FilterOption = {
  id: string;
  label: string;
  icon: keyof typeof ICONS;
  checked: boolean;
};

type FilterDropdownProps = {
  isOpen: boolean;
  onClose: () => void;
  options: FilterOption[];
  onToggle: (id: string) => void;
};

const FilterDropdown = ({ isOpen, onClose, options, onToggle }: FilterDropdownProps) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div className="w-64 absolute top-full right-0 mt-2 py-base-lg px-base-lg z-50 bg-white border border-brand-neutral-200 rounded-base-sm shadow-(--shadow-search-bar)">
        {options.map((option) => (
          <div
            key={option.id}
            className="flex items-center gap-base py-base-sm cursor-pointer hover:brightness-95"
            onClick={() => onToggle(option.id)}
          >
            <div className="fill-brand-300 size-6">
              <Icon name={option.icon} />
            </div>
            <span className="flex-1 text-brand-300 text-lg font-medium">
              {option.label}
            </span>
            <div
              className={`size-6 rounded-md flex justify-center items-center ${
                option.checked ? "bg-brand-300" : "border-2 border-brand-300"
              }`}
            >
              {option.checked && (
                <div className="size-4 stroke-white fill-none">
                  <Icon name="check" />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default FilterDropdown;

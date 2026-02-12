import Icon from "../../../components/Icon";
import { useTranslation } from "react-i18next";

type SearchBarProps = {
	value?: string;
	placeholder?: string;
	onChange?: (value: string) => void;
};

const SearchBar = ({
	value,
	placeholder,
	onChange,
}: SearchBarProps) => {
	const { t } = useTranslation();

	return (
		<div
			className="flex h-14 w-xl items-center gap-base px-base-lg py-3 rounded-2xl border border-brand-neutral-200 bg-brand-neutral-100 shadow-(--shadow-search-bar)"
		>
			<div className="text-brand-300 size-8">
				<Icon name="search" />
			</div>
			<input
				className="w-full text-lg text-brand-300 placeholder:text-brand-300 bg-transparent outline-none"
				placeholder={placeholder || t("notebook.search")}
				value={value}
				onChange={(event) => onChange?.(event.target.value)}
			/>
		</div>
	);
};

export default SearchBar;

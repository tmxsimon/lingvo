import Input from "./Input";

type SearchProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">;

const Search = ({ ...inputProps }: SearchProps) => {
  return <Input autoWidth={false} className="w-full" {...inputProps} />;
};

export default Search;

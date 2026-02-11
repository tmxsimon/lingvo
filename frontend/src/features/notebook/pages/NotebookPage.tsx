import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";
import StudyCard from "../components/StudyCard";
import AddNoteButton from "../components/AddNoteButton";
import { useNotebookFilter } from "../hooks/useNotebookFilter";
import { useTranslation } from "react-i18next";

const NotebookPage = () => {
  const { t } = useTranslation();
  const { notes, filters, handleFilterToggle, searchQuery, handleSearchChange, isLoading, error } = useNotebookFilter();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div className="flex flex-col items-center pt-38 gap-base">
      <h1 className="text-brand-300 text-5xl font-bold">{t("notebook.myNotes")}</h1>
      <p className="max-w-md text-center text-lg mt-base-sm text-neutral-400 leading-snug">
        {t("notebook.description")}
      </p>
      <div className="w-full flex items-center justify-center mt-10">
        <div className="relative">
          <SearchBar value={searchQuery} onChange={handleSearchChange} />
          <div className="flex absolute items-center left-full gap-base-lg top-0 ml-base-lg">
            <FilterBar filters={filters} onToggle={handleFilterToggle} />
            <AddNoteButton />
          </div>
        </div>
      </div>
      <div className="w-full flex justify-start gap-15 mt-16 pb-20">
        {notes.map((note) => (
          <StudyCard
            key={note.title}
            title={note.title}
            category={note.category}
            description={note.description}
            date={note.date}
          />
        ))}
      </div>
    </div>
  );
};

export default NotebookPage;
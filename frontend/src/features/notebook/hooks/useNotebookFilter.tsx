import { useState, useMemo } from "react";
import ICONS from "../../../constants/icons";

export type NotebookError = Error | null;

export type StudyCardData = {
  title: string;
  category: "vocabulary" | "grammar" | "pronunciation";
  description: string;
  date: string;
};

export type Filter = {
  id: string;
  label: string;
  icon: keyof typeof ICONS;
  checked: boolean;
};

export const useNotebookFilter = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(["vocabulary", "grammar", "pronunciation"]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error] = useState<NotebookError>(null);
  const [notes, setNotes] = useState<StudyCardData[]>([
    {
      title: "Irregular verbs",
      category: "vocabulary",
      description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos voluptates odio alias praesentium neque? Delectus iusto non autem quisquam velit!",
      date: "30.1.2026",
    },
    {
      title: "Present Perfect",
      category: "grammar",
      description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos voluptates odio alias praesentium neque? Delectus iusto non autem quisquam velit!",
      date: "30.1.2026",
    },
    {
      title: "Pronunciation of TH",
      category: "pronunciation",
      description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos voluptates odio alias praesentium neque? Delectus iusto non autem quisquam velit!",
      date: "30.1.2026",
    },
  ]);
  const [filters, setFilters] = useState<Filter[]>([
    { id: "general", label: "General", icon: "general", checked: true },
    { id: "vocabulary", label: "Vocabulary", icon: "vocabulary", checked: false },
    { id: "grammar", label: "Grammar", icon: "grammar", checked: false },
    { id: "pronunciation", label: "Pronunciation", icon: "pronunciation", checked: false },
  ]);

  const filteredNotes = useMemo(() => {
    return notes
      .filter((note) => selectedCategories.includes(note.category))
      .filter((note) => {
        if (!searchQuery) return true;
        const query = searchQuery.toLowerCase();
        return (
          note.title.toLowerCase().includes(query) ||
          note.description.toLowerCase().includes(query)
        );
      });
  }, [notes, selectedCategories, searchQuery]);

  const handleFilterToggle = (id: string) => {
    let updatedFilters;

    if (id === "general") {
      updatedFilters = filters.map((filter) =>
        filter.id === "general" 
          ? { ...filter, checked: !filter.checked } 
          : { ...filter, checked: false }
      );
    } else {
      updatedFilters = filters.map((filter) => {
        if (filter.id === id) {
          return { ...filter, checked: !filter.checked };
        }
        if (filter.id === "general" && filters.find((f) => f.id === id)?.checked === false) {
          return { ...filter, checked: false };
        }
        return filter;
      });
    }

    setFilters(updatedFilters);

    const generalChecked = updatedFilters.find((f) => f.id === "general")?.checked;
    const checkedIds = updatedFilters
      .filter((f) => f.checked && f.id !== "general")
      .map((f) => f.id);

    if (generalChecked) {
      setSelectedCategories(["vocabulary", "grammar", "pronunciation"]);
    } else {
      setSelectedCategories(checkedIds as ("vocabulary" | "grammar" | "pronunciation")[]);
    }
  };

  const addNote = (title: string, content: string, category: "vocabulary" | "grammar" | "pronunciation") => {
    const newNote: StudyCardData = {
      title,
      category,
      description: content,
      date: new Date().toLocaleDateString("cs-CZ"),
    };
    setNotes([...notes, newNote]);
  };

  return {
    notes: filteredNotes,
    filters,
    handleFilterToggle,
    searchQuery,
    handleSearchChange: setSearchQuery,
    addNote,
    isLoading: false,
    error,
  };
};

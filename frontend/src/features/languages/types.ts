export type LanguageContextType = {
  language: string;
  changeLanguage: (language: string) => void;
  clearLanguage: () => void;
};

export type LanguageType = {
  id: number;
  name: string;
  image_url: string;
  position: number;
  entries_count: number;
  notes_count: number;
};

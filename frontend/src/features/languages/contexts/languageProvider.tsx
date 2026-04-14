import { createContext, useContext, useState } from "react";
import type { LanguageContextType } from "../types";

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export const useLanguageContext = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguageContext must be used within LanguageProvider");
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState(
    () => localStorage.getItem("languageId") || "",
  );

  const changeLanguage = (language: string) => {
    setLanguage(language.toString());
    localStorage.setItem("languageId", language.toString());
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

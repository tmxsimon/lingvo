export type SelectOptionType = {
  value?: string | number | readonly string[];
  text?: string;
};

export type ThemeContextType = {
  theme: string;
  toggleTheme: () => void;
};

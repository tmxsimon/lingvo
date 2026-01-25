export type DictionaryEntryType = {
  id: number;
  content: string;
  translation: string;
  temperature: number;
  group_id: number;
  created_at: string;
};

export type DictionaryGroupType = {
  id: number;
  name: string;
  entries: DictionaryEntryType[];
  created_at: string;
};

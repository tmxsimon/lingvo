export type DictionaryEntryType = {
  id: number;
  content: string;
  translation: string;
  note?: string;
  temperature: number;
  user_id: number;
  group_id: number;
  created_at: string;
  position: number;
};

export type DictionaryGroupType = {
  id: number;
  name: string;
  entries: DictionaryEntryType[];
  user_id: number;
  created_at: string;
  position: number;
};

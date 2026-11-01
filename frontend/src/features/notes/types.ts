export type NoteType = {
  id: number;
  name: string;
  content: string;
  group_id: number;
  user_id: number;
  created_at: string;
  position: number;
};

export type NotesGroupType = {
  id: number;
  name: string;
  notes: NoteType[];
  user_id: number;
  created_at: string;
  position: number;
};

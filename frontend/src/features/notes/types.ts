export type NoteType = {
  id: number;
  name: string;
  content: string;
  group_id: number;
  created_at: string;
  position: number;
};

export type NotesGroupType = {
  id: number;
  name: string;
  notes: NoteType[];
  created_at: string;
  position: number;
};

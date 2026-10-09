export type LanguageContextType = {
  language: string;
  changeLanguage: (language: string) => void;
  clearLanguage: () => void;
};

export type UserPermissionsType = {
  can_write: boolean;
  can_edit: boolean;
  can_delete: boolean;
  can_share: boolean;
  can_edit_permissions: boolean;
  can_edit_language: boolean;
  is_owner: boolean;
  is_approved?: boolean;
};

export type UserRoleType = "collaborator" | "default" | "viewer" | "none";

export type LanguageType = {
  id: number;
  name: string;
  image_url: string;
  position: number;
  entries_count: number;
  notes_count: number;
  request_id?: number;
  user_permissions?: UserPermissionsType;
};

export type LanguageUserPermissionType = {
  id: number;
  language_id: number;
  user_id: number;
  grantor_id: number;
  can_write: boolean;
  can_edit: boolean;
  can_delete: boolean;
  can_share: boolean;
  can_edit_permissions: boolean;
  can_edit_language: boolean;
  is_owner: boolean;
  is_approved: boolean;
};

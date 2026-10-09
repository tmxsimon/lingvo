from datetime import datetime, timezone
from sqlmodel import Field, SQLModel, Relationship

# TODO: create read model

class Language(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str
    image_url: str | None = Field(default=None)
    entries_groups: list["EntriesGroup"] = Relationship(back_populates="language", cascade_delete=True)
    notes_groups: list["NotesGroup"] = Relationship(back_populates="language", cascade_delete=True)
    # default_user_permissions_id: int | None = Field(default=None, foreign_key="default_language_user_permissions.id")
    # default_user_permissions: "DefaultLanguageUserPermissions" | None = Relationship(back_populates="language", cascade_delete=True)
    user_permissions: list["LanguageUserPermissions"] = Relationship(back_populates="language", cascade_delete=True)
    position: int
    is_public: bool = Field(default=True)
    created_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc)
    )

class LanguageUserPermissions(SQLModel, table=True):
    __tablename__ = "language_user_permissions"

    id: int | None = Field(default=None, primary_key=True)
    language_id: int = Field(foreign_key="language.id")
    language: "Language" = Relationship(back_populates="user_permissions")
    grantor_id: int = Field(foreign_key="user.id")
    user_id: int = Field(foreign_key="user.id")
    user: "User" = Relationship(
        back_populates="languages_permissions",
        sa_relationship_kwargs={
            "foreign_keys": "[LanguageUserPermissions.user_id]"
        },
    )

    can_write: bool = Field(default=False) # can add, edit, delete own entries and groups
    can_edit: bool = Field(default=False) # can edit all entries and groups
    can_delete: bool = Field(default=False) # can delete all entries and groups
    can_share: bool = Field(default=False) # can share the language to other users
    can_edit_permissions: bool = Field(default=False) # can change permissions for all users
    can_edit_language: bool = Field(default=False)
    is_owner: bool = Field(default=False) # can delete the language

    is_approved: bool = Field(default=False)
    created_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc)
    )

# class DefaultLanguageUserPermissions(SQLModel, table=True):
#     __tablename__ = "default_language_user_permissions"

#     id: int | None = Field(default=None, primary_key=True)
#     language_id: int = Field(foreign_key="language.id")
#     language: "Language" = Relationship(back_populates="default_user_permissions")
#     can_write: bool = Field(default=False) # can add, edit, delete own entries and groups
#     can_edit: bool = Field(default=False) # can edit all entries and groups
#     can_delete: bool = Field(default=False) # can delete all entries and groups
#     can_share: bool = Field(default=False) # can share the language to other users
#     can_edit_permissions: bool = Field(default=False) # can change permissions for all users
#     can_edit_language: bool = Field(default=False)
#     is_owner: bool = Field(default=False) # can delete the language

#     created_at: datetime = Field(
#         default_factory=lambda: datetime.now(timezone.utc)
#     )

from src.users.models import User
from src.dictionary.models import EntriesGroup
from src.notes.models import NotesGroup
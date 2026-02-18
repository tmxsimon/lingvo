from datetime import datetime, timezone
from sqlmodel import Field, SQLModel, Relationship

class DictionaryEntry(SQLModel, table=True):
    __tablename__ = "dictionary_entry"

    id: int | None = Field(default=None, primary_key=True)
    content: str
    translation: str
    note: str | None = None
    temperature: int # 0 - 100 (%)
    language_name: str | None = Field(default=None, foreign_key="language.name")
    language: Language = Relationship(back_populates="entries")
    group_id: int = Field(foreign_key="entries_group.id") # TODO: change group_id to group_name
    group: EntriesGroup = Relationship(back_populates="entries")
    created_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc)
    )

class EntriesGroup(SQLModel, table=True):
    __tablename__ = "entries_group"

    id: int | None = Field(default=None, primary_key=True)
    name: str
    language_name: str | None = Field(default=None, foreign_key="language.name")
    language: Language = Relationship(back_populates="groups")
    entries: list["DictionaryEntry"] = Relationship(back_populates="group", cascade_delete=True)
    created_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc)
    )
    
from languages.models import Language
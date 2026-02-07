from datetime import datetime, timezone
from sqlmodel import Field, SQLModel, Relationship

class DictionaryEntry(SQLModel, table=True):
    __tablename__ = "dictionary_entry"

    id: int | None = Field(default=None, primary_key=True)
    content: str
    translation: str
    note: str | None = None
    temperature: int # 0 - 100 (%)
    group_id: int = Field(foreign_key="entries_group.id")
    group: EntriesGroup = Relationship(back_populates="entries")
    created_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc)
    )

class EntriesGroup(SQLModel, table=True):
    __tablename__ = "entries_group"

    id: int | None = Field(default=None, primary_key=True)
    name: str
    entries: list["DictionaryEntry"] = Relationship(back_populates="group", cascade_delete=True)
    created_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc)
    )
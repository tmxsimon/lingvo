from datetime import datetime, timezone
from sqlmodel import Field, SQLModel, Relationship

# TODO: create read models

class Note(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str
    content: str
    group_id: int = Field(foreign_key="notes_group.id")
    group: NotesGroup = Relationship(back_populates="notes")
    position: int
    created_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc)
    )

class NotesGroup(SQLModel, table=True):
    __tablename__ = "notes_group"

    id: int | None = Field(default=None, primary_key=True)
    name: str
    language_id: int | None = Field(default=None, foreign_key="language.id")
    language: Language = Relationship(back_populates="notes_groups")
    notes: list["Note"] = Relationship(back_populates="group", cascade_delete=True)
    position: int
    created_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc)
    )
    
from languages.models import Language

# alembic paths
# from src.languages.models import Language

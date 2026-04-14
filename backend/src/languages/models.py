from datetime import datetime, timezone
from sqlmodel import Field, SQLModel, Relationship

# TODO: create read model

class Language(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str
    image_url: str | None = Field(default=None)
    entries_groups: list["EntriesGroup"] = Relationship(back_populates="language", cascade_delete=True)
    notes_groups: list["NotesGroup"] = Relationship(back_populates="language", cascade_delete=True)
    position: int
    created_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc)
    )
    
from dictionary.models import EntriesGroup
from notes.models import NotesGroup

# alembic paths
# from src.dictionary.models import EntriesGroup
# from src.notes.models import NotesGroup
from datetime import datetime, timezone
from sqlmodel import Field, SQLModel, Relationship

class Language(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str
    image_url: str | None = Field(default=None)
    groups: list["EntriesGroup"] = Relationship(back_populates="language", cascade_delete=True)
    entries: list["DictionaryEntry"] = Relationship(back_populates="language", cascade_delete=True)
    created_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc)
    )
    
from dictionary.models import EntriesGroup, DictionaryEntry
from datetime import datetime, timezone
from sqlmodel import Field, SQLModel, Relationship

class User(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    username: str
    hashed_password: str
    image_url: str | None = Field(default=None)
    languages: list["Language"] = Relationship(back_populates="user", cascade_delete=True)

    created_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc)
    )

class UserRead(SQLModel):
    id: int
    username: str
    image_url: str | None = None
    created_at: datetime

from src.languages.models import Language
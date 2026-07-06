from datetime import datetime, timezone
from sqlmodel import Field, SQLModel, Relationship
from src.users.enums import AppLanguage, Theme

class User(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    username: str
    hashed_password: str
    image_url: str | None = Field(default=None)
    languages: list["Language"] = Relationship(back_populates="user", cascade_delete=True)
    settings: "Settings" = Relationship(back_populates="user", cascade_delete=True)

    created_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc)
    )

class UserRead(SQLModel):
    id: int
    username: str
    image_url: str | None = None
    created_at: datetime

class Settings(SQLModel, table=True):    
    id: int | None = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="user.id")
    user: "User" = Relationship(back_populates="settings")
    app_language: AppLanguage = Field(default=AppLanguage.ENGLISH)
    theme: Theme = Field(default=Theme.DARK)

    created_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc)
    )

from src.languages.models import Language
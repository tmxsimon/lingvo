from datetime import datetime, timezone
from sqlmodel import Field, SQLModel, Relationship

class User(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    username: str
    hashed_password: str
    image_url: str | None = Field(default=None)
    is_public: bool = Field(default=True)
    languages: list["Language"] = Relationship(back_populates="user", cascade_delete=True)

    created_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc)
    )

class UserRead(SQLModel):
    id: int
    username: str
    image_url: str | None = None
    is_public: bool
    created_at: datetime

class UserFriend(SQLModel, table=True):
    __tablename__ = "user_friend"

    id: int | None = Field(default=None, primary_key=True)
    # uid1 < uid2 !
    uid1: int = Field(foreign_key="user.id")
    uid2: int = Field(foreign_key="user.id")
    requestor: int = Field(foreign_key="user.id")
    is_approved: bool = Field(default=False)

    created_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc)
    )

from src.languages.models import Language
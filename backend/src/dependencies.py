from fastapi import Depends
from sqlmodel import Session
from src.users.models import User
from src.users.service import get_current_user
from .db import get_session

SessionDep: Session = Depends(get_session)

UserDep: User = Depends(get_current_user)
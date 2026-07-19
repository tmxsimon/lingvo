from datetime import datetime, timedelta, timezone
import jwt
from fastapi import Depends, HTTPException, status, UploadFile
from fastapi.security import OAuth2PasswordBearer
from sqlmodel import Session, select
from pwdlib import PasswordHash
from src.db import get_session
from src.utils.images import add_image, remove_image, replace_image
from .models import User

UPLOADS_URL = "uploads/user_uploads/profile_pictures"
DEFAULT_IMAGE_URL = "uploads/user_uploads/profile_pictures/default.jpg"

SECRET_KEY = ":/"  # very secret
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30 * 24 * 60

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/users/token")
password_hash = PasswordHash.recommended()

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def authenticate_user(session: Session, username: str, password: str):
    user = session.exec(select(User).where(User.username == username)).first()
    if not user:
        return False
    if not password_hash.verify(password, user.hashed_password):
        return False
    return user

def verify_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("sub")
        if user_id is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Could not validate credentials",
                headers={"WWW-Authenticate": "Bearer"},
            )
        return int(user_id)
    except (jwt.PyJWTError, ValueError):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )


def get_current_user(
    token: str = Depends(oauth2_scheme),
    session: Session = Depends(get_session),
):
    user_id = verify_token(token)
    user = session.get(User, user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return user


def get_users_db(session: Session):
    return session.exec(select(User)).all()


def create_user_db(
    session: Session,
    username: str,
    password: str,
    image: UploadFile | None = None
):  
    
    filepath = DEFAULT_IMAGE_URL
    if image:
        filepath = add_image(image, UPLOADS_URL)

    user = User(username=username, hashed_password=password_hash.hash(password), image_url=filepath)

    if user is None:
        return None
    
    session.add(user)
    session.flush()
    
    session.commit()
    session.refresh(user)
    return user

def delete_user_db(
    session: Session,
    id: int
):
    user = session.get(User, id)
    if user is None:
        return None
    
    remove_image(user.image_url, DEFAULT_IMAGE_URL)

    session.delete(user)
    session.commit()

    return user

def update_user_db(
    session: Session,
    id: int,
    username: str | None = None,
    password: str | None = None,
    image: UploadFile | None = None
):
    user = session.get(User, id)
    if user is None:
        return None
    
    filepath = user.image_url if user.image_url else DEFAULT_IMAGE_URL
    if image:
        filepath = replace_image(user.image_url, image, DEFAULT_IMAGE_URL, UPLOADS_URL)
        user.image_url = filepath

    if username:
        user.username = username
    if len(password) > 0:
        user.hashed_password = password_hash.hash(password)

    session.add(user)
    session.commit()
    session.refresh(user)

    return user
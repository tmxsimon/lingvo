import os
from pathlib import Path
import uuid
from fastapi import UploadFile
from sqlmodel import Session, select, func
from src.users.models import User
from .models import Language

UPLOADS_URL = "uploads/user_uploads/language_images"
DEFAULT_IMAGE_URL = "uploads/user_uploads/language_images/default.jpg"

def get_languages_db(user: User, session: Session):
    return session.exec(select(Language).where(Language.user_id == user.id).order_by(Language.position.desc())).all()

def create_language_db(
    user: User,
    session: Session,
    name: str,
    image: UploadFile | None = None
):  
    max_position = session.exec(select(func.max(Language.position))).first()
    position = (max_position or 0) + 1

    filepath = DEFAULT_IMAGE_URL
    if image:
        ext = image.filename.split(".")[-1]
        filename = f"{uuid.uuid4()}.{ext}"
        filepath = os.path.join(UPLOADS_URL, filename)

        with open("src/" + filepath, "wb") as buffer:
            buffer.write(image.file.read())    

    language = Language(name=name, image_url=filepath, position=position, user_id=user.id)

    if language is None:
        return None
    
    session.add(language)
    session.commit()
    session.refresh(language)

    return language

def delete_language_db(
    user: User,
    session: Session,
    id: int
):
    language = session.exec(select(Language).where(Language.id == id and Language.user_id == user.id)).first()
    if language is None:
        return None
    
    if language.image_url and language.image_url != DEFAULT_IMAGE_URL:
        image_to_delete_url = language.image_url
        os.remove(image_to_delete_url)

    session.delete(language)
    session.commit()

    return language

def update_language_db(
    user: User,
    session: Session,
    id: int,
    name: str | None = None,
    image: UploadFile | None = None
):
    language = session.exec(select(Language).where(Language.id == id and Language.user_id == user.id)).first()
    if language is None:
        return None
    
    filepath = language.image_url if language.image_url else DEFAULT_IMAGE_URL
    if image:
        path_exists = Path("src/" + language.image_url).exists()
        if path_exists and language.image_url != DEFAULT_IMAGE_URL:
            os.remove("src/" + language.image_url)
        ext = image.filename.split(".")[-1]
        filename = f"{uuid.uuid4()}.{ext}"
        filepath = os.path.join(UPLOADS_URL, filename)

        with open("src/" + filepath, "wb") as buffer:
            buffer.write(image.file.read())

    language.image_url = filepath

    if name:
        language.name = name
        
    session.add(language)
    session.commit()
    session.refresh(language)

    return language

def reorder_languages_db(session: Session, ordered_ids: list[int]):
    languages = session.exec(select(Language).where(Language.id.in_(ordered_ids))).all()
    language_map = {language.id: language for language in languages}

    for index, language_id in enumerate(ordered_ids):
        if language_id in language_map:
            language_map[language_id].position = len(ordered_ids) - index
            session.add(language_map[language_id])

    session.commit()

    return list(language_map.values())

# def remove_language_image_db(session: Session, id):
#     language = session.get(Language, id)

#     if language is None:
#         return None

#     if language.image_url and language.image_url != DEFAULT_IMAGE_URL:
#         os.remove(os.path.join(UPLOAD_DIR, language.image_url))
#         language.image_url = DEFAULT_IMAGE_URL

#         session.add(language)
#         session.commit()
#         session.refresh(language)
    
#     return language

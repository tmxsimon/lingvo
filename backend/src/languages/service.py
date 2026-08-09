from fastapi import UploadFile
from sqlmodel import Session, select, func
from src.utils.images import add_image, remove_image, replace_image
from src.users.models import User
from .models import Language

UPLOADS_URL = "uploads/user_uploads/language_images"
DEFAULT_IMAGE_URL = "uploads/user_uploads/language_images/default.jpg"

def _language_to_dict(language: Language) -> dict[str, Any]:
    entries_count = sum(len(group.entries or []) for group in language.entries_groups or [])
    notes_count = sum(len(group.notes or []) for group in language.notes_groups or [])

    return {
        "id": language.id,
        "name": language.name,
        "image_url": language.image_url,
        "position": language.position,
        "created_at": language.created_at,
        "entries_count": entries_count,
        "notes_count": notes_count,
    }

def get_languages_db(user: User, session: Session):
    languages = session.exec(select(Language).where(Language.user_id == user.id).order_by(Language.position.desc())).all()
    languages_with_sizes = []
    for language in languages:
        languages_with_sizes.append(_language_to_dict(language))
    return languages_with_sizes

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
        filepath = add_image(image, UPLOADS_URL)

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
    
    remove_image(language.image_url, DEFAULT_IMAGE_URL)

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
        filepath = replace_image(language.image_url, image, DEFAULT_IMAGE_URL, UPLOADS_URL)
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
        language = language_map.get(language_id)
        if language is None:
            continue

        language.position = len(ordered_ids) - index
        session.add(language)

    session.commit()

    return [language_map[language_id] for language_id in ordered_ids if language_id in language_map]

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

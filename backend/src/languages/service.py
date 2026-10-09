from fastapi import UploadFile, Body, Query
from sqlmodel import Session, select, func
from src.utils.images import add_image, remove_image, replace_image
from src.users.models import User
from .models import Language, LanguageUserPermissions
from .utils import LanguageRoleType, create_user_role, create_viewer_permissions, language_to_dict, create_owner_permissions, create_collaborator_permissions, create_default_user_permissions

UPLOADS_URL = "assets/user_uploads/language_images"
DEFAULT_IMAGE_URL = "assets/default_images/default_language.png"


def get_user_languages_db(user: User, session: Session):
    user_permissions = session.exec(
        select(LanguageUserPermissions).where(
            LanguageUserPermissions.grantor_id == user.id,
            LanguageUserPermissions.user_id == user.id,
        )
    ).all()

    languages_with_sizes = []
    for permission in user_permissions:
        if permission.language is None:
            continue

        language_dict = language_to_dict(permission.language)
        language_dict["user_permissions"] = permission.dict()
        languages_with_sizes.append(language_dict)

    languages_with_sizes.sort(key=lambda language: language["id"], reverse=True)
    return languages_with_sizes

def get_shared_languages_db(user: User, session: Session):
    user_permissions = session.exec(
        select(LanguageUserPermissions).where(
            LanguageUserPermissions.user_id == user.id,
            LanguageUserPermissions.grantor_id != user.id,
        )
    ).all()

    languages_with_sizes = []
    requests_with_sizes = []

    for permission in user_permissions:
        if permission.language is None:
            continue

        language_dict = language_to_dict(permission.language)
        language_dict["request_id"] = permission.id
        language_dict["user_permissions"] = permission.dict()

        if permission.is_approved:
            languages_with_sizes.append(language_dict)
        else:
            requests_with_sizes.append(language_dict)

    return languages_with_sizes, requests_with_sizes

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

    permissions = create_owner_permissions(language.id, user.id, user.id)

    session.add(permissions)
    session.commit()

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


def get_available_users_for_language_db(user: User, session: Session, language_id: int):
    language = session.exec(select(Language).where(Language.id == language_id)).first()
    if language is None:
        return []

    permissions = session.exec(select(LanguageUserPermissions).where(LanguageUserPermissions.language_id == language_id)).all()
    user_ids_with_permissions = {permission.user_id for permission in permissions}

    available_users = session.exec(select(User).where(User.id != user.id, User.id.notin_(user_ids_with_permissions))).all()

    return available_users

def get_language_users_db(user: User, session: Session, language_id: int):
    permissions = session.exec(select(LanguageUserPermissions).where(LanguageUserPermissions.language_id == language_id, LanguageUserPermissions.user_id != user.id)).all()
    users_with_permissions = []

    for permission in permissions:
        if permission.user is None:
            continue

        user_dict = permission.user.dict()
        user_dict["permissions"] = permission.dict()
        users_with_permissions.append(user_dict)

    return users_with_permissions

def add_user_to_language_db(session: Session, language_id: int, grantor: User, user_id: int, role: LanguageRoleType):
    language = session.exec(select(Language).where(Language.id == language_id)).first()
    if language is None:
        return None

    user_to_add = session.exec(select(User).where(User.id == user_id)).first()
    if user_to_add is None:
        return None

    grantor_permissions = session.exec(select(LanguageUserPermissions).where(LanguageUserPermissions.language_id == language_id, LanguageUserPermissions.user_id == grantor.id)).first()
    if grantor_permissions is None or not grantor_permissions.can_share:
        return None

    permissions = create_user_role(role, language_id, grantor.id, user_id)

    session.add(permissions)
    session.commit()
    session.refresh(permissions)

    return permissions

def remove_user_from_language_db(session: Session, grantor: User, language_id: int, user_id: int):
    language = session.exec(select(Language).where(Language.id == language_id)).first()
    if language is None:
        return None

    user_to_remove = session.exec(select(User).where(User.id == user_id)).first()
    if user_to_remove is None:
        return None

    grantor_permissions = session.exec(select(LanguageUserPermissions).where(LanguageUserPermissions.language_id == language_id, LanguageUserPermissions.user_id == grantor.id)).first()
    if grantor_permissions is None or not grantor_permissions.can_share:
        return None

    permissions = session.exec(select(LanguageUserPermissions).where(LanguageUserPermissions.language_id == language_id, LanguageUserPermissions.user_id == user_id)).first()
    if permissions is None:
        return None

    session.delete(permissions)
    session.commit()

    return permissions

def change_user_role_db(session: Session, language_id: int, grantor: User, user_id: int, role: LanguageRoleType):
    language = session.exec(select(Language).where(Language.id == language_id)).first()
    if language is None:
        return None

    user_to_change = session.exec(select(User).where(User.id == user_id)).first()
    if user_to_change is None:
        return None

    grantor_permissions = session.exec(select(LanguageUserPermissions).where(LanguageUserPermissions.language_id == language_id, LanguageUserPermissions.user_id == grantor.id)).first()
    if grantor_permissions is None or not grantor_permissions.can_share:
        return None

    permissions = session.exec(select(LanguageUserPermissions).where(LanguageUserPermissions.language_id == language_id, LanguageUserPermissions.user_id == user_id)).first()
    if permissions is None:
        return None

    session.delete(permissions)
    
    new_permissions = create_user_role(role, language_id, grantor.id, user_id)

    session.add(new_permissions)
    session.commit()
    session.refresh(new_permissions)

    return new_permissions

def get_user_language_requests_db(user: User, session: Session):
    requests = session.exec(select(LanguageUserPermissions).where(LanguageUserPermissions.user_id == user.id, LanguageUserPermissions.is_approved == False)).all()
    return requests

def get_user_requested_languages_db(user: User, session: Session):
    requests = session.exec(select(LanguageUserPermissions).where(LanguageUserPermissions.user_id == user.id, LanguageUserPermissions.is_approved == False)).all()
    requested_languages = [perm.language for perm in requests if perm.language is not None]

    languages_with_sizes = []
    for language in requested_languages:
            languages_with_sizes.append(language_to_dict(language))
    return languages_with_sizes

def approve_language_request_db(user: User, session: Session, permissions_id: int):
    permissions = session.exec(select(LanguageUserPermissions).where(LanguageUserPermissions.id == permissions_id)).first()
    if permissions is None:
        return None

    if permissions.user_id != user.id:
        return None

    permissions.is_approved = True
    session.add(permissions)
    session.commit()
    session.refresh(permissions)

    return permissions


def reject_language_request_db(user: User, session: Session, permissions_id: int):
    permissions = session.exec(select(LanguageUserPermissions).where(LanguageUserPermissions.id == permissions_id)).first()
    if permissions is None:
        return None

    if permissions.user_id != user.id:
        return None

    session.delete(permissions)
    session.commit()

    return permissions

def leave_language_db(user: User, session: Session, language_id: int):
    permissions = session.exec(select(LanguageUserPermissions).where(LanguageUserPermissions.language_id == language_id, LanguageUserPermissions.user_id == user.id)).first()
    if permissions is None:
        return None

    session.delete(permissions)
    session.commit()

    return permissions
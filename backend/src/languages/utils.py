from enum import Enum
from .models import Language, LanguageUserPermissions

def language_to_dict(language: Language) -> dict[str, Any]:
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

# permissions

class LanguageRoleType(str, Enum):
    COLLABORATOR = "collaborator"
    DEFAULT = "default"
    VIEWER = "viewer"
    NONE = "none"

def create_owner_permissions(language_id, grantor_id, user_id):
    return LanguageUserPermissions(
        language_id=language_id,
        grantor_id=grantor_id,
        user_id=user_id,
        can_write=True,
        can_edit=True,
        can_delete=True,
        can_share=True,
        can_edit_permissions=True,
        can_edit_language=True,
        is_owner=True,
        is_approved=True
    )

def create_collaborator_permissions(language_id, grantor_id, user_id, is_approved=False):
    return LanguageUserPermissions(
        language_id=language_id,
        grantor_id=grantor_id,
        user_id=user_id,
        can_write=True,
        can_edit=True,
        can_delete=True,
        can_share=True,
        can_edit_permissions=False,
        can_edit_language=False,
        is_owner=False,
        is_approved=is_approved
    )

# can add, edit, delete their own entries
def create_default_user_permissions(language_id, grantor_id, user_id, is_approved=False):
    return LanguageUserPermissions(
        language_id=language_id,
        grantor_id=grantor_id,
        user_id=user_id,
        can_write=True,
        can_edit=False,
        can_delete=False,
        can_share=False,
        can_edit_permissions=False,
        can_edit_language=False,
        is_owner=False,
        is_approved=is_approved
    )

def create_viewer_permissions(language_id, grantor_id, user_id, is_approved=False):
    return LanguageUserPermissions(
        language_id=language_id,
        grantor_id=grantor_id,
        user_id=user_id,
        can_write=False,
        can_edit=False,
        can_delete=False,
        can_share=False,
        can_edit_permissions=False,
        can_edit_language=False,
        is_owner=False,
        is_approved=is_approved
    )

def create_user_role(role: LanguageRoleType, language_id: int, grantor_id: int, user_id: int, is_approved: bool) -> LanguageUserPermissions:
    if role == LanguageRoleType.COLLABORATOR:
        return create_collaborator_permissions(language_id, grantor_id, user_id, is_approved)
    elif role == LanguageRoleType.DEFAULT:
        return create_default_user_permissions(language_id, grantor_id, user_id, is_approved)
    elif role == LanguageRoleType.VIEWER:
        return create_viewer_permissions(language_id, grantor_id, user_id, is_approved)
    else:
        raise ValueError(f"Invalid role: {role}")


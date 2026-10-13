from fastapi import APIRouter, Form, HTTPException, status, UploadFile, Body, Query
from src.dependencies import SessionDep, UserDep
from .service import (
    get_available_users_for_language_db,
    get_language_db,
    get_language_users_db,
    get_user_languages_db,
    get_shared_languages_db,
    create_language_db,
    delete_language_db,
    leave_language_db,
    remove_user_from_language_db,
    update_language_db,
    reorder_languages_db,
    add_user_to_language_db,
    approve_language_request_db,
    reject_language_request_db,
    get_user_language_requests_db,
    get_user_requested_languages_db,
    change_user_role_db
)
from .utils import LanguageRoleType

router = APIRouter(
    prefix="/languages",
    tags=["Languages"],
)



@router.get("/")
async def get_user_languages(user = UserDep, session = SessionDep):
    languages = get_user_languages_db(user=user, session=session)

    if languages is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No languages found"
        )
    return languages


@router.post("/")
async def create_language(
    name: str = Form(...),
    image: UploadFile | None = None,
    user = UserDep,
    session = SessionDep
):
    language = create_language_db(
        user=user,
        session=session,
        name=name,
        image=image
    )

    if language is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Language not created"
        )
    
    return language

@router.delete("/{id}")
async def delete_language(id: int, user = UserDep, session = SessionDep):
    language = delete_language_db(user, session, id)

    if language is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Language not found"
        )
    
    return language

@router.put("/reorder")
async def reorder_languages(
    ordered_ids: list[int], 
    session = SessionDep
):
    return reorder_languages_db(session, ordered_ids)

@router.put("/{id}")
async def update_language(
    id: int,
    name: str = Form(...),
    image: UploadFile | None = None,
    user = UserDep,
    session = SessionDep
):
    language = update_language_db(
        user=user,
        session=session,
        id=id,
        name=name,
        image=image
    )

    if language is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Language not found"
        )
    
    return language


@router.get("/shared")
async def get_shared_languages(user = UserDep, session = SessionDep):
    languages, requests = get_shared_languages_db(user=user, session=session)

    if languages is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No languages found"
        )
    return {"languages": languages, "requests": requests}

@router.get("/{language_id}")
async def get_language(language_id: int, user = UserDep, session = SessionDep):
    language = get_language_db(user=user, session=session, language_id=language_id)

    if language is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Language not found"
        )
    
    return language


@router.get("/{language_id}/users")
async def get_language_users(
    language_id: int,
    user = UserDep,
    session = SessionDep
):  
    users = get_language_users_db(user=user, session=session, language_id=language_id)
    return users

@router.get("/{language_id}/available-users")
async def get_available_users_for_language(
    language_id: int,
    user = UserDep,
    session = SessionDep
):
    users = get_available_users_for_language_db(user=user, session=session, language_id=language_id)
    return users

@router.post("/{language_id}/add-user")
async def add_user_to_language(
    language_id: int,
    user_id: int = Body(...),
    role: LanguageRoleType = Body(...),
    grantor = UserDep,
    session = SessionDep
):
    permissions = add_user_to_language_db(
        language_id=language_id,
        grantor=grantor,
        user_id=user_id,
        role=role,
        session=session
    )

    if permissions is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not added to language"
        )
    
    return permissions

@router.delete("/{language_id}/remove-user")
async def remove_user_from_language(
    language_id: int,
    user_id: int,
    grantor = UserDep,
    session = SessionDep
):
    permissions = remove_user_from_language_db(
        grantor=grantor,
        session=session,
        language_id=language_id,
        user_id=user_id
    )

    if permissions is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found in language"
        )
    
    return permissions

@router.put("/{language_id}/change-role")
async def change_user_role(
    language_id: int,
    user_id: int = Body(...),
    role: LanguageRoleType = Body(...),
    grantor = UserDep,
    session = SessionDep
):
    permissions = change_user_role_db(
        language_id=language_id,
        grantor=grantor,
        user_id=user_id,
        role=role,
        session=session
    )

    if permissions is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found in language"
        )

    return permissions

@router.get("/requests")
async def get_user_language_requests(
    user = UserDep,
    session = SessionDep
):
    requests = get_user_language_requests_db(user=user, session=session)

    if requests is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No language requests found"
        )
    
    return requests


@router.put("/requests/{permissions_id}/approve")
async def approve_language_request(
    permissions_id: int,
    user = UserDep,
    session = SessionDep
):
    permissions = approve_language_request_db(
        user=user,
        session=session,
        permissions_id=permissions_id,
    )

    if permissions is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Language request not found"
        )

    return permissions


@router.delete("/requests/{permissions_id}")
async def reject_language_request(
    permissions_id: int,
    user = UserDep,
    session = SessionDep
):
    permissions = reject_language_request_db(
        user=user,
        session=session,
        permissions_id=permissions_id,
    )

    if permissions is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Language request not found"
        )

    return permissions

@router.delete("/{language_id}/leave")
async def leave_language(
    language_id: int,
    user = UserDep,
    session = SessionDep
):
    permissions = leave_language_db(
        user=user,
        session=session,
        language_id=language_id,
    )

    if permissions is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Language not found"
        )

    return permissions
from fastapi import APIRouter, Form, HTTPException, status, UploadFile
from dependencies import SessionDep
from .service import (
    get_languages_db,
    create_language_db,
    delete_language_db,
    # remove_language_image_db,
    update_language_db,
)

router = APIRouter(
    prefix="/languages",
    tags=["Languages"],
)

@router.get("/")
async def get_languages(session = SessionDep):
    languages = get_languages_db(session)

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
    session = SessionDep
):
    language = create_language_db(
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
async def delete_language(id: int, session = SessionDep):
    language = delete_language_db(session, id)

    if language is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Language not found"
        )
    
    return language

@router.put("/{id}")
async def update_language(
    id: int,
    name: str = Form(...),
    image: UploadFile | None = None,
    session = SessionDep
):
    language = update_language_db(
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


# @router.put("/{id}/remove-image")
# async def remove_language_image(id: int, session = SessionDep):
#     language = remove_language_image_db(session, id)

#     if language is None:
#         raise HTTPException(
#             status_code=status.HTTP_404_NOT_FOUND,
#             detail="Language not found"
#         )
    
#     return language
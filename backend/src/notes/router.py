from fastapi import APIRouter, HTTPException, status
from dependencies import SessionDep
from .service import (
    get_note_db,
    get_notes_by_group_db,
    create_note_db,
    delete_note_db,
    reorder_notes_db,
    reorder_groups_db,
    update_note_db,
    get_group_db,
    get_groups_db,
    create_group_db,
    delete_group_db,
    update_group_db
)

router = APIRouter(
    prefix="/notes",
    tags=["Notes"],
)

# notes

@router.get("/groups/{group_id}/notes/{note_id}")
async def get_note(group_id: int, note_id: int, session = SessionDep):
    note = get_note_db(session, group_id=group_id, note_id=note_id)
    if note is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Note not found"
        )
    return note

@router.get("/groups/{group_id}/notes")
async def get_notes_by_group(group_id: int, language: int, session = SessionDep):
    notes = get_notes_by_group_db(session, group_id=group_id, language=language)
    if notes is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No notes found"
        )
    return notes

@router.post("/notes")
async def create_note(
    name: str,
    group_id: int,
    session = SessionDep
    ):
    note = create_note_db(
        session = session,
        name=name,
        group_id=group_id
    )
    if note is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Failed to create note"
        )
    return note


@router.delete("/notes/{id}")
async def delete_note( id: int, session = SessionDep):
    note = delete_note_db(session, id)
    if note is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="note not found"
        )
    return note

@router.put("/notes/reorder")
async def reorder_notes(
    ordered_ids: list[int],
    session = SessionDep
):
    return reorder_notes_db(session, ordered_ids)

@router.put("/notes/{id}")
async def update_note(
    id: int,
    content: str | None = None,
    name: str | None = None,
    group_id: int | None = None,
    session = SessionDep
):
    note = update_note_db(
        session = session,
        id=id,
        name=name,
        content=content,
        group_id=group_id
    )
    if note is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="note not found"
        )
    return note

# groups

@router.get("/groups")
async def get_groups(language: int, session = SessionDep):
    groups = get_groups_db(session, language=language)
    if groups is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No groups found"
        )
    return groups

@router.get("/groups/{id}")
async def get_group_and_notes(id: int | None = None, session = SessionDep):
    group = get_group_db(session=session, id=id)
    if group is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Group not found"
        )
    
    entires = sorted(group.notes, key=lambda x: x.position, reverse=True)
    
    return {"group": group, "notes": entires}


@router.post("/groups")
async def create_group(language: int, name: str,  session = SessionDep):
    group = create_group_db(
        language=language,
        name=name,
        session=session
    )
    if group is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Failed to create group"
        )
    return group

@router.delete("/groups/{id}")
async def delete_group(id: int, session = SessionDep):
    group = delete_group_db(session=session, id=id)
    if group is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Group not found"
        )
    return group

@router.put("/groups/reorder")
async def reorder_groupss(
    ordered_ids: list[int], 
    session = SessionDep
):
    return reorder_groups_db(session, ordered_ids)


@router.put("/groups/{id}")
async def update_group(
    id: int,
    language: int | None = None ,
    name: str | None = None,
    session = SessionDep
):
    group = update_group_db(
        session=session,
        id=id,
        language=language,
        name=name,
    )
    if group is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Group not found"
        )
    return group
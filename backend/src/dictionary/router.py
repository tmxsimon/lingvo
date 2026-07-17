from fastapi import APIRouter, HTTPException, status
from src.dependencies import SessionDep
from .service import (
    get_entries_db,
    get_entries_by_group_db,
    create_entry_db,
    delete_entry_db,
    reorder_entries_db,
    reorder_groups_db,
    update_entry_db,
    get_group_db,
    get_groups_db,
    create_group_db,
    delete_group_db,
    update_group_db
)

router = APIRouter(
    prefix="/dictionary",
    tags=["Dictionary"],
)

# entries


@router.get("/entries")
async def get_entries_by_group(language: int, limit: int = 50, offset: int = 0, group_id: int | None = None, session = SessionDep):
    entries = get_entries_by_group_db(session, group_id=group_id, language=language, limit=limit, offset=offset)
    if entries is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No entries found"
        )
    group = get_group_db(session=session, id=group_id)

    return { "entries": entries, "group": group }

@router.post("/entries")
async def create_entry(
    content: str,
    translation: str,
    group_id: int,
    note: str | None = None,
    session = SessionDep
    ):
    entry = create_entry_db(
        session = session,
        content=content,
        translation=translation,
        note=note,
        temperature=100,
        group_id=group_id
    )
    if entry is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Failed to create entry"
        )
    return entry


@router.delete("/entries/{id}")
async def delete_entry( id: int, session = SessionDep):
    entry = delete_entry_db(session, id)
    if entry is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Entry not found"
        )
    return entry

@router.put("/entries/reorder")
async def reorder_entries(
    ordered_ids: list[int],
    session = SessionDep
):
    return reorder_entries_db(session, ordered_ids)

@router.put("/entries/{id}")
async def update_entry(
    id: int,
    content: str | None = None,
    translation: str | None = None,
    note: str | None = None,
    temperature: int | None = None,
    group_id: int | None = None,
    session = SessionDep
):
    entry = update_entry_db(
        session = session,
        id=id,
        content=content,
        translation=translation,
        note=note,
        temperature=temperature,
        group_id=group_id
    )
    if entry is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Entry not found"
        )
    return entry
    

# groups

@router.get("/groups")
async def get_groups(language: int, limit: int = 50, offset: int = 0, session = SessionDep):
    groups = get_groups_db(session, language=language, limit=limit, offset=offset)
    if groups is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No groups found"
        )
    return groups

@router.get("/groups/{id}")
async def get_group_and_entries(id: int | None = None, session = SessionDep):
    group = get_group_db(session=session, id=id)
    if group is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Group not found"
        )
    
    entires = sorted(group.entries, key=lambda x: x.position, reverse=True)
    
    return {"group": group, "entries": entires}


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
    language: int | None = None,
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


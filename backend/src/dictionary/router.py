from fastapi import APIRouter, HTTPException, status
from dependencies import SessionDep
from .service import (
    get_entries_db,
    get_entries_by_group_db,
    create_entry_db,
    delete_entry_db,
    update_entry_db,
    TemperatureActionEnum,
    change_temperature_db,
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
async def get_entries_group(session = SessionDep):
    entries = get_entries_db(session)
    if entries is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No entries found"
        )
    return entries

@router.get("/groups/{group_id}/entries")
async def get_entries_by_group(group_id: int, session = SessionDep):
    entries = get_entries_by_group_db(session, group_id=group_id)
    if entries is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No entries found"
        )
    return entries

@router.post("/entries")
async def create_entry(
    content: str,
    translation: str,
    group_id: int,
    note: str | None = None,
    session = SessionDep
    ):
    entry = create_entry_db(session = session,
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
async def delete_entry(id: int, session = SessionDep):
    entry = delete_entry_db(session, id)
    if entry is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Entry not found"
        )
    return entry

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

@router.put("/entries/{id}/temperature")
async def change_temperature(id: int, action: TemperatureActionEnum, step: int, session = SessionDep):
    entry = change_temperature_db(
        session = session,
        id=id,
        action=action,
        step=step
    )
    if entry is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Entry not found"
        )
    return entry
    

# groups

@router.get("/groups/{id}")
async def get_group(id: int | None = None, session = SessionDep):
    group = get_group_db(session=session, id=id)
    if group is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Group not found"
        )

    return group

@router.get("/groups")
async def get_groups(session = SessionDep):
    groups = get_groups_db(session)
    if groups is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No groups found"
        )
    return groups

@router.post("/groups")
async def create_group(name: str, session = SessionDep):
    group = create_group_db(
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
    group = delete_group_db(session, id)
    if group is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Group not found"
        )
    return group

@router.put("/groups/{id}")
async def update_group(
    id: int,
    name: str | None = None,
    session = SessionDep
):
    group = update_group_db(
        session,
        id,
        name
    )
    if group is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Group not found"
        )
    return group
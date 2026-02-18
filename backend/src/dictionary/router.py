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

@router.get("/{language}/entries")
async def get_entries_group(language: str, session = SessionDep):
    entries = get_entries_db(session, language=language)
    if entries is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No entries found"
        )
    return entries

@router.get("/{language}/groups/{group_id}/entries")
async def get_entries_by_group( group_id: int, language: str, session = SessionDep):
    entries = get_entries_by_group_db(session, group_id=group_id, language=language)
    if entries is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No entries found"
        )
    return entries

@router.post("/{language}/entries")
async def create_entry(
    language: str,
    content: str,
    translation: str,
    group_id: int,
    note: str | None = None,
    session = SessionDep
    ):
    entry = create_entry_db(
        session = session,
        language=language,
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


@router.delete("/{language}/entries/{id}")
async def delete_entry( id: int,language: str, session = SessionDep):
    entry = delete_entry_db(session, id, language=language)
    if entry is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Entry not found"
        )
    return entry

@router.put("/{language}/entries/{id}")
async def update_entry(
    id: int,
    language: str,
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
        language=language,
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

@router.put("/{language}/entries/{id}/temperature")
async def change_temperature(id: int, language: str, action: TemperatureActionEnum, step: int, session = SessionDep):
    entry = change_temperature_db(
        session = session,
        id=id,
        language=language,
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

@router.get("/{language}/groups/{id}")
async def get_group(language: str, id: int | None = None, session = SessionDep):
    group = get_group_db(session=session, id=id, language=language)
    if group is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Group not found"
        )

    return group

@router.get("/{language}/groups")
async def get_groups(language: str, session = SessionDep):
    groups = get_groups_db(session, language=language)
    if groups is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No groups found"
        )
    return groups

@router.post("/{language}/groups")
async def create_group(language: str, name: str,  session = SessionDep):
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

@router.delete("/{language}/groups/{id}")
async def delete_group(id: int, language: str, session = SessionDep):
    group = delete_group_db(session=session, id=id, language=language)
    if group is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Group not found"
        )
    return group

@router.put("/{language}/groups/{id}")
async def update_group(
    id: int,
    language: str,
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
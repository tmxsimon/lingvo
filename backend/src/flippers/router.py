from fastapi import APIRouter, HTTPException, status
from src.dictionary.service import get_entries_by_group_db, get_entries_db
from src.dependencies import SessionDep
from .service import make_flippers_pages

router = APIRouter(
    prefix="/flippers",
    tags=["Flippers"],
)


@router.get("/")
async def get_flippers(language: int, group_id: int | None = None, session = SessionDep):
    group = None
    if group_id:
        entries = get_entries_by_group_db(session, group_id=group_id)
        group = entries[0].group if entries else None
    else:
        entries = get_entries_db(session, language=language)

    if entries is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No entries found"
        )
    
    flippers_pages = make_flippers_pages(entries)

    return { "flippers_pages": flippers_pages, "group": group }
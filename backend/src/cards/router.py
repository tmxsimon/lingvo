from fastapi import APIRouter
from src.dependencies import SessionDep
from .service import get_cards_entries_db

router = APIRouter(
    prefix="/cards",
    tags=["Cards"],
)

@router.get("/entries")
async def get_cards_entries(language: int, group_id: int | None = None, session = SessionDep):
    result = get_cards_entries_db(session, language=language, group_id=group_id)
    return result
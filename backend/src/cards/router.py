from fastapi import APIRouter, HTTPException, status
from src.dependencies import SessionDep
from .service import TemperatureActionEnum, change_temperature_db, get_cards_entries_db

router = APIRouter(
    prefix="/cards",
    tags=["Cards"],
)

@router.get("/entries")
async def get_cards_entries(language: int, group_id: int | None = None, session = SessionDep):
    result = get_cards_entries_db(session, language=language, group_id=group_id)
    return result


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
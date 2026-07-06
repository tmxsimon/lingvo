from random import shuffle
from enum import Enum
from sqlmodel import Session, func, select
from src.dictionary.models import DictionaryEntry
from src.dictionary.service import get_entries_db, get_entries_by_group_db

def get_cards_entries_db(
    session: Session,
    language: int,
    group_id: int | None = None
):
    group = None
    if group_id:
        entries = get_entries_by_group_db(session, group_id=group_id)
        group = entries[0].group if entries else None
    else:
        entries = get_entries_db(session, language=language)

    shuffle(entries)

    return { "entries": entries, "group": group }


class TemperatureActionEnum(str, Enum):
    increase = "increase"
    decrease = "decrease"

def change_temperature_db(
    session: Session,
    id: int,
    action: TemperatureActionEnum,
    step: int,
):
    entry = session.exec(select(DictionaryEntry).where(DictionaryEntry.id == id)).first()
    if entry is None:
        return None
    
    changeStep = step

    if action == "increase":
        temperature = min(100, entry.temperature + changeStep)
    elif action == "decrease":
        temperature = max(0, entry.temperature - changeStep)
    else:
        return None

    entry.temperature = temperature

    session.add(entry)
    session.commit()
    session.refresh(entry)

    return entry
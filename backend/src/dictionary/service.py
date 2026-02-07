from enum import Enum
from datetime import datetime
from sqlmodel import Session, select
from dictionary.models import DictionaryEntry, EntriesGroup

# entries

def get_entries_db(session: Session):
    entries = session.exec(select(DictionaryEntry).order_by(DictionaryEntry.id.desc())).all() 

    group = EntriesGroup(id=0, name="All entries", created_at=str(datetime.now()), entries=entries)

    return {
        "id": group.id,
        "name": group.name,
        "created_at": group.created_at,
        "entries": [
            {
                "id": e.id,
                "content": e.content,
                "translation": e.translation,
                "note": e.note,
                "temperature": e.temperature,
                "created_at": e.created_at,
            }
            for e in group.entries
        ],
    }
        

def get_entries_by_group_db(session: Session, group_id: int):
    return session.exec(select(DictionaryEntry).where(DictionaryEntry.group_id == group_id).order_by(DictionaryEntry.id.desc())).all() 

def create_entry_db(
    session: Session,
    content: str,
    translation: str,
    temperature: int,
    group_id: int,
    note: str | None = None,
):
    
    group = session.get(EntriesGroup, group_id)
    if group is None:
        return None

    entry = DictionaryEntry(
        content=content,
        translation=translation,
        note=note,
        temperature=temperature,
        group_id=group_id,
    )
    if entry is None:
        return None

    session.add(entry)
    session.commit()
    session.refresh(entry)

    return entry


def delete_entry_db(session: Session, id: int):
    entry = session.get(DictionaryEntry, id)
    if entry is None:
        return None

    session.delete(entry)
    session.commit()

    return entry

def update_entry_db(
    session: Session,
    id: int,
    content: str | None = None,
    translation: str | None = None,
    note: str | None = None,
    temperature: int | None = None,
    group_id: int | None = None
):
    entry = session.get(DictionaryEntry, id)
    if entry is None:
        return None

    if content:
        entry.content = content
    if translation:
        entry.translation = translation
    if note:
        entry.note = note
    if temperature is not None and 0 <= temperature <= 100:
        entry.temperature = temperature
    if group_id is not None:
        entry.group_id = group_id

    session.add(entry)
    session.commit()
    session.refresh(entry)

    return entry

class TemperatureActionEnum(str, Enum):
    increase = "increase"
    decrease = "decrease"

def change_temperature_db(
    session: Session,
    id: int,
    action: TemperatureActionEnum,
    step: int,
):
    entry = session.get(DictionaryEntry, id)
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

# groups

def get_group_db(session: Session, id: int):
    group = session.exec(select(EntriesGroup).where(EntriesGroup.id == id)).first()

    return {
        "id": group.id,
        "name": group.name,
        "created_at": group.created_at,
        "entries": [
            {
                "id": e.id,
                "content": e.content,
                "translation": e.translation,
                "note": e.note,
                "temperature": e.temperature,
                "created_at": e.created_at,
            }
            for e in group.entries
        ],
    }



def get_groups_db(session: Session):
    return session.exec(select(EntriesGroup).order_by(EntriesGroup.id.desc())).all()

def create_group_db(
    session: Session,
    name: str,
):
    group = EntriesGroup(name=name)

    if group is None:
        return None
    
    session.add(group)
    session.commit()
    session.refresh(group)

    return group

def delete_group_db(
    session: Session,
    id: int
):
    group = session.get(EntriesGroup, id)
    if group is None:
        return None

    session.delete(group)
    session.commit()

    return group

def update_group_db(
    session: Session,
    id: int,
    name: str | None = None
):
    group = session.get(EntriesGroup, id)
    if group is None:
        return None

    if name:
        group.name = name

    session.add(group)
    session.commit()
    session.refresh(group)

    return group
from enum import Enum
from datetime import datetime
from sqlmodel import Session, select
from dictionary.models import DictionaryEntry, EntriesGroup

# entries

def get_entries_db(session: Session, language: str):
    entries = session.exec(select(DictionaryEntry).where(DictionaryEntry.language_name == language).order_by(DictionaryEntry.id.desc())).all() 

    group = EntriesGroup(id=0, name="", created_at=str(datetime.now()), entries=entries)

    return {
        "id": group.id,
        "name": group.name,
        "created_at": group.created_at,
        "entries": [
            {
                "id": e.id,
                "language_name": e.language_name,
                "content": e.content,
                "translation": e.translation,
                "note": e.note,
                "temperature": e.temperature,
                "created_at": e.created_at,
            }
            for e in group.entries
        ],
    }
        

def get_entries_by_group_db(session: Session, group_id: int, language: str):
    return session.exec(select(DictionaryEntry).where(DictionaryEntry.group_id == group_id and DictionaryEntry.language_name == language).order_by(DictionaryEntry.id.desc())).all() 

def create_entry_db(
    session: Session,
    language: str,
    content: str,
    translation: str,
    temperature: int,
    group_id: int,
    note: str | None = None,
):
    
    group = session.exec(select(EntriesGroup).where(EntriesGroup.id == group_id and EntriesGroup.language_name == language)).first()
    if group is None:
        return None

    entry = DictionaryEntry(
        language_name=group.language_name,
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


def delete_entry_db(session: Session,  id: int, language: str):
    entry = session.exec(select(DictionaryEntry).where(DictionaryEntry.id == id and DictionaryEntry.language_name == language)).first()
    if entry is None:
        return None

    session.delete(entry)
    session.commit()

    return entry

def update_entry_db(
    session: Session,
    id: int,
    language: str,
    content: str | None = None,
    translation: str | None = None,
    note: str | None = None,
    temperature: int | None = None,
    group_id: int | None = None
):
    entry = session.exec(select(DictionaryEntry).where(DictionaryEntry.id == id and DictionaryEntry.language_name == language)).first()
    if entry is None:
        return None

    if entry.language != language:
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
    language: str,
    action: TemperatureActionEnum,
    step: int,
):
    entry = session.exec(select(DictionaryEntry).where(DictionaryEntry.id == id and DictionaryEntry.language_name == language)).first()
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

def get_group_db(session: Session, id: int, language: str):
    group = session.exec(select(EntriesGroup).where(EntriesGroup.id == id and EntriesGroup.language_name == language)).first()

    return {
        "id": group.id,
        "name": group.name,
        "created_at": group.created_at,
        "entries": [
            {
                "id": e.id,
                "language_name": e.language_name,
                "content": e.content,
                "translation": e.translation,
                "note": e.note,
                "temperature": e.temperature,
                "created_at": e.created_at,
            }
            for e in group.entries
        ],
    }



def get_groups_db(session: Session, language: str):
    return session.exec(select(EntriesGroup).where(EntriesGroup.language_name == language).order_by(EntriesGroup.id.desc())).all()

def create_group_db(
    session: Session,
    name: str,
    language: str,
):
    group = EntriesGroup(language_name=language, name=name)

    if group is None:
        return None
    
    session.add(group)
    session.commit()
    session.refresh(group)

    return group

def delete_group_db(
    session: Session,
    id: int,
    language: str,
):
    group = session.exec(select(EntriesGroup).where(EntriesGroup.id == id and EntriesGroup.language_name == language)).first()
    if group is None:
        return None

    session.delete(group)
    session.commit()

    return group

def update_group_db(
    session: Session,
    id: int,
    language: str,
    name: str | None = None
):
    group = session.exec(select(EntriesGroup).where(EntriesGroup.id == id and EntriesGroup.language_name == language)).first()
    if group is None:
        return None

    if language:
        group.language_name = language
    if name:
        group.name = name

    session.add(group)
    session.commit()
    session.refresh(group)

    return group
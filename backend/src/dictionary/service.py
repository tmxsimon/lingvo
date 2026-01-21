from enum import Enum
from sqlmodel import Session, select
from dictionary.models import DictionaryEntry, EntriesGroup

# entries

def get_entries_no_group_db(session: Session):
    return session.exec(select(DictionaryEntry).where(DictionaryEntry.group_id == None)).all() 

def get_entries_by_group_db(session: Session, group_id: int):
    return session.exec(select(DictionaryEntry).where(DictionaryEntry.group_id == group_id)).all() 

def create_entry_db(
    session: Session,
    content: str,
    translation: str,
    temperature: int,
    group_id: int | None = None
):
    if group_id is not None:
        group = session.get(EntriesGroup, group_id)
        if group is None:
            return None

    entry = DictionaryEntry(
        content=content,
        translation=translation,
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

# change temperature on phone by gesture
def change_temperature_db(
    session: Session,
    id: int,
    action: TemperatureActionEnum
):
    entry = session.get(DictionaryEntry, id)
    if entry is None:
        return None
    
    changeStep = 20

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

def get_groups_db(session: Session):
    return session.exec(select(EntriesGroup)).all()

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
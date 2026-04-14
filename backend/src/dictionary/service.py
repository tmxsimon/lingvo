from enum import Enum
from sqlmodel import Session, func, select
from dictionary.models import DictionaryEntry, EntriesGroup

# entries

def get_entries_db(session: Session, language: int):
    return session.exec(
        select(DictionaryEntry)
        .join(EntriesGroup)
        .where(EntriesGroup.language_id == language)
        .order_by(DictionaryEntry.position.desc())
    ).all()

def get_entries_by_group_db(session: Session, group_id: int):
    return session.exec(
        select(DictionaryEntry)
        .where(DictionaryEntry.group_id == group_id)
        .order_by(DictionaryEntry.position.desc())
        ).all() 

def create_entry_db(
    session: Session,
    content: str,
    translation: str,
    temperature: int,
    group_id: int,
    note: str | None = None,
):
    
    group = session.exec(select(EntriesGroup).where(EntriesGroup.id == group_id)).first()
    if group is None:
        return None
    
    max_position = session.exec(select(func.max(DictionaryEntry.position))).first()
    position = (max_position or 0) + 1

    entry = DictionaryEntry(
        content=content,
        translation=translation,
        note=note,
        temperature=temperature,
        group_id=group_id,
        position=position
    )
    if entry is None:
        return None

    session.add(entry)
    session.commit()
    session.refresh(entry)

    return entry


def delete_entry_db(session: Session,  id: int):
    entry = session.exec(select(DictionaryEntry).where(DictionaryEntry.id == id)).first()
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
    entry = session.exec(select(DictionaryEntry).where(DictionaryEntry.id == id)).first()
    if entry is None:
        return None

    if content:
        entry.content = content
    if translation:
        entry.translation = translation
    if note:
        entry.note = note
    if temperature and 0 <= temperature <= 100:
        entry.temperature = temperature
    if group_id:
        entry.group_id = group_id

    session.add(entry)
    session.commit()
    session.refresh(entry)

    return entry

def reorder_entries_db(session: Session, ordered_ids: list[int]):
    entries = session.exec(select(DictionaryEntry).where(DictionaryEntry.id.in_(ordered_ids))).all()
    entry_map = {entry.id: entry for entry in entries}

    for index, entry_id in enumerate(ordered_ids):
        if entry_id in entry_map:
            entry_map[entry_id].position = len(ordered_ids) - index
            session.add(entry_map[entry_id])

    session.commit()

    return list(entry_map.values())

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

# groups

def get_group_db(session: Session, id: int):
    group = session.exec(select(EntriesGroup).where(EntriesGroup.id == id)).first()
    if group is None:
        return None

    return group

def get_groups_db(session: Session, language: int):
    return session.exec(
        select(EntriesGroup)
        .where(EntriesGroup.language_id == language)
        .order_by(EntriesGroup.position.desc())
    ).all()

def create_group_db(
    session: Session,
    name: str,
    language: int,
):
    max_position = session.exec(select(func.max(EntriesGroup.position))).first()
    position = (max_position or 0) + 1
    
    group = EntriesGroup(language_id=language, name=name, position=position)

    if group is None:
        return None
    
    session.add(group)
    session.commit()
    session.refresh(group)

    return group

def delete_group_db(
    session: Session,
    id: int,
):
    group = session.exec(select(EntriesGroup).where(EntriesGroup.id == id)).first()
    if group is None:
        return None

    session.delete(group)
    session.commit()

    return group

def update_group_db(
    session: Session,
    id: int,
    language: int | None = None,
    name: str | None = None
):
    group = session.exec(select(EntriesGroup).where(EntriesGroup.id == id)).first()
    if group is None:
        return None
    if language:
        group.language_id = language
    if name:
        group.name = name

    session.add(group)
    session.commit()
    session.refresh(group)

    return group

def reorder_groups_db(session: Session, ordered_ids: list[int]):
    groups = session.exec(select(EntriesGroup).where(EntriesGroup.id.in_(ordered_ids))).all()
    group_map = {group.id: group for group in groups}

    for index, group_id in enumerate(ordered_ids):
        if group_id in group_map:
            group_map[group_id].position = len(ordered_ids) - index
            session.add(group_map[group_id])

    session.commit()

    return list(group_map.values())
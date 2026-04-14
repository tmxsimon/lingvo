from enum import Enum
from sqlmodel import Session, func, select
from .models import Note, NotesGroup

# notes

def get_note_db(session: Session, group_id: int, note_id: int):
    return session.exec(
        select(Note)
        .where(Note.group_id == group_id)
        .where(Note.id == note_id)
    ).first()

def get_notes_db(session: Session, language: int):
    return session.exec(
        select(Note)
        .join(NotesGroup)
        .where(NotesGroup.language_id == language)
        .order_by(Note.position.desc())
    ).all()

def get_notes_by_group_db(session: Session, group_id: int):
    return session.exec(
        select(Note)
        .where(Note.group_id == group_id)
        .order_by(Note.position.desc())
        ).all() 

def create_note_db(
    session: Session,
    name: str,
    group_id: int,
):
    
    group = session.exec(select(NotesGroup).where(NotesGroup.id == group_id)).first()
    if group is None:
        return None
    
    max_position = session.exec(select(func.max(Note.position))).first()
    position = (max_position or 0) + 1

    note = Note(
        name=name,
        content="",
        group_id=group_id,
        position=position
    )
    if note is None:
        return None

    session.add(note)
    session.commit()
    session.refresh(note)

    return note


def delete_note_db(session: Session,  id: int):
    note = session.exec(select(Note).where(Note.id == id)).first()
    if note is None:
        return None

    session.delete(note)
    session.commit()

    return note

def update_note_db(
    session: Session,
    id: int,
    name: str | None = None,
    content: str | None = None,
    group_id: int | None = None
):
    note = session.exec(select(Note).where(Note.id == id)).first()
    if note is None:
        return None

    if name:
        note.name = name
    if content:
        note.content = content
    if group_id:
        note.group_id = group_id

    session.add(note)
    session.commit()
    session.refresh(note)

    return note

def reorder_notes_db(session: Session, ordered_ids: list[int]):
    notes = session.exec(select(Note).where(Note.id.in_(ordered_ids))).all()
    note_map = {note.id: note for note in notes}

    for index, note_id in enumerate(ordered_ids):
        if note_id in note_map:
            note_map[note_id].position = len(ordered_ids) - index
            session.add(note_map[note_id])

    session.commit()

    return list(note_map.values())

# groups

def get_group_db(session: Session, id: int):
    group = session.exec(select(NotesGroup).where(NotesGroup.id == id)).first()
    if group is None:
        return None

    return group

def get_groups_db(session: Session, language: int):
    return session.exec(
        select(NotesGroup)
        .where(NotesGroup.language_id == language)
        .order_by(NotesGroup.position.desc())
    ).all()

def create_group_db(
    session: Session,
    name: str,
    language: int,
):
    max_position = session.exec(select(func.max(NotesGroup.position))).first()
    position = (max_position or 0) + 1
    
    group = NotesGroup(language_id=language, name=name, position=position)

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
    group = session.exec(select(NotesGroup).where(NotesGroup.id == id)).first()
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
    group = session.exec(select(NotesGroup).where(NotesGroup.id == id)).first()
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
    groups = session.exec(select(NotesGroup).where(NotesGroup.id.in_(ordered_ids))).all()
    group_map = {group.id: group for group in groups}

    for index, group_id in enumerate(ordered_ids):
        if group_id in group_map:
            group_map[group_id].position = len(ordered_ids) - index
            session.add(group_map[group_id])

    session.commit()

    return list(group_map.values())
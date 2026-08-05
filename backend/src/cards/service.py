from random import shuffle
from src.dictionary.service import get_entries_db, get_entries_by_group_db

def get_cards_entries_db(
    session: Session,
    language: int,
    group_id: int | None = None
):
    group = None
    if group_id:
        entries = get_entries_by_group_db(session, language=language, group_id=group_id, limit=None)
        group = entries[0].group if entries else None
    else:
        entries = get_entries_db(session, language=language, limit=None)

    shuffle(entries)

    return { "entries": entries, "group": group }

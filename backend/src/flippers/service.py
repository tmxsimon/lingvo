from random import randint, shuffle
from dictionary.models import DictionaryEntry

class Flipper:
    def __init__(self, value: str, entry_id: int, note: str = None):

        self.value = value
        self.entry_id = entry_id
        self.note = note

def make_flippers_pages(entries: list[DictionaryEntry]):
    if not entries:
        return None

    entries_copy = entries.copy()
    shuffle(entries_copy)

    flippers_pages = []
    while entries_copy:
        page_entries = entries_copy[:6]
        entries_copy = entries_copy[6:]

        flippers_page = []
        for entry in page_entries:
            flippers_page.append(Flipper(value=entry.content, entry_id=entry.id, note=entry.note))
            flippers_page.append(Flipper(value=entry.translation, entry_id=entry.id))

        shuffle(flippers_page)
        flippers_pages.append(flippers_page)

    return flippers_pages
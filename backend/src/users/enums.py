from enum import Enum

class AppLanguage(str, Enum):
    ENGLISH = "en-US"
    RUSSIAN = "ru-RU"
    CZECH = "cs-CZ"

class Theme(str, Enum):
    DARK = "dark"
    LIGHT = "light"
import Globe from "../assets/icons/globe.svg?react";
import Settings from "../assets/icons/settings.svg?react";
import Change from "../assets/icons/change.svg?react";
import Dictionary from "../assets/icons/dictionary.svg?react";
import Close from "../assets/icons/close.svg?react";
import List from "../assets/icons/list.svg?react";
import Books from "../assets/icons/books.svg?react";
import Cards from "../assets/icons/cards.svg?react";
import ArrowRight from "../assets/icons/arrow-right.svg?react";
import Info from "../assets/icons/info.svg?react";
import Sun from "../assets/icons/sun.svg?react";
import Moon from "../assets/icons/moon.svg?react";
import Filter from "../assets/icons/filter.svg?react";
import Check from "../assets/icons/check.svg?react";
import Search from "../assets/icons/search.svg?react";
import Plus from "../assets/icons/plus.svg?react";
import Clock from "../assets/icons/clock.svg?react";

import OpenBook from "../assets/icons/open-book.svg?react";
import Volume from "../assets/icons/volume.svg?react";
import Flame from "../assets/icons/flame.svg?react";

import English from "../assets/icons/flags/en-US.svg?react";
import Czech from "../assets/icons/flags/cs-CZ.svg?react";
import Russian from "../assets/icons/flags/ru-RU.svg?react";

import General from "../assets/icons/filters/general.svg?react";
import Vocabulary from "../assets/icons/filters/vocabulary.svg?react";
import Grammar from "../assets/icons/filters/grammar.svg?react";
import Pronunciation from "../assets/icons/filters/pronunciation.svg?react";

const ICONS = {
  // Common
  close: Close,
  globe: Globe,
  settings: Settings,
  change: Change,
  dictionary: Dictionary,
  list: List,
  books: Books,
  cards: Cards,
  arrowRight: ArrowRight,
  info: Info,
  sun: Sun,
  moon: Moon,

  // CardText icons
  openBook: OpenBook,
  volume: Volume,
  flame: Flame,
  fileText: Dictionary,

  // Languages
  "en-US": English,
  "cs-CZ": Czech,
  "ru-RU": Russian,

  // Filter categories
  filter: Filter,
  check: Check,
  search: Search,
  plus: Plus,
  clock: Clock,
  general: General,
  vocabulary: Vocabulary,
  grammar: Grammar,
  pronunciation: Pronunciation,
};

export default ICONS;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./lib/i18n";
import Homepage from "./features/home/pages/Homepage";
import MainLayout from "./layouts/MainLayout";
import CardsPage from "./features/cards/pages/CardsPage";
import DictionaryGroupsPage from "./features/dictionary/pages/DictionaryGroupsPage";
import DictionaryEntriesPage from "./features/dictionary/pages/DictionaryEntriesPage";
import LanguagesPage from "./features/languages/pages/LanguagesPage";
import NotesGroupsPage from "./features/notes/pages/NotesGroupsPage";
import NotesItemsPage from "./features/notes/pages/NotesItemsPage";
import NotePage from "./features/notes/pages/NotePage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/languages" element={<LanguagesPage />} />
          <Route path="/dictionary">
            <Route index element={<DictionaryGroupsPage />} />
            <Route path=":groupId" element={<DictionaryEntriesPage />} />
          </Route>
          <Route path="/notes">
            <Route index element={<NotesGroupsPage />} />
            <Route path=":groupId">
              <Route index element={<NotesItemsPage />} />\
              <Route path=":noteId" element={<NotePage />} />
            </Route>
          </Route>
          <Route path="/cards/:groupId?" element={<CardsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./lib/i18n";
import Homepage from "./features/home/pages/Homepage";
import MainLayout from "./layouts/MainLayout";
import CardsPage from "./features/cards/pages/CardsPage";
import DictionaryGroupsPage from "./features/dictionary/pages/DictionaryGroupsPage";
import DictionaryWordsPage from "./features/dictionary/pages/DictionaryWordsPage";
import LanguagesPage from "./features/languages/pages/LanguagesPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/languages" element={<LanguagesPage />} />
          <Route path="/dictionary">
            <Route index element={<DictionaryGroupsPage />} />
            <Route path=":groupId" element={<DictionaryWordsPage />} />
          </Route>
          <Route path="/cards/:groupId?" element={<CardsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

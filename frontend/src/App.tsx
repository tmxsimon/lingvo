import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./lib/i18n";
import Homepage from "./features/home/pages/Homepage";
import MainLayout from "./layouts/MainLayout";
import CardsPage from "./features/cards/pages/CardsPage";
import DictionaryGroupsPage from "./features/dictionary/pages/DictionaryGroupsPage";
import DictionaryWordsPage from "./features/dictionary/pages/DictionaryWordsPage";
import NotebookPage from "./features/notebook/pages/NotebookPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Homepage />} />
          <Route path="/dictionary">
            <Route index element={<DictionaryGroupsPage />} />
            <Route path=":groupId" element={<DictionaryWordsPage />} />
          </Route>
          <Route path="/cards/:groupId?" element={<CardsPage />} />
        <Route path="/notebook" element={<NotebookPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

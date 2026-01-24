import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./features/home/pages/Homepage";
import MainLayout from "./layouts/MainLayout";
import DictionaryPage from "./features/dictionary/pages/DictionaryPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Homepage />} />
          <Route path="/dictionary" element={<DictionaryPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

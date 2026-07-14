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
import FlippersPage from "./features/flippers/pages/FlippersPage";
import SignUpPage from "./features/users/pages/SignUpPage";
import SignInPage from "./features/users/pages/SignInPage";
import ProfilePage from "./features/users/pages/ProfilePage";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFoundPage from "./pages/NotFoundPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Homepage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/users" element={<ProtectedRoute />}>
              <Route path="me" element={<ProfilePage />} />
            </Route>
            <Route path="/languages" element={<LanguagesPage />} />
          </Route>
          <Route path="/dictionary" element={<ProtectedRoute />}>
            <Route index element={<DictionaryGroupsPage />} />
            <Route path="entries" element={<DictionaryEntriesPage />} />
            <Route path=":groupId" element={<DictionaryEntriesPage />} />
          </Route>
          <Route path="/notes" element={<ProtectedRoute />}>
            <Route index element={<NotesGroupsPage />} />
            <Route path=":groupId">
              <Route index element={<NotesItemsPage />} />\
              <Route path="notes" element={<NotesItemsPage />} />
              <Route path=":noteId" element={<NotePage />} />
            </Route>
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/cards/:groupId?" element={<CardsPage />} />
            <Route path="/flippers/:groupId?" element={<FlippersPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./features/home/pages/Homepage";
import MainLayout from "./layouts/MainLayout";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Homepage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

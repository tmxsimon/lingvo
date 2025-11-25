import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./features/home/pages/Homepage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

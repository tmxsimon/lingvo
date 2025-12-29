import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const MainLayout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      {/* bg-[url(assets/background.jpg)] */}
      <Navbar />
      <main className="flex flex-1 flex-col items-center backdrop-brightness-75">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;

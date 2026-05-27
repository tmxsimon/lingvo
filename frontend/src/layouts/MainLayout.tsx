import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const MainLayout = () => {
  return (
    <div className="bg-bg text-text relative flex min-h-screen flex-col">
      <Navbar />
      <main className="pt-after-navbar pb-base px-base-lg flex flex-1 flex-col items-center">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;

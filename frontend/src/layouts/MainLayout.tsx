import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Background from "../components/Background";

const MainLayout = () => {
  return (
    <div className="bg-bg text-text relative flex min-h-screen flex-col">
      <Background />
      <div className="z-10">
        <Navbar />
        <main className="mt-after-navbar pb-base px-base-lg flex flex-1 flex-col items-center">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;

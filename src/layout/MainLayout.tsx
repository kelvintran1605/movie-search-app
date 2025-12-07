import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { Outlet } from "react-router-dom";
const MainLayout = () => {
  return (
    <>
      <Header />
      <main style={{ padding: "20px" }}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;

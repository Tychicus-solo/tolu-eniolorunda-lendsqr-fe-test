import  { useState } from "react";
import { Outlet } from "react-router-dom";
import "./DashboardLayout.scss";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
const [searchTerm, setSearchTerm] = useState("");
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="dashboard-layout">
      <Navbar onSearch={setSearchTerm} onMenuClick={toggleSidebar} />

      <main className="dashboard-layout__container">
        <aside
          className={`dashboard-layout__sidebar-wrapper ${
            isSidebarOpen ? "is-open" : ""
          }`}
        >
          <div className="sidebar-overlay" onClick={toggleSidebar}></div>
          <Sidebar />
        </aside>

        <section className="dashboard-layout__content">
          <Outlet context={{ searchTerm }} />
        </section>
      </main>
    </div>
  );
};

export default DashboardLayout;

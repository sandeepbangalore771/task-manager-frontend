import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => setIsSidebarOpen(window.innerWidth >= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="d-flex">
      <Sidebar onToggle={setIsSidebarOpen} />
      <div
        className="flex-grow-1"
        style={{
          marginLeft: isSidebarOpen ? "250px" : "70px",
          transition: "margin-left 0.3s ease",
          width: "100%",
        }}
      >
        <Navbar />
        <div
          className="p-sm-2 p-md-3"
          style={{
            marginTop: "60px",
            display: "grid",
            gap: isSidebarOpen ? "20px" : "40px",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;

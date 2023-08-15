import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Core/Dashboard/Sidebar";

export default function Dashboard() {
  return (
    <div>
      
      <Sidebar/>
      <div>
        <Outlet/>
      </div>
    </div>
  );
}

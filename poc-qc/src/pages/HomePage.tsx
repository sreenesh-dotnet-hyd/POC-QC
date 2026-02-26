import { Outlet } from "react-router-dom";
import SidePanel from "../components/SidePanel";
import { useState } from "react";

export default function HomePage() {

    return (<div className="h-[100svh] w-[100svw] flex flex-row">
        <SidePanel />
        <Outlet />
    </div>)
}
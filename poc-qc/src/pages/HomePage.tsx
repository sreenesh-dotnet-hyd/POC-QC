import Outlet from './Outlet';
import SidePanel from "../components/SidePanel";
import { useState } from "react";

export default function HomePage() {
    const [content, setContent] = useState<string>("Dashboard");

    return (<div className="h-[100svh] w-[100svw] grid grid-cols-[20%_80%]">
        <SidePanel content={content} setContent={setContent}/>
        <Outlet content={content} />
    </div>)
}
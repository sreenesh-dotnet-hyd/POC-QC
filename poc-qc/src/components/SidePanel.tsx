import { LuHexagon, LuLogOut } from "react-icons/lu";
import { BiBarChartSquare } from "react-icons/bi";
import { LuCircleUserRound } from "react-icons/lu";
import { LuFlag } from "react-icons/lu";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { PiMicroscope } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { FiAlertCircle } from "react-icons/fi";
import { FiHelpCircle } from "react-icons/fi";
import { IoIosSearch } from "react-icons/io";
import { LuMic } from "react-icons/lu";
import { IoAdd } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { useState } from "react";
import NewAccessionModal from "../modals/NewAccessionModal";
import { NavLink } from "react-router-dom";

export default function SidePanel() {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("auth");
        navigate("/");
    };

    const [isAddNewClicked, setIsAddNewClicked] = useState(false);


    return (
        <div className="flex flex-row gothic-regular justify-between items-center bg-white gap-4 w-full p-4 pr-20 border-b-3 border-gray-200">


            <div className="flex flex-row items-center gap-17">
                <div className="w-34 h-14">
                    <img src='./qc-logo.webp' className="w-full h-full" alt='logo' />
                </div>
                <div>
                    <button
                        onClick={() => setIsAddNewClicked(true)}
                        className="flex items-center justify-center gap-2 bg-black/10 border border-black  h-10 w-24 py-1 px-4 text-sm text-black rounded-lg 
                        hover:bg-gray-400 cursor-pointer transition">
                        <IoAdd className="text-lg" />
                        New
                    </button>
                </div>
                <div className="relative">
                    <input type="text" placeholder="Search or Ask something" className="px-4 py-2 pr-90 border-2 border-gray-200 rounded-3xl" />
                    <IoIosSearch className="absolute text-xl top-2.5 right-4 text-black" />
                    <LuMic className="absolute text-xl top-2.5 right-12 text-black" />
                </div>
            </div>

            <div className="flex flex-row items-center gap-10">
                <div className="flex flex-row h-8 gap-6">

                    <NavLink
                        to="/batches"
                        className={({ isActive }) =>
                            `flex items-center gap-3 py-4 px-2 rounded-lg transition
     ${isActive
                                ? "bg-gray-100 text-black"
                                : "hover:bg-gray-400 hover:text-black"}`
                        }
                    >
                        <span>Batches</span>
                    </NavLink>

                    <NavLink to="/samples" className={({ isActive }) =>
                        `flex items-center gap-3 py-4 px-2 rounded-lg transition
   ${isActive ? "bg-gray-100 text-black" : "hover:bg-gray-400"}`
                    }>
                        <span>Samples</span>
                    </NavLink>

                    <NavLink to="/slides" className={({ isActive }) =>
                        `flex items-center gap-3 py-4 px-2 rounded-lg transition
   ${isActive ? "bg-gray-100 text-black" : "hover:bg-gray-400"}`
                    }>
                        <span>Slides</span>
                    </NavLink>
                    {/* <div className={`flex items-center gap-3 py-2 px-2 rounded-lg
                            ${content == "ExceptionSlides" ? "bg-[#101aca] text-white rounded-lg" : "hover:bg-[#101aca]/60 hover:text-white transition duration-500 ease-in-out cursor-pointer rounded-lg"}}
                        `} onClick={() => setContent("ExceptionSlides")}>

                        <span>Exception Slides</span>
                    </div> */}

                    <div
                        className={`flex items-center gap-3 py-2 px-2 rounded-lg
        hover:bg-gray-400 hover:text-black transition duration-500 ease-in-out cursor-pointer
                        `}

                        onClick={handleLogout}>

                        <span className="text-2xl w-8 flex justify-center">
                            <FiHelpCircle />
                        </span>
                    </div>
                    <div
                        className={`flex items-center gap-3 py-2 px-2 rounded-lg`}
                    >
                        <div className="w-10 h-10 overflow-hidden rounded-full">
                            <img src='./profileimg.webp' className="w-full h-full object-cover" alt='logo' />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-lg text-black/50 font-[700]">Sreenesh Reddy</span>
                            <span className="text-sm text-gray-400">Lab Tech</span>
                        </div>
                    </div>

                </div>
            </div>
            {isAddNewClicked && (
                <NewAccessionModal isOpen={open} onClose={() => setIsAddNewClicked(false)} />

            )}


        </div>
    );
}

import { LuHexagon } from "react-icons/lu";
import { BiBarChartSquare } from "react-icons/bi";
import { LuCircleUserRound } from "react-icons/lu";
import { LuFlag } from "react-icons/lu";

export default function SidePanel({ content, setContent }) {
    return (
        <div className="flex flex-col gothic-regular justify-between bg-[#f9f5f8] gap-4 h-full w-full p-4 border-r-3 border-gray-200">


            <div className="flex flex-col gap-20">
                <div className="w-54 h-18">
                    <img src='./qc-logo.webp' className="w-full h-full" alt='logo' />
                </div>
                <div className="flex flex-col gap-2">
                    <div className={`flex items-center gap-3 py-2 px-2
                            ${content=="Dashboard"?"bg-[#101aca] text-white rounded-lg":"hover:bg-[#101aca]/60 hover:text-white transition duration-500 ease-in-out cursor-pointer rounded-lg"}
                        `} onClick={()=>setContent("Dashboard")}>
                        
                        <span className="text-2xl w-8 flex justify-center">
                            <BiBarChartSquare />
                        </span>
                        <span>Dashboard</span>
                     

                    </div>

                     <div className={`flex items-center gap-3 py-2 px-2 rounded-lg
                            ${content=="AllSamples"?"bg-[#101aca] text-white rounded-lg":"hover:bg-[#101aca]/60 hover:text-white transition duration-500 ease-in-out cursor-pointer rounded-lg"}}
                        `} onClick={()=>setContent("AllSamples")}>
                        <span className="text-2xl w-8 flex justify-center">
                            <LuHexagon />
                        </span>
                        <span>All Samples</span>
                    </div>
                    <div className={`flex items-center gap-3 py-2 px-2 rounded-lg
                            ${content=="FlaggedSamples"?"bg-[#101aca] text-white rounded-lg":"hover:bg-[#101aca]/60 hover:text-white transition duration-500 ease-in-out cursor-pointer rounded-lg"}}
                        `} onClick={()=>setContent("FlaggedSamples")}>
                        <span className="text-2xl w-8 flex justify-center">
                            <LuFlag />
                        </span>
                        <span>Flagged Samples</span>
                    </div>
                </div>


            </div>
             <div className={`flex items-center gap-3 py-2 px-2 `}>
                <span className="text-2xl w-8 flex justify-center">
                    <LuCircleUserRound />
                </span>
                <span>Account</span>
            </div>
        </div>
    )
}

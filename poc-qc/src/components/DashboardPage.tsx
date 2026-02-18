import { useState } from "react";
import DashboardInsights from "./DashboardInsights"
import { IoMdRefresh } from "react-icons/io";
import { IoAdd } from "react-icons/io5";
import AddNewSampleModal from "./AddNewSampleModal";

export default function DashboardPage() {
    type Sample = {
        id: string;
        patient: string;
        type: string;
        priority: "High" | "Medium" | "Low";
        status: "Processing" | "Completed" | "Flagged";
    };

    const samples: Sample[] = [
        { id: "SMP-001", patient: "John Doe", type: "Blood", priority: "High", status: "Processing" },
        { id: "SMP-002", patient: "Alice Smith", type: "Urine", priority: "High", status: "Completed" },
        { id: "SMP-003", patient: "Rahul Kumar", type: "DNA", priority: "High", status: "Flagged" },
        { id: "SMP-004", patient: "Maria Garcia", type: "Blood", priority: "High", status: "Completed" },
    ];

    const priorityColor = {
        High: "bg-red-100 text-red-700",
        Medium: "bg-yellow-100 text-yellow-700",
        Low: "bg-green-100 text-green-700",
    };

    const statusColor = {
        Processing: "bg-amber-100 text-amber-700",
        Completed: "bg-green-100 text-green-700",
        Flagged: "bg-red-100 text-red-700",
    };
    
    const [ isAddNewClicked, setIsAddNewClicked ] = useState<boolean>(false);


    return (<div className="relative flex flex-col gap-4 h-full overflow-y-auto py-6 px-16 bg-[#f9f5f8]">
        <div className="flex flex-row justify-between gap-4">
            <div className="flex flex-col gap-4">
                <span className="gothic-regular text-4xl text-[#101aca]">Dashboard</span>
                <span className="gothic-regular text-sm text-gray-400">Home / Dashboard</span>
            </div>

            <div className="flex flex-row gap-4 mt-4">
                <button className="flex items-center justify-center gap-2 bg-[#101aca] h-10 w-44 py-1 text-sm text-white rounded-xl hover:bg-[#0d16a8] cursor-pointer transition">
                    <IoMdRefresh className="text-lg" />
                    Refresh
                </button>

                <button 
                onClick={()=>setIsAddNewClicked(true)}
                className="flex items-center justify-center gap-2 bg-[#101aca] h-10 w-44 py-1 text-sm text-white rounded-xl hover:bg-[#0d16a8] cursor-pointer transition">
                    <IoAdd className="text-lg" />   
                    Add new Sample
                </button>

            </div>
        </div>

        <div className="bg-[#e2e2f6] px-4 py-4 rounded-3xl">
            <DashboardInsights />

        </div>
        <div className="mt-2 gothic-regular text-sm text-gray-400">
            High priority samples
        </div>
        <div className="mt-2 rounded-3xl overflow-hidden bg-[#e2e2f6] px-4 py-4">

            <table className="w-full text-sm bg-white">
                <thead className="bg-[#f9f5f8] text-gray-500 uppercase gothic-regular text-xs tracking-wider">
                    <tr>
                        <th className="text-left px-6 py-4">Sample ID</th>
                        <th className="text-left px-6 py-4">Patient</th>
                        <th className="text-left px-6 py-4">Type</th>
                        <th className="text-left px-6 py-4">Priority</th>
                        <th className="text-left px-6 py-4">Status</th>
                        <th className="text-left px-6 py-4">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {samples.map((s) => (
                        <tr key={s.id} className="odd:bg-gray-50 even:bg-gray-20 transition">

                            <td className="px-6 py-4 font-medium">{s.id}</td>
                            <td className="px-6 py-4">{s.patient}</td>
                            <td className="px-6 py-4">{s.type}</td>

                            <td className="px-6 py-4">
                                <span className={`px-2 py-1 text-xs rounded-full ${priorityColor[s.priority]}`}>
                                    {s.priority}
                                </span>
                            </td>

                            <td className="px-6 py-4">
                                <span className={`px-2 py-1 text-xs rounded-full ${statusColor[s.status]}`}>
                                    {s.status}
                                </span>
                            </td>

                            <td className="px-6 py-4">
                                <div className="flex gap-2">

                                    <button className="px-6 py-1 text-xs rounded-lg bg-[#101aca] text-white hover:bg-[#0d16a8] transition">
                                        View
                                    </button>

                                    <button className="px-6 py-1 text-xs rounded-lg bg-[#101aca] text-white hover:bg-[#0d16a8] transition">
                                        Edit
                                    </button>

                                </div>
                            </td>

                        </tr>
                    ))}
                </tbody>

            </table>
        </div>

                    {isAddNewClicked && (
                        <div className="absolute top-0 left-0 h-[100vsh] w-full bg-black/70">
                            <AddNewSampleModal setIsAddNewClicked={setIsAddNewClicked}/>
                        </div>
                    )}

    </div>)
}

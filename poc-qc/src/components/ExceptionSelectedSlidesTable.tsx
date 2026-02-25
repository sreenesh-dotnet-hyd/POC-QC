import { RiDeleteBin6Line } from "react-icons/ri";
import type { Sample, SampleStatusType, SamplePriority } from "../types/sample.types";
import type { Slide } from "../types/SlideType";

export default function ExceptionSampleSlidesTable({ sampleSlides, onView, onEdit, onDelete }: { sampleSlides: Slide[], onView:(slide:Slide)=>void, onEdit:(slide:Slide)=>void, onDelete:(slide:Slide)=>void}) {
    const priorityColor: Record<SamplePriority, string> = {
        Urgent: "bg-red-100 text-red-700",
        STAT: "bg-orange-100 text-orange-700",
        Routine: "bg-green-100 text-green-700",
    };


    const statusColor: Record<SampleStatusType, string> = {
        entered: "bg-gray-100 text-gray-700",
        received: "bg-blue-100 text-blue-700",
        rejected: "bg-red-100 text-red-700",
        in_process: "bg-yellow-100 text-yellow-700",
        scanned: "bg-indigo-100 text-indigo-700",
        scan_failed: "bg-rose-100 text-rose-700",
        aligned: "bg-teal-100 text-teal-700",
        not_aligned: "bg-orange-100 text-orange-700",
        under_review: "bg-purple-100 text-purple-700",
        approved: "bg-green-100 text-green-700",
    };




    return (
        <table className="w-full text-sm overflow-auto bg-white">
            <thead className="bg-[#f9f5f8] text-gray-500 uppercase gothic-regular text-xs tracking-wider">
                <tr>
                    <th className="text-left px-10 py-4">Slide Id</th>
                    <th className="text-left px-6 py-4">Slide Type</th>
                    <th className="text-left px-6 py-4">Stain Type</th>
                    <th className="text-left px-6 py-4">Created At</th>
                    <th className="text-left px-6 py-4">Created By</th>
                    <th className="text-left px-6 py-4">Created Method</th>
                    <th className="text-left px-4 py-4">Status</th>
                    <th className="text-left px-4 py-4">Is Blocked</th>
                    <th className="text-left px-6 py-4">Actions</th>

                    {/* <th className="text-left px-6 py-4">Exception Type</th>
                    <th className="text-left px-6 py-4">Exception Reason</th>
                    <th className="text-left px-6 py-4">Exception Recorded At</th>
                    <th className="text-left px-6 py-4">Exception Recorded By</th> */}
                </tr>
            </thead>

            <tbody>
                {sampleSlides.map((s) => (
                    <tr key={s.slideId} className="odd:bg-gray-50 even:bg-gray-20 transition">

                        <td className="px-4 py-4 font-medium">{s.slideId}</td>
                        <td className="px-4 py-4">{s.slideType}</td>
                        <td className="px-4 py-4">{s.stainType}</td>
                        <td className="px-4 py-4">{s.createdAt.toLocaleString()}</td>
                        <td className="px-4 py-4">{s.createdBy}</td>
                        <td className="px-4 py-4">{s.createdMethod}</td>
                        <td className="px-4 py-4">{s.status}</td>
                        <td className="px-4 py-4">{s.isBlocked?"Yes":"No"}</td>
                        <td className="px-4 py-4">
                            <div className="flex gap-2">

                                <button
                                    onClick={()=>onView(s)} 
                                    className="px-6 py-1 text-xs rounded-lg bg-[#101aca] cursor-pointer text-white hover:bg-[#0d16a8] transition">
                                    View
                                </button>

                                <button
                                    onClick={()=>onEdit(s)}
                                    className="px-6 py-1 text-xs rounded-lg bg-[#101aca] cursor-pointer text-white hover:bg-[#0d16a8] transition">
                                    Edit
                                </button>

                                <button
                                    onClick={()=>onDelete(s)} 
                                    className="px-6 py-1 text-xs rounded-lg bg-[#ca1010] cursor-pointer text-white hover:bg-[#9e0e0e] transition">
                                    <RiDeleteBin6Line />
                                </button>
                            </div>
                        </td>

                    </tr>
                ))}
            </tbody>

        </table>)
}
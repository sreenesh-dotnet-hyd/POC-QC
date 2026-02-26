import React from "react";
import { AlertTriangle, FileText, Eye } from "lucide-react";
import { IoMdArrowRoundForward } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { NavLink, useNavigate, useParams } from "react-router-dom";

const slides = [
    "8238058132",
    "8238058133",
    "8238058134",
    "8238058135",
    "8238058136",
];

export default function SampleDetailsPage() {
    const params = useParams();
    const activeBatchId = params.batchId as string;
    const activeSampleId = params.sampleId as string;

    return (
        <div className="min-h-screen max-w-[100vw] m-0 bg-white p-8">

            <div className="text-sm text-gray-500 mb-4 flex gap-2 items-center">
                <NavLink to={`/batches`} className="underline cursor-pointer">Samples</NavLink>
                <span className="mx-2"><IoMdArrowRoundForward /></span>
            
                <NavLink to={`/batches/${activeBatchId}/samples/${{ activeSampleId }}`} className="underline cursor-pointer text-gray-500 font-medium">
                    Sample {activeSampleId}
                </NavLink>
                <span className="mx-2"><IoMdArrowRoundForward /></span>

                <span className="text-gray-800 font-medium">
                    Slide 8238058132
                </span>
            </div>

            <div className="flex items-center justify-between mb-6">
                <h1 className="text-4xl font-bold text-gray-900">
                    Slide 8238058132
                </h1>

                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 text-red-500 text-sm">
                        <AlertTriangle size={16} />
                        Problem with Slide
                    </div>

                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                        <FileText size={16} />
                        Slide Log
                    </div>
                </div>
            </div>

            <div className="mb-8 flex flex-row items-center justify-center w-full">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="px-3 py-1 bg-gray-200 rounded-lg w-32">
                        Waiting for Scans
                    </span>
                </div>

                <div className="flex w-full items-center justify-between">
                    {Array.from({ length: 7 }).map((_, i) => (
                        <div key={i} className="flex-1 flex items-center">

                            {i !== 8 && (
                                <div className="flex-1 h-0.5 border-2 border-gray-400 bg-gray-200" />
                            )}
                            <div className="w-4 h-4 rounded-full border-2 border-gray-400 bg-gray-200" />
                        </div>
                    ))}
                </div>
            </div>




            <div className="flex items-center justify-between mb-12">
                <h2 className="text-4xl font-semibold text-gray-900">
                    Files
                </h2>

                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Sort by</span>
                    <button className="px-3 py-1 bg-gray-900 text-white text-sm rounded-lg  flex items-center justify-center gap-2">
                        <IoIosArrowDown className="text-white" /> Status
                    </button>
                </div>
            </div>

            <div className="w-full flex justify-center items-center" >
                <div className="border-5 border-black/50 rounded-2xl p-6 flex items-center justify-between bg-gray-200 mb-6 w-[80%]">
                    <div className="flex items-center gap-3 text-gray-700">
                        <Eye size={30} />
                        <span className="font-medium">
                            No files found. You can re-check the folder or upload manually
                        </span>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="text-sm text-gray-600 hover:underline">
                            Recheck Folder
                        </button>

                        <button className="px-4 py-2 bg-black text-white rounded-lg text-sm hover:bg-gray-800 transition">
                            Upload Files
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
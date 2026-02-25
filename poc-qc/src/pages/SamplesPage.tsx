import React from "react";
import { IoMdArrowRoundForward } from "react-icons/io";
import { NavLink, useNavigate, useParams } from "react-router-dom";


type Sample = {
    id: string;
    batchId: string;
    slides: number;
    status: string;
};

export const samplesData: Sample[] = [
    // Batch 000123123
    { id: "8238058101", batchId: "000123123", slides: 12, status: "Ready for Fiducials" },
    { id: "8238058102", batchId: "000123123", slides: 9, status: "Ready for Review" },
    { id: "8238058103", batchId: "000123123", slides: 7, status: "Completed" },

    // Batch 000123124
    { id: "8238058104", batchId: "000123124", slides: 10, status: "Ready for Lysis" },
    { id: "8238058105", batchId: "000123124", slides: 8, status: "In Processing" },
    { id: "8238058106", batchId: "000123124", slides: 11, status: "Ready for Review" },

    // Batch 000123125
    { id: "8238058107", batchId: "000123125", slides: 6, status: "On Hold" },
    { id: "8238058108", batchId: "000123125", slides: 13, status: "Ready for Fiducials" },
    { id: "8238058109", batchId: "000123125", slides: 9, status: "Completed" },

    // Batch 000123126
    { id: "8238058110", batchId: "000123126", slides: 12, status: "Ready for Scans" },
    { id: "8238058111", batchId: "000123126", slides: 8, status: "In Processing" },
    { id: "8238058112", batchId: "000123126", slides: 10, status: "Ready for Review" },

    // Batch 000123127
    { id: "8238058113", batchId: "000123127", slides: 7, status: "Ready for Lysis" },
    { id: "8238058114", batchId: "000123127", slides: 14, status: "Ready for Fiducials" },
    { id: "8238058115", batchId: "000123127", slides: 6, status: "On Hold" },

    // Batch 000123128
    { id: "8238058116", batchId: "000123128", slides: 9, status: "Completed" },
    { id: "8238058117", batchId: "000123128", slides: 11, status: "Ready for Review" },
    { id: "8238058118", batchId: "000123128", slides: 8, status: "In Processing" },

    // Batch 000123129
    { id: "8238058119", batchId: "000123129", slides: 10, status: "Ready for Scans" },
    { id: "8238058120", batchId: "000123129", slides: 12, status: "Ready for Fiducials" },
    { id: "8238058121", batchId: "000123129", slides: 7, status: "Completed" },

    // Batch 000123130
    { id: "8238058122", batchId: "000123130", slides: 13, status: "Ready for Review" },
    { id: "8238058123", batchId: "000123130", slides: 9, status: "In Processing" },
    { id: "8238058124", batchId: "000123130", slides: 8, status: "Ready for Lysis" },
];

const samples: Sample[] = [
    {
        id: "0789456321",
        batchId: "0001935",
        slides: 12,
        status: "Ready for Fiducials",
    },
    {
        id: "0321589642",
        batchId: "0001935",
        slides: 12,
        status: "Ready for Review",
    },
    {
        id: "0214789653",
        batchId: "0001935",
        slides: 12,
        status: "Ready for Lysis",
    },
];



export default function SamplesPage() {
    const params = useParams();
    const activeBatchId = params.batchId as string;

    const filteredSamples = samplesData.filter(
        (sample) => sample.batchId === activeBatchId
    );

    const navigate = useNavigate();
    const handleClick = (sampleId) => {
        navigate(`/batches/${activeBatchId}/samples/${sampleId}`)
    }

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            {/* Breadcrumb */}
            <div className="text-sm text-gray-500 mb-4">
                <NavLink to="/batches" className="underline cursor-pointer">Batches</NavLink>
                <span className="mx-2">→</span>
                <span className="text-gray-700 font-medium">
                    Batch {activeBatchId}
                </span>
            </div>

            {/* Page Title */}
            <h1 className="text-4xl font-semibold text-gray-900 mb-6">
                Samples
            </h1>

            {/* Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
                {filteredSamples.map((sample, index) => (
                    <div
                        key={sample.id}
                        onClick={() => handleClick(sample.id)}
                        className={`flex items-center justify-between px-6 py-5 hover:bg-gray-50 transition ${index !== samples.length - 1
                            ? "border-b border-gray-200"
                            : ""
                            }`}
                    >
                        {/* Sample ID */}
                        <div className="text-xl font-medium text-gray-800">
                            {sample.id}
                        </div>

                        <div className="flex items-center justify-between w-[32rem]">
                            {/* Batch + Slides */}

                            <div className="flex items-center gap-16">
                                <div className="text-left">
                                    <p className="text-lg font-semibold text-gray-800">
                                        {sample.batchId}
                                    </p>
                                    <p className="text-sm text-blue-600">Batch</p>
                                </div>

                                <div className="text-left">
                                    <p className="text-lg font-semibold text-gray-800">
                                        {sample.slides}
                                    </p>
                                    <p className="text-sm text-blue-600">Slides</p>
                                </div>
                            </div>
                            {/* Status + Arrow */}
                            <div className="flex flex-row items-center gap-8">
                                <div className="flex items-center gap-6">
                                    <span className="px-4 py-2 bg-gray-200 text-gray-700 text-sm rounded-lg">
                                        {sample.status}
                                    </span>
                                </div>


                                <button className="p-2 rounded-full bg-gray-100 border-2 border-gray-200 hover:bg-gray-200 transition">
                                    <IoMdArrowRoundForward size={18} />
                                </button>
                            </div>
                        </div>



                    </div>
                ))}
            </div>
        </div>
    );
}
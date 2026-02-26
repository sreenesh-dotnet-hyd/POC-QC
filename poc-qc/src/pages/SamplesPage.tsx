import React, { useState } from "react";
import { IoMdArrowRoundForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";

type Sample = {
    id: string;
    batchId: string;
    slides: number;
    status: string;
    actionStatus: string;
};

const samplesData: Sample[] = [
    { id: "0789456321", batchId: "00019935", slides: 12, status: "In Process", actionStatus: "In Alignment Que" },
    { id: "0789456322", batchId: "00019935", slides: 8, status: "In Process", actionStatus: "awaiting dry dry" },
    { id: "0789456323", batchId: "00019935", slides: 8, status: "In Process", actionStatus: "In Alignment Que" },
    { id: "0789456421", batchId: "00019934", slides: 9, status: "In Process", actionStatus: "waiting for Ark" },
    { id: "0789456422", batchId: "00019933", slides: 11, status: "In Process", actionStatus: "waiting for dry" },
    { id: "0789456423", batchId: "00019932", slides: 10, status: "Completed", actionStatus: "waiting for dry" },
    { id: "0789456521", batchId: "00019931", slides: 12, status: "In Process", actionStatus: "awaiting dry dry" },
    { id: "0789456522", batchId: "00019930", slides: 8, status: "In Process", actionStatus: "Ready for Lysis" },
    { id: "0789456523", batchId: "00019929", slides: 12, status: "On Hold", actionStatus: "Ready for Lysis" },
    { id: "0789456621", batchId: "00019928", slides: 9, status: "Completed", actionStatus: "Ready for Review" },
    { id: "0789456622", batchId: "00019927", slides: 8, status: "On Hold", actionStatus: "Ready for Review" },
    { id: "0789456623", batchId: "00019926", slides: 12, status: "In Process", actionStatus: "Ready for Scan" },
    { id: "0789456721", batchId: "00019925", slides: 9, status: "Ready for Fiducials", actionStatus: "Ready for Fiducials" },
    { id: "0789456722", batchId: "00019924", slides: 8, status: "Ready for Fiducials", actionStatus: "Ready for Fiducials" },
    { id: "0789456723", batchId: "00019923", slides: 8, status: "Scanned", actionStatus: "Ready for Fiducials" },
    { id: "0789456821", batchId: "00019922", slides: 11, status: "Completed", actionStatus: "waiting for Ark" },
    { id: "0789456822", batchId: "00019921", slides: 12, status: "Scanned", actionStatus: "waiting for Ark" },
    { id: "0789456823", batchId: "00019920", slides: 13, status: "In Process", actionStatus: "Ready for Review" },
];

const statusColorMap: Record<string, string> = {
    "In Process": "bg-yellow-100 text-yellow-700",
    "Completed": "bg-green-100 text-green-700",
    "On Hold": "bg-red-100 text-red-700",
    "Ready for Fiducials": "bg-blue-100 text-blue-700",
    "Scanned": "bg-purple-100 text-purple-700",
};

const actionStatusColorMap: Record<string, string> = {
    "In Alignment Que": "text-cyan-500",
    "awaiting dry dry": "text-cyan-500",
    "waiting for Ark": "text-cyan-500",
    "waiting for dry": "text-cyan-500",
    "Ready for Lysis": "text-cyan-500",
    "Ready for Review": "text-orange-500",
    "Ready for Scan": "text-cyan-500",
    "Ready for Fiducials": "text-orange-500",
};

export default function SamplesPage() {
    const navigate = useNavigate();
    const [filterStatus, setFilterStatus] = useState<string>("All Statuses");
    const [sortOrder, setSortOrder] = useState<string>("Sort by Status");

    const handleRowClick = (sample: Sample) => {
        navigate(`/samples/${sample.id}`, { state: { sample } });
    };

    const filterOptions = ["All Statuses", "In Process", "Completed", "On Hold", "Ready for Fiducials", "Scanned"];
    const sortOptions = ["Sort by Status", "Sort by ID", "Sort by Batch"];

    const filteredSamples = filterStatus === "All Statuses"
        ? samplesData
        : samplesData.filter(s => s.status === filterStatus);

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            {/* Page Header */}
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-4xl font-semibold text-gray-900">
                    Samples
                </h1>
                <div className="flex items-center gap-4">
                    {/* Filter Dropdown */}
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="px-4 py-2 text-sm rounded-lg border border-gray-300 bg-white text-gray-700 hover:border-gray-400 cursor-pointer"
                    >
                        {filterOptions.map(option => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>

                    {/* Sort Dropdown */}
                    <select
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                        className="px-4 py-2 text-sm rounded-lg border border-gray-300 bg-white text-gray-700 hover:border-gray-400 cursor-pointer"
                    >
                        {sortOptions.map(option => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-gray-100 border-b border-gray-200">
                        <tr>
                            <th className="text-left px-6 py-4 font-semibold text-gray-700">Sample ID</th>
                            <th className="text-left px-6 py-4 font-semibold text-gray-700">Batch ID</th>
                            <th className="text-left px-6 py-4 font-semibold text-gray-700">Slides</th>
                            <th className="text-left px-6 py-4 font-semibold text-gray-700">Status</th>
                            <th className="text-left px-6 py-4 font-semibold text-gray-700">Action Status</th>
                            <th className="text-center px-6 py-4 font-semibold text-gray-700">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredSamples.map((sample, index) => (
                            <tr
                                key={sample.id}
                                className={`border-t border-gray-100 hover:bg-gray-50 transition ${
                                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                                }`}
                            >
                                <td className="px-6 py-4 font-medium text-gray-900">
                                    {sample.id}
                                </td>
                                <td className="px-6 py-4 text-gray-700">
                                    {sample.batchId}
                                </td>
                                <td className="px-6 py-4 text-gray-700">
                                    {sample.slides}
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${statusColorMap[sample.status] || "bg-gray-100 text-gray-700"}`}>
                                        {sample.status}
                                    </span>
                                </td>
                                <td className={`px-6 py-4 text-sm font-medium ${actionStatusColorMap[sample.actionStatus] || "text-gray-700"}`}>
                                    {sample.actionStatus}
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <button
                                        onClick={() => handleRowClick(sample)}
                                        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition text-gray-600 hover:text-gray-800"
                                    >
                                        <IoMdArrowRoundForward size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
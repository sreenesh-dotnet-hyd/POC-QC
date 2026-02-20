import { IoClose } from "react-icons/io5";
import type { Sample } from "../types/sample.types";

interface Props {
    sample: Sample;
    setIsViewClicked: (value: boolean) => void;
}

export default function ViewSampleModal({
    sample,
    setIsViewClicked,
}: Props) {

    const timelineColors = {
        "scan_failed": "text-red-500",
        "entered": "text-green-500",
        "received": "text-green-500",
        "in_process": "text-orange-500",
        "scanned": "text-orange-500",
        "aligned": "text-green-500",
        "not_aligned": "text-red-500",
        "under_review": "text-blue-500",
        "approved": "text-green-500",
        "rejected":"text-red-500"
    }

    const sortedTimeline = [...sample.timeline].sort(
        (a, b) =>
            new Date(a.timestamp).getTime() -
            new Date(b.timestamp).getTime()
    );

    return (
        <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={() => setIsViewClicked(false)}
        >
            <div
                className="bg-[#f9f5f8] border border-gray-200 rounded-2xl w-[720px] max-w-[95vw] max-h-[90vh] overflow-y-auto shadow-xl animate-[fadeIn_0.2s_ease]"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="px-7 py-6 border-b border-gray-200">
                    <div className="flex justify-between items-start mb-4">

                        <div>
                            <div className="flex flex-col gap-1">
                                <div className="text-sm font-mono text-black mb-1">
                                    <span className="text-gray-400">SAMPLE ID: </span>

                                    {sample.sampleId}
                                </div>
                                <div className="text-sm font-mono text-black mb-1">
                                    <span className="text-gray-400">SAMPLE PRIORITY: </span>

                                    {sample.samplePriority}

                                </div>
                            </div>
                            <div className="text-3xl text-[#101aca] font-bold">
                                {sample.patientName}
                            </div>
                        </div>

                        <div className="flex items-start gap-3">


                            <button
                                onClick={() => setIsViewClicked(false)}
                                className="text-[#101aca] hover:text-gray-700 text-3xl"
                            >
                                <IoClose />
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-6 mt-3">
                        <MetaItem label="Patient ID" value={sample.patientId} />
                        <MetaItem
                            label="DOB / Gender"
                            value={`${sample.patientDob} · ${sample.patientGender}`}
                        />
                        <MetaItem
                            label="Sample Type"
                            value={sample.sampleType.toUpperCase()}
                        />
                        <MetaItem
                            label="Collected By"
                            value={sample.collectedBy || "—"}
                        />
                        <MetaItem
                            label="Received"
                            value={sample.received ? "Yes" : "No"}
                        />
                        <MetaItem
                            label="Current Status"
                            value={sample.sampleStatus.replaceAll("_", " ")}
                        />
                    </div>
                </div>

                <div className="px-7 py-6">

                    <div className="font-semibold text-sm mb-4">
                        Processing Timeline
                    </div>

                    <div className="flex flex-col">

                        {sortedTimeline.map((item, i) => {
                            const isActive = item.status === sample.sampleStatus;
                            const statusColor = timelineColors[item.status];
                    

                        return (
                        <div key={i} className="flex gap-3 relative">

                            {i !== sortedTimeline.length - 1 && (
                                <div className="absolute left-[11px] top-6 bottom-0 w-px bg-gray-200" />
                            )}


                            <div
                                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-[10px] mt-1 flex-shrink-0 ${isActive
                                    ? "border-[#101aca] bg-[#101aca]/10 text-[#101aca]"
                                    : "border-gray-300 bg-gray-100 text-gray-400"
                                    }`}
                            >
                                {/* {isActive ? "✓" : ""} */}
                            </div>

                            {/* Content */}
                            <div className="pb-6 flex-1">
                                <div
                                    className={`text-sm font-medium ${isActive ? statusColor : "text-gray-400"
                                        }`}
                                >

                                    {item.status.replaceAll("_", " ")}
                                </div>

                                <div className="text-xs text-gray-400 font-mono">
                                    {new Date(item.timestamp).toLocaleString()}
                                </div>

                                {item.updatedBy && (
                                    <div className="text-xs text-gray-500">
                                        Updated by: {item.updatedBy}
                                    </div>
                                )}

                                {item.remarks && (
                                    <div className="text-xs italic text-gray-600 mt-1">
                                        "{item.remarks}"
                                    </div>
                                )}
                            </div>
                        </div>
                        );
                        })}
                    </div>

                </div>

                <div className="px-7 py-4 border-t border-gray-200 flex justify-end gap-3">
                    <button
                        onClick={() => setIsViewClicked(false)}
                        className="cursor-pointer px-4 py-2 rounded-lg border border-gray-300 text-sm hover:bg-gray-100"
                    >
                        Close
                    </button>

                    <button
                        className="cursor-pointer px-4 py-2 rounded-lg bg-[#101aca] text-white text-sm hover:bg-[#0d16a8]"
                    >
                        Export Report
                    </button>
                </div>
            </div>
        </div>
    );
}

function MetaItem({
    label,
    value,
}: {
    label: string;
    value: string;
}) {
    return (
        <div className="flex flex-col gap-1">
            <div className="text-[10px] uppercase tracking-wider text-gray-400 font-mono">
                {label}
            </div>
            <div className="text-sm font-medium">{value}</div>
        </div>
    );
}

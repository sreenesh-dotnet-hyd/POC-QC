import { useState } from "react";
import { IoMdRefresh } from "react-icons/io";
import { IoAdd } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import SampleSlidesTable from "../components/SamplesSlidesTable";
import type { Sample } from "../types/sample.types"
import SelectedSampleSlidesTable from "../components/SelectedSampleSlidesTable";
export default function SlidesPage() {
    const [isAddNewClicked, setIsAddNewClicked] = useState<boolean>(false);
    const [selectedSample, setSelectedSample] = useState<Sample | undefined>();

    const samplesData = [
        {
            sampleId: "SMP-2026-001",
            patientId: "PAT-1001",
            patientName: "Rahul Sharma",
            patientDob: "1992-04-12",
            patientGender: "Male",
            collectedBy: "Nurse Anita",
            sampleType: "Tissue",
            samplePriority: "STAT",
            sampleStatus: "under_review",
            slideCount: 5,
            timeline: [
                { status: "entered", timestamp: "2026-02-18T08:00:00Z" },
                { status: "received", timestamp: "2026-02-18T08:30:00Z" },
                { status: "in_process", timestamp: "2026-02-18T09:00:00Z" },
                { status: "under_review", timestamp: "2026-02-18T10:15:00Z" }
            ]
        },
        {
            sampleId: "SMP-2026-002",
            patientId: "PAT-1002",
            patientName: "Priya Menon",
            patientDob: "1988-09-25",
            patientGender: "Female",
            collectedBy: "Dr. Arjun",
            sampleType: "Stained",
            samplePriority: "Urgent",
            sampleStatus: "in_process",
            slideCount: 3,
            timeline: [
                { status: "entered", timestamp: "2026-02-18T07:45:00Z" },
                { status: "received", timestamp: "2026-02-18T08:10:00Z" },
                { status: "in_process", timestamp: "2026-02-18T09:20:00Z" }
            ]
        },
        {
            sampleId: "SMP-2026-003",
            patientId: "PAT-1003",
            patientName: "Amit Verma",
            patientDob: "1975-12-02",
            patientGender: "Male",
            collectedBy: "Nurse Kavya",
            sampleType: "Unstained",
            samplePriority: "Routine",
            sampleStatus: "approved",
            slideCount: 2,
            timeline: [
                { status: "entered", timestamp: "2026-02-17T11:00:00Z" },
                { status: "received", timestamp: "2026-02-17T11:25:00Z" },
                { status: "in_process", timestamp: "2026-02-17T12:00:00Z" },
                { status: "under_review", timestamp: "2026-02-17T13:30:00Z" },
                { status: "approved", timestamp: "2026-02-17T14:10:00Z" }
            ]
        },
        {
            sampleId: "SMP-2026-004",
            patientId: "PAT-1004",
            patientName: "Sneha Iyer",
            patientDob: "2001-06-18",
            patientGender: "Female",
            collectedBy: "Dr. Mehta",
            sampleType: "Tissue",
            samplePriority: "STAT",
            sampleStatus: "rejected",
            slideCount: 4,
            timeline: [
                { status: "entered", timestamp: "2026-02-18T06:30:00Z" },
                { status: "received", timestamp: "2026-02-18T07:00:00Z" },
                { status: "rejected", timestamp: "2026-02-18T07:45:00Z", remarks: "Improper labeling" }
            ]
        }
    ];

    const handleViewClick = (sample: Sample) => {
        setSelectedSample(sample);
    }

    return (<div className="flex flex-col gap-4 overflow-y-auto min-h-full w-full py-6 px-16 bg-[#f9f5f8]">
        {selectedSample == null ?
            <>
                <div className="flex justify-between gap-4">
                    <div className="flex flex-col gap-4">
                        <span className="gothic-regular text-4xl text-[#101aca]">
                            Slides
                        </span>
                        <span className="gothic-regular text-sm text-gray-400">
                            Home / Slides
                        </span>
                    </div>

                    <div className="flex gap-4 mt-4">
                        <button className="cursor-pointer flex items-center justify-center gap-2 bg-[#101aca] h-10 w-44 text-sm text-white rounded-xl hover:bg-[#0d16a8] transition">
                            <IoMdRefresh className="text-lg" />
                            Refresh
                        </button>

                    </div>


                </div>

                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search by Sample ID"
                        // onChange={(e) => setSearchTerm(e.target.value)}
                        className="h-10 w-80 bg-white px-4 pl-10 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#101aca]"
                    />            <IoIosSearch className="absolute text-xl top-2.5 left-2 text-gray-400" />
                </div>


                <div className="mt-2 rounded-3xl overflow-hidden bg-[#e2e2f6] px-4 py-4">
                    <SampleSlidesTable
                        samplesData={samplesData}
                        // onEdit={handleEditClick}
                        onView={handleViewClick}
                    // onDelete={handleTableDeleteClick}
                    />
                </div>
            </>
            :
            <>
            <div className="flex justify-between gap-4">
                    <div className="flex flex-col gap-4">
                        <span className="gothic-regular text-4xl text-[#101aca]">
                            Slides
                        </span>
                        <span className="gothic-regular text-sm text-gray-400">
                            Home / Slides / {<span> {selectedSample.sampleId} </span>}
                        </span>
                    </div>

                    <div className="flex gap-4 mt-4">
                        <button className="cursor-pointer flex items-center justify-center gap-2 bg-[#101aca] h-10 w-44 text-sm text-white rounded-xl hover:bg-[#0d16a8] transition">
                            <IoMdRefresh className="text-lg" />
                            Refresh
                        </button>

                        <button
                            onClick={() => setIsAddNewClicked(true)}
                            className="cursor-pointer flex items-center justify-center gap-2 bg-[#101aca] h-10 w-44 text-sm text-white rounded-xl hover:bg-[#0d16a8] transition"
                        >
                            <IoAdd className="text-lg" />
                            Add new slide
                        </button>
                    </div>


                </div>

                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search by Slide ID"
                        // onChange={(e) => setSearchTerm(e.target.value)}
                        className="h-10 w-80 bg-white px-4 pl-10 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#101aca]"
                    />            <IoIosSearch className="absolute text-xl top-2.5 left-2 text-gray-400" />
                </div>
                     <div className="mt-2 rounded-3xl overflow-hidden bg-[#e2e2f6] px-4 py-4">
                <SelectedSampleSlidesTable
                    sampleSlides={selectedSample}
                />
            </div>
            </>
        }


    </div>)
}
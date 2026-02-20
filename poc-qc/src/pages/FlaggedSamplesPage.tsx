import { IoIosSearch, IoMdRefresh } from "react-icons/io";
import type { Sample } from "../types/sample.types";
import { dummySamples } from "../data/dummysample";
import SamplesTable from "../components/SamplesTable";
import { useEffect, useMemo, useState } from "react";
import EditSampleModal from "../modals/EditSampleModal";
import ViewSampleModal from "../modals/ViewSampleModal";
import { DeleteData, fetchData } from "../data/SamplesData";

export default function FlaggedSamplesPage() {
    const flagFilters = ["scan_failed", "not_aligned", "rejected"];
    const [samples, setSamples] = useState<Sample[]>(dummySamples);
    const [isEditClicked, setIsEditClicked] = useState<boolean>(false);
    const [selectedSample, setSelectedSample] = useState<Sample | null>(null);
    const [isViewClicked, setIsViewClicked] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [sortBy, setSortBy] = useState<string>("newest");
    const [typeFilter, setTypeFilter] = useState<string>("all");
    const [priorityFilter, setPriorityFilter] = useState<string>("all");
    const [statusFilter, setStatusFilter] = useState<string>("all");


    useEffect(() => {
        loadData()
    }, []);

    const loadData = async () => {
        try {
            const data = await fetchData();
            setSamples(data);
            console.log("data fetched sucessfully!", data);
        } catch (err) {
            console.error("failed to load samples!");
        }
    }

    const deleteSample = async (sampleId: string) => {
        try {
            const res = await DeleteData(sampleId);
            if (res) {
                console.log("deleted sucessfully!");
            }
        } catch (err) {
            console.log("failed to delete:", err);
        }
    }

    const handleViewClick = (sample: Sample) => {
        setSelectedSample(sample);
        setIsViewClicked(true);
    };

    const handleDeleteClick = async (sample: Sample) => {
        try {
            await deleteSample(sample.sampleId);
            await loadData();
        } catch (err) {
            console.log(err);
        }
    };



    const handleEditClick = (sample: any) => {
        setSelectedSample(sample);
        setIsEditClicked(true);
    };


    const handleUpdateSample = (updatedSample: any) => {
        setSamples((prev) =>
            prev.map((s) =>
                s.sampleId === updatedSample.sampleId
                    ? updatedSample
                    : s
            )
        );
    };

    const processedSamples = useMemo(() => {
        let result = samples;

        // Only flagged samples
        result = result.filter((x) => flagFilters.includes(x.sampleStatus));


        // Search
        if (searchTerm.trim() !== "") {
            result = result.filter(
                (sample) =>
                    sample.sampleId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    sample.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    sample.patientId.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Type Filter
        if (typeFilter !== "all") {
            result = result.filter((x) => x.sampleType === typeFilter);
        }

        // Priority Filter
        if (priorityFilter !== "all") {
            result = result.filter((x) => x.samplePriority === priorityFilter);
        }

        // Status Filter
        if (statusFilter !== "all") {
            result = result.filter((x) => x.sampleStatus === statusFilter);
        }

        // Sorting
        switch (sortBy) {
            // case "newest":
            //     result = [...result].sort(
            //         (a, b) =>
            //             new Date(b.collectedAt).getTime() -
            //             new Date(a.collectedAt).getTime()
            //     );
            //     break;

            // case "oldest":
            //     result = [...result].sort(
            //         (a, b) =>
            //             new Date(a.collectedAt).getTime() -
            //             new Date(b.collectedAt).getTime()
            //     );
            //     break;

            case "patient_asc":
                result = [...result].sort((a, b) =>
                    a.patientName.localeCompare(b.patientName)
                );
                break;

            case "patient_desc":
                result = [...result].sort((a, b) =>
                    b.patientName.localeCompare(a.patientName)
                );
                break;
        }

        return result;
    }, [
        samples,
        searchTerm,
        sortBy,
        typeFilter,
        priorityFilter,
        statusFilter,
    ]);

    return (
        <div className="relative flex flex-col gap-4 h-full overflow-y-auto py-6 px-16 bg-[#f9f5f8]">
            <div className="flex flex-row justify-between gap-4">
                <div className="flex flex-col gap-4">
                    <span className="gothic-regular text-4xl text-[#101aca]">
                        Flagged Samples
                    </span>
                    <span className="gothic-regular text-sm text-gray-400">
                        Home / Flagged Samples
                    </span>
                </div>

                <div className="flex flex-row gap-4 mt-4">
                    <button
                        onClick={() => loadData()}
                        className="flex items-center justify-center gap-2 bg-[#101aca] h-10 w-44 py-1 text-sm text-white rounded-xl hover:bg-[#0d16a8] cursor-pointer transition">
                        <IoMdRefresh className="text-lg" />
                        Refresh
                    </button>
                </div>
            </div>

            <div>
                <div className="flex flex-row gap-4 mt-2 flex-wrap">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search by Sample ID, Patient Name/ID..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="h-10 w-80 bg-white px-6 pl-8 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#101aca]"
                        />
                        <IoIosSearch className="absolute text-xl top-2.5 left-2 text-gray-400" />
                    </div>

                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="h-10 px-4 bg-white rounded-xl border border-gray-200 text-sm"
                    >
                        <option value="newest">Newest First</option>
                        <option value="oldest">Oldest First</option>
                        <option value="patient_asc">Patient Name (A-Z)</option>
                        <option value="patient_desc">Patient Name (Z-A)</option>
                    </select>

                    {/* Type Filter */}
                    <select
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value)}
                        className="h-10 px-4 bg-white rounded-xl border border-gray-200 text-sm"
                    >
                        <option value="all">All Types</option>
                        <option value="Stained">Stained</option>
                        <option value="Unstained">Unstained</option>
                        <option value="Tissue">Tissue</option>
                    </select>

                    {/* Priority Filter */}
                    <select
                        value={priorityFilter}
                        onChange={(e) => setPriorityFilter(e.target.value)}
                        className="h-10 px-4 bg-white rounded-xl border border-gray-200 text-sm"
                    >
                        <option value="all">All Priority</option>
                        <option value="STAT">STAT</option>
                        <option value="Urgent">Urgent</option>
                        <option value="Routine">Routine</option>
                    </select>

                    {/* Status Filter */}
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="h-10 px-4 bg-white rounded-xl border border-gray-200 text-sm"
                    >
                        <option value="all">All Status</option>
                        <option value="scan_failed">Scan Failed</option>
                        <option value="not_aligned">Not Aligned</option>
                        <option value="rejected">Rejected</option>
                    </select>
                </div>
            </div>

            <div className="mt-2 rounded-3xl overflow-hidden bg-[#e2e2f6] px-4 py-4">
                <SamplesTable
                    samplesData={processedSamples}
                    onEdit={handleEditClick}
                    onView={handleViewClick}
                    onDelete={handleDeleteClick}
                />
            </div>

            {isEditClicked && selectedSample && (
                <EditSampleModal
                    sample={selectedSample}
                    setIsEditClicked={setIsEditClicked}
                    onSave={handleUpdateSample}
                />
            )}

            {isViewClicked && selectedSample && (
                <ViewSampleModal
                    sample={selectedSample}
                    setIsViewClicked={setIsViewClicked}
                />
            )}
        </div>
    );
}

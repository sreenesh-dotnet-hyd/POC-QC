import { useEffect, useState, useMemo } from "react";
import DashboardInsights from "../components/DashboardInsights";
import { IoIosSearch, IoMdRefresh } from "react-icons/io";
import { IoAdd } from "react-icons/io5";
import AddNewSampleModal from "../modals/AddNewSampleModal";
import EditSampleModal from "../modals/EditSampleModal";
import { dummySamples } from "../data/dummysample";
import SamplesTable from "../components/SamplesTable";
import type { Sample } from "../types/sample.types"
import ViewSampleModal from "../modals/ViewSampleModal";
import { DeleteData, fetchData, PostData } from "../data/SamplesData";

export default function DashboardPage() {



    const priorityFilters = ["URGENT", "STAT"];
    const [samples, setSamples] = useState<Sample[]>(dummySamples);
    const filteredSamples = samples.filter(x => priorityFilters.includes(x.samplePriority));
    const [sortBy, setSortBy] = useState<string>("newest");
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [typeFilter, setTypeFilter] = useState<string>("all");
    const [priorityFilter, setPriorityFilter] = useState<string>("all");
    const [statusFilter, setStatusFilter] = useState<string>("all");
    const [isAddNewClicked, setIsAddNewClicked] = useState<boolean>(false);
    const [isEditClicked, setIsEditClicked] = useState<boolean>(false);
    const [selectedSample, setSelectedSample] = useState<Sample | null>(null);
    const [isViewClicked, setIsViewClicked] = useState<boolean>(false);




    useEffect(() => {
        load()
    }, []);

    const load = async () => {
        try {
            const data = await fetchData();
            setSamples(data);
            console.log("data fetched sucessfully!", data);
        } catch (err) {
            console.error("failed to load samples!");
        }
    }

    const postSample = async (sample: Sample) => {
        try {
            const res = await PostData(sample);
            console.log("successfully posted!", res);
        } catch (err) {
            console.log('unsucessful sending data:', err);
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

    const handleAddSample = async (newSample: any) => {
        try {
            await postSample(newSample);
            await load();
        } catch (err) {
            console.log(err);
        }
    };

    const handleViewClick = (sample: Sample) => {
        setSelectedSample(sample);
        setIsViewClicked(true);
    };

    const handleDeleteClick = async (sample: Sample) => {
        try {
            await deleteSample(sample.sampleId);
            await load();
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
        let result = filteredSamples;

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

        switch (sortBy) {
            // case "newest":
            //     result = [...result].sort(
            //         (a, b) =>
            //             new Date(b.timeline).getTime() -
            //             new Date(a.collectedBy).getTime()
            //     );
            //     break;

            // case "oldest":
            //     result = [...result].sort(
            //         (a, b) =>
            //             new Date(a.collectedBy).getTime() -
            //             new Date(b.collectedBy).getTime()
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


            <div className="flex justify-between gap-4">
                <div className="flex flex-col gap-4">
                    <span className="gothic-regular text-4xl text-[#101aca]">
                        Dashboard
                    </span>
                    <span className="gothic-regular text-sm text-gray-400">
                        Home / Dashboard
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
            <div className="flex flex-row gap-4 mt-2">
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
                    className="h-10 px-4 bg-white rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#101aca]"
                >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="patient_asc">Patient Name (A-Z)</option>
                    <option value="patient_desc">Patient Name (Z-A)</option>
                </select>

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


                {/* Status Filter */}
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="h-10 px-4 bg-white rounded-xl border border-gray-200 text-sm"
                >
                    <option value="all">All Status</option>
                    <option value="entered">Entered</option>
                    <option value="received">Received</option>
                    <option value="rejected">Rejected</option>
                    <option value="in_process">In Process</option>
                    <option value="scanned"> Scanned</option>
                    <option value="scan_failed">Scan Failed</option>
                    <option value="aligned">Aligned</option>
                    <option value="not_aligned">Not Aligned</option>
                    <option value="under_review">Under Review</option>
                    <option value="approved">Approved</option>


                </select>

            </div>
            <div className="mt-2 rounded-3xl overflow-hidden bg-[#e2e2f6] px-4 py-4">
                <SamplesTable
                    samplesData={processedSamples}
                    onEdit={handleEditClick}
                    onView={handleViewClick}
                    onDelete={handleDeleteClick}
                />
            </div>


            {isAddNewClicked && (
                <AddNewSampleModal
                    setIsAddNewClicked={setIsAddNewClicked}
                    onSave={handleAddSample}
                />
            )}

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

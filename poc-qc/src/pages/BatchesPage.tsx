import React from "react";
import { ChevronRight, Filter } from "lucide-react";
import { IoAdd } from "react-icons/io5";
import { MdDone } from "react-icons/md";
import { IoMdArrowRoundForward } from "react-icons/io";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


type Batch = {
    id: string;
    slides: number;
    samples: number;
};

const batchesData: Batch[] = [
    { id: "000123123", slides: 45, samples: 3 },
    { id: "000123124", slides: 45, samples: 3 },
    { id: "000123125", slides: 45, samples: 3 },
    { id: "000123126", slides: 45, samples: 3 },
    { id: "000123127", slides: 45, samples: 3 },
    { id: "000123128", slides: 45, samples: 3 },
    { id: "000123129", slides: 45, samples: 3 },
    { id: "000123130", slides: 45, samples: 3 },
];



export default function BatchesPage() {
    const navigate = useNavigate();

    const [batches, setBatches] = useState<Batch[]>(batchesData);

    const handleClick = (batchId: string) => {
  navigate(`/batches/${batchId}`);
};

    return (
        <div className="min-h-screen w-[100vw] bg-white p-8">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-10">
                    <h1 className="text-5xl text-gray-800 font-[700]">Batches</h1>
                    <button
                        className="cursor-pointer flex items-center justify-center gap-2 bg-black/10 border border-black  h-10 w-34 py-1 px-4 text-sm text-black rounded-lg 
                        hover:bg-gray-400 cursor-pointer transition">
                        <IoAdd className="text-lg" />
                        <span>New Batch</span>
                    </button>
                </div>

                <div className="flex items-center gap-3">
                    <button className="cursor-pointer flex items-center gap-2 px-3 py-2 bg-white rounded-lg hover:bg-gray-100 transition">
                        <Filter size={16} />
                    </button>

                    <span className="cursor-pointer flex flex-row items-center gap-3 px-3 py-2 bg-gray-900 text-white rounded-lg text-sm">
                        <MdDone />
                        In Process
                    </span>

                    <span className="cursor-pointer px-3 py-2 bg-gray-100 text-gray-400 rounded-lg text-sm">
                        Any customer
                    </span>
                </div>
            </div>

            <div className="bg-white shadow-sm border border-gray-200">
                {batches.map((batch, index) => (
                    <div
                        key={batch.id}
                        className={`flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition ${index !== batches.length - 1
                            ? "border-b border-gray-200"
                            : ""
                            }`}

                        onClick={()=>handleClick(batch.id)}
                    >
                        <div className="text-lg font-medium text-gray-800">
                            {batch.id}
                        </div>

                        <div className="flex items-center gap-20 text-left">
                            <div>
                                <p className="text-lg font-semibold text-gray-800">
                                    {batch.slides}
                                </p>
                                <p className="text-sm text-blue-600">Slides</p>
                            </div>

                            <div>
                                <p className="text-lg font-semibold text-gray-800">
                                    {batch.samples}
                                </p>
                                <p className="text-sm text-blue-600">Samples</p>
                            </div>

                            <button className="p-2 rounded-full bg-gray-100 border-2 border-gray-200 hover:bg-gray-200 transition">
                                <IoMdArrowRoundForward size={18}/>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
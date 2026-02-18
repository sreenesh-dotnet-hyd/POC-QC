import { IoMdRefresh } from "react-icons/io";
import { IoAdd } from "react-icons/io5";
import type { Sample } from '../types/SampleType';

export default function FlaggedSamplesPage() {


    const sampleData:Sample[] = [{id:'101', patient:'sreenesh', type:'blood', priority:'Low', status:'Processing'}]
    return (<div className="relative flex flex-col gap-4 h-full overflow-y-auto py-6 px-16 bg-[#f9f5f8]">
        <div className="flex flex-row justify-between gap-4">
            <div className="flex flex-col gap-4">
                <span className="gothic-regular text-4xl text-[#101aca]">Flagged Samples</span>
                <span className="gothic-regular text-sm text-gray-400">Home / Flagged Samples</span>
            </div>

            <div className="flex flex-row gap-4 mt-4">
                <button className="flex items-center justify-center gap-2 bg-[#101aca] h-10 w-44 py-1 text-sm text-white rounded-xl hover:bg-[#0d16a8] cursor-pointer transition">
                    <IoMdRefresh className="text-lg" />
                    Refresh
                </button>

                <button className="flex items-center justify-center gap-2 bg-[#101aca] h-10 w-44 py-1 text-sm text-white rounded-xl hover:bg-[#0d16a8] cursor-pointer transition">
                    <IoAdd className="text-lg" />
                    Add new Sample
                </button>

            </div>
        </div>

        <div className="mt-2 rounded-3xl overflow-hidden bg-[#e2e2f6] px-4 py-4">
            <table className="bg-white w-full text-sm">
                <thead>
                    <tr className="gap-4">
                        <td>SAMPLE ID </td>
                        <td> PATIENT </td>
                        <td> TYPE</td>
                        <td>PRIORITY</td>
                        <td> STATUS</td>
                        <td>ACTIONS</td>
                    </tr>
                </thead>
                <tbody>
                    {sampleData.map((sample)=>(
                        <tr>
                            <td> {sample.id}</td>
                            <td> {sample.patient} </td>
                            <td>{sample.type}</td>
                            <td>{sample.priority}</td>
                            <td>{sample.status}</td>
                            <td>
                                <button>View</button>
                                <button>Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>)
}
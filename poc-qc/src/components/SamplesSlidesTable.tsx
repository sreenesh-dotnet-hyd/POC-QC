import type { SamplePriority, SampleStatusType } from "../types/sample.types";


export default function SampleSlidesTable({samplesData, onView}:{samplesData:Sample[], onView:(sample:Sample)=>void}){
    
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


    return( <table className="w-full text-sm bg-white">
                <thead className="bg-[#f9f5f8] text-gray-500 uppercase gothic-regular text-xs tracking-wider">
                    <tr>
                        <th className="text-left px-6 py-4">Sample ID</th>
                         <th className="text-left px-6 py-4">Number of Slides</th>
                        <th className="text-left px-6 py-4">Sample Type</th>
                        <th className="text-left px-6 py-4">Priority</th>
                        <th className="text-left px-6 py-4">Status</th>
                        <th className="text-left px-6 py-4">Actions</th>
                    </tr>
                </thead>
    
                <tbody>
                    {samplesData.map((s) => (
                        <tr key={s.sampleId} className="odd:bg-gray-50 even:bg-gray-20 transition">
    
                            <td className="px-6 py-4 font-medium">{s.sampleId}</td>
                             <td className="px-6 py-4">
                                <span className={`px-2 py-1 text-sm rounded-lg`}>
                                    {s.slideCount}
                                </span>
                            </td>
                            <td className="px-6 py-4">{s.sampleType}</td>
    
                            <td className="px-6 py-4">
                                <span className={`px-2 py-1 text-xs rounded-lg ${priorityColor[s.samplePriority]}`}>
                                    {s.samplePriority}
                                </span>
                            </td>
    
                            <td className="px-6 py-4">
                                <span className={`px-2 py-1 text-xs rounded-lg ${statusColor[s.sampleStatus]}`}>
                                    {s.sampleStatus}
                                </span>
                            </td>

                            
                           
    
                            <td className=" py-4">
                                <div className="flex gap-2">
    
                                    <button 
                                    onClick={()=>onView(s)} 
                                    className="px-6 py-1 text-xs rounded-lg bg-[#101aca] cursor-pointer text-white hover:bg-[#0d16a8] transition">
                                        View
                                    </button>
                                </div>
                            </td>
    
                        </tr>
                    ))}
                </tbody>
    
            </table>)
}
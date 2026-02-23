import type { SamplePriority, SampleStatusType } from "../types/sample.types";


export default function ExceptionSamplesSlidesTable({samplesData, onView}:{samplesData:prop, onView:(sample:Sample)=>void}){
      const slidesData: Slide[] = [
    
        {
          slideId: "SLD-001-01",
          sampleId: "SMP-2026-001",
          slideType: "H&E",
          stainType: "Hematoxylin & Eosin",
          createdAt: new Date(),
          createdBy: "tech_01",
          createdMethod: "SCAN",
          status: "APPROVED",
          isBlocked: false,
          exceptionType: null,
          exceptionReason: null,
          exceptionRecordedAt: null,
          exceptionRecordedBy: null,
          timeline: [
            { status: "CREATED", timestamp: "2026-02-18T08:00:00Z", updatedBy: "tech_01" },
            { status: "QC_PASSED", timestamp: "2026-02-18T09:00:00Z", updatedBy: "qc_01" },
            { status: "IN_ANALYSIS", timestamp: "2026-02-18T10:00:00Z", updatedBy: "path_01" },
            { status: "APPROVED", timestamp: "2026-02-18T12:00:00Z", updatedBy: "senior_path" }
          ]
        },
        {
          slideId: "SLD-001-02",
          sampleId: "SMP-2026-001",
          slideType: "IHC",
          stainType: "ER",
          createdAt: new Date(),
          createdBy: "tech_02",
          createdMethod: "MANUAL",
          status: "QC_FAILED",
          isBlocked: false,
          exceptionType: null,
          exceptionReason: null,
          exceptionRecordedAt: null,
          exceptionRecordedBy: null,
          timeline: [
            { status: "CREATED", timestamp: "2026-02-18T08:30:00Z", updatedBy: "tech_02" },
            { status: "QC_FAILED", timestamp: "2026-02-18T09:10:00Z", updatedBy: "qc_02", remarks: "Stain uneven" }
          ]
        },
        {
          slideId: "SLD-001-03",
          sampleId: "SMP-2026-001",
          slideType: "QC",
          stainType: null,
          createdAt: new Date(),
          createdBy: "tech_03",
          createdMethod: "SCAN",
          status: "IN_ANALYSIS",
          isBlocked: false,
          exceptionType: null,
          exceptionReason: null,
          exceptionRecordedAt: null,
          exceptionRecordedBy: null,
          timeline: [
            { status: "CREATED", timestamp: "2026-02-18T07:00:00Z", updatedBy: "tech_03" },
            { status: "QC_PASSED", timestamp: "2026-02-18T08:00:00Z", updatedBy: "qc_01" },
            { status: "IN_ANALYSIS", timestamp: "2026-02-18T09:00:00Z", updatedBy: "path_01" }
          ]
        },
        {
          slideId: "SLD-001-04",
          sampleId: "SMP-2026-001",
          slideType: "H&E",
          stainType: "Hematoxylin & Eosin",
          createdAt: new Date(),
          createdBy: "tech_01",
          createdMethod: "SCAN",
          status: "REJECTED",
          isBlocked: false,
          exceptionType: null,
          exceptionReason: null,
          exceptionRecordedAt: null,
          exceptionRecordedBy: null,
          timeline: [
            { status: "CREATED", timestamp: "2026-02-18T06:00:00Z", updatedBy: "tech_01" },
            { status: "QC_PASSED", timestamp: "2026-02-18T07:00:00Z", updatedBy: "qc_01" },
            { status: "REJECTED", timestamp: "2026-02-18T11:00:00Z", updatedBy: "path_02", remarks: "Artifacts present" }
          ]
        },
        {
          slideId: "SLD-001-05",
          sampleId: "SMP-2026-001",
          slideType: "IHC",
          stainType: "PR",
          createdAt: new Date(),
          createdBy: "tech_02",
          createdMethod: "MANUAL",
          status: "ARCHIVED",
          isBlocked: false,
          exceptionType: null,
          exceptionReason: null,
          exceptionRecordedAt: null,
          exceptionRecordedBy: null,
          timeline: [
            { status: "CREATED", timestamp: "2026-02-17T06:00:00Z", updatedBy: "tech_02" },
            { status: "QC_PASSED", timestamp: "2026-02-17T07:00:00Z", updatedBy: "qc_02" },
            { status: "APPROVED", timestamp: "2026-02-17T10:00:00Z", updatedBy: "senior_path" },
            { status: "ARCHIVED", timestamp: "2026-02-17T12:00:00Z", updatedBy: "system" }
          ]
        },
    
        {
          slideId: "SLD-002-01",
          sampleId: "SMP-2026-002",
          slideType: "H&E",
          stainType: "Hematoxylin & Eosin",
          createdAt: new Date(),
          createdBy: "tech_01",
          createdMethod: "SCAN",
          status: "IN_ANALYSIS",
          isBlocked: false,
          exceptionType: null,
          exceptionReason: null,
          exceptionRecordedAt: null,
          exceptionRecordedBy: null,
          timeline: [
            { status: "CREATED", timestamp: "2026-02-18T05:00:00Z", updatedBy: "tech_01" },
            { status: "QC_PASSED", timestamp: "2026-02-18T05:30:00Z", updatedBy: "qc_01" },
            { status: "IN_ANALYSIS", timestamp: "2026-02-18T06:00:00Z", updatedBy: "path_urgent" }
          ]
        },
        {
          slideId: "SLD-002-02",
          sampleId: "SMP-2026-002",
          slideType: "IHC",
          stainType: "HER2",
          createdAt: new Date(),
          createdBy: "tech_02",
          createdMethod: "SCAN",
          status: "QC_IN_PROGRESS",
          isBlocked: false,
          exceptionType: null,
          exceptionReason: null,
          exceptionRecordedAt: null,
          exceptionRecordedBy: null,
          timeline: [
            { status: "CREATED", timestamp: "2026-02-18T06:00:00Z", updatedBy: "tech_02" },
            { status: "QC_IN_PROGRESS", timestamp: "2026-02-18T06:20:00Z", updatedBy: "qc_urgent" }
          ]
        },
        {
          slideId: "SLD-002-03",
          sampleId: "SMP-2026-002",
          slideType: "QC",
          stainType: null,
          createdAt: new Date(),
          createdBy: "tech_03",
          createdMethod: "MANUAL",
          status: "QC_PENDING",
          isBlocked: false,
          exceptionType: null,
          exceptionReason: null,
          exceptionRecordedAt: null,
          exceptionRecordedBy: null,
          timeline: [
            { status: "CREATED", timestamp: "2026-02-18T07:00:00Z", updatedBy: "tech_03" }
          ]
        },
        {
          slideId: "SLD-002-04",
          sampleId: "SMP-2026-002",
          slideType: "H&E",
          stainType: "Hematoxylin & Eosin",
          createdAt: new Date(),
          createdBy: "tech_01",
          createdMethod: "SCAN",
          status: "APPROVED",
          isBlocked: false,
          exceptionType: null,
          exceptionReason: null,
          exceptionRecordedAt: null,
          exceptionRecordedBy: null,
          timeline: [
            { status: "CREATED", timestamp: "2026-02-17T04:00:00Z", updatedBy: "tech_01" },
            { status: "QC_PASSED", timestamp: "2026-02-17T05:00:00Z", updatedBy: "qc_01" },
            { status: "APPROVED", timestamp: "2026-02-17T08:00:00Z", updatedBy: "senior_path" }
          ]
        },
        {
          slideId: "SLD-002-05",
          sampleId: "SMP-2026-002",
          slideType: "IHC",
          stainType: "PR",
          createdAt: new Date(),
          createdBy: "tech_02",
          createdMethod: "MANUAL",
          status: "REVIEWED",
          isBlocked: false,
          exceptionType: null,
          exceptionReason: null,
          exceptionRecordedAt: null,
          exceptionRecordedBy: null,
          timeline: [
            { status: "CREATED", timestamp: "2026-02-18T02:00:00Z", updatedBy: "tech_02" },
            { status: "QC_PASSED", timestamp: "2026-02-18T03:00:00Z", updatedBy: "qc_02" },
            { status: "REVIEWED", timestamp: "2026-02-18T06:00:00Z", updatedBy: "path_urgent" }
          ]
        },
        {
          slideId: "SLD-003-01",
          sampleId: "SMP-2026-003",
          slideType: "H&E",
          stainType: "Hematoxylin & Eosin",
          createdAt: new Date(),
          createdBy: "tech_04",
          createdMethod: "SCAN",
          status: "ARCHIVED",
          isBlocked: false,
          exceptionType: null,
          exceptionReason: null,
          exceptionRecordedAt: null,
          exceptionRecordedBy: null,
          timeline: [
            { status: "CREATED", timestamp: "2026-02-16T08:00:00Z", updatedBy: "tech_04" },
            { status: "QC_PASSED", timestamp: "2026-02-16T09:00:00Z", updatedBy: "qc_01" },
            { status: "APPROVED", timestamp: "2026-02-16T11:00:00Z", updatedBy: "senior_path" },
            { status: "ARCHIVED", timestamp: "2026-02-16T13:00:00Z", updatedBy: "system" }
          ]
        },
        {
          slideId: "SLD-003-02",
          sampleId: "SMP-2026-003",
          slideType: "IHC",
          stainType: "HER2",
          createdAt: new Date(),
          createdBy: "tech_04",
          createdMethod: "MANUAL",
          status: "APPROVED",
          isBlocked: false,
          exceptionType: null,
          exceptionReason: null,
          exceptionRecordedAt: null,
          exceptionRecordedBy: null,
          timeline: [
            { status: "CREATED", timestamp: "2026-02-16T07:00:00Z", updatedBy: "tech_04" },
            { status: "QC_PASSED", timestamp: "2026-02-16T08:00:00Z", updatedBy: "qc_02" },
            { status: "REVIEWED", timestamp: "2026-02-16T10:00:00Z", updatedBy: "path_02" },
            { status: "APPROVED", timestamp: "2026-02-16T11:30:00Z", updatedBy: "senior_path" }
          ]
        },
        {
          slideId: "SLD-003-03",
          sampleId: "SMP-2026-003",
          slideType: "QC",
          stainType: null,
          createdAt: new Date(),
          createdBy: "tech_05",
          createdMethod: "SCAN",
          status: "APPROVED",
          isBlocked: false,
          exceptionType: null,
          exceptionReason: null,
          exceptionRecordedAt: null,
          exceptionRecordedBy: null,
          timeline: [
            { status: "CREATED", timestamp: "2026-02-16T06:00:00Z", updatedBy: "tech_05" },
            { status: "QC_PASSED", timestamp: "2026-02-16T06:30:00Z", updatedBy: "qc_01" },
            { status: "APPROVED", timestamp: "2026-02-16T09:00:00Z", updatedBy: "path_01" }
          ]
        },
        {
          slideId: "SLD-003-04",
          sampleId: "SMP-2026-003",
          slideType: "IHC",
          stainType: "ER",
          createdAt: new Date(),
          createdBy: "tech_04",
          createdMethod: "MANUAL",
          status: "REVIEWED",
          isBlocked: false,
          exceptionType: null,
          exceptionReason: null,
          exceptionRecordedAt: null,
          exceptionRecordedBy: null,
          timeline: [
            { status: "CREATED", timestamp: "2026-02-16T08:15:00Z", updatedBy: "tech_04" },
            { status: "QC_PASSED", timestamp: "2026-02-16T09:00:00Z", updatedBy: "qc_02" },
            { status: "REVIEWED", timestamp: "2026-02-16T11:00:00Z", updatedBy: "path_02" }
          ]
        },
        {
          slideId: "SLD-003-05",
          sampleId: "SMP-2026-003",
          slideType: "H&E",
          stainType: "Hematoxylin & Eosin",
          createdAt: new Date(),
          createdBy: "tech_05",
          createdMethod: "SCAN",
          status: "QC_PASSED",
          isBlocked: false,
          exceptionType: null,
          exceptionReason: null,
          exceptionRecordedAt: null,
          exceptionRecordedBy: null,
          timeline: [
            { status: "CREATED", timestamp: "2026-02-16T09:30:00Z", updatedBy: "tech_05" },
            { status: "QC_PASSED", timestamp: "2026-02-16T10:00:00Z", updatedBy: "qc_01" }
          ]
        }, {
          slideId: "SLD-004-01",
          sampleId: "SMP-2026-004",
          slideType: "H&E",
          stainType: "Hematoxylin & Eosin",
          createdAt: new Date(),
          createdBy: "tech_06",
          createdMethod: "SCAN",
          status: "EXCEPTION",
          isBlocked: true,
          exceptionType: "SCAN_FAILED",
          exceptionReason: "Barcode unreadable",
          exceptionRecordedAt: new Date(),
          exceptionRecordedBy: "tech_06",
          timeline: [
            { status: "CREATED", timestamp: "2026-02-18T05:00:00Z", updatedBy: "tech_06" },
            { status: "EXCEPTION", timestamp: "2026-02-18T05:10:00Z", updatedBy: "tech_06", remarks: "Scanner error" }
          ]
        },
        {
          slideId: "SLD-004-02",
          sampleId: "SMP-2026-004",
          slideType: "QC",
          stainType: null,
          createdAt: new Date(),
          createdBy: "tech_06",
          createdMethod: "MANUAL",
          status: "QC_FAILED",
          isBlocked: false,
          exceptionType: null,
          exceptionReason: null,
          exceptionRecordedAt: null,
          exceptionRecordedBy: null,
          timeline: [
            { status: "CREATED", timestamp: "2026-02-18T06:00:00Z", updatedBy: "tech_06" },
            { status: "QC_FAILED", timestamp: "2026-02-18T06:45:00Z", updatedBy: "qc_03", remarks: "Slide not aligned" }
          ]
        },
        {
          slideId: "SLD-004-03",
          sampleId: "SMP-2026-004",
          slideType: "IHC",
          stainType: "PR",
          createdAt: new Date(),
          createdBy: "tech_07",
          createdMethod: "SCAN",
          status: "QC_PENDING",
          isBlocked: false,
          exceptionType: null,
          exceptionReason: null,
          exceptionRecordedAt: null,
          exceptionRecordedBy: null,
          timeline: [
            { status: "CREATED", timestamp: "2026-02-18T07:00:00Z", updatedBy: "tech_07" }
          ]
        },
        {
          slideId: "SLD-004-04",
          sampleId: "SMP-2026-004",
          slideType: "H&E",
          stainType: "Hematoxylin & Eosin",
          createdAt: new Date(),
          createdBy: "tech_06",
          createdMethod: "MANUAL",
          status: "IN_ANALYSIS",
          isBlocked: false,
          exceptionType: null,
          exceptionReason: null,
          exceptionRecordedAt: null,
          exceptionRecordedBy: null,
          timeline: [
            { status: "CREATED", timestamp: "2026-02-18T08:00:00Z", updatedBy: "tech_06" },
            { status: "QC_PASSED", timestamp: "2026-02-18T08:40:00Z", updatedBy: "qc_03" },
            { status: "IN_ANALYSIS", timestamp: "2026-02-18T09:30:00Z", updatedBy: "path_03" }
          ]
        },
        {
          slideId: "SLD-004-05",
          sampleId: "SMP-2026-004",
          slideType: "QC",
          stainType: null,
          createdAt: new Date(),
          createdBy: "tech_07",
          createdMethod: "SCAN",
          status: "REJECTED",
          isBlocked: false,
          exceptionType: null,
          exceptionReason: null,
          exceptionRecordedAt: null,
          exceptionRecordedBy: null,
          timeline: [
            { status: "CREATED", timestamp: "2026-02-18T07:30:00Z", updatedBy: "tech_07" },
            { status: "QC_FAILED", timestamp: "2026-02-18T08:00:00Z", updatedBy: "qc_03" },
            { status: "REJECTED", timestamp: "2026-02-18T09:00:00Z", updatedBy: "path_03", remarks: "Resample required" }
          ]
        },
        {
          slideId: "SLD-005-01",
          sampleId: "SMP-2026-005",
          slideType: "H&E",
          stainType: "Hematoxylin & Eosin",
          createdAt: new Date(),
          createdBy: "tech_08",
          createdMethod: "SCAN",
          status: "QC_PENDING",
          isBlocked: false,
          exceptionType: null,
          exceptionReason: null,
          exceptionRecordedAt: null,
          exceptionRecordedBy: null,
          timeline: [
            { status: "CREATED", timestamp: "2026-02-18T09:00:00Z", updatedBy: "tech_08" }
          ]
        },
        {
          slideId: "SLD-005-02",
          sampleId: "SMP-2026-005",
          slideType: "IHC",
          stainType: "HER2",
          createdAt: new Date(),
          createdBy: "tech_08",
          createdMethod: "MANUAL",
          status: "QC_IN_PROGRESS",
          isBlocked: false,
          exceptionType: null,
          exceptionReason: null,
          exceptionRecordedAt: null,
          exceptionRecordedBy: null,
          timeline: [
            { status: "CREATED", timestamp: "2026-02-18T08:30:00Z", updatedBy: "tech_08" },
            { status: "QC_IN_PROGRESS", timestamp: "2026-02-18T09:10:00Z", updatedBy: "qc_04" }
          ]
        },
        {
          slideId: "SLD-005-03",
          sampleId: "SMP-2026-005",
          slideType: "QC",
          stainType: null,
          createdAt: new Date(),
          createdBy: "tech_09",
          createdMethod: "SCAN",
          status: "QC_FAILED",
          isBlocked: false,
          exceptionType: null,
          exceptionReason: null,
          exceptionRecordedAt: null,
          exceptionRecordedBy: null,
          timeline: [
            { status: "CREATED", timestamp: "2026-02-18T07:00:00Z", updatedBy: "tech_09" },
            { status: "QC_FAILED", timestamp: "2026-02-18T07:45:00Z", updatedBy: "qc_04", remarks: "Air bubbles detected" }
          ]
        },
        {
          slideId: "SLD-005-04",
          sampleId: "SMP-2026-005",
          slideType: "H&E",
          stainType: "Hematoxylin & Eosin",
          createdAt: new Date(),
          createdBy: "tech_08",
          createdMethod: "SCAN",
          status: "APPROVED",
          isBlocked: false,
          exceptionType: null,
          exceptionReason: null,
          exceptionRecordedAt: null,
          exceptionRecordedBy: null,
          timeline: [
            { status: "CREATED", timestamp: "2026-02-17T06:00:00Z", updatedBy: "tech_08" },
            { status: "QC_PASSED", timestamp: "2026-02-17T07:00:00Z", updatedBy: "qc_04" },
            { status: "APPROVED", timestamp: "2026-02-17T09:00:00Z", updatedBy: "path_04" }
          ]
        },
        {
          slideId: "SLD-005-05",
          sampleId: "SMP-2026-005",
          slideType: "IHC",
          stainType: "ER",
          createdAt: new Date(),
          createdBy: "tech_09",
          createdMethod: "MANUAL",
          status: "ARCHIVED",
          isBlocked: false,
          exceptionType: null,
          exceptionReason: null,
          exceptionRecordedAt: null,
          exceptionRecordedBy: null,
          timeline: [
            { status: "CREATED", timestamp: "2026-02-17T05:00:00Z", updatedBy: "tech_09" },
            { status: "QC_PASSED", timestamp: "2026-02-17T06:00:00Z", updatedBy: "qc_04" },
            { status: "APPROVED", timestamp: "2026-02-17T08:00:00Z", updatedBy: "senior_path" },
            { status: "ARCHIVED", timestamp: "2026-02-17T10:00:00Z", updatedBy: "system" }
          ]
        },
    
      ];
    const getExceptionSlideCount = (sampleId) => {
  return slidesData.filter(
    (slide) => slide.sampleId === sampleId && slide.isBlocked
  ).length;
};

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
                         <th className="text-left px-6 py-4">Number of Exception Slides</th>
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
                                  {getExceptionSlideCount(s.sampleId)}
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
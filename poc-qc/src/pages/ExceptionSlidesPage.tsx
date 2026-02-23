import { IoMdRefresh } from "react-icons/io";
import { useEffect, useState } from "react";
import type { Slide } from "../types/SlideType";
import type { Sample } from "../types/sample.types";
import ExceptionSamplesSlidesTable from "../components/ExceptionSamplesSlidesTable";
export default function ExceptionSlidesPage() {


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
      received: true,
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
      received: true,
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
      received: true,
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
      received: true,
      timeline: [
        { status: "entered", timestamp: "2026-02-18T06:30:00Z" },
        { status: "received", timestamp: "2026-02-18T07:00:00Z" },
        { status: "rejected", timestamp: "2026-02-18T07:45:00Z", remarks: "Improper labeling" }
      ]
    }
  ] ;

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

    const [exceptionSlides, setExceptionSlides] = useState<Slide[]>([]);
  const [exceptionSamples, setExceptionSamples] = useState();

  // const fetchExcpSamples = () => {
  //   console.log("inside")
  //   setExceptionSamples(
  //     samplesData.filter((sample) =>
  //       exceptionSlides.some(
  //         (slide) => slide.sampleId === sample.sampleId
  //       )
  //     )
  //   );
  //   console.log("done", exceptionSamples);
  // }

  const handleViewClick = ()=>{
    console.log("hello");
    }
  const fetchExcepSlides = (slidesData) => {
    setExceptionSlides(slidesData.filter((slide => slide.isBlocked == true)))
  }



  useEffect(() => {
  const blockedSlides = slidesData.filter(
    (slide) => slide.isBlocked === true
  );

  setExceptionSlides(blockedSlides);

  const filteredSamples = samplesData.filter((sample) =>
    blockedSlides.some(
      (slide) => slide.sampleId === sample.sampleId
    )
  );


  setExceptionSamples(filteredSamples);

}, []);
  return (<div className="flex flex-col gap-4 overflow-y-auto min-h-full w-full py-6 px-16 bg-[#f9f5f8]">
    <div className="flex justify-between gap-4">
      <div className="flex flex-col gap-4">
        <span className="gothic-regular text-4xl text-[#101aca]">
          Exception Slides
        </span>
        <span className="gothic-regular text-sm text-gray-400">
          Home / Exception Slides
        </span>
      </div>

      <div className="flex gap-4 mt-4">
        <button className="cursor-pointer flex items-center justify-center gap-2 bg-[#101aca] h-10 w-44 text-sm text-white rounded-xl hover:bg-[#0d16a8] transition">
          <IoMdRefresh className="text-lg" />
          Refresh
        </button>
      </div>
    </div>

{exceptionSamples!=undefined && exceptionSamples.length >= 0? (
    <div className="mt-2 rounded-3xl overflow-hidden bg-[#e2e2f6] px-4 py-4">
      <ExceptionSamplesSlidesTable
        samplesData={exceptionSamples}
        // onEdit={handleEditClick}
        onView={handleViewClick}
      // onDelete={handleTableDeleteClick}
      />
    </div>
):null}
  
  </div>)
}
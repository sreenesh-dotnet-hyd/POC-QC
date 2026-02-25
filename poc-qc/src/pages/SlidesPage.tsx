import { useState, useMemo, useEffect } from "react";
import { IoMdRefresh } from "react-icons/io";
import { IoAdd } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import SampleSlidesTable from "../components/SamplesSlidesTable";
import type { Sample } from "../types/sample.types"
import SelectedSampleSlidesTable from "../components/SelectedSampleSlidesTable";
import type { Slide } from "../types/SlideType";
import type { SlideStatus } from "../types/SlideType";
import { RiArrowGoBackFill } from "react-icons/ri";
import AddNewSlideModal from "../modals/AddNewSlideModal";
import ViewSlideModal from "../modals/ViewSlideModal";
import DeleteSlideModal from "../modals/DeleteSlideModal";
import EditSlideModal from "../modals/EditSlideModal";
import { fetchData } from "../data/SamplesData";
import { fetchSlidesCountData, fetchSlidesData } from "../data/SlidesData";

type SlideCount = {
  sampleId: string,
  slideCount: number
}

export default function SlidesPage() {
  const [isAddNewClicked, setIsAddNewClicked] = useState<boolean>(false);
  const [selectedSample, setSelectedSample] = useState<Sample>();
  const [selectedSlide, setSelectedSlide] = useState<Slide | null>(null);
  const [selectedSlides, setSelectedSlides] = useState<Slide[]>([]);
  const [isViewClicked, setIsViewClicked] = useState(false);
  const [isEditClicked, setIsEditClicked] = useState(false);
  const [isDeleteClicked, setIsDeleteClicked] = useState(false);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<SlideStatus | "ALL">("ALL");
  const [methodFilter, setMethodFilter] = useState<"ALL" | "SCAN" | "MANUAL">("ALL");
  const [blockedFilter, setBlockedFilter] = useState<"ALL" | "YES" | "NO">("ALL");
  const [slideTypeFilter, setSlideTypeFilter] = useState("ALL");

  const uniqueSlideTypes = [...new Set(selectedSlides.map(s => s.slideType))];

  const dummySamplesData:Sample[] = [
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
      received:true,
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
            received:true,

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
            received:true,

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
            received:true,

      timeline: [
        { status: "entered", timestamp: "2026-02-18T06:30:00Z" },
        { status: "received", timestamp: "2026-02-18T07:00:00Z" },
        { status: "rejected", timestamp: "2026-02-18T07:45:00Z", remarks: "Improper labeling" }
      ]
    }
  ] ;

  const dummySlidesData: Slide[] = [

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

  const [slidesData, setSlidesData] = useState<Slide[]>(dummySlidesData);
  const [samplesData, setSamplesData] = useState<Sample[]>(dummySamplesData);
  const [slidesCountData, setSlidesCountData] = useState<SlideCount[]>([]);
 
  useEffect(()=>{

    const loadSamples = async ()=>{
    try{
    const samplesRes = await fetchData();
        setSamplesData(samplesRes);

    }catch(err){
      console.log(err);
    }
    }

    const loadSlides = async ()=>{
      try{
        const slidesRes = await fetchSlidesData();
        setSlidesData(slidesRes);
      }catch(err){
      console.log(err);
    }
    }

    
    const loadSlidesCount = async ()=>{
      try{
        const slidesRes = await fetchSlidesCountData();
        setSlidesCountData(slidesRes);
        console.log(slidesRes);
      }catch(err){
      console.log(err);
    }
    }

    loadSamples();
    loadSlides();
    loadSlidesCount();
  },[]);

  const filteredSlides = useMemo(() => {
    return selectedSlides.filter((s) => {

      const matchesSearch =
        s.slideId.toLowerCase().includes(search.toLowerCase()) ||
        s.createdBy.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "ALL" || s.status === statusFilter;

      const matchesMethod =
        methodFilter === "ALL" || s.createdMethod === methodFilter;

      const matchesBlocked =
        blockedFilter === "ALL" ||
        (blockedFilter === "YES" && s.isBlocked) ||
        (blockedFilter === "NO" && !s.isBlocked);

      const matchesSlideType =
        slideTypeFilter === "ALL" || s.slideType === slideTypeFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesMethod &&
        matchesBlocked &&
        matchesSlideType
      );
    });
  }, [selectedSlides, search, statusFilter, methodFilter, blockedFilter, slideTypeFilter]);





 


  const handleViewClick = (sample: Sample) => {
    setSelectedSample(sample);
    const slides = slidesData.filter(slide => slide.sampleId === sample.sampleId);
    setSelectedSlides(slides);
  }

  const handleSlideViewClick = (slide: Slide) => {
    setSelectedSlide(slide);
    setIsViewClicked(true);
  }

  const handleSlideEditClick = (slide: Slide) => {
    setSelectedSlide(slide);
    setIsEditClicked(true);
  }
  const handleSlideDeleteClick = (slide: Slide) => {
    setSelectedSlide(slide);
    setIsDeleteClicked(true);
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
            slidesCountData={slidesCountData}
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
            <button
              onClick={() => setSelectedSample(null)}
              className="cursor-pointer flex items-center justify-center gap-2 border border-[#101aca] h-10 w-44 text-sm text-[#101aca] rounded-xl hover:bg-[#0d16a8] hover:text-white transition">
              <RiArrowGoBackFill className="text-lg" />
              Go back
            </button>
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

        <div className="relative flex flex-row gap-2">
          <input
            type="text"
            placeholder="Search by Slide ID"
            value={search ?? ""}
            onChange={(e) => setSearch(e.target.value)}
            // onChange={(e) => setSearchTerm(e.target.value)}
            className="h-10 w-80 px-4 pl-10 rounded-xl bg-white border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#101aca]"
          />            <IoIosSearch className="absolute text-xl top-2.5 left-2 text-gray-400" />

          <div className="flex flex-wrap gap-4 mb-4 items-end">

            {/* Status */}
            <div>
              <select
                className="rounded-xl bg-white border border-gray-200 px-3 py-2 text-sm"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
              >
                <option value="ALL">All Status</option>
                {Object.values<SlideStatus>([
                  "CREATED", "QC_PENDING", "QC_IN_PROGRESS", "QC_PASSED",
                  "QC_FAILED", "IN_ANALYSIS", "REVIEWED", "APPROVED",
                  "REJECTED", "EXCEPTION", "ARCHIVED"
                ]).map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>

            {/* Created Method */}
            <div>
              <select
                className="rounded-xl bg-white border border-gray-200 px-3 py-2 text-sm"
                value={methodFilter}
                onChange={(e) => setMethodFilter(e.target.value as any)}
              >
                <option value="ALL">All Methods</option>
                <option value="SCAN">SCAN</option>
                <option value="MANUAL">MANUAL</option>
              </select>
            </div>

            {/* Blocked */}
            <div>
              <select
                className="rounded-xl bg-white border border-gray-200 px-3 py-2 text-sm bg-white"
                value={blockedFilter}
                onChange={(e) => setBlockedFilter(e.target.value as any)}
              >
                <option value="ALL">All Slides</option>
                <option value="YES">Yes</option>
                <option value="NO">No</option>
              </select>
            </div>

            {/* Slide Type */}
            <div>
              <select
                className="rounded-xl bg-white border border-gray-200 px-3 py-2 text-sm"
                value={slideTypeFilter}
                onChange={(e) => setSlideTypeFilter(e.target.value)}
              >
                <option value="ALL">All Types</option>
                {uniqueSlideTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

          </div>
        </div>


        <div className=" rounded-3xl overflow-x-auto bg-[#e2e2f6] px-4 py-4">
          <SelectedSampleSlidesTable
            sampleSlides={filteredSlides}
            onView={handleSlideViewClick}
            onEdit={handleSlideEditClick}
            onDelete={handleSlideDeleteClick}
          />
        </div>
      </>
    }

    {isAddNewClicked && (
      <AddNewSlideModal sampleId={"0"} setIsAddNewClicked={setIsAddNewClicked} onSave={() => (console.log("added"))} />
    )}

    {isViewClicked && selectedSlide && (
      <ViewSlideModal slide={selectedSlide} setIsViewClicked={setIsViewClicked} />
    )}

    {isEditClicked && selectedSlide && (
      <EditSlideModal slide={selectedSlide} setIsEditClicked={setIsEditClicked} onSave={() => (console.log("added"))} />
    )}

    {isDeleteClicked && selectedSlide && (
      <DeleteSlideModal slide={selectedSlide} setIsDeleteClicked={setIsDeleteClicked} onDelete={handleSlideDeleteClick} />
    )}




  </div>)
}
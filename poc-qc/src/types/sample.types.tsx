export type SampleStatusType =
  | "entered"
  | "received"
  | "rejected"
  | "in_process"
  | "scanned"
  | "scan_failed"
  | "aligned"
  | "not_aligned"
  | "under_review"
  | "approved";

export interface SampleTimelineEntry {
  status: SampleStatusType;
  timestamp: string;
  updatedBy?: string;
  remarks?: string;
}

export interface Sample {
  sampleId: string;
  patientId: string;
  patientName: string;
  collectedBy: string;
  patientDob: string;
  patientGender: "Male" | "Female" | "Other";
  sampleType: "Biopsy" | "Cytology" | "Blood" | "Tissue";
  samplePriority: "Routine" | "Urgent" | "STAT";
  sampleStatus: SampleStatusType;
  received: boolean;
  timeline: SampleTimelineEntry[];
}

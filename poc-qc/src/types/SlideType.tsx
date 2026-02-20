export type Slide = {
  slideId: string;              // unique (barcode value or system-generated)
  sampleId: string;             // FK → Sample (required)
  slideType: string;            // e.g. H&E, IHC, QC, etc.
  stainType: string | null;
  createdAt: Date;
  createdBy: string;            // user id
  createdMethod: "SCAN" | "MANUAL";
  status: SlideStatus;          // Created | InProgress | Completed | Exception
  isBlocked: boolean;           // for exception handling
    exceptionType: SlideExceptionType | null;
  exceptionReason: string | null;
  exceptionRecordedAt: Date | null;
  exceptionRecordedBy: string | null;
   timeline: SlideTimelineEntry[]; 
}

export interface SlideTimelineEntry {
  status: SlideStatus;
  timestamp: string;
  updatedBy?: string;
  remarks?: string;
}

export type SlideStatus =
  | "CREATED"          // Slide record created
  | "QC_PENDING"       // Waiting for QC review
  | "QC_IN_PROGRESS"   // QC being performed
  | "QC_PASSED"        // QC successful
  | "QC_FAILED"        // QC failed
  | "IN_ANALYSIS"      // Under pathologist review
  | "REVIEWED"         // Review completed
  | "APPROVED"         // Final approval
  | "REJECTED"         // Rejected after review
  | "EXCEPTION"        // Marked missing/damaged/unexpected
  | "ARCHIVED";        // Completed + locked

  export type SlideExceptionType =
  | "MISSING"
  | "DAMAGED"
  | "UNEXPECTED"
  | "SCAN_FAILED"
  | "NOT_ALIGNED";

  export type SlideEvent = {
  eventId: string;
  slideId: string;
  eventType:
    | "CREATED"
    | "STATUS_CHANGED"
    | "EXCEPTION_RECORDED"
    | "ASSIGNED"
    | "APPROVED";

  previousStatus?: SlideStatus;
  newStatus?: SlideStatus;

  performedBy: string;
  performedAt: Date;

  metadata?: Record<string, any>;
}


import type{ Sample } from "../types/sample.types";

export const dummySamples: Sample[] = [
  {
    sampleId: "SMP-2026-001",
    patientId: "PAT-1001",
    patientName: "Kunal kalbande",
    collectedBy: "Dr. Mehta",
    patientDob: "1985-04-12",
    patientGender: "Male",
    sampleType: "Biopsy",
    samplePriority: "Routine",
    sampleStatus: "aligned",
    received: true,
    timeline: [
      { status: "entered", timestamp: "2026-02-16T09:00:00Z" },
      { status: "received", timestamp: "2026-02-16T10:00:00Z" },
      { status: "in_process", timestamp: "2026-02-16T12:30:00Z" },
      { status: "scanned", timestamp: "2026-02-16T15:00:00Z" },
      { status: "aligned", timestamp: "2026-02-16T16:20:00Z" },
    ],
  },
];

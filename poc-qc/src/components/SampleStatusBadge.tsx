import React from "react";
import type{ SampleStatusType } from "../types/sample.types";

interface Props {
  status: SampleStatusType;
}

const statusColors: Record<SampleStatusType, string> = {
  entered: "bg-gray-200 text-gray-700",
  received: "bg-blue-100 text-blue-700",
  rejected: "bg-red-100 text-red-700",
  in_process: "bg-yellow-100 text-yellow-700",
  scanned: "bg-indigo-100 text-indigo-700",
  scan_failed: "bg-red-200 text-red-800",
  aligned: "bg-green-100 text-green-700",
  not_aligned: "bg-orange-100 text-orange-700",
  under_review: "bg-purple-100 text-purple-700",
  approved: "bg-emerald-100 text-emerald-700",
};

const SampleStatusBadge: React.FC<Props> = ({ status }) => {
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}
    >
      {status.replace("_", " ").toUpperCase()}
    </span>
  );
};

export default SampleStatusBadge;

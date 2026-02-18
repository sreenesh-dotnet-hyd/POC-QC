import React from "react";
import type{ SampleTimelineEntry } from "../types/sample.types";
import SampleStatusBadge from "./SampleStatusBadge";

interface Props {
  timeline: SampleTimelineEntry[];
}

const SampleTimeline: React.FC<Props> = ({ timeline }) => {
  return (
    <div className="space-y-4">
      {timeline.map((entry, index) => (
        <div key={index} className="flex items-start gap-4">
          <div className="w-2 h-2 mt-2 bg-gray-400 rounded-full" />
          <div>
            <SampleStatusBadge status={entry.status} />
            <p className="text-xs text-gray-500 mt-1">
              {new Date(entry.timestamp).toLocaleString()}
            </p>
            {entry.remarks && (
              <p className="text-sm text-gray-600 mt-1">{entry.remarks}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SampleTimeline;

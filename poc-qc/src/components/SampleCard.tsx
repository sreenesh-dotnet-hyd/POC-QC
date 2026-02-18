import React from "react";
import type{ Sample } from "../types/sample.types";
import SampleStatusBadge from "./SampleStatusBadge";
import SampleTimeline from "./SampleTimeline";

interface Props {
  sample: Sample;
}

const SampleCard: React.FC<Props> = ({ sample }) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 space-y-4 border">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">
          {sample.sampleId}
        </h3>
        <SampleStatusBadge status={sample.sampleStatus} />
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
        <div>
          <strong>Patient:</strong> {sample.patientName}
        </div>
        <div>
          <strong>Gender:</strong> {sample.patientGender}
        </div>
        <div>
          <strong>DOB:</strong> {sample.patientDob}
        </div>
        <div>
          <strong>Collected By:</strong> {sample.collectedBy}
        </div>
        <div>
          <strong>Type:</strong> {sample.sampleType}
        </div>
        <div>
          <strong>Priority:</strong> {sample.samplePriority}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-semibold text-gray-700 mb-2">Timeline</h4>
        <SampleTimeline timeline={sample.timeline} />
      </div>
    </div>
  );
};

export default SampleCard;

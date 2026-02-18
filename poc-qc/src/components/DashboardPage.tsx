import React from "react";
import SampleCard from "./SampleCard";
import { dummySamples } from "../data/dummysample";

const Dashboard: React.FC = () => {
  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      <div className="grid gap-6">
        {dummySamples.map((sample) => (
          <SampleCard key={sample.sampleId} sample={sample} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

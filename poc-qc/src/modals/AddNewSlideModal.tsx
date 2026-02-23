import { useState } from "react";
import { IoClose } from "react-icons/io5";
import type { Slide, SlideStatus } from "../types/SlideType";

interface Props {
  sampleId: string; // pass selected sampleId
  setIsAddNewClicked: (v: boolean) => void;
  onSave: (slide: Slide) => void;
}

export default function AddNewSlideModal({
  sampleId,
  setIsAddNewClicked,
  onSave,
}: Props) {

  const [formData, setFormData] = useState<Slide>({
    slideId: "",
    sampleId: sampleId,

    slideType: "",
    stainType: null,

    createdAt: new Date(),
    createdBy: "",
    createdMethod: "MANUAL",

    status: "CREATED",
    isBlocked: false,

    exceptionType: null,
    exceptionReason: null,
    exceptionRecordedAt: null,
    exceptionRecordedBy: null,

    timeline: [],
  });

  const handleChange = (field: keyof Slide, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    if (!formData.slideId || !formData.slideType || !formData.createdBy) {
      alert("Please fill required fields");
      return;
    }

    const newSlide: Slide = {
      ...formData,
      timeline: [
        {
          status: "CREATED",
          timestamp: new Date().toISOString(),
          updatedBy: formData.createdBy,
          remarks: "Slide created"
        }
      ]
    };

    onSave(newSlide);
    setIsAddNewClicked(false);
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-[600px] p-8 relative">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-[#101aca]">
            Add New Slide
          </h2>
          <button
            onClick={() => setIsAddNewClicked(false)}
            className="text-[#101aca] hover:text-gray-700"
          >
            <IoClose size={26} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">

          {/* Slide ID */}
          <InputField
            label="Slide ID *"
            value={formData.slideId}
            onChange={(v) => handleChange("slideId", v)}
          />

          {/* Created By */}
          <InputField
            label="Created By *"
            value={formData.createdBy}
            onChange={(v) => handleChange("createdBy", v)}
          />

          {/* Slide Type */}
          <InputField
            label="Slide Type *"
            value={formData.slideType}
            onChange={(v) => handleChange("slideType", v)}
          />

          {/* Stain Type */}
          <InputField
            label="Stain Type"
            value={formData.stainType ?? ""}
            onChange={(v) => handleChange("stainType", v || null)}
          />

          {/* Created Method */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-500">
              Creation Method
            </label>
            <select
              value={formData.createdMethod}
              onChange={(e) =>
                handleChange("createdMethod", e.target.value)
              }
              className="border border-gray-200 bg-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#101aca]"
            >
              <option value="MANUAL">Manual</option>
              <option value="SCAN">Scan</option>
            </select>
          </div>

          {/* Status (readonly at creation) */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-500">
              Initial Status
            </label>
            <input
              type="text"
              value="CREATED"
              disabled
              className="border bg-gray-100 rounded-lg px-4 py-2"
            />
          </div>

        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 mt-8">
          <button
            onClick={() => setIsAddNewClicked(false)}
            className="px-5 py-2 rounded-lg border hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-5 py-2 rounded-lg bg-[#101aca] text-white hover:bg-[#0d16a8]"
          >
            Save Slide
          </button>
        </div>

      </div>
    </div>
  );
}

/* Reusable Input */
function InputField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-gray-500">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border border-gray-200 bg-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#101aca]"
      />
    </div>
  );
}
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import type { Sample } from "../types/sample.types"

export default function AddNewSampleModal({
  setIsAddNewClicked,
  onSave,
}) {
  const [formData, setFormData] = useState<Sample>({
    sampleId: "",
    sampleType: "",
    samplePriority: "",
    collectedBy: "",
    patientId: "",
    patientName: "",
    patientDob: "",
    patientGender: "",
    received: false,
    sampleStatus: "entered",
    timeline: [],
  });


  const baseButton =
    "px-2 py-1 w-24 text-center text-sm rounded-lg cursor-pointer transition duration-200";

  const priorityStyles = {
    Urgent: "bg-red-100 text-red-700",
    STAT: "bg-orange-100 text-orange-700",
    Routine: "bg-green-100 text-green-700",
  };

  const typeStyles = "bg-blue-100 text-blue-700";
  const genderStyles = "bg-yellow-100 text-yellow-700";

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const handleSubmit = () => {
    if (!formData.sampleType || !formData.patientName) {
      alert("Please fill required fields");
      return;
    }

    const newSample: Sample = {
      ...formData,
      received: true,
      sampleStatus: "entered",
      timeline: [
        {
          status: "entered",
          timestamp: new Date().toISOString(),
        },
      ],
    };

    if (onSave) onSave(newSample);

    setIsAddNewClicked(false);
  };


  const getActiveClass = (field: string, value: string) =>
    formData[field] === value
      ? "ring-2 ring-[#101aca] scale-105"
      : "hover:scale-105";

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#f9f5f8] rounded-2xl shadow-xl w-[60%] p-8 relative">
        <div className="flex flex-row justify-between ">

          <h2 className="text-3xl font-semibold text-[#101aca] mb-6">
            Add New Sample
          </h2>
          <button
            onClick={() => setIsAddNewClicked(false)}
            className="text-[#101aca] cursor-pointer hover:text-gray-700 "
          >
            <IoClose className="text-3xl" />

          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* LEFT COLUMN */}
          <div className="flex flex-col gap-4">
            <InputField
              label="Sample ID"
              value={formData.sampleId}
              onChange={(v) => handleChange("sampleId", v)}
            />
            <InputField
              label="Collected By"

              value={formData.collectedBy}
              onChange={(v) => handleChange("collectedBy", v)}
            />

            <div className="" />
            {/* Sample Type */}
            <SelectorGroup
              label="Sample Type"
              options={["Stained", "Unstained", "Tissue"]}
              selected={formData.sampleType}
              onSelect={(v) => handleChange("sampleType", v)}
              baseButton={baseButton}
              style={typeStyles}
              getActiveClass={getActiveClass}
              field="sampleType"
            />

            {/* Priority */}
            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-500">
                Sample Priority
              </label>
              <div className="flex gap-2 mt-2">
                {Object.keys(priorityStyles).map((key) => (
                  <button
                    key={key}
                    onClick={() => handleChange("samplePriority", key)}

                    type="button"
                    className={`${baseButton} ${priorityStyles[key]
                      } ${getActiveClass("samplePriority", key)
                      }`}
                  >
                    {key}
                  </button>
                ))}
              </div>
            </div>


          </div>

          {/* RIGHT COLUMN */}
          <div className="flex flex-col gap-4">
            <InputField
              label="Patient Id"
              value={formData.patientId}
              onChange={(v) => handleChange("patientId", v)}
            />

            <InputField
              label="Patient Name"
              value={formData.patientName}
              onChange={(v) => handleChange("patientName", v)}
            />

            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-500">
                Patient DOB
              </label>
              <input
                type="date"
                value={formData.patientDob}
                onChange={(e) =>
                  handleChange("patientDob", e.target.value)
                }
                className="border border-gray-200 bg-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#101aca]"
              />
            </div>

            {/* Gender */}
            <SelectorGroup
              label="Patient Gender"
              options={["Male", "Female"]}
              selected={formData.patientGender}
              onSelect={(v) => handleChange("patientGender", v)}
              baseButton={baseButton}
              style={genderStyles}
              getActiveClass={getActiveClass}
              field="patientGender"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-8">
          <button
            onClick={() => setIsAddNewClicked(false)}
            className="cursor-pointer px-5 py-2 rounded-lg border border-gray-400 hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="cursor-pointer px-5 py-2 rounded-lg bg-[#101aca] text-white hover:bg-[#0d16a8] transition"
          >
            Save Sample
          </button>
        </div>
      </div>
    </div>
  );
}

/* Reusable Input */
function InputField({ label, value, onChange }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-gray-500">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border border-gray-200 bg-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#101aca]"
      />
    </div>
  );
}

/* Reusable Selector */
function SelectorGroup({
  label,
  options,
  selected,
  onSelect,
  baseButton,
  style,
  getActiveClass,
  field,
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-gray-500">{label}</label>
      <div className="flex gap-2 mt-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onSelect(option)}
            className={`${baseButton} ${style} ${getActiveClass(
              field,
              option
            )}`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

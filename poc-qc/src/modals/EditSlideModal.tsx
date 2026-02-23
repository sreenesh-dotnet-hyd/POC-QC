import { useState } from "react";
import { IoClose } from "react-icons/io5";
import type { Slide, SlideStatus, SlideExceptionType } from "../types/SlideType";

interface Props {
  slide: Slide;
  setIsEditClicked: (v: boolean) => void;
  onSave: (slide: Slide) => void;
}

export default function EditSlideModal({
  slide,
  setIsEditClicked,
  onSave,
}: Props) {

const [formData, setFormData] = useState<Slide>(() => ({
  ...slide,
  stainType: slide.stainType ?? "",
  exceptionType: slide.exceptionType ?? null,
  exceptionReason: slide.exceptionReason ?? "",
  isBlocked: slide.isBlocked ?? false,
}));
  const handleChange = (field: keyof Slide, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    let updatedSlide: Slide = { ...formData };

    if (formData.status !== slide.status) {
      updatedSlide.timeline = [
        ...slide.timeline,
        {
          status: formData.status,
          timestamp: new Date().toISOString(),
          updatedBy: formData.createdBy,
          remarks: "Status updated via edit"
        }
      ];
    }

    if (formData.status === "EXCEPTION") {
      updatedSlide.isBlocked = true;
      updatedSlide.exceptionRecordedAt = new Date();
    }

    onSave(updatedSlide);
    setIsEditClicked(false);
  };

  const slideStatuses: SlideStatus[] = [
    "CREATED",
    "QC_PENDING",
    "QC_IN_PROGRESS",
    "QC_PASSED",
    "QC_FAILED",
    "IN_ANALYSIS",
    "REVIEWED",
    "APPROVED",
    "REJECTED",
    "EXCEPTION",
    "ARCHIVED"
  ];

  const exceptionTypes: SlideExceptionType[] = [
    "MISSING",
    "DAMAGED",
    "UNEXPECTED",
    "SCAN_FAILED",
    "NOT_ALIGNED"
  ];

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-[720px] p-8">

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-[#101aca]">
            Edit Slide
          </h2>
          <button
            onClick={() => setIsEditClicked(false)}
            className="text-[#101aca] hover:text-gray-700"
          >
            <IoClose size={26} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-5">

          <InputField
            label="Slide ID"
            value={formData.slideId ?? ""}
            disabled
          />

          <InputField
            label="Sample ID"
            value={formData.sampleId ?? ""}
            disabled
          />

          <InputField
            label="Slide Type"
            value={formData.slideType ?? ""}
            onChange={(v) => handleChange("slideType", v)}
          />

          <InputField
            label="Stain Type"
            value={formData.stainType ?? ""}
            onChange={(v) => handleChange("stainType", v || null)}
          />

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-500">Creation Method</label>
            <select
              value={formData.createdMethod ?? ""}
              onChange={(e) =>
                handleChange("createdMethod", e.target.value)
              }
              className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#101aca]"
            >
              <option value="MANUAL">Manual</option>
              <option value="SCAN">Scan</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-500">Status</label>
            <select
              value={formData.status ?? ""}
              onChange={(e) =>
                handleChange("status", e.target.value as SlideStatus)
              }
              className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#101aca]"
            >
              {slideStatuses.map(status => (
                <option key={status} value={status}>
                  {status.replaceAll("_", " ")}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-3 mt-4">
            <input
              type="checkbox"
              checked={formData.isBlocked ?? false}
              onChange={(e) =>
                handleChange("isBlocked", e.target.checked)
              }
              className="w-4 h-4"
            />
            <label className="text-sm text-gray-600">
              Mark as Blocked
            </label>
          </div>

        </div>

        {formData.status === "EXCEPTION" && (
          <div className="mt-6 p-4 bg-rose-50 border border-rose-200 rounded-lg">
            <div className="grid grid-cols-2 gap-4">

              <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-600">
                  Exception Type
                </label>
                <select
                  value={formData.exceptionType ?? ""}
                  onChange={(e) =>
                    handleChange("exceptionType", e.target.value || null)
                  }
                  className="border rounded-lg px-3 py-2"
                >
                  <option value="">Select</option>
                  {exceptionTypes.map(type => (
                    <option key={type} value={type}>
                      {type.replaceAll("_", " ")}
                    </option>
                  ))}
                </select>
              </div>

              <InputField
                label="Exception Reason"
                value={formData.exceptionReason ?? ""}
                onChange={(v) =>
                  handleChange("exceptionReason", v || null)
                }
              />

            </div>
          </div>
        )}

        {/* FOOTER */}
        <div className="flex justify-end gap-3 mt-8">
          <button
            onClick={() => setIsEditClicked(false)}
            className="px-5 py-2 rounded-lg border hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-5 py-2 rounded-lg bg-[#101aca] text-white hover:bg-[#0d16a8]"
          >
            Update Slide
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
  disabled = false
}: {
  label: string;
  value: string;
  onChange?: (v: string) => void;
  disabled?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-gray-500">{label}</label>
      <input
        type="text"
        value={value}
        disabled={disabled}
        onChange={(e) => onChange && onChange(e.target.value)}
        className={`border rounded-lg px-4 py-2 ${
          disabled
            ? "bg-gray-100 text-gray-400"
            : "focus:ring-2 focus:ring-[#101aca]"
        }`}
      />
    </div>
  );
}
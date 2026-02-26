import { useState } from "react";
import { useScanner } from "../hooks/useScanner";
import { MdKeyboardArrowDown } from "react-icons/md";
 
import {
  ScanLine,
  Trash2,
  Plus,
  ChevronLeft,
  ChevronRight,
  Microscope,
} from "lucide-react";
 
/* ---------------- Section Constants ---------------- */
 
const AccessionSection = {
  BasicInfo: "BASIC_INFO",
  Samples: "SAMPLES",
  Slides: "SLIDES",
} as const;

export interface Slide {
  slide_id: string
  has40xScan?: boolean
}
 
export interface Sample {
  sample_id: string
  slides: Slide[]
}
 
export interface BasicInfo {
  requestingCustomer: string
  receivedOn: string
  orderId?: string
  notes?: string
} 
 
type AccessionSection =
  (typeof AccessionSection)[keyof typeof AccessionSection];
 
const generateId = (prefix: string) =>
  `${prefix}-${Math.floor(100000 + Math.random() * 900000)}`;
 
/* ---------------- Component ---------------- */
 
export default function NewAccessionModal({onClose}) {
  const [section, setSection] = useState<AccessionSection>(
    AccessionSection.BasicInfo,
  );
 
  const [basicInfo, setBasicInfo] = useState<BasicInfo>({
    requestingCustomer: "",
    receivedOn: "",
    orderId: "",
    notes: "",
  });
 
  const [samples, setSamples] = useState<Sample[]>([]);
  const [activeSample, setActiveSample] = useState<string | null>(null);
  const [slideInputs, setSlideInputs] = useState<Record<string, string>>({});
 
  /* ---------------- Scanner ---------------- */
 
  useScanner({
    enabled: section !== AccessionSection.BasicInfo,
    onScan: (value) => {
      if (section === AccessionSection.Samples) {
        handleAddSample(value);
      }
      if (section === AccessionSection.Slides && activeSample) {
        handleAddSlide(activeSample, value);
      }
    },
  });
 
  /* ---------------- Sample Logic ---------------- */
 
  const handleAddSample = (sampleId: string) => {
    if (!sampleId) return;
    // Prevent duplicate in UI
    if (samples.some((s) => s.sample_id === sampleId)) {
      console.warn("Sample already exists locally");
      return;
    }
 
    try {
      /* ---------------- API CALL ---------------- */
      /*
    const response = await fetch("http://localhost:3000/samples", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sample_id: sampleId }),
    });
 
    const data = await response.json();
 
    if (!response.ok) {
      throw new Error(data.error || "Failed to create sample");
    }
 
    // If backend returns error object like:
    // { error: "Sample already exists" }
    if (data.error) {
      throw new Error(data.error);
    }
    */
      /* ---------------- LOCAL STATE UPDATE ---------------- */
 
      const newSample: Sample = {
        sample_id: sampleId,
        slides: [],
      };
 
      setSamples((prev) => [...prev, newSample]);
      setActiveSample(sampleId);
    } catch (error: any) {
      console.error("Add Sample Error:", error.message);
      // future: show toast(error.message)
    }
  };
 
  const handleDeleteSample = async (sampleId: string) => {
    try {
      /* ---------------- API CALL ---------------- */
      /*
    const response = await fetch(
      `http://localhost:3000/samples/${sampleId}`,
      {
        method: "DELETE",
      }
    );
 
    if (!response.ok) {
      throw new Error("Failed to delete sample");
    }
    */
 
      /* ---------------- LOCAL STATE UPDATE ---------------- */
 
      setSamples((prev) => prev.filter((s) => s.sample_id !== sampleId));
 
      if (activeSample === sampleId) {
        setActiveSample(null);
      }
    } catch (error: any) {
      console.error("Delete Sample Error:", error.message);
    }
  };
 
  /* ---------------- Slide Logic ---------------- */
 
  const handleAddSlide = async (sampleId: string, slideId: string) => {
    if (!slideId) return;
 
    try {
      /* ---------------- API CALL ---------------- */
      /*
    const response = await fetch(
      `http://localhost:3000/samples/${sampleId}/slides`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ slide_id: slideId }),
      }
    );
 
    const data = await response.json();
 
    if (!response.ok) {
      throw new Error(data.error || "Failed to create slide");
    }
    */
 
      /* ---------------- LOCAL STATE UPDATE ---------------- */
 
      setSamples((prev) =>
        prev.map((sample) =>
          sample.sample_id === sampleId
            ? {
                ...sample,
                slides: sample.slides.some((s) => s.slide_id === slideId)
                  ? sample.slides
                  : [...sample.slides, { slide_id: slideId }],
              }
            : sample,
        ),
      );
    } catch (error: any) {
      console.error("Add Slide Error:", error.message);
    }
  };
 
  const handleDeleteSlide = async (sampleId: string, slideId: string) => {
    try {
      /* ---------------- API CALL ---------------- */
      /*
    const response = await fetch(
      `http://localhost:3000/samples/${sampleId}/slides/${slideId}`,
      {
        method: "DELETE",
      }
    );
 
    if (!response.ok) {
      throw new Error("Failed to delete slide");
    }
    */
 
      /* ---------------- LOCAL STATE UPDATE ---------------- */
 
      setSamples((prev) =>
        prev.map((sample) =>
          sample.sample_id === sampleId
            ? {
                ...sample,
                slides: sample.slides.filter((s) => s.slide_id !== slideId),
              }
            : sample,
        ),
      );
    } catch (error: any) {
      console.error("Delete Slide Error:", error.message);
    }
  };
 
  /* ---------------- Validation ---------------- */
 
  const isDetailsValid =
    basicInfo.requestingCustomer && basicInfo.receivedOn && basicInfo.orderId;
 
  /* ---------------- UI ---------------- */
 
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-[900px] h-[90vh] bg-white rounded-2xl shadow-2xl p-10 overflow-y-auto">
        {/* Title */}
        <h2 className="text-4xl font-bold text-center mb-8">New Accession</h2>
 
        {/* Stepper */}
        <div className="flex items-center justify-center mb-10">
          <div className="flex items-center gap-3 w-full max-w-xl">
            <div className="mb-8 flex flex-row items-center justify-center w-full">
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span className="px-3 py-1 bg-gray-200 rounded-lg w-32">
                  {section}
                </span>
              </div>
 
              <div className="flex w-full items-center justify-between">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex-1 flex items-center">
                    <div className="w-4 h-4 rounded-full border-2 border-gray-400 bg-gray-200" />
                    {i !== 2 && (
                      <div className="flex-1 h-0.5 border-2 border-gray-400 bg-gray-200" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
 
        {/* Body Container */}
        <div className="bg-white rounded-xl p-10 min-h-[350px]">
          {/* Basic Info */}
          {section === AccessionSection.BasicInfo && (
            <div className="max-w-lg mx-auto">
              <div className="bg-gray-100 rounded-xl p-8 space-y-6">
                {/* Requesting Customer */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Requesting Customer
                  </label>
                  <select
                    className="w-full border bg-white rounded-md px-3 py-2 text-sm"
                    value={basicInfo.requestingCustomer}
                    onChange={(e) =>
                      setBasicInfo({
                        ...basicInfo,
                        requestingCustomer: e.target.value,
                      })
                    }
                  >
                    <option value="">Search or select</option>
                    <option value="Customer A">Customer A</option>
                    <option value="Customer B">Customer B</option>
                  </select>
                </div>
 
                {/* Received On */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Received On
                  </label>
                  <input
                    type="datetime-local"
                    className="w-full border bg-white rounded-md px-3 py-2 text-sm"
                    value={basicInfo.receivedOn}
                    onChange={(e) =>
                      setBasicInfo({
                        ...basicInfo,
                        receivedOn: e.target.value,
                      })
                    }
                  />
                </div>
 
                {/* Order ID */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Order ID
                  </label>
                  <input
                    type="text"
                    className="w-full border bg-white rounded-md px-3 py-2 text-sm"
                    placeholder="Enter Order ID"
                    value={basicInfo.orderId}
                    onChange={(e) =>
                      setBasicInfo({
                        ...basicInfo,
                        orderId: e.target.value,
                      })
                    }
                  />
                </div>
 
                {/* Notes */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Notes
                  </label>
                  <select
                    className="w-full border bg-white rounded-md px-3 py-2 text-sm"
                    value={basicInfo.notes}
                    onChange={(e) =>
                      setBasicInfo({
                        ...basicInfo,
                        notes: e.target.value,
                      })
                    }
                  >
                    <option value="">Choose (optional)</option>
                    <option value="Urgent">Urgent</option>
                    <option value="Routine">Routine</option>
                  </select>
                </div>
              </div>
            </div>
          )}
          {/* Sample Section */}
          {section === AccessionSection.Samples && (
            <div className="text-center space-y-6 bg-gray-100 ">
              <div className="border bg-white rounded-lg p-6 inline-block mt-10">
                <div className="flex items-center gap-3 text-lg">
                  <div
                    //changes
                    className="flex flex-row gap-2 items-center justify-center w-full"
                    onClick={() => handleAddSample(generateId("SAMPLE"))}
                  >
                    <ScanLine /> <span> Scan a slide barcode </span>
                  </div>
                </div>
              </div>
 
              <div className="text-gray-500">— or —</div>
 
              <button
                className="border px-4 py-2 rounded bg-white mb-10"
                onClick={() => handleAddSample(generateId("SAMPLE"))}
              >
                <Plus size={16} className="inline mr-2 " />
                New Sample
              </button>
 
              {/* Existing Samples */}
              {samples.length > 0 && (
                <div className="mt-6 space-y-2">
                  {samples.map((sample) => (
                    <div
                      key={sample.sample_id}
                      className="flex justify-between bg-white border rounded px-4 py-2"
                    >
                      {sample.sample_id}
                      <Trash2
                        size={16}
                        className="text-red-500 cursor-pointer"
                        onClick={() => handleDeleteSample(sample.sample_id)}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
 
          {/* Slide Section */}
          {section === AccessionSection.Slides &&
            samples.map((sample) => (
              <div key={sample.sample_id} className="space-y-6 mb-8 bg-gray-200 px-4 py-2">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">{sample.sample_id}</h3>
                  <Trash2
                    size={18}
                    className="text-red-500 cursor-pointer"
                    onClick={() => handleDeleteSample(sample.sample_id)}
                  />
                </div>
                <div className="w-30">
                  <span className="flex flex-row items-center gap-3">
                    <MdKeyboardArrowDown className="text-2xl"/>
                    <span className="text-xl font-semibold">Slides (1)</span>
                  </span>
                </div>
 
                <div className="bg-white rounded-lg p-6 space-y-4">
                  {sample.slides.map((slide) => (
                    <div
                      key={slide.slide_id}
                      className="flex justify-between items-center border rounded px-4 py-2"
                    >
                      {slide.slide_id}
 
                      <div className="flex gap-4 items-center">
                        <button
                          className="text-sm border px-3 py-1 rounded bg-gray-100"
                          onClick={() => {
                            console.log("Add 40x Scan clicked", slide.slide_id);
                            // future: open upload modal
                          }}
                        >
                          Add 40x Scan
                        </button>
 
                        <button className="text-sm border px-3 py-1 rounded bg-gray-100">
                          Add Annotations
                        </button>
 
                        <Trash2
                          size={16}
                          className="text-red-500 cursor-pointer"
                          onClick={() =>
                            handleDeleteSlide(sample.sample_id, slide.slide_id)
                          }
                        />
                      </div>
                    </div>
                  ))}
 
                  {/* Scan Slide UI */}
                  <div className="text-center space-y-4 mt-6">
                    <div className="border bg-gray-50 rounded-lg p-4 inline-block">
                      <div className="flex items-center gap-3">
                        <div
                          //changes
                          className="flex flex-row w-full"
                          onClick={() =>
                            handleAddSlide(sample.sample_id, generateId("SLD"))
                          }
                        >
                          <ScanLine /> <span> Scan a slide barcode </span>
                        </div>
                      </div>
                    </div>
 
                    <div className="text-gray-500">— or —</div>
                    <div className="flex items-center gap-3 justify-center">
                      <input
                        type="text"
                        placeholder="Enter Slide No"
                        value={slideInputs[sample.sample_id] || ""}
                        onChange={(e) =>
                          setSlideInputs((prev) => ({
                            ...prev,
                            [sample.sample_id]: e.target.value,
                          }))
                        }
                        className="border rounded-md px-3 py-2 text-sm w-48"
                      />
 
                      <button
                        className="border px-4 py-2 rounded bg-white flex items-center gap-2"
                        onClick={() => {
                          const slideNo = slideInputs[sample.sample_id]?.trim();
 
                          if (!slideNo) return;
 
                          handleAddSlide(sample.sample_id, slideNo);
 
                          setSlideInputs((prev) => ({
                            ...prev,
                            [sample.sample_id]: "",
                          }));
                        }}
                      >
                        <Plus size={16} />
                        New Slide
                      </button>
                    </div>
                  </div>
                </div>
 
                {/* Add Sample Button */}
                <div className="text-center">
                  <button
                    className="bg-black text-white px-6 py-2 rounded"
                    onClick={() => handleAddSample(generateId("SAMPLE"))}
                  >
                    Add Sample
                  </button>
                </div>
              </div>
            ))}
        </div>
 
        {/* Footer */}
        <div className="flex justify-center">
          {section === AccessionSection.BasicInfo ? (
            <div className="flex flex-row gap-10">
              <button
                className="text-sm text-gray-600 px-20"
                onClick={() => onClose()}
              >
                Cancel
              </button>
 
              <button
                disabled={!isDetailsValid}
                onClick={() => setSection(AccessionSection.Samples)}
                className="bg-black text-white px-30 py-2 rounded-md disabled:bg-gray-300"
              >
                Next
              </button>
            </div>
          ) : (
            <>
              <button
                onClick={() =>
                  setSection(
                    section === AccessionSection.Slides
                      ? AccessionSection.Samples
                      : AccessionSection.BasicInfo,
                  )
                }
                className="flex items-center gap-2 px-40 text-sm"
              >
                Back
              </button>
 
        
                <button
                  disabled={samples.length === 0}
                  onClick={() => setSection(AccessionSection.Slides)}
                  className="bg-black text-white px-40 py-2 rounded-md disabled:bg-gray-300"
                >
                  Next
                </button>
            
            </>
          )}
        </div>
      </div>
    </div>
  );
}
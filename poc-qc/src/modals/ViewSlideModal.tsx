import { IoClose } from "react-icons/io5";
import type { Slide, SlideStatus } from "../types/SlideType";

interface Props {
  slide: Slide;
  setIsViewClicked: (value: boolean) => void;
}

export default function ViewSlideModal({
  slide,
  setIsViewClicked,
}: Props) {

  const statusColors: Record<SlideStatus, string> = {
    CREATED: "text-gray-500",
    QC_PENDING: "text-yellow-500",
    QC_IN_PROGRESS: "text-orange-500",
    QC_PASSED: "text-green-500",
    QC_FAILED: "text-red-500",
    IN_ANALYSIS: "text-blue-500",
    REVIEWED: "text-indigo-500",
    APPROVED: "text-green-600",
    REJECTED: "text-red-600",
    EXCEPTION: "text-rose-600",
    ARCHIVED: "text-gray-400",
  };

  const sortedTimeline = [...slide.timeline].sort(
    (a, b) =>
      new Date(a.timestamp).getTime() -
      new Date(b.timestamp).getTime()
  );

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={() => setIsViewClicked(false)}
    >
      <div
        className="bg-white border border-gray-200 rounded-2xl w-[720px] max-w-[95vw] max-h-[90vh] overflow-y-auto shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >

        {/* HEADER */}
        <div className="px-7 py-6 border-b border-gray-200">
          <div className="flex justify-between items-start mb-4">

            <div>
              <div className="text-sm font-mono text-gray-400">
                SAMPLE ID: {slide.sampleId}
              </div>
              <div className="text-3xl font-bold text-[#101aca]">
                {slide.slideId}
              </div>
              <div className="text-sm text-gray-500 mt-1">
                {slide.slideType} {slide.stainType ? `· ${slide.stainType}` : ""}
              </div>
            </div>

            <button
              onClick={() => setIsViewClicked(false)}
              className="text-[#101aca] hover:text-gray-700 cursor-pointer text-3xl"
            >
              <IoClose />
            </button>
          </div>

          {/* META INFO */}
          <div className="flex flex-wrap gap-6 mt-4">
            <MetaItem label="Created By" value={slide.createdBy} />
            <MetaItem
              label="Created At"
              value={new Date(slide.createdAt).toLocaleString()}
            />
            <MetaItem label="Method" value={slide.createdMethod} />
            <MetaItem
              label="Current Status"
              value={slide.status.replaceAll("_", " ")}
            />
            <MetaItem
              label="Blocked"
              value={slide.isBlocked ? "Yes" : "No"}
            />
          </div>

          {/* Exception Info */}
          {slide.exceptionType && (
            <div className="mt-4 p-3 bg-rose-50 border border-rose-200 rounded-lg">
              <div className="text-sm font-semibold text-rose-600">
                Exception: {slide.exceptionType}
              </div>
              {slide.exceptionReason && (
                <div className="text-xs text-gray-600 mt-1">
                  Reason: {slide.exceptionReason}
                </div>
              )}
              {slide.exceptionRecordedBy && (
                <div className="text-xs text-gray-500 mt-1">
                  Recorded by: {slide.exceptionRecordedBy}
                </div>
              )}
            </div>
          )}
        </div>

        {/* TIMELINE */}
        <div className="px-7 py-6">
          <div className="font-semibold text-sm mb-4">
            Processing Timeline
          </div>

          <div className="flex flex-col">
            {sortedTimeline.map((item, i) => {
              const isActive = item.status === slide.status;
              const statusColor = statusColors[item.status];

              return (
                <div key={i} className="flex gap-3 relative">

                  {i !== sortedTimeline.length - 1 && (
                    <div className="absolute left-[11px] top-6 bottom-0 w-px bg-gray-200" />
                  )}

                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-[10px] mt-1 flex-shrink-0 ${
                      isActive
                        ? "border-[#101aca] bg-[#101aca]/10"
                        : "border-gray-300 bg-gray-100"
                    }`}
                  />

                  <div className="pb-6 flex-1">
                    <div
                      className={`text-sm font-medium ${
                        isActive ? statusColor : "text-gray-400"
                      }`}
                    >
                      {item.status.replaceAll("_", " ")}
                    </div>

                    <div className="text-xs text-gray-400 font-mono">
                      {new Date(item.timestamp).toLocaleString()}
                    </div>

                    {item.updatedBy && (
                      <div className="text-xs text-gray-500">
                        Updated by: {item.updatedBy}
                      </div>
                    )}

                    {item.remarks && (
                      <div className="text-xs italic text-gray-600 mt-1">
                        "{item.remarks}"
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* FOOTER */}
        <div className="px-7 py-4 border-t border-gray-200 flex justify-end gap-3">
          {/* <button
            onClick={() => setIsViewClicked(false)}
            className="px-4 py-2 rounded-lg border text-sm hover:bg-gray-100"
          >
            Close
          </button> */}

          <button
          onClick={() => setIsViewClicked(false)}
            className="px-4 py-2 rounded-lg bg-[#101aca] cursor-pointer text-white text-sm hover:bg-[#0d16a8]"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}

function MetaItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <div className="text-[10px] uppercase tracking-wider text-gray-400 font-mono">
        {label}
      </div>
      <div className="text-sm font-medium">{value}</div>
    </div>
  );
}
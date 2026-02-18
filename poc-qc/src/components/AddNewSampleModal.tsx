import { IoClose } from "react-icons/io5";

export default function AddNewSampleModal({ setIsAddNewClicked }) {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">

      <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl p-8 relative">

        <button
          onClick={() => setIsAddNewClicked(false)}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-700 text-xl"
        >
          <IoClose />
        </button>

        <h2 className="text-3xl font-semibold text-[#101aca] mb-6">
          Add new sample
        </h2>

        <div className="flex flex-col gap-4">

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-500">Sample Number</label>
            <input
              type="text"
              placeholder="Enter sample number"
              className="border border-gray-400 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#101aca]"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-500">Patient Name</label>
            <input
              type="text"
              placeholder="Enter patient name"
              className="border border-gray-400 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#101aca]"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-500">Collected By</label>
            <input
              type="text"
              placeholder="Enter collected by"
              className="border border-gray-400 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#101aca]"
            />
          </div>

        </div>

        <div className="flex justify-end gap-3 mt-8">

          <button
            onClick={() => setIsAddNewClicked(false)}
            className="px-5 py-2 rounded-lg border border-gray-400 hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button 
           onClick={() => setIsAddNewClicked(false)}
            
          className="px-5 py-2 rounded-lg bg-[#101aca] text-white hover:bg-[#0d16a8] transition">
            Save Sample
          </button>

        </div>

      </div>
    </div>
  );
}

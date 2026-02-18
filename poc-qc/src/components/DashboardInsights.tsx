export default function DashboardInsights() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-2">

      <div className="relative rounded-xl bg-[#f9f5f8] border-t-4 border-cyan-500 p-5 shadow-sm hover:shadow-md transition">



        <div className="text-xs uppercase tracking-wider font-bold gothic-regular text-black mb-2">
          Total Samples
        </div>

        <div className="text-3xl font-bold text-cyan-600 leading-none mb-1">
          3
        </div>

        <div className="text-sm text-gray-400">
          All active records
        </div>
      </div>


      <div className="relative rounded-xl bg-[#f9f5f8] border-t-4 border-amber-500 p-5 shadow-sm hover:shadow-md transition">
        <div className="absolute top-0 left-0 right-0 h-1 rounded-t-xl" />

        <div className="text-xs uppercase tracking-wider font-bold gothic-regular text-black mb-2">
          In Processing
        </div>

        <div className="text-3xl font-bold text-amber-600 leading-none mb-1">
          4
        </div>

        <div className="text-sm text-gray-400">
          Currently being analyzed
        </div>
      </div>



      <div className="relative rounded-xl  bg-[#f9f5f8] border-t-4 border-green-500 p-5 shadow-sm hover:shadow-md transition">

        <div className="text-xs uppercase tracking-wider font-bold gothic-regular text-black mb-2">
          Completed
        </div>

        <div className="text-3xl font-bold text-green-600 leading-none mb-1">
          5
        </div>

        <div className="text-sm text-gray-400">
          Results released
        </div>
      </div>


      <div className="relative rounded-xl bg-[#f9f5f8] border-t-4 border-red-500 p-5 shadow-sm hover:shadow-md transition">

        <div className="text-xs uppercase tracking-wider gothic-regular font-bold text-black mb-2">
          Flagged
        </div>

        <div className="text-3xl font-bold text-red-600 leading-none mb-1">
          6
        </div>

        <div className="text-sm text-gray-400">
          Requires attention
        </div>
      </div>

    </div>
  )
}

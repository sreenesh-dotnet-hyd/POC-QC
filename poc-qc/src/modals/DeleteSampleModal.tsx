import type { Sample } from "../types/sample.types";
export default function DeleteSampleModal({sample,  onDelete, setIsDeleteClicked}:{sample:Sample, onDelete:(sample:Sample)=>void, setIsDeleteClicked: (flag:boolean)=>void}){

    const handleDelete = ()=>{
         onDelete(sample);
         setIsDeleteClicked(false);
         
    }
    return(<div className="bg-black/40 backdrop-blur-sm fixed inset-0 h-full w-full flex items-center justify-center">
        <div className="bg-[#f9f5f8] border border-gray-200 rounded-2xl flex flex-col p-8 w-[60%] shadow-xl animate-[fadeIn_0.2s_ease]">
            <h2 className="text-3xl font-semibold text-[#101aca] mb-6">
            Delete Sample
          </h2>
            <span>Are you sure to delete Sample <span>{sample.sampleId}</span> ?</span>
             <div className="px-7 py-4 border-t border-gray-200 flex justify-end gap-3">
                    <button
                        onClick={() => setIsDeleteClicked(false)}
                        className="cursor-pointer px-4 py-2 rounded-lg border border-gray-300 text-sm hover:bg-gray-100"
                    >
                        Close
                    </button>

                    <button
                        onClick={()=> handleDelete()}
                        className="cursor-pointer px-4 py-2 rounded-lg bg-[#ca1010] text-white text-sm hover:bg-[#a80d0d]"
                    >
                        Delete
                    </button>
                </div>
        </div>
    </div>)
}
import React from "react";
import { LiaBarcodeSolid } from "react-icons/lia";

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

const NewAccessionModal: React.FC<Props> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-white w-full max-w-2xl rounded-xl shadow-2xl p-8 animate-fadeIn">
                {/* Title */}
                <h2 className="text-2xl font-semibold text-center mb-6">
                    New Accession
                </h2>

                {/* Progress Line */}
                <div className="flex items-center justify-center mb-8">
                    <span className="text-sm text-gray-600 mr-4">Samples</span>
                    <div className="flex-1 h-px bg-gray-300 relative">
                        <div className="absolute left-1/3 top-1/2 -translate-y-1/2 w-3 h-3 bg-gray-400 rounded-full"></div>
                        <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-3 h-3 bg-gray-300 rounded-full"></div>
                    </div>
                </div>

                {/* Content Box */}
                <div className="bg-gray-100 rounded-lg p-8 text-center mb-8">
                    {/* Scan Barcode */}
                    <button className="flex items-center justify-center gap-3 border border-gray-300 bg-white rounded-lg px-6 py-3 mx-auto hover:bg-gray-50 transition">
                        <LiaBarcodeSolid className="text-xl" />
                        <span className="font-medium text-gray-700">
                            Scan a sample barcode
                        </span>
                    </button>

                    {/* Divider */}
                    <div className="flex items-center my-6">
                        <div className="flex-1 h-px bg-gray-300"></div>
                        <span className="px-3 text-gray-400 text-sm">or</span>
                        <div className="flex-1 h-px bg-gray-300"></div>
                    </div>

                    {/* New Sample */}
                    <button className="border border-gray-300 bg-white rounded-md px-5 py-2 text-sm hover:bg-gray-50 transition">
                        + New Sample
                    </button>
                </div>

                {/* Footer Buttons */}
                <div className="flex  items-center justify-center">
                    <div className="flex flex-row gap-1">
                        <button
                            onClick={onClose}
                            className="text-sm text-gray-500 hover:text-gray-700 px-30"
                        >
                            Back
                        </button>

                        <button
                            disabled
                            className="bg-gray-300 text-gray-500 px-30 py-2 rounded-md cursor-not-allowed"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewAccessionModal;

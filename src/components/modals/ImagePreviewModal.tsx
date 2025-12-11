
import React from 'react';
import { X } from 'lucide-react';
import Image from 'next/image';

interface ImagePreviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    imageUrl: string;
    caption: string;
    altText: string;
}

const ImagePreviewModal: React.FC<ImagePreviewModalProps> = ({
    isOpen,
    onClose,
    imageUrl,
    caption,
    altText
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-bounce-in">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative z-10 w-full max-w-3xl max-h-[90vh] flex flex-col items-center">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute -top-10 right-0 p-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                    aria-label="Close image preview"
                >
                    <X className="w-6 h-6" />
                </button>

                {/* Image Container */}
                <div className="relative w-full h-auto max-h-[calc(90vh-80px)] rounded-lg overflow-hidden shadow-2xl">
                    <Image
                        src={imageUrl}
                        alt={altText}
                        width={1200}
                        height={900}
                        className="w-full h-full object-contain"
                        sizes="90vw"
                    />
                </div>

                {/* Caption */}
                {caption && (
                    <div className="mt-4 text-center text-white text-base bg-black/50 px-4 py-2 rounded-lg">
                        {caption}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImagePreviewModal;

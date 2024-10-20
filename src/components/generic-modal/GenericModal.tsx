import { useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { GenericModalProps } from "./GenericModal.types.ts";

const GenericModal: React.FC<GenericModalProps> = ({ open, onClose, title, children }) => {
    if (!open) return null;

    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    const handleClickOutside = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50"
            onClick={handleClickOutside}
        >
            <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-3xl">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">{title}</h2>
                    <button
                        className="text-gray-500 hover:text-gray-700"
                        onClick={onClose}
                        aria-label="Close Modal"
                    >
                        <AiOutlineClose />
                    </button>
                </div>
                <div className="modal-content">{children}</div>
            </div>
        </div>
    );
};

export default GenericModal;

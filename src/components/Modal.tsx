import React from 'react'; 
import { createPortal } from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center overflow-y-auto p-4">
      <div
        className="bg-blue-900 text-white rounded-xl shadow-2xl w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg p-4 relative animate-modal-zoom max-h-screen"
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-200 hover:text-red-400 text-2xl font-bold"
          aria-label="Cerrar modal"
        >
          &times;
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="relative w-full max-w-md mx-4 bg-gradient-to-b from-[#10152f] to-[#0a0c14] text-white rounded-2xl shadow-xl animate-modal-zoom">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-300 hover:text-red-400 text-xl font-bold z-10"
          aria-label="Cerrar modal"
        >
          &times;
        </button>
        <div className="max-h-[90vh] overflow-y-auto px-4 py-6">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;

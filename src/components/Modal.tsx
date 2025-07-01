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
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
      <div
        className="
          bg-blue-900 text-white rounded-xl shadow-2xl animate-modal-zoom
          w-full max-w-fit min-w-[280px]
          p-4 sm:p-5 relative
        "
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-300 hover:text-red-400 text-xl font-bold"
          aria-label="Cerrar modal"
        >
          &times;
        </button>

        <div className="space-y-4">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;

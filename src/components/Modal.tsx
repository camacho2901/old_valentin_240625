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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300">
      <div
        className="bg-blue-900 text-white rounded-xl shadow-2xl max-w-sm w-[45%] md:w-[30%] lg:w-[20%] p-6 relative animate-modal-zoom"
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-200 hover:text-red-400 text-2xl font-bold"
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

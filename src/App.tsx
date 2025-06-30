import React, { useState } from 'react';
import { CartItem } from './types.ts';
import PdfSlider from './components/PdfSlider.tsx';
import Modal from './components/Modal.tsx';
import ProductSelectionStep from './components/ProductSelectionStep.tsx';
import PaymentStep from './components/PaymentStep.tsx';
import { CATALOG_PAGES } from './constants.ts';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setStep(1);
      setCartItems([]);
    }, 300);
  };

  const handleConfirmOrder = () => {
    if (cartItems.length > 0) {
      setStep(2);
    } else {
      alert('El carrito está vacío. Agregue productos para continuar.');
    }
  };

  const handleGoBack = () => {
    setStep(1);
  };

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 z-10">
      <div className="w-full max-w-4xl h-[70vh] flex items-center justify-center">
        <PdfSlider pages={CATALOG_PAGES} />
      </div>

      <div className="mt-8">
        <button
          onClick={openModal}
          className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-10 rounded-lg shadow-lg transition-colors text-lg"
        >
          COMPRAR AHORA
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="scale-90"> {/* Reducido un 10-20% */}
          {step === 1 ? (
            <ProductSelectionStep
              cartItems={cartItems}
              setCartItems={setCartItems}
              onConfirm={handleConfirmOrder}
            />
          ) : (
            <PaymentStep cartItems={cartItems} onBack={handleGoBack} />
          )}
        </div>
      </Modal>
    </div>
  );
};

export default App;

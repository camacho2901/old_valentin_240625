import React, { useState } from 'react';
import { CartItem } from '../types.ts';
import { WHATSAPP_NUMBER, QR_CODE_IMAGE_URL } from '../constants.ts';

interface PaymentStepProps {
  cartItems: CartItem[];
  onBack: () => void;
}

const PaymentStep: React.FC<PaymentStepProps> = ({ cartItems, onBack }) => {
  const [locationStatus, setLocationStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleDownloadQR = () => {
    const link = document.createElement('a');
    link.href = QR_CODE_IMAGE_URL;
    link.download = 'OLD_VALENTIN_QR.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFinalizeOrder = () => {
    setLocationStatus('loading');
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocationStatus('success');
          openWhatsApp({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        () => {
          setLocationStatus('error');
          alert('No se pudo obtener la ubicación. Puede continuar sin ella.');
          openWhatsApp(null);
        },
        { timeout: 10000 }
      );
    } else {
      alert('Geolocalización no compatible con este navegador.');
      openWhatsApp(null);
    }
  };

  const openWhatsApp = (loc: { latitude: number, longitude: number } | null) => {
    const total = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    let msg = `*¡Hola! Quiero realizar el siguiente pedido de "OLD VALENTIN":*\n\n`;
    cartItems.forEach(item => {
      msg += `- ${item.quantity}x ${item.product.name} (Bs. ${(item.product.price * item.quantity).toFixed(2)})\n`;
    });
    msg += `\n*TOTAL: Bs. ${total.toFixed(2)}*\n\nHe realizado el pago mediante QR.\n\n`;
    msg += loc
      ? `*Mi ubicación para el envío:*\nhttps://www.google.com/maps?q=${loc.latitude},${loc.longitude}`
      : '*No pude compartir mi ubicación automáticamente.*';

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="flex flex-col items-center text-center space-y-6 px-4">
      <h2 className="text-yellow-400 text-xl font-bold">Método de Pago</h2>

      <div className="bg-white rounded-lg p-2">
        <img src={QR_CODE_IMAGE_URL} alt="QR de pago" className="w-48 h-48 rounded-md" />
      </div>

      <button
        onClick={handleDownloadQR}
        className="w-full max-w-xs bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
      >
        Descargar QR
      </button>

      <p className="text-sm text-gray-400 leading-relaxed max-w-md">
        Una vez realizada la compra, todos los datos proporcionados, incluida su ubicación si está disponible,
        serán utilizados únicamente para la entrega del pedido.
      </p>

      <div className="flex flex-col sm:flex-row w-full gap-4 pt-4 border-t border-gray-600">
        <button
          onClick={onBack}
          className="flex-1 border border-gray-400 text-white py-3 rounded-lg hover:bg-gray-700 transition-colors"
        >
          Volver
        </button>
        <button
          onClick={handleFinalizeOrder}
          disabled={locationStatus === 'loading'}
          className={`flex-1 py-3 rounded-lg font-bold transition-colors
            ${locationStatus === 'loading' ? 'bg-green-800 cursor-wait text-white' : 'bg-green-600 hover:bg-green-700 text-white'}`}
        >
          {locationStatus === 'loading' ? 'Obteniendo ubicación...' : 'Finalizar'}
        </button>
      </div>
    </div>
  );
};

export default PaymentStep;

import React, { useState } from 'react';
import { CartItem } from '../types.ts';
import { WHATSAPP_NUMBER, QR_CODE_IMAGE_URL } from '../constants.ts';

interface PaymentStepProps {
  cartItems: CartItem[];
  onBack: () => void;
}

const PaymentStep: React.FC<PaymentStepProps> = ({ cartItems, onBack }) => {
  const [locationStatus, setLocationStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [location, setLocation] = useState<{ latitude: number, longitude: number } | null>(null);

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
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setLocationStatus('success');
          openWhatsApp({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        () => {
          setLocationStatus('error');
          alert('No se pudo obtener la ubicación. Por favor, habilite los permisos de ubicación en su navegador. Aún puede finalizar el pedido sin la ubicación.');
          openWhatsApp(null); // Proceed without location
        },
        { timeout: 10000 }
      );
    } else {
      setLocationStatus('error');
      alert('La geolocalización no es compatible con este navegador. Aún puede finalizar el pedido sin la ubicación.');
      openWhatsApp(null); // Proceed without location
    }
  };
  
  const openWhatsApp = (loc: { latitude: number, longitude: number } | null) => {
    const total = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    let message = `*¡Hola! Quiero realizar el siguiente pedido de "OLD VALENTIN":*\n\n`;
    
    cartItems.forEach(item => {
        message += `*- ${item.quantity}x ${item.product.name}* (Bs. ${(item.product.price * item.quantity).toFixed(2)})\n`;
    });
    
    message += `\n*TOTAL: Bs. ${total.toFixed(2)}*\n\n`;
    message += `He realizado el pago mediante QR.\n\n`;

    if (loc) {
        message += `*Mi ubicación para el envío es:*\n`;
        message += `https://www.google.com/maps?q=${loc.latitude},${loc.longitude}`;
    } else {
        message += `*No pude compartir mi ubicación automáticamente.* Por favor, póngase en contacto conmigo para coordinar la entrega.`
    }

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="flex flex-col space-y-6 text-center">
      <h2 className="text-yellow-400 text-2xl font-bold">Método de Pago</h2>

      <div className="flex flex-col items-center space-y-4">
        <div className="p-2 bg-white rounded-lg">
            <img src={QR_CODE_IMAGE_URL} alt="Payment QR Code" className="w-48 h-48 rounded-md" />
        </div>
        <button
          onClick={handleDownloadQR}
          className="w-full max-w-xs bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
        >
          Descargar QR
        </button>
      </div>
      
      <p className="text-sm text-gray-400 px-4">
        Una vez finalizada la compra, todos los datos proporcionados, incluida la dirección de envío, serán recopilados y procesados para la correcta gestión y entrega del pedido.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-600">
        <button
          onClick={onBack}
          className="w-full border border-gray-500 text-gray-300 hover:bg-gray-700 hover:text-white font-bold py-3 rounded-lg transition-colors"
        >
          Volver
        </button>
        <button
          onClick={handleFinalizeOrder}
          disabled={locationStatus === 'loading'}
          className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-800 disabled:cursor-wait text-white font-bold py-3 rounded-lg transition-colors"
        >
          {locationStatus === 'loading' ? 'Obteniendo ubicación...' : 'Finalizar'}
        </button>
      </div>
    </div>
  );
};
export default PaymentStep;
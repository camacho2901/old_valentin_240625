import React, { useState } from 'react';
import { Product, CartItem } from '../types.ts';
import { PRODUCTS } from '../products.ts';

interface ProductSelectionStepProps {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  onConfirm: () => void;
}

const ProductSelectionStep: React.FC<ProductSelectionStepProps> = ({
  cartItems,
  setCartItems,
  onConfirm
}) => {
  const [selectedProductId, setSelectedProductId] = useState<number>(PRODUCTS[0].id);
  const [quantity, setQuantity] = useState<number>(1);

  const selectedProduct = PRODUCTS.find((p) => p.id === selectedProductId) || PRODUCTS[0];

  const handleAddClick = () => {
    if (quantity <= 0) {
      alert("La cantidad debe ser mayor que cero.");
      return;
    }

    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(item => item.product.id === selectedProduct.id);
      if (existingItemIndex > -1) {
        const newItems = [...prevItems];
        newItems[existingItemIndex].quantity += quantity;
        return newItems;
      } else {
        return [...prevItems, { product: selectedProduct, quantity }];
      }
    });

    setQuantity(1);
  };

  const total = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  // --- CAMBIO PRINCIPAL: Estructura con Flexbox ---
  // Se ha modificado el contenedor principal para que use Flexbox y ocupe toda la altura disponible
  // DENTRO del modal, permitiendo que el botón de confirmar se vaya al final.
  return (
    // CAMBIO 1: Se eliminó `min-h-screen`, `pb-32` y `bg-gray-900`.
    // Se añadió `flex flex-col` y `h-full` para que el layout ocupe el espacio del modal.
    <div className="flex flex-col h-full space-y-6 text-white">
      
      {/* --- Contenedor para todo el contenido excepto el botón final --- */}
      {/* Este div permite que el botón de confirmar se separe del resto */}
      <div className="flex-grow">
        <div className="text-center">
          <h2 className="text-yellow-400 text-2xl font-bold tracking-wider">Bodega Destilería</h2>
          <h3 className="text-white text-3xl font-extrabold">"OLD VALENTIN"</h3>
        </div>

        {/* Selección de producto */}
        <div className="mt-6">
          <select
            id="product-select"
            value={selectedProductId}
            onChange={(e) => setSelectedProductId(Number(e.target.value))}
            className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            {PRODUCTS.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>

        {/* Cantidad */}
        <div className="mt-4">
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-300 mb-1">Cantidad</label>
          <input
            type="number"
            id="quantity"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || ))}
            className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        {/* Botón agregar */}
        <button
          onClick={handleAddClick}
          className="w-full mt-4 bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 rounded-lg transition-colors"
        >
          Agregar al carrito de compras
        </button>

        {/* Carrito */}
        <div className="border-t border-gray-600 pt-4 mt-6">
          <h4 className="text-xl font-bold mb-2">MI PEDIDO:</h4>
          <div className="min-h-[80px] bg-gray-800/50 p-3 rounded-md">
            {cartItems.length === 0 ? (
              <p className="text-gray-400 text-center italic">El carrito está vacío.</p>
            ) : (
              <ul className="space-y-2">
                {cartItems.map(item => (
                  <li key={item.product.id} className="flex justify-between text-sm">
                    <span>{item.quantity}x {item.product.name}</span>
                    <span className="font-semibold">Bs. {(item.product.price * item.quantity).toFixed(2)}</span>
                  </li>
                ))}
                <li className="flex justify-between text-base font-bold border-t border-gray-500 pt-2 mt-2">
                  <span>TOTAL</span>
                  <span>Bs. {total.toFixed(2)}</span>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
      
      {/* --- Contenedor para el botón de confirmar --- */}
      {/* Este div se "pegará" al final gracias a que el div anterior tiene `flex-grow` */}
      <div className="mt-auto pt-4"> 
        {/* CAMBIO 2: Se eliminó `fixed`, `bottom-4`, `left-1/2`, `transform`, etc. */}
        {/* Ahora es un botón normal que ocupa todo el ancho del modal. */}
        <button
          onClick={onConfirm}
          disabled={cartItems.length === 0}
          className="w-full
                     bg-amber-600 hover:bg-amber-700
                     text-white font-bold py-3 rounded-lg shadow-lg
                     transition-colors
                     disabled:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Confirmar Pedido
        </button>
      </div>

    </div>
  );
};

export default ProductSelectionStep;

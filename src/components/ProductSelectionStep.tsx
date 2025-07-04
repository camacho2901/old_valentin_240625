import React, { useState } from 'react';
import { Product, CartItem } from '../types.ts';
import { PRODUCTS } from '../products.ts';

interface ProductSelectionStepProps {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  onConfirm: () => void;
}

const ProductSelectionStep: React.FC<ProductSelectionStepProps> = ({ cartItems, setCartItems, onConfirm }) => {
  const [selectedProductId, setSelectedProductId] = useState<number>(PRODUCTS[0].id);
  const [quantity, setQuantity] = useState<number>(1);

  const selectedProduct = PRODUCTS.find(p => p.id === selectedProductId)!;

  const handleAddClick = () => {
    if (quantity <= 0) return alert("La cantidad debe ser mayor a 0");
    setCartItems(prev => {
      const index = prev.findIndex(i => i.product.id === selectedProduct.id);
      if (index > -1) {
        const updated = [...prev];
        updated[index].quantity += quantity;
        return updated;
      }
      return [...prev, { product: selectedProduct, quantity }];
    });
    setQuantity(1);
  };

  const total = cartItems.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  return (
    <div className="flex flex-col gap-6 px-2 pb-20">
      <div className="text-center space-y-1">
        <h2 className="text-yellow-400 text-lg font-semibold tracking-wide uppercase">Bodega Destilería</h2>
        <h3 className="text-white text-2xl font-extrabold tracking-wider">"OLD VALENTIN"</h3>
      </div>

      <div className="flex items-center gap-3">
        <select
          value={selectedProductId}
          onChange={(e) => setSelectedProductId(Number(e.target.value))}
          className="flex-1 bg-gray-800 border border-gray-600 rounded-md px-3 py-2 text-white"
        >
          {PRODUCTS.map(p => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
        <div className="bg-gray-800 px-4 py-2 rounded-md text-white font-semibold">
           {selectedProduct.price.toFixed(2)}
        </div>
      </div>

      <div> 
        <label htmlFor="quantity" className="block mb-1 text-sm text-gray-300">Cantidad</label>
        <input
          id="quantity"
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
          className="w-full bg-gray-800 border border-gray-600 rounded-md px-3 py-2 text-white"
        />
      </div>

      <button
        onClick={handleAddClick}
        className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 rounded-lg shadow transition-colors"
      >
        Agregar al carrito
      </button>

      <div className="bg-gray-800/60 rounded-lg p-4 space-y-2">
        <h4 className="text-white font-bold text-lg">MI PEDIDO</h4>
        {cartItems.length === 0 ? (
          <p className="text-gray-400 italic text-center">El carrito está vacío.</p>
        ) : (
          <>
            <ul className="space-y-2">
              {cartItems.map(item => (
                <li key={item.product.id} className="flex justify-between text-sm">
                  <span>{item.quantity}x {item.product.name}</span>
                  <span className="font-semibold">Bs. {(item.product.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <hr className="border-gray-600 my-2" />
            <div className="flex justify-between text-base font-bold">
              <span>Total</span>
              <span>Bs. {total.toFixed(2)}</span>
            </div>
          </>
        )}
      </div>

      <button
        onClick={onConfirm}
        disabled={cartItems.length === 0}
        className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 w-11/12 max-w-sm font-bold py-3 rounded-lg shadow-lg z-40
          ${cartItems.length === 0 ? 'bg-gray-600 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 text-white transition-colors'}`}
      >
        Confirmar Pedido
      </button>
    </div>
  );
};

export default ProductSelectionStep;

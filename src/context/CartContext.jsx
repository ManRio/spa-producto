import { createContext, useContext, useMemo, useState } from 'react';
import { useToast } from './ToastContext.jsx';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const { showToast } = useToast();
  // items: [{ id, name, price, image, qty }]

  const addToCart = (product) => {
    setItems((prev) => {
      const existing = prev.find((it) => it.id === product.id);

      if (existing) {
        showToast(
          `"${product.name}" cantidad actualizada (${existing.qty + 1})`,
          { type: 'info' }
        );
        return prev.map((it) =>
          it.id === product.id ? { ...it, qty: it.qty + 1 } : it
        );
      }

      showToast(`"${product.name}" añadido al carrito`, {
        type: 'success',
      });

      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.images?.[0],
          qty: 1,
        },
      ];
    });
  };

  const removeFromCart = (id) => {
    setItems((prev) => {
      const removed = prev.find((it) => it.id === id);
      if (removed) {
        showToast(`"${removed.name}" eliminado del carrito`, {
          type: 'info',
        });
      }
      return prev.filter((it) => it.id !== id);
    });
  };

  const changeQty = (id, qty) => {
    if (qty <= 0) {
      removeFromCart(id);
      return;
    }
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, qty } : it)));
  };

  const clearCart = () => {
    setItems((prev) => {
      if (prev.length > 0) {
        showToast('Carrito vaciado', { type: 'info' });
      }
      return [];
    });
  };

  const totalItems = items.reduce((acc, it) => acc + it.qty, 0);
  const totalPrice = items.reduce((acc, it) => acc + it.price * it.qty, 0);

  const value = useMemo(
    () => ({
      items,
      addToCart,
      removeFromCart,
      changeQty,
      clearCart,
      totalItems,
      totalPrice,
    }),
    [items, totalItems, totalPrice]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart debe usarse dentro de <CartProvider>');
  }
  return ctx;
}

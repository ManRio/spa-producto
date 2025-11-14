// src/components/CartDrawer.jsx
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { HiX } from 'react-icons/hi';

export default function CartDrawer({ isOpen, onClose }) {
  const {
    items,
    totalItems,
    totalPrice,
    changeQty,
    removeFromCart,
    clearCart,
  } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Fondo oscuro clicable */}
          <motion.div
            className='fixed inset-0 bg-black/50 z-40'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Panel flotante */}
          <motion.aside
            className='
              fixed right-4 top-4 bottom-4
              w-[calc(100vw-2rem)] sm:w-[380px]
              bg-brand-black/90 backdrop-blur-xl
              border border-white/15 rounded-2xl
              shadow-[0_18px_45px_rgba(0,0,0,0.6)]
              z-50 flex flex-col
            '
            initial={{ x: '120%' }}
            animate={{ x: 0 }}
            exit={{ x: '120%' }}
            transition={{ type: 'tween', duration: 0.3 }}
          >
            {/* Header carrito */}
            <div className='flex items-center justify-between px-4 py-4 border-b border-white/15'>
              <h2 className='font-title uppercase tracking-wider2 text-white text-lg'>
                Carrito ({totalItems})
              </h2>
              <button
                onClick={onClose}
                className='p-2 rounded-full hover:bg-white/10 text-white'
              >
                <HiX size={20} />
              </button>
            </div>

            {/* Lista de productos */}
            <div className='flex-1 overflow-y-auto px-4 py-4 space-y-4'>
              {items.length === 0 && (
                <p className='text-white/70 text-sm'>
                  Tu carrito está vacío. Añade algún producto 🥊
                </p>
              )}

              {items.map((item) => (
                <div
                  key={item.id}
                  className='flex gap-3 rounded-xl bg-white/5 border border-white/10 p-3'
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className='h-16 w-16 rounded-lg object-cover flex-shrink-0'
                  />
                  <div className='flex flex-col flex-1'>
                    <p className='text-white text-sm font-semibold'>
                      {item.name}
                    </p>
                    <p className='text-white/70 text-xs'>
                      {item.price.toLocaleString('es-ES', {
                        style: 'currency',
                        currency: 'EUR',
                      })}
                    </p>
                    <div className='mt-2 flex items-center justify-between'>
                      <div className='flex items-center gap-2 text-white'>
                        <button
                          type='button'
                          onClick={() => changeQty(item.id, item.qty - 1)}
                          className='h-6 w-6 flex items-center justify-center rounded-full bg-white/10 hover:bg:white/20'
                        >
                          -
                        </button>
                        <span className='w-6 text-center text-sm'>
                          {item.qty}
                        </span>
                        <button
                          type='button'
                          onClick={() => changeQty(item.id, item.qty + 1)}
                          className='h-6 w-6 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20'
                        >
                          +
                        </button>
                      </div>
                      <button
                        type='button'
                        onClick={() => removeFromCart(item.id)}
                        className='text-xs text-red-300 hover:text-red-200'
                      >
                        Quitar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Resumen */}
            <div className='border-t border-white/15 px-4 py-4 space-y-3 bg-black/30 rounded-b-2xl'>
              <div className='flex items-center justify-between text-white'>
                <span>Total:</span>
                <span className='font-semibold'>
                  {totalPrice.toLocaleString('es-ES', {
                    style: 'currency',
                    currency: 'EUR',
                  })}
                </span>
              </div>
              <div className='flex gap-2'>
                <button
                  type='button'
                  onClick={clearCart}
                  disabled={items.length === 0}
                  className='flex-1 px-3 py-2 rounded-xl border border-white/30 text-white text-sm hover:bg-white/10 disabled:opacity-40'
                >
                  Vaciar
                </button>
                <button
                  type='button'
                  disabled={items.length === 0}
                  className='flex-1 px-3 py-2 rounded-xl bg-brand-red text-white text-sm hover:bg-brand-black disabled:opacity-40'
                >
                  Finalizar compra
                </button>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

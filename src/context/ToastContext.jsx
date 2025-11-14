import { createContext, useCallback, useContext, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (message, { type = 'info', duration = 3200 } = {}) => {
      const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;

      setToasts((prev) => [...prev, { id, message, type }]);

      if (duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, duration);
      }
    },
    [removeToast]
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* Viewport de toasts */}
      <div className='pointer-events-none fixed inset-x-0 bottom-4 z-[60] flex justify-center md:justify-end px-4'>
        <div className='flex flex-col gap-2 max-w-sm w-full'>
          <AnimatePresence>
            {toasts.map((toast) => (
              <motion.div
                key={toast.id}
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.9 }}
                transition={{
                  type: 'spring',
                  stiffness: 380,
                  damping: 20,
                }}
                className={`
                  pointer-events-auto rounded-xl border px-4 py-3
                  shadow-2xl backdrop-blur-xl text-sm text-white flex items-start gap-3
                  ${
                    toast.type === 'success'
                      ? 'bg-black/85 border-emerald-400/70'
                      : toast.type === 'error'
                      ? 'bg-red-900/85 border-red-400/70'
                      : 'bg-black/85 border-white/25'
                  }
                `}
              >
                <div className='mt-[6px] h-2 w-2 rounded-full bg-current' />
                <p className='flex-1'>{toast.message}</p>
                <button
                  type='button'
                  onClick={() => removeToast(toast.id)}
                  className='ml-2 text-xs text-white/60 hover:text-white'
                >
                  ×
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast debe usarse dentro de <ToastProvider>');
  }
  return ctx;
}

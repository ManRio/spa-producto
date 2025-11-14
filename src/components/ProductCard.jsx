import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext.jsx';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [idx, setIdx] = useState(0);

  const images =
    Array.isArray(product?.images) && product.images.length > 0
      ? product.images
      : ['/images/placeholder.jpg'];

  const current = images[idx] ?? images[0];

  return (
    <motion.article
      className='
        group rounded-2xl overflow-hidden
        border border-white/15 bg-white/10 backdrop-blur-xl
        shadow-[0_10px_35px_rgba(0,0,0,0.55)]
        flex flex-col will-change-transform
      '
      whileHover={{
        y: -10,
        scale: 1.03,
        boxShadow: '0 28px 60px rgba(0,0,0,0.9)',
      }}
      transition={{ type: 'spring', stiffness: 220, damping: 18 }}
    >
      {/* Imagen principal + miniaturas */}
      <div className='relative aspect-[4/3] overflow-hidden'>
        <AnimatePresence mode='wait'>
          <motion.img
            key={current}
            src={current}
            alt={product?.name ?? 'Producto'}
            className='
              absolute inset-0 h-full w-full object-cover
              transition-transform duration-500 ease-out
              group-hover:scale-115
            '
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.03 }}
            transition={{ duration: 0.25 }}
          />
        </AnimatePresence>

        {/* Tira de miniaturas */}
        <div className='absolute bottom-3 left-0 right-0 px-3'>
          <div className='flex gap-2 bg-black/45 backdrop-blur-md rounded-xl p-2 justify-center'>
            {images.map((src, i) => (
              <motion.button
                key={`${product?.id ?? 'p'}-thumb-${i}`}
                onClick={() => setIdx(i)}
                type='button'
                className={`
                  h-12 w-12 overflow-hidden rounded-lg border
                  bg-transparent p-0 shadow-none
                  ${
                    i === idx
                      ? 'border-brand-red ring-2 ring-brand-red/70'
                      : 'border-white/30'
                  }
                  focus:outline-none focus:ring-2 focus:ring-brand-red/60
                `}
                aria-label={`Ver imagen ${i + 1} de ${
                  product?.name ?? 'producto'
                }`}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
              >
                <img
                  src={src}
                  alt=''
                  className='block h-full w-full object-cover'
                />
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Info */}
      <div className='p-5 flex flex-col gap-3 text-brand-light'>
        <h3 className='font-title uppercase tracking-wider2 text-2xl text-white/90'>
          {product?.name}
        </h3>

        <p className='text-sm text-white/80 leading-relaxed'>
          {product?.description}
        </p>

        <div className='mt-2 flex items-center justify-between'>
          <span className='text-white/90 text-xl font-semibold'>
            {Number(product?.price ?? 0).toLocaleString('es-ES', {
              style: 'currency',
              currency: 'EUR',
            })}
          </span>

          <motion.button
            type='button'
            onClick={() => addToCart(product)}
            className='
              font-cta bg-brand-red text-white px-4 py-2 rounded-xl
              shadow-lg hover:bg-brand-black hover:shadow-[0_0_25px_rgba(239,68,68,0.9)]
              transition-all text-sm uppercase tracking-wide
              focus:outline-2 focus:outline-brand-red focus:outline-offset-2
            '
            whileHover={{ y: -2, scale: 1.05 }}
            whileTap={{ scale: 0.94 }}
          >
            Añadir al carrito
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
}

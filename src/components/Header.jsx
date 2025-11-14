import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';
import { HiShoppingCart } from 'react-icons/hi2';
import { useCart } from '../context/CartContext';

export default function Header({ onCartClick }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { totalItems } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { name: 'Inicio', href: '#inicio' },
    { name: 'Productos', href: '#productos' },
    { name: 'Nosotros', href: '#nosotros' },
    { name: 'Contacto', href: '#contacto' },
  ];

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className={`fixed top-0 left-0 w-full z-30 transition-all ${
        scrolled
          ? 'backdrop-blur bg-brand-gray/10 shadow-lg border-b border-white/10'
          : 'bg-transparent'
      }`}
    >
      <div
        className={`max-w-7xl mx-auto px-3 flex items-center justify-between transition-all ${
          scrolled ? 'py-1' : 'py-2'
        }`}
      >
        <a href='#inicio' className='flex items-center gap-2'>
          <motion.img
            src='/images/logo.png'
            alt='Logo'
            className='w-auto'
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            style={{
              height: scrolled ? '3.5rem' : '4.5rem',
            }}
          />
        </a>

        {/* NAV DESKTOP */}
        <nav className='hidden md:flex gap-8 font-medium'>
          {links.map((link, idx) => (
            <motion.a
              key={link.name}
              href={link.href}
              className='relative text-brand-light text-lg tracking-wide group'
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.15 + idx * 0.05 }}
              whileHover={{ y: -2 }}
            >
              <span className='hover:text-brand-red transition-colors'>
                {link.name}
              </span>
              <span
                className='
                  pointer-events-none absolute left-0 -bottom-1 h-[2px] w-0
                  bg-gradient-to-r from-brand-red via-white to-brand-red
                  rounded-full transition-all duration-300
                  group-hover:w-full
                '
              />
            </motion.a>
          ))}
        </nav>

        <div className='flex items-center gap-3'>
          {/* CTA Botón */}
          <motion.a
            href='#cta'
            className='hidden md:inline-block text-base bg-brand-red text-brand-light px-5 py-2 rounded-xl shadow hover:shadow-lg transition-all'
            whileHover={{ y: -1, scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
          >
            ¿Te sponsorizamos?
          </motion.a>

          {/* Botón carrito */}
          <motion.button
            onClick={onCartClick}
            className='relative p-2 rounded-full bg-white/10 hover:bg-white/20 text-white shadow-md hover:shadow-lg'
            aria-label='Abrir carrito'
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.94 }}
          >
            <HiShoppingCart size={22} />
            <AnimatePresence>
              {totalItems > 0 && (
                <motion.span
                  key={totalItems}
                  initial={{ scale: 0, y: 6, opacity: 0 }}
                  animate={{ scale: 1, y: 0, opacity: 1 }}
                  exit={{ scale: 0, y: -6, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                  className='absolute -top-1 -right-1 min-w-[18px] h-[18px] rounded-full bg-brand-red text-[11px] flex items-center justify-center text-white border border-white/80'
                >
                  {totalItems}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Botón menú móvil */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className='text-brand-red md:hidden p-2 rounded-lg hover:bg-neutral-100/10'
            aria-label='Abrir menú'
            whileTap={{ scale: 0.9, rotate: isOpen ? -90 : 90 }}
          >
            {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Menú móvil animado */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.25 }}
            className='md:hidden bg-black/90 backdrop-blur-xl border-t border-white/10 shadow-lg'
          >
            <ul className='flex flex-col items-center gap-4 py-6 text-base font-medium'>
              {links.map((link) => (
                <li key={link.name}>
                  <button type='button' onClick={() => setIsOpen(false)}>
                    <span className='relative inline-block'>
                      <a
                        href={link.href}
                        className='text-neutral-100 hover:text-brand-red transition-colors'
                      >
                        {link.name}
                      </a>
                    </span>
                  </button>
                </li>
              ))}
              <li>
                <button type='button' onClick={() => setIsOpen(false)}>
                  <span className='bg-brand-light text-brand-red px-5 py-2 rounded-xl shadow hover:shadow-md transition-all'>
                    Te Sponsorizamos
                  </span>
                </button>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

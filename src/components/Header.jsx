import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';
import { HiShoppingCart } from 'react-icons/hi2';
import { useCart } from '../context/CartContext';

export default function Header({ onCartClick }) {
  // ✅ aquí
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { totalItems } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { name: 'Inicio', href: '#inicio' }, // opcional: que apunte a la sección
    { name: 'Productos', href: '#productos' },
    { name: 'Nosotros', href: '#nosotros' },
    { name: 'Contacto', href: '#contacto' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-30 transition-all ${
        scrolled ? 'backdrop-blur bg-brand-gray/10 shadow-md' : 'bg-transparent'
      }`}
    >
      <div className='max-w-7xl mx-auto px-2 py-1 flex items-center justify-between'>
        <a href='#inicio'>
          <img src='/images/logo.png' alt='Logo' className='h-40 w-auto' />
        </a>

        <nav className='hidden md:flex gap-8 font-medium'>
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className='text-brand-light text-2xl hover:text-brand-red transition-all'
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div className='flex items-center gap-3'>
          {/* CTA Botón */}
          <a
            href='#cta'
            className='hidden md:inline-block text-xl bg-brand-red text-brand-light px-5 py-2 rounded-xl shadow hover:shadow-md transition-all'
          >
            ¿Te sponsorizamos?
          </a>

          {/* Botón carrito */}
          <button
            onClick={onCartClick} // ✅ ahora viene por props
            className='relative p-2 rounded-full bg-white/10 hover:bg-white/20 text-white'
            aria-label='Abrir carrito'
          >
            <HiShoppingCart size={22} />
            {totalItems > 0 && (
              <span className='absolute -top-1 -right-1 min-w-[18px] h-[18px] rounded-full bg-brand-red text-[11px] flex items-center justify-center text-white'>
                {totalItems}
              </span>
            )}
          </button>

          {/* Botón menú móvil */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className='text-brand-red md:hidden p-2 rounded-lg hover:bg-neutral-100'
            aria-label='Abrir menú'
          >
            {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Menú móvil animado */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className='md:hidden bg-white border-t border-neutral-200'
          >
            <ul className='flex flex-col items-center gap-4 py-6 text-base font-medium'>
              {links.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className='text-neutral-700 hover:text-brand-600 transition-colors'
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href='#cta'
                  className='bg-brand-light text-brand-red px-5 py-2 rounded-xl shadow hover:shadow-md transition-all'
                  onClick={() => setIsOpen(false)}
                >
                  Te Sponsorizamos
                </a>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

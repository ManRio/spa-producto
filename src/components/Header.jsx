import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Detectamos cambios en el scroll para suavizar el header

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { name: 'Inicio', href: '#' },
    { name: 'Productos', href: '#productos' },
    { name: 'Nosotros', href: '#nosotros' },
    { name: 'Contacto', href: '#contacto' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all ${
        scrolled ? 'backdrop-blur bg-white/70 shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <a href='#' className="text-xl font-bold text-brand-600" >
          <h1>BoXingGloves</h1> {/* TODO = Cambiar por el logo cuando lo tengamos */}
        </a>

        <nav className="hidden md:flex gap-8 text-sm font-medium" >
          {links.map((link) => (
            <a
            key={link.name}
            href={link.href}
            className='text-neutral-700 hover:text-brand-600 transition-all'
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* CTA Botón */}
        <a 
        href='#cta'
        className="hidden md:inline-block bg-brand-500 text-white px-5 py2 rounded-xl shadow hover:shadow-md transition-all"
        >¿Te sponsorizamos?</a>

        {/* Botón menú móvil */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className='md:hidden p-2 rounded-lg hover:bg-neutral-100'
          aria-label='Abrir menú'
        >
          {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
        </button>
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
                  className='bg-brand-500 text-white px-5 py-2 rounded-xl shadow hover:shadow-md transition-all'
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

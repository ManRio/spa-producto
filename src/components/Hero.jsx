import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
  const [videoReady, setVideoReady] = useState(false);
  return (
    <section
      id='inicio'
      className='relative h-[100vh] w-full overflow-hidden flex items-center justify-center'
    >
      {/* Fondo estático - Póster */}
      <img
        src='/media/hero-poster.jpg'
        alt='Fondo estático'
        aria-hidden='true'
        className='absolute inset-0 w-full h-full object-cover'
      />

      {/* 🎥 Vídeo de fondo */}
      <video
        className={
          'absolute inset-0 w-full h-full object-cover pointer-events-none motion-reduce:hidden transition-opacity duration-700 ' +
          (videoReady ? 'opacity-100' : 'opacity-0')
        }
        src='/media/hero.mp4'
        autoPlay
        muted
        loop
        playsInline
        preload='metadata'
        onLoadedData={() => setVideoReady(true)}
      />

      {/* 🌫️ Overlay para contraste */}
      <div className='absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/30' />

      {/* 🖋️ Contenido */}
      <div className='relative z-10 w-[92vw] md:w-[86vw] max-w-[1400px] mt-20 px-4'>
        <div className='flex flex-col md:flex-row items-center md:items-center justify-between gap-8 md:gap-12'>
          {/* Columna izquierda: Logo */}
          <motion.img
            src='/images/logo.png'
            alt='Boxing Gloves'
            className='h-[42vh] md:h-[72vh] w-auto mx-auto md:mx-0 drop-shadow-2xl'
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          />

          {/* Columna derecha: Título + CTA */}
          <div className='text-center md:flex md:flex-col md:items-center md:justify-center flex-1 max-w-[800px]'>
            <motion.h1
              className='font-title uppercase tracking-wider2 text-white/90 text-5xl md:text-7xl leading-none'
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              BO<span className='text-brand-red font-extrabold'>X</span>
              ING~GLOVES
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <a
                href='#productos'
                className='inline-flex mt-6 font-cta bg-brand-red text-white px-7 py-3 rounded-xl shadow hover:bg-brand-black transition-all focus:outline-2 focus:outline-brand-red focus:outline-offset-2'
              >
                Personalizamos tus guantes
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

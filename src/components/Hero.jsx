import { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Hero() {
  const [videoReady, setVideoReady] = useState(false);

  // 🌀 Usamos el scroll global de la página
  const { scrollY } = useScroll();

  // Cuanto más bajas, más se desplazan fondo y contenido
  const yBackground = useTransform(scrollY, [0, 800], [0, 220]); // vídeo/fondo baja bastante
  const yContent = useTransform(scrollY, [0, 800], [0, -140]); // contenido sube
  const scaleContent = useTransform(scrollY, [0, 800], [1, 0.9]); // ligero zoom out

  return (
    <section
      id='inicio'
      className='relative h-[100vh] w-full overflow-hidden flex items-center justify-center'
    >
      {/* Fondo + vídeo + overlay con parallax global */}
      <motion.div className='absolute inset-0' style={{ y: yBackground }}>
        {/* Póster estático */}
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
        <div className='absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/30' />
      </motion.div>

      {/* 🖋️ Contenido con parallax inverso + scale */}
      <motion.div
        style={{ y: yContent, scale: scaleContent }}
        className='relative z-10 w-[92vw] md:w-[86vw] max-w-[1400px] mt-20 px-4'
      >
        <div className='flex flex-col md:flex-row items-center md:items-center justify-between gap-8 md:gap-12'>
          {/* Columna izquierda: Logo (entrada limpia, sin loop raro) */}
          <motion.img
            src='/images/logo.png'
            alt='Boxing Gloves'
            className='h-[42vh] md:h-[72vh] w-auto mx-auto md:mx-0 drop-shadow-2xl'
            initial={{ opacity: 0, y: 25, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />

          {/* Columna derecha: Título + CTA */}
          <div className='text-center md:flex md:flex-col md:items-center md:justify-center flex-1 max-w-[800px]'>
            <motion.h1
              className='font-title uppercase tracking-wider2 text-white/90 text-5xl md:text-7xl leading-none'
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            >
              BO<span className='text-brand-red font-extrabold'>X</span>
              ING~GLOVES
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease: 'easeOut' }}
            >
              <motion.a
                href='#productos'
                className='inline-flex mt-6 font-cta bg-brand-red text-white px-7 py-3 rounded-xl shadow-lg hover:bg-brand-black transition-all focus:outline-2 focus:outline-brand-red focus:outline-offset-2'
                // CTA con pulsación clara pero controlada
                animate={{ scale: [1, 1.06, 1] }}
                transition={{
                  duration: 1.4,
                  repeat: Infinity,
                  repeatType: 'mirror',
                  ease: 'easeInOut',
                  delay: 0.7,
                }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
              >
                Personalizamos tus guantes
              </motion.a>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

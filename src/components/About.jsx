import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function About() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Parallax más visible
  const yBackground = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const yPanel = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const panelScale = useTransform(scrollYProgress, [0, 1], [0.95, 1.03]);

  return (
    <section
      ref={sectionRef}
      id='nosotros'
      className='relative h-[100vh] w-full overflow-hidden flex items-center justify-center'
    >
      {/* Fondo + vídeo con parallax */}
      <motion.div className='absolute inset-0' style={{ y: yBackground }}>
        {/* Poster siempre visible */}
        <img
          src='/media/hero-poster.jpg'
          alt='poster estático'
          aria-hidden='true'
          className='absolute inset-0 w-full h-full object-cover'
        />
        {/* 🎥 Vídeo de fondo */}
        <video
          className='absolute inset-0 w-full h-full object-cover pointer-events-none motion-reduce:hidden transition-opacity duration-700'
          src='/media/about.mp4'
          autoPlay
          muted
          loop
          playsInline
          preload='none'
        />
        {/* Fallback estático si el usuario prefiere reducir movimiento */}
        <img
          src='/media/about-poster.jpg'
          alt=''
          aria-hidden='true'
          className='hidden motion-reduce:block absolute inset-0 w-full h-full object-cover'
        />

        {/* Capa de contraste */}
        <div className='absolute inset-0 bg-brand-black/55' />
      </motion.div>

      {/* 🧊 Panel glassmorphism centrado con parallax y scale */}
      <motion.div
        style={{ y: yPanel, scale: panelScale }}
        initial={{ opacity: 0, y: 40, scale: 0.9 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className='
          relative z-10 mx-auto w-[92vw] max-w-3xl
          rounded-2xl border border-white/15 bg-brand-gray/60 backdrop-blur-xl
          shadow-[0_16px_50px_rgba(0,0,0,0.55)]
          px-6 md:px-10 py-8 md:py-10 text-center text-white mt-20
        '
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className='font-title uppercase tracking-wider2 text-6xl md:text-7xl text-brand-red'
        >
          Nuestra Pasión
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25, duration: 0.6 }}
          className='mt-4 text-white/85 text-lg leading-relaxed'
        >
          En <span className='font-semibold text-brand-red'>BoxingGloves</span>{' '}
          creemos que cada golpe cuenta. Diseñamos y personalizamos guantes con
          precisión artesanal y tecnología moderna, para que sientas tu historia
          en cada entrenamiento y combate.
        </motion.p>

        {/* Bullets/claims cortos */}
        <div className='mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm'>
          {[
            'Artesanía y precisión',
            'Materiales premium',
            'Personalización total',
          ].map((t, i) => (
            <motion.div
              key={t}
              initial={{ opacity: 0, y: 24, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + i * 0.12, duration: 0.45 }}
              className='rounded-xl border border-white/15 bg-brand-red/60 backdrop-blur-md px-4 py-3 text-lg font-medium shadow-[0_10px_30px_rgba(0,0,0,0.4)]'
            >
              {t}
            </motion.div>
          ))}
        </div>

        {/* Frase final */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className='mt-6 text-white/70'
        >
          Hecho por boxeadores,{' '}
          <span className='font-bold text-brand-red text-xl'>
            para boxeadores.
          </span>
        </motion.p>
      </motion.div>
    </section>
  );
}

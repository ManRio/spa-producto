import { motion } from 'framer-motion';

export default function About() {
  return (
    <section
      id='nosotros'
      className='relative h-[100vh] w-full overflow-hidden flex items-center justify-center'
    >
      {/* 🎥 Vídeo de fondo */}
      <video
        className='absolute inset-0 w-full h-full object-cover pointer-events-none motion-reduce:hidden'
        src='/media/about.mp4' // ← pon tu vídeo aquí
        autoPlay
        muted
        loop
        playsInline
      />
      {/* Fallback estático si el usuario prefiere reducir movimiento */}
      <img
        src='/media/about-poster.jpg'
        alt=''
        aria-hidden='true'
        className='hidden motion-reduce:block absolute inset-0 w-full h-full object-cover'
      />

      {/* 🌫️ Capa de contraste */}
      <div className='absolute inset-0 bg-brand-black/40' />

      {/* 🧊 Panel glassmorphism centrado */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className='
          relative z-10 mx-auto w-[92vw] max-w-3xl
          rounded-2xl border border-white/15 bg-white/10 backdrop-blur-xl
          shadow-[0_8px_30px_rgba(0,0,0,0.35)]
          px-6 md:px-10 py-8 md:py-10 text-center text-white
        '
      >
        <motion.h2
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 1.0 }}
          className='font-title uppercase tracking-wider2 text-4xl md:text-5xl text-brand-red'
        >
          Nuestra Pasión
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7, duration: 1.0 }}
          className='mt-4 text-white/85 leading-relaxed'
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
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.9 + i * 0.06, duration: 2.0 }}
              className='rounded-xl border border-white/15 bg-brand-red/50 backdrop-blur-md px-4 py-3'
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
          transition={{ delay: 0.35, duration: 0.5 }}
          className='mt-6 text-white/70'
        >
          Hecho por boxeadores,{' '}
          <span className='font-bold text-brand-red'>para boxeadores.</span>
        </motion.p>
      </motion.div>
    </section>
  );
}

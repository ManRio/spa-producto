import products from '../data/products.json';
import ProductCard from '../components/ProductCard';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const gridVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.9 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: 'easeOut' },
  },
};

export default function Products() {
  // 👇 Hook que detecta si la sección está en viewport
  const { ref, inView } = useInView({
    threshold: 0.25, // cuánto tiene que entrar para activarse
    triggerOnce: false, // importante: que pueda volver a activarse
  });

  return (
    <section id='productos' className='relative py-16 md:py-24'>
      {/* Fondo con oscurecido + blur sutil */}
      <div className='absolute inset-0'>
        <div
          className='absolute inset-0 bg-cover bg-center'
          style={{ backgroundImage: "url('/images/products-poster.jpg')" }}
        />
        <div className='absolute inset-0 bg-black/80 backdrop-blur-sm' />
      </div>

      <div className='relative mx-auto max-w-7xl px-4 mt-20'>
        <motion.header
          className='mb-10 text-center'
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <h2 className='font-title uppercase tracking-wider2 text-4xl md:text-5xl text-white/90'>
            Nuestros Productos
          </h2>
          <p className='mt-3 text-white/70 text-sm md:text-base'>
            Calidad profesional, listos para personalizar.
          </p>
        </motion.header>

        {/* 👇 Este grid se anima cada vez que entra en vista */}
        <motion.div
          ref={ref}
          className='grid gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
          variants={gridVariants}
          initial='hidden'
          animate={inView ? 'show' : 'hidden'}
        >
          {products.map((p) => (
            <motion.div key={p.id} variants={itemVariants}>
              <ProductCard product={p} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

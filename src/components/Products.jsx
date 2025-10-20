import products from '../data/products.json';
import ProductCard from '../components/ProductCard';
import { useCallback } from 'react';

export default function Products() {
  const handleAdd = useCallback((p) => {
    // De momento, simulamos el “add to cart”
    // Más adelante conectamos con estado global o backend.
    console.log('Añadido al carrito:', p.id);
    // Puedes mostrar un toast si tienes una librería, o un alert:
    // alert(`${p.name} añadido al carrito`);
  }, []);

  return (
    <section id='productos' className='relative py-16 md:py-24'>
      {/* Fondo con oscurecido + blur sutil */}
      <div className='absolute inset-0'>
        {/* imagen de fondo */}
        <div
          className='absolute inset-0 bg-cover bg-center'
          style={{ backgroundImage: "url('/images/products-poster.jpg')" }}
        />
        <div className='absolute inset-0 bg-black/80 backdrop-blur-sm' />
      </div>

      <div className='relative mx-auto max-w-7xl px-4 mt-20'>
        <header className='mb-10 text-center'>
          <h2 className='font-title uppercase tracking-wider2 text-4xl md:text-5xl text-white/90'>
            Nuestros Productos
          </h2>
          <p className='mt-2 text-white/70'>
            Calidad profesional, listos para personalizar.
          </p>
        </header>

        <div className='grid gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
          {products.map((p) => (
            <ProductCard key={p.id} product={p} onAddToCart={handleAdd} />
          ))}
        </div>
      </div>
    </section>
  );
}

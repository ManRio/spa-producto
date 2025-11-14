import { useState } from 'react';
import './App.css';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Products from './components/Products.jsx';
import About from './components/About.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import CartDrawer from './components/CartDrawer.jsx';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  return (
    <>
      <Header onCartClick={() => setIsCartOpen(true)} />
      <Hero />
      <Products />
      <About />
      <Contact />
      <Footer />

      {/* Carrito global, flotante */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}

export default App;

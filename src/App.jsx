import './App.css';
import Header from './components/Header.jsx';

function App() {
  return (
    <>
      <Header />
      <main className='pt-20'>
        <section id='inicio' className='h-screen bg-neutral-100'></section>
        <section id='productos' className='h-screen bg-neutral-200'></section>
        <section id='nosotros' className='h-screen bg-neutral-300'></section>
        <section id='contacto' className='h-screen bg-neutral-400'></section>
      </main>
    </>
  );
}

export default App;

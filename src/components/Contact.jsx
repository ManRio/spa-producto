import { useState } from 'react';

// Utilidades simples
const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

function Field({ label, id, error, children }) {
  return (
    <div className='space-y-1'>
      <label htmlFor={id} className='text-sm text-white/90'>
        {label}
      </label>
      {children}
      {error ? <p className='text-xs text-red-300'>{error}</p> : null}
    </div>
  );
}

// ---------- Formulario de Contacto ----------
function ContactForm() {
  const [data, setData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    website: '', // honeypot
    privacy: false,
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ ok: false, msg: '' });

  const onChange = (e) => {
    const { id, value, type, checked } = e.target;
    setData((d) => ({ ...d, [id]: type === 'checkbox' ? checked : value }));
  };

  const validate = () => {
    const e = {};
    if (!data.name.trim()) e.name = 'Tu nombre es obligatorio.';
    if (!emailRx.test(data.email)) e.email = 'Introduce un email válido.';
    if (!data.subject.trim()) e.subject = 'Añade un asunto.';
    if (data.message.trim().length < 10)
      e.message = 'Cuéntanos un poco más (≥ 10 caracteres).';
    if (!data.privacy) e.privacy = 'Debes aceptar la política de privacidad.';
    return e;
  };

  const onSubmit = (ev) => {
    ev.preventDefault();
    // Honeypot: si viene relleno, abortar
    if (data.website) return;

    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;

    // Simulación de envío
    setTimeout(() => {
      setStatus({ ok: true, msg: '¡Gracias! Te responderemos pronto.' });
      // Reset básico
      setData({
        name: '',
        email: '',
        subject: '',
        message: '',
        website: '',
        privacy: false,
      });
    }, 350);
  };

  return (
    <form
      onSubmit={onSubmit}
      className='
        rounded-2xl border border-white/15 bg-white/10 backdrop-blur-xl
        shadow-[0_8px_30px_rgba(0,0,0,0.35)]
        p-5 md:p-6 space-y-4 text-white
      '
      noValidate
    >
      <h3 className='font-title uppercase tracking-wider2 text-2xl text-white/90'>
        Contacto
      </h3>

      {/* honeypot */}
      <input
        type='text'
        id='website'
        value={data.website}
        onChange={onChange}
        className='hidden'
        tabIndex={-1}
        autoComplete='off'
      />

      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
        <Field id='name' label='Nombre' error={errors.name}>
          <input
            id='name'
            value={data.name}
            onChange={onChange}
            className='w-full rounded-xl bg-white/10 border border-white/20 px-3 py-2 outline-none focus:border-brand-red'
            placeholder='Tu nombre'
            aria-invalid={!!errors.name}
          />
        </Field>

        <Field id='email' label='Email' error={errors.email}>
          <input
            id='email'
            type='email'
            value={data.email}
            onChange={onChange}
            className='w-full rounded-xl bg-white/10 border border-white/20 px-3 py-2 outline-none focus:border-brand-red'
            placeholder='nombre@correo.com'
            aria-invalid={!!errors.email}
          />
        </Field>
      </div>

      <Field id='subject' label='Asunto' error={errors.subject}>
        <input
          id='subject'
          value={data.subject}
          onChange={onChange}
          className='w-full rounded-xl bg-white/10 border border-white/20 px-3 py-2 outline-none focus:border-brand-red'
          placeholder='Duda sobre producto, envío, etc.'
          aria-invalid={!!errors.subject}
        />
      </Field>

      <Field id='message' label='Mensaje' error={errors.message}>
        <textarea
          id='message'
          value={data.message}
          onChange={onChange}
          rows={5}
          className='w-full rounded-xl bg-white/10 border border-white/20 px-3 py-2 outline-none focus:border-brand-red resize-none'
          placeholder='Cuéntanos tu consulta…'
          aria-invalid={!!errors.message}
        />
      </Field>

      <div className='flex items-start gap-2'>
        <input
          id='privacy'
          type='checkbox'
          checked={data.privacy}
          onChange={onChange}
          className='mt-1 accent-[currentColor]'
          aria-invalid={!!errors.privacy}
        />
        <label htmlFor='privacy' className='text-sm text-white/80'>
          Acepto la{' '}
          <a href='#' className='underline'>
            política de privacidad
          </a>
          .
        </label>
      </div>
      {errors.privacy && (
        <p className='text-xs text-red-300 -mt-2'>{errors.privacy}</p>
      )}

      <button
        type='submit'
        className='btn font-cta bg-brand-red text-white px-5 py-2 rounded-xl hover:bg-brand-black transition-all focus:outline-2 focus:outline-brand-red focus:outline-offset-2'
      >
        Enviar mensaje
      </button>

      {status.ok && <p className='text-sm text-emerald-300'>{status.msg}</p>}
    </form>
  );
}

// ---------- Formulario de Sponsor ----------
function SponsorForm() {
  const [data, setData] = useState({
    name: '',
    email: '',
    role: 'Gimnasio',
    org: '',
    social: '',
    city: '',
    message: '',
    budget: '0-500€',
    website: '', // honeypot
    privacy: false,
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ ok: false, msg: '' });

  const onChange = (e) => {
    const { id, value, type, checked } = e.target;
    setData((d) => ({ ...d, [id]: type === 'checkbox' ? checked : value }));
  };

  const validate = () => {
    const e = {};
    if (!data.name.trim()) e.name = 'Nombre de contacto obligatorio.';
    if (!emailRx.test(data.email)) e.email = 'Email no válido.';
    if (!data.org.trim()) e.org = 'Indica equipo, club o marca personal.';
    if (data.message.trim().length < 12)
      e.message = 'Cuéntanos la propuesta (≥ 12 caracteres).';
    if (!data.privacy) e.privacy = 'Debes aceptar la política de privacidad.';
    return e;
  };

  const onSubmit = (ev) => {
    ev.preventDefault();
    if (data.website) return; // honeypot

    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;

    setTimeout(() => {
      setStatus({
        ok: true,
        msg: '¡Gracias! Revisaremos tu propuesta de patrocinio.',
      });
      setData({
        name: '',
        email: '',
        role: 'Gimnasio',
        org: '',
        social: '',
        city: '',
        message: '',
        budget: '0-500€',
        website: '',
        privacy: false,
      });
    }, 350);
  };

  return (
    <form
      id="cta"
      onSubmit={onSubmit}
      className='
        rounded-2xl border border-white/15 bg-white/10 backdrop-blur-xl
        shadow-[0_8px_30px_rgba(0,0,0,0.35)]
        p-5 md:p-6 space-y-4 text-white
      '
      noValidate
    >
      <h3 className='font-title uppercase tracking-wider2 text-2xl text-white/90'>
        Patrocinios / Sponsors
      </h3>

      {/* honeypot */}
      <input
        type='text'
        id='website'
        value={data.website}
        onChange={onChange}
        className='hidden'
        tabIndex={-1}
        autoComplete='off'
      />

      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
        <Field id='name' label='Nombre de contacto' error={errors.name}>
          <input
            id='name'
            value={data.name}
            onChange={onChange}
            className='w-full rounded-xl bg-white/10 border border-white/20 px-3 py-2 outline-none focus:border-brand-red'
            placeholder='Tu nombre'
            aria-invalid={!!errors.name}
          />
        </Field>

        <Field id='email' label='Email' error={errors.email}>
          <input
            id='email'
            type='email'
            value={data.email}
            onChange={onChange}
            className='w-full rounded-xl bg-white/10 border border-white/20 px-3 py-2 outline-none focus:border-brand-red'
            placeholder='nombre@correo.com'
            aria-invalid={!!errors.email}
          />
        </Field>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
        <Field id='role' label='Rol / Tipo'>
          <select
            id='role'
            value={data.role}
            onChange={onChange}
            className='w-full rounded-xl bg-white/10 border border-white/20 px-3 py-2 outline-none focus:border-brand-red text'
          >
            <option>Gimnasio</option>
            <option>Boxeador/a</option>
            <option>Manager</option>
            <option>Otro</option>
          </select>
        </Field>

        <Field id='budget' label='Rango de presupuesto'>
          <select
            id='budget'
            value={data.budget}
            onChange={onChange}
            className='w-full rounded-xl bg-white/10 border border-white/20 px-3 py-2 outline-none focus:border-brand-red'
          >
            <option>0-500€</option>
            <option>500-1.500€</option>
            <option>1.500-3.000€</option>
            <option>3.000-6.000€</option>
            <option>6.000€+</option>
          </select>
        </Field>

        <Field id='city' label='Ciudad'>
          <input
            id='city'
            value={data.city}
            onChange={onChange}
            className='w-full rounded-xl bg-white/10 border border-white/20 px-3 py-2 outline-none focus:border-brand-red'
            placeholder='Madrid, Barcelona…'
          />
        </Field>
      </div>

      <Field id='org' label='Club / Equipo / Marca personal' error={errors.org}>
        <input
          id='org'
          value={data.org}
          onChange={onChange}
          className='w-full rounded-xl bg-white/10 border border-white/20 px-3 py-2 outline-none focus:border-brand-red'
          placeholder='Nombre del club / equipo o marca personal'
          aria-invalid={!!errors.org}
        />
      </Field>

      <Field id='social' label='Perfil social (Instagram/TikTok/YouTube)'>
        <input
          id='social'
          value={data.social}
          onChange={onChange}
          className='w-full rounded-xl bg-white/10 border border-white/20 px-3 py-2 outline-none focus:border-brand-red'
          placeholder='https://instagram.com/...'
        />
      </Field>

      <Field id='message' label='Propuesta' error={errors.message}>
        <textarea
          id='message'
          value={data.message}
          onChange={onChange}
          rows={5}
          className='w-full rounded-xl bg-white/10 border border-white/20 px-3 py-2 outline-none focus:border-brand-red resize-none'
          placeholder='Cuéntanos qué tienes en mente, objetivos y cómo podemos aportar valor.'
          aria-invalid={!!errors.message}
        />
      </Field>

      <div className='flex items-start gap-2'>
        <input
          id='privacy'
          type='checkbox'
          checked={data.privacy}
          onChange={onChange}
          className='mt-1 accent-[currentColor]'
          aria-invalid={!!errors.privacy}
        />
        <label htmlFor='privacy' className='text-sm text-white/80'>
          Acepto la{' '}
          <a href='#' className='underline'>
            política de privacidad
          </a>
          .
        </label>
      </div>
      {errors.privacy && (
        <p className='text-xs text-red-300 -mt-2'>{errors.privacy}</p>
      )}

      <button
        type='submit'
        className='btn font-cta bg-brand-red text-white px-5 py-2 rounded-xl hover:bg-brand-black transition-all focus:outline-2 focus:outline-brand-red focus:outline-offset-2'
      >
        Enviar propuesta
      </button>

      {status.ok && <p className='text-sm text-emerald-300'>{status.msg}</p>}
    </form>
  );
}

// ---------- Página de Contacto ----------
export default function Contact() {
  return (
    <section id='contacto' className='relative py-16 md:py-24 overflow-hidden'>
      {/* Fondo con imagen/vídeo opcional */}
      <div className='absolute inset-0'>
        <div
          className='absolute inset-0 bg-cover bg-center'
          style={{ backgroundImage: "url('/images/products-poster.jpg')" }}
        />
        <div className='absolute inset-0 bg-black/65 backdrop-blur-sm' />
      </div>

      <div className='relative mx-auto max-w-7xl px-4 mt-20'>
        <header className='mb-10 text-center'>
          <h2 className='font-title uppercase tracking-wider2 text-4xl md:text-5xl text-white/90'>
            Contacto & Sponsors
          </h2>
          <p className='mt-2 text-white/70'>
            ¿Tienes dudas? ¿Buscas patrocinio? Escríbenos.
          </p>
        </header>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8'>
          <ContactForm />
          <SponsorForm />
        </div>
      </div>
    </section>
  );
}

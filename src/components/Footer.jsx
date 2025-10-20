import { FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";

export default function Footer() {
  const year = new Date().getFullYear();

  const links = [
    { label: "Inicio", href: "#inicio" },
    { label: "Productos", href: "#productos" },
    { label: "Nosotros", href: "#nosotros" },
    { label: "Contacto", href: "#contacto" },
  ];

  const legal = [
    { label: "Privacidad", href: "#" },
    { label: "Términos", href: "#" },
    { label: "Cookies", href: "#" },
  ];

  return (
    <footer className="relative">
      {/* Fondo del footer (opcional: imagen/textura) */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/footer-poster.jpg')" }}
        />
        <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />
      </div>

      {/* Cuerpo glassmorphism */}
      <div className="relative mx-auto max-w-7xl px-4 py-12">
        <div className="
          rounded-2xl border border-white/15 bg-white/10 backdrop-blur-xl
          shadow-[0_8px_30px_rgba(0,0,0,0.35)]
          p-6 md:p-10
        ">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-white">
            {/* Col 1: Branding */}
            <div>
              <a href="#inicio" className="inline-flex items-center gap-3">
                <img src="/images/logo.png" alt="BoxingGloves" className="h-12 w-auto" />
                <span className="sr-only">BoxingGloves</span>
              </a>
              <p className="mt-4 text-white/75 text-sm leading-relaxed">
                Guantes personalizados con precisión artesanal y materiales premium.
                Hechos por boxeadores, para boxeadores.
              </p>
              <div className="mt-4 flex items-center gap-3">
                <a href="#" aria-label="Instagram" className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition">
                  <FaInstagram />
                </a>
                <a href="#" aria-label="TikTok" className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition">
                  <FaTiktok />
                </a>
                <a href="#" aria-label="YouTube" className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition">
                  <FaYoutube />
                </a>
              </div>
            </div>

            {/* Col 2: Navegación */}
            <nav>
              <h4 className="font-title uppercase tracking-wider2 text-white/90 text-lg">Secciones</h4>
              <ul className="mt-4 space-y-2 text-white/80">
                {links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="hover:text-brand-red transition-colors">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Col 3: Contacto */}
            <div>
              <h4 className="font-title uppercase tracking-wider2 text-white/90 text-lg">Contacto</h4>
              <ul className="mt-4 space-y-2 text-white/80 text-sm">
                <li><a href="mailto:hola@boxinggloves.com" className="hover:text-brand-red">hola@boxinggloves.com</a></li>
                <li><a href="tel:+34999999999" className="hover:text-brand-red">+34 999 999 999</a></li>
                <li>Madrid, España</li>
              </ul>
            </div>

            {/* Col 4: Newsletter (maquetación) */}
            <div>
              <h4 className="font-title uppercase tracking-wider2 text-white/90 text-lg">Novedades</h4>
              <p className="mt-4 text-white/75 text-sm">Recibe lanzamientos y ofertas.</p>
              <form className="mt-4 flex gap-2">
                <input
                  type="email"
                  placeholder="tu@email.com"
                  className="w-full rounded-xl bg-white/10 border border-white/20 px-3 py-2 outline-none focus:border-brand-red text-white placeholder-white/50"
                />
                <button
                  type="button"
                  className="btn bg-brand-red text-white px-4 py-2 rounded-xl hover:bg-brand-black transition"
                >
                  Unirme
                </button>
              </form>
              <p className="mt-2 text-[12px] text-white/60">
                Al suscribirte aceptas nuestra <a href="#" className="underline">política de privacidad</a>.
              </p>
            </div>
          </div>

          {/* Línea + copyright */}
          <div className="mt-8 border-t border-white/15 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/60 text-sm">© {year} BoxingGloves. Todos los derechos reservados.</p>
            <ul className="flex items-center gap-4 text-white/60 text-sm">
              {legal.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="hover:text-brand-red transition-colors">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
# 🥊 BoxingGloves — Página de Producto

***SPA en construcción usando React, Vite, TypeScript y TailwindCSS***  

---

## 🚀 Descripción del Proyecto

**BoxingGloves** es una *Single Page Application* moderna que representa una marca especializada en guantes de boxeo personalizados.  
El objetivo es crear una página de producto innovadora, visualmente atractiva y con tecnologías modernas.

La aplicación está construida con:
- ⚛️ **React** (con Vite)
- 💅 **TailwindCSS**
- 💥 **Framer Motion** (animaciones y efectos parallax)
- 📦 **JavaScript / TypeScript Ready**
- 🎨 Diseño *glassmorphism* con estética premium

---

## 🧱 Estructura actual del proyecto

```
src/
├── assets/                # Imágenes y logos procesados por Vite
├── components/            # Componentes reutilizables
│   ├── Header.jsx         # Navegación con efecto blur y responsive
│   ├── Hero.jsx           # Sección principal con vídeo y CTA
│   ├── About.jsx          # Sección “Sobre nosotros” con vídeo fondo
│   ├── ProductCard.jsx    # Tarjeta de producto con galería e interacción
│   ├── Footer.jsx         # Pie de página con enlaces y redes
│   └── ...                # Componentes futuros
├── pages/
│   ├── Products.jsx       # Listado de productos desde JSON
│   ├── Contact.jsx        # Formularios de contacto y sponsor
│   └── ...                # Páginas futuras (checkout, perfil, etc.)
├── data/
│   └── products.json      # Datos de productos mock
├── App.jsx                # Estructura principal de la SPA
├── main.jsx               # Punto de entrada Vite
└── index.css              # Configuración global y Tailwind base
```

---

## 🎨 Paleta de colores y tipografías

**Colores de marca:**
- 🔴 Rojo intenso: `#D73B3E` (acción, energía)
- ⚫ Negro profundo: `#282726` (fuerza, sofisticación)
- ⚪ Gris medio: `#54504C` (equilibrio)
- ⚪ Gris claro: `#BBBBBB` (fondos neutros)

**Tipografías:**
- **Títulos (H1, H2):** Bebas Neue — mayúsculas, `tracking-wider`
- **Subtítulos (H3):** Oswald — mayúsculas
- **Cuerpo:** Roboto (regular)
- **Botones/CTA:** Montserrat (semibold)

---

## 🧩 Componentes implementados

### 🔹 Header
- Navegación fija con efecto `backdrop-blur` y sombra al hacer scroll.
- Menú responsive (hamburguesa con Framer Motion).
- Botón CTA “¿Te sponsorizamos?” en desktop.

### 🔹 Hero
- Vídeo de fondo en autoplay + overlay oscuro.
- Logo, título y CTA centrados.
- Diseño responsive y animaciones con `framer-motion`.

### 🔹 Products
- Grid de tarjetas en estilo *glassmorphism*.
- Cada tarjeta incluye galería de miniaturas y botón de añadir al carrito.
- Datos cargados desde `products.json`.

### 🔹 About
- Sección fullscreen con vídeo de fondo y panel central difuminado.
- Texto descriptivo y frases clave animadas.
- Paleta coherente con el Hero.

### 🔹 Contact
- Dos formularios: uno de contacto general y otro de patrocinio.
- Validación básica en cliente.
- Maquetación *glassmorphism* + fondo con blur.

### 🔹 Footer
- 4 columnas: branding, navegación, contacto y newsletter.
- Redes sociales y enlaces legales.
- Fondo oscuro con blur y textura de fondo.

---

## 🛠️ En desarrollo (futuro)

### 🔜 Próximos componentes
- 🛒 **Carrito de compra (Cart Context)** — gestión de productos y precios.
- 💳 **Checkout simulado** — resumen y confirmación de compra.
- 👤 **Perfil / Dashboard** — configuración del usuario o patrocinador.
- 📧 **Integración de EmailJS o backend** para enviar formularios reales.
- 🧠 **Gestión global de estado** (Zustand o Context API).
- 🎬 **Efectos parallax avanzados** en Hero y About.
- 🔝 **Scroll to top** flotante con animación.
- 🌙 **Modo oscuro / claro** opcional (theme toggle).

### ⚙️ Backend / APIs (planes futuros)
- Node.js + Express o Supabase para almacenar productos y leads.
- Webhooks con formularios y gestión de sponsors.
- Dashboard interno de administración.

---

## 💡 Filosofía de diseño

> “Simplicidad, movimiento y textura.”

Todo el proyecto busca equilibrio entre estética moderna y fluidez visual, 
inspirado en sitios como [DopeGood](https://dopegood.com/) o [RecapAfterUse](https://www.recapafteruse.co.uk/).

---

## 🧰 Requisitos técnicos

- Node.js >= 20
- npm >= 10
- Dependencias principales:
  ```bash
  npm install react framer-motion react-icons
  npm install -D tailwindcss postcss autoprefixer
  ```

- Iniciar proyecto:
  ```bash
  npm run dev
  ```

---

## 📁 Recursos
- **Videos y mockups gratuitos:** Pexels, Mixkit, Coverr.
- **Logos / SVG:** Figma Community, Flaticon, Freepik.
- **Fuentes:** Google Fonts.

---

## 📄 Licencia
Proyecto educativo para práctica de desarrollo frontend.
No está destinado a producción comercial.

---

© 2025 **BoxingGloves** | Desarrollado con ❤️ y React + Tailwind
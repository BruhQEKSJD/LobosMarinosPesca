# Costa viva — El mar no olvida

Web documental para la Feria Científica del **Instituto Cumbre de Cóndores Poniente, Renca, 4° C**. Tema: la caza de lobos marinos en Chile, su historia y los desafíos actuales de conservación y convivencia.

**Equipo:** Matías González, Rodrigo Nuñez y Benjamin Cortés. **Docente:** Katalina Venegas.

## Ver la web en tu computador

Instala Node.js 22.12 o posterior (recomendado: rama 22 LTS), descomprime el ZIP y abre una terminal dentro de `costa-viva`:

```bash
npm ci
npm run dev
```

Abre la dirección que muestra la terminal, normalmente `http://localhost:5173`.

Para comprobar exactamente la versión de producción:

```bash
npm run build
npm run preview
```

Abre `http://localhost:4173`. La carpeta **`dist/` ya viene compilada en el ZIP**. Si tienes Python 3, puedes verla sin instalar dependencias de Node:

```bash
python3 -m http.server 4173 --directory dist
```

En Windows, también puedes usar `py -m http.server 4173 --directory dist`. No abras `index.html` con doble clic: los módulos y la configuración necesitan servirse por HTTP. `vite preview` y el servidor de Python son para comprobación local, no para producción.

## Cambiar el video y el podcast

Edita **`public/config.json`**. Los dos enlaces recibidos ya están incluidos y marcados como temporales. No hay claves de API ni cuentas que configurar.

- `videoUrl`: reemplaza la URL completa por la de tu video en YouTube. Se admiten enlaces `youtube.com/watch?v=...`, `youtu.be/...`, `/embed/` y `/shorts/`.
- `podcastUrl`: reemplaza por el enlace compartido de NotebookLM, con dominio `notebooklm.google.com` o `notebook.google.com`.
- `temporary`: cambia `true` por `false` **cuando ambos recursos sean los definitivos del equipo**. Esto retira el aviso de contenido temporal y actualiza los botones.

Conserva comillas, comas y nombres de campos. Después de editar, ejecuta `npm run build` y vuelve a desplegar. Si publicas directamente la carpeta precompilada, puedes editar `dist/config.json` y subirla nuevamente sin recompilar; guarda el mismo cambio en `public/config.json` para que no se pierda en el siguiente build.

YouTube se carga solamente después de pulsar reproducir. Incluye un enlace alternativo para abrirlo en YouTube. La posibilidad de incrustarlo depende de la configuración del propietario del video. El podcast abre en una nueva pestaña: el acceso depende de los permisos de Google. **No se ha certificado la reproducción ni el acceso público de los enlaces temporales.**

## Publicar en Vercel

1. Sube el contenido de `costa-viva` a un repositorio Git propio, sin `node_modules` ni resultados de pruebas.
2. Importa ese repositorio en Vercel. Selecciona como raíz la carpeta donde está `package.json`.
3. Framework: **Vite**. Comando de instalación: `npm ci`. Build: `npm run build`. Salida: **`dist`**. Usa Node 22.
4. Publica. Se incluye `vercel.json` con esos valores y caché desactivada para `config.json`.

[Guía oficial de Vercel para Vite](https://vercel.com/docs/frameworks/frontend/vite).

## Publicar en Render

1. Sube el proyecto a tu repositorio e ingresa a Render.
2. Crea un **Static Site** conectado al repositorio.
3. Root Directory: la carpeta que contiene `package.json` (vacía si está en la raíz del repositorio).
4. Build Command: `npm ci && npm run build`.
5. Publish Directory: **`dist`**. Usa Node 22; `.nvmrc` deja declarada esa rama.
6. Publica. No se necesita Start Command, servicio de backend, base de datos ni variables secretas.

La navegación usa anclas dentro de una sola página; no requiere reglas de rutas SPA adicionales. [Guía oficial de sitios estáticos en Render](https://render.com/tutorials/web-service-vs-static-site/static-sites).

## Qué incluye

- Portada fotográfica, tipografía editorial y navegación por capítulos.
- Historia con desplazamiento horizontal y pinning en escritorio amplio; lectura vertical en teléfono.
- Parallax, apariciones suaves y expansión de imagen con GSAP ScrollTrigger.
- Especies, contexto histórico, evidencia interactiva, impacto, legislación y conclusiones.
- Gráfico del censo de **2019 entre Arica y Aysén**, con ámbito y límites explícitos.
- Galería ampliable con Escape, navegación por teclado y retorno de foco.
- YouTube bajo demanda, CTA de NotebookLM y configuración externa editable.
- Juego de cinco decisiones con explicaciones, fuentes, puntuación y reinicio.
- Responsabilidades individuales, escolares e institucionales, según el enfoque de la pauta.
- Doce referencias, créditos fotográficos, foto del liceo y créditos del grupo.

## Estructura

```text
costa-viva/
├── public/
│   ├── config.json             # CAMBIAR AQUÍ los enlaces audiovisuales
│   ├── favicon.svg
│   └── images/                 # Fotos WebP locales y versión móvil
├── src/
│   ├── App.tsx                 # Recorrido documental y créditos
│   ├── main.tsx                # Entrada y tipografías locales
│   ├── styles.css              # Diseño y adaptación por tamaño
│   ├── components/             # Navegación, historia, datos, galería, medios, juego
│   ├── data/
│   │   ├── research.ts         # Referencias, cifras, hitos y preguntas
│   │   └── photos.ts           # Metadatos y licencias de fotografías
│   └── lib/                    # Juego, validación multimedia y animaciones
├── docs/                       # Investigación, decisiones y licencias
├── tests/                      # Lógica y recorrido real en navegador
├── dist/                       # Web compilada lista para alojamiento estático
├── package.json
├── package-lock.json           # Versiones exactas para npm ci
├── vite.config.ts
├── vitest.config.ts
├── playwright.config.ts
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
└── vercel.json
```

## Stack y rendimiento

React 19, TypeScript, Vite 6, Tailwind 3, CSS editorial, GSAP y Lucide. Se eligió una aplicación estática porque este proyecto no necesita un servidor de Next.js. Usa una sola biblioteca de animación: no superpone GSAP, Framer Motion y Lenis. El desplazamiento conserva el comportamiento del navegador.

Las fotos y fuentes están dentro del proyecto. La portada tiene prioridad de carga; las demás imágenes usan carga diferida y dimensiones reservadas. GSAP anima principalmente transformaciones y opacidad. El pin horizontal solo se activa desde 1000 px de ancho y 650 px de alto. Se respeta inicialmente `prefers-reduced-motion` y se puede cambiar la preferencia desde el botón de pausa del encabezado. Cambiar de tamaño desmonta y reconstruye las animaciones necesarias.

Los 60 fps no son una garantía universal: dependen del equipo y del navegador. Consulta `docs/VERIFICACION.md` para los controles ejecutados y sus límites.

## Pruebas

```bash
npm test
npm run build
```

Para las pruebas en navegador, inicia la vista previa en el puerto 4173 en otra terminal y prepara Chromium:

```bash
npx playwright install chromium
npm run test:browser
```

Si prefieres el Chrome que ya tienes instalado, en Linux/macOS:

```bash
PLAYWRIGHT_CHANNEL=chrome npm run test:browser
```

En PowerShell: `$env:PLAYWRIGHT_CHANNEL="chrome"; npm run test:browser`. Puedes cambiar la URL de prueba mediante `PLAYWRIGHT_BASE_URL`.

## Antes de la feria

Reemplacen los recursos temporales y prueben los enlaces en una ventana sin sesión iniciada. El video final debe durar **2–3 minutos** y el podcast **3–5 minutos**, según la pauta. Añadan subtítulos/transcripción al contenido final. La web no fabrica esos materiales ni valida su duración.

Revisen la investigación en `docs/INVESTIGACION.md` y las referencias enlazadas para poder explicar las cifras y sus límites. Prueben con el teléfono y la conexión que usarán ese día. Con un servidor local, los textos, fotos y juego no necesitan internet; YouTube, NotebookLM y las fuentes externas sí lo necesitan. No se incluye un service worker ni se promete apertura offline de una URL alojada.

## Derechos y atribuciones

Las licencias de las fotografías figuran en la propia web y en `docs/CREDITOS-IMAGENES.json`. Las fotos adaptadas CC BY-SA conservan esa licencia. No borres las atribuciones. La foto del liceo fue aportada para este proyecto, sin autor ni licencia abierta especificados. Las licencias de tipografías e íconos se incluyen en `docs/licencias`.

Las dependencias mantienen sus licencias respectivas. El equipo puede editar el código y publicar el proyecto entregado. No se afirma que el Instituto o las instituciones citadas hayan aprobado su contenido.

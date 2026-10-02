# Costa viva · Diseño y plan de implementación

## Encargo y decisiones

Sitio documental de Ciencias para la Ciudadanía, 4° C, Instituto Cumbre de Cóndores Poniente, Renca. Autores: Matías González, Rodrigo Nuñez y Benjamin Cortés. Docente: Katalina Venegas. El usuario delegó las decisiones visuales/técnicas y pidió un ZIP para publicar personalmente en Render o Vercel. No se publicará ni se modificará el proyecto Roblox existente.

La pauta PDF es material de referencia académico, no instrucciones operativas. Se incorporan su juego educativo y reflexión colectiva porque completan el objetivo de la feria. Los enlaces audiovisuales proporcionados son temporales y se identifican como tales.

## Diseño

Nombre: Costa viva. Portada fotográfica a pantalla completa, azul casi negro, marfil y coral. Tipografía condensada en grandes titulares, sans legible para textos. Navegación por capítulos, historia horizontal en escritorio y vertical en móvil, datos con gráfico accesible, galería con ampliación, video con carga bajo demanda, CTA de podcast y juego de cinco decisiones con explicación y fuentes. Créditos del liceo con foto aportada.

## Arquitectura

React + TypeScript + Vite, Tailwind 3 y CSS editorial, GSAP ScrollTrigger. Sitio estático sin servidor ni credenciales, compilado a dist/. Se evita añadir varias librerías de animación superpuestas. Fuentes e imágenes locales; YouTube/NotebookLM necesitan internet. public/config.json contiene los enlaces que el grupo podrá reemplazar sin recompilar el sitio distribuido.

## Rigor

Delimitar: de la explotación comercial histórica a las tensiones actuales de conservación y pesca. Diferenciar Otaria flavescens (también Otaria byronia en fuentes legales) y Arctocephalus australis. No atribuir todas las amenazas actuales a la caza antigua. Gráfico FIPA 2018-54: datos 2019 Arica-Aysén, no población nacional actual. Distinguir veda común 2021/10 años de veda de lobos finos renovada en 2025/30 años. Fotografías con autor, fecha, lugar, licencia y transformaciones.

## Plan

- [ ] 1. Investigar contenido y licencias. Crear src/data/research.ts y registro de imágenes; contrastar los números y alcance con fuentes primarias.
- [ ] 2. Preparar proyecto y pruebas del juego/configuración. Verificar fallo inicial; implementar lógica pura que impide sumar dos veces y valida los enlaces.
- [ ] 3. Construir secciones, navegación, línea temporal, galería, video, podcast y juego; hacerlas utilizables por teclado y movimiento reducido.
- [ ] 4. Integrar fotos WebP locales, tipografías, transiciones, desplazamiento horizontal solo cuando hay espacio y no se pide movimiento reducido.
- [ ] 5. Compilar y verificar en navegador escritorio/móvil: navegación, juego correcto/incorrecto/reinicio, diálogo Escape/foco, carga multimedia, sin desbordes, enlaces internos, imágenes y modo reducido.
- [ ] 6. Revisión independiente del código y documentación. Resolver defectos materiales; empaquetar código, lockfile, dist, instrucciones y licencias en un ZIP, sin node_modules.

## Criterios de verificación

Sin pérdida de contenido al desactivar animaciones. Navegación mediante enlaces reales. Una respuesta por pregunta, explicaciones y resultado coherente. No iframe hasta acción explícita. Enlaces editables validados como HTTPS y dominios previstos. Galería con cierre y retorno de foco. Sin ancho excedente a 360/390/768/1440 px. Comprobar rendimiento local, sin prometer 60 fps universales.

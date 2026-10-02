import { useEffect, useState } from 'react';
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  BookOpen,
  Fish,
  MapPin,
  ShieldCheck,
  Waves,
} from 'lucide-react';
import { Header } from './components/Header';
import { Timeline } from './components/Timeline';
import { Evidence } from './components/Evidence';
import { ScrollFrameSequence } from './components/ScrollFrameSequence';
import { Gallery } from './components/Gallery';
import { Media } from './components/Media';
import { Game } from './components/Game';
import { Eyebrow, External, Source } from './components/Shared';
import { sources } from './data/research';
import { photos } from './data/photos';
import { useScrollStory } from './lib/useScrollStory';

export function App() {
  const [motion, setMotion] = useState(
    () => !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const change = () => setMotion(!query.matches);
    query.addEventListener('change', change);
    return () => query.removeEventListener('change', change);
  }, []);
  useEffect(() => {
    document.documentElement.dataset.motion = motion ? 'full' : 'reduced';
  }, [motion]);
  useScrollStory(motion);

  return (
    <>
      <Header motion={motion} toggleMotion={() => setMotion(!motion)} />
      <main id="contenido">
        <section id="inicio" className="hero" aria-labelledby="hero-title">
          <picture className="hero-photo">
            <source media="(max-width: 700px)" srcSet="./images/colony-small.webp" />
            <img
              src="./images/colony.webp"
              alt="Islote con una colonia de lobos marinos en el océano, cerca de Puñihuil, Chiloé, Chile."
              width="2200"
              height="1467"
              fetchPriority="high"
            />
          </picture>
          <div className="hero-shade" aria-hidden="true" />
          <div className="hero-content section-shell">
            <div className="hero-kicker">
              <span className="tiny-dot" />
              <span>UNA HISTORIA DE NUESTRA COSTA</span>
              <span className="hero-edition">FERIA CIENTÍFICA · 4° C</span>
            </div>
            <h1 id="hero-title" className="hero-title">
              <span>EL MAR</span>
              <span>
                NO <em>OLVIDA.</em>
              </span>
            </h1>
            <div className="hero-bottom">
              <div>
                <p className="hero-subtitle">La caza de lobos marinos en Chile.</p>
                <p>
                  Una historia de explotación.
                  <br />
                  Un presente que podemos cambiar.
                </p>
                <a href="#problema" className="button button-coral">
                  Explorar la historia <ArrowDown size={18} aria-hidden="true" />
                </a>
              </div>
              <div className="hero-location">
                <MapPin size={17} aria-hidden="true" />
                <span>
                  PUÑIHUIL, CHILOÉ
                  <br />
                  <small>VIDA EN EL PACÍFICO SUR</small>
                </span>
              </div>
            </div>
          </div>
          <div className="hero-caption">
            <a href="#creditos-fotos">Fotografía: Charles J. Sharp · CC BY-SA 4.0</a>
            <span>
              DESPLÁZATE PARA DESCUBRIR <ArrowDown size={13} aria-hidden="true" />
            </span>
          </div>
        </section>

        <div className="chapter-strip" aria-label="Recorrido de la experiencia">
          <span>UNA COSTA.</span>
          <span>DOS ESPECIES.</span>
          <span>UNA RESPONSABILIDAD COMPARTIDA.</span>
          <Waves size={27} aria-hidden="true" />
        </div>

        <section
          id="problema"
          className="intro-section section-shell"
          aria-labelledby="intro-title"
        >
          <Eyebrow number="01">CONOCER PARA COMPRENDER</Eyebrow>
          <div className="intro-grid">
            <h2 id="intro-title" data-reveal>
              NO SON
              <br />
              INTRUSOS.
              <br />
              <span className="outlined-title">ES SU HOGAR.</span>
            </h2>
            <div className="intro-copy" data-reveal>
              <p className="lead">
                Compartimos el litoral con animales que forman parte de su historia y de su vida.
              </p>
              <p>
                Los lobos marinos son mamíferos: respiran aire, amamantan a sus crías y descansan en
                tierra. Se alimentan en el mar y se agrupan en loberas de roqueríos, islas y playas.{' '}
                <Source id="comun" />
              </p>
              <p>
                Este proyecto investiga{' '}
                <strong>
                  la explotación comercial histórica en Chile y los desafíos actuales de convivencia
                  con la pesca
                </strong>
                . La caza dirigida, la captura accidental y las amenazas sanitarias son problemas
                diferentes: distinguirlos es el primer paso para actuar.
              </p>
              <a className="text-link" href="#especies">
                Conoce a sus protagonistas <ArrowDown size={17} aria-hidden="true" />
              </a>
            </div>
          </div>
          <div id="especies" className="species-grid">
            <article className="species-card" data-reveal>
              <div className="species-image">
                <img
                  src="./images/portrait.webp"
                  alt={photos[1].alt}
                  width="1063"
                  height="1600"
                  loading="lazy"
                />
                <span>01 / LOBO DE UN PELO</span>
              </div>
              <div className="species-copy">
                <span className="eyebrow">OTARIA FLAVESCENS</span>
                <h3>Lobo marino común</h3>
                <p>
                  Robusto, con marcada diferencia de tamaño entre sexos. El macho adulto presenta
                  una melena característica. Habita el litoral chileno y tiene una dieta variada.{' '}
                  <Source id="comun" />
                </p>
                <p className="fine-print">
                  También llamado <i>Otaria byronia</i> en las fuentes legales y científicas
                  consultadas.
                </p>
                <a className="text-link" href="#creditos-fotos">
                  Los Molles, Chile · Mar del Sur <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              </div>
            </article>
            <article className="species-card" data-reveal>
              <div className="species-image fur-image">
                <img
                  src="./images/fur-seal.webp"
                  alt={photos[2].alt}
                  width="1400"
                  height="965"
                  loading="lazy"
                />
                <span>02 / LOBO DE DOS PELOS</span>
              </div>
              <div className="species-copy">
                <span className="eyebrow">ARCTOCEPHALUS AUSTRALIS</span>
                <h3>Lobo fino austral</h3>
                <p>
                  Más pequeño y de hocico más afinado. Su pelaje denso, de dos capas, fue
                  especialmente valorado por el comercio de pieles. Su historia es central en la
                  explotación de los mares australes. <Source id="fino" />
                  <Source id="historia" />
                </p>
                <p className="fine-print">
                  Dos especies del proyecto; no son los únicos otáridos presentes en Chile.
                </p>
                <a className="text-link" href="#creditos-fotos">
                  Foto de referencia: Uruguay · J. Clavijo Ferraro{' '}
                  <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              </div>
            </article>
          </div>
        </section>

        <Timeline />
        <Evidence />
        <ScrollFrameSequence
          id="encuentro"
          motion={motion}
          sequenceName="playful"
          frameCount={26}
          ariaLabel="Secuencia visual controlada por el scroll con un lobo marino"
          eyebrow="UN ENCUENTRO QUE CAMBIA EL RITMO"
          title={["BAJA Y", "MIRA CÓMO", "COBRA VIDA JEJE."]}
          body="Puedes jugar con la rueda del mouse para ver a nuestro pequeño amigo feliz :)"
          points={[
            'Trata bien a la fauna para que nuestro amigo y los de su especie sean felices.',
          ]}
          kicker="SECUENCIA 01 · COSTA VIVA"
          caption="Lobo marino feliz :)"
          align="left"
        />

        <section className="immersive-image" aria-label="Reflexión sobre el litoral">
          <img
            src="./images/colony.webp"
            alt="Lobería de Puñihuil, un hábitat compartido por animales marinos y aves."
            width="2200"
            height="1467"
            loading="lazy"
          />
          <div className="immersive-overlay" />
          <div className="immersive-copy">
            <Eyebrow>UN ECOSISTEMA NO ES UNA SUMA DE RECURSOS</Eyebrow>
            <p>
              CUANDO CAMBIA UNA VIDA,
              <br />
              CAMBIA <span>SU ENTORNO.</span>
            </p>
            <a href="#impacto" className="circle-link" aria-label="Explorar el impacto ecológico">
              <ArrowDown aria-hidden="true" />
            </a>
          </div>
        </section>

        <section
          id="impacto"
          className="impact-section section-shell"
          aria-labelledby="impact-title"
        >
          <Eyebrow number="04">POR QUÉ DEBERÍA IMPORTARNOS</Eyebrow>
          <div className="section-heading">
            <h2 id="impact-title">
              EL IMPACTO
              <br />
              NO TERMINA EN EL AGUA.
            </h2>
            <p className="section-description">
              Biodiversidad, trabajo y salud.
              <br />
              Una misma costa, distintas necesidades.
            </p>
          </div>
          <div className="impact-grid">
            <article data-reveal>
              <Fish className="impact-icon" aria-hidden="true" />
              <span className="eyebrow">DIMENSIÓN ECOLÓGICA</span>
              <h3>Una red de relaciones.</h3>
              <p>
                Los lobos marinos consumen peces y otros organismos. Cambios en sus poblaciones
                pueden modificar relaciones alimentarias, pero el efecto depende del lugar y de la
                red trófica: no equivale automáticamente a más peces para pescar.{' '}
                <Source id="comun" />
              </p>
            </article>
            <article data-reveal>
              <Waves className="impact-icon" aria-hidden="true" />
              <span className="eyebrow">DIMENSIÓN SOCIAL Y ECONÓMICA</span>
              <h3>Convivir tiene desafíos.</h3>
              <p>
                Las interacciones con pesquerías y centros de cultivo pueden generar pérdidas de
                capturas, daños y riesgos para los animales. Reconocer el trabajo de las comunidades
                pesqueras es parte de buscar soluciones. <Source id="interacciones" />
              </p>
            </article>
            <article data-reveal>
              <ShieldCheck className="impact-icon" aria-hidden="true" />
              <span className="eyebrow">PRESIONES ACTUALES</span>
              <h3>Proteger exige mirar más.</h3>
              <p>
                La captura incidental y las enfermedades requieren respuestas propias. En 2023,
                Sernapesca confirmó el primer caso de influenza aviar en un lobo marino en Chile.
                Ese hecho no debe atribuirse a la caza histórica. <Source id="captura" />
                <Source id="influenza" />
              </p>
            </article>
          </div>
          <div className="impact-conclusion">
            <span>LA PREGUNTA DE FONDO</span>
            <p>
              ¿Cómo protegemos la biodiversidad
              <br />
              sin ignorar a quienes viven del mar?
            </p>
          </div>
        </section>

        <section id="legislacion" className="law-section section-shell" aria-labelledby="law-title">
          <div className="law-intro">
            <Eyebrow number="05">DE LA NORMA A LA PROTECCIÓN</Eyebrow>
            <h2 id="law-title">
              PROTEGER
              <br />
              TAMBIÉN ES
              <br />
              <span className="outlined-title">CUMPLIR.</span>
            </h2>
            <p>
              El marco central es la <strong>Ley General de Pesca y Acuicultura</strong> y sus
              medidas de conservación. Para estas especies marinas, no basta con citar genéricamente
              la Ley de Caza. <Source id="veda-comun" />
              <Source id="veda-fino" />
            </p>
            <div className="law-stamp">
              <ShieldCheck size={23} aria-hidden="true" />
              <span>
                NORMATIVA CONSULTADA
                <br />
                <strong>1 DE OCTUBRE DE 2026</strong>
              </span>
            </div>
          </div>
          <div className="law-list">
            <details open>
              <summary>
                <span className="law-number">01</span>
                <span>
                  Lobo marino común<small>DECRETO EXENTO N° 4 · 2021</small>
                </span>
                <span className="details-plus" aria-hidden="true">
                  +
                </span>
              </summary>
              <div className="law-detail">
                <p>
                  Veda extractiva por diez años desde el 27 de enero de 2021. También restringe la
                  tenencia, transporte y comercialización de ejemplares o partes provenientes de
                  extracción. Contempla excepciones reguladas, incluido un uso consuetudinario
                  específico de la comunidad Kawésqar de Puerto Edén. <Source id="veda-comun" />
                </p>
              </div>
            </details>
            <details>
              <summary>
                <span className="law-number">02</span>
                <span>
                  Lobo fino austral<small>DECRETO EXENTO FOLIO 202500204 · 2025</small>
                </span>
                <span className="details-plus" aria-hidden="true">
                  +
                </span>
              </summary>
              <div className="law-detail">
                <p>
                  Incluido en la veda renovada por treinta años desde el 11 de noviembre de 2025. La
                  norma prevé autorizaciones fundadas para situaciones como investigación y rescate,
                  y exige complementar la protección con reducción de captura incidental.{' '}
                  <Source id="veda-fino" />
                </p>
              </div>
            </details>
            <details>
              <summary>
                <span className="law-number">03</span>
                <span>
                  Comercio internacional<small>CITES · UN ALCANCE DIFERENTE</small>
                </span>
                <span className="details-plus" aria-hidden="true">
                  +
                </span>
              </summary>
              <div className="law-detail">
                <p>
                  El lobo fino austral figura bajo <i>Arctocephalus</i> en el Apéndice II de CITES,
                  según la guía FAO/CITES consultada. Esto regula el comercio internacional; no
                  sustituye las vedas chilenas ni significa permiso para cazar. Para una operación
                  real, deben revisarse los apéndices vigentes. <Source id="cites" />
                </p>
              </div>
            </details>
            <p className="law-note">
              Una veda necesita fiscalización, seguimiento científico y medidas de convivencia para
              traducirse en protección efectiva. <Source id="veda-fino" />
            </p>
          </div>
        </section>

        <Gallery />
        <ScrollFrameSequence
          id="mirada"
          motion={motion}
          sequenceName="curious"
          frameCount={18}
          ariaLabel="Pequeño lobo marino chistoso"
          eyebrow="OBSERVAR TAMBIÉN ES APRENDER"
          title={["NO ES SOLO", "PAISAJE:", "ES FAUNA."]}
          body=""
          points={[
            '-Joven lobo marino',
          ]}
          kicker="SECUENCIA 02 · MIRAR CON DISTANCIA"
          caption=""
          align="right"
        />
        <Media />
        <Game />

        <section
          id="acciones"
          className="actions-section section-shell"
          aria-labelledby="actions-title"
        >
          <Eyebrow number="09">LO QUE VIENE DEPENDE DE TODOS</Eyebrow>
          <div className="section-heading">
            <h2 id="actions-title">
              DEL ASOMBRO
              <br />
              <span>A LA ACCIÓN.</span>
            </h2>
            <p className="section-description">
              Desde Renca también podemos participar:
              <br />
              aprender, comunicar y exigir decisiones informadas.
            </p>
          </div>
          <div className="actions-grid">
            <article>
              <span className="action-number">01</span>
              <h3>Como visitantes</h3>
              <p>
                Observa desde al menos 50 metros, sin alimentar ni tocar a los animales. Mantén
                alejadas a las mascotas. Ante un animal herido o en peligro, avisa a Sernapesca.{' '}
                <Source id="convivencia" />
              </p>
              <a className="text-link" href="tel:800320032">
                Sernapesca: 800 320 032 <ArrowUpRight size={17} aria-hidden="true" />
              </a>
            </article>
            <article>
              <span className="action-number">02</span>
              <h3>Como comunidad escolar</h3>
              <p>
                Contrasta las cifras antes de compartirlas. Usa la feria para conversar sobre las
                diferencias entre caza, pesca incidental y conservación. Una buena pregunta vale más
                que una cifra sin contexto.
              </p>
              <a className="text-link" href="#fuentes">
                Empieza por las fuentes <ArrowRight size={17} aria-hidden="true" />
              </a>
            </article>
            <article>
              <span className="action-number">03</span>
              <h3>Como sociedad</h3>
              <p>
                Se necesitan registros de captura incidental, evaluación de medidas de mitigación,
                fiscalización y participación de las comunidades pesqueras. La responsabilidad no
                termina en los hábitos individuales. <Source id="captura" />
                <Source id="veda-fino" />
              </p>
              <a className="text-link" href="#legislacion">
                Conoce las medidas de protección <ArrowRight size={17} aria-hidden="true" />
              </a>
            </article>
          </div>
          <div className="closing-thought">
            <span className="eyebrow">NUESTRA CONCLUSIÓN</span>
            <p>
              Conocer lo que hicimos con el mar
              <br />
              es el primer paso para decidir
              <br />
              <em>cómo queremos convivir con él.</em>
            </p>
          </div>
        </section>

        <section
          id="fuentes"
          className="sources-section section-shell"
          aria-labelledby="sources-title"
        >
          <div className="section-heading">
            <div>
              <Eyebrow number="10">CIENCIA QUE SE PUEDE CONSULTAR</Eyebrow>
              <h2 id="sources-title">
                NADA DE ESTO
                <br />
                SE SOSTIENE SOLO.
              </h2>
            </div>
            <div className="section-description">
              <BookOpen size={28} aria-hidden="true" />
              <p>
                Fuentes académicas y oficiales.
                <br />
                Consulta de contenidos: 01.10.2026.
              </p>
              <p className="fine-print">
                Síntesis educativa: no se realizó un censo propio ni se estimó una cifra total de
                animales cazados.
              </p>
            </div>
          </div>
          <div className="source-list">
            {sources.map((source) => (
              <article id={`fuente-${source.id}`} className="source-item" key={source.id}>
                <span className="source-number">{source.number}</span>
                <div>
                  <span className="eyebrow">{source.author}</span>
                  <External href={source.url} className="source-title">
                    {source.title}
                  </External>
                  <p>{source.publisher}</p>
                  <p className="source-use">{source.use}</p>
                </div>
              </article>
            ))}
          </div>
          <details id="creditos-fotos" className="photo-credits">
            <summary>Fotografías, licencias y créditos visuales</summary>
            <p>
              Imágenes redimensionadas y convertidas a WebP. Las vistas de portada y tarjetas usan
              recortes visuales y superposición de color; la galería ampliada conserva la imagen
              completa. Las adaptaciones CC BY-SA se distribuyen bajo su misma licencia.
            </p>
            {photos.map((photo) => (
              <div key={photo.id} className="photo-credit-row">
                <strong>{photo.title}</strong>
                <p>{photo.caption}</p>
                <p>
                  {photo.author} ·{' '}
                  <a href={photo.licenseUrl} target="_blank" rel="noopener noreferrer">
                    {photo.license}
                  </a>
                </p>
                <External href={photo.source} className="text-link">
                  Archivo original
                </External>
              </div>
            ))}
            <p>
              Fotografía del liceo: aportada por el equipo para este proyecto; autor no indicado. Se
              incluye con ese alcance, sin atribuirle una licencia abierta. Tipografías Barlow
              Condensed y DM Sans: SIL Open Font License. Íconos Lucide: ISC.
            </p>
          </details>
        </section>

        <footer className="site-footer">
          <div className="footer-school section-shell">
            <img
              src="./images/liceo.webp"
              alt="Patio del Instituto Cumbre de Cóndores Poniente, fotografía aportada por el equipo."
              width="1080"
              height="720"
              loading="lazy"
            />
            <div>
              <Eyebrow>DESDE RENCA, MIRAMOS HACIA EL MAR</Eyebrow>
              <h2>
                CIENCIA PARA
                <br />
                COMPARTIR.
              </h2>
              <p>
                Instituto Cumbre de Cóndores Poniente
                <br />
                4° C · Ciencias para la Ciudadanía y Desarrollo de aplicaciones WEB
              </p>
              <div className="team-credits">
                <div>
                  <span className="eyebrow">EQUIPO</span>
                  <p>
                    Matías González
                    <br />
                    Rodrigo Nuñez
                    <br />
                    Benjamin Cortés
                  </p>
                </div>
                <div>
                  <span className="eyebrow">DOCENTES</span>
                  <p>Katalina Venegas 
                    <br />
                    Marco González
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-bottom section-shell">
            <a className="brand footer-brand-school" href="#inicio" aria-label="Instituto Cumbre de Cóndores Poniente, volver al inicio">
              <img src="./images/liceo-logo.webp" alt="" width="46" height="46" />
              <span>
                COSTA<span className="brand-light">VIVA</span>
              </span>
            </a>
            <span>FERIA CIENTÍFICA · RENCA, CHILE · 2026</span>
            <a href="#inicio" className="text-link">
              Volver al inicio <ArrowUp size={17} aria-hidden="true" />
            </a>
          </div>
        </footer>
      </main>
    </>
  );
}

import { ArrowDown, ArrowRight } from 'lucide-react';
import { timeline } from '../data/research';
import { Eyebrow, Source } from './Shared';

export function Timeline() {
  return (
    <section id="historia" className="history-section" aria-labelledby="history-title">
      <div className="history-intro section-shell">
        <Eyebrow number="02">MEMORIA DEL LITORAL</Eyebrow>
        <div className="section-heading">
          <h2 id="history-title">
            EL PRECIO
            <br />
            DE UNA PIEL.
          </h2>
          <div className="section-description">
            <p>
              Para entender el presente, hay que volver a los puertos, las bitácoras y las
              decisiones que cambiaron nuestra costa.
            </p>
            <a className="text-link" href="#evidencia">
              Saltar a la evidencia <ArrowDown size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
      <div className="timeline-stage">
        <div className="timeline-track">
          <figure className="timeline-photo">
            <img
              src="./images/historical.webp"
              alt="Punta Arenas y su puerto en una fotografía publicada en 1912."
              width="1400"
              height="927"
              loading="lazy"
            />
            <figcaption>
              <span className="eyebrow">ARCHIVO · PUNTA ARENAS</span>
              <p>
                Un puerto conectado
                <br />
                con el mundo.
              </p>
              <small>
                Publicada en 1912 · N. O. Winter, según Commons.
                <br />
                Imagen de contexto; no muestra caza. <a href="#creditos-fotos">Créditos</a>
              </small>
            </figcaption>
          </figure>
          {timeline.map((item, i) => (
            <article className="timeline-card" key={item.year}>
              <div className="timeline-top">
                <span>HITO 0{i + 1}</span>
                <ArrowRight size={18} aria-hidden="true" />
              </div>
              <p className="timeline-year">{item.year}</p>
              <div className="timeline-rule" aria-hidden="true">
                <span />
              </div>
              <p className="eyebrow">{item.label}</p>
              <h3>{item.title}</h3>
              <p>
                {item.text} <Source id={item.source} />
              </p>
            </article>
          ))}
        </div>
        <div className="timeline-bottom">
          <span>DE LA EXTRACCIÓN A LA PROTECCIÓN</span>
          <span className="scroll-hint">
            SIGUE BAJANDO PARA AVANZAR <ArrowRight size={15} aria-hidden="true" />
          </span>
        </div>
      </div>
    </section>
  );
}

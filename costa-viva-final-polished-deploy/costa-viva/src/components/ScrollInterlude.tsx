import { ArrowDownRight } from 'lucide-react';
import { Eyebrow } from './Shared';

export function ScrollInterlude({ motion }: { motion: boolean }) {
  return (
    <section className="scroll-cinema" aria-label="Encuentro visual con los lobos marinos">
      <div className="scroll-cinema-pin">
        <div className="scroll-cinema-word scroll-cinema-word-a" aria-hidden="true">
          COSTA
        </div>
        <div className="scroll-cinema-word scroll-cinema-word-b" aria-hidden="true">
          VIVA
        </div>

        <figure className="scroll-cinema-media scroll-cinema-media-primary">
          <img
            src={motion ? './images/sea-lion-playful.gif' : './images/portrait.webp'}
            alt="Lobo marino de un pelo sobre una superficie rocosa, observado en un primer plano animado."
            width="480"
            height="480"
            loading="lazy"
          />
          <figcaption>MIRARLOS DE CERCA TAMBIÉN CAMBIA LA HISTORIA</figcaption>
        </figure>

        <figure className="scroll-cinema-media scroll-cinema-media-secondary" aria-hidden="true">
          <img
            src={motion ? './images/sea-lion-curious.gif' : './images/fur-seal.webp'}
            alt=""
            width="376"
            height="480"
            loading="lazy"
          />
        </figure>

        <div className="scroll-cinema-copy">
          <Eyebrow>NO ES DECORACIÓN. ES VIDA SILVESTRE.</Eyebrow>
          <p>
            EL MAR NO ES
            <br />
            <span>UN FONDO.</span>
          </p>
          <small>
            Esta experiencia usa tus GIFs como pausas visuales para que la página se sienta más
            viva, sin perder claridad ni rendimiento en móvil.
          </small>
        </div>

        <div className="scroll-cinema-index" aria-hidden="true">
          <span>02.5</span>
          <ArrowDownRight size={20} />
        </div>
      </div>
    </section>
  );
}

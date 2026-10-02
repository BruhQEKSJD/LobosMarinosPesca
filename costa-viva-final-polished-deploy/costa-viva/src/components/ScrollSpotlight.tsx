import { ArrowDownRight } from 'lucide-react';
import { Eyebrow } from './Shared';

export function ScrollSpotlight({ motion }: { motion: boolean }) {
  return (
    <section className="scroll-spotlight" aria-labelledby="spotlight-title">
      <div className="scroll-spotlight-pin">
        <div className="scroll-spotlight-glow" aria-hidden="true" />

        <div className="scroll-spotlight-copy">
          <Eyebrow number="06.5">UN ENCUENTRO CAMBIA LA MIRADA</Eyebrow>
          <h2 id="spotlight-title">
            NO ES UN
            <br />
            <span>ADORNO COSTERO.</span>
          </h2>
          <p>
            Mirarlos como fauna silvestre — y no como paisaje o estorbo — cambia la forma en que
            hablamos de pesca, convivencia y protección.
          </p>
          <ul className="scroll-spotlight-points">
            <li>Descansan en tierra, se alimentan en el mar y usan loberas específicas.</li>
            <li>Las crías y los periodos sensibles requieren distancia y observación responsable.</li>
            <li>Una costa viva se entiende mejor cuando dejamos de verla como telón de fondo.</li>
          </ul>
        </div>

        <div className="scroll-spotlight-stack" aria-hidden="true">
          <figure className="scroll-spotlight-frame scroll-spotlight-frame-a">
            <img
              src={motion ? './images/sea-lion-curious.gif' : './images/portrait.webp'}
              alt=""
              width="720"
              height="960"
              loading="lazy"
            />
          </figure>
          <figure className="scroll-spotlight-frame scroll-spotlight-frame-b">
            <img
              src="./images/colony.webp"
              alt=""
              width="2200"
              height="1467"
              loading="lazy"
            />
          </figure>
        </div>

        <div className="scroll-spotlight-rail" aria-hidden="true">
          <span>OBSERVAR</span>
          <span>RESPETAR</span>
          <span>CONVIVIR</span>
          <ArrowDownRight size={18} />
        </div>
      </div>
    </section>
  );
}

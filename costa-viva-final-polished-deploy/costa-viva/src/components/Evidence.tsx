import { useState } from 'react';
import { ArrowUpRight, Info } from 'lucide-react';
import { regions } from '../data/research';
import { Eyebrow, Source } from './Shared';
const number = (n: number) => new Intl.NumberFormat('es-CL').format(n);

export function Evidence() {
  const [active, setActive] = useState<number | null>(null);
  return (
    <section id="evidencia" className="evidence section-shell" aria-labelledby="evidence-title">
      <Eyebrow number="03">LA EVIDENCIA</Eyebrow>
      <div className="section-heading">
        <h2 id="evidence-title">
          MIRAR DE CERCA.
          <br />
          <span className="muted-title">CONTAR CON RIGOR.</span>
        </h2>
        <p className="section-description">
          Una cifra no cuenta toda la historia.
          <br />
          Su fecha, lugar y método también importan.
        </p>
      </div>
      <div className="evidence-grid">
        <div className="stat-block">
          <span className="eyebrow">LOBO MARINO COMÚN · VERANO 2019</span>
          <p className="big-stat">123.301</p>
          <p className="stat-caption">
            individuos estimados <span>± 4.137</span>
          </p>
          <p>
            Entre Arica y Parinacota y Aysén.
            <br />
            No es un total nacional ni un conteo actual. <Source id="censo" />
          </p>
          <div className="small-stats">
            <div>
              <strong>216</strong>
              <span>loberas registradas</span>
            </div>
            <div>
              <strong>64</strong>
              <span>loberas reproductivas</span>
            </div>
          </div>
        </div>
        <figure className="chart-panel">
          <figcaption>
            <span>UN LITORAL, TRES MACROZONAS</span>
            <span>2019</span>
          </figcaption>
          <div
            className="chart"
            aria-label="Estimación de lobos marinos comunes por macrozona en 2019"
          >
            {regions.map((region, i) => (
              <button
                className={`chart-row ${active === i ? 'is-active' : ''}`}
                key={region.name}
                onClick={() => setActive(active === i ? null : i)}
                aria-pressed={active === i}
                aria-describedby="chart-detail"
              >
                <span className="chart-label">
                  <span>{region.name}</span>
                  <strong>
                    {number(region.count)} <ArrowUpRight size={14} aria-hidden="true" />
                  </strong>
                </span>
                <span className="chart-track" aria-hidden="true">
                  <span
                    className="chart-bar"
                    style={{
                      width: `${(region.count / 70000) * 100}%`,
                      backgroundColor: region.color,
                    }}
                  />
                </span>
              </button>
            ))}
          </div>
          <div id="chart-detail" className="chart-detail" aria-live="polite">
            {active === null ? (
              <>
                <Info size={16} aria-hidden="true" />
                <span>Selecciona una macrozona para conocer su alcance.</span>
              </>
            ) : (
              <span>
                <strong>{regions[active].area}</strong>
                <br />
                Estimación: {number(regions[active].count)} ± {number(regions[active].dispersion)}{' '}
                individuos.
              </span>
            )}
          </div>
          <p className="fine-print">
            Fuente: Universidad de Valparaíso / FIPA 2018-54, informe complementario, julio de 2019.
            «±» reproduce la dispersión informada; no se presenta como intervalo de confianza.{' '}
            <Source id="censo" />
          </p>
        </figure>
      </div>
      <details className="methodology">
        <summary>Cómo leer estos datos</summary>
        <p>
          Los autores combinaron censos fotográficos y correcciones de abundancia. El gráfico
          compara macrozonas de un mismo estudio; no representa muertes por caza ni una evolución
          histórica. Magallanes queda fuera de esta área. Los totales de otros informes pueden usar
          coberturas o métodos distintos. <Source id="censo" />
        </p>
      </details>
    </section>
  );
}

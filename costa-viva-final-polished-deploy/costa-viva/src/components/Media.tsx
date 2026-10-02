import { useEffect, useState } from 'react';
import { ArrowUpRight, Headphones, Play, Radio } from 'lucide-react';
import { parseMediaConfig, youtubeEmbed } from '../lib/media';
import type { MediaConfig } from '../lib/media';
import { Eyebrow, External } from './Shared';

export function Media() {
  const [config, setConfig] = useState<MediaConfig | null>(null);
  const [error, setError] = useState(false);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    const abort = new AbortController();
    fetch('./config.json', { cache: 'no-store', signal: abort.signal })
      .then((res) => {
        if (!res.ok) throw new Error('config');
        return res.json();
      })
      .then((data) => {
        const parsed = parseMediaConfig(data);
        if (!parsed) throw new Error('config');
        setConfig(parsed);
      })
      .catch(() => {
        if (!abort.signal.aborted) setError(true);
      });
    return () => abort.abort();
  }, []);
  const hasLocalAudio = Boolean(config?.audioSrc);

  return (
    <section id="multimedia" className="media-section section-shell" aria-labelledby="media-title">
      <div className="section-heading">
        <div>
          <Eyebrow number="08">OTRAS FORMAS DE ENTENDER</Eyebrow>
          <h2 id="media-title">
            MIRA. ESCUCHA.
            <br />
            CUESTIONA.
          </h2>
        </div>
        <p className="section-description">
          Una conversación que empieza
          <br />
          en la costa y llega hasta nuestra sala.
        </p>
      </div>
      {error && (
        <p role="alert" className="media-notice">
          No fue posible cargar la configuración audiovisual. Puedes continuar explorando la
          investigación y el desafío.
        </p>
      )}
      {config?.temporary && (
        <p className="media-notice">
          <Radio size={16} aria-hidden="true" />
          <span>
            <strong>Producción del equipo en preparación.</strong> El video y el audio pueden
            seguir en fase de prueba antes de la versión final.
          </span>
        </p>
      )}
      <div className="media-grid">
        <article className="video-card">
          <div className="video-frame">
            {playing && config ? (
              <iframe
                src={youtubeEmbed(config.videoUrl)!}
                title={
                  config.temporary
                    ? 'Video temporal de YouTube, enlace de prueba'
                    : 'Video de concientización del equipo Costa viva'
                }
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            ) : (
              <>
                <img
                  src="./images/colony-small.webp"
                  alt="Colonia de lobos marinos en Chiloé, imagen de portada de la sección de video."
                  width="1000"
                  height="667"
                  loading="lazy"
                />
                <button
                  className="play-button"
                  disabled={!config}
                  onClick={() => setPlaying(true)}
                  aria-label="Cargar video de YouTube"
                >
                  <Play size={28} fill="currentColor" aria-hidden="true" />
                </button>
                <span className="video-label">
                  {config?.temporary ? 'ENLACE TEMPORAL' : 'VIDEO DEL EQUIPO'}
                </span>
              </>
            )}
          </div>
          <div className="media-card-bottom">
            <div>
              <span className="eyebrow">VIDEO DE CONCIENTIZACIÓN</span>
              <h3>Una historia que nos toca.</h3>
            </div>
            {config && (
              <External href={config.videoUrl} className="circle-link">
                <span className="sr-only">Abrir video en YouTube</span>
              </External>
            )}
          </div>
          <p className="fine-print">
            El video se conecta a YouTube solo al pulsar reproducir. Si el proveedor bloquea el
            reproductor, ábrelo en YouTube. (video actual puesto para poder distribuir bien los tamaños de la pagina, proximamente añadiremos el video del trabajo)
          </p>
        </article>

        <article className="podcast-card podcast-card-local">
          <div className="podcast-top">
            <Headphones size={30} aria-hidden="true" />
            <span className="eyebrow">AUDIO</span>
          </div>

          <div className="waveform" aria-hidden="true">
            {Array.from({ length: 41 }, (_, i) => (
              <span
                key={i}
                style={{ height: `${18 + Math.abs(Math.sin(i * 1.9) * Math.cos(i * 0.23)) * 65}%` }}
              />
            ))}
          </div>

          <div>
            <span className="eyebrow">Desde 4c</span>
            <h3>
              ESCUCHA
              <br />
              <span>NUESTRO PODCAST.</span>
            </h3>
            <p>
              Una pieza sonora para complementar la investigación con voces, contexto y una
              mirada más cercana a la costa. (audio de prueba, proximamente agregaremos el podcast del trabajo)
            </p>
          </div>

          {hasLocalAudio ? (
            <div className="audio-player-shell">
              <span className="audio-kicker">{config?.audioTitle ?? 'Mini podcast del equipo'}</span>
              <audio controls preload="none" className="native-audio-player">
                <source src={config?.audioSrc} type={config?.audioType ?? 'audio/mpeg'} />
                Tu navegador no soporta el reproductor de audio.
              </audio>
              <p className="fine-print audio-credit">
                {config?.audioCredit ?? 'Archivo local cargado desde la carpeta public/audio.'}
              </p>
            </div>
          ) : (
            <div className="audio-placeholder" role="status">
              <span className="eyebrow">AUDIO DEL EQUIPO</span>
              <strong>Próximamente disponible</strong>
              <p>El reproductor quedará disponible aquí cuando se incorpore la pieza final.</p>
              {config?.podcastUrl && (
                <a
                  className="button button-coral"
                  href={config.podcastUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Abrir audio temporal
                  <ArrowUpRight size={19} aria-hidden="true" />
                  <span className="sr-only"> (nueva pestaña)</span>
                </a>
              )}
            </div>
          )}

          <p className="fine-print">
            
          </p>
        </article>
      </div>
    </section>
  );
}

import { useRef, useState } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import { photos } from '../data/photos';
import type { Photo } from '../data/photos';
import { Eyebrow, External } from './Shared';

export function Gallery() {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const [selected, setSelected] = useState<Photo>(photos[0]);
  function show(photo: Photo, button: HTMLButtonElement) {
    setSelected(photo);
    trigger.current = button;
    dialog.current?.showModal();
  }
  function close() {
    dialog.current?.close();
  }
  return (
    <section id="galeria" className="gallery-section section-shell" aria-labelledby="gallery-title">
      <div className="section-heading">
        <div>
          <Eyebrow number="06">CUADERNO VISUAL</Eyebrow>
          <h2 id="gallery-title">LA COSTA TIENE MEMORIA.</h2>
        </div>
        <p className="section-description">
          Fotografías reales.
          <br />
          Lugares, fechas y autores a la vista.
        </p>
      </div>
      <div className="gallery-grid">
        {photos.map((photo) => (
          <figure key={photo.id} className={`gallery-item photo-${photo.id}`}>
            <button
              className="gallery-image"
              onClick={(e) => show(photo, e.currentTarget)}
              aria-label={`Ampliar: ${photo.title}`}
            >
              <img
                src={`./${photo.src}`}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                loading="lazy"
              />
              <span className="gallery-expand">
                <ArrowUpRight size={21} aria-hidden="true" />
              </span>
            </button>
            <figcaption>
              <span className="eyebrow">{photo.place}</span>
              <h3>{photo.title}</h3>
              <p>
                {photo.author} ·{' '}
                <a href={photo.licenseUrl} target="_blank" rel="noopener noreferrer">
                  {photo.license}
                  <span className="sr-only"> (nueva pestaña)</span>
                </a>
              </p>
            </figcaption>
          </figure>
        ))}
      </div>
      <dialog
        ref={dialog}
        className="photo-dialog"
        aria-labelledby="photo-title"
        onClose={() => trigger.current?.focus()}
        onClick={(e) => {
          if (e.target === dialog.current) close();
        }}
      >
        <div className="photo-dialog-inner">
          <button className="dialog-close" onClick={close} aria-label="Cerrar fotografía">
            <X />
          </button>
          <img
            src={`./${selected.src}`}
            alt={selected.alt}
            width={selected.width}
            height={selected.height}
          />
          <div className="dialog-caption">
            <h3 id="photo-title">{selected.title}</h3>
            <p>{selected.caption}</p>
            <p>
              {selected.author} · {selected.license}
            </p>
            <External href={selected.source} className="text-link">
              Ver fotografía original y licencia
            </External>
          </div>
        </div>
      </dialog>
    </section>
  );
}

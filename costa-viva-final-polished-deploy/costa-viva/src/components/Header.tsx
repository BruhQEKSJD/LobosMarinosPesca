import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Menu, X, Pause, Play } from 'lucide-react';

const links = [
  ['problema', 'El problema'],
  ['historia', 'Historia'],
  ['evidencia', 'Evidencia'],
  ['multimedia', 'Ver y escuchar'],
  ['fuentes', 'Fuentes'],
];

export function Header({ motion, toggleMotion }: { motion: boolean; toggleMotion: () => void }) {
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const close = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [open]);
  return (
    <>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <header className="site-header">
        <a href="#inicio" className="brand brand-school" aria-label="Instituto Cumbre de Cóndores Poniente, inicio">
          <img
            src="./images/liceo-logo.webp"
            alt="Logo del Instituto Cumbre de Cóndores Poniente"
            width="64"
            height="64"
          />
          <span>
            INSTITUTO CUMBRE DE CÓNDORES
            <span className="brand-light">PONIENTE</span>
            <small>FERIA CIENTÍFICA · COSTA VIVA</small>
          </span>
        </a>
        <nav aria-label="Navegación principal" className="desktop-nav">
          {links.map(([id, title]) => (
            <a key={id} href={`#${id}`}>
              {title}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <button
            type="button"
            className="motion-toggle"
            onClick={toggleMotion}
            aria-pressed={!motion}
            aria-label={motion ? 'Reducir movimiento' : 'Activar animaciones'}
            title={motion ? 'Reducir movimiento' : 'Activar animaciones'}
          >
            {motion ? <Pause size={16} /> : <Play size={16} />}
          </button>
          <a href="#juego" className="nav-play">
            El desafío <ArrowUpRight size={15} aria-hidden="true" />
          </a>
          <button
            ref={menuButton}
            className="menu-toggle"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
        <nav id="mobile-nav" aria-label="Navegación móvil" className="mobile-nav" hidden={!open}>
          {[...links, ['juego', 'El desafío'], ['acciones', 'Qué podemos hacer']].map(
            ([id, title]) => (
              <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>
                {title}
                <ArrowUpRight size={20} aria-hidden="true" />
              </a>
            ),
          )}
        </nav>
      </header>
    </>
  );
}

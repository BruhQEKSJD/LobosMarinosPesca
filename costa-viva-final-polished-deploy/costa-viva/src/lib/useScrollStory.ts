import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Una sola biblioteca coordina el scroll. Sin interceptar rueda, teclado ni touch.
// matchMedia desmonta el pin y restaura estilos al cambiar de tamaño o preferencia.
export function useScrollStory(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;
    const media = gsap.matchMedia();
    // App resuelve la preferencia del sistema y la elección explícita del visitante.
    // No volvemos a consultar la preferencia aquí: CSS y GSAP deben coincidir.
    media.add('all', () => {
      gsap.from('.hero-title > span', {
        y: 55,
        opacity: 0,
        stagger: 0.14,
        duration: 1.1,
        ease: 'power3.out',
        clearProps: 'all',
      });
      gsap.fromTo(
        '.hero-photo',
        { scale: 1.025 },
        {
          yPercent: 14,
          scale: 1.1,
          ease: 'none',
          scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
        },
      );
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
        gsap.from(el, {
          y: 28,
          opacity: 0,
          duration: 0.75,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 94%', once: true },
          clearProps: 'all',
        });
      });


      gsap.fromTo(
        '.immersive-image img',
        { scale: 1.09 },
        {
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '.immersive-image',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.6,
          },
        },
      );
    });
    media.add('(min-width: 1000px) and (min-height: 650px)', () => {
      const stage = document.querySelector<HTMLElement>('.timeline-stage')!;
      const track = document.querySelector<HTMLElement>('.timeline-track')!;
      const distance = () => Math.max(0, track.scrollWidth - stage.clientWidth);
      gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: stage,
          start: 'top 78px',
          end: () => `+=${distance()}`,
          scrub: 0.65,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
      return () => {
        /* GSAP restaura el transform y elimina el espaciador del pin. */
      };
    });
    let alive = true;
    document.fonts.ready.then(() => {
      if (alive) ScrollTrigger.refresh();
    });
    return () => {
      alive = false;
      media.revert();
    };
  }, [enabled]);
}

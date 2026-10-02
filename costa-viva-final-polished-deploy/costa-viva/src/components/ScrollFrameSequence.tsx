import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowDownRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Eyebrow } from './Shared';

gsap.registerPlugin(ScrollTrigger);

type ScrollFrameSequenceProps = {
  id: string;
  motion: boolean;
  sequenceName: 'playful' | 'curious';
  frameCount: number;
  ariaLabel: string;
  eyebrow: string;
  title: string[];
  body: string;
  points: string[];
  kicker: string;
  caption: string;
  align?: 'left' | 'right';
};

function buildFrames(sequenceName: string, frameCount: number) {
  return Array.from(
    { length: frameCount },
    (_, i) => `./images/scroll-seq/${sequenceName}/${String(i).padStart(3, '0')}.webp`,
  );
}

function drawCover(canvas: HTMLCanvasElement, image: HTMLImageElement) {
  const rect = canvas.getBoundingClientRect();
  if (!rect.width || !rect.height) return;

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const width = Math.max(1, Math.round(rect.width * dpr));
  const height = Math.max(1, Math.round(rect.height * dpr));
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
  }

  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  ctx.clearRect(0, 0, width, height);

  const imageRatio = image.naturalWidth / image.naturalHeight;
  const canvasRatio = width / height;
  let sourceWidth = image.naturalWidth;
  let sourceHeight = image.naturalHeight;
  let sourceX = 0;
  let sourceY = 0;

  if (imageRatio > canvasRatio) {
    sourceWidth = image.naturalHeight * canvasRatio;
    sourceX = (image.naturalWidth - sourceWidth) / 2;
  } else {
    sourceHeight = image.naturalWidth / canvasRatio;
    sourceY = (image.naturalHeight - sourceHeight) / 2;
  }

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(
    image,
    sourceX,
    sourceY,
    sourceWidth,
    sourceHeight,
    0,
    0,
    width,
    height,
  );
}

export function ScrollFrameSequence({
  id,
  motion,
  sequenceName,
  frameCount,
  ariaLabel,
  eyebrow,
  title,
  body,
  points,
  kicker,
  caption,
  align = 'left',
}: ScrollFrameSequenceProps) {
  const frames = useMemo(() => buildFrames(sequenceName, frameCount), [sequenceName, frameCount]);
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameImagesRef = useRef<HTMLImageElement[]>([]);
  const frameIndexRef = useRef(0);
  const counterRef = useRef<HTMLSpanElement>(null);
  const progressRef = useRef<HTMLElement>(null);
  const [framesReady, setFramesReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const loaded: HTMLImageElement[] = [];

    Promise.all(
      frames.map(
        (src, index) =>
          new Promise<void>((resolve) => {
            const image = new Image();
            image.decoding = 'async';
            image.onload = () => {
              loaded[index] = image;
              resolve();
            };
            image.onerror = () => resolve();
            image.src = src;
          }),
      ),
    ).then(() => {
      if (cancelled) return;
      frameImagesRef.current = loaded;
      setFramesReady(true);
      const first = loaded[0];
      if (first && canvasRef.current) drawCover(canvasRef.current, first);
    });

    return () => {
      cancelled = true;
    };
  }, [frames]);

  useEffect(() => {
    if (!framesReady) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const redraw = () => {
      const image = frameImagesRef.current[frameIndexRef.current];
      if (image) drawCover(canvas, image);
    };
    const observer = new ResizeObserver(redraw);
    observer.observe(canvas);
    redraw();
    return () => observer.disconnect();
  }, [framesReady]);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!section || !stage || !framesReady) return;

    const canvas = canvasRef.current;
    const counter = counterRef.current;
    const progress = progressRef.current;
    const titleLines = stage.querySelectorAll<HTMLElement>('.frame-sequence-copy h2 span');
    const eyebrowEl = stage.querySelector<HTMLElement>('.frame-sequence-copy .eyebrow');
    const body = stage.querySelector<HTMLElement>('.frame-sequence-copy > p');
    const points = stage.querySelectorAll<HTMLElement>('.frame-sequence-copy li');
    const kickerEl = stage.querySelector<HTMLElement>('.frame-sequence-kicker');
    const visual = stage.querySelector<HTMLElement>('.frame-sequence-visual');
    const word = stage.querySelector<HTMLElement>('.frame-sequence-word');
    const captionEl = stage.querySelector<HTMLElement>('.frame-sequence-visual figcaption');
    const halo = stage.querySelector<HTMLElement>('.frame-sequence-halo');

    const renderFrame = (index: number) => {
      const clamped = Math.max(0, Math.min(frameCount - 1, index));
      if (clamped === frameIndexRef.current && frameIndexRef.current !== 0) return;
      frameIndexRef.current = clamped;
      const image = frameImagesRef.current[clamped];
      if (canvas && image) drawCover(canvas, image);
      if (counter) counter.textContent = String(clamped + 1).padStart(2, '0');
      if (progress) progress.style.width = `${((clamped + 1) / frameCount) * 100}%`;
    };

    renderFrame(0);
    if (!motion) return;

    const mobile = window.matchMedia('(max-width: 760px)').matches;
    const direction = align === 'left' ? 1 : -1;
    const ctx = gsap.context(() => {
      gsap.set([eyebrowEl, body, kickerEl, captionEl], { opacity: 0 });
      gsap.set(titleLines, { yPercent: 115, opacity: 0 });
      gsap.set(points, { y: 18, opacity: 0 });
      gsap.set(visual, {
        scale: mobile ? 0.94 : 0.86,
        rotation: mobile ? direction * 1.5 : direction * 4,
        xPercent: mobile ? direction * 3 : direction * 7,
      });
      gsap.set(word, { opacity: 0.025, xPercent: direction * 8 });
      gsap.set(halo, { opacity: 0.25, scale: 0.86 });

      const story = gsap.timeline({ paused: true, defaults: { ease: 'power2.out' } });
      story
        .to(eyebrowEl, { opacity: 1, y: 0, duration: 0.12 }, 0.02)
        .to(titleLines, { yPercent: 0, opacity: 1, stagger: 0.035, duration: 0.18 }, 0.04)
        .to(visual, { scale: 1, rotation: 0, xPercent: 0, duration: 0.28, ease: 'power3.out' }, 0)
        .to(halo, { opacity: 0.9, scale: 1.08, duration: 0.42, ease: 'sine.out' }, 0.04)
        .to(body, { opacity: 1, y: 0, duration: 0.12 }, 0.19)
        .to(points, { opacity: 1, y: 0, stagger: 0.025, duration: 0.12 }, 0.25)
        .to(kickerEl, { opacity: 1, y: 0, duration: 0.12 }, 0.34)
        .to(captionEl, { opacity: 1, y: 0, duration: 0.12 }, 0.3)
        .to(word, { opacity: 0.1, xPercent: -direction * 16, duration: 0.72, ease: 'none' }, 0)
        .to(
          visual,
          {
            yPercent: mobile ? -3 : -7,
            xPercent: mobile ? -direction * 2 : -direction * 5,
            scale: mobile ? 1.015 : 1.045,
            duration: 0.72,
            ease: 'none',
          },
          0.28,
        )
        .to('.frame-sequence-copy', { y: mobile ? -12 : -28, duration: 0.45, ease: 'none' }, 0.55)
        .to(halo, { xPercent: -direction * 12, yPercent: -8, duration: 0.6, ease: 'none' }, 0.4);

      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.18,
        onUpdate: (self) => {
          const p = self.progress;
          renderFrame(Math.round(p * (frameCount - 1)));
          story.progress(p);
        },
        onRefresh: (self) => {
          renderFrame(Math.round(self.progress * (frameCount - 1)));
          story.progress(self.progress);
        },
      });
    }, section);

    return () => ctx.revert();
  }, [align, frameCount, framesReady, motion]);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`frame-sequence frame-sequence-${align} frame-sequence-${sequenceName}`}
      aria-label={ariaLabel}
    >
      <div ref={stageRef} className="frame-sequence-stage">
        <div className="frame-sequence-halo" aria-hidden="true" />
        <div className="frame-sequence-copy">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2>
            {title.map((line, index) => (
              <span key={`${line}-${index}`}>{line}</span>
            ))}
          </h2>
          <p>{body}</p>
          <ul>
            {points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
          <div className="frame-sequence-kicker">
            <span>{kicker}</span>
            <ArrowDownRight size={18} aria-hidden="true" />
          </div>
        </div>

        <div className="frame-sequence-visual-wrap">
          <div className="frame-sequence-word" aria-hidden="true">
            {sequenceName === 'playful' ? 'COSTA\nVIVA' : 'MIRAR\nRESPETAR'}
          </div>
          <figure className={`frame-sequence-visual${framesReady ? ' is-ready' : ''}`}>
            <canvas ref={canvasRef} role="img" aria-label={caption} />
            <figcaption>{caption}</figcaption>
          </figure>
          <div className="frame-sequence-progress" aria-hidden="true">
            <span ref={counterRef}>01</span>
            <div>
              <i ref={progressRef} style={{ width: `${100 / frameCount}%` }} />
            </div>
            <span>{String(frameCount).padStart(2, '0')}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

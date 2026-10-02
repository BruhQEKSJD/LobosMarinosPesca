import { ArrowUpRight } from 'lucide-react';
import { sources } from '../data/research';
import type { SourceId } from '../data/research';
import type { ReactNode } from 'react';

export function Source({ id }: { id: SourceId }) {
  const source = sources.find((s) => s.id === id)!;
  return (
    <a
      className="citation"
      href={`#fuente-${id}`}
      aria-label={`Fuente ${source.number}: ${source.author}`}
    >
      [{source.number}]
    </a>
  );
}
export function Eyebrow({ number, children }: { number?: string; children: ReactNode }) {
  return (
    <p className="eyebrow">
      {number && <span className="chapter-number">{number}</span>}
      {children}
    </p>
  );
}
export function External({
  href,
  children,
  className = '',
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
      <ArrowUpRight size={16} aria-hidden="true" />
      <span className="sr-only"> (abre en una pestaña nueva)</span>
    </a>
  );
}

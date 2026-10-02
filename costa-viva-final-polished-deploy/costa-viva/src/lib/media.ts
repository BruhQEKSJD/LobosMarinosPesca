export type MediaConfig = {
  videoUrl: string;
  podcastUrl?: string;
  temporary: boolean;
  audioSrc?: string;
  audioTitle?: string;
  audioCredit?: string;
  audioType?: string;
};

// Solo aceptamos direcciones HTTPS del servicio esperado, no HTML arbitrario.
export function youtubeEmbed(value: string): string | null {
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:') return null;
    const host = url.hostname.toLowerCase();
    let id: string | null = null;
    if (host === 'youtu.be') id = url.pathname.slice(1);
    if (
      ['youtube.com', 'www.youtube.com', 'm.youtube.com', 'www.youtube-nocookie.com'].includes(host)
    ) {
      id =
        url.pathname === '/watch'
          ? url.searchParams.get('v')
          : (url.pathname.match(/^\/(?:embed|shorts)\/([^/]+)$/)?.[1] ?? null);
    }
    return id && /^[a-zA-Z0-9_-]{11}$/.test(id)
      ? `https://www.youtube-nocookie.com/embed/${id}`
      : null;
  } catch {
    return null;
  }
}

function notebookLink(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  try {
    const podcast = new URL(value);
    if (
      podcast.protocol !== 'https:' ||
      !['notebook.google.com', 'notebooklm.google.com'].includes(podcast.hostname)
    )
      return null;
    return value;
  } catch {
    return null;
  }
}

function localAudioPath(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  if (/^https?:\/\//i.test(trimmed)) return null;
  const cleaned = trimmed.startsWith('./') || trimmed.startsWith('/') ? trimmed : `./${trimmed}`;
  return /\.(mp3|ogg|wav|m4a)$/i.test(cleaned) ? cleaned : null;
}

export function parseMediaConfig(value: unknown): MediaConfig | null {
  if (!value || typeof value !== 'object') return null;
  const item = value as Record<string, unknown>;
  if (typeof item.videoUrl !== 'string' || !youtubeEmbed(item.videoUrl)) return null;

  const podcastUrl = notebookLink(item.podcastUrl);
  const audioSrc = localAudioPath(item.audioSrc);
  if (!podcastUrl && !audioSrc) return null;

  return {
    videoUrl: item.videoUrl,
    podcastUrl: podcastUrl ?? undefined,
    temporary: item.temporary !== false,
    audioSrc: audioSrc ?? undefined,
    audioTitle: typeof item.audioTitle === 'string' && item.audioTitle.trim() ? item.audioTitle : undefined,
    audioCredit:
      typeof item.audioCredit === 'string' && item.audioCredit.trim() ? item.audioCredit : undefined,
    audioType: typeof item.audioType === 'string' && item.audioType.trim() ? item.audioType : undefined,
  };
}

import { describe, expect, it } from 'vitest';
import { createGame, answerQuestion, nextQuestion } from '../src/lib/game';
import { parseMediaConfig, youtubeEmbed } from '../src/lib/media';

describe('Decisiones de la costa', () => {
  it('puntúa una decisión correcta una sola vez y exige avanzar antes de responder otra', () => {
    const first = answerQuestion(createGame(), 1, 1);
    expect(first.score).toBe(1);
    expect(answerQuestion(first, 1, 1)).toEqual(first);
    expect(nextQuestion(first, 5)).toEqual({ index: 1, selected: null, score: 1, finished: false });
  });
  it('no permite saltarse una pregunta sin responder', () => {
    expect(nextQuestion(createGame(), 5)).toEqual(createGame());
  });
  it('termina tras cinco decisiones y conserva un resultado mixto', () => {
    let state = createGame();
    for (const selected of [1, 0, 1, 0, 1])
      state = nextQuestion(answerQuestion(state, selected, 1), 5);
    expect(state.finished).toBe(true);
    expect(state.score).toBe(3);
    expect(answerQuestion(state, 1, 1)).toEqual(state);
    expect(createGame().score).toBe(0);
  });
});

describe('Enlaces editables por el equipo', () => {
  it('convierte enlaces de YouTube a un iframe sin cookies y conserva un ID válido', () => {
    expect(youtubeEmbed('https://www.youtube.com/watch?v=jpkeAQG6kQw')).toBe(
      'https://www.youtube-nocookie.com/embed/jpkeAQG6kQw',
    );
    expect(youtubeEmbed('https://youtu.be/jpkeAQG6kQw?t=10')).toBe(
      'https://www.youtube-nocookie.com/embed/jpkeAQG6kQw',
    );
  });
  it('rechaza esquemas inseguros, dominios imitadores e IDs inválidos', () => {
    for (const url of [
      'javascript:alert(1)',
      'https://youtube.com.evil.test/watch?v=jpkeAQG6kQw',
      'https://youtube.com/watch?v=bad',
    ])
      expect(youtubeEmbed(url)).toBeNull();
    expect(
      parseMediaConfig({
        videoUrl: 'https://youtu.be/jpkeAQG6kQw',
        podcastUrl: 'javascript:alert(1)',
      }),
    ).toBeNull();
  });
  it('acepta NotebookLM y el dominio Notebook proporcionado sin confundir enlaces temporales con finales', () => {
    for (const host of ['notebook.google.com', 'notebooklm.google.com']) {
      const config = parseMediaConfig({
        videoUrl: 'https://youtu.be/jpkeAQG6kQw',
        podcastUrl: `https://${host}/notebook/test`,
        temporary: true,
      });
      expect(config?.temporary).toBe(true);
      expect(config?.podcastUrl).toContain(host);
    }
  });
});

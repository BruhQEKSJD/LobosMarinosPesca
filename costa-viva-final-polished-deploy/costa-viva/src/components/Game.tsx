import { useRef, useState } from 'react';
import { ArrowRight, Check, Compass, RotateCcw, X } from 'lucide-react';
import { questions } from '../data/research';
import { answerQuestion, createGame, nextQuestion } from '../lib/game';
import { Eyebrow, Source } from './Shared';

export function Game() {
  const [started, setStarted] = useState(false);
  const [state, setState] = useState(createGame);
  const heading = useRef<HTMLHeadingElement>(null);
  const current = questions[state.index];
  const answered = state.selected !== null;
  const focusHeading = () => requestAnimationFrame(() => heading.current?.focus());
  const start = () => {
    setStarted(true);
    setState(createGame());
    focusHeading();
  };
  return (
    <section id="juego" className="game-section section-shell" aria-labelledby="game-title">
      <div className="game-intro">
        <Eyebrow number="08">EL DESAFÍO</Eyebrow>
        <h2 id="game-title">
          LA PRÓXIMA
          <br />
          DECISIÓN
          <br />
          <span>ES TUYA.</span>
        </h2>
        <p>
          Cinco situaciones. Una costa compartida.
          <br />
          Pon a prueba lo que aprendiste.
        </p>
        <div className="game-meta">
          <Compass size={19} aria-hidden="true" />
          <span>5 DECISIONES · SIN CRONÓMETRO</span>
        </div>
        <p className="fine-print">
          Actividad educativa. La puntuación mide respuestas del juego, no el impacto real de tus
          decisiones en el ecosistema.
        </p>
      </div>
      <div className="game-panel">
        {!started ? (
          <div className="game-welcome">
            <span className="game-watermark" aria-hidden="true">
              05
            </span>
            <Eyebrow>DECISIONES DE LA COSTA</Eyebrow>
            <h3 ref={heading} tabIndex={-1}>
              Saber también
              <br />
              es saber actuar.
            </h3>
            <p>
              Desde un encuentro en la playa hasta un conflicto pesquero. Elige una respuesta y
              descubre qué dice la evidencia.
            </p>
            <button className="button button-coral" onClick={start}>
              Comenzar el desafío <ArrowRight size={18} aria-hidden="true" />
            </button>
          </div>
        ) : state.finished ? (
          <div className="game-result">
            <Eyebrow>RECORRIDO COMPLETADO</Eyebrow>
            <h3 ref={heading} tabIndex={-1}>
              Tu resultado
            </h3>
            <p className="game-score">
              {state.score}
              <span>/ {questions.length}</span>
            </p>
            <p>
              {state.score >= 4
                ? 'La evidencia guía tus decisiones. Ahora comparte lo aprendido.'
                : 'Cada decisión abre una pregunta. Revisa las explicaciones y vuelve a intentarlo.'}
            </p>
            <div className="game-result-actions">
              <button className="button button-coral" onClick={start}>
                Volver a jugar <RotateCcw size={16} aria-hidden="true" />
              </button>
              <a className="text-link" href="#acciones">
                De la reflexión a la acción <ArrowRight size={16} aria-hidden="true" />
              </a>
            </div>
          </div>
        ) : (
          <div className="game-question">
            <div className="question-top">
              <span className="eyebrow">{current.label}</span>
              <span>
                {state.index + 1} / {questions.length}
              </span>
            </div>
            <div
              className="game-progress"
              role="progressbar"
              aria-label="Preguntas contestadas"
              aria-valuenow={state.index + Number(answered)}
              aria-valuemin={0}
              aria-valuemax={questions.length}
            >
              <span
                style={{ width: `${((state.index + Number(answered)) / questions.length) * 100}%` }}
              />
            </div>
            <h3 ref={heading} tabIndex={-1}>
              {current.title}
            </h3>
            <div className="answer-options" role="group" aria-label="Elige una respuesta">
              {current.options.map((option, index) => (
                <button
                  key={option}
                  className={`answer-option ${answered && index === current.correct ? 'correct' : ''} ${answered && index === state.selected && index !== current.correct ? 'incorrect' : ''}`}
                  disabled={answered}
                  onClick={() => setState((s) => answerQuestion(s, index, current.correct))}
                >
                  <span className="answer-letter">{String.fromCharCode(65 + index)}</span>
                  <span>{option}</span>
                  {answered && index === current.correct && (
                    <Check size={18} aria-label="Respuesta correcta" />
                  )}
                  {answered && index === state.selected && index !== current.correct && (
                    <X size={18} aria-label="Respuesta incorrecta" />
                  )}
                </button>
              ))}
            </div>
            <div aria-live="polite" aria-atomic="true">
              {answered && (
                <div className="answer-feedback">
                  <strong>
                    {state.selected === current.correct
                      ? 'Bien fundamentado.'
                      : 'Hay una mejor decisión.'}
                  </strong>
                  <p>
                    {current.explanation} <Source id={current.source} />
                  </p>
                  <button
                    className="text-link"
                    onClick={() => {
                      setState((s) => nextQuestion(s, questions.length));
                      focusHeading();
                    }}
                  >
                    {state.index === questions.length - 1
                      ? 'Ver mi resultado'
                      : 'Siguiente situación'}
                    <ArrowRight size={18} aria-hidden="true" />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

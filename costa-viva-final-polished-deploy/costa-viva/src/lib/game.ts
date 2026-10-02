// Estado puro: una decisión se registra una sola vez, aunque se pulse rápido.
export type GameState = {
  index: number;
  selected: number | null;
  score: number;
  finished: boolean;
};
export const createGame = (): GameState => ({
  index: 0,
  selected: null,
  score: 0,
  finished: false,
});
export function answerQuestion(state: GameState, selected: number, correct: number): GameState {
  if (state.finished || state.selected !== null) return state;
  return { ...state, selected, score: state.score + Number(selected === correct) };
}
export function nextQuestion(state: GameState, count: number): GameState {
  if (state.finished || state.selected === null) return state;
  if (state.index >= count - 1) return { ...state, finished: true };
  return { ...state, index: state.index + 1, selected: null };
}

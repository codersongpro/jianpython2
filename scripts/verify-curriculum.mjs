// 커리큘럼 자동 검증 스크립트 (npm run verify)
// - 모든 실습 레슨의 모범 답안(solution)이 채점을 통과하는지
// - 처음 코드(starterCode)로는 통과하지 못하는지
// - 퀴즈 정답이 보기 안에 있는지, 리듬게임 O/X 정답이 실제 파이썬 결과와 같은지 확인합니다.
import { loadPyodide } from "pyodide";
import { lessons, gradeLesson } from "../src/data/lessons.js";
import { preparePyodide, executePython } from "../src/utils/pyodideRunner.js";

const py = preparePyodide(await loadPyodide());
const problems = [];
const fail = (id, msg) => problems.push(`[${id}강] ${msg}`);

const ids = lessons.map((l) => l.id);
ids.forEach((id, i) => { if (id !== i + 1) fail(id, "레슨 번호가 1부터 순서대로가 아니에요."); });

for (const lesson of lessons) {
  const { id } = lesson;
  if (!lesson.youtubeId) fail(id, "youtubeId 없음");
  if (!lesson.goal) fail(id, "goal 없음");
  if (!lesson.quizzes?.length) fail(id, "퀴즈 없음");
  for (const q of lesson.quizzes || []) {
    if (!q.options.includes(q.answer)) fail(id, `퀴즈 정답이 보기에 없음: ${q.question}`);
  }

  if (!lesson.isTheoryOnly) {
    if (!lesson.solution || !lesson.check) { fail(id, "solution/check 없음"); continue; }
    const inputs = [...(lesson.sampleInputs || [])];
    const readInput = () => inputs.shift() ?? null;
    const sol = await executePython(py, lesson.solution, { readInput });
    if (!sol.success) fail(id, `모범 답안 실행 실패: ${sol.rawError}`);
    const g = gradeLesson(lesson, lesson.solution, sol.stdout);
    if (!g.passed) fail(id, `모범 답안이 채점 실패: ${g.message}\n${sol.stdout}`);

    const starter = await executePython(py, lesson.starterCode, { readInput: () => "지안" });
    if (starter.success && gradeLesson(lesson, lesson.starterCode, starter.stdout).passed) {
      fail(id, "처음 코드만으로 통과됨");
    }
  }

  const game = lesson.miniGame;
  if (game?.type === "rhythm-beat") {
    for (const beat of game.beats) {
      const code = `${beat.context || ""}\nprint(${beat.expr})`;
      const r = await executePython(py, code);
      const actual = r.stdout.trim() === "True" ? "O" : "X";
      if (actual !== beat.expect) fail(id, `리듬게임 정답 오류: ${beat.expr} → ${r.stdout.trim()}`);
    }
  }
  if (game?.type === "code-defense") {
    const cannonIds = game.cannons.map((c) => c.id);
    for (const e of game.enemies) if (!cannonIds.includes(e.type)) fail(id, `디펜스 적 타입 오류: ${e.label}`);
  }
  if (game?.type === "balloon-pop" && game.mode === "pick" && game.distractors.includes(game.answer)) {
    fail(id, "풍선 정답이 오답 목록에도 있음");
  }
}

if (problems.length) {
  console.error(`❌ 문제 ${problems.length}개\n` + problems.join("\n"));
  process.exit(1);
}
console.log(`✅ ${lessons.length}개 레슨 검증 통과 (실습 ${lessons.filter((l) => !l.isTheoryOnly).length}개 모범답안·채점·게임 정답 확인)`);

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { getLesson } from "../data/lessons";
import { audioSynth } from "../utils/audioSynth";

// 미니게임은 복습용입니다. 이기면 배지를 받고, 중간에 나가도 레슨 진도에는 영향이 없어요.
// 게임 종류(lesson.miniGame.type)
// - balloon-pop  : mode "spell"(철자 순서대로) / "pick"(정답 하나 고르기)
// - code-defense : 다가오는 값에 맞는 대포 고르기
// - rhythm-beat  : 식의 참(O)/거짓(X) 판단하기

const MAX_LIVES = 3;
const DEFENSE_SPEED = 0.55; // 45ms 마다 이동하는 % (약 6초 동안 다가와요)
const RHYTHM_SPEED = 0.9; // 40ms 마다 이동하는 % (약 4초 동안 다가와요)
const HIT_ZONE = [6, 30]; // 리듬 판정선 범위 (%)

const bestTimeKey = (lessonId) => `jianpython_lesson_${lessonId}_best_time`;

function readBestTime(lessonId) {
  try {
    const saved = localStorage.getItem(bestTimeKey(lessonId));
    return saved ? parseFloat(saved) : null;
  } catch {
    return null;
  }
}

function saveBestTime(lessonId, time) {
  try {
    localStorage.setItem(bestTimeKey(lessonId), String(time));
  } catch {
    /* 저장이 막혀 있어도 게임은 계속 */
  }
}

// 시작 시각으로부터 지난 시간(초)
function secondsSince(start) {
  return (Date.now() - start) / 1000;
}

function shuffle(items) {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function createBalloons(game) {
  let values;
  if (game.mode === "spell") {
    const chars = game.word.split("");
    let fakes = game.fakes;
    if (!fakes) {
      const pool = "abcdefghijklmnopqrstuvwxyz".split("").filter((c) => !chars.includes(c));
      fakes = shuffle(pool).slice(0, 3);
    }
    values = [...chars.map((v) => ({ value: v, isFake: false })), ...fakes.map((v) => ({ value: v, isFake: true }))];
  } else {
    values = [{ value: game.answer, isFake: false }, ...game.distractors.map((v) => ({ value: v, isFake: true }))];
  }

  const palette = ["#ff007f", "#00f0ff", "#ffd700", "#bd00ff", "#10b981", "#ff7f00", "#a855f7"];
  const items = shuffle(values);
  return items.map((item, idx) => ({
    ...item,
    id: `${idx}-${item.value}`,
    popped: false,
    color: ["💀", "💣", "🚫"].includes(item.value) ? "#ef4444" : palette[idx % palette.length],
    x: 10 + idx * (80 / Math.max(1, items.length - 1)),
    y: 15 + Math.random() * 35,
    speed: 0.3 + Math.random() * 0.4,
    direction: Math.random() > 0.5 ? 1 : -1,
    windPhase: Math.random() * 100,
    windSpeed: 0.02 + Math.random() * 0.03,
  }));
}

function Lives({ lives }) {
  return (
    <div className="lives">
      <span>방어막 에너지:</span>
      {Array.from({ length: MAX_LIVES }).map((_, i) => (
        <span key={i} style={{ fontSize: "1.6rem", opacity: i < lives ? 1 : 0.4 }}>{i < lives ? "💖" : "🖤"}</span>
      ))}
    </div>
  );
}

function GameBoard({ lesson, onWin, onRestart }) {
  const game = lesson.miniGame;
  const startRef = useRef(0);
  const [elapsed, setElapsed] = useState(0);
  const [lives, setLives] = useState(MAX_LIVES);
  const [penalty, setPenalty] = useState(false);
  const [finished, setFinished] = useState(false);
  const [particles, setParticles] = useState([]);
  const [shaking, setShaking] = useState(false);

  // 풍선 게임 상태
  const [balloons, setBalloons] = useState(() => (game.type === "balloon-pop" ? createBalloons(game) : []));
  const [spellIdx, setSpellIdx] = useState(0);
  const [errorBalloonId, setErrorBalloonId] = useState(null);

  // 디펜스 게임 상태
  const [enemyIdx, setEnemyIdx] = useState(0);
  const [enemyX, setEnemyX] = useState(100);
  const [enemyHit, setEnemyHit] = useState(false);
  const [defenseMsg, setDefenseMsg] = useState("다가오는 값을 보고 알맞은 대포를 골라 쏘세요!");

  // 리듬 게임 상태
  const [beatIdx, setBeatIdx] = useState(0);
  const [noteX, setNoteX] = useState(100);
  const [hits, setHits] = useState(0);
  const [combo, setCombo] = useState(0);
  const [rhythmMsg, setRhythmMsg] = useState("");
  const [reveal, setReveal] = useState(null); // 방금 판정한 노트의 정답 표시

  const gameOver = lives <= 0;
  const active = !finished && !gameOver;

  useEffect(() => {
    startRef.current = Date.now();
  }, []);

  // 경과 시간 타이머
  useEffect(() => {
    if (!active) return undefined;
    const t = setInterval(() => setElapsed(secondsSince(startRef.current)), 50);
    return () => clearInterval(t);
  }, [active]);

  const shake = () => {
    setShaking(true);
    setTimeout(() => setShaking(false), 300);
  };

  const loseLife = (message, setMessage) => {
    audioSynth.playError();
    setLives((l) => l - 1);
    setMessage(message);
    shake();
  };

  const win = () => {
    const finalTime = parseFloat(secondsSince(startRef.current).toFixed(2));
    setElapsed(finalTime);
    setFinished(true);
    const best = readBestTime(lesson.id);
    const isNewRecord = best === null || finalTime < best;
    if (isNewRecord) saveBestTime(lesson.id, finalTime);
    setTimeout(() => {
      audioSynth.playWin();
      onWin({ time: finalTime, best: isNewRecord ? finalTime : best, isNewRecord });
    }, 400);
  };

  // ───── 풍선: 둥실둥실 움직임 ─────
  useEffect(() => {
    if (game.type !== "balloon-pop" || !active) return undefined;
    const t = setInterval(() => {
      setBalloons((prev) =>
        prev.map((b) => {
          let y = b.y + b.speed * b.direction;
          let direction = b.direction;
          if (y > 72) { y = 72; direction = -1; }
          else if (y < 8) { y = 8; direction = 1; }
          return { ...b, y, direction, windPhase: b.windPhase + b.windSpeed };
        })
      );
    }, 50);
    return () => clearInterval(t);
  }, [game.type, active]);

  const popParticles = (x, y, color) => {
    const fresh = Array.from({ length: 20 }).map((_, i) => {
      const angle = (i / 20) * Math.PI * 2;
      const distance = 55 + Math.random() * 80;
      return { id: Math.random(), x, y, color, tx: `${Math.cos(angle) * distance}px`, ty: `${Math.sin(angle) * distance}px`, size: 4 + Math.random() * 8 };
    });
    setParticles((prev) => [...prev, ...fresh]);
    setTimeout(() => setParticles((prev) => prev.filter((p) => !fresh.includes(p))), 600);
  };

  const handleBalloonClick = (balloon) => {
    if (balloon.popped || !active || errorBalloonId) return;
    const actualX = balloon.x + Math.sin(balloon.windPhase) * 2;

    const expected = game.mode === "spell" ? game.word[spellIdx] : game.answer;
    const correct = !balloon.isFake && balloon.value === expected;

    if (!correct) {
      // 오답: 3초 벌점
      audioSynth.playError();
      setErrorBalloonId(balloon.id);
      setTimeout(() => setErrorBalloonId(null), 600);
      startRef.current -= 3000;
      setPenalty(true);
      setTimeout(() => setPenalty(false), 1000);
      if (balloon.isFake) {
        popParticles(actualX, balloon.y, "#ef4444");
        setBalloons((prev) => prev.map((b) => (b.id === balloon.id ? { ...b, popped: true } : b)));
      }
      return;
    }

    audioSynth.playBeep(523 + spellIdx * 80, 0.05);
    popParticles(actualX, balloon.y, balloon.color);
    setBalloons((prev) => prev.map((b) => (b.id === balloon.id ? { ...b, popped: true } : b)));

    if (game.mode === "spell") {
      const next = spellIdx + 1;
      setSpellIdx(next);
      if (next >= game.word.length) win();
    } else {
      win();
    }
  };

  // ───── 디펜스: 적이 다가옴 ─────
  useEffect(() => {
    if (game.type !== "code-defense" || !active || enemyHit) return undefined;
    const t = setInterval(() => setEnemyX((x) => Math.max(18, x - DEFENSE_SPEED)), 45);
    return () => clearInterval(t);
  }, [game.type, active, enemyHit]);

  // 적이 기지에 닿으면 하트 -1, 같은 적이 다시 출발
  useEffect(() => {
    if (game.type !== "code-defense" || enemyX > 20 || !active) return;
    const t = setTimeout(() => {
      loseLife("💥 기지에 부딪혔어요! 같은 값이 다시 와요. 이번엔 꼭 맞혀요!", setDefenseMsg);
      setEnemyX(100);
    }, 0);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enemyX <= 20]);

  const handleShoot = (cannonId) => {
    if (!active || enemyHit) return;
    const enemy = game.enemies[enemyIdx];
    audioSynth.playLaser();
    if (enemy.type !== cannonId) {
      audioSynth.playError();
      setDefenseMsg("앗, 이 대포로는 안 돼요! 값을 다시 보고 다른 대포를 골라 봐요.");
      shake();
      return;
    }
    audioSynth.playCoin();
    setEnemyHit(true);
    setDefenseMsg("💥 명중! 정확하게 분류했어요!");
    setTimeout(() => {
      setEnemyHit(false);
      const next = enemyIdx + 1;
      if (next >= game.enemies.length) win();
      else {
        setEnemyIdx(next);
        setEnemyX(100);
      }
    }, 500);
  };

  // ───── 리듬: 노트가 다가옴 ─────
  useEffect(() => {
    if (game.type !== "rhythm-beat" || !active) return undefined;
    const t = setInterval(() => setNoteX((x) => x - RHYTHM_SPEED), 40);
    return () => clearInterval(t);
  }, [game.type, active]);

  const nextBeat = () => {
    setBeatIdx((i) => (i + 1) % game.beats.length);
    setNoteX(100);
  };

  // 판정선을 그냥 지나치면 Miss
  useEffect(() => {
    if (game.type !== "rhythm-beat" || noteX > 2 || !active) return;
    const t = setTimeout(() => {
      setCombo(0);
      loseLife("놓쳤어요! 노트가 판정선에 올 때 눌러요. 😮", setRhythmMsg);
      nextBeat();
    }, 0);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [noteX <= 2]);

  const handleRhythm = (input) => {
    if (!active || game.type !== "rhythm-beat") return;
    const beat = game.beats[beatIdx];
    if (noteX < HIT_ZONE[0] || noteX > HIT_ZONE[1]) {
      setRhythmMsg("아직이에요! 노트가 판정선 근처에 왔을 때 눌러요. ⏰");
      return;
    }
    setReveal({ expr: beat.expr, expect: beat.expect, correct: beat.expect === input });
    if (beat.expect === input) {
      audioSynth.playCoin();
      const nextHits = hits + 1;
      setHits(nextHits);
      setCombo((c) => c + 1);
      setRhythmMsg("PERFECT! 🌟");
      if (nextHits >= game.beats.length) {
        win();
        return;
      }
    } else {
      setCombo(0);
      loseLife(`앗! ${beat.expr} 의 결과는 ${beat.expect === "O" ? "True" : "False"} 예요. ❌`, setRhythmMsg);
    }
    nextBeat();
  };

  useEffect(() => {
    if (game.type !== "rhythm-beat" || !active) return undefined;
    const onKey = (e) => {
      if (["a", "A", "ArrowLeft"].includes(e.key)) handleRhythm("O");
      else if (["s", "S", "ArrowRight"].includes(e.key)) handleRhythm("X");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  if (gameOver) {
    return (
      <div className="game-center">
        <div style={{ fontSize: "5rem" }} className="shake-animation">👾</div>
        <h3 style={{ fontSize: "2.6rem", color: "#f43f5e" }}>방어막이 모두 꺼졌어요!</h3>
        <p className="pydi-bubble">🤖 "괜찮아요! 레슨은 이미 완료됐으니 진도는 그대로예요. 천천히 다시 도전해 볼까요?"</p>
        <button onClick={onRestart} className="btn-cosmic btn-pink" style={{ padding: "14px 40px", fontSize: "1.2rem" }}>🔄 다시 도전하기</button>
      </div>
    );
  }

  const enemy = game.enemies?.[enemyIdx];
  const beat = game.beats?.[beatIdx];
  const inZone = noteX >= HIT_ZONE[0] && noteX <= HIT_ZONE[1];

  return (
    <div className={shaking ? "shake-animation" : ""} style={{ width: "100%", display: "flex", flexDirection: "column", gap: "20px", alignItems: "center" }}>
      {particles.map((p) => (
        <div key={p.id} className="pop-particle" style={{ left: `${p.x}%`, top: `${p.y}%`, background: p.color, width: `${p.size}px`, height: `${p.size}px`, "--p-tx": p.tx, "--p-ty": p.ty }} />
      ))}

      <p style={{ color: "#a5b4fc", fontSize: "1.1rem", textAlign: "center", fontWeight: "bold" }}>{game.description}</p>

      <div className="timer-pill">
        ⏱️ <span style={{ color: penalty ? "#ef4444" : "var(--color-neon-cyan)", fontSize: "1.5rem", fontWeight: 900, fontFamily: "monospace" }}>{elapsed.toFixed(2)}초</span>
        {penalty && <span style={{ color: "#ef4444", fontWeight: "bold" }}>+3초 ⚠️</span>}
      </div>

      {game.type === "balloon-pop" && (
        <>
          {game.mode === "spell" ? (
            <div className="spell-slots">
              {game.word.split("").map((c, i) => (
                <span key={i} style={{ color: i < spellIdx ? "var(--color-neon-cyan)" : "rgba(255,255,255,0.2)" }}>{c}</span>
              ))}
            </div>
          ) : (
            <div style={{ fontSize: "1.2rem", color: "#ffd700", fontWeight: "bold" }}>🎯 찾을 것: {game.prompt}</div>
          )}
          <div className="balloon-field">
            {balloons.filter((b) => !b.popped).map((b) => {
              const rx = Math.max(27, b.value.length * 5 + 8);
              return (
                <button
                  key={b.id}
                  onClick={() => handleBalloonClick(b)}
                  className={b.id === errorBalloonId ? "balloon-error" : "balloon-wobble"}
                  aria-label={`풍선 ${b.value}`}
                  style={{ position: "absolute", left: `calc(${b.x}% + ${Math.sin(b.windPhase) * 16}px)`, top: `${b.y}%`, background: "none", border: "none", cursor: "pointer", transform: "translate(-50%, -50%)" }}
                >
                  <svg width={rx * 2 + 16} height="95" viewBox={`0 0 ${rx * 2 + 16} 95`} style={{ overflow: "visible" }}>
                    <path d={`M${rx + 8},68 Q${rx + 10},82 ${rx + 6},95`} stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" fill="none" />
                    <ellipse cx={rx + 8} cy="38" rx={rx} ry="30" fill={b.color} />
                    <ellipse cx={rx - 2} cy="26" rx="8" ry="10" fill="rgba(255,255,255,0.45)" />
                    <text x={rx + 8} y="44" fill="white" fontSize="15" fontWeight="bold" textAnchor="middle" style={{ fontFamily: "monospace" }}>{b.value}</text>
                  </svg>
                </button>
              );
            })}
          </div>
        </>
      )}

      {game.type === "code-defense" && (
        <>
          <Lives lives={lives} />
          <div className="defense-field">
            <div className="defense-runway" />
            <div style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", textAlign: "center", zIndex: 2 }}>
              <div style={{ fontSize: "3rem" }}>🛸</div>
              <span style={{ fontSize: "0.8rem", color: "#00f0ff" }}>방어 기지</span>
            </div>
            <div style={{ position: "absolute", left: `${enemyX}%`, top: "50%", transform: "translate(-50%, -50%)", textAlign: "center", zIndex: 3, filter: enemyHit ? "brightness(2.5)" : "none" }}>
              <div style={{ fontSize: "3rem" }}>{enemyHit ? "💥" : "👾"}</div>
              <span className="enemy-label">{enemy.label}</span>
            </div>
          </div>
          <div className="game-message">{defenseMsg}</div>
          <div className="cannon-row">
            {game.cannons.map((c, i) => (
              <button key={c.id} disabled={enemyHit} onClick={() => handleShoot(c.id)} className={`btn-cosmic ${i === 0 ? "btn-cyan" : "btn-pink"}`} style={{ padding: "16px", fontSize: "1.2rem" }}>
                {c.label}
              </button>
            ))}
          </div>
          <div style={{ color: "#9ca3af" }}>남은 값: {game.enemies.length - enemyIdx}개</div>
        </>
      )}

      {game.type === "rhythm-beat" && (
        <>
          <Lives lives={lives} />
          <div className="rhythm-expr">
            {beat.context && <div style={{ fontSize: "0.95rem", color: "#a5b4fc", fontFamily: "monospace" }}>{beat.context} 일 때</div>}
            <strong style={{ fontSize: "1.9rem", color: "white", fontFamily: "monospace" }}>{beat.expr}</strong>
            <div style={{ fontSize: "0.85rem", color: "#a5b4fc" }}>참이면 O, 거짓이면 X</div>
          </div>
          <div className="rhythm-field">
            <div className="rhythm-zone" style={{ left: `${HIT_ZONE[0]}%`, width: `${HIT_ZONE[1] - HIT_ZONE[0]}%`, background: inZone ? "rgba(0,240,255,0.18)" : "rgba(255,255,255,0.05)" }}>판정선</div>
            <div className="rhythm-note" style={{ left: `${Math.max(noteX, 0)}%` }}>?</div>
            {combo > 1 && <div key={combo} className="combo-badge">{combo} COMBO!</div>}
          </div>
          <div style={{ minHeight: "28px", fontWeight: "bold", color: rhythmMsg.includes("PERFECT") ? "#10b981" : "#fca5a5" }}>{rhythmMsg}</div>
          {reveal && (
            <div style={{ color: "#cbd5e1", fontSize: "0.95rem" }}>
              방금 문제: <code>{reveal.expr}</code> → {reveal.expect === "O" ? "True (O)" : "False (X)"} {reveal.correct ? "✅" : "❌"}
            </div>
          )}
          <div className="cannon-row">
            <button onClick={() => handleRhythm("O")} className="btn-cosmic btn-cyan" style={{ padding: "16px", fontSize: "1.6rem" }}>O · True (A / ◀)</button>
            <button onClick={() => handleRhythm("X")} className="btn-cosmic btn-pink" style={{ padding: "16px", fontSize: "1.6rem" }}>X · False (S / ▶)</button>
          </div>
          <div style={{ color: "#9ca3af" }}>맞힌 개수: {hits} / {game.beats.length}</div>
        </>
      )}
    </div>
  );
}

export default function MiniGameContainer({ lessonId, onClose }) {
  const lesson = getLesson(lessonId);
  const [round, setRound] = useState(0);
  const [result, setResult] = useState(null);

  if (!lesson?.miniGame) return null;

  return (
    <div style={{ maxWidth: "850px", margin: "20px auto", padding: "16px", display: "flex", flexDirection: "column", gap: "20px" }}>
      <header className="glass-panel" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 24px", gap: "12px" }}>
        <div>
          <span style={{ fontSize: "0.9rem", color: "#ff007f", fontWeight: "bold" }}>{lesson.id}강 복습 미니게임</span>
          <h2 style={{ fontSize: "1.8rem", color: "white" }}>{lesson.miniGame.title}</h2>
        </div>
        <button onClick={() => onClose(false)} className="btn-cosmic btn-outline" style={{ padding: "8px", borderRadius: "50%" }} aria-label="게임 나가기" title="나가기 (진도는 유지돼요)">
          <X size={20} />
        </button>
      </header>

      <section className="glass-panel" style={{ padding: "28px", background: "rgba(10, 11, 27, 0.85)", minHeight: "450px", position: "relative", overflow: "hidden", display: "flex", justifyContent: "center" }}>
        {result ? (
          <div className="game-center">
            <div className="animate-float win-medal">🏅</div>
            <h3 style={{ fontSize: "2.6rem", color: "#ffd700" }}>미니게임 클리어!</h3>
            <p style={{ color: "#a5b4fc", fontSize: "1.15rem" }}><strong>{lesson.planet} 배지</strong>를 획득했어요!</p>
            <div className="glass-panel" style={{ padding: "14px 30px", textAlign: "center" }}>
              <div>⏱️ 기록: <strong style={{ color: "var(--color-neon-cyan)", fontSize: "1.6rem" }}>{result.time.toFixed(2)}초</strong></div>
              {result.isNewRecord ? (
                <div style={{ color: "#ffd700", fontWeight: "bold" }}>🎉 최고 기록 경신!</div>
              ) : (
                result.best && <div style={{ color: "#94a3b8" }}>🏆 최고 기록: {result.best.toFixed(2)}초</div>
              )}
            </div>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}>
              <button onClick={() => { setResult(null); setRound((r) => r + 1); }} className="btn-cosmic btn-outline">🔄 기록 도전</button>
              <button onClick={() => onClose(true)} className="btn-cosmic btn-star animate-pulse-cyan" style={{ padding: "14px 34px", fontSize: "1.2rem" }}>🎖️ 배지 받고 지도로</button>
            </div>
          </div>
        ) : (
          <GameBoard key={round} lesson={lesson} onWin={setResult} onRestart={() => setRound((r) => r + 1)} />
        )}
      </section>
    </div>
  );
}

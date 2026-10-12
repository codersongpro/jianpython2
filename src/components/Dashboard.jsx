import { useState } from "react";
import { Play, Lock, CheckCircle, Award, Volume2, VolumeX, X } from "lucide-react";
import { chapters, lessons, lessonsInChapter, getLesson } from "../data/lessons";
import { audioSynth } from "../utils/audioSynth";

const RESET_PASSWORD = "1234";

const glossary = [
  { color: "#00f0ff", term: "프로그래밍 언어 · 코딩", desc: "컴퓨터에게 명령하기 위한 약속된 언어가 프로그래밍 언어, 그 언어로 명령을 적는 일이 코딩이에요." },
  { color: "#ff007f", term: "실행 · 버그", desc: "실행은 적은 코드를 컴퓨터가 실제로 해 보는 것, 버그는 코드 속 실수예요. 파이디의 도움말을 보고 고치면 돼요!" },
  { color: "#10b981", term: "변수", desc: "값을 담아 두는 이름표 붙은 상자. stars = 10 처럼 = 로 값을 넣어요." },
  { color: "#ffd700", term: "자료형", desc: "값의 종류. 정수 int, 실수 float, 문자열 str, 참/거짓 bool, 리스트 list, 딕셔너리 dict 가 있어요." },
  { color: "#bd00ff", term: "인덱스", desc: "문자열·리스트 속 값의 방 번호. 0번부터 세요!" },
  { color: "#f97316", term: "조건문 (if)", desc: "조건이 참일 때만 코드를 실행해요. 줄 끝 콜론(:)과 들여쓰기가 중요해요." },
  { color: "#06b6d4", term: "반복문 (while · for)", desc: "while 은 조건이 참인 동안, for 는 정해진 횟수나 리스트 길이만큼 반복해요." },
  { color: "#ec4899", term: "함수 (def · return)", desc: "자주 쓰는 명령을 묶은 나만의 명령어. def 로 만들고 이름() 으로 부르고, return 으로 결과를 돌려줘요." },
];

function ProgressBar({ value, max, color = "linear-gradient(90deg, #00f0ff, #ff007f)" }) {
  const pct = max === 0 ? 0 : Math.round((value / max) * 100);
  return (
    <div className="progress-track" role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={max}>
      <div style={{ width: `${pct}%`, background: color }} />
    </div>
  );
}

export default function Dashboard({ currentLesson, completedLessons, totalStars, badges, onStartLesson, isMuted, onToggleMute, onResetProgress }) {
  const [showGlossary, setShowGlossary] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [resetError, setResetError] = useState("");

  const doneCount = lessons.filter((l) => completedLessons.includes(l.id)).length;
  const allDone = currentLesson > lessons.length;
  const nextLesson = getLesson(currentLesson);

  const handleConfirmReset = () => {
    if (passwordInput === RESET_PASSWORD) {
      audioSynth.playBeep(660, 0.05);
      onResetProgress();
      setShowResetModal(false);
    } else {
      audioSynth.playError();
      setResetError("❌ 비밀번호가 달라요. 다시 입력해 주세요!");
    }
  };

  const handleLessonClick = (lesson) => {
    if (lesson.id <= currentLesson) {
      audioSynth.playBeep(440, 0.1);
      onStartLesson(lesson.id);
    } else {
      audioSynth.playError();
    }
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px", minHeight: "100vh" }}>
      <header className="glass-panel dashboard-header">
        <div>
          <h1 className="app-title">지안이의 우주 파이썬 탐험대 🚀</h1>
          <p style={{ color: "#a5b4fc", fontSize: "1.1rem" }}>
            로봇 <strong>파이디(Pydi)</strong>와 함께 "달려라 파이썬" 34강을 탐험해요!
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
          <button onClick={() => { audioSynth.playBeep(880, 0.05); setShowGlossary(true); }} className="btn-cosmic btn-outline" style={{ borderColor: "#ffd700", color: "#ffd700" }}>
            💡 용어 사전
          </button>
          <button onClick={() => onStartLesson(0)} className="btn-cosmic btn-star">🚀 자유 코딩 방</button>
          <div className="star-counter">
            <span style={{ fontSize: "1.6rem" }}>⭐</span>
            <div>
              <div style={{ fontSize: "0.75rem", color: "rgba(255,215,0,0.8)" }}>별 연료</div>
              <div style={{ fontSize: "1.2rem", fontWeight: 900, color: "#ffd700" }}>{totalStars} 개</div>
            </div>
          </div>
          <button
            onClick={() => { onToggleMute(); setTimeout(() => audioSynth.playBeep(800, 0.05), 50); }}
            className="btn-cosmic btn-outline"
            style={{ padding: "12px", borderRadius: "50%" }}
            title={isMuted ? "소리 켜기" : "소리 끄기"}
            aria-label={isMuted ? "소리 켜기" : "소리 끄기"}
          >
            {isMuted ? <VolumeX size={22} style={{ color: "#ef4444" }} /> : <Volume2 size={22} style={{ color: "#00f0ff" }} />}
          </button>
        </div>
      </header>

      <div className="dashboard-grid">
        {/* 단원별 로드맵 */}
        <section style={{ display: "flex", flexDirection: "column", gap: "24px", minWidth: 0 }}>
          {chapters.map((chapter) => {
            const chapterLessons = lessonsInChapter(chapter.id);
            const chapterDone = chapterLessons.filter((l) => completedLessons.includes(l.id)).length;
            const isLockedChapter = chapterLessons[0].id > currentLesson;
            return (
              <div key={chapter.id} className="glass-panel chapter-card" style={{ opacity: isLockedChapter ? 0.6 : 1 }}>
                <div className="chapter-head">
                  <div style={{ fontSize: "2.4rem" }}>{chapter.emoji}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: "#a5b4fc", fontSize: "0.9rem" }}>
                      {chapter.id}단원 · {chapterLessons[0].id}~{chapterLessons[chapterLessons.length - 1].id}강
                    </div>
                    <h2 style={{ fontSize: "2rem", color: "white", lineHeight: 1.1 }}>{chapter.title}</h2>
                    <div style={{ color: "#9ca3af", fontSize: "0.95rem" }}>{chapter.subtitle}</div>
                  </div>
                  <div style={{ minWidth: "110px", textAlign: "right" }}>
                    <div style={{ color: chapterDone === chapterLessons.length ? "#10b981" : "#cbd5e1", fontWeight: "bold" }}>
                      {chapterDone === chapterLessons.length ? "🏆 완료!" : `${chapterDone} / ${chapterLessons.length}`}
                    </div>
                    <ProgressBar value={chapterDone} max={chapterLessons.length} />
                  </div>
                </div>

                <div className="lesson-grid">
                  {chapterLessons.map((lesson) => {
                    const isCompleted = completedLessons.includes(lesson.id);
                    const isActive = lesson.id === currentLesson;
                    const isLocked = lesson.id > currentLesson;
                    return (
                      <button
                        key={lesson.id}
                        onClick={() => handleLessonClick(lesson)}
                        className={`lesson-card ${isActive ? "active" : ""} ${isCompleted ? "done" : ""}`}
                        disabled={isLocked}
                        title={isLocked ? "앞의 레슨을 먼저 완료해요" : lesson.goal}
                      >
                        <div className={`lesson-planet ${isActive ? "animate-spin-slow" : ""}`}>{lesson.emoji}</div>
                        <div style={{ flex: 1, textAlign: "left", minWidth: 0 }}>
                          <div style={{ fontSize: "0.8rem", color: isCompleted ? "#10b981" : isActive ? "#00f0ff" : "#9ca3af" }}>
                            {lesson.id}강 · {lesson.isTheoryOnly ? "📺 영상+퀴즈" : "💻 코딩 실습"}
                          </div>
                          <div style={{ fontSize: "1.05rem", fontWeight: 800, color: "#ffffff" }}>{lesson.title}</div>
                        </div>
                        {isCompleted ? (
                          <CheckCircle size={24} style={{ color: "#10b981", flexShrink: 0 }} />
                        ) : isActive ? (
                          <span className="play-dot"><Play size={16} fill="#111" /></span>
                        ) : (
                          <Lock size={20} style={{ color: "#4b5563", flexShrink: 0 }} />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </section>

        <aside className="dashboard-aside">
          <div className="glass-panel neon-cyan-glow panel">
            <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
              <div style={{ fontSize: "3rem" }} className="animate-float">🤖</div>
              <div>
                <h3 style={{ fontSize: "1.6rem", color: "#00f0ff" }}>가이드 파이디</h3>
                <div style={{ color: "#cbd5e1", fontSize: "0.9rem" }}>전체 진도 {doneCount} / {lessons.length}강</div>
              </div>
            </div>
            <ProgressBar value={doneCount} max={lessons.length} />
            <div className="pydi-bubble">
              {allDone ? (
                <>"와아! 34강을 모두 끝냈어요! 이제 자유 코딩 방에서 나만의 프로그램을 만들어 봐요. 🏆🎓"</>
              ) : (
                <>
                  "오늘의 코스는 <strong>{nextLesson.id}강 {nextLesson.title}</strong>!<br />
                  🎯 {nextLesson.goal}"
                </>
              )}
            </div>
            {!allDone && (
              <button onClick={() => handleLessonClick(nextLesson)} className="btn-cosmic btn-cyan animate-pulse-cyan" style={{ width: "100%" }}>
                <Play size={18} fill="white" /> {nextLesson.id}강 이어서 하기
              </button>
            )}
          </div>

          <div className="glass-panel neon-pink-glow panel">
            <h3 style={{ fontSize: "1.7rem", color: "#ff007f", display: "flex", alignItems: "center", gap: "8px" }}>
              <Award size={24} /> 우주 배지 장식장 <span className="pill">{badges.filter((id) => getLesson(id)).length}/{lessons.length}</span>
            </h3>
            <div className="badge-grid">
              {lessons.map((lesson) => {
                const hasBadge = badges.includes(lesson.id);
                return (
                  <div key={lesson.id} className={`badge-cell ${hasBadge ? "owned" : ""}`} title={hasBadge ? `${lesson.id}강 ${lesson.title} 배지` : `${lesson.id}강 배지 (미획득)`}>
                    {hasBadge ? lesson.emoji : lesson.id}
                  </div>
                );
              })}
            </div>
            <p style={{ color: "#9ca3af", fontSize: "0.85rem" }}>레슨을 마친 뒤 복습 미니게임을 클리어하면 배지를 받아요.</p>
          </div>

          <div className="glass-panel panel" style={{ border: "1px dashed rgba(239, 68, 68, 0.3)" }}>
            <h4 style={{ fontSize: "1.1rem", color: "#ef4444" }}>⚙️ 보호자 메뉴</h4>
            <p style={{ fontSize: "0.85rem", color: "#9ca3af" }}>학습 기록을 처음부터 다시 시작할 수 있어요.</p>
            <button
              onClick={() => { audioSynth.playBeep(330, 0.08); setShowResetModal(true); setPasswordInput(""); setResetError(""); }}
              className="btn-cosmic btn-outline"
              style={{ borderColor: "#ef4444", color: "#ef4444", width: "100%" }}
            >
              🧹 학습 기록 초기화
            </button>
          </div>
        </aside>
      </div>

      {showGlossary && (
        <div className="modal-backdrop" onClick={() => setShowGlossary(false)}>
          <div className="glass-panel neon-cyan-glow modal-card" style={{ maxWidth: "650px" }} onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setShowGlossary(false)} className="btn-cosmic btn-outline" style={{ position: "absolute", top: "20px", right: "20px", padding: "8px", borderRadius: "50%" }} aria-label="닫기">
              <X size={18} />
            </button>
            <h2 style={{ fontSize: "2.4rem", color: "#00f0ff", textAlign: "center" }}>💡 파이디의 파이썬 용어 사전</h2>
            {glossary.map((g) => (
              <div key={g.term} style={{ background: "rgba(255,255,255,0.03)", padding: "14px 16px", borderRadius: "16px", borderLeft: `5px solid ${g.color}` }}>
                <strong style={{ fontSize: "1.15rem", color: g.color }}>{g.term}</strong>
                <p style={{ color: "#e2e8f0", marginTop: "4px", lineHeight: 1.5 }}>{g.desc}</p>
              </div>
            ))}
            <button onClick={() => setShowGlossary(false)} className="btn-cosmic btn-cyan" style={{ width: "100%" }}>사전 닫고 탐험 계속하기 🚀</button>
          </div>
        </div>
      )}

      {showResetModal && (
        <div className="modal-backdrop">
          <div className="glass-panel modal-card" style={{ maxWidth: "400px", borderColor: "rgba(239, 68, 68, 0.4)" }}>
            <h3 style={{ fontSize: "1.8rem", color: "#ef4444", textAlign: "center" }}>⚠️ 학습 기록 초기화</h3>
            <div className="error-box">보호자가 확인해 주세요! 진행하면 완료한 레슨, 별 연료, 배지가 모두 지워져요.</div>
            <label style={{ fontSize: "0.9rem", color: "#a5b4fc", fontWeight: "bold" }}>
              보호자 비밀번호 (README 참고)
              <input
                type="password"
                inputMode="numeric"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleConfirmReset()}
                placeholder="비밀번호 4자리"
                className="password-input"
                autoFocus
              />
            </label>
            {resetError && <span style={{ color: "#ef4444", textAlign: "center", fontWeight: "bold" }}>{resetError}</span>}
            <div style={{ display: "flex", gap: "12px" }}>
              <button onClick={() => setShowResetModal(false)} className="btn-cosmic btn-outline" style={{ flex: 1 }}>취소</button>
              <button onClick={handleConfirmReset} className="btn-cosmic" style={{ flex: 1, background: "linear-gradient(135deg, #ef4444, #b91c1c)", color: "white" }}>확인</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

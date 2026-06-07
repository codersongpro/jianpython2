import React, { useState } from "react";
import { Play, Lock, CheckCircle, Award, Volume2, VolumeX, HelpCircle, X } from "lucide-react";
import { lessons } from "../data/lessons";
import { audioSynth } from "../utils/audioSynth";

const planetStyles = {
  1: { emoji: "🌌", gradient: "linear-gradient(135deg, #3a7bd5, #3a6073)", shadow: "rgba(58, 123, 213, 0.6)" },
  2: { emoji: "🏷️", gradient: "linear-gradient(135deg, #a855f7, #6366f1)", shadow: "rgba(168, 85, 247, 0.6)" },
  3: { emoji: "🧮", gradient: "linear-gradient(135deg, #10b981, #059669)", shadow: "rgba(16, 185, 129, 0.6)" },
  4: { emoji: "📦", gradient: "linear-gradient(135deg, #f59e0b, #d97706)", shadow: "rgba(245, 158, 11, 0.6)" },
  5: { emoji: "📢", gradient: "linear-gradient(135deg, #ec4899, #db2777)", shadow: "rgba(236, 72, 153, 0.6)" },
  6: { emoji: "💬", gradient: "linear-gradient(135deg, #f43f5e, #e11d48)", shadow: "rgba(244, 63, 94, 0.6)" },
  7: { emoji: "⚖️", gradient: "linear-gradient(135deg, #6366f1, #4f46e5)", shadow: "rgba(99, 102, 241, 0.6)" },
  8: { emoji: "🚧", gradient: "linear-gradient(135deg, #ef4444, #dc2626)", shadow: "rgba(239, 68, 68, 0.6)" },
  9: { emoji: "🛂", gradient: "linear-gradient(135deg, #06b6d4, #0891b2)", shadow: "rgba(6, 182, 212, 0.6)" },
  10: { emoji: "🌀", gradient: "linear-gradient(135deg, #14b8a6, #0d9488)", shadow: "rgba(20, 184, 166, 0.6)" },
  11: { emoji: "🌤️", gradient: "linear-gradient(135deg, #3b82f6, #2563eb)", shadow: "rgba(59, 130, 246, 0.6)" },
  12: { emoji: "🐱", gradient: "linear-gradient(135deg, #facc15, #ca8a04)", shadow: "rgba(250, 204, 21, 0.6)" },
  13: { emoji: "🛸", gradient: "linear-gradient(135deg, #00c6ff, #0072ff)", shadow: "rgba(0, 198, 255, 0.6)" },
  14: { emoji: "💎", gradient: "linear-gradient(135deg, #30cfd0, #330867)", shadow: "rgba(48, 207, 208, 0.6)" },
  15: { emoji: "🎨", gradient: "linear-gradient(135deg, #f857a6, #ff5858)", shadow: "rgba(248, 87, 166, 0.6)" },
  16: { emoji: "⚖️", gradient: "linear-gradient(135deg, #a1c4fd, #c2e9fb)", shadow: "rgba(161, 196, 253, 0.6)" },
  17: { emoji: "🔑", gradient: "linear-gradient(135deg, #11998e, #38ef7d)", shadow: "rgba(17, 153, 142, 0.6)" },
  18: { emoji: "🍦", gradient: "linear-gradient(135deg, #ff9a9e, #fecfef)", shadow: "rgba(255, 154, 158, 0.6)" },
  19: { emoji: "🧭", gradient: "linear-gradient(135deg, #fc00ff, #00dbde)", shadow: "rgba(252, 0, 255, 0.6)" },
  20: { emoji: "🧺", gradient: "linear-gradient(135deg, #f093fb, #f5576c)", shadow: "rgba(240, 147, 251, 0.6)" },
  21: { emoji: "🔑", gradient: "linear-gradient(135deg, #4facfe, #00f2fe)", shadow: "rgba(79, 172, 254, 0.6)" },
  22: { emoji: "📐", gradient: "linear-gradient(135deg, #43e97b, #38f9d7)", shadow: "rgba(67, 233, 123, 0.6)" },
  23: { emoji: "🧺", gradient: "linear-gradient(135deg, #fa709a, #fee140)", shadow: "rgba(250, 112, 154, 0.6)" },
  24: { emoji: "📖", gradient: "linear-gradient(135deg, #f9d423, #ff4e50)", shadow: "rgba(249, 212, 35, 0.6)" },
  25: { emoji: "🎠", gradient: "linear-gradient(135deg, #ee9ca7, #ffdde1)", shadow: "rgba(238, 156, 167, 0.6)" },
  26: { emoji: "🚨", gradient: "linear-gradient(135deg, #ff0844, #ffb199)", shadow: "rgba(255, 8, 68, 0.6)" },
  27: { emoji: "🤖", gradient: "linear-gradient(135deg, #2af598, #009efd)", shadow: "rgba(42, 245, 152, 0.6)" },
  28: { emoji: "🌀", gradient: "linear-gradient(135deg, #14b8a6, #0d9488)", shadow: "rgba(20, 184, 166, 0.6)" }, // for 반복문 1
  29: { emoji: "🧺", gradient: "linear-gradient(135deg, #f093fb, #f5576c)", shadow: "rgba(240, 147, 251, 0.6)" }, // for 반복문 2
  30: { emoji: "🔢", gradient: "linear-gradient(135deg, #fa709a, #fee140)", shadow: "rgba(250, 112, 154, 0.6)" }, // 구구단 연습문제
  31: { emoji: "🤖", gradient: "linear-gradient(135deg, #2af598, #009efd)", shadow: "rgba(42, 245, 152, 0.6)" }, // 함수 1
  32: { emoji: "🧪", gradient: "linear-gradient(135deg, #dec2cb, #c15c3d)", shadow: "rgba(222, 194, 203, 0.6)" }, // 함수 2
  33: { emoji: "🕵️", gradient: "linear-gradient(135deg, #b35d7f, #1a3c40)", shadow: "rgba(179, 93, 127, 0.6)" }, // 함수 3 (지역/전역)
  34: { emoji: "🎓", gradient: "linear-gradient(135deg, #ffd700, #b91c1c)", shadow: "rgba(255, 215, 0, 0.6)" }, // 우주 졸업식 (종합)
};

export default function Dashboard({
  currentLesson,
  completedLessons,
  totalStars,
  badges,
  onStartLesson,
  isMuted,
  onToggleMute,
  onResetProgress,
}) {
  const [showGlossary, setShowGlossary] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [resetError, setResetError] = useState("");

  const handleConfirmReset = () => {
    if (passwordInput === "1234") {
      audioSynth.playBeep(660, 0.05);
      onResetProgress();
      setShowResetModal(false);
    } else {
      audioSynth.playError();
      setResetError("❌ 비밀번호가 다릅니다. 다시 입력해주세요!");
    }
  };

  const handlePlanetClick = (lesson) => {
    const isCompleted = completedLessons.includes(lesson.id);
    const isActive = lesson.id === currentLesson;

    if (isCompleted || isActive) {
      audioSynth.playBeep(440, 0.1);
      onStartLesson(lesson.id);
    } else {
      audioSynth.playError();
    }
  };

  const handleOpenGlossary = () => {
    audioSynth.playBeep(880, 0.05);
    setShowGlossary(true);
  };

  const handleCloseGlossary = () => {
    audioSynth.playBeep(440, 0.05);
    setShowGlossary(false);
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "24px", minHeight: "100vh" }}>
      {/* Top Header Panel */}
      <header className="glass-panel" style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", padding: "20px 32px", marginBottom: "40px", gap: "16px" }}>
        <div>
          <h1 style={{ fontSize: "3rem", lineHeight: "1.2", background: "linear-gradient(to right, #00f0ff, #ff007f)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            지안이의 우주 파이썬 탐험대 🚀
          </h1>
          <p style={{ color: "#a5b4fc", fontSize: "1.1rem" }}>
            동반자 로봇 <strong>파이디(Pydi)</strong>와 함께 파이썬 행성들을 탐험해봐요!
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
          {/* Glossary button */}
          <button
            onClick={handleOpenGlossary}
            className="btn-cosmic btn-outline"
            style={{ padding: "12px 20px", fontSize: "0.95rem", borderColor: "#ffd700", color: "#ffd700" }}
          >
            💡 마법 용어 사전
          </button>

          {/* Free sandbox room button */}
          <button
            onClick={() => onStartLesson(0)}
            className="btn-cosmic btn-star animate-pulse-cyan"
            style={{ padding: "12px 20px", fontSize: "0.95rem" }}
          >
            🚀 자유 코딩 방
          </button>

          {/* Star Fuel display */}
          <div className="glass-panel" style={{ padding: "8px 16px", display: "flex", alignItems: "center", gap: "8px", background: "rgba(255, 215, 0, 0.1)", borderColor: "rgba(255, 215, 0, 0.4)", borderRadius: "18px" }}>
            <span style={{ fontSize: "1.6rem" }}>⭐</span>
            <div>
              <div style={{ fontSize: "0.75rem", color: "rgba(255,215,0,0.8)" }}>별 연료</div>
              <div style={{ fontSize: "1.2rem", fontWeight: "900", color: "#ffd700" }}>{totalStars} 개</div>
            </div>
          </div>

          {/* Sound Toggle */}
          <button 
            onClick={() => {
              onToggleMute();
              setTimeout(() => audioSynth.playBeep(800, 0.05), 50);
            }} 
            className="btn-cosmic btn-outline" 
            style={{ padding: "12px", borderRadius: "50%" }}
            title={isMuted ? "소리 켜기" : "소리 끄기"}
          >
            {isMuted ? <VolumeX size={24} style={{ color: "#ef4444" }} /> : <Volume2 size={24} style={{ color: "#00f0ff" }} />}
          </button>
        </div>
      </header>

      {/* Main Roadmap Area */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "32px", alignItems: "start" }}>
        {/* Planet Map (Left Column) */}
        <section className="glass-panel" style={{ padding: "32px", display: "flex", flexDirection: "column", gap: "20px", position: "relative" }}>
          <h2 style={{ fontSize: "2.2rem", color: "#00f0ff", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "12px" }}>
            🪐 파이썬 탐험 성도 (Roadmap)
          </h2>

          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "40px",
            padding: "20px 0",
            position: "relative"
          }}>
            {/* SVG Connecting Orbit Line (Vertical) */}
            <div style={{
              position: "absolute",
              left: "50%",
              top: "60px",
              bottom: "60px",
              width: "4px",
              background: "dashed rgba(0, 240, 255, 0.25)",
              borderLeft: "2px dashed rgba(0, 240, 255, 0.3)",
              transform: "translateX(-50%)",
              zIndex: 0
            }} />

            {lessons.map((lesson, index) => {
              const isCompleted = completedLessons.includes(lesson.id);
              const isActive = lesson.id === currentLesson;
              const isLocked = lesson.id > currentLesson;
              const style = planetStyles[lesson.id] || planetStyles[1];

              // Alternate left, center, right layouts for winding orbit path
              const alignment = index % 3 === 0 ? "flex-start" : index % 3 === 1 ? "center" : "flex-end";
              const paddingOffset = index % 3 === 0 ? "0 0 0 10%" : index % 3 === 1 ? "0" : "0 10% 0 0";

              return (
                <div 
                  key={lesson.id} 
                  style={{
                    display: "flex",
                    justifyContent: alignment,
                    padding: paddingOffset,
                    width: "100%",
                    zIndex: 1
                  }}
                >
                  <div
                    onClick={() => handlePlanetClick(lesson)}
                    className="glass-panel"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "20px",
                      padding: "16px 24px",
                      width: "360px",
                      cursor: isLocked ? "not-allowed" : "pointer",
                      opacity: isLocked ? 0.5 : 1,
                      borderWidth: isActive ? "2px" : "1.5px",
                      borderColor: isActive ? "var(--color-neon-cyan)" : isCompleted ? "rgba(16, 185, 129, 0.5)" : "var(--color-panel-border)",
                      boxShadow: isActive 
                        ? `0 0 25px rgba(0, 240, 255, 0.4), inset 0 0 10px rgba(0, 240, 255, 0.2)` 
                        : isCompleted ? `0 0 15px rgba(16, 185, 129, 0.1)` : "none",
                      transform: isActive ? "scale(1.03)" : "none",
                      animation: isActive ? "float 4s ease-in-out infinite" : "none"
                    }}
                  >
                    {/* Planet Sphere Graphic */}
                    <div 
                      className={isActive ? "animate-spin-slow" : ""}
                      style={{
                        width: "60px",
                        height: "60px",
                        borderRadius: "50%",
                        background: style.gradient,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "2rem",
                        boxShadow: `0 0 20px ${style.shadow}`,
                        flexShrink: 0
                      }}
                    >
                      {style.emoji}
                    </div>

                    {/* Planet text details */}
                    <div style={{ flexGrow: 1 }}>
                      <div style={{ fontSize: "0.8rem", color: isCompleted ? "#10b981" : isActive ? "#00f0ff" : "#9ca3af" }}>
                        LEVEL {lesson.id} • {lesson.planet}
                      </div>
                      <div style={{ fontSize: "1.25rem", fontWeight: "800", color: "#ffffff" }}>
                        {lesson.title}
                      </div>
                    </div>

                    {/* Status icon indicators */}
                    <div>
                      {isCompleted ? (
                        <CheckCircle size={28} style={{ color: "#10b981" }} />
                      ) : isActive ? (
                        <div style={{
                          background: "var(--color-neon-cyan)",
                          borderRadius: "50%",
                          padding: "6px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#111"
                        }} className="animate-pulse-cyan">
                          <Play size={18} fill="#111" />
                        </div>
                      ) : (
                        <Lock size={24} style={{ color: "#4b5563" }} />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Astronaut Profile & Badge Cabinet (Right Column) */}
        <aside style={{ display: "flex", flexDirection: "column", gap: "32px", position: "sticky", top: "24px" }}>
          {/* Pydi Assistant Advice Bubble */}
          <div className="glass-panel neon-cyan-glow" style={{ padding: "24px", position: "relative" }}>
            <div style={{ display: "flex", gap: "16px", alignItems: "center", marginBottom: "12px" }}>
              <div style={{ fontSize: "3rem" }} className="animate-float">🤖</div>
              <div>
                <h3 style={{ fontSize: "1.6rem", color: "#00f0ff" }}>가이드 파이디</h3>
                <span style={{ fontSize: "0.8rem", background: "rgba(0, 240, 255, 0.1)", color: "#00f0ff", padding: "2px 8px", borderRadius: "10px" }}>온라인 대기 중</span>
              </div>
            </div>
            <div style={{
              background: "rgba(10, 11, 27, 0.4)",
              padding: "12px 16px",
              borderRadius: "16px",
              fontSize: "0.95rem",
              lineHeight: "1.5",
              color: "#e0e7ff"
            }}>
              {currentLesson <= 34 ? (
                <>
                  "지안 탐험가님! 오늘 배워볼 코스는 <strong>{currentLesson}단계</strong>예요. 
                  우주선에 시동을 걸고 반짝반짝 빛나는 파이썬 행성들을 함께 정복하러 가볼까요? 삐-빅!"
                </>
              ) : (
                <>
                  "와아아! 지안 탐험가님, 모든 행성의 모험을 끝마쳤어요! 이제 대단한 파이썬 주니어 마스터예요! 🏆🎓🐾"
                </>
              )}
            </div>
          </div>

          {/* Space Badges Display Board */}
          <div className="glass-panel neon-pink-glow" style={{ padding: "24px" }}>
            <h3 style={{ fontSize: "1.8rem", color: "#ff007f", display: "flex", alignItems: "center", gap: "8px", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "10px", marginBottom: "16px" }}>
              <Award size={24} /> 우주 배지 장식장
            </h3>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "14px" }}>
              {lessons.map((lesson) => {
                const hasBadge = badges.includes(lesson.id);
                const style = planetStyles[lesson.id] || planetStyles[1];

                return (
                  <div
                    key={lesson.id}
                    style={{
                      aspectRatio: "1/1",
                      borderRadius: "16px",
                      background: hasBadge ? style.gradient : "rgba(255,255,255,0.03)",
                      border: `1.5px solid ${hasBadge ? "rgba(255, 255, 255, 0.3)" : "rgba(255,255,255,0.05)"}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.5rem",
                      boxShadow: hasBadge ? `0 4px 10px ${style.shadow}` : "none",
                      filter: hasBadge ? "none" : "grayscale(100%) opacity(30%)",
                      position: "relative"
                    }}
                    title={hasBadge ? `${lesson.title} 완료 배지` : "미획득 배지"}
                  >
                    {hasBadge ? style.emoji : "❓"}
                    {hasBadge && (
                      <span style={{
                        position: "absolute",
                        bottom: "-2px",
                        right: "-2px",
                        fontSize: "0.7rem",
                        background: "#ffd700",
                        color: "#111",
                        fontWeight: "900",
                        borderRadius: "50%",
                        width: "16px",
                        height: "16px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}>
                        ✓
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
            {badges.length === 0 && (
              <div style={{ textAlign: "center", color: "#9ca3af", fontSize: "0.9rem", marginTop: "16px" }}>
                아직 배지가 없어요. 첫 모험을 끝내고 배지를 받아보세요!
              </div>
            )}
          </div>

          {/* Reset Progress Section */}
          <div className="glass-panel" style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "12px", border: "1px dashed rgba(239, 68, 68, 0.3)" }}>
            <h4 style={{ fontSize: "1.2rem", color: "#ef4444", margin: 0 }}>⚙️ 시스템 관리자</h4>
            <p style={{ fontSize: "0.85rem", color: "#9ca3af", lineHeight: "1.4" }}>
              지안이의 학습 기록을 처음부터 다시 시작하려면 초기화를 진행할 수 있습니다.
            </p>
            <button
              onClick={() => {
                audioSynth.playBeep(330, 0.08);
                setShowResetModal(true);
                setPasswordInput("");
                setResetError("");
              }}
              className="btn-cosmic btn-outline"
              style={{
                padding: "10px 16px",
                fontSize: "0.9rem",
                borderColor: "#ef4444",
                color: "#ef4444",
                width: "100%",
                borderRadius: "14px"
              }}
            >
              🧹 학습 기록 초기화
            </button>
          </div>
        </aside>
      </div>

      {/* POPUP MODAL: Python Magic Dictionary */}
      {showGlossary && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(6, 7, 20, 0.85)",
          backdropFilter: "blur(10px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 100
        }}>
          <div className="glass-panel neon-cyan-glow" style={{
            padding: "32px",
            width: "90%",
            maxWidth: "650px",
            maxHeight: "85vh",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            position: "relative"
          }}>
            <button 
              onClick={handleCloseGlossary}
              className="btn-cosmic btn-outline"
              style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                padding: "8px",
                borderRadius: "50%"
              }}
            >
              <X size={18} />
            </button>

            <h2 style={{ fontSize: "2.5rem", color: "#00f0ff", textAlign: "center", marginBottom: "10px" }}>
              💡 파이디의 파이썬 마법 사전
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ background: "rgba(255,255,255,0.03)", padding: "16px", borderRadius: "18px", borderLeft: "5px solid #00f0ff" }}>
                <strong style={{ fontSize: "1.2rem", color: "#00f0ff" }}>🪐 파이썬 (Python) 이란?</strong>
                <p style={{ fontSize: "1rem", color: "#e2e8f0", marginTop: "6px", lineHeight: "1.5" }}>
                  "우주선 컴퓨터와 막힘없이 대화하기 위해 사용하는 **마법사들의 은하 언어**예요! 
                  파이썬 언어로 코드를 써서 컴퓨터에게 마법을 걸 수 있답니다."
                </p>
              </div>

              <div style={{ background: "rgba(255,255,255,0.03)", padding: "16px", borderRadius: "18px", borderLeft: "5px solid #ff007f" }}>
                <strong style={{ fontSize: "1.2rem", color: "#ff007f" }}>📝 코딩 (Coding) 이란?</strong>
                <p style={{ fontSize: "1rem", color: "#e2e8f0", marginTop: "6px", lineHeight: "1.5" }}>
                  "우주 비행사가 경로 조종 지도를 작성하듯, **컴퓨터가 알아들을 수 있는 마법 명령어들을 순서대로 나열하여 지시서를 만드는 행위**예요."
                </p>
              </div>

              <div style={{ background: "rgba(255,255,255,0.03)", padding: "16px", borderRadius: "18px", borderLeft: "5px solid #ffd700" }}>
                <strong style={{ fontSize: "1.2rem", color: "#ffd700" }}>⚡ 실행 (Run) 이란?</strong>
                <p style={{ fontSize: "1rem", color: "#e2e8f0", marginTop: "6px", lineHeight: "1.5" }}>
                  "우리가 열심히 작성한 **코딩 주문을 컴퓨터에 전송하여 마법 기계가 직접 행동을 하도록 부추기는 신호**예요. 우리 앱에서는 [주문 외우기]가 실행 버튼이랍니다."
                </p>
              </div>

              <div style={{ background: "rgba(255,255,255,0.03)", padding: "16px", borderRadius: "18px", borderLeft: "5px solid #bd00ff" }}>
                <strong style={{ fontSize: "1.2rem", color: "#bd00ff" }}>🐛 버그 (Bug) 와 에러 (Error) 란?</strong>
                <p style={{ fontSize: "1rem", color: "#e2e8f0", marginTop: "6px", lineHeight: "1.5" }}>
                  "마법 코드 사이에 **오타가 생기거나, 괄호 짝을 빼먹어서 잠시 기계가 고장 난 외계 먼지벌레 낀 상태**예요. 파이디가 주는 한글 힌트를 보고 오타 벌레를 슥슥 고쳐주면 다시 완벽히 실행돼요!"
                </p>
              </div>

              <div style={{ background: "rgba(255,255,255,0.03)", padding: "16px", borderRadius: "18px", borderLeft: "5px solid #10b981" }}>
                <strong style={{ fontSize: "1.2rem", color: "#10b981" }}>📦 변수 (Variable / 마법 상자) 란?</strong>
                <p style={{ fontSize: "1rem", color: "#e2e8f0", marginTop: "6px", lineHeight: "1.5" }}>
                  "보석(숫자)이나 이름(글자)을 **나중에 다시 열어보기 위해 바깥에 이쁜 이름표를 붙여 보관해두는 마법의 보관 상자**예요."
                </p>
              </div>

              <div style={{ background: "rgba(255,255,255,0.03)", padding: "16px", borderRadius: "18px", borderLeft: "5px solid #06b6d4" }}>
                <strong style={{ fontSize: "1.2rem", color: "#06b6d4" }}>📡 API 란?</strong>
                <p style={{ fontSize: "1rem", color: "#e2e8f0", marginTop: "6px", lineHeight: "1.5" }}>
                  "내가 직접 그릴 필요 없이, **저 멀리 있는 친구(우주 기상청이나 냥이 구조대 드론)에게 무선 편지를 보내서 실시간 날씨나 고양이 사진을 안전하게 배달받는 퀵 배송 서비스**예요!"
                </p>
              </div>
            </div>

            <button
              onClick={handleCloseGlossary}
              className="btn-cosmic btn-cyan"
              style={{ padding: "12px 28px", fontSize: "1.1rem", marginTop: "10px", width: "100%" }}
            >
              사전 닫고 탐험 계속하기 🚀
            </button>
          </div>
        </div>
      )}

      {/* POPUP MODAL: Guardian Reset Password Check */}
      {showResetModal && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(6, 7, 20, 0.9)",
          backdropFilter: "blur(12px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 110
        }}>
          <div className="glass-panel" style={{
            padding: "32px",
            width: "90%",
            maxWidth: "400px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            borderColor: "rgba(239, 68, 68, 0.4)",
            boxShadow: "0 0 30px rgba(239, 68, 68, 0.2)"
          }}>
            <h3 style={{ fontSize: "1.8rem", color: "#ef4444", textAlign: "center", margin: 0 }}>
              ⚠️ 학습 기록 초기화 경고
            </h3>
            
            <div style={{
              background: "rgba(239, 68, 68, 0.05)",
              padding: "14px",
              borderRadius: "16px",
              border: "1px solid rgba(239, 68, 68, 0.2)",
              fontSize: "0.95rem",
              color: "#fca5a5",
              lineHeight: "1.5"
            }}>
              "엄마, 아빠가 확인해 주세요! 이 작업을 진행하면 지안이가 획득한 모든 우주 배지와 별 연료가 지워집니다."
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <label style={{ fontSize: "0.9rem", color: "#a5b4fc", fontWeight: "bold" }}>
                보호자 비밀번호 입력 (1234):
              </label>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="비밀번호 4자리 입력"
                style={{
                  background: "rgba(0,0,0,0.3)",
                  border: "2px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "12px",
                  padding: "12px",
                  fontSize: "1.2rem",
                  color: "white",
                  textAlign: "center",
                  letterSpacing: "4px",
                  outline: "none"
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleConfirmReset();
                }}
                autoFocus
              />
              {resetError && (
                <span style={{ fontSize: "0.85rem", color: "#ef4444", textAlign: "center", fontWeight: "bold" }}>
                  {resetError}
                </span>
              )}
            </div>

            <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
              <button
                onClick={() => {
                  audioSynth.playBeep(440, 0.05);
                  setShowResetModal(false);
                }}
                className="btn-cosmic btn-outline"
                style={{ flex: 1, padding: "12px", borderRadius: "14px" }}
              >
                취소
              </button>
              <button
                onClick={handleConfirmReset}
                className="btn-cosmic"
                style={{
                  flex: 1,
                  padding: "12px",
                  background: "linear-gradient(135deg, #ef4444, #b91c1c)",
                  color: "white",
                  borderRadius: "14px"
                }}
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import { useEffect, useState } from "react";
import StarfieldBackground from "./components/StarfieldBackground";
import Dashboard from "./components/Dashboard";
import Workspace from "./components/Workspace";
import MiniGameContainer from "./components/MiniGameContainer";
import { audioSynth } from "./utils/audioSynth";
import { getLesson, lessons } from "./data/lessons";

const STORAGE_KEY = "jian_progress_v2";
const EMPTY_PROGRESS = { currentLesson: 1, completedLessons: [], badges: [] };

// 완료한 레슨 바로 다음까지는 항상 열려 있도록 맞춰 줍니다.
function normalize(progress) {
  const lastDone = Math.max(0, ...progress.completedLessons);
  return { ...progress, currentLesson: Math.max(progress.currentLesson, lastDone + 1) };
}

// 진도 불러오기 (예전 버전의 저장 키도 이어받습니다)
function loadProgress() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return normalize({ ...EMPTY_PROGRESS, ...JSON.parse(saved) });

    const legacyCurrent = localStorage.getItem("jian_current_lesson");
    if (legacyCurrent) {
      return normalize({
        currentLesson: parseInt(legacyCurrent, 10) || 1,
        completedLessons: JSON.parse(localStorage.getItem("jian_completed_lessons") || "[]"),
        badges: JSON.parse(localStorage.getItem("jian_badges") || "[]"),
      });
    }
  } catch (err) {
    console.error("저장된 진도를 불러오지 못했어요:", err);
  }
  return EMPTY_PROGRESS;
}

function loadMuted() {
  try {
    return localStorage.getItem("jian_mute") === "true";
  } catch {
    return false;
  }
}

export default function App() {
  const [view, setView] = useState("dashboard"); // dashboard | workspace | minigame
  const [selectedLessonId, setSelectedLessonId] = useState(null);
  const [progress, setProgress] = useState(loadProgress);
  const [isMuted, setIsMuted] = useState(() => audioSynth.setMuteState(loadMuted()));

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (err) {
      console.error("진도를 저장하지 못했어요:", err);
    }
  }, [progress]);

  const { currentLesson, completedLessons, badges } = progress;
  // 별 연료 = 완료한 레슨 수
  const totalStars = completedLessons.filter((id) => getLesson(id)).length;

  const goDashboard = () => {
    setView("dashboard");
    setSelectedLessonId(null);
  };

  const handleStartLesson = (lessonId) => {
    setSelectedLessonId(lessonId);
    setView("workspace");
  };

  // 코드 임무 + 퀴즈를 모두 마치면 호출됩니다. 다음 레슨은 여기서 열립니다.
  const handleCompleteLesson = (lessonId) => {
    const lesson = getLesson(lessonId);
    setProgress((prev) => ({
      currentLesson: lessonId === prev.currentLesson ? Math.min(prev.currentLesson + 1, lessons.length + 1) : prev.currentLesson,
      completedLessons: prev.completedLessons.includes(lessonId) ? prev.completedLessons : [...prev.completedLessons, lessonId],
      // 미니게임이 없는 레슨은 완료와 동시에 배지를 줍니다.
      badges: !lesson?.miniGame && !prev.badges.includes(lessonId) ? [...prev.badges, lessonId] : prev.badges,
    }));

    if (lesson?.miniGame) setView("minigame");
    else goDashboard();
  };

  const handleCloseGame = (earnedBadge) => {
    if (earnedBadge && selectedLessonId) {
      setProgress((prev) => (prev.badges.includes(selectedLessonId) ? prev : { ...prev, badges: [...prev.badges, selectedLessonId] }));
    }
    goDashboard();
  };

  const handleResetProgress = () => setProgress(EMPTY_PROGRESS);

  const handleToggleMute = () => {
    const next = audioSynth.toggleMute();
    setIsMuted(next);
    try {
      localStorage.setItem("jian_mute", String(next));
    } catch {
      /* 무시 */
    }
  };

  return (
    <>
      <StarfieldBackground />

      {view === "dashboard" && (
        <Dashboard
          currentLesson={currentLesson}
          completedLessons={completedLessons}
          totalStars={totalStars}
          badges={badges}
          onStartLesson={handleStartLesson}
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
          onResetProgress={handleResetProgress}
        />
      )}

      {view === "workspace" && (
        <Workspace
          key={selectedLessonId}
          lessonId={selectedLessonId}
          maxUnlockedLesson={Math.min(currentLesson, lessons.length)}
          isCompleted={completedLessons.includes(selectedLessonId)}
          onBack={() => {
            audioSynth.playBeep(440, 0.08);
            goDashboard();
          }}
          onCompleteLesson={handleCompleteLesson}
        />
      )}

      {view === "minigame" && <MiniGameContainer key={selectedLessonId} lessonId={selectedLessonId} onClose={handleCloseGame} />}
    </>
  );
}

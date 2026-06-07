import React, { useState, useEffect } from "react";
import StarfieldBackground from "./components/StarfieldBackground";
import Dashboard from "./components/Dashboard";
import Workspace from "./components/Workspace";
import MiniGameContainer from "./components/MiniGameContainer";
import { audioSynth } from "./utils/audioSynth";

export default function App() {
  const [view, setView] = useState("dashboard"); // dashboard | workspace | minigame
  const [selectedLessonId, setSelectedLessonId] = useState(null);

  // Persistence States (Local Storage)
  const [currentLesson, setCurrentLesson] = useState(1);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [totalStars, setTotalStars] = useState(0);
  const [badges, setBadges] = useState([]);
  const [isMuted, setIsMuted] = useState(false);

  // Load progress on mount
  useEffect(() => {
    try {
      const savedCurrent = localStorage.getItem("jian_current_lesson");
      const savedCompleted = localStorage.getItem("jian_completed_lessons");
      const savedStars = localStorage.getItem("jian_stars");
      const savedBadges = localStorage.getItem("jian_badges");
      const savedMute = localStorage.getItem("jian_mute");

      if (savedCurrent) setCurrentLesson(parseInt(savedCurrent, 10));
      if (savedCompleted) setCompletedLessons(JSON.parse(savedCompleted));
      if (savedStars) setTotalStars(parseInt(savedStars, 10));
      if (savedBadges) setBadges(JSON.parse(savedBadges));
      if (savedMute) {
        const muteVal = savedMute === "true";
        setIsMuted(muteVal);
        audioSynth.setMuteState(muteVal);
      }
    } catch (err) {
      console.error("로컬 저장소 로딩 에러:", err);
    }
  }, []);

  // Save progress changes
  const saveProgress = (updatedCurrent, updatedCompleted, updatedStars, updatedBadges) => {
    try {
      localStorage.setItem("jian_current_lesson", updatedCurrent.toString());
      localStorage.setItem("jian_completed_lessons", JSON.stringify(updatedCompleted));
      localStorage.setItem("jian_stars", updatedStars.toString());
      localStorage.setItem("jian_badges", JSON.stringify(updatedBadges));
    } catch (err) {
      console.error("로컬 저장소 저장 에러:", err);
    }
  };

  const handleStartLesson = (lessonId) => {
    setSelectedLessonId(lessonId);
    setView("workspace");
  };

  const handleCompleteLesson = (lessonId) => {
    const isNewCompletion = !completedLessons.includes(lessonId);
    let nextCompleted = [...completedLessons];
    let nextStars = totalStars;

    if (isNewCompletion) {
      nextCompleted.push(lessonId);
      nextStars += 1;
      setCompletedLessons(nextCompleted);
      setTotalStars(nextStars);
    }

    // 이론 전용 레슨(isTheoryOnly: true)인 경우 미니게임을 건너뛰고 바로 완료 배지를 지급한 뒤 대시보드로 이동합니다.
    const lesson = lessons.find((l) => l.id === lessonId);
    if (lesson && lesson.isTheoryOnly) {
      let nextBadges = [...badges];
      let nextCurrent = currentLesson;

      if (!nextBadges.includes(lessonId)) {
        nextBadges.push(lessonId);
        setBadges(nextBadges);
      }

      if (lessonId === currentLesson) {
        nextCurrent = currentLesson + 1;
        setCurrentLesson(nextCurrent);
      }

      saveProgress(nextCurrent, nextCompleted, nextStars, nextBadges);
      setView("dashboard");
      setSelectedLessonId(null);
    } else {
      saveProgress(currentLesson, nextCompleted, nextStars, badges);
      setView("minigame"); // 미니게임이 있는 경우 게임 화면으로 이동
    }
  };

  const handleCloseGame = (earnedBadge) => {
    let nextBadges = [...badges];
    let nextCurrent = currentLesson;

    if (earnedBadge && selectedLessonId) {
      // Award badge if not already unlocked
      if (!nextBadges.includes(selectedLessonId)) {
        nextBadges.push(selectedLessonId);
        setBadges(nextBadges);
      }

      // If they finished the highest unlocked lesson, unlock the next one!
      if (selectedLessonId === currentLesson) {
        nextCurrent = currentLesson + 1;
        setCurrentLesson(nextCurrent);
      }
    }

    saveProgress(nextCurrent, completedLessons, totalStars, nextBadges);
    setView("dashboard");
    setSelectedLessonId(null);
  };

  const handleResetProgress = () => {
    setCurrentLesson(1);
    setCompletedLessons([]);
    setTotalStars(0);
    setBadges([]);
    saveProgress(1, [], 0, []);
  };

  const handleToggleMute = () => {
    const nextMute = audioSynth.toggleMute();
    setIsMuted(nextMute);
    localStorage.setItem("jian_mute", nextMute.toString());
  };

  return (
    <>
      {/* Background stars */}
      <StarfieldBackground />

      {/* Main Views Routing */}
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
          lessonId={selectedLessonId}
          completedLessons={completedLessons}
          onBack={() => {
            audioSynth.playBeep(440, 0.08);
            setView("dashboard");
            setSelectedLessonId(null);
          }}
          onCompleteLesson={handleCompleteLesson}
        />
      )}

      {view === "minigame" && (
        <MiniGameContainer
          lessonId={selectedLessonId}
          onClose={handleCloseGame}
        />
      )}
    </>
  );
}

import React, { useState, useEffect, useRef } from "react";
import { X, Award, ShieldAlert, Zap } from "lucide-react";
import { lessons } from "../data/lessons";
import { audioSynth } from "../utils/audioSynth";

export default function MiniGameContainer({ lessonId, onClose }) {
  const lesson = lessons.find((l) => l.id === lessonId);
  const miniGame = lesson ? lesson.miniGame : null;

  // ===================== [핵심 상태 설정] =====================
  // 게임 진행 상태
  const [gameWon, setGameWon] = useState(false);
  const [score, setScore] = useState(0);

  // [오락실화 추가] 플레이어 체력(하트) 및 게임오버 상태
  // 하트 개수는 총 3개로 시작하며, 0개가 되면 게임 오버 화면이 뜹니다.
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);

  // 시각 효과 상태들 (화면 흔들림, 폭죽 가루, 풍선 터진 먼지 파편)
  const [particles, setParticles] = useState([]);
  const [confetti, setConfetti] = useState([]);
  const [isScreenShaking, setIsScreenShaking] = useState(false);

  // 1. 풍선 터트리기 관련 상태들
  const [balloonList, setBalloonList] = useState([]);
  const [targetCharIdx, setTargetCharIdx] = useState(0);
  const [errorBalloonId, setErrorBalloonId] = useState(null);

  // 타이머, 패널티 및 역대 최고 기록 관련 상태들
  const [startTime, setStartTime] = useState(null); // 게임 시작 타임스탬프
  const [elapsedTime, setElapsedTime] = useState(0); // 경과 시간 (초 단위)
  const [bestRecord, setBestRecord] = useState(null); // localStorage에서 불러온 역대 최단 시간 기록
  const [isNewRecord, setIsNewRecord] = useState(false); // 이번 시도에서 최고 기록을 달성했는지 여부
  const [isTimerRunning, setIsTimerRunning] = useState(false); // 타이머 작동 상태
  const [penaltyActive, setPenaltyActive] = useState(false); // 오답 풍선 클릭 시 페널티 효과 트리거

  // 2. 디펜스 게임 관련 상태들
  const [enemyX, setEnemyX] = useState(100); // 적의 가로 위치 %
  const [currentEnemyIdx, setCurrentEnemyIdx] = useState(0);
  const [turretType, setTurretType] = useState(""); // 발사할 대포 타입 ("string" | "number")
  const [defenseFeedback, setDefenseFeedback] = useState("바이러스를 요격할 대포를 준비하세요!");
  const [projectiles, setProjectiles] = useState([]);
  const [blasts, setBlasts] = useState([]);
  const [baseRecoil, setBaseRecoil] = useState(false);
  const [muzzleFlash, setMuzzleFlash] = useState(false);
  const [enemyHit, setEnemyHit] = useState(false);

  // 3. 리듬 게임 관련 상태들
  const [noteX, setNoteX] = useState(100); // 노트 가로 위치 %
  const [currentBeatIdx, setCurrentBeatIdx] = useState(0);
  const [hitFeedback, setHitFeedback] = useState(""); // PERFECT! | Miss! 등 판정 피드백
  const [combo, setCombo] = useState(0);
  const [comboActive, setComboActive] = useState(false);
  const [hitPulse, setHitPulse] = useState(false);

  // 4. API 연결 게임 관련 상태들
  const [laserBeamActive, setLaserBeamActive] = useState(false);
  const [apiConnected, setApiConnected] = useState(false);

  // ===================== [효과 및 루프 관리] =====================

  // 레슨이 변경되거나 미니게임이 처음 실행될 때 모든 게임 상태를 깔끔하게 초기화합니다.
  useEffect(() => {
    setGameWon(false);
    setScore(0);
    setLives(3); // 하트 개수 리셋
    setGameOver(false); // 게임오버 상태 리셋
    setParticles([]);
    setConfetti([]);
    setIsScreenShaking(false);
    setTargetCharIdx(0);
    setErrorBalloonId(null);
    setEnemyX(100);
    setCurrentEnemyIdx(0);
    setProjectiles([]);
    setBlasts([]);
    setBaseRecoil(false);
    setMuzzleFlash(false);
    setEnemyHit(false);
    setNoteX(100);
    setCurrentBeatIdx(0);
    setHitFeedback("");
    setCombo(0);
    setComboActive(false);
    setHitPulse(false);
    setLaserBeamActive(false);
    setApiConnected(false);
    setDefenseFeedback("바이러스를 요격할 대포를 준비하세요!");

    // 타이머 및 최고 기록 관련 세팅 리셋
    setStartTime(null);
    setElapsedTime(0);
    setIsNewRecord(false);
    setIsTimerRunning(false);
    setPenaltyActive(false);

    if (miniGame) {
      if (miniGame.type === "balloon-pop") {
        // 로컬 저장소에서 해당 레슨의 우주 최고 기록(초 단위)을 불러와 보관해요
        const savedBest = localStorage.getItem(`jianpython_lesson_${lessonId}_best_time`);
        if (savedBest) {
          setBestRecord(parseFloat(savedBest));
        } else {
          setBestRecord(null);
        }
        initializeBalloons();
      } else if (miniGame.type === "rhythm-beat") {
        // 리듬 게임과 디펜스 게임도 시작 시 타이머를 가동하여 플레이 시간을 잽니다.
        setStartTime(Date.now());
        setIsTimerRunning(true);
      } else if (miniGame.type === "code-defense") {
        setStartTime(Date.now());
        setIsTimerRunning(true);
      }
    }
  }, [lessonId, miniGame]);

  // 게임 승리 시 축하 폭죽(Confetti) 조각 효과를 화면에 뿌려줍니다.
  useEffect(() => {
    if (gameWon) {
      const colors = ["#ff007f", "#00f0ff", "#ffd700", "#bd00ff", "#10b981", "#ff4500"];
      const newConfetti = Array.from({ length: 60 }).map(() => ({
        id: Math.random(),
        left: `${Math.random() * 100}%`,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: `${Math.random() * 1.5}s`,
        duration: `${2 + Math.random() * 2}s`
      }));
      setConfetti(newConfetti);
    } else {
      setConfetti([]);
    }
  }, [gameWon]);

  // 실시간으로 흐르는 플레이 시간 계산 (타이머)
  useEffect(() => {
    if (!isTimerRunning || gameWon || gameOver || !startTime) return;

    const timerInterval = setInterval(() => {
      const currentElapsed = (Date.now() - startTime) / 1000;
      setElapsedTime(currentElapsed < 0 ? 0 : currentElapsed);
    }, 50);

    return () => clearInterval(timerInterval);
  }, [isTimerRunning, gameWon, gameOver, startTime]);

  // ===================== [리듬 게임 키보드 조작 매핑] =====================
  // 오락실 리듬 게임처럼 키보드 조작이 가능하게 돕는 키 리스너입니다.
  // A 키 또는 왼쪽 화살표 키를 누르면 "O(참)"을 입력한 것으로 처리하고,
  // S 키 또는 오른쪽 화살표 키를 누르면 "X(거짓)"를 입력한 것으로 판단합니다.
  useEffect(() => {
    if (!miniGame || miniGame.type !== "rhythm-beat" || gameWon || gameOver) return;

    const handleKeyDown = (e) => {
      if (e.key === "a" || e.key === "A" || e.key === "ArrowLeft") {
        handleRhythmClick("O");
      } else if (e.key === "s" || e.key === "S" || e.key === "ArrowRight") {
        handleRhythmClick("X");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [miniGame, gameWon, gameOver, currentBeatIdx, noteX]);

  // ===================== [게임 1: 풍선 게임 초기화] =====================
  // 풍선 터트리기 초기화 (정답 풍선 + 오답 방해 풍선 혼합 셔플)
  const initializeBalloons = () => {
    // 34강 커리큘럼 기준 스펠링(순서대로 글자 모으기) 게임이 적용되는 레슨 목록입니다.
    const isSpellingGame = [8, 9, 18, 26, 28, 31, 34].includes(lessonId);
    const rawBalloons = miniGame.balloons || [];
    
    // 진짜 정답 풍선 데이터 생성
    const correctItems = rawBalloons.map((val, idx) => ({
      id: `correct-${val}-${idx}-${Math.random()}`,
      value: val,
      isFake: false,
      popped: false
    }));

    // 레슨에 따른 방해 풍선 후보군
    let fakeValues = [];
    // 28강(별 그리기)은 스펠링 게임(True)이지만 한글/영문 알파벳 대신 폭탄이나 해골 같은 특수 문자를 띄웁니다.
    if (lessonId === 28) {
      fakeValues = ["💀", "💣", "🚫"];
    } else if (isSpellingGame) {
      const alphabet = "abcdefghijklmnopqrstuvwxyz";
      const wordChars = miniGame.word.toLowerCase().split("");
      const candidates = alphabet.split("").filter(c => !wordChars.includes(c));
      for (let i = 0; i < 3; i++) {
        if (candidates.length > 0) {
          const randIdx = Math.floor(Math.random() * candidates.length);
          fakeValues.push(candidates[randIdx]);
          candidates.splice(randIdx, 1);
        }
      }
    } else if (lessonId === 10) {
      fakeValues = ["4+6", "12-3", "8+1"];
    } else if (lessonId === 12) {
      // 12강 문자열 인덱싱 오답 후보군
      fakeValues = ["word[1]", "word[2]", "word[3]"];
    } else if (lessonId === 17) {
      // 17강 리스트 인덱싱 오답 후보군
      fakeValues = ["fruits[0]", "fruits[2]", "fruits[3]"];
    } else {
      fakeValues = ["x", "z", "q"];
    }

    // 가짜 풍선 데이터 생성
    const fakeItems = fakeValues.map((val, idx) => ({
      id: `fake-${val}-${idx}-${Math.random()}`,
      value: val,
      isFake: true,
      popped: false
    }));

    // 무작위로 섞어서 랜덤 위치 지정
    const allItems = [...correctItems, ...fakeItems];
    for (let i = allItems.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allItems[i], allItems[j]] = [allItems[j], allItems[i]];
    }

    const colorPalette = ["#ff007f", "#00f0ff", "#ffd700", "#bd00ff", "#10b981", "#ff7f00", "#a855f7"];
    const finalItems = allItems.map((item, idx) => {
      let color = colorPalette[idx % colorPalette.length];
      if (item.isFake && (item.value === "💀" || item.value === "💣" || item.value === "🚫")) {
        color = "#ef4444";
      }
      return {
        ...item,
        color,
        x: 10 + idx * (80 / Math.max(1, allItems.length - 1)),
        y: 15 + Math.random() * 35,
        speed: 0.3 + Math.random() * 0.4,
        direction: Math.random() > 0.5 ? 1 : -1,
        windPhase: Math.random() * 100,
        windSpeed: 0.02 + Math.random() * 0.03
      };
    });

    setBalloonList(finalItems);
    setTargetCharIdx(0);

    // 타이머 기록 개시
    setStartTime(Date.now());
    setElapsedTime(0);
    setIsTimerRunning(true);
    setIsNewRecord(false);
  };

  // 풍선 둥실둥실 살랑이게 만드는 가로세로 루프
  useEffect(() => {
    if (!miniGame || miniGame.type !== "balloon-pop" || gameWon || gameOver) return;

    const interval = setInterval(() => {
      setBalloonList((prev) =>
        prev.map((b) => {
          let nextY = b.y + b.speed * b.direction;
          let nextDir = b.direction;

          if (nextY > 72) {
            nextY = 72;
            nextDir = -1;
          } else if (nextY < 8) {
            nextY = 8;
            nextDir = 1;
          }

          const nextPhase = (b.windPhase || 0) + (b.windSpeed || 0.03);
          return { ...b, y: nextY, direction: nextDir, windPhase: nextPhase };
        })
      );
    }, 50);

    return () => clearInterval(interval);
  }, [miniGame, gameWon, gameOver]);

  // ===================== [게임 2: 디펜스 게임 바이러스 돌진 루프] =====================
  // 바이러스가 왼쪽(0%에 가까운 쪽)으로 무섭게 돌진합니다.
  // 만약 20% 위치에 닿으면, 기지의 보호막이 타격을 받아 하트(체력)가 1개 차감됩니다!
  useEffect(() => {
    if (!miniGame || miniGame.type !== "code-defense" || gameWon || gameOver || enemyHit) return;

    const interval = setInterval(() => {
      setEnemyX((x) => {
        if (x <= 20) {
          // 기지 충돌 처리!
          audioSynth.playError();
          
          // 플레이어 체력 감소 및 게임오버 검출
          setLives((l) => {
            const nextLives = l - 1;
            if (nextLives <= 0) {
              setGameOver(true);
            }
            return nextLives;
          });

          // 화면 흔들림 효과 유발
          setIsScreenShaking(true);
          setTimeout(() => setIsScreenShaking(false), 300);

          setDefenseFeedback("💥 아야! 바이러스가 장벽에 충돌했습니다! 하트 에너지가 깎였어요!");
          
          // 바이러스를 격퇴시키고 100% 위치에서 다음 바이러스를 불러옵니다.
          // 오락실 리듬과 룰 호환을 위해 다음 적으로 전환합니다.
          const nextIdx = currentEnemyIdx + 1;
          if (nextIdx >= miniGame.enemies.length) {
            // 더 이상 적이 없는 상황에서 충돌했다면, 마지막 수비 실패로 간주
            setLives(0);
            setGameOver(true);
          } else {
            setCurrentEnemyIdx(nextIdx);
          }
          return 100;
        }
        return x - 1.5; // 전진 속도를 조금 더 조율하여 스릴있게 변경
      });
    }, 45);

    return () => clearInterval(interval);
  }, [miniGame, gameWon, gameOver, currentEnemyIdx, enemyHit]);

  // ===================== [게임 3: 리듬 게임 비트 흐름 루프] =====================
  // 노트 비트가 오른쪽(100%)에서 판정선(16.6%)을 향해 날아옵니다.
  // 판정선 존을 넘어서서 5% 이하로 도달해버리면 노트를 완전히 놓친 것(Miss)이 되어,
  // 콤보가 끊기고 하트(체력)가 1개 깎이며 다음 노트로 넘어갑니다!
  useEffect(() => {
    if (!miniGame || miniGame.type !== "rhythm-beat" || gameWon || gameOver) return;

    const interval = setInterval(() => {
      setNoteX((x) => {
        if (x <= 5) {
          // 노트를 누르지 못하고 그냥 스쳐 지나감 (Miss 처리)
          audioSynth.playError();
          setHitFeedback("노트를 놓쳤어요! Miss! 😮");
          setCombo(0);

          // 하트(체력) 차감
          setLives((l) => {
            const nextLives = l - 1;
            if (nextLives <= 0) {
              setGameOver(true);
            }
            return nextLives;
          });

          setIsScreenShaking(true);
          setTimeout(() => setIsScreenShaking(false), 300);

          setTimeout(() => setHitFeedback(""), 800);

          // 다음 노트 인덱스로 전환
          const nextIdx = (currentBeatIdx + 1) % miniGame.beats.length;
          setCurrentBeatIdx(nextIdx);
          return 100; // 새 노트 위치 리셋
        }
        return x - 2.5; // 속도를 살짝 업하여 리듬감을 줍니다.
      });
    }, 40);

    return () => clearInterval(interval);
  }, [miniGame, gameWon, gameOver, currentBeatIdx]);

  // 파티클(풍선 터질 때 사방으로 흩어지는 효과) 물리 연출 생성
  const triggerPopParticles = (x, y, color) => {
    const count = 24;
    const newParticles = Array.from({ length: count }).map((_, i) => {
      const angle = (i / count) * Math.PI * 2 + Math.random() * 0.4;
      const distance = 55 + Math.random() * 85;
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance;
      return {
        id: Math.random(),
        x,
        y,
        color,
        tx: `${tx}px`,
        ty: `${ty}px`,
        size: 4 + Math.random() * 8
      };
    });
    setParticles((prev) => [...prev, ...newParticles]);
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => !newParticles.find((np) => np.id === p.id)));
    }, 600);
  };

  // 미니게임 최종 성공 시 기록 측정 및 보상 획득 상태 기록
  const handleGameSuccess = (finalTargetIdx = targetCharIdx) => {
    setIsTimerRunning(false);
    const finalTime = parseFloat(((Date.now() - startTime) / 1000).toFixed(2));
    setElapsedTime(finalTime);

    const recordKey = `jianpython_lesson_${lessonId}_best_time`;
    const savedBest = localStorage.getItem(recordKey);
    
    if (!savedBest || finalTime < parseFloat(savedBest)) {
      localStorage.setItem(recordKey, finalTime.toString());
      setBestRecord(finalTime);
      setIsNewRecord(true);
    }

    setTimeout(() => {
      audioSynth.playWin();
      setGameWon(true);
    }, 400);
  };

  // ===================== [GAME ACTIONS HANDLERS] =====================

  // 1. 풍선 터트리기 클릭 핸들러
  const handleBalloonClick = (balloon) => {
    if (balloon.popped || gameWon || gameOver || errorBalloonId) return;

    // 가짜 방해 풍선 클릭 시: 페널티로 시간을 3초 지연시키고 터뜨립니다.
    if (balloon.isFake) {
      audioSynth.playError();
      setErrorBalloonId(balloon.id);
      setTimeout(() => setErrorBalloonId(null), 600);

      setStartTime((prev) => prev - 3000); // 패널티 3초 추가
      setPenaltyActive(true);
      setTimeout(() => setPenaltyActive(false), 1000);

      const currentOffset = Math.sin(balloon.windPhase || 0) * 16;
      const actualX = balloon.x + (currentOffset / 8.5);
      triggerPopParticles(actualX, balloon.y, "#ef4444");

      setBalloonList((prev) => prev.map((b) => (b.id === balloon.id ? { ...b, popped: true } : b)));
      return;
    }

    let isCorrect = false;
    // 34강 커리큘럼 기준 스펠링 게임 리스트로 재매핑
    const isSpellingGame = [8, 9, 18, 26, 28, 31, 34].includes(lessonId);

    if (isSpellingGame) {
      const expectedChar = miniGame.word[targetCharIdx];
      if (balloon.value.toLowerCase() === expectedChar.toLowerCase()) {
        isCorrect = true;
      }
    } 
    else if (lessonId === 10) {
      // 10강: 5 + 7 = 12 수식 풍선이 진짜 정답입니다.
      if (balloon.value === "5+7") isCorrect = true;
    } else if (lessonId === 12) {
      // 12강: 문자열 인덱싱 0번 방 추출 word[0] 풍선이 진짜 정답입니다.
      if (balloon.value === "word[0]") isCorrect = true;
    } else if (lessonId === 17) {
      // 17강: 리스트 인덱싱 1번 방 fruits[1] 풍선이 진짜 정답입니다.
      if (balloon.value === "fruits[1]") isCorrect = true;
    }

    if (isCorrect) {
      audioSynth.playBeep(523 + targetCharIdx * 80, 0.05);
      
      const currentOffset = Math.sin(balloon.windPhase || 0) * 16;
      const actualX = balloon.x + (currentOffset / 8.5);

      triggerPopParticles(actualX, balloon.y, balloon.color);
      setBalloonList((prev) => prev.map((b) => (b.id === balloon.id ? { ...b, popped: true } : b)));

      if (isSpellingGame) {
        const nextIdx = targetCharIdx + 1;
        setTargetCharIdx(nextIdx);
        if (nextIdx >= miniGame.word.length) {
          handleGameSuccess(nextIdx);
        }
      } else {
        // 단발성 클릭 게임(10, 12, 17강)은 정답 풍선을 하나 맞히면 즉시 게임 승리로 이어집니다.
        handleGameSuccess();
      }
    } else {
      audioSynth.playError();
      setErrorBalloonId(balloon.id);
      setTimeout(() => setErrorBalloonId(null), 600);
    }
  };

  // 2. 디펜스 게임 대포 발사 컨트롤러
  const handleDefenseShoot = (type) => {
    if (projectiles.length > 0 || gameWon || gameOver || enemyHit) return;

    setTurretType(type);
    setBaseRecoil(true);
    setMuzzleFlash(true);
    
    setTimeout(() => setBaseRecoil(false), 400);
    setTimeout(() => setMuzzleFlash(false), 150);

    const enemy = miniGame.enemies[currentEnemyIdx];
    const isCorrect = enemy.type === type;
    const bulletEmoji = type === "string" ? "💬" : "🧮";

    setProjectiles([
      {
        id: Math.random(),
        emoji: bulletEmoji,
        targetX: `${enemyX}%`,
        duration: "0.4s"
      }
    ]);
    audioSynth.playLaser();

    setTimeout(() => {
      setProjectiles([]);
      
      if (isCorrect) {
        audioSynth.playCoin();
        setEnemyHit(true);
        setEnemyX((prev) => Math.min(100, prev + 18)); // 포탄 적중 시 적 넉백 효과 추가

        setBlasts([{ id: Math.random(), x: `${enemyX}%` }]);
        setDefenseFeedback("피융-💥 대포 발사 성공! 바이러스 넉백 후 폭발시켰습니다!");

        setTimeout(() => {
          setBlasts([]);
          setEnemyHit(false);
          const nextIdx = currentEnemyIdx + 1;
          if (nextIdx >= miniGame.enemies.length) {
            handleGameSuccess();
          } else {
            setCurrentEnemyIdx(nextIdx);
            setEnemyX(100);
          }
        }, 500);
      } else {
        audioSynth.playError();
        // 오답 대포 발사 시에는 하트를 깎는 대신, 방어 피드백으로 경고하여 바이러스가 전진해 기지에 닿게 유도
        setDefenseFeedback("앗! 대포 속성이 바이러스와 맞지 않아요. 다른 대포를 조준해봐요!");
      }
    }, 400);
  };

  // 3. 리듬 게임 박자 판정 (A/S 키 입력 및 클릭 연동)
  const handleRhythmClick = (input) => {
    if (gameWon || gameOver) return;

    const beat = miniGame.beats[currentBeatIdx];
    // 판정선 영역(10% ~ 25%)에 정확히 들어왔는지 검사합니다.
    const inZone = noteX >= 10 && noteX <= 25;

    // 판정선 바깥에서 성급하게 누른 경우 (틀린 타이밍)
    if (!inZone) {
      audioSynth.playError();
      setHitFeedback("박자가 너무 빠르거나 늦어요! ⏰ Miss!");
      setCombo(0);

      // 라이프 감소
      setLives((l) => {
        const nextLives = l - 1;
        if (nextLives <= 0) {
          setGameOver(true);
        }
        return nextLives;
      });

      setIsScreenShaking(true);
      setTimeout(() => setIsScreenShaking(false), 300);

      setTimeout(() => setHitFeedback(""), 800);
      return;
    }

    const isCorrect = beat.expect === input;

    if (isCorrect) {
      // 완벽한 입력 성공!
      audioSynth.playCoin();
      setHitFeedback("PERFECT! 🌟");
      
      setHitPulse(true);
      setIsScreenShaking(true);
      setTimeout(() => setHitPulse(false), 400);
      setTimeout(() => setIsScreenShaking(false), 300);

      const nextCombo = combo + 1;
      setCombo(nextCombo);
      setComboActive(true);
      setTimeout(() => setComboActive(false), 700);

      const nextScore = score + 1;
      setScore(nextScore);

      if (nextScore >= 3) {
        handleGameSuccess();
      } else {
        const nextIdx = (currentBeatIdx + 1) % miniGame.beats.length;
        setCurrentBeatIdx(nextIdx);
        setNoteX(100);
        setTimeout(() => setHitFeedback(""), 800);
      }
    } else {
      // 키보드 입력을 엉뚱하게 오판한 경우 (참을 거짓으로 판단 등)
      audioSynth.playError();
      setHitFeedback("앗! 참/거짓 판단이 틀렸어요. ❌ Miss!");
      setCombo(0);

      // 라이프 감소
      setLives((l) => {
        const nextLives = l - 1;
        if (nextLives <= 0) {
          setGameOver(true);
        }
        return nextLives;
      });

      setIsScreenShaking(true);
      setTimeout(() => setIsScreenShaking(false), 300);

      setTimeout(() => setHitFeedback(""), 800);

      // 틀렸어도 다음 노트 흐름이 정상 동작하도록 강제 리셋 후 다음으로 넘겨줌
      const nextIdx = (currentBeatIdx + 1) % miniGame.beats.length;
      setCurrentBeatIdx(nextIdx);
      setNoteX(100);
    }
  };

  // 4. API 연결 주파수 가동
  const handleApiConnect = (option) => {
    if (gameWon || gameOver || laserBeamActive) return;

    if (option.isCorrect) {
      audioSynth.playLaser();
      setLaserBeamActive(true);
      
      setTimeout(() => {
        audioSynth.playWin();
        setLaserBeamActive(false);
        setApiConnected(true);
        setGameWon(true);
      }, 1500);
    } else {
      audioSynth.playError();
      alert("앗! 주파수가 다릅니다. 올바른 주파수를 연결해주세요!");
    }
  };

  // 미니게임 배지 수집 완료 처리
  const handleClaimBadge = () => {
    onClose(true);
  };

  // 하트(체력) 렌더링 헬퍼 함수
  const renderLives = () => {
    return (
      <div style={{ display: "flex", gap: "6px", alignItems: "center", marginBottom: "12px", background: "rgba(0,0,0,0.2)", padding: "6px 14px", borderRadius: "20px" }}>
        <span style={{ fontSize: "0.9rem", color: "#a5b4fc", fontWeight: "bold", marginRight: "6px" }}>방어막 에너지:</span>
        {Array.from({ length: 3 }).map((_, i) => (
          <span
            key={i}
            style={{
              fontSize: "1.7rem",
              color: i < lives ? "#ff007f" : "rgba(255, 255, 255, 0.15)",
              textShadow: i < lives ? "0 0 10px #ff007f" : "none",
              transition: "all 0.3s ease",
              transform: i < lives ? "scale(1)" : "scale(0.85)"
            }}
          >
            {i < lives ? "💖" : "🖤"}
          </span>
        ))}
      </div>
    );
  };

  // ===================== [UI 렌더링 영역] =====================
  return (
    <div style={{ maxWidth: "850px", margin: "20px auto", padding: "20px", display: "flex", flexDirection: "column", gap: "20px", position: "relative" }}>
      {/* 승리 축하 폭죽 가루 효과 */}
      {confetti.map((c) => (
        <div
          key={c.id}
          className="confetti-piece"
          style={{
            left: c.left,
            background: c.color,
            animationDelay: c.delay,
            top: "-10px",
            "--fall-duration": c.duration
          }}
        />
      ))}

      {/* 헤더 패널 */}
      <header className="glass-panel" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 24px", borderColor: "rgba(255, 0, 127, 0.3)" }}>
        <div>
          <span style={{ fontSize: "0.9rem", color: "#ff007f", fontWeight: "bold" }}>
            LEVEL {lesson.id} • 복습 우주 미니게임
          </span>
          <h2 style={{ fontSize: "1.8rem", color: "white" }}>{miniGame.title}</h2>
        </div>
        <button onClick={() => onClose(false)} className="btn-cosmic btn-outline" style={{ padding: "8px", borderRadius: "50%" }}>
          <X size={20} />
        </button>
      </header>

      {/* 메인 게임 콘테이너 */}
      <section className={`glass-panel ${isScreenShaking ? "shake-animation" : ""}`} style={{
        padding: "32px",
        background: "rgba(10, 11, 27, 0.85)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "450px",
        boxShadow: "0 0 35px rgba(255, 0, 127, 0.15)",
        position: "relative",
        overflow: "hidden"
      }}>
        {/* 폭탄/풍선 터진 물리 파편 효과 */}
        {particles.map((p) => (
          <div
            key={p.id}
            className="pop-particle"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              background: p.color,
              width: `${p.size}px`,
              height: `${p.size}px`,
              boxShadow: `0 0 10px ${p.color}`,
              "--p-tx": p.tx,
              "--p-ty": p.ty
            }}
          />
        ))}

        {gameOver ? (
          /* ===================== [오락실 스타일 실패: GAME OVER 화면] ===================== */
          <div style={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "24px",
            zIndex: 10,
            animation: "fadeIn 0.5s ease"
          }}>
            <div 
              style={{
                fontSize: "6.5rem",
                width: "160px",
                height: "160px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #475569, #0f172a)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 30px rgba(0, 0, 0, 0.6)",
                border: "4px solid #64748b"
              }}
              className="shake-animation"
            >
              👾☠️
            </div>

            <div>
              <h3 style={{ fontSize: "2.8rem", color: "#f43f5e", lineHeight: "1.1" }}>
                에너지 방어 실패!
              </h3>
              <p style={{ color: "#cbd5e1", fontSize: "1.15rem", marginTop: "8px" }}>
                바이러스의 공격으로 에너지 방어막이 모두 해제되었습니다.
              </p>
            </div>

            <div style={{
              background: "rgba(244, 63, 94, 0.05)",
              padding: "16px 20px",
              borderRadius: "20px",
              border: "1px solid rgba(244, 63, 94, 0.2)",
              maxWidth: "400px",
              color: "#e2e8f0",
              fontSize: "1.05rem",
              lineHeight: "1.5"
            }}>
              🤖 "삐-빅! 지안 탐험가님, 조금만 더 박자에 맞춰 집중해서 입력하면 통과할 수 있어요! 포기하지 말고 다시 한 번 기계를 작동해볼까요?"
            </div>

            <button 
              onClick={() => {
                // 게임오버 상황에서 처음부터 재도전하기 위해 변수들을 초기 복구합니다.
                setLives(3);
                setGameOver(false);
                setScore(0);
                setCurrentEnemyIdx(0);
                setEnemyX(100);
                setCurrentBeatIdx(0);
                setNoteX(100);
                setHitFeedback("");
                setCombo(0);
                setStartTime(Date.now());
                setElapsedTime(0);
                setIsNewRecord(false);
                setIsTimerRunning(true);
                if (miniGame.type === "balloon-pop") {
                  initializeBalloons();
                }
              }}
              className="btn-cosmic btn-pink"
              style={{
                padding: "16px 40px",
                fontSize: "1.3rem",
                fontWeight: "900",
                width: "100%",
                maxWidth: "320px",
                borderRadius: "20px"
              }}
            >
              🔄 다시 도전하기
            </button>
          </div>
        ) : !gameWon ? (
          /* ===================== [게임 진행 필드 화면] ===================== */
          <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "24px", alignItems: "center" }}>
            <p style={{ color: "#a5b4fc", fontSize: "1.1rem", textAlign: "center", fontWeight: "bold" }}>
              {miniGame.description}
            </p>

            {/* 타이머 및 최고기록 계기판 */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              background: "rgba(5, 6, 20, 0.6)",
              padding: "10px 24px",
              borderRadius: "30px",
              border: "1.5px solid rgba(0, 240, 255, 0.25)",
              boxShadow: "0 0 15px rgba(0, 240, 255, 0.1)",
              transition: "all 0.3s ease",
              position: "relative"
            }}>
              <span style={{ color: "#a5b4fc", fontSize: "1rem", fontWeight: "bold" }}>⏱️ 지안이의 탐험 시간:</span>
              <span style={{
                color: penaltyActive ? "#ef4444" : "var(--color-neon-cyan)",
                fontSize: "1.6rem",
                fontWeight: "900",
                fontFamily: "monospace",
                minWidth: "90px",
                textAlign: "right",
                textShadow: penaltyActive ? "0 0 10px #ef4444" : "0 0 10px var(--color-neon-cyan)",
                transition: "color 0.1s ease"
              }}>
                {elapsedTime.toFixed(2)}초
              </span>
              
              {penaltyActive && (
                <span style={{
                  color: "#ef4444",
                  fontSize: "0.95rem",
                  fontWeight: "bold",
                  marginLeft: "8px",
                  animation: "shake-animation 0.3s ease",
                  textShadow: "0 0 8px rgba(239, 68, 68, 0.7)"
                }}>
                  +3초 ⚠️
                </span>
              )}

              {bestRecord && (
                <span style={{
                  color: "#ffd700",
                  fontSize: "0.85rem",
                  borderLeft: "1px solid rgba(255,255,255,0.15)",
                  paddingLeft: "14px",
                  marginLeft: "4px"
                }}>
                  🏆 최고기록: {bestRecord.toFixed(2)}초
                </span>
              )}
            </div>

            {/* ===================== GAME 1: BALLOON POP ===================== */}
            {miniGame.type === "balloon-pop" && (() => {
              const isSpellingGame = [8, 9, 18, 26, 28, 31, 34].includes(lessonId);
              return (
                <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
                  {isSpellingGame && (
                    <div style={{ display: "flex", gap: "8px", background: "rgba(0,0,0,0.3)", padding: "12px 30px", borderRadius: "16px" }}>
                      {miniGame.word.split("").map((c, i) => (
                        <span key={i} style={{
                          fontSize: "1.6rem",
                          fontFamily: "monospace",
                          color: i < targetCharIdx ? "var(--color-neon-cyan)" : "rgba(255,255,255,0.15)",
                          fontWeight: "900",
                          textTransform: "uppercase",
                          borderBottom: `2.5px solid ${i < targetCharIdx ? "var(--color-neon-cyan)" : "rgba(255,255,255,0.2)"}`,
                          padding: "2px 6px"
                        }}>
                          {c}
                        </span>
                      ))}
                    </div>
                  )}

                  {!isSpellingGame && (
                    <div style={{ fontSize: "1.25rem", color: "#ffd700", fontWeight: "bold" }}>
                      목표 결과: <span style={{ fontSize: "1.6rem", borderBottom: "2px solid #ffd700" }}>{miniGame.word}</span>
                    </div>
                  )}

                  <div style={{
                    width: "100%",
                    height: "280px",
                    background: "#050614",
                    border: "2px dashed rgba(0, 240, 255, 0.2)",
                    borderRadius: "24px",
                    position: "relative",
                    overflow: "hidden"
                  }}>
                    {balloonList.map((b) => {
                      if (b.popped) return null;
                      const isError = b.id === errorBalloonId;
                      const currentOffset = Math.sin(b.windPhase || 0) * 16;
                      return (
                        <button
                          key={b.id}
                          onClick={() => handleBalloonClick(b)}
                          className={isError ? "balloon-error" : "balloon-wobble"}
                          style={{
                            position: "absolute",
                            left: `calc(${b.x}% + ${currentOffset}px)`,
                            top: `${b.y}%`,
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            outline: "none",
                            transform: "translate(-50%, -50%)",
                            zIndex: 10,
                            transition: isError ? "none" : "top 0.05s linear, left 0.05s linear"
                          }}
                        >
                          <svg width="70" height="95" viewBox="0 0 70 95" style={{ overflow: "visible" }}>
                            <defs>
                              <filter id={`glow-${b.id}`} x="-20%" y="-20%" width="140%" height="140%">
                                <feGaussianBlur stdDeviation="5" result="blur" />
                                <feComposite in="SourceGraphic" in2="blur" operator="over" />
                              </filter>
                            </defs>
                            <path d="M35,68 Q37,82 33,95" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" fill="none" />
                            <ellipse cx="35" cy="38" rx="27" ry="30" fill={b.color} style={{ filter: `url(#glow-${b.id})` }} />
                            <ellipse cx="25" cy="26" rx="8" ry="10" fill="rgba(255,255,255,0.45)" transform="rotate(-15 25 26)" />
                            <polygon points="31,68 39,68 35,63" fill={b.color} />
                            <text x="35" y="44" fill="white" fontSize="15" fontWeight="bold" textAnchor="middle" style={{ fontFamily: "monospace", textShadow: "1px 1px 3px rgba(0,0,0,0.8)" }}>
                              {b.value}
                            </text>
                          </svg>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })()}

            {/* ===================== GAME 2: CODE DEFENSE ===================== */}
            {miniGame.type === "code-defense" && (
              <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "16px", alignItems: "center" }}>
                
                {/* [오락실화 UI] 상단에 체력 하트 게이지 렌더링 */}
                {renderLives()}

                <div style={{
                  width: "100%",
                  height: "220px",
                  background: "#050614",
                  border: "2px solid rgba(255, 0, 127, 0.2)",
                  borderRadius: "24px",
                  position: "relative",
                  overflow: "hidden"
                }}>
                  <div className="defense-runway" />

                  {/* 방어 기지 */}
                  <div className={`defense-base-recoil`} style={{
                    position: "absolute",
                    left: "20px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "6px",
                    zIndex: 2,
                    animation: baseRecoil ? "base-recoil-anim 0.4s cubic-bezier(0.15, 0.85, 0.3, 1)" : "none"
                  }}>
                    <div style={{ fontSize: "3.5rem" }} className="animate-float">🛸🤖</div>
                    <span style={{ fontSize: "0.8rem", color: "#00f0ff", background: "rgba(0,240,255,0.1)", padding: "2px 8px", borderRadius: "10px" }}>방어 기지</span>
                  </div>

                  {/* 총구 화염 이펙트 */}
                  {muzzleFlash && (
                    <div style={{
                      position: "absolute",
                      left: "85px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: "55px",
                      height: "55px",
                      borderRadius: "50%",
                      background: "radial-gradient(circle, #ffffff 30%, var(--color-neon-cyan) 70%, transparent)",
                      boxShadow: "0 0 25px var(--color-neon-cyan), 0 0 45px #00f0ff",
                      zIndex: 10,
                      pointerEvents: "none"
                    }} />
                  )}

                  {/* 발사된 포탄 */}
                  {projectiles.map((p) => (
                    <div
                      key={p.id}
                      className="defense-projectile"
                      style={{
                        "--target-x": p.targetX,
                        "--fly-duration": p.duration
                      }}
                    >
                      {p.emoji}
                    </div>
                  ))}

                  {/* 폭발 먼지 */}
                  {blasts.map((b) => (
                    <div
                      key={b.id}
                      className="defense-blast"
                      style={{ "--blast-x": b.x }}
                    />
                  ))}

                  {/* 적 바이러스 */}
                  <div style={{
                    position: "absolute",
                    left: `${enemyX}%`,
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    transition: enemyHit 
                      ? "left 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275), filter 0.15s ease" 
                      : "left 0.04s linear",
                    filter: enemyHit ? "brightness(2.5) contrast(1.5) drop-shadow(0 0 15px #ff007f)" : "none",
                    opacity: enemyHit ? 0.85 : 1,
                    zIndex: 3
                  }}>
                    <div style={{ fontSize: "3.2rem" }} className={enemyHit ? "none" : "shake-animation"}>
                      {enemyHit ? "💥" : "👾"}
                    </div>
                    <span style={{
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid white",
                      color: "white",
                      padding: "4px 10px",
                      borderRadius: "10px",
                      fontSize: "1rem",
                      fontWeight: "bold",
                      fontFamily: "monospace",
                      marginTop: "4px"
                    }}>
                      {miniGame.enemies[currentEnemyIdx].label}
                    </span>
                  </div>
                </div>

                <div style={{
                  background: "rgba(0,0,0,0.3)",
                  padding: "10px 20px",
                  borderRadius: "14px",
                  color: "#cbd5e1",
                  fontSize: "0.95rem"
                }}>
                  {defenseFeedback}
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", width: "100%", maxWidth: "440px" }}>
                  <button
                    disabled={projectiles.length > 0 || enemyHit}
                    onClick={() => handleDefenseShoot("string")}
                    className="btn-cosmic btn-cyan"
                    style={{ padding: "16px", fontSize: "1.25rem", borderRadius: "18px" }}
                  >
                    💬 글자 대포 [ " " ] 발사
                  </button>
                  <button
                    disabled={projectiles.length > 0 || enemyHit}
                    onClick={() => handleDefenseShoot("number")}
                    className="btn-cosmic btn-pink"
                    style={{ padding: "16px", fontSize: "1.25rem", borderRadius: "18px" }}
                  >
                    🧮 숫자 대포 [ 123 ] 발사
                  </button>
                </div>
              </div>
            )}

            {/* ===================== GAME 3: RHYTHM BEAT ===================== */}
            {miniGame.type === "rhythm-beat" && (
              <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "16px", alignItems: "center" }}>
                
                {/* [오락실화 UI] 상단에 체력 하트 게이지 렌더링 */}
                {renderLives()}

                <div style={{
                  background: "rgba(189, 0, 255, 0.1)",
                  border: "2px solid #bd00ff",
                  borderRadius: "20px",
                  padding: "12px 30px",
                  textAlign: "center",
                  boxShadow: "0 0 15px rgba(189,0,255,0.3)"
                }}>
                  <div style={{ fontSize: "0.8rem", color: "#a5b4fc" }}>목표 조건 판별식</div>
                  <strong style={{ fontSize: "1.8rem", color: "white", fontFamily: "monospace" }}>
                    {miniGame.beats[currentBeatIdx].expr}
                  </strong>
                </div>

                {/* [오락실화 UI] 위쪽 True 트랙과 아래쪽 False 트랙을 구성한 멀티 라인 리듬판 */}
                <div style={{
                  width: "100%",
                  height: "170px",
                  background: "#050614",
                  border: "2px solid #bd00ff",
                  borderRadius: "24px",
                  position: "relative",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-around"
                }}>
                  {/* True 트랙 가로 레일 선 */}
                  <div style={{
                    position: "absolute",
                    top: "30%",
                    left: 0,
                    right: 0,
                    height: "3px",
                    background: "linear-gradient(90deg, rgba(0, 240, 255, 0.4), rgba(0, 240, 255, 0.05))",
                  }} />
                  <span style={{ position: "absolute", left: "15px", top: "12%", fontSize: "0.75rem", color: "var(--color-neon-cyan)", fontWeight: "bold" }}>O • True 라인 (A키 / ◀)</span>

                  {/* False 트랙 가로 레일 선 */}
                  <div style={{
                    position: "absolute",
                    top: "70%",
                    left: 0,
                    right: 0,
                    height: "3px",
                    background: "linear-gradient(90deg, rgba(255, 0, 127, 0.4), rgba(255, 0, 127, 0.05))",
                  }} />
                  <span style={{ position: "absolute", left: "15px", top: "52%", fontSize: "0.75rem", color: "var(--color-neon-pink)", fontWeight: "bold" }}>X • False 라인 (S키 / ▶)</span>

                  {/* 판정선 존 (공통 가로지르는 세로 기준선) */}
                  <div style={{
                    position: "absolute",
                    left: "16.6%",
                    top: 0,
                    bottom: 0,
                    width: "1px",
                    borderLeft: "2px dashed rgba(255, 255, 255, 0.25)",
                    zIndex: 1
                  }} />

                  {/* 위쪽 True 판정 링 과 조준 영역 */}
                  <div style={{
                    position: "absolute",
                    left: "16.6%",
                    top: "30%",
                    transform: "translate(-50%, -50%)",
                    width: "55px",
                    height: "55px",
                    borderRadius: "50%",
                    border: "3.5px dashed var(--color-neon-cyan)",
                    boxShadow: "0 0 15px rgba(0,240,255,0.6)",
                    background: "rgba(0,240,255,0.1)",
                    zIndex: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.7rem",
                    color: "var(--color-neon-cyan)",
                    fontWeight: "900"
                  }}>
                    HIT!
                  </div>

                  {/* 아래쪽 False 판정 링 과 조준 영역 */}
                  <div style={{
                    position: "absolute",
                    left: "16.6%",
                    top: "70%",
                    transform: "translate(-50%, -50%)",
                    width: "55px",
                    height: "55px",
                    borderRadius: "50%",
                    border: "3.5px dashed var(--color-neon-pink)",
                    boxShadow: "0 0 15px rgba(255,0,127,0.6)",
                    background: "rgba(255,0,127,0.1)",
                    zIndex: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.7rem",
                    color: "var(--color-neon-pink)",
                    fontWeight: "900"
                  }}>
                    HIT!
                  </div>

                  {/* 박자 타격 판정 폭발 원형 링 애니메이션 */}
                  {hitPulse && (
                    <div style={{
                      position: "absolute",
                      left: "16.6%",
                      top: miniGame.beats[currentBeatIdx].expect === "O" ? "30%" : "70%",
                      transform: "translate(-50%, -50%)",
                      width: "80px",
                      height: "80px",
                      borderRadius: "50%",
                      border: "4px solid white",
                      animation: "pulse-explode 0.4s ease-out forwards",
                      zIndex: 5,
                      pointerEvents: "none"
                    }} />
                  )}

                  {/* 콤보 팝업 (Pulse 애니메이션 적용) */}
                  {combo > 0 && comboActive && (
                    <div className="combo-text" style={{
                      position: "absolute",
                      left: "50%",
                      top: "50%",
                      transform: "translate(-50%, -50%)",
                      fontSize: "2.1rem",
                      fontWeight: "900",
                      color: "#ffd700",
                      textShadow: "0 0 14px rgba(255,215,0,0.85)",
                      zIndex: 4,
                      animation: "pulse-scale 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
                    }}>
                      {combo} COMBO!
                    </div>
                  )}

                  {/* 비트 노트 - expect 정답 속성에 맞춰 알맞은 레인에 배치 */}
                  <div style={{
                    position: "absolute",
                    left: `${noteX}%`,
                    top: miniGame.beats[currentBeatIdx].expect === "O" ? "30%" : "70%",
                    transform: "translate(-50%, -50%)",
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    background: miniGame.beats[currentBeatIdx].expect === "O" 
                      ? "radial-gradient(circle, #00f0ff, #050614)" 
                      : "radial-gradient(circle, #ff007f, #050614)",
                    border: "2.5px solid white",
                    boxShadow: miniGame.beats[currentBeatIdx].expect === "O" 
                      ? "0 0 15px #00f0ff" 
                      : "0 0 15px #ff007f",
                    color: "white",
                    fontSize: "1.35rem",
                    fontWeight: "bold",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "left 0.04s linear",
                    zIndex: 3
                  }}>
                    {miniGame.beats[currentBeatIdx].expect}
                  </div>
                </div>

                <div style={{
                  fontSize: "1.25rem",
                  fontWeight: "bold",
                  color: hitFeedback.includes("PERFECT") ? "#10b981" : "#ef4444",
                  minHeight: "28px"
                }}>
                  {hitFeedback}
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", width: "100%", maxWidth: "400px" }}>
                  <button
                    onClick={() => handleRhythmClick("O")}
                    className="btn-cosmic btn-cyan"
                    style={{ padding: "16px", fontSize: "2rem", borderRadius: "18px", fontWeight: "900" }}
                  >
                    O (참 - True)
                  </button>
                  <button
                    onClick={() => handleRhythmClick("X")}
                    className="btn-cosmic btn-pink"
                    style={{ padding: "16px", fontSize: "2rem", borderRadius: "18px", fontWeight: "900" }}
                  >
                    X (거짓 - False)
                  </button>
                </div>
              </div>
            )}

            {/* ===================== GAME 4: API CONNECT ===================== */}
            {miniGame.type === "api-connect" && (
              <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "24px", alignItems: "center" }}>
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  maxWidth: "460px",
                  padding: "30px",
                  background: "rgba(5, 6, 20, 0.4)",
                  border: "1.5px solid rgba(255, 255, 255, 0.05)",
                  borderRadius: "24px",
                  position: "relative",
                  overflow: "hidden"
                }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", zIndex: 3 }}>
                    <div style={{
                      fontSize: "4.5rem",
                      transform: laserBeamActive ? "rotate(12deg) scale(1.1)" : "none",
                      transition: "transform 0.3s ease"
                    }}>
                      📡
                    </div>
                    <span style={{ fontSize: "0.85rem", color: "#a5b4fc", marginTop: "4px" }}>송신 안테나</span>
                  </div>

                  {laserBeamActive && (
                    <>
                      <div className="api-laser-line" />
                      {Array.from({ length: 18 }).map((_, i) => {
                        const randX = 15 + Math.random() * 65;
                        const randY = 35 + Math.random() * 30;
                        const dx = `${Math.random() * 50 - 25}px`;
                        const dy = `${Math.random() * 50 - 25}px`;
                        return (
                          <div
                            key={i}
                            className="neon-spark-particle"
                            style={{
                              position: "absolute",
                              left: `${randX}%`,
                              top: `${randY}%`,
                              width: `${3 + Math.random() * 4}px`,
                              height: `${3 + Math.random() * 4}px`,
                              background: Math.random() > 0.5 ? "var(--color-neon-cyan)" : "var(--color-neon-pink)",
                              borderRadius: "50%",
                              boxShadow: "0 0 8px currentColor",
                              animation: "spark-jump 0.5s ease-out infinite",
                              animationDelay: `${Math.random() * 0.4}s`,
                              "--dx": dx,
                              "--dy": dy
                            }}
                          />
                        );
                      })}
                    </>
                  )}

                  <div className="hologram-screen" style={{
                    width: "120px",
                    height: "120px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 3
                  }}>
                    <div style={{ fontSize: "3.8rem" }}>
                      {apiConnected 
                        ? (miniGame.targetRequest.includes("고양이") ? "🐱🐾" : "🌤️🌈") 
                        : "❓"}
                    </div>
                    <span style={{ fontSize: "0.8rem", color: "var(--color-neon-cyan)", fontWeight: "bold" }}>
                      {apiConnected ? "연결 완료!" : miniGame.targetRequest}
                    </span>
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "100%", maxWidth: "500px" }}>
                  {miniGame.options.map((opt, idx) => (
                    <button
                      key={idx}
                      disabled={laserBeamActive}
                      onClick={() => handleApiConnect(opt)}
                      className="btn-cosmic btn-outline"
                      style={{
                        padding: "16px 20px",
                        fontSize: "1.15rem",
                        fontFamily: "monospace",
                        borderRadius: "18px",
                        borderColor: laserBeamActive ? "rgba(255, 255, 255, 0.05)" : "var(--color-panel-border)"
                      }}
                    >
                      {opt.code}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* ===================== [미니게임 성공 축하 화면] ===================== */
          <div style={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "24px",
            zIndex: 10
          }}>
            <div 
              style={{
                fontSize: "7rem",
                width: "160px",
                height: "160px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #ffd700, #ff007f)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 40px rgba(255, 215, 0, 0.5)",
                border: "4px solid white"
              }}
              className="animate-float"
            >
              🏅
            </div>

            <div>
              <h3 style={{ fontSize: "2.8rem", color: "#ffd700", lineHeight: "1.1" }}>
                미니게임 클리어!
              </h3>
              <p style={{ color: "#a5b4fc", fontSize: "1.15rem", marginTop: "8px" }}>
                <strong>{lesson.planet} 배지</strong>를 획득하셨습니다!
              </p>
            </div>

            {/* 타이머 최종 결과 기록판 */}
            {miniGame.type === "balloon-pop" && (
              <div className="glass-panel" style={{
                padding: "18px 36px",
                borderColor: isNewRecord ? "var(--color-neon-cyan)" : "rgba(255, 255, 255, 0.1)",
                background: "rgba(5, 6, 20, 0.75)",
                borderRadius: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                alignItems: "center",
                boxShadow: isNewRecord ? "0 0 25px rgba(0, 240, 255, 0.3)" : "none",
                transform: isNewRecord ? "scale(1.05)" : "none",
                transition: "all 0.3s ease"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ fontSize: "1.1rem", color: "#cbd5e1" }}>⏱️ 지안이의 탈출 시간:</span>
                  <strong style={{ fontSize: "1.9rem", color: "var(--color-neon-cyan)", fontFamily: "monospace" }}>
                    {elapsedTime.toFixed(2)}초
                  </strong>
                </div>
                
                {isNewRecord ? (
                  <div style={{
                    background: "linear-gradient(90deg, #ff007f, #00f0ff)",
                    color: "white",
                    padding: "4px 16px",
                    borderRadius: "12px",
                    fontSize: "0.95rem",
                    fontWeight: "bold",
                    marginTop: "6px",
                    boxShadow: "0 0 10px rgba(0, 240, 255, 0.5)",
                    animation: "pulse-cyan 1.5s infinite"
                  }}>
                    🎉 최고 기록 경신! 대단해요 지안이! 🎉
                  </div>
                ) : (
                  bestRecord && (
                    <div style={{ fontSize: "0.9rem", color: "#94a3b8" }}>
                      🏆 개인 최고 기록: {bestRecord.toFixed(2)}초
                    </div>
                  )
                )}
              </div>
            )}

            <div style={{
              background: "rgba(0, 240, 255, 0.05)",
              padding: "16px 20px",
              borderRadius: "20px",
              border: "1px solid rgba(0, 240, 255, 0.2)",
              maxWidth: "400px",
              color: "#e2e8f0",
              fontSize: "1.05rem",
              lineHeight: "1.5"
            }}>
              🤖 "삐-빅! 지안 탐험가님이 기계를 완벽하게 지켜내고 조종했어요!<br />
              배지 장식장에 이쁜 훈장이 생겼으니, 어서 지도로 가볼까요?"
            </div>

            <button 
              onClick={handleClaimBadge}
              className="btn-cosmic btn-star animate-pulse-cyan"
              style={{
                padding: "16px 40px",
                fontSize: "1.3rem",
                fontWeight: "900",
                width: "100%",
                maxWidth: "320px"
              }}
            >
              🎖️ 배지 획득하고 지도로 가기
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

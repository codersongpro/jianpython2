let pyodideInstance = null;
let pyodideLoadingPromise = null;

// Dynamically load the Pyodide script
function loadPyodideScript() {
  return new Promise((resolve, reject) => {
    if (window.loadPyodide) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/pyodide/v0.26.1/full/pyodide.js";
    script.onload = () => resolve();
    script.onerror = (err) => reject(new Error("Pyodide CDN 로딩 실패: 인터넷 연결을 확인해주세요."));
    document.head.appendChild(script);
  });
}

// Initialize Pyodide once
export async function initPyodide() {
  if (pyodideInstance) return pyodideInstance;

  if (pyodideLoadingPromise) return pyodideLoadingPromise;

  pyodideLoadingPromise = (async () => {
    await loadPyodideScript();
    pyodideInstance = await window.loadPyodide({
      indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.1/full/",
    });
    return pyodideInstance;
  })();

  return pyodideLoadingPromise;
}

// Translate complex Python exceptions into kid-friendly tips
export function translateError(errorMsg) {
  const errStr = String(errorMsg);

  if (errStr.includes("NameError")) {
    const match = errStr.match(/name '(\w+)' is not defined/);
    const varName = match ? match[1] : "";
    if (varName === "printt" || varName === "prnt" || varName === "PRINT") {
      return `앗! 'print' 명령어의 철자를 잘못 쓰신 것 같아요. 소문자 'print()' 로 써져있는지 봐요!`;
    }
    return `로봇 Pydi가 보기에 '${varName}' 상자(변수)를 아직 안 만든 것 같아요! 먼저 '${varName} = 10'처럼 값을 담은 상자를 만들어볼까요?`;
  }

  if (errStr.includes("SyntaxError")) {
    if (errStr.includes("EOL while scanning string literal") || errStr.includes("unterminated string literal")) {
      return `글자 양쪽에 큰따옴표(\"\")가 짝을 이루고 있지 않아요! 글자는 꼬옥 따옴표 쌍을 맞춰 감싸주세요.`;
    }
    if (errStr.includes("expected ':'")) {
      return `앗! 조건문(if)이나 반복문(for) 끝에 마법 콜론 기호 ':'가 빠진 것 같아요. 줄 끝에 콜론을 넣어보세요!`;
    }
    return `마법 주문(코드)에 글자나 쉼표가 잘못 들어간 곳이 보여요. 괄호 ()와 따옴표 \"\" 쌍이 딱 맞는지 꼼꼼히 확인해봐요!`;
  }

  if (errStr.includes("IndentationError")) {
    return `들여쓰기(줄 맞춤) 방에 먼지가 끼었나 봐요! if 문이나 for 문 바로 아랫줄은 키보드의 'Tab' 키를 한 번 누르거나, 스페이스바를 4번 눌러서 안쪽으로 밀어 써주세요.`;
  }

  if (errStr.includes("TypeError")) {
    if (errStr.includes("can only concatenate str (not \"int\") to str")) {
      return `글자와 숫자는 그냥 더할 수 없어요! 예를 들어 'print("나이:" + str(10))' 처럼 감싸거나, 숫자 상자를 글자 상자로 바꿔 더해봐요!`;
    }
    return `글자와 숫자를 더할 때 어긋난 부분이 있어요. 숫자는 숫자끼리, 글자는 글자끼리 연산해 주세요.`;
  }

  if (errStr.includes("AttributeError")) {
    if (errStr.includes("get_weather") || errStr.includes("show_cat")) {
      return `마법 API 이름(magic.get_weather() 또는 magic.show_cat())의 대소문자 철자가 맞는지 봐주세요!`;
    }
    return `마법 상자(모듈)에서 없는 기능을 쓰려고 했어요. 철자를 점검해봐요!`;
  }

  return `주문에 아주 작은 오타가 있는 것 같아요. 에러 메세지를 확인하고 오타를 수정해보세요! 🚀`;
}

// Run python code and intercept results
export async function runPythonCode(code, onStdout) {
  const pyodide = await initPyodide();

  // Reset stdout redirection
  let stdoutContent = "";
  pyodide.setStdout({
    batched: (text) => {
      stdoutContent += text + "\n";
      if (onStdout) onStdout(text);
    },
  });

  // Inject the custom magic library
  pyodide.registerJsModule("magic", {
    get_weather: () => {
      const weathers = ["맑음 ☀️", "비 🌧️", "눈 ❄️", "구름 많음 ☁️"];
      const chosen = weathers[Math.floor(Math.random() * weathers.length)];
      return chosen;
    },
    show_cat: () => {
      // Direct print ASCII cat drawing to console stdout
      const catAscii = `
  /\\_/\   
 ( o.o )  
  > ^ <   🐾 야옹! 지안 탐험가님, 우주 아기 고양이를 무사히 구조했습니다!
      `;
      if (onStdout) {
        onStdout(catAscii);
      }
      return "고양이 구조 신호 송신!";
    },
  });

  try {
    await pyodide.runPythonAsync(code);
    return { success: true, stdout: stdoutContent, error: null };
  } catch (err) {
    const kidFriendlyError = translateError(err.message);
    return { success: false, stdout: stdoutContent, error: kidFriendlyError, rawError: err.message };
  }
}

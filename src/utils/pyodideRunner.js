// 브라우저 안에서 파이썬(Pyodide)을 실행하는 엔진입니다.
// - 실행할 때마다 새 변수 공간을 써서 이전 실행의 변수가 남지 않게 합니다.
// - 너무 오래 도는 코드(무한 루프)는 정해진 단계 수에서 멈춥니다.
// - input()은 브라우저 입력 창으로 받습니다.

export const PYODIDE_VERSION = "0.26.1";
const PYODIDE_BASE_URL = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`;

// 한 번 실행에서 허용하는 최대 코드 줄 실행 횟수와 출력 줄 수
const MAX_STEPS = 200000;
const MAX_OUTPUT_LINES = 500;

let pyodideInstance = null;
let pyodideLoadingPromise = null;
// magic 모듈은 한 번 import되면 캐시되므로, 출력 대상은 실행할 때마다 이 변수로 바꿔 끼웁니다.
let currentWrite = () => {};

function loadPyodideScript() {
  return new Promise((resolve, reject) => {
    if (window.loadPyodide) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = `${PYODIDE_BASE_URL}pyodide.js`;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Pyodide CDN 로딩 실패: 인터넷 연결을 확인해주세요."));
    document.head.appendChild(script);
  });
}

// 자유 코딩 방에서 쓰는 재미용 magic 모듈
function createMagicModule() {
  return {
    get_weather: () => {
      const weathers = ["맑음 ☀️", "비 🌧️", "눈 ❄️", "구름 많음 ☁️"];
      return weathers[Math.floor(Math.random() * weathers.length)];
    },
    show_cat: () => {
      currentWrite("  /\\_/\\\n ( o.o )\n  > ^ <   🐾 야옹! 우주 아기 고양이를 구조했어요!\n");
      return "고양이 구조 완료!";
    },
  };
}

const GUARD_SETUP = `
import sys

class _JianStepLimit(Exception):
    pass

_jian_state = {"steps": 0, "limit": 0}

def _jian_trace(frame, event, arg):
    if event == "line":
        _jian_state["steps"] += 1
        if _jian_state["steps"] > _jian_state["limit"]:
            raise _JianStepLimit()
    return _jian_trace

def _jian_start(limit):
    _jian_state["steps"] = 0
    _jian_state["limit"] = limit
    sys.settrace(_jian_trace)

def _jian_stop():
    sys.settrace(None)
`;

// 이미 로드된 pyodide 인스턴스에 안전장치를 설치합니다. (Node 검증 스크립트에서도 사용)
export function preparePyodide(pyodide) {
  pyodide.runPython(GUARD_SETUP);
  pyodide.registerJsModule("magic", createMagicModule());
  return pyodide;
}

export async function initPyodide() {
  if (pyodideInstance) return pyodideInstance;
  if (pyodideLoadingPromise) return pyodideLoadingPromise;

  pyodideLoadingPromise = (async () => {
    await loadPyodideScript();
    const pyodide = await window.loadPyodide({ indexURL: PYODIDE_BASE_URL });
    pyodideInstance = preparePyodide(pyodide);
    return pyodideInstance;
  })().catch((err) => {
    // 실패하면 다음 시도에서 다시 로드할 수 있게 비워 둡니다.
    pyodideLoadingPromise = null;
    throw err;
  });

  return pyodideLoadingPromise;
}

// 사용자 코드에서 에러가 난 줄 번호를 찾습니다. (<exec>는 사용자 코드 파일 이름)
function findErrorLine(errStr) {
  const matches = [...errStr.matchAll(/File "<exec>", line (\d+)/g)];
  if (matches.length === 0) return null;
  return parseInt(matches[matches.length - 1][1], 10);
}

// 어려운 파이썬 에러 메시지를 어린이용 설명으로 바꿉니다.
export function translateError(errorMsg) {
  const errStr = String(errorMsg);
  const line = findErrorLine(errStr);
  const where = line ? `[${line}번째 줄] ` : "";

  if (errStr.includes("_JianStepLimit")) {
    return `코드가 너무 오래 돌아서 파이디가 멈췄어요! 🌀 반복문이 끝나지 않는 '무한 루프'일 수 있어요. while 조건이 언젠가 False가 되는지, break가 있는지 확인해 보세요.`;
  }

  if (errStr.includes("EOFError")) {
    return `입력 창에서 아무것도 적지 않았거나 '취소'를 눌렀어요. 다시 실행해서 입력 창에 글자를 적고 '확인'을 눌러 주세요!`;
  }

  if (errStr.includes("NameError")) {
    const match = errStr.match(/name '(\w+)' is not defined/);
    const varName = match ? match[1] : "";
    if (/^(printt|prnt|pirnt|Print|PRINT)$/.test(varName)) {
      return `${where}'print' 철자가 틀렸어요. 모두 소문자로 print() 라고 적어 주세요!`;
    }
    if (/^(true|false|TRUE|FALSE)$/.test(varName)) {
      return `${where}True와 False는 첫 글자를 대문자로 적어야 해요!`;
    }
    return `${where}'${varName}'라는 상자(변수)나 함수를 아직 만들지 않았어요. 철자가 맞는지, 만들기 전에 먼저 쓰지는 않았는지 확인해 보세요. 글자라면 따옴표("")로 감싸야 해요!`;
  }

  if (errStr.includes("IndentationError")) {
    if (errStr.includes("expected an indented block")) {
      return `${where}콜론(:) 다음 줄은 안쪽으로 들여 써야 해요. 'Tab' 키나 스페이스 4번으로 밀어서 그 방에 들어갈 명령을 적어 주세요!`;
    }
    return `${where}들여쓰기(줄 맞춤)가 어긋났어요. 같은 방에 있는 줄은 시작 위치를 똑같이 맞춰 주세요.`;
  }

  if (errStr.includes("SyntaxError")) {
    if (errStr.includes("unterminated string literal") || errStr.includes("EOL while scanning")) {
      return `${where}따옴표가 짝을 이루지 않았어요! 글자는 "안녕" 처럼 양쪽을 따옴표로 감싸 주세요.`;
    }
    if (errStr.includes("expected ':'")) {
      return `${where}if, else, for, while, def 줄 끝에는 콜론(:)이 꼭 있어야 해요!`;
    }
    if (errStr.includes("was never closed") || errStr.includes("unmatched")) {
      return `${where}괄호 ( ) [ ] { } 의 짝이 맞지 않아요. 여는 괄호와 닫는 괄호 개수를 세어 보세요.`;
    }
    if (errStr.includes("invalid syntax. Maybe you meant '==' or ':='")) {
      return `${where}비교할 때는 = 를 두 번 써서 == 로 적어야 해요. = 하나는 '상자에 담기'예요!`;
    }
    return `${where}파이썬이 읽을 수 없는 부분이 있어요. 괄호 ( ), 따옴표 "", 콜론 : 이 빠지거나 남지 않았는지 확인해 봐요!`;
  }

  if (errStr.includes("TypeError")) {
    if (errStr.includes("can only concatenate str")) {
      return `${where}글자와 숫자는 + 로 바로 붙일 수 없어요. 숫자를 str(10) 처럼 글자로 바꾸거나, print("나이:", 10) 처럼 쉼표로 나눠 보세요.`;
    }
    if (errStr.includes("unsupported operand")) {
      return `${where}서로 계산할 수 없는 값끼리 계산하려고 했어요. 숫자는 숫자끼리, 글자는 글자끼리 써 주세요.`;
    }
    if (errStr.includes("positional argument")) {
      return `${where}함수에 넣은 재료(값)의 개수가 함수가 기다리는 개수와 달라요. def 줄의 괄호 안 개수와 맞춰 보세요.`;
    }
    return `${where}값의 종류가 맞지 않아요. 숫자와 글자를 섞어 쓰지는 않았는지 확인해 보세요.`;
  }

  if (errStr.includes("IndexError")) {
    return `${where}없는 방 번호를 열려고 했어요! 번호는 0부터 시작해서 '개수 - 1'까지만 있어요.`;
  }

  if (errStr.includes("KeyError")) {
    const match = errStr.match(/KeyError: (.+)/);
    return `${where}사전에 ${match ? match[1].trim() : "그"} 라는 키(단어)가 없어요. 키 이름과 따옴표를 확인해 보세요.`;
  }

  if (errStr.includes("ZeroDivisionError")) {
    return `${where}0으로는 나눌 수 없어요! 나누는 수를 바꿔 보세요.`;
  }

  if (errStr.includes("ValueError")) {
    return `${where}값을 바꿀 수 없어요. 예를 들어 int("안녕") 처럼 숫자가 아닌 글자를 숫자로 바꾸려 했는지 확인해 보세요.`;
  }

  if (errStr.includes("AttributeError")) {
    return `${where}그런 기능(점 뒤의 이름)이 없어요. append 같은 이름의 철자를 확인해 보세요.`;
  }

  return `${where}코드에 작은 실수가 있는 것 같아요. 철자와 기호를 천천히 다시 살펴봐요! 🚀`;
}

// 이미 준비된 pyodide 인스턴스로 코드를 실행합니다.
// options.readInput(promptText) : input()이 호출될 때 입력값을 돌려주는 함수 (null이면 입력 취소)
export async function executePython(pyodide, code, { readInput } = {}) {
  const decoder = new TextDecoder();
  let output = "";
  let truncated = false;

  const write = (text) => {
    if (truncated) return;
    output += text;
    const lineCount = output.split("\n").length;
    if (lineCount > MAX_OUTPUT_LINES) {
      output = output.split("\n").slice(0, MAX_OUTPUT_LINES).join("\n");
      output += `\n… (출력이 너무 많아서 ${MAX_OUTPUT_LINES}줄까지만 보여줘요)\n`;
      truncated = true;
    }
  };

  const stream = { write: (buf) => { write(decoder.decode(buf, { stream: true })); return buf.length; } };
  pyodide.setStdout(stream);
  pyodide.setStderr(stream);
  pyodide.setStdin({
    stdin: () => {
      // input("질문") 의 질문은 줄바꿈 없이 출력되므로 마지막 줄을 입력 창 안내문으로 씁니다.
      const promptText = output.slice(output.lastIndexOf("\n") + 1);
      const value = readInput ? readInput(promptText) : null;
      if (value === null || value === undefined) return null;
      write(`${value}\n`);
      return `${value}\n`;
    },
  });

  currentWrite = write;

  const globals = pyodide.globals.get("dict")();
  const startGuard = pyodide.globals.get("_jian_start");
  const stopGuard = pyodide.globals.get("_jian_stop");

  try {
    // 자유 코딩 방 예제가 import 없이도 동작하도록 magic을 미리 넣어 둡니다.
    await pyodide.runPythonAsync("import magic", { globals });
    startGuard(MAX_STEPS);
    await pyodide.runPythonAsync(code, { globals });
    return { success: true, stdout: output, error: null };
  } catch (err) {
    return { success: false, stdout: output, error: translateError(err.message), rawError: err.message };
  } finally {
    stopGuard();
    startGuard.destroy();
    stopGuard.destroy();
    globals.destroy();
  }
}

export async function runPythonCode(code, options) {
  const pyodide = await initPyodide();
  return executePython(pyodide, code, options);
}

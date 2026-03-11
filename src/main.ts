import { invoke } from "@tauri-apps/api/core";
import { getCurrentWindow } from "@tauri-apps/api/window";

// 메시지 타입
interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

// 채팅 기록
let chatHistory: Message[] = [];

// UI 요소
let characterEl: HTMLElement | null = null;
let speechBubbleEl: HTMLElement | null = null;
let chatInputEl: HTMLTextAreaElement | null = null;
let sendButtonEl: HTMLButtonElement | null = null;
let apiKeyModalEl: HTMLElement | null = null;

// API 키 확인
async function checkApiKey() {
  const hasKey = await invoke<boolean>("has_api_key");
  if (!hasKey) {
    showApiKeyModal();
  }
}

// API 키 모달 표시
function showApiKeyModal() {
  if (!apiKeyModalEl) return;
  apiKeyModalEl.style.display = "flex";
}

// API 키 모달 숨기기
function hideApiKeyModal() {
  if (!apiKeyModalEl) return;
  apiKeyModalEl.style.display = "none";
}

// API 키 설정
async function setApiKey() {
  const input = document.querySelector("#api-key-input") as HTMLInputElement;
  if (input && input.value.trim()) {
    await invoke("set_api_key", { key: input.value.trim() });
    hideApiKeyModal();
    addMessage("assistant", "API 키가 설정되었습니다! 이제 대화할 수 있어요!");
  }
}

// 메시지 추가
function addMessage(role: "user" | "assistant" | "system", content: string) {
  chatHistory.push({ role, content });

  if (role === "user") {
    // 사용자 메시지는 말풍선에 표시하지 않고 입력창만 비움
    if (chatInputEl) {
      chatInputEl.value = "";
    }
  } else if (role === "assistant") {
    // 어시스턴트 메시지를 말풍선에 표시
    showSpeechBubble(content);
  }
}

// 말풍선 표시
function showSpeechBubble(text: string) {
  if (!speechBubbleEl) return;

  // 말풍선 표시
  speechBubbleEl.style.display = "block";
  speechBubbleEl.innerHTML = "";

  // 타이핑 효과
  let index = 0;
  const speed = 30;

  function typeWriter() {
    if (index < text.length) {
      speechBubbleEl.textContent += text.charAt(index);
      index++;
      setTimeout(typeWriter, speed);
    }
  }

  typeWriter();

  // 10초 후 말풍선 숨기기
  setTimeout(() => {
    if (speechBubbleEl) {
      speechBubbleEl.style.display = "none";
    }
  }, 10000);
}

// GLM-5로 채팅 요청
async function sendChatMessage(userMessage: string) {
  if (!userMessage.trim()) return;

  // 사용자 메시지 추가
  addMessage("user", userMessage);

  // 채팅 기록에 시스템 프롬프트 추가
  const systemPrompt: Message = {
    role: "system",
    content: "당신은 Neuro-sama라는 귀여운 AI 비서 캐릭터입니다. 친절하고 도움이 되는 답변을 해주세요. 한국어로 대화하세요."
  };

  const messagesWithSystem = [systemPrompt, ...chatHistory];

  try {
    const response = await invoke<string>("chat_with_glm", {
      messages: messagesWithSystem
    });

    addMessage("assistant", response);
  } catch (error) {
    console.error("채팅 요청 실패:", error);
    showSpeechBubble("죄송해요, 연결에 문제가 생겼어요. 다시 시도해주세요!");
  }
}

// 캐릭터 클릭으로 입력창 포커스
function focusChatInput() {
  if (chatInputEl) {
    chatInputEl.focus();
  }
}

// 윈도우 드래그 기능
let isDragging = false;
let dragOffsetX = 0;
let dragOffsetY = 0;

function initDragFunctionality() {
  const app = document.querySelector(".neuro-widget");

  if (!app) return;

  app.addEventListener("mousedown", (e) => {
    // 채팅 입력창이나 버튼에서는 드래그하지 않음
    if ((e.target as HTMLElement).tagName === "TEXTAREA" ||
        (e.target as HTMLElement).tagName === "BUTTON") {
      return;
    }

    isDragging = true;
    dragOffsetX = e.clientX;
    dragOffsetY = e.clientY;
  });

  document.addEventListener("mousemove", async (e) => {
    if (!isDragging) return;

    const deltaX = e.clientX - dragOffsetX;
    const deltaY = e.clientY - dragOffsetY;

    const window = getCurrentWindow();
    const pos = await window.outerPosition();
    const size = await window.outerSize();

    await window.setPosition({
      x: pos.x + deltaX,
      y: pos.y + deltaY
    });

    dragOffsetX = e.clientX;
    dragOffsetY = e.clientY;
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
  });
}

// 초기화
window.addEventListener("DOMContentLoaded", async () => {
  // UI 요소 가져오기
  characterEl = document.querySelector("#character");
  speechBubbleEl = document.querySelector("#speech-bubble");
  chatInputEl = document.querySelector("#chat-input") as HTMLTextAreaElement;
  sendButtonEl = document.querySelector("#send-button") as HTMLButtonElement;
  apiKeyModalEl = document.querySelector("#api-key-modal");

  // API 키 확인
  await checkApiKey();

  // 이벤트 리스너 설정
  sendButtonEl?.addEventListener("click", () => {
    if (chatInputEl) {
      sendChatMessage(chatInputEl.value);
    }
  });

  chatInputEl?.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendChatMessage(chatInputEl.value);
    }
  });

  characterEl?.addEventListener("click", focusChatInput);

  // API 키 저장 버튼
  document.querySelector("#save-api-key")?.addEventListener("click", setApiKey);

  // 드래그 기능 초기화
  initDragFunctionality();

  // 환영 메시지
  setTimeout(() => {
    showSpeechBubble("안녕하세요! Neuro-sama입니다! 무엇을 도와드릴까요? 💫");
  }, 500);
});

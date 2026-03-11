# Neuro-sama Desktop Widget - Windows 실행 가이드

## WSL2 vs Windows 실행

**현재 문제:** WSL2 환경에서는 Linux GUI 라이브러리가 필요하여 Tauri 실행이 복잡합니다.

**권장 해결책:** Windows PowerShell에서 직접 실행하세요!

---

## 🪟 Windows에서 실행하기 (권장)

### 방법 1: PowerShell에서 직접 실행

1. **Windows PowerShell 열기**
   - Start Menu → "PowerShell" 검색
   - "Windows PowerShell" 실행 (관리자 권한 권장 but 필수 아님)

2. **프로젝트 디렉토리로 이동**
   ```powershell
   cd \\wsl.localhost\Ubuntu\home\rg3270\blog\desktop-widget
   # 또는
   cd C:\Users\JAMESPARK\path\to\desktop-widget
   ```

3. **의존성 설치 (최초 1회만)**
   ```powershell
   npm install
   ```

4. **개발 서버 실행**
   ```powershell
   npm run tauri dev
   ```

### 방법 2: WSL2에서 필요한 라이브러리 설치

**⚠️ 주의:** 시간이 오래 걸리고 디스크 용량을 많이 사용합니다.

```bash
# Ubuntu/Debian 계열
sudo apt update
sudo apt install -y \
    libwebkit2gtk-4.1-dev \
    libgtk-3-dev \
    libssl-dev \
    libappindicator3-dev \
    librsvg2-dev

# Fedora 계열
sudo dnf install \
    webkit2gtk4.1-devel \
    gtk3-devel \
    openssl-devel \
    libappindicator-gtk3-devel \
    librsvg2-devel
```

---

## 🔧 빌드 실행하기

### Windows (권장)
```powershell
cd /path/to/desktop-widget
npm run tauri dev
```

### WSL2 (라이브러리 설치 후)
```bash
cd ~/blog/desktop-widget
npm run tauri dev
```

---

## 📋 API 키 설정

실행 후 앱이 시작되면 API 키 입력 모달이 표시됩니다:

1. **Alibaba Coding Plan**에서 API 키 발급
2. `.env` 파일 생성 또는 모달에서 직접 입력
3. `GLM_API_KEY=sk-...` 형식으로 저장

---

## 🎯 다음 단계

1. Windows PowerShell에서 `npm run tauri dev` 실행
2. Neuro-sama 캐릭터가 화면에 나타납니다!
3. 채팅창에 메시지를 입력하세요

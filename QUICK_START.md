# 🚀 Neuro-sama Widget 빠른 실행 가이드

## 방법 1: WSL 터미널에서 직접 실행 (⭐ 가장 추천!)

### Windows 터미널에서 실행:
```bash
# WSL 터미널 열기 (Windows Terminal 또는 PowerShell)
wsl

# 프로젝트 디렉토리로 이동
cd ~/blog/desktop-widget

# 실행
npm run tauri dev
```

---

## 방법 2: wsl 명령어 사용

### PowerShell 또는 CMD에서:
```powershell
# WSL 내에서 npm 실행
wsl bash -c "cd ~/blog/desktop-widget && npm run tauri dev"
```

---

## 방법 3: Windows 파일 탐색기 경로

### 파일 탐색기 주소창에:
```
\\wsl$\Ubuntu\home\rg3270\blog\desktop-widget
```

### 해당 위치에서:
1. Shift + 우클릭 → "PowerShell 열기"
2. 명령어 실행:
```powershell
npm run tauri dev
```

---

## ⚠️ 주의사항

### ❌ 작동하지 않는 방법:
```powershell
# 이 경로는 작동하지 않습니다!
cd \\wsl.localhost\Ubuntu\home\rg3270\blog\desktop-widget
```

### ✅ 올바른 접근 방법:
- `\\wsl$` 사용 (끝에 `$` 필수!)
- 또는 WSL 터미널에서 직접 접속

---

## 🎯 추천 실행 방법

### 1단계: Windows Terminal 설치 (없는 경우)
- Microsoft Store에서 "Windows Terminal" 검색 후 설치

### 2단계: WSL 프로필 열기
```powershell
# Windows Terminal 또는 PowerShell에서:
wsl
```

### 3단계: 프로젝트 실행
```bash
cd ~/blog/desktop-widget
npm run tauri dev
```

이 방법이 가장 간단하고 확실합니다! 🎉

# Neuro-sama Desktop Widget 🌸

로컬 AI 에이전트 기반 데스크톱 위젯 - Neuro-sama 풍 귀여운 캐릭터가 화면 우측 하단에서 개인 비서 역할을 수행합니다!

## ✨ 기능

- 🎭 **화면 우측 하단에 떠있는 캐릭터 오버레이** - 항상 위에 표시되는 귀여운 Neuro-sama 캐릭터
- 🤖 **GLM-5 API 기반 LLM 통신** - Alibaba Coding Plan의 저렴한 GLM-5 모델 사용
- 💬 **말풍선 형태의 응답 표시** - 타이핑 효과와 함께 자연스러운 대화 경험
- 🖱️ **드래그로 위치 이동** - 원하는 위치로 캐릭터를 이동 가능
- 💾 **낮은 리소스 사용** - Tauri 기반으로 Electron보다 훨씬 가벼움 (100MB 미만)
- 🔒 **안전한 API 키 관리** - 환경 변수로 API 키 보안 관리

## 🛠️ 기술 스택

- **Framework**: Tauri 2.x (Rust + TypeScript + Vite)
- **LLM**: Alibaba Coding Plan GLM-5
- **UI**: HTML/CSS/JavaScript (Vanilla)
- **Styling**: CSS3 (Animations, Flexbox)

## 📦 설치

### 필수 조건

- Node.js 18+
- Rust 1.70+
- (Linux만) webkit2gtk 개발 패키지

### 1. 저장소 클론

```bash
git clone https://github.com/jmpark333/desktop-widget.git
cd desktop-widget
```

### 2. 의존성 설치

```bash
npm install
```

### 3. API 키 설정

`.env` 파일을 생성하고 GLM-5 API 키를 입력하세요:

```bash
cp .env.example .env
# .env 파일에 GLM_API_KEY=your_key_here 추가
```

### 4. 실행

```bash
npm run tauri dev
```

## 🏗️ 빌드

```bash
npm run tauri build
```

빌드된 실행 파일은 `src-tauri/target/release/bundle/` 디렉토리에서 찾을 수 있습니다.

## 🎮 사용법

1. **시작**: 앱을 실행하면 Neuro-sama 캐릭터가 화면에 나타납니다
2. **채팅**: 하단 입력창에 메시지를 입력하고 전송 버튼을 클릭하세요
3. **이동**: 캐릭터를 드래그하여 원하는 위치로 이동할 수 있습니다
4. **API 키 설정**: 첫 실행 시 API 키 입력 모달이 표시됩니다

## 🔧 개발

```bash
# 개발 서버 시작 (Hot reload 지원)
npm run tauri dev

# 타입 검사
npm run check

# 린트
npm run lint
```

## 📝 프로젝트 구조

```
desktop-widget/
├── src/                # 프론트엔드 (TypeScript + CSS)
│   ├── main.ts         # 메인 로직 및 Tauri 명령 호출
│   └── styles.css      # Neuro-sama 스타일
├── src-tauri/          # Rust 백엔드
│   ├── src/
│   │   └── lib.rs      # GLM-5 API 연동 및 Tauri 명령
│   └── tauri.conf.json # 위젯 설정 (투명 배경, 항상 위)
├── index.html          # 메인 HTML (캐릭터 SVG)
└── package.json
```

## 🚀 향후 기능

- [ ] 시스템 트레이 통합
- [ ] 자동 시작 기능
- [ ] 캐릭터 애니메이션 개선
- [ ] 대화 history 저장
- [ ] 다양한 캐릭터 스킨

## 📄 라이선스

MIT License - 자유롭게 사용 및 수정 가능

## 🙏 Acknowledgments

- [Tauri](https://tauri.app/) - 경량 데스크톱 앱 프레임워크
- [Alibaba Coding Plan](https://coding.dashscope.aliyuncs.com/) - GLM-5 API 제공
- Neuro-sama 캐릭터 디자인 영감

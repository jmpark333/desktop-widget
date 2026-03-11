#!/bin/bash
# WSL2 Tauri 개발 환경 설치 스크립트
# 사용법: bash install-wsl2-deps.sh

set -e

echo "🔧 Tauri 개발용 라이브러리 설치를 시작합니다..."
echo "⏱️  예상 소요 시간: 2-3분"

echo ""
echo "📦 패키지 목록 업데이트..."
sudo apt update

echo ""
echo "📦 필수 라이브러리 설치..."
sudo apt install -y \
    libwebkit2gtk-4.1-dev \
    libgtk-3-dev \
    libssl-dev \
    libappindicator3-dev \
    librsvg2-dev \
    build-essential \
    curl \
    wget

echo ""
echo "✅ 설치 완료!"
echo ""
echo "🚀 이제 Tauri를 실행할 수 있습니다:"
echo "   cd ~/blog/desktop-widget"
echo "   npm run tauri dev"

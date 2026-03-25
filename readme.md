# Ajin's Resume

**Language / 언어 / 言語**
&nbsp;·&nbsp;[한국어](#한국어)
&nbsp;·&nbsp;[日本語](#日本語)
&nbsp;·&nbsp;[English](#english)

---

## 한국어

개발자 이력서 페이지입니다. GitHub Pages를 통해 서버 없이 정적으로 호스팅됩니다.

**데모:** https://ganimjeong.github.io/my-resume

### 기술 스택

| 구분 | 사용 기술 |
|------|-----------|
| UI | React 19, TypeScript |
| 스타일 | Tailwind CSS v3 |
| 빌드 | Vite 6 |
| 배포 | GitHub Pages (GitHub Actions) |

### 파일 구조

```
my-resume/
├── .github/
│   └── workflows/
│       └── deploy.yml        # master 푸시 시 자동 배포
├── public/
├── src/
│   ├── components/
│   │   ├── Header.tsx        # 이름, 직함, 링크
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── Experience.tsx
│   │   └── Projects.tsx
│   ├── data/
│   │   └── resume.ts         # 이력서 데이터 (여기만 수정)
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── vite.config.ts
├── tailwind.config.ts
└── package.json
```

### 개발 환경

**요구사항:** Node.js 20+

```bash
# 의존성 설치
npm install

# 개발 서버 실행 (http://localhost:5173)
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview
```

---

## 日本語

開発者のレジュメページです。GitHub Pages を使用してサーバーなしで静的にホスティングされています。

**デモ:** https://ganimjeong.github.io/my-resume

### 技術スタック

| 区分 | 使用技術 |
|------|----------|
| UI | React 19, TypeScript |
| スタイル | Tailwind CSS v3 |
| ビルド | Vite 6 |
| デプロイ | GitHub Pages (GitHub Actions) |

### ファイル構成

```
my-resume/
├── .github/
│   └── workflows/
│       └── deploy.yml        # master プッシュ時に自動デプロイ
├── public/
├── src/
│   ├── components/
│   │   ├── Header.tsx        # 名前・肩書き・リンク
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── Experience.tsx
│   │   └── Projects.tsx
│   ├── data/
│   │   └── resume.ts         # 履歴書データ（ここだけ編集）
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── vite.config.ts
├── tailwind.config.ts
└── package.json
```

### 開発環境

**必要条件:** Node.js 20+

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動 (http://localhost:5173)
npm run dev

# プロダクションビルド
npm run build

# ビルド結果のプレビュー
npm run preview
```

---

## English

A developer resume page, hosted statically on GitHub Pages with no server required.

**Demo:** https://ganimjeong.github.io/my-resume

### Tech Stack

| Category | Technology |
|----------|------------|
| UI | React 19, TypeScript |
| Styling | Tailwind CSS v3 |
| Build | Vite 6 |
| Deploy | GitHub Pages (GitHub Actions) |

### File Structure

```
my-resume/
├── .github/
│   └── workflows/
│       └── deploy.yml        # Auto-deploys on push to master
├── public/
├── src/
│   ├── components/
│   │   ├── Header.tsx        # Name, title, links
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── Experience.tsx
│   │   └── Projects.tsx
│   ├── data/
│   │   └── resume.ts         # Resume data (edit here only)
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── vite.config.ts
├── tailwind.config.ts
└── package.json
```

### Development

**Requirements:** Node.js 20+

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:5173)
npm run dev

# Production build
npm run build

# Preview build output
npm run preview
```

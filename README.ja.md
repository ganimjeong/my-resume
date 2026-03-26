# Ajin's Resume

**언어 / Language / 言語**
&nbsp;·&nbsp;[한국어](README.md)
&nbsp;·&nbsp;[English](README.en.md)
&nbsp;·&nbsp;[日本語](README.ja.md)

---

## 日本語

React + TypeScript で制作した多言語インタラクティブポートフォリオサイトです。
GSAP による豊富なアニメーションと Lenis スムーススクロールを実装しています。

**デモ:** https://ganimjeong.github.io/my-resume

---

### 技術スタック

| 区分 | 使用技術 |
|------|----------|
| UI | React 19, TypeScript 5.7 |
| スタイル | Tailwind CSS v3 |
| アニメーション | GSAP 3.14 (ScrollTrigger, SplitText, Physics2DPlugin) |
| スクロール | Lenis |
| ルーティング | React Router DOM v6 |
| ビルド | Vite 6 |
| デプロイ | GitHub Pages (GitHub Actions 自動デプロイ) |

---

### 主な機能とインタラクション

- **3言語対応** — ランディングページで韓国語 / 英語 / 日本語を選択
- **ShapeOverlay ページ遷移** — SVG 曲線ウェーブがオレンジグラデーションで画面を横断
- **SplitText スクロールアニメーション** — About の自己紹介と Dongari-um 説明文がスクロールに合わせて行単位でマスク解除
- **クリックパーティクルエフェクト** — `Physics2DPlugin` でクリック位置からパーティクル爆発
- **スクロール連動回転** — 受賞歴 🏆・プロジェクト D 画像がスクロールに応じて -45° → +45° 回転
- **スクロール速度ベースの傾き** — Languages セクションが高速スクロール時に `skewY` で傾く
- **カーソル追従アイ** — フッターの大型 SVG の目が虹彩・瞳孔ごとマウスカーソルを追いかける（`clipPath` で目の範囲内に制限）
- **Lenis スムーススクロール** — 慣性スクロール（GSAP ScrollTrigger と連動）
- **アコーディオン言語セクション** — Languages 項目クリックで GSAP 高さアニメーション展開
- **連絡先コピー** — 電話番号クリックでクリップボードコピー + GSAP トースト通知

---

### ファイル構成

```
src/
├── pages/
│   ├── Landing.tsx          # 言語選択ランディング（3D ローリングテキスト、SplitText）
│   └── Resume.tsx           # 履歴書メインレイアウト
├── components/
│   ├── resume/
│   │   ├── Header.tsx       # 挨拶・自己紹介・連絡先
│   │   ├── Skills.tsx       # スキルカテゴリグリッド
│   │   ├── Experience.tsx   # 経歴 / 活動（右→左スライドイン）
│   │   ├── Awards.tsx       # 受賞歴（🏆 スクロール回転）
│   │   ├── Languages.tsx    # 言語能力アコーディオン（skewY インタラクション）
│   │   ├── Projects.tsx     # 進行中プロジェクト（D 画像回転、SplitText）
│   │   └── Footer.tsx       # オレンジフッター（カーブスワイプ登場、カーソル追従アイ）
│   ├── gallery/
│   │   └── BentoGallery.tsx # Bento スタイル画像ギャラリー
│   └── shared/
│       ├── ShapeOverlay.tsx # SVG ウェーブページ遷移オーバーレイ
│       └── ClickEffect.tsx  # クリックパーティクルエフェクト（Physics2DPlugin）
├── data/
│   ├── types.ts             # ResumeData インターフェース（単一の信頼できる情報源）
│   ├── ko.ts                # 韓国語コンテンツ
│   ├── en.ts                # 英語コンテンツ
│   ├── ja.ts                # 日本語コンテンツ
│   └── index.ts             # 言語 → データマッピング
└── index.css                # Tailwind グローバルスタイル
```

---

### 開発環境

**必要条件:** Node.js 20+

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev
# → http://localhost:5173/my-resume/

# プロダクションビルド（型チェック含む）
npm run build

# ビルド結果のプレビュー
npm run preview
```

ロケール別アクセス:
```
http://localhost:5173/my-resume/resume/ko
http://localhost:5173/my-resume/resume/en
http://localhost:5173/my-resume/resume/ja
```

---

### GSAP プラグイン

すべてのプラグインは使用前に必ず登録してください。

```ts
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { Physics2DPlugin } from 'gsap/Physics2DPlugin'

gsap.registerPlugin(ScrollTrigger, SplitText, Physics2DPlugin)
```

---

### コンテンツの編集

- 履歴書の内容を編集: `src/data/ja.ts`（または `ko.ts`、`en.ts`）
- 新セクションの追加: `types.ts` の型を更新 → 3つの言語ファイルすべてに内容を追加 → コンポーネントを作成 → `Resume.tsx` に追加
- **注意:** 3つの言語ファイルは常に `ResumeData` 型と一致している必要があります。不一致は TypeScript がビルド時に検出します。

---

### デプロイ

`master` ブランチへの push 時に GitHub Actions が自動的に `dist/` を GitHub Pages へデプロイします。
`vite.config.ts` の `base: '/my-resume/'` は変更しないでください。

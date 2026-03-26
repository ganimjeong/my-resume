import type { ResumeData } from './types';

export const jaData: ResumeData = {
  header: {
    name: 'ジョン・アジン',
    title: 'フロントエンド & AI 開発者',
    greeting: 'はじめまして、ジョン・アジンです 👋',
    hashtags: ['# 大統領奨学生', '# メンサ正会員'],
    contact: {
      email: 'ganimjeong@gmail.com',
      phone: '+82 10-3122-5629',
      github: 'github.com/ganimjeong',
      service: 'dongarium.co.kr',
    },
  },
  ui: {
    copied: 'コピーしました',
  },
  about: {
    title: '自己紹介',
    description: [
      { text: '私は' },
      { text: 'フロントエンド・AI', bold: true },
      { text: '分野を開発する' },
      { text: 'ジョン・アジン', bold: true },
      { text: 'です！\n' },
      { text: '主専攻は' },
      { text: 'IoT人工知能融合専攻', bold: true },
      { text: '、\n融合前の専攻は経済学科、\n副専攻は日本語日本文学科です。' },
    ],
  },
  skills: {
    title: 'スキル',
    categories: [
      {
        name: 'フロントエンド',
        items: [
          'JavaScript', 'TypeScript',
          'React', 'React Hooks', 'React Router', 'React Hook Form',
          'Context API', 'Redux', 'Zustand',
          'Tailwind CSS', 'Styled-components',
          'Vite', 'GSAP', 'Mobile-First Design', 'Memoization', 'SEO / GA',
        ],
      },
      {
        name: 'バックエンド / インフラ',
        items: ['Axios', 'Firebase', 'Supabase', 'MySQL', 'GitHub Pages', 'Nginx', 'AWS'],
      },
      {
        name: '開発ツール',
        items: ['Git', 'npm / yarn', 'ESLint', 'Prettier', 'Husky', 'Vitest', 'MSW'],
      },
      {
        name: 'コラボレーション',
        items: ['GitHub Projects', 'Jira', 'Notion', 'Slack', 'Discord', 'Agile / Scrum'],
      },
    ],
  },
  experience: {
    title: '経歴 / 活動経験',
    items: [
      {
        position: '交換留学生 & 研究員',
        company: 'University of Missouri St. Louis',
        period: '2024.08 - 2025.01 (6ヶ月) | アメリカ ミズーリ州',
        description: [
          'AI分野韓米科学奨学生に選定され、コンピュータサイエンス専攻として交換留学遂行',
          'AI技術実態報告書作成及びKIAT(韓国産業技術振興院)提出',
          'コンピュータサイエンスチームプロジェクト遂行及び多国籍協業経験',
          '英語、日本語、スペイン語など多言語学習',
        ],
      },
      {
        position: 'エンジニアインターン',
        company: 'CAL株式会社',
        period: '2024.06 - 2024.07 (1ヶ月) | 日本 大阪',
        description: [
          'エンジニア職務遂行及び毎日業務日報作成（日本語勤務環境）',
          'インターン対象コーディングメンタリング実施（Python、SQL、AI基礎教育）',
          'インターンチームプロジェクト企画提案及び承認、AIウェブサービス開発技術仕様設計',
          'インターン評価最優秀インターン選定及び成果発表実施',
          '以後、韓日IT交流事業通訳勤労奨学生に選抜',
        ],
      },
      {
        position: '学部研究生',
        company: 'HML ヒューマンメディア研究所',
        period: '2023.06 - 2024.06 (1年)',
        description: [
          'OCRベース口座振替自動連動技術開発',
          '画像処理及び自然言語処理（NLP）技術研究及びAIスタディ',
          '日本立命館大学研究所と協業及び学生通訳',
          '芝浦工業大学gPBLプログラム及び日本大学交流行事進行',
          '大統領科学奨学生選抜、大統領賞及びメダル授与',
        ],
      },
      {
        position: '会長 (Founder & President)',
        company: 'LikeLion University 全南大学校',
        period: '2021.12 - 2022.12 (1年)',
        description: [
          'LikeLion本社コンタクト及び全南大学校支部導入主導',
          '全南大学校大学生対象コーディング教育プログラム企画/設計/運営総括',
          '38名の学生対象フロントエンド、アルゴリズム、企画、デザイン教育進行',
          '2回ウェブサービスハッカソン企画、運営及び参加',
          '教育修了生多数がAI研究室及びIT企業就職、後続IT同好会創立など成果輩出',
          '100名以上規模組織及び行事運営経験',
        ],
      },
      {
        position: '旗長 (Captain)',
        company: '総長名誉学生会',
        period: '2020.08 - 2025.08 (5年)',
        description: [
          '優秀成績入学後、総長名誉学生組織旗長として5年間活動',
          '読書討論、教育奉仕、挑戦活動、総長主催行事など多数企画/運営/参加',
          '学内討論行事進行',
          'ヤホ児童センターリサイクル（アップサイクリング）クラス企画及び運営（ミシン活用）',
          '北区児童センター学習メンタリング及び公益活動主導',
          '歴史行事及び祭りブース企画運営',
        ],
      },
      {
        position: 'フロントエンド開発修了生',
        company: 'Kakao Tech Campus',
        period: '2025.04 - 2025.11 (約8ヶ月)',
        description: [
          'フロントエンドパート選抜',
          'JavaScript、React深化講義150個分量修了（Git、CI/CD、AWS、Figma、UI/UX含む）',
          'クローンコーディングプロジェクト進行及び現職開発者週間コードレビュー遂行',
          '大学同好会支援統合プラットフォーム「Dongari-um」開発参加',
          '11月修了後、実際のサービスデプロイ — 2026.03 GA基準ページビュー9万突破',
        ],
      },
    ],
  },
  projects: {
    title: 'プロジェクト',
    items: [
      {
        name: 'マイレジュメ',
        description: 'モダンなUI/UXを備えた多言語ポートフォリオWebサイト',
        technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
        link: 'https://github.com/yourusername/my-resume',
      },
    ],
  },
  awards: {
    title: '🏆 受賞経歴',
    items: [
      { award: '最優秀賞', description: '2024 海外就職インターンシップ成果報告会' },
      { award: '模範賞', description: '全南大学校 (卒業生中自己啓発記録簿1位)' },
      { award: '大賞', description: '2022 学生創業カンファレンス釜山未来企業家賞' },
      { award: '銀賞', description: 'AI Cloud 競技大会' },
      { award: '最優秀賞', description: '2021 GIST Mini I-Corps 創業競技大会' },
      { award: '優秀賞', description: '2021 CNU Start-Up 競技大会 / 企画及び開発' },
      { award: '総長賞(奨励賞)', description: '2021 光州-全南が読んでトークする在学生読書クラブ' },
      { award: 'アイデア賞', description: '2022 3Dプリンター活用補助機器公募展' },
      { award: '佳作賞', description: '2022 工学手記公募展' },
      { award: '大賞', description: '2022 湖南済州圏連合大学創業キャンプメイカソン' },
      { award: 'ベストアイデア賞', description: '2022 湖南済州圏連合大学創業キャンプメイカソン' },
      { award: '奨励賞', description: 'SAH 第4次未来想像大会アイデア公募展' },
      { award: '努力賞', description: '工学数学プログラム' },
      { award: '最優秀映像選定', description: '全南大熱作コロナブルーUCC制作 / チームリーダー' },
      { award: '最優秀映像選定', description: '児童センターボランティア活動UCC制作 / チームリーダー' },
      { award: '最優秀映像選定', description: '読書討論UCC制作' },
    ],
  },
};

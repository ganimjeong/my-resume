// 기업 제출용 한국어 포트폴리오 PDF 생성기.
// 웹사이트 데이터(ko.ts) + 프로젝트 쇼케이스 상세(projectShowcase.ts)를 합쳐
// 인쇄에 최적화된 자체완결형 HTML 을 만든다. 이미지는 base64 로 임베드.
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { koData } from './src/data/ko.ts';
import { projectShowcase } from './src/data/projectShowcase.ts';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC = resolve(__dirname, 'public');

const esc = (s = '') =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

// GitHub 옥티콘(star/repo-forked)을 인라인 SVG 로 — 글씨 없이도 스타/포크가 직관적으로 보이도록.
const STAR_SVG =
  '<svg class="stat-ic" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Zm0 2.445L6.615 5.5a.75.75 0 0 1-.564.41l-3.097.45 2.24 2.184a.75.75 0 0 1 .216.664l-.528 3.084 2.769-1.456a.75.75 0 0 1 .698 0l2.77 1.456-.53-3.084a.75.75 0 0 1 .216-.664l2.24-2.183-3.096-.45a.75.75 0 0 1-.564-.41L8 2.694Z"/></svg>';
const FORK_SVG =
  '<svg class="stat-ic" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z"/></svg>';
const statIcon = (icon) => (icon === 'star' ? STAR_SVG : icon === 'fork' ? FORK_SVG : '');

// public/ 기준 경로를 base64 data URI 로 변환 (실패 시 빈 문자열)
const dataUri = (relPath) => {
  try {
    const buf = readFileSync(resolve(PUBLIC, relPath));
    return `data:image/png;base64,${buf.toString('base64')}`;
  } catch {
    return '';
  }
};
const fileUri = (absPath) => {
  try {
    const buf = readFileSync(absPath);
    return `data:image/png;base64,${buf.toString('base64')}`;
  } catch {
    return '';
  }
};

const { header, about, skills, experience, awards, languages } = koData;
const showcase = projectShowcase.ko;

const profileImg = fileUri(resolve(__dirname, 'images/headerSection/myIcon.png'));

const aboutHtml = about.description
  .map((seg) => (seg.bold ? `<strong>${esc(seg.text)}</strong>` : esc(seg.text)))
  .join('')
  .replace(/\n/g, '<br/>');

const hashtags = header.hashtags.map((t) => `<span class="tag-blue">${esc(t)}</span>`).join('');

const contactHtml = [
  header.contact.email ? `<span>${esc(header.contact.email)}</span>` : '',
  header.contact.phone ? `<span>${esc(header.contact.phone)}</span>` : '',
  header.contact.github ? `<span>${esc(header.contact.github)}</span>` : '',
  header.contact.service ? `<span>${esc(header.contact.service)}</span>` : '',
]
  .filter(Boolean)
  .join('<span class="dot">·</span>');

// ── Skills ──
const skillsHtml = skills.categories
  .map(
    (cat) => `
    <div class="skill-cat">
      <div class="skill-cat-name">${esc(cat.name)}</div>
      <div class="chips">
        ${cat.items.map((i) => `<span class="chip">${esc(i)}</span>`).join('')}
      </div>
    </div>`
  )
  .join('');

// ── Experience ──
const expHtml = experience.items
  .map(
    (item) => `
    <div class="exp-item">
      <div class="exp-head">
        <div>
          <div class="exp-pos">${esc(item.position)}</div>
          <div class="exp-company">${esc(item.company)}</div>
        </div>
        <div class="exp-period">${esc(item.period)}</div>
      </div>
      <ul class="bullets">
        ${item.description.map((d) => `<li>${esc(d)}</li>`).join('')}
      </ul>
    </div>`
  )
  .join('');

// ── Projects (full showcase detail) ──
const projectHtml = showcase.projects
  .map((p, idx) => {
    const accent = p.accent;
    const statusHtml = p.status
      ? `<span class="status" style="color:${accent};background:${accent}14">
           <span class="status-dot" style="background:${accent}"></span>${esc(p.status)}
         </span>`
      : '';

    const summaryHtml = p.summary.map((para) => `<p class="proj-summary">${esc(para)}</p>`).join('');

    const statsHtml =
      p.stats.length > 0
        ? `<div class="block">
             <div class="block-label">${esc(showcase.labels.highlights)}</div>
             <div class="stats-grid">
               ${p.stats
                 .map(
                   (s) => `<div class="stat">
                     <div class="stat-value" style="color:${accent}">${statIcon(s.icon)}<span>${esc(s.value)}</span></div>
                     <div class="stat-label">${esc(s.label)}</div>
                   </div>`
                 )
                 .join('')}
             </div>
           </div>`
        : '';

    const featuresHtml =
      p.features.length > 0
        ? `<div class="block">
             <div class="block-label">${esc(showcase.labels.features)}</div>
             <div class="feature-grid">
               ${p.features
                 .map(
                   (f, i) => `<div class="feature">
                     <div class="feature-num" style="background:${accent}">${i + 1}</div>
                     <div class="feature-title">${esc(f.title)}</div>
                     <div class="feature-desc">${esc(f.desc)}</div>
                   </div>`
                 )
                 .join('')}
             </div>
           </div>`
        : '';

    const channelsHtml =
      p.channels && p.channels.length > 0
        ? `<div class="block">
             <div class="block-label">${esc(showcase.labels.channels)}</div>
             <div class="channel-grid">
               ${p.channels
                 .map(
                   (c) => `<div class="channel">
                     <div class="channel-handle">${esc(c.handle)}<span class="channel-note">${esc(c.note)}</span></div>
                     <div class="channel-followers" style="color:${accent}">${esc(c.followers)}<span class="channel-foll-label">followers</span></div>
                   </div>`
                 )
                 .join('')}
             </div>
           </div>`
        : '';

    const nonWide = p.images.filter((i) => !i.wide).length;
    const galCols = nonWide > 4 ? 'gallery-3' : 'gallery-2';
    const galleryHtml =
      p.images.length > 0
        ? `<div class="block">
             <div class="block-label">${esc(showcase.labels.gallery)}</div>
             <div class="gallery ${galCols}">
               ${p.images
                 .map((img) => {
                   const uri = dataUri(img.src);
                   if (!uri) return '';
                   return `<figure class="${img.wide ? 'shot-wide' : 'shot'}">
                     <div class="shot-frame"><img src="${uri}" alt="${esc(img.alt ?? p.name)}"/></div>
                     ${img.caption ? `<figcaption>${esc(img.caption)}</figcaption>` : ''}
                   </figure>`;
                 })
                 .join('')}
             </div>
           </div>`
        : '';

    const techHtml = `<div class="block">
        <div class="block-label">${esc(showcase.labels.techStack)}</div>
        <div class="chips">${p.techStack.map((t) => `<span class="chip">${esc(t)}</span>`).join('')}</div>
      </div>`;

    const linksHtml =
      p.links.length > 0
        ? `<div class="proj-links">${showcase.labels.visit}:
             ${p.links
               .map((l) => `<span class="link-url">${esc(l.label)} — ${esc(l.url.replace(/^https?:\/\//, '').replace(/\/$/, ''))}</span>`)
               .join('')}
           </div>`
        : '';

    return `
      <article class="project">
        <div class="proj-accent" style="background:${accent}"></div>
        <div class="proj-header">
          <h3 class="proj-name">${esc(p.name)}</h3>
          ${statusHtml}
          <p class="proj-tagline">${esc(p.tagline)}</p>
          <div class="proj-meta">
            <span><b>${esc(showcase.labels.role)}</b> ${esc(p.role)}</span>
            <span><b>${esc(showcase.labels.period)}</b> ${esc(p.period)}</span>
          </div>
        </div>
        ${summaryHtml}
        ${statsHtml}
        ${featuresHtml}
        ${channelsHtml}
        ${galleryHtml}
        ${techHtml}
        ${linksHtml}
      </article>`;
  })
  .join('');

// ── Awards ──
const awardsHtml = awards.items
  .map(
    (a) => `<div class="award"><span class="award-name">${esc(a.award)}</span><span class="award-desc">${esc(a.description)}</span></div>`
  )
  .join('');

// ── Languages ──
const langHtml = languages.items
  .map((l) => {
    const meta = l.sublanguages
      ? `<span class="lang-pct">${l.sublanguages.map((s) => `${esc(s.name)} ${s.percent}%`).join(' · ')}</span>`
      : typeof l.percent === 'number'
        ? `<span class="lang-pct">${l.percent}%</span>`
        : `<span class="lang-stars">${esc(l.level)}</span>`;
    return `<div class="lang-item">
      <div class="lang-head"><span class="lang-name">${esc(l.name)}</span>${meta}</div>
      <ul class="bullets bullets-sm">${l.description.map((d) => `<li>${esc(d)}</li>`).join('')}</ul>
    </div>`;
  })
  .join('');

const html = `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="utf-8"/>
<title>${esc(header.name)} 포트폴리오</title>
<style>
  @page { size: A4; margin: 14mm 13mm; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  body {
    font-family: "Apple SD Gothic Neo", "Pretendard", "Noto Sans KR", -apple-system, sans-serif;
    color: #1f2937; font-size: 10.5px; line-height: 1.5; letter-spacing: -0.01em;
  }
  .wrap { max-width: 720px; margin: 0 auto; }
  .tag-blue { color: #2563eb; font-weight: 600; margin-right: 10px; }
  .dot { margin: 0 7px; color: #cbd5e1; }
  strong { font-weight: 700; color: #111827; }

  /* Header */
  .header { display: flex; gap: 22px; align-items: flex-start; padding-bottom: 18px; border-bottom: 2px solid #111827; }
  .header-main { flex: 1; min-width: 0; }
  .eyebrow { font-size: 9px; font-weight: 700; letter-spacing: 0.22em; color: #9ca3af; text-transform: uppercase; margin-bottom: 8px; }
  .name-title { font-size: 13px; color: #2563eb; font-weight: 700; margin-bottom: 6px; }
  .greeting { font-size: 21px; font-weight: 700; color: #111827; line-height: 1.3; margin-bottom: 12px; letter-spacing: -0.02em; }
  .about { font-size: 11px; color: #374151; line-height: 1.6; margin-bottom: 10px; }
  .hashtags { margin-bottom: 10px; }
  .contact { font-size: 10px; color: #6b7280; }
  .profile { width: 96px; height: 116px; object-fit: contain; flex-shrink: 0; }

  /* Sections */
  section { padding: 16px 0; border-bottom: 1px solid #e5e7eb; }
  section.no-border { border-bottom: none; }
  .sec-title { font-size: 15px; font-weight: 700; color: #111827; margin-bottom: 12px; letter-spacing: -0.02em; }

  /* Skills */
  .skill-cat { margin-bottom: 9px; }
  .skill-cat-name { font-size: 9px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #6b7280; margin-bottom: 5px; }
  .chips { display: flex; flex-wrap: wrap; gap: 4px; }
  .chip { background: #f3f4f6; color: #374151; border-radius: 999px; padding: 2.5px 9px; font-size: 9.5px; }

  /* Experience */
  .exp-item { margin-bottom: 13px; break-inside: avoid; }
  .exp-head { display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; margin-bottom: 4px; }
  .exp-pos { font-size: 12.5px; font-weight: 700; color: #111827; }
  .exp-company { font-size: 11px; color: #2563eb; }
  .exp-period { font-size: 9.5px; color: #9ca3af; text-align: right; white-space: nowrap; flex-shrink: 0; }
  .bullets { list-style: none; }
  .bullets li { position: relative; padding-left: 12px; color: #374151; font-size: 10px; line-height: 1.55; margin-bottom: 1.5px; }
  .bullets li::before { content: "•"; position: absolute; left: 0; color: #93c5fd; font-weight: 700; }
  .bullets-sm li { font-size: 9.5px; }

  /* Projects */
  .projects-section { padding: 0; }
  .project { page-break-before: always; padding: 4px 0; position: relative; }
  .page-break { page-break-before: always; }
  .proj-accent { width: 34px; height: 4px; border-radius: 999px; margin-bottom: 9px; }
  .proj-name { font-size: 16px; font-weight: 700; color: #111827; }
  .status { display: inline-flex; align-items: center; gap: 5px; border-radius: 999px; padding: 2.5px 9px; font-size: 9px; font-weight: 700; margin-top: 6px; }
  .status-dot { width: 5px; height: 5px; border-radius: 999px; display: inline-block; }
  .proj-tagline { font-size: 12px; font-weight: 600; color: #111827; line-height: 1.4; margin-top: 7px; }
  .proj-meta { display: flex; flex-wrap: wrap; gap: 18px; margin-top: 6px; font-size: 9.5px; color: #6b7280; }
  .proj-meta b { color: #9ca3af; font-weight: 600; margin-right: 4px; }
  .proj-summary { font-size: 10.5px; color: #374151; line-height: 1.6; margin-top: 8px; }

  .block { margin-top: 9px; break-inside: avoid; }
  .block-label { font-size: 8.5px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #9ca3af; margin-bottom: 5px; }

  .stats-grid { display: flex; flex-wrap: wrap; gap: 6px; }
  .stat { flex: 1; min-width: 120px; border: 1px solid #e5e7eb; border-radius: 9px; padding: 8px 11px; background: #fafafa; }
  .stat-value { font-size: 16px; font-weight: 700; line-height: 1.1; display: flex; align-items: center; gap: 5px; }
  .stat-ic { width: 15px; height: 15px; flex-shrink: 0; }
  .stat-label { font-size: 9px; color: #6b7280; margin-top: 3px; }

  .feature-grid { display: flex; gap: 7px; }
  .feature { flex: 1; border: 1px solid #e5e7eb; border-radius: 9px; padding: 10px; }
  .feature-num { width: 18px; height: 18px; border-radius: 5px; color: #fff; font-size: 9px; font-weight: 700; display: flex; align-items: center; justify-content: center; margin-bottom: 6px; }
  .feature-title { font-size: 10.5px; font-weight: 700; color: #111827; margin-bottom: 3px; }
  .feature-desc { font-size: 9px; color: #6b7280; line-height: 1.5; }

  .channel-grid { display: flex; flex-wrap: wrap; gap: 6px; }
  .channel { flex: 1; min-width: 200px; display: flex; justify-content: space-between; align-items: center; border: 1px solid #e5e7eb; border-radius: 9px; padding: 8px 12px; }
  .channel-handle { font-size: 10.5px; font-weight: 700; color: #111827; }
  .channel-note { font-size: 8.5px; color: #9ca3af; font-weight: 400; margin-left: 6px; }
  .channel-followers { font-size: 14px; font-weight: 700; text-align: right; }
  .channel-foll-label { display: block; font-size: 7px; text-transform: uppercase; letter-spacing: 0.1em; color: #9ca3af; font-weight: 600; }

  .gallery { display: flex; flex-wrap: wrap; gap: 7px; }
  .shot-wide { width: 100%; }
  .gallery-2 .shot { width: calc(50% - 3.5px); }
  .gallery-3 .shot { width: calc(33.333% - 4.7px); }
  .shot-frame { border: 1px solid #e5e7eb; border-radius: 9px; background: #f9fafb; overflow: hidden; display: flex; align-items: center; justify-content: center; }
  .gallery-2 .shot .shot-frame { height: 122px; }
  .gallery-3 .shot .shot-frame { height: 94px; }
  .shot-wide .shot-frame { height: 150px; }
  .shot-frame img { max-width: 100%; max-height: 100%; object-fit: contain; }
  figcaption { font-size: 8px; color: #9ca3af; text-align: center; margin-top: 3px; line-height: 1.3; }

  .proj-links { margin-top: 9px; font-size: 9px; color: #6b7280; }
  .link-url { margin-left: 8px; color: #374151; }

  /* Awards */
  .awards-grid { display: flex; flex-wrap: wrap; column-gap: 24px; row-gap: 4px; }
  .award { display: flex; gap: 8px; width: calc(50% - 12px); align-items: baseline; }
  .award-name { font-weight: 700; color: #2563eb; font-size: 10px; white-space: nowrap; }
  .award-desc { color: #4b5563; font-size: 10px; }

  /* Languages */
  .lang-item { border: 1px solid #e5e7eb; border-radius: 9px; padding: 9px 12px; margin-bottom: 7px; break-inside: avoid; }
  .lang-head { display: flex; align-items: center; gap: 10px; margin-bottom: 5px; }
  .lang-name { font-size: 12px; font-weight: 700; color: #111827; }
  .lang-pct { font-size: 10px; font-weight: 700; color: #2563eb; }
  .lang-stars { color: #f59e0b; font-size: 11px; }
</style>
</head>
<body>
<div class="wrap">
  <header class="header">
    <div class="header-main">
      <div class="eyebrow">Portfolio</div>
      <div class="name-title">${esc(header.name)} · ${esc(header.title)}</div>
      <h1 class="greeting">${esc(header.greeting)}</h1>
      <p class="about">${aboutHtml}</p>
      <div class="hashtags">${hashtags}</div>
      <div class="contact">${contactHtml}</div>
    </div>
    ${profileImg ? `<img class="profile" src="${profileImg}" alt="profile"/>` : ''}
  </header>

  <section>
    <div class="sec-title">${esc(skills.title)}</div>
    ${skillsHtml}
  </section>

  <section>
    <div class="sec-title">${esc(experience.title)}</div>
    ${expHtml}
  </section>

  <section class="no-border projects-section">
    ${projectHtml}
  </section>

  <section class="page-break">
    <div class="sec-title">${esc(awards.title)}</div>
    <div class="awards-grid">${awardsHtml}</div>
  </section>

  <section class="no-border">
    <div class="sec-title">${esc(languages.title)}</div>
    ${langHtml}
  </section>
</div>
</body>
</html>`;

const outPath = resolve(__dirname, 'portfolio-ko.html');
const { writeFileSync } = await import('node:fs');
writeFileSync(outPath, html, 'utf-8');
console.log('HTML written:', outPath, `(${(html.length / 1024 / 1024).toFixed(1)} MB)`);

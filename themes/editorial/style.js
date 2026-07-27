/* eslint-disable react/no-unknown-property */
/**
 * Editorial 主题 — 全局样式
 *
 * 原则：
 *  - 三色：米白底 / 墨黑字 / 陶土橙强调
 *  - 圆角 8px / 边框 1px 浅灰
 *  - 衬线标题 / 黑体正文
 *  - 区块之间用留白分隔，不用通栏横线
 */
const Style = () => {
  return (
    <style jsx global>{`
      /* ============================================================
       * 1. 主题变量
       * ============================================================ */
      #theme-editorial {
        --ed-bg: #faf9f5;
        --ed-surface: #ffffff;
        --ed-surface-soft: #f4f2ec;
        --ed-text: #1f1e1a;
        --ed-text-soft: #6b6860;
        --ed-text-faint: #9b988e;
        --ed-rule: #e8e4d8;
        --ed-rule-soft: #f0ece1;
        --ed-accent: #d97757;
        --ed-accent-soft: #f0d4c2;
        --ed-radius: 8px;
        --ed-radius-sm: 6px;
        --ed-radius-lg: 10px;
      }

      /* ============================================================
       * 2. 基础排版
       * ============================================================ */
      #theme-editorial {
        background-color: var(--ed-bg);
        color: var(--ed-text);
        font-family: 'Noto Sans SC', -apple-system, BlinkMacSystemFont,
          'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
        font-weight: 300;
        letter-spacing: 0.005em;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-rendering: optimizeLegibility;
        font-feature-settings: 'kern' 1;
      }

      #theme-editorial h1,
      #theme-editorial h2,
      #theme-editorial h3,
      #theme-editorial h4,
      #theme-editorial .ed-serif {
        font-family: 'Noto Serif SC', 'Source Serif Pro', 'Bitter', Georgia,
          'Times New Roman', serif;
        font-weight: 500;
        letter-spacing: -0.005em;
        color: var(--ed-text);
      }

      #theme-editorial .ed-num,
      #theme-editorial .ed-serif-mix {
        font-family: 'Source Serif Pro', 'Bitter', Georgia, 'Noto Serif SC',
          serif;
        font-variant-numeric: tabular-nums;
        font-feature-settings: 'tnum' 1, 'lnum' 1;
      }

      /* ============================================================
       * 3. 链接
       * ============================================================ */
      #theme-editorial a {
        color: inherit;
        text-decoration: none;
        border-bottom: 1px solid transparent;
        transition: color 180ms ease, border-color 180ms ease,
          background-color 180ms ease;
      }
      #theme-editorial a:hover {
        color: var(--ed-accent);
      }

      #theme-editorial .ed-accent {
        color: var(--ed-accent);
      }

      /* ============================================================
       * 4. 卡片
       * ============================================================ */
      #theme-editorial .ed-card {
        background-color: var(--ed-surface);
        border: 1px solid var(--ed-rule);
        border-radius: var(--ed-radius);
      }
      #theme-editorial .ed-card-soft {
        background-color: var(--ed-bg);
        border: 1px solid var(--ed-rule);
        border-radius: var(--ed-radius);
      }

      /* ============================================================
       * 5. 滚动条 / 选区
       * ============================================================ */
      #theme-editorial ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }
      #theme-editorial ::-webkit-scrollbar-thumb {
        background: rgba(0, 0, 0, 0.12);
        border-radius: 4px;
      }
      #theme-editorial ::-webkit-scrollbar-thumb:hover {
        background: rgba(0, 0, 0, 0.24);
      }
      #theme-editorial ::selection {
        background: var(--ed-accent-soft);
        color: var(--ed-text);
      }

      /* ============================================================
       * 6. 标签 chip —— 横向、单行
       * ============================================================ */
      #theme-editorial .ed-chip {
        display: inline-flex;
        align-items: center;
        white-space: nowrap;
        padding: 2px 10px;
        font-size: 11px;
        letter-spacing: 0.06em;
        color: var(--ed-text-soft);
        background: transparent;
        border: 1px solid var(--ed-rule);
        border-radius: 999px;
      }
      #theme-editorial .ed-chip:hover {
        color: var(--ed-accent);
        border-color: var(--ed-accent);
      }
      #theme-editorial .ed-chip-solid {
        background: var(--ed-text);
        color: var(--ed-bg);
        border-color: var(--ed-text);
      }

      /* 强兜底：line-clamp（部分 flex 子元素里 Tailwind 的 line-clamp 失效） */
      #theme-editorial .ed-clamp-1 {
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-word;
      }
      #theme-editorial .ed-clamp-2 {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-word;
      }
      #theme-editorial .ed-clamp-3 {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-word;
      }

      /* ============================================================
       * 7. 按钮
       * ============================================================ */
      #theme-editorial .ed-btn {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 8px 16px;
        border: 1px solid var(--ed-rule);
        background: var(--ed-surface);
        color: var(--ed-text);
        border-radius: var(--ed-radius);
        font-size: 13px;
        cursor: pointer;
        transition: all 180ms ease;
      }
      #theme-editorial .ed-btn:hover {
        color: var(--ed-accent);
        border-color: var(--ed-accent);
      }

      /* ============================================================
       * 8. Notion 容器
       * ============================================================ */
      #theme-editorial .notion {
        color: var(--ed-text);
        font-family: 'Noto Sans SC', -apple-system, sans-serif;
        font-weight: 300;
      }
      #theme-editorial .notion-page-content {
        max-width: 720px !important;
        margin: 0 auto !important;
      }
      #theme-editorial .notion h1,
      #theme-editorial .notion h2,
      #theme-editorial .notion h3 {
        font-family: 'Noto Serif SC', Georgia, serif !important;
        font-weight: 500 !important;
      }

      /* ============================================================
       * 9. 文章页 notion block 间距加大
       *  - 默认 react-notion-x 的间距偏紧，加宽段落、标题、列表
       * ============================================================ */
      #theme-editorial .notion .notion-page-content > .notion-page-content-inner {
        padding: 0;
      }

      #theme-editorial .notion p {
        margin-top: 1.2em !important;
        margin-bottom: 1.2em !important;
        line-height: 1.85 !important;
        font-size: 16px !important;
      }
      #theme-editorial .notion p:first-child {
        margin-top: 0 !important;
      }

      #theme-editorial .notion h1,
      #theme-editorial .notion h2,
      #theme-editorial .notion h3 {
        margin-top: 2.4em !important;
        margin-bottom: 0.8em !important;
        line-height: 1.3 !important;
        letter-spacing: -0.005em;
      }
      #theme-editorial .notion h1 {
        font-size: 30px !important;
      }
      #theme-editorial .notion h2 {
        font-size: 24px !important;
        padding-bottom: 0.3em;
        border-bottom: 1px solid var(--ed-rule-soft);
      }
      #theme-editorial .notion h3 {
        font-size: 20px !important;
      }

      /* list —— li 间距紧凑，相邻 li 之间不要额外留白 */
      #theme-editorial .notion ul,
      #theme-editorial .notion ol {
        margin-top: 1em !important;
        margin-bottom: 1em !important;
        padding-left: 1.6em !important;
      }
      #theme-editorial .notion li {
        margin-top: 0.15em !important;
        margin-bottom: 0.15em !important;
        line-height: 1.75 !important;
      }
      /* li 内部的 p 不再吃外层 p 的 1.2em margin，否则每个 li 段间距会爆炸 */
      #theme-editorial .notion li > p {
        margin: 0 !important;
      }
      #theme-editorial .notion li > p:first-child {
        margin-top: 0 !important;
      }
      #theme-editorial .notion li > p:last-child {
        margin-bottom: 0 !important;
      }

      /* 引用 —— 字号 ≤ 正文，加 1em 行高 1.7em */
      #theme-editorial .notion blockquote {
        margin: 1.4em 0 !important;
        padding: 0.6em 1em !important;
        border-left: 3px solid var(--ed-accent) !important;
        background: var(--ed-surface-soft);
        border-radius: 0 var(--ed-radius) var(--ed-radius) 0;
        color: var(--ed-text-soft);
        font-style: normal;
        font-size: 15px !important;
        line-height: 1.7 !important;
      }
      #theme-editorial .notion blockquote p {
        margin: 0.3em 0 !important;
        color: var(--ed-text-soft);
        font-size: 15px !important;
        line-height: 1.7 !important;
      }

      #theme-editorial .notion figure,
      #theme-editorial .notion .notion-image {
        margin: 2em 0 !important;
      }

      #theme-editorial .notion code {
        background: var(--ed-surface-soft) !important;
        color: var(--ed-accent) !important;
        padding: 0.1em 0.4em !important;
        border-radius: 4px !important;
        font-size: 0.9em !important;
        font-weight: 400 !important;
      }
      #theme-editorial .notion pre {
        margin: 1.6em 0 !important;
        padding: 1.2em 1.4em !important;
        background: var(--ed-surface-soft) !important;
        border: 1px solid var(--ed-rule) !important;
        border-radius: var(--ed-radius) !important;
      }
      #theme-editorial .notion pre code {
        background: transparent !important;
        color: var(--ed-text) !important;
        padding: 0 !important;
      }

      #theme-editorial .notion hr {
        margin: 3em 0 !important;
        border: none !important;
        border-top: 1px solid var(--ed-rule) !important;
      }

      #theme-editorial .notion .notion-callout {
        margin: 1.6em 0 !important;
        padding: 1em 1.2em !important;
        background: var(--ed-surface-soft) !important;
        border: 1px solid var(--ed-rule) !important;
        border-radius: var(--ed-radius) !important;
      }

      /* ============================================================
       * 9. Hero 标题
       * ============================================================ */
      @media (min-width: 1024px) {
        #theme-editorial .ed-hero-title {
          font-size: clamp(40px, 4.6vw, 64px);
          line-height: 1.05;
          letter-spacing: -0.02em;
        }
      }
      @media (min-width: 768px) and (max-width: 1023px) {
        #theme-editorial .ed-hero-title {
          font-size: 40px;
          line-height: 1.1;
          letter-spacing: -0.02em;
        }
      }
      @media (max-width: 767px) {
        #theme-editorial .ed-hero-title {
          font-size: 32px;
          line-height: 1.12;
          letter-spacing: -0.015em;
        }
      }

      /* ============================================================
       * 10. 数字
       * ============================================================ */
      #theme-editorial .ed-stat-num {
        font-variant-numeric: tabular-nums;
        font-feature-settings: 'tnum' 1, 'lnum' 1;
        letter-spacing: -0.02em;
      }

      /* ============================================================
       * 11. 头像
       * ============================================================ */
      #theme-editorial .ed-avatar {
        width: 64px;
        height: 64px;
        border-radius: 50%;
        border: 1px solid var(--ed-rule);
        object-fit: cover;
        background: var(--ed-surface-soft);
      }

      /* Hero 标题旁的头像：稍大，圆角方形（杂志感） */
      #theme-editorial .ed-hero-avatar {
        width: 64px;
        height: 64px;
        border-radius: 10px;
        border: 1px solid var(--ed-rule);
        object-fit: cover;
        background: var(--ed-surface-soft);
      }
      @media (min-width: 768px) {
        #theme-editorial .ed-hero-avatar {
          width: 80px;
          height: 80px;
        }
      }

      /* Hero 左侧的圆形头像（更大、更醒目） */
      #theme-editorial .ed-hero-avatar-circle {
        width: 72px;
        height: 72px;
        border-radius: 50%;
        border: 2px solid var(--ed-rule);
        object-fit: cover;
        background: var(--ed-surface-soft);
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
      }
      @media (min-width: 768px) {
        #theme-editorial .ed-hero-avatar-circle {
          width: 96px;
          height: 96px;
        }
      }

      /* ============================================================
       * 12. 公告滚动
       * ============================================================ */
      @keyframes ed-marquee {
        from { transform: translateX(0); }
        to { transform: translateX(-50%); }
      }
      #theme-editorial .ed-marquee {
        display: flex;
        white-space: nowrap;
        animation: ed-marquee 40s linear infinite;
      }
      #theme-editorial .ed-marquee-pause:hover {
        animation-play-state: paused;
      }
    `}</style>
  )
}

export { Style }

/* eslint-disable react/no-unknown-property */
import CONFIG from './config'
import { siteConfig } from '@/lib/config'
import { themeConsoleStyle } from '@/lib/themeConsoleStyle'
/**
 * 此处样式只对当前主题生效
 * 此处不支持tailwindCSS的 @apply 语法
 * @returns
 */
const Style = () => {
  return (
    <style jsx global>{`
      #theme-heo {
        --heo-color-primary: ${siteConfig('HEO_COLOR_PRIMARY', CONFIG.HEO_COLOR_PRIMARY, CONFIG)};
        --heo-color-primary-hover: ${siteConfig('HEO_COLOR_PRIMARY_HOVER', CONFIG.HEO_COLOR_PRIMARY_HOVER, CONFIG)};
        --heo-color-primary-text: ${siteConfig('HEO_COLOR_PRIMARY_TEXT', CONFIG.HEO_COLOR_PRIMARY_TEXT, CONFIG)};
        --heo-color-accent: ${siteConfig('HEO_COLOR_ACCENT', CONFIG.HEO_COLOR_ACCENT, CONFIG)};
        --heo-color-bg: ${siteConfig('HEO_COLOR_BG', CONFIG.HEO_COLOR_BG, CONFIG)};
        --heo-color-bg-dark: ${siteConfig('HEO_COLOR_BG_DARK', CONFIG.HEO_COLOR_BG_DARK, CONFIG)};
        --heo-color-card: ${siteConfig('HEO_COLOR_CARD', CONFIG.HEO_COLOR_CARD, CONFIG)};
        --heo-color-card-dark: ${siteConfig('HEO_COLOR_CARD_DARK', CONFIG.HEO_COLOR_CARD_DARK, CONFIG)};
        --heo-color-card-muted: ${siteConfig('HEO_COLOR_CARD_MUTED', CONFIG.HEO_COLOR_CARD_MUTED, CONFIG)};
        --heo-color-card-muted-dark: ${siteConfig('HEO_COLOR_CARD_MUTED_DARK', CONFIG.HEO_COLOR_CARD_MUTED_DARK, CONFIG)};
        --heo-color-border: ${siteConfig('HEO_COLOR_BORDER', CONFIG.HEO_COLOR_BORDER, CONFIG)};
        --heo-color-border-dark: ${siteConfig('HEO_COLOR_BORDER_DARK', CONFIG.HEO_COLOR_BORDER_DARK, CONFIG)};
        --heo-color-text-light: ${siteConfig('HEO_COLOR_TEXT', CONFIG.HEO_COLOR_TEXT, CONFIG)};
        --heo-color-text-secondary-light: ${siteConfig('HEO_COLOR_TEXT_SECONDARY', CONFIG.HEO_COLOR_TEXT_SECONDARY, CONFIG)};
        --heo-color-text-dark: ${siteConfig('HEO_COLOR_TEXT_DARK', CONFIG.HEO_COLOR_TEXT_DARK, CONFIG)};
        --heo-color-text-secondary-dark: ${siteConfig('HEO_COLOR_TEXT_SECONDARY_DARK', CONFIG.HEO_COLOR_TEXT_SECONDARY_DARK, CONFIG)};
        --heo-color-text: var(--heo-color-text-light);
        --heo-color-text-secondary: var(--heo-color-text-secondary-light);
        background-color: var(--heo-color-bg);
        color: var(--heo-color-text);
        font-family:
          -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC',
          'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
        -webkit-font-smoothing: antialiased;
      }

      .dark #theme-heo {
        --heo-color-card-muted: var(--heo-color-card-muted-dark);
        --heo-color-post-header: #35353c;
        --heo-color-text: var(--heo-color-text-dark);
        --heo-color-text-secondary: var(--heo-color-text-secondary-dark);
        background-color: var(--heo-color-bg-dark);
      }

      html:not(.dark) #theme-heo .bg-white {
        background-color: var(--heo-color-card);
      }

      .dark #theme-heo .dark\:bg-\[\#18171d\] {
        background-color: var(--heo-color-bg-dark);
      }

      .dark #theme-heo .dark\:bg-\[\#1e1e1e\] {
        background-color: var(--heo-color-card-dark);
      }

      #theme-heo .bg-\[\#4f65f0\] {
        background-color: var(--heo-color-primary);
      }

      #theme-heo .bg-\[\#f1f3f8\] {
        background-color: var(--heo-color-card-muted);
      }

      #theme-heo .bg-indigo-600,
      #theme-heo .hover\:bg-indigo-600:hover {
        background-color: var(--heo-color-primary-hover);
      }

      .dark #theme-heo .dark\:bg-yellow-600,
      .dark #theme-heo .dark\:hover\:bg-yellow-600:hover {
        background-color: var(--heo-color-accent);
      }

      #theme-heo .text-white {
        color: var(--heo-color-primary-text);
      }

      html:not(.dark) #theme-heo .text-black {
        color: var(--heo-color-text);
      }

      html:not(.dark) #theme-heo .text-gray-600 {
        color: var(--heo-color-text-secondary);
      }

      #theme-heo .hover\:text-indigo-600:hover,
      #theme-heo .group:hover .group-hover\:text-indigo-600 {
        color: var(--heo-color-primary-hover);
      }

      #theme-heo .hover\:border-indigo-600:hover {
        border-color: var(--heo-color-border);
      }

      .dark #theme-heo .dark\:hover\:border-yellow-600:hover {
        border-color: var(--heo-color-border-dark);
      }

      .dark #theme-heo #notion-article .notion-external-block,
      #theme-heo.dark #notion-article .notion-external-block {
        background: var(--heo-color-card-dark) !important;
        border-color: var(--heo-color-border-dark) !important;
      }

      .dark #theme-heo #notion-article .notion-external-title,
      #theme-heo.dark #notion-article .notion-external-title {
        color: var(--heo-color-text-dark) !important;
      }

      .dark #theme-heo #notion-article .notion-external-subtitle,
      .dark #theme-heo #notion-article .notion-external-block-desc,
      #theme-heo.dark #notion-article .notion-external-subtitle,
      #theme-heo.dark #notion-article .notion-external-block-desc {
        color: var(--heo-color-text-secondary-dark) !important;
      }

      body {
        background-color: ${siteConfig('HEO_COLOR_BG', CONFIG.HEO_COLOR_BG, CONFIG)};
      }

      html.dark body {
        background-color: ${siteConfig('HEO_COLOR_BG_DARK', CONFIG.HEO_COLOR_BG_DARK, CONFIG)};
      }

      /* 公告栏随信息卡使用浅色文字 */
      #theme-heo #announcement-content .notion {
        color: var(--heo-color-primary-text);
      }

      ::-webkit-scrollbar-thumb {
        background: rgba(60, 60, 67, 0.4);
        border-radius: 8px;
        cursor: pointer;
      }

      ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }

      #more {
        white-space: nowrap;
      }

      .today-card-cover {
        -webkit-mask-image: linear-gradient(to top, transparent 5%, black 70%);
        mask-image: linear-gradient(to top, transparent 5%, black 70%);
      }

      .recent-top-post-group::-webkit-scrollbar {
        display: none;
      }

      .scroll-hidden::-webkit-scrollbar {
        display: none;
      }

      * {
        box-sizing: border-box;
      }

      /* 标签滚动动画 */
      .tags-group-wrapper {
        animation: rowup 60s linear infinite;
      }

      @keyframes rowup {
        0% {
          transform: translateX(0%);
        }
        100% {
          transform: translateX(-50%);
        }
      }

      ${themeConsoleStyle('heo', CONFIG)}

      /* 控制台的基础色板优先，正文和中性表面也随明暗模式切换。 */
      .dark #theme-heo {
        --heo-color-text: var(--heo-color-text-dark);
        --heo-color-text-secondary: var(--heo-color-text-secondary-dark);
      }

      #theme-heo [class*='hover:border-[var(--heo-color-border)]']:hover {
        border-color: var(--heo-color-primary);
      }

      .dark
        #theme-heo
        [class*='hover:border-[var(--heo-color-border-dark)]']:hover {
        border-color: var(--heo-color-accent);
      }

      #theme-heo
        :where(a, button, input, textarea, select, [tabindex]):focus-visible {
        outline: 2px solid var(--heo-console-primary);
        outline-offset: 4px;
      }

      #theme-heo ::selection {
        background: var(--heo-color-primary);
        color: var(--heo-color-primary-text);
      }

      /* 动画尚未触发或主题切换改变位置时，内容仍应可见。 */
      #theme-heo .wow {
        visibility: visible !important;
      }

      #theme-heo .heo-profile-card {
        background: linear-gradient(
          145deg,
          var(--heo-color-primary-hover),
          var(--heo-color-primary)
        );
        border-color: var(--heo-color-primary-hover);
      }

      #theme-heo .heo-profile-card #announcement-content a {
        color: inherit;
      }

      #theme-heo .heo-post-card {
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.025);
      }

      #theme-heo .heo-post-card:hover {
        border-color: #b5b5bc;
        box-shadow: 0 8px 28px rgba(0, 0, 0, 0.055);
      }

      .dark #theme-heo .heo-post-card:hover {
        border-color: #636366;
        box-shadow: 0 8px 28px rgba(0, 0, 0, 0.2);
      }

      #theme-heo .heo-hero-category {
        border-radius: 14px;
        border: 1px solid rgba(29, 29, 31, 0.06);
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.4);
      }

      #theme-heo .heo-category-featured {
        background: #e2ebe5;
        color: #2f5547;
      }

      #theme-heo .heo-category-popular {
        background: #e0e9f5;
        color: #354f73;
      }

      #theme-heo .heo-category-technical {
        background: #e9e5f1;
        color: #58476b;
      }

      .dark #theme-heo .heo-hero-category {
        border-color: rgba(255, 255, 255, 0.12);
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06);
      }

      .dark #theme-heo .heo-category-featured {
        background: #344c43;
        color: #d9eee2;
      }

      .dark #theme-heo .heo-category-popular {
        background: #35465f;
        color: #dce8fc;
      }

      .dark #theme-heo .heo-category-technical {
        background: #494055;
        color: #ece1f7;
      }

      .dark #theme-heo .article {
        box-shadow: 0 12px 40px rgba(0, 0, 0, 0.16);
      }

      .dark #theme-heo #notion-article {
        --bg-color: var(--heo-color-card-dark);
        --bg-color-1: var(--heo-color-card-muted-dark);
        --fg-color: #e6e6eb;
        --fg-color-3: var(--heo-color-text-secondary-dark);
        color: var(--fg-color);
      }

      .dark #theme-heo #notion-article .notion {
        color: var(--fg-color);
      }

      .dark #theme-heo #notion-article .notion-code {
        background: #35353c !important;
        border: 1px solid var(--heo-color-border-dark);
      }

      .dark #theme-heo #notion-article .notion-callout {
        border-color: var(--heo-color-border-dark);
      }

      .dark #theme-heo #notion-article .notion-h {
        color: var(--heo-color-text-dark);
      }

      .dark #theme-heo #notion-article .notion-quote {
        border-color: #92929d;
      }

      #theme-heo .tags-group-icon {
        border: 1px solid rgba(0, 0, 0, 0.045);
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
      }

      #theme-heo :where(h1, h2, .font-extrabold) {
        letter-spacing: -0.025em;
        font-weight: 600;
      }

      #theme-heo .notion-link,
      #theme-heo .notion-link:hover,
      #theme-heo .tk-main a {
        color: inherit;
        opacity: 1;
      }

      #theme-heo input:focus {
        border-color: var(--heo-console-primary) !important;
        --tw-ring-color: var(--heo-console-primary) !important;
      }
    `}</style>
  )
}

export { Style }

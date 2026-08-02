/**
 * Editorial 主题全局样式
 * 杂志风：暖白底 / 墨黑字 / 陶土橙强调
 * 衬线大标题 + 思源黑体正文 + 大量留白
 */

export const Style = () => {
  return (
    <style jsx global>{`
      :root {
        --ed-bg: #FAF9F5;            /* 暖白底 */
        --ed-bg-soft: #F4F1E8;       /* 更暖一点，块级背景 */
        --ed-ink: #1A1A1A;            /* 墨黑 */
        --ed-ink-soft: #4A4A4A;       /* 次级文字 */
        --ed-ink-faint: #8B8680;      /* 弱化文字 */
        --ed-accent: #D97757;         /* 陶土橙 */
        --ed-accent-soft: rgba(217, 119, 87, 0.08);
        --ed-line: #E5E2DA;           /* 隐式分割线 */
        --ed-line-strong: #1A1A1A;    /* 强分割线 */

        --ed-font-serif: 'Source Serif Pro', 'Noto Serif SC', 'Songti SC', 'STSong', 'Times New Roman', serif;
        --ed-font-sans: -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Source Han Sans CN', 'Noto Sans SC', sans-serif;
        --ed-font-mono: 'JetBrains Mono', 'SF Mono', Menlo, Consolas, monospace;
      }

      /* ============== 全局排版 ============== */
      html, body {
        background: var(--ed-bg);
        color: var(--ed-ink);
        font-family: var(--ed-font-sans);
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-feature-settings: 'kern', 'liga';
      }

      body {
        font-size: 16px;
        line-height: 1.75;
        letter-spacing: 0.01em;
      }

      #theme-editorial {
        background: var(--ed-bg);
        color: var(--ed-ink);
      }

      /* 标题：中文用宋体（衬线），英文/数字用 Source Serif */
      #theme-editorial h1,
      #theme-editorial h2,
      #theme-editorial h3,
      #theme-editorial h4,
      #theme-editorial h5,
      #theme-editorial h6,
      #theme-editorial .ed-serif {
        font-family: var(--ed-font-serif);
        font-weight: 600;
        letter-spacing: -0.01em;
        color: var(--ed-ink);
      }

      /* 链接：陶土橙 */
      #theme-editorial a {
        color: var(--ed-accent);
        text-decoration: none;
        transition: color 200ms ease, border-color 200ms ease;
      }
      #theme-editorial a:hover {
        color: var(--ed-ink);
      }

      /* 数字一律用衬线体，强化杂志感 */
      #theme-editorial .ed-num,
      #theme-editorial .ed-tabular {
        font-family: var(--ed-font-serif);
        font-feature-settings: 'tnum';
        font-variant-numeric: tabular-nums;
      }

      /* ============== 通用容器 ============== */
      .ed-container {
        width: 100%;
        max-width: 1200px;
        margin-left: auto;
        margin-right: auto;
        /* 响应式 padding：移动端 20px 起步，桌面最多 40px，保持视觉节奏 */
        padding-left: clamp(20px, 4vw, 40px);
        padding-right: clamp(20px, 4vw, 40px);
      }

      .ed-container-narrow {
        max-width: 760px;
      }

      /* ============== 顶部导航 ============== */
      .ed-nav {
        height: 64px;
        background: var(--ed-bg);
        border-bottom: 1px solid var(--ed-line);
        position: sticky;
        top: 0;
        z-index: 50;
        backdrop-filter: blur(8px);
      }
      .ed-nav-inner {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 32px;
      }
      .ed-logo {
        font-family: var(--ed-font-serif);
        font-size: 20px;
        font-weight: 700;
        letter-spacing: 0.02em;
        color: var(--ed-ink);
        flex-shrink: 0;
      }
      /* Logo：文字默认黑，hover 才变橙；句号始终是橙
         用 #theme-editorial 提高优先级，避开 #theme-editorial a { color: accent } 的覆盖 */
      #theme-editorial .ed-logo a,
      #theme-editorial .ed-logo a:visited {
        color: var(--ed-ink);
        transition: color 200ms ease;
      }
      #theme-editorial .ed-logo a:hover { color: var(--ed-accent); }
      #theme-editorial .ed-logo a .ed-logo-dot,
      #theme-editorial .ed-logo a:hover .ed-logo-dot { color: var(--ed-accent); }

      .ed-menu {
        display: flex;
        align-items: center;
        gap: 4px;
        flex: 1;
        justify-content: center;
      }
      .ed-menu-item {
        position: relative;
        padding: 8px 14px;
        font-size: 14px;
        color: var(--ed-ink-soft);
        cursor: pointer;
        transition: color 200ms ease;
        user-select: none;
        display: inline-flex;
        align-items: center;
        gap: 6px;
      }
      /* 菜单项 link 也要盖掉全局 a 的橙色 */
      #theme-editorial a.ed-menu-item { color: var(--ed-ink-soft); }
      .ed-menu-item:hover,
      .ed-menu-item.is-active,
      #theme-editorial a.ed-menu-item:hover {
        color: var(--ed-accent);
      }
      .ed-menu-item .ed-menu-icon {
        font-size: 12px;
        opacity: 0.7;
      }
      .ed-submenu {
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%) translateY(4px);
        background: var(--ed-bg);
        border: 1px solid var(--ed-line);
        min-width: 180px;
        padding: 8px 0;
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
        transition: opacity 200ms ease, transform 200ms ease, visibility 200ms;
        z-index: 60;
      }
      .ed-menu-item:hover .ed-submenu {
        opacity: 1;
        visibility: visible;
        pointer-events: auto;
        transform: translateX(-50%) translateY(0);
      }
      .ed-submenu-item {
        display: block;
        padding: 8px 18px;
        font-size: 13px;
        color: var(--ed-ink-soft);
        white-space: nowrap;
        transition: color 200ms ease, background 200ms ease;
      }
      .ed-submenu-item:hover {
        color: var(--ed-accent);
        background: var(--ed-accent-soft);
      }
      .ed-submenu-item .ed-menu-icon {
        margin-right: 6px;
        opacity: 0.6;
      }

      .ed-nav-right {
        display: flex;
        align-items: center;
        gap: 4px;
        flex-shrink: 0;
      }
      .ed-search-btn {
        width: 40px;
        height: 40px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        color: var(--ed-ink-soft);
        transition: color 200ms ease, background 200ms ease;
        border-radius: 0;
      }
      .ed-search-btn:hover {
        color: var(--ed-accent);
      }

      /* ============== 公告条 ============== */
      .ed-notice {
        background: var(--ed-bg);
        overflow: hidden;
        /* 跟导航栏上边线对称：上下各一条细线，把公告条夹在中间 */
        border-bottom: 1px solid var(--ed-line);
      }
      .ed-notice-inner {
        height: 44px;
        display: flex;
        align-items: center;
        gap: 14px;
        font-size: 13px;
        color: var(--ed-ink-faint);
        letter-spacing: 0.02em;
      }
      .ed-notice-label {
        color: var(--ed-accent);
        font-weight: 600;
        flex-shrink: 0;
        text-transform: uppercase;
        font-size: 10px;
        letter-spacing: 0.18em;
        border: 1px solid var(--ed-line);
        background: transparent;
        padding: 3px 12px;
        border-radius: 999px;
        line-height: 1.4;
      }
      .ed-notice-track {
        flex: 1;
        overflow: hidden;
        position: relative;
        white-space: nowrap;
        mask-image: linear-gradient(90deg, transparent, #000 4%, #000 96%, transparent);
      }
      .ed-notice-track-inner {
        display: inline-block;
        animation: ed-marquee 24s linear infinite;
        padding-left: 100%;
      }
      .ed-notice-track-inner a { color: var(--ed-ink-faint); }
      .ed-notice-track-inner a:hover { color: var(--ed-accent); }
      .ed-notice-track-inner span { color: var(--ed-ink-faint); }
      /* 防止全局 a 颜色覆盖（带 url 的 notice 文案） */
      #theme-editorial .ed-notice-track-inner a { color: var(--ed-ink-faint); }
      #theme-editorial .ed-notice-track-inner a:hover { color: var(--ed-accent); }
      .ed-notice-item {
        display: inline-block;
        padding: 0 32px;
      }
      .ed-notice-divider {
        display: inline-block;
        color: var(--ed-ink-faint);
        opacity: 0.5;
        margin: 0 8px;
      }
      @keyframes ed-marquee {
        from { transform: translateX(0); }
        to { transform: translateX(-100%); }
      }

      /* ============== Hero ============== */
      .ed-hero {
        padding: 56px 0 48px;
      }
      .ed-hero-grid {
        display: grid;
        grid-template-columns: 6fr 4fr;
        gap: 56px;
        align-items: center;
      }
      @media (max-width: 900px) {
        .ed-hero-grid { grid-template-columns: 1fr; gap: 48px; }
        .ed-hero-right { border-left: none !important; padding-left: 0 !important; border-top: 1px solid var(--ed-line); padding-top: 40px; }
      }
      @media (max-width: 768px) {
        .ed-hero { padding: 48px 0 40px; }
      }
      .ed-hero-left {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
      }
      .ed-hero-avatar {
        width: 96px;
        height: 96px;
        border-radius: 50%;
        object-fit: cover;
        border: 1px solid var(--ed-line);
      }
      /* 问候：横线 + 文字 */
      .ed-hero-greet {
        margin-top: 24px;
        display: flex;
        align-items: center;
        gap: 12px;
        font-size: 12px;
        color: var(--ed-ink-faint);
        letter-spacing: 0.1em;
        text-transform: uppercase;
      }
      .ed-hero-greet-line {
        display: inline-block;
        width: 32px;
        height: 1px;
        background: var(--ed-ink);
      }
      .ed-hero-greet-text {
        font-family: var(--ed-font-sans);
      }
      .ed-hero-name {
        font-family: var(--ed-font-serif);
        font-size: 44px;
        font-weight: 700;
        line-height: 1.15;
        margin: 14px 0 0;
        letter-spacing: -0.02em;
      }
      .ed-hero-intro {
        font-size: 15px;
        line-height: 1.85;
        color: var(--ed-ink-soft);
        margin-top: 18px;
        max-width: 460px;
      }

      .ed-hero-right {
        display: flex;
        flex-direction: column;
        gap: 28px;
        border-left: 1px solid var(--ed-line);
        padding-left: 40px;
      }
      .ed-section-label {
        font-size: 11px;
        color: var(--ed-ink-faint);
        letter-spacing: 0.15em;
        text-transform: uppercase;
        font-weight: 600;
        margin-bottom: 16px;
      }
      .ed-channel-list {
        display: flex;
        flex-direction: column;
        gap: 14px;
      }
      .ed-channel {
        display: grid;
        grid-template-columns: 22px 1fr auto;
        align-items: center;
        gap: 12px;
        font-size: 14px;
        color: var(--ed-ink-soft);
        transition: color 200ms ease;
        /* 渠道色：每条 channel 可独立设置 --ed-row-hover；
           没设置时 fallback 到品牌橙 */
        --ed-row-hover: var(--ed-accent);
      }
      .ed-channel.is-link { cursor: pointer; }
      /* 所有 channel 都参与 hover 高亮（不只是 link），
         图标 + 名字 + 数字 全部变渠道色（默认橙） */
      .ed-channel:hover,
      .ed-channel:hover .ed-channel-num,
      .ed-channel:hover .ed-channel-name,
      .ed-channel:hover .ed-channel-icon { color: var(--ed-row-hover); }
      /* 链接的 channel 文本默认 ink-soft，hover 变渠道色 */
      #theme-editorial a.ed-channel,
      #theme-editorial a.ed-channel:visited { color: var(--ed-ink-soft); }
      #theme-editorial a.ed-channel:hover,
      #theme-editorial a.ed-channel:hover .ed-channel-num,
      #theme-editorial a.ed-channel:hover .ed-channel-icon { color: var(--ed-row-hover); }
      .ed-channel-icon {
        font-size: 16px;
        color: var(--ed-ink);
      }
      .ed-channel-meta {
        display: inline-flex;
        align-items: baseline;
        gap: 6px;
        white-space: nowrap;
      }
      .ed-channel-num {
        font-family: var(--ed-font-serif);
        font-size: 16px;
        font-weight: 600;
        color: var(--ed-ink);
        font-variant-numeric: tabular-nums;
      }
      .ed-channel-label {
        font-size: 11px;
        color: var(--ed-ink-faint);
        letter-spacing: 0.05em;
      }

      .ed-social-list {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      .ed-social {
        display: grid;
        grid-template-columns: 22px 1fr auto;
        align-items: center;
        gap: 12px;
        font-size: 14px;
        color: var(--ed-ink-soft);
        padding: 2px 0;
        /* 渠道色：每条 social 可独立设置 --ed-row-hover；
           没设置时 fallback 到品牌橙 */
        --ed-row-hover: var(--ed-accent);
      }
      .ed-social.is-link,
      .ed-social.is-copy {
        cursor: pointer;
        transition: color 200ms ease;
      }
      /* hover 高亮：name + icon + arrow/text 全部变渠道色（默认橙）。
         兼容 is-link（点击跳转）和 is-copy（点击复制）两种交互 */
      .ed-social.is-link:hover,
      .ed-social.is-link:hover .ed-social-name,
      .ed-social.is-link:hover .ed-social-icon,
      .ed-social.is-link:hover .ed-social-icon-svg,
      .ed-social.is-link:hover .ed-social-icon-img,
      .ed-social.is-copy:hover,
      .ed-social.is-copy:hover .ed-social-name,
      .ed-social.is-copy:hover .ed-social-icon,
      .ed-social.is-copy:hover .ed-social-icon-svg,
      .ed-social.is-copy:hover .ed-social-icon-img,
      .ed-social.is-copy:hover .ed-social-text,
      .ed-social.is-copy:hover .ed-social-copy { color: var(--ed-row-hover); }
      .ed-social.is-link:hover .ed-social-arrow {
        color: var(--ed-row-hover);
        transform: translateX(2px);
      }
      .ed-social.is-copy:hover .ed-social-copy { transform: scale(1.1); }
      /* 复制成功的瞬时反馈：颜色继续高亮 + 字样切到"已复制 ✓" */
      .ed-social.is-copied,
      .ed-social.is-copied .ed-social-name,
      .ed-social.is-copied .ed-social-icon,
      .ed-social.is-copied .ed-social-icon-svg,
      .ed-social.is-copied .ed-social-icon-img { color: var(--ed-row-hover); }
      /* 链接的 social 默认 ink-soft，hover 变渠道色 */
      #theme-editorial a.ed-social,
      #theme-editorial a.ed-social:visited { color: var(--ed-ink-soft); }
      #theme-editorial a.ed-social:hover,
      #theme-editorial a.ed-social:hover .ed-social-name { color: var(--ed-row-hover); }
      .ed-social-icon {
        width: 18px;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        font-size: 15px;
        color: var(--ed-ink);
      }
      .ed-social-icon-svg {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 20px;
        height: 20px;
        color: var(--ed-ink);
      }
      /* img 类型 icon（如即即刻的 PNG 抠图） */
      .ed-social-icon-img {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 18px;
        height: 18px;
        line-height: 0;
      }
      .ed-social-icon-img img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        display: block;
      }
      .ed-social-name {
        color: var(--ed-ink);
        font-weight: 500;
      }
      .ed-social-meta {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        white-space: nowrap;
      }
      .ed-social-text {
        color: var(--ed-ink-faint);
        font-size: 13px;
      }
      /* 复制按钮：默认隐藏，hover 时淡入并变渠道色。
         平时只有文字 + 极弱的"鼠标移上去才显示复制图标"，
         保持社交区的克制感 */
      .ed-social-copy {
        font-size: 11px;
        color: var(--ed-ink-faint);
        opacity: 0;
        margin-left: 2px;
        transition: opacity 200ms ease, color 200ms ease, transform 200ms ease;
      }
      .ed-social.is-copy:hover .ed-social-copy { opacity: 1; }
      /* 复制成功的反馈：占满 meta 区域，1.4s 后自动消失 */
      .ed-social-copied {
        font-size: 12px;
        color: var(--ed-row-hover);
        font-weight: 500;
        font-variant-numeric: tabular-nums;
      }
      .ed-social-arrow {
        color: var(--ed-ink-faint);
        font-size: 11px;
        transition: color 200ms ease, transform 200ms ease;
      }

      /* ============== 区块分割 ============== */
      .ed-divider {
        height: 1px;
        background: var(--ed-line);
        border: 0;
        margin: 0;
      }
      /* 复古典雅分割线：左半细线 + 中心小方块（45° 旋转）+ 右半细线
         上下各 28px 留白（之前 56px 太宽，让 LATEST 跟分隔线离太远） */
      .ed-divider-ornate-wrap {
        margin-top: 28px;
        margin-bottom: 28px;
      }
      .ed-divider-ornate {
        display: flex;
        align-items: center;
        gap: 16px;
      }
      .ed-divider-line {
        flex: 1;
        height: 1px;
        background: var(--ed-line);
        opacity: 0.6;
      }
      .ed-divider-diamond {
        width: 5px;
        height: 5px;
        background: var(--ed-ink);
        transform: rotate(45deg);
        opacity: 0.4;
        flex-shrink: 0;
      }

      /* 列表 section header（LATEST·最新 / 最近的文章） */
      .ed-list-section-header {
        /* LATEST 跟第一个 post 之间留出明显的呼吸空间（之前 32px 太挤） */
        margin-bottom: 48px;
      }
      .ed-list-section-eyebrow {
        font-size: 11px;
        color: var(--ed-ink-faint);
        letter-spacing: 0.18em;
        text-transform: uppercase;
        font-weight: 600;
        margin-bottom: 8px;
      }
      .ed-list-section-title {
        font-family: var(--ed-font-serif);
        font-size: 28px;
        font-weight: 700;
        line-height: 1.25;
        letter-spacing: -0.01em;
        color: var(--ed-ink);
        margin: 0;
      }
      .ed-divider.is-faint {
        background: var(--ed-line);
        opacity: 0.5;
      }

      /* ============== 我的项目（Hero 下方三个卡片） ==============
         左右结构：左 120×120 缩略图，右 4 行内容
         整张卡 ~130px 高，把第一屏留给文章列表开头 */
      .ed-projects {
        padding: 36px 0 48px;
      }
      .ed-projects-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 28px;
      }
      @media (max-width: 900px) {
        .ed-projects-grid {
          grid-template-columns: 1fr;
          gap: 18px;
        }
        /* 移动端：cover + body 改成上下堆叠（跟文章列表 Latest 一致），
           否则 body 文字会从 cover 右边开始，跟 Latest 的"最近的文章"
           标题左边界对不齐 */
        .ed-project-card {
          flex-direction: column;
        }
        .ed-project-cover {
          width: 100%;
          height: auto;
          aspect-ratio: 16 / 9;
        }
      }
      .ed-project-card {
        display: flex;
        flex-direction: row;
        align-items: stretch;
        gap: 18px;
        padding: 0 0 16px;
        border-bottom: 1px solid var(--ed-line);
        text-decoration: none;
        color: inherit;
        transition: border-color 200ms ease;
        min-height: 128px;
      }
      .ed-project-card,
      #theme-editorial a.ed-project-card,
      #theme-editorial a.ed-project-card:visited {
        color: var(--ed-ink);
      }
      .ed-project-card:hover {
        border-bottom-color: var(--ed-accent);
      }
      .ed-project-cover {
        flex-shrink: 0;
        width: 120px;
        height: 120px;
        overflow: hidden;
        background: var(--ed-bg-soft);
        position: relative;
      }
      .ed-project-cover img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 600ms cubic-bezier(0.2, 0.7, 0.2, 1);
      }
      .ed-project-card:hover .ed-project-cover img {
        transform: scale(1.06);
      }
      .ed-project-body {
        flex: 1;
        min-width: 0;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 2px 0;
      }
      .ed-project-body-top {
        display: flex;
        flex-direction: column;
      }
      .ed-project-type {
        font-size: 10px;
        color: var(--ed-ink-faint);
        text-transform: uppercase;
        letter-spacing: 0.18em;
        font-weight: 600;
        line-height: 1.4;
        margin-bottom: 4px;
      }
      .ed-project-name {
        font-family: var(--ed-font-serif);
        font-size: 18px;
        font-weight: 600;
        color: var(--ed-ink);
        margin: 0;
        line-height: 1.3;
        letter-spacing: -0.005em;
        transition: color 200ms ease;
      }
      /* 用 #theme-editorial 提高 specificity，避开 #theme-editorial a:hover 的覆盖 */
      #theme-editorial a.ed-project-card:hover .ed-project-name,
      .ed-project-card:hover .ed-project-name {
        color: var(--ed-accent);
      }
      .ed-project-desc {
        font-size: 12.5px;
        line-height: 1.55;
        color: var(--ed-ink-soft);
        margin: 4px 0 0;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      .ed-project-arrow {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        font-size: 11px;
        color: var(--ed-ink-faint);
        margin-top: 6px;
        letter-spacing: 0.05em;
        transition: color 200ms ease, gap 200ms ease;
        align-self: flex-end;
      }
      .ed-project-card:hover .ed-project-arrow {
        color: var(--ed-accent);
        gap: 10px;
      }
      .ed-project-arrow i {
        font-size: 9px;
      }

      .ed-section {
        /* 只设上下 padding，**不要覆盖左右 padding**！
           .ed-section 经常跟 .ed-container 一起用（如 <div className="ed-container ed-section">），
           如果用 padding shorthand 会把 .ed-container 的 padding-left/right 清零，
           导致内容贴到 viewport 边，跟 hero / projects（容器在内部 div、padding 正常）水平方向不对齐 */
        padding-top: 96px;
        padding-bottom: 64px;
      }
      /* 移动端额外微调：让顶部 80px、底部 48px，比桌面紧凑一丢丢 */
      @media (max-width: 900px) {
        .ed-section {
          padding-top: 80px;
          padding-bottom: 48px;
        }
      }
      .ed-section-tight {
        padding-top: 40px;
        padding-bottom: 64px;
      }
      .ed-section-header {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        margin-bottom: 36px;
        border-bottom: 1px solid var(--ed-line);
        padding-bottom: 16px;
      }
      .ed-section-title {
        font-family: var(--ed-font-serif);
        font-size: 22px;
        font-weight: 600;
        letter-spacing: -0.005em;
      }
      .ed-section-sub {
        font-size: 12px;
        color: var(--ed-ink-faint);
        letter-spacing: 0.05em;
      }

      /* ============== 文章列表 ============== */
      /* 列表跟 hero / projects 一样吃满 .ed-container 宽度，
         不再额外 max-width 限制（之前 880px 反而让右边缩进，与上方不齐） */
      .ed-posts {
        display: flex;
        flex-direction: column;
        gap: 0;
        width: 100%;
      }
      .ed-post {
        display: grid;
        grid-template-columns: 360px minmax(0, 1fr);
        gap: 36px;
        padding: 28px 0;
        border-bottom: 1px solid var(--ed-line);
        /* 改 21:9 细长封面：cover 顶部对齐 body 顶部，cover 高度固定 154px，
           不要再 stretch（stretch 会把 21:9 拉成正方形，越改越方）。
           放弃严格的"cover 底部对齐 tags 底部"——21:9 细长 vs body 高度
           本来就对不齐，强行对齐只会让 cover 失真 */
        align-items: start;
      }
      .ed-post:first-child { padding-top: 8px; }
      /* 封面链接：显式 block */
      .ed-post-cover-wrap {
        display: block;
        line-height: 0;
        overflow: hidden;
        align-self: start;
      }
      .ed-post-cover {
        position: relative;
        width: 100%;
        /* 21:9 细长比例：320 × 9/21 ≈ 137px。
           用 aspect-ratio 固定比例，image 用 object-fit: cover 居中显示，
           原图比例不一致时上下会留白边但不会变形 */
        aspect-ratio: 21 / 9;
        overflow: hidden;
        background: var(--ed-bg-soft);
      }
      .ed-post-cover img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
        transition: transform 600ms cubic-bezier(0.2, 0.7, 0.2, 1);
      }
      .ed-post:hover .ed-post-cover img {
        transform: scale(1.03);
      }
      /* 移动端：图片在上，文字在下。
         关键：只设 padding-top / padding-bottom，**不要设 left/right**！
         container 已经有 20px 左右 padding，post 再加 16px 会导致 cover 跟
         LATEST 标题的 left 错位 16px（LATEST 标题 left=20px，cover left=36px） */
      @media (max-width: 900px) {
        .ed-post {
          grid-template-columns: 1fr;
          gap: 18px;
          padding-top: 24px;
          padding-bottom: 24px;
          align-items: start;
        }
        .ed-post:first-child { padding-top: 8px; }
        .ed-post-cover {
          /* 移动端也保持 21:9 细长比例 */
          aspect-ratio: 21 / 9;
        }
        .ed-post-cover-wrap { align-self: start; }
      }
      .ed-post-body {
        display: flex;
        flex-direction: column;
        gap: 10px;
        /* 关键：grid item 默认 min-width: auto = min-content，
           长 summary 会把 1fr 列撑成 min-content。
           显式 0 让 body 真的只占 1fr 列，文字才能用满右侧空间 */
        min-width: 0;
        /* 不再加 max-width，让文字自然占满 1fr 列；
           用户明确说"右边空着不对，明明有空间" */
      }
      .ed-post-meta {
        display: flex;
        align-items: center;
        gap: 12px;
        font-size: 12px;
        color: var(--ed-ink-faint);
        letter-spacing: 0.04em;
      }
      .ed-post-meta .ed-post-date {
        font-family: var(--ed-font-serif);
        font-variant-numeric: tabular-nums;
      }
      .ed-post-category {
        color: var(--ed-accent);
        text-transform: uppercase;
        letter-spacing: 0.1em;
        font-weight: 600;
        font-size: 11px;
      }
      .ed-post-title {
        font-family: var(--ed-font-serif);
        font-size: 24px;
        font-weight: 600;
        line-height: 1.3;
        margin: 0;
        color: var(--ed-ink);
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
        transition: color 200ms ease;
      }
      .ed-post:hover .ed-post-title {
        color: var(--ed-accent);
      }
      .ed-post-summary {
        font-size: 14px;
        line-height: 1.75;
        color: var(--ed-ink-soft);
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        margin: 0;
        /* 中文段落默认是 word-break: normal（任意字符处可断），
           所以"也才能"会被拆成"也才 / 能"。
           改成 keep-all：中文只在空格/标点处断行，行宽够时整段不换行，
           不够时按标点自然断 */
        word-break: keep-all;
        overflow-wrap: break-word;
      }
      .ed-post-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        margin-top: 4px;
      }
      .ed-tag {
        display: inline-flex;
        align-items: center;
        padding: 2px 2px;
        font-size: 12px;
        color: var(--ed-ink-faint);
        background: transparent;
        border: 0;
        transition: color 200ms ease;
        cursor: pointer;
        line-height: 1.6;
        /* 标签之间用 · 隔开 */
      }
      .ed-tag + .ed-tag::before {
        content: '·';
        margin: 0 6px;
        color: var(--ed-ink-faint);
        opacity: 0.5;
      }
      .ed-tag:hover {
        color: var(--ed-accent);
      }

      /* ============== 翻页 ============== */
      .ed-pagination {
        display: flex;
        align-items: center;
        justify-content: space-between;
        /* 跟最后 article 拉距离 + 跟 footer 拉距离（之前只有 margin-top，看着贴底） */
        margin-top: 56px;
        margin-bottom: 40px;
        gap: 16px;
      }
      .ed-pagination-pages {
        display: flex;
        align-items: center;
        gap: 6px;
        flex-wrap: wrap;
      }
      .ed-page {
        min-width: 36px;
        height: 36px;
        padding: 0 12px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        color: var(--ed-ink-soft);
        border: 1px solid var(--ed-line);
        background: var(--ed-bg);
        transition: all 200ms ease;
        cursor: pointer;
        font-variant-numeric: tabular-nums;
      }
      .ed-page:hover {
        color: var(--ed-ink);
        border-color: var(--ed-ink);
      }
      .ed-page.is-active,
      #theme-editorial a.ed-page.is-active,
      #theme-editorial a.ed-page.is-active:visited {
        color: var(--ed-bg);
        background: var(--ed-accent);
        border-color: var(--ed-accent);
      }
      .ed-page.is-active:hover,
      #theme-editorial a.ed-page.is-active:hover {
        color: var(--ed-bg);
        background: var(--ed-accent);
        border-color: var(--ed-accent);
      }
      .ed-page.is-disabled {
        color: var(--ed-ink-faint);
        cursor: not-allowed;
        opacity: 0.4;
      }
      .ed-page.is-disabled:hover {
        color: var(--ed-ink-faint);
        border-color: var(--ed-line);
      }
      .ed-page-arrow {
        display: inline-flex;
        align-items: center;
        gap: 6px;
      }
      .ed-page-dots {
        color: var(--ed-ink-faint);
        padding: 0 6px;
      }

      /* ============== 文章详情 ============== */
      .ed-article-wrap {
        display: grid;
        grid-template-columns: minmax(0, 720px) 280px;
        gap: 96px;
        /* 不写 align-items，让侧栏默认 stretch 跟文章同高，
           这样右侧的 TOC 才可以一路 sticky 到底 */
        justify-content: center;
        padding: 64px 24px 96px;
      }
      @media (max-width: 1100px) {
        .ed-article-wrap {
          grid-template-columns: 1fr;
          gap: 48px;
        }
        .ed-article-side {
          position: static !important;
          max-height: none !important;
        }
      }
      .ed-article {
        max-width: 720px;
        width: 100%;
      }
      .ed-article-title {
        font-family: var(--ed-font-serif);
        font-size: 38px;
        line-height: 1.25;
        font-weight: 700;
        letter-spacing: -0.015em;
        margin: 0 0 16px;
      }
      @media (max-width: 768px) {
        .ed-article-title { font-size: 30px; }
      }
      .ed-article-meta {
        font-size: 13px;
        color: var(--ed-ink-faint);
        margin-bottom: 48px;
        letter-spacing: 0.03em;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 16px;
      }
      .ed-article-meta .ed-meta-num {
        font-family: var(--ed-font-serif);
        font-variant-numeric: tabular-nums;
      }
      .ed-article-cover {
        margin: 0 0 48px;
        aspect-ratio: 16 / 9;
        overflow: hidden;
        background: var(--ed-bg-soft);
      }
      .ed-article-cover img {
        width: 100%; height: 100%; object-fit: cover;
      }

      .ed-article-body {
        font-size: 17px;
        line-height: 1.9;
        color: var(--ed-ink);
        letter-spacing: 0.01em;
      }

      /* Notion 内容排版接管 */
      .ed-article-body p {
        margin: 0 0 1.4em;
      }
      .ed-article-body h1,
      .ed-article-body h2,
      .ed-article-body h3 {
        font-family: var(--ed-font-serif);
        font-weight: 600;
        margin: 2em 0 0.8em;
        letter-spacing: -0.01em;
        scroll-margin-top: 96px;
      }
      .ed-article-body h1 { font-size: 1.8em; }
      .ed-article-body h2 {
        font-size: 1.5em;
        padding-bottom: 0.3em;
        border-bottom: 1px solid var(--ed-line);
      }
      .ed-article-body h3 { font-size: 1.2em; }
      .ed-article-body blockquote,
      #notion-article blockquote.notion-quote,
      .notion-quote {
        margin: 1.6em 0;
        padding: 0.5em 1.4em;
        background: transparent !important;
        background-color: transparent !important;
        border: 0;
        border-left: 3px solid var(--ed-accent);
        color: var(--ed-ink-soft);
        font-size: 0.95em;
        line-height: 1.85;
        font-family: var(--ed-font-sans);
        font-style: normal;
      }
      .ed-article-body blockquote p,
      #notion-article blockquote.notion-quote p,
      .notion-quote p {
        margin: 0;
        font-size: inherit;
      }
      .ed-article-body code {
        font-family: var(--ed-font-mono);
        font-size: 0.88em;
        background: var(--ed-bg-soft);
        padding: 0.15em 0.45em;
        color: var(--ed-ink);
      }
      .ed-article-body pre {
        background: var(--ed-bg-soft);
        padding: 1.2em 1.4em;
        overflow-x: auto;
        font-size: 0.85em;
        line-height: 1.7;
        margin: 1.6em 0;
        border: 1px solid var(--ed-line);
      }
      .ed-article-body pre code {
        background: transparent;
        padding: 0;
      }
      .ed-article-body ul,
      .ed-article-body ol {
        margin: 1em 0;
        padding-left: 1.6em;
      }
      .ed-article-body li {
        margin: 0.3em 0;
      }
      .ed-article-body hr {
        border: 0;
        border-top: 1px solid var(--ed-line);
        margin: 2.5em 0;
      }
      .ed-article-body img {
        max-width: 100%;
        margin: 1.5em auto;
        display: block;
      }
      .ed-article-body a {
        border-bottom: 1px solid var(--ed-accent-soft);
        padding-bottom: 1px;
      }
      .ed-article-body a:hover {
        border-bottom-color: var(--ed-accent);
      }

      /* ============== 文章侧栏 ============== */
      /* 侧栏外层不 sticky，让上方文章信息可以随文章被划走 */
      .ed-article-side {
        width: 280px;
      }
      /* 目录容器自身 sticky：跟随侧栏一起到达顶部后吸附 */
      .ed-toc-sticky-wrap {
        position: sticky;
        top: 96px;
        margin-top: 40px;
        padding-top: 40px;
        border-top: 1px solid var(--ed-line);
      }
      .ed-side-block + .ed-side-block {
        margin-top: 40px;
        padding-top: 40px;
        border-top: 1px solid var(--ed-line);
      }
      .ed-side-block-title {
        font-size: 11px;
        color: var(--ed-ink-faint);
        text-transform: uppercase;
        letter-spacing: 0.15em;
        font-weight: 600;
        margin-bottom: 16px;
      }

      /* 文章信息：图标 + 中文 label + value 的杂志感条目 */
      .ed-side-info {
        display: flex;
        flex-direction: column;
      }
      .ed-side-info-row {
        display: flex;
        align-items: flex-start;
        gap: 12px;
        padding: 10px 0;
      }
      /* 各行之间不画横线，让信息更透气 */
      .ed-side-info-row + .ed-side-info-row {
        border-top: 0;
      }
      .ed-side-info-icon {
        flex-shrink: 0;
        width: 18px;
        text-align: center;
        color: var(--ed-ink-faint);
        font-size: 14px;
        margin-top: 2px;
      }
      .ed-side-info-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 3px;
        min-width: 0;
      }
      .ed-side-info-label {
        font-size: 10.5px;
        color: var(--ed-ink-faint);
        text-transform: uppercase;
        letter-spacing: 0.18em;
        font-weight: 500;
        line-height: 1.4;
      }
      .ed-side-info-value {
        font-family: var(--ed-font-serif);
        font-size: 14px;
        color: var(--ed-ink);
        font-weight: 500;
        line-height: 1.4;
        word-break: break-word;
      }
      /* 分类 / 标签的链接：默认黑色，hover 才变橙（之前默认就是 accent，反客为主了） */
      .ed-side-info-value a,
      #theme-editorial .ed-side-info-value a,
      #theme-editorial .ed-side-info-value a:visited {
        color: var(--ed-ink);
        border-bottom: 0;
        transition: color 200ms ease;
      }
      .ed-side-info-value a:hover,
      #theme-editorial .ed-side-info-value a:hover {
        color: var(--ed-accent);
      }
      .ed-side-info-value .ed-side-info-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 4px 8px;
        margin-top: 2px;
      }
      .ed-side-info-value .ed-side-info-tags .ed-tag {
        padding: 0;
        font-size: 13px;
        color: var(--ed-ink-faint);
        border-bottom: 0;
      }
      .ed-side-info-value .ed-side-info-tags .ed-tag:hover {
        color: var(--ed-accent);
      }
      .ed-side-info-value .ed-side-info-tags .ed-tag + .ed-tag::before {
        content: '·';
        margin: 0 6px;
        opacity: 0.5;
      }
      /* 复制链接：虚线下划线，不加粗 */
      .ed-side-info-copy-link {
        font-family: var(--ed-font-serif);
        font-size: 14px;
        font-weight: 400;
        color: var(--ed-ink);
        cursor: pointer;
        user-select: none;
        border-bottom: 1px dashed var(--ed-ink-faint);
        padding-bottom: 1px;
        transition: color 200ms ease, border-color 200ms ease;
      }
      .ed-side-info-copy-link:hover {
        color: var(--ed-accent);
        border-bottom-color: var(--ed-accent);
      }
      .ed-side-info-share {
        display: flex;
        gap: 6px;
        margin-top: 4px;
      }
      .ed-side-info-share .ed-side-share-btn {
        width: 30px;
        height: 30px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border: 1px solid var(--ed-line);
        color: var(--ed-ink-soft);
        font-size: 13px;
        transition: all 200ms ease;
        cursor: pointer;
      }
      .ed-side-info-share .ed-side-share-btn:hover {
        color: var(--ed-accent);
        border-color: var(--ed-accent);
      }
      .ed-side-info-copy {
        font-size: 11px;
        color: var(--ed-ink-faint);
        margin-top: 6px;
        line-height: 1.6;
        letter-spacing: 0.05em;
      }
      .ed-side-info-copy.is-copied {
        color: var(--ed-accent);
      }

      /* 旧版 side-list 兼容保留（其它地方可能引用） */
      .ed-side-list {
        display: flex;
        flex-direction: column;
        gap: 10px;
        font-size: 13px;
        color: var(--ed-ink-soft);
        line-height: 1.7;
      }
      .ed-side-list-row {
        display: flex;
        align-items: baseline;
        gap: 6px;
      }
      .ed-side-list-row .ed-side-key {
        color: var(--ed-ink-faint);
        flex-shrink: 0;
        width: 4em;
        font-size: 12px;
        letter-spacing: 0.05em;
      }
      .ed-side-list-row .ed-side-val {
        color: var(--ed-ink);
        font-family: var(--ed-font-serif);
        font-variant-numeric: tabular-nums;
      }
      .ed-side-list-row .ed-side-val a {
        color: var(--ed-ink);
        border-bottom: 1px solid var(--ed-line);
      }
      .ed-side-list-row .ed-side-val a:hover {
        color: var(--ed-accent);
        border-bottom-color: var(--ed-accent);
      }
      .ed-side-tags {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0;
        margin-top: 4px;
        font-size: 13px;
        color: var(--ed-ink-faint);
      }
      .ed-side-tags .ed-tag {
        padding: 0;
        font-size: 13px;
        color: var(--ed-ink-faint);
      }
      .ed-side-tags .ed-tag + .ed-tag::before {
        content: '·';
        margin: 0 6px;
        color: var(--ed-ink-faint);
        opacity: 0.5;
      }

      .ed-toc {
        list-style: none;
        padding: 0;
        margin: 0;
        font-size: 13px;
        line-height: 1.7;
      }
      .ed-toc-item {
        display: block;
        padding: 4px 0;
        color: var(--ed-ink-faint);
        border-left: 2px solid transparent;
        padding-left: 12px;
        margin-left: -14px;
        transition: color 200ms ease, border-color 200ms ease;
        cursor: pointer;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .ed-toc-item:hover {
        color: var(--ed-ink);
      }
      .ed-toc-item.is-active {
        color: var(--ed-accent);
        border-left-color: var(--ed-accent);
        font-weight: 600;
      }
      .ed-toc-item.is-l1 { padding-left: 12px; font-weight: 600; }
      .ed-toc-item.is-l2 { padding-left: 24px; }
      .ed-toc-item.is-l3 { padding-left: 36px; font-size: 12px; }

      /* ============== 页脚 ============== */
      .ed-footer {
        border-top: 1px solid var(--ed-line);
        padding: 56px 0 40px;
        margin-top: 80px;
        font-size: 13px;
        color: var(--ed-ink-faint);
      }
      .ed-footer-inner {
        display: flex;
        flex-direction: column;
        gap: 12px;
        align-items: center;
        text-align: center;
      }
      .ed-footer-row {
        display: flex;
        align-items: center;
        gap: 16px;
        flex-wrap: wrap;
        justify-content: center;
      }
      .ed-footer-divider {
        color: var(--ed-ink-faint);
        opacity: 0.5;
      }
      .ed-footer a {
        color: var(--ed-ink-soft);
      }
      .ed-footer a:hover {
        color: var(--ed-accent);
      }
      .ed-footer-rss {
        display: inline-flex;
        align-items: center;
        gap: 6px;
      }

      /* ============== Notion 内容接管：与杂志感一致 ============== */
      #notion-article {
        font-family: var(--ed-font-sans);
      }
      #notion-article .notion-h {
        font-family: var(--ed-font-serif);
      }

      /* 调整 code 块不喧宾夺主 */
      #notion-article pre {
        font-family: var(--ed-font-mono) !important;
      }

      /* 列表项间距紧凑：跟正文段落间隙一致（1.4em），
         单项 li 自己只贡献 line-height，不另加 margin */
      #notion-article ul.notion-list,
      #notion-article ol.notion-list,
      .notion-list {
        margin: 0.4em 0 !important;
        padding-inline-start: 1.5em;
      }
      #notion-article ul.notion-list li,
      #notion-article ol.notion-list li,
      .notion-list li {
        padding: 0 !important;
        margin: 0 !important;
        line-height: 1.9;
      }
      /* 列表的子项不要重复加 padding */
      #notion-article .notion-list-children {
        margin: 0 !important;
        padding-left: 1.4em !important;
      }

      /* Notion 引用 */
      #notion-article blockquote {
        font-size: 1em !important;
        font-family: var(--ed-font-sans) !important;
        background: transparent !important;
      }

      /* 文章结尾 */
      .ed-article-foot {
        margin-top: 64px;
        padding-top: 32px;
        border-top: 1px solid var(--ed-line);
        font-size: 13px;
        color: var(--ed-ink-faint);
        line-height: 1.8;
      }
      .ed-article-adjacent {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 24px;
        margin-top: 32px;
      }
      @media (max-width: 600px) {
        .ed-article-adjacent { grid-template-columns: 1fr; }
      }
      .ed-adjacent-card {
        border: 1px solid var(--ed-line);
        padding: 20px 22px;
        transition: border-color 200ms ease;
        display: block;
      }
      .ed-adjacent-card:hover { border-color: var(--ed-accent); }
      .ed-adjacent-label {
        font-size: 11px;
        color: var(--ed-ink-faint);
        text-transform: uppercase;
        letter-spacing: 0.12em;
        margin-bottom: 8px;
      }
      .ed-adjacent-title {
        font-family: var(--ed-font-serif);
        font-size: 16px;
        color: var(--ed-ink);
        line-height: 1.4;
      }
      .ed-adjacent-card:hover .ed-adjacent-title { color: var(--ed-accent); }

      /* 评论区 */
      .ed-comments {
        margin-top: 64px;
        padding-top: 40px;
        border-top: 1px solid var(--ed-line);
      }
      .ed-comments-title {
        font-family: var(--ed-font-serif);
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 24px;
      }

      /* ============== 文章结尾语（优雅的"感谢你阅读到这里"） ============== */
      .ed-article-closing {
        margin: 80px 0 24px;
        padding: 32px 0 24px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;
        text-align: center;
      }
      .ed-article-closing-rule {
        width: 48px;
        height: 1px;
        background: var(--ed-ink);
        opacity: 0.18;
      }
      .ed-article-closing-text {
        font-family: var(--ed-font-serif);
        font-size: 22px;
        font-weight: 600;
        color: var(--ed-ink);
        margin: 4px 0 0;
        letter-spacing: 0.08em;
      }
      .ed-article-closing-sub {
        font-family: var(--ed-font-serif);
        font-style: italic;
        color: var(--ed-ink-faint);
        font-size: 12px;
        margin: 0;
        letter-spacing: 0.16em;
      }

      /* 简单隐藏/重置 Notion 默认的标题 icon 大空隙 */
      #notion-article .notion-page-icon-inline {
        display: none !important;
      }

      /* 移动端菜单降级为更紧凑的横滚 */
      @media (max-width: 900px) {
        .ed-menu { display: none; }
        .ed-nav-mobile-toggle { display: inline-flex; }
      }

      /* 选区颜色 */
      ::selection {
        background: var(--ed-accent);
        color: #fff;
      }
    `}</style>
  )
}

export default Style

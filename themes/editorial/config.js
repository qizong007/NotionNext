/**
 * Editorial 主题配置
 * 严格按用户规范的 8 段结构配置
 */
const CONFIG = {
  // —————— 1. 顶部导航 ——————
  EDITORIAL_BRAND: 'qizong007',
  EDITORIAL_NAV: [
    { label: '首页', href: '/' },
    { label: '独立开发', href: '/tag/独立开发' },
    { label: '内容产品', href: '/tag/知我记物' },
    { label: '往期整理', href: '/archive' },
    { label: '关于', href: '/about' },
    { label: '友链', href: '/links' }
  ],

  // —————— 2. 公告栏 ——————
  // 运营位：可滚动；多条以「||」分隔；url 可选
  // 例：[{ text: '欢迎来到我的博客', url: '' }, { text: '...', url: '' }]
  EDITORIAL_NOTICES: [
    { text: '欢迎来到王帅真的个人博客 —— 在这里写独立开发 / AI / 内容产品 / 个人思考' }
  ],

  // —————— 3. Hero ——————
  // 半屏 5:5；左侧一句话占位文案；右侧最新文章封面（从 latestPosts 取）
  EDITORIAL_HERO_TAGLINE: '王帅真的个人博客',
  EDITORIAL_HERO_INTRO: '在这里写关于独立开发、AI、效率工具与一切让我好奇的东西。偶尔也聊聊生活。',

  // —————— 4. 渠道数据条 ——————
  // 五个渠道：b 站(实时) / 公众号 / 小红书 / youtube / 即刻
  // 任一项不配就隐藏
  EDITORIAL_CHANNELS: [
    {
      key: 'bilibili',
      label: 'B 站',
      vmid: '3493077649983936',
      href: 'https://space.bilibili.com/3493077649983936',
      live: true,
      icon: 'bilibili'
    },
    {
      key: 'wechat',
      label: '公众号',
      value: 12800,
      updatedAt: '2026-07-20',
      href: '',
      icon: 'wechat'
    },
    {
      key: 'xhs',
      label: '小红书',
      value: 5600,
      updatedAt: '2026-07-15',
      href: '',
      icon: 'xhs'
    },
    {
      key: 'youtube',
      label: 'YouTube',
      value: 3200,
      updatedAt: '2026-07-10',
      href: 'https://www.youtube.com/@qizong007',
      icon: 'youtube'
    }
    // 即刻（jike）已移到 social 列表第一位
  ],

  // —————— 5. 精选文章 ——————
  // 1 大 + 4 小 = 5 篇，6 列网格；首篇跨两列
  // 筛选方式：'tag' 走 Notion 标签 / 'latest' 取最新
  EDITORIAL_FEATURED_COUNT: 5,
  EDITORIAL_FEATURED_MODE: 'tag',
  EDITORIAL_FEATURED_TAG: '必看精选',
  // 兜底：如果筛选不到，打上"精选" tag 的也行
  EDITORIAL_FEATURED_FALLBACK_TAGS: ['必看精选', '推荐'],

  // —————— 6. 分类导航条 ——————
  // 一行横向 pill；首页固定首位 + Notion 真实分类
  EDITORIAL_CATEGORIES: [
    { label: '首页', href: '/' },
    { label: '个人思考', href: '/category/个人思考' },
    { label: 'AI', href: '/category/AI' },
    { label: '独立开发', href: '/category/独立开发' },
    { label: '踩坑实录', href: '/category/踩坑实录' },
    { label: '读书分享', href: '/category/读书分享' }
  ],

  // —————— 7. 最新文章列表 ——————
  // heo 风格：图左文右；移动端竖排
  // 列表长度由 MainArea 按 POSTS_PER_PAGE 切片；本主题不另设上限

  // —————— 8. 右侧个人卡片 ——————
  // 三段：个人资料 / 找到我 / 社交链接
  // 任一不配就隐藏该段
  EDITORIAL_AVATAR: '',
  EDITORIAL_BIO: '前字节 · 现独立开发 · 写点代码 / 写点字',

  // 找到我 —— 二维码图
  EDITORIAL_WECHAT_QR: '',
  EDITORIAL_WECHAT_LABEL: '微信',
  EDITORIAL_WECHAT_OA_QR: '',
  EDITORIAL_WECHAT_OA_LABEL: '公众号',
  EDITORIAL_DONATE_QR: '',
  EDITORIAL_DONATE_LABEL: '赞赏',

  // 社交链接
  // kind:
  //   - 'link'   默认可点击（显示 icon + label，右侧 →）
  //   - 'static' 不可点击（显示 icon + label，右侧就是 label 或 meta）
  //   - 'icon'   icon-only（无 label，可点击）
  // meta: 右侧展示的副文字
  // RSS 不在 hero 列出（footer 已有）
  // X 跟其他可点击社交一样用 link 模式，按用户要求放在「即刻 / 微信 / Email」之间
  EDITORIAL_SOCIALS: [
    {
      icon: 'jike',
      label: '即刻',
      href: 'https://okjk.co/uA931R',
      kind: 'link'
    },
    {
      icon: 'x',
      label: 'X',
      href: 'https://x.com/qizong007',
      kind: 'link'
    },
    {
      icon: 'wechat',
      label: '微信',
      kind: 'static',
      meta: 'qizong_007'
    },
    {
      icon: 'mail',
      label: 'Email',
      kind: 'static',
      meta: 'qizong007@gmail.com'
    }
  ],

  // —————— 9. 页脚 ——————
  EDITORIAL_FOOTER_LEFT: 'All rights reserved.',
  EDITORIAL_FOOTER_RIGHT: 'Built with NotionNext'
}

export default CONFIG

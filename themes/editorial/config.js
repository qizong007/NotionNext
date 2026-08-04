/**
 * Editorial 主题配置
 * Magazine / 杂志风，克制排版
 */
const CONFIG = {
  // ===== 站点 =====
  EDITORIAL_SITE_CREATE_TIME: '2024-01-20', // 建站日期
  EDITORIAL_LOADING_COVER: false, // 是否显示 loading cover

  // ===== 公告条（运营位，必保留） =====
  // 留空数组则不显示
  EDITORIAL_NOTICE_BAR: [
    {
      title: '欢迎来到我的博客 · 不止编码（Not Only Coding）',
      url: 'https://blog.qizong007.top'
    }
  ],

  // ===== Hero 区文案 =====
  EDITORIAL_HERO_GREETING: '个人主页', // 头像右侧的问候
  EDITORIAL_HERO_INTRO:
    '一名独立开发者与内容创作者 · 坚信 Not Only Coding。在这里记录编程、思维与生活。', // 头像下方一句话
  EDITORIAL_HERO_AVATAR: '', // 留空则用 Notion 站点头像

  // ===== 渠道统计（右侧竖排，icon + 名字 + 数字） =====
  // 数字 fallback 优先；没有 fallback 才尝试调 API
  // hoverColor 用来在 hover 时用渠道色高亮（B站粉、微信绿、YouTube 红等）
  EDITORIAL_CHANNELS: [
    {
      key: 'bilibili',
      name: 'B站',
      icon: 'fa-brands fa-bilibili',
      url: 'https://space.bilibili.com/3493077649983936',
      // 用站内 API 代理（避免 B站 CORS 拒绝）
      // /api/bilibili-follower 会服务端代请求 B站，再把 follower 数返回
      api: '/api/bilibili-follower?vmid=3493077649983936',
      // B站走纯 API，fallback 留空
      fallback: null,
      label: '粉丝',
      hoverColor: '#FB7299' // B站粉
    },
    {
      key: 'wechat-mp',
      name: '公众号',
      icon: 'fa-brands fa-weixin',
      // 公众号跳到搜索页，扫码加关注（需要登录态拿不到 openId）
      url: 'https://weixin.sogou.com/weixin?type=2&query=qizong007',
      label: '订阅',
      fallback: 1347,
      hoverColor: '#07C160' // 微信绿
    },
    {
      key: 'xhs',
      name: '小红书',
      icon: 'fa-solid fa-bookmark',
      url: 'https://www.xiaohongshu.com/user/profile/5c507ad8000000001800e25a',
      label: '粉丝',
      fallback: 1410,
      hoverColor: '#FF2442' // 小红书红
    },
    {
      key: 'youtube',
      name: 'YouTube',
      icon: 'fa-brands fa-youtube',
      url: 'https://www.youtube.com/@qizong007',
      label: '订阅',
      fallback: 1140,
      hoverColor: '#FF0000' // YouTube 红
    }
  ],

  // ===== 社交入口（右侧：icon + 名字，不可点击的写 showIcon: false） =====
  // 即刻、X、GitHub 是可点击的 icon；微信、Email 只显示文本（点击复制到剪贴板）
  // hoverColor 渠道色高亮：yellow / black / green / black
  // copyable 微信/Email 点击复制时开启
  EDITORIAL_SOCIALS: [
    {
      key: 'jike',
      name: '即刻',
      icon: 'fa-solid fa-bolt',
      url: 'https://m.okjike.com/users/bb668784-6bbc-456d-989c-1f8e90f6fd95',
      showIcon: true,
      clickable: true,
      hoverColor: '#FFD400' // 即刻黄
    },
    {
      key: 'x',
      name: 'X',
      icon: 'fa-brands fa-x-twitter',
      url: 'https://x.com/qizong007',
      showIcon: true,
      clickable: true,
      hoverColor: '#000000' // X 黑
    },
    {
      key: 'wechat',
      name: '微信',
      icon: 'fa-brands fa-weixin',
      text: 'qizong_007',
      showIcon: true,
      clickable: false,
      copyable: true, // 点击复制账号
      hoverColor: '#07C160' // 微信绿
    },
    {
      key: 'email',
      name: 'Email',
      icon: 'fa-solid fa-envelope',
      text: 'qizong007@gmail.com',
      showIcon: true,
      clickable: false,
      copyable: true, // 点击复制邮箱
      hoverColor: '#07C160' // 跟微信同色（都是绿色系）
    }
  ],

  // ===== 文章列表 =====
  EDITORIAL_POST_LIST_SUMMARY: true, // 显示摘要
  EDITORIAL_POST_LIST_COVER: true, // 显示封面
  // ===== 详情页 =====
  EDITORIAL_ARTICLE_TOC_STICKY: true, // 目录悬浮
  EDITORIAL_ARTICLE_ADJACENT: true, // 上一篇/下一篇
  EDITORIAL_ARTICLE_RECOMMEND: false, // 文章推荐（关闭以保持杂志感）
  EDITORIAL_ARTICLE_COPYRIGHT: true, // 版权
  EDITORIAL_ARTICLE_SHARE: true, // 分享条
  EDITORIAL_ARTICLE_NOTICE: false, // 关闭过期提醒（克制）
  EDITORIAL_ARTICLE_CLOSING: true, // 底部优雅结尾语（"感谢你阅读到这里"）

  // ===== 我的项目（Hero 下方三个卡片，填满第一屏） =====
  EDITORIAL_PROJECTS: [
    {
      key: 'knowme',
      name: '知我记物',
      type: 'iOS App',
      // App Store 副标：知我知物，让记录迸发出价值
      desc: '更懂你的记物软件。记录、保修提醒、物品回顾，简约优雅的个人物品管理。',
      cover: '/images/project-knowme.jpg',
      url: 'https://apps.apple.com/cn/app/%E7%9F%A5%E6%88%91%E8%AE%B0%E7%89%A9-%E6%9B%B4%E6%87%82%E4%BD%A0%E7%9A%84%E8%AE%B0%E7%89%A9%E8%BD%AF%E4%BB%B6/id6740251522'
    },
    {
      key: 'backendcoder',
      name: '后端程序员 101',
      type: '小报童专栏',
      desc: '后端程序员的成长指南。架构、代码、面试、职场，把后端这件事一次讲清楚。',
      cover: '/images/project-backendcoder.jpeg',
      url: 'https://xiaobot.net/creator/BackendCoder101'
    },
    {
      key: 'ai-circle',
      name: '帅真的 AI 实战圈',
      type: '知识星球',
      desc: 'AI 实战派交流圈。一起把 AI 用到真正的工作和生活里，不做空谈。',
      cover: '/images/project-ai-circle.jpeg',
      url: 'https://wx.zsxq.com/group/28882145552851'
    }
  ],

  // ===== 全局功能开关 =====

  // ===== 全局功能开关 =====
  EDITORIAL_DARK_MODE: false, // 杂志风不做暗色
  EDITORIAL_COMMENTS: true, // 显示评论
  EDITORIAL_RSS_IN_FOOTER: true // 页脚显示 RSS
}

export default CONFIG

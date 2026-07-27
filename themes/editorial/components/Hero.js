import LazyImage from '@/components/LazyImage'
import { siteConfig } from '@/lib/config'
import SmartLink from '@/components/SmartLink'
import CONFIG from '../config'
import { useBilibiliFollowers } from './useBilibiliFollowers'

/* ============================================================
 * 平台小图标 —— 真品牌辨识度
 * ============================================================ */
const PlatformIcon = ({ name, className = 'w-4 h-4' }) => {
  const stroke = 'currentColor'
  const common = {
    className,
    fill: 'none',
    stroke,
    strokeWidth: 1.5,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    viewBox: '0 0 24 24'
  }
  switch (name) {
    case 'bilibili':
      return (
        <svg {...common}>
          <rect x='3' y='6' width='18' height='13' rx='3' />
          <path d='M8 3l2 3M16 3l-2 3' />
          <circle cx='9' cy='13' r='0.6' fill={stroke} />
          <circle cx='15' cy='13' r='0.6' fill={stroke} />
        </svg>
      )
    case 'wechat-oa':
      // 公众号（运营） —— 微信双气泡
      return (
        <svg {...common}>
          <path d='M8 10a8 8 0 0 1 16 0c0 2-1 3-2 4l1 3-3-1a8 8 0 0 1-4 1' />
          <path d='M16 14a8 8 0 0 1-14 0c0-2 1-3 2-4l-1-3 3 1a8 8 0 0 1 4-1' />
          <circle cx='7' cy='10' r='0.5' fill={stroke} />
          <circle cx='10' cy='10' r='0.5' fill={stroke} />
          <circle cx='14' cy='14' r='0.5' fill={stroke} />
          <circle cx='17' cy='14' r='0.5' fill={stroke} />
        </svg>
      )
    case 'xhs':
      return (
        <svg {...common}>
          <path d='M5 8h14M5 12h14M5 16h10' />
          <circle cx='18' cy='16' r='1.5' />
        </svg>
      )
    case 'youtube':
      return (
        <svg viewBox='0 0 24 24' className={className} fill='currentColor'>
          <path d='M21.6 7.2a2.5 2.5 0 0 0-1.7-1.8C18.2 5 12 5 12 5s-6.2 0-7.9.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.7 1.8C5.8 19 12 19 12 19s6.2 0 7.9-.4a2.5 2.5 0 0 0 1.7-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8zM10 15V9l5 3-5 3z' />
        </svg>
      )
    case 'jike':
      return (
        <svg viewBox='0 0 24 24' className={className} fill='currentColor'>
          <path d='M13 2L4 14h7l-2 8 9-12h-7l2-8z' />
        </svg>
      )
    case 'rss':
      return (
        <svg {...common}>
          <path d='M4 11a9 9 0 0 1 9 9' />
          <path d='M4 4a16 16 0 0 1 16 16' />
          <circle cx='5' cy='19' r='1.5' fill={stroke} />
        </svg>
      )
    case 'github':
      return (
        <svg {...common}>
          <path d='M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22' />
        </svg>
      )
    case 'mail':
      return (
        <svg {...common}>
          <rect x='2' y='4' width='20' height='16' rx='2' />
          <path d='M2 7l10 7 10-7' />
        </svg>
      )
    case 'wechat':
      // 个人微信（绿底白气泡，跟公众号区分）
      return (
        <svg viewBox='0 0 24 24' className={className} fill='currentColor'>
          <path d='M8.5 4C4.91 4 2 6.46 2 9.5c0 1.7.85 3.21 2.19 4.21-.09.31-.46 1.55-.53 1.79-.07.25.09.25.18.18.07-.05 1.36-.92 1.71-1.16.62.16 1.27.25 1.95.25.21 0 .42-.01.62-.03-.13-.4-.2-.82-.2-1.25 0-2.95 2.83-5.34 6.31-5.34.07 0 .14 0 .21.01C14.04 5.59 11.5 4 8.5 4zM6 7.5a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5zm5 0a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5z' />
          <path d='M22 14.5c0-2.49-2.41-4.5-5.38-4.5-3.05 0-5.5 2.01-5.5 4.5s2.45 4.5 5.5 4.5c.55 0 1.08-.07 1.59-.21.27.18 1.31.88 1.36.92.07.05.2.05.14-.16-.05-.18-.36-1.18-.43-1.42C20.91 17.55 22 16.13 22 14.5zm-7 .5a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm3.5 0a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1z' />
        </svg>
      )
    case 'x':
      // X (Twitter) —— 黑色 X
      return (
        <svg viewBox='0 0 24 24' className={className} fill='currentColor'>
          <path d='M18.244 2H21.5l-7.5 8.57L23 22h-6.84l-5.36-7.01L4.6 22H1.34l8.04-9.18L1 2h7l4.85 6.41L18.244 2zm-1.2 18.13h1.9L7.05 3.78H5.04l11.99 16.35z' />
        </svg>
      )
    default:
      return null
  }
}

/* ============================================================
 * 数字格式化
 * ============================================================ */
const fmt = n => (typeof n === 'number' ? n.toLocaleString('en-US') : n)

/* ============================================================
 * 单行 channel —— icon + 名字 + 数字（可隐藏）
 * ============================================================ */
const ChannelRow = ({ stat, liveValue, liveLoading }) => {
  const isLive = !!(stat.live || stat.vmid)
  const value = isLive ? liveValue : stat.value || 0
  const hideNumber = !!stat.hideNumber || value === 0
  const Wrapper = stat.href ? SmartLink : 'div'
  const wrapperProps = stat.href ? { href: stat.href } : {}
  return (
    <Wrapper
      {...wrapperProps}
      className='group flex items-center gap-3 py-1 -mx-2 px-2 rounded-[6px] transition-colors hover:bg-[color:var(--ed-surface-soft)]'>
      <span className='flex-shrink-0 inline-flex items-center justify-center w-6 h-6 text-[color:var(--ed-text-soft)] group-hover:text-[color:var(--ed-accent)] transition-colors'>
        <PlatformIcon name={stat.icon} className='w-[16px] h-[16px]' />
      </span>
      <span className='text-[13px] text-[color:var(--ed-text-soft)] group-hover:text-[color:var(--ed-text)] flex-1 transition-colors'>
        {stat.label}
      </span>
      {!hideNumber && (
        <span className='ed-serif ed-stat-num text-[14px] font-medium text-[color:var(--ed-text)] tabular-nums'>
          {isLive && liveLoading ? (
            <span className='inline-block w-10 h-4 bg-[color:var(--ed-surface-soft)] rounded animate-pulse' />
          ) : (
            fmt(value)
          )}
        </span>
      )}
    </Wrapper>
  )
}

/* ============================================================
 * 单行 social —— 三种 kind
 *  - 'link'   可点击（icon + 名字 + 右侧 →）
 *  - 'static' 不可点击（icon + 名字 + 右侧 meta 文本，不可点）
 *  - 'icon'   icon-only 可点击（只显示 icon）
 * ============================================================ */
const SocialRow = ({ s }) => {
  const kind = s.kind || (s.href ? 'link' : 'static')

  // icon-only
  if (kind === 'icon') {
    return (
      <SmartLink
        href={s.href}
        target={s.href?.startsWith('http') ? '_blank' : undefined}
        className='group inline-flex items-center justify-center w-7 h-7 -mx-1 rounded-[6px] text-[color:var(--ed-text-soft)] hover:text-[color:var(--ed-accent)] hover:bg-[color:var(--ed-surface-soft)] transition-colors no-underline border-0'
        aria-label={s.label || s.icon}>
        <PlatformIcon name={s.icon} className='w-[16px] h-[16px]' />
      </SmartLink>
    )
  }

  // 不可点击（展示 meta）
  if (kind === 'static') {
    return (
      <div className='flex items-center gap-3 py-1 -mx-2 px-2 rounded-[6px] select-text'>
        <span className='flex-shrink-0 inline-flex items-center justify-center w-6 h-6 text-[color:var(--ed-text-soft)]'>
          <PlatformIcon name={s.icon} className='w-[16px] h-[16px]' />
        </span>
        <span className='text-[13px] text-[color:var(--ed-text-soft)] flex-1'>
          {s.label}
        </span>
        {s.meta && (
          <span className='ed-num text-[12px] text-[color:var(--ed-text-faint)]'>
            {s.meta}
          </span>
        )}
      </div>
    )
  }

  // 可点击
  return (
    <SmartLink
      href={s.href}
      target={s.href.startsWith('http') ? '_blank' : undefined}
      className='group flex items-center gap-3 py-1 -mx-2 px-2 rounded-[6px] transition-colors hover:bg-[color:var(--ed-surface-soft)] no-underline border-0'>
      <span className='flex-shrink-0 inline-flex items-center justify-center w-6 h-6 text-[color:var(--ed-text-soft)] group-hover:text-[color:var(--ed-accent)] transition-colors'>
        <PlatformIcon name={s.icon} className='w-[16px] h-[16px]' />
      </span>
      <span className='text-[13px] text-[color:var(--ed-text-soft)] group-hover:text-[color:var(--ed-text)] flex-1 transition-colors'>
        {s.label}
      </span>
      <span className='text-[12px] text-[color:var(--ed-text-faint)] group-hover:text-[color:var(--ed-accent)] transition-colors'>
        →
      </span>
    </SmartLink>
  )
}

/* ============================================================
 * 渠道列 + 社交列
 * ============================================================ */
const ChannelsPanel = () => {
  const channels = siteConfig(
    'EDITORIAL_CHANNELS',
    CONFIG.EDITORIAL_CHANNELS,
    CONFIG
  )

  // 过滤：未配的（label 空 / value 0 且不是 live）隐藏
  const visibleChannels = (channels || []).filter(c => {
    if (!c) return false
    if (c.live || c.vmid) return true
    if (c.hideNumber) return !!c.label
    return typeof c.value === 'number' && c.value > 0
  })

  // 社交 —— 拆成「label 行」和「icon-only 行」
  const allSocials = (siteConfig(
    'EDITORIAL_SOCIALS',
    CONFIG.EDITORIAL_SOCIALS,
    CONFIG
  ) || []).filter(s => s && s.icon)
  const labeledSocials = allSocials.filter(s => s.kind !== 'icon')
  const iconOnlySocials = allSocials.filter(s => s.kind === 'icon')

  // B 站实时
  const bibi = visibleChannels.find(c => c.live || c.vmid)
  const { count: biliCount, loading: biliLoading } = useBilibiliFollowers(
    bibi?.vmid
  )

  if (visibleChannels.length === 0 && allSocials.length === 0) return null

  return (
    <div className='ed-card p-5 w-full'>
      {/* 渠道数据 */}
      {visibleChannels.length > 0 && (
        <div>
          <div className='flex items-center gap-2 mb-2'>
            <span className='inline-block w-3 h-px bg-[color:var(--ed-text-faint)]' />
            <span className='text-[10px] tracking-[0.22em] uppercase text-[color:var(--ed-text-faint)]'>
              Channels
            </span>
          </div>
          <div className='flex flex-col'>
            {visibleChannels.map(c => (
              <ChannelRow
                key={c.key}
                stat={c}
                liveValue={biliCount}
                liveLoading={biliLoading}
              />
            ))}
          </div>
        </div>
      )}

      {/* 社交 —— 上面 3 行 label 列表 + 下面 2 个 icon-only 链接 */}
      {allSocials.length > 0 && (
        <div className={visibleChannels.length > 0 ? 'mt-5 pt-5 border-t border-[color:var(--ed-rule-soft)]' : ''}>
          <div className='flex items-center gap-2 mb-2'>
            <span className='inline-block w-3 h-px bg-[color:var(--ed-text-faint)]' />
            <span className='text-[10px] tracking-[0.22em] uppercase text-[color:var(--ed-text-faint)]'>
              Social
            </span>
          </div>
          {/* label 行（即刻 / 微信 / email） */}
          {labeledSocials.length > 0 && (
            <div className='flex flex-col'>
              {labeledSocials.map(s => (
                <SocialRow key={s.href || s.icon} s={s} />
              ))}
            </div>
          )}
          {/* icon-only 行（X / RSS）—— 跟 label 行用细线分隔 */}
          {iconOnlySocials.length > 0 && (
            <>
              {labeledSocials.length > 0 && (
                <div className='my-2 h-px bg-[color:var(--ed-rule-soft)]' />
              )}
              <div className='flex items-center gap-1.5 px-1'>
                {iconOnlySocials.map(s => (
                  <SocialRow key={s.href || s.icon} s={s} />
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}

/* ============================================================
 * Hero —— 7:3 布局
 *  - 左 7：标题（圆形头像在上 + 文案）
 *  - 右 3：渠道数据 + 社交
 * ============================================================ */
const Hero = ({ siteInfo }) => {
  const tagline = siteConfig(
    'EDITORIAL_HERO_TAGLINE',
    CONFIG.EDITORIAL_HERO_TAGLINE,
    CONFIG
  )
  const intro = siteConfig(
    'EDITORIAL_HERO_INTRO',
    CONFIG.EDITORIAL_HERO_INTRO,
    CONFIG
  )
  const author = siteConfig('AUTHOR', '王帅真')
  const avatar =
    siteConfig('EDITORIAL_AVATAR', CONFIG.EDITORIAL_AVATAR, CONFIG) ||
    siteInfo?.icon ||
    ''

  return (
    <section className='w-full'>
      <div className='max-w-[1200px] mx-auto px-6 md:px-10 pt-10 md:pt-14 pb-6 md:pb-7'>
        {/* 7:3 分屏 */}
        <div className='grid grid-cols-1 md:grid-cols-[7fr_3fr] gap-8 md:gap-10 items-start'>
          {/* —— 左 7：标题 + 头像 —— */}
          <div className='flex flex-col'>
            {/* 圆形头像 —— 左侧 80px */}
            {avatar ? (
              <LazyImage
                src={avatar}
                alt={author}
                className='ed-hero-avatar-circle mb-5 md:mb-6'
              />
            ) : (
              <div className='ed-hero-avatar-circle mb-5 md:mb-6 flex items-center justify-center ed-serif text-[color:var(--ed-text-soft)]'>
                {author?.[0] || 'Q'}
              </div>
            )}

            {/* eyebrow */}
            <div className='flex items-center gap-3 text-[11px] tracking-[0.2em] uppercase text-[color:var(--ed-text-faint)] mb-3 md:mb-4'>
              <span className='inline-block w-6 h-px bg-[color:var(--ed-text-faint)]' />
              <span>个人主页</span>
            </div>

            {/* 主标题 */}
            <h1 className='ed-serif ed-hero-title font-medium leading-[1.05]'>
              {tagline}
              <span className='ed-accent'>.</span>
            </h1>

            {/* 副标题 */}
            <p className='mt-5 md:mt-6 text-[15px] md:text-[16px] leading-[1.7] text-[color:var(--ed-text-soft)] max-w-[520px]'>
              {intro}
            </p>
          </div>

          {/* —— 右 3：渠道数据 + 社交 —— */}
          <div className='md:pt-2'>
            <ChannelsPanel />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero

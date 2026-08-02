import LazyImage from '@/components/LazyImage'
import { siteConfig } from '@/lib/config'
import { useEffect, useRef, useState } from 'react'
import CONFIG from '../config'

/**
 * 复制文本到剪贴板，失败时降级到 prompt
 */
async function copyToClipboard(text) {
  try {
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(text)
      return true
    }
  } catch (e) {
    // 忽略，降级处理
  }
  // 降级：临时 textarea + execCommand
  try {
    const ta = document.createElement('textarea')
    ta.value = text
    ta.style.position = 'fixed'
    ta.style.opacity = '0'
    document.body.appendChild(ta)
    ta.select()
    document.execCommand('copy')
    document.body.removeChild(ta)
    return true
  } catch (e) {
    return false
  }
}

/**
 * Hero 区块
 * 左：圆形头像 + 问候 + 名字 + 一句话介绍
 * 右：竖排渠道统计 + 社交入口
 */
const Hero = ({ siteInfo }) => {
  const greeting = siteConfig('EDITORIAL_HERO_GREETING', '你好，我是', CONFIG)
  const intro = siteConfig(
    'EDITORIAL_HERO_INTRO',
    '一名独立开发者与内容创作者。在这里记录编程、思维与生活。',
    CONFIG
  )
  const customAvatar = siteConfig('EDITORIAL_HERO_AVATAR', '', CONFIG)
  const author = siteConfig('AUTHOR') || '王帅真'
  const avatar = customAvatar || siteInfo?.icon

  const channels = siteConfig('EDITORIAL_CHANNELS', [], CONFIG) || []
  const socials = siteConfig('EDITORIAL_SOCIALS', [], CONFIG) || []

  return (
    <section className='ed-hero'>
      <div className='ed-container ed-hero-grid'>
        {/* 左侧：头像 + 介绍 */}
        <div className='ed-hero-left'>
          {avatar && (
            <LazyImage
              src={avatar}
              alt={author}
              className='ed-hero-avatar'
              width={96}
              height={96}
            />
          )}
          {/* 问候：一条横线 + 「个人主页」文字 */}
          <div className='ed-hero-greet'>
            <span className='ed-hero-greet-line' />
            <span className='ed-hero-greet-text'>个人主页</span>
          </div>
          <h1 className='ed-hero-name'>
            王帅真的个人博客<span style={{ color: 'var(--ed-accent)' }}>.</span>
          </h1>
          <p className='ed-hero-intro'>{intro}</p>
        </div>

        {/* 右侧：渠道 + 社交 */}
        <div className='ed-hero-right'>
          {channels.length > 0 && (
            <div>
              <div className='ed-section-label'>Channels</div>
              <div className='ed-channel-list'>
                {channels.map((c, i) => (
                  <ChannelRow key={i} channel={c} />
                ))}
              </div>
            </div>
          )}

          {socials.length > 0 && (
            <div>
              <div className='ed-section-label'>Social</div>
              <div className='ed-social-list'>
                {socials.map((s, i) => (
                  <SocialRow key={i} social={s} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

/**
 * 单条渠道：icon + 名字 + 数字
 * 数字优先级：
 * 1. 如果有 api，先请求 api；成功用 api 数据
 * 2. api 失败 / 没有 api，用 fallback
 * 数字带 count-up 动效（从 0 加到目标值）
 */
const ChannelRow = ({ channel }) => {
  const [target, setTarget] = useState(
    channel.api ? null : channel.fallback ?? null
  )
  const [loading, setLoading] = useState(!!channel.api)

  useEffect(() => {
    let cancelled = false
    if (channel.api) {
      setLoading(true)
      fetch(channel.api)
        .then(r => r.json())
        .then(data => {
          if (cancelled) return
          // 两种返回结构都兼容：
          //  1) 自家代理 { code, follower, raw }  → 取 follower
          //  2) 直连 B站 { data: { follower, ... } }  → 取 data.follower
          let val = null
          if (data && typeof data.follower === 'number') {
            val = data.follower
          } else if (data && data.data) {
            val =
              data.data.follower ??
              data.data.fans ??
              data.data.following ??
              null
          }
          if (val != null && !isNaN(Number(val))) {
            setTarget(Number(val))
          } else if (channel.fallback != null) {
            setTarget(Number(channel.fallback))
          }
        })
        .catch(() => {
          if (cancelled) return
          if (channel.fallback != null) {
            setTarget(Number(channel.fallback))
          }
        })
        .finally(() => {
          if (!cancelled) setLoading(false)
        })
    } else if (channel.fallback != null) {
      setTarget(Number(channel.fallback))
      setLoading(false)
    }
    return () => {
      cancelled = true
    }
  }, [channel.api, channel.fallback])

  const animated = useCountUp(target, 1100)
  const display = loading || target == null ? '—' : formatCount(animated ?? 0)

  const isLink = !!channel.url
  const Comp = isLink ? 'a' : 'div'
  const linkProps = isLink
    ? { href: channel.url, target: '_blank', rel: 'noreferrer' }
    : {}

  // hover 高亮用渠道色（B站粉 / 微信绿 / YouTube 红等）
  const hoverStyle = channel.hoverColor
    ? { '--ed-row-hover': channel.hoverColor }
    : undefined

  return (
    <Comp
      {...linkProps}
      {...(hoverStyle ? { style: hoverStyle } : {})}
      className={`ed-channel ${isLink ? 'is-link' : ''}`}>
      {channel.key === 'xhs' ? (
        <span className='ed-channel-icon ed-social-icon-svg' aria-hidden='true'>
          <svg viewBox='0 0 1024 1024' width='20' height='20'>
            <path
              d='M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z'
              fill='currentColor'
            />
            <path
              d='M780.288 487.424h26.112c4.096-38.912 2.048-40.96-26.112-36.352v36.352z m37.376 109.568h53.248c0-16.384 0.512-31.232 0-46.08-0.512-9.728-7.168-15.36-18.432-15.36-23.552-0.512-47.104 0-72.192 0v101.376h-54.784v-101.376H670.72v-47.104h53.248V450.56c-11.264-0.512-23.04-1.024-34.816-1.536v-46.592h34.816c1.024-5.632 1.536-10.24 2.56-15.36h52.224c1.024 4.608 1.536 8.704 2.56 14.336 26.112 0 55.808 0.512 68.608 22.528 10.752 18.432 11.776 41.472 17.408 64 0.512 0 5.12 0 9.216 0.512 29.184 2.56 47.616 18.432 49.152 43.52 1.024 22.016 1.024 43.52 0 65.536-1.536 26.112-23.04 40.448-56.832 39.936-32.256-0.512-49.664-14.336-51.2-40.448z m-200.192-6.656h52.224v46.08H479.232c9.216-15.872 17.92-30.72 27.136-46.592h53.248V449.536h-33.28v-46.592h124.416v46.08h-33.28v141.312zM432.64 497.664c-12.8-1.024-23.552-1.024-33.792-3.072-13.824-2.048-19.456-10.752-13.824-21.504 14.848-27.648 30.208-54.784 45.568-82.432 1.536-2.56 7.168-4.096 10.752-4.096 14.336-0.512 28.16 0 45.056 0-12.8 23.04-25.088 45.056-37.376 67.072l3.584 2.56c18.432-12.8 39.424-4.096 62.976-7.68-16.896 29.696-32.256 56.832-49.152 86.016 13.312 1.024 22.528 1.024 34.304 2.048-6.656 12.288-13.312 23.552-20.48 34.816-1.024 2.048-5.632 3.584-8.192 3.584-16.896 0-33.792 1.024-50.688-0.512-18.432-1.536-24.576-10.752-17.408-25.6 8.704-16.896 18.432-33.28 28.672-51.2M205.824 387.072h54.272c0.512 2.048 1.024 4.608 1.024 6.656V593.92c0 29.696-19.456 45.056-51.2 43.008-23.04-1.536-34.816-12.288-39.936-38.4 6.144 0 11.776-0.512 17.408-0.512h17.92c0.512 0 0.512-210.944 0.512-210.944zM114.176 450.048h56.32c-11.264 55.808 1.536 114.176-42.496 166.4-10.752-17.408-19.968-32.768-29.184-48.64-1.024-1.536-1.024-3.584-1.024-5.632 5.632-36.864 10.752-73.728 16.384-112.128m222.208 165.888c-41.472-51.2-30.208-109.568-39.936-165.888h55.296l7.68 82.944c0 1.536-0.512 3.072 0 4.608 13.824 29.696-7.68 51.712-23.04 78.336m28.16 21.504c11.264-18.432 18.944-32.256 27.648-45.568 1.024-2.048 5.12-4.096 7.68-4.096 12.8 0.512 25.6 2.048 38.4 2.56 12.8 0.512 25.6 0 40.448 0-8.704 15.36-16.896 28.672-25.088 42.496-1.536 2.048-5.12 4.608-7.68 4.608H364.544m506.88-188.928c0-9.216-1.024-17.92 0-26.624 1.536-12.288 14.336-20.992 28.16-19.968 13.312 1.024 24.064 10.24 25.6 22.016 1.024 11.776-8.704 23.552-23.04 24.576-9.728 0.512-19.968 0-30.72 0'
              fill='var(--ed-bg)'
            />
          </svg>
        </span>
      ) : channel.icon ? (
        <i
          className={`ed-channel-icon ${channel.icon}`}
          aria-hidden='true'
        />
      ) : null}
      <span className='ed-channel-name'>{channel.name}</span>
      <span className='ed-channel-meta'>
        <span className='ed-channel-num ed-num'>{display}</span>
        {channel.label && (
          <span className='ed-channel-label'>{channel.label}</span>
        )}
      </span>
    </Comp>
  )
}

/**
 * 数字从 0 滚动到 target，时长约 1.1s
 * target 变化时（API 返回 / fallback 兜底）会从 0 重新滚一次
 */
function useCountUp(target, duration = 1100) {
  const [current, setCurrent] = useState(0)
  const rafRef = useRef(null)
  useEffect(() => {
    if (target == null) return
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    setCurrent(0)
    const startTime = performance.now()
    const tick = now => {
      const t = Math.min(1, (now - startTime) / duration)
      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3)
      setCurrent(Math.round(target * eased))
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        setCurrent(target)
        rafRef.current = null
      }
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [target, duration])
  return current
}

/**
 * 单条社交：icon | name | meta
 * 与 channels 同构：icon+name 在左，meta（> 箭头 或 文本）在右
 * 即刻 / X 是可点击的，右列显示 > 箭头
 * 微信 / Email 只显示文本，右列显示账号 / 邮箱
 */
const SocialRow = ({ social }) => {
  const isLink = social.clickable && !!social.url
  const canCopy = !!social.copyable && !!social.text
  const isInteractive = isLink || canCopy
  const [copied, setCopied] = useState(false)
  const Comp = isLink ? 'a' : 'div'
  const linkProps = isLink
    ? { href: social.url, target: '_blank', rel: 'noreferrer' }
    : {}

  const hoverStyle = social.hoverColor
    ? { '--ed-row-hover': social.hoverColor }
    : undefined

  const handleClick = canCopy
    ? async e => {
        e.preventDefault()
        const ok = await copyToClipboard(social.text)
        if (ok) {
          setCopied(true)
          setTimeout(() => setCopied(false), 1400)
        }
      }
    : undefined

  return (
    <Comp
      {...linkProps}
      {...(hoverStyle ? { style: hoverStyle } : {})}
      {...(handleClick ? { onClick: handleClick, role: 'button', title: `点击复制 ${social.text}` } : {})}
      className={`ed-social ${isLink ? 'is-link' : ''} ${canCopy ? 'is-copy' : ''} ${copied ? 'is-copied' : ''}`}>
      {social.showIcon && (
        social.key === 'jike' ? (
          <SocialIcon social={social} />
        ) : (
          social.icon && <SocialIcon icon={social.icon} />
        )
      )}
      <span className='ed-social-name'>{social.name}</span>
      <span className='ed-social-meta'>
        {isLink ? (
          <i
            className='ed-social-arrow fa-solid fa-chevron-right'
            aria-hidden='true'
          />
        ) : canCopy ? (
          copied ? (
            <span className='ed-social-copied'>已复制 ✓</span>
          ) : (
            // 不要 copy icon，按用户要求文字直接显示
            social.text && <span className='ed-social-text'>{social.text}</span>
          )
        ) : (
          social.text && <span className='ed-social-text'>{social.text}</span>
        )}
      </span>
    </Comp>
  )
}

/**
 * 社交图标：X、即即刻 走 inline SVG（FA 里没有即即刻 icon，且 X 的
 * fa-x-twitter 部分版本不渲染）。
 * 即即刻 logo：一个圆 + 短弯钩 J（无顶部横线，弯钩短），颜色随 currentColor。
 * 其它都走 FontAwesome class
 */
const SocialIcon = ({ icon, social }) => {
  // X (Twitter) — 用 inline SVG 保证一定能渲染
  if (icon && (icon.includes('x-twitter') || icon === 'fa-x')) {
    return (
      <span className='ed-social-icon ed-social-icon-svg' aria-hidden='true'>
        <svg viewBox='0 0 24 24' width='14' height='14' fill='currentColor'>
          <path d='M18.244 2H21.5l-7.39 8.446L23 22h-6.797l-5.32-6.96L4.8 22H1.54l7.91-9.04L1 2h6.95l4.81 6.36L18.244 2zm-2.39 18h1.86L7.27 4H5.27l10.584 16z' />
        </svg>
      </span>
    )
  }
  // 即即刻 — inline SVG，圆 + J + 旁边一条细线描边（参考即即刻 logo）
  if (social && social.key === 'jike') {
    return (
      <span className='ed-social-icon ed-social-icon-svg' aria-hidden='true'>
        <svg viewBox='0 0 24 24' width='20' height='20'>
          {/* 圆底色：跟随 currentColor（默认黑、hover 即刻黄） */}
          <circle cx='12' cy='12' r='11' fill='currentColor' />
          {/* 描边线：J 右边 1.5px 偏移的同形 path，opacity 0.35 营造"双线"装饰感。
              stroke 用 currentColor 让 hover 时描边也跟随变黄。
              J 往右移 1.5px 后，描边线同步到 x=14.5 */}
          <path
            d='M14.5 7 L14.5 13.8 Q14.5 15.5 12.5 15.5'
            stroke='currentColor'
            strokeWidth='1.4'
            strokeLinecap='round'
            fill='none'
            opacity='0.35'
          />
          {/* 短弯钩 J：从 11.5 往右移到 13 起点、弯钩到 (11, 15.5)。
              用背景色挖空，跟实心圆形成对比 */}
          <path
            d='M13 7 L13 13.8 Q13 15.5 11 15.5'
            stroke='var(--ed-bg)'
            strokeWidth='2.2'
            strokeLinecap='round'
            fill='none'
          />
        </svg>
      </span>
    )
  }
  // 小红书 — 用品牌官方 SVG 路径（红圆 + 白色"小红书"字）
  if (social && social.key === 'xhs') {
    return (
      <span className='ed-social-icon ed-social-icon-svg' aria-hidden='true'>
        {/* viewBox 1024x1024 (品牌原图)，圆 fill 改 currentColor（默认黑/hover 红），
            白色字 fill 改 var(--ed-bg) 保留挖空效果 */}
        <svg viewBox='0 0 1024 1024' width='20' height='20'>
          <path
            d='M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z'
            fill='currentColor'
          />
          <path
            d='M780.288 487.424h26.112c4.096-38.912 2.048-40.96-26.112-36.352v36.352z m37.376 109.568h53.248c0-16.384 0.512-31.232 0-46.08-0.512-9.728-7.168-15.36-18.432-15.36-23.552-0.512-47.104 0-72.192 0v101.376h-54.784v-101.376H670.72v-47.104h53.248V450.56c-11.264-0.512-23.04-1.024-34.816-1.536v-46.592h34.816c1.024-5.632 1.536-10.24 2.56-15.36h52.224c1.024 4.608 1.536 8.704 2.56 14.336 26.112 0 55.808 0.512 68.608 22.528 10.752 18.432 11.776 41.472 17.408 64 0.512 0 5.12 0 9.216 0.512 29.184 2.56 47.616 18.432 49.152 43.52 1.024 22.016 1.024 43.52 0 65.536-1.536 26.112-23.04 40.448-56.832 39.936-32.256-0.512-49.664-14.336-51.2-40.448z m-200.192-6.656h52.224v46.08H479.232c9.216-15.872 17.92-30.72 27.136-46.592h53.248V449.536h-33.28v-46.592h124.416v46.08h-33.28v141.312zM432.64 497.664c-12.8-1.024-23.552-1.024-33.792-3.072-13.824-2.048-19.456-10.752-13.824-21.504 14.848-27.648 30.208-54.784 45.568-82.432 1.536-2.56 7.168-4.096 10.752-4.096 14.336-0.512 28.16 0 45.056 0-12.8 23.04-25.088 45.056-37.376 67.072l3.584 2.56c18.432-12.8 39.424-4.096 62.976-7.68-16.896 29.696-32.256 56.832-49.152 86.016 13.312 1.024 22.528 1.024 34.304 2.048-6.656 12.288-13.312 23.552-20.48 34.816-1.024 2.048-5.632 3.584-8.192 3.584-16.896 0-33.792 1.024-50.688-0.512-18.432-1.536-24.576-10.752-17.408-25.6 8.704-16.896 18.432-33.28 28.672-51.2M205.824 387.072h54.272c0.512 2.048 1.024 4.608 1.024 6.656V593.92c0 29.696-19.456 45.056-51.2 43.008-23.04-1.536-34.816-12.288-39.936-38.4 6.144 0 11.776-0.512 17.408-0.512h17.92c0.512 0 0.512-210.944 0.512-210.944zM114.176 450.048h56.32c-11.264 55.808 1.536 114.176-42.496 166.4-10.752-17.408-19.968-32.768-29.184-48.64-1.024-1.536-1.024-3.584-1.024-5.632 5.632-36.864 10.752-73.728 16.384-112.128m222.208 165.888c-41.472-51.2-30.208-109.568-39.936-165.888h55.296l7.68 82.944c0 1.536-0.512 3.072 0 4.608 13.824 29.696-7.68 51.712-23.04 78.336m28.16 21.504c11.264-18.432 18.944-32.256 27.648-45.568 1.024-2.048 5.12-4.096 7.68-4.096 12.8 0.512 25.6 2.048 38.4 2.56 12.8 0.512 25.6 0 40.448 0-8.704 15.36-16.896 28.672-25.088 42.496-1.536 2.048-5.12 4.608-7.68 4.608H364.544m506.88-188.928c0-9.216-1.024-17.92 0-26.624 1.536-12.288 14.336-20.992 28.16-19.968 13.312 1.024 24.064 10.24 25.6 22.016 1.024 11.776-8.704 23.552-23.04 24.576-9.728 0.512-19.968 0-30.72 0'
            fill='var(--ed-bg)'
          />
        </svg>
      </span>
    )
  }
  return (
    <i
      className={`ed-social-icon ${icon}`}
      aria-hidden='true'
    />
  )
}

/**
 * 数字格式化：完整数字 + 千分位逗号
 * 12345 -> "12,345"   不再缩成 w
 */
function formatCount(n) {
  const num = Number(n)
  if (isNaN(num)) return '—'
  return num.toLocaleString('en-US')
}

export default Hero

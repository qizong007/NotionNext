import { useState } from 'react'
import SmartLink from '@/components/SmartLink'
import { formatDateFmt } from '@/lib/utils/formatDate'

/* ============================================================
 * 文章页右侧 metadata 栏
 *
 * 模仿 claude blog 风格：icon + 标签（细体）+ 内容（粗体）
 * 数据：
 *  - Category / Tags / Date / Reading time / Share
 *  - Reading time 来自 heo 的 `post.readTime`（lib/utils/post.js 算好）
 * ============================================================ */
const PostSidebar = ({ post }) => {
  const [copied, setCopied] = useState(false)

  if (!post) return null

  const category =
    post.category && typeof post.category === 'object'
      ? post.category.name
      : post.category
  const tags = Array.isArray(post?.tagItems) ? post.tagItems : []
  const date = post.publishDate || post.lastEditedDate
  const dateStr = date ? formatDateFmt(date, 'yyyy-MM-dd') : ''
  const readTime = post.readTime || 1

  const handleCopyLink = () => {
    if (typeof window === 'undefined') return
    const url = window.location.href
    try {
      navigator.clipboard.writeText(url)
    } catch {
      // 老浏览器 fallback
      const ta = document.createElement('textarea')
      ta.value = url
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <aside className='ed-post-sidebar space-y-5 text-[13px]'>
      {/* 分类 */}
      {category && (
        <Row icon={<IconBulb />} label='分类'>
          <SmartLink
            href={`/category/${encodeURIComponent(category)}`}
            className='font-medium text-[color:var(--ed-text)] hover:text-[color:var(--ed-accent)] transition-colors border-0 no-underline'>
            {category}
          </SmartLink>
        </Row>
      )}

      {/* 标签 */}
      {tags.length > 0 && (
        <Row icon={<IconTag />} label='标签'>
          <div className='flex flex-wrap gap-x-2 gap-y-1'>
            {tags.slice(0, 5).map(t => (
              <SmartLink
                key={t.name}
                href={`/tag/${encodeURIComponent(t.name)}`}
                className='inline-block text-[12px] text-[color:var(--ed-text)] hover:text-[color:var(--ed-accent)] transition-colors border-0 no-underline'>
                #{t.name}
              </SmartLink>
            ))}
          </div>
        </Row>
      )}

      {/* 发布日期 */}
      {dateStr && (
        <Row icon={<IconCalendar />} label='发布于'>
          <span className='font-medium text-[color:var(--ed-text)] ed-num'>
            {dateStr}
          </span>
        </Row>
      )}

      {/* 阅读时间 —— heo 字段 */}
      <Row icon={<IconClock />} label='阅读时间'>
        <span className='font-medium text-[color:var(--ed-text)] ed-num'>
          {readTime} 分钟
        </span>
      </Row>

      {/* 分享 —— 复制链接 */}
      <Row icon={<IconShare />} label='分享'>
        <button
          type='button'
          onClick={handleCopyLink}
          className='font-medium text-[color:var(--ed-text)] hover:text-[color:var(--ed-accent)] transition-colors border-0 bg-transparent p-0 cursor-pointer'>
          {copied ? '已复制 ✓' : '复制链接'}
        </button>
      </Row>
    </aside>
  )
}

/* ============================================================
 * 单行：icon + 标签 + 内容
 * ============================================================ */
const Row = ({ icon, label, children }) => (
  <div className='flex items-start gap-3'>
    <span className='flex-shrink-0 inline-flex items-center justify-center w-5 h-5 mt-0.5 text-[color:var(--ed-text-faint)]'>
      {icon}
    </span>
    <div className='flex-1 min-w-0'>
      <div className='text-[11px] tracking-[0.06em] text-[color:var(--ed-text-faint)] mb-0.5'>
        {label}
      </div>
      <div>{children}</div>
    </div>
  </div>
)

/* ============================================================
 * icons —— 跟 claude 风格保持细线 outline
 * ============================================================ */
const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  viewBox: '0 0 24 24'
}
const IconBulb = () => (
  <svg {...stroke} className='w-[18px] h-[18px]'>
    <path d='M9 18h6' />
    <path d='M10 22h4' />
    <path d='M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.2 1 2V17h6v-.3c0-.8.4-1.5 1-2A7 7 0 0 0 12 2z' />
  </svg>
)
const IconTag = () => (
  <svg {...stroke} className='w-[18px] h-[18px]'>
    <path d='M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8z' />
    <circle cx='7.5' cy='7.5' r='1.2' fill='currentColor' />
  </svg>
)
const IconCalendar = () => (
  <svg {...stroke} className='w-[18px] h-[18px]'>
    <rect x='3' y='5' width='18' height='16' rx='2' />
    <path d='M3 9h18M8 3v4M16 3v4' />
  </svg>
)
const IconClock = () => (
  <svg {...stroke} className='w-[18px] h-[18px]'>
    <circle cx='12' cy='12' r='9' />
    <path d='M12 7v5l3 2' />
  </svg>
)
const IconShare = () => (
  <svg {...stroke} className='w-[18px] h-[18px]'>
    <path d='M4 12v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7' />
    <path d='M16 6l-4-4-4 4' />
    <path d='M12 2v13' />
  </svg>
)

export default PostSidebar

import LazyImage from '@/components/LazyImage'
import { siteConfig } from '@/lib/config'
import SmartLink from '@/components/SmartLink'
import CONFIG from '../config'

/**
 * 最新文章列表 —— heo 风格
 *  - 桌面：图左文右（5:7）
 *  - 移动：上图下文
 *  - 单列
 *  - 分类是横向 chip，不是竖排
 */
const LatestArticles = ({ posts = [] }) => {
  // 不再切片，MainArea 已经按 POSTS_PER_PAGE 切过
  if (posts.length === 0) return null

  const cover = post =>
    post?.pageCoverThumbnail || post?.pageCover || '/bg_image.jpg'

  const formatDate = ts => {
    if (!ts) return ''
    const d = new Date(ts)
    if (isNaN(d.getTime())) return ''
    return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`
  }

  return (
    <section className='w-full border-t border-[color:var(--ed-rule-soft)]'>
      <div className='max-w-[1200px] mx-auto px-6 md:px-10 pt-6 md:pt-7 pb-12 md:pb-16'>
        {/* 标题 */}
        <div className='mb-6 md:mb-8'>
          <div className='text-[11px] tracking-[0.2em] uppercase text-[color:var(--ed-text-faint)] mb-2'>
            Latest · 最新
          </div>
          <h2 className='ed-serif text-[22px] md:text-[26px] font-medium'>
            最近的文章
          </h2>
        </div>

        {/* 列表 */}
        <div className='flex flex-col gap-5 md:gap-6'>
          {posts.map(post => (
            <PostRow
              key={post.id || post.slug}
              post={post}
              cover={cover(post)}
              formatDate={formatDate}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============================================================
 * 单行卡 —— heo 风格
 *  - md+ : 12 列网格，图 5 / 文 7
 *  - 移动端：上图下文
 *
 *  ⚠️ 不要用 <a> 包 <article> —— HTML 不合法会导致 hydration 错误
 *  - 外层用 div.group
 *  - 标题、封面、阅读更多都用 SmartLink，点击区分别独立
 *  - tag 用 SmartLink + stopPropagation 阻止冒泡
 * ============================================================ */
function PostRow({ post, cover, formatDate }) {
  const href = post?.href || `/${post?.slug}`
  const category =
    post?.category && typeof post.category === 'object'
      ? post.category.name
      : post?.category
  const tags = Array.isArray(post?.tagItems) ? post.tagItems : []

  return (
    <article className='ed-card overflow-hidden md:flex md:flex-row md:h-52 group'>
      {/* 封面 —— 移动端全宽 + 16:9，桌面 5/12 */}
      <SmartLink
        href={href}
        className='block aspect-[16/9] md:aspect-auto md:w-5/12 overflow-hidden bg-[color:var(--ed-surface-soft)] no-underline border-0'>
        <LazyImage
          src={cover}
          alt={post.title}
          className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]'
        />
      </SmartLink>

      {/* 文案 —— 桌面 7/12，移动端 padding */}
      <div className='p-5 md:p-6 md:w-7/12 md:h-full flex flex-col justify-between'>
        <div>
          {/* 分类 + 日期 横排 chip */}
          <div className='flex items-center flex-wrap gap-2 mb-2.5'>
            {category && <span className='ed-chip'>{category}</span>}
            <span className='ed-num text-[11px] text-[color:var(--ed-text-faint)]'>
              {formatDate(post.publishDate || post.lastEditedDate)}
            </span>
          </div>

          {/* 标题 —— 独立 SmartLink，只显示一行 */}
          <h3 className='ed-clamp-1 ed-serif text-[18px] md:text-[20px] leading-[1.3] font-medium'>
            <SmartLink
              href={href}
              className='text-[color:var(--ed-text)] hover:text-[color:var(--ed-accent)] transition-colors no-underline border-0'>
              {post.title}
            </SmartLink>
          </h3>

          {/* 摘要 —— 最多 2 行，强制省略号，保证下方 tag 能展示 */}
          {post.summary && (
            <p className='ed-clamp-2 mt-2.5 hidden md:block text-[13px] text-[color:var(--ed-text-soft)] leading-[1.6] break-words'>
              {post.summary}
            </p>
          )}
        </div>

        {/* 标签横排 + 阅读更多 —— tag 样式（无胶囊边框）
         *  - 间距紧凑（gap-x-0 + 分隔符 mx-1.5）
         *  - 每个 #tag 是独立 SmartLink，hover 单个才变橙
         *  - onClick stopPropagation 避免冒泡 */}
        <div className='mt-3 md:mt-4 flex items-center justify-between flex-wrap gap-2'>
          <div className='flex flex-wrap items-center gap-x-0 text-[12px] text-[color:var(--ed-text-faint)]'>
            {tags.slice(0, 3).map((t, i) => (
              <span key={t.name} className='inline-flex items-center'>
                {i > 0 && (
                  <span className='mx-1.5 text-[color:var(--ed-rule)]'>·</span>
                )}
                <SmartLink
                  href={`/tag/${encodeURIComponent(t.name)}`}
                  onClick={e => e.stopPropagation()}
                  className='text-[color:var(--ed-text-faint)] hover:text-[color:var(--ed-accent)] no-underline border-0'>
                  #{t.name}
                </SmartLink>
              </span>
            ))}
          </div>
          <SmartLink
            href={href}
            className='text-[12px] text-[color:var(--ed-text-faint)] group-hover:text-[color:var(--ed-accent)] transition-colors inline-flex items-center gap-1.5 no-underline border-0'>
            阅读
            <span aria-hidden='true'>→</span>
          </SmartLink>
        </div>
      </div>
    </article>
  )
}

export default LatestArticles

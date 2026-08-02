import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { formatDateFmt } from '@/lib/utils/formatDate'

/**
 * 文章版权
 * 杂志风：克制小字
 */
const PostCopyright = ({ post }) => {
  const { locale } = useGlobal()
  const AUTHOR = siteConfig('AUTHOR')
  const LINK = siteConfig('LINK')
  const url = `${LINK || ''}${post?.href || ''}`

  if (!post) return null

  return (
    <div
      style={{
        fontSize: 12,
        lineHeight: 1.8,
        color: 'var(--ed-ink-faint)',
        padding: '16px 0',
        borderTop: '1px solid var(--ed-line)',
        borderBottom: '1px solid var(--ed-line)'
      }}>
      <div>
        文章作者：<span style={{ color: 'var(--ed-ink)' }}>{AUTHOR}</span>
      </div>
      <div>
        发表时间：
        <span className='ed-num'>
          {post.publishDate
            ? formatDateFmt(post.publishDate, 'yyyy-MM-dd HH:mm')
            : ''}
        </span>
      </div>
      <div>
        文章链接：
        <a
          href={url}
          style={{ color: 'var(--ed-accent)', wordBreak: 'break-all' }}>
          {url}
        </a>
      </div>
    </div>
  )
}

export default PostCopyright

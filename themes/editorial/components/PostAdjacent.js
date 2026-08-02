import SmartLink from '@/components/SmartLink'
import { useGlobal } from '@/lib/global'

/**
 * 上一篇 / 下一篇
 * 杂志风：克制双列
 */
const PostAdjacent = ({ post, prev, next }) => {
  const { locale } = useGlobal()
  if (!prev && !next) return null

  return (
    <div className='ed-article-adjacent'>
      {prev ? (
        <SmartLink href={prev.href} className='ed-adjacent-card'>
          <div className='ed-adjacent-label'>← 上一篇</div>
          <div className='ed-adjacent-title'>{prev.title}</div>
        </SmartLink>
      ) : (
        <span />
      )}
      {next ? (
        <SmartLink
          href={next.href}
          className='ed-adjacent-card'
          style={{ textAlign: 'right' }}>
          <div className='ed-adjacent-label'>下一篇 →</div>
          <div className='ed-adjacent-title'>{next.title}</div>
        </SmartLink>
      ) : (
        <span />
      )}
    </div>
  )
}

export default PostAdjacent

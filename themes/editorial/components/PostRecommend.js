import SmartLink from '@/components/SmartLink'
import { useGlobal } from '@/lib/global'
import { siteConfig } from '@/lib/config'
import { useRouter } from 'next/router'

/**
 * 文章推荐
 * 杂志风：克制卡片
 */
const PostRecommend = ({ latestPosts, siteInfo }) => {
  const { locale } = useGlobal()
  const router = useRouter()
  const currentId = router?.query?.slug

  const list = (latestPosts || [])
    .filter(p => p.id !== currentId && p.type === 'Post')
    .slice(0, 3)

  if (list.length === 0) return null

  return (
    <div style={{ marginTop: 48 }}>
      <div
        className='ed-side-block-title'
        style={{ marginBottom: 20 }}>
        相关阅读
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 16
        }}>
        {list.map(p => (
          <SmartLink
            key={p.id}
            href={p.href}
            className='ed-adjacent-card'>
            <div
              className='ed-adjacent-title'
              style={{ fontSize: 15, lineHeight: 1.5 }}>
              {p.title}
            </div>
          </SmartLink>
        ))}
      </div>
    </div>
  )
}

export default PostRecommend

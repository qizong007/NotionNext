import { useGlobal } from '@/lib/global'
import { useEffect, useRef, useState } from 'react'
import BlogPostCard from './BlogPostCard'
import BlogPostListEmpty from './BlogPostListEmpty'

/**
 * 滚动加载 - 杂志风
 * 不用就保持空态（POST_LIST_STYLE=page 时用 BlogPostListPage）
 */
const BlogPostListScroll = ({ posts = [], siteInfo }) => {
  const { NOTION_CONFIG } = useGlobal()
  const PAGE_SIZE = 10
  const [page, setPage] = useState(1)
  const [visible, setVisible] = useState(posts.slice(0, PAGE_SIZE))
  const sentinelRef = useRef(null)

  useEffect(() => {
    setVisible(posts.slice(0, PAGE_SIZE))
    setPage(1)
  }, [posts])

  useEffect(() => {
    if (!sentinelRef.current) return
    const obs = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          const next = page + 1
          const nextPosts = posts.slice(0, next * PAGE_SIZE)
          if (nextPosts.length > visible.length) {
            setVisible(nextPosts)
            setPage(next)
          }
        }
      },
      { rootMargin: '300px' }
    )
    obs.observe(sentinelRef.current)
    return () => obs.disconnect()
  }, [page, visible, posts])

  if (!posts || posts.length === 0) {
    return <BlogPostListEmpty />
  }

  return (
    <div id='container'>
      <div className='ed-posts'>
        {visible.map(post => (
          <BlogPostCard key={post.id} post={post} siteInfo={siteInfo} />
        ))}
      </div>
      <div ref={sentinelRef} style={{ height: 40 }} />
    </div>
  )
}

export default BlogPostListScroll

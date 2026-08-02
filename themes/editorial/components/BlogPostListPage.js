import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import CONFIG from '../config'
import BlogPostCard from './BlogPostCard'
import BlogPostListEmpty from './BlogPostListEmpty'
import PaginationNumber from './PaginationNumber'

/**
 * 文章列表 + 翻页
 * 杂志风：单列、左图右文
 */
const BlogPostListPage = ({ page = 1, posts = [], postCount, siteInfo }) => {
  const { NOTION_CONFIG } = useGlobal()
  const POSTS_PER_PAGE = siteConfig(
    'EDITORIAL_POSTS_PER_PAGE',
    siteConfig('POSTS_PER_PAGE', 10, NOTION_CONFIG),
    CONFIG
  )
  const totalPage = Math.ceil((postCount || 0) / POSTS_PER_PAGE)
  const showPagination = (postCount || 0) >= POSTS_PER_PAGE

  if (!posts || posts.length === 0 || page > totalPage) {
    return <BlogPostListEmpty />
  }

  return (
    <div id='container' className='w-full'>
      <div className='ed-posts'>
        {posts.map(post => (
          <BlogPostCard key={post.id} post={post} siteInfo={siteInfo} />
        ))}
      </div>

      {showPagination && <PaginationNumber page={page} totalPage={totalPage} />}
    </div>
  )
}

export default BlogPostListPage

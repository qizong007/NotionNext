import BlogPostCard from './BlogPostCard'
import PaginationNumber from './PaginationNumber'
import BlogPostListEmpty from './BlogPostListEmpty'
import { siteConfig } from '@/lib/config'
import { AdSlot } from '@/components/GoogleAdsense'

/**
 * 文章列表分页表格
 * @param page 当前页
 * @param posts 所有文章
 * @param tags 所有标签
 * @returns {JSX.Element}
 * @constructor
 */
const BlogPostListPage = ({ page = 1, posts = [], postCount, siteInfo }) => {
  const totalPage = Math.ceil(postCount / parseInt(siteConfig('POSTS_PER_PAGE')))
  const showPagination = postCount >= parseInt(siteConfig('POSTS_PER_PAGE'))
  if (!posts || posts.length === 0 || page > totalPage) {
    return <BlogPostListEmpty />
  } else {
    return (
      <div id="container" className='w-full'>
        {/* 文章列表 */}
        <div className="2xl:grid 2xl:grid-cols-2 grid-cols-1 gap-5">
          {posts?.map((post, index) => (
            <>
              <BlogPostCard index={posts.indexOf(post)} key={post.id} post={post} siteInfo={siteInfo} />
              {/* 每4篇文章后插入一个广告 */}
              {(index + 1) % 4 === 0 && index !== posts.length - 1 && (
                <div className="col-span-2 my-4">
                  <AdSlot type='flow' />
                </div>
              )}
            </>
          ))}
        </div>

        {showPagination && <PaginationNumber page={page} totalPage={totalPage} />}

        {/* 底部广告 */}
        <div className="w-full my-8">
          <AdSlot type='native' />
        </div>
      </div>
    )
  }
}

export default BlogPostListPage

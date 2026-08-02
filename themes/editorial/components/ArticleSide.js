import ArticleInfo from './ArticleInfo'
import Catalog from './Catalog'

/**
 * 文章详情页右侧栏
 * 需求：文章信息不悬浮（跟着文章一起被划走），目录悬浮固定
 * 实现：外层不做 sticky；目录自身做 sticky
 */
const ArticleSide = ({ post }) => {
  if (!post) return null

  return (
    <aside className='ed-article-side'>
      <ArticleInfo post={post} />
      {post.toc && post.toc.length > 0 && (
        <div className='ed-toc-sticky-wrap'>
          <Catalog toc={post.toc} />
        </div>
      )}
    </aside>
  )
}

export default ArticleSide

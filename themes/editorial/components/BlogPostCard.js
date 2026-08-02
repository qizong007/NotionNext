import LazyImage from '@/components/LazyImage'
import SmartLink from '@/components/SmartLink'
import { siteConfig } from '@/lib/config'
import { formatDateFmt } from '@/lib/utils/formatDate'
import CONFIG from '../config'

/**
 * 文章列表卡片 - 杂志风
 * 图左文右，封面 16:9
 * 标题最多 1 行，摘要最多 2 行（CSS line-clamp）
 * 标签 tag 样式，hover 时只高亮鼠标指向的那一个
 */
const BlogPostCard = ({ post, siteInfo }) => {
  const cover =
    post?.pageCoverThumbnail ||
    (siteConfig('EDITORIAL_POST_LIST_COVER_DEFAULT', true, CONFIG)
      ? siteInfo?.pageCover
      : null)

  const showCover = siteConfig('EDITORIAL_POST_LIST_COVER', true, CONFIG)
  const showSummary = siteConfig('EDITORIAL_POST_LIST_SUMMARY', true, CONFIG)

  return (
    <article className='ed-post'>
      {showCover && cover && (
        <SmartLink
          href={post?.href || '#'}
          className='ed-post-cover-wrap'
          aria-label={post?.title}>
          <div className='ed-post-cover'>
            <LazyImage
              src={cover}
              alt={post?.title || ''}
              className='ed-post-cover-img'
            />
          </div>
        </SmartLink>
      )}

      <div className='ed-post-body'>
        <div className='ed-post-meta'>
          {post?.publishDate && (
            <span className='ed-post-date'>
              {formatDateFmt(post.publishDate, 'yyyy.MM.dd')}
            </span>
          )}
          {post?.category && (
            <SmartLink
              href={`/category/${encodeURIComponent(post.category)}`}
              className='ed-post-category'>
              {post.category}
            </SmartLink>
          )}
        </div>

        <SmartLink href={post?.href || '#'}>
          <h2 className='ed-post-title'>{post?.title}</h2>
        </SmartLink>

        {showSummary && post?.summary && (
          <p className='ed-post-summary'>{post.summary}</p>
        )}

        {post?.tagItems && post.tagItems.length > 0 && (
          <div className='ed-post-tags'>
            {post.tagItems.map(tag => (
              <SmartLink
                key={tag.name}
                href={`/tag/${encodeURIComponent(tag.name)}`}
                className='ed-tag'>
                #{tag.name}
              </SmartLink>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}

export default BlogPostCard

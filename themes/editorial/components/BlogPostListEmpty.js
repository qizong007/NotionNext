/**
 * 列表为空
 * 杂志风：克制文案
 */
const BlogPostListEmpty = () => {
  return (
    <div
      className='ed-empty'
      style={{
        padding: '80px 0',
        textAlign: 'center',
        color: 'var(--ed-ink-faint)',
        fontSize: 14,
        letterSpacing: '0.05em'
      }}>
      还没有文章
    </div>
  )
}

export default BlogPostListEmpty

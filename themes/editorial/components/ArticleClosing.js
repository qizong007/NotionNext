/**
 * 文章结尾语
 * 一句优雅的「感谢你阅读到这里」，配合细线 / 衬线字 / 英文小字副标
 * 替代原先的「文章作者 / 时间 / 链接 / 分享 / 上下篇」整块
 */
const ArticleClosing = () => {
  return (
    <div className='ed-article-closing' aria-label='文章结尾'>
      <span className='ed-article-closing-rule' />
      <p className='ed-article-closing-text'>感谢你阅读到这里</p>
      <p className='ed-article-closing-sub'>Thank you for reading.</p>
      <span className='ed-article-closing-rule' />
    </div>
  )
}

export default ArticleClosing

import SmartLink from '@/components/SmartLink'
import { useRouter } from 'next/router'

/**
 * 数字翻页
 * 模仿 heo 翻页：上一页 / 数字页 / 下一页 + 跳转
 * 杂志风样式：克制边框，hover 陶土橙，当前页墨黑反白
 */
const PaginationNumber = ({ page, totalPage }) => {
  const router = useRouter()
  const currentPage = +page
  const showNext = page < totalPage
  const showPrev = currentPage !== 1

  const pagePrefix = router.asPath
    .split('?')[0]
    .replace(/\/page\/[1-9]\d*/, '')
    .replace(/\/$/, '')
    .replace('.html', '')

  const pages = generatePages(pagePrefix, page, currentPage, totalPage)

  return (
    <div className='ed-pagination'>
      {/* 上一页 */}
      {showPrev ? (
        <SmartLink
          href={{
            pathname:
              currentPage === 2
                ? `${pagePrefix}/`
                : `${pagePrefix}/page/${currentPage - 1}`,
            query: router.query.s ? { s: router.query.s } : {}
          }}
          rel='prev'
          className='ed-page ed-page-arrow'>
          <i className='fa-solid fa-arrow-left' style={{ fontSize: 12 }} />
          <span>上一页</span>
        </SmartLink>
      ) : (
        <span className='ed-page is-disabled ed-page-arrow'>
          <i className='fa-solid fa-arrow-left' style={{ fontSize: 12 }} />
          <span>上一页</span>
        </span>
      )}

      {/* 中间页码 */}
      <div className='ed-pagination-pages'>{pages}</div>

      {/* 下一页 */}
      {showNext ? (
        <SmartLink
          href={{
            pathname: `${pagePrefix}/page/${currentPage + 1}`,
            query: router.query.s ? { s: router.query.s } : {}
          }}
          rel='next'
          className='ed-page ed-page-arrow'>
          <span>下一页</span>
          <i className='fa-solid fa-arrow-right' style={{ fontSize: 12 }} />
        </SmartLink>
      ) : (
        <span className='ed-page is-disabled ed-page-arrow'>
          <span>下一页</span>
          <i className='fa-solid fa-arrow-right' style={{ fontSize: 12 }} />
        </span>
      )}
    </div>
  )
}

function getPageElement(page, currentPage, pagePrefix) {
  if (!page) return null
  const selected = page + '' === currentPage + ''
  return (
    <SmartLink
      key={page}
      href={page === 1 ? `${pagePrefix}/` : `${pagePrefix}/page/${page}`}
      className={`ed-page ${selected ? 'is-active' : ''}`}>
      {page}
    </SmartLink>
  )
}

function generatePages(pagePrefix, page, currentPage, totalPage) {
  const pages = []
  const groupCount = 7

  if (totalPage <= groupCount) {
    for (let i = 1; i <= totalPage; i++) {
      pages.push(getPageElement(i, page, pagePrefix))
    }
  } else {
    pages.push(getPageElement(1, page, pagePrefix))
    const dynamicGroupCount = groupCount - 2
    let startPage = currentPage - 2
    if (startPage <= 1) startPage = 2
    if (startPage + dynamicGroupCount > totalPage) {
      startPage = totalPage - dynamicGroupCount
    }
    if (startPage > 2) {
      pages.push(
        <span key='dots-start' className='ed-page-dots'>
          …
        </span>
      )
    }
    for (let i = 0; i < dynamicGroupCount; i++) {
      if (startPage + i < totalPage) {
        pages.push(getPageElement(startPage + i, page, pagePrefix))
      }
    }
    if (startPage + dynamicGroupCount < totalPage) {
      pages.push(
        <span key='dots-end' className='ed-page-dots'>
          …
        </span>
      )
    }
    pages.push(getPageElement(totalPage, page, pagePrefix))
  }
  return pages
}

export default PaginationNumber

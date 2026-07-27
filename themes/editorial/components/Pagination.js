import { useRouter } from 'next/router'
import { useState } from 'react'
import { useGlobal } from '@/lib/global'
import SmartLink from '@/components/SmartLink'
import CONFIG from '../config'

/* ============================================================
 * 数字翻页 —— 模仿 themes/heo/components/PaginationNumber
 *
 * Props 约定（跟 heo 一致）：
 *  - page       当前页码
 *  - totalPage  总页数
 *
 * 链接：
 *  - 上一页：currentPage === 2 时跳到「/」；否则跳到「/page/N」
 *  - 下一页：跳到「/page/N」
 *  - 首页按钮：跳到「/」
 *  - 跳转页码：输入框 + 双右箭头按钮
 *
 * 视觉：editorial 三色（米白 / 墨黑 / 陶土橙），8px 圆角，1px 边框
 * ============================================================ */
const PaginationNumber = ({ page, totalPage }) => {
  const router = useRouter()
  const { locale } = useGlobal()
  const currentPage = +page || 1
  const showNext = currentPage < totalPage
  const showPrev = currentPage !== 1

  // 跟 heo 完全一致的 pagePrefix 解析：
  //  - 去掉 ?query
  //  - 去掉 /page/N
  //  - 去掉末尾 /
  //  - 去掉 .html
  // 这样跳转按钮可以适配任意路径前缀（首页 /、搜索 /search?s=x 等）
  const pagePrefix = router.asPath
    .split('?')[0]
    .replace(/\/page\/[1-9]\d*/, '')
    .replace(/\/$/, '')
    .replace('.html', '')

  // 保留 search query（如 ?s=xxx）
  const extraQuery = router.query.s ? { s: router.query.s } : {}

  const pages = generatePages(pagePrefix, page, currentPage, totalPage)

  // 跳到指定页 —— 跟 heo 一致
  const [value, setValue] = useState('')
  const handleInputChange = e => {
    setValue(e.target.value.replace(/[^0-9]/g, ''))
  }
  const jumpToPage = () => {
    if (!value) return
    const target = parseInt(value, 10)
    if (target < 1 || target > totalPage) return
    router.push(target === 1 ? `${pagePrefix}/` : `${pagePrefix}/page/${target}`)
  }

  return (
    <>
      {/* 桌面端 —— 跟 heo 一样的布局：左 | 中间页码+跳转 | 右 */}
      <div className='hidden md:flex justify-between items-center mt-10 md:mt-12 font-medium duration-200 pt-3 gap-3'>
        {/* 上一页 */}
        <SmartLink
          href={{
            pathname:
              currentPage === 2
                ? `${pagePrefix}/`
                : `${pagePrefix}/page/${currentPage - 1}`,
            query: extraQuery
          }}
          rel='prev'
          className={showPrev ? 'block' : 'invisible'}>
          <div className='ed-card relative w-28 h-10 flex items-center transition-all duration-200 justify-center py-2 px-2 cursor-pointer group overflow-hidden'>
            <i className='transition-all duration-200 transform group-hover:-translate-x-3 mr-2'>
              ←
            </i>
            <span className='absolute translate-x-6 ml-2 opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-2 text-[13px]'>
              {locale?.PAGINATION?.PREV || '上页'}
            </span>
          </div>
        </SmartLink>

        {/* 中间：页码 + 跳转 */}
        <div className='flex items-center gap-1.5'>
          {pages}

          {/* 跳到指定页 —— 跟 heo 一样的 hover 展开输入框 */}
          <div className='ed-card h-10 flex justify-center items-center group transition-all duration-200 overflow-hidden'>
            <input
              value={value}
              onChange={handleInputChange}
              onKeyDown={e => e.key === 'Enter' && jumpToPage()}
              placeholder=''
              inputMode='numeric'
              className='w-0 group-hover:w-20 group-focus-within:w-20 group-hover:px-3 group-focus-within:px-3 transition-all duration-200 bg-transparent border-none outline-none h-full text-[12px] text-[color:var(--ed-text)]'
            />
            <button
              type='button'
              onClick={jumpToPage}
              aria-label='跳到指定页'
              className='cursor-pointer hover:text-[color:var(--ed-accent)] px-3 h-full inline-flex items-center justify-center transition-colors'>
              <span className='text-[14px] tracking-tight'>»</span>
            </button>
          </div>
        </div>

        {/* 下一页 */}
        <SmartLink
          href={{
            pathname: `${pagePrefix}/page/${currentPage + 1}`,
            query: extraQuery
          }}
          rel='next'
          className={showNext ? 'block' : 'invisible'}>
          <div className='ed-card relative w-28 h-10 flex items-center transition-all duration-200 justify-center py-2 px-2 cursor-pointer group overflow-hidden'>
            <span className='absolute -translate-x-6 ml-2 opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:-translate-x-2 text-[13px]'>
              {locale?.PAGINATION?.NEXT || '下页'}
            </span>
            <i className='transition-all duration-200 transform group-hover:translate-x-3 ml-2'>
              →
            </i>
          </div>
        </SmartLink>
      </div>

      {/* 移动端 —— 跟 heo 一样，上下页各占一半 */}
      <div className='md:hidden w-full flex flex-row mt-8 gap-3'>
        <SmartLink
          href={{
            pathname:
              currentPage === 2
                ? `${pagePrefix}/`
                : `${pagePrefix}/page/${currentPage - 1}`,
            query: extraQuery
          }}
          rel='prev'
          className={`${showPrev ? 'flex' : 'hidden'} relative flex-1 h-12 items-center justify-center ed-card text-[13px]`}>
          ← {locale?.PAGINATION?.PREV || '上页'}
        </SmartLink>

        {showPrev && showNext && <div className='w-2' />}

        <SmartLink
          href={{
            pathname: `${pagePrefix}/page/${currentPage + 1}`,
            query: extraQuery
          }}
          rel='next'
          className={`${showNext ? 'flex' : 'hidden'} relative flex-1 h-12 items-center justify-center ed-card text-[13px]`}>
          {locale?.PAGINATION?.NEXT || '下页'} →
        </SmartLink>
      </div>
    </>
  )
}

/* ============================================================
 * 单个页码按钮 —— 跟 heo 的 getPageElement 同结构
 * ============================================================ */
function getPageElement(page, currentPage, pagePrefix) {
  const selected = page + '' === currentPage + ''
  if (!page) return <></>
  return (
    <SmartLink
      href={page === 1 ? `${pagePrefix}/` : `${pagePrefix}/page/${page}`}
      key={page}
      passHref
      className={[
        'ed-card min-w-[40px] h-10 px-3 inline-flex items-center justify-center',
        'text-[13px] transition-colors duration-200',
        selected
          ? 'text-[color:var(--ed-bg)] bg-[color:var(--ed-text)] border-[color:var(--ed-text)] font-medium'
          : 'text-[color:var(--ed-text-soft)] hover:text-[color:var(--ed-accent)] hover:border-[color:var(--ed-accent)]'
      ].join(' ')}>
      {page}
    </SmartLink>
  )
}

/* ============================================================
 * 构造页码列表 —— 跟 heo 的 generatePages 同算法
 *  - 总页 <= 7：全列
 *  - 总页 > 7：1 + 中间 5（当前 ± 2） + 末位 + 省略号
 * ============================================================ */
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
        <div
          key='ellipsis-start'
          className='inline-flex items-center justify-center min-w-[24px] h-10 text-[13px] text-[color:var(--ed-text-faint)]'>
          …
        </div>
      )
    }
    for (let i = 0; i < dynamicGroupCount; i++) {
      if (startPage + i < totalPage) {
        pages.push(getPageElement(startPage + i, page, pagePrefix))
      }
    }
    if (startPage + dynamicGroupCount < totalPage) {
      pages.push(
        <div
          key='ellipsis-end'
          className='inline-flex items-center justify-center min-w-[24px] h-10 text-[13px] text-[color:var(--ed-text-faint)]'>
          …
        </div>
      )
    }
    pages.push(getPageElement(totalPage, page, pagePrefix))
  }
  return pages
}

export default PaginationNumber

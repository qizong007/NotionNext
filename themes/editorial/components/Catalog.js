import { uuidToId } from 'notion-utils'
import { useEffect, useRef, useState } from 'react'

/* ============================================================
 * 文章页目录 —— 模仿 themes/heo/components/Catalog
 *
 *  - 接受 NotionNext 算好的 toc: [{ id (UUID), text, indentLevel }, ...]
 *  - 关键：anchor hash 必须用 uuidToId() 转换（去 dash）
 *    跟 react-notion-x 渲染 heading 时设的 id 匹配
 *  - 点击 anchor 滚到对应 heading（preventDefault + scrollIntoView）
 *  - 滚动监听当前可见的 section，accent 橙色高亮
 *  - editorial 风格：细体 12-13px，缩进 12px/级
 * ============================================================ */
const Catalog = ({ toc }) => {
  const [activeId, setActiveId] = useState(null)
  const activeIdRef = useRef(null)

  // 滚动监听 —— 当前可见的 section
  useEffect(() => {
    if (!toc || toc.length === 0) return

    const sections = document.getElementsByClassName('notion-h')
    if (!sections || sections.length === 0) return

    let throttleTimer = null
    const actionSectionScrollSpy = () => {
      if (throttleTimer) return
      throttleTimer = setTimeout(() => {
        throttleTimer = null
        let prevBBox = null
        let currentSectionId = activeIdRef.current
        for (let i = 0; i < sections.length; ++i) {
          const section = sections[i]
          if (!section) continue
          const id = section.getAttribute('data-id')
          if (!id) continue
          if (!currentSectionId) {
            currentSectionId = id
          }
          const bbox = section.getBoundingClientRect()
          const prevHeight = prevBBox ? bbox.top - prevBBox.bottom : 0
          const offset = Math.max(150, prevHeight / 4)
          if (bbox.top - offset < 0) {
            currentSectionId = id
            prevBBox = bbox
            continue
          }
          break
        }
        if (currentSectionId && currentSectionId !== activeIdRef.current) {
          activeIdRef.current = currentSectionId
          setActiveId(currentSectionId)
        }
      }, 150)
    }

    window.addEventListener('scroll', actionSectionScrollSpy, { passive: true })
    actionSectionScrollSpy()
    return () => {
      window.removeEventListener('scroll', actionSectionScrollSpy)
      if (throttleTimer) clearTimeout(throttleTimer)
    }
  }, [toc])

  // 点击 anchor —— 阻止浏览器原生 hash 跳转，用 scrollIntoView 平滑滚动
  const handleClick = (e, id) => {
    e.preventDefault()
    const target = document.getElementById(id)
    if (target) {
      const top = target.getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({ top, behavior: 'smooth' })
      // 主动更新 active
      activeIdRef.current = id
      setActiveId(id)
      // 更新 hash（不触发滚动）
      if (typeof window !== 'undefined' && window.history) {
        window.history.replaceState(null, '', `#${id}`)
      }
    }
  }

  if (!toc || toc.length === 0) {
    return null
  }

  return (
    <nav className='ed-card p-5 w-full max-h-[60vh] overflow-y-auto overscroll-contain'>
      {/* 标题 */}
      <div className='flex items-center gap-2 mb-3 pb-2 border-b border-[color:var(--ed-rule-soft)]'>
        <svg
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
          className='w-[14px] h-[14px] text-[color:var(--ed-text-faint)]'>
          <line x1='8' y1='6' x2='21' y2='6' />
          <line x1='8' y1='12' x2='21' y2='12' />
          <line x1='8' y1='18' x2='21' y2='18' />
          <circle cx='4' cy='6' r='1' fill='currentColor' />
          <circle cx='4' cy='12' r='1' fill='currentColor' />
          <circle cx='4' cy='18' r='1' fill='currentColor' />
        </svg>
        <span className='text-[11px] tracking-[0.16em] uppercase text-[color:var(--ed-text-faint)]'>
          目录
        </span>
      </div>

      {/* 目录列表 */}
      <ul className='flex flex-col gap-1.5'>
        {toc.map((item, idx) => {
          // ⚠️ 关键：anchor hash 用 uuidToId() 转换，跟 react-notion-x 渲染 heading 时设的 id 匹配
          const id = uuidToId(item.id)
          const isActive = activeId === id
          const level = Math.max(0, (item.indentLevel || 0) - 1)
          return (
            <li key={`${id}-${idx}`} style={{ marginLeft: level * 12 }}>
              <a
                href={`#${id}`}
                onClick={e => handleClick(e, id)}
                className={`block text-[12.5px] leading-[1.55] py-0.5 transition-colors border-0 no-underline cursor-pointer ${
                  isActive
                    ? 'text-[color:var(--ed-accent)] font-medium'
                    : 'text-[color:var(--ed-text-soft)] hover:text-[color:var(--ed-text)]'
                }`}>
                {item.text}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default Catalog

import { uuidToId } from 'notion-utils'
import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * 目录
 * 悬浮固定（依赖外层 .ed-article-side 的 sticky）
 * 点击跳转 + 滚动时高亮当前段
 */
const Catalog = ({ toc }) => {
  const [activeId, setActiveId] = useState(null)
  const tRef = useRef(null)
  const tocIds = useRef([])

  // 收集所有 toc id
  useEffect(() => {
    if (!toc) return
    tocIds.current = toc.map(t => uuidToId(t.id))
  }, [toc])

  // 滚动联动 - 高亮当前 section
  useEffect(() => {
    if (!toc || toc.length === 0) return

    let raf
    const handleScroll = () => {
      if (raf) cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const sections = document.getElementsByClassName('notion-h')
        if (sections.length === 0) return

        const scrollTop = window.scrollY
        // offset = sticky nav 高度 + 一点余量
        // 太大 → 用户读 S2 时高亮的还是 S1（off-by-one 的感觉）
        // 这里用 viewport 顶部往上 8% 的位置作为「当前」分界点：
        // 哪个 section 的 top 最接近「视口顶部 + 一点点」谁就是当前
        const triggerLine = scrollTop + window.innerHeight * 0.08

        let currentId = tocIds.current[0]
        for (let i = 0; i < sections.length; i++) {
          const sec = sections[i]
          if (!(sec instanceof Element)) continue
          const top = sec.getBoundingClientRect().top + scrollTop
          if (top <= triggerLine) {
            currentId = sec.getAttribute('data-id')
          } else {
            break
          }
        }
        setActiveId(currentId)

        // 自动滚动目录到对应位置
        if (tRef.current && currentId) {
          const idx = tocIds.current.indexOf(currentId)
          if (idx >= 0) {
            const item = tRef.current.children[idx]
            if (item) {
              const itemTop = item.offsetTop
              const containerScroll = tRef.current.scrollTop
              const containerHeight = tRef.current.clientHeight
              if (
                itemTop < containerScroll ||
                itemTop > containerScroll + containerHeight - 40
              ) {
                tRef.current.scrollTo({
                  top: itemTop - 20,
                  behavior: 'smooth'
                })
              }
            }
          }
        }
      })
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [toc])

  const handleClick = useCallback((e, id) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (el) {
      const top =
        el.getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }, [])

  if (!toc || toc.length < 1) return null

  return (
    <div className='ed-side-block'>
      <div className='ed-side-block-title'>目录</div>
      <ul
        className='ed-toc'
        ref={tRef}
        style={{ maxHeight: '60vh', overflowY: 'auto' }}>
        {toc.map(tocItem => {
          const id = uuidToId(tocItem.id)
          const level = Math.min(tocItem.indentLevel || 0, 2)
          return (
            <li
              key={id}
              className={`ed-toc-item is-l${level + 1} ${
                activeId === id ? 'is-active' : ''
              }`}
              onClick={e => handleClick(e, id)}>
              <span
                style={{
                  display: 'inline-block',
                  maxWidth: '100%',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}>
                {tocItem.text}
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Catalog

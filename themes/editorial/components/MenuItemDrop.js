import SmartLink from '@/components/SmartLink'
import { useState } from 'react'

/**
 * 单个菜单项
 * 关键点：
 * 1. 只有鼠标移上去的那一项才高亮（用 onMouseEnter 单独追踪 activeIndex）
 * 2. 子菜单整体作为 absolute 浮层，鼠标移到主菜单时整组展开
 */
const MenuItemDrop = ({ link }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSub, setActiveSub] = useState(-1)
  const hasSubMenu = link?.subMenus?.length > 0

  if (!link || link.show === false) {
    return null
  }

  // 主菜单 hover 状态
  const handleEnter = () => {
    setIsOpen(true)
  }
  const handleLeave = () => {
    setIsOpen(false)
    setActiveSub(-1)
  }

  return (
    <div
      className='ed-menu-item-wrap'
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{ position: 'relative', display: 'inline-block' }}>
      {/* 主菜单项（无子菜单时为可点击链接） */}
      {!hasSubMenu ? (
        <SmartLink
          href={link?.href || '#'}
          target={link?.target}
          className='ed-menu-item'>
          {link?.icon && (
            <i
              className={`ed-menu-icon ${link.icon}`}
              aria-hidden='true'
            />
          )}
          <span>{link?.name}</span>
        </SmartLink>
      ) : (
        <span className={`ed-menu-item ${isOpen ? 'is-active' : ''}`}>
          {link?.icon && (
            <i
              className={`ed-menu-icon ${link.icon}`}
              aria-hidden='true'
            />
          )}
          <span>{link?.name}</span>
        </span>
      )}

      {/* 子菜单 */}
      {hasSubMenu && (
        <ul
          className='ed-submenu'
          style={{
            position: 'absolute',
            top: '100%',
            left: '50%',
            transform: isOpen
              ? 'translateX(-50%) translateY(0)'
              : 'translateX(-50%) translateY(8px)',
            opacity: isOpen ? 1 : 0,
            visibility: isOpen ? 'visible' : 'hidden',
            pointerEvents: isOpen ? 'auto' : 'none',
            transition: 'all 200ms ease',
            background: 'var(--ed-bg)',
            border: '1px solid var(--ed-line)',
            minWidth: '180px',
            padding: '8px 0',
            zIndex: 60,
            listStyle: 'none',
            margin: 0
          }}>
          {link.subMenus.map((sLink, idx) => (
            <li
              key={idx}
              onMouseEnter={() => setActiveSub(idx)}
              onMouseLeave={() => setActiveSub(-1)}>
              <SmartLink
                href={sLink.href || '#'}
                target={sLink.target || link?.target}
                className='ed-submenu-item'
                style={{
                  color:
                    activeSub === idx
                      ? 'var(--ed-accent)'
                      : 'var(--ed-ink-soft)',
                  background:
                    activeSub === idx ? 'var(--ed-accent-soft)' : 'transparent',
                  display: 'block',
                  padding: '8px 18px',
                  fontSize: '13px',
                  whiteSpace: 'nowrap',
                  transition: 'all 200ms ease'
                }}>
                {sLink.icon && (
                  <i
                    className={`ed-menu-icon ${sLink.icon}`}
                    aria-hidden='true'
                    style={{ marginRight: '6px', opacity: 0.6 }}
                  />
                )}
                {sLink.title || sLink.name}
              </SmartLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default MenuItemDrop

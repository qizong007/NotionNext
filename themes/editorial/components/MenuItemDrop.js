import SmartLink from '@/components/SmartLink'
import { useState } from 'react'

/* ============================================================
 * 单个菜单项 —— 模仿 themes/heo/components/MenuItemDrop
 *
 *  - 没有 subMenus：就是普通链接
 *  - 有 subMenus：父项只显示名字（不跳转），hover 展开子菜单
 *
 * 视觉：editorial 三色，8px 圆角，1px 浅灰边框
 *
 * ⚠️ Hover 行为约定：
 *  - 父菜单 hover：父项文字变橙（accent），子菜单全部不高亮
 *  - 子菜单 hover：只有鼠标所在的那一个变橙
 *  - 实现要点：父 div 不带 transition-colors，子菜单 ul 显式 break inheritance
 * ============================================================ */
export const MenuItemDrop = ({ link }) => {
  const [show, changeShow] = useState(false)
  const hasSubMenu = link?.subMenus?.length > 0

  if (!link || !link.show) {
    return null
  }

  return (
    <div
      onMouseEnter={() => changeShow(true)}
      onMouseLeave={() => changeShow(false)}
      className='relative'>
      {/* 不含子菜单 —— 普通链接（不要 icon） */}
      {!hasSubMenu && (
        <SmartLink
          target={link?.target}
          href={link?.href}
          className='px-3 h-9 inline-flex items-center text-[13px] md:text-[14px] text-[color:var(--ed-text-soft)] hover:text-[color:var(--ed-accent)] tracking-wide'>
          {link?.name}
        </SmartLink>
      )}

      {/* 含子菜单 —— 父项只显示名字（不要 icon），hover 展开
         *  父 div 不带 transition-colors，避免 color transition 副作用
         *  子菜单 ul 显式 text-soft 颜色，break inheritance */}
      {hasSubMenu && (
        <>
          <div
            className='cursor-default px-3 h-9 inline-flex items-center text-[13px] md:text-[14px] text-[color:var(--ed-text-soft)] hover:text-[color:var(--ed-accent)] rounded-[6px] hover:bg-[color:var(--ed-surface-soft)]'>
            <span>{link?.name}</span>
            <svg
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='1.5'
              className='w-3 h-3 ml-1.5 opacity-60'>
              <path d='M6 9l6 6 6-6' />
            </svg>
          </div>

          {/* 子菜单展开区 */}
          {show && (
            <ul
              style={{ backdropFilter: 'blur(8px)' }}
              className='ed-card visible opacity-100 top-full mt-1 pointer-events-auto absolute left-0 min-w-[200px] py-2 z-30 text-[color:var(--ed-text-soft)]'>
              {link.subMenus.map((sLink, index) => (
                <li key={index}>
                  <SmartLink
                    href={sLink.href}
                    target={link?.target}
                    className='flex items-center gap-2 px-4 py-2 text-[13px] text-[color:var(--ed-text-soft)] hover:text-[color:var(--ed-accent)] no-underline border-0'>
                    {sLink?.icon && (
                      <i className={`${sLink?.icon} flex-shrink-0`} />
                    )}
                    {sLink.title || sLink.name}
                  </SmartLink>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  )
}

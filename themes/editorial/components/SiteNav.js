import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import CONFIG from '../config'
import { MenuItemDrop } from './MenuItemDrop'

/* ============================================================
 * 顶部导航 —— 模仿 themes/heo/components/MenuListTop
 *
 * 数据源（按 heo 同款优先级）：
 *  1. EDITORIAL_NAV（主题自带，fallback）—— 简单平铺
 *  2. props.customMenu（Notion 数据库 Menu + SubMenu）—— 支持父菜单 hover 展开
 *  3. props.customNav（Notion 普通 nav pages）—— 简单平铺
 *
 * 只要 Notion 里有「类型=Menu」的数据，就自动接管；
 * 没有的话才用 EDITORIAL_NAV。
 * ============================================================ */
export const MenuListTop = props => {
  const { customNav, customMenu } = props
  const { locale } = useGlobal()

  // 跟 heo 一样：如果没开自定义菜单，就用主题自带的 EDITORIAL_NAV
  // （theme 自己的 nav 都是平铺，没 subMenus）
  const useThemeNav = !customMenu || customMenu.length === 0

  let links = []
  if (useThemeNav) {
    const themeNav = siteConfig('EDITORIAL_NAV', CONFIG.EDITORIAL_NAV, CONFIG)
    links = (themeNav || []).map(item => ({
      name: item.label,
      href: item.href,
      show: true
    }))
    // 没 Notion menu 的时候，customNav 拼在后面（普通 nav pages）
    if (customNav && customNav.length > 0) {
      links = links.concat(customNav)
    }
  } else {
    // 用了 Notion menu：customMenu 已经按 Menu/SubMenu 结构分组好了
    // Notion 那边 Menu 类型已经包含了所有顶级项，customNav 不应该再拼
    // （否则会出现友链、关于我 重复两次）
    links = customMenu
  }

  if (!links || links.length === 0) {
    return null
  }

  return (
    <nav
      id='nav-menu'
      className='leading-9 justify-end font-light w-full flex flex-wrap items-center gap-0'>
      {links?.map(
        (link, index) => link && link.show && <MenuItemDrop key={index} link={link} />
      )}
    </nav>
  )
}

const SiteNav = props => {
  const brand = siteConfig('EDITORIAL_BRAND', CONFIG.EDITORIAL_BRAND, CONFIG)

  return (
    <header className='w-full'>
      <div className='max-w-[1400px] mx-auto px-6 md:px-10 pt-6 md:pt-8'>
        <nav className='flex items-center justify-between flex-wrap gap-y-3'>
          {/* 字标 */}
          <a
            href='/'
            className='ed-serif text-[20px] md:text-[22px] tracking-tight text-[color:var(--ed-text)] hover:text-[color:var(--ed-accent)] transition-colors font-medium'>
            {brand}
            <span className='ed-accent'>.</span>
          </a>

          {/* 菜单 + 搜索 */}
          <div className='flex items-center gap-3 md:gap-5'>
            <div className='hidden md:flex items-center'>
              <MenuListTop {...props} />
            </div>
            {/* 搜索图标 —— 走 heo 自带的搜索抽屉 */}
            <a
              href='/search'
              aria-label='搜索'
              className='inline-flex items-center justify-center w-8 h-8 text-[color:var(--ed-text-soft)] hover:text-[color:var(--ed-accent)] transition-colors'>
              <svg
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='w-5 h-5'>
                <circle cx='11' cy='11' r='7' />
                <path d='M21 21l-4.3-4.3' />
              </svg>
            </a>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default SiteNav

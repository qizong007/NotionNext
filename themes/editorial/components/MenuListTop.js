import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import MenuItemDrop from './MenuItemDrop'

/**
 * 顶部菜单 - 编辑器风格
 * 直接读取 Notion 菜单，含子菜单
 */
const MenuListTop = ({ customNav, customMenu, router }) => {
  const { locale } = useGlobal()

  // 基础菜单项（仅在没有 Notion 自定义菜单时作为兜底）
  const baseLinks = [
    {
      id: 1,
      name: locale?.NAV?.INDEX || '首页',
      href: '/',
      icon: '',
      show: siteConfig('EDITORIAL_MENU_INDEX', true)
    },
    {
      id: 2,
      name: locale?.NAV?.ARCHIVE || '归档',
      href: '/archive',
      icon: '',
      show: siteConfig('EDITORIAL_MENU_ARCHIVE', true)
    }
  ]

  let links = customNav ? baseLinks.concat(customNav) : baseLinks

  // 开启 CUSTOM_MENU 时优先用 Notion 自定义菜单（含子菜单结构）
  if (siteConfig('CUSTOM_MENU') && customMenu && customMenu.length > 0) {
    links = customMenu
  }

  if (!links || links.length === 0) {
    return null
  }

  return (
    <>
      {links
        .filter(link => link && link.show !== false)
        .map((link, idx) => (
          <MenuItemDrop key={idx} link={link} router={router} />
        ))}
    </>
  )
}

export default MenuListTop

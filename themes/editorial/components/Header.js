import { useRouter } from 'next/router'
import Logo from './Logo'
import SearchButton from './SearchButton'
import MenuList from './MenuListTop'

/**
 * 顶部导航
 * 字标 + 菜单（含子菜单 hover 展开，只高亮当前指向项） + 搜索 icon
 * 桌面端无汉堡菜单
 *
 * 关键：customMenu/customNav 来自 getStaticProps 注入的 pageProps
 * global context 不会暴露这两个字段，所以必须从 props 透传
 */
const Header = props => {
  const router = useRouter()

  return (
    <header className='ed-nav'>
      <div className='ed-container ed-nav-inner'>
        {/* 字标 */}
        <Logo />

        {/* 中间菜单 */}
        <nav
          className='ed-menu'
          id='nav-menu'
          aria-label='主菜单'>
          <MenuList {...props} router={router} />
        </nav>

        {/* 右侧操作 */}
        <div className='ed-nav-right'>
          <SearchButton />
        </div>
      </div>
    </header>
  )
}

export default Header

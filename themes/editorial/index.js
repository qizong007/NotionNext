/**
 * Editorial 主题
 *
 * 首页 7 段严格顺序：
 *  1. 顶部导航（LayoutBase 内）
 *  2. 公告栏（LayoutBase 内，禁止删除）
 *  3. Hero（半屏 5:5）
 *  4. 渠道数据条（一行紧凑横条）
 *  5. 最新文章 + 右侧个人卡片
 *  6. 翻页
 *  7. 页脚（LayoutBase 内）
 *
 * /page/[N] 走 LayoutPostList = 只渲染 5+6（不含 Hero 和 ChannelBar）
 *
 * 视觉：三色（米白/墨黑/陶土橙）、8px 圆角、1px 浅灰边框、
 *       区块之间用留白分隔，不用通栏横线
 */

import NotionPage from '@/components/NotionPage'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { useRouter } from 'next/router'
import { Transition } from '@headlessui/react'
import Catalog from './components/Catalog'
import Hero from './components/Hero'
import LatestArticles from './components/LatestArticles'
import NoticeBar from './components/NoticeBar'
import Pagination from './components/Pagination'
import PostSidebar from './components/PostSidebar'
import SiteFooter from './components/SiteFooter'
import SiteNav from './components/SiteNav'
import { Style } from './style'
import CONFIG from './config'

/* ============================================================
 * 基础布局
 * ============================================================ */
const LayoutBase = props => {
  const { children, className } = props
  const { onLoading } = useGlobal()

  return (
    <div
      id='theme-editorial'
      className={`min-h-screen flex flex-col ${className || ''}`}>
      <Style />

      <SiteNav {...props} />
      <NoticeBar />

      <main className='flex-1 w-full'>
        <Transition
          show={!onLoading}
          appear={true}
          enter='transition-opacity duration-500'
          enterFrom='opacity-0'
          enterTo='opacity-100'>
          {children}
        </Transition>
      </main>

      <SiteFooter />
    </div>
  )
}

/* ============================================================
 * 首页 —— 严格 7 段（精选和分类条合并到 nav）
 * ============================================================ */
const LayoutIndex = props => {
  return (
    <>
      <Hero {...props} />
      <MainArea {...props} />
    </>
  )
}

/* ============================================================
 * 主区：满宽文章列表
 *  - 列表里只显示 POSTS_PER_PAGE 篇（首页切片）；其余通过 /page/N 翻页
 *  - Pagination 跟 heo BlogPostListPage 一样接收 page + totalPage
 *
 *  ⚠️ 重要：NotionNext 的 /page/[N] 已经在 getStaticProps 里
 *  把 posts 切到当前页了；只有首页 / 才传全部 posts。
 *  这里根据 router.pathname 判断，避免二次切片把列表切空。
 * ============================================================ */
const MainArea = props => {
  const router = useRouter()
  const { postCount, NOTION_CONFIG, page = 1 } = props
  const POSTS_PER_PAGE = siteConfig(
    'POSTS_PER_PAGE',
    12,
    NOTION_CONFIG || CONFIG
  )
  const currentPage = parseInt(page, 10) || 1
  const totalPage = Math.ceil((postCount || 0) / POSTS_PER_PAGE)
  const allPosts = props.posts || []
  // 首页（/）：传过来的是全部 posts，需要切前 POSTS_PER_PAGE
  // /page/[N]：传过来的已经是当前页的 posts，不要再切
  const isPaginatedRoute = router.asPath.startsWith('/page/')
  const slicedPosts = isPaginatedRoute
    ? allPosts
    : allPosts.slice(0, POSTS_PER_PAGE)

  return (
    <section className='w-full'>
      <div className='max-w-[1200px] mx-auto px-6 md:px-10'>
        <LatestArticles posts={slicedPosts} />
        {/* 跟 heo BlogPostListPage 一致：postCount >= POSTS_PER_PAGE 才显示翻页 */}
        {(postCount || 0) >= POSTS_PER_PAGE && (
          <Pagination page={currentPage} totalPage={totalPage} />
        )}
      </div>
    </section>
  )
}

/* ============================================================
 * 文章详情 —— claude blog + heo SideRight 风格
 *  - 容器 max-w-[1400px]，让 sidebar 离视口右边更近（跟搜索 icon 对齐）
 *  - flex 布局：主列 720px + sidebar 240px
 *  - sidebar 内部：
 *      上：PostSidebar 普通文档流，跟文章一起被划走
 *      下：Catalog (TOC) sticky top-8 悬浮固定
 *  - 移动：单列（sidebar 移到文章下方）
 * ============================================================ */
const LayoutSlug = props => {
  const { post, lock, validPassword } = props
  const { fullWidth } = useGlobal()

  return (
    <article className='w-full'>
      <div className='max-w-[1400px] mx-auto px-6 md:px-10 pt-10 md:pt-16 pb-24'>
        <div className='flex flex-col lg:flex-row gap-6 lg:gap-10 lg:items-stretch lg:justify-center'>
          {/* —— 主列 —— 720px 居左 */}
          <div className='min-w-0 w-full lg:w-[720px] flex-shrink-0'>
            {post && (
              <header className='mb-10 md:mb-14'>
                {post?.category && (
                  <div className='text-[11px] tracking-[0.2em] uppercase text-[color:var(--ed-text-faint)] mb-4'>
                    {typeof post.category === 'object'
                      ? post.category.name
                      : post.category}
                  </div>
                )}
                <h1 className='ed-serif text-[32px] md:text-[44px] font-medium leading-[1.15] tracking-tight'>
                  {post.title}
                </h1>
                {post.summary && (
                  <p className='mt-6 text-[16px] md:text-[17px] leading-[1.7] text-[color:var(--ed-text-soft)]'>
                    {post.summary}
                  </p>
                )}
              </header>
            )}

            {lock ? (
              <div className='text-center text-[color:var(--ed-text-soft)] py-20 ed-serif'>
                🔒 这是一篇受密码保护的文章
              </div>
            ) : (
              <NotionPage post={post} />
            )}
          </div>

          {/* —— 右侧 sidebar
           *  ⚠️ lg:items-stretch 让 aside 跟主列同高
           *  这样内部 sticky 元素才有空间跟随滚动
           *
           *  结构：
           *  - PostSidebar 普通文档流（不 sticky，跟文章一起被划走）
           *  - Catalog sticky top-8 悬浮固定（仅在有 toc 时显示） */}
          {post && !lock && (
            <aside className='hidden lg:block w-[240px] flex-shrink-0'>
              {/* 上：说明区块（不 sticky） */}
              <PostSidebar post={post} />

              {/* 下：目录（sticky 悬浮） */}
              {post.toc && post.toc.length > 0 && (
                <div className='sticky top-8 mt-8'>
                  <Catalog toc={post.toc} />
                </div>
              )}
            </aside>
          )}
        </div>

        {/* 移动端：sidebar 移到文章下方 */}
        {post && !lock && (
          <div className='lg:hidden mt-12 max-w-[720px] mx-auto'>
            <PostSidebar post={post} />
          </div>
        )}
      </div>
    </article>
  )
}

/* ============================================================
 * 其余 Layout —— 占位，避免站点跳页崩溃
 * ============================================================ */
const LayoutPostList = props => <MainArea {...props} />

const LayoutSearch = () => (
  <div className='max-w-[680px] mx-auto px-6 pt-20 pb-24'>
    <h1 className='ed-serif text-[40px] font-medium mb-6'>搜索</h1>
  </div>
)

const LayoutArchive = () => (
  <div className='max-w-[680px] mx-auto px-6 pt-20 pb-24'>
    <h1 className='ed-serif text-[40px] font-medium'>归档</h1>
  </div>
)

const LayoutCategoryIndex = () => (
  <div className='max-w-[680px] mx-auto px-6 pt-20 pb-24'>
    <h1 className='ed-serif text-[40px] font-medium'>分类</h1>
  </div>
)

const LayoutTagIndex = () => (
  <div className='max-w-[680px] mx-auto px-6 pt-20 pb-24'>
    <h1 className='ed-serif text-[40px] font-medium'>标签</h1>
  </div>
)

const Layout404 = () => (
  <div className='max-w-[680px] mx-auto px-6 pt-32 pb-24 text-center'>
    <div className='ed-serif text-[120px] md:text-[180px] leading-none text-[color:var(--ed-text-faint)] font-medium'>
      404
    </div>
    <h1 className='ed-serif text-[28px] md:text-[36px] font-medium mt-6'>
      这里没有内容
    </h1>
    <a
      href='/'
      className='inline-block mt-8 ed-link text-[14px]'>
      ← 回到首页
    </a>
  </div>
)

export {
  CONFIG as THEME_CONFIG,
  Layout404,
  LayoutArchive,
  LayoutBase,
  LayoutCategoryIndex,
  LayoutIndex,
  LayoutPostList,
  LayoutSearch,
  LayoutSlug,
  LayoutTagIndex
}

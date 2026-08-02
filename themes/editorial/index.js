/**
 * Editorial 主题
 * 杂志风：暖白底 / 墨黑字 / 陶土橙强调
 * 大留白、衬线大标题、克制排版
 *
 * 1. 开启方式：在 blog.config.js 将主题配置为 `editorial`
 * 2. 数据层 / Notion 集成逻辑均复用 NotionNext 默认实现，本主题只重构表现层
 */

import Comment from '@/components/Comment'
import LoadingCover from '@/components/LoadingCover'
import replaceSearchResult from '@/components/Mark'
import NotionPage from '@/components/NotionPage'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { isBrowser } from '@/lib/utils'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import ArticleSide from './components/ArticleSide'
import BlogPostListPage from './components/BlogPostListPage'
import BlogPostListScroll from './components/BlogPostListScroll'
import CONFIG from './config'
import Footer from './components/Footer'
import Header from './components/Header'
import Hero from './components/Hero'
import NoticeBar from './components/NoticeBar'
import Projects from './components/Projects'
import { PostLock } from './components/PostLock'
import { Style } from './style'
import ArticleClosing from './components/ArticleClosing'

/**
 * 基础布局
 * 顶部导航 + 公告条（仅首页） + Hero（仅首页） + 内容 + 页脚
 */
const LayoutBase = props => {
  const { children, slotTop } = props
  const router = useRouter()
  const isHome = router?.route === '/'

  return (
    <div
      id='theme-editorial'
      className='min-h-screen flex flex-col scroll-smooth'
      style={{ background: 'var(--ed-bg)' }}>
      <Style />

      {/* 顶部导航 */}
      <Header {...props} />

      {/* 公告条 + Hero + 我的项目 - 只在首页显示 */}
      {isHome && (
        <>
          <NoticeBar {...props} />
          <Hero {...props} />
          <Projects />
          {/* Projects 和最新文章列表之间的分割线：
              古典杂志风 — 细线 + 中心小方块装饰，不喧宾夺主 */}
          <div className='ed-container ed-divider-ornate-wrap'>
            <div className='ed-divider-ornate' aria-hidden='true'>
              <span className='ed-divider-line' />
              <span className='ed-divider-diamond' />
              <span className='ed-divider-line' />
            </div>
          </div>
        </>
      )}

      {/* 主内容 */}
      <main className='flex-grow w-full'>{children}</main>

      {/* 页脚 */}
      <Footer {...props} />

      {siteConfig('EDITORIAL_LOADING_COVER', false, CONFIG) && <LoadingCover />}
    </div>
  )
}

/**
 * 首页 - 最新文章列表
 * 顶部加一个左对齐的 LATEST·最新 / 最近的文章 段落标题
 */
const LayoutIndex = props => {
  return (
    <div className='ed-container ed-section'>
      <div className='ed-list-section-header'>
        <div className='ed-list-section-eyebrow'>LATEST · 最新</div>
        <h2 className='ed-list-section-title'>最近的文章</h2>
      </div>
      {siteConfig('POST_LIST_STYLE') === 'page' ? (
        <BlogPostListPage {...props} />
      ) : (
        <BlogPostListScroll {...props} />
      )}
    </div>
  )
}

/**
 * 博客列表
 */
const LayoutPostList = props => {
  return (
    <div className='ed-container ed-section'>
      {siteConfig('POST_LIST_STYLE') === 'page' ? (
        <BlogPostListPage {...props} />
      ) : (
        <BlogPostListScroll {...props} />
      )}
    </div>
  )
}

/**
 * 搜索
 */
const LayoutSearch = props => {
  const { keyword } = props
  const router = useRouter()
  const currentSearch = keyword || router?.query?.s

  useEffect(() => {
    if (currentSearch && typeof window !== 'undefined') {
      setTimeout(() => {
        try {
          replaceSearchResult({
            doms: document.getElementsByClassName('replace'),
            search: currentSearch,
            target: {
              element: 'span',
              className: 'text-[var(--ed-accent)] border-b border-dashed'
            }
          })
        } catch (e) {
          // ignore
        }
      }, 100)
    }
  }, [currentSearch])

  return (
    <div className='ed-container ed-section'>
      <div
        className='ed-section-header'
        style={{ marginTop: 0 }}>
        <h2 className='ed-section-title'>
          搜索 · <span className='ed-num'>{currentSearch || ''}</span>
        </h2>
        <span className='ed-section-sub'>SEARCH</span>
      </div>
      {siteConfig('POST_LIST_STYLE') === 'page' ? (
        <BlogPostListPage {...props} />
      ) : (
        <BlogPostListScroll {...props} />
      )}
    </div>
  )
}

/**
 * 归档
 */
const LayoutArchive = ({ archivePosts, posts }) => {
  // 简单按年月分组
  const grouped = {}
  const list = posts || []
  list.forEach(p => {
    if (!p?.publishDate) return
    const d = new Date(p.publishDate)
    const key = `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}`
    if (!grouped[key]) grouped[key] = []
    grouped[key].push(p)
  })
  const keys = Object.keys(grouped).sort().reverse()

  return (
    <div className='ed-container ed-section'>
      <div
        className='ed-section-header'
        style={{ marginTop: 0 }}>
        <h2 className='ed-section-title'>归档</h2>
        <span className='ed-section-sub'>ARCHIVE</span>
      </div>
      <div>
        {keys.length === 0 && (
          <p style={{ color: 'var(--ed-ink-faint)' }}>暂无归档</p>
        )}
        {keys.map(k => (
          <div
            key={k}
            id={k}
            style={{
              marginBottom: 40,
              borderBottom: '1px solid var(--ed-line)',
              paddingBottom: 24
            }}>
            <h3
              className='ed-serif'
              style={{ fontSize: 22, marginBottom: 16, color: 'var(--ed-ink)' }}>
              {k}
            </h3>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: 10
              }}>
              {grouped[k].map(p => (
                <li
                  key={p.id}
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: 16,
                    fontSize: 14
                  }}>
                  <a
                    href={p.href}
                    style={{
                      color: 'var(--ed-ink)',
                      flex: 1,
                      borderBottom: '1px solid transparent',
                      transition: 'all 200ms ease'
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--ed-accent)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--ed-ink)')}>
                    {p.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

/**
 * 文章详情
 */
const LayoutSlug = props => {
  const { post, lock, validPassword } = props
  const router = useRouter()
  const waiting404 = siteConfig('POST_WAITING_TIME_FOR_404') * 1000

  useEffect(() => {
    if (!post) {
      setTimeout(() => {
        if (isBrowser) {
          const article = document.querySelector(
            '#article-wrapper #notion-article'
          )
          if (!article) {
            router.push('/404')
          }
        }
      }, waiting404)
    }
  }, [post])

  const commentEnable =
    siteConfig('COMMENT_TWIKOO_ENV_ID') ||
    siteConfig('COMMENT_WALINE_SERVER_URL') ||
    siteConfig('COMMENT_VALINE_APP_ID') ||
    siteConfig('COMMENT_GISCUS_REPO') ||
    siteConfig('COMMENT_CUSDIS_APP_ID') ||
    siteConfig('COMMENT_UTTERRANCES_REPO') ||
    siteConfig('COMMENT_GITALK_CLIENT_ID') ||
    siteConfig('COMMENT_WEBMENTION_ENABLE')

  return (
    <>
      {/* 文章锁 */}
      {lock && <PostLock validPassword={validPassword} />}

      {!lock && post && (
        <div className='ed-article-wrap'>
          <article className='ed-article' id='article-wrapper'>
            <h1 className='ed-article-title'>{post.title}</h1>

            <div className='ed-article-meta'>
              {post.publishDate && (
                <span>
                  发布于{' '}
                  <span className='ed-meta-num'>
                    {formatDateSimple(post.publishDate)}
                  </span>
                </span>
              )}
              {post.readTime > 0 && (
                <span>
                  约 <span className='ed-meta-num'>{post.readTime}</span> 分钟阅读
                </span>
              )}
              {post.wordCount > 0 && (
                <span>
                  <span className='ed-meta-num'>{post.wordCount}</span> 字
                </span>
              )}
            </div>

            {post.pageCover && (
              <div className='ed-article-cover'>
                <img src={post.pageCover} alt={post.title} />
              </div>
            )}

            <div className='ed-article-body'>
              <NotionPage post={post} />
            </div>

            {/* 优雅的结尾语，代替原先的版权 / 分享 / 上下篇 */}
            {siteConfig('EDITORIAL_ARTICLE_CLOSING', true, CONFIG) && (
              <ArticleClosing />
            )}

            {/* 评论区 */}
            {siteConfig('EDITORIAL_COMMENTS', true, CONFIG) && commentEnable && (
              <div className='ed-comments'>
                <h3 className='ed-comments-title'>评论</h3>
                <Comment frontMatter={post} />
              </div>
            )}
          </article>

          <ArticleSide post={post} />
        </div>
      )}
    </>
  )
}

/**
 * 404
 */
const Layout404 = props => {
  return (
    <div
      className='ed-container ed-section'
      style={{
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 24,
        textAlign: 'center'
      }}>
      <h1
        className='ed-serif'
        style={{
          fontSize: 96,
          fontWeight: 700,
          margin: 0,
          letterSpacing: '-0.04em',
          color: 'var(--ed-accent)'
        }}>
        404
      </h1>
      <p style={{ color: 'var(--ed-ink-soft)', fontSize: 15 }}>
        页面找不到了 · 或许它被搬走了
      </p>
      <a
        href='/'
        className='ed-page'
        style={{ display: 'inline-flex' }}>
        回到首页
      </a>
    </div>
  )
}

/**
 * 分类列表
 */
const LayoutCategoryIndex = ({ categoryOptions }) => {
  return (
    <div className='ed-container ed-section'>
      <div
        className='ed-section-header'
        style={{ marginTop: 0 }}>
        <h2 className='ed-section-title'>分类</h2>
        <span className='ed-section-sub'>CATEGORIES</span>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: 12
        }}>
        {categoryOptions?.map(c => (
          <a
            key={c.name}
            href={`/category/${encodeURIComponent(c.name)}`}
            className='ed-tag'
            style={{
              padding: '12px 16px',
              fontSize: 14,
              justifyContent: 'space-between',
              display: 'flex',
              alignItems: 'center'
            }}>
            <span>{c.name}</span>
            <span
              className='ed-num'
              style={{ color: 'var(--ed-ink-faint)', fontSize: 13 }}>
              {c.count}
            </span>
          </a>
        ))}
      </div>
    </div>
  )
}

/**
 * 标签列表
 */
const LayoutTagIndex = ({ tagOptions }) => {
  return (
    <div className='ed-container ed-section'>
      <div
        className='ed-section-header'
        style={{ marginTop: 0 }}>
        <h2 className='ed-section-title'>标签</h2>
        <span className='ed-section-sub'>TAGS</span>
      </div>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 8
        }}>
        {tagOptions?.map(t => (
          <a
            key={t.name}
            href={`/tag/${encodeURIComponent(t.name)}`}
            className='ed-tag'
            style={{ fontSize: 13 }}>
            <span>#{t.name}</span>
            <span
              className='ed-num'
              style={{ color: 'var(--ed-ink-faint)', marginLeft: 6 }}>
              {t.count}
            </span>
          </a>
        ))}
      </div>
    </div>
  )
}

// ===== 工具 =====
function formatDateSimple(ts) {
  const d = new Date(ts)
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}.${m}.${day}`
}

export {
  Layout404,
  LayoutArchive,
  LayoutBase,
  LayoutCategoryIndex,
  LayoutIndex,
  LayoutPostList,
  LayoutSearch,
  LayoutSlug,
  LayoutTagIndex,
  CONFIG as THEME_CONFIG
}

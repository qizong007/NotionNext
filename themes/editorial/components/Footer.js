import { siteConfig } from '@/lib/config'
import CONFIG from '../config'

/**
 * 页脚
 * 版权 + 建站天数 + 备案 + RSS
 * 杂志风：克制，单行居中
 * 全程用 · 隔开，节奏统一
 */
const Footer = () => {
  const BEI_AN = siteConfig('BEI_AN')
  const BEI_AN_LINK = siteConfig('BEI_AN_LINK')
  const SINCE = siteConfig('SINCE') || new Date().getFullYear()
  const AUTHOR = siteConfig('AUTHOR') || '王帅真'
  const TITLE = siteConfig('TITLE') || 'Blog'
  const enableRSS =
    siteConfig('ENABLE_RSS') && siteConfig('EDITORIAL_RSS_IN_FOOTER', true, CONFIG)

  const currentYear = new Date().getFullYear()
  // 防止和 AUTHOR 重复展示
  const showTitle = TITLE && TITLE !== AUTHOR

  // 建站天数：参考 heo 主题做法（HEO_SITE_CREATE_TIME）
  // editorial 用 EDITORIAL_SITE_CREATE_TIME，未配置则不显示
  const createTimeStr = siteConfig('EDITORIAL_SITE_CREATE_TIME', null, CONFIG)
  let siteDays = null
  if (createTimeStr) {
    const target = new Date(createTimeStr)
    const today = new Date()
    const diffMs = today.getTime() - target.getTime()
    // 跟 heo 保持一致：用 ceil（满 1 天就算 1 天）
    siteDays = Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)))
  }

  return (
    <footer className='ed-footer'>
      <div className='ed-container ed-footer-inner'>
        <div className='ed-footer-row'>
          <span>
            © {SINCE}–{currentYear} {AUTHOR}
          </span>
          {showTitle && (
            <>
              <span className='ed-footer-divider'>·</span>
              <span>{TITLE}</span>
            </>
          )}
          {siteDays != null && (
            <>
              <span className='ed-footer-divider'>·</span>
              <span>已运行 <span className='ed-num'>{siteDays.toLocaleString('en-US')}</span> 天</span>
            </>
          )}
        </div>

        <div className='ed-footer-row'>
          {BEI_AN && (
            <>
              <a
                href={BEI_AN_LINK || '#'}
                target='_blank'
                rel='noreferrer'>
                <i className='fa-solid fa-shield-halved' style={{ marginRight: 4 }} />
                {BEI_AN}
              </a>
              <span className='ed-footer-divider'>·</span>
            </>
          )}
          {enableRSS && (
            <a
              href='/rss/feed.xml'
              target='_blank'
              rel='noreferrer'
              className='ed-footer-rss'>
              <i className='fa-solid fa-rss' /> RSS
            </a>
          )}
        </div>
      </div>
    </footer>
  )
}

export default Footer

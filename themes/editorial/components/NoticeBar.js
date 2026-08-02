import { siteConfig } from '@/lib/config'
import CONFIG from '../config'

/**
 * 公告条 - 运营位
 * 极简：胶囊式 NOW 标签 + 横向滚动
 * 读取 EDITORIAL_NOTICE_BAR（数组）
 */
const NoticeBar = () => {
  let notices = siteConfig('EDITORIAL_NOTICE_BAR', null, CONFIG)

  // 兼容字符串
  if (typeof notices === 'string') {
    try {
      notices = JSON.parse(notices)
    } catch (e) {
      notices = []
    }
  }

  if (!notices || notices.length === 0) {
    return null
  }

  // 横向无限滚动：复制一份形成连续滚动
  const items = [...notices, ...notices]

  return (
    <div className='ed-notice'>
      <div className='ed-container ed-notice-inner'>
        <span className='ed-notice-label'>NOW</span>
        <div className='ed-notice-track'>
          <div className='ed-notice-track-inner'>
            {items.map((n, i) => (
              <span className='ed-notice-item' key={i}>
                {n.url ? (
                  <a
                    href={n.url}
                    target={n.url.startsWith('http') ? '_blank' : '_self'}
                    rel='noreferrer'>
                    {n.title}
                  </a>
                ) : (
                  <span>{n.title}</span>
                )}
                <span className='ed-notice-divider'>·</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default NoticeBar

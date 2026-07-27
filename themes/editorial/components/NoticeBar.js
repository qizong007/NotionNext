import { siteConfig } from '@/lib/config'
import SmartLink from '@/components/SmartLink'
import CONFIG from '../config'

/**
 * 公告栏 —— 顶部导航正下方一条细横栏
 *  - 读取 config 里的 EDITORIAL_NOTICES
 *  - 可滚动（marquee 无限循环，hover 暂停）
 *  - 样式克制：左 NOW 小标签 + 右滚动文本
 *  - 这是运营位，禁止删除
 */
const NoticeBar = () => {
  const notices = siteConfig(
    'EDITORIAL_NOTICES',
    CONFIG.EDITORIAL_NOTICES,
    CONFIG
  )
  if (!notices || notices.length === 0) return null

  // 把列表展开成一长串，再用 CSS marquee 滚动
  // 双份拼接实现无缝循环
  const list = notices.concat(notices)

  return (
    <div className='w-full'>
      <div className='max-w-[1200px] mx-auto px-6 md:px-10'>
        <div className='flex items-center gap-3 md:gap-4 h-9 overflow-hidden'>
          <span className='flex-shrink-0 inline-flex items-center gap-1.5 text-[10px] tracking-[0.2em] uppercase text-[color:var(--ed-text-faint)] border border-[color:var(--ed-rule)] rounded-full px-2.5 py-0.5'>
            <span className='inline-block w-1.5 h-1.5 rounded-full bg-[color:var(--ed-accent)]' />
            Now
          </span>
          <div className='flex-1 overflow-hidden relative'>
            <div className='ed-marquee ed-marquee-pause text-[13px] text-[color:var(--ed-text-soft)]'>
              {list.map((n, i) => (
                <span key={i} className='inline-flex items-center pr-12'>
                  {n.url ? (
                    <SmartLink
                      href={n.url}
                      className='hover:text-[color:var(--ed-accent)] transition-colors'>
                      {n.text}
                    </SmartLink>
                  ) : (
                    <span>{n.text}</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NoticeBar

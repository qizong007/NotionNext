import { BeiAnGongAn } from '@/components/BeiAnGongAn'
import CopyRightDate from '@/components/CopyRightDate'
import PoweredBy from '@/components/PoweredBy'
import { siteConfig } from '@/lib/config'
import SmartLink from '@/components/SmartLink'
import CONFIG from '../config'

/* ============================================================
 * 页脚 —— 模仿 themes/heo/components/Footer
 *
 * 结构（跟 heo 同款）：
 *  - 左：版权 + 建站时间 + 备案（BEI_AN 工信部 + BeiAnGongAn 公安）
 *  - 右：PoweredBy + RSS
 * ============================================================ */
const SiteFooter = () => {
  const brand = siteConfig('EDITORIAL_BRAND', CONFIG.EDITORIAL_BRAND, CONFIG)
  const BEI_AN = siteConfig('BEI_AN')
  const BEI_AN_LINK = siteConfig('BEI_AN_LINK')
  // 建站时间：可配 EDITORIAL_SINCE，不配则用当前年 - 2
  const SINCE =
    siteConfig('EDITORIAL_SINCE', '2021-07-02', CONFIG) || '2021-07-02'
  const year = new Date().getFullYear()

  // 已运行天数
  const daysSince = () => {
    const start = new Date(SINCE)
    if (isNaN(start.getTime())) return null
    const diff = Date.now() - start.getTime()
    return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)))
  }
  const days = daysSince()

  return (
    <footer className='w-full mt-16 md:mt-20 border-t border-[color:var(--ed-rule-soft)]'>
      <div className='max-w-[1200px] mx-auto px-6 md:px-10 py-8 md:py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[12px] text-[color:var(--ed-text-faint)]'>
        {/* 左：版权 + 建站时间 + 备案 */}
        <div className='flex flex-col gap-2'>
          <div className='flex items-center gap-2 flex-wrap'>
            <CopyRightDate />
            <span>·</span>
            <a
              href='/about'
              className='ed-serif font-medium text-[color:var(--ed-text-soft)] hover:text-[color:var(--ed-accent)] transition-colors'>
              {brand}
            </a>
            <span className='ed-accent'>.</span>
            <span>All rights reserved.</span>
          </div>

          {/* 建站时间 —— 参考 heo，常见形式：建站于 YYYY-MM-DD / 已运行 N 天 */}
          <div className='flex items-center gap-2 flex-wrap ed-num'>
            <svg
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='w-3.5 h-3.5 text-[color:var(--ed-text-faint)]'>
              <path d='M12 8v4l3 2' />
              <circle cx='12' cy='12' r='9' />
            </svg>
            <span>建站于 {SINCE}</span>
            {days !== null && (
              <>
                <span className='text-[color:var(--ed-rule)]'>·</span>
                <span>已运行 {days.toLocaleString('en-US')} 天</span>
              </>
            )}
          </div>

          {/* 备案信息 —— 跟 heo 同款：工信部 BEI_AN + 公安部 BeiAnGongAn */}
          <div className='flex items-center gap-3 flex-wrap'>
            {BEI_AN && (
              <a
                href={BEI_AN_LINK || '#'}
                target='_blank'
                rel='noreferrer noopener'
                className='inline-flex items-center gap-1.5 hover:text-[color:var(--ed-accent)] transition-colors'>
                <svg
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='w-3.5 h-3.5'>
                  <path d='M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z' />
                </svg>
                <span>{BEI_AN}</span>
              </a>
            )}
            <BeiAnGongAn />
          </div>
        </div>

        {/* 右：PoweredBy + RSS */}
        <div className='flex items-center gap-5'>
          <PoweredBy />
          <span className='inline-block w-px h-3 bg-[color:var(--ed-rule)]' />
          <SmartLink
            href='/feed'
            className='inline-flex items-center gap-1.5 hover:text-[color:var(--ed-accent)] transition-colors'>
            <svg
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='w-3.5 h-3.5'>
              <path d='M4 11a9 9 0 0 1 9 9' />
              <path d='M4 4a16 16 0 0 1 16 16' />
              <circle cx='5' cy='19' r='1.5' fill='currentColor' />
            </svg>
            <span>RSS</span>
          </SmartLink>
        </div>
      </div>
    </footer>
  )
}

export default SiteFooter

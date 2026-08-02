import SmartLink from '@/components/SmartLink'

/**
 * Editorial 主题字标
 * 纯文字，衬线体，黑色 + 末尾橙色「.」
 * 颜色全部交给 CSS（避免 hover 时整段都变色）
 */
const Logo = () => {
  return (
    <div className='ed-logo'>
      <SmartLink href='/'>
        <span>qizong007</span>
        <span className='ed-logo-dot'>.</span>
      </SmartLink>
    </div>
  )
}

export default Logo

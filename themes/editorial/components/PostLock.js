import { useGlobal } from '@/lib/global'
import { useEffect, useRef } from 'react'

/**
 * 文章密码锁
 */
export const PostLock = props => {
  const { validPassword } = props
  const { locale } = useGlobal()
  const submitPassword = () => {
    const p = document.getElementById('password')
    if (!validPassword(p?.value)) {
      const tips = document.getElementById('tips')
      if (tips) {
        tips.innerHTML = ''
        tips.innerHTML = `<div style='color: var(--ed-accent)'>${locale.COMMON.PASSWORD_ERROR}</div>`
      }
    }
  }
  const passwordInputRef = useRef(null)
  useEffect(() => {
    passwordInputRef.current?.focus()
  }, [])

  return (
    <div
      className='ed-container'
      style={{
        padding: '120px 24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 16
      }}>
      <div
        className='ed-serif'
        style={{ fontSize: 24, color: 'var(--ed-ink)' }}>
        文章已加密
      </div>
      <input
        id='password'
        ref={passwordInputRef}
        type='password'
        onKeyDown={e => e.key === 'Enter' && submitPassword()}
        style={{
          width: 240,
          padding: '10px 14px',
          border: '1px solid var(--ed-line)',
          background: 'var(--ed-bg)',
          color: 'var(--ed-ink)',
          fontSize: 14,
          outline: 'none',
          textAlign: 'center'
        }}
      />
      <div id='tips'></div>
      <button
        onClick={submitPassword}
        className='ed-page'
        style={{ cursor: 'pointer', background: 'var(--ed-ink)', color: 'var(--ed-bg)', borderColor: 'var(--ed-ink)' }}>
        {locale.COMMON.SUBMIT}
      </button>
    </div>
  )
}

export default PostLock

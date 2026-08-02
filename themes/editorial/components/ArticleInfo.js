import SmartLink from '@/components/SmartLink'
import { useGlobal } from '@/lib/global'
import { formatDateFmt } from '@/lib/utils/formatDate'
import { useState } from 'react'

/**
 * 文章信息（侧栏上方块）
 * 杂志感条目：图标 + 中文 label + value
 * 包含：分类 / 标签 / 复制链接
 * 不悬浮，跟着文章一起被划走
 */
const ArticleInfo = ({ post }) => {
  const { locale } = useGlobal()
  const [copied, setCopied] = useState(false)
  if (!post) return null

  const shareUrl =
    typeof window !== 'undefined' ? window.location.href : post.href || ''

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch (e) {
      // ignore
    }
  }

  // 行：图标 + label + value
  const rows = []

  if (post.category) {
    rows.push({
      key: 'category',
      icon: 'fa-regular fa-lightbulb',
      label: '分类',
      value: (
        <SmartLink href={`/category/${encodeURIComponent(post.category)}`}>
          {post.category}
        </SmartLink>
      )
    })
  }

  if (post.tagItems && post.tagItems.length > 0) {
    rows.push({
      key: 'tags',
      icon: 'fa-solid fa-tag',
      label: '标签',
      value: (
        <div className='ed-side-info-tags'>
          {post.tagItems.map(tag => (
            <SmartLink
              key={tag.name}
              href={`/tag/${encodeURIComponent(tag.name)}`}
              className='ed-tag'>
              #{tag.name}
            </SmartLink>
          ))}
        </div>
      )
    })
  }

  // 分享：就一个虚线下划线的「复制链接」四字；点击复制
  rows.push({
    key: 'copy',
    icon: 'fa-solid fa-share-nodes',
    label: '分享',
    value: (
      <span
        className='ed-side-info-copy-link'
        onClick={handleCopy}
        role='button'
        tabIndex={0}
        onKeyDown={e => (e.key === 'Enter' ? handleCopy() : null)}>
        {copied ? '✓ 已复制' : '复制链接'}
      </span>
    )
  })

  return (
    <div className='ed-side-block'>
      <div className='ed-side-block-title'>文章信息</div>
      <div className='ed-side-info'>
        {rows.map(r => (
          <div className='ed-side-info-row' key={r.key}>
            <i className={`ed-side-info-icon ${r.icon}`} aria-hidden='true' />
            <div className='ed-side-info-content'>
              <div className='ed-side-info-label'>{r.label}</div>
              <div className='ed-side-info-value'>{r.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ArticleInfo

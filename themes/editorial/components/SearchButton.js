import { siteConfig } from '@/lib/config'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useRef } from 'react'

const AlgoliaSearchModal = dynamic(
  () => import('@/components/AlgoliaSearchModal'),
  { ssr: false }
)

/**
 * 搜索 icon
 */
export default function SearchButton() {
  const router = useRouter()
  const searchModal = useRef(null)

  function handleSearch() {
    if (siteConfig('ALGOLIA_APP_ID')) {
      searchModal.current.openSearch()
    } else {
      router.push('/search')
    }
  }

  return (
    <>
      <span
        onClick={handleSearch}
        title='搜索'
        aria-label='搜索'
        className='ed-search-btn'>
        <i className='fa-solid fa-magnifying-glass' />
      </span>
      <AlgoliaSearchModal cRef={searchModal} />
    </>
  )
}

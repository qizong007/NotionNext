import { render } from '@testing-library/react'
import { renderToString } from 'react-dom/server.node'
import ExternalPlugins from '@/components/ExternalPlugins'

jest.mock('@/lib/config', () => ({
  siteConfig: (key, fallback = null) => {
    if (key === 'ANALYTICS_BAIDU_ID') return 'test-baidu-id'
    if (key === 'CAN_COPY') return true
    return fallback
  }
}))
jest.mock('@/lib/global', () => ({ useGlobal: () => ({ lang: 'zh-CN' }) }))
jest.mock('@/lib/utils', () => ({
  isBrowser: true,
  loadExternalResource: jest.fn().mockResolvedValue(undefined)
}))
jest.mock('@/lib/db/notion/convertInnerUrl', () => ({ convertInnerUrl: jest.fn() }))
jest.mock('@/components/GlobalStyle', () => ({ GlobalStyle: () => null }))
jest.mock('@/components/GoogleAdsense', () => ({ initGoogleAdsense: jest.fn() }))

it('loads Baidu analytics after hydration without a script in the server tree', () => {
  expect(renderToString(<ExternalPlugins NOTION_CONFIG={{}} />)).not.toContain(
    '<script'
  )

  const { container } = render(<ExternalPlugins NOTION_CONFIG={{}} />)
  expect(container.querySelector('script')).toBeNull()
  const script = document.getElementById('baidu-analytics')
  expect(script).toHaveAttribute('data-nscript', 'afterInteractive')
  expect(script).toHaveTextContent('test-baidu-id')
})

import { useEffect, useState } from 'react'

/* ============================================================
 * B 站实时粉丝数（走服务端代理 /api/bilibili-follower）
 * - 浏览器直连 B 站 API 没有 CORS 头，会被拦
 * - 60s 内重复请求会命中服务端缓存
 * ============================================================ */
export function useBilibiliFollowers(vmid) {
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!vmid) {
      setLoading(false)
      return
    }
    let cancelled = false
    setLoading(true)
    fetch(`/api/bilibili-follower?vmid=${vmid}`)
      .then(r => (r.ok ? r.json() : null))
      .then(json => {
        if (cancelled) return
        if (json?.ok && typeof json.data?.follower === 'number') {
          setCount(json.data.follower)
        }
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [vmid])

  return { count, loading }
}

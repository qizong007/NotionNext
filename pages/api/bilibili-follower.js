/**
 * B站粉丝数代理
 * 解决浏览器 CORS：B站对带 Origin 的请求直接返 403
 * 这里服务端不带 Origin 去请求 B站，再把结果回给浏览器
 *
 * 路由：GET /api/bilibili-follower?vmid=xxxx
 * 返回：{ code, follower }
 */
export default async function handler(req, res) {
  const { vmid } = req.query

  if (!vmid) {
    return res.status(400).json({ code: -1, message: 'missing vmid' })
  }

  // 简单缓存：30s 内同 vmid 直接复用，避免每次刷新都打 B站
  const cacheKey = `bilibili:follower:${vmid}`
  if (!globalThis[cacheKey]) {
    globalThis[cacheKey] = { value: null, ts: 0 }
  }
  const cache = globalThis[cacheKey]
  const now = Date.now()
  if (cache.value && now - cache.ts < 30 * 1000) {
    return res.status(200).json(cache.value)
  }

  try {
    const apiRes = await fetch(
      `https://api.bilibili.com/x/relation/stat?vmid=${encodeURIComponent(vmid)}`,
      {
        // 关键：不带 Origin，绕过 B站的 CORS 拒绝
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Referer': 'https://www.bilibili.com/'
        }
      }
    )

    if (!apiRes.ok) {
      return res.status(apiRes.status).json({
        code: apiRes.status,
        message: `upstream ${apiRes.status}`
      })
    }

    const data = await apiRes.json()
    const follower =
      data?.data?.follower ??
      data?.data?.fans ??
      data?.data?.following ??
      null

    const payload = { code: 0, follower, raw: data?.data || null }
    cache.value = payload
    cache.ts = now
    return res.status(200).json(payload)
  } catch (e) {
    return res.status(500).json({ code: -1, message: e?.message || 'fetch failed' })
  }
}

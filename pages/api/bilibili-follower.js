/**
 * B 站粉丝数代理接口
 * - 浏览器直连 api.bilibili.com 会被 CORS 拦截
 * - 这里在服务端拉一次再回吐给前端
 * - 加 60s 服务端缓存，避免每次请求都打 B 站
 *
 * 用法：
 *   GET /api/bilibili-follower?vmid=3493077649983936
 *   => { "ok": true, "data": { "mid": ..., "follower": 15400 } }
 */

const CACHE_TTL = 60 * 1000 // 60s
let cache = { ts: 0, data: null, vmid: null }

export default async function handler(req, res) {
  const vmid = String(req.query.vmid || '').trim()

  if (!vmid) {
    res.status(400).json({ ok: false, error: 'missing vmid' })
    return
  }

  // 只允许数字 vmid（防御性）
  if (!/^\d{1,20}$/.test(vmid)) {
    res.status(400).json({ ok: false, error: 'invalid vmid' })
    return
  }

  // 缓存命中
  const now = Date.now()
  if (cache.vmid === vmid && cache.data && now - cache.ts < CACHE_TTL) {
    res.setHeader('X-Cache', 'HIT')
    res.status(200).json({ ok: true, data: cache.data })
    return
  }

  try {
    const url = `https://api.bilibili.com/x/relation/stat?vmid=${vmid}`
    const r = await fetch(url, {
      headers: {
        // B 站对 UA 有最低要求
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 ' +
          '(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    })

    if (!r.ok) {
      res
        .status(502)
        .json({ ok: false, error: `upstream ${r.status}` })
      return
    }

    const json = await r.json()
    if (json?.code !== 0 || !json?.data) {
      res.status(502).json({ ok: false, error: 'bad upstream payload' })
      return
    }

    // 只回吐必要字段
    const slim = {
      mid: json.data.mid,
      follower: json.data.follower ?? 0,
      following: json.data.following ?? 0
    }

    cache = { ts: now, data: slim, vmid }
    res.setHeader('X-Cache', 'MISS')
    res.setHeader(
      'Cache-Control',
      'public, max-age=60, s-maxage=60, stale-while-revalidate=120'
    )
    res.status(200).json({ ok: true, data: slim })
  } catch (err) {
    res
      .status(500)
      .json({ ok: false, error: err?.message || 'fetch failed' })
  }
}

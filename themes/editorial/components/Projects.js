import { siteConfig } from '@/lib/config'
import CONFIG from '../config'

/**
 * 「我在做的事」三个项目卡片
 * 放在 Hero 和文章列表之间，刚好填满第一屏剩余空间
 * 杂志感条目：cover + 类型小标 + 名字（衬线）+ 简介 + 箭头
 */
const Projects = () => {
  const projects = siteConfig('EDITORIAL_PROJECTS', [], CONFIG) || []
  if (!projects.length) return null

  return (
    <section className='ed-projects'>
      <div className='ed-container'>
        <div className='ed-list-section-header'>
          <div className='ed-list-section-eyebrow'>PROJECTS · 项目</div>
          <h2 className='ed-list-section-title'>我在做的事</h2>
        </div>

        <div className='ed-projects-grid'>
          {projects.map(p => {
            const isExternal = p.url && /^https?:\/\//.test(p.url)
            return (
              <a
                key={p.key}
                href={p.url || '#'}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noreferrer' : undefined}
                className='ed-project-card'>
                {p.cover && (
                  <div className='ed-project-cover'>
                    <img src={p.cover} alt={p.name} loading='lazy' />
                  </div>
                )}

                <div className='ed-project-body'>
                  <div className='ed-project-body-top'>
                    {p.type && <div className='ed-project-type'>{p.type}</div>}
                    <h3 className='ed-project-name'>
                      {p.name}
                      <span style={{ color: 'var(--ed-accent)' }}>.</span>
                    </h3>
                    {p.desc && <p className='ed-project-desc'>{p.desc}</p>}
                  </div>
                  <span className='ed-project-arrow'>
                    <span>了解</span>
                    <i className='fa-solid fa-arrow-right' aria-hidden='true' />
                  </span>
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Projects

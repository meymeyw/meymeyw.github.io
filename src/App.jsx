import { useEffect, useMemo, useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import { projects } from './data/projects.js'
import './styles.css'

const writeups = import.meta.glob('./content/projects/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
})

function readSavedTheme() {
  const saved = localStorage.getItem('works-theme')
  if (saved) return saved
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function ProjectDialog({ project, onClose }) {
  const dialogRef = useRef(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (project && !dialog.open) dialog.showModal()
    if (!project && dialog.open) dialog.close()
  }, [project])

  const markdown = project ? writeups[`./content/projects/${project.writeup}`] : ''

  return (
    <dialog
      className="project-dialog"
      ref={dialogRef}
      aria-labelledby="dialog-title"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      {project && (
        <article className="writeup">
          <header className="writeup-header">
            <div>
              <p className="eyebrow">Project notes</p>
              <h2 id="dialog-title">{project.title}</h2>
            </div>
            <button className="icon-button close-button" onClick={onClose} aria-label="Close project details">×</button>
          </header>
          <div className="markdown-body">
            <ReactMarkdown rehypePlugins={[rehypeRaw]}>{markdown || 'Writeup coming soon.'}</ReactMarkdown>
          </div>
        </article>
      )}
    </dialog>
  )
}

function App() {
  const [activeTag, setActiveTag] = useState('All')
  const [selectedProject, setSelectedProject] = useState(null)
  const [projectView, setProjectView] = useState('cards')
  const [theme, setTheme] = useState(readSavedTheme)
  const tags = useMemo(() => ['All', ...new Set(projects.flatMap(({ tags: itemTags }) => itemTags))], [])
  const filteredProjects = activeTag === 'All'
    ? projects
    : projects.filter((project) => project.tags.includes(activeTag))

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('works-theme', theme)
  }, [theme])

  return (
    <main className="page-shell">
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Works home">MW<span>.</span></a>
        <nav className="site-nav" aria-label="Main navigation">
          <a href="#work">Work</a>
          <a href="mailto:hello@example.com">Contact</a>
          <button
            className="theme-toggle"
            onClick={() => setTheme((current) => current === 'dark' ? 'light' : 'dark')}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? '☼' : '☾'}
          </button>
        </nav>
      </header>

      <section className="intro" id="top">
        <p className="eyebrow">Selected work · 2020—2025</p>
        <h1>A collection of things<br />made with <span>curiosity.</span></h1>
        <p className="intro-copy">A few projects, experiments, and ideas brought to life across code and design.</p>
      </section>

      <section className="work-section" id="work" aria-labelledby="work-heading">
        <div className="section-heading">
          <div>
            <p className="eyebrow">The archive</p>
            <h2 id="work-heading">Selected work <span className="count">{String(filteredProjects.length).padStart(2, '0')}</span></h2>
          </div>
          <div className="section-tools">
            <div className="filters" aria-label="Filter projects by category">
              {tags.map((tag) => (
                <button
                  className={`filter-chip${activeTag === tag ? ' selected' : ''}`}
                  key={tag}
                  onClick={() => setActiveTag(tag)}
                  aria-pressed={activeTag === tag}
                >
                  {tag}
                </button>
              ))}
            </div>
            <div className="view-toggle" role="group" aria-label="Selected work layout">
              <button
                className={projectView === 'cards' ? 'active' : ''}
                aria-label="Card view"
                aria-pressed={projectView === 'cards'}
                onClick={() => setProjectView('cards')}
              >▦</button>
              <button
                className={projectView === 'list' ? 'active' : ''}
                aria-label="List view"
                aria-pressed={projectView === 'list'}
                onClick={() => setProjectView('list')}
              >☷</button>
            </div>
          </div>
        </div>

        <div className={`project-grid${projectView === 'list' ? ' list-view' : ''}`}>
          {filteredProjects.map((project, index) => (
            <button className="project-card" key={project.id} onClick={() => setSelectedProject(project)}>
              <span className={`project-art ${project.art}`}>
                {project.image && <img className="project-image" src={project.image} alt={`${project.title} project`} />}
                <span className="art-label">{project.artLabel}</span>
                <span className="art-number">{String(index + 1).padStart(2, '0')}</span>
              </span>
              <span className="card-copy">
                <span className="card-title-row"><span className="card-title">{project.title}</span><span className="card-year">{project.year}</span></span>
                <span className="card-summary">{project.summary}</span>
                <span className="card-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</span>
              </span>
            </button>
          ))}
        </div>
      </section>

      <footer className="site-footer"><span>Made with care, in Stockholm.</span><a href="mailto:hello@example.com">Say hello ↗</a></footer>
      <ProjectDialog project={selectedProject} onClose={() => setSelectedProject(null)} />
    </main>
  )
}

export default App

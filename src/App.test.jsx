import { beforeEach, describe, expect, it } from 'vitest'
import { fireEvent, render, screen, within } from '@testing-library/react'
import App from './App.jsx'

describe('personal works page', () => {
  beforeEach(() => localStorage.clear())

  it('shows work cards with titles, summaries, and tags', () => {
    render(<App />)
    expect(screen.getByText('Music Memory Mayhem')).toBeInTheDocument()
    expect(screen.getByText(/players place songs on a timeline/)).toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'Music Memory Mayhem project' })).toHaveAttribute('src', '/media/dynwebb24/mmm-cover.png')
    expect(screen.getAllByRole('button', { name: 'Web', exact: true })).toHaveLength(1)
  })

  it('filters projects by category', () => {
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: 'Visualization', exact: true }))
    expect(screen.getByText('Maestri 2025')).toBeInTheDocument()
    expect(screen.queryByText('Music Memory Mayhem')).not.toBeInTheDocument()
    expect(screen.getByText('Selected work')).toHaveTextContent('01')
  })

  it('opens a project writeup and closes it with the close button', () => {
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: /Music Memory Mayhem/ }))
    const dialog = screen.getByRole('dialog')
    expect(dialog).toHaveTextContent('The challenge')
    expect(dialog).toHaveTextContent('players place songs in release order')
    fireEvent.click(within(dialog).getByRole('button', { name: 'Close project details' }))
    expect(dialog).not.toHaveAttribute('open')
  })

  it('switches the selected work between card and list layouts', () => {
    render(<App />)
    const grid = document.querySelector('.project-grid')
    expect(grid).not.toHaveClass('list-view')
    fireEvent.click(screen.getByRole('button', { name: 'List view' }))
    expect(grid).toHaveClass('list-view')
    expect(screen.getByRole('button', { name: 'List view' })).toHaveAttribute('aria-pressed', 'true')
    fireEvent.click(screen.getByRole('button', { name: 'Card view' }))
    expect(grid).not.toHaveClass('list-view')
  })

  it('toggles and remembers the selected color theme', () => {
    render(<App />)
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark')
    fireEvent.click(screen.getByRole('button', { name: 'Switch to light mode' }))
    expect(document.documentElement).toHaveAttribute('data-theme', 'light')
    expect(localStorage.getItem('works-theme')).toBe('light')
  })
})

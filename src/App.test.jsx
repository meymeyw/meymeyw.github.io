import { beforeEach, describe, expect, it } from 'vitest'
import { fireEvent, render, screen, within } from '@testing-library/react'
import App from './App.jsx'

describe('personal works page', () => {
  beforeEach(() => localStorage.clear())

  it('shows work cards with titles, summaries, and tags', () => {
    render(<App />)
    expect(screen.getByText('Field Notes')).toBeInTheDocument()
    expect(screen.getByText(/digital garden for collecting observations/)).toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: 'Web' }).length).toBeGreaterThan(0)
  })

  it('filters projects by category', () => {
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: 'Game', exact: true }))
    expect(screen.getByText('Tiny Worlds')).toBeInTheDocument()
    expect(screen.queryByText('Field Notes')).not.toBeInTheDocument()
    expect(screen.getByText('Selected work')).toHaveTextContent('01')
  })

  it('opens a project writeup and closes it with the close button', () => {
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: /Field Notes/ }))
    const dialog = screen.getByRole('dialog')
    expect(dialog).toHaveTextContent('The idea')
    expect(dialog).toHaveTextContent('A good empty page can be an invitation.')
    fireEvent.click(within(dialog).getByRole('button', { name: 'Close project details' }))
    expect(dialog).not.toHaveAttribute('open')
  })

  it('toggles and remembers the selected color theme', () => {
    render(<App />)
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark')
    fireEvent.click(screen.getByRole('button', { name: 'Switch to light mode' }))
    expect(document.documentElement).toHaveAttribute('data-theme', 'light')
    expect(localStorage.getItem('works-theme')).toBe('light')
  })
})

import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Timeline from './Timeline'

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => {
  const actual = vi.importActual('framer-motion')
  return {
    ...actual,
    motion: {
      div: ({ children, ...props }) => <div {...props}>{children}</div>,
      nav: ({ children, ...props }) => <nav {...props}>{children}</nav>,
    },
    AnimatePresence: ({ children }) => <>{children}</>,
  }
})

describe('Timeline Component', () => {
  it('renders all 6 election stages', () => {
    render(<Timeline />)
    expect(screen.getByText('6-Step Election Process')).toBeInDocument()
    expect(screen.getByText('Election Announcement')).toBeInDocument()
    expect(screen.getByText('Voter Registration')).toBeInDocument()
    expect(screen.getByText('Nomination & Campaigning')).toBeInDocument()
    expect(screen.getByText('Polling Day')).toBeInDocument()
    expect(screen.getByText('Vote Counting')).toBeInDocument()
    expect(screen.getByText('Results & Government Formation')).toBeInDocument()
  })

  it('calls onTopicSelect when a stage is clicked', () => {
    const mockOnTopicSelect = vi.fn()
    render(<Timeline onTopicSelect={mockOnTopicSelect} />)
    
    // Find the first stage card and click it
    const stage1 = screen.getByText('Election Announcement').closest('div[role="button"]')
    fireEvent.click(stage1)
    
    expect(mockOnTopicSelect).toHaveBeenCalledWith('Election Announcement')
  })
})

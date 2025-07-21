import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'


describe('App', () => {
  it('renders CryptoPage on root route', () => {
    render(<App />)
    // We expect to find an element that is specific to CryptoPage
    // For example, a heading or text unique to CryptoPage
    // Please adjust the text below if CryptoPage renders something else
    expect(screen.getByText(/crypto/i)).toBeInTheDocument()
  })
}) 
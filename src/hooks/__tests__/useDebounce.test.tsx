import { act, renderHook } from '@testing-library/react'
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'
import useDebounce from '../useDebounce'

// Use fake timers to control setTimeout
beforeAll(() => {
  vi.useFakeTimers()
})

afterAll(() => {
  vi.useRealTimers()
})

describe('useDebounce', () => {
  it('should debounce value changes', () => {
    // Render the hook with initial value
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'hello', delay: 500 } }
    )

    // The debounced value should be the initial value
    expect(result.current).toBe('hello')

    // Change the value
    rerender({ value: 'world', delay: 500 })

    // The debounced value should still be the old value
    expect(result.current).toBe('hello')

    // Fast-forward time
    act(() => {
      vi.advanceTimersByTime(500)
    })

    // Now the debounced value should be updated
    expect(result.current).toBe('world')
  })
}) 
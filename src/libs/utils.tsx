export function parseNumberOrDefault(val: string | null, def: number) {
  const n = Number(val)
  return isNaN(n) ? def : n
}

// Export an array of objects to CSV and trigger download
export function exportToCSV<T extends Record<string, unknown>>(
  data: T[],
  columns: { key: string, label: string }[],
  filename = 'data.csv',
  formatters?: Partial<Record<string, (value: unknown, row: T) => string>>
) {
  // Build CSV header
  const header = columns.map(col => col.label).join(',')
  // Build CSV rows
  const rows = data.map(row =>
    columns.map(col => {
      const value = row[col.key]
      if (formatters && formatters[col.key]) {
        return formatters[col.key]!(value, row)
      }
      return value as string | number
    }).join(',')
  )
  const csv = [header, ...rows].join('\n')
  // Trigger download
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

// Format large numbers with suffixes (K, M, B, T)
export function formatShortNumber(num: number): string {
  if (num >= 1e12) return (num / 1e12).toFixed(1) + 'T'
  if (num >= 1e9) return (num / 1e9).toFixed(1) + 'B'
  if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M'
  if (num >= 1e3) return (num / 1e3).toFixed(1) + 'K'
  return num.toString()
}

// Throttle a function: ensures fn is called at most once every 'wait' ms
export function throttle<T extends (...args: unknown[]) => void>(fn: T, wait: number): T {
  let last = 0;
  let timeout: ReturnType<typeof setTimeout> | null = null;
  let lastArgs: unknown[];
  return function(this: unknown, ...args: unknown[]) {
    const now = Date.now();
    lastArgs = args;
    if (now - last >= wait) {
      last = now;
      fn.apply(this, args);
    } else if (!timeout) {
      timeout = setTimeout(() => {
        last = Date.now();
        timeout = null;
        fn.apply(this, lastArgs);
      }, wait - (now - last));
    }
  } as T;
}


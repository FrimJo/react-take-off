// Detects if device is in standalone mode
export function isInStandaloneMode() {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    ('standalone' in navigator && (window.navigator as any).standalone === true)
  )
}

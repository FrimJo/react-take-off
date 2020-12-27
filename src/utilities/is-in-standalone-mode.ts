// Detects if device is in standalone mode
function isInStandaloneMode() {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    ('standalone' in navigator && (window.navigator as any).standalone === true)
  )
}

export default isInStandaloneMode

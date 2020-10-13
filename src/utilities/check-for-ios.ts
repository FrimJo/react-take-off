// Detects if device is on iOS
function checkForIOS() {
  const ua = window.navigator.userAgent
  const webkit = !!ua.match(/WebKit/i)
  const isIPad = !!ua.match(/iPad/i)
  const isIPhone = !!ua.match(/iPhone/i)
  const isIOS = isIPad || isIPhone
  const isSafari = isIOS && webkit && !ua.match(/CriOS/i)

  return { isIOS, isSafari }
}

export default checkForIOS

export function debounce(fn, delay = 1000) {
  let timer = null
  const _this = this
  return function() {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(_this, arguments)
    }, delay)
  }
}

export function throttle(func, wait = 1000) {
  let previous = 0
  return function() {
    const now = Date.now()
    const context = this
    if (now - previous > wait) {
      func.apply(context, arguments)
      previous = now
    }
  }
}

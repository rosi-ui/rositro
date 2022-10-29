export function setStyle(el: HTMLElement, style: any) {
  let cssText = ''

  if (el.style.cssText) {
    cssText += el.style.cssText
  }

  if (typeof style === 'string') {
    cssText += style
  } else {
    for (const item in style) {
      cssText += `${item}:${style[item]};`
    }
  }

  // eslint-disable-next-line no-param-reassign
  el.style.cssText = cssText
}

// eslint-disable-next-line no-undef
export function createElement(tag: string, options: any): HTMLElement {
  const element = document.createElement(tag)

  for (const key in options) {
    if (key === 'class') {
      element.className = options[key]
    } else {
      element.setAttribute(key, options[key])
    }
  }

  return element
}

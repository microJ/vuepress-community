import { EnhanceApp } from 'vuepress-types'
import { Route } from 'vue-router'

// fork from vue-router@3.0.2
// src/util/scroll.js
function getElementPosition(
  el: Element
): {
  x: number
  y: number
} {
  const docEl = document.documentElement
  const docRect = docEl.getBoundingClientRect()
  const elRect = el.getBoundingClientRect()
  return {
    x: elRect.left - docRect.left,
    y: elRect.top - docRect.top,
  }
}

const enhanceApp: EnhanceApp = ({ Vue, router }): void => {
  router.options.scrollBehavior = (
    to: Route,
    from: Route,
    savedPosition: void | { x: number; y: number }
  ): void => {
    if (savedPosition) {
      return window.scrollTo({
        top: savedPosition.y,
        behavior: 'smooth',
      })
    } else if (to.hash) {
      if (Vue.$vuepress.$get('disableScrollBehavior')) {
        return
      }

      const targetElement = document.querySelector(`[id='${to.hash.slice(1)}']`)

      if (targetElement) {
        return window.scrollTo({
          top: getElementPosition(targetElement).y,
          behavior: 'smooth',
        })
      }
    } else {
      return window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }
  }
}

export default enhanceApp

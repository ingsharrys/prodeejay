import {
  d as h,
  a as d,
  u as _,
  o as p,
  b as v,
  e as E,
  f as w
} from './common/vendor.015340d9.js'
const k = 'modulepreload',
  y = function(o, r) {
    return o[0] === '.' ? new URL(o, r).href : o
  },
  u = {},
  P = function(r, s, c) {
    if (!s || s.length === 0) return r()
    const l = document.getElementsByTagName('link')
    return Promise.all(
      s.map(e => {
        if (((e = y(e, c)), e in u)) return
        u[e] = !0
        const t = e.endsWith('.css'),
          m = t ? '[rel="stylesheet"]' : ''
        if (!!c)
          for (let a = l.length - 1; a >= 0; a--) {
            const i = l[a]
            if (i.href === e && (!t || i.rel === 'stylesheet')) return
          }
        else if (document.querySelector(`link[href="${e}"]${m}`)) return
        const n = document.createElement('link')
        if (
          ((n.rel = t ? 'stylesheet' : k),
          t || ((n.as = 'script'), (n.crossOrigin = '')),
          (n.href = e),
          document.head.appendChild(n),
          t)
        )
          return new Promise((a, i) => {
            n.addEventListener('load', a),
              n.addEventListener('error', () =>
                i(new Error(`Unable to preload CSS for ${e}`))
              )
          })
      })
    )
      .then(() => r())
      .catch(e => {
        const t = new Event('vite:preloadError', { cancelable: !0 })
        if (((t.payload = e), window.dispatchEvent(t), !t.defaultPrevented))
          throw e
      })
  },
  R = h({
    __name: 'App',
    setup(o) {
      const r = v(() =>
        P(
          () => import('./common/Dashboard.e7ef6e61.js').then(s => s.D),
          [
            window.wcv_vendor_product_data.pluginDirUrl +
              'dist/common/Dashboard.e7ef6e61.js',
            window.wcv_vendor_product_data.pluginDirUrl +
              'dist/common/vendor.015340d9.js',
            window.wcv_vendor_product_data.pluginDirUrl +
              'dist/assets/Dashboard-7a942db1.css'
          ],
          import.meta.url
        )
      )
      return (s, c) => (p(), d(_(r)))
    }
  }),
  f = E(R)
f.use(w())
f.mount('#wcv-ai-product-review-root')
export { P as _ }

import { _ as r } from '../main.c1853b91.js'
import {
  d as s,
  b as n,
  o as c,
  g as d,
  c as p,
  u as l
} from './vendor.015340d9.js'
const i = { class: 'dashboard-container' },
  u = s({
    __name: 'Dashboard',
    setup(o) {
      const t = n(() =>
        r(
          () => import('./ProductsTable.f681faf0.js').then(e => e.a9),
          [
            window.wcv_vendor_product_data.pluginDirUrl +
              'dist/common/ProductsTable.f681faf0.js',
            window.wcv_vendor_product_data.pluginDirUrl +
              'dist/main.c1853b91.js',
            window.wcv_vendor_product_data.pluginDirUrl +
              'dist/common/vendor.015340d9.js',
            window.wcv_vendor_product_data.pluginDirUrl +
              'dist/common/antd.0267aafb.js',
            window.wcv_vendor_product_data.pluginDirUrl +
              'dist/assets/ProductsTable-4042ced9.css'
          ],
          import.meta.url
        )
      )
      return (e, a) => (c(), d('div', i, [p(l(t))]))
    }
  })
const m = (o, t) => {
    const e = o.__vccOpts || o
    for (const [a, _] of t) e[a] = _
    return e
  },
  f = m(u, [['__scopeId', 'data-v-71dd59d4']]),
  h = Object.freeze(
    Object.defineProperty({ __proto__: null, default: f }, Symbol.toStringTag, {
      value: 'Module'
    })
  )
export { h as D, m as _ }

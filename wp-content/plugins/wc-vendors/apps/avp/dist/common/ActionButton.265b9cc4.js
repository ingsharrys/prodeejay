import { x as C, b as i, o as p } from '../main.491ba5c0.js'
import { s as r, l as m, d as y, q as x, c as O } from './vendor.84fc1123.js'
import { x as P, B as D } from './VendorStore.d737faa9.js'
const R = () => {
    const n = r(!1)
    return (
      m(() => {
        n.value = !0
      }),
      n
    )
  },
  A = R,
  F = {
    type: { type: String },
    actionFn: Function,
    close: Function,
    autofocus: Boolean,
    prefixCls: String,
    buttonProps: p(),
    emitEvent: Boolean,
    quitOnNullishReturnValue: Boolean
  }
function d(n) {
  return !!(n && n.then)
}
const q = y({
  compatConfig: { MODE: 3 },
  name: 'ActionButton',
  props: F,
  setup(n, g) {
    let { slots: B } = g
    const l = r(!1),
      c = r(),
      u = r(!1)
    let f
    const v = A()
    x(() => {
      n.autofocus &&
        (f = setTimeout(() => {
          var e, t
          return (t =
            (e = C(c.value)) === null || e === void 0 ? void 0 : e.focus) ===
            null || t === void 0
            ? void 0
            : t.call(e)
        }))
    }),
      m(() => {
        clearTimeout(f)
      })
    const a = function() {
        for (var e, t = arguments.length, o = new Array(t), s = 0; s < t; s++)
          o[s] = arguments[s]
        ;(e = n.close) === null || e === void 0 || e.call(n, ...o)
      },
      b = e => {
        d(e) &&
          ((u.value = !0),
          e.then(
            function() {
              v.value || (u.value = !1), a(...arguments), (l.value = !1)
            },
            t => (v.value || (u.value = !1), (l.value = !1), Promise.reject(t))
          ))
      },
      h = e => {
        const { actionFn: t } = n
        if (l.value) return
        if (((l.value = !0), !t)) {
          a()
          return
        }
        let o
        if (n.emitEvent) {
          if (((o = t(e)), n.quitOnNullishReturnValue && !d(o))) {
            ;(l.value = !1), a(e)
            return
          }
        } else if (t.length) (o = t(n.close)), (l.value = !1)
        else if (((o = t()), !o)) {
          a()
          return
        }
        b(o)
      }
    return () => {
      const { type: e, prefixCls: t, buttonProps: o } = n
      return O(
        D,
        i(
          i(i({}, P(e)), {}, { onClick: h, loading: u.value, prefixCls: t }, o),
          {},
          { ref: c }
        ),
        B
      )
    }
  }
})
export { q as A }

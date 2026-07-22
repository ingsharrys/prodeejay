import {
  u as k,
  ac as L,
  c as M,
  _ as p,
  B as W,
  a as B,
  P as F,
  ad as G,
  b as q
} from './Dashboard.071f9192.js'
import {
  d as H,
  g as i,
  r as I,
  w as J,
  c as d,
  F as K
} from './vendor.0319ebde.js'
import { a as Q, C as x } from './index.5693d46f.js'
const U = { small: 8, middle: 16, large: 24 },
  X = () => ({
    prefixCls: String,
    size: { type: [String, Number, Array] },
    direction: F.oneOf(G('horizontal', 'vertical')).def('horizontal'),
    align: F.oneOf(G('start', 'end', 'center', 'baseline')),
    wrap: q()
  })
function Y(e) {
  return typeof e == 'string' ? U[e] : e || 0
}
const o = H({
  compatConfig: { MODE: 3 },
  name: 'ASpace',
  inheritAttrs: !1,
  props: X(),
  slots: Object,
  setup(e, j) {
    let { slots: r, attrs: f } = j
    const { prefixCls: l, space: g, direction: z } = k('space', e),
      [P, D] = Q(l),
      h = L(),
      n = i(() => {
        var a, t, s
        return (s =
          (a = e.size) !== null && a !== void 0
            ? a
            : (t = g == null ? void 0 : g.value) === null || t === void 0
            ? void 0
            : t.size) !== null && s !== void 0
          ? s
          : 'small'
      }),
      S = I(),
      c = I()
    J(
      n,
      () => {
        ;[S.value, c.value] = (Array.isArray(n.value)
          ? n.value
          : [n.value, n.value]
        ).map(a => Y(a))
      },
      { immediate: !0 }
    )
    const C = i(() =>
        e.align === void 0 && e.direction === 'horizontal' ? 'center' : e.align
      ),
      E = i(() =>
        M(l.value, D.value, `${l.value}-${e.direction}`, {
          [`${l.value}-rtl`]: z.value === 'rtl',
          [`${l.value}-align-${C.value}`]: C.value
        })
      ),
      R = i(() => (z.value === 'rtl' ? 'marginLeft' : 'marginRight')),
      T = i(() => {
        const a = {}
        return (
          h.value &&
            ((a.columnGap = `${S.value}px`), (a.rowGap = `${c.value}px`)),
          p(
            p({}, a),
            e.wrap && { flexWrap: 'wrap', marginBottom: `${-c.value}px` }
          )
        )
      })
    return () => {
      var a, t
      const { wrap: s, direction: V = 'horizontal' } = e,
        b = (a = r.default) === null || a === void 0 ? void 0 : a.call(r),
        w = W(b),
        _ = w.length
      if (_ === 0) return null
      const u = (t = r.split) === null || t === void 0 ? void 0 : t.call(r),
        A = `${l.value}-item`,
        N = S.value,
        y = _ - 1
      return d(
        'div',
        B(
          B({}, f),
          {},
          { class: [E.value, f.class], style: [T.value, f.style] }
        ),
        [
          w.map((O, v) => {
            let $ = b.indexOf(O)
            $ === -1 && ($ = `$$space-${v}`)
            let m = {}
            return (
              h.value ||
                (V === 'vertical'
                  ? v < y && (m = { marginBottom: `${N / (u ? 2 : 1)}px` })
                  : (m = p(
                      p({}, v < y && { [R.value]: `${N / (u ? 2 : 1)}px` }),
                      s && { paddingBottom: `${c.value}px` }
                    ))),
              P(
                d(K, { key: $ }, [
                  d('div', { class: A, style: m }, [O]),
                  v < y &&
                    u &&
                    d('span', { class: `${A}-split`, style: m }, [u])
                ])
              )
            )
          })
        ]
      )
    }
  }
})
o.Compact = x
o.install = function(e) {
  return e.component(o.name, o), e.component(x.name, x), e
}
const te = o
export { te as S }

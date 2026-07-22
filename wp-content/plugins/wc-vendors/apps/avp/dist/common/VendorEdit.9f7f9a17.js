import {
  e as ge,
  _ as g,
  P as tt,
  h as ce,
  t as De,
  b as G,
  o as Le,
  A as nt,
  g as Ft,
  m as vn,
  i as bn,
  r as Gt,
  j as Ut,
  f as gn,
  s as Ue,
  k as mn,
  l as hn,
  n as yn,
  p as $n,
  q as xn,
  a as yt,
  C as Sn,
  v as ze,
  x as ft,
  L as Cn,
  y as _n,
  z as Yt,
  c as ve,
  d as Tn
} from '../main.491ba5c0.js'
import {
  s as q,
  l as at,
  d as ie,
  r as F,
  e as V,
  c as s,
  k as We,
  q as Pe,
  j as de,
  p as wn,
  f as En,
  U as Pn,
  W as On,
  y as qt,
  I as Rn,
  n as Pt,
  F as Me,
  D as In,
  E as Bn,
  L as Zt,
  X as kn,
  o as $e,
  N as Ye,
  w as j,
  O as Re,
  R as Dn,
  Q as be,
  u as P,
  Y as qe,
  a as Ae,
  Z as Ee,
  _ as Ot,
  $ as An,
  b as Nn
} from './vendor.84fc1123.js'
import {
  i as Rt,
  a as Ln,
  w as Te,
  K as Z,
  b as Y,
  c as Mn,
  E as Hn,
  M as zn,
  d as Wn,
  D as jn,
  R as mt,
  e as Kn,
  f as It,
  o as Oe,
  g as vt,
  h as Xn,
  j as ht,
  k as Qt,
  l as Vn,
  T as Fn,
  s as Gn,
  m as Jt,
  n as bt,
  C as Un,
  u as Yn,
  S as Ne,
  B as Ze
} from './VendorStore.d737faa9.js'
import { P as qn } from './index.ebb33149.js'
import {
  c as en,
  t as Zn,
  a as Qn,
  b as Jn,
  h as ea,
  f as ta
} from './hasIn.ec097647.js'
import { P as na, i as aa, j as oa, k as ia, l as la } from './antd.7f3c63f7.js'
import { i as tn } from './initDefaultProps.71991ecc.js'
import { I as ra } from './index.380800ce.js'
import { T as sa } from './index.4e3cad7b.js'
import { M as ca } from './index.7f1c23e8.js'
function da(e, t, n, a) {
  if (!Rt(e)) return e
  t = en(t, e)
  for (var o = -1, r = t.length, i = r - 1, l = e; l != null && ++o < r; ) {
    var d = Zn(t[o]),
      v = n
    if (d === '__proto__' || d === 'constructor' || d === 'prototype') return e
    if (o != i) {
      var f = l[d]
      ;(v = a ? a(f, d, l) : void 0),
        v === void 0 && (v = Rt(f) ? f : Ln(t[o + 1]) ? [] : {})
    }
    Qn(l, d, v), (l = l[d])
  }
  return e
}
function ua(e, t, n) {
  for (var a = -1, o = t.length, r = {}; ++a < o; ) {
    var i = t[a],
      l = Jn(e, i)
    n(l, i) && da(r, en(i, e), l)
  }
  return r
}
function pa(e, t) {
  return ua(e, t, function(n, a) {
    return ea(e, a)
  })
}
var fa = ta(function(e, t) {
  return e == null ? {} : pa(e, t)
})
const nn = fa
function va(e) {
  const t = q(),
    n = q(!1)
  function a() {
    for (var o = arguments.length, r = new Array(o), i = 0; i < o; i++)
      r[i] = arguments[i]
    n.value ||
      (Te.cancel(t.value),
      (t.value = Te(() => {
        e(...r)
      })))
  }
  return (
    at(() => {
      ;(n.value = !0), Te.cancel(t.value)
    }),
    a
  )
}
function ba(e) {
  const t = q([]),
    n = q(typeof e == 'function' ? e() : e),
    a = va(() => {
      let r = n.value
      t.value.forEach(i => {
        r = i(r)
      }),
        (t.value = []),
        (n.value = r)
    })
  function o(r) {
    t.value.push(r), a()
  }
  return [n, o]
}
const ga = ie({
    compatConfig: { MODE: 3 },
    name: 'TabNode',
    props: {
      id: { type: String },
      prefixCls: { type: String },
      tab: { type: Object },
      active: { type: Boolean },
      closable: { type: Boolean },
      editable: { type: Object },
      onClick: { type: Function },
      onResize: { type: Function },
      renderWrapper: { type: Function },
      removeAriaLabel: { type: String },
      onFocus: { type: Function }
    },
    emits: ['click', 'resize', 'remove', 'focus'],
    setup(e, t) {
      let { expose: n, attrs: a } = t
      const o = F()
      function r(d) {
        var v
        ;(!((v = e.tab) === null || v === void 0) && v.disabled) || e.onClick(d)
      }
      n({ domRef: o })
      function i(d) {
        var v
        d.preventDefault(),
          d.stopPropagation(),
          e.editable.onEdit('remove', {
            key: (v = e.tab) === null || v === void 0 ? void 0 : v.key,
            event: d
          })
      }
      const l = V(() => {
        var d
        return (
          e.editable &&
          e.closable !== !1 &&
          !(!((d = e.tab) === null || d === void 0) && d.disabled)
        )
      })
      return () => {
        var d
        const {
            prefixCls: v,
            id: f,
            active: h,
            tab: { key: p, tab: c, disabled: x, closeIcon: y },
            renderWrapper: _,
            removeAriaLabel: I,
            editable: E,
            onFocus: m
          } = e,
          R = `${v}-tab`,
          b = s(
            'div',
            {
              key: p,
              ref: o,
              class: ge(R, {
                [`${R}-with-remove`]: l.value,
                [`${R}-active`]: h,
                [`${R}-disabled`]: x
              }),
              style: a.style,
              onClick: r
            },
            [
              s(
                'div',
                {
                  role: 'tab',
                  'aria-selected': h,
                  id: f && `${f}-tab-${p}`,
                  class: `${R}-btn`,
                  'aria-controls': f && `${f}-panel-${p}`,
                  'aria-disabled': x,
                  tabindex: x ? null : 0,
                  onClick: T => {
                    T.stopPropagation(), r(T)
                  },
                  onKeydown: T => {
                    ;[Z.SPACE, Z.ENTER].includes(T.which) &&
                      (T.preventDefault(), r(T))
                  },
                  onFocus: m
                },
                [typeof c == 'function' ? c() : c]
              ),
              l.value &&
                s(
                  'button',
                  {
                    type: 'button',
                    'aria-label': I || 'remove',
                    tabindex: 0,
                    class: `${R}-remove`,
                    onClick: T => {
                      T.stopPropagation(), i(T)
                    }
                  },
                  [
                    (y == null ? void 0 : y()) ||
                      ((d = E.removeIcon) === null || d === void 0
                        ? void 0
                        : d.call(E)) ||
                      '×'
                  ]
                )
            ]
          )
        return _ ? _(b) : b
      }
    }
  }),
  Bt = { width: 0, height: 0, left: 0, top: 0 }
function ma(e, t) {
  const n = F(new Map())
  return (
    We(() => {
      var a, o
      const r = new Map(),
        i = e.value,
        l =
          t.value.get((a = i[0]) === null || a === void 0 ? void 0 : a.key) ||
          Bt,
        d = l.left + l.width
      for (let v = 0; v < i.length; v += 1) {
        const { key: f } = i[v]
        let h = t.value.get(f)
        h ||
          (h =
            t.value.get(
              (o = i[v - 1]) === null || o === void 0 ? void 0 : o.key
            ) || Bt)
        const p = r.get(f) || g({}, h)
        ;(p.right = d - p.left - p.width), r.set(f, p)
      }
      n.value = new Map(r)
    }),
    n
  )
}
const an = ie({
    compatConfig: { MODE: 3 },
    name: 'AddButton',
    inheritAttrs: !1,
    props: {
      prefixCls: String,
      editable: { type: Object },
      locale: { type: Object, default: void 0 }
    },
    setup(e, t) {
      let { expose: n, attrs: a } = t
      const o = F()
      return (
        n({ domRef: o }),
        () => {
          const { prefixCls: r, editable: i, locale: l } = e
          return !i || i.showAdd === !1
            ? null
            : s(
                'button',
                {
                  ref: o,
                  type: 'button',
                  class: `${r}-nav-add`,
                  style: a.style,
                  'aria-label':
                    (l == null ? void 0 : l.addAriaLabel) || 'Add tab',
                  onClick: d => {
                    i.onEdit('add', { event: d })
                  }
                },
                [i.addIcon ? i.addIcon() : '+']
              )
        }
      )
    }
  }),
  ha = {
    prefixCls: { type: String },
    id: { type: String },
    tabs: { type: Object },
    rtl: { type: Boolean },
    tabBarGutter: { type: Number },
    activeKey: { type: [String, Number] },
    mobile: { type: Boolean },
    moreIcon: tt.any,
    moreTransitionName: { type: String },
    editable: { type: Object },
    locale: { type: Object, default: void 0 },
    removeAriaLabel: String,
    onTabClick: { type: Function },
    popupClassName: String,
    getPopupContainer: ce()
  },
  ya = ie({
    compatConfig: { MODE: 3 },
    name: 'OperationNode',
    inheritAttrs: !1,
    props: ha,
    emits: ['tabClick'],
    slots: Object,
    setup(e, t) {
      let { attrs: n, slots: a } = t
      const [o, r] = Y(!1),
        [i, l] = Y(null),
        d = c => {
          const x = e.tabs.filter(I => !I.disabled)
          let y = x.findIndex(I => I.key === i.value) || 0
          const _ = x.length
          for (let I = 0; I < _; I += 1) {
            y = (y + c + _) % _
            const E = x[y]
            if (!E.disabled) {
              l(E.key)
              return
            }
          }
        },
        v = c => {
          const { which: x } = c
          if (!o.value) {
            ;[Z.DOWN, Z.SPACE, Z.ENTER].includes(x) &&
              (r(!0), c.preventDefault())
            return
          }
          switch (x) {
            case Z.UP:
              d(-1), c.preventDefault()
              break
            case Z.DOWN:
              d(1), c.preventDefault()
              break
            case Z.ESC:
              r(!1)
              break
            case Z.SPACE:
            case Z.ENTER:
              i.value !== null && e.onTabClick(i.value, c)
              break
          }
        },
        f = V(() => `${e.id}-more-popup`),
        h = V(() => (i.value !== null ? `${f.value}-${i.value}` : null)),
        p = (c, x) => {
          c.preventDefault(),
            c.stopPropagation(),
            e.editable.onEdit('remove', { key: x, event: c })
        }
      return (
        Pe(() => {
          de(
            i,
            () => {
              const c = document.getElementById(h.value)
              c && c.scrollIntoView && c.scrollIntoView(!1)
            },
            { flush: 'post', immediate: !0 }
          )
        }),
        de(o, () => {
          o.value || l(null)
        }),
        Mn({}),
        () => {
          var c
          const {
            prefixCls: x,
            id: y,
            tabs: _,
            locale: I,
            mobile: E,
            moreIcon: m = ((c = a.moreIcon) === null || c === void 0
              ? void 0
              : c.call(a)) || s(Hn, null, null),
            moreTransitionName: R,
            editable: b,
            tabBarGutter: T,
            rtl: S,
            onTabClick: B,
            popupClassName: H
          } = e
          if (!_.length) return null
          const k = `${x}-dropdown`,
            K = I == null ? void 0 : I.dropdownAriaLabel,
            me = { [S ? 'marginRight' : 'marginLeft']: T }
          _.length || ((me.visibility = 'hidden'), (me.order = 1))
          const xe = ge({ [`${k}-rtl`]: S, [`${H}`]: !0 }),
            Se = E
              ? null
              : s(
                  jn,
                  {
                    prefixCls: k,
                    trigger: ['hover'],
                    visible: o.value,
                    transitionName: R,
                    onVisibleChange: r,
                    overlayClassName: xe,
                    mouseEnterDelay: 0.1,
                    mouseLeaveDelay: 0.1,
                    getPopupContainer: e.getPopupContainer
                  },
                  {
                    overlay: () =>
                      s(
                        zn,
                        {
                          onClick: u => {
                            let { key: $, domEvent: C } = u
                            B($, C), r(!1)
                          },
                          id: f.value,
                          tabindex: -1,
                          role: 'listbox',
                          'aria-activedescendant': h.value,
                          selectedKeys: [i.value],
                          'aria-label': K !== void 0 ? K : 'expanded dropdown'
                        },
                        {
                          default: () => [
                            _.map(u => {
                              var $, C
                              const D = b && u.closable !== !1 && !u.disabled
                              return s(
                                Wn,
                                {
                                  key: u.key,
                                  id: `${f.value}-${u.key}`,
                                  role: 'option',
                                  'aria-controls': y && `${y}-panel-${u.key}`,
                                  disabled: u.disabled
                                },
                                {
                                  default: () => [
                                    s('span', null, [
                                      typeof u.tab == 'function'
                                        ? u.tab()
                                        : u.tab
                                    ]),
                                    D &&
                                      s(
                                        'button',
                                        {
                                          type: 'button',
                                          'aria-label':
                                            e.removeAriaLabel || 'remove',
                                          tabindex: 0,
                                          class: `${k}-menu-item-remove`,
                                          onClick: N => {
                                            N.stopPropagation(), p(N, u.key)
                                          }
                                        },
                                        [
                                          (($ = u.closeIcon) === null ||
                                          $ === void 0
                                            ? void 0
                                            : $.call(u)) ||
                                            ((C = b.removeIcon) === null ||
                                            C === void 0
                                              ? void 0
                                              : C.call(b)) ||
                                            '×'
                                        ]
                                      )
                                  ]
                                }
                              )
                            })
                          ]
                        }
                      ),
                    default: () =>
                      s(
                        'button',
                        {
                          type: 'button',
                          class: `${x}-nav-more`,
                          style: me,
                          tabindex: -1,
                          'aria-hidden': 'true',
                          'aria-haspopup': 'listbox',
                          'aria-controls': f.value,
                          id: `${y}-more`,
                          'aria-expanded': o.value,
                          onKeydown: v
                        },
                        [m]
                      )
                  }
                )
          return s(
            'div',
            { class: ge(`${x}-nav-operations`, n.class), style: n.style },
            [Se, s(an, { prefixCls: x, locale: I, editable: b }, null)]
          )
        }
      )
    }
  }),
  on = Symbol('tabsContextKey'),
  $a = e => {
    wn(on, e)
  },
  ln = () => En(on, { tabs: F([]), prefixCls: F() }),
  xa = 0.1,
  kt = 0.01,
  Qe = 20,
  Dt = Math.pow(0.995, Qe)
function Sa(e, t) {
  const [n, a] = Y(),
    [o, r] = Y(0),
    [i, l] = Y(0),
    [d, v] = Y(),
    f = F()
  function h(b) {
    const { screenX: T, screenY: S } = b.touches[0]
    a({ x: T, y: S }), clearInterval(f.value)
  }
  function p(b) {
    if (!n.value) return
    b.preventDefault()
    const { screenX: T, screenY: S } = b.touches[0],
      B = T - n.value.x,
      H = S - n.value.y
    t(B, H), a({ x: T, y: S })
    const k = Date.now()
    l(k - o.value), r(k), v({ x: B, y: H })
  }
  function c() {
    if (!n.value) return
    const b = d.value
    if ((a(null), v(null), b)) {
      const T = b.x / i.value,
        S = b.y / i.value,
        B = Math.abs(T),
        H = Math.abs(S)
      if (Math.max(B, H) < xa) return
      let k = T,
        K = S
      f.value = setInterval(() => {
        if (Math.abs(k) < kt && Math.abs(K) < kt) {
          clearInterval(f.value)
          return
        }
        ;(k *= Dt), (K *= Dt), t(k * Qe, K * Qe)
      }, Qe)
    }
  }
  const x = F()
  function y(b) {
    const { deltaX: T, deltaY: S } = b
    let B = 0
    const H = Math.abs(T),
      k = Math.abs(S)
    H === k
      ? (B = x.value === 'x' ? T : S)
      : H > k
      ? ((B = T), (x.value = 'x'))
      : ((B = S), (x.value = 'y')),
      t(-B, -B) && b.preventDefault()
  }
  const _ = F({ onTouchStart: h, onTouchMove: p, onTouchEnd: c, onWheel: y })
  function I(b) {
    _.value.onTouchStart(b)
  }
  function E(b) {
    _.value.onTouchMove(b)
  }
  function m(b) {
    _.value.onTouchEnd(b)
  }
  function R(b) {
    _.value.onWheel(b)
  }
  Pe(() => {
    var b, T
    document.addEventListener('touchmove', E, { passive: !1 }),
      document.addEventListener('touchend', m, { passive: !1 }),
      (b = e.value) === null ||
        b === void 0 ||
        b.addEventListener('touchstart', I, { passive: !1 }),
      (T = e.value) === null ||
        T === void 0 ||
        T.addEventListener('wheel', R, { passive: !1 })
  }),
    at(() => {
      document.removeEventListener('touchmove', E),
        document.removeEventListener('touchend', m)
    })
}
function At(e, t) {
  const n = F(e)
  function a(o) {
    const r = typeof o == 'function' ? o(n.value) : o
    r !== n.value && t(r, n.value), (n.value = r)
  }
  return [n, a]
}
const Ca = () => {
    const e = F(new Map()),
      t = n => a => {
        e.value.set(n, a)
      }
    return (
      Pn(() => {
        e.value = new Map()
      }),
      [t, e]
    )
  },
  _a = Ca,
  Nt = { width: 0, height: 0, left: 0, top: 0, right: 0 },
  Ta = () => ({
    id: { type: String },
    tabPosition: { type: String },
    activeKey: { type: [String, Number] },
    rtl: { type: Boolean },
    animated: Le(),
    editable: Le(),
    moreIcon: tt.any,
    moreTransitionName: { type: String },
    mobile: { type: Boolean },
    tabBarGutter: { type: Number },
    renderTabBar: { type: Function },
    locale: Le(),
    popupClassName: String,
    getPopupContainer: ce(),
    onTabClick: { type: Function },
    onTabScroll: { type: Function }
  }),
  wa = (e, t) => {
    const { offsetWidth: n, offsetHeight: a, offsetTop: o, offsetLeft: r } = e,
      { width: i, height: l, x: d, y: v } = e.getBoundingClientRect()
    return Math.abs(i - n) < 1 ? [i, l, d - t.x, v - t.y] : [n, a, r, o]
  },
  Lt = ie({
    compatConfig: { MODE: 3 },
    name: 'TabNavList',
    inheritAttrs: !1,
    props: Ta(),
    slots: Object,
    emits: ['tabClick', 'tabScroll'],
    setup(e, t) {
      let { attrs: n, slots: a } = t
      const { tabs: o, prefixCls: r } = ln(),
        i = q(),
        l = q(),
        d = q(),
        v = q(),
        [f, h] = _a(),
        p = V(() => e.tabPosition === 'top' || e.tabPosition === 'bottom'),
        [c, x] = At(0, (O, w) => {
          p.value &&
            e.onTabScroll &&
            e.onTabScroll({ direction: O > w ? 'left' : 'right' })
        }),
        [y, _] = At(0, (O, w) => {
          !p.value &&
            e.onTabScroll &&
            e.onTabScroll({ direction: O > w ? 'top' : 'bottom' })
        }),
        [I, E] = Y(0),
        [m, R] = Y(0),
        [b, T] = Y(null),
        [S, B] = Y(null),
        [H, k] = Y(0),
        [K, me] = Y(0),
        [xe, Se] = ba(new Map()),
        u = ma(o, xe),
        $ = V(() => `${r.value}-nav-operations-hidden`),
        C = q(0),
        D = q(0)
      We(() => {
        p.value
          ? e.rtl
            ? ((C.value = 0), (D.value = Math.max(0, I.value - b.value)))
            : ((C.value = Math.min(0, b.value - I.value)), (D.value = 0))
          : ((C.value = Math.min(0, S.value - m.value)), (D.value = 0))
      })
      const N = O => (O < C.value ? C.value : O > D.value ? D.value : O),
        Q = q(),
        [z, ne] = Y(),
        re = () => {
          ne(Date.now())
        },
        J = () => {
          clearTimeout(Q.value)
        },
        he = (O, w) => {
          O(A => N(A + w))
        }
      Sa(i, (O, w) => {
        if (p.value) {
          if (b.value >= I.value) return !1
          he(x, O)
        } else {
          if (S.value >= m.value) return !1
          he(_, w)
        }
        return J(), re(), !0
      }),
        de(z, () => {
          J(),
            z.value &&
              (Q.value = setTimeout(() => {
                ne(0)
              }, 100))
        })
      const X = function() {
          let O =
            arguments.length > 0 && arguments[0] !== void 0
              ? arguments[0]
              : e.activeKey
          const w = u.value.get(O) || {
            width: 0,
            height: 0,
            left: 0,
            right: 0,
            top: 0
          }
          if (p.value) {
            let A = c.value
            e.rtl
              ? w.right < c.value
                ? (A = w.right)
                : w.right + w.width > c.value + b.value &&
                  (A = w.right + w.width - b.value)
              : w.left < -c.value
              ? (A = -w.left)
              : w.left + w.width > -c.value + b.value &&
                (A = -(w.left + w.width - b.value)),
              _(0),
              x(N(A))
          } else {
            let A = y.value
            w.top < -y.value
              ? (A = -w.top)
              : w.top + w.height > -y.value + S.value &&
                (A = -(w.top + w.height - S.value)),
              x(0),
              _(N(A))
          }
        },
        Ce = q(0),
        we = q(0)
      We(() => {
        let O, w, A, L, M, W
        const pe = u.value
        ;['top', 'bottom'].includes(e.tabPosition)
          ? ((O = 'width'),
            (L = b.value),
            (M = I.value),
            (W = H.value),
            (w = e.rtl ? 'right' : 'left'),
            (A = Math.abs(c.value)))
          : ((O = 'height'),
            (L = S.value),
            (M = I.value),
            (W = K.value),
            (w = 'top'),
            (A = -y.value))
        let ee = L
        M + W > L && M < L && (ee = L - W)
        const se = o.value
        if (!se.length) return ([Ce.value, we.value] = [0, 0])
        const fe = se.length
        let _e = fe
        for (let le = 0; le < fe; le += 1) {
          const ye = pe.get(se[le].key) || Nt
          if (ye[w] + ye[O] > A + ee) {
            _e = le - 1
            break
          }
        }
        let U = 0
        for (let le = fe - 1; le >= 0; le -= 1)
          if ((pe.get(se[le].key) || Nt)[w] < A) {
            U = le + 1
            break
          }
        return ([Ce.value, we.value] = [U, _e])
      })
      const Xe = () => {
        Se(() => {
          var O
          const w = new Map(),
            A =
              (O = l.value) === null || O === void 0
                ? void 0
                : O.getBoundingClientRect()
          return (
            o.value.forEach(L => {
              let { key: M } = L
              const W = h.value.get(M),
                pe = (W == null ? void 0 : W.$el) || W
              if (pe) {
                const [ee, se, fe, _e] = wa(pe, A)
                w.set(M, { width: ee, height: se, left: fe, top: _e })
              }
            }),
            w
          )
        })
      }
      de(
        () => o.value.map(O => O.key).join('%%'),
        () => {
          Xe()
        },
        { flush: 'post' }
      )
      const Ie = () => {
          var O, w, A, L, M
          const W =
              ((O = i.value) === null || O === void 0
                ? void 0
                : O.offsetWidth) || 0,
            pe =
              ((w = i.value) === null || w === void 0
                ? void 0
                : w.offsetHeight) || 0,
            ee =
              ((A = v.value) === null || A === void 0 ? void 0 : A.$el) || {},
            se = ee.offsetWidth || 0,
            fe = ee.offsetHeight || 0
          T(W), B(pe), k(se), me(fe)
          const _e =
              (((L = l.value) === null || L === void 0
                ? void 0
                : L.offsetWidth) || 0) - se,
            U =
              (((M = l.value) === null || M === void 0
                ? void 0
                : M.offsetHeight) || 0) - fe
          E(_e), R(U), Xe()
        },
        Ve = V(() => [
          ...o.value.slice(0, Ce.value),
          ...o.value.slice(we.value + 1)
        ]),
        [st, ct] = Y(),
        ae = V(() => u.value.get(e.activeKey)),
        Fe = q(),
        Be = () => {
          Te.cancel(Fe.value)
        }
      de([ae, p, () => e.rtl], () => {
        const O = {}
        ae.value &&
          (p.value
            ? (e.rtl
                ? (O.right = De(ae.value.right))
                : (O.left = De(ae.value.left)),
              (O.width = De(ae.value.width)))
            : ((O.top = De(ae.value.top)), (O.height = De(ae.value.height)))),
          Be(),
          (Fe.value = Te(() => {
            ct(O)
          }))
      }),
        de(
          [() => e.activeKey, ae, u, p],
          () => {
            X()
          },
          { flush: 'post' }
        ),
        de(
          [() => e.rtl, () => e.tabBarGutter, () => e.activeKey, () => o.value],
          () => {
            Ie()
          },
          { flush: 'post' }
        )
      const ue = O => {
        let { position: w, prefixCls: A, extra: L } = O
        if (!L) return null
        const M = L == null ? void 0 : L({ position: w })
        return M ? s('div', { class: `${A}-extra-content` }, [M]) : null
      }
      return (
        at(() => {
          J(), Be()
        }),
        () => {
          const {
              id: O,
              animated: w,
              activeKey: A,
              rtl: L,
              editable: M,
              locale: W,
              tabPosition: pe,
              tabBarGutter: ee,
              onTabClick: se
            } = e,
            { class: fe, style: _e } = n,
            U = r.value,
            le = !!Ve.value.length,
            ye = `${U}-nav-wrap`
          let dt, ut, Tt, wt
          p.value
            ? L
              ? ((ut = c.value > 0), (dt = c.value + b.value < I.value))
              : ((dt = c.value < 0), (ut = -c.value + b.value < I.value))
            : ((Tt = y.value < 0), (wt = -y.value + S.value < m.value))
          const Ge = {}
          pe === 'top' || pe === 'bottom'
            ? (Ge[L ? 'marginRight' : 'marginLeft'] =
                typeof ee == 'number' ? `${ee}px` : ee)
            : (Ge.marginTop = typeof ee == 'number' ? `${ee}px` : ee)
          const Et = o.value.map((pt, pn) => {
            const { key: ke } = pt
            return s(
              ga,
              {
                id: O,
                prefixCls: U,
                key: ke,
                tab: pt,
                style: pn === 0 ? void 0 : Ge,
                closable: pt.closable,
                editable: M,
                active: ke === A,
                removeAriaLabel: W == null ? void 0 : W.removeAriaLabel,
                ref: f(ke),
                onClick: fn => {
                  se(ke, fn)
                },
                onFocus: () => {
                  X(ke),
                    re(),
                    i.value &&
                      (L || (i.value.scrollLeft = 0), (i.value.scrollTop = 0))
                }
              },
              a
            )
          })
          return s(
            'div',
            {
              role: 'tablist',
              class: ge(`${U}-nav`, fe),
              style: _e,
              onKeydown: () => {
                re()
              }
            },
            [
              s(
                ue,
                { position: 'left', prefixCls: U, extra: a.leftExtra },
                null
              ),
              s(
                mt,
                { onResize: Ie },
                {
                  default: () => [
                    s(
                      'div',
                      {
                        class: ge(ye, {
                          [`${ye}-ping-left`]: dt,
                          [`${ye}-ping-right`]: ut,
                          [`${ye}-ping-top`]: Tt,
                          [`${ye}-ping-bottom`]: wt
                        }),
                        ref: i
                      },
                      [
                        s(
                          mt,
                          { onResize: Ie },
                          {
                            default: () => [
                              s(
                                'div',
                                {
                                  ref: l,
                                  class: `${U}-nav-list`,
                                  style: {
                                    transform: `translate(${c.value}px, ${y.value}px)`,
                                    transition: z.value ? 'none' : void 0
                                  }
                                },
                                [
                                  Et,
                                  s(
                                    an,
                                    {
                                      ref: v,
                                      prefixCls: U,
                                      locale: W,
                                      editable: M,
                                      style: g(
                                        g({}, Et.length === 0 ? void 0 : Ge),
                                        { visibility: le ? 'hidden' : null }
                                      )
                                    },
                                    null
                                  ),
                                  s(
                                    'div',
                                    {
                                      class: ge(`${U}-ink-bar`, {
                                        [`${U}-ink-bar-animated`]: w.inkBar
                                      }),
                                      style: st.value
                                    },
                                    null
                                  )
                                ]
                              )
                            ]
                          }
                        )
                      ]
                    )
                  ]
                }
              ),
              s(
                ya,
                G(
                  G({}, e),
                  {},
                  {
                    removeAriaLabel: W == null ? void 0 : W.removeAriaLabel,
                    ref: d,
                    prefixCls: U,
                    tabs: Ve.value,
                    class: !le && $.value
                  }
                ),
                nn(a, ['moreIcon'])
              ),
              s(
                ue,
                { position: 'right', prefixCls: U, extra: a.rightExtra },
                null
              ),
              s(
                ue,
                {
                  position: 'right',
                  prefixCls: U,
                  extra: a.tabBarExtraContent
                },
                null
              )
            ]
          )
        }
      )
    }
  }),
  Ea = ie({
    compatConfig: { MODE: 3 },
    name: 'TabPanelList',
    inheritAttrs: !1,
    props: {
      activeKey: { type: [String, Number] },
      id: { type: String },
      rtl: { type: Boolean },
      animated: { type: Object, default: void 0 },
      tabPosition: { type: String },
      destroyInactiveTabPane: { type: Boolean }
    },
    setup(e) {
      const { tabs: t, prefixCls: n } = ln()
      return () => {
        const {
            id: a,
            activeKey: o,
            animated: r,
            tabPosition: i,
            rtl: l,
            destroyInactiveTabPane: d
          } = e,
          v = r.tabPane,
          f = n.value,
          h = t.value.findIndex(p => p.key === o)
        return s('div', { class: `${f}-content-holder` }, [
          s(
            'div',
            {
              class: [
                `${f}-content`,
                `${f}-content-${i}`,
                { [`${f}-content-animated`]: v }
              ],
              style:
                h && v
                  ? { [l ? 'marginRight' : 'marginLeft']: `-${h}00%` }
                  : null
            },
            [
              t.value.map(p =>
                Kn(p.node, {
                  key: p.key,
                  prefixCls: f,
                  tabKey: p.key,
                  id: a,
                  animated: v,
                  active: p.key === o,
                  destroyInactiveTabPane: d
                })
              )
            ]
          )
        ])
      }
    }
  })
function Mt(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? Object(arguments[t]) : {},
      a = Object.keys(n)
    typeof Object.getOwnPropertySymbols == 'function' &&
      (a = a.concat(
        Object.getOwnPropertySymbols(n).filter(function(o) {
          return Object.getOwnPropertyDescriptor(n, o).enumerable
        })
      )),
      a.forEach(function(o) {
        Pa(e, o, n[o])
      })
  }
  return e
}
function Pa(e, t, n) {
  return (
    t in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0
        })
      : (e[t] = n),
    e
  )
}
var $t = function(t, n) {
  var a = Mt({}, t, n.attrs)
  return s(nt, Mt({}, a, { icon: na }), null)
}
$t.displayName = 'PlusOutlined'
$t.inheritAttrs = !1
const Oa = $t,
  Ra = e => {
    const { componentCls: t, motionDurationSlow: n } = e
    return [
      {
        [t]: {
          [`${t}-switch`]: {
            '&-appear, &-enter': {
              transition: 'none',
              '&-start': { opacity: 0 },
              '&-active': { opacity: 1, transition: `opacity ${n}` }
            },
            '&-leave': {
              position: 'absolute',
              transition: 'none',
              inset: 0,
              '&-start': { opacity: 1 },
              '&-active': { opacity: 0, transition: `opacity ${n}` }
            }
          }
        }
      },
      [It(e, 'slide-up'), It(e, 'slide-down')]
    ]
  },
  Ia = Ra,
  Ba = e => {
    const {
      componentCls: t,
      tabsCardHorizontalPadding: n,
      tabsCardHeadBackground: a,
      tabsCardGutter: o,
      colorSplit: r
    } = e
    return {
      [`${t}-card`]: {
        [`> ${t}-nav, > div > ${t}-nav`]: {
          [`${t}-tab`]: {
            margin: 0,
            padding: n,
            background: a,
            border: `${e.lineWidth}px ${e.lineType} ${r}`,
            transition: `all ${e.motionDurationSlow} ${e.motionEaseInOut}`
          },
          [`${t}-tab-active`]: {
            color: e.colorPrimary,
            background: e.colorBgContainer
          },
          [`${t}-ink-bar`]: { visibility: 'hidden' }
        },
        [`&${t}-top, &${t}-bottom`]: {
          [`> ${t}-nav, > div > ${t}-nav`]: {
            [`${t}-tab + ${t}-tab`]: {
              marginLeft: { _skip_check_: !0, value: `${o}px` }
            }
          }
        },
        [`&${t}-top`]: {
          [`> ${t}-nav, > div > ${t}-nav`]: {
            [`${t}-tab`]: {
              borderRadius: `${e.borderRadiusLG}px ${e.borderRadiusLG}px 0 0`
            },
            [`${t}-tab-active`]: { borderBottomColor: e.colorBgContainer }
          }
        },
        [`&${t}-bottom`]: {
          [`> ${t}-nav, > div > ${t}-nav`]: {
            [`${t}-tab`]: {
              borderRadius: `0 0 ${e.borderRadiusLG}px ${e.borderRadiusLG}px`
            },
            [`${t}-tab-active`]: { borderTopColor: e.colorBgContainer }
          }
        },
        [`&${t}-left, &${t}-right`]: {
          [`> ${t}-nav, > div > ${t}-nav`]: {
            [`${t}-tab + ${t}-tab`]: { marginTop: `${o}px` }
          }
        },
        [`&${t}-left`]: {
          [`> ${t}-nav, > div > ${t}-nav`]: {
            [`${t}-tab`]: {
              borderRadius: {
                _skip_check_: !0,
                value: `${e.borderRadiusLG}px 0 0 ${e.borderRadiusLG}px`
              }
            },
            [`${t}-tab-active`]: {
              borderRightColor: { _skip_check_: !0, value: e.colorBgContainer }
            }
          }
        },
        [`&${t}-right`]: {
          [`> ${t}-nav, > div > ${t}-nav`]: {
            [`${t}-tab`]: {
              borderRadius: {
                _skip_check_: !0,
                value: `0 ${e.borderRadiusLG}px ${e.borderRadiusLG}px 0`
              }
            },
            [`${t}-tab-active`]: {
              borderLeftColor: { _skip_check_: !0, value: e.colorBgContainer }
            }
          }
        }
      }
    }
  },
  ka = e => {
    const {
      componentCls: t,
      tabsHoverColor: n,
      dropdownEdgeChildVerticalPadding: a
    } = e
    return {
      [`${t}-dropdown`]: g(g({}, Gt(e)), {
        position: 'absolute',
        top: -9999,
        left: { _skip_check_: !0, value: -9999 },
        zIndex: e.zIndexPopup,
        display: 'block',
        '&-hidden': { display: 'none' },
        [`${t}-dropdown-menu`]: {
          maxHeight: e.tabsDropdownHeight,
          margin: 0,
          padding: `${a}px 0`,
          overflowX: 'hidden',
          overflowY: 'auto',
          textAlign: { _skip_check_: !0, value: 'left' },
          listStyleType: 'none',
          backgroundColor: e.colorBgContainer,
          backgroundClip: 'padding-box',
          borderRadius: e.borderRadiusLG,
          outline: 'none',
          boxShadow: e.boxShadowSecondary,
          '&-item': g(g({}, bn), {
            display: 'flex',
            alignItems: 'center',
            minWidth: e.tabsDropdownWidth,
            margin: 0,
            padding: `${e.paddingXXS}px ${e.paddingSM}px`,
            color: e.colorText,
            fontWeight: 'normal',
            fontSize: e.fontSize,
            lineHeight: e.lineHeight,
            cursor: 'pointer',
            transition: `all ${e.motionDurationSlow}`,
            '> span': { flex: 1, whiteSpace: 'nowrap' },
            '&-remove': {
              flex: 'none',
              marginLeft: { _skip_check_: !0, value: e.marginSM },
              color: e.colorTextDescription,
              fontSize: e.fontSizeSM,
              background: 'transparent',
              border: 0,
              cursor: 'pointer',
              '&:hover': { color: n }
            },
            '&:hover': { background: e.controlItemBgHover },
            '&-disabled': {
              '&, &:hover': {
                color: e.colorTextDisabled,
                background: 'transparent',
                cursor: 'not-allowed'
              }
            }
          })
        }
      })
    }
  },
  Da = e => {
    const { componentCls: t, margin: n, colorSplit: a } = e
    return {
      [`${t}-top, ${t}-bottom`]: {
        flexDirection: 'column',
        [`> ${t}-nav, > div > ${t}-nav`]: {
          margin: `0 0 ${n}px 0`,
          '&::before': {
            position: 'absolute',
            right: { _skip_check_: !0, value: 0 },
            left: { _skip_check_: !0, value: 0 },
            borderBottom: `${e.lineWidth}px ${e.lineType} ${a}`,
            content: "''"
          },
          [`${t}-ink-bar`]: {
            height: e.lineWidthBold,
            '&-animated': {
              transition: `width ${e.motionDurationSlow}, left ${e.motionDurationSlow},
            right ${e.motionDurationSlow}`
            }
          },
          [`${t}-nav-wrap`]: {
            '&::before, &::after': {
              top: 0,
              bottom: 0,
              width: e.controlHeight
            },
            '&::before': {
              left: { _skip_check_: !0, value: 0 },
              boxShadow: e.boxShadowTabsOverflowLeft
            },
            '&::after': {
              right: { _skip_check_: !0, value: 0 },
              boxShadow: e.boxShadowTabsOverflowRight
            },
            [`&${t}-nav-wrap-ping-left::before`]: { opacity: 1 },
            [`&${t}-nav-wrap-ping-right::after`]: { opacity: 1 }
          }
        }
      },
      [`${t}-top`]: {
        [`> ${t}-nav,
        > div > ${t}-nav`]: {
          '&::before': { bottom: 0 },
          [`${t}-ink-bar`]: { bottom: 0 }
        }
      },
      [`${t}-bottom`]: {
        [`> ${t}-nav, > div > ${t}-nav`]: {
          order: 1,
          marginTop: `${n}px`,
          marginBottom: 0,
          '&::before': { top: 0 },
          [`${t}-ink-bar`]: { top: 0 }
        },
        [`> ${t}-content-holder, > div > ${t}-content-holder`]: { order: 0 }
      },
      [`${t}-left, ${t}-right`]: {
        [`> ${t}-nav, > div > ${t}-nav`]: {
          flexDirection: 'column',
          minWidth: e.controlHeight * 1.25,
          [`${t}-tab`]: {
            padding: `${e.paddingXS}px ${e.paddingLG}px`,
            textAlign: 'center'
          },
          [`${t}-tab + ${t}-tab`]: { margin: `${e.margin}px 0 0 0` },
          [`${t}-nav-wrap`]: {
            flexDirection: 'column',
            '&::before, &::after': {
              right: { _skip_check_: !0, value: 0 },
              left: { _skip_check_: !0, value: 0 },
              height: e.controlHeight
            },
            '&::before': { top: 0, boxShadow: e.boxShadowTabsOverflowTop },
            '&::after': { bottom: 0, boxShadow: e.boxShadowTabsOverflowBottom },
            [`&${t}-nav-wrap-ping-top::before`]: { opacity: 1 },
            [`&${t}-nav-wrap-ping-bottom::after`]: { opacity: 1 }
          },
          [`${t}-ink-bar`]: {
            width: e.lineWidthBold,
            '&-animated': {
              transition: `height ${e.motionDurationSlow}, top ${e.motionDurationSlow}`
            }
          },
          [`${t}-nav-list, ${t}-nav-operations`]: {
            flex: '1 0 auto',
            flexDirection: 'column'
          }
        }
      },
      [`${t}-left`]: {
        [`> ${t}-nav, > div > ${t}-nav`]: {
          [`${t}-ink-bar`]: { right: { _skip_check_: !0, value: 0 } }
        },
        [`> ${t}-content-holder, > div > ${t}-content-holder`]: {
          marginLeft: { _skip_check_: !0, value: `-${e.lineWidth}px` },
          borderLeft: {
            _skip_check_: !0,
            value: `${e.lineWidth}px ${e.lineType} ${e.colorBorder}`
          },
          [`> ${t}-content > ${t}-tabpane`]: {
            paddingLeft: { _skip_check_: !0, value: e.paddingLG }
          }
        }
      },
      [`${t}-right`]: {
        [`> ${t}-nav, > div > ${t}-nav`]: {
          order: 1,
          [`${t}-ink-bar`]: { left: { _skip_check_: !0, value: 0 } }
        },
        [`> ${t}-content-holder, > div > ${t}-content-holder`]: {
          order: 0,
          marginRight: { _skip_check_: !0, value: -e.lineWidth },
          borderRight: {
            _skip_check_: !0,
            value: `${e.lineWidth}px ${e.lineType} ${e.colorBorder}`
          },
          [`> ${t}-content > ${t}-tabpane`]: {
            paddingRight: { _skip_check_: !0, value: e.paddingLG }
          }
        }
      }
    }
  },
  Aa = e => {
    const { componentCls: t, padding: n } = e
    return {
      [t]: {
        '&-small': {
          [`> ${t}-nav`]: {
            [`${t}-tab`]: {
              padding: `${e.paddingXS}px 0`,
              fontSize: e.fontSize
            }
          }
        },
        '&-large': {
          [`> ${t}-nav`]: {
            [`${t}-tab`]: { padding: `${n}px 0`, fontSize: e.fontSizeLG }
          }
        }
      },
      [`${t}-card`]: {
        [`&${t}-small`]: {
          [`> ${t}-nav`]: {
            [`${t}-tab`]: { padding: `${e.paddingXXS * 1.5}px ${n}px` }
          },
          [`&${t}-bottom`]: {
            [`> ${t}-nav ${t}-tab`]: {
              borderRadius: `0 0 ${e.borderRadius}px ${e.borderRadius}px`
            }
          },
          [`&${t}-top`]: {
            [`> ${t}-nav ${t}-tab`]: {
              borderRadius: `${e.borderRadius}px ${e.borderRadius}px 0 0`
            }
          },
          [`&${t}-right`]: {
            [`> ${t}-nav ${t}-tab`]: {
              borderRadius: {
                _skip_check_: !0,
                value: `0 ${e.borderRadius}px ${e.borderRadius}px 0`
              }
            }
          },
          [`&${t}-left`]: {
            [`> ${t}-nav ${t}-tab`]: {
              borderRadius: {
                _skip_check_: !0,
                value: `${e.borderRadius}px 0 0 ${e.borderRadius}px`
              }
            }
          }
        },
        [`&${t}-large`]: {
          [`> ${t}-nav`]: {
            [`${t}-tab`]: {
              padding: `${e.paddingXS}px ${n}px ${e.paddingXXS * 1.5}px`
            }
          }
        }
      }
    }
  },
  Na = e => {
    const {
        componentCls: t,
        tabsActiveColor: n,
        tabsHoverColor: a,
        iconCls: o,
        tabsHorizontalGutter: r
      } = e,
      i = `${t}-tab`
    return {
      [i]: {
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        padding: `${e.paddingSM}px 0`,
        fontSize: `${e.fontSize}px`,
        background: 'transparent',
        border: 0,
        outline: 'none',
        cursor: 'pointer',
        '&-btn, &-remove': g(
          { '&:focus:not(:focus-visible), &:active': { color: n } },
          Ut(e)
        ),
        '&-btn': { outline: 'none', transition: 'all 0.3s' },
        '&-remove': {
          flex: 'none',
          marginRight: { _skip_check_: !0, value: -e.marginXXS },
          marginLeft: { _skip_check_: !0, value: e.marginXS },
          color: e.colorTextDescription,
          fontSize: e.fontSizeSM,
          background: 'transparent',
          border: 'none',
          outline: 'none',
          cursor: 'pointer',
          transition: `all ${e.motionDurationSlow}`,
          '&:hover': { color: e.colorTextHeading }
        },
        '&:hover': { color: a },
        [`&${i}-active ${i}-btn`]: {
          color: e.colorPrimary,
          textShadow: e.tabsActiveTextShadow
        },
        [`&${i}-disabled`]: {
          color: e.colorTextDisabled,
          cursor: 'not-allowed'
        },
        [`&${i}-disabled ${i}-btn, &${i}-disabled ${t}-remove`]: {
          '&:focus, &:active': { color: e.colorTextDisabled }
        },
        [`& ${i}-remove ${o}`]: { margin: 0 },
        [o]: { marginRight: { _skip_check_: !0, value: e.marginSM } }
      },
      [`${i} + ${i}`]: { margin: { _skip_check_: !0, value: `0 0 0 ${r}px` } }
    }
  },
  La = e => {
    const {
      componentCls: t,
      tabsHorizontalGutter: n,
      iconCls: a,
      tabsCardGutter: o
    } = e
    return {
      [`${t}-rtl`]: {
        direction: 'rtl',
        [`${t}-nav`]: {
          [`${t}-tab`]: {
            margin: { _skip_check_: !0, value: `0 0 0 ${n}px` },
            [`${t}-tab:last-of-type`]: {
              marginLeft: { _skip_check_: !0, value: 0 }
            },
            [a]: {
              marginRight: { _skip_check_: !0, value: 0 },
              marginLeft: { _skip_check_: !0, value: `${e.marginSM}px` }
            },
            [`${t}-tab-remove`]: {
              marginRight: { _skip_check_: !0, value: `${e.marginXS}px` },
              marginLeft: { _skip_check_: !0, value: `-${e.marginXXS}px` },
              [a]: { margin: 0 }
            }
          }
        },
        [`&${t}-left`]: {
          [`> ${t}-nav`]: { order: 1 },
          [`> ${t}-content-holder`]: { order: 0 }
        },
        [`&${t}-right`]: {
          [`> ${t}-nav`]: { order: 0 },
          [`> ${t}-content-holder`]: { order: 1 }
        },
        [`&${t}-card${t}-top, &${t}-card${t}-bottom`]: {
          [`> ${t}-nav, > div > ${t}-nav`]: {
            [`${t}-tab + ${t}-tab`]: {
              marginRight: { _skip_check_: !0, value: `${o}px` },
              marginLeft: { _skip_check_: !0, value: 0 }
            }
          }
        }
      },
      [`${t}-dropdown-rtl`]: { direction: 'rtl' },
      [`${t}-menu-item`]: {
        [`${t}-dropdown-rtl`]: {
          textAlign: { _skip_check_: !0, value: 'right' }
        }
      }
    }
  },
  Ma = e => {
    const {
      componentCls: t,
      tabsCardHorizontalPadding: n,
      tabsCardHeight: a,
      tabsCardGutter: o,
      tabsHoverColor: r,
      tabsActiveColor: i,
      colorSplit: l
    } = e
    return {
      [t]: g(
        g(
          g(g({}, Gt(e)), {
            display: 'flex',
            [`> ${t}-nav, > div > ${t}-nav`]: {
              position: 'relative',
              display: 'flex',
              flex: 'none',
              alignItems: 'center',
              [`${t}-nav-wrap`]: {
                position: 'relative',
                display: 'flex',
                flex: 'auto',
                alignSelf: 'stretch',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                transform: 'translate(0)',
                '&::before, &::after': {
                  position: 'absolute',
                  zIndex: 1,
                  opacity: 0,
                  transition: `opacity ${e.motionDurationSlow}`,
                  content: "''",
                  pointerEvents: 'none'
                }
              },
              [`${t}-nav-list`]: {
                position: 'relative',
                display: 'flex',
                transition: `opacity ${e.motionDurationSlow}`
              },
              [`${t}-nav-operations`]: {
                display: 'flex',
                alignSelf: 'stretch'
              },
              [`${t}-nav-operations-hidden`]: {
                position: 'absolute',
                visibility: 'hidden',
                pointerEvents: 'none'
              },
              [`${t}-nav-more`]: {
                position: 'relative',
                padding: n,
                background: 'transparent',
                border: 0,
                '&::after': {
                  position: 'absolute',
                  right: { _skip_check_: !0, value: 0 },
                  bottom: 0,
                  left: { _skip_check_: !0, value: 0 },
                  height: e.controlHeightLG / 8,
                  transform: 'translateY(100%)',
                  content: "''"
                }
              },
              [`${t}-nav-add`]: g(
                {
                  minWidth: `${a}px`,
                  marginLeft: { _skip_check_: !0, value: `${o}px` },
                  padding: `0 ${e.paddingXS}px`,
                  background: 'transparent',
                  border: `${e.lineWidth}px ${e.lineType} ${l}`,
                  borderRadius: `${e.borderRadiusLG}px ${e.borderRadiusLG}px 0 0`,
                  outline: 'none',
                  cursor: 'pointer',
                  color: e.colorText,
                  transition: `all ${e.motionDurationSlow} ${e.motionEaseInOut}`,
                  '&:hover': { color: r },
                  '&:active, &:focus:not(:focus-visible)': { color: i }
                },
                Ut(e)
              )
            },
            [`${t}-extra-content`]: { flex: 'none' },
            [`${t}-ink-bar`]: {
              position: 'absolute',
              background: e.colorPrimary,
              pointerEvents: 'none'
            }
          }),
          Na(e)
        ),
        {
          [`${t}-content`]: {
            position: 'relative',
            display: 'flex',
            width: '100%',
            '&-animated': { transition: 'margin 0.3s' }
          },
          [`${t}-content-holder`]: { flex: 'auto', minWidth: 0, minHeight: 0 },
          [`${t}-tabpane`]: { outline: 'none', flex: 'none', width: '100%' }
        }
      ),
      [`${t}-centered`]: {
        [`> ${t}-nav, > div > ${t}-nav`]: {
          [`${t}-nav-wrap`]: {
            [`&:not([class*='${t}-nav-wrap-ping'])`]: {
              justifyContent: 'center'
            }
          }
        }
      }
    }
  },
  Ha = Ft(
    'Tabs',
    e => {
      const t = e.controlHeightLG,
        n = vn(e, {
          tabsHoverColor: e.colorPrimaryHover,
          tabsActiveColor: e.colorPrimaryActive,
          tabsCardHorizontalPadding: `${(t -
            Math.round(e.fontSize * e.lineHeight)) /
            2 -
            e.lineWidth}px ${e.padding}px`,
          tabsCardHeight: t,
          tabsCardGutter: e.marginXXS / 2,
          tabsHorizontalGutter: 32,
          tabsCardHeadBackground: e.colorFillAlter,
          dropdownEdgeChildVerticalPadding: e.paddingXXS,
          tabsActiveTextShadow: '0 0 0.25px currentcolor',
          tabsDropdownHeight: 200,
          tabsDropdownWidth: 120
        })
      return [Aa(n), La(n), Da(n), ka(n), Ba(n), Ma(n), Ia(n)]
    },
    e => ({ zIndexPopup: e.zIndexPopupBase + 50 })
  )
let Ht = 0
const rn = () => ({
  prefixCls: { type: String },
  id: { type: String },
  popupClassName: String,
  getPopupContainer: ce(),
  activeKey: { type: [String, Number] },
  defaultActiveKey: { type: [String, Number] },
  direction: Ue(),
  animated: mn([Boolean, Object]),
  renderTabBar: ce(),
  tabBarGutter: { type: Number },
  tabBarStyle: Le(),
  tabPosition: Ue(),
  destroyInactiveTabPane: hn(),
  hideAdd: Boolean,
  type: Ue(),
  size: Ue(),
  centered: Boolean,
  onEdit: ce(),
  onChange: ce(),
  onTabClick: ce(),
  onTabScroll: ce(),
  'onUpdate:activeKey': ce(),
  locale: Le(),
  onPrevClick: ce(),
  onNextClick: ce(),
  tabBarExtraContent: tt.any
})
function za(e) {
  return e
    .map(t => {
      if (yn(t)) {
        const n = g({}, t.props || {})
        for (const [p, c] of Object.entries(n)) delete n[p], (n[$n(p)] = c)
        const a = t.children || {},
          o = t.key !== void 0 ? t.key : void 0,
          {
            tab: r = a.tab,
            disabled: i,
            forceRender: l,
            closable: d,
            animated: v,
            active: f,
            destroyInactiveTabPane: h
          } = n
        return g(g({ key: o }, n), {
          node: t,
          closeIcon: a.closeIcon,
          tab: r,
          disabled: i === '' || i,
          forceRender: l === '' || l,
          closable: d === '' || d,
          animated: v === '' || v,
          active: f === '' || f,
          destroyInactiveTabPane: h === '' || h
        })
      }
      return null
    })
    .filter(t => t)
}
const Wa = ie({
    compatConfig: { MODE: 3 },
    name: 'InternalTabs',
    inheritAttrs: !1,
    props: g(
      g(
        {},
        tn(rn(), { tabPosition: 'top', animated: { inkBar: !0, tabPane: !1 } })
      ),
      { tabs: xn() }
    ),
    slots: Object,
    setup(e, t) {
      let { attrs: n, slots: a } = t
      vt(
        e.onPrevClick === void 0 && e.onNextClick === void 0,
        'Tabs',
        '`onPrevClick / @prevClick` and `onNextClick / @nextClick` has been removed. Please use `onTabScroll / @tabScroll` instead.'
      ),
        vt(
          e.tabBarExtraContent === void 0,
          'Tabs',
          '`tabBarExtraContent` prop has been removed. Please use `rightExtra` slot instead.'
        ),
        vt(
          a.tabBarExtraContent === void 0,
          'Tabs',
          '`tabBarExtraContent` slot is deprecated. Please use `rightExtra` slot instead.'
        )
      const {
          prefixCls: o,
          direction: r,
          size: i,
          rootPrefixCls: l,
          getPopupContainer: d
        } = yt('tabs', e),
        [v, f] = Ha(o),
        h = V(() => r.value === 'rtl'),
        p = V(() => {
          const { animated: S, tabPosition: B } = e
          return S === !1 || ['left', 'right'].includes(B)
            ? { inkBar: !1, tabPane: !1 }
            : S === !0
            ? { inkBar: !0, tabPane: !0 }
            : g({ inkBar: !0, tabPane: !1 }, typeof S == 'object' ? S : {})
        }),
        [c, x] = Y(!1)
      Pe(() => {
        x(Xn())
      })
      const [y, _] = ht(
          () => {
            var S
            return (S = e.tabs[0]) === null || S === void 0 ? void 0 : S.key
          },
          { value: V(() => e.activeKey), defaultValue: e.defaultActiveKey }
        ),
        [I, E] = Y(() => e.tabs.findIndex(S => S.key === y.value))
      We(() => {
        var S
        let B = e.tabs.findIndex(H => H.key === y.value)
        B === -1 &&
          ((B = Math.max(0, Math.min(I.value, e.tabs.length - 1))),
          _((S = e.tabs[B]) === null || S === void 0 ? void 0 : S.key)),
          E(B)
      })
      const [m, R] = ht(null, { value: V(() => e.id) }),
        b = V(() =>
          c.value && !['left', 'right'].includes(e.tabPosition)
            ? 'top'
            : e.tabPosition
        )
      Pe(() => {
        e.id || (R(`rc-tabs-${Ht}`), (Ht += 1))
      })
      const T = (S, B) => {
        var H, k
        ;(H = e.onTabClick) === null || H === void 0 || H.call(e, S, B)
        const K = S !== y.value
        _(S), K && ((k = e.onChange) === null || k === void 0 || k.call(e, S))
      }
      return (
        $a({ tabs: V(() => e.tabs), prefixCls: o }),
        () => {
          const {
              id: S,
              type: B,
              tabBarGutter: H,
              tabBarStyle: k,
              locale: K,
              destroyInactiveTabPane: me,
              renderTabBar: xe = a.renderTabBar,
              onTabScroll: Se,
              hideAdd: u,
              centered: $
            } = e,
            C = {
              id: m.value,
              activeKey: y.value,
              animated: p.value,
              tabPosition: b.value,
              rtl: h.value,
              mobile: c.value
            }
          let D
          B === 'editable-card' &&
            (D = {
              onEdit: (ne, re) => {
                let { key: J, event: he } = re
                var X
                ;(X = e.onEdit) === null ||
                  X === void 0 ||
                  X.call(e, ne === 'add' ? he : J, ne)
              },
              removeIcon: () => s(Sn, null, null),
              addIcon: a.addIcon ? a.addIcon : () => s(Oa, null, null),
              showAdd: u !== !0
            })
          let N
          const Q = g(g({}, C), {
            moreTransitionName: `${l.value}-slide-up`,
            editable: D,
            locale: K,
            tabBarGutter: H,
            onTabClick: T,
            onTabScroll: Se,
            style: k,
            getPopupContainer: d.value,
            popupClassName: ge(e.popupClassName, f.value)
          })
          xe
            ? (N = xe(g(g({}, Q), { DefaultTabBar: Lt })))
            : (N = s(
                Lt,
                Q,
                nn(a, [
                  'moreIcon',
                  'leftExtra',
                  'rightExtra',
                  'tabBarExtraContent'
                ])
              ))
          const z = o.value
          return v(
            s(
              'div',
              G(
                G({}, n),
                {},
                {
                  id: S,
                  class: ge(
                    z,
                    `${z}-${b.value}`,
                    {
                      [f.value]: !0,
                      [`${z}-${i.value}`]: i.value,
                      [`${z}-card`]: ['card', 'editable-card'].includes(B),
                      [`${z}-editable-card`]: B === 'editable-card',
                      [`${z}-centered`]: $,
                      [`${z}-mobile`]: c.value,
                      [`${z}-editable`]: B === 'editable-card',
                      [`${z}-rtl`]: h.value
                    },
                    n.class
                  )
                }
              ),
              [
                N,
                s(
                  Ea,
                  G(
                    G({ destroyInactiveTabPane: me }, C),
                    {},
                    { animated: p.value }
                  ),
                  null
                )
              ]
            )
          )
        }
      )
    }
  }),
  He = ie({
    compatConfig: { MODE: 3 },
    name: 'ATabs',
    inheritAttrs: !1,
    props: tn(rn(), {
      tabPosition: 'top',
      animated: { inkBar: !0, tabPane: !1 }
    }),
    slots: Object,
    setup(e, t) {
      let { attrs: n, slots: a, emit: o } = t
      const r = i => {
        o('update:activeKey', i), o('change', i)
      }
      return () => {
        var i
        const l = za(
          gn((i = a.default) === null || i === void 0 ? void 0 : i.call(a))
        )
        return s(
          Wa,
          G(
            G(G({}, Oe(e, ['onUpdate:activeKey'])), n),
            {},
            { onChange: r, tabs: l }
          ),
          a
        )
      }
    }
  }),
  ja = () => ({
    tab: tt.any,
    disabled: { type: Boolean },
    forceRender: { type: Boolean },
    closable: { type: Boolean },
    animated: { type: Boolean },
    active: { type: Boolean },
    destroyInactiveTabPane: { type: Boolean },
    prefixCls: { type: String },
    tabKey: { type: [String, Number] },
    id: { type: String }
  }),
  Je = ie({
    compatConfig: { MODE: 3 },
    name: 'ATabPane',
    inheritAttrs: !1,
    __ANT_TAB_PANE: !0,
    props: ja(),
    slots: Object,
    setup(e, t) {
      let { attrs: n, slots: a } = t
      const o = F(e.forceRender)
      de(
        [() => e.active, () => e.destroyInactiveTabPane],
        () => {
          e.active ? (o.value = !0) : e.destroyInactiveTabPane && (o.value = !1)
        },
        { immediate: !0 }
      )
      const r = V(() =>
        e.active
          ? {}
          : e.animated
          ? { visibility: 'hidden', height: 0, overflowY: 'hidden' }
          : { display: 'none' }
      )
      return () => {
        var i
        const { prefixCls: l, forceRender: d, id: v, active: f, tabKey: h } = e
        return s(
          'div',
          {
            id: v && `${v}-panel-${h}`,
            role: 'tabpanel',
            tabindex: f ? 0 : -1,
            'aria-labelledby': v && `${v}-tab-${h}`,
            'aria-hidden': !f,
            style: [r.value, n.style],
            class: [`${l}-tabpane`, f && `${l}-tabpane-active`, n.class]
          },
          [
            (f || o.value || d) &&
              ((i = a.default) === null || i === void 0 ? void 0 : i.call(a))
          ]
        )
      }
    }
  })
He.TabPane = Je
He.install = function(e) {
  return e.component(He.name, He), e.component(Je.name, Je), e
}
var Ka =
  (globalThis && globalThis.__rest) ||
  function(e, t) {
    var n = {}
    for (var a in e)
      Object.prototype.hasOwnProperty.call(e, a) &&
        t.indexOf(a) < 0 &&
        (n[a] = e[a])
    if (e != null && typeof Object.getOwnPropertySymbols == 'function')
      for (var o = 0, a = Object.getOwnPropertySymbols(e); o < a.length; o++)
        t.indexOf(a[o]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(e, a[o]) &&
          (n[a[o]] = e[a[o]])
    return n
  }
const Xa = {
    border: 0,
    background: 'transparent',
    padding: 0,
    lineHeight: 'inherit',
    display: 'inline-block'
  },
  Va = ie({
    compatConfig: { MODE: 3 },
    name: 'TransButton',
    inheritAttrs: !1,
    props: {
      noStyle: { type: Boolean, default: void 0 },
      onClick: Function,
      disabled: { type: Boolean, default: void 0 },
      autofocus: { type: Boolean, default: void 0 }
    },
    setup(e, t) {
      let { slots: n, emit: a, attrs: o, expose: r } = t
      const i = q(),
        l = p => {
          const { keyCode: c } = p
          c === Z.ENTER && p.preventDefault()
        },
        d = p => {
          const { keyCode: c } = p
          c === Z.ENTER && a('click', p)
        },
        v = p => {
          a('click', p)
        },
        f = () => {
          i.value && i.value.focus()
        },
        h = () => {
          i.value && i.value.blur()
        }
      return (
        Pe(() => {
          e.autofocus && f()
        }),
        r({ focus: f, blur: h }),
        () => {
          var p
          const { noStyle: c, disabled: x } = e,
            y = Ka(e, ['noStyle', 'disabled'])
          let _ = {}
          return (
            c || (_ = g({}, Xa)),
            x && (_.pointerEvents = 'none'),
            s(
              'div',
              G(
                G(G({ role: 'button', tabindex: 0, ref: i }, y), o),
                {},
                {
                  onClick: v,
                  onKeydown: l,
                  onKeyup: d,
                  style: g(g({}, _), o.style || {})
                }
              ),
              [(p = n.default) === null || p === void 0 ? void 0 : p.call(n)]
            )
          )
        }
      )
    }
  }),
  zt = Va
function Wt(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? Object(arguments[t]) : {},
      a = Object.keys(n)
    typeof Object.getOwnPropertySymbols == 'function' &&
      (a = a.concat(
        Object.getOwnPropertySymbols(n).filter(function(o) {
          return Object.getOwnPropertyDescriptor(n, o).enumerable
        })
      )),
      a.forEach(function(o) {
        Fa(e, o, n[o])
      })
  }
  return e
}
function Fa(e, t, n) {
  return (
    t in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0
        })
      : (e[t] = n),
    e
  )
}
var xt = function(t, n) {
  var a = Wt({}, t, n.attrs)
  return s(nt, Wt({}, a, { icon: aa }), null)
}
xt.displayName = 'EnterOutlined'
xt.inheritAttrs = !1
const Ga = xt,
  Ua = (e, t, n, a) => {
    const { sizeMarginHeadingVerticalEnd: o, fontWeightStrong: r } = a
    return {
      marginBottom: o,
      color: n,
      fontWeight: r,
      fontSize: e,
      lineHeight: t
    }
  },
  Ya = e => {
    const t = [1, 2, 3, 4, 5],
      n = {}
    return (
      t.forEach(a => {
        n[
          `
      h${a}&,
      div&-h${a},
      div&-h${a} > textarea,
      h${a}
    `
        ] = Ua(
          e[`fontSizeHeading${a}`],
          e[`lineHeightHeading${a}`],
          e.colorTextHeading,
          e
        )
      }),
      n
    )
  },
  qa = e => {
    const { componentCls: t } = e
    return {
      'a&, a': g(g({}, Qt(e)), {
        textDecoration: e.linkDecoration,
        '&:active, &:hover': { textDecoration: e.linkHoverDecoration },
        [`&[disabled], &${t}-disabled`]: {
          color: e.colorTextDisabled,
          cursor: 'not-allowed',
          '&:active, &:hover': { color: e.colorTextDisabled },
          '&:active': { pointerEvents: 'none' }
        }
      })
    }
  },
  Za = () => ({
    code: {
      margin: '0 0.2em',
      paddingInline: '0.4em',
      paddingBlock: '0.2em 0.1em',
      fontSize: '85%',
      background: 'rgba(150, 150, 150, 0.1)',
      border: '1px solid rgba(100, 100, 100, 0.2)',
      borderRadius: 3
    },
    kbd: {
      margin: '0 0.2em',
      paddingInline: '0.4em',
      paddingBlock: '0.15em 0.1em',
      fontSize: '90%',
      background: 'rgba(150, 150, 150, 0.06)',
      border: '1px solid rgba(100, 100, 100, 0.2)',
      borderBottomWidth: 2,
      borderRadius: 3
    },
    mark: { padding: 0, backgroundColor: oa[2] },
    'u, ins': { textDecoration: 'underline', textDecorationSkipInk: 'auto' },
    's, del': { textDecoration: 'line-through' },
    strong: { fontWeight: 600 },
    'ul, ol': {
      marginInline: 0,
      marginBlock: '0 1em',
      padding: 0,
      li: {
        marginInline: '20px 0',
        marginBlock: 0,
        paddingInline: '4px 0',
        paddingBlock: 0
      }
    },
    ul: { listStyleType: 'circle', ul: { listStyleType: 'disc' } },
    ol: { listStyleType: 'decimal' },
    'pre, blockquote': { margin: '1em 0' },
    pre: {
      padding: '0.4em 0.6em',
      whiteSpace: 'pre-wrap',
      wordWrap: 'break-word',
      background: 'rgba(150, 150, 150, 0.1)',
      border: '1px solid rgba(100, 100, 100, 0.2)',
      borderRadius: 3,
      code: {
        display: 'inline',
        margin: 0,
        padding: 0,
        fontSize: 'inherit',
        fontFamily: 'inherit',
        background: 'transparent',
        border: 0
      }
    },
    blockquote: {
      paddingInline: '0.6em 0',
      paddingBlock: 0,
      borderInlineStart: '4px solid rgba(100, 100, 100, 0.2)',
      opacity: 0.85
    }
  }),
  Qa = e => {
    const { componentCls: t } = e,
      a = Vn(e).inputPaddingVertical + 1
    return {
      '&-edit-content': {
        position: 'relative',
        'div&': {
          insetInlineStart: -e.paddingSM,
          marginTop: -a,
          marginBottom: `calc(1em - ${a}px)`
        },
        [`${t}-edit-content-confirm`]: {
          position: 'absolute',
          insetInlineEnd: e.marginXS + 2,
          insetBlockEnd: e.marginXS,
          color: e.colorTextDescription,
          fontWeight: 'normal',
          fontSize: e.fontSize,
          fontStyle: 'normal',
          pointerEvents: 'none'
        },
        textarea: {
          margin: '0!important',
          MozTransition: 'none',
          height: '1em'
        }
      }
    }
  },
  Ja = e => ({
    '&-copy-success': {
      '\n    &,\n    &:hover,\n    &:focus': { color: e.colorSuccess }
    }
  }),
  eo = () => ({
    '\n  a&-ellipsis,\n  span&-ellipsis\n  ': {
      display: 'inline-block',
      maxWidth: '100%'
    },
    '&-single-line': { whiteSpace: 'nowrap' },
    '&-ellipsis-single-line': {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      'a&, span&': { verticalAlign: 'bottom' }
    },
    '&-ellipsis-multiple-line': {
      display: '-webkit-box',
      overflow: 'hidden',
      WebkitLineClamp: 3,
      WebkitBoxOrient: 'vertical'
    }
  }),
  to = e => {
    const { componentCls: t, sizeMarginHeadingVerticalStart: n } = e
    return {
      [t]: g(
        g(
          g(
            g(
              g(
                g(
                  g(
                    g(
                      g(
                        {
                          color: e.colorText,
                          wordBreak: 'break-word',
                          lineHeight: e.lineHeight,
                          [`&${t}-secondary`]: {
                            color: e.colorTextDescription
                          },
                          [`&${t}-success`]: { color: e.colorSuccess },
                          [`&${t}-warning`]: { color: e.colorWarning },
                          [`&${t}-danger`]: {
                            color: e.colorError,
                            'a&:active, a&:focus': {
                              color: e.colorErrorActive
                            },
                            'a&:hover': { color: e.colorErrorHover }
                          },
                          [`&${t}-disabled`]: {
                            color: e.colorTextDisabled,
                            cursor: 'not-allowed',
                            userSelect: 'none'
                          },
                          '\n        div&,\n        p\n      ': {
                            marginBottom: '1em'
                          }
                        },
                        Ya(e)
                      ),
                      {
                        [`
      & + h1${t},
      & + h2${t},
      & + h3${t},
      & + h4${t},
      & + h5${t}
      `]: { marginTop: n },
                        '\n      div,\n      ul,\n      li,\n      p,\n      h1,\n      h2,\n      h3,\n      h4,\n      h5': {
                          '\n        + h1,\n        + h2,\n        + h3,\n        + h4,\n        + h5\n        ': {
                            marginTop: n
                          }
                        }
                      }
                    ),
                    Za()
                  ),
                  qa(e)
                ),
                {
                  [`
        ${t}-expand,
        ${t}-edit,
        ${t}-copy
      `]: g(g({}, Qt(e)), { marginInlineStart: e.marginXXS })
                }
              ),
              Qa(e)
            ),
            Ja(e)
          ),
          eo()
        ),
        { '&-rtl': { direction: 'rtl' } }
      )
    }
  },
  sn = Ft('Typography', e => [to(e)], {
    sizeMarginHeadingVerticalStart: '1.2em',
    sizeMarginHeadingVerticalEnd: '0.5em'
  }),
  no = () => ({
    prefixCls: String,
    value: String,
    maxlength: Number,
    autoSize: { type: [Boolean, Object] },
    onSave: Function,
    onCancel: Function,
    onEnd: Function,
    onChange: Function,
    originContent: String,
    direction: String,
    component: String
  }),
  ao = ie({
    compatConfig: { MODE: 3 },
    name: 'Editable',
    inheritAttrs: !1,
    props: no(),
    setup(e, t) {
      let { emit: n, slots: a, attrs: o } = t
      const { prefixCls: r } = On(e),
        i = qt({
          current: e.value || '',
          lastKeyCode: void 0,
          inComposition: !1,
          cancelFlag: !1
        })
      de(
        () => e.value,
        E => {
          i.current = E
        }
      )
      const l = F()
      Pe(() => {
        var E
        if (l.value) {
          const m =
              (E = l.value) === null || E === void 0
                ? void 0
                : E.resizableTextArea,
            R = m == null ? void 0 : m.textArea
          R.focus()
          const { length: b } = R.value
          R.setSelectionRange(b, b)
        }
      })
      function d(E) {
        l.value = E
      }
      function v(E) {
        let {
          target: { value: m }
        } = E
        ;(i.current = m.replace(/[\r\n]/g, '')), n('change', i.current)
      }
      function f() {
        i.inComposition = !0
      }
      function h() {
        i.inComposition = !1
      }
      function p(E) {
        const { keyCode: m } = E
        m === Z.ENTER && E.preventDefault(),
          !i.inComposition && (i.lastKeyCode = m)
      }
      function c(E) {
        const { keyCode: m, ctrlKey: R, altKey: b, metaKey: T, shiftKey: S } = E
        i.lastKeyCode === m &&
          !i.inComposition &&
          !R &&
          !b &&
          !T &&
          !S &&
          (m === Z.ENTER
            ? (y(), n('end'))
            : m === Z.ESC && ((i.current = e.originContent), n('cancel')))
      }
      function x() {
        y()
      }
      function y() {
        n('save', i.current.trim())
      }
      const [_, I] = sn(r)
      return () => {
        const E = ge(
          {
            [`${r.value}`]: !0,
            [`${r.value}-edit-content`]: !0,
            [`${r.value}-rtl`]: e.direction === 'rtl',
            [e.component ? `${r.value}-${e.component}` : '']: !0
          },
          o.class,
          I.value
        )
        return _(
          s('div', G(G({}, o), {}, { class: E }), [
            s(
              Fn,
              {
                ref: d,
                maxlength: e.maxlength,
                value: i.current,
                onChange: v,
                onKeydown: p,
                onKeyup: c,
                onCompositionstart: f,
                onCompositionend: h,
                onBlur: x,
                rows: 1,
                autoSize: e.autoSize === void 0 || e.autoSize
              },
              null
            ),
            a.enterIcon
              ? a.enterIcon({
                  className: `${e.prefixCls}-edit-content-confirm`
                })
              : s(Ga, { class: `${e.prefixCls}-edit-content-confirm` }, null)
          ])
        )
      }
    }
  }),
  oo = ao,
  io = 3,
  lo = 8
let te
const gt = { padding: 0, margin: 0, display: 'inline', lineHeight: 'inherit' }
function cn(e, t) {
  e.setAttribute('aria-hidden', 'true')
  const n = window.getComputedStyle(t),
    a = Gn(n)
  e.setAttribute('style', a),
    (e.style.position = 'fixed'),
    (e.style.left = '0'),
    (e.style.height = 'auto'),
    (e.style.minHeight = 'auto'),
    (e.style.maxHeight = 'auto'),
    (e.style.paddingTop = '0'),
    (e.style.paddingBottom = '0'),
    (e.style.borderTopWidth = '0'),
    (e.style.borderBottomWidth = '0'),
    (e.style.top = '-999999px'),
    (e.style.zIndex = '-1000'),
    (e.style.textOverflow = 'clip'),
    (e.style.whiteSpace = 'normal'),
    (e.style.webkitLineClamp = 'none')
}
function ro(e) {
  const t = document.createElement('div')
  cn(t, e),
    t.appendChild(document.createTextNode('text')),
    document.body.appendChild(t)
  const n = t.getBoundingClientRect().height
  return document.body.removeChild(t), n
}
const so = (e, t, n, a, o) => {
  te ||
    ((te = document.createElement('div')),
    te.setAttribute('aria-hidden', 'true'),
    document.body.appendChild(te))
  const { rows: r, suffix: i = '' } = t,
    l = ro(e),
    d = Math.round(l * r * 100) / 100
  cn(te, e)
  const v = Rn({
    render() {
      return s('div', { style: gt }, [
        s('span', { style: gt }, [n, i]),
        s('span', { style: gt }, [a])
      ])
    }
  })
  v.mount(te)
  function f() {
    return Math.round(te.getBoundingClientRect().height * 100) / 100 - 0.1 <= d
  }
  if (f()) return v.unmount(), { content: n, text: te.innerHTML, ellipsis: !1 }
  const h = Array.prototype.slice
      .apply(te.childNodes[0].childNodes[0].cloneNode(!0).childNodes)
      .filter(m => {
        let { nodeType: R, data: b } = m
        return R !== lo && b !== ''
      }),
    p = Array.prototype.slice.apply(
      te.childNodes[0].childNodes[1].cloneNode(!0).childNodes
    )
  v.unmount()
  const c = []
  te.innerHTML = ''
  const x = document.createElement('span')
  te.appendChild(x)
  const y = document.createTextNode(o + i)
  x.appendChild(y),
    p.forEach(m => {
      te.appendChild(m)
    })
  function _(m) {
    x.insertBefore(m, y)
  }
  function I(m, R) {
    let b = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0,
      T =
        arguments.length > 3 && arguments[3] !== void 0
          ? arguments[3]
          : R.length,
      S = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 0
    const B = Math.floor((b + T) / 2),
      H = R.slice(0, B)
    if (((m.textContent = H), b >= T - 1))
      for (let k = T; k >= b; k -= 1) {
        const K = R.slice(0, k)
        if (((m.textContent = K), f() || !K))
          return k === R.length
            ? { finished: !1, vNode: R }
            : { finished: !0, vNode: K }
      }
    return f() ? I(m, R, B, T, B) : I(m, R, b, B, S)
  }
  function E(m) {
    if (m.nodeType === io) {
      const b = m.textContent || '',
        T = document.createTextNode(b)
      return _(T), I(T, b)
    }
    return { finished: !1, vNode: null }
  }
  return (
    h.some(m => {
      const { finished: R, vNode: b } = E(m)
      return b && c.push(b), R
    }),
    { content: c, text: te.innerHTML, ellipsis: !0 }
  )
}
var co =
  (globalThis && globalThis.__rest) ||
  function(e, t) {
    var n = {}
    for (var a in e)
      Object.prototype.hasOwnProperty.call(e, a) &&
        t.indexOf(a) < 0 &&
        (n[a] = e[a])
    if (e != null && typeof Object.getOwnPropertySymbols == 'function')
      for (var o = 0, a = Object.getOwnPropertySymbols(e); o < a.length; o++)
        t.indexOf(a[o]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(e, a[o]) &&
          (n[a[o]] = e[a[o]])
    return n
  }
const uo = () => ({ prefixCls: String, direction: String, component: String }),
  po = ie({
    name: 'ATypography',
    inheritAttrs: !1,
    props: uo(),
    setup(e, t) {
      let { slots: n, attrs: a } = t
      const { prefixCls: o, direction: r } = yt('typography', e),
        [i, l] = sn(o)
      return () => {
        var d
        const v = g(g({}, e), a),
          { prefixCls: f, direction: h, component: p = 'article' } = v,
          c = co(v, ['prefixCls', 'direction', 'component'])
        return i(
          s(
            p,
            G(
              G({}, c),
              {},
              {
                class: ge(
                  o.value,
                  { [`${o.value}-rtl`]: r.value === 'rtl' },
                  a.class,
                  l.value
                )
              }
            ),
            {
              default: () => [
                (d = n.default) === null || d === void 0 ? void 0 : d.call(n)
              ]
            }
          )
        )
      }
    }
  }),
  oe = po,
  fo = () => {
    const e = document.getSelection()
    if (!e.rangeCount) return function() {}
    let t = document.activeElement
    const n = []
    for (let a = 0; a < e.rangeCount; a++) n.push(e.getRangeAt(a))
    switch (t.tagName.toUpperCase()) {
      case 'INPUT':
      case 'TEXTAREA':
        t.blur()
        break
      default:
        t = null
        break
    }
    return (
      e.removeAllRanges(),
      function() {
        e.type === 'Caret' && e.removeAllRanges(),
          e.rangeCount ||
            n.forEach(function(a) {
              e.addRange(a)
            }),
          t && t.focus()
      }
    )
  },
  vo = fo,
  jt = { 'text/plain': 'Text', 'text/html': 'Url', default: 'Text' },
  bo = 'Copy to clipboard: #{key}, Enter'
function go(e) {
  const t = (/mac os x/i.test(navigator.userAgent) ? '⌘' : 'Ctrl') + '+C'
  return e.replace(/#{\s*key\s*}/g, t)
}
function mo(e, t) {
  let n,
    a,
    o,
    r,
    i,
    l = !1
  t || (t = {})
  const d = t.debug || !1
  try {
    if (
      ((a = vo()),
      (o = document.createRange()),
      (r = document.getSelection()),
      (i = document.createElement('span')),
      (i.textContent = e),
      (i.style.all = 'unset'),
      (i.style.position = 'fixed'),
      (i.style.top = 0),
      (i.style.clip = 'rect(0, 0, 0, 0)'),
      (i.style.whiteSpace = 'pre'),
      (i.style.webkitUserSelect = 'text'),
      (i.style.MozUserSelect = 'text'),
      (i.style.msUserSelect = 'text'),
      (i.style.userSelect = 'text'),
      i.addEventListener('copy', function(f) {
        if ((f.stopPropagation(), t.format))
          if ((f.preventDefault(), typeof f.clipboardData > 'u')) {
            d && console.warn('unable to use e.clipboardData'),
              d && console.warn('trying IE specific stuff'),
              window.clipboardData.clearData()
            const h = jt[t.format] || jt.default
            window.clipboardData.setData(h, e)
          } else
            f.clipboardData.clearData(), f.clipboardData.setData(t.format, e)
        t.onCopy && (f.preventDefault(), t.onCopy(f.clipboardData))
      }),
      document.body.appendChild(i),
      o.selectNodeContents(i),
      r.addRange(o),
      !document.execCommand('copy'))
    )
      throw new Error('copy command was unsuccessful')
    l = !0
  } catch (v) {
    d && console.error('unable to copy using execCommand: ', v),
      d && console.warn('trying IE specific stuff')
    try {
      window.clipboardData.setData(t.format || 'text', e),
        t.onCopy && t.onCopy(window.clipboardData),
        (l = !0)
    } catch (f) {
      d && console.error('unable to copy using clipboardData: ', f),
        d && console.error('falling back to prompt'),
        (n = go('message' in t ? t.message : bo)),
        window.prompt(n, e)
    }
  } finally {
    r &&
      (typeof r.removeRange == 'function'
        ? r.removeRange(o)
        : r.removeAllRanges()),
      i && document.body.removeChild(i),
      a()
  }
  return l
}
function Kt(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? Object(arguments[t]) : {},
      a = Object.keys(n)
    typeof Object.getOwnPropertySymbols == 'function' &&
      (a = a.concat(
        Object.getOwnPropertySymbols(n).filter(function(o) {
          return Object.getOwnPropertyDescriptor(n, o).enumerable
        })
      )),
      a.forEach(function(o) {
        ho(e, o, n[o])
      })
  }
  return e
}
function ho(e, t, n) {
  return (
    t in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0
        })
      : (e[t] = n),
    e
  )
}
var St = function(t, n) {
  var a = Kt({}, t, n.attrs)
  return s(nt, Kt({}, a, { icon: ia }), null)
}
St.displayName = 'CopyOutlined'
St.inheritAttrs = !1
const yo = St
function Xt(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? Object(arguments[t]) : {},
      a = Object.keys(n)
    typeof Object.getOwnPropertySymbols == 'function' &&
      (a = a.concat(
        Object.getOwnPropertySymbols(n).filter(function(o) {
          return Object.getOwnPropertyDescriptor(n, o).enumerable
        })
      )),
      a.forEach(function(o) {
        $o(e, o, n[o])
      })
  }
  return e
}
function $o(e, t, n) {
  return (
    t in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0
        })
      : (e[t] = n),
    e
  )
}
var Ct = function(t, n) {
  var a = Xt({}, t, n.attrs)
  return s(nt, Xt({}, a, { icon: la }), null)
}
Ct.displayName = 'EditOutlined'
Ct.inheritAttrs = !1
const xo = Ct
var So =
  (globalThis && globalThis.__rest) ||
  function(e, t) {
    var n = {}
    for (var a in e)
      Object.prototype.hasOwnProperty.call(e, a) &&
        t.indexOf(a) < 0 &&
        (n[a] = e[a])
    if (e != null && typeof Object.getOwnPropertySymbols == 'function')
      for (var o = 0, a = Object.getOwnPropertySymbols(e); o < a.length; o++)
        t.indexOf(a[o]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(e, a[o]) &&
          (n[a[o]] = e[a[o]])
    return n
  }
const Co = Jt('webkitLineClamp'),
  _o = Jt('textOverflow'),
  Vt = '...',
  je = () => ({
    editable: { type: [Boolean, Object], default: void 0 },
    copyable: { type: [Boolean, Object], default: void 0 },
    prefixCls: String,
    component: String,
    type: String,
    disabled: { type: Boolean, default: void 0 },
    ellipsis: { type: [Boolean, Object], default: void 0 },
    code: { type: Boolean, default: void 0 },
    mark: { type: Boolean, default: void 0 },
    underline: { type: Boolean, default: void 0 },
    delete: { type: Boolean, default: void 0 },
    strong: { type: Boolean, default: void 0 },
    keyboard: { type: Boolean, default: void 0 },
    content: String,
    'onUpdate:content': Function
  }),
  To = ie({
    compatConfig: { MODE: 3 },
    name: 'TypographyBase',
    inheritAttrs: !1,
    props: je(),
    setup(e, t) {
      let { slots: n, attrs: a, emit: o } = t
      const { prefixCls: r, direction: i } = yt('typography', e),
        l = qt({
          copied: !1,
          ellipsisText: '',
          ellipsisContent: null,
          isEllipsis: !1,
          expanded: !1,
          clientRendered: !1,
          expandStr: '',
          copyStr: '',
          copiedStr: '',
          editStr: '',
          copyId: void 0,
          rafId: void 0,
          prevProps: void 0,
          originContent: ''
        }),
        d = F(),
        v = F(),
        f = V(() => {
          const u = e.ellipsis
          return u
            ? g({ rows: 1, expandable: !1 }, typeof u == 'object' ? u : null)
            : {}
        })
      Pe(() => {
        ;(l.clientRendered = !0), B()
      }),
        at(() => {
          clearTimeout(l.copyId), Te.cancel(l.rafId)
        }),
        de(
          [() => f.value.rows, () => e.content],
          () => {
            Pt(() => {
              T()
            })
          },
          { flush: 'post', deep: !0 }
        ),
        We(() => {
          e.content === void 0 && (ze(!e.editable), ze(!e.ellipsis))
        })
      function h() {
        var u
        return e.ellipsis || e.editable
          ? e.content
          : (u = ft(d.value)) === null || u === void 0
          ? void 0
          : u.innerText
      }
      function p(u) {
        const { onExpand: $ } = f.value
        ;(l.expanded = !0), $ == null || $(u)
      }
      function c(u) {
        u.preventDefault(), (l.originContent = e.content), b(!0)
      }
      function x(u) {
        y(u), b(!1)
      }
      function y(u) {
        const { onChange: $ } = E.value
        u !== e.content && (o('update:content', u), $ == null || $(u))
      }
      function _() {
        var u, $
        ;($ = (u = E.value).onCancel) === null || $ === void 0 || $.call(u),
          b(!1)
      }
      function I(u) {
        u.preventDefault(), u.stopPropagation()
        const { copyable: $ } = e,
          C = g({}, typeof $ == 'object' ? $ : null)
        C.text === void 0 && (C.text = h()),
          mo(C.text || ''),
          (l.copied = !0),
          Pt(() => {
            C.onCopy && C.onCopy(u),
              (l.copyId = setTimeout(() => {
                l.copied = !1
              }, 3e3))
          })
      }
      const E = V(() => {
          const u = e.editable
          return u ? g({}, typeof u == 'object' ? u : null) : { editing: !1 }
        }),
        [m, R] = ht(!1, { value: V(() => E.value.editing) })
      function b(u) {
        const { onStart: $ } = E.value
        u && $ && $(), R(u)
      }
      de(
        m,
        u => {
          var $
          u || ($ = v.value) === null || $ === void 0 || $.focus()
        },
        { flush: 'post' }
      )
      function T(u) {
        if (u) {
          const { width: $, height: C } = u
          if (!$ || !C) return
        }
        Te.cancel(l.rafId),
          (l.rafId = Te(() => {
            B()
          }))
      }
      const S = V(() => {
          const {
            rows: u,
            expandable: $,
            suffix: C,
            onEllipsis: D,
            tooltip: N
          } = f.value
          return C || N || e.editable || e.copyable || $ || D
            ? !1
            : u === 1
            ? _o
            : Co
        }),
        B = () => {
          const { ellipsisText: u, isEllipsis: $ } = l,
            { rows: C, suffix: D, onEllipsis: N } = f.value
          if (
            !C ||
            C < 0 ||
            !ft(d.value) ||
            l.expanded ||
            e.content === void 0 ||
            S.value
          )
            return
          const { content: Q, text: z, ellipsis: ne } = so(
            ft(d.value),
            { rows: C, suffix: D },
            e.content,
            Se(!0),
            Vt
          )
          ;(u !== z || l.isEllipsis !== ne) &&
            ((l.ellipsisText = z),
            (l.ellipsisContent = Q),
            (l.isEllipsis = ne),
            $ !== ne && N && N(ne))
        }
      function H(u, $) {
        let {
            mark: C,
            code: D,
            underline: N,
            delete: Q,
            strong: z,
            keyboard: ne
          } = u,
          re = $
        function J(he, X) {
          if (!he) return
          const Ce = (function() {
            return re
          })()
          re = s(X, null, { default: () => [Ce] })
        }
        return (
          J(z, 'strong'),
          J(N, 'u'),
          J(Q, 'del'),
          J(D, 'code'),
          J(C, 'mark'),
          J(ne, 'kbd'),
          re
        )
      }
      function k(u) {
        const { expandable: $, symbol: C } = f.value
        if (!$ || (!u && (l.expanded || !l.isEllipsis))) return null
        const D = (n.ellipsisSymbol ? n.ellipsisSymbol() : C) || l.expandStr
        return s(
          'a',
          {
            key: 'expand',
            class: `${r.value}-expand`,
            onClick: p,
            'aria-label': l.expandStr
          },
          [D]
        )
      }
      function K() {
        if (!e.editable) return
        const { tooltip: u, triggerType: $ = ['icon'] } = e.editable,
          C = n.editableIcon
            ? n.editableIcon()
            : s(xo, { role: 'button' }, null),
          D = n.editableTooltip ? n.editableTooltip() : l.editStr,
          N = typeof D == 'string' ? D : ''
        return $.indexOf('icon') !== -1
          ? s(
              bt,
              { key: 'edit', title: u === !1 ? '' : D },
              {
                default: () => [
                  s(
                    zt,
                    {
                      ref: v,
                      class: `${r.value}-edit`,
                      onClick: c,
                      'aria-label': N
                    },
                    { default: () => [C] }
                  )
                ]
              }
            )
          : null
      }
      function me() {
        if (!e.copyable) return
        const { tooltip: u } = e.copyable,
          $ = l.copied ? l.copiedStr : l.copyStr,
          C = n.copyableTooltip ? n.copyableTooltip({ copied: l.copied }) : $,
          D = typeof C == 'string' ? C : '',
          N = l.copied ? s(Un, null, null) : s(yo, null, null),
          Q = n.copyableIcon ? n.copyableIcon({ copied: !!l.copied }) : N
        return s(
          bt,
          { key: 'copy', title: u === !1 ? '' : C },
          {
            default: () => [
              s(
                zt,
                {
                  class: [
                    `${r.value}-copy`,
                    { [`${r.value}-copy-success`]: l.copied }
                  ],
                  onClick: I,
                  'aria-label': D
                },
                { default: () => [Q] }
              )
            ]
          }
        )
      }
      function xe() {
        const { class: u, style: $ } = a,
          { maxlength: C, autoSize: D, onEnd: N } = E.value
        return s(
          oo,
          {
            class: u,
            style: $,
            prefixCls: r.value,
            value: e.content,
            originContent: l.originContent,
            maxlength: C,
            autoSize: D,
            onSave: x,
            onChange: y,
            onCancel: _,
            onEnd: N,
            direction: i.value,
            component: e.component
          },
          { enterIcon: n.editableEnterIcon }
        )
      }
      function Se(u) {
        return [k(u), K(), me()].filter($ => $)
      }
      return () => {
        var u
        const { triggerType: $ = ['icon'] } = E.value,
          C =
            e.ellipsis || e.editable
              ? e.content !== void 0
                ? e.content
                : (u = n.default) === null || u === void 0
                ? void 0
                : u.call(n)
              : n.default
              ? n.default()
              : e.content
        return m.value
          ? xe()
          : s(
              Cn,
              {
                componentName: 'Text',
                children: D => {
                  const N = g(g({}, e), a),
                    {
                      type: Q,
                      disabled: z,
                      content: ne,
                      class: re,
                      style: J
                    } = N,
                    he = So(N, [
                      'type',
                      'disabled',
                      'content',
                      'class',
                      'style'
                    ]),
                    { rows: X, suffix: Ce, tooltip: we } = f.value,
                    { edit: Xe, copy: Ie, copied: Ve, expand: st } = D
                  ;(l.editStr = Xe),
                    (l.copyStr = Ie),
                    (l.copiedStr = Ve),
                    (l.expandStr = st)
                  const ct = Oe(he, [
                      'prefixCls',
                      'editable',
                      'copyable',
                      'ellipsis',
                      'mark',
                      'code',
                      'delete',
                      'underline',
                      'strong',
                      'keyboard',
                      'onUpdate:content'
                    ]),
                    ae = S.value,
                    Fe = X === 1 && ae,
                    Be = X && X > 1 && ae
                  let ue = C,
                    O
                  if (X && l.isEllipsis && !l.expanded && !ae) {
                    const { title: L } = he
                    let M = L || ''
                    !L &&
                      (typeof C == 'string' || typeof C == 'number') &&
                      (M = String(C)),
                      (M =
                        M == null
                          ? void 0
                          : M.slice(String(l.ellipsisContent || '').length)),
                      (ue = s(Me, null, [
                        In(l.ellipsisContent),
                        s('span', { title: M, 'aria-hidden': 'true' }, [Vt]),
                        Ce
                      ]))
                  } else ue = s(Me, null, [C, Ce])
                  ue = H(e, ue)
                  const w = we && X && l.isEllipsis && !l.expanded && !ae,
                    A = n.ellipsisTooltip ? n.ellipsisTooltip() : we
                  return s(
                    mt,
                    { onResize: T, disabled: !X },
                    {
                      default: () => [
                        s(
                          oe,
                          G(
                            {
                              ref: d,
                              class: [
                                {
                                  [`${r.value}-${Q}`]: Q,
                                  [`${r.value}-disabled`]: z,
                                  [`${r.value}-ellipsis`]: X,
                                  [`${r.value}-single-line`]:
                                    X === 1 && !l.isEllipsis,
                                  [`${r.value}-ellipsis-single-line`]: Fe,
                                  [`${r.value}-ellipsis-multiple-line`]: Be
                                },
                                re
                              ],
                              style: g(g({}, J), {
                                WebkitLineClamp: Be ? X : void 0
                              }),
                              'aria-label': O,
                              direction: i.value,
                              onClick: $.indexOf('text') !== -1 ? c : () => {}
                            },
                            ct
                          ),
                          {
                            default: () => [
                              w
                                ? s(
                                    bt,
                                    { title: we === !0 ? C : A },
                                    { default: () => [s('span', null, [ue])] }
                                  )
                                : ue,
                              Se()
                            ]
                          }
                        )
                      ]
                    }
                  )
                }
              },
              null
            )
      }
    }
  }),
  Ke = To
var wo =
  (globalThis && globalThis.__rest) ||
  function(e, t) {
    var n = {}
    for (var a in e)
      Object.prototype.hasOwnProperty.call(e, a) &&
        t.indexOf(a) < 0 &&
        (n[a] = e[a])
    if (e != null && typeof Object.getOwnPropertySymbols == 'function')
      for (var o = 0, a = Object.getOwnPropertySymbols(e); o < a.length; o++)
        t.indexOf(a[o]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(e, a[o]) &&
          (n[a[o]] = e[a[o]])
    return n
  }
const Eo = () =>
    Oe(g(g({}, je()), { ellipsis: { type: Boolean, default: void 0 } }), [
      'component'
    ]),
  ot = (e, t) => {
    let { slots: n, attrs: a } = t
    const o = g(g({}, e), a),
      { ellipsis: r, rel: i } = o,
      l = wo(o, ['ellipsis', 'rel'])
    ze()
    const d = g(g({}, l), {
      rel: i === void 0 && l.target === '_blank' ? 'noopener noreferrer' : i,
      ellipsis: !!r,
      component: 'a'
    })
    return delete d.navigate, s(Ke, d, n)
  }
ot.displayName = 'ATypographyLink'
ot.inheritAttrs = !1
ot.props = Eo()
const _t = ot,
  Po = () => Oe(je(), ['component']),
  it = (e, t) => {
    let { slots: n, attrs: a } = t
    const o = g(g(g({}, e), { component: 'div' }), a)
    return s(Ke, o, n)
  }
it.displayName = 'ATypographyParagraph'
it.inheritAttrs = !1
it.props = Po()
const dn = it,
  Oo = () =>
    g(g({}, Oe(je(), ['component'])), {
      ellipsis: { type: [Boolean, Object], default: void 0 }
    }),
  lt = (e, t) => {
    let { slots: n, attrs: a } = t
    const { ellipsis: o } = e
    ze()
    const r = g(
      g(g({}, e), {
        ellipsis: o && typeof o == 'object' ? Oe(o, ['expandable', 'rows']) : o,
        component: 'span'
      }),
      a
    )
    return s(Ke, r, n)
  }
lt.displayName = 'ATypographyText'
lt.inheritAttrs = !1
lt.props = Oo()
const et = lt
var Ro =
  (globalThis && globalThis.__rest) ||
  function(e, t) {
    var n = {}
    for (var a in e)
      Object.prototype.hasOwnProperty.call(e, a) &&
        t.indexOf(a) < 0 &&
        (n[a] = e[a])
    if (e != null && typeof Object.getOwnPropertySymbols == 'function')
      for (var o = 0, a = Object.getOwnPropertySymbols(e); o < a.length; o++)
        t.indexOf(a[o]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(e, a[o]) &&
          (n[a[o]] = e[a[o]])
    return n
  }
const Io = _n(1, 2, 3, 4, 5),
  Bo = () => g(g({}, Oe(je(), ['component', 'strong'])), { level: Number }),
  rt = (e, t) => {
    let { slots: n, attrs: a } = t
    const { level: o = 1 } = e,
      r = Ro(e, ['level'])
    let i
    Io.includes(o) ? (i = `h${o}`) : (ze(), (i = 'h1'))
    const l = g(g(g({}, r), { component: i }), a)
    return s(Ke, l, n)
  }
rt.displayName = 'ATypographyTitle'
rt.inheritAttrs = !1
rt.props = Bo()
const un = rt
oe.Text = et
oe.Title = un
oe.Paragraph = dn
oe.Link = _t
oe.Base = Ke
oe.install = function(e) {
  return (
    e.component(oe.name, oe),
    e.component(oe.Text.displayName, et),
    e.component(oe.Title.displayName, un),
    e.component(oe.Paragraph.displayName, dn),
    e.component(oe.Link.displayName, _t),
    e
  )
}
const ko = Bn('renderCondition', () => {
    const e = F({}),
      t = Yt(),
      { vendorSettings: n } = Zt(t),
      a = F([]),
      o = (h, p, c) => {
        a.value.push({ id: h, content: p, isInitialized: !1, useEditor: c })
      },
      r = h => {
        a.value = a.value.filter(p => p.id !== h)
      },
      i = h => a.value.find(p => p.id === h),
      l = h => {
        const { fields: p } = h
        p.forEach(c => {
          if (c != null && c.render_condition) {
            const { key: x, value: y } = c.render_condition
            e.value[x]
              ? e.value[x].childs.push({ id: c.id, value: y, render: !1 })
              : (e.value[x] = { childs: [{ id: c.id, value: y, render: !1 }] })
          }
        })
      },
      d = (h, p) => {
        if (!e.value[h]) return !1
        const c = e.value[h].childs.filter(y => y.value.includes(p))
        c &&
          c.forEach(y => {
            ;(y.render = !0), v(y.id, !0)
          })
        const x = e.value[h].childs.filter(y => !y.value.includes(p))
        return (
          x.forEach(y => {
            ;(y.render = !1), v(y.id, !1)
          }),
          (e.value[h].childs = [...c, ...x]),
          !0
        )
      },
      v = (h, p) => {
        if (!e.value[h]) return !1
        const c = e.value[h].childs,
          x = n.value[h]
        return (
          c &&
            c.forEach(y => {
              y.value.includes(x) ? (y.render = p) : (y.render = !1)
            }),
          (e.value[h].childs = c),
          !0
        )
      }
    return {
      conditions: e,
      wpEditors: a,
      addWpEditor: o,
      removeWpEditor: r,
      addConditionsByTab: l,
      controlRenderChild: d,
      checkRenderCondition: (h, p) => {
        if (!e.value[h]) return !1
        const c = e.value[h].childs.find(x => x.id === p)
        return c ? c.render : !1
      },
      getWpEditor: i
    }
  }),
  Do = ['onClick'],
  Ao = { key: 0 },
  No = {
    href:
      'https://www.wcvendors.com/pricing/?utm_source=plugin&utm_medium=allplugins&utm_campaign=profeatures&utm_content=upsellbanner',
    target: '_blank'
  },
  Lo = ['innerHTML'],
  Mo = Re('div', { style: { height: '6em' } }, null, -1),
  Ho = ie({
    __name: 'VendorEdit',
    props: { id: Number },
    setup(e) {
      const t = e,
        n = Nn(() =>
          Tn(
            () => import('./DynamicControl.627d1dc9.js').then(y => y.D),
            [
              window.wcv_avp.pluginDirUrl +
                '/dist/common/DynamicControl.627d1dc9.js',
              window.wcv_avp.pluginDirUrl + '/dist/main.491ba5c0.js',
              window.wcv_avp.pluginDirUrl + '/dist/common/vendor.84fc1123.js',
              window.wcv_avp.pluginDirUrl + '/dist/common/antd.7f3c63f7.js',
              window.wcv_avp.pluginDirUrl +
                '/dist/common/VendorStore.d737faa9.js',
              window.wcv_avp.pluginDirUrl +
                '/dist/common/initDefaultProps.71991ecc.js',
              window.wcv_avp.pluginDirUrl + '/dist/common/index.4e3cad7b.js',
              window.wcv_avp.pluginDirUrl +
                '/dist/common/_plugin-vue_export-helper.c27b6911.js',
              window.wcv_avp.pluginDirUrl + '/dist/common/index.109b4b21.js',
              window.wcv_avp.pluginDirUrl + '/dist/common/index.380800ce.js',
              window.wcv_avp.pluginDirUrl + '/dist/common/index.7f1c23e8.js',
              window.wcv_avp.pluginDirUrl +
                '/dist/common/ActionButton.265b9cc4.js',
              window.wcv_avp.pluginDirUrl +
                '/dist/assets/DynamicControl-ec409874.css'
            ],
            import.meta.url
          )
        ),
        a = Yn(),
        o = Yt(),
        r = window.wcv_avp.logo_path,
        i = kn(),
        l = F('general'),
        { vendorSettings: d, showPopup: v } = Zt(o),
        f = ko(),
        h = F(window.wcv_avp.tabs)
      h.value.forEach(y => {
        f.addConditionsByTab(y),
          y.fields.forEach(_ => {
            _.type === 'wp_editor' &&
              f.addWpEditor(_.id, d.value[_.id] ?? '', _.use_editor)
          })
      })
      const p = () => {
          i.push({ name: 'vendor' })
        },
        c = async () => {
          await o.saveSettings(t.id ?? 0)
        },
        x = async () => {
          await a.setVendorStatus(t.id ?? 0, 'deactivate')
        }
      return (y, _) => {
        var I, E
        return (
          $e(),
          Ye(
            Me,
            null,
            [
              s(
                P(Ne),
                { size: 20, direction: 'vertical', style: { width: '100%' } },
                {
                  default: j(() => {
                    var m
                    return [
                      Re('div', null, [
                        Re(
                          'a',
                          { onClick: Dn(p, ['prevent']) },
                          ' ← ' + be(P(ve)('allVendor')),
                          9,
                          Do
                        ),
                        Re(
                          'h1',
                          null,
                          be(
                            ((m = P(d)) == null ? void 0 : m.shop_name) ??
                              P(d).display_name
                          ),
                          1
                        )
                      ])
                    ]
                  }),
                  _: 1
                }
              ),
              (I = P(d)) != null && I.code
                ? ($e(),
                  Ye('h3', Ao, be((E = P(d)) == null ? void 0 : E.message), 1))
                : qe('', !0),
              P(d).shop_name || P(d).display_name
                ? ($e(),
                  Ae(
                    P(He),
                    {
                      key: 1,
                      activeKey: l.value,
                      'onUpdate:activeKey': _[0] || (_[0] = m => (l.value = m)),
                      size: 'large'
                    },
                    {
                      rightExtra: j(() => [
                        s(P(Ne), null, {
                          default: j(() => {
                            var m
                            return [
                              s(
                                P(Ze),
                                { type: 'primary', onClick: c },
                                {
                                  default: j(() => [
                                    Ee(be(P(ve)('saveChanges')), 1)
                                  ]),
                                  _: 1
                                }
                              ),
                              ((m = P(d)) == null
                                ? void 0
                                : m.vendor_status) === 'active'
                                ? ($e(),
                                  Ae(
                                    P(qn),
                                    {
                                      key: 0,
                                      title: P(ve)('confirmDeactive'),
                                      'ok-text': P(ve)('ok'),
                                      'cancel-text': P(ve)('cancel'),
                                      onConfirm: x
                                    },
                                    {
                                      default: j(() => [
                                        s(
                                          P(Ze),
                                          { danger: '', type: 'primary' },
                                          {
                                            default: j(() => [
                                              Ee(be(P(ve)('deactive')), 1)
                                            ]),
                                            _: 1
                                          }
                                        )
                                      ]),
                                      _: 1
                                    },
                                    8,
                                    ['title', 'ok-text', 'cancel-text']
                                  ))
                                : qe('', !0)
                            ]
                          }),
                          _: 1
                        })
                      ]),
                      default: j(() => [
                        ($e(!0),
                        Ye(
                          Me,
                          null,
                          Ot(
                            h.value,
                            m => (
                              $e(),
                              Ae(
                                P(Je),
                                { id: m.key, key: m.key, tab: m.label },
                                {
                                  default: j(() => [
                                    ($e(!0),
                                    Ye(
                                      Me,
                                      null,
                                      Ot(
                                        m.fields,
                                        R => (
                                          $e(),
                                          Ae(
                                            P(n),
                                            { 'field-props': R },
                                            null,
                                            8,
                                            ['field-props']
                                          )
                                        )
                                      ),
                                      256
                                    ))
                                  ]),
                                  _: 2
                                },
                                1032,
                                ['id', 'tab']
                              )
                            )
                          ),
                          128
                        ))
                      ]),
                      _: 1
                    },
                    8,
                    ['activeKey']
                  ))
                : qe('', !0),
              P(d).shop_name || P(d).display_name
                ? ($e(),
                  Ae(
                    P(Ne),
                    { key: 2 },
                    {
                      default: j(() => [
                        s(
                          P(Ze),
                          { type: 'primary', onClick: c },
                          {
                            default: j(() => [Ee(be(P(ve)('saveChanges')), 1)]),
                            _: 1
                          }
                        )
                      ]),
                      _: 1
                    }
                  ))
                : qe('', !0),
              s(
                P(ca),
                {
                  open: P(v),
                  'onUpdate:open':
                    _[2] || (_[2] = m => (An(v) ? (v.value = m) : null)),
                  title: ''
                },
                {
                  footer: j(() => [
                    s(
                      P(Ze),
                      {
                        type: 'primary',
                        onClick: _[1] || (_[1] = m => (v.value = !1))
                      },
                      { default: j(() => [Ee(be(P(ve)('ok')), 1)]), _: 1 }
                    )
                  ]),
                  default: j(() => [
                    s(
                      P(Ne),
                      { direction: 'vertical', size: 'middle' },
                      {
                        default: j(() => [
                          Re('a', No, [
                            s(
                              P(ra),
                              {
                                src: P(r),
                                preview: !1,
                                width: 240,
                                height: 35
                              },
                              null,
                              8,
                              ['src']
                            )
                          ]),
                          s(
                            P(Ne),
                            { direction: 'horizontal' },
                            {
                              default: j(() => [
                                s(
                                  P(et),
                                  { strong: '' },
                                  {
                                    default: j(() => [
                                      Ee(be(P(o).modalTitle), 1)
                                    ]),
                                    _: 1
                                  }
                                ),
                                s(
                                  P(sa),
                                  { color: 'red' },
                                  {
                                    default: j(() => [
                                      Ee(be(P(ve)('proFeature')), 1)
                                    ]),
                                    _: 1
                                  }
                                )
                              ]),
                              _: 1
                            }
                          ),
                          s(P(et), null, {
                            default: j(() => [
                              Re(
                                'p',
                                { innerHTML: P(o).modalContent },
                                null,
                                8,
                                Lo
                              )
                            ]),
                            _: 1
                          }),
                          s(
                            P(_t),
                            {
                              href: `https://www.wcvendors.com/pricing/?utm_source=plugin&utm_medium=allvendorssetting&utm_campaign=avprosetting_${
                                P(o).featureSlug
                              }`,
                              target: '_blank',
                              underline: ''
                            },
                            {
                              default: j(() => [
                                Ee(be(P(ve)('seeAllFeatures')) + ' → ', 1)
                              ]),
                              _: 1
                            },
                            8,
                            ['href']
                          )
                        ]),
                        _: 1
                      }
                    )
                  ]),
                  _: 1
                },
                8,
                ['open']
              ),
              Mo
            ],
            64
          )
        )
      }
    }
  }),
  qo = Object.freeze(
    Object.defineProperty(
      { __proto__: null, default: Ho },
      Symbol.toStringTag,
      { value: 'Module' }
    )
  )
export { qo as V, ko as u }

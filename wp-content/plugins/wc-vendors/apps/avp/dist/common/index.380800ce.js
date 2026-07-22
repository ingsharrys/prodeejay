import {
  _ as a,
  b as x,
  e as H,
  P as et,
  A as re,
  g as tt,
  m as Ae,
  i as nt,
  r as ot,
  C as rt,
  a as Ze,
  W as ge,
  a6 as it,
  ab as at
} from '../main.491ba5c0.js'
import {
  r as z,
  y as oe,
  q as Oe,
  p as lt,
  f as st,
  s as W,
  e as v,
  d as ie,
  j as J,
  k as ut,
  c as s,
  F as Ue,
  z as Be,
  a3 as ct
} from './vendor.84fc1123.js'
import {
  y as vt,
  z as ft,
  w as De,
  A as pt,
  j as Xe,
  F as Q,
  G as Ve,
  K as Le,
  p as gt,
  L as mt,
  H as dt,
  I as wt
} from './VendorStore.d737faa9.js'
import { d as bt, D as ht, g as Ct, i as yt } from './index.7f1c23e8.js'
import {
  s as St,
  t as Ot,
  Z as Pt,
  u as xt,
  S as It,
  T as q
} from './antd.7f3c63f7.js'
var Mt = '[object Number]'
function jt(e) {
  return typeof e == 'number' || (vt(e) && ft(e) == Mt)
}
function $t(e) {
  const t = z(null),
    n = oe(a({}, e)),
    o = z([]),
    r = u => {
      t.value === null &&
        ((o.value = []),
        (t.value = De(() => {
          let f
          o.value.forEach(g => {
            f = a(a({}, f), g)
          }),
            a(n, f),
            (t.value = null)
        }))),
        o.value.push(u)
    }
  return (
    Oe(() => {
      t.value && De.cancel(t.value)
    }),
    [n, r]
  )
}
function Ee(e, t, n, o) {
  const r = t + n,
    u = (n - o) / 2
  if (n > o) {
    if (t > 0) return { [e]: u }
    if (t < 0 && r < o) return { [e]: -u }
  } else if (t < 0 || r > o) return { [e]: t < 0 ? u : -u }
  return {}
}
function Nt(e, t, n, o) {
  const { width: r, height: u } = pt()
  let f = null
  return (
    e <= r && t <= u
      ? (f = { x: 0, y: 0 })
      : (e > r || t > u) && (f = a(a({}, Ee('x', n, e, r)), Ee('y', o, t, u))),
    f
  )
}
var At =
  (globalThis && globalThis.__rest) ||
  function(e, t) {
    var n = {}
    for (var o in e)
      Object.prototype.hasOwnProperty.call(e, o) &&
        t.indexOf(o) < 0 &&
        (n[o] = e[o])
    if (e != null && typeof Object.getOwnPropertySymbols == 'function')
      for (var r = 0, o = Object.getOwnPropertySymbols(e); r < o.length; r++)
        t.indexOf(o[r]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(e, o[r]) &&
          (n[o[r]] = e[o[r]])
    return n
  }
const Te = Symbol('previewGroupContext'),
  Pe = {
    provide: e => {
      lt(Te, e)
    },
    inject: () =>
      st(Te, {
        isPreviewGroup: W(!1),
        previewUrls: v(() => new Map()),
        setPreviewUrls: () => {},
        current: z(null),
        setCurrent: () => {},
        setShowPreview: () => {},
        setMousePosition: () => {},
        registerImage: null,
        rootClassName: ''
      })
  },
  Dt = () => ({
    previewPrefixCls: String,
    preview: { type: [Boolean, Object], default: !0 },
    icons: { type: Object, default: () => ({}) }
  }),
  Lt = ie({
    compatConfig: { MODE: 3 },
    name: 'PreviewGroup',
    inheritAttrs: !1,
    props: Dt(),
    setup(e, t) {
      let { slots: n } = t
      const o = v(() => {
          const l = {
            visible: void 0,
            onVisibleChange: () => {},
            getContainer: void 0,
            current: 0
          }
          return typeof e.preview == 'object' ? Qe(e.preview, l) : l
        }),
        r = oe(new Map()),
        u = z(),
        f = v(() => o.value.visible),
        g = v(() => o.value.getContainer),
        S = (l, P) => {
          var y, L
          ;(L = (y = o.value).onVisibleChange) === null ||
            L === void 0 ||
            L.call(y, l, P)
        },
        [I, p] = Xe(!!f.value, { value: f, onChange: S }),
        d = z(null),
        A = v(() => f.value !== void 0),
        m = v(() => Array.from(r.keys())),
        b = v(() => m.value[o.value.current]),
        h = v(
          () =>
            new Map(
              Array.from(r)
                .filter(l => {
                  let [, { canPreview: P }] = l
                  return !!P
                })
                .map(l => {
                  let [P, { url: y }] = l
                  return [P, y]
                })
            )
        ),
        w = function(l, P) {
          let y =
            arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0
          r.set(l, { url: P, canPreview: y })
        },
        C = l => {
          u.value = l
        },
        D = l => {
          d.value = l
        },
        R = function(l, P) {
          let y =
            arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0
          const L = () => {
            r.delete(l)
          }
          return r.set(l, { url: P, canPreview: y }), L
        },
        O = l => {
          l == null || l.stopPropagation(), p(!1), D(null)
        }
      return (
        J(
          b,
          l => {
            C(l)
          },
          { immediate: !0, flush: 'post' }
        ),
        ut(
          () => {
            I.value && A.value && C(b.value)
          },
          { flush: 'post' }
        ),
        Pe.provide({
          isPreviewGroup: W(!0),
          previewUrls: h,
          setPreviewUrls: w,
          current: u,
          setCurrent: C,
          setShowPreview: p,
          setMousePosition: D,
          registerImage: R
        }),
        () => {
          const l = At(o.value, [])
          return s(Ue, null, [
            n.default && n.default(),
            s(
              Fe,
              x(
                x({}, l),
                {},
                {
                  'ria-hidden': !I.value,
                  visible: I.value,
                  prefixCls: e.previewPrefixCls,
                  onClose: O,
                  mousePosition: d.value,
                  src: h.value.get(u.value),
                  icons: e.icons,
                  getContainer: g.value
                }
              ),
              null
            )
          ])
        }
      )
    }
  }),
  We = Lt,
  V = { x: 0, y: 0 },
  Et = a(a({}, bt()), {
    src: String,
    alt: String,
    rootClassName: String,
    icons: { type: Object, default: () => ({}) }
  }),
  Tt = ie({
    compatConfig: { MODE: 3 },
    name: 'Preview',
    inheritAttrs: !1,
    props: Et,
    emits: ['close', 'afterClose'],
    setup(e, t) {
      let { emit: n, attrs: o } = t
      const {
          rotateLeft: r,
          rotateRight: u,
          zoomIn: f,
          zoomOut: g,
          close: S,
          left: I,
          right: p,
          flipX: d,
          flipY: A
        } = oe(e.icons),
        m = W(1),
        b = W(0),
        h = oe({ x: 1, y: 1 }),
        [w, C] = $t(V),
        D = () => n('close'),
        R = W(),
        O = oe({ originX: 0, originY: 0, deltaX: 0, deltaY: 0 }),
        l = W(!1),
        P = Pe.inject(),
        { previewUrls: y, current: L, isPreviewGroup: K, setCurrent: N } = P,
        Z = v(() => y.value.size),
        U = v(() => Array.from(y.value.keys())),
        M = v(() => U.value.indexOf(L.value)),
        me = v(() => (K.value ? y.value.get(L.value) : e.src)),
        E = v(() => K.value && Z.value > 1),
        k = W({ wheelDirection: 0 }),
        ee = () => {
          ;(m.value = 1),
            (b.value = 0),
            (h.x = 1),
            (h.y = 1),
            C(V),
            n('afterClose')
        },
        c = i => {
          i ? (m.value += 0.5) : m.value++, C(V)
        },
        T = i => {
          m.value > 1 && (i ? (m.value -= 0.5) : m.value--), C(V)
        },
        j = () => {
          b.value += 90
        },
        B = () => {
          b.value -= 90
        },
        ae = () => {
          h.x = -h.x
        },
        de = () => {
          h.y = -h.y
        },
        le = i => {
          i.preventDefault(),
            i.stopPropagation(),
            M.value > 0 && N(U.value[M.value - 1])
        },
        se = i => {
          i.preventDefault(),
            i.stopPropagation(),
            M.value < Z.value - 1 && N(U.value[M.value + 1])
        },
        te = H({ [`${e.prefixCls}-moving`]: l.value }),
        we = `${e.prefixCls}-operations-operation`,
        be = `${e.prefixCls}-operations-icon`,
        ue = [
          { icon: S, onClick: D, type: 'close' },
          { icon: f, onClick: () => c(), type: 'zoomIn' },
          {
            icon: g,
            onClick: () => T(),
            type: 'zoomOut',
            disabled: v(() => m.value === 1)
          },
          { icon: u, onClick: j, type: 'rotateRight' },
          { icon: r, onClick: B, type: 'rotateLeft' },
          { icon: d, onClick: ae, type: 'flipX' },
          { icon: A, onClick: de, type: 'flipY' }
        ],
        ce = () => {
          if (e.visible && l.value) {
            const i = R.value.offsetWidth * m.value,
              $ = R.value.offsetHeight * m.value,
              { left: _, top: X } = Ve(R.value),
              G = b.value % 180 !== 0
            l.value = !1
            const Y = Nt(G ? $ : i, G ? i : $, _, X)
            Y && C(a({}, Y))
          }
        },
        he = i => {
          i.button === 0 &&
            (i.preventDefault(),
            i.stopPropagation(),
            (O.deltaX = i.pageX - w.x),
            (O.deltaY = i.pageY - w.y),
            (O.originX = w.x),
            (O.originY = w.y),
            (l.value = !0))
        },
        ve = i => {
          e.visible &&
            l.value &&
            C({ x: i.pageX - O.deltaX, y: i.pageY - O.deltaY })
        },
        Ce = i => {
          if (!e.visible) return
          i.preventDefault()
          const $ = i.deltaY
          k.value = { wheelDirection: $ }
        },
        ye = i => {
          !e.visible ||
            !E.value ||
            (i.preventDefault(),
            i.keyCode === Le.LEFT
              ? M.value > 0 && N(U.value[M.value - 1])
              : i.keyCode === Le.RIGHT &&
                M.value < Z.value - 1 &&
                N(U.value[M.value + 1]))
        },
        fe = () => {
          e.visible &&
            (m.value !== 1 && (m.value = 1),
            (w.x !== V.x || w.y !== V.y) && C(V))
        }
      let ne = () => {}
      return (
        Oe(() => {
          J(
            [() => e.visible, l],
            () => {
              ne()
              let i, $
              const _ = Q(window, 'mouseup', ce, !1),
                X = Q(window, 'mousemove', ve, !1),
                G = Q(window, 'wheel', Ce, { passive: !1 }),
                Y = Q(window, 'keydown', ye, !1)
              try {
                window.top !== window.self &&
                  ((i = Q(window.top, 'mouseup', ce, !1)),
                  ($ = Q(window.top, 'mousemove', ve, !1)))
              } catch {}
              ne = () => {
                _.remove(),
                  X.remove(),
                  G.remove(),
                  Y.remove(),
                  i && i.remove(),
                  $ && $.remove()
              }
            },
            { flush: 'post', immediate: !0 }
          ),
            J([k], () => {
              const { wheelDirection: i } = k.value
              i > 0 ? T(!0) : i < 0 && c(!0)
            })
        }),
        Be(() => {
          ne()
        }),
        () => {
          const { visible: i, prefixCls: $, rootClassName: _ } = e
          return s(
            ht,
            x(
              x({}, o),
              {},
              {
                transitionName: e.transitionName,
                maskTransitionName: e.maskTransitionName,
                closable: !1,
                keyboard: !0,
                prefixCls: $,
                onClose: D,
                afterClose: ee,
                visible: i,
                wrapClassName: te,
                rootClassName: _,
                getContainer: e.getContainer
              }
            ),
            {
              default: () => [
                s('div', { class: [`${e.prefixCls}-operations-wrapper`, _] }, [
                  s('ul', { class: `${e.prefixCls}-operations` }, [
                    ue.map(X => {
                      let { icon: G, onClick: Y, type: Ne, disabled: pe } = X
                      return s(
                        'li',
                        {
                          class: H(we, {
                            [`${e.prefixCls}-operations-operation-disabled`]:
                              pe && (pe == null ? void 0 : pe.value)
                          }),
                          onClick: Y,
                          key: Ne
                        },
                        [ct(G, { class: be })]
                      )
                    })
                  ])
                ]),
                s(
                  'div',
                  {
                    class: `${e.prefixCls}-img-wrapper`,
                    style: { transform: `translate3d(${w.x}px, ${w.y}px, 0)` }
                  },
                  [
                    s(
                      'img',
                      {
                        onMousedown: he,
                        onDblclick: fe,
                        ref: R,
                        class: `${e.prefixCls}-img`,
                        src: me.value,
                        alt: e.alt,
                        style: {
                          transform: `scale3d(${h.x * m.value}, ${h.y *
                            m.value}, 1) rotate(${b.value}deg)`
                        }
                      },
                      null
                    )
                  ]
                ),
                E.value &&
                  s(
                    'div',
                    {
                      class: H(`${e.prefixCls}-switch-left`, {
                        [`${e.prefixCls}-switch-left-disabled`]: M.value <= 0
                      }),
                      onClick: le
                    },
                    [I]
                  ),
                E.value &&
                  s(
                    'div',
                    {
                      class: H(`${e.prefixCls}-switch-right`, {
                        [`${e.prefixCls}-switch-right-disabled`]:
                          M.value >= Z.value - 1
                      }),
                      onClick: se
                    },
                    [p]
                  )
              ]
            }
          )
        }
      )
    }
  }),
  Fe = Tt
var zt =
  (globalThis && globalThis.__rest) ||
  function(e, t) {
    var n = {}
    for (var o in e)
      Object.prototype.hasOwnProperty.call(e, o) &&
        t.indexOf(o) < 0 &&
        (n[o] = e[o])
    if (e != null && typeof Object.getOwnPropertySymbols == 'function')
      for (var r = 0, o = Object.getOwnPropertySymbols(e); r < o.length; r++)
        t.indexOf(o[r]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(e, o[r]) &&
          (n[o[r]] = e[o[r]])
    return n
  }
const He = () => ({
    src: String,
    wrapperClassName: String,
    wrapperStyle: { type: Object, default: void 0 },
    rootClassName: String,
    prefixCls: String,
    previewPrefixCls: String,
    width: [Number, String],
    height: [Number, String],
    previewMask: { type: [Boolean, Function], default: void 0 },
    placeholder: et.any,
    fallback: String,
    preview: { type: [Boolean, Object], default: !0 },
    onClick: { type: Function },
    onError: { type: Function }
  }),
  Qe = (e, t) => {
    const n = a({}, e)
    return (
      Object.keys(t).forEach(o => {
        e[o] === void 0 && (n[o] = t[o])
      }),
      n
    )
  }
let Rt = 0
const Je = ie({
  compatConfig: { MODE: 3 },
  name: 'VcImage',
  inheritAttrs: !1,
  props: He(),
  emits: ['click', 'error'],
  setup(e, t) {
    let { attrs: n, slots: o, emit: r } = t
    const u = v(() => e.prefixCls),
      f = v(() => `${u.value}-preview`),
      g = v(() => {
        const c = {
          visible: void 0,
          onVisibleChange: () => {},
          getContainer: void 0
        }
        return typeof e.preview == 'object' ? Qe(e.preview, c) : c
      }),
      S = v(() => {
        var c
        return (c = g.value.src) !== null && c !== void 0 ? c : e.src
      }),
      I = v(() => (e.placeholder && e.placeholder !== !0) || o.placeholder),
      p = v(() => g.value.visible),
      d = v(() => g.value.getContainer),
      A = v(() => p.value !== void 0),
      m = (c, T) => {
        var j, B
        ;(B = (j = g.value).onVisibleChange) === null ||
          B === void 0 ||
          B.call(j, c, T)
      },
      [b, h] = Xe(!!p.value, { value: p, onChange: m }),
      w = z(I.value ? 'loading' : 'normal')
    J(
      () => e.src,
      () => {
        w.value = I.value ? 'loading' : 'normal'
      }
    )
    const C = z(null),
      D = v(() => w.value === 'error'),
      R = Pe.inject(),
      {
        isPreviewGroup: O,
        setCurrent: l,
        setShowPreview: P,
        setMousePosition: y,
        registerImage: L
      } = R,
      K = z(Rt++),
      N = v(() => e.preview && !D.value),
      Z = () => {
        w.value = 'normal'
      },
      U = c => {
        ;(w.value = 'error'), r('error', c)
      },
      M = c => {
        if (!A.value) {
          const { left: T, top: j } = Ve(c.target)
          O.value ? (l(K.value), y({ x: T, y: j })) : (C.value = { x: T, y: j })
        }
        O.value ? P(!0) : h(!0), r('click', c)
      },
      me = () => {
        h(!1), A.value || (C.value = null)
      },
      E = z(null)
    J(
      () => E,
      () => {
        w.value === 'loading' &&
          E.value.complete &&
          (E.value.naturalWidth || E.value.naturalHeight) &&
          Z()
      }
    )
    let k = () => {}
    Oe(() => {
      J(
        [S, N],
        () => {
          if ((k(), !O.value)) return () => {}
          ;(k = L(K.value, S.value, N.value)), N.value || k()
        },
        { flush: 'post', immediate: !0 }
      )
    }),
      Be(() => {
        k()
      })
    const ee = c => (jt(c) ? c + 'px' : c)
    return () => {
      const {
          prefixCls: c,
          wrapperClassName: T,
          fallback: j,
          src: B,
          placeholder: ae,
          wrapperStyle: de,
          rootClassName: le,
          width: se,
          height: te,
          crossorigin: we,
          decoding: be,
          alt: ue,
          sizes: ce,
          srcset: he,
          usemap: ve,
          class: Ce,
          style: ye
        } = a(a({}, e), n),
        fe = g.value,
        { icons: ne, maskClassName: i } = fe,
        $ = zt(fe, ['icons', 'maskClassName']),
        _ = H(c, T, le, { [`${c}-error`]: D.value }),
        X = D.value && j ? j : S.value,
        G = {
          crossorigin: we,
          decoding: be,
          alt: ue,
          sizes: ce,
          srcset: he,
          usemap: ve,
          width: se,
          height: te,
          class: H(`${c}-img`, { [`${c}-img-placeholder`]: ae === !0 }, Ce),
          style: a({ height: ee(te) }, ye)
        }
      return s(Ue, null, [
        s(
          'div',
          {
            class: _,
            onClick: N.value
              ? M
              : Y => {
                  r('click', Y)
                },
            style: a({ width: ee(se), height: ee(te) }, de)
          },
          [
            s(
              'img',
              x(
                x(
                  x({}, G),
                  D.value && j ? { src: j } : { onLoad: Z, onError: U, src: B }
                ),
                {},
                { ref: E }
              ),
              null
            ),
            w.value === 'loading' &&
              s('div', { 'aria-hidden': 'true', class: `${c}-placeholder` }, [
                ae || (o.placeholder && o.placeholder())
              ]),
            o.previewMask &&
              N.value &&
              s('div', { class: [`${c}-mask`, i] }, [o.previewMask()])
          ]
        ),
        !O.value &&
          N.value &&
          s(
            Fe,
            x(
              x({}, $),
              {},
              {
                'aria-hidden': !b.value,
                visible: b.value,
                prefixCls: f.value,
                onClose: me,
                mousePosition: C.value,
                src: X,
                alt: ue,
                getContainer: d.value,
                icons: ne,
                rootClassName: le
              }
            ),
            null
          )
      ])
    }
  }
})
Je.PreviewGroup = We
const kt = Je
function ze(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? Object(arguments[t]) : {},
      o = Object.keys(n)
    typeof Object.getOwnPropertySymbols == 'function' &&
      (o = o.concat(
        Object.getOwnPropertySymbols(n).filter(function(r) {
          return Object.getOwnPropertyDescriptor(n, r).enumerable
        })
      )),
      o.forEach(function(r) {
        _t(e, r, n[r])
      })
  }
  return e
}
function _t(e, t, n) {
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
var xe = function(t, n) {
  var o = ze({}, t, n.attrs)
  return s(re, ze({}, o, { icon: St }), null)
}
xe.displayName = 'RotateLeftOutlined'
xe.inheritAttrs = !1
const Gt = xe
function Re(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? Object(arguments[t]) : {},
      o = Object.keys(n)
    typeof Object.getOwnPropertySymbols == 'function' &&
      (o = o.concat(
        Object.getOwnPropertySymbols(n).filter(function(r) {
          return Object.getOwnPropertyDescriptor(n, r).enumerable
        })
      )),
      o.forEach(function(r) {
        Yt(e, r, n[r])
      })
  }
  return e
}
function Yt(e, t, n) {
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
var Ie = function(t, n) {
  var o = Re({}, t, n.attrs)
  return s(re, Re({}, o, { icon: Ot }), null)
}
Ie.displayName = 'RotateRightOutlined'
Ie.inheritAttrs = !1
const Zt = Ie
function ke(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? Object(arguments[t]) : {},
      o = Object.keys(n)
    typeof Object.getOwnPropertySymbols == 'function' &&
      (o = o.concat(
        Object.getOwnPropertySymbols(n).filter(function(r) {
          return Object.getOwnPropertyDescriptor(n, r).enumerable
        })
      )),
      o.forEach(function(r) {
        Ut(e, r, n[r])
      })
  }
  return e
}
function Ut(e, t, n) {
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
var Me = function(t, n) {
  var o = ke({}, t, n.attrs)
  return s(re, ke({}, o, { icon: Pt }), null)
}
Me.displayName = 'ZoomInOutlined'
Me.inheritAttrs = !1
const Bt = Me
function _e(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? Object(arguments[t]) : {},
      o = Object.keys(n)
    typeof Object.getOwnPropertySymbols == 'function' &&
      (o = o.concat(
        Object.getOwnPropertySymbols(n).filter(function(r) {
          return Object.getOwnPropertyDescriptor(n, r).enumerable
        })
      )),
      o.forEach(function(r) {
        Xt(e, r, n[r])
      })
  }
  return e
}
function Xt(e, t, n) {
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
var je = function(t, n) {
  var o = _e({}, t, n.attrs)
  return s(re, _e({}, o, { icon: xt }), null)
}
je.displayName = 'ZoomOutOutlined'
je.inheritAttrs = !1
const Vt = je
function Ge(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? Object(arguments[t]) : {},
      o = Object.keys(n)
    typeof Object.getOwnPropertySymbols == 'function' &&
      (o = o.concat(
        Object.getOwnPropertySymbols(n).filter(function(r) {
          return Object.getOwnPropertyDescriptor(n, r).enumerable
        })
      )),
      o.forEach(function(r) {
        Wt(e, r, n[r])
      })
  }
  return e
}
function Wt(e, t, n) {
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
var $e = function(t, n) {
  var o = Ge({}, t, n.attrs)
  return s(re, Ge({}, o, { icon: It }), null)
}
$e.displayName = 'SwapOutlined'
$e.inheritAttrs = !1
const Ye = $e,
  Se = e => ({ position: e || 'absolute', inset: 0 }),
  Ft = e => {
    const {
      iconCls: t,
      motionDurationSlow: n,
      paddingXXS: o,
      marginXXS: r,
      prefixCls: u
    } = e
    return {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff',
      background: new q('#000').setAlpha(0.5).toRgbString(),
      cursor: 'pointer',
      opacity: 0,
      transition: `opacity ${n}`,
      [`.${u}-mask-info`]: a(a({}, nt), {
        padding: `0 ${o}px`,
        [t]: { marginInlineEnd: r, svg: { verticalAlign: 'baseline' } }
      })
    }
  },
  Ht = e => {
    const {
        previewCls: t,
        modalMaskBg: n,
        paddingSM: o,
        previewOperationColorDisabled: r,
        motionDurationSlow: u
      } = e,
      f = new q(n).setAlpha(0.1),
      g = f.clone().setAlpha(0.2)
    return {
      [`${t}-operations`]: a(a({}, ot(e)), {
        display: 'flex',
        flexDirection: 'row-reverse',
        alignItems: 'center',
        color: e.previewOperationColor,
        listStyle: 'none',
        background: f.toRgbString(),
        pointerEvents: 'auto',
        '&-operation': {
          marginInlineStart: o,
          padding: o,
          cursor: 'pointer',
          transition: `all ${u}`,
          userSelect: 'none',
          '&:hover': { background: g.toRgbString() },
          '&-disabled': { color: r, pointerEvents: 'none' },
          '&:last-of-type': { marginInlineStart: 0 }
        },
        '&-progress': {
          position: 'absolute',
          left: { _skip_check_: !0, value: '50%' },
          transform: 'translateX(-50%)'
        },
        '&-icon': { fontSize: e.previewOperationSize }
      })
    }
  },
  Qt = e => {
    const {
        modalMaskBg: t,
        iconCls: n,
        previewOperationColorDisabled: o,
        previewCls: r,
        zIndexPopup: u,
        motionDurationSlow: f
      } = e,
      g = new q(t).setAlpha(0.1),
      S = g.clone().setAlpha(0.2)
    return {
      [`${r}-switch-left, ${r}-switch-right`]: {
        position: 'fixed',
        insetBlockStart: '50%',
        zIndex: u + 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: e.imagePreviewSwitchSize,
        height: e.imagePreviewSwitchSize,
        marginTop: -e.imagePreviewSwitchSize / 2,
        color: e.previewOperationColor,
        background: g.toRgbString(),
        borderRadius: '50%',
        transform: 'translateY(-50%)',
        cursor: 'pointer',
        transition: `all ${f}`,
        pointerEvents: 'auto',
        userSelect: 'none',
        '&:hover': { background: S.toRgbString() },
        '&-disabled': {
          '&, &:hover': {
            color: o,
            background: 'transparent',
            cursor: 'not-allowed',
            [`> ${n}`]: { cursor: 'not-allowed' }
          }
        },
        [`> ${n}`]: { fontSize: e.previewOperationSize }
      },
      [`${r}-switch-left`]: { insetInlineStart: e.marginSM },
      [`${r}-switch-right`]: { insetInlineEnd: e.marginSM }
    }
  },
  Jt = e => {
    const {
      motionEaseOut: t,
      previewCls: n,
      motionDurationSlow: o,
      componentCls: r
    } = e
    return [
      {
        [`${r}-preview-root`]: {
          [n]: { height: '100%', textAlign: 'center', pointerEvents: 'none' },
          [`${n}-body`]: a(a({}, Se()), { overflow: 'hidden' }),
          [`${n}-img`]: {
            maxWidth: '100%',
            maxHeight: '100%',
            verticalAlign: 'middle',
            transform: 'scale3d(1, 1, 1)',
            cursor: 'grab',
            transition: `transform ${o} ${t} 0s`,
            userSelect: 'none',
            pointerEvents: 'auto',
            '&-wrapper': a(a({}, Se()), {
              transition: `transform ${o} ${t} 0s`,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              '&::before': {
                display: 'inline-block',
                width: 1,
                height: '50%',
                marginInlineEnd: -1,
                content: '""'
              }
            })
          },
          [`${n}-moving`]: {
            [`${n}-preview-img`]: {
              cursor: 'grabbing',
              '&-wrapper': { transitionDuration: '0s' }
            }
          }
        }
      },
      { [`${r}-preview-root`]: { [`${n}-wrap`]: { zIndex: e.zIndexPopup } } },
      {
        [`${r}-preview-operations-wrapper`]: {
          position: 'fixed',
          insetBlockStart: 0,
          insetInlineEnd: 0,
          zIndex: e.zIndexPopup + 1,
          width: '100%'
        },
        '&': [Ht(e), Qt(e)]
      }
    ]
  },
  qt = e => {
    const { componentCls: t } = e
    return {
      [t]: {
        position: 'relative',
        display: 'inline-block',
        [`${t}-img`]: {
          width: '100%',
          height: 'auto',
          verticalAlign: 'middle'
        },
        [`${t}-img-placeholder`]: {
          backgroundColor: e.colorBgContainerDisabled,
          backgroundImage:
            "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTQuNSAyLjVoLTEzQS41LjUgMCAwIDAgMSAzdjEwYS41LjUgMCAwIDAgLjUuNWgxM2EuNS41IDAgMCAwIC41LS41VjNhLjUuNSAwIDAgMC0uNS0uNXpNNS4yODEgNC43NWExIDEgMCAwIDEgMCAyIDEgMSAwIDAgMSAwLTJ6bTguMDMgNi44M2EuMTI3LjEyNyAwIDAgMS0uMDgxLjAzSDIuNzY5YS4xMjUuMTI1IDAgMCAxLS4wOTYtLjIwN2wyLjY2MS0zLjE1NmEuMTI2LjEyNiAwIDAgMSAuMTc3LS4wMTZsLjAxNi4wMTZMNy4wOCAxMC4wOWwyLjQ3LTIuOTNhLjEyNi4xMjYgMCAwIDEgLjE3Ny0uMDE2bC4wMTUuMDE2IDMuNTg4IDQuMjQ0YS4xMjcuMTI3IDAgMCAxLS4wMi4xNzV6IiBmaWxsPSIjOEM4QzhDIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48L3N2Zz4=')",
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          backgroundSize: '30%'
        },
        [`${t}-mask`]: a({}, Ft(e)),
        [`${t}-mask:hover`]: { opacity: 1 },
        [`${t}-placeholder`]: a({}, Se())
      }
    }
  },
  Kt = e => {
    const { previewCls: t } = e
    return { [`${t}-root`]: gt(e, 'zoom'), '&': yt(e, !0) }
  },
  qe = tt(
    'Image',
    e => {
      const t = `${e.componentCls}-preview`,
        n = Ae(e, {
          previewCls: t,
          modalMaskBg: new q('#000').setAlpha(0.45).toRgbString(),
          imagePreviewSwitchSize: e.controlHeightLG
        })
      return [qt(n), Jt(n), Ct(Ae(n, { componentCls: t })), Kt(n)]
    },
    e => ({
      zIndexPopup: e.zIndexPopupBase + 80,
      previewOperationColor: new q(e.colorTextLightSolid).toRgbString(),
      previewOperationColorDisabled: new q(e.colorTextLightSolid)
        .setAlpha(0.25)
        .toRgbString(),
      previewOperationSize: e.fontSizeIcon * 1.5
    })
  ),
  Ke = {
    rotateLeft: s(Gt, null, null),
    rotateRight: s(Zt, null, null),
    zoomIn: s(Bt, null, null),
    zoomOut: s(Vt, null, null),
    close: s(rt, null, null),
    left: s(mt, null, null),
    right: s(dt, null, null),
    flipX: s(Ye, null, null),
    flipY: s(Ye, { rotate: 90 }, null)
  },
  en = () => ({ previewPrefixCls: String, preview: it() }),
  tn = ie({
    compatConfig: { MODE: 3 },
    name: 'AImagePreviewGroup',
    inheritAttrs: !1,
    props: en(),
    setup(e, t) {
      let { attrs: n, slots: o } = t
      const { prefixCls: r, rootPrefixCls: u } = Ze('image', e),
        f = v(() => `${r.value}-preview`),
        [g, S] = qe(r),
        I = v(() => {
          const { preview: p } = e
          if (p === !1) return p
          const d = typeof p == 'object' ? p : {}
          return a(a({}, d), {
            rootClassName: S.value,
            transitionName: ge(u.value, 'zoom', d.transitionName),
            maskTransitionName: ge(u.value, 'fade', d.maskTransitionName)
          })
        })
      return () =>
        g(
          s(
            We,
            x(
              x({}, a(a({}, n), e)),
              {},
              { preview: I.value, icons: Ke, previewPrefixCls: f.value }
            ),
            o
          )
        )
    }
  }),
  nn = tn,
  F = ie({
    name: 'AImage',
    inheritAttrs: !1,
    props: He(),
    setup(e, t) {
      let { slots: n, attrs: o } = t
      const { prefixCls: r, rootPrefixCls: u, configProvider: f } = Ze(
          'image',
          e
        ),
        [g, S] = qe(r),
        I = v(() => {
          const { preview: p } = e
          if (p === !1) return p
          const d = typeof p == 'object' ? p : {}
          return a(a({ icons: Ke }, d), {
            transitionName: ge(u.value, 'zoom', d.transitionName),
            maskTransitionName: ge(u.value, 'fade', d.maskTransitionName)
          })
        })
      return () => {
        var p, d
        const A =
            ((d =
              (p = f.locale) === null || p === void 0 ? void 0 : p.value) ===
              null || d === void 0
              ? void 0
              : d.Image) || at.Image,
          m = () =>
            s('div', { class: `${r.value}-mask-info` }, [
              s(wt, null, null),
              A == null ? void 0 : A.preview
            ]),
          { previewMask: b = n.previewMask || m } = e
        return g(
          s(
            kt,
            x(
              x({}, a(a(a({}, o), e), { prefixCls: r.value })),
              {},
              { preview: I.value, rootClassName: H(e.rootClassName, S.value) }
            ),
            a(a({}, n), { previewMask: typeof b == 'function' ? b : null })
          )
        )
      }
    }
  })
F.PreviewGroup = nn
F.install = function(e) {
  return (
    e.component(F.name, F), e.component(F.PreviewGroup.name, F.PreviewGroup), e
  )
}
const un = F
export { un as I }

import {
  x as De,
  _ as f,
  P as I,
  b as M,
  B as si,
  f as Ye,
  e as oe,
  D as dt,
  v as ui,
  E as et,
  F as ci,
  G as Fa,
  H as rt,
  I as La,
  J as Do,
  l as Xt,
  K as ja,
  M as Wa,
  N as Va,
  O as Ka,
  Q as Bo,
  R as Ua,
  A as Rt,
  g as ft,
  a as He,
  S as it,
  T as se,
  U as oo,
  o as Be,
  m as Ce,
  r as un,
  n as ro,
  V as Ga,
  W as Xa,
  X as Ya,
  w as qa,
  Y as ka,
  Z as Yt,
  $ as zo,
  j as Za,
  a0 as Qa,
  a1 as di,
  a2 as No,
  a3 as Ja,
  i as el,
  a4 as Nn,
  a5 as tl,
  s as nl,
  a6 as Le,
  a7 as ol,
  c as he,
  a8 as rl,
  a9 as gt
} from '../main.491ba5c0.js'
import {
  d as X,
  y as io,
  g as Ee,
  q as Pe,
  v as cn,
  z as ao,
  j as J,
  c as y,
  a0 as lo,
  a1 as il,
  a2 as pt,
  r as j,
  s as N,
  l as ve,
  e as S,
  a3 as fi,
  i as al,
  C as ll,
  F as Ge,
  B as qt,
  n as Te,
  a4 as Hn,
  a5 as pi,
  R as Ho,
  k as Oe,
  f as we,
  p as pe,
  u as $t,
  D as Fn,
  T as sl,
  x as ul,
  E as cl,
  X as dl
} from './vendor.84fc1123.js'
import {
  m as fl,
  n as pl,
  R as ml,
  T as Fo,
  o as vl,
  p as gl
} from './antd.7f3c63f7.js'
import { i as mi } from './initDefaultProps.71991ecc.js'
var vi = (function() {
    if (typeof Map < 'u') return Map
    function e(t, n) {
      var o = -1
      return (
        t.some(function(r, i) {
          return r[0] === n ? ((o = i), !0) : !1
        }),
        o
      )
    }
    return (function() {
      function t() {
        this.__entries__ = []
      }
      return (
        Object.defineProperty(t.prototype, 'size', {
          get: function() {
            return this.__entries__.length
          },
          enumerable: !0,
          configurable: !0
        }),
        (t.prototype.get = function(n) {
          var o = e(this.__entries__, n),
            r = this.__entries__[o]
          return r && r[1]
        }),
        (t.prototype.set = function(n, o) {
          var r = e(this.__entries__, n)
          ~r ? (this.__entries__[r][1] = o) : this.__entries__.push([n, o])
        }),
        (t.prototype.delete = function(n) {
          var o = this.__entries__,
            r = e(o, n)
          ~r && o.splice(r, 1)
        }),
        (t.prototype.has = function(n) {
          return !!~e(this.__entries__, n)
        }),
        (t.prototype.clear = function() {
          this.__entries__.splice(0)
        }),
        (t.prototype.forEach = function(n, o) {
          o === void 0 && (o = null)
          for (var r = 0, i = this.__entries__; r < i.length; r++) {
            var a = i[r]
            n.call(o, a[1], a[0])
          }
        }),
        t
      )
    })()
  })(),
  Ln =
    typeof window < 'u' &&
    typeof document < 'u' &&
    window.document === document,
  kt = (function() {
    return typeof global < 'u' && global.Math === Math
      ? global
      : typeof self < 'u' && self.Math === Math
      ? self
      : typeof window < 'u' && window.Math === Math
      ? window
      : Function('return this')()
  })(),
  hl = (function() {
    return typeof requestAnimationFrame == 'function'
      ? requestAnimationFrame.bind(kt)
      : function(e) {
          return setTimeout(function() {
            return e(Date.now())
          }, 1e3 / 60)
        }
  })(),
  bl = 2
function yl(e, t) {
  var n = !1,
    o = !1,
    r = 0
  function i() {
    n && ((n = !1), e()), o && l()
  }
  function a() {
    hl(i)
  }
  function l() {
    var s = Date.now()
    if (n) {
      if (s - r < bl) return
      o = !0
    } else (n = !0), (o = !1), setTimeout(a, t)
    r = s
  }
  return l
}
var $l = 20,
  wl = ['top', 'right', 'bottom', 'left', 'width', 'height', 'size', 'weight'],
  Sl = typeof MutationObserver < 'u',
  Cl = (function() {
    function e() {
      ;(this.connected_ = !1),
        (this.mutationEventsAdded_ = !1),
        (this.mutationsObserver_ = null),
        (this.observers_ = []),
        (this.onTransitionEnd_ = this.onTransitionEnd_.bind(this)),
        (this.refresh = yl(this.refresh.bind(this), $l))
    }
    return (
      (e.prototype.addObserver = function(t) {
        ~this.observers_.indexOf(t) || this.observers_.push(t),
          this.connected_ || this.connect_()
      }),
      (e.prototype.removeObserver = function(t) {
        var n = this.observers_,
          o = n.indexOf(t)
        ~o && n.splice(o, 1), !n.length && this.connected_ && this.disconnect_()
      }),
      (e.prototype.refresh = function() {
        var t = this.updateObservers_()
        t && this.refresh()
      }),
      (e.prototype.updateObservers_ = function() {
        var t = this.observers_.filter(function(n) {
          return n.gatherActive(), n.hasActive()
        })
        return (
          t.forEach(function(n) {
            return n.broadcastActive()
          }),
          t.length > 0
        )
      }),
      (e.prototype.connect_ = function() {
        !Ln ||
          this.connected_ ||
          (document.addEventListener('transitionend', this.onTransitionEnd_),
          window.addEventListener('resize', this.refresh),
          Sl
            ? ((this.mutationsObserver_ = new MutationObserver(this.refresh)),
              this.mutationsObserver_.observe(document, {
                attributes: !0,
                childList: !0,
                characterData: !0,
                subtree: !0
              }))
            : (document.addEventListener('DOMSubtreeModified', this.refresh),
              (this.mutationEventsAdded_ = !0)),
          (this.connected_ = !0))
      }),
      (e.prototype.disconnect_ = function() {
        !Ln ||
          !this.connected_ ||
          (document.removeEventListener('transitionend', this.onTransitionEnd_),
          window.removeEventListener('resize', this.refresh),
          this.mutationsObserver_ && this.mutationsObserver_.disconnect(),
          this.mutationEventsAdded_ &&
            document.removeEventListener('DOMSubtreeModified', this.refresh),
          (this.mutationsObserver_ = null),
          (this.mutationEventsAdded_ = !1),
          (this.connected_ = !1))
      }),
      (e.prototype.onTransitionEnd_ = function(t) {
        var n = t.propertyName,
          o = n === void 0 ? '' : n,
          r = wl.some(function(i) {
            return !!~o.indexOf(i)
          })
        r && this.refresh()
      }),
      (e.getInstance = function() {
        return this.instance_ || (this.instance_ = new e()), this.instance_
      }),
      (e.instance_ = null),
      e
    )
  })(),
  gi = function(e, t) {
    for (var n = 0, o = Object.keys(t); n < o.length; n++) {
      var r = o[n]
      Object.defineProperty(e, r, {
        value: t[r],
        enumerable: !1,
        writable: !1,
        configurable: !0
      })
    }
    return e
  },
  at = function(e) {
    var t = e && e.ownerDocument && e.ownerDocument.defaultView
    return t || kt
  },
  hi = dn(0, 0, 0, 0)
function Zt(e) {
  return parseFloat(e) || 0
}
function Lo(e) {
  for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n]
  return t.reduce(function(o, r) {
    var i = e['border-' + r + '-width']
    return o + Zt(i)
  }, 0)
}
function xl(e) {
  for (
    var t = ['top', 'right', 'bottom', 'left'], n = {}, o = 0, r = t;
    o < r.length;
    o++
  ) {
    var i = r[o],
      a = e['padding-' + i]
    n[i] = Zt(a)
  }
  return n
}
function Ol(e) {
  var t = e.getBBox()
  return dn(0, 0, t.width, t.height)
}
function Tl(e) {
  var t = e.clientWidth,
    n = e.clientHeight
  if (!t && !n) return hi
  var o = at(e).getComputedStyle(e),
    r = xl(o),
    i = r.left + r.right,
    a = r.top + r.bottom,
    l = Zt(o.width),
    s = Zt(o.height)
  if (
    (o.boxSizing === 'border-box' &&
      (Math.round(l + i) !== t && (l -= Lo(o, 'left', 'right') + i),
      Math.round(s + a) !== n && (s -= Lo(o, 'top', 'bottom') + a)),
    !El(e))
  ) {
    var c = Math.round(l + i) - t,
      d = Math.round(s + a) - n
    Math.abs(c) !== 1 && (l -= c), Math.abs(d) !== 1 && (s -= d)
  }
  return dn(r.left, r.top, l, s)
}
var Il = (function() {
  return typeof SVGGraphicsElement < 'u'
    ? function(e) {
        return e instanceof at(e).SVGGraphicsElement
      }
    : function(e) {
        return e instanceof at(e).SVGElement && typeof e.getBBox == 'function'
      }
})()
function El(e) {
  return e === at(e).document.documentElement
}
function Pl(e) {
  return Ln ? (Il(e) ? Ol(e) : Tl(e)) : hi
}
function _l(e) {
  var t = e.x,
    n = e.y,
    o = e.width,
    r = e.height,
    i = typeof DOMRectReadOnly < 'u' ? DOMRectReadOnly : Object,
    a = Object.create(i.prototype)
  return (
    gi(a, {
      x: t,
      y: n,
      width: o,
      height: r,
      top: n,
      right: t + o,
      bottom: r + n,
      left: t
    }),
    a
  )
}
function dn(e, t, n, o) {
  return { x: e, y: t, width: n, height: o }
}
var Al = (function() {
    function e(t) {
      ;(this.broadcastWidth = 0),
        (this.broadcastHeight = 0),
        (this.contentRect_ = dn(0, 0, 0, 0)),
        (this.target = t)
    }
    return (
      (e.prototype.isActive = function() {
        var t = Pl(this.target)
        return (
          (this.contentRect_ = t),
          t.width !== this.broadcastWidth || t.height !== this.broadcastHeight
        )
      }),
      (e.prototype.broadcastRect = function() {
        var t = this.contentRect_
        return (
          (this.broadcastWidth = t.width), (this.broadcastHeight = t.height), t
        )
      }),
      e
    )
  })(),
  Ml = (function() {
    function e(t, n) {
      var o = _l(n)
      gi(this, { target: t, contentRect: o })
    }
    return e
  })(),
  Rl = (function() {
    function e(t, n, o) {
      if (
        ((this.activeObservations_ = []),
        (this.observations_ = new vi()),
        typeof t != 'function')
      )
        throw new TypeError(
          'The callback provided as parameter 1 is not a function.'
        )
      ;(this.callback_ = t), (this.controller_ = n), (this.callbackCtx_ = o)
    }
    return (
      (e.prototype.observe = function(t) {
        if (!arguments.length)
          throw new TypeError('1 argument required, but only 0 present.')
        if (!(typeof Element > 'u' || !(Element instanceof Object))) {
          if (!(t instanceof at(t).Element))
            throw new TypeError('parameter 1 is not of type "Element".')
          var n = this.observations_
          n.has(t) ||
            (n.set(t, new Al(t)),
            this.controller_.addObserver(this),
            this.controller_.refresh())
        }
      }),
      (e.prototype.unobserve = function(t) {
        if (!arguments.length)
          throw new TypeError('1 argument required, but only 0 present.')
        if (!(typeof Element > 'u' || !(Element instanceof Object))) {
          if (!(t instanceof at(t).Element))
            throw new TypeError('parameter 1 is not of type "Element".')
          var n = this.observations_
          n.has(t) &&
            (n.delete(t), n.size || this.controller_.removeObserver(this))
        }
      }),
      (e.prototype.disconnect = function() {
        this.clearActive(),
          this.observations_.clear(),
          this.controller_.removeObserver(this)
      }),
      (e.prototype.gatherActive = function() {
        var t = this
        this.clearActive(),
          this.observations_.forEach(function(n) {
            n.isActive() && t.activeObservations_.push(n)
          })
      }),
      (e.prototype.broadcastActive = function() {
        if (this.hasActive()) {
          var t = this.callbackCtx_,
            n = this.activeObservations_.map(function(o) {
              return new Ml(o.target, o.broadcastRect())
            })
          this.callback_.call(t, n, t), this.clearActive()
        }
      }),
      (e.prototype.clearActive = function() {
        this.activeObservations_.splice(0)
      }),
      (e.prototype.hasActive = function() {
        return this.activeObservations_.length > 0
      }),
      e
    )
  })(),
  bi = typeof WeakMap < 'u' ? new WeakMap() : new vi(),
  yi = (function() {
    function e(t) {
      if (!(this instanceof e))
        throw new TypeError('Cannot call a class as a function.')
      if (!arguments.length)
        throw new TypeError('1 argument required, but only 0 present.')
      var n = Cl.getInstance(),
        o = new Rl(t, n, this)
      bi.set(this, o)
    }
    return e
  })()
;['observe', 'unobserve', 'disconnect'].forEach(function(e) {
  yi.prototype[e] = function() {
    var t
    return (t = bi.get(this))[e].apply(t, arguments)
  }
})
var $i = (function() {
  return typeof kt.ResizeObserver < 'u' ? kt.ResizeObserver : yi
})()
const so = X({
  compatConfig: { MODE: 3 },
  name: 'ResizeObserver',
  props: { disabled: Boolean, onResize: Function },
  emits: ['resize'],
  setup(e, t) {
    let { slots: n } = t
    const o = io({ width: 0, height: 0, offsetHeight: 0, offsetWidth: 0 })
    let r = null,
      i = null
    const a = () => {
        i && (i.disconnect(), (i = null))
      },
      l = d => {
        const { onResize: u } = e,
          m = d[0].target,
          { width: p, height: v } = m.getBoundingClientRect(),
          { offsetWidth: h, offsetHeight: C } = m,
          $ = Math.floor(p),
          g = Math.floor(v)
        if (
          o.width !== $ ||
          o.height !== g ||
          o.offsetWidth !== h ||
          o.offsetHeight !== C
        ) {
          const T = { width: $, height: g, offsetWidth: h, offsetHeight: C }
          f(o, T),
            u &&
              Promise.resolve().then(() => {
                u(f(f({}, T), { offsetWidth: h, offsetHeight: C }), m)
              })
        }
      },
      s = Ee(),
      c = () => {
        const { disabled: d } = e
        if (d) {
          a()
          return
        }
        const u = De(s)
        u !== r && (a(), (r = u)), !i && u && ((i = new $i(l)), i.observe(u))
      }
    return (
      Pe(() => {
        c()
      }),
      cn(() => {
        c()
      }),
      ao(() => {
        a()
      }),
      J(
        () => e.disabled,
        () => {
          c()
        },
        { flush: 'post' }
      ),
      () => {
        var d
        return (d = n.default) === null || d === void 0 ? void 0 : d.call(n)[0]
      }
    )
  }
})
let wi = e => setTimeout(e, 16),
  Si = e => clearTimeout(e)
typeof window < 'u' &&
  'requestAnimationFrame' in window &&
  ((wi = e => window.requestAnimationFrame(e)),
  (Si = e => window.cancelAnimationFrame(e)))
let jo = 0
const uo = new Map()
function Ci(e) {
  uo.delete(e)
}
function le(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1
  jo += 1
  const n = jo
  function o(r) {
    if (r === 0) Ci(n), e()
    else {
      const i = wi(() => {
        o(r - 1)
      })
      uo.set(n, i)
    }
  }
  return o(t), n
}
le.cancel = e => {
  const t = uo.get(e)
  return Ci(t), Si(t)
}
let xi = !1
try {
  const e = Object.defineProperty({}, 'passive', {
    get() {
      xi = !0
    }
  })
  window.addEventListener('testPassive', null, e),
    window.removeEventListener('testPassive', null, e)
} catch {}
const tt = xi
function wt(e, t, n, o) {
  if (e && e.addEventListener) {
    let r = o
    r === void 0 &&
      tt &&
      (t === 'touchstart' || t === 'touchmove' || t === 'wheel') &&
      (r = { passive: !1 }),
      e.addEventListener(t, n, r)
  }
  return {
    remove: () => {
      e && e.removeEventListener && e.removeEventListener(t, n)
    }
  }
}
let Wo = {}
function Dl(e, t) {}
function Bl(e, t) {}
function Oi(e, t, n) {
  !t && !Wo[n] && (e(!1, n), (Wo[n] = !0))
}
function zl(e, t) {
  Oi(Dl, e, t)
}
function hv(e, t) {
  Oi(Bl, e, t)
}
const Qt = [
    'blue',
    'purple',
    'cyan',
    'green',
    'magenta',
    'pink',
    'red',
    'orange',
    'yellow',
    'volcano',
    'geekblue',
    'lime',
    'gold'
  ],
  bv = e => ({
    color: e.colorLink,
    textDecoration: 'none',
    outline: 'none',
    cursor: 'pointer',
    transition: `color ${e.motionDurationSlow}`,
    '&:focus, &:hover': { color: e.colorLinkHover },
    '&:active': { color: e.colorLinkActive }
  }),
  Nl = (e, t, n, o, r) => {
    const i = e / 2,
      a = 0,
      l = i,
      s = (n * 1) / Math.sqrt(2),
      c = i - n * (1 - 1 / Math.sqrt(2)),
      d = i - t * (1 / Math.sqrt(2)),
      u = n * (Math.sqrt(2) - 1) + t * (1 / Math.sqrt(2)),
      m = 2 * i - d,
      p = u,
      v = 2 * i - s,
      h = c,
      C = 2 * i - a,
      $ = l,
      g = i * Math.sqrt(2) + n * (Math.sqrt(2) - 2),
      T = n * (Math.sqrt(2) - 1)
    return {
      pointerEvents: 'none',
      width: e,
      height: e,
      overflow: 'hidden',
      '&::after': {
        content: '""',
        position: 'absolute',
        width: g,
        height: g,
        bottom: 0,
        insetInline: 0,
        margin: 'auto',
        borderRadius: { _skip_check_: !0, value: `0 0 ${t}px 0` },
        transform: 'translateY(50%) rotate(-135deg)',
        boxShadow: r,
        zIndex: 0,
        background: 'transparent'
      },
      '&::before': {
        position: 'absolute',
        bottom: 0,
        insetInlineStart: 0,
        width: e,
        height: e / 2,
        background: o,
        clipPath: {
          _multi_value_: !0,
          value: [
            `polygon(${T}px 100%, 50% ${T}px, ${2 * i -
              T}px 100%, ${T}px 100%)`,
            `path('M ${a} ${l} A ${n} ${n} 0 0 0 ${s} ${c} L ${d} ${u} A ${t} ${t} 0 0 1 ${m} ${p} L ${v} ${h} A ${n} ${n} 0 0 0 ${C} ${$} Z')`
          ]
        },
        content: '""'
      }
    }
  }
function Hl(e, t) {
  return Qt.reduce((n, o) => {
    const r = e[`${o}-1`],
      i = e[`${o}-3`],
      a = e[`${o}-6`],
      l = e[`${o}-7`]
    return f(
      f({}, n),
      t(o, { lightColor: r, lightBorderColor: i, darkColor: a, textColor: l })
    )
  }, {})
}
function fn(e, t) {
  const n = f({}, e)
  for (let o = 0; o < t.length; o += 1) {
    const r = t[o]
    delete n[r]
  }
  return n
}
const lt = (e, t, n) => {
  zl(e, `[ant-design-vue: ${t}] ${n}`)
}
function Fl() {
  return ''
}
function Ll(e) {
  return e ? e.ownerDocument : window.document
}
function Ti() {}
const jl = () => ({
    action: I.oneOfType([I.string, I.arrayOf(I.string)]).def([]),
    showAction: I.any.def([]),
    hideAction: I.any.def([]),
    getPopupClassNameFromAlign: I.any.def(Fl),
    onPopupVisibleChange: Function,
    afterPopupVisibleChange: I.func.def(Ti),
    popup: I.any,
    arrow: I.bool.def(!0),
    popupStyle: { type: Object, default: void 0 },
    prefixCls: I.string.def('rc-trigger-popup'),
    popupClassName: I.string.def(''),
    popupPlacement: String,
    builtinPlacements: I.object,
    popupTransitionName: String,
    popupAnimation: I.any,
    mouseEnterDelay: I.number.def(0),
    mouseLeaveDelay: I.number.def(0.1),
    zIndex: Number,
    focusDelay: I.number.def(0),
    blurDelay: I.number.def(0.15),
    getPopupContainer: Function,
    getDocument: I.func.def(Ll),
    forceRender: { type: Boolean, default: void 0 },
    destroyPopupOnHide: { type: Boolean, default: !1 },
    mask: { type: Boolean, default: !1 },
    maskClosable: { type: Boolean, default: !0 },
    popupAlign: I.object.def(() => ({})),
    popupVisible: { type: Boolean, default: void 0 },
    defaultPopupVisible: { type: Boolean, default: !1 },
    maskTransitionName: String,
    maskAnimation: String,
    stretch: String,
    alignPoint: { type: Boolean, default: void 0 },
    autoDestroy: { type: Boolean, default: !1 },
    mobile: Object,
    getTriggerDOMNode: Function
  }),
  co = {
    visible: Boolean,
    prefixCls: String,
    zIndex: Number,
    destroyPopupOnHide: Boolean,
    forceRender: Boolean,
    arrow: { type: Boolean, default: !0 },
    animation: [String, Object],
    transitionName: String,
    stretch: { type: String },
    align: { type: Object },
    point: { type: Object },
    getRootDomNode: { type: Function },
    getClassNameFromAlign: { type: Function },
    onAlign: { type: Function },
    onMouseenter: { type: Function },
    onMouseleave: { type: Function },
    onMousedown: { type: Function },
    onTouchstart: { type: Function }
  },
  Wl = f(f({}, co), { mobile: { type: Object } }),
  Vl = f(f({}, co), {
    mask: Boolean,
    mobile: { type: Object },
    maskAnimation: String,
    maskTransitionName: String
  })
function Ii(e) {
  const {
    prefixCls: t,
    visible: n,
    zIndex: o,
    mask: r,
    maskAnimation: i,
    maskTransitionName: a
  } = e
  if (!r) return null
  let l = {}
  return (
    (a || i) && (l = si({ prefixCls: t, transitionName: a, animation: i })),
    y(pt, M({ appear: !0 }, l), {
      default: () => [
        lo(y('div', { style: { zIndex: o }, class: `${t}-mask` }, null), [
          [il('if'), n]
        ])
      ]
    })
  )
}
Ii.displayName = 'Mask'
const Kl = X({
  compatConfig: { MODE: 3 },
  name: 'MobilePopupInner',
  inheritAttrs: !1,
  props: Wl,
  emits: ['mouseenter', 'mouseleave', 'mousedown', 'touchstart', 'align'],
  setup(e, t) {
    let { expose: n, slots: o } = t
    const r = j()
    return (
      n({ forceAlign: () => {}, getElement: () => r.value }),
      () => {
        var i
        const {
            zIndex: a,
            visible: l,
            prefixCls: s,
            mobile: {
              popupClassName: c,
              popupStyle: d,
              popupMotion: u = {},
              popupRender: m
            } = {}
          } = e,
          p = f({ zIndex: a }, d)
        let v = Ye(
          (i = o.default) === null || i === void 0 ? void 0 : i.call(o)
        )
        v.length > 1 && (v = y('div', { class: `${s}-content` }, [v])),
          m && (v = m(v))
        const h = oe(s, c)
        return y(pt, M({ ref: r }, u), {
          default: () => [l ? y('div', { class: h, style: p }, [v]) : null]
        })
      }
    )
  }
})
var Ul =
  (globalThis && globalThis.__awaiter) ||
  function(e, t, n, o) {
    function r(i) {
      return i instanceof n
        ? i
        : new n(function(a) {
            a(i)
          })
    }
    return new (n || (n = Promise))(function(i, a) {
      function l(d) {
        try {
          c(o.next(d))
        } catch (u) {
          a(u)
        }
      }
      function s(d) {
        try {
          c(o.throw(d))
        } catch (u) {
          a(u)
        }
      }
      function c(d) {
        d.done ? i(d.value) : r(d.value).then(l, s)
      }
      c((o = o.apply(e, t || [])).next())
    })
  }
const Vo = ['measure', 'align', null, 'motion'],
  Gl = (e, t) => {
    const n = N(null),
      o = N(),
      r = N(!1)
    function i(s) {
      r.value || (n.value = s)
    }
    function a() {
      le.cancel(o.value)
    }
    function l(s) {
      a(),
        (o.value = le(() => {
          let c = n.value
          switch (n.value) {
            case 'align':
              c = 'motion'
              break
            case 'motion':
              c = 'stable'
              break
          }
          i(c), s == null || s()
        }))
    }
    return (
      J(
        e,
        () => {
          i('measure')
        },
        { immediate: !0, flush: 'post' }
      ),
      Pe(() => {
        J(
          n,
          () => {
            switch (n.value) {
              case 'measure':
                t()
                break
            }
            n.value &&
              (o.value = le(() =>
                Ul(void 0, void 0, void 0, function*() {
                  const s = Vo.indexOf(n.value),
                    c = Vo[s + 1]
                  c && s !== -1 && i(c)
                })
              ))
          },
          { immediate: !0, flush: 'post' }
        )
      }),
      ve(() => {
        ;(r.value = !0), a()
      }),
      [n, l]
    )
  },
  Xl = e => {
    const t = N({ width: 0, height: 0 })
    function n(r) {
      t.value = { width: r.offsetWidth, height: r.offsetHeight }
    }
    return [
      S(() => {
        const r = {}
        if (e.value) {
          const { width: i, height: a } = t.value
          e.value.indexOf('height') !== -1 && a
            ? (r.height = `${a}px`)
            : e.value.indexOf('minHeight') !== -1 &&
              a &&
              (r.minHeight = `${a}px`),
            e.value.indexOf('width') !== -1 && i
              ? (r.width = `${i}px`)
              : e.value.indexOf('minWidth') !== -1 &&
                i &&
                (r.minWidth = `${i}px`)
        }
        return r
      }),
      n
    ]
  }
function Ko(e, t) {
  var n = Object.keys(e)
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e)
    t &&
      (o = o.filter(function(r) {
        return Object.getOwnPropertyDescriptor(e, r).enumerable
      })),
      n.push.apply(n, o)
  }
  return n
}
function Uo(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {}
    t % 2
      ? Ko(Object(n), !0).forEach(function(o) {
          Yl(e, o, n[o])
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
      : Ko(Object(n)).forEach(function(o) {
          Object.defineProperty(e, o, Object.getOwnPropertyDescriptor(n, o))
        })
  }
  return e
}
function jn(e) {
  '@babel/helpers - typeof'
  return (
    (jn =
      typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
        ? function(t) {
            return typeof t
          }
        : function(t) {
            return t &&
              typeof Symbol == 'function' &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? 'symbol'
              : typeof t
          }),
    jn(e)
  )
}
function Yl(e, t, n) {
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
var ht,
  ql = { Webkit: '-webkit-', Moz: '-moz-', ms: '-ms-', O: '-o-' }
function Jt() {
  if (ht !== void 0) return ht
  ht = ''
  var e = document.createElement('p').style,
    t = 'Transform'
  for (var n in ql) n + t in e && (ht = n)
  return ht
}
function Ei() {
  return Jt() ? ''.concat(Jt(), 'TransitionProperty') : 'transitionProperty'
}
function pn() {
  return Jt() ? ''.concat(Jt(), 'Transform') : 'transform'
}
function Go(e, t) {
  var n = Ei()
  n &&
    ((e.style[n] = t),
    n !== 'transitionProperty' && (e.style.transitionProperty = t))
}
function $n(e, t) {
  var n = pn()
  n && ((e.style[n] = t), n !== 'transform' && (e.style.transform = t))
}
function kl(e) {
  return e.style.transitionProperty || e.style[Ei()]
}
function Zl(e) {
  var t = window.getComputedStyle(e, null),
    n = t.getPropertyValue('transform') || t.getPropertyValue(pn())
  if (n && n !== 'none') {
    var o = n.replace(/[^0-9\-.,]/g, '').split(',')
    return { x: parseFloat(o[12] || o[4], 0), y: parseFloat(o[13] || o[5], 0) }
  }
  return { x: 0, y: 0 }
}
var Ql = /matrix\((.*)\)/,
  Jl = /matrix3d\((.*)\)/
function es(e, t) {
  var n = window.getComputedStyle(e, null),
    o = n.getPropertyValue('transform') || n.getPropertyValue(pn())
  if (o && o !== 'none') {
    var r,
      i = o.match(Ql)
    if (i)
      (i = i[1]),
        (r = i.split(',').map(function(l) {
          return parseFloat(l, 10)
        })),
        (r[4] = t.x),
        (r[5] = t.y),
        $n(e, 'matrix('.concat(r.join(','), ')'))
    else {
      var a = o.match(Jl)[1]
      ;(r = a.split(',').map(function(l) {
        return parseFloat(l, 10)
      })),
        (r[12] = t.x),
        (r[13] = t.y),
        $n(e, 'matrix3d('.concat(r.join(','), ')'))
    }
  } else
    $n(
      e,
      'translateX('
        .concat(t.x, 'px) translateY(')
        .concat(t.y, 'px) translateZ(0)')
    )
}
var ts = /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source,
  Dt
function Xo(e) {
  var t = e.style.display
  ;(e.style.display = 'none'), e.offsetHeight, (e.style.display = t)
}
function nt(e, t, n) {
  var o = n
  if (jn(t) === 'object') {
    for (var r in t) t.hasOwnProperty(r) && nt(e, r, t[r])
    return
  }
  if (typeof o < 'u') {
    typeof o == 'number' && (o = ''.concat(o, 'px')), (e.style[t] = o)
    return
  }
  return Dt(e, t)
}
function ns(e) {
  var t,
    n,
    o,
    r = e.ownerDocument,
    i = r.body,
    a = r && r.documentElement
  return (
    (t = e.getBoundingClientRect()),
    (n = Math.floor(t.left)),
    (o = Math.floor(t.top)),
    (n -= a.clientLeft || i.clientLeft || 0),
    (o -= a.clientTop || i.clientTop || 0),
    { left: n, top: o }
  )
}
function Pi(e, t) {
  var n = e['page'.concat(t ? 'Y' : 'X', 'Offset')],
    o = 'scroll'.concat(t ? 'Top' : 'Left')
  if (typeof n != 'number') {
    var r = e.document
    ;(n = r.documentElement[o]), typeof n != 'number' && (n = r.body[o])
  }
  return n
}
function _i(e) {
  return Pi(e)
}
function Ai(e) {
  return Pi(e, !0)
}
function It(e) {
  var t = ns(e),
    n = e.ownerDocument,
    o = n.defaultView || n.parentWindow
  return (t.left += _i(o)), (t.top += Ai(o)), t
}
function fo(e) {
  return e != null && e == e.window
}
function Mi(e) {
  return fo(e) ? e.document : e.nodeType === 9 ? e : e.ownerDocument
}
function os(e, t, n) {
  var o = n,
    r = '',
    i = Mi(e)
  return (
    (o = o || i.defaultView.getComputedStyle(e, null)),
    o && (r = o.getPropertyValue(t) || o[t]),
    r
  )
}
var rs = new RegExp('^('.concat(ts, ')(?!px)[a-z%]+$'), 'i'),
  is = /^(top|right|bottom|left)$/,
  wn = 'currentStyle',
  Sn = 'runtimeStyle',
  je = 'left',
  as = 'px'
function ls(e, t) {
  var n = e[wn] && e[wn][t]
  if (rs.test(n) && !is.test(t)) {
    var o = e.style,
      r = o[je],
      i = e[Sn][je]
    ;(e[Sn][je] = e[wn][je]),
      (o[je] = t === 'fontSize' ? '1em' : n || 0),
      (n = o.pixelLeft + as),
      (o[je] = r),
      (e[Sn][je] = i)
  }
  return n === '' ? 'auto' : n
}
typeof window < 'u' && (Dt = window.getComputedStyle ? os : ls)
function Bt(e, t) {
  return e === 'left'
    ? t.useCssRight
      ? 'right'
      : e
    : t.useCssBottom
    ? 'bottom'
    : e
}
function Yo(e) {
  if (e === 'left') return 'right'
  if (e === 'right') return 'left'
  if (e === 'top') return 'bottom'
  if (e === 'bottom') return 'top'
}
function qo(e, t, n) {
  nt(e, 'position') === 'static' && (e.style.position = 'relative')
  var o = -999,
    r = -999,
    i = Bt('left', n),
    a = Bt('top', n),
    l = Yo(i),
    s = Yo(a)
  i !== 'left' && (o = 999), a !== 'top' && (r = 999)
  var c = '',
    d = It(e)
  ;('left' in t || 'top' in t) && ((c = kl(e) || ''), Go(e, 'none')),
    'left' in t && ((e.style[l] = ''), (e.style[i] = ''.concat(o, 'px'))),
    'top' in t && ((e.style[s] = ''), (e.style[a] = ''.concat(r, 'px'))),
    Xo(e)
  var u = It(e),
    m = {}
  for (var p in t)
    if (t.hasOwnProperty(p)) {
      var v = Bt(p, n),
        h = p === 'left' ? o : r,
        C = d[p] - u[p]
      v === p ? (m[v] = h + C) : (m[v] = h - C)
    }
  nt(e, m), Xo(e), ('left' in t || 'top' in t) && Go(e, c)
  var $ = {}
  for (var g in t)
    if (t.hasOwnProperty(g)) {
      var T = Bt(g, n),
        z = t[g] - d[g]
      g === T ? ($[T] = m[T] + z) : ($[T] = m[T] - z)
    }
  nt(e, $)
}
function ss(e, t) {
  var n = It(e),
    o = Zl(e),
    r = { x: o.x, y: o.y }
  'left' in t && (r.x = o.x + t.left - n.left),
    'top' in t && (r.y = o.y + t.top - n.top),
    es(e, r)
}
function us(e, t, n) {
  if (n.ignoreShake) {
    var o = It(e),
      r = o.left.toFixed(0),
      i = o.top.toFixed(0),
      a = t.left.toFixed(0),
      l = t.top.toFixed(0)
    if (r === a && i === l) return
  }
  n.useCssRight || n.useCssBottom
    ? qo(e, t, n)
    : n.useCssTransform && pn() in document.body.style
    ? ss(e, t)
    : qo(e, t, n)
}
function po(e, t) {
  for (var n = 0; n < e.length; n++) t(e[n])
}
function Ri(e) {
  return Dt(e, 'boxSizing') === 'border-box'
}
var cs = ['margin', 'border', 'padding'],
  Wn = -1,
  ds = 2,
  Vn = 1,
  fs = 0
function ps(e, t, n) {
  var o = {},
    r = e.style,
    i
  for (i in t) t.hasOwnProperty(i) && ((o[i] = r[i]), (r[i] = t[i]))
  n.call(e)
  for (i in t) t.hasOwnProperty(i) && (r[i] = o[i])
}
function St(e, t, n) {
  var o = 0,
    r,
    i,
    a
  for (i = 0; i < t.length; i++)
    if (((r = t[i]), r))
      for (a = 0; a < n.length; a++) {
        var l = void 0
        r === 'border'
          ? (l = ''.concat(r).concat(n[a], 'Width'))
          : (l = r + n[a]),
          (o += parseFloat(Dt(e, l)) || 0)
      }
  return o
}
var xe = {
  getParent: function(t) {
    var n = t
    do n.nodeType === 11 && n.host ? (n = n.host) : (n = n.parentNode)
    while (n && n.nodeType !== 1 && n.nodeType !== 9)
    return n
  }
}
po(['Width', 'Height'], function(e) {
  ;(xe['doc'.concat(e)] = function(t) {
    var n = t.document
    return Math.max(
      n.documentElement['scroll'.concat(e)],
      n.body['scroll'.concat(e)],
      xe['viewport'.concat(e)](n)
    )
  }),
    (xe['viewport'.concat(e)] = function(t) {
      var n = 'client'.concat(e),
        o = t.document,
        r = o.body,
        i = o.documentElement,
        a = i[n]
      return (o.compatMode === 'CSS1Compat' && a) || (r && r[n]) || a
    })
})
function ko(e, t, n) {
  var o = n
  if (fo(e)) return t === 'width' ? xe.viewportWidth(e) : xe.viewportHeight(e)
  if (e.nodeType === 9) return t === 'width' ? xe.docWidth(e) : xe.docHeight(e)
  var r = t === 'width' ? ['Left', 'Right'] : ['Top', 'Bottom'],
    i = Math.floor(
      t === 'width'
        ? e.getBoundingClientRect().width
        : e.getBoundingClientRect().height
    ),
    a = Ri(e),
    l = 0
  ;(i == null || i <= 0) &&
    ((i = void 0),
    (l = Dt(e, t)),
    (l == null || Number(l) < 0) && (l = e.style[t] || 0),
    (l = Math.floor(parseFloat(l)) || 0)),
    o === void 0 && (o = a ? Vn : Wn)
  var s = i !== void 0 || a,
    c = i || l
  return o === Wn
    ? s
      ? c - St(e, ['border', 'padding'], r)
      : l
    : s
    ? o === Vn
      ? c
      : c + (o === ds ? -St(e, ['border'], r) : St(e, ['margin'], r))
    : l + St(e, cs.slice(o), r)
}
var ms = { position: 'absolute', visibility: 'hidden', display: 'block' }
function Zo() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n]
  var o,
    r = t[0]
  return (
    r.offsetWidth !== 0
      ? (o = ko.apply(void 0, t))
      : ps(r, ms, function() {
          o = ko.apply(void 0, t)
        }),
    o
  )
}
po(['width', 'height'], function(e) {
  var t = e.charAt(0).toUpperCase() + e.slice(1)
  xe['outer'.concat(t)] = function(o, r) {
    return o && Zo(o, e, r ? fs : Vn)
  }
  var n = e === 'width' ? ['Left', 'Right'] : ['Top', 'Bottom']
  xe[e] = function(o, r) {
    var i = r
    if (i !== void 0) {
      if (o) {
        var a = Ri(o)
        return a && (i += St(o, ['padding', 'border'], n)), nt(o, e, i)
      }
      return
    }
    return o && Zo(o, e, Wn)
  }
})
function Di(e, t) {
  for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
  return e
}
var K = {
  getWindow: function(t) {
    if (t && t.document && t.setTimeout) return t
    var n = t.ownerDocument || t
    return n.defaultView || n.parentWindow
  },
  getDocument: Mi,
  offset: function(t, n, o) {
    if (typeof n < 'u') us(t, n, o || {})
    else return It(t)
  },
  isWindow: fo,
  each: po,
  css: nt,
  clone: function(t) {
    var n,
      o = {}
    for (n in t) t.hasOwnProperty(n) && (o[n] = t[n])
    var r = t.overflow
    if (r) for (n in t) t.hasOwnProperty(n) && (o.overflow[n] = t.overflow[n])
    return o
  },
  mix: Di,
  getWindowScrollLeft: function(t) {
    return _i(t)
  },
  getWindowScrollTop: function(t) {
    return Ai(t)
  },
  merge: function() {
    for (var t = {}, n = 0; n < arguments.length; n++)
      K.mix(t, n < 0 || arguments.length <= n ? void 0 : arguments[n])
    return t
  },
  viewportWidth: 0,
  viewportHeight: 0
}
Di(K, xe)
var Cn = K.getParent
function Kn(e) {
  if (K.isWindow(e) || e.nodeType === 9) return null
  var t = K.getDocument(e),
    n = t.body,
    o,
    r = K.css(e, 'position'),
    i = r === 'fixed' || r === 'absolute'
  if (!i) return e.nodeName.toLowerCase() === 'html' ? null : Cn(e)
  for (o = Cn(e); o && o !== n && o.nodeType !== 9; o = Cn(o))
    if (((r = K.css(o, 'position')), r !== 'static')) return o
  return null
}
var Qo = K.getParent
function vs(e) {
  if (K.isWindow(e) || e.nodeType === 9) return !1
  var t = K.getDocument(e),
    n = t.body,
    o = null
  for (o = Qo(e); o && o !== n && o !== t; o = Qo(o)) {
    var r = K.css(o, 'position')
    if (r === 'fixed') return !0
  }
  return !1
}
function mo(e, t) {
  for (
    var n = { left: 0, right: 1 / 0, top: 0, bottom: 1 / 0 },
      o = Kn(e),
      r = K.getDocument(e),
      i = r.defaultView || r.parentWindow,
      a = r.body,
      l = r.documentElement;
    o;

  ) {
    if (
      (navigator.userAgent.indexOf('MSIE') === -1 || o.clientWidth !== 0) &&
      o !== a &&
      o !== l &&
      K.css(o, 'overflow') !== 'visible'
    ) {
      var s = K.offset(o)
      ;(s.left += o.clientLeft),
        (s.top += o.clientTop),
        (n.top = Math.max(n.top, s.top)),
        (n.right = Math.min(n.right, s.left + o.clientWidth)),
        (n.bottom = Math.min(n.bottom, s.top + o.clientHeight)),
        (n.left = Math.max(n.left, s.left))
    } else if (o === a || o === l) break
    o = Kn(o)
  }
  var c = null
  if (!K.isWindow(e) && e.nodeType !== 9) {
    c = e.style.position
    var d = K.css(e, 'position')
    d === 'absolute' && (e.style.position = 'fixed')
  }
  var u = K.getWindowScrollLeft(i),
    m = K.getWindowScrollTop(i),
    p = K.viewportWidth(i),
    v = K.viewportHeight(i),
    h = l.scrollWidth,
    C = l.scrollHeight,
    $ = window.getComputedStyle(a)
  if (
    ($.overflowX === 'hidden' && (h = i.innerWidth),
    $.overflowY === 'hidden' && (C = i.innerHeight),
    e.style && (e.style.position = c),
    t || vs(e))
  )
    (n.left = Math.max(n.left, u)),
      (n.top = Math.max(n.top, m)),
      (n.right = Math.min(n.right, u + p)),
      (n.bottom = Math.min(n.bottom, m + v))
  else {
    var g = Math.max(h, u + p)
    n.right = Math.min(n.right, g)
    var T = Math.max(C, m + v)
    n.bottom = Math.min(n.bottom, T)
  }
  return n.top >= 0 && n.left >= 0 && n.bottom > n.top && n.right > n.left
    ? n
    : null
}
function gs(e, t, n, o) {
  var r = K.clone(e),
    i = { width: t.width, height: t.height }
  return (
    o.adjustX && r.left < n.left && (r.left = n.left),
    o.resizeWidth &&
      r.left >= n.left &&
      r.left + i.width > n.right &&
      (i.width -= r.left + i.width - n.right),
    o.adjustX &&
      r.left + i.width > n.right &&
      (r.left = Math.max(n.right - i.width, n.left)),
    o.adjustY && r.top < n.top && (r.top = n.top),
    o.resizeHeight &&
      r.top >= n.top &&
      r.top + i.height > n.bottom &&
      (i.height -= r.top + i.height - n.bottom),
    o.adjustY &&
      r.top + i.height > n.bottom &&
      (r.top = Math.max(n.bottom - i.height, n.top)),
    K.mix(r, i)
  )
}
function vo(e) {
  var t, n, o
  if (!K.isWindow(e) && e.nodeType !== 9)
    (t = K.offset(e)), (n = K.outerWidth(e)), (o = K.outerHeight(e))
  else {
    var r = K.getWindow(e)
    ;(t = { left: K.getWindowScrollLeft(r), top: K.getWindowScrollTop(r) }),
      (n = K.viewportWidth(r)),
      (o = K.viewportHeight(r))
  }
  return (t.width = n), (t.height = o), t
}
function Jo(e, t) {
  var n = t.charAt(0),
    o = t.charAt(1),
    r = e.width,
    i = e.height,
    a = e.left,
    l = e.top
  return (
    n === 'c' ? (l += i / 2) : n === 'b' && (l += i),
    o === 'c' ? (a += r / 2) : o === 'r' && (a += r),
    { left: a, top: l }
  )
}
function zt(e, t, n, o, r) {
  var i = Jo(t, n[1]),
    a = Jo(e, n[0]),
    l = [a.left - i.left, a.top - i.top]
  return {
    left: Math.round(e.left - l[0] + o[0] - r[0]),
    top: Math.round(e.top - l[1] + o[1] - r[1])
  }
}
function er(e, t, n) {
  return e.left < n.left || e.left + t.width > n.right
}
function tr(e, t, n) {
  return e.top < n.top || e.top + t.height > n.bottom
}
function hs(e, t, n) {
  return e.left > n.right || e.left + t.width < n.left
}
function bs(e, t, n) {
  return e.top > n.bottom || e.top + t.height < n.top
}
function Nt(e, t, n) {
  var o = []
  return (
    K.each(e, function(r) {
      o.push(
        r.replace(t, function(i) {
          return n[i]
        })
      )
    }),
    o
  )
}
function Ht(e, t) {
  return (e[t] = -e[t]), e
}
function nr(e, t) {
  var n
  return (
    /%$/.test(e)
      ? (n = (parseInt(e.substring(0, e.length - 1), 10) / 100) * t)
      : (n = parseInt(e, 10)),
    n || 0
  )
}
function or(e, t) {
  ;(e[0] = nr(e[0], t.width)), (e[1] = nr(e[1], t.height))
}
function Bi(e, t, n, o) {
  var r = n.points,
    i = n.offset || [0, 0],
    a = n.targetOffset || [0, 0],
    l = n.overflow,
    s = n.source || e
  ;(i = [].concat(i)), (a = [].concat(a)), (l = l || {})
  var c = {},
    d = 0,
    u = !!(l && l.alwaysByViewport),
    m = mo(s, u),
    p = vo(s)
  or(i, p), or(a, t)
  var v = zt(p, t, r, i, a),
    h = K.merge(p, v)
  if (m && (l.adjustX || l.adjustY) && o) {
    if (l.adjustX && er(v, p, m)) {
      var C = Nt(r, /[lr]/gi, { l: 'r', r: 'l' }),
        $ = Ht(i, 0),
        g = Ht(a, 0),
        T = zt(p, t, C, $, g)
      hs(T, p, m) || ((d = 1), (r = C), (i = $), (a = g))
    }
    if (l.adjustY && tr(v, p, m)) {
      var z = Nt(r, /[tb]/gi, { t: 'b', b: 't' }),
        P = Ht(i, 1),
        x = Ht(a, 1),
        b = zt(p, t, z, P, x)
      bs(b, p, m) || ((d = 1), (r = z), (i = P), (a = x))
    }
    d && ((v = zt(p, t, r, i, a)), K.mix(h, v))
    var A = er(v, p, m),
      F = tr(v, p, m)
    if (A || F) {
      var O = r
      A && (O = Nt(r, /[lr]/gi, { l: 'r', r: 'l' })),
        F && (O = Nt(r, /[tb]/gi, { t: 'b', b: 't' })),
        (r = O),
        (i = n.offset || [0, 0]),
        (a = n.targetOffset || [0, 0])
    }
    ;(c.adjustX = l.adjustX && A),
      (c.adjustY = l.adjustY && F),
      (c.adjustX || c.adjustY) && (h = gs(v, p, m, c))
  }
  return (
    h.width !== p.width && K.css(s, 'width', K.width(s) + h.width - p.width),
    h.height !== p.height &&
      K.css(s, 'height', K.height(s) + h.height - p.height),
    K.offset(
      s,
      { left: h.left, top: h.top },
      {
        useCssRight: n.useCssRight,
        useCssBottom: n.useCssBottom,
        useCssTransform: n.useCssTransform,
        ignoreShake: n.ignoreShake
      }
    ),
    { points: r, offset: i, targetOffset: a, overflow: c }
  )
}
function ys(e, t) {
  var n = mo(e, t),
    o = vo(e)
  return (
    !n ||
    o.left + o.width <= n.left ||
    o.top + o.height <= n.top ||
    o.left >= n.right ||
    o.top >= n.bottom
  )
}
function go(e, t, n) {
  var o = n.target || t,
    r = vo(o),
    i = !ys(o, n.overflow && n.overflow.alwaysByViewport)
  return Bi(e, r, n, i)
}
go.__getOffsetParent = Kn
go.__getVisibleRectForElement = mo
function $s(e, t, n) {
  var o,
    r,
    i = K.getDocument(e),
    a = i.defaultView || i.parentWindow,
    l = K.getWindowScrollLeft(a),
    s = K.getWindowScrollTop(a),
    c = K.viewportWidth(a),
    d = K.viewportHeight(a)
  'pageX' in t ? (o = t.pageX) : (o = l + t.clientX),
    'pageY' in t ? (r = t.pageY) : (r = s + t.clientY)
  var u = { left: o, top: r, width: 0, height: 0 },
    m = o >= 0 && o <= l + c && r >= 0 && r <= s + d,
    p = [n.points[0], 'cc']
  return Bi(e, u, Uo(Uo({}, n), {}, { points: p }), m)
}
function Se(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
    n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0,
    o = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1,
    r = e
  if ((Array.isArray(e) && (r = dt(e)[0]), !r)) return null
  const i = fi(r, t, o)
  return (
    (i.props = n ? f(f({}, i.props), t) : i.props),
    ui(typeof i.props.class != 'object'),
    i
  )
}
function yv(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
    n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0
  return e.map(o => Se(o, t, n))
}
function $v(e, t, n) {
  qt(fi(e, f({}, t)), n)
}
const zi = e =>
  (e || []).some(t =>
    al(t) ? !(t.type === ll || (t.type === Ge && !zi(t.children))) : !0
  )
    ? e
    : null
function wv(e, t, n, o) {
  var r
  const i = (r = e[t]) === null || r === void 0 ? void 0 : r.call(e, n)
  return zi(i) ? i : o == null ? void 0 : o()
}
const Ni = e => {
  if (!e) return !1
  if (e.offsetParent) return !0
  if (e.getBBox) {
    const t = e.getBBox()
    if (t.width || t.height) return !0
  }
  if (e.getBoundingClientRect) {
    const t = e.getBoundingClientRect()
    if (t.width || t.height) return !0
  }
  return !1
}
function ws(e, t) {
  return e === t
    ? !0
    : !e || !t
    ? !1
    : 'pageX' in t && 'pageY' in t
    ? e.pageX === t.pageX && e.pageY === t.pageY
    : 'clientX' in t && 'clientY' in t
    ? e.clientX === t.clientX && e.clientY === t.clientY
    : !1
}
function Ss(e, t) {
  e !== document.activeElement &&
    et(t, e) &&
    typeof e.focus == 'function' &&
    e.focus()
}
function rr(e, t) {
  let n = null,
    o = null
  function r(a) {
    let [{ target: l }] = a
    if (!document.documentElement.contains(l)) return
    const { width: s, height: c } = l.getBoundingClientRect(),
      d = Math.floor(s),
      u = Math.floor(c)
    ;(n !== d || o !== u) &&
      Promise.resolve().then(() => {
        t({ width: d, height: u })
      }),
      (n = d),
      (o = u)
  }
  const i = new $i(r)
  return (
    e && i.observe(e),
    () => {
      i.disconnect()
    }
  )
}
const Cs = (e, t) => {
  let n = !1,
    o = null
  function r() {
    clearTimeout(o)
  }
  function i(a) {
    if (!n || a === !0) {
      if (e() === !1) return
      ;(n = !0),
        r(),
        (o = setTimeout(() => {
          n = !1
        }, t.value))
    } else
      r(),
        (o = setTimeout(() => {
          ;(n = !1), i()
        }, t.value))
  }
  return [
    i,
    () => {
      ;(n = !1), r()
    }
  ]
}
function xs() {
  ;(this.__data__ = []), (this.size = 0)
}
function Hi(e, t) {
  return e === t || (e !== e && t !== t)
}
function mn(e, t) {
  for (var n = e.length; n--; ) if (Hi(e[n][0], t)) return n
  return -1
}
var Os = Array.prototype,
  Ts = Os.splice
function Is(e) {
  var t = this.__data__,
    n = mn(t, e)
  if (n < 0) return !1
  var o = t.length - 1
  return n == o ? t.pop() : Ts.call(t, n, 1), --this.size, !0
}
function Es(e) {
  var t = this.__data__,
    n = mn(t, e)
  return n < 0 ? void 0 : t[n][1]
}
function Ps(e) {
  return mn(this.__data__, e) > -1
}
function _s(e, t) {
  var n = this.__data__,
    o = mn(n, e)
  return o < 0 ? (++this.size, n.push([e, t])) : (n[o][1] = t), this
}
function _e(e) {
  var t = -1,
    n = e == null ? 0 : e.length
  for (this.clear(); ++t < n; ) {
    var o = e[t]
    this.set(o[0], o[1])
  }
}
_e.prototype.clear = xs
_e.prototype.delete = Is
_e.prototype.get = Es
_e.prototype.has = Ps
_e.prototype.set = _s
function As() {
  ;(this.__data__ = new _e()), (this.size = 0)
}
function Ms(e) {
  var t = this.__data__,
    n = t.delete(e)
  return (this.size = t.size), n
}
function Rs(e) {
  return this.__data__.get(e)
}
function Ds(e) {
  return this.__data__.has(e)
}
var Bs =
  typeof global == 'object' && global && global.Object === Object && global
const Fi = Bs
var zs = typeof self == 'object' && self && self.Object === Object && self,
  Ns = Fi || zs || Function('return this')()
const Ae = Ns
var Hs = Ae.Symbol
const st = Hs
var Li = Object.prototype,
  Fs = Li.hasOwnProperty,
  Ls = Li.toString,
  bt = st ? st.toStringTag : void 0
function js(e) {
  var t = Fs.call(e, bt),
    n = e[bt]
  try {
    e[bt] = void 0
    var o = !0
  } catch {}
  var r = Ls.call(e)
  return o && (t ? (e[bt] = n) : delete e[bt]), r
}
var Ws = Object.prototype,
  Vs = Ws.toString
function Ks(e) {
  return Vs.call(e)
}
var Us = '[object Null]',
  Gs = '[object Undefined]',
  ir = st ? st.toStringTag : void 0
function mt(e) {
  return e == null
    ? e === void 0
      ? Gs
      : Us
    : ir && ir in Object(e)
    ? js(e)
    : Ks(e)
}
function ji(e) {
  var t = typeof e
  return e != null && (t == 'object' || t == 'function')
}
var Xs = '[object AsyncFunction]',
  Ys = '[object Function]',
  qs = '[object GeneratorFunction]',
  ks = '[object Proxy]'
function Wi(e) {
  if (!ji(e)) return !1
  var t = mt(e)
  return t == Ys || t == qs || t == Xs || t == ks
}
var Zs = Ae['__core-js_shared__']
const xn = Zs
var ar = (function() {
  var e = /[^.]+$/.exec((xn && xn.keys && xn.keys.IE_PROTO) || '')
  return e ? 'Symbol(src)_1.' + e : ''
})()
function Qs(e) {
  return !!ar && ar in e
}
var Js = Function.prototype,
  eu = Js.toString
function qe(e) {
  if (e != null) {
    try {
      return eu.call(e)
    } catch {}
    try {
      return e + ''
    } catch {}
  }
  return ''
}
var tu = /[\\^$.*+?()[\]{}|]/g,
  nu = /^\[object .+?Constructor\]$/,
  ou = Function.prototype,
  ru = Object.prototype,
  iu = ou.toString,
  au = ru.hasOwnProperty,
  lu = RegExp(
    '^' +
      iu
        .call(au)
        .replace(tu, '\\$&')
        .replace(
          /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
          '$1.*?'
        ) +
      '$'
  )
function su(e) {
  if (!ji(e) || Qs(e)) return !1
  var t = Wi(e) ? lu : nu
  return t.test(qe(e))
}
function uu(e, t) {
  return e == null ? void 0 : e[t]
}
function vt(e, t) {
  var n = uu(e, t)
  return su(n) ? n : void 0
}
var cu = vt(Ae, 'Map')
const Et = cu
var du = vt(Object, 'create')
const Pt = du
function fu() {
  ;(this.__data__ = Pt ? Pt(null) : {}), (this.size = 0)
}
function pu(e) {
  var t = this.has(e) && delete this.__data__[e]
  return (this.size -= t ? 1 : 0), t
}
var mu = '__lodash_hash_undefined__',
  vu = Object.prototype,
  gu = vu.hasOwnProperty
function hu(e) {
  var t = this.__data__
  if (Pt) {
    var n = t[e]
    return n === mu ? void 0 : n
  }
  return gu.call(t, e) ? t[e] : void 0
}
var bu = Object.prototype,
  yu = bu.hasOwnProperty
function $u(e) {
  var t = this.__data__
  return Pt ? t[e] !== void 0 : yu.call(t, e)
}
var wu = '__lodash_hash_undefined__'
function Su(e, t) {
  var n = this.__data__
  return (
    (this.size += this.has(e) ? 0 : 1),
    (n[e] = Pt && t === void 0 ? wu : t),
    this
  )
}
function Xe(e) {
  var t = -1,
    n = e == null ? 0 : e.length
  for (this.clear(); ++t < n; ) {
    var o = e[t]
    this.set(o[0], o[1])
  }
}
Xe.prototype.clear = fu
Xe.prototype.delete = pu
Xe.prototype.get = hu
Xe.prototype.has = $u
Xe.prototype.set = Su
function Cu() {
  ;(this.size = 0),
    (this.__data__ = {
      hash: new Xe(),
      map: new (Et || _e)(),
      string: new Xe()
    })
}
function xu(e) {
  var t = typeof e
  return t == 'string' || t == 'number' || t == 'symbol' || t == 'boolean'
    ? e !== '__proto__'
    : e === null
}
function vn(e, t) {
  var n = e.__data__
  return xu(t) ? n[typeof t == 'string' ? 'string' : 'hash'] : n.map
}
function Ou(e) {
  var t = vn(this, e).delete(e)
  return (this.size -= t ? 1 : 0), t
}
function Tu(e) {
  return vn(this, e).get(e)
}
function Iu(e) {
  return vn(this, e).has(e)
}
function Eu(e, t) {
  var n = vn(this, e),
    o = n.size
  return n.set(e, t), (this.size += n.size == o ? 0 : 1), this
}
function ke(e) {
  var t = -1,
    n = e == null ? 0 : e.length
  for (this.clear(); ++t < n; ) {
    var o = e[t]
    this.set(o[0], o[1])
  }
}
ke.prototype.clear = Cu
ke.prototype.delete = Ou
ke.prototype.get = Tu
ke.prototype.has = Iu
ke.prototype.set = Eu
var Pu = 200
function _u(e, t) {
  var n = this.__data__
  if (n instanceof _e) {
    var o = n.__data__
    if (!Et || o.length < Pu - 1)
      return o.push([e, t]), (this.size = ++n.size), this
    n = this.__data__ = new ke(o)
  }
  return n.set(e, t), (this.size = n.size), this
}
function Ne(e) {
  var t = (this.__data__ = new _e(e))
  this.size = t.size
}
Ne.prototype.clear = As
Ne.prototype.delete = Ms
Ne.prototype.get = Rs
Ne.prototype.has = Ds
Ne.prototype.set = _u
var Au = '__lodash_hash_undefined__'
function Mu(e) {
  return this.__data__.set(e, Au), this
}
function Ru(e) {
  return this.__data__.has(e)
}
function _t(e) {
  var t = -1,
    n = e == null ? 0 : e.length
  for (this.__data__ = new ke(); ++t < n; ) this.add(e[t])
}
_t.prototype.add = _t.prototype.push = Mu
_t.prototype.has = Ru
function Du(e, t) {
  for (var n = -1, o = e == null ? 0 : e.length; ++n < o; )
    if (t(e[n], n, e)) return !0
  return !1
}
function Vi(e, t) {
  return e.has(t)
}
var Bu = 1,
  zu = 2
function Ki(e, t, n, o, r, i) {
  var a = n & Bu,
    l = e.length,
    s = t.length
  if (l != s && !(a && s > l)) return !1
  var c = i.get(e),
    d = i.get(t)
  if (c && d) return c == t && d == e
  var u = -1,
    m = !0,
    p = n & zu ? new _t() : void 0
  for (i.set(e, t), i.set(t, e); ++u < l; ) {
    var v = e[u],
      h = t[u]
    if (o) var C = a ? o(h, v, u, t, e, i) : o(v, h, u, e, t, i)
    if (C !== void 0) {
      if (C) continue
      m = !1
      break
    }
    if (p) {
      if (
        !Du(t, function($, g) {
          if (!Vi(p, g) && (v === $ || r(v, $, n, o, i))) return p.push(g)
        })
      ) {
        m = !1
        break
      }
    } else if (!(v === h || r(v, h, n, o, i))) {
      m = !1
      break
    }
  }
  return i.delete(e), i.delete(t), m
}
var Nu = Ae.Uint8Array
const lr = Nu
function Hu(e) {
  var t = -1,
    n = Array(e.size)
  return (
    e.forEach(function(o, r) {
      n[++t] = [r, o]
    }),
    n
  )
}
function ho(e) {
  var t = -1,
    n = Array(e.size)
  return (
    e.forEach(function(o) {
      n[++t] = o
    }),
    n
  )
}
var Fu = 1,
  Lu = 2,
  ju = '[object Boolean]',
  Wu = '[object Date]',
  Vu = '[object Error]',
  Ku = '[object Map]',
  Uu = '[object Number]',
  Gu = '[object RegExp]',
  Xu = '[object Set]',
  Yu = '[object String]',
  qu = '[object Symbol]',
  ku = '[object ArrayBuffer]',
  Zu = '[object DataView]',
  sr = st ? st.prototype : void 0,
  On = sr ? sr.valueOf : void 0
function Qu(e, t, n, o, r, i, a) {
  switch (n) {
    case Zu:
      if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
        return !1
      ;(e = e.buffer), (t = t.buffer)
    case ku:
      return !(e.byteLength != t.byteLength || !i(new lr(e), new lr(t)))
    case ju:
    case Wu:
    case Uu:
      return Hi(+e, +t)
    case Vu:
      return e.name == t.name && e.message == t.message
    case Gu:
    case Yu:
      return e == t + ''
    case Ku:
      var l = Hu
    case Xu:
      var s = o & Fu
      if ((l || (l = ho), e.size != t.size && !s)) return !1
      var c = a.get(e)
      if (c) return c == t
      ;(o |= Lu), a.set(e, t)
      var d = Ki(l(e), l(t), o, r, i, a)
      return a.delete(e), d
    case qu:
      if (On) return On.call(e) == On.call(t)
  }
  return !1
}
function Ju(e, t) {
  for (var n = -1, o = t.length, r = e.length; ++n < o; ) e[r + n] = t[n]
  return e
}
var ec = Array.isArray
const At = ec
function tc(e, t, n) {
  var o = t(e)
  return At(e) ? o : Ju(o, n(e))
}
function nc(e, t) {
  for (var n = -1, o = e == null ? 0 : e.length, r = 0, i = []; ++n < o; ) {
    var a = e[n]
    t(a, n, e) && (i[r++] = a)
  }
  return i
}
function oc() {
  return []
}
var rc = Object.prototype,
  ic = rc.propertyIsEnumerable,
  ur = Object.getOwnPropertySymbols,
  ac = ur
    ? function(e) {
        return e == null
          ? []
          : ((e = Object(e)),
            nc(ur(e), function(t) {
              return ic.call(e, t)
            }))
      }
    : oc
const lc = ac
function sc(e, t) {
  for (var n = -1, o = Array(e); ++n < e; ) o[n] = t(n)
  return o
}
function ut(e) {
  return e != null && typeof e == 'object'
}
var uc = '[object Arguments]'
function cr(e) {
  return ut(e) && mt(e) == uc
}
var Ui = Object.prototype,
  cc = Ui.hasOwnProperty,
  dc = Ui.propertyIsEnumerable,
  fc = cr(
    (function() {
      return arguments
    })()
  )
    ? cr
    : function(e) {
        return ut(e) && cc.call(e, 'callee') && !dc.call(e, 'callee')
      }
const Gi = fc
function pc() {
  return !1
}
var Xi = typeof exports == 'object' && exports && !exports.nodeType && exports,
  dr = Xi && typeof module == 'object' && module && !module.nodeType && module,
  mc = dr && dr.exports === Xi,
  fr = mc ? Ae.Buffer : void 0,
  vc = fr ? fr.isBuffer : void 0,
  gc = vc || pc
const en = gc
var hc = 9007199254740991,
  bc = /^(?:0|[1-9]\d*)$/
function yc(e, t) {
  var n = typeof e
  return (
    (t = t ?? hc),
    !!t &&
      (n == 'number' || (n != 'symbol' && bc.test(e))) &&
      e > -1 &&
      e % 1 == 0 &&
      e < t
  )
}
var $c = 9007199254740991
function Yi(e) {
  return typeof e == 'number' && e > -1 && e % 1 == 0 && e <= $c
}
var wc = '[object Arguments]',
  Sc = '[object Array]',
  Cc = '[object Boolean]',
  xc = '[object Date]',
  Oc = '[object Error]',
  Tc = '[object Function]',
  Ic = '[object Map]',
  Ec = '[object Number]',
  Pc = '[object Object]',
  _c = '[object RegExp]',
  Ac = '[object Set]',
  Mc = '[object String]',
  Rc = '[object WeakMap]',
  Dc = '[object ArrayBuffer]',
  Bc = '[object DataView]',
  zc = '[object Float32Array]',
  Nc = '[object Float64Array]',
  Hc = '[object Int8Array]',
  Fc = '[object Int16Array]',
  Lc = '[object Int32Array]',
  jc = '[object Uint8Array]',
  Wc = '[object Uint8ClampedArray]',
  Vc = '[object Uint16Array]',
  Kc = '[object Uint32Array]',
  ne = {}
ne[zc] = ne[Nc] = ne[Hc] = ne[Fc] = ne[Lc] = ne[jc] = ne[Wc] = ne[Vc] = ne[
  Kc
] = !0
ne[wc] = ne[Sc] = ne[Dc] = ne[Cc] = ne[Bc] = ne[xc] = ne[Oc] = ne[Tc] = ne[
  Ic
] = ne[Ec] = ne[Pc] = ne[_c] = ne[Ac] = ne[Mc] = ne[Rc] = !1
function Uc(e) {
  return ut(e) && Yi(e.length) && !!ne[mt(e)]
}
function Gc(e) {
  return function(t) {
    return e(t)
  }
}
var qi = typeof exports == 'object' && exports && !exports.nodeType && exports,
  Ct = qi && typeof module == 'object' && module && !module.nodeType && module,
  Xc = Ct && Ct.exports === qi,
  Tn = Xc && Fi.process,
  Yc = (function() {
    try {
      var e = Ct && Ct.require && Ct.require('util').types
      return e || (Tn && Tn.binding && Tn.binding('util'))
    } catch {}
  })()
const pr = Yc
var mr = pr && pr.isTypedArray,
  qc = mr ? Gc(mr) : Uc
const bo = qc
var kc = Object.prototype,
  Zc = kc.hasOwnProperty
function Qc(e, t) {
  var n = At(e),
    o = !n && Gi(e),
    r = !n && !o && en(e),
    i = !n && !o && !r && bo(e),
    a = n || o || r || i,
    l = a ? sc(e.length, String) : [],
    s = l.length
  for (var c in e)
    (t || Zc.call(e, c)) &&
      !(
        a &&
        (c == 'length' ||
          (r && (c == 'offset' || c == 'parent')) ||
          (i && (c == 'buffer' || c == 'byteLength' || c == 'byteOffset')) ||
          yc(c, s))
      ) &&
      l.push(c)
  return l
}
var Jc = Object.prototype
function ki(e) {
  var t = e && e.constructor,
    n = (typeof t == 'function' && t.prototype) || Jc
  return e === n
}
function ed(e, t) {
  return function(n) {
    return e(t(n))
  }
}
var td = ed(Object.keys, Object)
const nd = td
var od = Object.prototype,
  rd = od.hasOwnProperty
function Zi(e) {
  if (!ki(e)) return nd(e)
  var t = []
  for (var n in Object(e)) rd.call(e, n) && n != 'constructor' && t.push(n)
  return t
}
function Qi(e) {
  return e != null && Yi(e.length) && !Wi(e)
}
function id(e) {
  return Qi(e) ? Qc(e) : Zi(e)
}
function vr(e) {
  return tc(e, id, lc)
}
var ad = 1,
  ld = Object.prototype,
  sd = ld.hasOwnProperty
function ud(e, t, n, o, r, i) {
  var a = n & ad,
    l = vr(e),
    s = l.length,
    c = vr(t),
    d = c.length
  if (s != d && !a) return !1
  for (var u = s; u--; ) {
    var m = l[u]
    if (!(a ? m in t : sd.call(t, m))) return !1
  }
  var p = i.get(e),
    v = i.get(t)
  if (p && v) return p == t && v == e
  var h = !0
  i.set(e, t), i.set(t, e)
  for (var C = a; ++u < s; ) {
    m = l[u]
    var $ = e[m],
      g = t[m]
    if (o) var T = a ? o(g, $, m, t, e, i) : o($, g, m, e, t, i)
    if (!(T === void 0 ? $ === g || r($, g, n, o, i) : T)) {
      h = !1
      break
    }
    C || (C = m == 'constructor')
  }
  if (h && !C) {
    var z = e.constructor,
      P = t.constructor
    z != P &&
      'constructor' in e &&
      'constructor' in t &&
      !(
        typeof z == 'function' &&
        z instanceof z &&
        typeof P == 'function' &&
        P instanceof P
      ) &&
      (h = !1)
  }
  return i.delete(e), i.delete(t), h
}
var cd = vt(Ae, 'DataView')
const Un = cd
var dd = vt(Ae, 'Promise')
const Gn = dd
var fd = vt(Ae, 'Set')
const ot = fd
var pd = vt(Ae, 'WeakMap')
const Xn = pd
var gr = '[object Map]',
  md = '[object Object]',
  hr = '[object Promise]',
  br = '[object Set]',
  yr = '[object WeakMap]',
  $r = '[object DataView]',
  vd = qe(Un),
  gd = qe(Et),
  hd = qe(Gn),
  bd = qe(ot),
  yd = qe(Xn),
  Ke = mt
;((Un && Ke(new Un(new ArrayBuffer(1))) != $r) ||
  (Et && Ke(new Et()) != gr) ||
  (Gn && Ke(Gn.resolve()) != hr) ||
  (ot && Ke(new ot()) != br) ||
  (Xn && Ke(new Xn()) != yr)) &&
  (Ke = function(e) {
    var t = mt(e),
      n = t == md ? e.constructor : void 0,
      o = n ? qe(n) : ''
    if (o)
      switch (o) {
        case vd:
          return $r
        case gd:
          return gr
        case hd:
          return hr
        case bd:
          return br
        case yd:
          return yr
      }
    return t
  })
const Yn = Ke
var $d = 1,
  wr = '[object Arguments]',
  Sr = '[object Array]',
  Ft = '[object Object]',
  wd = Object.prototype,
  Cr = wd.hasOwnProperty
function Sd(e, t, n, o, r, i) {
  var a = At(e),
    l = At(t),
    s = a ? Sr : Yn(e),
    c = l ? Sr : Yn(t)
  ;(s = s == wr ? Ft : s), (c = c == wr ? Ft : c)
  var d = s == Ft,
    u = c == Ft,
    m = s == c
  if (m && en(e)) {
    if (!en(t)) return !1
    ;(a = !0), (d = !1)
  }
  if (m && !d)
    return (
      i || (i = new Ne()),
      a || bo(e) ? Ki(e, t, n, o, r, i) : Qu(e, t, s, n, o, r, i)
    )
  if (!(n & $d)) {
    var p = d && Cr.call(e, '__wrapped__'),
      v = u && Cr.call(t, '__wrapped__')
    if (p || v) {
      var h = p ? e.value() : e,
        C = v ? t.value() : t
      return i || (i = new Ne()), r(h, C, n, o, i)
    }
  }
  return m ? (i || (i = new Ne()), ud(e, t, n, o, r, i)) : !1
}
function Ji(e, t, n, o, r) {
  return e === t
    ? !0
    : e == null || t == null || (!ut(e) && !ut(t))
    ? e !== e && t !== t
    : Sd(e, t, n, o, Ji, r)
}
function Cd(e, t) {
  return Ji(e, t)
}
const xd = {
  align: Object,
  target: [Object, Function],
  onAlign: Function,
  monitorBufferTime: Number,
  monitorWindowResize: Boolean,
  disabled: Boolean
}
function xr(e) {
  return typeof e != 'function' ? null : e()
}
function Or(e) {
  return typeof e != 'object' || !e ? null : e
}
const Od = X({
    compatConfig: { MODE: 3 },
    name: 'Align',
    props: xd,
    emits: ['align'],
    setup(e, t) {
      let { expose: n, slots: o } = t
      const r = j({}),
        i = j(),
        [a, l] = Cs(
          () => {
            const { disabled: m, target: p, align: v, onAlign: h } = e
            if (!m && p && i.value) {
              const C = i.value
              let $
              const g = xr(p),
                T = Or(p)
              ;(r.value.element = g), (r.value.point = T), (r.value.align = v)
              const { activeElement: z } = document
              return (
                g && Ni(g) ? ($ = go(C, g, v)) : T && ($ = $s(C, T, v)),
                Ss(z, C),
                h && $ && h(C, $),
                !0
              )
            }
            return !1
          },
          S(() => e.monitorBufferTime)
        ),
        s = j({ cancel: () => {} }),
        c = j({ cancel: () => {} }),
        d = () => {
          const m = e.target,
            p = xr(m),
            v = Or(m)
          i.value !== c.value.element &&
            (c.value.cancel(),
            (c.value.element = i.value),
            (c.value.cancel = rr(i.value, a))),
            (r.value.element !== p ||
              !ws(r.value.point, v) ||
              !Cd(r.value.align, e.align)) &&
              (a(),
              s.value.element !== p &&
                (s.value.cancel(),
                (s.value.element = p),
                (s.value.cancel = rr(p, a))))
        }
      Pe(() => {
        Te(() => {
          d()
        })
      }),
        cn(() => {
          Te(() => {
            d()
          })
        }),
        J(
          () => e.disabled,
          m => {
            m ? l() : a()
          },
          { immediate: !0, flush: 'post' }
        )
      const u = j(null)
      return (
        J(
          () => e.monitorWindowResize,
          m => {
            m
              ? u.value || (u.value = wt(window, 'resize', a))
              : u.value && (u.value.remove(), (u.value = null))
          },
          { flush: 'post' }
        ),
        ao(() => {
          s.value.cancel(), c.value.cancel(), u.value && u.value.remove(), l()
        }),
        n({ forceAlign: () => a(!0) }),
        () => {
          const m = o == null ? void 0 : o.default()
          return m ? Se(m[0], { ref: i }, !0, !0) : null
        }
      )
    }
  }),
  Td = X({
    compatConfig: { MODE: 3 },
    name: 'PopupInner',
    inheritAttrs: !1,
    props: co,
    emits: ['mouseenter', 'mouseleave', 'mousedown', 'touchstart', 'align'],
    setup(e, t) {
      let { expose: n, attrs: o, slots: r } = t
      const i = N(),
        a = N(),
        l = N(),
        [s, c] = Xl(Hn(e, 'stretch')),
        d = () => {
          e.stretch && c(e.getRootDomNode())
        },
        u = N(!1)
      let m
      J(
        () => e.visible,
        x => {
          clearTimeout(m),
            x
              ? (m = setTimeout(() => {
                  u.value = e.visible
                }))
              : (u.value = !1)
        },
        { immediate: !0 }
      )
      const [p, v] = Gl(u, d),
        h = N(),
        C = () => (e.point ? e.point : e.getRootDomNode),
        $ = () => {
          var x
          ;(x = i.value) === null || x === void 0 || x.forceAlign()
        },
        g = (x, b) => {
          var A
          const F = e.getClassNameFromAlign(b),
            O = l.value
          l.value !== F && (l.value = F),
            p.value === 'align' &&
              (O !== F
                ? Promise.resolve().then(() => {
                    $()
                  })
                : v(() => {
                    var R
                    ;(R = h.value) === null || R === void 0 || R.call(h)
                  }),
              (A = e.onAlign) === null || A === void 0 || A.call(e, x, b))
        },
        T = S(() => {
          const x = typeof e.animation == 'object' ? e.animation : si(e)
          return (
            ['onAfterEnter', 'onAfterLeave'].forEach(b => {
              const A = x[b]
              x[b] = F => {
                v(), (p.value = 'stable'), A == null || A(F)
              }
            }),
            x
          )
        }),
        z = () =>
          new Promise(x => {
            h.value = x
          })
      J(
        [T, p],
        () => {
          !T.value && p.value === 'motion' && v()
        },
        { immediate: !0 }
      ),
        n({ forceAlign: $, getElement: () => a.value.$el || a.value })
      const P = S(() => {
        var x
        return !(
          !((x = e.align) === null || x === void 0) &&
          x.points &&
          (p.value === 'align' || p.value === 'stable')
        )
      })
      return () => {
        var x
        const {
            zIndex: b,
            align: A,
            prefixCls: F,
            destroyPopupOnHide: O,
            onMouseenter: R,
            onMouseleave: U,
            onTouchstart: G = () => {},
            onMousedown: Q
          } = e,
          w = p.value,
          B = [
            f(f({}, s.value), {
              zIndex: b,
              opacity: w === 'motion' || w === 'stable' || !u.value ? null : 0,
              pointerEvents: !u.value && w !== 'stable' ? 'none' : null
            }),
            o.style
          ]
        let V = Ye(
          (x = r.default) === null || x === void 0
            ? void 0
            : x.call(r, { visible: e.visible })
        )
        V.length > 1 && (V = y('div', { class: `${F}-content` }, [V]))
        const Y = oe(F, o.class, l.value, !e.arrow && `${F}-arrow-hidden`),
          H = u.value || !e.visible ? ci(T.value.name, T.value) : {}
        return y(pt, M(M({ ref: a }, H), {}, { onBeforeEnter: z }), {
          default: () =>
            !O || e.visible
              ? lo(
                  y(
                    Od,
                    {
                      target: C(),
                      key: 'popup',
                      ref: i,
                      monitorWindowResize: !0,
                      disabled: P.value,
                      align: A,
                      onAlign: g
                    },
                    {
                      default: () =>
                        y(
                          'div',
                          {
                            class: Y,
                            onMouseenter: R,
                            onMouseleave: U,
                            onMousedown: Ho(Q, ['capture']),
                            [tt ? 'onTouchstartPassive' : 'onTouchstart']: Ho(
                              G,
                              ['capture']
                            ),
                            style: B
                          },
                          [V]
                        )
                    }
                  ),
                  [[pi, u.value]]
                )
              : null
        })
      }
    }
  }),
  Id = X({
    compatConfig: { MODE: 3 },
    name: 'Popup',
    inheritAttrs: !1,
    props: Vl,
    setup(e, t) {
      let { attrs: n, slots: o, expose: r } = t
      const i = N(!1),
        a = N(!1),
        l = N(),
        s = N()
      return (
        J(
          [() => e.visible, () => e.mobile],
          () => {
            ;(i.value = e.visible), e.visible && e.mobile && (a.value = !0)
          },
          { immediate: !0, flush: 'post' }
        ),
        r({
          forceAlign: () => {
            var c
            ;(c = l.value) === null || c === void 0 || c.forceAlign()
          },
          getElement: () => {
            var c
            return (c = l.value) === null || c === void 0
              ? void 0
              : c.getElement()
          }
        }),
        () => {
          const c = f(f(f({}, e), n), { visible: i.value }),
            d = a.value
              ? y(Kl, M(M({}, c), {}, { mobile: e.mobile, ref: l }), {
                  default: o.default
                })
              : y(Td, M(M({}, c), {}, { ref: l }), { default: o.default })
          return y('div', { ref: s }, [y(Ii, c, null), d])
        }
      )
    }
  })
function Ed(e, t, n) {
  return n ? e[0] === t[0] : e[0] === t[0] && e[1] === t[1]
}
function Tr(e, t, n) {
  const o = e[t] || {}
  return f(f({}, o), n)
}
function Pd(e, t, n, o) {
  const { points: r } = n,
    i = Object.keys(e)
  for (let a = 0; a < i.length; a += 1) {
    const l = i[a]
    if (Ed(e[l].points, r, o)) return `${t}-placement-${l}`
  }
  return ''
}
const _d = {
  methods: {
    setState() {
      let e =
          arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {},
        t = arguments.length > 1 ? arguments[1] : void 0,
        n = typeof e == 'function' ? e(this.$data, this.$props) : e
      if (this.getDerivedStateFromProps) {
        const o = this.getDerivedStateFromProps(
          Fa(this),
          f(f({}, this.$data), n)
        )
        if (o === null) return
        n = f(f({}, n), o || {})
      }
      f(this.$data, n),
        this._.isMounted && this.$forceUpdate(),
        Te(() => {
          t && t()
        })
    },
    __emit() {
      const e = [].slice.call(arguments, 0)
      let t = e[0]
      t = `on${t[0].toUpperCase()}${t.substring(1)}`
      const n = this.$props[t] || this.$attrs[t]
      if (e.length && n)
        if (Array.isArray(n))
          for (let o = 0, r = n.length; o < r; o++) n[o](...e.slice(1))
        else n(...e.slice(1))
    }
  }
}
let In
function ea(e) {
  if (typeof document > 'u') return 0
  if (e || In === void 0) {
    const t = document.createElement('div')
    ;(t.style.width = '100%'), (t.style.height = '200px')
    const n = document.createElement('div'),
      o = n.style
    ;(o.position = 'absolute'),
      (o.top = '0'),
      (o.left = '0'),
      (o.pointerEvents = 'none'),
      (o.visibility = 'hidden'),
      (o.width = '200px'),
      (o.height = '150px'),
      (o.overflow = 'hidden'),
      n.appendChild(t),
      document.body.appendChild(n)
    const r = t.offsetWidth
    n.style.overflow = 'scroll'
    let i = t.offsetWidth
    r === i && (i = n.clientWidth), document.body.removeChild(n), (In = r - i)
  }
  return In
}
function Ir(e) {
  const t = e.match(/^(.*)px$/),
    n = Number(t == null ? void 0 : t[1])
  return Number.isNaN(n) ? ea() : n
}
function Sv(e) {
  if (typeof document > 'u' || !e || !(e instanceof Element))
    return { width: 0, height: 0 }
  const { width: t, height: n } = getComputedStyle(e, '::-webkit-scrollbar')
  return { width: Ir(t), height: Ir(n) }
}
const Ad = `vc-util-locker-${Date.now()}`
let Er = 0
function Md() {
  return (
    document.body.scrollHeight >
      (window.innerHeight || document.documentElement.clientHeight) &&
    window.innerWidth > document.body.offsetWidth
  )
}
function Rd(e) {
  const t = S(() => !!e && !!e.value)
  Er += 1
  const n = `${Ad}_${Er}`
  Oe(
    o => {
      if (rt()) {
        if (t.value) {
          const r = ea(),
            i = Md()
          La(
            `
html body {
  overflow-y: hidden;
  ${i ? `width: calc(100% - ${r}px);` : ''}
}`,
            n
          )
        } else Do(n)
        o(() => {
          Do(n)
        })
      }
    },
    { flush: 'post' }
  )
}
let We = 0
const Kt = rt(),
  Pr = e => {
    if (!Kt) return null
    if (e) {
      if (typeof e == 'string') return document.querySelectorAll(e)[0]
      if (typeof e == 'function') return e()
      if (typeof e == 'object' && e instanceof window.HTMLElement) return e
    }
    return document.body
  },
  Dd = X({
    compatConfig: { MODE: 3 },
    name: 'PortalWrapper',
    inheritAttrs: !1,
    props: {
      wrapperClassName: String,
      forceRender: { type: Boolean, default: void 0 },
      getContainer: I.any,
      visible: { type: Boolean, default: void 0 },
      autoLock: Xt(),
      didUpdate: Function
    },
    setup(e, t) {
      let { slots: n } = t
      const o = N(),
        r = N(),
        i = N(),
        a = N(1),
        l = rt() && document.createElement('div'),
        s = () => {
          var p, v
          o.value === l &&
            ((v =
              (p = o.value) === null || p === void 0
                ? void 0
                : p.parentNode) === null ||
              v === void 0 ||
              v.removeChild(o.value)),
            (o.value = null)
        }
      let c = null
      const d = function() {
          return (arguments.length > 0 && arguments[0] !== void 0
            ? arguments[0]
            : !1) ||
            (o.value && !o.value.parentNode)
            ? ((c = Pr(e.getContainer)), c ? (c.appendChild(o.value), !0) : !1)
            : !0
        },
        u = () =>
          Kt ? (o.value || ((o.value = l), d(!0)), m(), o.value) : null,
        m = () => {
          const { wrapperClassName: p } = e
          o.value && p && p !== o.value.className && (o.value.className = p)
        }
      return (
        cn(() => {
          m(), d()
        }),
        Rd(
          S(
            () =>
              e.autoLock &&
              e.visible &&
              rt() &&
              (o.value === document.body || o.value === l)
          )
        ),
        Pe(() => {
          let p = !1
          J(
            [() => e.visible, () => e.getContainer],
            (v, h) => {
              let [C, $] = v,
                [g, T] = h
              Kt &&
                ((c = Pr(e.getContainer)),
                c === document.body && (C && !g ? (We += 1) : p && (We -= 1))),
                p &&
                  (typeof $ == 'function' && typeof T == 'function'
                    ? $.toString() !== T.toString()
                    : $ !== T) &&
                  s(),
                (p = !0)
            },
            { immediate: !0, flush: 'post' }
          ),
            Te(() => {
              d() ||
                (i.value = le(() => {
                  a.value += 1
                }))
            })
        }),
        ve(() => {
          const { visible: p } = e
          Kt && c === document.body && (We = p && We ? We - 1 : We),
            s(),
            le.cancel(i.value)
        }),
        () => {
          const { forceRender: p, visible: v } = e
          let h = null
          const C = { getOpenCount: () => We, getContainer: u }
          return (
            a.value &&
              (p || v || r.value) &&
              (h = y(
                ja,
                { getContainer: u, ref: r, didUpdate: e.didUpdate },
                {
                  default: () => {
                    var $
                    return ($ = n.default) === null || $ === void 0
                      ? void 0
                      : $.call(n, C)
                  }
                }
              )),
            h
          )
        }
      )
    }
  }),
  Bd = [
    'onClick',
    'onMousedown',
    'onTouchstart',
    'onMouseenter',
    'onMouseleave',
    'onFocus',
    'onBlur',
    'onContextmenu'
  ],
  yo = X({
    compatConfig: { MODE: 3 },
    name: 'Trigger',
    mixins: [_d],
    inheritAttrs: !1,
    props: jl(),
    setup(e) {
      const t = S(() => {
          const { popupPlacement: r, popupAlign: i, builtinPlacements: a } = e
          return r && a ? Tr(a, r, i) : i
        }),
        n = N(null),
        o = r => {
          n.value = r
        }
      return {
        vcTriggerContext: we('vcTriggerContext', {}),
        popupRef: n,
        setPopupRef: o,
        triggerRef: N(null),
        align: t,
        focusTime: null,
        clickOutsideHandler: null,
        contextmenuOutsideHandler1: null,
        contextmenuOutsideHandler2: null,
        touchOutsideHandler: null,
        attachId: null,
        delayTimer: null,
        hasPopupMouseDown: !1,
        preClickTime: null,
        preTouchTime: null,
        mouseDownTimeout: null,
        childOriginEvents: {}
      }
    },
    data() {
      const e = this.$props
      let t
      return (
        this.popupVisible !== void 0
          ? (t = !!e.popupVisible)
          : (t = !!e.defaultPopupVisible),
        Bd.forEach(n => {
          this[`fire${n}`] = o => {
            this.fireEvents(n, o)
          }
        }),
        { prevPopupVisible: t, sPopupVisible: t, point: null }
      )
    },
    watch: {
      popupVisible(e) {
        e !== void 0 &&
          ((this.prevPopupVisible = this.sPopupVisible),
          (this.sPopupVisible = e))
      }
    },
    created() {
      pe('vcTriggerContext', {
        onPopupMouseDown: this.onPopupMouseDown,
        onPopupMouseenter: this.onPopupMouseenter,
        onPopupMouseleave: this.onPopupMouseleave
      }),
        Wa(this)
    },
    deactivated() {
      this.setPopupVisible(!1)
    },
    mounted() {
      this.$nextTick(() => {
        this.updatedCal()
      })
    },
    updated() {
      this.$nextTick(() => {
        this.updatedCal()
      })
    },
    beforeUnmount() {
      this.clearDelayTimer(),
        this.clearOutsideHandler(),
        clearTimeout(this.mouseDownTimeout),
        le.cancel(this.attachId)
    },
    methods: {
      updatedCal() {
        const e = this.$props
        if (this.$data.sPopupVisible) {
          let n
          !this.clickOutsideHandler &&
            (this.isClickToHide() || this.isContextmenuToShow()) &&
            ((n = e.getDocument(this.getRootDomNode())),
            (this.clickOutsideHandler = wt(
              n,
              'mousedown',
              this.onDocumentClick
            ))),
            this.touchOutsideHandler ||
              ((n = n || e.getDocument(this.getRootDomNode())),
              (this.touchOutsideHandler = wt(
                n,
                'touchstart',
                this.onDocumentClick,
                tt ? { passive: !1 } : !1
              ))),
            !this.contextmenuOutsideHandler1 &&
              this.isContextmenuToShow() &&
              ((n = n || e.getDocument(this.getRootDomNode())),
              (this.contextmenuOutsideHandler1 = wt(
                n,
                'scroll',
                this.onContextmenuClose
              ))),
            !this.contextmenuOutsideHandler2 &&
              this.isContextmenuToShow() &&
              (this.contextmenuOutsideHandler2 = wt(
                window,
                'blur',
                this.onContextmenuClose
              ))
        } else this.clearOutsideHandler()
      },
      onMouseenter(e) {
        const { mouseEnterDelay: t } = this.$props
        this.fireEvents('onMouseenter', e),
          this.delaySetPopupVisible(!0, t, t ? null : e)
      },
      onMouseMove(e) {
        this.fireEvents('onMousemove', e), this.setPoint(e)
      },
      onMouseleave(e) {
        this.fireEvents('onMouseleave', e),
          this.delaySetPopupVisible(!1, this.$props.mouseLeaveDelay)
      },
      onPopupMouseenter() {
        const { vcTriggerContext: e = {} } = this
        e.onPopupMouseenter && e.onPopupMouseenter(), this.clearDelayTimer()
      },
      onPopupMouseleave(e) {
        var t
        if (
          e &&
          e.relatedTarget &&
          !e.relatedTarget.setTimeout &&
          et(
            (t = this.popupRef) === null || t === void 0
              ? void 0
              : t.getElement(),
            e.relatedTarget
          )
        )
          return
        this.isMouseLeaveToHide() &&
          this.delaySetPopupVisible(!1, this.$props.mouseLeaveDelay)
        const { vcTriggerContext: n = {} } = this
        n.onPopupMouseleave && n.onPopupMouseleave(e)
      },
      onFocus(e) {
        this.fireEvents('onFocus', e),
          this.clearDelayTimer(),
          this.isFocusToShow() &&
            ((this.focusTime = Date.now()),
            this.delaySetPopupVisible(!0, this.$props.focusDelay))
      },
      onMousedown(e) {
        this.fireEvents('onMousedown', e), (this.preClickTime = Date.now())
      },
      onTouchstart(e) {
        this.fireEvents('onTouchstart', e), (this.preTouchTime = Date.now())
      },
      onBlur(e) {
        et(e.target, e.relatedTarget || document.activeElement) ||
          (this.fireEvents('onBlur', e),
          this.clearDelayTimer(),
          this.isBlurToHide() &&
            this.delaySetPopupVisible(!1, this.$props.blurDelay))
      },
      onContextmenu(e) {
        e.preventDefault(),
          this.fireEvents('onContextmenu', e),
          this.setPopupVisible(!0, e)
      },
      onContextmenuClose() {
        this.isContextmenuToShow() && this.close()
      },
      onClick(e) {
        if ((this.fireEvents('onClick', e), this.focusTime)) {
          let n
          if (
            (this.preClickTime && this.preTouchTime
              ? (n = Math.min(this.preClickTime, this.preTouchTime))
              : this.preClickTime
              ? (n = this.preClickTime)
              : this.preTouchTime && (n = this.preTouchTime),
            Math.abs(n - this.focusTime) < 20)
          )
            return
          this.focusTime = 0
        }
        ;(this.preClickTime = 0),
          (this.preTouchTime = 0),
          this.isClickToShow() &&
            (this.isClickToHide() || this.isBlurToHide()) &&
            e &&
            e.preventDefault &&
            e.preventDefault(),
          e && e.domEvent && e.domEvent.preventDefault()
        const t = !this.$data.sPopupVisible
        ;((this.isClickToHide() && !t) || (t && this.isClickToShow())) &&
          this.setPopupVisible(!this.$data.sPopupVisible, e)
      },
      onPopupMouseDown() {
        const { vcTriggerContext: e = {} } = this
        ;(this.hasPopupMouseDown = !0),
          clearTimeout(this.mouseDownTimeout),
          (this.mouseDownTimeout = setTimeout(() => {
            this.hasPopupMouseDown = !1
          }, 0)),
          e.onPopupMouseDown && e.onPopupMouseDown(...arguments)
      },
      onDocumentClick(e) {
        if (this.$props.mask && !this.$props.maskClosable) return
        const t = e.target,
          n = this.getRootDomNode(),
          o = this.getPopupDomNode()
        ;(!et(n, t) || this.isContextMenuOnly()) &&
          !et(o, t) &&
          !this.hasPopupMouseDown &&
          this.delaySetPopupVisible(!1, 0.1)
      },
      getPopupDomNode() {
        var e
        return (
          ((e = this.popupRef) === null || e === void 0
            ? void 0
            : e.getElement()) || null
        )
      },
      getRootDomNode() {
        var e, t, n, o
        const { getTriggerDOMNode: r } = this.$props
        if (r) {
          const i =
            ((t =
              (e = this.triggerRef) === null || e === void 0
                ? void 0
                : e.$el) === null || t === void 0
              ? void 0
              : t.nodeName) === '#comment'
              ? null
              : De(this.triggerRef)
          return De(r(i))
        }
        try {
          const i =
            ((o =
              (n = this.triggerRef) === null || n === void 0
                ? void 0
                : n.$el) === null || o === void 0
              ? void 0
              : o.nodeName) === '#comment'
              ? null
              : De(this.triggerRef)
          if (i) return i
        } catch {}
        return De(this)
      },
      handleGetPopupClassFromAlign(e) {
        const t = [],
          n = this.$props,
          {
            popupPlacement: o,
            builtinPlacements: r,
            prefixCls: i,
            alignPoint: a,
            getPopupClassNameFromAlign: l
          } = n
        return o && r && t.push(Pd(r, i, e, a)), l && t.push(l(e)), t.join(' ')
      },
      getPopupAlign() {
        const e = this.$props,
          { popupPlacement: t, popupAlign: n, builtinPlacements: o } = e
        return t && o ? Tr(o, t, n) : n
      },
      getComponent() {
        const e = {}
        this.isMouseEnterToShow() && (e.onMouseenter = this.onPopupMouseenter),
          this.isMouseLeaveToHide() &&
            (e.onMouseleave = this.onPopupMouseleave),
          (e.onMousedown = this.onPopupMouseDown),
          (e[
            tt ? 'onTouchstartPassive' : 'onTouchstart'
          ] = this.onPopupMouseDown)
        const {
            handleGetPopupClassFromAlign: t,
            getRootDomNode: n,
            $attrs: o
          } = this,
          {
            prefixCls: r,
            destroyPopupOnHide: i,
            popupClassName: a,
            popupAnimation: l,
            popupTransitionName: s,
            popupStyle: c,
            mask: d,
            maskAnimation: u,
            maskTransitionName: m,
            zIndex: p,
            stretch: v,
            alignPoint: h,
            mobile: C,
            arrow: $,
            forceRender: g
          } = this.$props,
          { sPopupVisible: T, point: z } = this.$data,
          P = f(
            f(
              {
                prefixCls: r,
                arrow: $,
                destroyPopupOnHide: i,
                visible: T,
                point: h ? z : null,
                align: this.align,
                animation: l,
                getClassNameFromAlign: t,
                stretch: v,
                getRootDomNode: n,
                mask: d,
                zIndex: p,
                transitionName: s,
                maskAnimation: u,
                maskTransitionName: m,
                class: a,
                style: c,
                onAlign: o.onPopupAlign || Ti
              },
              e
            ),
            { ref: this.setPopupRef, mobile: C, forceRender: g }
          )
        return y(Id, P, {
          default: this.$slots.popup || (() => Va(this, 'popup'))
        })
      },
      attachParent(e) {
        le.cancel(this.attachId)
        const { getPopupContainer: t, getDocument: n } = this.$props,
          o = this.getRootDomNode()
        let r
        t
          ? (o || t.length === 0) && (r = t(o))
          : (r = n(this.getRootDomNode()).body),
          r
            ? r.appendChild(e)
            : (this.attachId = le(() => {
                this.attachParent(e)
              }))
      },
      getContainer() {
        const { $props: e } = this,
          { getDocument: t } = e,
          n = t(this.getRootDomNode()).createElement('div')
        return (
          (n.style.position = 'absolute'),
          (n.style.top = '0'),
          (n.style.left = '0'),
          (n.style.width = '100%'),
          this.attachParent(n),
          n
        )
      },
      setPopupVisible(e, t) {
        const {
          alignPoint: n,
          sPopupVisible: o,
          onPopupVisibleChange: r
        } = this
        this.clearDelayTimer(),
          o !== e &&
            (Ka(this, 'popupVisible') ||
              this.setState({ sPopupVisible: e, prevPopupVisible: o }),
            r && r(e)),
          n && t && e && this.setPoint(t)
      },
      setPoint(e) {
        const { alignPoint: t } = this.$props
        !t || !e || this.setState({ point: { pageX: e.pageX, pageY: e.pageY } })
      },
      handlePortalUpdate() {
        this.prevPopupVisible !== this.sPopupVisible &&
          this.afterPopupVisibleChange(this.sPopupVisible)
      },
      delaySetPopupVisible(e, t, n) {
        const o = t * 1e3
        if ((this.clearDelayTimer(), o)) {
          const r = n ? { pageX: n.pageX, pageY: n.pageY } : null
          this.delayTimer = setTimeout(() => {
            this.setPopupVisible(e, r), this.clearDelayTimer()
          }, o)
        } else this.setPopupVisible(e, n)
      },
      clearDelayTimer() {
        this.delayTimer &&
          (clearTimeout(this.delayTimer), (this.delayTimer = null))
      },
      clearOutsideHandler() {
        this.clickOutsideHandler &&
          (this.clickOutsideHandler.remove(),
          (this.clickOutsideHandler = null)),
          this.contextmenuOutsideHandler1 &&
            (this.contextmenuOutsideHandler1.remove(),
            (this.contextmenuOutsideHandler1 = null)),
          this.contextmenuOutsideHandler2 &&
            (this.contextmenuOutsideHandler2.remove(),
            (this.contextmenuOutsideHandler2 = null)),
          this.touchOutsideHandler &&
            (this.touchOutsideHandler.remove(),
            (this.touchOutsideHandler = null))
      },
      createTwoChains(e) {
        let t = () => {}
        const n = Bo(this)
        return this.childOriginEvents[e] && n[e]
          ? this[`fire${e}`]
          : ((t = this.childOriginEvents[e] || n[e] || t), t)
      },
      isClickToShow() {
        const { action: e, showAction: t } = this.$props
        return e.indexOf('click') !== -1 || t.indexOf('click') !== -1
      },
      isContextMenuOnly() {
        const { action: e } = this.$props
        return e === 'contextmenu' || (e.length === 1 && e[0] === 'contextmenu')
      },
      isContextmenuToShow() {
        const { action: e, showAction: t } = this.$props
        return (
          e.indexOf('contextmenu') !== -1 || t.indexOf('contextmenu') !== -1
        )
      },
      isClickToHide() {
        const { action: e, hideAction: t } = this.$props
        return e.indexOf('click') !== -1 || t.indexOf('click') !== -1
      },
      isMouseEnterToShow() {
        const { action: e, showAction: t } = this.$props
        return e.indexOf('hover') !== -1 || t.indexOf('mouseenter') !== -1
      },
      isMouseLeaveToHide() {
        const { action: e, hideAction: t } = this.$props
        return e.indexOf('hover') !== -1 || t.indexOf('mouseleave') !== -1
      },
      isFocusToShow() {
        const { action: e, showAction: t } = this.$props
        return e.indexOf('focus') !== -1 || t.indexOf('focus') !== -1
      },
      isBlurToHide() {
        const { action: e, hideAction: t } = this.$props
        return e.indexOf('focus') !== -1 || t.indexOf('blur') !== -1
      },
      forcePopupAlign() {
        var e
        this.$data.sPopupVisible &&
          ((e = this.popupRef) === null || e === void 0 || e.forceAlign())
      },
      fireEvents(e, t) {
        this.childOriginEvents[e] && this.childOriginEvents[e](t)
        const n = this.$props[e] || this.$attrs[e]
        n && n(t)
      },
      close() {
        this.setPopupVisible(!1)
      }
    },
    render() {
      const { $attrs: e } = this,
        t = dt(Ua(this)),
        { alignPoint: n, getPopupContainer: o } = this.$props,
        r = t[0]
      this.childOriginEvents = Bo(r)
      const i = { key: 'trigger' }
      this.isContextmenuToShow()
        ? (i.onContextmenu = this.onContextmenu)
        : (i.onContextmenu = this.createTwoChains('onContextmenu')),
        this.isClickToHide() || this.isClickToShow()
          ? ((i.onClick = this.onClick),
            (i.onMousedown = this.onMousedown),
            (i[
              tt ? 'onTouchstartPassive' : 'onTouchstart'
            ] = this.onTouchstart))
          : ((i.onClick = this.createTwoChains('onClick')),
            (i.onMousedown = this.createTwoChains('onMousedown')),
            (i[
              tt ? 'onTouchstartPassive' : 'onTouchstart'
            ] = this.createTwoChains('onTouchstart'))),
        this.isMouseEnterToShow()
          ? ((i.onMouseenter = this.onMouseenter),
            n && (i.onMousemove = this.onMouseMove))
          : (i.onMouseenter = this.createTwoChains('onMouseenter')),
        this.isMouseLeaveToHide()
          ? (i.onMouseleave = this.onMouseleave)
          : (i.onMouseleave = this.createTwoChains('onMouseleave')),
        this.isFocusToShow() || this.isBlurToHide()
          ? ((i.onFocus = this.onFocus), (i.onBlur = this.onBlur))
          : ((i.onFocus = this.createTwoChains('onFocus')),
            (i.onBlur = c => {
              c &&
                (!c.relatedTarget || !et(c.target, c.relatedTarget)) &&
                this.createTwoChains('onBlur')(c)
            }))
      const a = oe(r && r.props && r.props.class, e.class)
      a && (i.class = a)
      const l = Se(r, f(f({}, i), { ref: 'triggerRef' }), !0, !0),
        s = y(
          Dd,
          {
            key: 'portal',
            getContainer: o && (() => o(this.getRootDomNode())),
            didUpdate: this.handlePortalUpdate,
            visible: this.$data.sPopupVisible
          },
          { default: this.getComponent }
        )
      return y(Ge, null, [l, s])
    }
  }),
  L = {
    MAC_ENTER: 3,
    BACKSPACE: 8,
    TAB: 9,
    NUM_CENTER: 12,
    ENTER: 13,
    SHIFT: 16,
    CTRL: 17,
    ALT: 18,
    PAUSE: 19,
    CAPS_LOCK: 20,
    ESC: 27,
    SPACE: 32,
    PAGE_UP: 33,
    PAGE_DOWN: 34,
    END: 35,
    HOME: 36,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    PRINT_SCREEN: 44,
    INSERT: 45,
    DELETE: 46,
    ZERO: 48,
    ONE: 49,
    TWO: 50,
    THREE: 51,
    FOUR: 52,
    FIVE: 53,
    SIX: 54,
    SEVEN: 55,
    EIGHT: 56,
    NINE: 57,
    QUESTION_MARK: 63,
    A: 65,
    B: 66,
    C: 67,
    D: 68,
    E: 69,
    F: 70,
    G: 71,
    H: 72,
    I: 73,
    J: 74,
    K: 75,
    L: 76,
    M: 77,
    N: 78,
    O: 79,
    P: 80,
    Q: 81,
    R: 82,
    S: 83,
    T: 84,
    U: 85,
    V: 86,
    W: 87,
    X: 88,
    Y: 89,
    Z: 90,
    META: 91,
    WIN_KEY_RIGHT: 92,
    CONTEXT_MENU: 93,
    NUM_ZERO: 96,
    NUM_ONE: 97,
    NUM_TWO: 98,
    NUM_THREE: 99,
    NUM_FOUR: 100,
    NUM_FIVE: 101,
    NUM_SIX: 102,
    NUM_SEVEN: 103,
    NUM_EIGHT: 104,
    NUM_NINE: 105,
    NUM_MULTIPLY: 106,
    NUM_PLUS: 107,
    NUM_MINUS: 109,
    NUM_PERIOD: 110,
    NUM_DIVISION: 111,
    F1: 112,
    F2: 113,
    F3: 114,
    F4: 115,
    F5: 116,
    F6: 117,
    F7: 118,
    F8: 119,
    F9: 120,
    F10: 121,
    F11: 122,
    F12: 123,
    NUMLOCK: 144,
    SEMICOLON: 186,
    DASH: 189,
    EQUALS: 187,
    COMMA: 188,
    PERIOD: 190,
    SLASH: 191,
    APOSTROPHE: 192,
    SINGLE_QUOTE: 222,
    OPEN_SQUARE_BRACKET: 219,
    BACKSLASH: 220,
    CLOSE_SQUARE_BRACKET: 221,
    WIN_KEY: 224,
    MAC_FF_META: 224,
    WIN_IME: 229,
    isTextModifyingKeyEvent: function(t) {
      const { keyCode: n } = t
      if ((t.altKey && !t.ctrlKey) || t.metaKey || (n >= L.F1 && n <= L.F12))
        return !1
      switch (n) {
        case L.ALT:
        case L.CAPS_LOCK:
        case L.CONTEXT_MENU:
        case L.CTRL:
        case L.DOWN:
        case L.END:
        case L.ESC:
        case L.HOME:
        case L.INSERT:
        case L.LEFT:
        case L.MAC_FF_META:
        case L.META:
        case L.NUMLOCK:
        case L.NUM_CENTER:
        case L.PAGE_DOWN:
        case L.PAGE_UP:
        case L.PAUSE:
        case L.PRINT_SCREEN:
        case L.RIGHT:
        case L.SHIFT:
        case L.UP:
        case L.WIN_KEY:
        case L.WIN_KEY_RIGHT:
          return !1
        default:
          return !0
      }
    },
    isCharacterKey: function(t) {
      if (
        (t >= L.ZERO && t <= L.NINE) ||
        (t >= L.NUM_ZERO && t <= L.NUM_MULTIPLY) ||
        (t >= L.A && t <= L.Z) ||
        (window.navigator.userAgent.indexOf('WebKit') !== -1 && t === 0)
      )
        return !0
      switch (t) {
        case L.SPACE:
        case L.QUESTION_MARK:
        case L.NUM_PLUS:
        case L.NUM_MINUS:
        case L.NUM_PERIOD:
        case L.NUM_DIVISION:
        case L.SEMICOLON:
        case L.DASH:
        case L.EQUALS:
        case L.COMMA:
        case L.PERIOD:
        case L.SLASH:
        case L.APOSTROPHE:
        case L.SINGLE_QUOTE:
        case L.OPEN_SQUARE_BRACKET:
        case L.BACKSLASH:
        case L.CLOSE_SQUARE_BRACKET:
          return !0
        default:
          return !1
      }
    }
  },
  zd = L
var Nd =
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
const Hd = X({
    compatConfig: { MODE: 3 },
    props: {
      disabled: I.looseBool,
      type: I.string,
      value: I.any,
      tag: { type: String, default: 'input' },
      size: I.string,
      onChange: Function,
      onInput: Function,
      onBlur: Function,
      onFocus: Function,
      onKeydown: Function,
      onCompositionstart: Function,
      onCompositionend: Function,
      onKeyup: Function,
      onPaste: Function,
      onMousedown: Function
    },
    emits: [
      'change',
      'input',
      'blur',
      'keydown',
      'focus',
      'compositionstart',
      'compositionend',
      'keyup',
      'paste',
      'mousedown'
    ],
    setup(e, t) {
      let { expose: n } = t
      const o = N(null)
      return (
        n({
          focus: () => {
            o.value && o.value.focus()
          },
          blur: () => {
            o.value && o.value.blur()
          },
          input: o,
          setSelectionRange: (s, c, d) => {
            var u
            ;(u = o.value) === null ||
              u === void 0 ||
              u.setSelectionRange(s, c, d)
          },
          select: () => {
            var s
            ;(s = o.value) === null || s === void 0 || s.select()
          },
          getSelectionStart: () => {
            var s
            return (s = o.value) === null || s === void 0
              ? void 0
              : s.selectionStart
          },
          getSelectionEnd: () => {
            var s
            return (s = o.value) === null || s === void 0
              ? void 0
              : s.selectionEnd
          },
          getScrollTop: () => {
            var s
            return (s = o.value) === null || s === void 0 ? void 0 : s.scrollTop
          }
        }),
        () => {
          const { tag: s, value: c } = e,
            d = Nd(e, ['tag', 'value'])
          return y(s, M(M({}, d), {}, { ref: o, value: c }), null)
        }
      )
    }
  }),
  Fd = Hd
function Cv() {
  const e = document.documentElement.clientWidth,
    t = window.innerHeight || document.documentElement.clientHeight
  return { width: e, height: t }
}
function xv(e) {
  const t = e.getBoundingClientRect(),
    n = document.documentElement
  return {
    left:
      t.left +
      (window.scrollX || n.scrollLeft) -
      (n.clientLeft || document.body.clientLeft || 0),
    top:
      t.top +
      (window.scrollY || n.scrollTop) -
      (n.clientTop || document.body.clientTop || 0)
  }
}
function Ov(e) {
  return Array.prototype.slice
    .apply(e)
    .map(n => `${n}: ${e.getPropertyValue(n)};`)
    .join('')
}
function Ld(e) {
  return Object.keys(e).reduce((t, n) => {
    const o = e[n]
    return typeof o > 'u' || o === null || (t += `${n}: ${e[n]};`), t
  }, '')
}
var jd =
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
const Wd = X({
    compatConfig: { MODE: 3 },
    inheritAttrs: !1,
    props: {
      disabled: I.looseBool,
      type: I.string,
      value: I.any,
      lazy: I.bool.def(!0),
      tag: { type: String, default: 'input' },
      size: I.string,
      style: I.oneOfType([String, Object]),
      class: I.string
    },
    emits: [
      'change',
      'input',
      'blur',
      'keydown',
      'focus',
      'compositionstart',
      'compositionend',
      'keyup',
      'paste',
      'mousedown'
    ],
    setup(e, t) {
      let { emit: n, attrs: o, expose: r } = t
      const i = N(null),
        a = j(),
        l = j(!1)
      J(
        [() => e.value, l],
        () => {
          l.value || (a.value = e.value)
        },
        { immediate: !0 }
      )
      const s = b => {
          n('change', b)
        },
        c = b => {
          ;(l.value = !0), (b.target.composing = !0), n('compositionstart', b)
        },
        d = b => {
          ;(l.value = !1), (b.target.composing = !1), n('compositionend', b)
          const A = document.createEvent('HTMLEvents')
          A.initEvent('input', !0, !0), b.target.dispatchEvent(A), s(b)
        },
        u = b => {
          if (l.value && e.lazy) {
            a.value = b.target.value
            return
          }
          n('input', b)
        },
        m = b => {
          n('blur', b)
        },
        p = b => {
          n('focus', b)
        },
        v = () => {
          i.value && i.value.focus()
        },
        h = () => {
          i.value && i.value.blur()
        },
        C = b => {
          n('keydown', b)
        },
        $ = b => {
          n('keyup', b)
        },
        g = (b, A, F) => {
          var O
          ;(O = i.value) === null ||
            O === void 0 ||
            O.setSelectionRange(b, A, F)
        },
        T = () => {
          var b
          ;(b = i.value) === null || b === void 0 || b.select()
        }
      r({
        focus: v,
        blur: h,
        input: S(() => {
          var b
          return (b = i.value) === null || b === void 0 ? void 0 : b.input
        }),
        setSelectionRange: g,
        select: T,
        getSelectionStart: () => {
          var b
          return (b = i.value) === null || b === void 0
            ? void 0
            : b.getSelectionStart()
        },
        getSelectionEnd: () => {
          var b
          return (b = i.value) === null || b === void 0
            ? void 0
            : b.getSelectionEnd()
        },
        getScrollTop: () => {
          var b
          return (b = i.value) === null || b === void 0
            ? void 0
            : b.getScrollTop()
        }
      })
      const z = b => {
          n('mousedown', b)
        },
        P = b => {
          n('paste', b)
        },
        x = S(() =>
          e.style && typeof e.style != 'string' ? Ld(e.style) : e.style
        )
      return () => {
        const b = jd(e, ['style', 'lazy'])
        return y(
          Fd,
          M(
            M(M({}, b), o),
            {},
            {
              style: x.value,
              onInput: u,
              onChange: s,
              onBlur: m,
              onFocus: p,
              ref: i,
              value: a.value,
              onCompositionstart: c,
              onCompositionend: d,
              onKeyup: $,
              onKeydown: C,
              onPaste: P,
              onMousedown: z
            }
          ),
          null
        )
      }
    }
  }),
  Vd = Wd,
  Kd = `accept acceptcharset accesskey action allowfullscreen allowtransparency
alt async autocomplete autofocus autoplay capture cellpadding cellspacing challenge
charset checked classid classname colspan cols content contenteditable contextmenu
controls coords crossorigin data datetime default defer dir disabled download draggable
enctype form formaction formenctype formmethod formnovalidate formtarget frameborder
headers height hidden high href hreflang htmlfor for httpequiv icon id inputmode integrity
is keyparams keytype kind label lang list loop low manifest marginheight marginwidth max maxlength media
mediagroup method min minlength multiple muted name novalidate nonce open
optimum pattern placeholder poster preload radiogroup readonly rel required
reversed role rowspan rows sandbox scope scoped scrolling seamless selected
shape size sizes span spellcheck src srcdoc srclang srcset start step style
summary tabindex target title type usemap value width wmode wrap`,
  Ud = `onCopy onCut onPaste onCompositionend onCompositionstart onCompositionupdate onKeydown
    onKeypress onKeyup onFocus onBlur onChange onInput onSubmit onClick onContextmenu onDoubleclick onDblclick
    onDrag onDragend onDragenter onDragexit onDragleave onDragover onDragstart onDrop onMousedown
    onMouseenter onMouseleave onMousemove onMouseout onMouseover onMouseup onSelect onTouchcancel
    onTouchend onTouchmove onTouchstart onTouchstartPassive onTouchmovePassive onScroll onWheel onAbort onCanplay onCanplaythrough
    onDurationchange onEmptied onEncrypted onEnded onError onLoadeddata onLoadedmetadata
    onLoadstart onPause onPlay onPlaying onProgress onRatechange onSeeked onSeeking onStalled onSuspend onTimeupdate onVolumechange onWaiting onLoad onError`,
  _r = `${Kd} ${Ud}`.split(/[\s\n]+/),
  Gd = 'aria-',
  Xd = 'data-'
function Ar(e, t) {
  return e.indexOf(t) === 0
}
function Tv(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1,
    n
  t === !1
    ? (n = { aria: !0, data: !0, attr: !0 })
    : t === !0
    ? (n = { aria: !0 })
    : (n = f({}, t))
  const o = {}
  return (
    Object.keys(e).forEach(r => {
      ;((n.aria && (r === 'role' || Ar(r, Gd))) ||
        (n.data && Ar(r, Xd)) ||
        (n.attr && (_r.includes(r) || _r.includes(r.toLowerCase())))) &&
        (o[r] = e[r])
    }),
    o
  )
}
const ta = Symbol('OverflowContextProviderKey'),
  qn = X({
    compatConfig: { MODE: 3 },
    name: 'OverflowContextProvider',
    inheritAttrs: !1,
    props: { value: { type: Object } },
    setup(e, t) {
      let { slots: n } = t
      return (
        pe(
          ta,
          S(() => e.value)
        ),
        () => {
          var o
          return (o = n.default) === null || o === void 0 ? void 0 : o.call(n)
        }
      )
    }
  }),
  Yd = () =>
    we(
      ta,
      S(() => null)
    )
var qd =
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
const Ze = void 0,
  Ut = X({
    compatConfig: { MODE: 3 },
    name: 'Item',
    props: {
      prefixCls: String,
      item: I.any,
      renderItem: Function,
      responsive: Boolean,
      itemKey: { type: [String, Number] },
      registerSize: Function,
      display: Boolean,
      order: Number,
      component: I.any,
      invalidate: Boolean
    },
    setup(e, t) {
      let { slots: n, expose: o } = t
      const r = S(() => e.responsive && !e.display),
        i = j()
      o({ itemNodeRef: i })
      function a(l) {
        e.registerSize(e.itemKey, l)
      }
      return (
        ao(() => {
          a(null)
        }),
        () => {
          var l
          const {
              prefixCls: s,
              invalidate: c,
              item: d,
              renderItem: u,
              responsive: m,
              registerSize: p,
              itemKey: v,
              display: h,
              order: C,
              component: $ = 'div'
            } = e,
            g = qd(e, [
              'prefixCls',
              'invalidate',
              'item',
              'renderItem',
              'responsive',
              'registerSize',
              'itemKey',
              'display',
              'order',
              'component'
            ]),
            T = (l = n.default) === null || l === void 0 ? void 0 : l.call(n),
            z = u && d !== Ze ? u(d) : T
          let P
          c ||
            (P = {
              opacity: r.value ? 0 : 1,
              height: r.value ? 0 : Ze,
              overflowY: r.value ? 'hidden' : Ze,
              order: m ? C : Ze,
              pointerEvents: r.value ? 'none' : Ze,
              position: r.value ? 'absolute' : Ze
            })
          const x = {}
          return (
            r.value && (x['aria-hidden'] = !0),
            y(
              so,
              {
                disabled: !m,
                onResize: b => {
                  let { offsetWidth: A } = b
                  a(A)
                }
              },
              {
                default: () =>
                  y(
                    $,
                    M(
                      M(M({ class: oe(!c && s), style: P }, x), g),
                      {},
                      { ref: i }
                    ),
                    { default: () => [z] }
                  )
              }
            )
          )
        }
      )
    }
  })
var En =
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
const kd = X({
  compatConfig: { MODE: 3 },
  name: 'RawItem',
  inheritAttrs: !1,
  props: {
    component: I.any,
    title: I.any,
    id: String,
    onMouseenter: { type: Function },
    onMouseleave: { type: Function },
    onClick: { type: Function },
    onKeydown: { type: Function },
    onFocus: { type: Function },
    role: String,
    tabindex: Number
  },
  setup(e, t) {
    let { slots: n, attrs: o } = t
    const r = Yd()
    return () => {
      var i
      if (!r.value) {
        const { component: u = 'div' } = e,
          m = En(e, ['component'])
        return y(u, M(M({}, m), o), {
          default: () => [
            (i = n.default) === null || i === void 0 ? void 0 : i.call(n)
          ]
        })
      }
      const a = r.value,
        { className: l } = a,
        s = En(a, ['className']),
        { class: c } = o,
        d = En(o, ['class'])
      return y(
        qn,
        { value: null },
        { default: () => [y(Ut, M(M(M({ class: oe(l, c) }, s), d), e), n)] }
      )
    }
  }
})
var Zd =
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
const na = 'responsive',
  oa = 'invalidate'
function Qd(e) {
  return `+ ${e.length} ...`
}
const Jd = () => ({
    id: String,
    prefixCls: String,
    data: Array,
    itemKey: [String, Number, Function],
    itemWidth: { type: Number, default: 10 },
    renderItem: Function,
    renderRawItem: Function,
    maxCount: [Number, String],
    renderRest: Function,
    renderRawRest: Function,
    suffix: I.any,
    component: String,
    itemComponent: I.any,
    onVisibleChange: Function,
    ssr: String,
    onMousedown: Function,
    role: String
  }),
  gn = X({
    name: 'Overflow',
    inheritAttrs: !1,
    props: Jd(),
    emits: ['visibleChange'],
    setup(e, t) {
      let { attrs: n, emit: o, slots: r } = t
      const i = S(() => e.ssr === 'full'),
        a = N(null),
        l = S(() => a.value || 0),
        s = N(new Map()),
        c = N(0),
        d = N(0),
        u = N(0),
        m = N(null),
        p = N(null),
        v = S(() =>
          p.value === null && i.value ? Number.MAX_SAFE_INTEGER : p.value || 0
        ),
        h = N(!1),
        C = S(() => `${e.prefixCls}-item`),
        $ = S(() => Math.max(c.value, d.value)),
        g = S(() => !!(e.data.length && e.maxCount === na)),
        T = S(() => e.maxCount === oa),
        z = S(
          () =>
            g.value ||
            (typeof e.maxCount == 'number' && e.data.length > e.maxCount)
        ),
        P = S(() => {
          let w = e.data
          return (
            g.value
              ? a.value === null && i.value
                ? (w = e.data)
                : (w = e.data.slice(
                    0,
                    Math.min(e.data.length, l.value / e.itemWidth)
                  ))
              : typeof e.maxCount == 'number' &&
                (w = e.data.slice(0, e.maxCount)),
            w
          )
        }),
        x = S(() =>
          g.value ? e.data.slice(v.value + 1) : e.data.slice(P.value.length)
        ),
        b = (w, B) => {
          var V
          return typeof e.itemKey == 'function'
            ? e.itemKey(w)
            : (V = e.itemKey && (w == null ? void 0 : w[e.itemKey])) !== null &&
              V !== void 0
            ? V
            : B
        },
        A = S(() => e.renderItem || (w => w)),
        F = (w, B) => {
          ;(p.value = w),
            B || ((h.value = w < e.data.length - 1), o('visibleChange', w))
        },
        O = (w, B) => {
          a.value = B.clientWidth
        },
        R = (w, B) => {
          const V = new Map(s.value)
          B === null ? V.delete(w) : V.set(w, B), (s.value = V)
        },
        U = (w, B) => {
          ;(c.value = d.value), (d.value = B)
        },
        G = (w, B) => {
          u.value = B
        },
        Q = w => s.value.get(b(P.value[w], w))
      return (
        J([l, s, d, u, () => e.itemKey, P], () => {
          if (l.value && $.value && P.value) {
            let w = u.value
            const B = P.value.length,
              V = B - 1
            if (!B) {
              F(0), (m.value = null)
              return
            }
            for (let Y = 0; Y < B; Y += 1) {
              const _ = Q(Y)
              if (_ === void 0) {
                F(Y - 1, !0)
                break
              }
              if (
                ((w += _),
                (V === 0 && w <= l.value) ||
                  (Y === V - 1 && w + Q(V) <= l.value))
              ) {
                F(V), (m.value = null)
                break
              } else if (w + $.value > l.value) {
                F(Y - 1), (m.value = w - _ - u.value + d.value)
                break
              }
            }
            e.suffix && Q(0) + u.value > l.value && (m.value = null)
          }
        }),
        () => {
          const w = h.value && !!x.value.length,
            {
              itemComponent: B,
              renderRawItem: V,
              renderRawRest: Y,
              renderRest: _,
              prefixCls: H = 'rc-overflow',
              suffix: D,
              component: q = 'div',
              id: Z,
              onMousedown: fe
            } = e,
            { class: de, style: ue } = n,
            E = Zd(n, ['class', 'style'])
          let W = {}
          m.value !== null &&
            g.value &&
            (W = { position: 'absolute', left: `${m.value}px`, top: 0 })
          const k = {
              prefixCls: C.value,
              responsive: g.value,
              component: B,
              invalidate: T.value
            },
            re = V
              ? (ae, ge) => {
                  const Fe = b(ae, ge)
                  return y(
                    qn,
                    {
                      key: Fe,
                      value: f(f({}, k), {
                        order: ge,
                        item: ae,
                        itemKey: Fe,
                        registerSize: R,
                        display: ge <= v.value
                      })
                    },
                    { default: () => [V(ae, ge)] }
                  )
                }
              : (ae, ge) => {
                  const Fe = b(ae, ge)
                  return y(
                    Ut,
                    M(
                      M({}, k),
                      {},
                      {
                        order: ge,
                        key: Fe,
                        item: ae,
                        renderItem: A.value,
                        itemKey: Fe,
                        registerSize: R,
                        display: ge <= v.value
                      }
                    ),
                    null
                  )
                }
          let ie = () => null
          const te = {
            order: w ? v.value : Number.MAX_SAFE_INTEGER,
            className: `${C.value} ${C.value}-rest`,
            registerSize: U,
            display: w
          }
          if (Y)
            Y &&
              (ie = () =>
                y(
                  qn,
                  { value: f(f({}, k), te) },
                  { default: () => [Y(x.value)] }
                ))
          else {
            const ae = _ || Qd
            ie = () =>
              y(Ut, M(M({}, k), te), {
                default: () => (typeof ae == 'function' ? ae(x.value) : ae)
              })
          }
          const me = () => {
            var ae
            return y(
              q,
              M(
                {
                  id: Z,
                  class: oe(!T.value && H, de),
                  style: ue,
                  onMousedown: fe,
                  role: e.role
                },
                E
              ),
              {
                default: () => [
                  P.value.map(re),
                  z.value ? ie() : null,
                  D &&
                    y(
                      Ut,
                      M(
                        M({}, k),
                        {},
                        {
                          order: v.value,
                          class: `${C.value}-suffix`,
                          registerSize: G,
                          display: !0,
                          style: W
                        }
                      ),
                      { default: () => D }
                    ),
                  (ae = r.default) === null || ae === void 0
                    ? void 0
                    : ae.call(r)
                ]
              }
            )
          }
          return y(so, { disabled: !g.value, onResize: O }, { default: me })
        }
      )
    }
  })
gn.Item = kd
gn.RESPONSIVE = na
gn.INVALIDATE = oa
const xt = gn,
  Iv = () => {
    if (typeof navigator > 'u' || typeof window > 'u') return !1
    const e = navigator.userAgent || navigator.vendor || window.opera
    return (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
        e
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(
        e == null ? void 0 : e.substring(0, 4)
      )
    )
  }
function Ev(e, t) {
  const { defaultValue: n, value: o = j() } = t || {}
  let r = typeof e == 'function' ? e() : e
  o.value !== void 0 && (r = $t(o)),
    n !== void 0 && (r = typeof n == 'function' ? n() : n)
  const i = j(r),
    a = j(r)
  Oe(() => {
    let s = o.value !== void 0 ? o.value : i.value
    t.postState && (s = t.postState(s)), (a.value = s)
  })
  function l(s) {
    const c = a.value
    ;(i.value = s), Fn(a.value) !== s && t.onChange && t.onChange(s, c)
  }
  return (
    J(o, () => {
      i.value = o.value
    }),
    [a, l]
  )
}
function Ve(e) {
  const t = typeof e == 'function' ? e() : e,
    n = j(t)
  function o(r) {
    n.value = r
  }
  return [n, o]
}
function Mr(e) {
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
        ef(e, r, n[r])
      })
  }
  return e
}
function ef(e, t, n) {
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
var $o = function(t, n) {
  var o = Mr({}, t, n.attrs)
  return y(Rt, Mr({}, o, { icon: fl }), null)
}
$o.displayName = 'CheckOutlined'
$o.inheritAttrs = !1
const Pv = $o
function wo(e) {
  const t = Symbol('contextKey')
  return {
    useProvide: (r, i) => {
      const a = io({})
      return (
        pe(t, a),
        Oe(() => {
          f(a, r, i || {})
        }),
        a
      )
    },
    useInject: () => we(t, e) || {}
  }
}
const tn = Symbol('ContextProps'),
  nn = Symbol('InternalContextProps'),
  _v = function(e) {
    let t =
      arguments.length > 1 && arguments[1] !== void 0
        ? arguments[1]
        : S(() => !0)
    const n = j(new Map()),
      o = (i, a) => {
        n.value.set(i, a), (n.value = new Map(n.value))
      },
      r = i => {
        n.value.delete(i), (n.value = new Map(n.value))
      }
    Ee(),
      J([t, n], () => {}),
      pe(tn, e),
      pe(nn, { addFormItemField: o, removeFormItemField: r })
  },
  kn = {
    id: S(() => {}),
    onFieldBlur: () => {},
    onFieldChange: () => {},
    clearValidate: () => {}
  },
  Zn = { addFormItemField: () => {}, removeFormItemField: () => {} },
  tf = () => {
    const e = we(nn, Zn),
      t = Symbol('FormItemFieldKey'),
      n = Ee()
    return (
      e.addFormItemField(t, n.type),
      ve(() => {
        e.removeFormItemField(t)
      }),
      pe(nn, Zn),
      pe(tn, kn),
      we(tn, kn)
    )
  },
  Av = X({
    compatConfig: { MODE: 3 },
    name: 'AFormItemRest',
    setup(e, t) {
      let { slots: n } = t
      return (
        pe(nn, Zn),
        pe(tn, kn),
        () => {
          var o
          return (o = n.default) === null || o === void 0 ? void 0 : o.call(n)
        }
      )
    }
  }),
  So = wo({}),
  Mv = X({
    name: 'NoFormStatus',
    setup(e, t) {
      let { slots: n } = t
      return (
        So.useProvide({}),
        () => {
          var o
          return (o = n.default) === null || o === void 0 ? void 0 : o.call(n)
        }
      )
    }
  })
function ra(e, t, n) {
  return oe({
    [`${e}-status-success`]: t === 'success',
    [`${e}-status-warning`]: t === 'warning',
    [`${e}-status-error`]: t === 'error',
    [`${e}-status-validating`]: t === 'validating',
    [`${e}-has-feedback`]: n
  })
}
const ia = (e, t) => t || e,
  nf = e => {
    const { componentCls: t } = e
    return {
      [t]: {
        display: 'inline-flex',
        '&-block': { display: 'flex', width: '100%' },
        '&-vertical': { flexDirection: 'column' }
      }
    }
  },
  of = nf,
  rf = e => {
    const { componentCls: t } = e
    return {
      [t]: {
        display: 'inline-flex',
        '&-rtl': { direction: 'rtl' },
        '&-vertical': { flexDirection: 'column' },
        '&-align': {
          flexDirection: 'column',
          '&-center': { alignItems: 'center' },
          '&-start': { alignItems: 'flex-start' },
          '&-end': { alignItems: 'flex-end' },
          '&-baseline': { alignItems: 'baseline' }
        },
        [`${t}-item`]: { '&:empty': { display: 'none' } }
      }
    }
  },
  aa = ft('Space', e => [rf(e), of(e)])
var af = '[object Symbol]'
function Rv(e) {
  return typeof e == 'symbol' || (ut(e) && mt(e) == af)
}
function lf() {}
function sf(e, t, n, o) {
  for (var r = e.length, i = n + (o ? 1 : -1); o ? i-- : ++i < r; )
    if (t(e[i], i, e)) return i
  return -1
}
function uf(e) {
  return e !== e
}
function cf(e, t, n) {
  for (var o = n - 1, r = e.length; ++o < r; ) if (e[o] === t) return o
  return -1
}
function df(e, t, n) {
  return t === t ? cf(e, t, n) : sf(e, uf, n)
}
function ff(e, t) {
  var n = e == null ? 0 : e.length
  return !!n && df(e, t, 0) > -1
}
function pf(e, t, n) {
  for (var o = -1, r = e == null ? 0 : e.length; ++o < r; )
    if (n(t, e[o])) return !0
  return !1
}
var mf = '[object Map]',
  vf = '[object Set]',
  gf = Object.prototype,
  hf = gf.hasOwnProperty
function la(e) {
  if (e == null) return !0
  if (
    Qi(e) &&
    (At(e) ||
      typeof e == 'string' ||
      typeof e.splice == 'function' ||
      en(e) ||
      bo(e) ||
      Gi(e))
  )
    return !e.length
  var t = Yn(e)
  if (t == mf || t == vf) return !e.size
  if (ki(e)) return !Zi(e).length
  for (var n in e) if (hf.call(e, n)) return !1
  return !0
}
var bf = 1 / 0,
  yf =
    ot && 1 / ho(new ot([, -0]))[1] == bf
      ? function(e) {
          return new ot(e)
        }
      : lf
const $f = yf
var wf = 200
function Sf(e, t, n) {
  var o = -1,
    r = ff,
    i = e.length,
    a = !0,
    l = [],
    s = l
  if (n) (a = !1), (r = pf)
  else if (i >= wf) {
    var c = t ? null : $f(e)
    if (c) return ho(c)
    ;(a = !1), (r = Vi), (s = new _t())
  } else s = t ? [] : l
  e: for (; ++o < i; ) {
    var d = e[o],
      u = t ? t(d) : d
    if (((d = n || d !== 0 ? d : 0), a && u === u)) {
      for (var m = s.length; m--; ) if (s[m] === u) continue e
      t && s.push(u), l.push(d)
    } else r(s, u, n) || (s !== l && s.push(u), l.push(d))
  }
  return l
}
function Pn(e) {
  return e && e.length ? Sf(e) : []
}
const Cf = () => ({
    compactSize: String,
    compactDirection: I.oneOf(it('horizontal', 'vertical')).def('horizontal'),
    isFirstItem: Xt(),
    isLastItem: Xt()
  }),
  hn = wo(null),
  xf = (e, t) => {
    const n = hn.useInject(),
      o = S(() => {
        if (!n || la(n)) return ''
        const { compactDirection: r, isFirstItem: i, isLastItem: a } = n,
          l = r === 'vertical' ? '-vertical-' : '-'
        return oe({
          [`${e.value}-compact${l}item`]: !0,
          [`${e.value}-compact${l}first-item`]: i,
          [`${e.value}-compact${l}last-item`]: a,
          [`${e.value}-compact${l}item-rtl`]: t.value === 'rtl'
        })
      })
    return {
      compactSize: S(() => (n == null ? void 0 : n.compactSize)),
      compactDirection: S(() => (n == null ? void 0 : n.compactDirection)),
      compactItemClassnames: o
    }
  },
  Dv = X({
    name: 'NoCompactStyle',
    setup(e, t) {
      let { slots: n } = t
      return (
        hn.useProvide(null),
        () => {
          var o
          return (o = n.default) === null || o === void 0 ? void 0 : o.call(n)
        }
      )
    }
  }),
  Of = () => ({
    prefixCls: String,
    size: { type: String },
    direction: I.oneOf(it('horizontal', 'vertical')).def('horizontal'),
    align: I.oneOf(it('start', 'end', 'center', 'baseline')),
    block: { type: Boolean, default: void 0 }
  }),
  Tf = X({
    name: 'CompactItem',
    props: Cf(),
    setup(e, t) {
      let { slots: n } = t
      return (
        hn.useProvide(e),
        () => {
          var o
          return (o = n.default) === null || o === void 0 ? void 0 : o.call(n)
        }
      )
    }
  }),
  Qn = X({
    name: 'ASpaceCompact',
    inheritAttrs: !1,
    props: Of(),
    setup(e, t) {
      let { attrs: n, slots: o } = t
      const { prefixCls: r, direction: i } = He('space-compact', e),
        a = hn.useInject(),
        [l, s] = aa(r),
        c = S(() =>
          oe(r.value, s.value, {
            [`${r.value}-rtl`]: i.value === 'rtl',
            [`${r.value}-block`]: e.block,
            [`${r.value}-vertical`]: e.direction === 'vertical'
          })
        )
      return () => {
        var d
        const u = Ye(
          ((d = o.default) === null || d === void 0 ? void 0 : d.call(o)) || []
        )
        return u.length === 0
          ? null
          : l(
              y('div', M(M({}, n), {}, { class: [c.value, n.class] }), [
                u.map((m, p) => {
                  var v
                  const h = (m && m.key) || `${r.value}-item-${p}`,
                    C = !a || la(a)
                  return y(
                    Tf,
                    {
                      key: h,
                      compactSize:
                        (v = e.size) !== null && v !== void 0 ? v : 'middle',
                      compactDirection: e.direction,
                      isFirstItem:
                        p === 0 && (C || (a == null ? void 0 : a.isFirstItem)),
                      isLastItem:
                        p === u.length - 1 &&
                        (C || (a == null ? void 0 : a.isLastItem))
                    },
                    { default: () => [m] }
                  )
                })
              ])
            )
      }
    }
  }),
  If = e => ({ animationDuration: e, animationFillMode: 'both' }),
  Ef = e => ({ animationDuration: e, animationFillMode: 'both' }),
  sa = function(e, t, n, o) {
    const i = (arguments.length > 4 && arguments[4] !== void 0
    ? arguments[4]
    : !1)
      ? '&'
      : ''
    return {
      [`
      ${i}${e}-enter,
      ${i}${e}-appear
    `]: f(f({}, If(o)), { animationPlayState: 'paused' }),
      [`${i}${e}-leave`]: f(f({}, Ef(o)), { animationPlayState: 'paused' }),
      [`
      ${i}${e}-enter${e}-enter-active,
      ${i}${e}-appear${e}-appear-active
    `]: { animationName: t, animationPlayState: 'running' },
      [`${i}${e}-leave${e}-leave-active`]: {
        animationName: n,
        animationPlayState: 'running',
        pointerEvents: 'none'
      }
    }
  },
  Pf = new se('antSlideUpIn', {
    '0%': { transform: 'scaleY(0.8)', transformOrigin: '0% 0%', opacity: 0 },
    '100%': { transform: 'scaleY(1)', transformOrigin: '0% 0%', opacity: 1 }
  }),
  _f = new se('antSlideUpOut', {
    '0%': { transform: 'scaleY(1)', transformOrigin: '0% 0%', opacity: 1 },
    '100%': { transform: 'scaleY(0.8)', transformOrigin: '0% 0%', opacity: 0 }
  }),
  Af = new se('antSlideDownIn', {
    '0%': {
      transform: 'scaleY(0.8)',
      transformOrigin: '100% 100%',
      opacity: 0
    },
    '100%': { transform: 'scaleY(1)', transformOrigin: '100% 100%', opacity: 1 }
  }),
  Mf = new se('antSlideDownOut', {
    '0%': { transform: 'scaleY(1)', transformOrigin: '100% 100%', opacity: 1 },
    '100%': {
      transform: 'scaleY(0.8)',
      transformOrigin: '100% 100%',
      opacity: 0
    }
  }),
  Rf = new se('antSlideLeftIn', {
    '0%': { transform: 'scaleX(0.8)', transformOrigin: '0% 0%', opacity: 0 },
    '100%': { transform: 'scaleX(1)', transformOrigin: '0% 0%', opacity: 1 }
  }),
  Df = new se('antSlideLeftOut', {
    '0%': { transform: 'scaleX(1)', transformOrigin: '0% 0%', opacity: 1 },
    '100%': { transform: 'scaleX(0.8)', transformOrigin: '0% 0%', opacity: 0 }
  }),
  Bf = new se('antSlideRightIn', {
    '0%': { transform: 'scaleX(0.8)', transformOrigin: '100% 0%', opacity: 0 },
    '100%': { transform: 'scaleX(1)', transformOrigin: '100% 0%', opacity: 1 }
  }),
  zf = new se('antSlideRightOut', {
    '0%': { transform: 'scaleX(1)', transformOrigin: '100% 0%', opacity: 1 },
    '100%': { transform: 'scaleX(0.8)', transformOrigin: '100% 0%', opacity: 0 }
  }),
  Nf = {
    'slide-up': { inKeyframes: Pf, outKeyframes: _f },
    'slide-down': { inKeyframes: Af, outKeyframes: Mf },
    'slide-left': { inKeyframes: Rf, outKeyframes: Df },
    'slide-right': { inKeyframes: Bf, outKeyframes: zf }
  },
  Rr = (e, t) => {
    const { antCls: n } = e,
      o = `${n}-${t}`,
      { inKeyframes: r, outKeyframes: i } = Nf[t]
    return [
      sa(o, r, i, e.motionDurationMid),
      {
        [`
      ${o}-enter,
      ${o}-appear
    `]: {
          transform: 'scale(0)',
          transformOrigin: '0% 0%',
          opacity: 0,
          animationTimingFunction: e.motionEaseOutQuint
        },
        [`${o}-leave`]: { animationTimingFunction: e.motionEaseInQuint }
      }
    ]
  },
  Hf = new se('antZoomIn', {
    '0%': { transform: 'scale(0.2)', opacity: 0 },
    '100%': { transform: 'scale(1)', opacity: 1 }
  }),
  Ff = new se('antZoomOut', {
    '0%': { transform: 'scale(1)' },
    '100%': { transform: 'scale(0.2)', opacity: 0 }
  }),
  Dr = new se('antZoomBigIn', {
    '0%': { transform: 'scale(0.8)', opacity: 0 },
    '100%': { transform: 'scale(1)', opacity: 1 }
  }),
  Br = new se('antZoomBigOut', {
    '0%': { transform: 'scale(1)' },
    '100%': { transform: 'scale(0.8)', opacity: 0 }
  }),
  Lf = new se('antZoomUpIn', {
    '0%': { transform: 'scale(0.8)', transformOrigin: '50% 0%', opacity: 0 },
    '100%': { transform: 'scale(1)', transformOrigin: '50% 0%' }
  }),
  jf = new se('antZoomUpOut', {
    '0%': { transform: 'scale(1)', transformOrigin: '50% 0%' },
    '100%': { transform: 'scale(0.8)', transformOrigin: '50% 0%', opacity: 0 }
  }),
  Wf = new se('antZoomLeftIn', {
    '0%': { transform: 'scale(0.8)', transformOrigin: '0% 50%', opacity: 0 },
    '100%': { transform: 'scale(1)', transformOrigin: '0% 50%' }
  }),
  Vf = new se('antZoomLeftOut', {
    '0%': { transform: 'scale(1)', transformOrigin: '0% 50%' },
    '100%': { transform: 'scale(0.8)', transformOrigin: '0% 50%', opacity: 0 }
  }),
  Kf = new se('antZoomRightIn', {
    '0%': { transform: 'scale(0.8)', transformOrigin: '100% 50%', opacity: 0 },
    '100%': { transform: 'scale(1)', transformOrigin: '100% 50%' }
  }),
  Uf = new se('antZoomRightOut', {
    '0%': { transform: 'scale(1)', transformOrigin: '100% 50%' },
    '100%': { transform: 'scale(0.8)', transformOrigin: '100% 50%', opacity: 0 }
  }),
  Gf = new se('antZoomDownIn', {
    '0%': { transform: 'scale(0.8)', transformOrigin: '50% 100%', opacity: 0 },
    '100%': { transform: 'scale(1)', transformOrigin: '50% 100%' }
  }),
  Xf = new se('antZoomDownOut', {
    '0%': { transform: 'scale(1)', transformOrigin: '50% 100%' },
    '100%': { transform: 'scale(0.8)', transformOrigin: '50% 100%', opacity: 0 }
  }),
  Yf = {
    zoom: { inKeyframes: Hf, outKeyframes: Ff },
    'zoom-big': { inKeyframes: Dr, outKeyframes: Br },
    'zoom-big-fast': { inKeyframes: Dr, outKeyframes: Br },
    'zoom-left': { inKeyframes: Wf, outKeyframes: Vf },
    'zoom-right': { inKeyframes: Kf, outKeyframes: Uf },
    'zoom-up': { inKeyframes: Lf, outKeyframes: jf },
    'zoom-down': { inKeyframes: Gf, outKeyframes: Xf }
  },
  ua = (e, t) => {
    const { antCls: n } = e,
      o = `${n}-${t}`,
      { inKeyframes: r, outKeyframes: i } = Yf[t]
    return [
      sa(
        o,
        r,
        i,
        t === 'zoom-big-fast' ? e.motionDurationFast : e.motionDurationMid
      ),
      {
        [`
        ${o}-enter,
        ${o}-appear
      `]: {
          transform: 'scale(0)',
          opacity: 0,
          animationTimingFunction: e.motionEaseOutCirc,
          '&-prepare': { transform: 'none' }
        },
        [`${o}-leave`]: { animationTimingFunction: e.motionEaseInOutCirc }
      }
    ]
  },
  qf = e => ({
    [e.componentCls]: {
      [`${e.antCls}-motion-collapse-legacy`]: {
        overflow: 'hidden',
        '&-active': {
          transition: `height ${e.motionDurationMid} ${e.motionEaseInOut},
        opacity ${e.motionDurationMid} ${e.motionEaseInOut} !important`
        }
      },
      [`${e.antCls}-motion-collapse`]: {
        overflow: 'hidden',
        transition: `height ${e.motionDurationMid} ${e.motionEaseInOut},
        opacity ${e.motionDurationMid} ${e.motionEaseInOut} !important`
      }
    }
  }),
  kf = qf
function Zf(e, t, n) {
  const { focusElCls: o, focus: r, borderElCls: i } = n,
    a = i ? '> *' : '',
    l = ['hover', r ? 'focus' : null, 'active']
      .filter(Boolean)
      .map(s => `&:${s} ${a}`)
      .join(',')
  return {
    [`&-item:not(${t}-last-item)`]: { marginInlineEnd: -e.lineWidth },
    '&-item': f(
      f({ [l]: { zIndex: 2 } }, o ? { [`&${o}`]: { zIndex: 2 } } : {}),
      { [`&[disabled] ${a}`]: { zIndex: 0 } }
    )
  }
}
function Qf(e, t, n) {
  const { borderElCls: o } = n,
    r = o ? `> ${o}` : ''
  return {
    [`&-item:not(${t}-first-item):not(${t}-last-item) ${r}`]: {
      borderRadius: 0
    },
    [`&-item:not(${t}-last-item)${t}-first-item`]: {
      [`& ${r}, &${e}-sm ${r}, &${e}-lg ${r}`]: {
        borderStartEndRadius: 0,
        borderEndEndRadius: 0
      }
    },
    [`&-item:not(${t}-first-item)${t}-last-item`]: {
      [`& ${r}, &${e}-sm ${r}, &${e}-lg ${r}`]: {
        borderStartStartRadius: 0,
        borderEndStartRadius: 0
      }
    }
  }
}
function ca(e) {
  let t =
    arguments.length > 1 && arguments[1] !== void 0
      ? arguments[1]
      : { focus: !0 }
  const { componentCls: n } = e,
    o = `${n}-compact`
  return { [o]: f(f({}, Zf(e, o, t)), Qf(n, o, t)) }
}
const be = { adjustX: 1, adjustY: 1 },
  ye = [0, 0],
  da = {
    left: {
      points: ['cr', 'cl'],
      overflow: be,
      offset: [-4, 0],
      targetOffset: ye
    },
    right: {
      points: ['cl', 'cr'],
      overflow: be,
      offset: [4, 0],
      targetOffset: ye
    },
    top: {
      points: ['bc', 'tc'],
      overflow: be,
      offset: [0, -4],
      targetOffset: ye
    },
    bottom: {
      points: ['tc', 'bc'],
      overflow: be,
      offset: [0, 4],
      targetOffset: ye
    },
    topLeft: {
      points: ['bl', 'tl'],
      overflow: be,
      offset: [0, -4],
      targetOffset: ye
    },
    leftTop: {
      points: ['tr', 'tl'],
      overflow: be,
      offset: [-4, 0],
      targetOffset: ye
    },
    topRight: {
      points: ['br', 'tr'],
      overflow: be,
      offset: [0, -4],
      targetOffset: ye
    },
    rightTop: {
      points: ['tl', 'tr'],
      overflow: be,
      offset: [4, 0],
      targetOffset: ye
    },
    bottomRight: {
      points: ['tr', 'br'],
      overflow: be,
      offset: [0, 4],
      targetOffset: ye
    },
    rightBottom: {
      points: ['bl', 'br'],
      overflow: be,
      offset: [4, 0],
      targetOffset: ye
    },
    bottomLeft: {
      points: ['tl', 'bl'],
      overflow: be,
      offset: [0, 4],
      targetOffset: ye
    },
    leftBottom: {
      points: ['br', 'bl'],
      overflow: be,
      offset: [-4, 0],
      targetOffset: ye
    }
  },
  Jf = { prefixCls: String, id: String, overlayInnerStyle: I.any },
  ep = X({
    compatConfig: { MODE: 3 },
    name: 'TooltipContent',
    props: Jf,
    setup(e, t) {
      let { slots: n } = t
      return () => {
        var o
        return y(
          'div',
          {
            class: `${e.prefixCls}-inner`,
            id: e.id,
            role: 'tooltip',
            style: e.overlayInnerStyle
          },
          [(o = n.overlay) === null || o === void 0 ? void 0 : o.call(n)]
        )
      }
    }
  })
var tp =
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
function zr() {}
const np = X({
    compatConfig: { MODE: 3 },
    name: 'Tooltip',
    inheritAttrs: !1,
    props: {
      trigger: I.any.def(['hover']),
      defaultVisible: { type: Boolean, default: void 0 },
      visible: { type: Boolean, default: void 0 },
      placement: I.string.def('right'),
      transitionName: String,
      animation: I.any,
      afterVisibleChange: I.func.def(() => {}),
      overlayStyle: { type: Object, default: void 0 },
      overlayClassName: String,
      prefixCls: I.string.def('rc-tooltip'),
      mouseEnterDelay: I.number.def(0.1),
      mouseLeaveDelay: I.number.def(0.1),
      getPopupContainer: Function,
      destroyTooltipOnHide: { type: Boolean, default: !1 },
      align: I.object.def(() => ({})),
      arrowContent: I.any.def(null),
      tipId: String,
      builtinPlacements: I.object,
      overlayInnerStyle: { type: Object, default: void 0 },
      popupVisible: { type: Boolean, default: void 0 },
      onVisibleChange: Function,
      onPopupAlign: Function,
      arrow: { type: Boolean, default: !0 }
    },
    setup(e, t) {
      let { slots: n, attrs: o, expose: r } = t
      const i = N(),
        a = () => {
          const { prefixCls: d, tipId: u, overlayInnerStyle: m } = e
          return [
            e.arrow
              ? y('div', { class: `${d}-arrow`, key: 'arrow' }, [
                  oo(n, e, 'arrowContent')
                ])
              : null,
            y(
              ep,
              { key: 'content', prefixCls: d, id: u, overlayInnerStyle: m },
              { overlay: n.overlay }
            )
          ]
        }
      r({
        getPopupDomNode: () => i.value.getPopupDomNode(),
        triggerDOM: i,
        forcePopupAlign: () => {
          var d
          return (d = i.value) === null || d === void 0
            ? void 0
            : d.forcePopupAlign()
        }
      })
      const s = N(!1),
        c = N(!1)
      return (
        Oe(() => {
          const { destroyTooltipOnHide: d } = e
          if (typeof d == 'boolean') s.value = d
          else if (d && typeof d == 'object') {
            const { keepParent: u } = d
            ;(s.value = u === !0), (c.value = u === !1)
          }
        }),
        () => {
          const {
              overlayClassName: d,
              trigger: u,
              mouseEnterDelay: m,
              mouseLeaveDelay: p,
              overlayStyle: v,
              prefixCls: h,
              afterVisibleChange: C,
              transitionName: $,
              animation: g,
              placement: T,
              align: z,
              destroyTooltipOnHide: P,
              defaultVisible: x
            } = e,
            b = tp(e, [
              'overlayClassName',
              'trigger',
              'mouseEnterDelay',
              'mouseLeaveDelay',
              'overlayStyle',
              'prefixCls',
              'afterVisibleChange',
              'transitionName',
              'animation',
              'placement',
              'align',
              'destroyTooltipOnHide',
              'defaultVisible'
            ]),
            A = f({}, b)
          e.visible !== void 0 && (A.popupVisible = e.visible)
          const F = f(
            f(
              f(
                {
                  popupClassName: d,
                  prefixCls: h,
                  action: u,
                  builtinPlacements: da,
                  popupPlacement: T,
                  popupAlign: z,
                  afterPopupVisibleChange: C,
                  popupTransitionName: $,
                  popupAnimation: g,
                  defaultPopupVisible: x,
                  destroyPopupOnHide: s.value,
                  autoDestroy: c.value,
                  mouseLeaveDelay: p,
                  popupStyle: v,
                  mouseEnterDelay: m
                },
                A
              ),
              o
            ),
            {
              onPopupVisibleChange: e.onVisibleChange || zr,
              onPopupAlign: e.onPopupAlign || zr,
              ref: i,
              arrow: !!e.arrow,
              popup: a()
            }
          )
          return y(yo, F, { default: n.default })
        }
      )
    }
  }),
  op = () => ({
    trigger: [String, Array],
    open: { type: Boolean, default: void 0 },
    visible: { type: Boolean, default: void 0 },
    placement: String,
    color: String,
    transitionName: String,
    overlayStyle: Be(),
    overlayInnerStyle: Be(),
    overlayClassName: String,
    openClassName: String,
    prefixCls: String,
    mouseEnterDelay: Number,
    mouseLeaveDelay: Number,
    getPopupContainer: Function,
    arrowPointAtCenter: { type: Boolean, default: void 0 },
    arrow: { type: [Boolean, Object], default: !0 },
    autoAdjustOverflow: { type: [Boolean, Object], default: void 0 },
    destroyTooltipOnHide: { type: Boolean, default: void 0 },
    align: Be(),
    builtinPlacements: Be(),
    children: Array,
    onVisibleChange: Function,
    'onUpdate:visible': Function,
    onOpenChange: Function,
    'onUpdate:open': Function
  }),
  rp = { adjustX: 1, adjustY: 1 },
  Nr = { adjustX: 0, adjustY: 0 },
  ip = [0, 0]
function Hr(e) {
  return typeof e == 'boolean' ? (e ? rp : Nr) : f(f({}, Nr), e)
}
function ap(e) {
  const {
      arrowWidth: t = 4,
      horizontalArrowShift: n = 16,
      verticalArrowShift: o = 8,
      autoAdjustOverflow: r,
      arrowPointAtCenter: i
    } = e,
    a = {
      left: { points: ['cr', 'cl'], offset: [-4, 0] },
      right: { points: ['cl', 'cr'], offset: [4, 0] },
      top: { points: ['bc', 'tc'], offset: [0, -4] },
      bottom: { points: ['tc', 'bc'], offset: [0, 4] },
      topLeft: { points: ['bl', 'tc'], offset: [-(n + t), -4] },
      leftTop: { points: ['tr', 'cl'], offset: [-4, -(o + t)] },
      topRight: { points: ['br', 'tc'], offset: [n + t, -4] },
      rightTop: { points: ['tl', 'cr'], offset: [4, -(o + t)] },
      bottomRight: { points: ['tr', 'bc'], offset: [n + t, 4] },
      rightBottom: { points: ['bl', 'cr'], offset: [4, o + t] },
      bottomLeft: { points: ['tl', 'bc'], offset: [-(n + t), 4] },
      leftBottom: { points: ['br', 'cl'], offset: [-4, o + t] }
    }
  return (
    Object.keys(a).forEach(l => {
      ;(a[l] = i
        ? f(f({}, a[l]), { overflow: Hr(r), targetOffset: ip })
        : f(f({}, da[l]), { overflow: Hr(r) })),
        (a[l].ignoreShake = !0)
    }),
    a
  )
}
function lp() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : []
  for (let t = 0, n = e.length; t < n; t++) if (e[t] !== void 0) return e[t]
}
const sp = Qt.map(e => `${e}-inverse`),
  up = ['success', 'processing', 'error', 'default', 'warning']
function cp(e) {
  return (arguments.length > 1 && arguments[1] !== void 0
  ? arguments[1]
  : !0)
    ? [...sp, ...Qt].includes(e)
    : Qt.includes(e)
}
function Bv(e) {
  return up.includes(e)
}
function dp(e, t) {
  const n = cp(t),
    o = oe({ [`${e}-${t}`]: t && n }),
    r = {},
    i = {}
  return (
    t && !n && ((r.background = t), (i['--antd-arrow-background-color'] = t)),
    { className: o, overlayStyle: r, arrowStyle: i }
  )
}
function Lt(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : ''
  return e.map(n => `${t}${n}`).join(',')
}
const fa = 8
function fp(e) {
  const t = fa,
    {
      sizePopupArrow: n,
      contentRadius: o,
      borderRadiusOuter: r,
      limitVerticalRadius: i
    } = e,
    a = n / 2 - Math.ceil(r * (Math.sqrt(2) - 1)),
    l = (o > 12 ? o + 2 : 12) - a,
    s = i ? t - a : l
  return { dropdownArrowOffset: l, dropdownArrowOffsetVertical: s }
}
function pp(e, t) {
  const {
      componentCls: n,
      sizePopupArrow: o,
      marginXXS: r,
      borderRadiusXS: i,
      borderRadiusOuter: a,
      boxShadowPopoverArrow: l
    } = e,
    {
      colorBg: s,
      showArrowCls: c,
      contentRadius: d = e.borderRadiusLG,
      limitVerticalRadius: u
    } = t,
    { dropdownArrowOffsetVertical: m, dropdownArrowOffset: p } = fp({
      sizePopupArrow: o,
      contentRadius: d,
      borderRadiusOuter: a,
      limitVerticalRadius: u
    }),
    v = o / 2 + r
  return {
    [n]: {
      [`${n}-arrow`]: [
        f(
          f(
            { position: 'absolute', zIndex: 1, display: 'block' },
            Nl(o, i, a, s, l)
          ),
          { '&:before': { background: s } }
        )
      ],
      [[
        `&-placement-top ${n}-arrow`,
        `&-placement-topLeft ${n}-arrow`,
        `&-placement-topRight ${n}-arrow`
      ].join(',')]: { bottom: 0, transform: 'translateY(100%) rotate(180deg)' },
      [`&-placement-top ${n}-arrow`]: {
        left: { _skip_check_: !0, value: '50%' },
        transform: 'translateX(-50%) translateY(100%) rotate(180deg)'
      },
      [`&-placement-topLeft ${n}-arrow`]: {
        left: { _skip_check_: !0, value: p }
      },
      [`&-placement-topRight ${n}-arrow`]: {
        right: { _skip_check_: !0, value: p }
      },
      [[
        `&-placement-bottom ${n}-arrow`,
        `&-placement-bottomLeft ${n}-arrow`,
        `&-placement-bottomRight ${n}-arrow`
      ].join(',')]: { top: 0, transform: 'translateY(-100%)' },
      [`&-placement-bottom ${n}-arrow`]: {
        left: { _skip_check_: !0, value: '50%' },
        transform: 'translateX(-50%) translateY(-100%)'
      },
      [`&-placement-bottomLeft ${n}-arrow`]: {
        left: { _skip_check_: !0, value: p }
      },
      [`&-placement-bottomRight ${n}-arrow`]: {
        right: { _skip_check_: !0, value: p }
      },
      [[
        `&-placement-left ${n}-arrow`,
        `&-placement-leftTop ${n}-arrow`,
        `&-placement-leftBottom ${n}-arrow`
      ].join(',')]: {
        right: { _skip_check_: !0, value: 0 },
        transform: 'translateX(100%) rotate(90deg)'
      },
      [`&-placement-left ${n}-arrow`]: {
        top: { _skip_check_: !0, value: '50%' },
        transform: 'translateY(-50%) translateX(100%) rotate(90deg)'
      },
      [`&-placement-leftTop ${n}-arrow`]: { top: m },
      [`&-placement-leftBottom ${n}-arrow`]: { bottom: m },
      [[
        `&-placement-right ${n}-arrow`,
        `&-placement-rightTop ${n}-arrow`,
        `&-placement-rightBottom ${n}-arrow`
      ].join(',')]: {
        left: { _skip_check_: !0, value: 0 },
        transform: 'translateX(-100%) rotate(-90deg)'
      },
      [`&-placement-right ${n}-arrow`]: {
        top: { _skip_check_: !0, value: '50%' },
        transform: 'translateY(-50%) translateX(-100%) rotate(-90deg)'
      },
      [`&-placement-rightTop ${n}-arrow`]: { top: m },
      [`&-placement-rightBottom ${n}-arrow`]: { bottom: m },
      [Lt(
        ['&-placement-topLeft', '&-placement-top', '&-placement-topRight'].map(
          h => (h += ':not(&-arrow-hidden)')
        ),
        c
      )]: { paddingBottom: v },
      [Lt(
        [
          '&-placement-bottomLeft',
          '&-placement-bottom',
          '&-placement-bottomRight'
        ].map(h => (h += ':not(&-arrow-hidden)')),
        c
      )]: { paddingTop: v },
      [Lt(
        [
          '&-placement-leftTop',
          '&-placement-left',
          '&-placement-leftBottom'
        ].map(h => (h += ':not(&-arrow-hidden)')),
        c
      )]: { paddingRight: { _skip_check_: !0, value: v } },
      [Lt(
        [
          '&-placement-rightTop',
          '&-placement-right',
          '&-placement-rightBottom'
        ].map(h => (h += ':not(&-arrow-hidden)')),
        c
      )]: { paddingLeft: { _skip_check_: !0, value: v } }
    }
  }
}
const mp = e => {
    const {
      componentCls: t,
      tooltipMaxWidth: n,
      tooltipColor: o,
      tooltipBg: r,
      tooltipBorderRadius: i,
      zIndexPopup: a,
      controlHeight: l,
      boxShadowSecondary: s,
      paddingSM: c,
      paddingXS: d,
      tooltipRadiusOuter: u
    } = e
    return [
      {
        [t]: f(
          f(
            f(f({}, un(e)), {
              position: 'absolute',
              zIndex: a,
              display: 'block',
              '&': [{ width: 'max-content' }, { width: 'intrinsic' }],
              maxWidth: n,
              visibility: 'visible',
              '&-hidden': { display: 'none' },
              '--antd-arrow-background-color': r,
              [`${t}-inner`]: {
                minWidth: l,
                minHeight: l,
                padding: `${c / 2}px ${d}px`,
                color: o,
                textAlign: 'start',
                textDecoration: 'none',
                wordWrap: 'break-word',
                backgroundColor: r,
                borderRadius: i,
                boxShadow: s
              },
              [[
                '&-placement-left',
                '&-placement-leftTop',
                '&-placement-leftBottom',
                '&-placement-right',
                '&-placement-rightTop',
                '&-placement-rightBottom'
              ].join(',')]: {
                [`${t}-inner`]: { borderRadius: Math.min(i, fa) }
              },
              [`${t}-content`]: { position: 'relative' }
            }),
            Hl(e, (m, p) => {
              let { darkColor: v } = p
              return {
                [`&${t}-${m}`]: {
                  [`${t}-inner`]: { backgroundColor: v },
                  [`${t}-arrow`]: { '--antd-arrow-background-color': v }
                }
              }
            })
          ),
          { '&-rtl': { direction: 'rtl' } }
        )
      },
      pp(Ce(e, { borderRadiusOuter: u }), {
        colorBg: 'var(--antd-arrow-background-color)',
        showArrowCls: '',
        contentRadius: i,
        limitVerticalRadius: !0
      }),
      { [`${t}-pure`]: { position: 'relative', maxWidth: 'none' } }
    ]
  },
  vp = (e, t) =>
    ft(
      'Tooltip',
      o => {
        if ((t == null ? void 0 : t.value) === !1) return []
        const {
            borderRadius: r,
            colorTextLightSolid: i,
            colorBgDefault: a,
            borderRadiusOuter: l
          } = o,
          s = Ce(o, {
            tooltipMaxWidth: 250,
            tooltipColor: i,
            tooltipBorderRadius: r,
            tooltipBg: a,
            tooltipRadiusOuter: l > 4 ? 4 : l
          })
        return [mp(s), ua(o, 'zoom-big-fast')]
      },
      o => {
        let { zIndexPopupBase: r, colorBgSpotlight: i } = o
        return { zIndexPopup: r + 70, colorBgDefault: i }
      }
    )(e),
  gp = (e, t) => {
    const n = {},
      o = f({}, e)
    return (
      t.forEach(r => {
        e && r in e && ((n[r] = e[r]), delete o[r])
      }),
      { picked: n, omitted: o }
    )
  },
  hp = () => f(f({}, op()), { title: I.any }),
  zv = () => ({
    trigger: 'hover',
    align: {},
    placement: 'top',
    mouseEnterDelay: 0.1,
    mouseLeaveDelay: 0.1,
    arrowPointAtCenter: !1,
    autoAdjustOverflow: !0
  }),
  bp = X({
    compatConfig: { MODE: 3 },
    name: 'ATooltip',
    inheritAttrs: !1,
    props: mi(hp(), {
      trigger: 'hover',
      align: {},
      placement: 'top',
      mouseEnterDelay: 0.1,
      mouseLeaveDelay: 0.1,
      arrowPointAtCenter: !1,
      autoAdjustOverflow: !0
    }),
    slots: Object,
    setup(e, t) {
      let { slots: n, emit: o, attrs: r, expose: i } = t
      const {
          prefixCls: a,
          getPopupContainer: l,
          direction: s,
          rootPrefixCls: c
        } = He('tooltip', e),
        d = S(() => {
          var O
          return (O = e.open) !== null && O !== void 0 ? O : e.visible
        }),
        u = j(lp([e.open, e.visible])),
        m = j()
      let p
      J(d, O => {
        le.cancel(p),
          (p = le(() => {
            u.value = !!O
          }))
      })
      const v = () => {
          var O
          const R = (O = e.title) !== null && O !== void 0 ? O : n.title
          return !R && R !== 0
        },
        h = O => {
          const R = v()
          d.value === void 0 && (u.value = R ? !1 : O),
            R ||
              (o('update:visible', O),
              o('visibleChange', O),
              o('update:open', O),
              o('openChange', O))
        }
      i({
        getPopupDomNode: () => m.value.getPopupDomNode(),
        open: u,
        forcePopupAlign: () => {
          var O
          return (O = m.value) === null || O === void 0
            ? void 0
            : O.forcePopupAlign()
        }
      })
      const $ = S(() => {
          var O
          const {
            builtinPlacements: R,
            autoAdjustOverflow: U,
            arrow: G,
            arrowPointAtCenter: Q
          } = e
          let w = Q
          return (
            typeof G == 'object' &&
              (w = (O = G.pointAtCenter) !== null && O !== void 0 ? O : Q),
            R || ap({ arrowPointAtCenter: w, autoAdjustOverflow: U })
          )
        }),
        g = O => O || O === '',
        T = O => {
          const R = O.type
          if (
            typeof R == 'object' &&
            O.props &&
            (((R.__ANT_BUTTON === !0 || R === 'button') &&
              g(O.props.disabled)) ||
              (R.__ANT_SWITCH === !0 &&
                (g(O.props.disabled) || g(O.props.loading))) ||
              (R.__ANT_RADIO === !0 && g(O.props.disabled)))
          ) {
            const { picked: U, omitted: G } = gp(Ya(O), [
                'position',
                'left',
                'right',
                'top',
                'bottom',
                'float',
                'display',
                'zIndex'
              ]),
              Q = f(f({ display: 'inline-block' }, U), {
                cursor: 'not-allowed',
                lineHeight: 1,
                width: O.props && O.props.block ? '100%' : void 0
              }),
              w = f(f({}, G), { pointerEvents: 'none' }),
              B = Se(O, { style: w }, !0)
            return y(
              'span',
              { style: Q, class: `${a.value}-disabled-compatible-wrapper` },
              [B]
            )
          }
          return O
        },
        z = () => {
          var O, R
          return (O = e.title) !== null && O !== void 0
            ? O
            : (R = n.title) === null || R === void 0
            ? void 0
            : R.call(n)
        },
        P = (O, R) => {
          const U = $.value,
            G = Object.keys(U).find(Q => {
              var w, B
              return (
                U[Q].points[0] ===
                  ((w = R.points) === null || w === void 0 ? void 0 : w[0]) &&
                U[Q].points[1] ===
                  ((B = R.points) === null || B === void 0 ? void 0 : B[1])
              )
            })
          if (G) {
            const Q = O.getBoundingClientRect(),
              w = { top: '50%', left: '50%' }
            G.indexOf('top') >= 0 || G.indexOf('Bottom') >= 0
              ? (w.top = `${Q.height - R.offset[1]}px`)
              : (G.indexOf('Top') >= 0 || G.indexOf('bottom') >= 0) &&
                (w.top = `${-R.offset[1]}px`),
              G.indexOf('left') >= 0 || G.indexOf('Right') >= 0
                ? (w.left = `${Q.width - R.offset[0]}px`)
                : (G.indexOf('right') >= 0 || G.indexOf('Left') >= 0) &&
                  (w.left = `${-R.offset[0]}px`),
              (O.style.transformOrigin = `${w.left} ${w.top}`)
          }
        },
        x = S(() => dp(a.value, e.color)),
        b = S(() => r['data-popover-inject']),
        [A, F] = vp(
          a,
          S(() => !b.value)
        )
      return () => {
        var O, R
        const {
          openClassName: U,
          overlayClassName: G,
          overlayStyle: Q,
          overlayInnerStyle: w
        } = e
        let B =
          (R = dt(
            (O = n.default) === null || O === void 0 ? void 0 : O.call(n)
          )) !== null && R !== void 0
            ? R
            : null
        B = B.length === 1 ? B[0] : B
        let V = u.value
        if ((d.value === void 0 && v() && (V = !1), !B)) return null
        const Y = T(ro(B) && !Ga(B) ? B : y('span', null, [B])),
          _ = oe({
            [U || `${a.value}-open`]: !0,
            [Y.props && Y.props.class]: Y.props && Y.props.class
          }),
          H = oe(
            G,
            { [`${a.value}-rtl`]: s.value === 'rtl' },
            x.value.className,
            F.value
          ),
          D = f(f({}, x.value.overlayStyle), w),
          q = x.value.arrowStyle,
          Z = f(f(f({}, r), e), {
            prefixCls: a.value,
            arrow: !!e.arrow,
            getPopupContainer: l == null ? void 0 : l.value,
            builtinPlacements: $.value,
            visible: V,
            ref: m,
            overlayClassName: H,
            overlayStyle: f(f({}, q), Q),
            overlayInnerStyle: D,
            onVisibleChange: h,
            onPopupAlign: P,
            transitionName: Xa(c.value, 'zoom-big-fast', e.transitionName)
          })
        return A(
          y(np, Z, {
            default: () => [u.value ? Se(Y, { class: _ }) : Y],
            arrowContent: () =>
              y('span', { class: `${a.value}-arrow-content` }, null),
            overlay: z
          })
        )
      }
    }
  }),
  yp = qa(bp),
  Qe = { adjustX: 1, adjustY: 1 },
  Je = [0, 0],
  $p = {
    topLeft: {
      points: ['bl', 'tl'],
      overflow: Qe,
      offset: [0, -4],
      targetOffset: Je
    },
    topCenter: {
      points: ['bc', 'tc'],
      overflow: Qe,
      offset: [0, -4],
      targetOffset: Je
    },
    topRight: {
      points: ['br', 'tr'],
      overflow: Qe,
      offset: [0, -4],
      targetOffset: Je
    },
    bottomLeft: {
      points: ['tl', 'bl'],
      overflow: Qe,
      offset: [0, 4],
      targetOffset: Je
    },
    bottomCenter: {
      points: ['tc', 'bc'],
      overflow: Qe,
      offset: [0, 4],
      targetOffset: Je
    },
    bottomRight: {
      points: ['tr', 'br'],
      overflow: Qe,
      offset: [0, 4],
      targetOffset: Je
    }
  },
  wp = $p
var Sp =
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
const Nv = X({
    compatConfig: { MODE: 3 },
    props: {
      minOverlayWidthMatchTrigger: { type: Boolean, default: void 0 },
      arrow: { type: Boolean, default: !1 },
      prefixCls: I.string.def('rc-dropdown'),
      transitionName: String,
      overlayClassName: I.string.def(''),
      openClassName: String,
      animation: I.any,
      align: I.object,
      overlayStyle: { type: Object, default: void 0 },
      placement: I.string.def('bottomLeft'),
      overlay: I.any,
      trigger: I.oneOfType([I.string, I.arrayOf(I.string)]).def('hover'),
      alignPoint: { type: Boolean, default: void 0 },
      showAction: I.array,
      hideAction: I.array,
      getPopupContainer: Function,
      visible: { type: Boolean, default: void 0 },
      defaultVisible: { type: Boolean, default: !1 },
      mouseEnterDelay: I.number.def(0.15),
      mouseLeaveDelay: I.number.def(0.1)
    },
    emits: ['visibleChange', 'overlayClick'],
    setup(e, t) {
      let { slots: n, emit: o, expose: r } = t
      const i = j(!!e.visible)
      J(
        () => e.visible,
        p => {
          p !== void 0 && (i.value = p)
        }
      )
      const a = j()
      r({ triggerRef: a })
      const l = p => {
          e.visible === void 0 && (i.value = !1), o('overlayClick', p)
        },
        s = p => {
          e.visible === void 0 && (i.value = p), o('visibleChange', p)
        },
        c = () => {
          var p
          const v =
              (p = n.overlay) === null || p === void 0 ? void 0 : p.call(n),
            h = { prefixCls: `${e.prefixCls}-menu`, onClick: l }
          return y(Ge, { key: ka }, [
            e.arrow && y('div', { class: `${e.prefixCls}-arrow` }, null),
            Se(v, h, !1)
          ])
        },
        d = S(() => {
          const { minOverlayWidthMatchTrigger: p = !e.alignPoint } = e
          return p
        }),
        u = () => {
          var p
          const v =
            (p = n.default) === null || p === void 0 ? void 0 : p.call(n)
          return i.value && v
            ? Se(v[0], { class: e.openClassName || `${e.prefixCls}-open` }, !1)
            : v
        },
        m = S(() =>
          !e.hideAction && e.trigger.indexOf('contextmenu') !== -1
            ? ['click']
            : e.hideAction
        )
      return () => {
        const {
            prefixCls: p,
            arrow: v,
            showAction: h,
            overlayStyle: C,
            trigger: $,
            placement: g,
            align: T,
            getPopupContainer: z,
            transitionName: P,
            animation: x,
            overlayClassName: b
          } = e,
          A = Sp(e, [
            'prefixCls',
            'arrow',
            'showAction',
            'overlayStyle',
            'trigger',
            'placement',
            'align',
            'getPopupContainer',
            'transitionName',
            'animation',
            'overlayClassName'
          ])
        return y(
          yo,
          M(
            M({}, A),
            {},
            {
              prefixCls: p,
              ref: a,
              popupClassName: oe(b, { [`${p}-show-arrow`]: v }),
              popupStyle: C,
              builtinPlacements: wp,
              action: $,
              showAction: h,
              hideAction: m.value || [],
              popupPlacement: g,
              popupAlign: T,
              popupTransitionName: P,
              popupAnimation: x,
              popupVisible: i.value,
              stretch: d.value ? 'minWidth' : '',
              onPopupVisibleChange: s,
              getPopupContainer: z
            }
          ),
          { popup: c, default: u }
        )
      }
    }
  }),
  Cp = e => {
    const { componentCls: t, colorPrimary: n } = e
    return {
      [t]: {
        position: 'absolute',
        background: 'transparent',
        pointerEvents: 'none',
        boxSizing: 'border-box',
        color: `var(--wave-color, ${n})`,
        boxShadow: '0 0 0 0 currentcolor',
        opacity: 0.2,
        '&.wave-motion-appear': {
          transition: [
            `box-shadow 0.4s ${e.motionEaseOutCirc}`,
            `opacity 2s ${e.motionEaseOutCirc}`
          ].join(','),
          '&-active': { boxShadow: '0 0 0 6px currentcolor', opacity: 0 }
        }
      }
    }
  },
  xp = ft('Wave', e => [Cp(e)])
function Op(e) {
  const t = (e || '').match(/rgba?\((\d*), (\d*), (\d*)(, [\d.]*)?\)/)
  return t && t[1] && t[2] && t[3] ? !(t[1] === t[2] && t[2] === t[3]) : !0
}
function _n(e) {
  return (
    e &&
    e !== '#fff' &&
    e !== '#ffffff' &&
    e !== 'rgb(255, 255, 255)' &&
    e !== 'rgba(255, 255, 255, 1)' &&
    Op(e) &&
    !/rgba\((?:\d*, ){3}0\)/.test(e) &&
    e !== 'transparent'
  )
}
function Tp(e) {
  const {
    borderTopColor: t,
    borderColor: n,
    backgroundColor: o
  } = getComputedStyle(e)
  return _n(t) ? t : _n(n) ? n : _n(o) ? o : null
}
function An(e) {
  return Number.isNaN(e) ? 0 : e
}
const Ip = X({
  props: { target: Be(), className: String },
  setup(e) {
    const t = N(null),
      [n, o] = Ve(null),
      [r, i] = Ve([]),
      [a, l] = Ve(0),
      [s, c] = Ve(0),
      [d, u] = Ve(0),
      [m, p] = Ve(0),
      [v, h] = Ve(!1)
    function C() {
      const { target: b } = e,
        A = getComputedStyle(b)
      o(Tp(b))
      const F = A.position === 'static',
        { borderLeftWidth: O, borderTopWidth: R } = A
      l(F ? b.offsetLeft : An(-parseFloat(O))),
        c(F ? b.offsetTop : An(-parseFloat(R))),
        u(b.offsetWidth),
        p(b.offsetHeight)
      const {
        borderTopLeftRadius: U,
        borderTopRightRadius: G,
        borderBottomLeftRadius: Q,
        borderBottomRightRadius: w
      } = A
      i([U, G, w, Q].map(B => An(parseFloat(B))))
    }
    let $, g, T
    const z = () => {
        clearTimeout(T), le.cancel(g), $ == null || $.disconnect()
      },
      P = () => {
        var b
        const A =
          (b = t.value) === null || b === void 0 ? void 0 : b.parentElement
        A && (qt(null, A), A.parentElement && A.parentElement.removeChild(A))
      }
    Pe(() => {
      z(),
        (T = setTimeout(() => {
          P()
        }, 5e3))
      const { target: b } = e
      b &&
        ((g = le(() => {
          C(), h(!0)
        })),
        typeof ResizeObserver < 'u' &&
          (($ = new ResizeObserver(C)), $.observe(b)))
    }),
      ve(() => {
        z()
      })
    const x = b => {
      b.propertyName === 'opacity' && P()
    }
    return () => {
      if (!v.value) return null
      const b = {
        left: `${a.value}px`,
        top: `${s.value}px`,
        width: `${d.value}px`,
        height: `${m.value}px`,
        borderRadius: r.value.map(A => `${A}px`).join(' ')
      }
      return (
        n && (b['--wave-color'] = n.value),
        y(
          pt,
          {
            appear: !0,
            name: 'wave-motion',
            appearFromClass: 'wave-motion-appear',
            appearActiveClass: 'wave-motion-appear',
            appearToClass: 'wave-motion-appear wave-motion-appear-active'
          },
          {
            default: () => [
              y(
                'div',
                { ref: t, class: e.className, style: b, onTransitionend: x },
                null
              )
            ]
          }
        )
      )
    }
  }
})
function Ep(e, t) {
  const n = document.createElement('div')
  return (
    (n.style.position = 'absolute'),
    (n.style.left = '0px'),
    (n.style.top = '0px'),
    e == null || e.insertBefore(n, e == null ? void 0 : e.firstChild),
    qt(y(Ip, { target: e, className: t }, null), n),
    () => {
      qt(null, n), n.parentElement && n.parentElement.removeChild(n)
    }
  )
}
function Pp(e, t) {
  const n = Ee()
  let o
  function r() {
    var i
    const a = De(n)
    o == null || o(),
      !(
        (!((i = t == null ? void 0 : t.value) === null || i === void 0) &&
          i.disabled) ||
        !a
      ) && (o = Ep(a, e.value))
  }
  return (
    ve(() => {
      o == null || o()
    }),
    r
  )
}
const _p = X({
  compatConfig: { MODE: 3 },
  name: 'Wave',
  props: { disabled: Boolean },
  setup(e, t) {
    let { slots: n } = t
    const o = Ee(),
      { prefixCls: r, wave: i } = He('wave', e),
      [, a] = xp(r),
      l = Pp(
        S(() => oe(r.value, a.value)),
        i
      )
    let s
    const c = () => {
      De(o).removeEventListener('click', s, !0)
    }
    return (
      Pe(() => {
        J(
          () => e.disabled,
          () => {
            c(),
              Te(() => {
                const d = De(o)
                d == null || d.removeEventListener('click', s, !0),
                  !(!d || d.nodeType !== 1 || e.disabled) &&
                    ((s = u => {
                      u.target.tagName === 'INPUT' ||
                        !Ni(u.target) ||
                        !d.getAttribute ||
                        d.getAttribute('disabled') ||
                        d.disabled ||
                        d.className.includes('disabled') ||
                        d.className.includes('-leave') ||
                        l()
                    }),
                    d.addEventListener('click', s, !0))
              })
          },
          { immediate: !0, flush: 'post' }
        )
      }),
      ve(() => {
        c()
      }),
      () => {
        var d
        return (d = n.default) === null || d === void 0 ? void 0 : d.call(n)[0]
      }
    )
  }
})
function Hv(e) {
  return e === 'danger' ? { danger: !0 } : { type: e }
}
const Ap = () => ({
    prefixCls: String,
    type: String,
    htmlType: { type: String, default: 'button' },
    shape: { type: String },
    size: { type: String },
    loading: { type: [Boolean, Object], default: () => !1 },
    disabled: { type: Boolean, default: void 0 },
    ghost: { type: Boolean, default: void 0 },
    block: { type: Boolean, default: void 0 },
    danger: { type: Boolean, default: void 0 },
    icon: I.any,
    href: String,
    target: String,
    title: String,
    onClick: Yt(),
    onMousedown: Yt()
  }),
  Mp = Ap,
  Fr = e => {
    e &&
      ((e.style.width = '0px'),
      (e.style.opacity = '0'),
      (e.style.transform = 'scale(0)'))
  },
  Lr = e => {
    Te(() => {
      e &&
        ((e.style.width = `${e.scrollWidth}px`),
        (e.style.opacity = '1'),
        (e.style.transform = 'scale(1)'))
    })
  },
  jr = e => {
    e &&
      e.style &&
      ((e.style.width = null),
      (e.style.opacity = null),
      (e.style.transform = null))
  },
  Rp = X({
    compatConfig: { MODE: 3 },
    name: 'LoadingIcon',
    props: {
      prefixCls: String,
      loading: [Boolean, Object],
      existIcon: Boolean
    },
    setup(e) {
      return () => {
        const { existIcon: t, prefixCls: n, loading: o } = e
        if (t)
          return y('span', { class: `${n}-loading-icon` }, [y(zo, null, null)])
        const r = !!o
        return y(
          pt,
          {
            name: `${n}-loading-icon-motion`,
            onBeforeEnter: Fr,
            onEnter: Lr,
            onAfterEnter: jr,
            onBeforeLeave: Lr,
            onLeave: i => {
              setTimeout(() => {
                Fr(i)
              })
            },
            onAfterLeave: jr
          },
          {
            default: () => [
              r
                ? y('span', { class: `${n}-loading-icon` }, [y(zo, null, null)])
                : null
            ]
          }
        )
      }
    }
  }),
  Wr = (e, t) => ({
    [`> span, > ${e}`]: {
      '&:not(:last-child)': {
        [`&, & > ${e}`]: { '&:not(:disabled)': { borderInlineEndColor: t } }
      },
      '&:not(:first-child)': {
        [`&, & > ${e}`]: { '&:not(:disabled)': { borderInlineStartColor: t } }
      }
    }
  }),
  Dp = e => {
    const {
      componentCls: t,
      fontSize: n,
      lineWidth: o,
      colorPrimaryHover: r,
      colorErrorHover: i
    } = e
    return {
      [`${t}-group`]: [
        {
          position: 'relative',
          display: 'inline-flex',
          [`> span, > ${t}`]: {
            '&:not(:last-child)': {
              [`&, & > ${t}`]: {
                borderStartEndRadius: 0,
                borderEndEndRadius: 0
              }
            },
            '&:not(:first-child)': {
              marginInlineStart: -o,
              [`&, & > ${t}`]: {
                borderStartStartRadius: 0,
                borderEndStartRadius: 0
              }
            }
          },
          [t]: {
            position: 'relative',
            zIndex: 1,
            '&:hover,\n          &:focus,\n          &:active': { zIndex: 2 },
            '&[disabled]': { zIndex: 0 }
          },
          [`${t}-icon-only`]: { fontSize: n }
        },
        Wr(`${t}-primary`, r),
        Wr(`${t}-danger`, i)
      ]
    }
  },
  Bp = Dp
function zp(e, t) {
  return {
    [`&-item:not(${t}-last-item)`]: { marginBottom: -e.lineWidth },
    '&-item': {
      '&:hover,&:focus,&:active': { zIndex: 2 },
      '&[disabled]': { zIndex: 0 }
    }
  }
}
function Np(e, t) {
  return {
    [`&-item:not(${t}-first-item):not(${t}-last-item)`]: { borderRadius: 0 },
    [`&-item${t}-first-item:not(${t}-last-item)`]: {
      [`&, &${e}-sm, &${e}-lg`]: {
        borderEndEndRadius: 0,
        borderEndStartRadius: 0
      }
    },
    [`&-item${t}-last-item:not(${t}-first-item)`]: {
      [`&, &${e}-sm, &${e}-lg`]: {
        borderStartStartRadius: 0,
        borderStartEndRadius: 0
      }
    }
  }
}
function Hp(e) {
  const t = `${e.componentCls}-compact-vertical`
  return { [t]: f(f({}, zp(e, t)), Np(e.componentCls, t)) }
}
const Fp = e => {
    const { componentCls: t, iconCls: n } = e
    return {
      [t]: {
        outline: 'none',
        position: 'relative',
        display: 'inline-block',
        fontWeight: 400,
        whiteSpace: 'nowrap',
        textAlign: 'center',
        backgroundImage: 'none',
        backgroundColor: 'transparent',
        border: `${e.lineWidth}px ${e.lineType} transparent`,
        cursor: 'pointer',
        transition: `all ${e.motionDurationMid} ${e.motionEaseInOut}`,
        userSelect: 'none',
        touchAction: 'manipulation',
        lineHeight: e.lineHeight,
        color: e.colorText,
        '> span': { display: 'inline-block' },
        [`> ${n} + span, > span + ${n}`]: { marginInlineStart: e.marginXS },
        '> a': { color: 'currentColor' },
        '&:not(:disabled)': f({}, Za(e)),
        [`&-icon-only${t}-compact-item`]: { flex: 'none' },
        [`&-compact-item${t}-primary`]: {
          [`&:not([disabled]) + ${t}-compact-item${t}-primary:not([disabled])`]: {
            position: 'relative',
            '&:before': {
              position: 'absolute',
              top: -e.lineWidth,
              insetInlineStart: -e.lineWidth,
              display: 'inline-block',
              width: e.lineWidth,
              height: `calc(100% + ${e.lineWidth * 2}px)`,
              backgroundColor: e.colorPrimaryHover,
              content: '""'
            }
          }
        },
        '&-compact-vertical-item': {
          [`&${t}-primary`]: {
            [`&:not([disabled]) + ${t}-compact-vertical-item${t}-primary:not([disabled])`]: {
              position: 'relative',
              '&:before': {
                position: 'absolute',
                top: -e.lineWidth,
                insetInlineStart: -e.lineWidth,
                display: 'inline-block',
                width: `calc(100% + ${e.lineWidth * 2}px)`,
                height: e.lineWidth,
                backgroundColor: e.colorPrimaryHover,
                content: '""'
              }
            }
          }
        }
      }
    }
  },
  Ie = (e, t) => ({ '&:not(:disabled)': { '&:hover': e, '&:active': t } }),
  Lp = e => ({
    minWidth: e.controlHeight,
    paddingInlineStart: 0,
    paddingInlineEnd: 0,
    borderRadius: '50%'
  }),
  jp = e => ({
    borderRadius: e.controlHeight,
    paddingInlineStart: e.controlHeight / 2,
    paddingInlineEnd: e.controlHeight / 2
  }),
  Jn = e => ({
    cursor: 'not-allowed',
    borderColor: e.colorBorder,
    color: e.colorTextDisabled,
    backgroundColor: e.colorBgContainerDisabled,
    boxShadow: 'none'
  }),
  on = (e, t, n, o, r, i, a) => ({
    [`&${e}-background-ghost`]: f(
      f(
        {
          color: t || void 0,
          backgroundColor: 'transparent',
          borderColor: n || void 0,
          boxShadow: 'none'
        },
        Ie(
          f({ backgroundColor: 'transparent' }, i),
          f({ backgroundColor: 'transparent' }, a)
        )
      ),
      {
        '&:disabled': {
          cursor: 'not-allowed',
          color: o || void 0,
          borderColor: r || void 0
        }
      }
    )
  }),
  Co = e => ({ '&:disabled': f({}, Jn(e)) }),
  pa = e => f({}, Co(e)),
  rn = e => ({
    '&:disabled': { cursor: 'not-allowed', color: e.colorTextDisabled }
  }),
  ma = e =>
    f(
      f(
        f(
          f(f({}, pa(e)), {
            backgroundColor: e.colorBgContainer,
            borderColor: e.colorBorder,
            boxShadow: `0 ${e.controlOutlineWidth}px 0 ${e.controlTmpOutline}`
          }),
          Ie(
            { color: e.colorPrimaryHover, borderColor: e.colorPrimaryHover },
            { color: e.colorPrimaryActive, borderColor: e.colorPrimaryActive }
          )
        ),
        on(
          e.componentCls,
          e.colorBgContainer,
          e.colorBgContainer,
          e.colorTextDisabled,
          e.colorBorder
        )
      ),
      {
        [`&${e.componentCls}-dangerous`]: f(
          f(
            f(
              { color: e.colorError, borderColor: e.colorError },
              Ie(
                {
                  color: e.colorErrorHover,
                  borderColor: e.colorErrorBorderHover
                },
                { color: e.colorErrorActive, borderColor: e.colorErrorActive }
              )
            ),
            on(
              e.componentCls,
              e.colorError,
              e.colorError,
              e.colorTextDisabled,
              e.colorBorder
            )
          ),
          Co(e)
        )
      }
    ),
  Wp = e =>
    f(
      f(
        f(
          f(f({}, pa(e)), {
            color: e.colorTextLightSolid,
            backgroundColor: e.colorPrimary,
            boxShadow: `0 ${e.controlOutlineWidth}px 0 ${e.controlOutline}`
          }),
          Ie(
            {
              color: e.colorTextLightSolid,
              backgroundColor: e.colorPrimaryHover
            },
            {
              color: e.colorTextLightSolid,
              backgroundColor: e.colorPrimaryActive
            }
          )
        ),
        on(
          e.componentCls,
          e.colorPrimary,
          e.colorPrimary,
          e.colorTextDisabled,
          e.colorBorder,
          { color: e.colorPrimaryHover, borderColor: e.colorPrimaryHover },
          { color: e.colorPrimaryActive, borderColor: e.colorPrimaryActive }
        )
      ),
      {
        [`&${e.componentCls}-dangerous`]: f(
          f(
            f(
              {
                backgroundColor: e.colorError,
                boxShadow: `0 ${e.controlOutlineWidth}px 0 ${e.colorErrorOutline}`
              },
              Ie(
                { backgroundColor: e.colorErrorHover },
                { backgroundColor: e.colorErrorActive }
              )
            ),
            on(
              e.componentCls,
              e.colorError,
              e.colorError,
              e.colorTextDisabled,
              e.colorBorder,
              { color: e.colorErrorHover, borderColor: e.colorErrorHover },
              { color: e.colorErrorActive, borderColor: e.colorErrorActive }
            )
          ),
          Co(e)
        )
      }
    ),
  Vp = e => f(f({}, ma(e)), { borderStyle: 'dashed' }),
  Kp = e =>
    f(
      f(
        f(
          { color: e.colorLink },
          Ie({ color: e.colorLinkHover }, { color: e.colorLinkActive })
        ),
        rn(e)
      ),
      {
        [`&${e.componentCls}-dangerous`]: f(
          f(
            { color: e.colorError },
            Ie({ color: e.colorErrorHover }, { color: e.colorErrorActive })
          ),
          rn(e)
        )
      }
    ),
  Up = e =>
    f(
      f(
        f(
          {},
          Ie(
            { color: e.colorText, backgroundColor: e.colorBgTextHover },
            { color: e.colorText, backgroundColor: e.colorBgTextActive }
          )
        ),
        rn(e)
      ),
      {
        [`&${e.componentCls}-dangerous`]: f(
          f({ color: e.colorError }, rn(e)),
          Ie(
            { color: e.colorErrorHover, backgroundColor: e.colorErrorBg },
            { color: e.colorErrorHover, backgroundColor: e.colorErrorBg }
          )
        )
      }
    ),
  Gp = e => f(f({}, Jn(e)), { [`&${e.componentCls}:hover`]: f({}, Jn(e)) }),
  Xp = e => {
    const { componentCls: t } = e
    return {
      [`${t}-default`]: ma(e),
      [`${t}-primary`]: Wp(e),
      [`${t}-dashed`]: Vp(e),
      [`${t}-link`]: Kp(e),
      [`${t}-text`]: Up(e),
      [`${t}-disabled`]: Gp(e)
    }
  },
  xo = function(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : ''
    const {
        componentCls: n,
        iconCls: o,
        controlHeight: r,
        fontSize: i,
        lineHeight: a,
        lineWidth: l,
        borderRadius: s,
        buttonPaddingHorizontal: c
      } = e,
      d = Math.max(0, (r - i * a) / 2 - l),
      u = c - l,
      m = `${n}-icon-only`
    return [
      {
        [`${n}${t}`]: {
          fontSize: i,
          height: r,
          padding: `${d}px ${u}px`,
          borderRadius: s,
          [`&${m}`]: {
            width: r,
            paddingInlineStart: 0,
            paddingInlineEnd: 0,
            [`&${n}-round`]: { width: 'auto' },
            '> span': { transform: 'scale(1.143)' }
          },
          [`&${n}-loading`]: { opacity: e.opacityLoading, cursor: 'default' },
          [`${n}-loading-icon`]: {
            transition: `width ${e.motionDurationSlow} ${e.motionEaseInOut}, opacity ${e.motionDurationSlow} ${e.motionEaseInOut}`
          },
          [`&:not(${m}) ${n}-loading-icon > ${o}`]: {
            marginInlineEnd: e.marginXS
          }
        }
      },
      { [`${n}${n}-circle${t}`]: Lp(e) },
      { [`${n}${n}-round${t}`]: jp(e) }
    ]
  },
  Yp = e => xo(e),
  qp = e => {
    const t = Ce(e, {
      controlHeight: e.controlHeightSM,
      padding: e.paddingXS,
      buttonPaddingHorizontal: 8,
      borderRadius: e.borderRadiusSM
    })
    return xo(t, `${e.componentCls}-sm`)
  },
  kp = e => {
    const t = Ce(e, {
      controlHeight: e.controlHeightLG,
      fontSize: e.fontSizeLG,
      borderRadius: e.borderRadiusLG
    })
    return xo(t, `${e.componentCls}-lg`)
  },
  Zp = e => {
    const { componentCls: t } = e
    return { [t]: { [`&${t}-block`]: { width: '100%' } } }
  },
  Qp = ft('Button', e => {
    const { controlTmpOutline: t, paddingContentHorizontal: n } = e,
      o = Ce(e, { colorOutlineDefault: t, buttonPaddingHorizontal: n })
    return [
      Fp(o),
      qp(o),
      Yp(o),
      kp(o),
      Zp(o),
      Xp(o),
      Bp(o),
      ca(e, { focus: !1 }),
      Hp(e)
    ]
  }),
  Jp = () => ({ prefixCls: String, size: { type: String } }),
  va = wo(),
  eo = X({
    compatConfig: { MODE: 3 },
    name: 'AButtonGroup',
    props: Jp(),
    setup(e, t) {
      let { slots: n } = t
      const { prefixCls: o, direction: r } = He('btn-group', e),
        [, , i] = Qa()
      va.useProvide(io({ size: S(() => e.size) }))
      const a = S(() => {
        const { size: l } = e
        let s = ''
        switch (l) {
          case 'large':
            s = 'lg'
            break
          case 'small':
            s = 'sm'
            break
          case 'middle':
          case void 0:
            break
          default:
            lt(!l, 'Button.Group', 'Invalid prop `size`.')
        }
        return {
          [`${o.value}`]: !0,
          [`${o.value}-${s}`]: s,
          [`${o.value}-rtl`]: r.value === 'rtl',
          [i.value]: !0
        }
      })
      return () => {
        var l
        return y('div', { class: a.value }, [
          Ye((l = n.default) === null || l === void 0 ? void 0 : l.call(n))
        ])
      }
    }
  }),
  Vr = /^[\u4e00-\u9fa5]{2}$/,
  Kr = Vr.test.bind(Vr)
function jt(e) {
  return e === 'text' || e === 'link'
}
const Gt = X({
  compatConfig: { MODE: 3 },
  name: 'AButton',
  inheritAttrs: !1,
  __ANT_BUTTON: !0,
  props: mi(Mp(), { type: 'default' }),
  slots: Object,
  setup(e, t) {
    let { slots: n, attrs: o, emit: r, expose: i } = t
    const {
        prefixCls: a,
        autoInsertSpaceInButton: l,
        direction: s,
        size: c
      } = He('btn', e),
      [d, u] = Qp(a),
      m = va.useInject(),
      p = di(),
      v = S(() => {
        var w
        return (w = e.disabled) !== null && w !== void 0 ? w : p.value
      }),
      h = N(null),
      C = N(void 0)
    let $ = !1
    const g = N(!1),
      T = N(!1),
      z = S(() => l.value !== !1),
      { compactSize: P, compactItemClassnames: x } = xf(a, s),
      b = S(() =>
        typeof e.loading == 'object' && e.loading.delay
          ? e.loading.delay || !0
          : !!e.loading
      )
    J(
      b,
      w => {
        clearTimeout(C.value),
          typeof b.value == 'number'
            ? (C.value = setTimeout(() => {
                g.value = w
              }, b.value))
            : (g.value = w)
      },
      { immediate: !0 }
    )
    const A = S(() => {
        const {
            type: w,
            shape: B = 'default',
            ghost: V,
            block: Y,
            danger: _
          } = e,
          H = a.value,
          D = { large: 'lg', small: 'sm', middle: void 0 },
          q = P.value || (m == null ? void 0 : m.size) || c.value,
          Z = (q && D[q]) || ''
        return [
          x.value,
          {
            [u.value]: !0,
            [`${H}`]: !0,
            [`${H}-${B}`]: B !== 'default' && B,
            [`${H}-${w}`]: w,
            [`${H}-${Z}`]: Z,
            [`${H}-loading`]: g.value,
            [`${H}-background-ghost`]: V && !jt(w),
            [`${H}-two-chinese-chars`]: T.value && z.value,
            [`${H}-block`]: Y,
            [`${H}-dangerous`]: !!_,
            [`${H}-rtl`]: s.value === 'rtl'
          }
        ]
      }),
      F = () => {
        const w = h.value
        if (!w || l.value === !1) return
        const B = w.textContent
        $ && Kr(B) ? T.value || (T.value = !0) : T.value && (T.value = !1)
      },
      O = w => {
        if (g.value || v.value) {
          w.preventDefault()
          return
        }
        r('click', w)
      },
      R = w => {
        r('mousedown', w)
      },
      U = (w, B) => {
        const V = B ? ' ' : ''
        if (w.type === sl) {
          let Y = w.children.trim()
          return Kr(Y) && (Y = Y.split('').join(V)), y('span', null, [Y])
        }
        return w
      }
    return (
      Oe(() => {
        lt(
          !(e.ghost && jt(e.type)),
          'Button',
          "`link` or `text` button can't be a `ghost` button."
        )
      }),
      Pe(F),
      cn(F),
      ve(() => {
        C.value && clearTimeout(C.value)
      }),
      i({
        focus: () => {
          var w
          ;(w = h.value) === null || w === void 0 || w.focus()
        },
        blur: () => {
          var w
          ;(w = h.value) === null || w === void 0 || w.blur()
        }
      }),
      () => {
        var w, B
        const {
            icon: V = (w = n.icon) === null || w === void 0 ? void 0 : w.call(n)
          } = e,
          Y = Ye((B = n.default) === null || B === void 0 ? void 0 : B.call(n))
        $ = Y.length === 1 && !V && !jt(e.type)
        const { type: _, htmlType: H, href: D, title: q, target: Z } = e,
          fe = g.value ? 'loading' : V,
          de = f(f({}, o), {
            title: q,
            disabled: v.value,
            class: [
              A.value,
              o.class,
              { [`${a.value}-icon-only`]: Y.length === 0 && !!fe }
            ],
            onClick: O,
            onMousedown: R
          })
        v.value || delete de.disabled
        const ue =
            V && !g.value
              ? V
              : y(
                  Rp,
                  { existIcon: !!V, prefixCls: a.value, loading: !!g.value },
                  null
                ),
          E = Y.map(k => U(k, $ && z.value))
        if (D !== void 0)
          return d(
            y('a', M(M({}, de), {}, { href: D, target: Z, ref: h }), [ue, E])
          )
        let W = y('button', M(M({}, de), {}, { ref: h, type: H }), [ue, E])
        if (!jt(_)) {
          const k = (function() {
            return W
          })()
          W = y(
            _p,
            { ref: 'wave', disabled: !!g.value },
            { default: () => [k] }
          )
        }
        return d(W)
      }
    )
  }
})
Gt.Group = eo
Gt.install = function(e) {
  return e.component(Gt.name, Gt), e.component(eo.name, eo), e
}
function Ur(e) {
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
        em(e, r, n[r])
      })
  }
  return e
}
function em(e, t, n) {
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
var Oo = function(t, n) {
  var o = Ur({}, t, n.attrs)
  return y(Rt, Ur({}, o, { icon: pl }), null)
}
Oo.displayName = 'EllipsisOutlined'
Oo.inheritAttrs = !1
const tm = Oo
function Gr(e) {
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
        nm(e, r, n[r])
      })
  }
  return e
}
function nm(e, t, n) {
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
var To = function(t, n) {
  var o = Gr({}, t, n.attrs)
  return y(Rt, Gr({}, o, { icon: ml }), null)
}
To.displayName = 'RightOutlined'
To.inheritAttrs = !1
const Fv = To,
  ga = Symbol('OverrideContextKey'),
  ha = () => we(ga, void 0),
  Lv = e => {
    var t, n, o
    const {
      prefixCls: r,
      mode: i,
      selectable: a,
      validator: l,
      onClick: s,
      expandIcon: c
    } = ha() || {}
    pe(ga, {
      prefixCls: S(() => {
        var d, u
        return (u =
          (d = e.prefixCls) === null || d === void 0 ? void 0 : d.value) !==
          null && u !== void 0
          ? u
          : r == null
          ? void 0
          : r.value
      }),
      mode: S(() => {
        var d, u
        return (u =
          (d = e.mode) === null || d === void 0 ? void 0 : d.value) !== null &&
          u !== void 0
          ? u
          : i == null
          ? void 0
          : i.value
      }),
      selectable: S(() => {
        var d, u
        return (u =
          (d = e.selectable) === null || d === void 0 ? void 0 : d.value) !==
          null && u !== void 0
          ? u
          : a == null
          ? void 0
          : a.value
      }),
      validator: (t = e.validator) !== null && t !== void 0 ? t : l,
      onClick: (n = e.onClick) !== null && n !== void 0 ? n : s,
      expandIcon:
        (o = e.expandIcon) !== null && o !== void 0
          ? o
          : c == null
          ? void 0
          : c.value
    })
  }
function om(e, t, n, o) {
  let r = n ? n.call(o, e, t) : void 0
  if (r !== void 0) return !!r
  if (e === t) return !0
  if (typeof e != 'object' || !e || typeof t != 'object' || !t) return !1
  const i = Object.keys(e),
    a = Object.keys(t)
  if (i.length !== a.length) return !1
  const l = Object.prototype.hasOwnProperty.bind(t)
  for (let s = 0; s < i.length; s++) {
    const c = i[s]
    if (!l(c)) return !1
    const d = e[c],
      u = t[c]
    if (
      ((r = n ? n.call(o, d, u, c) : void 0),
      r === !1 || (r === void 0 && d !== u))
    )
      return !1
  }
  return !0
}
function yt(e, t) {
  return om(Fn(e), Fn(t))
}
const ba = Symbol('menuContextKey'),
  ya = e => {
    pe(ba, e)
  },
  Me = () => we(ba),
  $a = Symbol('ForceRenderKey'),
  rm = e => {
    pe($a, e)
  },
  wa = () => we($a, !1),
  Sa = Symbol('menuFirstLevelContextKey'),
  Ca = e => {
    pe(Sa, e)
  },
  im = () => we(Sa, !0),
  an = X({
    compatConfig: { MODE: 3 },
    name: 'MenuContextProvider',
    inheritAttrs: !1,
    props: {
      mode: { type: String, default: void 0 },
      overflowDisabled: { type: Boolean, default: void 0 }
    },
    setup(e, t) {
      let { slots: n } = t
      const o = Me(),
        r = f({}, o)
      return (
        e.mode !== void 0 && (r.mode = Hn(e, 'mode')),
        e.overflowDisabled !== void 0 &&
          (r.overflowDisabled = Hn(e, 'overflowDisabled')),
        ya(r),
        () => {
          var i
          return (i = n.default) === null || i === void 0 ? void 0 : i.call(n)
        }
      )
    }
  }),
  am = ya,
  lm = Symbol('siderCollapsed'),
  Wt = '$$__vc-menu-more__key',
  xa = Symbol('KeyPathContext'),
  Io = () =>
    we(xa, {
      parentEventKeys: S(() => []),
      parentKeys: S(() => []),
      parentInfo: {}
    }),
  sm = (e, t, n) => {
    const { parentEventKeys: o, parentKeys: r } = Io(),
      i = S(() => [...o.value, e]),
      a = S(() => [...r.value, t])
    return pe(xa, { parentEventKeys: i, parentKeys: a, parentInfo: n }), a
  },
  Oa = Symbol('measure'),
  Xr = X({
    compatConfig: { MODE: 3 },
    setup(e, t) {
      let { slots: n } = t
      return (
        pe(Oa, !0),
        () => {
          var o
          return (o = n.default) === null || o === void 0 ? void 0 : o.call(n)
        }
      )
    }
  }),
  Eo = () => we(Oa, !1),
  um = sm
function Ta(e) {
  const { mode: t, rtl: n, inlineIndent: o } = Me()
  return S(() =>
    t.value !== 'inline'
      ? null
      : n.value
      ? { paddingRight: `${e.value * o.value}px` }
      : { paddingLeft: `${e.value * o.value}px` }
  )
}
let cm = 0
const dm = () => ({
    id: String,
    role: String,
    disabled: Boolean,
    danger: Boolean,
    title: { type: [String, Boolean], default: void 0 },
    icon: I.any,
    onMouseenter: Function,
    onMouseleave: Function,
    onClick: Function,
    onKeydown: Function,
    onFocus: Function,
    originItemValue: Be()
  }),
  Mt = X({
    compatConfig: { MODE: 3 },
    name: 'AMenuItem',
    inheritAttrs: !1,
    props: dm(),
    slots: Object,
    setup(e, t) {
      let { slots: n, emit: o, attrs: r } = t
      const i = Ee(),
        a = Eo(),
        l = typeof i.vnode.key == 'symbol' ? String(i.vnode.key) : i.vnode.key
      lt(
        typeof i.vnode.key != 'symbol',
        'MenuItem',
        `MenuItem \`:key="${String(l)}"\` not support Symbol type`
      )
      const s = `menu_item_${++cm}_$$_${l}`,
        { parentEventKeys: c, parentKeys: d } = Io(),
        {
          prefixCls: u,
          activeKeys: m,
          disabled: p,
          changeActiveKeys: v,
          rtl: h,
          inlineCollapsed: C,
          siderCollapsed: $,
          onItemClick: g,
          selectedKeys: T,
          registerMenuInfo: z,
          unRegisterMenuInfo: P
        } = Me(),
        x = im(),
        b = N(!1),
        A = S(() => [...d.value, l])
      z(s, {
        eventKey: s,
        key: l,
        parentEventKeys: c,
        parentKeys: d,
        isLeaf: !0
      }),
        ve(() => {
          P(s)
        }),
        J(
          m,
          () => {
            b.value = !!m.value.find(D => D === l)
          },
          { immediate: !0 }
        )
      const O = S(() => p.value || e.disabled),
        R = S(() => T.value.includes(l)),
        U = S(() => {
          const D = `${u.value}-item`
          return {
            [`${D}`]: !0,
            [`${D}-danger`]: e.danger,
            [`${D}-active`]: b.value,
            [`${D}-selected`]: R.value,
            [`${D}-disabled`]: O.value
          }
        }),
        G = D => ({
          key: l,
          eventKey: s,
          keyPath: A.value,
          eventKeyPath: [...c.value, s],
          domEvent: D,
          item: f(f({}, e), r)
        }),
        Q = D => {
          if (O.value) return
          const q = G(D)
          o('click', D), g(q)
        },
        w = D => {
          O.value || (v(A.value), o('mouseenter', D))
        },
        B = D => {
          O.value || (v([]), o('mouseleave', D))
        },
        V = D => {
          if ((o('keydown', D), D.which === zd.ENTER)) {
            const q = G(D)
            o('click', D), g(q)
          }
        },
        Y = D => {
          v(A.value), o('focus', D)
        },
        _ = (D, q) => {
          const Z = y('span', { class: `${u.value}-title-content` }, [q])
          return (!D || (ro(q) && q.type === 'span')) &&
            q &&
            C.value &&
            x &&
            typeof q == 'string'
            ? y('div', { class: `${u.value}-inline-collapsed-noicon` }, [
                q.charAt(0)
              ])
            : Z
        },
        H = Ta(S(() => A.value.length))
      return () => {
        var D, q, Z, fe, de
        if (a) return null
        const ue =
            (D = e.title) !== null && D !== void 0
              ? D
              : (q = n.title) === null || q === void 0
              ? void 0
              : q.call(n),
          E = Ye((Z = n.default) === null || Z === void 0 ? void 0 : Z.call(n)),
          W = E.length
        let k = ue
        typeof ue > 'u' ? (k = x && W ? E : '') : ue === !1 && (k = '')
        const re = { title: k }
        !$.value && !C.value && ((re.title = null), (re.open = !1))
        const ie = {}
        e.role === 'option' && (ie['aria-selected'] = R.value)
        const te =
          (fe = e.icon) !== null && fe !== void 0
            ? fe
            : (de = n.icon) === null || de === void 0
            ? void 0
            : de.call(n, e)
        return y(
          yp,
          M(
            M({}, re),
            {},
            {
              placement: h.value ? 'left' : 'right',
              overlayClassName: `${u.value}-inline-collapsed-tooltip`
            }
          ),
          {
            default: () => [
              y(
                xt.Item,
                M(
                  M(
                    M({ component: 'li' }, r),
                    {},
                    {
                      id: e.id,
                      style: f(f({}, r.style || {}), H.value),
                      class: [
                        U.value,
                        {
                          [`${r.class}`]: !!r.class,
                          [`${u.value}-item-only-child`]: (te ? W + 1 : W) === 1
                        }
                      ],
                      role: e.role || 'menuitem',
                      tabindex: e.disabled ? null : -1,
                      'data-menu-id': l,
                      'aria-disabled': e.disabled
                    },
                    ie
                  ),
                  {},
                  {
                    onMouseenter: w,
                    onMouseleave: B,
                    onClick: Q,
                    onKeydown: V,
                    onFocus: Y,
                    title: typeof ue == 'string' ? ue : void 0
                  }
                ),
                {
                  default: () => [
                    Se(
                      typeof te == 'function' ? te(e.originItemValue) : te,
                      { class: `${u.value}-item-icon` },
                      !1
                    ),
                    _(te, E)
                  ]
                }
              )
            ]
          }
        )
      }
    }
  }),
  ze = { adjustX: 1, adjustY: 1 },
  fm = {
    topLeft: { points: ['bl', 'tl'], overflow: ze, offset: [0, -7] },
    bottomLeft: { points: ['tl', 'bl'], overflow: ze, offset: [0, 7] },
    leftTop: { points: ['tr', 'tl'], overflow: ze, offset: [-4, 0] },
    rightTop: { points: ['tl', 'tr'], overflow: ze, offset: [4, 0] }
  },
  pm = {
    topLeft: { points: ['bl', 'tl'], overflow: ze, offset: [0, -7] },
    bottomLeft: { points: ['tl', 'bl'], overflow: ze, offset: [0, 7] },
    rightTop: { points: ['tr', 'tl'], overflow: ze, offset: [-4, 0] },
    leftTop: { points: ['tl', 'tr'], overflow: ze, offset: [4, 0] }
  },
  mm = {
    horizontal: 'bottomLeft',
    vertical: 'rightTop',
    'vertical-left': 'rightTop',
    'vertical-right': 'leftTop'
  },
  Yr = X({
    compatConfig: { MODE: 3 },
    name: 'PopupTrigger',
    inheritAttrs: !1,
    props: {
      prefixCls: String,
      mode: String,
      visible: Boolean,
      popupClassName: String,
      popupOffset: Array,
      disabled: Boolean,
      onVisibleChange: Function
    },
    slots: Object,
    emits: ['visibleChange'],
    setup(e, t) {
      let { slots: n, emit: o } = t
      const r = N(!1),
        {
          getPopupContainer: i,
          rtl: a,
          subMenuOpenDelay: l,
          subMenuCloseDelay: s,
          builtinPlacements: c,
          triggerSubMenuAction: d,
          forceSubMenuRender: u,
          motion: m,
          defaultMotions: p,
          rootClassName: v
        } = Me(),
        h = wa(),
        C = S(() => (a.value ? f(f({}, pm), c.value) : f(f({}, fm), c.value))),
        $ = S(() => mm[e.mode]),
        g = N()
      J(
        () => e.visible,
        P => {
          le.cancel(g.value),
            (g.value = le(() => {
              r.value = P
            }))
        },
        { immediate: !0 }
      ),
        ve(() => {
          le.cancel(g.value)
        })
      const T = P => {
          o('visibleChange', P)
        },
        z = S(() => {
          var P, x
          const b =
              m.value ||
              ((P = p.value) === null || P === void 0 ? void 0 : P[e.mode]) ||
              ((x = p.value) === null || x === void 0 ? void 0 : x.other),
            A = typeof b == 'function' ? b() : b
          return A ? ci(A.name, { css: !0 }) : void 0
        })
      return () => {
        const {
          prefixCls: P,
          popupClassName: x,
          mode: b,
          popupOffset: A,
          disabled: F
        } = e
        return y(
          yo,
          {
            prefixCls: P,
            popupClassName: oe(
              `${P}-popup`,
              { [`${P}-rtl`]: a.value },
              x,
              v.value
            ),
            stretch: b === 'horizontal' ? 'minWidth' : null,
            getPopupContainer: i.value,
            builtinPlacements: C.value,
            popupPlacement: $.value,
            popupVisible: r.value,
            popupAlign: A && { offset: A },
            action: F ? [] : [d.value],
            mouseEnterDelay: l.value,
            mouseLeaveDelay: s.value,
            onPopupVisibleChange: T,
            forceRender: h || u.value,
            popupAnimation: z.value
          },
          { popup: n.popup, default: n.default }
        )
      }
    }
  }),
  Ia = (e, t) => {
    let { slots: n, attrs: o } = t
    var r
    const { prefixCls: i, mode: a } = Me()
    return y(
      'ul',
      M(
        M({}, o),
        {},
        {
          class: oe(
            i.value,
            `${i.value}-sub`,
            `${i.value}-${a.value === 'inline' ? 'inline' : 'vertical'}`
          ),
          'data-menu-list': !0
        }
      ),
      [(r = n.default) === null || r === void 0 ? void 0 : r.call(n)]
    )
  }
Ia.displayName = 'SubMenuList'
const Ea = Ia,
  vm = X({
    compatConfig: { MODE: 3 },
    name: 'InlineSubMenuList',
    inheritAttrs: !1,
    props: { id: String, open: Boolean, keyPath: Array },
    setup(e, t) {
      let { slots: n } = t
      const o = S(() => 'inline'),
        { motion: r, mode: i, defaultMotions: a } = Me(),
        l = S(() => i.value === o.value),
        s = j(!l.value),
        c = S(() => (l.value ? e.open : !1))
      J(
        i,
        () => {
          l.value && (s.value = !1)
        },
        { flush: 'post' }
      )
      const d = S(() => {
        var u, m
        const p =
            r.value ||
            ((u = a.value) === null || u === void 0 ? void 0 : u[o.value]) ||
            ((m = a.value) === null || m === void 0 ? void 0 : m.other),
          v = typeof p == 'function' ? p() : p
        return f(f({}, v), { appear: e.keyPath.length <= 1 })
      })
      return () => {
        var u
        return s.value
          ? null
          : y(
              an,
              { mode: o.value },
              {
                default: () => [
                  y(pt, d.value, {
                    default: () => [
                      lo(
                        y(
                          Ea,
                          { id: e.id },
                          {
                            default: () => [
                              (u = n.default) === null || u === void 0
                                ? void 0
                                : u.call(n)
                            ]
                          }
                        ),
                        [[pi, c.value]]
                      )
                    ]
                  })
                ]
              }
            )
      }
    }
  })
let qr = 0
const gm = () => ({
    icon: I.any,
    title: I.any,
    disabled: Boolean,
    level: Number,
    popupClassName: String,
    popupOffset: Array,
    internalPopupClose: Boolean,
    eventKey: String,
    expandIcon: Function,
    theme: String,
    onMouseenter: Function,
    onMouseleave: Function,
    onTitleClick: Function,
    originItemValue: Be()
  }),
  ct = X({
    compatConfig: { MODE: 3 },
    name: 'ASubMenu',
    inheritAttrs: !1,
    props: gm(),
    slots: Object,
    setup(e, t) {
      let { slots: n, attrs: o, emit: r } = t
      var i, a
      Ca(!1)
      const l = Eo(),
        s = Ee(),
        c = typeof s.vnode.key == 'symbol' ? String(s.vnode.key) : s.vnode.key
      lt(
        typeof s.vnode.key != 'symbol',
        'SubMenu',
        `SubMenu \`:key="${String(c)}"\` not support Symbol type`
      )
      const d = No(c) ? c : `sub_menu_${++qr}_$$_not_set_key`,
        u =
          (i = e.eventKey) !== null && i !== void 0
            ? i
            : No(c)
            ? `sub_menu_${++qr}_$$_${c}`
            : d,
        { parentEventKeys: m, parentInfo: p, parentKeys: v } = Io(),
        h = S(() => [...v.value, d]),
        C = N([]),
        $ = {
          eventKey: u,
          key: d,
          parentEventKeys: m,
          childrenEventKeys: C,
          parentKeys: v
        }
      ;(a = p.childrenEventKeys) === null || a === void 0 || a.value.push(u),
        ve(() => {
          var ee
          p.childrenEventKeys &&
            (p.childrenEventKeys.value =
              (ee = p.childrenEventKeys) === null || ee === void 0
                ? void 0
                : ee.value.filter(ce => ce != u))
        }),
        um(u, d, $)
      const {
          prefixCls: g,
          activeKeys: T,
          disabled: z,
          changeActiveKeys: P,
          mode: x,
          inlineCollapsed: b,
          openKeys: A,
          overflowDisabled: F,
          onOpenChange: O,
          registerMenuInfo: R,
          unRegisterMenuInfo: U,
          selectedSubMenuKeys: G,
          expandIcon: Q,
          theme: w
        } = Me(),
        B = c != null,
        V = !l && (wa() || !B)
      rm(V),
        ((l && B) || (!l && !B) || V) &&
          (R(u, $),
          ve(() => {
            U(u)
          }))
      const Y = S(() => `${g.value}-submenu`),
        _ = S(() => z.value || e.disabled),
        H = N(),
        D = N(),
        q = S(() => A.value.includes(d)),
        Z = S(() => !F.value && q.value),
        fe = S(() => G.value.includes(d)),
        de = N(!1)
      J(
        T,
        () => {
          de.value = !!T.value.find(ee => ee === d)
        },
        { immediate: !0 }
      )
      const ue = ee => {
          _.value ||
            (r('titleClick', ee, d), x.value === 'inline' && O(d, !q.value))
        },
        E = ee => {
          _.value || (P(h.value), r('mouseenter', ee))
        },
        W = ee => {
          _.value || (P([]), r('mouseleave', ee))
        },
        k = Ta(S(() => h.value.length)),
        re = ee => {
          x.value !== 'inline' && O(d, ee)
        },
        ie = () => {
          P(h.value)
        },
        te = u && `${u}-popup`,
        me = S(() =>
          oe(g.value, `${g.value}-${e.theme || w.value}`, e.popupClassName)
        ),
        ae = (ee, ce) => {
          if (!ce)
            return b.value && !v.value.length && ee && typeof ee == 'string'
              ? y('div', { class: `${g.value}-inline-collapsed-noicon` }, [
                  ee.charAt(0)
                ])
              : y('span', { class: `${g.value}-title-content` }, [ee])
          const Re = ro(ee) && ee.type === 'span'
          return y(Ge, null, [
            Se(
              typeof ce == 'function' ? ce(e.originItemValue) : ce,
              { class: `${g.value}-item-icon` },
              !1
            ),
            Re ? ee : y('span', { class: `${g.value}-title-content` }, [ee])
          ])
        },
        ge = S(() =>
          x.value !== 'inline' && h.value.length > 1 ? 'vertical' : x.value
        ),
        Fe = S(() => (x.value === 'horizontal' ? 'vertical' : x.value)),
        Ha = S(() => (ge.value === 'horizontal' ? 'vertical' : ge.value)),
        Mo = () => {
          var ee, ce
          const Re = Y.value,
            bn =
              (ee = e.icon) !== null && ee !== void 0
                ? ee
                : (ce = n.icon) === null || ce === void 0
                ? void 0
                : ce.call(n, e),
            Ro = e.expandIcon || n.expandIcon || Q.value,
            yn = ae(oo(n, e, 'title'), bn)
          return y(
            'div',
            {
              style: k.value,
              class: `${Re}-title`,
              tabindex: _.value ? null : -1,
              ref: H,
              title: typeof yn == 'string' ? yn : null,
              'data-menu-id': d,
              'aria-expanded': Z.value,
              'aria-haspopup': !0,
              'aria-controls': te,
              'aria-disabled': _.value,
              onClick: ue,
              onFocus: ie
            },
            [
              yn,
              x.value !== 'horizontal' && Ro
                ? Ro(f(f({}, e), { isOpen: Z.value }))
                : y('i', { class: `${Re}-arrow` }, null)
            ]
          )
        }
      return () => {
        var ee
        if (l)
          return B
            ? (ee = n.default) === null || ee === void 0
              ? void 0
              : ee.call(n)
            : null
        const ce = Y.value
        let Re = () => null
        if (!F.value && x.value !== 'inline') {
          const bn = x.value === 'horizontal' ? [0, 8] : [10, 0]
          Re = () =>
            y(
              Yr,
              {
                mode: ge.value,
                prefixCls: ce,
                visible: !e.internalPopupClose && Z.value,
                popupClassName: me.value,
                popupOffset: e.popupOffset || bn,
                disabled: _.value,
                onVisibleChange: re
              },
              {
                default: () => [Mo()],
                popup: () =>
                  y(
                    an,
                    { mode: Ha.value },
                    {
                      default: () => [
                        y(Ea, { id: te, ref: D }, { default: n.default })
                      ]
                    }
                  )
              }
            )
        } else Re = () => y(Yr, null, { default: Mo })
        return y(
          an,
          { mode: Fe.value },
          {
            default: () => [
              y(
                xt.Item,
                M(
                  M({ component: 'li' }, o),
                  {},
                  {
                    role: 'none',
                    class: oe(ce, `${ce}-${x.value}`, o.class, {
                      [`${ce}-open`]: Z.value,
                      [`${ce}-active`]: de.value,
                      [`${ce}-selected`]: fe.value,
                      [`${ce}-disabled`]: _.value
                    }),
                    onMouseenter: E,
                    onMouseleave: W,
                    'data-submenu-id': d
                  }
                ),
                {
                  default: () =>
                    y(Ge, null, [
                      Re(),
                      !F.value &&
                        y(
                          vm,
                          { id: te, open: Z.value, keyPath: h.value },
                          { default: n.default }
                        )
                    ])
                }
              )
            ]
          }
        )
      }
    }
  })
function Pa(e, t) {
  return e.classList
    ? e.classList.contains(t)
    : ` ${e.className} `.indexOf(` ${t} `) > -1
}
function kr(e, t) {
  e.classList
    ? e.classList.add(t)
    : Pa(e, t) || (e.className = `${e.className} ${t}`)
}
function Zr(e, t) {
  if (e.classList) e.classList.remove(t)
  else if (Pa(e, t)) {
    const n = e.className
    e.className = ` ${n} `.replace(` ${t} `, ' ')
  }
}
const hm = function() {
    let e =
        arguments.length > 0 && arguments[0] !== void 0
          ? arguments[0]
          : 'ant-motion-collapse',
      t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0
    return {
      name: e,
      appear: t,
      css: !0,
      onBeforeEnter: n => {
        ;(n.style.height = '0px'), (n.style.opacity = '0'), kr(n, e)
      },
      onEnter: n => {
        Te(() => {
          ;(n.style.height = `${n.scrollHeight}px`), (n.style.opacity = '1')
        })
      },
      onAfterEnter: n => {
        n && (Zr(n, e), (n.style.height = null), (n.style.opacity = null))
      },
      onBeforeLeave: n => {
        kr(n, e),
          (n.style.height = `${n.offsetHeight}px`),
          (n.style.opacity = null)
      },
      onLeave: n => {
        setTimeout(() => {
          ;(n.style.height = '0px'), (n.style.opacity = '0')
        })
      },
      onAfterLeave: n => {
        n &&
          (Zr(n, e),
          n.style && ((n.style.height = null), (n.style.opacity = null)))
      }
    }
  },
  bm = hm,
  ym = () => ({ title: I.any, originItemValue: Be() }),
  ln = X({
    compatConfig: { MODE: 3 },
    name: 'AMenuItemGroup',
    inheritAttrs: !1,
    props: ym(),
    slots: Object,
    setup(e, t) {
      let { slots: n, attrs: o } = t
      const { prefixCls: r } = Me(),
        i = S(() => `${r.value}-item-group`),
        a = Eo()
      return () => {
        var l, s
        return a
          ? (l = n.default) === null || l === void 0
            ? void 0
            : l.call(n)
          : y(
              'li',
              M(
                M({}, o),
                {},
                { onClick: c => c.stopPropagation(), class: i.value }
              ),
              [
                y(
                  'div',
                  {
                    title: typeof e.title == 'string' ? e.title : void 0,
                    class: `${i.value}-title`
                  },
                  [oo(n, e, 'title')]
                ),
                y('ul', { class: `${i.value}-list` }, [
                  (s = n.default) === null || s === void 0 ? void 0 : s.call(n)
                ])
              ]
            )
      }
    }
  }),
  $m = () => ({ prefixCls: String, dashed: Boolean }),
  sn = X({
    compatConfig: { MODE: 3 },
    name: 'AMenuDivider',
    props: $m(),
    setup(e) {
      const { prefixCls: t } = Me(),
        n = S(() => ({
          [`${t.value}-item-divider`]: !0,
          [`${t.value}-item-divider-dashed`]: !!e.dashed
        }))
      return () => y('li', { class: n.value }, null)
    }
  })
var wm =
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
function to(e, t, n) {
  return (e || [])
    .map((o, r) => {
      if (o && typeof o == 'object') {
        const i = o,
          { label: a, children: l, key: s, type: c } = i,
          d = wm(i, ['label', 'children', 'key', 'type']),
          u = s ?? `tmp-${r}`,
          m = n ? n.parentKeys.slice() : [],
          p = [],
          v = {
            eventKey: u,
            key: u,
            parentEventKeys: j(m),
            parentKeys: j(m),
            childrenEventKeys: j(p),
            isLeaf: !1
          }
        if (l || c === 'group') {
          if (c === 'group') {
            const C = to(l, t, n)
            return y(
              ln,
              M(M({ key: u }, d), {}, { title: a, originItemValue: o }),
              { default: () => [C] }
            )
          }
          t.set(u, v), n && n.childrenEventKeys.push(u)
          const h = to(l, t, {
            childrenEventKeys: p,
            parentKeys: [].concat(m, u)
          })
          return y(
            ct,
            M(M({ key: u }, d), {}, { title: a, originItemValue: o }),
            { default: () => [h] }
          )
        }
        return c === 'divider'
          ? y(sn, M({ key: u }, d), null)
          : ((v.isLeaf = !0),
            t.set(u, v),
            y(Mt, M(M({ key: u }, d), {}, { originItemValue: o }), {
              default: () => [a]
            }))
      }
      return null
    })
    .filter(o => o)
}
function Sm(e) {
  const t = N([]),
    n = N(!1),
    o = N(new Map())
  return (
    J(
      () => e.items,
      () => {
        const r = new Map()
        ;(n.value = !1),
          e.items
            ? ((n.value = !0), (t.value = to(e.items, r)))
            : (t.value = void 0),
          (o.value = r)
      },
      { immediate: !0, deep: !0 }
    ),
    { itemsNodes: t, store: o, hasItmes: n }
  )
}
const Cm = e => {
    const {
      componentCls: t,
      motionDurationSlow: n,
      menuHorizontalHeight: o,
      colorSplit: r,
      lineWidth: i,
      lineType: a,
      menuItemPaddingInline: l
    } = e
    return {
      [`${t}-horizontal`]: {
        lineHeight: `${o}px`,
        border: 0,
        borderBottom: `${i}px ${a} ${r}`,
        boxShadow: 'none',
        '&::after': {
          display: 'block',
          clear: 'both',
          height: 0,
          content: '"\\20"'
        },
        [`${t}-item, ${t}-submenu`]: {
          position: 'relative',
          display: 'inline-block',
          verticalAlign: 'bottom',
          paddingInline: l
        },
        [`> ${t}-item:hover,
        > ${t}-item-active,
        > ${t}-submenu ${t}-submenu-title:hover`]: {
          backgroundColor: 'transparent'
        },
        [`${t}-item, ${t}-submenu-title`]: {
          transition: [`border-color ${n}`, `background ${n}`].join(',')
        },
        [`${t}-submenu-arrow`]: { display: 'none' }
      }
    }
  },
  xm = Cm,
  Om = e => {
    let { componentCls: t, menuArrowOffset: n } = e
    return {
      [`${t}-rtl`]: { direction: 'rtl' },
      [`${t}-submenu-rtl`]: { transformOrigin: '100% 0' },
      [`${t}-rtl${t}-vertical,
    ${t}-submenu-rtl ${t}-vertical`]: {
        [`${t}-submenu-arrow`]: {
          '&::before': { transform: `rotate(-45deg) translateY(-${n})` },
          '&::after': { transform: `rotate(45deg) translateY(${n})` }
        }
      }
    }
  },
  Tm = Om,
  Qr = e => f({}, Ja(e)),
  Im = (e, t) => {
    const {
      componentCls: n,
      colorItemText: o,
      colorItemTextSelected: r,
      colorGroupTitle: i,
      colorItemBg: a,
      colorSubItemBg: l,
      colorItemBgSelected: s,
      colorActiveBarHeight: c,
      colorActiveBarWidth: d,
      colorActiveBarBorderSize: u,
      motionDurationSlow: m,
      motionEaseInOut: p,
      motionEaseOut: v,
      menuItemPaddingInline: h,
      motionDurationMid: C,
      colorItemTextHover: $,
      lineType: g,
      colorSplit: T,
      colorItemTextDisabled: z,
      colorDangerItemText: P,
      colorDangerItemTextHover: x,
      colorDangerItemTextSelected: b,
      colorDangerItemBgActive: A,
      colorDangerItemBgSelected: F,
      colorItemBgHover: O,
      menuSubMenuBg: R,
      colorItemTextSelectedHorizontal: U,
      colorItemBgSelectedHorizontal: G
    } = e
    return {
      [`${n}-${t}`]: {
        color: o,
        background: a,
        [`&${n}-root:focus-visible`]: f({}, Qr(e)),
        [`${n}-item-group-title`]: { color: i },
        [`${n}-submenu-selected`]: { [`> ${n}-submenu-title`]: { color: r } },
        [`${n}-item-disabled, ${n}-submenu-disabled`]: {
          color: `${z} !important`
        },
        [`${n}-item:hover, ${n}-submenu-title:hover`]: {
          [`&:not(${n}-item-selected):not(${n}-submenu-selected)`]: { color: $ }
        },
        [`&:not(${n}-horizontal)`]: {
          [`${n}-item:not(${n}-item-selected)`]: {
            '&:hover': { backgroundColor: O },
            '&:active': { backgroundColor: s }
          },
          [`${n}-submenu-title`]: {
            '&:hover': { backgroundColor: O },
            '&:active': { backgroundColor: s }
          }
        },
        [`${n}-item-danger`]: {
          color: P,
          [`&${n}-item:hover`]: {
            [`&:not(${n}-item-selected):not(${n}-submenu-selected)`]: {
              color: x
            }
          },
          [`&${n}-item:active`]: { background: A }
        },
        [`${n}-item a`]: { '&, &:hover': { color: 'inherit' } },
        [`${n}-item-selected`]: {
          color: r,
          [`&${n}-item-danger`]: { color: b },
          'a, a:hover': { color: 'inherit' }
        },
        [`& ${n}-item-selected`]: {
          backgroundColor: s,
          [`&${n}-item-danger`]: { backgroundColor: F }
        },
        [`${n}-item, ${n}-submenu-title`]: {
          [`&:not(${n}-item-disabled):focus-visible`]: f({}, Qr(e))
        },
        [`&${n}-submenu > ${n}`]: { backgroundColor: R },
        [`&${n}-popup > ${n}`]: { backgroundColor: a },
        [`&${n}-horizontal`]: f(
          f({}, t === 'dark' ? { borderBottom: 0 } : {}),
          {
            [`> ${n}-item, > ${n}-submenu`]: {
              top: u,
              marginTop: -u,
              marginBottom: 0,
              borderRadius: 0,
              '&::after': {
                position: 'absolute',
                insetInline: h,
                bottom: 0,
                borderBottom: `${c}px solid transparent`,
                transition: `border-color ${m} ${p}`,
                content: '""'
              },
              '&:hover, &-active, &-open': {
                '&::after': { borderBottomWidth: c, borderBottomColor: U }
              },
              '&-selected': {
                color: U,
                backgroundColor: G,
                '&::after': { borderBottomWidth: c, borderBottomColor: U }
              }
            }
          }
        ),
        [`&${n}-root`]: {
          [`&${n}-inline, &${n}-vertical`]: {
            borderInlineEnd: `${u}px ${g} ${T}`
          }
        },
        [`&${n}-inline`]: {
          [`${n}-sub${n}-inline`]: { background: l },
          [`${n}-item, ${n}-submenu-title`]:
            u && d ? { width: `calc(100% + ${u}px)` } : {},
          [`${n}-item`]: {
            position: 'relative',
            '&::after': {
              position: 'absolute',
              insetBlock: 0,
              insetInlineEnd: 0,
              borderInlineEnd: `${d}px solid ${r}`,
              transform: 'scaleY(0.0001)',
              opacity: 0,
              transition: [`transform ${C} ${v}`, `opacity ${C} ${v}`].join(
                ','
              ),
              content: '""'
            },
            [`&${n}-item-danger`]: { '&::after': { borderInlineEndColor: b } }
          },
          [`${n}-selected, ${n}-item-selected`]: {
            '&::after': {
              transform: 'scaleY(1)',
              opacity: 1,
              transition: [`transform ${C} ${p}`, `opacity ${C} ${p}`].join(',')
            }
          }
        }
      }
    }
  },
  Jr = Im,
  ei = e => {
    const {
        componentCls: t,
        menuItemHeight: n,
        itemMarginInline: o,
        padding: r,
        menuArrowSize: i,
        marginXS: a,
        marginXXS: l
      } = e,
      s = r + i + a
    return {
      [`${t}-item`]: { position: 'relative' },
      [`${t}-item, ${t}-submenu-title`]: {
        height: n,
        lineHeight: `${n}px`,
        paddingInline: r,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        marginInline: o,
        marginBlock: l,
        width: `calc(100% - ${o * 2}px)`
      },
      [`${t}-submenu`]: { paddingBottom: 0.02 },
      [`> ${t}-item,
            > ${t}-submenu > ${t}-submenu-title`]: {
        height: n,
        lineHeight: `${n}px`
      },
      [`${t}-item-group-list ${t}-submenu-title,
            ${t}-submenu-title`]: { paddingInlineEnd: s }
    }
  },
  Em = e => {
    const {
        componentCls: t,
        iconCls: n,
        menuItemHeight: o,
        colorTextLightSolid: r,
        dropdownWidth: i,
        controlHeightLG: a,
        motionDurationMid: l,
        motionEaseOut: s,
        paddingXL: c,
        fontSizeSM: d,
        fontSizeLG: u,
        motionDurationSlow: m,
        paddingXS: p,
        boxShadowSecondary: v
      } = e,
      h = {
        height: o,
        lineHeight: `${o}px`,
        listStylePosition: 'inside',
        listStyleType: 'disc'
      }
    return [
      {
        [t]: {
          '&-inline, &-vertical': f(
            { [`&${t}-root`]: { boxShadow: 'none' } },
            ei(e)
          )
        },
        [`${t}-submenu-popup`]: {
          [`${t}-vertical`]: f(f({}, ei(e)), { boxShadow: v })
        }
      },
      {
        [`${t}-submenu-popup ${t}-vertical${t}-sub`]: {
          minWidth: i,
          maxHeight: `calc(100vh - ${a * 2.5}px)`,
          padding: '0',
          overflow: 'hidden',
          borderInlineEnd: 0,
          "&:not([class*='-active'])": {
            overflowX: 'hidden',
            overflowY: 'auto'
          }
        }
      },
      {
        [`${t}-inline`]: {
          width: '100%',
          [`&${t}-root`]: {
            [`${t}-item, ${t}-submenu-title`]: {
              display: 'flex',
              alignItems: 'center',
              transition: [
                `border-color ${m}`,
                `background ${m}`,
                `padding ${l} ${s}`
              ].join(','),
              [`> ${t}-title-content`]: {
                flex: 'auto',
                minWidth: 0,
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              },
              '> *': { flex: 'none' }
            }
          },
          [`${t}-sub${t}-inline`]: {
            padding: 0,
            border: 0,
            borderRadius: 0,
            boxShadow: 'none',
            [`& > ${t}-submenu > ${t}-submenu-title`]: h,
            [`& ${t}-item-group-title`]: { paddingInlineStart: c }
          },
          [`${t}-item`]: h
        }
      },
      {
        [`${t}-inline-collapsed`]: {
          width: o * 2,
          [`&${t}-root`]: {
            [`${t}-item, ${t}-submenu ${t}-submenu-title`]: {
              [`> ${t}-inline-collapsed-noicon`]: {
                fontSize: u,
                textAlign: 'center'
              }
            }
          },
          [`> ${t}-item,
          > ${t}-item-group > ${t}-item-group-list > ${t}-item,
          > ${t}-item-group > ${t}-item-group-list > ${t}-submenu > ${t}-submenu-title,
          > ${t}-submenu > ${t}-submenu-title`]: {
            insetInlineStart: 0,
            paddingInline: `calc(50% - ${d}px)`,
            textOverflow: 'clip',
            [`
            ${t}-submenu-arrow,
            ${t}-submenu-expand-icon
          `]: { opacity: 0 },
            [`${t}-item-icon, ${n}`]: {
              margin: 0,
              fontSize: u,
              lineHeight: `${o}px`,
              '+ span': { display: 'inline-block', opacity: 0 }
            }
          },
          [`${t}-item-icon, ${n}`]: { display: 'inline-block' },
          '&-tooltip': {
            pointerEvents: 'none',
            [`${t}-item-icon, ${n}`]: { display: 'none' },
            'a, a:hover': { color: r }
          },
          [`${t}-item-group-title`]: f(f({}, el), { paddingInline: p })
        }
      }
    ]
  },
  Pm = Em,
  ti = e => {
    const {
      componentCls: t,
      fontSize: n,
      motionDurationSlow: o,
      motionDurationMid: r,
      motionEaseInOut: i,
      motionEaseOut: a,
      iconCls: l,
      controlHeightSM: s
    } = e
    return {
      [`${t}-item, ${t}-submenu-title`]: {
        position: 'relative',
        display: 'block',
        margin: 0,
        whiteSpace: 'nowrap',
        cursor: 'pointer',
        transition: [
          `border-color ${o}`,
          `background ${o}`,
          `padding ${o} ${i}`
        ].join(','),
        [`${t}-item-icon, ${l}`]: {
          minWidth: n,
          fontSize: n,
          transition: [
            `font-size ${r} ${a}`,
            `margin ${o} ${i}`,
            `color ${o}`
          ].join(','),
          '+ span': {
            marginInlineStart: s - n,
            opacity: 1,
            transition: [`opacity ${o} ${i}`, `margin ${o}`, `color ${o}`].join(
              ','
            )
          }
        },
        [`${t}-item-icon`]: f({}, tl()),
        [`&${t}-item-only-child`]: {
          [`> ${l}, > ${t}-item-icon`]: { marginInlineEnd: 0 }
        }
      },
      [`${t}-item-disabled, ${t}-submenu-disabled`]: {
        background: 'none !important',
        cursor: 'not-allowed',
        '&::after': { borderColor: 'transparent !important' },
        a: { color: 'inherit !important' },
        [`> ${t}-submenu-title`]: {
          color: 'inherit !important',
          cursor: 'not-allowed'
        }
      }
    }
  },
  ni = e => {
    const {
      componentCls: t,
      motionDurationSlow: n,
      motionEaseInOut: o,
      borderRadius: r,
      menuArrowSize: i,
      menuArrowOffset: a
    } = e
    return {
      [`${t}-submenu`]: {
        '&-expand-icon, &-arrow': {
          position: 'absolute',
          top: '50%',
          insetInlineEnd: e.margin,
          width: i,
          color: 'currentcolor',
          transform: 'translateY(-50%)',
          transition: `transform ${n} ${o}, opacity ${n}`
        },
        '&-arrow': {
          '&::before, &::after': {
            position: 'absolute',
            width: i * 0.6,
            height: i * 0.15,
            backgroundColor: 'currentcolor',
            borderRadius: r,
            transition: [
              `background ${n} ${o}`,
              `transform ${n} ${o}`,
              `top ${n} ${o}`,
              `color ${n} ${o}`
            ].join(','),
            content: '""'
          },
          '&::before': { transform: `rotate(45deg) translateY(-${a})` },
          '&::after': { transform: `rotate(-45deg) translateY(${a})` }
        }
      }
    }
  },
  _m = e => {
    const {
      antCls: t,
      componentCls: n,
      fontSize: o,
      motionDurationSlow: r,
      motionDurationMid: i,
      motionEaseInOut: a,
      lineHeight: l,
      paddingXS: s,
      padding: c,
      colorSplit: d,
      lineWidth: u,
      zIndexPopup: m,
      borderRadiusLG: p,
      radiusSubMenuItem: v,
      menuArrowSize: h,
      menuArrowOffset: C,
      lineType: $,
      menuPanelMaskInset: g
    } = e
    return [
      {
        '': { [`${n}`]: f(f({}, Nn()), { '&-hidden': { display: 'none' } }) },
        [`${n}-submenu-hidden`]: { display: 'none' }
      },
      {
        [n]: f(
          f(
            f(
              f(
                f(f(f({}, un(e)), Nn()), {
                  marginBottom: 0,
                  paddingInlineStart: 0,
                  fontSize: o,
                  lineHeight: 0,
                  listStyle: 'none',
                  outline: 'none',
                  transition: `width ${r} cubic-bezier(0.2, 0, 0, 1) 0s`,
                  'ul, ol': { margin: 0, padding: 0, listStyle: 'none' },
                  '&-overflow': {
                    display: 'flex',
                    [`${n}-item`]: { flex: 'none' }
                  },
                  [`${n}-item, ${n}-submenu, ${n}-submenu-title`]: {
                    borderRadius: e.radiusItem
                  },
                  [`${n}-item-group-title`]: {
                    padding: `${s}px ${c}px`,
                    fontSize: o,
                    lineHeight: l,
                    transition: `all ${r}`
                  },
                  [`&-horizontal ${n}-submenu`]: {
                    transition: [
                      `border-color ${r} ${a}`,
                      `background ${r} ${a}`
                    ].join(',')
                  },
                  [`${n}-submenu, ${n}-submenu-inline`]: {
                    transition: [
                      `border-color ${r} ${a}`,
                      `background ${r} ${a}`,
                      `padding ${i} ${a}`
                    ].join(',')
                  },
                  [`${n}-submenu ${n}-sub`]: {
                    cursor: 'initial',
                    transition: [
                      `background ${r} ${a}`,
                      `padding ${r} ${a}`
                    ].join(',')
                  },
                  [`${n}-title-content`]: { transition: `color ${r}` },
                  [`${n}-item a`]: {
                    '&::before': {
                      position: 'absolute',
                      inset: 0,
                      backgroundColor: 'transparent',
                      content: '""'
                    }
                  },
                  [`${n}-item-divider`]: {
                    overflow: 'hidden',
                    lineHeight: 0,
                    borderColor: d,
                    borderStyle: $,
                    borderWidth: 0,
                    borderTopWidth: u,
                    marginBlock: u,
                    padding: 0,
                    '&-dashed': { borderStyle: 'dashed' }
                  }
                }),
                ti(e)
              ),
              {
                [`${n}-item-group`]: {
                  [`${n}-item-group-list`]: {
                    margin: 0,
                    padding: 0,
                    [`${n}-item, ${n}-submenu-title`]: {
                      paddingInline: `${o * 2}px ${c}px`
                    }
                  }
                },
                '&-submenu': {
                  '&-popup': {
                    position: 'absolute',
                    zIndex: m,
                    background: 'transparent',
                    borderRadius: p,
                    boxShadow: 'none',
                    transformOrigin: '0 0',
                    '&::before': {
                      position: 'absolute',
                      inset: `${g}px 0 0`,
                      zIndex: -1,
                      width: '100%',
                      height: '100%',
                      opacity: 0,
                      content: '""'
                    }
                  },
                  '&-placement-rightTop::before': {
                    top: 0,
                    insetInlineStart: g
                  },
                  [`> ${n}`]: f(f(f({ borderRadius: p }, ti(e)), ni(e)), {
                    [`${n}-item, ${n}-submenu > ${n}-submenu-title`]: {
                      borderRadius: v
                    },
                    [`${n}-submenu-title::after`]: {
                      transition: `transform ${r} ${a}`
                    }
                  })
                }
              }
            ),
            ni(e)
          ),
          {
            [`&-inline-collapsed ${n}-submenu-arrow,
        &-inline ${n}-submenu-arrow`]: {
              '&::before': { transform: `rotate(-45deg) translateX(${C})` },
              '&::after': { transform: `rotate(45deg) translateX(-${C})` }
            },
            [`${n}-submenu-open${n}-submenu-inline > ${n}-submenu-title > ${n}-submenu-arrow`]: {
              transform: `translateY(-${h * 0.2}px)`,
              '&::after': { transform: `rotate(-45deg) translateX(-${C})` },
              '&::before': { transform: `rotate(45deg) translateX(${C})` }
            }
          }
        )
      },
      { [`${t}-layout-header`]: { [n]: { lineHeight: 'inherit' } } }
    ]
  },
  Am = (e, t) =>
    ft(
      'Menu',
      (o, r) => {
        let { overrideComponentToken: i } = r
        if ((t == null ? void 0 : t.value) === !1) return []
        const {
            colorBgElevated: a,
            colorPrimary: l,
            colorError: s,
            colorErrorHover: c,
            colorTextLightSolid: d
          } = o,
          { controlHeightLG: u, fontSize: m } = o,
          p = (m / 7) * 5,
          v = Ce(o, {
            menuItemHeight: u,
            menuItemPaddingInline: o.margin,
            menuArrowSize: p,
            menuHorizontalHeight: u * 1.15,
            menuArrowOffset: `${p * 0.25}px`,
            menuPanelMaskInset: -7,
            menuSubMenuBg: a
          }),
          h = new Fo(d).setAlpha(0.65).toRgbString(),
          C = Ce(
            v,
            {
              colorItemText: h,
              colorItemTextHover: d,
              colorGroupTitle: h,
              colorItemTextSelected: d,
              colorItemBg: '#001529',
              colorSubItemBg: '#000c17',
              colorItemBgActive: 'transparent',
              colorItemBgSelected: l,
              colorActiveBarWidth: 0,
              colorActiveBarHeight: 0,
              colorActiveBarBorderSize: 0,
              colorItemTextDisabled: new Fo(d).setAlpha(0.25).toRgbString(),
              colorDangerItemText: s,
              colorDangerItemTextHover: c,
              colorDangerItemTextSelected: d,
              colorDangerItemBgActive: s,
              colorDangerItemBgSelected: s,
              menuSubMenuBg: '#001529',
              colorItemTextSelectedHorizontal: d,
              colorItemBgSelectedHorizontal: l
            },
            f({}, i)
          )
        return [
          _m(v),
          xm(v),
          Pm(v),
          Jr(v, 'light'),
          Jr(C, 'dark'),
          Tm(v),
          kf(v),
          Rr(v, 'slide-up'),
          Rr(v, 'slide-down'),
          ua(v, 'zoom-big')
        ]
      },
      o => {
        const {
          colorPrimary: r,
          colorError: i,
          colorTextDisabled: a,
          colorErrorBg: l,
          colorText: s,
          colorTextDescription: c,
          colorBgContainer: d,
          colorFillAlter: u,
          colorFillContent: m,
          lineWidth: p,
          lineWidthBold: v,
          controlItemBgActive: h,
          colorBgTextHover: C
        } = o
        return {
          dropdownWidth: 160,
          zIndexPopup: o.zIndexPopupBase + 50,
          radiusItem: o.borderRadiusLG,
          radiusSubMenuItem: o.borderRadiusSM,
          colorItemText: s,
          colorItemTextHover: s,
          colorItemTextHoverHorizontal: r,
          colorGroupTitle: c,
          colorItemTextSelected: r,
          colorItemTextSelectedHorizontal: r,
          colorItemBg: d,
          colorItemBgHover: C,
          colorItemBgActive: m,
          colorSubItemBg: u,
          colorItemBgSelected: h,
          colorItemBgSelectedHorizontal: 'transparent',
          colorActiveBarWidth: 0,
          colorActiveBarHeight: v,
          colorActiveBarBorderSize: p,
          colorItemTextDisabled: a,
          colorDangerItemText: i,
          colorDangerItemTextHover: i,
          colorDangerItemTextSelected: i,
          colorDangerItemBgActive: l,
          colorDangerItemBgSelected: l,
          itemMarginInline: o.marginXXS
        }
      }
    )(e),
  Mm = () => ({
    id: String,
    prefixCls: String,
    items: Array,
    disabled: Boolean,
    inlineCollapsed: Boolean,
    disabledOverflow: Boolean,
    forceSubMenuRender: Boolean,
    openKeys: Array,
    selectedKeys: Array,
    activeKey: String,
    selectable: { type: Boolean, default: !0 },
    multiple: { type: Boolean, default: !1 },
    tabindex: { type: [Number, String] },
    motion: Object,
    role: String,
    theme: { type: String, default: 'light' },
    mode: { type: String, default: 'vertical' },
    inlineIndent: { type: Number, default: 24 },
    subMenuOpenDelay: { type: Number, default: 0 },
    subMenuCloseDelay: { type: Number, default: 0.1 },
    builtinPlacements: { type: Object },
    triggerSubMenuAction: { type: String, default: 'hover' },
    getPopupContainer: Function,
    expandIcon: Function,
    onOpenChange: Function,
    onSelect: Function,
    onDeselect: Function,
    onClick: [Function, Array],
    onFocus: Function,
    onBlur: Function,
    onMousedown: Function,
    'onUpdate:openKeys': Function,
    'onUpdate:selectedKeys': Function,
    'onUpdate:activeKey': Function
  }),
  oi = [],
  Ue = X({
    compatConfig: { MODE: 3 },
    name: 'AMenu',
    inheritAttrs: !1,
    props: Mm(),
    slots: Object,
    setup(e, t) {
      let { slots: n, emit: o, attrs: r } = t
      const { direction: i, getPrefixCls: a } = He('menu', e),
        l = ha(),
        s = S(() => {
          var E
          return a(
            'menu',
            e.prefixCls ||
              ((E = l == null ? void 0 : l.prefixCls) === null || E === void 0
                ? void 0
                : E.value)
          )
        }),
        [c, d] = Am(
          s,
          S(() => !l)
        ),
        u = N(new Map()),
        m = we(lm, j(void 0)),
        p = S(() => (m.value !== void 0 ? m.value : e.inlineCollapsed)),
        { itemsNodes: v } = Sm(e),
        h = N(!1)
      Pe(() => {
        h.value = !0
      }),
        Oe(() => {
          lt(
            !(e.inlineCollapsed === !0 && e.mode !== 'inline'),
            'Menu',
            '`inlineCollapsed` should only be used when `mode` is inline.'
          ),
            lt(
              !(m.value !== void 0 && e.inlineCollapsed === !0),
              'Menu',
              '`inlineCollapsed` not control Menu under Sider. Should set `collapsed` on Sider instead.'
            )
        })
      const C = j([]),
        $ = j([]),
        g = j({})
      J(
        u,
        () => {
          const E = {}
          for (const W of u.value.values()) E[W.key] = W
          g.value = E
        },
        { flush: 'post' }
      ),
        Oe(() => {
          if (e.activeKey !== void 0) {
            let E = []
            const W = e.activeKey ? g.value[e.activeKey] : void 0
            W && e.activeKey !== void 0
              ? (E = Pn([].concat($t(W.parentKeys), e.activeKey)))
              : (E = []),
              yt(C.value, E) || (C.value = E)
          }
        }),
        J(
          () => e.selectedKeys,
          E => {
            E && ($.value = E.slice())
          },
          { immediate: !0, deep: !0 }
        )
      const T = j([])
      J(
        [g, $],
        () => {
          let E = []
          $.value.forEach(W => {
            const k = g.value[W]
            k && (E = E.concat($t(k.parentKeys)))
          }),
            (E = Pn(E)),
            yt(T.value, E) || (T.value = E)
        },
        { immediate: !0 }
      )
      const z = E => {
          if (e.selectable) {
            const { key: W } = E,
              k = $.value.includes(W)
            let re
            e.multiple
              ? k
                ? (re = $.value.filter(te => te !== W))
                : (re = [...$.value, W])
              : (re = [W])
            const ie = f(f({}, E), { selectedKeys: re })
            yt(re, $.value) ||
              (e.selectedKeys === void 0 && ($.value = re),
              o('update:selectedKeys', re),
              k && e.multiple ? o('deselect', ie) : o('select', ie))
          }
          O.value !== 'inline' && !e.multiple && P.value.length && G(oi)
        },
        P = j([])
      J(
        () => e.openKeys,
        function() {
          let E =
            arguments.length > 0 && arguments[0] !== void 0
              ? arguments[0]
              : P.value
          yt(P.value, E) || (P.value = E.slice())
        },
        { immediate: !0, deep: !0 }
      )
      let x
      const b = E => {
          clearTimeout(x),
            (x = setTimeout(() => {
              e.activeKey === void 0 && (C.value = E),
                o('update:activeKey', E[E.length - 1])
            }))
        },
        A = S(() => !!e.disabled),
        F = S(() => i.value === 'rtl'),
        O = j('vertical'),
        R = N(!1)
      Oe(() => {
        var E
        ;(e.mode === 'inline' || e.mode === 'vertical') && p.value
          ? ((O.value = 'vertical'), (R.value = p.value))
          : ((O.value = e.mode), (R.value = !1)),
          !((E = l == null ? void 0 : l.mode) === null || E === void 0) &&
            E.value &&
            (O.value = l.mode.value)
      })
      const U = S(() => O.value === 'inline'),
        G = E => {
          ;(P.value = E), o('update:openKeys', E), o('openChange', E)
        },
        Q = j(P.value),
        w = N(!1)
      J(
        P,
        () => {
          U.value && (Q.value = P.value)
        },
        { immediate: !0 }
      ),
        J(
          U,
          () => {
            if (!w.value) {
              w.value = !0
              return
            }
            U.value ? (P.value = Q.value) : G(oi)
          },
          { immediate: !0 }
        )
      const B = S(() => ({
          [`${s.value}`]: !0,
          [`${s.value}-root`]: !0,
          [`${s.value}-${O.value}`]: !0,
          [`${s.value}-inline-collapsed`]: R.value,
          [`${s.value}-rtl`]: F.value,
          [`${s.value}-${e.theme}`]: !0
        })),
        V = S(() => a()),
        Y = S(() => ({
          horizontal: { name: `${V.value}-slide-up` },
          inline: bm(`${V.value}-motion-collapse`),
          other: { name: `${V.value}-zoom-big` }
        }))
      Ca(!0)
      const _ = function() {
          let E =
            arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : []
          const W = [],
            k = u.value
          return (
            E.forEach(re => {
              const { key: ie, childrenEventKeys: te } = k.get(re)
              W.push(ie, ..._($t(te)))
            }),
            W
          )
        },
        H = E => {
          var W
          o('click', E),
            z(E),
            (W = l == null ? void 0 : l.onClick) === null ||
              W === void 0 ||
              W.call(l)
        },
        D = (E, W) => {
          var k
          const re =
            ((k = g.value[E]) === null || k === void 0
              ? void 0
              : k.childrenEventKeys) || []
          let ie = P.value.filter(te => te !== E)
          if (W) ie.push(E)
          else if (O.value !== 'inline') {
            const te = _($t(re))
            ie = Pn(ie.filter(me => !te.includes(me)))
          }
          yt(P, ie) || G(ie)
        },
        q = (E, W) => {
          u.value.set(E, W), (u.value = new Map(u.value))
        },
        Z = E => {
          u.value.delete(E), (u.value = new Map(u.value))
        },
        fe = j(0),
        de = S(() => {
          var E
          return e.expandIcon ||
            n.expandIcon ||
            (!(
              (E = l == null ? void 0 : l.expandIcon) === null || E === void 0
            ) &&
              E.value)
            ? W => {
                let k = e.expandIcon || n.expandIcon
                return (
                  (k = typeof k == 'function' ? k(W) : k),
                  Se(k, { class: `${s.value}-submenu-expand-icon` }, !1)
                )
              }
            : null
        })
      am({
        prefixCls: s,
        activeKeys: C,
        openKeys: P,
        selectedKeys: $,
        changeActiveKeys: b,
        disabled: A,
        rtl: F,
        mode: O,
        inlineIndent: S(() => e.inlineIndent),
        subMenuCloseDelay: S(() => e.subMenuCloseDelay),
        subMenuOpenDelay: S(() => e.subMenuOpenDelay),
        builtinPlacements: S(() => e.builtinPlacements),
        triggerSubMenuAction: S(() => e.triggerSubMenuAction),
        getPopupContainer: S(() => e.getPopupContainer),
        inlineCollapsed: R,
        theme: S(() => e.theme),
        siderCollapsed: m,
        defaultMotions: S(() => (h.value ? Y.value : null)),
        motion: S(() => (h.value ? e.motion : null)),
        overflowDisabled: N(void 0),
        onOpenChange: D,
        onItemClick: H,
        registerMenuInfo: q,
        unRegisterMenuInfo: Z,
        selectedSubMenuKeys: T,
        expandIcon: de,
        forceSubMenuRender: S(() => e.forceSubMenuRender),
        rootClassName: d
      })
      const ue = () => {
        var E
        return (
          v.value ||
          Ye((E = n.default) === null || E === void 0 ? void 0 : E.call(n))
        )
      }
      return () => {
        var E
        const W = ue(),
          k =
            fe.value >= W.length - 1 ||
            O.value !== 'horizontal' ||
            e.disabledOverflow,
          re = te =>
            O.value !== 'horizontal' || e.disabledOverflow
              ? te
              : te.map((me, ae) =>
                  y(
                    an,
                    { key: me.key, overflowDisabled: ae > fe.value },
                    { default: () => me }
                  )
                ),
          ie =
            ((E = n.overflowedIndicator) === null || E === void 0
              ? void 0
              : E.call(n)) || y(tm, null, null)
        return c(
          y(
            xt,
            M(
              M({}, r),
              {},
              {
                onMousedown: e.onMousedown,
                prefixCls: `${s.value}-overflow`,
                component: 'ul',
                itemComponent: Mt,
                class: [B.value, r.class, d.value],
                role: 'menu',
                id: e.id,
                data: re(W),
                renderRawItem: te => te,
                renderRawRest: te => {
                  const me = te.length,
                    ae = me ? W.slice(-me) : null
                  return y(Ge, null, [
                    y(
                      ct,
                      {
                        eventKey: Wt,
                        key: Wt,
                        title: ie,
                        disabled: k,
                        internalPopupClose: me === 0
                      },
                      { default: () => ae }
                    ),
                    y(Xr, null, {
                      default: () => [
                        y(
                          ct,
                          {
                            eventKey: Wt,
                            key: Wt,
                            title: ie,
                            disabled: k,
                            internalPopupClose: me === 0
                          },
                          { default: () => ae }
                        )
                      ]
                    })
                  ])
                },
                maxCount:
                  O.value !== 'horizontal' || e.disabledOverflow
                    ? xt.INVALIDATE
                    : xt.RESPONSIVE,
                ssr: 'full',
                'data-menu-list': !0,
                onVisibleChange: te => {
                  fe.value = te
                }
              }
            ),
            {
              default: () => [
                y(
                  ul,
                  { to: 'body' },
                  {
                    default: () => [
                      y(
                        'div',
                        { style: { display: 'none' }, 'aria-hidden': !0 },
                        [y(Xr, null, { default: () => [re(ue())] })]
                      )
                    ]
                  }
                )
              ]
            }
          )
        )
      }
    }
  })
Ue.install = function(e) {
  return (
    e.component(Ue.name, Ue),
    e.component(Mt.name, Mt),
    e.component(ct.name, ct),
    e.component(sn.name, sn),
    e.component(ln.name, ln),
    e
  )
}
Ue.Item = Mt
Ue.Divider = sn
Ue.SubMenu = ct
Ue.ItemGroup = ln
const Rm = e => ({
    '&::-moz-placeholder': { opacity: 1 },
    '&::placeholder': { color: e, userSelect: 'none' },
    '&:placeholder-shown': { textOverflow: 'ellipsis' }
  }),
  Po = e => ({
    borderColor: e.inputBorderHoverColor,
    borderInlineEndWidth: e.lineWidth
  }),
  no = e => ({
    borderColor: e.inputBorderHoverColor,
    boxShadow: `0 0 0 ${e.controlOutlineWidth}px ${e.controlOutline}`,
    borderInlineEndWidth: e.lineWidth,
    outline: 0
  }),
  Dm = e => ({
    color: e.colorTextDisabled,
    backgroundColor: e.colorBgContainerDisabled,
    borderColor: e.colorBorder,
    boxShadow: 'none',
    cursor: 'not-allowed',
    opacity: 1,
    '&:hover': f({}, Po(Ce(e, { inputBorderHoverColor: e.colorBorder })))
  }),
  _a = e => {
    const {
      inputPaddingVerticalLG: t,
      fontSizeLG: n,
      lineHeightLG: o,
      borderRadiusLG: r,
      inputPaddingHorizontalLG: i
    } = e
    return {
      padding: `${t}px ${i}px`,
      fontSize: n,
      lineHeight: o,
      borderRadius: r
    }
  },
  Aa = e => ({
    padding: `${e.inputPaddingVerticalSM}px ${e.controlPaddingHorizontalSM -
      1}px`,
    borderRadius: e.borderRadiusSM
  }),
  Ma = (e, t) => {
    const {
      componentCls: n,
      colorError: o,
      colorWarning: r,
      colorErrorOutline: i,
      colorWarningOutline: a,
      colorErrorBorderHover: l,
      colorWarningBorderHover: s
    } = e
    return {
      [`&-status-error:not(${t}-disabled):not(${t}-borderless)${t}`]: {
        borderColor: o,
        '&:hover': { borderColor: l },
        '&:focus, &-focused': f(
          {},
          no(
            Ce(e, {
              inputBorderActiveColor: o,
              inputBorderHoverColor: o,
              controlOutline: i
            })
          )
        ),
        [`${n}-prefix`]: { color: o }
      },
      [`&-status-warning:not(${t}-disabled):not(${t}-borderless)${t}`]: {
        borderColor: r,
        '&:hover': { borderColor: s },
        '&:focus, &-focused': f(
          {},
          no(
            Ce(e, {
              inputBorderActiveColor: r,
              inputBorderHoverColor: r,
              controlOutline: a
            })
          )
        ),
        [`${n}-prefix`]: { color: r }
      }
    }
  },
  Ra = e =>
    f(
      f(
        {
          position: 'relative',
          display: 'inline-block',
          width: '100%',
          minWidth: 0,
          padding: `${e.inputPaddingVertical}px ${e.inputPaddingHorizontal}px`,
          color: e.colorText,
          fontSize: e.fontSize,
          lineHeight: e.lineHeight,
          backgroundColor: e.colorBgContainer,
          backgroundImage: 'none',
          borderWidth: e.lineWidth,
          borderStyle: e.lineType,
          borderColor: e.colorBorder,
          borderRadius: e.borderRadius,
          transition: `all ${e.motionDurationMid}`
        },
        Rm(e.colorTextPlaceholder)
      ),
      {
        '&:hover': f({}, Po(e)),
        '&:focus, &-focused': f({}, no(e)),
        '&-disabled, &[disabled]': f({}, Dm(e)),
        '&-borderless': {
          '&, &:hover, &:focus, &-focused, &-disabled, &[disabled]': {
            backgroundColor: 'transparent',
            border: 'none',
            boxShadow: 'none'
          }
        },
        'textarea&': {
          maxWidth: '100%',
          height: 'auto',
          minHeight: e.controlHeight,
          lineHeight: e.lineHeight,
          verticalAlign: 'bottom',
          transition: `all ${e.motionDurationSlow}, height 0s`,
          resize: 'vertical'
        },
        '&-lg': f({}, _a(e)),
        '&-sm': f({}, Aa(e)),
        '&-rtl': { direction: 'rtl' },
        '&-textarea-rtl': { direction: 'rtl' }
      }
    ),
  Bm = e => {
    const { componentCls: t, antCls: n } = e
    return {
      position: 'relative',
      display: 'table',
      width: '100%',
      borderCollapse: 'separate',
      borderSpacing: 0,
      "&[class*='col-']": {
        paddingInlineEnd: e.paddingXS,
        '&:last-child': { paddingInlineEnd: 0 }
      },
      [`&-lg ${t}, &-lg > ${t}-group-addon`]: f({}, _a(e)),
      [`&-sm ${t}, &-sm > ${t}-group-addon`]: f({}, Aa(e)),
      [`> ${t}`]: {
        display: 'table-cell',
        '&:not(:first-child):not(:last-child)': { borderRadius: 0 }
      },
      [`${t}-group`]: {
        '&-addon, &-wrap': {
          display: 'table-cell',
          width: 1,
          whiteSpace: 'nowrap',
          verticalAlign: 'middle',
          '&:not(:first-child):not(:last-child)': { borderRadius: 0 }
        },
        '&-wrap > *': { display: 'block !important' },
        '&-addon': {
          position: 'relative',
          padding: `0 ${e.inputPaddingHorizontal}px`,
          color: e.colorText,
          fontWeight: 'normal',
          fontSize: e.fontSize,
          textAlign: 'center',
          backgroundColor: e.colorFillAlter,
          border: `${e.lineWidth}px ${e.lineType} ${e.colorBorder}`,
          borderRadius: e.borderRadius,
          transition: `all ${e.motionDurationSlow}`,
          lineHeight: 1,
          [`${n}-select`]: {
            margin: `-${e.inputPaddingVertical + 1}px -${
              e.inputPaddingHorizontal
            }px`,
            [`&${n}-select-single:not(${n}-select-customize-input)`]: {
              [`${n}-select-selector`]: {
                backgroundColor: 'inherit',
                border: `${e.lineWidth}px ${e.lineType} transparent`,
                boxShadow: 'none'
              }
            },
            '&-open, &-focused': {
              [`${n}-select-selector`]: { color: e.colorPrimary }
            }
          },
          [`${n}-cascader-picker`]: {
            margin: `-9px -${e.inputPaddingHorizontal}px`,
            backgroundColor: 'transparent',
            [`${n}-cascader-input`]: {
              textAlign: 'start',
              border: 0,
              boxShadow: 'none'
            }
          }
        },
        '&-addon:first-child': { borderInlineEnd: 0 },
        '&-addon:last-child': { borderInlineStart: 0 }
      },
      [`${t}`]: {
        float: 'inline-start',
        width: '100%',
        marginBottom: 0,
        textAlign: 'inherit',
        '&:focus': { zIndex: 1, borderInlineEndWidth: 1 },
        '&:hover': {
          zIndex: 1,
          borderInlineEndWidth: 1,
          [`${t}-search-with-button &`]: { zIndex: 0 }
        }
      },
      [`> ${t}:first-child, ${t}-group-addon:first-child`]: {
        borderStartEndRadius: 0,
        borderEndEndRadius: 0,
        [`${n}-select ${n}-select-selector`]: {
          borderStartEndRadius: 0,
          borderEndEndRadius: 0
        }
      },
      [`> ${t}-affix-wrapper`]: {
        [`&:not(:first-child) ${t}`]: {
          borderStartStartRadius: 0,
          borderEndStartRadius: 0
        },
        [`&:not(:last-child) ${t}`]: {
          borderStartEndRadius: 0,
          borderEndEndRadius: 0
        }
      },
      [`> ${t}:last-child, ${t}-group-addon:last-child`]: {
        borderStartStartRadius: 0,
        borderEndStartRadius: 0,
        [`${n}-select ${n}-select-selector`]: {
          borderStartStartRadius: 0,
          borderEndStartRadius: 0
        }
      },
      [`${t}-affix-wrapper`]: {
        '&:not(:last-child)': {
          borderStartEndRadius: 0,
          borderEndEndRadius: 0,
          [`${t}-search &`]: {
            borderStartStartRadius: e.borderRadius,
            borderEndStartRadius: e.borderRadius
          }
        },
        [`&:not(:first-child), ${t}-search &:not(:first-child)`]: {
          borderStartStartRadius: 0,
          borderEndStartRadius: 0
        }
      },
      [`&${t}-group-compact`]: f(f({ display: 'block' }, Nn()), {
        [`${t}-group-addon, ${t}-group-wrap, > ${t}`]: {
          '&:not(:first-child):not(:last-child)': {
            borderInlineEndWidth: e.lineWidth,
            '&:hover': { zIndex: 1 },
            '&:focus': { zIndex: 1 }
          }
        },
        '& > *': {
          display: 'inline-block',
          float: 'none',
          verticalAlign: 'top',
          borderRadius: 0
        },
        [`& > ${t}-affix-wrapper`]: { display: 'inline-flex' },
        [`& > ${n}-picker-range`]: { display: 'inline-flex' },
        '& > *:not(:last-child)': {
          marginInlineEnd: -e.lineWidth,
          borderInlineEndWidth: e.lineWidth
        },
        [`${t}`]: { float: 'none' },
        [`& > ${n}-select > ${n}-select-selector,
      & > ${n}-select-auto-complete ${t},
      & > ${n}-cascader-picker ${t},
      & > ${t}-group-wrapper ${t}`]: {
          borderInlineEndWidth: e.lineWidth,
          borderRadius: 0,
          '&:hover': { zIndex: 1 },
          '&:focus': { zIndex: 1 }
        },
        [`& > ${n}-select-focused`]: { zIndex: 1 },
        [`& > ${n}-select > ${n}-select-arrow`]: { zIndex: 1 },
        [`& > *:first-child,
      & > ${n}-select:first-child > ${n}-select-selector,
      & > ${n}-select-auto-complete:first-child ${t},
      & > ${n}-cascader-picker:first-child ${t}`]: {
          borderStartStartRadius: e.borderRadius,
          borderEndStartRadius: e.borderRadius
        },
        [`& > *:last-child,
      & > ${n}-select:last-child > ${n}-select-selector,
      & > ${n}-cascader-picker:last-child ${t},
      & > ${n}-cascader-picker-focused:last-child ${t}`]: {
          borderInlineEndWidth: e.lineWidth,
          borderStartEndRadius: e.borderRadius,
          borderEndEndRadius: e.borderRadius
        },
        [`& > ${n}-select-auto-complete ${t}`]: { verticalAlign: 'top' },
        [`${t}-group-wrapper + ${t}-group-wrapper`]: {
          marginInlineStart: -e.lineWidth,
          [`${t}-affix-wrapper`]: { borderRadius: 0 }
        },
        [`${t}-group-wrapper:not(:last-child)`]: {
          [`&${t}-search > ${t}-group`]: {
            [`& > ${t}-group-addon > ${t}-search-button`]: { borderRadius: 0 },
            [`& > ${t}`]: {
              borderStartStartRadius: e.borderRadius,
              borderStartEndRadius: 0,
              borderEndEndRadius: 0,
              borderEndStartRadius: e.borderRadius
            }
          }
        }
      }),
      [`&&-sm ${n}-btn`]: {
        fontSize: e.fontSizeSM,
        height: e.controlHeightSM,
        lineHeight: 'normal'
      },
      [`&&-lg ${n}-btn`]: {
        fontSize: e.fontSizeLG,
        height: e.controlHeightLG,
        lineHeight: 'normal'
      },
      [`&&-lg ${n}-select-single ${n}-select-selector`]: {
        height: `${e.controlHeightLG}px`,
        [`${n}-select-selection-item, ${n}-select-selection-placeholder`]: {
          lineHeight: `${e.controlHeightLG - 2}px`
        },
        [`${n}-select-selection-search-input`]: {
          height: `${e.controlHeightLG}px`
        }
      },
      [`&&-sm ${n}-select-single ${n}-select-selector`]: {
        height: `${e.controlHeightSM}px`,
        [`${n}-select-selection-item, ${n}-select-selection-placeholder`]: {
          lineHeight: `${e.controlHeightSM - 2}px`
        },
        [`${n}-select-selection-search-input`]: {
          height: `${e.controlHeightSM}px`
        }
      }
    }
  },
  zm = e => {
    const { componentCls: t, controlHeightSM: n, lineWidth: o } = e,
      r = 16,
      i = (n - o * 2 - r) / 2
    return {
      [t]: f(f(f(f({}, un(e)), Ra(e)), Ma(e, t)), {
        '&[type="color"]': {
          height: e.controlHeight,
          [`&${t}-lg`]: { height: e.controlHeightLG },
          [`&${t}-sm`]: { height: n, paddingTop: i, paddingBottom: i }
        }
      })
    }
  },
  Nm = e => {
    const { componentCls: t } = e
    return {
      [`${t}-clear-icon`]: {
        margin: 0,
        color: e.colorTextQuaternary,
        fontSize: e.fontSizeIcon,
        verticalAlign: -1,
        cursor: 'pointer',
        transition: `color ${e.motionDurationSlow}`,
        '&:hover': { color: e.colorTextTertiary },
        '&:active': { color: e.colorText },
        '&-hidden': { visibility: 'hidden' },
        '&-has-suffix': { margin: `0 ${e.inputAffixPadding}px` }
      },
      '&-textarea-with-clear-btn': {
        padding: '0 !important',
        border: '0 !important',
        [`${t}-clear-icon`]: {
          position: 'absolute',
          insetBlockStart: e.paddingXS,
          insetInlineEnd: e.paddingXS,
          zIndex: 1
        }
      }
    }
  },
  Hm = e => {
    const {
      componentCls: t,
      inputAffixPadding: n,
      colorTextDescription: o,
      motionDurationSlow: r,
      colorIcon: i,
      colorIconHover: a,
      iconCls: l
    } = e
    return {
      [`${t}-affix-wrapper`]: f(
        f(
          f(
            f(f({}, Ra(e)), {
              display: 'inline-flex',
              [`&:not(${t}-affix-wrapper-disabled):hover`]: f(f({}, Po(e)), {
                zIndex: 1,
                [`${t}-search-with-button &`]: { zIndex: 0 }
              }),
              '&-focused, &:focus': { zIndex: 1 },
              '&-disabled': {
                [`${t}[disabled]`]: { background: 'transparent' }
              },
              [`> input${t}`]: {
                padding: 0,
                fontSize: 'inherit',
                border: 'none',
                borderRadius: 0,
                outline: 'none',
                '&:focus': { boxShadow: 'none !important' }
              },
              '&::before': {
                width: 0,
                visibility: 'hidden',
                content: '"\\a0"'
              },
              [`${t}`]: {
                '&-prefix, &-suffix': {
                  display: 'flex',
                  flex: 'none',
                  alignItems: 'center',
                  '> *:not(:last-child)': { marginInlineEnd: e.paddingXS }
                },
                '&-show-count-suffix': { color: o },
                '&-show-count-has-suffix': { marginInlineEnd: e.paddingXXS },
                '&-prefix': { marginInlineEnd: n },
                '&-suffix': { marginInlineStart: n }
              }
            }),
            Nm(e)
          ),
          {
            [`${l}${t}-password-icon`]: {
              color: i,
              cursor: 'pointer',
              transition: `all ${r}`,
              '&:hover': { color: a }
            }
          }
        ),
        Ma(e, `${t}-affix-wrapper`)
      )
    }
  },
  Fm = e => {
    const {
      componentCls: t,
      colorError: n,
      colorSuccess: o,
      borderRadiusLG: r,
      borderRadiusSM: i
    } = e
    return {
      [`${t}-group`]: f(f(f({}, un(e)), Bm(e)), {
        '&-rtl': { direction: 'rtl' },
        '&-wrapper': {
          display: 'inline-block',
          width: '100%',
          textAlign: 'start',
          verticalAlign: 'top',
          '&-rtl': { direction: 'rtl' },
          '&-lg': { [`${t}-group-addon`]: { borderRadius: r } },
          '&-sm': { [`${t}-group-addon`]: { borderRadius: i } },
          '&-status-error': {
            [`${t}-group-addon`]: { color: n, borderColor: n }
          },
          '&-status-warning': {
            [`${t}-group-addon:last-child`]: { color: o, borderColor: o }
          }
        }
      })
    }
  },
  Lm = e => {
    const { componentCls: t, antCls: n } = e,
      o = `${t}-search`
    return {
      [o]: {
        [`${t}`]: {
          '&:hover, &:focus': {
            borderColor: e.colorPrimaryHover,
            [`+ ${t}-group-addon ${o}-button:not(${n}-btn-primary)`]: {
              borderInlineStartColor: e.colorPrimaryHover
            }
          }
        },
        [`${t}-affix-wrapper`]: { borderRadius: 0 },
        [`${t}-lg`]: { lineHeight: e.lineHeightLG - 2e-4 },
        [`> ${t}-group`]: {
          [`> ${t}-group-addon:last-child`]: {
            insetInlineStart: -1,
            padding: 0,
            border: 0,
            [`${o}-button`]: {
              paddingTop: 0,
              paddingBottom: 0,
              borderStartStartRadius: 0,
              borderStartEndRadius: e.borderRadius,
              borderEndEndRadius: e.borderRadius,
              borderEndStartRadius: 0
            },
            [`${o}-button:not(${n}-btn-primary)`]: {
              color: e.colorTextDescription,
              '&:hover': { color: e.colorPrimaryHover },
              '&:active': { color: e.colorPrimaryActive },
              [`&${n}-btn-loading::before`]: {
                insetInlineStart: 0,
                insetInlineEnd: 0,
                insetBlockStart: 0,
                insetBlockEnd: 0
              }
            }
          }
        },
        [`${o}-button`]: {
          height: e.controlHeight,
          '&:hover, &:focus': { zIndex: 1 }
        },
        [`&-large ${o}-button`]: { height: e.controlHeightLG },
        [`&-small ${o}-button`]: { height: e.controlHeightSM },
        '&-rtl': { direction: 'rtl' },
        [`&${t}-compact-item`]: {
          [`&:not(${t}-compact-last-item)`]: {
            [`${t}-group-addon`]: {
              [`${t}-search-button`]: {
                marginInlineEnd: -e.lineWidth,
                borderRadius: 0
              }
            }
          },
          [`&:not(${t}-compact-first-item)`]: {
            [`${t},${t}-affix-wrapper`]: { borderRadius: 0 }
          },
          [`> ${t}-group-addon ${t}-search-button,
        > ${t},
        ${t}-affix-wrapper`]: { '&:hover,&:focus,&:active': { zIndex: 2 } },
          [`> ${t}-affix-wrapper-focused`]: { zIndex: 2 }
        }
      }
    }
  }
function jm(e) {
  return Ce(e, {
    inputAffixPadding: e.paddingXXS,
    inputPaddingVertical: Math.max(
      Math.round(((e.controlHeight - e.fontSize * e.lineHeight) / 2) * 10) /
        10 -
        e.lineWidth,
      3
    ),
    inputPaddingVerticalLG:
      Math.ceil(
        ((e.controlHeightLG - e.fontSizeLG * e.lineHeightLG) / 2) * 10
      ) /
        10 -
      e.lineWidth,
    inputPaddingVerticalSM: Math.max(
      Math.round(((e.controlHeightSM - e.fontSize * e.lineHeight) / 2) * 10) /
        10 -
        e.lineWidth,
      0
    ),
    inputPaddingHorizontal: e.paddingSM - e.lineWidth,
    inputPaddingHorizontalSM: e.paddingXS - e.lineWidth,
    inputPaddingHorizontalLG: e.controlPaddingHorizontal - e.lineWidth,
    inputBorderHoverColor: e.colorPrimaryHover,
    inputBorderActiveColor: e.colorPrimaryHover
  })
}
const Wm = e => {
    const { componentCls: t, inputPaddingHorizontal: n, paddingLG: o } = e,
      r = `${t}-textarea`
    return {
      [r]: {
        position: 'relative',
        [`${r}-suffix`]: {
          position: 'absolute',
          top: 0,
          insetInlineEnd: n,
          bottom: 0,
          zIndex: 1,
          display: 'inline-flex',
          alignItems: 'center',
          margin: 'auto'
        },
        '&-status-error,\n        &-status-warning,\n        &-status-success,\n        &-status-validating': {
          [`&${r}-has-feedback`]: { [`${t}`]: { paddingInlineEnd: o } }
        },
        '&-show-count': {
          [`> ${t}`]: { height: '100%' },
          '&::after': {
            color: e.colorTextDescription,
            whiteSpace: 'nowrap',
            content: 'attr(data-count)',
            pointerEvents: 'none',
            float: 'right'
          }
        },
        '&-rtl': { '&::after': { float: 'left' } }
      }
    }
  },
  Vm = ft('Input', e => {
    const t = jm(e)
    return [zm(t), Wm(t), Hm(t), Fm(t), Lm(t), ca(t)]
  })
function ri(e) {
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
        Km(e, r, n[r])
      })
  }
  return e
}
function Km(e, t, n) {
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
var _o = function(t, n) {
  var o = ri({}, t, n.attrs)
  return y(Rt, ri({}, o, { icon: vl }), null)
}
_o.displayName = 'LeftOutlined'
_o.inheritAttrs = !1
const jv = _o,
  Um = () => rt() && window.document.documentElement,
  Da = e => {
    if (rt() && window.document.documentElement) {
      const t = Array.isArray(e) ? e : [e],
        { documentElement: n } = window.document
      return t.some(o => o in n.style)
    }
    return !1
  },
  Gm = (e, t) => {
    if (!Da(e)) return !1
    const n = document.createElement('div'),
      o = n.style[e]
    return (n.style[e] = t), n.style[e] !== o
  }
function Wv(e, t) {
  return !Array.isArray(e) && t !== void 0 ? Gm(e, t) : Da(e)
}
let Vt
const Xm = () => {
    if (!Um()) return !1
    if (Vt !== void 0) return Vt
    const e = document.createElement('div')
    return (
      (e.style.display = 'flex'),
      (e.style.flexDirection = 'column'),
      (e.style.rowGap = '1px'),
      e.appendChild(document.createElement('div')),
      e.appendChild(document.createElement('div')),
      document.body.appendChild(e),
      (Vt = e.scrollHeight === 1),
      document.body.removeChild(e),
      Vt
    )
  },
  Ym = () => {
    const e = N(!1)
    return (
      Pe(() => {
        e.value = Xm()
      }),
      e
    )
  },
  Ot = e => e != null && (Array.isArray(e) ? dt(e).length : !0)
function Vv(e) {
  return Ot(e.prefix) || Ot(e.suffix) || Ot(e.allowClear)
}
function Kv(e) {
  return Ot(e.addonBefore) || Ot(e.addonAfter)
}
function qm(e) {
  return typeof e > 'u' || e === null ? '' : String(e)
}
function Mn(e, t, n, o) {
  if (!n) return
  const r = t
  if (t.type === 'click') {
    Object.defineProperty(r, 'target', { writable: !0 }),
      Object.defineProperty(r, 'currentTarget', { writable: !0 })
    const i = e.cloneNode(!0)
    ;(r.target = i), (r.currentTarget = i), (i.value = ''), n(r)
    return
  }
  if (o !== void 0) {
    Object.defineProperty(r, 'target', { writable: !0 }),
      Object.defineProperty(r, 'currentTarget', { writable: !0 }),
      (r.target = e),
      (r.currentTarget = e),
      (e.value = o),
      n(r)
    return
  }
  n(r)
}
function km(e, t) {
  if (!e) return
  e.focus(t)
  const { cursor: n } = t || {}
  if (n) {
    const o = e.value.length
    switch (n) {
      case 'start':
        e.setSelectionRange(0, 0)
        break
      case 'end':
        e.setSelectionRange(o, o)
        break
      default:
        e.setSelectionRange(0, o)
    }
  }
}
const Zm = () => ({
    addonBefore: I.any,
    addonAfter: I.any,
    prefix: I.any,
    suffix: I.any,
    clearIcon: I.any,
    affixWrapperClassName: String,
    groupClassName: String,
    wrapperClassName: String,
    inputClassName: String,
    allowClear: { type: Boolean, default: void 0 }
  }),
  Qm = () =>
    f(f({}, Zm()), {
      value: { type: [String, Number, Symbol], default: void 0 },
      defaultValue: { type: [String, Number, Symbol], default: void 0 },
      inputElement: I.any,
      prefixCls: String,
      disabled: { type: Boolean, default: void 0 },
      focused: { type: Boolean, default: void 0 },
      triggerFocus: Function,
      readonly: { type: Boolean, default: void 0 },
      handleReset: Function,
      hidden: { type: Boolean, default: void 0 }
    }),
  Jm = () =>
    f(f({}, Qm()), {
      id: String,
      placeholder: { type: [String, Number] },
      autocomplete: String,
      type: nl('text'),
      name: String,
      size: { type: String },
      autofocus: { type: Boolean, default: void 0 },
      lazy: { type: Boolean, default: !0 },
      maxlength: Number,
      loading: { type: Boolean, default: void 0 },
      bordered: { type: Boolean, default: void 0 },
      showCount: { type: [Boolean, Object] },
      htmlSize: Number,
      onPressEnter: Function,
      onKeydown: Function,
      onKeyup: Function,
      onFocus: Function,
      onBlur: Function,
      onChange: Function,
      onInput: Function,
      'onUpdate:value': Function,
      onCompositionstart: Function,
      onCompositionend: Function,
      valueModifiers: Object,
      hidden: { type: Boolean, default: void 0 },
      status: String
    }),
  Ba = () =>
    fn(Jm(), [
      'wrapperClassName',
      'groupClassName',
      'inputClassName',
      'affixWrapperClassName'
    ]),
  Uv = Ba,
  za = () =>
    f(f({}, fn(Ba(), ['prefix', 'addonBefore', 'addonAfter', 'suffix'])), {
      rows: Number,
      autosize: { type: [Boolean, Object], default: void 0 },
      autoSize: { type: [Boolean, Object], default: void 0 },
      onResize: { type: Function },
      onCompositionstart: Yt(),
      onCompositionend: Yt(),
      valueModifiers: Object
    }),
  ii = e => e != null && (Array.isArray(e) ? dt(e).length : !0)
function ev(e) {
  return ii(e.addonBefore) || ii(e.addonAfter)
}
const tv = ['text', 'input'],
  nv = X({
    compatConfig: { MODE: 3 },
    name: 'ClearableLabeledInput',
    inheritAttrs: !1,
    props: {
      prefixCls: String,
      inputType: I.oneOf(it('text', 'input')),
      value: Le(),
      defaultValue: Le(),
      allowClear: { type: Boolean, default: void 0 },
      element: Le(),
      handleReset: Function,
      disabled: { type: Boolean, default: void 0 },
      direction: { type: String },
      size: { type: String },
      suffix: Le(),
      prefix: Le(),
      addonBefore: Le(),
      addonAfter: Le(),
      readonly: { type: Boolean, default: void 0 },
      focused: { type: Boolean, default: void 0 },
      bordered: { type: Boolean, default: !0 },
      triggerFocus: { type: Function },
      hidden: Boolean,
      status: String,
      hashId: String
    },
    setup(e, t) {
      let { slots: n, attrs: o } = t
      const r = So.useInject(),
        i = l => {
          const {
              value: s,
              disabled: c,
              readonly: d,
              handleReset: u,
              suffix: m = n.suffix
            } = e,
            p = !c && !d && s,
            v = `${l}-clear-icon`
          return y(
            ol,
            {
              onClick: u,
              onMousedown: h => h.preventDefault(),
              class: oe({ [`${v}-hidden`]: !p, [`${v}-has-suffix`]: !!m }, v),
              role: 'button'
            },
            null
          )
        },
        a = (l, s) => {
          const {
              value: c,
              allowClear: d,
              direction: u,
              bordered: m,
              hidden: p,
              status: v,
              addonAfter: h = n.addonAfter,
              addonBefore: C = n.addonBefore,
              hashId: $
            } = e,
            { status: g, hasFeedback: T } = r
          if (!d) return Se(s, { value: c, disabled: e.disabled })
          const z = oe(
            `${l}-affix-wrapper`,
            `${l}-affix-wrapper-textarea-with-clear-btn`,
            ra(`${l}-affix-wrapper`, ia(g, v), T),
            {
              [`${l}-affix-wrapper-rtl`]: u === 'rtl',
              [`${l}-affix-wrapper-borderless`]: !m,
              [`${o.class}`]: !ev({ addonAfter: h, addonBefore: C }) && o.class
            },
            $
          )
          return y('span', { class: z, style: o.style, hidden: p }, [
            Se(s, { style: null, value: c, disabled: e.disabled }),
            i(l)
          ])
        }
      return () => {
        var l
        const {
          prefixCls: s,
          inputType: c,
          element: d = (l = n.element) === null || l === void 0
            ? void 0
            : l.call(n)
        } = e
        return c === tv[0] ? a(s, d) : null
      }
    }
  }),
  ov = `
  min-height:0 !important;
  max-height:none !important;
  height:0 !important;
  visibility:hidden !important;
  overflow:hidden !important;
  position:absolute !important;
  z-index:-1000 !important;
  top:0 !important;
  right:0 !important;
  pointer-events: none !important;
`,
  rv = [
    'letter-spacing',
    'line-height',
    'padding-top',
    'padding-bottom',
    'font-family',
    'font-weight',
    'font-size',
    'font-variant',
    'text-rendering',
    'text-transform',
    'width',
    'text-indent',
    'padding-left',
    'padding-right',
    'border-width',
    'box-sizing',
    'word-break',
    'white-space'
  ],
  Rn = {}
let $e
function iv(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1
  const n =
    e.getAttribute('id') ||
    e.getAttribute('data-reactid') ||
    e.getAttribute('name')
  if (t && Rn[n]) return Rn[n]
  const o = window.getComputedStyle(e),
    r =
      o.getPropertyValue('box-sizing') ||
      o.getPropertyValue('-moz-box-sizing') ||
      o.getPropertyValue('-webkit-box-sizing'),
    i =
      parseFloat(o.getPropertyValue('padding-bottom')) +
      parseFloat(o.getPropertyValue('padding-top')),
    a =
      parseFloat(o.getPropertyValue('border-bottom-width')) +
      parseFloat(o.getPropertyValue('border-top-width')),
    s = {
      sizingStyle: rv.map(c => `${c}:${o.getPropertyValue(c)}`).join(';'),
      paddingSize: i,
      borderSize: a,
      boxSizing: r
    }
  return t && n && (Rn[n] = s), s
}
function av(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1,
    n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null,
    o = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null
  $e ||
    (($e = document.createElement('textarea')),
    $e.setAttribute('tab-index', '-1'),
    $e.setAttribute('aria-hidden', 'true'),
    document.body.appendChild($e)),
    e.getAttribute('wrap')
      ? $e.setAttribute('wrap', e.getAttribute('wrap'))
      : $e.removeAttribute('wrap')
  const { paddingSize: r, borderSize: i, boxSizing: a, sizingStyle: l } = iv(
    e,
    t
  )
  $e.setAttribute('style', `${l};${ov}`),
    ($e.value = e.value || e.placeholder || '')
  let s,
    c,
    d,
    u = $e.scrollHeight
  if (
    (a === 'border-box' ? (u += i) : a === 'content-box' && (u -= r),
    n !== null || o !== null)
  ) {
    $e.value = ' '
    const p = $e.scrollHeight - r
    n !== null &&
      ((s = p * n),
      a === 'border-box' && (s = s + r + i),
      (u = Math.max(s, u))),
      o !== null &&
        ((c = p * o),
        a === 'border-box' && (c = c + r + i),
        (d = u > c ? '' : 'hidden'),
        (u = Math.min(c, u)))
  }
  const m = { height: `${u}px`, overflowY: d, resize: 'none' }
  return s && (m.minHeight = `${s}px`), c && (m.maxHeight = `${c}px`), m
}
const Dn = 0,
  Bn = 1,
  zn = 2,
  lv = X({
    compatConfig: { MODE: 3 },
    name: 'ResizableTextArea',
    inheritAttrs: !1,
    props: za(),
    setup(e, t) {
      let { attrs: n, emit: o, expose: r } = t,
        i,
        a
      const l = j(),
        s = j({}),
        c = j(zn)
      ve(() => {
        le.cancel(i), le.cancel(a)
      })
      const d = () => {
          try {
            if (l.value && document.activeElement === l.value.input) {
              const x = l.value.getSelectionStart(),
                b = l.value.getSelectionEnd(),
                A = l.value.getScrollTop()
              l.value.setSelectionRange(x, b), l.value.setScrollTop(A)
            }
          } catch {}
        },
        u = j(),
        m = j()
      Oe(() => {
        const x = e.autoSize || e.autosize
        x
          ? ((u.value = x.minRows), (m.value = x.maxRows))
          : ((u.value = void 0), (m.value = void 0))
      })
      const p = S(() => !!(e.autoSize || e.autosize)),
        v = () => {
          c.value = Dn
        }
      J(
        [() => e.value, u, m, p],
        () => {
          p.value && v()
        },
        { immediate: !0 }
      )
      const h = j()
      J(
        [c, l],
        () => {
          if (l.value)
            if (c.value === Dn) c.value = Bn
            else if (c.value === Bn) {
              const x = av(l.value.input, !1, u.value, m.value)
              ;(c.value = zn), (h.value = x)
            } else d()
        },
        { immediate: !0, flush: 'post' }
      )
      const C = Ee(),
        $ = j(),
        g = () => {
          le.cancel($.value)
        },
        T = x => {
          c.value === zn &&
            (o('resize', x),
            p.value &&
              (g(),
              ($.value = le(() => {
                v()
              }))))
        }
      ve(() => {
        g()
      }),
        r({
          resizeTextarea: () => {
            v()
          },
          textArea: S(() => {
            var x
            return (x = l.value) === null || x === void 0 ? void 0 : x.input
          }),
          instance: C
        }),
        ui(e.autosize === void 0)
      const P = () => {
        const { prefixCls: x, disabled: b } = e,
          A = fn(e, [
            'prefixCls',
            'onPressEnter',
            'autoSize',
            'autosize',
            'defaultValue',
            'allowClear',
            'type',
            'maxlength',
            'valueModifiers'
          ]),
          F = oe(x, n.class, { [`${x}-disabled`]: b }),
          O = p.value ? h.value : null,
          R = [n.style, s.value, O],
          U = f(f(f({}, A), n), { style: R, class: F })
        return (
          (c.value === Dn || c.value === Bn) &&
            R.push({ overflowX: 'hidden', overflowY: 'hidden' }),
          U.autofocus || delete U.autofocus,
          U.rows === 0 && delete U.rows,
          y(
            so,
            { onResize: T, disabled: !p.value },
            {
              default: () => [
                y(Vd, M(M({}, U), {}, { ref: l, tag: 'textarea' }), null)
              ]
            }
          )
        )
      }
      return () => P()
    }
  }),
  sv = lv
function Na(e, t) {
  return [...(e || '')].slice(0, t).join('')
}
function ai(e, t, n, o) {
  let r = n
  return (
    e
      ? (r = Na(n, o))
      : [...(t || '')].length < n.length &&
        [...(n || '')].length > o &&
        (r = t),
    r
  )
}
const Gv = X({
  compatConfig: { MODE: 3 },
  name: 'ATextarea',
  inheritAttrs: !1,
  props: za(),
  setup(e, t) {
    let { attrs: n, expose: o, emit: r } = t
    var i
    const a = tf(),
      l = So.useInject(),
      s = S(() => ia(l.status, e.status)),
      c = N((i = e.value) !== null && i !== void 0 ? i : e.defaultValue),
      d = N(),
      u = N(''),
      { prefixCls: m, size: p, direction: v } = He('input', e),
      [h, C] = Vm(m),
      $ = di(),
      g = S(() => e.showCount === '' || e.showCount || !1),
      T = S(() => Number(e.maxlength) > 0),
      z = N(!1),
      P = N(),
      x = N(0),
      b = _ => {
        ;(z.value = !0),
          (P.value = u.value),
          (x.value = _.currentTarget.selectionStart),
          r('compositionstart', _)
      },
      A = _ => {
        var H
        z.value = !1
        let D = _.currentTarget.value
        if (T.value) {
          const q =
            x.value >= e.maxlength + 1 ||
            x.value ===
              ((H = P.value) === null || H === void 0 ? void 0 : H.length)
          D = ai(q, P.value, D, e.maxlength)
        }
        D !== u.value && (U(D), Mn(_.currentTarget, _, w, D)),
          r('compositionend', _)
      },
      F = Ee()
    J(
      () => e.value,
      () => {
        var _
        'value' in F.vnode.props,
          (c.value = (_ = e.value) !== null && _ !== void 0 ? _ : '')
      }
    )
    const O = _ => {
        var H
        km((H = d.value) === null || H === void 0 ? void 0 : H.textArea, _)
      },
      R = () => {
        var _, H
        ;(H = (_ = d.value) === null || _ === void 0 ? void 0 : _.textArea) ===
          null ||
          H === void 0 ||
          H.blur()
      },
      U = (_, H) => {
        c.value !== _ &&
          (e.value === void 0
            ? (c.value = _)
            : Te(() => {
                var D, q, Z
                d.value.textArea.value !== u.value &&
                  ((Z =
                    (D = d.value) === null || D === void 0
                      ? void 0
                      : (q = D.instance).update) === null ||
                    Z === void 0 ||
                    Z.call(q))
              }),
          Te(() => {
            H && H()
          }))
      },
      G = _ => {
        _.keyCode === 13 && r('pressEnter', _), r('keydown', _)
      },
      Q = _ => {
        const { onBlur: H } = e
        H == null || H(_), a.onFieldBlur()
      },
      w = _ => {
        r('update:value', _.target.value),
          r('change', _),
          r('input', _),
          a.onFieldChange()
      },
      B = _ => {
        Mn(d.value.textArea, _, w),
          U('', () => {
            O()
          })
      },
      V = _ => {
        let H = _.target.value
        if (c.value !== H) {
          if (T.value) {
            const D = _.target,
              q =
                D.selectionStart >= e.maxlength + 1 ||
                D.selectionStart === H.length ||
                !D.selectionStart
            H = ai(q, u.value, H, e.maxlength)
          }
          Mn(_.currentTarget, _, w, H), U(H)
        }
      },
      Y = () => {
        var _, H
        const { class: D } = n,
          { bordered: q = !0 } = e,
          Z = f(f(f({}, fn(e, ['allowClear'])), n), {
            class: [
              {
                [`${m.value}-borderless`]: !q,
                [`${D}`]: D && !g.value,
                [`${m.value}-sm`]: p.value === 'small',
                [`${m.value}-lg`]: p.value === 'large'
              },
              ra(m.value, s.value),
              C.value
            ],
            disabled: $.value,
            showCount: null,
            prefixCls: m.value,
            onInput: V,
            onChange: V,
            onBlur: Q,
            onKeydown: G,
            onCompositionstart: b,
            onCompositionend: A
          })
        return (
          !((_ = e.valueModifiers) === null || _ === void 0) &&
            _.lazy &&
            delete Z.onInput,
          y(
            sv,
            M(
              M({}, Z),
              {},
              {
                id:
                  (H = Z == null ? void 0 : Z.id) !== null && H !== void 0
                    ? H
                    : a.id.value,
                ref: d,
                maxlength: e.maxlength,
                lazy: e.lazy
              }
            ),
            null
          )
        )
      }
    return (
      o({ focus: O, blur: R, resizableTextArea: d }),
      Oe(() => {
        let _ = qm(c.value)
        !z.value &&
          T.value &&
          (e.value === null || e.value === void 0) &&
          (_ = Na(_, e.maxlength)),
          (u.value = _)
      }),
      () => {
        var _
        const { maxlength: H, bordered: D = !0, hidden: q } = e,
          { style: Z, class: fe } = n,
          de = f(f(f({}, e), n), {
            prefixCls: m.value,
            inputType: 'text',
            handleReset: B,
            direction: v.value,
            bordered: D,
            style: g.value ? void 0 : Z,
            hashId: C.value,
            disabled: (_ = e.disabled) !== null && _ !== void 0 ? _ : $.value
          })
        let ue = y(nv, M(M({}, de), {}, { value: u.value, status: e.status }), {
          element: Y
        })
        if (g.value || l.hasFeedback) {
          const E = [...u.value].length
          let W = ''
          typeof g.value == 'object'
            ? (W = g.value.formatter({
                value: u.value,
                count: E,
                maxlength: H
              }))
            : (W = `${E}${T.value ? ` / ${H}` : ''}`),
            (ue = y(
              'div',
              {
                hidden: q,
                class: oe(
                  `${m.value}-textarea`,
                  {
                    [`${m.value}-textarea-rtl`]: v.value === 'rtl',
                    [`${m.value}-textarea-show-count`]: g.value,
                    [`${m.value}-textarea-in-form-item`]: l.isFormItemInput
                  },
                  `${m.value}-textarea-show-count`,
                  fe,
                  C.value
                ),
                style: Z,
                'data-count': typeof W != 'object' ? W : void 0
              },
              [
                ue,
                l.hasFeedback &&
                  y('span', { class: `${m.value}-textarea-suffix` }, [
                    l.feedbackIcon
                  ])
              ]
            ))
        }
        return h(ue)
      }
    )
  }
})
function li(e) {
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
        uv(e, r, n[r])
      })
  }
  return e
}
function uv(e, t, n) {
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
var Ao = function(t, n) {
  var o = li({}, t, n.attrs)
  return y(Rt, li({}, o, { icon: gl }), null)
}
Ao.displayName = 'EyeOutlined'
Ao.inheritAttrs = !1
const Xv = Ao,
  cv = { small: 8, middle: 16, large: 24 },
  dv = () => ({
    prefixCls: String,
    size: { type: [String, Number, Array] },
    direction: I.oneOf(it('horizontal', 'vertical')).def('horizontal'),
    align: I.oneOf(it('start', 'end', 'center', 'baseline')),
    wrap: Xt()
  })
function fv(e) {
  return typeof e == 'string' ? cv[e] : e || 0
}
const Tt = X({
  compatConfig: { MODE: 3 },
  name: 'ASpace',
  inheritAttrs: !1,
  props: dv(),
  slots: Object,
  setup(e, t) {
    let { slots: n, attrs: o } = t
    const { prefixCls: r, space: i, direction: a } = He('space', e),
      [l, s] = aa(r),
      c = Ym(),
      d = S(() => {
        var $, g, T
        return (T =
          ($ = e.size) !== null && $ !== void 0
            ? $
            : (g = i == null ? void 0 : i.value) === null || g === void 0
            ? void 0
            : g.size) !== null && T !== void 0
          ? T
          : 'small'
      }),
      u = j(),
      m = j()
    J(
      d,
      () => {
        ;[u.value, m.value] = (Array.isArray(d.value)
          ? d.value
          : [d.value, d.value]
        ).map($ => fv($))
      },
      { immediate: !0 }
    )
    const p = S(() =>
        e.align === void 0 && e.direction === 'horizontal' ? 'center' : e.align
      ),
      v = S(() =>
        oe(r.value, s.value, `${r.value}-${e.direction}`, {
          [`${r.value}-rtl`]: a.value === 'rtl',
          [`${r.value}-align-${p.value}`]: p.value
        })
      ),
      h = S(() => (a.value === 'rtl' ? 'marginLeft' : 'marginRight')),
      C = S(() => {
        const $ = {}
        return (
          c.value &&
            (($.columnGap = `${u.value}px`), ($.rowGap = `${m.value}px`)),
          f(
            f({}, $),
            e.wrap && { flexWrap: 'wrap', marginBottom: `${-m.value}px` }
          )
        )
      })
    return () => {
      var $, g
      const { wrap: T, direction: z = 'horizontal' } = e,
        P = ($ = n.default) === null || $ === void 0 ? void 0 : $.call(n),
        x = dt(P),
        b = x.length
      if (b === 0) return null
      const A = (g = n.split) === null || g === void 0 ? void 0 : g.call(n),
        F = `${r.value}-item`,
        O = u.value,
        R = b - 1
      return y(
        'div',
        M(
          M({}, o),
          {},
          { class: [v.value, o.class], style: [C.value, o.style] }
        ),
        [
          x.map((U, G) => {
            let Q = P.indexOf(U)
            Q === -1 && (Q = `$$space-${G}`)
            let w = {}
            return (
              c.value ||
                (z === 'vertical'
                  ? G < R && (w = { marginBottom: `${O / (A ? 2 : 1)}px` })
                  : (w = f(
                      f({}, G < R && { [h.value]: `${O / (A ? 2 : 1)}px` }),
                      T && { paddingBottom: `${m.value}px` }
                    ))),
              l(
                y(Ge, { key: Q }, [
                  y('div', { class: F, style: w }, [U]),
                  G < R &&
                    A &&
                    y('span', { class: `${F}-split`, style: w }, [A])
                ])
              )
            )
          })
        ]
      )
    }
  }
})
Tt.Compact = Qn
Tt.install = function(e) {
  return e.component(Tt.name, Tt), e.component(Qn.name, Qn), e
}
const Yv = Tt,
  qv = cl('vendor', () => {
    const e = dl(),
      t = j([]),
      n = j({}),
      o = j(null),
      r = rl,
      i = j(!1),
      a = j(!1),
      l = j(!1),
      s = j(1),
      c = j({ page: 1, limit: 10, search: '', status: '' }),
      d = j([
        { title: he('shopName'), dataIndex: 'shopname', key: 'shop_name' },
        { title: he('owner'), dataIndex: 'displayname', key: 'owner' },
        {
          title: he('outstandingCommissions'),
          dataIndex: 'commission_due',
          key: 'commission_due'
        },
        {
          title: he('commissionRate'),
          dataIndex: 'commission_rate',
          key: 'commission_rate'
        },
        {
          title: he('registeredDate'),
          dataIndex: 'registered_date',
          key: 'registered_date'
        },
        { title: he('status'), dataIndex: 'status', key: 'status' },
        { title: he('actions'), dataIndex: 'action', key: 'action' }
      ]),
      u = async () => {
        ;(i.value = !0), (t.value = [])
        const g = await r.getVendors(c.value)
        ;(t.value = g.vendors),
          (n.value = g.vendor_count),
          (s.value = g.result_count),
          (i.value = !1)
      }
    return {
      vendors: t,
      vendorsCount: n,
      vendorDetails: o,
      vendorAPI: r,
      onLoading: i,
      detailsLoading: a,
      isSearch: l,
      vendorsQueryParams: c,
      tableColumns: d,
      resultCount: s,
      fetchVendors: u,
      onSearch: async () => {
        c.value.search !== '' ? (l.value = !0) : (l.value = !1), await u()
      },
      navigationFilter: async g => {
        ;(c.value.status = g),
          (c.value.search = ''),
          g === '' ? (l.value = !1) : (l.value = !0),
          (c.value.page = 1),
          await u()
      },
      setVendorStatus: async (g, T) => {
        const z = await r.setVendorStatus(g, T)
        z.success
          ? gt.success({ message: he('success'), description: z.message })
          : gt.error({ message: he('error'), description: z.message }),
          T === 'deactivate' && e.currentRoute.value.name === 'vendor-edit'
            ? e.back()
            : await u()
      },
      setVendorApproval: async (g, T, z = '', P = !1) => {
        const x = await r.setVendorApproval(g, T, z, P)
        x.success
          ? gt.success({ message: he('success'), description: x.message })
          : gt.error({ message: he('error'), description: x.message }),
          await u()
      },
      fetchVendorDetails: async g => {
        try {
          ;(a.value = !0), (o.value = null)
          const T = await r.getVendorDetails(g)
          o.value = T
        } catch {
          gt.error({
            message: he('error'),
            description: 'Failed to load vendor details'
          })
        } finally {
          a.value = !1
        }
      },
      clearVendorDetails: () => {
        o.value = null
      }
    }
  })
export {
  Ju as $,
  Cv as A,
  Gt as B,
  Pv as C,
  Nv as D,
  tm as E,
  wt as F,
  xv as G,
  Fv as H,
  Xv as I,
  Hl as J,
  zd as K,
  jv as L,
  Ue as M,
  cp as N,
  Bv as O,
  Qt as P,
  ki as Q,
  so as R,
  Yv as S,
  Gv as T,
  Qi as U,
  Qc as V,
  _p as W,
  id as X,
  Ae as Y,
  lc as Z,
  oc as _,
  yc as a,
  Qm as a$,
  tc as a0,
  lr as a1,
  st as a2,
  Yn as a3,
  pr as a4,
  Gc as a5,
  At as a6,
  en as a7,
  Ne as a8,
  vr as a9,
  hv as aA,
  Ni as aB,
  yo as aC,
  yt as aD,
  zl as aE,
  ca as aF,
  no as aG,
  Po as aH,
  Ra as aI,
  Af as aJ,
  Pf as aK,
  Mf as aL,
  _f as aM,
  Nl as aN,
  xf as aO,
  ra as aP,
  ia as aQ,
  Dm as aR,
  Bm as aS,
  Rm as aT,
  Ma as aU,
  Dv as aV,
  Mv as aW,
  Vd as aX,
  xt as aY,
  tt as aZ,
  ed as a_,
  Ji as aa,
  sf as ab,
  _t as ac,
  Vi as ad,
  pf as ae,
  ff as af,
  kf as ag,
  Hf as ah,
  bm as ai,
  Dl as aj,
  _v as ak,
  So as al,
  Cd as am,
  tf as an,
  Av as ao,
  Rv as ap,
  vt as aq,
  Hi as ar,
  ke as as,
  Gi as at,
  Yi as au,
  sa as av,
  Tv as aw,
  Dd as ax,
  Um as ay,
  $v as az,
  Ve as b,
  Vv as b0,
  Kv as b1,
  Jm as b2,
  qm as b3,
  km as b4,
  Mn as b5,
  Uv as b6,
  Vm as b7,
  Ym as b8,
  Mp as b9,
  fp as ba,
  ap as bb,
  _d as bc,
  lp as bd,
  Aa as be,
  kr as bf,
  Zr as bg,
  wv as bh,
  ea as bi,
  Sv as bj,
  Lv as c,
  Mt as d,
  Se as e,
  Rr as f,
  lt as g,
  Iv as h,
  ji as i,
  Ev as j,
  bv as k,
  jm as l,
  Wv as m,
  yp as n,
  fn as o,
  ua as p,
  pp as q,
  op as r,
  Ov as s,
  zv as t,
  qv as u,
  yv as v,
  le as w,
  Hv as x,
  ut as y,
  mt as z
}

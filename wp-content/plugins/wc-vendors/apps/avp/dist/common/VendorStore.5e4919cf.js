import {
  d as U,
  y as vo,
  g as Me,
  q as Ee,
  v as yn,
  z as go,
  j as J,
  c as g,
  a1 as jt,
  a2 as vl,
  N as We,
  r as L,
  s as B,
  l as me,
  e as O,
  a3 as Ai,
  i as gl,
  C as hl,
  F as je,
  B as pt,
  n as Ie,
  a4 as Xn,
  a5 as $n,
  _ as qo,
  k as Te,
  f as Se,
  p as ve,
  u as st,
  D as Yn,
  T as bl,
  x as yl,
  a0 as $l,
  E as Cl,
  Z as wl
} from './vendor.0c3875d9.js'
import {
  m as Sl,
  n as xl,
  R as Ol,
  T as ko,
  o as Tl,
  p as Pl
} from './antd.16e70afa.js'
import {
  y as _e,
  _ as f,
  P as I,
  c as E,
  D as Mi,
  p as et,
  d as ne,
  E as Ct,
  x as ho,
  F as qe,
  G as Cn,
  H as Il,
  I as mt,
  J as El,
  K as Zo,
  f as on,
  M as _l,
  N as Ri,
  O as Al,
  Q as Ml,
  R as Qo,
  S as Rl,
  A as Wt,
  g as tt,
  b as Re,
  T as vt,
  U as ae,
  V as bo,
  o as ge,
  m as xe,
  r as Vt,
  q as yo,
  W as Bl,
  X as Bt,
  Y as Dl,
  w as zl,
  Z as Nl,
  $ as rn,
  a0 as Jo,
  n as Bi,
  a1 as Fl,
  a2 as Di,
  a3 as er,
  a4 as Hl,
  t as Ll,
  a5 as an,
  a6 as jl,
  s as Wl,
  a as Ke,
  a7 as zi,
  a8 as $o,
  C as Vl,
  a9 as Kl,
  aa as Gl,
  ab as Ul,
  ac as Xl,
  ad as Yl,
  ae as ql,
  af as kl,
  ag as Zl,
  j as pe,
  ah as Ql,
  ai as Fe
} from '../main.2aa0af6a.js'
import { i as wt } from './initDefaultProps.6051a836.js'
var Ni = (function() {
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
  qn =
    typeof window < 'u' &&
    typeof document < 'u' &&
    window.document === document,
  ln = (function() {
    return typeof global < 'u' && global.Math === Math
      ? global
      : typeof self < 'u' && self.Math === Math
      ? self
      : typeof window < 'u' && window.Math === Math
      ? window
      : Function('return this')()
  })(),
  Jl = (function() {
    return typeof requestAnimationFrame == 'function'
      ? requestAnimationFrame.bind(ln)
      : function(e) {
          return setTimeout(function() {
            return e(Date.now())
          }, 1e3 / 60)
        }
  })(),
  es = 2
function ts(e, t) {
  var n = !1,
    o = !1,
    r = 0
  function i() {
    n && ((n = !1), e()), o && l()
  }
  function a() {
    Jl(i)
  }
  function l() {
    var s = Date.now()
    if (n) {
      if (s - r < es) return
      o = !0
    } else (n = !0), (o = !1), setTimeout(a, t)
    r = s
  }
  return l
}
var ns = 20,
  os = ['top', 'right', 'bottom', 'left', 'width', 'height', 'size', 'weight'],
  rs = typeof MutationObserver < 'u',
  is = (function() {
    function e() {
      ;(this.connected_ = !1),
        (this.mutationEventsAdded_ = !1),
        (this.mutationsObserver_ = null),
        (this.observers_ = []),
        (this.onTransitionEnd_ = this.onTransitionEnd_.bind(this)),
        (this.refresh = ts(this.refresh.bind(this), ns))
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
        !qn ||
          this.connected_ ||
          (document.addEventListener('transitionend', this.onTransitionEnd_),
          window.addEventListener('resize', this.refresh),
          rs
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
        !qn ||
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
          r = os.some(function(i) {
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
  Fi = function(e, t) {
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
  gt = function(e) {
    var t = e && e.ownerDocument && e.ownerDocument.defaultView
    return t || ln
  },
  Hi = wn(0, 0, 0, 0)
function sn(e) {
  return parseFloat(e) || 0
}
function tr(e) {
  for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n]
  return t.reduce(function(o, r) {
    var i = e['border-' + r + '-width']
    return o + sn(i)
  }, 0)
}
function as(e) {
  for (
    var t = ['top', 'right', 'bottom', 'left'], n = {}, o = 0, r = t;
    o < r.length;
    o++
  ) {
    var i = r[o],
      a = e['padding-' + i]
    n[i] = sn(a)
  }
  return n
}
function ls(e) {
  var t = e.getBBox()
  return wn(0, 0, t.width, t.height)
}
function ss(e) {
  var t = e.clientWidth,
    n = e.clientHeight
  if (!t && !n) return Hi
  var o = gt(e).getComputedStyle(e),
    r = as(o),
    i = r.left + r.right,
    a = r.top + r.bottom,
    l = sn(o.width),
    s = sn(o.height)
  if (
    (o.boxSizing === 'border-box' &&
      (Math.round(l + i) !== t && (l -= tr(o, 'left', 'right') + i),
      Math.round(s + a) !== n && (s -= tr(o, 'top', 'bottom') + a)),
    !cs(e))
  ) {
    var d = Math.round(l + i) - t,
      c = Math.round(s + a) - n
    Math.abs(d) !== 1 && (l -= d), Math.abs(c) !== 1 && (s -= c)
  }
  return wn(r.left, r.top, l, s)
}
var us = (function() {
  return typeof SVGGraphicsElement < 'u'
    ? function(e) {
        return e instanceof gt(e).SVGGraphicsElement
      }
    : function(e) {
        return e instanceof gt(e).SVGElement && typeof e.getBBox == 'function'
      }
})()
function cs(e) {
  return e === gt(e).document.documentElement
}
function ds(e) {
  return qn ? (us(e) ? ls(e) : ss(e)) : Hi
}
function fs(e) {
  var t = e.x,
    n = e.y,
    o = e.width,
    r = e.height,
    i = typeof DOMRectReadOnly < 'u' ? DOMRectReadOnly : Object,
    a = Object.create(i.prototype)
  return (
    Fi(a, {
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
function wn(e, t, n, o) {
  return { x: e, y: t, width: n, height: o }
}
var ps = (function() {
    function e(t) {
      ;(this.broadcastWidth = 0),
        (this.broadcastHeight = 0),
        (this.contentRect_ = wn(0, 0, 0, 0)),
        (this.target = t)
    }
    return (
      (e.prototype.isActive = function() {
        var t = ds(this.target)
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
  ms = (function() {
    function e(t, n) {
      var o = fs(n)
      Fi(this, { target: t, contentRect: o })
    }
    return e
  })(),
  vs = (function() {
    function e(t, n, o) {
      if (
        ((this.activeObservations_ = []),
        (this.observations_ = new Ni()),
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
          if (!(t instanceof gt(t).Element))
            throw new TypeError('parameter 1 is not of type "Element".')
          var n = this.observations_
          n.has(t) ||
            (n.set(t, new ps(t)),
            this.controller_.addObserver(this),
            this.controller_.refresh())
        }
      }),
      (e.prototype.unobserve = function(t) {
        if (!arguments.length)
          throw new TypeError('1 argument required, but only 0 present.')
        if (!(typeof Element > 'u' || !(Element instanceof Object))) {
          if (!(t instanceof gt(t).Element))
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
              return new ms(o.target, o.broadcastRect())
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
  Li = typeof WeakMap < 'u' ? new WeakMap() : new Ni(),
  ji = (function() {
    function e(t) {
      if (!(this instanceof e))
        throw new TypeError('Cannot call a class as a function.')
      if (!arguments.length)
        throw new TypeError('1 argument required, but only 0 present.')
      var n = is.getInstance(),
        o = new vs(t, n, this)
      Li.set(this, o)
    }
    return e
  })()
;['observe', 'unobserve', 'disconnect'].forEach(function(e) {
  ji.prototype[e] = function() {
    var t
    return (t = Li.get(this))[e].apply(t, arguments)
  }
})
var Wi = (function() {
  return typeof ln.ResizeObserver < 'u' ? ln.ResizeObserver : ji
})()
const Co = U({
  compatConfig: { MODE: 3 },
  name: 'ResizeObserver',
  props: { disabled: Boolean, onResize: Function },
  emits: ['resize'],
  setup(e, t) {
    let { slots: n } = t
    const o = vo({ width: 0, height: 0, offsetHeight: 0, offsetWidth: 0 })
    let r = null,
      i = null
    const a = () => {
        i && (i.disconnect(), (i = null))
      },
      l = c => {
        const { onResize: u } = e,
          p = c[0].target,
          { width: m, height: v } = p.getBoundingClientRect(),
          { offsetWidth: h, offsetHeight: C } = p,
          b = Math.floor(m),
          y = Math.floor(v)
        if (
          o.width !== b ||
          o.height !== y ||
          o.offsetWidth !== h ||
          o.offsetHeight !== C
        ) {
          const w = { width: b, height: y, offsetWidth: h, offsetHeight: C }
          f(o, w),
            u &&
              Promise.resolve().then(() => {
                u(f(f({}, w), { offsetWidth: h, offsetHeight: C }), p)
              })
        }
      },
      s = Me(),
      d = () => {
        const { disabled: c } = e
        if (c) {
          a()
          return
        }
        const u = _e(s)
        u !== r && (a(), (r = u)), !i && u && ((i = new Wi(l)), i.observe(u))
      }
    return (
      Ee(() => {
        d()
      }),
      yn(() => {
        d()
      }),
      go(() => {
        a()
      }),
      J(
        () => e.disabled,
        () => {
          d()
        },
        { flush: 'post' }
      ),
      () => {
        var c
        return (c = n.default) === null || c === void 0 ? void 0 : c.call(n)[0]
      }
    )
  }
})
let Vi = e => setTimeout(e, 16),
  Ki = e => clearTimeout(e)
typeof window < 'u' &&
  'requestAnimationFrame' in window &&
  ((Vi = e => window.requestAnimationFrame(e)),
  (Ki = e => window.cancelAnimationFrame(e)))
let nr = 0
const wo = new Map()
function Gi(e) {
  wo.delete(e)
}
function ce(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1
  nr += 1
  const n = nr
  function o(r) {
    if (r === 0) Gi(n), e()
    else {
      const i = Vi(() => {
        o(r - 1)
      })
      wo.set(n, i)
    }
  }
  return o(t), n
}
ce.cancel = e => {
  const t = wo.get(e)
  return Gi(t), Ki(t)
}
let Ui = !1
try {
  const e = Object.defineProperty({}, 'passive', {
    get() {
      Ui = !0
    }
  })
  window.addEventListener('testPassive', null, e),
    window.removeEventListener('testPassive', null, e)
} catch {}
const ut = Ui
function ct(e, t, n, o) {
  if (e && e.addEventListener) {
    let r = o
    r === void 0 &&
      ut &&
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
let or = {}
function gs(e, t) {}
function hs(e, t) {}
function Xi(e, t, n) {
  !t && !or[n] && (e(!1, n), (or[n] = !0))
}
function bs(e, t) {
  Xi(gs, e, t)
}
function Ig(e, t) {
  Xi(hs, e, t)
}
const un = [
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
  Eg = e => ({
    color: e.colorLink,
    textDecoration: 'none',
    outline: 'none',
    cursor: 'pointer',
    transition: `color ${e.motionDurationSlow}`,
    '&:focus, &:hover': { color: e.colorLinkHover },
    '&:active': { color: e.colorLinkActive }
  }),
  ys = (e, t, n, o, r) => {
    const i = e / 2,
      a = 0,
      l = i,
      s = (n * 1) / Math.sqrt(2),
      d = i - n * (1 - 1 / Math.sqrt(2)),
      c = i - t * (1 / Math.sqrt(2)),
      u = n * (Math.sqrt(2) - 1) + t * (1 / Math.sqrt(2)),
      p = 2 * i - c,
      m = u,
      v = 2 * i - s,
      h = d,
      C = 2 * i - a,
      b = l,
      y = i * Math.sqrt(2) + n * (Math.sqrt(2) - 2),
      w = n * (Math.sqrt(2) - 1)
    return {
      pointerEvents: 'none',
      width: e,
      height: e,
      overflow: 'hidden',
      '&::after': {
        content: '""',
        position: 'absolute',
        width: y,
        height: y,
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
            `polygon(${w}px 100%, 50% ${w}px, ${2 * i -
              w}px 100%, ${w}px 100%)`,
            `path('M ${a} ${l} A ${n} ${n} 0 0 0 ${s} ${d} L ${c} ${u} A ${t} ${t} 0 0 1 ${p} ${m} L ${v} ${h} A ${n} ${n} 0 0 0 ${C} ${b} Z')`
          ]
        },
        content: '""'
      }
    }
  }
function $s(e, t) {
  return un.reduce((n, o) => {
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
function St(e, t) {
  const n = f({}, e)
  for (let o = 0; o < t.length; o += 1) {
    const r = t[o]
    delete n[r]
  }
  return n
}
const ht = (e, t, n) => {
  bs(e, `[ant-design-vue: ${t}] ${n}`)
}
function Cs() {
  return ''
}
function ws(e) {
  return e ? e.ownerDocument : window.document
}
function Yi() {}
const Ss = () => ({
    action: I.oneOfType([I.string, I.arrayOf(I.string)]).def([]),
    showAction: I.any.def([]),
    hideAction: I.any.def([]),
    getPopupClassNameFromAlign: I.any.def(Cs),
    onPopupVisibleChange: Function,
    afterPopupVisibleChange: I.func.def(Yi),
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
    getDocument: I.func.def(ws),
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
  So = {
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
  xs = f(f({}, So), { mobile: { type: Object } }),
  Os = f(f({}, So), {
    mask: Boolean,
    mobile: { type: Object },
    maskAnimation: String,
    maskTransitionName: String
  })
function qi(e) {
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
    (a || i) && (l = Mi({ prefixCls: t, transitionName: a, animation: i })),
    g(We, E({ appear: !0 }, l), {
      default: () => [
        jt(g('div', { style: { zIndex: o }, class: `${t}-mask` }, null), [
          [vl('if'), n]
        ])
      ]
    })
  )
}
qi.displayName = 'Mask'
const Ts = U({
  compatConfig: { MODE: 3 },
  name: 'MobilePopupInner',
  inheritAttrs: !1,
  props: xs,
  emits: ['mouseenter', 'mouseleave', 'mousedown', 'touchstart', 'align'],
  setup(e, t) {
    let { expose: n, slots: o } = t
    const r = L()
    return (
      n({ forceAlign: () => {}, getElement: () => r.value }),
      () => {
        var i
        const {
            zIndex: a,
            visible: l,
            prefixCls: s,
            mobile: {
              popupClassName: d,
              popupStyle: c,
              popupMotion: u = {},
              popupRender: p
            } = {}
          } = e,
          m = f({ zIndex: a }, c)
        let v = et(
          (i = o.default) === null || i === void 0 ? void 0 : i.call(o)
        )
        v.length > 1 && (v = g('div', { class: `${s}-content` }, [v])),
          p && (v = p(v))
        const h = ne(s, d)
        return g(We, E({ ref: r }, u), {
          default: () => [l ? g('div', { class: h, style: m }, [v]) : null]
        })
      }
    )
  }
})
var Ps =
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
      function l(c) {
        try {
          d(o.next(c))
        } catch (u) {
          a(u)
        }
      }
      function s(c) {
        try {
          d(o.throw(c))
        } catch (u) {
          a(u)
        }
      }
      function d(c) {
        c.done ? i(c.value) : r(c.value).then(l, s)
      }
      d((o = o.apply(e, t || [])).next())
    })
  }
const rr = ['measure', 'align', null, 'motion'],
  Is = (e, t) => {
    const n = B(null),
      o = B(),
      r = B(!1)
    function i(s) {
      r.value || (n.value = s)
    }
    function a() {
      ce.cancel(o.value)
    }
    function l(s) {
      a(),
        (o.value = ce(() => {
          let d = n.value
          switch (n.value) {
            case 'align':
              d = 'motion'
              break
            case 'motion':
              d = 'stable'
              break
          }
          i(d), s == null || s()
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
      Ee(() => {
        J(
          n,
          () => {
            switch (n.value) {
              case 'measure':
                t()
                break
            }
            n.value &&
              (o.value = ce(() =>
                Ps(void 0, void 0, void 0, function*() {
                  const s = rr.indexOf(n.value),
                    d = rr[s + 1]
                  d && s !== -1 && i(d)
                })
              ))
          },
          { immediate: !0, flush: 'post' }
        )
      }),
      me(() => {
        ;(r.value = !0), a()
      }),
      [n, l]
    )
  },
  Es = e => {
    const t = B({ width: 0, height: 0 })
    function n(r) {
      t.value = { width: r.offsetWidth, height: r.offsetHeight }
    }
    return [
      O(() => {
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
function ir(e, t) {
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
function ar(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {}
    t % 2
      ? ir(Object(n), !0).forEach(function(o) {
          _s(e, o, n[o])
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
      : ir(Object(n)).forEach(function(o) {
          Object.defineProperty(e, o, Object.getOwnPropertyDescriptor(n, o))
        })
  }
  return e
}
function kn(e) {
  '@babel/helpers - typeof'
  return (
    (kn =
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
    kn(e)
  )
}
function _s(e, t, n) {
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
var Tt,
  As = { Webkit: '-webkit-', Moz: '-moz-', ms: '-ms-', O: '-o-' }
function cn() {
  if (Tt !== void 0) return Tt
  Tt = ''
  var e = document.createElement('p').style,
    t = 'Transform'
  for (var n in As) n + t in e && (Tt = n)
  return Tt
}
function ki() {
  return cn() ? ''.concat(cn(), 'TransitionProperty') : 'transitionProperty'
}
function Sn() {
  return cn() ? ''.concat(cn(), 'Transform') : 'transform'
}
function lr(e, t) {
  var n = ki()
  n &&
    ((e.style[n] = t),
    n !== 'transitionProperty' && (e.style.transitionProperty = t))
}
function _n(e, t) {
  var n = Sn()
  n && ((e.style[n] = t), n !== 'transform' && (e.style.transform = t))
}
function Ms(e) {
  return e.style.transitionProperty || e.style[ki()]
}
function Rs(e) {
  var t = window.getComputedStyle(e, null),
    n = t.getPropertyValue('transform') || t.getPropertyValue(Sn())
  if (n && n !== 'none') {
    var o = n.replace(/[^0-9\-.,]/g, '').split(',')
    return { x: parseFloat(o[12] || o[4], 0), y: parseFloat(o[13] || o[5], 0) }
  }
  return { x: 0, y: 0 }
}
var Bs = /matrix\((.*)\)/,
  Ds = /matrix3d\((.*)\)/
function zs(e, t) {
  var n = window.getComputedStyle(e, null),
    o = n.getPropertyValue('transform') || n.getPropertyValue(Sn())
  if (o && o !== 'none') {
    var r,
      i = o.match(Bs)
    if (i)
      (i = i[1]),
        (r = i.split(',').map(function(l) {
          return parseFloat(l, 10)
        })),
        (r[4] = t.x),
        (r[5] = t.y),
        _n(e, 'matrix('.concat(r.join(','), ')'))
    else {
      var a = o.match(Ds)[1]
      ;(r = a.split(',').map(function(l) {
        return parseFloat(l, 10)
      })),
        (r[12] = t.x),
        (r[13] = t.y),
        _n(e, 'matrix3d('.concat(r.join(','), ')'))
    }
  } else
    _n(
      e,
      'translateX('
        .concat(t.x, 'px) translateY(')
        .concat(t.y, 'px) translateZ(0)')
    )
}
var Ns = /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source,
  Kt
function sr(e) {
  var t = e.style.display
  ;(e.style.display = 'none'), e.offsetHeight, (e.style.display = t)
}
function dt(e, t, n) {
  var o = n
  if (kn(t) === 'object') {
    for (var r in t) t.hasOwnProperty(r) && dt(e, r, t[r])
    return
  }
  if (typeof o < 'u') {
    typeof o == 'number' && (o = ''.concat(o, 'px')), (e.style[t] = o)
    return
  }
  return Kt(e, t)
}
function Fs(e) {
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
function Zi(e, t) {
  var n = e['page'.concat(t ? 'Y' : 'X', 'Offset')],
    o = 'scroll'.concat(t ? 'Top' : 'Left')
  if (typeof n != 'number') {
    var r = e.document
    ;(n = r.documentElement[o]), typeof n != 'number' && (n = r.body[o])
  }
  return n
}
function Qi(e) {
  return Zi(e)
}
function Ji(e) {
  return Zi(e, !0)
}
function Dt(e) {
  var t = Fs(e),
    n = e.ownerDocument,
    o = n.defaultView || n.parentWindow
  return (t.left += Qi(o)), (t.top += Ji(o)), t
}
function xo(e) {
  return e != null && e == e.window
}
function ea(e) {
  return xo(e) ? e.document : e.nodeType === 9 ? e : e.ownerDocument
}
function Hs(e, t, n) {
  var o = n,
    r = '',
    i = ea(e)
  return (
    (o = o || i.defaultView.getComputedStyle(e, null)),
    o && (r = o.getPropertyValue(t) || o[t]),
    r
  )
}
var Ls = new RegExp('^('.concat(Ns, ')(?!px)[a-z%]+$'), 'i'),
  js = /^(top|right|bottom|left)$/,
  An = 'currentStyle',
  Mn = 'runtimeStyle',
  Ge = 'left',
  Ws = 'px'
function Vs(e, t) {
  var n = e[An] && e[An][t]
  if (Ls.test(n) && !js.test(t)) {
    var o = e.style,
      r = o[Ge],
      i = e[Mn][Ge]
    ;(e[Mn][Ge] = e[An][Ge]),
      (o[Ge] = t === 'fontSize' ? '1em' : n || 0),
      (n = o.pixelLeft + Ws),
      (o[Ge] = r),
      (e[Mn][Ge] = i)
  }
  return n === '' ? 'auto' : n
}
typeof window < 'u' && (Kt = window.getComputedStyle ? Hs : Vs)
function Ut(e, t) {
  return e === 'left'
    ? t.useCssRight
      ? 'right'
      : e
    : t.useCssBottom
    ? 'bottom'
    : e
}
function ur(e) {
  if (e === 'left') return 'right'
  if (e === 'right') return 'left'
  if (e === 'top') return 'bottom'
  if (e === 'bottom') return 'top'
}
function cr(e, t, n) {
  dt(e, 'position') === 'static' && (e.style.position = 'relative')
  var o = -999,
    r = -999,
    i = Ut('left', n),
    a = Ut('top', n),
    l = ur(i),
    s = ur(a)
  i !== 'left' && (o = 999), a !== 'top' && (r = 999)
  var d = '',
    c = Dt(e)
  ;('left' in t || 'top' in t) && ((d = Ms(e) || ''), lr(e, 'none')),
    'left' in t && ((e.style[l] = ''), (e.style[i] = ''.concat(o, 'px'))),
    'top' in t && ((e.style[s] = ''), (e.style[a] = ''.concat(r, 'px'))),
    sr(e)
  var u = Dt(e),
    p = {}
  for (var m in t)
    if (t.hasOwnProperty(m)) {
      var v = Ut(m, n),
        h = m === 'left' ? o : r,
        C = c[m] - u[m]
      v === m ? (p[v] = h + C) : (p[v] = h - C)
    }
  dt(e, p), sr(e), ('left' in t || 'top' in t) && lr(e, d)
  var b = {}
  for (var y in t)
    if (t.hasOwnProperty(y)) {
      var w = Ut(y, n),
        _ = t[y] - c[y]
      y === w ? (b[w] = p[w] + _) : (b[w] = p[w] - _)
    }
  dt(e, b)
}
function Ks(e, t) {
  var n = Dt(e),
    o = Rs(e),
    r = { x: o.x, y: o.y }
  'left' in t && (r.x = o.x + t.left - n.left),
    'top' in t && (r.y = o.y + t.top - n.top),
    zs(e, r)
}
function Gs(e, t, n) {
  if (n.ignoreShake) {
    var o = Dt(e),
      r = o.left.toFixed(0),
      i = o.top.toFixed(0),
      a = t.left.toFixed(0),
      l = t.top.toFixed(0)
    if (r === a && i === l) return
  }
  n.useCssRight || n.useCssBottom
    ? cr(e, t, n)
    : n.useCssTransform && Sn() in document.body.style
    ? Ks(e, t)
    : cr(e, t, n)
}
function Oo(e, t) {
  for (var n = 0; n < e.length; n++) t(e[n])
}
function ta(e) {
  return Kt(e, 'boxSizing') === 'border-box'
}
var Us = ['margin', 'border', 'padding'],
  Zn = -1,
  Xs = 2,
  Qn = 1,
  Ys = 0
function qs(e, t, n) {
  var o = {},
    r = e.style,
    i
  for (i in t) t.hasOwnProperty(i) && ((o[i] = r[i]), (r[i] = t[i]))
  n.call(e)
  for (i in t) t.hasOwnProperty(i) && (r[i] = o[i])
}
function Et(e, t, n) {
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
          (o += parseFloat(Kt(e, l)) || 0)
      }
  return o
}
var Pe = {
  getParent: function(t) {
    var n = t
    do n.nodeType === 11 && n.host ? (n = n.host) : (n = n.parentNode)
    while (n && n.nodeType !== 1 && n.nodeType !== 9)
    return n
  }
}
Oo(['Width', 'Height'], function(e) {
  ;(Pe['doc'.concat(e)] = function(t) {
    var n = t.document
    return Math.max(
      n.documentElement['scroll'.concat(e)],
      n.body['scroll'.concat(e)],
      Pe['viewport'.concat(e)](n)
    )
  }),
    (Pe['viewport'.concat(e)] = function(t) {
      var n = 'client'.concat(e),
        o = t.document,
        r = o.body,
        i = o.documentElement,
        a = i[n]
      return (o.compatMode === 'CSS1Compat' && a) || (r && r[n]) || a
    })
})
function dr(e, t, n) {
  var o = n
  if (xo(e)) return t === 'width' ? Pe.viewportWidth(e) : Pe.viewportHeight(e)
  if (e.nodeType === 9) return t === 'width' ? Pe.docWidth(e) : Pe.docHeight(e)
  var r = t === 'width' ? ['Left', 'Right'] : ['Top', 'Bottom'],
    i = Math.floor(
      t === 'width'
        ? e.getBoundingClientRect().width
        : e.getBoundingClientRect().height
    ),
    a = ta(e),
    l = 0
  ;(i == null || i <= 0) &&
    ((i = void 0),
    (l = Kt(e, t)),
    (l == null || Number(l) < 0) && (l = e.style[t] || 0),
    (l = Math.floor(parseFloat(l)) || 0)),
    o === void 0 && (o = a ? Qn : Zn)
  var s = i !== void 0 || a,
    d = i || l
  return o === Zn
    ? s
      ? d - Et(e, ['border', 'padding'], r)
      : l
    : s
    ? o === Qn
      ? d
      : d + (o === Xs ? -Et(e, ['border'], r) : Et(e, ['margin'], r))
    : l + Et(e, Us.slice(o), r)
}
var ks = { position: 'absolute', visibility: 'hidden', display: 'block' }
function fr() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n]
  var o,
    r = t[0]
  return (
    r.offsetWidth !== 0
      ? (o = dr.apply(void 0, t))
      : qs(r, ks, function() {
          o = dr.apply(void 0, t)
        }),
    o
  )
}
Oo(['width', 'height'], function(e) {
  var t = e.charAt(0).toUpperCase() + e.slice(1)
  Pe['outer'.concat(t)] = function(o, r) {
    return o && fr(o, e, r ? Ys : Qn)
  }
  var n = e === 'width' ? ['Left', 'Right'] : ['Top', 'Bottom']
  Pe[e] = function(o, r) {
    var i = r
    if (i !== void 0) {
      if (o) {
        var a = ta(o)
        return a && (i += Et(o, ['padding', 'border'], n)), dt(o, e, i)
      }
      return
    }
    return o && fr(o, e, Zn)
  }
})
function na(e, t) {
  for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
  return e
}
var Y = {
  getWindow: function(t) {
    if (t && t.document && t.setTimeout) return t
    var n = t.ownerDocument || t
    return n.defaultView || n.parentWindow
  },
  getDocument: ea,
  offset: function(t, n, o) {
    if (typeof n < 'u') Gs(t, n, o || {})
    else return Dt(t)
  },
  isWindow: xo,
  each: Oo,
  css: dt,
  clone: function(t) {
    var n,
      o = {}
    for (n in t) t.hasOwnProperty(n) && (o[n] = t[n])
    var r = t.overflow
    if (r) for (n in t) t.hasOwnProperty(n) && (o.overflow[n] = t.overflow[n])
    return o
  },
  mix: na,
  getWindowScrollLeft: function(t) {
    return Qi(t)
  },
  getWindowScrollTop: function(t) {
    return Ji(t)
  },
  merge: function() {
    for (var t = {}, n = 0; n < arguments.length; n++)
      Y.mix(t, n < 0 || arguments.length <= n ? void 0 : arguments[n])
    return t
  },
  viewportWidth: 0,
  viewportHeight: 0
}
na(Y, Pe)
var Rn = Y.getParent
function Jn(e) {
  if (Y.isWindow(e) || e.nodeType === 9) return null
  var t = Y.getDocument(e),
    n = t.body,
    o,
    r = Y.css(e, 'position'),
    i = r === 'fixed' || r === 'absolute'
  if (!i) return e.nodeName.toLowerCase() === 'html' ? null : Rn(e)
  for (o = Rn(e); o && o !== n && o.nodeType !== 9; o = Rn(o))
    if (((r = Y.css(o, 'position')), r !== 'static')) return o
  return null
}
var pr = Y.getParent
function Zs(e) {
  if (Y.isWindow(e) || e.nodeType === 9) return !1
  var t = Y.getDocument(e),
    n = t.body,
    o = null
  for (o = pr(e); o && o !== n && o !== t; o = pr(o)) {
    var r = Y.css(o, 'position')
    if (r === 'fixed') return !0
  }
  return !1
}
function To(e, t) {
  for (
    var n = { left: 0, right: 1 / 0, top: 0, bottom: 1 / 0 },
      o = Jn(e),
      r = Y.getDocument(e),
      i = r.defaultView || r.parentWindow,
      a = r.body,
      l = r.documentElement;
    o;

  ) {
    if (
      (navigator.userAgent.indexOf('MSIE') === -1 || o.clientWidth !== 0) &&
      o !== a &&
      o !== l &&
      Y.css(o, 'overflow') !== 'visible'
    ) {
      var s = Y.offset(o)
      ;(s.left += o.clientLeft),
        (s.top += o.clientTop),
        (n.top = Math.max(n.top, s.top)),
        (n.right = Math.min(n.right, s.left + o.clientWidth)),
        (n.bottom = Math.min(n.bottom, s.top + o.clientHeight)),
        (n.left = Math.max(n.left, s.left))
    } else if (o === a || o === l) break
    o = Jn(o)
  }
  var d = null
  if (!Y.isWindow(e) && e.nodeType !== 9) {
    d = e.style.position
    var c = Y.css(e, 'position')
    c === 'absolute' && (e.style.position = 'fixed')
  }
  var u = Y.getWindowScrollLeft(i),
    p = Y.getWindowScrollTop(i),
    m = Y.viewportWidth(i),
    v = Y.viewportHeight(i),
    h = l.scrollWidth,
    C = l.scrollHeight,
    b = window.getComputedStyle(a)
  if (
    (b.overflowX === 'hidden' && (h = i.innerWidth),
    b.overflowY === 'hidden' && (C = i.innerHeight),
    e.style && (e.style.position = d),
    t || Zs(e))
  )
    (n.left = Math.max(n.left, u)),
      (n.top = Math.max(n.top, p)),
      (n.right = Math.min(n.right, u + m)),
      (n.bottom = Math.min(n.bottom, p + v))
  else {
    var y = Math.max(h, u + m)
    n.right = Math.min(n.right, y)
    var w = Math.max(C, p + v)
    n.bottom = Math.min(n.bottom, w)
  }
  return n.top >= 0 && n.left >= 0 && n.bottom > n.top && n.right > n.left
    ? n
    : null
}
function Qs(e, t, n, o) {
  var r = Y.clone(e),
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
    Y.mix(r, i)
  )
}
function Po(e) {
  var t, n, o
  if (!Y.isWindow(e) && e.nodeType !== 9)
    (t = Y.offset(e)), (n = Y.outerWidth(e)), (o = Y.outerHeight(e))
  else {
    var r = Y.getWindow(e)
    ;(t = { left: Y.getWindowScrollLeft(r), top: Y.getWindowScrollTop(r) }),
      (n = Y.viewportWidth(r)),
      (o = Y.viewportHeight(r))
  }
  return (t.width = n), (t.height = o), t
}
function mr(e, t) {
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
function Xt(e, t, n, o, r) {
  var i = mr(t, n[1]),
    a = mr(e, n[0]),
    l = [a.left - i.left, a.top - i.top]
  return {
    left: Math.round(e.left - l[0] + o[0] - r[0]),
    top: Math.round(e.top - l[1] + o[1] - r[1])
  }
}
function vr(e, t, n) {
  return e.left < n.left || e.left + t.width > n.right
}
function gr(e, t, n) {
  return e.top < n.top || e.top + t.height > n.bottom
}
function Js(e, t, n) {
  return e.left > n.right || e.left + t.width < n.left
}
function eu(e, t, n) {
  return e.top > n.bottom || e.top + t.height < n.top
}
function Yt(e, t, n) {
  var o = []
  return (
    Y.each(e, function(r) {
      o.push(
        r.replace(t, function(i) {
          return n[i]
        })
      )
    }),
    o
  )
}
function qt(e, t) {
  return (e[t] = -e[t]), e
}
function hr(e, t) {
  var n
  return (
    /%$/.test(e)
      ? (n = (parseInt(e.substring(0, e.length - 1), 10) / 100) * t)
      : (n = parseInt(e, 10)),
    n || 0
  )
}
function br(e, t) {
  ;(e[0] = hr(e[0], t.width)), (e[1] = hr(e[1], t.height))
}
function oa(e, t, n, o) {
  var r = n.points,
    i = n.offset || [0, 0],
    a = n.targetOffset || [0, 0],
    l = n.overflow,
    s = n.source || e
  ;(i = [].concat(i)), (a = [].concat(a)), (l = l || {})
  var d = {},
    c = 0,
    u = !!(l && l.alwaysByViewport),
    p = To(s, u),
    m = Po(s)
  br(i, m), br(a, t)
  var v = Xt(m, t, r, i, a),
    h = Y.merge(m, v)
  if (p && (l.adjustX || l.adjustY) && o) {
    if (l.adjustX && vr(v, m, p)) {
      var C = Yt(r, /[lr]/gi, { l: 'r', r: 'l' }),
        b = qt(i, 0),
        y = qt(a, 0),
        w = Xt(m, t, C, b, y)
      Js(w, m, p) || ((c = 1), (r = C), (i = b), (a = y))
    }
    if (l.adjustY && gr(v, m, p)) {
      var _ = Yt(r, /[tb]/gi, { t: 'b', b: 't' }),
        P = qt(i, 1),
        S = qt(a, 1),
        $ = Xt(m, t, _, P, S)
      eu($, m, p) || ((c = 1), (r = _), (i = P), (a = S))
    }
    c && ((v = Xt(m, t, r, i, a)), Y.mix(h, v))
    var A = vr(v, m, p),
      z = gr(v, m, p)
    if (A || z) {
      var T = r
      A && (T = Yt(r, /[lr]/gi, { l: 'r', r: 'l' })),
        z && (T = Yt(r, /[tb]/gi, { t: 'b', b: 't' })),
        (r = T),
        (i = n.offset || [0, 0]),
        (a = n.targetOffset || [0, 0])
    }
    ;(d.adjustX = l.adjustX && A),
      (d.adjustY = l.adjustY && z),
      (d.adjustX || d.adjustY) && (h = Qs(v, m, p, d))
  }
  return (
    h.width !== m.width && Y.css(s, 'width', Y.width(s) + h.width - m.width),
    h.height !== m.height &&
      Y.css(s, 'height', Y.height(s) + h.height - m.height),
    Y.offset(
      s,
      { left: h.left, top: h.top },
      {
        useCssRight: n.useCssRight,
        useCssBottom: n.useCssBottom,
        useCssTransform: n.useCssTransform,
        ignoreShake: n.ignoreShake
      }
    ),
    { points: r, offset: i, targetOffset: a, overflow: d }
  )
}
function tu(e, t) {
  var n = To(e, t),
    o = Po(e)
  return (
    !n ||
    o.left + o.width <= n.left ||
    o.top + o.height <= n.top ||
    o.left >= n.right ||
    o.top >= n.bottom
  )
}
function Io(e, t, n) {
  var o = n.target || t,
    r = Po(o),
    i = !tu(o, n.overflow && n.overflow.alwaysByViewport)
  return oa(e, r, n, i)
}
Io.__getOffsetParent = Jn
Io.__getVisibleRectForElement = To
function nu(e, t, n) {
  var o,
    r,
    i = Y.getDocument(e),
    a = i.defaultView || i.parentWindow,
    l = Y.getWindowScrollLeft(a),
    s = Y.getWindowScrollTop(a),
    d = Y.viewportWidth(a),
    c = Y.viewportHeight(a)
  'pageX' in t ? (o = t.pageX) : (o = l + t.clientX),
    'pageY' in t ? (r = t.pageY) : (r = s + t.clientY)
  var u = { left: o, top: r, width: 0, height: 0 },
    p = o >= 0 && o <= l + d && r >= 0 && r <= s + c,
    m = [n.points[0], 'cc']
  return oa(e, u, ar(ar({}, n), {}, { points: m }), p)
}
function Oe(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
    n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0,
    o = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1,
    r = e
  if ((Array.isArray(e) && (r = Ct(e)[0]), !r)) return null
  const i = Ai(r, t, o)
  return (
    (i.props = n ? f(f({}, i.props), t) : i.props),
    ho(typeof i.props.class != 'object'),
    i
  )
}
function _g(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
    n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0
  return e.map(o => Oe(o, t, n))
}
function ou(e, t, n) {
  pt(Ai(e, f({}, t)), n)
}
const ra = e =>
  (e || []).some(t =>
    gl(t) ? !(t.type === hl || (t.type === je && !ra(t.children))) : !0
  )
    ? e
    : null
function Ag(e, t, n, o) {
  var r
  const i = (r = e[t]) === null || r === void 0 ? void 0 : r.call(e, n)
  return ra(i) ? i : o == null ? void 0 : o()
}
const ia = e => {
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
function ru(e, t) {
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
function iu(e, t) {
  e !== document.activeElement &&
    qe(t, e) &&
    typeof e.focus == 'function' &&
    e.focus()
}
function yr(e, t) {
  let n = null,
    o = null
  function r(a) {
    let [{ target: l }] = a
    if (!document.documentElement.contains(l)) return
    const { width: s, height: d } = l.getBoundingClientRect(),
      c = Math.floor(s),
      u = Math.floor(d)
    ;(n !== c || o !== u) &&
      Promise.resolve().then(() => {
        t({ width: c, height: u })
      }),
      (n = c),
      (o = u)
  }
  const i = new Wi(r)
  return (
    e && i.observe(e),
    () => {
      i.disconnect()
    }
  )
}
const au = (e, t) => {
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
function lu() {
  ;(this.__data__ = []), (this.size = 0)
}
function aa(e, t) {
  return e === t || (e !== e && t !== t)
}
function xn(e, t) {
  for (var n = e.length; n--; ) if (aa(e[n][0], t)) return n
  return -1
}
var su = Array.prototype,
  uu = su.splice
function cu(e) {
  var t = this.__data__,
    n = xn(t, e)
  if (n < 0) return !1
  var o = t.length - 1
  return n == o ? t.pop() : uu.call(t, n, 1), --this.size, !0
}
function du(e) {
  var t = this.__data__,
    n = xn(t, e)
  return n < 0 ? void 0 : t[n][1]
}
function fu(e) {
  return xn(this.__data__, e) > -1
}
function pu(e, t) {
  var n = this.__data__,
    o = xn(n, e)
  return o < 0 ? (++this.size, n.push([e, t])) : (n[o][1] = t), this
}
function Be(e) {
  var t = -1,
    n = e == null ? 0 : e.length
  for (this.clear(); ++t < n; ) {
    var o = e[t]
    this.set(o[0], o[1])
  }
}
Be.prototype.clear = lu
Be.prototype.delete = cu
Be.prototype.get = du
Be.prototype.has = fu
Be.prototype.set = pu
function mu() {
  ;(this.__data__ = new Be()), (this.size = 0)
}
function vu(e) {
  var t = this.__data__,
    n = t.delete(e)
  return (this.size = t.size), n
}
function gu(e) {
  return this.__data__.get(e)
}
function hu(e) {
  return this.__data__.has(e)
}
var bu =
  typeof global == 'object' && global && global.Object === Object && global
const la = bu
var yu = typeof self == 'object' && self && self.Object === Object && self,
  $u = la || yu || Function('return this')()
const De = $u
var Cu = De.Symbol
const bt = Cu
var sa = Object.prototype,
  wu = sa.hasOwnProperty,
  Su = sa.toString,
  Pt = bt ? bt.toStringTag : void 0
function xu(e) {
  var t = wu.call(e, Pt),
    n = e[Pt]
  try {
    e[Pt] = void 0
    var o = !0
  } catch {}
  var r = Su.call(e)
  return o && (t ? (e[Pt] = n) : delete e[Pt]), r
}
var Ou = Object.prototype,
  Tu = Ou.toString
function Pu(e) {
  return Tu.call(e)
}
var Iu = '[object Null]',
  Eu = '[object Undefined]',
  $r = bt ? bt.toStringTag : void 0
function xt(e) {
  return e == null
    ? e === void 0
      ? Eu
      : Iu
    : $r && $r in Object(e)
    ? xu(e)
    : Pu(e)
}
function ua(e) {
  var t = typeof e
  return e != null && (t == 'object' || t == 'function')
}
var _u = '[object AsyncFunction]',
  Au = '[object Function]',
  Mu = '[object GeneratorFunction]',
  Ru = '[object Proxy]'
function ca(e) {
  if (!ua(e)) return !1
  var t = xt(e)
  return t == Au || t == Mu || t == _u || t == Ru
}
var Bu = De['__core-js_shared__']
const Bn = Bu
var Cr = (function() {
  var e = /[^.]+$/.exec((Bn && Bn.keys && Bn.keys.IE_PROTO) || '')
  return e ? 'Symbol(src)_1.' + e : ''
})()
function Du(e) {
  return !!Cr && Cr in e
}
var zu = Function.prototype,
  Nu = zu.toString
function nt(e) {
  if (e != null) {
    try {
      return Nu.call(e)
    } catch {}
    try {
      return e + ''
    } catch {}
  }
  return ''
}
var Fu = /[\\^$.*+?()[\]{}|]/g,
  Hu = /^\[object .+?Constructor\]$/,
  Lu = Function.prototype,
  ju = Object.prototype,
  Wu = Lu.toString,
  Vu = ju.hasOwnProperty,
  Ku = RegExp(
    '^' +
      Wu.call(Vu)
        .replace(Fu, '\\$&')
        .replace(
          /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
          '$1.*?'
        ) +
      '$'
  )
function Gu(e) {
  if (!ua(e) || Du(e)) return !1
  var t = ca(e) ? Ku : Hu
  return t.test(nt(e))
}
function Uu(e, t) {
  return e == null ? void 0 : e[t]
}
function Ot(e, t) {
  var n = Uu(e, t)
  return Gu(n) ? n : void 0
}
var Xu = Ot(De, 'Map')
const zt = Xu
var Yu = Ot(Object, 'create')
const Nt = Yu
function qu() {
  ;(this.__data__ = Nt ? Nt(null) : {}), (this.size = 0)
}
function ku(e) {
  var t = this.has(e) && delete this.__data__[e]
  return (this.size -= t ? 1 : 0), t
}
var Zu = '__lodash_hash_undefined__',
  Qu = Object.prototype,
  Ju = Qu.hasOwnProperty
function ec(e) {
  var t = this.__data__
  if (Nt) {
    var n = t[e]
    return n === Zu ? void 0 : n
  }
  return Ju.call(t, e) ? t[e] : void 0
}
var tc = Object.prototype,
  nc = tc.hasOwnProperty
function oc(e) {
  var t = this.__data__
  return Nt ? t[e] !== void 0 : nc.call(t, e)
}
var rc = '__lodash_hash_undefined__'
function ic(e, t) {
  var n = this.__data__
  return (
    (this.size += this.has(e) ? 0 : 1),
    (n[e] = Nt && t === void 0 ? rc : t),
    this
  )
}
function Je(e) {
  var t = -1,
    n = e == null ? 0 : e.length
  for (this.clear(); ++t < n; ) {
    var o = e[t]
    this.set(o[0], o[1])
  }
}
Je.prototype.clear = qu
Je.prototype.delete = ku
Je.prototype.get = ec
Je.prototype.has = oc
Je.prototype.set = ic
function ac() {
  ;(this.size = 0),
    (this.__data__ = {
      hash: new Je(),
      map: new (zt || Be)(),
      string: new Je()
    })
}
function lc(e) {
  var t = typeof e
  return t == 'string' || t == 'number' || t == 'symbol' || t == 'boolean'
    ? e !== '__proto__'
    : e === null
}
function On(e, t) {
  var n = e.__data__
  return lc(t) ? n[typeof t == 'string' ? 'string' : 'hash'] : n.map
}
function sc(e) {
  var t = On(this, e).delete(e)
  return (this.size -= t ? 1 : 0), t
}
function uc(e) {
  return On(this, e).get(e)
}
function cc(e) {
  return On(this, e).has(e)
}
function dc(e, t) {
  var n = On(this, e),
    o = n.size
  return n.set(e, t), (this.size += n.size == o ? 0 : 1), this
}
function ot(e) {
  var t = -1,
    n = e == null ? 0 : e.length
  for (this.clear(); ++t < n; ) {
    var o = e[t]
    this.set(o[0], o[1])
  }
}
ot.prototype.clear = ac
ot.prototype.delete = sc
ot.prototype.get = uc
ot.prototype.has = cc
ot.prototype.set = dc
var fc = 200
function pc(e, t) {
  var n = this.__data__
  if (n instanceof Be) {
    var o = n.__data__
    if (!zt || o.length < fc - 1)
      return o.push([e, t]), (this.size = ++n.size), this
    n = this.__data__ = new ot(o)
  }
  return n.set(e, t), (this.size = n.size), this
}
function Le(e) {
  var t = (this.__data__ = new Be(e))
  this.size = t.size
}
Le.prototype.clear = mu
Le.prototype.delete = vu
Le.prototype.get = gu
Le.prototype.has = hu
Le.prototype.set = pc
var mc = '__lodash_hash_undefined__'
function vc(e) {
  return this.__data__.set(e, mc), this
}
function gc(e) {
  return this.__data__.has(e)
}
function Ft(e) {
  var t = -1,
    n = e == null ? 0 : e.length
  for (this.__data__ = new ot(); ++t < n; ) this.add(e[t])
}
Ft.prototype.add = Ft.prototype.push = vc
Ft.prototype.has = gc
function hc(e, t) {
  for (var n = -1, o = e == null ? 0 : e.length; ++n < o; )
    if (t(e[n], n, e)) return !0
  return !1
}
function da(e, t) {
  return e.has(t)
}
var bc = 1,
  yc = 2
function fa(e, t, n, o, r, i) {
  var a = n & bc,
    l = e.length,
    s = t.length
  if (l != s && !(a && s > l)) return !1
  var d = i.get(e),
    c = i.get(t)
  if (d && c) return d == t && c == e
  var u = -1,
    p = !0,
    m = n & yc ? new Ft() : void 0
  for (i.set(e, t), i.set(t, e); ++u < l; ) {
    var v = e[u],
      h = t[u]
    if (o) var C = a ? o(h, v, u, t, e, i) : o(v, h, u, e, t, i)
    if (C !== void 0) {
      if (C) continue
      p = !1
      break
    }
    if (m) {
      if (
        !hc(t, function(b, y) {
          if (!da(m, y) && (v === b || r(v, b, n, o, i))) return m.push(y)
        })
      ) {
        p = !1
        break
      }
    } else if (!(v === h || r(v, h, n, o, i))) {
      p = !1
      break
    }
  }
  return i.delete(e), i.delete(t), p
}
var $c = De.Uint8Array
const wr = $c
function Cc(e) {
  var t = -1,
    n = Array(e.size)
  return (
    e.forEach(function(o, r) {
      n[++t] = [r, o]
    }),
    n
  )
}
function Eo(e) {
  var t = -1,
    n = Array(e.size)
  return (
    e.forEach(function(o) {
      n[++t] = o
    }),
    n
  )
}
var wc = 1,
  Sc = 2,
  xc = '[object Boolean]',
  Oc = '[object Date]',
  Tc = '[object Error]',
  Pc = '[object Map]',
  Ic = '[object Number]',
  Ec = '[object RegExp]',
  _c = '[object Set]',
  Ac = '[object String]',
  Mc = '[object Symbol]',
  Rc = '[object ArrayBuffer]',
  Bc = '[object DataView]',
  Sr = bt ? bt.prototype : void 0,
  Dn = Sr ? Sr.valueOf : void 0
function Dc(e, t, n, o, r, i, a) {
  switch (n) {
    case Bc:
      if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
        return !1
      ;(e = e.buffer), (t = t.buffer)
    case Rc:
      return !(e.byteLength != t.byteLength || !i(new wr(e), new wr(t)))
    case xc:
    case Oc:
    case Ic:
      return aa(+e, +t)
    case Tc:
      return e.name == t.name && e.message == t.message
    case Ec:
    case Ac:
      return e == t + ''
    case Pc:
      var l = Cc
    case _c:
      var s = o & wc
      if ((l || (l = Eo), e.size != t.size && !s)) return !1
      var d = a.get(e)
      if (d) return d == t
      ;(o |= Sc), a.set(e, t)
      var c = fa(l(e), l(t), o, r, i, a)
      return a.delete(e), c
    case Mc:
      if (Dn) return Dn.call(e) == Dn.call(t)
  }
  return !1
}
function zc(e, t) {
  for (var n = -1, o = t.length, r = e.length; ++n < o; ) e[r + n] = t[n]
  return e
}
var Nc = Array.isArray
const Ht = Nc
function Fc(e, t, n) {
  var o = t(e)
  return Ht(e) ? o : zc(o, n(e))
}
function Hc(e, t) {
  for (var n = -1, o = e == null ? 0 : e.length, r = 0, i = []; ++n < o; ) {
    var a = e[n]
    t(a, n, e) && (i[r++] = a)
  }
  return i
}
function Lc() {
  return []
}
var jc = Object.prototype,
  Wc = jc.propertyIsEnumerable,
  xr = Object.getOwnPropertySymbols,
  Vc = xr
    ? function(e) {
        return e == null
          ? []
          : ((e = Object(e)),
            Hc(xr(e), function(t) {
              return Wc.call(e, t)
            }))
      }
    : Lc
const Kc = Vc
function Gc(e, t) {
  for (var n = -1, o = Array(e); ++n < e; ) o[n] = t(n)
  return o
}
function yt(e) {
  return e != null && typeof e == 'object'
}
var Uc = '[object Arguments]'
function Or(e) {
  return yt(e) && xt(e) == Uc
}
var pa = Object.prototype,
  Xc = pa.hasOwnProperty,
  Yc = pa.propertyIsEnumerable,
  qc = Or(
    (function() {
      return arguments
    })()
  )
    ? Or
    : function(e) {
        return yt(e) && Xc.call(e, 'callee') && !Yc.call(e, 'callee')
      }
const ma = qc
function kc() {
  return !1
}
var va = typeof exports == 'object' && exports && !exports.nodeType && exports,
  Tr = va && typeof module == 'object' && module && !module.nodeType && module,
  Zc = Tr && Tr.exports === va,
  Pr = Zc ? De.Buffer : void 0,
  Qc = Pr ? Pr.isBuffer : void 0,
  Jc = Qc || kc
const dn = Jc
var ed = 9007199254740991,
  td = /^(?:0|[1-9]\d*)$/
function nd(e, t) {
  var n = typeof e
  return (
    (t = t ?? ed),
    !!t &&
      (n == 'number' || (n != 'symbol' && td.test(e))) &&
      e > -1 &&
      e % 1 == 0 &&
      e < t
  )
}
var od = 9007199254740991
function ga(e) {
  return typeof e == 'number' && e > -1 && e % 1 == 0 && e <= od
}
var rd = '[object Arguments]',
  id = '[object Array]',
  ad = '[object Boolean]',
  ld = '[object Date]',
  sd = '[object Error]',
  ud = '[object Function]',
  cd = '[object Map]',
  dd = '[object Number]',
  fd = '[object Object]',
  pd = '[object RegExp]',
  md = '[object Set]',
  vd = '[object String]',
  gd = '[object WeakMap]',
  hd = '[object ArrayBuffer]',
  bd = '[object DataView]',
  yd = '[object Float32Array]',
  $d = '[object Float64Array]',
  Cd = '[object Int8Array]',
  wd = '[object Int16Array]',
  Sd = '[object Int32Array]',
  xd = '[object Uint8Array]',
  Od = '[object Uint8ClampedArray]',
  Td = '[object Uint16Array]',
  Pd = '[object Uint32Array]',
  oe = {}
oe[yd] = oe[$d] = oe[Cd] = oe[wd] = oe[Sd] = oe[xd] = oe[Od] = oe[Td] = oe[
  Pd
] = !0
oe[rd] = oe[id] = oe[hd] = oe[ad] = oe[bd] = oe[ld] = oe[sd] = oe[ud] = oe[
  cd
] = oe[dd] = oe[fd] = oe[pd] = oe[md] = oe[vd] = oe[gd] = !1
function Id(e) {
  return yt(e) && ga(e.length) && !!oe[xt(e)]
}
function Ed(e) {
  return function(t) {
    return e(t)
  }
}
var ha = typeof exports == 'object' && exports && !exports.nodeType && exports,
  _t = ha && typeof module == 'object' && module && !module.nodeType && module,
  _d = _t && _t.exports === ha,
  zn = _d && la.process,
  Ad = (function() {
    try {
      var e = _t && _t.require && _t.require('util').types
      return e || (zn && zn.binding && zn.binding('util'))
    } catch {}
  })()
const Ir = Ad
var Er = Ir && Ir.isTypedArray,
  Md = Er ? Ed(Er) : Id
const _o = Md
var Rd = Object.prototype,
  Bd = Rd.hasOwnProperty
function Dd(e, t) {
  var n = Ht(e),
    o = !n && ma(e),
    r = !n && !o && dn(e),
    i = !n && !o && !r && _o(e),
    a = n || o || r || i,
    l = a ? Gc(e.length, String) : [],
    s = l.length
  for (var d in e)
    (t || Bd.call(e, d)) &&
      !(
        a &&
        (d == 'length' ||
          (r && (d == 'offset' || d == 'parent')) ||
          (i && (d == 'buffer' || d == 'byteLength' || d == 'byteOffset')) ||
          nd(d, s))
      ) &&
      l.push(d)
  return l
}
var zd = Object.prototype
function ba(e) {
  var t = e && e.constructor,
    n = (typeof t == 'function' && t.prototype) || zd
  return e === n
}
function Nd(e, t) {
  return function(n) {
    return e(t(n))
  }
}
var Fd = Nd(Object.keys, Object)
const Hd = Fd
var Ld = Object.prototype,
  jd = Ld.hasOwnProperty
function ya(e) {
  if (!ba(e)) return Hd(e)
  var t = []
  for (var n in Object(e)) jd.call(e, n) && n != 'constructor' && t.push(n)
  return t
}
function $a(e) {
  return e != null && ga(e.length) && !ca(e)
}
function Wd(e) {
  return $a(e) ? Dd(e) : ya(e)
}
function _r(e) {
  return Fc(e, Wd, Kc)
}
var Vd = 1,
  Kd = Object.prototype,
  Gd = Kd.hasOwnProperty
function Ud(e, t, n, o, r, i) {
  var a = n & Vd,
    l = _r(e),
    s = l.length,
    d = _r(t),
    c = d.length
  if (s != c && !a) return !1
  for (var u = s; u--; ) {
    var p = l[u]
    if (!(a ? p in t : Gd.call(t, p))) return !1
  }
  var m = i.get(e),
    v = i.get(t)
  if (m && v) return m == t && v == e
  var h = !0
  i.set(e, t), i.set(t, e)
  for (var C = a; ++u < s; ) {
    p = l[u]
    var b = e[p],
      y = t[p]
    if (o) var w = a ? o(y, b, p, t, e, i) : o(b, y, p, e, t, i)
    if (!(w === void 0 ? b === y || r(b, y, n, o, i) : w)) {
      h = !1
      break
    }
    C || (C = p == 'constructor')
  }
  if (h && !C) {
    var _ = e.constructor,
      P = t.constructor
    _ != P &&
      'constructor' in e &&
      'constructor' in t &&
      !(
        typeof _ == 'function' &&
        _ instanceof _ &&
        typeof P == 'function' &&
        P instanceof P
      ) &&
      (h = !1)
  }
  return i.delete(e), i.delete(t), h
}
var Xd = Ot(De, 'DataView')
const eo = Xd
var Yd = Ot(De, 'Promise')
const to = Yd
var qd = Ot(De, 'Set')
const ft = qd
var kd = Ot(De, 'WeakMap')
const no = kd
var Ar = '[object Map]',
  Zd = '[object Object]',
  Mr = '[object Promise]',
  Rr = '[object Set]',
  Br = '[object WeakMap]',
  Dr = '[object DataView]',
  Qd = nt(eo),
  Jd = nt(zt),
  ef = nt(to),
  tf = nt(ft),
  nf = nt(no),
  Ye = xt
;((eo && Ye(new eo(new ArrayBuffer(1))) != Dr) ||
  (zt && Ye(new zt()) != Ar) ||
  (to && Ye(to.resolve()) != Mr) ||
  (ft && Ye(new ft()) != Rr) ||
  (no && Ye(new no()) != Br)) &&
  (Ye = function(e) {
    var t = xt(e),
      n = t == Zd ? e.constructor : void 0,
      o = n ? nt(n) : ''
    if (o)
      switch (o) {
        case Qd:
          return Dr
        case Jd:
          return Ar
        case ef:
          return Mr
        case tf:
          return Rr
        case nf:
          return Br
      }
    return t
  })
const oo = Ye
var of = 1,
  zr = '[object Arguments]',
  Nr = '[object Array]',
  kt = '[object Object]',
  rf = Object.prototype,
  Fr = rf.hasOwnProperty
function af(e, t, n, o, r, i) {
  var a = Ht(e),
    l = Ht(t),
    s = a ? Nr : oo(e),
    d = l ? Nr : oo(t)
  ;(s = s == zr ? kt : s), (d = d == zr ? kt : d)
  var c = s == kt,
    u = d == kt,
    p = s == d
  if (p && dn(e)) {
    if (!dn(t)) return !1
    ;(a = !0), (c = !1)
  }
  if (p && !c)
    return (
      i || (i = new Le()),
      a || _o(e) ? fa(e, t, n, o, r, i) : Dc(e, t, s, n, o, r, i)
    )
  if (!(n & of)) {
    var m = c && Fr.call(e, '__wrapped__'),
      v = u && Fr.call(t, '__wrapped__')
    if (m || v) {
      var h = m ? e.value() : e,
        C = v ? t.value() : t
      return i || (i = new Le()), r(h, C, n, o, i)
    }
  }
  return p ? (i || (i = new Le()), Ud(e, t, n, o, r, i)) : !1
}
function Ca(e, t, n, o, r) {
  return e === t
    ? !0
    : e == null || t == null || (!yt(e) && !yt(t))
    ? e !== e && t !== t
    : af(e, t, n, o, Ca, r)
}
function lf(e, t) {
  return Ca(e, t)
}
const sf = {
  align: Object,
  target: [Object, Function],
  onAlign: Function,
  monitorBufferTime: Number,
  monitorWindowResize: Boolean,
  disabled: Boolean
}
function Hr(e) {
  return typeof e != 'function' ? null : e()
}
function Lr(e) {
  return typeof e != 'object' || !e ? null : e
}
const uf = U({
    compatConfig: { MODE: 3 },
    name: 'Align',
    props: sf,
    emits: ['align'],
    setup(e, t) {
      let { expose: n, slots: o } = t
      const r = L({}),
        i = L(),
        [a, l] = au(
          () => {
            const { disabled: p, target: m, align: v, onAlign: h } = e
            if (!p && m && i.value) {
              const C = i.value
              let b
              const y = Hr(m),
                w = Lr(m)
              ;(r.value.element = y), (r.value.point = w), (r.value.align = v)
              const { activeElement: _ } = document
              return (
                y && ia(y) ? (b = Io(C, y, v)) : w && (b = nu(C, w, v)),
                iu(_, C),
                h && b && h(C, b),
                !0
              )
            }
            return !1
          },
          O(() => e.monitorBufferTime)
        ),
        s = L({ cancel: () => {} }),
        d = L({ cancel: () => {} }),
        c = () => {
          const p = e.target,
            m = Hr(p),
            v = Lr(p)
          i.value !== d.value.element &&
            (d.value.cancel(),
            (d.value.element = i.value),
            (d.value.cancel = yr(i.value, a))),
            (r.value.element !== m ||
              !ru(r.value.point, v) ||
              !lf(r.value.align, e.align)) &&
              (a(),
              s.value.element !== m &&
                (s.value.cancel(),
                (s.value.element = m),
                (s.value.cancel = yr(m, a))))
        }
      Ee(() => {
        Ie(() => {
          c()
        })
      }),
        yn(() => {
          Ie(() => {
            c()
          })
        }),
        J(
          () => e.disabled,
          p => {
            p ? l() : a()
          },
          { immediate: !0, flush: 'post' }
        )
      const u = L(null)
      return (
        J(
          () => e.monitorWindowResize,
          p => {
            p
              ? u.value || (u.value = ct(window, 'resize', a))
              : u.value && (u.value.remove(), (u.value = null))
          },
          { flush: 'post' }
        ),
        go(() => {
          s.value.cancel(), d.value.cancel(), u.value && u.value.remove(), l()
        }),
        n({ forceAlign: () => a(!0) }),
        () => {
          const p = o == null ? void 0 : o.default()
          return p ? Oe(p[0], { ref: i }, !0, !0) : null
        }
      )
    }
  }),
  cf = U({
    compatConfig: { MODE: 3 },
    name: 'PopupInner',
    inheritAttrs: !1,
    props: So,
    emits: ['mouseenter', 'mouseleave', 'mousedown', 'touchstart', 'align'],
    setup(e, t) {
      let { expose: n, attrs: o, slots: r } = t
      const i = B(),
        a = B(),
        l = B(),
        [s, d] = Es(Xn(e, 'stretch')),
        c = () => {
          e.stretch && d(e.getRootDomNode())
        },
        u = B(!1)
      let p
      J(
        () => e.visible,
        S => {
          clearTimeout(p),
            S
              ? (p = setTimeout(() => {
                  u.value = e.visible
                }))
              : (u.value = !1)
        },
        { immediate: !0 }
      )
      const [m, v] = Is(u, c),
        h = B(),
        C = () => (e.point ? e.point : e.getRootDomNode),
        b = () => {
          var S
          ;(S = i.value) === null || S === void 0 || S.forceAlign()
        },
        y = (S, $) => {
          var A
          const z = e.getClassNameFromAlign($),
            T = l.value
          l.value !== z && (l.value = z),
            m.value === 'align' &&
              (T !== z
                ? Promise.resolve().then(() => {
                    b()
                  })
                : v(() => {
                    var D
                    ;(D = h.value) === null || D === void 0 || D.call(h)
                  }),
              (A = e.onAlign) === null || A === void 0 || A.call(e, S, $))
        },
        w = O(() => {
          const S = typeof e.animation == 'object' ? e.animation : Mi(e)
          return (
            ['onAfterEnter', 'onAfterLeave'].forEach($ => {
              const A = S[$]
              S[$] = z => {
                v(), (m.value = 'stable'), A == null || A(z)
              }
            }),
            S
          )
        }),
        _ = () =>
          new Promise(S => {
            h.value = S
          })
      J(
        [w, m],
        () => {
          !w.value && m.value === 'motion' && v()
        },
        { immediate: !0 }
      ),
        n({ forceAlign: b, getElement: () => a.value.$el || a.value })
      const P = O(() => {
        var S
        return !(
          !((S = e.align) === null || S === void 0) &&
          S.points &&
          (m.value === 'align' || m.value === 'stable')
        )
      })
      return () => {
        var S
        const {
            zIndex: $,
            align: A,
            prefixCls: z,
            destroyPopupOnHide: T,
            onMouseenter: D,
            onMouseleave: V,
            onTouchstart: X = () => {},
            onMousedown: q
          } = e,
          x = m.value,
          N = [
            f(f({}, s.value), {
              zIndex: $,
              opacity: x === 'motion' || x === 'stable' || !u.value ? null : 0,
              pointerEvents: !u.value && x !== 'stable' ? 'none' : null
            }),
            o.style
          ]
        let j = et(
          (S = r.default) === null || S === void 0
            ? void 0
            : S.call(r, { visible: e.visible })
        )
        j.length > 1 && (j = g('div', { class: `${z}-content` }, [j]))
        const W = ne(z, o.class, l.value, !e.arrow && `${z}-arrow-hidden`),
          H = u.value || !e.visible ? Cn(w.value.name, w.value) : {}
        return g(We, E(E({ ref: a }, H), {}, { onBeforeEnter: _ }), {
          default: () =>
            !T || e.visible
              ? jt(
                  g(
                    uf,
                    {
                      target: C(),
                      key: 'popup',
                      ref: i,
                      monitorWindowResize: !0,
                      disabled: P.value,
                      align: A,
                      onAlign: y
                    },
                    {
                      default: () =>
                        g(
                          'div',
                          {
                            class: W,
                            onMouseenter: D,
                            onMouseleave: V,
                            onMousedown: qo(q, ['capture']),
                            [ut ? 'onTouchstartPassive' : 'onTouchstart']: qo(
                              X,
                              ['capture']
                            ),
                            style: N
                          },
                          [j]
                        )
                    }
                  ),
                  [[$n, u.value]]
                )
              : null
        })
      }
    }
  }),
  df = U({
    compatConfig: { MODE: 3 },
    name: 'Popup',
    inheritAttrs: !1,
    props: Os,
    setup(e, t) {
      let { attrs: n, slots: o, expose: r } = t
      const i = B(!1),
        a = B(!1),
        l = B(),
        s = B()
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
            var d
            ;(d = l.value) === null || d === void 0 || d.forceAlign()
          },
          getElement: () => {
            var d
            return (d = l.value) === null || d === void 0
              ? void 0
              : d.getElement()
          }
        }),
        () => {
          const d = f(f(f({}, e), n), { visible: i.value }),
            c = a.value
              ? g(Ts, E(E({}, d), {}, { mobile: e.mobile, ref: l }), {
                  default: o.default
                })
              : g(cf, E(E({}, d), {}, { ref: l }), { default: o.default })
          return g('div', { ref: s }, [g(qi, d, null), c])
        }
      )
    }
  })
function ff(e, t, n) {
  return n ? e[0] === t[0] : e[0] === t[0] && e[1] === t[1]
}
function jr(e, t, n) {
  const o = e[t] || {}
  return f(f({}, o), n)
}
function pf(e, t, n, o) {
  const { points: r } = n,
    i = Object.keys(e)
  for (let a = 0; a < i.length; a += 1) {
    const l = i[a]
    if (ff(e[l].points, r, o)) return `${t}-placement-${l}`
  }
  return ''
}
const mf = {
  methods: {
    setState() {
      let e =
          arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {},
        t = arguments.length > 1 ? arguments[1] : void 0,
        n = typeof e == 'function' ? e(this.$data, this.$props) : e
      if (this.getDerivedStateFromProps) {
        const o = this.getDerivedStateFromProps(
          Il(this),
          f(f({}, this.$data), n)
        )
        if (o === null) return
        n = f(f({}, n), o || {})
      }
      f(this.$data, n),
        this._.isMounted && this.$forceUpdate(),
        Ie(() => {
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
let Nn
function wa(e) {
  if (typeof document > 'u') return 0
  if (e || Nn === void 0) {
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
    r === i && (i = n.clientWidth), document.body.removeChild(n), (Nn = r - i)
  }
  return Nn
}
function Wr(e) {
  const t = e.match(/^(.*)px$/),
    n = Number(t == null ? void 0 : t[1])
  return Number.isNaN(n) ? wa() : n
}
function Mg(e) {
  if (typeof document > 'u' || !e || !(e instanceof Element))
    return { width: 0, height: 0 }
  const { width: t, height: n } = getComputedStyle(e, '::-webkit-scrollbar')
  return { width: Wr(t), height: Wr(n) }
}
const vf = `vc-util-locker-${Date.now()}`
let Vr = 0
function gf() {
  return (
    document.body.scrollHeight >
      (window.innerHeight || document.documentElement.clientHeight) &&
    window.innerWidth > document.body.offsetWidth
  )
}
function hf(e) {
  const t = O(() => !!e && !!e.value)
  Vr += 1
  const n = `${vf}_${Vr}`
  Te(
    o => {
      if (mt()) {
        if (t.value) {
          const r = wa(),
            i = gf()
          El(
            `
html body {
  overflow-y: hidden;
  ${i ? `width: calc(100% - ${r}px);` : ''}
}`,
            n
          )
        } else Zo(n)
        o(() => {
          Zo(n)
        })
      }
    },
    { flush: 'post' }
  )
}
let Ue = 0
const tn = mt(),
  Kr = e => {
    if (!tn) return null
    if (e) {
      if (typeof e == 'string') return document.querySelectorAll(e)[0]
      if (typeof e == 'function') return e()
      if (typeof e == 'object' && e instanceof window.HTMLElement) return e
    }
    return document.body
  },
  Sa = U({
    compatConfig: { MODE: 3 },
    name: 'PortalWrapper',
    inheritAttrs: !1,
    props: {
      wrapperClassName: String,
      forceRender: { type: Boolean, default: void 0 },
      getContainer: I.any,
      visible: { type: Boolean, default: void 0 },
      autoLock: on(),
      didUpdate: Function
    },
    setup(e, t) {
      let { slots: n } = t
      const o = B(),
        r = B(),
        i = B(),
        a = B(1),
        l = mt() && document.createElement('div'),
        s = () => {
          var m, v
          o.value === l &&
            ((v =
              (m = o.value) === null || m === void 0
                ? void 0
                : m.parentNode) === null ||
              v === void 0 ||
              v.removeChild(o.value)),
            (o.value = null)
        }
      let d = null
      const c = function() {
          return (arguments.length > 0 && arguments[0] !== void 0
            ? arguments[0]
            : !1) ||
            (o.value && !o.value.parentNode)
            ? ((d = Kr(e.getContainer)), d ? (d.appendChild(o.value), !0) : !1)
            : !0
        },
        u = () =>
          tn ? (o.value || ((o.value = l), c(!0)), p(), o.value) : null,
        p = () => {
          const { wrapperClassName: m } = e
          o.value && m && m !== o.value.className && (o.value.className = m)
        }
      return (
        yn(() => {
          p(), c()
        }),
        hf(
          O(
            () =>
              e.autoLock &&
              e.visible &&
              mt() &&
              (o.value === document.body || o.value === l)
          )
        ),
        Ee(() => {
          let m = !1
          J(
            [() => e.visible, () => e.getContainer],
            (v, h) => {
              let [C, b] = v,
                [y, w] = h
              tn &&
                ((d = Kr(e.getContainer)),
                d === document.body && (C && !y ? (Ue += 1) : m && (Ue -= 1))),
                m &&
                  (typeof b == 'function' && typeof w == 'function'
                    ? b.toString() !== w.toString()
                    : b !== w) &&
                  s(),
                (m = !0)
            },
            { immediate: !0, flush: 'post' }
          ),
            Ie(() => {
              c() ||
                (i.value = ce(() => {
                  a.value += 1
                }))
            })
        }),
        me(() => {
          const { visible: m } = e
          tn && d === document.body && (Ue = m && Ue ? Ue - 1 : Ue),
            s(),
            ce.cancel(i.value)
        }),
        () => {
          const { forceRender: m, visible: v } = e
          let h = null
          const C = { getOpenCount: () => Ue, getContainer: u }
          return (
            a.value &&
              (m || v || r.value) &&
              (h = g(
                _l,
                { getContainer: u, ref: r, didUpdate: e.didUpdate },
                {
                  default: () => {
                    var b
                    return (b = n.default) === null || b === void 0
                      ? void 0
                      : b.call(n, C)
                  }
                }
              )),
            h
          )
        }
      )
    }
  }),
  bf = [
    'onClick',
    'onMousedown',
    'onTouchstart',
    'onMouseenter',
    'onMouseleave',
    'onFocus',
    'onBlur',
    'onContextmenu'
  ],
  Ao = U({
    compatConfig: { MODE: 3 },
    name: 'Trigger',
    mixins: [mf],
    inheritAttrs: !1,
    props: Ss(),
    setup(e) {
      const t = O(() => {
          const { popupPlacement: r, popupAlign: i, builtinPlacements: a } = e
          return r && a ? jr(a, r, i) : i
        }),
        n = B(null),
        o = r => {
          n.value = r
        }
      return {
        vcTriggerContext: Se('vcTriggerContext', {}),
        popupRef: n,
        setPopupRef: o,
        triggerRef: B(null),
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
        bf.forEach(n => {
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
      ve('vcTriggerContext', {
        onPopupMouseDown: this.onPopupMouseDown,
        onPopupMouseenter: this.onPopupMouseenter,
        onPopupMouseleave: this.onPopupMouseleave
      }),
        Ri(this)
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
        ce.cancel(this.attachId)
    },
    methods: {
      updatedCal() {
        const e = this.$props
        if (this.$data.sPopupVisible) {
          let n
          !this.clickOutsideHandler &&
            (this.isClickToHide() || this.isContextmenuToShow()) &&
            ((n = e.getDocument(this.getRootDomNode())),
            (this.clickOutsideHandler = ct(
              n,
              'mousedown',
              this.onDocumentClick
            ))),
            this.touchOutsideHandler ||
              ((n = n || e.getDocument(this.getRootDomNode())),
              (this.touchOutsideHandler = ct(
                n,
                'touchstart',
                this.onDocumentClick,
                ut ? { passive: !1 } : !1
              ))),
            !this.contextmenuOutsideHandler1 &&
              this.isContextmenuToShow() &&
              ((n = n || e.getDocument(this.getRootDomNode())),
              (this.contextmenuOutsideHandler1 = ct(
                n,
                'scroll',
                this.onContextmenuClose
              ))),
            !this.contextmenuOutsideHandler2 &&
              this.isContextmenuToShow() &&
              (this.contextmenuOutsideHandler2 = ct(
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
          qe(
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
        qe(e.target, e.relatedTarget || document.activeElement) ||
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
        ;(!qe(n, t) || this.isContextMenuOnly()) &&
          !qe(o, t) &&
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
              : _e(this.triggerRef)
          return _e(r(i))
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
              : _e(this.triggerRef)
          if (i) return i
        } catch {}
        return _e(this)
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
        return o && r && t.push(pf(r, i, e, a)), l && t.push(l(e)), t.join(' ')
      },
      getPopupAlign() {
        const e = this.$props,
          { popupPlacement: t, popupAlign: n, builtinPlacements: o } = e
        return t && o ? jr(o, t, n) : n
      },
      getComponent() {
        const e = {}
        this.isMouseEnterToShow() && (e.onMouseenter = this.onPopupMouseenter),
          this.isMouseLeaveToHide() &&
            (e.onMouseleave = this.onPopupMouseleave),
          (e.onMousedown = this.onPopupMouseDown),
          (e[
            ut ? 'onTouchstartPassive' : 'onTouchstart'
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
            popupStyle: d,
            mask: c,
            maskAnimation: u,
            maskTransitionName: p,
            zIndex: m,
            stretch: v,
            alignPoint: h,
            mobile: C,
            arrow: b,
            forceRender: y
          } = this.$props,
          { sPopupVisible: w, point: _ } = this.$data,
          P = f(
            f(
              {
                prefixCls: r,
                arrow: b,
                destroyPopupOnHide: i,
                visible: w,
                point: h ? _ : null,
                align: this.align,
                animation: l,
                getClassNameFromAlign: t,
                stretch: v,
                getRootDomNode: n,
                mask: c,
                zIndex: m,
                transitionName: s,
                maskAnimation: u,
                maskTransitionName: p,
                class: a,
                style: d,
                onAlign: o.onPopupAlign || Yi
              },
              e
            ),
            { ref: this.setPopupRef, mobile: C, forceRender: y }
          )
        return g(df, P, {
          default: this.$slots.popup || (() => Al(this, 'popup'))
        })
      },
      attachParent(e) {
        ce.cancel(this.attachId)
        const { getPopupContainer: t, getDocument: n } = this.$props,
          o = this.getRootDomNode()
        let r
        t
          ? (o || t.length === 0) && (r = t(o))
          : (r = n(this.getRootDomNode()).body),
          r
            ? r.appendChild(e)
            : (this.attachId = ce(() => {
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
            (Ml(this, 'popupVisible') ||
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
        const n = Qo(this)
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
        t = Ct(Rl(this)),
        { alignPoint: n, getPopupContainer: o } = this.$props,
        r = t[0]
      this.childOriginEvents = Qo(r)
      const i = { key: 'trigger' }
      this.isContextmenuToShow()
        ? (i.onContextmenu = this.onContextmenu)
        : (i.onContextmenu = this.createTwoChains('onContextmenu')),
        this.isClickToHide() || this.isClickToShow()
          ? ((i.onClick = this.onClick),
            (i.onMousedown = this.onMousedown),
            (i[
              ut ? 'onTouchstartPassive' : 'onTouchstart'
            ] = this.onTouchstart))
          : ((i.onClick = this.createTwoChains('onClick')),
            (i.onMousedown = this.createTwoChains('onMousedown')),
            (i[
              ut ? 'onTouchstartPassive' : 'onTouchstart'
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
            (i.onBlur = d => {
              d &&
                (!d.relatedTarget || !qe(d.target, d.relatedTarget)) &&
                this.createTwoChains('onBlur')(d)
            }))
      const a = ne(r && r.props && r.props.class, e.class)
      a && (i.class = a)
      const l = Oe(r, f(f({}, i), { ref: 'triggerRef' }), !0, !0),
        s = g(
          Sa,
          {
            key: 'portal',
            getContainer: o && (() => o(this.getRootDomNode())),
            didUpdate: this.handlePortalUpdate,
            visible: this.$data.sPopupVisible
          },
          { default: this.getComponent }
        )
      return g(je, null, [l, s])
    }
  }),
  G = {
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
      if ((t.altKey && !t.ctrlKey) || t.metaKey || (n >= G.F1 && n <= G.F12))
        return !1
      switch (n) {
        case G.ALT:
        case G.CAPS_LOCK:
        case G.CONTEXT_MENU:
        case G.CTRL:
        case G.DOWN:
        case G.END:
        case G.ESC:
        case G.HOME:
        case G.INSERT:
        case G.LEFT:
        case G.MAC_FF_META:
        case G.META:
        case G.NUMLOCK:
        case G.NUM_CENTER:
        case G.PAGE_DOWN:
        case G.PAGE_UP:
        case G.PAUSE:
        case G.PRINT_SCREEN:
        case G.RIGHT:
        case G.SHIFT:
        case G.UP:
        case G.WIN_KEY:
        case G.WIN_KEY_RIGHT:
          return !1
        default:
          return !0
      }
    },
    isCharacterKey: function(t) {
      if (
        (t >= G.ZERO && t <= G.NINE) ||
        (t >= G.NUM_ZERO && t <= G.NUM_MULTIPLY) ||
        (t >= G.A && t <= G.Z) ||
        (window.navigator.userAgent.indexOf('WebKit') !== -1 && t === 0)
      )
        return !0
      switch (t) {
        case G.SPACE:
        case G.QUESTION_MARK:
        case G.NUM_PLUS:
        case G.NUM_MINUS:
        case G.NUM_PERIOD:
        case G.NUM_DIVISION:
        case G.SEMICOLON:
        case G.DASH:
        case G.EQUALS:
        case G.COMMA:
        case G.PERIOD:
        case G.SLASH:
        case G.APOSTROPHE:
        case G.SINGLE_QUOTE:
        case G.OPEN_SQUARE_BRACKET:
        case G.BACKSLASH:
        case G.CLOSE_SQUARE_BRACKET:
          return !0
        default:
          return !1
      }
    }
  },
  ro = G
var yf =
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
const $f = U({
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
      const o = B(null)
      return (
        n({
          focus: () => {
            o.value && o.value.focus()
          },
          blur: () => {
            o.value && o.value.blur()
          },
          input: o,
          setSelectionRange: (s, d, c) => {
            var u
            ;(u = o.value) === null ||
              u === void 0 ||
              u.setSelectionRange(s, d, c)
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
          const { tag: s, value: d } = e,
            c = yf(e, ['tag', 'value'])
          return g(s, E(E({}, c), {}, { ref: o, value: d }), null)
        }
      )
    }
  }),
  Cf = $f
function Rg() {
  const e = document.documentElement.clientWidth,
    t = window.innerHeight || document.documentElement.clientHeight
  return { width: e, height: t }
}
function Bg(e) {
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
function Dg(e) {
  return Array.prototype.slice
    .apply(e)
    .map(n => `${n}: ${e.getPropertyValue(n)};`)
    .join('')
}
function wf(e) {
  return Object.keys(e).reduce((t, n) => {
    const o = e[n]
    return typeof o > 'u' || o === null || (t += `${n}: ${e[n]};`), t
  }, '')
}
var Sf =
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
const xf = U({
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
      const i = B(null),
        a = L(),
        l = L(!1)
      J(
        [() => e.value, l],
        () => {
          l.value || (a.value = e.value)
        },
        { immediate: !0 }
      )
      const s = $ => {
          n('change', $)
        },
        d = $ => {
          ;(l.value = !0), ($.target.composing = !0), n('compositionstart', $)
        },
        c = $ => {
          ;(l.value = !1), ($.target.composing = !1), n('compositionend', $)
          const A = document.createEvent('HTMLEvents')
          A.initEvent('input', !0, !0), $.target.dispatchEvent(A), s($)
        },
        u = $ => {
          if (l.value && e.lazy) {
            a.value = $.target.value
            return
          }
          n('input', $)
        },
        p = $ => {
          n('blur', $)
        },
        m = $ => {
          n('focus', $)
        },
        v = () => {
          i.value && i.value.focus()
        },
        h = () => {
          i.value && i.value.blur()
        },
        C = $ => {
          n('keydown', $)
        },
        b = $ => {
          n('keyup', $)
        },
        y = ($, A, z) => {
          var T
          ;(T = i.value) === null ||
            T === void 0 ||
            T.setSelectionRange($, A, z)
        },
        w = () => {
          var $
          ;($ = i.value) === null || $ === void 0 || $.select()
        }
      r({
        focus: v,
        blur: h,
        input: O(() => {
          var $
          return ($ = i.value) === null || $ === void 0 ? void 0 : $.input
        }),
        setSelectionRange: y,
        select: w,
        getSelectionStart: () => {
          var $
          return ($ = i.value) === null || $ === void 0
            ? void 0
            : $.getSelectionStart()
        },
        getSelectionEnd: () => {
          var $
          return ($ = i.value) === null || $ === void 0
            ? void 0
            : $.getSelectionEnd()
        },
        getScrollTop: () => {
          var $
          return ($ = i.value) === null || $ === void 0
            ? void 0
            : $.getScrollTop()
        }
      })
      const _ = $ => {
          n('mousedown', $)
        },
        P = $ => {
          n('paste', $)
        },
        S = O(() =>
          e.style && typeof e.style != 'string' ? wf(e.style) : e.style
        )
      return () => {
        const $ = Sf(e, ['style', 'lazy'])
        return g(
          Cf,
          E(
            E(E({}, $), o),
            {},
            {
              style: S.value,
              onInput: u,
              onChange: s,
              onBlur: p,
              onFocus: m,
              ref: i,
              value: a.value,
              onCompositionstart: d,
              onCompositionend: c,
              onKeyup: b,
              onKeydown: C,
              onPaste: P,
              onMousedown: _
            }
          ),
          null
        )
      }
    }
  }),
  Of = xf,
  Tf = `accept acceptcharset accesskey action allowfullscreen allowtransparency
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
  Pf = `onCopy onCut onPaste onCompositionend onCompositionstart onCompositionupdate onKeydown
    onKeypress onKeyup onFocus onBlur onChange onInput onSubmit onClick onContextmenu onDoubleclick onDblclick
    onDrag onDragend onDragenter onDragexit onDragleave onDragover onDragstart onDrop onMousedown
    onMouseenter onMouseleave onMousemove onMouseout onMouseover onMouseup onSelect onTouchcancel
    onTouchend onTouchmove onTouchstart onTouchstartPassive onTouchmovePassive onScroll onWheel onAbort onCanplay onCanplaythrough
    onDurationchange onEmptied onEncrypted onEnded onError onLoadeddata onLoadedmetadata
    onLoadstart onPause onPlay onPlaying onProgress onRatechange onSeeked onSeeking onStalled onSuspend onTimeupdate onVolumechange onWaiting onLoad onError`,
  Gr = `${Tf} ${Pf}`.split(/[\s\n]+/),
  If = 'aria-',
  Ef = 'data-'
function Ur(e, t) {
  return e.indexOf(t) === 0
}
function _f(e) {
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
      ;((n.aria && (r === 'role' || Ur(r, If))) ||
        (n.data && Ur(r, Ef)) ||
        (n.attr && (Gr.includes(r) || Gr.includes(r.toLowerCase())))) &&
        (o[r] = e[r])
    }),
    o
  )
}
const xa = Symbol('OverflowContextProviderKey'),
  io = U({
    compatConfig: { MODE: 3 },
    name: 'OverflowContextProvider',
    inheritAttrs: !1,
    props: { value: { type: Object } },
    setup(e, t) {
      let { slots: n } = t
      return (
        ve(
          xa,
          O(() => e.value)
        ),
        () => {
          var o
          return (o = n.default) === null || o === void 0 ? void 0 : o.call(n)
        }
      )
    }
  }),
  Af = () =>
    Se(
      xa,
      O(() => null)
    )
var Mf =
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
const rt = void 0,
  nn = U({
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
      const r = O(() => e.responsive && !e.display),
        i = L()
      o({ itemNodeRef: i })
      function a(l) {
        e.registerSize(e.itemKey, l)
      }
      return (
        go(() => {
          a(null)
        }),
        () => {
          var l
          const {
              prefixCls: s,
              invalidate: d,
              item: c,
              renderItem: u,
              responsive: p,
              registerSize: m,
              itemKey: v,
              display: h,
              order: C,
              component: b = 'div'
            } = e,
            y = Mf(e, [
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
            w = (l = n.default) === null || l === void 0 ? void 0 : l.call(n),
            _ = u && c !== rt ? u(c) : w
          let P
          d ||
            (P = {
              opacity: r.value ? 0 : 1,
              height: r.value ? 0 : rt,
              overflowY: r.value ? 'hidden' : rt,
              order: p ? C : rt,
              pointerEvents: r.value ? 'none' : rt,
              position: r.value ? 'absolute' : rt
            })
          const S = {}
          return (
            r.value && (S['aria-hidden'] = !0),
            g(
              Co,
              {
                disabled: !p,
                onResize: $ => {
                  let { offsetWidth: A } = $
                  a(A)
                }
              },
              {
                default: () =>
                  g(
                    b,
                    E(
                      E(E({ class: ne(!d && s), style: P }, S), y),
                      {},
                      { ref: i }
                    ),
                    { default: () => [_] }
                  )
              }
            )
          )
        }
      )
    }
  })
var Fn =
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
const Rf = U({
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
    const r = Af()
    return () => {
      var i
      if (!r.value) {
        const { component: u = 'div' } = e,
          p = Fn(e, ['component'])
        return g(u, E(E({}, p), o), {
          default: () => [
            (i = n.default) === null || i === void 0 ? void 0 : i.call(n)
          ]
        })
      }
      const a = r.value,
        { className: l } = a,
        s = Fn(a, ['className']),
        { class: d } = o,
        c = Fn(o, ['class'])
      return g(
        io,
        { value: null },
        { default: () => [g(nn, E(E(E({ class: ne(l, d) }, s), c), e), n)] }
      )
    }
  }
})
var Bf =
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
const Oa = 'responsive',
  Ta = 'invalidate'
function Df(e) {
  return `+ ${e.length} ...`
}
const zf = () => ({
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
  Tn = U({
    name: 'Overflow',
    inheritAttrs: !1,
    props: zf(),
    emits: ['visibleChange'],
    setup(e, t) {
      let { attrs: n, emit: o, slots: r } = t
      const i = O(() => e.ssr === 'full'),
        a = B(null),
        l = O(() => a.value || 0),
        s = B(new Map()),
        d = B(0),
        c = B(0),
        u = B(0),
        p = B(null),
        m = B(null),
        v = O(() =>
          m.value === null && i.value ? Number.MAX_SAFE_INTEGER : m.value || 0
        ),
        h = B(!1),
        C = O(() => `${e.prefixCls}-item`),
        b = O(() => Math.max(d.value, c.value)),
        y = O(() => !!(e.data.length && e.maxCount === Oa)),
        w = O(() => e.maxCount === Ta),
        _ = O(
          () =>
            y.value ||
            (typeof e.maxCount == 'number' && e.data.length > e.maxCount)
        ),
        P = O(() => {
          let x = e.data
          return (
            y.value
              ? a.value === null && i.value
                ? (x = e.data)
                : (x = e.data.slice(
                    0,
                    Math.min(e.data.length, l.value / e.itemWidth)
                  ))
              : typeof e.maxCount == 'number' &&
                (x = e.data.slice(0, e.maxCount)),
            x
          )
        }),
        S = O(() =>
          y.value ? e.data.slice(v.value + 1) : e.data.slice(P.value.length)
        ),
        $ = (x, N) => {
          var j
          return typeof e.itemKey == 'function'
            ? e.itemKey(x)
            : (j = e.itemKey && (x == null ? void 0 : x[e.itemKey])) !== null &&
              j !== void 0
            ? j
            : N
        },
        A = O(() => e.renderItem || (x => x)),
        z = (x, N) => {
          ;(m.value = x),
            N || ((h.value = x < e.data.length - 1), o('visibleChange', x))
        },
        T = (x, N) => {
          a.value = N.clientWidth
        },
        D = (x, N) => {
          const j = new Map(s.value)
          N === null ? j.delete(x) : j.set(x, N), (s.value = j)
        },
        V = (x, N) => {
          ;(d.value = c.value), (c.value = N)
        },
        X = (x, N) => {
          u.value = N
        },
        q = x => s.value.get($(P.value[x], x))
      return (
        J([l, s, c, u, () => e.itemKey, P], () => {
          if (l.value && b.value && P.value) {
            let x = u.value
            const N = P.value.length,
              j = N - 1
            if (!N) {
              z(0), (p.value = null)
              return
            }
            for (let W = 0; W < N; W += 1) {
              const R = q(W)
              if (R === void 0) {
                z(W - 1, !0)
                break
              }
              if (
                ((x += R),
                (j === 0 && x <= l.value) ||
                  (W === j - 1 && x + q(j) <= l.value))
              ) {
                z(j), (p.value = null)
                break
              } else if (x + b.value > l.value) {
                z(W - 1), (p.value = x - R - u.value + c.value)
                break
              }
            }
            e.suffix && q(0) + u.value > l.value && (p.value = null)
          }
        }),
        () => {
          const x = h.value && !!S.value.length,
            {
              itemComponent: N,
              renderRawItem: j,
              renderRawRest: W,
              renderRest: R,
              prefixCls: H = 'rc-overflow',
              suffix: F,
              component: k = 'div',
              id: Z,
              onMousedown: de
            } = e,
            { class: le, style: se } = n,
            M = Bf(n, ['class', 'style'])
          let K = {}
          p.value !== null &&
            y.value &&
            (K = { position: 'absolute', left: `${p.value}px`, top: 0 })
          const Q = {
              prefixCls: C.value,
              responsive: y.value,
              component: N,
              invalidate: w.value
            },
            re = j
              ? (ue, be) => {
                  const Ve = $(ue, be)
                  return g(
                    io,
                    {
                      key: Ve,
                      value: f(f({}, Q), {
                        order: be,
                        item: ue,
                        itemKey: Ve,
                        registerSize: D,
                        display: be <= v.value
                      })
                    },
                    { default: () => [j(ue, be)] }
                  )
                }
              : (ue, be) => {
                  const Ve = $(ue, be)
                  return g(
                    nn,
                    E(
                      E({}, Q),
                      {},
                      {
                        order: be,
                        key: Ve,
                        item: ue,
                        renderItem: A.value,
                        itemKey: Ve,
                        registerSize: D,
                        display: be <= v.value
                      }
                    ),
                    null
                  )
                }
          let ie = () => null
          const te = {
            order: x ? v.value : Number.MAX_SAFE_INTEGER,
            className: `${C.value} ${C.value}-rest`,
            registerSize: V,
            display: x
          }
          if (W)
            W &&
              (ie = () =>
                g(
                  io,
                  { value: f(f({}, Q), te) },
                  { default: () => [W(S.value)] }
                ))
          else {
            const ue = R || Df
            ie = () =>
              g(nn, E(E({}, Q), te), {
                default: () => (typeof ue == 'function' ? ue(S.value) : ue)
              })
          }
          const he = () => {
            var ue
            return g(
              k,
              E(
                {
                  id: Z,
                  class: ne(!w.value && H, le),
                  style: se,
                  onMousedown: de,
                  role: e.role
                },
                M
              ),
              {
                default: () => [
                  P.value.map(re),
                  _.value ? ie() : null,
                  F &&
                    g(
                      nn,
                      E(
                        E({}, Q),
                        {},
                        {
                          order: v.value,
                          class: `${C.value}-suffix`,
                          registerSize: X,
                          display: !0,
                          style: K
                        }
                      ),
                      { default: () => F }
                    ),
                  (ue = r.default) === null || ue === void 0
                    ? void 0
                    : ue.call(r)
                ]
              }
            )
          }
          return g(Co, { disabled: !y.value, onResize: T }, { default: he })
        }
      )
    }
  })
Tn.Item = Rf
Tn.RESPONSIVE = Oa
Tn.INVALIDATE = Ta
const At = Tn,
  zg = () => {
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
function Ng(e, t) {
  const { defaultValue: n, value: o = L() } = t || {}
  let r = typeof e == 'function' ? e() : e
  o.value !== void 0 && (r = st(o)),
    n !== void 0 && (r = typeof n == 'function' ? n() : n)
  const i = L(r),
    a = L(r)
  Te(() => {
    let s = o.value !== void 0 ? o.value : i.value
    t.postState && (s = t.postState(s)), (a.value = s)
  })
  function l(s) {
    const d = a.value
    ;(i.value = s), Yn(a.value) !== s && t.onChange && t.onChange(s, d)
  }
  return (
    J(o, () => {
      i.value = o.value
    }),
    [a, l]
  )
}
function Xe(e) {
  const t = typeof e == 'function' ? e() : e,
    n = L(t)
  function o(r) {
    n.value = r
  }
  return [n, o]
}
function Xr(e) {
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
        Nf(e, r, n[r])
      })
  }
  return e
}
function Nf(e, t, n) {
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
var Mo = function(t, n) {
  var o = Xr({}, t, n.attrs)
  return g(Wt, Xr({}, o, { icon: Sl }), null)
}
Mo.displayName = 'CheckOutlined'
Mo.inheritAttrs = !1
const Fg = Mo
function Ro(e) {
  const t = Symbol('contextKey')
  return {
    useProvide: (r, i) => {
      const a = vo({})
      return (
        ve(t, a),
        Te(() => {
          f(a, r, i || {})
        }),
        a
      )
    },
    useInject: () => Se(t, e) || {}
  }
}
const fn = Symbol('ContextProps'),
  pn = Symbol('InternalContextProps'),
  Hg = function(e) {
    let t =
      arguments.length > 1 && arguments[1] !== void 0
        ? arguments[1]
        : O(() => !0)
    const n = L(new Map()),
      o = (i, a) => {
        n.value.set(i, a), (n.value = new Map(n.value))
      },
      r = i => {
        n.value.delete(i), (n.value = new Map(n.value))
      }
    Me(),
      J([t, n], () => {}),
      ve(fn, e),
      ve(pn, { addFormItemField: o, removeFormItemField: r })
  },
  ao = {
    id: O(() => {}),
    onFieldBlur: () => {},
    onFieldChange: () => {},
    clearValidate: () => {}
  },
  lo = { addFormItemField: () => {}, removeFormItemField: () => {} },
  Ff = () => {
    const e = Se(pn, lo),
      t = Symbol('FormItemFieldKey'),
      n = Me()
    return (
      e.addFormItemField(t, n.type),
      me(() => {
        e.removeFormItemField(t)
      }),
      ve(pn, lo),
      ve(fn, ao),
      Se(fn, ao)
    )
  },
  Lg = U({
    compatConfig: { MODE: 3 },
    name: 'AFormItemRest',
    setup(e, t) {
      let { slots: n } = t
      return (
        ve(pn, lo),
        ve(fn, ao),
        () => {
          var o
          return (o = n.default) === null || o === void 0 ? void 0 : o.call(n)
        }
      )
    }
  }),
  Bo = Ro({}),
  jg = U({
    name: 'NoFormStatus',
    setup(e, t) {
      let { slots: n } = t
      return (
        Bo.useProvide({}),
        () => {
          var o
          return (o = n.default) === null || o === void 0 ? void 0 : o.call(n)
        }
      )
    }
  })
function Pa(e, t, n) {
  return ne({
    [`${e}-status-success`]: t === 'success',
    [`${e}-status-warning`]: t === 'warning',
    [`${e}-status-error`]: t === 'error',
    [`${e}-status-validating`]: t === 'validating',
    [`${e}-has-feedback`]: n
  })
}
const Ia = (e, t) => t || e,
  Hf = e => {
    const { componentCls: t } = e
    return {
      [t]: {
        display: 'inline-flex',
        '&-block': { display: 'flex', width: '100%' },
        '&-vertical': { flexDirection: 'column' }
      }
    }
  },
  Lf = Hf,
  jf = e => {
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
  Ea = tt('Space', e => [jf(e), Lf(e)])
var Wf = '[object Symbol]'
function Wg(e) {
  return typeof e == 'symbol' || (yt(e) && xt(e) == Wf)
}
function Vf() {}
function Kf(e, t, n, o) {
  for (var r = e.length, i = n + (o ? 1 : -1); o ? i-- : ++i < r; )
    if (t(e[i], i, e)) return i
  return -1
}
function Gf(e) {
  return e !== e
}
function Uf(e, t, n) {
  for (var o = n - 1, r = e.length; ++o < r; ) if (e[o] === t) return o
  return -1
}
function Xf(e, t, n) {
  return t === t ? Uf(e, t, n) : Kf(e, Gf, n)
}
function Yf(e, t) {
  var n = e == null ? 0 : e.length
  return !!n && Xf(e, t, 0) > -1
}
function qf(e, t, n) {
  for (var o = -1, r = e == null ? 0 : e.length; ++o < r; )
    if (n(t, e[o])) return !0
  return !1
}
var kf = '[object Map]',
  Zf = '[object Set]',
  Qf = Object.prototype,
  Jf = Qf.hasOwnProperty
function _a(e) {
  if (e == null) return !0
  if (
    $a(e) &&
    (Ht(e) ||
      typeof e == 'string' ||
      typeof e.splice == 'function' ||
      dn(e) ||
      _o(e) ||
      ma(e))
  )
    return !e.length
  var t = oo(e)
  if (t == kf || t == Zf) return !e.size
  if (ba(e)) return !ya(e).length
  for (var n in e) if (Jf.call(e, n)) return !1
  return !0
}
var ep = 1 / 0,
  tp =
    ft && 1 / Eo(new ft([, -0]))[1] == ep
      ? function(e) {
          return new ft(e)
        }
      : Vf
const np = tp
var op = 200
function rp(e, t, n) {
  var o = -1,
    r = Yf,
    i = e.length,
    a = !0,
    l = [],
    s = l
  if (n) (a = !1), (r = qf)
  else if (i >= op) {
    var d = t ? null : np(e)
    if (d) return Eo(d)
    ;(a = !1), (r = da), (s = new Ft())
  } else s = t ? [] : l
  e: for (; ++o < i; ) {
    var c = e[o],
      u = t ? t(c) : c
    if (((c = n || c !== 0 ? c : 0), a && u === u)) {
      for (var p = s.length; p--; ) if (s[p] === u) continue e
      t && s.push(u), l.push(c)
    } else r(s, u, n) || (s !== l && s.push(u), l.push(c))
  }
  return l
}
function Hn(e) {
  return e && e.length ? rp(e) : []
}
const ip = () => ({
    compactSize: String,
    compactDirection: I.oneOf(vt('horizontal', 'vertical')).def('horizontal'),
    isFirstItem: on(),
    isLastItem: on()
  }),
  Pn = Ro(null),
  ap = (e, t) => {
    const n = Pn.useInject(),
      o = O(() => {
        if (!n || _a(n)) return ''
        const { compactDirection: r, isFirstItem: i, isLastItem: a } = n,
          l = r === 'vertical' ? '-vertical-' : '-'
        return ne({
          [`${e.value}-compact${l}item`]: !0,
          [`${e.value}-compact${l}first-item`]: i,
          [`${e.value}-compact${l}last-item`]: a,
          [`${e.value}-compact${l}item-rtl`]: t.value === 'rtl'
        })
      })
    return {
      compactSize: O(() => (n == null ? void 0 : n.compactSize)),
      compactDirection: O(() => (n == null ? void 0 : n.compactDirection)),
      compactItemClassnames: o
    }
  },
  Vg = U({
    name: 'NoCompactStyle',
    setup(e, t) {
      let { slots: n } = t
      return (
        Pn.useProvide(null),
        () => {
          var o
          return (o = n.default) === null || o === void 0 ? void 0 : o.call(n)
        }
      )
    }
  }),
  lp = () => ({
    prefixCls: String,
    size: { type: String },
    direction: I.oneOf(vt('horizontal', 'vertical')).def('horizontal'),
    align: I.oneOf(vt('start', 'end', 'center', 'baseline')),
    block: { type: Boolean, default: void 0 }
  }),
  sp = U({
    name: 'CompactItem',
    props: ip(),
    setup(e, t) {
      let { slots: n } = t
      return (
        Pn.useProvide(e),
        () => {
          var o
          return (o = n.default) === null || o === void 0 ? void 0 : o.call(n)
        }
      )
    }
  }),
  so = U({
    name: 'ASpaceCompact',
    inheritAttrs: !1,
    props: lp(),
    setup(e, t) {
      let { attrs: n, slots: o } = t
      const { prefixCls: r, direction: i } = Re('space-compact', e),
        a = Pn.useInject(),
        [l, s] = Ea(r),
        d = O(() =>
          ne(r.value, s.value, {
            [`${r.value}-rtl`]: i.value === 'rtl',
            [`${r.value}-block`]: e.block,
            [`${r.value}-vertical`]: e.direction === 'vertical'
          })
        )
      return () => {
        var c
        const u = et(
          ((c = o.default) === null || c === void 0 ? void 0 : c.call(o)) || []
        )
        return u.length === 0
          ? null
          : l(
              g('div', E(E({}, n), {}, { class: [d.value, n.class] }), [
                u.map((p, m) => {
                  var v
                  const h = (p && p.key) || `${r.value}-item-${m}`,
                    C = !a || _a(a)
                  return g(
                    sp,
                    {
                      key: h,
                      compactSize:
                        (v = e.size) !== null && v !== void 0 ? v : 'middle',
                      compactDirection: e.direction,
                      isFirstItem:
                        m === 0 && (C || (a == null ? void 0 : a.isFirstItem)),
                      isLastItem:
                        m === u.length - 1 &&
                        (C || (a == null ? void 0 : a.isLastItem))
                    },
                    { default: () => [p] }
                  )
                })
              ])
            )
      }
    }
  }),
  up = e => ({ animationDuration: e, animationFillMode: 'both' }),
  cp = e => ({ animationDuration: e, animationFillMode: 'both' }),
  Do = function(e, t, n, o) {
    const i = (arguments.length > 4 && arguments[4] !== void 0
    ? arguments[4]
    : !1)
      ? '&'
      : ''
    return {
      [`
      ${i}${e}-enter,
      ${i}${e}-appear
    `]: f(f({}, up(o)), { animationPlayState: 'paused' }),
      [`${i}${e}-leave`]: f(f({}, cp(o)), { animationPlayState: 'paused' }),
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
  dp = new ae('antFadeIn', { '0%': { opacity: 0 }, '100%': { opacity: 1 } }),
  fp = new ae('antFadeOut', { '0%': { opacity: 1 }, '100%': { opacity: 0 } }),
  pp = function(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1
    const { antCls: n } = e,
      o = `${n}-fade`,
      r = t ? '&' : ''
    return [
      Do(o, dp, fp, e.motionDurationMid, t),
      {
        [`
        ${r}${o}-enter,
        ${r}${o}-appear
      `]: { opacity: 0, animationTimingFunction: 'linear' },
        [`${r}${o}-leave`]: { animationTimingFunction: 'linear' }
      }
    ]
  },
  mp = new ae('antSlideUpIn', {
    '0%': { transform: 'scaleY(0.8)', transformOrigin: '0% 0%', opacity: 0 },
    '100%': { transform: 'scaleY(1)', transformOrigin: '0% 0%', opacity: 1 }
  }),
  vp = new ae('antSlideUpOut', {
    '0%': { transform: 'scaleY(1)', transformOrigin: '0% 0%', opacity: 1 },
    '100%': { transform: 'scaleY(0.8)', transformOrigin: '0% 0%', opacity: 0 }
  }),
  gp = new ae('antSlideDownIn', {
    '0%': {
      transform: 'scaleY(0.8)',
      transformOrigin: '100% 100%',
      opacity: 0
    },
    '100%': { transform: 'scaleY(1)', transformOrigin: '100% 100%', opacity: 1 }
  }),
  hp = new ae('antSlideDownOut', {
    '0%': { transform: 'scaleY(1)', transformOrigin: '100% 100%', opacity: 1 },
    '100%': {
      transform: 'scaleY(0.8)',
      transformOrigin: '100% 100%',
      opacity: 0
    }
  }),
  bp = new ae('antSlideLeftIn', {
    '0%': { transform: 'scaleX(0.8)', transformOrigin: '0% 0%', opacity: 0 },
    '100%': { transform: 'scaleX(1)', transformOrigin: '0% 0%', opacity: 1 }
  }),
  yp = new ae('antSlideLeftOut', {
    '0%': { transform: 'scaleX(1)', transformOrigin: '0% 0%', opacity: 1 },
    '100%': { transform: 'scaleX(0.8)', transformOrigin: '0% 0%', opacity: 0 }
  }),
  $p = new ae('antSlideRightIn', {
    '0%': { transform: 'scaleX(0.8)', transformOrigin: '100% 0%', opacity: 0 },
    '100%': { transform: 'scaleX(1)', transformOrigin: '100% 0%', opacity: 1 }
  }),
  Cp = new ae('antSlideRightOut', {
    '0%': { transform: 'scaleX(1)', transformOrigin: '100% 0%', opacity: 1 },
    '100%': { transform: 'scaleX(0.8)', transformOrigin: '100% 0%', opacity: 0 }
  }),
  wp = {
    'slide-up': { inKeyframes: mp, outKeyframes: vp },
    'slide-down': { inKeyframes: gp, outKeyframes: hp },
    'slide-left': { inKeyframes: bp, outKeyframes: yp },
    'slide-right': { inKeyframes: $p, outKeyframes: Cp }
  },
  Yr = (e, t) => {
    const { antCls: n } = e,
      o = `${n}-${t}`,
      { inKeyframes: r, outKeyframes: i } = wp[t]
    return [
      Do(o, r, i, e.motionDurationMid),
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
  Sp = new ae('antZoomIn', {
    '0%': { transform: 'scale(0.2)', opacity: 0 },
    '100%': { transform: 'scale(1)', opacity: 1 }
  }),
  xp = new ae('antZoomOut', {
    '0%': { transform: 'scale(1)' },
    '100%': { transform: 'scale(0.2)', opacity: 0 }
  }),
  qr = new ae('antZoomBigIn', {
    '0%': { transform: 'scale(0.8)', opacity: 0 },
    '100%': { transform: 'scale(1)', opacity: 1 }
  }),
  kr = new ae('antZoomBigOut', {
    '0%': { transform: 'scale(1)' },
    '100%': { transform: 'scale(0.8)', opacity: 0 }
  }),
  Op = new ae('antZoomUpIn', {
    '0%': { transform: 'scale(0.8)', transformOrigin: '50% 0%', opacity: 0 },
    '100%': { transform: 'scale(1)', transformOrigin: '50% 0%' }
  }),
  Tp = new ae('antZoomUpOut', {
    '0%': { transform: 'scale(1)', transformOrigin: '50% 0%' },
    '100%': { transform: 'scale(0.8)', transformOrigin: '50% 0%', opacity: 0 }
  }),
  Pp = new ae('antZoomLeftIn', {
    '0%': { transform: 'scale(0.8)', transformOrigin: '0% 50%', opacity: 0 },
    '100%': { transform: 'scale(1)', transformOrigin: '0% 50%' }
  }),
  Ip = new ae('antZoomLeftOut', {
    '0%': { transform: 'scale(1)', transformOrigin: '0% 50%' },
    '100%': { transform: 'scale(0.8)', transformOrigin: '0% 50%', opacity: 0 }
  }),
  Ep = new ae('antZoomRightIn', {
    '0%': { transform: 'scale(0.8)', transformOrigin: '100% 50%', opacity: 0 },
    '100%': { transform: 'scale(1)', transformOrigin: '100% 50%' }
  }),
  _p = new ae('antZoomRightOut', {
    '0%': { transform: 'scale(1)', transformOrigin: '100% 50%' },
    '100%': { transform: 'scale(0.8)', transformOrigin: '100% 50%', opacity: 0 }
  }),
  Ap = new ae('antZoomDownIn', {
    '0%': { transform: 'scale(0.8)', transformOrigin: '50% 100%', opacity: 0 },
    '100%': { transform: 'scale(1)', transformOrigin: '50% 100%' }
  }),
  Mp = new ae('antZoomDownOut', {
    '0%': { transform: 'scale(1)', transformOrigin: '50% 100%' },
    '100%': { transform: 'scale(0.8)', transformOrigin: '50% 100%', opacity: 0 }
  }),
  Rp = {
    zoom: { inKeyframes: Sp, outKeyframes: xp },
    'zoom-big': { inKeyframes: qr, outKeyframes: kr },
    'zoom-big-fast': { inKeyframes: qr, outKeyframes: kr },
    'zoom-left': { inKeyframes: Pp, outKeyframes: Ip },
    'zoom-right': { inKeyframes: Ep, outKeyframes: _p },
    'zoom-up': { inKeyframes: Op, outKeyframes: Tp },
    'zoom-down': { inKeyframes: Ap, outKeyframes: Mp }
  },
  zo = (e, t) => {
    const { antCls: n } = e,
      o = `${n}-${t}`,
      { inKeyframes: r, outKeyframes: i } = Rp[t]
    return [
      Do(
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
  Bp = e => ({
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
  Dp = Bp
function zp(e, t, n) {
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
function Np(e, t, n) {
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
function Aa(e) {
  let t =
    arguments.length > 1 && arguments[1] !== void 0
      ? arguments[1]
      : { focus: !0 }
  const { componentCls: n } = e,
    o = `${n}-compact`
  return { [o]: f(f({}, zp(e, o, t)), Np(n, o, t)) }
}
const ye = { adjustX: 1, adjustY: 1 },
  $e = [0, 0],
  Ma = {
    left: {
      points: ['cr', 'cl'],
      overflow: ye,
      offset: [-4, 0],
      targetOffset: $e
    },
    right: {
      points: ['cl', 'cr'],
      overflow: ye,
      offset: [4, 0],
      targetOffset: $e
    },
    top: {
      points: ['bc', 'tc'],
      overflow: ye,
      offset: [0, -4],
      targetOffset: $e
    },
    bottom: {
      points: ['tc', 'bc'],
      overflow: ye,
      offset: [0, 4],
      targetOffset: $e
    },
    topLeft: {
      points: ['bl', 'tl'],
      overflow: ye,
      offset: [0, -4],
      targetOffset: $e
    },
    leftTop: {
      points: ['tr', 'tl'],
      overflow: ye,
      offset: [-4, 0],
      targetOffset: $e
    },
    topRight: {
      points: ['br', 'tr'],
      overflow: ye,
      offset: [0, -4],
      targetOffset: $e
    },
    rightTop: {
      points: ['tl', 'tr'],
      overflow: ye,
      offset: [4, 0],
      targetOffset: $e
    },
    bottomRight: {
      points: ['tr', 'br'],
      overflow: ye,
      offset: [0, 4],
      targetOffset: $e
    },
    rightBottom: {
      points: ['bl', 'br'],
      overflow: ye,
      offset: [4, 0],
      targetOffset: $e
    },
    bottomLeft: {
      points: ['tl', 'bl'],
      overflow: ye,
      offset: [0, 4],
      targetOffset: $e
    },
    leftBottom: {
      points: ['br', 'bl'],
      overflow: ye,
      offset: [-4, 0],
      targetOffset: $e
    }
  },
  Fp = { prefixCls: String, id: String, overlayInnerStyle: I.any },
  Hp = U({
    compatConfig: { MODE: 3 },
    name: 'TooltipContent',
    props: Fp,
    setup(e, t) {
      let { slots: n } = t
      return () => {
        var o
        return g(
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
var Lp =
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
function Zr() {}
const jp = U({
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
      const i = B(),
        a = () => {
          const { prefixCls: c, tipId: u, overlayInnerStyle: p } = e
          return [
            e.arrow
              ? g('div', { class: `${c}-arrow`, key: 'arrow' }, [
                  bo(n, e, 'arrowContent')
                ])
              : null,
            g(
              Hp,
              { key: 'content', prefixCls: c, id: u, overlayInnerStyle: p },
              { overlay: n.overlay }
            )
          ]
        }
      r({
        getPopupDomNode: () => i.value.getPopupDomNode(),
        triggerDOM: i,
        forcePopupAlign: () => {
          var c
          return (c = i.value) === null || c === void 0
            ? void 0
            : c.forcePopupAlign()
        }
      })
      const s = B(!1),
        d = B(!1)
      return (
        Te(() => {
          const { destroyTooltipOnHide: c } = e
          if (typeof c == 'boolean') s.value = c
          else if (c && typeof c == 'object') {
            const { keepParent: u } = c
            ;(s.value = u === !0), (d.value = u === !1)
          }
        }),
        () => {
          const {
              overlayClassName: c,
              trigger: u,
              mouseEnterDelay: p,
              mouseLeaveDelay: m,
              overlayStyle: v,
              prefixCls: h,
              afterVisibleChange: C,
              transitionName: b,
              animation: y,
              placement: w,
              align: _,
              destroyTooltipOnHide: P,
              defaultVisible: S
            } = e,
            $ = Lp(e, [
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
            A = f({}, $)
          e.visible !== void 0 && (A.popupVisible = e.visible)
          const z = f(
            f(
              f(
                {
                  popupClassName: c,
                  prefixCls: h,
                  action: u,
                  builtinPlacements: Ma,
                  popupPlacement: w,
                  popupAlign: _,
                  afterPopupVisibleChange: C,
                  popupTransitionName: b,
                  popupAnimation: y,
                  defaultPopupVisible: S,
                  destroyPopupOnHide: s.value,
                  autoDestroy: d.value,
                  mouseLeaveDelay: m,
                  popupStyle: v,
                  mouseEnterDelay: p
                },
                A
              ),
              o
            ),
            {
              onPopupVisibleChange: e.onVisibleChange || Zr,
              onPopupAlign: e.onPopupAlign || Zr,
              ref: i,
              arrow: !!e.arrow,
              popup: a()
            }
          )
          return g(Ao, z, { default: n.default })
        }
      )
    }
  }),
  Wp = () => ({
    trigger: [String, Array],
    open: { type: Boolean, default: void 0 },
    visible: { type: Boolean, default: void 0 },
    placement: String,
    color: String,
    transitionName: String,
    overlayStyle: ge(),
    overlayInnerStyle: ge(),
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
    align: ge(),
    builtinPlacements: ge(),
    children: Array,
    onVisibleChange: Function,
    'onUpdate:visible': Function,
    onOpenChange: Function,
    'onUpdate:open': Function
  }),
  Vp = { adjustX: 1, adjustY: 1 },
  Qr = { adjustX: 0, adjustY: 0 },
  Kp = [0, 0]
function Jr(e) {
  return typeof e == 'boolean' ? (e ? Vp : Qr) : f(f({}, Qr), e)
}
function Gp(e) {
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
        ? f(f({}, a[l]), { overflow: Jr(r), targetOffset: Kp })
        : f(f({}, Ma[l]), { overflow: Jr(r) })),
        (a[l].ignoreShake = !0)
    }),
    a
  )
}
function Up() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : []
  for (let t = 0, n = e.length; t < n; t++) if (e[t] !== void 0) return e[t]
}
const Xp = un.map(e => `${e}-inverse`),
  Yp = ['success', 'processing', 'error', 'default', 'warning']
function qp(e) {
  return (arguments.length > 1 && arguments[1] !== void 0
  ? arguments[1]
  : !0)
    ? [...Xp, ...un].includes(e)
    : un.includes(e)
}
function Kg(e) {
  return Yp.includes(e)
}
function kp(e, t) {
  const n = qp(t),
    o = ne({ [`${e}-${t}`]: t && n }),
    r = {},
    i = {}
  return (
    t && !n && ((r.background = t), (i['--antd-arrow-background-color'] = t)),
    { className: o, overlayStyle: r, arrowStyle: i }
  )
}
function Zt(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : ''
  return e.map(n => `${t}${n}`).join(',')
}
const Ra = 8
function Zp(e) {
  const t = Ra,
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
function Qp(e, t) {
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
      showArrowCls: d,
      contentRadius: c = e.borderRadiusLG,
      limitVerticalRadius: u
    } = t,
    { dropdownArrowOffsetVertical: p, dropdownArrowOffset: m } = Zp({
      sizePopupArrow: o,
      contentRadius: c,
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
            ys(o, i, a, s, l)
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
        left: { _skip_check_: !0, value: m }
      },
      [`&-placement-topRight ${n}-arrow`]: {
        right: { _skip_check_: !0, value: m }
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
        left: { _skip_check_: !0, value: m }
      },
      [`&-placement-bottomRight ${n}-arrow`]: {
        right: { _skip_check_: !0, value: m }
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
      [`&-placement-leftTop ${n}-arrow`]: { top: p },
      [`&-placement-leftBottom ${n}-arrow`]: { bottom: p },
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
      [`&-placement-rightTop ${n}-arrow`]: { top: p },
      [`&-placement-rightBottom ${n}-arrow`]: { bottom: p },
      [Zt(
        ['&-placement-topLeft', '&-placement-top', '&-placement-topRight'].map(
          h => (h += ':not(&-arrow-hidden)')
        ),
        d
      )]: { paddingBottom: v },
      [Zt(
        [
          '&-placement-bottomLeft',
          '&-placement-bottom',
          '&-placement-bottomRight'
        ].map(h => (h += ':not(&-arrow-hidden)')),
        d
      )]: { paddingTop: v },
      [Zt(
        [
          '&-placement-leftTop',
          '&-placement-left',
          '&-placement-leftBottom'
        ].map(h => (h += ':not(&-arrow-hidden)')),
        d
      )]: { paddingRight: { _skip_check_: !0, value: v } },
      [Zt(
        [
          '&-placement-rightTop',
          '&-placement-right',
          '&-placement-rightBottom'
        ].map(h => (h += ':not(&-arrow-hidden)')),
        d
      )]: { paddingLeft: { _skip_check_: !0, value: v } }
    }
  }
}
const Jp = e => {
    const {
      componentCls: t,
      tooltipMaxWidth: n,
      tooltipColor: o,
      tooltipBg: r,
      tooltipBorderRadius: i,
      zIndexPopup: a,
      controlHeight: l,
      boxShadowSecondary: s,
      paddingSM: d,
      paddingXS: c,
      tooltipRadiusOuter: u
    } = e
    return [
      {
        [t]: f(
          f(
            f(f({}, Vt(e)), {
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
                padding: `${d / 2}px ${c}px`,
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
                [`${t}-inner`]: { borderRadius: Math.min(i, Ra) }
              },
              [`${t}-content`]: { position: 'relative' }
            }),
            $s(e, (p, m) => {
              let { darkColor: v } = m
              return {
                [`&${t}-${p}`]: {
                  [`${t}-inner`]: { backgroundColor: v },
                  [`${t}-arrow`]: { '--antd-arrow-background-color': v }
                }
              }
            })
          ),
          { '&-rtl': { direction: 'rtl' } }
        )
      },
      Qp(xe(e, { borderRadiusOuter: u }), {
        colorBg: 'var(--antd-arrow-background-color)',
        showArrowCls: '',
        contentRadius: i,
        limitVerticalRadius: !0
      }),
      { [`${t}-pure`]: { position: 'relative', maxWidth: 'none' } }
    ]
  },
  em = (e, t) =>
    tt(
      'Tooltip',
      o => {
        if ((t == null ? void 0 : t.value) === !1) return []
        const {
            borderRadius: r,
            colorTextLightSolid: i,
            colorBgDefault: a,
            borderRadiusOuter: l
          } = o,
          s = xe(o, {
            tooltipMaxWidth: 250,
            tooltipColor: i,
            tooltipBorderRadius: r,
            tooltipBg: a,
            tooltipRadiusOuter: l > 4 ? 4 : l
          })
        return [Jp(s), zo(o, 'zoom-big-fast')]
      },
      o => {
        let { zIndexPopupBase: r, colorBgSpotlight: i } = o
        return { zIndexPopup: r + 70, colorBgDefault: i }
      }
    )(e),
  tm = (e, t) => {
    const n = {},
      o = f({}, e)
    return (
      t.forEach(r => {
        e && r in e && ((n[r] = e[r]), delete o[r])
      }),
      { picked: n, omitted: o }
    )
  },
  nm = () => f(f({}, Wp()), { title: I.any }),
  Gg = () => ({
    trigger: 'hover',
    align: {},
    placement: 'top',
    mouseEnterDelay: 0.1,
    mouseLeaveDelay: 0.1,
    arrowPointAtCenter: !1,
    autoAdjustOverflow: !0
  }),
  om = U({
    compatConfig: { MODE: 3 },
    name: 'ATooltip',
    inheritAttrs: !1,
    props: wt(nm(), {
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
          rootPrefixCls: d
        } = Re('tooltip', e),
        c = O(() => {
          var T
          return (T = e.open) !== null && T !== void 0 ? T : e.visible
        }),
        u = L(Up([e.open, e.visible])),
        p = L()
      let m
      J(c, T => {
        ce.cancel(m),
          (m = ce(() => {
            u.value = !!T
          }))
      })
      const v = () => {
          var T
          const D = (T = e.title) !== null && T !== void 0 ? T : n.title
          return !D && D !== 0
        },
        h = T => {
          const D = v()
          c.value === void 0 && (u.value = D ? !1 : T),
            D ||
              (o('update:visible', T),
              o('visibleChange', T),
              o('update:open', T),
              o('openChange', T))
        }
      i({
        getPopupDomNode: () => p.value.getPopupDomNode(),
        open: u,
        forcePopupAlign: () => {
          var T
          return (T = p.value) === null || T === void 0
            ? void 0
            : T.forcePopupAlign()
        }
      })
      const b = O(() => {
          var T
          const {
            builtinPlacements: D,
            autoAdjustOverflow: V,
            arrow: X,
            arrowPointAtCenter: q
          } = e
          let x = q
          return (
            typeof X == 'object' &&
              (x = (T = X.pointAtCenter) !== null && T !== void 0 ? T : q),
            D || Gp({ arrowPointAtCenter: x, autoAdjustOverflow: V })
          )
        }),
        y = T => T || T === '',
        w = T => {
          const D = T.type
          if (
            typeof D == 'object' &&
            T.props &&
            (((D.__ANT_BUTTON === !0 || D === 'button') &&
              y(T.props.disabled)) ||
              (D.__ANT_SWITCH === !0 &&
                (y(T.props.disabled) || y(T.props.loading))) ||
              (D.__ANT_RADIO === !0 && y(T.props.disabled)))
          ) {
            const { picked: V, omitted: X } = tm(Dl(T), [
                'position',
                'left',
                'right',
                'top',
                'bottom',
                'float',
                'display',
                'zIndex'
              ]),
              q = f(f({ display: 'inline-block' }, V), {
                cursor: 'not-allowed',
                lineHeight: 1,
                width: T.props && T.props.block ? '100%' : void 0
              }),
              x = f(f({}, X), { pointerEvents: 'none' }),
              N = Oe(T, { style: x }, !0)
            return g(
              'span',
              { style: q, class: `${a.value}-disabled-compatible-wrapper` },
              [N]
            )
          }
          return T
        },
        _ = () => {
          var T, D
          return (T = e.title) !== null && T !== void 0
            ? T
            : (D = n.title) === null || D === void 0
            ? void 0
            : D.call(n)
        },
        P = (T, D) => {
          const V = b.value,
            X = Object.keys(V).find(q => {
              var x, N
              return (
                V[q].points[0] ===
                  ((x = D.points) === null || x === void 0 ? void 0 : x[0]) &&
                V[q].points[1] ===
                  ((N = D.points) === null || N === void 0 ? void 0 : N[1])
              )
            })
          if (X) {
            const q = T.getBoundingClientRect(),
              x = { top: '50%', left: '50%' }
            X.indexOf('top') >= 0 || X.indexOf('Bottom') >= 0
              ? (x.top = `${q.height - D.offset[1]}px`)
              : (X.indexOf('Top') >= 0 || X.indexOf('bottom') >= 0) &&
                (x.top = `${-D.offset[1]}px`),
              X.indexOf('left') >= 0 || X.indexOf('Right') >= 0
                ? (x.left = `${q.width - D.offset[0]}px`)
                : (X.indexOf('right') >= 0 || X.indexOf('Left') >= 0) &&
                  (x.left = `${-D.offset[0]}px`),
              (T.style.transformOrigin = `${x.left} ${x.top}`)
          }
        },
        S = O(() => kp(a.value, e.color)),
        $ = O(() => r['data-popover-inject']),
        [A, z] = em(
          a,
          O(() => !$.value)
        )
      return () => {
        var T, D
        const {
          openClassName: V,
          overlayClassName: X,
          overlayStyle: q,
          overlayInnerStyle: x
        } = e
        let N =
          (D = Ct(
            (T = n.default) === null || T === void 0 ? void 0 : T.call(n)
          )) !== null && D !== void 0
            ? D
            : null
        N = N.length === 1 ? N[0] : N
        let j = u.value
        if ((c.value === void 0 && v() && (j = !1), !N)) return null
        const W = w(yo(N) && !Bl(N) ? N : g('span', null, [N])),
          R = ne({
            [V || `${a.value}-open`]: !0,
            [W.props && W.props.class]: W.props && W.props.class
          }),
          H = ne(
            X,
            { [`${a.value}-rtl`]: s.value === 'rtl' },
            S.value.className,
            z.value
          ),
          F = f(f({}, S.value.overlayStyle), x),
          k = S.value.arrowStyle,
          Z = f(f(f({}, r), e), {
            prefixCls: a.value,
            arrow: !!e.arrow,
            getPopupContainer: l == null ? void 0 : l.value,
            builtinPlacements: b.value,
            visible: j,
            ref: p,
            overlayClassName: H,
            overlayStyle: f(f({}, k), q),
            overlayInnerStyle: F,
            onVisibleChange: h,
            onPopupAlign: P,
            transitionName: Bt(d.value, 'zoom-big-fast', e.transitionName)
          })
        return A(
          g(jp, Z, {
            default: () => [u.value ? Oe(W, { class: R }) : W],
            arrowContent: () =>
              g('span', { class: `${a.value}-arrow-content` }, null),
            overlay: _
          })
        )
      }
    }
  }),
  rm = zl(om),
  it = { adjustX: 1, adjustY: 1 },
  at = [0, 0],
  im = {
    topLeft: {
      points: ['bl', 'tl'],
      overflow: it,
      offset: [0, -4],
      targetOffset: at
    },
    topCenter: {
      points: ['bc', 'tc'],
      overflow: it,
      offset: [0, -4],
      targetOffset: at
    },
    topRight: {
      points: ['br', 'tr'],
      overflow: it,
      offset: [0, -4],
      targetOffset: at
    },
    bottomLeft: {
      points: ['tl', 'bl'],
      overflow: it,
      offset: [0, 4],
      targetOffset: at
    },
    bottomCenter: {
      points: ['tc', 'bc'],
      overflow: it,
      offset: [0, 4],
      targetOffset: at
    },
    bottomRight: {
      points: ['tr', 'br'],
      overflow: it,
      offset: [0, 4],
      targetOffset: at
    }
  },
  am = im
var lm =
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
const Ug = U({
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
      const i = L(!!e.visible)
      J(
        () => e.visible,
        m => {
          m !== void 0 && (i.value = m)
        }
      )
      const a = L()
      r({ triggerRef: a })
      const l = m => {
          e.visible === void 0 && (i.value = !1), o('overlayClick', m)
        },
        s = m => {
          e.visible === void 0 && (i.value = m), o('visibleChange', m)
        },
        d = () => {
          var m
          const v =
              (m = n.overlay) === null || m === void 0 ? void 0 : m.call(n),
            h = { prefixCls: `${e.prefixCls}-menu`, onClick: l }
          return g(je, { key: Nl }, [
            e.arrow && g('div', { class: `${e.prefixCls}-arrow` }, null),
            Oe(v, h, !1)
          ])
        },
        c = O(() => {
          const { minOverlayWidthMatchTrigger: m = !e.alignPoint } = e
          return m
        }),
        u = () => {
          var m
          const v =
            (m = n.default) === null || m === void 0 ? void 0 : m.call(n)
          return i.value && v
            ? Oe(v[0], { class: e.openClassName || `${e.prefixCls}-open` }, !1)
            : v
        },
        p = O(() =>
          !e.hideAction && e.trigger.indexOf('contextmenu') !== -1
            ? ['click']
            : e.hideAction
        )
      return () => {
        const {
            prefixCls: m,
            arrow: v,
            showAction: h,
            overlayStyle: C,
            trigger: b,
            placement: y,
            align: w,
            getPopupContainer: _,
            transitionName: P,
            animation: S,
            overlayClassName: $
          } = e,
          A = lm(e, [
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
        return g(
          Ao,
          E(
            E({}, A),
            {},
            {
              prefixCls: m,
              ref: a,
              popupClassName: ne($, { [`${m}-show-arrow`]: v }),
              popupStyle: C,
              builtinPlacements: am,
              action: b,
              showAction: h,
              hideAction: p.value || [],
              popupPlacement: y,
              popupAlign: w,
              popupTransitionName: P,
              popupAnimation: S,
              popupVisible: i.value,
              stretch: c.value ? 'minWidth' : '',
              onPopupVisibleChange: s,
              getPopupContainer: _
            }
          ),
          { popup: d, default: u }
        )
      }
    }
  }),
  sm = e => {
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
  um = tt('Wave', e => [sm(e)])
function cm(e) {
  const t = (e || '').match(/rgba?\((\d*), (\d*), (\d*)(, [\d.]*)?\)/)
  return t && t[1] && t[2] && t[3] ? !(t[1] === t[2] && t[2] === t[3]) : !0
}
function Ln(e) {
  return (
    e &&
    e !== '#fff' &&
    e !== '#ffffff' &&
    e !== 'rgb(255, 255, 255)' &&
    e !== 'rgba(255, 255, 255, 1)' &&
    cm(e) &&
    !/rgba\((?:\d*, ){3}0\)/.test(e) &&
    e !== 'transparent'
  )
}
function dm(e) {
  const {
    borderTopColor: t,
    borderColor: n,
    backgroundColor: o
  } = getComputedStyle(e)
  return Ln(t) ? t : Ln(n) ? n : Ln(o) ? o : null
}
function jn(e) {
  return Number.isNaN(e) ? 0 : e
}
const fm = U({
  props: { target: ge(), className: String },
  setup(e) {
    const t = B(null),
      [n, o] = Xe(null),
      [r, i] = Xe([]),
      [a, l] = Xe(0),
      [s, d] = Xe(0),
      [c, u] = Xe(0),
      [p, m] = Xe(0),
      [v, h] = Xe(!1)
    function C() {
      const { target: $ } = e,
        A = getComputedStyle($)
      o(dm($))
      const z = A.position === 'static',
        { borderLeftWidth: T, borderTopWidth: D } = A
      l(z ? $.offsetLeft : jn(-parseFloat(T))),
        d(z ? $.offsetTop : jn(-parseFloat(D))),
        u($.offsetWidth),
        m($.offsetHeight)
      const {
        borderTopLeftRadius: V,
        borderTopRightRadius: X,
        borderBottomLeftRadius: q,
        borderBottomRightRadius: x
      } = A
      i([V, X, x, q].map(N => jn(parseFloat(N))))
    }
    let b, y, w
    const _ = () => {
        clearTimeout(w), ce.cancel(y), b == null || b.disconnect()
      },
      P = () => {
        var $
        const A =
          ($ = t.value) === null || $ === void 0 ? void 0 : $.parentElement
        A && (pt(null, A), A.parentElement && A.parentElement.removeChild(A))
      }
    Ee(() => {
      _(),
        (w = setTimeout(() => {
          P()
        }, 5e3))
      const { target: $ } = e
      $ &&
        ((y = ce(() => {
          C(), h(!0)
        })),
        typeof ResizeObserver < 'u' &&
          ((b = new ResizeObserver(C)), b.observe($)))
    }),
      me(() => {
        _()
      })
    const S = $ => {
      $.propertyName === 'opacity' && P()
    }
    return () => {
      if (!v.value) return null
      const $ = {
        left: `${a.value}px`,
        top: `${s.value}px`,
        width: `${c.value}px`,
        height: `${p.value}px`,
        borderRadius: r.value.map(A => `${A}px`).join(' ')
      }
      return (
        n && ($['--wave-color'] = n.value),
        g(
          We,
          {
            appear: !0,
            name: 'wave-motion',
            appearFromClass: 'wave-motion-appear',
            appearActiveClass: 'wave-motion-appear',
            appearToClass: 'wave-motion-appear wave-motion-appear-active'
          },
          {
            default: () => [
              g(
                'div',
                { ref: t, class: e.className, style: $, onTransitionend: S },
                null
              )
            ]
          }
        )
      )
    }
  }
})
function pm(e, t) {
  const n = document.createElement('div')
  return (
    (n.style.position = 'absolute'),
    (n.style.left = '0px'),
    (n.style.top = '0px'),
    e == null || e.insertBefore(n, e == null ? void 0 : e.firstChild),
    pt(g(fm, { target: e, className: t }, null), n),
    () => {
      pt(null, n), n.parentElement && n.parentElement.removeChild(n)
    }
  )
}
function mm(e, t) {
  const n = Me()
  let o
  function r() {
    var i
    const a = _e(n)
    o == null || o(),
      !(
        (!((i = t == null ? void 0 : t.value) === null || i === void 0) &&
          i.disabled) ||
        !a
      ) && (o = pm(a, e.value))
  }
  return (
    me(() => {
      o == null || o()
    }),
    r
  )
}
const vm = U({
  compatConfig: { MODE: 3 },
  name: 'Wave',
  props: { disabled: Boolean },
  setup(e, t) {
    let { slots: n } = t
    const o = Me(),
      { prefixCls: r, wave: i } = Re('wave', e),
      [, a] = um(r),
      l = mm(
        O(() => ne(r.value, a.value)),
        i
      )
    let s
    const d = () => {
      _e(o).removeEventListener('click', s, !0)
    }
    return (
      Ee(() => {
        J(
          () => e.disabled,
          () => {
            d(),
              Ie(() => {
                const c = _e(o)
                c == null || c.removeEventListener('click', s, !0),
                  !(!c || c.nodeType !== 1 || e.disabled) &&
                    ((s = u => {
                      u.target.tagName === 'INPUT' ||
                        !ia(u.target) ||
                        !c.getAttribute ||
                        c.getAttribute('disabled') ||
                        c.disabled ||
                        c.className.includes('disabled') ||
                        c.className.includes('-leave') ||
                        l()
                    }),
                    c.addEventListener('click', s, !0))
              })
          },
          { immediate: !0, flush: 'post' }
        )
      }),
      me(() => {
        d()
      }),
      () => {
        var c
        return (c = n.default) === null || c === void 0 ? void 0 : c.call(n)[0]
      }
    )
  }
})
function Ba(e) {
  return e === 'danger' ? { danger: !0 } : { type: e }
}
const gm = () => ({
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
    onClick: rn(),
    onMousedown: rn()
  }),
  hm = gm,
  ei = e => {
    e &&
      ((e.style.width = '0px'),
      (e.style.opacity = '0'),
      (e.style.transform = 'scale(0)'))
  },
  ti = e => {
    Ie(() => {
      e &&
        ((e.style.width = `${e.scrollWidth}px`),
        (e.style.opacity = '1'),
        (e.style.transform = 'scale(1)'))
    })
  },
  ni = e => {
    e &&
      e.style &&
      ((e.style.width = null),
      (e.style.opacity = null),
      (e.style.transform = null))
  },
  bm = U({
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
          return g('span', { class: `${n}-loading-icon` }, [g(Jo, null, null)])
        const r = !!o
        return g(
          We,
          {
            name: `${n}-loading-icon-motion`,
            onBeforeEnter: ei,
            onEnter: ti,
            onAfterEnter: ni,
            onBeforeLeave: ti,
            onLeave: i => {
              setTimeout(() => {
                ei(i)
              })
            },
            onAfterLeave: ni
          },
          {
            default: () => [
              r
                ? g('span', { class: `${n}-loading-icon` }, [g(Jo, null, null)])
                : null
            ]
          }
        )
      }
    }
  }),
  oi = (e, t) => ({
    [`> span, > ${e}`]: {
      '&:not(:last-child)': {
        [`&, & > ${e}`]: { '&:not(:disabled)': { borderInlineEndColor: t } }
      },
      '&:not(:first-child)': {
        [`&, & > ${e}`]: { '&:not(:disabled)': { borderInlineStartColor: t } }
      }
    }
  }),
  ym = e => {
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
        oi(`${t}-primary`, r),
        oi(`${t}-danger`, i)
      ]
    }
  },
  $m = ym
function Cm(e, t) {
  return {
    [`&-item:not(${t}-last-item)`]: { marginBottom: -e.lineWidth },
    '&-item': {
      '&:hover,&:focus,&:active': { zIndex: 2 },
      '&[disabled]': { zIndex: 0 }
    }
  }
}
function wm(e, t) {
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
function Sm(e) {
  const t = `${e.componentCls}-compact-vertical`
  return { [t]: f(f({}, Cm(e, t)), wm(e.componentCls, t)) }
}
const xm = e => {
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
        '&:not(:disabled)': f({}, Bi(e)),
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
  Ae = (e, t) => ({ '&:not(:disabled)': { '&:hover': e, '&:active': t } }),
  Om = e => ({
    minWidth: e.controlHeight,
    paddingInlineStart: 0,
    paddingInlineEnd: 0,
    borderRadius: '50%'
  }),
  Tm = e => ({
    borderRadius: e.controlHeight,
    paddingInlineStart: e.controlHeight / 2,
    paddingInlineEnd: e.controlHeight / 2
  }),
  uo = e => ({
    cursor: 'not-allowed',
    borderColor: e.colorBorder,
    color: e.colorTextDisabled,
    backgroundColor: e.colorBgContainerDisabled,
    boxShadow: 'none'
  }),
  mn = (e, t, n, o, r, i, a) => ({
    [`&${e}-background-ghost`]: f(
      f(
        {
          color: t || void 0,
          backgroundColor: 'transparent',
          borderColor: n || void 0,
          boxShadow: 'none'
        },
        Ae(
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
  No = e => ({ '&:disabled': f({}, uo(e)) }),
  Da = e => f({}, No(e)),
  vn = e => ({
    '&:disabled': { cursor: 'not-allowed', color: e.colorTextDisabled }
  }),
  za = e =>
    f(
      f(
        f(
          f(f({}, Da(e)), {
            backgroundColor: e.colorBgContainer,
            borderColor: e.colorBorder,
            boxShadow: `0 ${e.controlOutlineWidth}px 0 ${e.controlTmpOutline}`
          }),
          Ae(
            { color: e.colorPrimaryHover, borderColor: e.colorPrimaryHover },
            { color: e.colorPrimaryActive, borderColor: e.colorPrimaryActive }
          )
        ),
        mn(
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
              Ae(
                {
                  color: e.colorErrorHover,
                  borderColor: e.colorErrorBorderHover
                },
                { color: e.colorErrorActive, borderColor: e.colorErrorActive }
              )
            ),
            mn(
              e.componentCls,
              e.colorError,
              e.colorError,
              e.colorTextDisabled,
              e.colorBorder
            )
          ),
          No(e)
        )
      }
    ),
  Pm = e =>
    f(
      f(
        f(
          f(f({}, Da(e)), {
            color: e.colorTextLightSolid,
            backgroundColor: e.colorPrimary,
            boxShadow: `0 ${e.controlOutlineWidth}px 0 ${e.controlOutline}`
          }),
          Ae(
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
        mn(
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
              Ae(
                { backgroundColor: e.colorErrorHover },
                { backgroundColor: e.colorErrorActive }
              )
            ),
            mn(
              e.componentCls,
              e.colorError,
              e.colorError,
              e.colorTextDisabled,
              e.colorBorder,
              { color: e.colorErrorHover, borderColor: e.colorErrorHover },
              { color: e.colorErrorActive, borderColor: e.colorErrorActive }
            )
          ),
          No(e)
        )
      }
    ),
  Im = e => f(f({}, za(e)), { borderStyle: 'dashed' }),
  Em = e =>
    f(
      f(
        f(
          { color: e.colorLink },
          Ae({ color: e.colorLinkHover }, { color: e.colorLinkActive })
        ),
        vn(e)
      ),
      {
        [`&${e.componentCls}-dangerous`]: f(
          f(
            { color: e.colorError },
            Ae({ color: e.colorErrorHover }, { color: e.colorErrorActive })
          ),
          vn(e)
        )
      }
    ),
  _m = e =>
    f(
      f(
        f(
          {},
          Ae(
            { color: e.colorText, backgroundColor: e.colorBgTextHover },
            { color: e.colorText, backgroundColor: e.colorBgTextActive }
          )
        ),
        vn(e)
      ),
      {
        [`&${e.componentCls}-dangerous`]: f(
          f({ color: e.colorError }, vn(e)),
          Ae(
            { color: e.colorErrorHover, backgroundColor: e.colorErrorBg },
            { color: e.colorErrorHover, backgroundColor: e.colorErrorBg }
          )
        )
      }
    ),
  Am = e => f(f({}, uo(e)), { [`&${e.componentCls}:hover`]: f({}, uo(e)) }),
  Mm = e => {
    const { componentCls: t } = e
    return {
      [`${t}-default`]: za(e),
      [`${t}-primary`]: Pm(e),
      [`${t}-dashed`]: Im(e),
      [`${t}-link`]: Em(e),
      [`${t}-text`]: _m(e),
      [`${t}-disabled`]: Am(e)
    }
  },
  Fo = function(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : ''
    const {
        componentCls: n,
        iconCls: o,
        controlHeight: r,
        fontSize: i,
        lineHeight: a,
        lineWidth: l,
        borderRadius: s,
        buttonPaddingHorizontal: d
      } = e,
      c = Math.max(0, (r - i * a) / 2 - l),
      u = d - l,
      p = `${n}-icon-only`
    return [
      {
        [`${n}${t}`]: {
          fontSize: i,
          height: r,
          padding: `${c}px ${u}px`,
          borderRadius: s,
          [`&${p}`]: {
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
          [`&:not(${p}) ${n}-loading-icon > ${o}`]: {
            marginInlineEnd: e.marginXS
          }
        }
      },
      { [`${n}${n}-circle${t}`]: Om(e) },
      { [`${n}${n}-round${t}`]: Tm(e) }
    ]
  },
  Rm = e => Fo(e),
  Bm = e => {
    const t = xe(e, {
      controlHeight: e.controlHeightSM,
      padding: e.paddingXS,
      buttonPaddingHorizontal: 8,
      borderRadius: e.borderRadiusSM
    })
    return Fo(t, `${e.componentCls}-sm`)
  },
  Dm = e => {
    const t = xe(e, {
      controlHeight: e.controlHeightLG,
      fontSize: e.fontSizeLG,
      borderRadius: e.borderRadiusLG
    })
    return Fo(t, `${e.componentCls}-lg`)
  },
  zm = e => {
    const { componentCls: t } = e
    return { [t]: { [`&${t}-block`]: { width: '100%' } } }
  },
  Nm = tt('Button', e => {
    const { controlTmpOutline: t, paddingContentHorizontal: n } = e,
      o = xe(e, { colorOutlineDefault: t, buttonPaddingHorizontal: n })
    return [
      xm(o),
      Bm(o),
      Rm(o),
      Dm(o),
      zm(o),
      Mm(o),
      $m(o),
      Aa(e, { focus: !1 }),
      Sm(e)
    ]
  }),
  Fm = () => ({ prefixCls: String, size: { type: String } }),
  Na = Ro(),
  co = U({
    compatConfig: { MODE: 3 },
    name: 'AButtonGroup',
    props: Fm(),
    setup(e, t) {
      let { slots: n } = t
      const { prefixCls: o, direction: r } = Re('btn-group', e),
        [, , i] = Fl()
      Na.useProvide(vo({ size: O(() => e.size) }))
      const a = O(() => {
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
            ht(!l, 'Button.Group', 'Invalid prop `size`.')
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
        return g('div', { class: a.value }, [
          et((l = n.default) === null || l === void 0 ? void 0 : l.call(n))
        ])
      }
    }
  }),
  ri = /^[\u4e00-\u9fa5]{2}$/,
  ii = ri.test.bind(ri)
function Qt(e) {
  return e === 'text' || e === 'link'
}
const Ze = U({
  compatConfig: { MODE: 3 },
  name: 'AButton',
  inheritAttrs: !1,
  __ANT_BUTTON: !0,
  props: wt(hm(), { type: 'default' }),
  slots: Object,
  setup(e, t) {
    let { slots: n, attrs: o, emit: r, expose: i } = t
    const {
        prefixCls: a,
        autoInsertSpaceInButton: l,
        direction: s,
        size: d
      } = Re('btn', e),
      [c, u] = Nm(a),
      p = Na.useInject(),
      m = Di(),
      v = O(() => {
        var x
        return (x = e.disabled) !== null && x !== void 0 ? x : m.value
      }),
      h = B(null),
      C = B(void 0)
    let b = !1
    const y = B(!1),
      w = B(!1),
      _ = O(() => l.value !== !1),
      { compactSize: P, compactItemClassnames: S } = ap(a, s),
      $ = O(() =>
        typeof e.loading == 'object' && e.loading.delay
          ? e.loading.delay || !0
          : !!e.loading
      )
    J(
      $,
      x => {
        clearTimeout(C.value),
          typeof $.value == 'number'
            ? (C.value = setTimeout(() => {
                y.value = x
              }, $.value))
            : (y.value = x)
      },
      { immediate: !0 }
    )
    const A = O(() => {
        const {
            type: x,
            shape: N = 'default',
            ghost: j,
            block: W,
            danger: R
          } = e,
          H = a.value,
          F = { large: 'lg', small: 'sm', middle: void 0 },
          k = P.value || (p == null ? void 0 : p.size) || d.value,
          Z = (k && F[k]) || ''
        return [
          S.value,
          {
            [u.value]: !0,
            [`${H}`]: !0,
            [`${H}-${N}`]: N !== 'default' && N,
            [`${H}-${x}`]: x,
            [`${H}-${Z}`]: Z,
            [`${H}-loading`]: y.value,
            [`${H}-background-ghost`]: j && !Qt(x),
            [`${H}-two-chinese-chars`]: w.value && _.value,
            [`${H}-block`]: W,
            [`${H}-dangerous`]: !!R,
            [`${H}-rtl`]: s.value === 'rtl'
          }
        ]
      }),
      z = () => {
        const x = h.value
        if (!x || l.value === !1) return
        const N = x.textContent
        b && ii(N) ? w.value || (w.value = !0) : w.value && (w.value = !1)
      },
      T = x => {
        if (y.value || v.value) {
          x.preventDefault()
          return
        }
        r('click', x)
      },
      D = x => {
        r('mousedown', x)
      },
      V = (x, N) => {
        const j = N ? ' ' : ''
        if (x.type === bl) {
          let W = x.children.trim()
          return ii(W) && (W = W.split('').join(j)), g('span', null, [W])
        }
        return x
      }
    return (
      Te(() => {
        ht(
          !(e.ghost && Qt(e.type)),
          'Button',
          "`link` or `text` button can't be a `ghost` button."
        )
      }),
      Ee(z),
      yn(z),
      me(() => {
        C.value && clearTimeout(C.value)
      }),
      i({
        focus: () => {
          var x
          ;(x = h.value) === null || x === void 0 || x.focus()
        },
        blur: () => {
          var x
          ;(x = h.value) === null || x === void 0 || x.blur()
        }
      }),
      () => {
        var x, N
        const {
            icon: j = (x = n.icon) === null || x === void 0 ? void 0 : x.call(n)
          } = e,
          W = et((N = n.default) === null || N === void 0 ? void 0 : N.call(n))
        b = W.length === 1 && !j && !Qt(e.type)
        const { type: R, htmlType: H, href: F, title: k, target: Z } = e,
          de = y.value ? 'loading' : j,
          le = f(f({}, o), {
            title: k,
            disabled: v.value,
            class: [
              A.value,
              o.class,
              { [`${a.value}-icon-only`]: W.length === 0 && !!de }
            ],
            onClick: T,
            onMousedown: D
          })
        v.value || delete le.disabled
        const se =
            j && !y.value
              ? j
              : g(
                  bm,
                  { existIcon: !!j, prefixCls: a.value, loading: !!y.value },
                  null
                ),
          M = W.map(Q => V(Q, b && _.value))
        if (F !== void 0)
          return c(
            g('a', E(E({}, le), {}, { href: F, target: Z, ref: h }), [se, M])
          )
        let K = g('button', E(E({}, le), {}, { ref: h, type: H }), [se, M])
        if (!Qt(R)) {
          const Q = (function() {
            return K
          })()
          K = g(
            vm,
            { ref: 'wave', disabled: !!y.value },
            { default: () => [Q] }
          )
        }
        return c(K)
      }
    )
  }
})
Ze.Group = co
Ze.install = function(e) {
  return e.component(Ze.name, Ze), e.component(co.name, co), e
}
function ai(e) {
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
        Hm(e, r, n[r])
      })
  }
  return e
}
function Hm(e, t, n) {
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
var Ho = function(t, n) {
  var o = ai({}, t, n.attrs)
  return g(Wt, ai({}, o, { icon: xl }), null)
}
Ho.displayName = 'EllipsisOutlined'
Ho.inheritAttrs = !1
const Lm = Ho
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
        jm(e, r, n[r])
      })
  }
  return e
}
function jm(e, t, n) {
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
var Lo = function(t, n) {
  var o = li({}, t, n.attrs)
  return g(Wt, li({}, o, { icon: Ol }), null)
}
Lo.displayName = 'RightOutlined'
Lo.inheritAttrs = !1
const Xg = Lo,
  Fa = Symbol('OverrideContextKey'),
  Ha = () => Se(Fa, void 0),
  Yg = e => {
    var t, n, o
    const {
      prefixCls: r,
      mode: i,
      selectable: a,
      validator: l,
      onClick: s,
      expandIcon: d
    } = Ha() || {}
    ve(Fa, {
      prefixCls: O(() => {
        var c, u
        return (u =
          (c = e.prefixCls) === null || c === void 0 ? void 0 : c.value) !==
          null && u !== void 0
          ? u
          : r == null
          ? void 0
          : r.value
      }),
      mode: O(() => {
        var c, u
        return (u =
          (c = e.mode) === null || c === void 0 ? void 0 : c.value) !== null &&
          u !== void 0
          ? u
          : i == null
          ? void 0
          : i.value
      }),
      selectable: O(() => {
        var c, u
        return (u =
          (c = e.selectable) === null || c === void 0 ? void 0 : c.value) !==
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
          : d == null
          ? void 0
          : d.value
    })
  }
function Wm(e, t, n, o) {
  let r = n ? n.call(o, e, t) : void 0
  if (r !== void 0) return !!r
  if (e === t) return !0
  if (typeof e != 'object' || !e || typeof t != 'object' || !t) return !1
  const i = Object.keys(e),
    a = Object.keys(t)
  if (i.length !== a.length) return !1
  const l = Object.prototype.hasOwnProperty.bind(t)
  for (let s = 0; s < i.length; s++) {
    const d = i[s]
    if (!l(d)) return !1
    const c = e[d],
      u = t[d]
    if (
      ((r = n ? n.call(o, c, u, d) : void 0),
      r === !1 || (r === void 0 && c !== u))
    )
      return !1
  }
  return !0
}
function It(e, t) {
  return Wm(Yn(e), Yn(t))
}
const La = Symbol('menuContextKey'),
  ja = e => {
    ve(La, e)
  },
  ze = () => Se(La),
  Wa = Symbol('ForceRenderKey'),
  Vm = e => {
    ve(Wa, e)
  },
  Va = () => Se(Wa, !1),
  Ka = Symbol('menuFirstLevelContextKey'),
  Ga = e => {
    ve(Ka, e)
  },
  Km = () => Se(Ka, !0),
  gn = U({
    compatConfig: { MODE: 3 },
    name: 'MenuContextProvider',
    inheritAttrs: !1,
    props: {
      mode: { type: String, default: void 0 },
      overflowDisabled: { type: Boolean, default: void 0 }
    },
    setup(e, t) {
      let { slots: n } = t
      const o = ze(),
        r = f({}, o)
      return (
        e.mode !== void 0 && (r.mode = Xn(e, 'mode')),
        e.overflowDisabled !== void 0 &&
          (r.overflowDisabled = Xn(e, 'overflowDisabled')),
        ja(r),
        () => {
          var i
          return (i = n.default) === null || i === void 0 ? void 0 : i.call(n)
        }
      )
    }
  }),
  Gm = ja,
  Um = Symbol('siderCollapsed'),
  Jt = '$$__vc-menu-more__key',
  Ua = Symbol('KeyPathContext'),
  jo = () =>
    Se(Ua, {
      parentEventKeys: O(() => []),
      parentKeys: O(() => []),
      parentInfo: {}
    }),
  Xm = (e, t, n) => {
    const { parentEventKeys: o, parentKeys: r } = jo(),
      i = O(() => [...o.value, e]),
      a = O(() => [...r.value, t])
    return ve(Ua, { parentEventKeys: i, parentKeys: a, parentInfo: n }), a
  },
  Xa = Symbol('measure'),
  si = U({
    compatConfig: { MODE: 3 },
    setup(e, t) {
      let { slots: n } = t
      return (
        ve(Xa, !0),
        () => {
          var o
          return (o = n.default) === null || o === void 0 ? void 0 : o.call(n)
        }
      )
    }
  }),
  Wo = () => Se(Xa, !1),
  Ym = Xm
function Ya(e) {
  const { mode: t, rtl: n, inlineIndent: o } = ze()
  return O(() =>
    t.value !== 'inline'
      ? null
      : n.value
      ? { paddingRight: `${e.value * o.value}px` }
      : { paddingLeft: `${e.value * o.value}px` }
  )
}
let qm = 0
const km = () => ({
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
    originItemValue: ge()
  }),
  Lt = U({
    compatConfig: { MODE: 3 },
    name: 'AMenuItem',
    inheritAttrs: !1,
    props: km(),
    slots: Object,
    setup(e, t) {
      let { slots: n, emit: o, attrs: r } = t
      const i = Me(),
        a = Wo(),
        l = typeof i.vnode.key == 'symbol' ? String(i.vnode.key) : i.vnode.key
      ht(
        typeof i.vnode.key != 'symbol',
        'MenuItem',
        `MenuItem \`:key="${String(l)}"\` not support Symbol type`
      )
      const s = `menu_item_${++qm}_$$_${l}`,
        { parentEventKeys: d, parentKeys: c } = jo(),
        {
          prefixCls: u,
          activeKeys: p,
          disabled: m,
          changeActiveKeys: v,
          rtl: h,
          inlineCollapsed: C,
          siderCollapsed: b,
          onItemClick: y,
          selectedKeys: w,
          registerMenuInfo: _,
          unRegisterMenuInfo: P
        } = ze(),
        S = Km(),
        $ = B(!1),
        A = O(() => [...c.value, l])
      _(s, {
        eventKey: s,
        key: l,
        parentEventKeys: d,
        parentKeys: c,
        isLeaf: !0
      }),
        me(() => {
          P(s)
        }),
        J(
          p,
          () => {
            $.value = !!p.value.find(F => F === l)
          },
          { immediate: !0 }
        )
      const T = O(() => m.value || e.disabled),
        D = O(() => w.value.includes(l)),
        V = O(() => {
          const F = `${u.value}-item`
          return {
            [`${F}`]: !0,
            [`${F}-danger`]: e.danger,
            [`${F}-active`]: $.value,
            [`${F}-selected`]: D.value,
            [`${F}-disabled`]: T.value
          }
        }),
        X = F => ({
          key: l,
          eventKey: s,
          keyPath: A.value,
          eventKeyPath: [...d.value, s],
          domEvent: F,
          item: f(f({}, e), r)
        }),
        q = F => {
          if (T.value) return
          const k = X(F)
          o('click', F), y(k)
        },
        x = F => {
          T.value || (v(A.value), o('mouseenter', F))
        },
        N = F => {
          T.value || (v([]), o('mouseleave', F))
        },
        j = F => {
          if ((o('keydown', F), F.which === ro.ENTER)) {
            const k = X(F)
            o('click', F), y(k)
          }
        },
        W = F => {
          v(A.value), o('focus', F)
        },
        R = (F, k) => {
          const Z = g('span', { class: `${u.value}-title-content` }, [k])
          return (!F || (yo(k) && k.type === 'span')) &&
            k &&
            C.value &&
            S &&
            typeof k == 'string'
            ? g('div', { class: `${u.value}-inline-collapsed-noicon` }, [
                k.charAt(0)
              ])
            : Z
        },
        H = Ya(O(() => A.value.length))
      return () => {
        var F, k, Z, de, le
        if (a) return null
        const se =
            (F = e.title) !== null && F !== void 0
              ? F
              : (k = n.title) === null || k === void 0
              ? void 0
              : k.call(n),
          M = et((Z = n.default) === null || Z === void 0 ? void 0 : Z.call(n)),
          K = M.length
        let Q = se
        typeof se > 'u' ? (Q = S && K ? M : '') : se === !1 && (Q = '')
        const re = { title: Q }
        !b.value && !C.value && ((re.title = null), (re.open = !1))
        const ie = {}
        e.role === 'option' && (ie['aria-selected'] = D.value)
        const te =
          (de = e.icon) !== null && de !== void 0
            ? de
            : (le = n.icon) === null || le === void 0
            ? void 0
            : le.call(n, e)
        return g(
          rm,
          E(
            E({}, re),
            {},
            {
              placement: h.value ? 'left' : 'right',
              overlayClassName: `${u.value}-inline-collapsed-tooltip`
            }
          ),
          {
            default: () => [
              g(
                At.Item,
                E(
                  E(
                    E({ component: 'li' }, r),
                    {},
                    {
                      id: e.id,
                      style: f(f({}, r.style || {}), H.value),
                      class: [
                        V.value,
                        {
                          [`${r.class}`]: !!r.class,
                          [`${u.value}-item-only-child`]: (te ? K + 1 : K) === 1
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
                    onMouseenter: x,
                    onMouseleave: N,
                    onClick: q,
                    onKeydown: j,
                    onFocus: W,
                    title: typeof se == 'string' ? se : void 0
                  }
                ),
                {
                  default: () => [
                    Oe(
                      typeof te == 'function' ? te(e.originItemValue) : te,
                      { class: `${u.value}-item-icon` },
                      !1
                    ),
                    R(te, M)
                  ]
                }
              )
            ]
          }
        )
      }
    }
  }),
  He = { adjustX: 1, adjustY: 1 },
  Zm = {
    topLeft: { points: ['bl', 'tl'], overflow: He, offset: [0, -7] },
    bottomLeft: { points: ['tl', 'bl'], overflow: He, offset: [0, 7] },
    leftTop: { points: ['tr', 'tl'], overflow: He, offset: [-4, 0] },
    rightTop: { points: ['tl', 'tr'], overflow: He, offset: [4, 0] }
  },
  Qm = {
    topLeft: { points: ['bl', 'tl'], overflow: He, offset: [0, -7] },
    bottomLeft: { points: ['tl', 'bl'], overflow: He, offset: [0, 7] },
    rightTop: { points: ['tr', 'tl'], overflow: He, offset: [-4, 0] },
    leftTop: { points: ['tl', 'tr'], overflow: He, offset: [4, 0] }
  },
  Jm = {
    horizontal: 'bottomLeft',
    vertical: 'rightTop',
    'vertical-left': 'rightTop',
    'vertical-right': 'leftTop'
  },
  ui = U({
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
      const r = B(!1),
        {
          getPopupContainer: i,
          rtl: a,
          subMenuOpenDelay: l,
          subMenuCloseDelay: s,
          builtinPlacements: d,
          triggerSubMenuAction: c,
          forceSubMenuRender: u,
          motion: p,
          defaultMotions: m,
          rootClassName: v
        } = ze(),
        h = Va(),
        C = O(() => (a.value ? f(f({}, Qm), d.value) : f(f({}, Zm), d.value))),
        b = O(() => Jm[e.mode]),
        y = B()
      J(
        () => e.visible,
        P => {
          ce.cancel(y.value),
            (y.value = ce(() => {
              r.value = P
            }))
        },
        { immediate: !0 }
      ),
        me(() => {
          ce.cancel(y.value)
        })
      const w = P => {
          o('visibleChange', P)
        },
        _ = O(() => {
          var P, S
          const $ =
              p.value ||
              ((P = m.value) === null || P === void 0 ? void 0 : P[e.mode]) ||
              ((S = m.value) === null || S === void 0 ? void 0 : S.other),
            A = typeof $ == 'function' ? $() : $
          return A ? Cn(A.name, { css: !0 }) : void 0
        })
      return () => {
        const {
          prefixCls: P,
          popupClassName: S,
          mode: $,
          popupOffset: A,
          disabled: z
        } = e
        return g(
          Ao,
          {
            prefixCls: P,
            popupClassName: ne(
              `${P}-popup`,
              { [`${P}-rtl`]: a.value },
              S,
              v.value
            ),
            stretch: $ === 'horizontal' ? 'minWidth' : null,
            getPopupContainer: i.value,
            builtinPlacements: C.value,
            popupPlacement: b.value,
            popupVisible: r.value,
            popupAlign: A && { offset: A },
            action: z ? [] : [c.value],
            mouseEnterDelay: l.value,
            mouseLeaveDelay: s.value,
            onPopupVisibleChange: w,
            forceRender: h || u.value,
            popupAnimation: _.value
          },
          { popup: n.popup, default: n.default }
        )
      }
    }
  }),
  qa = (e, t) => {
    let { slots: n, attrs: o } = t
    var r
    const { prefixCls: i, mode: a } = ze()
    return g(
      'ul',
      E(
        E({}, o),
        {},
        {
          class: ne(
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
qa.displayName = 'SubMenuList'
const ka = qa,
  ev = U({
    compatConfig: { MODE: 3 },
    name: 'InlineSubMenuList',
    inheritAttrs: !1,
    props: { id: String, open: Boolean, keyPath: Array },
    setup(e, t) {
      let { slots: n } = t
      const o = O(() => 'inline'),
        { motion: r, mode: i, defaultMotions: a } = ze(),
        l = O(() => i.value === o.value),
        s = L(!l.value),
        d = O(() => (l.value ? e.open : !1))
      J(
        i,
        () => {
          l.value && (s.value = !1)
        },
        { flush: 'post' }
      )
      const c = O(() => {
        var u, p
        const m =
            r.value ||
            ((u = a.value) === null || u === void 0 ? void 0 : u[o.value]) ||
            ((p = a.value) === null || p === void 0 ? void 0 : p.other),
          v = typeof m == 'function' ? m() : m
        return f(f({}, v), { appear: e.keyPath.length <= 1 })
      })
      return () => {
        var u
        return s.value
          ? null
          : g(
              gn,
              { mode: o.value },
              {
                default: () => [
                  g(We, c.value, {
                    default: () => [
                      jt(
                        g(
                          ka,
                          { id: e.id },
                          {
                            default: () => [
                              (u = n.default) === null || u === void 0
                                ? void 0
                                : u.call(n)
                            ]
                          }
                        ),
                        [[$n, d.value]]
                      )
                    ]
                  })
                ]
              }
            )
      }
    }
  })
let ci = 0
const tv = () => ({
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
    originItemValue: ge()
  }),
  $t = U({
    compatConfig: { MODE: 3 },
    name: 'ASubMenu',
    inheritAttrs: !1,
    props: tv(),
    slots: Object,
    setup(e, t) {
      let { slots: n, attrs: o, emit: r } = t
      var i, a
      Ga(!1)
      const l = Wo(),
        s = Me(),
        d = typeof s.vnode.key == 'symbol' ? String(s.vnode.key) : s.vnode.key
      ht(
        typeof s.vnode.key != 'symbol',
        'SubMenu',
        `SubMenu \`:key="${String(d)}"\` not support Symbol type`
      )
      const c = er(d) ? d : `sub_menu_${++ci}_$$_not_set_key`,
        u =
          (i = e.eventKey) !== null && i !== void 0
            ? i
            : er(d)
            ? `sub_menu_${++ci}_$$_${d}`
            : c,
        { parentEventKeys: p, parentInfo: m, parentKeys: v } = jo(),
        h = O(() => [...v.value, c]),
        C = B([]),
        b = {
          eventKey: u,
          key: c,
          parentEventKeys: p,
          childrenEventKeys: C,
          parentKeys: v
        }
      ;(a = m.childrenEventKeys) === null || a === void 0 || a.value.push(u),
        me(() => {
          var ee
          m.childrenEventKeys &&
            (m.childrenEventKeys.value =
              (ee = m.childrenEventKeys) === null || ee === void 0
                ? void 0
                : ee.value.filter(fe => fe != u))
        }),
        Ym(u, c, b)
      const {
          prefixCls: y,
          activeKeys: w,
          disabled: _,
          changeActiveKeys: P,
          mode: S,
          inlineCollapsed: $,
          openKeys: A,
          overflowDisabled: z,
          onOpenChange: T,
          registerMenuInfo: D,
          unRegisterMenuInfo: V,
          selectedSubMenuKeys: X,
          expandIcon: q,
          theme: x
        } = ze(),
        N = d != null,
        j = !l && (Va() || !N)
      Vm(j),
        ((l && N) || (!l && !N) || j) &&
          (D(u, b),
          me(() => {
            V(u)
          }))
      const W = O(() => `${y.value}-submenu`),
        R = O(() => _.value || e.disabled),
        H = B(),
        F = B(),
        k = O(() => A.value.includes(c)),
        Z = O(() => !z.value && k.value),
        de = O(() => X.value.includes(c)),
        le = B(!1)
      J(
        w,
        () => {
          le.value = !!w.value.find(ee => ee === c)
        },
        { immediate: !0 }
      )
      const se = ee => {
          R.value ||
            (r('titleClick', ee, c), S.value === 'inline' && T(c, !k.value))
        },
        M = ee => {
          R.value || (P(h.value), r('mouseenter', ee))
        },
        K = ee => {
          R.value || (P([]), r('mouseleave', ee))
        },
        Q = Ya(O(() => h.value.length)),
        re = ee => {
          S.value !== 'inline' && T(c, ee)
        },
        ie = () => {
          P(h.value)
        },
        te = u && `${u}-popup`,
        he = O(() =>
          ne(y.value, `${y.value}-${e.theme || x.value}`, e.popupClassName)
        ),
        ue = (ee, fe) => {
          if (!fe)
            return $.value && !v.value.length && ee && typeof ee == 'string'
              ? g('div', { class: `${y.value}-inline-collapsed-noicon` }, [
                  ee.charAt(0)
                ])
              : g('span', { class: `${y.value}-title-content` }, [ee])
          const Ne = yo(ee) && ee.type === 'span'
          return g(je, null, [
            Oe(
              typeof fe == 'function' ? fe(e.originItemValue) : fe,
              { class: `${y.value}-item-icon` },
              !1
            ),
            Ne ? ee : g('span', { class: `${y.value}-title-content` }, [ee])
          ])
        },
        be = O(() =>
          S.value !== 'inline' && h.value.length > 1 ? 'vertical' : S.value
        ),
        Ve = O(() => (S.value === 'horizontal' ? 'vertical' : S.value)),
        ml = O(() => (be.value === 'horizontal' ? 'vertical' : be.value)),
        Xo = () => {
          var ee, fe
          const Ne = W.value,
            In =
              (ee = e.icon) !== null && ee !== void 0
                ? ee
                : (fe = n.icon) === null || fe === void 0
                ? void 0
                : fe.call(n, e),
            Yo = e.expandIcon || n.expandIcon || q.value,
            En = ue(bo(n, e, 'title'), In)
          return g(
            'div',
            {
              style: Q.value,
              class: `${Ne}-title`,
              tabindex: R.value ? null : -1,
              ref: H,
              title: typeof En == 'string' ? En : null,
              'data-menu-id': c,
              'aria-expanded': Z.value,
              'aria-haspopup': !0,
              'aria-controls': te,
              'aria-disabled': R.value,
              onClick: se,
              onFocus: ie
            },
            [
              En,
              S.value !== 'horizontal' && Yo
                ? Yo(f(f({}, e), { isOpen: Z.value }))
                : g('i', { class: `${Ne}-arrow` }, null)
            ]
          )
        }
      return () => {
        var ee
        if (l)
          return N
            ? (ee = n.default) === null || ee === void 0
              ? void 0
              : ee.call(n)
            : null
        const fe = W.value
        let Ne = () => null
        if (!z.value && S.value !== 'inline') {
          const In = S.value === 'horizontal' ? [0, 8] : [10, 0]
          Ne = () =>
            g(
              ui,
              {
                mode: be.value,
                prefixCls: fe,
                visible: !e.internalPopupClose && Z.value,
                popupClassName: he.value,
                popupOffset: e.popupOffset || In,
                disabled: R.value,
                onVisibleChange: re
              },
              {
                default: () => [Xo()],
                popup: () =>
                  g(
                    gn,
                    { mode: ml.value },
                    {
                      default: () => [
                        g(ka, { id: te, ref: F }, { default: n.default })
                      ]
                    }
                  )
              }
            )
        } else Ne = () => g(ui, null, { default: Xo })
        return g(
          gn,
          { mode: Ve.value },
          {
            default: () => [
              g(
                At.Item,
                E(
                  E({ component: 'li' }, o),
                  {},
                  {
                    role: 'none',
                    class: ne(fe, `${fe}-${S.value}`, o.class, {
                      [`${fe}-open`]: Z.value,
                      [`${fe}-active`]: le.value,
                      [`${fe}-selected`]: de.value,
                      [`${fe}-disabled`]: R.value
                    }),
                    onMouseenter: M,
                    onMouseleave: K,
                    'data-submenu-id': c
                  }
                ),
                {
                  default: () =>
                    g(je, null, [
                      Ne(),
                      !z.value &&
                        g(
                          ev,
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
function Za(e, t) {
  return e.classList
    ? e.classList.contains(t)
    : ` ${e.className} `.indexOf(` ${t} `) > -1
}
function di(e, t) {
  e.classList
    ? e.classList.add(t)
    : Za(e, t) || (e.className = `${e.className} ${t}`)
}
function fi(e, t) {
  if (e.classList) e.classList.remove(t)
  else if (Za(e, t)) {
    const n = e.className
    e.className = ` ${n} `.replace(` ${t} `, ' ')
  }
}
const nv = function() {
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
        ;(n.style.height = '0px'), (n.style.opacity = '0'), di(n, e)
      },
      onEnter: n => {
        Ie(() => {
          ;(n.style.height = `${n.scrollHeight}px`), (n.style.opacity = '1')
        })
      },
      onAfterEnter: n => {
        n && (fi(n, e), (n.style.height = null), (n.style.opacity = null))
      },
      onBeforeLeave: n => {
        di(n, e),
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
          (fi(n, e),
          n.style && ((n.style.height = null), (n.style.opacity = null)))
      }
    }
  },
  ov = nv,
  rv = () => ({ title: I.any, originItemValue: ge() }),
  hn = U({
    compatConfig: { MODE: 3 },
    name: 'AMenuItemGroup',
    inheritAttrs: !1,
    props: rv(),
    slots: Object,
    setup(e, t) {
      let { slots: n, attrs: o } = t
      const { prefixCls: r } = ze(),
        i = O(() => `${r.value}-item-group`),
        a = Wo()
      return () => {
        var l, s
        return a
          ? (l = n.default) === null || l === void 0
            ? void 0
            : l.call(n)
          : g(
              'li',
              E(
                E({}, o),
                {},
                { onClick: d => d.stopPropagation(), class: i.value }
              ),
              [
                g(
                  'div',
                  {
                    title: typeof e.title == 'string' ? e.title : void 0,
                    class: `${i.value}-title`
                  },
                  [bo(n, e, 'title')]
                ),
                g('ul', { class: `${i.value}-list` }, [
                  (s = n.default) === null || s === void 0 ? void 0 : s.call(n)
                ])
              ]
            )
      }
    }
  }),
  iv = () => ({ prefixCls: String, dashed: Boolean }),
  bn = U({
    compatConfig: { MODE: 3 },
    name: 'AMenuDivider',
    props: iv(),
    setup(e) {
      const { prefixCls: t } = ze(),
        n = O(() => ({
          [`${t.value}-item-divider`]: !0,
          [`${t.value}-item-divider-dashed`]: !!e.dashed
        }))
      return () => g('li', { class: n.value }, null)
    }
  })
var av =
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
function fo(e, t, n) {
  return (e || [])
    .map((o, r) => {
      if (o && typeof o == 'object') {
        const i = o,
          { label: a, children: l, key: s, type: d } = i,
          c = av(i, ['label', 'children', 'key', 'type']),
          u = s ?? `tmp-${r}`,
          p = n ? n.parentKeys.slice() : [],
          m = [],
          v = {
            eventKey: u,
            key: u,
            parentEventKeys: L(p),
            parentKeys: L(p),
            childrenEventKeys: L(m),
            isLeaf: !1
          }
        if (l || d === 'group') {
          if (d === 'group') {
            const C = fo(l, t, n)
            return g(
              hn,
              E(E({ key: u }, c), {}, { title: a, originItemValue: o }),
              { default: () => [C] }
            )
          }
          t.set(u, v), n && n.childrenEventKeys.push(u)
          const h = fo(l, t, {
            childrenEventKeys: m,
            parentKeys: [].concat(p, u)
          })
          return g(
            $t,
            E(E({ key: u }, c), {}, { title: a, originItemValue: o }),
            { default: () => [h] }
          )
        }
        return d === 'divider'
          ? g(bn, E({ key: u }, c), null)
          : ((v.isLeaf = !0),
            t.set(u, v),
            g(Lt, E(E({ key: u }, c), {}, { originItemValue: o }), {
              default: () => [a]
            }))
      }
      return null
    })
    .filter(o => o)
}
function lv(e) {
  const t = B([]),
    n = B(!1),
    o = B(new Map())
  return (
    J(
      () => e.items,
      () => {
        const r = new Map()
        ;(n.value = !1),
          e.items
            ? ((n.value = !0), (t.value = fo(e.items, r)))
            : (t.value = void 0),
          (o.value = r)
      },
      { immediate: !0, deep: !0 }
    ),
    { itemsNodes: t, store: o, hasItmes: n }
  )
}
const sv = e => {
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
  uv = sv,
  cv = e => {
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
  dv = cv,
  pi = e => f({}, Hl(e)),
  fv = (e, t) => {
    const {
      componentCls: n,
      colorItemText: o,
      colorItemTextSelected: r,
      colorGroupTitle: i,
      colorItemBg: a,
      colorSubItemBg: l,
      colorItemBgSelected: s,
      colorActiveBarHeight: d,
      colorActiveBarWidth: c,
      colorActiveBarBorderSize: u,
      motionDurationSlow: p,
      motionEaseInOut: m,
      motionEaseOut: v,
      menuItemPaddingInline: h,
      motionDurationMid: C,
      colorItemTextHover: b,
      lineType: y,
      colorSplit: w,
      colorItemTextDisabled: _,
      colorDangerItemText: P,
      colorDangerItemTextHover: S,
      colorDangerItemTextSelected: $,
      colorDangerItemBgActive: A,
      colorDangerItemBgSelected: z,
      colorItemBgHover: T,
      menuSubMenuBg: D,
      colorItemTextSelectedHorizontal: V,
      colorItemBgSelectedHorizontal: X
    } = e
    return {
      [`${n}-${t}`]: {
        color: o,
        background: a,
        [`&${n}-root:focus-visible`]: f({}, pi(e)),
        [`${n}-item-group-title`]: { color: i },
        [`${n}-submenu-selected`]: { [`> ${n}-submenu-title`]: { color: r } },
        [`${n}-item-disabled, ${n}-submenu-disabled`]: {
          color: `${_} !important`
        },
        [`${n}-item:hover, ${n}-submenu-title:hover`]: {
          [`&:not(${n}-item-selected):not(${n}-submenu-selected)`]: { color: b }
        },
        [`&:not(${n}-horizontal)`]: {
          [`${n}-item:not(${n}-item-selected)`]: {
            '&:hover': { backgroundColor: T },
            '&:active': { backgroundColor: s }
          },
          [`${n}-submenu-title`]: {
            '&:hover': { backgroundColor: T },
            '&:active': { backgroundColor: s }
          }
        },
        [`${n}-item-danger`]: {
          color: P,
          [`&${n}-item:hover`]: {
            [`&:not(${n}-item-selected):not(${n}-submenu-selected)`]: {
              color: S
            }
          },
          [`&${n}-item:active`]: { background: A }
        },
        [`${n}-item a`]: { '&, &:hover': { color: 'inherit' } },
        [`${n}-item-selected`]: {
          color: r,
          [`&${n}-item-danger`]: { color: $ },
          'a, a:hover': { color: 'inherit' }
        },
        [`& ${n}-item-selected`]: {
          backgroundColor: s,
          [`&${n}-item-danger`]: { backgroundColor: z }
        },
        [`${n}-item, ${n}-submenu-title`]: {
          [`&:not(${n}-item-disabled):focus-visible`]: f({}, pi(e))
        },
        [`&${n}-submenu > ${n}`]: { backgroundColor: D },
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
                borderBottom: `${d}px solid transparent`,
                transition: `border-color ${p} ${m}`,
                content: '""'
              },
              '&:hover, &-active, &-open': {
                '&::after': { borderBottomWidth: d, borderBottomColor: V }
              },
              '&-selected': {
                color: V,
                backgroundColor: X,
                '&::after': { borderBottomWidth: d, borderBottomColor: V }
              }
            }
          }
        ),
        [`&${n}-root`]: {
          [`&${n}-inline, &${n}-vertical`]: {
            borderInlineEnd: `${u}px ${y} ${w}`
          }
        },
        [`&${n}-inline`]: {
          [`${n}-sub${n}-inline`]: { background: l },
          [`${n}-item, ${n}-submenu-title`]:
            u && c ? { width: `calc(100% + ${u}px)` } : {},
          [`${n}-item`]: {
            position: 'relative',
            '&::after': {
              position: 'absolute',
              insetBlock: 0,
              insetInlineEnd: 0,
              borderInlineEnd: `${c}px solid ${r}`,
              transform: 'scaleY(0.0001)',
              opacity: 0,
              transition: [`transform ${C} ${v}`, `opacity ${C} ${v}`].join(
                ','
              ),
              content: '""'
            },
            [`&${n}-item-danger`]: { '&::after': { borderInlineEndColor: $ } }
          },
          [`${n}-selected, ${n}-item-selected`]: {
            '&::after': {
              transform: 'scaleY(1)',
              opacity: 1,
              transition: [`transform ${C} ${m}`, `opacity ${C} ${m}`].join(',')
            }
          }
        }
      }
    }
  },
  mi = fv,
  vi = e => {
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
  pv = e => {
    const {
        componentCls: t,
        iconCls: n,
        menuItemHeight: o,
        colorTextLightSolid: r,
        dropdownWidth: i,
        controlHeightLG: a,
        motionDurationMid: l,
        motionEaseOut: s,
        paddingXL: d,
        fontSizeSM: c,
        fontSizeLG: u,
        motionDurationSlow: p,
        paddingXS: m,
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
            vi(e)
          )
        },
        [`${t}-submenu-popup`]: {
          [`${t}-vertical`]: f(f({}, vi(e)), { boxShadow: v })
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
                `border-color ${p}`,
                `background ${p}`,
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
            [`& ${t}-item-group-title`]: { paddingInlineStart: d }
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
            paddingInline: `calc(50% - ${c}px)`,
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
          [`${t}-item-group-title`]: f(f({}, Ll), { paddingInline: m })
        }
      }
    ]
  },
  mv = pv,
  gi = e => {
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
        [`${t}-item-icon`]: f({}, jl()),
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
  hi = e => {
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
  vv = e => {
    const {
      antCls: t,
      componentCls: n,
      fontSize: o,
      motionDurationSlow: r,
      motionDurationMid: i,
      motionEaseInOut: a,
      lineHeight: l,
      paddingXS: s,
      padding: d,
      colorSplit: c,
      lineWidth: u,
      zIndexPopup: p,
      borderRadiusLG: m,
      radiusSubMenuItem: v,
      menuArrowSize: h,
      menuArrowOffset: C,
      lineType: b,
      menuPanelMaskInset: y
    } = e
    return [
      {
        '': { [`${n}`]: f(f({}, an()), { '&-hidden': { display: 'none' } }) },
        [`${n}-submenu-hidden`]: { display: 'none' }
      },
      {
        [n]: f(
          f(
            f(
              f(
                f(f(f({}, Vt(e)), an()), {
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
                    padding: `${s}px ${d}px`,
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
                    borderColor: c,
                    borderStyle: b,
                    borderWidth: 0,
                    borderTopWidth: u,
                    marginBlock: u,
                    padding: 0,
                    '&-dashed': { borderStyle: 'dashed' }
                  }
                }),
                gi(e)
              ),
              {
                [`${n}-item-group`]: {
                  [`${n}-item-group-list`]: {
                    margin: 0,
                    padding: 0,
                    [`${n}-item, ${n}-submenu-title`]: {
                      paddingInline: `${o * 2}px ${d}px`
                    }
                  }
                },
                '&-submenu': {
                  '&-popup': {
                    position: 'absolute',
                    zIndex: p,
                    background: 'transparent',
                    borderRadius: m,
                    boxShadow: 'none',
                    transformOrigin: '0 0',
                    '&::before': {
                      position: 'absolute',
                      inset: `${y}px 0 0`,
                      zIndex: -1,
                      width: '100%',
                      height: '100%',
                      opacity: 0,
                      content: '""'
                    }
                  },
                  '&-placement-rightTop::before': {
                    top: 0,
                    insetInlineStart: y
                  },
                  [`> ${n}`]: f(f(f({ borderRadius: m }, gi(e)), hi(e)), {
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
            hi(e)
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
  gv = (e, t) =>
    tt(
      'Menu',
      (o, r) => {
        let { overrideComponentToken: i } = r
        if ((t == null ? void 0 : t.value) === !1) return []
        const {
            colorBgElevated: a,
            colorPrimary: l,
            colorError: s,
            colorErrorHover: d,
            colorTextLightSolid: c
          } = o,
          { controlHeightLG: u, fontSize: p } = o,
          m = (p / 7) * 5,
          v = xe(o, {
            menuItemHeight: u,
            menuItemPaddingInline: o.margin,
            menuArrowSize: m,
            menuHorizontalHeight: u * 1.15,
            menuArrowOffset: `${m * 0.25}px`,
            menuPanelMaskInset: -7,
            menuSubMenuBg: a
          }),
          h = new ko(c).setAlpha(0.65).toRgbString(),
          C = xe(
            v,
            {
              colorItemText: h,
              colorItemTextHover: c,
              colorGroupTitle: h,
              colorItemTextSelected: c,
              colorItemBg: '#001529',
              colorSubItemBg: '#000c17',
              colorItemBgActive: 'transparent',
              colorItemBgSelected: l,
              colorActiveBarWidth: 0,
              colorActiveBarHeight: 0,
              colorActiveBarBorderSize: 0,
              colorItemTextDisabled: new ko(c).setAlpha(0.25).toRgbString(),
              colorDangerItemText: s,
              colorDangerItemTextHover: d,
              colorDangerItemTextSelected: c,
              colorDangerItemBgActive: s,
              colorDangerItemBgSelected: s,
              menuSubMenuBg: '#001529',
              colorItemTextSelectedHorizontal: c,
              colorItemBgSelectedHorizontal: l
            },
            f({}, i)
          )
        return [
          vv(v),
          uv(v),
          mv(v),
          mi(v, 'light'),
          mi(C, 'dark'),
          dv(v),
          Dp(v),
          Yr(v, 'slide-up'),
          Yr(v, 'slide-down'),
          zo(v, 'zoom-big')
        ]
      },
      o => {
        const {
          colorPrimary: r,
          colorError: i,
          colorTextDisabled: a,
          colorErrorBg: l,
          colorText: s,
          colorTextDescription: d,
          colorBgContainer: c,
          colorFillAlter: u,
          colorFillContent: p,
          lineWidth: m,
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
          colorGroupTitle: d,
          colorItemTextSelected: r,
          colorItemTextSelectedHorizontal: r,
          colorItemBg: c,
          colorItemBgHover: C,
          colorItemBgActive: p,
          colorSubItemBg: u,
          colorItemBgSelected: h,
          colorItemBgSelectedHorizontal: 'transparent',
          colorActiveBarWidth: 0,
          colorActiveBarHeight: v,
          colorActiveBarBorderSize: m,
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
  hv = () => ({
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
  bi = [],
  Qe = U({
    compatConfig: { MODE: 3 },
    name: 'AMenu',
    inheritAttrs: !1,
    props: hv(),
    slots: Object,
    setup(e, t) {
      let { slots: n, emit: o, attrs: r } = t
      const { direction: i, getPrefixCls: a } = Re('menu', e),
        l = Ha(),
        s = O(() => {
          var M
          return a(
            'menu',
            e.prefixCls ||
              ((M = l == null ? void 0 : l.prefixCls) === null || M === void 0
                ? void 0
                : M.value)
          )
        }),
        [d, c] = gv(
          s,
          O(() => !l)
        ),
        u = B(new Map()),
        p = Se(Um, L(void 0)),
        m = O(() => (p.value !== void 0 ? p.value : e.inlineCollapsed)),
        { itemsNodes: v } = lv(e),
        h = B(!1)
      Ee(() => {
        h.value = !0
      }),
        Te(() => {
          ht(
            !(e.inlineCollapsed === !0 && e.mode !== 'inline'),
            'Menu',
            '`inlineCollapsed` should only be used when `mode` is inline.'
          ),
            ht(
              !(p.value !== void 0 && e.inlineCollapsed === !0),
              'Menu',
              '`inlineCollapsed` not control Menu under Sider. Should set `collapsed` on Sider instead.'
            )
        })
      const C = L([]),
        b = L([]),
        y = L({})
      J(
        u,
        () => {
          const M = {}
          for (const K of u.value.values()) M[K.key] = K
          y.value = M
        },
        { flush: 'post' }
      ),
        Te(() => {
          if (e.activeKey !== void 0) {
            let M = []
            const K = e.activeKey ? y.value[e.activeKey] : void 0
            K && e.activeKey !== void 0
              ? (M = Hn([].concat(st(K.parentKeys), e.activeKey)))
              : (M = []),
              It(C.value, M) || (C.value = M)
          }
        }),
        J(
          () => e.selectedKeys,
          M => {
            M && (b.value = M.slice())
          },
          { immediate: !0, deep: !0 }
        )
      const w = L([])
      J(
        [y, b],
        () => {
          let M = []
          b.value.forEach(K => {
            const Q = y.value[K]
            Q && (M = M.concat(st(Q.parentKeys)))
          }),
            (M = Hn(M)),
            It(w.value, M) || (w.value = M)
        },
        { immediate: !0 }
      )
      const _ = M => {
          if (e.selectable) {
            const { key: K } = M,
              Q = b.value.includes(K)
            let re
            e.multiple
              ? Q
                ? (re = b.value.filter(te => te !== K))
                : (re = [...b.value, K])
              : (re = [K])
            const ie = f(f({}, M), { selectedKeys: re })
            It(re, b.value) ||
              (e.selectedKeys === void 0 && (b.value = re),
              o('update:selectedKeys', re),
              Q && e.multiple ? o('deselect', ie) : o('select', ie))
          }
          T.value !== 'inline' && !e.multiple && P.value.length && X(bi)
        },
        P = L([])
      J(
        () => e.openKeys,
        function() {
          let M =
            arguments.length > 0 && arguments[0] !== void 0
              ? arguments[0]
              : P.value
          It(P.value, M) || (P.value = M.slice())
        },
        { immediate: !0, deep: !0 }
      )
      let S
      const $ = M => {
          clearTimeout(S),
            (S = setTimeout(() => {
              e.activeKey === void 0 && (C.value = M),
                o('update:activeKey', M[M.length - 1])
            }))
        },
        A = O(() => !!e.disabled),
        z = O(() => i.value === 'rtl'),
        T = L('vertical'),
        D = B(!1)
      Te(() => {
        var M
        ;(e.mode === 'inline' || e.mode === 'vertical') && m.value
          ? ((T.value = 'vertical'), (D.value = m.value))
          : ((T.value = e.mode), (D.value = !1)),
          !((M = l == null ? void 0 : l.mode) === null || M === void 0) &&
            M.value &&
            (T.value = l.mode.value)
      })
      const V = O(() => T.value === 'inline'),
        X = M => {
          ;(P.value = M), o('update:openKeys', M), o('openChange', M)
        },
        q = L(P.value),
        x = B(!1)
      J(
        P,
        () => {
          V.value && (q.value = P.value)
        },
        { immediate: !0 }
      ),
        J(
          V,
          () => {
            if (!x.value) {
              x.value = !0
              return
            }
            V.value ? (P.value = q.value) : X(bi)
          },
          { immediate: !0 }
        )
      const N = O(() => ({
          [`${s.value}`]: !0,
          [`${s.value}-root`]: !0,
          [`${s.value}-${T.value}`]: !0,
          [`${s.value}-inline-collapsed`]: D.value,
          [`${s.value}-rtl`]: z.value,
          [`${s.value}-${e.theme}`]: !0
        })),
        j = O(() => a()),
        W = O(() => ({
          horizontal: { name: `${j.value}-slide-up` },
          inline: ov(`${j.value}-motion-collapse`),
          other: { name: `${j.value}-zoom-big` }
        }))
      Ga(!0)
      const R = function() {
          let M =
            arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : []
          const K = [],
            Q = u.value
          return (
            M.forEach(re => {
              const { key: ie, childrenEventKeys: te } = Q.get(re)
              K.push(ie, ...R(st(te)))
            }),
            K
          )
        },
        H = M => {
          var K
          o('click', M),
            _(M),
            (K = l == null ? void 0 : l.onClick) === null ||
              K === void 0 ||
              K.call(l)
        },
        F = (M, K) => {
          var Q
          const re =
            ((Q = y.value[M]) === null || Q === void 0
              ? void 0
              : Q.childrenEventKeys) || []
          let ie = P.value.filter(te => te !== M)
          if (K) ie.push(M)
          else if (T.value !== 'inline') {
            const te = R(st(re))
            ie = Hn(ie.filter(he => !te.includes(he)))
          }
          It(P, ie) || X(ie)
        },
        k = (M, K) => {
          u.value.set(M, K), (u.value = new Map(u.value))
        },
        Z = M => {
          u.value.delete(M), (u.value = new Map(u.value))
        },
        de = L(0),
        le = O(() => {
          var M
          return e.expandIcon ||
            n.expandIcon ||
            (!(
              (M = l == null ? void 0 : l.expandIcon) === null || M === void 0
            ) &&
              M.value)
            ? K => {
                let Q = e.expandIcon || n.expandIcon
                return (
                  (Q = typeof Q == 'function' ? Q(K) : Q),
                  Oe(Q, { class: `${s.value}-submenu-expand-icon` }, !1)
                )
              }
            : null
        })
      Gm({
        prefixCls: s,
        activeKeys: C,
        openKeys: P,
        selectedKeys: b,
        changeActiveKeys: $,
        disabled: A,
        rtl: z,
        mode: T,
        inlineIndent: O(() => e.inlineIndent),
        subMenuCloseDelay: O(() => e.subMenuCloseDelay),
        subMenuOpenDelay: O(() => e.subMenuOpenDelay),
        builtinPlacements: O(() => e.builtinPlacements),
        triggerSubMenuAction: O(() => e.triggerSubMenuAction),
        getPopupContainer: O(() => e.getPopupContainer),
        inlineCollapsed: D,
        theme: O(() => e.theme),
        siderCollapsed: p,
        defaultMotions: O(() => (h.value ? W.value : null)),
        motion: O(() => (h.value ? e.motion : null)),
        overflowDisabled: B(void 0),
        onOpenChange: F,
        onItemClick: H,
        registerMenuInfo: k,
        unRegisterMenuInfo: Z,
        selectedSubMenuKeys: w,
        expandIcon: le,
        forceSubMenuRender: O(() => e.forceSubMenuRender),
        rootClassName: c
      })
      const se = () => {
        var M
        return (
          v.value ||
          et((M = n.default) === null || M === void 0 ? void 0 : M.call(n))
        )
      }
      return () => {
        var M
        const K = se(),
          Q =
            de.value >= K.length - 1 ||
            T.value !== 'horizontal' ||
            e.disabledOverflow,
          re = te =>
            T.value !== 'horizontal' || e.disabledOverflow
              ? te
              : te.map((he, ue) =>
                  g(
                    gn,
                    { key: he.key, overflowDisabled: ue > de.value },
                    { default: () => he }
                  )
                ),
          ie =
            ((M = n.overflowedIndicator) === null || M === void 0
              ? void 0
              : M.call(n)) || g(Lm, null, null)
        return d(
          g(
            At,
            E(
              E({}, r),
              {},
              {
                onMousedown: e.onMousedown,
                prefixCls: `${s.value}-overflow`,
                component: 'ul',
                itemComponent: Lt,
                class: [N.value, r.class, c.value],
                role: 'menu',
                id: e.id,
                data: re(K),
                renderRawItem: te => te,
                renderRawRest: te => {
                  const he = te.length,
                    ue = he ? K.slice(-he) : null
                  return g(je, null, [
                    g(
                      $t,
                      {
                        eventKey: Jt,
                        key: Jt,
                        title: ie,
                        disabled: Q,
                        internalPopupClose: he === 0
                      },
                      { default: () => ue }
                    ),
                    g(si, null, {
                      default: () => [
                        g(
                          $t,
                          {
                            eventKey: Jt,
                            key: Jt,
                            title: ie,
                            disabled: Q,
                            internalPopupClose: he === 0
                          },
                          { default: () => ue }
                        )
                      ]
                    })
                  ])
                },
                maxCount:
                  T.value !== 'horizontal' || e.disabledOverflow
                    ? At.INVALIDATE
                    : At.RESPONSIVE,
                ssr: 'full',
                'data-menu-list': !0,
                onVisibleChange: te => {
                  de.value = te
                }
              }
            ),
            {
              default: () => [
                g(
                  yl,
                  { to: 'body' },
                  {
                    default: () => [
                      g(
                        'div',
                        { style: { display: 'none' }, 'aria-hidden': !0 },
                        [g(si, null, { default: () => [re(se())] })]
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
Qe.install = function(e) {
  return (
    e.component(Qe.name, Qe),
    e.component(Lt.name, Lt),
    e.component($t.name, $t),
    e.component(bn.name, bn),
    e.component(hn.name, hn),
    e
  )
}
Qe.Item = Lt
Qe.Divider = bn
Qe.SubMenu = $t
Qe.ItemGroup = hn
const bv = e => ({
    '&::-moz-placeholder': { opacity: 1 },
    '&::placeholder': { color: e, userSelect: 'none' },
    '&:placeholder-shown': { textOverflow: 'ellipsis' }
  }),
  Vo = e => ({
    borderColor: e.inputBorderHoverColor,
    borderInlineEndWidth: e.lineWidth
  }),
  po = e => ({
    borderColor: e.inputBorderHoverColor,
    boxShadow: `0 0 0 ${e.controlOutlineWidth}px ${e.controlOutline}`,
    borderInlineEndWidth: e.lineWidth,
    outline: 0
  }),
  yv = e => ({
    color: e.colorTextDisabled,
    backgroundColor: e.colorBgContainerDisabled,
    borderColor: e.colorBorder,
    boxShadow: 'none',
    cursor: 'not-allowed',
    opacity: 1,
    '&:hover': f({}, Vo(xe(e, { inputBorderHoverColor: e.colorBorder })))
  }),
  Qa = e => {
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
  Ja = e => ({
    padding: `${e.inputPaddingVerticalSM}px ${e.controlPaddingHorizontalSM -
      1}px`,
    borderRadius: e.borderRadiusSM
  }),
  el = (e, t) => {
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
          po(
            xe(e, {
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
          po(
            xe(e, {
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
  tl = e =>
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
        bv(e.colorTextPlaceholder)
      ),
      {
        '&:hover': f({}, Vo(e)),
        '&:focus, &-focused': f({}, po(e)),
        '&-disabled, &[disabled]': f({}, yv(e)),
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
        '&-lg': f({}, Qa(e)),
        '&-sm': f({}, Ja(e)),
        '&-rtl': { direction: 'rtl' },
        '&-textarea-rtl': { direction: 'rtl' }
      }
    ),
  $v = e => {
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
      [`&-lg ${t}, &-lg > ${t}-group-addon`]: f({}, Qa(e)),
      [`&-sm ${t}, &-sm > ${t}-group-addon`]: f({}, Ja(e)),
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
      [`&${t}-group-compact`]: f(f({ display: 'block' }, an()), {
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
  Cv = e => {
    const { componentCls: t, controlHeightSM: n, lineWidth: o } = e,
      r = 16,
      i = (n - o * 2 - r) / 2
    return {
      [t]: f(f(f(f({}, Vt(e)), tl(e)), el(e, t)), {
        '&[type="color"]': {
          height: e.controlHeight,
          [`&${t}-lg`]: { height: e.controlHeightLG },
          [`&${t}-sm`]: { height: n, paddingTop: i, paddingBottom: i }
        }
      })
    }
  },
  wv = e => {
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
  Sv = e => {
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
            f(f({}, tl(e)), {
              display: 'inline-flex',
              [`&:not(${t}-affix-wrapper-disabled):hover`]: f(f({}, Vo(e)), {
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
            wv(e)
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
        el(e, `${t}-affix-wrapper`)
      )
    }
  },
  xv = e => {
    const {
      componentCls: t,
      colorError: n,
      colorSuccess: o,
      borderRadiusLG: r,
      borderRadiusSM: i
    } = e
    return {
      [`${t}-group`]: f(f(f({}, Vt(e)), $v(e)), {
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
  Ov = e => {
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
function Tv(e) {
  return xe(e, {
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
const Pv = e => {
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
  Iv = tt('Input', e => {
    const t = Tv(e)
    return [Cv(t), Pv(t), Sv(t), xv(t), Ov(t), Aa(t)]
  })
function yi(e) {
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
        Ev(e, r, n[r])
      })
  }
  return e
}
function Ev(e, t, n) {
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
var Ko = function(t, n) {
  var o = yi({}, t, n.attrs)
  return g(Wt, yi({}, o, { icon: Tl }), null)
}
Ko.displayName = 'LeftOutlined'
Ko.inheritAttrs = !1
const qg = Ko,
  nl = () => mt() && window.document.documentElement,
  ol = e => {
    if (mt() && window.document.documentElement) {
      const t = Array.isArray(e) ? e : [e],
        { documentElement: n } = window.document
      return t.some(o => o in n.style)
    }
    return !1
  },
  _v = (e, t) => {
    if (!ol(e)) return !1
    const n = document.createElement('div'),
      o = n.style[e]
    return (n.style[e] = t), n.style[e] !== o
  }
function kg(e, t) {
  return !Array.isArray(e) && t !== void 0 ? _v(e, t) : ol(e)
}
let en
const Av = () => {
    if (!nl()) return !1
    if (en !== void 0) return en
    const e = document.createElement('div')
    return (
      (e.style.display = 'flex'),
      (e.style.flexDirection = 'column'),
      (e.style.rowGap = '1px'),
      e.appendChild(document.createElement('div')),
      e.appendChild(document.createElement('div')),
      document.body.appendChild(e),
      (en = e.scrollHeight === 1),
      document.body.removeChild(e),
      en
    )
  },
  Mv = () => {
    const e = B(!1)
    return (
      Ee(() => {
        e.value = Av()
      }),
      e
    )
  },
  Mt = e => e != null && (Array.isArray(e) ? Ct(e).length : !0)
function Zg(e) {
  return Mt(e.prefix) || Mt(e.suffix) || Mt(e.allowClear)
}
function Qg(e) {
  return Mt(e.addonBefore) || Mt(e.addonAfter)
}
function Rv(e) {
  return typeof e > 'u' || e === null ? '' : String(e)
}
function Wn(e, t, n, o) {
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
function Bv(e, t) {
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
const Dv = () => ({
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
  zv = () =>
    f(f({}, Dv()), {
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
  Nv = () =>
    f(f({}, zv()), {
      id: String,
      placeholder: { type: [String, Number] },
      autocomplete: String,
      type: Wl('text'),
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
  rl = () =>
    St(Nv(), [
      'wrapperClassName',
      'groupClassName',
      'inputClassName',
      'affixWrapperClassName'
    ]),
  Jg = rl,
  il = () =>
    f(f({}, St(rl(), ['prefix', 'addonBefore', 'addonAfter', 'suffix'])), {
      rows: Number,
      autosize: { type: [Boolean, Object], default: void 0 },
      autoSize: { type: [Boolean, Object], default: void 0 },
      onResize: { type: Function },
      onCompositionstart: rn(),
      onCompositionend: rn(),
      valueModifiers: Object
    }),
  $i = e => e != null && (Array.isArray(e) ? Ct(e).length : !0)
function Fv(e) {
  return $i(e.addonBefore) || $i(e.addonAfter)
}
const Hv = ['text', 'input'],
  Lv = U({
    compatConfig: { MODE: 3 },
    name: 'ClearableLabeledInput',
    inheritAttrs: !1,
    props: {
      prefixCls: String,
      inputType: I.oneOf(vt('text', 'input')),
      value: Ke(),
      defaultValue: Ke(),
      allowClear: { type: Boolean, default: void 0 },
      element: Ke(),
      handleReset: Function,
      disabled: { type: Boolean, default: void 0 },
      direction: { type: String },
      size: { type: String },
      suffix: Ke(),
      prefix: Ke(),
      addonBefore: Ke(),
      addonAfter: Ke(),
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
      const r = Bo.useInject(),
        i = l => {
          const {
              value: s,
              disabled: d,
              readonly: c,
              handleReset: u,
              suffix: p = n.suffix
            } = e,
            m = !d && !c && s,
            v = `${l}-clear-icon`
          return g(
            zi,
            {
              onClick: u,
              onMousedown: h => h.preventDefault(),
              class: ne({ [`${v}-hidden`]: !m, [`${v}-has-suffix`]: !!p }, v),
              role: 'button'
            },
            null
          )
        },
        a = (l, s) => {
          const {
              value: d,
              allowClear: c,
              direction: u,
              bordered: p,
              hidden: m,
              status: v,
              addonAfter: h = n.addonAfter,
              addonBefore: C = n.addonBefore,
              hashId: b
            } = e,
            { status: y, hasFeedback: w } = r
          if (!c) return Oe(s, { value: d, disabled: e.disabled })
          const _ = ne(
            `${l}-affix-wrapper`,
            `${l}-affix-wrapper-textarea-with-clear-btn`,
            Pa(`${l}-affix-wrapper`, Ia(y, v), w),
            {
              [`${l}-affix-wrapper-rtl`]: u === 'rtl',
              [`${l}-affix-wrapper-borderless`]: !p,
              [`${o.class}`]: !Fv({ addonAfter: h, addonBefore: C }) && o.class
            },
            b
          )
          return g('span', { class: _, style: o.style, hidden: m }, [
            Oe(s, { style: null, value: d, disabled: e.disabled }),
            i(l)
          ])
        }
      return () => {
        var l
        const {
          prefixCls: s,
          inputType: d,
          element: c = (l = n.element) === null || l === void 0
            ? void 0
            : l.call(n)
        } = e
        return d === Hv[0] ? a(s, c) : null
      }
    }
  }),
  jv = `
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
  Wv = [
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
  Vn = {}
let Ce
function Vv(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1
  const n =
    e.getAttribute('id') ||
    e.getAttribute('data-reactid') ||
    e.getAttribute('name')
  if (t && Vn[n]) return Vn[n]
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
      sizingStyle: Wv.map(d => `${d}:${o.getPropertyValue(d)}`).join(';'),
      paddingSize: i,
      borderSize: a,
      boxSizing: r
    }
  return t && n && (Vn[n] = s), s
}
function Kv(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1,
    n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null,
    o = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null
  Ce ||
    ((Ce = document.createElement('textarea')),
    Ce.setAttribute('tab-index', '-1'),
    Ce.setAttribute('aria-hidden', 'true'),
    document.body.appendChild(Ce)),
    e.getAttribute('wrap')
      ? Ce.setAttribute('wrap', e.getAttribute('wrap'))
      : Ce.removeAttribute('wrap')
  const { paddingSize: r, borderSize: i, boxSizing: a, sizingStyle: l } = Vv(
    e,
    t
  )
  Ce.setAttribute('style', `${l};${jv}`),
    (Ce.value = e.value || e.placeholder || '')
  let s,
    d,
    c,
    u = Ce.scrollHeight
  if (
    (a === 'border-box' ? (u += i) : a === 'content-box' && (u -= r),
    n !== null || o !== null)
  ) {
    Ce.value = ' '
    const m = Ce.scrollHeight - r
    n !== null &&
      ((s = m * n),
      a === 'border-box' && (s = s + r + i),
      (u = Math.max(s, u))),
      o !== null &&
        ((d = m * o),
        a === 'border-box' && (d = d + r + i),
        (c = u > d ? '' : 'hidden'),
        (u = Math.min(d, u)))
  }
  const p = { height: `${u}px`, overflowY: c, resize: 'none' }
  return s && (p.minHeight = `${s}px`), d && (p.maxHeight = `${d}px`), p
}
const Kn = 0,
  Gn = 1,
  Un = 2,
  Gv = U({
    compatConfig: { MODE: 3 },
    name: 'ResizableTextArea',
    inheritAttrs: !1,
    props: il(),
    setup(e, t) {
      let { attrs: n, emit: o, expose: r } = t,
        i,
        a
      const l = L(),
        s = L({}),
        d = L(Un)
      me(() => {
        ce.cancel(i), ce.cancel(a)
      })
      const c = () => {
          try {
            if (l.value && document.activeElement === l.value.input) {
              const S = l.value.getSelectionStart(),
                $ = l.value.getSelectionEnd(),
                A = l.value.getScrollTop()
              l.value.setSelectionRange(S, $), l.value.setScrollTop(A)
            }
          } catch {}
        },
        u = L(),
        p = L()
      Te(() => {
        const S = e.autoSize || e.autosize
        S
          ? ((u.value = S.minRows), (p.value = S.maxRows))
          : ((u.value = void 0), (p.value = void 0))
      })
      const m = O(() => !!(e.autoSize || e.autosize)),
        v = () => {
          d.value = Kn
        }
      J(
        [() => e.value, u, p, m],
        () => {
          m.value && v()
        },
        { immediate: !0 }
      )
      const h = L()
      J(
        [d, l],
        () => {
          if (l.value)
            if (d.value === Kn) d.value = Gn
            else if (d.value === Gn) {
              const S = Kv(l.value.input, !1, u.value, p.value)
              ;(d.value = Un), (h.value = S)
            } else c()
        },
        { immediate: !0, flush: 'post' }
      )
      const C = Me(),
        b = L(),
        y = () => {
          ce.cancel(b.value)
        },
        w = S => {
          d.value === Un &&
            (o('resize', S),
            m.value &&
              (y(),
              (b.value = ce(() => {
                v()
              }))))
        }
      me(() => {
        y()
      }),
        r({
          resizeTextarea: () => {
            v()
          },
          textArea: O(() => {
            var S
            return (S = l.value) === null || S === void 0 ? void 0 : S.input
          }),
          instance: C
        }),
        ho(e.autosize === void 0)
      const P = () => {
        const { prefixCls: S, disabled: $ } = e,
          A = St(e, [
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
          z = ne(S, n.class, { [`${S}-disabled`]: $ }),
          T = m.value ? h.value : null,
          D = [n.style, s.value, T],
          V = f(f(f({}, A), n), { style: D, class: z })
        return (
          (d.value === Kn || d.value === Gn) &&
            D.push({ overflowX: 'hidden', overflowY: 'hidden' }),
          V.autofocus || delete V.autofocus,
          V.rows === 0 && delete V.rows,
          g(
            Co,
            { onResize: w, disabled: !m.value },
            {
              default: () => [
                g(Of, E(E({}, V), {}, { ref: l, tag: 'textarea' }), null)
              ]
            }
          )
        )
      }
      return () => P()
    }
  }),
  Uv = Gv
function al(e, t) {
  return [...(e || '')].slice(0, t).join('')
}
function Ci(e, t, n, o) {
  let r = n
  return (
    e
      ? (r = al(n, o))
      : [...(t || '')].length < n.length &&
        [...(n || '')].length > o &&
        (r = t),
    r
  )
}
const eh = U({
  compatConfig: { MODE: 3 },
  name: 'ATextarea',
  inheritAttrs: !1,
  props: il(),
  setup(e, t) {
    let { attrs: n, expose: o, emit: r } = t
    var i
    const a = Ff(),
      l = Bo.useInject(),
      s = O(() => Ia(l.status, e.status)),
      d = B((i = e.value) !== null && i !== void 0 ? i : e.defaultValue),
      c = B(),
      u = B(''),
      { prefixCls: p, size: m, direction: v } = Re('input', e),
      [h, C] = Iv(p),
      b = Di(),
      y = O(() => e.showCount === '' || e.showCount || !1),
      w = O(() => Number(e.maxlength) > 0),
      _ = B(!1),
      P = B(),
      S = B(0),
      $ = R => {
        ;(_.value = !0),
          (P.value = u.value),
          (S.value = R.currentTarget.selectionStart),
          r('compositionstart', R)
      },
      A = R => {
        var H
        _.value = !1
        let F = R.currentTarget.value
        if (w.value) {
          const k =
            S.value >= e.maxlength + 1 ||
            S.value ===
              ((H = P.value) === null || H === void 0 ? void 0 : H.length)
          F = Ci(k, P.value, F, e.maxlength)
        }
        F !== u.value && (V(F), Wn(R.currentTarget, R, x, F)),
          r('compositionend', R)
      },
      z = Me()
    J(
      () => e.value,
      () => {
        var R
        'value' in z.vnode.props,
          (d.value = (R = e.value) !== null && R !== void 0 ? R : '')
      }
    )
    const T = R => {
        var H
        Bv((H = c.value) === null || H === void 0 ? void 0 : H.textArea, R)
      },
      D = () => {
        var R, H
        ;(H = (R = c.value) === null || R === void 0 ? void 0 : R.textArea) ===
          null ||
          H === void 0 ||
          H.blur()
      },
      V = (R, H) => {
        d.value !== R &&
          (e.value === void 0
            ? (d.value = R)
            : Ie(() => {
                var F, k, Z
                c.value.textArea.value !== u.value &&
                  ((Z =
                    (F = c.value) === null || F === void 0
                      ? void 0
                      : (k = F.instance).update) === null ||
                    Z === void 0 ||
                    Z.call(k))
              }),
          Ie(() => {
            H && H()
          }))
      },
      X = R => {
        R.keyCode === 13 && r('pressEnter', R), r('keydown', R)
      },
      q = R => {
        const { onBlur: H } = e
        H == null || H(R), a.onFieldBlur()
      },
      x = R => {
        r('update:value', R.target.value),
          r('change', R),
          r('input', R),
          a.onFieldChange()
      },
      N = R => {
        Wn(c.value.textArea, R, x),
          V('', () => {
            T()
          })
      },
      j = R => {
        let H = R.target.value
        if (d.value !== H) {
          if (w.value) {
            const F = R.target,
              k =
                F.selectionStart >= e.maxlength + 1 ||
                F.selectionStart === H.length ||
                !F.selectionStart
            H = Ci(k, u.value, H, e.maxlength)
          }
          Wn(R.currentTarget, R, x, H), V(H)
        }
      },
      W = () => {
        var R, H
        const { class: F } = n,
          { bordered: k = !0 } = e,
          Z = f(f(f({}, St(e, ['allowClear'])), n), {
            class: [
              {
                [`${p.value}-borderless`]: !k,
                [`${F}`]: F && !y.value,
                [`${p.value}-sm`]: m.value === 'small',
                [`${p.value}-lg`]: m.value === 'large'
              },
              Pa(p.value, s.value),
              C.value
            ],
            disabled: b.value,
            showCount: null,
            prefixCls: p.value,
            onInput: j,
            onChange: j,
            onBlur: q,
            onKeydown: X,
            onCompositionstart: $,
            onCompositionend: A
          })
        return (
          !((R = e.valueModifiers) === null || R === void 0) &&
            R.lazy &&
            delete Z.onInput,
          g(
            Uv,
            E(
              E({}, Z),
              {},
              {
                id:
                  (H = Z == null ? void 0 : Z.id) !== null && H !== void 0
                    ? H
                    : a.id.value,
                ref: c,
                maxlength: e.maxlength,
                lazy: e.lazy
              }
            ),
            null
          )
        )
      }
    return (
      o({ focus: T, blur: D, resizableTextArea: c }),
      Te(() => {
        let R = Rv(d.value)
        !_.value &&
          w.value &&
          (e.value === null || e.value === void 0) &&
          (R = al(R, e.maxlength)),
          (u.value = R)
      }),
      () => {
        var R
        const { maxlength: H, bordered: F = !0, hidden: k } = e,
          { style: Z, class: de } = n,
          le = f(f(f({}, e), n), {
            prefixCls: p.value,
            inputType: 'text',
            handleReset: N,
            direction: v.value,
            bordered: F,
            style: y.value ? void 0 : Z,
            hashId: C.value,
            disabled: (R = e.disabled) !== null && R !== void 0 ? R : b.value
          })
        let se = g(Lv, E(E({}, le), {}, { value: u.value, status: e.status }), {
          element: W
        })
        if (y.value || l.hasFeedback) {
          const M = [...u.value].length
          let K = ''
          typeof y.value == 'object'
            ? (K = y.value.formatter({
                value: u.value,
                count: M,
                maxlength: H
              }))
            : (K = `${M}${w.value ? ` / ${H}` : ''}`),
            (se = g(
              'div',
              {
                hidden: k,
                class: ne(
                  `${p.value}-textarea`,
                  {
                    [`${p.value}-textarea-rtl`]: v.value === 'rtl',
                    [`${p.value}-textarea-show-count`]: y.value,
                    [`${p.value}-textarea-in-form-item`]: l.isFormItemInput
                  },
                  `${p.value}-textarea-show-count`,
                  de,
                  C.value
                ),
                style: Z,
                'data-count': typeof K != 'object' ? K : void 0
              },
              [
                se,
                l.hasFeedback &&
                  g('span', { class: `${p.value}-textarea-suffix` }, [
                    l.feedbackIcon
                  ])
              ]
            ))
        }
        return h(se)
      }
    )
  }
})
function wi(e) {
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
        Xv(e, r, n[r])
      })
  }
  return e
}
function Xv(e, t, n) {
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
var Go = function(t, n) {
  var o = wi({}, t, n.attrs)
  return g(Wt, wi({}, o, { icon: Pl }), null)
}
Go.displayName = 'EyeOutlined'
Go.inheritAttrs = !1
const th = Go
function Uo() {
  return {
    keyboard: { type: Boolean, default: void 0 },
    mask: { type: Boolean, default: void 0 },
    afterClose: Function,
    closable: { type: Boolean, default: void 0 },
    maskClosable: { type: Boolean, default: void 0 },
    visible: { type: Boolean, default: void 0 },
    destroyOnClose: { type: Boolean, default: void 0 },
    mousePosition: I.shape({ x: Number, y: Number }).loose,
    title: I.any,
    footer: I.any,
    transitionName: String,
    maskTransitionName: String,
    animation: I.any,
    maskAnimation: I.any,
    wrapStyle: { type: Object, default: void 0 },
    bodyStyle: { type: Object, default: void 0 },
    maskStyle: { type: Object, default: void 0 },
    prefixCls: String,
    wrapClassName: String,
    rootClassName: String,
    width: [String, Number],
    height: [String, Number],
    zIndex: Number,
    bodyProps: I.any,
    maskProps: I.any,
    wrapProps: I.any,
    getContainer: I.any,
    dialogStyle: { type: Object, default: void 0 },
    dialogClass: String,
    closeIcon: I.any,
    forceRender: { type: Boolean, default: void 0 },
    getOpenCount: Function,
    focusTriggerAfterClose: { type: Boolean, default: void 0 },
    onClose: Function,
    modalRender: Function
  }
}
function Si(e, t, n) {
  let o = t
  return !o && n && (o = `${e}-${n}`), o
}
let xi = -1
function Yv() {
  return (xi += 1), xi
}
function Oi(e, t) {
  let n = e[`page${t ? 'Y' : 'X'}Offset`]
  const o = `scroll${t ? 'Top' : 'Left'}`
  if (typeof n != 'number') {
    const r = e.document
    ;(n = r.documentElement[o]), typeof n != 'number' && (n = r.body[o])
  }
  return n
}
function qv(e) {
  const t = e.getBoundingClientRect(),
    n = { left: t.left, top: t.top },
    o = e.ownerDocument,
    r = o.defaultView || o.parentWindow
  return (n.left += Oi(r)), (n.top += Oi(r, !0)), n
}
const kv = { width: 0, height: 0, overflow: 'hidden', outline: 'none' },
  Zv = { outline: 'none' },
  Qv = U({
    compatConfig: { MODE: 3 },
    name: 'DialogContent',
    inheritAttrs: !1,
    props: f(f({}, Uo()), {
      motionName: String,
      ariaId: String,
      onVisibleChanged: Function,
      onMousedown: Function,
      onMouseup: Function
    }),
    setup(e, t) {
      let { expose: n, slots: o, attrs: r } = t
      const i = L(),
        a = L(),
        l = L()
      n({
        focus: () => {
          var p
          ;(p = i.value) === null ||
            p === void 0 ||
            p.focus({ preventScroll: !0 })
        },
        changeActive: p => {
          const { activeElement: m } = document
          p && m === a.value
            ? i.value.focus({ preventScroll: !0 })
            : !p && m === i.value && a.value.focus({ preventScroll: !0 })
        }
      })
      const s = L(),
        d = O(() => {
          const { width: p, height: m } = e,
            v = {}
          return (
            p !== void 0 && (v.width = typeof p == 'number' ? `${p}px` : p),
            m !== void 0 && (v.height = typeof m == 'number' ? `${m}px` : m),
            s.value && (v.transformOrigin = s.value),
            v
          )
        }),
        c = () => {
          Ie(() => {
            if (l.value) {
              const p = qv(l.value)
              s.value = e.mousePosition
                ? `${e.mousePosition.x - p.left}px ${e.mousePosition.y -
                    p.top}px`
                : ''
            }
          })
        },
        u = p => {
          e.onVisibleChanged(p)
        }
      return () => {
        var p, m, v, h
        const {
          prefixCls: C,
          footer: b = (p = o.footer) === null || p === void 0
            ? void 0
            : p.call(o),
          title: y = (m = o.title) === null || m === void 0
            ? void 0
            : m.call(o),
          ariaId: w,
          closable: _,
          closeIcon: P = (v = o.closeIcon) === null || v === void 0
            ? void 0
            : v.call(o),
          onClose: S,
          bodyStyle: $,
          bodyProps: A,
          onMousedown: z,
          onMouseup: T,
          visible: D,
          modalRender: V = o.modalRender,
          destroyOnClose: X,
          motionName: q
        } = e
        let x
        b && (x = g('div', { class: `${C}-footer` }, [b]))
        let N
        y &&
          (N = g('div', { class: `${C}-header` }, [
            g('div', { class: `${C}-title`, id: w }, [y])
          ]))
        let j
        _ &&
          (j = g(
            'button',
            {
              type: 'button',
              onClick: S,
              'aria-label': 'Close',
              class: `${C}-close`
            },
            [P || g('span', { class: `${C}-close-x` }, null)]
          ))
        const W = g('div', { class: `${C}-content` }, [
            j,
            N,
            g('div', E({ class: `${C}-body`, style: $ }, A), [
              (h = o.default) === null || h === void 0 ? void 0 : h.call(o)
            ]),
            x
          ]),
          R = Cn(q)
        return g(
          We,
          E(
            E({}, R),
            {},
            {
              onBeforeEnter: c,
              onAfterEnter: () => u(!0),
              onAfterLeave: () => u(!1)
            }
          ),
          {
            default: () => [
              D || !X
                ? jt(
                    g(
                      'div',
                      E(
                        E({}, r),
                        {},
                        {
                          ref: l,
                          key: 'dialog-element',
                          role: 'document',
                          style: [d.value, r.style],
                          class: [C, r.class],
                          onMousedown: z,
                          onMouseup: T
                        }
                      ),
                      [
                        g('div', { tabindex: 0, ref: i, style: Zv }, [
                          V ? V({ originVNode: W }) : W
                        ]),
                        g('div', { tabindex: 0, ref: a, style: kv }, null)
                      ]
                    ),
                    [[$n, D]]
                  )
                : null
            ]
          }
        )
      }
    }
  }),
  Jv = U({
    compatConfig: { MODE: 3 },
    name: 'DialogMask',
    props: {
      prefixCls: String,
      visible: Boolean,
      motionName: String,
      maskProps: Object
    },
    setup(e, t) {
      return () => {
        const { prefixCls: n, visible: o, maskProps: r, motionName: i } = e,
          a = Cn(i)
        return g(We, a, {
          default: () => [
            jt(g('div', E({ class: `${n}-mask` }, r), null), [[$n, o]])
          ]
        })
      }
    }
  }),
  Ti = U({
    compatConfig: { MODE: 3 },
    name: 'VcDialog',
    inheritAttrs: !1,
    props: wt(
      f(f({}, Uo()), { getOpenCount: Function, scrollLocker: Object }),
      {
        mask: !0,
        visible: !1,
        keyboard: !0,
        closable: !0,
        maskClosable: !0,
        destroyOnClose: !1,
        prefixCls: 'rc-dialog',
        getOpenCount: () => null,
        focusTriggerAfterClose: !0
      }
    ),
    setup(e, t) {
      let { attrs: n, slots: o } = t
      const r = B(),
        i = B(),
        a = B(),
        l = B(e.visible),
        s = B(`vcDialogTitle${Yv()}`),
        d = b => {
          var y, w
          if (b)
            qe(i.value, document.activeElement) ||
              ((r.value = document.activeElement),
              (y = a.value) === null || y === void 0 || y.focus())
          else {
            const _ = l.value
            if (
              ((l.value = !1), e.mask && r.value && e.focusTriggerAfterClose)
            ) {
              try {
                r.value.focus({ preventScroll: !0 })
              } catch {}
              r.value = null
            }
            _ && ((w = e.afterClose) === null || w === void 0 || w.call(e))
          }
        },
        c = b => {
          var y
          ;(y = e.onClose) === null || y === void 0 || y.call(e, b)
        },
        u = B(!1),
        p = B(),
        m = () => {
          clearTimeout(p.value), (u.value = !0)
        },
        v = () => {
          p.value = setTimeout(() => {
            u.value = !1
          })
        },
        h = b => {
          if (!e.maskClosable) return null
          u.value ? (u.value = !1) : i.value === b.target && c(b)
        },
        C = b => {
          if (e.keyboard && b.keyCode === ro.ESC) {
            b.stopPropagation(), c(b)
            return
          }
          e.visible && b.keyCode === ro.TAB && a.value.changeActive(!b.shiftKey)
        }
      return (
        J(
          () => e.visible,
          () => {
            e.visible && (l.value = !0)
          },
          { flush: 'post' }
        ),
        me(() => {
          var b
          clearTimeout(p.value),
            (b = e.scrollLocker) === null || b === void 0 || b.unLock()
        }),
        Te(() => {
          var b, y
          ;(b = e.scrollLocker) === null || b === void 0 || b.unLock(),
            l.value &&
              ((y = e.scrollLocker) === null || y === void 0 || y.lock())
        }),
        () => {
          const {
              prefixCls: b,
              mask: y,
              visible: w,
              maskTransitionName: _,
              maskAnimation: P,
              zIndex: S,
              wrapClassName: $,
              rootClassName: A,
              wrapStyle: z,
              closable: T,
              maskProps: D,
              maskStyle: V,
              transitionName: X,
              animation: q,
              wrapProps: x,
              title: N = o.title
            } = e,
            { style: j, class: W } = n
          return g('div', E({ class: [`${b}-root`, A] }, _f(e, { data: !0 })), [
            g(
              Jv,
              {
                prefixCls: b,
                visible: y && w,
                motionName: Si(b, _, P),
                style: f({ zIndex: S }, V),
                maskProps: D
              },
              null
            ),
            g(
              'div',
              E(
                {
                  tabIndex: -1,
                  onKeydown: C,
                  class: ne(`${b}-wrap`, $),
                  ref: i,
                  onClick: h,
                  role: 'dialog',
                  'aria-labelledby': N ? s.value : null,
                  style: f(f({ zIndex: S }, z), {
                    display: l.value ? null : 'none'
                  })
                },
                x
              ),
              [
                g(
                  Qv,
                  E(
                    E({}, St(e, ['scrollLocker'])),
                    {},
                    {
                      style: j,
                      class: W,
                      onMousedown: m,
                      onMouseup: v,
                      ref: a,
                      closable: T,
                      ariaId: s.value,
                      prefixCls: b,
                      visible: w,
                      onClose: c,
                      onVisibleChanged: d,
                      motionName: Si(b, X, q)
                    }
                  ),
                  o
                )
              ]
            )
          ])
        }
      )
    }
  }),
  eg = Uo(),
  tg = U({
    compatConfig: { MODE: 3 },
    name: 'DialogWrap',
    inheritAttrs: !1,
    props: wt(eg, { visible: !1 }),
    setup(e, t) {
      let { attrs: n, slots: o } = t
      const r = L(e.visible)
      return (
        Ri({}, { inTriggerContext: !1 }),
        J(
          () => e.visible,
          () => {
            e.visible && (r.value = !0)
          },
          { flush: 'post' }
        ),
        () => {
          const {
            visible: i,
            getContainer: a,
            forceRender: l,
            destroyOnClose: s = !1,
            afterClose: d
          } = e
          let c = f(f(f({}, e), n), { ref: '_component', key: 'dialog' })
          return a === !1
            ? g(Ti, E(E({}, c), {}, { getOpenCount: () => 2 }), o)
            : !l && s && !r.value
            ? null
            : g(
                Sa,
                { autoLock: !0, visible: i, forceRender: l, getContainer: a },
                {
                  default: u => (
                    (c = f(f(f({}, c), u), {
                      afterClose: () => {
                        d == null || d(), (r.value = !1)
                      }
                    })),
                    g(Ti, c, o)
                  )
                }
              )
        }
      )
    }
  }),
  ng = tg
function Pi(e) {
  return {
    position: e,
    top: 0,
    insetInlineEnd: 0,
    bottom: 0,
    insetInlineStart: 0
  }
}
const og = e => {
    const { componentCls: t } = e
    return [
      {
        [`${t}-root`]: {
          [`${t}${e.antCls}-zoom-enter, ${t}${e.antCls}-zoom-appear`]: {
            transform: 'none',
            opacity: 0,
            animationDuration: e.motionDurationSlow,
            userSelect: 'none'
          },
          [`${t}${e.antCls}-zoom-leave ${t}-content`]: {
            pointerEvents: 'none'
          },
          [`${t}-mask`]: f(f({}, Pi('fixed')), {
            zIndex: e.zIndexPopupBase,
            height: '100%',
            backgroundColor: e.colorBgMask,
            [`${t}-hidden`]: { display: 'none' }
          }),
          [`${t}-wrap`]: f(f({}, Pi('fixed')), {
            overflow: 'auto',
            outline: 0,
            WebkitOverflowScrolling: 'touch'
          })
        }
      },
      { [`${t}-root`]: pp(e) }
    ]
  },
  rg = e => {
    const { componentCls: t } = e
    return [
      {
        [`${t}-root`]: {
          [`${t}-wrap`]: {
            zIndex: e.zIndexPopupBase,
            position: 'fixed',
            inset: 0,
            overflow: 'auto',
            outline: 0,
            WebkitOverflowScrolling: 'touch'
          },
          [`${t}-wrap-rtl`]: { direction: 'rtl' },
          [`${t}-centered`]: {
            textAlign: 'center',
            '&::before': {
              display: 'inline-block',
              width: 0,
              height: '100%',
              verticalAlign: 'middle',
              content: '""'
            },
            [t]: {
              top: 0,
              display: 'inline-block',
              paddingBottom: 0,
              textAlign: 'start',
              verticalAlign: 'middle'
            }
          },
          [`@media (max-width: ${e.screenSMMax})`]: {
            [t]: {
              maxWidth: 'calc(100vw - 16px)',
              margin: `${e.marginXS} auto`
            },
            [`${t}-centered`]: { [t]: { flex: 1 } }
          }
        }
      },
      {
        [t]: f(f({}, Vt(e)), {
          pointerEvents: 'none',
          position: 'relative',
          top: 100,
          width: 'auto',
          maxWidth: `calc(100vw - ${e.margin * 2}px)`,
          margin: '0 auto',
          paddingBottom: e.paddingLG,
          [`${t}-title`]: {
            margin: 0,
            color: e.modalHeadingColor,
            fontWeight: e.fontWeightStrong,
            fontSize: e.modalHeaderTitleFontSize,
            lineHeight: e.modalHeaderTitleLineHeight,
            wordWrap: 'break-word'
          },
          [`${t}-content`]: {
            position: 'relative',
            backgroundColor: e.modalContentBg,
            backgroundClip: 'padding-box',
            border: 0,
            borderRadius: e.borderRadiusLG,
            boxShadow: e.boxShadowSecondary,
            pointerEvents: 'auto',
            padding: `${e.paddingMD}px ${e.paddingContentHorizontalLG}px`
          },
          [`${t}-close`]: f(
            {
              position: 'absolute',
              top: (e.modalHeaderCloseSize - e.modalCloseBtnSize) / 2,
              insetInlineEnd:
                (e.modalHeaderCloseSize - e.modalCloseBtnSize) / 2,
              zIndex: e.zIndexPopupBase + 10,
              padding: 0,
              color: e.modalCloseColor,
              fontWeight: e.fontWeightStrong,
              lineHeight: 1,
              textDecoration: 'none',
              background: 'transparent',
              borderRadius: e.borderRadiusSM,
              width: e.modalConfirmIconSize,
              height: e.modalConfirmIconSize,
              border: 0,
              outline: 0,
              cursor: 'pointer',
              transition: `color ${e.motionDurationMid}, background-color ${e.motionDurationMid}`,
              '&-x': {
                display: 'block',
                fontSize: e.fontSizeLG,
                fontStyle: 'normal',
                lineHeight: `${e.modalCloseBtnSize}px`,
                textAlign: 'center',
                textTransform: 'none',
                textRendering: 'auto'
              },
              '&:hover': {
                color: e.modalIconHoverColor,
                backgroundColor: e.wireframe
                  ? 'transparent'
                  : e.colorFillContent,
                textDecoration: 'none'
              },
              '&:active': {
                backgroundColor: e.wireframe
                  ? 'transparent'
                  : e.colorFillContentHover
              }
            },
            Bi(e)
          ),
          [`${t}-header`]: {
            color: e.colorText,
            background: e.modalHeaderBg,
            borderRadius: `${e.borderRadiusLG}px ${e.borderRadiusLG}px 0 0`,
            marginBottom: e.marginXS
          },
          [`${t}-body`]: {
            fontSize: e.fontSize,
            lineHeight: e.lineHeight,
            wordWrap: 'break-word'
          },
          [`${t}-footer`]: {
            textAlign: 'end',
            background: e.modalFooterBg,
            marginTop: e.marginSM,
            [`${e.antCls}-btn + ${e.antCls}-btn:not(${e.antCls}-dropdown-trigger)`]: {
              marginBottom: 0,
              marginInlineStart: e.marginXS
            }
          },
          [`${t}-open`]: { overflow: 'hidden' }
        })
      },
      {
        [`${t}-pure-panel`]: {
          top: 'auto',
          padding: 0,
          display: 'flex',
          flexDirection: 'column',
          [`${t}-content,
          ${t}-body,
          ${t}-confirm-body-wrapper`]: {
            display: 'flex',
            flexDirection: 'column',
            flex: 'auto'
          },
          [`${t}-confirm-body`]: { marginBottom: 'auto' }
        }
      }
    ]
  },
  ig = e => {
    const { componentCls: t } = e,
      n = `${t}-confirm`
    return {
      [n]: {
        '&-rtl': { direction: 'rtl' },
        [`${e.antCls}-modal-header`]: { display: 'none' },
        [`${n}-body-wrapper`]: f({}, an()),
        [`${n}-body`]: {
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          [`${n}-title`]: {
            flex: '0 0 100%',
            display: 'block',
            overflow: 'hidden',
            color: e.colorTextHeading,
            fontWeight: e.fontWeightStrong,
            fontSize: e.modalHeaderTitleFontSize,
            lineHeight: e.modalHeaderTitleLineHeight,
            [`+ ${n}-content`]: {
              marginBlockStart: e.marginXS,
              flexBasis: '100%',
              maxWidth: `calc(100% - ${e.modalConfirmIconSize + e.marginSM}px)`
            }
          },
          [`${n}-content`]: { color: e.colorText, fontSize: e.fontSize },
          [`> ${e.iconCls}`]: {
            flex: 'none',
            marginInlineEnd: e.marginSM,
            fontSize: e.modalConfirmIconSize,
            [`+ ${n}-title`]: { flex: 1 },
            [`+ ${n}-title + ${n}-content`]: {
              marginInlineStart: e.modalConfirmIconSize + e.marginSM
            }
          }
        },
        [`${n}-btns`]: {
          textAlign: 'end',
          marginTop: e.marginSM,
          [`${e.antCls}-btn + ${e.antCls}-btn`]: {
            marginBottom: 0,
            marginInlineStart: e.marginXS
          }
        }
      },
      [`${n}-error ${n}-body > ${e.iconCls}`]: { color: e.colorError },
      [`${n}-warning ${n}-body > ${e.iconCls},
        ${n}-confirm ${n}-body > ${e.iconCls}`]: { color: e.colorWarning },
      [`${n}-info ${n}-body > ${e.iconCls}`]: { color: e.colorInfo },
      [`${n}-success ${n}-body > ${e.iconCls}`]: { color: e.colorSuccess },
      [`${t}-zoom-leave ${t}-btns`]: { pointerEvents: 'none' }
    }
  },
  ag = e => {
    const { componentCls: t } = e
    return {
      [`${t}-root`]: {
        [`${t}-wrap-rtl`]: {
          direction: 'rtl',
          [`${t}-confirm-body`]: { direction: 'rtl' }
        }
      }
    }
  },
  lg = e => {
    const { componentCls: t, antCls: n } = e,
      o = `${t}-confirm`
    return {
      [t]: {
        [`${t}-content`]: { padding: 0 },
        [`${t}-header`]: {
          padding: e.modalHeaderPadding,
          borderBottom: `${e.modalHeaderBorderWidth}px ${e.modalHeaderBorderStyle} ${e.modalHeaderBorderColorSplit}`,
          marginBottom: 0
        },
        [`${t}-body`]: { padding: e.modalBodyPadding },
        [`${t}-footer`]: {
          padding: `${e.modalFooterPaddingVertical}px ${e.modalFooterPaddingHorizontal}px`,
          borderTop: `${e.modalFooterBorderWidth}px ${e.modalFooterBorderStyle} ${e.modalFooterBorderColorSplit}`,
          borderRadius: `0 0 ${e.borderRadiusLG}px ${e.borderRadiusLG}px`,
          marginTop: 0
        }
      },
      [o]: {
        [`${n}-modal-body`]: {
          padding: `${e.padding * 2}px ${e.padding * 2}px ${e.paddingLG}px`
        },
        [`${o}-body`]: {
          [`> ${e.iconCls}`]: {
            marginInlineEnd: e.margin,
            [`+ ${o}-title + ${o}-content`]: {
              marginInlineStart: e.modalConfirmIconSize + e.margin
            }
          }
        },
        [`${o}-btns`]: { marginTop: e.marginLG }
      }
    }
  },
  sg = tt('Modal', e => {
    const t = e.padding,
      n = e.fontSizeHeading5,
      o = e.lineHeightHeading5,
      r = xe(e, {
        modalBodyPadding: e.paddingLG,
        modalHeaderBg: e.colorBgElevated,
        modalHeaderPadding: `${t}px ${e.paddingLG}px`,
        modalHeaderBorderWidth: e.lineWidth,
        modalHeaderBorderStyle: e.lineType,
        modalHeaderTitleLineHeight: o,
        modalHeaderTitleFontSize: n,
        modalHeaderBorderColorSplit: e.colorSplit,
        modalHeaderCloseSize: o * n + t * 2,
        modalContentBg: e.colorBgElevated,
        modalHeadingColor: e.colorTextHeading,
        modalCloseColor: e.colorTextDescription,
        modalFooterBg: 'transparent',
        modalFooterBorderColorSplit: e.colorSplit,
        modalFooterBorderStyle: e.lineType,
        modalFooterPaddingVertical: e.paddingXS,
        modalFooterPaddingHorizontal: e.padding,
        modalFooterBorderWidth: e.lineWidth,
        modalConfirmTitleFontSize: e.fontSizeLG,
        modalIconHoverColor: e.colorIconHover,
        modalConfirmIconSize: e.fontSize * e.lineHeight,
        modalCloseBtnSize: e.controlHeightLG * 0.55
      })
    return [rg(r), ig(r), ag(r), og(r), e.wireframe && lg(r), zo(r, 'zoom')]
  })
var ug =
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
let mo
const cg = e => {
  ;(mo = { x: e.pageX, y: e.pageY }), setTimeout(() => (mo = null), 100)
}
nl() && ct(document.documentElement, 'click', cg, !0)
const dg = () => ({
    prefixCls: String,
    visible: { type: Boolean, default: void 0 },
    open: { type: Boolean, default: void 0 },
    confirmLoading: { type: Boolean, default: void 0 },
    title: I.any,
    closable: { type: Boolean, default: void 0 },
    closeIcon: I.any,
    onOk: Function,
    onCancel: Function,
    'onUpdate:visible': Function,
    'onUpdate:open': Function,
    onChange: Function,
    afterClose: Function,
    centered: { type: Boolean, default: void 0 },
    width: [String, Number],
    footer: I.any,
    okText: I.any,
    okType: String,
    cancelText: I.any,
    icon: I.any,
    maskClosable: { type: Boolean, default: void 0 },
    forceRender: { type: Boolean, default: void 0 },
    okButtonProps: ge(),
    cancelButtonProps: ge(),
    destroyOnClose: { type: Boolean, default: void 0 },
    wrapClassName: String,
    maskTransitionName: String,
    transitionName: String,
    getContainer: {
      type: [String, Function, Boolean, Object],
      default: void 0
    },
    zIndex: Number,
    bodyStyle: ge(),
    maskStyle: ge(),
    mask: { type: Boolean, default: void 0 },
    keyboard: { type: Boolean, default: void 0 },
    wrapProps: Object,
    focusTriggerAfterClose: { type: Boolean, default: void 0 },
    modalRender: Function,
    mousePosition: ge()
  }),
  we = U({
    compatConfig: { MODE: 3 },
    name: 'AModal',
    inheritAttrs: !1,
    props: wt(dg(), { width: 520, confirmLoading: !1, okType: 'primary' }),
    setup(e, t) {
      let { emit: n, slots: o, attrs: r } = t
      const [i] = $o('Modal'),
        {
          prefixCls: a,
          rootPrefixCls: l,
          direction: s,
          getPopupContainer: d
        } = Re('modal', e),
        [c, u] = sg(a)
      ho(e.visible === void 0)
      const p = h => {
          n('update:visible', !1),
            n('update:open', !1),
            n('cancel', h),
            n('change', !1)
        },
        m = h => {
          n('ok', h)
        },
        v = () => {
          var h, C
          const {
            okText: b = (h = o.okText) === null || h === void 0
              ? void 0
              : h.call(o),
            okType: y,
            cancelText: w = (C = o.cancelText) === null || C === void 0
              ? void 0
              : C.call(o),
            confirmLoading: _
          } = e
          return g(je, null, [
            g(Ze, E({ onClick: p }, e.cancelButtonProps), {
              default: () => [w || i.value.cancelText]
            }),
            g(
              Ze,
              E(E({}, Ba(y)), {}, { loading: _, onClick: m }, e.okButtonProps),
              { default: () => [b || i.value.okText] }
            )
          ])
        }
      return () => {
        var h, C
        const {
            prefixCls: b,
            visible: y,
            open: w,
            wrapClassName: _,
            centered: P,
            getContainer: S,
            closeIcon: $ = (h = o.closeIcon) === null || h === void 0
              ? void 0
              : h.call(o),
            focusTriggerAfterClose: A = !0
          } = e,
          z = ug(e, [
            'prefixCls',
            'visible',
            'open',
            'wrapClassName',
            'centered',
            'getContainer',
            'closeIcon',
            'focusTriggerAfterClose'
          ]),
          T = ne(_, {
            [`${a.value}-centered`]: !!P,
            [`${a.value}-wrap-rtl`]: s.value === 'rtl'
          })
        return c(
          g(
            ng,
            E(
              E(E({}, z), r),
              {},
              {
                rootClassName: u.value,
                class: ne(u.value, r.class),
                getContainer: S || (d == null ? void 0 : d.value),
                prefixCls: a.value,
                wrapClassName: T,
                visible: w ?? y,
                onClose: p,
                focusTriggerAfterClose: A,
                transitionName: Bt(l.value, 'zoom', e.transitionName),
                maskTransitionName: Bt(l.value, 'fade', e.maskTransitionName),
                mousePosition:
                  (C = z.mousePosition) !== null && C !== void 0 ? C : mo
              }
            ),
            f(f({}, o), {
              footer: o.footer || v,
              closeIcon: () =>
                g('span', { class: `${a.value}-close-x` }, [
                  $ || g(Vl, { class: `${a.value}-close-icon` }, null)
                ])
            })
          )
        )
      }
    }
  }),
  fg = () => {
    const e = B(!1)
    return (
      me(() => {
        e.value = !0
      }),
      e
    )
  },
  pg = fg,
  mg = {
    type: { type: String },
    actionFn: Function,
    close: Function,
    autofocus: Boolean,
    prefixCls: String,
    buttonProps: ge(),
    emitEvent: Boolean,
    quitOnNullishReturnValue: Boolean
  }
function Ii(e) {
  return !!(e && e.then)
}
const Ei = U({
  compatConfig: { MODE: 3 },
  name: 'ActionButton',
  props: mg,
  setup(e, t) {
    let { slots: n } = t
    const o = B(!1),
      r = B(),
      i = B(!1)
    let a
    const l = pg()
    Ee(() => {
      e.autofocus &&
        (a = setTimeout(() => {
          var u, p
          return (p =
            (u = _e(r.value)) === null || u === void 0 ? void 0 : u.focus) ===
            null || p === void 0
            ? void 0
            : p.call(u)
        }))
    }),
      me(() => {
        clearTimeout(a)
      })
    const s = function() {
        for (var u, p = arguments.length, m = new Array(p), v = 0; v < p; v++)
          m[v] = arguments[v]
        ;(u = e.close) === null || u === void 0 || u.call(e, ...m)
      },
      d = u => {
        Ii(u) &&
          ((i.value = !0),
          u.then(
            function() {
              l.value || (i.value = !1), s(...arguments), (o.value = !1)
            },
            p => (l.value || (i.value = !1), (o.value = !1), Promise.reject(p))
          ))
      },
      c = u => {
        const { actionFn: p } = e
        if (o.value) return
        if (((o.value = !0), !p)) {
          s()
          return
        }
        let m
        if (e.emitEvent) {
          if (((m = p(u)), e.quitOnNullishReturnValue && !Ii(m))) {
            ;(o.value = !1), s(u)
            return
          }
        } else if (p.length) (m = p(e.close)), (o.value = !1)
        else if (((m = p()), !m)) {
          s()
          return
        }
        d(m)
      }
    return () => {
      const { type: u, prefixCls: p, buttonProps: m } = e
      return g(
        Ze,
        E(
          E(
            E({}, Ba(u)),
            {},
            { onClick: c, loading: i.value, prefixCls: p },
            m
          ),
          {},
          { ref: r }
        ),
        n
      )
    }
  }
})
function lt(e) {
  return typeof e == 'function' ? e() : e
}
const ll = U({
    name: 'ConfirmDialog',
    inheritAttrs: !1,
    props: [
      'icon',
      'onCancel',
      'onOk',
      'close',
      'closable',
      'zIndex',
      'afterClose',
      'visible',
      'open',
      'keyboard',
      'centered',
      'getContainer',
      'maskStyle',
      'okButtonProps',
      'cancelButtonProps',
      'okType',
      'prefixCls',
      'okCancel',
      'width',
      'mask',
      'maskClosable',
      'okText',
      'cancelText',
      'autoFocusButton',
      'transitionName',
      'maskTransitionName',
      'type',
      'title',
      'content',
      'direction',
      'rootPrefixCls',
      'bodyStyle',
      'closeIcon',
      'modalRender',
      'focusTriggerAfterClose',
      'wrapClassName',
      'confirmPrefixCls',
      'footer'
    ],
    setup(e, t) {
      let { attrs: n } = t
      const [o] = $o('Modal')
      return () => {
        const {
          icon: r,
          onCancel: i,
          onOk: a,
          close: l,
          okText: s,
          closable: d = !1,
          zIndex: c,
          afterClose: u,
          keyboard: p,
          centered: m,
          getContainer: v,
          maskStyle: h,
          okButtonProps: C,
          cancelButtonProps: b,
          okCancel: y,
          width: w = 416,
          mask: _ = !0,
          maskClosable: P = !1,
          type: S,
          open: $,
          title: A,
          content: z,
          direction: T,
          closeIcon: D,
          modalRender: V,
          focusTriggerAfterClose: X,
          rootPrefixCls: q,
          bodyStyle: x,
          wrapClassName: N,
          footer: j
        } = e
        let W = r
        if (!r && r !== null)
          switch (S) {
            case 'info':
              W = g(Ul, null, null)
              break
            case 'success':
              W = g(Gl, null, null)
              break
            case 'error':
              W = g(zi, null, null)
              break
            default:
              W = g(Kl, null, null)
          }
        const R = e.okType || 'primary',
          H = e.prefixCls || 'ant-modal',
          F = `${H}-confirm`,
          k = n.style || {},
          Z = y ?? S === 'confirm',
          de = e.autoFocusButton === null ? !1 : e.autoFocusButton || 'ok',
          le = `${H}-confirm`,
          se = ne(
            le,
            `${le}-${e.type}`,
            { [`${le}-rtl`]: T === 'rtl' },
            n.class
          ),
          M = o.value,
          K =
            Z &&
            g(
              Ei,
              {
                actionFn: i,
                close: l,
                autofocus: de === 'cancel',
                buttonProps: b,
                prefixCls: `${q}-btn`
              },
              { default: () => [lt(e.cancelText) || M.cancelText] }
            )
        return g(
          we,
          {
            prefixCls: H,
            class: se,
            wrapClassName: ne({ [`${le}-centered`]: !!m }, N),
            onCancel: Q => (l == null ? void 0 : l({ triggerCancel: !0 }, Q)),
            open: $,
            title: '',
            footer: '',
            transitionName: Bt(q, 'zoom', e.transitionName),
            maskTransitionName: Bt(q, 'fade', e.maskTransitionName),
            mask: _,
            maskClosable: P,
            maskStyle: h,
            style: k,
            bodyStyle: x,
            width: w,
            zIndex: c,
            afterClose: u,
            keyboard: p,
            centered: m,
            getContainer: v,
            closable: d,
            closeIcon: D,
            modalRender: V,
            focusTriggerAfterClose: X
          },
          {
            default: () => [
              g('div', { class: `${F}-body-wrapper` }, [
                g('div', { class: `${F}-body` }, [
                  lt(W),
                  A === void 0
                    ? null
                    : g('span', { class: `${F}-title` }, [lt(A)]),
                  g('div', { class: `${F}-content` }, [lt(z)])
                ]),
                j !== void 0
                  ? lt(j)
                  : g('div', { class: `${F}-btns` }, [
                      K,
                      g(
                        Ei,
                        {
                          type: R,
                          actionFn: a,
                          close: l,
                          autofocus: de === 'ok',
                          buttonProps: C,
                          prefixCls: `${q}-btn`
                        },
                        {
                          default: () => [
                            lt(s) || (Z ? M.okText : M.justOkText)
                          ]
                        }
                      )
                    ])
              ])
            ]
          }
        )
      }
    }
  }),
  vg = [],
  ke = vg,
  gg = e => {
    const t = document.createDocumentFragment()
    let n = f(f({}, St(e, ['parentContext', 'appContext'])), {
        close: i,
        open: !0
      }),
      o = null
    function r() {
      o && (pt(null, t), (o = null))
      for (var d = arguments.length, c = new Array(d), u = 0; u < d; u++)
        c[u] = arguments[u]
      const p = c.some(m => m && m.triggerCancel)
      e.onCancel && p && e.onCancel(() => {}, ...c.slice(1))
      for (let m = 0; m < ke.length; m++)
        if (ke[m] === i) {
          ke.splice(m, 1)
          break
        }
    }
    function i() {
      for (var d = arguments.length, c = new Array(d), u = 0; u < d; u++)
        c[u] = arguments[u]
      ;(n = f(f({}, n), {
        open: !1,
        afterClose: () => {
          typeof e.afterClose == 'function' && e.afterClose(), r.apply(this, c)
        }
      })),
        n.visible && delete n.visible,
        a(n)
    }
    function a(d) {
      typeof d == 'function' ? (n = d(n)) : (n = f(f({}, n), d)),
        o && ou(o, n, t)
    }
    const l = d => {
      const c = ql,
        u = c.prefixCls,
        p = d.prefixCls || `${u}-modal`,
        m = c.iconPrefixCls,
        v = Xl()
      return g(Yl, E(E({}, c), {}, { prefixCls: u }), {
        default: () => [
          g(
            ll,
            E(
              E({}, d),
              {},
              {
                rootPrefixCls: u,
                prefixCls: p,
                iconPrefixCls: m,
                locale: v,
                cancelText: d.cancelText || v.cancelText
              }
            ),
            null
          )
        ]
      })
    }
    function s(d) {
      const c = g(l, f({}, d))
      return (
        (c.appContext = e.parentContext || e.appContext || c.appContext),
        pt(c, t),
        c
      )
    }
    return (o = s(n)), ke.push(i), { destroy: i, update: a }
  },
  Gt = gg
function sl(e) {
  return f(f({}, e), { type: 'warning' })
}
function ul(e) {
  return f(f({}, e), { type: 'info' })
}
function cl(e) {
  return f(f({}, e), { type: 'success' })
}
function dl(e) {
  return f(f({}, e), { type: 'error' })
}
function fl(e) {
  return f(f({}, e), { type: 'confirm' })
}
const hg = () => ({
    config: Object,
    afterClose: Function,
    destroyAction: Function,
    open: Boolean
  }),
  bg = U({
    name: 'HookModal',
    inheritAttrs: !1,
    props: wt(hg(), { config: { width: 520, okType: 'primary' } }),
    setup(e, t) {
      let { expose: n } = t
      var o
      const r = O(() => e.open),
        i = O(() => e.config),
        { direction: a, getPrefixCls: l } = kl(),
        s = l('modal'),
        d = l(),
        c = () => {
          var v, h
          e == null || e.afterClose(),
            (h = (v = i.value).afterClose) === null || h === void 0 || h.call(v)
        },
        u = function() {
          e.destroyAction(...arguments)
        }
      n({ destroy: u })
      const p =
          (o = i.value.okCancel) !== null && o !== void 0
            ? o
            : i.value.type === 'confirm',
        [m] = $o('Modal', Zl.Modal)
      return () =>
        g(
          ll,
          E(
            E({ prefixCls: s, rootPrefixCls: d }, i.value),
            {},
            {
              close: u,
              open: r.value,
              afterClose: c,
              okText:
                i.value.okText ||
                (p
                  ? m == null
                    ? void 0
                    : m.value.okText
                  : m == null
                  ? void 0
                  : m.value.justOkText),
              direction: i.value.direction || a.value,
              cancelText:
                i.value.cancelText || (m == null ? void 0 : m.value.cancelText)
            }
          ),
          null
        )
    }
  })
let _i = 0
const yg = U({
  name: 'ElementsHolder',
  inheritAttrs: !1,
  setup(e, t) {
    let { expose: n } = t
    const o = B([])
    return (
      n({
        addModal: i => (
          o.value.push(i),
          (o.value = o.value.slice()),
          () => {
            o.value = o.value.filter(a => a !== i)
          }
        )
      }),
      () => o.value.map(i => i())
    )
  }
})
function $g() {
  const e = B(null),
    t = B([])
  J(
    t,
    () => {
      t.value.length &&
        ([...t.value].forEach(a => {
          a()
        }),
        (t.value = []))
    },
    { immediate: !0 }
  )
  const n = i =>
      function(l) {
        var s
        _i += 1
        const d = B(!0),
          c = B(null),
          u = B(st(l)),
          p = B({})
        J(
          () => l,
          w => {
            C(f(f({}, $l(w) ? w.value : w), p.value))
          }
        )
        const m = function() {
          d.value = !1
          for (var w = arguments.length, _ = new Array(w), P = 0; P < w; P++)
            _[P] = arguments[P]
          const S = _.some($ => $ && $.triggerCancel)
          u.value.onCancel && S && u.value.onCancel(() => {}, ..._.slice(1))
        }
        let v
        const h = () =>
          g(
            bg,
            {
              key: `modal-${_i}`,
              config: i(u.value),
              ref: c,
              open: d.value,
              destroyAction: m,
              afterClose: () => {
                v == null || v()
              }
            },
            null
          )
        ;(v = (s = e.value) === null || s === void 0 ? void 0 : s.addModal(h)),
          v && ke.push(v)
        const C = w => {
          u.value = f(f({}, u.value), w)
        }
        return {
          destroy: () => {
            c.value ? m() : (t.value = [...t.value, m])
          },
          update: w => {
            ;(p.value = w),
              c.value ? C(w) : (t.value = [...t.value, () => C(w)])
          }
        }
      },
    o = O(() => ({
      info: n(ul),
      success: n(cl),
      error: n(dl),
      warning: n(sl),
      confirm: n(fl)
    })),
    r = Symbol('modalHolderKey')
  return [o.value, () => g(yg, { key: r, ref: e }, null)]
}
function pl(e) {
  return Gt(sl(e))
}
we.useModal = $g
we.info = function(t) {
  return Gt(ul(t))
}
we.success = function(t) {
  return Gt(cl(t))
}
we.error = function(t) {
  return Gt(dl(t))
}
we.warning = pl
we.warn = pl
we.confirm = function(t) {
  return Gt(fl(t))
}
we.destroyAll = function() {
  for (; ke.length; ) {
    const t = ke.pop()
    t && t()
  }
}
we.install = function(e) {
  return e.component(we.name, we), e
}
const Cg = { small: 8, middle: 16, large: 24 },
  wg = () => ({
    prefixCls: String,
    size: { type: [String, Number, Array] },
    direction: I.oneOf(vt('horizontal', 'vertical')).def('horizontal'),
    align: I.oneOf(vt('start', 'end', 'center', 'baseline')),
    wrap: on()
  })
function Sg(e) {
  return typeof e == 'string' ? Cg[e] : e || 0
}
const Rt = U({
  compatConfig: { MODE: 3 },
  name: 'ASpace',
  inheritAttrs: !1,
  props: wg(),
  slots: Object,
  setup(e, t) {
    let { slots: n, attrs: o } = t
    const { prefixCls: r, space: i, direction: a } = Re('space', e),
      [l, s] = Ea(r),
      d = Mv(),
      c = O(() => {
        var b, y, w
        return (w =
          (b = e.size) !== null && b !== void 0
            ? b
            : (y = i == null ? void 0 : i.value) === null || y === void 0
            ? void 0
            : y.size) !== null && w !== void 0
          ? w
          : 'small'
      }),
      u = L(),
      p = L()
    J(
      c,
      () => {
        ;[u.value, p.value] = (Array.isArray(c.value)
          ? c.value
          : [c.value, c.value]
        ).map(b => Sg(b))
      },
      { immediate: !0 }
    )
    const m = O(() =>
        e.align === void 0 && e.direction === 'horizontal' ? 'center' : e.align
      ),
      v = O(() =>
        ne(r.value, s.value, `${r.value}-${e.direction}`, {
          [`${r.value}-rtl`]: a.value === 'rtl',
          [`${r.value}-align-${m.value}`]: m.value
        })
      ),
      h = O(() => (a.value === 'rtl' ? 'marginLeft' : 'marginRight')),
      C = O(() => {
        const b = {}
        return (
          d.value &&
            ((b.columnGap = `${u.value}px`), (b.rowGap = `${p.value}px`)),
          f(
            f({}, b),
            e.wrap && { flexWrap: 'wrap', marginBottom: `${-p.value}px` }
          )
        )
      })
    return () => {
      var b, y
      const { wrap: w, direction: _ = 'horizontal' } = e,
        P = (b = n.default) === null || b === void 0 ? void 0 : b.call(n),
        S = Ct(P),
        $ = S.length
      if ($ === 0) return null
      const A = (y = n.split) === null || y === void 0 ? void 0 : y.call(n),
        z = `${r.value}-item`,
        T = u.value,
        D = $ - 1
      return g(
        'div',
        E(
          E({}, o),
          {},
          { class: [v.value, o.class], style: [C.value, o.style] }
        ),
        [
          S.map((V, X) => {
            let q = P.indexOf(V)
            q === -1 && (q = `$$space-${X}`)
            let x = {}
            return (
              d.value ||
                (_ === 'vertical'
                  ? X < D && (x = { marginBottom: `${T / (A ? 2 : 1)}px` })
                  : (x = f(
                      f({}, X < D && { [h.value]: `${T / (A ? 2 : 1)}px` }),
                      w && { paddingBottom: `${p.value}px` }
                    ))),
              l(
                g(je, { key: q }, [
                  g('div', { class: z, style: x }, [V]),
                  X < D &&
                    A &&
                    g('span', { class: `${z}-split`, style: x }, [A])
                ])
              )
            )
          })
        ]
      )
    }
  }
})
Rt.Compact = so
Rt.install = function(e) {
  return e.component(Rt.name, Rt), e.component(so.name, so), e
}
const nh = Rt,
  oh = Cl('vendor', () => {
    const e = wl(),
      t = L([]),
      n = L({}),
      o = L(null),
      r = Ql,
      i = L(!1),
      a = L([]),
      l = L(!1),
      s = L(!1),
      d = L(1),
      c = L({ page: 1, limit: 10, search: '', status: '' }),
      u = L([
        { title: pe('shopName'), dataIndex: 'shopname', key: 'shop_name' },
        { title: pe('owner'), dataIndex: 'displayname', key: 'owner' },
        {
          title: pe('outstandingCommissions'),
          dataIndex: 'commission_due',
          key: 'commission_due'
        },
        {
          title: pe('commissionRate'),
          dataIndex: 'commission_rate',
          key: 'commission_rate'
        },
        {
          title: pe('registeredDate'),
          dataIndex: 'registered_date',
          key: 'registered_date'
        },
        { title: pe('status'), dataIndex: 'status', key: 'status' },
        { title: pe('actions'), dataIndex: 'action', key: 'action' }
      ]),
      p = async () => {
        i.value = !0
        const _ = await r.getVendors(c.value)
        ;(t.value = _.vendors),
          (n.value = _.vendor_count),
          (d.value = _.result_count),
          (i.value = !1)
      }
    return {
      vendors: t,
      vendorsCount: n,
      vendorDetails: o,
      vendorAPI: r,
      onLoading: i,
      detailsLoading: l,
      isSearch: s,
      vendorsQueryParams: c,
      tableColumns: u,
      resultCount: d,
      selectedVendorIds: a,
      fetchVendors: p,
      onSearch: async () => {
        c.value.search !== '' ? (s.value = !0) : (s.value = !1), await p()
      },
      navigationFilter: async _ => {
        ;(c.value.status = _),
          (c.value.search = ''),
          _ === '' ? (s.value = !1) : (s.value = !0),
          (c.value.page = 1),
          (a.value = []),
          e.replace({ query: _ ? { status: _ } : {} }),
          await p()
      },
      setVendorStatus: async (_, P) => {
        const S = await r.setVendorStatus(_, P)
        S.success
          ? Fe.success({ message: pe('success'), description: S.message })
          : Fe.error({ message: pe('error'), description: S.message }),
          (a.value = a.value.filter($ => $ !== _)),
          P === 'deactivate' && e.currentRoute.value.name === 'vendor-edit'
            ? e.back()
            : await p()
      },
      setVendorApproval: async (_, P, S = '', $ = !1) => {
        const A = await r.setVendorApproval(_, P, S, $)
        A.success
          ? Fe.success({ message: pe('success'), description: A.message })
          : Fe.error({ message: pe('error'), description: A.message }),
          (a.value = a.value.filter(z => z !== _)),
          await p()
      },
      bulkVendorApproval: async (_, P = '', S = !1) => {
        var $, A
        try {
          const z = await r.bulkVendorApproval(a.value, _, P, S)
          z.success_count > 0
            ? Fe.success({ message: pe('success'), description: z.message })
            : Fe.error({ message: pe('error'), description: z.message }),
            (a.value = []),
            await p()
        } catch (z) {
          const T =
            (A =
              ($ = z == null ? void 0 : z.response) == null
                ? void 0
                : $.data) == null
              ? void 0
              : A.message
          Fe.error({
            message: pe('error'),
            description: T ?? pe('somethingWentWrong')
          })
        }
      },
      fetchVendorDetails: async _ => {
        try {
          ;(l.value = !0), (o.value = null)
          const P = await r.getVendorDetails(_)
          o.value = P
        } catch {
          Fe.error({
            message: pe('error'),
            description: 'Failed to load vendor details'
          })
        } finally {
          l.value = !1
        }
      },
      clearVendorDetails: () => {
        o.value = null
      }
    }
  })
export {
  vm as $,
  Ba as A,
  Ze as B,
  Fg as C,
  Ug as D,
  Lm as E,
  Ei as F,
  yt as G,
  xt as H,
  Rg as I,
  Uo as J,
  ro as K,
  ct as L,
  we as M,
  ng as N,
  Bg as O,
  un as P,
  og as Q,
  Co as R,
  nh as S,
  eh as T,
  pp as U,
  qg as V,
  Xg as W,
  th as X,
  $s as Y,
  qp as Z,
  Kg as _,
  di as a,
  _f as a$,
  ba as a0,
  $a as a1,
  Dd as a2,
  Wd as a3,
  De as a4,
  Kc as a5,
  Lc as a6,
  zc as a7,
  Fc as a8,
  wr as a9,
  ot as aA,
  ma as aB,
  ga as aC,
  Ig as aD,
  ia as aE,
  Ao as aF,
  It as aG,
  bs as aH,
  Aa as aI,
  po as aJ,
  Vo as aK,
  tl as aL,
  gp as aM,
  mp as aN,
  hp as aO,
  vp as aP,
  ys as aQ,
  ap as aR,
  Pa as aS,
  Ia as aT,
  yv as aU,
  $v as aV,
  bv as aW,
  el as aX,
  Vg as aY,
  jg as aZ,
  Of as a_,
  bt as aa,
  oo as ab,
  Ir as ac,
  Ed as ad,
  Ht as ae,
  dn as af,
  Le as ag,
  _r as ah,
  Ca as ai,
  Kf as aj,
  Ft as ak,
  da as al,
  qf as am,
  Yf as an,
  Dp as ao,
  Sp as ap,
  ov as aq,
  gs as ar,
  Hg as as,
  Bo as at,
  lf as au,
  Ff as av,
  Lg as aw,
  Wg as ax,
  Ot as ay,
  aa as az,
  nd as b,
  At as b0,
  ut as b1,
  Nd as b2,
  Do as b3,
  zv as b4,
  Zg as b5,
  Qg as b6,
  Nv as b7,
  Rv as b8,
  Bv as b9,
  Wn as ba,
  Jg as bb,
  Iv as bc,
  Mv as bd,
  hm as be,
  Zp as bf,
  Gp as bg,
  mf as bh,
  Up as bi,
  Ja as bj,
  Ag as bk,
  wa as bl,
  Mg as bm,
  Xe as c,
  Yg as d,
  Qe as e,
  Lt as f,
  Oe as g,
  Yr as h,
  ua as i,
  ht as j,
  zg as k,
  Ng as l,
  Eg as m,
  Tv as n,
  St as o,
  kg as p,
  rm as q,
  fi as r,
  Dg as s,
  zo as t,
  oh as u,
  Qp as v,
  ce as w,
  Gg as x,
  Wp as y,
  _g as z
}

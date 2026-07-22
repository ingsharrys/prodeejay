import {
  P as V,
  a as R,
  c as oe,
  ai as ho,
  A as On,
  _ as v,
  E as bt,
  o as _e,
  x as Kt,
  a9 as $o,
  aj as Jt,
  V as Ue,
  y as yo,
  t as ht,
  g as $t,
  m as Qe,
  M as Ne,
  r as yt,
  a1 as So,
  u as Ce,
  f as ye,
  I as Ve,
  v as En,
  d as lt,
  s as xo,
  b as Co,
  D as wo,
  e as Io,
  a0 as To,
  K as Po,
  ak as Ye,
  R as _o,
  U as _t
} from './Dashboard.071f9192.js'
import {
  d as G,
  r as Y,
  w as ae,
  g as $,
  c as u,
  F as ct,
  j as Ee,
  p as De,
  N as Qt,
  s as N,
  m as Re,
  k as An,
  Y as Mo,
  W as Bo,
  X as Oo,
  n as Eo,
  v as et,
  l as Ae,
  u as rt,
  y as Ao,
  M as Ro,
  i as en
} from './vendor.0319ebde.js'
import {
  _ as Rn,
  $ as Dn,
  a0 as dt,
  S as tt,
  a1 as Do,
  a2 as Lo,
  a3 as Ln,
  W as kn,
  a4 as ko,
  a5 as Ho,
  a6 as Ko,
  a7 as Hn,
  j as tn,
  a8 as Mt,
  a9 as Kn,
  aa as zo,
  ab as No,
  T as zn,
  c as We,
  q as Me,
  O as Ze,
  C as Wo,
  K as Se,
  w as Be,
  h as vt,
  m as Fo,
  s as qe,
  b as ce,
  R as nn,
  p as nt,
  o as zt,
  F as Go,
  u as on,
  x as jo
} from './shallowequal.234d6013.js'
import { H as Xo, T as an, J as Vo } from './antd.ecdb83f5.js'
var Yo = '[object Symbol]'
function Nt(e) {
  return typeof e == 'symbol' || (Rn(e) && Dn(e) == Yo)
}
function qo(e, t) {
  for (var n = -1, o = e == null ? 0 : e.length, a = Array(o); ++n < o; )
    a[n] = t(e[n], n, e)
  return a
}
var Uo = 1 / 0,
  ln = dt ? dt.prototype : void 0,
  rn = ln ? ln.toString : void 0
function Nn(e) {
  if (typeof e == 'string') return e
  if (tt(e)) return qo(e, Nn) + ''
  if (Nt(e)) return rn ? rn.call(e) : ''
  var t = e + ''
  return t == '0' && 1 / e == -Uo ? '-0' : t
}
function Zo(e) {
  return e
}
function Jo(e, t, n) {
  switch (n.length) {
    case 0:
      return e.call(t)
    case 1:
      return e.call(t, n[0])
    case 2:
      return e.call(t, n[0], n[1])
    case 3:
      return e.call(t, n[0], n[1], n[2])
  }
  return e.apply(t, n)
}
function Qo() {}
var ea = 800,
  ta = 16,
  na = Date.now
function oa(e) {
  var t = 0,
    n = 0
  return function() {
    var o = na(),
      a = ta - (o - n)
    if (((n = o), a > 0)) {
      if (++t >= ea) return arguments[0]
    } else t = 0
    return e.apply(void 0, arguments)
  }
}
function aa(e) {
  return function() {
    return e
  }
}
var ia = (function() {
  try {
    var e = Do(Object, 'defineProperty')
    return e({}, '', {}), e
  } catch {}
})()
const ft = ia
var la = ft
  ? function(e, t) {
      return ft(e, 'toString', {
        configurable: !0,
        enumerable: !1,
        value: aa(t),
        writable: !0
      })
    }
  : Zo
const ra = la
var sa = oa(ra)
const ua = sa
function ca(e, t, n, o) {
  for (var a = e.length, i = n + (o ? 1 : -1); o ? i-- : ++i < a; )
    if (t(e[i], i, e)) return i
  return -1
}
function da(e) {
  return e !== e
}
function va(e, t, n) {
  for (var o = n - 1, a = e.length; ++o < a; ) if (e[o] === t) return o
  return -1
}
function fa(e, t, n) {
  return t === t ? va(e, t, n) : ca(e, da, n)
}
function pa(e, t) {
  var n = e == null ? 0 : e.length
  return !!n && fa(e, t, 0) > -1
}
function ma(e, t, n) {
  t == '__proto__' && ft
    ? ft(e, t, { configurable: !0, enumerable: !0, value: n, writable: !0 })
    : (e[t] = n)
}
var ga = Object.prototype,
  ba = ga.hasOwnProperty
function ha(e, t, n) {
  var o = e[t]
  ;(!(ba.call(e, t) && Lo(o, n)) || (n === void 0 && !(t in e))) && ma(e, t, n)
}
var sn = Math.max
function $a(e, t, n) {
  return (
    (t = sn(t === void 0 ? e.length - 1 : t, 0)),
    function() {
      for (
        var o = arguments, a = -1, i = sn(o.length - t, 0), l = Array(i);
        ++a < i;

      )
        l[a] = o[t + a]
      a = -1
      for (var r = Array(t + 1); ++a < t; ) r[a] = o[a]
      return (r[t] = n(l)), Jo(e, this, r)
    }
  )
}
var ya = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
  Sa = /^\w*$/
function xa(e, t) {
  if (tt(e)) return !1
  var n = typeof e
  return n == 'number' || n == 'symbol' || n == 'boolean' || e == null || Nt(e)
    ? !0
    : Sa.test(e) || !ya.test(e) || (t != null && e in Object(t))
}
var Ca = 'Expected a function'
function Wt(e, t) {
  if (typeof e != 'function' || (t != null && typeof t != 'function'))
    throw new TypeError(Ca)
  var n = function() {
    var o = arguments,
      a = t ? t.apply(this, o) : o[0],
      i = n.cache
    if (i.has(a)) return i.get(a)
    var l = e.apply(this, o)
    return (n.cache = i.set(a, l) || i), l
  }
  return (n.cache = new (Wt.Cache || Ln)()), n
}
Wt.Cache = Ln
var wa = 500
function Ia(e) {
  var t = Wt(e, function(o) {
      return n.size === wa && n.clear(), o
    }),
    n = t.cache
  return t
}
var Ta = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
  Pa = /\\(\\)?/g,
  _a = Ia(function(e) {
    var t = []
    return (
      e.charCodeAt(0) === 46 && t.push(''),
      e.replace(Ta, function(n, o, a, i) {
        t.push(a ? i.replace(Pa, '$1') : o || n)
      }),
      t
    )
  })
const Ma = _a
function Ba(e) {
  return e == null ? '' : Nn(e)
}
function St(e, t) {
  return tt(e) ? e : xa(e, t) ? [e] : Ma(Ba(e))
}
var Oa = 1 / 0
function Ft(e) {
  if (typeof e == 'string' || Nt(e)) return e
  var t = e + ''
  return t == '0' && 1 / e == -Oa ? '-0' : t
}
function Ea(e, t) {
  t = St(t, e)
  for (var n = 0, o = t.length; e != null && n < o; ) e = e[Ft(t[n++])]
  return n && n == o ? e : void 0
}
var un = dt ? dt.isConcatSpreadable : void 0
function Aa(e) {
  return tt(e) || kn(e) || !!(un && e && e[un])
}
function Wn(e, t, n, o, a) {
  var i = -1,
    l = e.length
  for (n || (n = Aa), a || (a = []); ++i < l; ) {
    var r = e[i]
    t > 0 && n(r)
      ? t > 1
        ? Wn(r, t - 1, n, o, a)
        : ko(a, r)
      : o || (a[a.length] = r)
  }
  return a
}
function Ra(e) {
  var t = e == null ? 0 : e.length
  return t ? Wn(e, 1) : []
}
function Da(e) {
  return ua($a(e, void 0, Ra), e + '')
}
var La = Ho(Object.getPrototypeOf, Object)
const ka = La
var Ha = '[object Object]',
  Ka = Function.prototype,
  za = Object.prototype,
  Fn = Ka.toString,
  Na = za.hasOwnProperty,
  Wa = Fn.call(Object)
function Fa(e) {
  if (!Rn(e) || Dn(e) != Ha) return !1
  var t = ka(e)
  if (t === null) return !0
  var n = Na.call(t, 'constructor') && t.constructor
  return typeof n == 'function' && n instanceof n && Fn.call(n) == Wa
}
function Ga(e, t) {
  return e != null && t in Object(e)
}
function ja(e, t, n) {
  t = St(t, e)
  for (var o = -1, a = t.length, i = !1; ++o < a; ) {
    var l = Ft(t[o])
    if (!(i = e != null && n(e, l))) break
    e = e[l]
  }
  return i || ++o != a
    ? i
    : ((a = e == null ? 0 : e.length),
      !!a && Ko(a) && Hn(l, a) && (tt(e) || kn(e)))
}
function Xa(e, t) {
  return e != null && ja(e, t, Ga)
}
function Va(e, t, n) {
  for (var o = -1, a = e == null ? 0 : e.length; ++o < a; )
    if (n(t, e[o])) return !0
  return !1
}
function Ya(e, t, n, o) {
  if (!tn(e)) return e
  t = St(t, e)
  for (var a = -1, i = t.length, l = i - 1, r = e; r != null && ++a < i; ) {
    var c = Ft(t[a]),
      p = n
    if (c === '__proto__' || c === 'constructor' || c === 'prototype') return e
    if (a != l) {
      var d = r[c]
      ;(p = o ? o(d, c, r) : void 0),
        p === void 0 && (p = tn(d) ? d : Hn(t[a + 1]) ? [] : {})
    }
    ha(r, c, p), (r = r[c])
  }
  return e
}
function qa(e, t, n) {
  for (var o = -1, a = t.length, i = {}; ++o < a; ) {
    var l = t[o],
      r = Ea(e, l)
    n(r, l) && Ya(i, St(l, e), r)
  }
  return i
}
function Ua(e, t) {
  return qa(e, t, function(n, o) {
    return Xa(e, o)
  })
}
var Za = Da(function(e, t) {
  return e == null ? {} : Ua(e, t)
})
const Gn = Za
var Ja = 1 / 0,
  Qa =
    Mt && 1 / Kn(new Mt([, -0]))[1] == Ja
      ? function(e) {
          return new Mt(e)
        }
      : Qo
const ei = Qa
var ti = 200
function ni(e, t, n) {
  var o = -1,
    a = pa,
    i = e.length,
    l = !0,
    r = [],
    c = r
  if (n) (l = !1), (a = Va)
  else if (i >= ti) {
    var p = t ? null : ei(e)
    if (p) return Kn(p)
    ;(l = !1), (a = No), (c = new zo())
  } else c = t ? [] : r
  e: for (; ++o < i; ) {
    var d = e[o],
      s = t ? t(d) : d
    if (((d = n || d !== 0 ? d : 0), l && s === s)) {
      for (var b = c.length; b--; ) if (c[b] === s) continue e
      t && c.push(s), r.push(d)
    } else a(c, s, n) || (c !== r && c.push(s), r.push(d))
  }
  return r
}
function Bt(e) {
  return e && e.length ? ni(e) : []
}
const oi = e => ({
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
  ai = oi,
  ke = { adjustX: 1, adjustY: 1 },
  He = [0, 0],
  ii = {
    topLeft: {
      points: ['bl', 'tl'],
      overflow: ke,
      offset: [0, -4],
      targetOffset: He
    },
    topCenter: {
      points: ['bc', 'tc'],
      overflow: ke,
      offset: [0, -4],
      targetOffset: He
    },
    topRight: {
      points: ['br', 'tr'],
      overflow: ke,
      offset: [0, -4],
      targetOffset: He
    },
    bottomLeft: {
      points: ['tl', 'bl'],
      overflow: ke,
      offset: [0, 4],
      targetOffset: He
    },
    bottomCenter: {
      points: ['tc', 'bc'],
      overflow: ke,
      offset: [0, 4],
      targetOffset: He
    },
    bottomRight: {
      points: ['tr', 'br'],
      overflow: ke,
      offset: [0, 4],
      targetOffset: He
    }
  },
  li = ii
var ri =
  (globalThis && globalThis.__rest) ||
  function(e, t) {
    var n = {}
    for (var o in e)
      Object.prototype.hasOwnProperty.call(e, o) &&
        t.indexOf(o) < 0 &&
        (n[o] = e[o])
    if (e != null && typeof Object.getOwnPropertySymbols == 'function')
      for (var a = 0, o = Object.getOwnPropertySymbols(e); a < o.length; a++)
        t.indexOf(o[a]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(e, o[a]) &&
          (n[o[a]] = e[o[a]])
    return n
  }
const si = G({
  compatConfig: { MODE: 3 },
  props: {
    minOverlayWidthMatchTrigger: { type: Boolean, default: void 0 },
    arrow: { type: Boolean, default: !1 },
    prefixCls: V.string.def('rc-dropdown'),
    transitionName: String,
    overlayClassName: V.string.def(''),
    openClassName: String,
    animation: V.any,
    align: V.object,
    overlayStyle: { type: Object, default: void 0 },
    placement: V.string.def('bottomLeft'),
    overlay: V.any,
    trigger: V.oneOfType([V.string, V.arrayOf(V.string)]).def('hover'),
    alignPoint: { type: Boolean, default: void 0 },
    showAction: V.array,
    hideAction: V.array,
    getPopupContainer: Function,
    visible: { type: Boolean, default: void 0 },
    defaultVisible: { type: Boolean, default: !1 },
    mouseEnterDelay: V.number.def(0.15),
    mouseLeaveDelay: V.number.def(0.1)
  },
  emits: ['visibleChange', 'overlayClick'],
  setup(e, t) {
    let { slots: n, emit: o, expose: a } = t
    const i = Y(!!e.visible)
    ae(
      () => e.visible,
      f => {
        f !== void 0 && (i.value = f)
      }
    )
    const l = Y()
    a({ triggerRef: l })
    const r = f => {
        e.visible === void 0 && (i.value = !1), o('overlayClick', f)
      },
      c = f => {
        e.visible === void 0 && (i.value = f), o('visibleChange', f)
      },
      p = () => {
        var f
        const m = (f = n.overlay) === null || f === void 0 ? void 0 : f.call(n),
          S = { prefixCls: `${e.prefixCls}-menu`, onClick: r }
        return u(ct, { key: ho }, [
          e.arrow && u('div', { class: `${e.prefixCls}-arrow` }, null),
          We(m, S, !1)
        ])
      },
      d = $(() => {
        const { minOverlayWidthMatchTrigger: f = !e.alignPoint } = e
        return f
      }),
      s = () => {
        var f
        const m = (f = n.default) === null || f === void 0 ? void 0 : f.call(n)
        return i.value && m
          ? We(m[0], { class: e.openClassName || `${e.prefixCls}-open` }, !1)
          : m
      },
      b = $(() =>
        !e.hideAction && e.trigger.indexOf('contextmenu') !== -1
          ? ['click']
          : e.hideAction
      )
    return () => {
      const {
          prefixCls: f,
          arrow: m,
          showAction: S,
          overlayStyle: C,
          trigger: I,
          placement: T,
          align: D,
          getPopupContainer: H,
          transitionName: g,
          animation: w,
          overlayClassName: x
        } = e,
        P = ri(e, [
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
      return u(
        zn,
        R(
          R({}, P),
          {},
          {
            prefixCls: f,
            ref: l,
            popupClassName: oe(x, { [`${f}-show-arrow`]: m }),
            popupStyle: C,
            builtinPlacements: li,
            action: I,
            showAction: S,
            hideAction: b.value || [],
            popupPlacement: T,
            popupAlign: D,
            popupTransitionName: g,
            popupAnimation: w,
            popupVisible: i.value,
            stretch: d.value ? 'minWidth' : '',
            onPopupVisibleChange: c,
            getPopupContainer: H
          }
        ),
        { popup: p, default: s }
      )
    }
  }
})
function cn(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? Object(arguments[t]) : {},
      o = Object.keys(n)
    typeof Object.getOwnPropertySymbols == 'function' &&
      (o = o.concat(
        Object.getOwnPropertySymbols(n).filter(function(a) {
          return Object.getOwnPropertyDescriptor(n, a).enumerable
        })
      )),
      o.forEach(function(a) {
        ui(e, a, n[a])
      })
  }
  return e
}
function ui(e, t, n) {
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
var Gt = function(t, n) {
  var o = cn({}, t, n.attrs)
  return u(On, cn({}, o, { icon: Xo }), null)
}
Gt.displayName = 'EllipsisOutlined'
Gt.inheritAttrs = !1
const jn = Gt,
  Xn = Symbol('OverrideContextKey'),
  Vn = () => Ee(Xn, void 0),
  ci = e => {
    var t, n, o
    const {
      prefixCls: a,
      mode: i,
      selectable: l,
      validator: r,
      onClick: c,
      expandIcon: p
    } = Vn() || {}
    De(Xn, {
      prefixCls: $(() => {
        var d, s
        return (s =
          (d = e.prefixCls) === null || d === void 0 ? void 0 : d.value) !==
          null && s !== void 0
          ? s
          : a == null
          ? void 0
          : a.value
      }),
      mode: $(() => {
        var d, s
        return (s =
          (d = e.mode) === null || d === void 0 ? void 0 : d.value) !== null &&
          s !== void 0
          ? s
          : i == null
          ? void 0
          : i.value
      }),
      selectable: $(() => {
        var d, s
        return (s =
          (d = e.selectable) === null || d === void 0 ? void 0 : d.value) !==
          null && s !== void 0
          ? s
          : l == null
          ? void 0
          : l.value
      }),
      validator: (t = e.validator) !== null && t !== void 0 ? t : r,
      onClick: (n = e.onClick) !== null && n !== void 0 ? n : c,
      expandIcon:
        (o = e.expandIcon) !== null && o !== void 0
          ? o
          : p == null
          ? void 0
          : p.value
    })
  },
  Yn = Symbol('menuContextKey'),
  qn = e => {
    De(Yn, e)
  },
  Ie = () => Ee(Yn),
  Un = Symbol('ForceRenderKey'),
  di = e => {
    De(Un, e)
  },
  Zn = () => Ee(Un, !1),
  Jn = Symbol('menuFirstLevelContextKey'),
  Qn = e => {
    De(Jn, e)
  },
  vi = () => Ee(Jn, !0),
  pt = G({
    compatConfig: { MODE: 3 },
    name: 'MenuContextProvider',
    inheritAttrs: !1,
    props: {
      mode: { type: String, default: void 0 },
      overflowDisabled: { type: Boolean, default: void 0 }
    },
    setup(e, t) {
      let { slots: n } = t
      const o = Ie(),
        a = v({}, o)
      return (
        e.mode !== void 0 && (a.mode = Qt(e, 'mode')),
        e.overflowDisabled !== void 0 &&
          (a.overflowDisabled = Qt(e, 'overflowDisabled')),
        qn(a),
        () => {
          var i
          return (i = n.default) === null || i === void 0 ? void 0 : i.call(n)
        }
      )
    }
  }),
  fi = qn,
  pi = Symbol('siderCollapsed'),
  st = '$$__vc-menu-more__key',
  eo = Symbol('KeyPathContext'),
  jt = () =>
    Ee(eo, {
      parentEventKeys: $(() => []),
      parentKeys: $(() => []),
      parentInfo: {}
    }),
  mi = (e, t, n) => {
    const { parentEventKeys: o, parentKeys: a } = jt(),
      i = $(() => [...o.value, e]),
      l = $(() => [...a.value, t])
    return De(eo, { parentEventKeys: i, parentKeys: l, parentInfo: n }), l
  },
  to = Symbol('measure'),
  dn = G({
    compatConfig: { MODE: 3 },
    setup(e, t) {
      let { slots: n } = t
      return (
        De(to, !0),
        () => {
          var o
          return (o = n.default) === null || o === void 0 ? void 0 : o.call(n)
        }
      )
    }
  }),
  Xt = () => Ee(to, !1),
  gi = mi
function no(e) {
  const { mode: t, rtl: n, inlineIndent: o } = Ie()
  return $(() =>
    t.value !== 'inline'
      ? null
      : n.value
      ? { paddingRight: `${e.value * o.value}px` }
      : { paddingLeft: `${e.value * o.value}px` }
  )
}
let bi = 0
const hi = () => ({
    id: String,
    role: String,
    disabled: Boolean,
    danger: Boolean,
    title: { type: [String, Boolean], default: void 0 },
    icon: V.any,
    onMouseenter: Function,
    onMouseleave: Function,
    onClick: Function,
    onKeydown: Function,
    onFocus: Function,
    originItemValue: _e()
  }),
  Fe = G({
    compatConfig: { MODE: 3 },
    name: 'AMenuItem',
    inheritAttrs: !1,
    props: hi(),
    slots: Object,
    setup(e, t) {
      let { slots: n, emit: o, attrs: a } = t
      const i = An(),
        l = Xt(),
        r = typeof i.vnode.key == 'symbol' ? String(i.vnode.key) : i.vnode.key
      Me(
        typeof i.vnode.key != 'symbol',
        'MenuItem',
        `MenuItem \`:key="${String(r)}"\` not support Symbol type`
      )
      const c = `menu_item_${++bi}_$$_${r}`,
        { parentEventKeys: p, parentKeys: d } = jt(),
        {
          prefixCls: s,
          activeKeys: b,
          disabled: f,
          changeActiveKeys: m,
          rtl: S,
          inlineCollapsed: C,
          siderCollapsed: I,
          onItemClick: T,
          selectedKeys: D,
          registerMenuInfo: H,
          unRegisterMenuInfo: g
        } = Ie(),
        w = vi(),
        x = N(!1),
        P = $(() => [...d.value, r])
      H(c, {
        eventKey: c,
        key: r,
        parentEventKeys: p,
        parentKeys: d,
        isLeaf: !0
      }),
        Re(() => {
          g(c)
        }),
        ae(
          b,
          () => {
            x.value = !!b.value.find(_ => _ === r)
          },
          { immediate: !0 }
        )
      const M = $(() => f.value || e.disabled),
        j = $(() => D.value.includes(r)),
        J = $(() => {
          const _ = `${s.value}-item`
          return {
            [`${_}`]: !0,
            [`${_}-danger`]: e.danger,
            [`${_}-active`]: x.value,
            [`${_}-selected`]: j.value,
            [`${_}-disabled`]: M.value
          }
        }),
        te = _ => ({
          key: r,
          eventKey: c,
          keyPath: P.value,
          eventKeyPath: [...p.value, c],
          domEvent: _,
          item: v(v({}, e), a)
        }),
        se = _ => {
          if (M.value) return
          const W = te(_)
          o('click', _), T(W)
        },
        K = _ => {
          M.value || (m(P.value), o('mouseenter', _))
        },
        Z = _ => {
          M.value || (m([]), o('mouseleave', _))
        },
        E = _ => {
          if ((o('keydown', _), _.which === Se.ENTER)) {
            const W = te(_)
            o('click', _), T(W)
          }
        },
        ie = _ => {
          m(P.value), o('focus', _)
        },
        q = (_, W) => {
          const Q = u('span', { class: `${s.value}-title-content` }, [W])
          return (!_ || (Kt(W) && W.type === 'span')) &&
            W &&
            C.value &&
            w &&
            typeof W == 'string'
            ? u('div', { class: `${s.value}-inline-collapsed-noicon` }, [
                W.charAt(0)
              ])
            : Q
        },
        fe = no($(() => P.value.length))
      return () => {
        var _, W, Q, re, de
        if (l) return null
        const le =
            (_ = e.title) !== null && _ !== void 0
              ? _
              : (W = n.title) === null || W === void 0
              ? void 0
              : W.call(n),
          h = bt((Q = n.default) === null || Q === void 0 ? void 0 : Q.call(n)),
          O = h.length
        let k = le
        typeof le > 'u' ? (k = w && O ? h : '') : le === !1 && (k = '')
        const X = { title: k }
        !I.value && !C.value && ((X.title = null), (X.open = !1))
        const U = {}
        e.role === 'option' && (U['aria-selected'] = j.value)
        const F =
          (re = e.icon) !== null && re !== void 0
            ? re
            : (de = n.icon) === null || de === void 0
            ? void 0
            : de.call(n, e)
        return u(
          Wo,
          R(
            R({}, X),
            {},
            {
              placement: S.value ? 'left' : 'right',
              overlayClassName: `${s.value}-inline-collapsed-tooltip`
            }
          ),
          {
            default: () => [
              u(
                Ze.Item,
                R(
                  R(
                    R({ component: 'li' }, a),
                    {},
                    {
                      id: e.id,
                      style: v(v({}, a.style || {}), fe.value),
                      class: [
                        J.value,
                        {
                          [`${a.class}`]: !!a.class,
                          [`${s.value}-item-only-child`]: (F ? O + 1 : O) === 1
                        }
                      ],
                      role: e.role || 'menuitem',
                      tabindex: e.disabled ? null : -1,
                      'data-menu-id': r,
                      'aria-disabled': e.disabled
                    },
                    U
                  ),
                  {},
                  {
                    onMouseenter: K,
                    onMouseleave: Z,
                    onClick: se,
                    onKeydown: E,
                    onFocus: ie,
                    title: typeof le == 'string' ? le : void 0
                  }
                ),
                {
                  default: () => [
                    We(
                      typeof F == 'function' ? F(e.originItemValue) : F,
                      { class: `${s.value}-item-icon` },
                      !1
                    ),
                    q(F, h)
                  ]
                }
              )
            ]
          }
        )
      }
    }
  }),
  Pe = { adjustX: 1, adjustY: 1 },
  $i = {
    topLeft: { points: ['bl', 'tl'], overflow: Pe, offset: [0, -7] },
    bottomLeft: { points: ['tl', 'bl'], overflow: Pe, offset: [0, 7] },
    leftTop: { points: ['tr', 'tl'], overflow: Pe, offset: [-4, 0] },
    rightTop: { points: ['tl', 'tr'], overflow: Pe, offset: [4, 0] }
  },
  yi = {
    topLeft: { points: ['bl', 'tl'], overflow: Pe, offset: [0, -7] },
    bottomLeft: { points: ['tl', 'bl'], overflow: Pe, offset: [0, 7] },
    rightTop: { points: ['tr', 'tl'], overflow: Pe, offset: [-4, 0] },
    leftTop: { points: ['tl', 'tr'], overflow: Pe, offset: [4, 0] }
  },
  Si = {
    horizontal: 'bottomLeft',
    vertical: 'rightTop',
    'vertical-left': 'rightTop',
    'vertical-right': 'leftTop'
  },
  vn = G({
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
      const a = N(!1),
        {
          getPopupContainer: i,
          rtl: l,
          subMenuOpenDelay: r,
          subMenuCloseDelay: c,
          builtinPlacements: p,
          triggerSubMenuAction: d,
          forceSubMenuRender: s,
          motion: b,
          defaultMotions: f,
          rootClassName: m
        } = Ie(),
        S = Zn(),
        C = $(() => (l.value ? v(v({}, yi), p.value) : v(v({}, $i), p.value))),
        I = $(() => Si[e.mode]),
        T = N()
      ae(
        () => e.visible,
        g => {
          Be.cancel(T.value),
            (T.value = Be(() => {
              a.value = g
            }))
        },
        { immediate: !0 }
      ),
        Re(() => {
          Be.cancel(T.value)
        })
      const D = g => {
          o('visibleChange', g)
        },
        H = $(() => {
          var g, w
          const x =
              b.value ||
              ((g = f.value) === null || g === void 0 ? void 0 : g[e.mode]) ||
              ((w = f.value) === null || w === void 0 ? void 0 : w.other),
            P = typeof x == 'function' ? x() : x
          return P ? $o(P.name, { css: !0 }) : void 0
        })
      return () => {
        const {
          prefixCls: g,
          popupClassName: w,
          mode: x,
          popupOffset: P,
          disabled: L
        } = e
        return u(
          zn,
          {
            prefixCls: g,
            popupClassName: oe(
              `${g}-popup`,
              { [`${g}-rtl`]: l.value },
              w,
              m.value
            ),
            stretch: x === 'horizontal' ? 'minWidth' : null,
            getPopupContainer: i.value,
            builtinPlacements: C.value,
            popupPlacement: I.value,
            popupVisible: a.value,
            popupAlign: P && { offset: P },
            action: L ? [] : [d.value],
            mouseEnterDelay: r.value,
            mouseLeaveDelay: c.value,
            onPopupVisibleChange: D,
            forceRender: S || s.value,
            popupAnimation: H.value
          },
          { popup: n.popup, default: n.default }
        )
      }
    }
  }),
  oo = (e, t) => {
    let { slots: n, attrs: o } = t
    var a
    const { prefixCls: i, mode: l } = Ie()
    return u(
      'ul',
      R(
        R({}, o),
        {},
        {
          class: oe(
            i.value,
            `${i.value}-sub`,
            `${i.value}-${l.value === 'inline' ? 'inline' : 'vertical'}`
          ),
          'data-menu-list': !0
        }
      ),
      [(a = n.default) === null || a === void 0 ? void 0 : a.call(n)]
    )
  }
oo.displayName = 'SubMenuList'
const ao = oo,
  xi = G({
    compatConfig: { MODE: 3 },
    name: 'InlineSubMenuList',
    inheritAttrs: !1,
    props: { id: String, open: Boolean, keyPath: Array },
    setup(e, t) {
      let { slots: n } = t
      const o = $(() => 'inline'),
        { motion: a, mode: i, defaultMotions: l } = Ie(),
        r = $(() => i.value === o.value),
        c = Y(!r.value),
        p = $(() => (r.value ? e.open : !1))
      ae(
        i,
        () => {
          r.value && (c.value = !1)
        },
        { flush: 'post' }
      )
      const d = $(() => {
        var s, b
        const f =
            a.value ||
            ((s = l.value) === null || s === void 0 ? void 0 : s[o.value]) ||
            ((b = l.value) === null || b === void 0 ? void 0 : b.other),
          m = typeof f == 'function' ? f() : f
        return v(v({}, m), { appear: e.keyPath.length <= 1 })
      })
      return () => {
        var s
        return c.value
          ? null
          : u(
              pt,
              { mode: o.value },
              {
                default: () => [
                  u(Mo, d.value, {
                    default: () => [
                      Bo(
                        u(
                          ao,
                          { id: e.id },
                          {
                            default: () => [
                              (s = n.default) === null || s === void 0
                                ? void 0
                                : s.call(n)
                            ]
                          }
                        ),
                        [[Oo, p.value]]
                      )
                    ]
                  })
                ]
              }
            )
      }
    }
  })
let fn = 0
const Ci = () => ({
    icon: V.any,
    title: V.any,
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
    originItemValue: _e()
  }),
  Ge = G({
    compatConfig: { MODE: 3 },
    name: 'ASubMenu',
    inheritAttrs: !1,
    props: Ci(),
    slots: Object,
    setup(e, t) {
      let { slots: n, attrs: o, emit: a } = t
      var i, l
      Qn(!1)
      const r = Xt(),
        c = An(),
        p = typeof c.vnode.key == 'symbol' ? String(c.vnode.key) : c.vnode.key
      Me(
        typeof c.vnode.key != 'symbol',
        'SubMenu',
        `SubMenu \`:key="${String(p)}"\` not support Symbol type`
      )
      const d = Jt(p) ? p : `sub_menu_${++fn}_$$_not_set_key`,
        s =
          (i = e.eventKey) !== null && i !== void 0
            ? i
            : Jt(p)
            ? `sub_menu_${++fn}_$$_${p}`
            : d,
        { parentEventKeys: b, parentInfo: f, parentKeys: m } = jt(),
        S = $(() => [...m.value, d]),
        C = N([]),
        I = {
          eventKey: s,
          key: d,
          parentEventKeys: b,
          childrenEventKeys: C,
          parentKeys: m
        }
      ;(l = f.childrenEventKeys) === null || l === void 0 || l.value.push(s),
        Re(() => {
          var y
          f.childrenEventKeys &&
            (f.childrenEventKeys.value =
              (y = f.childrenEventKeys) === null || y === void 0
                ? void 0
                : y.value.filter(B => B != s))
        }),
        gi(s, d, I)
      const {
          prefixCls: T,
          activeKeys: D,
          disabled: H,
          changeActiveKeys: g,
          mode: w,
          inlineCollapsed: x,
          openKeys: P,
          overflowDisabled: L,
          onOpenChange: M,
          registerMenuInfo: j,
          unRegisterMenuInfo: J,
          selectedSubMenuKeys: te,
          expandIcon: se,
          theme: K
        } = Ie(),
        Z = p != null,
        E = !r && (Zn() || !Z)
      di(E),
        ((r && Z) || (!r && !Z) || E) &&
          (j(s, I),
          Re(() => {
            J(s)
          }))
      const ie = $(() => `${T.value}-submenu`),
        q = $(() => H.value || e.disabled),
        fe = N(),
        _ = N(),
        W = $(() => P.value.includes(d)),
        Q = $(() => !L.value && W.value),
        re = $(() => te.value.includes(d)),
        de = N(!1)
      ae(
        D,
        () => {
          de.value = !!D.value.find(y => y === d)
        },
        { immediate: !0 }
      )
      const le = y => {
          q.value ||
            (a('titleClick', y, d), w.value === 'inline' && M(d, !W.value))
        },
        h = y => {
          q.value || (g(S.value), a('mouseenter', y))
        },
        O = y => {
          q.value || (g([]), a('mouseleave', y))
        },
        k = no($(() => S.value.length)),
        X = y => {
          w.value !== 'inline' && M(d, y)
        },
        U = () => {
          g(S.value)
        },
        F = s && `${s}-popup`,
        be = $(() =>
          oe(T.value, `${T.value}-${e.theme || K.value}`, e.popupClassName)
        ),
        ve = (y, B) => {
          if (!B)
            return x.value && !m.value.length && y && typeof y == 'string'
              ? u('div', { class: `${T.value}-inline-collapsed-noicon` }, [
                  y.charAt(0)
                ])
              : u('span', { class: `${T.value}-title-content` }, [y])
          const z = Kt(y) && y.type === 'span'
          return u(ct, null, [
            We(
              typeof B == 'function' ? B(e.originItemValue) : B,
              { class: `${T.value}-item-icon` },
              !1
            ),
            z ? y : u('span', { class: `${T.value}-title-content` }, [y])
          ])
        },
        Le = $(() =>
          w.value !== 'inline' && S.value.length > 1 ? 'vertical' : w.value
        ),
        at = $(() => (w.value === 'horizontal' ? 'vertical' : w.value)),
        je = $(() => (Le.value === 'horizontal' ? 'vertical' : Le.value)),
        A = () => {
          var y, B
          const z = ie.value,
            ne =
              (y = e.icon) !== null && y !== void 0
                ? y
                : (B = n.icon) === null || B === void 0
                ? void 0
                : B.call(n, e),
            ee = e.expandIcon || n.expandIcon || se.value,
            pe = ve(Ue(n, e, 'title'), ne)
          return u(
            'div',
            {
              style: k.value,
              class: `${z}-title`,
              tabindex: q.value ? null : -1,
              ref: fe,
              title: typeof pe == 'string' ? pe : null,
              'data-menu-id': d,
              'aria-expanded': Q.value,
              'aria-haspopup': !0,
              'aria-controls': F,
              'aria-disabled': q.value,
              onClick: le,
              onFocus: U
            },
            [
              pe,
              w.value !== 'horizontal' && ee
                ? ee(v(v({}, e), { isOpen: Q.value }))
                : u('i', { class: `${z}-arrow` }, null)
            ]
          )
        }
      return () => {
        var y
        if (r)
          return Z
            ? (y = n.default) === null || y === void 0
              ? void 0
              : y.call(n)
            : null
        const B = ie.value
        let z = () => null
        if (!L.value && w.value !== 'inline') {
          const ne = w.value === 'horizontal' ? [0, 8] : [10, 0]
          z = () =>
            u(
              vn,
              {
                mode: Le.value,
                prefixCls: B,
                visible: !e.internalPopupClose && Q.value,
                popupClassName: be.value,
                popupOffset: e.popupOffset || ne,
                disabled: q.value,
                onVisibleChange: X
              },
              {
                default: () => [A()],
                popup: () =>
                  u(
                    pt,
                    { mode: je.value },
                    {
                      default: () => [
                        u(ao, { id: F, ref: _ }, { default: n.default })
                      ]
                    }
                  )
              }
            )
        } else z = () => u(vn, null, { default: A })
        return u(
          pt,
          { mode: at.value },
          {
            default: () => [
              u(
                Ze.Item,
                R(
                  R({ component: 'li' }, o),
                  {},
                  {
                    role: 'none',
                    class: oe(B, `${B}-${w.value}`, o.class, {
                      [`${B}-open`]: Q.value,
                      [`${B}-active`]: de.value,
                      [`${B}-selected`]: re.value,
                      [`${B}-disabled`]: q.value
                    }),
                    onMouseenter: h,
                    onMouseleave: O,
                    'data-submenu-id': d
                  }
                ),
                {
                  default: () =>
                    u(ct, null, [
                      z(),
                      !L.value &&
                        u(
                          xi,
                          { id: F, open: Q.value, keyPath: S.value },
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
function io(e, t) {
  return e.classList
    ? e.classList.contains(t)
    : ` ${e.className} `.indexOf(` ${t} `) > -1
}
function pn(e, t) {
  e.classList
    ? e.classList.add(t)
    : io(e, t) || (e.className = `${e.className} ${t}`)
}
function mn(e, t) {
  if (e.classList) e.classList.remove(t)
  else if (io(e, t)) {
    const n = e.className
    e.className = ` ${n} `.replace(` ${t} `, ' ')
  }
}
const wi = function() {
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
        ;(n.style.height = '0px'), (n.style.opacity = '0'), pn(n, e)
      },
      onEnter: n => {
        Eo(() => {
          ;(n.style.height = `${n.scrollHeight}px`), (n.style.opacity = '1')
        })
      },
      onAfterEnter: n => {
        n && (mn(n, e), (n.style.height = null), (n.style.opacity = null))
      },
      onBeforeLeave: n => {
        pn(n, e),
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
          (mn(n, e),
          n.style && ((n.style.height = null), (n.style.opacity = null)))
      }
    }
  },
  Ii = wi,
  Ti = () => ({ title: V.any, originItemValue: _e() }),
  mt = G({
    compatConfig: { MODE: 3 },
    name: 'AMenuItemGroup',
    inheritAttrs: !1,
    props: Ti(),
    slots: Object,
    setup(e, t) {
      let { slots: n, attrs: o } = t
      const { prefixCls: a } = Ie(),
        i = $(() => `${a.value}-item-group`),
        l = Xt()
      return () => {
        var r, c
        return l
          ? (r = n.default) === null || r === void 0
            ? void 0
            : r.call(n)
          : u(
              'li',
              R(
                R({}, o),
                {},
                { onClick: p => p.stopPropagation(), class: i.value }
              ),
              [
                u(
                  'div',
                  {
                    title: typeof e.title == 'string' ? e.title : void 0,
                    class: `${i.value}-title`
                  },
                  [Ue(n, e, 'title')]
                ),
                u('ul', { class: `${i.value}-list` }, [
                  (c = n.default) === null || c === void 0 ? void 0 : c.call(n)
                ])
              ]
            )
      }
    }
  }),
  Pi = () => ({ prefixCls: String, dashed: Boolean }),
  gt = G({
    compatConfig: { MODE: 3 },
    name: 'AMenuDivider',
    props: Pi(),
    setup(e) {
      const { prefixCls: t } = Ie(),
        n = $(() => ({
          [`${t.value}-item-divider`]: !0,
          [`${t.value}-item-divider-dashed`]: !!e.dashed
        }))
      return () => u('li', { class: n.value }, null)
    }
  })
var _i =
  (globalThis && globalThis.__rest) ||
  function(e, t) {
    var n = {}
    for (var o in e)
      Object.prototype.hasOwnProperty.call(e, o) &&
        t.indexOf(o) < 0 &&
        (n[o] = e[o])
    if (e != null && typeof Object.getOwnPropertySymbols == 'function')
      for (var a = 0, o = Object.getOwnPropertySymbols(e); a < o.length; a++)
        t.indexOf(o[a]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(e, o[a]) &&
          (n[o[a]] = e[o[a]])
    return n
  }
function Dt(e, t, n) {
  return (e || [])
    .map((o, a) => {
      if (o && typeof o == 'object') {
        const i = o,
          { label: l, children: r, key: c, type: p } = i,
          d = _i(i, ['label', 'children', 'key', 'type']),
          s = c ?? `tmp-${a}`,
          b = n ? n.parentKeys.slice() : [],
          f = [],
          m = {
            eventKey: s,
            key: s,
            parentEventKeys: Y(b),
            parentKeys: Y(b),
            childrenEventKeys: Y(f),
            isLeaf: !1
          }
        if (r || p === 'group') {
          if (p === 'group') {
            const C = Dt(r, t, n)
            return u(
              mt,
              R(R({ key: s }, d), {}, { title: l, originItemValue: o }),
              { default: () => [C] }
            )
          }
          t.set(s, m), n && n.childrenEventKeys.push(s)
          const S = Dt(r, t, {
            childrenEventKeys: f,
            parentKeys: [].concat(b, s)
          })
          return u(
            Ge,
            R(R({ key: s }, d), {}, { title: l, originItemValue: o }),
            { default: () => [S] }
          )
        }
        return p === 'divider'
          ? u(gt, R({ key: s }, d), null)
          : ((m.isLeaf = !0),
            t.set(s, m),
            u(Fe, R(R({ key: s }, d), {}, { originItemValue: o }), {
              default: () => [l]
            }))
      }
      return null
    })
    .filter(o => o)
}
function Mi(e) {
  const t = N([]),
    n = N(!1),
    o = N(new Map())
  return (
    ae(
      () => e.items,
      () => {
        const a = new Map()
        ;(n.value = !1),
          e.items
            ? ((n.value = !0), (t.value = Dt(e.items, a)))
            : (t.value = void 0),
          (o.value = a)
      },
      { immediate: !0, deep: !0 }
    ),
    { itemsNodes: t, store: o, hasItmes: n }
  )
}
const Bi = e => {
    const {
      componentCls: t,
      motionDurationSlow: n,
      menuHorizontalHeight: o,
      colorSplit: a,
      lineWidth: i,
      lineType: l,
      menuItemPaddingInline: r
    } = e
    return {
      [`${t}-horizontal`]: {
        lineHeight: `${o}px`,
        border: 0,
        borderBottom: `${i}px ${l} ${a}`,
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
          paddingInline: r
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
  Oi = Bi,
  Ei = e => {
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
  Ai = Ei,
  gn = e => v({}, yo(e)),
  Ri = (e, t) => {
    const {
      componentCls: n,
      colorItemText: o,
      colorItemTextSelected: a,
      colorGroupTitle: i,
      colorItemBg: l,
      colorSubItemBg: r,
      colorItemBgSelected: c,
      colorActiveBarHeight: p,
      colorActiveBarWidth: d,
      colorActiveBarBorderSize: s,
      motionDurationSlow: b,
      motionEaseInOut: f,
      motionEaseOut: m,
      menuItemPaddingInline: S,
      motionDurationMid: C,
      colorItemTextHover: I,
      lineType: T,
      colorSplit: D,
      colorItemTextDisabled: H,
      colorDangerItemText: g,
      colorDangerItemTextHover: w,
      colorDangerItemTextSelected: x,
      colorDangerItemBgActive: P,
      colorDangerItemBgSelected: L,
      colorItemBgHover: M,
      menuSubMenuBg: j,
      colorItemTextSelectedHorizontal: J,
      colorItemBgSelectedHorizontal: te
    } = e
    return {
      [`${n}-${t}`]: {
        color: o,
        background: l,
        [`&${n}-root:focus-visible`]: v({}, gn(e)),
        [`${n}-item-group-title`]: { color: i },
        [`${n}-submenu-selected`]: { [`> ${n}-submenu-title`]: { color: a } },
        [`${n}-item-disabled, ${n}-submenu-disabled`]: {
          color: `${H} !important`
        },
        [`${n}-item:hover, ${n}-submenu-title:hover`]: {
          [`&:not(${n}-item-selected):not(${n}-submenu-selected)`]: { color: I }
        },
        [`&:not(${n}-horizontal)`]: {
          [`${n}-item:not(${n}-item-selected)`]: {
            '&:hover': { backgroundColor: M },
            '&:active': { backgroundColor: c }
          },
          [`${n}-submenu-title`]: {
            '&:hover': { backgroundColor: M },
            '&:active': { backgroundColor: c }
          }
        },
        [`${n}-item-danger`]: {
          color: g,
          [`&${n}-item:hover`]: {
            [`&:not(${n}-item-selected):not(${n}-submenu-selected)`]: {
              color: w
            }
          },
          [`&${n}-item:active`]: { background: P }
        },
        [`${n}-item a`]: { '&, &:hover': { color: 'inherit' } },
        [`${n}-item-selected`]: {
          color: a,
          [`&${n}-item-danger`]: { color: x },
          'a, a:hover': { color: 'inherit' }
        },
        [`& ${n}-item-selected`]: {
          backgroundColor: c,
          [`&${n}-item-danger`]: { backgroundColor: L }
        },
        [`${n}-item, ${n}-submenu-title`]: {
          [`&:not(${n}-item-disabled):focus-visible`]: v({}, gn(e))
        },
        [`&${n}-submenu > ${n}`]: { backgroundColor: j },
        [`&${n}-popup > ${n}`]: { backgroundColor: l },
        [`&${n}-horizontal`]: v(
          v({}, t === 'dark' ? { borderBottom: 0 } : {}),
          {
            [`> ${n}-item, > ${n}-submenu`]: {
              top: s,
              marginTop: -s,
              marginBottom: 0,
              borderRadius: 0,
              '&::after': {
                position: 'absolute',
                insetInline: S,
                bottom: 0,
                borderBottom: `${p}px solid transparent`,
                transition: `border-color ${b} ${f}`,
                content: '""'
              },
              '&:hover, &-active, &-open': {
                '&::after': { borderBottomWidth: p, borderBottomColor: J }
              },
              '&-selected': {
                color: J,
                backgroundColor: te,
                '&::after': { borderBottomWidth: p, borderBottomColor: J }
              }
            }
          }
        ),
        [`&${n}-root`]: {
          [`&${n}-inline, &${n}-vertical`]: {
            borderInlineEnd: `${s}px ${T} ${D}`
          }
        },
        [`&${n}-inline`]: {
          [`${n}-sub${n}-inline`]: { background: r },
          [`${n}-item, ${n}-submenu-title`]:
            s && d ? { width: `calc(100% + ${s}px)` } : {},
          [`${n}-item`]: {
            position: 'relative',
            '&::after': {
              position: 'absolute',
              insetBlock: 0,
              insetInlineEnd: 0,
              borderInlineEnd: `${d}px solid ${a}`,
              transform: 'scaleY(0.0001)',
              opacity: 0,
              transition: [`transform ${C} ${m}`, `opacity ${C} ${m}`].join(
                ','
              ),
              content: '""'
            },
            [`&${n}-item-danger`]: { '&::after': { borderInlineEndColor: x } }
          },
          [`${n}-selected, ${n}-item-selected`]: {
            '&::after': {
              transform: 'scaleY(1)',
              opacity: 1,
              transition: [`transform ${C} ${f}`, `opacity ${C} ${f}`].join(',')
            }
          }
        }
      }
    }
  },
  bn = Ri,
  hn = e => {
    const {
        componentCls: t,
        menuItemHeight: n,
        itemMarginInline: o,
        padding: a,
        menuArrowSize: i,
        marginXS: l,
        marginXXS: r
      } = e,
      c = a + i + l
    return {
      [`${t}-item`]: { position: 'relative' },
      [`${t}-item, ${t}-submenu-title`]: {
        height: n,
        lineHeight: `${n}px`,
        paddingInline: a,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        marginInline: o,
        marginBlock: r,
        width: `calc(100% - ${o * 2}px)`
      },
      [`${t}-submenu`]: { paddingBottom: 0.02 },
      [`> ${t}-item,
            > ${t}-submenu > ${t}-submenu-title`]: {
        height: n,
        lineHeight: `${n}px`
      },
      [`${t}-item-group-list ${t}-submenu-title,
            ${t}-submenu-title`]: { paddingInlineEnd: c }
    }
  },
  Di = e => {
    const {
        componentCls: t,
        iconCls: n,
        menuItemHeight: o,
        colorTextLightSolid: a,
        dropdownWidth: i,
        controlHeightLG: l,
        motionDurationMid: r,
        motionEaseOut: c,
        paddingXL: p,
        fontSizeSM: d,
        fontSizeLG: s,
        motionDurationSlow: b,
        paddingXS: f,
        boxShadowSecondary: m
      } = e,
      S = {
        height: o,
        lineHeight: `${o}px`,
        listStylePosition: 'inside',
        listStyleType: 'disc'
      }
    return [
      {
        [t]: {
          '&-inline, &-vertical': v(
            { [`&${t}-root`]: { boxShadow: 'none' } },
            hn(e)
          )
        },
        [`${t}-submenu-popup`]: {
          [`${t}-vertical`]: v(v({}, hn(e)), { boxShadow: m })
        }
      },
      {
        [`${t}-submenu-popup ${t}-vertical${t}-sub`]: {
          minWidth: i,
          maxHeight: `calc(100vh - ${l * 2.5}px)`,
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
                `border-color ${b}`,
                `background ${b}`,
                `padding ${r} ${c}`
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
            [`& > ${t}-submenu > ${t}-submenu-title`]: S,
            [`& ${t}-item-group-title`]: { paddingInlineStart: p }
          },
          [`${t}-item`]: S
        }
      },
      {
        [`${t}-inline-collapsed`]: {
          width: o * 2,
          [`&${t}-root`]: {
            [`${t}-item, ${t}-submenu ${t}-submenu-title`]: {
              [`> ${t}-inline-collapsed-noicon`]: {
                fontSize: s,
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
              fontSize: s,
              lineHeight: `${o}px`,
              '+ span': { display: 'inline-block', opacity: 0 }
            }
          },
          [`${t}-item-icon, ${n}`]: { display: 'inline-block' },
          '&-tooltip': {
            pointerEvents: 'none',
            [`${t}-item-icon, ${n}`]: { display: 'none' },
            'a, a:hover': { color: a }
          },
          [`${t}-item-group-title`]: v(v({}, ht), { paddingInline: f })
        }
      }
    ]
  },
  Li = Di,
  $n = e => {
    const {
      componentCls: t,
      fontSize: n,
      motionDurationSlow: o,
      motionDurationMid: a,
      motionEaseInOut: i,
      motionEaseOut: l,
      iconCls: r,
      controlHeightSM: c
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
        [`${t}-item-icon, ${r}`]: {
          minWidth: n,
          fontSize: n,
          transition: [
            `font-size ${a} ${l}`,
            `margin ${o} ${i}`,
            `color ${o}`
          ].join(','),
          '+ span': {
            marginInlineStart: c - n,
            opacity: 1,
            transition: [`opacity ${o} ${i}`, `margin ${o}`, `color ${o}`].join(
              ','
            )
          }
        },
        [`${t}-item-icon`]: v({}, So()),
        [`&${t}-item-only-child`]: {
          [`> ${r}, > ${t}-item-icon`]: { marginInlineEnd: 0 }
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
  yn = e => {
    const {
      componentCls: t,
      motionDurationSlow: n,
      motionEaseInOut: o,
      borderRadius: a,
      menuArrowSize: i,
      menuArrowOffset: l
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
            borderRadius: a,
            transition: [
              `background ${n} ${o}`,
              `transform ${n} ${o}`,
              `top ${n} ${o}`,
              `color ${n} ${o}`
            ].join(','),
            content: '""'
          },
          '&::before': { transform: `rotate(45deg) translateY(-${l})` },
          '&::after': { transform: `rotate(-45deg) translateY(${l})` }
        }
      }
    }
  },
  ki = e => {
    const {
      antCls: t,
      componentCls: n,
      fontSize: o,
      motionDurationSlow: a,
      motionDurationMid: i,
      motionEaseInOut: l,
      lineHeight: r,
      paddingXS: c,
      padding: p,
      colorSplit: d,
      lineWidth: s,
      zIndexPopup: b,
      borderRadiusLG: f,
      radiusSubMenuItem: m,
      menuArrowSize: S,
      menuArrowOffset: C,
      lineType: I,
      menuPanelMaskInset: T
    } = e
    return [
      {
        '': { [`${n}`]: v(v({}, Ne()), { '&-hidden': { display: 'none' } }) },
        [`${n}-submenu-hidden`]: { display: 'none' }
      },
      {
        [n]: v(
          v(
            v(
              v(
                v(v(v({}, yt(e)), Ne()), {
                  marginBottom: 0,
                  paddingInlineStart: 0,
                  fontSize: o,
                  lineHeight: 0,
                  listStyle: 'none',
                  outline: 'none',
                  transition: `width ${a} cubic-bezier(0.2, 0, 0, 1) 0s`,
                  'ul, ol': { margin: 0, padding: 0, listStyle: 'none' },
                  '&-overflow': {
                    display: 'flex',
                    [`${n}-item`]: { flex: 'none' }
                  },
                  [`${n}-item, ${n}-submenu, ${n}-submenu-title`]: {
                    borderRadius: e.radiusItem
                  },
                  [`${n}-item-group-title`]: {
                    padding: `${c}px ${p}px`,
                    fontSize: o,
                    lineHeight: r,
                    transition: `all ${a}`
                  },
                  [`&-horizontal ${n}-submenu`]: {
                    transition: [
                      `border-color ${a} ${l}`,
                      `background ${a} ${l}`
                    ].join(',')
                  },
                  [`${n}-submenu, ${n}-submenu-inline`]: {
                    transition: [
                      `border-color ${a} ${l}`,
                      `background ${a} ${l}`,
                      `padding ${i} ${l}`
                    ].join(',')
                  },
                  [`${n}-submenu ${n}-sub`]: {
                    cursor: 'initial',
                    transition: [
                      `background ${a} ${l}`,
                      `padding ${a} ${l}`
                    ].join(',')
                  },
                  [`${n}-title-content`]: { transition: `color ${a}` },
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
                    borderStyle: I,
                    borderWidth: 0,
                    borderTopWidth: s,
                    marginBlock: s,
                    padding: 0,
                    '&-dashed': { borderStyle: 'dashed' }
                  }
                }),
                $n(e)
              ),
              {
                [`${n}-item-group`]: {
                  [`${n}-item-group-list`]: {
                    margin: 0,
                    padding: 0,
                    [`${n}-item, ${n}-submenu-title`]: {
                      paddingInline: `${o * 2}px ${p}px`
                    }
                  }
                },
                '&-submenu': {
                  '&-popup': {
                    position: 'absolute',
                    zIndex: b,
                    background: 'transparent',
                    borderRadius: f,
                    boxShadow: 'none',
                    transformOrigin: '0 0',
                    '&::before': {
                      position: 'absolute',
                      inset: `${T}px 0 0`,
                      zIndex: -1,
                      width: '100%',
                      height: '100%',
                      opacity: 0,
                      content: '""'
                    }
                  },
                  '&-placement-rightTop::before': {
                    top: 0,
                    insetInlineStart: T
                  },
                  [`> ${n}`]: v(v(v({ borderRadius: f }, $n(e)), yn(e)), {
                    [`${n}-item, ${n}-submenu > ${n}-submenu-title`]: {
                      borderRadius: m
                    },
                    [`${n}-submenu-title::after`]: {
                      transition: `transform ${a} ${l}`
                    }
                  })
                }
              }
            ),
            yn(e)
          ),
          {
            [`&-inline-collapsed ${n}-submenu-arrow,
        &-inline ${n}-submenu-arrow`]: {
              '&::before': { transform: `rotate(-45deg) translateX(${C})` },
              '&::after': { transform: `rotate(45deg) translateX(-${C})` }
            },
            [`${n}-submenu-open${n}-submenu-inline > ${n}-submenu-title > ${n}-submenu-arrow`]: {
              transform: `translateY(-${S * 0.2}px)`,
              '&::after': { transform: `rotate(-45deg) translateX(-${C})` },
              '&::before': { transform: `rotate(45deg) translateX(${C})` }
            }
          }
        )
      },
      { [`${t}-layout-header`]: { [n]: { lineHeight: 'inherit' } } }
    ]
  },
  Hi = (e, t) =>
    $t(
      'Menu',
      (o, a) => {
        let { overrideComponentToken: i } = a
        if ((t == null ? void 0 : t.value) === !1) return []
        const {
            colorBgElevated: l,
            colorPrimary: r,
            colorError: c,
            colorErrorHover: p,
            colorTextLightSolid: d
          } = o,
          { controlHeightLG: s, fontSize: b } = o,
          f = (b / 7) * 5,
          m = Qe(o, {
            menuItemHeight: s,
            menuItemPaddingInline: o.margin,
            menuArrowSize: f,
            menuHorizontalHeight: s * 1.15,
            menuArrowOffset: `${f * 0.25}px`,
            menuPanelMaskInset: -7,
            menuSubMenuBg: l
          }),
          S = new an(d).setAlpha(0.65).toRgbString(),
          C = Qe(
            m,
            {
              colorItemText: S,
              colorItemTextHover: d,
              colorGroupTitle: S,
              colorItemTextSelected: d,
              colorItemBg: '#001529',
              colorSubItemBg: '#000c17',
              colorItemBgActive: 'transparent',
              colorItemBgSelected: r,
              colorActiveBarWidth: 0,
              colorActiveBarHeight: 0,
              colorActiveBarBorderSize: 0,
              colorItemTextDisabled: new an(d).setAlpha(0.25).toRgbString(),
              colorDangerItemText: c,
              colorDangerItemTextHover: p,
              colorDangerItemTextSelected: d,
              colorDangerItemBgActive: c,
              colorDangerItemBgSelected: c,
              menuSubMenuBg: '#001529',
              colorItemTextSelectedHorizontal: d,
              colorItemBgSelectedHorizontal: r
            },
            v({}, i)
          )
        return [
          ki(m),
          Oi(m),
          Li(m),
          bn(m, 'light'),
          bn(C, 'dark'),
          Ai(m),
          ai(m),
          vt(m, 'slide-up'),
          vt(m, 'slide-down'),
          Fo(m, 'zoom-big')
        ]
      },
      o => {
        const {
          colorPrimary: a,
          colorError: i,
          colorTextDisabled: l,
          colorErrorBg: r,
          colorText: c,
          colorTextDescription: p,
          colorBgContainer: d,
          colorFillAlter: s,
          colorFillContent: b,
          lineWidth: f,
          lineWidthBold: m,
          controlItemBgActive: S,
          colorBgTextHover: C
        } = o
        return {
          dropdownWidth: 160,
          zIndexPopup: o.zIndexPopupBase + 50,
          radiusItem: o.borderRadiusLG,
          radiusSubMenuItem: o.borderRadiusSM,
          colorItemText: c,
          colorItemTextHover: c,
          colorItemTextHoverHorizontal: a,
          colorGroupTitle: p,
          colorItemTextSelected: a,
          colorItemTextSelectedHorizontal: a,
          colorItemBg: d,
          colorItemBgHover: C,
          colorItemBgActive: b,
          colorSubItemBg: s,
          colorItemBgSelected: S,
          colorItemBgSelectedHorizontal: 'transparent',
          colorActiveBarWidth: 0,
          colorActiveBarHeight: m,
          colorActiveBarBorderSize: f,
          colorItemTextDisabled: l,
          colorDangerItemText: i,
          colorDangerItemTextHover: i,
          colorDangerItemTextSelected: i,
          colorDangerItemBgActive: r,
          colorDangerItemBgSelected: r,
          itemMarginInline: o.marginXXS
        }
      }
    )(e),
  Ki = () => ({
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
  Sn = [],
  Oe = G({
    compatConfig: { MODE: 3 },
    name: 'AMenu',
    inheritAttrs: !1,
    props: Ki(),
    slots: Object,
    setup(e, t) {
      let { slots: n, emit: o, attrs: a } = t
      const { direction: i, getPrefixCls: l } = Ce('menu', e),
        r = Vn(),
        c = $(() => {
          var h
          return l(
            'menu',
            e.prefixCls ||
              ((h = r == null ? void 0 : r.prefixCls) === null || h === void 0
                ? void 0
                : h.value)
          )
        }),
        [p, d] = Hi(
          c,
          $(() => !r)
        ),
        s = N(new Map()),
        b = Ee(pi, Y(void 0)),
        f = $(() => (b.value !== void 0 ? b.value : e.inlineCollapsed)),
        { itemsNodes: m } = Mi(e),
        S = N(!1)
      et(() => {
        S.value = !0
      }),
        Ae(() => {
          Me(
            !(e.inlineCollapsed === !0 && e.mode !== 'inline'),
            'Menu',
            '`inlineCollapsed` should only be used when `mode` is inline.'
          ),
            Me(
              !(b.value !== void 0 && e.inlineCollapsed === !0),
              'Menu',
              '`inlineCollapsed` not control Menu under Sider. Should set `collapsed` on Sider instead.'
            )
        })
      const C = Y([]),
        I = Y([]),
        T = Y({})
      ae(
        s,
        () => {
          const h = {}
          for (const O of s.value.values()) h[O.key] = O
          T.value = h
        },
        { flush: 'post' }
      ),
        Ae(() => {
          if (e.activeKey !== void 0) {
            let h = []
            const O = e.activeKey ? T.value[e.activeKey] : void 0
            O && e.activeKey !== void 0
              ? (h = Bt([].concat(rt(O.parentKeys), e.activeKey)))
              : (h = []),
              qe(C.value, h) || (C.value = h)
          }
        }),
        ae(
          () => e.selectedKeys,
          h => {
            h && (I.value = h.slice())
          },
          { immediate: !0, deep: !0 }
        )
      const D = Y([])
      ae(
        [T, I],
        () => {
          let h = []
          I.value.forEach(O => {
            const k = T.value[O]
            k && (h = h.concat(rt(k.parentKeys)))
          }),
            (h = Bt(h)),
            qe(D.value, h) || (D.value = h)
        },
        { immediate: !0 }
      )
      const H = h => {
          if (e.selectable) {
            const { key: O } = h,
              k = I.value.includes(O)
            let X
            e.multiple
              ? k
                ? (X = I.value.filter(F => F !== O))
                : (X = [...I.value, O])
              : (X = [O])
            const U = v(v({}, h), { selectedKeys: X })
            qe(X, I.value) ||
              (e.selectedKeys === void 0 && (I.value = X),
              o('update:selectedKeys', X),
              k && e.multiple ? o('deselect', U) : o('select', U))
          }
          M.value !== 'inline' && !e.multiple && g.value.length && te(Sn)
        },
        g = Y([])
      ae(
        () => e.openKeys,
        function() {
          let h =
            arguments.length > 0 && arguments[0] !== void 0
              ? arguments[0]
              : g.value
          qe(g.value, h) || (g.value = h.slice())
        },
        { immediate: !0, deep: !0 }
      )
      let w
      const x = h => {
          clearTimeout(w),
            (w = setTimeout(() => {
              e.activeKey === void 0 && (C.value = h),
                o('update:activeKey', h[h.length - 1])
            }))
        },
        P = $(() => !!e.disabled),
        L = $(() => i.value === 'rtl'),
        M = Y('vertical'),
        j = N(!1)
      Ae(() => {
        var h
        ;(e.mode === 'inline' || e.mode === 'vertical') && f.value
          ? ((M.value = 'vertical'), (j.value = f.value))
          : ((M.value = e.mode), (j.value = !1)),
          !((h = r == null ? void 0 : r.mode) === null || h === void 0) &&
            h.value &&
            (M.value = r.mode.value)
      })
      const J = $(() => M.value === 'inline'),
        te = h => {
          ;(g.value = h), o('update:openKeys', h), o('openChange', h)
        },
        se = Y(g.value),
        K = N(!1)
      ae(
        g,
        () => {
          J.value && (se.value = g.value)
        },
        { immediate: !0 }
      ),
        ae(
          J,
          () => {
            if (!K.value) {
              K.value = !0
              return
            }
            J.value ? (g.value = se.value) : te(Sn)
          },
          { immediate: !0 }
        )
      const Z = $(() => ({
          [`${c.value}`]: !0,
          [`${c.value}-root`]: !0,
          [`${c.value}-${M.value}`]: !0,
          [`${c.value}-inline-collapsed`]: j.value,
          [`${c.value}-rtl`]: L.value,
          [`${c.value}-${e.theme}`]: !0
        })),
        E = $(() => l()),
        ie = $(() => ({
          horizontal: { name: `${E.value}-slide-up` },
          inline: Ii(`${E.value}-motion-collapse`),
          other: { name: `${E.value}-zoom-big` }
        }))
      Qn(!0)
      const q = function() {
          let h =
            arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : []
          const O = [],
            k = s.value
          return (
            h.forEach(X => {
              const { key: U, childrenEventKeys: F } = k.get(X)
              O.push(U, ...q(rt(F)))
            }),
            O
          )
        },
        fe = h => {
          var O
          o('click', h),
            H(h),
            (O = r == null ? void 0 : r.onClick) === null ||
              O === void 0 ||
              O.call(r)
        },
        _ = (h, O) => {
          var k
          const X =
            ((k = T.value[h]) === null || k === void 0
              ? void 0
              : k.childrenEventKeys) || []
          let U = g.value.filter(F => F !== h)
          if (O) U.push(h)
          else if (M.value !== 'inline') {
            const F = q(rt(X))
            U = Bt(U.filter(be => !F.includes(be)))
          }
          qe(g, U) || te(U)
        },
        W = (h, O) => {
          s.value.set(h, O), (s.value = new Map(s.value))
        },
        Q = h => {
          s.value.delete(h), (s.value = new Map(s.value))
        },
        re = Y(0),
        de = $(() => {
          var h
          return e.expandIcon ||
            n.expandIcon ||
            (!(
              (h = r == null ? void 0 : r.expandIcon) === null || h === void 0
            ) &&
              h.value)
            ? O => {
                let k = e.expandIcon || n.expandIcon
                return (
                  (k = typeof k == 'function' ? k(O) : k),
                  We(k, { class: `${c.value}-submenu-expand-icon` }, !1)
                )
              }
            : null
        })
      fi({
        prefixCls: c,
        activeKeys: C,
        openKeys: g,
        selectedKeys: I,
        changeActiveKeys: x,
        disabled: P,
        rtl: L,
        mode: M,
        inlineIndent: $(() => e.inlineIndent),
        subMenuCloseDelay: $(() => e.subMenuCloseDelay),
        subMenuOpenDelay: $(() => e.subMenuOpenDelay),
        builtinPlacements: $(() => e.builtinPlacements),
        triggerSubMenuAction: $(() => e.triggerSubMenuAction),
        getPopupContainer: $(() => e.getPopupContainer),
        inlineCollapsed: j,
        theme: $(() => e.theme),
        siderCollapsed: b,
        defaultMotions: $(() => (S.value ? ie.value : null)),
        motion: $(() => (S.value ? e.motion : null)),
        overflowDisabled: N(void 0),
        onOpenChange: _,
        onItemClick: fe,
        registerMenuInfo: W,
        unRegisterMenuInfo: Q,
        selectedSubMenuKeys: D,
        expandIcon: de,
        forceSubMenuRender: $(() => e.forceSubMenuRender),
        rootClassName: d
      })
      const le = () => {
        var h
        return (
          m.value ||
          bt((h = n.default) === null || h === void 0 ? void 0 : h.call(n))
        )
      }
      return () => {
        var h
        const O = le(),
          k =
            re.value >= O.length - 1 ||
            M.value !== 'horizontal' ||
            e.disabledOverflow,
          X = F =>
            M.value !== 'horizontal' || e.disabledOverflow
              ? F
              : F.map((be, ve) =>
                  u(
                    pt,
                    { key: be.key, overflowDisabled: ve > re.value },
                    { default: () => be }
                  )
                ),
          U =
            ((h = n.overflowedIndicator) === null || h === void 0
              ? void 0
              : h.call(n)) || u(jn, null, null)
        return p(
          u(
            Ze,
            R(
              R({}, a),
              {},
              {
                onMousedown: e.onMousedown,
                prefixCls: `${c.value}-overflow`,
                component: 'ul',
                itemComponent: Fe,
                class: [Z.value, a.class, d.value],
                role: 'menu',
                id: e.id,
                data: X(O),
                renderRawItem: F => F,
                renderRawRest: F => {
                  const be = F.length,
                    ve = be ? O.slice(-be) : null
                  return u(ct, null, [
                    u(
                      Ge,
                      {
                        eventKey: st,
                        key: st,
                        title: U,
                        disabled: k,
                        internalPopupClose: be === 0
                      },
                      { default: () => ve }
                    ),
                    u(dn, null, {
                      default: () => [
                        u(
                          Ge,
                          {
                            eventKey: st,
                            key: st,
                            title: U,
                            disabled: k,
                            internalPopupClose: be === 0
                          },
                          { default: () => ve }
                        )
                      ]
                    })
                  ])
                },
                maxCount:
                  M.value !== 'horizontal' || e.disabledOverflow
                    ? Ze.INVALIDATE
                    : Ze.RESPONSIVE,
                ssr: 'full',
                'data-menu-list': !0,
                onVisibleChange: F => {
                  re.value = F
                }
              }
            ),
            {
              default: () => [
                u(
                  Ao,
                  { to: 'body' },
                  {
                    default: () => [
                      u(
                        'div',
                        { style: { display: 'none' }, 'aria-hidden': !0 },
                        [u(dn, null, { default: () => [X(le())] })]
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
Oe.install = function(e) {
  return (
    e.component(Oe.name, Oe),
    e.component(Fe.name, Fe),
    e.component(Ge.name, Ge),
    e.component(gt.name, gt),
    e.component(mt.name, mt),
    e
  )
}
Oe.Item = Fe
Oe.Divider = gt
Oe.SubMenu = Ge
Oe.ItemGroup = mt
function zi(e) {
  const t = N(),
    n = N(!1)
  function o() {
    for (var a = arguments.length, i = new Array(a), l = 0; l < a; l++)
      i[l] = arguments[l]
    n.value ||
      (Be.cancel(t.value),
      (t.value = Be(() => {
        e(...i)
      })))
  }
  return (
    Re(() => {
      ;(n.value = !0), Be.cancel(t.value)
    }),
    o
  )
}
function Ni(e) {
  const t = N([]),
    n = N(typeof e == 'function' ? e() : e),
    o = zi(() => {
      let i = n.value
      t.value.forEach(l => {
        i = l(i)
      }),
        (t.value = []),
        (n.value = i)
    })
  function a(i) {
    t.value.push(i), o()
  }
  return [n, a]
}
const Wi = G({
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
      let { expose: n, attrs: o } = t
      const a = Y()
      function i(c) {
        var p
        ;(!((p = e.tab) === null || p === void 0) && p.disabled) || e.onClick(c)
      }
      n({ domRef: a })
      function l(c) {
        var p
        c.preventDefault(),
          c.stopPropagation(),
          e.editable.onEdit('remove', {
            key: (p = e.tab) === null || p === void 0 ? void 0 : p.key,
            event: c
          })
      }
      const r = $(() => {
        var c
        return (
          e.editable &&
          e.closable !== !1 &&
          !(!((c = e.tab) === null || c === void 0) && c.disabled)
        )
      })
      return () => {
        var c
        const {
            prefixCls: p,
            id: d,
            active: s,
            tab: { key: b, tab: f, disabled: m, closeIcon: S },
            renderWrapper: C,
            removeAriaLabel: I,
            editable: T,
            onFocus: D
          } = e,
          H = `${p}-tab`,
          g = u(
            'div',
            {
              key: b,
              ref: a,
              class: oe(H, {
                [`${H}-with-remove`]: r.value,
                [`${H}-active`]: s,
                [`${H}-disabled`]: m
              }),
              style: o.style,
              onClick: i
            },
            [
              u(
                'div',
                {
                  role: 'tab',
                  'aria-selected': s,
                  id: d && `${d}-tab-${b}`,
                  class: `${H}-btn`,
                  'aria-controls': d && `${d}-panel-${b}`,
                  'aria-disabled': m,
                  tabindex: m ? null : 0,
                  onClick: w => {
                    w.stopPropagation(), i(w)
                  },
                  onKeydown: w => {
                    ;[Se.SPACE, Se.ENTER].includes(w.which) &&
                      (w.preventDefault(), i(w))
                  },
                  onFocus: D
                },
                [typeof f == 'function' ? f() : f]
              ),
              r.value &&
                u(
                  'button',
                  {
                    type: 'button',
                    'aria-label': I || 'remove',
                    tabindex: 0,
                    class: `${H}-remove`,
                    onClick: w => {
                      w.stopPropagation(), l(w)
                    }
                  },
                  [
                    (S == null ? void 0 : S()) ||
                      ((c = T.removeIcon) === null || c === void 0
                        ? void 0
                        : c.call(T)) ||
                      '×'
                  ]
                )
            ]
          )
        return C ? C(g) : g
      }
    }
  }),
  xn = { width: 0, height: 0, left: 0, top: 0 }
function Fi(e, t) {
  const n = Y(new Map())
  return (
    Ae(() => {
      var o, a
      const i = new Map(),
        l = e.value,
        r =
          t.value.get((o = l[0]) === null || o === void 0 ? void 0 : o.key) ||
          xn,
        c = r.left + r.width
      for (let p = 0; p < l.length; p += 1) {
        const { key: d } = l[p]
        let s = t.value.get(d)
        s ||
          (s =
            t.value.get(
              (a = l[p - 1]) === null || a === void 0 ? void 0 : a.key
            ) || xn)
        const b = i.get(d) || v({}, s)
        ;(b.right = c - b.left - b.width), i.set(d, b)
      }
      n.value = new Map(i)
    }),
    n
  )
}
const lo = G({
    compatConfig: { MODE: 3 },
    name: 'AddButton',
    inheritAttrs: !1,
    props: {
      prefixCls: String,
      editable: { type: Object },
      locale: { type: Object, default: void 0 }
    },
    setup(e, t) {
      let { expose: n, attrs: o } = t
      const a = Y()
      return (
        n({ domRef: a }),
        () => {
          const { prefixCls: i, editable: l, locale: r } = e
          return !l || l.showAdd === !1
            ? null
            : u(
                'button',
                {
                  ref: a,
                  type: 'button',
                  class: `${i}-nav-add`,
                  style: o.style,
                  'aria-label':
                    (r == null ? void 0 : r.addAriaLabel) || 'Add tab',
                  onClick: c => {
                    l.onEdit('add', { event: c })
                  }
                },
                [l.addIcon ? l.addIcon() : '+']
              )
        }
      )
    }
  }),
  Gi = {
    prefixCls: { type: String },
    id: { type: String },
    tabs: { type: Object },
    rtl: { type: Boolean },
    tabBarGutter: { type: Number },
    activeKey: { type: [String, Number] },
    mobile: { type: Boolean },
    moreIcon: V.any,
    moreTransitionName: { type: String },
    editable: { type: Object },
    locale: { type: Object, default: void 0 },
    removeAriaLabel: String,
    onTabClick: { type: Function },
    popupClassName: String,
    getPopupContainer: ye()
  },
  ji = G({
    compatConfig: { MODE: 3 },
    name: 'OperationNode',
    inheritAttrs: !1,
    props: Gi,
    emits: ['tabClick'],
    slots: Object,
    setup(e, t) {
      let { attrs: n, slots: o } = t
      const [a, i] = ce(!1),
        [l, r] = ce(null),
        c = f => {
          const m = e.tabs.filter(I => !I.disabled)
          let S = m.findIndex(I => I.key === l.value) || 0
          const C = m.length
          for (let I = 0; I < C; I += 1) {
            S = (S + f + C) % C
            const T = m[S]
            if (!T.disabled) {
              r(T.key)
              return
            }
          }
        },
        p = f => {
          const { which: m } = f
          if (!a.value) {
            ;[Se.DOWN, Se.SPACE, Se.ENTER].includes(m) &&
              (i(!0), f.preventDefault())
            return
          }
          switch (m) {
            case Se.UP:
              c(-1), f.preventDefault()
              break
            case Se.DOWN:
              c(1), f.preventDefault()
              break
            case Se.ESC:
              i(!1)
              break
            case Se.SPACE:
            case Se.ENTER:
              l.value !== null && e.onTabClick(l.value, f)
              break
          }
        },
        d = $(() => `${e.id}-more-popup`),
        s = $(() => (l.value !== null ? `${d.value}-${l.value}` : null)),
        b = (f, m) => {
          f.preventDefault(),
            f.stopPropagation(),
            e.editable.onEdit('remove', { key: m, event: f })
        }
      return (
        et(() => {
          ae(
            l,
            () => {
              const f = document.getElementById(s.value)
              f && f.scrollIntoView && f.scrollIntoView(!1)
            },
            { flush: 'post', immediate: !0 }
          )
        }),
        ae(a, () => {
          a.value || r(null)
        }),
        ci({}),
        () => {
          var f
          const {
            prefixCls: m,
            id: S,
            tabs: C,
            locale: I,
            mobile: T,
            moreIcon: D = ((f = o.moreIcon) === null || f === void 0
              ? void 0
              : f.call(o)) || u(jn, null, null),
            moreTransitionName: H,
            editable: g,
            tabBarGutter: w,
            rtl: x,
            onTabClick: P,
            popupClassName: L
          } = e
          if (!C.length) return null
          const M = `${m}-dropdown`,
            j = I == null ? void 0 : I.dropdownAriaLabel,
            J = { [x ? 'marginRight' : 'marginLeft']: w }
          C.length || ((J.visibility = 'hidden'), (J.order = 1))
          const te = oe({ [`${M}-rtl`]: x, [`${L}`]: !0 }),
            se = T
              ? null
              : u(
                  si,
                  {
                    prefixCls: M,
                    trigger: ['hover'],
                    visible: a.value,
                    transitionName: H,
                    onVisibleChange: i,
                    overlayClassName: te,
                    mouseEnterDelay: 0.1,
                    mouseLeaveDelay: 0.1,
                    getPopupContainer: e.getPopupContainer
                  },
                  {
                    overlay: () =>
                      u(
                        Oe,
                        {
                          onClick: K => {
                            let { key: Z, domEvent: E } = K
                            P(Z, E), i(!1)
                          },
                          id: d.value,
                          tabindex: -1,
                          role: 'listbox',
                          'aria-activedescendant': s.value,
                          selectedKeys: [l.value],
                          'aria-label': j !== void 0 ? j : 'expanded dropdown'
                        },
                        {
                          default: () => [
                            C.map(K => {
                              var Z, E
                              const ie = g && K.closable !== !1 && !K.disabled
                              return u(
                                Fe,
                                {
                                  key: K.key,
                                  id: `${d.value}-${K.key}`,
                                  role: 'option',
                                  'aria-controls': S && `${S}-panel-${K.key}`,
                                  disabled: K.disabled
                                },
                                {
                                  default: () => [
                                    u('span', null, [
                                      typeof K.tab == 'function'
                                        ? K.tab()
                                        : K.tab
                                    ]),
                                    ie &&
                                      u(
                                        'button',
                                        {
                                          type: 'button',
                                          'aria-label':
                                            e.removeAriaLabel || 'remove',
                                          tabindex: 0,
                                          class: `${M}-menu-item-remove`,
                                          onClick: q => {
                                            q.stopPropagation(), b(q, K.key)
                                          }
                                        },
                                        [
                                          ((Z = K.closeIcon) === null ||
                                          Z === void 0
                                            ? void 0
                                            : Z.call(K)) ||
                                            ((E = g.removeIcon) === null ||
                                            E === void 0
                                              ? void 0
                                              : E.call(g)) ||
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
                      u(
                        'button',
                        {
                          type: 'button',
                          class: `${m}-nav-more`,
                          style: J,
                          tabindex: -1,
                          'aria-hidden': 'true',
                          'aria-haspopup': 'listbox',
                          'aria-controls': d.value,
                          id: `${S}-more`,
                          'aria-expanded': a.value,
                          onKeydown: p
                        },
                        [D]
                      )
                  }
                )
          return u(
            'div',
            { class: oe(`${m}-nav-operations`, n.class), style: n.style },
            [se, u(lo, { prefixCls: m, locale: I, editable: g }, null)]
          )
        }
      )
    }
  }),
  ro = Symbol('tabsContextKey'),
  Xi = e => {
    De(ro, e)
  },
  so = () => Ee(ro, { tabs: Y([]), prefixCls: Y() }),
  Vi = 0.1,
  Cn = 0.01,
  ut = 20,
  wn = Math.pow(0.995, ut)
function Yi(e, t) {
  const [n, o] = ce(),
    [a, i] = ce(0),
    [l, r] = ce(0),
    [c, p] = ce(),
    d = Y()
  function s(g) {
    const { screenX: w, screenY: x } = g.touches[0]
    o({ x: w, y: x }), clearInterval(d.value)
  }
  function b(g) {
    if (!n.value) return
    g.preventDefault()
    const { screenX: w, screenY: x } = g.touches[0],
      P = w - n.value.x,
      L = x - n.value.y
    t(P, L), o({ x: w, y: x })
    const M = Date.now()
    r(M - a.value), i(M), p({ x: P, y: L })
  }
  function f() {
    if (!n.value) return
    const g = c.value
    if ((o(null), p(null), g)) {
      const w = g.x / l.value,
        x = g.y / l.value,
        P = Math.abs(w),
        L = Math.abs(x)
      if (Math.max(P, L) < Vi) return
      let M = w,
        j = x
      d.value = setInterval(() => {
        if (Math.abs(M) < Cn && Math.abs(j) < Cn) {
          clearInterval(d.value)
          return
        }
        ;(M *= wn), (j *= wn), t(M * ut, j * ut)
      }, ut)
    }
  }
  const m = Y()
  function S(g) {
    const { deltaX: w, deltaY: x } = g
    let P = 0
    const L = Math.abs(w),
      M = Math.abs(x)
    L === M
      ? (P = m.value === 'x' ? w : x)
      : L > M
      ? ((P = w), (m.value = 'x'))
      : ((P = x), (m.value = 'y')),
      t(-P, -P) && g.preventDefault()
  }
  const C = Y({ onTouchStart: s, onTouchMove: b, onTouchEnd: f, onWheel: S })
  function I(g) {
    C.value.onTouchStart(g)
  }
  function T(g) {
    C.value.onTouchMove(g)
  }
  function D(g) {
    C.value.onTouchEnd(g)
  }
  function H(g) {
    C.value.onWheel(g)
  }
  et(() => {
    var g, w
    document.addEventListener('touchmove', T, { passive: !1 }),
      document.addEventListener('touchend', D, { passive: !1 }),
      (g = e.value) === null ||
        g === void 0 ||
        g.addEventListener('touchstart', I, { passive: !1 }),
      (w = e.value) === null ||
        w === void 0 ||
        w.addEventListener('wheel', H, { passive: !1 })
  }),
    Re(() => {
      document.removeEventListener('touchmove', T),
        document.removeEventListener('touchend', D)
    })
}
function In(e, t) {
  const n = Y(e)
  function o(a) {
    const i = typeof a == 'function' ? a(n.value) : a
    i !== n.value && t(i, n.value), (n.value = i)
  }
  return [n, o]
}
const qi = () => {
    const e = Y(new Map()),
      t = n => o => {
        e.value.set(n, o)
      }
    return (
      Ro(() => {
        e.value = new Map()
      }),
      [t, e]
    )
  },
  Ui = qi,
  Tn = { width: 0, height: 0, left: 0, top: 0, right: 0 },
  Zi = () => ({
    id: { type: String },
    tabPosition: { type: String },
    activeKey: { type: [String, Number] },
    rtl: { type: Boolean },
    animated: _e(),
    editable: _e(),
    moreIcon: V.any,
    moreTransitionName: { type: String },
    mobile: { type: Boolean },
    tabBarGutter: { type: Number },
    renderTabBar: { type: Function },
    locale: _e(),
    popupClassName: String,
    getPopupContainer: ye(),
    onTabClick: { type: Function },
    onTabScroll: { type: Function }
  }),
  Ji = (e, t) => {
    const { offsetWidth: n, offsetHeight: o, offsetTop: a, offsetLeft: i } = e,
      { width: l, height: r, x: c, y: p } = e.getBoundingClientRect()
    return Math.abs(l - n) < 1 ? [l, r, c - t.x, p - t.y] : [n, o, i, a]
  },
  Pn = G({
    compatConfig: { MODE: 3 },
    name: 'TabNavList',
    inheritAttrs: !1,
    props: Zi(),
    slots: Object,
    emits: ['tabClick', 'tabScroll'],
    setup(e, t) {
      let { attrs: n, slots: o } = t
      const { tabs: a, prefixCls: i } = so(),
        l = N(),
        r = N(),
        c = N(),
        p = N(),
        [d, s] = Ui(),
        b = $(() => e.tabPosition === 'top' || e.tabPosition === 'bottom'),
        [f, m] = In(0, (A, y) => {
          b.value &&
            e.onTabScroll &&
            e.onTabScroll({ direction: A > y ? 'left' : 'right' })
        }),
        [S, C] = In(0, (A, y) => {
          !b.value &&
            e.onTabScroll &&
            e.onTabScroll({ direction: A > y ? 'top' : 'bottom' })
        }),
        [I, T] = ce(0),
        [D, H] = ce(0),
        [g, w] = ce(null),
        [x, P] = ce(null),
        [L, M] = ce(0),
        [j, J] = ce(0),
        [te, se] = Ni(new Map()),
        K = Fi(a, te),
        Z = $(() => `${i.value}-nav-operations-hidden`),
        E = N(0),
        ie = N(0)
      Ae(() => {
        b.value
          ? e.rtl
            ? ((E.value = 0), (ie.value = Math.max(0, I.value - g.value)))
            : ((E.value = Math.min(0, g.value - I.value)), (ie.value = 0))
          : ((E.value = Math.min(0, x.value - D.value)), (ie.value = 0))
      })
      const q = A => (A < E.value ? E.value : A > ie.value ? ie.value : A),
        fe = N(),
        [_, W] = ce(),
        Q = () => {
          W(Date.now())
        },
        re = () => {
          clearTimeout(fe.value)
        },
        de = (A, y) => {
          A(B => q(B + y))
        }
      Yi(l, (A, y) => {
        if (b.value) {
          if (g.value >= I.value) return !1
          de(m, A)
        } else {
          if (x.value >= D.value) return !1
          de(C, y)
        }
        return re(), Q(), !0
      }),
        ae(_, () => {
          re(),
            _.value &&
              (fe.value = setTimeout(() => {
                W(0)
              }, 100))
        })
      const le = function() {
          let A =
            arguments.length > 0 && arguments[0] !== void 0
              ? arguments[0]
              : e.activeKey
          const y = K.value.get(A) || {
            width: 0,
            height: 0,
            left: 0,
            right: 0,
            top: 0
          }
          if (b.value) {
            let B = f.value
            e.rtl
              ? y.right < f.value
                ? (B = y.right)
                : y.right + y.width > f.value + g.value &&
                  (B = y.right + y.width - g.value)
              : y.left < -f.value
              ? (B = -y.left)
              : y.left + y.width > -f.value + g.value &&
                (B = -(y.left + y.width - g.value)),
              C(0),
              m(q(B))
          } else {
            let B = S.value
            y.top < -S.value
              ? (B = -y.top)
              : y.top + y.height > -S.value + x.value &&
                (B = -(y.top + y.height - x.value)),
              m(0),
              C(q(B))
          }
        },
        h = N(0),
        O = N(0)
      Ae(() => {
        let A, y, B, z, ne, ee
        const pe = K.value
        ;['top', 'bottom'].includes(e.tabPosition)
          ? ((A = 'width'),
            (z = g.value),
            (ne = I.value),
            (ee = L.value),
            (y = e.rtl ? 'right' : 'left'),
            (B = Math.abs(f.value)))
          : ((A = 'height'),
            (z = x.value),
            (ne = I.value),
            (ee = j.value),
            (y = 'top'),
            (B = -S.value))
        let me = z
        ne + ee > z && ne < z && (me = z - ee)
        const $e = a.value
        if (!$e.length) return ([h.value, O.value] = [0, 0])
        const xe = $e.length
        let Te = xe
        for (let he = 0; he < xe; he += 1) {
          const we = pe.get($e[he].key) || Tn
          if (we[y] + we[A] > B + me) {
            Te = he - 1
            break
          }
        }
        let ue = 0
        for (let he = xe - 1; he >= 0; he -= 1)
          if ((pe.get($e[he].key) || Tn)[y] < B) {
            ue = he + 1
            break
          }
        return ([h.value, O.value] = [ue, Te])
      })
      const k = () => {
        se(() => {
          var A
          const y = new Map(),
            B =
              (A = r.value) === null || A === void 0
                ? void 0
                : A.getBoundingClientRect()
          return (
            a.value.forEach(z => {
              let { key: ne } = z
              const ee = s.value.get(ne),
                pe = (ee == null ? void 0 : ee.$el) || ee
              if (pe) {
                const [me, $e, xe, Te] = Ji(pe, B)
                y.set(ne, { width: me, height: $e, left: xe, top: Te })
              }
            }),
            y
          )
        })
      }
      ae(
        () => a.value.map(A => A.key).join('%%'),
        () => {
          k()
        },
        { flush: 'post' }
      )
      const X = () => {
          var A, y, B, z, ne
          const ee =
              ((A = l.value) === null || A === void 0
                ? void 0
                : A.offsetWidth) || 0,
            pe =
              ((y = l.value) === null || y === void 0
                ? void 0
                : y.offsetHeight) || 0,
            me =
              ((B = p.value) === null || B === void 0 ? void 0 : B.$el) || {},
            $e = me.offsetWidth || 0,
            xe = me.offsetHeight || 0
          w(ee), P(pe), M($e), J(xe)
          const Te =
              (((z = r.value) === null || z === void 0
                ? void 0
                : z.offsetWidth) || 0) - $e,
            ue =
              (((ne = r.value) === null || ne === void 0
                ? void 0
                : ne.offsetHeight) || 0) - xe
          T(Te), H(ue), k()
        },
        U = $(() => [
          ...a.value.slice(0, h.value),
          ...a.value.slice(O.value + 1)
        ]),
        [F, be] = ce(),
        ve = $(() => K.value.get(e.activeKey)),
        Le = N(),
        at = () => {
          Be.cancel(Le.value)
        }
      ae([ve, b, () => e.rtl], () => {
        const A = {}
        ve.value &&
          (b.value
            ? (e.rtl
                ? (A.right = Ve(ve.value.right))
                : (A.left = Ve(ve.value.left)),
              (A.width = Ve(ve.value.width)))
            : ((A.top = Ve(ve.value.top)), (A.height = Ve(ve.value.height)))),
          at(),
          (Le.value = Be(() => {
            be(A)
          }))
      }),
        ae(
          [() => e.activeKey, ve, K, b],
          () => {
            le()
          },
          { flush: 'post' }
        ),
        ae(
          [() => e.rtl, () => e.tabBarGutter, () => e.activeKey, () => a.value],
          () => {
            X()
          },
          { flush: 'post' }
        )
      const je = A => {
        let { position: y, prefixCls: B, extra: z } = A
        if (!z) return null
        const ne = z == null ? void 0 : z({ position: y })
        return ne ? u('div', { class: `${B}-extra-content` }, [ne]) : null
      }
      return (
        Re(() => {
          re(), at()
        }),
        () => {
          const {
              id: A,
              animated: y,
              activeKey: B,
              rtl: z,
              editable: ne,
              locale: ee,
              tabPosition: pe,
              tabBarGutter: me,
              onTabClick: $e
            } = e,
            { class: xe, style: Te } = n,
            ue = i.value,
            he = !!U.value.length,
            we = `${ue}-nav-wrap`
          let It, Tt, qt, Ut
          b.value
            ? z
              ? ((Tt = f.value > 0), (It = f.value + g.value < I.value))
              : ((It = f.value < 0), (Tt = -f.value + g.value < I.value))
            : ((qt = S.value < 0), (Ut = -S.value + x.value < D.value))
          const it = {}
          pe === 'top' || pe === 'bottom'
            ? (it[z ? 'marginRight' : 'marginLeft'] =
                typeof me == 'number' ? `${me}px` : me)
            : (it.marginTop = typeof me == 'number' ? `${me}px` : me)
          const Zt = a.value.map((Pt, go) => {
            const { key: Xe } = Pt
            return u(
              Wi,
              {
                id: A,
                prefixCls: ue,
                key: Xe,
                tab: Pt,
                style: go === 0 ? void 0 : it,
                closable: Pt.closable,
                editable: ne,
                active: Xe === B,
                removeAriaLabel: ee == null ? void 0 : ee.removeAriaLabel,
                ref: d(Xe),
                onClick: bo => {
                  $e(Xe, bo)
                },
                onFocus: () => {
                  le(Xe),
                    Q(),
                    l.value &&
                      (z || (l.value.scrollLeft = 0), (l.value.scrollTop = 0))
                }
              },
              o
            )
          })
          return u(
            'div',
            {
              role: 'tablist',
              class: oe(`${ue}-nav`, xe),
              style: Te,
              onKeydown: () => {
                Q()
              }
            },
            [
              u(
                je,
                { position: 'left', prefixCls: ue, extra: o.leftExtra },
                null
              ),
              u(
                nn,
                { onResize: X },
                {
                  default: () => [
                    u(
                      'div',
                      {
                        class: oe(we, {
                          [`${we}-ping-left`]: It,
                          [`${we}-ping-right`]: Tt,
                          [`${we}-ping-top`]: qt,
                          [`${we}-ping-bottom`]: Ut
                        }),
                        ref: l
                      },
                      [
                        u(
                          nn,
                          { onResize: X },
                          {
                            default: () => [
                              u(
                                'div',
                                {
                                  ref: r,
                                  class: `${ue}-nav-list`,
                                  style: {
                                    transform: `translate(${f.value}px, ${S.value}px)`,
                                    transition: _.value ? 'none' : void 0
                                  }
                                },
                                [
                                  Zt,
                                  u(
                                    lo,
                                    {
                                      ref: p,
                                      prefixCls: ue,
                                      locale: ee,
                                      editable: ne,
                                      style: v(
                                        v({}, Zt.length === 0 ? void 0 : it),
                                        { visibility: he ? 'hidden' : null }
                                      )
                                    },
                                    null
                                  ),
                                  u(
                                    'div',
                                    {
                                      class: oe(`${ue}-ink-bar`, {
                                        [`${ue}-ink-bar-animated`]: y.inkBar
                                      }),
                                      style: F.value
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
              u(
                ji,
                R(
                  R({}, e),
                  {},
                  {
                    removeAriaLabel: ee == null ? void 0 : ee.removeAriaLabel,
                    ref: c,
                    prefixCls: ue,
                    tabs: U.value,
                    class: !he && Z.value
                  }
                ),
                Gn(o, ['moreIcon'])
              ),
              u(
                je,
                { position: 'right', prefixCls: ue, extra: o.rightExtra },
                null
              ),
              u(
                je,
                {
                  position: 'right',
                  prefixCls: ue,
                  extra: o.tabBarExtraContent
                },
                null
              )
            ]
          )
        }
      )
    }
  }),
  Qi = G({
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
      const { tabs: t, prefixCls: n } = so()
      return () => {
        const {
            id: o,
            activeKey: a,
            animated: i,
            tabPosition: l,
            rtl: r,
            destroyInactiveTabPane: c
          } = e,
          p = i.tabPane,
          d = n.value,
          s = t.value.findIndex(b => b.key === a)
        return u('div', { class: `${d}-content-holder` }, [
          u(
            'div',
            {
              class: [
                `${d}-content`,
                `${d}-content-${l}`,
                { [`${d}-content-animated`]: p }
              ],
              style:
                s && p
                  ? { [r ? 'marginRight' : 'marginLeft']: `-${s}00%` }
                  : null
            },
            [
              t.value.map(b =>
                We(b.node, {
                  key: b.key,
                  prefixCls: d,
                  tabKey: b.key,
                  id: o,
                  animated: p,
                  active: b.key === a,
                  destroyInactiveTabPane: c
                })
              )
            ]
          )
        ])
      }
    }
  })
function _n(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? Object(arguments[t]) : {},
      o = Object.keys(n)
    typeof Object.getOwnPropertySymbols == 'function' &&
      (o = o.concat(
        Object.getOwnPropertySymbols(n).filter(function(a) {
          return Object.getOwnPropertyDescriptor(n, a).enumerable
        })
      )),
      o.forEach(function(a) {
        el(e, a, n[a])
      })
  }
  return e
}
function el(e, t, n) {
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
var Vt = function(t, n) {
  var o = _n({}, t, n.attrs)
  return u(On, _n({}, o, { icon: Vo }), null)
}
Vt.displayName = 'PlusOutlined'
Vt.inheritAttrs = !1
const tl = Vt,
  nl = e => {
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
      [vt(e, 'slide-up'), vt(e, 'slide-down')]
    ]
  },
  ol = nl,
  al = e => {
    const {
      componentCls: t,
      tabsCardHorizontalPadding: n,
      tabsCardHeadBackground: o,
      tabsCardGutter: a,
      colorSplit: i
    } = e
    return {
      [`${t}-card`]: {
        [`> ${t}-nav, > div > ${t}-nav`]: {
          [`${t}-tab`]: {
            margin: 0,
            padding: n,
            background: o,
            border: `${e.lineWidth}px ${e.lineType} ${i}`,
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
              marginLeft: { _skip_check_: !0, value: `${a}px` }
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
            [`${t}-tab + ${t}-tab`]: { marginTop: `${a}px` }
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
  il = e => {
    const {
      componentCls: t,
      tabsHoverColor: n,
      dropdownEdgeChildVerticalPadding: o
    } = e
    return {
      [`${t}-dropdown`]: v(v({}, yt(e)), {
        position: 'absolute',
        top: -9999,
        left: { _skip_check_: !0, value: -9999 },
        zIndex: e.zIndexPopup,
        display: 'block',
        '&-hidden': { display: 'none' },
        [`${t}-dropdown-menu`]: {
          maxHeight: e.tabsDropdownHeight,
          margin: 0,
          padding: `${o}px 0`,
          overflowX: 'hidden',
          overflowY: 'auto',
          textAlign: { _skip_check_: !0, value: 'left' },
          listStyleType: 'none',
          backgroundColor: e.colorBgContainer,
          backgroundClip: 'padding-box',
          borderRadius: e.borderRadiusLG,
          outline: 'none',
          boxShadow: e.boxShadowSecondary,
          '&-item': v(v({}, ht), {
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
  ll = e => {
    const { componentCls: t, margin: n, colorSplit: o } = e
    return {
      [`${t}-top, ${t}-bottom`]: {
        flexDirection: 'column',
        [`> ${t}-nav, > div > ${t}-nav`]: {
          margin: `0 0 ${n}px 0`,
          '&::before': {
            position: 'absolute',
            right: { _skip_check_: !0, value: 0 },
            left: { _skip_check_: !0, value: 0 },
            borderBottom: `${e.lineWidth}px ${e.lineType} ${o}`,
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
  rl = e => {
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
  sl = e => {
    const {
        componentCls: t,
        tabsActiveColor: n,
        tabsHoverColor: o,
        iconCls: a,
        tabsHorizontalGutter: i
      } = e,
      l = `${t}-tab`
    return {
      [l]: {
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        padding: `${e.paddingSM}px 0`,
        fontSize: `${e.fontSize}px`,
        background: 'transparent',
        border: 0,
        outline: 'none',
        cursor: 'pointer',
        '&-btn, &-remove': v(
          { '&:focus:not(:focus-visible), &:active': { color: n } },
          En(e)
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
        '&:hover': { color: o },
        [`&${l}-active ${l}-btn`]: {
          color: e.colorPrimary,
          textShadow: e.tabsActiveTextShadow
        },
        [`&${l}-disabled`]: {
          color: e.colorTextDisabled,
          cursor: 'not-allowed'
        },
        [`&${l}-disabled ${l}-btn, &${l}-disabled ${t}-remove`]: {
          '&:focus, &:active': { color: e.colorTextDisabled }
        },
        [`& ${l}-remove ${a}`]: { margin: 0 },
        [a]: { marginRight: { _skip_check_: !0, value: e.marginSM } }
      },
      [`${l} + ${l}`]: { margin: { _skip_check_: !0, value: `0 0 0 ${i}px` } }
    }
  },
  ul = e => {
    const {
      componentCls: t,
      tabsHorizontalGutter: n,
      iconCls: o,
      tabsCardGutter: a
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
            [o]: {
              marginRight: { _skip_check_: !0, value: 0 },
              marginLeft: { _skip_check_: !0, value: `${e.marginSM}px` }
            },
            [`${t}-tab-remove`]: {
              marginRight: { _skip_check_: !0, value: `${e.marginXS}px` },
              marginLeft: { _skip_check_: !0, value: `-${e.marginXXS}px` },
              [o]: { margin: 0 }
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
              marginRight: { _skip_check_: !0, value: `${a}px` },
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
  cl = e => {
    const {
      componentCls: t,
      tabsCardHorizontalPadding: n,
      tabsCardHeight: o,
      tabsCardGutter: a,
      tabsHoverColor: i,
      tabsActiveColor: l,
      colorSplit: r
    } = e
    return {
      [t]: v(
        v(
          v(v({}, yt(e)), {
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
              [`${t}-nav-add`]: v(
                {
                  minWidth: `${o}px`,
                  marginLeft: { _skip_check_: !0, value: `${a}px` },
                  padding: `0 ${e.paddingXS}px`,
                  background: 'transparent',
                  border: `${e.lineWidth}px ${e.lineType} ${r}`,
                  borderRadius: `${e.borderRadiusLG}px ${e.borderRadiusLG}px 0 0`,
                  outline: 'none',
                  cursor: 'pointer',
                  color: e.colorText,
                  transition: `all ${e.motionDurationSlow} ${e.motionEaseInOut}`,
                  '&:hover': { color: i },
                  '&:active, &:focus:not(:focus-visible)': { color: l }
                },
                En(e)
              )
            },
            [`${t}-extra-content`]: { flex: 'none' },
            [`${t}-ink-bar`]: {
              position: 'absolute',
              background: e.colorPrimary,
              pointerEvents: 'none'
            }
          }),
          sl(e)
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
  dl = $t(
    'Tabs',
    e => {
      const t = e.controlHeightLG,
        n = Qe(e, {
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
      return [rl(n), ul(n), ll(n), il(n), al(n), cl(n), ol(n)]
    },
    e => ({ zIndexPopup: e.zIndexPopupBase + 50 })
  )
let Mn = 0
const uo = () => ({
  prefixCls: { type: String },
  id: { type: String },
  popupClassName: String,
  getPopupContainer: ye(),
  activeKey: { type: [String, Number] },
  defaultActiveKey: { type: [String, Number] },
  direction: lt(),
  animated: xo([Boolean, Object]),
  renderTabBar: ye(),
  tabBarGutter: { type: Number },
  tabBarStyle: _e(),
  tabPosition: lt(),
  destroyInactiveTabPane: Co(),
  hideAdd: Boolean,
  type: lt(),
  size: lt(),
  centered: Boolean,
  onEdit: ye(),
  onChange: ye(),
  onTabClick: ye(),
  onTabScroll: ye(),
  'onUpdate:activeKey': ye(),
  locale: _e(),
  onPrevClick: ye(),
  onNextClick: ye(),
  tabBarExtraContent: V.any
})
function vl(e) {
  return e
    .map(t => {
      if (Kt(t)) {
        const n = v({}, t.props || {})
        for (const [b, f] of Object.entries(n)) delete n[b], (n[wo(b)] = f)
        const o = t.children || {},
          a = t.key !== void 0 ? t.key : void 0,
          {
            tab: i = o.tab,
            disabled: l,
            forceRender: r,
            closable: c,
            animated: p,
            active: d,
            destroyInactiveTabPane: s
          } = n
        return v(v({ key: a }, n), {
          node: t,
          closeIcon: o.closeIcon,
          tab: i,
          disabled: l === '' || l,
          forceRender: r === '' || r,
          closable: c === '' || c,
          animated: p === '' || p,
          active: d === '' || d,
          destroyInactiveTabPane: s === '' || s
        })
      }
      return null
    })
    .filter(t => t)
}
const fl = G({
    compatConfig: { MODE: 3 },
    name: 'InternalTabs',
    inheritAttrs: !1,
    props: v(
      v(
        {},
        nt(uo(), { tabPosition: 'top', animated: { inkBar: !0, tabPane: !1 } })
      ),
      { tabs: Io() }
    ),
    slots: Object,
    setup(e, t) {
      let { attrs: n, slots: o } = t
      Me(
        e.onPrevClick === void 0 && e.onNextClick === void 0,
        'Tabs',
        '`onPrevClick / @prevClick` and `onNextClick / @nextClick` has been removed. Please use `onTabScroll / @tabScroll` instead.'
      ),
        Me(
          e.tabBarExtraContent === void 0,
          'Tabs',
          '`tabBarExtraContent` prop has been removed. Please use `rightExtra` slot instead.'
        ),
        Me(
          o.tabBarExtraContent === void 0,
          'Tabs',
          '`tabBarExtraContent` slot is deprecated. Please use `rightExtra` slot instead.'
        )
      const {
          prefixCls: a,
          direction: i,
          size: l,
          rootPrefixCls: r,
          getPopupContainer: c
        } = Ce('tabs', e),
        [p, d] = dl(a),
        s = $(() => i.value === 'rtl'),
        b = $(() => {
          const { animated: x, tabPosition: P } = e
          return x === !1 || ['left', 'right'].includes(P)
            ? { inkBar: !1, tabPane: !1 }
            : x === !0
            ? { inkBar: !0, tabPane: !0 }
            : v({ inkBar: !0, tabPane: !1 }, typeof x == 'object' ? x : {})
        }),
        [f, m] = ce(!1)
      et(() => {
        m(Go())
      })
      const [S, C] = on(
          () => {
            var x
            return (x = e.tabs[0]) === null || x === void 0 ? void 0 : x.key
          },
          { value: $(() => e.activeKey), defaultValue: e.defaultActiveKey }
        ),
        [I, T] = ce(() => e.tabs.findIndex(x => x.key === S.value))
      Ae(() => {
        var x
        let P = e.tabs.findIndex(L => L.key === S.value)
        P === -1 &&
          ((P = Math.max(0, Math.min(I.value, e.tabs.length - 1))),
          C((x = e.tabs[P]) === null || x === void 0 ? void 0 : x.key)),
          T(P)
      })
      const [D, H] = on(null, { value: $(() => e.id) }),
        g = $(() =>
          f.value && !['left', 'right'].includes(e.tabPosition)
            ? 'top'
            : e.tabPosition
        )
      et(() => {
        e.id || (H(`rc-tabs-${Mn}`), (Mn += 1))
      })
      const w = (x, P) => {
        var L, M
        ;(L = e.onTabClick) === null || L === void 0 || L.call(e, x, P)
        const j = x !== S.value
        C(x), j && ((M = e.onChange) === null || M === void 0 || M.call(e, x))
      }
      return (
        Xi({ tabs: $(() => e.tabs), prefixCls: a }),
        () => {
          const {
              id: x,
              type: P,
              tabBarGutter: L,
              tabBarStyle: M,
              locale: j,
              destroyInactiveTabPane: J,
              renderTabBar: te = o.renderTabBar,
              onTabScroll: se,
              hideAdd: K,
              centered: Z
            } = e,
            E = {
              id: D.value,
              activeKey: S.value,
              animated: b.value,
              tabPosition: g.value,
              rtl: s.value,
              mobile: f.value
            }
          let ie
          P === 'editable-card' &&
            (ie = {
              onEdit: (W, Q) => {
                let { key: re, event: de } = Q
                var le
                ;(le = e.onEdit) === null ||
                  le === void 0 ||
                  le.call(e, W === 'add' ? de : re, W)
              },
              removeIcon: () => u(To, null, null),
              addIcon: o.addIcon ? o.addIcon : () => u(tl, null, null),
              showAdd: K !== !0
            })
          let q
          const fe = v(v({}, E), {
            moreTransitionName: `${r.value}-slide-up`,
            editable: ie,
            locale: j,
            tabBarGutter: L,
            onTabClick: w,
            onTabScroll: se,
            style: M,
            getPopupContainer: c.value,
            popupClassName: oe(e.popupClassName, d.value)
          })
          te
            ? (q = te(v(v({}, fe), { DefaultTabBar: Pn })))
            : (q = u(
                Pn,
                fe,
                Gn(o, [
                  'moreIcon',
                  'leftExtra',
                  'rightExtra',
                  'tabBarExtraContent'
                ])
              ))
          const _ = a.value
          return p(
            u(
              'div',
              R(
                R({}, n),
                {},
                {
                  id: x,
                  class: oe(
                    _,
                    `${_}-${g.value}`,
                    {
                      [d.value]: !0,
                      [`${_}-${l.value}`]: l.value,
                      [`${_}-card`]: ['card', 'editable-card'].includes(P),
                      [`${_}-editable-card`]: P === 'editable-card',
                      [`${_}-centered`]: Z,
                      [`${_}-mobile`]: f.value,
                      [`${_}-editable`]: P === 'editable-card',
                      [`${_}-rtl`]: s.value
                    },
                    n.class
                  )
                }
              ),
              [
                q,
                u(
                  Qi,
                  R(
                    R({ destroyInactiveTabPane: J }, E),
                    {},
                    { animated: b.value }
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
  Ke = G({
    compatConfig: { MODE: 3 },
    name: 'ATabs',
    inheritAttrs: !1,
    props: nt(uo(), {
      tabPosition: 'top',
      animated: { inkBar: !0, tabPane: !1 }
    }),
    slots: Object,
    setup(e, t) {
      let { attrs: n, slots: o, emit: a } = t
      const i = l => {
        a('update:activeKey', l), a('change', l)
      }
      return () => {
        var l
        const r = vl(
          bt((l = o.default) === null || l === void 0 ? void 0 : l.call(o))
        )
        return u(
          fl,
          R(
            R(R({}, zt(e, ['onUpdate:activeKey'])), n),
            {},
            { onChange: i, tabs: r }
          ),
          o
        )
      }
    }
  }),
  pl = () => ({
    tab: V.any,
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
  Lt = G({
    compatConfig: { MODE: 3 },
    name: 'ATabPane',
    inheritAttrs: !1,
    __ANT_TAB_PANE: !0,
    props: pl(),
    slots: Object,
    setup(e, t) {
      let { attrs: n, slots: o } = t
      const a = Y(e.forceRender)
      ae(
        [() => e.active, () => e.destroyInactiveTabPane],
        () => {
          e.active ? (a.value = !0) : e.destroyInactiveTabPane && (a.value = !1)
        },
        { immediate: !0 }
      )
      const i = $(() =>
        e.active
          ? {}
          : e.animated
          ? { visibility: 'hidden', height: 0, overflowY: 'hidden' }
          : { display: 'none' }
      )
      return () => {
        var l
        const { prefixCls: r, forceRender: c, id: p, active: d, tabKey: s } = e
        return u(
          'div',
          {
            id: p && `${p}-panel-${s}`,
            role: 'tabpanel',
            tabindex: d ? 0 : -1,
            'aria-labelledby': p && `${p}-tab-${s}`,
            'aria-hidden': !d,
            style: [i.value, n.style],
            class: [`${r}-tabpane`, d && `${r}-tabpane-active`, n.class]
          },
          [
            (d || a.value || c) &&
              ((l = o.default) === null || l === void 0 ? void 0 : l.call(o))
          ]
        )
      }
    }
  })
Ke.TabPane = Lt
Ke.install = function(e) {
  return e.component(Ke.name, Ke), e.component(Lt.name, Lt), e
}
const ml = e => {
    const {
      antCls: t,
      componentCls: n,
      cardHeadHeight: o,
      cardPaddingBase: a,
      cardHeadTabsMarginBottom: i
    } = e
    return v(
      v(
        {
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          minHeight: o,
          marginBottom: -1,
          padding: `0 ${a}px`,
          color: e.colorTextHeading,
          fontWeight: e.fontWeightStrong,
          fontSize: e.fontSizeLG,
          background: 'transparent',
          borderBottom: `${e.lineWidth}px ${e.lineType} ${e.colorBorderSecondary}`,
          borderRadius: `${e.borderRadiusLG}px ${e.borderRadiusLG}px 0 0`
        },
        Ne()
      ),
      {
        '&-wrapper': { width: '100%', display: 'flex', alignItems: 'center' },
        '&-title': v(v({ display: 'inline-block', flex: 1 }, ht), {
          [`
          > ${n}-typography,
          > ${n}-typography-edit-content
        `]: { insetInlineStart: 0, marginTop: 0, marginBottom: 0 }
        }),
        [`${t}-tabs-top`]: {
          clear: 'both',
          marginBottom: i,
          color: e.colorText,
          fontWeight: 'normal',
          fontSize: e.fontSize,
          '&-bar': {
            borderBottom: `${e.lineWidth}px ${e.lineType} ${e.colorBorderSecondary}`
          }
        }
      }
    )
  },
  gl = e => {
    const {
      cardPaddingBase: t,
      colorBorderSecondary: n,
      cardShadow: o,
      lineWidth: a
    } = e
    return {
      width: '33.33%',
      padding: t,
      border: 0,
      borderRadius: 0,
      boxShadow: `
      ${a}px 0 0 0 ${n},
      0 ${a}px 0 0 ${n},
      ${a}px ${a}px 0 0 ${n},
      ${a}px 0 0 0 ${n} inset,
      0 ${a}px 0 0 ${n} inset;
    `,
      transition: `all ${e.motionDurationMid}`,
      '&-hoverable:hover': { position: 'relative', zIndex: 1, boxShadow: o }
    }
  },
  bl = e => {
    const {
      componentCls: t,
      iconCls: n,
      cardActionsLiMargin: o,
      cardActionsIconSize: a,
      colorBorderSecondary: i
    } = e
    return v(
      v(
        {
          margin: 0,
          padding: 0,
          listStyle: 'none',
          background: e.colorBgContainer,
          borderTop: `${e.lineWidth}px ${e.lineType} ${i}`,
          display: 'flex',
          borderRadius: `0 0 ${e.borderRadiusLG}px ${e.borderRadiusLG}px `
        },
        Ne()
      ),
      {
        '& > li': {
          margin: o,
          color: e.colorTextDescription,
          textAlign: 'center',
          '> span': {
            position: 'relative',
            display: 'block',
            minWidth: e.cardActionsIconSize * 2,
            fontSize: e.fontSize,
            lineHeight: e.lineHeight,
            cursor: 'pointer',
            '&:hover': {
              color: e.colorPrimary,
              transition: `color ${e.motionDurationMid}`
            },
            [`a:not(${t}-btn), > ${n}`]: {
              display: 'inline-block',
              width: '100%',
              color: e.colorTextDescription,
              lineHeight: `${e.fontSize * e.lineHeight}px`,
              transition: `color ${e.motionDurationMid}`,
              '&:hover': { color: e.colorPrimary }
            },
            [`> ${n}`]: { fontSize: a, lineHeight: `${a * e.lineHeight}px` }
          },
          '&:not(:last-child)': {
            borderInlineEnd: `${e.lineWidth}px ${e.lineType} ${i}`
          }
        }
      }
    )
  },
  hl = e =>
    v(v({ margin: `-${e.marginXXS}px 0`, display: 'flex' }, Ne()), {
      '&-avatar': { paddingInlineEnd: e.padding },
      '&-detail': {
        overflow: 'hidden',
        flex: 1,
        '> div:not(:last-child)': { marginBottom: e.marginXS }
      },
      '&-title': v(
        {
          color: e.colorTextHeading,
          fontWeight: e.fontWeightStrong,
          fontSize: e.fontSizeLG
        },
        ht
      ),
      '&-description': { color: e.colorTextDescription }
    }),
  $l = e => {
    const { componentCls: t, cardPaddingBase: n, colorFillAlter: o } = e
    return {
      [`${t}-head`]: {
        padding: `0 ${n}px`,
        background: o,
        '&-title': { fontSize: e.fontSize }
      },
      [`${t}-body`]: { padding: `${e.padding}px ${n}px` }
    }
  },
  yl = e => {
    const { componentCls: t } = e
    return { overflow: 'hidden', [`${t}-body`]: { userSelect: 'none' } }
  },
  Sl = e => {
    const {
      componentCls: t,
      cardShadow: n,
      cardHeadPadding: o,
      colorBorderSecondary: a,
      boxShadow: i,
      cardPaddingBase: l
    } = e
    return {
      [t]: v(v({}, yt(e)), {
        position: 'relative',
        background: e.colorBgContainer,
        borderRadius: e.borderRadiusLG,
        [`&:not(${t}-bordered)`]: { boxShadow: i },
        [`${t}-head`]: ml(e),
        [`${t}-extra`]: {
          marginInlineStart: 'auto',
          color: '',
          fontWeight: 'normal',
          fontSize: e.fontSize
        },
        [`${t}-body`]: v(
          {
            padding: l,
            borderRadius: ` 0 0 ${e.borderRadiusLG}px ${e.borderRadiusLG}px`
          },
          Ne()
        ),
        [`${t}-grid`]: gl(e),
        [`${t}-cover`]: {
          '> *': { display: 'block', width: '100%' },
          img: {
            borderRadius: `${e.borderRadiusLG}px ${e.borderRadiusLG}px 0 0`
          }
        },
        [`${t}-actions`]: bl(e),
        [`${t}-meta`]: hl(e)
      }),
      [`${t}-bordered`]: {
        border: `${e.lineWidth}px ${e.lineType} ${a}`,
        [`${t}-cover`]: {
          marginTop: -1,
          marginInlineStart: -1,
          marginInlineEnd: -1
        }
      },
      [`${t}-hoverable`]: {
        cursor: 'pointer',
        transition: `box-shadow ${e.motionDurationMid}, border-color ${e.motionDurationMid}`,
        '&:hover': { borderColor: 'transparent', boxShadow: n }
      },
      [`${t}-contain-grid`]: {
        [`${t}-body`]: { display: 'flex', flexWrap: 'wrap' },
        [`&:not(${t}-loading) ${t}-body`]: {
          marginBlockStart: -e.lineWidth,
          marginInlineStart: -e.lineWidth,
          padding: 0
        }
      },
      [`${t}-contain-tabs`]: {
        [`> ${t}-head`]: { [`${t}-head-title, ${t}-extra`]: { paddingTop: o } }
      },
      [`${t}-type-inner`]: $l(e),
      [`${t}-loading`]: yl(e),
      [`${t}-rtl`]: { direction: 'rtl' }
    }
  },
  xl = e => {
    const { componentCls: t, cardPaddingSM: n, cardHeadHeightSM: o } = e
    return {
      [`${t}-small`]: {
        [`> ${t}-head`]: {
          minHeight: o,
          padding: `0 ${n}px`,
          fontSize: e.fontSize,
          [`> ${t}-head-wrapper`]: {
            [`> ${t}-extra`]: { fontSize: e.fontSize }
          }
        },
        [`> ${t}-body`]: { padding: n }
      },
      [`${t}-small${t}-contain-tabs`]: {
        [`> ${t}-head`]: {
          [`${t}-head-title, ${t}-extra`]: {
            minHeight: o,
            paddingTop: 0,
            display: 'flex',
            alignItems: 'center'
          }
        }
      }
    }
  },
  Cl = $t('Card', e => {
    const t = Qe(e, {
      cardShadow: e.boxShadowCard,
      cardHeadHeight: e.fontSizeLG * e.lineHeightLG + e.padding * 2,
      cardHeadHeightSM: e.fontSize * e.lineHeight + e.paddingXS * 2,
      cardHeadPadding: e.padding,
      cardPaddingBase: e.paddingLG,
      cardHeadTabsMarginBottom: -e.padding - e.lineWidth,
      cardActionsLiMargin: `${e.paddingSM}px 0`,
      cardActionsIconSize: e.fontSize,
      cardPaddingSM: 12
    })
    return [Sl(t), xl(t)]
  }),
  wl = () => ({ prefixCls: String, width: { type: [Number, String] } }),
  Il = G({
    compatConfig: { MODE: 3 },
    name: 'SkeletonTitle',
    props: wl(),
    setup(e) {
      return () => {
        const { prefixCls: t, width: n } = e,
          o = typeof n == 'number' ? `${n}px` : n
        return u('h3', { class: t, style: { width: o } }, null)
      }
    }
  }),
  Yt = Il,
  Tl = () => ({
    prefixCls: String,
    width: { type: [Number, String, Array] },
    rows: Number
  }),
  Pl = G({
    compatConfig: { MODE: 3 },
    name: 'SkeletonParagraph',
    props: Tl(),
    setup(e) {
      const t = n => {
        const { width: o, rows: a = 2 } = e
        if (Array.isArray(o)) return o[n]
        if (a - 1 === n) return o
      }
      return () => {
        const { prefixCls: n, rows: o } = e,
          a = [...Array(o)].map((i, l) => {
            const r = t(l)
            return u(
              'li',
              { key: l, style: { width: typeof r == 'number' ? `${r}px` : r } },
              null
            )
          })
        return u('ul', { class: n }, [a])
      }
    }
  }),
  _l = Pl,
  xt = () => ({
    prefixCls: String,
    size: [String, Number],
    shape: String,
    active: { type: Boolean, default: void 0 }
  }),
  co = e => {
    const { prefixCls: t, size: n, shape: o } = e,
      a = oe({ [`${t}-lg`]: n === 'large', [`${t}-sm`]: n === 'small' }),
      i = oe({
        [`${t}-circle`]: o === 'circle',
        [`${t}-square`]: o === 'square',
        [`${t}-round`]: o === 'round'
      }),
      l =
        typeof n == 'number'
          ? { width: `${n}px`, height: `${n}px`, lineHeight: `${n}px` }
          : {}
    return u('span', { class: oe(t, a, i), style: l }, null)
  }
co.displayName = 'SkeletonElement'
const Ct = co,
  Ml = new Po('ant-skeleton-loading', {
    '0%': { transform: 'translateX(-37.5%)' },
    '100%': { transform: 'translateX(37.5%)' }
  }),
  wt = e => ({ height: e, lineHeight: `${e}px` }),
  ze = e => v({ width: e }, wt(e)),
  Bl = e => ({
    position: 'relative',
    zIndex: 0,
    overflow: 'hidden',
    background: 'transparent',
    '&::after': {
      position: 'absolute',
      top: 0,
      insetInlineEnd: '-150%',
      bottom: 0,
      insetInlineStart: '-150%',
      background: e.skeletonLoadingBackground,
      animationName: Ml,
      animationDuration: e.skeletonLoadingMotionDuration,
      animationTimingFunction: 'ease',
      animationIterationCount: 'infinite',
      content: '""'
    }
  }),
  Ot = e => v({ width: e * 5, minWidth: e * 5 }, wt(e)),
  Ol = e => {
    const {
      skeletonAvatarCls: t,
      color: n,
      controlHeight: o,
      controlHeightLG: a,
      controlHeightSM: i
    } = e
    return {
      [`${t}`]: v(
        { display: 'inline-block', verticalAlign: 'top', background: n },
        ze(o)
      ),
      [`${t}${t}-circle`]: { borderRadius: '50%' },
      [`${t}${t}-lg`]: v({}, ze(a)),
      [`${t}${t}-sm`]: v({}, ze(i))
    }
  },
  El = e => {
    const {
      controlHeight: t,
      borderRadiusSM: n,
      skeletonInputCls: o,
      controlHeightLG: a,
      controlHeightSM: i,
      color: l
    } = e
    return {
      [`${o}`]: v(
        {
          display: 'inline-block',
          verticalAlign: 'top',
          background: l,
          borderRadius: n
        },
        Ot(t)
      ),
      [`${o}-lg`]: v({}, Ot(a)),
      [`${o}-sm`]: v({}, Ot(i))
    }
  },
  Bn = e => v({ width: e }, wt(e)),
  Al = e => {
    const {
      skeletonImageCls: t,
      imageSizeBase: n,
      color: o,
      borderRadiusSM: a
    } = e
    return {
      [`${t}`]: v(
        v(
          {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            verticalAlign: 'top',
            background: o,
            borderRadius: a
          },
          Bn(n * 2)
        ),
        {
          [`${t}-path`]: { fill: '#bfbfbf' },
          [`${t}-svg`]: v(v({}, Bn(n)), { maxWidth: n * 4, maxHeight: n * 4 }),
          [`${t}-svg${t}-svg-circle`]: { borderRadius: '50%' }
        }
      ),
      [`${t}${t}-circle`]: { borderRadius: '50%' }
    }
  },
  Et = (e, t, n) => {
    const { skeletonButtonCls: o } = e
    return {
      [`${n}${o}-circle`]: { width: t, minWidth: t, borderRadius: '50%' },
      [`${n}${o}-round`]: { borderRadius: t }
    }
  },
  At = e => v({ width: e * 2, minWidth: e * 2 }, wt(e)),
  Rl = e => {
    const {
      borderRadiusSM: t,
      skeletonButtonCls: n,
      controlHeight: o,
      controlHeightLG: a,
      controlHeightSM: i,
      color: l
    } = e
    return v(
      v(
        v(
          v(
            v(
              {
                [`${n}`]: v(
                  {
                    display: 'inline-block',
                    verticalAlign: 'top',
                    background: l,
                    borderRadius: t,
                    width: o * 2,
                    minWidth: o * 2
                  },
                  At(o)
                )
              },
              Et(e, o, n)
            ),
            { [`${n}-lg`]: v({}, At(a)) }
          ),
          Et(e, a, `${n}-lg`)
        ),
        { [`${n}-sm`]: v({}, At(i)) }
      ),
      Et(e, i, `${n}-sm`)
    )
  },
  Dl = e => {
    const {
      componentCls: t,
      skeletonAvatarCls: n,
      skeletonTitleCls: o,
      skeletonParagraphCls: a,
      skeletonButtonCls: i,
      skeletonInputCls: l,
      skeletonImageCls: r,
      controlHeight: c,
      controlHeightLG: p,
      controlHeightSM: d,
      color: s,
      padding: b,
      marginSM: f,
      borderRadius: m,
      skeletonTitleHeight: S,
      skeletonBlockRadius: C,
      skeletonParagraphLineHeight: I,
      controlHeightXS: T,
      skeletonParagraphMarginTop: D
    } = e
    return {
      [`${t}`]: {
        display: 'table',
        width: '100%',
        [`${t}-header`]: {
          display: 'table-cell',
          paddingInlineEnd: b,
          verticalAlign: 'top',
          [`${n}`]: v(
            { display: 'inline-block', verticalAlign: 'top', background: s },
            ze(c)
          ),
          [`${n}-circle`]: { borderRadius: '50%' },
          [`${n}-lg`]: v({}, ze(p)),
          [`${n}-sm`]: v({}, ze(d))
        },
        [`${t}-content`]: {
          display: 'table-cell',
          width: '100%',
          verticalAlign: 'top',
          [`${o}`]: {
            width: '100%',
            height: S,
            background: s,
            borderRadius: C,
            [`+ ${a}`]: { marginBlockStart: d }
          },
          [`${a}`]: {
            padding: 0,
            '> li': {
              width: '100%',
              height: I,
              listStyle: 'none',
              background: s,
              borderRadius: C,
              '+ li': { marginBlockStart: T }
            }
          },
          [`${a}> li:last-child:not(:first-child):not(:nth-child(2))`]: {
            width: '61%'
          }
        },
        [`&-round ${t}-content`]: { [`${o}, ${a} > li`]: { borderRadius: m } }
      },
      [`${t}-with-avatar ${t}-content`]: {
        [`${o}`]: { marginBlockStart: f, [`+ ${a}`]: { marginBlockStart: D } }
      },
      [`${t}${t}-element`]: v(
        v(
          v(v({ display: 'inline-block', width: 'auto' }, Rl(e)), Ol(e)),
          El(e)
        ),
        Al(e)
      ),
      [`${t}${t}-block`]: {
        width: '100%',
        [`${i}`]: { width: '100%' },
        [`${l}`]: { width: '100%' }
      },
      [`${t}${t}-active`]: {
        [`
        ${o},
        ${a} > li,
        ${n},
        ${i},
        ${l},
        ${r}
      `]: v({}, Bl(e))
      }
    }
  },
  ot = $t(
    'Skeleton',
    e => {
      const { componentCls: t } = e,
        n = Qe(e, {
          skeletonAvatarCls: `${t}-avatar`,
          skeletonTitleCls: `${t}-title`,
          skeletonParagraphCls: `${t}-paragraph`,
          skeletonButtonCls: `${t}-button`,
          skeletonInputCls: `${t}-input`,
          skeletonImageCls: `${t}-image`,
          imageSizeBase: e.controlHeight * 1.5,
          skeletonTitleHeight: e.controlHeight / 2,
          skeletonBlockRadius: e.borderRadiusSM,
          skeletonParagraphLineHeight: e.controlHeight / 2,
          skeletonParagraphMarginTop: e.marginLG + e.marginXXS,
          borderRadius: 100,
          skeletonLoadingBackground: `linear-gradient(90deg, ${e.color} 25%, ${e.colorGradientEnd} 37%, ${e.color} 63%)`,
          skeletonLoadingMotionDuration: '1.4s'
        })
      return [Dl(n)]
    },
    e => {
      const { colorFillContent: t, colorFill: n } = e
      return { color: t, colorGradientEnd: n }
    }
  ),
  Ll = () => ({
    active: { type: Boolean, default: void 0 },
    loading: { type: Boolean, default: void 0 },
    prefixCls: String,
    avatar: { type: [Boolean, Object], default: void 0 },
    title: { type: [Boolean, Object], default: void 0 },
    paragraph: { type: [Boolean, Object], default: void 0 },
    round: { type: Boolean, default: void 0 }
  })
function Rt(e) {
  return e && typeof e == 'object' ? e : {}
}
function kl(e, t) {
  return e && !t
    ? { size: 'large', shape: 'square' }
    : { size: 'large', shape: 'circle' }
}
function Hl(e, t) {
  return !e && t ? { width: '38%' } : e && t ? { width: '50%' } : {}
}
function Kl(e, t) {
  const n = {}
  return (
    (!e || !t) && (n.width = '61%'), !e && t ? (n.rows = 3) : (n.rows = 2), n
  )
}
const zl = G({
    compatConfig: { MODE: 3 },
    name: 'ASkeleton',
    props: nt(Ll(), { avatar: !1, title: !0, paragraph: !0 }),
    setup(e, t) {
      let { slots: n } = t
      const { prefixCls: o, direction: a } = Ce('skeleton', e),
        [i, l] = ot(o)
      return () => {
        var r
        const {
            loading: c,
            avatar: p,
            title: d,
            paragraph: s,
            active: b,
            round: f
          } = e,
          m = o.value
        if (c || e.loading === void 0) {
          const S = !!p || p === '',
            C = !!d || d === '',
            I = !!s || s === ''
          let T
          if (S) {
            const g = v(v({ prefixCls: `${m}-avatar` }, kl(C, I)), Rt(p))
            T = u('div', { class: `${m}-header` }, [u(Ct, g, null)])
          }
          let D
          if (C || I) {
            let g
            if (C) {
              const x = v(v({ prefixCls: `${m}-title` }, Hl(S, I)), Rt(d))
              g = u(Yt, x, null)
            }
            let w
            if (I) {
              const x = v(v({ prefixCls: `${m}-paragraph` }, Kl(S, C)), Rt(s))
              w = u(_l, x, null)
            }
            D = u('div', { class: `${m}-content` }, [g, w])
          }
          const H = oe(m, {
            [`${m}-with-avatar`]: S,
            [`${m}-active`]: b,
            [`${m}-rtl`]: a.value === 'rtl',
            [`${m}-round`]: f,
            [l.value]: !0
          })
          return i(u('div', { class: H }, [T, D]))
        }
        return (r = n.default) === null || r === void 0 ? void 0 : r.call(n)
      }
    }
  }),
  ge = zl,
  Nl = () => v(v({}, xt()), { size: String, block: Boolean }),
  Wl = G({
    compatConfig: { MODE: 3 },
    name: 'ASkeletonButton',
    props: nt(Nl(), { size: 'default' }),
    setup(e) {
      const { prefixCls: t } = Ce('skeleton', e),
        [n, o] = ot(t),
        a = $(() =>
          oe(
            t.value,
            `${t.value}-element`,
            { [`${t.value}-active`]: e.active, [`${t.value}-block`]: e.block },
            o.value
          )
        )
      return () =>
        n(
          u('div', { class: a.value }, [
            u(Ct, R(R({}, e), {}, { prefixCls: `${t.value}-button` }), null)
          ])
        )
    }
  }),
  vo = Wl,
  Fl = G({
    compatConfig: { MODE: 3 },
    name: 'ASkeletonInput',
    props: v(v({}, zt(xt(), ['shape'])), { size: String, block: Boolean }),
    setup(e) {
      const { prefixCls: t } = Ce('skeleton', e),
        [n, o] = ot(t),
        a = $(() =>
          oe(
            t.value,
            `${t.value}-element`,
            { [`${t.value}-active`]: e.active, [`${t.value}-block`]: e.block },
            o.value
          )
        )
      return () =>
        n(
          u('div', { class: a.value }, [
            u(Ct, R(R({}, e), {}, { prefixCls: `${t.value}-input` }), null)
          ])
        )
    }
  }),
  fo = Fl,
  Gl =
    'M365.714286 329.142857q0 45.714286-32.036571 77.677714t-77.677714 32.036571-77.677714-32.036571-32.036571-77.677714 32.036571-77.677714 77.677714-32.036571 77.677714 32.036571 32.036571 77.677714zM950.857143 548.571429l0 256-804.571429 0 0-109.714286 182.857143-182.857143 91.428571 91.428571 292.571429-292.571429zM1005.714286 146.285714l-914.285714 0q-7.460571 0-12.873143 5.412571t-5.412571 12.873143l0 694.857143q0 7.460571 5.412571 12.873143t12.873143 5.412571l914.285714 0q7.460571 0 12.873143-5.412571t5.412571-12.873143l0-694.857143q0-7.460571-5.412571-12.873143t-12.873143-5.412571zM1097.142857 164.571429l0 694.857143q0 37.741714-26.843429 64.585143t-64.585143 26.843429l-914.285714 0q-37.741714 0-64.585143-26.843429t-26.843429-64.585143l0-694.857143q0-37.741714 26.843429-64.585143t64.585143-26.843429l914.285714 0q37.741714 0 64.585143 26.843429t26.843429 64.585143z',
  jl = G({
    compatConfig: { MODE: 3 },
    name: 'ASkeletonImage',
    props: zt(xt(), ['size', 'shape', 'active']),
    setup(e) {
      const { prefixCls: t } = Ce('skeleton', e),
        [n, o] = ot(t),
        a = $(() => oe(t.value, `${t.value}-element`, o.value))
      return () =>
        n(
          u('div', { class: a.value }, [
            u('div', { class: `${t.value}-image` }, [
              u(
                'svg',
                {
                  viewBox: '0 0 1098 1024',
                  xmlns: 'http://www.w3.org/2000/svg',
                  class: `${t.value}-image-svg`
                },
                [u('path', { d: Gl, class: `${t.value}-image-path` }, null)]
              )
            ])
          ])
        )
    }
  }),
  po = jl,
  Xl = () => v(v({}, xt()), { shape: String }),
  Vl = G({
    compatConfig: { MODE: 3 },
    name: 'ASkeletonAvatar',
    props: nt(Xl(), { size: 'default', shape: 'circle' }),
    setup(e) {
      const { prefixCls: t } = Ce('skeleton', e),
        [n, o] = ot(t),
        a = $(() =>
          oe(
            t.value,
            `${t.value}-element`,
            { [`${t.value}-active`]: e.active },
            o.value
          )
        )
      return () =>
        n(
          u('div', { class: a.value }, [
            u(Ct, R(R({}, e), {}, { prefixCls: `${t.value}-avatar` }), null)
          ])
        )
    }
  }),
  mo = Vl
ge.Button = vo
ge.Avatar = mo
ge.Input = fo
ge.Image = po
ge.Title = Yt
ge.install = function(e) {
  return (
    e.component(ge.name, ge),
    e.component(ge.Button.name, vo),
    e.component(ge.Avatar.name, mo),
    e.component(ge.Input.name, fo),
    e.component(ge.Image.name, po),
    e.component(ge.Title.name, Yt),
    e
  )
}
const { TabPane: Yl } = Ke,
  ql = () => ({
    prefixCls: String,
    title: V.any,
    extra: V.any,
    bordered: { type: Boolean, default: !0 },
    bodyStyle: { type: Object, default: void 0 },
    headStyle: { type: Object, default: void 0 },
    loading: { type: Boolean, default: !1 },
    hoverable: { type: Boolean, default: !1 },
    type: { type: String },
    size: { type: String },
    actions: V.any,
    tabList: { type: Array },
    tabBarExtraContent: V.any,
    activeTabKey: String,
    defaultActiveTabKey: String,
    cover: V.any,
    onTabChange: { type: Function }
  }),
  Ul = G({
    compatConfig: { MODE: 3 },
    name: 'ACard',
    inheritAttrs: !1,
    props: ql(),
    slots: Object,
    setup(e, t) {
      let { slots: n, attrs: o } = t
      const { prefixCls: a, direction: i, size: l } = Ce('card', e),
        [r, c] = Cl(a),
        p = b =>
          b.map((m, S) =>
            (en(m) && !_o(m)) || !en(m)
              ? u(
                  'li',
                  {
                    style: { width: `${100 / b.length}%` },
                    key: `action-${S}`
                  },
                  [u('span', null, [m])]
                )
              : null
          ),
        d = b => {
          var f
          ;(f = e.onTabChange) === null || f === void 0 || f.call(e, b)
        },
        s = function() {
          let b =
              arguments.length > 0 && arguments[0] !== void 0
                ? arguments[0]
                : [],
            f
          return (
            b.forEach(m => {
              m && Fa(m.type) && m.type.__ANT_CARD_GRID && (f = !0)
            }),
            f
          )
        }
      return () => {
        var b, f, m, S, C, I
        const {
            headStyle: T = {},
            bodyStyle: D = {},
            loading: H,
            bordered: g = !0,
            type: w,
            tabList: x,
            hoverable: P,
            activeTabKey: L,
            defaultActiveTabKey: M,
            tabBarExtraContent: j = Ye(
              (b = n.tabBarExtraContent) === null || b === void 0
                ? void 0
                : b.call(n)
            ),
            title: J = Ye(
              (f = n.title) === null || f === void 0 ? void 0 : f.call(n)
            ),
            extra: te = Ye(
              (m = n.extra) === null || m === void 0 ? void 0 : m.call(n)
            ),
            actions: se = Ye(
              (S = n.actions) === null || S === void 0 ? void 0 : S.call(n)
            ),
            cover: K = Ye(
              (C = n.cover) === null || C === void 0 ? void 0 : C.call(n)
            )
          } = e,
          Z = bt((I = n.default) === null || I === void 0 ? void 0 : I.call(n)),
          E = a.value,
          ie = {
            [`${E}`]: !0,
            [c.value]: !0,
            [`${E}-loading`]: H,
            [`${E}-bordered`]: g,
            [`${E}-hoverable`]: !!P,
            [`${E}-contain-grid`]: s(Z),
            [`${E}-contain-tabs`]: x && x.length,
            [`${E}-${l.value}`]: l.value,
            [`${E}-type-${w}`]: !!w,
            [`${E}-rtl`]: i.value === 'rtl'
          },
          q = u(
            ge,
            { loading: !0, active: !0, paragraph: { rows: 4 }, title: !1 },
            { default: () => [Z] }
          ),
          fe = L !== void 0,
          _ = {
            size: 'large',
            [fe ? 'activeKey' : 'defaultActiveKey']: fe ? L : M,
            onChange: d,
            class: `${E}-head-tabs`
          }
        let W
        const Q =
          x && x.length
            ? u(Ke, _, {
                default: () => [
                  x.map(h => {
                    const { tab: O, slots: k } = h,
                      X = k == null ? void 0 : k.tab
                    Me(
                      !k,
                      'Card',
                      'tabList slots is deprecated, Please use `customTab` instead.'
                    )
                    let U = O !== void 0 ? O : n[X] ? n[X](h) : null
                    return (
                      (U = jo(n, 'customTab', h, () => [U])),
                      u(Yl, { tab: U, key: h.key, disabled: h.disabled }, null)
                    )
                  })
                ],
                rightExtra: j ? () => j : null
              })
            : null
        ;(J || te || Q) &&
          (W = u('div', { class: `${E}-head`, style: T }, [
            u('div', { class: `${E}-head-wrapper` }, [
              J && u('div', { class: `${E}-head-title` }, [J]),
              te && u('div', { class: `${E}-extra` }, [te])
            ]),
            Q
          ]))
        const re = K ? u('div', { class: `${E}-cover` }, [K]) : null,
          de = u('div', { class: `${E}-body`, style: D }, [H ? q : Z]),
          le =
            se && se.length ? u('ul', { class: `${E}-actions` }, [p(se)]) : null
        return r(
          u(
            'div',
            R(R({ ref: 'cardContainerRef' }, o), {}, { class: [ie, o.class] }),
            [W, re, Z && Z.length ? de : null, le]
          )
        )
      }
    }
  }),
  Je = Ul,
  Zl = () => ({
    prefixCls: String,
    title: _t(),
    description: _t(),
    avatar: _t()
  }),
  kt = G({
    compatConfig: { MODE: 3 },
    name: 'ACardMeta',
    props: Zl(),
    slots: Object,
    setup(e, t) {
      let { slots: n } = t
      const { prefixCls: o } = Ce('card', e)
      return () => {
        const a = { [`${o.value}-meta`]: !0 },
          i = Ue(n, e, 'avatar'),
          l = Ue(n, e, 'title'),
          r = Ue(n, e, 'description'),
          c = i ? u('div', { class: `${o.value}-meta-avatar` }, [i]) : null,
          p = l ? u('div', { class: `${o.value}-meta-title` }, [l]) : null,
          d = r
            ? u('div', { class: `${o.value}-meta-description` }, [r])
            : null,
          s =
            p || d
              ? u('div', { class: `${o.value}-meta-detail` }, [p, d])
              : null
        return u('div', { class: a }, [c, s])
      }
    }
  }),
  Jl = () => ({ prefixCls: String, hoverable: { type: Boolean, default: !0 } }),
  Ht = G({
    compatConfig: { MODE: 3 },
    name: 'ACardGrid',
    __ANT_CARD_GRID: !0,
    props: Jl(),
    setup(e, t) {
      let { slots: n } = t
      const { prefixCls: o } = Ce('card', e),
        a = $(() => ({
          [`${o.value}-grid`]: !0,
          [`${o.value}-grid-hoverable`]: e.hoverable
        }))
      return () => {
        var i
        return u('div', { class: a.value }, [
          (i = n.default) === null || i === void 0 ? void 0 : i.call(n)
        ])
      }
    }
  })
Je.Meta = kt
Je.Grid = Ht
Je.install = function(e) {
  return (
    e.component(Je.name, Je),
    e.component(kt.name, kt),
    e.component(Ht.name, Ht),
    e
  )
}
export {
  Je as C,
  si as D,
  jn as E,
  Oe as M,
  ge as S,
  Fa as a,
  pn as b,
  Ii as c,
  ai as g,
  Nt as i,
  mn as r,
  ci as u
}

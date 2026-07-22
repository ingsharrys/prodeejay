import {
  d as pe,
  g as k,
  c as g,
  r as ce,
  w as Ee,
  j as Xe,
  p as Ue,
  n as et,
  s as te,
  z as Ct,
  v as tt,
  x as qn,
  k as wl,
  l as Ne,
  m as ht,
  F as dt,
  M as Ra,
  i as Zt,
  T as Na,
  A as $l,
  L as Pn,
  N as ze,
  U as Ba,
  V as vn,
  W as Aa,
  X as Fa,
  Y as za,
  E as Co,
  Z as Ma,
  h as Ze,
  o as La,
  a as ja,
  I as $t,
  u as at,
  Q as pn
} from '../common/vendor.0319ebde.js'
import {
  s as qe,
  o as st,
  P as Le,
  b as be,
  _ as b,
  q as Ha,
  g as Ht,
  m as Wt,
  r as ct,
  v as So,
  u as We,
  a as L,
  c as re,
  w as kl,
  x as zt,
  K as Yn,
  y as Mt,
  z as on,
  f as $e,
  d as Ye,
  e as He,
  B as Lt,
  D as Ol,
  E as Zn,
  C as Wa,
  A as ot,
  F as Va,
  G as Ga,
  H as Xa,
  I as wo,
  L as Ua,
  J as $o,
  t as qa,
  M as Ya,
  h as Za,
  N as Ja,
  j as Qa,
  k as rt,
  p as ko,
  l as er
} from '../common/Dashboard.071f9192.js'
import { e as Je, u as tr, A as Oo } from '../common/index.69d3efbf.js'
import { c as Pl } from '../common/createLucideIcon.226fd43f.js'
import {
  u as Vt,
  F as jt,
  f as nr,
  h as Jn,
  j as Jt,
  k as or,
  l as Po,
  t as lr,
  r as Eo,
  B as ar,
  m as Qn,
  e as rr,
  n as El,
  N as Io,
  d as mn,
  o as ir,
  p as Ko,
  q as sr,
  T as To
} from '../common/index.5b4de55e.js'
import {
  w as Ot,
  j as En,
  k as dr,
  l as cr,
  r as ur,
  e as fr,
  d as vr,
  g as pr,
  f as mr,
  h as _o,
  m as hr,
  p as St,
  q as Qe,
  c as Pt,
  t as gr,
  o as nt,
  v as Il,
  x as eo,
  y as yr,
  z as kt,
  R as Kl,
  A as Do,
  b as Et,
  B as br,
  i as xr,
  u as Cr,
  C as Sr,
  K as bt,
  a as wr
} from '../common/shallowequal.234d6013.js'
import {
  i as $r,
  E as kr,
  u as Or,
  D as Pr,
  a as Er,
  b as Ir,
  r as Kr,
  M as ln,
  c as Tr,
  g as _r,
  C as Dr
} from '../common/index.f1e5ace8.js'
import {
  i as Ro,
  p as to,
  a as Tl,
  D as Rr,
  L as Nr
} from '../common/index.1473ec6f.js'
import { R as No, S as Br, P as Ar } from '../common/index.a0b70db3.js'
import { b as Fr, B as Rt, u as zr, N as Bo } from '../common/index.5693d46f.js'
import {
  k as Mr,
  l as Lr,
  m as jr,
  n as Hr,
  F as Wr,
  o as Vr,
  M as Gr,
  P as Xr,
  p as Ur,
  q as qr,
  r as Yr,
  T as At
} from '../common/antd.ecdb83f5.js'
import { F as Ft } from '../common/index.a631123d.js'
import '../main.8014daeb.js'
function Zr(e, t, n, o) {
  const l = n - t
  return (
    (e /= o / 2),
    e < 1 ? (l / 2) * e * e * e + t : (l / 2) * ((e -= 2) * e * e + 2) + t
  )
}
function In(e) {
  return e != null && e === e.window
}
function Jr(e, t) {
  var n, o
  if (typeof window > 'u') return 0
  const l = t ? 'scrollTop' : 'scrollLeft'
  let a = 0
  return (
    In(e)
      ? (a = e[t ? 'scrollY' : 'scrollX'])
      : e instanceof Document
      ? (a = e.documentElement[l])
      : (e instanceof HTMLElement || e) && (a = e[l]),
    e &&
      !In(e) &&
      typeof a != 'number' &&
      (a =
        (o = ((n = e.ownerDocument) !== null && n !== void 0 ? n : e)
          .documentElement) === null || o === void 0
          ? void 0
          : o[l]),
    a
  )
}
function Qr(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}
  const { getContainer: n = () => window, callback: o, duration: l = 450 } = t,
    a = n(),
    r = Jr(a, !0),
    i = Date.now(),
    d = () => {
      const c = Date.now() - i,
        f = Zr(c > l ? l : c, r, e, l)
      In(a)
        ? a.scrollTo(window.scrollX, f)
        : a instanceof Document
        ? (a.documentElement.scrollTop = f)
        : (a.scrollTop = f),
        c < l ? Ot(d) : typeof o == 'function' && o()
    }
  Ot(d)
}
var ei = /\s/
function ti(e) {
  for (var t = e.length; t-- && ei.test(e.charAt(t)); );
  return t
}
var ni = /^\s+/
function oi(e) {
  return e && e.slice(0, ti(e) + 1).replace(ni, '')
}
var Ao = 0 / 0,
  li = /^[-+]0x[0-9a-f]+$/i,
  ai = /^0b[01]+$/i,
  ri = /^0o[0-7]+$/i,
  ii = parseInt
function Fo(e) {
  if (typeof e == 'number') return e
  if ($r(e)) return Ao
  if (En(e)) {
    var t = typeof e.valueOf == 'function' ? e.valueOf() : e
    e = En(t) ? t + '' : t
  }
  if (typeof e != 'string') return e === 0 ? e : +e
  e = oi(e)
  var n = ai.test(e)
  return n || ri.test(e) ? ii(e.slice(2), n ? 2 : 8) : li.test(e) ? Ao : +e
}
var si = function() {
  return dr.Date.now()
}
const hn = si
var di = 'Expected a function',
  ci = Math.max,
  ui = Math.min
function fi(e, t, n) {
  var o,
    l,
    a,
    r,
    i,
    d,
    u = 0,
    c = !1,
    f = !1,
    m = !0
  if (typeof e != 'function') throw new TypeError(di)
  ;(t = Fo(t) || 0),
    En(n) &&
      ((c = !!n.leading),
      (f = 'maxWait' in n),
      (a = f ? ci(Fo(n.maxWait) || 0, t) : a),
      (m = 'trailing' in n ? !!n.trailing : m))
  function w(K) {
    var S = o,
      I = l
    return (o = l = void 0), (u = K), (r = e.apply(I, S)), r
  }
  function x(K) {
    return (u = K), (i = setTimeout(p, t)), c ? w(K) : r
  }
  function v(K) {
    var S = K - d,
      I = K - u,
      y = t - S
    return f ? ui(y, a - I) : y
  }
  function s(K) {
    var S = K - d,
      I = K - u
    return d === void 0 || S >= t || S < 0 || (f && I >= a)
  }
  function p() {
    var K = hn()
    if (s(K)) return $(K)
    i = setTimeout(p, v(K))
  }
  function $(K) {
    return (i = void 0), m && o ? w(K) : ((o = l = void 0), r)
  }
  function h() {
    i !== void 0 && clearTimeout(i), (u = 0), (o = d = l = i = void 0)
  }
  function O() {
    return i === void 0 ? r : $(hn())
  }
  function C() {
    var K = hn(),
      S = s(K)
    if (((o = arguments), (l = this), (d = K), S)) {
      if (i === void 0) return x(d)
      if (f) return clearTimeout(i), (i = setTimeout(p, t)), w(d)
    }
    return i === void 0 && (i = setTimeout(p, t)), r
  }
  return (C.cancel = h), (C.flush = O), C
}
function vi(e) {
  for (var t = -1, n = e == null ? 0 : e.length, o = {}; ++t < n; ) {
    var l = e[t]
    o[l[0]] = l[1]
  }
  return o
}
const _l = () => ({
    arrow: qe([Boolean, Object]),
    trigger: { type: [Array, String] },
    menu: st(),
    overlay: Le.any,
    visible: be(),
    open: be(),
    disabled: be(),
    danger: be(),
    autofocus: be(),
    align: st(),
    getPopupContainer: Function,
    prefixCls: String,
    transitionName: String,
    placement: String,
    overlayClassName: String,
    overlayStyle: st(),
    forceRender: be(),
    mouseEnterDelay: Number,
    mouseLeaveDelay: Number,
    openClassName: String,
    minOverlayWidthMatchTrigger: be(),
    destroyPopupOnHide: be(),
    onVisibleChange: { type: Function },
    'onUpdate:visible': { type: Function },
    onOpenChange: { type: Function },
    'onUpdate:open': { type: Function }
  }),
  gn = Fr(),
  pi = () =>
    b(b({}, _l()), {
      type: gn.type,
      size: String,
      htmlType: gn.htmlType,
      href: String,
      disabled: be(),
      prefixCls: String,
      icon: Le.any,
      title: String,
      loading: gn.loading,
      onClick: Ha()
    }),
  mi = e => {
    const { componentCls: t, antCls: n, paddingXS: o, opacityLoading: l } = e
    return {
      [`${t}-button`]: {
        whiteSpace: 'nowrap',
        [`&${n}-btn-group > ${n}-btn`]: {
          [`&-loading, &-loading + ${n}-btn`]: {
            cursor: 'default',
            pointerEvents: 'none',
            opacity: l
          },
          [`&:last-child:not(:first-child):not(${n}-btn-icon-only)`]: {
            paddingInline: o
          }
        }
      }
    }
  },
  hi = mi,
  gi = e => {
    const {
        componentCls: t,
        menuCls: n,
        colorError: o,
        colorTextLightSolid: l
      } = e,
      a = `${n}-item`
    return {
      [`${t}, ${t}-menu-submenu`]: {
        [`${n} ${a}`]: {
          [`&${a}-danger:not(${a}-disabled)`]: {
            color: o,
            '&:hover': { color: l, backgroundColor: o }
          }
        }
      }
    }
  },
  yi = gi,
  bi = e => {
    const {
      componentCls: t,
      menuCls: n,
      zIndexPopup: o,
      dropdownArrowDistance: l,
      dropdownArrowOffset: a,
      sizePopupArrow: r,
      antCls: i,
      iconCls: d,
      motionDurationMid: u,
      dropdownPaddingVertical: c,
      fontSize: f,
      dropdownEdgeChildPadding: m,
      colorTextDisabled: w,
      fontSizeIcon: x,
      controlPaddingHorizontal: v,
      colorBgElevated: s,
      boxShadowPopoverArrow: p
    } = e
    return [
      {
        [t]: b(b({}, ct(e)), {
          position: 'absolute',
          top: -9999,
          left: { _skip_check_: !0, value: -9999 },
          zIndex: o,
          display: 'block',
          '&::before': {
            position: 'absolute',
            insetBlock: -l + r / 2,
            zIndex: -9999,
            opacity: 1e-4,
            content: '""'
          },
          [`${t}-wrap`]: {
            position: 'relative',
            [`${i}-btn > ${d}-down`]: { fontSize: x },
            [`${d}-down::before`]: { transition: `transform ${u}` }
          },
          [`${t}-wrap-open`]: {
            [`${d}-down::before`]: { transform: 'rotate(180deg)' }
          },
          '\n        &-hidden,\n        &-menu-hidden,\n        &-menu-submenu-hidden\n      ': {
            display: 'none'
          },
          [`
        &-show-arrow${t}-placement-topLeft,
        &-show-arrow${t}-placement-top,
        &-show-arrow${t}-placement-topRight
      `]: { paddingBottom: l },
          [`
        &-show-arrow${t}-placement-bottomLeft,
        &-show-arrow${t}-placement-bottom,
        &-show-arrow${t}-placement-bottomRight
      `]: { paddingTop: l },
          [`${t}-arrow`]: b(
            { position: 'absolute', zIndex: 1, display: 'block' },
            ur(r, e.borderRadiusXS, e.borderRadiusOuter, s, p)
          ),
          [`
        &-placement-top > ${t}-arrow,
        &-placement-topLeft > ${t}-arrow,
        &-placement-topRight > ${t}-arrow
      `]: { bottom: l, transform: 'translateY(100%) rotate(180deg)' },
          [`&-placement-top > ${t}-arrow`]: {
            left: { _skip_check_: !0, value: '50%' },
            transform: 'translateX(-50%) translateY(100%) rotate(180deg)'
          },
          [`&-placement-topLeft > ${t}-arrow`]: {
            left: { _skip_check_: !0, value: a }
          },
          [`&-placement-topRight > ${t}-arrow`]: {
            right: { _skip_check_: !0, value: a }
          },
          [`
          &-placement-bottom > ${t}-arrow,
          &-placement-bottomLeft > ${t}-arrow,
          &-placement-bottomRight > ${t}-arrow
        `]: { top: l, transform: 'translateY(-100%)' },
          [`&-placement-bottom > ${t}-arrow`]: {
            left: { _skip_check_: !0, value: '50%' },
            transform: 'translateY(-100%) translateX(-50%)'
          },
          [`&-placement-bottomLeft > ${t}-arrow`]: {
            left: { _skip_check_: !0, value: a }
          },
          [`&-placement-bottomRight > ${t}-arrow`]: {
            right: { _skip_check_: !0, value: a }
          },
          [`&${i}-slide-down-enter${i}-slide-down-enter-active${t}-placement-bottomLeft,
          &${i}-slide-down-appear${i}-slide-down-appear-active${t}-placement-bottomLeft,
          &${i}-slide-down-enter${i}-slide-down-enter-active${t}-placement-bottom,
          &${i}-slide-down-appear${i}-slide-down-appear-active${t}-placement-bottom,
          &${i}-slide-down-enter${i}-slide-down-enter-active${t}-placement-bottomRight,
          &${i}-slide-down-appear${i}-slide-down-appear-active${t}-placement-bottomRight`]: {
            animationName: fr
          },
          [`&${i}-slide-up-enter${i}-slide-up-enter-active${t}-placement-topLeft,
          &${i}-slide-up-appear${i}-slide-up-appear-active${t}-placement-topLeft,
          &${i}-slide-up-enter${i}-slide-up-enter-active${t}-placement-top,
          &${i}-slide-up-appear${i}-slide-up-appear-active${t}-placement-top,
          &${i}-slide-up-enter${i}-slide-up-enter-active${t}-placement-topRight,
          &${i}-slide-up-appear${i}-slide-up-appear-active${t}-placement-topRight`]: {
            animationName: vr
          },
          [`&${i}-slide-down-leave${i}-slide-down-leave-active${t}-placement-bottomLeft,
          &${i}-slide-down-leave${i}-slide-down-leave-active${t}-placement-bottom,
          &${i}-slide-down-leave${i}-slide-down-leave-active${t}-placement-bottomRight`]: {
            animationName: pr
          },
          [`&${i}-slide-up-leave${i}-slide-up-leave-active${t}-placement-topLeft,
          &${i}-slide-up-leave${i}-slide-up-leave-active${t}-placement-top,
          &${i}-slide-up-leave${i}-slide-up-leave-active${t}-placement-topRight`]: {
            animationName: mr
          }
        })
      },
      {
        [`${t} ${n}`]: { position: 'relative', margin: 0 },
        [`${n}-submenu-popup`]: {
          position: 'absolute',
          zIndex: o,
          background: 'transparent',
          boxShadow: 'none',
          transformOrigin: '0 0',
          'ul,li': { listStyle: 'none' },
          ul: { marginInline: '0.3em' }
        },
        [`${t}, ${t}-menu-submenu`]: {
          [n]: b(
            b(
              {
                padding: m,
                listStyleType: 'none',
                backgroundColor: s,
                backgroundClip: 'padding-box',
                borderRadius: e.borderRadiusLG,
                outline: 'none',
                boxShadow: e.boxShadowSecondary
              },
              So(e)
            ),
            {
              [`${n}-item-group-title`]: {
                padding: `${c}px ${v}px`,
                color: e.colorTextDescription,
                transition: `all ${u}`
              },
              [`${n}-item`]: {
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                borderRadius: e.borderRadiusSM
              },
              [`${n}-item-icon`]: {
                minWidth: f,
                marginInlineEnd: e.marginXS,
                fontSize: e.fontSizeSM
              },
              [`${n}-title-content`]: {
                flex: 'auto',
                '> a': {
                  color: 'inherit',
                  transition: `all ${u}`,
                  '&:hover': { color: 'inherit' },
                  '&::after': { position: 'absolute', inset: 0, content: '""' }
                }
              },
              [`${n}-item, ${n}-submenu-title`]: b(
                b(
                  {
                    clear: 'both',
                    margin: 0,
                    padding: `${c}px ${v}px`,
                    color: e.colorText,
                    fontWeight: 'normal',
                    fontSize: f,
                    lineHeight: e.lineHeight,
                    cursor: 'pointer',
                    transition: `all ${u}`,
                    '&:hover, &-active': {
                      backgroundColor: e.controlItemBgHover
                    }
                  },
                  So(e)
                ),
                {
                  '&-selected': {
                    color: e.colorPrimary,
                    backgroundColor: e.controlItemBgActive,
                    '&:hover, &-active': {
                      backgroundColor: e.controlItemBgActiveHover
                    }
                  },
                  '&-disabled': {
                    color: w,
                    cursor: 'not-allowed',
                    '&:hover': {
                      color: w,
                      backgroundColor: s,
                      cursor: 'not-allowed'
                    },
                    a: { pointerEvents: 'none' }
                  },
                  '&-divider': {
                    height: 1,
                    margin: `${e.marginXXS}px 0`,
                    overflow: 'hidden',
                    lineHeight: 0,
                    backgroundColor: e.colorSplit
                  },
                  [`${t}-menu-submenu-expand-icon`]: {
                    position: 'absolute',
                    insetInlineEnd: e.paddingXS,
                    [`${t}-menu-submenu-arrow-icon`]: {
                      marginInlineEnd: '0 !important',
                      color: e.colorTextDescription,
                      fontSize: x,
                      fontStyle: 'normal'
                    }
                  }
                }
              ),
              [`${n}-item-group-list`]: {
                margin: `0 ${e.marginXS}px`,
                padding: 0,
                listStyle: 'none'
              },
              [`${n}-submenu-title`]: { paddingInlineEnd: v + e.fontSizeSM },
              [`${n}-submenu-vertical`]: { position: 'relative' },
              [`${n}-submenu${n}-submenu-disabled ${t}-menu-submenu-title`]: {
                [`&, ${t}-menu-submenu-arrow-icon`]: {
                  color: w,
                  backgroundColor: s,
                  cursor: 'not-allowed'
                }
              },
              [`${n}-submenu-selected ${t}-menu-submenu-title`]: {
                color: e.colorPrimary
              }
            }
          )
        }
      },
      [
        _o(e, 'slide-up'),
        _o(e, 'slide-down'),
        Ro(e, 'move-up'),
        Ro(e, 'move-down'),
        hr(e, 'zoom-big')
      ]
    ]
  },
  Dl = Ht(
    'Dropdown',
    (e, t) => {
      let { rootPrefixCls: n } = t
      const {
          marginXXS: o,
          sizePopupArrow: l,
          controlHeight: a,
          fontSize: r,
          lineHeight: i,
          paddingXXS: d,
          componentCls: u,
          borderRadiusOuter: c,
          borderRadiusLG: f
        } = e,
        m = (a - r * i) / 2,
        { dropdownArrowOffset: w } = cr({
          sizePopupArrow: l,
          contentRadius: f,
          borderRadiusOuter: c
        }),
        x = Wt(e, {
          menuCls: `${u}-menu`,
          rootPrefixCls: n,
          dropdownArrowDistance: l / 2 + o,
          dropdownArrowOffset: w,
          dropdownPaddingVertical: m,
          dropdownEdgeChildPadding: d
        })
      return [bi(x), hi(x), yi(x)]
    },
    e => ({ zIndexPopup: e.zIndexPopupBase + 50 })
  )
var xi =
  (globalThis && globalThis.__rest) ||
  function(e, t) {
    var n = {}
    for (var o in e)
      Object.prototype.hasOwnProperty.call(e, o) &&
        t.indexOf(o) < 0 &&
        (n[o] = e[o])
    if (e != null && typeof Object.getOwnPropertySymbols == 'function')
      for (var l = 0, o = Object.getOwnPropertySymbols(e); l < o.length; l++)
        t.indexOf(o[l]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(e, o[l]) &&
          (n[o[l]] = e[o[l]])
    return n
  }
const Ci = Rt.Group,
  an = pe({
    compatConfig: { MODE: 3 },
    name: 'ADropdownButton',
    inheritAttrs: !1,
    __ANT_BUTTON: !0,
    props: St(pi(), {
      trigger: 'hover',
      placement: 'bottomRight',
      type: 'default'
    }),
    slots: Object,
    setup(e, t) {
      let { slots: n, attrs: o, emit: l } = t
      const a = m => {
          l('update:visible', m),
            l('visibleChange', m),
            l('update:open', m),
            l('openChange', m)
        },
        { prefixCls: r, direction: i, getPopupContainer: d } = We(
          'dropdown',
          e
        ),
        u = k(() => `${r.value}-button`),
        [c, f] = Dl(r)
      return () => {
        var m, w
        const x = b(b({}, e), o),
          {
            type: v = 'default',
            disabled: s,
            danger: p,
            loading: $,
            htmlType: h,
            class: O = '',
            overlay: C = (m = n.overlay) === null || m === void 0
              ? void 0
              : m.call(n),
            trigger: K,
            align: S,
            open: I,
            visible: y,
            onVisibleChange: E,
            placement: _ = i.value === 'rtl' ? 'bottomLeft' : 'bottomRight',
            href: F,
            title: T,
            icon: M = ((w = n.icon) === null || w === void 0
              ? void 0
              : w.call(n)) || g(kr, null, null),
            mouseEnterDelay: X,
            mouseLeaveDelay: q,
            overlayClassName: ae,
            overlayStyle: H,
            destroyPopupOnHide: U,
            onClick: j,
            'onUpdate:open': Z
          } = x,
          B = xi(x, [
            'type',
            'disabled',
            'danger',
            'loading',
            'htmlType',
            'class',
            'overlay',
            'trigger',
            'align',
            'open',
            'visible',
            'onVisibleChange',
            'placement',
            'href',
            'title',
            'icon',
            'mouseEnterDelay',
            'mouseLeaveDelay',
            'overlayClassName',
            'overlayStyle',
            'destroyPopupOnHide',
            'onClick',
            'onUpdate:open'
          ]),
          V = {
            align: S,
            disabled: s,
            trigger: s ? [] : K,
            placement: _,
            getPopupContainer: d == null ? void 0 : d.value,
            onOpenChange: a,
            mouseEnterDelay: X,
            mouseLeaveDelay: q,
            open: I ?? y,
            overlayClassName: ae,
            overlayStyle: H,
            destroyPopupOnHide: U
          },
          W = g(
            Rt,
            {
              danger: p,
              type: v,
              disabled: s,
              loading: $,
              onClick: j,
              htmlType: h,
              href: F,
              title: T
            },
            { default: n.default }
          ),
          ne = g(Rt, { danger: p, type: v, icon: M }, null)
        return c(
          g(Ci, L(L({}, B), {}, { class: re(u.value, O, f.value) }), {
            default: () => [
              n.leftButton ? n.leftButton({ button: W }) : W,
              g(It, V, {
                default: () => [
                  n.rightButton ? n.rightButton({ button: ne }) : ne
                ],
                overlay: () => C
              })
            ]
          })
        )
      }
    }
  }),
  Rl = pe({
    compatConfig: { MODE: 3 },
    name: 'ADropdown',
    inheritAttrs: !1,
    props: St(_l(), {
      mouseEnterDelay: 0.15,
      mouseLeaveDelay: 0.1,
      placement: 'bottomLeft',
      trigger: 'hover'
    }),
    slots: Object,
    setup(e, t) {
      let { slots: n, attrs: o, emit: l } = t
      const {
          prefixCls: a,
          rootPrefixCls: r,
          direction: i,
          getPopupContainer: d
        } = We('dropdown', e),
        [u, c] = Dl(a),
        f = k(() => {
          const { placement: s = '', transitionName: p } = e
          return p !== void 0
            ? p
            : s.includes('top')
            ? `${r.value}-slide-down`
            : `${r.value}-slide-up`
        })
      Or({
        prefixCls: k(() => `${a.value}-menu`),
        expandIcon: k(() =>
          g('span', { class: `${a.value}-menu-submenu-arrow` }, [
            g(No, { class: `${a.value}-menu-submenu-arrow-icon` }, null)
          ])
        ),
        mode: k(() => 'vertical'),
        selectable: k(() => !1),
        onClick: () => {},
        validator: s => {
          kl()
        }
      })
      const m = () => {
          var s, p, $
          const h =
              e.overlay ||
              ((s = n.overlay) === null || s === void 0 ? void 0 : s.call(n)),
            O = Array.isArray(h) ? h[0] : h
          if (!O) return null
          const C = O.props || {}
          Qe(
            !C.mode || C.mode === 'vertical',
            'Dropdown',
            `mode="${C.mode}" is not supported for Dropdown's Menu.`
          )
          const {
              selectable: K = !1,
              expandIcon: S = ($ =
                (p = O.children) === null || p === void 0
                  ? void 0
                  : p.expandIcon) === null || $ === void 0
                ? void 0
                : $.call(p)
            } = C,
            I =
              typeof S < 'u' && zt(S)
                ? S
                : g('span', { class: `${a.value}-menu-submenu-arrow` }, [
                    g(No, { class: `${a.value}-menu-submenu-arrow-icon` }, null)
                  ])
          return zt(O)
            ? Pt(O, { mode: 'vertical', selectable: K, expandIcon: () => I })
            : O
        },
        w = k(() => {
          const s = e.placement
          if (!s) return i.value === 'rtl' ? 'bottomRight' : 'bottomLeft'
          if (s.includes('Center')) {
            const p = s.slice(0, s.indexOf('Center'))
            return (
              Qe(
                !s.includes('Center'),
                'Dropdown',
                `You are using '${s}' placement in Dropdown, which is deprecated. Try to use '${p}' instead.`
              ),
              p
            )
          }
          return s
        }),
        x = k(() => (typeof e.visible == 'boolean' ? e.visible : e.open)),
        v = s => {
          l('update:visible', s),
            l('visibleChange', s),
            l('update:open', s),
            l('openChange', s)
        }
      return () => {
        var s, p
        const { arrow: $, trigger: h, disabled: O, overlayClassName: C } = e,
          K = (s = n.default) === null || s === void 0 ? void 0 : s.call(n)[0],
          S = Pt(
            K,
            b(
              {
                class: re(
                  (p = K == null ? void 0 : K.props) === null || p === void 0
                    ? void 0
                    : p.class,
                  { [`${a.value}-rtl`]: i.value === 'rtl' },
                  `${a.value}-trigger`
                )
              },
              O ? { disabled: O } : {}
            )
          ),
          I = re(C, c.value, { [`${a.value}-rtl`]: i.value === 'rtl' }),
          y = O ? [] : h
        let E
        y && y.includes('contextmenu') && (E = !0)
        const _ = gr({
            arrowPointAtCenter: typeof $ == 'object' && $.pointAtCenter,
            autoAdjustOverflow: !0
          }),
          F = nt(
            b(b(b({}, e), o), {
              visible: x.value,
              builtinPlacements: _,
              overlayClassName: I,
              arrow: !!$,
              alignPoint: E,
              prefixCls: a.value,
              getPopupContainer: d == null ? void 0 : d.value,
              transitionName: f.value,
              trigger: y,
              onVisibleChange: v,
              placement: w.value
            }),
            ['overlay', 'onUpdate:visible']
          )
        return u(g(Pr, F, { default: () => [S], overlay: m }))
      }
    }
  })
Rl.Button = an
const It = Rl
var Si =
  (globalThis && globalThis.__rest) ||
  function(e, t) {
    var n = {}
    for (var o in e)
      Object.prototype.hasOwnProperty.call(e, o) &&
        t.indexOf(o) < 0 &&
        (n[o] = e[o])
    if (e != null && typeof Object.getOwnPropertySymbols == 'function')
      for (var l = 0, o = Object.getOwnPropertySymbols(e); l < o.length; l++)
        t.indexOf(o[l]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(e, o[l]) &&
          (n[o[l]] = e[o[l]])
    return n
  }
const wi = {
    prefixCls: String,
    name: String,
    id: String,
    type: String,
    defaultChecked: { type: [Boolean, Number], default: void 0 },
    checked: { type: [Boolean, Number], default: void 0 },
    disabled: Boolean,
    tabindex: { type: [Number, String] },
    readonly: Boolean,
    autofocus: Boolean,
    value: Le.any,
    required: Boolean
  },
  Nl = pe({
    compatConfig: { MODE: 3 },
    name: 'Checkbox',
    inheritAttrs: !1,
    props: St(wi, {
      prefixCls: 'rc-checkbox',
      type: 'checkbox',
      defaultChecked: !1
    }),
    emits: ['click', 'change'],
    setup(e, t) {
      let { attrs: n, emit: o, expose: l } = t
      const a = ce(e.checked === void 0 ? e.defaultChecked : e.checked),
        r = ce()
      Ee(
        () => e.checked,
        () => {
          a.value = e.checked
        }
      ),
        l({
          focus() {
            var c
            ;(c = r.value) === null || c === void 0 || c.focus()
          },
          blur() {
            var c
            ;(c = r.value) === null || c === void 0 || c.blur()
          }
        })
      const i = ce(),
        d = c => {
          if (e.disabled) return
          e.checked === void 0 && (a.value = c.target.checked),
            (c.shiftKey = i.value)
          const f = {
            target: b(b({}, e), { checked: c.target.checked }),
            stopPropagation() {
              c.stopPropagation()
            },
            preventDefault() {
              c.preventDefault()
            },
            nativeEvent: c
          }
          e.checked !== void 0 && (r.value.checked = !!e.checked),
            o('change', f),
            (i.value = !1)
        },
        u = c => {
          o('click', c), (i.value = c.shiftKey)
        }
      return () => {
        const {
            prefixCls: c,
            name: f,
            id: m,
            type: w,
            disabled: x,
            readonly: v,
            tabindex: s,
            autofocus: p,
            value: $,
            required: h
          } = e,
          O = Si(e, [
            'prefixCls',
            'name',
            'id',
            'type',
            'disabled',
            'readonly',
            'tabindex',
            'autofocus',
            'value',
            'required'
          ]),
          {
            class: C,
            onFocus: K,
            onBlur: S,
            onKeydown: I,
            onKeypress: y,
            onKeyup: E
          } = n,
          _ = b(b({}, O), n),
          F = Object.keys(_).reduce(
            (X, q) => (
              (q.startsWith('data-') ||
                q.startsWith('aria-') ||
                q === 'role') &&
                (X[q] = _[q]),
              X
            ),
            {}
          ),
          T = re(c, C, { [`${c}-checked`]: a.value, [`${c}-disabled`]: x }),
          M = b(
            b(
              {
                name: f,
                id: m,
                type: w,
                readonly: v,
                disabled: x,
                tabindex: s,
                class: `${c}-input`,
                checked: !!a.value,
                autofocus: p,
                value: $
              },
              F
            ),
            {
              onChange: d,
              onClick: u,
              onFocus: K,
              onBlur: S,
              onKeydown: I,
              onKeypress: y,
              onKeyup: E,
              required: h
            }
          )
        return g('span', { class: T }, [
          g('input', L({ ref: r }, M), null),
          g('span', { class: `${c}-inner` }, null)
        ])
      }
    }
  }),
  Bl = Symbol('radioGroupContextKey'),
  $i = e => {
    Ue(Bl, e)
  },
  ki = () => Xe(Bl, void 0),
  Al = Symbol('radioOptionTypeContextKey'),
  Oi = e => {
    Ue(Al, e)
  },
  Pi = () => Xe(Al, void 0),
  Ei = new Yn('antRadioEffect', {
    '0%': { transform: 'scale(1)', opacity: 0.5 },
    '100%': { transform: 'scale(1.6)', opacity: 0 }
  }),
  Ii = e => {
    const { componentCls: t, antCls: n } = e,
      o = `${t}-group`
    return {
      [o]: b(b({}, ct(e)), {
        display: 'inline-block',
        fontSize: 0,
        [`&${o}-rtl`]: { direction: 'rtl' },
        [`${n}-badge ${n}-badge-count`]: { zIndex: 1 },
        [`> ${n}-badge:not(:first-child) > ${n}-button-wrapper`]: {
          borderInlineStart: 'none'
        }
      })
    }
  },
  Ki = e => {
    const {
        componentCls: t,
        radioWrapperMarginRight: n,
        radioCheckedColor: o,
        radioSize: l,
        motionDurationSlow: a,
        motionDurationMid: r,
        motionEaseInOut: i,
        motionEaseInOutCirc: d,
        radioButtonBg: u,
        colorBorder: c,
        lineWidth: f,
        radioDotSize: m,
        colorBgContainerDisabled: w,
        colorTextDisabled: x,
        paddingXS: v,
        radioDotDisabledColor: s,
        lineType: p,
        radioDotDisabledSize: $,
        wireframe: h,
        colorWhite: O
      } = e,
      C = `${t}-inner`
    return {
      [`${t}-wrapper`]: b(b({}, ct(e)), {
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'baseline',
        marginInlineStart: 0,
        marginInlineEnd: n,
        cursor: 'pointer',
        [`&${t}-wrapper-rtl`]: { direction: 'rtl' },
        '&-disabled': { cursor: 'not-allowed', color: e.colorTextDisabled },
        '&::after': {
          display: 'inline-block',
          width: 0,
          overflow: 'hidden',
          content: '"\\a0"'
        },
        [`${t}-checked::after`]: {
          position: 'absolute',
          insetBlockStart: 0,
          insetInlineStart: 0,
          width: '100%',
          height: '100%',
          border: `${f}px ${p} ${o}`,
          borderRadius: '50%',
          visibility: 'hidden',
          animationName: Ei,
          animationDuration: a,
          animationTimingFunction: i,
          animationFillMode: 'both',
          content: '""'
        },
        [t]: b(b({}, ct(e)), {
          position: 'relative',
          display: 'inline-block',
          outline: 'none',
          cursor: 'pointer',
          alignSelf: 'center'
        }),
        [`${t}-wrapper:hover &,
        &:hover ${C}`]: { borderColor: o },
        [`${t}-input:focus-visible + ${C}`]: b({}, Mt(e)),
        [`${t}:hover::after, ${t}-wrapper:hover &::after`]: {
          visibility: 'visible'
        },
        [`${t}-inner`]: {
          '&::after': {
            boxSizing: 'border-box',
            position: 'absolute',
            insetBlockStart: '50%',
            insetInlineStart: '50%',
            display: 'block',
            width: l,
            height: l,
            marginBlockStart: l / -2,
            marginInlineStart: l / -2,
            backgroundColor: h ? o : O,
            borderBlockStart: 0,
            borderInlineStart: 0,
            borderRadius: l,
            transform: 'scale(0)',
            opacity: 0,
            transition: `all ${a} ${d}`,
            content: '""'
          },
          boxSizing: 'border-box',
          position: 'relative',
          insetBlockStart: 0,
          insetInlineStart: 0,
          display: 'block',
          width: l,
          height: l,
          backgroundColor: u,
          borderColor: c,
          borderStyle: 'solid',
          borderWidth: f,
          borderRadius: '50%',
          transition: `all ${r}`
        },
        [`${t}-input`]: {
          position: 'absolute',
          insetBlockStart: 0,
          insetInlineEnd: 0,
          insetBlockEnd: 0,
          insetInlineStart: 0,
          zIndex: 1,
          cursor: 'pointer',
          opacity: 0
        },
        [`${t}-checked`]: {
          [C]: {
            borderColor: o,
            backgroundColor: h ? u : o,
            '&::after': {
              transform: `scale(${m / l})`,
              opacity: 1,
              transition: `all ${a} ${d}`
            }
          }
        },
        [`${t}-disabled`]: {
          cursor: 'not-allowed',
          [C]: {
            backgroundColor: w,
            borderColor: c,
            cursor: 'not-allowed',
            '&::after': { backgroundColor: s }
          },
          [`${t}-input`]: { cursor: 'not-allowed' },
          [`${t}-disabled + span`]: { color: x, cursor: 'not-allowed' },
          [`&${t}-checked`]: {
            [C]: { '&::after': { transform: `scale(${$ / l})` } }
          }
        },
        [`span${t} + *`]: { paddingInlineStart: v, paddingInlineEnd: v }
      })
    }
  },
  Ti = e => {
    const {
      radioButtonColor: t,
      controlHeight: n,
      componentCls: o,
      lineWidth: l,
      lineType: a,
      colorBorder: r,
      motionDurationSlow: i,
      motionDurationMid: d,
      radioButtonPaddingHorizontal: u,
      fontSize: c,
      radioButtonBg: f,
      fontSizeLG: m,
      controlHeightLG: w,
      controlHeightSM: x,
      paddingXS: v,
      borderRadius: s,
      borderRadiusSM: p,
      borderRadiusLG: $,
      radioCheckedColor: h,
      radioButtonCheckedBg: O,
      radioButtonHoverColor: C,
      radioButtonActiveColor: K,
      radioSolidCheckedColor: S,
      colorTextDisabled: I,
      colorBgContainerDisabled: y,
      radioDisabledButtonCheckedColor: E,
      radioDisabledButtonCheckedBg: _
    } = e
    return {
      [`${o}-button-wrapper`]: {
        position: 'relative',
        display: 'inline-block',
        height: n,
        margin: 0,
        paddingInline: u,
        paddingBlock: 0,
        color: t,
        fontSize: c,
        lineHeight: `${n - l * 2}px`,
        background: f,
        border: `${l}px ${a} ${r}`,
        borderBlockStartWidth: l + 0.02,
        borderInlineStartWidth: 0,
        borderInlineEndWidth: l,
        cursor: 'pointer',
        transition: [
          `color ${d}`,
          `background ${d}`,
          `border-color ${d}`,
          `box-shadow ${d}`
        ].join(','),
        a: { color: t },
        [`> ${o}-button`]: {
          position: 'absolute',
          insetBlockStart: 0,
          insetInlineStart: 0,
          zIndex: -1,
          width: '100%',
          height: '100%'
        },
        '&:not(:first-child)': {
          '&::before': {
            position: 'absolute',
            insetBlockStart: -l,
            insetInlineStart: -l,
            display: 'block',
            boxSizing: 'content-box',
            width: 1,
            height: '100%',
            paddingBlock: l,
            paddingInline: 0,
            backgroundColor: r,
            transition: `background-color ${i}`,
            content: '""'
          }
        },
        '&:first-child': {
          borderInlineStart: `${l}px ${a} ${r}`,
          borderStartStartRadius: s,
          borderEndStartRadius: s
        },
        '&:last-child': { borderStartEndRadius: s, borderEndEndRadius: s },
        '&:first-child:last-child': { borderRadius: s },
        [`${o}-group-large &`]: {
          height: w,
          fontSize: m,
          lineHeight: `${w - l * 2}px`,
          '&:first-child': {
            borderStartStartRadius: $,
            borderEndStartRadius: $
          },
          '&:last-child': { borderStartEndRadius: $, borderEndEndRadius: $ }
        },
        [`${o}-group-small &`]: {
          height: x,
          paddingInline: v - l,
          paddingBlock: 0,
          lineHeight: `${x - l * 2}px`,
          '&:first-child': {
            borderStartStartRadius: p,
            borderEndStartRadius: p
          },
          '&:last-child': { borderStartEndRadius: p, borderEndEndRadius: p }
        },
        '&:hover': { position: 'relative', color: h },
        '&:has(:focus-visible)': b({}, Mt(e)),
        [`${o}-inner, input[type='checkbox'], input[type='radio']`]: {
          width: 0,
          height: 0,
          opacity: 0,
          pointerEvents: 'none'
        },
        [`&-checked:not(${o}-button-wrapper-disabled)`]: {
          zIndex: 1,
          color: h,
          background: O,
          borderColor: h,
          '&::before': { backgroundColor: h },
          '&:first-child': { borderColor: h },
          '&:hover': {
            color: C,
            borderColor: C,
            '&::before': { backgroundColor: C }
          },
          '&:active': {
            color: K,
            borderColor: K,
            '&::before': { backgroundColor: K }
          }
        },
        [`${o}-group-solid &-checked:not(${o}-button-wrapper-disabled)`]: {
          color: S,
          background: h,
          borderColor: h,
          '&:hover': { color: S, background: C, borderColor: C },
          '&:active': { color: S, background: K, borderColor: K }
        },
        '&-disabled': {
          color: I,
          backgroundColor: y,
          borderColor: r,
          cursor: 'not-allowed',
          '&:first-child, &:hover': {
            color: I,
            backgroundColor: y,
            borderColor: r
          }
        },
        [`&-disabled${o}-button-wrapper-checked`]: {
          color: E,
          backgroundColor: _,
          borderColor: r,
          boxShadow: 'none'
        }
      }
    }
  },
  Fl = Ht('Radio', e => {
    const {
        padding: t,
        lineWidth: n,
        controlItemBgActiveDisabled: o,
        colorTextDisabled: l,
        colorBgContainer: a,
        fontSizeLG: r,
        controlOutline: i,
        colorPrimaryHover: d,
        colorPrimaryActive: u,
        colorText: c,
        colorPrimary: f,
        marginXS: m,
        controlOutlineWidth: w,
        colorTextLightSolid: x,
        wireframe: v
      } = e,
      s = `0 0 0 ${w}px ${i}`,
      p = s,
      $ = r,
      h = 4,
      O = $ - h * 2,
      C = v ? O : $ - (h + n) * 2,
      K = f,
      S = c,
      I = d,
      y = u,
      E = t - n,
      T = Wt(e, {
        radioFocusShadow: s,
        radioButtonFocusShadow: p,
        radioSize: $,
        radioDotSize: C,
        radioDotDisabledSize: O,
        radioCheckedColor: K,
        radioDotDisabledColor: l,
        radioSolidCheckedColor: x,
        radioButtonBg: a,
        radioButtonCheckedBg: a,
        radioButtonColor: S,
        radioButtonHoverColor: I,
        radioButtonActiveColor: y,
        radioButtonPaddingHorizontal: E,
        radioDisabledButtonCheckedBg: o,
        radioDisabledButtonCheckedColor: l,
        radioWrapperMarginRight: m
      })
    return [Ii(T), Ki(T), Ti(T)]
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
      for (var l = 0, o = Object.getOwnPropertySymbols(e); l < o.length; l++)
        t.indexOf(o[l]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(e, o[l]) &&
          (n[o[l]] = e[o[l]])
    return n
  }
const zl = () => ({
    prefixCls: String,
    checked: be(),
    disabled: be(),
    isGroup: be(),
    value: Le.any,
    name: String,
    id: String,
    autofocus: be(),
    onChange: $e(),
    onFocus: $e(),
    onBlur: $e(),
    onClick: $e(),
    'onUpdate:checked': $e(),
    'onUpdate:value': $e()
  }),
  Ge = pe({
    compatConfig: { MODE: 3 },
    name: 'ARadio',
    inheritAttrs: !1,
    props: zl(),
    setup(e, t) {
      let { emit: n, expose: o, slots: l, attrs: a } = t
      const r = Vt(),
        i = jt.useInject(),
        d = Pi(),
        u = ki(),
        c = on(),
        f = k(() => {
          var I
          return (I = v.value) !== null && I !== void 0 ? I : c.value
        }),
        m = ce(),
        { prefixCls: w, direction: x, disabled: v } = We('radio', e),
        s = k(() =>
          (u == null ? void 0 : u.optionType.value) === 'button' ||
          d === 'button'
            ? `${w.value}-button`
            : w.value
        ),
        p = on(),
        [$, h] = Fl(w)
      o({
        focus: () => {
          m.value.focus()
        },
        blur: () => {
          m.value.blur()
        }
      })
      const K = I => {
          const y = I.target.checked
          n('update:checked', y),
            n('update:value', y),
            n('change', I),
            r.onFieldChange()
        },
        S = I => {
          n('change', I), u && u.onChange && u.onChange(I)
        }
      return () => {
        var I
        const y = u,
          { prefixCls: E, id: _ = r.id.value } = e,
          F = _i(e, ['prefixCls', 'id']),
          T = b(
            b(
              { prefixCls: s.value, id: _ },
              nt(F, ['onUpdate:checked', 'onUpdate:value'])
            ),
            { disabled: (I = v.value) !== null && I !== void 0 ? I : p.value }
          )
        y
          ? ((T.name = y.name.value),
            (T.onChange = S),
            (T.checked = e.value === y.value.value),
            (T.disabled = f.value || y.disabled.value))
          : (T.onChange = K)
        const M = re(
          {
            [`${s.value}-wrapper`]: !0,
            [`${s.value}-wrapper-checked`]: T.checked,
            [`${s.value}-wrapper-disabled`]: T.disabled,
            [`${s.value}-wrapper-rtl`]: x.value === 'rtl',
            [`${s.value}-wrapper-in-form-item`]: i.isFormItemInput
          },
          a.class,
          h.value
        )
        return $(
          g('label', L(L({}, a), {}, { class: M }), [
            g(Nl, L(L({}, T), {}, { type: 'radio', ref: m }), null),
            l.default && g('span', null, [l.default()])
          ])
        )
      }
    }
  }),
  Di = () => ({
    prefixCls: String,
    value: Le.any,
    size: Ye(),
    options: He(),
    disabled: be(),
    name: String,
    buttonStyle: Ye('outline'),
    id: String,
    optionType: Ye('default'),
    onChange: $e(),
    'onUpdate:value': $e()
  }),
  Ri = pe({
    compatConfig: { MODE: 3 },
    name: 'ARadioGroup',
    inheritAttrs: !1,
    props: Di(),
    setup(e, t) {
      let { slots: n, emit: o, attrs: l } = t
      const a = Vt(),
        { prefixCls: r, direction: i, size: d } = We('radio', e),
        [u, c] = Fl(r),
        f = ce(e.value),
        m = ce(!1)
      return (
        Ee(
          () => e.value,
          x => {
            ;(f.value = x), (m.value = !1)
          }
        ),
        $i({
          onChange: x => {
            const v = f.value,
              { value: s } = x.target
            'value' in e || (f.value = s),
              !m.value &&
                s !== v &&
                ((m.value = !0),
                o('update:value', s),
                o('change', x),
                a.onFieldChange()),
              et(() => {
                m.value = !1
              })
          },
          value: f,
          disabled: k(() => e.disabled),
          name: k(() => e.name),
          optionType: k(() => e.optionType)
        }),
        () => {
          var x
          const { options: v, buttonStyle: s, id: p = a.id.value } = e,
            $ = `${r.value}-group`,
            h = re(
              $,
              `${$}-${s}`,
              { [`${$}-${d.value}`]: d.value, [`${$}-rtl`]: i.value === 'rtl' },
              l.class,
              c.value
            )
          let O = null
          return (
            v && v.length > 0
              ? (O = v.map(C => {
                  if (typeof C == 'string' || typeof C == 'number')
                    return g(
                      Ge,
                      {
                        key: C,
                        prefixCls: r.value,
                        disabled: e.disabled,
                        value: C,
                        checked: f.value === C
                      },
                      { default: () => [C] }
                    )
                  const { value: K, disabled: S, label: I } = C
                  return g(
                    Ge,
                    {
                      key: `radio-group-value-options-${K}`,
                      prefixCls: r.value,
                      disabled: S || e.disabled,
                      value: K,
                      checked: f.value === K
                    },
                    { default: () => [I] }
                  )
                }))
              : (O =
                  (x = n.default) === null || x === void 0
                    ? void 0
                    : x.call(n)),
            u(g('div', L(L({}, l), {}, { class: h, id: p }), [O]))
          )
        }
      )
    }
  }),
  Ni = pe({
    compatConfig: { MODE: 3 },
    name: 'ARadioButton',
    inheritAttrs: !1,
    props: zl(),
    setup(e, t) {
      let { slots: n, attrs: o } = t
      const { prefixCls: l } = We('radio', e)
      return (
        Oi('button'),
        () => {
          var a
          return g(Ge, L(L(L({}, o), e), {}, { prefixCls: l.value }), {
            default: () => [
              (a = n.default) === null || a === void 0 ? void 0 : a.call(n)
            ]
          })
        }
      )
    }
  })
Ge.Group = Ri
Ge.Button = Ni
Ge.install = function(e) {
  return (
    e.component(Ge.name, Ge),
    e.component(Ge.Group.name, Ge.Group),
    e.component(Ge.Button.name, Ge.Button),
    e
  )
}
const Ml = Symbol('TreeContextKey'),
  Bi = pe({
    compatConfig: { MODE: 3 },
    name: 'TreeContext',
    props: { value: { type: Object } },
    setup(e, t) {
      let { slots: n } = t
      return (
        Ue(
          Ml,
          k(() => e.value)
        ),
        () => {
          var o
          return (o = n.default) === null || o === void 0 ? void 0 : o.call(n)
        }
      )
    }
  }),
  no = () =>
    Xe(
      Ml,
      k(() => ({}))
    ),
  Ll = Symbol('KeysStateKey'),
  Ai = e => {
    Ue(Ll, e)
  },
  jl = () =>
    Xe(Ll, {
      expandedKeys: te([]),
      selectedKeys: te([]),
      loadedKeys: te([]),
      loadingKeys: te([]),
      checkedKeys: te([]),
      halfCheckedKeys: te([]),
      expandedKeysSet: k(() => new Set()),
      selectedKeysSet: k(() => new Set()),
      loadedKeysSet: k(() => new Set()),
      loadingKeysSet: k(() => new Set()),
      checkedKeysSet: k(() => new Set()),
      halfCheckedKeysSet: k(() => new Set()),
      flattenNodes: te([])
    }),
  Fi = e => {
    let { prefixCls: t, level: n, isStart: o, isEnd: l } = e
    const a = `${t}-indent-unit`,
      r = []
    for (let i = 0; i < n; i += 1)
      r.push(
        g(
          'span',
          {
            key: i,
            class: { [a]: !0, [`${a}-start`]: o[i], [`${a}-end`]: l[i] }
          },
          null
        )
      )
    return g('span', { 'aria-hidden': 'true', class: `${t}-indent` }, [r])
  },
  zi = Fi,
  Hl = {
    eventKey: [String, Number],
    prefixCls: String,
    title: Le.any,
    data: { type: Object, default: void 0 },
    parent: { type: Object, default: void 0 },
    isStart: { type: Array },
    isEnd: { type: Array },
    active: { type: Boolean, default: void 0 },
    onMousemove: { type: Function },
    isLeaf: { type: Boolean, default: void 0 },
    checkable: { type: Boolean, default: void 0 },
    selectable: { type: Boolean, default: void 0 },
    disabled: { type: Boolean, default: void 0 },
    disableCheckbox: { type: Boolean, default: void 0 },
    icon: Le.any,
    switcherIcon: Le.any,
    domRef: { type: Function }
  },
  Mi = {
    prefixCls: { type: String },
    motion: { type: Object },
    focusable: { type: Boolean },
    activeItem: { type: Object },
    focused: { type: Boolean },
    tabindex: { type: Number },
    checkable: { type: Boolean },
    selectable: { type: Boolean },
    disabled: { type: Boolean },
    height: { type: Number },
    itemHeight: { type: Number },
    virtual: { type: Boolean },
    onScroll: { type: Function },
    onKeydown: { type: Function },
    onFocus: { type: Function },
    onBlur: { type: Function },
    onActiveChange: { type: Function },
    onContextmenu: { type: Function },
    onListChangeStart: { type: Function },
    onListChangeEnd: { type: Function }
  },
  Wl = () => ({
    prefixCls: String,
    focusable: { type: Boolean, default: void 0 },
    activeKey: [Number, String],
    tabindex: Number,
    children: Le.any,
    treeData: { type: Array },
    fieldNames: { type: Object },
    showLine: { type: [Boolean, Object], default: void 0 },
    showIcon: { type: Boolean, default: void 0 },
    icon: Le.any,
    selectable: { type: Boolean, default: void 0 },
    expandAction: [String, Boolean],
    disabled: { type: Boolean, default: void 0 },
    multiple: { type: Boolean, default: void 0 },
    checkable: { type: Boolean, default: void 0 },
    checkStrictly: { type: Boolean, default: void 0 },
    draggable: { type: [Function, Boolean] },
    defaultExpandParent: { type: Boolean, default: void 0 },
    autoExpandParent: { type: Boolean, default: void 0 },
    defaultExpandAll: { type: Boolean, default: void 0 },
    defaultExpandedKeys: { type: Array },
    expandedKeys: { type: Array },
    defaultCheckedKeys: { type: Array },
    checkedKeys: { type: [Object, Array] },
    defaultSelectedKeys: { type: Array },
    selectedKeys: { type: Array },
    allowDrop: { type: Function },
    dropIndicatorRender: { type: Function },
    onFocus: { type: Function },
    onBlur: { type: Function },
    onKeydown: { type: Function },
    onContextmenu: { type: Function },
    onClick: { type: Function },
    onDblclick: { type: Function },
    onScroll: { type: Function },
    onExpand: { type: Function },
    onCheck: { type: Function },
    onSelect: { type: Function },
    onLoad: { type: Function },
    loadData: { type: Function },
    loadedKeys: { type: Array },
    onMouseenter: { type: Function },
    onMouseleave: { type: Function },
    onRightClick: { type: Function },
    onDragstart: { type: Function },
    onDragenter: { type: Function },
    onDragover: { type: Function },
    onDragleave: { type: Function },
    onDragend: { type: Function },
    onDrop: { type: Function },
    onActiveChange: { type: Function },
    filterTreeNode: { type: Function },
    motion: Le.any,
    switcherIcon: Le.any,
    height: Number,
    itemHeight: Number,
    virtual: { type: Boolean, default: void 0 },
    direction: { type: String },
    rootClassName: String,
    rootStyle: Object
  })
var Li =
  (globalThis && globalThis.__rest) ||
  function(e, t) {
    var n = {}
    for (var o in e)
      Object.prototype.hasOwnProperty.call(e, o) &&
        t.indexOf(o) < 0 &&
        (n[o] = e[o])
    if (e != null && typeof Object.getOwnPropertySymbols == 'function')
      for (var l = 0, o = Object.getOwnPropertySymbols(e); l < o.length; l++)
        t.indexOf(o[l]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(e, o[l]) &&
          (n[o[l]] = e[o[l]])
    return n
  }
const zo = 'open',
  Mo = 'close',
  ji = '---',
  Kn = pe({
    compatConfig: { MODE: 3 },
    name: 'ATreeNode',
    inheritAttrs: !1,
    props: Hl,
    isTreeNode: 1,
    setup(e, t) {
      let { attrs: n, slots: o, expose: l } = t
      Il(
        !('slots' in e.data),
        `treeData slots is deprecated, please use ${Object.keys(
          e.data.slots || {}
        ).map(D => '`v-slot:' + D + '` ')}instead`
      )
      const a = te(!1),
        r = no(),
        {
          expandedKeysSet: i,
          selectedKeysSet: d,
          loadedKeysSet: u,
          loadingKeysSet: c,
          checkedKeysSet: f,
          halfCheckedKeysSet: m
        } = jl(),
        { dragOverNodeKey: w, dropPosition: x, keyEntities: v } = r.value,
        s = k(() =>
          Qt(e.eventKey, {
            expandedKeysSet: i.value,
            selectedKeysSet: d.value,
            loadedKeysSet: u.value,
            loadingKeysSet: c.value,
            checkedKeysSet: f.value,
            halfCheckedKeysSet: m.value,
            dragOverNodeKey: w,
            dropPosition: x,
            keyEntities: v
          })
        ),
        p = Je(() => s.value.expanded),
        $ = Je(() => s.value.selected),
        h = Je(() => s.value.checked),
        O = Je(() => s.value.loaded),
        C = Je(() => s.value.loading),
        K = Je(() => s.value.halfChecked),
        S = Je(() => s.value.dragOver),
        I = Je(() => s.value.dragOverGapTop),
        y = Je(() => s.value.dragOverGapBottom),
        E = Je(() => s.value.pos),
        _ = te(),
        F = k(() => {
          const { eventKey: D } = e,
            { keyEntities: P } = r.value,
            { children: R } = P[D] || {}
          return !!(R || []).length
        }),
        T = k(() => {
          const { isLeaf: D } = e,
            { loadData: P } = r.value,
            R = F.value
          return D === !1 ? !1 : D || (!P && !R) || (P && O.value && !R)
        }),
        M = k(() => (T.value ? null : p.value ? zo : Mo)),
        X = k(() => {
          const { disabled: D } = e,
            { disabled: P } = r.value
          return !!(P || D)
        }),
        q = k(() => {
          const { checkable: D } = e,
            { checkable: P } = r.value
          return !P || D === !1 ? !1 : P
        }),
        ae = k(() => {
          const { selectable: D } = e,
            { selectable: P } = r.value
          return typeof D == 'boolean' ? D : P
        }),
        H = k(() => {
          const {
            data: D,
            active: P,
            checkable: R,
            disableCheckbox: oe,
            disabled: me,
            selectable: we
          } = e
          return b(
            b(
              {
                active: P,
                checkable: R,
                disableCheckbox: oe,
                disabled: me,
                selectable: we
              },
              D
            ),
            {
              dataRef: D,
              data: D,
              isLeaf: T.value,
              checked: h.value,
              expanded: p.value,
              loading: C.value,
              selected: $.value,
              halfChecked: K.value
            }
          )
        }),
        U = wl(),
        j = k(() => {
          const { eventKey: D } = e,
            { keyEntities: P } = r.value,
            { parent: R } = P[D] || {}
          return b(b({}, en(b({}, e, s.value))), { parent: R })
        }),
        Z = Ct({
          eventData: j,
          eventKey: k(() => e.eventKey),
          selectHandle: _,
          pos: E,
          key: U.vnode.key
        })
      l(Z)
      const B = D => {
          const { onNodeDoubleClick: P } = r.value
          P(D, j.value)
        },
        V = D => {
          if (X.value) return
          const { onNodeSelect: P } = r.value
          D.preventDefault(), P(D, j.value)
        },
        W = D => {
          if (X.value) return
          const { disableCheckbox: P } = e,
            { onNodeCheck: R } = r.value
          if (!q.value || P) return
          D.preventDefault()
          const oe = !h.value
          R(D, j.value, oe)
        },
        ne = D => {
          const { onNodeClick: P } = r.value
          P(D, j.value), ae.value ? V(D) : W(D)
        },
        Q = D => {
          const { onNodeMouseEnter: P } = r.value
          P(D, j.value)
        },
        Pe = D => {
          const { onNodeMouseLeave: P } = r.value
          P(D, j.value)
        },
        ue = D => {
          const { onNodeContextMenu: P } = r.value
          P(D, j.value)
        },
        Ie = D => {
          const { onNodeDragStart: P } = r.value
          D.stopPropagation(), (a.value = !0), P(D, Z)
          try {
            D.dataTransfer.setData('text/plain', '')
          } catch {}
        },
        ge = D => {
          const { onNodeDragEnter: P } = r.value
          D.preventDefault(), D.stopPropagation(), P(D, Z)
        },
        Te = D => {
          const { onNodeDragOver: P } = r.value
          D.preventDefault(), D.stopPropagation(), P(D, Z)
        },
        De = D => {
          const { onNodeDragLeave: P } = r.value
          D.stopPropagation(), P(D, Z)
        },
        Ve = D => {
          const { onNodeDragEnd: P } = r.value
          D.stopPropagation(), (a.value = !1), P(D, Z)
        },
        _e = D => {
          const { onNodeDrop: P } = r.value
          D.preventDefault(), D.stopPropagation(), (a.value = !1), P(D, Z)
        },
        Re = D => {
          const { onNodeExpand: P } = r.value
          C.value || P(D, j.value)
        },
        Y = () => {
          const { data: D } = e,
            { draggable: P } = r.value
          return !!(P && (!P.nodeDraggable || P.nodeDraggable(D)))
        },
        ve = () => {
          const { draggable: D, prefixCls: P } = r.value
          return D && D != null && D.icon
            ? g('span', { class: `${P}-draggable-icon` }, [D.icon])
            : null
        },
        ee = () => {
          var D, P, R
          const {
              switcherIcon: oe = o.switcherIcon ||
                ((D = r.value.slots) === null || D === void 0
                  ? void 0
                  : D[
                      (R =
                        (P = e.data) === null || P === void 0
                          ? void 0
                          : P.slots) === null || R === void 0
                        ? void 0
                        : R.switcherIcon
                    ])
            } = e,
            { switcherIcon: me } = r.value,
            we = oe || me
          return typeof we == 'function' ? we(H.value) : we
        },
        se = () => {
          const { loadData: D, onNodeLoad: P } = r.value
          C.value ||
            (D && p.value && !T.value && !F.value && !O.value && P(j.value))
        }
      tt(() => {
        se()
      }),
        qn(() => {
          se()
        })
      const fe = () => {
          const { prefixCls: D } = r.value,
            P = ee()
          if (T.value)
            return P !== !1
              ? g(
                  'span',
                  { class: re(`${D}-switcher`, `${D}-switcher-noop`) },
                  [P]
                )
              : null
          const R = re(`${D}-switcher`, `${D}-switcher_${p.value ? zo : Mo}`)
          return P !== !1 ? g('span', { onClick: Re, class: R }, [P]) : null
        },
        Oe = () => {
          var D, P
          const { disableCheckbox: R } = e,
            { prefixCls: oe } = r.value,
            me = X.value
          return q.value
            ? g(
                'span',
                {
                  class: re(
                    `${oe}-checkbox`,
                    h.value && `${oe}-checkbox-checked`,
                    !h.value && K.value && `${oe}-checkbox-indeterminate`,
                    (me || R) && `${oe}-checkbox-disabled`
                  ),
                  onClick: W
                },
                [
                  (P = (D = r.value).customCheckable) === null || P === void 0
                    ? void 0
                    : P.call(D)
                ]
              )
            : null
        },
        de = () => {
          const { prefixCls: D } = r.value
          return g(
            'span',
            {
              class: re(
                `${D}-iconEle`,
                `${D}-icon__${M.value || 'docu'}`,
                C.value && `${D}-icon_loading`
              )
            },
            null
          )
        },
        he = () => {
          const { disabled: D, eventKey: P } = e,
            {
              draggable: R,
              dropLevelOffset: oe,
              dropPosition: me,
              prefixCls: we,
              indent: N,
              dropIndicatorRender: A,
              dragOverNodeKey: z,
              direction: G
            } = r.value
          return !D && R !== !1 && z === P
            ? A({
                dropPosition: me,
                dropLevelOffset: oe,
                indent: N,
                prefixCls: we,
                direction: G
              })
            : null
        },
        Ke = () => {
          var D, P, R, oe, me, we
          const { icon: N = o.icon, data: A } = e,
            z =
              o.title ||
              ((D = r.value.slots) === null || D === void 0
                ? void 0
                : D[
                    (R =
                      (P = e.data) === null || P === void 0
                        ? void 0
                        : P.slots) === null || R === void 0
                      ? void 0
                      : R.title
                  ]) ||
              ((oe = r.value.slots) === null || oe === void 0
                ? void 0
                : oe.title) ||
              e.title,
            { prefixCls: G, showIcon: le, icon: ie, loadData: J } = r.value,
            xe = X.value,
            ke = `${G}-node-content-wrapper`
          let ye
          if (le) {
            const Ae =
              N ||
              ((me = r.value.slots) === null || me === void 0
                ? void 0
                : me[
                    (we = A == null ? void 0 : A.slots) === null ||
                    we === void 0
                      ? void 0
                      : we.icon
                  ]) ||
              ie
            ye = Ae
              ? g(
                  'span',
                  { class: re(`${G}-iconEle`, `${G}-icon__customize`) },
                  [typeof Ae == 'function' ? Ae(H.value) : Ae]
                )
              : de()
          } else J && C.value && (ye = de())
          let Ce
          typeof z == 'function' ? (Ce = z(H.value)) : (Ce = z),
            (Ce = Ce === void 0 ? ji : Ce)
          const Se = g('span', { class: `${G}-title` }, [Ce])
          return g(
            'span',
            {
              ref: _,
              title: typeof z == 'string' ? z : '',
              class: re(
                `${ke}`,
                `${ke}-${M.value || 'normal'}`,
                !xe && ($.value || a.value) && `${G}-node-selected`
              ),
              onMouseenter: Q,
              onMouseleave: Pe,
              onContextmenu: ue,
              onClick: ne,
              onDblclick: B
            },
            [ye, Se, he()]
          )
        }
      return () => {
        const D = b(b({}, e), n),
          {
            eventKey: P,
            isLeaf: R,
            isStart: oe,
            isEnd: me,
            domRef: we,
            active: N,
            data: A,
            onMousemove: z,
            selectable: G
          } = D,
          le = Li(D, [
            'eventKey',
            'isLeaf',
            'isStart',
            'isEnd',
            'domRef',
            'active',
            'data',
            'onMousemove',
            'selectable'
          ]),
          {
            prefixCls: ie,
            filterTreeNode: J,
            keyEntities: xe,
            dropContainerKey: ke,
            dropTargetKey: ye,
            draggingNodeKey: Ce
          } = r.value,
          Se = X.value,
          Ae = to(le, { aria: !0, data: !0 }),
          { level: Me } = xe[P] || {},
          je = me[me.length - 1],
          Be = Y(),
          lt = !Se && Be,
          gt = Ce === P,
          wt = G !== void 0 ? { 'aria-selected': !!G } : void 0
        return g(
          'div',
          L(
            L(
              {
                ref: we,
                class: re(n.class, `${ie}-treenode`, {
                  [`${ie}-treenode-disabled`]: Se,
                  [`${ie}-treenode-switcher-${p.value ? 'open' : 'close'}`]: !R,
                  [`${ie}-treenode-checkbox-checked`]: h.value,
                  [`${ie}-treenode-checkbox-indeterminate`]: K.value,
                  [`${ie}-treenode-selected`]: $.value,
                  [`${ie}-treenode-loading`]: C.value,
                  [`${ie}-treenode-active`]: N,
                  [`${ie}-treenode-leaf-last`]: je,
                  [`${ie}-treenode-draggable`]: lt,
                  dragging: gt,
                  'drop-target': ye === P,
                  'drop-container': ke === P,
                  'drag-over': !Se && S.value,
                  'drag-over-gap-top': !Se && I.value,
                  'drag-over-gap-bottom': !Se && y.value,
                  'filter-node': J && J(j.value)
                }),
                style: n.style,
                draggable: lt,
                'aria-grabbed': gt,
                onDragstart: lt ? Ie : void 0,
                onDragenter: Be ? ge : void 0,
                onDragover: Be ? Te : void 0,
                onDragleave: Be ? De : void 0,
                onDrop: Be ? _e : void 0,
                onDragend: Be ? Ve : void 0,
                onMousemove: z
              },
              wt
            ),
            Ae
          ),
          [
            g(zi, { prefixCls: ie, level: Me, isStart: oe, isEnd: me }, null),
            ve(),
            fe(),
            Oe(),
            Ke()
          ]
        )
      }
    }
  })
globalThis && globalThis.__rest
function it(e, t) {
  if (!e) return []
  const n = e.slice(),
    o = n.indexOf(t)
  return o >= 0 && n.splice(o, 1), n
}
function ft(e, t) {
  const n = (e || []).slice()
  return n.indexOf(t) === -1 && n.push(t), n
}
function oo(e) {
  return e.split('-')
}
function Vl(e, t) {
  return `${e}-${t}`
}
function Hi(e) {
  return e && e.type && e.type.isTreeNode
}
function Wi(e, t) {
  const n = [],
    o = t[e]
  function l() {
    ;(arguments.length > 0 && arguments[0] !== void 0
      ? arguments[0]
      : []
    ).forEach(r => {
      let { key: i, children: d } = r
      n.push(i), l(d)
    })
  }
  return l(o.children), n
}
function Vi(e) {
  if (e.parent) {
    const t = oo(e.pos)
    return Number(t[t.length - 1]) === e.parent.children.length - 1
  }
  return !1
}
function Gi(e) {
  const t = oo(e.pos)
  return Number(t[t.length - 1]) === 0
}
function Lo(e, t, n, o, l, a, r, i, d, u) {
  var c
  const { clientX: f, clientY: m } = e,
    { top: w, height: x } = e.target.getBoundingClientRect(),
    s =
      ((u === 'rtl' ? -1 : 1) * (((l == null ? void 0 : l.x) || 0) - f) - 12) /
      o
  let p = i[n.eventKey]
  if (m < w + x / 2) {
    const E = r.findIndex(T => T.key === p.key),
      _ = E <= 0 ? 0 : E - 1,
      F = r[_].key
    p = i[F]
  }
  const $ = p.key,
    h = p,
    O = p.key
  let C = 0,
    K = 0
  if (!d.has($))
    for (let E = 0; E < s && Vi(p); E += 1) (p = p.parent), (K += 1)
  const S = t.eventData,
    I = p.node
  let y = !0
  return (
    Gi(p) &&
    p.level === 0 &&
    m < w + x / 2 &&
    a({ dragNode: S, dropNode: I, dropPosition: -1 }) &&
    p.key === n.eventKey
      ? (C = -1)
      : (h.children || []).length && d.has(O)
      ? a({ dragNode: S, dropNode: I, dropPosition: 0 })
        ? (C = 0)
        : (y = !1)
      : K === 0
      ? s > -1.5
        ? a({ dragNode: S, dropNode: I, dropPosition: 1 })
          ? (C = 1)
          : (y = !1)
        : a({ dragNode: S, dropNode: I, dropPosition: 0 })
        ? (C = 0)
        : a({ dragNode: S, dropNode: I, dropPosition: 1 })
        ? (C = 1)
        : (y = !1)
      : a({ dragNode: S, dropNode: I, dropPosition: 1 })
      ? (C = 1)
      : (y = !1),
    {
      dropPosition: C,
      dropLevelOffset: K,
      dropTargetKey: p.key,
      dropTargetPos: p.pos,
      dragOverNodeKey: O,
      dropContainerKey:
        C === 0
          ? null
          : ((c = p.parent) === null || c === void 0 ? void 0 : c.key) || null,
      dropAllowed: y
    }
  )
}
function jo(e, t) {
  if (!e) return
  const { multiple: n } = t
  return n ? e.slice() : e.length ? [e[0]] : e
}
function yn(e) {
  if (!e) return null
  let t
  if (Array.isArray(e)) t = { checkedKeys: e, halfCheckedKeys: void 0 }
  else if (typeof e == 'object')
    t = {
      checkedKeys: e.checked || void 0,
      halfCheckedKeys: e.halfChecked || void 0
    }
  else return null
  return t
}
function Tn(e, t) {
  const n = new Set()
  function o(l) {
    if (n.has(l)) return
    const a = t[l]
    if (!a) return
    n.add(l)
    const { parent: r, node: i } = a
    i.disabled || (r && o(r.key))
  }
  return (
    (e || []).forEach(l => {
      o(l)
    }),
    [...n]
  )
}
var Xi =
  (globalThis && globalThis.__rest) ||
  function(e, t) {
    var n = {}
    for (var o in e)
      Object.prototype.hasOwnProperty.call(e, o) &&
        t.indexOf(o) < 0 &&
        (n[o] = e[o])
    if (e != null && typeof Object.getOwnPropertySymbols == 'function')
      for (var l = 0, o = Object.getOwnPropertySymbols(e); l < o.length; l++)
        t.indexOf(o[l]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(e, o[l]) &&
          (n[o[l]] = e[o[l]])
    return n
  }
function Gt(e, t) {
  return e ?? t
}
function sn(e) {
  const { title: t, _title: n, key: o, children: l } = e || {},
    a = t || 'title'
  return {
    title: a,
    _title: n || [a],
    key: o || 'key',
    children: l || 'children'
  }
}
function _n(e) {
  function t() {
    let n = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : []
    return Lt(n).map(l => {
      var a, r, i, d
      if (!Hi(l)) return null
      const u = l.children || {},
        c = l.key,
        f = {}
      for (const [E, _] of Object.entries(l.props)) f[Ol(E)] = _
      const {
          isLeaf: m,
          checkable: w,
          selectable: x,
          disabled: v,
          disableCheckbox: s
        } = f,
        p = {
          isLeaf: m || m === '' || void 0,
          checkable: w || w === '' || void 0,
          selectable: x || x === '' || void 0,
          disabled: v || v === '' || void 0,
          disableCheckbox: s || s === '' || void 0
        },
        $ = b(b({}, f), p),
        {
          title: h = (a = u.title) === null || a === void 0
            ? void 0
            : a.call(u, $),
          icon: O = (r = u.icon) === null || r === void 0
            ? void 0
            : r.call(u, $),
          switcherIcon: C = (i = u.switcherIcon) === null || i === void 0
            ? void 0
            : i.call(u, $)
        } = f,
        K = Xi(f, ['title', 'icon', 'switcherIcon']),
        S = (d = u.default) === null || d === void 0 ? void 0 : d.call(u),
        I = b(
          b(b({}, K), {
            title: h,
            icon: O,
            switcherIcon: C,
            key: c,
            isLeaf: m
          }),
          p
        ),
        y = t(S)
      return y.length && (I.children = y), I
    })
  }
  return t(e)
}
function Ui(e, t, n) {
  const { _title: o, key: l, children: a } = sn(n),
    r = new Set(t === !0 ? [] : t),
    i = []
  function d(u) {
    let c =
      arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null
    return u.map((f, m) => {
      const w = Vl(c ? c.pos : '0', m),
        x = Gt(f[l], w)
      let v
      for (let p = 0; p < o.length; p += 1) {
        const $ = o[p]
        if (f[$] !== void 0) {
          v = f[$]
          break
        }
      }
      const s = b(b({}, nt(f, [...o, l, a])), {
        title: v,
        key: x,
        parent: c,
        pos: w,
        children: null,
        data: f,
        isStart: [...(c ? c.isStart : []), m === 0],
        isEnd: [...(c ? c.isEnd : []), m === u.length - 1]
      })
      return (
        i.push(s),
        t === !0 || r.has(x)
          ? (s.children = d(f[a] || [], s))
          : (s.children = []),
        s
      )
    })
  }
  return d(e), i
}
function qi(e, t, n) {
  let o = {}
  typeof n == 'object' ? (o = n) : (o = { externalGetKey: n }), (o = o || {})
  const { childrenPropName: l, externalGetKey: a, fieldNames: r } = o,
    { key: i, children: d } = sn(r),
    u = l || d
  let c
  a
    ? typeof a == 'string'
      ? (c = m => m[a])
      : typeof a == 'function' && (c = m => a(m))
    : (c = (m, w) => Gt(m[i], w))
  function f(m, w, x, v) {
    const s = m ? m[u] : e,
      p = m ? Vl(x.pos, w) : '0',
      $ = m ? [...v, m] : []
    if (m) {
      const h = c(m, p),
        O = {
          node: m,
          index: w,
          pos: p,
          key: h,
          parentPos: x.node ? x.pos : null,
          level: x.level + 1,
          nodes: $
        }
      t(O)
    }
    s &&
      s.forEach((h, O) => {
        f(h, O, { node: m, pos: p, level: x ? x.level + 1 : -1 }, $)
      })
  }
  f(null)
}
function lo(e) {
  let {
      initWrapper: t,
      processEntity: n,
      onProcessFinished: o,
      externalGetKey: l,
      childrenPropName: a,
      fieldNames: r
    } = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
    i = arguments.length > 2 ? arguments[2] : void 0
  const d = l || i,
    u = {},
    c = {}
  let f = { posEntities: u, keyEntities: c }
  return (
    t && (f = t(f) || f),
    qi(
      e,
      m => {
        const {
            node: w,
            index: x,
            pos: v,
            key: s,
            parentPos: p,
            level: $,
            nodes: h
          } = m,
          O = { node: w, nodes: h, index: x, key: s, pos: v, level: $ },
          C = Gt(s, v)
        ;(u[v] = O),
          (c[C] = O),
          (O.parent = u[p]),
          O.parent &&
            ((O.parent.children = O.parent.children || []),
            O.parent.children.push(O)),
          n && n(O, f)
      },
      { externalGetKey: d, childrenPropName: a, fieldNames: r }
    ),
    o && o(f),
    f
  )
}
function Qt(e, t) {
  let {
    expandedKeysSet: n,
    selectedKeysSet: o,
    loadedKeysSet: l,
    loadingKeysSet: a,
    checkedKeysSet: r,
    halfCheckedKeysSet: i,
    dragOverNodeKey: d,
    dropPosition: u,
    keyEntities: c
  } = t
  const f = c[e]
  return {
    eventKey: e,
    expanded: n.has(e),
    selected: o.has(e),
    loaded: l.has(e),
    loading: a.has(e),
    checked: r.has(e),
    halfChecked: i.has(e),
    pos: String(f ? f.pos : ''),
    parent: f.parent,
    dragOver: d === e && u === 0,
    dragOverGapTop: d === e && u === -1,
    dragOverGapBottom: d === e && u === 1
  }
}
function en(e) {
  const {
      data: t,
      expanded: n,
      selected: o,
      checked: l,
      loaded: a,
      loading: r,
      halfChecked: i,
      dragOver: d,
      dragOverGapTop: u,
      dragOverGapBottom: c,
      pos: f,
      active: m,
      eventKey: w
    } = e,
    x = b(b({ dataRef: t }, t), {
      expanded: n,
      selected: o,
      checked: l,
      loaded: a,
      loading: r,
      halfChecked: i,
      dragOver: d,
      dragOverGapTop: u,
      dragOverGapBottom: c,
      pos: f,
      active: m,
      eventKey: w,
      key: w
    })
  return (
    'props' in x ||
      Object.defineProperty(x, 'props', {
        get() {
          return e
        }
      }),
    x
  )
}
function Gl(e, t) {
  const n = new Set()
  return (
    e.forEach(o => {
      t.has(o) || n.add(o)
    }),
    n
  )
}
function Yi(e) {
  const { disabled: t, disableCheckbox: n, checkable: o } = e || {}
  return !!(t || n) || o === !1
}
function Zi(e, t, n, o) {
  const l = new Set(e),
    a = new Set()
  for (let i = 0; i <= n; i += 1)
    (t.get(i) || new Set()).forEach(u => {
      const { key: c, node: f, children: m = [] } = u
      l.has(c) &&
        !o(f) &&
        m
          .filter(w => !o(w.node))
          .forEach(w => {
            l.add(w.key)
          })
    })
  const r = new Set()
  for (let i = n; i >= 0; i -= 1)
    (t.get(i) || new Set()).forEach(u => {
      const { parent: c, node: f } = u
      if (o(f) || !u.parent || r.has(u.parent.key)) return
      if (o(u.parent.node)) {
        r.add(c.key)
        return
      }
      let m = !0,
        w = !1
      ;(c.children || [])
        .filter(x => !o(x.node))
        .forEach(x => {
          let { key: v } = x
          const s = l.has(v)
          m && !s && (m = !1), !w && (s || a.has(v)) && (w = !0)
        }),
        m && l.add(c.key),
        w && a.add(c.key),
        r.add(c.key)
    })
  return { checkedKeys: Array.from(l), halfCheckedKeys: Array.from(Gl(a, l)) }
}
function Ji(e, t, n, o, l) {
  const a = new Set(e)
  let r = new Set(t)
  for (let d = 0; d <= o; d += 1)
    (n.get(d) || new Set()).forEach(c => {
      const { key: f, node: m, children: w = [] } = c
      !a.has(f) &&
        !r.has(f) &&
        !l(m) &&
        w
          .filter(x => !l(x.node))
          .forEach(x => {
            a.delete(x.key)
          })
    })
  r = new Set()
  const i = new Set()
  for (let d = o; d >= 0; d -= 1)
    (n.get(d) || new Set()).forEach(c => {
      const { parent: f, node: m } = c
      if (l(m) || !c.parent || i.has(c.parent.key)) return
      if (l(c.parent.node)) {
        i.add(f.key)
        return
      }
      let w = !0,
        x = !1
      ;(f.children || [])
        .filter(v => !l(v.node))
        .forEach(v => {
          let { key: s } = v
          const p = a.has(s)
          w && !p && (w = !1), !x && (p || r.has(s)) && (x = !0)
        }),
        w || a.delete(f.key),
        x && r.add(f.key),
        i.add(f.key)
    })
  return { checkedKeys: Array.from(a), halfCheckedKeys: Array.from(Gl(r, a)) }
}
function _t(e, t, n, o, l, a) {
  let r
  a ? (r = a) : (r = Yi)
  const i = new Set(e.filter(u => !!n[u]))
  let d
  return (
    t === !0 ? (d = Zi(i, l, o, r)) : (d = Ji(i, t.halfCheckedKeys, l, o, r)), d
  )
}
function Xl(e) {
  const t = ce(0),
    n = te()
  return (
    Ne(() => {
      const o = new Map()
      let l = 0
      const a = e.value || {}
      for (const r in a)
        if (Object.prototype.hasOwnProperty.call(a, r)) {
          const i = a[r],
            { level: d } = i
          let u = o.get(d)
          u || ((u = new Set()), o.set(d, u)), u.add(i), (l = Math.max(l, d))
        }
      ;(t.value = l), (n.value = o)
    }),
    { maxLevel: t, levelEntities: n }
  )
}
const Qi = new Yn('antCheckboxEffect', {
    '0%': { transform: 'scale(1)', opacity: 0.5 },
    '100%': { transform: 'scale(1.6)', opacity: 0 }
  }),
  es = e => {
    const { checkboxCls: t } = e,
      n = `${t}-wrapper`
    return [
      {
        [`${t}-group`]: b(b({}, ct(e)), {
          display: 'inline-flex',
          flexWrap: 'wrap',
          columnGap: e.marginXS,
          [`> ${e.antCls}-row`]: { flex: 1 }
        }),
        [n]: b(b({}, ct(e)), {
          display: 'inline-flex',
          alignItems: 'baseline',
          cursor: 'pointer',
          '&:after': {
            display: 'inline-block',
            width: 0,
            overflow: 'hidden',
            content: "'\\a0'"
          },
          [`& + ${n}`]: { marginInlineStart: 0 },
          [`&${n}-in-form-item`]: {
            'input[type="checkbox"]': { width: 14, height: 14 }
          }
        }),
        [t]: b(b({}, ct(e)), {
          position: 'relative',
          whiteSpace: 'nowrap',
          lineHeight: 1,
          cursor: 'pointer',
          alignSelf: 'center',
          [`${t}-input`]: {
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            cursor: 'pointer',
            opacity: 0,
            margin: 0,
            [`&:focus-visible + ${t}-inner`]: b({}, Mt(e))
          },
          [`${t}-inner`]: {
            boxSizing: 'border-box',
            position: 'relative',
            top: 0,
            insetInlineStart: 0,
            display: 'block',
            width: e.checkboxSize,
            height: e.checkboxSize,
            direction: 'ltr',
            backgroundColor: e.colorBgContainer,
            border: `${e.lineWidth}px ${e.lineType} ${e.colorBorder}`,
            borderRadius: e.borderRadiusSM,
            borderCollapse: 'separate',
            transition: `all ${e.motionDurationSlow}`,
            '&:after': {
              boxSizing: 'border-box',
              position: 'absolute',
              top: '50%',
              insetInlineStart: '21.5%',
              display: 'table',
              width: (e.checkboxSize / 14) * 5,
              height: (e.checkboxSize / 14) * 8,
              border: `${e.lineWidthBold}px solid ${e.colorWhite}`,
              borderTop: 0,
              borderInlineStart: 0,
              transform: 'rotate(45deg) scale(0) translate(-50%,-50%)',
              opacity: 0,
              content: '""',
              transition: `all ${e.motionDurationFast} ${e.motionEaseInBack}, opacity ${e.motionDurationFast}`
            }
          },
          '& + span': {
            paddingInlineStart: e.paddingXS,
            paddingInlineEnd: e.paddingXS
          }
        })
      },
      {
        [t]: {
          '&-indeterminate': {
            [`${t}-inner`]: {
              '&:after': {
                top: '50%',
                insetInlineStart: '50%',
                width: e.fontSizeLG / 2,
                height: e.fontSizeLG / 2,
                backgroundColor: e.colorPrimary,
                border: 0,
                transform: 'translate(-50%, -50%) scale(1)',
                opacity: 1,
                content: '""'
              }
            }
          }
        }
      },
      {
        [`${n}:hover ${t}:after`]: { visibility: 'visible' },
        [`
        ${n}:not(${n}-disabled),
        ${t}:not(${t}-disabled)
      `]: { [`&:hover ${t}-inner`]: { borderColor: e.colorPrimary } },
        [`${n}:not(${n}-disabled)`]: {
          [`&:hover ${t}-checked:not(${t}-disabled) ${t}-inner`]: {
            backgroundColor: e.colorPrimaryHover,
            borderColor: 'transparent'
          },
          [`&:hover ${t}-checked:not(${t}-disabled):after`]: {
            borderColor: e.colorPrimaryHover
          }
        }
      },
      {
        [`${t}-checked`]: {
          [`${t}-inner`]: {
            backgroundColor: e.colorPrimary,
            borderColor: e.colorPrimary,
            '&:after': {
              opacity: 1,
              transform: 'rotate(45deg) scale(1) translate(-50%,-50%)',
              transition: `all ${e.motionDurationMid} ${e.motionEaseOutBack} ${e.motionDurationFast}`
            }
          },
          '&:after': {
            position: 'absolute',
            top: 0,
            insetInlineStart: 0,
            width: '100%',
            height: '100%',
            borderRadius: e.borderRadiusSM,
            visibility: 'hidden',
            border: `${e.lineWidthBold}px solid ${e.colorPrimary}`,
            animationName: Qi,
            animationDuration: e.motionDurationSlow,
            animationTimingFunction: 'ease-in-out',
            animationFillMode: 'backwards',
            content: '""',
            transition: `all ${e.motionDurationSlow}`
          }
        },
        [`
        ${n}-checked:not(${n}-disabled),
        ${t}-checked:not(${t}-disabled)
      `]: {
          [`&:hover ${t}-inner`]: {
            backgroundColor: e.colorPrimaryHover,
            borderColor: 'transparent'
          },
          [`&:hover ${t}:after`]: { borderColor: e.colorPrimaryHover }
        }
      },
      {
        [`${n}-disabled`]: { cursor: 'not-allowed' },
        [`${t}-disabled`]: {
          [`&, ${t}-input`]: { cursor: 'not-allowed', pointerEvents: 'none' },
          [`${t}-inner`]: {
            background: e.colorBgContainerDisabled,
            borderColor: e.colorBorder,
            '&:after': { borderColor: e.colorTextDisabled }
          },
          '&:after': { display: 'none' },
          '& + span': { color: e.colorTextDisabled },
          [`&${t}-indeterminate ${t}-inner::after`]: {
            background: e.colorTextDisabled
          }
        }
      }
    ]
  }
function Ul(e, t) {
  const n = Wt(t, {
    checkboxCls: `.${e}`,
    checkboxSize: t.controlInteractiveSize
  })
  return [es(n)]
}
const ql = Ht('Checkbox', (e, t) => {
    let { prefixCls: n } = t
    return [Ul(n, e)]
  }),
  ts = () => ({
    name: String,
    prefixCls: String,
    options: He([]),
    disabled: Boolean,
    id: String
  }),
  ns = () =>
    b(b({}, ts()), {
      defaultValue: He(),
      value: He(),
      onChange: $e(),
      'onUpdate:value': $e()
    }),
  os = () => ({
    prefixCls: String,
    defaultChecked: be(),
    checked: be(),
    disabled: be(),
    isGroup: be(),
    value: Le.any,
    name: String,
    id: String,
    indeterminate: be(),
    type: Ye('checkbox'),
    autofocus: be(),
    onChange: $e(),
    'onUpdate:checked': $e(),
    onClick: $e(),
    skipGroup: be(!1)
  }),
  ls = () => b(b({}, os()), { indeterminate: be(!1) }),
  Yl = Symbol('CheckboxGroupContext')
var Ho =
  (globalThis && globalThis.__rest) ||
  function(e, t) {
    var n = {}
    for (var o in e)
      Object.prototype.hasOwnProperty.call(e, o) &&
        t.indexOf(o) < 0 &&
        (n[o] = e[o])
    if (e != null && typeof Object.getOwnPropertySymbols == 'function')
      for (var l = 0, o = Object.getOwnPropertySymbols(e); l < o.length; l++)
        t.indexOf(o[l]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(e, o[l]) &&
          (n[o[l]] = e[o[l]])
    return n
  }
const mt = pe({
    compatConfig: { MODE: 3 },
    name: 'ACheckbox',
    inheritAttrs: !1,
    __ANT_CHECKBOX: !0,
    props: ls(),
    setup(e, t) {
      let { emit: n, attrs: o, slots: l, expose: a } = t
      const r = Vt(),
        i = jt.useInject(),
        { prefixCls: d, direction: u, disabled: c } = We('checkbox', e),
        f = on(),
        [m, w] = ql(d),
        x = Xe(Yl, void 0),
        v = Symbol('checkboxUniId'),
        s = k(() => (x == null ? void 0 : x.disabled.value) || c.value)
      Ne(() => {
        !e.skipGroup && x && x.registerValue(v, e.value)
      }),
        ht(() => {
          x && x.cancelValue(v)
        }),
        tt(() => {
          kl(!!(e.checked !== void 0 || x || e.value === void 0))
        })
      const p = C => {
          const K = C.target.checked
          n('update:checked', K), n('change', C), r.onFieldChange()
        },
        $ = ce()
      return (
        a({
          focus: () => {
            var C
            ;(C = $.value) === null || C === void 0 || C.focus()
          },
          blur: () => {
            var C
            ;(C = $.value) === null || C === void 0 || C.blur()
          }
        }),
        () => {
          var C
          const K = Zn(
              (C = l.default) === null || C === void 0 ? void 0 : C.call(l)
            ),
            { indeterminate: S, skipGroup: I, id: y = r.id.value } = e,
            E = Ho(e, ['indeterminate', 'skipGroup', 'id']),
            {
              onMouseenter: _,
              onMouseleave: F,
              onInput: T,
              class: M,
              style: X
            } = o,
            q = Ho(o, [
              'onMouseenter',
              'onMouseleave',
              'onInput',
              'class',
              'style'
            ]),
            ae = b(b(b(b({}, E), { id: y, prefixCls: d.value }), q), {
              disabled: s.value
            })
          x && !I
            ? ((ae.onChange = function() {
                for (
                  var Z = arguments.length, B = new Array(Z), V = 0;
                  V < Z;
                  V++
                )
                  B[V] = arguments[V]
                n('change', ...B), x.toggleOption({ label: K, value: e.value })
              }),
              (ae.name = x.name.value),
              (ae.checked = x.mergedValue.value.includes(e.value)),
              (ae.disabled = s.value || f.value),
              (ae.indeterminate = S))
            : (ae.onChange = p)
          const H = re(
              {
                [`${d.value}-wrapper`]: !0,
                [`${d.value}-rtl`]: u.value === 'rtl',
                [`${d.value}-wrapper-checked`]: ae.checked,
                [`${d.value}-wrapper-disabled`]: ae.disabled,
                [`${d.value}-wrapper-in-form-item`]: i.isFormItemInput
              },
              M,
              w.value
            ),
            U = re({ [`${d.value}-indeterminate`]: S }, w.value)
          return m(
            g(
              'label',
              { class: H, style: X, onMouseenter: _, onMouseleave: F },
              [
                g(
                  Nl,
                  L(
                    L({ 'aria-checked': S ? 'mixed' : void 0 }, ae),
                    {},
                    { class: U, ref: $ }
                  ),
                  null
                ),
                K.length ? g('span', null, [K]) : null
              ]
            )
          )
        }
      )
    }
  }),
  Dn = pe({
    compatConfig: { MODE: 3 },
    name: 'ACheckboxGroup',
    inheritAttrs: !1,
    props: ns(),
    setup(e, t) {
      let { slots: n, attrs: o, emit: l, expose: a } = t
      const r = Vt(),
        { prefixCls: i, direction: d } = We('checkbox', e),
        u = k(() => `${i.value}-group`),
        [c, f] = ql(u),
        m = ce((e.value === void 0 ? e.defaultValue : e.value) || [])
      Ee(
        () => e.value,
        () => {
          m.value = e.value || []
        }
      )
      const w = k(() =>
          e.options.map(O =>
            typeof O == 'string' || typeof O == 'number'
              ? { label: O, value: O }
              : O
          )
        ),
        x = ce(Symbol()),
        v = ce(new Map()),
        s = O => {
          v.value.delete(O), (x.value = Symbol())
        },
        p = (O, C) => {
          v.value.set(O, C), (x.value = Symbol())
        },
        $ = ce(new Map())
      return (
        Ee(x, () => {
          const O = new Map()
          for (const C of v.value.values()) O.set(C, !0)
          $.value = O
        }),
        Ue(Yl, {
          cancelValue: s,
          registerValue: p,
          toggleOption: O => {
            const C = m.value.indexOf(O.value),
              K = [...m.value]
            C === -1 ? K.push(O.value) : K.splice(C, 1),
              e.value === void 0 && (m.value = K)
            const S = K.filter(I => $.value.has(I)).sort((I, y) => {
              const E = w.value.findIndex(F => F.value === I),
                _ = w.value.findIndex(F => F.value === y)
              return E - _
            })
            l('update:value', S), l('change', S), r.onFieldChange()
          },
          mergedValue: m,
          name: k(() => e.name),
          disabled: k(() => e.disabled)
        }),
        a({ mergedValue: m }),
        () => {
          var O
          const { id: C = r.id.value } = e
          let K = null
          return (
            w.value &&
              w.value.length > 0 &&
              (K = w.value.map(S => {
                var I
                return g(
                  mt,
                  {
                    prefixCls: i.value,
                    key: S.value.toString(),
                    disabled: 'disabled' in S ? S.disabled : e.disabled,
                    indeterminate: S.indeterminate,
                    value: S.value,
                    checked: m.value.indexOf(S.value) !== -1,
                    onChange: S.onChange,
                    class: `${u.value}-item`
                  },
                  {
                    default: () => [
                      n.label !== void 0
                        ? (I = n.label) === null || I === void 0
                          ? void 0
                          : I.call(n, S)
                        : S.label
                    ]
                  }
                )
              })),
            c(
              g(
                'div',
                L(
                  L({}, o),
                  {},
                  {
                    class: [
                      u.value,
                      { [`${u.value}-rtl`]: d.value === 'rtl' },
                      o.class,
                      f.value
                    ],
                    id: C
                  }
                ),
                [
                  K ||
                    ((O = n.default) === null || O === void 0
                      ? void 0
                      : O.call(n))
                ]
              )
            )
          )
        }
      )
    }
  })
mt.Group = Dn
mt.install = function(e) {
  return e.component(mt.name, mt), e.component(Dn.name, Dn), e
}
It.Button = an
It.install = function(e) {
  return e.component(It.name, It), e.component(an.name, an), e
}
const as = pe({
  name: 'BaseInput',
  inheritAttrs: !1,
  props: nr(),
  setup(e, t) {
    let { slots: n, attrs: o } = t
    const l = ce(),
      a = i => {
        var d
        if (!((d = l.value) === null || d === void 0) && d.contains(i.target)) {
          const { triggerFocus: u } = e
          u == null || u()
        }
      },
      r = () => {
        var i
        const {
          allowClear: d,
          value: u,
          disabled: c,
          readonly: f,
          handleReset: m,
          suffix: w = n.suffix,
          prefixCls: x
        } = e
        if (!d) return null
        const v = !c && !f && u,
          s = `${x}-clear-icon`,
          p =
            ((i = n.clearIcon) === null || i === void 0 ? void 0 : i.call(n)) ||
            '*'
        return g(
          'span',
          {
            onClick: m,
            onMousedown: $ => $.preventDefault(),
            class: re({ [`${s}-hidden`]: !v, [`${s}-has-suffix`]: !!w }, s),
            role: 'button',
            tabindex: -1
          },
          [p]
        )
      }
    return () => {
      var i, d
      const {
        focused: u,
        value: c,
        disabled: f,
        allowClear: m,
        readonly: w,
        hidden: x,
        prefixCls: v,
        prefix: s = (i = n.prefix) === null || i === void 0
          ? void 0
          : i.call(n),
        suffix: p = (d = n.suffix) === null || d === void 0
          ? void 0
          : d.call(n),
        addonAfter: $ = n.addonAfter,
        addonBefore: h = n.addonBefore,
        inputElement: O,
        affixWrapperClassName: C,
        wrapperClassName: K,
        groupClassName: S
      } = e
      let I = Pt(O, { value: c, hidden: x })
      if (Jn({ prefix: s, suffix: p, allowClear: m })) {
        const y = `${v}-affix-wrapper`,
          E = re(
            y,
            {
              [`${y}-disabled`]: f,
              [`${y}-focused`]: u,
              [`${y}-readonly`]: w,
              [`${y}-input-with-clear-btn`]: p && m && c
            },
            !Jt({ addonAfter: $, addonBefore: h }) && o.class,
            C
          ),
          _ = (p || m) && g('span', { class: `${v}-suffix` }, [r(), p])
        I = g(
          'span',
          {
            class: E,
            style: o.style,
            hidden: !Jt({ addonAfter: $, addonBefore: h }) && x,
            onMousedown: a,
            ref: l
          },
          [
            s && g('span', { class: `${v}-prefix` }, [s]),
            Pt(O, { style: null, value: c, hidden: null }),
            _
          ]
        )
      }
      if (Jt({ addonAfter: $, addonBefore: h })) {
        const y = `${v}-group`,
          E = `${y}-addon`,
          _ = re(`${v}-wrapper`, y, K),
          F = re(`${v}-group-wrapper`, o.class, S)
        return g('span', { class: F, style: o.style, hidden: x }, [
          g('span', { class: _ }, [
            h && g('span', { class: E }, [h]),
            Pt(I, { style: null, hidden: null }),
            $ && g('span', { class: E }, [$])
          ])
        ])
      }
      return I
    }
  }
})
var rs =
  (globalThis && globalThis.__rest) ||
  function(e, t) {
    var n = {}
    for (var o in e)
      Object.prototype.hasOwnProperty.call(e, o) &&
        t.indexOf(o) < 0 &&
        (n[o] = e[o])
    if (e != null && typeof Object.getOwnPropertySymbols == 'function')
      for (var l = 0, o = Object.getOwnPropertySymbols(e); l < o.length; l++)
        t.indexOf(o[l]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(e, o[l]) &&
          (n[o[l]] = e[o[l]])
    return n
  }
const is = pe({
  name: 'VCInput',
  inheritAttrs: !1,
  props: or(),
  setup(e, t) {
    let { slots: n, attrs: o, expose: l, emit: a } = t
    const r = te(e.value === void 0 ? e.defaultValue : e.value),
      i = te(!1),
      d = te(),
      u = te()
    Ee(
      () => e.value,
      () => {
        r.value = e.value
      }
    ),
      Ee(
        () => e.disabled,
        () => {
          e.disabled && (i.value = !1)
        }
      )
    const c = S => {
        d.value && lr(d.value.input, S)
      },
      f = () => {
        var S
        ;(S = d.value.input) === null || S === void 0 || S.blur()
      },
      m = (S, I, y) => {
        var E
        ;(E = d.value.input) === null ||
          E === void 0 ||
          E.setSelectionRange(S, I, y)
      },
      w = () => {
        var S
        ;(S = d.value.input) === null || S === void 0 || S.select()
      }
    l({
      focus: c,
      blur: f,
      input: k(() => {
        var S
        return (S = d.value.input) === null || S === void 0 ? void 0 : S.input
      }),
      stateValue: r,
      setSelectionRange: m,
      select: w
    })
    const x = S => {
        a('change', S)
      },
      v = (S, I) => {
        r.value !== S &&
          (e.value === void 0
            ? (r.value = S)
            : et(() => {
                var y
                d.value.input.value !== r.value &&
                  ((y = u.value) === null || y === void 0 || y.$forceUpdate())
              }),
          et(() => {
            I && I()
          }))
      },
      s = S => {
        const { value: I } = S.target
        if (r.value === I) return
        const y = S.target.value
        Eo(d.value.input, S, x), v(y)
      },
      p = S => {
        S.keyCode === 13 && a('pressEnter', S), a('keydown', S)
      },
      $ = S => {
        ;(i.value = !0), a('focus', S)
      },
      h = S => {
        ;(i.value = !1), a('blur', S)
      },
      O = S => {
        Eo(d.value.input, S, x),
          v('', () => {
            c()
          })
      },
      C = () => {
        var S, I
        const {
            addonBefore: y = n.addonBefore,
            addonAfter: E = n.addonAfter,
            disabled: _,
            valueModifiers: F = {},
            htmlSize: T,
            autocomplete: M,
            prefixCls: X,
            inputClassName: q,
            prefix: ae = (S = n.prefix) === null || S === void 0
              ? void 0
              : S.call(n),
            suffix: H = (I = n.suffix) === null || I === void 0
              ? void 0
              : I.call(n),
            allowClear: U,
            type: j = 'text'
          } = e,
          Z = nt(e, [
            'prefixCls',
            'onPressEnter',
            'addonBefore',
            'addonAfter',
            'prefix',
            'suffix',
            'allowClear',
            'defaultValue',
            'size',
            'bordered',
            'htmlSize',
            'lazy',
            'showCount',
            'valueModifiers',
            'showCount',
            'affixWrapperClassName',
            'groupClassName',
            'inputClassName',
            'wrapperClassName'
          ]),
          B = b(b(b({}, Z), o), {
            autocomplete: M,
            onChange: s,
            onInput: s,
            onFocus: $,
            onBlur: h,
            onKeydown: p,
            class: re(
              X,
              { [`${X}-disabled`]: _ },
              q,
              !Jt({ addonAfter: E, addonBefore: y }) &&
                !Jn({ prefix: ae, suffix: H, allowClear: U }) &&
                o.class
            ),
            ref: d,
            key: 'ant-input',
            size: T,
            type: j,
            lazy: e.lazy
          })
        return (
          F.lazy && delete B.onInput,
          B.autofocus || delete B.autofocus,
          g(ar, nt(B, ['size']), null)
        )
      },
      K = () => {
        var S
        const {
            maxlength: I,
            suffix: y = (S = n.suffix) === null || S === void 0
              ? void 0
              : S.call(n),
            showCount: E,
            prefixCls: _
          } = e,
          F = Number(I) > 0
        if (y || E) {
          const T = [...Po(r.value)].length,
            M =
              typeof E == 'object'
                ? E.formatter({ count: T, maxlength: I })
                : `${T}${F ? ` / ${I}` : ''}`
          return g(dt, null, [
            !!E &&
              g(
                'span',
                {
                  class: re(`${_}-show-count-suffix`, {
                    [`${_}-show-count-has-suffix`]: !!y
                  })
                },
                [M]
              ),
            y
          ])
        }
        return null
      }
    return (
      tt(() => {}),
      () => {
        const { prefixCls: S, disabled: I } = e,
          y = rs(e, ['prefixCls', 'disabled'])
        return g(
          as,
          L(
            L(L({}, y), o),
            {},
            {
              ref: u,
              prefixCls: S,
              inputElement: C(),
              handleReset: O,
              value: Po(r.value),
              focused: i.value,
              triggerFocus: c,
              suffix: K(),
              disabled: I
            }
          ),
          n
        )
      }
    )
  }
})
var ss =
  (globalThis && globalThis.__rest) ||
  function(e, t) {
    var n = {}
    for (var o in e)
      Object.prototype.hasOwnProperty.call(e, o) &&
        t.indexOf(o) < 0 &&
        (n[o] = e[o])
    if (e != null && typeof Object.getOwnPropertySymbols == 'function')
      for (var l = 0, o = Object.getOwnPropertySymbols(e); l < o.length; l++)
        t.indexOf(o[l]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(e, o[l]) &&
          (n[o[l]] = e[o[l]])
    return n
  }
const Fe = pe({
    compatConfig: { MODE: 3 },
    name: 'AInput',
    inheritAttrs: !1,
    props: Qn(),
    setup(e, t) {
      let { slots: n, attrs: o, expose: l, emit: a } = t
      const r = ce(),
        i = Vt(),
        d = jt.useInject(),
        u = k(() => rr(d.status, e.status)),
        { direction: c, prefixCls: f, size: m, autocomplete: w } = We(
          'input',
          e
        ),
        { compactSize: x, compactItemClassnames: v } = zr(f, c),
        s = k(() => x.value || m.value),
        [p, $] = El(f),
        h = on()
      l({
        focus: T => {
          var M
          ;(M = r.value) === null || M === void 0 || M.focus(T)
        },
        blur: () => {
          var T
          ;(T = r.value) === null || T === void 0 || T.blur()
        },
        input: r,
        setSelectionRange: (T, M, X) => {
          var q
          ;(q = r.value) === null ||
            q === void 0 ||
            q.setSelectionRange(T, M, X)
        },
        select: () => {
          var T
          ;(T = r.value) === null || T === void 0 || T.select()
        }
      })
      const I = ce([]),
        y = () => {
          I.value.push(
            setTimeout(() => {
              var T, M, X, q
              !((T = r.value) === null || T === void 0) &&
                T.input &&
                ((M = r.value) === null || M === void 0
                  ? void 0
                  : M.input.getAttribute('type')) === 'password' &&
                !((X = r.value) === null || X === void 0) &&
                X.input.hasAttribute('value') &&
                ((q = r.value) === null ||
                  q === void 0 ||
                  q.input.removeAttribute('value'))
            })
          )
        }
      tt(() => {
        y()
      }),
        Ra(() => {
          I.value.forEach(T => clearTimeout(T))
        }),
        ht(() => {
          I.value.forEach(T => clearTimeout(T))
        })
      const E = T => {
          y(), a('blur', T), i.onFieldBlur()
        },
        _ = T => {
          y(), a('focus', T)
        },
        F = T => {
          a('update:value', T.target.value),
            a('change', T),
            a('input', T),
            i.onFieldChange()
        }
      return () => {
        var T, M, X, q, ae, H
        const { hasFeedback: U, feedbackIcon: j } = d,
          {
            allowClear: Z,
            bordered: B = !0,
            prefix: V = (T = n.prefix) === null || T === void 0
              ? void 0
              : T.call(n),
            suffix: W = (M = n.suffix) === null || M === void 0
              ? void 0
              : M.call(n),
            addonAfter: ne = (X = n.addonAfter) === null || X === void 0
              ? void 0
              : X.call(n),
            addonBefore: Q = (q = n.addonBefore) === null || q === void 0
              ? void 0
              : q.call(n),
            id: Pe = (ae = i.id) === null || ae === void 0 ? void 0 : ae.value
          } = e,
          ue = ss(e, [
            'allowClear',
            'bordered',
            'prefix',
            'suffix',
            'addonAfter',
            'addonBefore',
            'id'
          ]),
          Ie = (U || W) && g(dt, null, [W, U && j]),
          ge = f.value,
          Te = Jn({ prefix: V, suffix: W }) || !!U,
          De = n.clearIcon || (() => g(Wa, null, null))
        return p(
          g(
            is,
            L(
              L(L({}, o), nt(ue, ['onUpdate:value', 'onChange', 'onInput'])),
              {},
              {
                onChange: F,
                id: Pe,
                disabled:
                  (H = e.disabled) !== null && H !== void 0 ? H : h.value,
                ref: r,
                prefixCls: ge,
                autocomplete: w.value,
                onBlur: E,
                onFocus: _,
                prefix: V,
                suffix: Ie,
                allowClear: Z,
                addonAfter:
                  ne &&
                  g(Bo, null, {
                    default: () => [g(Io, null, { default: () => [ne] })]
                  }),
                addonBefore:
                  Q &&
                  g(Bo, null, {
                    default: () => [g(Io, null, { default: () => [Q] })]
                  }),
                class: [o.class, v.value],
                inputClassName: re(
                  {
                    [`${ge}-sm`]: s.value === 'small',
                    [`${ge}-lg`]: s.value === 'large',
                    [`${ge}-rtl`]: c.value === 'rtl',
                    [`${ge}-borderless`]: !B
                  },
                  !Te && mn(ge, u.value),
                  $.value
                ),
                affixWrapperClassName: re(
                  {
                    [`${ge}-affix-wrapper-sm`]: s.value === 'small',
                    [`${ge}-affix-wrapper-lg`]: s.value === 'large',
                    [`${ge}-affix-wrapper-rtl`]: c.value === 'rtl',
                    [`${ge}-affix-wrapper-borderless`]: !B
                  },
                  mn(`${ge}-affix-wrapper`, u.value, U),
                  $.value
                ),
                wrapperClassName: re(
                  { [`${ge}-group-rtl`]: c.value === 'rtl' },
                  $.value
                ),
                groupClassName: re(
                  {
                    [`${ge}-group-wrapper-sm`]: s.value === 'small',
                    [`${ge}-group-wrapper-lg`]: s.value === 'large',
                    [`${ge}-group-wrapper-rtl`]: c.value === 'rtl'
                  },
                  mn(`${ge}-group-wrapper`, u.value, U),
                  $.value
                )
              }
            ),
            b(b({}, n), { clearIcon: De })
          )
        )
      }
    }
  }),
  ds = pe({
    compatConfig: { MODE: 3 },
    name: 'AInputGroup',
    inheritAttrs: !1,
    props: {
      prefixCls: String,
      size: { type: String },
      compact: { type: Boolean, default: void 0 }
    },
    setup(e, t) {
      let { slots: n, attrs: o } = t
      const { prefixCls: l, direction: a, getPrefixCls: r } = We(
          'input-group',
          e
        ),
        i = jt.useInject()
      jt.useProvide(i, { isFormItemInput: !1 })
      const d = k(() => r('input')),
        [u, c] = El(d),
        f = k(() => {
          const m = l.value
          return {
            [`${m}`]: !0,
            [c.value]: !0,
            [`${m}-lg`]: e.size === 'large',
            [`${m}-sm`]: e.size === 'small',
            [`${m}-compact`]: e.compact,
            [`${m}-rtl`]: a.value === 'rtl'
          }
        })
      return () => {
        var m
        return u(
          g('span', L(L({}, o), {}, { class: re(f.value, o.class) }), [
            (m = n.default) === null || m === void 0 ? void 0 : m.call(n)
          ])
        )
      }
    }
  })
var cs =
  (globalThis && globalThis.__rest) ||
  function(e, t) {
    var n = {}
    for (var o in e)
      Object.prototype.hasOwnProperty.call(e, o) &&
        t.indexOf(o) < 0 &&
        (n[o] = e[o])
    if (e != null && typeof Object.getOwnPropertySymbols == 'function')
      for (var l = 0, o = Object.getOwnPropertySymbols(e); l < o.length; l++)
        t.indexOf(o[l]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(e, o[l]) &&
          (n[o[l]] = e[o[l]])
    return n
  }
const us = pe({
  compatConfig: { MODE: 3 },
  name: 'AInputSearch',
  inheritAttrs: !1,
  props: b(b({}, Qn()), {
    inputPrefixCls: String,
    enterButton: Le.any,
    onSearch: { type: Function }
  }),
  setup(e, t) {
    let { slots: n, attrs: o, expose: l, emit: a } = t
    const r = te(),
      i = te(!1)
    l({
      focus: () => {
        var C
        ;(C = r.value) === null || C === void 0 || C.focus()
      },
      blur: () => {
        var C
        ;(C = r.value) === null || C === void 0 || C.blur()
      }
    })
    const c = C => {
        a('update:value', C.target.value),
          C && C.target && C.type === 'click' && a('search', C.target.value, C),
          a('change', C)
      },
      f = C => {
        var K
        document.activeElement ===
          ((K = r.value) === null || K === void 0 ? void 0 : K.input) &&
          C.preventDefault()
      },
      m = C => {
        var K, S
        a(
          'search',
          (S = (K = r.value) === null || K === void 0 ? void 0 : K.input) ===
            null || S === void 0
            ? void 0
            : S.stateValue,
          C
        )
      },
      w = C => {
        i.value || e.loading || m(C)
      },
      x = C => {
        ;(i.value = !0), a('compositionstart', C)
      },
      v = C => {
        ;(i.value = !1), a('compositionend', C)
      },
      { prefixCls: s, getPrefixCls: p, direction: $, size: h } = We(
        'input-search',
        e
      ),
      O = k(() => p('input', e.inputPrefixCls))
    return () => {
      var C, K, S, I
      const {
          disabled: y,
          loading: E,
          addonAfter: _ = (C = n.addonAfter) === null || C === void 0
            ? void 0
            : C.call(n),
          suffix: F = (K = n.suffix) === null || K === void 0
            ? void 0
            : K.call(n)
        } = e,
        T = cs(e, ['disabled', 'loading', 'addonAfter', 'suffix'])
      let {
        enterButton: M = (I =
          (S = n.enterButton) === null || S === void 0 ? void 0 : S.call(n)) !==
          null && I !== void 0
          ? I
          : !1
      } = e
      M = M || M === ''
      const X = typeof M == 'boolean' ? g(Tl, null, null) : null,
        q = `${s.value}-button`,
        ae = Array.isArray(M) ? M[0] : M
      let H
      const U = ae.type && Er(ae.type) && ae.type.__ANT_BUTTON
      if (U || ae.tagName === 'button')
        H = Pt(
          ae,
          b(
            { onMousedown: f, onClick: m, key: 'enterButton' },
            U ? { class: q, size: h.value } : {}
          ),
          !1
        )
      else {
        const Z = X && !M
        H = g(
          Rt,
          {
            class: q,
            type: M ? 'primary' : void 0,
            size: h.value,
            disabled: y,
            key: 'enterButton',
            onMousedown: f,
            onClick: m,
            loading: E,
            icon: Z ? X : null
          },
          { default: () => [Z ? null : X || M] }
        )
      }
      _ && (H = [H, _])
      const j = re(
        s.value,
        {
          [`${s.value}-rtl`]: $.value === 'rtl',
          [`${s.value}-${h.value}`]: !!h.value,
          [`${s.value}-with-button`]: !!M
        },
        o.class
      )
      return g(
        Fe,
        L(
          L(
            L({ ref: r }, nt(T, ['onUpdate:value', 'onSearch', 'enterButton'])),
            o
          ),
          {},
          {
            onPressEnter: w,
            onCompositionstart: x,
            onCompositionend: v,
            size: h.value,
            prefixCls: O.value,
            addonAfter: H,
            suffix: F,
            onChange: c,
            class: j,
            disabled: y
          }
        ),
        n
      )
    }
  }
})
function Wo(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? Object(arguments[t]) : {},
      o = Object.keys(n)
    typeof Object.getOwnPropertySymbols == 'function' &&
      (o = o.concat(
        Object.getOwnPropertySymbols(n).filter(function(l) {
          return Object.getOwnPropertyDescriptor(n, l).enumerable
        })
      )),
      o.forEach(function(l) {
        fs(e, l, n[l])
      })
  }
  return e
}
function fs(e, t, n) {
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
var ao = function(t, n) {
  var o = Wo({}, t, n.attrs)
  return g(ot, Wo({}, o, { icon: Mr }), null)
}
ao.displayName = 'EyeOutlined'
ao.inheritAttrs = !1
const vs = ao
function Vo(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? Object(arguments[t]) : {},
      o = Object.keys(n)
    typeof Object.getOwnPropertySymbols == 'function' &&
      (o = o.concat(
        Object.getOwnPropertySymbols(n).filter(function(l) {
          return Object.getOwnPropertyDescriptor(n, l).enumerable
        })
      )),
      o.forEach(function(l) {
        ps(e, l, n[l])
      })
  }
  return e
}
function ps(e, t, n) {
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
var ro = function(t, n) {
  var o = Vo({}, t, n.attrs)
  return g(ot, Vo({}, o, { icon: Lr }), null)
}
ro.displayName = 'EyeInvisibleOutlined'
ro.inheritAttrs = !1
const ms = ro
var hs =
  (globalThis && globalThis.__rest) ||
  function(e, t) {
    var n = {}
    for (var o in e)
      Object.prototype.hasOwnProperty.call(e, o) &&
        t.indexOf(o) < 0 &&
        (n[o] = e[o])
    if (e != null && typeof Object.getOwnPropertySymbols == 'function')
      for (var l = 0, o = Object.getOwnPropertySymbols(e); l < o.length; l++)
        t.indexOf(o[l]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(e, o[l]) &&
          (n[o[l]] = e[o[l]])
    return n
  }
const gs = { click: 'onClick', hover: 'onMouseover' },
  ys = e => (e ? g(vs, null, null) : g(ms, null, null)),
  bs = pe({
    compatConfig: { MODE: 3 },
    name: 'AInputPassword',
    inheritAttrs: !1,
    props: b(b({}, Qn()), {
      prefixCls: String,
      inputPrefixCls: String,
      action: { type: String, default: 'click' },
      visibilityToggle: { type: Boolean, default: !0 },
      visible: { type: Boolean, default: void 0 },
      'onUpdate:visible': Function,
      iconRender: Function
    }),
    setup(e, t) {
      let { slots: n, attrs: o, expose: l, emit: a } = t
      const r = te(!1),
        i = () => {
          const { disabled: s } = e
          s || ((r.value = !r.value), a('update:visible', r.value))
        }
      Ne(() => {
        e.visible !== void 0 && (r.value = !!e.visible)
      })
      const d = te()
      l({
        focus: () => {
          var s
          ;(s = d.value) === null || s === void 0 || s.focus()
        },
        blur: () => {
          var s
          ;(s = d.value) === null || s === void 0 || s.blur()
        }
      })
      const f = s => {
          const { action: p, iconRender: $ = n.iconRender || ys } = e,
            h = gs[p] || '',
            O = $(r.value),
            C = {
              [h]: i,
              class: `${s}-icon`,
              key: 'passwordIcon',
              onMousedown: K => {
                K.preventDefault()
              },
              onMouseup: K => {
                K.preventDefault()
              }
            }
          return Pt(zt(O) ? O : g('span', null, [O]), C)
        },
        { prefixCls: m, getPrefixCls: w } = We('input-password', e),
        x = k(() => w('input', e.inputPrefixCls)),
        v = () => {
          const { size: s, visibilityToggle: p } = e,
            $ = hs(e, ['size', 'visibilityToggle']),
            h = p && f(m.value),
            O = re(m.value, o.class, { [`${m.value}-${s}`]: !!s }),
            C = b(b(b({}, nt($, ['suffix', 'iconRender', 'action'])), o), {
              type: r.value ? 'text' : 'password',
              class: O,
              prefixCls: x.value,
              suffix: h
            })
          return s && (C.size = s), g(Fe, L({ ref: d }, C), n)
        }
      return () => v()
    }
  })
Fe.Group = ds
Fe.Search = us
Fe.TextArea = ir
Fe.Password = bs
Fe.install = function(e) {
  return (
    e.component(Fe.name, Fe),
    e.component(Fe.Group.name, Fe.Group),
    e.component(Fe.Search.name, Fe.Search),
    e.component(Fe.TextArea.name, Fe.TextArea),
    e.component(Fe.Password.name, Fe.Password),
    e
  )
}
const Zl = Symbol('TableContextProps'),
  xs = e => {
    Ue(Zl, e)
  },
  ut = () => Xe(Zl, {}),
  Cs = 'RC_TABLE_KEY'
function Jl(e) {
  return e == null ? [] : Array.isArray(e) ? e : [e]
}
function Ql(e, t) {
  if (!t && typeof t != 'number') return e
  const n = Jl(t)
  let o = e
  for (let l = 0; l < n.length; l += 1) {
    if (!o) return null
    const a = n[l]
    o = o[a]
  }
  return o
}
function dn(e) {
  const t = [],
    n = {}
  return (
    e.forEach(o => {
      const { key: l, dataIndex: a } = o || {}
      let r = l || Jl(a).join('-') || Cs
      for (; n[r]; ) r = `${r}_next`
      ;(n[r] = !0), t.push(r)
    }),
    t
  )
}
function Ss() {
  const e = {}
  function t(a, r) {
    r &&
      Object.keys(r).forEach(i => {
        const d = r[i]
        d && typeof d == 'object'
          ? ((a[i] = a[i] || {}), t(a[i], d))
          : (a[i] = d)
      })
  }
  for (var n = arguments.length, o = new Array(n), l = 0; l < n; l++)
    o[l] = arguments[l]
  return (
    o.forEach(a => {
      t(e, a)
    }),
    e
  )
}
function Rn(e) {
  return e != null
}
const ea = Symbol('SlotsContextProps'),
  ws = e => {
    Ue(ea, e)
  },
  io = () =>
    Xe(
      ea,
      k(() => ({}))
    ),
  ta = Symbol('ContextProps'),
  $s = e => {
    Ue(ta, e)
  },
  ks = () => Xe(ta, { onResizeColumn: () => {} })
globalThis && globalThis.__rest
const Dt = 'RC_TABLE_INTERNAL_COL_DEFINE',
  na = Symbol('HoverContextProps'),
  Os = e => {
    Ue(na, e)
  },
  Ps = () => Xe(na, { startRow: te(-1), endRow: te(-1), onHover() {} }),
  Nn = te(!1),
  Es = () => {
    tt(() => {
      Nn.value = Nn.value || Va('position', 'sticky')
    })
  },
  Is = () => Nn
var Ks =
  (globalThis && globalThis.__rest) ||
  function(e, t) {
    var n = {}
    for (var o in e)
      Object.prototype.hasOwnProperty.call(e, o) &&
        t.indexOf(o) < 0 &&
        (n[o] = e[o])
    if (e != null && typeof Object.getOwnPropertySymbols == 'function')
      for (var l = 0, o = Object.getOwnPropertySymbols(e); l < o.length; l++)
        t.indexOf(o[l]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(e, o[l]) &&
          (n[o[l]] = e[o[l]])
    return n
  }
function Ts(e, t, n, o) {
  const l = e + t - 1
  return e <= o && l >= n
}
function _s(e) {
  return e && typeof e == 'object' && !Array.isArray(e) && !Zt(e)
}
const cn = pe({
  name: 'Cell',
  props: [
    'prefixCls',
    'record',
    'index',
    'renderIndex',
    'dataIndex',
    'customRender',
    'component',
    'colSpan',
    'rowSpan',
    'fixLeft',
    'fixRight',
    'firstFixLeft',
    'lastFixLeft',
    'firstFixRight',
    'lastFixRight',
    'appendNode',
    'additionalProps',
    'ellipsis',
    'align',
    'rowType',
    'isSticky',
    'column',
    'cellType',
    'transformCellText'
  ],
  setup(e, t) {
    let { slots: n } = t
    const o = io(),
      { onHover: l, startRow: a, endRow: r } = Ps(),
      i = k(() => {
        var v, s, p, $
        return (p =
          (v = e.colSpan) !== null && v !== void 0
            ? v
            : (s = e.additionalProps) === null || s === void 0
            ? void 0
            : s.colSpan) !== null && p !== void 0
          ? p
          : ($ = e.additionalProps) === null || $ === void 0
          ? void 0
          : $.colspan
      }),
      d = k(() => {
        var v, s, p, $
        return (p =
          (v = e.rowSpan) !== null && v !== void 0
            ? v
            : (s = e.additionalProps) === null || s === void 0
            ? void 0
            : s.rowSpan) !== null && p !== void 0
          ? p
          : ($ = e.additionalProps) === null || $ === void 0
          ? void 0
          : $.rowspan
      }),
      u = Je(() => {
        const { index: v } = e
        return Ts(v, d.value || 1, a.value, r.value)
      }),
      c = Is(),
      f = (v, s) => {
        var p
        const { record: $, index: h, additionalProps: O } = e
        $ && l(h, h + s - 1),
          (p = O == null ? void 0 : O.onMouseenter) === null ||
            p === void 0 ||
            p.call(O, v)
      },
      m = v => {
        var s
        const { record: p, additionalProps: $ } = e
        p && l(-1, -1),
          (s = $ == null ? void 0 : $.onMouseleave) === null ||
            s === void 0 ||
            s.call($, v)
      },
      w = v => {
        const s = Lt(v)[0]
        return Zt(s)
          ? s.type === Na
            ? s.children
            : Array.isArray(s.children)
            ? w(s.children)
            : void 0
          : s
      },
      x = te(null)
    return (
      Ee([u, () => e.prefixCls, x], () => {
        const v = Ga(x.value)
        v &&
          (u.value
            ? Ir(v, `${e.prefixCls}-cell-row-hover`)
            : Kr(v, `${e.prefixCls}-cell-row-hover`))
      }),
      () => {
        var v, s, p, $, h, O
        const {
            prefixCls: C,
            record: K,
            index: S,
            renderIndex: I,
            dataIndex: y,
            customRender: E,
            component: _ = 'td',
            fixLeft: F,
            fixRight: T,
            firstFixLeft: M,
            lastFixLeft: X,
            firstFixRight: q,
            lastFixRight: ae,
            appendNode: H = (v = n.appendNode) === null || v === void 0
              ? void 0
              : v.call(n),
            additionalProps: U = {},
            ellipsis: j,
            align: Z,
            rowType: B,
            isSticky: V,
            column: W = {},
            cellType: ne
          } = e,
          Q = `${C}-cell`
        let Pe, ue
        const Ie = (s = n.default) === null || s === void 0 ? void 0 : s.call(n)
        if (Rn(Ie) || ne === 'header') ue = Ie
        else {
          const D = Ql(K, y)
          if (((ue = D), E)) {
            const P = E({
              text: D,
              value: D,
              record: K,
              index: S,
              renderIndex: I,
              column: W.__originColumn__
            })
            _s(P) ? ((ue = P.children), (Pe = P.props)) : (ue = P)
          }
          if (
            !(Dt in W) &&
            ne === 'body' &&
            o.value.bodyCell &&
            !(!((p = W.slots) === null || p === void 0) && p.customRender)
          ) {
            const P = eo(
              o.value,
              'bodyCell',
              {
                text: D,
                value: D,
                record: K,
                index: S,
                column: W.__originColumn__
              },
              () => {
                const R = ue === void 0 ? D : ue
                return [
                  (typeof R == 'object' && zt(R)) || typeof R != 'object'
                    ? R
                    : null
                ]
              }
            )
            ue = Zn(P)
          }
          e.transformCellText &&
            (ue = e.transformCellText({
              text: ue,
              record: K,
              index: S,
              column: W.__originColumn__
            }))
        }
        typeof ue == 'object' && !Array.isArray(ue) && !Zt(ue) && (ue = null),
          j && (X || q) && (ue = g('span', { class: `${Q}-content` }, [ue])),
          Array.isArray(ue) && ue.length === 1 && (ue = ue[0])
        const ge = Pe || {},
          { colSpan: Te, rowSpan: De, style: Ve, class: _e } = ge,
          Re = Ks(ge, ['colSpan', 'rowSpan', 'style', 'class']),
          Y =
            ($ = Te !== void 0 ? Te : i.value) !== null && $ !== void 0 ? $ : 1,
          ve =
            (h = De !== void 0 ? De : d.value) !== null && h !== void 0 ? h : 1
        if (Y === 0 || ve === 0) return null
        const ee = {},
          se = typeof F == 'number' && c.value,
          fe = typeof T == 'number' && c.value
        se && ((ee.position = 'sticky'), (ee.left = `${F}px`)),
          fe && ((ee.position = 'sticky'), (ee.right = `${T}px`))
        const Oe = {}
        Z && (Oe.textAlign = Z)
        let de
        const he = j === !0 ? { showTitle: !0 } : j
        he &&
          (he.showTitle || B === 'header') &&
          (typeof ue == 'string' || typeof ue == 'number'
            ? (de = ue.toString())
            : Zt(ue) && (de = w([ue])))
        const Ke = b(b(b({ title: de }, Re), U), {
          colSpan: Y !== 1 ? Y : null,
          rowSpan: ve !== 1 ? ve : null,
          class: re(
            Q,
            {
              [`${Q}-fix-left`]: se && c.value,
              [`${Q}-fix-left-first`]: M && c.value,
              [`${Q}-fix-left-last`]: X && c.value,
              [`${Q}-fix-right`]: fe && c.value,
              [`${Q}-fix-right-first`]: q && c.value,
              [`${Q}-fix-right-last`]: ae && c.value,
              [`${Q}-ellipsis`]: j,
              [`${Q}-with-append`]: H,
              [`${Q}-fix-sticky`]: (se || fe) && V && c.value
            },
            U.class,
            _e
          ),
          onMouseenter: D => {
            f(D, ve)
          },
          onMouseleave: m,
          style: [U.style, Oe, ee, Ve]
        })
        return g(_, L(L({}, Ke), {}, { ref: x }), {
          default: () => [
            H,
            ue,
            (O = n.dragHandle) === null || O === void 0 ? void 0 : O.call(n)
          ]
        })
      }
    )
  }
})
function so(e, t, n, o, l) {
  const a = n[e] || {},
    r = n[t] || {}
  let i, d
  a.fixed === 'left' ? (i = o.left[e]) : r.fixed === 'right' && (d = o.right[t])
  let u = !1,
    c = !1,
    f = !1,
    m = !1
  const w = n[t + 1],
    x = n[e - 1]
  return (
    l === 'rtl'
      ? i !== void 0
        ? (m = !(x && x.fixed === 'left'))
        : d !== void 0 && (f = !(w && w.fixed === 'right'))
      : i !== void 0
      ? (u = !(w && w.fixed === 'left'))
      : d !== void 0 && (c = !(x && x.fixed === 'right')),
    {
      fixLeft: i,
      fixRight: d,
      lastFixLeft: u,
      firstFixRight: c,
      lastFixRight: f,
      firstFixLeft: m,
      isSticky: o.isSticky
    }
  )
}
const Go = {
    mouse: { start: 'mousedown', move: 'mousemove', stop: 'mouseup' },
    touch: { start: 'touchstart', move: 'touchmove', stop: 'touchend' }
  },
  Xo = 50,
  Ds = pe({
    compatConfig: { MODE: 3 },
    name: 'DragHandle',
    props: {
      prefixCls: String,
      width: { type: Number, required: !0 },
      minWidth: { type: Number, default: Xo },
      maxWidth: { type: Number, default: 1 / 0 },
      column: { type: Object, default: void 0 }
    },
    setup(e) {
      let t = 0,
        n = { remove: () => {} },
        o = { remove: () => {} }
      const l = () => {
        n.remove(), o.remove()
      }
      $l(() => {
        l()
      }),
        Ne(() => {
          Qe(
            !isNaN(e.width),
            'Table',
            'width must be a number when use resizable'
          )
        })
      const { onResizeColumn: a } = ks(),
        r = k(() =>
          typeof e.minWidth == 'number' && !isNaN(e.minWidth) ? e.minWidth : Xo
        ),
        i = k(() =>
          typeof e.maxWidth == 'number' && !isNaN(e.maxWidth)
            ? e.maxWidth
            : 1 / 0
        ),
        d = wl()
      let u = 0
      const c = te(!1)
      let f
      const m = h => {
          let O = 0
          h.touches
            ? h.touches.length
              ? (O = h.touches[0].pageX)
              : (O = h.changedTouches[0].pageX)
            : (O = h.pageX)
          const C = t - O
          let K = Math.max(u - C, r.value)
          ;(K = Math.min(K, i.value)),
            Ot.cancel(f),
            (f = Ot(() => {
              a(K, e.column.__originColumn__)
            }))
        },
        w = h => {
          m(h)
        },
        x = h => {
          ;(c.value = !1), m(h), l()
        },
        v = (h, O) => {
          ;(c.value = !0),
            l(),
            (u = d.vnode.el.parentNode.getBoundingClientRect().width),
            !(h instanceof MouseEvent && h.which !== 1) &&
              (h.stopPropagation && h.stopPropagation(),
              (t = h.touches ? h.touches[0].pageX : h.pageX),
              (n = kt(document.documentElement, O.move, w)),
              (o = kt(document.documentElement, O.stop, x)))
        },
        s = h => {
          h.stopPropagation(), h.preventDefault(), v(h, Go.mouse)
        },
        p = h => {
          h.stopPropagation(), h.preventDefault(), v(h, Go.touch)
        },
        $ = h => {
          h.stopPropagation(), h.preventDefault()
        }
      return () => {
        const { prefixCls: h } = e,
          O = { [yr ? 'onTouchstartPassive' : 'onTouchstart']: C => p(C) }
        return g(
          'div',
          L(
            L(
              {
                class: `${h}-resize-handle ${c.value ? 'dragging' : ''}`,
                onMousedown: s
              },
              O
            ),
            {},
            { onClick: $ }
          ),
          [g('div', { class: `${h}-resize-handle-line` }, null)]
        )
      }
    }
  }),
  Rs = pe({
    name: 'HeaderRow',
    props: [
      'cells',
      'stickyOffsets',
      'flattenColumns',
      'rowComponent',
      'cellComponent',
      'index',
      'customHeaderRow'
    ],
    setup(e) {
      const t = ut()
      return () => {
        const { prefixCls: n, direction: o } = t,
          {
            cells: l,
            stickyOffsets: a,
            flattenColumns: r,
            rowComponent: i,
            cellComponent: d,
            customHeaderRow: u,
            index: c
          } = e
        let f
        u &&
          (f = u(
            l.map(w => w.column),
            c
          ))
        const m = dn(l.map(w => w.column))
        return g(i, f, {
          default: () => [
            l.map((w, x) => {
              const { column: v } = w,
                s = so(w.colStart, w.colEnd, r, a, o)
              let p
              v && v.customHeaderCell && (p = w.column.customHeaderCell(v))
              const $ = v
              return g(
                cn,
                L(
                  L(
                    L({}, w),
                    {},
                    {
                      cellType: 'header',
                      ellipsis: v.ellipsis,
                      align: v.align,
                      component: d,
                      prefixCls: n,
                      key: m[x]
                    },
                    s
                  ),
                  {},
                  { additionalProps: p, rowType: 'header', column: v }
                ),
                {
                  default: () => v.title,
                  dragHandle: () =>
                    $.resizable
                      ? g(
                          Ds,
                          {
                            prefixCls: n,
                            width: $.width,
                            minWidth: $.minWidth,
                            maxWidth: $.maxWidth,
                            column: $
                          },
                          null
                        )
                      : null
                }
              )
            })
          ]
        })
      }
    }
  })
function Ns(e) {
  const t = []
  function n(l, a) {
    let r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0
    t[r] = t[r] || []
    let i = a
    return l.filter(Boolean).map(u => {
      const c = {
        key: u.key,
        class: re(u.className, u.class),
        column: u,
        colStart: i
      }
      let f = 1
      const m = u.children
      return (
        m &&
          m.length > 0 &&
          ((f = n(m, i, r + 1).reduce((w, x) => w + x, 0)),
          (c.hasSubColumns = !0)),
        'colSpan' in u && ({ colSpan: f } = u),
        'rowSpan' in u && (c.rowSpan = u.rowSpan),
        (c.colSpan = f),
        (c.colEnd = c.colStart + f - 1),
        t[r].push(c),
        (i += f),
        f
      )
    })
  }
  n(e, 0)
  const o = t.length
  for (let l = 0; l < o; l += 1)
    t[l].forEach(a => {
      !('rowSpan' in a) && !a.hasSubColumns && (a.rowSpan = o - l)
    })
  return t
}
const Uo = pe({
    name: 'TableHeader',
    inheritAttrs: !1,
    props: ['columns', 'flattenColumns', 'stickyOffsets', 'customHeaderRow'],
    setup(e) {
      const t = ut(),
        n = k(() => Ns(e.columns))
      return () => {
        const { prefixCls: o, getComponent: l } = t,
          { stickyOffsets: a, flattenColumns: r, customHeaderRow: i } = e,
          d = l(['header', 'wrapper'], 'thead'),
          u = l(['header', 'row'], 'tr'),
          c = l(['header', 'cell'], 'th')
        return g(
          d,
          { class: `${o}-thead` },
          {
            default: () => [
              n.value.map((f, m) =>
                g(
                  Rs,
                  {
                    key: m,
                    flattenColumns: r,
                    cells: f,
                    stickyOffsets: a,
                    rowComponent: u,
                    cellComponent: c,
                    customHeaderRow: i,
                    index: m
                  },
                  null
                )
              )
            ]
          }
        )
      }
    }
  }),
  oa = Symbol('ExpandedRowProps'),
  Bs = e => {
    Ue(oa, e)
  },
  As = () => Xe(oa, {}),
  la = pe({
    name: 'ExpandedRow',
    inheritAttrs: !1,
    props: [
      'prefixCls',
      'component',
      'cellComponent',
      'expanded',
      'colSpan',
      'isEmpty'
    ],
    setup(e, t) {
      let { slots: n, attrs: o } = t
      const l = ut(),
        a = As(),
        { fixHeader: r, fixColumn: i, componentWidth: d, horizonScroll: u } = a
      return () => {
        const {
          prefixCls: c,
          component: f,
          cellComponent: m,
          expanded: w,
          colSpan: x,
          isEmpty: v
        } = e
        return g(
          f,
          { class: o.class, style: { display: w ? null : 'none' } },
          {
            default: () => [
              g(
                cn,
                { component: m, prefixCls: c, colSpan: x },
                {
                  default: () => {
                    var s
                    let p =
                      (s = n.default) === null || s === void 0
                        ? void 0
                        : s.call(n)
                    return (
                      (v ? u.value : i.value) &&
                        (p = g(
                          'div',
                          {
                            style: {
                              width: `${d.value -
                                (r.value ? l.scrollbarSize : 0)}px`,
                              position: 'sticky',
                              left: 0,
                              overflow: 'hidden'
                            },
                            class: `${c}-expanded-row-fixed`
                          },
                          [p]
                        )),
                      p
                    )
                  }
                }
              )
            ]
          }
        )
      }
    }
  }),
  Fs = pe({
    name: 'MeasureCell',
    props: ['columnKey'],
    setup(e, t) {
      let { emit: n } = t
      const o = ce()
      return (
        tt(() => {
          o.value && n('columnResize', e.columnKey, o.value.offsetWidth)
        }),
        () =>
          g(
            Kl,
            {
              onResize: l => {
                let { offsetWidth: a } = l
                n('columnResize', e.columnKey, a)
              }
            },
            {
              default: () => [
                g(
                  'td',
                  { ref: o, style: { padding: 0, border: 0, height: 0 } },
                  [
                    g('div', { style: { height: 0, overflow: 'hidden' } }, [
                      Pn(' ')
                    ])
                  ]
                )
              ]
            }
          )
      )
    }
  }),
  aa = Symbol('BodyContextProps'),
  zs = e => {
    Ue(aa, e)
  },
  ra = () => Xe(aa, {}),
  Ms = pe({
    name: 'BodyRow',
    inheritAttrs: !1,
    props: [
      'record',
      'index',
      'renderIndex',
      'recordKey',
      'expandedKeys',
      'rowComponent',
      'cellComponent',
      'customRow',
      'rowExpandable',
      'indent',
      'rowKey',
      'getRowKey',
      'childrenColumnName'
    ],
    setup(e, t) {
      let { attrs: n } = t
      const o = ut(),
        l = ra(),
        a = te(!1),
        r = k(() => e.expandedKeys && e.expandedKeys.has(e.recordKey))
      Ne(() => {
        r.value && (a.value = !0)
      })
      const i = k(
          () =>
            l.expandableType === 'row' &&
            (!e.rowExpandable || e.rowExpandable(e.record))
        ),
        d = k(() => l.expandableType === 'nest'),
        u = k(
          () =>
            e.childrenColumnName && e.record && e.record[e.childrenColumnName]
        ),
        c = k(() => i.value || d.value),
        f = (s, p) => {
          l.onTriggerExpand(s, p)
        },
        m = k(() => {
          var s
          return (
            ((s = e.customRow) === null || s === void 0
              ? void 0
              : s.call(e, e.record, e.index)) || {}
          )
        }),
        w = function(s) {
          var p, $
          l.expandRowByClick && c.value && f(e.record, s)
          for (
            var h = arguments.length, O = new Array(h > 1 ? h - 1 : 0), C = 1;
            C < h;
            C++
          )
            O[C - 1] = arguments[C]
          ;($ = (p = m.value) === null || p === void 0 ? void 0 : p.onClick) ===
            null ||
            $ === void 0 ||
            $.call(p, s, ...O)
        },
        x = k(() => {
          const { record: s, index: p, indent: $ } = e,
            { rowClassName: h } = l
          return typeof h == 'string'
            ? h
            : typeof h == 'function'
            ? h(s, p, $)
            : ''
        }),
        v = k(() => dn(l.flattenColumns))
      return () => {
        const { class: s, style: p } = n,
          {
            record: $,
            index: h,
            rowKey: O,
            indent: C = 0,
            rowComponent: K,
            cellComponent: S
          } = e,
          { prefixCls: I, fixedInfoList: y, transformCellText: E } = o,
          {
            flattenColumns: _,
            expandedRowClassName: F,
            indentSize: T,
            expandIcon: M,
            expandedRowRender: X,
            expandIconColumnIndex: q
          } = l,
          ae = g(
            K,
            L(
              L({}, m.value),
              {},
              {
                'data-row-key': O,
                class: re(
                  s,
                  `${I}-row`,
                  `${I}-row-level-${C}`,
                  x.value,
                  m.value.class
                ),
                style: [p, m.value.style],
                onClick: w
              }
            ),
            {
              default: () => [
                _.map((U, j) => {
                  const { customRender: Z, dataIndex: B, className: V } = U,
                    W = v[j],
                    ne = y[j]
                  let Q
                  U.customCell && (Q = U.customCell($, h, U))
                  const Pe =
                    j === (q || 0) && d.value
                      ? g(dt, null, [
                          g(
                            'span',
                            {
                              style: { paddingLeft: `${T * C}px` },
                              class: `${I}-row-indent indent-level-${C}`
                            },
                            null
                          ),
                          M({
                            prefixCls: I,
                            expanded: r.value,
                            expandable: u.value,
                            record: $,
                            onExpand: f
                          })
                        ])
                      : null
                  return g(
                    cn,
                    L(
                      L(
                        {
                          cellType: 'body',
                          class: V,
                          ellipsis: U.ellipsis,
                          align: U.align,
                          component: S,
                          prefixCls: I,
                          key: W,
                          record: $,
                          index: h,
                          renderIndex: e.renderIndex,
                          dataIndex: B,
                          customRender: Z
                        },
                        ne
                      ),
                      {},
                      {
                        additionalProps: Q,
                        column: U,
                        transformCellText: E,
                        appendNode: Pe
                      }
                    ),
                    null
                  )
                })
              ]
            }
          )
        let H
        if (i.value && (a.value || r.value)) {
          const U = X({
              record: $,
              index: h,
              indent: C + 1,
              expanded: r.value
            }),
            j = F && F($, h, C)
          H = g(
            la,
            {
              expanded: r.value,
              class: re(
                `${I}-expanded-row`,
                `${I}-expanded-row-level-${C + 1}`,
                j
              ),
              prefixCls: I,
              component: K,
              cellComponent: S,
              colSpan: _.length,
              isEmpty: !1
            },
            { default: () => [U] }
          )
        }
        return g(dt, null, [ae, H])
      }
    }
  })
function ia(e, t, n, o, l, a) {
  const r = []
  r.push({ record: e, indent: t, index: a })
  const i = l(e),
    d = o == null ? void 0 : o.has(i)
  if (e && Array.isArray(e[n]) && d)
    for (let u = 0; u < e[n].length; u += 1) {
      const c = ia(e[n][u], t + 1, n, o, l, u)
      r.push(...c)
    }
  return r
}
function Ls(e, t, n, o) {
  return k(() => {
    const a = t.value,
      r = n.value,
      i = e.value
    if (r != null && r.size) {
      const d = []
      for (let u = 0; u < (i == null ? void 0 : i.length); u += 1) {
        const c = i[u]
        d.push(...ia(c, 0, a, r, o.value, u))
      }
      return d
    }
    return i == null
      ? void 0
      : i.map((d, u) => ({ record: d, indent: 0, index: u }))
  })
}
const sa = Symbol('ResizeContextProps'),
  js = e => {
    Ue(sa, e)
  },
  Hs = () => Xe(sa, { onColumnResize: () => {} }),
  Ws = pe({
    name: 'TableBody',
    props: [
      'data',
      'getRowKey',
      'measureColumnWidth',
      'expandedKeys',
      'customRow',
      'rowExpandable',
      'childrenColumnName'
    ],
    setup(e, t) {
      let { slots: n } = t
      const o = Hs(),
        l = ut(),
        a = ra(),
        r = Ls(
          ze(e, 'data'),
          ze(e, 'childrenColumnName'),
          ze(e, 'expandedKeys'),
          ze(e, 'getRowKey')
        ),
        i = te(-1),
        d = te(-1)
      let u
      return (
        Os({
          startRow: i,
          endRow: d,
          onHover: (c, f) => {
            clearTimeout(u),
              (u = setTimeout(() => {
                ;(i.value = c), (d.value = f)
              }, 100))
          }
        }),
        () => {
          var c
          const {
              data: f,
              getRowKey: m,
              measureColumnWidth: w,
              expandedKeys: x,
              customRow: v,
              rowExpandable: s,
              childrenColumnName: p
            } = e,
            { onColumnResize: $ } = o,
            { prefixCls: h, getComponent: O } = l,
            { flattenColumns: C } = a,
            K = O(['body', 'wrapper'], 'tbody'),
            S = O(['body', 'row'], 'tr'),
            I = O(['body', 'cell'], 'td')
          let y
          f.length
            ? (y = r.value.map((_, F) => {
                const { record: T, indent: M, index: X } = _,
                  q = m(T, F)
                return g(
                  Ms,
                  {
                    key: q,
                    rowKey: q,
                    record: T,
                    recordKey: q,
                    index: F,
                    renderIndex: X,
                    rowComponent: S,
                    cellComponent: I,
                    expandedKeys: x,
                    customRow: v,
                    getRowKey: m,
                    rowExpandable: s,
                    childrenColumnName: p,
                    indent: M
                  },
                  null
                )
              }))
            : (y = g(
                la,
                {
                  expanded: !0,
                  class: `${h}-placeholder`,
                  prefixCls: h,
                  component: S,
                  cellComponent: I,
                  colSpan: C.length,
                  isEmpty: !0
                },
                {
                  default: () => [
                    (c = n.emptyNode) === null || c === void 0
                      ? void 0
                      : c.call(n)
                  ]
                }
              ))
          const E = dn(C)
          return g(
            K,
            { class: `${h}-tbody` },
            {
              default: () => [
                w &&
                  g(
                    'tr',
                    {
                      'aria-hidden': 'true',
                      class: `${h}-measure-row`,
                      style: { height: 0, fontSize: 0 }
                    },
                    [
                      E.map(_ =>
                        g(Fs, { key: _, columnKey: _, onColumnResize: $ }, null)
                      )
                    ]
                  ),
                y
              ]
            }
          )
        }
      )
    }
  }),
  xt = {}
var Vs =
  (globalThis && globalThis.__rest) ||
  function(e, t) {
    var n = {}
    for (var o in e)
      Object.prototype.hasOwnProperty.call(e, o) &&
        t.indexOf(o) < 0 &&
        (n[o] = e[o])
    if (e != null && typeof Object.getOwnPropertySymbols == 'function')
      for (var l = 0, o = Object.getOwnPropertySymbols(e); l < o.length; l++)
        t.indexOf(o[l]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(e, o[l]) &&
          (n[o[l]] = e[o[l]])
    return n
  }
function Bn(e) {
  return e.reduce((t, n) => {
    const { fixed: o } = n,
      l = o === !0 ? 'left' : o,
      a = n.children
    return a && a.length > 0
      ? [...t, ...Bn(a).map(r => b({ fixed: l }, r))]
      : [...t, b(b({}, n), { fixed: l })]
  }, [])
}
function Gs(e) {
  return e.map(t => {
    const { fixed: n } = t,
      o = Vs(t, ['fixed'])
    let l = n
    return (
      n === 'left' ? (l = 'right') : n === 'right' && (l = 'left'),
      b({ fixed: l }, o)
    )
  })
}
function Xs(e, t) {
  let {
    prefixCls: n,
    columns: o,
    expandable: l,
    expandedKeys: a,
    getRowKey: r,
    onTriggerExpand: i,
    expandIcon: d,
    rowExpandable: u,
    expandIconColumnIndex: c,
    direction: f,
    expandRowByClick: m,
    expandColumnWidth: w,
    expandFixed: x
  } = e
  const v = io(),
    s = k(() => {
      if (l.value) {
        let h = o.value.slice()
        if (!h.includes(xt)) {
          const T = c.value || 0
          T >= 0 && h.splice(T, 0, xt)
        }
        const O = h.indexOf(xt)
        h = h.filter((T, M) => T !== xt || M === O)
        const C = o.value[O]
        let K
        ;(x.value === 'left' || x.value) && !c.value
          ? (K = 'left')
          : (x.value === 'right' || x.value) && c.value === o.value.length
          ? (K = 'right')
          : (K = C ? C.fixed : null)
        const S = a.value,
          I = u.value,
          y = d.value,
          E = n.value,
          _ = m.value,
          F = {
            [Dt]: {
              class: `${n.value}-expand-icon-col`,
              columnType: 'EXPAND_COLUMN'
            },
            title: eo(v.value, 'expandColumnTitle', {}, () => ['']),
            fixed: K,
            class: `${n.value}-row-expand-icon-cell`,
            width: w.value,
            customRender: T => {
              let { record: M, index: X } = T
              const q = r.value(M, X),
                ae = S.has(q),
                H = I ? I(M) : !0,
                U = y({
                  prefixCls: E,
                  expanded: ae,
                  expandable: H,
                  record: M,
                  onExpand: i
                })
              return _
                ? g('span', { onClick: j => j.stopPropagation() }, [U])
                : U
            }
          }
        return h.map(T => (T === xt ? F : T))
      }
      return o.value.filter(h => h !== xt)
    }),
    p = k(() => {
      let h = s.value
      return (
        t.value && (h = t.value(h)),
        h.length || (h = [{ customRender: () => null }]),
        h
      )
    }),
    $ = k(() => (f.value === 'rtl' ? Gs(Bn(p.value)) : Bn(p.value)))
  return [p, $]
}
function da(e) {
  const t = te(e)
  let n
  const o = te([])
  function l(a) {
    o.value.push(a),
      Ot.cancel(n),
      (n = Ot(() => {
        const r = o.value
        ;(o.value = []),
          r.forEach(i => {
            t.value = i(t.value)
          })
      }))
  }
  return (
    ht(() => {
      Ot.cancel(n)
    }),
    [t, l]
  )
}
function Us(e) {
  const t = ce(e || null),
    n = ce()
  function o() {
    clearTimeout(n.value)
  }
  function l(r) {
    ;(t.value = r),
      o(),
      (n.value = setTimeout(() => {
        ;(t.value = null), (n.value = void 0)
      }, 100))
  }
  function a() {
    return t.value
  }
  return (
    ht(() => {
      o()
    }),
    [l, a]
  )
}
function qs(e, t, n) {
  return k(() => {
    const l = [],
      a = []
    let r = 0,
      i = 0
    const d = e.value,
      u = t.value,
      c = n.value
    for (let f = 0; f < u; f += 1)
      if (c === 'rtl') {
        ;(a[f] = i), (i += d[f] || 0)
        const m = u - f - 1
        ;(l[m] = r), (r += d[m] || 0)
      } else {
        ;(l[f] = r), (r += d[f] || 0)
        const m = u - f - 1
        ;(a[m] = i), (i += d[m] || 0)
      }
    return { left: l, right: a }
  })
}
var Ys =
  (globalThis && globalThis.__rest) ||
  function(e, t) {
    var n = {}
    for (var o in e)
      Object.prototype.hasOwnProperty.call(e, o) &&
        t.indexOf(o) < 0 &&
        (n[o] = e[o])
    if (e != null && typeof Object.getOwnPropertySymbols == 'function')
      for (var l = 0, o = Object.getOwnPropertySymbols(e); l < o.length; l++)
        t.indexOf(o[l]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(e, o[l]) &&
          (n[o[l]] = e[o[l]])
    return n
  }
function ca(e) {
  let { colWidths: t, columns: n, columCount: o } = e
  const l = [],
    a = o || n.length
  let r = !1
  for (let i = a - 1; i >= 0; i -= 1) {
    const d = t[i],
      u = n && n[i],
      c = u && u[Dt]
    if (d || c || r) {
      const f = c || {},
        m = Ys(f, ['columnType'])
      l.unshift(
        g(
          'col',
          L(
            { key: i, style: { width: typeof d == 'number' ? `${d}px` : d } },
            m
          ),
          null
        )
      ),
        (r = !0)
    }
  }
  return g('colgroup', null, [l])
}
function An(e, t) {
  let { slots: n } = t
  var o
  return g('div', null, [
    (o = n.default) === null || o === void 0 ? void 0 : o.call(n)
  ])
}
An.displayName = 'Panel'
let Zs = 0
const Js = pe({
    name: 'TableSummary',
    props: ['fixed'],
    setup(e, t) {
      let { slots: n } = t
      const o = ut(),
        l = `table-summary-uni-key-${++Zs}`,
        a = k(() => e.fixed === '' || e.fixed)
      return (
        Ne(() => {
          o.summaryCollect(l, a.value)
        }),
        ht(() => {
          o.summaryCollect(l, !1)
        }),
        () => {
          var r
          return (r = n.default) === null || r === void 0 ? void 0 : r.call(n)
        }
      )
    }
  }),
  Qs = Js,
  ed = pe({
    compatConfig: { MODE: 3 },
    name: 'ATableSummaryRow',
    setup(e, t) {
      let { slots: n } = t
      return () => {
        var o
        return g('tr', null, [
          (o = n.default) === null || o === void 0 ? void 0 : o.call(n)
        ])
      }
    }
  }),
  ua = Symbol('SummaryContextProps'),
  td = e => {
    Ue(ua, e)
  },
  nd = () => Xe(ua, {}),
  od = pe({
    name: 'ATableSummaryCell',
    props: ['index', 'colSpan', 'rowSpan', 'align'],
    setup(e, t) {
      let { attrs: n, slots: o } = t
      const l = ut(),
        a = nd()
      return () => {
        const { index: r, colSpan: i = 1, rowSpan: d, align: u } = e,
          { prefixCls: c, direction: f } = l,
          { scrollColumnIndex: m, stickyOffsets: w, flattenColumns: x } = a,
          s = r + i - 1 + 1 === m ? i + 1 : i,
          p = so(r, r + s - 1, x, w, f)
        return g(
          cn,
          L(
            {
              class: n.class,
              index: r,
              component: 'td',
              prefixCls: c,
              record: null,
              dataIndex: null,
              align: u,
              colSpan: s,
              rowSpan: d,
              customRender: () => {
                var $
                return ($ = o.default) === null || $ === void 0
                  ? void 0
                  : $.call(o)
              }
            },
            p
          ),
          null
        )
      }
    }
  }),
  Yt = pe({
    name: 'TableFooter',
    inheritAttrs: !1,
    props: ['stickyOffsets', 'flattenColumns'],
    setup(e, t) {
      let { slots: n } = t
      const o = ut()
      return (
        td(
          Ct({
            stickyOffsets: ze(e, 'stickyOffsets'),
            flattenColumns: ze(e, 'flattenColumns'),
            scrollColumnIndex: k(() => {
              const l = e.flattenColumns.length - 1,
                a = e.flattenColumns[l]
              return a != null && a.scrollbar ? l : null
            })
          })
        ),
        () => {
          var l
          const { prefixCls: a } = o
          return g('tfoot', { class: `${a}-summary` }, [
            (l = n.default) === null || l === void 0 ? void 0 : l.call(n)
          ])
        }
      )
    }
  }),
  ld = Qs
function ad(e) {
  let { prefixCls: t, record: n, onExpand: o, expanded: l, expandable: a } = e
  const r = `${t}-row-expand-icon`
  if (!a) return g('span', { class: [r, `${t}-row-spaced`] }, null)
  const i = d => {
    o(n, d), d.stopPropagation()
  }
  return g(
    'span',
    {
      class: { [r]: !0, [`${t}-row-expanded`]: l, [`${t}-row-collapsed`]: !l },
      onClick: i
    },
    null
  )
}
function rd(e, t, n) {
  const o = []
  function l(a) {
    ;(a || []).forEach((r, i) => {
      o.push(t(r, i)), l(r[n])
    })
  }
  return l(e), o
}
const id = pe({
    name: 'StickyScrollBar',
    inheritAttrs: !1,
    props: ['offsetScroll', 'container', 'scrollBodyRef', 'scrollBodySizeInfo'],
    emits: ['scroll'],
    setup(e, t) {
      let { emit: n, expose: o } = t
      const l = ut(),
        a = te(0),
        r = te(0),
        i = te(0)
      Ne(
        () => {
          ;(a.value = e.scrollBodySizeInfo.scrollWidth || 0),
            (r.value = e.scrollBodySizeInfo.clientWidth || 0),
            (i.value = a.value && r.value * (r.value / a.value))
        },
        { flush: 'post' }
      )
      const d = te(),
        [u, c] = da({ scrollLeft: 0, isHiddenScrollBar: !0 }),
        f = ce({ delta: 0, x: 0 }),
        m = te(!1),
        w = () => {
          m.value = !1
        },
        x = S => {
          ;(f.value = { delta: S.pageX - u.value.scrollLeft, x: 0 }),
            (m.value = !0),
            S.preventDefault()
        },
        v = S => {
          const { buttons: I } = S || (window == null ? void 0 : window.event)
          if (!m.value || I === 0) {
            m.value && (m.value = !1)
            return
          }
          let y = f.value.x + S.pageX - f.value.x - f.value.delta
          y <= 0 && (y = 0),
            y + i.value >= r.value && (y = r.value - i.value),
            n('scroll', { scrollLeft: (y / r.value) * (a.value + 2) }),
            (f.value.x = S.pageX)
        },
        s = () => {
          if (!e.scrollBodyRef.value) return
          const S = Ko(e.scrollBodyRef.value).top,
            I = S + e.scrollBodyRef.value.offsetHeight,
            y =
              e.container === window
                ? document.documentElement.scrollTop + window.innerHeight
                : Ko(e.container).top + e.container.clientHeight
          I - Do() <= y || S >= y - e.offsetScroll
            ? c(E => b(b({}, E), { isHiddenScrollBar: !0 }))
            : c(E => b(b({}, E), { isHiddenScrollBar: !1 }))
        }
      o({
        setScrollLeft: S => {
          c(I => b(b({}, I), { scrollLeft: (S / a.value) * r.value || 0 }))
        }
      })
      let $ = null,
        h = null,
        O = null,
        C = null
      tt(() => {
        ;($ = kt(document.body, 'mouseup', w, !1)),
          (h = kt(document.body, 'mousemove', v, !1)),
          (O = kt(window, 'resize', s, !1))
      }),
        Ba(() => {
          et(() => {
            s()
          })
        }),
        tt(() => {
          setTimeout(() => {
            Ee(
              [i, m],
              () => {
                s()
              },
              { immediate: !0, flush: 'post' }
            )
          })
        }),
        Ee(
          () => e.container,
          () => {
            C == null || C.remove(), (C = kt(e.container, 'scroll', s, !1))
          },
          { immediate: !0, flush: 'post' }
        ),
        ht(() => {
          $ == null || $.remove(),
            h == null || h.remove(),
            C == null || C.remove(),
            O == null || O.remove()
        }),
        Ee(
          () => b({}, u.value),
          (S, I) => {
            S.isHiddenScrollBar !==
              (I == null ? void 0 : I.isHiddenScrollBar) &&
              !S.isHiddenScrollBar &&
              c(y => {
                const E = e.scrollBodyRef.value
                return E
                  ? b(b({}, y), {
                      scrollLeft: (E.scrollLeft / E.scrollWidth) * E.clientWidth
                    })
                  : y
              })
          },
          { immediate: !0 }
        )
      const K = Do()
      return () => {
        if (a.value <= r.value || !i.value || u.value.isHiddenScrollBar)
          return null
        const { prefixCls: S } = l
        return g(
          'div',
          {
            style: {
              height: `${K}px`,
              width: `${r.value}px`,
              bottom: `${e.offsetScroll}px`
            },
            class: `${S}-sticky-scroll`
          },
          [
            g(
              'div',
              {
                onMousedown: x,
                ref: d,
                class: re(`${S}-sticky-scroll-bar`, {
                  [`${S}-sticky-scroll-bar-active`]: m.value
                }),
                style: {
                  width: `${i.value}px`,
                  transform: `translate3d(${u.value.scrollLeft}px, 0, 0)`
                }
              },
              null
            )
          ]
        )
      }
    }
  }),
  qo = Xa() ? window : null
function sd(e, t) {
  return k(() => {
    const {
        offsetHeader: n = 0,
        offsetSummary: o = 0,
        offsetScroll: l = 0,
        getContainer: a = () => qo
      } = typeof e.value == 'object' ? e.value : {},
      r = a() || qo,
      i = !!e.value
    return {
      isSticky: i,
      stickyClassName: i ? `${t.value}-sticky-holder` : '',
      offsetHeader: n,
      offsetSummary: o,
      offsetScroll: l,
      container: r
    }
  })
}
function dd(e, t) {
  return k(() => {
    const n = [],
      o = e.value,
      l = t.value
    for (let a = 0; a < l; a += 1) {
      const r = o[a]
      if (r !== void 0) n[a] = r
      else return null
    }
    return n
  })
}
const Yo = pe({
  name: 'FixedHolder',
  inheritAttrs: !1,
  props: [
    'columns',
    'flattenColumns',
    'stickyOffsets',
    'customHeaderRow',
    'noData',
    'maxContentScroll',
    'colWidths',
    'columCount',
    'direction',
    'fixHeader',
    'stickyTopOffset',
    'stickyBottomOffset',
    'stickyClassName'
  ],
  emits: ['scroll'],
  setup(e, t) {
    let { attrs: n, slots: o, emit: l } = t
    const a = ut(),
      r = k(() => (a.isSticky && !e.fixHeader ? 0 : a.scrollbarSize)),
      i = ce(),
      d = v => {
        const { currentTarget: s, deltaX: p } = v
        p &&
          (l('scroll', { currentTarget: s, scrollLeft: s.scrollLeft + p }),
          v.preventDefault())
      },
      u = ce()
    tt(() => {
      et(() => {
        u.value = kt(i.value, 'wheel', d)
      })
    }),
      ht(() => {
        var v
        ;(v = u.value) === null || v === void 0 || v.remove()
      })
    const c = k(() =>
        e.flattenColumns.every(
          v => v.width && v.width !== 0 && v.width !== '0px'
        )
      ),
      f = ce([]),
      m = ce([])
    Ne(() => {
      const v = e.flattenColumns[e.flattenColumns.length - 1],
        s = {
          fixed: v ? v.fixed : null,
          scrollbar: !0,
          customHeaderCell: () => ({ class: `${a.prefixCls}-cell-scrollbar` })
        }
      ;(f.value = r.value ? [...e.columns, s] : e.columns),
        (m.value = r.value ? [...e.flattenColumns, s] : e.flattenColumns)
    })
    const w = k(() => {
        const { stickyOffsets: v, direction: s } = e,
          { right: p, left: $ } = v
        return b(b({}, v), {
          left: s === 'rtl' ? [...$.map(h => h + r.value), 0] : $,
          right: s === 'rtl' ? p : [...p.map(h => h + r.value), 0],
          isSticky: a.isSticky
        })
      }),
      x = dd(ze(e, 'colWidths'), ze(e, 'columCount'))
    return () => {
      var v
      const {
          noData: s,
          columCount: p,
          stickyTopOffset: $,
          stickyBottomOffset: h,
          stickyClassName: O,
          maxContentScroll: C
        } = e,
        { isSticky: K } = a
      return g(
        'div',
        {
          style: b(
            { overflow: 'hidden' },
            K ? { top: `${$}px`, bottom: `${h}px` } : {}
          ),
          ref: i,
          class: re(n.class, { [O]: !!O })
        },
        [
          g(
            'table',
            {
              style: {
                tableLayout: 'fixed',
                visibility: s || x.value ? null : 'hidden'
              }
            },
            [
              (!s || !C || c.value) &&
                g(
                  ca,
                  {
                    colWidths: x.value ? [...x.value, r.value] : [],
                    columCount: p + 1,
                    columns: m.value
                  },
                  null
                ),
              (v = o.default) === null || v === void 0
                ? void 0
                : v.call(
                    o,
                    b(b({}, e), {
                      stickyOffsets: w.value,
                      columns: f.value,
                      flattenColumns: m.value
                    })
                  )
            ]
          )
        ]
      )
    }
  }
})
function Zo(e) {
  for (
    var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), o = 1;
    o < t;
    o++
  )
    n[o - 1] = arguments[o]
  return Ct(vi(n.map(l => [l, ze(e, l)])))
}
const cd = [],
  ud = {},
  Fn = 'rc-table-internal-hook',
  fd = pe({
    name: 'VcTable',
    inheritAttrs: !1,
    props: [
      'prefixCls',
      'data',
      'columns',
      'rowKey',
      'tableLayout',
      'scroll',
      'rowClassName',
      'title',
      'footer',
      'id',
      'showHeader',
      'components',
      'customRow',
      'customHeaderRow',
      'direction',
      'expandFixed',
      'expandColumnWidth',
      'expandedRowKeys',
      'defaultExpandedRowKeys',
      'expandedRowRender',
      'expandRowByClick',
      'expandIcon',
      'onExpand',
      'onExpandedRowsChange',
      'onUpdate:expandedRowKeys',
      'defaultExpandAllRows',
      'indentSize',
      'expandIconColumnIndex',
      'expandedRowClassName',
      'childrenColumnName',
      'rowExpandable',
      'sticky',
      'transformColumns',
      'internalHooks',
      'internalRefs',
      'canExpandable',
      'onUpdateInternalRefs',
      'transformCellText'
    ],
    emits: [
      'expand',
      'expandedRowsChange',
      'updateInternalRefs',
      'update:expandedRowKeys'
    ],
    setup(e, t) {
      let { attrs: n, slots: o, emit: l } = t
      const a = k(() => e.data || cd),
        r = k(() => !!a.value.length),
        i = k(() => Ss(e.components, {})),
        d = (P, R) => Ql(i.value, P) || R,
        u = k(() => {
          const P = e.rowKey
          return typeof P == 'function' ? P : R => R && R[P]
        }),
        c = k(() => e.expandIcon || ad),
        f = k(() => e.childrenColumnName || 'children'),
        m = k(() =>
          e.expandedRowRender
            ? 'row'
            : e.canExpandable ||
              a.value.some(P => P && typeof P == 'object' && P[f.value])
            ? 'nest'
            : !1
        ),
        w = te([])
      Ne(() => {
        e.defaultExpandedRowKeys && (w.value = e.defaultExpandedRowKeys),
          e.defaultExpandAllRows && (w.value = rd(a.value, u.value, f.value))
      })()
      const v = k(() => new Set(e.expandedRowKeys || w.value || [])),
        s = P => {
          const R = u.value(P, a.value.indexOf(P))
          let oe
          const me = v.value.has(R)
          me
            ? (v.value.delete(R), (oe = [...v.value]))
            : (oe = [...v.value, R]),
            (w.value = oe),
            l('expand', !me, P),
            l('update:expandedRowKeys', oe),
            l('expandedRowsChange', oe)
        },
        p = ce(0),
        [$, h] = Xs(
          b(b({}, vn(e)), {
            expandable: k(() => !!e.expandedRowRender),
            expandedKeys: v,
            getRowKey: u,
            onTriggerExpand: s,
            expandIcon: c
          }),
          k(() => (e.internalHooks === Fn ? e.transformColumns : null))
        ),
        O = k(() => ({ columns: $.value, flattenColumns: h.value })),
        C = ce(),
        K = ce(),
        S = ce(),
        I = ce({ scrollWidth: 0, clientWidth: 0 }),
        y = ce(),
        [E, _] = Et(!1),
        [F, T] = Et(!1),
        [M, X] = da(new Map()),
        q = k(() => dn(h.value)),
        ae = k(() => q.value.map(P => M.value.get(P))),
        H = k(() => h.value.length),
        U = qs(ae, H, ze(e, 'direction')),
        j = k(() => e.scroll && Rn(e.scroll.y)),
        Z = k(() => (e.scroll && Rn(e.scroll.x)) || !!e.expandFixed),
        B = k(
          () =>
            Z.value &&
            h.value.some(P => {
              let { fixed: R } = P
              return R
            })
        ),
        V = ce(),
        W = sd(ze(e, 'sticky'), ze(e, 'prefixCls')),
        ne = Ct({}),
        Q = k(() => {
          const P = Object.values(ne)[0]
          return (j.value || W.value.isSticky) && P
        }),
        Pe = (P, R) => {
          R ? (ne[P] = R) : delete ne[P]
        },
        ue = ce({}),
        Ie = ce({}),
        ge = ce({})
      Ne(() => {
        j.value &&
          (Ie.value = { overflowY: 'scroll', maxHeight: wo(e.scroll.y) }),
          Z.value &&
            ((ue.value = { overflowX: 'auto' }),
            j.value || (Ie.value = { overflowY: 'hidden' }),
            (ge.value = {
              width: e.scroll.x === !0 ? 'auto' : wo(e.scroll.x),
              minWidth: '100%'
            }))
      })
      const Te = (P, R) => {
          xr(C.value) &&
            X(oe => {
              if (oe.get(P) !== R) {
                const me = new Map(oe)
                return me.set(P, R), me
              }
              return oe
            })
        },
        [De, Ve] = Us(null)
      function _e(P, R) {
        if (!R) return
        if (typeof R == 'function') {
          R(P)
          return
        }
        const oe = R.$el || R
        oe.scrollLeft !== P && (oe.scrollLeft = P)
      }
      const Re = P => {
          let { currentTarget: R, scrollLeft: oe } = P
          var me
          const we = e.direction === 'rtl',
            N = typeof oe == 'number' ? oe : R.scrollLeft,
            A = R || ud
          if (
            ((!Ve() || Ve() === A) &&
              (De(A),
              _e(N, K.value),
              _e(N, S.value),
              _e(N, y.value),
              _e(
                N,
                (me = V.value) === null || me === void 0
                  ? void 0
                  : me.setScrollLeft
              )),
            R)
          ) {
            const { scrollWidth: z, clientWidth: G } = R
            we ? (_(-N < z - G), T(-N > 0)) : (_(N > 0), T(N < z - G))
          }
        },
        Y = () => {
          Z.value && S.value ? Re({ currentTarget: S.value }) : (_(!1), T(!1))
        }
      let ve
      const ee = P => {
          P !== p.value && (Y(), (p.value = C.value ? C.value.offsetWidth : P))
        },
        se = P => {
          let { width: R } = P
          if ((clearTimeout(ve), p.value === 0)) {
            ee(R)
            return
          }
          ve = setTimeout(() => {
            ee(R)
          }, 100)
        }
      Ee(
        [Z, () => e.data, () => e.columns],
        () => {
          Z.value && Y()
        },
        { flush: 'post' }
      )
      const [fe, Oe] = Et(0)
      Es(),
        tt(() => {
          et(() => {
            var P, R
            Y(),
              Oe(br(S.value).width),
              (I.value = {
                scrollWidth:
                  ((P = S.value) === null || P === void 0
                    ? void 0
                    : P.scrollWidth) || 0,
                clientWidth:
                  ((R = S.value) === null || R === void 0
                    ? void 0
                    : R.clientWidth) || 0
              })
          })
        }),
        qn(() => {
          et(() => {
            var P, R
            const oe =
                ((P = S.value) === null || P === void 0
                  ? void 0
                  : P.scrollWidth) || 0,
              me =
                ((R = S.value) === null || R === void 0
                  ? void 0
                  : R.clientWidth) || 0
            ;(I.value.scrollWidth !== oe || I.value.clientWidth !== me) &&
              (I.value = { scrollWidth: oe, clientWidth: me })
          })
        }),
        Ne(
          () => {
            e.internalHooks === Fn &&
              e.internalRefs &&
              e.onUpdateInternalRefs({
                body: S.value ? S.value.$el || S.value : null
              })
          },
          { flush: 'post' }
        )
      const de = k(() =>
          e.tableLayout
            ? e.tableLayout
            : B.value
            ? e.scroll.x === 'max-content'
              ? 'auto'
              : 'fixed'
            : j.value ||
              W.value.isSticky ||
              h.value.some(P => {
                let { ellipsis: R } = P
                return R
              })
            ? 'fixed'
            : 'auto'
        ),
        he = () => {
          var P
          return r.value
            ? null
            : ((P = o.emptyText) === null || P === void 0
                ? void 0
                : P.call(o)) || 'No Data'
        }
      xs(
        Ct(
          b(b({}, vn(Zo(e, 'prefixCls', 'direction', 'transformCellText'))), {
            getComponent: d,
            scrollbarSize: fe,
            fixedInfoList: k(() =>
              h.value.map((P, R) => so(R, R, h.value, U.value, e.direction))
            ),
            isSticky: k(() => W.value.isSticky),
            summaryCollect: Pe
          })
        )
      ),
        zs(
          Ct(
            b(
              b(
                {},
                vn(
                  Zo(
                    e,
                    'rowClassName',
                    'expandedRowClassName',
                    'expandRowByClick',
                    'expandedRowRender',
                    'expandIconColumnIndex',
                    'indentSize'
                  )
                )
              ),
              {
                columns: $,
                flattenColumns: h,
                tableLayout: de,
                expandIcon: c,
                expandableType: m,
                onTriggerExpand: s
              }
            )
          )
        ),
        js({ onColumnResize: Te }),
        Bs({ componentWidth: p, fixHeader: j, fixColumn: B, horizonScroll: Z })
      const Ke = () =>
          g(
            Ws,
            {
              data: a.value,
              measureColumnWidth: j.value || Z.value || W.value.isSticky,
              expandedKeys: v.value,
              rowExpandable: e.rowExpandable,
              getRowKey: u.value,
              customRow: e.customRow,
              childrenColumnName: f.value
            },
            { emptyNode: he }
          ),
        D = () =>
          g(
            ca,
            {
              colWidths: h.value.map(P => {
                let { width: R } = P
                return R
              }),
              columns: h.value
            },
            null
          )
      return () => {
        var P
        const {
            prefixCls: R,
            scroll: oe,
            tableLayout: me,
            direction: we,
            title: N = o.title,
            footer: A = o.footer,
            id: z,
            showHeader: G,
            customHeaderRow: le
          } = e,
          {
            isSticky: ie,
            offsetHeader: J,
            offsetSummary: xe,
            offsetScroll: ke,
            stickyClassName: ye,
            container: Ce
          } = W.value,
          Se = d(['table'], 'table'),
          Ae = d(['body']),
          Me =
            (P = o.summary) === null || P === void 0
              ? void 0
              : P.call(o, { pageData: a.value })
        let je = () => null
        const Be = {
          colWidths: ae.value,
          columCount: h.value.length,
          stickyOffsets: U.value,
          customHeaderRow: le,
          fixHeader: j.value,
          scroll: oe
        }
        if (j.value || ie) {
          let wt = () => null
          typeof Ae == 'function'
            ? ((wt = () =>
                Ae(a.value, { scrollbarSize: fe.value, ref: S, onScroll: Re })),
              (Be.colWidths = h.value.map((yt, fn) => {
                let { width: qt } = yt
                const Nt = fn === $.value.length - 1 ? qt - fe.value : qt
                return typeof Nt == 'number' && !Number.isNaN(Nt) ? Nt : 0
              })))
            : (wt = () =>
                g(
                  'div',
                  {
                    style: b(b({}, ue.value), Ie.value),
                    onScroll: Re,
                    ref: S,
                    class: re(`${R}-body`)
                  },
                  [
                    g(
                      Se,
                      { style: b(b({}, ge.value), { tableLayout: de.value }) },
                      {
                        default: () => [
                          D(),
                          Ke(),
                          !Q.value &&
                            Me &&
                            g(
                              Yt,
                              {
                                stickyOffsets: U.value,
                                flattenColumns: h.value
                              },
                              { default: () => [Me] }
                            )
                        ]
                      }
                    )
                  ]
                ))
          const Ut = b(
            b(
              b(
                {
                  noData: !a.value.length,
                  maxContentScroll: Z.value && oe.x === 'max-content'
                },
                Be
              ),
              O.value
            ),
            { direction: we, stickyClassName: ye, onScroll: Re }
          )
          je = () =>
            g(dt, null, [
              G !== !1 &&
                g(
                  Yo,
                  L(
                    L({}, Ut),
                    {},
                    { stickyTopOffset: J, class: `${R}-header`, ref: K }
                  ),
                  {
                    default: yt =>
                      g(dt, null, [
                        g(Uo, yt, null),
                        Q.value === 'top' && g(Yt, yt, { default: () => [Me] })
                      ])
                  }
                ),
              wt(),
              Q.value &&
                Q.value !== 'top' &&
                g(
                  Yo,
                  L(
                    L({}, Ut),
                    {},
                    { stickyBottomOffset: xe, class: `${R}-summary`, ref: y }
                  ),
                  { default: yt => g(Yt, yt, { default: () => [Me] }) }
                ),
              ie &&
                S.value &&
                g(
                  id,
                  {
                    ref: V,
                    offsetScroll: ke,
                    scrollBodyRef: S,
                    onScroll: Re,
                    container: Ce,
                    scrollBodySizeInfo: I.value
                  },
                  null
                )
            ])
        } else
          je = () =>
            g(
              'div',
              {
                style: b(b({}, ue.value), Ie.value),
                class: re(`${R}-content`),
                onScroll: Re,
                ref: S
              },
              [
                g(
                  Se,
                  { style: b(b({}, ge.value), { tableLayout: de.value }) },
                  {
                    default: () => [
                      D(),
                      G !== !1 && g(Uo, L(L({}, Be), O.value), null),
                      Ke(),
                      Me &&
                        g(
                          Yt,
                          { stickyOffsets: U.value, flattenColumns: h.value },
                          { default: () => [Me] }
                        )
                    ]
                  }
                )
              ]
            )
        const lt = to(n, { aria: !0, data: !0 }),
          gt = () =>
            g(
              'div',
              L(
                L({}, lt),
                {},
                {
                  class: re(R, {
                    [`${R}-rtl`]: we === 'rtl',
                    [`${R}-ping-left`]: E.value,
                    [`${R}-ping-right`]: F.value,
                    [`${R}-layout-fixed`]: me === 'fixed',
                    [`${R}-fixed-header`]: j.value,
                    [`${R}-fixed-column`]: B.value,
                    [`${R}-scroll-horizontal`]: Z.value,
                    [`${R}-has-fix-left`]: h.value[0] && h.value[0].fixed,
                    [`${R}-has-fix-right`]:
                      h.value[H.value - 1] &&
                      h.value[H.value - 1].fixed === 'right',
                    [n.class]: n.class
                  }),
                  style: n.style,
                  id: z,
                  ref: C
                }
              ),
              [
                N &&
                  g(
                    An,
                    { class: `${R}-title` },
                    { default: () => [N(a.value)] }
                  ),
                g('div', { class: `${R}-container` }, [je()]),
                A &&
                  g(
                    An,
                    { class: `${R}-footer` },
                    { default: () => [A(a.value)] }
                  )
              ]
            )
        return Z.value ? g(Kl, { onResize: se }, { default: gt }) : gt()
      }
    }
  })
function vd() {
  const e = b({}, arguments.length <= 0 ? void 0 : arguments[0])
  for (let t = 1; t < arguments.length; t++) {
    const n = t < 0 || arguments.length <= t ? void 0 : arguments[t]
    n &&
      Object.keys(n).forEach(o => {
        const l = n[o]
        l !== void 0 && (e[o] = l)
      })
  }
  return e
}
const zn = 10
function pd(e, t) {
  const n = { current: e.current, pageSize: e.pageSize }
  return (
    Object.keys(t && typeof t == 'object' ? t : {}).forEach(l => {
      const a = e[l]
      typeof a != 'function' && (n[l] = a)
    }),
    n
  )
}
function md(e, t, n) {
  const o = k(() => (t.value && typeof t.value == 'object' ? t.value : {})),
    l = k(() => o.value.total || 0),
    [a, r] = Et(() => ({
      current: 'defaultCurrent' in o.value ? o.value.defaultCurrent : 1,
      pageSize: 'defaultPageSize' in o.value ? o.value.defaultPageSize : zn
    })),
    i = k(() => {
      const c = vd(a.value, o.value, {
          total: l.value > 0 ? l.value : e.value
        }),
        f = Math.ceil((l.value || e.value) / c.pageSize)
      return c.current > f && (c.current = f || 1), c
    }),
    d = (c, f) => {
      t.value !== !1 && r({ current: c ?? 1, pageSize: f || i.value.pageSize })
    },
    u = (c, f) => {
      var m, w
      t.value &&
        ((w = (m = o.value).onChange) === null ||
          w === void 0 ||
          w.call(m, c, f)),
        d(c, f),
        n(c, f || i.value.pageSize)
    }
  return [
    k(() => (t.value === !1 ? {} : b(b({}, i.value), { onChange: u }))),
    d
  ]
}
function hd(e, t, n) {
  const o = te({})
  Ee(
    [e, t, n],
    () => {
      const a = new Map(),
        r = n.value,
        i = t.value
      function d(u) {
        u.forEach((c, f) => {
          const m = r(c, f)
          a.set(m, c), c && typeof c == 'object' && i in c && d(c[i] || [])
        })
      }
      d(e.value), (o.value = { kvMap: a })
    },
    { deep: !0, immediate: !0 }
  )
  function l(a) {
    return o.value.kvMap.get(a)
  }
  return [l]
}
const vt = {},
  Mn = 'SELECT_ALL',
  Ln = 'SELECT_INVERT',
  jn = 'SELECT_NONE',
  gd = []
function fa(e, t) {
  let n = []
  return (
    (t || []).forEach(o => {
      n.push(o),
        o && typeof o == 'object' && e in o && (n = [...n, ...fa(e, o[e])])
    }),
    n
  )
}
function yd(e, t) {
  const n = k(() => {
      const y = e.value || {},
        { checkStrictly: E = !0 } = y
      return b(b({}, y), { checkStrictly: E })
    }),
    [o, l] = Cr(
      n.value.selectedRowKeys || n.value.defaultSelectedRowKeys || gd,
      { value: k(() => n.value.selectedRowKeys) }
    ),
    a = te(new Map()),
    r = y => {
      if (n.value.preserveSelectedRowKeys) {
        const E = new Map()
        y.forEach(_ => {
          let F = t.getRecordByKey(_)
          !F && a.value.has(_) && (F = a.value.get(_)), E.set(_, F)
        }),
          (a.value = E)
      }
    }
  Ne(() => {
    r(o.value)
  })
  const i = k(() =>
      n.value.checkStrictly
        ? null
        : lo(t.data.value, {
            externalGetKey: t.getRowKey.value,
            childrenPropName: t.childrenColumnName.value
          }).keyEntities
    ),
    d = k(() => fa(t.childrenColumnName.value, t.pageData.value)),
    u = k(() => {
      const y = new Map(),
        E = t.getRowKey.value,
        _ = n.value.getCheckboxProps
      return (
        d.value.forEach((F, T) => {
          const M = E(F, T),
            X = (_ ? _(F) : null) || {}
          y.set(M, X)
        }),
        y
      )
    }),
    { maxLevel: c, levelEntities: f } = Xl(i),
    m = y => {
      var E
      return !!(
        !((E = u.value.get(t.getRowKey.value(y))) === null || E === void 0) &&
        E.disabled
      )
    },
    w = k(() => {
      if (n.value.checkStrictly) return [o.value || [], []]
      const { checkedKeys: y, halfCheckedKeys: E } = _t(
        o.value,
        !0,
        i.value,
        c.value,
        f.value,
        m
      )
      return [y || [], E]
    }),
    x = k(() => w.value[0]),
    v = k(() => w.value[1]),
    s = k(() => {
      const y = n.value.type === 'radio' ? x.value.slice(0, 1) : x.value
      return new Set(y)
    }),
    p = k(() => (n.value.type === 'radio' ? new Set() : new Set(v.value))),
    [$, h] = Et(null),
    O = y => {
      let E, _
      r(y)
      const { preserveSelectedRowKeys: F, onChange: T } = n.value,
        { getRecordByKey: M } = t
      F
        ? ((E = y), (_ = y.map(X => a.value.get(X))))
        : ((E = []),
          (_ = []),
          y.forEach(X => {
            const q = M(X)
            q !== void 0 && (E.push(X), _.push(q))
          })),
        l(E),
        T == null || T(E, _)
    },
    C = (y, E, _, F) => {
      const { onSelect: T } = n.value,
        { getRecordByKey: M } = t || {}
      if (T) {
        const X = _.map(q => M(q))
        T(M(y), E, X, F)
      }
      O(_)
    },
    K = k(() => {
      const {
          onSelectInvert: y,
          onSelectNone: E,
          selections: _,
          hideSelectAll: F
        } = n.value,
        { data: T, pageData: M, getRowKey: X, locale: q } = t
      return !_ || F
        ? null
        : (_ === !0 ? [Mn, Ln, jn] : _).map(H =>
            H === Mn
              ? {
                  key: 'all',
                  text: q.value.selectionAll,
                  onSelect() {
                    O(
                      T.value
                        .map((U, j) => X.value(U, j))
                        .filter(U => {
                          const j = u.value.get(U)
                          return !(j != null && j.disabled) || s.value.has(U)
                        })
                    )
                  }
                }
              : H === Ln
              ? {
                  key: 'invert',
                  text: q.value.selectInvert,
                  onSelect() {
                    const U = new Set(s.value)
                    M.value.forEach((Z, B) => {
                      const V = X.value(Z, B),
                        W = u.value.get(V)
                      ;(W != null && W.disabled) ||
                        (U.has(V) ? U.delete(V) : U.add(V))
                    })
                    const j = Array.from(U)
                    y &&
                      (Qe(
                        !1,
                        'Table',
                        '`onSelectInvert` will be removed in future. Please use `onChange` instead.'
                      ),
                      y(j)),
                      O(j)
                  }
                }
              : H === jn
              ? {
                  key: 'none',
                  text: q.value.selectNone,
                  onSelect() {
                    E == null || E(),
                      O(
                        Array.from(s.value).filter(U => {
                          const j = u.value.get(U)
                          return j == null ? void 0 : j.disabled
                        })
                      )
                  }
                }
              : H
          )
    }),
    S = k(() => d.value.length)
  return [
    y => {
      var E
      const {
          onSelectAll: _,
          onSelectMultiple: F,
          columnWidth: T,
          type: M,
          fixed: X,
          renderCell: q,
          hideSelectAll: ae,
          checkStrictly: H
        } = n.value,
        {
          prefixCls: U,
          getRecordByKey: j,
          getRowKey: Z,
          expandType: B,
          getPopupContainer: V
        } = t
      if (!e.value) return y.filter(ee => ee !== vt)
      let W = y.slice()
      const ne = new Set(s.value),
        Q = d.value.map(Z.value).filter(ee => !u.value.get(ee).disabled),
        Pe = Q.every(ee => ne.has(ee)),
        ue = Q.some(ee => ne.has(ee)),
        Ie = () => {
          const ee = []
          Pe
            ? Q.forEach(fe => {
                ne.delete(fe), ee.push(fe)
              })
            : Q.forEach(fe => {
                ne.has(fe) || (ne.add(fe), ee.push(fe))
              })
          const se = Array.from(ne)
          _ == null ||
            _(
              !Pe,
              se.map(fe => j(fe)),
              ee.map(fe => j(fe))
            ),
            O(se)
        }
      let ge
      if (M !== 'radio') {
        let ee
        if (K.value) {
          const he = g(
            ln,
            { getPopupContainer: V.value },
            {
              default: () => [
                K.value.map((Ke, D) => {
                  const { key: P, text: R, onSelect: oe } = Ke
                  return g(
                    ln.Item,
                    {
                      key: P || D,
                      onClick: () => {
                        oe == null || oe(Q)
                      }
                    },
                    { default: () => [R] }
                  )
                })
              ]
            }
          )
          ee = g('div', { class: `${U.value}-selection-extra` }, [
            g(
              It,
              { overlay: he, getPopupContainer: V.value },
              { default: () => [g('span', null, [g(Rr, null, null)])] }
            )
          ])
        }
        const se = d.value
            .map((he, Ke) => {
              const D = Z.value(he, Ke),
                P = u.value.get(D) || {}
              return b({ checked: ne.has(D) }, P)
            })
            .filter(he => {
              let { disabled: Ke } = he
              return Ke
            }),
          fe = !!se.length && se.length === S.value,
          Oe =
            fe &&
            se.every(he => {
              let { checked: Ke } = he
              return Ke
            }),
          de =
            fe &&
            se.some(he => {
              let { checked: Ke } = he
              return Ke
            })
        ge =
          !ae &&
          g('div', { class: `${U.value}-selection` }, [
            g(
              mt,
              {
                checked: fe ? Oe : !!S.value && Pe,
                indeterminate: fe ? !Oe && de : !Pe && ue,
                onChange: Ie,
                disabled: S.value === 0 || fe,
                'aria-label': ee ? 'Custom selection' : 'Select all',
                skipGroup: !0
              },
              null
            ),
            ee
          ])
      }
      let Te
      M === 'radio'
        ? (Te = ee => {
            let { record: se, index: fe } = ee
            const Oe = Z.value(se, fe),
              de = ne.has(Oe)
            return {
              node: g(
                Ge,
                L(
                  L({}, u.value.get(Oe)),
                  {},
                  {
                    checked: de,
                    onClick: he => he.stopPropagation(),
                    onChange: he => {
                      ne.has(Oe) || C(Oe, !0, [Oe], he.nativeEvent)
                    }
                  }
                ),
                null
              ),
              checked: de
            }
          })
        : (Te = ee => {
            let { record: se, index: fe } = ee
            var Oe
            const de = Z.value(se, fe),
              he = ne.has(de),
              Ke = p.value.has(de),
              D = u.value.get(de)
            let P
            return (
              B.value === 'nest'
                ? ((P = Ke),
                  Qe(
                    typeof (D == null ? void 0 : D.indeterminate) != 'boolean',
                    'Table',
                    'set `indeterminate` using `rowSelection.getCheckboxProps` is not allowed with tree structured dataSource.'
                  ))
                : (P =
                    (Oe = D == null ? void 0 : D.indeterminate) !== null &&
                    Oe !== void 0
                      ? Oe
                      : Ke),
              {
                node: g(
                  mt,
                  L(
                    L({}, D),
                    {},
                    {
                      indeterminate: P,
                      checked: he,
                      skipGroup: !0,
                      onClick: R => R.stopPropagation(),
                      onChange: R => {
                        let { nativeEvent: oe } = R
                        const { shiftKey: me } = oe
                        let we = -1,
                          N = -1
                        if (me && H) {
                          const A = new Set([$.value, de])
                          Q.some((z, G) => {
                            if (A.has(z))
                              if (we === -1) we = G
                              else return (N = G), !0
                            return !1
                          })
                        }
                        if (N !== -1 && we !== N && H) {
                          const A = Q.slice(we, N + 1),
                            z = []
                          he
                            ? A.forEach(le => {
                                ne.has(le) && (z.push(le), ne.delete(le))
                              })
                            : A.forEach(le => {
                                ne.has(le) || (z.push(le), ne.add(le))
                              })
                          const G = Array.from(ne)
                          F == null ||
                            F(
                              !he,
                              G.map(le => j(le)),
                              z.map(le => j(le))
                            ),
                            O(G)
                        } else {
                          const A = x.value
                          if (H) {
                            const z = he ? it(A, de) : ft(A, de)
                            C(de, !he, z, oe)
                          } else {
                            const z = _t(
                                [...A, de],
                                !0,
                                i.value,
                                c.value,
                                f.value,
                                m
                              ),
                              { checkedKeys: G, halfCheckedKeys: le } = z
                            let ie = G
                            if (he) {
                              const J = new Set(G)
                              J.delete(de),
                                (ie = _t(
                                  Array.from(J),
                                  { checked: !1, halfCheckedKeys: le },
                                  i.value,
                                  c.value,
                                  f.value,
                                  m
                                ).checkedKeys)
                            }
                            C(de, !he, ie, oe)
                          }
                        }
                        h(de)
                      }
                    }
                  ),
                  null
                ),
                checked: he
              }
            )
          })
      const De = ee => {
        let { record: se, index: fe } = ee
        const { node: Oe, checked: de } = Te({ record: se, index: fe })
        return q ? q(de, se, fe, Oe) : Oe
      }
      if (!W.includes(vt))
        if (
          W.findIndex(ee => {
            var se
            return (
              ((se = ee[Dt]) === null || se === void 0
                ? void 0
                : se.columnType) === 'EXPAND_COLUMN'
            )
          }) === 0
        ) {
          const [ee, ...se] = W
          W = [ee, vt, ...se]
        } else W = [vt, ...W]
      const Ve = W.indexOf(vt)
      W = W.filter((ee, se) => ee !== vt || se === Ve)
      const _e = W[Ve - 1],
        Re = W[Ve + 1]
      let Y = X
      Y === void 0 &&
        ((Re == null ? void 0 : Re.fixed) !== void 0
          ? (Y = Re.fixed)
          : (_e == null ? void 0 : _e.fixed) !== void 0 && (Y = _e.fixed)),
        Y &&
          _e &&
          ((E = _e[Dt]) === null || E === void 0 ? void 0 : E.columnType) ===
            'EXPAND_COLUMN' &&
          _e.fixed === void 0 &&
          (_e.fixed = Y)
      const ve = {
        fixed: Y,
        width: T,
        className: `${U.value}-selection-column`,
        title: n.value.columnTitle || ge,
        customRender: De,
        [Dt]: { class: `${U.value}-selection-col` }
      }
      return W.map(ee => (ee === vt ? ve : ee))
    },
    s
  ]
}
function Jo(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? Object(arguments[t]) : {},
      o = Object.keys(n)
    typeof Object.getOwnPropertySymbols == 'function' &&
      (o = o.concat(
        Object.getOwnPropertySymbols(n).filter(function(l) {
          return Object.getOwnPropertyDescriptor(n, l).enumerable
        })
      )),
      o.forEach(function(l) {
        bd(e, l, n[l])
      })
  }
  return e
}
function bd(e, t, n) {
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
var co = function(t, n) {
  var o = Jo({}, t, n.attrs)
  return g(ot, Jo({}, o, { icon: jr }), null)
}
co.displayName = 'CaretDownOutlined'
co.inheritAttrs = !1
const xd = co
function Qo(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? Object(arguments[t]) : {},
      o = Object.keys(n)
    typeof Object.getOwnPropertySymbols == 'function' &&
      (o = o.concat(
        Object.getOwnPropertySymbols(n).filter(function(l) {
          return Object.getOwnPropertyDescriptor(n, l).enumerable
        })
      )),
      o.forEach(function(l) {
        Cd(e, l, n[l])
      })
  }
  return e
}
function Cd(e, t, n) {
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
var uo = function(t, n) {
  var o = Qo({}, t, n.attrs)
  return g(ot, Qo({}, o, { icon: Hr }), null)
}
uo.displayName = 'CaretUpOutlined'
uo.inheritAttrs = !1
const Sd = uo
var wd =
  (globalThis && globalThis.__rest) ||
  function(e, t) {
    var n = {}
    for (var o in e)
      Object.prototype.hasOwnProperty.call(e, o) &&
        t.indexOf(o) < 0 &&
        (n[o] = e[o])
    if (e != null && typeof Object.getOwnPropertySymbols == 'function')
      for (var l = 0, o = Object.getOwnPropertySymbols(e); l < o.length; l++)
        t.indexOf(o[l]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(e, o[l]) &&
          (n[o[l]] = e[o[l]])
    return n
  }
function Kt(e, t) {
  return 'key' in e && e.key !== void 0 && e.key !== null
    ? e.key
    : e.dataIndex
    ? Array.isArray(e.dataIndex)
      ? e.dataIndex.join('.')
      : e.dataIndex
    : t
}
function Xt(e, t) {
  return t ? `${t}-${e}` : `${e}`
}
function fo(e, t) {
  return typeof e == 'function' ? e(t) : e
}
function va() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : []
  const t = Zn(e),
    n = []
  return (
    t.forEach(o => {
      var l, a, r, i
      if (!o) return
      const d = o.key,
        u = ((l = o.props) === null || l === void 0 ? void 0 : l.style) || {},
        c = ((a = o.props) === null || a === void 0 ? void 0 : a.class) || '',
        f = o.props || {}
      for (const [s, p] of Object.entries(f)) f[Ol(s)] = p
      const m = o.children || {},
        { default: w } = m,
        x = wd(m, ['default']),
        v = b(b(b({}, x), f), { style: u, class: c })
      if (
        (d && (v.key = d),
        !((r = o.type) === null || r === void 0) && r.__ANT_TABLE_COLUMN_GROUP)
      )
        v.children = va(typeof w == 'function' ? w() : w)
      else {
        const s = (i = o.children) === null || i === void 0 ? void 0 : i.default
        v.customRender = v.customRender || s
      }
      n.push(v)
    }),
    n
  )
}
const tn = 'ascend',
  bn = 'descend'
function rn(e) {
  return typeof e.sorter == 'object' && typeof e.sorter.multiple == 'number'
    ? e.sorter.multiple
    : !1
}
function el(e) {
  return typeof e == 'function'
    ? e
    : e && typeof e == 'object' && e.compare
    ? e.compare
    : !1
}
function $d(e, t) {
  return t ? e[e.indexOf(t) + 1] : e[0]
}
function Hn(e, t, n) {
  let o = []
  function l(a, r) {
    o.push({
      column: a,
      key: Kt(a, r),
      multiplePriority: rn(a),
      sortOrder: a.sortOrder
    })
  }
  return (
    (e || []).forEach((a, r) => {
      const i = Xt(r, n)
      a.children
        ? ('sortOrder' in a && l(a, i), (o = [...o, ...Hn(a.children, t, i)]))
        : a.sorter &&
          ('sortOrder' in a
            ? l(a, i)
            : t &&
              a.defaultSortOrder &&
              o.push({
                column: a,
                key: Kt(a, i),
                multiplePriority: rn(a),
                sortOrder: a.defaultSortOrder
              }))
    }),
    o
  )
}
function pa(e, t, n, o, l, a, r, i) {
  return (t || []).map((d, u) => {
    const c = Xt(u, i)
    let f = d
    if (f.sorter) {
      const m = f.sortDirections || l,
        w = f.showSorterTooltip === void 0 ? r : f.showSorterTooltip,
        x = Kt(f, c),
        v = n.find(y => {
          let { key: E } = y
          return E === x
        }),
        s = v ? v.sortOrder : null,
        p = $d(m, s),
        $ =
          m.includes(tn) &&
          g(
            Sd,
            {
              class: re(`${e}-column-sorter-up`, { active: s === tn }),
              role: 'presentation'
            },
            null
          ),
        h =
          m.includes(bn) &&
          g(
            xd,
            {
              role: 'presentation',
              class: re(`${e}-column-sorter-down`, { active: s === bn })
            },
            null
          ),
        { cancelSort: O, triggerAsc: C, triggerDesc: K } = a || {}
      let S = O
      p === bn ? (S = K) : p === tn && (S = C)
      const I = typeof w == 'object' ? w : { title: S }
      f = b(b({}, f), {
        className: re(f.className, { [`${e}-column-sort`]: s }),
        title: y => {
          const E = g('div', { class: `${e}-column-sorters` }, [
            g('span', { class: `${e}-column-title` }, [fo(d.title, y)]),
            g(
              'span',
              {
                class: re(`${e}-column-sorter`, {
                  [`${e}-column-sorter-full`]: !!($ && h)
                })
              },
              [g('span', { class: `${e}-column-sorter-inner` }, [$, h])]
            )
          ])
          return w ? g(Sr, I, { default: () => [E] }) : E
        },
        customHeaderCell: y => {
          const E = (d.customHeaderCell && d.customHeaderCell(y)) || {},
            _ = E.onClick,
            F = E.onKeydown
          return (
            (E.onClick = T => {
              o({ column: d, key: x, sortOrder: p, multiplePriority: rn(d) }),
                _ && _(T)
            }),
            (E.onKeydown = T => {
              T.keyCode === bt.ENTER &&
                (o({
                  column: d,
                  key: x,
                  sortOrder: p,
                  multiplePriority: rn(d)
                }),
                F == null || F(T))
            }),
            s && (E['aria-sort'] = s === 'ascend' ? 'ascending' : 'descending'),
            (E.class = re(E.class, `${e}-column-has-sorters`)),
            (E.tabindex = 0),
            E
          )
        }
      })
    }
    return (
      'children' in f &&
        (f = b(b({}, f), { children: pa(e, f.children, n, o, l, a, r, c) })),
      f
    )
  })
}
function tl(e) {
  const { column: t, sortOrder: n } = e
  return { column: t, order: n, field: t.dataIndex, columnKey: t.key }
}
function nl(e) {
  const t = e
    .filter(n => {
      let { sortOrder: o } = n
      return o
    })
    .map(tl)
  return t.length === 0 && e.length
    ? b(b({}, tl(e[e.length - 1])), { column: void 0 })
    : t.length <= 1
    ? t[0] || {}
    : t
}
function Wn(e, t, n) {
  const o = t.slice().sort((r, i) => i.multiplePriority - r.multiplePriority),
    l = e.slice(),
    a = o.filter(r => {
      let {
        column: { sorter: i },
        sortOrder: d
      } = r
      return el(i) && d
    })
  return a.length
    ? l
        .sort((r, i) => {
          for (let d = 0; d < a.length; d += 1) {
            const u = a[d],
              {
                column: { sorter: c },
                sortOrder: f
              } = u,
              m = el(c)
            if (m && f) {
              const w = m(r, i, f)
              if (w !== 0) return f === tn ? w : -w
            }
          }
          return 0
        })
        .map(r => {
          const i = r[n]
          return i ? b(b({}, r), { [n]: Wn(i, t, n) }) : r
        })
    : l
}
function kd(e) {
  let {
    prefixCls: t,
    mergedColumns: n,
    onSorterChange: o,
    sortDirections: l,
    tableLocale: a,
    showSorterTooltip: r
  } = e
  const [i, d] = Et(Hn(n.value, !0)),
    u = k(() => {
      let x = !0
      const v = Hn(n.value, !1)
      if (!v.length) return i.value
      const s = []
      function p(h) {
        x ? s.push(h) : s.push(b(b({}, h), { sortOrder: null }))
      }
      let $ = null
      return (
        v.forEach(h => {
          $ === null
            ? (p(h),
              h.sortOrder && (h.multiplePriority === !1 ? (x = !1) : ($ = !0)))
            : (($ && h.multiplePriority !== !1) || (x = !1), p(h))
        }),
        s
      )
    }),
    c = k(() => {
      const x = u.value.map(v => {
        let { column: s, sortOrder: p } = v
        return { column: s, order: p }
      })
      return {
        sortColumns: x,
        sortColumn: x[0] && x[0].column,
        sortOrder: x[0] && x[0].order
      }
    })
  function f(x) {
    let v
    x.multiplePriority === !1 ||
    !u.value.length ||
    u.value[0].multiplePriority === !1
      ? (v = [x])
      : (v = [
          ...u.value.filter(s => {
            let { key: p } = s
            return p !== x.key
          }),
          x
        ]),
      d(v),
      o(nl(v), v)
  }
  const m = x => pa(t.value, x, u.value, f, l.value, a.value, r.value),
    w = k(() => nl(u.value))
  return [m, u, c, w]
}
function ol(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? Object(arguments[t]) : {},
      o = Object.keys(n)
    typeof Object.getOwnPropertySymbols == 'function' &&
      (o = o.concat(
        Object.getOwnPropertySymbols(n).filter(function(l) {
          return Object.getOwnPropertyDescriptor(n, l).enumerable
        })
      )),
      o.forEach(function(l) {
        Od(e, l, n[l])
      })
  }
  return e
}
function Od(e, t, n) {
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
var vo = function(t, n) {
  var o = ol({}, t, n.attrs)
  return g(ot, ol({}, o, { icon: Wr }), null)
}
vo.displayName = 'FilterFilled'
vo.inheritAttrs = !1
const Pd = vo,
  Ed = e => {
    const { keyCode: t } = e
    t === bt.ENTER && e.stopPropagation()
  },
  Id = (e, t) => {
    let { slots: n } = t
    var o
    return g('div', { onClick: l => l.stopPropagation(), onKeydown: Ed }, [
      (o = n.default) === null || o === void 0 ? void 0 : o.call(n)
    ])
  },
  Kd = Id,
  ll = pe({
    compatConfig: { MODE: 3 },
    name: 'FilterSearch',
    inheritAttrs: !1,
    props: {
      value: Ye(),
      onChange: $e(),
      filterSearch: qe([Boolean, Function]),
      tablePrefixCls: Ye(),
      locale: st()
    },
    setup(e) {
      return () => {
        const {
          value: t,
          onChange: n,
          filterSearch: o,
          tablePrefixCls: l,
          locale: a
        } = e
        return o
          ? g('div', { class: `${l}-filter-dropdown-search` }, [
              g(
                Fe,
                {
                  placeholder: a.filterSearchPlaceholder,
                  onChange: n,
                  value: t,
                  htmlSize: 1,
                  class: `${l}-filter-dropdown-search-input`
                },
                { prefix: () => g(Tl, null, null) }
              )
            ])
          : null
      }
    }
  })
var al =
  (globalThis && globalThis.__rest) ||
  function(e, t) {
    var n = {}
    for (var o in e)
      Object.prototype.hasOwnProperty.call(e, o) &&
        t.indexOf(o) < 0 &&
        (n[o] = e[o])
    if (e != null && typeof Object.getOwnPropertySymbols == 'function')
      for (var l = 0, o = Object.getOwnPropertySymbols(e); l < o.length; l++)
        t.indexOf(o[l]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(e, o[l]) &&
          (n[o[l]] = e[o[l]])
    return n
  }
const Td = pe({
  compatConfig: { MODE: 3 },
  name: 'MotionTreeNode',
  inheritAttrs: !1,
  props: b(b({}, Hl), {
    active: Boolean,
    motion: Object,
    motionNodes: { type: Array },
    onMotionStart: Function,
    onMotionEnd: Function,
    motionType: String
  }),
  setup(e, t) {
    let { attrs: n, slots: o } = t
    const l = te(!0),
      a = no(),
      r = te(!1),
      i = k(() => (e.motion ? e.motion : Tr())),
      d = (u, c) => {
        var f, m, w, x
        c === 'appear'
          ? (m =
              (f = i.value) === null || f === void 0
                ? void 0
                : f.onAfterEnter) === null ||
            m === void 0 ||
            m.call(f, u)
          : c === 'leave' &&
            ((x =
              (w = i.value) === null || w === void 0
                ? void 0
                : w.onAfterLeave) === null ||
              x === void 0 ||
              x.call(w, u)),
          r.value || e.onMotionEnd(),
          (r.value = !0)
      }
    return (
      Ee(
        () => e.motionNodes,
        () => {
          e.motionNodes &&
            e.motionType === 'hide' &&
            l.value &&
            et(() => {
              l.value = !1
            })
        },
        { immediate: !0, flush: 'post' }
      ),
      tt(() => {
        e.motionNodes && e.onMotionStart()
      }),
      ht(() => {
        e.motionNodes && d()
      }),
      () => {
        const {
            motion: u,
            motionNodes: c,
            motionType: f,
            active: m,
            eventKey: w
          } = e,
          x = al(e, [
            'motion',
            'motionNodes',
            'motionType',
            'active',
            'eventKey'
          ])
        return c
          ? g(
              za,
              L(
                L({}, i.value),
                {},
                {
                  appear: f === 'show',
                  onAfterAppear: v => d(v, 'appear'),
                  onAfterLeave: v => d(v, 'leave')
                }
              ),
              {
                default: () => [
                  Aa(
                    g(
                      'div',
                      { class: `${a.value.prefixCls}-treenode-motion` },
                      [
                        c.map(v => {
                          const s = al(v.data, []),
                            { title: p, key: $, isStart: h, isEnd: O } = v
                          return (
                            delete s.children,
                            g(
                              Kn,
                              L(
                                L({}, s),
                                {},
                                {
                                  title: p,
                                  active: m,
                                  data: v.data,
                                  key: $,
                                  eventKey: $,
                                  isStart: h,
                                  isEnd: O
                                }
                              ),
                              o
                            )
                          )
                        })
                      ]
                    ),
                    [[Fa, l.value]]
                  )
                ]
              }
            )
          : g(
              Kn,
              L(
                L({ class: n.class, style: n.style }, x),
                {},
                { active: m, eventKey: w }
              ),
              o
            )
      }
    )
  }
})
function _d() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [],
    t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : []
  const n = e.length,
    o = t.length
  if (Math.abs(n - o) !== 1) return { add: !1, key: null }
  function l(a, r) {
    const i = new Map()
    a.forEach(u => {
      i.set(u, !0)
    })
    const d = r.filter(u => !i.has(u))
    return d.length === 1 ? d[0] : null
  }
  return n < o ? { add: !0, key: l(e, t) } : { add: !1, key: l(t, e) }
}
function rl(e, t, n) {
  const o = e.findIndex(r => r.key === n),
    l = e[o + 1],
    a = t.findIndex(r => r.key === n)
  if (l) {
    const r = t.findIndex(i => i.key === l.key)
    return t.slice(a + 1, r)
  }
  return t.slice(a + 1)
}
var il =
  (globalThis && globalThis.__rest) ||
  function(e, t) {
    var n = {}
    for (var o in e)
      Object.prototype.hasOwnProperty.call(e, o) &&
        t.indexOf(o) < 0 &&
        (n[o] = e[o])
    if (e != null && typeof Object.getOwnPropertySymbols == 'function')
      for (var l = 0, o = Object.getOwnPropertySymbols(e); l < o.length; l++)
        t.indexOf(o[l]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(e, o[l]) &&
          (n[o[l]] = e[o[l]])
    return n
  }
const sl = {
    width: 0,
    height: 0,
    display: 'flex',
    overflow: 'hidden',
    opacity: 0,
    border: 0,
    padding: 0,
    margin: 0
  },
  Dd = () => {},
  Tt = `RC_TREE_MOTION_${Math.random()}`,
  Vn = { key: Tt },
  ma = { key: Tt, level: 0, index: 0, pos: '0', node: Vn, nodes: [Vn] },
  dl = {
    parent: null,
    children: [],
    pos: ma.pos,
    data: Vn,
    title: null,
    key: Tt,
    isStart: [],
    isEnd: []
  }
function cl(e, t, n, o) {
  return t === !1 || !n ? e : e.slice(0, Math.ceil(n / o) + 1)
}
function ul(e) {
  const { key: t, pos: n } = e
  return Gt(t, n)
}
function Rd(e) {
  let t = String(e.key),
    n = e
  for (; n.parent; ) (n = n.parent), (t = `${n.key} > ${t}`)
  return t
}
const Nd = pe({
  compatConfig: { MODE: 3 },
  name: 'NodeList',
  inheritAttrs: !1,
  props: Mi,
  setup(e, t) {
    let { expose: n, attrs: o } = t
    const l = ce(),
      a = ce(),
      { expandedKeys: r, flattenNodes: i } = jl()
    n({
      scrollTo: v => {
        l.value.scrollTo(v)
      },
      getIndentWidth: () => a.value.offsetWidth
    })
    const d = te(i.value),
      u = te([]),
      c = ce(null)
    function f() {
      ;(d.value = i.value),
        (u.value = []),
        (c.value = null),
        e.onListChangeEnd()
    }
    const m = no()
    Ee([() => r.value.slice(), i], (v, s) => {
      let [p, $] = v,
        [h, O] = s
      const C = _d(h, p)
      if (C.key !== null) {
        const { virtual: K, height: S, itemHeight: I } = e
        if (C.add) {
          const y = O.findIndex(F => {
              let { key: T } = F
              return T === C.key
            }),
            E = cl(rl(O, $, C.key), K, S, I),
            _ = O.slice()
          _.splice(y + 1, 0, dl),
            (d.value = _),
            (u.value = E),
            (c.value = 'show')
        } else {
          const y = $.findIndex(F => {
              let { key: T } = F
              return T === C.key
            }),
            E = cl(rl($, O, C.key), K, S, I),
            _ = $.slice()
          _.splice(y + 1, 0, dl),
            (d.value = _),
            (u.value = E),
            (c.value = 'hide')
        }
      } else O !== $ && (d.value = $)
    }),
      Ee(
        () => m.value.dragging,
        v => {
          v || f()
        }
      )
    const w = k(() => (e.motion === void 0 ? d.value : i.value)),
      x = () => {
        e.onActiveChange(null)
      }
    return () => {
      const v = b(b({}, e), o),
        {
          prefixCls: s,
          selectable: p,
          checkable: $,
          disabled: h,
          motion: O,
          height: C,
          itemHeight: K,
          virtual: S,
          focusable: I,
          activeItem: y,
          focused: E,
          tabindex: _,
          onKeydown: F,
          onFocus: T,
          onBlur: M,
          onListChangeStart: X,
          onListChangeEnd: q
        } = v,
        ae = il(v, [
          'prefixCls',
          'selectable',
          'checkable',
          'disabled',
          'motion',
          'height',
          'itemHeight',
          'virtual',
          'focusable',
          'activeItem',
          'focused',
          'tabindex',
          'onKeydown',
          'onFocus',
          'onBlur',
          'onListChangeStart',
          'onListChangeEnd'
        ])
      return g(dt, null, [
        E && y && g('span', { style: sl, 'aria-live': 'assertive' }, [Rd(y)]),
        g('div', null, [
          g(
            'input',
            {
              style: sl,
              disabled: I === !1 || h,
              tabindex: I !== !1 ? _ : null,
              onKeydown: F,
              onFocus: T,
              onBlur: M,
              value: '',
              onChange: Dd,
              'aria-label': 'for screen reader'
            },
            null
          )
        ]),
        g(
          'div',
          {
            class: `${s}-treenode`,
            'aria-hidden': !0,
            style: {
              position: 'absolute',
              pointerEvents: 'none',
              visibility: 'hidden',
              height: 0,
              overflow: 'hidden'
            }
          },
          [
            g('div', { class: `${s}-indent` }, [
              g('div', { ref: a, class: `${s}-indent-unit` }, null)
            ])
          ]
        ),
        g(
          Nr,
          L(
            L({}, nt(ae, ['onActiveChange'])),
            {},
            {
              data: w.value,
              itemKey: ul,
              height: C,
              fullHeight: !1,
              virtual: S,
              itemHeight: K,
              prefixCls: `${s}-list`,
              ref: l,
              onVisibleChange: (H, U) => {
                const j = new Set(H)
                U.filter(B => !j.has(B)).some(B => ul(B) === Tt) && f()
              }
            }
          ),
          {
            default: H => {
              const { pos: U } = H,
                j = il(H.data, []),
                { title: Z, key: B, isStart: V, isEnd: W } = H,
                ne = Gt(B, U)
              return (
                delete j.key,
                delete j.children,
                g(
                  Td,
                  L(
                    L({}, j),
                    {},
                    {
                      eventKey: ne,
                      title: Z,
                      active: !!y && B === y.key,
                      data: H.data,
                      isStart: V,
                      isEnd: W,
                      motion: O,
                      motionNodes: B === Tt ? u.value : null,
                      motionType: c.value,
                      onMotionStart: X,
                      onMotionEnd: f,
                      onMousemove: x
                    }
                  ),
                  null
                )
              )
            }
          }
        )
      ])
    }
  }
})
function Bd(e) {
  let { dropPosition: t, dropLevelOffset: n, indent: o } = e
  const l = {
    pointerEvents: 'none',
    position: 'absolute',
    right: 0,
    backgroundColor: 'red',
    height: '2px'
  }
  switch (t) {
    case -1:
      ;(l.top = 0), (l.left = `${-n * o}px`)
      break
    case 1:
      ;(l.bottom = 0), (l.left = `${-n * o}px`)
      break
    case 0:
      ;(l.bottom = 0), (l.left = `${o}`)
      break
  }
  return g('div', { style: l }, null)
}
const Ad = 10,
  Fd = pe({
    compatConfig: { MODE: 3 },
    name: 'Tree',
    inheritAttrs: !1,
    props: St(Wl(), {
      prefixCls: 'vc-tree',
      showLine: !1,
      showIcon: !0,
      selectable: !0,
      multiple: !1,
      checkable: !1,
      disabled: !1,
      checkStrictly: !1,
      draggable: !1,
      expandAction: !1,
      defaultExpandParent: !0,
      autoExpandParent: !1,
      defaultExpandAll: !1,
      defaultExpandedKeys: [],
      defaultCheckedKeys: [],
      defaultSelectedKeys: [],
      dropIndicatorRender: Bd,
      allowDrop: () => !0
    }),
    setup(e, t) {
      let { attrs: n, slots: o, expose: l } = t
      const a = te(!1)
      let r = {}
      const i = te(),
        d = te([]),
        u = te([]),
        c = te([]),
        f = te([]),
        m = te([]),
        w = te([]),
        x = {},
        v = Ct({
          draggingNodeKey: null,
          dragChildrenKeys: [],
          dropTargetKey: null,
          dropPosition: null,
          dropContainerKey: null,
          dropLevelOffset: null,
          dropTargetPos: null,
          dropAllowed: !0,
          dragOverNodeKey: null
        }),
        s = te([])
      Ee(
        [() => e.treeData, () => e.children],
        () => {
          s.value =
            e.treeData !== void 0 ? e.treeData.slice() : _n(Co(e.children))
        },
        { immediate: !0, deep: !0 }
      )
      const p = te({}),
        $ = te(!1),
        h = te(null),
        O = te(!1),
        C = k(() => sn(e.fieldNames)),
        K = te()
      let S = null,
        I = null,
        y = null
      const E = k(() => ({
          expandedKeysSet: _.value,
          selectedKeysSet: F.value,
          loadedKeysSet: T.value,
          loadingKeysSet: M.value,
          checkedKeysSet: X.value,
          halfCheckedKeysSet: q.value,
          dragOverNodeKey: v.dragOverNodeKey,
          dropPosition: v.dropPosition,
          keyEntities: p.value
        })),
        _ = k(() => new Set(w.value)),
        F = k(() => new Set(d.value)),
        T = k(() => new Set(f.value)),
        M = k(() => new Set(m.value)),
        X = k(() => new Set(u.value)),
        q = k(() => new Set(c.value))
      Ne(() => {
        if (s.value) {
          const N = lo(s.value, { fieldNames: C.value })
          p.value = b({ [Tt]: ma }, N.keyEntities)
        }
      })
      let ae = !1
      Ee(
        [() => e.expandedKeys, () => e.autoExpandParent, p],
        (N, A) => {
          let [z, G] = N,
            [le, ie] = A,
            J = w.value
          if (e.expandedKeys !== void 0 || (ae && G !== ie))
            J =
              e.autoExpandParent || (!ae && e.defaultExpandParent)
                ? Tn(e.expandedKeys, p.value)
                : e.expandedKeys
          else if (!ae && e.defaultExpandAll) {
            const xe = b({}, p.value)
            delete xe[Tt], (J = Object.keys(xe).map(ke => xe[ke].key))
          } else
            !ae &&
              e.defaultExpandedKeys &&
              (J =
                e.autoExpandParent || e.defaultExpandParent
                  ? Tn(e.defaultExpandedKeys, p.value)
                  : e.defaultExpandedKeys)
          J && (w.value = J), (ae = !0)
        },
        { immediate: !0 }
      )
      const H = te([])
      Ne(() => {
        H.value = Ui(s.value, w.value, C.value)
      }),
        Ne(() => {
          e.selectable &&
            (e.selectedKeys !== void 0
              ? (d.value = jo(e.selectedKeys, e))
              : !ae &&
                e.defaultSelectedKeys &&
                (d.value = jo(e.defaultSelectedKeys, e)))
        })
      const { maxLevel: U, levelEntities: j } = Xl(p)
      Ne(() => {
        if (e.checkable) {
          let N
          if (
            (e.checkedKeys !== void 0
              ? (N = yn(e.checkedKeys) || {})
              : !ae && e.defaultCheckedKeys
              ? (N = yn(e.defaultCheckedKeys) || {})
              : s.value &&
                (N = yn(e.checkedKeys) || {
                  checkedKeys: u.value,
                  halfCheckedKeys: c.value
                }),
            N)
          ) {
            let { checkedKeys: A = [], halfCheckedKeys: z = [] } = N
            e.checkStrictly ||
              ({ checkedKeys: A, halfCheckedKeys: z } = _t(
                A,
                !0,
                p.value,
                U.value,
                j.value
              )),
              (u.value = A),
              (c.value = z)
          }
        }
      }),
        Ne(() => {
          e.loadedKeys && (f.value = e.loadedKeys)
        })
      const Z = () => {
          b(v, {
            dragOverNodeKey: null,
            dropPosition: null,
            dropLevelOffset: null,
            dropTargetKey: null,
            dropContainerKey: null,
            dropTargetPos: null,
            dropAllowed: !1
          })
        },
        B = N => {
          K.value.scrollTo(N)
        }
      Ee(
        () => e.activeKey,
        () => {
          e.activeKey !== void 0 && (h.value = e.activeKey)
        },
        { immediate: !0 }
      ),
        Ee(
          h,
          N => {
            et(() => {
              N !== null && B({ key: N })
            })
          },
          { immediate: !0, flush: 'post' }
        )
      const V = N => {
          e.expandedKeys === void 0 && (w.value = N)
        },
        W = () => {
          v.draggingNodeKey !== null &&
            b(v, {
              draggingNodeKey: null,
              dropPosition: null,
              dropContainerKey: null,
              dropTargetKey: null,
              dropLevelOffset: null,
              dropAllowed: !0,
              dragOverNodeKey: null
            }),
            (S = null),
            (y = null)
        },
        ne = (N, A) => {
          const { onDragend: z } = e
          ;(v.dragOverNodeKey = null),
            W(),
            z == null || z({ event: N, node: A.eventData }),
            (I = null)
        },
        Q = N => {
          ne(N, null), window.removeEventListener('dragend', Q)
        },
        Pe = (N, A) => {
          const { onDragstart: z } = e,
            { eventKey: G, eventData: le } = A
          ;(I = A), (S = { x: N.clientX, y: N.clientY })
          const ie = it(w.value, G)
          ;(v.draggingNodeKey = G),
            (v.dragChildrenKeys = Wi(G, p.value)),
            (i.value = K.value.getIndentWidth()),
            V(ie),
            window.addEventListener('dragend', Q),
            z && z({ event: N, node: le })
        },
        ue = (N, A) => {
          const {
              onDragenter: z,
              onExpand: G,
              allowDrop: le,
              direction: ie
            } = e,
            { pos: J, eventKey: xe } = A
          if ((y !== xe && (y = xe), !I)) {
            Z()
            return
          }
          const {
            dropPosition: ke,
            dropLevelOffset: ye,
            dropTargetKey: Ce,
            dropContainerKey: Se,
            dropTargetPos: Ae,
            dropAllowed: Me,
            dragOverNodeKey: je
          } = Lo(N, I, A, i.value, S, le, H.value, p.value, _.value, ie)
          if (v.dragChildrenKeys.indexOf(Ce) !== -1 || !Me) {
            Z()
            return
          }
          if (
            (r || (r = {}),
            Object.keys(r).forEach(Be => {
              clearTimeout(r[Be])
            }),
            I.eventKey !== A.eventKey &&
              (r[J] = window.setTimeout(() => {
                if (v.draggingNodeKey === null) return
                let Be = w.value.slice()
                const lt = p.value[A.eventKey]
                lt &&
                  (lt.children || []).length &&
                  (Be = ft(w.value, A.eventKey)),
                  V(Be),
                  G &&
                    G(Be, { node: A.eventData, expanded: !0, nativeEvent: N })
              }, 800)),
            I.eventKey === Ce && ye === 0)
          ) {
            Z()
            return
          }
          b(v, {
            dragOverNodeKey: je,
            dropPosition: ke,
            dropLevelOffset: ye,
            dropTargetKey: Ce,
            dropContainerKey: Se,
            dropTargetPos: Ae,
            dropAllowed: Me
          }),
            z && z({ event: N, node: A.eventData, expandedKeys: w.value })
        },
        Ie = (N, A) => {
          const { onDragover: z, allowDrop: G, direction: le } = e
          if (!I) return
          const {
            dropPosition: ie,
            dropLevelOffset: J,
            dropTargetKey: xe,
            dropContainerKey: ke,
            dropAllowed: ye,
            dropTargetPos: Ce,
            dragOverNodeKey: Se
          } = Lo(N, I, A, i.value, S, G, H.value, p.value, _.value, le)
          v.dragChildrenKeys.indexOf(xe) !== -1 ||
            !ye ||
            (I.eventKey === xe && J === 0
              ? (v.dropPosition === null &&
                  v.dropLevelOffset === null &&
                  v.dropTargetKey === null &&
                  v.dropContainerKey === null &&
                  v.dropTargetPos === null &&
                  v.dropAllowed === !1 &&
                  v.dragOverNodeKey === null) ||
                Z()
              : (ie === v.dropPosition &&
                  J === v.dropLevelOffset &&
                  xe === v.dropTargetKey &&
                  ke === v.dropContainerKey &&
                  Ce === v.dropTargetPos &&
                  ye === v.dropAllowed &&
                  Se === v.dragOverNodeKey) ||
                b(v, {
                  dropPosition: ie,
                  dropLevelOffset: J,
                  dropTargetKey: xe,
                  dropContainerKey: ke,
                  dropTargetPos: Ce,
                  dropAllowed: ye,
                  dragOverNodeKey: Se
                }),
            z && z({ event: N, node: A.eventData }))
        },
        ge = (N, A) => {
          y === A.eventKey &&
            !N.currentTarget.contains(N.relatedTarget) &&
            (Z(), (y = null))
          const { onDragleave: z } = e
          z && z({ event: N, node: A.eventData })
        },
        Te = function(N, A) {
          let z =
            arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1
          var G
          const {
            dragChildrenKeys: le,
            dropPosition: ie,
            dropTargetKey: J,
            dropTargetPos: xe,
            dropAllowed: ke
          } = v
          if (!ke) return
          const { onDrop: ye } = e
          if (((v.dragOverNodeKey = null), W(), J === null)) return
          const Ce = b(b({}, Qt(J, Co(E.value))), {
            active:
              ((G = R.value) === null || G === void 0 ? void 0 : G.key) === J,
            data: p.value[J].node
          })
          le.indexOf(J)
          const Se = oo(xe),
            Ae = {
              event: N,
              node: en(Ce),
              dragNode: I ? I.eventData : null,
              dragNodesKeys: [I.eventKey].concat(le),
              dropToGap: ie !== 0,
              dropPosition: ie + Number(Se[Se.length - 1])
            }
          z || ye == null || ye(Ae), (I = null)
        },
        De = (N, A) => {
          const { expanded: z, key: G } = A,
            le = H.value.filter(J => J.key === G)[0],
            ie = en(b(b({}, Qt(G, E.value)), { data: le.data }))
          V(z ? it(w.value, G) : ft(w.value, G)), he(N, ie)
        },
        Ve = (N, A) => {
          const { onClick: z, expandAction: G } = e
          G === 'click' && De(N, A), z && z(N, A)
        },
        _e = (N, A) => {
          const { onDblclick: z, expandAction: G } = e
          ;(G === 'doubleclick' || G === 'dblclick') && De(N, A), z && z(N, A)
        },
        Re = (N, A) => {
          let z = d.value
          const { onSelect: G, multiple: le } = e,
            { selected: ie } = A,
            J = A[C.value.key],
            xe = !ie
          xe ? (le ? (z = ft(z, J)) : (z = [J])) : (z = it(z, J))
          const ke = p.value,
            ye = z
              .map(Ce => {
                const Se = ke[Ce]
                return Se ? Se.node : null
              })
              .filter(Ce => Ce)
          e.selectedKeys === void 0 && (d.value = z),
            G &&
              G(z, {
                event: 'select',
                selected: xe,
                node: A,
                selectedNodes: ye,
                nativeEvent: N
              })
        },
        Y = (N, A, z) => {
          const { checkStrictly: G, onCheck: le } = e,
            ie = A[C.value.key]
          let J
          const xe = { event: 'check', node: A, checked: z, nativeEvent: N },
            ke = p.value
          if (G) {
            const ye = z ? ft(u.value, ie) : it(u.value, ie),
              Ce = it(c.value, ie)
            ;(J = { checked: ye, halfChecked: Ce }),
              (xe.checkedNodes = ye
                .map(Se => ke[Se])
                .filter(Se => Se)
                .map(Se => Se.node)),
              e.checkedKeys === void 0 && (u.value = ye)
          } else {
            let { checkedKeys: ye, halfCheckedKeys: Ce } = _t(
              [...u.value, ie],
              !0,
              ke,
              U.value,
              j.value
            )
            if (!z) {
              const Se = new Set(ye)
              Se.delete(ie),
                ({ checkedKeys: ye, halfCheckedKeys: Ce } = _t(
                  Array.from(Se),
                  { checked: !1, halfCheckedKeys: Ce },
                  ke,
                  U.value,
                  j.value
                ))
            }
            ;(J = ye),
              (xe.checkedNodes = []),
              (xe.checkedNodesPositions = []),
              (xe.halfCheckedKeys = Ce),
              ye.forEach(Se => {
                const Ae = ke[Se]
                if (!Ae) return
                const { node: Me, pos: je } = Ae
                xe.checkedNodes.push(Me),
                  xe.checkedNodesPositions.push({ node: Me, pos: je })
              }),
              e.checkedKeys === void 0 && ((u.value = ye), (c.value = Ce))
          }
          le && le(J, xe)
        },
        ve = N => {
          const A = N[C.value.key],
            z = new Promise((G, le) => {
              const { loadData: ie, onLoad: J } = e
              if (!ie || T.value.has(A) || M.value.has(A)) return null
              ie(N)
                .then(() => {
                  const ke = ft(f.value, A),
                    ye = it(m.value, A)
                  J && J(ke, { event: 'load', node: N }),
                    e.loadedKeys === void 0 && (f.value = ke),
                    (m.value = ye),
                    G()
                })
                .catch(ke => {
                  const ye = it(m.value, A)
                  if (((m.value = ye), (x[A] = (x[A] || 0) + 1), x[A] >= Ad)) {
                    const Ce = ft(f.value, A)
                    e.loadedKeys === void 0 && (f.value = Ce), G()
                  }
                  le(ke)
                }),
                (m.value = ft(m.value, A))
            })
          return z.catch(() => {}), z
        },
        ee = (N, A) => {
          const { onMouseenter: z } = e
          z && z({ event: N, node: A })
        },
        se = (N, A) => {
          const { onMouseleave: z } = e
          z && z({ event: N, node: A })
        },
        fe = (N, A) => {
          const { onRightClick: z } = e
          z && (N.preventDefault(), z({ event: N, node: A }))
        },
        Oe = N => {
          const { onFocus: A } = e
          ;($.value = !0), A && A(N)
        },
        de = N => {
          const { onBlur: A } = e
          ;($.value = !1), P(null), A && A(N)
        },
        he = (N, A) => {
          let z = w.value
          const { onExpand: G, loadData: le } = e,
            { expanded: ie } = A,
            J = A[C.value.key]
          if (O.value) return
          z.indexOf(J)
          const xe = !ie
          if (
            (xe ? (z = ft(z, J)) : (z = it(z, J)),
            V(z),
            G && G(z, { node: A, expanded: xe, nativeEvent: N }),
            xe && le)
          ) {
            const ke = ve(A)
            ke &&
              ke
                .then(() => {})
                .catch(ye => {
                  const Ce = it(w.value, J)
                  V(Ce), Promise.reject(ye)
                })
          }
        },
        Ke = () => {
          O.value = !0
        },
        D = () => {
          setTimeout(() => {
            O.value = !1
          })
        },
        P = N => {
          const { onActiveChange: A } = e
          h.value !== N &&
            (e.activeKey !== void 0 && (h.value = N),
            N !== null && B({ key: N }),
            A && A(N))
        },
        R = k(() =>
          h.value === null
            ? null
            : H.value.find(N => {
                let { key: A } = N
                return A === h.value
              }) || null
        ),
        oe = N => {
          let A = H.value.findIndex(G => {
            let { key: le } = G
            return le === h.value
          })
          A === -1 && N < 0 && (A = H.value.length),
            (A = (A + N + H.value.length) % H.value.length)
          const z = H.value[A]
          if (z) {
            const { key: G } = z
            P(G)
          } else P(null)
        },
        me = k(() =>
          en(b(b({}, Qt(h.value, E.value)), { data: R.value.data, active: !0 }))
        ),
        we = N => {
          const { onKeydown: A, checkable: z, selectable: G } = e
          switch (N.which) {
            case bt.UP: {
              oe(-1), N.preventDefault()
              break
            }
            case bt.DOWN: {
              oe(1), N.preventDefault()
              break
            }
          }
          const le = R.value
          if (le && le.data) {
            const ie =
                le.data.isLeaf === !1 || !!(le.data.children || []).length,
              J = me.value
            switch (N.which) {
              case bt.LEFT: {
                ie && _.value.has(h.value)
                  ? he({}, J)
                  : le.parent && P(le.parent.key),
                  N.preventDefault()
                break
              }
              case bt.RIGHT: {
                ie && !_.value.has(h.value)
                  ? he({}, J)
                  : le.children && le.children.length && P(le.children[0].key),
                  N.preventDefault()
                break
              }
              case bt.ENTER:
              case bt.SPACE: {
                z && !J.disabled && J.checkable !== !1 && !J.disableCheckbox
                  ? Y({}, J, !X.value.has(h.value))
                  : !z && G && !J.disabled && J.selectable !== !1 && Re({}, J)
                break
              }
            }
          }
          A && A(N)
        }
      return (
        l({
          onNodeExpand: he,
          scrollTo: B,
          onKeydown: we,
          selectedKeys: k(() => d.value),
          checkedKeys: k(() => u.value),
          halfCheckedKeys: k(() => c.value),
          loadedKeys: k(() => f.value),
          loadingKeys: k(() => m.value),
          expandedKeys: k(() => w.value)
        }),
        $l(() => {
          window.removeEventListener('dragend', Q), (a.value = !0)
        }),
        Ai({
          expandedKeys: w,
          selectedKeys: d,
          loadedKeys: f,
          loadingKeys: m,
          checkedKeys: u,
          halfCheckedKeys: c,
          expandedKeysSet: _,
          selectedKeysSet: F,
          loadedKeysSet: T,
          loadingKeysSet: M,
          checkedKeysSet: X,
          halfCheckedKeysSet: q,
          flattenNodes: H
        }),
        () => {
          const {
              draggingNodeKey: N,
              dropLevelOffset: A,
              dropContainerKey: z,
              dropTargetKey: G,
              dropPosition: le,
              dragOverNodeKey: ie
            } = v,
            {
              prefixCls: J,
              showLine: xe,
              focusable: ke,
              tabindex: ye = 0,
              selectable: Ce,
              showIcon: Se,
              icon: Ae = o.icon,
              switcherIcon: Me,
              draggable: je,
              checkable: Be,
              checkStrictly: lt,
              disabled: gt,
              motion: wt,
              loadData: Ut,
              filterTreeNode: yt,
              height: fn,
              itemHeight: qt,
              virtual: Nt,
              dropIndicatorRender: ka,
              onContextmenu: Oa,
              onScroll: Pa,
              direction: Ea,
              rootClassName: Ia,
              rootStyle: Ka
            } = e,
            { class: Ta, style: _a } = n,
            Da = to(b(b({}, e), n), { aria: !0, data: !0 })
          let Bt
          return (
            je
              ? typeof je == 'object'
                ? (Bt = je)
                : typeof je == 'function'
                ? (Bt = { nodeDraggable: je })
                : (Bt = {})
              : (Bt = !1),
            g(
              Bi,
              {
                value: {
                  prefixCls: J,
                  selectable: Ce,
                  showIcon: Se,
                  icon: Ae,
                  switcherIcon: Me,
                  draggable: Bt,
                  draggingNodeKey: N,
                  checkable: Be,
                  customCheckable: o.checkable,
                  checkStrictly: lt,
                  disabled: gt,
                  keyEntities: p.value,
                  dropLevelOffset: A,
                  dropContainerKey: z,
                  dropTargetKey: G,
                  dropPosition: le,
                  dragOverNodeKey: ie,
                  dragging: N !== null,
                  indent: i.value,
                  direction: Ea,
                  dropIndicatorRender: ka,
                  loadData: Ut,
                  filterTreeNode: yt,
                  onNodeClick: Ve,
                  onNodeDoubleClick: _e,
                  onNodeExpand: he,
                  onNodeSelect: Re,
                  onNodeCheck: Y,
                  onNodeLoad: ve,
                  onNodeMouseEnter: ee,
                  onNodeMouseLeave: se,
                  onNodeContextMenu: fe,
                  onNodeDragStart: Pe,
                  onNodeDragEnter: ue,
                  onNodeDragOver: Ie,
                  onNodeDragLeave: ge,
                  onNodeDragEnd: ne,
                  onNodeDrop: Te,
                  slots: o
                }
              },
              {
                default: () => [
                  g(
                    'div',
                    {
                      role: 'tree',
                      class: re(J, Ta, Ia, {
                        [`${J}-show-line`]: xe,
                        [`${J}-focused`]: $.value,
                        [`${J}-active-focused`]: h.value !== null
                      }),
                      style: Ka
                    },
                    [
                      g(
                        Nd,
                        L(
                          {
                            ref: K,
                            prefixCls: J,
                            style: _a,
                            disabled: gt,
                            selectable: Ce,
                            checkable: !!Be,
                            motion: wt,
                            height: fn,
                            itemHeight: qt,
                            virtual: Nt,
                            focusable: ke,
                            focused: $.value,
                            tabindex: ye,
                            activeItem: R.value,
                            onFocus: Oe,
                            onBlur: de,
                            onKeydown: we,
                            onActiveChange: P,
                            onListChangeStart: Ke,
                            onListChangeEnd: D,
                            onContextmenu: Oa,
                            onScroll: Pa
                          },
                          Da
                        ),
                        null
                      )
                    ]
                  )
                ]
              }
            )
          )
        }
      )
    }
  })
function fl(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? Object(arguments[t]) : {},
      o = Object.keys(n)
    typeof Object.getOwnPropertySymbols == 'function' &&
      (o = o.concat(
        Object.getOwnPropertySymbols(n).filter(function(l) {
          return Object.getOwnPropertyDescriptor(n, l).enumerable
        })
      )),
      o.forEach(function(l) {
        zd(e, l, n[l])
      })
  }
  return e
}
function zd(e, t, n) {
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
var po = function(t, n) {
  var o = fl({}, t, n.attrs)
  return g(ot, fl({}, o, { icon: Vr }), null)
}
po.displayName = 'FileOutlined'
po.inheritAttrs = !1
const ha = po
function vl(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? Object(arguments[t]) : {},
      o = Object.keys(n)
    typeof Object.getOwnPropertySymbols == 'function' &&
      (o = o.concat(
        Object.getOwnPropertySymbols(n).filter(function(l) {
          return Object.getOwnPropertyDescriptor(n, l).enumerable
        })
      )),
      o.forEach(function(l) {
        Md(e, l, n[l])
      })
  }
  return e
}
function Md(e, t, n) {
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
var mo = function(t, n) {
  var o = vl({}, t, n.attrs)
  return g(ot, vl({}, o, { icon: Gr }), null)
}
mo.displayName = 'MinusSquareOutlined'
mo.inheritAttrs = !1
const Ld = mo
function pl(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? Object(arguments[t]) : {},
      o = Object.keys(n)
    typeof Object.getOwnPropertySymbols == 'function' &&
      (o = o.concat(
        Object.getOwnPropertySymbols(n).filter(function(l) {
          return Object.getOwnPropertyDescriptor(n, l).enumerable
        })
      )),
      o.forEach(function(l) {
        jd(e, l, n[l])
      })
  }
  return e
}
function jd(e, t, n) {
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
var ho = function(t, n) {
  var o = pl({}, t, n.attrs)
  return g(ot, pl({}, o, { icon: Xr }), null)
}
ho.displayName = 'PlusSquareOutlined'
ho.inheritAttrs = !1
const Hd = ho
function ml(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? Object(arguments[t]) : {},
      o = Object.keys(n)
    typeof Object.getOwnPropertySymbols == 'function' &&
      (o = o.concat(
        Object.getOwnPropertySymbols(n).filter(function(l) {
          return Object.getOwnPropertyDescriptor(n, l).enumerable
        })
      )),
      o.forEach(function(l) {
        Wd(e, l, n[l])
      })
  }
  return e
}
function Wd(e, t, n) {
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
var go = function(t, n) {
  var o = ml({}, t, n.attrs)
  return g(ot, ml({}, o, { icon: Ur }), null)
}
go.displayName = 'CaretDownFilled'
go.inheritAttrs = !1
const Vd = go
function Gd(e, t, n, o, l) {
  const { isLeaf: a, expanded: r, loading: i } = n
  let d = t
  if (i) return g(Ua, { class: `${e}-switcher-loading-icon` }, null)
  let u
  l && typeof l == 'object' && (u = l.showLeafIcon)
  let c = null
  const f = `${e}-switcher-icon`
  return a
    ? l
      ? u && o
        ? o(n)
        : (typeof l == 'object' && !u
            ? (c = g('span', { class: `${e}-switcher-leaf-line` }, null))
            : (c = g(ha, { class: `${e}-switcher-line-icon` }, null)),
          c)
      : null
    : ((c = g(Vd, { class: f }, null)),
      l &&
        (c = r
          ? g(Ld, { class: `${e}-switcher-line-icon` }, null)
          : g(Hd, { class: `${e}-switcher-line-icon` }, null)),
      typeof t == 'function'
        ? (d = t(b(b({}, n), { defaultIcon: c, switcherCls: f })))
        : zt(d) && (d = Ma(d, { class: f })),
      d || c)
}
const hl = 4
function Xd(e) {
  const {
      dropPosition: t,
      dropLevelOffset: n,
      prefixCls: o,
      indent: l,
      direction: a = 'ltr'
    } = e,
    r = a === 'ltr' ? 'left' : 'right',
    i = a === 'ltr' ? 'right' : 'left',
    d = { [r]: `${-n * l + hl}px`, [i]: 0 }
  switch (t) {
    case -1:
      d.top = '-3px'
      break
    case 1:
      d.bottom = '-3px'
      break
    default:
      ;(d.bottom = '-3px'), (d[r] = `${l + hl}px`)
      break
  }
  return g('div', { style: d, class: `${o}-drop-indicator` }, null)
}
const Ud = new Yn('ant-tree-node-fx-do-not-use', {
    '0%': { opacity: 0 },
    '100%': { opacity: 1 }
  }),
  qd = (e, t) => ({
    [`.${e}-switcher-icon`]: {
      display: 'inline-block',
      fontSize: 10,
      verticalAlign: 'baseline',
      svg: { transition: `transform ${t.motionDurationSlow}` }
    }
  }),
  Yd = (e, t) => ({
    [`.${e}-drop-indicator`]: {
      position: 'absolute',
      zIndex: 1,
      height: 2,
      backgroundColor: t.colorPrimary,
      borderRadius: 1,
      pointerEvents: 'none',
      '&:after': {
        position: 'absolute',
        top: -3,
        insetInlineStart: -6,
        width: 8,
        height: 8,
        backgroundColor: 'transparent',
        border: `${t.lineWidthBold}px solid ${t.colorPrimary}`,
        borderRadius: '50%',
        content: '""'
      }
    }
  }),
  Zd = (e, t) => {
    const {
        treeCls: n,
        treeNodeCls: o,
        treeNodePadding: l,
        treeTitleHeight: a
      } = t,
      r = (a - t.fontSizeLG) / 2,
      i = t.paddingXS
    return {
      [n]: b(b({}, ct(t)), {
        background: t.colorBgContainer,
        borderRadius: t.borderRadius,
        transition: `background-color ${t.motionDurationSlow}`,
        [`&${n}-rtl`]: {
          [`${n}-switcher`]: {
            '&_close': {
              [`${n}-switcher-icon`]: { svg: { transform: 'rotate(90deg)' } }
            }
          }
        },
        [`&-focused:not(:hover):not(${n}-active-focused)`]: b({}, Mt(t)),
        [`${n}-list-holder-inner`]: { alignItems: 'flex-start' },
        [`&${n}-block-node`]: {
          [`${n}-list-holder-inner`]: {
            alignItems: 'stretch',
            [`${n}-node-content-wrapper`]: { flex: 'auto' },
            [`${o}.dragging`]: {
              position: 'relative',
              '&:after': {
                position: 'absolute',
                top: 0,
                insetInlineEnd: 0,
                bottom: l,
                insetInlineStart: 0,
                border: `1px solid ${t.colorPrimary}`,
                opacity: 0,
                animationName: Ud,
                animationDuration: t.motionDurationSlow,
                animationPlayState: 'running',
                animationFillMode: 'forwards',
                content: '""',
                pointerEvents: 'none'
              }
            }
          }
        },
        [`${o}`]: {
          display: 'flex',
          alignItems: 'flex-start',
          padding: `0 0 ${l}px 0`,
          outline: 'none',
          '&-rtl': { direction: 'rtl' },
          '&-disabled': {
            [`${n}-node-content-wrapper`]: {
              color: t.colorTextDisabled,
              cursor: 'not-allowed',
              '&:hover': { background: 'transparent' }
            }
          },
          [`&-active ${n}-node-content-wrapper`]: b({}, Mt(t)),
          [`&:not(${o}-disabled).filter-node ${n}-title`]: {
            color: 'inherit',
            fontWeight: 500
          },
          '&-draggable': {
            [`${n}-draggable-icon`]: {
              width: a,
              lineHeight: `${a}px`,
              textAlign: 'center',
              visibility: 'visible',
              opacity: 0.2,
              transition: `opacity ${t.motionDurationSlow}`,
              [`${o}:hover &`]: { opacity: 0.45 }
            },
            [`&${o}-disabled`]: {
              [`${n}-draggable-icon`]: { visibility: 'hidden' }
            }
          }
        },
        [`${n}-indent`]: {
          alignSelf: 'stretch',
          whiteSpace: 'nowrap',
          userSelect: 'none',
          '&-unit': { display: 'inline-block', width: a }
        },
        [`${n}-draggable-icon`]: { visibility: 'hidden' },
        [`${n}-switcher`]: b(b({}, qd(e, t)), {
          position: 'relative',
          flex: 'none',
          alignSelf: 'stretch',
          width: a,
          margin: 0,
          lineHeight: `${a}px`,
          textAlign: 'center',
          cursor: 'pointer',
          userSelect: 'none',
          '&-noop': { cursor: 'default' },
          '&_close': {
            [`${n}-switcher-icon`]: { svg: { transform: 'rotate(-90deg)' } }
          },
          '&-loading-icon': { color: t.colorPrimary },
          '&-leaf-line': {
            position: 'relative',
            zIndex: 1,
            display: 'inline-block',
            width: '100%',
            height: '100%',
            '&:before': {
              position: 'absolute',
              top: 0,
              insetInlineEnd: a / 2,
              bottom: -l,
              marginInlineStart: -1,
              borderInlineEnd: `1px solid ${t.colorBorder}`,
              content: '""'
            },
            '&:after': {
              position: 'absolute',
              width: (a / 2) * 0.8,
              height: a / 2,
              borderBottom: `1px solid ${t.colorBorder}`,
              content: '""'
            }
          }
        }),
        [`${n}-checkbox`]: {
          top: 'initial',
          marginInlineEnd: i,
          marginBlockStart: r
        },
        [`${n}-node-content-wrapper, ${n}-checkbox + span`]: {
          position: 'relative',
          zIndex: 'auto',
          minHeight: a,
          margin: 0,
          padding: `0 ${t.paddingXS / 2}px`,
          color: 'inherit',
          lineHeight: `${a}px`,
          background: 'transparent',
          borderRadius: t.borderRadius,
          cursor: 'pointer',
          transition: `all ${t.motionDurationMid}, border 0s, line-height 0s, box-shadow 0s`,
          '&:hover': { backgroundColor: t.controlItemBgHover },
          [`&${n}-node-selected`]: { backgroundColor: t.controlItemBgActive },
          [`${n}-iconEle`]: {
            display: 'inline-block',
            width: a,
            height: a,
            lineHeight: `${a}px`,
            textAlign: 'center',
            verticalAlign: 'top',
            '&:empty': { display: 'none' }
          }
        },
        [`${n}-unselectable ${n}-node-content-wrapper:hover`]: {
          backgroundColor: 'transparent'
        },
        [`${n}-node-content-wrapper`]: b(
          { lineHeight: `${a}px`, userSelect: 'none' },
          Yd(e, t)
        ),
        [`${o}.drop-container`]: {
          '> [draggable]': { boxShadow: `0 0 0 2px ${t.colorPrimary}` }
        },
        '&-show-line': {
          [`${n}-indent`]: {
            '&-unit': {
              position: 'relative',
              height: '100%',
              '&:before': {
                position: 'absolute',
                top: 0,
                insetInlineEnd: a / 2,
                bottom: -l,
                borderInlineEnd: `1px solid ${t.colorBorder}`,
                content: '""'
              },
              '&-end': { '&:before': { display: 'none' } }
            }
          },
          [`${n}-switcher`]: {
            background: 'transparent',
            '&-line-icon': { verticalAlign: '-0.15em' }
          }
        },
        [`${o}-leaf-last`]: {
          [`${n}-switcher`]: {
            '&-leaf-line': {
              '&:before': {
                top: 'auto !important',
                bottom: 'auto !important',
                height: `${a / 2}px !important`
              }
            }
          }
        }
      })
    }
  },
  Jd = e => {
    const { treeCls: t, treeNodeCls: n, treeNodePadding: o } = e
    return {
      [`${t}${t}-directory`]: {
        [n]: {
          position: 'relative',
          '&:before': {
            position: 'absolute',
            top: 0,
            insetInlineEnd: 0,
            bottom: o,
            insetInlineStart: 0,
            transition: `background-color ${e.motionDurationMid}`,
            content: '""',
            pointerEvents: 'none'
          },
          '&:hover': { '&:before': { background: e.controlItemBgHover } },
          '> *': { zIndex: 1 },
          [`${t}-switcher`]: { transition: `color ${e.motionDurationMid}` },
          [`${t}-node-content-wrapper`]: {
            borderRadius: 0,
            userSelect: 'none',
            '&:hover': { background: 'transparent' },
            [`&${t}-node-selected`]: {
              color: e.colorTextLightSolid,
              background: 'transparent'
            }
          },
          '&-selected': {
            '\n            &:hover::before,\n            &::before\n          ': {
              background: e.colorPrimary
            },
            [`${t}-switcher`]: { color: e.colorTextLightSolid },
            [`${t}-node-content-wrapper`]: {
              color: e.colorTextLightSolid,
              background: 'transparent'
            }
          }
        }
      }
    }
  },
  Qd = (e, t) => {
    const n = `.${e}`,
      o = `${n}-treenode`,
      l = t.paddingXS / 2,
      a = t.controlHeightSM,
      r = Wt(t, {
        treeCls: n,
        treeNodeCls: o,
        treeNodePadding: l,
        treeTitleHeight: a
      })
    return [Zd(e, r), Jd(r)]
  },
  ec = Ht('Tree', (e, t) => {
    let { prefixCls: n } = t
    return [{ [e.componentCls]: Ul(`${n}-checkbox`, e) }, Qd(n, e), _r(e)]
  }),
  ga = () => {
    const e = Wl()
    return b(b({}, e), {
      showLine: qe([Boolean, Object]),
      multiple: be(),
      autoExpandParent: be(),
      checkStrictly: be(),
      checkable: be(),
      disabled: be(),
      defaultExpandAll: be(),
      defaultExpandParent: be(),
      defaultExpandedKeys: He(),
      expandedKeys: He(),
      checkedKeys: qe([Array, Object]),
      defaultCheckedKeys: He(),
      selectedKeys: He(),
      defaultSelectedKeys: He(),
      selectable: be(),
      loadedKeys: He(),
      draggable: be(),
      showIcon: be(),
      icon: $e(),
      switcherIcon: Le.any,
      prefixCls: String,
      replaceFields: st(),
      blockNode: be(),
      openAnimation: Le.any,
      onDoubleclick: e.onDblclick,
      'onUpdate:selectedKeys': $e(),
      'onUpdate:checkedKeys': $e(),
      'onUpdate:expandedKeys': $e()
    })
  },
  nn = pe({
    compatConfig: { MODE: 3 },
    name: 'ATree',
    inheritAttrs: !1,
    props: St(ga(), {
      checkable: !1,
      selectable: !0,
      showIcon: !1,
      blockNode: !1
    }),
    slots: Object,
    setup(e, t) {
      let { attrs: n, expose: o, emit: l, slots: a } = t
      Il(!(e.treeData === void 0 && a.default))
      const { prefixCls: r, direction: i, virtual: d } = We('tree', e),
        [u, c] = ec(r),
        f = ce()
      o({
        treeRef: f,
        onNodeExpand: function() {
          var s
          ;(s = f.value) === null ||
            s === void 0 ||
            s.onNodeExpand(...arguments)
        },
        scrollTo: s => {
          var p
          ;(p = f.value) === null || p === void 0 || p.scrollTo(s)
        },
        selectedKeys: k(() => {
          var s
          return (s = f.value) === null || s === void 0
            ? void 0
            : s.selectedKeys
        }),
        checkedKeys: k(() => {
          var s
          return (s = f.value) === null || s === void 0 ? void 0 : s.checkedKeys
        }),
        halfCheckedKeys: k(() => {
          var s
          return (s = f.value) === null || s === void 0
            ? void 0
            : s.halfCheckedKeys
        }),
        loadedKeys: k(() => {
          var s
          return (s = f.value) === null || s === void 0 ? void 0 : s.loadedKeys
        }),
        loadingKeys: k(() => {
          var s
          return (s = f.value) === null || s === void 0 ? void 0 : s.loadingKeys
        }),
        expandedKeys: k(() => {
          var s
          return (s = f.value) === null || s === void 0
            ? void 0
            : s.expandedKeys
        })
      }),
        Ne(() => {
          Qe(
            e.replaceFields === void 0,
            'Tree',
            '`replaceFields` is deprecated, please use fieldNames instead'
          )
        })
      const w = (s, p) => {
          l('update:checkedKeys', s), l('check', s, p)
        },
        x = (s, p) => {
          l('update:expandedKeys', s), l('expand', s, p)
        },
        v = (s, p) => {
          l('update:selectedKeys', s), l('select', s, p)
        }
      return () => {
        const {
            showIcon: s,
            showLine: p,
            switcherIcon: $ = a.switcherIcon,
            icon: h = a.icon,
            blockNode: O,
            checkable: C,
            selectable: K,
            fieldNames: S = e.replaceFields,
            motion: I = e.openAnimation,
            itemHeight: y = 28,
            onDoubleclick: E,
            onDblclick: _
          } = e,
          F = b(
            b(
              b({}, n),
              nt(e, [
                'onUpdate:checkedKeys',
                'onUpdate:expandedKeys',
                'onUpdate:selectedKeys',
                'onDoubleclick'
              ])
            ),
            {
              showLine: !!p,
              dropIndicatorRender: Xd,
              fieldNames: S,
              icon: h,
              itemHeight: y
            }
          ),
          T = a.default ? Lt(a.default()) : void 0
        return u(
          g(
            Fd,
            L(
              L({}, F),
              {},
              {
                virtual: d.value,
                motion: I,
                ref: f,
                prefixCls: r.value,
                class: re(
                  {
                    [`${r.value}-icon-hide`]: !s,
                    [`${r.value}-block-node`]: O,
                    [`${r.value}-unselectable`]: !K,
                    [`${r.value}-rtl`]: i.value === 'rtl'
                  },
                  n.class,
                  c.value
                ),
                direction: i.value,
                checkable: C,
                selectable: K,
                switcherIcon: M => Gd(r.value, $, M, a.leafIcon, p),
                onCheck: w,
                onExpand: x,
                onSelect: v,
                onDblclick: _ || E,
                children: T
              }
            ),
            b(b({}, a), {
              checkable: () =>
                g('span', { class: `${r.value}-checkbox-inner` }, null)
            })
          )
        )
      }
    }
  })
function gl(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? Object(arguments[t]) : {},
      o = Object.keys(n)
    typeof Object.getOwnPropertySymbols == 'function' &&
      (o = o.concat(
        Object.getOwnPropertySymbols(n).filter(function(l) {
          return Object.getOwnPropertyDescriptor(n, l).enumerable
        })
      )),
      o.forEach(function(l) {
        tc(e, l, n[l])
      })
  }
  return e
}
function tc(e, t, n) {
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
var yo = function(t, n) {
  var o = gl({}, t, n.attrs)
  return g(ot, gl({}, o, { icon: qr }), null)
}
yo.displayName = 'FolderOpenOutlined'
yo.inheritAttrs = !1
const nc = yo
function yl(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? Object(arguments[t]) : {},
      o = Object.keys(n)
    typeof Object.getOwnPropertySymbols == 'function' &&
      (o = o.concat(
        Object.getOwnPropertySymbols(n).filter(function(l) {
          return Object.getOwnPropertyDescriptor(n, l).enumerable
        })
      )),
      o.forEach(function(l) {
        oc(e, l, n[l])
      })
  }
  return e
}
function oc(e, t, n) {
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
var bo = function(t, n) {
  var o = yl({}, t, n.attrs)
  return g(ot, yl({}, o, { icon: Yr }), null)
}
bo.displayName = 'FolderOutlined'
bo.inheritAttrs = !1
const lc = bo
var pt
;(function(e) {
  ;(e[(e.None = 0)] = 'None'),
    (e[(e.Start = 1)] = 'Start'),
    (e[(e.End = 2)] = 'End')
})(pt || (pt = {}))
function xo(e, t, n) {
  function o(l) {
    const a = l[t.key],
      r = l[t.children]
    n(a, l) !== !1 && xo(r || [], t, n)
  }
  e.forEach(o)
}
function ac(e) {
  let {
    treeData: t,
    expandedKeys: n,
    startKey: o,
    endKey: l,
    fieldNames: a = { title: 'title', key: 'key', children: 'children' }
  } = e
  const r = []
  let i = pt.None
  if (o && o === l) return [o]
  if (!o || !l) return []
  function d(u) {
    return u === o || u === l
  }
  return (
    xo(t, a, u => {
      if (i === pt.End) return !1
      if (d(u)) {
        if ((r.push(u), i === pt.None)) i = pt.Start
        else if (i === pt.Start) return (i = pt.End), !1
      } else i === pt.Start && r.push(u)
      return n.includes(u)
    }),
    r
  )
}
function xn(e, t, n) {
  const o = [...t],
    l = []
  return (
    xo(e, n, (a, r) => {
      const i = o.indexOf(a)
      return i !== -1 && (l.push(r), o.splice(i, 1)), !!o.length
    }),
    l
  )
}
var rc =
  (globalThis && globalThis.__rest) ||
  function(e, t) {
    var n = {}
    for (var o in e)
      Object.prototype.hasOwnProperty.call(e, o) &&
        t.indexOf(o) < 0 &&
        (n[o] = e[o])
    if (e != null && typeof Object.getOwnPropertySymbols == 'function')
      for (var l = 0, o = Object.getOwnPropertySymbols(e); l < o.length; l++)
        t.indexOf(o[l]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(e, o[l]) &&
          (n[o[l]] = e[o[l]])
    return n
  }
const ic = () => b(b({}, ga()), { expandAction: qe([Boolean, String]) })
function sc(e) {
  const { isLeaf: t, expanded: n } = e
  return t ? g(ha, null, null) : n ? g(nc, null, null) : g(lc, null, null)
}
const Cn = pe({
    compatConfig: { MODE: 3 },
    name: 'ADirectoryTree',
    inheritAttrs: !1,
    props: St(ic(), { showIcon: !0, expandAction: 'click' }),
    slots: Object,
    setup(e, t) {
      let { attrs: n, slots: o, emit: l, expose: a } = t
      var r
      const i = ce(
        e.treeData ||
          _n(Lt((r = o.default) === null || r === void 0 ? void 0 : r.call(o)))
      )
      Ee(
        () => e.treeData,
        () => {
          i.value = e.treeData
        }
      ),
        qn(() => {
          et(() => {
            var y
            e.treeData === void 0 &&
              o.default &&
              (i.value = _n(
                Lt(
                  (y = o.default) === null || y === void 0 ? void 0 : y.call(o)
                )
              ))
          })
        })
      const d = ce(),
        u = ce(),
        c = k(() => sn(e.fieldNames)),
        f = ce()
      a({
        scrollTo: y => {
          var E
          ;(E = f.value) === null || E === void 0 || E.scrollTo(y)
        },
        selectedKeys: k(() => {
          var y
          return (y = f.value) === null || y === void 0
            ? void 0
            : y.selectedKeys
        }),
        checkedKeys: k(() => {
          var y
          return (y = f.value) === null || y === void 0 ? void 0 : y.checkedKeys
        }),
        halfCheckedKeys: k(() => {
          var y
          return (y = f.value) === null || y === void 0
            ? void 0
            : y.halfCheckedKeys
        }),
        loadedKeys: k(() => {
          var y
          return (y = f.value) === null || y === void 0 ? void 0 : y.loadedKeys
        }),
        loadingKeys: k(() => {
          var y
          return (y = f.value) === null || y === void 0 ? void 0 : y.loadingKeys
        }),
        expandedKeys: k(() => {
          var y
          return (y = f.value) === null || y === void 0
            ? void 0
            : y.expandedKeys
        })
      })
      const w = () => {
          const { keyEntities: y } = lo(i.value, { fieldNames: c.value })
          let E
          return (
            e.defaultExpandAll
              ? (E = Object.keys(y))
              : e.defaultExpandParent
              ? (E = Tn(e.expandedKeys || e.defaultExpandedKeys || [], y))
              : (E = e.expandedKeys || e.defaultExpandedKeys),
            E
          )
        },
        x = ce(e.selectedKeys || e.defaultSelectedKeys || []),
        v = ce(w())
      Ee(
        () => e.selectedKeys,
        () => {
          e.selectedKeys !== void 0 && (x.value = e.selectedKeys)
        },
        { immediate: !0 }
      ),
        Ee(
          () => e.expandedKeys,
          () => {
            e.expandedKeys !== void 0 && (v.value = e.expandedKeys)
          },
          { immediate: !0 }
        )
      const p = fi(
          (y, E) => {
            const { isLeaf: _ } = E
            _ ||
              y.shiftKey ||
              y.metaKey ||
              y.ctrlKey ||
              f.value.onNodeExpand(y, E)
          },
          200,
          { leading: !0 }
        ),
        $ = (y, E) => {
          e.expandedKeys === void 0 && (v.value = y),
            l('update:expandedKeys', y),
            l('expand', y, E)
        },
        h = (y, E) => {
          const { expandAction: _ } = e
          _ === 'click' && p(y, E), l('click', y, E)
        },
        O = (y, E) => {
          const { expandAction: _ } = e
          ;(_ === 'dblclick' || _ === 'doubleclick') && p(y, E),
            l('doubleclick', y, E),
            l('dblclick', y, E)
        },
        C = (y, E) => {
          const { multiple: _ } = e,
            { node: F, nativeEvent: T } = E,
            M = F[c.value.key],
            X = b(b({}, E), { selected: !0 }),
            q =
              (T == null ? void 0 : T.ctrlKey) ||
              (T == null ? void 0 : T.metaKey),
            ae = T == null ? void 0 : T.shiftKey
          let H
          _ && q
            ? ((H = y),
              (d.value = M),
              (u.value = H),
              (X.selectedNodes = xn(i.value, H, c.value)))
            : _ && ae
            ? ((H = Array.from(
                new Set([
                  ...(u.value || []),
                  ...ac({
                    treeData: i.value,
                    expandedKeys: v.value,
                    startKey: M,
                    endKey: d.value,
                    fieldNames: c.value
                  })
                ])
              )),
              (X.selectedNodes = xn(i.value, H, c.value)))
            : ((H = [M]),
              (d.value = M),
              (u.value = H),
              (X.selectedNodes = xn(i.value, H, c.value))),
            l('update:selectedKeys', H),
            l('select', H, X),
            e.selectedKeys === void 0 && (x.value = H)
        },
        K = (y, E) => {
          l('update:checkedKeys', y), l('check', y, E)
        },
        { prefixCls: S, direction: I } = We('tree', e)
      return () => {
        const y = re(
            `${S.value}-directory`,
            { [`${S.value}-directory-rtl`]: I.value === 'rtl' },
            n.class
          ),
          { icon: E = o.icon, blockNode: _ = !0 } = e,
          F = rc(e, ['icon', 'blockNode'])
        return g(
          nn,
          L(
            L(L({}, n), {}, { icon: E || sc, ref: f, blockNode: _ }, F),
            {},
            {
              prefixCls: S.value,
              class: y,
              expandedKeys: v.value,
              selectedKeys: x.value,
              onSelect: C,
              onClick: h,
              onDblclick: O,
              onExpand: $,
              onCheck: K
            }
          ),
          o
        )
      }
    }
  }),
  Sn = Kn,
  dc = b(nn, {
    DirectoryTree: Cn,
    TreeNode: Sn,
    install: e => (
      e.component(nn.name, nn),
      e.component(Sn.name, Sn),
      e.component(Cn.name, Cn),
      e
    )
  })
function bl(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1
  const o = new Set()
  function l(a, r) {
    let i = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1
    const d = o.has(a)
    if ((wr(!d, 'Warning: There may be circular references'), d)) return !1
    if (a === r) return !0
    if (n && i > 1) return !1
    o.add(a)
    const u = i + 1
    if (Array.isArray(a)) {
      if (!Array.isArray(r) || a.length !== r.length) return !1
      for (let c = 0; c < a.length; c++) if (!l(a[c], r[c], u)) return !1
      return !0
    }
    if (a && r && typeof a == 'object' && typeof r == 'object') {
      const c = Object.keys(a)
      return c.length !== Object.keys(r).length
        ? !1
        : c.every(f => l(a[f], r[f], u))
    }
    return !1
  }
  return l(e, t)
}
const { SubMenu: cc, Item: uc } = ln
function fc(e) {
  return e.some(t => {
    let { children: n } = t
    return n && n.length > 0
  })
}
function ya(e, t) {
  return typeof t == 'string' || typeof t == 'number'
    ? t == null
      ? void 0
      : t
          .toString()
          .toLowerCase()
          .includes(e.trim().toLowerCase())
    : !1
}
function ba(e) {
  let {
    filters: t,
    prefixCls: n,
    filteredKeys: o,
    filterMultiple: l,
    searchValue: a,
    filterSearch: r
  } = e
  return t.map((i, d) => {
    const u = String(i.value)
    if (i.children)
      return g(
        cc,
        { key: u || d, title: i.text, popupClassName: `${n}-dropdown-submenu` },
        {
          default: () => [
            ba({
              filters: i.children,
              prefixCls: n,
              filteredKeys: o,
              filterMultiple: l,
              searchValue: a,
              filterSearch: r
            })
          ]
        }
      )
    const c = l ? mt : Ge,
      f = g(
        uc,
        { key: i.value !== void 0 ? u : d },
        {
          default: () => [
            g(c, { checked: o.includes(u) }, null),
            g('span', null, [i.text])
          ]
        }
      )
    return a.trim()
      ? typeof r == 'function'
        ? r(a, i)
          ? f
          : void 0
        : ya(a, i.text)
        ? f
        : void 0
      : f
  })
}
const vc = pe({
  name: 'FilterDropdown',
  props: [
    'tablePrefixCls',
    'prefixCls',
    'dropdownPrefixCls',
    'column',
    'filterState',
    'filterMultiple',
    'filterMode',
    'filterSearch',
    'columnKey',
    'triggerFilter',
    'locale',
    'getPopupContainer'
  ],
  setup(e, t) {
    let { slots: n } = t
    const o = io(),
      l = k(() => {
        var B
        return (B = e.filterMode) !== null && B !== void 0 ? B : 'menu'
      }),
      a = k(() => {
        var B
        return (B = e.filterSearch) !== null && B !== void 0 ? B : !1
      }),
      r = k(
        () => e.column.filterDropdownOpen || e.column.filterDropdownVisible
      ),
      i = k(
        () =>
          e.column.onFilterDropdownOpenChange ||
          e.column.onFilterDropdownVisibleChange
      ),
      d = te(!1),
      u = k(() => {
        var B
        return !!(
          e.filterState &&
          ((!((B = e.filterState.filteredKeys) === null || B === void 0) &&
            B.length) ||
            e.filterState.forceFiltered)
        )
      }),
      c = k(() => {
        var B
        return un((B = e.column) === null || B === void 0 ? void 0 : B.filters)
      }),
      f = k(() => {
        const {
          filterDropdown: B,
          slots: V = {},
          customFilterDropdown: W
        } = e.column
        return (
          B ||
          (V.filterDropdown && o.value[V.filterDropdown]) ||
          (W && o.value.customFilterDropdown)
        )
      }),
      m = k(() => {
        const { filterIcon: B, slots: V = {} } = e.column
        return (
          B ||
          (V.filterIcon && o.value[V.filterIcon]) ||
          o.value.customFilterIcon
        )
      }),
      w = B => {
        var V
        ;(d.value = B), (V = i.value) === null || V === void 0 || V.call(i, B)
      },
      x = k(() => (typeof r.value == 'boolean' ? r.value : d.value)),
      v = k(() => {
        var B
        return (B = e.filterState) === null || B === void 0
          ? void 0
          : B.filteredKeys
      }),
      s = te([]),
      p = B => {
        let { selectedKeys: V } = B
        s.value = V
      },
      $ = (B, V) => {
        let { node: W, checked: ne } = V
        e.filterMultiple
          ? p({ selectedKeys: B })
          : p({ selectedKeys: ne && W.key ? [W.key] : [] })
      }
    Ee(
      v,
      () => {
        d.value && p({ selectedKeys: v.value || [] })
      },
      { immediate: !0 }
    )
    const h = te([]),
      O = te(),
      C = B => {
        O.value = setTimeout(() => {
          h.value = B
        })
      },
      K = () => {
        clearTimeout(O.value)
      }
    ht(() => {
      clearTimeout(O.value)
    })
    const S = te(''),
      I = B => {
        const { value: V } = B.target
        S.value = V
      }
    Ee(d, () => {
      d.value || (S.value = '')
    })
    const y = B => {
        const { column: V, columnKey: W, filterState: ne } = e,
          Q = B && B.length ? B : null
        if (
          (Q === null && (!ne || !ne.filteredKeys)) ||
          bl(Q, ne == null ? void 0 : ne.filteredKeys, !0)
        )
          return null
        e.triggerFilter({ column: V, key: W, filteredKeys: Q })
      },
      E = () => {
        w(!1), y(s.value)
      },
      _ = function() {
        let { confirm: B, closeDropdown: V } =
          arguments.length > 0 && arguments[0] !== void 0
            ? arguments[0]
            : { confirm: !1, closeDropdown: !1 }
        B && y([]),
          V && w(!1),
          (S.value = ''),
          e.column.filterResetToDefaultFilteredValue
            ? (s.value = (e.column.defaultFilteredValue || []).map(W =>
                String(W)
              ))
            : (s.value = [])
      },
      F = function() {
        let { closeDropdown: B } =
          arguments.length > 0 && arguments[0] !== void 0
            ? arguments[0]
            : { closeDropdown: !0 }
        B && w(!1), y(s.value)
      },
      T = B => {
        B && v.value !== void 0 && (s.value = v.value || []),
          w(B),
          !B && !f.value && E()
      },
      { direction: M } = We('', e),
      X = B => {
        if (B.target.checked) {
          const V = c.value
          s.value = V
        } else s.value = []
      },
      q = B => {
        let { filters: V } = B
        return (V || []).map((W, ne) => {
          const Q = String(W.value),
            Pe = { title: W.text, key: W.value !== void 0 ? Q : ne }
          return W.children && (Pe.children = q({ filters: W.children })), Pe
        })
      },
      ae = B => {
        var V
        return b(b({}, B), {
          text: B.title,
          value: B.key,
          children:
            ((V = B.children) === null || V === void 0
              ? void 0
              : V.map(W => ae(W))) || []
        })
      },
      H = k(() => q({ filters: e.column.filters })),
      U = k(() =>
        re({
          [`${e.dropdownPrefixCls}-menu-without-submenu`]: !fc(
            e.column.filters || []
          )
        })
      ),
      j = () => {
        const B = s.value,
          {
            column: V,
            locale: W,
            tablePrefixCls: ne,
            filterMultiple: Q,
            dropdownPrefixCls: Pe,
            getPopupContainer: ue,
            prefixCls: Ie
          } = e
        return (V.filters || []).length === 0
          ? g(
              $o,
              {
                image: $o.PRESENTED_IMAGE_SIMPLE,
                description: W.filterEmptyText,
                imageStyle: { height: 24 },
                style: { margin: 0, padding: '16px 0' }
              },
              null
            )
          : l.value === 'tree'
          ? g(dt, null, [
              g(
                ll,
                {
                  filterSearch: a.value,
                  value: S.value,
                  onChange: I,
                  tablePrefixCls: ne,
                  locale: W
                },
                null
              ),
              g('div', { class: `${ne}-filter-dropdown-tree` }, [
                Q
                  ? g(
                      mt,
                      {
                        class: `${ne}-filter-dropdown-checkall`,
                        onChange: X,
                        checked: B.length === c.value.length,
                        indeterminate: B.length > 0 && B.length < c.value.length
                      },
                      { default: () => [W.filterCheckall] }
                    )
                  : null,
                g(
                  dc,
                  {
                    checkable: !0,
                    selectable: !1,
                    blockNode: !0,
                    multiple: Q,
                    checkStrictly: !Q,
                    class: `${Pe}-menu`,
                    onCheck: $,
                    checkedKeys: B,
                    selectedKeys: B,
                    showIcon: !1,
                    treeData: H.value,
                    autoExpandParent: !0,
                    defaultExpandAll: !0,
                    filterTreeNode: S.value.trim()
                      ? ge =>
                          typeof a.value == 'function'
                            ? a.value(S.value, ae(ge))
                            : ya(S.value, ge.title)
                      : void 0
                  },
                  null
                )
              ])
            ])
          : g(dt, null, [
              g(
                ll,
                {
                  filterSearch: a.value,
                  value: S.value,
                  onChange: I,
                  tablePrefixCls: ne,
                  locale: W
                },
                null
              ),
              g(
                ln,
                {
                  multiple: Q,
                  prefixCls: `${Pe}-menu`,
                  class: U.value,
                  onClick: K,
                  onSelect: p,
                  onDeselect: p,
                  selectedKeys: B,
                  getPopupContainer: ue,
                  openKeys: h.value,
                  onOpenChange: C
                },
                {
                  default: () =>
                    ba({
                      filters: V.filters || [],
                      filterSearch: a.value,
                      prefixCls: Ie,
                      filteredKeys: s.value,
                      filterMultiple: Q,
                      searchValue: S.value
                    })
                }
              )
            ])
      },
      Z = k(() => {
        const B = s.value
        return e.column.filterResetToDefaultFilteredValue
          ? bl(
              (e.column.defaultFilteredValue || []).map(V => String(V)),
              B,
              !0
            )
          : B.length === 0
      })
    return () => {
      var B
      const {
        tablePrefixCls: V,
        prefixCls: W,
        column: ne,
        dropdownPrefixCls: Q,
        locale: Pe,
        getPopupContainer: ue
      } = e
      let Ie
      typeof f.value == 'function'
        ? (Ie = f.value({
            prefixCls: `${Q}-custom`,
            setSelectedKeys: De => p({ selectedKeys: De }),
            selectedKeys: s.value,
            confirm: F,
            clearFilters: _,
            filters: ne.filters,
            visible: x.value,
            column: ne.__originColumn__,
            close: () => {
              w(!1)
            }
          }))
        : f.value
        ? (Ie = f.value)
        : (Ie = g(dt, null, [
            j(),
            g('div', { class: `${W}-dropdown-btns` }, [
              g(
                Rt,
                {
                  type: 'link',
                  size: 'small',
                  disabled: Z.value,
                  onClick: () => _()
                },
                { default: () => [Pe.filterReset] }
              ),
              g(
                Rt,
                { type: 'primary', size: 'small', onClick: E },
                { default: () => [Pe.filterConfirm] }
              )
            ])
          ]))
      const ge = g(Kd, { class: `${W}-dropdown` }, { default: () => [Ie] })
      let Te
      return (
        typeof m.value == 'function'
          ? (Te = m.value({ filtered: u.value, column: ne.__originColumn__ }))
          : m.value
          ? (Te = m.value)
          : (Te = g(Pd, null, null)),
        g('div', { class: `${W}-column` }, [
          g('span', { class: `${V}-column-title` }, [
            (B = n.default) === null || B === void 0 ? void 0 : B.call(n)
          ]),
          g(
            It,
            {
              overlay: ge,
              trigger: ['click'],
              open: x.value,
              onOpenChange: T,
              getPopupContainer: ue,
              placement: M.value === 'rtl' ? 'bottomLeft' : 'bottomRight'
            },
            {
              default: () => [
                g(
                  'span',
                  {
                    role: 'button',
                    tabindex: -1,
                    class: re(`${W}-trigger`, { active: u.value }),
                    onClick: De => {
                      De.stopPropagation()
                    }
                  },
                  [Te]
                )
              ]
            }
          )
        ])
      )
    }
  }
})
function Gn(e, t, n) {
  let o = []
  return (
    (e || []).forEach((l, a) => {
      var r, i
      const d = Xt(a, n),
        u =
          l.filterDropdown ||
          ((r = l == null ? void 0 : l.slots) === null || r === void 0
            ? void 0
            : r.filterDropdown) ||
          l.customFilterDropdown
      if (l.filters || u || 'onFilter' in l)
        if ('filteredValue' in l) {
          let c = l.filteredValue
          u ||
            (c =
              (i = c == null ? void 0 : c.map(String)) !== null && i !== void 0
                ? i
                : c),
            o.push({
              column: l,
              key: Kt(l, d),
              filteredKeys: c,
              forceFiltered: l.filtered
            })
        } else
          o.push({
            column: l,
            key: Kt(l, d),
            filteredKeys:
              t && l.defaultFilteredValue ? l.defaultFilteredValue : void 0,
            forceFiltered: l.filtered
          })
      'children' in l && (o = [...o, ...Gn(l.children, t, d)])
    }),
    o
  )
}
function xa(e, t, n, o, l, a, r, i) {
  return n.map((d, u) => {
    var c
    const f = Xt(u, i),
      { filterMultiple: m = !0, filterMode: w, filterSearch: x } = d
    let v = d
    const s =
      d.filterDropdown ||
      ((c = d == null ? void 0 : d.slots) === null || c === void 0
        ? void 0
        : c.filterDropdown) ||
      d.customFilterDropdown
    if (v.filters || s) {
      const p = Kt(v, f),
        $ = o.find(h => {
          let { key: O } = h
          return p === O
        })
      v = b(b({}, v), {
        title: h =>
          g(
            vc,
            {
              tablePrefixCls: e,
              prefixCls: `${e}-filter`,
              dropdownPrefixCls: t,
              column: v,
              columnKey: p,
              filterState: $,
              filterMultiple: m,
              filterMode: w,
              filterSearch: x,
              triggerFilter: a,
              locale: l,
              getPopupContainer: r
            },
            { default: () => [fo(d.title, h)] }
          )
      })
    }
    return (
      'children' in v &&
        (v = b(b({}, v), { children: xa(e, t, v.children, o, l, a, r, f) })),
      v
    )
  })
}
function un(e) {
  let t = []
  return (
    (e || []).forEach(n => {
      let { value: o, children: l } = n
      t.push(o), l && (t = [...t, ...un(l)])
    }),
    t
  )
}
function xl(e) {
  const t = {}
  return (
    e.forEach(n => {
      let { key: o, filteredKeys: l, column: a } = n
      var r
      const i =
          a.filterDropdown ||
          ((r = a == null ? void 0 : a.slots) === null || r === void 0
            ? void 0
            : r.filterDropdown) ||
          a.customFilterDropdown,
        { filters: d } = a
      if (i) t[o] = l || null
      else if (Array.isArray(l)) {
        const u = un(d)
        t[o] = u.filter(c => l.includes(String(c)))
      } else t[o] = null
    }),
    t
  )
}
function Cl(e, t) {
  return t.reduce((n, o) => {
    const {
      column: { onFilter: l, filters: a },
      filteredKeys: r
    } = o
    return l && r && r.length
      ? n.filter(i =>
          r.some(d => {
            const u = un(a),
              c = u.findIndex(m => String(m) === String(d)),
              f = c !== -1 ? u[c] : d
            return l(f, i)
          })
        )
      : n
  }, e)
}
function Ca(e) {
  return e.flatMap(t => ('children' in t ? [t, ...Ca(t.children || [])] : [t]))
}
function pc(e) {
  let {
    prefixCls: t,
    dropdownPrefixCls: n,
    mergedColumns: o,
    locale: l,
    onFilterChange: a,
    getPopupContainer: r
  } = e
  const i = k(() => Ca(o.value)),
    [d, u] = Et(Gn(i.value, !0)),
    c = k(() => {
      const x = Gn(i.value, !1)
      if (x.length === 0) return x
      let v = !0,
        s = !0
      if (
        (x.forEach(p => {
          let { filteredKeys: $ } = p
          $ !== void 0 ? (v = !1) : (s = !1)
        }),
        v)
      ) {
        const p = (i.value || []).map(($, h) => Kt($, Xt(h)))
        return d.value
          .filter($ => {
            let { key: h } = $
            return p.includes(h)
          })
          .map($ => {
            const h = i.value[p.findIndex(O => O === $.key)]
            return b(b({}, $), {
              column: b(b({}, $.column), h),
              forceFiltered: h.filtered
            })
          })
      }
      return (
        Qe(
          s,
          'Table',
          'Columns should all contain `filteredValue` or not contain `filteredValue`.'
        ),
        x
      )
    }),
    f = k(() => xl(c.value)),
    m = x => {
      const v = c.value.filter(s => {
        let { key: p } = s
        return p !== x.key
      })
      v.push(x), u(v), a(xl(v), v)
    }
  return [x => xa(t.value, n.value, x, c.value, l.value, m, r.value), c, f]
}
function Sa(e, t) {
  return e.map(n => {
    const o = b({}, n)
    return (
      (o.title = fo(o.title, t)),
      'children' in o && (o.children = Sa(o.children, t)),
      o
    )
  })
}
function mc(e) {
  return [n => Sa(n, e.value)]
}
function hc(e) {
  return function(n) {
    let { prefixCls: o, onExpand: l, record: a, expanded: r, expandable: i } = n
    const d = `${o}-row-expand-icon`
    return g(
      'button',
      {
        type: 'button',
        onClick: u => {
          l(a, u), u.stopPropagation()
        },
        class: re(d, {
          [`${d}-spaced`]: !i,
          [`${d}-expanded`]: i && r,
          [`${d}-collapsed`]: i && !r
        }),
        'aria-label': r ? e.collapse : e.expand,
        'aria-expanded': r
      },
      null
    )
  }
}
function wa(e, t) {
  const n = t.value
  return e.map(o => {
    var l
    if (o === vt || o === xt) return o
    const a = b({}, o),
      { slots: r = {} } = a
    return (
      (a.__originColumn__ = o),
      Qe(
        !('slots' in a),
        'Table',
        '`column.slots` is deprecated. Please use `v-slot:headerCell` `v-slot:bodyCell` instead.'
      ),
      Object.keys(r).forEach(i => {
        const d = r[i]
        a[i] === void 0 && n[d] && (a[i] = n[d])
      }),
      t.value.headerCell &&
        !(!((l = o.slots) === null || l === void 0) && l.title) &&
        (a.title = eo(
          t.value,
          'headerCell',
          { title: o.title, column: o },
          () => [o.title]
        )),
      'children' in a &&
        Array.isArray(a.children) &&
        (a.children = wa(a.children, t)),
      a
    )
  })
}
function gc(e) {
  return [n => wa(n, e)]
}
const yc = e => {
    const { componentCls: t } = e,
      n = `${e.lineWidth}px ${e.lineType} ${e.tableBorderColor}`,
      o = (l, a, r) => ({
        [`&${t}-${l}`]: {
          [`> ${t}-container`]: {
            [`> ${t}-content, > ${t}-body`]: {
              '> table > tbody > tr > td': {
                [`> ${t}-expanded-row-fixed`]: {
                  margin: `-${a}px -${r + e.lineWidth}px`
                }
              }
            }
          }
        }
      })
    return {
      [`${t}-wrapper`]: {
        [`${t}${t}-bordered`]: b(
          b(
            b(
              {
                [`> ${t}-title`]: { border: n, borderBottom: 0 },
                [`> ${t}-container`]: {
                  borderInlineStart: n,
                  [`
            > ${t}-content,
            > ${t}-header,
            > ${t}-body,
            > ${t}-summary
          `]: {
                    '> table': {
                      '\n                > thead > tr > th,\n                > tbody > tr > td,\n                > tfoot > tr > th,\n                > tfoot > tr > td\n              ': {
                        borderInlineEnd: n
                      },
                      '> thead': {
                        '> tr:not(:last-child) > th': { borderBottom: n },
                        '> tr > th::before': {
                          backgroundColor: 'transparent !important'
                        }
                      },
                      '\n                > thead > tr,\n                > tbody > tr,\n                > tfoot > tr\n              ': {
                        [`> ${t}-cell-fix-right-first::after`]: {
                          borderInlineEnd: n
                        }
                      },
                      '> tbody > tr > td': {
                        [`> ${t}-expanded-row-fixed`]: {
                          margin: `-${
                            e.tablePaddingVertical
                          }px -${e.tablePaddingHorizontal + e.lineWidth}px`,
                          '&::after': {
                            position: 'absolute',
                            top: 0,
                            insetInlineEnd: e.lineWidth,
                            bottom: 0,
                            borderInlineEnd: n,
                            content: '""'
                          }
                        }
                      }
                    }
                  },
                  [`
            > ${t}-content,
            > ${t}-header
          `]: { '> table': { borderTop: n } }
                },
                [`&${t}-scroll-horizontal`]: {
                  [`> ${t}-container > ${t}-body`]: {
                    '> table > tbody': {
                      [`
                > tr${t}-expanded-row,
                > tr${t}-placeholder
              `]: { '> td': { borderInlineEnd: 0 } }
                    }
                  }
                }
              },
              o(
                'middle',
                e.tablePaddingVerticalMiddle,
                e.tablePaddingHorizontalMiddle
              )
            ),
            o(
              'small',
              e.tablePaddingVerticalSmall,
              e.tablePaddingHorizontalSmall
            )
          ),
          { [`> ${t}-footer`]: { border: n, borderTop: 0 } }
        ),
        [`${t}-cell`]: {
          [`${t}-container:first-child`]: { borderTop: 0 },
          '&-scrollbar:not([rowspan])': {
            boxShadow: `0 ${e.lineWidth}px 0 ${e.lineWidth}px ${e.tableHeaderBg}`
          }
        }
      }
    }
  },
  bc = yc,
  xc = e => {
    const { componentCls: t } = e
    return {
      [`${t}-wrapper`]: {
        [`${t}-cell-ellipsis`]: b(b({}, qa), {
          wordBreak: 'keep-all',
          [`
          &${t}-cell-fix-left-last,
          &${t}-cell-fix-right-first
        `]: {
            overflow: 'visible',
            [`${t}-cell-content`]: {
              display: 'block',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }
          },
          [`${t}-column-title`]: {
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            wordBreak: 'keep-all'
          }
        })
      }
    }
  },
  Cc = xc,
  Sc = e => {
    const { componentCls: t } = e
    return {
      [`${t}-wrapper`]: {
        [`${t}-tbody > tr${t}-placeholder`]: {
          textAlign: 'center',
          color: e.colorTextDisabled,
          '&:hover > td': { background: e.colorBgContainer }
        }
      }
    }
  },
  wc = Sc,
  $c = e => {
    const {
        componentCls: t,
        antCls: n,
        controlInteractiveSize: o,
        motionDurationSlow: l,
        lineWidth: a,
        paddingXS: r,
        lineType: i,
        tableBorderColor: d,
        tableExpandIconBg: u,
        tableExpandColumnWidth: c,
        borderRadius: f,
        fontSize: m,
        fontSizeSM: w,
        lineHeight: x,
        tablePaddingVertical: v,
        tablePaddingHorizontal: s,
        tableExpandedRowBg: p,
        paddingXXS: $
      } = e,
      h = o / 2 - a,
      O = h * 2 + a * 3,
      C = `${a}px ${i} ${d}`,
      K = $ - a
    return {
      [`${t}-wrapper`]: {
        [`${t}-expand-icon-col`]: { width: c },
        [`${t}-row-expand-icon-cell`]: {
          textAlign: 'center',
          [`${t}-row-expand-icon`]: {
            display: 'inline-flex',
            float: 'none',
            verticalAlign: 'sub'
          }
        },
        [`${t}-row-indent`]: { height: 1, float: 'left' },
        [`${t}-row-expand-icon`]: b(b({}, sr(e)), {
          position: 'relative',
          float: 'left',
          boxSizing: 'border-box',
          width: O,
          height: O,
          padding: 0,
          color: 'inherit',
          lineHeight: `${O}px`,
          background: u,
          border: C,
          borderRadius: f,
          transform: `scale(${o / O})`,
          transition: `all ${l}`,
          userSelect: 'none',
          '&:focus, &:hover, &:active': { borderColor: 'currentcolor' },
          '&::before, &::after': {
            position: 'absolute',
            background: 'currentcolor',
            transition: `transform ${l} ease-out`,
            content: '""'
          },
          '&::before': {
            top: h,
            insetInlineEnd: K,
            insetInlineStart: K,
            height: a
          },
          '&::after': {
            top: K,
            bottom: K,
            insetInlineStart: h,
            width: a,
            transform: 'rotate(90deg)'
          },
          '&-collapsed::before': { transform: 'rotate(-180deg)' },
          '&-collapsed::after': { transform: 'rotate(0deg)' },
          '&-spaced': {
            '&::before, &::after': { display: 'none', content: 'none' },
            background: 'transparent',
            border: 0,
            visibility: 'hidden'
          }
        }),
        [`${t}-row-indent + ${t}-row-expand-icon`]: {
          marginTop: (m * x - a * 3) / 2 - Math.ceil((w * 1.4 - a * 3) / 2),
          marginInlineEnd: r
        },
        [`tr${t}-expanded-row`]: {
          '&, &:hover': { '> td': { background: p } },
          [`${n}-descriptions-view`]: {
            display: 'flex',
            table: { flex: 'auto', width: 'auto' }
          }
        },
        [`${t}-expanded-row-fixed`]: {
          position: 'relative',
          margin: `-${v}px -${s}px`,
          padding: `${v}px ${s}px`
        }
      }
    }
  },
  kc = $c,
  Oc = e => {
    const {
        componentCls: t,
        antCls: n,
        iconCls: o,
        tableFilterDropdownWidth: l,
        tableFilterDropdownSearchWidth: a,
        paddingXXS: r,
        paddingXS: i,
        colorText: d,
        lineWidth: u,
        lineType: c,
        tableBorderColor: f,
        tableHeaderIconColor: m,
        fontSizeSM: w,
        tablePaddingHorizontal: x,
        borderRadius: v,
        motionDurationSlow: s,
        colorTextDescription: p,
        colorPrimary: $,
        tableHeaderFilterActiveBg: h,
        colorTextDisabled: O,
        tableFilterDropdownBg: C,
        tableFilterDropdownHeight: K,
        controlItemBgHover: S,
        controlItemBgActive: I,
        boxShadowSecondary: y
      } = e,
      E = `${n}-dropdown`,
      _ = `${t}-filter-dropdown`,
      F = `${n}-tree`,
      T = `${u}px ${c} ${f}`
    return [
      {
        [`${t}-wrapper`]: {
          [`${t}-filter-column`]: {
            display: 'flex',
            justifyContent: 'space-between'
          },
          [`${t}-filter-trigger`]: {
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            marginBlock: -r,
            marginInline: `${r}px ${-x / 2}px`,
            padding: `0 ${r}px`,
            color: m,
            fontSize: w,
            borderRadius: v,
            cursor: 'pointer',
            transition: `all ${s}`,
            '&:hover': { color: p, background: h },
            '&.active': { color: $ }
          }
        }
      },
      {
        [`${n}-dropdown`]: {
          [_]: b(b({}, ct(e)), {
            minWidth: l,
            backgroundColor: C,
            borderRadius: v,
            boxShadow: y,
            [`${E}-menu`]: {
              maxHeight: K,
              overflowX: 'hidden',
              border: 0,
              boxShadow: 'none',
              '&:empty::after': {
                display: 'block',
                padding: `${i}px 0`,
                color: O,
                fontSize: w,
                textAlign: 'center',
                content: '"Not Found"'
              }
            },
            [`${_}-tree`]: {
              paddingBlock: `${i}px 0`,
              paddingInline: i,
              [F]: { padding: 0 },
              [`${F}-treenode ${F}-node-content-wrapper:hover`]: {
                backgroundColor: S
              },
              [`${F}-treenode-checkbox-checked ${F}-node-content-wrapper`]: {
                '&, &:hover': { backgroundColor: I }
              }
            },
            [`${_}-search`]: {
              padding: i,
              borderBottom: T,
              '&-input': { input: { minWidth: a }, [o]: { color: O } }
            },
            [`${_}-checkall`]: {
              width: '100%',
              marginBottom: r,
              marginInlineStart: r
            },
            [`${_}-btns`]: {
              display: 'flex',
              justifyContent: 'space-between',
              padding: `${i - u}px ${i}px`,
              overflow: 'hidden',
              backgroundColor: 'inherit',
              borderTop: T
            }
          })
        }
      },
      {
        [`${n}-dropdown ${_}, ${_}-submenu`]: {
          [`${n}-checkbox-wrapper + span`]: { paddingInlineStart: i, color: d },
          '> ul': {
            maxHeight: 'calc(100vh - 130px)',
            overflowX: 'hidden',
            overflowY: 'auto'
          }
        }
      }
    ]
  },
  Pc = Oc,
  Ec = e => {
    const {
        componentCls: t,
        lineWidth: n,
        colorSplit: o,
        motionDurationSlow: l,
        zIndexTableFixed: a,
        tableBg: r,
        zIndexTableSticky: i
      } = e,
      d = o
    return {
      [`${t}-wrapper`]: {
        [`
        ${t}-cell-fix-left,
        ${t}-cell-fix-right
      `]: { position: 'sticky !important', zIndex: a, background: r },
        [`
        ${t}-cell-fix-left-first::after,
        ${t}-cell-fix-left-last::after
      `]: {
          position: 'absolute',
          top: 0,
          right: { _skip_check_: !0, value: 0 },
          bottom: -n,
          width: 30,
          transform: 'translateX(100%)',
          transition: `box-shadow ${l}`,
          content: '""',
          pointerEvents: 'none'
        },
        [`${t}-cell-fix-left-all::after`]: { display: 'none' },
        [`
        ${t}-cell-fix-right-first::after,
        ${t}-cell-fix-right-last::after
      `]: {
          position: 'absolute',
          top: 0,
          bottom: -n,
          left: { _skip_check_: !0, value: 0 },
          width: 30,
          transform: 'translateX(-100%)',
          transition: `box-shadow ${l}`,
          content: '""',
          pointerEvents: 'none'
        },
        [`${t}-container`]: {
          '&::before, &::after': {
            position: 'absolute',
            top: 0,
            bottom: 0,
            zIndex: i + 1,
            width: 30,
            transition: `box-shadow ${l}`,
            content: '""',
            pointerEvents: 'none'
          },
          '&::before': { insetInlineStart: 0 },
          '&::after': { insetInlineEnd: 0 }
        },
        [`${t}-ping-left`]: {
          [`&:not(${t}-has-fix-left) ${t}-container`]: {
            position: 'relative',
            '&::before': { boxShadow: `inset 10px 0 8px -8px ${d}` }
          },
          [`
          ${t}-cell-fix-left-first::after,
          ${t}-cell-fix-left-last::after
        `]: { boxShadow: `inset 10px 0 8px -8px ${d}` },
          [`${t}-cell-fix-left-last::before`]: {
            backgroundColor: 'transparent !important'
          }
        },
        [`${t}-ping-right`]: {
          [`&:not(${t}-has-fix-right) ${t}-container`]: {
            position: 'relative',
            '&::after': { boxShadow: `inset -10px 0 8px -8px ${d}` }
          },
          [`
          ${t}-cell-fix-right-first::after,
          ${t}-cell-fix-right-last::after
        `]: { boxShadow: `inset -10px 0 8px -8px ${d}` }
        }
      }
    }
  },
  Ic = Ec,
  Kc = e => {
    const { componentCls: t, antCls: n } = e
    return {
      [`${t}-wrapper`]: {
        [`${t}-pagination${n}-pagination`]: { margin: `${e.margin}px 0` },
        [`${t}-pagination`]: {
          display: 'flex',
          flexWrap: 'wrap',
          rowGap: e.paddingXS,
          '> *': { flex: 'none' },
          '&-left': { justifyContent: 'flex-start' },
          '&-center': { justifyContent: 'center' },
          '&-right': { justifyContent: 'flex-end' }
        }
      }
    }
  },
  Tc = Kc,
  _c = e => {
    const { componentCls: t, tableRadius: n } = e
    return {
      [`${t}-wrapper`]: {
        [t]: {
          [`${t}-title, ${t}-header`]: { borderRadius: `${n}px ${n}px 0 0` },
          [`${t}-title + ${t}-container`]: {
            borderStartStartRadius: 0,
            borderStartEndRadius: 0,
            table: {
              borderRadius: 0,
              '> thead > tr:first-child': {
                'th:first-child': { borderRadius: 0 },
                'th:last-child': { borderRadius: 0 }
              }
            }
          },
          '&-container': {
            borderStartStartRadius: n,
            borderStartEndRadius: n,
            'table > thead > tr:first-child': {
              '> *:first-child': { borderStartStartRadius: n },
              '> *:last-child': { borderStartEndRadius: n }
            }
          },
          '&-footer': { borderRadius: `0 0 ${n}px ${n}px` }
        }
      }
    }
  },
  Dc = _c,
  Rc = e => {
    const { componentCls: t } = e
    return {
      [`${t}-wrapper-rtl`]: {
        direction: 'rtl',
        table: { direction: 'rtl' },
        [`${t}-pagination-left`]: { justifyContent: 'flex-end' },
        [`${t}-pagination-right`]: { justifyContent: 'flex-start' },
        [`${t}-row-expand-icon`]: {
          '&::after': { transform: 'rotate(-90deg)' },
          '&-collapsed::before': { transform: 'rotate(180deg)' },
          '&-collapsed::after': { transform: 'rotate(0deg)' }
        }
      }
    }
  },
  Nc = Rc,
  Bc = e => {
    const {
      componentCls: t,
      antCls: n,
      iconCls: o,
      fontSizeIcon: l,
      paddingXS: a,
      tableHeaderIconColor: r,
      tableHeaderIconColorHover: i
    } = e
    return {
      [`${t}-wrapper`]: {
        [`${t}-selection-col`]: { width: e.tableSelectionColumnWidth },
        [`${t}-bordered ${t}-selection-col`]: {
          width: e.tableSelectionColumnWidth + a * 2
        },
        [`
        table tr th${t}-selection-column,
        table tr td${t}-selection-column
      `]: {
          paddingInlineEnd: e.paddingXS,
          paddingInlineStart: e.paddingXS,
          textAlign: 'center',
          [`${n}-radio-wrapper`]: { marginInlineEnd: 0 }
        },
        [`table tr th${t}-selection-column${t}-cell-fix-left`]: {
          zIndex: e.zIndexTableFixed + 1
        },
        [`table tr th${t}-selection-column::after`]: {
          backgroundColor: 'transparent !important'
        },
        [`${t}-selection`]: {
          position: 'relative',
          display: 'inline-flex',
          flexDirection: 'column'
        },
        [`${t}-selection-extra`]: {
          position: 'absolute',
          top: 0,
          zIndex: 1,
          cursor: 'pointer',
          transition: `all ${e.motionDurationSlow}`,
          marginInlineStart: '100%',
          paddingInlineStart: `${e.tablePaddingHorizontal / 4}px`,
          [o]: {
            color: r,
            fontSize: l,
            verticalAlign: 'baseline',
            '&:hover': { color: i }
          }
        }
      }
    }
  },
  Ac = Bc,
  Fc = e => {
    const { componentCls: t } = e,
      n = (o, l, a, r) => ({
        [`${t}${t}-${o}`]: {
          fontSize: r,
          [`
        ${t}-title,
        ${t}-footer,
        ${t}-thead > tr > th,
        ${t}-tbody > tr > td,
        tfoot > tr > th,
        tfoot > tr > td
      `]: { padding: `${l}px ${a}px` },
          [`${t}-filter-trigger`]: { marginInlineEnd: `-${a / 2}px` },
          [`${t}-expanded-row-fixed`]: { margin: `-${l}px -${a}px` },
          [`${t}-tbody`]: {
            [`${t}-wrapper:only-child ${t}`]: {
              marginBlock: `-${l}px`,
              marginInline: `${e.tableExpandColumnWidth - a}px -${a}px`
            }
          },
          [`${t}-selection-column`]: { paddingInlineStart: `${a / 4}px` }
        }
      })
    return {
      [`${t}-wrapper`]: b(
        b(
          {},
          n(
            'middle',
            e.tablePaddingVerticalMiddle,
            e.tablePaddingHorizontalMiddle,
            e.tableFontSizeMiddle
          )
        ),
        n(
          'small',
          e.tablePaddingVerticalSmall,
          e.tablePaddingHorizontalSmall,
          e.tableFontSizeSmall
        )
      )
    }
  },
  zc = Fc,
  Mc = e => {
    const { componentCls: t } = e
    return {
      [`${t}-wrapper ${t}-resize-handle`]: {
        position: 'absolute',
        top: 0,
        height: '100% !important',
        bottom: 0,
        left: ' auto !important',
        right: ' -8px',
        cursor: 'col-resize',
        touchAction: 'none',
        userSelect: 'auto',
        width: '16px',
        zIndex: 1,
        '&-line': {
          display: 'block',
          width: '1px',
          marginLeft: '7px',
          height: '100% !important',
          backgroundColor: e.colorPrimary,
          opacity: 0
        },
        '&:hover &-line': { opacity: 1 }
      },
      [`${t}-wrapper  ${t}-resize-handle.dragging`]: {
        overflow: 'hidden',
        [`${t}-resize-handle-line`]: { opacity: 1 },
        '&:before': {
          position: 'absolute',
          top: 0,
          bottom: 0,
          content: '" "',
          width: '200vw',
          transform: 'translateX(-50%)',
          opacity: 0
        }
      }
    }
  },
  Lc = Mc,
  jc = e => {
    const {
      componentCls: t,
      marginXXS: n,
      fontSizeIcon: o,
      tableHeaderIconColor: l,
      tableHeaderIconColorHover: a
    } = e
    return {
      [`${t}-wrapper`]: {
        [`${t}-thead th${t}-column-has-sorters`]: {
          outline: 'none',
          cursor: 'pointer',
          transition: `all ${e.motionDurationSlow}`,
          '&:hover': {
            background: e.tableHeaderSortHoverBg,
            '&::before': { backgroundColor: 'transparent !important' }
          },
          '&:focus-visible': { color: e.colorPrimary },
          [`
          &${t}-cell-fix-left:hover,
          &${t}-cell-fix-right:hover
        `]: { background: e.tableFixedHeaderSortActiveBg }
        },
        [`${t}-thead th${t}-column-sort`]: {
          background: e.tableHeaderSortBg,
          '&::before': { backgroundColor: 'transparent !important' }
        },
        [`td${t}-column-sort`]: { background: e.tableBodySortBg },
        [`${t}-column-title`]: { position: 'relative', zIndex: 1, flex: 1 },
        [`${t}-column-sorters`]: {
          display: 'flex',
          flex: 'auto',
          alignItems: 'center',
          justifyContent: 'space-between',
          '&::after': {
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            content: '""'
          }
        },
        [`${t}-column-sorter`]: {
          marginInlineStart: n,
          color: l,
          fontSize: 0,
          transition: `color ${e.motionDurationSlow}`,
          '&-inner': {
            display: 'inline-flex',
            flexDirection: 'column',
            alignItems: 'center'
          },
          '&-up, &-down': {
            fontSize: o,
            '&.active': { color: e.colorPrimary }
          },
          [`${t}-column-sorter-up + ${t}-column-sorter-down`]: {
            marginTop: '-0.3em'
          }
        },
        [`${t}-column-sorters:hover ${t}-column-sorter`]: { color: a }
      }
    }
  },
  Hc = jc,
  Wc = e => {
    const {
        componentCls: t,
        opacityLoading: n,
        tableScrollThumbBg: o,
        tableScrollThumbBgHover: l,
        tableScrollThumbSize: a,
        tableScrollBg: r,
        zIndexTableSticky: i
      } = e,
      d = `${e.lineWidth}px ${e.lineType} ${e.tableBorderColor}`
    return {
      [`${t}-wrapper`]: {
        [`${t}-sticky`]: {
          '&-holder': {
            position: 'sticky',
            zIndex: i,
            background: e.colorBgContainer
          },
          '&-scroll': {
            position: 'sticky',
            bottom: 0,
            height: `${a}px !important`,
            zIndex: i,
            display: 'flex',
            alignItems: 'center',
            background: r,
            borderTop: d,
            opacity: n,
            '&:hover': { transformOrigin: 'center bottom' },
            '&-bar': {
              height: a,
              backgroundColor: o,
              borderRadius: 100,
              transition: `all ${e.motionDurationSlow}, transform none`,
              position: 'absolute',
              bottom: 0,
              '&:hover, &-active': { backgroundColor: l }
            }
          }
        }
      }
    }
  },
  Vc = Wc,
  Gc = e => {
    const { componentCls: t, lineWidth: n, tableBorderColor: o } = e,
      l = `${n}px ${e.lineType} ${o}`
    return {
      [`${t}-wrapper`]: {
        [`${t}-summary`]: {
          position: 'relative',
          zIndex: e.zIndexTableFixed,
          background: e.tableBg,
          '> tr': { '> th, > td': { borderBottom: l } }
        },
        [`div${t}-summary`]: { boxShadow: `0 -${n}px 0 ${o}` }
      }
    }
  },
  Sl = Gc,
  Xc = e => {
    const {
        componentCls: t,
        fontWeightStrong: n,
        tablePaddingVertical: o,
        tablePaddingHorizontal: l,
        lineWidth: a,
        lineType: r,
        tableBorderColor: i,
        tableFontSize: d,
        tableBg: u,
        tableRadius: c,
        tableHeaderTextColor: f,
        motionDurationMid: m,
        tableHeaderBg: w,
        tableHeaderCellSplitColor: x,
        tableRowHoverBg: v,
        tableSelectedRowBg: s,
        tableSelectedRowHoverBg: p,
        tableFooterTextColor: $,
        tableFooterBg: h,
        paddingContentVerticalLG: O
      } = e,
      C = `${a}px ${r} ${i}`
    return {
      [`${t}-wrapper`]: b(b({ clear: 'both', maxWidth: '100%' }, Ya()), {
        [t]: b(b({}, ct(e)), {
          fontSize: d,
          background: u,
          borderRadius: `${c}px ${c}px 0 0`
        }),
        table: {
          width: '100%',
          textAlign: 'start',
          borderRadius: `${c}px ${c}px 0 0`,
          borderCollapse: 'separate',
          borderSpacing: 0
        },
        [`
          ${t}-thead > tr > th,
          ${t}-tbody > tr > td,
          tfoot > tr > th,
          tfoot > tr > td
        `]: {
          position: 'relative',
          padding: `${O}px ${l}px`,
          overflowWrap: 'break-word'
        },
        [`${t}-title`]: { padding: `${o}px ${l}px` },
        [`${t}-thead`]: {
          '\n          > tr > th,\n          > tr > td\n        ': {
            position: 'relative',
            color: f,
            fontWeight: n,
            textAlign: 'start',
            background: w,
            borderBottom: C,
            transition: `background ${m} ease`,
            "&[colspan]:not([colspan='1'])": { textAlign: 'center' },
            [`&:not(:last-child):not(${t}-selection-column):not(${t}-row-expand-icon-cell):not([colspan])::before`]: {
              position: 'absolute',
              top: '50%',
              insetInlineEnd: 0,
              width: 1,
              height: '1.6em',
              backgroundColor: x,
              transform: 'translateY(-50%)',
              transition: `background-color ${m}`,
              content: '""'
            }
          },
          '> tr:not(:last-child) > th[colspan]': { borderBottom: 0 }
        },
        [`${t}:not(${t}-bordered)`]: {
          [`${t}-tbody`]: {
            '> tr': {
              '> td': { borderTop: C, borderBottom: 'transparent' },
              '&:last-child > td': { borderBottom: C },
              [`&:first-child > td,
              &${t}-measure-row + tr > td`]: {
                borderTop: 'none',
                borderTopColor: 'transparent'
              }
            }
          }
        },
        [`${t}${t}-bordered`]: {
          [`${t}-tbody`]: { '> tr': { '> td': { borderBottom: C } } }
        },
        [`${t}-tbody`]: {
          '> tr': {
            '> td': {
              transition: `background ${m}, border-color ${m}`,
              [`
              > ${t}-wrapper:only-child,
              > ${t}-expanded-row-fixed > ${t}-wrapper:only-child
            `]: {
                [t]: {
                  marginBlock: `-${o}px`,
                  marginInline: `${e.tableExpandColumnWidth - l}px -${l}px`,
                  [`${t}-tbody > tr:last-child > td`]: {
                    borderBottom: 0,
                    '&:first-child, &:last-child': { borderRadius: 0 }
                  }
                }
              }
            },
            [`
            &${t}-row:hover > td,
            > td${t}-cell-row-hover
          `]: { background: v },
            [`&${t}-row-selected`]: {
              '> td': { background: s },
              '&:hover > td': { background: p }
            }
          }
        },
        [`${t}-footer`]: { padding: `${o}px ${l}px`, color: $, background: h }
      })
    }
  },
  Uc = Ht('Table', e => {
    const {
        controlItemBgActive: t,
        controlItemBgActiveHover: n,
        colorTextPlaceholder: o,
        colorTextHeading: l,
        colorSplit: a,
        colorBorderSecondary: r,
        fontSize: i,
        padding: d,
        paddingXS: u,
        paddingSM: c,
        controlHeight: f,
        colorFillAlter: m,
        colorIcon: w,
        colorIconHover: x,
        opacityLoading: v,
        colorBgContainer: s,
        borderRadiusLG: p,
        colorFillContent: $,
        colorFillSecondary: h,
        controlInteractiveSize: O
      } = e,
      C = new At(w),
      K = new At(x),
      S = t,
      I = 2,
      y = new At(h).onBackground(s).toHexString(),
      E = new At($).onBackground(s).toHexString(),
      _ = new At(m).onBackground(s).toHexString(),
      F = Wt(e, {
        tableFontSize: i,
        tableBg: s,
        tableRadius: p,
        tablePaddingVertical: d,
        tablePaddingHorizontal: d,
        tablePaddingVerticalMiddle: c,
        tablePaddingHorizontalMiddle: u,
        tablePaddingVerticalSmall: u,
        tablePaddingHorizontalSmall: u,
        tableBorderColor: r,
        tableHeaderTextColor: l,
        tableHeaderBg: _,
        tableFooterTextColor: l,
        tableFooterBg: _,
        tableHeaderCellSplitColor: r,
        tableHeaderSortBg: y,
        tableHeaderSortHoverBg: E,
        tableHeaderIconColor: C.clone()
          .setAlpha(C.getAlpha() * v)
          .toRgbString(),
        tableHeaderIconColorHover: K.clone()
          .setAlpha(K.getAlpha() * v)
          .toRgbString(),
        tableBodySortBg: _,
        tableFixedHeaderSortActiveBg: y,
        tableHeaderFilterActiveBg: $,
        tableFilterDropdownBg: s,
        tableRowHoverBg: _,
        tableSelectedRowBg: S,
        tableSelectedRowHoverBg: n,
        zIndexTableFixed: I,
        zIndexTableSticky: I + 1,
        tableFontSizeMiddle: i,
        tableFontSizeSmall: i,
        tableSelectionColumnWidth: f,
        tableExpandIconBg: s,
        tableExpandColumnWidth: O + 2 * e.padding,
        tableExpandedRowBg: m,
        tableFilterDropdownWidth: 120,
        tableFilterDropdownHeight: 264,
        tableFilterDropdownSearchWidth: 140,
        tableScrollThumbSize: 8,
        tableScrollThumbBg: o,
        tableScrollThumbBgHover: l,
        tableScrollBg: a
      })
    return [
      Xc(F),
      Tc(F),
      Sl(F),
      Hc(F),
      Pc(F),
      bc(F),
      Dc(F),
      kc(F),
      Sl(F),
      wc(F),
      Ac(F),
      Ic(F),
      Vc(F),
      Cc(F),
      zc(F),
      Lc(F),
      Nc(F)
    ]
  }),
  qc = [],
  $a = () => ({
    prefixCls: Ye(),
    columns: He(),
    rowKey: qe([String, Function]),
    tableLayout: Ye(),
    rowClassName: qe([String, Function]),
    title: $e(),
    footer: $e(),
    id: Ye(),
    showHeader: be(),
    components: st(),
    customRow: $e(),
    customHeaderRow: $e(),
    direction: Ye(),
    expandFixed: qe([Boolean, String]),
    expandColumnWidth: Number,
    expandedRowKeys: He(),
    defaultExpandedRowKeys: He(),
    expandedRowRender: $e(),
    expandRowByClick: be(),
    expandIcon: $e(),
    onExpand: $e(),
    onExpandedRowsChange: $e(),
    'onUpdate:expandedRowKeys': $e(),
    defaultExpandAllRows: be(),
    indentSize: Number,
    expandIconColumnIndex: Number,
    showExpandColumn: be(),
    expandedRowClassName: $e(),
    childrenColumnName: Ye(),
    rowExpandable: $e(),
    sticky: qe([Boolean, Object]),
    dropdownPrefixCls: String,
    dataSource: He(),
    pagination: qe([Boolean, Object]),
    loading: qe([Boolean, Object]),
    size: Ye(),
    bordered: be(),
    locale: st(),
    onChange: $e(),
    onResizeColumn: $e(),
    rowSelection: st(),
    getPopupContainer: $e(),
    scroll: st(),
    sortDirections: He(),
    showSorterTooltip: qe([Boolean, Object], !0),
    transformCellText: $e()
  }),
  Yc = pe({
    name: 'InternalTable',
    inheritAttrs: !1,
    props: St(b(b({}, $a()), { contextSlots: st() }), { rowKey: 'key' }),
    setup(e, t) {
      let { attrs: n, slots: o, expose: l, emit: a } = t
      Qe(
        !(typeof e.rowKey == 'function' && e.rowKey.length > 1),
        'Table',
        '`index` parameter of `rowKey` function is deprecated. There is no guarantee that it will work as expected.'
      ),
        ws(k(() => e.contextSlots)),
        $s({
          onResizeColumn: (Y, ve) => {
            a('resizeColumn', Y, ve)
          }
        })
      const r = tr(),
        i = k(() => {
          const Y = new Set(Object.keys(r.value).filter(ve => r.value[ve]))
          return e.columns.filter(
            ve => !ve.responsive || ve.responsive.some(ee => Y.has(ee))
          )
        }),
        {
          size: d,
          renderEmpty: u,
          direction: c,
          prefixCls: f,
          configProvider: m
        } = We('table', e),
        [w, x] = Uc(f),
        v = k(() => {
          var Y
          return (
            e.transformCellText ||
            ((Y = m.transformCellText) === null || Y === void 0
              ? void 0
              : Y.value)
          )
        }),
        [s] = Za('Table', Ja.Table, ze(e, 'locale')),
        p = k(() => e.dataSource || qc),
        $ = k(() => m.getPrefixCls('dropdown', e.dropdownPrefixCls)),
        h = k(() => e.childrenColumnName || 'children'),
        O = k(() =>
          p.value.some(Y => (Y == null ? void 0 : Y[h.value]))
            ? 'nest'
            : e.expandedRowRender
            ? 'row'
            : null
        ),
        C = Ct({ body: null }),
        K = Y => {
          b(C, Y)
        },
        S = k(() =>
          typeof e.rowKey == 'function'
            ? e.rowKey
            : Y => (Y == null ? void 0 : Y[e.rowKey])
        ),
        [I] = hd(p, h, S),
        y = {},
        E = function(Y, ve) {
          let ee =
            arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1
          const { pagination: se, scroll: fe, onChange: Oe } = e,
            de = b(b({}, y), Y)
          ee &&
            (y.resetPagination(),
            de.pagination.current && (de.pagination.current = 1),
            se && se.onChange && se.onChange(1, de.pagination.pageSize)),
            fe &&
              fe.scrollToFirstRowOnChange !== !1 &&
              C.body &&
              Qr(0, { getContainer: () => C.body }),
            Oe == null ||
              Oe(de.pagination, de.filters, de.sorter, {
                currentDataSource: Cl(
                  Wn(p.value, de.sorterStates, h.value),
                  de.filterStates
                ),
                action: ve
              })
        },
        _ = (Y, ve) => {
          E({ sorter: Y, sorterStates: ve }, 'sort', !1)
        },
        [F, T, M, X] = kd({
          prefixCls: f,
          mergedColumns: i,
          onSorterChange: _,
          sortDirections: k(() => e.sortDirections || ['ascend', 'descend']),
          tableLocale: s,
          showSorterTooltip: ze(e, 'showSorterTooltip')
        }),
        q = k(() => Wn(p.value, T.value, h.value)),
        ae = (Y, ve) => {
          E({ filters: Y, filterStates: ve }, 'filter', !0)
        },
        [H, U, j] = pc({
          prefixCls: f,
          locale: s,
          dropdownPrefixCls: $,
          mergedColumns: i,
          onFilterChange: ae,
          getPopupContainer: ze(e, 'getPopupContainer')
        }),
        Z = k(() => Cl(q.value, U.value)),
        [B] = gc(ze(e, 'contextSlots')),
        V = k(() => {
          const Y = {},
            ve = j.value
          return (
            Object.keys(ve).forEach(ee => {
              ve[ee] !== null && (Y[ee] = ve[ee])
            }),
            b(b({}, M.value), { filters: Y })
          )
        }),
        [W] = mc(V),
        ne = (Y, ve) => {
          E(
            {
              pagination: b(b({}, y.pagination), { current: Y, pageSize: ve })
            },
            'paginate'
          )
        },
        [Q, Pe] = md(
          k(() => Z.value.length),
          ze(e, 'pagination'),
          ne
        )
      Ne(() => {
        ;(y.sorter = X.value),
          (y.sorterStates = T.value),
          (y.filters = j.value),
          (y.filterStates = U.value),
          (y.pagination = e.pagination === !1 ? {} : pd(Q.value, e.pagination)),
          (y.resetPagination = Pe)
      })
      const ue = k(() => {
        if (e.pagination === !1 || !Q.value.pageSize) return Z.value
        const { current: Y = 1, total: ve, pageSize: ee = zn } = Q.value
        return (
          Qe(Y > 0, 'Table', '`current` should be positive number.'),
          Z.value.length < ve
            ? Z.value.length > ee
              ? Z.value.slice((Y - 1) * ee, Y * ee)
              : Z.value
            : Z.value.slice((Y - 1) * ee, Y * ee)
        )
      })
      Ne(
        () => {
          et(() => {
            const { total: Y, pageSize: ve = zn } = Q.value
            Z.value.length < Y &&
              Z.value.length > ve &&
              Qe(
                !1,
                'Table',
                '`dataSource` length is less than `pagination.total` but large than `pagination.pageSize`. Please make sure your config correct data with async mode.'
              )
          })
        },
        { flush: 'post' }
      )
      const Ie = k(() =>
          e.showExpandColumn === !1
            ? -1
            : O.value === 'nest' && e.expandIconColumnIndex === void 0
            ? e.rowSelection
              ? 1
              : 0
            : e.expandIconColumnIndex > 0 && e.rowSelection
            ? e.expandIconColumnIndex - 1
            : e.expandIconColumnIndex
        ),
        ge = ce()
      Ee(
        () => e.rowSelection,
        () => {
          ge.value = e.rowSelection ? b({}, e.rowSelection) : e.rowSelection
        },
        { deep: !0, immediate: !0 }
      )
      const [Te, De] = yd(ge, {
          prefixCls: f,
          data: Z,
          pageData: ue,
          getRowKey: S,
          getRecordByKey: I,
          expandType: O,
          childrenColumnName: h,
          locale: s,
          getPopupContainer: k(() => e.getPopupContainer)
        }),
        Ve = (Y, ve, ee) => {
          let se
          const { rowClassName: fe } = e
          return (
            typeof fe == 'function' ? (se = re(fe(Y, ve, ee))) : (se = re(fe)),
            re(
              { [`${f.value}-row-selected`]: De.value.has(S.value(Y, ve)) },
              se
            )
          )
        }
      l({ selectedKeySet: De })
      const _e = k(() => (typeof e.indentSize == 'number' ? e.indentSize : 15)),
        Re = Y => W(Te(H(F(B(Y)))))
      return () => {
        var Y
        const {
          expandIcon: ve = o.expandIcon || hc(s.value),
          pagination: ee,
          loading: se,
          bordered: fe
        } = e
        let Oe, de
        if (ee !== !1 && !((Y = Q.value) === null || Y === void 0) && Y.total) {
          let P
          Q.value.size
            ? (P = Q.value.size)
            : (P =
                d.value === 'small' || d.value === 'middle' ? 'small' : void 0)
          const R = we =>
              g(
                Ar,
                L(
                  L({}, Q.value),
                  {},
                  {
                    class: [
                      `${f.value}-pagination ${f.value}-pagination-${we}`,
                      Q.value.class
                    ],
                    size: P
                  }
                ),
                null
              ),
            oe = c.value === 'rtl' ? 'left' : 'right',
            { position: me } = Q.value
          if (me !== null && Array.isArray(me)) {
            const we = me.find(z => z.includes('top')),
              N = me.find(z => z.includes('bottom')),
              A = me.every(z => `${z}` == 'none')
            !we && !N && !A && (de = R(oe)),
              we && (Oe = R(we.toLowerCase().replace('top', ''))),
              N && (de = R(N.toLowerCase().replace('bottom', '')))
          } else de = R(oe)
        }
        let he
        typeof se == 'boolean'
          ? (he = { spinning: se })
          : typeof se == 'object' && (he = b({ spinning: !0 }, se))
        const Ke = re(
            `${f.value}-wrapper`,
            { [`${f.value}-wrapper-rtl`]: c.value === 'rtl' },
            n.class,
            x.value
          ),
          D = nt(e, ['columns'])
        return w(
          g('div', { class: Ke, style: n.style }, [
            g(Br, L({ spinning: !1 }, he), {
              default: () => [
                Oe,
                g(
                  fd,
                  L(
                    L(L({}, n), D),
                    {},
                    {
                      expandedRowKeys: e.expandedRowKeys,
                      defaultExpandedRowKeys: e.defaultExpandedRowKeys,
                      expandIconColumnIndex: Ie.value,
                      indentSize: _e.value,
                      expandIcon: ve,
                      columns: i.value,
                      direction: c.value,
                      prefixCls: f.value,
                      class: re({
                        [`${f.value}-middle`]: d.value === 'middle',
                        [`${f.value}-small`]: d.value === 'small',
                        [`${f.value}-bordered`]: fe,
                        [`${f.value}-empty`]: p.value.length === 0
                      }),
                      data: ue.value,
                      rowKey: S.value,
                      rowClassName: Ve,
                      internalHooks: Fn,
                      internalRefs: C,
                      onUpdateInternalRefs: K,
                      transformColumns: Re,
                      transformCellText: v.value
                    }
                  ),
                  b(b({}, o), {
                    emptyText: () => {
                      var P, R
                      return (
                        ((P = o.emptyText) === null || P === void 0
                          ? void 0
                          : P.call(o)) ||
                        ((R = e.locale) === null || R === void 0
                          ? void 0
                          : R.emptyText) ||
                        u('Table')
                      )
                    }
                  })
                ),
                de
              ]
            })
          ])
        )
      }
    }
  }),
  Zc = pe({
    name: 'ATable',
    inheritAttrs: !1,
    props: St($a(), { rowKey: 'key' }),
    slots: Object,
    setup(e, t) {
      let { attrs: n, slots: o, expose: l } = t
      const a = ce()
      return (
        l({ table: a }),
        () => {
          var r
          const i =
            e.columns ||
            va((r = o.default) === null || r === void 0 ? void 0 : r.call(o))
          return g(
            Yc,
            L(
              L(L({ ref: a }, n), e),
              {},
              {
                columns: i || [],
                expandedRowRender: o.expandedRowRender || e.expandedRowRender,
                contextSlots: b({}, o)
              }
            ),
            o
          )
        }
      )
    }
  }),
  wn = Zc,
  $n = pe({
    name: 'ATableColumn',
    slots: Object,
    render() {
      return null
    }
  }),
  kn = pe({
    name: 'ATableColumnGroup',
    slots: Object,
    __ANT_TABLE_COLUMN_GROUP: !0,
    render() {
      return null
    }
  }),
  Xn = ed,
  Un = od,
  On = b(ld, { Cell: Un, Row: Xn, name: 'ATableSummary' }),
  Jc = b(wn, {
    SELECTION_ALL: Mn,
    SELECTION_INVERT: Ln,
    SELECTION_NONE: jn,
    SELECTION_COLUMN: vt,
    EXPAND_COLUMN: xt,
    Column: $n,
    ColumnGroup: kn,
    Summary: On,
    install: e => (
      e.component(On.name, On),
      e.component(Un.name, Un),
      e.component(Xn.name, Xn),
      e.component(wn.name, wn),
      e.component($n.name, $n),
      e.component(kn.name, kn),
      e
    )
  })
/**
 * @license lucide-vue-next v0.483.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Qc = Pl('AwardIcon', [
  [
    'path',
    {
      d:
        'm15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526',
      key: '1yiouv'
    }
  ],
  ['circle', { cx: '12', cy: '8', r: '6', key: '1vp47v' }]
])
/**
 * @license lucide-vue-next v0.483.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const eu = Pl('TrophyIcon', [
    ['path', { d: 'M6 9H4.5a2.5 2.5 0 0 1 0-5H6', key: '17hqa7' }],
    ['path', { d: 'M18 9h1.5a2.5 2.5 0 0 0 0-5H18', key: 'lmptdp' }],
    ['path', { d: 'M4 22h16', key: '57wxv0' }],
    [
      'path',
      {
        d: 'M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22',
        key: '1nw9bq'
      }
    ],
    [
      'path',
      {
        d: 'M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22',
        key: '1np0yb'
      }
    ],
    ['path', { d: 'M18 2H6v7a6 6 0 0 0 12 0V2Z', key: 'u46fv3' }]
  ]),
  tu = pe({
    __name: 'TopVendors',
    setup(e) {
      const t = Qa(),
        n = k(() => t.period),
        o = k(() => t.startDate),
        l = k(() => t.endDate),
        a = k(() => {
          var u, c
          return (
            ((c = (u = t.dashboardData) == null ? void 0 : u.data) == null
              ? void 0
              : c.top_vendors) || []
          )
        }),
        r = k(() => t.isLoading),
        i = [
          {
            title: rt().topVendors.table.vendor,
            dataIndex: 'shop_name',
            key: 'shop_name',
            width: '30%',
            customRender: ({ record: u }) => {
              if (!u || !u.shop_name)
                return Ze(
                  Ft,
                  { align: 'center', gap: 'small' },
                  {
                    default: () => [
                      Ze(
                        Oo,
                        {
                          style: {
                            backgroundColor: '#d9d9d9',
                            verticalAlign: 'middle'
                          },
                          size: {
                            xs: 24,
                            sm: 24,
                            md: 32,
                            lg: 32,
                            xl: 32,
                            xxl: 32
                          }
                        },
                        { default: () => '?' }
                      ),
                      Ze('span', rt().topVendors.table.unknownVendor)
                    ]
                  }
                )
              const c = u.shop_name
                  .split(' ')
                  .map(w => w[0])
                  .join('')
                  .toUpperCase(),
                f = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae', '#87d068'],
                m = parseInt(u.vendor_id || '0', 10) % f.length
              return Ze(
                Ft,
                { align: 'center', gap: 'small' },
                {
                  default: () => [
                    Ze(
                      Oo,
                      {
                        style: {
                          backgroundColor: f[m],
                          verticalAlign: 'middle'
                        },
                        size: {
                          xs: 24,
                          sm: 24,
                          md: 32,
                          lg: 32,
                          xl: 32,
                          xxl: 32
                        },
                        src: u.avatar
                      },
                      { default: () => c }
                    ),
                    Ze('span', u.shop_name)
                  ]
                }
              )
            }
          },
          {
            title: rt().topVendors.table.revenue,
            dataIndex: 'total_revenue',
            key: 'total_revenue',
            customRender: ({ value: u }) => ko(u),
            sorter: (u, c) => u.total_revenue - c.total_revenue
          },
          {
            title: rt().topVendors.table.orders,
            dataIndex: 'total_orders',
            key: 'total_orders',
            sorter: (u, c) => u.total_orders - c.total_orders
          },
          {
            title: rt().topVendors.table.commissions,
            dataIndex: 'total_commission',
            key: 'total_commission',
            customRender: ({ value: u }) => ko(u),
            sorter: (u, c) => u.total_commission - c.total_commission
          }
        ]
      window.wcv_dashboard_data.is_rating_active === 'true' &&
        i.push({
          title: rt().topVendors.table.rating,
          dataIndex: 'rating',
          key: 'rating',
          responsive: ['md'],
          customRender: ({ value: u }) => {
            const c = u
            return Ze(
              Ft,
              { align: 'center', gap: 'small' },
              {
                default: () => [
                  Ze(Qc, { size: 16, style: { color: '#faad14' } }),
                  Ze('span', null, c)
                ]
              }
            )
          },
          sorter: (u, c) => u.rating - c.rating
        })
      const d = k(() =>
        n.value.value === 'custom'
          ? o.value && l.value
            ? `${o.value} - ${l.value}`
            : rt().topVendors.custom
          : n.value.label
      )
      return (u, c) => (
        La(),
        ja(
          at(Dr),
          { class: 'vendors-card', loading: r.value, bordered: !1 },
          {
            title: $t(() => [
              g(
                at(Ft),
                { align: 'center', gap: 'small' },
                {
                  default: $t(() => [
                    g(at(eu), { color: '#1668dc', size: 24 }),
                    g(
                      at(To).Title,
                      { level: 5, style: { margin: '0' } },
                      {
                        default: $t(() => [
                          Pn(pn(at(rt)().topVendors.title), 1)
                        ]),
                        _: 1
                      }
                    )
                  ]),
                  _: 1
                }
              )
            ]),
            extra: $t(() => [
              g(
                at(Ft),
                { align: 'center', gap: 'small', justify: 'end' },
                {
                  default: $t(() => [
                    g(
                      at(To).Text,
                      { type: 'secondary' },
                      {
                        default: $t(() => [
                          Pn(pn(at(rt)().period + ': ') + ' ' + pn(d.value), 1)
                        ]),
                        _: 1
                      }
                    )
                  ]),
                  _: 1
                }
              )
            ]),
            default: $t(() => [
              g(
                at(Jc),
                {
                  'data-source': a.value,
                  columns: i,
                  pagination: !1,
                  'row-key': f => f.vendor_id,
                  loading: r.value,
                  locale: {
                    emptyText: Ze('div', { class: 'empty-table' }, [
                      Ze('p', at(rt)().topVendors.noData)
                    ])
                  },
                  size: 'middle'
                },
                null,
                8,
                ['data-source', 'row-key', 'loading', 'locale']
              )
            ]),
            _: 1
          },
          8,
          ['loading']
        )
      )
    }
  })
const mu = er(tu, [['__scopeId', 'data-v-3569c024']])
export { mu as default }

import {
  k as Ve,
  o as nt,
  P as me,
  l as pe,
  _ as m,
  Z as Pr,
  g as Dt,
  m as Rt,
  r as Je,
  j as Sn,
  a as qe,
  b as j,
  e as ae,
  v as vl,
  n as Kt,
  T as Vn,
  a3 as Pt,
  a1 as $n,
  h as ye,
  s as Xe,
  q as je,
  D as Ft,
  p as gl,
  f as Xn,
  A as Ze,
  O as At,
  N as Ir,
  av as kr,
  aa as hl,
  aw as Er,
  w as Tr,
  x as Kr,
  H as Dr,
  t as mo,
  $ as Rr,
  ax as yo,
  i as Nr,
  a4 as Br,
  ab as _r
} from '../main.491ba5c0.js'
import {
  s as oe,
  q as ot,
  z as Gn,
  k as Ne,
  d as ge,
  e as O,
  c as g,
  r as ve,
  j as Ee,
  f as Ge,
  p as Ue,
  n as dt,
  g as ml,
  y as gt,
  v as Un,
  l as mt,
  Z as qn,
  a4 as Fe,
  i as Xt,
  T as Ar,
  F as ht,
  ac as zr,
  W as dn,
  a0 as Fr,
  a5 as Mr,
  a2 as jr,
  D as bo,
  a3 as Lr
} from './vendor.84fc1123.js'
import {
  w as $t,
  ap as Hr,
  i as wn,
  Y as Wr,
  b9 as Vr,
  ba as Xr,
  aN as Gr,
  aK as Ur,
  aJ as qr,
  aM as Yr,
  aL as Jr,
  f as xo,
  p as Qr,
  E as Zr,
  B as Mt,
  c as ea,
  H as Jt,
  g as Qe,
  e as Qt,
  bb as ta,
  o as Nt,
  D as na,
  an as on,
  al as yl,
  aj as bl,
  aw as Yn,
  aX as xl,
  bc as oa,
  bd as Co,
  l as la,
  be as ra,
  aI as aa,
  L as So,
  m as ia,
  bf as sa,
  bg as ca,
  bh as Jn,
  aZ as da,
  F as St,
  R as Cl,
  bi as $o,
  G as wo,
  b as wt,
  bj as ua,
  aB as fa,
  j as pa,
  M as Zt,
  n as va,
  K as pt,
  ai as ga,
  ag as ha,
  aE as ma,
  k as ya
} from './VendorStore.d737faa9.js'
import { S as ba } from './index.e3da6296.js'
import {
  J as xa,
  K as Ca,
  M as Sa,
  N as $a,
  O as wa,
  V as Oa,
  W as Pa,
  X as Ia,
  Y as ka,
  _ as Ea,
  $ as Ta,
  T as zt
} from './antd.7f3c63f7.js'
import {
  b as Oo,
  s as Sl,
  S as en,
  D as Ka,
  a as Da,
  c as Ra,
  L as Na
} from './index.109b4b21.js'
import { u as Ba } from './responsiveObserve.eb3c0da1.js'
import { i as yt } from './initDefaultProps.71991ecc.js'
function _a(e, t, n, o) {
  const l = n - t
  return (
    (e /= o / 2),
    e < 1 ? (l / 2) * e * e * e + t : (l / 2) * ((e -= 2) * e * e + 2) + t
  )
}
function On(e) {
  return e != null && e === e.window
}
function Aa(e, t) {
  var n, o
  if (typeof window > 'u') return 0
  const l = t ? 'scrollTop' : 'scrollLeft'
  let r = 0
  return (
    On(e)
      ? (r = e[t ? 'scrollY' : 'scrollX'])
      : e instanceof Document
      ? (r = e.documentElement[l])
      : (e instanceof HTMLElement || e) && (r = e[l]),
    e &&
      !On(e) &&
      typeof r != 'number' &&
      (r =
        (o = ((n = e.ownerDocument) !== null && n !== void 0 ? n : e)
          .documentElement) === null || o === void 0
          ? void 0
          : o[l]),
    r
  )
}
function za(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}
  const { getContainer: n = () => window, callback: o, duration: l = 450 } = t,
    r = n(),
    a = Aa(r, !0),
    i = Date.now(),
    s = () => {
      const d = Date.now() - i,
        u = _a(d > l ? l : d, a, e, l)
      On(r)
        ? r.scrollTo(window.scrollX, u)
        : r instanceof Document
        ? (r.documentElement.scrollTop = u)
        : (r.scrollTop = u),
        d < l ? $t(s) : typeof o == 'function' && o()
    }
  $t(s)
}
var Fa = /\s/
function Ma(e) {
  for (var t = e.length; t-- && Fa.test(e.charAt(t)); );
  return t
}
var ja = /^\s+/
function La(e) {
  return e && e.slice(0, Ma(e) + 1).replace(ja, '')
}
var Po = 0 / 0,
  Ha = /^[-+]0x[0-9a-f]+$/i,
  Wa = /^0b[01]+$/i,
  Va = /^0o[0-7]+$/i,
  Xa = parseInt
function Io(e) {
  if (typeof e == 'number') return e
  if (Hr(e)) return Po
  if (wn(e)) {
    var t = typeof e.valueOf == 'function' ? e.valueOf() : e
    e = wn(t) ? t + '' : t
  }
  if (typeof e != 'string') return e === 0 ? e : +e
  e = La(e)
  var n = Wa.test(e)
  return n || Va.test(e) ? Xa(e.slice(2), n ? 2 : 8) : Ha.test(e) ? Po : +e
}
var Ga = function() {
  return Wr.Date.now()
}
const un = Ga
var Ua = 'Expected a function',
  qa = Math.max,
  Ya = Math.min
function Ja(e, t, n) {
  var o,
    l,
    r,
    a,
    i,
    s,
    f = 0,
    d = !1,
    u = !1,
    y = !0
  if (typeof e != 'function') throw new TypeError(Ua)
  ;(t = Io(t) || 0),
    wn(n) &&
      ((d = !!n.leading),
      (u = 'maxWait' in n),
      (r = u ? qa(Io(n.maxWait) || 0, t) : r),
      (y = 'trailing' in n ? !!n.trailing : y))
  function x(k) {
    var P = o,
      T = l
    return (o = l = void 0), (f = k), (a = e.apply(T, P)), a
  }
  function b(k) {
    return (f = k), (i = setTimeout(v, t)), d ? x(k) : a
  }
  function p(k) {
    var P = k - s,
      T = k - f,
      C = t - P
    return u ? Ya(C, r - T) : C
  }
  function c(k) {
    var P = k - s,
      T = k - f
    return s === void 0 || P >= t || P < 0 || (u && T >= r)
  }
  function v() {
    var k = un()
    if (c(k)) return S(k)
    i = setTimeout(v, p(k))
  }
  function S(k) {
    return (i = void 0), y && o ? x(k) : ((o = l = void 0), a)
  }
  function h() {
    i !== void 0 && clearTimeout(i), (f = 0), (o = s = l = i = void 0)
  }
  function $() {
    return i === void 0 ? a : S(un())
  }
  function w() {
    var k = un(),
      P = c(k)
    if (((o = arguments), (l = this), (s = k), P)) {
      if (i === void 0) return b(s)
      if (u) return clearTimeout(i), (i = setTimeout(v, t)), x(s)
    }
    return i === void 0 && (i = setTimeout(v, t)), a
  }
  return (w.cancel = h), (w.flush = $), w
}
function Qa(e) {
  for (var t = -1, n = e == null ? 0 : e.length, o = {}; ++t < n; ) {
    var l = e[t]
    o[l[0]] = l[1]
  }
  return o
}
function $l() {
  const e = oe({})
  let t = null
  const n = Ba()
  return (
    ot(() => {
      t = n.value.subscribe(o => {
        e.value = o
      })
    }),
    Gn(() => {
      n.value.unsubscribe(t)
    }),
    e
  )
}
function Ye(e) {
  const t = oe()
  return (
    Ne(
      () => {
        t.value = e()
      },
      { flush: 'sync' }
    ),
    t
  )
}
const wl = () => ({
    arrow: Ve([Boolean, Object]),
    trigger: { type: [Array, String] },
    menu: nt(),
    overlay: me.any,
    visible: pe(),
    open: pe(),
    disabled: pe(),
    danger: pe(),
    autofocus: pe(),
    align: nt(),
    getPopupContainer: Function,
    prefixCls: String,
    transitionName: String,
    placement: String,
    overlayClassName: String,
    overlayStyle: nt(),
    forceRender: pe(),
    mouseEnterDelay: Number,
    mouseLeaveDelay: Number,
    openClassName: String,
    minOverlayWidthMatchTrigger: pe(),
    destroyPopupOnHide: pe(),
    onVisibleChange: { type: Function },
    'onUpdate:visible': { type: Function },
    onOpenChange: { type: Function },
    'onUpdate:open': { type: Function }
  }),
  fn = Vr(),
  Za = () =>
    m(m({}, wl()), {
      type: fn.type,
      size: String,
      htmlType: fn.htmlType,
      href: String,
      disabled: pe(),
      prefixCls: String,
      icon: me.any,
      title: String,
      loading: fn.loading,
      onClick: Pr()
    }),
  ei = e => {
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
  ti = ei,
  ni = e => {
    const {
        componentCls: t,
        menuCls: n,
        colorError: o,
        colorTextLightSolid: l
      } = e,
      r = `${n}-item`
    return {
      [`${t}, ${t}-menu-submenu`]: {
        [`${n} ${r}`]: {
          [`&${r}-danger:not(${r}-disabled)`]: {
            color: o,
            '&:hover': { color: l, backgroundColor: o }
          }
        }
      }
    }
  },
  oi = ni,
  li = e => {
    const {
      componentCls: t,
      menuCls: n,
      zIndexPopup: o,
      dropdownArrowDistance: l,
      dropdownArrowOffset: r,
      sizePopupArrow: a,
      antCls: i,
      iconCls: s,
      motionDurationMid: f,
      dropdownPaddingVertical: d,
      fontSize: u,
      dropdownEdgeChildPadding: y,
      colorTextDisabled: x,
      fontSizeIcon: b,
      controlPaddingHorizontal: p,
      colorBgElevated: c,
      boxShadowPopoverArrow: v
    } = e
    return [
      {
        [t]: m(m({}, Je(e)), {
          position: 'absolute',
          top: -9999,
          left: { _skip_check_: !0, value: -9999 },
          zIndex: o,
          display: 'block',
          '&::before': {
            position: 'absolute',
            insetBlock: -l + a / 2,
            zIndex: -9999,
            opacity: 1e-4,
            content: '""'
          },
          [`${t}-wrap`]: {
            position: 'relative',
            [`${i}-btn > ${s}-down`]: { fontSize: b },
            [`${s}-down::before`]: { transition: `transform ${f}` }
          },
          [`${t}-wrap-open`]: {
            [`${s}-down::before`]: { transform: 'rotate(180deg)' }
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
          [`${t}-arrow`]: m(
            { position: 'absolute', zIndex: 1, display: 'block' },
            Gr(a, e.borderRadiusXS, e.borderRadiusOuter, c, v)
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
            left: { _skip_check_: !0, value: r }
          },
          [`&-placement-topRight > ${t}-arrow`]: {
            right: { _skip_check_: !0, value: r }
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
            left: { _skip_check_: !0, value: r }
          },
          [`&-placement-bottomRight > ${t}-arrow`]: {
            right: { _skip_check_: !0, value: r }
          },
          [`&${i}-slide-down-enter${i}-slide-down-enter-active${t}-placement-bottomLeft,
          &${i}-slide-down-appear${i}-slide-down-appear-active${t}-placement-bottomLeft,
          &${i}-slide-down-enter${i}-slide-down-enter-active${t}-placement-bottom,
          &${i}-slide-down-appear${i}-slide-down-appear-active${t}-placement-bottom,
          &${i}-slide-down-enter${i}-slide-down-enter-active${t}-placement-bottomRight,
          &${i}-slide-down-appear${i}-slide-down-appear-active${t}-placement-bottomRight`]: {
            animationName: Ur
          },
          [`&${i}-slide-up-enter${i}-slide-up-enter-active${t}-placement-topLeft,
          &${i}-slide-up-appear${i}-slide-up-appear-active${t}-placement-topLeft,
          &${i}-slide-up-enter${i}-slide-up-enter-active${t}-placement-top,
          &${i}-slide-up-appear${i}-slide-up-appear-active${t}-placement-top,
          &${i}-slide-up-enter${i}-slide-up-enter-active${t}-placement-topRight,
          &${i}-slide-up-appear${i}-slide-up-appear-active${t}-placement-topRight`]: {
            animationName: qr
          },
          [`&${i}-slide-down-leave${i}-slide-down-leave-active${t}-placement-bottomLeft,
          &${i}-slide-down-leave${i}-slide-down-leave-active${t}-placement-bottom,
          &${i}-slide-down-leave${i}-slide-down-leave-active${t}-placement-bottomRight`]: {
            animationName: Yr
          },
          [`&${i}-slide-up-leave${i}-slide-up-leave-active${t}-placement-topLeft,
          &${i}-slide-up-leave${i}-slide-up-leave-active${t}-placement-top,
          &${i}-slide-up-leave${i}-slide-up-leave-active${t}-placement-topRight`]: {
            animationName: Jr
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
          [n]: m(
            m(
              {
                padding: y,
                listStyleType: 'none',
                backgroundColor: c,
                backgroundClip: 'padding-box',
                borderRadius: e.borderRadiusLG,
                outline: 'none',
                boxShadow: e.boxShadowSecondary
              },
              Sn(e)
            ),
            {
              [`${n}-item-group-title`]: {
                padding: `${d}px ${p}px`,
                color: e.colorTextDescription,
                transition: `all ${f}`
              },
              [`${n}-item`]: {
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                borderRadius: e.borderRadiusSM
              },
              [`${n}-item-icon`]: {
                minWidth: u,
                marginInlineEnd: e.marginXS,
                fontSize: e.fontSizeSM
              },
              [`${n}-title-content`]: {
                flex: 'auto',
                '> a': {
                  color: 'inherit',
                  transition: `all ${f}`,
                  '&:hover': { color: 'inherit' },
                  '&::after': { position: 'absolute', inset: 0, content: '""' }
                }
              },
              [`${n}-item, ${n}-submenu-title`]: m(
                m(
                  {
                    clear: 'both',
                    margin: 0,
                    padding: `${d}px ${p}px`,
                    color: e.colorText,
                    fontWeight: 'normal',
                    fontSize: u,
                    lineHeight: e.lineHeight,
                    cursor: 'pointer',
                    transition: `all ${f}`,
                    '&:hover, &-active': {
                      backgroundColor: e.controlItemBgHover
                    }
                  },
                  Sn(e)
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
                    color: x,
                    cursor: 'not-allowed',
                    '&:hover': {
                      color: x,
                      backgroundColor: c,
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
                      fontSize: b,
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
              [`${n}-submenu-title`]: { paddingInlineEnd: p + e.fontSizeSM },
              [`${n}-submenu-vertical`]: { position: 'relative' },
              [`${n}-submenu${n}-submenu-disabled ${t}-menu-submenu-title`]: {
                [`&, ${t}-menu-submenu-arrow-icon`]: {
                  color: x,
                  backgroundColor: c,
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
        xo(e, 'slide-up'),
        xo(e, 'slide-down'),
        Oo(e, 'move-up'),
        Oo(e, 'move-down'),
        Qr(e, 'zoom-big')
      ]
    ]
  },
  Ol = Dt(
    'Dropdown',
    (e, t) => {
      let { rootPrefixCls: n } = t
      const {
          marginXXS: o,
          sizePopupArrow: l,
          controlHeight: r,
          fontSize: a,
          lineHeight: i,
          paddingXXS: s,
          componentCls: f,
          borderRadiusOuter: d,
          borderRadiusLG: u
        } = e,
        y = (r - a * i) / 2,
        { dropdownArrowOffset: x } = Xr({
          sizePopupArrow: l,
          contentRadius: u,
          borderRadiusOuter: d
        }),
        b = Rt(e, {
          menuCls: `${f}-menu`,
          rootPrefixCls: n,
          dropdownArrowDistance: l / 2 + o,
          dropdownArrowOffset: x,
          dropdownPaddingVertical: y,
          dropdownEdgeChildPadding: s
        })
      return [li(b), ti(b), oi(b)]
    },
    e => ({ zIndexPopup: e.zIndexPopupBase + 50 })
  )
var ri =
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
const ai = Mt.Group,
  tn = ge({
    compatConfig: { MODE: 3 },
    name: 'ADropdownButton',
    inheritAttrs: !1,
    __ANT_BUTTON: !0,
    props: yt(Za(), {
      trigger: 'hover',
      placement: 'bottomRight',
      type: 'default'
    }),
    slots: Object,
    setup(e, t) {
      let { slots: n, attrs: o, emit: l } = t
      const r = y => {
          l('update:visible', y),
            l('visibleChange', y),
            l('update:open', y),
            l('openChange', y)
        },
        { prefixCls: a, direction: i, getPopupContainer: s } = qe(
          'dropdown',
          e
        ),
        f = O(() => `${a.value}-button`),
        [d, u] = Ol(a)
      return () => {
        var y, x
        const b = m(m({}, e), o),
          {
            type: p = 'default',
            disabled: c,
            danger: v,
            loading: S,
            htmlType: h,
            class: $ = '',
            overlay: w = (y = n.overlay) === null || y === void 0
              ? void 0
              : y.call(n),
            trigger: k,
            align: P,
            open: T,
            visible: C,
            onVisibleChange: E,
            placement: R = i.value === 'rtl' ? 'bottomLeft' : 'bottomRight',
            href: A,
            title: F,
            icon: U = ((x = n.icon) === null || x === void 0
              ? void 0
              : x.call(n)) || g(Zr, null, null),
            mouseEnterDelay: ee,
            mouseLeaveDelay: re,
            overlayClassName: ie,
            overlayStyle: V,
            destroyPopupOnHide: Q,
            onClick: L,
            'onUpdate:open': Z
          } = b,
          _ = ri(b, [
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
          H = {
            align: P,
            disabled: c,
            trigger: c ? [] : k,
            placement: R,
            getPopupContainer: s == null ? void 0 : s.value,
            onOpenChange: r,
            mouseEnterDelay: ee,
            mouseLeaveDelay: re,
            open: T ?? C,
            overlayClassName: ie,
            overlayStyle: V,
            destroyPopupOnHide: Q
          },
          M = g(
            Mt,
            {
              danger: v,
              type: p,
              disabled: c,
              loading: S,
              onClick: L,
              htmlType: h,
              href: A,
              title: F
            },
            { default: n.default }
          ),
          q = g(Mt, { danger: v, type: p, icon: U }, null)
        return d(
          g(ai, j(j({}, _), {}, { class: ae(f.value, $, u.value) }), {
            default: () => [
              n.leftButton ? n.leftButton({ button: M }) : M,
              g(Ot, H, {
                default: () => [
                  n.rightButton ? n.rightButton({ button: q }) : q
                ],
                overlay: () => w
              })
            ]
          })
        )
      }
    }
  }),
  Pl = ge({
    compatConfig: { MODE: 3 },
    name: 'ADropdown',
    inheritAttrs: !1,
    props: yt(wl(), {
      mouseEnterDelay: 0.15,
      mouseLeaveDelay: 0.1,
      placement: 'bottomLeft',
      trigger: 'hover'
    }),
    slots: Object,
    setup(e, t) {
      let { slots: n, attrs: o, emit: l } = t
      const {
          prefixCls: r,
          rootPrefixCls: a,
          direction: i,
          getPopupContainer: s
        } = qe('dropdown', e),
        [f, d] = Ol(r),
        u = O(() => {
          const { placement: c = '', transitionName: v } = e
          return v !== void 0
            ? v
            : c.includes('top')
            ? `${a.value}-slide-down`
            : `${a.value}-slide-up`
        })
      ea({
        prefixCls: O(() => `${r.value}-menu`),
        expandIcon: O(() =>
          g('span', { class: `${r.value}-menu-submenu-arrow` }, [
            g(Jt, { class: `${r.value}-menu-submenu-arrow-icon` }, null)
          ])
        ),
        mode: O(() => 'vertical'),
        selectable: O(() => !1),
        onClick: () => {},
        validator: c => {
          vl()
        }
      })
      const y = () => {
          var c, v, S
          const h =
              e.overlay ||
              ((c = n.overlay) === null || c === void 0 ? void 0 : c.call(n)),
            $ = Array.isArray(h) ? h[0] : h
          if (!$) return null
          const w = $.props || {}
          Qe(
            !w.mode || w.mode === 'vertical',
            'Dropdown',
            `mode="${w.mode}" is not supported for Dropdown's Menu.`
          )
          const {
              selectable: k = !1,
              expandIcon: P = (S =
                (v = $.children) === null || v === void 0
                  ? void 0
                  : v.expandIcon) === null || S === void 0
                ? void 0
                : S.call(v)
            } = w,
            T =
              typeof P < 'u' && Kt(P)
                ? P
                : g('span', { class: `${r.value}-menu-submenu-arrow` }, [
                    g(Jt, { class: `${r.value}-menu-submenu-arrow-icon` }, null)
                  ])
          return Kt($)
            ? Qt($, { mode: 'vertical', selectable: k, expandIcon: () => T })
            : $
        },
        x = O(() => {
          const c = e.placement
          if (!c) return i.value === 'rtl' ? 'bottomRight' : 'bottomLeft'
          if (c.includes('Center')) {
            const v = c.slice(0, c.indexOf('Center'))
            return (
              Qe(
                !c.includes('Center'),
                'Dropdown',
                `You are using '${c}' placement in Dropdown, which is deprecated. Try to use '${v}' instead.`
              ),
              v
            )
          }
          return c
        }),
        b = O(() => (typeof e.visible == 'boolean' ? e.visible : e.open)),
        p = c => {
          l('update:visible', c),
            l('visibleChange', c),
            l('update:open', c),
            l('openChange', c)
        }
      return () => {
        var c, v
        const { arrow: S, trigger: h, disabled: $, overlayClassName: w } = e,
          k = (c = n.default) === null || c === void 0 ? void 0 : c.call(n)[0],
          P = Qt(
            k,
            m(
              {
                class: ae(
                  (v = k == null ? void 0 : k.props) === null || v === void 0
                    ? void 0
                    : v.class,
                  { [`${r.value}-rtl`]: i.value === 'rtl' },
                  `${r.value}-trigger`
                )
              },
              $ ? { disabled: $ } : {}
            )
          ),
          T = ae(w, d.value, { [`${r.value}-rtl`]: i.value === 'rtl' }),
          C = $ ? [] : h
        let E
        C && C.includes('contextmenu') && (E = !0)
        const R = ta({
            arrowPointAtCenter: typeof S == 'object' && S.pointAtCenter,
            autoAdjustOverflow: !0
          }),
          A = Nt(
            m(m(m({}, e), o), {
              visible: b.value,
              builtinPlacements: R,
              overlayClassName: T,
              arrow: !!S,
              alignPoint: E,
              prefixCls: r.value,
              getPopupContainer: s == null ? void 0 : s.value,
              transitionName: u.value,
              trigger: C,
              onVisibleChange: p,
              placement: x.value
            }),
            ['overlay', 'onUpdate:visible']
          )
        return f(g(na, A, { default: () => [P], overlay: y }))
      }
    }
  })
Pl.Button = tn
const Ot = Pl
var ii =
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
const si = {
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
    value: me.any,
    required: Boolean
  },
  Il = ge({
    compatConfig: { MODE: 3 },
    name: 'Checkbox',
    inheritAttrs: !1,
    props: yt(si, {
      prefixCls: 'rc-checkbox',
      type: 'checkbox',
      defaultChecked: !1
    }),
    emits: ['click', 'change'],
    setup(e, t) {
      let { attrs: n, emit: o, expose: l } = t
      const r = ve(e.checked === void 0 ? e.defaultChecked : e.checked),
        a = ve()
      Ee(
        () => e.checked,
        () => {
          r.value = e.checked
        }
      ),
        l({
          focus() {
            var d
            ;(d = a.value) === null || d === void 0 || d.focus()
          },
          blur() {
            var d
            ;(d = a.value) === null || d === void 0 || d.blur()
          }
        })
      const i = ve(),
        s = d => {
          if (e.disabled) return
          e.checked === void 0 && (r.value = d.target.checked),
            (d.shiftKey = i.value)
          const u = {
            target: m(m({}, e), { checked: d.target.checked }),
            stopPropagation() {
              d.stopPropagation()
            },
            preventDefault() {
              d.preventDefault()
            },
            nativeEvent: d
          }
          e.checked !== void 0 && (a.value.checked = !!e.checked),
            o('change', u),
            (i.value = !1)
        },
        f = d => {
          o('click', d), (i.value = d.shiftKey)
        }
      return () => {
        const {
            prefixCls: d,
            name: u,
            id: y,
            type: x,
            disabled: b,
            readonly: p,
            tabindex: c,
            autofocus: v,
            value: S,
            required: h
          } = e,
          $ = ii(e, [
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
            class: w,
            onFocus: k,
            onBlur: P,
            onKeydown: T,
            onKeypress: C,
            onKeyup: E
          } = n,
          R = m(m({}, $), n),
          A = Object.keys(R).reduce(
            (ee, re) => (
              (re.startsWith('data-') ||
                re.startsWith('aria-') ||
                re === 'role') &&
                (ee[re] = R[re]),
              ee
            ),
            {}
          ),
          F = ae(d, w, { [`${d}-checked`]: r.value, [`${d}-disabled`]: b }),
          U = m(
            m(
              {
                name: u,
                id: y,
                type: x,
                readonly: p,
                disabled: b,
                tabindex: c,
                class: `${d}-input`,
                checked: !!r.value,
                autofocus: v,
                value: S
              },
              A
            ),
            {
              onChange: s,
              onClick: f,
              onFocus: k,
              onBlur: P,
              onKeydown: T,
              onKeypress: C,
              onKeyup: E,
              required: h
            }
          )
        return g('span', { class: F }, [
          g('input', j({ ref: a }, U), null),
          g('span', { class: `${d}-inner` }, null)
        ])
      }
    }
  }),
  kl = Symbol('radioGroupContextKey'),
  ci = e => {
    Ue(kl, e)
  },
  di = () => Ge(kl, void 0),
  El = Symbol('radioOptionTypeContextKey'),
  ui = e => {
    Ue(El, e)
  },
  fi = () => Ge(El, void 0),
  pi = new Vn('antRadioEffect', {
    '0%': { transform: 'scale(1)', opacity: 0.5 },
    '100%': { transform: 'scale(1.6)', opacity: 0 }
  }),
  vi = e => {
    const { componentCls: t, antCls: n } = e,
      o = `${t}-group`
    return {
      [o]: m(m({}, Je(e)), {
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
  gi = e => {
    const {
        componentCls: t,
        radioWrapperMarginRight: n,
        radioCheckedColor: o,
        radioSize: l,
        motionDurationSlow: r,
        motionDurationMid: a,
        motionEaseInOut: i,
        motionEaseInOutCirc: s,
        radioButtonBg: f,
        colorBorder: d,
        lineWidth: u,
        radioDotSize: y,
        colorBgContainerDisabled: x,
        colorTextDisabled: b,
        paddingXS: p,
        radioDotDisabledColor: c,
        lineType: v,
        radioDotDisabledSize: S,
        wireframe: h,
        colorWhite: $
      } = e,
      w = `${t}-inner`
    return {
      [`${t}-wrapper`]: m(m({}, Je(e)), {
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
          border: `${u}px ${v} ${o}`,
          borderRadius: '50%',
          visibility: 'hidden',
          animationName: pi,
          animationDuration: r,
          animationTimingFunction: i,
          animationFillMode: 'both',
          content: '""'
        },
        [t]: m(m({}, Je(e)), {
          position: 'relative',
          display: 'inline-block',
          outline: 'none',
          cursor: 'pointer',
          alignSelf: 'center'
        }),
        [`${t}-wrapper:hover &,
        &:hover ${w}`]: { borderColor: o },
        [`${t}-input:focus-visible + ${w}`]: m({}, Pt(e)),
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
            backgroundColor: h ? o : $,
            borderBlockStart: 0,
            borderInlineStart: 0,
            borderRadius: l,
            transform: 'scale(0)',
            opacity: 0,
            transition: `all ${r} ${s}`,
            content: '""'
          },
          boxSizing: 'border-box',
          position: 'relative',
          insetBlockStart: 0,
          insetInlineStart: 0,
          display: 'block',
          width: l,
          height: l,
          backgroundColor: f,
          borderColor: d,
          borderStyle: 'solid',
          borderWidth: u,
          borderRadius: '50%',
          transition: `all ${a}`
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
          [w]: {
            borderColor: o,
            backgroundColor: h ? f : o,
            '&::after': {
              transform: `scale(${y / l})`,
              opacity: 1,
              transition: `all ${r} ${s}`
            }
          }
        },
        [`${t}-disabled`]: {
          cursor: 'not-allowed',
          [w]: {
            backgroundColor: x,
            borderColor: d,
            cursor: 'not-allowed',
            '&::after': { backgroundColor: c }
          },
          [`${t}-input`]: { cursor: 'not-allowed' },
          [`${t}-disabled + span`]: { color: b, cursor: 'not-allowed' },
          [`&${t}-checked`]: {
            [w]: { '&::after': { transform: `scale(${S / l})` } }
          }
        },
        [`span${t} + *`]: { paddingInlineStart: p, paddingInlineEnd: p }
      })
    }
  },
  hi = e => {
    const {
      radioButtonColor: t,
      controlHeight: n,
      componentCls: o,
      lineWidth: l,
      lineType: r,
      colorBorder: a,
      motionDurationSlow: i,
      motionDurationMid: s,
      radioButtonPaddingHorizontal: f,
      fontSize: d,
      radioButtonBg: u,
      fontSizeLG: y,
      controlHeightLG: x,
      controlHeightSM: b,
      paddingXS: p,
      borderRadius: c,
      borderRadiusSM: v,
      borderRadiusLG: S,
      radioCheckedColor: h,
      radioButtonCheckedBg: $,
      radioButtonHoverColor: w,
      radioButtonActiveColor: k,
      radioSolidCheckedColor: P,
      colorTextDisabled: T,
      colorBgContainerDisabled: C,
      radioDisabledButtonCheckedColor: E,
      radioDisabledButtonCheckedBg: R
    } = e
    return {
      [`${o}-button-wrapper`]: {
        position: 'relative',
        display: 'inline-block',
        height: n,
        margin: 0,
        paddingInline: f,
        paddingBlock: 0,
        color: t,
        fontSize: d,
        lineHeight: `${n - l * 2}px`,
        background: u,
        border: `${l}px ${r} ${a}`,
        borderBlockStartWidth: l + 0.02,
        borderInlineStartWidth: 0,
        borderInlineEndWidth: l,
        cursor: 'pointer',
        transition: [
          `color ${s}`,
          `background ${s}`,
          `border-color ${s}`,
          `box-shadow ${s}`
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
            backgroundColor: a,
            transition: `background-color ${i}`,
            content: '""'
          }
        },
        '&:first-child': {
          borderInlineStart: `${l}px ${r} ${a}`,
          borderStartStartRadius: c,
          borderEndStartRadius: c
        },
        '&:last-child': { borderStartEndRadius: c, borderEndEndRadius: c },
        '&:first-child:last-child': { borderRadius: c },
        [`${o}-group-large &`]: {
          height: x,
          fontSize: y,
          lineHeight: `${x - l * 2}px`,
          '&:first-child': {
            borderStartStartRadius: S,
            borderEndStartRadius: S
          },
          '&:last-child': { borderStartEndRadius: S, borderEndEndRadius: S }
        },
        [`${o}-group-small &`]: {
          height: b,
          paddingInline: p - l,
          paddingBlock: 0,
          lineHeight: `${b - l * 2}px`,
          '&:first-child': {
            borderStartStartRadius: v,
            borderEndStartRadius: v
          },
          '&:last-child': { borderStartEndRadius: v, borderEndEndRadius: v }
        },
        '&:hover': { position: 'relative', color: h },
        '&:has(:focus-visible)': m({}, Pt(e)),
        [`${o}-inner, input[type='checkbox'], input[type='radio']`]: {
          width: 0,
          height: 0,
          opacity: 0,
          pointerEvents: 'none'
        },
        [`&-checked:not(${o}-button-wrapper-disabled)`]: {
          zIndex: 1,
          color: h,
          background: $,
          borderColor: h,
          '&::before': { backgroundColor: h },
          '&:first-child': { borderColor: h },
          '&:hover': {
            color: w,
            borderColor: w,
            '&::before': { backgroundColor: w }
          },
          '&:active': {
            color: k,
            borderColor: k,
            '&::before': { backgroundColor: k }
          }
        },
        [`${o}-group-solid &-checked:not(${o}-button-wrapper-disabled)`]: {
          color: P,
          background: h,
          borderColor: h,
          '&:hover': { color: P, background: w, borderColor: w },
          '&:active': { color: P, background: k, borderColor: k }
        },
        '&-disabled': {
          color: T,
          backgroundColor: C,
          borderColor: a,
          cursor: 'not-allowed',
          '&:first-child, &:hover': {
            color: T,
            backgroundColor: C,
            borderColor: a
          }
        },
        [`&-disabled${o}-button-wrapper-checked`]: {
          color: E,
          backgroundColor: R,
          borderColor: a,
          boxShadow: 'none'
        }
      }
    }
  },
  Tl = Dt('Radio', e => {
    const {
        padding: t,
        lineWidth: n,
        controlItemBgActiveDisabled: o,
        colorTextDisabled: l,
        colorBgContainer: r,
        fontSizeLG: a,
        controlOutline: i,
        colorPrimaryHover: s,
        colorPrimaryActive: f,
        colorText: d,
        colorPrimary: u,
        marginXS: y,
        controlOutlineWidth: x,
        colorTextLightSolid: b,
        wireframe: p
      } = e,
      c = `0 0 0 ${x}px ${i}`,
      v = c,
      S = a,
      h = 4,
      $ = S - h * 2,
      w = p ? $ : S - (h + n) * 2,
      k = u,
      P = d,
      T = s,
      C = f,
      E = t - n,
      F = Rt(e, {
        radioFocusShadow: c,
        radioButtonFocusShadow: v,
        radioSize: S,
        radioDotSize: w,
        radioDotDisabledSize: $,
        radioCheckedColor: k,
        radioDotDisabledColor: l,
        radioSolidCheckedColor: b,
        radioButtonBg: r,
        radioButtonCheckedBg: r,
        radioButtonColor: P,
        radioButtonHoverColor: T,
        radioButtonActiveColor: C,
        radioButtonPaddingHorizontal: E,
        radioDisabledButtonCheckedBg: o,
        radioDisabledButtonCheckedColor: l,
        radioWrapperMarginRight: y
      })
    return [vi(F), gi(F), hi(F)]
  })
var mi =
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
const Kl = () => ({
    prefixCls: String,
    checked: pe(),
    disabled: pe(),
    isGroup: pe(),
    value: me.any,
    name: String,
    id: String,
    autofocus: pe(),
    onChange: ye(),
    onFocus: ye(),
    onBlur: ye(),
    onClick: ye(),
    'onUpdate:checked': ye(),
    'onUpdate:value': ye()
  }),
  We = ge({
    compatConfig: { MODE: 3 },
    name: 'ARadio',
    inheritAttrs: !1,
    props: Kl(),
    setup(e, t) {
      let { emit: n, expose: o, slots: l, attrs: r } = t
      const a = on(),
        i = yl.useInject(),
        s = fi(),
        f = di(),
        d = $n(),
        u = O(() => {
          var T
          return (T = p.value) !== null && T !== void 0 ? T : d.value
        }),
        y = ve(),
        { prefixCls: x, direction: b, disabled: p } = qe('radio', e),
        c = O(() =>
          (f == null ? void 0 : f.optionType.value) === 'button' ||
          s === 'button'
            ? `${x.value}-button`
            : x.value
        ),
        v = $n(),
        [S, h] = Tl(x)
      o({
        focus: () => {
          y.value.focus()
        },
        blur: () => {
          y.value.blur()
        }
      })
      const k = T => {
          const C = T.target.checked
          n('update:checked', C),
            n('update:value', C),
            n('change', T),
            a.onFieldChange()
        },
        P = T => {
          n('change', T), f && f.onChange && f.onChange(T)
        }
      return () => {
        var T
        const C = f,
          { prefixCls: E, id: R = a.id.value } = e,
          A = mi(e, ['prefixCls', 'id']),
          F = m(
            m(
              { prefixCls: c.value, id: R },
              Nt(A, ['onUpdate:checked', 'onUpdate:value'])
            ),
            { disabled: (T = p.value) !== null && T !== void 0 ? T : v.value }
          )
        C
          ? ((F.name = C.name.value),
            (F.onChange = P),
            (F.checked = e.value === C.value.value),
            (F.disabled = u.value || C.disabled.value))
          : (F.onChange = k)
        const U = ae(
          {
            [`${c.value}-wrapper`]: !0,
            [`${c.value}-wrapper-checked`]: F.checked,
            [`${c.value}-wrapper-disabled`]: F.disabled,
            [`${c.value}-wrapper-rtl`]: b.value === 'rtl',
            [`${c.value}-wrapper-in-form-item`]: i.isFormItemInput
          },
          r.class,
          h.value
        )
        return S(
          g('label', j(j({}, r), {}, { class: U }), [
            g(Il, j(j({}, F), {}, { type: 'radio', ref: y }), null),
            l.default && g('span', null, [l.default()])
          ])
        )
      }
    }
  }),
  yi = () => ({
    prefixCls: String,
    value: me.any,
    size: Xe(),
    options: je(),
    disabled: pe(),
    name: String,
    buttonStyle: Xe('outline'),
    id: String,
    optionType: Xe('default'),
    onChange: ye(),
    'onUpdate:value': ye()
  }),
  bi = ge({
    compatConfig: { MODE: 3 },
    name: 'ARadioGroup',
    inheritAttrs: !1,
    props: yi(),
    setup(e, t) {
      let { slots: n, emit: o, attrs: l } = t
      const r = on(),
        { prefixCls: a, direction: i, size: s } = qe('radio', e),
        [f, d] = Tl(a),
        u = ve(e.value),
        y = ve(!1)
      return (
        Ee(
          () => e.value,
          b => {
            ;(u.value = b), (y.value = !1)
          }
        ),
        ci({
          onChange: b => {
            const p = u.value,
              { value: c } = b.target
            'value' in e || (u.value = c),
              !y.value &&
                c !== p &&
                ((y.value = !0),
                o('update:value', c),
                o('change', b),
                r.onFieldChange()),
              dt(() => {
                y.value = !1
              })
          },
          value: u,
          disabled: O(() => e.disabled),
          name: O(() => e.name),
          optionType: O(() => e.optionType)
        }),
        () => {
          var b
          const { options: p, buttonStyle: c, id: v = r.id.value } = e,
            S = `${a.value}-group`,
            h = ae(
              S,
              `${S}-${c}`,
              { [`${S}-${s.value}`]: s.value, [`${S}-rtl`]: i.value === 'rtl' },
              l.class,
              d.value
            )
          let $ = null
          return (
            p && p.length > 0
              ? ($ = p.map(w => {
                  if (typeof w == 'string' || typeof w == 'number')
                    return g(
                      We,
                      {
                        key: w,
                        prefixCls: a.value,
                        disabled: e.disabled,
                        value: w,
                        checked: u.value === w
                      },
                      { default: () => [w] }
                    )
                  const { value: k, disabled: P, label: T } = w
                  return g(
                    We,
                    {
                      key: `radio-group-value-options-${k}`,
                      prefixCls: a.value,
                      disabled: P || e.disabled,
                      value: k,
                      checked: u.value === k
                    },
                    { default: () => [T] }
                  )
                }))
              : ($ =
                  (b = n.default) === null || b === void 0
                    ? void 0
                    : b.call(n)),
            f(g('div', j(j({}, l), {}, { class: h, id: v }), [$]))
          )
        }
      )
    }
  }),
  xi = ge({
    compatConfig: { MODE: 3 },
    name: 'ARadioButton',
    inheritAttrs: !1,
    props: Kl(),
    setup(e, t) {
      let { slots: n, attrs: o } = t
      const { prefixCls: l } = qe('radio', e)
      return (
        ui('button'),
        () => {
          var r
          return g(We, j(j(j({}, o), e), {}, { prefixCls: l.value }), {
            default: () => [
              (r = n.default) === null || r === void 0 ? void 0 : r.call(n)
            ]
          })
        }
      )
    }
  })
We.Group = bi
We.Button = xi
We.install = function(e) {
  return (
    e.component(We.name, We),
    e.component(We.Group.name, We.Group),
    e.component(We.Button.name, We.Button),
    e
  )
}
const Dl = Symbol('TreeContextKey'),
  Ci = ge({
    compatConfig: { MODE: 3 },
    name: 'TreeContext',
    props: { value: { type: Object } },
    setup(e, t) {
      let { slots: n } = t
      return (
        Ue(
          Dl,
          O(() => e.value)
        ),
        () => {
          var o
          return (o = n.default) === null || o === void 0 ? void 0 : o.call(n)
        }
      )
    }
  }),
  Qn = () =>
    Ge(
      Dl,
      O(() => ({}))
    ),
  Rl = Symbol('KeysStateKey'),
  Si = e => {
    Ue(Rl, e)
  },
  Nl = () =>
    Ge(Rl, {
      expandedKeys: oe([]),
      selectedKeys: oe([]),
      loadedKeys: oe([]),
      loadingKeys: oe([]),
      checkedKeys: oe([]),
      halfCheckedKeys: oe([]),
      expandedKeysSet: O(() => new Set()),
      selectedKeysSet: O(() => new Set()),
      loadedKeysSet: O(() => new Set()),
      loadingKeysSet: O(() => new Set()),
      checkedKeysSet: O(() => new Set()),
      halfCheckedKeysSet: O(() => new Set()),
      flattenNodes: oe([])
    }),
  $i = e => {
    let { prefixCls: t, level: n, isStart: o, isEnd: l } = e
    const r = `${t}-indent-unit`,
      a = []
    for (let i = 0; i < n; i += 1)
      a.push(
        g(
          'span',
          {
            key: i,
            class: { [r]: !0, [`${r}-start`]: o[i], [`${r}-end`]: l[i] }
          },
          null
        )
      )
    return g('span', { 'aria-hidden': 'true', class: `${t}-indent` }, [a])
  },
  wi = $i,
  Bl = {
    eventKey: [String, Number],
    prefixCls: String,
    title: me.any,
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
    icon: me.any,
    switcherIcon: me.any,
    domRef: { type: Function }
  },
  Oi = {
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
  _l = () => ({
    prefixCls: String,
    focusable: { type: Boolean, default: void 0 },
    activeKey: [Number, String],
    tabindex: Number,
    children: me.any,
    treeData: { type: Array },
    fieldNames: { type: Object },
    showLine: { type: [Boolean, Object], default: void 0 },
    showIcon: { type: Boolean, default: void 0 },
    icon: me.any,
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
    motion: me.any,
    switcherIcon: me.any,
    height: Number,
    itemHeight: Number,
    virtual: { type: Boolean, default: void 0 },
    direction: { type: String },
    rootClassName: String,
    rootStyle: Object
  })
var Pi =
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
const ko = 'open',
  Eo = 'close',
  Ii = '---',
  Pn = ge({
    compatConfig: { MODE: 3 },
    name: 'ATreeNode',
    inheritAttrs: !1,
    props: Bl,
    isTreeNode: 1,
    setup(e, t) {
      let { attrs: n, slots: o, expose: l } = t
      bl(
        !('slots' in e.data),
        `treeData slots is deprecated, please use ${Object.keys(
          e.data.slots || {}
        ).map(K => '`v-slot:' + K + '` ')}instead`
      )
      const r = oe(!1),
        a = Qn(),
        {
          expandedKeysSet: i,
          selectedKeysSet: s,
          loadedKeysSet: f,
          loadingKeysSet: d,
          checkedKeysSet: u,
          halfCheckedKeysSet: y
        } = Nl(),
        { dragOverNodeKey: x, dropPosition: b, keyEntities: p } = a.value,
        c = O(() =>
          Gt(e.eventKey, {
            expandedKeysSet: i.value,
            selectedKeysSet: s.value,
            loadedKeysSet: f.value,
            loadingKeysSet: d.value,
            checkedKeysSet: u.value,
            halfCheckedKeysSet: y.value,
            dragOverNodeKey: x,
            dropPosition: b,
            keyEntities: p
          })
        ),
        v = Ye(() => c.value.expanded),
        S = Ye(() => c.value.selected),
        h = Ye(() => c.value.checked),
        $ = Ye(() => c.value.loaded),
        w = Ye(() => c.value.loading),
        k = Ye(() => c.value.halfChecked),
        P = Ye(() => c.value.dragOver),
        T = Ye(() => c.value.dragOverGapTop),
        C = Ye(() => c.value.dragOverGapBottom),
        E = Ye(() => c.value.pos),
        R = oe(),
        A = O(() => {
          const { eventKey: K } = e,
            { keyEntities: I } = a.value,
            { children: D } = I[K] || {}
          return !!(D || []).length
        }),
        F = O(() => {
          const { isLeaf: K } = e,
            { loadData: I } = a.value,
            D = A.value
          return K === !1 ? !1 : K || (!I && !D) || (I && $.value && !D)
        }),
        U = O(() => (F.value ? null : v.value ? ko : Eo)),
        ee = O(() => {
          const { disabled: K } = e,
            { disabled: I } = a.value
          return !!(I || K)
        }),
        re = O(() => {
          const { checkable: K } = e,
            { checkable: I } = a.value
          return !I || K === !1 ? !1 : I
        }),
        ie = O(() => {
          const { selectable: K } = e,
            { selectable: I } = a.value
          return typeof K == 'boolean' ? K : I
        }),
        V = O(() => {
          const {
            data: K,
            active: I,
            checkable: D,
            disableCheckbox: te,
            disabled: he,
            selectable: we
          } = e
          return m(
            m(
              {
                active: I,
                checkable: D,
                disableCheckbox: te,
                disabled: he,
                selectable: we
              },
              K
            ),
            {
              dataRef: K,
              data: K,
              isLeaf: F.value,
              checked: h.value,
              expanded: v.value,
              loading: w.value,
              selected: S.value,
              halfChecked: k.value
            }
          )
        }),
        Q = ml(),
        L = O(() => {
          const { eventKey: K } = e,
            { keyEntities: I } = a.value,
            { parent: D } = I[K] || {}
          return m(m({}, Ut(m({}, e, c.value))), { parent: D })
        }),
        Z = gt({
          eventData: L,
          eventKey: O(() => e.eventKey),
          selectHandle: R,
          pos: E,
          key: Q.vnode.key
        })
      l(Z)
      const _ = K => {
          const { onNodeDoubleClick: I } = a.value
          I(K, L.value)
        },
        H = K => {
          if (ee.value) return
          const { onNodeSelect: I } = a.value
          K.preventDefault(), I(K, L.value)
        },
        M = K => {
          if (ee.value) return
          const { disableCheckbox: I } = e,
            { onNodeCheck: D } = a.value
          if (!re.value || I) return
          K.preventDefault()
          const te = !h.value
          D(K, L.value, te)
        },
        q = K => {
          const { onNodeClick: I } = a.value
          I(K, L.value), ie.value ? H(K) : M(K)
        },
        G = K => {
          const { onNodeMouseEnter: I } = a.value
          I(K, L.value)
        },
        Oe = K => {
          const { onNodeMouseLeave: I } = a.value
          I(K, L.value)
        },
        de = K => {
          const { onNodeContextMenu: I } = a.value
          I(K, L.value)
        },
        Te = K => {
          const { onNodeDragStart: I } = a.value
          K.stopPropagation(), (r.value = !0), I(K, Z)
          try {
            K.dataTransfer.setData('text/plain', '')
          } catch {}
        },
        Ke = K => {
          const { onNodeDragEnter: I } = a.value
          K.preventDefault(), K.stopPropagation(), I(K, Z)
        },
        Be = K => {
          const { onNodeDragOver: I } = a.value
          K.preventDefault(), K.stopPropagation(), I(K, Z)
        },
        Ae = K => {
          const { onNodeDragLeave: I } = a.value
          K.stopPropagation(), I(K, Z)
        },
        He = K => {
          const { onNodeDragEnd: I } = a.value
          K.stopPropagation(), (r.value = !1), I(K, Z)
        },
        De = K => {
          const { onNodeDrop: I } = a.value
          K.preventDefault(), K.stopPropagation(), (r.value = !1), I(K, Z)
        },
        Re = K => {
          const { onNodeExpand: I } = a.value
          w.value || I(K, L.value)
        },
        X = () => {
          const { data: K } = e,
            { draggable: I } = a.value
          return !!(I && (!I.nodeDraggable || I.nodeDraggable(K)))
        },
        fe = () => {
          const { draggable: K, prefixCls: I } = a.value
          return K && K != null && K.icon
            ? g('span', { class: `${I}-draggable-icon` }, [K.icon])
            : null
        },
        J = () => {
          var K, I, D
          const {
              switcherIcon: te = o.switcherIcon ||
                ((K = a.value.slots) === null || K === void 0
                  ? void 0
                  : K[
                      (D =
                        (I = e.data) === null || I === void 0
                          ? void 0
                          : I.slots) === null || D === void 0
                        ? void 0
                        : D.switcherIcon
                    ])
            } = e,
            { switcherIcon: he } = a.value,
            we = te || he
          return typeof we == 'function' ? we(V.value) : we
        },
        se = () => {
          const { loadData: K, onNodeLoad: I } = a.value
          w.value ||
            (K && v.value && !F.value && !A.value && !$.value && I(L.value))
        }
      ot(() => {
        se()
      }),
        Un(() => {
          se()
        })
      const ue = () => {
          const { prefixCls: K } = a.value,
            I = J()
          if (F.value)
            return I !== !1
              ? g(
                  'span',
                  { class: ae(`${K}-switcher`, `${K}-switcher-noop`) },
                  [I]
                )
              : null
          const D = ae(`${K}-switcher`, `${K}-switcher_${v.value ? ko : Eo}`)
          return I !== !1 ? g('span', { onClick: Re, class: D }, [I]) : null
        },
        Ie = () => {
          var K, I
          const { disableCheckbox: D } = e,
            { prefixCls: te } = a.value,
            he = ee.value
          return re.value
            ? g(
                'span',
                {
                  class: ae(
                    `${te}-checkbox`,
                    h.value && `${te}-checkbox-checked`,
                    !h.value && k.value && `${te}-checkbox-indeterminate`,
                    (he || D) && `${te}-checkbox-disabled`
                  ),
                  onClick: M
                },
                [
                  (I = (K = a.value).customCheckable) === null || I === void 0
                    ? void 0
                    : I.call(K)
                ]
              )
            : null
        },
        ce = () => {
          const { prefixCls: K } = a.value
          return g(
            'span',
            {
              class: ae(
                `${K}-iconEle`,
                `${K}-icon__${U.value || 'docu'}`,
                w.value && `${K}-icon_loading`
              )
            },
            null
          )
        },
        be = () => {
          const { disabled: K, eventKey: I } = e,
            {
              draggable: D,
              dropLevelOffset: te,
              dropPosition: he,
              prefixCls: we,
              indent: N,
              dropIndicatorRender: B,
              dragOverNodeKey: z,
              direction: W
            } = a.value
          return !K && D !== !1 && z === I
            ? B({
                dropPosition: he,
                dropLevelOffset: te,
                indent: N,
                prefixCls: we,
                direction: W
              })
            : null
        },
        ke = () => {
          var K, I, D, te, he, we
          const { icon: N = o.icon, data: B } = e,
            z =
              o.title ||
              ((K = a.value.slots) === null || K === void 0
                ? void 0
                : K[
                    (D =
                      (I = e.data) === null || I === void 0
                        ? void 0
                        : I.slots) === null || D === void 0
                      ? void 0
                      : D.title
                  ]) ||
              ((te = a.value.slots) === null || te === void 0
                ? void 0
                : te.title) ||
              e.title,
            { prefixCls: W, showIcon: ne, icon: le, loadData: Y } = a.value,
            Ce = ee.value,
            Pe = `${W}-node-content-wrapper`
          let xe
          if (ne) {
            const ze =
              N ||
              ((he = a.value.slots) === null || he === void 0
                ? void 0
                : he[
                    (we = B == null ? void 0 : B.slots) === null ||
                    we === void 0
                      ? void 0
                      : we.icon
                  ]) ||
              le
            xe = ze
              ? g(
                  'span',
                  { class: ae(`${W}-iconEle`, `${W}-icon__customize`) },
                  [typeof ze == 'function' ? ze(V.value) : ze]
                )
              : ce()
          } else Y && w.value && (xe = ce())
          let Se
          typeof z == 'function' ? (Se = z(V.value)) : (Se = z),
            (Se = Se === void 0 ? Ii : Se)
          const $e = g('span', { class: `${W}-title` }, [Se])
          return g(
            'span',
            {
              ref: R,
              title: typeof z == 'string' ? z : '',
              class: ae(
                `${Pe}`,
                `${Pe}-${U.value || 'normal'}`,
                !Ce && (S.value || r.value) && `${W}-node-selected`
              ),
              onMouseenter: G,
              onMouseleave: Oe,
              onContextmenu: de,
              onClick: q,
              onDblclick: _
            },
            [xe, $e, be()]
          )
        }
      return () => {
        const K = m(m({}, e), n),
          {
            eventKey: I,
            isLeaf: D,
            isStart: te,
            isEnd: he,
            domRef: we,
            active: N,
            data: B,
            onMousemove: z,
            selectable: W
          } = K,
          ne = Pi(K, [
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
            prefixCls: le,
            filterTreeNode: Y,
            keyEntities: Ce,
            dropContainerKey: Pe,
            dropTargetKey: xe,
            draggingNodeKey: Se
          } = a.value,
          $e = ee.value,
          ze = Yn(ne, { aria: !0, data: !0 }),
          { level: Me } = Ce[I] || {},
          Le = he[he.length - 1],
          _e = X(),
          et = !$e && _e,
          ut = Se === I,
          bt = W !== void 0 ? { 'aria-selected': !!W } : void 0
        return g(
          'div',
          j(
            j(
              {
                ref: we,
                class: ae(n.class, `${le}-treenode`, {
                  [`${le}-treenode-disabled`]: $e,
                  [`${le}-treenode-switcher-${v.value ? 'open' : 'close'}`]: !D,
                  [`${le}-treenode-checkbox-checked`]: h.value,
                  [`${le}-treenode-checkbox-indeterminate`]: k.value,
                  [`${le}-treenode-selected`]: S.value,
                  [`${le}-treenode-loading`]: w.value,
                  [`${le}-treenode-active`]: N,
                  [`${le}-treenode-leaf-last`]: Le,
                  [`${le}-treenode-draggable`]: et,
                  dragging: ut,
                  'drop-target': xe === I,
                  'drop-container': Pe === I,
                  'drag-over': !$e && P.value,
                  'drag-over-gap-top': !$e && T.value,
                  'drag-over-gap-bottom': !$e && C.value,
                  'filter-node': Y && Y(L.value)
                }),
                style: n.style,
                draggable: et,
                'aria-grabbed': ut,
                onDragstart: et ? Te : void 0,
                onDragenter: _e ? Ke : void 0,
                onDragover: _e ? Be : void 0,
                onDragleave: _e ? Ae : void 0,
                onDrop: _e ? De : void 0,
                onDragend: _e ? He : void 0,
                onMousemove: z
              },
              bt
            ),
            ze
          ),
          [
            g(wi, { prefixCls: le, level: Me, isStart: te, isEnd: he }, null),
            fe(),
            ue(),
            Ie(),
            ke()
          ]
        )
      }
    }
  })
globalThis && globalThis.__rest
function tt(e, t) {
  if (!e) return []
  const n = e.slice(),
    o = n.indexOf(t)
  return o >= 0 && n.splice(o, 1), n
}
function at(e, t) {
  const n = (e || []).slice()
  return n.indexOf(t) === -1 && n.push(t), n
}
function Zn(e) {
  return e.split('-')
}
function Al(e, t) {
  return `${e}-${t}`
}
function ki(e) {
  return e && e.type && e.type.isTreeNode
}
function Ei(e, t) {
  const n = [],
    o = t[e]
  function l() {
    ;(arguments.length > 0 && arguments[0] !== void 0
      ? arguments[0]
      : []
    ).forEach(a => {
      let { key: i, children: s } = a
      n.push(i), l(s)
    })
  }
  return l(o.children), n
}
function Ti(e) {
  if (e.parent) {
    const t = Zn(e.pos)
    return Number(t[t.length - 1]) === e.parent.children.length - 1
  }
  return !1
}
function Ki(e) {
  const t = Zn(e.pos)
  return Number(t[t.length - 1]) === 0
}
function To(e, t, n, o, l, r, a, i, s, f) {
  var d
  const { clientX: u, clientY: y } = e,
    { top: x, height: b } = e.target.getBoundingClientRect(),
    c =
      ((f === 'rtl' ? -1 : 1) * (((l == null ? void 0 : l.x) || 0) - u) - 12) /
      o
  let v = i[n.eventKey]
  if (y < x + b / 2) {
    const E = a.findIndex(F => F.key === v.key),
      R = E <= 0 ? 0 : E - 1,
      A = a[R].key
    v = i[A]
  }
  const S = v.key,
    h = v,
    $ = v.key
  let w = 0,
    k = 0
  if (!s.has(S))
    for (let E = 0; E < c && Ti(v); E += 1) (v = v.parent), (k += 1)
  const P = t.eventData,
    T = v.node
  let C = !0
  return (
    Ki(v) &&
    v.level === 0 &&
    y < x + b / 2 &&
    r({ dragNode: P, dropNode: T, dropPosition: -1 }) &&
    v.key === n.eventKey
      ? (w = -1)
      : (h.children || []).length && s.has($)
      ? r({ dragNode: P, dropNode: T, dropPosition: 0 })
        ? (w = 0)
        : (C = !1)
      : k === 0
      ? c > -1.5
        ? r({ dragNode: P, dropNode: T, dropPosition: 1 })
          ? (w = 1)
          : (C = !1)
        : r({ dragNode: P, dropNode: T, dropPosition: 0 })
        ? (w = 0)
        : r({ dragNode: P, dropNode: T, dropPosition: 1 })
        ? (w = 1)
        : (C = !1)
      : r({ dragNode: P, dropNode: T, dropPosition: 1 })
      ? (w = 1)
      : (C = !1),
    {
      dropPosition: w,
      dropLevelOffset: k,
      dropTargetKey: v.key,
      dropTargetPos: v.pos,
      dragOverNodeKey: $,
      dropContainerKey:
        w === 0
          ? null
          : ((d = v.parent) === null || d === void 0 ? void 0 : d.key) || null,
      dropAllowed: C
    }
  )
}
function Ko(e, t) {
  if (!e) return
  const { multiple: n } = t
  return n ? e.slice() : e.length ? [e[0]] : e
}
function pn(e) {
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
function In(e, t) {
  const n = new Set()
  function o(l) {
    if (n.has(l)) return
    const r = t[l]
    if (!r) return
    n.add(l)
    const { parent: a, node: i } = r
    i.disabled || (a && o(a.key))
  }
  return (
    (e || []).forEach(l => {
      o(l)
    }),
    [...n]
  )
}
var Di =
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
function jt(e, t) {
  return e ?? t
}
function ln(e) {
  const { title: t, _title: n, key: o, children: l } = e || {},
    r = t || 'title'
  return {
    title: r,
    _title: n || [r],
    key: o || 'key',
    children: l || 'children'
  }
}
function kn(e) {
  function t() {
    let n = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : []
    return Ft(n).map(l => {
      var r, a, i, s
      if (!ki(l)) return null
      const f = l.children || {},
        d = l.key,
        u = {}
      for (const [E, R] of Object.entries(l.props)) u[gl(E)] = R
      const {
          isLeaf: y,
          checkable: x,
          selectable: b,
          disabled: p,
          disableCheckbox: c
        } = u,
        v = {
          isLeaf: y || y === '' || void 0,
          checkable: x || x === '' || void 0,
          selectable: b || b === '' || void 0,
          disabled: p || p === '' || void 0,
          disableCheckbox: c || c === '' || void 0
        },
        S = m(m({}, u), v),
        {
          title: h = (r = f.title) === null || r === void 0
            ? void 0
            : r.call(f, S),
          icon: $ = (a = f.icon) === null || a === void 0
            ? void 0
            : a.call(f, S),
          switcherIcon: w = (i = f.switcherIcon) === null || i === void 0
            ? void 0
            : i.call(f, S)
        } = u,
        k = Di(u, ['title', 'icon', 'switcherIcon']),
        P = (s = f.default) === null || s === void 0 ? void 0 : s.call(f),
        T = m(
          m(m({}, k), {
            title: h,
            icon: $,
            switcherIcon: w,
            key: d,
            isLeaf: y
          }),
          v
        ),
        C = t(P)
      return C.length && (T.children = C), T
    })
  }
  return t(e)
}
function Ri(e, t, n) {
  const { _title: o, key: l, children: r } = ln(n),
    a = new Set(t === !0 ? [] : t),
    i = []
  function s(f) {
    let d =
      arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null
    return f.map((u, y) => {
      const x = Al(d ? d.pos : '0', y),
        b = jt(u[l], x)
      let p
      for (let v = 0; v < o.length; v += 1) {
        const S = o[v]
        if (u[S] !== void 0) {
          p = u[S]
          break
        }
      }
      const c = m(m({}, Nt(u, [...o, l, r])), {
        title: p,
        key: b,
        parent: d,
        pos: x,
        children: null,
        data: u,
        isStart: [...(d ? d.isStart : []), y === 0],
        isEnd: [...(d ? d.isEnd : []), y === f.length - 1]
      })
      return (
        i.push(c),
        t === !0 || a.has(b)
          ? (c.children = s(u[r] || [], c))
          : (c.children = []),
        c
      )
    })
  }
  return s(e), i
}
function Ni(e, t, n) {
  let o = {}
  typeof n == 'object' ? (o = n) : (o = { externalGetKey: n }), (o = o || {})
  const { childrenPropName: l, externalGetKey: r, fieldNames: a } = o,
    { key: i, children: s } = ln(a),
    f = l || s
  let d
  r
    ? typeof r == 'string'
      ? (d = y => y[r])
      : typeof r == 'function' && (d = y => r(y))
    : (d = (y, x) => jt(y[i], x))
  function u(y, x, b, p) {
    const c = y ? y[f] : e,
      v = y ? Al(b.pos, x) : '0',
      S = y ? [...p, y] : []
    if (y) {
      const h = d(y, v),
        $ = {
          node: y,
          index: x,
          pos: v,
          key: h,
          parentPos: b.node ? b.pos : null,
          level: b.level + 1,
          nodes: S
        }
      t($)
    }
    c &&
      c.forEach((h, $) => {
        u(h, $, { node: y, pos: v, level: b ? b.level + 1 : -1 }, S)
      })
  }
  u(null)
}
function eo(e) {
  let {
      initWrapper: t,
      processEntity: n,
      onProcessFinished: o,
      externalGetKey: l,
      childrenPropName: r,
      fieldNames: a
    } = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
    i = arguments.length > 2 ? arguments[2] : void 0
  const s = l || i,
    f = {},
    d = {}
  let u = { posEntities: f, keyEntities: d }
  return (
    t && (u = t(u) || u),
    Ni(
      e,
      y => {
        const {
            node: x,
            index: b,
            pos: p,
            key: c,
            parentPos: v,
            level: S,
            nodes: h
          } = y,
          $ = { node: x, nodes: h, index: b, key: c, pos: p, level: S },
          w = jt(c, p)
        ;(f[p] = $),
          (d[w] = $),
          ($.parent = f[v]),
          $.parent &&
            (($.parent.children = $.parent.children || []),
            $.parent.children.push($)),
          n && n($, u)
      },
      { externalGetKey: s, childrenPropName: r, fieldNames: a }
    ),
    o && o(u),
    u
  )
}
function Gt(e, t) {
  let {
    expandedKeysSet: n,
    selectedKeysSet: o,
    loadedKeysSet: l,
    loadingKeysSet: r,
    checkedKeysSet: a,
    halfCheckedKeysSet: i,
    dragOverNodeKey: s,
    dropPosition: f,
    keyEntities: d
  } = t
  const u = d[e]
  return {
    eventKey: e,
    expanded: n.has(e),
    selected: o.has(e),
    loaded: l.has(e),
    loading: r.has(e),
    checked: a.has(e),
    halfChecked: i.has(e),
    pos: String(u ? u.pos : ''),
    parent: u.parent,
    dragOver: s === e && f === 0,
    dragOverGapTop: s === e && f === -1,
    dragOverGapBottom: s === e && f === 1
  }
}
function Ut(e) {
  const {
      data: t,
      expanded: n,
      selected: o,
      checked: l,
      loaded: r,
      loading: a,
      halfChecked: i,
      dragOver: s,
      dragOverGapTop: f,
      dragOverGapBottom: d,
      pos: u,
      active: y,
      eventKey: x
    } = e,
    b = m(m({ dataRef: t }, t), {
      expanded: n,
      selected: o,
      checked: l,
      loaded: r,
      loading: a,
      halfChecked: i,
      dragOver: s,
      dragOverGapTop: f,
      dragOverGapBottom: d,
      pos: u,
      active: y,
      eventKey: x,
      key: x
    })
  return (
    'props' in b ||
      Object.defineProperty(b, 'props', {
        get() {
          return e
        }
      }),
    b
  )
}
function zl(e, t) {
  const n = new Set()
  return (
    e.forEach(o => {
      t.has(o) || n.add(o)
    }),
    n
  )
}
function Bi(e) {
  const { disabled: t, disableCheckbox: n, checkable: o } = e || {}
  return !!(t || n) || o === !1
}
function _i(e, t, n, o) {
  const l = new Set(e),
    r = new Set()
  for (let i = 0; i <= n; i += 1)
    (t.get(i) || new Set()).forEach(f => {
      const { key: d, node: u, children: y = [] } = f
      l.has(d) &&
        !o(u) &&
        y
          .filter(x => !o(x.node))
          .forEach(x => {
            l.add(x.key)
          })
    })
  const a = new Set()
  for (let i = n; i >= 0; i -= 1)
    (t.get(i) || new Set()).forEach(f => {
      const { parent: d, node: u } = f
      if (o(u) || !f.parent || a.has(f.parent.key)) return
      if (o(f.parent.node)) {
        a.add(d.key)
        return
      }
      let y = !0,
        x = !1
      ;(d.children || [])
        .filter(b => !o(b.node))
        .forEach(b => {
          let { key: p } = b
          const c = l.has(p)
          y && !c && (y = !1), !x && (c || r.has(p)) && (x = !0)
        }),
        y && l.add(d.key),
        x && r.add(d.key),
        a.add(d.key)
    })
  return { checkedKeys: Array.from(l), halfCheckedKeys: Array.from(zl(r, l)) }
}
function Ai(e, t, n, o, l) {
  const r = new Set(e)
  let a = new Set(t)
  for (let s = 0; s <= o; s += 1)
    (n.get(s) || new Set()).forEach(d => {
      const { key: u, node: y, children: x = [] } = d
      !r.has(u) &&
        !a.has(u) &&
        !l(y) &&
        x
          .filter(b => !l(b.node))
          .forEach(b => {
            r.delete(b.key)
          })
    })
  a = new Set()
  const i = new Set()
  for (let s = o; s >= 0; s -= 1)
    (n.get(s) || new Set()).forEach(d => {
      const { parent: u, node: y } = d
      if (l(y) || !d.parent || i.has(d.parent.key)) return
      if (l(d.parent.node)) {
        i.add(u.key)
        return
      }
      let x = !0,
        b = !1
      ;(u.children || [])
        .filter(p => !l(p.node))
        .forEach(p => {
          let { key: c } = p
          const v = r.has(c)
          x && !v && (x = !1), !b && (v || a.has(c)) && (b = !0)
        }),
        x || r.delete(u.key),
        b && a.add(u.key),
        i.add(u.key)
    })
  return { checkedKeys: Array.from(r), halfCheckedKeys: Array.from(zl(a, r)) }
}
function Et(e, t, n, o, l, r) {
  let a
  r ? (a = r) : (a = Bi)
  const i = new Set(e.filter(f => !!n[f]))
  let s
  return (
    t === !0 ? (s = _i(i, l, o, a)) : (s = Ai(i, t.halfCheckedKeys, l, o, a)), s
  )
}
function Fl(e) {
  const t = ve(0),
    n = oe()
  return (
    Ne(() => {
      const o = new Map()
      let l = 0
      const r = e.value || {}
      for (const a in r)
        if (Object.prototype.hasOwnProperty.call(r, a)) {
          const i = r[a],
            { level: s } = i
          let f = o.get(s)
          f || ((f = new Set()), o.set(s, f)), f.add(i), (l = Math.max(l, s))
        }
      ;(t.value = l), (n.value = o)
    }),
    { maxLevel: t, levelEntities: n }
  )
}
const zi = new Vn('antCheckboxEffect', {
    '0%': { transform: 'scale(1)', opacity: 0.5 },
    '100%': { transform: 'scale(1.6)', opacity: 0 }
  }),
  Fi = e => {
    const { checkboxCls: t } = e,
      n = `${t}-wrapper`
    return [
      {
        [`${t}-group`]: m(m({}, Je(e)), {
          display: 'inline-flex',
          flexWrap: 'wrap',
          columnGap: e.marginXS,
          [`> ${e.antCls}-row`]: { flex: 1 }
        }),
        [n]: m(m({}, Je(e)), {
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
        [t]: m(m({}, Je(e)), {
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
            [`&:focus-visible + ${t}-inner`]: m({}, Pt(e))
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
            animationName: zi,
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
function Ml(e, t) {
  const n = Rt(t, {
    checkboxCls: `.${e}`,
    checkboxSize: t.controlInteractiveSize
  })
  return [Fi(n)]
}
const jl = Dt('Checkbox', (e, t) => {
    let { prefixCls: n } = t
    return [Ml(n, e)]
  }),
  Mi = () => ({
    name: String,
    prefixCls: String,
    options: je([]),
    disabled: Boolean,
    id: String
  }),
  ji = () =>
    m(m({}, Mi()), {
      defaultValue: je(),
      value: je(),
      onChange: ye(),
      'onUpdate:value': ye()
    }),
  Li = () => ({
    prefixCls: String,
    defaultChecked: pe(),
    checked: pe(),
    disabled: pe(),
    isGroup: pe(),
    value: me.any,
    name: String,
    id: String,
    indeterminate: pe(),
    type: Xe('checkbox'),
    autofocus: pe(),
    onChange: ye(),
    'onUpdate:checked': ye(),
    onClick: ye(),
    skipGroup: pe(!1)
  }),
  Hi = () => m(m({}, Li()), { indeterminate: pe(!1) }),
  Ll = Symbol('CheckboxGroupContext')
var Do =
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
const ct = ge({
    compatConfig: { MODE: 3 },
    name: 'ACheckbox',
    inheritAttrs: !1,
    __ANT_CHECKBOX: !0,
    props: Hi(),
    setup(e, t) {
      let { emit: n, attrs: o, slots: l, expose: r } = t
      const a = on(),
        i = yl.useInject(),
        { prefixCls: s, direction: f, disabled: d } = qe('checkbox', e),
        u = $n(),
        [y, x] = jl(s),
        b = Ge(Ll, void 0),
        p = Symbol('checkboxUniId'),
        c = O(() => (b == null ? void 0 : b.disabled.value) || d.value)
      Ne(() => {
        !e.skipGroup && b && b.registerValue(p, e.value)
      }),
        mt(() => {
          b && b.cancelValue(p)
        }),
        ot(() => {
          vl(!!(e.checked !== void 0 || b || e.value === void 0))
        })
      const v = w => {
          const k = w.target.checked
          n('update:checked', k), n('change', w), a.onFieldChange()
        },
        S = ve()
      return (
        r({
          focus: () => {
            var w
            ;(w = S.value) === null || w === void 0 || w.focus()
          },
          blur: () => {
            var w
            ;(w = S.value) === null || w === void 0 || w.blur()
          }
        }),
        () => {
          var w
          const k = Xn(
              (w = l.default) === null || w === void 0 ? void 0 : w.call(l)
            ),
            { indeterminate: P, skipGroup: T, id: C = a.id.value } = e,
            E = Do(e, ['indeterminate', 'skipGroup', 'id']),
            {
              onMouseenter: R,
              onMouseleave: A,
              onInput: F,
              class: U,
              style: ee
            } = o,
            re = Do(o, [
              'onMouseenter',
              'onMouseleave',
              'onInput',
              'class',
              'style'
            ]),
            ie = m(m(m(m({}, E), { id: C, prefixCls: s.value }), re), {
              disabled: c.value
            })
          b && !T
            ? ((ie.onChange = function() {
                for (
                  var Z = arguments.length, _ = new Array(Z), H = 0;
                  H < Z;
                  H++
                )
                  _[H] = arguments[H]
                n('change', ..._), b.toggleOption({ label: k, value: e.value })
              }),
              (ie.name = b.name.value),
              (ie.checked = b.mergedValue.value.includes(e.value)),
              (ie.disabled = c.value || u.value),
              (ie.indeterminate = P))
            : (ie.onChange = v)
          const V = ae(
              {
                [`${s.value}-wrapper`]: !0,
                [`${s.value}-rtl`]: f.value === 'rtl',
                [`${s.value}-wrapper-checked`]: ie.checked,
                [`${s.value}-wrapper-disabled`]: ie.disabled,
                [`${s.value}-wrapper-in-form-item`]: i.isFormItemInput
              },
              U,
              x.value
            ),
            Q = ae({ [`${s.value}-indeterminate`]: P }, x.value)
          return y(
            g(
              'label',
              { class: V, style: ee, onMouseenter: R, onMouseleave: A },
              [
                g(
                  Il,
                  j(
                    j({ 'aria-checked': P ? 'mixed' : void 0 }, ie),
                    {},
                    { class: Q, ref: S }
                  ),
                  null
                ),
                k.length ? g('span', null, [k]) : null
              ]
            )
          )
        }
      )
    }
  }),
  En = ge({
    compatConfig: { MODE: 3 },
    name: 'ACheckboxGroup',
    inheritAttrs: !1,
    props: ji(),
    setup(e, t) {
      let { slots: n, attrs: o, emit: l, expose: r } = t
      const a = on(),
        { prefixCls: i, direction: s } = qe('checkbox', e),
        f = O(() => `${i.value}-group`),
        [d, u] = jl(f),
        y = ve((e.value === void 0 ? e.defaultValue : e.value) || [])
      Ee(
        () => e.value,
        () => {
          y.value = e.value || []
        }
      )
      const x = O(() =>
          e.options.map($ =>
            typeof $ == 'string' || typeof $ == 'number'
              ? { label: $, value: $ }
              : $
          )
        ),
        b = ve(Symbol()),
        p = ve(new Map()),
        c = $ => {
          p.value.delete($), (b.value = Symbol())
        },
        v = ($, w) => {
          p.value.set($, w), (b.value = Symbol())
        },
        S = ve(new Map())
      return (
        Ee(b, () => {
          const $ = new Map()
          for (const w of p.value.values()) $.set(w, !0)
          S.value = $
        }),
        Ue(Ll, {
          cancelValue: c,
          registerValue: v,
          toggleOption: $ => {
            const w = y.value.indexOf($.value),
              k = [...y.value]
            w === -1 ? k.push($.value) : k.splice(w, 1),
              e.value === void 0 && (y.value = k)
            const P = k
              .filter(T => S.value.has(T))
              .sort((T, C) => {
                const E = x.value.findIndex(A => A.value === T),
                  R = x.value.findIndex(A => A.value === C)
                return E - R
              })
            l('update:value', P), l('change', P), a.onFieldChange()
          },
          mergedValue: y,
          name: O(() => e.name),
          disabled: O(() => e.disabled)
        }),
        r({ mergedValue: y }),
        () => {
          var $
          const { id: w = a.id.value } = e
          let k = null
          return (
            x.value &&
              x.value.length > 0 &&
              (k = x.value.map(P => {
                var T
                return g(
                  ct,
                  {
                    prefixCls: i.value,
                    key: P.value.toString(),
                    disabled: 'disabled' in P ? P.disabled : e.disabled,
                    indeterminate: P.indeterminate,
                    value: P.value,
                    checked: y.value.indexOf(P.value) !== -1,
                    onChange: P.onChange,
                    class: `${f.value}-item`
                  },
                  {
                    default: () => [
                      n.label !== void 0
                        ? (T = n.label) === null || T === void 0
                          ? void 0
                          : T.call(n, P)
                        : P.label
                    ]
                  }
                )
              })),
            d(
              g(
                'div',
                j(
                  j({}, o),
                  {},
                  {
                    class: [
                      f.value,
                      { [`${f.value}-rtl`]: s.value === 'rtl' },
                      o.class,
                      u.value
                    ],
                    id: w
                  }
                ),
                [
                  k ||
                    (($ = n.default) === null || $ === void 0
                      ? void 0
                      : $.call(n))
                ]
              )
            )
          )
        }
      )
    }
  })
ct.Group = En
ct.install = function(e) {
  return e.component(ct.name, ct), e.component(En.name, En), e
}
Ot.Button = tn
Ot.install = function(e) {
  return e.component(Ot.name, Ot), e.component(tn.name, tn), e
}
function Ro(e) {
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
        Wi(e, l, n[l])
      })
  }
  return e
}
function Wi(e, t, n) {
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
var to = function(t, n) {
  var o = Ro({}, t, n.attrs)
  return g(Ze, Ro({}, o, { icon: xa }), null)
}
to.displayName = 'DoubleLeftOutlined'
to.inheritAttrs = !1
const No = to
function Bo(e) {
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
        Vi(e, l, n[l])
      })
  }
  return e
}
function Vi(e, t, n) {
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
var no = function(t, n) {
  var o = Bo({}, t, n.attrs)
  return g(Ze, Bo({}, o, { icon: Ca }), null)
}
no.displayName = 'DoubleRightOutlined'
no.inheritAttrs = !1
const _o = no,
  Xi = ge({
    name: 'MiniSelect',
    compatConfig: { MODE: 3 },
    inheritAttrs: !1,
    props: Sl(),
    Option: en.Option,
    setup(e, t) {
      let { attrs: n, slots: o } = t
      return () => {
        const l = m(m(m({}, e), { size: 'small' }), n)
        return g(en, l, o)
      }
    }
  }),
  Gi = ge({
    name: 'MiddleSelect',
    inheritAttrs: !1,
    props: Sl(),
    Option: en.Option,
    setup(e, t) {
      let { attrs: n, slots: o } = t
      return () => {
        const l = m(m(m({}, e), { size: 'middle' }), n)
        return g(en, l, o)
      }
    }
  }),
  xt = ge({
    compatConfig: { MODE: 3 },
    name: 'Pager',
    inheritAttrs: !1,
    props: {
      rootPrefixCls: String,
      page: Number,
      active: { type: Boolean, default: void 0 },
      last: { type: Boolean, default: void 0 },
      locale: me.object,
      showTitle: { type: Boolean, default: void 0 },
      itemRender: { type: Function, default: () => {} },
      onClick: { type: Function },
      onKeypress: { type: Function }
    },
    eimt: ['click', 'keypress'],
    setup(e, t) {
      let { emit: n, attrs: o } = t
      const l = () => {
          n('click', e.page)
        },
        r = a => {
          n('keypress', a, l, e.page)
        }
      return () => {
        const { showTitle: a, page: i, itemRender: s } = e,
          { class: f, style: d } = o,
          u = `${e.rootPrefixCls}-item`,
          y = ae(
            u,
            `${u}-${e.page}`,
            { [`${u}-active`]: e.active, [`${u}-disabled`]: !e.page },
            f
          )
        return g(
          'li',
          {
            onClick: l,
            onKeypress: r,
            title: a ? String(i) : null,
            tabindex: '0',
            class: y,
            style: d
          },
          [
            s({
              page: i,
              type: 'page',
              originalElement: g('a', { rel: 'nofollow' }, [i])
            })
          ]
        )
      }
    }
  }),
  Ct = {
    ZERO: 48,
    NINE: 57,
    NUMPAD_ZERO: 96,
    NUMPAD_NINE: 105,
    BACKSPACE: 8,
    DELETE: 46,
    ENTER: 13,
    ARROW_UP: 38,
    ARROW_DOWN: 40
  },
  Ui = ge({
    compatConfig: { MODE: 3 },
    props: {
      disabled: { type: Boolean, default: void 0 },
      changeSize: Function,
      quickGo: Function,
      selectComponentClass: me.any,
      current: Number,
      pageSizeOptions: me.array.def(['10', '20', '50', '100']),
      pageSize: Number,
      buildOptionText: Function,
      locale: me.object,
      rootPrefixCls: String,
      selectPrefixCls: String,
      goButton: me.any
    },
    setup(e) {
      const t = ve(''),
        n = O(() => (!t.value || isNaN(t.value) ? void 0 : Number(t.value))),
        o = s => `${s.value} ${e.locale.items_per_page}`,
        l = s => {
          const { value: f } = s.target
          t.value !== f && (t.value = f)
        },
        r = s => {
          const { goButton: f, quickGo: d, rootPrefixCls: u } = e
          if (!(f || t.value === ''))
            if (
              s.relatedTarget &&
              (s.relatedTarget.className.indexOf(`${u}-item-link`) >= 0 ||
                s.relatedTarget.className.indexOf(`${u}-item`) >= 0)
            ) {
              t.value = ''
              return
            } else d(n.value), (t.value = '')
        },
        a = s => {
          t.value !== '' &&
            (s.keyCode === Ct.ENTER || s.type === 'click') &&
            (e.quickGo(n.value), (t.value = ''))
        },
        i = O(() => {
          const { pageSize: s, pageSizeOptions: f } = e
          return f.some(d => d.toString() === s.toString())
            ? f
            : f.concat([s.toString()]).sort((d, u) => {
                const y = isNaN(Number(d)) ? 0 : Number(d),
                  x = isNaN(Number(u)) ? 0 : Number(u)
                return y - x
              })
        })
      return () => {
        const {
            rootPrefixCls: s,
            locale: f,
            changeSize: d,
            quickGo: u,
            goButton: y,
            selectComponentClass: x,
            selectPrefixCls: b,
            pageSize: p,
            disabled: c
          } = e,
          v = `${s}-options`
        let S = null,
          h = null,
          $ = null
        if (!d && !u) return null
        if (d && x) {
          const w = e.buildOptionText || o,
            k = i.value.map((P, T) =>
              g(
                x.Option,
                { key: T, value: P },
                { default: () => [w({ value: P })] }
              )
            )
          S = g(
            x,
            {
              disabled: c,
              prefixCls: b,
              showSearch: !1,
              class: `${v}-size-changer`,
              optionLabelProp: 'children',
              value: (p || i.value[0]).toString(),
              onChange: P => d(Number(P)),
              getPopupContainer: P => P.parentNode
            },
            { default: () => [k] }
          )
        }
        return (
          u &&
            (y &&
              ($ =
                typeof y == 'boolean'
                  ? g(
                      'button',
                      {
                        type: 'button',
                        onClick: a,
                        onKeyup: a,
                        disabled: c,
                        class: `${v}-quick-jumper-button`
                      },
                      [f.jump_to_confirm]
                    )
                  : g('span', { onClick: a, onKeyup: a }, [y])),
            (h = g('div', { class: `${v}-quick-jumper` }, [
              f.jump_to,
              g(
                xl,
                {
                  disabled: c,
                  type: 'text',
                  value: t.value,
                  onInput: l,
                  onChange: l,
                  onKeyup: a,
                  onBlur: r
                },
                null
              ),
              f.page,
              $
            ]))),
          g('li', { class: `${v}` }, [S, h])
        )
      }
    }
  }),
  qi = {
    items_per_page: '条/页',
    jump_to: '跳至',
    jump_to_confirm: '确定',
    page: '页',
    prev_page: '上一页',
    next_page: '下一页',
    prev_5: '向前 5 页',
    next_5: '向后 5 页',
    prev_3: '向前 3 页',
    next_3: '向后 3 页'
  }
var Yi =
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
function Ji(e) {
  return typeof e == 'number' && isFinite(e) && Math.floor(e) === e
}
function Qi(e) {
  let { originalElement: t } = e
  return t
}
function rt(e, t, n) {
  const o = typeof e > 'u' ? t.statePageSize : e
  return Math.floor((n.total - 1) / o) + 1
}
const Zi = ge({
    compatConfig: { MODE: 3 },
    name: 'Pagination',
    mixins: [oa],
    inheritAttrs: !1,
    props: {
      disabled: { type: Boolean, default: void 0 },
      prefixCls: me.string.def('rc-pagination'),
      selectPrefixCls: me.string.def('rc-select'),
      current: Number,
      defaultCurrent: me.number.def(1),
      total: me.number.def(0),
      pageSize: Number,
      defaultPageSize: me.number.def(10),
      hideOnSinglePage: { type: Boolean, default: !1 },
      showSizeChanger: { type: Boolean, default: void 0 },
      showLessItems: { type: Boolean, default: !1 },
      selectComponentClass: me.any,
      showPrevNextJumpers: { type: Boolean, default: !0 },
      showQuickJumper: me.oneOfType([me.looseBool, me.object]).def(!1),
      showTitle: { type: Boolean, default: !0 },
      pageSizeOptions: me.arrayOf(me.oneOfType([me.number, me.string])),
      buildOptionText: Function,
      showTotal: Function,
      simple: { type: Boolean, default: void 0 },
      locale: me.object.def(qi),
      itemRender: me.func.def(Qi),
      prevIcon: me.any,
      nextIcon: me.any,
      jumpPrevIcon: me.any,
      jumpNextIcon: me.any,
      totalBoundaryShowSizeChanger: me.number.def(50)
    },
    data() {
      const e = this.$props
      let t = Co([this.current, this.defaultCurrent])
      const n = Co([this.pageSize, this.defaultPageSize])
      return (
        (t = Math.min(t, rt(n, void 0, e))),
        { stateCurrent: t, stateCurrentInputValue: t, statePageSize: n }
      )
    },
    watch: {
      current(e) {
        this.setState({ stateCurrent: e, stateCurrentInputValue: e })
      },
      pageSize(e) {
        const t = {}
        let n = this.stateCurrent
        const o = rt(e, this.$data, this.$props)
        ;(n = n > o ? o : n),
          At(this, 'current') ||
            ((t.stateCurrent = n), (t.stateCurrentInputValue = n)),
          (t.statePageSize = e),
          this.setState(t)
      },
      stateCurrent(e, t) {
        this.$nextTick(() => {
          if (this.$refs.paginationNode) {
            const n = this.$refs.paginationNode.querySelector(
              `.${this.prefixCls}-item-${t}`
            )
            n && document.activeElement === n && n.blur()
          }
        })
      },
      total() {
        const e = {},
          t = rt(this.pageSize, this.$data, this.$props)
        if (At(this, 'current')) {
          const n = Math.min(this.current, t)
          ;(e.stateCurrent = n), (e.stateCurrentInputValue = n)
        } else {
          let n = this.stateCurrent
          n === 0 && t > 0 ? (n = 1) : (n = Math.min(this.stateCurrent, t)),
            (e.stateCurrent = n)
        }
        this.setState(e)
      }
    },
    methods: {
      getJumpPrevPage() {
        return Math.max(1, this.stateCurrent - (this.showLessItems ? 3 : 5))
      },
      getJumpNextPage() {
        return Math.min(
          rt(void 0, this.$data, this.$props),
          this.stateCurrent + (this.showLessItems ? 3 : 5)
        )
      },
      getItemIcon(e, t) {
        const { prefixCls: n } = this.$props
        return (
          Ir(this, e, this.$props) ||
          g(
            'button',
            { type: 'button', 'aria-label': t, class: `${n}-item-link` },
            null
          )
        )
      },
      getValidValue(e) {
        const t = e.target.value,
          n = rt(void 0, this.$data, this.$props),
          { stateCurrentInputValue: o } = this.$data
        let l
        return (
          t === ''
            ? (l = t)
            : isNaN(Number(t))
            ? (l = o)
            : t >= n
            ? (l = n)
            : (l = Number(t)),
          l
        )
      },
      isValid(e) {
        return Ji(e) && e !== this.stateCurrent
      },
      shouldDisplayQuickJumper() {
        const { showQuickJumper: e, pageSize: t, total: n } = this.$props
        return n <= t ? !1 : e
      },
      handleKeyDown(e) {
        ;(e.keyCode === Ct.ARROW_UP || e.keyCode === Ct.ARROW_DOWN) &&
          e.preventDefault()
      },
      handleKeyUp(e) {
        const t = this.getValidValue(e),
          n = this.stateCurrentInputValue
        t !== n && this.setState({ stateCurrentInputValue: t }),
          e.keyCode === Ct.ENTER
            ? this.handleChange(t)
            : e.keyCode === Ct.ARROW_UP
            ? this.handleChange(t - 1)
            : e.keyCode === Ct.ARROW_DOWN && this.handleChange(t + 1)
      },
      changePageSize(e) {
        let t = this.stateCurrent
        const n = t,
          o = rt(e, this.$data, this.$props)
        ;(t = t > o ? o : t),
          o === 0 && (t = this.stateCurrent),
          typeof e == 'number' &&
            (At(this, 'pageSize') || this.setState({ statePageSize: e }),
            At(this, 'current') ||
              this.setState({ stateCurrent: t, stateCurrentInputValue: t })),
          this.__emit('update:pageSize', e),
          t !== n && this.__emit('update:current', t),
          this.__emit('showSizeChange', t, e),
          this.__emit('change', t, e)
      },
      handleChange(e) {
        const { disabled: t } = this.$props
        let n = e
        if (this.isValid(n) && !t) {
          const o = rt(void 0, this.$data, this.$props)
          return (
            n > o ? (n = o) : n < 1 && (n = 1),
            At(this, 'current') ||
              this.setState({ stateCurrent: n, stateCurrentInputValue: n }),
            this.__emit('update:current', n),
            this.__emit('change', n, this.statePageSize),
            n
          )
        }
        return this.stateCurrent
      },
      prev() {
        this.hasPrev() && this.handleChange(this.stateCurrent - 1)
      },
      next() {
        this.hasNext() && this.handleChange(this.stateCurrent + 1)
      },
      jumpPrev() {
        this.handleChange(this.getJumpPrevPage())
      },
      jumpNext() {
        this.handleChange(this.getJumpNextPage())
      },
      hasPrev() {
        return this.stateCurrent > 1
      },
      hasNext() {
        return this.stateCurrent < rt(void 0, this.$data, this.$props)
      },
      getShowSizeChanger() {
        const {
          showSizeChanger: e,
          total: t,
          totalBoundaryShowSizeChanger: n
        } = this.$props
        return typeof e < 'u' ? e : t > n
      },
      runIfEnter(e, t) {
        if (e.key === 'Enter' || e.charCode === 13) {
          e.preventDefault()
          for (
            var n = arguments.length, o = new Array(n > 2 ? n - 2 : 0), l = 2;
            l < n;
            l++
          )
            o[l - 2] = arguments[l]
          t(...o)
        }
      },
      runIfEnterPrev(e) {
        this.runIfEnter(e, this.prev)
      },
      runIfEnterNext(e) {
        this.runIfEnter(e, this.next)
      },
      runIfEnterJumpPrev(e) {
        this.runIfEnter(e, this.jumpPrev)
      },
      runIfEnterJumpNext(e) {
        this.runIfEnter(e, this.jumpNext)
      },
      handleGoTO(e) {
        ;(e.keyCode === Ct.ENTER || e.type === 'click') &&
          this.handleChange(this.stateCurrentInputValue)
      },
      renderPrev(e) {
        const { itemRender: t } = this.$props,
          n = t({
            page: e,
            type: 'prev',
            originalElement: this.getItemIcon('prevIcon', 'prev page')
          }),
          o = !this.hasPrev()
        return Kt(n) ? Qt(n, o ? { disabled: o } : {}) : n
      },
      renderNext(e) {
        const { itemRender: t } = this.$props,
          n = t({
            page: e,
            type: 'next',
            originalElement: this.getItemIcon('nextIcon', 'next page')
          }),
          o = !this.hasNext()
        return Kt(n) ? Qt(n, o ? { disabled: o } : {}) : n
      }
    },
    render() {
      const {
          prefixCls: e,
          disabled: t,
          hideOnSinglePage: n,
          total: o,
          locale: l,
          showQuickJumper: r,
          showLessItems: a,
          showTitle: i,
          showTotal: s,
          simple: f,
          itemRender: d,
          showPrevNextJumpers: u,
          jumpPrevIcon: y,
          jumpNextIcon: x,
          selectComponentClass: b,
          selectPrefixCls: p,
          pageSizeOptions: c
        } = this.$props,
        { stateCurrent: v, statePageSize: S } = this,
        h = kr(this.$attrs).extraAttrs,
        { class: $ } = h,
        w = Yi(h, ['class'])
      if (n === !0 && this.total <= S) return null
      const k = rt(void 0, this.$data, this.$props),
        P = []
      let T = null,
        C = null,
        E = null,
        R = null,
        A = null
      const F = r && r.goButton,
        U = a ? 1 : 2,
        ee = v - 1 > 0 ? v - 1 : 0,
        re = v + 1 < k ? v + 1 : k,
        ie = this.hasPrev(),
        V = this.hasNext()
      if (f)
        return (
          F &&
            (typeof F == 'boolean'
              ? (A = g(
                  'button',
                  {
                    type: 'button',
                    onClick: this.handleGoTO,
                    onKeyup: this.handleGoTO
                  },
                  [l.jump_to_confirm]
                ))
              : (A = g(
                  'span',
                  { onClick: this.handleGoTO, onKeyup: this.handleGoTO },
                  [F]
                )),
            (A = g(
              'li',
              {
                title: i ? `${l.jump_to}${v}/${k}` : null,
                class: `${e}-simple-pager`
              },
              [A]
            ))),
          g(
            'ul',
            j(
              { class: ae(`${e} ${e}-simple`, { [`${e}-disabled`]: t }, $) },
              w
            ),
            [
              g(
                'li',
                {
                  title: i ? l.prev_page : null,
                  onClick: this.prev,
                  tabindex: ie ? 0 : null,
                  onKeypress: this.runIfEnterPrev,
                  class: ae(`${e}-prev`, { [`${e}-disabled`]: !ie }),
                  'aria-disabled': !ie
                },
                [this.renderPrev(ee)]
              ),
              g(
                'li',
                { title: i ? `${v}/${k}` : null, class: `${e}-simple-pager` },
                [
                  g(
                    xl,
                    {
                      type: 'text',
                      value: this.stateCurrentInputValue,
                      disabled: t,
                      onKeydown: this.handleKeyDown,
                      onKeyup: this.handleKeyUp,
                      onInput: this.handleKeyUp,
                      onChange: this.handleKeyUp,
                      size: '3'
                    },
                    null
                  ),
                  g('span', { class: `${e}-slash` }, [qn('／')]),
                  k
                ]
              ),
              g(
                'li',
                {
                  title: i ? l.next_page : null,
                  onClick: this.next,
                  tabindex: V ? 0 : null,
                  onKeypress: this.runIfEnterNext,
                  class: ae(`${e}-next`, { [`${e}-disabled`]: !V }),
                  'aria-disabled': !V
                },
                [this.renderNext(re)]
              ),
              A
            ]
          )
        )
      if (k <= 3 + U * 2) {
        const H = {
          locale: l,
          rootPrefixCls: e,
          showTitle: i,
          itemRender: d,
          onClick: this.handleChange,
          onKeypress: this.runIfEnter
        }
        k ||
          P.push(
            g(
              xt,
              j(
                j({}, H),
                {},
                { key: 'noPager', page: 1, class: `${e}-item-disabled` }
              ),
              null
            )
          )
        for (let M = 1; M <= k; M += 1) {
          const q = v === M
          P.push(g(xt, j(j({}, H), {}, { key: M, page: M, active: q }), null))
        }
      } else {
        const H = a ? l.prev_3 : l.prev_5,
          M = a ? l.next_3 : l.next_5
        u &&
          ((T = g(
            'li',
            {
              title: this.showTitle ? H : null,
              key: 'prev',
              onClick: this.jumpPrev,
              tabindex: '0',
              onKeypress: this.runIfEnterJumpPrev,
              class: ae(`${e}-jump-prev`, {
                [`${e}-jump-prev-custom-icon`]: !!y
              })
            },
            [
              d({
                page: this.getJumpPrevPage(),
                type: 'jump-prev',
                originalElement: this.getItemIcon('jumpPrevIcon', 'prev page')
              })
            ]
          )),
          (C = g(
            'li',
            {
              title: this.showTitle ? M : null,
              key: 'next',
              tabindex: '0',
              onClick: this.jumpNext,
              onKeypress: this.runIfEnterJumpNext,
              class: ae(`${e}-jump-next`, {
                [`${e}-jump-next-custom-icon`]: !!x
              })
            },
            [
              d({
                page: this.getJumpNextPage(),
                type: 'jump-next',
                originalElement: this.getItemIcon('jumpNextIcon', 'next page')
              })
            ]
          ))),
          (R = g(
            xt,
            {
              locale: l,
              last: !0,
              rootPrefixCls: e,
              onClick: this.handleChange,
              onKeypress: this.runIfEnter,
              key: k,
              page: k,
              active: !1,
              showTitle: i,
              itemRender: d
            },
            null
          )),
          (E = g(
            xt,
            {
              locale: l,
              rootPrefixCls: e,
              onClick: this.handleChange,
              onKeypress: this.runIfEnter,
              key: 1,
              page: 1,
              active: !1,
              showTitle: i,
              itemRender: d
            },
            null
          ))
        let q = Math.max(1, v - U),
          G = Math.min(v + U, k)
        v - 1 <= U && (G = 1 + U * 2), k - v <= U && (q = k - U * 2)
        for (let Oe = q; Oe <= G; Oe += 1) {
          const de = v === Oe
          P.push(
            g(
              xt,
              {
                locale: l,
                rootPrefixCls: e,
                onClick: this.handleChange,
                onKeypress: this.runIfEnter,
                key: Oe,
                page: Oe,
                active: de,
                showTitle: i,
                itemRender: d
              },
              null
            )
          )
        }
        v - 1 >= U * 2 &&
          v !== 1 + 2 &&
          ((P[0] = g(
            xt,
            {
              locale: l,
              rootPrefixCls: e,
              onClick: this.handleChange,
              onKeypress: this.runIfEnter,
              key: q,
              page: q,
              class: `${e}-item-after-jump-prev`,
              active: !1,
              showTitle: this.showTitle,
              itemRender: d
            },
            null
          )),
          P.unshift(T)),
          k - v >= U * 2 &&
            v !== k - 2 &&
            ((P[P.length - 1] = g(
              xt,
              {
                locale: l,
                rootPrefixCls: e,
                onClick: this.handleChange,
                onKeypress: this.runIfEnter,
                key: G,
                page: G,
                class: `${e}-item-before-jump-next`,
                active: !1,
                showTitle: this.showTitle,
                itemRender: d
              },
              null
            )),
            P.push(C)),
          q !== 1 && P.unshift(E),
          G !== k && P.push(R)
      }
      let Q = null
      s &&
        (Q = g('li', { class: `${e}-total-text` }, [
          s(o, [o === 0 ? 0 : (v - 1) * S + 1, v * S > o ? o : v * S])
        ]))
      const L = !ie || !k,
        Z = !V || !k,
        _ = this.buildOptionText || this.$slots.buildOptionText
      return g(
        'ul',
        j(
          j({ unselectable: 'on', ref: 'paginationNode' }, w),
          {},
          { class: ae({ [`${e}`]: !0, [`${e}-disabled`]: t }, $) }
        ),
        [
          Q,
          g(
            'li',
            {
              title: i ? l.prev_page : null,
              onClick: this.prev,
              tabindex: L ? null : 0,
              onKeypress: this.runIfEnterPrev,
              class: ae(`${e}-prev`, { [`${e}-disabled`]: L }),
              'aria-disabled': L
            },
            [this.renderPrev(ee)]
          ),
          P,
          g(
            'li',
            {
              title: i ? l.next_page : null,
              onClick: this.next,
              tabindex: Z ? null : 0,
              onKeypress: this.runIfEnterNext,
              class: ae(`${e}-next`, { [`${e}-disabled`]: Z }),
              'aria-disabled': Z
            },
            [this.renderNext(re)]
          ),
          g(
            Ui,
            {
              disabled: t,
              locale: l,
              rootPrefixCls: e,
              selectComponentClass: b,
              selectPrefixCls: p,
              changeSize: this.getShowSizeChanger()
                ? this.changePageSize
                : null,
              current: v,
              pageSize: S,
              pageSizeOptions: c,
              buildOptionText: _ || null,
              quickGo: this.shouldDisplayQuickJumper()
                ? this.handleChange
                : null,
              goButton: F
            },
            null
          )
        ]
      )
    }
  }),
  es = e => {
    const { componentCls: t } = e
    return {
      [`${t}-disabled`]: {
        '&, &:hover': {
          cursor: 'not-allowed',
          [`${t}-item-link`]: {
            color: e.colorTextDisabled,
            cursor: 'not-allowed'
          }
        },
        '&:focus-visible': {
          cursor: 'not-allowed',
          [`${t}-item-link`]: {
            color: e.colorTextDisabled,
            cursor: 'not-allowed'
          }
        }
      },
      [`&${t}-disabled`]: {
        cursor: 'not-allowed',
        [`&${t}-mini`]: {
          [`
          &:hover ${t}-item:not(${t}-item-active),
          &:active ${t}-item:not(${t}-item-active),
          &:hover ${t}-item-link,
          &:active ${t}-item-link
        `]: { backgroundColor: 'transparent' }
        },
        [`${t}-item`]: {
          cursor: 'not-allowed',
          '&:hover, &:active': { backgroundColor: 'transparent' },
          a: {
            color: e.colorTextDisabled,
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'not-allowed'
          },
          '&-active': {
            borderColor: e.colorBorder,
            backgroundColor: e.paginationItemDisabledBgActive,
            '&:hover, &:active': {
              backgroundColor: e.paginationItemDisabledBgActive
            },
            a: { color: e.paginationItemDisabledColorActive }
          }
        },
        [`${t}-item-link`]: {
          color: e.colorTextDisabled,
          cursor: 'not-allowed',
          '&:hover, &:active': { backgroundColor: 'transparent' },
          [`${t}-simple&`]: {
            backgroundColor: 'transparent',
            '&:hover, &:active': { backgroundColor: 'transparent' }
          }
        },
        [`${t}-simple-pager`]: { color: e.colorTextDisabled },
        [`${t}-jump-prev, ${t}-jump-next`]: {
          [`${t}-item-link-icon`]: { opacity: 0 },
          [`${t}-item-ellipsis`]: { opacity: 1 }
        }
      },
      [`&${t}-simple`]: {
        [`${t}-prev, ${t}-next`]: {
          [`&${t}-disabled ${t}-item-link`]: {
            '&:hover, &:active': { backgroundColor: 'transparent' }
          }
        }
      }
    }
  },
  ts = e => {
    const { componentCls: t } = e
    return {
      [`&${t}-mini ${t}-total-text, &${t}-mini ${t}-simple-pager`]: {
        height: e.paginationItemSizeSM,
        lineHeight: `${e.paginationItemSizeSM}px`
      },
      [`&${t}-mini ${t}-item`]: {
        minWidth: e.paginationItemSizeSM,
        height: e.paginationItemSizeSM,
        margin: 0,
        lineHeight: `${e.paginationItemSizeSM - 2}px`
      },
      [`&${t}-mini ${t}-item:not(${t}-item-active)`]: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        '&:hover': { backgroundColor: e.colorBgTextHover },
        '&:active': { backgroundColor: e.colorBgTextActive }
      },
      [`&${t}-mini ${t}-prev, &${t}-mini ${t}-next`]: {
        minWidth: e.paginationItemSizeSM,
        height: e.paginationItemSizeSM,
        margin: 0,
        lineHeight: `${e.paginationItemSizeSM}px`,
        [`&:hover ${t}-item-link`]: { backgroundColor: e.colorBgTextHover },
        [`&:active ${t}-item-link`]: { backgroundColor: e.colorBgTextActive },
        [`&${t}-disabled:hover ${t}-item-link`]: {
          backgroundColor: 'transparent'
        }
      },
      [`
    &${t}-mini ${t}-prev ${t}-item-link,
    &${t}-mini ${t}-next ${t}-item-link
    `]: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        '&::after': {
          height: e.paginationItemSizeSM,
          lineHeight: `${e.paginationItemSizeSM}px`
        }
      },
      [`&${t}-mini ${t}-jump-prev, &${t}-mini ${t}-jump-next`]: {
        height: e.paginationItemSizeSM,
        marginInlineEnd: 0,
        lineHeight: `${e.paginationItemSizeSM}px`
      },
      [`&${t}-mini ${t}-options`]: {
        marginInlineStart: e.paginationMiniOptionsMarginInlineStart,
        '&-size-changer': { top: e.paginationMiniOptionsSizeChangerTop },
        '&-quick-jumper': {
          height: e.paginationItemSizeSM,
          lineHeight: `${e.paginationItemSizeSM}px`,
          input: m(m({}, ra(e)), {
            width: e.paginationMiniQuickJumperInputWidth,
            height: e.controlHeightSM
          })
        }
      }
    }
  },
  ns = e => {
    const { componentCls: t } = e
    return {
      [`
    &${t}-simple ${t}-prev,
    &${t}-simple ${t}-next
    `]: {
        height: e.paginationItemSizeSM,
        lineHeight: `${e.paginationItemSizeSM}px`,
        verticalAlign: 'top',
        [`${t}-item-link`]: {
          height: e.paginationItemSizeSM,
          backgroundColor: 'transparent',
          border: 0,
          '&:hover': { backgroundColor: e.colorBgTextHover },
          '&:active': { backgroundColor: e.colorBgTextActive },
          '&::after': {
            height: e.paginationItemSizeSM,
            lineHeight: `${e.paginationItemSizeSM}px`
          }
        }
      },
      [`&${t}-simple ${t}-simple-pager`]: {
        display: 'inline-block',
        height: e.paginationItemSizeSM,
        marginInlineEnd: e.marginXS,
        input: {
          boxSizing: 'border-box',
          height: '100%',
          marginInlineEnd: e.marginXS,
          padding: `0 ${e.paginationItemPaddingInline}px`,
          textAlign: 'center',
          backgroundColor: e.paginationItemInputBg,
          border: `${e.lineWidth}px ${e.lineType} ${e.colorBorder}`,
          borderRadius: e.borderRadius,
          outline: 'none',
          transition: `border-color ${e.motionDurationMid}`,
          color: 'inherit',
          '&:hover': { borderColor: e.colorPrimary },
          '&:focus': {
            borderColor: e.colorPrimaryHover,
            boxShadow: `${e.inputOutlineOffset}px 0 ${e.controlOutlineWidth}px ${e.controlOutline}`
          },
          '&[disabled]': {
            color: e.colorTextDisabled,
            backgroundColor: e.colorBgContainerDisabled,
            borderColor: e.colorBorder,
            cursor: 'not-allowed'
          }
        }
      }
    }
  },
  os = e => {
    const { componentCls: t } = e
    return {
      [`${t}-jump-prev, ${t}-jump-next`]: {
        outline: 0,
        [`${t}-item-container`]: {
          position: 'relative',
          [`${t}-item-link-icon`]: {
            color: e.colorPrimary,
            fontSize: e.fontSizeSM,
            opacity: 0,
            transition: `all ${e.motionDurationMid}`,
            '&-svg': {
              top: 0,
              insetInlineEnd: 0,
              bottom: 0,
              insetInlineStart: 0,
              margin: 'auto'
            }
          },
          [`${t}-item-ellipsis`]: {
            position: 'absolute',
            top: 0,
            insetInlineEnd: 0,
            bottom: 0,
            insetInlineStart: 0,
            display: 'block',
            margin: 'auto',
            color: e.colorTextDisabled,
            fontFamily: 'Arial, Helvetica, sans-serif',
            letterSpacing: e.paginationEllipsisLetterSpacing,
            textAlign: 'center',
            textIndent: e.paginationEllipsisTextIndent,
            opacity: 1,
            transition: `all ${e.motionDurationMid}`
          }
        },
        '&:hover': {
          [`${t}-item-link-icon`]: { opacity: 1 },
          [`${t}-item-ellipsis`]: { opacity: 0 }
        },
        '&:focus-visible': m(
          {
            [`${t}-item-link-icon`]: { opacity: 1 },
            [`${t}-item-ellipsis`]: { opacity: 0 }
          },
          Pt(e)
        )
      },
      [`
    ${t}-prev,
    ${t}-jump-prev,
    ${t}-jump-next
    `]: { marginInlineEnd: e.marginXS },
      [`
    ${t}-prev,
    ${t}-next,
    ${t}-jump-prev,
    ${t}-jump-next
    `]: {
        display: 'inline-block',
        minWidth: e.paginationItemSize,
        height: e.paginationItemSize,
        color: e.colorText,
        fontFamily: e.paginationFontFamily,
        lineHeight: `${e.paginationItemSize}px`,
        textAlign: 'center',
        verticalAlign: 'middle',
        listStyle: 'none',
        borderRadius: e.borderRadius,
        cursor: 'pointer',
        transition: `all ${e.motionDurationMid}`
      },
      [`${t}-prev, ${t}-next`]: {
        fontFamily: 'Arial, Helvetica, sans-serif',
        outline: 0,
        button: { color: e.colorText, cursor: 'pointer', userSelect: 'none' },
        [`${t}-item-link`]: {
          display: 'block',
          width: '100%',
          height: '100%',
          padding: 0,
          fontSize: e.fontSizeSM,
          textAlign: 'center',
          backgroundColor: 'transparent',
          border: `${e.lineWidth}px ${e.lineType} transparent`,
          borderRadius: e.borderRadius,
          outline: 'none',
          transition: `all ${e.motionDurationMid}`
        },
        [`&:focus-visible ${t}-item-link`]: m({}, Pt(e)),
        [`&:hover ${t}-item-link`]: { backgroundColor: e.colorBgTextHover },
        [`&:active ${t}-item-link`]: { backgroundColor: e.colorBgTextActive },
        [`&${t}-disabled:hover`]: {
          [`${t}-item-link`]: { backgroundColor: 'transparent' }
        }
      },
      [`${t}-slash`]: {
        marginInlineEnd: e.paginationSlashMarginInlineEnd,
        marginInlineStart: e.paginationSlashMarginInlineStart
      },
      [`${t}-options`]: {
        display: 'inline-block',
        marginInlineStart: e.margin,
        verticalAlign: 'middle',
        '&-size-changer.-select': { display: 'inline-block', width: 'auto' },
        '&-quick-jumper': {
          display: 'inline-block',
          height: e.controlHeight,
          marginInlineStart: e.marginXS,
          lineHeight: `${e.controlHeight}px`,
          verticalAlign: 'top',
          input: m(m({}, aa(e)), {
            width: e.controlHeightLG * 1.25,
            height: e.controlHeight,
            boxSizing: 'border-box',
            margin: 0,
            marginInlineStart: e.marginXS,
            marginInlineEnd: e.marginXS
          })
        }
      }
    }
  },
  ls = e => {
    const { componentCls: t } = e
    return {
      [`${t}-item`]: m(
        m(
          {
            display: 'inline-block',
            minWidth: e.paginationItemSize,
            height: e.paginationItemSize,
            marginInlineEnd: e.marginXS,
            fontFamily: e.paginationFontFamily,
            lineHeight: `${e.paginationItemSize - 2}px`,
            textAlign: 'center',
            verticalAlign: 'middle',
            listStyle: 'none',
            backgroundColor: 'transparent',
            border: `${e.lineWidth}px ${e.lineType} transparent`,
            borderRadius: e.borderRadius,
            outline: 0,
            cursor: 'pointer',
            userSelect: 'none',
            a: {
              display: 'block',
              padding: `0 ${e.paginationItemPaddingInline}px`,
              color: e.colorText,
              transition: 'none',
              '&:hover': { textDecoration: 'none' }
            },
            [`&:not(${t}-item-active)`]: {
              '&:hover': {
                transition: `all ${e.motionDurationMid}`,
                backgroundColor: e.colorBgTextHover
              },
              '&:active': { backgroundColor: e.colorBgTextActive }
            }
          },
          Sn(e)
        ),
        {
          '&-active': {
            fontWeight: e.paginationFontWeightActive,
            backgroundColor: e.paginationItemBgActive,
            borderColor: e.colorPrimary,
            a: { color: e.colorPrimary },
            '&:hover': { borderColor: e.colorPrimaryHover },
            '&:hover a': { color: e.colorPrimaryHover }
          }
        }
      )
    }
  },
  rs = e => {
    const { componentCls: t } = e
    return {
      [t]: m(
        m(
          m(
            m(
              m(
                m(
                  m(m({}, Je(e)), {
                    'ul, ol': { margin: 0, padding: 0, listStyle: 'none' },
                    '&::after': {
                      display: 'block',
                      clear: 'both',
                      height: 0,
                      overflow: 'hidden',
                      visibility: 'hidden',
                      content: '""'
                    },
                    [`${t}-total-text`]: {
                      display: 'inline-block',
                      height: e.paginationItemSize,
                      marginInlineEnd: e.marginXS,
                      lineHeight: `${e.paginationItemSize - 2}px`,
                      verticalAlign: 'middle'
                    }
                  }),
                  ls(e)
                ),
                os(e)
              ),
              ns(e)
            ),
            ts(e)
          ),
          es(e)
        ),
        {
          [`@media only screen and (max-width: ${e.screenLG}px)`]: {
            [`${t}-item`]: {
              '&-after-jump-prev, &-before-jump-next': { display: 'none' }
            }
          },
          [`@media only screen and (max-width: ${e.screenSM}px)`]: {
            [`${t}-options`]: { display: 'none' }
          }
        }
      ),
      [`&${e.componentCls}-rtl`]: { direction: 'rtl' }
    }
  },
  as = e => {
    const { componentCls: t } = e
    return {
      [`${t}${t}-disabled`]: {
        '&, &:hover': { [`${t}-item-link`]: { borderColor: e.colorBorder } },
        '&:focus-visible': {
          [`${t}-item-link`]: { borderColor: e.colorBorder }
        },
        [`${t}-item, ${t}-item-link`]: {
          backgroundColor: e.colorBgContainerDisabled,
          borderColor: e.colorBorder,
          [`&:hover:not(${t}-item-active)`]: {
            backgroundColor: e.colorBgContainerDisabled,
            borderColor: e.colorBorder,
            a: { color: e.colorTextDisabled }
          },
          [`&${t}-item-active`]: {
            backgroundColor: e.paginationItemDisabledBgActive
          }
        },
        [`${t}-prev, ${t}-next`]: {
          '&:hover button': {
            backgroundColor: e.colorBgContainerDisabled,
            borderColor: e.colorBorder,
            color: e.colorTextDisabled
          },
          [`${t}-item-link`]: {
            backgroundColor: e.colorBgContainerDisabled,
            borderColor: e.colorBorder
          }
        }
      },
      [t]: {
        [`${t}-prev, ${t}-next`]: {
          '&:hover button': {
            borderColor: e.colorPrimaryHover,
            backgroundColor: e.paginationItemBg
          },
          [`${t}-item-link`]: {
            backgroundColor: e.paginationItemLinkBg,
            borderColor: e.colorBorder
          },
          [`&:hover ${t}-item-link`]: {
            borderColor: e.colorPrimary,
            backgroundColor: e.paginationItemBg,
            color: e.colorPrimary
          },
          [`&${t}-disabled`]: {
            [`${t}-item-link`]: {
              borderColor: e.colorBorder,
              color: e.colorTextDisabled
            }
          }
        },
        [`${t}-item`]: {
          backgroundColor: e.paginationItemBg,
          border: `${e.lineWidth}px ${e.lineType} ${e.colorBorder}`,
          [`&:hover:not(${t}-item-active)`]: {
            borderColor: e.colorPrimary,
            backgroundColor: e.paginationItemBg,
            a: { color: e.colorPrimary }
          },
          '&-active': { borderColor: e.colorPrimary }
        }
      }
    }
  },
  is = Dt('Pagination', e => {
    const t = Rt(
      e,
      {
        paginationItemSize: e.controlHeight,
        paginationFontFamily: e.fontFamily,
        paginationItemBg: e.colorBgContainer,
        paginationItemBgActive: e.colorBgContainer,
        paginationFontWeightActive: e.fontWeightStrong,
        paginationItemSizeSM: e.controlHeightSM,
        paginationItemInputBg: e.colorBgContainer,
        paginationMiniOptionsSizeChangerTop: 0,
        paginationItemDisabledBgActive: e.controlItemBgActiveDisabled,
        paginationItemDisabledColorActive: e.colorTextDisabled,
        paginationItemLinkBg: e.colorBgContainer,
        inputOutlineOffset: '0 0',
        paginationMiniOptionsMarginInlineStart: e.marginXXS / 2,
        paginationMiniQuickJumperInputWidth: e.controlHeightLG * 1.1,
        paginationItemPaddingInline: e.marginXXS * 1.5,
        paginationEllipsisLetterSpacing: e.marginXXS / 2,
        paginationSlashMarginInlineStart: e.marginXXS,
        paginationSlashMarginInlineEnd: e.marginSM,
        paginationEllipsisTextIndent: '0.13em'
      },
      la(e)
    )
    return [rs(t), e.wireframe && as(t)]
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
const cs = () => ({
    total: Number,
    defaultCurrent: Number,
    disabled: pe(),
    current: Number,
    defaultPageSize: Number,
    pageSize: Number,
    hideOnSinglePage: pe(),
    showSizeChanger: pe(),
    pageSizeOptions: je(),
    buildOptionText: ye(),
    showQuickJumper: Ve([Boolean, Object]),
    showTotal: ye(),
    size: Xe(),
    simple: pe(),
    locale: Object,
    prefixCls: String,
    selectPrefixCls: String,
    totalBoundaryShowSizeChanger: Number,
    selectComponentClass: String,
    itemRender: ye(),
    role: String,
    responsive: Boolean,
    showLessItems: pe(),
    onChange: ye(),
    onShowSizeChange: ye(),
    'onUpdate:current': ye(),
    'onUpdate:pageSize': ye()
  }),
  ds = ge({
    compatConfig: { MODE: 3 },
    name: 'APagination',
    inheritAttrs: !1,
    props: cs(),
    setup(e, t) {
      let { slots: n, attrs: o } = t
      const { prefixCls: l, configProvider: r, direction: a, size: i } = qe(
          'pagination',
          e
        ),
        [s, f] = is(l),
        d = O(() => r.getPrefixCls('select', e.selectPrefixCls)),
        u = $l(),
        [y] = hl('Pagination', Er, Fe(e, 'locale')),
        x = b => {
          const p = g('span', { class: `${b}-item-ellipsis` }, [qn('•••')]),
            c = g(
              'button',
              { class: `${b}-item-link`, type: 'button', tabindex: -1 },
              [a.value === 'rtl' ? g(Jt, null, null) : g(So, null, null)]
            ),
            v = g(
              'button',
              { class: `${b}-item-link`, type: 'button', tabindex: -1 },
              [a.value === 'rtl' ? g(So, null, null) : g(Jt, null, null)]
            ),
            S = g('a', { rel: 'nofollow', class: `${b}-item-link` }, [
              g('div', { class: `${b}-item-container` }, [
                a.value === 'rtl'
                  ? g(_o, { class: `${b}-item-link-icon` }, null)
                  : g(No, { class: `${b}-item-link-icon` }, null),
                p
              ])
            ]),
            h = g('a', { rel: 'nofollow', class: `${b}-item-link` }, [
              g('div', { class: `${b}-item-container` }, [
                a.value === 'rtl'
                  ? g(No, { class: `${b}-item-link-icon` }, null)
                  : g(_o, { class: `${b}-item-link-icon` }, null),
                p
              ])
            ])
          return { prevIcon: c, nextIcon: v, jumpPrevIcon: S, jumpNextIcon: h }
        }
      return () => {
        var b
        const {
            itemRender: p = n.itemRender,
            buildOptionText: c = n.buildOptionText,
            selectComponentClass: v,
            responsive: S
          } = e,
          h = ss(e, [
            'itemRender',
            'buildOptionText',
            'selectComponentClass',
            'responsive'
          ]),
          $ =
            i.value === 'small' ||
            !!(
              !((b = u.value) === null || b === void 0) &&
              b.xs &&
              !i.value &&
              S
            ),
          w = m(
            m(
              m(m(m({}, h), x(l.value)), {
                prefixCls: l.value,
                selectPrefixCls: d.value,
                selectComponentClass: v || ($ ? Xi : Gi),
                locale: y.value,
                buildOptionText: c
              }),
              o
            ),
            {
              class: ae(
                {
                  [`${l.value}-mini`]: $,
                  [`${l.value}-rtl`]: a.value === 'rtl'
                },
                o.class,
                f.value
              ),
              itemRender: p
            }
          )
        return s(g(Zi, w, null))
      }
    }
  }),
  us = Tr(ds),
  Hl = Symbol('TableContextProps'),
  fs = e => {
    Ue(Hl, e)
  },
  lt = () => Ge(Hl, {}),
  ps = 'RC_TABLE_KEY'
function Wl(e) {
  return e == null ? [] : Array.isArray(e) ? e : [e]
}
function Vl(e, t) {
  if (!t && typeof t != 'number') return e
  const n = Wl(t)
  let o = e
  for (let l = 0; l < n.length; l += 1) {
    if (!o) return null
    const r = n[l]
    o = o[r]
  }
  return o
}
function rn(e) {
  const t = [],
    n = {}
  return (
    e.forEach(o => {
      const { key: l, dataIndex: r } = o || {}
      let a = l || Wl(r).join('-') || ps
      for (; n[a]; ) a = `${a}_next`
      ;(n[a] = !0), t.push(a)
    }),
    t
  )
}
function vs() {
  const e = {}
  function t(r, a) {
    a &&
      Object.keys(a).forEach(i => {
        const s = a[i]
        s && typeof s == 'object'
          ? ((r[i] = r[i] || {}), t(r[i], s))
          : (r[i] = s)
      })
  }
  for (var n = arguments.length, o = new Array(n), l = 0; l < n; l++)
    o[l] = arguments[l]
  return (
    o.forEach(r => {
      t(e, r)
    }),
    e
  )
}
function Tn(e) {
  return e != null
}
const Xl = Symbol('SlotsContextProps'),
  gs = e => {
    Ue(Xl, e)
  },
  oo = () =>
    Ge(
      Xl,
      O(() => ({}))
    ),
  Gl = Symbol('ContextProps'),
  hs = e => {
    Ue(Gl, e)
  },
  ms = () => Ge(Gl, { onResizeColumn: () => {} })
globalThis && globalThis.__rest
const Tt = 'RC_TABLE_INTERNAL_COL_DEFINE',
  Ul = Symbol('HoverContextProps'),
  ys = e => {
    Ue(Ul, e)
  },
  bs = () => Ge(Ul, { startRow: oe(-1), endRow: oe(-1), onHover() {} }),
  Kn = oe(!1),
  xs = () => {
    ot(() => {
      Kn.value = Kn.value || ia('position', 'sticky')
    })
  },
  Cs = () => Kn
var Ss =
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
function $s(e, t, n, o) {
  const l = e + t - 1
  return e <= o && l >= n
}
function ws(e) {
  return e && typeof e == 'object' && !Array.isArray(e) && !Xt(e)
}
const an = ge({
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
    const o = oo(),
      { onHover: l, startRow: r, endRow: a } = bs(),
      i = O(() => {
        var p, c, v, S
        return (v =
          (p = e.colSpan) !== null && p !== void 0
            ? p
            : (c = e.additionalProps) === null || c === void 0
            ? void 0
            : c.colSpan) !== null && v !== void 0
          ? v
          : (S = e.additionalProps) === null || S === void 0
          ? void 0
          : S.colspan
      }),
      s = O(() => {
        var p, c, v, S
        return (v =
          (p = e.rowSpan) !== null && p !== void 0
            ? p
            : (c = e.additionalProps) === null || c === void 0
            ? void 0
            : c.rowSpan) !== null && v !== void 0
          ? v
          : (S = e.additionalProps) === null || S === void 0
          ? void 0
          : S.rowspan
      }),
      f = Ye(() => {
        const { index: p } = e
        return $s(p, s.value || 1, r.value, a.value)
      }),
      d = Cs(),
      u = (p, c) => {
        var v
        const { record: S, index: h, additionalProps: $ } = e
        S && l(h, h + c - 1),
          (v = $ == null ? void 0 : $.onMouseenter) === null ||
            v === void 0 ||
            v.call($, p)
      },
      y = p => {
        var c
        const { record: v, additionalProps: S } = e
        v && l(-1, -1),
          (c = S == null ? void 0 : S.onMouseleave) === null ||
            c === void 0 ||
            c.call(S, p)
      },
      x = p => {
        const c = Ft(p)[0]
        return Xt(c)
          ? c.type === Ar
            ? c.children
            : Array.isArray(c.children)
            ? x(c.children)
            : void 0
          : c
      },
      b = oe(null)
    return (
      Ee([f, () => e.prefixCls, b], () => {
        const p = Kr(b.value)
        p &&
          (f.value
            ? sa(p, `${e.prefixCls}-cell-row-hover`)
            : ca(p, `${e.prefixCls}-cell-row-hover`))
      }),
      () => {
        var p, c, v, S, h, $
        const {
            prefixCls: w,
            record: k,
            index: P,
            renderIndex: T,
            dataIndex: C,
            customRender: E,
            component: R = 'td',
            fixLeft: A,
            fixRight: F,
            firstFixLeft: U,
            lastFixLeft: ee,
            firstFixRight: re,
            lastFixRight: ie,
            appendNode: V = (p = n.appendNode) === null || p === void 0
              ? void 0
              : p.call(n),
            additionalProps: Q = {},
            ellipsis: L,
            align: Z,
            rowType: _,
            isSticky: H,
            column: M = {},
            cellType: q
          } = e,
          G = `${w}-cell`
        let Oe, de
        const Te = (c = n.default) === null || c === void 0 ? void 0 : c.call(n)
        if (Tn(Te) || q === 'header') de = Te
        else {
          const K = Vl(k, C)
          if (((de = K), E)) {
            const I = E({
              text: K,
              value: K,
              record: k,
              index: P,
              renderIndex: T,
              column: M.__originColumn__
            })
            ws(I) ? ((de = I.children), (Oe = I.props)) : (de = I)
          }
          if (
            !(Tt in M) &&
            q === 'body' &&
            o.value.bodyCell &&
            !(!((v = M.slots) === null || v === void 0) && v.customRender)
          ) {
            const I = Jn(
              o.value,
              'bodyCell',
              {
                text: K,
                value: K,
                record: k,
                index: P,
                column: M.__originColumn__
              },
              () => {
                const D = de === void 0 ? K : de
                return [
                  (typeof D == 'object' && Kt(D)) || typeof D != 'object'
                    ? D
                    : null
                ]
              }
            )
            de = Xn(I)
          }
          e.transformCellText &&
            (de = e.transformCellText({
              text: de,
              record: k,
              index: P,
              column: M.__originColumn__
            }))
        }
        typeof de == 'object' && !Array.isArray(de) && !Xt(de) && (de = null),
          L && (ee || re) && (de = g('span', { class: `${G}-content` }, [de])),
          Array.isArray(de) && de.length === 1 && (de = de[0])
        const Ke = Oe || {},
          { colSpan: Be, rowSpan: Ae, style: He, class: De } = Ke,
          Re = Ss(Ke, ['colSpan', 'rowSpan', 'style', 'class']),
          X =
            (S = Be !== void 0 ? Be : i.value) !== null && S !== void 0 ? S : 1,
          fe =
            (h = Ae !== void 0 ? Ae : s.value) !== null && h !== void 0 ? h : 1
        if (X === 0 || fe === 0) return null
        const J = {},
          se = typeof A == 'number' && d.value,
          ue = typeof F == 'number' && d.value
        se && ((J.position = 'sticky'), (J.left = `${A}px`)),
          ue && ((J.position = 'sticky'), (J.right = `${F}px`))
        const Ie = {}
        Z && (Ie.textAlign = Z)
        let ce
        const be = L === !0 ? { showTitle: !0 } : L
        be &&
          (be.showTitle || _ === 'header') &&
          (typeof de == 'string' || typeof de == 'number'
            ? (ce = de.toString())
            : Xt(de) && (ce = x([de])))
        const ke = m(m(m({ title: ce }, Re), Q), {
          colSpan: X !== 1 ? X : null,
          rowSpan: fe !== 1 ? fe : null,
          class: ae(
            G,
            {
              [`${G}-fix-left`]: se && d.value,
              [`${G}-fix-left-first`]: U && d.value,
              [`${G}-fix-left-last`]: ee && d.value,
              [`${G}-fix-right`]: ue && d.value,
              [`${G}-fix-right-first`]: re && d.value,
              [`${G}-fix-right-last`]: ie && d.value,
              [`${G}-ellipsis`]: L,
              [`${G}-with-append`]: V,
              [`${G}-fix-sticky`]: (se || ue) && H && d.value
            },
            Q.class,
            De
          ),
          onMouseenter: K => {
            u(K, fe)
          },
          onMouseleave: y,
          style: [Q.style, Ie, J, He]
        })
        return g(R, j(j({}, ke), {}, { ref: b }), {
          default: () => [
            V,
            de,
            ($ = n.dragHandle) === null || $ === void 0 ? void 0 : $.call(n)
          ]
        })
      }
    )
  }
})
function lo(e, t, n, o, l) {
  const r = n[e] || {},
    a = n[t] || {}
  let i, s
  r.fixed === 'left' ? (i = o.left[e]) : a.fixed === 'right' && (s = o.right[t])
  let f = !1,
    d = !1,
    u = !1,
    y = !1
  const x = n[t + 1],
    b = n[e - 1]
  return (
    l === 'rtl'
      ? i !== void 0
        ? (y = !(b && b.fixed === 'left'))
        : s !== void 0 && (u = !(x && x.fixed === 'right'))
      : i !== void 0
      ? (f = !(x && x.fixed === 'left'))
      : s !== void 0 && (d = !(b && b.fixed === 'right')),
    {
      fixLeft: i,
      fixRight: s,
      lastFixLeft: f,
      firstFixRight: d,
      lastFixRight: u,
      firstFixLeft: y,
      isSticky: o.isSticky
    }
  )
}
const Ao = {
    mouse: { start: 'mousedown', move: 'mousemove', stop: 'mouseup' },
    touch: { start: 'touchstart', move: 'touchmove', stop: 'touchend' }
  },
  zo = 50,
  Os = ge({
    compatConfig: { MODE: 3 },
    name: 'DragHandle',
    props: {
      prefixCls: String,
      width: { type: Number, required: !0 },
      minWidth: { type: Number, default: zo },
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
      Gn(() => {
        l()
      }),
        Ne(() => {
          Qe(
            !isNaN(e.width),
            'Table',
            'width must be a number when use resizable'
          )
        })
      const { onResizeColumn: r } = ms(),
        a = O(() =>
          typeof e.minWidth == 'number' && !isNaN(e.minWidth) ? e.minWidth : zo
        ),
        i = O(() =>
          typeof e.maxWidth == 'number' && !isNaN(e.maxWidth)
            ? e.maxWidth
            : 1 / 0
        ),
        s = ml()
      let f = 0
      const d = oe(!1)
      let u
      const y = h => {
          let $ = 0
          h.touches
            ? h.touches.length
              ? ($ = h.touches[0].pageX)
              : ($ = h.changedTouches[0].pageX)
            : ($ = h.pageX)
          const w = t - $
          let k = Math.max(f - w, a.value)
          ;(k = Math.min(k, i.value)),
            $t.cancel(u),
            (u = $t(() => {
              r(k, e.column.__originColumn__)
            }))
        },
        x = h => {
          y(h)
        },
        b = h => {
          ;(d.value = !1), y(h), l()
        },
        p = (h, $) => {
          ;(d.value = !0),
            l(),
            (f = s.vnode.el.parentNode.getBoundingClientRect().width),
            !(h instanceof MouseEvent && h.which !== 1) &&
              (h.stopPropagation && h.stopPropagation(),
              (t = h.touches ? h.touches[0].pageX : h.pageX),
              (n = St(document.documentElement, $.move, x)),
              (o = St(document.documentElement, $.stop, b)))
        },
        c = h => {
          h.stopPropagation(), h.preventDefault(), p(h, Ao.mouse)
        },
        v = h => {
          h.stopPropagation(), h.preventDefault(), p(h, Ao.touch)
        },
        S = h => {
          h.stopPropagation(), h.preventDefault()
        }
      return () => {
        const { prefixCls: h } = e,
          $ = { [da ? 'onTouchstartPassive' : 'onTouchstart']: w => v(w) }
        return g(
          'div',
          j(
            j(
              {
                class: `${h}-resize-handle ${d.value ? 'dragging' : ''}`,
                onMousedown: c
              },
              $
            ),
            {},
            { onClick: S }
          ),
          [g('div', { class: `${h}-resize-handle-line` }, null)]
        )
      }
    }
  }),
  Ps = ge({
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
      const t = lt()
      return () => {
        const { prefixCls: n, direction: o } = t,
          {
            cells: l,
            stickyOffsets: r,
            flattenColumns: a,
            rowComponent: i,
            cellComponent: s,
            customHeaderRow: f,
            index: d
          } = e
        let u
        f &&
          (u = f(
            l.map(x => x.column),
            d
          ))
        const y = rn(l.map(x => x.column))
        return g(i, u, {
          default: () => [
            l.map((x, b) => {
              const { column: p } = x,
                c = lo(x.colStart, x.colEnd, a, r, o)
              let v
              p && p.customHeaderCell && (v = x.column.customHeaderCell(p))
              const S = p
              return g(
                an,
                j(
                  j(
                    j({}, x),
                    {},
                    {
                      cellType: 'header',
                      ellipsis: p.ellipsis,
                      align: p.align,
                      component: s,
                      prefixCls: n,
                      key: y[b]
                    },
                    c
                  ),
                  {},
                  { additionalProps: v, rowType: 'header', column: p }
                ),
                {
                  default: () => p.title,
                  dragHandle: () =>
                    S.resizable
                      ? g(
                          Os,
                          {
                            prefixCls: n,
                            width: S.width,
                            minWidth: S.minWidth,
                            maxWidth: S.maxWidth,
                            column: S
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
function Is(e) {
  const t = []
  function n(l, r) {
    let a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0
    t[a] = t[a] || []
    let i = r
    return l.filter(Boolean).map(f => {
      const d = {
        key: f.key,
        class: ae(f.className, f.class),
        column: f,
        colStart: i
      }
      let u = 1
      const y = f.children
      return (
        y &&
          y.length > 0 &&
          ((u = n(y, i, a + 1).reduce((x, b) => x + b, 0)),
          (d.hasSubColumns = !0)),
        'colSpan' in f && ({ colSpan: u } = f),
        'rowSpan' in f && (d.rowSpan = f.rowSpan),
        (d.colSpan = u),
        (d.colEnd = d.colStart + u - 1),
        t[a].push(d),
        (i += u),
        u
      )
    })
  }
  n(e, 0)
  const o = t.length
  for (let l = 0; l < o; l += 1)
    t[l].forEach(r => {
      !('rowSpan' in r) && !r.hasSubColumns && (r.rowSpan = o - l)
    })
  return t
}
const Fo = ge({
    name: 'TableHeader',
    inheritAttrs: !1,
    props: ['columns', 'flattenColumns', 'stickyOffsets', 'customHeaderRow'],
    setup(e) {
      const t = lt(),
        n = O(() => Is(e.columns))
      return () => {
        const { prefixCls: o, getComponent: l } = t,
          { stickyOffsets: r, flattenColumns: a, customHeaderRow: i } = e,
          s = l(['header', 'wrapper'], 'thead'),
          f = l(['header', 'row'], 'tr'),
          d = l(['header', 'cell'], 'th')
        return g(
          s,
          { class: `${o}-thead` },
          {
            default: () => [
              n.value.map((u, y) =>
                g(
                  Ps,
                  {
                    key: y,
                    flattenColumns: a,
                    cells: u,
                    stickyOffsets: r,
                    rowComponent: f,
                    cellComponent: d,
                    customHeaderRow: i,
                    index: y
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
  ql = Symbol('ExpandedRowProps'),
  ks = e => {
    Ue(ql, e)
  },
  Es = () => Ge(ql, {}),
  Yl = ge({
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
      const l = lt(),
        r = Es(),
        { fixHeader: a, fixColumn: i, componentWidth: s, horizonScroll: f } = r
      return () => {
        const {
          prefixCls: d,
          component: u,
          cellComponent: y,
          expanded: x,
          colSpan: b,
          isEmpty: p
        } = e
        return g(
          u,
          { class: o.class, style: { display: x ? null : 'none' } },
          {
            default: () => [
              g(
                an,
                { component: y, prefixCls: d, colSpan: b },
                {
                  default: () => {
                    var c
                    let v =
                      (c = n.default) === null || c === void 0
                        ? void 0
                        : c.call(n)
                    return (
                      (p ? f.value : i.value) &&
                        (v = g(
                          'div',
                          {
                            style: {
                              width: `${s.value -
                                (a.value ? l.scrollbarSize : 0)}px`,
                              position: 'sticky',
                              left: 0,
                              overflow: 'hidden'
                            },
                            class: `${d}-expanded-row-fixed`
                          },
                          [v]
                        )),
                      v
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
  Ts = ge({
    name: 'MeasureCell',
    props: ['columnKey'],
    setup(e, t) {
      let { emit: n } = t
      const o = ve()
      return (
        ot(() => {
          o.value && n('columnResize', e.columnKey, o.value.offsetWidth)
        }),
        () =>
          g(
            Cl,
            {
              onResize: l => {
                let { offsetWidth: r } = l
                n('columnResize', e.columnKey, r)
              }
            },
            {
              default: () => [
                g(
                  'td',
                  { ref: o, style: { padding: 0, border: 0, height: 0 } },
                  [
                    g('div', { style: { height: 0, overflow: 'hidden' } }, [
                      qn(' ')
                    ])
                  ]
                )
              ]
            }
          )
      )
    }
  }),
  Jl = Symbol('BodyContextProps'),
  Ks = e => {
    Ue(Jl, e)
  },
  Ql = () => Ge(Jl, {}),
  Ds = ge({
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
      const o = lt(),
        l = Ql(),
        r = oe(!1),
        a = O(() => e.expandedKeys && e.expandedKeys.has(e.recordKey))
      Ne(() => {
        a.value && (r.value = !0)
      })
      const i = O(
          () =>
            l.expandableType === 'row' &&
            (!e.rowExpandable || e.rowExpandable(e.record))
        ),
        s = O(() => l.expandableType === 'nest'),
        f = O(
          () =>
            e.childrenColumnName && e.record && e.record[e.childrenColumnName]
        ),
        d = O(() => i.value || s.value),
        u = (c, v) => {
          l.onTriggerExpand(c, v)
        },
        y = O(() => {
          var c
          return (
            ((c = e.customRow) === null || c === void 0
              ? void 0
              : c.call(e, e.record, e.index)) || {}
          )
        }),
        x = function(c) {
          var v, S
          l.expandRowByClick && d.value && u(e.record, c)
          for (
            var h = arguments.length, $ = new Array(h > 1 ? h - 1 : 0), w = 1;
            w < h;
            w++
          )
            $[w - 1] = arguments[w]
          ;(S = (v = y.value) === null || v === void 0 ? void 0 : v.onClick) ===
            null ||
            S === void 0 ||
            S.call(v, c, ...$)
        },
        b = O(() => {
          const { record: c, index: v, indent: S } = e,
            { rowClassName: h } = l
          return typeof h == 'string'
            ? h
            : typeof h == 'function'
            ? h(c, v, S)
            : ''
        }),
        p = O(() => rn(l.flattenColumns))
      return () => {
        const { class: c, style: v } = n,
          {
            record: S,
            index: h,
            rowKey: $,
            indent: w = 0,
            rowComponent: k,
            cellComponent: P
          } = e,
          { prefixCls: T, fixedInfoList: C, transformCellText: E } = o,
          {
            flattenColumns: R,
            expandedRowClassName: A,
            indentSize: F,
            expandIcon: U,
            expandedRowRender: ee,
            expandIconColumnIndex: re
          } = l,
          ie = g(
            k,
            j(
              j({}, y.value),
              {},
              {
                'data-row-key': $,
                class: ae(
                  c,
                  `${T}-row`,
                  `${T}-row-level-${w}`,
                  b.value,
                  y.value.class
                ),
                style: [v, y.value.style],
                onClick: x
              }
            ),
            {
              default: () => [
                R.map((Q, L) => {
                  const { customRender: Z, dataIndex: _, className: H } = Q,
                    M = p[L],
                    q = C[L]
                  let G
                  Q.customCell && (G = Q.customCell(S, h, Q))
                  const Oe =
                    L === (re || 0) && s.value
                      ? g(ht, null, [
                          g(
                            'span',
                            {
                              style: { paddingLeft: `${F * w}px` },
                              class: `${T}-row-indent indent-level-${w}`
                            },
                            null
                          ),
                          U({
                            prefixCls: T,
                            expanded: a.value,
                            expandable: f.value,
                            record: S,
                            onExpand: u
                          })
                        ])
                      : null
                  return g(
                    an,
                    j(
                      j(
                        {
                          cellType: 'body',
                          class: H,
                          ellipsis: Q.ellipsis,
                          align: Q.align,
                          component: P,
                          prefixCls: T,
                          key: M,
                          record: S,
                          index: h,
                          renderIndex: e.renderIndex,
                          dataIndex: _,
                          customRender: Z
                        },
                        q
                      ),
                      {},
                      {
                        additionalProps: G,
                        column: Q,
                        transformCellText: E,
                        appendNode: Oe
                      }
                    ),
                    null
                  )
                })
              ]
            }
          )
        let V
        if (i.value && (r.value || a.value)) {
          const Q = ee({
              record: S,
              index: h,
              indent: w + 1,
              expanded: a.value
            }),
            L = A && A(S, h, w)
          V = g(
            Yl,
            {
              expanded: a.value,
              class: ae(
                `${T}-expanded-row`,
                `${T}-expanded-row-level-${w + 1}`,
                L
              ),
              prefixCls: T,
              component: k,
              cellComponent: P,
              colSpan: R.length,
              isEmpty: !1
            },
            { default: () => [Q] }
          )
        }
        return g(ht, null, [ie, V])
      }
    }
  })
function Zl(e, t, n, o, l, r) {
  const a = []
  a.push({ record: e, indent: t, index: r })
  const i = l(e),
    s = o == null ? void 0 : o.has(i)
  if (e && Array.isArray(e[n]) && s)
    for (let f = 0; f < e[n].length; f += 1) {
      const d = Zl(e[n][f], t + 1, n, o, l, f)
      a.push(...d)
    }
  return a
}
function Rs(e, t, n, o) {
  return O(() => {
    const r = t.value,
      a = n.value,
      i = e.value
    if (a != null && a.size) {
      const s = []
      for (let f = 0; f < (i == null ? void 0 : i.length); f += 1) {
        const d = i[f]
        s.push(...Zl(d, 0, r, a, o.value, f))
      }
      return s
    }
    return i == null
      ? void 0
      : i.map((s, f) => ({ record: s, indent: 0, index: f }))
  })
}
const er = Symbol('ResizeContextProps'),
  Ns = e => {
    Ue(er, e)
  },
  Bs = () => Ge(er, { onColumnResize: () => {} }),
  _s = ge({
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
      const o = Bs(),
        l = lt(),
        r = Ql(),
        a = Rs(
          Fe(e, 'data'),
          Fe(e, 'childrenColumnName'),
          Fe(e, 'expandedKeys'),
          Fe(e, 'getRowKey')
        ),
        i = oe(-1),
        s = oe(-1)
      let f
      return (
        ys({
          startRow: i,
          endRow: s,
          onHover: (d, u) => {
            clearTimeout(f),
              (f = setTimeout(() => {
                ;(i.value = d), (s.value = u)
              }, 100))
          }
        }),
        () => {
          var d
          const {
              data: u,
              getRowKey: y,
              measureColumnWidth: x,
              expandedKeys: b,
              customRow: p,
              rowExpandable: c,
              childrenColumnName: v
            } = e,
            { onColumnResize: S } = o,
            { prefixCls: h, getComponent: $ } = l,
            { flattenColumns: w } = r,
            k = $(['body', 'wrapper'], 'tbody'),
            P = $(['body', 'row'], 'tr'),
            T = $(['body', 'cell'], 'td')
          let C
          u.length
            ? (C = a.value.map((R, A) => {
                const { record: F, indent: U, index: ee } = R,
                  re = y(F, A)
                return g(
                  Ds,
                  {
                    key: re,
                    rowKey: re,
                    record: F,
                    recordKey: re,
                    index: A,
                    renderIndex: ee,
                    rowComponent: P,
                    cellComponent: T,
                    expandedKeys: b,
                    customRow: p,
                    getRowKey: y,
                    rowExpandable: c,
                    childrenColumnName: v,
                    indent: U
                  },
                  null
                )
              }))
            : (C = g(
                Yl,
                {
                  expanded: !0,
                  class: `${h}-placeholder`,
                  prefixCls: h,
                  component: P,
                  cellComponent: T,
                  colSpan: w.length,
                  isEmpty: !0
                },
                {
                  default: () => [
                    (d = n.emptyNode) === null || d === void 0
                      ? void 0
                      : d.call(n)
                  ]
                }
              ))
          const E = rn(w)
          return g(
            k,
            { class: `${h}-tbody` },
            {
              default: () => [
                x &&
                  g(
                    'tr',
                    {
                      'aria-hidden': 'true',
                      class: `${h}-measure-row`,
                      style: { height: 0, fontSize: 0 }
                    },
                    [
                      E.map(R =>
                        g(Ts, { key: R, columnKey: R, onColumnResize: S }, null)
                      )
                    ]
                  ),
                C
              ]
            }
          )
        }
      )
    }
  }),
  vt = {}
var As =
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
function Dn(e) {
  return e.reduce((t, n) => {
    const { fixed: o } = n,
      l = o === !0 ? 'left' : o,
      r = n.children
    return r && r.length > 0
      ? [...t, ...Dn(r).map(a => m({ fixed: l }, a))]
      : [...t, m(m({}, n), { fixed: l })]
  }, [])
}
function zs(e) {
  return e.map(t => {
    const { fixed: n } = t,
      o = As(t, ['fixed'])
    let l = n
    return (
      n === 'left' ? (l = 'right') : n === 'right' && (l = 'left'),
      m({ fixed: l }, o)
    )
  })
}
function Fs(e, t) {
  let {
    prefixCls: n,
    columns: o,
    expandable: l,
    expandedKeys: r,
    getRowKey: a,
    onTriggerExpand: i,
    expandIcon: s,
    rowExpandable: f,
    expandIconColumnIndex: d,
    direction: u,
    expandRowByClick: y,
    expandColumnWidth: x,
    expandFixed: b
  } = e
  const p = oo(),
    c = O(() => {
      if (l.value) {
        let h = o.value.slice()
        if (!h.includes(vt)) {
          const F = d.value || 0
          F >= 0 && h.splice(F, 0, vt)
        }
        const $ = h.indexOf(vt)
        h = h.filter((F, U) => F !== vt || U === $)
        const w = o.value[$]
        let k
        ;(b.value === 'left' || b.value) && !d.value
          ? (k = 'left')
          : (b.value === 'right' || b.value) && d.value === o.value.length
          ? (k = 'right')
          : (k = w ? w.fixed : null)
        const P = r.value,
          T = f.value,
          C = s.value,
          E = n.value,
          R = y.value,
          A = {
            [Tt]: {
              class: `${n.value}-expand-icon-col`,
              columnType: 'EXPAND_COLUMN'
            },
            title: Jn(p.value, 'expandColumnTitle', {}, () => ['']),
            fixed: k,
            class: `${n.value}-row-expand-icon-cell`,
            width: x.value,
            customRender: F => {
              let { record: U, index: ee } = F
              const re = a.value(U, ee),
                ie = P.has(re),
                V = T ? T(U) : !0,
                Q = C({
                  prefixCls: E,
                  expanded: ie,
                  expandable: V,
                  record: U,
                  onExpand: i
                })
              return R
                ? g('span', { onClick: L => L.stopPropagation() }, [Q])
                : Q
            }
          }
        return h.map(F => (F === vt ? A : F))
      }
      return o.value.filter(h => h !== vt)
    }),
    v = O(() => {
      let h = c.value
      return (
        t.value && (h = t.value(h)),
        h.length || (h = [{ customRender: () => null }]),
        h
      )
    }),
    S = O(() => (u.value === 'rtl' ? zs(Dn(v.value)) : Dn(v.value)))
  return [v, S]
}
function tr(e) {
  const t = oe(e)
  let n
  const o = oe([])
  function l(r) {
    o.value.push(r),
      $t.cancel(n),
      (n = $t(() => {
        const a = o.value
        ;(o.value = []),
          a.forEach(i => {
            t.value = i(t.value)
          })
      }))
  }
  return (
    mt(() => {
      $t.cancel(n)
    }),
    [t, l]
  )
}
function Ms(e) {
  const t = ve(e || null),
    n = ve()
  function o() {
    clearTimeout(n.value)
  }
  function l(a) {
    ;(t.value = a),
      o(),
      (n.value = setTimeout(() => {
        ;(t.value = null), (n.value = void 0)
      }, 100))
  }
  function r() {
    return t.value
  }
  return (
    mt(() => {
      o()
    }),
    [l, r]
  )
}
function js(e, t, n) {
  return O(() => {
    const l = [],
      r = []
    let a = 0,
      i = 0
    const s = e.value,
      f = t.value,
      d = n.value
    for (let u = 0; u < f; u += 1)
      if (d === 'rtl') {
        ;(r[u] = i), (i += s[u] || 0)
        const y = f - u - 1
        ;(l[y] = a), (a += s[y] || 0)
      } else {
        ;(l[u] = a), (a += s[u] || 0)
        const y = f - u - 1
        ;(r[y] = i), (i += s[y] || 0)
      }
    return { left: l, right: r }
  })
}
var Ls =
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
function nr(e) {
  let { colWidths: t, columns: n, columCount: o } = e
  const l = [],
    r = o || n.length
  let a = !1
  for (let i = r - 1; i >= 0; i -= 1) {
    const s = t[i],
      f = n && n[i],
      d = f && f[Tt]
    if (s || d || a) {
      const u = d || {},
        y = Ls(u, ['columnType'])
      l.unshift(
        g(
          'col',
          j(
            { key: i, style: { width: typeof s == 'number' ? `${s}px` : s } },
            y
          ),
          null
        )
      ),
        (a = !0)
    }
  }
  return g('colgroup', null, [l])
}
function Rn(e, t) {
  let { slots: n } = t
  var o
  return g('div', null, [
    (o = n.default) === null || o === void 0 ? void 0 : o.call(n)
  ])
}
Rn.displayName = 'Panel'
let Hs = 0
const Ws = ge({
    name: 'TableSummary',
    props: ['fixed'],
    setup(e, t) {
      let { slots: n } = t
      const o = lt(),
        l = `table-summary-uni-key-${++Hs}`,
        r = O(() => e.fixed === '' || e.fixed)
      return (
        Ne(() => {
          o.summaryCollect(l, r.value)
        }),
        mt(() => {
          o.summaryCollect(l, !1)
        }),
        () => {
          var a
          return (a = n.default) === null || a === void 0 ? void 0 : a.call(n)
        }
      )
    }
  }),
  Vs = Ws,
  Xs = ge({
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
  or = Symbol('SummaryContextProps'),
  Gs = e => {
    Ue(or, e)
  },
  Us = () => Ge(or, {}),
  qs = ge({
    name: 'ATableSummaryCell',
    props: ['index', 'colSpan', 'rowSpan', 'align'],
    setup(e, t) {
      let { attrs: n, slots: o } = t
      const l = lt(),
        r = Us()
      return () => {
        const { index: a, colSpan: i = 1, rowSpan: s, align: f } = e,
          { prefixCls: d, direction: u } = l,
          { scrollColumnIndex: y, stickyOffsets: x, flattenColumns: b } = r,
          c = a + i - 1 + 1 === y ? i + 1 : i,
          v = lo(a, a + c - 1, b, x, u)
        return g(
          an,
          j(
            {
              class: n.class,
              index: a,
              component: 'td',
              prefixCls: d,
              record: null,
              dataIndex: null,
              align: f,
              colSpan: c,
              rowSpan: s,
              customRender: () => {
                var S
                return (S = o.default) === null || S === void 0
                  ? void 0
                  : S.call(o)
              }
            },
            v
          ),
          null
        )
      }
    }
  }),
  Vt = ge({
    name: 'TableFooter',
    inheritAttrs: !1,
    props: ['stickyOffsets', 'flattenColumns'],
    setup(e, t) {
      let { slots: n } = t
      const o = lt()
      return (
        Gs(
          gt({
            stickyOffsets: Fe(e, 'stickyOffsets'),
            flattenColumns: Fe(e, 'flattenColumns'),
            scrollColumnIndex: O(() => {
              const l = e.flattenColumns.length - 1,
                r = e.flattenColumns[l]
              return r != null && r.scrollbar ? l : null
            })
          })
        ),
        () => {
          var l
          const { prefixCls: r } = o
          return g('tfoot', { class: `${r}-summary` }, [
            (l = n.default) === null || l === void 0 ? void 0 : l.call(n)
          ])
        }
      )
    }
  }),
  Ys = Vs
function Js(e) {
  let { prefixCls: t, record: n, onExpand: o, expanded: l, expandable: r } = e
  const a = `${t}-row-expand-icon`
  if (!r) return g('span', { class: [a, `${t}-row-spaced`] }, null)
  const i = s => {
    o(n, s), s.stopPropagation()
  }
  return g(
    'span',
    {
      class: { [a]: !0, [`${t}-row-expanded`]: l, [`${t}-row-collapsed`]: !l },
      onClick: i
    },
    null
  )
}
function Qs(e, t, n) {
  const o = []
  function l(r) {
    ;(r || []).forEach((a, i) => {
      o.push(t(a, i)), l(a[n])
    })
  }
  return l(e), o
}
const Zs = ge({
    name: 'StickyScrollBar',
    inheritAttrs: !1,
    props: ['offsetScroll', 'container', 'scrollBodyRef', 'scrollBodySizeInfo'],
    emits: ['scroll'],
    setup(e, t) {
      let { emit: n, expose: o } = t
      const l = lt(),
        r = oe(0),
        a = oe(0),
        i = oe(0)
      Ne(
        () => {
          ;(r.value = e.scrollBodySizeInfo.scrollWidth || 0),
            (a.value = e.scrollBodySizeInfo.clientWidth || 0),
            (i.value = r.value && a.value * (a.value / r.value))
        },
        { flush: 'post' }
      )
      const s = oe(),
        [f, d] = tr({ scrollLeft: 0, isHiddenScrollBar: !0 }),
        u = ve({ delta: 0, x: 0 }),
        y = oe(!1),
        x = () => {
          y.value = !1
        },
        b = P => {
          ;(u.value = { delta: P.pageX - f.value.scrollLeft, x: 0 }),
            (y.value = !0),
            P.preventDefault()
        },
        p = P => {
          const { buttons: T } = P || (window == null ? void 0 : window.event)
          if (!y.value || T === 0) {
            y.value && (y.value = !1)
            return
          }
          let C = u.value.x + P.pageX - u.value.x - u.value.delta
          C <= 0 && (C = 0),
            C + i.value >= a.value && (C = a.value - i.value),
            n('scroll', { scrollLeft: (C / a.value) * (r.value + 2) }),
            (u.value.x = P.pageX)
        },
        c = () => {
          if (!e.scrollBodyRef.value) return
          const P = wo(e.scrollBodyRef.value).top,
            T = P + e.scrollBodyRef.value.offsetHeight,
            C =
              e.container === window
                ? document.documentElement.scrollTop + window.innerHeight
                : wo(e.container).top + e.container.clientHeight
          T - $o() <= C || P >= C - e.offsetScroll
            ? d(E => m(m({}, E), { isHiddenScrollBar: !0 }))
            : d(E => m(m({}, E), { isHiddenScrollBar: !1 }))
        }
      o({
        setScrollLeft: P => {
          d(T => m(m({}, T), { scrollLeft: (P / r.value) * a.value || 0 }))
        }
      })
      let S = null,
        h = null,
        $ = null,
        w = null
      ot(() => {
        ;(S = St(document.body, 'mouseup', x, !1)),
          (h = St(document.body, 'mousemove', p, !1)),
          ($ = St(window, 'resize', c, !1))
      }),
        zr(() => {
          dt(() => {
            c()
          })
        }),
        ot(() => {
          setTimeout(() => {
            Ee(
              [i, y],
              () => {
                c()
              },
              { immediate: !0, flush: 'post' }
            )
          })
        }),
        Ee(
          () => e.container,
          () => {
            w == null || w.remove(), (w = St(e.container, 'scroll', c, !1))
          },
          { immediate: !0, flush: 'post' }
        ),
        mt(() => {
          S == null || S.remove(),
            h == null || h.remove(),
            w == null || w.remove(),
            $ == null || $.remove()
        }),
        Ee(
          () => m({}, f.value),
          (P, T) => {
            P.isHiddenScrollBar !==
              (T == null ? void 0 : T.isHiddenScrollBar) &&
              !P.isHiddenScrollBar &&
              d(C => {
                const E = e.scrollBodyRef.value
                return E
                  ? m(m({}, C), {
                      scrollLeft: (E.scrollLeft / E.scrollWidth) * E.clientWidth
                    })
                  : C
              })
          },
          { immediate: !0 }
        )
      const k = $o()
      return () => {
        if (r.value <= a.value || !i.value || f.value.isHiddenScrollBar)
          return null
        const { prefixCls: P } = l
        return g(
          'div',
          {
            style: {
              height: `${k}px`,
              width: `${a.value}px`,
              bottom: `${e.offsetScroll}px`
            },
            class: `${P}-sticky-scroll`
          },
          [
            g(
              'div',
              {
                onMousedown: b,
                ref: s,
                class: ae(`${P}-sticky-scroll-bar`, {
                  [`${P}-sticky-scroll-bar-active`]: y.value
                }),
                style: {
                  width: `${i.value}px`,
                  transform: `translate3d(${f.value.scrollLeft}px, 0, 0)`
                }
              },
              null
            )
          ]
        )
      }
    }
  }),
  Mo = Dr() ? window : null
function ec(e, t) {
  return O(() => {
    const {
        offsetHeader: n = 0,
        offsetSummary: o = 0,
        offsetScroll: l = 0,
        getContainer: r = () => Mo
      } = typeof e.value == 'object' ? e.value : {},
      a = r() || Mo,
      i = !!e.value
    return {
      isSticky: i,
      stickyClassName: i ? `${t.value}-sticky-holder` : '',
      offsetHeader: n,
      offsetSummary: o,
      offsetScroll: l,
      container: a
    }
  })
}
function tc(e, t) {
  return O(() => {
    const n = [],
      o = e.value,
      l = t.value
    for (let r = 0; r < l; r += 1) {
      const a = o[r]
      if (a !== void 0) n[r] = a
      else return null
    }
    return n
  })
}
const jo = ge({
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
    const r = lt(),
      a = O(() => (r.isSticky && !e.fixHeader ? 0 : r.scrollbarSize)),
      i = ve(),
      s = p => {
        const { currentTarget: c, deltaX: v } = p
        v &&
          (l('scroll', { currentTarget: c, scrollLeft: c.scrollLeft + v }),
          p.preventDefault())
      },
      f = ve()
    ot(() => {
      dt(() => {
        f.value = St(i.value, 'wheel', s)
      })
    }),
      mt(() => {
        var p
        ;(p = f.value) === null || p === void 0 || p.remove()
      })
    const d = O(() =>
        e.flattenColumns.every(
          p => p.width && p.width !== 0 && p.width !== '0px'
        )
      ),
      u = ve([]),
      y = ve([])
    Ne(() => {
      const p = e.flattenColumns[e.flattenColumns.length - 1],
        c = {
          fixed: p ? p.fixed : null,
          scrollbar: !0,
          customHeaderCell: () => ({ class: `${r.prefixCls}-cell-scrollbar` })
        }
      ;(u.value = a.value ? [...e.columns, c] : e.columns),
        (y.value = a.value ? [...e.flattenColumns, c] : e.flattenColumns)
    })
    const x = O(() => {
        const { stickyOffsets: p, direction: c } = e,
          { right: v, left: S } = p
        return m(m({}, p), {
          left: c === 'rtl' ? [...S.map(h => h + a.value), 0] : S,
          right: c === 'rtl' ? v : [...v.map(h => h + a.value), 0],
          isSticky: r.isSticky
        })
      }),
      b = tc(Fe(e, 'colWidths'), Fe(e, 'columCount'))
    return () => {
      var p
      const {
          noData: c,
          columCount: v,
          stickyTopOffset: S,
          stickyBottomOffset: h,
          stickyClassName: $,
          maxContentScroll: w
        } = e,
        { isSticky: k } = r
      return g(
        'div',
        {
          style: m(
            { overflow: 'hidden' },
            k ? { top: `${S}px`, bottom: `${h}px` } : {}
          ),
          ref: i,
          class: ae(n.class, { [$]: !!$ })
        },
        [
          g(
            'table',
            {
              style: {
                tableLayout: 'fixed',
                visibility: c || b.value ? null : 'hidden'
              }
            },
            [
              (!c || !w || d.value) &&
                g(
                  nr,
                  {
                    colWidths: b.value ? [...b.value, a.value] : [],
                    columCount: v + 1,
                    columns: y.value
                  },
                  null
                ),
              (p = o.default) === null || p === void 0
                ? void 0
                : p.call(
                    o,
                    m(m({}, e), {
                      stickyOffsets: x.value,
                      columns: u.value,
                      flattenColumns: y.value
                    })
                  )
            ]
          )
        ]
      )
    }
  }
})
function Lo(e) {
  for (
    var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), o = 1;
    o < t;
    o++
  )
    n[o - 1] = arguments[o]
  return gt(Qa(n.map(l => [l, Fe(e, l)])))
}
const nc = [],
  oc = {},
  Nn = 'rc-table-internal-hook',
  lc = ge({
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
      const r = O(() => e.data || nc),
        a = O(() => !!r.value.length),
        i = O(() => vs(e.components, {})),
        s = (I, D) => Vl(i.value, I) || D,
        f = O(() => {
          const I = e.rowKey
          return typeof I == 'function' ? I : D => D && D[I]
        }),
        d = O(() => e.expandIcon || Js),
        u = O(() => e.childrenColumnName || 'children'),
        y = O(() =>
          e.expandedRowRender
            ? 'row'
            : e.canExpandable ||
              r.value.some(I => I && typeof I == 'object' && I[u.value])
            ? 'nest'
            : !1
        ),
        x = oe([])
      Ne(() => {
        e.defaultExpandedRowKeys && (x.value = e.defaultExpandedRowKeys),
          e.defaultExpandAllRows && (x.value = Qs(r.value, f.value, u.value))
      })()
      const p = O(() => new Set(e.expandedRowKeys || x.value || [])),
        c = I => {
          const D = f.value(I, r.value.indexOf(I))
          let te
          const he = p.value.has(D)
          he
            ? (p.value.delete(D), (te = [...p.value]))
            : (te = [...p.value, D]),
            (x.value = te),
            l('expand', !he, I),
            l('update:expandedRowKeys', te),
            l('expandedRowsChange', te)
        },
        v = ve(0),
        [S, h] = Fs(
          m(m({}, dn(e)), {
            expandable: O(() => !!e.expandedRowRender),
            expandedKeys: p,
            getRowKey: f,
            onTriggerExpand: c,
            expandIcon: d
          }),
          O(() => (e.internalHooks === Nn ? e.transformColumns : null))
        ),
        $ = O(() => ({ columns: S.value, flattenColumns: h.value })),
        w = ve(),
        k = ve(),
        P = ve(),
        T = ve({ scrollWidth: 0, clientWidth: 0 }),
        C = ve(),
        [E, R] = wt(!1),
        [A, F] = wt(!1),
        [U, ee] = tr(new Map()),
        re = O(() => rn(h.value)),
        ie = O(() => re.value.map(I => U.value.get(I))),
        V = O(() => h.value.length),
        Q = js(ie, V, Fe(e, 'direction')),
        L = O(() => e.scroll && Tn(e.scroll.y)),
        Z = O(() => (e.scroll && Tn(e.scroll.x)) || !!e.expandFixed),
        _ = O(
          () =>
            Z.value &&
            h.value.some(I => {
              let { fixed: D } = I
              return D
            })
        ),
        H = ve(),
        M = ec(Fe(e, 'sticky'), Fe(e, 'prefixCls')),
        q = gt({}),
        G = O(() => {
          const I = Object.values(q)[0]
          return (L.value || M.value.isSticky) && I
        }),
        Oe = (I, D) => {
          D ? (q[I] = D) : delete q[I]
        },
        de = ve({}),
        Te = ve({}),
        Ke = ve({})
      Ne(() => {
        L.value &&
          (Te.value = { overflowY: 'scroll', maxHeight: mo(e.scroll.y) }),
          Z.value &&
            ((de.value = { overflowX: 'auto' }),
            L.value || (Te.value = { overflowY: 'hidden' }),
            (Ke.value = {
              width: e.scroll.x === !0 ? 'auto' : mo(e.scroll.x),
              minWidth: '100%'
            }))
      })
      const Be = (I, D) => {
          fa(w.value) &&
            ee(te => {
              if (te.get(I) !== D) {
                const he = new Map(te)
                return he.set(I, D), he
              }
              return te
            })
        },
        [Ae, He] = Ms(null)
      function De(I, D) {
        if (!D) return
        if (typeof D == 'function') {
          D(I)
          return
        }
        const te = D.$el || D
        te.scrollLeft !== I && (te.scrollLeft = I)
      }
      const Re = I => {
          let { currentTarget: D, scrollLeft: te } = I
          var he
          const we = e.direction === 'rtl',
            N = typeof te == 'number' ? te : D.scrollLeft,
            B = D || oc
          if (
            ((!He() || He() === B) &&
              (Ae(B),
              De(N, k.value),
              De(N, P.value),
              De(N, C.value),
              De(
                N,
                (he = H.value) === null || he === void 0
                  ? void 0
                  : he.setScrollLeft
              )),
            D)
          ) {
            const { scrollWidth: z, clientWidth: W } = D
            we ? (R(-N < z - W), F(-N > 0)) : (R(N > 0), F(N < z - W))
          }
        },
        X = () => {
          Z.value && P.value ? Re({ currentTarget: P.value }) : (R(!1), F(!1))
        }
      let fe
      const J = I => {
          I !== v.value && (X(), (v.value = w.value ? w.value.offsetWidth : I))
        },
        se = I => {
          let { width: D } = I
          if ((clearTimeout(fe), v.value === 0)) {
            J(D)
            return
          }
          fe = setTimeout(() => {
            J(D)
          }, 100)
        }
      Ee(
        [Z, () => e.data, () => e.columns],
        () => {
          Z.value && X()
        },
        { flush: 'post' }
      )
      const [ue, Ie] = wt(0)
      xs(),
        ot(() => {
          dt(() => {
            var I, D
            X(),
              Ie(ua(P.value).width),
              (T.value = {
                scrollWidth:
                  ((I = P.value) === null || I === void 0
                    ? void 0
                    : I.scrollWidth) || 0,
                clientWidth:
                  ((D = P.value) === null || D === void 0
                    ? void 0
                    : D.clientWidth) || 0
              })
          })
        }),
        Un(() => {
          dt(() => {
            var I, D
            const te =
                ((I = P.value) === null || I === void 0
                  ? void 0
                  : I.scrollWidth) || 0,
              he =
                ((D = P.value) === null || D === void 0
                  ? void 0
                  : D.clientWidth) || 0
            ;(T.value.scrollWidth !== te || T.value.clientWidth !== he) &&
              (T.value = { scrollWidth: te, clientWidth: he })
          })
        }),
        Ne(
          () => {
            e.internalHooks === Nn &&
              e.internalRefs &&
              e.onUpdateInternalRefs({
                body: P.value ? P.value.$el || P.value : null
              })
          },
          { flush: 'post' }
        )
      const ce = O(() =>
          e.tableLayout
            ? e.tableLayout
            : _.value
            ? e.scroll.x === 'max-content'
              ? 'auto'
              : 'fixed'
            : L.value ||
              M.value.isSticky ||
              h.value.some(I => {
                let { ellipsis: D } = I
                return D
              })
            ? 'fixed'
            : 'auto'
        ),
        be = () => {
          var I
          return a.value
            ? null
            : ((I = o.emptyText) === null || I === void 0
                ? void 0
                : I.call(o)) || 'No Data'
        }
      fs(
        gt(
          m(m({}, dn(Lo(e, 'prefixCls', 'direction', 'transformCellText'))), {
            getComponent: s,
            scrollbarSize: ue,
            fixedInfoList: O(() =>
              h.value.map((I, D) => lo(D, D, h.value, Q.value, e.direction))
            ),
            isSticky: O(() => M.value.isSticky),
            summaryCollect: Oe
          })
        )
      ),
        Ks(
          gt(
            m(
              m(
                {},
                dn(
                  Lo(
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
                columns: S,
                flattenColumns: h,
                tableLayout: ce,
                expandIcon: d,
                expandableType: y,
                onTriggerExpand: c
              }
            )
          )
        ),
        Ns({ onColumnResize: Be }),
        ks({ componentWidth: v, fixHeader: L, fixColumn: _, horizonScroll: Z })
      const ke = () =>
          g(
            _s,
            {
              data: r.value,
              measureColumnWidth: L.value || Z.value || M.value.isSticky,
              expandedKeys: p.value,
              rowExpandable: e.rowExpandable,
              getRowKey: f.value,
              customRow: e.customRow,
              childrenColumnName: u.value
            },
            { emptyNode: be }
          ),
        K = () =>
          g(
            nr,
            {
              colWidths: h.value.map(I => {
                let { width: D } = I
                return D
              }),
              columns: h.value
            },
            null
          )
      return () => {
        var I
        const {
            prefixCls: D,
            scroll: te,
            tableLayout: he,
            direction: we,
            title: N = o.title,
            footer: B = o.footer,
            id: z,
            showHeader: W,
            customHeaderRow: ne
          } = e,
          {
            isSticky: le,
            offsetHeader: Y,
            offsetSummary: Ce,
            offsetScroll: Pe,
            stickyClassName: xe,
            container: Se
          } = M.value,
          $e = s(['table'], 'table'),
          ze = s(['body']),
          Me =
            (I = o.summary) === null || I === void 0
              ? void 0
              : I.call(o, { pageData: r.value })
        let Le = () => null
        const _e = {
          colWidths: ie.value,
          columCount: h.value.length,
          stickyOffsets: Q.value,
          customHeaderRow: ne,
          fixHeader: L.value,
          scroll: te
        }
        if (L.value || le) {
          let bt = () => null
          typeof ze == 'function'
            ? ((bt = () =>
                ze(r.value, { scrollbarSize: ue.value, ref: P, onScroll: Re })),
              (_e.colWidths = h.value.map((ft, cn) => {
                let { width: Wt } = ft
                const Bt = cn === S.value.length - 1 ? Wt - ue.value : Wt
                return typeof Bt == 'number' && !Number.isNaN(Bt) ? Bt : 0
              })))
            : (bt = () =>
                g(
                  'div',
                  {
                    style: m(m({}, de.value), Te.value),
                    onScroll: Re,
                    ref: P,
                    class: ae(`${D}-body`)
                  },
                  [
                    g(
                      $e,
                      { style: m(m({}, Ke.value), { tableLayout: ce.value }) },
                      {
                        default: () => [
                          K(),
                          ke(),
                          !G.value &&
                            Me &&
                            g(
                              Vt,
                              {
                                stickyOffsets: Q.value,
                                flattenColumns: h.value
                              },
                              { default: () => [Me] }
                            )
                        ]
                      }
                    )
                  ]
                ))
          const Ht = m(
            m(
              m(
                {
                  noData: !r.value.length,
                  maxContentScroll: Z.value && te.x === 'max-content'
                },
                _e
              ),
              $.value
            ),
            { direction: we, stickyClassName: xe, onScroll: Re }
          )
          Le = () =>
            g(ht, null, [
              W !== !1 &&
                g(
                  jo,
                  j(
                    j({}, Ht),
                    {},
                    { stickyTopOffset: Y, class: `${D}-header`, ref: k }
                  ),
                  {
                    default: ft =>
                      g(ht, null, [
                        g(Fo, ft, null),
                        G.value === 'top' && g(Vt, ft, { default: () => [Me] })
                      ])
                  }
                ),
              bt(),
              G.value &&
                G.value !== 'top' &&
                g(
                  jo,
                  j(
                    j({}, Ht),
                    {},
                    { stickyBottomOffset: Ce, class: `${D}-summary`, ref: C }
                  ),
                  { default: ft => g(Vt, ft, { default: () => [Me] }) }
                ),
              le &&
                P.value &&
                g(
                  Zs,
                  {
                    ref: H,
                    offsetScroll: Pe,
                    scrollBodyRef: P,
                    onScroll: Re,
                    container: Se,
                    scrollBodySizeInfo: T.value
                  },
                  null
                )
            ])
        } else
          Le = () =>
            g(
              'div',
              {
                style: m(m({}, de.value), Te.value),
                class: ae(`${D}-content`),
                onScroll: Re,
                ref: P
              },
              [
                g(
                  $e,
                  { style: m(m({}, Ke.value), { tableLayout: ce.value }) },
                  {
                    default: () => [
                      K(),
                      W !== !1 && g(Fo, j(j({}, _e), $.value), null),
                      ke(),
                      Me &&
                        g(
                          Vt,
                          { stickyOffsets: Q.value, flattenColumns: h.value },
                          { default: () => [Me] }
                        )
                    ]
                  }
                )
              ]
            )
        const et = Yn(n, { aria: !0, data: !0 }),
          ut = () =>
            g(
              'div',
              j(
                j({}, et),
                {},
                {
                  class: ae(D, {
                    [`${D}-rtl`]: we === 'rtl',
                    [`${D}-ping-left`]: E.value,
                    [`${D}-ping-right`]: A.value,
                    [`${D}-layout-fixed`]: he === 'fixed',
                    [`${D}-fixed-header`]: L.value,
                    [`${D}-fixed-column`]: _.value,
                    [`${D}-scroll-horizontal`]: Z.value,
                    [`${D}-has-fix-left`]: h.value[0] && h.value[0].fixed,
                    [`${D}-has-fix-right`]:
                      h.value[V.value - 1] &&
                      h.value[V.value - 1].fixed === 'right',
                    [n.class]: n.class
                  }),
                  style: n.style,
                  id: z,
                  ref: w
                }
              ),
              [
                N &&
                  g(
                    Rn,
                    { class: `${D}-title` },
                    { default: () => [N(r.value)] }
                  ),
                g('div', { class: `${D}-container` }, [Le()]),
                B &&
                  g(
                    Rn,
                    { class: `${D}-footer` },
                    { default: () => [B(r.value)] }
                  )
              ]
            )
        return Z.value ? g(Cl, { onResize: se }, { default: ut }) : ut()
      }
    }
  })
function rc() {
  const e = m({}, arguments.length <= 0 ? void 0 : arguments[0])
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
const Bn = 10
function ac(e, t) {
  const n = { current: e.current, pageSize: e.pageSize }
  return (
    Object.keys(t && typeof t == 'object' ? t : {}).forEach(l => {
      const r = e[l]
      typeof r != 'function' && (n[l] = r)
    }),
    n
  )
}
function ic(e, t, n) {
  const o = O(() => (t.value && typeof t.value == 'object' ? t.value : {})),
    l = O(() => o.value.total || 0),
    [r, a] = wt(() => ({
      current: 'defaultCurrent' in o.value ? o.value.defaultCurrent : 1,
      pageSize: 'defaultPageSize' in o.value ? o.value.defaultPageSize : Bn
    })),
    i = O(() => {
      const d = rc(r.value, o.value, {
          total: l.value > 0 ? l.value : e.value
        }),
        u = Math.ceil((l.value || e.value) / d.pageSize)
      return d.current > u && (d.current = u || 1), d
    }),
    s = (d, u) => {
      t.value !== !1 && a({ current: d ?? 1, pageSize: u || i.value.pageSize })
    },
    f = (d, u) => {
      var y, x
      t.value &&
        ((x = (y = o.value).onChange) === null ||
          x === void 0 ||
          x.call(y, d, u)),
        s(d, u),
        n(d, u || i.value.pageSize)
    }
  return [
    O(() => (t.value === !1 ? {} : m(m({}, i.value), { onChange: f }))),
    s
  ]
}
function sc(e, t, n) {
  const o = oe({})
  Ee(
    [e, t, n],
    () => {
      const r = new Map(),
        a = n.value,
        i = t.value
      function s(f) {
        f.forEach((d, u) => {
          const y = a(d, u)
          r.set(y, d), d && typeof d == 'object' && i in d && s(d[i] || [])
        })
      }
      s(e.value), (o.value = { kvMap: r })
    },
    { deep: !0, immediate: !0 }
  )
  function l(r) {
    return o.value.kvMap.get(r)
  }
  return [l]
}
const it = {},
  _n = 'SELECT_ALL',
  An = 'SELECT_INVERT',
  zn = 'SELECT_NONE',
  cc = []
function lr(e, t) {
  let n = []
  return (
    (t || []).forEach(o => {
      n.push(o),
        o && typeof o == 'object' && e in o && (n = [...n, ...lr(e, o[e])])
    }),
    n
  )
}
function dc(e, t) {
  const n = O(() => {
      const C = e.value || {},
        { checkStrictly: E = !0 } = C
      return m(m({}, C), { checkStrictly: E })
    }),
    [o, l] = pa(
      n.value.selectedRowKeys || n.value.defaultSelectedRowKeys || cc,
      { value: O(() => n.value.selectedRowKeys) }
    ),
    r = oe(new Map()),
    a = C => {
      if (n.value.preserveSelectedRowKeys) {
        const E = new Map()
        C.forEach(R => {
          let A = t.getRecordByKey(R)
          !A && r.value.has(R) && (A = r.value.get(R)), E.set(R, A)
        }),
          (r.value = E)
      }
    }
  Ne(() => {
    a(o.value)
  })
  const i = O(() =>
      n.value.checkStrictly
        ? null
        : eo(t.data.value, {
            externalGetKey: t.getRowKey.value,
            childrenPropName: t.childrenColumnName.value
          }).keyEntities
    ),
    s = O(() => lr(t.childrenColumnName.value, t.pageData.value)),
    f = O(() => {
      const C = new Map(),
        E = t.getRowKey.value,
        R = n.value.getCheckboxProps
      return (
        s.value.forEach((A, F) => {
          const U = E(A, F),
            ee = (R ? R(A) : null) || {}
          C.set(U, ee)
        }),
        C
      )
    }),
    { maxLevel: d, levelEntities: u } = Fl(i),
    y = C => {
      var E
      return !!(
        !((E = f.value.get(t.getRowKey.value(C))) === null || E === void 0) &&
        E.disabled
      )
    },
    x = O(() => {
      if (n.value.checkStrictly) return [o.value || [], []]
      const { checkedKeys: C, halfCheckedKeys: E } = Et(
        o.value,
        !0,
        i.value,
        d.value,
        u.value,
        y
      )
      return [C || [], E]
    }),
    b = O(() => x.value[0]),
    p = O(() => x.value[1]),
    c = O(() => {
      const C = n.value.type === 'radio' ? b.value.slice(0, 1) : b.value
      return new Set(C)
    }),
    v = O(() => (n.value.type === 'radio' ? new Set() : new Set(p.value))),
    [S, h] = wt(null),
    $ = C => {
      let E, R
      a(C)
      const { preserveSelectedRowKeys: A, onChange: F } = n.value,
        { getRecordByKey: U } = t
      A
        ? ((E = C), (R = C.map(ee => r.value.get(ee))))
        : ((E = []),
          (R = []),
          C.forEach(ee => {
            const re = U(ee)
            re !== void 0 && (E.push(ee), R.push(re))
          })),
        l(E),
        F == null || F(E, R)
    },
    w = (C, E, R, A) => {
      const { onSelect: F } = n.value,
        { getRecordByKey: U } = t || {}
      if (F) {
        const ee = R.map(re => U(re))
        F(U(C), E, ee, A)
      }
      $(R)
    },
    k = O(() => {
      const {
          onSelectInvert: C,
          onSelectNone: E,
          selections: R,
          hideSelectAll: A
        } = n.value,
        { data: F, pageData: U, getRowKey: ee, locale: re } = t
      return !R || A
        ? null
        : (R === !0 ? [_n, An, zn] : R).map(V =>
            V === _n
              ? {
                  key: 'all',
                  text: re.value.selectionAll,
                  onSelect() {
                    $(
                      F.value
                        .map((Q, L) => ee.value(Q, L))
                        .filter(Q => {
                          const L = f.value.get(Q)
                          return !(L != null && L.disabled) || c.value.has(Q)
                        })
                    )
                  }
                }
              : V === An
              ? {
                  key: 'invert',
                  text: re.value.selectInvert,
                  onSelect() {
                    const Q = new Set(c.value)
                    U.value.forEach((Z, _) => {
                      const H = ee.value(Z, _),
                        M = f.value.get(H)
                      ;(M != null && M.disabled) ||
                        (Q.has(H) ? Q.delete(H) : Q.add(H))
                    })
                    const L = Array.from(Q)
                    C &&
                      (Qe(
                        !1,
                        'Table',
                        '`onSelectInvert` will be removed in future. Please use `onChange` instead.'
                      ),
                      C(L)),
                      $(L)
                  }
                }
              : V === zn
              ? {
                  key: 'none',
                  text: re.value.selectNone,
                  onSelect() {
                    E == null || E(),
                      $(
                        Array.from(c.value).filter(Q => {
                          const L = f.value.get(Q)
                          return L == null ? void 0 : L.disabled
                        })
                      )
                  }
                }
              : V
          )
    }),
    P = O(() => s.value.length)
  return [
    C => {
      var E
      const {
          onSelectAll: R,
          onSelectMultiple: A,
          columnWidth: F,
          type: U,
          fixed: ee,
          renderCell: re,
          hideSelectAll: ie,
          checkStrictly: V
        } = n.value,
        {
          prefixCls: Q,
          getRecordByKey: L,
          getRowKey: Z,
          expandType: _,
          getPopupContainer: H
        } = t
      if (!e.value) return C.filter(J => J !== it)
      let M = C.slice()
      const q = new Set(c.value),
        G = s.value.map(Z.value).filter(J => !f.value.get(J).disabled),
        Oe = G.every(J => q.has(J)),
        de = G.some(J => q.has(J)),
        Te = () => {
          const J = []
          Oe
            ? G.forEach(ue => {
                q.delete(ue), J.push(ue)
              })
            : G.forEach(ue => {
                q.has(ue) || (q.add(ue), J.push(ue))
              })
          const se = Array.from(q)
          R == null ||
            R(
              !Oe,
              se.map(ue => L(ue)),
              J.map(ue => L(ue))
            ),
            $(se)
        }
      let Ke
      if (U !== 'radio') {
        let J
        if (k.value) {
          const be = g(
            Zt,
            { getPopupContainer: H.value },
            {
              default: () => [
                k.value.map((ke, K) => {
                  const { key: I, text: D, onSelect: te } = ke
                  return g(
                    Zt.Item,
                    {
                      key: I || K,
                      onClick: () => {
                        te == null || te(G)
                      }
                    },
                    { default: () => [D] }
                  )
                })
              ]
            }
          )
          J = g('div', { class: `${Q.value}-selection-extra` }, [
            g(
              Ot,
              { overlay: be, getPopupContainer: H.value },
              { default: () => [g('span', null, [g(Ka, null, null)])] }
            )
          ])
        }
        const se = s.value
            .map((be, ke) => {
              const K = Z.value(be, ke),
                I = f.value.get(K) || {}
              return m({ checked: q.has(K) }, I)
            })
            .filter(be => {
              let { disabled: ke } = be
              return ke
            }),
          ue = !!se.length && se.length === P.value,
          Ie =
            ue &&
            se.every(be => {
              let { checked: ke } = be
              return ke
            }),
          ce =
            ue &&
            se.some(be => {
              let { checked: ke } = be
              return ke
            })
        Ke =
          !ie &&
          g('div', { class: `${Q.value}-selection` }, [
            g(
              ct,
              {
                checked: ue ? Ie : !!P.value && Oe,
                indeterminate: ue ? !Ie && ce : !Oe && de,
                onChange: Te,
                disabled: P.value === 0 || ue,
                'aria-label': J ? 'Custom selection' : 'Select all',
                skipGroup: !0
              },
              null
            ),
            J
          ])
      }
      let Be
      U === 'radio'
        ? (Be = J => {
            let { record: se, index: ue } = J
            const Ie = Z.value(se, ue),
              ce = q.has(Ie)
            return {
              node: g(
                We,
                j(
                  j({}, f.value.get(Ie)),
                  {},
                  {
                    checked: ce,
                    onClick: be => be.stopPropagation(),
                    onChange: be => {
                      q.has(Ie) || w(Ie, !0, [Ie], be.nativeEvent)
                    }
                  }
                ),
                null
              ),
              checked: ce
            }
          })
        : (Be = J => {
            let { record: se, index: ue } = J
            var Ie
            const ce = Z.value(se, ue),
              be = q.has(ce),
              ke = v.value.has(ce),
              K = f.value.get(ce)
            let I
            return (
              _.value === 'nest'
                ? ((I = ke),
                  Qe(
                    typeof (K == null ? void 0 : K.indeterminate) != 'boolean',
                    'Table',
                    'set `indeterminate` using `rowSelection.getCheckboxProps` is not allowed with tree structured dataSource.'
                  ))
                : (I =
                    (Ie = K == null ? void 0 : K.indeterminate) !== null &&
                    Ie !== void 0
                      ? Ie
                      : ke),
              {
                node: g(
                  ct,
                  j(
                    j({}, K),
                    {},
                    {
                      indeterminate: I,
                      checked: be,
                      skipGroup: !0,
                      onClick: D => D.stopPropagation(),
                      onChange: D => {
                        let { nativeEvent: te } = D
                        const { shiftKey: he } = te
                        let we = -1,
                          N = -1
                        if (he && V) {
                          const B = new Set([S.value, ce])
                          G.some((z, W) => {
                            if (B.has(z))
                              if (we === -1) we = W
                              else return (N = W), !0
                            return !1
                          })
                        }
                        if (N !== -1 && we !== N && V) {
                          const B = G.slice(we, N + 1),
                            z = []
                          be
                            ? B.forEach(ne => {
                                q.has(ne) && (z.push(ne), q.delete(ne))
                              })
                            : B.forEach(ne => {
                                q.has(ne) || (z.push(ne), q.add(ne))
                              })
                          const W = Array.from(q)
                          A == null ||
                            A(
                              !be,
                              W.map(ne => L(ne)),
                              z.map(ne => L(ne))
                            ),
                            $(W)
                        } else {
                          const B = b.value
                          if (V) {
                            const z = be ? tt(B, ce) : at(B, ce)
                            w(ce, !be, z, te)
                          } else {
                            const z = Et(
                                [...B, ce],
                                !0,
                                i.value,
                                d.value,
                                u.value,
                                y
                              ),
                              { checkedKeys: W, halfCheckedKeys: ne } = z
                            let le = W
                            if (be) {
                              const Y = new Set(W)
                              Y.delete(ce),
                                (le = Et(
                                  Array.from(Y),
                                  { checked: !1, halfCheckedKeys: ne },
                                  i.value,
                                  d.value,
                                  u.value,
                                  y
                                ).checkedKeys)
                            }
                            w(ce, !be, le, te)
                          }
                        }
                        h(ce)
                      }
                    }
                  ),
                  null
                ),
                checked: be
              }
            )
          })
      const Ae = J => {
        let { record: se, index: ue } = J
        const { node: Ie, checked: ce } = Be({ record: se, index: ue })
        return re ? re(ce, se, ue, Ie) : Ie
      }
      if (!M.includes(it))
        if (
          M.findIndex(J => {
            var se
            return (
              ((se = J[Tt]) === null || se === void 0
                ? void 0
                : se.columnType) === 'EXPAND_COLUMN'
            )
          }) === 0
        ) {
          const [J, ...se] = M
          M = [J, it, ...se]
        } else M = [it, ...M]
      const He = M.indexOf(it)
      M = M.filter((J, se) => J !== it || se === He)
      const De = M[He - 1],
        Re = M[He + 1]
      let X = ee
      X === void 0 &&
        ((Re == null ? void 0 : Re.fixed) !== void 0
          ? (X = Re.fixed)
          : (De == null ? void 0 : De.fixed) !== void 0 && (X = De.fixed)),
        X &&
          De &&
          ((E = De[Tt]) === null || E === void 0 ? void 0 : E.columnType) ===
            'EXPAND_COLUMN' &&
          De.fixed === void 0 &&
          (De.fixed = X)
      const fe = {
        fixed: X,
        width: F,
        className: `${Q.value}-selection-column`,
        title: n.value.columnTitle || Ke,
        customRender: Ae,
        [Tt]: { class: `${Q.value}-selection-col` }
      }
      return M.map(J => (J === it ? fe : J))
    },
    c
  ]
}
function Ho(e) {
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
        uc(e, l, n[l])
      })
  }
  return e
}
function uc(e, t, n) {
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
  var o = Ho({}, t, n.attrs)
  return g(Ze, Ho({}, o, { icon: Sa }), null)
}
ro.displayName = 'CaretDownOutlined'
ro.inheritAttrs = !1
const fc = ro
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
        pc(e, l, n[l])
      })
  }
  return e
}
function pc(e, t, n) {
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
  return g(Ze, Wo({}, o, { icon: $a }), null)
}
ao.displayName = 'CaretUpOutlined'
ao.inheritAttrs = !1
const vc = ao
var gc =
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
function It(e, t) {
  return 'key' in e && e.key !== void 0 && e.key !== null
    ? e.key
    : e.dataIndex
    ? Array.isArray(e.dataIndex)
      ? e.dataIndex.join('.')
      : e.dataIndex
    : t
}
function Lt(e, t) {
  return t ? `${t}-${e}` : `${e}`
}
function io(e, t) {
  return typeof e == 'function' ? e(t) : e
}
function rr() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : []
  const t = Xn(e),
    n = []
  return (
    t.forEach(o => {
      var l, r, a, i
      if (!o) return
      const s = o.key,
        f = ((l = o.props) === null || l === void 0 ? void 0 : l.style) || {},
        d = ((r = o.props) === null || r === void 0 ? void 0 : r.class) || '',
        u = o.props || {}
      for (const [c, v] of Object.entries(u)) u[gl(c)] = v
      const y = o.children || {},
        { default: x } = y,
        b = gc(y, ['default']),
        p = m(m(m({}, b), u), { style: f, class: d })
      if (
        (s && (p.key = s),
        !((a = o.type) === null || a === void 0) && a.__ANT_TABLE_COLUMN_GROUP)
      )
        p.children = rr(typeof x == 'function' ? x() : x)
      else {
        const c = (i = o.children) === null || i === void 0 ? void 0 : i.default
        p.customRender = p.customRender || c
      }
      n.push(p)
    }),
    n
  )
}
const qt = 'ascend',
  vn = 'descend'
function nn(e) {
  return typeof e.sorter == 'object' && typeof e.sorter.multiple == 'number'
    ? e.sorter.multiple
    : !1
}
function Vo(e) {
  return typeof e == 'function'
    ? e
    : e && typeof e == 'object' && e.compare
    ? e.compare
    : !1
}
function hc(e, t) {
  return t ? e[e.indexOf(t) + 1] : e[0]
}
function Fn(e, t, n) {
  let o = []
  function l(r, a) {
    o.push({
      column: r,
      key: It(r, a),
      multiplePriority: nn(r),
      sortOrder: r.sortOrder
    })
  }
  return (
    (e || []).forEach((r, a) => {
      const i = Lt(a, n)
      r.children
        ? ('sortOrder' in r && l(r, i), (o = [...o, ...Fn(r.children, t, i)]))
        : r.sorter &&
          ('sortOrder' in r
            ? l(r, i)
            : t &&
              r.defaultSortOrder &&
              o.push({
                column: r,
                key: It(r, i),
                multiplePriority: nn(r),
                sortOrder: r.defaultSortOrder
              }))
    }),
    o
  )
}
function ar(e, t, n, o, l, r, a, i) {
  return (t || []).map((s, f) => {
    const d = Lt(f, i)
    let u = s
    if (u.sorter) {
      const y = u.sortDirections || l,
        x = u.showSorterTooltip === void 0 ? a : u.showSorterTooltip,
        b = It(u, d),
        p = n.find(C => {
          let { key: E } = C
          return E === b
        }),
        c = p ? p.sortOrder : null,
        v = hc(y, c),
        S =
          y.includes(qt) &&
          g(
            vc,
            {
              class: ae(`${e}-column-sorter-up`, { active: c === qt }),
              role: 'presentation'
            },
            null
          ),
        h =
          y.includes(vn) &&
          g(
            fc,
            {
              role: 'presentation',
              class: ae(`${e}-column-sorter-down`, { active: c === vn })
            },
            null
          ),
        { cancelSort: $, triggerAsc: w, triggerDesc: k } = r || {}
      let P = $
      v === vn ? (P = k) : v === qt && (P = w)
      const T = typeof x == 'object' ? x : { title: P }
      u = m(m({}, u), {
        className: ae(u.className, { [`${e}-column-sort`]: c }),
        title: C => {
          const E = g('div', { class: `${e}-column-sorters` }, [
            g('span', { class: `${e}-column-title` }, [io(s.title, C)]),
            g(
              'span',
              {
                class: ae(`${e}-column-sorter`, {
                  [`${e}-column-sorter-full`]: !!(S && h)
                })
              },
              [g('span', { class: `${e}-column-sorter-inner` }, [S, h])]
            )
          ])
          return x ? g(va, T, { default: () => [E] }) : E
        },
        customHeaderCell: C => {
          const E = (s.customHeaderCell && s.customHeaderCell(C)) || {},
            R = E.onClick,
            A = E.onKeydown
          return (
            (E.onClick = F => {
              o({ column: s, key: b, sortOrder: v, multiplePriority: nn(s) }),
                R && R(F)
            }),
            (E.onKeydown = F => {
              F.keyCode === pt.ENTER &&
                (o({
                  column: s,
                  key: b,
                  sortOrder: v,
                  multiplePriority: nn(s)
                }),
                A == null || A(F))
            }),
            c && (E['aria-sort'] = c === 'ascend' ? 'ascending' : 'descending'),
            (E.class = ae(E.class, `${e}-column-has-sorters`)),
            (E.tabindex = 0),
            E
          )
        }
      })
    }
    return (
      'children' in u &&
        (u = m(m({}, u), { children: ar(e, u.children, n, o, l, r, a, d) })),
      u
    )
  })
}
function Xo(e) {
  const { column: t, sortOrder: n } = e
  return { column: t, order: n, field: t.dataIndex, columnKey: t.key }
}
function Go(e) {
  const t = e
    .filter(n => {
      let { sortOrder: o } = n
      return o
    })
    .map(Xo)
  return t.length === 0 && e.length
    ? m(m({}, Xo(e[e.length - 1])), { column: void 0 })
    : t.length <= 1
    ? t[0] || {}
    : t
}
function Mn(e, t, n) {
  const o = t.slice().sort((a, i) => i.multiplePriority - a.multiplePriority),
    l = e.slice(),
    r = o.filter(a => {
      let {
        column: { sorter: i },
        sortOrder: s
      } = a
      return Vo(i) && s
    })
  return r.length
    ? l
        .sort((a, i) => {
          for (let s = 0; s < r.length; s += 1) {
            const f = r[s],
              {
                column: { sorter: d },
                sortOrder: u
              } = f,
              y = Vo(d)
            if (y && u) {
              const x = y(a, i, u)
              if (x !== 0) return u === qt ? x : -x
            }
          }
          return 0
        })
        .map(a => {
          const i = a[n]
          return i ? m(m({}, a), { [n]: Mn(i, t, n) }) : a
        })
    : l
}
function mc(e) {
  let {
    prefixCls: t,
    mergedColumns: n,
    onSorterChange: o,
    sortDirections: l,
    tableLocale: r,
    showSorterTooltip: a
  } = e
  const [i, s] = wt(Fn(n.value, !0)),
    f = O(() => {
      let b = !0
      const p = Fn(n.value, !1)
      if (!p.length) return i.value
      const c = []
      function v(h) {
        b ? c.push(h) : c.push(m(m({}, h), { sortOrder: null }))
      }
      let S = null
      return (
        p.forEach(h => {
          S === null
            ? (v(h),
              h.sortOrder && (h.multiplePriority === !1 ? (b = !1) : (S = !0)))
            : ((S && h.multiplePriority !== !1) || (b = !1), v(h))
        }),
        c
      )
    }),
    d = O(() => {
      const b = f.value.map(p => {
        let { column: c, sortOrder: v } = p
        return { column: c, order: v }
      })
      return {
        sortColumns: b,
        sortColumn: b[0] && b[0].column,
        sortOrder: b[0] && b[0].order
      }
    })
  function u(b) {
    let p
    b.multiplePriority === !1 ||
    !f.value.length ||
    f.value[0].multiplePriority === !1
      ? (p = [b])
      : (p = [
          ...f.value.filter(c => {
            let { key: v } = c
            return v !== b.key
          }),
          b
        ]),
      s(p),
      o(Go(p), p)
  }
  const y = b => ar(t.value, b, f.value, u, l.value, r.value, a.value),
    x = O(() => Go(f.value))
  return [y, f, d, x]
}
function Uo(e) {
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
        yc(e, l, n[l])
      })
  }
  return e
}
function yc(e, t, n) {
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
var so = function(t, n) {
  var o = Uo({}, t, n.attrs)
  return g(Ze, Uo({}, o, { icon: wa }), null)
}
so.displayName = 'FilterFilled'
so.inheritAttrs = !1
const bc = so,
  xc = e => {
    const { keyCode: t } = e
    t === pt.ENTER && e.stopPropagation()
  },
  Cc = (e, t) => {
    let { slots: n } = t
    var o
    return g('div', { onClick: l => l.stopPropagation(), onKeydown: xc }, [
      (o = n.default) === null || o === void 0 ? void 0 : o.call(n)
    ])
  },
  Sc = Cc,
  qo = ge({
    compatConfig: { MODE: 3 },
    name: 'FilterSearch',
    inheritAttrs: !1,
    props: {
      value: Xe(),
      onChange: ye(),
      filterSearch: Ve([Boolean, Function]),
      tablePrefixCls: Xe(),
      locale: nt()
    },
    setup(e) {
      return () => {
        const {
          value: t,
          onChange: n,
          filterSearch: o,
          tablePrefixCls: l,
          locale: r
        } = e
        return o
          ? g('div', { class: `${l}-filter-dropdown-search` }, [
              g(
                Da,
                {
                  placeholder: r.filterSearchPlaceholder,
                  onChange: n,
                  value: t,
                  htmlSize: 1,
                  class: `${l}-filter-dropdown-search-input`
                },
                { prefix: () => g(Ra, null, null) }
              )
            ])
          : null
      }
    }
  })
var Yo =
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
const $c = ge({
  compatConfig: { MODE: 3 },
  name: 'MotionTreeNode',
  inheritAttrs: !1,
  props: m(m({}, Bl), {
    active: Boolean,
    motion: Object,
    motionNodes: { type: Array },
    onMotionStart: Function,
    onMotionEnd: Function,
    motionType: String
  }),
  setup(e, t) {
    let { attrs: n, slots: o } = t
    const l = oe(!0),
      r = Qn(),
      a = oe(!1),
      i = O(() => (e.motion ? e.motion : ga())),
      s = (f, d) => {
        var u, y, x, b
        d === 'appear'
          ? (y =
              (u = i.value) === null || u === void 0
                ? void 0
                : u.onAfterEnter) === null ||
            y === void 0 ||
            y.call(u, f)
          : d === 'leave' &&
            ((b =
              (x = i.value) === null || x === void 0
                ? void 0
                : x.onAfterLeave) === null ||
              b === void 0 ||
              b.call(x, f)),
          a.value || e.onMotionEnd(),
          (a.value = !0)
      }
    return (
      Ee(
        () => e.motionNodes,
        () => {
          e.motionNodes &&
            e.motionType === 'hide' &&
            l.value &&
            dt(() => {
              l.value = !1
            })
        },
        { immediate: !0, flush: 'post' }
      ),
      ot(() => {
        e.motionNodes && e.onMotionStart()
      }),
      mt(() => {
        e.motionNodes && s()
      }),
      () => {
        const {
            motion: f,
            motionNodes: d,
            motionType: u,
            active: y,
            eventKey: x
          } = e,
          b = Yo(e, [
            'motion',
            'motionNodes',
            'motionType',
            'active',
            'eventKey'
          ])
        return d
          ? g(
              jr,
              j(
                j({}, i.value),
                {},
                {
                  appear: u === 'show',
                  onAfterAppear: p => s(p, 'appear'),
                  onAfterLeave: p => s(p, 'leave')
                }
              ),
              {
                default: () => [
                  Fr(
                    g(
                      'div',
                      { class: `${r.value.prefixCls}-treenode-motion` },
                      [
                        d.map(p => {
                          const c = Yo(p.data, []),
                            { title: v, key: S, isStart: h, isEnd: $ } = p
                          return (
                            delete c.children,
                            g(
                              Pn,
                              j(
                                j({}, c),
                                {},
                                {
                                  title: v,
                                  active: y,
                                  data: p.data,
                                  key: S,
                                  eventKey: S,
                                  isStart: h,
                                  isEnd: $
                                }
                              ),
                              o
                            )
                          )
                        })
                      ]
                    ),
                    [[Mr, l.value]]
                  )
                ]
              }
            )
          : g(
              Pn,
              j(
                j({ class: n.class, style: n.style }, b),
                {},
                { active: y, eventKey: x }
              ),
              o
            )
      }
    )
  }
})
function wc() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [],
    t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : []
  const n = e.length,
    o = t.length
  if (Math.abs(n - o) !== 1) return { add: !1, key: null }
  function l(r, a) {
    const i = new Map()
    r.forEach(f => {
      i.set(f, !0)
    })
    const s = a.filter(f => !i.has(f))
    return s.length === 1 ? s[0] : null
  }
  return n < o ? { add: !0, key: l(e, t) } : { add: !1, key: l(t, e) }
}
function Jo(e, t, n) {
  const o = e.findIndex(a => a.key === n),
    l = e[o + 1],
    r = t.findIndex(a => a.key === n)
  if (l) {
    const a = t.findIndex(i => i.key === l.key)
    return t.slice(r + 1, a)
  }
  return t.slice(r + 1)
}
var Qo =
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
const Zo = {
    width: 0,
    height: 0,
    display: 'flex',
    overflow: 'hidden',
    opacity: 0,
    border: 0,
    padding: 0,
    margin: 0
  },
  Oc = () => {},
  kt = `RC_TREE_MOTION_${Math.random()}`,
  jn = { key: kt },
  ir = { key: kt, level: 0, index: 0, pos: '0', node: jn, nodes: [jn] },
  el = {
    parent: null,
    children: [],
    pos: ir.pos,
    data: jn,
    title: null,
    key: kt,
    isStart: [],
    isEnd: []
  }
function tl(e, t, n, o) {
  return t === !1 || !n ? e : e.slice(0, Math.ceil(n / o) + 1)
}
function nl(e) {
  const { key: t, pos: n } = e
  return jt(t, n)
}
function Pc(e) {
  let t = String(e.key),
    n = e
  for (; n.parent; ) (n = n.parent), (t = `${n.key} > ${t}`)
  return t
}
const Ic = ge({
  compatConfig: { MODE: 3 },
  name: 'NodeList',
  inheritAttrs: !1,
  props: Oi,
  setup(e, t) {
    let { expose: n, attrs: o } = t
    const l = ve(),
      r = ve(),
      { expandedKeys: a, flattenNodes: i } = Nl()
    n({
      scrollTo: p => {
        l.value.scrollTo(p)
      },
      getIndentWidth: () => r.value.offsetWidth
    })
    const s = oe(i.value),
      f = oe([]),
      d = ve(null)
    function u() {
      ;(s.value = i.value),
        (f.value = []),
        (d.value = null),
        e.onListChangeEnd()
    }
    const y = Qn()
    Ee([() => a.value.slice(), i], (p, c) => {
      let [v, S] = p,
        [h, $] = c
      const w = wc(h, v)
      if (w.key !== null) {
        const { virtual: k, height: P, itemHeight: T } = e
        if (w.add) {
          const C = $.findIndex(A => {
              let { key: F } = A
              return F === w.key
            }),
            E = tl(Jo($, S, w.key), k, P, T),
            R = $.slice()
          R.splice(C + 1, 0, el),
            (s.value = R),
            (f.value = E),
            (d.value = 'show')
        } else {
          const C = S.findIndex(A => {
              let { key: F } = A
              return F === w.key
            }),
            E = tl(Jo(S, $, w.key), k, P, T),
            R = S.slice()
          R.splice(C + 1, 0, el),
            (s.value = R),
            (f.value = E),
            (d.value = 'hide')
        }
      } else $ !== S && (s.value = S)
    }),
      Ee(
        () => y.value.dragging,
        p => {
          p || u()
        }
      )
    const x = O(() => (e.motion === void 0 ? s.value : i.value)),
      b = () => {
        e.onActiveChange(null)
      }
    return () => {
      const p = m(m({}, e), o),
        {
          prefixCls: c,
          selectable: v,
          checkable: S,
          disabled: h,
          motion: $,
          height: w,
          itemHeight: k,
          virtual: P,
          focusable: T,
          activeItem: C,
          focused: E,
          tabindex: R,
          onKeydown: A,
          onFocus: F,
          onBlur: U,
          onListChangeStart: ee,
          onListChangeEnd: re
        } = p,
        ie = Qo(p, [
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
      return g(ht, null, [
        E && C && g('span', { style: Zo, 'aria-live': 'assertive' }, [Pc(C)]),
        g('div', null, [
          g(
            'input',
            {
              style: Zo,
              disabled: T === !1 || h,
              tabindex: T !== !1 ? R : null,
              onKeydown: A,
              onFocus: F,
              onBlur: U,
              value: '',
              onChange: Oc,
              'aria-label': 'for screen reader'
            },
            null
          )
        ]),
        g(
          'div',
          {
            class: `${c}-treenode`,
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
            g('div', { class: `${c}-indent` }, [
              g('div', { ref: r, class: `${c}-indent-unit` }, null)
            ])
          ]
        ),
        g(
          Na,
          j(
            j({}, Nt(ie, ['onActiveChange'])),
            {},
            {
              data: x.value,
              itemKey: nl,
              height: w,
              fullHeight: !1,
              virtual: P,
              itemHeight: k,
              prefixCls: `${c}-list`,
              ref: l,
              onVisibleChange: (V, Q) => {
                const L = new Set(V)
                Q.filter(_ => !L.has(_)).some(_ => nl(_) === kt) && u()
              }
            }
          ),
          {
            default: V => {
              const { pos: Q } = V,
                L = Qo(V.data, []),
                { title: Z, key: _, isStart: H, isEnd: M } = V,
                q = jt(_, Q)
              return (
                delete L.key,
                delete L.children,
                g(
                  $c,
                  j(
                    j({}, L),
                    {},
                    {
                      eventKey: q,
                      title: Z,
                      active: !!C && _ === C.key,
                      data: V.data,
                      isStart: H,
                      isEnd: M,
                      motion: $,
                      motionNodes: _ === kt ? f.value : null,
                      motionType: d.value,
                      onMotionStart: ee,
                      onMotionEnd: u,
                      onMousemove: b
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
function kc(e) {
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
const Ec = 10,
  Tc = ge({
    compatConfig: { MODE: 3 },
    name: 'Tree',
    inheritAttrs: !1,
    props: yt(_l(), {
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
      dropIndicatorRender: kc,
      allowDrop: () => !0
    }),
    setup(e, t) {
      let { attrs: n, slots: o, expose: l } = t
      const r = oe(!1)
      let a = {}
      const i = oe(),
        s = oe([]),
        f = oe([]),
        d = oe([]),
        u = oe([]),
        y = oe([]),
        x = oe([]),
        b = {},
        p = gt({
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
        c = oe([])
      Ee(
        [() => e.treeData, () => e.children],
        () => {
          c.value =
            e.treeData !== void 0 ? e.treeData.slice() : kn(bo(e.children))
        },
        { immediate: !0, deep: !0 }
      )
      const v = oe({}),
        S = oe(!1),
        h = oe(null),
        $ = oe(!1),
        w = O(() => ln(e.fieldNames)),
        k = oe()
      let P = null,
        T = null,
        C = null
      const E = O(() => ({
          expandedKeysSet: R.value,
          selectedKeysSet: A.value,
          loadedKeysSet: F.value,
          loadingKeysSet: U.value,
          checkedKeysSet: ee.value,
          halfCheckedKeysSet: re.value,
          dragOverNodeKey: p.dragOverNodeKey,
          dropPosition: p.dropPosition,
          keyEntities: v.value
        })),
        R = O(() => new Set(x.value)),
        A = O(() => new Set(s.value)),
        F = O(() => new Set(u.value)),
        U = O(() => new Set(y.value)),
        ee = O(() => new Set(f.value)),
        re = O(() => new Set(d.value))
      Ne(() => {
        if (c.value) {
          const N = eo(c.value, { fieldNames: w.value })
          v.value = m({ [kt]: ir }, N.keyEntities)
        }
      })
      let ie = !1
      Ee(
        [() => e.expandedKeys, () => e.autoExpandParent, v],
        (N, B) => {
          let [z, W] = N,
            [ne, le] = B,
            Y = x.value
          if (e.expandedKeys !== void 0 || (ie && W !== le))
            Y =
              e.autoExpandParent || (!ie && e.defaultExpandParent)
                ? In(e.expandedKeys, v.value)
                : e.expandedKeys
          else if (!ie && e.defaultExpandAll) {
            const Ce = m({}, v.value)
            delete Ce[kt], (Y = Object.keys(Ce).map(Pe => Ce[Pe].key))
          } else
            !ie &&
              e.defaultExpandedKeys &&
              (Y =
                e.autoExpandParent || e.defaultExpandParent
                  ? In(e.defaultExpandedKeys, v.value)
                  : e.defaultExpandedKeys)
          Y && (x.value = Y), (ie = !0)
        },
        { immediate: !0 }
      )
      const V = oe([])
      Ne(() => {
        V.value = Ri(c.value, x.value, w.value)
      }),
        Ne(() => {
          e.selectable &&
            (e.selectedKeys !== void 0
              ? (s.value = Ko(e.selectedKeys, e))
              : !ie &&
                e.defaultSelectedKeys &&
                (s.value = Ko(e.defaultSelectedKeys, e)))
        })
      const { maxLevel: Q, levelEntities: L } = Fl(v)
      Ne(() => {
        if (e.checkable) {
          let N
          if (
            (e.checkedKeys !== void 0
              ? (N = pn(e.checkedKeys) || {})
              : !ie && e.defaultCheckedKeys
              ? (N = pn(e.defaultCheckedKeys) || {})
              : c.value &&
                (N = pn(e.checkedKeys) || {
                  checkedKeys: f.value,
                  halfCheckedKeys: d.value
                }),
            N)
          ) {
            let { checkedKeys: B = [], halfCheckedKeys: z = [] } = N
            e.checkStrictly ||
              ({ checkedKeys: B, halfCheckedKeys: z } = Et(
                B,
                !0,
                v.value,
                Q.value,
                L.value
              )),
              (f.value = B),
              (d.value = z)
          }
        }
      }),
        Ne(() => {
          e.loadedKeys && (u.value = e.loadedKeys)
        })
      const Z = () => {
          m(p, {
            dragOverNodeKey: null,
            dropPosition: null,
            dropLevelOffset: null,
            dropTargetKey: null,
            dropContainerKey: null,
            dropTargetPos: null,
            dropAllowed: !1
          })
        },
        _ = N => {
          k.value.scrollTo(N)
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
            dt(() => {
              N !== null && _({ key: N })
            })
          },
          { immediate: !0, flush: 'post' }
        )
      const H = N => {
          e.expandedKeys === void 0 && (x.value = N)
        },
        M = () => {
          p.draggingNodeKey !== null &&
            m(p, {
              draggingNodeKey: null,
              dropPosition: null,
              dropContainerKey: null,
              dropTargetKey: null,
              dropLevelOffset: null,
              dropAllowed: !0,
              dragOverNodeKey: null
            }),
            (P = null),
            (C = null)
        },
        q = (N, B) => {
          const { onDragend: z } = e
          ;(p.dragOverNodeKey = null),
            M(),
            z == null || z({ event: N, node: B.eventData }),
            (T = null)
        },
        G = N => {
          q(N, null), window.removeEventListener('dragend', G)
        },
        Oe = (N, B) => {
          const { onDragstart: z } = e,
            { eventKey: W, eventData: ne } = B
          ;(T = B), (P = { x: N.clientX, y: N.clientY })
          const le = tt(x.value, W)
          ;(p.draggingNodeKey = W),
            (p.dragChildrenKeys = Ei(W, v.value)),
            (i.value = k.value.getIndentWidth()),
            H(le),
            window.addEventListener('dragend', G),
            z && z({ event: N, node: ne })
        },
        de = (N, B) => {
          const {
              onDragenter: z,
              onExpand: W,
              allowDrop: ne,
              direction: le
            } = e,
            { pos: Y, eventKey: Ce } = B
          if ((C !== Ce && (C = Ce), !T)) {
            Z()
            return
          }
          const {
            dropPosition: Pe,
            dropLevelOffset: xe,
            dropTargetKey: Se,
            dropContainerKey: $e,
            dropTargetPos: ze,
            dropAllowed: Me,
            dragOverNodeKey: Le
          } = To(N, T, B, i.value, P, ne, V.value, v.value, R.value, le)
          if (p.dragChildrenKeys.indexOf(Se) !== -1 || !Me) {
            Z()
            return
          }
          if (
            (a || (a = {}),
            Object.keys(a).forEach(_e => {
              clearTimeout(a[_e])
            }),
            T.eventKey !== B.eventKey &&
              (a[Y] = window.setTimeout(() => {
                if (p.draggingNodeKey === null) return
                let _e = x.value.slice()
                const et = v.value[B.eventKey]
                et &&
                  (et.children || []).length &&
                  (_e = at(x.value, B.eventKey)),
                  H(_e),
                  W &&
                    W(_e, { node: B.eventData, expanded: !0, nativeEvent: N })
              }, 800)),
            T.eventKey === Se && xe === 0)
          ) {
            Z()
            return
          }
          m(p, {
            dragOverNodeKey: Le,
            dropPosition: Pe,
            dropLevelOffset: xe,
            dropTargetKey: Se,
            dropContainerKey: $e,
            dropTargetPos: ze,
            dropAllowed: Me
          }),
            z && z({ event: N, node: B.eventData, expandedKeys: x.value })
        },
        Te = (N, B) => {
          const { onDragover: z, allowDrop: W, direction: ne } = e
          if (!T) return
          const {
            dropPosition: le,
            dropLevelOffset: Y,
            dropTargetKey: Ce,
            dropContainerKey: Pe,
            dropAllowed: xe,
            dropTargetPos: Se,
            dragOverNodeKey: $e
          } = To(N, T, B, i.value, P, W, V.value, v.value, R.value, ne)
          p.dragChildrenKeys.indexOf(Ce) !== -1 ||
            !xe ||
            (T.eventKey === Ce && Y === 0
              ? (p.dropPosition === null &&
                  p.dropLevelOffset === null &&
                  p.dropTargetKey === null &&
                  p.dropContainerKey === null &&
                  p.dropTargetPos === null &&
                  p.dropAllowed === !1 &&
                  p.dragOverNodeKey === null) ||
                Z()
              : (le === p.dropPosition &&
                  Y === p.dropLevelOffset &&
                  Ce === p.dropTargetKey &&
                  Pe === p.dropContainerKey &&
                  Se === p.dropTargetPos &&
                  xe === p.dropAllowed &&
                  $e === p.dragOverNodeKey) ||
                m(p, {
                  dropPosition: le,
                  dropLevelOffset: Y,
                  dropTargetKey: Ce,
                  dropContainerKey: Pe,
                  dropTargetPos: Se,
                  dropAllowed: xe,
                  dragOverNodeKey: $e
                }),
            z && z({ event: N, node: B.eventData }))
        },
        Ke = (N, B) => {
          C === B.eventKey &&
            !N.currentTarget.contains(N.relatedTarget) &&
            (Z(), (C = null))
          const { onDragleave: z } = e
          z && z({ event: N, node: B.eventData })
        },
        Be = function(N, B) {
          let z =
            arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1
          var W
          const {
            dragChildrenKeys: ne,
            dropPosition: le,
            dropTargetKey: Y,
            dropTargetPos: Ce,
            dropAllowed: Pe
          } = p
          if (!Pe) return
          const { onDrop: xe } = e
          if (((p.dragOverNodeKey = null), M(), Y === null)) return
          const Se = m(m({}, Gt(Y, bo(E.value))), {
            active:
              ((W = D.value) === null || W === void 0 ? void 0 : W.key) === Y,
            data: v.value[Y].node
          })
          ne.indexOf(Y)
          const $e = Zn(Ce),
            ze = {
              event: N,
              node: Ut(Se),
              dragNode: T ? T.eventData : null,
              dragNodesKeys: [T.eventKey].concat(ne),
              dropToGap: le !== 0,
              dropPosition: le + Number($e[$e.length - 1])
            }
          z || xe == null || xe(ze), (T = null)
        },
        Ae = (N, B) => {
          const { expanded: z, key: W } = B,
            ne = V.value.filter(Y => Y.key === W)[0],
            le = Ut(m(m({}, Gt(W, E.value)), { data: ne.data }))
          H(z ? tt(x.value, W) : at(x.value, W)), be(N, le)
        },
        He = (N, B) => {
          const { onClick: z, expandAction: W } = e
          W === 'click' && Ae(N, B), z && z(N, B)
        },
        De = (N, B) => {
          const { onDblclick: z, expandAction: W } = e
          ;(W === 'doubleclick' || W === 'dblclick') && Ae(N, B), z && z(N, B)
        },
        Re = (N, B) => {
          let z = s.value
          const { onSelect: W, multiple: ne } = e,
            { selected: le } = B,
            Y = B[w.value.key],
            Ce = !le
          Ce ? (ne ? (z = at(z, Y)) : (z = [Y])) : (z = tt(z, Y))
          const Pe = v.value,
            xe = z
              .map(Se => {
                const $e = Pe[Se]
                return $e ? $e.node : null
              })
              .filter(Se => Se)
          e.selectedKeys === void 0 && (s.value = z),
            W &&
              W(z, {
                event: 'select',
                selected: Ce,
                node: B,
                selectedNodes: xe,
                nativeEvent: N
              })
        },
        X = (N, B, z) => {
          const { checkStrictly: W, onCheck: ne } = e,
            le = B[w.value.key]
          let Y
          const Ce = { event: 'check', node: B, checked: z, nativeEvent: N },
            Pe = v.value
          if (W) {
            const xe = z ? at(f.value, le) : tt(f.value, le),
              Se = tt(d.value, le)
            ;(Y = { checked: xe, halfChecked: Se }),
              (Ce.checkedNodes = xe
                .map($e => Pe[$e])
                .filter($e => $e)
                .map($e => $e.node)),
              e.checkedKeys === void 0 && (f.value = xe)
          } else {
            let { checkedKeys: xe, halfCheckedKeys: Se } = Et(
              [...f.value, le],
              !0,
              Pe,
              Q.value,
              L.value
            )
            if (!z) {
              const $e = new Set(xe)
              $e.delete(le),
                ({ checkedKeys: xe, halfCheckedKeys: Se } = Et(
                  Array.from($e),
                  { checked: !1, halfCheckedKeys: Se },
                  Pe,
                  Q.value,
                  L.value
                ))
            }
            ;(Y = xe),
              (Ce.checkedNodes = []),
              (Ce.checkedNodesPositions = []),
              (Ce.halfCheckedKeys = Se),
              xe.forEach($e => {
                const ze = Pe[$e]
                if (!ze) return
                const { node: Me, pos: Le } = ze
                Ce.checkedNodes.push(Me),
                  Ce.checkedNodesPositions.push({ node: Me, pos: Le })
              }),
              e.checkedKeys === void 0 && ((f.value = xe), (d.value = Se))
          }
          ne && ne(Y, Ce)
        },
        fe = N => {
          const B = N[w.value.key],
            z = new Promise((W, ne) => {
              const { loadData: le, onLoad: Y } = e
              if (!le || F.value.has(B) || U.value.has(B)) return null
              le(N)
                .then(() => {
                  const Pe = at(u.value, B),
                    xe = tt(y.value, B)
                  Y && Y(Pe, { event: 'load', node: N }),
                    e.loadedKeys === void 0 && (u.value = Pe),
                    (y.value = xe),
                    W()
                })
                .catch(Pe => {
                  const xe = tt(y.value, B)
                  if (((y.value = xe), (b[B] = (b[B] || 0) + 1), b[B] >= Ec)) {
                    const Se = at(u.value, B)
                    e.loadedKeys === void 0 && (u.value = Se), W()
                  }
                  ne(Pe)
                }),
                (y.value = at(y.value, B))
            })
          return z.catch(() => {}), z
        },
        J = (N, B) => {
          const { onMouseenter: z } = e
          z && z({ event: N, node: B })
        },
        se = (N, B) => {
          const { onMouseleave: z } = e
          z && z({ event: N, node: B })
        },
        ue = (N, B) => {
          const { onRightClick: z } = e
          z && (N.preventDefault(), z({ event: N, node: B }))
        },
        Ie = N => {
          const { onFocus: B } = e
          ;(S.value = !0), B && B(N)
        },
        ce = N => {
          const { onBlur: B } = e
          ;(S.value = !1), I(null), B && B(N)
        },
        be = (N, B) => {
          let z = x.value
          const { onExpand: W, loadData: ne } = e,
            { expanded: le } = B,
            Y = B[w.value.key]
          if ($.value) return
          z.indexOf(Y)
          const Ce = !le
          if (
            (Ce ? (z = at(z, Y)) : (z = tt(z, Y)),
            H(z),
            W && W(z, { node: B, expanded: Ce, nativeEvent: N }),
            Ce && ne)
          ) {
            const Pe = fe(B)
            Pe &&
              Pe.then(() => {}).catch(xe => {
                const Se = tt(x.value, Y)
                H(Se), Promise.reject(xe)
              })
          }
        },
        ke = () => {
          $.value = !0
        },
        K = () => {
          setTimeout(() => {
            $.value = !1
          })
        },
        I = N => {
          const { onActiveChange: B } = e
          h.value !== N &&
            (e.activeKey !== void 0 && (h.value = N),
            N !== null && _({ key: N }),
            B && B(N))
        },
        D = O(() =>
          h.value === null
            ? null
            : V.value.find(N => {
                let { key: B } = N
                return B === h.value
              }) || null
        ),
        te = N => {
          let B = V.value.findIndex(W => {
            let { key: ne } = W
            return ne === h.value
          })
          B === -1 && N < 0 && (B = V.value.length),
            (B = (B + N + V.value.length) % V.value.length)
          const z = V.value[B]
          if (z) {
            const { key: W } = z
            I(W)
          } else I(null)
        },
        he = O(() =>
          Ut(m(m({}, Gt(h.value, E.value)), { data: D.value.data, active: !0 }))
        ),
        we = N => {
          const { onKeydown: B, checkable: z, selectable: W } = e
          switch (N.which) {
            case pt.UP: {
              te(-1), N.preventDefault()
              break
            }
            case pt.DOWN: {
              te(1), N.preventDefault()
              break
            }
          }
          const ne = D.value
          if (ne && ne.data) {
            const le =
                ne.data.isLeaf === !1 || !!(ne.data.children || []).length,
              Y = he.value
            switch (N.which) {
              case pt.LEFT: {
                le && R.value.has(h.value)
                  ? be({}, Y)
                  : ne.parent && I(ne.parent.key),
                  N.preventDefault()
                break
              }
              case pt.RIGHT: {
                le && !R.value.has(h.value)
                  ? be({}, Y)
                  : ne.children && ne.children.length && I(ne.children[0].key),
                  N.preventDefault()
                break
              }
              case pt.ENTER:
              case pt.SPACE: {
                z && !Y.disabled && Y.checkable !== !1 && !Y.disableCheckbox
                  ? X({}, Y, !ee.value.has(h.value))
                  : !z && W && !Y.disabled && Y.selectable !== !1 && Re({}, Y)
                break
              }
            }
          }
          B && B(N)
        }
      return (
        l({
          onNodeExpand: be,
          scrollTo: _,
          onKeydown: we,
          selectedKeys: O(() => s.value),
          checkedKeys: O(() => f.value),
          halfCheckedKeys: O(() => d.value),
          loadedKeys: O(() => u.value),
          loadingKeys: O(() => y.value),
          expandedKeys: O(() => x.value)
        }),
        Gn(() => {
          window.removeEventListener('dragend', G), (r.value = !0)
        }),
        Si({
          expandedKeys: x,
          selectedKeys: s,
          loadedKeys: u,
          loadingKeys: y,
          checkedKeys: f,
          halfCheckedKeys: d,
          expandedKeysSet: R,
          selectedKeysSet: A,
          loadedKeysSet: F,
          loadingKeysSet: U,
          checkedKeysSet: ee,
          halfCheckedKeysSet: re,
          flattenNodes: V
        }),
        () => {
          const {
              draggingNodeKey: N,
              dropLevelOffset: B,
              dropContainerKey: z,
              dropTargetKey: W,
              dropPosition: ne,
              dragOverNodeKey: le
            } = p,
            {
              prefixCls: Y,
              showLine: Ce,
              focusable: Pe,
              tabindex: xe = 0,
              selectable: Se,
              showIcon: $e,
              icon: ze = o.icon,
              switcherIcon: Me,
              draggable: Le,
              checkable: _e,
              checkStrictly: et,
              disabled: ut,
              motion: bt,
              loadData: Ht,
              filterTreeNode: ft,
              height: cn,
              itemHeight: Wt,
              virtual: Bt,
              dropIndicatorRender: mr,
              onContextmenu: yr,
              onScroll: br,
              direction: xr,
              rootClassName: Cr,
              rootStyle: Sr
            } = e,
            { class: $r, style: wr } = n,
            Or = Yn(m(m({}, e), n), { aria: !0, data: !0 })
          let _t
          return (
            Le
              ? typeof Le == 'object'
                ? (_t = Le)
                : typeof Le == 'function'
                ? (_t = { nodeDraggable: Le })
                : (_t = {})
              : (_t = !1),
            g(
              Ci,
              {
                value: {
                  prefixCls: Y,
                  selectable: Se,
                  showIcon: $e,
                  icon: ze,
                  switcherIcon: Me,
                  draggable: _t,
                  draggingNodeKey: N,
                  checkable: _e,
                  customCheckable: o.checkable,
                  checkStrictly: et,
                  disabled: ut,
                  keyEntities: v.value,
                  dropLevelOffset: B,
                  dropContainerKey: z,
                  dropTargetKey: W,
                  dropPosition: ne,
                  dragOverNodeKey: le,
                  dragging: N !== null,
                  indent: i.value,
                  direction: xr,
                  dropIndicatorRender: mr,
                  loadData: Ht,
                  filterTreeNode: ft,
                  onNodeClick: He,
                  onNodeDoubleClick: De,
                  onNodeExpand: be,
                  onNodeSelect: Re,
                  onNodeCheck: X,
                  onNodeLoad: fe,
                  onNodeMouseEnter: J,
                  onNodeMouseLeave: se,
                  onNodeContextMenu: ue,
                  onNodeDragStart: Oe,
                  onNodeDragEnter: de,
                  onNodeDragOver: Te,
                  onNodeDragLeave: Ke,
                  onNodeDragEnd: q,
                  onNodeDrop: Be,
                  slots: o
                }
              },
              {
                default: () => [
                  g(
                    'div',
                    {
                      role: 'tree',
                      class: ae(Y, $r, Cr, {
                        [`${Y}-show-line`]: Ce,
                        [`${Y}-focused`]: S.value,
                        [`${Y}-active-focused`]: h.value !== null
                      }),
                      style: Sr
                    },
                    [
                      g(
                        Ic,
                        j(
                          {
                            ref: k,
                            prefixCls: Y,
                            style: wr,
                            disabled: ut,
                            selectable: Se,
                            checkable: !!_e,
                            motion: bt,
                            height: cn,
                            itemHeight: Wt,
                            virtual: Bt,
                            focusable: Pe,
                            focused: S.value,
                            tabindex: xe,
                            activeItem: D.value,
                            onFocus: Ie,
                            onBlur: ce,
                            onKeydown: we,
                            onActiveChange: I,
                            onListChangeStart: ke,
                            onListChangeEnd: K,
                            onContextmenu: yr,
                            onScroll: br
                          },
                          Or
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
        Kc(e, l, n[l])
      })
  }
  return e
}
function Kc(e, t, n) {
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
  var o = ol({}, t, n.attrs)
  return g(Ze, ol({}, o, { icon: Oa }), null)
}
co.displayName = 'FileOutlined'
co.inheritAttrs = !1
const sr = co
function ll(e) {
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
        Dc(e, l, n[l])
      })
  }
  return e
}
function Dc(e, t, n) {
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
  var o = ll({}, t, n.attrs)
  return g(Ze, ll({}, o, { icon: Pa }), null)
}
uo.displayName = 'MinusSquareOutlined'
uo.inheritAttrs = !1
const Rc = uo
function rl(e) {
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
        Nc(e, l, n[l])
      })
  }
  return e
}
function Nc(e, t, n) {
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
var fo = function(t, n) {
  var o = rl({}, t, n.attrs)
  return g(Ze, rl({}, o, { icon: Ia }), null)
}
fo.displayName = 'PlusSquareOutlined'
fo.inheritAttrs = !1
const Bc = fo
function al(e) {
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
        _c(e, l, n[l])
      })
  }
  return e
}
function _c(e, t, n) {
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
  var o = al({}, t, n.attrs)
  return g(Ze, al({}, o, { icon: ka }), null)
}
po.displayName = 'CaretDownFilled'
po.inheritAttrs = !1
const Ac = po
function zc(e, t, n, o, l) {
  const { isLeaf: r, expanded: a, loading: i } = n
  let s = t
  if (i) return g(Rr, { class: `${e}-switcher-loading-icon` }, null)
  let f
  l && typeof l == 'object' && (f = l.showLeafIcon)
  let d = null
  const u = `${e}-switcher-icon`
  return r
    ? l
      ? f && o
        ? o(n)
        : (typeof l == 'object' && !f
            ? (d = g('span', { class: `${e}-switcher-leaf-line` }, null))
            : (d = g(sr, { class: `${e}-switcher-line-icon` }, null)),
          d)
      : null
    : ((d = g(Ac, { class: u }, null)),
      l &&
        (d = a
          ? g(Rc, { class: `${e}-switcher-line-icon` }, null)
          : g(Bc, { class: `${e}-switcher-line-icon` }, null)),
      typeof t == 'function'
        ? (s = t(m(m({}, n), { defaultIcon: d, switcherCls: u })))
        : Kt(s) && (s = Lr(s, { class: u })),
      s || d)
}
const il = 4
function Fc(e) {
  const {
      dropPosition: t,
      dropLevelOffset: n,
      prefixCls: o,
      indent: l,
      direction: r = 'ltr'
    } = e,
    a = r === 'ltr' ? 'left' : 'right',
    i = r === 'ltr' ? 'right' : 'left',
    s = { [a]: `${-n * l + il}px`, [i]: 0 }
  switch (t) {
    case -1:
      s.top = '-3px'
      break
    case 1:
      s.bottom = '-3px'
      break
    default:
      ;(s.bottom = '-3px'), (s[a] = `${l + il}px`)
      break
  }
  return g('div', { style: s, class: `${o}-drop-indicator` }, null)
}
const Mc = new Vn('ant-tree-node-fx-do-not-use', {
    '0%': { opacity: 0 },
    '100%': { opacity: 1 }
  }),
  jc = (e, t) => ({
    [`.${e}-switcher-icon`]: {
      display: 'inline-block',
      fontSize: 10,
      verticalAlign: 'baseline',
      svg: { transition: `transform ${t.motionDurationSlow}` }
    }
  }),
  Lc = (e, t) => ({
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
  Hc = (e, t) => {
    const {
        treeCls: n,
        treeNodeCls: o,
        treeNodePadding: l,
        treeTitleHeight: r
      } = t,
      a = (r - t.fontSizeLG) / 2,
      i = t.paddingXS
    return {
      [n]: m(m({}, Je(t)), {
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
        [`&-focused:not(:hover):not(${n}-active-focused)`]: m({}, Pt(t)),
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
                animationName: Mc,
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
          [`&-active ${n}-node-content-wrapper`]: m({}, Pt(t)),
          [`&:not(${o}-disabled).filter-node ${n}-title`]: {
            color: 'inherit',
            fontWeight: 500
          },
          '&-draggable': {
            [`${n}-draggable-icon`]: {
              width: r,
              lineHeight: `${r}px`,
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
          '&-unit': { display: 'inline-block', width: r }
        },
        [`${n}-draggable-icon`]: { visibility: 'hidden' },
        [`${n}-switcher`]: m(m({}, jc(e, t)), {
          position: 'relative',
          flex: 'none',
          alignSelf: 'stretch',
          width: r,
          margin: 0,
          lineHeight: `${r}px`,
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
              insetInlineEnd: r / 2,
              bottom: -l,
              marginInlineStart: -1,
              borderInlineEnd: `1px solid ${t.colorBorder}`,
              content: '""'
            },
            '&:after': {
              position: 'absolute',
              width: (r / 2) * 0.8,
              height: r / 2,
              borderBottom: `1px solid ${t.colorBorder}`,
              content: '""'
            }
          }
        }),
        [`${n}-checkbox`]: {
          top: 'initial',
          marginInlineEnd: i,
          marginBlockStart: a
        },
        [`${n}-node-content-wrapper, ${n}-checkbox + span`]: {
          position: 'relative',
          zIndex: 'auto',
          minHeight: r,
          margin: 0,
          padding: `0 ${t.paddingXS / 2}px`,
          color: 'inherit',
          lineHeight: `${r}px`,
          background: 'transparent',
          borderRadius: t.borderRadius,
          cursor: 'pointer',
          transition: `all ${t.motionDurationMid}, border 0s, line-height 0s, box-shadow 0s`,
          '&:hover': { backgroundColor: t.controlItemBgHover },
          [`&${n}-node-selected`]: { backgroundColor: t.controlItemBgActive },
          [`${n}-iconEle`]: {
            display: 'inline-block',
            width: r,
            height: r,
            lineHeight: `${r}px`,
            textAlign: 'center',
            verticalAlign: 'top',
            '&:empty': { display: 'none' }
          }
        },
        [`${n}-unselectable ${n}-node-content-wrapper:hover`]: {
          backgroundColor: 'transparent'
        },
        [`${n}-node-content-wrapper`]: m(
          { lineHeight: `${r}px`, userSelect: 'none' },
          Lc(e, t)
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
                insetInlineEnd: r / 2,
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
                height: `${r / 2}px !important`
              }
            }
          }
        }
      })
    }
  },
  Wc = e => {
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
  Vc = (e, t) => {
    const n = `.${e}`,
      o = `${n}-treenode`,
      l = t.paddingXS / 2,
      r = t.controlHeightSM,
      a = Rt(t, {
        treeCls: n,
        treeNodeCls: o,
        treeNodePadding: l,
        treeTitleHeight: r
      })
    return [Hc(e, a), Wc(a)]
  },
  Xc = Dt('Tree', (e, t) => {
    let { prefixCls: n } = t
    return [{ [e.componentCls]: Ml(`${n}-checkbox`, e) }, Vc(n, e), ha(e)]
  }),
  cr = () => {
    const e = _l()
    return m(m({}, e), {
      showLine: Ve([Boolean, Object]),
      multiple: pe(),
      autoExpandParent: pe(),
      checkStrictly: pe(),
      checkable: pe(),
      disabled: pe(),
      defaultExpandAll: pe(),
      defaultExpandParent: pe(),
      defaultExpandedKeys: je(),
      expandedKeys: je(),
      checkedKeys: Ve([Array, Object]),
      defaultCheckedKeys: je(),
      selectedKeys: je(),
      defaultSelectedKeys: je(),
      selectable: pe(),
      loadedKeys: je(),
      draggable: pe(),
      showIcon: pe(),
      icon: ye(),
      switcherIcon: me.any,
      prefixCls: String,
      replaceFields: nt(),
      blockNode: pe(),
      openAnimation: me.any,
      onDoubleclick: e.onDblclick,
      'onUpdate:selectedKeys': ye(),
      'onUpdate:checkedKeys': ye(),
      'onUpdate:expandedKeys': ye()
    })
  },
  Yt = ge({
    compatConfig: { MODE: 3 },
    name: 'ATree',
    inheritAttrs: !1,
    props: yt(cr(), {
      checkable: !1,
      selectable: !0,
      showIcon: !1,
      blockNode: !1
    }),
    slots: Object,
    setup(e, t) {
      let { attrs: n, expose: o, emit: l, slots: r } = t
      bl(!(e.treeData === void 0 && r.default))
      const { prefixCls: a, direction: i, virtual: s } = qe('tree', e),
        [f, d] = Xc(a),
        u = ve()
      o({
        treeRef: u,
        onNodeExpand: function() {
          var c
          ;(c = u.value) === null ||
            c === void 0 ||
            c.onNodeExpand(...arguments)
        },
        scrollTo: c => {
          var v
          ;(v = u.value) === null || v === void 0 || v.scrollTo(c)
        },
        selectedKeys: O(() => {
          var c
          return (c = u.value) === null || c === void 0
            ? void 0
            : c.selectedKeys
        }),
        checkedKeys: O(() => {
          var c
          return (c = u.value) === null || c === void 0 ? void 0 : c.checkedKeys
        }),
        halfCheckedKeys: O(() => {
          var c
          return (c = u.value) === null || c === void 0
            ? void 0
            : c.halfCheckedKeys
        }),
        loadedKeys: O(() => {
          var c
          return (c = u.value) === null || c === void 0 ? void 0 : c.loadedKeys
        }),
        loadingKeys: O(() => {
          var c
          return (c = u.value) === null || c === void 0 ? void 0 : c.loadingKeys
        }),
        expandedKeys: O(() => {
          var c
          return (c = u.value) === null || c === void 0
            ? void 0
            : c.expandedKeys
        })
      }),
        Ne(() => {
          Qe(
            e.replaceFields === void 0,
            'Tree',
            '`replaceFields` is deprecated, please use fieldNames instead'
          )
        })
      const x = (c, v) => {
          l('update:checkedKeys', c), l('check', c, v)
        },
        b = (c, v) => {
          l('update:expandedKeys', c), l('expand', c, v)
        },
        p = (c, v) => {
          l('update:selectedKeys', c), l('select', c, v)
        }
      return () => {
        const {
            showIcon: c,
            showLine: v,
            switcherIcon: S = r.switcherIcon,
            icon: h = r.icon,
            blockNode: $,
            checkable: w,
            selectable: k,
            fieldNames: P = e.replaceFields,
            motion: T = e.openAnimation,
            itemHeight: C = 28,
            onDoubleclick: E,
            onDblclick: R
          } = e,
          A = m(
            m(
              m({}, n),
              Nt(e, [
                'onUpdate:checkedKeys',
                'onUpdate:expandedKeys',
                'onUpdate:selectedKeys',
                'onDoubleclick'
              ])
            ),
            {
              showLine: !!v,
              dropIndicatorRender: Fc,
              fieldNames: P,
              icon: h,
              itemHeight: C
            }
          ),
          F = r.default ? Ft(r.default()) : void 0
        return f(
          g(
            Tc,
            j(
              j({}, A),
              {},
              {
                virtual: s.value,
                motion: T,
                ref: u,
                prefixCls: a.value,
                class: ae(
                  {
                    [`${a.value}-icon-hide`]: !c,
                    [`${a.value}-block-node`]: $,
                    [`${a.value}-unselectable`]: !k,
                    [`${a.value}-rtl`]: i.value === 'rtl'
                  },
                  n.class,
                  d.value
                ),
                direction: i.value,
                checkable: w,
                selectable: k,
                switcherIcon: U => zc(a.value, S, U, r.leafIcon, v),
                onCheck: x,
                onExpand: b,
                onSelect: p,
                onDblclick: R || E,
                children: F
              }
            ),
            m(m({}, r), {
              checkable: () =>
                g('span', { class: `${a.value}-checkbox-inner` }, null)
            })
          )
        )
      }
    }
  })
function sl(e) {
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
        Gc(e, l, n[l])
      })
  }
  return e
}
function Gc(e, t, n) {
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
  var o = sl({}, t, n.attrs)
  return g(Ze, sl({}, o, { icon: Ea }), null)
}
vo.displayName = 'FolderOpenOutlined'
vo.inheritAttrs = !1
const Uc = vo
function cl(e) {
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
        qc(e, l, n[l])
      })
  }
  return e
}
function qc(e, t, n) {
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
  var o = cl({}, t, n.attrs)
  return g(Ze, cl({}, o, { icon: Ta }), null)
}
go.displayName = 'FolderOutlined'
go.inheritAttrs = !1
const Yc = go
var st
;(function(e) {
  ;(e[(e.None = 0)] = 'None'),
    (e[(e.Start = 1)] = 'Start'),
    (e[(e.End = 2)] = 'End')
})(st || (st = {}))
function ho(e, t, n) {
  function o(l) {
    const r = l[t.key],
      a = l[t.children]
    n(r, l) !== !1 && ho(a || [], t, n)
  }
  e.forEach(o)
}
function Jc(e) {
  let {
    treeData: t,
    expandedKeys: n,
    startKey: o,
    endKey: l,
    fieldNames: r = { title: 'title', key: 'key', children: 'children' }
  } = e
  const a = []
  let i = st.None
  if (o && o === l) return [o]
  if (!o || !l) return []
  function s(f) {
    return f === o || f === l
  }
  return (
    ho(t, r, f => {
      if (i === st.End) return !1
      if (s(f)) {
        if ((a.push(f), i === st.None)) i = st.Start
        else if (i === st.Start) return (i = st.End), !1
      } else i === st.Start && a.push(f)
      return n.includes(f)
    }),
    a
  )
}
function gn(e, t, n) {
  const o = [...t],
    l = []
  return (
    ho(e, n, (r, a) => {
      const i = o.indexOf(r)
      return i !== -1 && (l.push(a), o.splice(i, 1)), !!o.length
    }),
    l
  )
}
var Qc =
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
const Zc = () => m(m({}, cr()), { expandAction: Ve([Boolean, String]) })
function ed(e) {
  const { isLeaf: t, expanded: n } = e
  return t ? g(sr, null, null) : n ? g(Uc, null, null) : g(Yc, null, null)
}
const hn = ge({
    compatConfig: { MODE: 3 },
    name: 'ADirectoryTree',
    inheritAttrs: !1,
    props: yt(Zc(), { showIcon: !0, expandAction: 'click' }),
    slots: Object,
    setup(e, t) {
      let { attrs: n, slots: o, emit: l, expose: r } = t
      var a
      const i = ve(
        e.treeData ||
          kn(Ft((a = o.default) === null || a === void 0 ? void 0 : a.call(o)))
      )
      Ee(
        () => e.treeData,
        () => {
          i.value = e.treeData
        }
      ),
        Un(() => {
          dt(() => {
            var C
            e.treeData === void 0 &&
              o.default &&
              (i.value = kn(
                Ft(
                  (C = o.default) === null || C === void 0 ? void 0 : C.call(o)
                )
              ))
          })
        })
      const s = ve(),
        f = ve(),
        d = O(() => ln(e.fieldNames)),
        u = ve()
      r({
        scrollTo: C => {
          var E
          ;(E = u.value) === null || E === void 0 || E.scrollTo(C)
        },
        selectedKeys: O(() => {
          var C
          return (C = u.value) === null || C === void 0
            ? void 0
            : C.selectedKeys
        }),
        checkedKeys: O(() => {
          var C
          return (C = u.value) === null || C === void 0 ? void 0 : C.checkedKeys
        }),
        halfCheckedKeys: O(() => {
          var C
          return (C = u.value) === null || C === void 0
            ? void 0
            : C.halfCheckedKeys
        }),
        loadedKeys: O(() => {
          var C
          return (C = u.value) === null || C === void 0 ? void 0 : C.loadedKeys
        }),
        loadingKeys: O(() => {
          var C
          return (C = u.value) === null || C === void 0 ? void 0 : C.loadingKeys
        }),
        expandedKeys: O(() => {
          var C
          return (C = u.value) === null || C === void 0
            ? void 0
            : C.expandedKeys
        })
      })
      const x = () => {
          const { keyEntities: C } = eo(i.value, { fieldNames: d.value })
          let E
          return (
            e.defaultExpandAll
              ? (E = Object.keys(C))
              : e.defaultExpandParent
              ? (E = In(e.expandedKeys || e.defaultExpandedKeys || [], C))
              : (E = e.expandedKeys || e.defaultExpandedKeys),
            E
          )
        },
        b = ve(e.selectedKeys || e.defaultSelectedKeys || []),
        p = ve(x())
      Ee(
        () => e.selectedKeys,
        () => {
          e.selectedKeys !== void 0 && (b.value = e.selectedKeys)
        },
        { immediate: !0 }
      ),
        Ee(
          () => e.expandedKeys,
          () => {
            e.expandedKeys !== void 0 && (p.value = e.expandedKeys)
          },
          { immediate: !0 }
        )
      const v = Ja(
          (C, E) => {
            const { isLeaf: R } = E
            R ||
              C.shiftKey ||
              C.metaKey ||
              C.ctrlKey ||
              u.value.onNodeExpand(C, E)
          },
          200,
          { leading: !0 }
        ),
        S = (C, E) => {
          e.expandedKeys === void 0 && (p.value = C),
            l('update:expandedKeys', C),
            l('expand', C, E)
        },
        h = (C, E) => {
          const { expandAction: R } = e
          R === 'click' && v(C, E), l('click', C, E)
        },
        $ = (C, E) => {
          const { expandAction: R } = e
          ;(R === 'dblclick' || R === 'doubleclick') && v(C, E),
            l('doubleclick', C, E),
            l('dblclick', C, E)
        },
        w = (C, E) => {
          const { multiple: R } = e,
            { node: A, nativeEvent: F } = E,
            U = A[d.value.key],
            ee = m(m({}, E), { selected: !0 }),
            re =
              (F == null ? void 0 : F.ctrlKey) ||
              (F == null ? void 0 : F.metaKey),
            ie = F == null ? void 0 : F.shiftKey
          let V
          R && re
            ? ((V = C),
              (s.value = U),
              (f.value = V),
              (ee.selectedNodes = gn(i.value, V, d.value)))
            : R && ie
            ? ((V = Array.from(
                new Set([
                  ...(f.value || []),
                  ...Jc({
                    treeData: i.value,
                    expandedKeys: p.value,
                    startKey: U,
                    endKey: s.value,
                    fieldNames: d.value
                  })
                ])
              )),
              (ee.selectedNodes = gn(i.value, V, d.value)))
            : ((V = [U]),
              (s.value = U),
              (f.value = V),
              (ee.selectedNodes = gn(i.value, V, d.value))),
            l('update:selectedKeys', V),
            l('select', V, ee),
            e.selectedKeys === void 0 && (b.value = V)
        },
        k = (C, E) => {
          l('update:checkedKeys', C), l('check', C, E)
        },
        { prefixCls: P, direction: T } = qe('tree', e)
      return () => {
        const C = ae(
            `${P.value}-directory`,
            { [`${P.value}-directory-rtl`]: T.value === 'rtl' },
            n.class
          ),
          { icon: E = o.icon, blockNode: R = !0 } = e,
          A = Qc(e, ['icon', 'blockNode'])
        return g(
          Yt,
          j(
            j(j({}, n), {}, { icon: E || ed, ref: u, blockNode: R }, A),
            {},
            {
              prefixCls: P.value,
              class: C,
              expandedKeys: p.value,
              selectedKeys: b.value,
              onSelect: w,
              onClick: h,
              onDblclick: $,
              onExpand: S,
              onCheck: k
            }
          ),
          o
        )
      }
    }
  }),
  mn = Pn,
  td = m(Yt, {
    DirectoryTree: hn,
    TreeNode: mn,
    install: e => (
      e.component(Yt.name, Yt),
      e.component(mn.name, mn),
      e.component(hn.name, hn),
      e
    )
  })
function dl(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1
  const o = new Set()
  function l(r, a) {
    let i = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1
    const s = o.has(r)
    if ((ma(!s, 'Warning: There may be circular references'), s)) return !1
    if (r === a) return !0
    if (n && i > 1) return !1
    o.add(r)
    const f = i + 1
    if (Array.isArray(r)) {
      if (!Array.isArray(a) || r.length !== a.length) return !1
      for (let d = 0; d < r.length; d++) if (!l(r[d], a[d], f)) return !1
      return !0
    }
    if (r && a && typeof r == 'object' && typeof a == 'object') {
      const d = Object.keys(r)
      return d.length !== Object.keys(a).length
        ? !1
        : d.every(u => l(r[u], a[u], f))
    }
    return !1
  }
  return l(e, t)
}
const { SubMenu: nd, Item: od } = Zt
function ld(e) {
  return e.some(t => {
    let { children: n } = t
    return n && n.length > 0
  })
}
function dr(e, t) {
  return typeof t == 'string' || typeof t == 'number'
    ? t == null
      ? void 0
      : t
          .toString()
          .toLowerCase()
          .includes(e.trim().toLowerCase())
    : !1
}
function ur(e) {
  let {
    filters: t,
    prefixCls: n,
    filteredKeys: o,
    filterMultiple: l,
    searchValue: r,
    filterSearch: a
  } = e
  return t.map((i, s) => {
    const f = String(i.value)
    if (i.children)
      return g(
        nd,
        { key: f || s, title: i.text, popupClassName: `${n}-dropdown-submenu` },
        {
          default: () => [
            ur({
              filters: i.children,
              prefixCls: n,
              filteredKeys: o,
              filterMultiple: l,
              searchValue: r,
              filterSearch: a
            })
          ]
        }
      )
    const d = l ? ct : We,
      u = g(
        od,
        { key: i.value !== void 0 ? f : s },
        {
          default: () => [
            g(d, { checked: o.includes(f) }, null),
            g('span', null, [i.text])
          ]
        }
      )
    return r.trim()
      ? typeof a == 'function'
        ? a(r, i)
          ? u
          : void 0
        : dr(r, i.text)
        ? u
        : void 0
      : u
  })
}
const rd = ge({
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
    const o = oo(),
      l = O(() => {
        var _
        return (_ = e.filterMode) !== null && _ !== void 0 ? _ : 'menu'
      }),
      r = O(() => {
        var _
        return (_ = e.filterSearch) !== null && _ !== void 0 ? _ : !1
      }),
      a = O(
        () => e.column.filterDropdownOpen || e.column.filterDropdownVisible
      ),
      i = O(
        () =>
          e.column.onFilterDropdownOpenChange ||
          e.column.onFilterDropdownVisibleChange
      ),
      s = oe(!1),
      f = O(() => {
        var _
        return !!(
          e.filterState &&
          ((!((_ = e.filterState.filteredKeys) === null || _ === void 0) &&
            _.length) ||
            e.filterState.forceFiltered)
        )
      }),
      d = O(() => {
        var _
        return sn((_ = e.column) === null || _ === void 0 ? void 0 : _.filters)
      }),
      u = O(() => {
        const {
          filterDropdown: _,
          slots: H = {},
          customFilterDropdown: M
        } = e.column
        return (
          _ ||
          (H.filterDropdown && o.value[H.filterDropdown]) ||
          (M && o.value.customFilterDropdown)
        )
      }),
      y = O(() => {
        const { filterIcon: _, slots: H = {} } = e.column
        return (
          _ ||
          (H.filterIcon && o.value[H.filterIcon]) ||
          o.value.customFilterIcon
        )
      }),
      x = _ => {
        var H
        ;(s.value = _), (H = i.value) === null || H === void 0 || H.call(i, _)
      },
      b = O(() => (typeof a.value == 'boolean' ? a.value : s.value)),
      p = O(() => {
        var _
        return (_ = e.filterState) === null || _ === void 0
          ? void 0
          : _.filteredKeys
      }),
      c = oe([]),
      v = _ => {
        let { selectedKeys: H } = _
        c.value = H
      },
      S = (_, H) => {
        let { node: M, checked: q } = H
        e.filterMultiple
          ? v({ selectedKeys: _ })
          : v({ selectedKeys: q && M.key ? [M.key] : [] })
      }
    Ee(
      p,
      () => {
        s.value && v({ selectedKeys: p.value || [] })
      },
      { immediate: !0 }
    )
    const h = oe([]),
      $ = oe(),
      w = _ => {
        $.value = setTimeout(() => {
          h.value = _
        })
      },
      k = () => {
        clearTimeout($.value)
      }
    mt(() => {
      clearTimeout($.value)
    })
    const P = oe(''),
      T = _ => {
        const { value: H } = _.target
        P.value = H
      }
    Ee(s, () => {
      s.value || (P.value = '')
    })
    const C = _ => {
        const { column: H, columnKey: M, filterState: q } = e,
          G = _ && _.length ? _ : null
        if (
          (G === null && (!q || !q.filteredKeys)) ||
          dl(G, q == null ? void 0 : q.filteredKeys, !0)
        )
          return null
        e.triggerFilter({ column: H, key: M, filteredKeys: G })
      },
      E = () => {
        x(!1), C(c.value)
      },
      R = function() {
        let { confirm: _, closeDropdown: H } =
          arguments.length > 0 && arguments[0] !== void 0
            ? arguments[0]
            : { confirm: !1, closeDropdown: !1 }
        _ && C([]),
          H && x(!1),
          (P.value = ''),
          e.column.filterResetToDefaultFilteredValue
            ? (c.value = (e.column.defaultFilteredValue || []).map(M =>
                String(M)
              ))
            : (c.value = [])
      },
      A = function() {
        let { closeDropdown: _ } =
          arguments.length > 0 && arguments[0] !== void 0
            ? arguments[0]
            : { closeDropdown: !0 }
        _ && x(!1), C(c.value)
      },
      F = _ => {
        _ && p.value !== void 0 && (c.value = p.value || []),
          x(_),
          !_ && !u.value && E()
      },
      { direction: U } = qe('', e),
      ee = _ => {
        if (_.target.checked) {
          const H = d.value
          c.value = H
        } else c.value = []
      },
      re = _ => {
        let { filters: H } = _
        return (H || []).map((M, q) => {
          const G = String(M.value),
            Oe = { title: M.text, key: M.value !== void 0 ? G : q }
          return M.children && (Oe.children = re({ filters: M.children })), Oe
        })
      },
      ie = _ => {
        var H
        return m(m({}, _), {
          text: _.title,
          value: _.key,
          children:
            ((H = _.children) === null || H === void 0
              ? void 0
              : H.map(M => ie(M))) || []
        })
      },
      V = O(() => re({ filters: e.column.filters })),
      Q = O(() =>
        ae({
          [`${e.dropdownPrefixCls}-menu-without-submenu`]: !ld(
            e.column.filters || []
          )
        })
      ),
      L = () => {
        const _ = c.value,
          {
            column: H,
            locale: M,
            tablePrefixCls: q,
            filterMultiple: G,
            dropdownPrefixCls: Oe,
            getPopupContainer: de,
            prefixCls: Te
          } = e
        return (H.filters || []).length === 0
          ? g(
              yo,
              {
                image: yo.PRESENTED_IMAGE_SIMPLE,
                description: M.filterEmptyText,
                imageStyle: { height: 24 },
                style: { margin: 0, padding: '16px 0' }
              },
              null
            )
          : l.value === 'tree'
          ? g(ht, null, [
              g(
                qo,
                {
                  filterSearch: r.value,
                  value: P.value,
                  onChange: T,
                  tablePrefixCls: q,
                  locale: M
                },
                null
              ),
              g('div', { class: `${q}-filter-dropdown-tree` }, [
                G
                  ? g(
                      ct,
                      {
                        class: `${q}-filter-dropdown-checkall`,
                        onChange: ee,
                        checked: _.length === d.value.length,
                        indeterminate: _.length > 0 && _.length < d.value.length
                      },
                      { default: () => [M.filterCheckall] }
                    )
                  : null,
                g(
                  td,
                  {
                    checkable: !0,
                    selectable: !1,
                    blockNode: !0,
                    multiple: G,
                    checkStrictly: !G,
                    class: `${Oe}-menu`,
                    onCheck: S,
                    checkedKeys: _,
                    selectedKeys: _,
                    showIcon: !1,
                    treeData: V.value,
                    autoExpandParent: !0,
                    defaultExpandAll: !0,
                    filterTreeNode: P.value.trim()
                      ? Ke =>
                          typeof r.value == 'function'
                            ? r.value(P.value, ie(Ke))
                            : dr(P.value, Ke.title)
                      : void 0
                  },
                  null
                )
              ])
            ])
          : g(ht, null, [
              g(
                qo,
                {
                  filterSearch: r.value,
                  value: P.value,
                  onChange: T,
                  tablePrefixCls: q,
                  locale: M
                },
                null
              ),
              g(
                Zt,
                {
                  multiple: G,
                  prefixCls: `${Oe}-menu`,
                  class: Q.value,
                  onClick: k,
                  onSelect: v,
                  onDeselect: v,
                  selectedKeys: _,
                  getPopupContainer: de,
                  openKeys: h.value,
                  onOpenChange: w
                },
                {
                  default: () =>
                    ur({
                      filters: H.filters || [],
                      filterSearch: r.value,
                      prefixCls: Te,
                      filteredKeys: c.value,
                      filterMultiple: G,
                      searchValue: P.value
                    })
                }
              )
            ])
      },
      Z = O(() => {
        const _ = c.value
        return e.column.filterResetToDefaultFilteredValue
          ? dl(
              (e.column.defaultFilteredValue || []).map(H => String(H)),
              _,
              !0
            )
          : _.length === 0
      })
    return () => {
      var _
      const {
        tablePrefixCls: H,
        prefixCls: M,
        column: q,
        dropdownPrefixCls: G,
        locale: Oe,
        getPopupContainer: de
      } = e
      let Te
      typeof u.value == 'function'
        ? (Te = u.value({
            prefixCls: `${G}-custom`,
            setSelectedKeys: Ae => v({ selectedKeys: Ae }),
            selectedKeys: c.value,
            confirm: A,
            clearFilters: R,
            filters: q.filters,
            visible: b.value,
            column: q.__originColumn__,
            close: () => {
              x(!1)
            }
          }))
        : u.value
        ? (Te = u.value)
        : (Te = g(ht, null, [
            L(),
            g('div', { class: `${M}-dropdown-btns` }, [
              g(
                Mt,
                {
                  type: 'link',
                  size: 'small',
                  disabled: Z.value,
                  onClick: () => R()
                },
                { default: () => [Oe.filterReset] }
              ),
              g(
                Mt,
                { type: 'primary', size: 'small', onClick: E },
                { default: () => [Oe.filterConfirm] }
              )
            ])
          ]))
      const Ke = g(Sc, { class: `${M}-dropdown` }, { default: () => [Te] })
      let Be
      return (
        typeof y.value == 'function'
          ? (Be = y.value({ filtered: f.value, column: q.__originColumn__ }))
          : y.value
          ? (Be = y.value)
          : (Be = g(bc, null, null)),
        g('div', { class: `${M}-column` }, [
          g('span', { class: `${H}-column-title` }, [
            (_ = n.default) === null || _ === void 0 ? void 0 : _.call(n)
          ]),
          g(
            Ot,
            {
              overlay: Ke,
              trigger: ['click'],
              open: b.value,
              onOpenChange: F,
              getPopupContainer: de,
              placement: U.value === 'rtl' ? 'bottomLeft' : 'bottomRight'
            },
            {
              default: () => [
                g(
                  'span',
                  {
                    role: 'button',
                    tabindex: -1,
                    class: ae(`${M}-trigger`, { active: f.value }),
                    onClick: Ae => {
                      Ae.stopPropagation()
                    }
                  },
                  [Be]
                )
              ]
            }
          )
        ])
      )
    }
  }
})
function Ln(e, t, n) {
  let o = []
  return (
    (e || []).forEach((l, r) => {
      var a, i
      const s = Lt(r, n),
        f =
          l.filterDropdown ||
          ((a = l == null ? void 0 : l.slots) === null || a === void 0
            ? void 0
            : a.filterDropdown) ||
          l.customFilterDropdown
      if (l.filters || f || 'onFilter' in l)
        if ('filteredValue' in l) {
          let d = l.filteredValue
          f ||
            (d =
              (i = d == null ? void 0 : d.map(String)) !== null && i !== void 0
                ? i
                : d),
            o.push({
              column: l,
              key: It(l, s),
              filteredKeys: d,
              forceFiltered: l.filtered
            })
        } else
          o.push({
            column: l,
            key: It(l, s),
            filteredKeys:
              t && l.defaultFilteredValue ? l.defaultFilteredValue : void 0,
            forceFiltered: l.filtered
          })
      'children' in l && (o = [...o, ...Ln(l.children, t, s)])
    }),
    o
  )
}
function fr(e, t, n, o, l, r, a, i) {
  return n.map((s, f) => {
    var d
    const u = Lt(f, i),
      { filterMultiple: y = !0, filterMode: x, filterSearch: b } = s
    let p = s
    const c =
      s.filterDropdown ||
      ((d = s == null ? void 0 : s.slots) === null || d === void 0
        ? void 0
        : d.filterDropdown) ||
      s.customFilterDropdown
    if (p.filters || c) {
      const v = It(p, u),
        S = o.find(h => {
          let { key: $ } = h
          return v === $
        })
      p = m(m({}, p), {
        title: h =>
          g(
            rd,
            {
              tablePrefixCls: e,
              prefixCls: `${e}-filter`,
              dropdownPrefixCls: t,
              column: p,
              columnKey: v,
              filterState: S,
              filterMultiple: y,
              filterMode: x,
              filterSearch: b,
              triggerFilter: r,
              locale: l,
              getPopupContainer: a
            },
            { default: () => [io(s.title, h)] }
          )
      })
    }
    return (
      'children' in p &&
        (p = m(m({}, p), { children: fr(e, t, p.children, o, l, r, a, u) })),
      p
    )
  })
}
function sn(e) {
  let t = []
  return (
    (e || []).forEach(n => {
      let { value: o, children: l } = n
      t.push(o), l && (t = [...t, ...sn(l)])
    }),
    t
  )
}
function ul(e) {
  const t = {}
  return (
    e.forEach(n => {
      let { key: o, filteredKeys: l, column: r } = n
      var a
      const i =
          r.filterDropdown ||
          ((a = r == null ? void 0 : r.slots) === null || a === void 0
            ? void 0
            : a.filterDropdown) ||
          r.customFilterDropdown,
        { filters: s } = r
      if (i) t[o] = l || null
      else if (Array.isArray(l)) {
        const f = sn(s)
        t[o] = f.filter(d => l.includes(String(d)))
      } else t[o] = null
    }),
    t
  )
}
function fl(e, t) {
  return t.reduce((n, o) => {
    const {
      column: { onFilter: l, filters: r },
      filteredKeys: a
    } = o
    return l && a && a.length
      ? n.filter(i =>
          a.some(s => {
            const f = sn(r),
              d = f.findIndex(y => String(y) === String(s)),
              u = d !== -1 ? f[d] : s
            return l(u, i)
          })
        )
      : n
  }, e)
}
function pr(e) {
  return e.flatMap(t => ('children' in t ? [t, ...pr(t.children || [])] : [t]))
}
function ad(e) {
  let {
    prefixCls: t,
    dropdownPrefixCls: n,
    mergedColumns: o,
    locale: l,
    onFilterChange: r,
    getPopupContainer: a
  } = e
  const i = O(() => pr(o.value)),
    [s, f] = wt(Ln(i.value, !0)),
    d = O(() => {
      const b = Ln(i.value, !1)
      if (b.length === 0) return b
      let p = !0,
        c = !0
      if (
        (b.forEach(v => {
          let { filteredKeys: S } = v
          S !== void 0 ? (p = !1) : (c = !1)
        }),
        p)
      ) {
        const v = (i.value || []).map((S, h) => It(S, Lt(h)))
        return s.value
          .filter(S => {
            let { key: h } = S
            return v.includes(h)
          })
          .map(S => {
            const h = i.value[v.findIndex($ => $ === S.key)]
            return m(m({}, S), {
              column: m(m({}, S.column), h),
              forceFiltered: h.filtered
            })
          })
      }
      return (
        Qe(
          c,
          'Table',
          'Columns should all contain `filteredValue` or not contain `filteredValue`.'
        ),
        b
      )
    }),
    u = O(() => ul(d.value)),
    y = b => {
      const p = d.value.filter(c => {
        let { key: v } = c
        return v !== b.key
      })
      p.push(b), f(p), r(ul(p), p)
    }
  return [b => fr(t.value, n.value, b, d.value, l.value, y, a.value), d, u]
}
function vr(e, t) {
  return e.map(n => {
    const o = m({}, n)
    return (
      (o.title = io(o.title, t)),
      'children' in o && (o.children = vr(o.children, t)),
      o
    )
  })
}
function id(e) {
  return [n => vr(n, e.value)]
}
function sd(e) {
  return function(n) {
    let { prefixCls: o, onExpand: l, record: r, expanded: a, expandable: i } = n
    const s = `${o}-row-expand-icon`
    return g(
      'button',
      {
        type: 'button',
        onClick: f => {
          l(r, f), f.stopPropagation()
        },
        class: ae(s, {
          [`${s}-spaced`]: !i,
          [`${s}-expanded`]: i && a,
          [`${s}-collapsed`]: i && !a
        }),
        'aria-label': a ? e.collapse : e.expand,
        'aria-expanded': a
      },
      null
    )
  }
}
function gr(e, t) {
  const n = t.value
  return e.map(o => {
    var l
    if (o === it || o === vt) return o
    const r = m({}, o),
      { slots: a = {} } = r
    return (
      (r.__originColumn__ = o),
      Qe(
        !('slots' in r),
        'Table',
        '`column.slots` is deprecated. Please use `v-slot:headerCell` `v-slot:bodyCell` instead.'
      ),
      Object.keys(a).forEach(i => {
        const s = a[i]
        r[i] === void 0 && n[s] && (r[i] = n[s])
      }),
      t.value.headerCell &&
        !(!((l = o.slots) === null || l === void 0) && l.title) &&
        (r.title = Jn(
          t.value,
          'headerCell',
          { title: o.title, column: o },
          () => [o.title]
        )),
      'children' in r &&
        Array.isArray(r.children) &&
        (r.children = gr(r.children, t)),
      r
    )
  })
}
function cd(e) {
  return [n => gr(n, e)]
}
const dd = e => {
    const { componentCls: t } = e,
      n = `${e.lineWidth}px ${e.lineType} ${e.tableBorderColor}`,
      o = (l, r, a) => ({
        [`&${t}-${l}`]: {
          [`> ${t}-container`]: {
            [`> ${t}-content, > ${t}-body`]: {
              '> table > tbody > tr > td': {
                [`> ${t}-expanded-row-fixed`]: {
                  margin: `-${r}px -${a + e.lineWidth}px`
                }
              }
            }
          }
        }
      })
    return {
      [`${t}-wrapper`]: {
        [`${t}${t}-bordered`]: m(
          m(
            m(
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
  ud = dd,
  fd = e => {
    const { componentCls: t } = e
    return {
      [`${t}-wrapper`]: {
        [`${t}-cell-ellipsis`]: m(m({}, Nr), {
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
  pd = fd,
  vd = e => {
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
  gd = vd,
  hd = e => {
    const {
        componentCls: t,
        antCls: n,
        controlInteractiveSize: o,
        motionDurationSlow: l,
        lineWidth: r,
        paddingXS: a,
        lineType: i,
        tableBorderColor: s,
        tableExpandIconBg: f,
        tableExpandColumnWidth: d,
        borderRadius: u,
        fontSize: y,
        fontSizeSM: x,
        lineHeight: b,
        tablePaddingVertical: p,
        tablePaddingHorizontal: c,
        tableExpandedRowBg: v,
        paddingXXS: S
      } = e,
      h = o / 2 - r,
      $ = h * 2 + r * 3,
      w = `${r}px ${i} ${s}`,
      k = S - r
    return {
      [`${t}-wrapper`]: {
        [`${t}-expand-icon-col`]: { width: d },
        [`${t}-row-expand-icon-cell`]: {
          textAlign: 'center',
          [`${t}-row-expand-icon`]: {
            display: 'inline-flex',
            float: 'none',
            verticalAlign: 'sub'
          }
        },
        [`${t}-row-indent`]: { height: 1, float: 'left' },
        [`${t}-row-expand-icon`]: m(m({}, ya(e)), {
          position: 'relative',
          float: 'left',
          boxSizing: 'border-box',
          width: $,
          height: $,
          padding: 0,
          color: 'inherit',
          lineHeight: `${$}px`,
          background: f,
          border: w,
          borderRadius: u,
          transform: `scale(${o / $})`,
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
            insetInlineEnd: k,
            insetInlineStart: k,
            height: r
          },
          '&::after': {
            top: k,
            bottom: k,
            insetInlineStart: h,
            width: r,
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
          marginTop: (y * b - r * 3) / 2 - Math.ceil((x * 1.4 - r * 3) / 2),
          marginInlineEnd: a
        },
        [`tr${t}-expanded-row`]: {
          '&, &:hover': { '> td': { background: v } },
          [`${n}-descriptions-view`]: {
            display: 'flex',
            table: { flex: 'auto', width: 'auto' }
          }
        },
        [`${t}-expanded-row-fixed`]: {
          position: 'relative',
          margin: `-${p}px -${c}px`,
          padding: `${p}px ${c}px`
        }
      }
    }
  },
  md = hd,
  yd = e => {
    const {
        componentCls: t,
        antCls: n,
        iconCls: o,
        tableFilterDropdownWidth: l,
        tableFilterDropdownSearchWidth: r,
        paddingXXS: a,
        paddingXS: i,
        colorText: s,
        lineWidth: f,
        lineType: d,
        tableBorderColor: u,
        tableHeaderIconColor: y,
        fontSizeSM: x,
        tablePaddingHorizontal: b,
        borderRadius: p,
        motionDurationSlow: c,
        colorTextDescription: v,
        colorPrimary: S,
        tableHeaderFilterActiveBg: h,
        colorTextDisabled: $,
        tableFilterDropdownBg: w,
        tableFilterDropdownHeight: k,
        controlItemBgHover: P,
        controlItemBgActive: T,
        boxShadowSecondary: C
      } = e,
      E = `${n}-dropdown`,
      R = `${t}-filter-dropdown`,
      A = `${n}-tree`,
      F = `${f}px ${d} ${u}`
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
            marginBlock: -a,
            marginInline: `${a}px ${-b / 2}px`,
            padding: `0 ${a}px`,
            color: y,
            fontSize: x,
            borderRadius: p,
            cursor: 'pointer',
            transition: `all ${c}`,
            '&:hover': { color: v, background: h },
            '&.active': { color: S }
          }
        }
      },
      {
        [`${n}-dropdown`]: {
          [R]: m(m({}, Je(e)), {
            minWidth: l,
            backgroundColor: w,
            borderRadius: p,
            boxShadow: C,
            [`${E}-menu`]: {
              maxHeight: k,
              overflowX: 'hidden',
              border: 0,
              boxShadow: 'none',
              '&:empty::after': {
                display: 'block',
                padding: `${i}px 0`,
                color: $,
                fontSize: x,
                textAlign: 'center',
                content: '"Not Found"'
              }
            },
            [`${R}-tree`]: {
              paddingBlock: `${i}px 0`,
              paddingInline: i,
              [A]: { padding: 0 },
              [`${A}-treenode ${A}-node-content-wrapper:hover`]: {
                backgroundColor: P
              },
              [`${A}-treenode-checkbox-checked ${A}-node-content-wrapper`]: {
                '&, &:hover': { backgroundColor: T }
              }
            },
            [`${R}-search`]: {
              padding: i,
              borderBottom: F,
              '&-input': { input: { minWidth: r }, [o]: { color: $ } }
            },
            [`${R}-checkall`]: {
              width: '100%',
              marginBottom: a,
              marginInlineStart: a
            },
            [`${R}-btns`]: {
              display: 'flex',
              justifyContent: 'space-between',
              padding: `${i - f}px ${i}px`,
              overflow: 'hidden',
              backgroundColor: 'inherit',
              borderTop: F
            }
          })
        }
      },
      {
        [`${n}-dropdown ${R}, ${R}-submenu`]: {
          [`${n}-checkbox-wrapper + span`]: { paddingInlineStart: i, color: s },
          '> ul': {
            maxHeight: 'calc(100vh - 130px)',
            overflowX: 'hidden',
            overflowY: 'auto'
          }
        }
      }
    ]
  },
  bd = yd,
  xd = e => {
    const {
        componentCls: t,
        lineWidth: n,
        colorSplit: o,
        motionDurationSlow: l,
        zIndexTableFixed: r,
        tableBg: a,
        zIndexTableSticky: i
      } = e,
      s = o
    return {
      [`${t}-wrapper`]: {
        [`
        ${t}-cell-fix-left,
        ${t}-cell-fix-right
      `]: { position: 'sticky !important', zIndex: r, background: a },
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
            '&::before': { boxShadow: `inset 10px 0 8px -8px ${s}` }
          },
          [`
          ${t}-cell-fix-left-first::after,
          ${t}-cell-fix-left-last::after
        `]: { boxShadow: `inset 10px 0 8px -8px ${s}` },
          [`${t}-cell-fix-left-last::before`]: {
            backgroundColor: 'transparent !important'
          }
        },
        [`${t}-ping-right`]: {
          [`&:not(${t}-has-fix-right) ${t}-container`]: {
            position: 'relative',
            '&::after': { boxShadow: `inset -10px 0 8px -8px ${s}` }
          },
          [`
          ${t}-cell-fix-right-first::after,
          ${t}-cell-fix-right-last::after
        `]: { boxShadow: `inset -10px 0 8px -8px ${s}` }
        }
      }
    }
  },
  Cd = xd,
  Sd = e => {
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
  $d = Sd,
  wd = e => {
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
  Od = wd,
  Pd = e => {
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
  Id = Pd,
  kd = e => {
    const {
      componentCls: t,
      antCls: n,
      iconCls: o,
      fontSizeIcon: l,
      paddingXS: r,
      tableHeaderIconColor: a,
      tableHeaderIconColorHover: i
    } = e
    return {
      [`${t}-wrapper`]: {
        [`${t}-selection-col`]: { width: e.tableSelectionColumnWidth },
        [`${t}-bordered ${t}-selection-col`]: {
          width: e.tableSelectionColumnWidth + r * 2
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
            color: a,
            fontSize: l,
            verticalAlign: 'baseline',
            '&:hover': { color: i }
          }
        }
      }
    }
  },
  Ed = kd,
  Td = e => {
    const { componentCls: t } = e,
      n = (o, l, r, a) => ({
        [`${t}${t}-${o}`]: {
          fontSize: a,
          [`
        ${t}-title,
        ${t}-footer,
        ${t}-thead > tr > th,
        ${t}-tbody > tr > td,
        tfoot > tr > th,
        tfoot > tr > td
      `]: { padding: `${l}px ${r}px` },
          [`${t}-filter-trigger`]: { marginInlineEnd: `-${r / 2}px` },
          [`${t}-expanded-row-fixed`]: { margin: `-${l}px -${r}px` },
          [`${t}-tbody`]: {
            [`${t}-wrapper:only-child ${t}`]: {
              marginBlock: `-${l}px`,
              marginInline: `${e.tableExpandColumnWidth - r}px -${r}px`
            }
          },
          [`${t}-selection-column`]: { paddingInlineStart: `${r / 4}px` }
        }
      })
    return {
      [`${t}-wrapper`]: m(
        m(
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
  Kd = Td,
  Dd = e => {
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
  Rd = Dd,
  Nd = e => {
    const {
      componentCls: t,
      marginXXS: n,
      fontSizeIcon: o,
      tableHeaderIconColor: l,
      tableHeaderIconColorHover: r
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
        [`${t}-column-sorters:hover ${t}-column-sorter`]: { color: r }
      }
    }
  },
  Bd = Nd,
  _d = e => {
    const {
        componentCls: t,
        opacityLoading: n,
        tableScrollThumbBg: o,
        tableScrollThumbBgHover: l,
        tableScrollThumbSize: r,
        tableScrollBg: a,
        zIndexTableSticky: i
      } = e,
      s = `${e.lineWidth}px ${e.lineType} ${e.tableBorderColor}`
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
            height: `${r}px !important`,
            zIndex: i,
            display: 'flex',
            alignItems: 'center',
            background: a,
            borderTop: s,
            opacity: n,
            '&:hover': { transformOrigin: 'center bottom' },
            '&-bar': {
              height: r,
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
  Ad = _d,
  zd = e => {
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
  pl = zd,
  Fd = e => {
    const {
        componentCls: t,
        fontWeightStrong: n,
        tablePaddingVertical: o,
        tablePaddingHorizontal: l,
        lineWidth: r,
        lineType: a,
        tableBorderColor: i,
        tableFontSize: s,
        tableBg: f,
        tableRadius: d,
        tableHeaderTextColor: u,
        motionDurationMid: y,
        tableHeaderBg: x,
        tableHeaderCellSplitColor: b,
        tableRowHoverBg: p,
        tableSelectedRowBg: c,
        tableSelectedRowHoverBg: v,
        tableFooterTextColor: S,
        tableFooterBg: h,
        paddingContentVerticalLG: $
      } = e,
      w = `${r}px ${a} ${i}`
    return {
      [`${t}-wrapper`]: m(m({ clear: 'both', maxWidth: '100%' }, Br()), {
        [t]: m(m({}, Je(e)), {
          fontSize: s,
          background: f,
          borderRadius: `${d}px ${d}px 0 0`
        }),
        table: {
          width: '100%',
          textAlign: 'start',
          borderRadius: `${d}px ${d}px 0 0`,
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
          padding: `${$}px ${l}px`,
          overflowWrap: 'break-word'
        },
        [`${t}-title`]: { padding: `${o}px ${l}px` },
        [`${t}-thead`]: {
          '\n          > tr > th,\n          > tr > td\n        ': {
            position: 'relative',
            color: u,
            fontWeight: n,
            textAlign: 'start',
            background: x,
            borderBottom: w,
            transition: `background ${y} ease`,
            "&[colspan]:not([colspan='1'])": { textAlign: 'center' },
            [`&:not(:last-child):not(${t}-selection-column):not(${t}-row-expand-icon-cell):not([colspan])::before`]: {
              position: 'absolute',
              top: '50%',
              insetInlineEnd: 0,
              width: 1,
              height: '1.6em',
              backgroundColor: b,
              transform: 'translateY(-50%)',
              transition: `background-color ${y}`,
              content: '""'
            }
          },
          '> tr:not(:last-child) > th[colspan]': { borderBottom: 0 }
        },
        [`${t}:not(${t}-bordered)`]: {
          [`${t}-tbody`]: {
            '> tr': {
              '> td': { borderTop: w, borderBottom: 'transparent' },
              '&:last-child > td': { borderBottom: w },
              [`&:first-child > td,
              &${t}-measure-row + tr > td`]: {
                borderTop: 'none',
                borderTopColor: 'transparent'
              }
            }
          }
        },
        [`${t}${t}-bordered`]: {
          [`${t}-tbody`]: { '> tr': { '> td': { borderBottom: w } } }
        },
        [`${t}-tbody`]: {
          '> tr': {
            '> td': {
              transition: `background ${y}, border-color ${y}`,
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
          `]: { background: p },
            [`&${t}-row-selected`]: {
              '> td': { background: c },
              '&:hover > td': { background: v }
            }
          }
        },
        [`${t}-footer`]: { padding: `${o}px ${l}px`, color: S, background: h }
      })
    }
  },
  Md = Dt('Table', e => {
    const {
        controlItemBgActive: t,
        controlItemBgActiveHover: n,
        colorTextPlaceholder: o,
        colorTextHeading: l,
        colorSplit: r,
        colorBorderSecondary: a,
        fontSize: i,
        padding: s,
        paddingXS: f,
        paddingSM: d,
        controlHeight: u,
        colorFillAlter: y,
        colorIcon: x,
        colorIconHover: b,
        opacityLoading: p,
        colorBgContainer: c,
        borderRadiusLG: v,
        colorFillContent: S,
        colorFillSecondary: h,
        controlInteractiveSize: $
      } = e,
      w = new zt(x),
      k = new zt(b),
      P = t,
      T = 2,
      C = new zt(h).onBackground(c).toHexString(),
      E = new zt(S).onBackground(c).toHexString(),
      R = new zt(y).onBackground(c).toHexString(),
      A = Rt(e, {
        tableFontSize: i,
        tableBg: c,
        tableRadius: v,
        tablePaddingVertical: s,
        tablePaddingHorizontal: s,
        tablePaddingVerticalMiddle: d,
        tablePaddingHorizontalMiddle: f,
        tablePaddingVerticalSmall: f,
        tablePaddingHorizontalSmall: f,
        tableBorderColor: a,
        tableHeaderTextColor: l,
        tableHeaderBg: R,
        tableFooterTextColor: l,
        tableFooterBg: R,
        tableHeaderCellSplitColor: a,
        tableHeaderSortBg: C,
        tableHeaderSortHoverBg: E,
        tableHeaderIconColor: w
          .clone()
          .setAlpha(w.getAlpha() * p)
          .toRgbString(),
        tableHeaderIconColorHover: k
          .clone()
          .setAlpha(k.getAlpha() * p)
          .toRgbString(),
        tableBodySortBg: R,
        tableFixedHeaderSortActiveBg: C,
        tableHeaderFilterActiveBg: S,
        tableFilterDropdownBg: c,
        tableRowHoverBg: R,
        tableSelectedRowBg: P,
        tableSelectedRowHoverBg: n,
        zIndexTableFixed: T,
        zIndexTableSticky: T + 1,
        tableFontSizeMiddle: i,
        tableFontSizeSmall: i,
        tableSelectionColumnWidth: u,
        tableExpandIconBg: c,
        tableExpandColumnWidth: $ + 2 * e.padding,
        tableExpandedRowBg: y,
        tableFilterDropdownWidth: 120,
        tableFilterDropdownHeight: 264,
        tableFilterDropdownSearchWidth: 140,
        tableScrollThumbSize: 8,
        tableScrollThumbBg: o,
        tableScrollThumbBgHover: l,
        tableScrollBg: r
      })
    return [
      Fd(A),
      $d(A),
      pl(A),
      Bd(A),
      bd(A),
      ud(A),
      Od(A),
      md(A),
      pl(A),
      gd(A),
      Ed(A),
      Cd(A),
      Ad(A),
      pd(A),
      Kd(A),
      Rd(A),
      Id(A)
    ]
  }),
  jd = [],
  hr = () => ({
    prefixCls: Xe(),
    columns: je(),
    rowKey: Ve([String, Function]),
    tableLayout: Xe(),
    rowClassName: Ve([String, Function]),
    title: ye(),
    footer: ye(),
    id: Xe(),
    showHeader: pe(),
    components: nt(),
    customRow: ye(),
    customHeaderRow: ye(),
    direction: Xe(),
    expandFixed: Ve([Boolean, String]),
    expandColumnWidth: Number,
    expandedRowKeys: je(),
    defaultExpandedRowKeys: je(),
    expandedRowRender: ye(),
    expandRowByClick: pe(),
    expandIcon: ye(),
    onExpand: ye(),
    onExpandedRowsChange: ye(),
    'onUpdate:expandedRowKeys': ye(),
    defaultExpandAllRows: pe(),
    indentSize: Number,
    expandIconColumnIndex: Number,
    showExpandColumn: pe(),
    expandedRowClassName: ye(),
    childrenColumnName: Xe(),
    rowExpandable: ye(),
    sticky: Ve([Boolean, Object]),
    dropdownPrefixCls: String,
    dataSource: je(),
    pagination: Ve([Boolean, Object]),
    loading: Ve([Boolean, Object]),
    size: Xe(),
    bordered: pe(),
    locale: nt(),
    onChange: ye(),
    onResizeColumn: ye(),
    rowSelection: nt(),
    getPopupContainer: ye(),
    scroll: nt(),
    sortDirections: je(),
    showSorterTooltip: Ve([Boolean, Object], !0),
    transformCellText: ye()
  }),
  Ld = ge({
    name: 'InternalTable',
    inheritAttrs: !1,
    props: yt(m(m({}, hr()), { contextSlots: nt() }), { rowKey: 'key' }),
    setup(e, t) {
      let { attrs: n, slots: o, expose: l, emit: r } = t
      Qe(
        !(typeof e.rowKey == 'function' && e.rowKey.length > 1),
        'Table',
        '`index` parameter of `rowKey` function is deprecated. There is no guarantee that it will work as expected.'
      ),
        gs(O(() => e.contextSlots)),
        hs({
          onResizeColumn: (X, fe) => {
            r('resizeColumn', X, fe)
          }
        })
      const a = $l(),
        i = O(() => {
          const X = new Set(Object.keys(a.value).filter(fe => a.value[fe]))
          return e.columns.filter(
            fe => !fe.responsive || fe.responsive.some(J => X.has(J))
          )
        }),
        {
          size: s,
          renderEmpty: f,
          direction: d,
          prefixCls: u,
          configProvider: y
        } = qe('table', e),
        [x, b] = Md(u),
        p = O(() => {
          var X
          return (
            e.transformCellText ||
            ((X = y.transformCellText) === null || X === void 0
              ? void 0
              : X.value)
          )
        }),
        [c] = hl('Table', _r.Table, Fe(e, 'locale')),
        v = O(() => e.dataSource || jd),
        S = O(() => y.getPrefixCls('dropdown', e.dropdownPrefixCls)),
        h = O(() => e.childrenColumnName || 'children'),
        $ = O(() =>
          v.value.some(X => (X == null ? void 0 : X[h.value]))
            ? 'nest'
            : e.expandedRowRender
            ? 'row'
            : null
        ),
        w = gt({ body: null }),
        k = X => {
          m(w, X)
        },
        P = O(() =>
          typeof e.rowKey == 'function'
            ? e.rowKey
            : X => (X == null ? void 0 : X[e.rowKey])
        ),
        [T] = sc(v, h, P),
        C = {},
        E = function(X, fe) {
          let J =
            arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1
          const { pagination: se, scroll: ue, onChange: Ie } = e,
            ce = m(m({}, C), X)
          J &&
            (C.resetPagination(),
            ce.pagination.current && (ce.pagination.current = 1),
            se && se.onChange && se.onChange(1, ce.pagination.pageSize)),
            ue &&
              ue.scrollToFirstRowOnChange !== !1 &&
              w.body &&
              za(0, { getContainer: () => w.body }),
            Ie == null ||
              Ie(ce.pagination, ce.filters, ce.sorter, {
                currentDataSource: fl(
                  Mn(v.value, ce.sorterStates, h.value),
                  ce.filterStates
                ),
                action: fe
              })
        },
        R = (X, fe) => {
          E({ sorter: X, sorterStates: fe }, 'sort', !1)
        },
        [A, F, U, ee] = mc({
          prefixCls: u,
          mergedColumns: i,
          onSorterChange: R,
          sortDirections: O(() => e.sortDirections || ['ascend', 'descend']),
          tableLocale: c,
          showSorterTooltip: Fe(e, 'showSorterTooltip')
        }),
        re = O(() => Mn(v.value, F.value, h.value)),
        ie = (X, fe) => {
          E({ filters: X, filterStates: fe }, 'filter', !0)
        },
        [V, Q, L] = ad({
          prefixCls: u,
          locale: c,
          dropdownPrefixCls: S,
          mergedColumns: i,
          onFilterChange: ie,
          getPopupContainer: Fe(e, 'getPopupContainer')
        }),
        Z = O(() => fl(re.value, Q.value)),
        [_] = cd(Fe(e, 'contextSlots')),
        H = O(() => {
          const X = {},
            fe = L.value
          return (
            Object.keys(fe).forEach(J => {
              fe[J] !== null && (X[J] = fe[J])
            }),
            m(m({}, U.value), { filters: X })
          )
        }),
        [M] = id(H),
        q = (X, fe) => {
          E(
            {
              pagination: m(m({}, C.pagination), { current: X, pageSize: fe })
            },
            'paginate'
          )
        },
        [G, Oe] = ic(
          O(() => Z.value.length),
          Fe(e, 'pagination'),
          q
        )
      Ne(() => {
        ;(C.sorter = ee.value),
          (C.sorterStates = F.value),
          (C.filters = L.value),
          (C.filterStates = Q.value),
          (C.pagination = e.pagination === !1 ? {} : ac(G.value, e.pagination)),
          (C.resetPagination = Oe)
      })
      const de = O(() => {
        if (e.pagination === !1 || !G.value.pageSize) return Z.value
        const { current: X = 1, total: fe, pageSize: J = Bn } = G.value
        return (
          Qe(X > 0, 'Table', '`current` should be positive number.'),
          Z.value.length < fe
            ? Z.value.length > J
              ? Z.value.slice((X - 1) * J, X * J)
              : Z.value
            : Z.value.slice((X - 1) * J, X * J)
        )
      })
      Ne(
        () => {
          dt(() => {
            const { total: X, pageSize: fe = Bn } = G.value
            Z.value.length < X &&
              Z.value.length > fe &&
              Qe(
                !1,
                'Table',
                '`dataSource` length is less than `pagination.total` but large than `pagination.pageSize`. Please make sure your config correct data with async mode.'
              )
          })
        },
        { flush: 'post' }
      )
      const Te = O(() =>
          e.showExpandColumn === !1
            ? -1
            : $.value === 'nest' && e.expandIconColumnIndex === void 0
            ? e.rowSelection
              ? 1
              : 0
            : e.expandIconColumnIndex > 0 && e.rowSelection
            ? e.expandIconColumnIndex - 1
            : e.expandIconColumnIndex
        ),
        Ke = ve()
      Ee(
        () => e.rowSelection,
        () => {
          Ke.value = e.rowSelection ? m({}, e.rowSelection) : e.rowSelection
        },
        { deep: !0, immediate: !0 }
      )
      const [Be, Ae] = dc(Ke, {
          prefixCls: u,
          data: Z,
          pageData: de,
          getRowKey: P,
          getRecordByKey: T,
          expandType: $,
          childrenColumnName: h,
          locale: c,
          getPopupContainer: O(() => e.getPopupContainer)
        }),
        He = (X, fe, J) => {
          let se
          const { rowClassName: ue } = e
          return (
            typeof ue == 'function' ? (se = ae(ue(X, fe, J))) : (se = ae(ue)),
            ae(
              { [`${u.value}-row-selected`]: Ae.value.has(P.value(X, fe)) },
              se
            )
          )
        }
      l({ selectedKeySet: Ae })
      const De = O(() => (typeof e.indentSize == 'number' ? e.indentSize : 15)),
        Re = X => M(Be(V(A(_(X)))))
      return () => {
        var X
        const {
          expandIcon: fe = o.expandIcon || sd(c.value),
          pagination: J,
          loading: se,
          bordered: ue
        } = e
        let Ie, ce
        if (J !== !1 && !((X = G.value) === null || X === void 0) && X.total) {
          let I
          G.value.size
            ? (I = G.value.size)
            : (I =
                s.value === 'small' || s.value === 'middle' ? 'small' : void 0)
          const D = we =>
              g(
                us,
                j(
                  j({}, G.value),
                  {},
                  {
                    class: [
                      `${u.value}-pagination ${u.value}-pagination-${we}`,
                      G.value.class
                    ],
                    size: I
                  }
                ),
                null
              ),
            te = d.value === 'rtl' ? 'left' : 'right',
            { position: he } = G.value
          if (he !== null && Array.isArray(he)) {
            const we = he.find(z => z.includes('top')),
              N = he.find(z => z.includes('bottom')),
              B = he.every(z => `${z}` == 'none')
            !we && !N && !B && (ce = D(te)),
              we && (Ie = D(we.toLowerCase().replace('top', ''))),
              N && (ce = D(N.toLowerCase().replace('bottom', '')))
          } else ce = D(te)
        }
        let be
        typeof se == 'boolean'
          ? (be = { spinning: se })
          : typeof se == 'object' && (be = m({ spinning: !0 }, se))
        const ke = ae(
            `${u.value}-wrapper`,
            { [`${u.value}-wrapper-rtl`]: d.value === 'rtl' },
            n.class,
            b.value
          ),
          K = Nt(e, ['columns'])
        return x(
          g('div', { class: ke, style: n.style }, [
            g(ba, j({ spinning: !1 }, be), {
              default: () => [
                Ie,
                g(
                  lc,
                  j(
                    j(j({}, n), K),
                    {},
                    {
                      expandedRowKeys: e.expandedRowKeys,
                      defaultExpandedRowKeys: e.defaultExpandedRowKeys,
                      expandIconColumnIndex: Te.value,
                      indentSize: De.value,
                      expandIcon: fe,
                      columns: i.value,
                      direction: d.value,
                      prefixCls: u.value,
                      class: ae({
                        [`${u.value}-middle`]: s.value === 'middle',
                        [`${u.value}-small`]: s.value === 'small',
                        [`${u.value}-bordered`]: ue,
                        [`${u.value}-empty`]: v.value.length === 0
                      }),
                      data: de.value,
                      rowKey: P.value,
                      rowClassName: He,
                      internalHooks: Nn,
                      internalRefs: w,
                      onUpdateInternalRefs: k,
                      transformColumns: Re,
                      transformCellText: p.value
                    }
                  ),
                  m(m({}, o), {
                    emptyText: () => {
                      var I, D
                      return (
                        ((I = o.emptyText) === null || I === void 0
                          ? void 0
                          : I.call(o)) ||
                        ((D = e.locale) === null || D === void 0
                          ? void 0
                          : D.emptyText) ||
                        f('Table')
                      )
                    }
                  })
                ),
                ce
              ]
            })
          ])
        )
      }
    }
  }),
  Hd = ge({
    name: 'ATable',
    inheritAttrs: !1,
    props: yt(hr(), { rowKey: 'key' }),
    slots: Object,
    setup(e, t) {
      let { attrs: n, slots: o, expose: l } = t
      const r = ve()
      return (
        l({ table: r }),
        () => {
          var a
          const i =
            e.columns ||
            rr((a = o.default) === null || a === void 0 ? void 0 : a.call(o))
          return g(
            Ld,
            j(
              j(j({ ref: r }, n), e),
              {},
              {
                columns: i || [],
                expandedRowRender: o.expandedRowRender || e.expandedRowRender,
                contextSlots: m({}, o)
              }
            ),
            o
          )
        }
      )
    }
  }),
  yn = Hd,
  bn = ge({
    name: 'ATableColumn',
    slots: Object,
    render() {
      return null
    }
  }),
  xn = ge({
    name: 'ATableColumnGroup',
    slots: Object,
    __ANT_TABLE_COLUMN_GROUP: !0,
    render() {
      return null
    }
  }),
  Hn = Xs,
  Wn = qs,
  Cn = m(Ys, { Cell: Wn, Row: Hn, name: 'ATableSummary' }),
  Qd = m(yn, {
    SELECTION_ALL: _n,
    SELECTION_INVERT: An,
    SELECTION_NONE: zn,
    SELECTION_COLUMN: it,
    EXPAND_COLUMN: vt,
    Column: bn,
    ColumnGroup: xn,
    Summary: Cn,
    install: e => (
      e.component(Cn.name, Cn),
      e.component(Wn.name, Wn),
      e.component(Hn.name, Hn),
      e.component(yn.name, yn),
      e.component(bn.name, bn),
      e.component(xn.name, xn),
      e
    )
  })
export { us as P, We as R, Qd as T, Ja as d, Io as t }

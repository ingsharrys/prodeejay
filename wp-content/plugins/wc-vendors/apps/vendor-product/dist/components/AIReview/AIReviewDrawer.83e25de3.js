import {
  q as ze,
  p as A,
  s as Ge,
  d as L,
  t as Se,
  j as Ie,
  y as rt,
  c as s,
  v as G,
  x as lt,
  F as Oe,
  n as pe,
  w as Q,
  l as Xe,
  D as Ne,
  A as Ee,
  I as je,
  o as k,
  g as B,
  V as m,
  M as T,
  X as F,
  u as p,
  a as V,
  Y as g,
  Z as N,
  _ as ne,
  $ as ae,
  W as Ue
} from '../../common/vendor.015340d9.js'
import {
  h as fe,
  m as Pe,
  _ as M,
  q as se,
  R as it,
  S as ct,
  U as de,
  c as J,
  a as E,
  V as we,
  W as Re,
  X as dt,
  Y as ut,
  r as pt,
  Z as ft,
  $ as gt,
  a0 as vt,
  P as w,
  a1 as mt,
  C as Ye,
  x as K,
  a2 as yt,
  a3 as ht,
  o as qe,
  e as _t,
  b as Ke,
  f as bt,
  a4 as wt,
  g as Me,
  s as Fe,
  a5 as $t,
  a6 as $e,
  T as Y,
  a7 as ee,
  a8 as St,
  N as W
} from '../../common/ProductsTable.f681faf0.js'
import { _ as Z } from '../../common/Dashboard.e7ef6e61.js'
import {
  O as Qe,
  W as Ct,
  Q as kt,
  A as xt,
  U as It,
  V as Ot,
  X as Ce,
  Y as Pt
} from '../../common/antd.0267aafb.js'
import '../../main.c1853b91.js'
const Rt = e => !isNaN(parseFloat(e)) && isFinite(e),
  Be = Rt,
  Je = Symbol('rowContextKey'),
  Tt = e => {
    Ge(Je, e)
  },
  At = () =>
    ze(Je, {
      gutter: A(() => {}),
      wrap: A(() => {}),
      supportFlexGap: A(() => {})
    }),
  Dt = e => {
    const { componentCls: o } = e
    return {
      [o]: {
        display: 'flex',
        flexFlow: 'row wrap',
        minWidth: 0,
        '&::before, &::after': { display: 'flex' },
        '&-no-wrap': { flexWrap: 'nowrap' },
        '&-start': { justifyContent: 'flex-start' },
        '&-center': { justifyContent: 'center' },
        '&-end': { justifyContent: 'flex-end' },
        '&-space-between': { justifyContent: 'space-between' },
        '&-space-around ': { justifyContent: 'space-around' },
        '&-space-evenly ': { justifyContent: 'space-evenly' },
        '&-top': { alignItems: 'flex-start' },
        '&-middle': { alignItems: 'center' },
        '&-bottom': { alignItems: 'flex-end' }
      }
    }
  },
  Nt = e => {
    const { componentCls: o } = e
    return { [o]: { position: 'relative', maxWidth: '100%', minHeight: 1 } }
  },
  Et = (e, o) => {
    const { componentCls: n, gridColumns: t } = e,
      a = {}
    for (let r = t; r >= 0; r--)
      r === 0
        ? ((a[`${n}${o}-${r}`] = { display: 'none' }),
          (a[`${n}-push-${r}`] = { insetInlineStart: 'auto' }),
          (a[`${n}-pull-${r}`] = { insetInlineEnd: 'auto' }),
          (a[`${n}${o}-push-${r}`] = { insetInlineStart: 'auto' }),
          (a[`${n}${o}-pull-${r}`] = { insetInlineEnd: 'auto' }),
          (a[`${n}${o}-offset-${r}`] = { marginInlineEnd: 0 }),
          (a[`${n}${o}-order-${r}`] = { order: 0 }))
        : ((a[`${n}${o}-${r}`] = {
            display: 'block',
            flex: `0 0 ${(r / t) * 100}%`,
            maxWidth: `${(r / t) * 100}%`
          }),
          (a[`${n}${o}-push-${r}`] = { insetInlineStart: `${(r / t) * 100}%` }),
          (a[`${n}${o}-pull-${r}`] = { insetInlineEnd: `${(r / t) * 100}%` }),
          (a[`${n}${o}-offset-${r}`] = {
            marginInlineStart: `${(r / t) * 100}%`
          }),
          (a[`${n}${o}-order-${r}`] = { order: r }))
    return a
  },
  ke = (e, o) => Et(e, o),
  jt = (e, o, n) => ({ [`@media (min-width: ${o}px)`]: M({}, ke(e, n)) }),
  Mt = fe('Grid', e => [Dt(e)]),
  Ft = fe('Grid', e => {
    const o = Pe(e, { gridColumns: 24 }),
      n = {
        '-sm': o.screenSMMin,
        '-md': o.screenMDMin,
        '-lg': o.screenLGMin,
        '-xl': o.screenXLMin,
        '-xxl': o.screenXXLMin
      }
    return [
      Nt(o),
      ke(o, ''),
      ke(o, '-xs'),
      Object.keys(n)
        .map(t => jt(o, n[t], t))
        .reduce((t, a) => M(M({}, t), a), {})
    ]
  }),
  Bt = () => ({
    align: we([String, Object]),
    justify: we([String, Object]),
    prefixCls: String,
    gutter: we([Number, Array, Object], 0),
    wrap: { type: Boolean, default: void 0 }
  }),
  Lt = L({
    compatConfig: { MODE: 3 },
    name: 'ARow',
    inheritAttrs: !1,
    props: Bt(),
    setup(e, o) {
      let { slots: n, attrs: t } = o
      const { prefixCls: a, direction: r } = se('row', e),
        [I, P] = Mt(a)
      let R
      const b = it(),
        y = Se({ xs: !0, sm: !0, md: !0, lg: !0, xl: !0, xxl: !0 }),
        S = Se({ xs: !1, sm: !1, md: !1, lg: !1, xl: !1, xxl: !1 }),
        D = i =>
          A(() => {
            if (typeof e[i] == 'string') return e[i]
            if (typeof e[i] != 'object') return ''
            for (let f = 0; f < de.length; f++) {
              const u = de[f]
              if (!S.value[u]) continue
              const v = e[i][u]
              if (v !== void 0) return v
            }
            return ''
          }),
        $ = D('align'),
        _ = D('justify'),
        C = ct()
      Ie(() => {
        R = b.value.subscribe(i => {
          S.value = i
          const f = e.gutter || 0
          ;((!Array.isArray(f) && typeof f == 'object') ||
            (Array.isArray(f) &&
              (typeof f[0] == 'object' || typeof f[1] == 'object'))) &&
            (y.value = i)
        })
      }),
        rt(() => {
          b.value.unsubscribe(R)
        })
      const O = A(() => {
        const i = [void 0, void 0],
          { gutter: f = 0 } = e
        return (
          (Array.isArray(f) ? f : [f, void 0]).forEach((v, j) => {
            if (typeof v == 'object')
              for (let H = 0; H < de.length; H++) {
                const X = de[H]
                if (y.value[X] && v[X] !== void 0) {
                  i[j] = v[X]
                  break
                }
              }
            else i[j] = v
          }),
          i
        )
      })
      Tt({ gutter: O, supportFlexGap: C, wrap: A(() => e.wrap) })
      const c = A(() =>
          J(
            a.value,
            {
              [`${a.value}-no-wrap`]: e.wrap === !1,
              [`${a.value}-${_.value}`]: _.value,
              [`${a.value}-${$.value}`]: $.value,
              [`${a.value}-rtl`]: r.value === 'rtl'
            },
            t.class,
            P.value
          )
        ),
        d = A(() => {
          const i = O.value,
            f = {},
            u = i[0] != null && i[0] > 0 ? `${i[0] / -2}px` : void 0,
            v = i[1] != null && i[1] > 0 ? `${i[1] / -2}px` : void 0
          return (
            u && ((f.marginLeft = u), (f.marginRight = u)),
            C.value
              ? (f.rowGap = `${i[1]}px`)
              : v && ((f.marginTop = v), (f.marginBottom = v)),
            f
          )
        })
      return () => {
        var i
        return I(
          s(
            'div',
            E(
              E({}, t),
              {},
              { class: c.value, style: M(M({}, d.value), t.style) }
            ),
            [(i = n.default) === null || i === void 0 ? void 0 : i.call(n)]
          )
        )
      }
    }
  }),
  Wt = Lt
function Vt(e) {
  return typeof e == 'number'
    ? `${e} ${e} auto`
    : /^\d+(\.\d+)?(px|em|rem|%)$/.test(e)
    ? `0 0 ${e}`
    : e
}
const Ht = () => ({
    span: [String, Number],
    order: [String, Number],
    offset: [String, Number],
    push: [String, Number],
    pull: [String, Number],
    xs: { type: [String, Number, Object], default: void 0 },
    sm: { type: [String, Number, Object], default: void 0 },
    md: { type: [String, Number, Object], default: void 0 },
    lg: { type: [String, Number, Object], default: void 0 },
    xl: { type: [String, Number, Object], default: void 0 },
    xxl: { type: [String, Number, Object], default: void 0 },
    prefixCls: String,
    flex: [String, Number]
  }),
  zt = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
  Gt = L({
    compatConfig: { MODE: 3 },
    name: 'ACol',
    inheritAttrs: !1,
    props: Ht(),
    setup(e, o) {
      let { slots: n, attrs: t } = o
      const { gutter: a, supportFlexGap: r, wrap: I } = At(),
        { prefixCls: P, direction: R } = se('col', e),
        [b, y] = Ft(P),
        S = A(() => {
          const { span: $, order: _, offset: C, push: O, pull: c } = e,
            d = P.value
          let i = {}
          return (
            zt.forEach(f => {
              let u = {}
              const v = e[f]
              typeof v == 'number'
                ? (u.span = v)
                : typeof v == 'object' && (u = v || {}),
                (i = M(M({}, i), {
                  [`${d}-${f}-${u.span}`]: u.span !== void 0,
                  [`${d}-${f}-order-${u.order}`]: u.order || u.order === 0,
                  [`${d}-${f}-offset-${u.offset}`]: u.offset || u.offset === 0,
                  [`${d}-${f}-push-${u.push}`]: u.push || u.push === 0,
                  [`${d}-${f}-pull-${u.pull}`]: u.pull || u.pull === 0,
                  [`${d}-rtl`]: R.value === 'rtl'
                }))
            }),
            J(
              d,
              {
                [`${d}-${$}`]: $ !== void 0,
                [`${d}-order-${_}`]: _,
                [`${d}-offset-${C}`]: C,
                [`${d}-push-${O}`]: O,
                [`${d}-pull-${c}`]: c
              },
              i,
              t.class,
              y.value
            )
          )
        }),
        D = A(() => {
          const { flex: $ } = e,
            _ = a.value,
            C = {}
          if (_ && _[0] > 0) {
            const O = `${_[0] / 2}px`
            ;(C.paddingLeft = O), (C.paddingRight = O)
          }
          if (_ && _[1] > 0 && !r.value) {
            const O = `${_[1] / 2}px`
            ;(C.paddingTop = O), (C.paddingBottom = O)
          }
          return (
            $ &&
              ((C.flex = Vt($)),
              I.value === !1 && !C.minWidth && (C.minWidth = 0)),
            C
          )
        })
      return () => {
        var $
        return b(
          s(
            'div',
            E(E({}, t), {}, { class: S.value, style: [D.value, t.style] }),
            [($ = n.default) === null || $ === void 0 ? void 0 : $.call(n)]
          )
        )
      }
    }
  }),
  Le = Re(Gt),
  ue = (e, o, n) => {
    const t = dt(n)
    return {
      [`${e.componentCls}-${o}`]: {
        color: e[`color${n}`],
        background: e[`color${t}Bg`],
        borderColor: e[`color${t}Border`],
        [`&${e.componentCls}-borderless`]: { borderColor: 'transparent' }
      }
    }
  },
  Xt = e =>
    ut(e, (o, n) => {
      let { textColor: t, lightBorderColor: a, lightColor: r, darkColor: I } = n
      return {
        [`${e.componentCls}-${o}`]: {
          color: t,
          background: r,
          borderColor: a,
          '&-inverse': {
            color: e.colorTextLightSolid,
            background: I,
            borderColor: I
          },
          [`&${e.componentCls}-borderless`]: { borderColor: 'transparent' }
        }
      }
    }),
  Ut = e => {
    const {
        paddingXXS: o,
        lineWidth: n,
        tagPaddingHorizontal: t,
        componentCls: a
      } = e,
      r = t - n,
      I = o - n
    return {
      [a]: M(M({}, pt(e)), {
        display: 'inline-block',
        height: 'auto',
        marginInlineEnd: e.marginXS,
        paddingInline: r,
        fontSize: e.tagFontSize,
        lineHeight: `${e.tagLineHeight}px`,
        whiteSpace: 'nowrap',
        background: e.tagDefaultBg,
        border: `${e.lineWidth}px ${e.lineType} ${e.colorBorder}`,
        borderRadius: e.borderRadiusSM,
        opacity: 1,
        transition: `all ${e.motionDurationMid}`,
        textAlign: 'start',
        [`&${a}-rtl`]: { direction: 'rtl' },
        '&, a, a:hover': { color: e.tagDefaultColor },
        [`${a}-close-icon`]: {
          marginInlineStart: I,
          color: e.colorTextDescription,
          fontSize: e.tagIconSize,
          cursor: 'pointer',
          transition: `all ${e.motionDurationMid}`,
          '&:hover': { color: e.colorTextHeading }
        },
        [`&${a}-has-color`]: {
          borderColor: 'transparent',
          [`&, a, a:hover, ${e.iconCls}-close, ${e.iconCls}-close:hover`]: {
            color: e.colorTextLightSolid
          }
        },
        '&-checkable': {
          backgroundColor: 'transparent',
          borderColor: 'transparent',
          cursor: 'pointer',
          [`&:not(${a}-checkable-checked):hover`]: {
            color: e.colorPrimary,
            backgroundColor: e.colorFillSecondary
          },
          '&:active, &-checked': { color: e.colorTextLightSolid },
          '&-checked': {
            backgroundColor: e.colorPrimary,
            '&:hover': { backgroundColor: e.colorPrimaryHover }
          },
          '&:active': { backgroundColor: e.colorPrimaryActive }
        },
        '&-hidden': { display: 'none' },
        [`> ${e.iconCls} + span, > span + ${e.iconCls}`]: {
          marginInlineStart: r
        }
      }),
      [`${a}-borderless`]: {
        borderColor: 'transparent',
        background: e.tagBorderlessBg
      }
    }
  },
  Ze = fe('Tag', e => {
    const { fontSize: o, lineHeight: n, lineWidth: t, fontSizeIcon: a } = e,
      r = Math.round(o * n),
      I = e.fontSizeSM,
      P = r - t * 2,
      R = e.colorFillAlter,
      b = e.colorText,
      y = Pe(e, {
        tagFontSize: I,
        tagLineHeight: P,
        tagDefaultBg: R,
        tagDefaultColor: b,
        tagIconSize: a - 2 * t,
        tagPaddingHorizontal: 8,
        tagBorderlessBg: e.colorFillTertiary
      })
    return [
      Ut(y),
      Xt(y),
      ue(y, 'success', 'Success'),
      ue(y, 'processing', 'Info'),
      ue(y, 'error', 'Error'),
      ue(y, 'warning', 'Warning')
    ]
  }),
  Yt = () => ({
    prefixCls: String,
    checked: { type: Boolean, default: void 0 },
    onChange: { type: Function },
    onClick: { type: Function },
    'onUpdate:checked': Function
  }),
  qt = L({
    compatConfig: { MODE: 3 },
    name: 'ACheckableTag',
    inheritAttrs: !1,
    props: Yt(),
    setup(e, o) {
      let { slots: n, emit: t, attrs: a } = o
      const { prefixCls: r } = se('tag', e),
        [I, P] = Ze(r),
        R = y => {
          const { checked: S } = e
          t('update:checked', !S), t('change', !S), t('click', y)
        },
        b = A(() =>
          J(r.value, P.value, {
            [`${r.value}-checkable`]: !0,
            [`${r.value}-checkable-checked`]: e.checked
          })
        )
      return () => {
        var y
        return I(
          s(
            'span',
            E(E({}, a), {}, { class: [b.value, a.class], onClick: R }),
            [(y = n.default) === null || y === void 0 ? void 0 : y.call(n)]
          )
        )
      }
    }
  }),
  xe = qt,
  Kt = () => ({
    prefixCls: String,
    color: { type: String },
    closable: { type: Boolean, default: !1 },
    closeIcon: w.any,
    visible: { type: Boolean, default: void 0 },
    onClose: { type: Function },
    onClick: mt(),
    'onUpdate:visible': Function,
    icon: w.any,
    bordered: { type: Boolean, default: !0 }
  }),
  oe = L({
    compatConfig: { MODE: 3 },
    name: 'ATag',
    inheritAttrs: !1,
    props: Kt(),
    slots: Object,
    setup(e, o) {
      let { slots: n, emit: t, attrs: a } = o
      const { prefixCls: r, direction: I } = se('tag', e),
        [P, R] = Ze(r),
        b = G(!0)
      lt(() => {
        e.visible !== void 0 && (b.value = e.visible)
      })
      const y = _ => {
          _.stopPropagation(),
            t('update:visible', !1),
            t('close', _),
            !_.defaultPrevented && e.visible === void 0 && (b.value = !1)
        },
        S = A(() => ft(e.color) || gt(e.color)),
        D = A(() =>
          J(r.value, R.value, {
            [`${r.value}-${e.color}`]: S.value,
            [`${r.value}-has-color`]: e.color && !S.value,
            [`${r.value}-hidden`]: !b.value,
            [`${r.value}-rtl`]: I.value === 'rtl',
            [`${r.value}-borderless`]: !e.bordered
          })
        ),
        $ = _ => {
          t('click', _)
        }
      return () => {
        var _, C, O
        const {
            icon: c = (_ = n.icon) === null || _ === void 0
              ? void 0
              : _.call(n),
            color: d,
            closeIcon: i = (C = n.closeIcon) === null || C === void 0
              ? void 0
              : C.call(n),
            closable: f = !1
          } = e,
          u = () =>
            f
              ? i
                ? s('span', { class: `${r.value}-close-icon`, onClick: y }, [i])
                : s(Ye, { class: `${r.value}-close-icon`, onClick: y }, null)
              : null,
          v = { backgroundColor: d && !S.value ? d : void 0 },
          j = c || null,
          H = (O = n.default) === null || O === void 0 ? void 0 : O.call(n),
          X = j ? s(Oe, null, [j, s('span', null, [H])]) : H,
          le = e.onClick !== void 0,
          te = s(
            'span',
            E(
              E({}, a),
              {},
              { onClick: $, class: [D.value, a.class], style: [v, a.style] }
            ),
            [X, u()]
          )
        return P(le ? s(vt, null, { default: () => [te] }) : te)
      }
    }
  })
oe.CheckableTag = xe
oe.install = function(e) {
  return e.component(oe.name, oe), e.component(xe.name, xe), e
}
const U = oe,
  et = () => ({
    prefixCls: String,
    width: w.oneOfType([w.string, w.number]),
    height: w.oneOfType([w.string, w.number]),
    style: { type: Object, default: void 0 },
    class: String,
    rootClassName: String,
    rootStyle: K(),
    placement: { type: String },
    wrapperClassName: String,
    level: { type: [String, Array] },
    levelMove: { type: [Number, Function, Array] },
    duration: String,
    ease: String,
    showMask: { type: Boolean, default: void 0 },
    maskClosable: { type: Boolean, default: void 0 },
    maskStyle: { type: Object, default: void 0 },
    afterVisibleChange: Function,
    keyboard: { type: Boolean, default: void 0 },
    contentWrapperStyle: yt(),
    autofocus: { type: Boolean, default: void 0 },
    open: { type: Boolean, default: void 0 },
    motion: ht(),
    maskMotion: K()
  }),
  Qt = () =>
    M(M({}, et()), {
      forceRender: { type: Boolean, default: void 0 },
      getContainer: w.oneOfType([w.string, w.func, w.object, w.looseBool])
    }),
  Jt = () =>
    M(M({}, et()), {
      getContainer: Function,
      getOpenCount: Function,
      scrollLocker: w.any,
      inline: Boolean
    })
function Zt(e) {
  return Array.isArray(e) ? e : [e]
}
const eo = {
  transition: 'transitionend',
  WebkitTransition: 'webkitTransitionEnd',
  MozTransition: 'transitionend',
  OTransition: 'oTransitionEnd otransitionend'
}
Object.keys(eo).filter(e => {
  if (typeof document > 'u') return !1
  const o = document.getElementsByTagName('html')[0]
  return e in (o ? o.style : {})
})[0]
const to = !(
  typeof window < 'u' &&
  window.document &&
  window.document.createElement
)
var oo =
  (globalThis && globalThis.__rest) ||
  function(e, o) {
    var n = {}
    for (var t in e)
      Object.prototype.hasOwnProperty.call(e, t) &&
        o.indexOf(t) < 0 &&
        (n[t] = e[t])
    if (e != null && typeof Object.getOwnPropertySymbols == 'function')
      for (var a = 0, t = Object.getOwnPropertySymbols(e); a < t.length; a++)
        o.indexOf(t[a]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(e, t[a]) &&
          (n[t[a]] = e[t[a]])
    return n
  }
const no = L({
    compatConfig: { MODE: 3 },
    inheritAttrs: !1,
    props: Jt(),
    emits: ['close', 'handleClick', 'change'],
    setup(e, o) {
      let { emit: n, slots: t } = o
      const a = G(),
        r = G(),
        I = G(),
        P = G(),
        R = G()
      let b = []
      ;`${Number(
        (Date.now() + Math.random())
          .toString()
          .replace('.', Math.round(Math.random() * 9).toString())
      ).toString(16)}`,
        Ie(() => {
          pe(() => {
            var c
            const { open: d, getContainer: i, showMask: f, autofocus: u } = e,
              v = i == null ? void 0 : i()
            _(e),
              d &&
                (v && (v.parentNode, document.body),
                pe(() => {
                  u && y()
                }),
                f &&
                  ((c = e.scrollLocker) === null || c === void 0 || c.lock()))
          })
        }),
        Q(
          () => e.level,
          () => {
            _(e)
          },
          { flush: 'post' }
        ),
        Q(
          () => e.open,
          () => {
            const {
                open: c,
                getContainer: d,
                scrollLocker: i,
                showMask: f,
                autofocus: u
              } = e,
              v = d == null ? void 0 : d()
            v && (v.parentNode, document.body),
              c
                ? (u && y(), f && (i == null || i.lock()))
                : i == null || i.unLock()
          },
          { flush: 'post' }
        ),
        Xe(() => {
          var c
          const { open: d } = e
          d && (document.body.style.touchAction = ''),
            (c = e.scrollLocker) === null || c === void 0 || c.unLock()
        }),
        Q(
          () => e.placement,
          c => {
            c && (R.value = null)
          }
        )
      const y = () => {
          var c, d
          ;(d = (c = r.value) === null || c === void 0 ? void 0 : c.focus) ===
            null ||
            d === void 0 ||
            d.call(c)
        },
        S = c => {
          n('close', c)
        },
        D = c => {
          c.keyCode === _t.ESC && (c.stopPropagation(), S(c))
        },
        $ = () => {
          const { open: c, afterVisibleChange: d } = e
          d && d(!!c)
        },
        _ = c => {
          let { level: d, getContainer: i } = c
          if (to) return
          const f = i == null ? void 0 : i(),
            u = f ? f.parentNode : null
          ;(b = []),
            d === 'all'
              ? (u ? Array.prototype.slice.call(u.children) : []).forEach(j => {
                  j.nodeName !== 'SCRIPT' &&
                    j.nodeName !== 'STYLE' &&
                    j.nodeName !== 'LINK' &&
                    j !== f &&
                    b.push(j)
                })
              : d &&
                Zt(d).forEach(v => {
                  document.querySelectorAll(v).forEach(j => {
                    b.push(j)
                  })
                })
        },
        C = c => {
          n('handleClick', c)
        },
        O = G(!1)
      return (
        Q(r, () => {
          pe(() => {
            O.value = !0
          })
        }),
        () => {
          var c, d
          const {
              width: i,
              height: f,
              open: u,
              prefixCls: v,
              placement: j,
              level: H,
              levelMove: X,
              ease: le,
              duration: te,
              getContainer: Te,
              onChange: Ae,
              afterVisibleChange: De,
              showMask: ie,
              maskClosable: ve,
              maskStyle: me,
              keyboard: ye,
              getOpenCount: l,
              scrollLocker: h,
              contentWrapperStyle: x,
              style: z,
              class: q,
              rootClassName: he,
              rootStyle: _e,
              maskMotion: tt,
              motion: be,
              inline: ot
            } = e,
            nt = oo(e, [
              'width',
              'height',
              'open',
              'prefixCls',
              'placement',
              'level',
              'levelMove',
              'ease',
              'duration',
              'getContainer',
              'onChange',
              'afterVisibleChange',
              'showMask',
              'maskClosable',
              'maskStyle',
              'keyboard',
              'getOpenCount',
              'scrollLocker',
              'contentWrapperStyle',
              'style',
              'class',
              'rootClassName',
              'rootStyle',
              'maskMotion',
              'motion',
              'inline'
            ]),
            ce = u && O.value,
            at = J(v, {
              [`${v}-${j}`]: !0,
              [`${v}-open`]: ce,
              [`${v}-inline`]: ot,
              'no-mask': !ie,
              [he]: !0
            }),
            st = typeof be == 'function' ? be(j) : be
          return s(
            'div',
            E(
              E({}, qe(nt, ['autofocus'])),
              {},
              {
                tabindex: -1,
                class: at,
                style: _e,
                ref: r,
                onKeydown: ce && ye ? D : void 0
              }
            ),
            [
              s(Ne, tt, {
                default: () => [
                  ie &&
                    Ee(
                      s(
                        'div',
                        {
                          class: `${v}-mask`,
                          onClick: ve ? S : void 0,
                          style: me,
                          ref: I
                        },
                        null
                      ),
                      [[je, ce]]
                    )
                ]
              }),
              s(Ne, E(E({}, st), {}, { onAfterEnter: $, onAfterLeave: $ }), {
                default: () => [
                  Ee(
                    s(
                      'div',
                      { class: `${v}-content-wrapper`, style: [x], ref: a },
                      [
                        s(
                          'div',
                          { class: [`${v}-content`, q], style: z, ref: R },
                          [
                            (c = t.default) === null || c === void 0
                              ? void 0
                              : c.call(t)
                          ]
                        ),
                        t.handler
                          ? s('div', { onClick: C, ref: P }, [
                              (d = t.handler) === null || d === void 0
                                ? void 0
                                : d.call(t)
                            ])
                          : null
                      ]
                    ),
                    [[je, ce]]
                  )
                ]
              })
            ]
          )
        }
      )
    }
  }),
  We = no
var Ve =
  (globalThis && globalThis.__rest) ||
  function(e, o) {
    var n = {}
    for (var t in e)
      Object.prototype.hasOwnProperty.call(e, t) &&
        o.indexOf(t) < 0 &&
        (n[t] = e[t])
    if (e != null && typeof Object.getOwnPropertySymbols == 'function')
      for (var a = 0, t = Object.getOwnPropertySymbols(e); a < t.length; a++)
        o.indexOf(t[a]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(e, t[a]) &&
          (n[t[a]] = e[t[a]])
    return n
  }
const ao = L({
    compatConfig: { MODE: 3 },
    inheritAttrs: !1,
    props: Ke(Qt(), {
      prefixCls: 'drawer',
      placement: 'left',
      getContainer: 'body',
      level: 'all',
      duration: '.3s',
      ease: 'cubic-bezier(0.78, 0.14, 0.15, 0.86)',
      afterVisibleChange: () => {},
      showMask: !0,
      maskClosable: !0,
      maskStyle: {},
      wrapperClassName: '',
      keyboard: !0,
      forceRender: !1,
      autofocus: !0
    }),
    emits: ['handleClick', 'close'],
    setup(e, o) {
      let { emit: n, slots: t } = o
      const a = Se(null),
        r = P => {
          n('handleClick', P)
        },
        I = P => {
          n('close', P)
        }
      return () => {
        const {
            getContainer: P,
            wrapperClassName: R,
            rootClassName: b,
            rootStyle: y,
            forceRender: S
          } = e,
          D = Ve(e, [
            'getContainer',
            'wrapperClassName',
            'rootClassName',
            'rootStyle',
            'forceRender'
          ])
        let $ = null
        if (!P)
          return s(
            We,
            E(
              E({}, D),
              {},
              {
                rootClassName: b,
                rootStyle: y,
                open: e.open,
                onClose: I,
                onHandleClick: r,
                inline: !0
              }
            ),
            t
          )
        const _ = !!t.handler || S
        return (
          (_ || e.open || a.value) &&
            ($ = s(
              bt,
              {
                autoLock: !0,
                visible: e.open,
                forceRender: _,
                getContainer: P,
                wrapperClassName: R
              },
              {
                default: C => {
                  var { visible: O, afterClose: c } = C,
                    d = Ve(C, ['visible', 'afterClose'])
                  return s(
                    We,
                    E(
                      E(E({ ref: a }, D), d),
                      {},
                      {
                        rootClassName: b,
                        rootStyle: y,
                        open: O !== void 0 ? O : e.open,
                        afterVisibleChange:
                          c !== void 0 ? c : e.afterVisibleChange,
                        onClose: I,
                        onHandleClick: r
                      }
                    ),
                    t
                  )
                }
              }
            )),
          $
        )
      }
    }
  }),
  so = ao,
  ro = e => {
    const { componentCls: o, motionDurationSlow: n } = e,
      t = {
        '&-enter, &-appear, &-leave': {
          '&-start': { transition: 'none' },
          '&-active': { transition: `all ${n}` }
        }
      }
    return {
      [o]: {
        [`${o}-mask-motion`]: {
          '&-enter, &-appear, &-leave': {
            '&-active': { transition: `all ${n}` }
          },
          '&-enter, &-appear': { opacity: 0, '&-active': { opacity: 1 } },
          '&-leave': { opacity: 1, '&-active': { opacity: 0 } }
        },
        [`${o}-panel-motion`]: {
          '&-left': [
            t,
            {
              '&-enter, &-appear': {
                '&-start': { transform: 'translateX(-100%) !important' },
                '&-active': { transform: 'translateX(0)' }
              },
              '&-leave': {
                transform: 'translateX(0)',
                '&-active': { transform: 'translateX(-100%)' }
              }
            }
          ],
          '&-right': [
            t,
            {
              '&-enter, &-appear': {
                '&-start': { transform: 'translateX(100%) !important' },
                '&-active': { transform: 'translateX(0)' }
              },
              '&-leave': {
                transform: 'translateX(0)',
                '&-active': { transform: 'translateX(100%)' }
              }
            }
          ],
          '&-top': [
            t,
            {
              '&-enter, &-appear': {
                '&-start': { transform: 'translateY(-100%) !important' },
                '&-active': { transform: 'translateY(0)' }
              },
              '&-leave': {
                transform: 'translateY(0)',
                '&-active': { transform: 'translateY(-100%)' }
              }
            }
          ],
          '&-bottom': [
            t,
            {
              '&-enter, &-appear': {
                '&-start': { transform: 'translateY(100%) !important' },
                '&-active': { transform: 'translateY(0)' }
              },
              '&-leave': {
                transform: 'translateY(0)',
                '&-active': { transform: 'translateY(100%)' }
              }
            }
          ]
        }
      }
    }
  },
  lo = ro,
  io = e => {
    const {
        componentCls: o,
        zIndexPopup: n,
        colorBgMask: t,
        colorBgElevated: a,
        motionDurationSlow: r,
        motionDurationMid: I,
        padding: P,
        paddingLG: R,
        fontSizeLG: b,
        lineHeightLG: y,
        lineWidth: S,
        lineType: D,
        colorSplit: $,
        marginSM: _,
        colorIcon: C,
        colorIconHover: O,
        colorText: c,
        fontWeightStrong: d,
        drawerFooterPaddingVertical: i,
        drawerFooterPaddingHorizontal: f
      } = e,
      u = `${o}-content-wrapper`
    return {
      [o]: {
        position: 'fixed',
        inset: 0,
        zIndex: n,
        pointerEvents: 'none',
        '&-pure': {
          position: 'relative',
          background: a,
          [`&${o}-left`]: { boxShadow: e.boxShadowDrawerLeft },
          [`&${o}-right`]: { boxShadow: e.boxShadowDrawerRight },
          [`&${o}-top`]: { boxShadow: e.boxShadowDrawerUp },
          [`&${o}-bottom`]: { boxShadow: e.boxShadowDrawerDown }
        },
        '&-inline': { position: 'absolute' },
        [`${o}-mask`]: {
          position: 'absolute',
          inset: 0,
          zIndex: n,
          background: t,
          pointerEvents: 'auto'
        },
        [u]: {
          position: 'absolute',
          zIndex: n,
          transition: `all ${r}`,
          '&-hidden': { display: 'none' }
        },
        [`&-left > ${u}`]: {
          top: 0,
          bottom: 0,
          left: { _skip_check_: !0, value: 0 },
          boxShadow: e.boxShadowDrawerLeft
        },
        [`&-right > ${u}`]: {
          top: 0,
          right: { _skip_check_: !0, value: 0 },
          bottom: 0,
          boxShadow: e.boxShadowDrawerRight
        },
        [`&-top > ${u}`]: {
          top: 0,
          insetInline: 0,
          boxShadow: e.boxShadowDrawerUp
        },
        [`&-bottom > ${u}`]: {
          bottom: 0,
          insetInline: 0,
          boxShadow: e.boxShadowDrawerDown
        },
        [`${o}-content`]: {
          width: '100%',
          height: '100%',
          overflow: 'auto',
          background: a,
          pointerEvents: 'auto'
        },
        [`${o}-wrapper-body`]: {
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%'
        },
        [`${o}-header`]: {
          display: 'flex',
          flex: 0,
          alignItems: 'center',
          padding: `${P}px ${R}px`,
          fontSize: b,
          lineHeight: y,
          borderBottom: `${S}px ${D} ${$}`,
          '&-title': {
            display: 'flex',
            flex: 1,
            alignItems: 'center',
            minWidth: 0,
            minHeight: 0
          }
        },
        [`${o}-extra`]: { flex: 'none' },
        [`${o}-close`]: {
          display: 'inline-block',
          marginInlineEnd: _,
          color: C,
          fontWeight: d,
          fontSize: b,
          fontStyle: 'normal',
          lineHeight: 1,
          textAlign: 'center',
          textTransform: 'none',
          textDecoration: 'none',
          background: 'transparent',
          border: 0,
          outline: 0,
          cursor: 'pointer',
          transition: `color ${I}`,
          textRendering: 'auto',
          '&:focus, &:hover': { color: O, textDecoration: 'none' }
        },
        [`${o}-title`]: {
          flex: 1,
          margin: 0,
          color: c,
          fontWeight: e.fontWeightStrong,
          fontSize: b,
          lineHeight: y
        },
        [`${o}-body`]: {
          flex: 1,
          minWidth: 0,
          minHeight: 0,
          padding: R,
          overflow: 'auto'
        },
        [`${o}-footer`]: {
          flexShrink: 0,
          padding: `${i}px ${f}px`,
          borderTop: `${S}px ${D} ${$}`
        },
        '&-rtl': { direction: 'rtl' }
      }
    }
  },
  co = fe(
    'Drawer',
    e => {
      const o = Pe(e, {
        drawerFooterPaddingVertical: e.paddingXS,
        drawerFooterPaddingHorizontal: e.padding
      })
      return [io(o), lo(o)]
    },
    e => ({ zIndexPopup: e.zIndexPopupBase })
  )
var uo =
  (globalThis && globalThis.__rest) ||
  function(e, o) {
    var n = {}
    for (var t in e)
      Object.prototype.hasOwnProperty.call(e, t) &&
        o.indexOf(t) < 0 &&
        (n[t] = e[t])
    if (e != null && typeof Object.getOwnPropertySymbols == 'function')
      for (var a = 0, t = Object.getOwnPropertySymbols(e); a < t.length; a++)
        o.indexOf(t[a]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(e, t[a]) &&
          (n[t[a]] = e[t[a]])
    return n
  }
const po = ['top', 'right', 'bottom', 'left'],
  He = { distance: 180 },
  fo = () => ({
    autofocus: { type: Boolean, default: void 0 },
    closable: { type: Boolean, default: void 0 },
    closeIcon: w.any,
    destroyOnClose: { type: Boolean, default: void 0 },
    forceRender: { type: Boolean, default: void 0 },
    getContainer: {
      type: [String, Function, Boolean, Object],
      default: void 0
    },
    maskClosable: { type: Boolean, default: void 0 },
    mask: { type: Boolean, default: void 0 },
    maskStyle: K(),
    rootClassName: String,
    rootStyle: K(),
    size: { type: String },
    drawerStyle: K(),
    headerStyle: K(),
    bodyStyle: K(),
    contentWrapperStyle: { type: Object, default: void 0 },
    title: w.any,
    visible: { type: Boolean, default: void 0 },
    open: { type: Boolean, default: void 0 },
    width: w.oneOfType([w.string, w.number]),
    height: w.oneOfType([w.string, w.number]),
    zIndex: Number,
    prefixCls: String,
    push: w.oneOfType([w.looseBool, { type: Object }]),
    placement: w.oneOf(po),
    keyboard: { type: Boolean, default: void 0 },
    extra: w.any,
    footer: w.any,
    footerStyle: K(),
    level: w.any,
    levelMove: { type: [Number, Array, Function] },
    handle: w.any,
    afterVisibleChange: Function,
    onAfterVisibleChange: Function,
    onAfterOpenChange: Function,
    'onUpdate:visible': Function,
    'onUpdate:open': Function,
    onClose: Function
  }),
  go = L({
    compatConfig: { MODE: 3 },
    name: 'ADrawer',
    inheritAttrs: !1,
    props: Ke(fo(), {
      closable: !0,
      placement: 'right',
      maskClosable: !0,
      mask: !0,
      level: null,
      keyboard: !0,
      push: He
    }),
    slots: Object,
    setup(e, o) {
      let { emit: n, slots: t, attrs: a } = o
      const r = G(!1),
        I = G(!1),
        P = G(null),
        R = G(!1),
        b = G(!1),
        y = A(() => {
          var l
          return (l = e.open) !== null && l !== void 0 ? l : e.visible
        })
      Q(
        y,
        () => {
          y.value ? (R.value = !0) : (b.value = !1)
        },
        { immediate: !0 }
      ),
        Q(
          [y, R],
          () => {
            y.value && R.value && (b.value = !0)
          },
          { immediate: !0 }
        )
      const S = ze('parentDrawerOpts', null),
        { prefixCls: D, getPopupContainer: $, direction: _ } = se('drawer', e),
        [C, O] = co(D),
        c = A(() =>
          e.getContainer === void 0 && $ != null && $.value
            ? () => $.value(document.body)
            : e.getContainer
        )
      wt(
        !e.afterVisibleChange,
        'Drawer',
        '`afterVisibleChange` prop is deprecated, please use `@afterVisibleChange` event instead'
      ),
        Ge('parentDrawerOpts', {
          setPush: () => {
            r.value = !0
          },
          setPull: () => {
            ;(r.value = !1),
              pe(() => {
                f()
              })
          }
        }),
        Ie(() => {
          y.value && S && S.setPush()
        }),
        Xe(() => {
          S && S.setPull()
        }),
        Q(
          b,
          () => {
            S && (b.value ? S.setPush() : S.setPull())
          },
          { flush: 'post' }
        )
      const f = () => {
          var l, h
          ;(h =
            (l = P.value) === null || l === void 0 ? void 0 : l.domFocus) ===
            null ||
            h === void 0 ||
            h.call(l)
        },
        u = l => {
          n('update:visible', !1), n('update:open', !1), n('close', l)
        },
        v = l => {
          var h
          l ||
            (I.value === !1 && (I.value = !0),
            e.destroyOnClose && (R.value = !1)),
            (h = e.afterVisibleChange) === null || h === void 0 || h.call(e, l),
            n('afterVisibleChange', l),
            n('afterOpenChange', l)
        },
        j = A(() => {
          const { push: l, placement: h } = e
          let x
          return (
            typeof l == 'boolean'
              ? (x = l ? He.distance : 0)
              : (x = l.distance),
            (x = parseFloat(String(x || 0))),
            h === 'left' || h === 'right'
              ? `translateX(${h === 'left' ? x : -x}px)`
              : h === 'top' || h === 'bottom'
              ? `translateY(${h === 'top' ? x : -x}px)`
              : null
          )
        }),
        H = A(() => {
          var l
          return (l = e.width) !== null && l !== void 0
            ? l
            : e.size === 'large'
            ? 736
            : 378
        }),
        X = A(() => {
          var l
          return (l = e.height) !== null && l !== void 0
            ? l
            : e.size === 'large'
            ? 736
            : 378
        }),
        le = A(() => {
          const { mask: l, placement: h } = e
          if (!b.value && !l) return {}
          const x = {}
          return (
            h === 'left' || h === 'right'
              ? (x.width = Be(H.value) ? `${H.value}px` : H.value)
              : (x.height = Be(X.value) ? `${X.value}px` : X.value),
            x
          )
        }),
        te = A(() => {
          const { zIndex: l, contentWrapperStyle: h } = e,
            x = le.value
          return [
            { zIndex: l, transform: r.value ? j.value : void 0 },
            M({}, h),
            x
          ]
        }),
        Te = l => {
          const { closable: h, headerStyle: x } = e,
            z = $e(t, e, 'extra'),
            q = $e(t, e, 'title')
          return !q && !h
            ? null
            : s(
                'div',
                {
                  class: J(`${l}-header`, {
                    [`${l}-header-close-only`]: h && !q && !z
                  }),
                  style: x
                },
                [
                  s('div', { class: `${l}-header-title` }, [
                    Ae(l),
                    q && s('div', { class: `${l}-title` }, [q])
                  ]),
                  z && s('div', { class: `${l}-extra` }, [z])
                ]
              )
        },
        Ae = l => {
          var h
          const { closable: x } = e,
            z = t.closeIcon
              ? (h = t.closeIcon) === null || h === void 0
                ? void 0
                : h.call(t)
              : e.closeIcon
          return (
            x &&
            s(
              'button',
              {
                key: 'closer',
                onClick: u,
                'aria-label': 'Close',
                class: `${l}-close`
              },
              [z === void 0 ? s(Ye, null, null) : z]
            )
          )
        },
        De = l => {
          var h
          if (I.value && !e.forceRender && !R.value) return null
          const { bodyStyle: x, drawerStyle: z } = e
          return s('div', { class: `${l}-wrapper-body`, style: z }, [
            Te(l),
            s('div', { key: 'body', class: `${l}-body`, style: x }, [
              (h = t.default) === null || h === void 0 ? void 0 : h.call(t)
            ]),
            ie(l)
          ])
        },
        ie = l => {
          const h = $e(t, e, 'footer')
          if (!h) return null
          const x = `${l}-footer`
          return s('div', { class: x, style: e.footerStyle }, [h])
        },
        ve = A(() =>
          J(
            { 'no-mask': !e.mask, [`${D.value}-rtl`]: _.value === 'rtl' },
            e.rootClassName,
            O.value
          )
        ),
        me = A(() => Me(Fe(D.value, 'mask-motion'))),
        ye = l => Me(Fe(D.value, `panel-motion-${l}`))
      return () => {
        const {
            width: l,
            height: h,
            placement: x,
            mask: z,
            forceRender: q
          } = e,
          he = uo(e, ['width', 'height', 'placement', 'mask', 'forceRender']),
          _e = M(
            M(
              M({}, a),
              qe(he, [
                'size',
                'closeIcon',
                'closable',
                'destroyOnClose',
                'drawerStyle',
                'headerStyle',
                'bodyStyle',
                'title',
                'push',
                'onAfterVisibleChange',
                'onClose',
                'onUpdate:visible',
                'onUpdate:open',
                'visible'
              ])
            ),
            {
              forceRender: q,
              onClose: u,
              afterVisibleChange: v,
              handler: !1,
              prefixCls: D.value,
              open: b.value,
              showMask: z,
              placement: x,
              ref: P
            }
          )
        return C(
          s($t, null, {
            default: () => [
              s(
                so,
                E(
                  E({}, _e),
                  {},
                  {
                    maskMotion: me.value,
                    motion: ye,
                    width: H.value,
                    height: X.value,
                    getContainer: c.value,
                    rootClassName: ve.value,
                    rootStyle: e.rootStyle,
                    contentWrapperStyle: te.value
                  }
                ),
                {
                  handler: e.handle ? () => e.handle : t.handle,
                  default: () => De(D.value)
                }
              )
            ]
          })
        )
      }
    }
  }),
  vo = Re(go),
  mo = Re(Wt),
  yo = { class: 'ai-review-header' },
  ho = L({
    __name: 'AIReviewHeader',
    props: { productName: {} },
    setup(e) {
      return (o, n) => (
        k(),
        B('div', yo, [
          s(
            p(Y).Title,
            { level: 4, class: 'product-name' },
            { default: m(() => [T(F(o.productName), 1)]), _: 1 }
          )
        ])
      )
    }
  })
const _o = Z(ho, [['__scopeId', 'data-v-07e91b30']]),
  bo = e => (ne('data-v-289a532e'), (e = e()), ae(), e),
  wo = { class: 'card-label' },
  $o = { class: 'card-value' },
  So = { class: 'card-label' },
  Co = bo(() =>
    g(
      'div',
      { style: { 'max-width': '300px', 'line-height': '1.6' } },
      [
        g('div', { style: { 'margin-bottom': '8px' } }, [
          g('strong', null, 'Low Score (0-20):'),
          T(
            ' Low risk products that typically require minimal review. This covers the majority of "good" vendors.'
          )
        ]),
        g('div', { style: { 'margin-bottom': '8px' } }, [
          g('strong', null, 'Medium Score (21-50):'),
          T(
            ' Moderate risk products that may need revision. The AI provides feedback for these listings.'
          )
        ]),
        g('div', null, [
          g('strong', null, 'High Score (51-100):'),
          T(
            ' High risk products requiring manual intervention. These listings need careful review by your staff. Typically only 5-10% of total volume, keeping your team efficient.'
          )
        ])
      ],
      -1
    )
  ),
  ko = { class: 'card-value' },
  xo = L({
    __name: 'StatusRiskRow',
    props: { review: {} },
    setup(e) {
      const o = n =>
        ({
          APPROVED: W('statusApproved') || 'Approved',
          REVISION_REQUIRED: W('statusRevisionRequired') || 'Revision Required',
          FLAGGED: W('statusFlagged') || 'Flagged',
          REJECTED: W('statusRejected') || 'Rejected',
          PASS: W('statusPass') || 'Pass',
          FAIL: W('statusFail') || 'Fail'
        }[n] || n)
      return (n, t) =>
        n.review.status ||
        (n.review.risk_score !== void 0 && n.review.risk_score > 0)
          ? (k(),
            V(
              p(mo),
              { key: 0, gutter: 16, class: 'status-risk-row' },
              {
                default: m(() => [
                  n.review.status
                    ? (k(),
                      V(
                        p(Le),
                        { key: 0, span: 12 },
                        {
                          default: m(() => [
                            s(
                              p(ee),
                              { class: 'status-card', bordered: !1 },
                              {
                                default: m(() => [
                                  g('div', wo, [
                                    s(p(Qe), { class: 'card-icon' }),
                                    s(
                                      p(Y).Text,
                                      { strong: '' },
                                      { default: m(() => [T('Status')]), _: 1 }
                                    )
                                  ]),
                                  g('div', $o, [
                                    s(
                                      p(U),
                                      {
                                        color:
                                          n.review.status ===
                                          'REVISION_REQUIRED'
                                            ? 'warning'
                                            : n.review.status === 'APPROVED' ||
                                              n.review.status === 'PASS'
                                            ? 'success'
                                            : n.review.status === 'REJECTED' ||
                                              n.review.status === 'FAIL'
                                            ? 'error'
                                            : 'default',
                                        class: 'status-tag'
                                      },
                                      {
                                        default: m(() => [
                                          T(F(o(n.review.status)), 1)
                                        ]),
                                        _: 1
                                      },
                                      8,
                                      ['color']
                                    )
                                  ])
                                ]),
                                _: 1
                              }
                            )
                          ]),
                          _: 1
                        }
                      ))
                    : N('', !0),
                  n.review.risk_score !== void 0 && n.review.risk_score > 0
                    ? (k(),
                      V(
                        p(Le),
                        { key: 1, span: 12 },
                        {
                          default: m(() => [
                            s(
                              p(ee),
                              { class: 'risk-score-card', bordered: !1 },
                              {
                                default: m(() => [
                                  g('div', So, [
                                    s(p(Ct), { class: 'card-icon' }),
                                    s(
                                      p(Y).Text,
                                      { strong: '' },
                                      {
                                        default: m(() => [T('Risk Score')]),
                                        _: 1
                                      }
                                    ),
                                    s(
                                      p(St),
                                      { placement: 'top' },
                                      {
                                        title: m(() => [Co]),
                                        default: m(() => [
                                          g('span', null, [
                                            s(p(kt), {
                                              class: 'risk-score-info-icon'
                                            })
                                          ])
                                        ]),
                                        _: 1
                                      }
                                    )
                                  ]),
                                  g('div', ko, [
                                    s(
                                      p(U),
                                      {
                                        color:
                                          n.review.risk_score >= 51
                                            ? 'error'
                                            : n.review.risk_score >= 21
                                            ? 'warning'
                                            : 'success',
                                        class: 'risk-tag'
                                      },
                                      {
                                        default: m(() => [
                                          T(F(n.review.risk_score), 1)
                                        ]),
                                        _: 1
                                      },
                                      8,
                                      ['color']
                                    )
                                  ])
                                ]),
                                _: 1
                              }
                            )
                          ]),
                          _: 1
                        }
                      ))
                    : N('', !0)
                ]),
                _: 1
              }
            ))
          : N('', !0)
    }
  })
const Io = Z(xo, [['__scopeId', 'data-v-289a532e']]),
  ge = e => (ne('data-v-989610c5'), (e = e()), ae(), e),
  Oo = { class: 'card-title' },
  Po = ge(() => g('span', null, 'Audit Results', -1)),
  Ro = { class: 'audit-results-list' },
  To = { key: 0, class: 'audit-result-item' },
  Ao = { class: 'audit-result-label' },
  Do = ge(() => g('span', null, 'Content Safety', -1)),
  No = { key: 1, class: 'audit-result-item' },
  Eo = { class: 'audit-result-label' },
  jo = ge(() => g('span', null, 'Pricing Integrity', -1)),
  Mo = { key: 2, class: 'audit-result-item' },
  Fo = { class: 'audit-result-label' },
  Bo = ge(() => g('span', null, 'Visual Consistency', -1)),
  Lo = L({
    __name: 'AuditResultsCard',
    props: { auditResults: {} },
    setup(e) {
      return (o, n) =>
        o.auditResults && Object.keys(o.auditResults).length > 0
          ? (k(),
            V(
              p(ee),
              { key: 0, class: 'audit-results-card', bordered: !1 },
              {
                title: m(() => [
                  g('div', Oo, [s(p(xt), { class: 'title-icon' }), Po])
                ]),
                default: m(() => [
                  g('div', Ro, [
                    o.auditResults.content_safety
                      ? (k(),
                        B('div', To, [
                          g('div', Ao, [s(p(It), { class: 'audit-icon' }), Do]),
                          s(
                            p(U),
                            {
                              color:
                                o.auditResults.content_safety === 'Pass'
                                  ? 'success'
                                  : o.auditResults.content_safety === 'Warning'
                                  ? 'warning'
                                  : 'error',
                              class: 'audit-tag'
                            },
                            {
                              default: m(() => [
                                T(F(o.auditResults.content_safety), 1)
                              ]),
                              _: 1
                            },
                            8,
                            ['color']
                          )
                        ]))
                      : N('', !0),
                    o.auditResults.pricing_integrity
                      ? (k(),
                        B('div', No, [
                          g('div', Eo, [s(p(Ot), { class: 'audit-icon' }), jo]),
                          s(
                            p(U),
                            {
                              color:
                                o.auditResults.pricing_integrity === 'Pass'
                                  ? 'success'
                                  : o.auditResults.pricing_integrity ===
                                    'Warning'
                                  ? 'warning'
                                  : 'error',
                              class: 'audit-tag'
                            },
                            {
                              default: m(() => [
                                T(F(o.auditResults.pricing_integrity), 1)
                              ]),
                              _: 1
                            },
                            8,
                            ['color']
                          )
                        ]))
                      : N('', !0),
                    o.auditResults.visual_consistency
                      ? (k(),
                        B('div', Mo, [
                          g('div', Fo, [s(p(Ce), { class: 'audit-icon' }), Bo]),
                          s(
                            p(U),
                            {
                              color:
                                o.auditResults.visual_consistency === 'Pass'
                                  ? 'success'
                                  : o.auditResults.visual_consistency ===
                                    'Warning'
                                  ? 'warning'
                                  : 'error',
                              class: 'audit-tag'
                            },
                            {
                              default: m(() => [
                                T(F(o.auditResults.visual_consistency), 1)
                              ]),
                              _: 1
                            },
                            8,
                            ['color']
                          )
                        ]))
                      : N('', !0)
                  ])
                ]),
                _: 1
              }
            ))
          : N('', !0)
    }
  })
const Wo = Z(Lo, [['__scopeId', 'data-v-989610c5']]),
  Vo = e => (ne('data-v-4b3e45c1'), (e = e()), ae(), e),
  Ho = { class: 'card-title' },
  zo = Vo(() => g('span', null, 'Admin Note', -1)),
  Go = { class: 'admin-note-content' },
  Xo = L({
    __name: 'AdminNoteCard',
    props: { adminLogic: {} },
    setup(e) {
      return (o, n) =>
        o.adminLogic
          ? (k(),
            V(
              p(ee),
              { key: 0, class: 'admin-note-card', bordered: !1 },
              {
                title: m(() => [
                  g('div', Ho, [s(p(Qe), { class: 'title-icon' }), zo])
                ]),
                default: m(() => [
                  g('div', Go, [
                    s(p(Y).Text, null, {
                      default: m(() => [T(F(o.adminLogic), 1)]),
                      _: 1
                    })
                  ])
                ]),
                _: 1
              }
            ))
          : N('', !0)
    }
  })
const Uo = Z(Xo, [['__scopeId', 'data-v-4b3e45c1']]),
  Yo = e => (ne('data-v-e44a6dc6'), (e = e()), ae(), e),
  qo = { class: 'card-title' },
  Ko = Yo(() => g('span', null, 'Suggestions', -1)),
  Qo = { class: 'suggestions-list' },
  Jo = { class: 'suggestion-header' },
  Zo = L({
    __name: 'SuggestionsCard',
    props: { suggestions: {} },
    setup(e) {
      return (o, n) =>
        o.suggestions && o.suggestions.length > 0
          ? (k(),
            V(
              p(ee),
              { key: 0, class: 'suggestions-card', bordered: !1 },
              {
                title: m(() => [
                  g('div', qo, [s(p(Pt), { class: 'title-icon' }), Ko])
                ]),
                default: m(() => [
                  g('div', Qo, [
                    (k(!0),
                    B(
                      Oe,
                      null,
                      Ue(
                        o.suggestions,
                        (t, a) => (
                          k(),
                          B('div', { key: a, class: 'suggestion-item' }, [
                            g('div', Jo, [
                              s(
                                p(Y).Text,
                                { strong: '', class: 'suggestion-field' },
                                { default: m(() => [T(F(t.field), 1)]), _: 2 },
                                1024
                              )
                            ]),
                            s(
                              p(Y).Text,
                              { class: 'suggestion-text' },
                              {
                                default: m(() => [T(F(t.suggestion), 1)]),
                                _: 2
                              },
                              1024
                            )
                          ])
                        )
                      ),
                      128
                    ))
                  ])
                ]),
                _: 1
              }
            ))
          : N('', !0)
    }
  })
const en = Z(Zo, [['__scopeId', 'data-v-e44a6dc6']]),
  re = e => (ne('data-v-768418f8'), (e = e()), ae(), e),
  tn = { class: 'card-title' },
  on = re(() => g('span', null, 'Image Reviews', -1)),
  nn = { class: 'image-reviews-list' },
  an = { class: 'image-review-content' },
  sn = { class: 'image-review-image-wrapper' },
  rn = ['src', 'alt'],
  ln = { key: 1, class: 'image-review-placeholder' },
  cn = { class: 'image-review-details' },
  dn = { key: 0, class: 'image-review-status-row' },
  un = { key: 1, class: 'image-review-analysis' },
  pn = { class: 'analysis-row' },
  fn = re(() => g('span', { class: 'analysis-label' }, 'Appropriateness:', -1)),
  gn = { class: 'analysis-row' },
  vn = re(() => g('span', { class: 'analysis-label' }, 'Quality:', -1)),
  mn = { class: 'analysis-row' },
  yn = re(() => g('span', { class: 'analysis-label' }, 'Compliance:', -1)),
  hn = { class: 'analysis-row' },
  _n = re(() => g('span', { class: 'analysis-label' }, 'Product Match:', -1)),
  bn = { key: 2, class: 'image-review-summary' },
  wn = L({
    __name: 'ImageReviewsCard',
    props: { imageReviews: {} },
    setup(e) {
      const o = n =>
        ({
          APPROVED: W('statusApproved') || 'Approved',
          REVISION_REQUIRED: W('statusRevisionRequired') || 'Revision Required',
          FLAGGED: W('statusFlagged') || 'Flagged',
          REJECTED: W('statusRejected') || 'Rejected',
          PASS: W('statusPass') || 'Pass',
          FAIL: W('statusFail') || 'Fail'
        }[n] || n)
      return (n, t) =>
        n.imageReviews && n.imageReviews.length > 0
          ? (k(),
            V(
              p(ee),
              { key: 0, class: 'image-reviews-card', bordered: !1 },
              {
                title: m(() => [
                  g('div', tn, [s(p(Ce), { class: 'title-icon' }), on])
                ]),
                default: m(() => [
                  g('div', nn, [
                    (k(!0),
                    B(
                      Oe,
                      null,
                      Ue(
                        n.imageReviews,
                        (a, r) => (
                          k(),
                          B('div', { key: r, class: 'image-review-item' }, [
                            g('div', an, [
                              g('div', sn, [
                                a.image_url
                                  ? (k(),
                                    B(
                                      'img',
                                      {
                                        key: 0,
                                        src: a.image_url,
                                        alt: `Product image ${a.image_id}`,
                                        class: 'image-review-image'
                                      },
                                      null,
                                      8,
                                      rn
                                    ))
                                  : (k(),
                                    B('div', ln, [
                                      s(p(Ce), { class: 'placeholder-icon' }),
                                      s(
                                        p(Y).Text,
                                        { type: 'secondary' },
                                        {
                                          default: m(() => [
                                            T('Image not available')
                                          ]),
                                          _: 1
                                        }
                                      )
                                    ]))
                              ]),
                              g('div', cn, [
                                a.completion
                                  ? (k(),
                                    B('div', dn, [
                                      s(
                                        p(U),
                                        {
                                          color:
                                            a.completion.status ===
                                              'REJECTED' ||
                                            a.completion.status === 'FAIL'
                                              ? 'error'
                                              : a.completion.status ===
                                                  'APPROVED' ||
                                                a.completion.status === 'PASS'
                                              ? 'success'
                                              : 'warning',
                                          class: 'image-status-tag'
                                        },
                                        {
                                          default: m(() => [
                                            T(F(o(a.completion.status)), 1)
                                          ]),
                                          _: 2
                                        },
                                        1032,
                                        ['color']
                                      ),
                                      a.completion.risk_score > 0
                                        ? (k(),
                                          V(
                                            p(U),
                                            {
                                              key: 0,
                                              color:
                                                a.completion.risk_score >= 51
                                                  ? 'error'
                                                  : a.completion.risk_score >=
                                                    21
                                                  ? 'warning'
                                                  : 'success',
                                              class: 'image-risk-tag'
                                            },
                                            {
                                              default: m(() => [
                                                T(
                                                  ' Risk: ' +
                                                    F(a.completion.risk_score),
                                                  1
                                                )
                                              ]),
                                              _: 2
                                            },
                                            1032,
                                            ['color']
                                          ))
                                        : N('', !0)
                                    ]))
                                  : N('', !0),
                                a.completion && a.completion.analysis
                                  ? (k(),
                                    B('div', un, [
                                      g('div', pn, [
                                        fn,
                                        s(
                                          p(U),
                                          {
                                            color:
                                              a.completion.analysis
                                                .appropriateness === 'Pass'
                                                ? 'success'
                                                : 'error',
                                            class: 'analysis-tag'
                                          },
                                          {
                                            default: m(() => [
                                              T(
                                                F(
                                                  a.completion.analysis
                                                    .appropriateness
                                                ),
                                                1
                                              )
                                            ]),
                                            _: 2
                                          },
                                          1032,
                                          ['color']
                                        )
                                      ]),
                                      g('div', gn, [
                                        vn,
                                        s(
                                          p(U),
                                          {
                                            color:
                                              a.completion.analysis.quality ===
                                              'Pass'
                                                ? 'success'
                                                : 'error',
                                            class: 'analysis-tag'
                                          },
                                          {
                                            default: m(() => [
                                              T(
                                                F(
                                                  a.completion.analysis.quality
                                                ),
                                                1
                                              )
                                            ]),
                                            _: 2
                                          },
                                          1032,
                                          ['color']
                                        )
                                      ]),
                                      g('div', mn, [
                                        yn,
                                        s(
                                          p(U),
                                          {
                                            color:
                                              a.completion.analysis
                                                .compliance === 'Pass'
                                                ? 'success'
                                                : 'error',
                                            class: 'analysis-tag'
                                          },
                                          {
                                            default: m(() => [
                                              T(
                                                F(
                                                  a.completion.analysis
                                                    .compliance
                                                ),
                                                1
                                              )
                                            ]),
                                            _: 2
                                          },
                                          1032,
                                          ['color']
                                        )
                                      ]),
                                      g('div', hn, [
                                        _n,
                                        s(
                                          p(U),
                                          {
                                            color:
                                              a.completion.analysis
                                                .product_match === 'Pass'
                                                ? 'success'
                                                : 'error',
                                            class: 'analysis-tag'
                                          },
                                          {
                                            default: m(() => [
                                              T(
                                                F(
                                                  a.completion.analysis
                                                    .product_match
                                                ),
                                                1
                                              )
                                            ]),
                                            _: 2
                                          },
                                          1032,
                                          ['color']
                                        )
                                      ])
                                    ]))
                                  : N('', !0),
                                a.completion && a.completion.review_summary
                                  ? (k(),
                                    B('div', bn, [
                                      s(
                                        p(Y).Text,
                                        { class: 'summary-label' },
                                        {
                                          default: m(() => [
                                            T('Review Summary:')
                                          ]),
                                          _: 1
                                        }
                                      ),
                                      s(
                                        p(Y).Text,
                                        { class: 'summary-text' },
                                        {
                                          default: m(() => [
                                            T(F(a.completion.review_summary), 1)
                                          ]),
                                          _: 2
                                        },
                                        1024
                                      )
                                    ]))
                                  : N('', !0)
                              ])
                            ])
                          ])
                        )
                      ),
                      128
                    ))
                  ])
                ]),
                _: 1
              }
            ))
          : N('', !0)
    }
  })
const $n = Z(wn, [['__scopeId', 'data-v-768418f8']]),
  Sn = { key: 0, class: 'ai-review-content' },
  Cn = L({
    __name: 'AIReviewDrawer',
    props: { open: { type: Boolean }, review: {}, productName: {} },
    emits: ['update:open'],
    setup(e, { emit: o }) {
      const n = t => {
        o('update:open', t)
      }
      return (t, a) => (
        k(),
        V(
          p(vo),
          {
            open: t.open,
            title: p(W)('aiReview') || 'AI Review',
            width: '680',
            placement: 'right',
            contentWrapperStyle: { top: '32px' },
            class: 'ai-review-drawer',
            'onUpdate:open': n
          },
          {
            default: m(() => [
              t.review
                ? (k(),
                  B('div', Sn, [
                    s(_o, { 'product-name': t.productName }, null, 8, [
                      'product-name'
                    ]),
                    s(Io, { review: t.review }, null, 8, ['review']),
                    t.review.audit_results
                      ? (k(),
                        V(
                          Wo,
                          { key: 0, 'audit-results': t.review.audit_results },
                          null,
                          8,
                          ['audit-results']
                        ))
                      : N('', !0),
                    t.review.admin_logic
                      ? (k(),
                        V(
                          Uo,
                          { key: 1, 'admin-logic': t.review.admin_logic },
                          null,
                          8,
                          ['admin-logic']
                        ))
                      : N('', !0),
                    t.review.suggestions
                      ? (k(),
                        V(
                          en,
                          { key: 2, suggestions: t.review.suggestions },
                          null,
                          8,
                          ['suggestions']
                        ))
                      : N('', !0),
                    t.review.image_reviews
                      ? (k(),
                        V(
                          $n,
                          { key: 3, 'image-reviews': t.review.image_reviews },
                          null,
                          8,
                          ['image-reviews']
                        ))
                      : N('', !0)
                  ]))
                : N('', !0)
            ]),
            _: 1
          },
          8,
          ['open', 'title']
        )
      )
    }
  })
const Rn = Z(Cn, [['__scopeId', 'data-v-91736ef8']])
export { Rn as default }

import {
  g as L,
  m as O,
  ae as R,
  _ as P,
  r as j,
  a as z,
  e as F,
  b,
  P as B,
  Z as X,
  C as U
} from '../main.491ba5c0.js'
import {
  d as H,
  e as m,
  c as d,
  s as J,
  k as V,
  F as Z
} from './vendor.84fc1123.js'
import { J as q, N as G, O as K, W as Q } from './VendorStore.d737faa9.js'
const v = (e, t, l) => {
    const a = R(l)
    return {
      [`${e.componentCls}-${t}`]: {
        color: e[`color${l}`],
        background: e[`color${a}Bg`],
        borderColor: e[`color${a}Border`],
        [`&${e.componentCls}-borderless`]: { borderColor: 'transparent' }
      }
    }
  },
  Y = e =>
    q(e, (t, l) => {
      let { textColor: a, lightBorderColor: r, lightColor: o, darkColor: c } = l
      return {
        [`${e.componentCls}-${t}`]: {
          color: a,
          background: o,
          borderColor: r,
          '&-inverse': {
            color: e.colorTextLightSolid,
            background: c,
            borderColor: c
          },
          [`&${e.componentCls}-borderless`]: { borderColor: 'transparent' }
        }
      }
    }),
  ee = e => {
    const {
        paddingXXS: t,
        lineWidth: l,
        tagPaddingHorizontal: a,
        componentCls: r
      } = e,
      o = a - l,
      c = t - l
    return {
      [r]: P(P({}, j(e)), {
        display: 'inline-block',
        height: 'auto',
        marginInlineEnd: e.marginXS,
        paddingInline: o,
        fontSize: e.tagFontSize,
        lineHeight: `${e.tagLineHeight}px`,
        whiteSpace: 'nowrap',
        background: e.tagDefaultBg,
        border: `${e.lineWidth}px ${e.lineType} ${e.colorBorder}`,
        borderRadius: e.borderRadiusSM,
        opacity: 1,
        transition: `all ${e.motionDurationMid}`,
        textAlign: 'start',
        [`&${r}-rtl`]: { direction: 'rtl' },
        '&, a, a:hover': { color: e.tagDefaultColor },
        [`${r}-close-icon`]: {
          marginInlineStart: c,
          color: e.colorTextDescription,
          fontSize: e.tagIconSize,
          cursor: 'pointer',
          transition: `all ${e.motionDurationMid}`,
          '&:hover': { color: e.colorTextHeading }
        },
        [`&${r}-has-color`]: {
          borderColor: 'transparent',
          [`&, a, a:hover, ${e.iconCls}-close, ${e.iconCls}-close:hover`]: {
            color: e.colorTextLightSolid
          }
        },
        '&-checkable': {
          backgroundColor: 'transparent',
          borderColor: 'transparent',
          cursor: 'pointer',
          [`&:not(${r}-checkable-checked):hover`]: {
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
          marginInlineStart: o
        }
      }),
      [`${r}-borderless`]: {
        borderColor: 'transparent',
        background: e.tagBorderlessBg
      }
    }
  },
  D = L('Tag', e => {
    const { fontSize: t, lineHeight: l, lineWidth: a, fontSizeIcon: r } = e,
      o = Math.round(t * l),
      c = e.fontSizeSM,
      g = o - a * 2,
      C = e.colorFillAlter,
      i = e.colorText,
      n = O(e, {
        tagFontSize: c,
        tagLineHeight: g,
        tagDefaultBg: C,
        tagDefaultColor: i,
        tagIconSize: r - 2 * a,
        tagPaddingHorizontal: 8,
        tagBorderlessBg: e.colorFillTertiary
      })
    return [
      ee(n),
      Y(n),
      v(n, 'success', 'Success'),
      v(n, 'processing', 'Info'),
      v(n, 'error', 'Error'),
      v(n, 'warning', 'Warning')
    ]
  }),
  oe = () => ({
    prefixCls: String,
    checked: { type: Boolean, default: void 0 },
    onChange: { type: Function },
    onClick: { type: Function },
    'onUpdate:checked': Function
  }),
  le = H({
    compatConfig: { MODE: 3 },
    name: 'ACheckableTag',
    inheritAttrs: !1,
    props: oe(),
    setup(e, t) {
      let { slots: l, emit: a, attrs: r } = t
      const { prefixCls: o } = z('tag', e),
        [c, g] = D(o),
        C = n => {
          const { checked: u } = e
          a('update:checked', !u), a('change', !u), a('click', n)
        },
        i = m(() =>
          F(o.value, g.value, {
            [`${o.value}-checkable`]: !0,
            [`${o.value}-checkable-checked`]: e.checked
          })
        )
      return () => {
        var n
        return c(
          d(
            'span',
            b(b({}, r), {}, { class: [i.value, r.class], onClick: C }),
            [(n = l.default) === null || n === void 0 ? void 0 : n.call(l)]
          )
        )
      }
    }
  }),
  S = le,
  ae = () => ({
    prefixCls: String,
    color: { type: String },
    closable: { type: Boolean, default: !1 },
    closeIcon: B.any,
    visible: { type: Boolean, default: void 0 },
    onClose: { type: Function },
    onClick: X(),
    'onUpdate:visible': Function,
    icon: B.any,
    bordered: { type: Boolean, default: !0 }
  }),
  h = H({
    compatConfig: { MODE: 3 },
    name: 'ATag',
    inheritAttrs: !1,
    props: ae(),
    slots: Object,
    setup(e, t) {
      let { slots: l, emit: a, attrs: r } = t
      const { prefixCls: o, direction: c } = z('tag', e),
        [g, C] = D(o),
        i = J(!0)
      V(() => {
        e.visible !== void 0 && (i.value = e.visible)
      })
      const n = s => {
          s.stopPropagation(),
            a('update:visible', !1),
            a('close', s),
            !s.defaultPrevented && e.visible === void 0 && (i.value = !1)
        },
        u = m(() => G(e.color) || K(e.color)),
        k = m(() =>
          F(o.value, C.value, {
            [`${o.value}-${e.color}`]: u.value,
            [`${o.value}-has-color`]: e.color && !u.value,
            [`${o.value}-hidden`]: !i.value,
            [`${o.value}-rtl`]: c.value === 'rtl',
            [`${o.value}-borderless`]: !e.bordered
          })
        ),
        M = s => {
          a('click', s)
        }
      return () => {
        var s, f, p
        const {
            icon: w = (s = l.icon) === null || s === void 0
              ? void 0
              : s.call(l),
            color: $,
            closeIcon: y = (f = l.closeIcon) === null || f === void 0
              ? void 0
              : f.call(l),
            closable: A = !1
          } = e,
          N = () =>
            A
              ? y
                ? d('span', { class: `${o.value}-close-icon`, onClick: n }, [y])
                : d(U, { class: `${o.value}-close-icon`, onClick: n }, null)
              : null,
          W = { backgroundColor: $ && !u.value ? $ : void 0 },
          T = w || null,
          I = (p = l.default) === null || p === void 0 ? void 0 : p.call(l),
          _ = T ? d(Z, null, [T, d('span', null, [I])]) : I,
          E = e.onClick !== void 0,
          x = d(
            'span',
            b(
              b({}, r),
              {},
              { onClick: M, class: [k.value, r.class], style: [W, r.style] }
            ),
            [_, N()]
          )
        return g(E ? d(Q, null, { default: () => [x] }) : x)
      }
    }
  })
h.CheckableTag = S
h.install = function(e) {
  return e.component(h.name, h), e.component(S.name, S), e
}
const ce = h
export { ce as T }

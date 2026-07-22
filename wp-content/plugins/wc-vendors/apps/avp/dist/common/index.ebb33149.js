import {
  g as L,
  m as re,
  _ as c,
  r as ie,
  w as M,
  v as F,
  a as K,
  e as V,
  b,
  W as q,
  a6 as y,
  D as E,
  aa as se,
  ab as ce,
  s as pe,
  o as R,
  ac as de
} from '../main.491ba5c0.js'
import {
  d as X,
  r as G,
  e as N,
  c as d,
  F as ue,
  a4 as ve
} from './vendor.84fc1123.js'
import {
  p as me,
  q as ge,
  P as fe,
  t as U,
  o as Z,
  n as Ce,
  r as J,
  j as xe,
  v as ye,
  x as H,
  B as Pe,
  K as be
} from './VendorStore.d737faa9.js'
import { i as Q } from './initDefaultProps.71991ecc.js'
import { A as he } from './ActionButton.265b9cc4.js'
const $e = e => {
    const {
      componentCls: o,
      popoverBg: t,
      popoverColor: n,
      width: l,
      fontWeightStrong: g,
      popoverPadding: i,
      boxShadowSecondary: p,
      colorTextHeading: f,
      borderRadiusLG: v,
      zIndexPopup: C,
      marginXS: x,
      colorBgElevated: s
    } = e
    return [
      {
        [o]: c(c({}, ie(e)), {
          position: 'absolute',
          top: 0,
          left: { _skip_check_: !0, value: 0 },
          zIndex: C,
          fontWeight: 'normal',
          whiteSpace: 'normal',
          textAlign: 'start',
          cursor: 'auto',
          userSelect: 'text',
          '--antd-arrow-background-color': s,
          '&-rtl': { direction: 'rtl' },
          '&-hidden': { display: 'none' },
          [`${o}-content`]: { position: 'relative' },
          [`${o}-inner`]: {
            backgroundColor: t,
            backgroundClip: 'padding-box',
            borderRadius: v,
            boxShadow: p,
            padding: i
          },
          [`${o}-title`]: {
            minWidth: l,
            marginBottom: x,
            color: f,
            fontWeight: g
          },
          [`${o}-inner-content`]: { color: n }
        })
      },
      ge(e, { colorBg: 'var(--antd-arrow-background-color)' }),
      {
        [`${o}-pure`]: {
          position: 'relative',
          maxWidth: 'none',
          [`${o}-content`]: { display: 'inline-block' }
        }
      }
    ]
  },
  Se = e => {
    const { componentCls: o } = e
    return {
      [o]: fe.map(t => {
        const n = e[`${t}-6`]
        return {
          [`&${o}-${t}`]: {
            '--antd-arrow-background-color': n,
            [`${o}-inner`]: { backgroundColor: n },
            [`${o}-arrow`]: { background: 'transparent' }
          }
        }
      })
    }
  },
  Te = e => {
    const {
        componentCls: o,
        lineWidth: t,
        lineType: n,
        colorSplit: l,
        paddingSM: g,
        controlHeight: i,
        fontSize: p,
        lineHeight: f,
        padding: v
      } = e,
      C = i - Math.round(p * f),
      x = C / 2,
      s = C / 2 - t,
      m = v
    return {
      [o]: {
        [`${o}-inner`]: { padding: 0 },
        [`${o}-title`]: {
          margin: 0,
          padding: `${x}px ${m}px ${s}px`,
          borderBottom: `${t}px ${n} ${l}`
        },
        [`${o}-inner-content`]: { padding: `${g}px ${m}px` }
      }
    }
  },
  ke = L(
    'Popover',
    e => {
      const { colorBgElevated: o, colorText: t, wireframe: n } = e,
        l = re(e, { popoverBg: o, popoverColor: t, popoverPadding: 12 })
      return [$e(l), Se(l), n && Te(l), me(l, 'zoom-big')]
    },
    e => {
      let { zIndexPopupBase: o } = e
      return { zIndexPopup: o + 30, width: 177 }
    }
  ),
  Be = () => c(c({}, J()), { content: y(), title: y() }),
  we = X({
    compatConfig: { MODE: 3 },
    name: 'APopover',
    inheritAttrs: !1,
    props: Q(
      Be(),
      c(c({}, U()), {
        trigger: 'hover',
        placement: 'top',
        mouseEnterDelay: 0.1,
        mouseLeaveDelay: 0.1
      })
    ),
    setup(e, o) {
      let { expose: t, slots: n, attrs: l } = o
      const g = G()
      F(e.visible === void 0),
        t({
          getPopupDomNode: () => {
            var s, m
            return (m =
              (s = g.value) === null || s === void 0
                ? void 0
                : s.getPopupDomNode) === null || m === void 0
              ? void 0
              : m.call(s)
          }
        })
      const { prefixCls: i, configProvider: p } = K('popover', e),
        [f, v] = ke(i),
        C = N(() => p.getPrefixCls()),
        x = () => {
          var s, m
          const {
              title: P = E(
                (s = n.title) === null || s === void 0 ? void 0 : s.call(n)
              ),
              content: u = E(
                (m = n.content) === null || m === void 0 ? void 0 : m.call(n)
              )
            } = e,
            h = !!(Array.isArray(P) ? P.length : P),
            B = !!(Array.isArray(u) ? u.length : P)
          return !h && !B
            ? null
            : d(ue, null, [
                h && d('div', { class: `${i.value}-title` }, [P]),
                d('div', { class: `${i.value}-inner-content` }, [u])
              ])
        }
      return () => {
        const s = V(e.overlayClassName, v.value)
        return f(
          d(
            Ce,
            b(
              b(b({}, Z(e, ['title', 'content'])), l),
              {},
              {
                prefixCls: i.value,
                ref: g,
                overlayClassName: s,
                transitionName: q(C.value, 'zoom-big', e.transitionName),
                'data-popover-inject': !0
              }
            ),
            { title: x, default: n.default }
          )
        )
      }
    }
  }),
  _e = M(we),
  Oe = e => {
    const {
      componentCls: o,
      iconCls: t,
      zIndexPopup: n,
      colorText: l,
      colorWarning: g,
      marginXS: i,
      fontSize: p,
      fontWeightStrong: f,
      lineHeight: v
    } = e
    return {
      [o]: {
        zIndex: n,
        [`${o}-inner-content`]: { color: l },
        [`${o}-message`]: {
          position: 'relative',
          marginBottom: i,
          color: l,
          fontSize: p,
          display: 'flex',
          flexWrap: 'nowrap',
          alignItems: 'start',
          [`> ${o}-message-icon ${t}`]: {
            color: g,
            fontSize: p,
            flex: 'none',
            lineHeight: 1,
            paddingTop: (Math.round(p * v) - p) / 2
          },
          '&-title': { flex: 'auto', marginInlineStart: i },
          '&-title-only': { fontWeight: f }
        },
        [`${o}-description`]: {
          position: 'relative',
          marginInlineStart: p + i,
          marginBottom: i,
          color: l,
          fontSize: p
        },
        [`${o}-buttons`]: { textAlign: 'end', button: { marginInlineStart: i } }
      }
    }
  },
  Ne = L(
    'Popconfirm',
    e => Oe(e),
    e => {
      const { zIndexPopupBase: o } = e
      return { zIndexPopup: o + 60 }
    }
  )
var ze =
  (globalThis && globalThis.__rest) ||
  function(e, o) {
    var t = {}
    for (var n in e)
      Object.prototype.hasOwnProperty.call(e, n) &&
        o.indexOf(n) < 0 &&
        (t[n] = e[n])
    if (e != null && typeof Object.getOwnPropertySymbols == 'function')
      for (var l = 0, n = Object.getOwnPropertySymbols(e); l < n.length; l++)
        o.indexOf(n[l]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(e, n[l]) &&
          (t[n[l]] = e[n[l]])
    return t
  }
const Ie = () =>
    c(c({}, J()), {
      prefixCls: String,
      content: y(),
      title: y(),
      description: y(),
      okType: pe('primary'),
      disabled: { type: Boolean, default: !1 },
      okText: y(),
      cancelText: y(),
      icon: y(),
      okButtonProps: R(),
      cancelButtonProps: R(),
      showCancel: { type: Boolean, default: !0 },
      onConfirm: Function,
      onCancel: Function
    }),
  Ae = X({
    compatConfig: { MODE: 3 },
    name: 'APopconfirm',
    inheritAttrs: !1,
    props: Q(
      Ie(),
      c(c({}, U()), {
        trigger: 'click',
        placement: 'top',
        mouseEnterDelay: 0.1,
        mouseLeaveDelay: 0.1,
        arrowPointAtCenter: !1,
        autoAdjustOverflow: !0,
        okType: 'primary',
        disabled: !1
      })
    ),
    slots: Object,
    setup(e, o) {
      let { slots: t, emit: n, expose: l, attrs: g } = o
      const i = G()
      F(e.visible === void 0),
        l({
          getPopupDomNode: () => {
            var a, r
            return (r =
              (a = i.value) === null || a === void 0
                ? void 0
                : a.getPopupDomNode) === null || r === void 0
              ? void 0
              : r.call(a)
          }
        })
      const [p, f] = xe(!1, { value: ve(e, 'open') }),
        v = (a, r) => {
          e.open === void 0 && f(a), n('update:open', a), n('openChange', a, r)
        },
        C = a => {
          v(!1, a)
        },
        x = a => {
          var r
          return (r = e.onConfirm) === null || r === void 0
            ? void 0
            : r.call(e, a)
        },
        s = a => {
          var r
          v(!1, a), (r = e.onCancel) === null || r === void 0 || r.call(e, a)
        },
        m = a => {
          a.keyCode === be.ESC && p && v(!1, a)
        },
        P = a => {
          const { disabled: r } = e
          r || v(a)
        },
        { prefixCls: u, getPrefixCls: h } = K('popconfirm', e),
        B = N(() => h()),
        Y = N(() => h('btn')),
        [ee] = Ne(u),
        [z] = se('Popconfirm', ce.Popconfirm),
        oe = () => {
          var a, r, $, S, T
          const {
              okButtonProps: k,
              cancelButtonProps: w,
              title: _ = (a = t.title) === null || a === void 0
                ? void 0
                : a.call(t),
              description: O = (r = t.description) === null || r === void 0
                ? void 0
                : r.call(t),
              cancelText: te = ($ = t.cancel) === null || $ === void 0
                ? void 0
                : $.call(t),
              okText: ne = (S = t.okText) === null || S === void 0
                ? void 0
                : S.call(t),
              okType: I,
              icon: A = ((T = t.icon) === null || T === void 0
                ? void 0
                : T.call(t)) || d(de, null, null),
              showCancel: ae = !0
            } = e,
            { cancelButton: D, okButton: j } = t,
            W = c({ onClick: s, size: 'small' }, w),
            le = c(c(c({ onClick: x }, H(I)), { size: 'small' }), k)
          return d('div', { class: `${u.value}-inner-content` }, [
            d('div', { class: `${u.value}-message` }, [
              A && d('span', { class: `${u.value}-message-icon` }, [A]),
              d(
                'div',
                {
                  class: [
                    `${u.value}-message-title`,
                    { [`${u.value}-message-title-only`]: !!O }
                  ]
                },
                [_]
              )
            ]),
            O && d('div', { class: `${u.value}-description` }, [O]),
            d('div', { class: `${u.value}-buttons` }, [
              ae
                ? D
                  ? D(W)
                  : d(Pe, W, { default: () => [te || z.value.cancelText] })
                : null,
              j
                ? j(le)
                : d(
                    he,
                    {
                      buttonProps: c(c({ size: 'small' }, H(I)), k),
                      actionFn: x,
                      close: C,
                      prefixCls: Y.value,
                      quitOnNullishReturnValue: !0,
                      emitEvent: !0
                    },
                    { default: () => [ne || z.value.okText] }
                  )
            ])
          ])
        }
      return () => {
        var a
        const { placement: r, overlayClassName: $, trigger: S = 'click' } = e,
          T = ze(e, ['placement', 'overlayClassName', 'trigger']),
          k = Z(T, [
            'title',
            'content',
            'cancelText',
            'okText',
            'onUpdate:open',
            'onConfirm',
            'onCancel',
            'prefixCls'
          ]),
          w = V(u.value, $)
        return ee(
          d(
            _e,
            b(
              b(b({}, k), g),
              {},
              {
                trigger: S,
                placement: r,
                onOpenChange: P,
                open: p.value,
                overlayClassName: w,
                transitionName: q(B.value, 'zoom-big', e.transitionName),
                ref: i,
                'data-popover-inject': !0
              }
            ),
            {
              default: () => [
                ye(
                  ((a = t.default) === null || a === void 0
                    ? void 0
                    : a.call(t)) || [],
                  {
                    onKeydown: _ => {
                      m(_)
                    }
                  },
                  !1
                )
              ],
              content: oe
            }
          )
        )
      }
    }
  }),
  He = M(Ae)
export { He as P }

import {
  g as uo,
  c as po,
  u as X,
  E as mo,
  a as D,
  P as F,
  ad as lo,
  b as $o,
  o as Fo,
  G as ao,
  q as xo,
  L as Bo,
  _ as n,
  m as vo,
  v as Vo,
  af as Uo,
  z as Xo
} from './Dashboard.071f9192.js'
import {
  g as C,
  d as P,
  c as m,
  D as io,
  s as L,
  v as go,
  m as q,
  Y as Wo,
  k as Do,
  w as Ro,
  n as Oo,
  z as qo,
  l as Yo,
  x as Ko,
  T as Qo
} from './vendor.0319ebde.js'
import {
  Q as Zo,
  S as Jo,
  U as ko,
  V as oe,
  W as ee,
  X as te,
  Y as re,
  Z as ne,
  b as W,
  w as Io,
  i as le,
  q as Lo,
  p as ae
} from './shallowequal.234d6013.js'
import { v as Ao, g as ie } from './index.5b4de55e.js'
const se = o => {
    const { componentCls: e } = o
    return {
      [e]: {
        display: 'inline-flex',
        '&-block': { display: 'flex', width: '100%' },
        '&-vertical': { flexDirection: 'column' }
      }
    }
  },
  ce = se,
  de = o => {
    const { componentCls: e } = o
    return {
      [e]: {
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
        [`${e}-item`]: { '&:empty': { display: 'none' } }
      }
    }
  },
  ue = uo('Space', o => [de(o), ce(o)])
var pe = '[object Map]',
  me = '[object Set]',
  ve = Object.prototype,
  ge = ve.hasOwnProperty
function No(o) {
  if (o == null) return !0
  if (
    Zo(o) &&
    (Jo(o) ||
      typeof o == 'string' ||
      typeof o.splice == 'function' ||
      ko(o) ||
      oe(o) ||
      ee(o))
  )
    return !o.length
  var e = te(o)
  if (e == pe || e == me) return !o.size
  if (re(o)) return !ne(o).length
  for (var t in o) if (ge.call(o, t)) return !1
  return !0
}
const fe = () => ({
    compactSize: String,
    compactDirection: F.oneOf(lo('horizontal', 'vertical')).def('horizontal'),
    isFirstItem: $o(),
    isLastItem: $o()
  }),
  Y = Ao(null),
  be = (o, e) => {
    const t = Y.useInject(),
      r = C(() => {
        if (!t || No(t)) return ''
        const { compactDirection: a, isFirstItem: c, isLastItem: i } = t,
          d = a === 'vertical' ? '-vertical-' : '-'
        return po({
          [`${o.value}-compact${d}item`]: !0,
          [`${o.value}-compact${d}first-item`]: c,
          [`${o.value}-compact${d}last-item`]: i,
          [`${o.value}-compact${d}item-rtl`]: e.value === 'rtl'
        })
      })
    return {
      compactSize: C(() => (t == null ? void 0 : t.compactSize)),
      compactDirection: C(() => (t == null ? void 0 : t.compactDirection)),
      compactItemClassnames: r
    }
  },
  et = P({
    name: 'NoCompactStyle',
    setup(o, e) {
      let { slots: t } = e
      return (
        Y.useProvide(null),
        () => {
          var r
          return (r = t.default) === null || r === void 0 ? void 0 : r.call(t)
        }
      )
    }
  }),
  ye = () => ({
    prefixCls: String,
    size: { type: String },
    direction: F.oneOf(lo('horizontal', 'vertical')).def('horizontal'),
    align: F.oneOf(lo('start', 'end', 'center', 'baseline')),
    block: { type: Boolean, default: void 0 }
  }),
  he = P({
    name: 'CompactItem',
    props: fe(),
    setup(o, e) {
      let { slots: t } = e
      return (
        Y.useProvide(o),
        () => {
          var r
          return (r = t.default) === null || r === void 0 ? void 0 : r.call(t)
        }
      )
    }
  }),
  tt = P({
    name: 'ASpaceCompact',
    inheritAttrs: !1,
    props: ye(),
    setup(o, e) {
      let { attrs: t, slots: r } = e
      const { prefixCls: a, direction: c } = X('space-compact', o),
        i = Y.useInject(),
        [d, p] = ue(a),
        S = C(() =>
          po(a.value, p.value, {
            [`${a.value}-rtl`]: c.value === 'rtl',
            [`${a.value}-block`]: o.block,
            [`${a.value}-vertical`]: o.direction === 'vertical'
          })
        )
      return () => {
        var s
        const v = mo(
          ((s = r.default) === null || s === void 0 ? void 0 : s.call(r)) || []
        )
        return v.length === 0
          ? null
          : d(
              m('div', D(D({}, t), {}, { class: [S.value, t.class] }), [
                v.map((b, H) => {
                  var B
                  const I = (b && b.key) || `${a.value}-item-${H}`,
                    $ = !i || No(i)
                  return m(
                    he,
                    {
                      key: I,
                      compactSize:
                        (B = o.size) !== null && B !== void 0 ? B : 'middle',
                      compactDirection: o.direction,
                      isFirstItem:
                        H === 0 && ($ || (i == null ? void 0 : i.isFirstItem)),
                      isLastItem:
                        H === v.length - 1 &&
                        ($ || (i == null ? void 0 : i.isLastItem))
                    },
                    { default: () => [b] }
                  )
                })
              ])
            )
      }
    }
  }),
  Ce = o => {
    const { componentCls: e, colorPrimary: t } = o
    return {
      [e]: {
        position: 'absolute',
        background: 'transparent',
        pointerEvents: 'none',
        boxSizing: 'border-box',
        color: `var(--wave-color, ${t})`,
        boxShadow: '0 0 0 0 currentcolor',
        opacity: 0.2,
        '&.wave-motion-appear': {
          transition: [
            `box-shadow 0.4s ${o.motionEaseOutCirc}`,
            `opacity 2s ${o.motionEaseOutCirc}`
          ].join(','),
          '&-active': { boxShadow: '0 0 0 6px currentcolor', opacity: 0 }
        }
      }
    }
  },
  Se = uo('Wave', o => [Ce(o)])
function $e(o) {
  const e = (o || '').match(/rgba?\((\d*), (\d*), (\d*)(, [\d.]*)?\)/)
  return e && e[1] && e[2] && e[3] ? !(e[1] === e[2] && e[2] === e[3]) : !0
}
function ro(o) {
  return (
    o &&
    o !== '#fff' &&
    o !== '#ffffff' &&
    o !== 'rgb(255, 255, 255)' &&
    o !== 'rgba(255, 255, 255, 1)' &&
    $e(o) &&
    !/rgba\((?:\d*, ){3}0\)/.test(o) &&
    o !== 'transparent'
  )
}
function xe(o) {
  const {
    borderTopColor: e,
    borderColor: t,
    backgroundColor: r
  } = getComputedStyle(o)
  return ro(e) ? e : ro(t) ? t : ro(r) ? r : null
}
function no(o) {
  return Number.isNaN(o) ? 0 : o
}
const Be = P({
  props: { target: Fo(), className: String },
  setup(o) {
    const e = L(null),
      [t, r] = W(null),
      [a, c] = W([]),
      [i, d] = W(0),
      [p, S] = W(0),
      [s, v] = W(0),
      [b, H] = W(0),
      [B, I] = W(!1)
    function $() {
      const { target: u } = o,
        g = getComputedStyle(u)
      r(xe(u))
      const O = g.position === 'static',
        { borderLeftWidth: Q, borderTopWidth: Z } = g
      d(O ? u.offsetLeft : no(-parseFloat(Q))),
        S(O ? u.offsetTop : no(-parseFloat(Z))),
        v(u.offsetWidth),
        H(u.offsetHeight)
      const {
        borderTopLeftRadius: J,
        borderTopRightRadius: yo,
        borderBottomLeftRadius: ho,
        borderBottomRightRadius: l
      } = g
      c([J, yo, l, ho].map(f => no(parseFloat(f))))
    }
    let E, h, z
    const R = () => {
        clearTimeout(z), Io.cancel(h), E == null || E.disconnect()
      },
      A = () => {
        var u
        const g =
          (u = e.value) === null || u === void 0 ? void 0 : u.parentElement
        g && (io(null, g), g.parentElement && g.parentElement.removeChild(g))
      }
    go(() => {
      R(),
        (z = setTimeout(() => {
          A()
        }, 5e3))
      const { target: u } = o
      u &&
        ((h = Io(() => {
          $(), I(!0)
        })),
        typeof ResizeObserver < 'u' &&
          ((E = new ResizeObserver($)), E.observe(u)))
    }),
      q(() => {
        R()
      })
    const K = u => {
      u.propertyName === 'opacity' && A()
    }
    return () => {
      if (!B.value) return null
      const u = {
        left: `${i.value}px`,
        top: `${p.value}px`,
        width: `${s.value}px`,
        height: `${b.value}px`,
        borderRadius: a.value.map(g => `${g}px`).join(' ')
      }
      return (
        t && (u['--wave-color'] = t.value),
        m(
          Wo,
          {
            appear: !0,
            name: 'wave-motion',
            appearFromClass: 'wave-motion-appear',
            appearActiveClass: 'wave-motion-appear',
            appearToClass: 'wave-motion-appear wave-motion-appear-active'
          },
          {
            default: () => [
              m(
                'div',
                { ref: e, class: o.className, style: u, onTransitionend: K },
                null
              )
            ]
          }
        )
      )
    }
  }
})
function Ie(o, e) {
  const t = document.createElement('div')
  return (
    (t.style.position = 'absolute'),
    (t.style.left = '0px'),
    (t.style.top = '0px'),
    o == null || o.insertBefore(t, o == null ? void 0 : o.firstChild),
    io(m(Be, { target: o, className: e }, null), t),
    () => {
      io(null, t), t.parentElement && t.parentElement.removeChild(t)
    }
  )
}
function Ee(o, e) {
  const t = Do()
  let r
  function a() {
    var c
    const i = ao(t)
    r == null || r(),
      !(
        (!((c = e == null ? void 0 : e.value) === null || c === void 0) &&
          c.disabled) ||
        !i
      ) && (r = Ie(i, o.value))
  }
  return (
    q(() => {
      r == null || r()
    }),
    a
  )
}
const Te = P({
    compatConfig: { MODE: 3 },
    name: 'Wave',
    props: { disabled: Boolean },
    setup(o, e) {
      let { slots: t } = e
      const r = Do(),
        { prefixCls: a, wave: c } = X('wave', o),
        [, i] = Se(a),
        d = Ee(
          C(() => po(a.value, i.value)),
          c
        )
      let p
      const S = () => {
        ao(r).removeEventListener('click', p, !0)
      }
      return (
        go(() => {
          Ro(
            () => o.disabled,
            () => {
              S(),
                Oo(() => {
                  const s = ao(r)
                  s == null || s.removeEventListener('click', p, !0),
                    !(!s || s.nodeType !== 1 || o.disabled) &&
                      ((p = v => {
                        v.target.tagName === 'INPUT' ||
                          !le(v.target) ||
                          !s.getAttribute ||
                          s.getAttribute('disabled') ||
                          s.disabled ||
                          s.className.includes('disabled') ||
                          s.className.includes('-leave') ||
                          d()
                      }),
                      s.addEventListener('click', p, !0))
                })
            },
            { immediate: !0, flush: 'post' }
          )
        }),
        q(() => {
          S()
        }),
        () => {
          var s
          return (s = t.default) === null || s === void 0
            ? void 0
            : s.call(t)[0]
        }
      )
    }
  }),
  we = () => ({
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
    icon: F.any,
    href: String,
    target: String,
    title: String,
    onClick: xo(),
    onMousedown: xo()
  }),
  ze = we,
  Eo = o => {
    o &&
      ((o.style.width = '0px'),
      (o.style.opacity = '0'),
      (o.style.transform = 'scale(0)'))
  },
  To = o => {
    Oo(() => {
      o &&
        ((o.style.width = `${o.scrollWidth}px`),
        (o.style.opacity = '1'),
        (o.style.transform = 'scale(1)'))
    })
  },
  wo = o => {
    o &&
      o.style &&
      ((o.style.width = null),
      (o.style.opacity = null),
      (o.style.transform = null))
  },
  Pe = P({
    compatConfig: { MODE: 3 },
    name: 'LoadingIcon',
    props: {
      prefixCls: String,
      loading: [Boolean, Object],
      existIcon: Boolean
    },
    setup(o) {
      return () => {
        const { existIcon: e, prefixCls: t, loading: r } = o
        if (e)
          return m('span', { class: `${t}-loading-icon` }, [m(Bo, null, null)])
        const a = !!r
        return m(
          Wo,
          {
            name: `${t}-loading-icon-motion`,
            onBeforeEnter: Eo,
            onEnter: To,
            onAfterEnter: wo,
            onBeforeLeave: To,
            onLeave: c => {
              setTimeout(() => {
                Eo(c)
              })
            },
            onAfterLeave: wo
          },
          {
            default: () => [
              a
                ? m('span', { class: `${t}-loading-icon` }, [m(Bo, null, null)])
                : null
            ]
          }
        )
      }
    }
  }),
  zo = (o, e) => ({
    [`> span, > ${o}`]: {
      '&:not(:last-child)': {
        [`&, & > ${o}`]: { '&:not(:disabled)': { borderInlineEndColor: e } }
      },
      '&:not(:first-child)': {
        [`&, & > ${o}`]: { '&:not(:disabled)': { borderInlineStartColor: e } }
      }
    }
  }),
  He = o => {
    const {
      componentCls: e,
      fontSize: t,
      lineWidth: r,
      colorPrimaryHover: a,
      colorErrorHover: c
    } = o
    return {
      [`${e}-group`]: [
        {
          position: 'relative',
          display: 'inline-flex',
          [`> span, > ${e}`]: {
            '&:not(:last-child)': {
              [`&, & > ${e}`]: {
                borderStartEndRadius: 0,
                borderEndEndRadius: 0
              }
            },
            '&:not(:first-child)': {
              marginInlineStart: -r,
              [`&, & > ${e}`]: {
                borderStartStartRadius: 0,
                borderEndStartRadius: 0
              }
            }
          },
          [e]: {
            position: 'relative',
            zIndex: 1,
            '&:hover,\n          &:focus,\n          &:active': { zIndex: 2 },
            '&[disabled]': { zIndex: 0 }
          },
          [`${e}-icon-only`]: { fontSize: t }
        },
        zo(`${e}-primary`, a),
        zo(`${e}-danger`, c)
      ]
    }
  },
  We = He
function De(o, e) {
  return {
    [`&-item:not(${e}-last-item)`]: { marginBottom: -o.lineWidth },
    '&-item': {
      '&:hover,&:focus,&:active': { zIndex: 2 },
      '&[disabled]': { zIndex: 0 }
    }
  }
}
function Re(o, e) {
  return {
    [`&-item:not(${e}-first-item):not(${e}-last-item)`]: { borderRadius: 0 },
    [`&-item${e}-first-item:not(${e}-last-item)`]: {
      [`&, &${o}-sm, &${o}-lg`]: {
        borderEndEndRadius: 0,
        borderEndStartRadius: 0
      }
    },
    [`&-item${e}-last-item:not(${e}-first-item)`]: {
      [`&, &${o}-sm, &${o}-lg`]: {
        borderStartStartRadius: 0,
        borderStartEndRadius: 0
      }
    }
  }
}
function Oe(o) {
  const e = `${o.componentCls}-compact-vertical`
  return { [e]: n(n({}, De(o, e)), Re(o.componentCls, e)) }
}
const Le = o => {
    const { componentCls: e, iconCls: t } = o
    return {
      [e]: {
        outline: 'none',
        position: 'relative',
        display: 'inline-block',
        fontWeight: 400,
        whiteSpace: 'nowrap',
        textAlign: 'center',
        backgroundImage: 'none',
        backgroundColor: 'transparent',
        border: `${o.lineWidth}px ${o.lineType} transparent`,
        cursor: 'pointer',
        transition: `all ${o.motionDurationMid} ${o.motionEaseInOut}`,
        userSelect: 'none',
        touchAction: 'manipulation',
        lineHeight: o.lineHeight,
        color: o.colorText,
        '> span': { display: 'inline-block' },
        [`> ${t} + span, > span + ${t}`]: { marginInlineStart: o.marginXS },
        '> a': { color: 'currentColor' },
        '&:not(:disabled)': n({}, Vo(o)),
        [`&-icon-only${e}-compact-item`]: { flex: 'none' },
        [`&-compact-item${e}-primary`]: {
          [`&:not([disabled]) + ${e}-compact-item${e}-primary:not([disabled])`]: {
            position: 'relative',
            '&:before': {
              position: 'absolute',
              top: -o.lineWidth,
              insetInlineStart: -o.lineWidth,
              display: 'inline-block',
              width: o.lineWidth,
              height: `calc(100% + ${o.lineWidth * 2}px)`,
              backgroundColor: o.colorPrimaryHover,
              content: '""'
            }
          }
        },
        '&-compact-vertical-item': {
          [`&${e}-primary`]: {
            [`&:not([disabled]) + ${e}-compact-vertical-item${e}-primary:not([disabled])`]: {
              position: 'relative',
              '&:before': {
                position: 'absolute',
                top: -o.lineWidth,
                insetInlineStart: -o.lineWidth,
                display: 'inline-block',
                width: `calc(100% + ${o.lineWidth * 2}px)`,
                height: o.lineWidth,
                backgroundColor: o.colorPrimaryHover,
                content: '""'
              }
            }
          }
        }
      }
    }
  },
  w = (o, e) => ({ '&:not(:disabled)': { '&:hover': o, '&:active': e } }),
  Ae = o => ({
    minWidth: o.controlHeight,
    paddingInlineStart: 0,
    paddingInlineEnd: 0,
    borderRadius: '50%'
  }),
  Ne = o => ({
    borderRadius: o.controlHeight,
    paddingInlineStart: o.controlHeight / 2,
    paddingInlineEnd: o.controlHeight / 2
  }),
  so = o => ({
    cursor: 'not-allowed',
    borderColor: o.colorBorder,
    color: o.colorTextDisabled,
    backgroundColor: o.colorBgContainerDisabled,
    boxShadow: 'none'
  }),
  V = (o, e, t, r, a, c, i) => ({
    [`&${o}-background-ghost`]: n(
      n(
        {
          color: e || void 0,
          backgroundColor: 'transparent',
          borderColor: t || void 0,
          boxShadow: 'none'
        },
        w(
          n({ backgroundColor: 'transparent' }, c),
          n({ backgroundColor: 'transparent' }, i)
        )
      ),
      {
        '&:disabled': {
          cursor: 'not-allowed',
          color: r || void 0,
          borderColor: a || void 0
        }
      }
    )
  }),
  fo = o => ({ '&:disabled': n({}, so(o)) }),
  _o = o => n({}, fo(o)),
  U = o => ({
    '&:disabled': { cursor: 'not-allowed', color: o.colorTextDisabled }
  }),
  jo = o =>
    n(
      n(
        n(
          n(n({}, _o(o)), {
            backgroundColor: o.colorBgContainer,
            borderColor: o.colorBorder,
            boxShadow: `0 ${o.controlOutlineWidth}px 0 ${o.controlTmpOutline}`
          }),
          w(
            { color: o.colorPrimaryHover, borderColor: o.colorPrimaryHover },
            { color: o.colorPrimaryActive, borderColor: o.colorPrimaryActive }
          )
        ),
        V(
          o.componentCls,
          o.colorBgContainer,
          o.colorBgContainer,
          o.colorTextDisabled,
          o.colorBorder
        )
      ),
      {
        [`&${o.componentCls}-dangerous`]: n(
          n(
            n(
              { color: o.colorError, borderColor: o.colorError },
              w(
                {
                  color: o.colorErrorHover,
                  borderColor: o.colorErrorBorderHover
                },
                { color: o.colorErrorActive, borderColor: o.colorErrorActive }
              )
            ),
            V(
              o.componentCls,
              o.colorError,
              o.colorError,
              o.colorTextDisabled,
              o.colorBorder
            )
          ),
          fo(o)
        )
      }
    ),
  _e = o =>
    n(
      n(
        n(
          n(n({}, _o(o)), {
            color: o.colorTextLightSolid,
            backgroundColor: o.colorPrimary,
            boxShadow: `0 ${o.controlOutlineWidth}px 0 ${o.controlOutline}`
          }),
          w(
            {
              color: o.colorTextLightSolid,
              backgroundColor: o.colorPrimaryHover
            },
            {
              color: o.colorTextLightSolid,
              backgroundColor: o.colorPrimaryActive
            }
          )
        ),
        V(
          o.componentCls,
          o.colorPrimary,
          o.colorPrimary,
          o.colorTextDisabled,
          o.colorBorder,
          { color: o.colorPrimaryHover, borderColor: o.colorPrimaryHover },
          { color: o.colorPrimaryActive, borderColor: o.colorPrimaryActive }
        )
      ),
      {
        [`&${o.componentCls}-dangerous`]: n(
          n(
            n(
              {
                backgroundColor: o.colorError,
                boxShadow: `0 ${o.controlOutlineWidth}px 0 ${o.colorErrorOutline}`
              },
              w(
                { backgroundColor: o.colorErrorHover },
                { backgroundColor: o.colorErrorActive }
              )
            ),
            V(
              o.componentCls,
              o.colorError,
              o.colorError,
              o.colorTextDisabled,
              o.colorBorder,
              { color: o.colorErrorHover, borderColor: o.colorErrorHover },
              { color: o.colorErrorActive, borderColor: o.colorErrorActive }
            )
          ),
          fo(o)
        )
      }
    ),
  je = o => n(n({}, jo(o)), { borderStyle: 'dashed' }),
  Me = o =>
    n(
      n(
        n(
          { color: o.colorLink },
          w({ color: o.colorLinkHover }, { color: o.colorLinkActive })
        ),
        U(o)
      ),
      {
        [`&${o.componentCls}-dangerous`]: n(
          n(
            { color: o.colorError },
            w({ color: o.colorErrorHover }, { color: o.colorErrorActive })
          ),
          U(o)
        )
      }
    ),
  Ge = o =>
    n(
      n(
        n(
          {},
          w(
            { color: o.colorText, backgroundColor: o.colorBgTextHover },
            { color: o.colorText, backgroundColor: o.colorBgTextActive }
          )
        ),
        U(o)
      ),
      {
        [`&${o.componentCls}-dangerous`]: n(
          n({ color: o.colorError }, U(o)),
          w(
            { color: o.colorErrorHover, backgroundColor: o.colorErrorBg },
            { color: o.colorErrorHover, backgroundColor: o.colorErrorBg }
          )
        )
      }
    ),
  Fe = o => n(n({}, so(o)), { [`&${o.componentCls}:hover`]: n({}, so(o)) }),
  Ve = o => {
    const { componentCls: e } = o
    return {
      [`${e}-default`]: jo(o),
      [`${e}-primary`]: _e(o),
      [`${e}-dashed`]: je(o),
      [`${e}-link`]: Me(o),
      [`${e}-text`]: Ge(o),
      [`${e}-disabled`]: Fe(o)
    }
  },
  bo = function(o) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : ''
    const {
        componentCls: t,
        iconCls: r,
        controlHeight: a,
        fontSize: c,
        lineHeight: i,
        lineWidth: d,
        borderRadius: p,
        buttonPaddingHorizontal: S
      } = o,
      s = Math.max(0, (a - c * i) / 2 - d),
      v = S - d,
      b = `${t}-icon-only`
    return [
      {
        [`${t}${e}`]: {
          fontSize: c,
          height: a,
          padding: `${s}px ${v}px`,
          borderRadius: p,
          [`&${b}`]: {
            width: a,
            paddingInlineStart: 0,
            paddingInlineEnd: 0,
            [`&${t}-round`]: { width: 'auto' },
            '> span': { transform: 'scale(1.143)' }
          },
          [`&${t}-loading`]: { opacity: o.opacityLoading, cursor: 'default' },
          [`${t}-loading-icon`]: {
            transition: `width ${o.motionDurationSlow} ${o.motionEaseInOut}, opacity ${o.motionDurationSlow} ${o.motionEaseInOut}`
          },
          [`&:not(${b}) ${t}-loading-icon > ${r}`]: {
            marginInlineEnd: o.marginXS
          }
        }
      },
      { [`${t}${t}-circle${e}`]: Ae(o) },
      { [`${t}${t}-round${e}`]: Ne(o) }
    ]
  },
  Ue = o => bo(o),
  Xe = o => {
    const e = vo(o, {
      controlHeight: o.controlHeightSM,
      padding: o.paddingXS,
      buttonPaddingHorizontal: 8,
      borderRadius: o.borderRadiusSM
    })
    return bo(e, `${o.componentCls}-sm`)
  },
  qe = o => {
    const e = vo(o, {
      controlHeight: o.controlHeightLG,
      fontSize: o.fontSizeLG,
      borderRadius: o.borderRadiusLG
    })
    return bo(e, `${o.componentCls}-lg`)
  },
  Ye = o => {
    const { componentCls: e } = o
    return { [e]: { [`&${e}-block`]: { width: '100%' } } }
  },
  Ke = uo('Button', o => {
    const { controlTmpOutline: e, paddingContentHorizontal: t } = o,
      r = vo(o, { colorOutlineDefault: e, buttonPaddingHorizontal: t })
    return [
      Le(r),
      Xe(r),
      Ue(r),
      qe(r),
      Ye(r),
      Ve(r),
      We(r),
      ie(o, { focus: !1 }),
      Oe(o)
    ]
  }),
  Qe = () => ({ prefixCls: String, size: { type: String } }),
  Mo = Ao(),
  co = P({
    compatConfig: { MODE: 3 },
    name: 'AButtonGroup',
    props: Qe(),
    setup(o, e) {
      let { slots: t } = e
      const { prefixCls: r, direction: a } = X('btn-group', o),
        [, , c] = Uo()
      Mo.useProvide(qo({ size: C(() => o.size) }))
      const i = C(() => {
        const { size: d } = o
        let p = ''
        switch (d) {
          case 'large':
            p = 'lg'
            break
          case 'small':
            p = 'sm'
            break
          case 'middle':
          case void 0:
            break
          default:
            Lo(!d, 'Button.Group', 'Invalid prop `size`.')
        }
        return {
          [`${r.value}`]: !0,
          [`${r.value}-${p}`]: p,
          [`${r.value}-rtl`]: a.value === 'rtl',
          [c.value]: !0
        }
      })
      return () => {
        var d
        return m('div', { class: i.value }, [
          mo((d = t.default) === null || d === void 0 ? void 0 : d.call(t))
        ])
      }
    }
  }),
  Po = /^[\u4e00-\u9fa5]{2}$/,
  Ho = Po.test.bind(Po)
function M(o) {
  return o === 'text' || o === 'link'
}
const G = P({
  compatConfig: { MODE: 3 },
  name: 'AButton',
  inheritAttrs: !1,
  __ANT_BUTTON: !0,
  props: ae(ze(), { type: 'default' }),
  slots: Object,
  setup(o, e) {
    let { slots: t, attrs: r, emit: a, expose: c } = e
    const {
        prefixCls: i,
        autoInsertSpaceInButton: d,
        direction: p,
        size: S
      } = X('btn', o),
      [s, v] = Ke(i),
      b = Mo.useInject(),
      H = Xo(),
      B = C(() => {
        var l
        return (l = o.disabled) !== null && l !== void 0 ? l : H.value
      }),
      I = L(null),
      $ = L(void 0)
    let E = !1
    const h = L(!1),
      z = L(!1),
      R = C(() => d.value !== !1),
      { compactSize: A, compactItemClassnames: K } = be(i, p),
      u = C(() =>
        typeof o.loading == 'object' && o.loading.delay
          ? o.loading.delay || !0
          : !!o.loading
      )
    Ro(
      u,
      l => {
        clearTimeout($.value),
          typeof u.value == 'number'
            ? ($.value = setTimeout(() => {
                h.value = l
              }, u.value))
            : (h.value = l)
      },
      { immediate: !0 }
    )
    const g = C(() => {
        const {
            type: l,
            shape: f = 'default',
            ghost: T,
            block: x,
            danger: k
          } = o,
          y = i.value,
          N = { large: 'lg', small: 'sm', middle: void 0 },
          _ = A.value || (b == null ? void 0 : b.size) || S.value,
          j = (_ && N[_]) || ''
        return [
          K.value,
          {
            [v.value]: !0,
            [`${y}`]: !0,
            [`${y}-${f}`]: f !== 'default' && f,
            [`${y}-${l}`]: l,
            [`${y}-${j}`]: j,
            [`${y}-loading`]: h.value,
            [`${y}-background-ghost`]: T && !M(l),
            [`${y}-two-chinese-chars`]: z.value && R.value,
            [`${y}-block`]: x,
            [`${y}-dangerous`]: !!k,
            [`${y}-rtl`]: p.value === 'rtl'
          }
        ]
      }),
      O = () => {
        const l = I.value
        if (!l || d.value === !1) return
        const f = l.textContent
        E && Ho(f) ? z.value || (z.value = !0) : z.value && (z.value = !1)
      },
      Q = l => {
        if (h.value || B.value) {
          l.preventDefault()
          return
        }
        a('click', l)
      },
      Z = l => {
        a('mousedown', l)
      },
      J = (l, f) => {
        const T = f ? ' ' : ''
        if (l.type === Qo) {
          let x = l.children.trim()
          return Ho(x) && (x = x.split('').join(T)), m('span', null, [x])
        }
        return l
      }
    return (
      Yo(() => {
        Lo(
          !(o.ghost && M(o.type)),
          'Button',
          "`link` or `text` button can't be a `ghost` button."
        )
      }),
      go(O),
      Ko(O),
      q(() => {
        $.value && clearTimeout($.value)
      }),
      c({
        focus: () => {
          var l
          ;(l = I.value) === null || l === void 0 || l.focus()
        },
        blur: () => {
          var l
          ;(l = I.value) === null || l === void 0 || l.blur()
        }
      }),
      () => {
        var l, f
        const {
            icon: T = (l = t.icon) === null || l === void 0 ? void 0 : l.call(t)
          } = o,
          x = mo((f = t.default) === null || f === void 0 ? void 0 : f.call(t))
        E = x.length === 1 && !T && !M(o.type)
        const { type: k, htmlType: y, href: N, title: _, target: j } = o,
          Go = h.value ? 'loading' : T,
          oo = n(n({}, r), {
            title: _,
            disabled: B.value,
            class: [
              g.value,
              r.class,
              { [`${i.value}-icon-only`]: x.length === 0 && !!Go }
            ],
            onClick: Q,
            onMousedown: Z
          })
        B.value || delete oo.disabled
        const Co =
            T && !h.value
              ? T
              : m(
                  Pe,
                  { existIcon: !!T, prefixCls: i.value, loading: !!h.value },
                  null
                ),
          So = x.map(to => J(to, E && R.value))
        if (N !== void 0)
          return s(
            m('a', D(D({}, oo), {}, { href: N, target: j, ref: I }), [Co, So])
          )
        let eo = m('button', D(D({}, oo), {}, { ref: I, type: y }), [Co, So])
        if (!M(k)) {
          const to = (function() {
            return eo
          })()
          eo = m(
            Te,
            { ref: 'wave', disabled: !!h.value },
            { default: () => [to] }
          )
        }
        return s(eo)
      }
    )
  }
})
G.Group = co
G.install = function(o) {
  return o.component(G.name, G), o.component(co.name, co), o
}
export { G as B, tt as C, et as N, Te as W, ue as a, ze as b, be as u }

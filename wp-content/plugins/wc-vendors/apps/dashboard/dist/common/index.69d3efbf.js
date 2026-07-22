import {
  ae as re,
  g as L,
  m as j,
  _ as m,
  r as F,
  u as N,
  S as ae,
  V as D,
  a as C,
  P as se,
  $ as ie,
  w as le,
  c as ce,
  a2 as ue,
  a5 as I,
  B as W,
  E as de
} from './Dashboard.071f9192.js'
import {
  s as w,
  v as X,
  A as pe,
  l as V,
  j as ge,
  p as ve,
  d as E,
  g as _,
  w as G,
  n as O,
  c as h,
  r as me,
  F as fe
} from './vendor.0319ebde.js'
import {
  R as he,
  m as Se,
  L as ye,
  P as xe,
  p as $e,
  M as be,
  o as Ce,
  C as ze,
  N as Pe,
  c as we
} from './shallowequal.234d6013.js'
function ke() {
  const e = w({})
  let t = null
  const n = re()
  return (
    X(() => {
      t = n.value.subscribe(o => {
        e.value = o
      })
    }),
    pe(() => {
      n.value.unsubscribe(t)
    }),
    e
  )
}
function Ae(e) {
  const t = w()
  return (
    V(
      () => {
        t.value = e()
      },
      { flush: 'sync' }
    ),
    t
  )
}
const Be = e => {
    const {
        antCls: t,
        componentCls: n,
        iconCls: o,
        avatarBg: r,
        avatarColor: p,
        containerSize: s,
        containerSizeLG: u,
        containerSizeSM: g,
        textFontSize: d,
        textFontSizeLG: c,
        textFontSizeSM: x,
        borderRadius: i,
        borderRadiusLG: a,
        borderRadiusSM: S,
        lineWidth: v,
        lineType: $
      } = e,
      f = (b, l, y) => ({
        width: b,
        height: b,
        lineHeight: `${b - v * 2}px`,
        borderRadius: '50%',
        [`&${n}-square`]: { borderRadius: y },
        [`${n}-string`]: {
          position: 'absolute',
          left: { _skip_check_: !0, value: '50%' },
          transformOrigin: '0 center'
        },
        [`&${n}-icon`]: { fontSize: l, [`> ${o}`]: { margin: 0 } }
      })
    return {
      [n]: m(
        m(
          m(m({}, F(e)), {
            position: 'relative',
            display: 'inline-block',
            overflow: 'hidden',
            color: p,
            whiteSpace: 'nowrap',
            textAlign: 'center',
            verticalAlign: 'middle',
            background: r,
            border: `${v}px ${$} transparent`,
            '&-image': { background: 'transparent' },
            [`${t}-image-img`]: { display: 'block' }
          }),
          f(s, d, i)
        ),
        {
          '&-lg': m({}, f(u, c, a)),
          '&-sm': m({}, f(g, x, S)),
          '> img': {
            display: 'block',
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }
        }
      )
    }
  },
  Te = e => {
    const {
      componentCls: t,
      groupBorderColor: n,
      groupOverlapping: o,
      groupSpace: r
    } = e
    return {
      [`${t}-group`]: {
        display: 'inline-flex',
        [`${t}`]: { borderColor: n },
        '> *:not(:first-child)': { marginInlineStart: o }
      },
      [`${t}-group-popover`]: { [`${t} + ${t}`]: { marginInlineStart: r } }
    }
  },
  q = L(
    'Avatar',
    e => {
      const { colorTextLightSolid: t, colorTextPlaceholder: n } = e,
        o = j(e, { avatarBg: n, avatarColor: t })
      return [Be(o), Te(o)]
    },
    e => {
      const {
        controlHeight: t,
        controlHeightLG: n,
        controlHeightSM: o,
        fontSize: r,
        fontSizeLG: p,
        fontSizeXL: s,
        fontSizeHeading3: u,
        marginXS: g,
        marginXXS: d,
        colorBorderBg: c
      } = e
      return {
        containerSize: t,
        containerSizeLG: n,
        containerSizeSM: o,
        textFontSize: Math.round((p + s) / 2),
        textFontSizeLG: u,
        textFontSizeSM: r,
        groupSpace: d,
        groupOverlapping: -g,
        groupBorderColor: c
      }
    }
  ),
  K = Symbol('AvatarContextKey'),
  Re = () => ge(K, {}),
  Oe = e => ve(K, e),
  Me = () => ({
    prefixCls: String,
    shape: { type: String, default: 'circle' },
    size: { type: [Number, String, Object], default: () => 'default' },
    src: String,
    srcset: String,
    icon: se.any,
    alt: String,
    gap: Number,
    draggable: { type: Boolean, default: void 0 },
    crossOrigin: String,
    loadError: { type: Function }
  }),
  Ne = E({
    compatConfig: { MODE: 3 },
    name: 'AAvatar',
    inheritAttrs: !1,
    props: Me(),
    slots: Object,
    setup(e, t) {
      let { slots: n, attrs: o } = t
      const r = w(!0),
        p = w(!1),
        s = w(1),
        u = w(null),
        g = w(null),
        { prefixCls: d } = N('avatar', e),
        [c, x] = q(d),
        i = Re(),
        a = _(() => (e.size === 'default' ? i.size : e.size)),
        S = ke(),
        v = Ae(() => {
          if (typeof e.size != 'object') return
          const l = ae.find(P => S.value[P])
          return e.size[l]
        }),
        $ = l =>
          v.value
            ? {
                width: `${v.value}px`,
                height: `${v.value}px`,
                lineHeight: `${v.value}px`,
                fontSize: `${l ? v.value / 2 : 18}px`
              }
            : {},
        f = () => {
          if (!u.value || !g.value) return
          const l = u.value.offsetWidth,
            y = g.value.offsetWidth
          if (l !== 0 && y !== 0) {
            const { gap: P = 4 } = e
            P * 2 < y && (s.value = y - P * 2 < l ? (y - P * 2) / l : 1)
          }
        },
        b = () => {
          const { loadError: l } = e
          ;(l == null ? void 0 : l()) !== !1 && (r.value = !1)
        }
      return (
        G(
          () => e.src,
          () => {
            O(() => {
              ;(r.value = !0), (s.value = 1)
            })
          }
        ),
        G(
          () => e.gap,
          () => {
            O(() => {
              f()
            })
          }
        ),
        X(() => {
          O(() => {
            f(), (p.value = !0)
          })
        }),
        () => {
          var l, y
          const {
              shape: P,
              src: T,
              alt: U,
              srcset: Z,
              draggable: J,
              crossOrigin: Q
            } = e,
            Y = (l = i.shape) !== null && l !== void 0 ? l : P,
            k = D(n, e, 'icon'),
            z = d.value,
            ee = {
              [`${o.class}`]: !!o.class,
              [z]: !0,
              [`${z}-lg`]: a.value === 'large',
              [`${z}-sm`]: a.value === 'small',
              [`${z}-${Y}`]: !0,
              [`${z}-image`]: T && r.value,
              [`${z}-icon`]: k,
              [x.value]: !0
            },
            te =
              typeof a.value == 'number'
                ? {
                    width: `${a.value}px`,
                    height: `${a.value}px`,
                    lineHeight: `${a.value}px`,
                    fontSize: k ? `${a.value / 2}px` : '18px'
                  }
                : {},
            H = (y = n.default) === null || y === void 0 ? void 0 : y.call(n)
          let A
          if (T && r.value)
            A = h(
              'img',
              {
                draggable: J,
                src: T,
                srcset: Z,
                onError: b,
                alt: U,
                crossorigin: Q
              },
              null
            )
          else if (k) A = k
          else if (p.value || s.value !== 1) {
            const R = `scale(${s.value}) translateX(-50%)`,
              oe = { msTransform: R, WebkitTransform: R, transform: R },
              ne =
                typeof a.value == 'number' ? { lineHeight: `${a.value}px` } : {}
            A = h(
              he,
              { onResize: f },
              {
                default: () => [
                  h(
                    'span',
                    { class: `${z}-string`, ref: u, style: m(m({}, ne), oe) },
                    [H]
                  )
                ]
              }
            )
          } else
            A = h(
              'span',
              { class: `${z}-string`, ref: u, style: { opacity: 0 } },
              [H]
            )
          return c(
            h(
              'span',
              C(
                C({}, o),
                {},
                { ref: g, class: ee, style: [te, $(!!k), o.style] }
              ),
              [A]
            )
          )
        }
      )
    }
  }),
  B = Ne,
  Ee = e => {
    const {
      componentCls: t,
      popoverBg: n,
      popoverColor: o,
      width: r,
      fontWeightStrong: p,
      popoverPadding: s,
      boxShadowSecondary: u,
      colorTextHeading: g,
      borderRadiusLG: d,
      zIndexPopup: c,
      marginXS: x,
      colorBgElevated: i
    } = e
    return [
      {
        [t]: m(m({}, F(e)), {
          position: 'absolute',
          top: 0,
          left: { _skip_check_: !0, value: 0 },
          zIndex: c,
          fontWeight: 'normal',
          whiteSpace: 'normal',
          textAlign: 'start',
          cursor: 'auto',
          userSelect: 'text',
          '--antd-arrow-background-color': i,
          '&-rtl': { direction: 'rtl' },
          '&-hidden': { display: 'none' },
          [`${t}-content`]: { position: 'relative' },
          [`${t}-inner`]: {
            backgroundColor: n,
            backgroundClip: 'padding-box',
            borderRadius: d,
            boxShadow: u,
            padding: s
          },
          [`${t}-title`]: {
            minWidth: r,
            marginBottom: x,
            color: g,
            fontWeight: p
          },
          [`${t}-inner-content`]: { color: o }
        })
      },
      ye(e, { colorBg: 'var(--antd-arrow-background-color)' }),
      {
        [`${t}-pure`]: {
          position: 'relative',
          maxWidth: 'none',
          [`${t}-content`]: { display: 'inline-block' }
        }
      }
    ]
  },
  _e = e => {
    const { componentCls: t } = e
    return {
      [t]: xe.map(n => {
        const o = e[`${n}-6`]
        return {
          [`&${t}-${n}`]: {
            '--antd-arrow-background-color': o,
            [`${t}-inner`]: { backgroundColor: o },
            [`${t}-arrow`]: { background: 'transparent' }
          }
        }
      })
    }
  },
  He = e => {
    const {
        componentCls: t,
        lineWidth: n,
        lineType: o,
        colorSplit: r,
        paddingSM: p,
        controlHeight: s,
        fontSize: u,
        lineHeight: g,
        padding: d
      } = e,
      c = s - Math.round(u * g),
      x = c / 2,
      i = c / 2 - n,
      a = d
    return {
      [t]: {
        [`${t}-inner`]: { padding: 0 },
        [`${t}-title`]: {
          margin: 0,
          padding: `${x}px ${a}px ${i}px`,
          borderBottom: `${n}px ${o} ${r}`
        },
        [`${t}-inner-content`]: { padding: `${p}px ${a}px` }
      }
    }
  },
  Ie = L(
    'Popover',
    e => {
      const { colorBgElevated: t, colorText: n, wireframe: o } = e,
        r = j(e, { popoverBg: t, popoverColor: n, popoverPadding: 12 })
      return [Ee(r), _e(r), o && He(r), Se(r, 'zoom-big')]
    },
    e => {
      let { zIndexPopupBase: t } = e
      return { zIndexPopup: t + 30, width: 177 }
    }
  ),
  We = () => m(m({}, Pe()), { content: I(), title: I() }),
  Ge = E({
    compatConfig: { MODE: 3 },
    name: 'APopover',
    inheritAttrs: !1,
    props: $e(
      We(),
      m(m({}, be()), {
        trigger: 'hover',
        placement: 'top',
        mouseEnterDelay: 0.1,
        mouseLeaveDelay: 0.1
      })
    ),
    setup(e, t) {
      let { expose: n, slots: o, attrs: r } = t
      const p = me()
      le(e.visible === void 0),
        n({
          getPopupDomNode: () => {
            var i, a
            return (a =
              (i = p.value) === null || i === void 0
                ? void 0
                : i.getPopupDomNode) === null || a === void 0
              ? void 0
              : a.call(i)
          }
        })
      const { prefixCls: s, configProvider: u } = N('popover', e),
        [g, d] = Ie(s),
        c = _(() => u.getPrefixCls()),
        x = () => {
          var i, a
          const {
              title: S = W(
                (i = o.title) === null || i === void 0 ? void 0 : i.call(o)
              ),
              content: v = W(
                (a = o.content) === null || a === void 0 ? void 0 : a.call(o)
              )
            } = e,
            $ = !!(Array.isArray(S) ? S.length : S),
            f = !!(Array.isArray(v) ? v.length : S)
          return !$ && !f
            ? null
            : h(fe, null, [
                $ && h('div', { class: `${s.value}-title` }, [S]),
                h('div', { class: `${s.value}-inner-content` }, [v])
              ])
        }
      return () => {
        const i = ce(e.overlayClassName, d.value)
        return g(
          h(
            ze,
            C(
              C(C({}, Ce(e, ['title', 'content'])), r),
              {},
              {
                prefixCls: s.value,
                ref: p,
                overlayClassName: i,
                transitionName: ue(c.value, 'zoom-big', e.transitionName),
                'data-popover-inject': !0
              }
            ),
            { title: x, default: o.default }
          )
        )
      }
    }
  }),
  Le = ie(Ge),
  je = () => ({
    prefixCls: String,
    maxCount: Number,
    maxStyle: { type: Object, default: void 0 },
    maxPopoverPlacement: { type: String, default: 'top' },
    maxPopoverTrigger: String,
    size: { type: [Number, String, Object], default: 'default' },
    shape: { type: String, default: 'circle' }
  }),
  Fe = E({
    compatConfig: { MODE: 3 },
    name: 'AAvatarGroup',
    inheritAttrs: !1,
    props: je(),
    setup(e, t) {
      let { slots: n, attrs: o } = t
      const { prefixCls: r, direction: p } = N('avatar', e),
        s = _(() => `${r.value}-group`),
        [u, g] = q(r)
      return (
        V(() => {
          const d = { size: e.size, shape: e.shape }
          Oe(d)
        }),
        () => {
          const {
              maxPopoverPlacement: d = 'top',
              maxCount: c,
              maxStyle: x,
              maxPopoverTrigger: i = 'hover',
              shape: a
            } = e,
            S = {
              [s.value]: !0,
              [`${s.value}-rtl`]: p.value === 'rtl',
              [`${o.class}`]: !!o.class,
              [g.value]: !0
            },
            v = D(n, e),
            $ = de(v).map((b, l) => we(b, { key: `avatar-key-${l}` })),
            f = $.length
          if (c && c < f) {
            const b = $.slice(0, c),
              l = $.slice(c, f)
            return (
              b.push(
                h(
                  Le,
                  {
                    key: 'avatar-popover-key',
                    content: l,
                    trigger: i,
                    placement: d,
                    overlayClassName: `${s.value}-popover`
                  },
                  {
                    default: () => [
                      h(
                        B,
                        { style: x, shape: a },
                        { default: () => [`+${f - c}`] }
                      )
                    ]
                  }
                )
              ),
              u(h('div', C(C({}, o), {}, { class: S, style: o.style }), [b]))
            )
          }
          return u(h('div', C(C({}, o), {}, { class: S, style: o.style }), [$]))
        }
      )
    }
  }),
  M = Fe
B.Group = M
B.install = function(e) {
  return e.component(B.name, B), e.component(M.name, M), e
}
export { B as A, Ae as e, ke as u }

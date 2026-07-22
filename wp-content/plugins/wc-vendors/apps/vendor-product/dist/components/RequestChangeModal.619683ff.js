import {
  d as z,
  t as _,
  p as q,
  c as l,
  A as Te,
  I as Be,
  D as Pe,
  n as je,
  v as T,
  w as Q,
  y as Ve,
  x as ke,
  F as Ge,
  G as ue,
  u as I,
  N as Xe,
  o as fe,
  a as me,
  V as le,
  Y as Ke,
  M as ge,
  X as pe,
  Z as Ue
} from '../common/vendor.015340d9.js'
import {
  K as Fe,
  i as qe,
  P as S,
  _ as i,
  a as $,
  g as Ie,
  b as oe,
  c as Y,
  o as Me,
  p as Qe,
  d as Ye,
  e as ve,
  u as Ze,
  f as Je,
  h as eo,
  m as oo,
  j as no,
  k as to,
  r as ao,
  l as lo,
  n as re,
  q as io,
  w as ro,
  C as so,
  s as ee,
  t as co,
  v as uo,
  x as U,
  B as Ce,
  y as fo,
  E as mo,
  z as go,
  A as po,
  I as vo,
  D as ye,
  F as Co,
  G as yo,
  H as bo,
  J as xo,
  L as ho,
  M as $o,
  T as So,
  N as k,
  O as wo,
  Q as To
} from '../common/ProductsTable.f681faf0.js'
import '../main.c1853b91.js'
import '../common/antd.0267aafb.js'
import '../common/Dashboard.e7ef6e61.js'
const Bo = new Fe('antFadeIn', {
    '0%': { opacity: 0 },
    '100%': { opacity: 1 }
  }),
  Po = new Fe('antFadeOut', { '0%': { opacity: 1 }, '100%': { opacity: 0 } }),
  Fo = function(e) {
    let o = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1
    const { antCls: n } = e,
      t = `${n}-fade`,
      a = o ? '&' : ''
    return [
      qe(t, Bo, Po, e.motionDurationMid, o),
      {
        [`
        ${a}${t}-enter,
        ${a}${t}-appear
      `]: { opacity: 0, animationTimingFunction: 'linear' },
        [`${a}${t}-leave`]: { animationTimingFunction: 'linear' }
      }
    ]
  }
function se() {
  return {
    keyboard: { type: Boolean, default: void 0 },
    mask: { type: Boolean, default: void 0 },
    afterClose: Function,
    closable: { type: Boolean, default: void 0 },
    maskClosable: { type: Boolean, default: void 0 },
    visible: { type: Boolean, default: void 0 },
    destroyOnClose: { type: Boolean, default: void 0 },
    mousePosition: S.shape({ x: Number, y: Number }).loose,
    title: S.any,
    footer: S.any,
    transitionName: String,
    maskTransitionName: String,
    animation: S.any,
    maskAnimation: S.any,
    wrapStyle: { type: Object, default: void 0 },
    bodyStyle: { type: Object, default: void 0 },
    maskStyle: { type: Object, default: void 0 },
    prefixCls: String,
    wrapClassName: String,
    rootClassName: String,
    width: [String, Number],
    height: [String, Number],
    zIndex: Number,
    bodyProps: S.any,
    maskProps: S.any,
    wrapProps: S.any,
    getContainer: S.any,
    dialogStyle: { type: Object, default: void 0 },
    dialogClass: String,
    closeIcon: S.any,
    forceRender: { type: Boolean, default: void 0 },
    getOpenCount: Function,
    focusTriggerAfterClose: { type: Boolean, default: void 0 },
    onClose: Function,
    modalRender: Function
  }
}
function be(e, o, n) {
  let t = o
  return !t && n && (t = `${e}-${n}`), t
}
let xe = -1
function Io() {
  return (xe += 1), xe
}
function he(e, o) {
  let n = e[`page${o ? 'Y' : 'X'}Offset`]
  const t = `scroll${o ? 'Top' : 'Left'}`
  if (typeof n != 'number') {
    const a = e.document
    ;(n = a.documentElement[t]), typeof n != 'number' && (n = a.body[t])
  }
  return n
}
function Mo(e) {
  const o = e.getBoundingClientRect(),
    n = { left: o.left, top: o.top },
    t = e.ownerDocument,
    a = t.defaultView || t.parentWindow
  return (n.left += he(a)), (n.top += he(a, !0)), n
}
const No = { width: 0, height: 0, overflow: 'hidden', outline: 'none' },
  zo = { outline: 'none' },
  Ao = z({
    compatConfig: { MODE: 3 },
    name: 'DialogContent',
    inheritAttrs: !1,
    props: i(i({}, se()), {
      motionName: String,
      ariaId: String,
      onVisibleChanged: Function,
      onMousedown: Function,
      onMouseup: Function
    }),
    setup(e, o) {
      let { expose: n, slots: t, attrs: a } = o
      const d = _(),
        p = _(),
        v = _()
      n({
        focus: () => {
          var u
          ;(u = d.value) === null ||
            u === void 0 ||
            u.focus({ preventScroll: !0 })
        },
        changeActive: u => {
          const { activeElement: c } = document
          u && c === p.value
            ? d.value.focus({ preventScroll: !0 })
            : !u && c === d.value && p.value.focus({ preventScroll: !0 })
        }
      })
      const g = _(),
        r = q(() => {
          const { width: u, height: c } = e,
            y = {}
          return (
            u !== void 0 && (y.width = typeof u == 'number' ? `${u}px` : u),
            c !== void 0 && (y.height = typeof c == 'number' ? `${c}px` : c),
            g.value && (y.transformOrigin = g.value),
            y
          )
        }),
        s = () => {
          je(() => {
            if (v.value) {
              const u = Mo(v.value)
              g.value = e.mousePosition
                ? `${e.mousePosition.x - u.left}px ${e.mousePosition.y -
                    u.top}px`
                : ''
            }
          })
        },
        f = u => {
          e.onVisibleChanged(u)
        }
      return () => {
        var u, c, y, b
        const {
          prefixCls: h,
          footer: m = (u = t.footer) === null || u === void 0
            ? void 0
            : u.call(t),
          title: x = (c = t.title) === null || c === void 0
            ? void 0
            : c.call(t),
          ariaId: C,
          closable: w,
          closeIcon: B = (y = t.closeIcon) === null || y === void 0
            ? void 0
            : y.call(t),
          onClose: F,
          bodyStyle: M,
          bodyProps: A,
          onMousedown: O,
          onMouseup: R,
          visible: E,
          modalRender: W = t.modalRender,
          destroyOnClose: X,
          motionName: H
        } = e
        let j
        m && (j = l('div', { class: `${h}-footer` }, [m]))
        let V
        x &&
          (V = l('div', { class: `${h}-header` }, [
            l('div', { class: `${h}-title`, id: C }, [x])
          ]))
        let L
        w &&
          (L = l(
            'button',
            {
              type: 'button',
              onClick: F,
              'aria-label': 'Close',
              class: `${h}-close`
            },
            [B || l('span', { class: `${h}-close-x` }, null)]
          ))
        const N = l('div', { class: `${h}-content` }, [
            L,
            V,
            l('div', $({ class: `${h}-body`, style: M }, A), [
              (b = t.default) === null || b === void 0 ? void 0 : b.call(t)
            ]),
            j
          ]),
          ne = Ie(H)
        return l(
          Pe,
          $(
            $({}, ne),
            {},
            {
              onBeforeEnter: s,
              onAfterEnter: () => f(!0),
              onAfterLeave: () => f(!1)
            }
          ),
          {
            default: () => [
              E || !X
                ? Te(
                    l(
                      'div',
                      $(
                        $({}, a),
                        {},
                        {
                          ref: v,
                          key: 'dialog-element',
                          role: 'document',
                          style: [r.value, a.style],
                          class: [h, a.class],
                          onMousedown: O,
                          onMouseup: R
                        }
                      ),
                      [
                        l('div', { tabindex: 0, ref: d, style: zo }, [
                          W ? W({ originVNode: N }) : N
                        ]),
                        l('div', { tabindex: 0, ref: p, style: No }, null)
                      ]
                    ),
                    [[Be, E]]
                  )
                : null
            ]
          }
        )
      }
    }
  }),
  Oo = z({
    compatConfig: { MODE: 3 },
    name: 'DialogMask',
    props: {
      prefixCls: String,
      visible: Boolean,
      motionName: String,
      maskProps: Object
    },
    setup(e, o) {
      return () => {
        const { prefixCls: n, visible: t, maskProps: a, motionName: d } = e,
          p = Ie(d)
        return l(Pe, p, {
          default: () => [
            Te(l('div', $({ class: `${n}-mask` }, a), null), [[Be, t]])
          ]
        })
      }
    }
  }),
  $e = z({
    compatConfig: { MODE: 3 },
    name: 'VcDialog',
    inheritAttrs: !1,
    props: oe(
      i(i({}, se()), { getOpenCount: Function, scrollLocker: Object }),
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
    setup(e, o) {
      let { attrs: n, slots: t } = o
      const a = T(),
        d = T(),
        p = T(),
        v = T(e.visible),
        g = T(`vcDialogTitle${Io()}`),
        r = m => {
          var x, C
          if (m)
            Ye(d.value, document.activeElement) ||
              ((a.value = document.activeElement),
              (x = p.value) === null || x === void 0 || x.focus())
          else {
            const w = v.value
            if (
              ((v.value = !1), e.mask && a.value && e.focusTriggerAfterClose)
            ) {
              try {
                a.value.focus({ preventScroll: !0 })
              } catch {}
              a.value = null
            }
            w && ((C = e.afterClose) === null || C === void 0 || C.call(e))
          }
        },
        s = m => {
          var x
          ;(x = e.onClose) === null || x === void 0 || x.call(e, m)
        },
        f = T(!1),
        u = T(),
        c = () => {
          clearTimeout(u.value), (f.value = !0)
        },
        y = () => {
          u.value = setTimeout(() => {
            f.value = !1
          })
        },
        b = m => {
          if (!e.maskClosable) return null
          f.value ? (f.value = !1) : d.value === m.target && s(m)
        },
        h = m => {
          if (e.keyboard && m.keyCode === ve.ESC) {
            m.stopPropagation(), s(m)
            return
          }
          e.visible && m.keyCode === ve.TAB && p.value.changeActive(!m.shiftKey)
        }
      return (
        Q(
          () => e.visible,
          () => {
            e.visible && (v.value = !0)
          },
          { flush: 'post' }
        ),
        Ve(() => {
          var m
          clearTimeout(u.value),
            (m = e.scrollLocker) === null || m === void 0 || m.unLock()
        }),
        ke(() => {
          var m, x
          ;(m = e.scrollLocker) === null || m === void 0 || m.unLock(),
            v.value &&
              ((x = e.scrollLocker) === null || x === void 0 || x.lock())
        }),
        () => {
          const {
              prefixCls: m,
              mask: x,
              visible: C,
              maskTransitionName: w,
              maskAnimation: B,
              zIndex: F,
              wrapClassName: M,
              rootClassName: A,
              wrapStyle: O,
              closable: R,
              maskProps: E,
              maskStyle: W,
              transitionName: X,
              animation: H,
              wrapProps: j,
              title: V = t.title
            } = e,
            { style: L, class: N } = n
          return l('div', $({ class: [`${m}-root`, A] }, Qe(e, { data: !0 })), [
            l(
              Oo,
              {
                prefixCls: m,
                visible: x && C,
                motionName: be(m, w, B),
                style: i({ zIndex: F }, W),
                maskProps: E
              },
              null
            ),
            l(
              'div',
              $(
                {
                  tabIndex: -1,
                  onKeydown: h,
                  class: Y(`${m}-wrap`, M),
                  ref: d,
                  onClick: b,
                  role: 'dialog',
                  'aria-labelledby': V ? g.value : null,
                  style: i(i({ zIndex: F }, O), {
                    display: v.value ? null : 'none'
                  })
                },
                j
              ),
              [
                l(
                  Ao,
                  $(
                    $({}, Me(e, ['scrollLocker'])),
                    {},
                    {
                      style: L,
                      class: N,
                      onMousedown: c,
                      onMouseup: y,
                      ref: p,
                      closable: R,
                      ariaId: g.value,
                      prefixCls: m,
                      visible: C,
                      onClose: s,
                      onVisibleChanged: r,
                      motionName: be(m, X, H)
                    }
                  ),
                  t
                )
              ]
            )
          ])
        }
      )
    }
  }),
  Ho = se(),
  Ro = z({
    compatConfig: { MODE: 3 },
    name: 'DialogWrap',
    inheritAttrs: !1,
    props: oe(Ho, { visible: !1 }),
    setup(e, o) {
      let { attrs: n, slots: t } = o
      const a = _(e.visible)
      return (
        Ze({}, { inTriggerContext: !1 }),
        Q(
          () => e.visible,
          () => {
            e.visible && (a.value = !0)
          },
          { flush: 'post' }
        ),
        () => {
          const {
            visible: d,
            getContainer: p,
            forceRender: v,
            destroyOnClose: g = !1,
            afterClose: r
          } = e
          let s = i(i(i({}, e), n), { ref: '_component', key: 'dialog' })
          return p === !1
            ? l($e, $($({}, s), {}, { getOpenCount: () => 2 }), t)
            : !v && g && !a.value
            ? null
            : l(
                Je,
                { autoLock: !0, visible: d, forceRender: v, getContainer: p },
                {
                  default: f => (
                    (s = i(i(i({}, s), f), {
                      afterClose: () => {
                        r == null || r(), (a.value = !1)
                      }
                    })),
                    l($e, s, t)
                  )
                }
              )
        }
      )
    }
  }),
  Lo = Ro
function Se(e) {
  return {
    position: e,
    top: 0,
    insetInlineEnd: 0,
    bottom: 0,
    insetInlineStart: 0
  }
}
const _o = e => {
    const { componentCls: o } = e
    return [
      {
        [`${o}-root`]: {
          [`${o}${e.antCls}-zoom-enter, ${o}${e.antCls}-zoom-appear`]: {
            transform: 'none',
            opacity: 0,
            animationDuration: e.motionDurationSlow,
            userSelect: 'none'
          },
          [`${o}${e.antCls}-zoom-leave ${o}-content`]: {
            pointerEvents: 'none'
          },
          [`${o}-mask`]: i(i({}, Se('fixed')), {
            zIndex: e.zIndexPopupBase,
            height: '100%',
            backgroundColor: e.colorBgMask,
            [`${o}-hidden`]: { display: 'none' }
          }),
          [`${o}-wrap`]: i(i({}, Se('fixed')), {
            overflow: 'auto',
            outline: 0,
            WebkitOverflowScrolling: 'touch'
          })
        }
      },
      { [`${o}-root`]: Fo(e) }
    ]
  },
  Do = e => {
    const { componentCls: o } = e
    return [
      {
        [`${o}-root`]: {
          [`${o}-wrap`]: {
            zIndex: e.zIndexPopupBase,
            position: 'fixed',
            inset: 0,
            overflow: 'auto',
            outline: 0,
            WebkitOverflowScrolling: 'touch'
          },
          [`${o}-wrap-rtl`]: { direction: 'rtl' },
          [`${o}-centered`]: {
            textAlign: 'center',
            '&::before': {
              display: 'inline-block',
              width: 0,
              height: '100%',
              verticalAlign: 'middle',
              content: '""'
            },
            [o]: {
              top: 0,
              display: 'inline-block',
              paddingBottom: 0,
              textAlign: 'start',
              verticalAlign: 'middle'
            }
          },
          [`@media (max-width: ${e.screenSMMax})`]: {
            [o]: {
              maxWidth: 'calc(100vw - 16px)',
              margin: `${e.marginXS} auto`
            },
            [`${o}-centered`]: { [o]: { flex: 1 } }
          }
        }
      },
      {
        [o]: i(i({}, ao(e)), {
          pointerEvents: 'none',
          position: 'relative',
          top: 100,
          width: 'auto',
          maxWidth: `calc(100vw - ${e.margin * 2}px)`,
          margin: '0 auto',
          paddingBottom: e.paddingLG,
          [`${o}-title`]: {
            margin: 0,
            color: e.modalHeadingColor,
            fontWeight: e.fontWeightStrong,
            fontSize: e.modalHeaderTitleFontSize,
            lineHeight: e.modalHeaderTitleLineHeight,
            wordWrap: 'break-word'
          },
          [`${o}-content`]: {
            position: 'relative',
            backgroundColor: e.modalContentBg,
            backgroundClip: 'padding-box',
            border: 0,
            borderRadius: e.borderRadiusLG,
            boxShadow: e.boxShadowSecondary,
            pointerEvents: 'auto',
            padding: `${e.paddingMD}px ${e.paddingContentHorizontalLG}px`
          },
          [`${o}-close`]: i(
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
            to(e)
          ),
          [`${o}-header`]: {
            color: e.colorText,
            background: e.modalHeaderBg,
            borderRadius: `${e.borderRadiusLG}px ${e.borderRadiusLG}px 0 0`,
            marginBottom: e.marginXS
          },
          [`${o}-body`]: {
            fontSize: e.fontSize,
            lineHeight: e.lineHeight,
            wordWrap: 'break-word'
          },
          [`${o}-footer`]: {
            textAlign: 'end',
            background: e.modalFooterBg,
            marginTop: e.marginSM,
            [`${e.antCls}-btn + ${e.antCls}-btn:not(${e.antCls}-dropdown-trigger)`]: {
              marginBottom: 0,
              marginInlineStart: e.marginXS
            }
          },
          [`${o}-open`]: { overflow: 'hidden' }
        })
      },
      {
        [`${o}-pure-panel`]: {
          top: 'auto',
          padding: 0,
          display: 'flex',
          flexDirection: 'column',
          [`${o}-content,
          ${o}-body,
          ${o}-confirm-body-wrapper`]: {
            display: 'flex',
            flexDirection: 'column',
            flex: 'auto'
          },
          [`${o}-confirm-body`]: { marginBottom: 'auto' }
        }
      }
    ]
  },
  Eo = e => {
    const { componentCls: o } = e,
      n = `${o}-confirm`
    return {
      [n]: {
        '&-rtl': { direction: 'rtl' },
        [`${e.antCls}-modal-header`]: { display: 'none' },
        [`${n}-body-wrapper`]: i({}, lo()),
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
      [`${o}-zoom-leave ${o}-btns`]: { pointerEvents: 'none' }
    }
  },
  Wo = e => {
    const { componentCls: o } = e
    return {
      [`${o}-root`]: {
        [`${o}-wrap-rtl`]: {
          direction: 'rtl',
          [`${o}-confirm-body`]: { direction: 'rtl' }
        }
      }
    }
  },
  jo = e => {
    const { componentCls: o, antCls: n } = e,
      t = `${o}-confirm`
    return {
      [o]: {
        [`${o}-content`]: { padding: 0 },
        [`${o}-header`]: {
          padding: e.modalHeaderPadding,
          borderBottom: `${e.modalHeaderBorderWidth}px ${e.modalHeaderBorderStyle} ${e.modalHeaderBorderColorSplit}`,
          marginBottom: 0
        },
        [`${o}-body`]: { padding: e.modalBodyPadding },
        [`${o}-footer`]: {
          padding: `${e.modalFooterPaddingVertical}px ${e.modalFooterPaddingHorizontal}px`,
          borderTop: `${e.modalFooterBorderWidth}px ${e.modalFooterBorderStyle} ${e.modalFooterBorderColorSplit}`,
          borderRadius: `0 0 ${e.borderRadiusLG}px ${e.borderRadiusLG}px`,
          marginTop: 0
        }
      },
      [t]: {
        [`${n}-modal-body`]: {
          padding: `${e.padding * 2}px ${e.padding * 2}px ${e.paddingLG}px`
        },
        [`${t}-body`]: {
          [`> ${e.iconCls}`]: {
            marginInlineEnd: e.margin,
            [`+ ${t}-title + ${t}-content`]: {
              marginInlineStart: e.modalConfirmIconSize + e.margin
            }
          }
        },
        [`${t}-btns`]: { marginTop: e.marginLG }
      }
    }
  },
  Vo = eo('Modal', e => {
    const o = e.padding,
      n = e.fontSizeHeading5,
      t = e.lineHeightHeading5,
      a = oo(e, {
        modalBodyPadding: e.paddingLG,
        modalHeaderBg: e.colorBgElevated,
        modalHeaderPadding: `${o}px ${e.paddingLG}px`,
        modalHeaderBorderWidth: e.lineWidth,
        modalHeaderBorderStyle: e.lineType,
        modalHeaderTitleLineHeight: t,
        modalHeaderTitleFontSize: n,
        modalHeaderBorderColorSplit: e.colorSplit,
        modalHeaderCloseSize: t * n + o * 2,
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
    return [Do(a), Eo(a), Wo(a), _o(a), e.wireframe && jo(a), no(a, 'zoom')]
  })
var ko =
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
let ie
const Go = e => {
  ;(ie = { x: e.pageX, y: e.pageY }), setTimeout(() => (ie = null), 100)
}
co() && uo(document.documentElement, 'click', Go, !0)
const Xo = () => ({
    prefixCls: String,
    visible: { type: Boolean, default: void 0 },
    open: { type: Boolean, default: void 0 },
    confirmLoading: { type: Boolean, default: void 0 },
    title: S.any,
    closable: { type: Boolean, default: void 0 },
    closeIcon: S.any,
    onOk: Function,
    onCancel: Function,
    'onUpdate:visible': Function,
    'onUpdate:open': Function,
    onChange: Function,
    afterClose: Function,
    centered: { type: Boolean, default: void 0 },
    width: [String, Number],
    footer: S.any,
    okText: S.any,
    okType: String,
    cancelText: S.any,
    icon: S.any,
    maskClosable: { type: Boolean, default: void 0 },
    forceRender: { type: Boolean, default: void 0 },
    okButtonProps: U(),
    cancelButtonProps: U(),
    destroyOnClose: { type: Boolean, default: void 0 },
    wrapClassName: String,
    maskTransitionName: String,
    transitionName: String,
    getContainer: {
      type: [String, Function, Boolean, Object],
      default: void 0
    },
    zIndex: Number,
    bodyStyle: U(),
    maskStyle: U(),
    mask: { type: Boolean, default: void 0 },
    keyboard: { type: Boolean, default: void 0 },
    wrapProps: Object,
    focusTriggerAfterClose: { type: Boolean, default: void 0 },
    modalRender: Function,
    mousePosition: U()
  }),
  P = z({
    compatConfig: { MODE: 3 },
    name: 'AModal',
    inheritAttrs: !1,
    props: oe(Xo(), { width: 520, confirmLoading: !1, okType: 'primary' }),
    setup(e, o) {
      let { emit: n, slots: t, attrs: a } = o
      const [d] = re('Modal'),
        {
          prefixCls: p,
          rootPrefixCls: v,
          direction: g,
          getPopupContainer: r
        } = io('modal', e),
        [s, f] = Vo(p)
      ro(e.visible === void 0)
      const u = b => {
          n('update:visible', !1),
            n('update:open', !1),
            n('cancel', b),
            n('change', !1)
        },
        c = b => {
          n('ok', b)
        },
        y = () => {
          var b, h
          const {
            okText: m = (b = t.okText) === null || b === void 0
              ? void 0
              : b.call(t),
            okType: x,
            cancelText: C = (h = t.cancelText) === null || h === void 0
              ? void 0
              : h.call(t),
            confirmLoading: w
          } = e
          return l(Ge, null, [
            l(Ce, $({ onClick: u }, e.cancelButtonProps), {
              default: () => [C || d.value.cancelText]
            }),
            l(
              Ce,
              $($({}, fo(x)), {}, { loading: w, onClick: c }, e.okButtonProps),
              { default: () => [m || d.value.okText] }
            )
          ])
        }
      return () => {
        var b, h
        const {
            prefixCls: m,
            visible: x,
            open: C,
            wrapClassName: w,
            centered: B,
            getContainer: F,
            closeIcon: M = (b = t.closeIcon) === null || b === void 0
              ? void 0
              : b.call(t),
            focusTriggerAfterClose: A = !0
          } = e,
          O = ko(e, [
            'prefixCls',
            'visible',
            'open',
            'wrapClassName',
            'centered',
            'getContainer',
            'closeIcon',
            'focusTriggerAfterClose'
          ]),
          R = Y(w, {
            [`${p.value}-centered`]: !!B,
            [`${p.value}-wrap-rtl`]: g.value === 'rtl'
          })
        return s(
          l(
            Lo,
            $(
              $($({}, O), a),
              {},
              {
                rootClassName: f.value,
                class: Y(f.value, a.class),
                getContainer: F || (r == null ? void 0 : r.value),
                prefixCls: p.value,
                wrapClassName: R,
                visible: C ?? x,
                onClose: u,
                focusTriggerAfterClose: A,
                transitionName: ee(v.value, 'zoom', e.transitionName),
                maskTransitionName: ee(v.value, 'fade', e.maskTransitionName),
                mousePosition:
                  (h = O.mousePosition) !== null && h !== void 0 ? h : ie
              }
            ),
            i(i({}, t), {
              footer: t.footer || y,
              closeIcon: () =>
                l('span', { class: `${p.value}-close-x` }, [
                  M || l(so, { class: `${p.value}-close-icon` }, null)
                ])
            })
          )
        )
      }
    }
  })
function G(e) {
  return typeof e == 'function' ? e() : e
}
const Ne = z({
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
    setup(e, o) {
      let { attrs: n } = o
      const [t] = re('Modal')
      return () => {
        const {
          icon: a,
          onCancel: d,
          onOk: p,
          close: v,
          okText: g,
          closable: r = !1,
          zIndex: s,
          afterClose: f,
          keyboard: u,
          centered: c,
          getContainer: y,
          maskStyle: b,
          okButtonProps: h,
          cancelButtonProps: m,
          okCancel: x,
          width: C = 416,
          mask: w = !0,
          maskClosable: B = !1,
          type: F,
          open: M,
          title: A,
          content: O,
          direction: R,
          closeIcon: E,
          modalRender: W,
          focusTriggerAfterClose: X,
          rootPrefixCls: H,
          bodyStyle: j,
          wrapClassName: V,
          footer: L
        } = e
        let N = a
        if (!a && a !== null)
          switch (F) {
            case 'info':
              N = l(vo, null, null)
              break
            case 'success':
              N = l(po, null, null)
              break
            case 'error':
              N = l(go, null, null)
              break
            default:
              N = l(mo, null, null)
          }
        const ne = e.okType || 'primary',
          te = e.prefixCls || 'ant-modal',
          K = `${te}-confirm`,
          _e = n.style || {},
          ce = x ?? F === 'confirm',
          de = e.autoFocusButton === null ? !1 : e.autoFocusButton || 'ok',
          J = `${te}-confirm`,
          De = Y(J, `${J}-${e.type}`, { [`${J}-rtl`]: R === 'rtl' }, n.class),
          ae = t.value,
          Ee =
            ce &&
            l(
              ye,
              {
                actionFn: d,
                close: v,
                autofocus: de === 'cancel',
                buttonProps: m,
                prefixCls: `${H}-btn`
              },
              { default: () => [G(e.cancelText) || ae.cancelText] }
            )
        return l(
          P,
          {
            prefixCls: te,
            class: De,
            wrapClassName: Y({ [`${J}-centered`]: !!c }, V),
            onCancel: We => (v == null ? void 0 : v({ triggerCancel: !0 }, We)),
            open: M,
            title: '',
            footer: '',
            transitionName: ee(H, 'zoom', e.transitionName),
            maskTransitionName: ee(H, 'fade', e.maskTransitionName),
            mask: w,
            maskClosable: B,
            maskStyle: b,
            style: _e,
            bodyStyle: j,
            width: C,
            zIndex: s,
            afterClose: f,
            keyboard: u,
            centered: c,
            getContainer: y,
            closable: r,
            closeIcon: E,
            modalRender: W,
            focusTriggerAfterClose: X
          },
          {
            default: () => [
              l('div', { class: `${K}-body-wrapper` }, [
                l('div', { class: `${K}-body` }, [
                  G(N),
                  A === void 0
                    ? null
                    : l('span', { class: `${K}-title` }, [G(A)]),
                  l('div', { class: `${K}-content` }, [G(O)])
                ]),
                L !== void 0
                  ? G(L)
                  : l('div', { class: `${K}-btns` }, [
                      Ee,
                      l(
                        ye,
                        {
                          type: ne,
                          actionFn: p,
                          close: v,
                          autofocus: de === 'ok',
                          buttonProps: h,
                          prefixCls: `${H}-btn`
                        },
                        {
                          default: () => [
                            G(g) || (ce ? ae.okText : ae.justOkText)
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
  Ko = [],
  D = Ko,
  Uo = e => {
    const o = document.createDocumentFragment()
    let n = i(i({}, Me(e, ['parentContext', 'appContext'])), {
        close: d,
        open: !0
      }),
      t = null
    function a() {
      t && (ue(null, o), (t = null))
      for (var r = arguments.length, s = new Array(r), f = 0; f < r; f++)
        s[f] = arguments[f]
      const u = s.some(c => c && c.triggerCancel)
      e.onCancel && u && e.onCancel(() => {}, ...s.slice(1))
      for (let c = 0; c < D.length; c++)
        if (D[c] === d) {
          D.splice(c, 1)
          break
        }
    }
    function d() {
      for (var r = arguments.length, s = new Array(r), f = 0; f < r; f++)
        s[f] = arguments[f]
      ;(n = i(i({}, n), {
        open: !1,
        afterClose: () => {
          typeof e.afterClose == 'function' && e.afterClose(), a.apply(this, s)
        }
      })),
        n.visible && delete n.visible,
        p(n)
    }
    function p(r) {
      typeof r == 'function' ? (n = r(n)) : (n = i(i({}, n), r)),
        t && Co(t, n, o)
    }
    const v = r => {
      const s = xo,
        f = s.prefixCls,
        u = r.prefixCls || `${f}-modal`,
        c = s.iconPrefixCls,
        y = yo()
      return l(bo, $($({}, s), {}, { prefixCls: f }), {
        default: () => [
          l(
            Ne,
            $(
              $({}, r),
              {},
              {
                rootPrefixCls: f,
                prefixCls: u,
                iconPrefixCls: c,
                locale: y,
                cancelText: r.cancelText || y.cancelText
              }
            ),
            null
          )
        ]
      })
    }
    function g(r) {
      const s = l(v, i({}, r))
      return (
        (s.appContext = e.parentContext || e.appContext || s.appContext),
        ue(s, o),
        s
      )
    }
    return (t = g(n)), D.push(d), { destroy: d, update: p }
  },
  Z = Uo
function ze(e) {
  return i(i({}, e), { type: 'warning' })
}
function Ae(e) {
  return i(i({}, e), { type: 'info' })
}
function Oe(e) {
  return i(i({}, e), { type: 'success' })
}
function He(e) {
  return i(i({}, e), { type: 'error' })
}
function Re(e) {
  return i(i({}, e), { type: 'confirm' })
}
const qo = () => ({
    config: Object,
    afterClose: Function,
    destroyAction: Function,
    open: Boolean
  }),
  Qo = z({
    name: 'HookModal',
    inheritAttrs: !1,
    props: oe(qo(), { config: { width: 520, okType: 'primary' } }),
    setup(e, o) {
      let { expose: n } = o
      var t
      const a = q(() => e.open),
        d = q(() => e.config),
        { direction: p, getPrefixCls: v } = ho(),
        g = v('modal'),
        r = v(),
        s = () => {
          var y, b
          e == null || e.afterClose(),
            (b = (y = d.value).afterClose) === null || b === void 0 || b.call(y)
        },
        f = function() {
          e.destroyAction(...arguments)
        }
      n({ destroy: f })
      const u =
          (t = d.value.okCancel) !== null && t !== void 0
            ? t
            : d.value.type === 'confirm',
        [c] = re('Modal', $o.Modal)
      return () =>
        l(
          Ne,
          $(
            $({ prefixCls: g, rootPrefixCls: r }, d.value),
            {},
            {
              close: f,
              open: a.value,
              afterClose: s,
              okText:
                d.value.okText ||
                (u
                  ? c == null
                    ? void 0
                    : c.value.okText
                  : c == null
                  ? void 0
                  : c.value.justOkText),
              direction: d.value.direction || p.value,
              cancelText:
                d.value.cancelText || (c == null ? void 0 : c.value.cancelText)
            }
          ),
          null
        )
    }
  })
let we = 0
const Yo = z({
  name: 'ElementsHolder',
  inheritAttrs: !1,
  setup(e, o) {
    let { expose: n } = o
    const t = T([])
    return (
      n({
        addModal: d => (
          t.value.push(d),
          (t.value = t.value.slice()),
          () => {
            t.value = t.value.filter(p => p !== d)
          }
        )
      }),
      () => t.value.map(d => d())
    )
  }
})
function Zo() {
  const e = T(null),
    o = T([])
  Q(
    o,
    () => {
      o.value.length &&
        ([...o.value].forEach(p => {
          p()
        }),
        (o.value = []))
    },
    { immediate: !0 }
  )
  const n = d =>
      function(v) {
        var g
        we += 1
        const r = T(!0),
          s = T(null),
          f = T(I(v)),
          u = T({})
        Q(
          () => v,
          C => {
            h(i(i({}, Xe(C) ? C.value : C), u.value))
          }
        )
        const c = function() {
          r.value = !1
          for (var C = arguments.length, w = new Array(C), B = 0; B < C; B++)
            w[B] = arguments[B]
          const F = w.some(M => M && M.triggerCancel)
          f.value.onCancel && F && f.value.onCancel(() => {}, ...w.slice(1))
        }
        let y
        const b = () =>
          l(
            Qo,
            {
              key: `modal-${we}`,
              config: d(f.value),
              ref: s,
              open: r.value,
              destroyAction: c,
              afterClose: () => {
                y == null || y()
              }
            },
            null
          )
        ;(y = (g = e.value) === null || g === void 0 ? void 0 : g.addModal(b)),
          y && D.push(y)
        const h = C => {
          f.value = i(i({}, f.value), C)
        }
        return {
          destroy: () => {
            s.value ? c() : (o.value = [...o.value, c])
          },
          update: C => {
            ;(u.value = C),
              s.value ? h(C) : (o.value = [...o.value, () => h(C)])
          }
        }
      },
    t = q(() => ({
      info: n(Ae),
      success: n(Oe),
      error: n(He),
      warning: n(ze),
      confirm: n(Re)
    })),
    a = Symbol('modalHolderKey')
  return [t.value, () => l(Yo, { key: a, ref: e }, null)]
}
function Le(e) {
  return Z(ze(e))
}
P.useModal = Zo
P.info = function(o) {
  return Z(Ae(o))
}
P.success = function(o) {
  return Z(Oe(o))
}
P.error = function(o) {
  return Z(He(o))
}
P.warning = Le
P.warn = Le
P.confirm = function(o) {
  return Z(Re(o))
}
P.destroyAll = function() {
  for (; D.length; ) {
    const o = D.pop()
    o && o()
  }
}
P.install = function(e) {
  return e.component(P.name, P), e
}
const Jo = { style: { 'margin-bottom': '16px' } },
  ln = z({
    __name: 'RequestChangeModal',
    props: { open: { type: Boolean }, product: {} },
    emits: ['update:open', 'confirm'],
    setup(e, { emit: o }) {
      const n = e,
        t = _(''),
        a = _(!1)
      Q(
        () => n.product,
        g => {
          if (g) {
            let r = ''
            g.ai_review &&
              typeof g.ai_review == 'object' &&
              'vendor_feedback' in g.ai_review &&
              g.ai_review.vendor_feedback &&
              (r = g.ai_review.vendor_feedback),
              (t.value = r)
            const s =
              g.ai_review &&
              typeof g.ai_review == 'object' &&
              'suggestions' in g.ai_review &&
              Array.isArray(g.ai_review.suggestions) &&
              g.ai_review.suggestions.length > 0
            a.value = !!s
          } else (t.value = ''), (a.value = !1)
        },
        { immediate: !0 }
      )
      const d = () => {
          o('confirm', t.value, a.value), o('update:open', !1)
        },
        p = () => {
          o('update:open', !1)
        },
        v = q(
          () =>
            n.product &&
            n.product.ai_review &&
            typeof n.product.ai_review == 'object' &&
            'suggestions' in n.product.ai_review &&
            Array.isArray(n.product.ai_review.suggestions) &&
            n.product.ai_review.suggestions.length > 0
        )
      return (g, r) => (
        fe(),
        me(
          I(P),
          {
            open: g.open,
            title: I(k)('requestChange'),
            'ok-text': I(k)('send') || 'Send',
            'cancel-text': I(k)('cancel') || 'Cancel',
            onOk: d,
            onCancel: p
          },
          {
            default: le(() => [
              Ke('div', Jo, [
                l(I(So).Text, null, {
                  default: le(() => [
                    ge(
                      pe(
                        I(k)('changeRequestMessage') ||
                          'Please provide details about what needs to be changed:'
                      ),
                      1
                    )
                  ]),
                  _: 1
                })
              ]),
              l(
                I(wo).TextArea,
                {
                  value: t.value,
                  'onUpdate:value': r[0] || (r[0] = s => (t.value = s)),
                  placeholder:
                    I(k)('enterChangeRequest') ||
                    'Enter change request message...',
                  rows: 4,
                  maxlength: 500,
                  style: { 'margin-bottom': '16px' }
                },
                null,
                8,
                ['value', 'placeholder']
              ),
              v.value
                ? (fe(),
                  me(
                    I(To),
                    {
                      key: 0,
                      checked: a.value,
                      'onUpdate:checked': r[1] || (r[1] = s => (a.value = s))
                    },
                    {
                      default: le(() => [
                        ge(
                          pe(
                            I(k)('includeSuggestions') ||
                              'Include AI review suggestions in email'
                          ),
                          1
                        )
                      ]),
                      _: 1
                    },
                    8,
                    ['checked']
                  ))
                : Ue('', !0)
            ]),
            _: 1
          },
          8,
          ['open', 'title', 'ok-text', 'cancel-text']
        )
      )
    }
  })
export { ln as default }

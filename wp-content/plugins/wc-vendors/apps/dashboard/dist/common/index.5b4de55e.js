import {
  P as j,
  a as B,
  A as he,
  _ as l,
  c as ne,
  m as ge,
  g as dt,
  r as ct,
  M as Dt,
  B as ut,
  d as Mt,
  q as Ue,
  ad as Lt,
  a5 as ee,
  C as Wt,
  w as ae,
  u as _e,
  z as Vt,
  F as pt,
  G as we,
  ag as Gt,
  ah as Kt
} from './Dashboard.071f9192.js'
import {
  d as Y,
  s as Q,
  c as b,
  r as V,
  w as oe,
  g as G,
  z as je,
  p as Be,
  l as ye,
  j as Ae,
  m as me,
  k as Fe,
  n as be,
  v as Ne,
  V as Xt,
  e as Ut,
  F as Ye,
  E as Yt
} from './vendor.0319ebde.js'
import {
  o as q,
  c as qe,
  w as te,
  R as ft,
  K as se,
  u as qt,
  C as Ee
} from './shallowequal.234d6013.js'
import { y as Zt, z as Qt, A as Jt, B as kt, G as en } from './antd.ecdb83f5.js'
const gt = e => ({
  color: e.colorLink,
  textDecoration: 'none',
  outline: 'none',
  cursor: 'pointer',
  transition: `color ${e.motionDurationSlow}`,
  '&:focus, &:hover': { color: e.colorLinkHover },
  '&:active': { color: e.colorLinkActive }
})
var tn =
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
const nn = Y({
    compatConfig: { MODE: 3 },
    props: {
      disabled: j.looseBool,
      type: j.string,
      value: j.any,
      tag: { type: String, default: 'input' },
      size: j.string,
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
      const o = Q(null)
      return (
        n({
          focus: () => {
            o.value && o.value.focus()
          },
          blur: () => {
            o.value && o.value.blur()
          },
          input: o,
          setSelectionRange: (d, f, g) => {
            var h
            ;(h = o.value) === null ||
              h === void 0 ||
              h.setSelectionRange(d, f, g)
          },
          select: () => {
            var d
            ;(d = o.value) === null || d === void 0 || d.select()
          },
          getSelectionStart: () => {
            var d
            return (d = o.value) === null || d === void 0
              ? void 0
              : d.selectionStart
          },
          getSelectionEnd: () => {
            var d
            return (d = o.value) === null || d === void 0
              ? void 0
              : d.selectionEnd
          },
          getScrollTop: () => {
            var d
            return (d = o.value) === null || d === void 0 ? void 0 : d.scrollTop
          }
        }),
        () => {
          const { tag: d, value: f } = e,
            g = tn(e, ['tag', 'value'])
          return b(d, B(B({}, g), {}, { ref: o, value: f }), null)
        }
      )
    }
  }),
  on = nn
function Fo(e) {
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
function rn(e) {
  return Array.prototype.slice
    .apply(e)
    .map(n => `${n}: ${e.getPropertyValue(n)};`)
    .join('')
}
function ln(e) {
  return Object.keys(e).reduce((t, n) => {
    const o = e[n]
    return typeof o > 'u' || o === null || (t += `${n}: ${e[n]};`), t
  }, '')
}
var an =
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
const sn = Y({
    compatConfig: { MODE: 3 },
    inheritAttrs: !1,
    props: {
      disabled: j.looseBool,
      type: j.string,
      value: j.any,
      lazy: j.bool.def(!0),
      tag: { type: String, default: 'input' },
      size: j.string,
      style: j.oneOfType([String, Object]),
      class: j.string
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
      const a = Q(null),
        s = V(),
        i = V(!1)
      oe(
        [() => e.value, i],
        () => {
          i.value || (s.value = e.value)
        },
        { immediate: !0 }
      )
      const d = u => {
          n('change', u)
        },
        f = u => {
          ;(i.value = !0), (u.target.composing = !0), n('compositionstart', u)
        },
        g = u => {
          ;(i.value = !1), (u.target.composing = !1), n('compositionend', u)
          const A = document.createEvent('HTMLEvents')
          A.initEvent('input', !0, !0), u.target.dispatchEvent(A), d(u)
        },
        h = u => {
          if (i.value && e.lazy) {
            s.value = u.target.value
            return
          }
          n('input', u)
        },
        m = u => {
          n('blur', u)
        },
        w = u => {
          n('focus', u)
        },
        O = () => {
          a.value && a.value.focus()
        },
        R = () => {
          a.value && a.value.blur()
        },
        P = u => {
          n('keydown', u)
        },
        F = u => {
          n('keyup', u)
        },
        x = (u, A, Z) => {
          var N
          ;(N = a.value) === null ||
            N === void 0 ||
            N.setSelectionRange(u, A, Z)
        },
        y = () => {
          var u
          ;(u = a.value) === null || u === void 0 || u.select()
        }
      r({
        focus: O,
        blur: R,
        input: G(() => {
          var u
          return (u = a.value) === null || u === void 0 ? void 0 : u.input
        }),
        setSelectionRange: x,
        select: y,
        getSelectionStart: () => {
          var u
          return (u = a.value) === null || u === void 0
            ? void 0
            : u.getSelectionStart()
        },
        getSelectionEnd: () => {
          var u
          return (u = a.value) === null || u === void 0
            ? void 0
            : u.getSelectionEnd()
        },
        getScrollTop: () => {
          var u
          return (u = a.value) === null || u === void 0
            ? void 0
            : u.getScrollTop()
        }
      })
      const E = u => {
          n('mousedown', u)
        },
        I = u => {
          n('paste', u)
        },
        $ = G(() =>
          e.style && typeof e.style != 'string' ? ln(e.style) : e.style
        )
      return () => {
        const u = an(e, ['style', 'lazy'])
        return b(
          on,
          B(
            B(B({}, u), o),
            {},
            {
              style: $.value,
              onInput: h,
              onChange: d,
              onBlur: m,
              onFocus: w,
              ref: a,
              value: s.value,
              onCompositionstart: f,
              onCompositionend: g,
              onKeyup: F,
              onKeydown: P,
              onPaste: I,
              onMousedown: E
            }
          ),
          null
        )
      }
    }
  }),
  dn = sn
function Ze(e) {
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
        cn(e, r, n[r])
      })
  }
  return e
}
function cn(e, t, n) {
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
var De = function(t, n) {
  var o = Ze({}, t, n.attrs)
  return b(he, Ze({}, o, { icon: Zt }), null)
}
De.displayName = 'CheckOutlined'
De.inheritAttrs = !1
const un = De
function pn(e) {
  const t = Symbol('contextKey')
  return {
    useProvide: (r, a) => {
      const s = je({})
      return (
        Be(t, s),
        ye(() => {
          l(s, r, a || {})
        }),
        s
      )
    },
    useInject: () => Ae(t, e) || {}
  }
}
const Qe = Symbol('ContextProps'),
  Je = Symbol('InternalContextProps'),
  ke = {
    id: G(() => {}),
    onFieldBlur: () => {},
    onFieldChange: () => {},
    clearValidate: () => {}
  },
  et = { addFormItemField: () => {}, removeFormItemField: () => {} },
  fn = () => {
    const e = Ae(Je, et),
      t = Symbol('FormItemFieldKey'),
      n = Fe()
    return (
      e.addFormItemField(t, n.type),
      me(() => {
        e.removeFormItemField(t)
      }),
      Be(Je, et),
      Be(Qe, ke),
      Ae(Qe, ke)
    )
  },
  Me = pn({}),
  No = Y({
    name: 'NoFormStatus',
    setup(e, t) {
      let { slots: n } = t
      return (
        Me.useProvide({}),
        () => {
          var o
          return (o = n.default) === null || o === void 0 ? void 0 : o.call(n)
        }
      )
    }
  })
function mt(e, t, n) {
  return ne({
    [`${e}-status-success`]: t === 'success',
    [`${e}-status-warning`]: t === 'warning',
    [`${e}-status-error`]: t === 'error',
    [`${e}-status-validating`]: t === 'validating',
    [`${e}-has-feedback`]: n
  })
}
const bt = (e, t) => t || e
function gn(e, t, n) {
  const { focusElCls: o, focus: r, borderElCls: a } = n,
    s = a ? '> *' : '',
    i = ['hover', r ? 'focus' : null, 'active']
      .filter(Boolean)
      .map(d => `&:${d} ${s}`)
      .join(',')
  return {
    [`&-item:not(${t}-last-item)`]: { marginInlineEnd: -e.lineWidth },
    '&-item': l(
      l({ [i]: { zIndex: 2 } }, o ? { [`&${o}`]: { zIndex: 2 } } : {}),
      { [`&[disabled] ${s}`]: { zIndex: 0 } }
    )
  }
}
function mn(e, t, n) {
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
function bn(e) {
  let t =
    arguments.length > 1 && arguments[1] !== void 0
      ? arguments[1]
      : { focus: !0 }
  const { componentCls: n } = e,
    o = `${n}-compact`
  return { [o]: l(l({}, gn(e, o, t)), mn(n, o, t)) }
}
const hn = e => ({
    '&::-moz-placeholder': { opacity: 1 },
    '&::placeholder': { color: e, userSelect: 'none' },
    '&:placeholder-shown': { textOverflow: 'ellipsis' }
  }),
  Le = e => ({
    borderColor: e.inputBorderHoverColor,
    borderInlineEndWidth: e.lineWidth
  }),
  He = e => ({
    borderColor: e.inputBorderHoverColor,
    boxShadow: `0 0 0 ${e.controlOutlineWidth}px ${e.controlOutline}`,
    borderInlineEndWidth: e.lineWidth,
    outline: 0
  }),
  yn = e => ({
    color: e.colorTextDisabled,
    backgroundColor: e.colorBgContainerDisabled,
    borderColor: e.colorBorder,
    boxShadow: 'none',
    cursor: 'not-allowed',
    opacity: 1,
    '&:hover': l({}, Le(ge(e, { inputBorderHoverColor: e.colorBorder })))
  }),
  ht = e => {
    const {
      inputPaddingVerticalLG: t,
      fontSizeLG: n,
      lineHeightLG: o,
      borderRadiusLG: r,
      inputPaddingHorizontalLG: a
    } = e
    return {
      padding: `${t}px ${a}px`,
      fontSize: n,
      lineHeight: o,
      borderRadius: r
    }
  },
  yt = e => ({
    padding: `${e.inputPaddingVerticalSM}px ${e.controlPaddingHorizontalSM -
      1}px`,
    borderRadius: e.borderRadiusSM
  }),
  vt = (e, t) => {
    const {
      componentCls: n,
      colorError: o,
      colorWarning: r,
      colorErrorOutline: a,
      colorWarningOutline: s,
      colorErrorBorderHover: i,
      colorWarningBorderHover: d
    } = e
    return {
      [`&-status-error:not(${t}-disabled):not(${t}-borderless)${t}`]: {
        borderColor: o,
        '&:hover': { borderColor: i },
        '&:focus, &-focused': l(
          {},
          He(
            ge(e, {
              inputBorderActiveColor: o,
              inputBorderHoverColor: o,
              controlOutline: a
            })
          )
        ),
        [`${n}-prefix`]: { color: o }
      },
      [`&-status-warning:not(${t}-disabled):not(${t}-borderless)${t}`]: {
        borderColor: r,
        '&:hover': { borderColor: d },
        '&:focus, &-focused': l(
          {},
          He(
            ge(e, {
              inputBorderActiveColor: r,
              inputBorderHoverColor: r,
              controlOutline: s
            })
          )
        ),
        [`${n}-prefix`]: { color: r }
      }
    }
  },
  St = e =>
    l(
      l(
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
        hn(e.colorTextPlaceholder)
      ),
      {
        '&:hover': l({}, Le(e)),
        '&:focus, &-focused': l({}, He(e)),
        '&-disabled, &[disabled]': l({}, yn(e)),
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
        '&-lg': l({}, ht(e)),
        '&-sm': l({}, yt(e)),
        '&-rtl': { direction: 'rtl' },
        '&-textarea-rtl': { direction: 'rtl' }
      }
    ),
  vn = e => {
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
      [`&-lg ${t}, &-lg > ${t}-group-addon`]: l({}, ht(e)),
      [`&-sm ${t}, &-sm > ${t}-group-addon`]: l({}, yt(e)),
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
      [`&${t}-group-compact`]: l(l({ display: 'block' }, Dt()), {
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
  Sn = e => {
    const { componentCls: t, controlHeightSM: n, lineWidth: o } = e,
      r = 16,
      a = (n - o * 2 - r) / 2
    return {
      [t]: l(l(l(l({}, ct(e)), St(e)), vt(e, t)), {
        '&[type="color"]': {
          height: e.controlHeight,
          [`&${t}-lg`]: { height: e.controlHeightLG },
          [`&${t}-sm`]: { height: n, paddingTop: a, paddingBottom: a }
        }
      })
    }
  },
  xn = e => {
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
  $n = e => {
    const {
      componentCls: t,
      inputAffixPadding: n,
      colorTextDescription: o,
      motionDurationSlow: r,
      colorIcon: a,
      colorIconHover: s,
      iconCls: i
    } = e
    return {
      [`${t}-affix-wrapper`]: l(
        l(
          l(
            l(l({}, St(e)), {
              display: 'inline-flex',
              [`&:not(${t}-affix-wrapper-disabled):hover`]: l(l({}, Le(e)), {
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
            xn(e)
          ),
          {
            [`${i}${t}-password-icon`]: {
              color: a,
              cursor: 'pointer',
              transition: `all ${r}`,
              '&:hover': { color: s }
            }
          }
        ),
        vt(e, `${t}-affix-wrapper`)
      )
    }
  },
  Cn = e => {
    const {
      componentCls: t,
      colorError: n,
      colorSuccess: o,
      borderRadiusLG: r,
      borderRadiusSM: a
    } = e
    return {
      [`${t}-group`]: l(l(l({}, ct(e)), vn(e)), {
        '&-rtl': { direction: 'rtl' },
        '&-wrapper': {
          display: 'inline-block',
          width: '100%',
          textAlign: 'start',
          verticalAlign: 'top',
          '&-rtl': { direction: 'rtl' },
          '&-lg': { [`${t}-group-addon`]: { borderRadius: r } },
          '&-sm': { [`${t}-group-addon`]: { borderRadius: a } },
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
  wn = e => {
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
function xt(e) {
  return ge(e, {
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
const En = e => {
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
  In = dt('Input', e => {
    const t = xt(e)
    return [Sn(t), En(t), $n(t), Cn(t), wn(t), bn(t)]
  }),
  de = e => e != null && (Array.isArray(e) ? ut(e).length : !0)
function Do(e) {
  return de(e.prefix) || de(e.suffix) || de(e.allowClear)
}
function Mo(e) {
  return de(e.addonBefore) || de(e.addonAfter)
}
function Tn(e) {
  return typeof e > 'u' || e === null ? '' : String(e)
}
function Ie(e, t, n, o) {
  if (!n) return
  const r = t
  if (t.type === 'click') {
    Object.defineProperty(r, 'target', { writable: !0 }),
      Object.defineProperty(r, 'currentTarget', { writable: !0 })
    const a = e.cloneNode(!0)
    ;(r.target = a), (r.currentTarget = a), (a.value = ''), n(r)
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
function On(e, t) {
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
const Rn = () => ({
    addonBefore: j.any,
    addonAfter: j.any,
    prefix: j.any,
    suffix: j.any,
    clearIcon: j.any,
    affixWrapperClassName: String,
    groupClassName: String,
    wrapperClassName: String,
    inputClassName: String,
    allowClear: { type: Boolean, default: void 0 }
  }),
  Pn = () =>
    l(l({}, Rn()), {
      value: { type: [String, Number, Symbol], default: void 0 },
      defaultValue: { type: [String, Number, Symbol], default: void 0 },
      inputElement: j.any,
      prefixCls: String,
      disabled: { type: Boolean, default: void 0 },
      focused: { type: Boolean, default: void 0 },
      triggerFocus: Function,
      readonly: { type: Boolean, default: void 0 },
      handleReset: Function,
      hidden: { type: Boolean, default: void 0 }
    }),
  zn = () =>
    l(l({}, Pn()), {
      id: String,
      placeholder: { type: [String, Number] },
      autocomplete: String,
      type: Mt('text'),
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
  Bn = () =>
    q(zn(), [
      'wrapperClassName',
      'groupClassName',
      'inputClassName',
      'affixWrapperClassName'
    ]),
  $t = () =>
    l(l({}, q(Bn(), ['prefix', 'addonBefore', 'addonAfter', 'suffix'])), {
      rows: Number,
      autosize: { type: [Boolean, Object], default: void 0 },
      autoSize: { type: [Boolean, Object], default: void 0 },
      onResize: { type: Function },
      onCompositionstart: Ue(),
      onCompositionend: Ue(),
      valueModifiers: Object
    }),
  tt = e => e != null && (Array.isArray(e) ? ut(e).length : !0)
function An(e) {
  return tt(e.addonBefore) || tt(e.addonAfter)
}
const Hn = ['text', 'input'],
  _n = Y({
    compatConfig: { MODE: 3 },
    name: 'ClearableLabeledInput',
    inheritAttrs: !1,
    props: {
      prefixCls: String,
      inputType: j.oneOf(Lt('text', 'input')),
      value: ee(),
      defaultValue: ee(),
      allowClear: { type: Boolean, default: void 0 },
      element: ee(),
      handleReset: Function,
      disabled: { type: Boolean, default: void 0 },
      direction: { type: String },
      size: { type: String },
      suffix: ee(),
      prefix: ee(),
      addonBefore: ee(),
      addonAfter: ee(),
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
      const r = Me.useInject(),
        a = i => {
          const {
              value: d,
              disabled: f,
              readonly: g,
              handleReset: h,
              suffix: m = n.suffix
            } = e,
            w = !f && !g && d,
            O = `${i}-clear-icon`
          return b(
            Wt,
            {
              onClick: h,
              onMousedown: R => R.preventDefault(),
              class: ne({ [`${O}-hidden`]: !w, [`${O}-has-suffix`]: !!m }, O),
              role: 'button'
            },
            null
          )
        },
        s = (i, d) => {
          const {
              value: f,
              allowClear: g,
              direction: h,
              bordered: m,
              hidden: w,
              status: O,
              addonAfter: R = n.addonAfter,
              addonBefore: P = n.addonBefore,
              hashId: F
            } = e,
            { status: x, hasFeedback: y } = r
          if (!g) return qe(d, { value: f, disabled: e.disabled })
          const E = ne(
            `${i}-affix-wrapper`,
            `${i}-affix-wrapper-textarea-with-clear-btn`,
            mt(`${i}-affix-wrapper`, bt(x, O), y),
            {
              [`${i}-affix-wrapper-rtl`]: h === 'rtl',
              [`${i}-affix-wrapper-borderless`]: !m,
              [`${o.class}`]: !An({ addonAfter: R, addonBefore: P }) && o.class
            },
            F
          )
          return b('span', { class: E, style: o.style, hidden: w }, [
            qe(d, { style: null, value: f, disabled: e.disabled }),
            a(i)
          ])
        }
      return () => {
        var i
        const {
          prefixCls: d,
          inputType: f,
          element: g = (i = n.element) === null || i === void 0
            ? void 0
            : i.call(n)
        } = e
        return f === Hn[0] ? s(d, g) : null
      }
    }
  }),
  jn = `
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
  Fn = [
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
  Te = {}
let W
function Nn(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1
  const n =
    e.getAttribute('id') ||
    e.getAttribute('data-reactid') ||
    e.getAttribute('name')
  if (t && Te[n]) return Te[n]
  const o = window.getComputedStyle(e),
    r =
      o.getPropertyValue('box-sizing') ||
      o.getPropertyValue('-moz-box-sizing') ||
      o.getPropertyValue('-webkit-box-sizing'),
    a =
      parseFloat(o.getPropertyValue('padding-bottom')) +
      parseFloat(o.getPropertyValue('padding-top')),
    s =
      parseFloat(o.getPropertyValue('border-bottom-width')) +
      parseFloat(o.getPropertyValue('border-top-width')),
    d = {
      sizingStyle: Fn.map(f => `${f}:${o.getPropertyValue(f)}`).join(';'),
      paddingSize: a,
      borderSize: s,
      boxSizing: r
    }
  return t && n && (Te[n] = d), d
}
function Dn(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1,
    n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null,
    o = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null
  W ||
    ((W = document.createElement('textarea')),
    W.setAttribute('tab-index', '-1'),
    W.setAttribute('aria-hidden', 'true'),
    document.body.appendChild(W)),
    e.getAttribute('wrap')
      ? W.setAttribute('wrap', e.getAttribute('wrap'))
      : W.removeAttribute('wrap')
  const { paddingSize: r, borderSize: a, boxSizing: s, sizingStyle: i } = Nn(
    e,
    t
  )
  W.setAttribute('style', `${i};${jn}`),
    (W.value = e.value || e.placeholder || '')
  let d,
    f,
    g,
    h = W.scrollHeight
  if (
    (s === 'border-box' ? (h += a) : s === 'content-box' && (h -= r),
    n !== null || o !== null)
  ) {
    W.value = ' '
    const w = W.scrollHeight - r
    n !== null &&
      ((d = w * n),
      s === 'border-box' && (d = d + r + a),
      (h = Math.max(d, h))),
      o !== null &&
        ((f = w * o),
        s === 'border-box' && (f = f + r + a),
        (g = h > f ? '' : 'hidden'),
        (h = Math.min(f, h)))
  }
  const m = { height: `${h}px`, overflowY: g, resize: 'none' }
  return d && (m.minHeight = `${d}px`), f && (m.maxHeight = `${f}px`), m
}
const Oe = 0,
  Re = 1,
  Pe = 2,
  Mn = Y({
    compatConfig: { MODE: 3 },
    name: 'ResizableTextArea',
    inheritAttrs: !1,
    props: $t(),
    setup(e, t) {
      let { attrs: n, emit: o, expose: r } = t,
        a,
        s
      const i = V(),
        d = V({}),
        f = V(Pe)
      me(() => {
        te.cancel(a), te.cancel(s)
      })
      const g = () => {
          try {
            if (i.value && document.activeElement === i.value.input) {
              const $ = i.value.getSelectionStart(),
                u = i.value.getSelectionEnd(),
                A = i.value.getScrollTop()
              i.value.setSelectionRange($, u), i.value.setScrollTop(A)
            }
          } catch {}
        },
        h = V(),
        m = V()
      ye(() => {
        const $ = e.autoSize || e.autosize
        $
          ? ((h.value = $.minRows), (m.value = $.maxRows))
          : ((h.value = void 0), (m.value = void 0))
      })
      const w = G(() => !!(e.autoSize || e.autosize)),
        O = () => {
          f.value = Oe
        }
      oe(
        [() => e.value, h, m, w],
        () => {
          w.value && O()
        },
        { immediate: !0 }
      )
      const R = V()
      oe(
        [f, i],
        () => {
          if (i.value)
            if (f.value === Oe) f.value = Re
            else if (f.value === Re) {
              const $ = Dn(i.value.input, !1, h.value, m.value)
              ;(f.value = Pe), (R.value = $)
            } else g()
        },
        { immediate: !0, flush: 'post' }
      )
      const P = Fe(),
        F = V(),
        x = () => {
          te.cancel(F.value)
        },
        y = $ => {
          f.value === Pe &&
            (o('resize', $),
            w.value &&
              (x(),
              (F.value = te(() => {
                O()
              }))))
        }
      me(() => {
        x()
      }),
        r({
          resizeTextarea: () => {
            O()
          },
          textArea: G(() => {
            var $
            return ($ = i.value) === null || $ === void 0 ? void 0 : $.input
          }),
          instance: P
        }),
        ae(e.autosize === void 0)
      const I = () => {
        const { prefixCls: $, disabled: u } = e,
          A = q(e, [
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
          Z = ne($, n.class, { [`${$}-disabled`]: u }),
          N = w.value ? R.value : null,
          X = [n.style, d.value, N],
          K = l(l(l({}, A), n), { style: X, class: Z })
        return (
          (f.value === Oe || f.value === Re) &&
            X.push({ overflowX: 'hidden', overflowY: 'hidden' }),
          K.autofocus || delete K.autofocus,
          K.rows === 0 && delete K.rows,
          b(
            ft,
            { onResize: y, disabled: !w.value },
            {
              default: () => [
                b(dn, B(B({}, K), {}, { ref: i, tag: 'textarea' }), null)
              ]
            }
          )
        )
      }
      return () => I()
    }
  }),
  Ln = Mn
function Ct(e, t) {
  return [...(e || '')].slice(0, t).join('')
}
function nt(e, t, n, o) {
  let r = n
  return (
    e
      ? (r = Ct(n, o))
      : [...(t || '')].length < n.length &&
        [...(n || '')].length > o &&
        (r = t),
    r
  )
}
const Wn = Y({
  compatConfig: { MODE: 3 },
  name: 'ATextarea',
  inheritAttrs: !1,
  props: $t(),
  setup(e, t) {
    let { attrs: n, expose: o, emit: r } = t
    var a
    const s = fn(),
      i = Me.useInject(),
      d = G(() => bt(i.status, e.status)),
      f = Q((a = e.value) !== null && a !== void 0 ? a : e.defaultValue),
      g = Q(),
      h = Q(''),
      { prefixCls: m, size: w, direction: O } = _e('input', e),
      [R, P] = In(m),
      F = Vt(),
      x = G(() => e.showCount === '' || e.showCount || !1),
      y = G(() => Number(e.maxlength) > 0),
      E = Q(!1),
      I = Q(),
      $ = Q(0),
      u = c => {
        ;(E.value = !0),
          (I.value = h.value),
          ($.value = c.currentTarget.selectionStart),
          r('compositionstart', c)
      },
      A = c => {
        var S
        E.value = !1
        let T = c.currentTarget.value
        if (y.value) {
          const H =
            $.value >= e.maxlength + 1 ||
            $.value ===
              ((S = I.value) === null || S === void 0 ? void 0 : S.length)
          T = nt(H, I.value, T, e.maxlength)
        }
        T !== h.value && (K(T), Ie(c.currentTarget, c, p, T)),
          r('compositionend', c)
      },
      Z = Fe()
    oe(
      () => e.value,
      () => {
        var c
        'value' in Z.vnode.props,
          (f.value = (c = e.value) !== null && c !== void 0 ? c : '')
      }
    )
    const N = c => {
        var S
        On((S = g.value) === null || S === void 0 ? void 0 : S.textArea, c)
      },
      X = () => {
        var c, S
        ;(S = (c = g.value) === null || c === void 0 ? void 0 : c.textArea) ===
          null ||
          S === void 0 ||
          S.blur()
      },
      K = (c, S) => {
        f.value !== c &&
          (e.value === void 0
            ? (f.value = c)
            : be(() => {
                var T, H, _
                g.value.textArea.value !== h.value &&
                  ((_ =
                    (T = g.value) === null || T === void 0
                      ? void 0
                      : (H = T.instance).update) === null ||
                    _ === void 0 ||
                    _.call(H))
              }),
          be(() => {
            S && S()
          }))
      },
      Ce = c => {
        c.keyCode === 13 && r('pressEnter', c), r('keydown', c)
      },
      pe = c => {
        const { onBlur: S } = e
        S == null || S(c), s.onFieldBlur()
      },
      p = c => {
        r('update:value', c.target.value),
          r('change', c),
          r('input', c),
          s.onFieldChange()
      },
      v = c => {
        Ie(g.value.textArea, c, p),
          K('', () => {
            N()
          })
      },
      C = c => {
        let S = c.target.value
        if (f.value !== S) {
          if (y.value) {
            const T = c.target,
              H =
                T.selectionStart >= e.maxlength + 1 ||
                T.selectionStart === S.length ||
                !T.selectionStart
            S = nt(H, h.value, S, e.maxlength)
          }
          Ie(c.currentTarget, c, p, S), K(S)
        }
      },
      z = () => {
        var c, S
        const { class: T } = n,
          { bordered: H = !0 } = e,
          _ = l(l(l({}, q(e, ['allowClear'])), n), {
            class: [
              {
                [`${m.value}-borderless`]: !H,
                [`${T}`]: T && !x.value,
                [`${m.value}-sm`]: w.value === 'small',
                [`${m.value}-lg`]: w.value === 'large'
              },
              mt(m.value, d.value),
              P.value
            ],
            disabled: F.value,
            showCount: null,
            prefixCls: m.value,
            onInput: C,
            onChange: C,
            onBlur: pe,
            onKeydown: Ce,
            onCompositionstart: u,
            onCompositionend: A
          })
        return (
          !((c = e.valueModifiers) === null || c === void 0) &&
            c.lazy &&
            delete _.onInput,
          b(
            Ln,
            B(
              B({}, _),
              {},
              {
                id:
                  (S = _ == null ? void 0 : _.id) !== null && S !== void 0
                    ? S
                    : s.id.value,
                ref: g,
                maxlength: e.maxlength,
                lazy: e.lazy
              }
            ),
            null
          )
        )
      }
    return (
      o({ focus: N, blur: X, resizableTextArea: g }),
      ye(() => {
        let c = Tn(f.value)
        !E.value &&
          y.value &&
          (e.value === null || e.value === void 0) &&
          (c = Ct(c, e.maxlength)),
          (h.value = c)
      }),
      () => {
        var c
        const { maxlength: S, bordered: T = !0, hidden: H } = e,
          { style: _, class: U } = n,
          re = l(l(l({}, e), n), {
            prefixCls: m.value,
            inputType: 'text',
            handleReset: v,
            direction: O.value,
            bordered: T,
            style: x.value ? void 0 : _,
            hashId: P.value,
            disabled: (c = e.disabled) !== null && c !== void 0 ? c : F.value
          })
        let D = b(_n, B(B({}, re), {}, { value: h.value, status: e.status }), {
          element: z
        })
        if (x.value || i.hasFeedback) {
          const k = [...h.value].length
          let J = ''
          typeof x.value == 'object'
            ? (J = x.value.formatter({
                value: h.value,
                count: k,
                maxlength: S
              }))
            : (J = `${k}${y.value ? ` / ${S}` : ''}`),
            (D = b(
              'div',
              {
                hidden: H,
                class: ne(
                  `${m.value}-textarea`,
                  {
                    [`${m.value}-textarea-rtl`]: O.value === 'rtl',
                    [`${m.value}-textarea-show-count`]: x.value,
                    [`${m.value}-textarea-in-form-item`]: i.isFormItemInput
                  },
                  `${m.value}-textarea-show-count`,
                  U,
                  P.value
                ),
                style: _,
                'data-count': typeof J != 'object' ? J : void 0
              },
              [
                D,
                i.hasFeedback &&
                  b('span', { class: `${m.value}-textarea-suffix` }, [
                    i.feedbackIcon
                  ])
              ]
            ))
        }
        return R(D)
      }
    )
  }
})
var Vn =
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
const Gn = {
    border: 0,
    background: 'transparent',
    padding: 0,
    lineHeight: 'inherit',
    display: 'inline-block'
  },
  Kn = Y({
    compatConfig: { MODE: 3 },
    name: 'TransButton',
    inheritAttrs: !1,
    props: {
      noStyle: { type: Boolean, default: void 0 },
      onClick: Function,
      disabled: { type: Boolean, default: void 0 },
      autofocus: { type: Boolean, default: void 0 }
    },
    setup(e, t) {
      let { slots: n, emit: o, attrs: r, expose: a } = t
      const s = Q(),
        i = m => {
          const { keyCode: w } = m
          w === se.ENTER && m.preventDefault()
        },
        d = m => {
          const { keyCode: w } = m
          w === se.ENTER && o('click', m)
        },
        f = m => {
          o('click', m)
        },
        g = () => {
          s.value && s.value.focus()
        },
        h = () => {
          s.value && s.value.blur()
        }
      return (
        Ne(() => {
          e.autofocus && g()
        }),
        a({ focus: g, blur: h }),
        () => {
          var m
          const { noStyle: w, disabled: O } = e,
            R = Vn(e, ['noStyle', 'disabled'])
          let P = {}
          return (
            w || (P = l({}, Gn)),
            O && (P.pointerEvents = 'none'),
            b(
              'div',
              B(
                B(B({ role: 'button', tabindex: 0, ref: s }, R), r),
                {},
                {
                  onClick: f,
                  onKeydown: i,
                  onKeyup: d,
                  style: l(l({}, P), r.style || {})
                }
              ),
              [(m = n.default) === null || m === void 0 ? void 0 : m.call(n)]
            )
          )
        }
      )
    }
  }),
  ot = Kn
function rt(e) {
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
        Xn(e, r, n[r])
      })
  }
  return e
}
function Xn(e, t, n) {
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
var We = function(t, n) {
  var o = rt({}, t, n.attrs)
  return b(he, rt({}, o, { icon: Qt }), null)
}
We.displayName = 'EnterOutlined'
We.inheritAttrs = !1
const Un = We,
  Yn = (e, t, n, o) => {
    const { sizeMarginHeadingVerticalEnd: r, fontWeightStrong: a } = o
    return {
      marginBottom: r,
      color: n,
      fontWeight: a,
      fontSize: e,
      lineHeight: t
    }
  },
  qn = e => {
    const t = [1, 2, 3, 4, 5],
      n = {}
    return (
      t.forEach(o => {
        n[
          `
      h${o}&,
      div&-h${o},
      div&-h${o} > textarea,
      h${o}
    `
        ] = Yn(
          e[`fontSizeHeading${o}`],
          e[`lineHeightHeading${o}`],
          e.colorTextHeading,
          e
        )
      }),
      n
    )
  },
  Zn = e => {
    const { componentCls: t } = e
    return {
      'a&, a': l(l({}, gt(e)), {
        textDecoration: e.linkDecoration,
        '&:active, &:hover': { textDecoration: e.linkHoverDecoration },
        [`&[disabled], &${t}-disabled`]: {
          color: e.colorTextDisabled,
          cursor: 'not-allowed',
          '&:active, &:hover': { color: e.colorTextDisabled },
          '&:active': { pointerEvents: 'none' }
        }
      })
    }
  },
  Qn = () => ({
    code: {
      margin: '0 0.2em',
      paddingInline: '0.4em',
      paddingBlock: '0.2em 0.1em',
      fontSize: '85%',
      background: 'rgba(150, 150, 150, 0.1)',
      border: '1px solid rgba(100, 100, 100, 0.2)',
      borderRadius: 3
    },
    kbd: {
      margin: '0 0.2em',
      paddingInline: '0.4em',
      paddingBlock: '0.15em 0.1em',
      fontSize: '90%',
      background: 'rgba(150, 150, 150, 0.06)',
      border: '1px solid rgba(100, 100, 100, 0.2)',
      borderBottomWidth: 2,
      borderRadius: 3
    },
    mark: { padding: 0, backgroundColor: Jt[2] },
    'u, ins': { textDecoration: 'underline', textDecorationSkipInk: 'auto' },
    's, del': { textDecoration: 'line-through' },
    strong: { fontWeight: 600 },
    'ul, ol': {
      marginInline: 0,
      marginBlock: '0 1em',
      padding: 0,
      li: {
        marginInline: '20px 0',
        marginBlock: 0,
        paddingInline: '4px 0',
        paddingBlock: 0
      }
    },
    ul: { listStyleType: 'circle', ul: { listStyleType: 'disc' } },
    ol: { listStyleType: 'decimal' },
    'pre, blockquote': { margin: '1em 0' },
    pre: {
      padding: '0.4em 0.6em',
      whiteSpace: 'pre-wrap',
      wordWrap: 'break-word',
      background: 'rgba(150, 150, 150, 0.1)',
      border: '1px solid rgba(100, 100, 100, 0.2)',
      borderRadius: 3,
      code: {
        display: 'inline',
        margin: 0,
        padding: 0,
        fontSize: 'inherit',
        fontFamily: 'inherit',
        background: 'transparent',
        border: 0
      }
    },
    blockquote: {
      paddingInline: '0.6em 0',
      paddingBlock: 0,
      borderInlineStart: '4px solid rgba(100, 100, 100, 0.2)',
      opacity: 0.85
    }
  }),
  Jn = e => {
    const { componentCls: t } = e,
      o = xt(e).inputPaddingVertical + 1
    return {
      '&-edit-content': {
        position: 'relative',
        'div&': {
          insetInlineStart: -e.paddingSM,
          marginTop: -o,
          marginBottom: `calc(1em - ${o}px)`
        },
        [`${t}-edit-content-confirm`]: {
          position: 'absolute',
          insetInlineEnd: e.marginXS + 2,
          insetBlockEnd: e.marginXS,
          color: e.colorTextDescription,
          fontWeight: 'normal',
          fontSize: e.fontSize,
          fontStyle: 'normal',
          pointerEvents: 'none'
        },
        textarea: {
          margin: '0!important',
          MozTransition: 'none',
          height: '1em'
        }
      }
    }
  },
  kn = e => ({
    '&-copy-success': {
      '\n    &,\n    &:hover,\n    &:focus': { color: e.colorSuccess }
    }
  }),
  eo = () => ({
    '\n  a&-ellipsis,\n  span&-ellipsis\n  ': {
      display: 'inline-block',
      maxWidth: '100%'
    },
    '&-single-line': { whiteSpace: 'nowrap' },
    '&-ellipsis-single-line': {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      'a&, span&': { verticalAlign: 'bottom' }
    },
    '&-ellipsis-multiple-line': {
      display: '-webkit-box',
      overflow: 'hidden',
      WebkitLineClamp: 3,
      WebkitBoxOrient: 'vertical'
    }
  }),
  to = e => {
    const { componentCls: t, sizeMarginHeadingVerticalStart: n } = e
    return {
      [t]: l(
        l(
          l(
            l(
              l(
                l(
                  l(
                    l(
                      l(
                        {
                          color: e.colorText,
                          wordBreak: 'break-word',
                          lineHeight: e.lineHeight,
                          [`&${t}-secondary`]: {
                            color: e.colorTextDescription
                          },
                          [`&${t}-success`]: { color: e.colorSuccess },
                          [`&${t}-warning`]: { color: e.colorWarning },
                          [`&${t}-danger`]: {
                            color: e.colorError,
                            'a&:active, a&:focus': {
                              color: e.colorErrorActive
                            },
                            'a&:hover': { color: e.colorErrorHover }
                          },
                          [`&${t}-disabled`]: {
                            color: e.colorTextDisabled,
                            cursor: 'not-allowed',
                            userSelect: 'none'
                          },
                          '\n        div&,\n        p\n      ': {
                            marginBottom: '1em'
                          }
                        },
                        qn(e)
                      ),
                      {
                        [`
      & + h1${t},
      & + h2${t},
      & + h3${t},
      & + h4${t},
      & + h5${t}
      `]: { marginTop: n },
                        '\n      div,\n      ul,\n      li,\n      p,\n      h1,\n      h2,\n      h3,\n      h4,\n      h5': {
                          '\n        + h1,\n        + h2,\n        + h3,\n        + h4,\n        + h5\n        ': {
                            marginTop: n
                          }
                        }
                      }
                    ),
                    Qn()
                  ),
                  Zn(e)
                ),
                {
                  [`
        ${t}-expand,
        ${t}-edit,
        ${t}-copy
      `]: l(l({}, gt(e)), { marginInlineStart: e.marginXXS })
                }
              ),
              Jn(e)
            ),
            kn(e)
          ),
          eo()
        ),
        { '&-rtl': { direction: 'rtl' } }
      )
    }
  },
  wt = dt('Typography', e => [to(e)], {
    sizeMarginHeadingVerticalStart: '1.2em',
    sizeMarginHeadingVerticalEnd: '0.5em'
  }),
  no = () => ({
    prefixCls: String,
    value: String,
    maxlength: Number,
    autoSize: { type: [Boolean, Object] },
    onSave: Function,
    onCancel: Function,
    onEnd: Function,
    onChange: Function,
    originContent: String,
    direction: String,
    component: String
  }),
  oo = Y({
    compatConfig: { MODE: 3 },
    name: 'Editable',
    inheritAttrs: !1,
    props: no(),
    setup(e, t) {
      let { emit: n, slots: o, attrs: r } = t
      const { prefixCls: a } = Xt(e),
        s = je({
          current: e.value || '',
          lastKeyCode: void 0,
          inComposition: !1,
          cancelFlag: !1
        })
      oe(
        () => e.value,
        x => {
          s.current = x
        }
      )
      const i = V()
      Ne(() => {
        var x
        if (i.value) {
          const y =
              (x = i.value) === null || x === void 0
                ? void 0
                : x.resizableTextArea,
            E = y == null ? void 0 : y.textArea
          E.focus()
          const { length: I } = E.value
          E.setSelectionRange(I, I)
        }
      })
      function d(x) {
        i.value = x
      }
      function f(x) {
        let {
          target: { value: y }
        } = x
        ;(s.current = y.replace(/[\r\n]/g, '')), n('change', s.current)
      }
      function g() {
        s.inComposition = !0
      }
      function h() {
        s.inComposition = !1
      }
      function m(x) {
        const { keyCode: y } = x
        y === se.ENTER && x.preventDefault(),
          !s.inComposition && (s.lastKeyCode = y)
      }
      function w(x) {
        const { keyCode: y, ctrlKey: E, altKey: I, metaKey: $, shiftKey: u } = x
        s.lastKeyCode === y &&
          !s.inComposition &&
          !E &&
          !I &&
          !$ &&
          !u &&
          (y === se.ENTER
            ? (R(), n('end'))
            : y === se.ESC && ((s.current = e.originContent), n('cancel')))
      }
      function O() {
        R()
      }
      function R() {
        n('save', s.current.trim())
      }
      const [P, F] = wt(a)
      return () => {
        const x = ne(
          {
            [`${a.value}`]: !0,
            [`${a.value}-edit-content`]: !0,
            [`${a.value}-rtl`]: e.direction === 'rtl',
            [e.component ? `${a.value}-${e.component}` : '']: !0
          },
          r.class,
          F.value
        )
        return P(
          b('div', B(B({}, r), {}, { class: x }), [
            b(
              Wn,
              {
                ref: d,
                maxlength: e.maxlength,
                value: s.current,
                onChange: f,
                onKeydown: m,
                onKeyup: w,
                onCompositionstart: g,
                onCompositionend: h,
                onBlur: O,
                rows: 1,
                autoSize: e.autoSize === void 0 || e.autoSize
              },
              null
            ),
            o.enterIcon
              ? o.enterIcon({
                  className: `${e.prefixCls}-edit-content-confirm`
                })
              : b(Un, { class: `${e.prefixCls}-edit-content-confirm` }, null)
          ])
        )
      }
    }
  }),
  ro = oo,
  io = 3,
  lo = 8
let M
const ze = { padding: 0, margin: 0, display: 'inline', lineHeight: 'inherit' }
function Et(e, t) {
  e.setAttribute('aria-hidden', 'true')
  const n = window.getComputedStyle(t),
    o = rn(n)
  e.setAttribute('style', o),
    (e.style.position = 'fixed'),
    (e.style.left = '0'),
    (e.style.height = 'auto'),
    (e.style.minHeight = 'auto'),
    (e.style.maxHeight = 'auto'),
    (e.style.paddingTop = '0'),
    (e.style.paddingBottom = '0'),
    (e.style.borderTopWidth = '0'),
    (e.style.borderBottomWidth = '0'),
    (e.style.top = '-999999px'),
    (e.style.zIndex = '-1000'),
    (e.style.textOverflow = 'clip'),
    (e.style.whiteSpace = 'normal'),
    (e.style.webkitLineClamp = 'none')
}
function ao(e) {
  const t = document.createElement('div')
  Et(t, e),
    t.appendChild(document.createTextNode('text')),
    document.body.appendChild(t)
  const n = t.getBoundingClientRect().height
  return document.body.removeChild(t), n
}
const so = (e, t, n, o, r) => {
  M ||
    ((M = document.createElement('div')),
    M.setAttribute('aria-hidden', 'true'),
    document.body.appendChild(M))
  const { rows: a, suffix: s = '' } = t,
    i = ao(e),
    d = Math.round(i * a * 100) / 100
  Et(M, e)
  const f = Ut({
    render() {
      return b('div', { style: ze }, [
        b('span', { style: ze }, [n, s]),
        b('span', { style: ze }, [o])
      ])
    }
  })
  f.mount(M)
  function g() {
    return Math.round(M.getBoundingClientRect().height * 100) / 100 - 0.1 <= d
  }
  if (g()) return f.unmount(), { content: n, text: M.innerHTML, ellipsis: !1 }
  const h = Array.prototype.slice
      .apply(M.childNodes[0].childNodes[0].cloneNode(!0).childNodes)
      .filter(y => {
        let { nodeType: E, data: I } = y
        return E !== lo && I !== ''
      }),
    m = Array.prototype.slice.apply(
      M.childNodes[0].childNodes[1].cloneNode(!0).childNodes
    )
  f.unmount()
  const w = []
  M.innerHTML = ''
  const O = document.createElement('span')
  M.appendChild(O)
  const R = document.createTextNode(r + s)
  O.appendChild(R),
    m.forEach(y => {
      M.appendChild(y)
    })
  function P(y) {
    O.insertBefore(y, R)
  }
  function F(y, E) {
    let I = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0,
      $ =
        arguments.length > 3 && arguments[3] !== void 0
          ? arguments[3]
          : E.length,
      u = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 0
    const A = Math.floor((I + $) / 2),
      Z = E.slice(0, A)
    if (((y.textContent = Z), I >= $ - 1))
      for (let N = $; N >= I; N -= 1) {
        const X = E.slice(0, N)
        if (((y.textContent = X), g() || !X))
          return N === E.length
            ? { finished: !1, vNode: E }
            : { finished: !0, vNode: X }
      }
    return g() ? F(y, E, A, $, A) : F(y, E, I, A, u)
  }
  function x(y) {
    if (y.nodeType === io) {
      const I = y.textContent || '',
        $ = document.createTextNode(I)
      return P($), F($, I)
    }
    return { finished: !1, vNode: null }
  }
  return (
    h.some(y => {
      const { finished: E, vNode: I } = x(y)
      return I && w.push(I), E
    }),
    { content: w, text: M.innerHTML, ellipsis: !0 }
  )
}
var co =
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
const uo = () => ({ prefixCls: String, direction: String, component: String }),
  po = Y({
    name: 'ATypography',
    inheritAttrs: !1,
    props: uo(),
    setup(e, t) {
      let { slots: n, attrs: o } = t
      const { prefixCls: r, direction: a } = _e('typography', e),
        [s, i] = wt(r)
      return () => {
        var d
        const f = l(l({}, e), o),
          { prefixCls: g, direction: h, component: m = 'article' } = f,
          w = co(f, ['prefixCls', 'direction', 'component'])
        return s(
          b(
            m,
            B(
              B({}, w),
              {},
              {
                class: ne(
                  r.value,
                  { [`${r.value}-rtl`]: a.value === 'rtl' },
                  o.class,
                  i.value
                )
              }
            ),
            {
              default: () => [
                (d = n.default) === null || d === void 0 ? void 0 : d.call(n)
              ]
            }
          )
        )
      }
    }
  }),
  L = po,
  fo = () => {
    const e = document.getSelection()
    if (!e.rangeCount) return function() {}
    let t = document.activeElement
    const n = []
    for (let o = 0; o < e.rangeCount; o++) n.push(e.getRangeAt(o))
    switch (t.tagName.toUpperCase()) {
      case 'INPUT':
      case 'TEXTAREA':
        t.blur()
        break
      default:
        t = null
        break
    }
    return (
      e.removeAllRanges(),
      function() {
        e.type === 'Caret' && e.removeAllRanges(),
          e.rangeCount ||
            n.forEach(function(o) {
              e.addRange(o)
            }),
          t && t.focus()
      }
    )
  },
  go = fo,
  it = { 'text/plain': 'Text', 'text/html': 'Url', default: 'Text' },
  mo = 'Copy to clipboard: #{key}, Enter'
function bo(e) {
  const t = (/mac os x/i.test(navigator.userAgent) ? '⌘' : 'Ctrl') + '+C'
  return e.replace(/#{\s*key\s*}/g, t)
}
function ho(e, t) {
  let n,
    o,
    r,
    a,
    s,
    i = !1
  t || (t = {})
  const d = t.debug || !1
  try {
    if (
      ((o = go()),
      (r = document.createRange()),
      (a = document.getSelection()),
      (s = document.createElement('span')),
      (s.textContent = e),
      (s.style.all = 'unset'),
      (s.style.position = 'fixed'),
      (s.style.top = 0),
      (s.style.clip = 'rect(0, 0, 0, 0)'),
      (s.style.whiteSpace = 'pre'),
      (s.style.webkitUserSelect = 'text'),
      (s.style.MozUserSelect = 'text'),
      (s.style.msUserSelect = 'text'),
      (s.style.userSelect = 'text'),
      s.addEventListener('copy', function(g) {
        if ((g.stopPropagation(), t.format))
          if ((g.preventDefault(), typeof g.clipboardData > 'u')) {
            d && console.warn('unable to use e.clipboardData'),
              d && console.warn('trying IE specific stuff'),
              window.clipboardData.clearData()
            const h = it[t.format] || it.default
            window.clipboardData.setData(h, e)
          } else
            g.clipboardData.clearData(), g.clipboardData.setData(t.format, e)
        t.onCopy && (g.preventDefault(), t.onCopy(g.clipboardData))
      }),
      document.body.appendChild(s),
      r.selectNodeContents(s),
      a.addRange(r),
      !document.execCommand('copy'))
    )
      throw new Error('copy command was unsuccessful')
    i = !0
  } catch (f) {
    d && console.error('unable to copy using execCommand: ', f),
      d && console.warn('trying IE specific stuff')
    try {
      window.clipboardData.setData(t.format || 'text', e),
        t.onCopy && t.onCopy(window.clipboardData),
        (i = !0)
    } catch (g) {
      d && console.error('unable to copy using clipboardData: ', g),
        d && console.error('falling back to prompt'),
        (n = bo('message' in t ? t.message : mo)),
        window.prompt(n, e)
    }
  } finally {
    a &&
      (typeof a.removeRange == 'function'
        ? a.removeRange(r)
        : a.removeAllRanges()),
      s && document.body.removeChild(s),
      o()
  }
  return i
}
function lt(e) {
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
        yo(e, r, n[r])
      })
  }
  return e
}
function yo(e, t, n) {
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
var Ve = function(t, n) {
  var o = lt({}, t, n.attrs)
  return b(he, lt({}, o, { icon: kt }), null)
}
Ve.displayName = 'CopyOutlined'
Ve.inheritAttrs = !1
const vo = Ve
function at(e) {
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
        So(e, r, n[r])
      })
  }
  return e
}
function So(e, t, n) {
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
var Ge = function(t, n) {
  var o = at({}, t, n.attrs)
  return b(he, at({}, o, { icon: en }), null)
}
Ge.displayName = 'EditOutlined'
Ge.inheritAttrs = !1
const xo = Ge
var $o =
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
const Co = pt('webkitLineClamp'),
  wo = pt('textOverflow'),
  st = '...',
  ce = () => ({
    editable: { type: [Boolean, Object], default: void 0 },
    copyable: { type: [Boolean, Object], default: void 0 },
    prefixCls: String,
    component: String,
    type: String,
    disabled: { type: Boolean, default: void 0 },
    ellipsis: { type: [Boolean, Object], default: void 0 },
    code: { type: Boolean, default: void 0 },
    mark: { type: Boolean, default: void 0 },
    underline: { type: Boolean, default: void 0 },
    delete: { type: Boolean, default: void 0 },
    strong: { type: Boolean, default: void 0 },
    keyboard: { type: Boolean, default: void 0 },
    content: String,
    'onUpdate:content': Function
  }),
  Eo = Y({
    compatConfig: { MODE: 3 },
    name: 'TypographyBase',
    inheritAttrs: !1,
    props: ce(),
    setup(e, t) {
      let { slots: n, attrs: o, emit: r } = t
      const { prefixCls: a, direction: s } = _e('typography', e),
        i = je({
          copied: !1,
          ellipsisText: '',
          ellipsisContent: null,
          isEllipsis: !1,
          expanded: !1,
          clientRendered: !1,
          expandStr: '',
          copyStr: '',
          copiedStr: '',
          editStr: '',
          copyId: void 0,
          rafId: void 0,
          prevProps: void 0,
          originContent: ''
        }),
        d = V(),
        f = V(),
        g = G(() => {
          const p = e.ellipsis
          return p
            ? l({ rows: 1, expandable: !1 }, typeof p == 'object' ? p : null)
            : {}
        })
      Ne(() => {
        ;(i.clientRendered = !0), A()
      }),
        me(() => {
          clearTimeout(i.copyId), te.cancel(i.rafId)
        }),
        oe(
          [() => g.value.rows, () => e.content],
          () => {
            be(() => {
              $()
            })
          },
          { flush: 'post', deep: !0 }
        ),
        ye(() => {
          e.content === void 0 && (ae(!e.editable), ae(!e.ellipsis))
        })
      function h() {
        var p
        return e.ellipsis || e.editable
          ? e.content
          : (p = we(d.value)) === null || p === void 0
          ? void 0
          : p.innerText
      }
      function m(p) {
        const { onExpand: v } = g.value
        ;(i.expanded = !0), v == null || v(p)
      }
      function w(p) {
        p.preventDefault(), (i.originContent = e.content), I(!0)
      }
      function O(p) {
        R(p), I(!1)
      }
      function R(p) {
        const { onChange: v } = x.value
        p !== e.content && (r('update:content', p), v == null || v(p))
      }
      function P() {
        var p, v
        ;(v = (p = x.value).onCancel) === null || v === void 0 || v.call(p),
          I(!1)
      }
      function F(p) {
        p.preventDefault(), p.stopPropagation()
        const { copyable: v } = e,
          C = l({}, typeof v == 'object' ? v : null)
        C.text === void 0 && (C.text = h()),
          ho(C.text || ''),
          (i.copied = !0),
          be(() => {
            C.onCopy && C.onCopy(p),
              (i.copyId = setTimeout(() => {
                i.copied = !1
              }, 3e3))
          })
      }
      const x = G(() => {
          const p = e.editable
          return p ? l({}, typeof p == 'object' ? p : null) : { editing: !1 }
        }),
        [y, E] = qt(!1, { value: G(() => x.value.editing) })
      function I(p) {
        const { onStart: v } = x.value
        p && v && v(), E(p)
      }
      oe(
        y,
        p => {
          var v
          p || (v = f.value) === null || v === void 0 || v.focus()
        },
        { flush: 'post' }
      )
      function $(p) {
        if (p) {
          const { width: v, height: C } = p
          if (!v || !C) return
        }
        te.cancel(i.rafId),
          (i.rafId = te(() => {
            A()
          }))
      }
      const u = G(() => {
          const {
            rows: p,
            expandable: v,
            suffix: C,
            onEllipsis: z,
            tooltip: c
          } = g.value
          return C || c || e.editable || e.copyable || v || z
            ? !1
            : p === 1
            ? wo
            : Co
        }),
        A = () => {
          const { ellipsisText: p, isEllipsis: v } = i,
            { rows: C, suffix: z, onEllipsis: c } = g.value
          if (
            !C ||
            C < 0 ||
            !we(d.value) ||
            i.expanded ||
            e.content === void 0 ||
            u.value
          )
            return
          const { content: S, text: T, ellipsis: H } = so(
            we(d.value),
            { rows: C, suffix: z },
            e.content,
            pe(!0),
            st
          )
          ;(p !== T || i.isEllipsis !== H) &&
            ((i.ellipsisText = T),
            (i.ellipsisContent = S),
            (i.isEllipsis = H),
            v !== H && c && c(H))
        }
      function Z(p, v) {
        let {
            mark: C,
            code: z,
            underline: c,
            delete: S,
            strong: T,
            keyboard: H
          } = p,
          _ = v
        function U(re, D) {
          if (!re) return
          const k = (function() {
            return _
          })()
          _ = b(D, null, { default: () => [k] })
        }
        return (
          U(T, 'strong'),
          U(c, 'u'),
          U(S, 'del'),
          U(z, 'code'),
          U(C, 'mark'),
          U(H, 'kbd'),
          _
        )
      }
      function N(p) {
        const { expandable: v, symbol: C } = g.value
        if (!v || (!p && (i.expanded || !i.isEllipsis))) return null
        const z = (n.ellipsisSymbol ? n.ellipsisSymbol() : C) || i.expandStr
        return b(
          'a',
          {
            key: 'expand',
            class: `${a.value}-expand`,
            onClick: m,
            'aria-label': i.expandStr
          },
          [z]
        )
      }
      function X() {
        if (!e.editable) return
        const { tooltip: p, triggerType: v = ['icon'] } = e.editable,
          C = n.editableIcon
            ? n.editableIcon()
            : b(xo, { role: 'button' }, null),
          z = n.editableTooltip ? n.editableTooltip() : i.editStr,
          c = typeof z == 'string' ? z : ''
        return v.indexOf('icon') !== -1
          ? b(
              Ee,
              { key: 'edit', title: p === !1 ? '' : z },
              {
                default: () => [
                  b(
                    ot,
                    {
                      ref: f,
                      class: `${a.value}-edit`,
                      onClick: w,
                      'aria-label': c
                    },
                    { default: () => [C] }
                  )
                ]
              }
            )
          : null
      }
      function K() {
        if (!e.copyable) return
        const { tooltip: p } = e.copyable,
          v = i.copied ? i.copiedStr : i.copyStr,
          C = n.copyableTooltip ? n.copyableTooltip({ copied: i.copied }) : v,
          z = typeof C == 'string' ? C : '',
          c = i.copied ? b(un, null, null) : b(vo, null, null),
          S = n.copyableIcon ? n.copyableIcon({ copied: !!i.copied }) : c
        return b(
          Ee,
          { key: 'copy', title: p === !1 ? '' : C },
          {
            default: () => [
              b(
                ot,
                {
                  class: [
                    `${a.value}-copy`,
                    { [`${a.value}-copy-success`]: i.copied }
                  ],
                  onClick: F,
                  'aria-label': z
                },
                { default: () => [S] }
              )
            ]
          }
        )
      }
      function Ce() {
        const { class: p, style: v } = o,
          { maxlength: C, autoSize: z, onEnd: c } = x.value
        return b(
          ro,
          {
            class: p,
            style: v,
            prefixCls: a.value,
            value: e.content,
            originContent: i.originContent,
            maxlength: C,
            autoSize: z,
            onSave: O,
            onChange: R,
            onCancel: P,
            onEnd: c,
            direction: s.value,
            component: e.component
          },
          { enterIcon: n.editableEnterIcon }
        )
      }
      function pe(p) {
        return [N(p), X(), K()].filter(v => v)
      }
      return () => {
        var p
        const { triggerType: v = ['icon'] } = x.value,
          C =
            e.ellipsis || e.editable
              ? e.content !== void 0
                ? e.content
                : (p = n.default) === null || p === void 0
                ? void 0
                : p.call(n)
              : n.default
              ? n.default()
              : e.content
        return y.value
          ? Ce()
          : b(
              Gt,
              {
                componentName: 'Text',
                children: z => {
                  const c = l(l({}, e), o),
                    {
                      type: S,
                      disabled: T,
                      content: H,
                      class: _,
                      style: U
                    } = c,
                    re = $o(c, [
                      'type',
                      'disabled',
                      'content',
                      'class',
                      'style'
                    ]),
                    { rows: D, suffix: k, tooltip: J } = g.value,
                    { edit: Pt, copy: zt, copied: Bt, expand: At } = z
                  ;(i.editStr = Pt),
                    (i.copyStr = zt),
                    (i.copiedStr = Bt),
                    (i.expandStr = At)
                  const Ht = q(re, [
                      'prefixCls',
                      'editable',
                      'copyable',
                      'ellipsis',
                      'mark',
                      'code',
                      'delete',
                      'underline',
                      'strong',
                      'keyboard',
                      'onUpdate:content'
                    ]),
                    fe = u.value,
                    _t = D === 1 && fe,
                    Ke = D && D > 1 && fe
                  let ie = C,
                    jt
                  if (D && i.isEllipsis && !i.expanded && !fe) {
                    const { title: Xe } = re
                    let le = Xe || ''
                    !Xe &&
                      (typeof C == 'string' || typeof C == 'number') &&
                      (le = String(C)),
                      (le =
                        le == null
                          ? void 0
                          : le.slice(String(i.ellipsisContent || '').length)),
                      (ie = b(Ye, null, [
                        Yt(i.ellipsisContent),
                        b('span', { title: le, 'aria-hidden': 'true' }, [st]),
                        k
                      ]))
                  } else ie = b(Ye, null, [C, k])
                  ie = Z(e, ie)
                  const Ft = J && D && i.isEllipsis && !i.expanded && !fe,
                    Nt = n.ellipsisTooltip ? n.ellipsisTooltip() : J
                  return b(
                    ft,
                    { onResize: $, disabled: !D },
                    {
                      default: () => [
                        b(
                          L,
                          B(
                            {
                              ref: d,
                              class: [
                                {
                                  [`${a.value}-${S}`]: S,
                                  [`${a.value}-disabled`]: T,
                                  [`${a.value}-ellipsis`]: D,
                                  [`${a.value}-single-line`]:
                                    D === 1 && !i.isEllipsis,
                                  [`${a.value}-ellipsis-single-line`]: _t,
                                  [`${a.value}-ellipsis-multiple-line`]: Ke
                                },
                                _
                              ],
                              style: l(l({}, U), {
                                WebkitLineClamp: Ke ? D : void 0
                              }),
                              'aria-label': jt,
                              direction: s.value,
                              onClick: v.indexOf('text') !== -1 ? w : () => {}
                            },
                            Ht
                          ),
                          {
                            default: () => [
                              Ft
                                ? b(
                                    Ee,
                                    { title: J === !0 ? C : Nt },
                                    { default: () => [b('span', null, [ie])] }
                                  )
                                : ie,
                              pe()
                            ]
                          }
                        )
                      ]
                    }
                  )
                }
              },
              null
            )
      }
    }
  }),
  ue = Eo
var Io =
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
const To = () =>
    q(l(l({}, ce()), { ellipsis: { type: Boolean, default: void 0 } }), [
      'component'
    ]),
  ve = (e, t) => {
    let { slots: n, attrs: o } = t
    const r = l(l({}, e), o),
      { ellipsis: a, rel: s } = r,
      i = Io(r, ['ellipsis', 'rel'])
    ae()
    const d = l(l({}, i), {
      rel: s === void 0 && i.target === '_blank' ? 'noopener noreferrer' : s,
      ellipsis: !!a,
      component: 'a'
    })
    return delete d.navigate, b(ue, d, n)
  }
ve.displayName = 'ATypographyLink'
ve.inheritAttrs = !1
ve.props = To()
const It = ve,
  Oo = () => q(ce(), ['component']),
  Se = (e, t) => {
    let { slots: n, attrs: o } = t
    const r = l(l(l({}, e), { component: 'div' }), o)
    return b(ue, r, n)
  }
Se.displayName = 'ATypographyParagraph'
Se.inheritAttrs = !1
Se.props = Oo()
const Tt = Se,
  Ro = () =>
    l(l({}, q(ce(), ['component'])), {
      ellipsis: { type: [Boolean, Object], default: void 0 }
    }),
  xe = (e, t) => {
    let { slots: n, attrs: o } = t
    const { ellipsis: r } = e
    ae()
    const a = l(
      l(l({}, e), {
        ellipsis: r && typeof r == 'object' ? q(r, ['expandable', 'rows']) : r,
        component: 'span'
      }),
      o
    )
    return b(ue, a, n)
  }
xe.displayName = 'ATypographyText'
xe.inheritAttrs = !1
xe.props = Ro()
const Ot = xe
var Po =
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
const zo = Kt(1, 2, 3, 4, 5),
  Bo = () => l(l({}, q(ce(), ['component', 'strong'])), { level: Number }),
  $e = (e, t) => {
    let { slots: n, attrs: o } = t
    const { level: r = 1 } = e,
      a = Po(e, ['level'])
    let s
    zo.includes(r) ? (s = `h${r}`) : (ae(), (s = 'h1'))
    const i = l(l(l({}, a), { component: s }), o)
    return b(ue, i, n)
  }
$e.displayName = 'ATypographyTitle'
$e.inheritAttrs = !1
$e.props = Bo()
const Rt = $e
L.Text = Ot
L.Title = Rt
L.Paragraph = Tt
L.Link = It
L.Base = ue
L.install = function(e) {
  return (
    e.component(L.name, L),
    e.component(L.Text.displayName, Ot),
    e.component(L.Title.displayName, Rt),
    e.component(L.Paragraph.displayName, Tt),
    e.component(L.Link.displayName, It),
    e
  )
}
export {
  dn as B,
  un as C,
  Me as F,
  No as N,
  L as T,
  He as a,
  Le as b,
  St as c,
  mt as d,
  bt as e,
  Pn as f,
  bn as g,
  Do as h,
  xt as i,
  Mo as j,
  zn as k,
  Tn as l,
  Bn as m,
  In as n,
  Wn as o,
  Fo as p,
  gt as q,
  Ie as r,
  yt as s,
  On as t,
  fn as u,
  pn as v
}

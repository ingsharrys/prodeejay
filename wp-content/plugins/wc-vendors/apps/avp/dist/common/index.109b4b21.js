import {
  _ as w,
  P as H,
  b as X,
  e as k,
  n as We,
  f as Xt,
  H as Wn,
  A as at,
  a7 as Qt,
  $ as Kn,
  C as Un,
  T as Ce,
  i as nt,
  r as it,
  m as we,
  a5 as Zt,
  g as Gn,
  k as Mt,
  s as _e,
  l as Yn,
  h as Xn,
  a as Ve,
  a1 as qt,
  W as Qn,
  as as Zn,
  at as qn
} from '../main.491ba5c0.js'
import {
  d as ue,
  e as V,
  r as ve,
  c as S,
  i as Jn,
  a3 as Jt,
  f as Ke,
  s as Y,
  k as $e,
  q as ge,
  j as ie,
  Z as ot,
  F as Te,
  l as Re,
  p as rt,
  $ as kn,
  y as Fe,
  W as eo,
  z as to,
  D as st,
  n as Ie,
  v as no,
  a4 as ye,
  U as oo
} from './vendor.84fc1123.js'
import {
  aC as lo,
  aX as kt,
  e as Oe,
  aw as ut,
  aY as ao,
  K as U,
  h as io,
  R as ro,
  aZ as Se,
  w as he,
  o as be,
  j as Et,
  b as Ft,
  C as so,
  a_ as uo,
  y as co,
  z as fo,
  av as po,
  aK as vo,
  aJ as mo,
  aM as go,
  aL as ho,
  f as Rt,
  aF as bo,
  an as en,
  al as ze,
  aQ as tn,
  aO as nn,
  aP as He,
  a$ as yo,
  b0 as ct,
  b1 as Le,
  b2 as So,
  b3 as Dt,
  b4 as wo,
  b5 as _t,
  b6 as dt,
  b7 as on,
  aV as Nt,
  aW as Vt,
  B as Co,
  I as xo,
  T as Io
} from './VendorStore.d737faa9.js'
import { i as ft } from './initDefaultProps.71991ecc.js'
import { D as Oo, A as $o, B as To } from './antd.7f3c63f7.js'
function At(e, o) {
  const { key: n } = e
  let t
  return (
    'value' in e && ({ value: t } = e),
    n ?? (t !== void 0 ? t : `rc-index-key-${o}`)
  )
}
function ln(e, o) {
  const { label: n, value: t, options: l } = e || {}
  return {
    label: n || (o ? 'children' : 'label'),
    value: t || 'value',
    options: l || 'options'
  }
}
function Po(e) {
  let { fieldNames: o, childrenAsData: n } =
    arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}
  const t = [],
    { label: l, value: a, options: i } = ln(o, !1)
  function r(f, u) {
    f.forEach(s => {
      const h = s[l]
      if (u || !(i in s)) {
        const m = s[a]
        t.push({
          key: At(s, t.length),
          groupOption: u,
          data: s,
          label: h,
          value: m
        })
      } else {
        let m = h
        m === void 0 && n && (m = s.label),
          t.push({ key: At(s, t.length), group: !0, data: s, label: m }),
          r(s[i], !0)
      }
    })
  }
  return r(e, !1), t
}
function lt(e) {
  const o = w({}, e)
  return (
    'props' in o ||
      Object.defineProperty(o, 'props', {
        get() {
          return o
        }
      }),
    o
  )
}
function Mo(e, o) {
  if (!o || !o.length) return null
  let n = !1
  function t(a, i) {
    let [r, ...f] = i
    if (!r) return [a]
    const u = a.split(r)
    return (
      (n = n || u.length > 1),
      u.reduce((s, h) => [...s, ...t(h, f)], []).filter(s => s)
    )
  }
  const l = t(e, o)
  return n ? l : null
}
var Eo =
  (globalThis && globalThis.__rest) ||
  function(e, o) {
    var n = {}
    for (var t in e)
      Object.prototype.hasOwnProperty.call(e, t) &&
        o.indexOf(t) < 0 &&
        (n[t] = e[t])
    if (e != null && typeof Object.getOwnPropertySymbols == 'function')
      for (var l = 0, t = Object.getOwnPropertySymbols(e); l < t.length; l++)
        o.indexOf(t[l]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(e, t[l]) &&
          (n[t[l]] = e[t[l]])
    return n
  }
const Fo = e => {
    const o = e === !0 ? 0 : 1
    return {
      bottomLeft: {
        points: ['tl', 'bl'],
        offset: [0, 4],
        overflow: { adjustX: o, adjustY: 1 }
      },
      bottomRight: {
        points: ['tr', 'br'],
        offset: [0, 4],
        overflow: { adjustX: o, adjustY: 1 }
      },
      topLeft: {
        points: ['bl', 'tl'],
        offset: [0, -4],
        overflow: { adjustX: o, adjustY: 1 }
      },
      topRight: {
        points: ['br', 'tr'],
        offset: [0, -4],
        overflow: { adjustX: o, adjustY: 1 }
      }
    }
  },
  Ro = ue({
    name: 'SelectTrigger',
    inheritAttrs: !1,
    props: {
      dropdownAlign: Object,
      visible: { type: Boolean, default: void 0 },
      disabled: { type: Boolean, default: void 0 },
      dropdownClassName: String,
      dropdownStyle: H.object,
      placement: String,
      empty: { type: Boolean, default: void 0 },
      prefixCls: String,
      popupClassName: String,
      animation: String,
      transitionName: String,
      getPopupContainer: Function,
      dropdownRender: Function,
      containerWidth: Number,
      dropdownMatchSelectWidth: H.oneOfType([Number, Boolean]).def(!0),
      popupElement: H.any,
      direction: String,
      getTriggerDOMNode: Function,
      onPopupVisibleChange: Function,
      onPopupMouseEnter: Function,
      onPopupFocusin: Function,
      onPopupFocusout: Function
    },
    setup(e, o) {
      let { slots: n, attrs: t, expose: l } = o
      const a = V(() => {
          const { dropdownMatchSelectWidth: r } = e
          return Fo(r)
        }),
        i = ve()
      return (
        l({ getPopupElement: () => i.value }),
        () => {
          const r = w(w({}, e), t),
            { empty: f = !1 } = r,
            u = Eo(r, ['empty']),
            {
              visible: s,
              dropdownAlign: h,
              prefixCls: m,
              popupElement: P,
              dropdownClassName: b,
              dropdownStyle: C,
              direction: g = 'ltr',
              placement: I,
              dropdownMatchSelectWidth: M,
              containerWidth: R,
              dropdownRender: E,
              animation: p,
              transitionName: $,
              getPopupContainer: d,
              getTriggerDOMNode: x,
              onPopupVisibleChange: T,
              onPopupMouseEnter: L,
              onPopupFocusin: z,
              onPopupFocusout: G
            } = u,
            F = `${m}-dropdown`
          let _ = P
          E && (_ = E({ menuNode: P, props: e }))
          const W = p ? `${F}-${p}` : $,
            j = w({ minWidth: `${R}px` }, C)
          return (
            typeof M == 'number'
              ? (j.width = `${M}px`)
              : M && (j.width = `${R}px`),
            S(
              lo,
              X(
                X({}, e),
                {},
                {
                  showAction: T ? ['click'] : [],
                  hideAction: T ? ['click'] : [],
                  popupPlacement:
                    I || (g === 'rtl' ? 'bottomRight' : 'bottomLeft'),
                  builtinPlacements: a.value,
                  prefixCls: F,
                  popupTransitionName: W,
                  popupAlign: h,
                  popupVisible: s,
                  getPopupContainer: d,
                  popupClassName: k(b, { [`${F}-empty`]: f }),
                  popupStyle: j,
                  getTriggerDOMNode: x,
                  onPopupVisibleChange: T
                }
              ),
              {
                default: n.default,
                popup: () =>
                  S(
                    'div',
                    { ref: i, onMouseenter: L, onFocusin: z, onFocusout: G },
                    [_]
                  )
              }
            )
          )
        }
      )
    }
  }),
  Do = Ro,
  Ue = (e, o) => {
    let { slots: n } = o
    var t
    const {
      class: l,
      customizeIcon: a,
      customizeIconProps: i,
      onMousedown: r,
      onClick: f
    } = e
    let u
    return (
      typeof a == 'function' ? (u = a(i)) : (u = Jn(a) ? Jt(a) : a),
      S(
        'span',
        {
          class: l,
          onMousedown: s => {
            s.preventDefault(), r && r(s)
          },
          style: { userSelect: 'none', WebkitUserSelect: 'none' },
          unselectable: 'on',
          onClick: f,
          'aria-hidden': !0
        },
        [
          u !== void 0
            ? u
            : S('span', { class: l.split(/\s+/).map(s => `${s}-icon`) }, [
                (t = n.default) === null || t === void 0 ? void 0 : t.call(n)
              ])
        ]
      )
    )
  }
Ue.inheritAttrs = !1
Ue.displayName = 'TransBtn'
Ue.props = {
  class: String,
  customizeIcon: H.any,
  customizeIconProps: H.any,
  onMousedown: Function,
  onClick: Function
}
const je = Ue,
  _o = {
    inputRef: H.any,
    prefixCls: String,
    id: String,
    inputElement: H.VueNode,
    disabled: { type: Boolean, default: void 0 },
    autofocus: { type: Boolean, default: void 0 },
    autocomplete: String,
    editable: { type: Boolean, default: void 0 },
    activeDescendantId: String,
    value: String,
    open: { type: Boolean, default: void 0 },
    tabindex: H.oneOfType([H.number, H.string]),
    attrs: H.object,
    onKeydown: { type: Function },
    onMousedown: { type: Function },
    onChange: { type: Function },
    onPaste: { type: Function },
    onCompositionstart: { type: Function },
    onCompositionend: { type: Function },
    onFocus: { type: Function },
    onBlur: { type: Function }
  },
  No = ue({
    compatConfig: { MODE: 3 },
    name: 'SelectInput',
    inheritAttrs: !1,
    props: _o,
    setup(e) {
      let o = null
      const n = Ke('VCSelectContainerEvent')
      return () => {
        var t
        const {
          prefixCls: l,
          id: a,
          inputElement: i,
          disabled: r,
          tabindex: f,
          autofocus: u,
          autocomplete: s,
          editable: h,
          activeDescendantId: m,
          value: P,
          onKeydown: b,
          onMousedown: C,
          onChange: g,
          onPaste: I,
          onCompositionstart: M,
          onCompositionend: R,
          onFocus: E,
          onBlur: p,
          open: $,
          inputRef: d,
          attrs: x
        } = e
        let T = i || S(kt, null, null)
        const L = T.props || {},
          {
            onKeydown: z,
            onInput: G,
            onFocus: F,
            onBlur: _,
            onMousedown: W,
            onCompositionstart: j,
            onCompositionend: q,
            style: J
          } = L
        return (
          (T = Oe(
            T,
            w(
              w(
                w(
                  w(w({ type: 'search' }, L), {
                    id: a,
                    ref: d,
                    disabled: r,
                    tabindex: f,
                    lazy: !1,
                    autocomplete: s || 'off',
                    autofocus: u,
                    class: k(
                      `${l}-selection-search-input`,
                      (t = T == null ? void 0 : T.props) === null ||
                        t === void 0
                        ? void 0
                        : t.class
                    ),
                    role: 'combobox',
                    'aria-expanded': $,
                    'aria-haspopup': 'listbox',
                    'aria-owns': `${a}_list`,
                    'aria-autocomplete': 'list',
                    'aria-controls': `${a}_list`,
                    'aria-activedescendant': m
                  }),
                  x
                ),
                {
                  value: h ? P : '',
                  readonly: !h,
                  unselectable: h ? null : 'on',
                  style: w(w({}, J), { opacity: h ? null : 0 }),
                  onKeydown: y => {
                    b(y), z && z(y)
                  },
                  onMousedown: y => {
                    C(y), W && W(y)
                  },
                  onInput: y => {
                    g(y), G && G(y)
                  },
                  onCompositionstart(y) {
                    M(y), j && j(y)
                  },
                  onCompositionend(y) {
                    R(y), q && q(y)
                  },
                  onPaste: I,
                  onFocus: function() {
                    clearTimeout(o),
                      F && F(arguments.length <= 0 ? void 0 : arguments[0]),
                      E && E(arguments.length <= 0 ? void 0 : arguments[0]),
                      n == null ||
                        n.focus(arguments.length <= 0 ? void 0 : arguments[0])
                  },
                  onBlur: function() {
                    for (
                      var y = arguments.length, A = new Array(y), K = 0;
                      K < y;
                      K++
                    )
                      A[K] = arguments[K]
                    o = setTimeout(() => {
                      _ && _(A[0]), p && p(A[0]), n == null || n.blur(A[0])
                    }, 100)
                  }
                }
              ),
              T.type === 'textarea' ? {} : { type: 'search' }
            ),
            !0,
            !0
          )),
          T
        )
      }
    }
  }),
  an = No,
  Vo = Symbol('TreeSelectLegacyContextPropsKey')
function pt() {
  return Ke(Vo, {})
}
const Ao = {
    id: String,
    prefixCls: String,
    values: H.array,
    open: { type: Boolean, default: void 0 },
    searchValue: String,
    inputRef: H.any,
    placeholder: H.any,
    disabled: { type: Boolean, default: void 0 },
    mode: String,
    showSearch: { type: Boolean, default: void 0 },
    autofocus: { type: Boolean, default: void 0 },
    autocomplete: String,
    activeDescendantId: String,
    tabindex: H.oneOfType([H.number, H.string]),
    compositionStatus: Boolean,
    removeIcon: H.any,
    choiceTransitionName: String,
    maxTagCount: H.oneOfType([H.number, H.string]),
    maxTagTextLength: Number,
    maxTagPlaceholder: H.any.def(() => e => `+ ${e.length} ...`),
    tagRender: Function,
    onToggleOpen: { type: Function },
    onRemove: Function,
    onInputChange: Function,
    onInputPaste: Function,
    onInputKeyDown: Function,
    onInputMouseDown: Function,
    onInputCompositionStart: Function,
    onInputCompositionEnd: Function
  },
  Bt = e => {
    e.preventDefault(), e.stopPropagation()
  },
  Bo = ue({
    name: 'MultipleSelectSelector',
    inheritAttrs: !1,
    props: Ao,
    setup(e) {
      const o = Y(),
        n = Y(0),
        t = Y(!1),
        l = pt(),
        a = V(() => `${e.prefixCls}-selection`),
        i = V(() => (e.open || e.mode === 'tags' ? e.searchValue : '')),
        r = V(() => e.mode === 'tags' || (e.showSearch && (e.open || t.value))),
        f = ve('')
      $e(() => {
        f.value = i.value
      }),
        ge(() => {
          ie(
            f,
            () => {
              n.value = o.value.scrollWidth
            },
            { flush: 'post', immediate: !0 }
          )
        })
      function u(b, C, g, I, M) {
        return S(
          'span',
          {
            class: k(`${a.value}-item`, { [`${a.value}-item-disabled`]: g }),
            title:
              typeof b == 'string' || typeof b == 'number'
                ? b.toString()
                : void 0
          },
          [
            S('span', { class: `${a.value}-item-content` }, [C]),
            I &&
              S(
                je,
                {
                  class: `${a.value}-item-remove`,
                  onMousedown: Bt,
                  onClick: M,
                  customizeIcon: e.removeIcon
                },
                { default: () => [ot('×')] }
              )
          ]
        )
      }
      function s(b, C, g, I, M, R) {
        var E
        const p = d => {
          Bt(d), e.onToggleOpen(!open)
        }
        let $ = R
        return (
          l.keyEntities &&
            ($ =
              ((E = l.keyEntities[b]) === null || E === void 0
                ? void 0
                : E.node) || {}),
          S('span', { key: b, onMousedown: p }, [
            e.tagRender({
              label: C,
              value: b,
              disabled: g,
              closable: I,
              onClose: M,
              option: $
            })
          ])
        )
      }
      function h(b) {
        const { disabled: C, label: g, value: I, option: M } = b,
          R = !e.disabled && !C
        let E = g
        if (
          typeof e.maxTagTextLength == 'number' &&
          (typeof g == 'string' || typeof g == 'number')
        ) {
          const $ = String(E)
          $.length > e.maxTagTextLength &&
            (E = `${$.slice(0, e.maxTagTextLength)}...`)
        }
        const p = $ => {
          var d
          $ && $.stopPropagation(),
            (d = e.onRemove) === null || d === void 0 || d.call(e, b)
        }
        return typeof e.tagRender == 'function'
          ? s(I, E, C, R, p, M)
          : u(g, E, C, R, p)
      }
      function m(b) {
        const { maxTagPlaceholder: C = I => `+ ${I.length} ...` } = e,
          g = typeof C == 'function' ? C(b) : C
        return u(g, g, !1)
      }
      const P = b => {
        const C = b.target.composing
        ;(f.value = b.target.value), C || e.onInputChange(b)
      }
      return () => {
        const {
            id: b,
            prefixCls: C,
            values: g,
            open: I,
            inputRef: M,
            placeholder: R,
            disabled: E,
            autofocus: p,
            autocomplete: $,
            activeDescendantId: d,
            tabindex: x,
            compositionStatus: T,
            onInputPaste: L,
            onInputKeyDown: z,
            onInputMouseDown: G,
            onInputCompositionStart: F,
            onInputCompositionEnd: _
          } = e,
          W = S(
            'div',
            {
              class: `${a.value}-search`,
              style: { width: n.value + 'px' },
              key: 'input'
            },
            [
              S(
                an,
                {
                  inputRef: M,
                  open: I,
                  prefixCls: C,
                  id: b,
                  inputElement: null,
                  disabled: E,
                  autofocus: p,
                  autocomplete: $,
                  editable: r.value,
                  activeDescendantId: d,
                  value: f.value,
                  onKeydown: z,
                  onMousedown: G,
                  onChange: P,
                  onPaste: L,
                  onCompositionstart: F,
                  onCompositionend: _,
                  tabindex: x,
                  attrs: ut(e, !0),
                  onFocus: () => (t.value = !0),
                  onBlur: () => (t.value = !1)
                },
                null
              ),
              S(
                'span',
                {
                  ref: o,
                  class: `${a.value}-search-mirror`,
                  'aria-hidden': !0
                },
                [f.value, ot(' ')]
              )
            ]
          ),
          j = S(
            ao,
            {
              prefixCls: `${a.value}-overflow`,
              data: g,
              renderItem: h,
              renderRest: m,
              suffix: W,
              itemKey: 'key',
              maxCount: e.maxTagCount,
              key: 'overflow'
            },
            null
          )
        return S(Te, null, [
          j,
          !g.length &&
            !i.value &&
            !T &&
            S('span', { class: `${a.value}-placeholder` }, [R])
        ])
      }
    }
  }),
  Ho = Bo,
  Lo = {
    inputElement: H.any,
    id: String,
    prefixCls: String,
    values: H.array,
    open: { type: Boolean, default: void 0 },
    searchValue: String,
    inputRef: H.any,
    placeholder: H.any,
    compositionStatus: { type: Boolean, default: void 0 },
    disabled: { type: Boolean, default: void 0 },
    mode: String,
    showSearch: { type: Boolean, default: void 0 },
    autofocus: { type: Boolean, default: void 0 },
    autocomplete: String,
    activeDescendantId: String,
    tabindex: H.oneOfType([H.number, H.string]),
    activeValue: String,
    backfill: { type: Boolean, default: void 0 },
    optionLabelRender: Function,
    onInputChange: Function,
    onInputPaste: Function,
    onInputKeyDown: Function,
    onInputMouseDown: Function,
    onInputCompositionStart: Function,
    onInputCompositionEnd: Function
  },
  vt = ue({
    name: 'SingleSelector',
    setup(e) {
      const o = Y(!1),
        n = V(() => e.mode === 'combobox'),
        t = V(() => n.value || e.showSearch),
        l = V(() => {
          let s = e.searchValue || ''
          return n.value && e.activeValue && !o.value && (s = e.activeValue), s
        }),
        a = pt()
      ie(
        [n, () => e.activeValue],
        () => {
          n.value && (o.value = !1)
        },
        { immediate: !0 }
      )
      const i = V(() =>
          e.mode !== 'combobox' && !e.open && !e.showSearch
            ? !1
            : !!l.value || e.compositionStatus
        ),
        r = V(() => {
          const s = e.values[0]
          return s && (typeof s.label == 'string' || typeof s.label == 'number')
            ? s.label.toString()
            : void 0
        }),
        f = () => {
          if (e.values[0]) return null
          const s = i.value ? { visibility: 'hidden' } : void 0
          return S(
            'span',
            { class: `${e.prefixCls}-selection-placeholder`, style: s },
            [e.placeholder]
          )
        },
        u = s => {
          s.target.composing || ((o.value = !0), e.onInputChange(s))
        }
      return () => {
        var s, h, m, P
        const {
            inputElement: b,
            prefixCls: C,
            id: g,
            values: I,
            inputRef: M,
            disabled: R,
            autofocus: E,
            autocomplete: p,
            activeDescendantId: $,
            open: d,
            tabindex: x,
            optionLabelRender: T,
            onInputKeyDown: L,
            onInputMouseDown: z,
            onInputPaste: G,
            onInputCompositionStart: F,
            onInputCompositionEnd: _
          } = e,
          W = I[0]
        let j = null
        if (W && a.customSlots) {
          const q = (s = W.key) !== null && s !== void 0 ? s : W.value,
            J =
              ((h = a.keyEntities[q]) === null || h === void 0
                ? void 0
                : h.node) || {}
          ;(j =
            a.customSlots[
              (m = J.slots) === null || m === void 0 ? void 0 : m.title
            ] ||
            a.customSlots.title ||
            W.label),
            typeof j == 'function' && (j = j(J))
        } else j = T && W ? T(W.option) : W == null ? void 0 : W.label
        return S(Te, null, [
          S('span', { class: `${C}-selection-search` }, [
            S(
              an,
              {
                inputRef: M,
                prefixCls: C,
                id: g,
                open: d,
                inputElement: b,
                disabled: R,
                autofocus: E,
                autocomplete: p,
                editable: t.value,
                activeDescendantId: $,
                value: l.value,
                onKeydown: L,
                onMousedown: z,
                onChange: u,
                onPaste: G,
                onCompositionstart: F,
                onCompositionend: _,
                tabindex: x,
                attrs: ut(e, !0)
              },
              null
            )
          ]),
          !n.value &&
            W &&
            !i.value &&
            S('span', { class: `${C}-selection-item`, title: r.value }, [
              S(
                Te,
                { key: (P = W.key) !== null && P !== void 0 ? P : W.value },
                [j]
              )
            ]),
          f()
        ])
      }
    }
  })
vt.props = Lo
vt.inheritAttrs = !1
const zo = vt
function jo(e) {
  return ![
    U.ESC,
    U.SHIFT,
    U.BACKSPACE,
    U.TAB,
    U.WIN_KEY,
    U.ALT,
    U.META,
    U.WIN_KEY_RIGHT,
    U.CTRL,
    U.SEMICOLON,
    U.EQUALS,
    U.CAPS_LOCK,
    U.CONTEXT_MENU,
    U.F1,
    U.F2,
    U.F3,
    U.F4,
    U.F5,
    U.F6,
    U.F7,
    U.F8,
    U.F9,
    U.F10,
    U.F11,
    U.F12
  ].includes(e)
}
function rn() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 250,
    o = null,
    n
  Re(() => {
    clearTimeout(n)
  })
  function t(l) {
    ;(l || o === null) && (o = l),
      clearTimeout(n),
      (n = setTimeout(() => {
        o = null
      }, e))
  }
  return [() => o, t]
}
function Ne() {
  const e = o => {
    e.current = o
  }
  return e
}
const Wo = ue({
    name: 'Selector',
    inheritAttrs: !1,
    props: {
      id: String,
      prefixCls: String,
      showSearch: { type: Boolean, default: void 0 },
      open: { type: Boolean, default: void 0 },
      values: H.array,
      multiple: { type: Boolean, default: void 0 },
      mode: String,
      searchValue: String,
      activeValue: String,
      inputElement: H.any,
      autofocus: { type: Boolean, default: void 0 },
      activeDescendantId: String,
      tabindex: H.oneOfType([H.number, H.string]),
      disabled: { type: Boolean, default: void 0 },
      placeholder: H.any,
      removeIcon: H.any,
      maxTagCount: H.oneOfType([H.number, H.string]),
      maxTagTextLength: Number,
      maxTagPlaceholder: H.any,
      tagRender: Function,
      optionLabelRender: Function,
      tokenWithEnter: { type: Boolean, default: void 0 },
      choiceTransitionName: String,
      onToggleOpen: { type: Function },
      onSearch: Function,
      onSearchSubmit: Function,
      onRemove: Function,
      onInputKeyDown: { type: Function },
      domRef: Function
    },
    setup(e, o) {
      let { expose: n } = o
      const t = Ne(),
        l = ve(!1),
        [a, i] = rn(0),
        r = I => {
          const { which: M } = I
          ;(M === U.UP || M === U.DOWN) && I.preventDefault(),
            e.onInputKeyDown && e.onInputKeyDown(I),
            M === U.ENTER &&
              e.mode === 'tags' &&
              !l.value &&
              !e.open &&
              e.onSearchSubmit(I.target.value),
            jo(M) && e.onToggleOpen(!0)
        },
        f = () => {
          i(!0)
        }
      let u = null
      const s = I => {
          e.onSearch(I, !0, l.value) !== !1 && e.onToggleOpen(!0)
        },
        h = () => {
          l.value = !0
        },
        m = I => {
          ;(l.value = !1), e.mode !== 'combobox' && s(I.target.value)
        },
        P = I => {
          let {
            target: { value: M }
          } = I
          if (e.tokenWithEnter && u && /[\r\n]/.test(u)) {
            const R = u
              .replace(/[\r\n]+$/, '')
              .replace(/\r\n/g, ' ')
              .replace(/[\r\n]/g, ' ')
            M = M.replace(R, u)
          }
          ;(u = null), s(M)
        },
        b = I => {
          const { clipboardData: M } = I
          u = M.getData('text')
        },
        C = I => {
          let { target: M } = I
          M !== t.current &&
            (document.body.style.msTouchAction !== void 0
              ? setTimeout(() => {
                  t.current.focus()
                })
              : t.current.focus())
        },
        g = I => {
          const M = a()
          I.target !== t.current && !M && I.preventDefault(),
            ((e.mode !== 'combobox' && (!e.showSearch || !M)) || !e.open) &&
              (e.open && e.onSearch('', !0, !1), e.onToggleOpen())
        }
      return (
        n({
          focus: () => {
            t.current.focus()
          },
          blur: () => {
            t.current.blur()
          }
        }),
        () => {
          const { prefixCls: I, domRef: M, mode: R } = e,
            E = {
              inputRef: t,
              onInputKeyDown: r,
              onInputMouseDown: f,
              onInputChange: P,
              onInputPaste: b,
              compositionStatus: l.value,
              onInputCompositionStart: h,
              onInputCompositionEnd: m
            },
            p =
              R === 'multiple' || R === 'tags'
                ? S(Ho, X(X({}, e), E), null)
                : S(zo, X(X({}, e), E), null)
          return S(
            'div',
            { ref: M, class: `${I}-selector`, onClick: C, onMousedown: g },
            [p]
          )
        }
      )
    }
  }),
  Ko = Wo
function Uo(e, o, n) {
  function t(l) {
    var a, i, r
    let f = l.target
    f.shadowRoot && l.composed && (f = l.composedPath()[0] || f)
    const u = [
      (a = e[0]) === null || a === void 0 ? void 0 : a.value,
      (r = (i = e[1]) === null || i === void 0 ? void 0 : i.value) === null ||
      r === void 0
        ? void 0
        : r.getPopupElement()
    ]
    o.value && u.every(s => s && !s.contains(f) && s !== f) && n(!1)
  }
  ge(() => {
    window.addEventListener('mousedown', t)
  }),
    Re(() => {
      window.removeEventListener('mousedown', t)
    })
}
function Go() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 10
  const o = Y(!1)
  let n
  const t = () => {
    clearTimeout(n)
  }
  return (
    ge(() => {
      t()
    }),
    [
      o,
      (a, i) => {
        t(),
          (n = setTimeout(() => {
            ;(o.value = a), i && i()
          }, e))
      },
      t
    ]
  )
}
const sn = Symbol('BaseSelectContextKey')
function Yo(e) {
  return rt(sn, e)
}
function Xo() {
  return Ke(sn, {})
}
function un(e) {
  if (!kn(e)) return Fe(e)
  const o = new Proxy(
    {},
    {
      get(n, t, l) {
        return Reflect.get(e.value, t, l)
      },
      set(n, t, l) {
        return (e.value[t] = l), !0
      },
      deleteProperty(n, t) {
        return Reflect.deleteProperty(e.value, t)
      },
      has(n, t) {
        return Reflect.has(e.value, t)
      },
      ownKeys() {
        return Object.keys(e.value)
      },
      getOwnPropertyDescriptor() {
        return { enumerable: !0, configurable: !0 }
      }
    }
  )
  return Fe(o)
}
var Qo =
  (globalThis && globalThis.__rest) ||
  function(e, o) {
    var n = {}
    for (var t in e)
      Object.prototype.hasOwnProperty.call(e, t) &&
        o.indexOf(t) < 0 &&
        (n[t] = e[t])
    if (e != null && typeof Object.getOwnPropertySymbols == 'function')
      for (var l = 0, t = Object.getOwnPropertySymbols(e); l < t.length; l++)
        o.indexOf(t[l]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(e, t[l]) &&
          (n[t[l]] = e[t[l]])
    return n
  }
const Zo = [
    'value',
    'onChange',
    'removeIcon',
    'placeholder',
    'autofocus',
    'maxTagCount',
    'maxTagTextLength',
    'maxTagPlaceholder',
    'choiceTransitionName',
    'onInputKeyDown',
    'onPopupScroll',
    'tabindex',
    'OptionList',
    'notFoundContent'
  ],
  qo = () => ({
    prefixCls: String,
    id: String,
    omitDomProps: Array,
    displayValues: Array,
    onDisplayValuesChange: Function,
    activeValue: String,
    activeDescendantId: String,
    onActiveValueChange: Function,
    searchValue: String,
    onSearch: Function,
    onSearchSplit: Function,
    maxLength: Number,
    OptionList: H.any,
    emptyOptions: Boolean
  }),
  cn = () => ({
    showSearch: { type: Boolean, default: void 0 },
    tagRender: { type: Function },
    optionLabelRender: { type: Function },
    direction: { type: String },
    tabindex: Number,
    autofocus: Boolean,
    notFoundContent: H.any,
    placeholder: H.any,
    onClear: Function,
    choiceTransitionName: String,
    mode: String,
    disabled: { type: Boolean, default: void 0 },
    loading: { type: Boolean, default: void 0 },
    open: { type: Boolean, default: void 0 },
    defaultOpen: { type: Boolean, default: void 0 },
    onDropdownVisibleChange: { type: Function },
    getInputElement: { type: Function },
    getRawInputElement: { type: Function },
    maxTagTextLength: Number,
    maxTagCount: { type: [String, Number] },
    maxTagPlaceholder: H.any,
    tokenSeparators: { type: Array },
    allowClear: { type: Boolean, default: void 0 },
    showArrow: { type: Boolean, default: void 0 },
    inputIcon: H.any,
    clearIcon: H.any,
    removeIcon: H.any,
    animation: String,
    transitionName: String,
    dropdownStyle: { type: Object },
    dropdownClassName: String,
    dropdownMatchSelectWidth: { type: [Boolean, Number], default: void 0 },
    dropdownRender: { type: Function },
    dropdownAlign: Object,
    placement: { type: String },
    getPopupContainer: { type: Function },
    showAction: { type: Array },
    onBlur: { type: Function },
    onFocus: { type: Function },
    onKeyup: Function,
    onKeydown: Function,
    onMousedown: Function,
    onPopupScroll: Function,
    onInputKeyDown: Function,
    onMouseenter: Function,
    onMouseleave: Function,
    onClick: Function
  }),
  Jo = () => w(w({}, qo()), cn())
function dn(e) {
  return e === 'tags' || e === 'multiple'
}
const ko = ue({
    compatConfig: { MODE: 3 },
    name: 'BaseSelect',
    inheritAttrs: !1,
    props: ft(Jo(), { showAction: [], notFoundContent: 'Not Found' }),
    setup(e, o) {
      let { attrs: n, expose: t, slots: l } = o
      const a = V(() => dn(e.mode)),
        i = V(() =>
          e.showSearch !== void 0
            ? e.showSearch
            : a.value || e.mode === 'combobox'
        ),
        r = Y(!1)
      ge(() => {
        r.value = io()
      })
      const f = pt(),
        u = Y(null),
        s = Ne(),
        h = Y(null),
        m = Y(null),
        P = Y(null),
        b = ve(!1),
        [C, g, I] = Go()
      t({
        focus: () => {
          var c
          ;(c = m.value) === null || c === void 0 || c.focus()
        },
        blur: () => {
          var c
          ;(c = m.value) === null || c === void 0 || c.blur()
        },
        scrollTo: c => {
          var v
          return (v = P.value) === null || v === void 0 ? void 0 : v.scrollTo(c)
        }
      })
      const E = V(() => {
          var c
          if (e.mode !== 'combobox') return e.searchValue
          const v =
            (c = e.displayValues[0]) === null || c === void 0 ? void 0 : c.value
          return typeof v == 'string' || typeof v == 'number' ? String(v) : ''
        }),
        p = e.open !== void 0 ? e.open : e.defaultOpen,
        $ = Y(p),
        d = Y(p),
        x = c => {
          ;($.value = e.open !== void 0 ? e.open : c), (d.value = $.value)
        }
      ie(
        () => e.open,
        () => {
          x(e.open)
        }
      )
      const T = V(() => !e.notFoundContent && e.emptyOptions)
      $e(() => {
        ;(d.value = $.value),
          (e.disabled || (T.value && d.value && e.mode === 'combobox')) &&
            (d.value = !1)
      })
      const L = V(() => (T.value ? !1 : d.value)),
        z = c => {
          const v = c !== void 0 ? c : !d.value
          d.value !== v &&
            !e.disabled &&
            (x(v),
            e.onDropdownVisibleChange && e.onDropdownVisibleChange(v),
            !v &&
              B.value &&
              ((B.value = !1),
              g(!1, () => {
                ;(A.value = !1), (b.value = !1)
              })))
        },
        G = V(() =>
          (e.tokenSeparators || []).some(c =>
            [
              `
`,
              `\r
`
            ].includes(c)
          )
        ),
        F = (c, v, N) => {
          var D, Q
          let le = !0,
            te = c
          ;(D = e.onActiveValueChange) === null ||
            D === void 0 ||
            D.call(e, null)
          const ae = N ? null : Mo(c, e.tokenSeparators)
          return (
            e.mode !== 'combobox' &&
              ae &&
              ((te = ''),
              (Q = e.onSearchSplit) === null || Q === void 0 || Q.call(e, ae),
              z(!1),
              (le = !1)),
            e.onSearch &&
              E.value !== te &&
              e.onSearch(te, { source: v ? 'typing' : 'effect' }),
            le
          )
        },
        _ = c => {
          var v
          !c ||
            !c.trim() ||
            (v = e.onSearch) === null ||
            v === void 0 ||
            v.call(e, c, { source: 'submit' })
        }
      ie(
        d,
        () => {
          !d.value && !a.value && e.mode !== 'combobox' && F('', !1, !1)
        },
        { immediate: !0, flush: 'post' }
      ),
        ie(
          () => e.disabled,
          () => {
            $.value && e.disabled && x(!1), e.disabled && !b.value && g(!1)
          },
          { immediate: !0 }
        )
      const [W, j] = rn(),
        q = function(c) {
          var v
          const N = W(),
            { which: D } = c
          if (
            (D === U.ENTER &&
              (e.mode !== 'combobox' && c.preventDefault(), d.value || z(!0)),
            j(!!E.value),
            D === U.BACKSPACE &&
              !N &&
              a.value &&
              !E.value &&
              e.displayValues.length)
          ) {
            const ae = [...e.displayValues]
            let Z = null
            for (let ce = ae.length - 1; ce >= 0; ce -= 1) {
              const de = ae[ce]
              if (!de.disabled) {
                ae.splice(ce, 1), (Z = de)
                break
              }
            }
            Z && e.onDisplayValuesChange(ae, { type: 'remove', values: [Z] })
          }
          for (
            var Q = arguments.length, le = new Array(Q > 1 ? Q - 1 : 0), te = 1;
            te < Q;
            te++
          )
            le[te - 1] = arguments[te]
          d.value && P.value && P.value.onKeydown(c, ...le),
            (v = e.onKeydown) === null || v === void 0 || v.call(e, c, ...le)
        },
        J = function(c) {
          for (
            var v = arguments.length, N = new Array(v > 1 ? v - 1 : 0), D = 1;
            D < v;
            D++
          )
            N[D - 1] = arguments[D]
          d.value && P.value && P.value.onKeyup(c, ...N),
            e.onKeyup && e.onKeyup(c, ...N)
        },
        y = c => {
          const v = e.displayValues.filter(N => N !== c)
          e.onDisplayValuesChange(v, { type: 'remove', values: [c] })
        },
        A = Y(!1),
        K = function() {
          g(!0),
            e.disabled ||
              (e.onFocus && !A.value && e.onFocus(...arguments),
              e.showAction && e.showAction.includes('focus') && z(!0)),
            (A.value = !0)
        },
        B = ve(!1),
        ee = function() {
          if (
            B.value ||
            ((b.value = !0),
            g(!1, () => {
              ;(A.value = !1), (b.value = !1), z(!1)
            }),
            e.disabled)
          )
            return
          const c = E.value
          c &&
            (e.mode === 'tags'
              ? e.onSearch(c, { source: 'submit' })
              : e.mode === 'multiple' && e.onSearch('', { source: 'blur' })),
            e.onBlur && e.onBlur(...arguments)
        },
        ne = () => {
          B.value = !0
        },
        re = () => {
          B.value = !1
        }
      rt('VCSelectContainerEvent', { focus: K, blur: ee })
      const oe = []
      ge(() => {
        oe.forEach(c => clearTimeout(c)), oe.splice(0, oe.length)
      }),
        Re(() => {
          oe.forEach(c => clearTimeout(c)), oe.splice(0, oe.length)
        })
      const fe = function(c) {
          var v, N
          const { target: D } = c,
            Q =
              (v = h.value) === null || v === void 0
                ? void 0
                : v.getPopupElement()
          if (Q && Q.contains(D)) {
            const Z = setTimeout(() => {
              var ce
              const de = oe.indexOf(Z)
              de !== -1 && oe.splice(de, 1),
                I(),
                !r.value &&
                  !Q.contains(document.activeElement) &&
                  ((ce = m.value) === null || ce === void 0 || ce.focus())
            })
            oe.push(Z)
          }
          for (
            var le = arguments.length,
              te = new Array(le > 1 ? le - 1 : 0),
              ae = 1;
            ae < le;
            ae++
          )
            te[ae - 1] = arguments[ae]
          ;(N = e.onMousedown) === null || N === void 0 || N.call(e, c, ...te)
        },
        pe = Y(null),
        O = () => {}
      return (
        ge(() => {
          ie(
            L,
            () => {
              var c
              if (L.value) {
                const v = Math.ceil(
                  (c = u.value) === null || c === void 0
                    ? void 0
                    : c.offsetWidth
                )
                pe.value !== v && !Number.isNaN(v) && (pe.value = v)
              }
            },
            { immediate: !0, flush: 'post' }
          )
        }),
        Uo([u, h], L, z),
        Yo(
          un(
            w(w({}, eo(e)), {
              open: d,
              triggerOpen: L,
              showSearch: i,
              multiple: a,
              toggleOpen: z
            })
          )
        ),
        () => {
          const c = w(w({}, e), n),
            {
              prefixCls: v,
              id: N,
              open: D,
              defaultOpen: Q,
              mode: le,
              showSearch: te,
              searchValue: ae,
              onSearch: Z,
              allowClear: ce,
              clearIcon: de,
              showArrow: Ae,
              inputIcon: Ye,
              disabled: Pe,
              loading: Me,
              getInputElement: St,
              getPopupContainer: wn,
              placement: Cn,
              animation: xn,
              transitionName: In,
              dropdownStyle: On,
              dropdownClassName: $n,
              dropdownMatchSelectWidth: Tn,
              dropdownRender: Pn,
              dropdownAlign: Mn,
              showAction: Ta,
              direction: En,
              tokenSeparators: Pa,
              tagRender: Fn,
              optionLabelRender: Rn,
              onPopupScroll: Ma,
              onDropdownVisibleChange: Ea,
              onFocus: Fa,
              onBlur: Ra,
              onKeyup: Da,
              onKeydown: _a,
              onMousedown: Na,
              onClear: Xe,
              omitDomProps: Qe,
              getRawInputElement: wt,
              displayValues: Be,
              onDisplayValuesChange: Dn,
              emptyOptions: _n,
              activeDescendantId: Nn,
              activeValue: Vn,
              OptionList: An
            } = c,
            Bn = Qo(c, [
              'prefixCls',
              'id',
              'open',
              'defaultOpen',
              'mode',
              'showSearch',
              'searchValue',
              'onSearch',
              'allowClear',
              'clearIcon',
              'showArrow',
              'inputIcon',
              'disabled',
              'loading',
              'getInputElement',
              'getPopupContainer',
              'placement',
              'animation',
              'transitionName',
              'dropdownStyle',
              'dropdownClassName',
              'dropdownMatchSelectWidth',
              'dropdownRender',
              'dropdownAlign',
              'showAction',
              'direction',
              'tokenSeparators',
              'tagRender',
              'optionLabelRender',
              'onPopupScroll',
              'onDropdownVisibleChange',
              'onFocus',
              'onBlur',
              'onKeyup',
              'onKeydown',
              'onMousedown',
              'onClear',
              'omitDomProps',
              'getRawInputElement',
              'displayValues',
              'onDisplayValuesChange',
              'emptyOptions',
              'activeDescendantId',
              'activeValue',
              'OptionList'
            ]),
            Ct = (le === 'combobox' && St && St()) || null,
            De = typeof wt == 'function' && wt(),
            Ze = w({}, Bn)
          let xt
          De &&
            (xt = xe => {
              z(xe)
            }),
            Zo.forEach(xe => {
              delete Ze[xe]
            }),
            Qe == null ||
              Qe.forEach(xe => {
                delete Ze[xe]
              })
          const It = Ae !== void 0 ? Ae : Me || (!a.value && le !== 'combobox')
          let Ot
          It &&
            (Ot = S(
              je,
              {
                class: k(`${v}-arrow`, { [`${v}-arrow-loading`]: Me }),
                customizeIcon: Ye,
                customizeIconProps: {
                  loading: Me,
                  searchValue: E.value,
                  open: d.value,
                  focused: C.value,
                  showSearch: i.value
                }
              },
              null
            ))
          let $t
          const Hn = () => {
            Xe == null || Xe(),
              Dn([], { type: 'clear', values: Be }),
              F('', !1, !1)
          }
          !Pe &&
            ce &&
            (Be.length || E.value) &&
            ($t = S(
              je,
              { class: `${v}-clear`, onMousedown: Hn, customizeIcon: de },
              { default: () => [ot('×')] }
            ))
          const Ln = S(
              An,
              { ref: P },
              w(w({}, f.customSlots), { option: l.option })
            ),
            zn = k(v, n.class, {
              [`${v}-focused`]: C.value,
              [`${v}-multiple`]: a.value,
              [`${v}-single`]: !a.value,
              [`${v}-allow-clear`]: ce,
              [`${v}-show-arrow`]: It,
              [`${v}-disabled`]: Pe,
              [`${v}-loading`]: Me,
              [`${v}-open`]: d.value,
              [`${v}-customize-input`]: Ct,
              [`${v}-show-search`]: i.value
            }),
            Tt = S(
              Do,
              {
                ref: h,
                disabled: Pe,
                prefixCls: v,
                visible: L.value,
                popupElement: Ln,
                containerWidth: pe.value,
                animation: xn,
                transitionName: In,
                dropdownStyle: On,
                dropdownClassName: $n,
                direction: En,
                dropdownMatchSelectWidth: Tn,
                dropdownRender: Pn,
                dropdownAlign: Mn,
                placement: Cn,
                getPopupContainer: wn,
                empty: _n,
                getTriggerDOMNode: () => s.current,
                onPopupVisibleChange: xt,
                onPopupMouseEnter: O,
                onPopupFocusin: ne,
                onPopupFocusout: re
              },
              {
                default: () =>
                  De
                    ? We(De) && Oe(De, { ref: s }, !1, !0)
                    : S(
                        Ko,
                        X(
                          X({}, e),
                          {},
                          {
                            domRef: s,
                            prefixCls: v,
                            inputElement: Ct,
                            ref: m,
                            id: N,
                            showSearch: i.value,
                            mode: le,
                            activeDescendantId: Nn,
                            tagRender: Fn,
                            optionLabelRender: Rn,
                            values: Be,
                            open: d.value,
                            onToggleOpen: z,
                            activeValue: Vn,
                            searchValue: E.value,
                            onSearch: F,
                            onSearchSubmit: _,
                            onRemove: y,
                            tokenWithEnter: G.value
                          }
                        ),
                        null
                      )
              }
            )
          let qe
          return (
            De
              ? (qe = Tt)
              : (qe = S(
                  'div',
                  X(
                    X({}, Ze),
                    {},
                    {
                      class: zn,
                      ref: u,
                      onMousedown: fe,
                      onKeydown: q,
                      onKeyup: J
                    }
                  ),
                  [
                    C.value &&
                      !d.value &&
                      S(
                        'span',
                        {
                          style: {
                            width: 0,
                            height: 0,
                            position: 'absolute',
                            overflow: 'hidden',
                            opacity: 0
                          },
                          'aria-live': 'polite'
                        },
                        [
                          `${Be.map(xe => {
                            let { label: Pt, value: jn } = xe
                            return ['number', 'string'].includes(typeof Pt)
                              ? Pt
                              : jn
                          }).join(', ')}`
                        ]
                      ),
                    Tt,
                    Ot,
                    $t
                  ]
                )),
            qe
          )
        }
      )
    }
  }),
  Ge = (e, o) => {
    let { height: n, offset: t, prefixCls: l, onInnerResize: a } = e,
      { slots: i } = o
    var r
    let f = {},
      u = { display: 'flex', flexDirection: 'column' }
    return (
      t !== void 0 &&
        ((f = { height: `${n}px`, position: 'relative', overflow: 'hidden' }),
        (u = w(w({}, u), {
          transform: `translateY(${t}px)`,
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0
        }))),
      S('div', { style: f }, [
        S(
          ro,
          {
            onResize: s => {
              let { offsetHeight: h } = s
              h && a && a()
            }
          },
          {
            default: () => [
              S('div', { style: u, class: k({ [`${l}-holder-inner`]: l }) }, [
                (r = i.default) === null || r === void 0 ? void 0 : r.call(i)
              ])
            ]
          }
        )
      ])
    )
  }
Ge.displayName = 'Filter'
Ge.inheritAttrs = !1
Ge.props = {
  prefixCls: String,
  height: Number,
  offset: Number,
  onInnerResize: Function
}
const el = Ge,
  fn = (e, o) => {
    let { setRef: n } = e,
      { slots: t } = o
    var l
    const a = Xt((l = t.default) === null || l === void 0 ? void 0 : l.call(t))
    return a && a.length ? Jt(a[0], { ref: n }) : a
  }
fn.props = { setRef: { type: Function, default: () => {} } }
const tl = fn,
  nl = 20
function Ht(e) {
  return 'touches' in e ? e.touches[0].pageY : e.pageY
}
const ol = ue({
  compatConfig: { MODE: 3 },
  name: 'ScrollBar',
  inheritAttrs: !1,
  props: {
    prefixCls: String,
    scrollTop: Number,
    scrollHeight: Number,
    height: Number,
    count: Number,
    onScroll: { type: Function },
    onStartMove: { type: Function },
    onStopMove: { type: Function }
  },
  setup() {
    return {
      moveRaf: null,
      scrollbarRef: Ne(),
      thumbRef: Ne(),
      visibleTimeout: null,
      state: Fe({ dragging: !1, pageY: null, startTop: null, visible: !1 })
    }
  },
  watch: {
    scrollTop: {
      handler() {
        this.delayHidden()
      },
      flush: 'post'
    }
  },
  mounted() {
    var e, o
    ;(e = this.scrollbarRef.current) === null ||
      e === void 0 ||
      e.addEventListener(
        'touchstart',
        this.onScrollbarTouchStart,
        Se ? { passive: !1 } : !1
      ),
      (o = this.thumbRef.current) === null ||
        o === void 0 ||
        o.addEventListener(
          'touchstart',
          this.onMouseDown,
          Se ? { passive: !1 } : !1
        )
  },
  beforeUnmount() {
    this.removeEvents(), clearTimeout(this.visibleTimeout)
  },
  methods: {
    delayHidden() {
      clearTimeout(this.visibleTimeout),
        (this.state.visible = !0),
        (this.visibleTimeout = setTimeout(() => {
          this.state.visible = !1
        }, 2e3))
    },
    onScrollbarTouchStart(e) {
      e.preventDefault()
    },
    onContainerMouseDown(e) {
      e.stopPropagation(), e.preventDefault()
    },
    patchEvents() {
      window.addEventListener('mousemove', this.onMouseMove),
        window.addEventListener('mouseup', this.onMouseUp),
        this.thumbRef.current.addEventListener(
          'touchmove',
          this.onMouseMove,
          Se ? { passive: !1 } : !1
        ),
        this.thumbRef.current.addEventListener('touchend', this.onMouseUp)
    },
    removeEvents() {
      window.removeEventListener('mousemove', this.onMouseMove),
        window.removeEventListener('mouseup', this.onMouseUp),
        this.scrollbarRef.current.removeEventListener(
          'touchstart',
          this.onScrollbarTouchStart,
          Se ? { passive: !1 } : !1
        ),
        this.thumbRef.current &&
          (this.thumbRef.current.removeEventListener(
            'touchstart',
            this.onMouseDown,
            Se ? { passive: !1 } : !1
          ),
          this.thumbRef.current.removeEventListener(
            'touchmove',
            this.onMouseMove,
            Se ? { passive: !1 } : !1
          ),
          this.thumbRef.current.removeEventListener(
            'touchend',
            this.onMouseUp
          )),
        he.cancel(this.moveRaf)
    },
    onMouseDown(e) {
      const { onStartMove: o } = this.$props
      w(this.state, { dragging: !0, pageY: Ht(e), startTop: this.getTop() }),
        o(),
        this.patchEvents(),
        e.stopPropagation(),
        e.preventDefault()
    },
    onMouseMove(e) {
      const { dragging: o, pageY: n, startTop: t } = this.state,
        { onScroll: l } = this.$props
      if ((he.cancel(this.moveRaf), o)) {
        const a = Ht(e) - n,
          i = t + a,
          r = this.getEnableScrollRange(),
          f = this.getEnableHeightRange(),
          u = f ? i / f : 0,
          s = Math.ceil(u * r)
        this.moveRaf = he(() => {
          l(s)
        })
      }
    },
    onMouseUp() {
      const { onStopMove: e } = this.$props
      ;(this.state.dragging = !1), e(), this.removeEvents()
    },
    getSpinHeight() {
      const { height: e, scrollHeight: o } = this.$props
      let n = (e / o) * 100
      return (n = Math.max(n, nl)), (n = Math.min(n, e / 2)), Math.floor(n)
    },
    getEnableScrollRange() {
      const { scrollHeight: e, height: o } = this.$props
      return e - o || 0
    },
    getEnableHeightRange() {
      const { height: e } = this.$props,
        o = this.getSpinHeight()
      return e - o || 0
    },
    getTop() {
      const { scrollTop: e } = this.$props,
        o = this.getEnableScrollRange(),
        n = this.getEnableHeightRange()
      return e === 0 || o === 0 ? 0 : (e / o) * n
    },
    showScroll() {
      const { height: e, scrollHeight: o } = this.$props
      return o > e
    }
  },
  render() {
    const { dragging: e, visible: o } = this.state,
      { prefixCls: n } = this.$props,
      t = this.getSpinHeight() + 'px',
      l = this.getTop() + 'px',
      a = this.showScroll(),
      i = a && o
    return S(
      'div',
      {
        ref: this.scrollbarRef,
        class: k(`${n}-scrollbar`, { [`${n}-scrollbar-show`]: a }),
        style: {
          width: '8px',
          top: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: i ? void 0 : 'none'
        },
        onMousedown: this.onContainerMouseDown,
        onMousemove: this.delayHidden
      },
      [
        S(
          'div',
          {
            ref: this.thumbRef,
            class: k(`${n}-scrollbar-thumb`, {
              [`${n}-scrollbar-thumb-moving`]: e
            }),
            style: {
              width: '100%',
              height: t,
              top: l,
              left: 0,
              position: 'absolute',
              background: 'rgba(0, 0, 0, 0.5)',
              borderRadius: '99px',
              cursor: 'pointer',
              userSelect: 'none'
            },
            onMousedown: this.onMouseDown
          },
          null
        )
      ]
    )
  }
})
function ll(e, o, n, t) {
  const l = new Map(),
    a = new Map(),
    i = ve(Symbol('update'))
  ie(e, () => {
    i.value = Symbol('update')
  })
  let r
  function f() {
    he.cancel(r)
  }
  function u() {
    f(),
      (r = he(() => {
        l.forEach((h, m) => {
          if (h && h.offsetParent) {
            const { offsetHeight: P } = h
            a.get(m) !== P &&
              ((i.value = Symbol('update')), a.set(m, h.offsetHeight))
          }
        })
      }))
  }
  function s(h, m) {
    const P = o(h),
      b = l.get(P)
    m ? (l.set(P, m.$el || m), u()) : l.delete(P),
      !b != !m && (m ? n == null || n(h) : t == null || t(h))
  }
  return (
    to(() => {
      f()
    }),
    [s, u, a, i]
  )
}
function al(e, o, n, t, l, a, i, r) {
  let f
  return u => {
    if (u == null) {
      r()
      return
    }
    he.cancel(f)
    const s = o.value,
      h = t.itemHeight
    if (typeof u == 'number') i(u)
    else if (u && typeof u == 'object') {
      let m
      const { align: P } = u
      'index' in u ? ({ index: m } = u) : (m = s.findIndex(g => l(g) === u.key))
      const { offset: b = 0 } = u,
        C = (g, I) => {
          if (g < 0 || !e.value) return
          const M = e.value.clientHeight
          let R = !1,
            E = I
          if (M) {
            const p = I || P
            let $ = 0,
              d = 0,
              x = 0
            const T = Math.min(s.length, m)
            for (let G = 0; G <= T; G += 1) {
              const F = l(s[G])
              d = $
              const _ = n.get(F)
              ;(x = d + (_ === void 0 ? h : _)),
                ($ = x),
                G === m && _ === void 0 && (R = !0)
            }
            const L = e.value.scrollTop
            let z = null
            switch (p) {
              case 'top':
                z = d - b
                break
              case 'bottom':
                z = x - M + b
                break
              default: {
                const G = L + M
                d < L ? (E = 'top') : x > G && (E = 'bottom')
              }
            }
            z !== null && z !== L && i(z)
          }
          f = he(() => {
            R && a(), C(g - 1, E)
          }, 2)
        }
      C(5)
    }
  }
}
const il = typeof navigator == 'object' && /Firefox/i.test(navigator.userAgent),
  rl = il,
  pn = (e, o) => {
    let n = !1,
      t = null
    function l() {
      clearTimeout(t),
        (n = !0),
        (t = setTimeout(() => {
          n = !1
        }, 50))
    }
    return function(a) {
      let i =
        arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1
      const r = (a < 0 && e.value) || (a > 0 && o.value)
      return i && r ? (clearTimeout(t), (n = !1)) : (!r || n) && l(), !n && r
    }
  }
function sl(e, o, n, t) {
  let l = 0,
    a = null,
    i = null,
    r = !1
  const f = pn(o, n)
  function u(h) {
    if (!e.value) return
    he.cancel(a)
    const { deltaY: m } = h
    ;(l += m),
      (i = m),
      !f(m) &&
        (rl || h.preventDefault(),
        (a = he(() => {
          t(l * (r ? 10 : 1)), (l = 0)
        })))
  }
  function s(h) {
    e.value && (r = h.detail === i)
  }
  return [u, s]
}
const ul = 14 / 15
function cl(e, o, n) {
  let t = !1,
    l = 0,
    a = null,
    i = null
  const r = () => {
      a &&
        (a.removeEventListener('touchmove', f),
        a.removeEventListener('touchend', u))
    },
    f = m => {
      if (t) {
        const P = Math.ceil(m.touches[0].pageY)
        let b = l - P
        ;(l = P),
          n(b) && m.preventDefault(),
          clearInterval(i),
          (i = setInterval(() => {
            ;(b *= ul), (!n(b, !0) || Math.abs(b) <= 0.1) && clearInterval(i)
          }, 16))
      }
    },
    u = () => {
      ;(t = !1), r()
    },
    s = m => {
      r(),
        m.touches.length === 1 &&
          !t &&
          ((t = !0),
          (l = Math.ceil(m.touches[0].pageY)),
          (a = m.target),
          a.addEventListener('touchmove', f, { passive: !1 }),
          a.addEventListener('touchend', u))
    },
    h = () => {}
  ge(() => {
    document.addEventListener('touchmove', h, { passive: !1 }),
      ie(
        e,
        m => {
          o.value.removeEventListener('touchstart', s),
            r(),
            clearInterval(i),
            m && o.value.addEventListener('touchstart', s, { passive: !1 })
        },
        { immediate: !0 }
      )
  }),
    Re(() => {
      document.removeEventListener('touchmove', h)
    })
}
var dl =
  (globalThis && globalThis.__rest) ||
  function(e, o) {
    var n = {}
    for (var t in e)
      Object.prototype.hasOwnProperty.call(e, t) &&
        o.indexOf(t) < 0 &&
        (n[t] = e[t])
    if (e != null && typeof Object.getOwnPropertySymbols == 'function')
      for (var l = 0, t = Object.getOwnPropertySymbols(e); l < t.length; l++)
        o.indexOf(t[l]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(e, t[l]) &&
          (n[t[l]] = e[t[l]])
    return n
  }
const fl = [],
  pl = { overflowY: 'auto', overflowAnchor: 'none' }
function vl(e, o, n, t, l, a) {
  let { getKey: i } = a
  return e.slice(o, n + 1).map((r, f) => {
    const u = o + f,
      s = l(r, u, {}),
      h = i(r)
    return S(tl, { key: h, setRef: m => t(r, m) }, { default: () => [s] })
  })
}
const ml = ue({
    compatConfig: { MODE: 3 },
    name: 'List',
    inheritAttrs: !1,
    props: {
      prefixCls: String,
      data: H.array,
      height: Number,
      itemHeight: Number,
      fullHeight: { type: Boolean, default: void 0 },
      itemKey: { type: [String, Number, Function], required: !0 },
      component: { type: [String, Object] },
      virtual: { type: Boolean, default: void 0 },
      children: Function,
      onScroll: Function,
      onMousedown: Function,
      onMouseenter: Function,
      onVisibleChange: Function
    },
    setup(e, o) {
      let { expose: n } = o
      const t = V(() => {
          const { height: y, itemHeight: A, virtual: K } = e
          return !!(K !== !1 && y && A)
        }),
        l = V(() => {
          const { height: y, itemHeight: A, data: K } = e
          return t.value && K && A * K.length > y
        }),
        a = Fe({ scrollTop: 0, scrollMoving: !1 }),
        i = V(() => e.data || fl),
        r = Y([])
      ie(
        i,
        () => {
          r.value = st(i.value).slice()
        },
        { immediate: !0 }
      )
      const f = Y(y => {})
      ie(
        () => e.itemKey,
        y => {
          typeof y == 'function'
            ? (f.value = y)
            : (f.value = A => (A == null ? void 0 : A[y]))
        },
        { immediate: !0 }
      )
      const u = Y(),
        s = Y(),
        h = Y(),
        m = y => f.value(y),
        P = { getKey: m }
      function b(y) {
        let A
        typeof y == 'function' ? (A = y(a.scrollTop)) : (A = y)
        const K = $(A)
        u.value && (u.value.scrollTop = K), (a.scrollTop = K)
      }
      const [C, g, I, M] = ll(r, m, null, null),
        R = Fe({ scrollHeight: void 0, start: 0, end: 0, offset: void 0 }),
        E = Y(0)
      ge(() => {
        Ie(() => {
          var y
          E.value =
            ((y = s.value) === null || y === void 0
              ? void 0
              : y.offsetHeight) || 0
        })
      }),
        no(() => {
          Ie(() => {
            var y
            E.value =
              ((y = s.value) === null || y === void 0
                ? void 0
                : y.offsetHeight) || 0
          })
        }),
        ie(
          [t, r],
          () => {
            t.value ||
              w(R, {
                scrollHeight: void 0,
                start: 0,
                end: r.value.length - 1,
                offset: void 0
              })
          },
          { immediate: !0 }
        ),
        ie(
          [t, r, E, l],
          () => {
            t.value &&
              !l.value &&
              w(R, {
                scrollHeight: E.value,
                start: 0,
                end: r.value.length - 1,
                offset: void 0
              }),
              u.value && (a.scrollTop = u.value.scrollTop)
          },
          { immediate: !0 }
        ),
        ie(
          [l, t, () => a.scrollTop, r, M, () => e.height, E],
          () => {
            if (!t.value || !l.value) return
            let y = 0,
              A,
              K,
              B
            const ee = r.value.length,
              ne = r.value,
              re = a.scrollTop,
              { itemHeight: oe, height: fe } = e,
              pe = re + fe
            for (let O = 0; O < ee; O += 1) {
              const c = ne[O],
                v = m(c)
              let N = I.get(v)
              N === void 0 && (N = oe)
              const D = y + N
              A === void 0 && D >= re && ((A = O), (K = y)),
                B === void 0 && D > pe && (B = O),
                (y = D)
            }
            A === void 0 && ((A = 0), (K = 0), (B = Math.ceil(fe / oe))),
              B === void 0 && (B = ee - 1),
              (B = Math.min(B + 1, ee)),
              w(R, { scrollHeight: y, start: A, end: B, offset: K })
          },
          { immediate: !0 }
        )
      const p = V(() => R.scrollHeight - e.height)
      function $(y) {
        let A = y
        return (
          Number.isNaN(p.value) || (A = Math.min(A, p.value)),
          (A = Math.max(A, 0)),
          A
        )
      }
      const d = V(() => a.scrollTop <= 0),
        x = V(() => a.scrollTop >= p.value),
        T = pn(d, x)
      function L(y) {
        b(y)
      }
      function z(y) {
        var A
        const { scrollTop: K } = y.currentTarget
        K !== a.scrollTop && b(K),
          (A = e.onScroll) === null || A === void 0 || A.call(e, y)
      }
      const [G, F] = sl(t, d, x, y => {
        b(A => A + y)
      })
      cl(t, u, (y, A) =>
        T(y, A) ? !1 : (G({ preventDefault() {}, deltaY: y }), !0)
      )
      function _(y) {
        t.value && y.preventDefault()
      }
      const W = () => {
        u.value &&
          (u.value.removeEventListener('wheel', G, Se ? { passive: !1 } : !1),
          u.value.removeEventListener('DOMMouseScroll', F),
          u.value.removeEventListener('MozMousePixelScroll', _))
      }
      $e(() => {
        Ie(() => {
          u.value &&
            (W(),
            u.value.addEventListener('wheel', G, Se ? { passive: !1 } : !1),
            u.value.addEventListener('DOMMouseScroll', F),
            u.value.addEventListener('MozMousePixelScroll', _))
        })
      }),
        Re(() => {
          W()
        })
      const j = al(u, r, I, e, m, g, b, () => {
        var y
        ;(y = h.value) === null || y === void 0 || y.delayHidden()
      })
      n({ scrollTo: j })
      const q = V(() => {
        let y = null
        return (
          e.height &&
            ((y = w(
              { [e.fullHeight ? 'height' : 'maxHeight']: e.height + 'px' },
              pl
            )),
            t.value &&
              ((y.overflowY = 'hidden'),
              a.scrollMoving && (y.pointerEvents = 'none'))),
          y
        )
      })
      return (
        ie(
          [() => R.start, () => R.end, r],
          () => {
            if (e.onVisibleChange) {
              const y = r.value.slice(R.start, R.end + 1)
              e.onVisibleChange(y, r.value)
            }
          },
          { flush: 'post' }
        ),
        {
          state: a,
          mergedData: r,
          componentStyle: q,
          onFallbackScroll: z,
          onScrollBar: L,
          componentRef: u,
          useVirtual: t,
          calRes: R,
          collectHeight: g,
          setInstance: C,
          sharedConfig: P,
          scrollBarRef: h,
          fillerInnerRef: s,
          delayHideScrollBar: () => {
            var y
            ;(y = h.value) === null || y === void 0 || y.delayHidden()
          }
        }
      )
    },
    render() {
      const e = w(w({}, this.$props), this.$attrs),
        {
          prefixCls: o = 'rc-virtual-list',
          height: n,
          itemHeight: t,
          fullHeight: l,
          data: a,
          itemKey: i,
          virtual: r,
          component: f = 'div',
          onScroll: u,
          children: s = this.$slots.default,
          style: h,
          class: m
        } = e,
        P = dl(e, [
          'prefixCls',
          'height',
          'itemHeight',
          'fullHeight',
          'data',
          'itemKey',
          'virtual',
          'component',
          'onScroll',
          'children',
          'style',
          'class'
        ]),
        b = k(o, m),
        { scrollTop: C } = this.state,
        { scrollHeight: g, offset: I, start: M, end: R } = this.calRes,
        {
          componentStyle: E,
          onFallbackScroll: p,
          onScrollBar: $,
          useVirtual: d,
          collectHeight: x,
          sharedConfig: T,
          setInstance: L,
          mergedData: z,
          delayHideScrollBar: G
        } = this
      return S(
        'div',
        X({ style: w(w({}, h), { position: 'relative' }), class: b }, P),
        [
          S(
            f,
            {
              class: `${o}-holder`,
              style: E,
              ref: 'componentRef',
              onScroll: p,
              onMouseenter: G
            },
            {
              default: () => [
                S(
                  el,
                  {
                    prefixCls: o,
                    height: g,
                    offset: I,
                    onInnerResize: x,
                    ref: 'fillerInnerRef'
                  },
                  { default: () => vl(z, M, R, L, s, T) }
                )
              ]
            }
          ),
          d &&
            S(
              ol,
              {
                ref: 'scrollBarRef',
                prefixCls: o,
                scrollTop: C,
                height: n,
                scrollHeight: g,
                count: z.length,
                onScroll: $,
                onStartMove: () => {
                  this.state.scrollMoving = !0
                },
                onStopMove: () => {
                  this.state.scrollMoving = !1
                }
              },
              null
            )
        ]
      )
    }
  }),
  gl = ml
function hl(e, o, n) {
  const t = ve(e())
  return (
    ie(o, (l, a) => {
      n ? n(l, a) && (t.value = e()) : (t.value = e())
    }),
    t
  )
}
function bl() {
  return /(mac\sos|macintosh)/i.test(navigator.appVersion)
}
const vn = Symbol('SelectContextKey')
function yl(e) {
  return rt(vn, e)
}
function Sl() {
  return Ke(vn, {})
}
var wl =
  (globalThis && globalThis.__rest) ||
  function(e, o) {
    var n = {}
    for (var t in e)
      Object.prototype.hasOwnProperty.call(e, t) &&
        o.indexOf(t) < 0 &&
        (n[t] = e[t])
    if (e != null && typeof Object.getOwnPropertySymbols == 'function')
      for (var l = 0, t = Object.getOwnPropertySymbols(e); l < t.length; l++)
        o.indexOf(t[l]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(e, t[l]) &&
          (n[t[l]] = e[t[l]])
    return n
  }
function Lt(e) {
  return typeof e == 'string' || typeof e == 'number'
}
const Cl = ue({
    compatConfig: { MODE: 3 },
    name: 'OptionList',
    inheritAttrs: !1,
    setup(e, o) {
      let { expose: n, slots: t } = o
      const l = Xo(),
        a = Sl(),
        i = V(() => `${l.prefixCls}-item`),
        r = hl(
          () => a.flattenOptions,
          [() => l.open, () => a.flattenOptions],
          p => p[0]
        ),
        f = Ne(),
        u = p => {
          p.preventDefault()
        },
        s = p => {
          f.current &&
            f.current.scrollTo(typeof p == 'number' ? { index: p } : p)
        },
        h = function(p) {
          let $ =
            arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1
          const d = r.value.length
          for (let x = 0; x < d; x += 1) {
            const T = (p + x * $ + d) % d,
              { group: L, data: z } = r.value[T]
            if (!L && !z.disabled) return T
          }
          return -1
        },
        m = Fe({ activeIndex: h(0) }),
        P = function(p) {
          let $ =
            arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1
          m.activeIndex = p
          const d = { source: $ ? 'keyboard' : 'mouse' },
            x = r.value[p]
          if (!x) {
            a.onActiveValue(null, -1, d)
            return
          }
          a.onActiveValue(x.value, p, d)
        }
      ie(
        [() => r.value.length, () => l.searchValue],
        () => {
          P(a.defaultActiveFirstOption !== !1 ? h(0) : -1)
        },
        { immediate: !0 }
      )
      const b = p => a.rawValues.has(p) && l.mode !== 'combobox'
      ie(
        [() => l.open, () => l.searchValue],
        () => {
          if (!l.multiple && l.open && a.rawValues.size === 1) {
            const p = Array.from(a.rawValues)[0],
              $ = st(r.value).findIndex(d => {
                let { data: x } = d
                return x[a.fieldNames.value] === p
              })
            $ !== -1 &&
              (P($),
              Ie(() => {
                s($)
              }))
          }
          l.open &&
            Ie(() => {
              var p
              ;(p = f.current) === null || p === void 0 || p.scrollTo(void 0)
            })
        },
        { immediate: !0, flush: 'post' }
      )
      const C = p => {
          p !== void 0 && a.onSelect(p, { selected: !a.rawValues.has(p) }),
            l.multiple || l.toggleOpen(!1)
        },
        g = p => (typeof p.label == 'function' ? p.label() : p.label)
      function I(p) {
        const $ = r.value[p]
        if (!$) return null
        const d = $.data || {},
          { value: x } = d,
          { group: T } = $,
          L = ut(d, !0),
          z = g($)
        return $
          ? S(
              'div',
              X(
                X({ 'aria-label': typeof z == 'string' && !T ? z : null }, L),
                {},
                {
                  key: p,
                  role: T ? 'presentation' : 'option',
                  id: `${l.id}_list_${p}`,
                  'aria-selected': b(x)
                }
              ),
              [x]
            )
          : null
      }
      return (
        n({
          onKeydown: p => {
            const { which: $, ctrlKey: d } = p
            switch ($) {
              case U.N:
              case U.P:
              case U.UP:
              case U.DOWN: {
                let x = 0
                if (
                  ($ === U.UP
                    ? (x = -1)
                    : $ === U.DOWN
                    ? (x = 1)
                    : bl() &&
                      d &&
                      ($ === U.N ? (x = 1) : $ === U.P && (x = -1)),
                  x !== 0)
                ) {
                  const T = h(m.activeIndex + x, x)
                  s(T), P(T, !0)
                }
                break
              }
              case U.ENTER: {
                const x = r.value[m.activeIndex]
                x && !x.data.disabled ? C(x.value) : C(void 0),
                  l.open && p.preventDefault()
                break
              }
              case U.ESC:
                l.toggleOpen(!1), l.open && p.stopPropagation()
            }
          },
          onKeyup: () => {},
          scrollTo: p => {
            s(p)
          }
        }),
        () => {
          const { id: p, notFoundContent: $, onPopupScroll: d } = l,
            {
              menuItemSelectedIcon: x,
              fieldNames: T,
              virtual: L,
              listHeight: z,
              listItemHeight: G
            } = a,
            F = t.option,
            { activeIndex: _ } = m,
            W = Object.keys(T).map(j => T[j])
          return r.value.length === 0
            ? S(
                'div',
                {
                  role: 'listbox',
                  id: `${p}_list`,
                  class: `${i.value}-empty`,
                  onMousedown: u
                },
                [$]
              )
            : S(Te, null, [
                S(
                  'div',
                  {
                    role: 'listbox',
                    id: `${p}_list`,
                    style: { height: 0, width: 0, overflow: 'hidden' }
                  },
                  [I(_ - 1), I(_), I(_ + 1)]
                ),
                S(
                  gl,
                  {
                    itemKey: 'key',
                    ref: f,
                    data: r.value,
                    height: z,
                    itemHeight: G,
                    fullHeight: !1,
                    onMousedown: u,
                    onScroll: d,
                    virtual: L
                  },
                  {
                    default: (j, q) => {
                      var J
                      const { group: y, groupOption: A, data: K, value: B } = j,
                        { key: ee } = K,
                        ne = typeof j.label == 'function' ? j.label() : j.label
                      if (y) {
                        const de =
                          (J = K.title) !== null && J !== void 0
                            ? J
                            : Lt(ne) && ne
                        return S(
                          'div',
                          { class: k(i.value, `${i.value}-group`), title: de },
                          [F ? F(K) : ne !== void 0 ? ne : ee]
                        )
                      }
                      const {
                          disabled: re,
                          title: oe,
                          children: fe,
                          style: pe,
                          class: O,
                          className: c
                        } = K,
                        v = wl(K, [
                          'disabled',
                          'title',
                          'children',
                          'style',
                          'class',
                          'className'
                        ]),
                        N = be(v, W),
                        D = b(B),
                        Q = `${i.value}-option`,
                        le = k(i.value, Q, O, c, {
                          [`${Q}-grouped`]: A,
                          [`${Q}-active`]: _ === q && !re,
                          [`${Q}-disabled`]: re,
                          [`${Q}-selected`]: D
                        }),
                        te = g(j),
                        ae = !x || typeof x == 'function' || D,
                        Z = typeof te == 'number' ? te : te || B
                      let ce = Lt(Z) ? Z.toString() : void 0
                      return (
                        oe !== void 0 && (ce = oe),
                        S(
                          'div',
                          X(
                            X({}, N),
                            {},
                            {
                              'aria-selected': D,
                              class: le,
                              title: ce,
                              onMousemove: de => {
                                v.onMousemove && v.onMousemove(de),
                                  !(_ === q || re) && P(q)
                              },
                              onClick: de => {
                                re || C(B), v.onClick && v.onClick(de)
                              },
                              style: pe
                            }
                          ),
                          [
                            S('div', { class: `${Q}-content` }, [F ? F(K) : Z]),
                            We(x) || D,
                            ae &&
                              S(
                                je,
                                {
                                  class: `${i.value}-option-state`,
                                  customizeIcon: x,
                                  customizeIconProps: { isSelected: D }
                                },
                                { default: () => [D ? '✓' : null] }
                              )
                          ]
                        )
                      )
                    }
                  }
                )
              ])
        }
      )
    }
  }),
  xl = Cl
var Il =
  (globalThis && globalThis.__rest) ||
  function(e, o) {
    var n = {}
    for (var t in e)
      Object.prototype.hasOwnProperty.call(e, t) &&
        o.indexOf(t) < 0 &&
        (n[t] = e[t])
    if (e != null && typeof Object.getOwnPropertySymbols == 'function')
      for (var l = 0, t = Object.getOwnPropertySymbols(e); l < t.length; l++)
        o.indexOf(t[l]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(e, t[l]) &&
          (n[t[l]] = e[t[l]])
    return n
  }
function Ol(e) {
  const o = e,
    { key: n, children: t } = o,
    l = o.props,
    { value: a, disabled: i } = l,
    r = Il(l, ['value', 'disabled']),
    f = t == null ? void 0 : t.default
  return w(
    {
      key: n,
      value: a !== void 0 ? a : n,
      children: f,
      disabled: i || i === ''
    },
    r
  )
}
function mn(e) {
  let o = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1
  return Xt(e)
    .map((t, l) => {
      var a
      if (!We(t) || !t.type) return null
      const {
        type: { isSelectOptGroup: i },
        key: r,
        children: f,
        props: u
      } = t
      if (o || !i) return Ol(t)
      const s = f && f.default ? f.default() : void 0,
        h =
          (u == null ? void 0 : u.label) ||
          ((a = f.label) === null || a === void 0 ? void 0 : a.call(f)) ||
          r
      return w(
        w({ key: `__RC_SELECT_GRP__${r === null ? l : String(r)}__` }, u),
        { label: h, options: mn(s || []) }
      )
    })
    .filter(t => t)
}
function $l(e, o, n) {
  const t = Y(),
    l = Y(),
    a = Y(),
    i = Y([])
  return (
    ie(
      [e, o],
      () => {
        e.value ? (i.value = st(e.value).slice()) : (i.value = mn(o.value))
      },
      { immediate: !0, deep: !0 }
    ),
    $e(() => {
      const r = i.value,
        f = new Map(),
        u = new Map(),
        s = n.value
      function h(m) {
        let P =
          arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1
        for (let b = 0; b < m.length; b += 1) {
          const C = m[b]
          !C[s.options] || P
            ? (f.set(C[s.value], C), u.set(C[s.label], C))
            : h(C[s.options], !0)
        }
      }
      h(r), (t.value = r), (l.value = f), (a.value = u)
    }),
    { options: t, valueOptions: l, labelOptions: a }
  )
}
let zt = 0
const Tl = Wn()
function Pl() {
  let e
  return Tl ? ((e = zt), (zt += 1)) : (e = 'TEST_OR_SSR'), e
}
function Ml() {
  let e =
    arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : ve('')
  const o = `rc_select_${Pl()}`
  return e.value || o
}
function gn(e) {
  return Array.isArray(e) ? e : e !== void 0 ? [e] : []
}
function Je(e, o) {
  return gn(e)
    .join('')
    .toUpperCase()
    .includes(o)
}
const El = (e, o, n, t, l) =>
    V(() => {
      const a = n.value,
        i = l == null ? void 0 : l.value,
        r = t == null ? void 0 : t.value
      if (!a || r === !1) return e.value
      const { options: f, label: u, value: s } = o.value,
        h = [],
        m = typeof r == 'function',
        P = a.toUpperCase(),
        b = m
          ? r
          : (g, I) =>
              i
                ? Je(I[i], P)
                : I[f]
                ? Je(I[u !== 'children' ? u : 'label'], P)
                : Je(I[s], P),
        C = m ? g => lt(g) : g => g
      return (
        e.value.forEach(g => {
          if (g[f]) {
            if (b(a, C(g))) h.push(g)
            else {
              const M = g[f].filter(R => b(a, C(R)))
              M.length && h.push(w(w({}, g), { [f]: M }))
            }
            return
          }
          b(a, C(g)) && h.push(g)
        }),
        h
      )
    }),
  Fl = (e, o) => {
    const n = Y({ values: new Map(), options: new Map() })
    return [
      V(() => {
        const { values: a, options: i } = n.value,
          r = e.value.map(s => {
            var h
            return s.label === void 0
              ? w(w({}, s), {
                  label:
                    (h = a.get(s.value)) === null || h === void 0
                      ? void 0
                      : h.label
                })
              : s
          }),
          f = new Map(),
          u = new Map()
        return (
          r.forEach(s => {
            f.set(s.value, s),
              u.set(s.value, o.value.get(s.value) || i.get(s.value))
          }),
          (n.value.values = f),
          (n.value.options = u),
          r
        )
      }),
      a => o.value.get(a) || n.value.options.get(a)
    ]
  },
  Rl = ['inputValue']
function hn() {
  return w(w({}, cn()), {
    prefixCls: String,
    id: String,
    backfill: { type: Boolean, default: void 0 },
    fieldNames: Object,
    inputValue: String,
    searchValue: String,
    onSearch: Function,
    autoClearSearchValue: { type: Boolean, default: void 0 },
    onSelect: Function,
    onDeselect: Function,
    filterOption: { type: [Boolean, Function], default: void 0 },
    filterSort: Function,
    optionFilterProp: String,
    optionLabelProp: String,
    options: Array,
    defaultActiveFirstOption: { type: Boolean, default: void 0 },
    virtual: { type: Boolean, default: void 0 },
    listHeight: Number,
    listItemHeight: Number,
    menuItemSelectedIcon: H.any,
    mode: String,
    labelInValue: { type: Boolean, default: void 0 },
    value: H.any,
    defaultValue: H.any,
    onChange: Function,
    children: Array
  })
}
function Dl(e) {
  return !e || typeof e != 'object'
}
const _l = ue({
    compatConfig: { MODE: 3 },
    name: 'VcSelect',
    inheritAttrs: !1,
    props: ft(hn(), {
      prefixCls: 'vc-select',
      autoClearSearchValue: !0,
      listHeight: 200,
      listItemHeight: 20,
      dropdownMatchSelectWidth: !0
    }),
    setup(e, o) {
      let { expose: n, attrs: t, slots: l } = o
      const a = Ml(ye(e, 'id')),
        i = V(() => dn(e.mode)),
        r = V(() => !!(!e.options && e.children)),
        f = V(() =>
          e.filterOption === void 0 && e.mode === 'combobox'
            ? !1
            : e.filterOption
        ),
        u = V(() => ln(e.fieldNames, r.value)),
        [s, h] = Et('', {
          value: V(() =>
            e.searchValue !== void 0 ? e.searchValue : e.inputValue
          ),
          postState: O => O || ''
        }),
        m = $l(ye(e, 'options'), ye(e, 'children'), u),
        { valueOptions: P, labelOptions: b, options: C } = m,
        g = O =>
          gn(O).map(v => {
            var N, D
            let Q, le, te, ae
            Dl(v)
              ? (Q = v)
              : ((te = v.key),
                (le = v.label),
                (Q = (N = v.value) !== null && N !== void 0 ? N : te))
            const Z = P.value.get(Q)
            return (
              Z &&
                (le === void 0 &&
                  (le =
                    Z == null ? void 0 : Z[e.optionLabelProp || u.value.label]),
                te === void 0 &&
                  (te =
                    (D = Z == null ? void 0 : Z.key) !== null && D !== void 0
                      ? D
                      : Q),
                (ae = Z == null ? void 0 : Z.disabled)),
              { label: le, value: Q, key: te, disabled: ae, option: Z }
            )
          }),
        [I, M] = Et(e.defaultValue, { value: ye(e, 'value') }),
        R = V(() => {
          var O
          const c = g(I.value)
          return e.mode === 'combobox' &&
            !(!((O = c[0]) === null || O === void 0) && O.value)
            ? []
            : c
        }),
        [E, p] = Fl(R, P),
        $ = V(() => {
          if (!e.mode && E.value.length === 1) {
            const O = E.value[0]
            if (O.value === null && (O.label === null || O.label === void 0))
              return []
          }
          return E.value.map(O => {
            var c
            return w(w({}, O), {
              label:
                (c = typeof O.label == 'function' ? O.label() : O.label) !==
                  null && c !== void 0
                  ? c
                  : O.value
            })
          })
        }),
        d = V(() => new Set(E.value.map(O => O.value)))
      $e(
        () => {
          var O
          if (e.mode === 'combobox') {
            const c =
              (O = E.value[0]) === null || O === void 0 ? void 0 : O.value
            c != null && h(String(c))
          }
        },
        { flush: 'post' }
      )
      const x = (O, c) => {
          const v = c ?? O
          return { [u.value.value]: O, [u.value.label]: v }
        },
        T = Y()
      $e(() => {
        if (e.mode !== 'tags') {
          T.value = C.value
          return
        }
        const O = C.value.slice(),
          c = v => P.value.has(v)
        ;[...E.value]
          .sort((v, N) => (v.value < N.value ? -1 : 1))
          .forEach(v => {
            const N = v.value
            c(N) || O.push(x(N, v.label))
          }),
          (T.value = O)
      })
      const L = El(T, u, s, f, ye(e, 'optionFilterProp')),
        z = V(() =>
          e.mode !== 'tags' ||
          !s.value ||
          L.value.some(O => O[e.optionFilterProp || 'value'] === s.value)
            ? L.value
            : [x(s.value), ...L.value]
        ),
        G = V(() =>
          e.filterSort
            ? [...z.value].sort((O, c) => e.filterSort(O, c))
            : z.value
        ),
        F = V(() =>
          Po(G.value, { fieldNames: u.value, childrenAsData: r.value })
        ),
        _ = O => {
          const c = g(O)
          if (
            (M(c),
            e.onChange &&
              (c.length !== E.value.length ||
                c.some((v, N) => {
                  var D
                  return (
                    ((D = E.value[N]) === null || D === void 0
                      ? void 0
                      : D.value) !== (v == null ? void 0 : v.value)
                  )
                })))
          ) {
            const v = e.labelInValue
                ? c.map(D =>
                    w(w({}, D), {
                      originLabel: D.label,
                      label: typeof D.label == 'function' ? D.label() : D.label
                    })
                  )
                : c.map(D => D.value),
              N = c.map(D => lt(p(D.value)))
            e.onChange(i.value ? v : v[0], i.value ? N : N[0])
          }
        },
        [W, j] = Ft(null),
        [q, J] = Ft(0),
        y = V(() =>
          e.defaultActiveFirstOption !== void 0
            ? e.defaultActiveFirstOption
            : e.mode !== 'combobox'
        ),
        A = function(O, c) {
          let { source: v = 'keyboard' } =
            arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}
          J(c),
            e.backfill &&
              e.mode === 'combobox' &&
              O !== null &&
              v === 'keyboard' &&
              j(String(O))
        },
        K = (O, c) => {
          const v = () => {
            var N
            const D = p(O),
              Q = D == null ? void 0 : D[u.value.label]
            return [
              e.labelInValue
                ? {
                    label: typeof Q == 'function' ? Q() : Q,
                    originLabel: Q,
                    value: O,
                    key:
                      (N = D == null ? void 0 : D.key) !== null && N !== void 0
                        ? N
                        : O
                  }
                : O,
              lt(D)
            ]
          }
          if (c && e.onSelect) {
            const [N, D] = v()
            e.onSelect(N, D)
          } else if (!c && e.onDeselect) {
            const [N, D] = v()
            e.onDeselect(N, D)
          }
        },
        B = (O, c) => {
          let v
          const N = i.value ? c.selected : !0
          N
            ? (v = i.value ? [...E.value, O] : [O])
            : (v = E.value.filter(D => D.value !== O)),
            _(v),
            K(O, N),
            e.mode === 'combobox'
              ? j('')
              : (!i.value || e.autoClearSearchValue) && (h(''), j(''))
        },
        ee = (O, c) => {
          _(O),
            (c.type === 'remove' || c.type === 'clear') &&
              c.values.forEach(v => {
                K(v.value, !1)
              })
        },
        ne = (O, c) => {
          var v
          if ((h(O), j(null), c.source === 'submit')) {
            const N = (O || '').trim()
            if (N) {
              const D = Array.from(new Set([...d.value, N]))
              _(D), K(N, !0), h('')
            }
            return
          }
          c.source !== 'blur' &&
            (e.mode === 'combobox' && _(O),
            (v = e.onSearch) === null || v === void 0 || v.call(e, O))
        },
        re = O => {
          let c = O
          e.mode !== 'tags' &&
            (c = O.map(N => {
              const D = b.value.get(N)
              return D == null ? void 0 : D.value
            }).filter(N => N !== void 0))
          const v = Array.from(new Set([...d.value, ...c]))
          _(v),
            v.forEach(N => {
              K(N, !0)
            })
        },
        oe = V(() => e.virtual !== !1 && e.dropdownMatchSelectWidth !== !1)
      yl(
        un(
          w(w({}, m), {
            flattenOptions: F,
            onActiveValue: A,
            defaultActiveFirstOption: y,
            onSelect: B,
            menuItemSelectedIcon: ye(e, 'menuItemSelectedIcon'),
            rawValues: d,
            fieldNames: u,
            virtual: oe,
            listHeight: ye(e, 'listHeight'),
            listItemHeight: ye(e, 'listItemHeight'),
            childrenAsData: r
          })
        )
      )
      const fe = ve()
      n({
        focus() {
          var O
          ;(O = fe.value) === null || O === void 0 || O.focus()
        },
        blur() {
          var O
          ;(O = fe.value) === null || O === void 0 || O.blur()
        },
        scrollTo(O) {
          var c
          ;(c = fe.value) === null || c === void 0 || c.scrollTo(O)
        }
      })
      const pe = V(() =>
        be(e, [
          'id',
          'mode',
          'prefixCls',
          'backfill',
          'fieldNames',
          'inputValue',
          'searchValue',
          'onSearch',
          'autoClearSearchValue',
          'onSelect',
          'onDeselect',
          'dropdownMatchSelectWidth',
          'filterOption',
          'filterSort',
          'optionFilterProp',
          'optionLabelProp',
          'options',
          'children',
          'defaultActiveFirstOption',
          'menuItemSelectedIcon',
          'virtual',
          'listHeight',
          'listItemHeight',
          'value',
          'defaultValue',
          'labelInValue',
          'onChange'
        ])
      )
      return () =>
        S(
          ko,
          X(
            X(X({}, pe.value), t),
            {},
            {
              id: a,
              prefixCls: e.prefixCls,
              ref: fe,
              omitDomProps: Rl,
              mode: e.mode,
              displayValues: $.value,
              onDisplayValuesChange: ee,
              searchValue: s.value,
              onSearch: ne,
              onSearchSplit: re,
              dropdownMatchSelectWidth: e.dropdownMatchSelectWidth,
              OptionList: xl,
              emptyOptions: !F.value.length,
              activeValue: W.value,
              activeDescendantId: `${a}_list_${q.value}`
            }
          ),
          l
        )
    }
  }),
  mt = () => null
mt.isSelectOption = !0
mt.displayName = 'ASelectOption'
const Nl = mt,
  gt = () => null
gt.isSelectOptGroup = !0
gt.displayName = 'ASelectOptGroup'
const Vl = gt
function jt(e) {
  for (var o = 1; o < arguments.length; o++) {
    var n = arguments[o] != null ? Object(arguments[o]) : {},
      t = Object.keys(n)
    typeof Object.getOwnPropertySymbols == 'function' &&
      (t = t.concat(
        Object.getOwnPropertySymbols(n).filter(function(l) {
          return Object.getOwnPropertyDescriptor(n, l).enumerable
        })
      )),
      t.forEach(function(l) {
        Al(e, l, n[l])
      })
  }
  return e
}
function Al(e, o, n) {
  return (
    o in e
      ? Object.defineProperty(e, o, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0
        })
      : (e[o] = n),
    e
  )
}
var ht = function(o, n) {
  var t = jt({}, o, n.attrs)
  return S(at, jt({}, t, { icon: Oo }), null)
}
ht.displayName = 'DownOutlined'
ht.inheritAttrs = !1
const Bl = ht
function Wt(e) {
  for (var o = 1; o < arguments.length; o++) {
    var n = arguments[o] != null ? Object(arguments[o]) : {},
      t = Object.keys(n)
    typeof Object.getOwnPropertySymbols == 'function' &&
      (t = t.concat(
        Object.getOwnPropertySymbols(n).filter(function(l) {
          return Object.getOwnPropertyDescriptor(n, l).enumerable
        })
      )),
      t.forEach(function(l) {
        Hl(e, l, n[l])
      })
  }
  return e
}
function Hl(e, o, n) {
  return (
    o in e
      ? Object.defineProperty(e, o, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0
        })
      : (e[o] = n),
    e
  )
}
var bt = function(o, n) {
  var t = Wt({}, o, n.attrs)
  return S(at, Wt({}, t, { icon: $o }), null)
}
bt.displayName = 'SearchOutlined'
bt.inheritAttrs = !1
const bn = bt
function Ll(e) {
  let o = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}
  const {
      loading: n,
      multiple: t,
      prefixCls: l,
      hasFeedback: a,
      feedbackIcon: i,
      showArrow: r
    } = e,
    f = e.suffixIcon || (o.suffixIcon && o.suffixIcon()),
    u = e.clearIcon || (o.clearIcon && o.clearIcon()),
    s =
      e.menuItemSelectedIcon ||
      (o.menuItemSelectedIcon && o.menuItemSelectedIcon()),
    h = e.removeIcon || (o.removeIcon && o.removeIcon()),
    m = u ?? S(Qt, null, null),
    P = I => S(Te, null, [r !== !1 && I, a && i])
  let b = null
  if (f !== void 0) b = P(f)
  else if (n) b = P(S(Kn, { spin: !0 }, null))
  else {
    const I = `${l}-suffix`
    b = M => {
      let { open: R, showSearch: E } = M
      return P(R && E ? S(bn, { class: I }, null) : S(Bl, { class: I }, null))
    }
  }
  let C = null
  s !== void 0 ? (C = s) : t ? (C = S(so, null, null)) : (C = null)
  let g = null
  return (
    h !== void 0 ? (g = h) : (g = S(Un, null, null)),
    { clearIcon: m, suffixIcon: b, itemIcon: C, removeIcon: g }
  )
}
var zl = uo(Object.getPrototypeOf, Object)
const jl = zl
var Wl = '[object Object]',
  Kl = Function.prototype,
  Ul = Object.prototype,
  yn = Kl.toString,
  Gl = Ul.hasOwnProperty,
  Yl = yn.call(Object)
function Xl(e) {
  if (!co(e) || fo(e) != Wl) return !1
  var o = jl(e)
  if (o === null) return !0
  var n = Gl.call(o, 'constructor') && o.constructor
  return typeof n == 'function' && n instanceof n && yn.call(n) == Yl
}
const Ql = new Ce('antMoveDownIn', {
    '0%': {
      transform: 'translate3d(0, 100%, 0)',
      transformOrigin: '0 0',
      opacity: 0
    },
    '100%': {
      transform: 'translate3d(0, 0, 0)',
      transformOrigin: '0 0',
      opacity: 1
    }
  }),
  Zl = new Ce('antMoveDownOut', {
    '0%': {
      transform: 'translate3d(0, 0, 0)',
      transformOrigin: '0 0',
      opacity: 1
    },
    '100%': {
      transform: 'translate3d(0, 100%, 0)',
      transformOrigin: '0 0',
      opacity: 0
    }
  }),
  ql = new Ce('antMoveLeftIn', {
    '0%': {
      transform: 'translate3d(-100%, 0, 0)',
      transformOrigin: '0 0',
      opacity: 0
    },
    '100%': {
      transform: 'translate3d(0, 0, 0)',
      transformOrigin: '0 0',
      opacity: 1
    }
  }),
  Jl = new Ce('antMoveLeftOut', {
    '0%': {
      transform: 'translate3d(0, 0, 0)',
      transformOrigin: '0 0',
      opacity: 1
    },
    '100%': {
      transform: 'translate3d(-100%, 0, 0)',
      transformOrigin: '0 0',
      opacity: 0
    }
  }),
  kl = new Ce('antMoveRightIn', {
    '0%': {
      transform: 'translate3d(100%, 0, 0)',
      transformOrigin: '0 0',
      opacity: 0
    },
    '100%': {
      transform: 'translate3d(0, 0, 0)',
      transformOrigin: '0 0',
      opacity: 1
    }
  }),
  ea = new Ce('antMoveRightOut', {
    '0%': {
      transform: 'translate3d(0, 0, 0)',
      transformOrigin: '0 0',
      opacity: 1
    },
    '100%': {
      transform: 'translate3d(100%, 0, 0)',
      transformOrigin: '0 0',
      opacity: 0
    }
  }),
  ta = new Ce('antMoveUpIn', {
    '0%': {
      transform: 'translate3d(0, -100%, 0)',
      transformOrigin: '0 0',
      opacity: 0
    },
    '100%': {
      transform: 'translate3d(0, 0, 0)',
      transformOrigin: '0 0',
      opacity: 1
    }
  }),
  na = new Ce('antMoveUpOut', {
    '0%': {
      transform: 'translate3d(0, 0, 0)',
      transformOrigin: '0 0',
      opacity: 1
    },
    '100%': {
      transform: 'translate3d(0, -100%, 0)',
      transformOrigin: '0 0',
      opacity: 0
    }
  }),
  oa = {
    'move-up': { inKeyframes: ta, outKeyframes: na },
    'move-down': { inKeyframes: Ql, outKeyframes: Zl },
    'move-left': { inKeyframes: ql, outKeyframes: Jl },
    'move-right': { inKeyframes: kl, outKeyframes: ea }
  },
  Kt = (e, o) => {
    const { antCls: n } = e,
      t = `${n}-${o}`,
      { inKeyframes: l, outKeyframes: a } = oa[o]
    return [
      po(t, l, a, e.motionDurationMid),
      {
        [`
        ${t}-enter,
        ${t}-appear
      `]: { opacity: 0, animationTimingFunction: e.motionEaseOutCirc },
        [`${t}-leave`]: { animationTimingFunction: e.motionEaseInOutCirc }
      }
    ]
  },
  Ut = e => {
    const { controlPaddingHorizontal: o } = e
    return {
      position: 'relative',
      display: 'block',
      minHeight: e.controlHeight,
      padding: `${(e.controlHeight - e.fontSize * e.lineHeight) / 2}px ${o}px`,
      color: e.colorText,
      fontWeight: 'normal',
      fontSize: e.fontSize,
      lineHeight: e.lineHeight,
      boxSizing: 'border-box'
    }
  },
  la = e => {
    const { antCls: o, componentCls: n } = e,
      t = `${n}-item`
    return [
      {
        [`${n}-dropdown`]: w(w({}, it(e)), {
          position: 'absolute',
          top: -9999,
          zIndex: e.zIndexPopup,
          boxSizing: 'border-box',
          padding: e.paddingXXS,
          overflow: 'hidden',
          fontSize: e.fontSize,
          fontVariant: 'initial',
          backgroundColor: e.colorBgElevated,
          borderRadius: e.borderRadiusLG,
          outline: 'none',
          boxShadow: e.boxShadowSecondary,
          [`
            &${o}-slide-up-enter${o}-slide-up-enter-active${n}-dropdown-placement-bottomLeft,
            &${o}-slide-up-appear${o}-slide-up-appear-active${n}-dropdown-placement-bottomLeft
          `]: { animationName: vo },
          [`
            &${o}-slide-up-enter${o}-slide-up-enter-active${n}-dropdown-placement-topLeft,
            &${o}-slide-up-appear${o}-slide-up-appear-active${n}-dropdown-placement-topLeft
          `]: { animationName: mo },
          [`&${o}-slide-up-leave${o}-slide-up-leave-active${n}-dropdown-placement-bottomLeft`]: {
            animationName: go
          },
          [`&${o}-slide-up-leave${o}-slide-up-leave-active${n}-dropdown-placement-topLeft`]: {
            animationName: ho
          },
          '&-hidden': { display: 'none' },
          '&-empty': { color: e.colorTextDisabled },
          [`${t}-empty`]: w(w({}, Ut(e)), { color: e.colorTextDisabled }),
          [`${t}`]: w(w({}, Ut(e)), {
            cursor: 'pointer',
            transition: `background ${e.motionDurationSlow} ease`,
            borderRadius: e.borderRadiusSM,
            '&-group': {
              color: e.colorTextDescription,
              fontSize: e.fontSizeSM,
              cursor: 'default'
            },
            '&-option': {
              display: 'flex',
              '&-content': w({ flex: 'auto' }, nt),
              '&-state': { flex: 'none' },
              [`&-active:not(${t}-option-disabled)`]: {
                backgroundColor: e.controlItemBgHover
              },
              [`&-selected:not(${t}-option-disabled)`]: {
                color: e.colorText,
                fontWeight: e.fontWeightStrong,
                backgroundColor: e.controlItemBgActive,
                [`${t}-option-state`]: { color: e.colorPrimary }
              },
              '&-disabled': {
                [`&${t}-option-selected`]: {
                  backgroundColor: e.colorBgContainerDisabled
                },
                color: e.colorTextDisabled,
                cursor: 'not-allowed'
              },
              '&-grouped': {
                paddingInlineStart: e.controlPaddingHorizontal * 2
              }
            }
          }),
          '&-rtl': { direction: 'rtl' }
        })
      },
      Rt(e, 'slide-up'),
      Rt(e, 'slide-down'),
      Kt(e, 'move-up'),
      Kt(e, 'move-down')
    ]
  },
  aa = la,
  Ee = 2
function Sn(e) {
  let { controlHeightSM: o, controlHeight: n, lineWidth: t } = e
  const l = (n - o) / 2 - t,
    a = Math.ceil(l / 2)
  return [l, a]
}
function ke(e, o) {
  const { componentCls: n, iconCls: t } = e,
    l = `${n}-selection-overflow`,
    a = e.controlHeightSM,
    [i] = Sn(e),
    r = o ? `${n}-${o}` : ''
  return {
    [`${n}-multiple${r}`]: {
      fontSize: e.fontSize,
      [l]: {
        position: 'relative',
        display: 'flex',
        flex: 'auto',
        flexWrap: 'wrap',
        maxWidth: '100%',
        '&-item': {
          flex: 'none',
          alignSelf: 'center',
          maxWidth: '100%',
          display: 'inline-flex'
        }
      },
      [`${n}-selector`]: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        padding: `${i - Ee}px ${Ee * 2}px`,
        borderRadius: e.borderRadius,
        [`${n}-show-search&`]: { cursor: 'text' },
        [`${n}-disabled&`]: {
          background: e.colorBgContainerDisabled,
          cursor: 'not-allowed'
        },
        '&:after': {
          display: 'inline-block',
          width: 0,
          margin: `${Ee}px 0`,
          lineHeight: `${a}px`,
          content: '"\\a0"'
        }
      },
      [`
        &${n}-show-arrow ${n}-selector,
        &${n}-allow-clear ${n}-selector
      `]: { paddingInlineEnd: e.fontSizeIcon + e.controlPaddingHorizontal },
      [`${n}-selection-item`]: {
        position: 'relative',
        display: 'flex',
        flex: 'none',
        boxSizing: 'border-box',
        maxWidth: '100%',
        height: a,
        marginTop: Ee,
        marginBottom: Ee,
        lineHeight: `${a - e.lineWidth * 2}px`,
        background: e.colorFillSecondary,
        border: `${e.lineWidth}px solid ${e.colorSplit}`,
        borderRadius: e.borderRadiusSM,
        cursor: 'default',
        transition: `font-size ${e.motionDurationSlow}, line-height ${e.motionDurationSlow}, height ${e.motionDurationSlow}`,
        userSelect: 'none',
        marginInlineEnd: Ee * 2,
        paddingInlineStart: e.paddingXS,
        paddingInlineEnd: e.paddingXS / 2,
        [`${n}-disabled&`]: {
          color: e.colorTextDisabled,
          borderColor: e.colorBorder,
          cursor: 'not-allowed'
        },
        '&-content': {
          display: 'inline-block',
          marginInlineEnd: e.paddingXS / 2,
          overflow: 'hidden',
          whiteSpace: 'pre',
          textOverflow: 'ellipsis'
        },
        '&-remove': w(w({}, Zt()), {
          display: 'inline-block',
          color: e.colorIcon,
          fontWeight: 'bold',
          fontSize: 10,
          lineHeight: 'inherit',
          cursor: 'pointer',
          [`> ${t}`]: { verticalAlign: '-0.2em' },
          '&:hover': { color: e.colorIconHover }
        })
      },
      [`${l}-item + ${l}-item`]: {
        [`${n}-selection-search`]: { marginInlineStart: 0 }
      },
      [`${n}-selection-search`]: {
        display: 'inline-flex',
        position: 'relative',
        maxWidth: '100%',
        marginInlineStart: e.inputPaddingHorizontalBase - i,
        '\n          &-input,\n          &-mirror\n        ': {
          height: a,
          fontFamily: e.fontFamily,
          lineHeight: `${a}px`,
          transition: `all ${e.motionDurationSlow}`
        },
        '&-input': { width: '100%', minWidth: 4.1 },
        '&-mirror': {
          position: 'absolute',
          top: 0,
          insetInlineStart: 0,
          insetInlineEnd: 'auto',
          zIndex: 999,
          whiteSpace: 'pre',
          visibility: 'hidden'
        }
      },
      [`${n}-selection-placeholder `]: {
        position: 'absolute',
        top: '50%',
        insetInlineStart: e.inputPaddingHorizontalBase,
        insetInlineEnd: e.inputPaddingHorizontalBase,
        transform: 'translateY(-50%)',
        transition: `all ${e.motionDurationSlow}`
      }
    }
  }
}
function ia(e) {
  const { componentCls: o } = e,
    n = we(e, {
      controlHeight: e.controlHeightSM,
      controlHeightSM: e.controlHeightXS,
      borderRadius: e.borderRadiusSM,
      borderRadiusSM: e.borderRadiusXS
    }),
    [, t] = Sn(e)
  return [
    ke(e),
    ke(n, 'sm'),
    {
      [`${o}-multiple${o}-sm`]: {
        [`${o}-selection-placeholder`]: {
          insetInlineStart: e.controlPaddingHorizontalSM - e.lineWidth,
          insetInlineEnd: 'auto'
        },
        [`${o}-selection-search`]: { marginInlineStart: t }
      }
    },
    ke(
      we(e, {
        fontSize: e.fontSizeLG,
        controlHeight: e.controlHeightLG,
        controlHeightSM: e.controlHeight,
        borderRadius: e.borderRadiusLG,
        borderRadiusSM: e.borderRadius
      }),
      'lg'
    )
  ]
}
function et(e, o) {
  const { componentCls: n, inputPaddingHorizontalBase: t, borderRadius: l } = e,
    a = e.controlHeight - e.lineWidth * 2,
    i = Math.ceil(e.fontSize * 1.25),
    r = o ? `${n}-${o}` : ''
  return {
    [`${n}-single${r}`]: {
      fontSize: e.fontSize,
      [`${n}-selector`]: w(w({}, it(e)), {
        display: 'flex',
        borderRadius: l,
        [`${n}-selection-search`]: {
          position: 'absolute',
          top: 0,
          insetInlineStart: t,
          insetInlineEnd: t,
          bottom: 0,
          '&-input': { width: '100%' }
        },
        [`
          ${n}-selection-item,
          ${n}-selection-placeholder
        `]: {
          padding: 0,
          lineHeight: `${a}px`,
          transition: `all ${e.motionDurationSlow}`,
          '@supports (-moz-appearance: meterbar)': { lineHeight: `${a}px` }
        },
        [`${n}-selection-item`]: { position: 'relative', userSelect: 'none' },
        [`${n}-selection-placeholder`]: {
          transition: 'none',
          pointerEvents: 'none'
        },
        [[
          '&:after',
          `${n}-selection-item:after`,
          `${n}-selection-placeholder:after`
        ].join(',')]: {
          display: 'inline-block',
          width: 0,
          visibility: 'hidden',
          content: '"\\a0"'
        }
      }),
      [`
        &${n}-show-arrow ${n}-selection-item,
        &${n}-show-arrow ${n}-selection-placeholder
      `]: { paddingInlineEnd: i },
      [`&${n}-open ${n}-selection-item`]: { color: e.colorTextPlaceholder },
      [`&:not(${n}-customize-input)`]: {
        [`${n}-selector`]: {
          width: '100%',
          height: e.controlHeight,
          padding: `0 ${t}px`,
          [`${n}-selection-search-input`]: { height: a },
          '&:after': { lineHeight: `${a}px` }
        }
      },
      [`&${n}-customize-input`]: {
        [`${n}-selector`]: {
          '&:after': { display: 'none' },
          [`${n}-selection-search`]: { position: 'static', width: '100%' },
          [`${n}-selection-placeholder`]: {
            position: 'absolute',
            insetInlineStart: 0,
            insetInlineEnd: 0,
            padding: `0 ${t}px`,
            '&:after': { display: 'none' }
          }
        }
      }
    }
  }
}
function ra(e) {
  const { componentCls: o } = e,
    n = e.controlPaddingHorizontalSM - e.lineWidth
  return [
    et(e),
    et(
      we(e, {
        controlHeight: e.controlHeightSM,
        borderRadius: e.borderRadiusSM
      }),
      'sm'
    ),
    {
      [`${o}-single${o}-sm`]: {
        [`&:not(${o}-customize-input)`]: {
          [`${o}-selection-search`]: { insetInlineStart: n, insetInlineEnd: n },
          [`${o}-selector`]: { padding: `0 ${n}px` },
          [`&${o}-show-arrow ${o}-selection-search`]: {
            insetInlineEnd: n + e.fontSize * 1.5
          },
          [`
            &${o}-show-arrow ${o}-selection-item,
            &${o}-show-arrow ${o}-selection-placeholder
          `]: { paddingInlineEnd: e.fontSize * 1.5 }
        }
      }
    },
    et(
      we(e, {
        controlHeight: e.controlHeightLG,
        fontSize: e.fontSizeLG,
        borderRadius: e.borderRadiusLG
      }),
      'lg'
    )
  ]
}
const sa = e => {
    const { componentCls: o } = e
    return {
      position: 'relative',
      backgroundColor: e.colorBgContainer,
      border: `${e.lineWidth}px ${e.lineType} ${e.colorBorder}`,
      transition: `all ${e.motionDurationMid} ${e.motionEaseInOut}`,
      input: { cursor: 'pointer' },
      [`${o}-show-search&`]: {
        cursor: 'text',
        input: { cursor: 'auto', color: 'inherit' }
      },
      [`${o}-disabled&`]: {
        color: e.colorTextDisabled,
        background: e.colorBgContainerDisabled,
        cursor: 'not-allowed',
        [`${o}-multiple&`]: { background: e.colorBgContainerDisabled },
        input: { cursor: 'not-allowed' }
      }
    }
  },
  tt = function(e, o) {
    let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1
    const {
        componentCls: t,
        borderHoverColor: l,
        outlineColor: a,
        antCls: i
      } = o,
      r = n ? { [`${t}-selector`]: { borderColor: l } } : {}
    return {
      [e]: {
        [`&:not(${t}-disabled):not(${t}-customize-input):not(${i}-pagination-size-changer)`]: w(
          w({}, r),
          {
            [`${t}-focused& ${t}-selector`]: {
              borderColor: l,
              boxShadow: `0 0 0 ${o.controlOutlineWidth}px ${a}`,
              borderInlineEndWidth: `${o.controlLineWidth}px !important`,
              outline: 0
            },
            [`&:hover ${t}-selector`]: {
              borderColor: l,
              borderInlineEndWidth: `${o.controlLineWidth}px !important`
            }
          }
        )
      }
    }
  },
  ua = e => {
    const { componentCls: o } = e
    return {
      [`${o}-selection-search-input`]: {
        margin: 0,
        padding: 0,
        background: 'transparent',
        border: 'none',
        outline: 'none',
        appearance: 'none',
        '&::-webkit-search-cancel-button': {
          display: 'none',
          '-webkit-appearance': 'none'
        }
      }
    }
  },
  ca = e => {
    const { componentCls: o, inputPaddingHorizontalBase: n, iconCls: t } = e
    return {
      [o]: w(w({}, it(e)), {
        position: 'relative',
        display: 'inline-block',
        cursor: 'pointer',
        [`&:not(${o}-customize-input) ${o}-selector`]: w(w({}, sa(e)), ua(e)),
        [`${o}-selection-item`]: w({ flex: 1, fontWeight: 'normal' }, nt),
        [`${o}-selection-placeholder`]: w(w({}, nt), {
          flex: 1,
          color: e.colorTextPlaceholder,
          pointerEvents: 'none'
        }),
        [`${o}-arrow`]: w(w({}, Zt()), {
          position: 'absolute',
          top: '50%',
          insetInlineStart: 'auto',
          insetInlineEnd: n,
          height: e.fontSizeIcon,
          marginTop: -e.fontSizeIcon / 2,
          color: e.colorTextQuaternary,
          fontSize: e.fontSizeIcon,
          lineHeight: 1,
          textAlign: 'center',
          pointerEvents: 'none',
          display: 'flex',
          alignItems: 'center',
          [t]: {
            verticalAlign: 'top',
            transition: `transform ${e.motionDurationSlow}`,
            '> svg': { verticalAlign: 'top' },
            [`&:not(${o}-suffix)`]: { pointerEvents: 'auto' }
          },
          [`${o}-disabled &`]: { cursor: 'not-allowed' },
          '> *:not(:last-child)': { marginInlineEnd: 8 }
        }),
        [`${o}-clear`]: {
          position: 'absolute',
          top: '50%',
          insetInlineStart: 'auto',
          insetInlineEnd: n,
          zIndex: 1,
          display: 'inline-block',
          width: e.fontSizeIcon,
          height: e.fontSizeIcon,
          marginTop: -e.fontSizeIcon / 2,
          color: e.colorTextQuaternary,
          fontSize: e.fontSizeIcon,
          fontStyle: 'normal',
          lineHeight: 1,
          textAlign: 'center',
          textTransform: 'none',
          background: e.colorBgContainer,
          cursor: 'pointer',
          opacity: 0,
          transition: `color ${e.motionDurationMid} ease, opacity ${e.motionDurationSlow} ease`,
          textRendering: 'auto',
          '&:before': { display: 'block' },
          '&:hover': { color: e.colorTextTertiary }
        },
        '&:hover': { [`${o}-clear`]: { opacity: 1 } }
      }),
      [`${o}-has-feedback`]: {
        [`${o}-clear`]: { insetInlineEnd: n + e.fontSize + e.paddingXXS }
      }
    }
  },
  da = e => {
    const { componentCls: o } = e
    return [
      {
        [o]: {
          [`&-borderless ${o}-selector`]: {
            backgroundColor: 'transparent !important',
            borderColor: 'transparent !important',
            boxShadow: 'none !important'
          },
          [`&${o}-in-form-item`]: { width: '100%' }
        }
      },
      ca(e),
      ra(e),
      ia(e),
      aa(e),
      { [`${o}-rtl`]: { direction: 'rtl' } },
      tt(
        o,
        we(e, {
          borderHoverColor: e.colorPrimaryHover,
          outlineColor: e.controlOutline
        })
      ),
      tt(
        `${o}-status-error`,
        we(e, {
          borderHoverColor: e.colorErrorHover,
          outlineColor: e.colorErrorOutline
        }),
        !0
      ),
      tt(
        `${o}-status-warning`,
        we(e, {
          borderHoverColor: e.colorWarningHover,
          outlineColor: e.colorWarningOutline
        }),
        !0
      ),
      bo(e, { borderElCls: `${o}-selector`, focusElCls: `${o}-focused` })
    ]
  },
  fa = Gn(
    'Select',
    (e, o) => {
      let { rootPrefixCls: n } = o
      const t = we(e, {
        rootPrefixCls: n,
        inputPaddingHorizontalBase: e.paddingSM - 1
      })
      return [da(t)]
    },
    e => ({ zIndexPopup: e.zIndexPopupBase + 50 })
  ),
  pa = () =>
    w(
      w(
        {},
        be(hn(), [
          'inputIcon',
          'mode',
          'getInputElement',
          'getRawInputElement',
          'backfill'
        ])
      ),
      {
        value: Mt([Array, Object, String, Number]),
        defaultValue: Mt([Array, Object, String, Number]),
        notFoundContent: H.any,
        suffixIcon: H.any,
        itemIcon: H.any,
        size: _e(),
        mode: _e(),
        bordered: Yn(!0),
        transitionName: String,
        choiceTransitionName: _e(''),
        popupClassName: String,
        dropdownClassName: String,
        placement: _e(),
        status: _e(),
        'onUpdate:value': Xn()
      }
    ),
  Gt = 'SECRET_COMBOBOX_MODE_DO_NOT_USE',
  me = ue({
    compatConfig: { MODE: 3 },
    name: 'ASelect',
    Option: Nl,
    OptGroup: Vl,
    inheritAttrs: !1,
    props: ft(pa(), { listHeight: 256, listItemHeight: 24 }),
    SECRET_COMBOBOX_MODE_DO_NOT_USE: Gt,
    slots: Object,
    setup(e, o) {
      let { attrs: n, emit: t, slots: l, expose: a } = o
      const i = ve(),
        r = en(),
        f = ze.useInject(),
        u = V(() => tn(f.status, e.status)),
        s = () => {
          var B
          ;(B = i.value) === null || B === void 0 || B.focus()
        },
        h = () => {
          var B
          ;(B = i.value) === null || B === void 0 || B.blur()
        },
        m = B => {
          var ee
          ;(ee = i.value) === null || ee === void 0 || ee.scrollTo(B)
        },
        P = V(() => {
          const { mode: B } = e
          if (B !== 'combobox') return B === Gt ? 'combobox' : B
        }),
        {
          prefixCls: b,
          direction: C,
          configProvider: g,
          renderEmpty: I,
          size: M,
          getPrefixCls: R,
          getPopupContainer: E,
          disabled: p,
          select: $
        } = Ve('select', e),
        { compactSize: d, compactItemClassnames: x } = nn(b, C),
        T = V(() => d.value || M.value),
        L = qt(),
        z = V(() => {
          var B
          return (B = p.value) !== null && B !== void 0 ? B : L.value
        }),
        [G, F] = fa(b),
        _ = V(() => R()),
        W = V(() =>
          e.placement !== void 0
            ? e.placement
            : C.value === 'rtl'
            ? 'bottomRight'
            : 'bottomLeft'
        ),
        j = V(() => Qn(_.value, Zn(W.value), e.transitionName)),
        q = V(() =>
          k(
            {
              [`${b.value}-lg`]: T.value === 'large',
              [`${b.value}-sm`]: T.value === 'small',
              [`${b.value}-rtl`]: C.value === 'rtl',
              [`${b.value}-borderless`]: !e.bordered,
              [`${b.value}-in-form-item`]: f.isFormItemInput
            },
            He(b.value, u.value, f.hasFeedback),
            x.value,
            F.value
          )
        ),
        J = function() {
          for (
            var B = arguments.length, ee = new Array(B), ne = 0;
            ne < B;
            ne++
          )
            ee[ne] = arguments[ne]
          t('update:value', ee[0]), t('change', ...ee), r.onFieldChange()
        },
        y = B => {
          t('blur', B), r.onFieldBlur()
        }
      a({ blur: h, focus: s, scrollTo: m })
      const A = V(() => P.value === 'multiple' || P.value === 'tags'),
        K = V(() =>
          e.showArrow !== void 0
            ? e.showArrow
            : e.loading || !(A.value || P.value === 'combobox')
        )
      return () => {
        var B, ee, ne, re
        const {
            notFoundContent: oe,
            listHeight: fe = 256,
            listItemHeight: pe = 24,
            popupClassName: O,
            dropdownClassName: c,
            virtual: v,
            dropdownMatchSelectWidth: N,
            id: D = r.id.value,
            placeholder: Q = (B = l.placeholder) === null || B === void 0
              ? void 0
              : B.call(l),
            showArrow: le
          } = e,
          { hasFeedback: te, feedbackIcon: ae } = f
        let Z
        oe !== void 0
          ? (Z = oe)
          : l.notFoundContent
          ? (Z = l.notFoundContent())
          : P.value === 'combobox'
          ? (Z = null)
          : (Z =
              (I == null ? void 0 : I('Select')) ||
              S(qn, { componentName: 'Select' }, null))
        const {
            suffixIcon: ce,
            itemIcon: de,
            removeIcon: Ae,
            clearIcon: Ye
          } = Ll(
            w(w({}, e), {
              multiple: A.value,
              prefixCls: b.value,
              hasFeedback: te,
              feedbackIcon: ae,
              showArrow: K.value
            }),
            l
          ),
          Pe = be(e, [
            'prefixCls',
            'suffixIcon',
            'itemIcon',
            'removeIcon',
            'clearIcon',
            'size',
            'bordered',
            'status'
          ]),
          Me = k(
            O || c,
            { [`${b.value}-dropdown-${C.value}`]: C.value === 'rtl' },
            F.value
          )
        return G(
          S(
            _l,
            X(
              X(X({ ref: i, virtual: v, dropdownMatchSelectWidth: N }, Pe), n),
              {},
              {
                showSearch:
                  (ee = e.showSearch) !== null && ee !== void 0
                    ? ee
                    : (ne = $ == null ? void 0 : $.value) === null ||
                      ne === void 0
                    ? void 0
                    : ne.showSearch,
                placeholder: Q,
                listHeight: fe,
                listItemHeight: pe,
                mode: P.value,
                prefixCls: b.value,
                direction: C.value,
                inputIcon: ce,
                menuItemSelectedIcon: de,
                removeIcon: Ae,
                clearIcon: Ye,
                notFoundContent: Z,
                class: [q.value, n.class],
                getPopupContainer: E == null ? void 0 : E.value,
                dropdownClassName: Me,
                onChange: J,
                onBlur: y,
                id: D,
                dropdownRender: Pe.dropdownRender || l.dropdownRender,
                transitionName: j.value,
                children:
                  (re = l.default) === null || re === void 0
                    ? void 0
                    : re.call(l),
                tagRender: e.tagRender || l.tagRender,
                optionLabelRender: l.optionLabel,
                maxTagPlaceholder: e.maxTagPlaceholder || l.maxTagPlaceholder,
                showArrow: te || le,
                disabled: z.value
              }
            ),
            { option: l.option }
          )
        )
      }
    }
  })
me.install = function(e) {
  return (
    e.component(me.name, me),
    e.component(me.Option.displayName, me.Option),
    e.component(me.OptGroup.displayName, me.OptGroup),
    e
  )
}
me.Option
me.OptGroup
const za = me,
  va = ue({
    name: 'BaseInput',
    inheritAttrs: !1,
    props: yo(),
    setup(e, o) {
      let { slots: n, attrs: t } = o
      const l = ve(),
        a = r => {
          var f
          if (
            !((f = l.value) === null || f === void 0) &&
            f.contains(r.target)
          ) {
            const { triggerFocus: u } = e
            u == null || u()
          }
        },
        i = () => {
          var r
          const {
            allowClear: f,
            value: u,
            disabled: s,
            readonly: h,
            handleReset: m,
            suffix: P = n.suffix,
            prefixCls: b
          } = e
          if (!f) return null
          const C = !s && !h && u,
            g = `${b}-clear-icon`,
            I =
              ((r = n.clearIcon) === null || r === void 0
                ? void 0
                : r.call(n)) || '*'
          return S(
            'span',
            {
              onClick: m,
              onMousedown: M => M.preventDefault(),
              class: k({ [`${g}-hidden`]: !C, [`${g}-has-suffix`]: !!P }, g),
              role: 'button',
              tabindex: -1
            },
            [I]
          )
        }
      return () => {
        var r, f
        const {
          focused: u,
          value: s,
          disabled: h,
          allowClear: m,
          readonly: P,
          hidden: b,
          prefixCls: C,
          prefix: g = (r = n.prefix) === null || r === void 0
            ? void 0
            : r.call(n),
          suffix: I = (f = n.suffix) === null || f === void 0
            ? void 0
            : f.call(n),
          addonAfter: M = n.addonAfter,
          addonBefore: R = n.addonBefore,
          inputElement: E,
          affixWrapperClassName: p,
          wrapperClassName: $,
          groupClassName: d
        } = e
        let x = Oe(E, { value: s, hidden: b })
        if (ct({ prefix: g, suffix: I, allowClear: m })) {
          const T = `${C}-affix-wrapper`,
            L = k(
              T,
              {
                [`${T}-disabled`]: h,
                [`${T}-focused`]: u,
                [`${T}-readonly`]: P,
                [`${T}-input-with-clear-btn`]: I && m && s
              },
              !Le({ addonAfter: M, addonBefore: R }) && t.class,
              p
            ),
            z = (I || m) && S('span', { class: `${C}-suffix` }, [i(), I])
          x = S(
            'span',
            {
              class: L,
              style: t.style,
              hidden: !Le({ addonAfter: M, addonBefore: R }) && b,
              onMousedown: a,
              ref: l
            },
            [
              g && S('span', { class: `${C}-prefix` }, [g]),
              Oe(E, { style: null, value: s, hidden: null }),
              z
            ]
          )
        }
        if (Le({ addonAfter: M, addonBefore: R })) {
          const T = `${C}-group`,
            L = `${T}-addon`,
            z = k(`${C}-wrapper`, T, $),
            G = k(`${C}-group-wrapper`, t.class, d)
          return S('span', { class: G, style: t.style, hidden: b }, [
            S('span', { class: z }, [
              R && S('span', { class: L }, [R]),
              Oe(x, { style: null, hidden: null }),
              M && S('span', { class: L }, [M])
            ])
          ])
        }
        return x
      }
    }
  })
var ma =
  (globalThis && globalThis.__rest) ||
  function(e, o) {
    var n = {}
    for (var t in e)
      Object.prototype.hasOwnProperty.call(e, t) &&
        o.indexOf(t) < 0 &&
        (n[t] = e[t])
    if (e != null && typeof Object.getOwnPropertySymbols == 'function')
      for (var l = 0, t = Object.getOwnPropertySymbols(e); l < t.length; l++)
        o.indexOf(t[l]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(e, t[l]) &&
          (n[t[l]] = e[t[l]])
    return n
  }
const ga = ue({
  name: 'VCInput',
  inheritAttrs: !1,
  props: So(),
  setup(e, o) {
    let { slots: n, attrs: t, expose: l, emit: a } = o
    const i = Y(e.value === void 0 ? e.defaultValue : e.value),
      r = Y(!1),
      f = Y(),
      u = Y()
    ie(
      () => e.value,
      () => {
        i.value = e.value
      }
    ),
      ie(
        () => e.disabled,
        () => {
          e.disabled && (r.value = !1)
        }
      )
    const s = d => {
        f.value && wo(f.value.input, d)
      },
      h = () => {
        var d
        ;(d = f.value.input) === null || d === void 0 || d.blur()
      },
      m = (d, x, T) => {
        var L
        ;(L = f.value.input) === null ||
          L === void 0 ||
          L.setSelectionRange(d, x, T)
      },
      P = () => {
        var d
        ;(d = f.value.input) === null || d === void 0 || d.select()
      }
    l({
      focus: s,
      blur: h,
      input: V(() => {
        var d
        return (d = f.value.input) === null || d === void 0 ? void 0 : d.input
      }),
      stateValue: i,
      setSelectionRange: m,
      select: P
    })
    const b = d => {
        a('change', d)
      },
      C = (d, x) => {
        i.value !== d &&
          (e.value === void 0
            ? (i.value = d)
            : Ie(() => {
                var T
                f.value.input.value !== i.value &&
                  ((T = u.value) === null || T === void 0 || T.$forceUpdate())
              }),
          Ie(() => {
            x && x()
          }))
      },
      g = d => {
        const { value: x } = d.target
        if (i.value === x) return
        const T = d.target.value
        _t(f.value.input, d, b), C(T)
      },
      I = d => {
        d.keyCode === 13 && a('pressEnter', d), a('keydown', d)
      },
      M = d => {
        ;(r.value = !0), a('focus', d)
      },
      R = d => {
        ;(r.value = !1), a('blur', d)
      },
      E = d => {
        _t(f.value.input, d, b),
          C('', () => {
            s()
          })
      },
      p = () => {
        var d, x
        const {
            addonBefore: T = n.addonBefore,
            addonAfter: L = n.addonAfter,
            disabled: z,
            valueModifiers: G = {},
            htmlSize: F,
            autocomplete: _,
            prefixCls: W,
            inputClassName: j,
            prefix: q = (d = n.prefix) === null || d === void 0
              ? void 0
              : d.call(n),
            suffix: J = (x = n.suffix) === null || x === void 0
              ? void 0
              : x.call(n),
            allowClear: y,
            type: A = 'text'
          } = e,
          K = be(e, [
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
          B = w(w(w({}, K), t), {
            autocomplete: _,
            onChange: g,
            onInput: g,
            onFocus: M,
            onBlur: R,
            onKeydown: I,
            class: k(
              W,
              { [`${W}-disabled`]: z },
              j,
              !Le({ addonAfter: L, addonBefore: T }) &&
                !ct({ prefix: q, suffix: J, allowClear: y }) &&
                t.class
            ),
            ref: f,
            key: 'ant-input',
            size: F,
            type: A,
            lazy: e.lazy
          })
        return (
          G.lazy && delete B.onInput,
          B.autofocus || delete B.autofocus,
          S(kt, be(B, ['size']), null)
        )
      },
      $ = () => {
        var d
        const {
            maxlength: x,
            suffix: T = (d = n.suffix) === null || d === void 0
              ? void 0
              : d.call(n),
            showCount: L,
            prefixCls: z
          } = e,
          G = Number(x) > 0
        if (T || L) {
          const F = [...Dt(i.value)].length,
            _ =
              typeof L == 'object'
                ? L.formatter({ count: F, maxlength: x })
                : `${F}${G ? ` / ${x}` : ''}`
          return S(Te, null, [
            !!L &&
              S(
                'span',
                {
                  class: k(`${z}-show-count-suffix`, {
                    [`${z}-show-count-has-suffix`]: !!T
                  })
                },
                [_]
              ),
            T
          ])
        }
        return null
      }
    return (
      ge(() => {}),
      () => {
        const { prefixCls: d, disabled: x } = e,
          T = ma(e, ['prefixCls', 'disabled'])
        return S(
          va,
          X(
            X(X({}, T), t),
            {},
            {
              ref: u,
              prefixCls: d,
              inputElement: p(),
              handleReset: E,
              value: Dt(i.value),
              focused: r.value,
              triggerFocus: s,
              suffix: $(),
              disabled: x
            }
          ),
          n
        )
      }
    )
  }
})
var ha =
  (globalThis && globalThis.__rest) ||
  function(e, o) {
    var n = {}
    for (var t in e)
      Object.prototype.hasOwnProperty.call(e, t) &&
        o.indexOf(t) < 0 &&
        (n[t] = e[t])
    if (e != null && typeof Object.getOwnPropertySymbols == 'function')
      for (var l = 0, t = Object.getOwnPropertySymbols(e); l < t.length; l++)
        o.indexOf(t[l]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(e, t[l]) &&
          (n[t[l]] = e[t[l]])
    return n
  }
const se = ue({
    compatConfig: { MODE: 3 },
    name: 'AInput',
    inheritAttrs: !1,
    props: dt(),
    setup(e, o) {
      let { slots: n, attrs: t, expose: l, emit: a } = o
      const i = ve(),
        r = en(),
        f = ze.useInject(),
        u = V(() => tn(f.status, e.status)),
        { direction: s, prefixCls: h, size: m, autocomplete: P } = Ve(
          'input',
          e
        ),
        { compactSize: b, compactItemClassnames: C } = nn(h, s),
        g = V(() => b.value || m.value),
        [I, M] = on(h),
        R = qt()
      l({
        focus: F => {
          var _
          ;(_ = i.value) === null || _ === void 0 || _.focus(F)
        },
        blur: () => {
          var F
          ;(F = i.value) === null || F === void 0 || F.blur()
        },
        input: i,
        setSelectionRange: (F, _, W) => {
          var j
          ;(j = i.value) === null ||
            j === void 0 ||
            j.setSelectionRange(F, _, W)
        },
        select: () => {
          var F
          ;(F = i.value) === null || F === void 0 || F.select()
        }
      })
      const x = ve([]),
        T = () => {
          x.value.push(
            setTimeout(() => {
              var F, _, W, j
              !((F = i.value) === null || F === void 0) &&
                F.input &&
                ((_ = i.value) === null || _ === void 0
                  ? void 0
                  : _.input.getAttribute('type')) === 'password' &&
                !((W = i.value) === null || W === void 0) &&
                  W.input.hasAttribute('value') &&
                ((j = i.value) === null ||
                  j === void 0 ||
                  j.input.removeAttribute('value'))
            })
          )
        }
      ge(() => {
        T()
      }),
        oo(() => {
          x.value.forEach(F => clearTimeout(F))
        }),
        Re(() => {
          x.value.forEach(F => clearTimeout(F))
        })
      const L = F => {
          T(), a('blur', F), r.onFieldBlur()
        },
        z = F => {
          T(), a('focus', F)
        },
        G = F => {
          a('update:value', F.target.value),
            a('change', F),
            a('input', F),
            r.onFieldChange()
        }
      return () => {
        var F, _, W, j, q, J
        const { hasFeedback: y, feedbackIcon: A } = f,
          {
            allowClear: K,
            bordered: B = !0,
            prefix: ee = (F = n.prefix) === null || F === void 0
              ? void 0
              : F.call(n),
            suffix: ne = (_ = n.suffix) === null || _ === void 0
              ? void 0
              : _.call(n),
            addonAfter: re = (W = n.addonAfter) === null || W === void 0
              ? void 0
              : W.call(n),
            addonBefore: oe = (j = n.addonBefore) === null || j === void 0
              ? void 0
              : j.call(n),
            id: fe = (q = r.id) === null || q === void 0 ? void 0 : q.value
          } = e,
          pe = ha(e, [
            'allowClear',
            'bordered',
            'prefix',
            'suffix',
            'addonAfter',
            'addonBefore',
            'id'
          ]),
          O = (y || ne) && S(Te, null, [ne, y && A]),
          c = h.value,
          v = ct({ prefix: ee, suffix: ne }) || !!y,
          N = n.clearIcon || (() => S(Qt, null, null))
        return I(
          S(
            ga,
            X(
              X(X({}, t), be(pe, ['onUpdate:value', 'onChange', 'onInput'])),
              {},
              {
                onChange: G,
                id: fe,
                disabled:
                  (J = e.disabled) !== null && J !== void 0 ? J : R.value,
                ref: i,
                prefixCls: c,
                autocomplete: P.value,
                onBlur: L,
                onFocus: z,
                prefix: ee,
                suffix: O,
                allowClear: K,
                addonAfter:
                  re &&
                  S(Nt, null, {
                    default: () => [S(Vt, null, { default: () => [re] })]
                  }),
                addonBefore:
                  oe &&
                  S(Nt, null, {
                    default: () => [S(Vt, null, { default: () => [oe] })]
                  }),
                class: [t.class, C.value],
                inputClassName: k(
                  {
                    [`${c}-sm`]: g.value === 'small',
                    [`${c}-lg`]: g.value === 'large',
                    [`${c}-rtl`]: s.value === 'rtl',
                    [`${c}-borderless`]: !B
                  },
                  !v && He(c, u.value),
                  M.value
                ),
                affixWrapperClassName: k(
                  {
                    [`${c}-affix-wrapper-sm`]: g.value === 'small',
                    [`${c}-affix-wrapper-lg`]: g.value === 'large',
                    [`${c}-affix-wrapper-rtl`]: s.value === 'rtl',
                    [`${c}-affix-wrapper-borderless`]: !B
                  },
                  He(`${c}-affix-wrapper`, u.value, y),
                  M.value
                ),
                wrapperClassName: k(
                  { [`${c}-group-rtl`]: s.value === 'rtl' },
                  M.value
                ),
                groupClassName: k(
                  {
                    [`${c}-group-wrapper-sm`]: g.value === 'small',
                    [`${c}-group-wrapper-lg`]: g.value === 'large',
                    [`${c}-group-wrapper-rtl`]: s.value === 'rtl'
                  },
                  He(`${c}-group-wrapper`, u.value, y),
                  M.value
                )
              }
            ),
            w(w({}, n), { clearIcon: N })
          )
        )
      }
    }
  }),
  ba = ue({
    compatConfig: { MODE: 3 },
    name: 'AInputGroup',
    inheritAttrs: !1,
    props: {
      prefixCls: String,
      size: { type: String },
      compact: { type: Boolean, default: void 0 }
    },
    setup(e, o) {
      let { slots: n, attrs: t } = o
      const { prefixCls: l, direction: a, getPrefixCls: i } = Ve(
          'input-group',
          e
        ),
        r = ze.useInject()
      ze.useProvide(r, { isFormItemInput: !1 })
      const f = V(() => i('input')),
        [u, s] = on(f),
        h = V(() => {
          const m = l.value
          return {
            [`${m}`]: !0,
            [s.value]: !0,
            [`${m}-lg`]: e.size === 'large',
            [`${m}-sm`]: e.size === 'small',
            [`${m}-compact`]: e.compact,
            [`${m}-rtl`]: a.value === 'rtl'
          }
        })
      return () => {
        var m
        return u(
          S('span', X(X({}, t), {}, { class: k(h.value, t.class) }), [
            (m = n.default) === null || m === void 0 ? void 0 : m.call(n)
          ])
        )
      }
    }
  })
var ya =
  (globalThis && globalThis.__rest) ||
  function(e, o) {
    var n = {}
    for (var t in e)
      Object.prototype.hasOwnProperty.call(e, t) &&
        o.indexOf(t) < 0 &&
        (n[t] = e[t])
    if (e != null && typeof Object.getOwnPropertySymbols == 'function')
      for (var l = 0, t = Object.getOwnPropertySymbols(e); l < t.length; l++)
        o.indexOf(t[l]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(e, t[l]) &&
          (n[t[l]] = e[t[l]])
    return n
  }
const Sa = ue({
  compatConfig: { MODE: 3 },
  name: 'AInputSearch',
  inheritAttrs: !1,
  props: w(w({}, dt()), {
    inputPrefixCls: String,
    enterButton: H.any,
    onSearch: { type: Function }
  }),
  setup(e, o) {
    let { slots: n, attrs: t, expose: l, emit: a } = o
    const i = Y(),
      r = Y(!1)
    l({
      focus: () => {
        var p
        ;(p = i.value) === null || p === void 0 || p.focus()
      },
      blur: () => {
        var p
        ;(p = i.value) === null || p === void 0 || p.blur()
      }
    })
    const s = p => {
        a('update:value', p.target.value),
          p && p.target && p.type === 'click' && a('search', p.target.value, p),
          a('change', p)
      },
      h = p => {
        var $
        document.activeElement ===
          (($ = i.value) === null || $ === void 0 ? void 0 : $.input) &&
          p.preventDefault()
      },
      m = p => {
        var $, d
        a(
          'search',
          (d = ($ = i.value) === null || $ === void 0 ? void 0 : $.input) ===
            null || d === void 0
            ? void 0
            : d.stateValue,
          p
        )
      },
      P = p => {
        r.value || e.loading || m(p)
      },
      b = p => {
        ;(r.value = !0), a('compositionstart', p)
      },
      C = p => {
        ;(r.value = !1), a('compositionend', p)
      },
      { prefixCls: g, getPrefixCls: I, direction: M, size: R } = Ve(
        'input-search',
        e
      ),
      E = V(() => I('input', e.inputPrefixCls))
    return () => {
      var p, $, d, x
      const {
          disabled: T,
          loading: L,
          addonAfter: z = (p = n.addonAfter) === null || p === void 0
            ? void 0
            : p.call(n),
          suffix: G = ($ = n.suffix) === null || $ === void 0
            ? void 0
            : $.call(n)
        } = e,
        F = ya(e, ['disabled', 'loading', 'addonAfter', 'suffix'])
      let {
        enterButton: _ = (x =
          (d = n.enterButton) === null || d === void 0 ? void 0 : d.call(n)) !==
          null && x !== void 0
          ? x
          : !1
      } = e
      _ = _ || _ === ''
      const W = typeof _ == 'boolean' ? S(bn, null, null) : null,
        j = `${g.value}-button`,
        q = Array.isArray(_) ? _[0] : _
      let J
      const y = q.type && Xl(q.type) && q.type.__ANT_BUTTON
      if (y || q.tagName === 'button')
        J = Oe(
          q,
          w(
            { onMousedown: h, onClick: m, key: 'enterButton' },
            y ? { class: j, size: R.value } : {}
          ),
          !1
        )
      else {
        const K = W && !_
        J = S(
          Co,
          {
            class: j,
            type: _ ? 'primary' : void 0,
            size: R.value,
            disabled: T,
            key: 'enterButton',
            onMousedown: h,
            onClick: m,
            loading: L,
            icon: K ? W : null
          },
          { default: () => [K ? null : W || _] }
        )
      }
      z && (J = [J, z])
      const A = k(
        g.value,
        {
          [`${g.value}-rtl`]: M.value === 'rtl',
          [`${g.value}-${R.value}`]: !!R.value,
          [`${g.value}-with-button`]: !!_
        },
        t.class
      )
      return S(
        se,
        X(
          X(
            X({ ref: i }, be(F, ['onUpdate:value', 'onSearch', 'enterButton'])),
            t
          ),
          {},
          {
            onPressEnter: P,
            onCompositionstart: b,
            onCompositionend: C,
            size: R.value,
            prefixCls: E.value,
            addonAfter: J,
            suffix: G,
            onChange: s,
            class: A,
            disabled: T
          }
        ),
        n
      )
    }
  }
})
function Yt(e) {
  for (var o = 1; o < arguments.length; o++) {
    var n = arguments[o] != null ? Object(arguments[o]) : {},
      t = Object.keys(n)
    typeof Object.getOwnPropertySymbols == 'function' &&
      (t = t.concat(
        Object.getOwnPropertySymbols(n).filter(function(l) {
          return Object.getOwnPropertyDescriptor(n, l).enumerable
        })
      )),
      t.forEach(function(l) {
        wa(e, l, n[l])
      })
  }
  return e
}
function wa(e, o, n) {
  return (
    o in e
      ? Object.defineProperty(e, o, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0
        })
      : (e[o] = n),
    e
  )
}
var yt = function(o, n) {
  var t = Yt({}, o, n.attrs)
  return S(at, Yt({}, t, { icon: To }), null)
}
yt.displayName = 'EyeInvisibleOutlined'
yt.inheritAttrs = !1
const Ca = yt
var xa =
  (globalThis && globalThis.__rest) ||
  function(e, o) {
    var n = {}
    for (var t in e)
      Object.prototype.hasOwnProperty.call(e, t) &&
        o.indexOf(t) < 0 &&
        (n[t] = e[t])
    if (e != null && typeof Object.getOwnPropertySymbols == 'function')
      for (var l = 0, t = Object.getOwnPropertySymbols(e); l < t.length; l++)
        o.indexOf(t[l]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(e, t[l]) &&
          (n[t[l]] = e[t[l]])
    return n
  }
const Ia = { click: 'onClick', hover: 'onMouseover' },
  Oa = e => (e ? S(xo, null, null) : S(Ca, null, null)),
  $a = ue({
    compatConfig: { MODE: 3 },
    name: 'AInputPassword',
    inheritAttrs: !1,
    props: w(w({}, dt()), {
      prefixCls: String,
      inputPrefixCls: String,
      action: { type: String, default: 'click' },
      visibilityToggle: { type: Boolean, default: !0 },
      visible: { type: Boolean, default: void 0 },
      'onUpdate:visible': Function,
      iconRender: Function
    }),
    setup(e, o) {
      let { slots: n, attrs: t, expose: l, emit: a } = o
      const i = Y(!1),
        r = () => {
          const { disabled: g } = e
          g || ((i.value = !i.value), a('update:visible', i.value))
        }
      $e(() => {
        e.visible !== void 0 && (i.value = !!e.visible)
      })
      const f = Y()
      l({
        focus: () => {
          var g
          ;(g = f.value) === null || g === void 0 || g.focus()
        },
        blur: () => {
          var g
          ;(g = f.value) === null || g === void 0 || g.blur()
        }
      })
      const h = g => {
          const { action: I, iconRender: M = n.iconRender || Oa } = e,
            R = Ia[I] || '',
            E = M(i.value),
            p = {
              [R]: r,
              class: `${g}-icon`,
              key: 'passwordIcon',
              onMousedown: $ => {
                $.preventDefault()
              },
              onMouseup: $ => {
                $.preventDefault()
              }
            }
          return Oe(We(E) ? E : S('span', null, [E]), p)
        },
        { prefixCls: m, getPrefixCls: P } = Ve('input-password', e),
        b = V(() => P('input', e.inputPrefixCls)),
        C = () => {
          const { size: g, visibilityToggle: I } = e,
            M = xa(e, ['size', 'visibilityToggle']),
            R = I && h(m.value),
            E = k(m.value, t.class, { [`${m.value}-${g}`]: !!g }),
            p = w(w(w({}, be(M, ['suffix', 'iconRender', 'action'])), t), {
              type: i.value ? 'text' : 'password',
              class: E,
              prefixCls: b.value,
              suffix: R
            })
          return g && (p.size = g), S(se, X({ ref: f }, p), n)
        }
      return () => C()
    }
  })
se.Group = ba
se.Search = Sa
se.TextArea = Io
se.Password = $a
se.install = function(e) {
  return (
    e.component(se.name, se),
    e.component(se.Group.name, se.Group),
    e.component(se.Search.name, se.Search),
    e.component(se.TextArea.name, se.TextArea),
    e.component(se.Password.name, se.Password),
    e
  )
}
export {
  Bl as D,
  Sa as I,
  gl as L,
  za as S,
  se as a,
  Kt as b,
  bn as c,
  jl as g,
  Xl as i,
  pa as s,
  hl as u
}

import {
  _ as S,
  P as D,
  a as k,
  c as ue,
  x as Je,
  E as Ht,
  H as Cn,
  A as Nt,
  C as xn,
  L as On,
  a0 as $n,
  K as ye,
  t as qe,
  r as ke,
  m as be,
  a1 as Lt,
  g as Tn,
  u as Mn,
  z as En,
  a2 as Pn,
  a3 as Dn,
  a4 as Fn,
  s as St,
  d as Me,
  b as Rn,
  f as Vn
} from './Dashboard.071f9192.js'
import {
  d as fe,
  g as V,
  r as me,
  c as O,
  i as Hn,
  Z as Bt,
  j as Ne,
  s as q,
  l as Oe,
  v as Se,
  w as oe,
  L as Qe,
  F as Pe,
  m as Fe,
  p as et,
  _ as Nn,
  z as $e,
  V as Ln,
  A as Bn,
  E as tt,
  n as Ee,
  x as _n,
  N as ve
} from './vendor.0319ebde.js'
import {
  T as An,
  c as _t,
  O as zn,
  K as _,
  p as nt,
  F as Kn,
  R as Wn,
  y as he,
  w as ge,
  o as Le,
  u as yt,
  b as wt,
  G as jn,
  e as Un,
  d as Gn,
  g as Yn,
  f as Xn,
  h as It
} from './shallowequal.234d6013.js'
import {
  B as qn,
  C as Qn,
  g as Zn,
  u as Jn,
  F as kn,
  e as eo,
  d as to
} from './index.5b4de55e.js'
import { u as no, v as oo } from './antd.ecdb83f5.js'
import { u as lo } from './index.5693d46f.js'
function Ct(e, t) {
  const { key: o } = e
  let n
  return (
    'value' in e && ({ value: n } = e),
    o ?? (n !== void 0 ? n : `rc-index-key-${t}`)
  )
}
function At(e, t) {
  const { label: o, value: n, options: l } = e || {}
  return {
    label: o || (t ? 'children' : 'label'),
    value: n || 'value',
    options: l || 'options'
  }
}
function io(e) {
  let { fieldNames: t, childrenAsData: o } =
    arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}
  const n = [],
    { label: l, value: i, options: d } = At(t, !1)
  function a(f, s) {
    f.forEach(r => {
      const m = r[l]
      if (s || !(d in r)) {
        const h = r[i]
        n.push({
          key: Ct(r, n.length),
          groupOption: s,
          data: r,
          label: m,
          value: h
        })
      } else {
        let h = m
        h === void 0 && o && (h = r.label),
          n.push({ key: Ct(r, n.length), group: !0, data: r, label: h }),
          a(r[d], !0)
      }
    })
  }
  return a(e, !1), n
}
function Ze(e) {
  const t = S({}, e)
  return (
    'props' in t ||
      Object.defineProperty(t, 'props', {
        get() {
          return t
        }
      }),
    t
  )
}
function ao(e, t) {
  if (!t || !t.length) return null
  let o = !1
  function n(i, d) {
    let [a, ...f] = d
    if (!a) return [i]
    const s = i.split(a)
    return (
      (o = o || s.length > 1),
      s.reduce((r, m) => [...r, ...n(m, f)], []).filter(r => r)
    )
  }
  const l = n(e, t)
  return o ? l : null
}
var ro =
  (globalThis && globalThis.__rest) ||
  function(e, t) {
    var o = {}
    for (var n in e)
      Object.prototype.hasOwnProperty.call(e, n) &&
        t.indexOf(n) < 0 &&
        (o[n] = e[n])
    if (e != null && typeof Object.getOwnPropertySymbols == 'function')
      for (var l = 0, n = Object.getOwnPropertySymbols(e); l < n.length; l++)
        t.indexOf(n[l]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(e, n[l]) &&
          (o[n[l]] = e[n[l]])
    return o
  }
const so = e => {
    const t = e === !0 ? 0 : 1
    return {
      bottomLeft: {
        points: ['tl', 'bl'],
        offset: [0, 4],
        overflow: { adjustX: t, adjustY: 1 }
      },
      bottomRight: {
        points: ['tr', 'br'],
        offset: [0, 4],
        overflow: { adjustX: t, adjustY: 1 }
      },
      topLeft: {
        points: ['bl', 'tl'],
        offset: [0, -4],
        overflow: { adjustX: t, adjustY: 1 }
      },
      topRight: {
        points: ['br', 'tr'],
        offset: [0, -4],
        overflow: { adjustX: t, adjustY: 1 }
      }
    }
  },
  uo = fe({
    name: 'SelectTrigger',
    inheritAttrs: !1,
    props: {
      dropdownAlign: Object,
      visible: { type: Boolean, default: void 0 },
      disabled: { type: Boolean, default: void 0 },
      dropdownClassName: String,
      dropdownStyle: D.object,
      placement: String,
      empty: { type: Boolean, default: void 0 },
      prefixCls: String,
      popupClassName: String,
      animation: String,
      transitionName: String,
      getPopupContainer: Function,
      dropdownRender: Function,
      containerWidth: Number,
      dropdownMatchSelectWidth: D.oneOfType([Number, Boolean]).def(!0),
      popupElement: D.any,
      direction: String,
      getTriggerDOMNode: Function,
      onPopupVisibleChange: Function,
      onPopupMouseEnter: Function,
      onPopupFocusin: Function,
      onPopupFocusout: Function
    },
    setup(e, t) {
      let { slots: o, attrs: n, expose: l } = t
      const i = V(() => {
          const { dropdownMatchSelectWidth: a } = e
          return so(a)
        }),
        d = me()
      return (
        l({ getPopupElement: () => d.value }),
        () => {
          const a = S(S({}, e), n),
            { empty: f = !1 } = a,
            s = ro(a, ['empty']),
            {
              visible: r,
              dropdownAlign: m,
              prefixCls: h,
              popupElement: $,
              dropdownClassName: v,
              dropdownStyle: y,
              direction: x = 'ltr',
              placement: w,
              dropdownMatchSelectWidth: F,
              containerWidth: N,
              dropdownRender: T,
              animation: b,
              transitionName: E,
              getPopupContainer: C,
              getTriggerDOMNode: P,
              onPopupVisibleChange: L,
              onPopupMouseEnter: z,
              onPopupFocusin: B,
              onPopupFocusout: Y
            } = s,
            U = `${h}-dropdown`
          let W = $
          T && (W = T({ menuNode: $, props: e }))
          const G = b ? `${U}-${b}` : E,
            K = S({ minWidth: `${N}px` }, y)
          return (
            typeof F == 'number'
              ? (K.width = `${F}px`)
              : F && (K.width = `${N}px`),
            O(
              An,
              k(
                k({}, e),
                {},
                {
                  showAction: L ? ['click'] : [],
                  hideAction: L ? ['click'] : [],
                  popupPlacement:
                    w || (x === 'rtl' ? 'bottomRight' : 'bottomLeft'),
                  builtinPlacements: i.value,
                  prefixCls: U,
                  popupTransitionName: G,
                  popupAlign: m,
                  popupVisible: r,
                  getPopupContainer: C,
                  popupClassName: ue(v, { [`${U}-empty`]: f }),
                  popupStyle: K,
                  getTriggerDOMNode: P,
                  onPopupVisibleChange: L
                }
              ),
              {
                default: o.default,
                popup: () =>
                  O(
                    'div',
                    { ref: d, onMouseenter: z, onFocusin: B, onFocusout: Y },
                    [W]
                  )
              }
            )
          )
        }
      )
    }
  }),
  co = uo,
  Be = (e, t) => {
    let { slots: o } = t
    var n
    const {
      class: l,
      customizeIcon: i,
      customizeIconProps: d,
      onMousedown: a,
      onClick: f
    } = e
    let s
    return (
      typeof i == 'function' ? (s = i(d)) : (s = Hn(i) ? Bt(i) : i),
      O(
        'span',
        {
          class: l,
          onMousedown: r => {
            r.preventDefault(), a && a(r)
          },
          style: { userSelect: 'none', WebkitUserSelect: 'none' },
          unselectable: 'on',
          onClick: f,
          'aria-hidden': !0
        },
        [
          s !== void 0
            ? s
            : O('span', { class: l.split(/\s+/).map(r => `${r}-icon`) }, [
                (n = o.default) === null || n === void 0 ? void 0 : n.call(o)
              ])
        ]
      )
    )
  }
Be.inheritAttrs = !1
Be.displayName = 'TransBtn'
Be.props = {
  class: String,
  customizeIcon: D.any,
  customizeIconProps: D.any,
  onMousedown: Function,
  onClick: Function
}
const He = Be,
  fo = {
    inputRef: D.any,
    prefixCls: String,
    id: String,
    inputElement: D.VueNode,
    disabled: { type: Boolean, default: void 0 },
    autofocus: { type: Boolean, default: void 0 },
    autocomplete: String,
    editable: { type: Boolean, default: void 0 },
    activeDescendantId: String,
    value: String,
    open: { type: Boolean, default: void 0 },
    tabindex: D.oneOfType([D.number, D.string]),
    attrs: D.object,
    onKeydown: { type: Function },
    onMousedown: { type: Function },
    onChange: { type: Function },
    onPaste: { type: Function },
    onCompositionstart: { type: Function },
    onCompositionend: { type: Function },
    onFocus: { type: Function },
    onBlur: { type: Function }
  },
  po = fe({
    compatConfig: { MODE: 3 },
    name: 'SelectInput',
    inheritAttrs: !1,
    props: fo,
    setup(e) {
      let t = null
      const o = Ne('VCSelectContainerEvent')
      return () => {
        var n
        const {
          prefixCls: l,
          id: i,
          inputElement: d,
          disabled: a,
          tabindex: f,
          autofocus: s,
          autocomplete: r,
          editable: m,
          activeDescendantId: h,
          value: $,
          onKeydown: v,
          onMousedown: y,
          onChange: x,
          onPaste: w,
          onCompositionstart: F,
          onCompositionend: N,
          onFocus: T,
          onBlur: b,
          open: E,
          inputRef: C,
          attrs: P
        } = e
        let L = d || O(qn, null, null)
        const z = L.props || {},
          {
            onKeydown: B,
            onInput: Y,
            onFocus: U,
            onBlur: W,
            onMousedown: G,
            onCompositionstart: K,
            onCompositionend: le,
            style: ae
          } = z
        return (
          (L = _t(
            L,
            S(
              S(
                S(
                  S(S({ type: 'search' }, z), {
                    id: i,
                    ref: C,
                    disabled: a,
                    tabindex: f,
                    lazy: !1,
                    autocomplete: r || 'off',
                    autofocus: s,
                    class: ue(
                      `${l}-selection-search-input`,
                      (n = L == null ? void 0 : L.props) === null ||
                        n === void 0
                        ? void 0
                        : n.class
                    ),
                    role: 'combobox',
                    'aria-expanded': E,
                    'aria-haspopup': 'listbox',
                    'aria-owns': `${i}_list`,
                    'aria-autocomplete': 'list',
                    'aria-controls': `${i}_list`,
                    'aria-activedescendant': h
                  }),
                  P
                ),
                {
                  value: m ? $ : '',
                  readonly: !m,
                  unselectable: m ? null : 'on',
                  style: S(S({}, ae), { opacity: m ? null : 0 }),
                  onKeydown: p => {
                    v(p), B && B(p)
                  },
                  onMousedown: p => {
                    y(p), G && G(p)
                  },
                  onInput: p => {
                    x(p), Y && Y(p)
                  },
                  onCompositionstart(p) {
                    F(p), K && K(p)
                  },
                  onCompositionend(p) {
                    N(p), le && le(p)
                  },
                  onPaste: w,
                  onFocus: function() {
                    clearTimeout(t),
                      U && U(arguments.length <= 0 ? void 0 : arguments[0]),
                      T && T(arguments.length <= 0 ? void 0 : arguments[0]),
                      o == null ||
                        o.focus(arguments.length <= 0 ? void 0 : arguments[0])
                  },
                  onBlur: function() {
                    for (
                      var p = arguments.length, R = new Array(p), A = 0;
                      A < p;
                      A++
                    )
                      R[A] = arguments[A]
                    t = setTimeout(() => {
                      W && W(R[0]), b && b(R[0]), o == null || o.blur(R[0])
                    }, 100)
                  }
                }
              ),
              L.type === 'textarea' ? {} : { type: 'search' }
            ),
            !0,
            !0
          )),
          L
        )
      }
    }
  }),
  zt = po,
  mo = `accept acceptcharset accesskey action allowfullscreen allowtransparency
alt async autocomplete autofocus autoplay capture cellpadding cellspacing challenge
charset checked classid classname colspan cols content contenteditable contextmenu
controls coords crossorigin data datetime default defer dir disabled download draggable
enctype form formaction formenctype formmethod formnovalidate formtarget frameborder
headers height hidden high href hreflang htmlfor for httpequiv icon id inputmode integrity
is keyparams keytype kind label lang list loop low manifest marginheight marginwidth max maxlength media
mediagroup method min minlength multiple muted name novalidate nonce open
optimum pattern placeholder poster preload radiogroup readonly rel required
reversed role rowspan rows sandbox scope scoped scrolling seamless selected
shape size sizes span spellcheck src srcdoc srclang srcset start step style
summary tabindex target title type usemap value width wmode wrap`,
  go = `onCopy onCut onPaste onCompositionend onCompositionstart onCompositionupdate onKeydown
    onKeypress onKeyup onFocus onBlur onChange onInput onSubmit onClick onContextmenu onDoubleclick onDblclick
    onDrag onDragend onDragenter onDragexit onDragleave onDragover onDragstart onDrop onMousedown
    onMouseenter onMouseleave onMousemove onMouseout onMouseover onMouseup onSelect onTouchcancel
    onTouchend onTouchmove onTouchstart onTouchstartPassive onTouchmovePassive onScroll onWheel onAbort onCanplay onCanplaythrough
    onDurationchange onEmptied onEncrypted onEnded onError onLoadeddata onLoadedmetadata
    onLoadstart onPause onPlay onPlaying onProgress onRatechange onSeeked onSeeking onStalled onSuspend onTimeupdate onVolumechange onWaiting onLoad onError`,
  xt = `${mo} ${go}`.split(/[\s\n]+/),
  vo = 'aria-',
  ho = 'data-'
function Ot(e, t) {
  return e.indexOf(t) === 0
}
function ot(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1,
    o
  t === !1
    ? (o = { aria: !0, data: !0, attr: !0 })
    : t === !0
    ? (o = { aria: !0 })
    : (o = S({}, t))
  const n = {}
  return (
    Object.keys(e).forEach(l => {
      ;((o.aria && (l === 'role' || Ot(l, vo))) ||
        (o.data && Ot(l, ho)) ||
        (o.attr && (xt.includes(l) || xt.includes(l.toLowerCase())))) &&
        (n[l] = e[l])
    }),
    n
  )
}
const bo = Symbol('TreeSelectLegacyContextPropsKey')
function lt() {
  return Ne(bo, {})
}
const So = {
    id: String,
    prefixCls: String,
    values: D.array,
    open: { type: Boolean, default: void 0 },
    searchValue: String,
    inputRef: D.any,
    placeholder: D.any,
    disabled: { type: Boolean, default: void 0 },
    mode: String,
    showSearch: { type: Boolean, default: void 0 },
    autofocus: { type: Boolean, default: void 0 },
    autocomplete: String,
    activeDescendantId: String,
    tabindex: D.oneOfType([D.number, D.string]),
    compositionStatus: Boolean,
    removeIcon: D.any,
    choiceTransitionName: String,
    maxTagCount: D.oneOfType([D.number, D.string]),
    maxTagTextLength: Number,
    maxTagPlaceholder: D.any.def(() => e => `+ ${e.length} ...`),
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
  $t = e => {
    e.preventDefault(), e.stopPropagation()
  },
  yo = fe({
    name: 'MultipleSelectSelector',
    inheritAttrs: !1,
    props: So,
    setup(e) {
      const t = q(),
        o = q(0),
        n = q(!1),
        l = lt(),
        i = V(() => `${e.prefixCls}-selection`),
        d = V(() => (e.open || e.mode === 'tags' ? e.searchValue : '')),
        a = V(() => e.mode === 'tags' || (e.showSearch && (e.open || n.value))),
        f = me('')
      Oe(() => {
        f.value = d.value
      }),
        Se(() => {
          oe(
            f,
            () => {
              o.value = t.value.scrollWidth
            },
            { flush: 'post', immediate: !0 }
          )
        })
      function s(v, y, x, w, F) {
        return O(
          'span',
          {
            class: ue(`${i.value}-item`, { [`${i.value}-item-disabled`]: x }),
            title:
              typeof v == 'string' || typeof v == 'number'
                ? v.toString()
                : void 0
          },
          [
            O('span', { class: `${i.value}-item-content` }, [y]),
            w &&
              O(
                He,
                {
                  class: `${i.value}-item-remove`,
                  onMousedown: $t,
                  onClick: F,
                  customizeIcon: e.removeIcon
                },
                { default: () => [Qe('×')] }
              )
          ]
        )
      }
      function r(v, y, x, w, F, N) {
        var T
        const b = C => {
          $t(C), e.onToggleOpen(!open)
        }
        let E = N
        return (
          l.keyEntities &&
            (E =
              ((T = l.keyEntities[v]) === null || T === void 0
                ? void 0
                : T.node) || {}),
          O('span', { key: v, onMousedown: b }, [
            e.tagRender({
              label: y,
              value: v,
              disabled: x,
              closable: w,
              onClose: F,
              option: E
            })
          ])
        )
      }
      function m(v) {
        const { disabled: y, label: x, value: w, option: F } = v,
          N = !e.disabled && !y
        let T = x
        if (
          typeof e.maxTagTextLength == 'number' &&
          (typeof x == 'string' || typeof x == 'number')
        ) {
          const E = String(T)
          E.length > e.maxTagTextLength &&
            (T = `${E.slice(0, e.maxTagTextLength)}...`)
        }
        const b = E => {
          var C
          E && E.stopPropagation(),
            (C = e.onRemove) === null || C === void 0 || C.call(e, v)
        }
        return typeof e.tagRender == 'function'
          ? r(w, T, y, N, b, F)
          : s(x, T, y, N, b)
      }
      function h(v) {
        const { maxTagPlaceholder: y = w => `+ ${w.length} ...` } = e,
          x = typeof y == 'function' ? y(v) : y
        return s(x, x, !1)
      }
      const $ = v => {
        const y = v.target.composing
        ;(f.value = v.target.value), y || e.onInputChange(v)
      }
      return () => {
        const {
            id: v,
            prefixCls: y,
            values: x,
            open: w,
            inputRef: F,
            placeholder: N,
            disabled: T,
            autofocus: b,
            autocomplete: E,
            activeDescendantId: C,
            tabindex: P,
            compositionStatus: L,
            onInputPaste: z,
            onInputKeyDown: B,
            onInputMouseDown: Y,
            onInputCompositionStart: U,
            onInputCompositionEnd: W
          } = e,
          G = O(
            'div',
            {
              class: `${i.value}-search`,
              style: { width: o.value + 'px' },
              key: 'input'
            },
            [
              O(
                zt,
                {
                  inputRef: F,
                  open: w,
                  prefixCls: y,
                  id: v,
                  inputElement: null,
                  disabled: T,
                  autofocus: b,
                  autocomplete: E,
                  editable: a.value,
                  activeDescendantId: C,
                  value: f.value,
                  onKeydown: B,
                  onMousedown: Y,
                  onChange: $,
                  onPaste: z,
                  onCompositionstart: U,
                  onCompositionend: W,
                  tabindex: P,
                  attrs: ot(e, !0),
                  onFocus: () => (n.value = !0),
                  onBlur: () => (n.value = !1)
                },
                null
              ),
              O(
                'span',
                {
                  ref: t,
                  class: `${i.value}-search-mirror`,
                  'aria-hidden': !0
                },
                [f.value, Qe(' ')]
              )
            ]
          ),
          K = O(
            zn,
            {
              prefixCls: `${i.value}-overflow`,
              data: x,
              renderItem: m,
              renderRest: h,
              suffix: G,
              itemKey: 'key',
              maxCount: e.maxTagCount,
              key: 'overflow'
            },
            null
          )
        return O(Pe, null, [
          K,
          !x.length &&
            !d.value &&
            !L &&
            O('span', { class: `${i.value}-placeholder` }, [N])
        ])
      }
    }
  }),
  wo = yo,
  Io = {
    inputElement: D.any,
    id: String,
    prefixCls: String,
    values: D.array,
    open: { type: Boolean, default: void 0 },
    searchValue: String,
    inputRef: D.any,
    placeholder: D.any,
    compositionStatus: { type: Boolean, default: void 0 },
    disabled: { type: Boolean, default: void 0 },
    mode: String,
    showSearch: { type: Boolean, default: void 0 },
    autofocus: { type: Boolean, default: void 0 },
    autocomplete: String,
    activeDescendantId: String,
    tabindex: D.oneOfType([D.number, D.string]),
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
  it = fe({
    name: 'SingleSelector',
    setup(e) {
      const t = q(!1),
        o = V(() => e.mode === 'combobox'),
        n = V(() => o.value || e.showSearch),
        l = V(() => {
          let r = e.searchValue || ''
          return o.value && e.activeValue && !t.value && (r = e.activeValue), r
        }),
        i = lt()
      oe(
        [o, () => e.activeValue],
        () => {
          o.value && (t.value = !1)
        },
        { immediate: !0 }
      )
      const d = V(() =>
          e.mode !== 'combobox' && !e.open && !e.showSearch
            ? !1
            : !!l.value || e.compositionStatus
        ),
        a = V(() => {
          const r = e.values[0]
          return r && (typeof r.label == 'string' || typeof r.label == 'number')
            ? r.label.toString()
            : void 0
        }),
        f = () => {
          if (e.values[0]) return null
          const r = d.value ? { visibility: 'hidden' } : void 0
          return O(
            'span',
            { class: `${e.prefixCls}-selection-placeholder`, style: r },
            [e.placeholder]
          )
        },
        s = r => {
          r.target.composing || ((t.value = !0), e.onInputChange(r))
        }
      return () => {
        var r, m, h, $
        const {
            inputElement: v,
            prefixCls: y,
            id: x,
            values: w,
            inputRef: F,
            disabled: N,
            autofocus: T,
            autocomplete: b,
            activeDescendantId: E,
            open: C,
            tabindex: P,
            optionLabelRender: L,
            onInputKeyDown: z,
            onInputMouseDown: B,
            onInputPaste: Y,
            onInputCompositionStart: U,
            onInputCompositionEnd: W
          } = e,
          G = w[0]
        let K = null
        if (G && i.customSlots) {
          const le = (r = G.key) !== null && r !== void 0 ? r : G.value,
            ae =
              ((m = i.keyEntities[le]) === null || m === void 0
                ? void 0
                : m.node) || {}
          ;(K =
            i.customSlots[
              (h = ae.slots) === null || h === void 0 ? void 0 : h.title
            ] ||
            i.customSlots.title ||
            G.label),
            typeof K == 'function' && (K = K(ae))
        } else K = L && G ? L(G.option) : G == null ? void 0 : G.label
        return O(Pe, null, [
          O('span', { class: `${y}-selection-search` }, [
            O(
              zt,
              {
                inputRef: F,
                prefixCls: y,
                id: x,
                open: C,
                inputElement: v,
                disabled: N,
                autofocus: T,
                autocomplete: b,
                editable: n.value,
                activeDescendantId: E,
                value: l.value,
                onKeydown: z,
                onMousedown: B,
                onChange: s,
                onPaste: Y,
                onCompositionstart: U,
                onCompositionend: W,
                tabindex: P,
                attrs: ot(e, !0)
              },
              null
            )
          ]),
          !o.value &&
            G &&
            !d.value &&
            O('span', { class: `${y}-selection-item`, title: a.value }, [
              O(
                Pe,
                { key: ($ = G.key) !== null && $ !== void 0 ? $ : G.value },
                [K]
              )
            ]),
          f()
        ])
      }
    }
  })
it.props = Io
it.inheritAttrs = !1
const Co = it
function xo(e) {
  return ![
    _.ESC,
    _.SHIFT,
    _.BACKSPACE,
    _.TAB,
    _.WIN_KEY,
    _.ALT,
    _.META,
    _.WIN_KEY_RIGHT,
    _.CTRL,
    _.SEMICOLON,
    _.EQUALS,
    _.CAPS_LOCK,
    _.CONTEXT_MENU,
    _.F1,
    _.F2,
    _.F3,
    _.F4,
    _.F5,
    _.F6,
    _.F7,
    _.F8,
    _.F9,
    _.F10,
    _.F11,
    _.F12
  ].includes(e)
}
function Kt() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 250,
    t = null,
    o
  Fe(() => {
    clearTimeout(o)
  })
  function n(l) {
    ;(l || t === null) && (t = l),
      clearTimeout(o),
      (o = setTimeout(() => {
        t = null
      }, e))
  }
  return [() => t, n]
}
function De() {
  const e = t => {
    e.current = t
  }
  return e
}
const Oo = fe({
    name: 'Selector',
    inheritAttrs: !1,
    props: {
      id: String,
      prefixCls: String,
      showSearch: { type: Boolean, default: void 0 },
      open: { type: Boolean, default: void 0 },
      values: D.array,
      multiple: { type: Boolean, default: void 0 },
      mode: String,
      searchValue: String,
      activeValue: String,
      inputElement: D.any,
      autofocus: { type: Boolean, default: void 0 },
      activeDescendantId: String,
      tabindex: D.oneOfType([D.number, D.string]),
      disabled: { type: Boolean, default: void 0 },
      placeholder: D.any,
      removeIcon: D.any,
      maxTagCount: D.oneOfType([D.number, D.string]),
      maxTagTextLength: Number,
      maxTagPlaceholder: D.any,
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
    setup(e, t) {
      let { expose: o } = t
      const n = De(),
        l = me(!1),
        [i, d] = Kt(0),
        a = w => {
          const { which: F } = w
          ;(F === _.UP || F === _.DOWN) && w.preventDefault(),
            e.onInputKeyDown && e.onInputKeyDown(w),
            F === _.ENTER &&
              e.mode === 'tags' &&
              !l.value &&
              !e.open &&
              e.onSearchSubmit(w.target.value),
            xo(F) && e.onToggleOpen(!0)
        },
        f = () => {
          d(!0)
        }
      let s = null
      const r = w => {
          e.onSearch(w, !0, l.value) !== !1 && e.onToggleOpen(!0)
        },
        m = () => {
          l.value = !0
        },
        h = w => {
          ;(l.value = !1), e.mode !== 'combobox' && r(w.target.value)
        },
        $ = w => {
          let {
            target: { value: F }
          } = w
          if (e.tokenWithEnter && s && /[\r\n]/.test(s)) {
            const N = s
              .replace(/[\r\n]+$/, '')
              .replace(/\r\n/g, ' ')
              .replace(/[\r\n]/g, ' ')
            F = F.replace(N, s)
          }
          ;(s = null), r(F)
        },
        v = w => {
          const { clipboardData: F } = w
          s = F.getData('text')
        },
        y = w => {
          let { target: F } = w
          F !== n.current &&
            (document.body.style.msTouchAction !== void 0
              ? setTimeout(() => {
                  n.current.focus()
                })
              : n.current.focus())
        },
        x = w => {
          const F = i()
          w.target !== n.current && !F && w.preventDefault(),
            ((e.mode !== 'combobox' && (!e.showSearch || !F)) || !e.open) &&
              (e.open && e.onSearch('', !0, !1), e.onToggleOpen())
        }
      return (
        o({
          focus: () => {
            n.current.focus()
          },
          blur: () => {
            n.current.blur()
          }
        }),
        () => {
          const { prefixCls: w, domRef: F, mode: N } = e,
            T = {
              inputRef: n,
              onInputKeyDown: a,
              onInputMouseDown: f,
              onInputChange: $,
              onInputPaste: v,
              compositionStatus: l.value,
              onInputCompositionStart: m,
              onInputCompositionEnd: h
            },
            b =
              N === 'multiple' || N === 'tags'
                ? O(wo, k(k({}, e), T), null)
                : O(Co, k(k({}, e), T), null)
          return O(
            'div',
            { ref: F, class: `${w}-selector`, onClick: y, onMousedown: x },
            [b]
          )
        }
      )
    }
  }),
  $o = Oo
function To(e, t, o) {
  function n(l) {
    var i, d, a
    let f = l.target
    f.shadowRoot && l.composed && (f = l.composedPath()[0] || f)
    const s = [
      (i = e[0]) === null || i === void 0 ? void 0 : i.value,
      (a = (d = e[1]) === null || d === void 0 ? void 0 : d.value) === null ||
      a === void 0
        ? void 0
        : a.getPopupElement()
    ]
    t.value && s.every(r => r && !r.contains(f) && r !== f) && o(!1)
  }
  Se(() => {
    window.addEventListener('mousedown', n)
  }),
    Fe(() => {
      window.removeEventListener('mousedown', n)
    })
}
function Mo() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 10
  const t = q(!1)
  let o
  const n = () => {
    clearTimeout(o)
  }
  return (
    Se(() => {
      n()
    }),
    [
      t,
      (i, d) => {
        n(),
          (o = setTimeout(() => {
            ;(t.value = i), d && d()
          }, e))
      },
      n
    ]
  )
}
const Wt = Symbol('BaseSelectContextKey')
function Eo(e) {
  return et(Wt, e)
}
function Po() {
  return Ne(Wt, {})
}
function jt(e) {
  if (!Nn(e)) return $e(e)
  const t = new Proxy(
    {},
    {
      get(o, n, l) {
        return Reflect.get(e.value, n, l)
      },
      set(o, n, l) {
        return (e.value[n] = l), !0
      },
      deleteProperty(o, n) {
        return Reflect.deleteProperty(e.value, n)
      },
      has(o, n) {
        return Reflect.has(e.value, n)
      },
      ownKeys() {
        return Object.keys(e.value)
      },
      getOwnPropertyDescriptor() {
        return { enumerable: !0, configurable: !0 }
      }
    }
  )
  return $e(t)
}
var Do =
  (globalThis && globalThis.__rest) ||
  function(e, t) {
    var o = {}
    for (var n in e)
      Object.prototype.hasOwnProperty.call(e, n) &&
        t.indexOf(n) < 0 &&
        (o[n] = e[n])
    if (e != null && typeof Object.getOwnPropertySymbols == 'function')
      for (var l = 0, n = Object.getOwnPropertySymbols(e); l < n.length; l++)
        t.indexOf(n[l]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(e, n[l]) &&
          (o[n[l]] = e[n[l]])
    return o
  }
const Fo = [
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
  Ro = () => ({
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
    OptionList: D.any,
    emptyOptions: Boolean
  }),
  Ut = () => ({
    showSearch: { type: Boolean, default: void 0 },
    tagRender: { type: Function },
    optionLabelRender: { type: Function },
    direction: { type: String },
    tabindex: Number,
    autofocus: Boolean,
    notFoundContent: D.any,
    placeholder: D.any,
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
    maxTagPlaceholder: D.any,
    tokenSeparators: { type: Array },
    allowClear: { type: Boolean, default: void 0 },
    showArrow: { type: Boolean, default: void 0 },
    inputIcon: D.any,
    clearIcon: D.any,
    removeIcon: D.any,
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
  Vo = () => S(S({}, Ro()), Ut())
function Gt(e) {
  return e === 'tags' || e === 'multiple'
}
const Ho = fe({
    compatConfig: { MODE: 3 },
    name: 'BaseSelect',
    inheritAttrs: !1,
    props: nt(Vo(), { showAction: [], notFoundContent: 'Not Found' }),
    setup(e, t) {
      let { attrs: o, expose: n, slots: l } = t
      const i = V(() => Gt(e.mode)),
        d = V(() =>
          e.showSearch !== void 0
            ? e.showSearch
            : i.value || e.mode === 'combobox'
        ),
        a = q(!1)
      Se(() => {
        a.value = Kn()
      })
      const f = lt(),
        s = q(null),
        r = De(),
        m = q(null),
        h = q(null),
        $ = q(null),
        v = me(!1),
        [y, x, w] = Mo()
      n({
        focus: () => {
          var u
          ;(u = h.value) === null || u === void 0 || u.focus()
        },
        blur: () => {
          var u
          ;(u = h.value) === null || u === void 0 || u.blur()
        },
        scrollTo: u => {
          var c
          return (c = $.value) === null || c === void 0 ? void 0 : c.scrollTo(u)
        }
      })
      const T = V(() => {
          var u
          if (e.mode !== 'combobox') return e.searchValue
          const c =
            (u = e.displayValues[0]) === null || u === void 0 ? void 0 : u.value
          return typeof c == 'string' || typeof c == 'number' ? String(c) : ''
        }),
        b = e.open !== void 0 ? e.open : e.defaultOpen,
        E = q(b),
        C = q(b),
        P = u => {
          ;(E.value = e.open !== void 0 ? e.open : u), (C.value = E.value)
        }
      oe(
        () => e.open,
        () => {
          P(e.open)
        }
      )
      const L = V(() => !e.notFoundContent && e.emptyOptions)
      Oe(() => {
        ;(C.value = E.value),
          (e.disabled || (L.value && C.value && e.mode === 'combobox')) &&
            (C.value = !1)
      })
      const z = V(() => (L.value ? !1 : C.value)),
        B = u => {
          const c = u !== void 0 ? u : !C.value
          C.value !== c &&
            !e.disabled &&
            (P(c),
            e.onDropdownVisibleChange && e.onDropdownVisibleChange(c),
            !c &&
              H.value &&
              ((H.value = !1),
              x(!1, () => {
                ;(R.value = !1), (v.value = !1)
              })))
        },
        Y = V(() =>
          (e.tokenSeparators || []).some(u =>
            [
              `
`,
              `\r
`
            ].includes(u)
          )
        ),
        U = (u, c, M) => {
          var I, j
          let Z = !0,
            Q = u
          ;(I = e.onActiveValueChange) === null ||
            I === void 0 ||
            I.call(e, null)
          const te = M ? null : ao(u, e.tokenSeparators)
          return (
            e.mode !== 'combobox' &&
              te &&
              ((Q = ''),
              (j = e.onSearchSplit) === null || j === void 0 || j.call(e, te),
              B(!1),
              (Z = !1)),
            e.onSearch &&
              T.value !== Q &&
              e.onSearch(Q, { source: c ? 'typing' : 'effect' }),
            Z
          )
        },
        W = u => {
          var c
          !u ||
            !u.trim() ||
            (c = e.onSearch) === null ||
            c === void 0 ||
            c.call(e, u, { source: 'submit' })
        }
      oe(
        C,
        () => {
          !C.value && !i.value && e.mode !== 'combobox' && U('', !1, !1)
        },
        { immediate: !0, flush: 'post' }
      ),
        oe(
          () => e.disabled,
          () => {
            E.value && e.disabled && P(!1), e.disabled && !v.value && x(!1)
          },
          { immediate: !0 }
        )
      const [G, K] = Kt(),
        le = function(u) {
          var c
          const M = G(),
            { which: I } = u
          if (
            (I === _.ENTER &&
              (e.mode !== 'combobox' && u.preventDefault(), C.value || B(!0)),
            K(!!T.value),
            I === _.BACKSPACE &&
              !M &&
              i.value &&
              !T.value &&
              e.displayValues.length)
          ) {
            const te = [...e.displayValues]
            let X = null
            for (let ie = te.length - 1; ie >= 0; ie -= 1) {
              const se = te[ie]
              if (!se.disabled) {
                te.splice(ie, 1), (X = se)
                break
              }
            }
            X && e.onDisplayValuesChange(te, { type: 'remove', values: [X] })
          }
          for (
            var j = arguments.length, Z = new Array(j > 1 ? j - 1 : 0), Q = 1;
            Q < j;
            Q++
          )
            Z[Q - 1] = arguments[Q]
          C.value && $.value && $.value.onKeydown(u, ...Z),
            (c = e.onKeydown) === null || c === void 0 || c.call(e, u, ...Z)
        },
        ae = function(u) {
          for (
            var c = arguments.length, M = new Array(c > 1 ? c - 1 : 0), I = 1;
            I < c;
            I++
          )
            M[I - 1] = arguments[I]
          C.value && $.value && $.value.onKeyup(u, ...M),
            e.onKeyup && e.onKeyup(u, ...M)
        },
        p = u => {
          const c = e.displayValues.filter(M => M !== u)
          e.onDisplayValuesChange(c, { type: 'remove', values: [u] })
        },
        R = q(!1),
        A = function() {
          x(!0),
            e.disabled ||
              (e.onFocus && !R.value && e.onFocus(...arguments),
              e.showAction && e.showAction.includes('focus') && B(!0)),
            (R.value = !0)
        },
        H = me(!1),
        J = function() {
          if (
            H.value ||
            ((v.value = !0),
            x(!1, () => {
              ;(R.value = !1), (v.value = !1), B(!1)
            }),
            e.disabled)
          )
            return
          const u = T.value
          u &&
            (e.mode === 'tags'
              ? e.onSearch(u, { source: 'submit' })
              : e.mode === 'multiple' && e.onSearch('', { source: 'blur' })),
            e.onBlur && e.onBlur(...arguments)
        },
        ne = () => {
          H.value = !0
        },
        re = () => {
          H.value = !1
        }
      et('VCSelectContainerEvent', { focus: A, blur: J })
      const ee = []
      Se(() => {
        ee.forEach(u => clearTimeout(u)), ee.splice(0, ee.length)
      }),
        Fe(() => {
          ee.forEach(u => clearTimeout(u)), ee.splice(0, ee.length)
        })
      const ce = function(u) {
          var c, M
          const { target: I } = u,
            j =
              (c = m.value) === null || c === void 0
                ? void 0
                : c.getPopupElement()
          if (j && j.contains(I)) {
            const X = setTimeout(() => {
              var ie
              const se = ee.indexOf(X)
              se !== -1 && ee.splice(se, 1),
                w(),
                !a.value &&
                  !j.contains(document.activeElement) &&
                  ((ie = h.value) === null || ie === void 0 || ie.focus())
            })
            ee.push(X)
          }
          for (
            var Z = arguments.length, Q = new Array(Z > 1 ? Z - 1 : 0), te = 1;
            te < Z;
            te++
          )
            Q[te - 1] = arguments[te]
          ;(M = e.onMousedown) === null || M === void 0 || M.call(e, u, ...Q)
        },
        de = q(null),
        g = () => {}
      return (
        Se(() => {
          oe(
            z,
            () => {
              var u
              if (z.value) {
                const c = Math.ceil(
                  (u = s.value) === null || u === void 0
                    ? void 0
                    : u.offsetWidth
                )
                de.value !== c && !Number.isNaN(c) && (de.value = c)
              }
            },
            { immediate: !0, flush: 'post' }
          )
        }),
        To([s, m], z, B),
        Eo(
          jt(
            S(S({}, Ln(e)), {
              open: C,
              triggerOpen: z,
              showSearch: d,
              multiple: i,
              toggleOpen: B
            })
          )
        ),
        () => {
          const u = S(S({}, e), o),
            {
              prefixCls: c,
              id: M,
              open: I,
              defaultOpen: j,
              mode: Z,
              showSearch: Q,
              searchValue: te,
              onSearch: X,
              allowClear: ie,
              clearIcon: se,
              showArrow: Re,
              inputIcon: Ae,
              disabled: Ie,
              loading: Ce,
              getInputElement: ct,
              getPopupContainer: en,
              placement: tn,
              animation: nn,
              transitionName: on,
              dropdownStyle: ln,
              dropdownClassName: an,
              dropdownMatchSelectWidth: rn,
              dropdownRender: sn,
              dropdownAlign: un,
              showAction: Wl,
              direction: cn,
              tokenSeparators: jl,
              tagRender: dn,
              optionLabelRender: fn,
              onPopupScroll: Ul,
              onDropdownVisibleChange: Gl,
              onFocus: Yl,
              onBlur: Xl,
              onKeyup: ql,
              onKeydown: Ql,
              onMousedown: Zl,
              onClear: ze,
              omitDomProps: Ke,
              getRawInputElement: dt,
              displayValues: Ve,
              onDisplayValuesChange: pn,
              emptyOptions: mn,
              activeDescendantId: gn,
              activeValue: vn,
              OptionList: hn
            } = u,
            bn = Do(u, [
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
            ft = (Z === 'combobox' && ct && ct()) || null,
            Te = typeof dt == 'function' && dt(),
            We = S({}, bn)
          let pt
          Te &&
            (pt = we => {
              B(we)
            }),
            Fo.forEach(we => {
              delete We[we]
            }),
            Ke == null ||
              Ke.forEach(we => {
                delete We[we]
              })
          const mt = Re !== void 0 ? Re : Ce || (!i.value && Z !== 'combobox')
          let gt
          mt &&
            (gt = O(
              He,
              {
                class: ue(`${c}-arrow`, { [`${c}-arrow-loading`]: Ce }),
                customizeIcon: Ae,
                customizeIconProps: {
                  loading: Ce,
                  searchValue: T.value,
                  open: C.value,
                  focused: y.value,
                  showSearch: d.value
                }
              },
              null
            ))
          let vt
          const Sn = () => {
            ze == null || ze(),
              pn([], { type: 'clear', values: Ve }),
              U('', !1, !1)
          }
          !Ie &&
            ie &&
            (Ve.length || T.value) &&
            (vt = O(
              He,
              { class: `${c}-clear`, onMousedown: Sn, customizeIcon: se },
              { default: () => [Qe('×')] }
            ))
          const yn = O(
              hn,
              { ref: $ },
              S(S({}, f.customSlots), { option: l.option })
            ),
            wn = ue(c, o.class, {
              [`${c}-focused`]: y.value,
              [`${c}-multiple`]: i.value,
              [`${c}-single`]: !i.value,
              [`${c}-allow-clear`]: ie,
              [`${c}-show-arrow`]: mt,
              [`${c}-disabled`]: Ie,
              [`${c}-loading`]: Ce,
              [`${c}-open`]: C.value,
              [`${c}-customize-input`]: ft,
              [`${c}-show-search`]: d.value
            }),
            ht = O(
              co,
              {
                ref: m,
                disabled: Ie,
                prefixCls: c,
                visible: z.value,
                popupElement: yn,
                containerWidth: de.value,
                animation: nn,
                transitionName: on,
                dropdownStyle: ln,
                dropdownClassName: an,
                direction: cn,
                dropdownMatchSelectWidth: rn,
                dropdownRender: sn,
                dropdownAlign: un,
                placement: tn,
                getPopupContainer: en,
                empty: mn,
                getTriggerDOMNode: () => r.current,
                onPopupVisibleChange: pt,
                onPopupMouseEnter: g,
                onPopupFocusin: ne,
                onPopupFocusout: re
              },
              {
                default: () =>
                  Te
                    ? Je(Te) && _t(Te, { ref: r }, !1, !0)
                    : O(
                        $o,
                        k(
                          k({}, e),
                          {},
                          {
                            domRef: r,
                            prefixCls: c,
                            inputElement: ft,
                            ref: h,
                            id: M,
                            showSearch: d.value,
                            mode: Z,
                            activeDescendantId: gn,
                            tagRender: dn,
                            optionLabelRender: fn,
                            values: Ve,
                            open: C.value,
                            onToggleOpen: B,
                            activeValue: vn,
                            searchValue: T.value,
                            onSearch: U,
                            onSearchSubmit: W,
                            onRemove: p,
                            tokenWithEnter: Y.value
                          }
                        ),
                        null
                      )
              }
            )
          let je
          return (
            Te
              ? (je = ht)
              : (je = O(
                  'div',
                  k(
                    k({}, We),
                    {},
                    {
                      class: wn,
                      ref: s,
                      onMousedown: ce,
                      onKeydown: le,
                      onKeyup: ae
                    }
                  ),
                  [
                    y.value &&
                      !C.value &&
                      O(
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
                          `${Ve.map(we => {
                            let { label: bt, value: In } = we
                            return ['number', 'string'].includes(typeof bt)
                              ? bt
                              : In
                          }).join(', ')}`
                        ]
                      ),
                    ht,
                    gt,
                    vt
                  ]
                )),
            je
          )
        }
      )
    }
  }),
  _e = (e, t) => {
    let { height: o, offset: n, prefixCls: l, onInnerResize: i } = e,
      { slots: d } = t
    var a
    let f = {},
      s = { display: 'flex', flexDirection: 'column' }
    return (
      n !== void 0 &&
        ((f = { height: `${o}px`, position: 'relative', overflow: 'hidden' }),
        (s = S(S({}, s), {
          transform: `translateY(${n}px)`,
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0
        }))),
      O('div', { style: f }, [
        O(
          Wn,
          {
            onResize: r => {
              let { offsetHeight: m } = r
              m && i && i()
            }
          },
          {
            default: () => [
              O('div', { style: s, class: ue({ [`${l}-holder-inner`]: l }) }, [
                (a = d.default) === null || a === void 0 ? void 0 : a.call(d)
              ])
            ]
          }
        )
      ])
    )
  }
_e.displayName = 'Filter'
_e.inheritAttrs = !1
_e.props = {
  prefixCls: String,
  height: Number,
  offset: Number,
  onInnerResize: Function
}
const No = _e,
  Yt = (e, t) => {
    let { setRef: o } = e,
      { slots: n } = t
    var l
    const i = Ht((l = n.default) === null || l === void 0 ? void 0 : l.call(n))
    return i && i.length ? Bt(i[0], { ref: o }) : i
  }
Yt.props = { setRef: { type: Function, default: () => {} } }
const Lo = Yt,
  Bo = 20
function Tt(e) {
  return 'touches' in e ? e.touches[0].pageY : e.pageY
}
const _o = fe({
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
      scrollbarRef: De(),
      thumbRef: De(),
      visibleTimeout: null,
      state: $e({ dragging: !1, pageY: null, startTop: null, visible: !1 })
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
    var e, t
    ;(e = this.scrollbarRef.current) === null ||
      e === void 0 ||
      e.addEventListener(
        'touchstart',
        this.onScrollbarTouchStart,
        he ? { passive: !1 } : !1
      ),
      (t = this.thumbRef.current) === null ||
        t === void 0 ||
        t.addEventListener(
          'touchstart',
          this.onMouseDown,
          he ? { passive: !1 } : !1
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
          he ? { passive: !1 } : !1
        ),
        this.thumbRef.current.addEventListener('touchend', this.onMouseUp)
    },
    removeEvents() {
      window.removeEventListener('mousemove', this.onMouseMove),
        window.removeEventListener('mouseup', this.onMouseUp),
        this.scrollbarRef.current.removeEventListener(
          'touchstart',
          this.onScrollbarTouchStart,
          he ? { passive: !1 } : !1
        ),
        this.thumbRef.current &&
          (this.thumbRef.current.removeEventListener(
            'touchstart',
            this.onMouseDown,
            he ? { passive: !1 } : !1
          ),
          this.thumbRef.current.removeEventListener(
            'touchmove',
            this.onMouseMove,
            he ? { passive: !1 } : !1
          ),
          this.thumbRef.current.removeEventListener(
            'touchend',
            this.onMouseUp
          )),
        ge.cancel(this.moveRaf)
    },
    onMouseDown(e) {
      const { onStartMove: t } = this.$props
      S(this.state, { dragging: !0, pageY: Tt(e), startTop: this.getTop() }),
        t(),
        this.patchEvents(),
        e.stopPropagation(),
        e.preventDefault()
    },
    onMouseMove(e) {
      const { dragging: t, pageY: o, startTop: n } = this.state,
        { onScroll: l } = this.$props
      if ((ge.cancel(this.moveRaf), t)) {
        const i = Tt(e) - o,
          d = n + i,
          a = this.getEnableScrollRange(),
          f = this.getEnableHeightRange(),
          s = f ? d / f : 0,
          r = Math.ceil(s * a)
        this.moveRaf = ge(() => {
          l(r)
        })
      }
    },
    onMouseUp() {
      const { onStopMove: e } = this.$props
      ;(this.state.dragging = !1), e(), this.removeEvents()
    },
    getSpinHeight() {
      const { height: e, scrollHeight: t } = this.$props
      let o = (e / t) * 100
      return (o = Math.max(o, Bo)), (o = Math.min(o, e / 2)), Math.floor(o)
    },
    getEnableScrollRange() {
      const { scrollHeight: e, height: t } = this.$props
      return e - t || 0
    },
    getEnableHeightRange() {
      const { height: e } = this.$props,
        t = this.getSpinHeight()
      return e - t || 0
    },
    getTop() {
      const { scrollTop: e } = this.$props,
        t = this.getEnableScrollRange(),
        o = this.getEnableHeightRange()
      return e === 0 || t === 0 ? 0 : (e / t) * o
    },
    showScroll() {
      const { height: e, scrollHeight: t } = this.$props
      return t > e
    }
  },
  render() {
    const { dragging: e, visible: t } = this.state,
      { prefixCls: o } = this.$props,
      n = this.getSpinHeight() + 'px',
      l = this.getTop() + 'px',
      i = this.showScroll(),
      d = i && t
    return O(
      'div',
      {
        ref: this.scrollbarRef,
        class: ue(`${o}-scrollbar`, { [`${o}-scrollbar-show`]: i }),
        style: {
          width: '8px',
          top: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: d ? void 0 : 'none'
        },
        onMousedown: this.onContainerMouseDown,
        onMousemove: this.delayHidden
      },
      [
        O(
          'div',
          {
            ref: this.thumbRef,
            class: ue(`${o}-scrollbar-thumb`, {
              [`${o}-scrollbar-thumb-moving`]: e
            }),
            style: {
              width: '100%',
              height: n,
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
function Ao(e, t, o, n) {
  const l = new Map(),
    i = new Map(),
    d = me(Symbol('update'))
  oe(e, () => {
    d.value = Symbol('update')
  })
  let a
  function f() {
    ge.cancel(a)
  }
  function s() {
    f(),
      (a = ge(() => {
        l.forEach((m, h) => {
          if (m && m.offsetParent) {
            const { offsetHeight: $ } = m
            i.get(h) !== $ &&
              ((d.value = Symbol('update')), i.set(h, m.offsetHeight))
          }
        })
      }))
  }
  function r(m, h) {
    const $ = t(m),
      v = l.get($)
    h ? (l.set($, h.$el || h), s()) : l.delete($),
      !v != !h && (h ? o == null || o(m) : n == null || n(m))
  }
  return (
    Bn(() => {
      f()
    }),
    [r, s, i, d]
  )
}
function zo(e, t, o, n, l, i, d, a) {
  let f
  return s => {
    if (s == null) {
      a()
      return
    }
    ge.cancel(f)
    const r = t.value,
      m = n.itemHeight
    if (typeof s == 'number') d(s)
    else if (s && typeof s == 'object') {
      let h
      const { align: $ } = s
      'index' in s ? ({ index: h } = s) : (h = r.findIndex(x => l(x) === s.key))
      const { offset: v = 0 } = s,
        y = (x, w) => {
          if (x < 0 || !e.value) return
          const F = e.value.clientHeight
          let N = !1,
            T = w
          if (F) {
            const b = w || $
            let E = 0,
              C = 0,
              P = 0
            const L = Math.min(r.length, h)
            for (let Y = 0; Y <= L; Y += 1) {
              const U = l(r[Y])
              C = E
              const W = o.get(U)
              ;(P = C + (W === void 0 ? m : W)),
                (E = P),
                Y === h && W === void 0 && (N = !0)
            }
            const z = e.value.scrollTop
            let B = null
            switch (b) {
              case 'top':
                B = C - v
                break
              case 'bottom':
                B = P - F + v
                break
              default: {
                const Y = z + F
                C < z ? (T = 'top') : P > Y && (T = 'bottom')
              }
            }
            B !== null && B !== z && d(B)
          }
          f = ge(() => {
            N && i(), y(x - 1, T)
          }, 2)
        }
      y(5)
    }
  }
}
const Ko = typeof navigator == 'object' && /Firefox/i.test(navigator.userAgent),
  Wo = Ko,
  Xt = (e, t) => {
    let o = !1,
      n = null
    function l() {
      clearTimeout(n),
        (o = !0),
        (n = setTimeout(() => {
          o = !1
        }, 50))
    }
    return function(i) {
      let d =
        arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1
      const a = (i < 0 && e.value) || (i > 0 && t.value)
      return d && a ? (clearTimeout(n), (o = !1)) : (!a || o) && l(), !o && a
    }
  }
function jo(e, t, o, n) {
  let l = 0,
    i = null,
    d = null,
    a = !1
  const f = Xt(t, o)
  function s(m) {
    if (!e.value) return
    ge.cancel(i)
    const { deltaY: h } = m
    ;(l += h),
      (d = h),
      !f(h) &&
        (Wo || m.preventDefault(),
        (i = ge(() => {
          n(l * (a ? 10 : 1)), (l = 0)
        })))
  }
  function r(m) {
    e.value && (a = m.detail === d)
  }
  return [s, r]
}
const Uo = 14 / 15
function Go(e, t, o) {
  let n = !1,
    l = 0,
    i = null,
    d = null
  const a = () => {
      i &&
        (i.removeEventListener('touchmove', f),
        i.removeEventListener('touchend', s))
    },
    f = h => {
      if (n) {
        const $ = Math.ceil(h.touches[0].pageY)
        let v = l - $
        ;(l = $),
          o(v) && h.preventDefault(),
          clearInterval(d),
          (d = setInterval(() => {
            ;(v *= Uo), (!o(v, !0) || Math.abs(v) <= 0.1) && clearInterval(d)
          }, 16))
      }
    },
    s = () => {
      ;(n = !1), a()
    },
    r = h => {
      a(),
        h.touches.length === 1 &&
          !n &&
          ((n = !0),
          (l = Math.ceil(h.touches[0].pageY)),
          (i = h.target),
          i.addEventListener('touchmove', f, { passive: !1 }),
          i.addEventListener('touchend', s))
    },
    m = () => {}
  Se(() => {
    document.addEventListener('touchmove', m, { passive: !1 }),
      oe(
        e,
        h => {
          t.value.removeEventListener('touchstart', r),
            a(),
            clearInterval(d),
            h && t.value.addEventListener('touchstart', r, { passive: !1 })
        },
        { immediate: !0 }
      )
  }),
    Fe(() => {
      document.removeEventListener('touchmove', m)
    })
}
var Yo =
  (globalThis && globalThis.__rest) ||
  function(e, t) {
    var o = {}
    for (var n in e)
      Object.prototype.hasOwnProperty.call(e, n) &&
        t.indexOf(n) < 0 &&
        (o[n] = e[n])
    if (e != null && typeof Object.getOwnPropertySymbols == 'function')
      for (var l = 0, n = Object.getOwnPropertySymbols(e); l < n.length; l++)
        t.indexOf(n[l]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(e, n[l]) &&
          (o[n[l]] = e[n[l]])
    return o
  }
const Xo = [],
  qo = { overflowY: 'auto', overflowAnchor: 'none' }
function Qo(e, t, o, n, l, i) {
  let { getKey: d } = i
  return e.slice(t, o + 1).map((a, f) => {
    const s = t + f,
      r = l(a, s, {}),
      m = d(a)
    return O(Lo, { key: m, setRef: h => n(a, h) }, { default: () => [r] })
  })
}
const Zo = fe({
    compatConfig: { MODE: 3 },
    name: 'List',
    inheritAttrs: !1,
    props: {
      prefixCls: String,
      data: D.array,
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
    setup(e, t) {
      let { expose: o } = t
      const n = V(() => {
          const { height: p, itemHeight: R, virtual: A } = e
          return !!(A !== !1 && p && R)
        }),
        l = V(() => {
          const { height: p, itemHeight: R, data: A } = e
          return n.value && A && R * A.length > p
        }),
        i = $e({ scrollTop: 0, scrollMoving: !1 }),
        d = V(() => e.data || Xo),
        a = q([])
      oe(
        d,
        () => {
          a.value = tt(d.value).slice()
        },
        { immediate: !0 }
      )
      const f = q(p => {})
      oe(
        () => e.itemKey,
        p => {
          typeof p == 'function'
            ? (f.value = p)
            : (f.value = R => (R == null ? void 0 : R[p]))
        },
        { immediate: !0 }
      )
      const s = q(),
        r = q(),
        m = q(),
        h = p => f.value(p),
        $ = { getKey: h }
      function v(p) {
        let R
        typeof p == 'function' ? (R = p(i.scrollTop)) : (R = p)
        const A = E(R)
        s.value && (s.value.scrollTop = A), (i.scrollTop = A)
      }
      const [y, x, w, F] = Ao(a, h, null, null),
        N = $e({ scrollHeight: void 0, start: 0, end: 0, offset: void 0 }),
        T = q(0)
      Se(() => {
        Ee(() => {
          var p
          T.value =
            ((p = r.value) === null || p === void 0
              ? void 0
              : p.offsetHeight) || 0
        })
      }),
        _n(() => {
          Ee(() => {
            var p
            T.value =
              ((p = r.value) === null || p === void 0
                ? void 0
                : p.offsetHeight) || 0
          })
        }),
        oe(
          [n, a],
          () => {
            n.value ||
              S(N, {
                scrollHeight: void 0,
                start: 0,
                end: a.value.length - 1,
                offset: void 0
              })
          },
          { immediate: !0 }
        ),
        oe(
          [n, a, T, l],
          () => {
            n.value &&
              !l.value &&
              S(N, {
                scrollHeight: T.value,
                start: 0,
                end: a.value.length - 1,
                offset: void 0
              }),
              s.value && (i.scrollTop = s.value.scrollTop)
          },
          { immediate: !0 }
        ),
        oe(
          [l, n, () => i.scrollTop, a, F, () => e.height, T],
          () => {
            if (!n.value || !l.value) return
            let p = 0,
              R,
              A,
              H
            const J = a.value.length,
              ne = a.value,
              re = i.scrollTop,
              { itemHeight: ee, height: ce } = e,
              de = re + ce
            for (let g = 0; g < J; g += 1) {
              const u = ne[g],
                c = h(u)
              let M = w.get(c)
              M === void 0 && (M = ee)
              const I = p + M
              R === void 0 && I >= re && ((R = g), (A = p)),
                H === void 0 && I > de && (H = g),
                (p = I)
            }
            R === void 0 && ((R = 0), (A = 0), (H = Math.ceil(ce / ee))),
              H === void 0 && (H = J - 1),
              (H = Math.min(H + 1, J)),
              S(N, { scrollHeight: p, start: R, end: H, offset: A })
          },
          { immediate: !0 }
        )
      const b = V(() => N.scrollHeight - e.height)
      function E(p) {
        let R = p
        return (
          Number.isNaN(b.value) || (R = Math.min(R, b.value)),
          (R = Math.max(R, 0)),
          R
        )
      }
      const C = V(() => i.scrollTop <= 0),
        P = V(() => i.scrollTop >= b.value),
        L = Xt(C, P)
      function z(p) {
        v(p)
      }
      function B(p) {
        var R
        const { scrollTop: A } = p.currentTarget
        A !== i.scrollTop && v(A),
          (R = e.onScroll) === null || R === void 0 || R.call(e, p)
      }
      const [Y, U] = jo(n, C, P, p => {
        v(R => R + p)
      })
      Go(n, s, (p, R) =>
        L(p, R) ? !1 : (Y({ preventDefault() {}, deltaY: p }), !0)
      )
      function W(p) {
        n.value && p.preventDefault()
      }
      const G = () => {
        s.value &&
          (s.value.removeEventListener('wheel', Y, he ? { passive: !1 } : !1),
          s.value.removeEventListener('DOMMouseScroll', U),
          s.value.removeEventListener('MozMousePixelScroll', W))
      }
      Oe(() => {
        Ee(() => {
          s.value &&
            (G(),
            s.value.addEventListener('wheel', Y, he ? { passive: !1 } : !1),
            s.value.addEventListener('DOMMouseScroll', U),
            s.value.addEventListener('MozMousePixelScroll', W))
        })
      }),
        Fe(() => {
          G()
        })
      const K = zo(s, a, w, e, h, x, v, () => {
        var p
        ;(p = m.value) === null || p === void 0 || p.delayHidden()
      })
      o({ scrollTo: K })
      const le = V(() => {
        let p = null
        return (
          e.height &&
            ((p = S(
              { [e.fullHeight ? 'height' : 'maxHeight']: e.height + 'px' },
              qo
            )),
            n.value &&
              ((p.overflowY = 'hidden'),
              i.scrollMoving && (p.pointerEvents = 'none'))),
          p
        )
      })
      return (
        oe(
          [() => N.start, () => N.end, a],
          () => {
            if (e.onVisibleChange) {
              const p = a.value.slice(N.start, N.end + 1)
              e.onVisibleChange(p, a.value)
            }
          },
          { flush: 'post' }
        ),
        {
          state: i,
          mergedData: a,
          componentStyle: le,
          onFallbackScroll: B,
          onScrollBar: z,
          componentRef: s,
          useVirtual: n,
          calRes: N,
          collectHeight: x,
          setInstance: y,
          sharedConfig: $,
          scrollBarRef: m,
          fillerInnerRef: r,
          delayHideScrollBar: () => {
            var p
            ;(p = m.value) === null || p === void 0 || p.delayHidden()
          }
        }
      )
    },
    render() {
      const e = S(S({}, this.$props), this.$attrs),
        {
          prefixCls: t = 'rc-virtual-list',
          height: o,
          itemHeight: n,
          fullHeight: l,
          data: i,
          itemKey: d,
          virtual: a,
          component: f = 'div',
          onScroll: s,
          children: r = this.$slots.default,
          style: m,
          class: h
        } = e,
        $ = Yo(e, [
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
        v = ue(t, h),
        { scrollTop: y } = this.state,
        { scrollHeight: x, offset: w, start: F, end: N } = this.calRes,
        {
          componentStyle: T,
          onFallbackScroll: b,
          onScrollBar: E,
          useVirtual: C,
          collectHeight: P,
          sharedConfig: L,
          setInstance: z,
          mergedData: B,
          delayHideScrollBar: Y
        } = this
      return O(
        'div',
        k({ style: S(S({}, m), { position: 'relative' }), class: v }, $),
        [
          O(
            f,
            {
              class: `${t}-holder`,
              style: T,
              ref: 'componentRef',
              onScroll: b,
              onMouseenter: Y
            },
            {
              default: () => [
                O(
                  No,
                  {
                    prefixCls: t,
                    height: x,
                    offset: w,
                    onInnerResize: P,
                    ref: 'fillerInnerRef'
                  },
                  { default: () => Qo(B, F, N, z, r, L) }
                )
              ]
            }
          ),
          C &&
            O(
              _o,
              {
                ref: 'scrollBarRef',
                prefixCls: t,
                scrollTop: y,
                height: o,
                scrollHeight: x,
                count: B.length,
                onScroll: E,
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
  Jo = Zo
function ko(e, t, o) {
  const n = me(e())
  return (
    oe(t, (l, i) => {
      o ? o(l, i) && (n.value = e()) : (n.value = e())
    }),
    n
  )
}
function el() {
  return /(mac\sos|macintosh)/i.test(navigator.appVersion)
}
const qt = Symbol('SelectContextKey')
function tl(e) {
  return et(qt, e)
}
function nl() {
  return Ne(qt, {})
}
var ol =
  (globalThis && globalThis.__rest) ||
  function(e, t) {
    var o = {}
    for (var n in e)
      Object.prototype.hasOwnProperty.call(e, n) &&
        t.indexOf(n) < 0 &&
        (o[n] = e[n])
    if (e != null && typeof Object.getOwnPropertySymbols == 'function')
      for (var l = 0, n = Object.getOwnPropertySymbols(e); l < n.length; l++)
        t.indexOf(n[l]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(e, n[l]) &&
          (o[n[l]] = e[n[l]])
    return o
  }
function Mt(e) {
  return typeof e == 'string' || typeof e == 'number'
}
const ll = fe({
    compatConfig: { MODE: 3 },
    name: 'OptionList',
    inheritAttrs: !1,
    setup(e, t) {
      let { expose: o, slots: n } = t
      const l = Po(),
        i = nl(),
        d = V(() => `${l.prefixCls}-item`),
        a = ko(
          () => i.flattenOptions,
          [() => l.open, () => i.flattenOptions],
          b => b[0]
        ),
        f = De(),
        s = b => {
          b.preventDefault()
        },
        r = b => {
          f.current &&
            f.current.scrollTo(typeof b == 'number' ? { index: b } : b)
        },
        m = function(b) {
          let E =
            arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1
          const C = a.value.length
          for (let P = 0; P < C; P += 1) {
            const L = (b + P * E + C) % C,
              { group: z, data: B } = a.value[L]
            if (!z && !B.disabled) return L
          }
          return -1
        },
        h = $e({ activeIndex: m(0) }),
        $ = function(b) {
          let E =
            arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1
          h.activeIndex = b
          const C = { source: E ? 'keyboard' : 'mouse' },
            P = a.value[b]
          if (!P) {
            i.onActiveValue(null, -1, C)
            return
          }
          i.onActiveValue(P.value, b, C)
        }
      oe(
        [() => a.value.length, () => l.searchValue],
        () => {
          $(i.defaultActiveFirstOption !== !1 ? m(0) : -1)
        },
        { immediate: !0 }
      )
      const v = b => i.rawValues.has(b) && l.mode !== 'combobox'
      oe(
        [() => l.open, () => l.searchValue],
        () => {
          if (!l.multiple && l.open && i.rawValues.size === 1) {
            const b = Array.from(i.rawValues)[0],
              E = tt(a.value).findIndex(C => {
                let { data: P } = C
                return P[i.fieldNames.value] === b
              })
            E !== -1 &&
              ($(E),
              Ee(() => {
                r(E)
              }))
          }
          l.open &&
            Ee(() => {
              var b
              ;(b = f.current) === null || b === void 0 || b.scrollTo(void 0)
            })
        },
        { immediate: !0, flush: 'post' }
      )
      const y = b => {
          b !== void 0 && i.onSelect(b, { selected: !i.rawValues.has(b) }),
            l.multiple || l.toggleOpen(!1)
        },
        x = b => (typeof b.label == 'function' ? b.label() : b.label)
      function w(b) {
        const E = a.value[b]
        if (!E) return null
        const C = E.data || {},
          { value: P } = C,
          { group: L } = E,
          z = ot(C, !0),
          B = x(E)
        return E
          ? O(
              'div',
              k(
                k({ 'aria-label': typeof B == 'string' && !L ? B : null }, z),
                {},
                {
                  key: b,
                  role: L ? 'presentation' : 'option',
                  id: `${l.id}_list_${b}`,
                  'aria-selected': v(P)
                }
              ),
              [P]
            )
          : null
      }
      return (
        o({
          onKeydown: b => {
            const { which: E, ctrlKey: C } = b
            switch (E) {
              case _.N:
              case _.P:
              case _.UP:
              case _.DOWN: {
                let P = 0
                if (
                  (E === _.UP
                    ? (P = -1)
                    : E === _.DOWN
                    ? (P = 1)
                    : el() &&
                      C &&
                      (E === _.N ? (P = 1) : E === _.P && (P = -1)),
                  P !== 0)
                ) {
                  const L = m(h.activeIndex + P, P)
                  r(L), $(L, !0)
                }
                break
              }
              case _.ENTER: {
                const P = a.value[h.activeIndex]
                P && !P.data.disabled ? y(P.value) : y(void 0),
                  l.open && b.preventDefault()
                break
              }
              case _.ESC:
                l.toggleOpen(!1), l.open && b.stopPropagation()
            }
          },
          onKeyup: () => {},
          scrollTo: b => {
            r(b)
          }
        }),
        () => {
          const { id: b, notFoundContent: E, onPopupScroll: C } = l,
            {
              menuItemSelectedIcon: P,
              fieldNames: L,
              virtual: z,
              listHeight: B,
              listItemHeight: Y
            } = i,
            U = n.option,
            { activeIndex: W } = h,
            G = Object.keys(L).map(K => L[K])
          return a.value.length === 0
            ? O(
                'div',
                {
                  role: 'listbox',
                  id: `${b}_list`,
                  class: `${d.value}-empty`,
                  onMousedown: s
                },
                [E]
              )
            : O(Pe, null, [
                O(
                  'div',
                  {
                    role: 'listbox',
                    id: `${b}_list`,
                    style: { height: 0, width: 0, overflow: 'hidden' }
                  },
                  [w(W - 1), w(W), w(W + 1)]
                ),
                O(
                  Jo,
                  {
                    itemKey: 'key',
                    ref: f,
                    data: a.value,
                    height: B,
                    itemHeight: Y,
                    fullHeight: !1,
                    onMousedown: s,
                    onScroll: C,
                    virtual: z
                  },
                  {
                    default: (K, le) => {
                      var ae
                      const { group: p, groupOption: R, data: A, value: H } = K,
                        { key: J } = A,
                        ne = typeof K.label == 'function' ? K.label() : K.label
                      if (p) {
                        const se =
                          (ae = A.title) !== null && ae !== void 0
                            ? ae
                            : Mt(ne) && ne
                        return O(
                          'div',
                          { class: ue(d.value, `${d.value}-group`), title: se },
                          [U ? U(A) : ne !== void 0 ? ne : J]
                        )
                      }
                      const {
                          disabled: re,
                          title: ee,
                          children: ce,
                          style: de,
                          class: g,
                          className: u
                        } = A,
                        c = ol(A, [
                          'disabled',
                          'title',
                          'children',
                          'style',
                          'class',
                          'className'
                        ]),
                        M = Le(c, G),
                        I = v(H),
                        j = `${d.value}-option`,
                        Z = ue(d.value, j, g, u, {
                          [`${j}-grouped`]: R,
                          [`${j}-active`]: W === le && !re,
                          [`${j}-disabled`]: re,
                          [`${j}-selected`]: I
                        }),
                        Q = x(K),
                        te = !P || typeof P == 'function' || I,
                        X = typeof Q == 'number' ? Q : Q || H
                      let ie = Mt(X) ? X.toString() : void 0
                      return (
                        ee !== void 0 && (ie = ee),
                        O(
                          'div',
                          k(
                            k({}, M),
                            {},
                            {
                              'aria-selected': I,
                              class: Z,
                              title: ie,
                              onMousemove: se => {
                                c.onMousemove && c.onMousemove(se),
                                  !(W === le || re) && $(le)
                              },
                              onClick: se => {
                                re || y(H), c.onClick && c.onClick(se)
                              },
                              style: de
                            }
                          ),
                          [
                            O('div', { class: `${j}-content` }, [U ? U(A) : X]),
                            Je(P) || I,
                            te &&
                              O(
                                He,
                                {
                                  class: `${d.value}-option-state`,
                                  customizeIcon: P,
                                  customizeIconProps: { isSelected: I }
                                },
                                { default: () => [I ? '✓' : null] }
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
  il = ll
var al =
  (globalThis && globalThis.__rest) ||
  function(e, t) {
    var o = {}
    for (var n in e)
      Object.prototype.hasOwnProperty.call(e, n) &&
        t.indexOf(n) < 0 &&
        (o[n] = e[n])
    if (e != null && typeof Object.getOwnPropertySymbols == 'function')
      for (var l = 0, n = Object.getOwnPropertySymbols(e); l < n.length; l++)
        t.indexOf(n[l]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(e, n[l]) &&
          (o[n[l]] = e[n[l]])
    return o
  }
function rl(e) {
  const t = e,
    { key: o, children: n } = t,
    l = t.props,
    { value: i, disabled: d } = l,
    a = al(l, ['value', 'disabled']),
    f = n == null ? void 0 : n.default
  return S(
    {
      key: o,
      value: i !== void 0 ? i : o,
      children: f,
      disabled: d || d === ''
    },
    a
  )
}
function Qt(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1
  return Ht(e)
    .map((n, l) => {
      var i
      if (!Je(n) || !n.type) return null
      const {
        type: { isSelectOptGroup: d },
        key: a,
        children: f,
        props: s
      } = n
      if (t || !d) return rl(n)
      const r = f && f.default ? f.default() : void 0,
        m =
          (s == null ? void 0 : s.label) ||
          ((i = f.label) === null || i === void 0 ? void 0 : i.call(f)) ||
          a
      return S(
        S({ key: `__RC_SELECT_GRP__${a === null ? l : String(a)}__` }, s),
        { label: m, options: Qt(r || []) }
      )
    })
    .filter(n => n)
}
function sl(e, t, o) {
  const n = q(),
    l = q(),
    i = q(),
    d = q([])
  return (
    oe(
      [e, t],
      () => {
        e.value ? (d.value = tt(e.value).slice()) : (d.value = Qt(t.value))
      },
      { immediate: !0, deep: !0 }
    ),
    Oe(() => {
      const a = d.value,
        f = new Map(),
        s = new Map(),
        r = o.value
      function m(h) {
        let $ =
          arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1
        for (let v = 0; v < h.length; v += 1) {
          const y = h[v]
          !y[r.options] || $
            ? (f.set(y[r.value], y), s.set(y[r.label], y))
            : m(y[r.options], !0)
        }
      }
      m(a), (n.value = a), (l.value = f), (i.value = s)
    }),
    { options: n, valueOptions: l, labelOptions: i }
  )
}
let Et = 0
const ul = Cn()
function cl() {
  let e
  return ul ? ((e = Et), (Et += 1)) : (e = 'TEST_OR_SSR'), e
}
function dl() {
  let e =
    arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : me('')
  const t = `rc_select_${cl()}`
  return e.value || t
}
function Zt(e) {
  return Array.isArray(e) ? e : e !== void 0 ? [e] : []
}
function Ue(e, t) {
  return Zt(e)
    .join('')
    .toUpperCase()
    .includes(t)
}
const fl = (e, t, o, n, l) =>
    V(() => {
      const i = o.value,
        d = l == null ? void 0 : l.value,
        a = n == null ? void 0 : n.value
      if (!i || a === !1) return e.value
      const { options: f, label: s, value: r } = t.value,
        m = [],
        h = typeof a == 'function',
        $ = i.toUpperCase(),
        v = h
          ? a
          : (x, w) =>
              d
                ? Ue(w[d], $)
                : w[f]
                ? Ue(w[s !== 'children' ? s : 'label'], $)
                : Ue(w[r], $),
        y = h ? x => Ze(x) : x => x
      return (
        e.value.forEach(x => {
          if (x[f]) {
            if (v(i, y(x))) m.push(x)
            else {
              const F = x[f].filter(N => v(i, y(N)))
              F.length && m.push(S(S({}, x), { [f]: F }))
            }
            return
          }
          v(i, y(x)) && m.push(x)
        }),
        m
      )
    }),
  pl = (e, t) => {
    const o = q({ values: new Map(), options: new Map() })
    return [
      V(() => {
        const { values: i, options: d } = o.value,
          a = e.value.map(r => {
            var m
            return r.label === void 0
              ? S(S({}, r), {
                  label:
                    (m = i.get(r.value)) === null || m === void 0
                      ? void 0
                      : m.label
                })
              : r
          }),
          f = new Map(),
          s = new Map()
        return (
          a.forEach(r => {
            f.set(r.value, r),
              s.set(r.value, t.value.get(r.value) || d.get(r.value))
          }),
          (o.value.values = f),
          (o.value.options = s),
          a
        )
      }),
      i => t.value.get(i) || o.value.options.get(i)
    ]
  },
  ml = ['inputValue']
function Jt() {
  return S(S({}, Ut()), {
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
    menuItemSelectedIcon: D.any,
    mode: String,
    labelInValue: { type: Boolean, default: void 0 },
    value: D.any,
    defaultValue: D.any,
    onChange: Function,
    children: Array
  })
}
function gl(e) {
  return !e || typeof e != 'object'
}
const vl = fe({
    compatConfig: { MODE: 3 },
    name: 'VcSelect',
    inheritAttrs: !1,
    props: nt(Jt(), {
      prefixCls: 'vc-select',
      autoClearSearchValue: !0,
      listHeight: 200,
      listItemHeight: 20,
      dropdownMatchSelectWidth: !0
    }),
    setup(e, t) {
      let { expose: o, attrs: n, slots: l } = t
      const i = dl(ve(e, 'id')),
        d = V(() => Gt(e.mode)),
        a = V(() => !!(!e.options && e.children)),
        f = V(() =>
          e.filterOption === void 0 && e.mode === 'combobox'
            ? !1
            : e.filterOption
        ),
        s = V(() => At(e.fieldNames, a.value)),
        [r, m] = yt('', {
          value: V(() =>
            e.searchValue !== void 0 ? e.searchValue : e.inputValue
          ),
          postState: g => g || ''
        }),
        h = sl(ve(e, 'options'), ve(e, 'children'), s),
        { valueOptions: $, labelOptions: v, options: y } = h,
        x = g =>
          Zt(g).map(c => {
            var M, I
            let j, Z, Q, te
            gl(c)
              ? (j = c)
              : ((Q = c.key),
                (Z = c.label),
                (j = (M = c.value) !== null && M !== void 0 ? M : Q))
            const X = $.value.get(j)
            return (
              X &&
                (Z === void 0 &&
                  (Z =
                    X == null ? void 0 : X[e.optionLabelProp || s.value.label]),
                Q === void 0 &&
                  (Q =
                    (I = X == null ? void 0 : X.key) !== null && I !== void 0
                      ? I
                      : j),
                (te = X == null ? void 0 : X.disabled)),
              { label: Z, value: j, key: Q, disabled: te, option: X }
            )
          }),
        [w, F] = yt(e.defaultValue, { value: ve(e, 'value') }),
        N = V(() => {
          var g
          const u = x(w.value)
          return e.mode === 'combobox' &&
            !(!((g = u[0]) === null || g === void 0) && g.value)
            ? []
            : u
        }),
        [T, b] = pl(N, $),
        E = V(() => {
          if (!e.mode && T.value.length === 1) {
            const g = T.value[0]
            if (g.value === null && (g.label === null || g.label === void 0))
              return []
          }
          return T.value.map(g => {
            var u
            return S(S({}, g), {
              label:
                (u = typeof g.label == 'function' ? g.label() : g.label) !==
                  null && u !== void 0
                  ? u
                  : g.value
            })
          })
        }),
        C = V(() => new Set(T.value.map(g => g.value)))
      Oe(
        () => {
          var g
          if (e.mode === 'combobox') {
            const u =
              (g = T.value[0]) === null || g === void 0 ? void 0 : g.value
            u != null && m(String(u))
          }
        },
        { flush: 'post' }
      )
      const P = (g, u) => {
          const c = u ?? g
          return { [s.value.value]: g, [s.value.label]: c }
        },
        L = q()
      Oe(() => {
        if (e.mode !== 'tags') {
          L.value = y.value
          return
        }
        const g = y.value.slice(),
          u = c => $.value.has(c)
        ;[...T.value]
          .sort((c, M) => (c.value < M.value ? -1 : 1))
          .forEach(c => {
            const M = c.value
            u(M) || g.push(P(M, c.label))
          }),
          (L.value = g)
      })
      const z = fl(L, s, r, f, ve(e, 'optionFilterProp')),
        B = V(() =>
          e.mode !== 'tags' ||
          !r.value ||
          z.value.some(g => g[e.optionFilterProp || 'value'] === r.value)
            ? z.value
            : [P(r.value), ...z.value]
        ),
        Y = V(() =>
          e.filterSort
            ? [...B.value].sort((g, u) => e.filterSort(g, u))
            : B.value
        ),
        U = V(() =>
          io(Y.value, { fieldNames: s.value, childrenAsData: a.value })
        ),
        W = g => {
          const u = x(g)
          if (
            (F(u),
            e.onChange &&
              (u.length !== T.value.length ||
                u.some((c, M) => {
                  var I
                  return (
                    ((I = T.value[M]) === null || I === void 0
                      ? void 0
                      : I.value) !== (c == null ? void 0 : c.value)
                  )
                })))
          ) {
            const c = e.labelInValue
                ? u.map(I =>
                    S(S({}, I), {
                      originLabel: I.label,
                      label: typeof I.label == 'function' ? I.label() : I.label
                    })
                  )
                : u.map(I => I.value),
              M = u.map(I => Ze(b(I.value)))
            e.onChange(d.value ? c : c[0], d.value ? M : M[0])
          }
        },
        [G, K] = wt(null),
        [le, ae] = wt(0),
        p = V(() =>
          e.defaultActiveFirstOption !== void 0
            ? e.defaultActiveFirstOption
            : e.mode !== 'combobox'
        ),
        R = function(g, u) {
          let { source: c = 'keyboard' } =
            arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}
          ae(u),
            e.backfill &&
              e.mode === 'combobox' &&
              g !== null &&
              c === 'keyboard' &&
              K(String(g))
        },
        A = (g, u) => {
          const c = () => {
            var M
            const I = b(g),
              j = I == null ? void 0 : I[s.value.label]
            return [
              e.labelInValue
                ? {
                    label: typeof j == 'function' ? j() : j,
                    originLabel: j,
                    value: g,
                    key:
                      (M = I == null ? void 0 : I.key) !== null && M !== void 0
                        ? M
                        : g
                  }
                : g,
              Ze(I)
            ]
          }
          if (u && e.onSelect) {
            const [M, I] = c()
            e.onSelect(M, I)
          } else if (!u && e.onDeselect) {
            const [M, I] = c()
            e.onDeselect(M, I)
          }
        },
        H = (g, u) => {
          let c
          const M = d.value ? u.selected : !0
          M
            ? (c = d.value ? [...T.value, g] : [g])
            : (c = T.value.filter(I => I.value !== g)),
            W(c),
            A(g, M),
            e.mode === 'combobox'
              ? K('')
              : (!d.value || e.autoClearSearchValue) && (m(''), K(''))
        },
        J = (g, u) => {
          W(g),
            (u.type === 'remove' || u.type === 'clear') &&
              u.values.forEach(c => {
                A(c.value, !1)
              })
        },
        ne = (g, u) => {
          var c
          if ((m(g), K(null), u.source === 'submit')) {
            const M = (g || '').trim()
            if (M) {
              const I = Array.from(new Set([...C.value, M]))
              W(I), A(M, !0), m('')
            }
            return
          }
          u.source !== 'blur' &&
            (e.mode === 'combobox' && W(g),
            (c = e.onSearch) === null || c === void 0 || c.call(e, g))
        },
        re = g => {
          let u = g
          e.mode !== 'tags' &&
            (u = g
              .map(M => {
                const I = v.value.get(M)
                return I == null ? void 0 : I.value
              })
              .filter(M => M !== void 0))
          const c = Array.from(new Set([...C.value, ...u]))
          W(c),
            c.forEach(M => {
              A(M, !0)
            })
        },
        ee = V(() => e.virtual !== !1 && e.dropdownMatchSelectWidth !== !1)
      tl(
        jt(
          S(S({}, h), {
            flattenOptions: U,
            onActiveValue: R,
            defaultActiveFirstOption: p,
            onSelect: H,
            menuItemSelectedIcon: ve(e, 'menuItemSelectedIcon'),
            rawValues: C,
            fieldNames: s,
            virtual: ee,
            listHeight: ve(e, 'listHeight'),
            listItemHeight: ve(e, 'listItemHeight'),
            childrenAsData: a
          })
        )
      )
      const ce = me()
      o({
        focus() {
          var g
          ;(g = ce.value) === null || g === void 0 || g.focus()
        },
        blur() {
          var g
          ;(g = ce.value) === null || g === void 0 || g.blur()
        },
        scrollTo(g) {
          var u
          ;(u = ce.value) === null || u === void 0 || u.scrollTo(g)
        }
      })
      const de = V(() =>
        Le(e, [
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
        O(
          Ho,
          k(
            k(k({}, de.value), n),
            {},
            {
              id: i,
              prefixCls: e.prefixCls,
              ref: ce,
              omitDomProps: ml,
              mode: e.mode,
              displayValues: E.value,
              onDisplayValuesChange: J,
              searchValue: r.value,
              onSearch: ne,
              onSearchSplit: re,
              dropdownMatchSelectWidth: e.dropdownMatchSelectWidth,
              OptionList: il,
              emptyOptions: !U.value.length,
              activeValue: G.value,
              activeDescendantId: `${i}_list_${le.value}`
            }
          ),
          l
        )
    }
  }),
  at = () => null
at.isSelectOption = !0
at.displayName = 'ASelectOption'
const hl = at,
  rt = () => null
rt.isSelectOptGroup = !0
rt.displayName = 'ASelectOptGroup'
const bl = rt
function Pt(e) {
  for (var t = 1; t < arguments.length; t++) {
    var o = arguments[t] != null ? Object(arguments[t]) : {},
      n = Object.keys(o)
    typeof Object.getOwnPropertySymbols == 'function' &&
      (n = n.concat(
        Object.getOwnPropertySymbols(o).filter(function(l) {
          return Object.getOwnPropertyDescriptor(o, l).enumerable
        })
      )),
      n.forEach(function(l) {
        Sl(e, l, o[l])
      })
  }
  return e
}
function Sl(e, t, o) {
  return (
    t in e
      ? Object.defineProperty(e, t, {
          value: o,
          enumerable: !0,
          configurable: !0,
          writable: !0
        })
      : (e[t] = o),
    e
  )
}
var st = function(t, o) {
  var n = Pt({}, t, o.attrs)
  return O(Nt, Pt({}, n, { icon: no }), null)
}
st.displayName = 'DownOutlined'
st.inheritAttrs = !1
const yl = st
function Dt(e) {
  for (var t = 1; t < arguments.length; t++) {
    var o = arguments[t] != null ? Object(arguments[t]) : {},
      n = Object.keys(o)
    typeof Object.getOwnPropertySymbols == 'function' &&
      (n = n.concat(
        Object.getOwnPropertySymbols(o).filter(function(l) {
          return Object.getOwnPropertyDescriptor(o, l).enumerable
        })
      )),
      n.forEach(function(l) {
        wl(e, l, o[l])
      })
  }
  return e
}
function wl(e, t, o) {
  return (
    t in e
      ? Object.defineProperty(e, t, {
          value: o,
          enumerable: !0,
          configurable: !0,
          writable: !0
        })
      : (e[t] = o),
    e
  )
}
var ut = function(t, o) {
  var n = Dt({}, t, o.attrs)
  return O(Nt, Dt({}, n, { icon: oo }), null)
}
ut.displayName = 'SearchOutlined'
ut.inheritAttrs = !1
const Il = ut
function Cl(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}
  const {
      loading: o,
      multiple: n,
      prefixCls: l,
      hasFeedback: i,
      feedbackIcon: d,
      showArrow: a
    } = e,
    f = e.suffixIcon || (t.suffixIcon && t.suffixIcon()),
    s = e.clearIcon || (t.clearIcon && t.clearIcon()),
    r =
      e.menuItemSelectedIcon ||
      (t.menuItemSelectedIcon && t.menuItemSelectedIcon()),
    m = e.removeIcon || (t.removeIcon && t.removeIcon()),
    h = s ?? O(xn, null, null),
    $ = w => O(Pe, null, [a !== !1 && w, i && d])
  let v = null
  if (f !== void 0) v = $(f)
  else if (o) v = $(O(On, { spin: !0 }, null))
  else {
    const w = `${l}-suffix`
    v = F => {
      let { open: N, showSearch: T } = F
      return $(N && T ? O(Il, { class: w }, null) : O(yl, { class: w }, null))
    }
  }
  let y = null
  r !== void 0 ? (y = r) : n ? (y = O(Qn, null, null)) : (y = null)
  let x = null
  return (
    m !== void 0 ? (x = m) : (x = O($n, null, null)),
    { clearIcon: h, suffixIcon: v, itemIcon: y, removeIcon: x }
  )
}
const xl = new ye('antMoveDownIn', {
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
  Ol = new ye('antMoveDownOut', {
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
  $l = new ye('antMoveLeftIn', {
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
  Tl = new ye('antMoveLeftOut', {
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
  Ml = new ye('antMoveRightIn', {
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
  El = new ye('antMoveRightOut', {
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
  Pl = new ye('antMoveUpIn', {
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
  Dl = new ye('antMoveUpOut', {
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
  Fl = {
    'move-up': { inKeyframes: Pl, outKeyframes: Dl },
    'move-down': { inKeyframes: xl, outKeyframes: Ol },
    'move-left': { inKeyframes: $l, outKeyframes: Tl },
    'move-right': { inKeyframes: Ml, outKeyframes: El }
  },
  Ft = (e, t) => {
    const { antCls: o } = e,
      n = `${o}-${t}`,
      { inKeyframes: l, outKeyframes: i } = Fl[t]
    return [
      jn(n, l, i, e.motionDurationMid),
      {
        [`
        ${n}-enter,
        ${n}-appear
      `]: { opacity: 0, animationTimingFunction: e.motionEaseOutCirc },
        [`${n}-leave`]: { animationTimingFunction: e.motionEaseInOutCirc }
      }
    ]
  },
  Rt = e => {
    const { controlPaddingHorizontal: t } = e
    return {
      position: 'relative',
      display: 'block',
      minHeight: e.controlHeight,
      padding: `${(e.controlHeight - e.fontSize * e.lineHeight) / 2}px ${t}px`,
      color: e.colorText,
      fontWeight: 'normal',
      fontSize: e.fontSize,
      lineHeight: e.lineHeight,
      boxSizing: 'border-box'
    }
  },
  Rl = e => {
    const { antCls: t, componentCls: o } = e,
      n = `${o}-item`
    return [
      {
        [`${o}-dropdown`]: S(S({}, ke(e)), {
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
            &${t}-slide-up-enter${t}-slide-up-enter-active${o}-dropdown-placement-bottomLeft,
            &${t}-slide-up-appear${t}-slide-up-appear-active${o}-dropdown-placement-bottomLeft
          `]: { animationName: Un },
          [`
            &${t}-slide-up-enter${t}-slide-up-enter-active${o}-dropdown-placement-topLeft,
            &${t}-slide-up-appear${t}-slide-up-appear-active${o}-dropdown-placement-topLeft
          `]: { animationName: Gn },
          [`&${t}-slide-up-leave${t}-slide-up-leave-active${o}-dropdown-placement-bottomLeft`]: {
            animationName: Yn
          },
          [`&${t}-slide-up-leave${t}-slide-up-leave-active${o}-dropdown-placement-topLeft`]: {
            animationName: Xn
          },
          '&-hidden': { display: 'none' },
          '&-empty': { color: e.colorTextDisabled },
          [`${n}-empty`]: S(S({}, Rt(e)), { color: e.colorTextDisabled }),
          [`${n}`]: S(S({}, Rt(e)), {
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
              '&-content': S({ flex: 'auto' }, qe),
              '&-state': { flex: 'none' },
              [`&-active:not(${n}-option-disabled)`]: {
                backgroundColor: e.controlItemBgHover
              },
              [`&-selected:not(${n}-option-disabled)`]: {
                color: e.colorText,
                fontWeight: e.fontWeightStrong,
                backgroundColor: e.controlItemBgActive,
                [`${n}-option-state`]: { color: e.colorPrimary }
              },
              '&-disabled': {
                [`&${n}-option-selected`]: {
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
      It(e, 'slide-up'),
      It(e, 'slide-down'),
      Ft(e, 'move-up'),
      Ft(e, 'move-down')
    ]
  },
  Vl = Rl,
  xe = 2
function kt(e) {
  let { controlHeightSM: t, controlHeight: o, lineWidth: n } = e
  const l = (o - t) / 2 - n,
    i = Math.ceil(l / 2)
  return [l, i]
}
function Ge(e, t) {
  const { componentCls: o, iconCls: n } = e,
    l = `${o}-selection-overflow`,
    i = e.controlHeightSM,
    [d] = kt(e),
    a = t ? `${o}-${t}` : ''
  return {
    [`${o}-multiple${a}`]: {
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
      [`${o}-selector`]: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        padding: `${d - xe}px ${xe * 2}px`,
        borderRadius: e.borderRadius,
        [`${o}-show-search&`]: { cursor: 'text' },
        [`${o}-disabled&`]: {
          background: e.colorBgContainerDisabled,
          cursor: 'not-allowed'
        },
        '&:after': {
          display: 'inline-block',
          width: 0,
          margin: `${xe}px 0`,
          lineHeight: `${i}px`,
          content: '"\\a0"'
        }
      },
      [`
        &${o}-show-arrow ${o}-selector,
        &${o}-allow-clear ${o}-selector
      `]: { paddingInlineEnd: e.fontSizeIcon + e.controlPaddingHorizontal },
      [`${o}-selection-item`]: {
        position: 'relative',
        display: 'flex',
        flex: 'none',
        boxSizing: 'border-box',
        maxWidth: '100%',
        height: i,
        marginTop: xe,
        marginBottom: xe,
        lineHeight: `${i - e.lineWidth * 2}px`,
        background: e.colorFillSecondary,
        border: `${e.lineWidth}px solid ${e.colorSplit}`,
        borderRadius: e.borderRadiusSM,
        cursor: 'default',
        transition: `font-size ${e.motionDurationSlow}, line-height ${e.motionDurationSlow}, height ${e.motionDurationSlow}`,
        userSelect: 'none',
        marginInlineEnd: xe * 2,
        paddingInlineStart: e.paddingXS,
        paddingInlineEnd: e.paddingXS / 2,
        [`${o}-disabled&`]: {
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
        '&-remove': S(S({}, Lt()), {
          display: 'inline-block',
          color: e.colorIcon,
          fontWeight: 'bold',
          fontSize: 10,
          lineHeight: 'inherit',
          cursor: 'pointer',
          [`> ${n}`]: { verticalAlign: '-0.2em' },
          '&:hover': { color: e.colorIconHover }
        })
      },
      [`${l}-item + ${l}-item`]: {
        [`${o}-selection-search`]: { marginInlineStart: 0 }
      },
      [`${o}-selection-search`]: {
        display: 'inline-flex',
        position: 'relative',
        maxWidth: '100%',
        marginInlineStart: e.inputPaddingHorizontalBase - d,
        '\n          &-input,\n          &-mirror\n        ': {
          height: i,
          fontFamily: e.fontFamily,
          lineHeight: `${i}px`,
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
      [`${o}-selection-placeholder `]: {
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
function Hl(e) {
  const { componentCls: t } = e,
    o = be(e, {
      controlHeight: e.controlHeightSM,
      controlHeightSM: e.controlHeightXS,
      borderRadius: e.borderRadiusSM,
      borderRadiusSM: e.borderRadiusXS
    }),
    [, n] = kt(e)
  return [
    Ge(e),
    Ge(o, 'sm'),
    {
      [`${t}-multiple${t}-sm`]: {
        [`${t}-selection-placeholder`]: {
          insetInlineStart: e.controlPaddingHorizontalSM - e.lineWidth,
          insetInlineEnd: 'auto'
        },
        [`${t}-selection-search`]: { marginInlineStart: n }
      }
    },
    Ge(
      be(e, {
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
function Ye(e, t) {
  const { componentCls: o, inputPaddingHorizontalBase: n, borderRadius: l } = e,
    i = e.controlHeight - e.lineWidth * 2,
    d = Math.ceil(e.fontSize * 1.25),
    a = t ? `${o}-${t}` : ''
  return {
    [`${o}-single${a}`]: {
      fontSize: e.fontSize,
      [`${o}-selector`]: S(S({}, ke(e)), {
        display: 'flex',
        borderRadius: l,
        [`${o}-selection-search`]: {
          position: 'absolute',
          top: 0,
          insetInlineStart: n,
          insetInlineEnd: n,
          bottom: 0,
          '&-input': { width: '100%' }
        },
        [`
          ${o}-selection-item,
          ${o}-selection-placeholder
        `]: {
          padding: 0,
          lineHeight: `${i}px`,
          transition: `all ${e.motionDurationSlow}`,
          '@supports (-moz-appearance: meterbar)': { lineHeight: `${i}px` }
        },
        [`${o}-selection-item`]: { position: 'relative', userSelect: 'none' },
        [`${o}-selection-placeholder`]: {
          transition: 'none',
          pointerEvents: 'none'
        },
        [[
          '&:after',
          `${o}-selection-item:after`,
          `${o}-selection-placeholder:after`
        ].join(',')]: {
          display: 'inline-block',
          width: 0,
          visibility: 'hidden',
          content: '"\\a0"'
        }
      }),
      [`
        &${o}-show-arrow ${o}-selection-item,
        &${o}-show-arrow ${o}-selection-placeholder
      `]: { paddingInlineEnd: d },
      [`&${o}-open ${o}-selection-item`]: { color: e.colorTextPlaceholder },
      [`&:not(${o}-customize-input)`]: {
        [`${o}-selector`]: {
          width: '100%',
          height: e.controlHeight,
          padding: `0 ${n}px`,
          [`${o}-selection-search-input`]: { height: i },
          '&:after': { lineHeight: `${i}px` }
        }
      },
      [`&${o}-customize-input`]: {
        [`${o}-selector`]: {
          '&:after': { display: 'none' },
          [`${o}-selection-search`]: { position: 'static', width: '100%' },
          [`${o}-selection-placeholder`]: {
            position: 'absolute',
            insetInlineStart: 0,
            insetInlineEnd: 0,
            padding: `0 ${n}px`,
            '&:after': { display: 'none' }
          }
        }
      }
    }
  }
}
function Nl(e) {
  const { componentCls: t } = e,
    o = e.controlPaddingHorizontalSM - e.lineWidth
  return [
    Ye(e),
    Ye(
      be(e, {
        controlHeight: e.controlHeightSM,
        borderRadius: e.borderRadiusSM
      }),
      'sm'
    ),
    {
      [`${t}-single${t}-sm`]: {
        [`&:not(${t}-customize-input)`]: {
          [`${t}-selection-search`]: { insetInlineStart: o, insetInlineEnd: o },
          [`${t}-selector`]: { padding: `0 ${o}px` },
          [`&${t}-show-arrow ${t}-selection-search`]: {
            insetInlineEnd: o + e.fontSize * 1.5
          },
          [`
            &${t}-show-arrow ${t}-selection-item,
            &${t}-show-arrow ${t}-selection-placeholder
          `]: { paddingInlineEnd: e.fontSize * 1.5 }
        }
      }
    },
    Ye(
      be(e, {
        controlHeight: e.controlHeightLG,
        fontSize: e.fontSizeLG,
        borderRadius: e.borderRadiusLG
      }),
      'lg'
    )
  ]
}
const Ll = e => {
    const { componentCls: t } = e
    return {
      position: 'relative',
      backgroundColor: e.colorBgContainer,
      border: `${e.lineWidth}px ${e.lineType} ${e.colorBorder}`,
      transition: `all ${e.motionDurationMid} ${e.motionEaseInOut}`,
      input: { cursor: 'pointer' },
      [`${t}-show-search&`]: {
        cursor: 'text',
        input: { cursor: 'auto', color: 'inherit' }
      },
      [`${t}-disabled&`]: {
        color: e.colorTextDisabled,
        background: e.colorBgContainerDisabled,
        cursor: 'not-allowed',
        [`${t}-multiple&`]: { background: e.colorBgContainerDisabled },
        input: { cursor: 'not-allowed' }
      }
    }
  },
  Xe = function(e, t) {
    let o = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1
    const {
        componentCls: n,
        borderHoverColor: l,
        outlineColor: i,
        antCls: d
      } = t,
      a = o ? { [`${n}-selector`]: { borderColor: l } } : {}
    return {
      [e]: {
        [`&:not(${n}-disabled):not(${n}-customize-input):not(${d}-pagination-size-changer)`]: S(
          S({}, a),
          {
            [`${n}-focused& ${n}-selector`]: {
              borderColor: l,
              boxShadow: `0 0 0 ${t.controlOutlineWidth}px ${i}`,
              borderInlineEndWidth: `${t.controlLineWidth}px !important`,
              outline: 0
            },
            [`&:hover ${n}-selector`]: {
              borderColor: l,
              borderInlineEndWidth: `${t.controlLineWidth}px !important`
            }
          }
        )
      }
    }
  },
  Bl = e => {
    const { componentCls: t } = e
    return {
      [`${t}-selection-search-input`]: {
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
  _l = e => {
    const { componentCls: t, inputPaddingHorizontalBase: o, iconCls: n } = e
    return {
      [t]: S(S({}, ke(e)), {
        position: 'relative',
        display: 'inline-block',
        cursor: 'pointer',
        [`&:not(${t}-customize-input) ${t}-selector`]: S(S({}, Ll(e)), Bl(e)),
        [`${t}-selection-item`]: S({ flex: 1, fontWeight: 'normal' }, qe),
        [`${t}-selection-placeholder`]: S(S({}, qe), {
          flex: 1,
          color: e.colorTextPlaceholder,
          pointerEvents: 'none'
        }),
        [`${t}-arrow`]: S(S({}, Lt()), {
          position: 'absolute',
          top: '50%',
          insetInlineStart: 'auto',
          insetInlineEnd: o,
          height: e.fontSizeIcon,
          marginTop: -e.fontSizeIcon / 2,
          color: e.colorTextQuaternary,
          fontSize: e.fontSizeIcon,
          lineHeight: 1,
          textAlign: 'center',
          pointerEvents: 'none',
          display: 'flex',
          alignItems: 'center',
          [n]: {
            verticalAlign: 'top',
            transition: `transform ${e.motionDurationSlow}`,
            '> svg': { verticalAlign: 'top' },
            [`&:not(${t}-suffix)`]: { pointerEvents: 'auto' }
          },
          [`${t}-disabled &`]: { cursor: 'not-allowed' },
          '> *:not(:last-child)': { marginInlineEnd: 8 }
        }),
        [`${t}-clear`]: {
          position: 'absolute',
          top: '50%',
          insetInlineStart: 'auto',
          insetInlineEnd: o,
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
        '&:hover': { [`${t}-clear`]: { opacity: 1 } }
      }),
      [`${t}-has-feedback`]: {
        [`${t}-clear`]: { insetInlineEnd: o + e.fontSize + e.paddingXXS }
      }
    }
  },
  Al = e => {
    const { componentCls: t } = e
    return [
      {
        [t]: {
          [`&-borderless ${t}-selector`]: {
            backgroundColor: 'transparent !important',
            borderColor: 'transparent !important',
            boxShadow: 'none !important'
          },
          [`&${t}-in-form-item`]: { width: '100%' }
        }
      },
      _l(e),
      Nl(e),
      Hl(e),
      Vl(e),
      { [`${t}-rtl`]: { direction: 'rtl' } },
      Xe(
        t,
        be(e, {
          borderHoverColor: e.colorPrimaryHover,
          outlineColor: e.controlOutline
        })
      ),
      Xe(
        `${t}-status-error`,
        be(e, {
          borderHoverColor: e.colorErrorHover,
          outlineColor: e.colorErrorOutline
        }),
        !0
      ),
      Xe(
        `${t}-status-warning`,
        be(e, {
          borderHoverColor: e.colorWarningHover,
          outlineColor: e.colorWarningOutline
        }),
        !0
      ),
      Zn(e, { borderElCls: `${t}-selector`, focusElCls: `${t}-focused` })
    ]
  },
  zl = Tn(
    'Select',
    (e, t) => {
      let { rootPrefixCls: o } = t
      const n = be(e, {
        rootPrefixCls: o,
        inputPaddingHorizontalBase: e.paddingSM - 1
      })
      return [Al(n)]
    },
    e => ({ zIndexPopup: e.zIndexPopupBase + 50 })
  ),
  Kl = () =>
    S(
      S(
        {},
        Le(Jt(), [
          'inputIcon',
          'mode',
          'getInputElement',
          'getRawInputElement',
          'backfill'
        ])
      ),
      {
        value: St([Array, Object, String, Number]),
        defaultValue: St([Array, Object, String, Number]),
        notFoundContent: D.any,
        suffixIcon: D.any,
        itemIcon: D.any,
        size: Me(),
        mode: Me(),
        bordered: Rn(!0),
        transitionName: String,
        choiceTransitionName: Me(''),
        popupClassName: String,
        dropdownClassName: String,
        placement: Me(),
        status: Me(),
        'onUpdate:value': Vn()
      }
    ),
  Vt = 'SECRET_COMBOBOX_MODE_DO_NOT_USE',
  pe = fe({
    compatConfig: { MODE: 3 },
    name: 'ASelect',
    Option: hl,
    OptGroup: bl,
    inheritAttrs: !1,
    props: nt(Kl(), { listHeight: 256, listItemHeight: 24 }),
    SECRET_COMBOBOX_MODE_DO_NOT_USE: Vt,
    slots: Object,
    setup(e, t) {
      let { attrs: o, emit: n, slots: l, expose: i } = t
      const d = me(),
        a = Jn(),
        f = kn.useInject(),
        s = V(() => eo(f.status, e.status)),
        r = () => {
          var H
          ;(H = d.value) === null || H === void 0 || H.focus()
        },
        m = () => {
          var H
          ;(H = d.value) === null || H === void 0 || H.blur()
        },
        h = H => {
          var J
          ;(J = d.value) === null || J === void 0 || J.scrollTo(H)
        },
        $ = V(() => {
          const { mode: H } = e
          if (H !== 'combobox') return H === Vt ? 'combobox' : H
        }),
        {
          prefixCls: v,
          direction: y,
          configProvider: x,
          renderEmpty: w,
          size: F,
          getPrefixCls: N,
          getPopupContainer: T,
          disabled: b,
          select: E
        } = Mn('select', e),
        { compactSize: C, compactItemClassnames: P } = lo(v, y),
        L = V(() => C.value || F.value),
        z = En(),
        B = V(() => {
          var H
          return (H = b.value) !== null && H !== void 0 ? H : z.value
        }),
        [Y, U] = zl(v),
        W = V(() => N()),
        G = V(() =>
          e.placement !== void 0
            ? e.placement
            : y.value === 'rtl'
            ? 'bottomRight'
            : 'bottomLeft'
        ),
        K = V(() => Pn(W.value, Dn(G.value), e.transitionName)),
        le = V(() =>
          ue(
            {
              [`${v.value}-lg`]: L.value === 'large',
              [`${v.value}-sm`]: L.value === 'small',
              [`${v.value}-rtl`]: y.value === 'rtl',
              [`${v.value}-borderless`]: !e.bordered,
              [`${v.value}-in-form-item`]: f.isFormItemInput
            },
            to(v.value, s.value, f.hasFeedback),
            P.value,
            U.value
          )
        ),
        ae = function() {
          for (var H = arguments.length, J = new Array(H), ne = 0; ne < H; ne++)
            J[ne] = arguments[ne]
          n('update:value', J[0]), n('change', ...J), a.onFieldChange()
        },
        p = H => {
          n('blur', H), a.onFieldBlur()
        }
      i({ blur: m, focus: r, scrollTo: h })
      const R = V(() => $.value === 'multiple' || $.value === 'tags'),
        A = V(() =>
          e.showArrow !== void 0
            ? e.showArrow
            : e.loading || !(R.value || $.value === 'combobox')
        )
      return () => {
        var H, J, ne, re
        const {
            notFoundContent: ee,
            listHeight: ce = 256,
            listItemHeight: de = 24,
            popupClassName: g,
            dropdownClassName: u,
            virtual: c,
            dropdownMatchSelectWidth: M,
            id: I = a.id.value,
            placeholder: j = (H = l.placeholder) === null || H === void 0
              ? void 0
              : H.call(l),
            showArrow: Z
          } = e,
          { hasFeedback: Q, feedbackIcon: te } = f
        let X
        ee !== void 0
          ? (X = ee)
          : l.notFoundContent
          ? (X = l.notFoundContent())
          : $.value === 'combobox'
          ? (X = null)
          : (X =
              (w == null ? void 0 : w('Select')) ||
              O(Fn, { componentName: 'Select' }, null))
        const {
            suffixIcon: ie,
            itemIcon: se,
            removeIcon: Re,
            clearIcon: Ae
          } = Cl(
            S(S({}, e), {
              multiple: R.value,
              prefixCls: v.value,
              hasFeedback: Q,
              feedbackIcon: te,
              showArrow: A.value
            }),
            l
          ),
          Ie = Le(e, [
            'prefixCls',
            'suffixIcon',
            'itemIcon',
            'removeIcon',
            'clearIcon',
            'size',
            'bordered',
            'status'
          ]),
          Ce = ue(
            g || u,
            { [`${v.value}-dropdown-${y.value}`]: y.value === 'rtl' },
            U.value
          )
        return Y(
          O(
            vl,
            k(
              k(k({ ref: d, virtual: c, dropdownMatchSelectWidth: M }, Ie), o),
              {},
              {
                showSearch:
                  (J = e.showSearch) !== null && J !== void 0
                    ? J
                    : (ne = E == null ? void 0 : E.value) === null ||
                      ne === void 0
                    ? void 0
                    : ne.showSearch,
                placeholder: j,
                listHeight: ce,
                listItemHeight: de,
                mode: $.value,
                prefixCls: v.value,
                direction: y.value,
                inputIcon: ie,
                menuItemSelectedIcon: se,
                removeIcon: Re,
                clearIcon: Ae,
                notFoundContent: X,
                class: [le.value, o.class],
                getPopupContainer: T == null ? void 0 : T.value,
                dropdownClassName: Ce,
                onChange: ae,
                onBlur: p,
                id: I,
                dropdownRender: Ie.dropdownRender || l.dropdownRender,
                transitionName: K.value,
                children:
                  (re = l.default) === null || re === void 0
                    ? void 0
                    : re.call(l),
                tagRender: e.tagRender || l.tagRender,
                optionLabelRender: l.optionLabel,
                maxTagPlaceholder: e.maxTagPlaceholder || l.maxTagPlaceholder,
                showArrow: Q || Z,
                disabled: B.value
              }
            ),
            { option: l.option }
          )
        )
      }
    }
  })
pe.install = function(e) {
  return (
    e.component(pe.name, pe),
    e.component(pe.Option.displayName, pe.Option),
    e.component(pe.OptGroup.displayName, pe.OptGroup),
    e
  )
}
pe.Option
pe.OptGroup
const li = pe
export {
  yl as D,
  Jo as L,
  li as S,
  Il as a,
  Ft as i,
  ot as p,
  Kl as s,
  ko as u
}

import {
  A as Q,
  g as Ie,
  m as Pe,
  K as Oe,
  _ as u,
  r as ze,
  u as we,
  a as D,
  B as je,
  P as d,
  V as Me,
  c as z,
  W as H,
  X as _e,
  x as ue,
  Y as Ae,
  y as pe,
  v as Re,
  h as Le,
  Z as He,
  b as F,
  e as Fe,
  f as E,
  s as Xe,
  d as Ve,
  $ as We
} from './Dashboard.071f9192.js'
import {
  c as a,
  d as _,
  s as Ke,
  w as Ge,
  m as Je,
  i as de,
  Z as ge,
  r as Ue,
  g as k,
  L as Te,
  N as qe
} from './vendor.0319ebde.js'
import { p as Qe, D as Ze, E as me, c as he } from './shallowequal.234d6013.js'
import { R as Ye, s as ke, D as et, t as tt } from './antd.ecdb83f5.js'
import { s as De, S as q } from './index.1473ec6f.js'
import { u as it } from './index.69d3efbf.js'
import { B as Ne, i as nt, s as rt, c as at } from './index.5b4de55e.js'
function fe(e) {
  for (var t = 1; t < arguments.length; t++) {
    var i = arguments[t] != null ? Object(arguments[t]) : {},
      n = Object.keys(i)
    typeof Object.getOwnPropertySymbols == 'function' &&
      (n = n.concat(
        Object.getOwnPropertySymbols(i).filter(function(r) {
          return Object.getOwnPropertyDescriptor(i, r).enumerable
        })
      )),
      n.forEach(function(r) {
        ot(e, r, i[r])
      })
  }
  return e
}
function ot(e, t, i) {
  return (
    t in e
      ? Object.defineProperty(e, t, {
          value: i,
          enumerable: !0,
          configurable: !0,
          writable: !0
        })
      : (e[t] = i),
    e
  )
}
var ee = function(t, i) {
  var n = fe({}, t, i.attrs)
  return a(Q, fe({}, n, { icon: Ye }), null)
}
ee.displayName = 'RightOutlined'
ee.inheritAttrs = !1
const be = ee
function ve(e) {
  for (var t = 1; t < arguments.length; t++) {
    var i = arguments[t] != null ? Object(arguments[t]) : {},
      n = Object.keys(i)
    typeof Object.getOwnPropertySymbols == 'function' &&
      (n = n.concat(
        Object.getOwnPropertySymbols(i).filter(function(r) {
          return Object.getOwnPropertyDescriptor(i, r).enumerable
        })
      )),
      n.forEach(function(r) {
        lt(e, r, i[r])
      })
  }
  return e
}
function lt(e, t, i) {
  return (
    t in e
      ? Object.defineProperty(e, t, {
          value: i,
          enumerable: !0,
          configurable: !0,
          writable: !0
        })
      : (e[t] = i),
    e
  )
}
var te = function(t, i) {
  var n = ve({}, t, i.attrs)
  return a(Q, ve({}, n, { icon: ke }), null)
}
te.displayName = 'LeftOutlined'
te.inheritAttrs = !1
const Se = te
function st(e, t, i) {
  var n = i || {},
    r = n.noTrailing,
    y = r === void 0 ? !1 : r,
    m = n.noLeading,
    g = m === void 0 ? !1 : m,
    p = n.debounceMode,
    c = p === void 0 ? void 0 : p,
    o,
    h = !1,
    S = 0
  function I() {
    o && clearTimeout(o)
  }
  function f($) {
    var l = $ || {},
      b = l.upcomingOnly,
      x = b === void 0 ? !1 : b
    I(), (h = !x)
  }
  function P() {
    for (var $ = arguments.length, l = new Array($), b = 0; b < $; b++)
      l[b] = arguments[b]
    var x = this,
      v = Date.now() - S
    if (h) return
    function O() {
      ;(S = Date.now()), t.apply(x, l)
    }
    function s() {
      o = void 0
    }
    !g && c && !o && O(),
      I(),
      c === void 0 && v > e
        ? g
          ? ((S = Date.now()), y || (o = setTimeout(c ? s : O, e)))
          : O()
        : y !== !0 && (o = setTimeout(c ? s : O, c === void 0 ? e - v : e))
  }
  return (P.cancel = f), P
}
function ct(e, t, i) {
  var n = i || {},
    r = n.atBegin,
    y = r === void 0 ? !1 : r
  return st(e, t, { debounceMode: y !== !1 })
}
const ut = new Oe('antSpinMove', { to: { opacity: 1 } }),
  pt = new Oe('antRotate', { to: { transform: 'rotate(405deg)' } }),
  dt = e => ({
    [`${e.componentCls}`]: u(u({}, ze(e)), {
      position: 'absolute',
      display: 'none',
      color: e.colorPrimary,
      textAlign: 'center',
      verticalAlign: 'middle',
      opacity: 0,
      transition: `transform ${e.motionDurationSlow} ${e.motionEaseInOutCirc}`,
      '&-spinning': { position: 'static', display: 'inline-block', opacity: 1 },
      '&-nested-loading': {
        position: 'relative',
        [`> div > ${e.componentCls}`]: {
          position: 'absolute',
          top: 0,
          insetInlineStart: 0,
          zIndex: 4,
          display: 'block',
          width: '100%',
          height: '100%',
          maxHeight: e.contentHeight,
          [`${e.componentCls}-dot`]: {
            position: 'absolute',
            top: '50%',
            insetInlineStart: '50%',
            margin: -e.spinDotSize / 2
          },
          [`${e.componentCls}-text`]: {
            position: 'absolute',
            top: '50%',
            width: '100%',
            paddingTop: (e.spinDotSize - e.fontSize) / 2 + 2,
            textShadow: `0 1px 2px ${e.colorBgContainer}`
          },
          [`&${e.componentCls}-show-text ${e.componentCls}-dot`]: {
            marginTop: -(e.spinDotSize / 2) - 10
          },
          '&-sm': {
            [`${e.componentCls}-dot`]: { margin: -e.spinDotSizeSM / 2 },
            [`${e.componentCls}-text`]: {
              paddingTop: (e.spinDotSizeSM - e.fontSize) / 2 + 2
            },
            [`&${e.componentCls}-show-text ${e.componentCls}-dot`]: {
              marginTop: -(e.spinDotSizeSM / 2) - 10
            }
          },
          '&-lg': {
            [`${e.componentCls}-dot`]: { margin: -(e.spinDotSizeLG / 2) },
            [`${e.componentCls}-text`]: {
              paddingTop: (e.spinDotSizeLG - e.fontSize) / 2 + 2
            },
            [`&${e.componentCls}-show-text ${e.componentCls}-dot`]: {
              marginTop: -(e.spinDotSizeLG / 2) - 10
            }
          }
        },
        [`${e.componentCls}-container`]: {
          position: 'relative',
          transition: `opacity ${e.motionDurationSlow}`,
          '&::after': {
            position: 'absolute',
            top: 0,
            insetInlineEnd: 0,
            bottom: 0,
            insetInlineStart: 0,
            zIndex: 10,
            width: '100%',
            height: '100%',
            background: e.colorBgContainer,
            opacity: 0,
            transition: `all ${e.motionDurationSlow}`,
            content: '""',
            pointerEvents: 'none'
          }
        },
        [`${e.componentCls}-blur`]: {
          clear: 'both',
          opacity: 0.5,
          userSelect: 'none',
          pointerEvents: 'none',
          '&::after': { opacity: 0.4, pointerEvents: 'auto' }
        }
      },
      '&-tip': { color: e.spinDotDefault },
      [`${e.componentCls}-dot`]: {
        position: 'relative',
        display: 'inline-block',
        fontSize: e.spinDotSize,
        width: '1em',
        height: '1em',
        '&-item': {
          position: 'absolute',
          display: 'block',
          width: (e.spinDotSize - e.marginXXS / 2) / 2,
          height: (e.spinDotSize - e.marginXXS / 2) / 2,
          backgroundColor: e.colorPrimary,
          borderRadius: '100%',
          transform: 'scale(0.75)',
          transformOrigin: '50% 50%',
          opacity: 0.3,
          animationName: ut,
          animationDuration: '1s',
          animationIterationCount: 'infinite',
          animationTimingFunction: 'linear',
          animationDirection: 'alternate',
          '&:nth-child(1)': { top: 0, insetInlineStart: 0 },
          '&:nth-child(2)': {
            top: 0,
            insetInlineEnd: 0,
            animationDelay: '0.4s'
          },
          '&:nth-child(3)': {
            insetInlineEnd: 0,
            bottom: 0,
            animationDelay: '0.8s'
          },
          '&:nth-child(4)': {
            bottom: 0,
            insetInlineStart: 0,
            animationDelay: '1.2s'
          }
        },
        '&-spin': {
          transform: 'rotate(45deg)',
          animationName: pt,
          animationDuration: '1.2s',
          animationIterationCount: 'infinite',
          animationTimingFunction: 'linear'
        }
      },
      [`&-sm ${e.componentCls}-dot`]: {
        fontSize: e.spinDotSizeSM,
        i: {
          width: (e.spinDotSizeSM - e.marginXXS / 2) / 2,
          height: (e.spinDotSizeSM - e.marginXXS / 2) / 2
        }
      },
      [`&-lg ${e.componentCls}-dot`]: {
        fontSize: e.spinDotSizeLG,
        i: {
          width: (e.spinDotSizeLG - e.marginXXS) / 2,
          height: (e.spinDotSizeLG - e.marginXXS) / 2
        }
      },
      [`&${e.componentCls}-show-text ${e.componentCls}-text`]: {
        display: 'block'
      }
    })
  }),
  gt = Ie(
    'Spin',
    e => {
      const t = Pe(e, {
        spinDotDefault: e.colorTextDescription,
        spinDotSize: e.controlHeightLG / 2,
        spinDotSizeSM: e.controlHeightLG * 0.35,
        spinDotSizeLG: e.controlHeight
      })
      return [dt(t)]
    },
    { contentHeight: 400 }
  )
var mt =
  (globalThis && globalThis.__rest) ||
  function(e, t) {
    var i = {}
    for (var n in e)
      Object.prototype.hasOwnProperty.call(e, n) &&
        t.indexOf(n) < 0 &&
        (i[n] = e[n])
    if (e != null && typeof Object.getOwnPropertySymbols == 'function')
      for (var r = 0, n = Object.getOwnPropertySymbols(e); r < n.length; r++)
        t.indexOf(n[r]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(e, n[r]) &&
          (i[n[r]] = e[n[r]])
    return i
  }
const ht = () => ({
  prefixCls: String,
  spinning: { type: Boolean, default: void 0 },
  size: String,
  wrapperClassName: String,
  tip: d.any,
  delay: Number,
  indicator: d.any
})
let J = null
function ft(e, t) {
  return !!e && !!t && !isNaN(Number(t))
}
function bt(e) {
  const t = e.indicator
  J = typeof t == 'function' ? t : () => a(t, null, null)
}
const U = _({
  compatConfig: { MODE: 3 },
  name: 'ASpin',
  inheritAttrs: !1,
  props: Qe(ht(), { size: 'default', spinning: !0, wrapperClassName: '' }),
  setup(e, t) {
    let { attrs: i, slots: n } = t
    const { prefixCls: r, size: y, direction: m } = we('spin', e),
      [g, p] = gt(r),
      c = Ke(e.spinning && !ft(e.spinning, e.delay))
    let o
    return (
      Ge(
        [() => e.spinning, () => e.delay],
        () => {
          o == null || o.cancel(),
            (o = ct(e.delay, () => {
              c.value = e.spinning
            })),
            o == null || o()
        },
        { immediate: !0, flush: 'post' }
      ),
      Je(() => {
        o == null || o.cancel()
      }),
      () => {
        var h, S
        const { class: I } = i,
          f = mt(i, ['class']),
          {
            tip: P = (h = n.tip) === null || h === void 0 ? void 0 : h.call(n)
          } = e,
          $ = (S = n.default) === null || S === void 0 ? void 0 : S.call(n),
          l = {
            [p.value]: !0,
            [r.value]: !0,
            [`${r.value}-sm`]: y.value === 'small',
            [`${r.value}-lg`]: y.value === 'large',
            [`${r.value}-spinning`]: c.value,
            [`${r.value}-show-text`]: !!P,
            [`${r.value}-rtl`]: m.value === 'rtl',
            [I]: !!I
          }
        function b(v) {
          const O = `${v}-dot`
          let s = Me(n, e, 'indicator')
          return s === null
            ? null
            : (Array.isArray(s) && (s = s.length === 1 ? s[0] : s),
              de(s)
                ? ge(s, { class: O })
                : J && de(J())
                ? ge(J(), { class: O })
                : a('span', { class: `${O} ${v}-dot-spin` }, [
                    a('i', { class: `${v}-dot-item` }, null),
                    a('i', { class: `${v}-dot-item` }, null),
                    a('i', { class: `${v}-dot-item` }, null),
                    a('i', { class: `${v}-dot-item` }, null)
                  ]))
        }
        const x = a(
          'div',
          D(
            D({}, f),
            {},
            { class: l, 'aria-live': 'polite', 'aria-busy': c.value }
          ),
          [b(r.value), P ? a('div', { class: `${r.value}-text` }, [P]) : null]
        )
        if ($ && je($).length) {
          const v = {
            [`${r.value}-container`]: !0,
            [`${r.value}-blur`]: c.value
          }
          return g(
            a(
              'div',
              {
                class: [
                  `${r.value}-nested-loading`,
                  e.wrapperClassName,
                  p.value
                ]
              },
              [
                c.value && a('div', { key: 'loading' }, [x]),
                a('div', { class: v, key: 'container' }, [$])
              ]
            )
          )
        }
        return g(x)
      }
    )
  }
})
U.setDefaultIndicator = bt
U.install = function(e) {
  return e.component(U.name, U), e
}
function $e(e) {
  for (var t = 1; t < arguments.length; t++) {
    var i = arguments[t] != null ? Object(arguments[t]) : {},
      n = Object.keys(i)
    typeof Object.getOwnPropertySymbols == 'function' &&
      (n = n.concat(
        Object.getOwnPropertySymbols(i).filter(function(r) {
          return Object.getOwnPropertyDescriptor(i, r).enumerable
        })
      )),
      n.forEach(function(r) {
        vt(e, r, i[r])
      })
  }
  return e
}
function vt(e, t, i) {
  return (
    t in e
      ? Object.defineProperty(e, t, {
          value: i,
          enumerable: !0,
          configurable: !0,
          writable: !0
        })
      : (e[t] = i),
    e
  )
}
var ie = function(t, i) {
  var n = $e({}, t, i.attrs)
  return a(Q, $e({}, n, { icon: et }), null)
}
ie.displayName = 'DoubleLeftOutlined'
ie.inheritAttrs = !1
const Ce = ie
function ye(e) {
  for (var t = 1; t < arguments.length; t++) {
    var i = arguments[t] != null ? Object(arguments[t]) : {},
      n = Object.keys(i)
    typeof Object.getOwnPropertySymbols == 'function' &&
      (n = n.concat(
        Object.getOwnPropertySymbols(i).filter(function(r) {
          return Object.getOwnPropertyDescriptor(i, r).enumerable
        })
      )),
      n.forEach(function(r) {
        St(e, r, i[r])
      })
  }
  return e
}
function St(e, t, i) {
  return (
    t in e
      ? Object.defineProperty(e, t, {
          value: i,
          enumerable: !0,
          configurable: !0,
          writable: !0
        })
      : (e[t] = i),
    e
  )
}
var ne = function(t, i) {
  var n = ye({}, t, i.attrs)
  return a(Q, ye({}, n, { icon: tt }), null)
}
ne.displayName = 'DoubleRightOutlined'
ne.inheritAttrs = !1
const xe = ne,
  $t = _({
    name: 'MiniSelect',
    compatConfig: { MODE: 3 },
    inheritAttrs: !1,
    props: De(),
    Option: q.Option,
    setup(e, t) {
      let { attrs: i, slots: n } = t
      return () => {
        const r = u(u(u({}, e), { size: 'small' }), i)
        return a(q, r, n)
      }
    }
  }),
  Ct = _({
    name: 'MiddleSelect',
    inheritAttrs: !1,
    props: De(),
    Option: q.Option,
    setup(e, t) {
      let { attrs: i, slots: n } = t
      return () => {
        const r = u(u(u({}, e), { size: 'middle' }), i)
        return a(q, r, n)
      }
    }
  }),
  j = _({
    compatConfig: { MODE: 3 },
    name: 'Pager',
    inheritAttrs: !1,
    props: {
      rootPrefixCls: String,
      page: Number,
      active: { type: Boolean, default: void 0 },
      last: { type: Boolean, default: void 0 },
      locale: d.object,
      showTitle: { type: Boolean, default: void 0 },
      itemRender: { type: Function, default: () => {} },
      onClick: { type: Function },
      onKeypress: { type: Function }
    },
    eimt: ['click', 'keypress'],
    setup(e, t) {
      let { emit: i, attrs: n } = t
      const r = () => {
          i('click', e.page)
        },
        y = m => {
          i('keypress', m, r, e.page)
        }
      return () => {
        const { showTitle: m, page: g, itemRender: p } = e,
          { class: c, style: o } = n,
          h = `${e.rootPrefixCls}-item`,
          S = z(
            h,
            `${h}-${e.page}`,
            { [`${h}-active`]: e.active, [`${h}-disabled`]: !e.page },
            c
          )
        return a(
          'li',
          {
            onClick: r,
            onKeypress: y,
            title: m ? String(g) : null,
            tabindex: '0',
            class: S,
            style: o
          },
          [
            p({
              page: g,
              type: 'page',
              originalElement: a('a', { rel: 'nofollow' }, [g])
            })
          ]
        )
      }
    }
  }),
  M = {
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
  yt = _({
    compatConfig: { MODE: 3 },
    props: {
      disabled: { type: Boolean, default: void 0 },
      changeSize: Function,
      quickGo: Function,
      selectComponentClass: d.any,
      current: Number,
      pageSizeOptions: d.array.def(['10', '20', '50', '100']),
      pageSize: Number,
      buildOptionText: Function,
      locale: d.object,
      rootPrefixCls: String,
      selectPrefixCls: String,
      goButton: d.any
    },
    setup(e) {
      const t = Ue(''),
        i = k(() => (!t.value || isNaN(t.value) ? void 0 : Number(t.value))),
        n = p => `${p.value} ${e.locale.items_per_page}`,
        r = p => {
          const { value: c } = p.target
          t.value !== c && (t.value = c)
        },
        y = p => {
          const { goButton: c, quickGo: o, rootPrefixCls: h } = e
          if (!(c || t.value === ''))
            if (
              p.relatedTarget &&
              (p.relatedTarget.className.indexOf(`${h}-item-link`) >= 0 ||
                p.relatedTarget.className.indexOf(`${h}-item`) >= 0)
            ) {
              t.value = ''
              return
            } else o(i.value), (t.value = '')
        },
        m = p => {
          t.value !== '' &&
            (p.keyCode === M.ENTER || p.type === 'click') &&
            (e.quickGo(i.value), (t.value = ''))
        },
        g = k(() => {
          const { pageSize: p, pageSizeOptions: c } = e
          return c.some(o => o.toString() === p.toString())
            ? c
            : c.concat([p.toString()]).sort((o, h) => {
                const S = isNaN(Number(o)) ? 0 : Number(o),
                  I = isNaN(Number(h)) ? 0 : Number(h)
                return S - I
              })
        })
      return () => {
        const {
            rootPrefixCls: p,
            locale: c,
            changeSize: o,
            quickGo: h,
            goButton: S,
            selectComponentClass: I,
            selectPrefixCls: f,
            pageSize: P,
            disabled: $
          } = e,
          l = `${p}-options`
        let b = null,
          x = null,
          v = null
        if (!o && !h) return null
        if (o && I) {
          const O = e.buildOptionText || n,
            s = g.value.map((C, X) =>
              a(
                I.Option,
                { key: X, value: C },
                { default: () => [O({ value: C })] }
              )
            )
          b = a(
            I,
            {
              disabled: $,
              prefixCls: f,
              showSearch: !1,
              class: `${l}-size-changer`,
              optionLabelProp: 'children',
              value: (P || g.value[0]).toString(),
              onChange: C => o(Number(C)),
              getPopupContainer: C => C.parentNode
            },
            { default: () => [s] }
          )
        }
        return (
          h &&
            (S &&
              (v =
                typeof S == 'boolean'
                  ? a(
                      'button',
                      {
                        type: 'button',
                        onClick: m,
                        onKeyup: m,
                        disabled: $,
                        class: `${l}-quick-jumper-button`
                      },
                      [c.jump_to_confirm]
                    )
                  : a('span', { onClick: m, onKeyup: m }, [S])),
            (x = a('div', { class: `${l}-quick-jumper` }, [
              c.jump_to,
              a(
                Ne,
                {
                  disabled: $,
                  type: 'text',
                  value: t.value,
                  onInput: r,
                  onChange: r,
                  onKeyup: m,
                  onBlur: y
                },
                null
              ),
              c.page,
              v
            ]))),
          a('li', { class: `${l}` }, [b, x])
        )
      }
    }
  }),
  xt = {
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
var It =
  (globalThis && globalThis.__rest) ||
  function(e, t) {
    var i = {}
    for (var n in e)
      Object.prototype.hasOwnProperty.call(e, n) &&
        t.indexOf(n) < 0 &&
        (i[n] = e[n])
    if (e != null && typeof Object.getOwnPropertySymbols == 'function')
      for (var r = 0, n = Object.getOwnPropertySymbols(e); r < n.length; r++)
        t.indexOf(n[r]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(e, n[r]) &&
          (i[n[r]] = e[n[r]])
    return i
  }
function Pt(e) {
  return typeof e == 'number' && isFinite(e) && Math.floor(e) === e
}
function Ot(e) {
  let { originalElement: t } = e
  return t
}
function T(e, t, i) {
  const n = typeof e > 'u' ? t.statePageSize : e
  return Math.floor((i.total - 1) / n) + 1
}
const zt = _({
    compatConfig: { MODE: 3 },
    name: 'Pagination',
    mixins: [Ze],
    inheritAttrs: !1,
    props: {
      disabled: { type: Boolean, default: void 0 },
      prefixCls: d.string.def('rc-pagination'),
      selectPrefixCls: d.string.def('rc-select'),
      current: Number,
      defaultCurrent: d.number.def(1),
      total: d.number.def(0),
      pageSize: Number,
      defaultPageSize: d.number.def(10),
      hideOnSinglePage: { type: Boolean, default: !1 },
      showSizeChanger: { type: Boolean, default: void 0 },
      showLessItems: { type: Boolean, default: !1 },
      selectComponentClass: d.any,
      showPrevNextJumpers: { type: Boolean, default: !0 },
      showQuickJumper: d.oneOfType([d.looseBool, d.object]).def(!1),
      showTitle: { type: Boolean, default: !0 },
      pageSizeOptions: d.arrayOf(d.oneOfType([d.number, d.string])),
      buildOptionText: Function,
      showTotal: Function,
      simple: { type: Boolean, default: void 0 },
      locale: d.object.def(xt),
      itemRender: d.func.def(Ot),
      prevIcon: d.any,
      nextIcon: d.any,
      jumpPrevIcon: d.any,
      jumpNextIcon: d.any,
      totalBoundaryShowSizeChanger: d.number.def(50)
    },
    data() {
      const e = this.$props
      let t = me([this.current, this.defaultCurrent])
      const i = me([this.pageSize, this.defaultPageSize])
      return (
        (t = Math.min(t, T(i, void 0, e))),
        { stateCurrent: t, stateCurrentInputValue: t, statePageSize: i }
      )
    },
    watch: {
      current(e) {
        this.setState({ stateCurrent: e, stateCurrentInputValue: e })
      },
      pageSize(e) {
        const t = {}
        let i = this.stateCurrent
        const n = T(e, this.$data, this.$props)
        ;(i = i > n ? n : i),
          H(this, 'current') ||
            ((t.stateCurrent = i), (t.stateCurrentInputValue = i)),
          (t.statePageSize = e),
          this.setState(t)
      },
      stateCurrent(e, t) {
        this.$nextTick(() => {
          if (this.$refs.paginationNode) {
            const i = this.$refs.paginationNode.querySelector(
              `.${this.prefixCls}-item-${t}`
            )
            i && document.activeElement === i && i.blur()
          }
        })
      },
      total() {
        const e = {},
          t = T(this.pageSize, this.$data, this.$props)
        if (H(this, 'current')) {
          const i = Math.min(this.current, t)
          ;(e.stateCurrent = i), (e.stateCurrentInputValue = i)
        } else {
          let i = this.stateCurrent
          i === 0 && t > 0 ? (i = 1) : (i = Math.min(this.stateCurrent, t)),
            (e.stateCurrent = i)
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
          T(void 0, this.$data, this.$props),
          this.stateCurrent + (this.showLessItems ? 3 : 5)
        )
      },
      getItemIcon(e, t) {
        const { prefixCls: i } = this.$props
        return (
          _e(this, e, this.$props) ||
          a(
            'button',
            { type: 'button', 'aria-label': t, class: `${i}-item-link` },
            null
          )
        )
      },
      getValidValue(e) {
        const t = e.target.value,
          i = T(void 0, this.$data, this.$props),
          { stateCurrentInputValue: n } = this.$data
        let r
        return (
          t === ''
            ? (r = t)
            : isNaN(Number(t))
            ? (r = n)
            : t >= i
            ? (r = i)
            : (r = Number(t)),
          r
        )
      },
      isValid(e) {
        return Pt(e) && e !== this.stateCurrent
      },
      shouldDisplayQuickJumper() {
        const { showQuickJumper: e, pageSize: t, total: i } = this.$props
        return i <= t ? !1 : e
      },
      handleKeyDown(e) {
        ;(e.keyCode === M.ARROW_UP || e.keyCode === M.ARROW_DOWN) &&
          e.preventDefault()
      },
      handleKeyUp(e) {
        const t = this.getValidValue(e),
          i = this.stateCurrentInputValue
        t !== i && this.setState({ stateCurrentInputValue: t }),
          e.keyCode === M.ENTER
            ? this.handleChange(t)
            : e.keyCode === M.ARROW_UP
            ? this.handleChange(t - 1)
            : e.keyCode === M.ARROW_DOWN && this.handleChange(t + 1)
      },
      changePageSize(e) {
        let t = this.stateCurrent
        const i = t,
          n = T(e, this.$data, this.$props)
        ;(t = t > n ? n : t),
          n === 0 && (t = this.stateCurrent),
          typeof e == 'number' &&
            (H(this, 'pageSize') || this.setState({ statePageSize: e }),
            H(this, 'current') ||
              this.setState({ stateCurrent: t, stateCurrentInputValue: t })),
          this.__emit('update:pageSize', e),
          t !== i && this.__emit('update:current', t),
          this.__emit('showSizeChange', t, e),
          this.__emit('change', t, e)
      },
      handleChange(e) {
        const { disabled: t } = this.$props
        let i = e
        if (this.isValid(i) && !t) {
          const n = T(void 0, this.$data, this.$props)
          return (
            i > n ? (i = n) : i < 1 && (i = 1),
            H(this, 'current') ||
              this.setState({ stateCurrent: i, stateCurrentInputValue: i }),
            this.__emit('update:current', i),
            this.__emit('change', i, this.statePageSize),
            i
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
        return this.stateCurrent < T(void 0, this.$data, this.$props)
      },
      getShowSizeChanger() {
        const {
          showSizeChanger: e,
          total: t,
          totalBoundaryShowSizeChanger: i
        } = this.$props
        return typeof e < 'u' ? e : t > i
      },
      runIfEnter(e, t) {
        if (e.key === 'Enter' || e.charCode === 13) {
          e.preventDefault()
          for (
            var i = arguments.length, n = new Array(i > 2 ? i - 2 : 0), r = 2;
            r < i;
            r++
          )
            n[r - 2] = arguments[r]
          t(...n)
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
        ;(e.keyCode === M.ENTER || e.type === 'click') &&
          this.handleChange(this.stateCurrentInputValue)
      },
      renderPrev(e) {
        const { itemRender: t } = this.$props,
          i = t({
            page: e,
            type: 'prev',
            originalElement: this.getItemIcon('prevIcon', 'prev page')
          }),
          n = !this.hasPrev()
        return ue(i) ? he(i, n ? { disabled: n } : {}) : i
      },
      renderNext(e) {
        const { itemRender: t } = this.$props,
          i = t({
            page: e,
            type: 'next',
            originalElement: this.getItemIcon('nextIcon', 'next page')
          }),
          n = !this.hasNext()
        return ue(i) ? he(i, n ? { disabled: n } : {}) : i
      }
    },
    render() {
      const {
          prefixCls: e,
          disabled: t,
          hideOnSinglePage: i,
          total: n,
          locale: r,
          showQuickJumper: y,
          showLessItems: m,
          showTitle: g,
          showTotal: p,
          simple: c,
          itemRender: o,
          showPrevNextJumpers: h,
          jumpPrevIcon: S,
          jumpNextIcon: I,
          selectComponentClass: f,
          selectPrefixCls: P,
          pageSizeOptions: $
        } = this.$props,
        { stateCurrent: l, statePageSize: b } = this,
        x = Ae(this.$attrs).extraAttrs,
        { class: v } = x,
        O = It(x, ['class'])
      if (i === !0 && this.total <= b) return null
      const s = T(void 0, this.$data, this.$props),
        C = []
      let X = null,
        re = null,
        ae = null,
        oe = null,
        A = null
      const V = y && y.goButton,
        w = m ? 1 : 2,
        le = l - 1 > 0 ? l - 1 : 0,
        se = l + 1 < s ? l + 1 : s,
        W = this.hasPrev(),
        K = this.hasNext()
      if (c)
        return (
          V &&
            (typeof V == 'boolean'
              ? (A = a(
                  'button',
                  {
                    type: 'button',
                    onClick: this.handleGoTO,
                    onKeyup: this.handleGoTO
                  },
                  [r.jump_to_confirm]
                ))
              : (A = a(
                  'span',
                  { onClick: this.handleGoTO, onKeyup: this.handleGoTO },
                  [V]
                )),
            (A = a(
              'li',
              {
                title: g ? `${r.jump_to}${l}/${s}` : null,
                class: `${e}-simple-pager`
              },
              [A]
            ))),
          a(
            'ul',
            D({ class: z(`${e} ${e}-simple`, { [`${e}-disabled`]: t }, v) }, O),
            [
              a(
                'li',
                {
                  title: g ? r.prev_page : null,
                  onClick: this.prev,
                  tabindex: W ? 0 : null,
                  onKeypress: this.runIfEnterPrev,
                  class: z(`${e}-prev`, { [`${e}-disabled`]: !W }),
                  'aria-disabled': !W
                },
                [this.renderPrev(le)]
              ),
              a(
                'li',
                { title: g ? `${l}/${s}` : null, class: `${e}-simple-pager` },
                [
                  a(
                    Ne,
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
                  a('span', { class: `${e}-slash` }, [Te('／')]),
                  s
                ]
              ),
              a(
                'li',
                {
                  title: g ? r.next_page : null,
                  onClick: this.next,
                  tabindex: K ? 0 : null,
                  onKeypress: this.runIfEnterNext,
                  class: z(`${e}-next`, { [`${e}-disabled`]: !K }),
                  'aria-disabled': !K
                },
                [this.renderNext(se)]
              ),
              A
            ]
          )
        )
      if (s <= 3 + w * 2) {
        const G = {
          locale: r,
          rootPrefixCls: e,
          showTitle: g,
          itemRender: o,
          onClick: this.handleChange,
          onKeypress: this.runIfEnter
        }
        s ||
          C.push(
            a(
              j,
              D(
                D({}, G),
                {},
                { key: 'noPager', page: 1, class: `${e}-item-disabled` }
              ),
              null
            )
          )
        for (let N = 1; N <= s; N += 1) {
          const B = l === N
          C.push(a(j, D(D({}, G), {}, { key: N, page: N, active: B }), null))
        }
      } else {
        const G = m ? r.prev_3 : r.prev_5,
          N = m ? r.next_3 : r.next_5
        h &&
          ((X = a(
            'li',
            {
              title: this.showTitle ? G : null,
              key: 'prev',
              onClick: this.jumpPrev,
              tabindex: '0',
              onKeypress: this.runIfEnterJumpPrev,
              class: z(`${e}-jump-prev`, {
                [`${e}-jump-prev-custom-icon`]: !!S
              })
            },
            [
              o({
                page: this.getJumpPrevPage(),
                type: 'jump-prev',
                originalElement: this.getItemIcon('jumpPrevIcon', 'prev page')
              })
            ]
          )),
          (re = a(
            'li',
            {
              title: this.showTitle ? N : null,
              key: 'next',
              tabindex: '0',
              onClick: this.jumpNext,
              onKeypress: this.runIfEnterJumpNext,
              class: z(`${e}-jump-next`, {
                [`${e}-jump-next-custom-icon`]: !!I
              })
            },
            [
              o({
                page: this.getJumpNextPage(),
                type: 'jump-next',
                originalElement: this.getItemIcon('jumpNextIcon', 'next page')
              })
            ]
          ))),
          (oe = a(
            j,
            {
              locale: r,
              last: !0,
              rootPrefixCls: e,
              onClick: this.handleChange,
              onKeypress: this.runIfEnter,
              key: s,
              page: s,
              active: !1,
              showTitle: g,
              itemRender: o
            },
            null
          )),
          (ae = a(
            j,
            {
              locale: r,
              rootPrefixCls: e,
              onClick: this.handleChange,
              onKeypress: this.runIfEnter,
              key: 1,
              page: 1,
              active: !1,
              showTitle: g,
              itemRender: o
            },
            null
          ))
        let B = Math.max(1, l - w),
          R = Math.min(l + w, s)
        l - 1 <= w && (R = 1 + w * 2), s - l <= w && (B = s - w * 2)
        for (let L = B; L <= R; L += 1) {
          const Ee = l === L
          C.push(
            a(
              j,
              {
                locale: r,
                rootPrefixCls: e,
                onClick: this.handleChange,
                onKeypress: this.runIfEnter,
                key: L,
                page: L,
                active: Ee,
                showTitle: g,
                itemRender: o
              },
              null
            )
          )
        }
        l - 1 >= w * 2 &&
          l !== 1 + 2 &&
          ((C[0] = a(
            j,
            {
              locale: r,
              rootPrefixCls: e,
              onClick: this.handleChange,
              onKeypress: this.runIfEnter,
              key: B,
              page: B,
              class: `${e}-item-after-jump-prev`,
              active: !1,
              showTitle: this.showTitle,
              itemRender: o
            },
            null
          )),
          C.unshift(X)),
          s - l >= w * 2 &&
            l !== s - 2 &&
            ((C[C.length - 1] = a(
              j,
              {
                locale: r,
                rootPrefixCls: e,
                onClick: this.handleChange,
                onKeypress: this.runIfEnter,
                key: R,
                page: R,
                class: `${e}-item-before-jump-next`,
                active: !1,
                showTitle: this.showTitle,
                itemRender: o
              },
              null
            )),
            C.push(re)),
          B !== 1 && C.unshift(ae),
          R !== s && C.push(oe)
      }
      let ce = null
      p &&
        (ce = a('li', { class: `${e}-total-text` }, [
          p(n, [n === 0 ? 0 : (l - 1) * b + 1, l * b > n ? n : l * b])
        ]))
      const Z = !W || !s,
        Y = !K || !s,
        Be = this.buildOptionText || this.$slots.buildOptionText
      return a(
        'ul',
        D(
          D({ unselectable: 'on', ref: 'paginationNode' }, O),
          {},
          { class: z({ [`${e}`]: !0, [`${e}-disabled`]: t }, v) }
        ),
        [
          ce,
          a(
            'li',
            {
              title: g ? r.prev_page : null,
              onClick: this.prev,
              tabindex: Z ? null : 0,
              onKeypress: this.runIfEnterPrev,
              class: z(`${e}-prev`, { [`${e}-disabled`]: Z }),
              'aria-disabled': Z
            },
            [this.renderPrev(le)]
          ),
          C,
          a(
            'li',
            {
              title: g ? r.next_page : null,
              onClick: this.next,
              tabindex: Y ? null : 0,
              onKeypress: this.runIfEnterNext,
              class: z(`${e}-next`, { [`${e}-disabled`]: Y }),
              'aria-disabled': Y
            },
            [this.renderNext(se)]
          ),
          a(
            yt,
            {
              disabled: t,
              locale: r,
              rootPrefixCls: e,
              selectComponentClass: f,
              selectPrefixCls: P,
              changeSize: this.getShowSizeChanger()
                ? this.changePageSize
                : null,
              current: l,
              pageSize: b,
              pageSizeOptions: $,
              buildOptionText: Be || null,
              quickGo: this.shouldDisplayQuickJumper()
                ? this.handleChange
                : null,
              goButton: V
            },
            null
          )
        ]
      )
    }
  }),
  wt = e => {
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
  Tt = e => {
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
          input: u(u({}, rt(e)), {
            width: e.paginationMiniQuickJumperInputWidth,
            height: e.controlHeightSM
          })
        }
      }
    }
  },
  Dt = e => {
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
  Nt = e => {
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
        '&:focus-visible': u(
          {
            [`${t}-item-link-icon`]: { opacity: 1 },
            [`${t}-item-ellipsis`]: { opacity: 0 }
          },
          pe(e)
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
        [`&:focus-visible ${t}-item-link`]: u({}, pe(e)),
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
          input: u(u({}, at(e)), {
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
  Bt = e => {
    const { componentCls: t } = e
    return {
      [`${t}-item`]: u(
        u(
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
          Re(e)
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
  Et = e => {
    const { componentCls: t } = e
    return {
      [t]: u(
        u(
          u(
            u(
              u(
                u(
                  u(u({}, ze(e)), {
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
                  Bt(e)
                ),
                Nt(e)
              ),
              Dt(e)
            ),
            Tt(e)
          ),
          wt(e)
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
  jt = e => {
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
  Mt = Ie('Pagination', e => {
    const t = Pe(
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
      nt(e)
    )
    return [Et(t), e.wireframe && jt(t)]
  })
var _t =
  (globalThis && globalThis.__rest) ||
  function(e, t) {
    var i = {}
    for (var n in e)
      Object.prototype.hasOwnProperty.call(e, n) &&
        t.indexOf(n) < 0 &&
        (i[n] = e[n])
    if (e != null && typeof Object.getOwnPropertySymbols == 'function')
      for (var r = 0, n = Object.getOwnPropertySymbols(e); r < n.length; r++)
        t.indexOf(n[r]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(e, n[r]) &&
          (i[n[r]] = e[n[r]])
    return i
  }
const At = () => ({
    total: Number,
    defaultCurrent: Number,
    disabled: F(),
    current: Number,
    defaultPageSize: Number,
    pageSize: Number,
    hideOnSinglePage: F(),
    showSizeChanger: F(),
    pageSizeOptions: Fe(),
    buildOptionText: E(),
    showQuickJumper: Xe([Boolean, Object]),
    showTotal: E(),
    size: Ve(),
    simple: F(),
    locale: Object,
    prefixCls: String,
    selectPrefixCls: String,
    totalBoundaryShowSizeChanger: Number,
    selectComponentClass: String,
    itemRender: E(),
    role: String,
    responsive: Boolean,
    showLessItems: F(),
    onChange: E(),
    onShowSizeChange: E(),
    'onUpdate:current': E(),
    'onUpdate:pageSize': E()
  }),
  Rt = _({
    compatConfig: { MODE: 3 },
    name: 'APagination',
    inheritAttrs: !1,
    props: At(),
    setup(e, t) {
      let { slots: i, attrs: n } = t
      const { prefixCls: r, configProvider: y, direction: m, size: g } = we(
          'pagination',
          e
        ),
        [p, c] = Mt(r),
        o = k(() => y.getPrefixCls('select', e.selectPrefixCls)),
        h = it(),
        [S] = Le('Pagination', He, qe(e, 'locale')),
        I = f => {
          const P = a('span', { class: `${f}-item-ellipsis` }, [Te('•••')]),
            $ = a(
              'button',
              { class: `${f}-item-link`, type: 'button', tabindex: -1 },
              [m.value === 'rtl' ? a(be, null, null) : a(Se, null, null)]
            ),
            l = a(
              'button',
              { class: `${f}-item-link`, type: 'button', tabindex: -1 },
              [m.value === 'rtl' ? a(Se, null, null) : a(be, null, null)]
            ),
            b = a('a', { rel: 'nofollow', class: `${f}-item-link` }, [
              a('div', { class: `${f}-item-container` }, [
                m.value === 'rtl'
                  ? a(xe, { class: `${f}-item-link-icon` }, null)
                  : a(Ce, { class: `${f}-item-link-icon` }, null),
                P
              ])
            ]),
            x = a('a', { rel: 'nofollow', class: `${f}-item-link` }, [
              a('div', { class: `${f}-item-container` }, [
                m.value === 'rtl'
                  ? a(Ce, { class: `${f}-item-link-icon` }, null)
                  : a(xe, { class: `${f}-item-link-icon` }, null),
                P
              ])
            ])
          return { prevIcon: $, nextIcon: l, jumpPrevIcon: b, jumpNextIcon: x }
        }
      return () => {
        var f
        const {
            itemRender: P = i.itemRender,
            buildOptionText: $ = i.buildOptionText,
            selectComponentClass: l,
            responsive: b
          } = e,
          x = _t(e, [
            'itemRender',
            'buildOptionText',
            'selectComponentClass',
            'responsive'
          ]),
          v =
            g.value === 'small' ||
            !!(
              !((f = h.value) === null || f === void 0) &&
              f.xs &&
              !g.value &&
              b
            ),
          O = u(
            u(
              u(u(u({}, x), I(r.value)), {
                prefixCls: r.value,
                selectPrefixCls: o.value,
                selectComponentClass: l || (v ? $t : Ct),
                locale: S.value,
                buildOptionText: $
              }),
              n
            ),
            {
              class: z(
                {
                  [`${r.value}-mini`]: v,
                  [`${r.value}-rtl`]: m.value === 'rtl'
                },
                n.class,
                c.value
              ),
              itemRender: P
            }
          )
        return p(a(zt, O, null))
      }
    }
  }),
  Gt = We(Rt)
export { Gt as P, be as R, U as S }

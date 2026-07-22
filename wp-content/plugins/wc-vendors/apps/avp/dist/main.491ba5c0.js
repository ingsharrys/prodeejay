import {
  d as M,
  o as xa,
  a as wa,
  w as Oa,
  c as C,
  u as Se,
  b as fr,
  F as Me,
  i as Le,
  C as Ta,
  T as Pa,
  e as w,
  f as ee,
  p as me,
  r as H,
  s as J,
  g as yo,
  j as le,
  k as $t,
  l as Ea,
  t as $a,
  h as _e,
  m as _a,
  q as _n,
  v as Aa,
  n as vo,
  x as bo,
  y as Qe,
  z as Ra,
  A as Co,
  B as dr,
  D as Ia,
  E as So,
  G as ja,
  H as ka,
  V as Na,
  P as Ma,
  I as La,
  J as Fa
} from './common/vendor.84fc1123.js'
import {
  T as L,
  g as Ze,
  b as Da,
  L as Ha,
  C as Ba,
  a as za,
  c as Ua,
  E as qa,
  I as Va,
  d as Wa,
  e as Ga,
  f as Xa,
  h as Ka
} from './common/antd.7f3c63f7.js'
const Ja = 'modulepreload',
  Ya = function(e, t) {
    return e[0] === '.' ? new URL(e, t).href : e
  },
  pr = {},
  Ct = function(t, n, r) {
    if (!n || n.length === 0) return t()
    const o = document.getElementsByTagName('link')
    return Promise.all(
      n.map(i => {
        if (((i = Ya(i, r)), i in pr)) return
        pr[i] = !0
        const a = i.endsWith('.css'),
          s = a ? '[rel="stylesheet"]' : ''
        if (!!r)
          for (let l = o.length - 1; l >= 0; l--) {
            const f = o[l]
            if (f.href === i && (!a || f.rel === 'stylesheet')) return
          }
        else if (document.querySelector(`link[href="${i}"]${s}`)) return
        const c = document.createElement('link')
        if (
          ((c.rel = a ? 'stylesheet' : Ja),
          a || ((c.as = 'script'), (c.crossOrigin = '')),
          (c.href = i),
          document.head.appendChild(c),
          a)
        )
          return new Promise((l, f) => {
            c.addEventListener('load', l),
              c.addEventListener('error', () =>
                f(new Error(`Unable to preload CSS for ${i}`))
              )
          })
      })
    )
      .then(() => t())
      .catch(i => {
        const a = new Event('vite:preloadError', { cancelable: !0 })
        if (((a.payload = i), window.dispatchEvent(a), !a.defaultPrevented))
          throw i
      })
  },
  Qa = M({
    __name: 'App',
    setup(e) {
      const t = fr(() =>
          Ct(
            () => import('./components/Admin.8f6492e9.js'),
            [
              window.wcv_avp.pluginDirUrl +
                '/dist/components/Admin.8f6492e9.js',
              window.wcv_avp.pluginDirUrl + '/dist/common/vendor.84fc1123.js',
              window.wcv_avp.pluginDirUrl +
                '/dist/common/_plugin-vue_export-helper.c27b6911.js'
            ],
            import.meta.url
          )
        ),
        n = fr(() =>
          Ct(
            () => import('./components/Spinner.939733c4.js'),
            [
              window.wcv_avp.pluginDirUrl +
                '/dist/components/Spinner.939733c4.js',
              window.wcv_avp.pluginDirUrl + '/dist/common/vendor.84fc1123.js',
              window.wcv_avp.pluginDirUrl + '/dist/common/index.e3da6296.js',
              window.wcv_avp.pluginDirUrl +
                '/dist/common/initDefaultProps.71991ecc.js',
              window.wcv_avp.pluginDirUrl + '/dist/common/antd.7f3c63f7.js'
            ],
            import.meta.url
          )
        )
      return (r, o) => (
        xa(), wa(Se(n), null, { default: Oa(() => [C(Se(t))]), _: 1 })
      )
    }
  })
function et(e) {
  '@babel/helpers - typeof'
  return (
    (et =
      typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
        ? function(t) {
            return typeof t
          }
        : function(t) {
            return t &&
              typeof Symbol == 'function' &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? 'symbol'
              : typeof t
          }),
    et(e)
  )
}
function Za(e, t) {
  if (et(e) !== 'object' || e === null) return e
  var n = e[Symbol.toPrimitive]
  if (n !== void 0) {
    var r = n.call(e, t || 'default')
    if (et(r) !== 'object') return r
    throw new TypeError('@@toPrimitive must return a primitive value.')
  }
  return (t === 'string' ? String : Number)(e)
}
function es(e) {
  var t = Za(e, 'string')
  return et(t) === 'symbol' ? t : String(t)
}
function ts(e, t, n) {
  return (
    (t = es(t)),
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
function mr(e, t) {
  var n = Object.keys(e)
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e)
    t &&
      (r = r.filter(function(o) {
        return Object.getOwnPropertyDescriptor(e, o).enumerable
      })),
      n.push.apply(n, r)
  }
  return n
}
function F(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {}
    t % 2
      ? mr(Object(n), !0).forEach(function(r) {
          ts(e, r, n[r])
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
      : mr(Object(n)).forEach(function(r) {
          Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r))
        })
  }
  return e
}
function v() {
  return (
    (v = Object.assign
      ? Object.assign.bind()
      : function(e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t]
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
          }
          return e
        }),
    v.apply(this, arguments)
  )
}
const ns = e => typeof e == 'function',
  rs = Array.isArray,
  os = e => typeof e == 'string',
  is = e => e !== null && typeof e == 'object',
  as = /^on[^a-z]/,
  ss = e => as.test(e),
  An = e => {
    const t = Object.create(null)
    return n => t[n] || (t[n] = e(n))
  },
  ls = /-(\w)/g,
  Rn = An(e => e.replace(ls, (t, n) => (n ? n.toUpperCase() : ''))),
  cs = /\B([A-Z])/g,
  us = An(e => e.replace(cs, '-$1').toLowerCase()),
  bp = An(e => e.charAt(0).toUpperCase() + e.slice(1)),
  fs = Object.prototype.hasOwnProperty,
  gr = (e, t) => fs.call(e, t)
function ds(e, t, n, r) {
  const o = e[n]
  if (o != null) {
    const i = gr(o, 'default')
    if (i && r === void 0) {
      const a = o.default
      r = o.type !== Function && ns(a) ? a() : a
    }
    o.type === Boolean && (!gr(t, n) && !i ? (r = !1) : r === '' && (r = !0))
  }
  return r
}
function Cp(e) {
  return typeof e == 'number' ? `${e}px` : e
}
function Te(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
    n = arguments.length > 2 ? arguments[2] : void 0
  return typeof e == 'function' ? e(t) : e ?? n
}
function ps(e) {
  let t
  const n = new Promise(o => {
      t = e(() => {
        o(!0)
      })
    }),
    r = () => {
      t == null || t()
    }
  return (r.then = (o, i) => n.then(o, i)), (r.promise = n), r
}
function U() {
  const e = []
  for (let t = 0; t < arguments.length; t++) {
    const n = t < 0 || arguments.length <= t ? void 0 : arguments[t]
    if (n) {
      if (os(n)) e.push(n)
      else if (rs(n))
        for (let r = 0; r < n.length; r++) {
          const o = U(n[r])
          o && e.push(o)
        }
      else if (is(n)) for (const r in n) n[r] && e.push(r)
    }
  }
  return e.join(' ')
}
const ms = e => e != null && e !== '',
  gs = ms,
  hs = e => {
    const t = Object.keys(e),
      n = {},
      r = {},
      o = {}
    for (let i = 0, a = t.length; i < a; i++) {
      const s = t[i]
      ss(s)
        ? ((n[s[2].toLowerCase() + s.slice(3)] = e[s]), (r[s] = e[s]))
        : (o[s] = e[s])
    }
    return { onEvents: r, events: n, extraAttrs: o }
  },
  ys = function() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : '',
      t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1
    const n = {},
      r = /;(?![^(]*\))/g,
      o = /:(.+)/
    return typeof e == 'object'
      ? e
      : (e.split(r).forEach(function(i) {
          if (i) {
            const a = i.split(o)
            if (a.length > 1) {
              const s = t ? Rn(a[0].trim()) : a[0].trim()
              n[s] = a[1].trim()
            }
          }
        }),
        n)
  },
  Sp = (e, t) => e[t] !== void 0,
  vs = Symbol('skipFlatten'),
  Ee = function() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [],
      t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0
    const n = Array.isArray(e) ? e : [e],
      r = []
    return (
      n.forEach(o => {
        Array.isArray(o)
          ? r.push(...Ee(o, t))
          : o && o.type === Me
          ? o.key === vs
            ? r.push(o)
            : r.push(...Ee(o.children, t))
          : o && Le(o)
          ? t && !xo(o)
            ? r.push(o)
            : t || r.push(o)
          : gs(o) && r.push(o)
      }),
      r
    )
  },
  xp = function(e) {
    let t =
        arguments.length > 1 && arguments[1] !== void 0
          ? arguments[1]
          : 'default',
      n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}
    if (Le(e))
      return e.type === Me
        ? t === 'default'
          ? Ee(e.children)
          : []
        : e.children && e.children[t]
        ? Ee(e.children[t](n))
        : []
    {
      const r = e.$slots[t] && e.$slots[t](n)
      return Ee(r)
    }
  },
  wp = e => {
    var t
    let n =
      ((t = e == null ? void 0 : e.vnode) === null || t === void 0
        ? void 0
        : t.el) ||
      (e && (e.$el || e))
    for (; n && !n.tagName; ) n = n.nextSibling
    return n
  },
  Op = e => {
    const t = {}
    if (e.$ && e.$.vnode) {
      const n = e.$.vnode.props || {}
      Object.keys(e.$props).forEach(r => {
        const o = e.$props[r],
          i = us(r)
        ;(o !== void 0 || i in n) && (t[r] = o)
      })
    } else if (Le(e) && typeof e.type == 'object') {
      const n = e.props || {},
        r = {}
      Object.keys(n).forEach(i => {
        r[Rn(i)] = n[i]
      })
      const o = e.type.props || {}
      Object.keys(o).forEach(i => {
        const a = ds(o, r, i, r[i])
        ;(a !== void 0 || i in r) && (t[i] = a)
      })
    }
    return t
  },
  Tp = function(e) {
    let t =
        arguments.length > 1 && arguments[1] !== void 0
          ? arguments[1]
          : 'default',
      n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : e,
      r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !0,
      o
    if (e.$) {
      const i = e[t]
      if (i !== void 0) return typeof i == 'function' && r ? i(n) : i
      ;(o = e.$slots[t]), (o = r && o ? o(n) : o)
    } else if (Le(e)) {
      const i = e.props && e.props[t]
      if (i !== void 0 && e.props !== null)
        return typeof i == 'function' && r ? i(n) : i
      e.type === Me
        ? (o = e.children)
        : e.children &&
          e.children[t] &&
          ((o = e.children[t]), (o = r && o ? o(n) : o))
    }
    return (
      Array.isArray(o) &&
        ((o = Ee(o)),
        (o = o.length === 1 ? o[0] : o),
        (o = o.length === 0 ? void 0 : o)),
      o
    )
  }
function Pp() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {},
    t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0,
    n = {}
  return (
    e.$ ? (n = v(v({}, n), e.$attrs)) : (n = v(v({}, n), e.props)),
    hs(n)[t ? 'onEvents' : 'events']
  )
}
function Ep(e) {
  const n = ((Le(e) ? e.props : e.$attrs) || {}).class || {}
  let r = {}
  return (
    typeof n == 'string'
      ? n.split(' ').forEach(o => {
          r[o.trim()] = !0
        })
      : Array.isArray(n)
      ? U(n)
          .split(' ')
          .forEach(o => {
            r[o.trim()] = !0
          })
      : (r = v(v({}, r), n)),
    r
  )
}
function $p(e, t) {
  let r = ((Le(e) ? e.props : e.$attrs) || {}).style || {}
  if (typeof r == 'string') r = ys(r, t)
  else if (t && r) {
    const o = {}
    return Object.keys(r).forEach(i => (o[Rn(i)] = r[i])), o
  }
  return r
}
function _p(e) {
  return e.length === 1 && e[0].type === Me
}
function xo(e) {
  return (
    e &&
    (e.type === Ta ||
      (e.type === Me && e.children.length === 0) ||
      (e.type === Pa && e.children.trim() === ''))
  )
}
function wo() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : []
  const t = []
  return (
    e.forEach(n => {
      Array.isArray(n)
        ? t.push(...n)
        : (n == null ? void 0 : n.type) === Me
        ? t.push(...wo(n.children))
        : t.push(n)
    }),
    t.filter(n => !xo(n))
  )
}
function Ap(e) {
  return (
    Array.isArray(e) && e.length === 1 && (e = e[0]),
    e && e.__v_isVNode && typeof e.type != 'symbol'
  )
}
function Rp(e, t) {
  let n =
    arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 'default'
  var r, o
  return (r = t[n]) !== null && r !== void 0
    ? r
    : (o = e[n]) === null || o === void 0
    ? void 0
    : o.call(e)
}
const bs = function() {
    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
      t[n] = arguments[n]
    return t
  },
  Ip = function() {
    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
      t[n] = arguments[n]
    return t
  },
  In = e => {
    const t = e
    return (
      (t.install = function(n) {
        n.component(t.displayName || t.name, e)
      }),
      e
    )
  }
function jp() {
  return { type: [Function, Array] }
}
function W(e) {
  return { type: Object, default: e }
}
function Jt(e) {
  return { type: Boolean, default: e }
}
function kp(e) {
  return { type: Function, default: e }
}
function sn(e, t) {
  const n = { validator: () => !0, default: e }
  return n
}
function hr(e) {
  return { type: Array, default: e }
}
function yr(e) {
  return { type: String, default: e }
}
function Cs(e, t) {
  return e ? { type: e, default: t } : sn(t)
}
const jn = 'anticon',
  Oo = Symbol('GlobalFormContextKey'),
  Ss = e => {
    me(Oo, e)
  },
  Np = () => ee(Oo, { validateMessages: w(() => {}) }),
  xs = () => ({
    iconPrefixCls: String,
    getTargetContainer: { type: Function },
    getPopupContainer: { type: Function },
    prefixCls: String,
    getPrefixCls: { type: Function },
    renderEmpty: { type: Function },
    transformCellText: { type: Function },
    csp: W(),
    input: W(),
    autoInsertSpaceInButton: { type: Boolean, default: void 0 },
    locale: W(),
    pageHeader: W(),
    componentSize: { type: String },
    componentDisabled: { type: Boolean, default: void 0 },
    direction: { type: String, default: 'ltr' },
    space: W(),
    virtual: { type: Boolean, default: void 0 },
    dropdownMatchSelectWidth: { type: [Number, Boolean], default: !0 },
    form: W(),
    pagination: W(),
    theme: W(),
    select: W(),
    wave: W()
  }),
  kn = Symbol('configProvider'),
  To = {
    getPrefixCls: (e, t) => t || (e ? `ant-${e}` : 'ant'),
    iconPrefixCls: w(() => jn),
    getPopupContainer: w(() => () => document.body),
    direction: w(() => 'ltr')
  },
  Po = () => ee(kn, To),
  ws = e => me(kn, e),
  Eo = Symbol('DisabledContextKey'),
  $o = () => ee(Eo, H(void 0)),
  Os = e => {
    const t = $o()
    return (
      me(
        Eo,
        w(() => {
          var n
          return (n = e.value) !== null && n !== void 0 ? n : t.value
        })
      ),
      e
    )
  },
  Ts = {
    items_per_page: '/ page',
    jump_to: 'Go to',
    jump_to_confirm: 'confirm',
    page: '',
    prev_page: 'Previous Page',
    next_page: 'Next Page',
    prev_5: 'Previous 5 Pages',
    next_5: 'Next 5 Pages',
    prev_3: 'Previous 3 Pages',
    next_3: 'Next 3 Pages'
  },
  Ps = {
    locale: 'en_US',
    today: 'Today',
    now: 'Now',
    backToToday: 'Back to today',
    ok: 'Ok',
    clear: 'Clear',
    month: 'Month',
    year: 'Year',
    timeSelect: 'select time',
    dateSelect: 'select date',
    weekSelect: 'Choose a week',
    monthSelect: 'Choose a month',
    yearSelect: 'Choose a year',
    decadeSelect: 'Choose a decade',
    yearFormat: 'YYYY',
    dateFormat: 'M/D/YYYY',
    dayFormat: 'D',
    dateTimeFormat: 'M/D/YYYY HH:mm:ss',
    monthBeforeYear: !0,
    previousMonth: 'Previous month (PageUp)',
    nextMonth: 'Next month (PageDown)',
    previousYear: 'Last year (Control + left)',
    nextYear: 'Next year (Control + right)',
    previousDecade: 'Last decade',
    nextDecade: 'Next decade',
    previousCentury: 'Last century',
    nextCentury: 'Next century'
  },
  Es = Ps,
  $s = {
    placeholder: 'Select time',
    rangePlaceholder: ['Start time', 'End time']
  },
  _o = $s,
  _s = {
    lang: v(
      {
        placeholder: 'Select date',
        yearPlaceholder: 'Select year',
        quarterPlaceholder: 'Select quarter',
        monthPlaceholder: 'Select month',
        weekPlaceholder: 'Select week',
        rangePlaceholder: ['Start date', 'End date'],
        rangeYearPlaceholder: ['Start year', 'End year'],
        rangeQuarterPlaceholder: ['Start quarter', 'End quarter'],
        rangeMonthPlaceholder: ['Start month', 'End month'],
        rangeWeekPlaceholder: ['Start week', 'End week']
      },
      Es
    ),
    timePickerLocale: v({}, _o)
  },
  vr = _s,
  V = '${label} is not a valid ${type}',
  As = {
    locale: 'en',
    Pagination: Ts,
    DatePicker: vr,
    TimePicker: _o,
    Calendar: vr,
    global: { placeholder: 'Please select' },
    Table: {
      filterTitle: 'Filter menu',
      filterConfirm: 'OK',
      filterReset: 'Reset',
      filterEmptyText: 'No filters',
      filterCheckall: 'Select all items',
      filterSearchPlaceholder: 'Search in filters',
      emptyText: 'No data',
      selectAll: 'Select current page',
      selectInvert: 'Invert current page',
      selectNone: 'Clear all data',
      selectionAll: 'Select all data',
      sortTitle: 'Sort',
      expand: 'Expand row',
      collapse: 'Collapse row',
      triggerDesc: 'Click to sort descending',
      triggerAsc: 'Click to sort ascending',
      cancelSort: 'Click to cancel sorting'
    },
    Tour: { Next: 'Next', Previous: 'Previous', Finish: 'Finish' },
    Modal: { okText: 'OK', cancelText: 'Cancel', justOkText: 'OK' },
    Popconfirm: { okText: 'OK', cancelText: 'Cancel' },
    Transfer: {
      titles: ['', ''],
      searchPlaceholder: 'Search here',
      itemUnit: 'item',
      itemsUnit: 'items',
      remove: 'Remove',
      selectCurrent: 'Select current page',
      removeCurrent: 'Remove current page',
      selectAll: 'Select all data',
      removeAll: 'Remove all data',
      selectInvert: 'Invert current page'
    },
    Upload: {
      uploading: 'Uploading...',
      removeFile: 'Remove file',
      uploadError: 'Upload error',
      previewFile: 'Preview file',
      downloadFile: 'Download file'
    },
    Empty: { description: 'No data' },
    Icon: { icon: 'icon' },
    Text: { edit: 'Edit', copy: 'Copy', copied: 'Copied', expand: 'Expand' },
    PageHeader: { back: 'Back' },
    Form: {
      optional: '(optional)',
      defaultValidateMessages: {
        default: 'Field validation error for ${label}',
        required: 'Please enter ${label}',
        enum: '${label} must be one of [${enum}]',
        whitespace: '${label} cannot be a blank character',
        date: {
          format: '${label} date format is invalid',
          parse: '${label} cannot be converted to a date',
          invalid: '${label} is an invalid date'
        },
        types: {
          string: V,
          method: V,
          array: V,
          object: V,
          number: V,
          date: V,
          boolean: V,
          integer: V,
          float: V,
          regexp: V,
          email: V,
          url: V,
          hex: V
        },
        string: {
          len: '${label} must be ${len} characters',
          min: '${label} must be at least ${min} characters',
          max: '${label} must be up to ${max} characters',
          range: '${label} must be between ${min}-${max} characters'
        },
        number: {
          len: '${label} must be equal to ${len}',
          min: '${label} must be minimum ${min}',
          max: '${label} must be maximum ${max}',
          range: '${label} must be between ${min}-${max}'
        },
        array: {
          len: 'Must be ${len} ${label}',
          min: 'At least ${min} ${label}',
          max: 'At most ${max} ${label}',
          range: 'The amount of ${label} must be between ${min}-${max}'
        },
        pattern: { mismatch: '${label} does not match the pattern ${pattern}' }
      }
    },
    Image: { preview: 'Preview' },
    QRCode: {
      expired: 'QR code expired',
      refresh: 'Refresh',
      scanned: 'Scanned'
    }
  },
  Ae = As,
  Ao = M({
    compatConfig: { MODE: 3 },
    name: 'LocaleReceiver',
    props: {
      componentName: String,
      defaultLocale: { type: [Object, Function] },
      children: { type: Function }
    },
    setup(e, t) {
      let { slots: n } = t
      const r = ee('localeData', {}),
        o = w(() => {
          const { componentName: a = 'global', defaultLocale: s } = e,
            u = s || Ae[a || 'global'],
            { antLocale: c } = r,
            l = a && c ? c[a] : {}
          return v(v({}, typeof u == 'function' ? u() : u), l || {})
        }),
        i = w(() => {
          const { antLocale: a } = r,
            s = a && a.locale
          return a && a.exist && !s ? Ae.locale : s
        })
      return () => {
        const a = e.children || n.default,
          { antLocale: s } = r
        return a == null ? void 0 : a(o.value, i.value, s)
      }
    }
  })
function Mp(e, t, n) {
  const r = ee('localeData', {})
  return [
    w(() => {
      const { antLocale: i } = r,
        a = Se(t) || Ae[e || 'global'],
        s = e && i ? i[e] : {}
      return v(v(v({}, typeof a == 'function' ? a() : a), s || {}), Se(n) || {})
    })
  ]
}
function Nn(e) {
  for (var t = 0, n, r = 0, o = e.length; o >= 4; ++r, o -= 4)
    (n =
      (e.charCodeAt(r) & 255) |
      ((e.charCodeAt(++r) & 255) << 8) |
      ((e.charCodeAt(++r) & 255) << 16) |
      ((e.charCodeAt(++r) & 255) << 24)),
      (n = (n & 65535) * 1540483477 + (((n >>> 16) * 59797) << 16)),
      (n ^= n >>> 24),
      (t =
        ((n & 65535) * 1540483477 + (((n >>> 16) * 59797) << 16)) ^
        ((t & 65535) * 1540483477 + (((t >>> 16) * 59797) << 16)))
  switch (o) {
    case 3:
      t ^= (e.charCodeAt(r + 2) & 255) << 16
    case 2:
      t ^= (e.charCodeAt(r + 1) & 255) << 8
    case 1:
      ;(t ^= e.charCodeAt(r) & 255),
        (t = (t & 65535) * 1540483477 + (((t >>> 16) * 59797) << 16))
  }
  return (
    (t ^= t >>> 13),
    (t = (t & 65535) * 1540483477 + (((t >>> 16) * 59797) << 16)),
    ((t ^ (t >>> 15)) >>> 0).toString(36)
  )
}
const br = '%'
class Rs {
  constructor(t) {
    ;(this.cache = new Map()), (this.instanceId = t)
  }
  get(t) {
    return this.cache.get(Array.isArray(t) ? t.join(br) : t) || null
  }
  update(t, n) {
    const r = Array.isArray(t) ? t.join(br) : t,
      o = this.cache.get(r),
      i = n(o)
    i === null ? this.cache.delete(r) : this.cache.set(r, i)
  }
}
const Is = Rs,
  Ro = 'data-token-hash',
  ye = 'data-css-hash',
  Pe = '__cssinjs_instance__'
function tt() {
  const e = Math.random()
    .toString(12)
    .slice(2)
  if (typeof document < 'u' && document.head && document.body) {
    const t = document.body.querySelectorAll(`style[${ye}]`) || [],
      { firstChild: n } = document.head
    Array.from(t).forEach(o => {
      ;(o[Pe] = o[Pe] || e), o[Pe] === e && document.head.insertBefore(o, n)
    })
    const r = {}
    Array.from(document.querySelectorAll(`style[${ye}]`)).forEach(o => {
      var i
      const a = o.getAttribute(ye)
      r[a]
        ? o[Pe] === e &&
          ((i = o.parentNode) === null || i === void 0 || i.removeChild(o))
        : (r[a] = !0)
    })
  }
  return new Is(e)
}
const Io = Symbol('StyleContextKey'),
  js = () => {
    var e, t, n
    const r = yo()
    let o
    if (r && r.appContext) {
      const i =
        (n =
          (t =
            (e = r.appContext) === null || e === void 0 ? void 0 : e.config) ===
            null || t === void 0
            ? void 0
            : t.globalProperties) === null || n === void 0
          ? void 0
          : n.__ANTDV_CSSINJS_CACHE__
      i
        ? (o = i)
        : ((o = tt()),
          r.appContext.config.globalProperties &&
            (r.appContext.config.globalProperties.__ANTDV_CSSINJS_CACHE__ = o))
    } else o = tt()
    return o
  },
  jo = { cache: tt(), defaultCache: !0, hashPriority: 'low' },
  _t = () => {
    const e = js()
    return ee(Io, J(v(v({}, jo), { cache: e })))
  },
  ks = e => {
    const t = _t(),
      n = J(v(v({}, jo), { cache: tt() }))
    return (
      le(
        [() => Se(e), t],
        () => {
          const r = v({}, t.value),
            o = Se(e)
          Object.keys(o).forEach(a => {
            const s = o[a]
            o[a] !== void 0 && (r[a] = s)
          })
          const { cache: i } = o
          ;(r.cache = r.cache || tt()),
            (r.defaultCache = !i && t.value.defaultCache),
            (n.value = r)
        },
        { immediate: !0 }
      ),
      me(Io, n),
      n
    )
  },
  Ns = () => ({
    autoClear: Jt(),
    mock: yr(),
    cache: W(),
    defaultCache: Jt(),
    hashPriority: yr(),
    container: Cs(),
    ssrInline: Jt(),
    transformers: hr(),
    linters: hr()
  })
In(
  M({
    name: 'AStyleProvider',
    inheritAttrs: !1,
    props: Ns(),
    setup(e, t) {
      let { slots: n } = t
      return (
        ks(e),
        () => {
          var r
          return (r = n.default) === null || r === void 0 ? void 0 : r.call(n)
        }
      )
    }
  })
)
function ko(e, t, n, r) {
  const o = _t(),
    i = J(''),
    a = J()
  $t(() => {
    i.value = [e, ...t.value].join('%')
  })
  const s = u => {
    o.value.cache.update(u, c => {
      const [l = 0, f] = c || []
      return l - 1 === 0 ? (r == null || r(f, !1), null) : [l - 1, f]
    })
  }
  return (
    le(
      i,
      (u, c) => {
        c && s(c),
          o.value.cache.update(u, l => {
            const [f = 0, d] = l || [],
              p = d || n()
            return [f + 1, p]
          }),
          (a.value = o.value.cache.get(i.value)[1])
      },
      { immediate: !0 }
    ),
    Ea(() => {
      s(i.value)
    }),
    a
  )
}
function Fe() {
  return !!(
    typeof window < 'u' &&
    window.document &&
    window.document.createElement
  )
}
function Ms(e, t) {
  return e && e.contains ? e.contains(t) : !1
}
const Cr = 'data-vc-order',
  Ls = 'vc-util-key',
  ln = new Map()
function No() {
  let { mark: e } =
    arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}
  return e ? (e.startsWith('data-') ? e : `data-${e}`) : Ls
}
function At(e) {
  return e.attachTo
    ? e.attachTo
    : document.querySelector('head') || document.body
}
function Fs(e) {
  return e === 'queue' ? 'prependQueue' : e ? 'prepend' : 'append'
}
function Mo(e) {
  return Array.from((ln.get(e) || e).children).filter(
    t => t.tagName === 'STYLE'
  )
}
function Lo(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}
  if (!Fe()) return null
  const { csp: n, prepend: r } = t,
    o = document.createElement('style')
  o.setAttribute(Cr, Fs(r)),
    n != null && n.nonce && (o.nonce = n == null ? void 0 : n.nonce),
    (o.innerHTML = e)
  const i = At(t),
    { firstChild: a } = i
  if (r) {
    if (r === 'queue') {
      const s = Mo(i).filter(u =>
        ['prepend', 'prependQueue'].includes(u.getAttribute(Cr))
      )
      if (s.length) return i.insertBefore(o, s[s.length - 1].nextSibling), o
    }
    i.insertBefore(o, a)
  } else i.appendChild(o)
  return o
}
function Fo(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}
  const n = At(t)
  return Mo(n).find(r => r.getAttribute(No(t)) === e)
}
function Do(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}
  const n = Fo(e, t)
  n && At(t).removeChild(n)
}
function Ds(e, t) {
  const n = ln.get(e)
  if (!n || !Ms(document, n)) {
    const r = Lo('', t),
      { parentNode: o } = r
    ln.set(e, o), e.removeChild(r)
  }
}
function St(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}
  var r, o, i
  const a = At(n)
  Ds(a, n)
  const s = Fo(t, n)
  if (s)
    return (
      !((r = n.csp) === null || r === void 0) &&
        r.nonce &&
        s.nonce !== ((o = n.csp) === null || o === void 0 ? void 0 : o.nonce) &&
        (s.nonce = (i = n.csp) === null || i === void 0 ? void 0 : i.nonce),
      s.innerHTML !== e && (s.innerHTML = e),
      s
    )
  const u = Lo(e, n)
  return u.setAttribute(No(n), t), u
}
function Hs(e, t) {
  if (e.length !== t.length) return !1
  for (let n = 0; n < e.length; n++) if (e[n] !== t[n]) return !1
  return !0
}
class Re {
  constructor() {
    ;(this.cache = new Map()), (this.keys = []), (this.cacheCallTimes = 0)
  }
  size() {
    return this.keys.length
  }
  internalGet(t) {
    let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1,
      r = { map: this.cache }
    return (
      t.forEach(o => {
        var i
        r
          ? (r =
              (i = r == null ? void 0 : r.map) === null || i === void 0
                ? void 0
                : i.get(o))
          : (r = void 0)
      }),
      r != null && r.value && n && (r.value[1] = this.cacheCallTimes++),
      r == null ? void 0 : r.value
    )
  }
  get(t) {
    var n
    return (n = this.internalGet(t, !0)) === null || n === void 0
      ? void 0
      : n[0]
  }
  has(t) {
    return !!this.internalGet(t)
  }
  set(t, n) {
    if (!this.has(t)) {
      if (this.size() + 1 > Re.MAX_CACHE_SIZE + Re.MAX_CACHE_OFFSET) {
        const [o] = this.keys.reduce(
          (i, a) => {
            const [, s] = i
            return this.internalGet(a)[1] < s ? [a, this.internalGet(a)[1]] : i
          },
          [this.keys[0], this.cacheCallTimes]
        )
        this.delete(o)
      }
      this.keys.push(t)
    }
    let r = this.cache
    t.forEach((o, i) => {
      if (i === t.length - 1) r.set(o, { value: [n, this.cacheCallTimes++] })
      else {
        const a = r.get(o)
        a ? a.map || (a.map = new Map()) : r.set(o, { map: new Map() }),
          (r = r.get(o).map)
      }
    })
  }
  deleteByPath(t, n) {
    var r
    const o = t.get(n[0])
    if (n.length === 1)
      return (
        o.map ? t.set(n[0], { map: o.map }) : t.delete(n[0]),
        (r = o.value) === null || r === void 0 ? void 0 : r[0]
      )
    const i = this.deleteByPath(o.map, n.slice(1))
    return (!o.map || o.map.size === 0) && !o.value && t.delete(n[0]), i
  }
  delete(t) {
    if (this.has(t))
      return (
        (this.keys = this.keys.filter(n => !Hs(n, t))),
        this.deleteByPath(this.cache, t)
      )
  }
}
Re.MAX_CACHE_SIZE = 20
Re.MAX_CACHE_OFFSET = 5
function Bs() {}
let zs = Bs
const Mn = zs
let Sr = 0
class Ho {
  constructor(t) {
    ;(this.derivatives = Array.isArray(t) ? t : [t]),
      (this.id = Sr),
      t.length === 0 && Mn(t.length > 0),
      (Sr += 1)
  }
  getDerivativeToken(t) {
    return this.derivatives.reduce((n, r) => r(t, n), void 0)
  }
}
const Yt = new Re()
function Bo(e) {
  const t = Array.isArray(e) ? e : [e]
  return Yt.has(t) || Yt.set(t, new Ho(t)), Yt.get(t)
}
const xr = new WeakMap()
function xt(e) {
  let t = xr.get(e) || ''
  return (
    t ||
      (Object.keys(e).forEach(n => {
        const r = e[n]
        ;(t += n),
          r instanceof Ho
            ? (t += r.id)
            : r && typeof r == 'object'
            ? (t += xt(r))
            : (t += r)
      }),
      xr.set(e, t)),
    t
  )
}
function Us(e, t) {
  return Nn(`${t}_${xt(e)}`)
}
const Ke = `random-${Date.now()}-${Math.random()}`.replace(/\./g, ''),
  zo = '_bAmBoO_'
function qs(e, t, n) {
  var r, o
  if (Fe()) {
    St(e, Ke)
    const i = document.createElement('div')
    ;(i.style.position = 'fixed'),
      (i.style.left = '0'),
      (i.style.top = '0'),
      t == null || t(i),
      document.body.appendChild(i)
    const a = n
      ? n(i)
      : (r = getComputedStyle(i).content) === null || r === void 0
      ? void 0
      : r.includes(zo)
    return (
      (o = i.parentNode) === null || o === void 0 || o.removeChild(i), Do(Ke), a
    )
  }
  return !1
}
let Qt
function Vs() {
  return (
    Qt === void 0 &&
      (Qt = qs(`@layer ${Ke} { .${Ke} { content: "${zo}"!important; } }`, e => {
        e.className = Ke
      })),
    Qt
  )
}
const wr = {},
  Ws = !0,
  Gs = !1,
  Xs = !Ws && !Gs ? 'css-dev-only-do-not-override' : 'css',
  ge = new Map()
function Ks(e) {
  ge.set(e, (ge.get(e) || 0) + 1)
}
function Js(e, t) {
  typeof document < 'u' &&
    document.querySelectorAll(`style[${Ro}="${e}"]`).forEach(r => {
      var o
      r[Pe] === t &&
        ((o = r.parentNode) === null || o === void 0 || o.removeChild(r))
    })
}
const Ys = 0
function Qs(e, t) {
  ge.set(e, (ge.get(e) || 0) - 1)
  const n = Array.from(ge.keys()),
    r = n.filter(o => (ge.get(o) || 0) <= 0)
  n.length - r.length > Ys &&
    r.forEach(o => {
      Js(o, t), ge.delete(o)
    })
}
const Zs = (e, t, n, r) => {
  const o = n.getDerivativeToken(e)
  let i = v(v({}, o), t)
  return r && (i = r(i)), i
}
function el(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : H({})
  const r = _t(),
    o = w(() => v({}, ...t.value)),
    i = w(() => xt(o.value)),
    a = w(() => xt(n.value.override || wr))
  return ko(
    'token',
    w(() => [n.value.salt || '', e.value.id, i.value, a.value]),
    () => {
      const {
          salt: u = '',
          override: c = wr,
          formatToken: l,
          getComputedToken: f
        } = n.value,
        d = f ? f(o.value, c, e.value) : Zs(o.value, c, e.value, l),
        m = Us(d, u)
      ;(d._tokenKey = m), Ks(m)
      const p = `${Xs}-${Nn(m)}`
      return (d._hashId = p), [d, p]
    },
    u => {
      var c
      Qs(
        u[0]._tokenKey,
        (c = r.value) === null || c === void 0 ? void 0 : c.cache.instanceId
      )
    }
  )
}
var tl = {
    animationIterationCount: 1,
    aspectRatio: 1,
    borderImageOutset: 1,
    borderImageSlice: 1,
    borderImageWidth: 1,
    boxFlex: 1,
    boxFlexGroup: 1,
    boxOrdinalGroup: 1,
    columnCount: 1,
    columns: 1,
    flex: 1,
    flexGrow: 1,
    flexPositive: 1,
    flexShrink: 1,
    flexNegative: 1,
    flexOrder: 1,
    gridRow: 1,
    gridRowEnd: 1,
    gridRowSpan: 1,
    gridRowStart: 1,
    gridColumn: 1,
    gridColumnEnd: 1,
    gridColumnSpan: 1,
    gridColumnStart: 1,
    msGridRow: 1,
    msGridRowSpan: 1,
    msGridColumn: 1,
    msGridColumnSpan: 1,
    fontWeight: 1,
    lineHeight: 1,
    opacity: 1,
    order: 1,
    orphans: 1,
    tabSize: 1,
    widows: 1,
    zIndex: 1,
    zoom: 1,
    WebkitLineClamp: 1,
    fillOpacity: 1,
    floodOpacity: 1,
    stopOpacity: 1,
    strokeDasharray: 1,
    strokeDashoffset: 1,
    strokeMiterlimit: 1,
    strokeOpacity: 1,
    strokeWidth: 1
  },
  Uo = 'comm',
  qo = 'rule',
  Vo = 'decl',
  nl = '@import',
  rl = '@keyframes',
  ol = '@layer',
  il = Math.abs,
  Ln = String.fromCharCode
function Wo(e) {
  return e.trim()
}
function ut(e, t, n) {
  return e.replace(t, n)
}
function al(e, t) {
  return e.indexOf(t)
}
function nt(e, t) {
  return e.charCodeAt(t) | 0
}
function rt(e, t, n) {
  return e.slice(t, n)
}
function pe(e) {
  return e.length
}
function Go(e) {
  return e.length
}
function lt(e, t) {
  return t.push(e), e
}
var Rt = 1,
  Ie = 1,
  Xo = 0,
  K = 0,
  j = 0,
  De = ''
function Fn(e, t, n, r, o, i, a) {
  return {
    value: e,
    root: t,
    parent: n,
    type: r,
    props: o,
    children: i,
    line: Rt,
    column: Ie,
    length: a,
    return: ''
  }
}
function sl() {
  return j
}
function ll() {
  return (j = K > 0 ? nt(De, --K) : 0), Ie--, j === 10 && ((Ie = 1), Rt--), j
}
function Y() {
  return (j = K < Xo ? nt(De, K++) : 0), Ie++, j === 10 && ((Ie = 1), Rt++), j
}
function ve() {
  return nt(De, K)
}
function ft() {
  return K
}
function It(e, t) {
  return rt(De, e, t)
}
function cn(e) {
  switch (e) {
    case 0:
    case 9:
    case 10:
    case 13:
    case 32:
      return 5
    case 33:
    case 43:
    case 44:
    case 47:
    case 62:
    case 64:
    case 126:
    case 59:
    case 123:
    case 125:
      return 4
    case 58:
      return 3
    case 34:
    case 39:
    case 40:
    case 91:
      return 2
    case 41:
    case 93:
      return 1
  }
  return 0
}
function cl(e) {
  return (Rt = Ie = 1), (Xo = pe((De = e))), (K = 0), []
}
function ul(e) {
  return (De = ''), e
}
function Zt(e) {
  return Wo(It(K - 1, un(e === 91 ? e + 2 : e === 40 ? e + 1 : e)))
}
function fl(e) {
  for (; (j = ve()) && j < 33; ) Y()
  return cn(e) > 2 || cn(j) > 3 ? '' : ' '
}
function dl(e, t) {
  for (
    ;
    --t &&
    Y() &&
    !(j < 48 || j > 102 || (j > 57 && j < 65) || (j > 70 && j < 97));

  );
  return It(e, ft() + (t < 6 && ve() == 32 && Y() == 32))
}
function un(e) {
  for (; Y(); )
    switch (j) {
      case e:
        return K
      case 34:
      case 39:
        e !== 34 && e !== 39 && un(j)
        break
      case 40:
        e === 41 && un(e)
        break
      case 92:
        Y()
        break
    }
  return K
}
function pl(e, t) {
  for (; Y() && e + j !== 47 + 10; ) if (e + j === 42 + 42 && ve() === 47) break
  return '/*' + It(t, K - 1) + '*' + Ln(e === 47 ? e : Y())
}
function ml(e) {
  for (; !cn(ve()); ) Y()
  return It(e, K)
}
function gl(e) {
  return ul(dt('', null, null, null, [''], (e = cl(e)), 0, [0], e))
}
function dt(e, t, n, r, o, i, a, s, u) {
  for (
    var c = 0,
      l = 0,
      f = a,
      d = 0,
      m = 0,
      p = 0,
      g = 1,
      S = 1,
      b = 1,
      O = 0,
      T = '',
      P = o,
      E = i,
      $ = r,
      y = T;
    S;

  )
    switch (((p = O), (O = Y()))) {
      case 40:
        if (p != 108 && nt(y, f - 1) == 58) {
          al((y += ut(Zt(O), '&', '&\f')), '&\f') != -1 && (b = -1)
          break
        }
      case 34:
      case 39:
      case 91:
        y += Zt(O)
        break
      case 9:
      case 10:
      case 13:
      case 32:
        y += fl(p)
        break
      case 92:
        y += dl(ft() - 1, 7)
        continue
      case 47:
        switch (ve()) {
          case 42:
          case 47:
            lt(hl(pl(Y(), ft()), t, n), u)
            break
          default:
            y += '/'
        }
        break
      case 123 * g:
        s[c++] = pe(y) * b
      case 125 * g:
      case 59:
      case 0:
        switch (O) {
          case 0:
          case 125:
            S = 0
          case 59 + l:
            b == -1 && (y = ut(y, /\f/g, '')),
              m > 0 &&
                pe(y) - f &&
                lt(
                  m > 32
                    ? Tr(y + ';', r, n, f - 1)
                    : Tr(ut(y, ' ', '') + ';', r, n, f - 2),
                  u
                )
            break
          case 59:
            y += ';'
          default:
            if (
              (lt(($ = Or(y, t, n, c, l, o, s, T, (P = []), (E = []), f)), i),
              O === 123)
            )
              if (l === 0) dt(y, t, $, $, P, i, f, s, E)
              else
                switch (d === 99 && nt(y, 3) === 110 ? 100 : d) {
                  case 100:
                  case 108:
                  case 109:
                  case 115:
                    dt(
                      e,
                      $,
                      $,
                      r && lt(Or(e, $, $, 0, 0, o, s, T, o, (P = []), f), E),
                      o,
                      E,
                      f,
                      s,
                      r ? P : E
                    )
                    break
                  default:
                    dt(y, $, $, $, [''], E, 0, s, E)
                }
        }
        ;(c = l = m = 0), (g = b = 1), (T = y = ''), (f = a)
        break
      case 58:
        ;(f = 1 + pe(y)), (m = p)
      default:
        if (g < 1) {
          if (O == 123) --g
          else if (O == 125 && g++ == 0 && ll() == 125) continue
        }
        switch (((y += Ln(O)), O * g)) {
          case 38:
            b = l > 0 ? 1 : ((y += '\f'), -1)
            break
          case 44:
            ;(s[c++] = (pe(y) - 1) * b), (b = 1)
            break
          case 64:
            ve() === 45 && (y += Zt(Y())),
              (d = ve()),
              (l = f = pe((T = y += ml(ft())))),
              O++
            break
          case 45:
            p === 45 && pe(y) == 2 && (g = 0)
        }
    }
  return i
}
function Or(e, t, n, r, o, i, a, s, u, c, l) {
  for (
    var f = o - 1, d = o === 0 ? i : [''], m = Go(d), p = 0, g = 0, S = 0;
    p < r;
    ++p
  )
    for (var b = 0, O = rt(e, f + 1, (f = il((g = a[p])))), T = e; b < m; ++b)
      (T = Wo(g > 0 ? d[b] + ' ' + O : ut(O, /&\f/g, d[b]))) && (u[S++] = T)
  return Fn(e, t, n, o === 0 ? qo : s, u, c, l)
}
function hl(e, t, n) {
  return Fn(e, t, n, Uo, Ln(sl()), rt(e, 2, -2), 0)
}
function Tr(e, t, n, r) {
  return Fn(e, t, n, Vo, rt(e, 0, r), rt(e, r + 1, -1), r)
}
function fn(e, t) {
  for (var n = '', r = Go(e), o = 0; o < r; o++) n += t(e[o], o, e, t) || ''
  return n
}
function yl(e, t, n, r) {
  switch (e.type) {
    case ol:
      if (e.children.length) break
    case nl:
    case Vo:
      return (e.return = e.return || e.value)
    case Uo:
      return ''
    case rl:
      return (e.return = e.value + '{' + fn(e.children, r) + '}')
    case qo:
      e.value = e.props.join(',')
  }
  return pe((n = fn(e.children, r))) ? (e.return = e.value + '{' + n + '}') : ''
}
const Pr = 'data-ant-cssinjs-cache-path',
  vl = '_FILE_STYLE__'
let be,
  Ko = !0
function bl() {
  var e
  if (!be && ((be = {}), Fe())) {
    const t = document.createElement('div')
    ;(t.className = Pr),
      (t.style.position = 'fixed'),
      (t.style.visibility = 'hidden'),
      (t.style.top = '-9999px'),
      document.body.appendChild(t)
    let n = getComputedStyle(t).content || ''
    ;(n = n.replace(/^"/, '').replace(/"$/, '')),
      n.split(';').forEach(o => {
        const [i, a] = o.split(':')
        be[i] = a
      })
    const r = document.querySelector(`style[${Pr}]`)
    r &&
      ((Ko = !1),
      (e = r.parentNode) === null || e === void 0 || e.removeChild(r)),
      document.body.removeChild(t)
  }
}
function Cl(e) {
  return bl(), !!be[e]
}
function Sl(e) {
  const t = be[e]
  let n = null
  if (t && Fe())
    if (Ko) n = vl
    else {
      const r = document.querySelector(`style[${ye}="${be[e]}"]`)
      r ? (n = r.innerHTML) : delete be[e]
    }
  return [n, t]
}
const Er = Fe(),
  xl = '_skip_check_',
  Jo = '_multi_value_'
function $r(e) {
  return fn(gl(e), yl).replace(/\{%%%\:[^;];}/g, ';')
}
function wl(e) {
  return typeof e == 'object' && e && (xl in e || Jo in e)
}
function Ol(e, t, n) {
  if (!t) return e
  const r = `.${t}`,
    o = n === 'low' ? `:where(${r})` : r
  return e
    .split(',')
    .map(a => {
      var s
      const u = a.trim().split(/\s+/)
      let c = u[0] || ''
      const l =
        ((s = c.match(/^\w+/)) === null || s === void 0 ? void 0 : s[0]) || ''
      return (c = `${l}${o}${c.slice(l.length)}`), [c, ...u.slice(1)].join(' ')
    })
    .join(',')
}
const _r = new Set(),
  dn = function(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
      { root: n, injectHash: r, parentSelectors: o } =
        arguments.length > 2 && arguments[2] !== void 0
          ? arguments[2]
          : { root: !0, parentSelectors: [] }
    const {
      hashId: i,
      layer: a,
      path: s,
      hashPriority: u,
      transformers: c = [],
      linters: l = []
    } = t
    let f = '',
      d = {}
    function m(S) {
      const b = S.getName(i)
      if (!d[b]) {
        const [O] = dn(S.style, t, { root: !1, parentSelectors: o })
        d[b] = `@keyframes ${S.getName(i)}${O}`
      }
    }
    function p(S) {
      let b =
        arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : []
      return (
        S.forEach(O => {
          Array.isArray(O) ? p(O, b) : O && b.push(O)
        }),
        b
      )
    }
    if (
      (p(Array.isArray(e) ? e : [e]).forEach(S => {
        const b = typeof S == 'string' && !n ? {} : S
        if (typeof b == 'string')
          f += `${b}
`
        else if (b._keyframe) m(b)
        else {
          const O = c.reduce((T, P) => {
            var E
            return (
              ((E = P == null ? void 0 : P.visit) === null || E === void 0
                ? void 0
                : E.call(P, T)) || T
            )
          }, b)
          Object.keys(O).forEach(T => {
            var P
            const E = O[T]
            if (
              typeof E == 'object' &&
              E &&
              (T !== 'animationName' || !E._keyframe) &&
              !wl(E)
            ) {
              let $ = !1,
                y = T.trim(),
                _ = !1
              ;(n || r) && i
                ? y.startsWith('@')
                  ? ($ = !0)
                  : (y = Ol(T, i, u))
                : n && !i && (y === '&' || y === '') && ((y = ''), (_ = !0))
              const [I, q] = dn(E, t, {
                root: _,
                injectHash: $,
                parentSelectors: [...o, y]
              })
              ;(d = v(v({}, d), q)), (f += `${y}${I}`)
            } else {
              let $ = function(_, I) {
                const q = _.replace(/[A-Z]/g, re => `-${re.toLowerCase()}`)
                let ne = I
                !tl[_] && typeof ne == 'number' && ne !== 0 && (ne = `${ne}px`),
                  _ === 'animationName' &&
                    I != null && I._keyframe &&
                    (m(I), (ne = I.getName(i))),
                  (f += `${q}:${ne};`)
              }
              const y =
                (P = E == null ? void 0 : E.value) !== null && P !== void 0
                  ? P
                  : E
              typeof E == 'object' && E != null && E[Jo] && Array.isArray(y)
                ? y.forEach(_ => {
                    $(T, _)
                  })
                : $(T, y)
            }
          })
        }
      }),
      !n)
    )
      f = `{${f}}`
    else if (a && Vs()) {
      const S = a.split(',')
      ;(f = `@layer ${S[S.length - 1].trim()} {${f}}`),
        S.length > 1 && (f = `@layer ${a}{%%%:%}${f}`)
    }
    return [f, d]
  }
function Tl(e, t) {
  return Nn(`${e.join('%')}${t}`)
}
function pn(e, t) {
  const n = _t(),
    r = w(() => e.value.token._tokenKey),
    o = w(() => [r.value, ...e.value.path])
  let i = Er
  return (
    ko(
      'style',
      o,
      () => {
        const {
            path: a,
            hashId: s,
            layer: u,
            nonce: c,
            clientOnly: l,
            order: f = 0
          } = e.value,
          d = o.value.join('|')
        if (Cl(d)) {
          const [y, _] = Sl(d)
          if (y) return [y, r.value, _, {}, l, f]
        }
        const m = t(),
          {
            hashPriority: p,
            container: g,
            transformers: S,
            linters: b,
            cache: O
          } = n.value,
          [T, P] = dn(m, {
            hashId: s,
            hashPriority: p,
            layer: u,
            path: a.join('-'),
            transformers: S,
            linters: b
          }),
          E = $r(T),
          $ = Tl(o.value, E)
        if (i) {
          const y = { mark: ye, prepend: 'queue', attachTo: g, priority: f },
            _ = typeof c == 'function' ? c() : c
          _ && (y.csp = { nonce: _ })
          const I = St(E, $, y)
          ;(I[Pe] = O.instanceId),
            I.setAttribute(Ro, r.value),
            Object.keys(P).forEach(q => {
              _r.has(q) ||
                (_r.add(q),
                St($r(P[q]), `_effect-${q}`, {
                  mark: ye,
                  prepend: 'queue',
                  attachTo: g
                }))
            })
        }
        return [E, r.value, $, P, l, f]
      },
      (a, s) => {
        let [, , u] = a
        ;(s || n.value.autoClear) && Er && Do(u, { mark: ye })
      }
    ),
    a => a
  )
}
class Pl {
  constructor(t, n) {
    ;(this._keyframe = !0), (this.name = t), (this.style = n)
  }
  getName() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : ''
    return t ? `${t}-${this.name}` : this.name
  }
}
const Ce = Pl,
  El = '4.2.6',
  $l = e => {
    const { controlHeight: t } = e
    return {
      controlHeightSM: t * 0.75,
      controlHeightXS: t * 0.5,
      controlHeightLG: t * 1.25
    }
  },
  _l = $l
function Al(e) {
  const { sizeUnit: t, sizeStep: n } = e
  return {
    sizeXXL: t * (n + 8),
    sizeXL: t * (n + 4),
    sizeLG: t * (n + 2),
    sizeMD: t * (n + 1),
    sizeMS: t * n,
    size: t * n,
    sizeSM: t * (n - 1),
    sizeXS: t * (n - 2),
    sizeXXS: t * (n - 3)
  }
}
const Yo = {
    blue: '#1677ff',
    purple: '#722ED1',
    cyan: '#13C2C2',
    green: '#52C41A',
    magenta: '#EB2F96',
    pink: '#eb2f96',
    red: '#F5222D',
    orange: '#FA8C16',
    yellow: '#FADB14',
    volcano: '#FA541C',
    geekblue: '#2F54EB',
    gold: '#FAAD14',
    lime: '#A0D911'
  },
  Rl = v(v({}, Yo), {
    colorPrimary: '#1677ff',
    colorSuccess: '#52c41a',
    colorWarning: '#faad14',
    colorError: '#ff4d4f',
    colorInfo: '#1677ff',
    colorTextBase: '',
    colorBgBase: '',
    fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
'Noto Color Emoji'`,
    fontSize: 14,
    lineWidth: 1,
    lineType: 'solid',
    motionUnit: 0.1,
    motionBase: 0,
    motionEaseOutCirc: 'cubic-bezier(0.08, 0.82, 0.17, 1)',
    motionEaseInOutCirc: 'cubic-bezier(0.78, 0.14, 0.15, 0.86)',
    motionEaseOut: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
    motionEaseInOut: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
    motionEaseOutBack: 'cubic-bezier(0.12, 0.4, 0.29, 1.46)',
    motionEaseInBack: 'cubic-bezier(0.71, -0.46, 0.88, 0.6)',
    motionEaseInQuint: 'cubic-bezier(0.755, 0.05, 0.855, 0.06)',
    motionEaseOutQuint: 'cubic-bezier(0.23, 1, 0.32, 1)',
    borderRadius: 6,
    sizeUnit: 4,
    sizeStep: 4,
    sizePopupArrow: 16,
    controlHeight: 32,
    zIndexBase: 0,
    zIndexPopupBase: 1e3,
    opacityImage: 1,
    wireframe: !1
  }),
  jt = Rl
function Il(e, t) {
  let { generateColorPalettes: n, generateNeutralColorPalettes: r } = t
  const {
      colorSuccess: o,
      colorWarning: i,
      colorError: a,
      colorInfo: s,
      colorPrimary: u,
      colorBgBase: c,
      colorTextBase: l
    } = e,
    f = n(u),
    d = n(o),
    m = n(i),
    p = n(a),
    g = n(s),
    S = r(c, l)
  return v(v({}, S), {
    colorPrimaryBg: f[1],
    colorPrimaryBgHover: f[2],
    colorPrimaryBorder: f[3],
    colorPrimaryBorderHover: f[4],
    colorPrimaryHover: f[5],
    colorPrimary: f[6],
    colorPrimaryActive: f[7],
    colorPrimaryTextHover: f[8],
    colorPrimaryText: f[9],
    colorPrimaryTextActive: f[10],
    colorSuccessBg: d[1],
    colorSuccessBgHover: d[2],
    colorSuccessBorder: d[3],
    colorSuccessBorderHover: d[4],
    colorSuccessHover: d[4],
    colorSuccess: d[6],
    colorSuccessActive: d[7],
    colorSuccessTextHover: d[8],
    colorSuccessText: d[9],
    colorSuccessTextActive: d[10],
    colorErrorBg: p[1],
    colorErrorBgHover: p[2],
    colorErrorBorder: p[3],
    colorErrorBorderHover: p[4],
    colorErrorHover: p[5],
    colorError: p[6],
    colorErrorActive: p[7],
    colorErrorTextHover: p[8],
    colorErrorText: p[9],
    colorErrorTextActive: p[10],
    colorWarningBg: m[1],
    colorWarningBgHover: m[2],
    colorWarningBorder: m[3],
    colorWarningBorderHover: m[4],
    colorWarningHover: m[4],
    colorWarning: m[6],
    colorWarningActive: m[7],
    colorWarningTextHover: m[8],
    colorWarningText: m[9],
    colorWarningTextActive: m[10],
    colorInfoBg: g[1],
    colorInfoBgHover: g[2],
    colorInfoBorder: g[3],
    colorInfoBorderHover: g[4],
    colorInfoHover: g[4],
    colorInfo: g[6],
    colorInfoActive: g[7],
    colorInfoTextHover: g[8],
    colorInfoText: g[9],
    colorInfoTextActive: g[10],
    colorBgMask: new L('#000').setAlpha(0.45).toRgbString(),
    colorWhite: '#fff'
  })
}
const jl = e => {
    let t = e,
      n = e,
      r = e,
      o = e
    return (
      e < 6 && e >= 5
        ? (t = e + 1)
        : e < 16 && e >= 6
        ? (t = e + 2)
        : e >= 16 && (t = 16),
      e < 7 && e >= 5
        ? (n = 4)
        : e < 8 && e >= 7
        ? (n = 5)
        : e < 14 && e >= 8
        ? (n = 6)
        : e < 16 && e >= 14
        ? (n = 7)
        : e >= 16 && (n = 8),
      e < 6 && e >= 2 ? (r = 1) : e >= 6 && (r = 2),
      e > 4 && e < 8 ? (o = 4) : e >= 8 && (o = 6),
      {
        borderRadius: e > 16 ? 16 : e,
        borderRadiusXS: r,
        borderRadiusSM: n,
        borderRadiusLG: t,
        borderRadiusOuter: o
      }
    )
  },
  kl = jl
function Nl(e) {
  const { motionUnit: t, motionBase: n, borderRadius: r, lineWidth: o } = e
  return v(
    {
      motionDurationFast: `${(n + t).toFixed(1)}s`,
      motionDurationMid: `${(n + t * 2).toFixed(1)}s`,
      motionDurationSlow: `${(n + t * 3).toFixed(1)}s`,
      lineWidthBold: o + 1
    },
    kl(r)
  )
}
const se = (e, t) => new L(e).setAlpha(t).toRgbString(),
  Ve = (e, t) => new L(e).darken(t).toHexString(),
  Ml = e => {
    const t = Ze(e)
    return {
      1: t[0],
      2: t[1],
      3: t[2],
      4: t[3],
      5: t[4],
      6: t[5],
      7: t[6],
      8: t[4],
      9: t[5],
      10: t[6]
    }
  },
  Ll = (e, t) => {
    const n = e || '#fff',
      r = t || '#000'
    return {
      colorBgBase: n,
      colorTextBase: r,
      colorText: se(r, 0.88),
      colorTextSecondary: se(r, 0.65),
      colorTextTertiary: se(r, 0.45),
      colorTextQuaternary: se(r, 0.25),
      colorFill: se(r, 0.15),
      colorFillSecondary: se(r, 0.06),
      colorFillTertiary: se(r, 0.04),
      colorFillQuaternary: se(r, 0.02),
      colorBgLayout: Ve(n, 4),
      colorBgContainer: Ve(n, 0),
      colorBgElevated: Ve(n, 0),
      colorBgSpotlight: se(r, 0.85),
      colorBorder: Ve(n, 15),
      colorBorderSecondary: Ve(n, 6)
    }
  }
function Fl(e) {
  const t = new Array(10).fill(null).map((n, r) => {
    const o = r - 1,
      i = e * Math.pow(2.71828, o / 5),
      a = r > 1 ? Math.floor(i) : Math.ceil(i)
    return Math.floor(a / 2) * 2
  })
  return (
    (t[1] = e),
    t.map(n => {
      const r = n + 8
      return { size: n, lineHeight: r / n }
    })
  )
}
const Dl = e => {
    const t = Fl(e),
      n = t.map(o => o.size),
      r = t.map(o => o.lineHeight)
    return {
      fontSizeSM: n[0],
      fontSize: n[1],
      fontSizeLG: n[2],
      fontSizeXL: n[3],
      fontSizeHeading1: n[6],
      fontSizeHeading2: n[5],
      fontSizeHeading3: n[4],
      fontSizeHeading4: n[3],
      fontSizeHeading5: n[2],
      lineHeight: r[1],
      lineHeightLG: r[2],
      lineHeightSM: r[0],
      lineHeightHeading1: r[6],
      lineHeightHeading2: r[5],
      lineHeightHeading3: r[4],
      lineHeightHeading4: r[3],
      lineHeightHeading5: r[2]
    }
  },
  Hl = Dl
function Bl(e) {
  const t = Object.keys(Yo)
    .map(n => {
      const r = Ze(e[n])
      return new Array(10)
        .fill(1)
        .reduce((o, i, a) => ((o[`${n}-${a + 1}`] = r[a]), o), {})
    })
    .reduce((n, r) => ((n = v(v({}, n), r)), n), {})
  return v(
    v(
      v(
        v(
          v(
            v(v({}, e), t),
            Il(e, {
              generateColorPalettes: Ml,
              generateNeutralColorPalettes: Ll
            })
          ),
          Hl(e.fontSize)
        ),
        Al(e)
      ),
      _l(e)
    ),
    Nl(e)
  )
}
function en(e) {
  return e >= 0 && e <= 255
}
function ct(e, t) {
  const { r: n, g: r, b: o, a: i } = new L(e).toRgb()
  if (i < 1) return e
  const { r: a, g: s, b: u } = new L(t).toRgb()
  for (let c = 0.01; c <= 1; c += 0.01) {
    const l = Math.round((n - a * (1 - c)) / c),
      f = Math.round((r - s * (1 - c)) / c),
      d = Math.round((o - u * (1 - c)) / c)
    if (en(l) && en(f) && en(d))
      return new L({
        r: l,
        g: f,
        b: d,
        a: Math.round(c * 100) / 100
      }).toRgbString()
  }
  return new L({ r: n, g: r, b: o, a: 1 }).toRgbString()
}
var zl =
  (globalThis && globalThis.__rest) ||
  function(e, t) {
    var n = {}
    for (var r in e)
      Object.prototype.hasOwnProperty.call(e, r) &&
        t.indexOf(r) < 0 &&
        (n[r] = e[r])
    if (e != null && typeof Object.getOwnPropertySymbols == 'function')
      for (var o = 0, r = Object.getOwnPropertySymbols(e); o < r.length; o++)
        t.indexOf(r[o]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(e, r[o]) &&
          (n[r[o]] = e[r[o]])
    return n
  }
function Ul(e) {
  const { override: t } = e,
    n = zl(e, ['override']),
    r = v({}, t)
  Object.keys(jt).forEach(m => {
    delete r[m]
  })
  const o = v(v({}, n), r),
    i = 480,
    a = 576,
    s = 768,
    u = 992,
    c = 1200,
    l = 1600,
    f = 2e3
  return v(
    v(v({}, o), {
      colorLink: o.colorInfoText,
      colorLinkHover: o.colorInfoHover,
      colorLinkActive: o.colorInfoActive,
      colorFillContent: o.colorFillSecondary,
      colorFillContentHover: o.colorFill,
      colorFillAlter: o.colorFillQuaternary,
      colorBgContainerDisabled: o.colorFillTertiary,
      colorBorderBg: o.colorBgContainer,
      colorSplit: ct(o.colorBorderSecondary, o.colorBgContainer),
      colorTextPlaceholder: o.colorTextQuaternary,
      colorTextDisabled: o.colorTextQuaternary,
      colorTextHeading: o.colorText,
      colorTextLabel: o.colorTextSecondary,
      colorTextDescription: o.colorTextTertiary,
      colorTextLightSolid: o.colorWhite,
      colorHighlight: o.colorError,
      colorBgTextHover: o.colorFillSecondary,
      colorBgTextActive: o.colorFill,
      colorIcon: o.colorTextTertiary,
      colorIconHover: o.colorText,
      colorErrorOutline: ct(o.colorErrorBg, o.colorBgContainer),
      colorWarningOutline: ct(o.colorWarningBg, o.colorBgContainer),
      fontSizeIcon: o.fontSizeSM,
      lineWidth: o.lineWidth,
      controlOutlineWidth: o.lineWidth * 2,
      controlInteractiveSize: o.controlHeight / 2,
      controlItemBgHover: o.colorFillTertiary,
      controlItemBgActive: o.colorPrimaryBg,
      controlItemBgActiveHover: o.colorPrimaryBgHover,
      controlItemBgActiveDisabled: o.colorFill,
      controlTmpOutline: o.colorFillQuaternary,
      controlOutline: ct(o.colorPrimaryBg, o.colorBgContainer),
      lineType: o.lineType,
      borderRadius: o.borderRadius,
      borderRadiusXS: o.borderRadiusXS,
      borderRadiusSM: o.borderRadiusSM,
      borderRadiusLG: o.borderRadiusLG,
      fontWeightStrong: 600,
      opacityLoading: 0.65,
      linkDecoration: 'none',
      linkHoverDecoration: 'none',
      linkFocusDecoration: 'none',
      controlPaddingHorizontal: 12,
      controlPaddingHorizontalSM: 8,
      paddingXXS: o.sizeXXS,
      paddingXS: o.sizeXS,
      paddingSM: o.sizeSM,
      padding: o.size,
      paddingMD: o.sizeMD,
      paddingLG: o.sizeLG,
      paddingXL: o.sizeXL,
      paddingContentHorizontalLG: o.sizeLG,
      paddingContentVerticalLG: o.sizeMS,
      paddingContentHorizontal: o.sizeMS,
      paddingContentVertical: o.sizeSM,
      paddingContentHorizontalSM: o.size,
      paddingContentVerticalSM: o.sizeXS,
      marginXXS: o.sizeXXS,
      marginXS: o.sizeXS,
      marginSM: o.sizeSM,
      margin: o.size,
      marginMD: o.sizeMD,
      marginLG: o.sizeLG,
      marginXL: o.sizeXL,
      marginXXL: o.sizeXXL,
      boxShadow: `
      0 1px 2px 0 rgba(0, 0, 0, 0.03),
      0 1px 6px -1px rgba(0, 0, 0, 0.02),
      0 2px 4px 0 rgba(0, 0, 0, 0.02)
    `,
      boxShadowSecondary: `
      0 6px 16px 0 rgba(0, 0, 0, 0.08),
      0 3px 6px -4px rgba(0, 0, 0, 0.12),
      0 9px 28px 8px rgba(0, 0, 0, 0.05)
    `,
      boxShadowTertiary: `
      0 1px 2px 0 rgba(0, 0, 0, 0.03),
      0 1px 6px -1px rgba(0, 0, 0, 0.02),
      0 2px 4px 0 rgba(0, 0, 0, 0.02)
    `,
      screenXS: i,
      screenXSMin: i,
      screenXSMax: a - 1,
      screenSM: a,
      screenSMMin: a,
      screenSMMax: s - 1,
      screenMD: s,
      screenMDMin: s,
      screenMDMax: u - 1,
      screenLG: u,
      screenLGMin: u,
      screenLGMax: c - 1,
      screenXL: c,
      screenXLMin: c,
      screenXLMax: l - 1,
      screenXXL: l,
      screenXXLMin: l,
      screenXXLMax: f - 1,
      screenXXXL: f,
      screenXXXLMin: f,
      boxShadowPopoverArrow: '3px 3px 7px rgba(0, 0, 0, 0.1)',
      boxShadowCard: `
      0 1px 2px -2px ${new L('rgba(0, 0, 0, 0.16)').toRgbString()},
      0 3px 6px 0 ${new L('rgba(0, 0, 0, 0.12)').toRgbString()},
      0 5px 12px 4px ${new L('rgba(0, 0, 0, 0.09)').toRgbString()}
    `,
      boxShadowDrawerRight: `
      -6px 0 16px 0 rgba(0, 0, 0, 0.08),
      -3px 0 6px -4px rgba(0, 0, 0, 0.12),
      -9px 0 28px 8px rgba(0, 0, 0, 0.05)
    `,
      boxShadowDrawerLeft: `
      6px 0 16px 0 rgba(0, 0, 0, 0.08),
      3px 0 6px -4px rgba(0, 0, 0, 0.12),
      9px 0 28px 8px rgba(0, 0, 0, 0.05)
    `,
      boxShadowDrawerUp: `
      0 6px 16px 0 rgba(0, 0, 0, 0.08),
      0 3px 6px -4px rgba(0, 0, 0, 0.12),
      0 9px 28px 8px rgba(0, 0, 0, 0.05)
    `,
      boxShadowDrawerDown: `
      0 -6px 16px 0 rgba(0, 0, 0, 0.08),
      0 -3px 6px -4px rgba(0, 0, 0, 0.12),
      0 -9px 28px 8px rgba(0, 0, 0, 0.05)
    `,
      boxShadowTabsOverflowLeft: 'inset 10px 0 8px -8px rgba(0, 0, 0, 0.08)',
      boxShadowTabsOverflowRight: 'inset -10px 0 8px -8px rgba(0, 0, 0, 0.08)',
      boxShadowTabsOverflowTop: 'inset 0 10px 8px -8px rgba(0, 0, 0, 0.08)',
      boxShadowTabsOverflowBottom: 'inset 0 -10px 8px -8px rgba(0, 0, 0, 0.08)'
    }),
    r
  )
}
const Lp = {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis'
  },
  Qo = e => ({
    boxSizing: 'border-box',
    margin: 0,
    padding: 0,
    color: e.colorText,
    fontSize: e.fontSize,
    lineHeight: e.lineHeight,
    listStyle: 'none',
    fontFamily: e.fontFamily
  }),
  ql = () => ({
    display: 'inline-flex',
    alignItems: 'center',
    color: 'inherit',
    fontStyle: 'normal',
    lineHeight: 0,
    textAlign: 'center',
    textTransform: 'none',
    verticalAlign: '-0.125em',
    textRendering: 'optimizeLegibility',
    '-webkit-font-smoothing': 'antialiased',
    '-moz-osx-font-smoothing': 'grayscale',
    '> *': { lineHeight: 1 },
    svg: { display: 'inline-block' }
  }),
  Fp = () => ({
    '&::before': { display: 'table', content: '""' },
    '&::after': { display: 'table', clear: 'both', content: '""' }
  }),
  Vl = e => ({
    a: {
      color: e.colorLink,
      textDecoration: e.linkDecoration,
      backgroundColor: 'transparent',
      outline: 'none',
      cursor: 'pointer',
      transition: `color ${e.motionDurationSlow}`,
      '-webkit-text-decoration-skip': 'objects',
      '&:hover': { color: e.colorLinkHover },
      '&:active': { color: e.colorLinkActive },
      '&:active,\n  &:hover': {
        textDecoration: e.linkHoverDecoration,
        outline: 0
      },
      '&:focus': { textDecoration: e.linkFocusDecoration, outline: 0 },
      '&[disabled]': { color: e.colorTextDisabled, cursor: 'not-allowed' }
    }
  }),
  Wl = (e, t) => {
    const { fontFamily: n, fontSize: r } = e,
      o = `[class^="${t}"], [class*=" ${t}"]`
    return {
      [o]: {
        fontFamily: n,
        fontSize: r,
        boxSizing: 'border-box',
        '&::before, &::after': { boxSizing: 'border-box' },
        [o]: {
          boxSizing: 'border-box',
          '&::before, &::after': { boxSizing: 'border-box' }
        }
      }
    }
  },
  Gl = e => ({
    outline: `${e.lineWidthBold}px solid ${e.colorPrimaryBorder}`,
    outlineOffset: 1,
    transition: 'outline-offset 0s, outline 0s'
  }),
  Dp = e => ({ '&:focus-visible': v({}, Gl(e)) })
function Dn(e, t, n) {
  return r => {
    const o = w(() => (r == null ? void 0 : r.value)),
      [i, a, s] = Nt(),
      { getPrefixCls: u, iconPrefixCls: c } = Po(),
      l = w(() => u()),
      f = w(() => ({
        theme: i.value,
        token: a.value,
        hashId: s.value,
        path: ['Shared', l.value]
      }))
    pn(f, () => [{ '&': Vl(a.value) }])
    const d = w(() => ({
      theme: i.value,
      token: a.value,
      hashId: s.value,
      path: [e, o.value, c.value]
    }))
    return [
      pn(d, () => {
        const { token: m, flush: p } = Kl(a.value),
          g = typeof n == 'function' ? n(m) : n,
          S = v(v({}, g), a.value[e]),
          b = `.${o.value}`,
          O = kt(
            m,
            {
              componentCls: b,
              prefixCls: o.value,
              iconCls: `.${c.value}`,
              antCls: `.${l.value}`
            },
            S
          ),
          T = t(O, {
            hashId: s.value,
            prefixCls: o.value,
            rootPrefixCls: l.value,
            iconPrefixCls: c.value,
            overrideComponentToken: a.value[e]
          })
        return p(e, S), [Wl(a.value, o.value), T]
      }),
      s
    ]
  }
}
const Zo = typeof CSSINJS_STATISTIC < 'u'
let mn = !0
function kt() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n]
  if (!Zo) return v({}, ...t)
  mn = !1
  const r = {}
  return (
    t.forEach(o => {
      Object.keys(o).forEach(a => {
        Object.defineProperty(r, a, {
          configurable: !0,
          enumerable: !0,
          get: () => o[a]
        })
      })
    }),
    (mn = !0),
    r
  )
}
function Xl() {}
function Kl(e) {
  let t,
    n = e,
    r = Xl
  return (
    Zo &&
      ((t = new Set()),
      (n = new Proxy(e, {
        get(o, i) {
          return mn && t.add(i), o[i]
        }
      })),
      (r = (o, i) => {
        Array.from(t)
      })),
    { token: n, keys: t, flush: r }
  )
}
const Jl = Bo(Bl),
  ei = { token: jt, hashed: !0 },
  ti = Symbol('DesignTokenContext'),
  gn = J(),
  Yl = e => {
    me(ti, e),
      le(
        e,
        () => {
          ;(gn.value = Se(e)), $a(gn)
        },
        { immediate: !0, deep: !0 }
      )
  },
  Ql = M({
    props: { value: W() },
    setup(e, t) {
      let { slots: n } = t
      return (
        Yl(w(() => e.value)),
        () => {
          var r
          return (r = n.default) === null || r === void 0 ? void 0 : r.call(n)
        }
      )
    }
  })
function Nt() {
  const e = ee(
      ti,
      w(() => gn.value || ei)
    ),
    t = w(() => `${El}-${e.value.hashed || ''}`),
    n = w(() => e.value.theme || Jl),
    r = el(
      n,
      w(() => [jt, e.value.token]),
      w(() => ({
        salt: t.value,
        override: v({ override: e.value.token }, e.value.components),
        formatToken: Ul
      }))
    )
  return [n, w(() => r.value[0]), w(() => (e.value.hashed ? r.value[1] : ''))]
}
const ni = M({
  compatConfig: { MODE: 3 },
  setup() {
    const [, e] = Nt(),
      t = w(() =>
        new L(e.value.colorBgBase).toHsl().l < 0.5 ? { opacity: 0.65 } : {}
      )
    return () =>
      C(
        'svg',
        {
          style: t.value,
          width: '184',
          height: '152',
          viewBox: '0 0 184 152',
          xmlns: 'http://www.w3.org/2000/svg'
        },
        [
          C('g', { fill: 'none', 'fill-rule': 'evenodd' }, [
            C('g', { transform: 'translate(24 31.67)' }, [
              C(
                'ellipse',
                {
                  'fill-opacity': '.8',
                  fill: '#F5F5F7',
                  cx: '67.797',
                  cy: '106.89',
                  rx: '67.797',
                  ry: '12.668'
                },
                null
              ),
              C(
                'path',
                {
                  d:
                    'M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z',
                  fill: '#AEB8C2'
                },
                null
              ),
              C(
                'path',
                {
                  d:
                    'M101.537 86.214L80.63 61.102c-1.001-1.207-2.507-1.867-4.048-1.867H31.724c-1.54 0-3.047.66-4.048 1.867L6.769 86.214v13.792h94.768V86.214z',
                  fill: 'url(#linearGradient-1)',
                  transform: 'translate(13.56)'
                },
                null
              ),
              C(
                'path',
                {
                  d:
                    'M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z',
                  fill: '#F5F5F7'
                },
                null
              ),
              C(
                'path',
                {
                  d:
                    'M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z',
                  fill: '#DCE0E6'
                },
                null
              )
            ]),
            C(
              'path',
              {
                d:
                  'M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z',
                fill: '#DCE0E6'
              },
              null
            ),
            C('g', { transform: 'translate(149.65 15.383)', fill: '#FFF' }, [
              C(
                'ellipse',
                { cx: '20.654', cy: '3.167', rx: '2.849', ry: '2.815' },
                null
              ),
              C(
                'path',
                { d: 'M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z' },
                null
              )
            ])
          ])
        ]
      )
  }
})
ni.PRESENTED_IMAGE_DEFAULT = !0
const ri = ni,
  oi = M({
    compatConfig: { MODE: 3 },
    setup() {
      const [, e] = Nt(),
        t = w(() => {
          const {
            colorFill: n,
            colorFillTertiary: r,
            colorFillQuaternary: o,
            colorBgContainer: i
          } = e.value
          return {
            borderColor: new L(n).onBackground(i).toHexString(),
            shadowColor: new L(r).onBackground(i).toHexString(),
            contentColor: new L(o).onBackground(i).toHexString()
          }
        })
      return () =>
        C(
          'svg',
          {
            width: '64',
            height: '41',
            viewBox: '0 0 64 41',
            xmlns: 'http://www.w3.org/2000/svg'
          },
          [
            C(
              'g',
              {
                transform: 'translate(0 1)',
                fill: 'none',
                'fill-rule': 'evenodd'
              },
              [
                C(
                  'ellipse',
                  {
                    fill: t.value.shadowColor,
                    cx: '32',
                    cy: '33',
                    rx: '32',
                    ry: '7'
                  },
                  null
                ),
                C(
                  'g',
                  { 'fill-rule': 'nonzero', stroke: t.value.borderColor },
                  [
                    C(
                      'path',
                      {
                        d:
                          'M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z'
                      },
                      null
                    ),
                    C(
                      'path',
                      {
                        d:
                          'M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z',
                        fill: t.value.contentColor
                      },
                      null
                    )
                  ]
                )
              ]
            )
          ]
        )
    }
  })
oi.PRESENTED_IMAGE_SIMPLE = !0
const Zl = oi,
  ec = e => {
    const {
      componentCls: t,
      margin: n,
      marginXS: r,
      marginXL: o,
      fontSize: i,
      lineHeight: a
    } = e
    return {
      [t]: {
        marginInline: r,
        fontSize: i,
        lineHeight: a,
        textAlign: 'center',
        [`${t}-image`]: {
          height: e.emptyImgHeight,
          marginBottom: r,
          opacity: e.opacityImage,
          img: { height: '100%' },
          svg: { height: '100%', margin: 'auto' }
        },
        [`${t}-footer`]: { marginTop: n },
        '&-normal': {
          marginBlock: o,
          color: e.colorTextDisabled,
          [`${t}-image`]: { height: e.emptyImgHeightMD }
        },
        '&-small': {
          marginBlock: r,
          color: e.colorTextDisabled,
          [`${t}-image`]: { height: e.emptyImgHeightSM }
        }
      }
    }
  },
  tc = Dn('Empty', e => {
    const { componentCls: t, controlHeightLG: n } = e,
      r = kt(e, {
        emptyImgCls: `${t}-img`,
        emptyImgHeight: n * 2.5,
        emptyImgHeightMD: n,
        emptyImgHeightSM: n * 0.875
      })
    return [ec(r)]
  })
var nc =
  (globalThis && globalThis.__rest) ||
  function(e, t) {
    var n = {}
    for (var r in e)
      Object.prototype.hasOwnProperty.call(e, r) &&
        t.indexOf(r) < 0 &&
        (n[r] = e[r])
    if (e != null && typeof Object.getOwnPropertySymbols == 'function')
      for (var o = 0, r = Object.getOwnPropertySymbols(e); o < r.length; o++)
        t.indexOf(r[o]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(e, r[o]) &&
          (n[r[o]] = e[r[o]])
    return n
  }
const rc = () => ({
    prefixCls: String,
    imageStyle: W(),
    image: sn(),
    description: sn()
  }),
  Hn = M({
    name: 'AEmpty',
    compatConfig: { MODE: 3 },
    inheritAttrs: !1,
    props: rc(),
    setup(e, t) {
      let { slots: n = {}, attrs: r } = t
      const { direction: o, prefixCls: i } = Mt('empty', e),
        [a, s] = tc(i)
      return () => {
        var u, c
        const l = i.value,
          f = v(v({}, e), r),
          {
            image: d = ((u = n.image) === null || u === void 0
              ? void 0
              : u.call(n)) || _e(ri),
            description: m = ((c = n.description) === null || c === void 0
              ? void 0
              : c.call(n)) || void 0,
            imageStyle: p,
            class: g = ''
          } = f,
          S = nc(f, ['image', 'description', 'imageStyle', 'class']),
          b = typeof d == 'function' ? d() : d,
          O =
            typeof b == 'object' && 'type' in b && b.type.PRESENTED_IMAGE_SIMPLE
        return a(
          C(
            Ao,
            {
              componentName: 'Empty',
              children: T => {
                const P = typeof m < 'u' ? m : T.description,
                  E = typeof P == 'string' ? P : 'empty'
                let $ = null
                return (
                  typeof b == 'string'
                    ? ($ = C('img', { alt: E, src: b }, null))
                    : ($ = b),
                  C(
                    'div',
                    F(
                      {
                        class: U(l, g, s.value, {
                          [`${l}-normal`]: O,
                          [`${l}-rtl`]: o.value === 'rtl'
                        })
                      },
                      S
                    ),
                    [
                      C('div', { class: `${l}-image`, style: p }, [$]),
                      P && C('p', { class: `${l}-description` }, [P]),
                      n.default &&
                        C('div', { class: `${l}-footer` }, [wo(n.default())])
                    ]
                  )
                )
              }
            },
            null
          )
        )
      }
    }
  })
Hn.PRESENTED_IMAGE_DEFAULT = () => _e(ri)
Hn.PRESENTED_IMAGE_SIMPLE = () => _e(Zl)
const We = In(Hn),
  ii = e => {
    const { prefixCls: t } = Mt('empty', e)
    return (r => {
      switch (r) {
        case 'Table':
        case 'List':
          return C(We, { image: We.PRESENTED_IMAGE_SIMPLE }, null)
        case 'Select':
        case 'TreeSelect':
        case 'Cascader':
        case 'Transfer':
        case 'Mentions':
          return C(
            We,
            { image: We.PRESENTED_IMAGE_SIMPLE, class: `${t.value}-small` },
            null
          )
        default:
          return C(We, null, null)
      }
    })(e.componentName)
  }
function oc(e) {
  return C(ii, { componentName: e }, null)
}
const ai = Symbol('SizeContextKey'),
  si = () => ee(ai, H(void 0)),
  ic = e => {
    const t = si()
    return (
      me(
        ai,
        w(() => e.value || t.value)
      ),
      e
    )
  },
  Mt = (e, t) => {
    const n = si(),
      r = $o(),
      o = ee(
        kn,
        v(v({}, To), { renderEmpty: y => _e(ii, { componentName: y }) })
      ),
      i = w(() => o.getPrefixCls(e, t.prefixCls)),
      a = w(() => {
        var y, _
        return (y = t.direction) !== null && y !== void 0
          ? y
          : (_ = o.direction) === null || _ === void 0
          ? void 0
          : _.value
      }),
      s = w(() => {
        var y
        return (y = t.iconPrefixCls) !== null && y !== void 0
          ? y
          : o.iconPrefixCls.value
      }),
      u = w(() => o.getPrefixCls()),
      c = w(() => {
        var y
        return (y = o.autoInsertSpaceInButton) === null || y === void 0
          ? void 0
          : y.value
      }),
      l = o.renderEmpty,
      f = o.space,
      d = o.pageHeader,
      m = o.form,
      p = w(() => {
        var y, _
        return (y = t.getTargetContainer) !== null && y !== void 0
          ? y
          : (_ = o.getTargetContainer) === null || _ === void 0
          ? void 0
          : _.value
      }),
      g = w(() => {
        var y, _, I
        return (_ =
          (y = t.getContainer) !== null && y !== void 0
            ? y
            : t.getPopupContainer) !== null && _ !== void 0
          ? _
          : (I = o.getPopupContainer) === null || I === void 0
          ? void 0
          : I.value
      }),
      S = w(() => {
        var y, _
        return (y = t.dropdownMatchSelectWidth) !== null && y !== void 0
          ? y
          : (_ = o.dropdownMatchSelectWidth) === null || _ === void 0
          ? void 0
          : _.value
      }),
      b = w(() => {
        var y
        return (
          (t.virtual === void 0
            ? ((y = o.virtual) === null || y === void 0 ? void 0 : y.value) !==
              !1
            : t.virtual !== !1) && S.value !== !1
        )
      }),
      O = w(() => t.size || n.value),
      T = w(() => {
        var y, _, I
        return (y = t.autocomplete) !== null && y !== void 0
          ? y
          : (I = (_ = o.input) === null || _ === void 0 ? void 0 : _.value) ===
              null || I === void 0
          ? void 0
          : I.autocomplete
      }),
      P = w(() => {
        var y
        return (y = t.disabled) !== null && y !== void 0 ? y : r.value
      }),
      E = w(() => {
        var y
        return (y = t.csp) !== null && y !== void 0 ? y : o.csp
      }),
      $ = w(() => {
        var y, _
        return (y = t.wave) !== null && y !== void 0
          ? y
          : (_ = o.wave) === null || _ === void 0
          ? void 0
          : _.value
      })
    return {
      configProvider: o,
      prefixCls: i,
      direction: a,
      size: O,
      getTargetContainer: p,
      getPopupContainer: g,
      space: f,
      pageHeader: d,
      form: m,
      autoInsertSpaceInButton: c,
      renderEmpty: l,
      virtual: b,
      dropdownMatchSelectWidth: S,
      rootPrefixCls: u,
      getPrefixCls: o.getPrefixCls,
      autocomplete: T,
      csp: E,
      iconPrefixCls: s,
      disabled: P,
      select: o.select,
      wave: $
    }
  }
function Ar(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n]
    ;(r.enumerable = r.enumerable || !1),
      (r.configurable = !0),
      'value' in r && (r.writable = !0),
      Object.defineProperty(e, r.key, r)
  }
}
function li(e, t, n) {
  return t && Ar(e.prototype, t), n && Ar(e, n), e
}
function pt() {
  return (pt =
    Object.assign ||
    function(e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t]
        for (var r in n)
          Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
      }
      return e
    }).apply(this, arguments)
}
function ci(e, t) {
  ;(e.prototype = Object.create(t.prototype)),
    (e.prototype.constructor = e),
    (e.__proto__ = t)
}
function ui(e, t) {
  if (e == null) return {}
  var n,
    r,
    o = {},
    i = Object.keys(e)
  for (r = 0; r < i.length; r++) t.indexOf((n = i[r])) >= 0 || (o[n] = e[n])
  return o
}
function Rr(e) {
  return (
    ((t = e) != null && typeof t == 'object' && Array.isArray(t) === !1) == 1 &&
    Object.prototype.toString.call(e) === '[object Object]'
  )
  var t
}
var fi = Object.prototype,
  di = fi.toString,
  ac = fi.hasOwnProperty,
  pi = /^\s*function (\w+)/
function Ir(e) {
  var t,
    n = (t = e == null ? void 0 : e.type) !== null && t !== void 0 ? t : e
  if (n) {
    var r = n.toString().match(pi)
    return r ? r[1] : ''
  }
  return ''
}
var xe = function(e) {
    var t, n
    return (
      Rr(e) !== !1 &&
      typeof (t = e.constructor) == 'function' &&
      Rr((n = t.prototype)) !== !1 &&
      n.hasOwnProperty('isPrototypeOf') !== !1
    )
  },
  sc = function(e) {
    return e
  },
  B = sc,
  ot = function(e, t) {
    return ac.call(e, t)
  },
  lc =
    Number.isInteger ||
    function(e) {
      return typeof e == 'number' && isFinite(e) && Math.floor(e) === e
    },
  je =
    Array.isArray ||
    function(e) {
      return di.call(e) === '[object Array]'
    },
  ke = function(e) {
    return di.call(e) === '[object Function]'
  },
  wt = function(e) {
    return xe(e) && ot(e, '_vueTypes_name')
  },
  mi = function(e) {
    return (
      xe(e) &&
      (ot(e, 'type') ||
        ['_vueTypes_name', 'validator', 'default', 'required'].some(function(
          t
        ) {
          return ot(e, t)
        }))
    )
  }
function Bn(e, t) {
  return Object.defineProperty(e.bind(t), '__original', { value: e })
}
function Oe(e, t, n) {
  var r
  n === void 0 && (n = !1)
  var o = !0,
    i = ''
  r = xe(e) ? e : { type: e }
  var a = wt(r) ? r._vueTypes_name + ' - ' : ''
  if (mi(r) && r.type !== null) {
    if (r.type === void 0 || r.type === !0 || (!r.required && t === void 0))
      return o
    je(r.type)
      ? ((o = r.type.some(function(f) {
          return Oe(f, t, !0) === !0
        })),
        (i = r.type
          .map(function(f) {
            return Ir(f)
          })
          .join(' or ')))
      : (o =
          (i = Ir(r)) === 'Array'
            ? je(t)
            : i === 'Object'
            ? xe(t)
            : i === 'String' ||
              i === 'Number' ||
              i === 'Boolean' ||
              i === 'Function'
            ? (function(f) {
                if (f == null) return ''
                var d = f.constructor.toString().match(pi)
                return d ? d[1] : ''
              })(t) === i
            : t instanceof r.type)
  }
  if (!o) {
    var s = a + 'value "' + t + '" should be of type "' + i + '"'
    return n === !1 ? (B(s), !1) : s
  }
  if (ot(r, 'validator') && ke(r.validator)) {
    var u = B,
      c = []
    if (
      ((B = function(f) {
        c.push(f)
      }),
      (o = r.validator(t)),
      (B = u),
      !o)
    ) {
      var l =
        (c.length > 1 ? '* ' : '') +
        c.join(`
* `)
      return (c.length = 0), n === !1 ? (B(l), o) : l
    }
  }
  return o
}
function G(e, t) {
  var n = Object.defineProperties(t, {
      _vueTypes_name: { value: e, writable: !0 },
      isRequired: {
        get: function() {
          return (this.required = !0), this
        }
      },
      def: {
        value: function(o) {
          return o !== void 0 || this.default
            ? ke(o) || Oe(this, o, !0) === !0
              ? ((this.default = je(o)
                  ? function() {
                      return [].concat(o)
                    }
                  : xe(o)
                  ? function() {
                      return Object.assign({}, o)
                    }
                  : o),
                this)
              : (B(
                  this._vueTypes_name + ' - invalid default value: "' + o + '"'
                ),
                this)
            : this
        }
      }
    }),
    r = n.validator
  return ke(r) && (n.validator = Bn(r, n)), n
}
function ie(e, t) {
  var n = G(e, t)
  return Object.defineProperty(n, 'validate', {
    value: function(r) {
      return (
        ke(this.validator) &&
          B(
            this._vueTypes_name +
              ` - calling .validate() will overwrite the current custom validator function. Validator info:
` +
              JSON.stringify(this)
          ),
        (this.validator = Bn(r, this)),
        this
      )
    }
  })
}
function jr(e, t, n) {
  var r,
    o,
    i =
      ((r = t),
      (o = {}),
      Object.getOwnPropertyNames(r).forEach(function(f) {
        o[f] = Object.getOwnPropertyDescriptor(r, f)
      }),
      Object.defineProperties({}, o))
  if (((i._vueTypes_name = e), !xe(n))) return i
  var a,
    s,
    u = n.validator,
    c = ui(n, ['validator'])
  if (ke(u)) {
    var l = i.validator
    l && (l = (s = (a = l).__original) !== null && s !== void 0 ? s : a),
      (i.validator = Bn(
        l
          ? function(f) {
              return l.call(this, f) && u.call(this, f)
            }
          : u,
        i
      ))
  }
  return Object.assign(i, c)
}
function Lt(e) {
  return e.replace(/^(?!\s*$)/gm, '  ')
}
var cc = function() {
    return ie('any', {})
  },
  uc = function() {
    return ie('function', { type: Function })
  },
  fc = function() {
    return ie('boolean', { type: Boolean })
  },
  dc = function() {
    return ie('string', { type: String })
  },
  pc = function() {
    return ie('number', { type: Number })
  },
  mc = function() {
    return ie('array', { type: Array })
  },
  gc = function() {
    return ie('object', { type: Object })
  },
  hc = function() {
    return G('integer', {
      type: Number,
      validator: function(e) {
        return lc(e)
      }
    })
  },
  yc = function() {
    return G('symbol', {
      validator: function(e) {
        return typeof e == 'symbol'
      }
    })
  }
function vc(e, t) {
  if (
    (t === void 0 && (t = 'custom validation failed'), typeof e != 'function')
  )
    throw new TypeError(
      '[VueTypes error]: You must provide a function as argument'
    )
  return G(e.name || '<<anonymous function>>', {
    validator: function(n) {
      var r = e(n)
      return r || B(this._vueTypes_name + ' - ' + t), r
    }
  })
}
function bc(e) {
  if (!je(e))
    throw new TypeError(
      '[VueTypes error]: You must provide an array as argument.'
    )
  var t = 'oneOf - value should be one of "' + e.join('", "') + '".',
    n = e.reduce(function(r, o) {
      if (o != null) {
        var i = o.constructor
        r.indexOf(i) === -1 && r.push(i)
      }
      return r
    }, [])
  return G('oneOf', {
    type: n.length > 0 ? n : void 0,
    validator: function(r) {
      var o = e.indexOf(r) !== -1
      return o || B(t), o
    }
  })
}
function Cc(e) {
  if (!je(e))
    throw new TypeError(
      '[VueTypes error]: You must provide an array as argument'
    )
  for (var t = !1, n = [], r = 0; r < e.length; r += 1) {
    var o = e[r]
    if (mi(o)) {
      if (wt(o) && o._vueTypes_name === 'oneOf') {
        n = n.concat(o.type)
        continue
      }
      if ((ke(o.validator) && (t = !0), o.type !== !0 && o.type)) {
        n = n.concat(o.type)
        continue
      }
    }
    n.push(o)
  }
  return (
    (n = n.filter(function(i, a) {
      return n.indexOf(i) === a
    })),
    G(
      'oneOfType',
      t
        ? {
            type: n,
            validator: function(i) {
              var a = [],
                s = e.some(function(u) {
                  var c = Oe(
                    wt(u) && u._vueTypes_name === 'oneOf' ? u.type || null : u,
                    i,
                    !0
                  )
                  return typeof c == 'string' && a.push(c), c === !0
                })
              return (
                s ||
                  B(
                    'oneOfType - provided value does not match any of the ' +
                      a.length +
                      ` passed-in validators:
` +
                      Lt(
                        a.join(`
`)
                      )
                  ),
                s
              )
            }
          }
        : { type: n }
    )
  )
}
function Sc(e) {
  return G('arrayOf', {
    type: Array,
    validator: function(t) {
      var n,
        r = t.every(function(o) {
          return (n = Oe(e, o, !0)) === !0
        })
      return (
        r ||
          B(
            `arrayOf - value validation error:
` + Lt(n)
          ),
        r
      )
    }
  })
}
function xc(e) {
  return G('instanceOf', { type: e })
}
function wc(e) {
  return G('objectOf', {
    type: Object,
    validator: function(t) {
      var n,
        r = Object.keys(t).every(function(o) {
          return (n = Oe(e, t[o], !0)) === !0
        })
      return (
        r ||
          B(
            `objectOf - value validation error:
` + Lt(n)
          ),
        r
      )
    }
  })
}
function Oc(e) {
  var t = Object.keys(e),
    n = t.filter(function(o) {
      var i
      return !!(!((i = e[o]) === null || i === void 0) && i.required)
    }),
    r = G('shape', {
      type: Object,
      validator: function(o) {
        var i = this
        if (!xe(o)) return !1
        var a = Object.keys(o)
        if (
          n.length > 0 &&
          n.some(function(u) {
            return a.indexOf(u) === -1
          })
        ) {
          var s = n.filter(function(u) {
            return a.indexOf(u) === -1
          })
          return (
            B(
              s.length === 1
                ? 'shape - required property "' + s[0] + '" is not defined.'
                : 'shape - required properties "' +
                    s.join('", "') +
                    '" are not defined.'
            ),
            !1
          )
        }
        return a.every(function(u) {
          if (t.indexOf(u) === -1)
            return (
              i._vueTypes_isLoose === !0 ||
              (B(
                'shape - shape definition does not include a "' +
                  u +
                  '" property. Allowed keys: "' +
                  t.join('", "') +
                  '".'
              ),
              !1)
            )
          var c = Oe(e[u], o[u], !0)
          return (
            typeof c == 'string' &&
              B(
                'shape - "' +
                  u +
                  `" property validation error:
 ` +
                  Lt(c)
              ),
            c === !0
          )
        })
      }
    })
  return (
    Object.defineProperty(r, '_vueTypes_isLoose', { writable: !0, value: !1 }),
    Object.defineProperty(r, 'loose', {
      get: function() {
        return (this._vueTypes_isLoose = !0), this
      }
    }),
    r
  )
}
var oe = (function() {
  function e() {}
  return (
    (e.extend = function(t) {
      var n = this
      if (je(t))
        return (
          t.forEach(function(f) {
            return n.extend(f)
          }),
          this
        )
      var r = t.name,
        o = t.validate,
        i = o !== void 0 && o,
        a = t.getter,
        s = a !== void 0 && a,
        u = ui(t, ['name', 'validate', 'getter'])
      if (ot(this, r))
        throw new TypeError(
          '[VueTypes error]: Type "' + r + '" already defined'
        )
      var c,
        l = u.type
      return wt(l)
        ? (delete u.type,
          Object.defineProperty(
            this,
            r,
            s
              ? {
                  get: function() {
                    return jr(r, l, u)
                  }
                }
              : {
                  value: function() {
                    var f,
                      d = jr(r, l, u)
                    return (
                      d.validator &&
                        (d.validator = (f = d.validator).bind.apply(
                          f,
                          [d].concat([].slice.call(arguments))
                        )),
                      d
                    )
                  }
                }
          ))
        : ((c = s
            ? {
                get: function() {
                  var f = Object.assign({}, u)
                  return i ? ie(r, f) : G(r, f)
                },
                enumerable: !0
              }
            : {
                value: function() {
                  var f,
                    d,
                    m = Object.assign({}, u)
                  return (
                    (f = i ? ie(r, m) : G(r, m)),
                    m.validator &&
                      (f.validator = (d = m.validator).bind.apply(
                        d,
                        [f].concat([].slice.call(arguments))
                      )),
                    f
                  )
                },
                enumerable: !0
              }),
          Object.defineProperty(this, r, c))
    }),
    li(e, null, [
      {
        key: 'any',
        get: function() {
          return cc()
        }
      },
      {
        key: 'func',
        get: function() {
          return uc().def(this.defaults.func)
        }
      },
      {
        key: 'bool',
        get: function() {
          return fc().def(this.defaults.bool)
        }
      },
      {
        key: 'string',
        get: function() {
          return dc().def(this.defaults.string)
        }
      },
      {
        key: 'number',
        get: function() {
          return pc().def(this.defaults.number)
        }
      },
      {
        key: 'array',
        get: function() {
          return mc().def(this.defaults.array)
        }
      },
      {
        key: 'object',
        get: function() {
          return gc().def(this.defaults.object)
        }
      },
      {
        key: 'integer',
        get: function() {
          return hc().def(this.defaults.integer)
        }
      },
      {
        key: 'symbol',
        get: function() {
          return yc()
        }
      }
    ]),
    e
  )
})()
function gi(e) {
  var t
  return (
    e === void 0 &&
      (e = {
        func: function() {},
        bool: !0,
        string: '',
        number: 0,
        array: function() {
          return []
        },
        object: function() {
          return {}
        },
        integer: 0
      }),
    ((t = (function(n) {
      function r() {
        return n.apply(this, arguments) || this
      }
      return (
        ci(r, n),
        li(r, null, [
          {
            key: 'sensibleDefaults',
            get: function() {
              return pt({}, this.defaults)
            },
            set: function(o) {
              this.defaults = o !== !1 ? pt({}, o !== !0 ? o : e) : {}
            }
          }
        ]),
        r
      )
    })(oe)).defaults = pt({}, e)),
    t
  )
}
;(oe.defaults = {}),
  (oe.custom = vc),
  (oe.oneOf = bc),
  (oe.instanceOf = xc),
  (oe.oneOfType = Cc),
  (oe.arrayOf = Sc),
  (oe.objectOf = wc),
  (oe.shape = Oc),
  (oe.utils = {
    validate: function(e, t) {
      return Oe(t, e, !0) === !0
    },
    toType: function(e, t, n) {
      return n === void 0 && (n = !1), n ? ie(e, t) : G(e, t)
    }
  })
;(function(e) {
  function t() {
    return e.apply(this, arguments) || this
  }
  return ci(t, e), t
})(gi())
const hi = gi({
  func: void 0,
  bool: void 0,
  string: void 0,
  number: void 0,
  array: void 0,
  object: void 0,
  integer: void 0
})
hi.extend([
  { name: 'looseBool', getter: !0, type: Boolean, default: void 0 },
  { name: 'style', getter: !0, type: [String, Object], default: void 0 },
  { name: 'VueNode', getter: !0, type: null }
])
const Tc = hi
function Pc(e) {
  let { prefixCls: t, animation: n, transitionName: r } = e
  return n ? { name: `${t}-${n}` } : r ? { name: r } : {}
}
bs('bottomLeft', 'bottomRight', 'topLeft', 'topRight')
const Hp = e =>
    e !== void 0 && (e === 'topLeft' || e === 'topRight')
      ? 'slide-down'
      : 'slide-up',
  Bp = function(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}
    return v(
      e
        ? {
            name: e,
            appear: !0,
            enterFromClass: `${e}-enter ${e}-enter-prepare ${e}-enter-start`,
            enterActiveClass: `${e}-enter ${e}-enter-prepare`,
            enterToClass: `${e}-enter ${e}-enter-active`,
            leaveFromClass: ` ${e}-leave`,
            leaveActiveClass: `${e}-leave ${e}-leave-active`,
            leaveToClass: `${e}-leave ${e}-leave-active`
          }
        : { css: !1 },
      t
    )
  },
  yi = function(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}
    return v(
      e
        ? {
            name: e,
            appear: !0,
            appearActiveClass: `${e}`,
            appearToClass: `${e}-appear ${e}-appear-active`,
            enterFromClass: `${e}-appear ${e}-enter ${e}-appear-prepare ${e}-enter-prepare`,
            enterActiveClass: `${e}`,
            enterToClass: `${e}-enter ${e}-appear ${e}-appear-active ${e}-enter-active`,
            leaveActiveClass: `${e} ${e}-leave`,
            leaveToClass: `${e}-leave-active`
          }
        : { css: !1 },
      t
    )
  },
  zp = (e, t, n) => (n !== void 0 ? n : `${e}-${t}`),
  vi = Symbol('PortalContextKey'),
  Ec = function(e) {
    let t =
      arguments.length > 1 && arguments[1] !== void 0
        ? arguments[1]
        : { inTriggerContext: !0 }
    me(vi, {
      inTriggerContext: t.inTriggerContext,
      shouldRender: w(() => {
        const {
          sPopupVisible: n,
          popupRef: r,
          forceRender: o,
          autoDestroy: i
        } = e || {}
        let a = !1
        return (n || r || o) && (a = !0), !n && i && (a = !1), a
      })
    })
  },
  $c = () => {
    Ec({}, { inTriggerContext: !1 })
    const e = ee(vi, { shouldRender: w(() => !1), inTriggerContext: !1 })
    return {
      shouldRender: w(() => e.shouldRender.value || e.inTriggerContext === !1)
    }
  },
  _c = M({
    compatConfig: { MODE: 3 },
    name: 'Portal',
    inheritAttrs: !1,
    props: { getContainer: Tc.func.isRequired, didUpdate: Function },
    setup(e, t) {
      let { slots: n } = t,
        r = !0,
        o
      const { shouldRender: i } = $c()
      function a() {
        i.value && (o = e.getContainer())
      }
      _a(() => {
        ;(r = !1), a()
      }),
        _n(() => {
          o || a()
        })
      const s = le(i, () => {
        i.value && !o && (o = e.getContainer()), o && s()
      })
      return (
        Aa(() => {
          vo(() => {
            var u
            i.value &&
              ((u = e.didUpdate) === null || u === void 0 || u.call(e, e))
          })
        }),
        () => {
          var u
          return i.value
            ? r
              ? (u = n.default) === null || u === void 0
                ? void 0
                : u.call(n)
              : o
              ? C(bo, { to: o }, n)
              : null
            : null
        }
      )
    }
  })
var Ac = Symbol('iconContext'),
  bi = function() {
    return ee(Ac, { prefixCls: H('anticon'), rootClassName: H(''), csp: H() })
  }
function Rc() {
  return !!(
    typeof window < 'u' &&
    window.document &&
    window.document.createElement
  )
}
function Ic(e, t) {
  return e && e.contains ? e.contains(t) : !1
}
var kr = 'data-vc-order',
  jc = 'vc-icon-key',
  hn = new Map()
function Ci() {
  var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {},
    t = e.mark
  return t ? (t.startsWith('data-') ? t : 'data-'.concat(t)) : jc
}
function zn(e) {
  if (e.attachTo) return e.attachTo
  var t = document.querySelector('head')
  return t || document.body
}
function kc(e) {
  return e === 'queue' ? 'prependQueue' : e ? 'prepend' : 'append'
}
function Si(e) {
  return Array.from((hn.get(e) || e).children).filter(function(t) {
    return t.tagName === 'STYLE'
  })
}
function xi(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}
  if (!Rc()) return null
  var n = t.csp,
    r = t.prepend,
    o = document.createElement('style')
  o.setAttribute(kr, kc(r)),
    n && n.nonce && (o.nonce = n.nonce),
    (o.innerHTML = e)
  var i = zn(t),
    a = i.firstChild
  if (r) {
    if (r === 'queue') {
      var s = Si(i).filter(function(u) {
        return ['prepend', 'prependQueue'].includes(u.getAttribute(kr))
      })
      if (s.length) return i.insertBefore(o, s[s.length - 1].nextSibling), o
    }
    i.insertBefore(o, a)
  } else i.appendChild(o)
  return o
}
function Nc(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
    n = zn(t)
  return Si(n).find(function(r) {
    return r.getAttribute(Ci(t)) === e
  })
}
function Mc(e, t) {
  var n = hn.get(e)
  if (!n || !Ic(document, n)) {
    var r = xi('', t),
      o = r.parentNode
    hn.set(e, o), e.removeChild(r)
  }
}
function Lc(e, t) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {},
    r = zn(n)
  Mc(r, n)
  var o = Nc(t, n)
  if (o)
    return (
      n.csp &&
        n.csp.nonce &&
        o.nonce !== n.csp.nonce &&
        (o.nonce = n.csp.nonce),
      o.innerHTML !== e && (o.innerHTML = e),
      o
    )
  var i = xi(e, n)
  return i.setAttribute(Ci(n), t), i
}
function Nr(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? Object(arguments[t]) : {},
      r = Object.keys(n)
    typeof Object.getOwnPropertySymbols == 'function' &&
      (r = r.concat(
        Object.getOwnPropertySymbols(n).filter(function(o) {
          return Object.getOwnPropertyDescriptor(n, o).enumerable
        })
      )),
      r.forEach(function(o) {
        Fc(e, o, n[o])
      })
  }
  return e
}
function Fc(e, t, n) {
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
function Mr(e) {
  return (
    typeof e == 'object' &&
    typeof e.name == 'string' &&
    typeof e.theme == 'string' &&
    (typeof e.icon == 'object' || typeof e.icon == 'function')
  )
}
function yn(e, t, n) {
  return n
    ? _e(
        e.tag,
        Nr({ key: t }, n, e.attrs),
        (e.children || []).map(function(r, o) {
          return yn(
            r,
            ''
              .concat(t, '-')
              .concat(e.tag, '-')
              .concat(o)
          )
        })
      )
    : _e(
        e.tag,
        Nr({ key: t }, e.attrs),
        (e.children || []).map(function(r, o) {
          return yn(
            r,
            ''
              .concat(t, '-')
              .concat(e.tag, '-')
              .concat(o)
          )
        })
      )
}
function wi(e) {
  return Ze(e)[0]
}
function Oi(e) {
  return e ? (Array.isArray(e) ? e : [e]) : []
}
var Dc = `
.anticon {
  display: inline-block;
  color: inherit;
  font-style: normal;
  line-height: 0;
  text-align: center;
  text-transform: none;
  vertical-align: -0.125em;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.anticon > * {
  line-height: 1;
}

.anticon svg {
  display: inline-block;
}

.anticon::before {
  display: none;
}

.anticon .anticon-icon {
  display: block;
}

.anticon[tabindex] {
  cursor: pointer;
}

.anticon-spin::before,
.anticon-spin {
  display: inline-block;
  -webkit-animation: loadingCircle 1s infinite linear;
  animation: loadingCircle 1s infinite linear;
}

@-webkit-keyframes loadingCircle {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes loadingCircle {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
`
function Ti(e) {
  return e && e.getRootNode && e.getRootNode()
}
function Hc(e) {
  return Ti(e) instanceof ShadowRoot
}
function Bc(e) {
  return Hc(e) ? Ti(e) : null
}
var zc = function() {
    var t = bi(),
      n = t.prefixCls,
      r = t.csp,
      o = yo(),
      i = Dc
    n && (i = i.replace(/anticon/g, n.value)),
      vo(function() {
        var a = o.vnode.el,
          s = Bc(a)
        Lc(i, '@ant-design-vue-icons', {
          prepend: !0,
          csp: r.value,
          attachTo: s
        })
      })
  },
  Uc = ['icon', 'primaryColor', 'secondaryColor']
function qc(e, t) {
  if (e == null) return {}
  var n = Vc(e, t),
    r,
    o
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e)
    for (o = 0; o < i.length; o++)
      (r = i[o]),
        !(t.indexOf(r) >= 0) &&
          Object.prototype.propertyIsEnumerable.call(e, r) &&
          (n[r] = e[r])
  }
  return n
}
function Vc(e, t) {
  if (e == null) return {}
  var n = {},
    r = Object.keys(e),
    o,
    i
  for (i = 0; i < r.length; i++)
    (o = r[i]), !(t.indexOf(o) >= 0) && (n[o] = e[o])
  return n
}
function mt(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? Object(arguments[t]) : {},
      r = Object.keys(n)
    typeof Object.getOwnPropertySymbols == 'function' &&
      (r = r.concat(
        Object.getOwnPropertySymbols(n).filter(function(o) {
          return Object.getOwnPropertyDescriptor(n, o).enumerable
        })
      )),
      r.forEach(function(o) {
        Wc(e, o, n[o])
      })
  }
  return e
}
function Wc(e, t, n) {
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
var Je = { primaryColor: '#333', secondaryColor: '#E6E6E6', calculated: !1 }
function Gc(e) {
  var t = e.primaryColor,
    n = e.secondaryColor
  ;(Je.primaryColor = t),
    (Je.secondaryColor = n || wi(t)),
    (Je.calculated = !!n)
}
function Xc() {
  return mt({}, Je)
}
var He = function(t, n) {
  var r = mt({}, t, n.attrs),
    o = r.icon,
    i = r.primaryColor,
    a = r.secondaryColor,
    s = qc(r, Uc),
    u = Je
  if (
    (i && (u = { primaryColor: i, secondaryColor: a || wi(i) }), Mr(o), !Mr(o))
  )
    return null
  var c = o
  return (
    c &&
      typeof c.icon == 'function' &&
      (c = mt({}, c, { icon: c.icon(u.primaryColor, u.secondaryColor) })),
    yn(
      c.icon,
      'svg-'.concat(c.name),
      mt({}, s, {
        'data-icon': c.name,
        width: '1em',
        height: '1em',
        fill: 'currentColor',
        'aria-hidden': 'true'
      })
    )
  )
}
He.props = {
  icon: Object,
  primaryColor: String,
  secondaryColor: String,
  focusable: String
}
He.inheritAttrs = !1
He.displayName = 'IconBase'
He.getTwoToneColors = Xc
He.setTwoToneColors = Gc
const Un = He
function Kc(e, t) {
  return Zc(e) || Qc(e, t) || Yc(e, t) || Jc()
}
function Jc() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}
function Yc(e, t) {
  if (e) {
    if (typeof e == 'string') return Lr(e, t)
    var n = Object.prototype.toString.call(e).slice(8, -1)
    if (
      (n === 'Object' && e.constructor && (n = e.constructor.name),
      n === 'Map' || n === 'Set')
    )
      return Array.from(e)
    if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return Lr(e, t)
  }
}
function Lr(e, t) {
  ;(t == null || t > e.length) && (t = e.length)
  for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n]
  return r
}
function Qc(e, t) {
  var n =
    e == null
      ? null
      : (typeof Symbol < 'u' && e[Symbol.iterator]) || e['@@iterator']
  if (n != null) {
    var r = [],
      o = !0,
      i = !1,
      a,
      s
    try {
      for (
        n = n.call(e);
        !(o = (a = n.next()).done) && (r.push(a.value), !(t && r.length === t));
        o = !0
      );
    } catch (u) {
      ;(i = !0), (s = u)
    } finally {
      try {
        !o && n.return != null && n.return()
      } finally {
        if (i) throw s
      }
    }
    return r
  }
}
function Zc(e) {
  if (Array.isArray(e)) return e
}
function Pi(e) {
  var t = Oi(e),
    n = Kc(t, 2),
    r = n[0],
    o = n[1]
  return Un.setTwoToneColors({ primaryColor: r, secondaryColor: o })
}
function eu() {
  var e = Un.getTwoToneColors()
  return e.calculated ? [e.primaryColor, e.secondaryColor] : e.primaryColor
}
var tu = M({
    name: 'InsertStyles',
    setup: function() {
      return (
        zc(),
        function() {
          return null
        }
      )
    }
  }),
  nu = [
    'class',
    'icon',
    'spin',
    'rotate',
    'tabindex',
    'twoToneColor',
    'onClick'
  ]
function ru(e, t) {
  return su(e) || au(e, t) || iu(e, t) || ou()
}
function ou() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}
function iu(e, t) {
  if (e) {
    if (typeof e == 'string') return Fr(e, t)
    var n = Object.prototype.toString.call(e).slice(8, -1)
    if (
      (n === 'Object' && e.constructor && (n = e.constructor.name),
      n === 'Map' || n === 'Set')
    )
      return Array.from(e)
    if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return Fr(e, t)
  }
}
function Fr(e, t) {
  ;(t == null || t > e.length) && (t = e.length)
  for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n]
  return r
}
function au(e, t) {
  var n =
    e == null
      ? null
      : (typeof Symbol < 'u' && e[Symbol.iterator]) || e['@@iterator']
  if (n != null) {
    var r = [],
      o = !0,
      i = !1,
      a,
      s
    try {
      for (
        n = n.call(e);
        !(o = (a = n.next()).done) && (r.push(a.value), !(t && r.length === t));
        o = !0
      );
    } catch (u) {
      ;(i = !0), (s = u)
    } finally {
      try {
        !o && n.return != null && n.return()
      } finally {
        if (i) throw s
      }
    }
    return r
  }
}
function su(e) {
  if (Array.isArray(e)) return e
}
function Dr(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? Object(arguments[t]) : {},
      r = Object.keys(n)
    typeof Object.getOwnPropertySymbols == 'function' &&
      (r = r.concat(
        Object.getOwnPropertySymbols(n).filter(function(o) {
          return Object.getOwnPropertyDescriptor(n, o).enumerable
        })
      )),
      r.forEach(function(o) {
        Xe(e, o, n[o])
      })
  }
  return e
}
function Xe(e, t, n) {
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
function lu(e, t) {
  if (e == null) return {}
  var n = cu(e, t),
    r,
    o
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e)
    for (o = 0; o < i.length; o++)
      (r = i[o]),
        !(t.indexOf(r) >= 0) &&
          Object.prototype.propertyIsEnumerable.call(e, r) &&
          (n[r] = e[r])
  }
  return n
}
function cu(e, t) {
  if (e == null) return {}
  var n = {},
    r = Object.keys(e),
    o,
    i
  for (i = 0; i < r.length; i++)
    (o = r[i]), !(t.indexOf(o) >= 0) && (n[o] = e[o])
  return n
}
Pi(Da.primary)
var Be = function(t, n) {
  var r,
    o = Dr({}, t, n.attrs),
    i = o.class,
    a = o.icon,
    s = o.spin,
    u = o.rotate,
    c = o.tabindex,
    l = o.twoToneColor,
    f = o.onClick,
    d = lu(o, nu),
    m = bi(),
    p = m.prefixCls,
    g = m.rootClassName,
    S =
      ((r = {}),
      Xe(r, g.value, !!g.value),
      Xe(r, p.value, !0),
      Xe(r, ''.concat(p.value, '-').concat(a.name), !!a.name),
      Xe(r, ''.concat(p.value, '-spin'), !!s || a.name === 'loading'),
      r),
    b = c
  b === void 0 && f && (b = -1)
  var O = u
      ? {
          msTransform: 'rotate('.concat(u, 'deg)'),
          transform: 'rotate('.concat(u, 'deg)')
        }
      : void 0,
    T = Oi(l),
    P = ru(T, 2),
    E = P[0],
    $ = P[1]
  return C(
    'span',
    Dr({ role: 'img', 'aria-label': a.name }, d, {
      onClick: f,
      class: [S, i],
      tabindex: b
    }),
    [
      C(Un, { icon: a, primaryColor: E, secondaryColor: $, style: O }, null),
      C(tu, null, null)
    ]
  )
}
Be.props = { spin: Boolean, rotate: Number, icon: Object, twoToneColor: String }
Be.displayName = 'AntdIcon'
Be.inheritAttrs = !1
Be.getTwoToneColor = eu
Be.setTwoToneColor = Pi
const ae = Be
function Hr(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? Object(arguments[t]) : {},
      r = Object.keys(n)
    typeof Object.getOwnPropertySymbols == 'function' &&
      (r = r.concat(
        Object.getOwnPropertySymbols(n).filter(function(o) {
          return Object.getOwnPropertyDescriptor(n, o).enumerable
        })
      )),
      r.forEach(function(o) {
        uu(e, o, n[o])
      })
  }
  return e
}
function uu(e, t, n) {
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
var qn = function(t, n) {
  var r = Hr({}, t, n.attrs)
  return C(ae, Hr({}, r, { icon: Ha }), null)
}
qn.displayName = 'LoadingOutlined'
qn.inheritAttrs = !1
const Vn = qn
function Br(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? Object(arguments[t]) : {},
      r = Object.keys(n)
    typeof Object.getOwnPropertySymbols == 'function' &&
      (r = r.concat(
        Object.getOwnPropertySymbols(n).filter(function(o) {
          return Object.getOwnPropertyDescriptor(n, o).enumerable
        })
      )),
      r.forEach(function(o) {
        fu(e, o, n[o])
      })
  }
  return e
}
function fu(e, t, n) {
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
var Wn = function(t, n) {
  var r = Br({}, t, n.attrs)
  return C(ae, Br({}, r, { icon: Ba }), null)
}
Wn.displayName = 'CloseOutlined'
Wn.inheritAttrs = !1
const Gn = Wn
function zr(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? Object(arguments[t]) : {},
      r = Object.keys(n)
    typeof Object.getOwnPropertySymbols == 'function' &&
      (r = r.concat(
        Object.getOwnPropertySymbols(n).filter(function(o) {
          return Object.getOwnPropertyDescriptor(n, o).enumerable
        })
      )),
      r.forEach(function(o) {
        du(e, o, n[o])
      })
  }
  return e
}
function du(e, t, n) {
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
var Xn = function(t, n) {
  var r = zr({}, t, n.attrs)
  return C(ae, zr({}, r, { icon: za }), null)
}
Xn.displayName = 'CloseCircleFilled'
Xn.inheritAttrs = !1
const Ft = Xn
function Ur(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? Object(arguments[t]) : {},
      r = Object.keys(n)
    typeof Object.getOwnPropertySymbols == 'function' &&
      (r = r.concat(
        Object.getOwnPropertySymbols(n).filter(function(o) {
          return Object.getOwnPropertyDescriptor(n, o).enumerable
        })
      )),
      r.forEach(function(o) {
        pu(e, o, n[o])
      })
  }
  return e
}
function pu(e, t, n) {
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
var Kn = function(t, n) {
  var r = Ur({}, t, n.attrs)
  return C(ae, Ur({}, r, { icon: Ua }), null)
}
Kn.displayName = 'CheckCircleOutlined'
Kn.inheritAttrs = !1
const mu = Kn
function qr(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? Object(arguments[t]) : {},
      r = Object.keys(n)
    typeof Object.getOwnPropertySymbols == 'function' &&
      (r = r.concat(
        Object.getOwnPropertySymbols(n).filter(function(o) {
          return Object.getOwnPropertyDescriptor(n, o).enumerable
        })
      )),
      r.forEach(function(o) {
        gu(e, o, n[o])
      })
  }
  return e
}
function gu(e, t, n) {
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
var Jn = function(t, n) {
  var r = qr({}, t, n.attrs)
  return C(ae, qr({}, r, { icon: qa }), null)
}
Jn.displayName = 'ExclamationCircleOutlined'
Jn.inheritAttrs = !1
const hu = Jn
function Vr(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? Object(arguments[t]) : {},
      r = Object.keys(n)
    typeof Object.getOwnPropertySymbols == 'function' &&
      (r = r.concat(
        Object.getOwnPropertySymbols(n).filter(function(o) {
          return Object.getOwnPropertyDescriptor(n, o).enumerable
        })
      )),
      r.forEach(function(o) {
        yu(e, o, n[o])
      })
  }
  return e
}
function yu(e, t, n) {
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
var Yn = function(t, n) {
  var r = Vr({}, t, n.attrs)
  return C(ae, Vr({}, r, { icon: Va }), null)
}
Yn.displayName = 'InfoCircleOutlined'
Yn.inheritAttrs = !1
const vu = Yn
function Wr(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? Object(arguments[t]) : {},
      r = Object.keys(n)
    typeof Object.getOwnPropertySymbols == 'function' &&
      (r = r.concat(
        Object.getOwnPropertySymbols(n).filter(function(o) {
          return Object.getOwnPropertyDescriptor(n, o).enumerable
        })
      )),
      r.forEach(function(o) {
        bu(e, o, n[o])
      })
  }
  return e
}
function bu(e, t, n) {
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
var Qn = function(t, n) {
  var r = Wr({}, t, n.attrs)
  return C(ae, Wr({}, r, { icon: Wa }), null)
}
Qn.displayName = 'CloseCircleOutlined'
Qn.inheritAttrs = !1
const Cu = Qn
function Gr(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? Object(arguments[t]) : {},
      r = Object.keys(n)
    typeof Object.getOwnPropertySymbols == 'function' &&
      (r = r.concat(
        Object.getOwnPropertySymbols(n).filter(function(o) {
          return Object.getOwnPropertyDescriptor(n, o).enumerable
        })
      )),
      r.forEach(function(o) {
        Su(e, o, n[o])
      })
  }
  return e
}
function Su(e, t, n) {
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
var Zn = function(t, n) {
  var r = Gr({}, t, n.attrs)
  return C(ae, Gr({}, r, { icon: Ga }), null)
}
Zn.displayName = 'CheckCircleFilled'
Zn.inheritAttrs = !1
const Dt = Zn
function Xr(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? Object(arguments[t]) : {},
      r = Object.keys(n)
    typeof Object.getOwnPropertySymbols == 'function' &&
      (r = r.concat(
        Object.getOwnPropertySymbols(n).filter(function(o) {
          return Object.getOwnPropertyDescriptor(n, o).enumerable
        })
      )),
      r.forEach(function(o) {
        xu(e, o, n[o])
      })
  }
  return e
}
function xu(e, t, n) {
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
var er = function(t, n) {
  var r = Xr({}, t, n.attrs)
  return C(ae, Xr({}, r, { icon: Xa }), null)
}
er.displayName = 'ExclamationCircleFilled'
er.inheritAttrs = !1
const Ht = er
function Kr(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? Object(arguments[t]) : {},
      r = Object.keys(n)
    typeof Object.getOwnPropertySymbols == 'function' &&
      (r = r.concat(
        Object.getOwnPropertySymbols(n).filter(function(o) {
          return Object.getOwnPropertyDescriptor(n, o).enumerable
        })
      )),
      r.forEach(function(o) {
        wu(e, o, n[o])
      })
  }
  return e
}
function wu(e, t, n) {
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
var tr = function(t, n) {
  var r = Kr({}, t, n.attrs)
  return C(ae, Kr({}, r, { icon: Ka }), null)
}
tr.displayName = 'InfoCircleFilled'
tr.inheritAttrs = !1
const Bt = tr
let gt = v({}, Ae.Modal)
function Ou(e) {
  e ? (gt = v(v({}, gt), e)) : (gt = v({}, Ae.Modal))
}
function Up() {
  return gt
}
const vn = 'internalMark',
  ht = M({
    compatConfig: { MODE: 3 },
    name: 'ALocaleProvider',
    props: { locale: { type: Object }, ANT_MARK__: String },
    setup(e, t) {
      let { slots: n } = t
      Mn(e.ANT_MARK__ === vn)
      const r = Qe({
        antLocale: v(v({}, e.locale), { exist: !0 }),
        ANT_MARK__: vn
      })
      return (
        me('localeData', r),
        le(
          () => e.locale,
          o => {
            Ou(o && o.Modal), (r.antLocale = v(v({}, o), { exist: !0 }))
          },
          { immediate: !0 }
        ),
        () => {
          var o
          return (o = n.default) === null || o === void 0 ? void 0 : o.call(n)
        }
      )
    }
  })
ht.install = function(e) {
  return e.component(ht.name, ht), e
}
const Tu = In(ht),
  Ei = M({
    name: 'Notice',
    inheritAttrs: !1,
    props: [
      'prefixCls',
      'duration',
      'updateMark',
      'noticeKey',
      'closeIcon',
      'closable',
      'props',
      'onClick',
      'onClose',
      'holder',
      'visible'
    ],
    setup(e, t) {
      let { attrs: n, slots: r } = t,
        o,
        i = !1
      const a = w(() => (e.duration === void 0 ? 4.5 : e.duration)),
        s = () => {
          a.value &&
            !i &&
            (o = setTimeout(() => {
              c()
            }, a.value * 1e3))
        },
        u = () => {
          o && (clearTimeout(o), (o = null))
        },
        c = f => {
          f && f.stopPropagation(), u()
          const { onClose: d, noticeKey: m } = e
          d && d(m)
        },
        l = () => {
          u(), s()
        }
      return (
        _n(() => {
          s()
        }),
        Ra(() => {
          ;(i = !0), u()
        }),
        le(
          [a, () => e.updateMark, () => e.visible],
          (f, d) => {
            let [m, p, g] = f,
              [S, b, O] = d
            ;(m !== S || p !== b || (g !== O && O)) && l()
          },
          { flush: 'post' }
        ),
        () => {
          var f, d
          const {
              prefixCls: m,
              closable: p,
              closeIcon: g = (f = r.closeIcon) === null || f === void 0
                ? void 0
                : f.call(r),
              onClick: S,
              holder: b
            } = e,
            { class: O, style: T } = n,
            P = `${m}-notice`,
            E = Object.keys(n).reduce(
              (y, _) => (
                (_.startsWith('data-') ||
                  _.startsWith('aria-') ||
                  _ === 'role') &&
                  (y[_] = n[_]),
                y
              ),
              {}
            ),
            $ = C(
              'div',
              F(
                {
                  class: U(P, O, { [`${P}-closable`]: p }),
                  style: T,
                  onMouseenter: u,
                  onMouseleave: s,
                  onClick: S
                },
                E
              ),
              [
                C('div', { class: `${P}-content` }, [
                  (d = r.default) === null || d === void 0 ? void 0 : d.call(r)
                ]),
                p
                  ? C('a', { tabindex: 0, onClick: c, class: `${P}-close` }, [
                      g || C('span', { class: `${P}-close-x` }, null)
                    ])
                  : null
              ]
            )
          return b ? C(bo, { to: b }, { default: () => $ }) : $
        }
      )
    }
  })
var Pu =
  (globalThis && globalThis.__rest) ||
  function(e, t) {
    var n = {}
    for (var r in e)
      Object.prototype.hasOwnProperty.call(e, r) &&
        t.indexOf(r) < 0 &&
        (n[r] = e[r])
    if (e != null && typeof Object.getOwnPropertySymbols == 'function')
      for (var o = 0, r = Object.getOwnPropertySymbols(e); o < r.length; o++)
        t.indexOf(r[o]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(e, r[o]) &&
          (n[r[o]] = e[r[o]])
    return n
  }
let Jr = 0
const Eu = Date.now()
function Yr() {
  const e = Jr
  return (Jr += 1), `rcNotification_${Eu}_${e}`
}
const bn = M({
  name: 'Notification',
  inheritAttrs: !1,
  props: [
    'prefixCls',
    'transitionName',
    'animation',
    'maxCount',
    'closeIcon',
    'hashId'
  ],
  setup(e, t) {
    let { attrs: n, expose: r, slots: o } = t
    const i = new Map(),
      a = H([]),
      s = w(() => {
        const { prefixCls: l, animation: f = 'fade' } = e
        let d = e.transitionName
        return !d && f && (d = `${l}-${f}`), yi(d)
      }),
      u = (l, f) => {
        const d = l.key || Yr(),
          m = v(v({}, l), { key: d }),
          { maxCount: p } = e,
          g = a.value.map(b => b.notice.key).indexOf(d),
          S = a.value.concat()
        g !== -1
          ? S.splice(g, 1, { notice: m, holderCallback: f })
          : (p &&
              a.value.length >= p &&
              ((m.key = S[0].notice.key),
              (m.updateMark = Yr()),
              (m.userPassKey = d),
              S.shift()),
            S.push({ notice: m, holderCallback: f })),
          (a.value = S)
      },
      c = l => {
        a.value = Ia(a.value).filter(f => {
          let {
            notice: { key: d, userPassKey: m }
          } = f
          return (m || d) !== l
        })
      }
    return (
      r({ add: u, remove: c, notices: a }),
      () => {
        var l
        const {
            prefixCls: f,
            closeIcon: d = (l = o.closeIcon) === null || l === void 0
              ? void 0
              : l.call(o, { prefixCls: f })
          } = e,
          m = a.value.map((g, S) => {
            let { notice: b, holderCallback: O } = g
            const T = S === a.value.length - 1 ? b.updateMark : void 0,
              { key: P, userPassKey: E } = b,
              { content: $ } = b,
              y = v(
                v(
                  v(
                    {
                      prefixCls: f,
                      closeIcon:
                        typeof d == 'function' ? d({ prefixCls: f }) : d
                    },
                    b
                  ),
                  b.props
                ),
                {
                  key: P,
                  noticeKey: E || P,
                  updateMark: T,
                  onClose: _ => {
                    var I
                    c(_), (I = b.onClose) === null || I === void 0 || I.call(b)
                  },
                  onClick: b.onClick
                }
              )
            return O
              ? C(
                  'div',
                  {
                    key: P,
                    class: `${f}-hook-holder`,
                    ref: _ => {
                      typeof P > 'u' ||
                        (_ ? (i.set(P, _), O(_, y)) : i.delete(P))
                    }
                  },
                  null
                )
              : C(Ei, F(F({}, y), {}, { class: U(y.class, e.hashId) }), {
                  default: () => [
                    typeof $ == 'function' ? $({ prefixCls: f }) : $
                  ]
                })
          }),
          p = { [f]: 1, [n.class]: !!n.class, [e.hashId]: !0 }
        return C(
          'div',
          { class: p, style: n.style || { top: '65px', left: '50%' } },
          [C(Co, F({ tag: 'div' }, s.value), { default: () => [m] })]
        )
      }
    )
  }
})
bn.newInstance = function(t, n) {
  const r = t || {},
    {
      name: o = 'notification',
      getContainer: i,
      appContext: a,
      prefixCls: s,
      rootPrefixCls: u,
      transitionName: c,
      hasTransitionName: l,
      useStyle: f
    } = r,
    d = Pu(r, [
      'name',
      'getContainer',
      'appContext',
      'prefixCls',
      'rootPrefixCls',
      'transitionName',
      'hasTransitionName',
      'useStyle'
    ]),
    m = document.createElement('div')
  i ? i().appendChild(m) : document.body.appendChild(m)
  const p = M({
      compatConfig: { MODE: 3 },
      name: 'NotificationWrapper',
      setup(S, b) {
        let { attrs: O } = b
        const T = J(),
          P = w(() => D.getPrefixCls(o, s)),
          [, E] = f(P)
        return (
          _n(() => {
            n({
              notice($) {
                var y
                ;(y = T.value) === null || y === void 0 || y.add($)
              },
              removeNotice($) {
                var y
                ;(y = T.value) === null || y === void 0 || y.remove($)
              },
              destroy() {
                dr(null, m), m.parentNode && m.parentNode.removeChild(m)
              },
              component: T
            })
          }),
          () => {
            const $ = D,
              y = $.getRootPrefixCls(u, P.value),
              _ = l ? c : `${P.value}-${c}`
            return C(Ye, F(F({}, $), {}, { prefixCls: y }), {
              default: () => [
                C(
                  bn,
                  F(
                    F({ ref: T }, O),
                    {},
                    { prefixCls: P.value, transitionName: _, hashId: E.value }
                  ),
                  null
                )
              ]
            })
          }
        )
      }
    }),
    g = C(p, d)
  ;(g.appContext = a || g.appContext), dr(g, m)
}
const $i = bn
let Qr = 0
const $u = Date.now()
function Zr() {
  const e = Qr
  return (Qr += 1), `rcNotification_${$u}_${e}`
}
const _u = M({
    name: 'HookNotification',
    inheritAttrs: !1,
    props: [
      'prefixCls',
      'transitionName',
      'animation',
      'maxCount',
      'closeIcon',
      'hashId',
      'remove',
      'notices',
      'getStyles',
      'getClassName',
      'onAllRemoved',
      'getContainer'
    ],
    setup(e, t) {
      let { attrs: n, slots: r } = t
      const o = new Map(),
        i = w(() => e.notices),
        a = w(() => {
          let l = e.transitionName
          if (!l && e.animation)
            switch (typeof e.animation) {
              case 'string':
                l = e.animation
                break
              case 'function':
                l = e.animation().name
                break
              case 'object':
                l = e.animation.name
                break
              default:
                l = `${e.prefixCls}-fade`
                break
            }
          return yi(l)
        }),
        s = l => e.remove(l),
        u = H({})
      le(i, () => {
        const l = {}
        Object.keys(u.value).forEach(f => {
          l[f] = []
        }),
          e.notices.forEach(f => {
            const { placement: d = 'topRight' } = f.notice
            d && ((l[d] = l[d] || []), l[d].push(f))
          }),
          (u.value = l)
      })
      const c = w(() => Object.keys(u.value))
      return () => {
        var l
        const {
            prefixCls: f,
            closeIcon: d = (l = r.closeIcon) === null || l === void 0
              ? void 0
              : l.call(r, { prefixCls: f })
          } = e,
          m = c.value.map(p => {
            var g, S
            const b = u.value[p],
              O =
                (g = e.getClassName) === null || g === void 0
                  ? void 0
                  : g.call(e, p),
              T =
                (S = e.getStyles) === null || S === void 0
                  ? void 0
                  : S.call(e, p),
              P = b.map((y, _) => {
                let { notice: I, holderCallback: q } = y
                const ne = _ === i.value.length - 1 ? I.updateMark : void 0,
                  { key: re, userPassKey: Xt } = I,
                  { content: qe } = I,
                  x = v(
                    v(
                      v(
                        {
                          prefixCls: f,
                          closeIcon:
                            typeof d == 'function' ? d({ prefixCls: f }) : d
                        },
                        I
                      ),
                      I.props
                    ),
                    {
                      key: re,
                      noticeKey: Xt || re,
                      updateMark: ne,
                      onClose: A => {
                        var N
                        s(A),
                          (N = I.onClose) === null || N === void 0 || N.call(I)
                      },
                      onClick: I.onClick
                    }
                  )
                return q
                  ? C(
                      'div',
                      {
                        key: re,
                        class: `${f}-hook-holder`,
                        ref: A => {
                          typeof re > 'u' ||
                            (A ? (o.set(re, A), q(A, x)) : o.delete(re))
                        }
                      },
                      null
                    )
                  : C(Ei, F(F({}, x), {}, { class: U(x.class, e.hashId) }), {
                      default: () => [
                        typeof qe == 'function' ? qe({ prefixCls: f }) : qe
                      ]
                    })
              }),
              E = {
                [f]: 1,
                [`${f}-${p}`]: 1,
                [n.class]: !!n.class,
                [e.hashId]: !0,
                [O]: !!O
              }
            function $() {
              var y
              b.length > 0 ||
                (Reflect.deleteProperty(u.value, p),
                (y = e.onAllRemoved) === null || y === void 0 || y.call(e))
            }
            return C(
              'div',
              {
                key: p,
                class: E,
                style: n.style || T || { top: '65px', left: '50%' }
              },
              [
                C(Co, F(F({ tag: 'div' }, a.value), {}, { onAfterLeave: $ }), {
                  default: () => [P]
                })
              ]
            )
          })
        return C(_c, { getContainer: e.getContainer }, { default: () => [m] })
      }
    }
  }),
  Au = _u
var Ru =
  (globalThis && globalThis.__rest) ||
  function(e, t) {
    var n = {}
    for (var r in e)
      Object.prototype.hasOwnProperty.call(e, r) &&
        t.indexOf(r) < 0 &&
        (n[r] = e[r])
    if (e != null && typeof Object.getOwnPropertySymbols == 'function')
      for (var o = 0, r = Object.getOwnPropertySymbols(e); o < r.length; o++)
        t.indexOf(r[o]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(e, r[o]) &&
          (n[r[o]] = e[r[o]])
    return n
  }
const Iu = () => document.body
let eo = 0
function ju() {
  const e = {}
  for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++)
    n[r] = arguments[r]
  return (
    n.forEach(o => {
      o &&
        Object.keys(o).forEach(i => {
          const a = o[i]
          a !== void 0 && (e[i] = a)
        })
    }),
    e
  )
}
function _i() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}
  const {
      getContainer: t = Iu,
      motion: n,
      prefixCls: r,
      maxCount: o,
      getClassName: i,
      getStyles: a,
      onAllRemoved: s
    } = e,
    u = Ru(e, [
      'getContainer',
      'motion',
      'prefixCls',
      'maxCount',
      'getClassName',
      'getStyles',
      'onAllRemoved'
    ]),
    c = J([]),
    l = J(),
    f = (b, O) => {
      const T = b.key || Zr(),
        P = v(v({}, b), { key: T }),
        E = c.value.map(y => y.notice.key).indexOf(T),
        $ = c.value.concat()
      E !== -1
        ? $.splice(E, 1, { notice: P, holderCallback: O })
        : (o &&
            c.value.length >= o &&
            ((P.key = $[0].notice.key),
            (P.updateMark = Zr()),
            (P.userPassKey = T),
            $.shift()),
          $.push({ notice: P, holderCallback: O })),
        (c.value = $)
    },
    d = b => {
      c.value = c.value.filter(O => {
        let {
          notice: { key: T, userPassKey: P }
        } = O
        return (P || T) !== b
      })
    },
    m = () => {
      c.value = []
    },
    p = () =>
      C(
        Au,
        {
          ref: l,
          prefixCls: r,
          maxCount: o,
          notices: c.value,
          remove: d,
          getClassName: i,
          getStyles: a,
          animation: n,
          hashId: e.hashId,
          onAllRemoved: s,
          getContainer: t
        },
        null
      ),
    g = J([]),
    S = {
      open: b => {
        const O = ju(u, b)
        ;(O.key === null || O.key === void 0) &&
          ((O.key = `vc-notification-${eo}`), (eo += 1)),
          (g.value = [...g.value, { type: 'open', config: O }])
      },
      close: b => {
        g.value = [...g.value, { type: 'close', key: b }]
      },
      destroy: () => {
        g.value = [...g.value, { type: 'destroy' }]
      }
    }
  return (
    le(g, () => {
      g.value.length &&
        (g.value.forEach(b => {
          switch (b.type) {
            case 'open':
              f(b.config)
              break
            case 'close':
              d(b.key)
              break
            case 'destroy':
              m()
              break
          }
        }),
        (g.value = []))
    }),
    [S, p]
  )
}
const ku = e => {
    const {
        componentCls: t,
        iconCls: n,
        boxShadowSecondary: r,
        colorBgElevated: o,
        colorSuccess: i,
        colorError: a,
        colorWarning: s,
        colorInfo: u,
        fontSizeLG: c,
        motionEaseInOutCirc: l,
        motionDurationSlow: f,
        marginXS: d,
        paddingXS: m,
        borderRadiusLG: p,
        zIndexPopup: g,
        messageNoticeContentPadding: S
      } = e,
      b = new Ce('MessageMoveIn', {
        '0%': { padding: 0, transform: 'translateY(-100%)', opacity: 0 },
        '100%': { padding: m, transform: 'translateY(0)', opacity: 1 }
      }),
      O = new Ce('MessageMoveOut', {
        '0%': { maxHeight: e.height, padding: m, opacity: 1 },
        '100%': { maxHeight: 0, padding: 0, opacity: 0 }
      })
    return [
      {
        [t]: v(v({}, Qo(e)), {
          position: 'fixed',
          top: d,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          pointerEvents: 'none',
          zIndex: g,
          [`${t}-move-up`]: { animationFillMode: 'forwards' },
          [`
        ${t}-move-up-appear,
        ${t}-move-up-enter
      `]: {
            animationName: b,
            animationDuration: f,
            animationPlayState: 'paused',
            animationTimingFunction: l
          },
          [`
        ${t}-move-up-appear${t}-move-up-appear-active,
        ${t}-move-up-enter${t}-move-up-enter-active
      `]: { animationPlayState: 'running' },
          [`${t}-move-up-leave`]: {
            animationName: O,
            animationDuration: f,
            animationPlayState: 'paused',
            animationTimingFunction: l
          },
          [`${t}-move-up-leave${t}-move-up-leave-active`]: {
            animationPlayState: 'running'
          },
          '&-rtl': { direction: 'rtl', span: { direction: 'rtl' } }
        })
      },
      {
        [`${t}-notice`]: {
          padding: m,
          textAlign: 'center',
          [n]: {
            verticalAlign: 'text-bottom',
            marginInlineEnd: d,
            fontSize: c
          },
          [`${t}-notice-content`]: {
            display: 'inline-block',
            padding: S,
            background: o,
            borderRadius: p,
            boxShadow: r,
            pointerEvents: 'all'
          },
          [`${t}-success ${n}`]: { color: i },
          [`${t}-error ${n}`]: { color: a },
          [`${t}-warning ${n}`]: { color: s },
          [`
        ${t}-info ${n},
        ${t}-loading ${n}`]: { color: u }
        }
      },
      { [`${t}-notice-pure-panel`]: { padding: 0, textAlign: 'start' } }
    ]
  },
  Ai = Dn(
    'Message',
    e => {
      const t = kt(e, {
        messageNoticeContentPadding: `${(e.controlHeightLG -
          e.fontSize * e.lineHeight) /
          2}px ${e.paddingSM}px`
      })
      return [ku(t)]
    },
    e => ({ height: 150, zIndexPopup: e.zIndexPopupBase + 10 })
  ),
  Nu = {
    info: C(Bt, null, null),
    success: C(Dt, null, null),
    error: C(Ft, null, null),
    warning: C(Ht, null, null),
    loading: C(Vn, null, null)
  },
  Mu = M({
    name: 'PureContent',
    inheritAttrs: !1,
    props: ['prefixCls', 'type', 'icon'],
    setup(e, t) {
      let { slots: n } = t
      return () => {
        var r
        return C(
          'div',
          {
            class: U(
              `${e.prefixCls}-custom-content`,
              `${e.prefixCls}-${e.type}`
            )
          },
          [
            e.icon || Nu[e.type],
            C('span', null, [
              (r = n.default) === null || r === void 0 ? void 0 : r.call(n)
            ])
          ]
        )
      }
    }
  })
var Lu =
  (globalThis && globalThis.__rest) ||
  function(e, t) {
    var n = {}
    for (var r in e)
      Object.prototype.hasOwnProperty.call(e, r) &&
        t.indexOf(r) < 0 &&
        (n[r] = e[r])
    if (e != null && typeof Object.getOwnPropertySymbols == 'function')
      for (var o = 0, r = Object.getOwnPropertySymbols(e); o < r.length; o++)
        t.indexOf(r[o]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(e, r[o]) &&
          (n[r[o]] = e[r[o]])
    return n
  }
const Fu = 8,
  Du = 3,
  Hu = M({
    name: 'Holder',
    inheritAttrs: !1,
    props: [
      'top',
      'prefixCls',
      'getContainer',
      'maxCount',
      'duration',
      'rtl',
      'transitionName',
      'onAllRemoved',
      'animation',
      'staticGetContainer'
    ],
    setup(e, t) {
      let { expose: n } = t
      var r, o
      const { getPrefixCls: i, getPopupContainer: a } = Mt('message', e),
        s = w(() => i('message', e.prefixCls)),
        [, u] = Ai(s),
        c = () => {
          var g
          const S = (g = e.top) !== null && g !== void 0 ? g : Fu
          return {
            left: '50%',
            transform: 'translateX(-50%)',
            top: typeof S == 'number' ? `${S}px` : S
          }
        },
        l = () => U(u.value, e.rtl ? `${s.value}-rtl` : ''),
        f = () => {
          var g
          return Pc({
            prefixCls: s.value,
            animation:
              (g = e.animation) !== null && g !== void 0 ? g : 'move-up',
            transitionName: e.transitionName
          })
        },
        d = C('span', { class: `${s.value}-close-x` }, [
          C(Gn, { class: `${s.value}-close-icon` }, null)
        ]),
        [m, p] = _i({
          getStyles: c,
          prefixCls: s.value,
          getClassName: l,
          motion: f,
          closable: !1,
          closeIcon: d,
          duration: (r = e.duration) !== null && r !== void 0 ? r : Du,
          getContainer:
            (o = e.staticGetContainer) !== null && o !== void 0 ? o : a.value,
          maxCount: e.maxCount,
          onAllRemoved: e.onAllRemoved
        })
      return n(v(v({}, m), { prefixCls: s, hashId: u })), p
    }
  })
let to = 0
function Bu(e) {
  const t = J(null),
    n = Symbol('messageHolderKey'),
    r = u => {
      var c
      ;(c = t.value) === null || c === void 0 || c.close(u)
    },
    o = u => {
      if (!t.value) {
        const E = () => {}
        return (E.then = () => {}), E
      }
      const { open: c, prefixCls: l, hashId: f } = t.value,
        d = `${l}-notice`,
        { content: m, icon: p, type: g, key: S, class: b, onClose: O } = u,
        T = Lu(u, ['content', 'icon', 'type', 'key', 'class', 'onClose'])
      let P = S
      return (
        P == null && ((to += 1), (P = `antd-message-${to}`)),
        ps(
          E => (
            c(
              v(v({}, T), {
                key: P,
                content: () =>
                  C(
                    Mu,
                    {
                      prefixCls: l,
                      type: g,
                      icon: typeof p == 'function' ? p() : p
                    },
                    { default: () => [typeof m == 'function' ? m() : m] }
                  ),
                placement: 'top',
                class: U(g && `${d}-${g}`, f, b),
                onClose: () => {
                  O == null || O(), E()
                }
              })
            ),
            () => {
              r(P)
            }
          )
        )
      )
    },
    a = {
      open: o,
      destroy: u => {
        var c
        u !== void 0
          ? r(u)
          : (c = t.value) === null || c === void 0 || c.destroy()
      }
    }
  return (
    ['info', 'success', 'warning', 'error', 'loading'].forEach(u => {
      const c = (l, f, d) => {
        let m
        l && typeof l == 'object' && 'content' in l
          ? (m = l)
          : (m = { content: l })
        let p, g
        typeof f == 'function' ? (g = f) : ((p = f), (g = d))
        const S = v(v({ onClose: g, duration: p }, m), { type: u })
        return o(S)
      }
      a[u] = c
    }),
    [a, () => C(Hu, F(F({ key: n }, e), {}, { ref: t }), null)]
  )
}
function zu(e) {
  return Bu(e)
}
let Ri = 3,
  Ii,
  z,
  Uu = 1,
  ji = '',
  ki = 'move-up',
  Ni = !1,
  Mi = () => document.body,
  Li,
  Fi = !1
function qu() {
  return Uu++
}
function Vu(e) {
  e.top !== void 0 && ((Ii = e.top), (z = null)),
    e.duration !== void 0 && (Ri = e.duration),
    e.prefixCls !== void 0 && (ji = e.prefixCls),
    e.getContainer !== void 0 && ((Mi = e.getContainer), (z = null)),
    e.transitionName !== void 0 &&
      ((ki = e.transitionName), (z = null), (Ni = !0)),
    e.maxCount !== void 0 && ((Li = e.maxCount), (z = null)),
    e.rtl !== void 0 && (Fi = e.rtl)
}
function Wu(e, t) {
  if (z) {
    t(z)
    return
  }
  $i.newInstance(
    {
      appContext: e.appContext,
      prefixCls: e.prefixCls || ji,
      rootPrefixCls: e.rootPrefixCls,
      transitionName: ki,
      hasTransitionName: Ni,
      style: { top: Ii },
      getContainer: Mi || e.getPopupContainer,
      maxCount: Li,
      name: 'message',
      useStyle: Ai
    },
    n => {
      if (z) {
        t(z)
        return
      }
      ;(z = n), t(n)
    }
  )
}
const Di = { info: Bt, success: Dt, error: Ft, warning: Ht, loading: Vn },
  Gu = Object.keys(Di)
function Xu(e) {
  const t = e.duration !== void 0 ? e.duration : Ri,
    n = e.key || qu(),
    r = new Promise(i => {
      const a = () => (typeof e.onClose == 'function' && e.onClose(), i(!0))
      Wu(e, s => {
        s.notice({
          key: n,
          duration: t,
          style: e.style || {},
          class: e.class,
          content: u => {
            let { prefixCls: c } = u
            const l = Di[e.type],
              f = l ? C(l, null, null) : '',
              d = U(`${c}-custom-content`, {
                [`${c}-${e.type}`]: e.type,
                [`${c}-rtl`]: Fi === !0
              })
            return C('div', { class: d }, [
              typeof e.icon == 'function' ? e.icon() : e.icon || f,
              C('span', null, [
                typeof e.content == 'function' ? e.content() : e.content
              ])
            ])
          },
          onClose: a,
          onClick: e.onClick
        })
      })
    }),
    o = () => {
      z && z.removeNotice(n)
    }
  return (o.then = (i, a) => r.then(i, a)), (o.promise = r), o
}
function Ku(e) {
  return Object.prototype.toString.call(e) === '[object Object]' && !!e.content
}
const it = {
  open: Xu,
  config: Vu,
  destroy(e) {
    if (z)
      if (e) {
        const { removeNotice: t } = z
        t(e)
      } else {
        const { destroy: t } = z
        t(), (z = null)
      }
  }
}
function Ju(e, t) {
  e[t] = (n, r, o) =>
    Ku(n)
      ? e.open(v(v({}, n), { type: t }))
      : (typeof r == 'function' && ((o = r), (r = void 0)),
        e.open({ content: n, duration: r, type: t, onClose: o }))
}
Gu.forEach(e => Ju(it, e))
it.warn = it.warning
it.useMessage = zu
const Yu = it,
  Qu = e => {
    const { componentCls: t, width: n, notificationMarginEdge: r } = e,
      o = new Ce('antNotificationTopFadeIn', {
        '0%': { marginTop: '-100%', opacity: 0 },
        '100%': { marginTop: 0, opacity: 1 }
      }),
      i = new Ce('antNotificationBottomFadeIn', {
        '0%': { marginBottom: '-100%', opacity: 0 },
        '100%': { marginBottom: 0, opacity: 1 }
      }),
      a = new Ce('antNotificationLeftFadeIn', {
        '0%': { right: { _skip_check_: !0, value: n }, opacity: 0 },
        '100%': { right: { _skip_check_: !0, value: 0 }, opacity: 1 }
      })
    return {
      [`&${t}-top, &${t}-bottom`]: { marginInline: 0 },
      [`&${t}-top`]: {
        [`${t}-fade-enter${t}-fade-enter-active, ${t}-fade-appear${t}-fade-appear-active`]: {
          animationName: o
        }
      },
      [`&${t}-bottom`]: {
        [`${t}-fade-enter${t}-fade-enter-active, ${t}-fade-appear${t}-fade-appear-active`]: {
          animationName: i
        }
      },
      [`&${t}-topLeft, &${t}-bottomLeft`]: {
        marginInlineEnd: 0,
        marginInlineStart: r,
        [`${t}-fade-enter${t}-fade-enter-active, ${t}-fade-appear${t}-fade-appear-active`]: {
          animationName: a
        }
      }
    }
  },
  Zu = Qu,
  ef = e => {
    const {
        iconCls: t,
        componentCls: n,
        boxShadowSecondary: r,
        fontSizeLG: o,
        notificationMarginBottom: i,
        borderRadiusLG: a,
        colorSuccess: s,
        colorInfo: u,
        colorWarning: c,
        colorError: l,
        colorTextHeading: f,
        notificationBg: d,
        notificationPadding: m,
        notificationMarginEdge: p,
        motionDurationMid: g,
        motionEaseInOut: S,
        fontSize: b,
        lineHeight: O,
        width: T,
        notificationIconSize: P
      } = e,
      E = `${n}-notice`,
      $ = new Ce('antNotificationFadeIn', {
        '0%': { left: { _skip_check_: !0, value: T }, opacity: 0 },
        '100%': { left: { _skip_check_: !0, value: 0 }, opacity: 1 }
      }),
      y = new Ce('antNotificationFadeOut', {
        '0%': { maxHeight: e.animationMaxHeight, marginBottom: i, opacity: 1 },
        '100%': {
          maxHeight: 0,
          marginBottom: 0,
          paddingTop: 0,
          paddingBottom: 0,
          opacity: 0
        }
      })
    return [
      {
        [n]: v(
          v(
            v(v({}, Qo(e)), {
              position: 'fixed',
              zIndex: e.zIndexPopup,
              marginInlineEnd: p,
              [`${n}-hook-holder`]: { position: 'relative' },
              [`&${n}-top, &${n}-bottom`]: {
                [`${n}-notice`]: { marginInline: 'auto auto' }
              },
              [`&${n}-topLeft, &${n}-bottomLeft`]: {
                [`${n}-notice`]: {
                  marginInlineEnd: 'auto',
                  marginInlineStart: 0
                }
              },
              [`${n}-fade-enter, ${n}-fade-appear`]: {
                animationDuration: e.motionDurationMid,
                animationTimingFunction: S,
                animationFillMode: 'both',
                opacity: 0,
                animationPlayState: 'paused'
              },
              [`${n}-fade-leave`]: {
                animationTimingFunction: S,
                animationFillMode: 'both',
                animationDuration: g,
                animationPlayState: 'paused'
              },
              [`${n}-fade-enter${n}-fade-enter-active, ${n}-fade-appear${n}-fade-appear-active`]: {
                animationName: $,
                animationPlayState: 'running'
              },
              [`${n}-fade-leave${n}-fade-leave-active`]: {
                animationName: y,
                animationPlayState: 'running'
              }
            }),
            Zu(e)
          ),
          {
            '&-rtl': {
              direction: 'rtl',
              [`${n}-notice-btn`]: { float: 'left' }
            }
          }
        )
      },
      {
        [E]: {
          position: 'relative',
          width: T,
          maxWidth: `calc(100vw - ${p * 2}px)`,
          marginBottom: i,
          marginInlineStart: 'auto',
          padding: m,
          overflow: 'hidden',
          lineHeight: O,
          wordWrap: 'break-word',
          background: d,
          borderRadius: a,
          boxShadow: r,
          [`${n}-close-icon`]: { fontSize: b, cursor: 'pointer' },
          [`${E}-message`]: {
            marginBottom: e.marginXS,
            color: f,
            fontSize: o,
            lineHeight: e.lineHeightLG
          },
          [`${E}-description`]: { fontSize: b },
          [`&${E}-closable ${E}-message`]: { paddingInlineEnd: e.paddingLG },
          [`${E}-with-icon ${E}-message`]: {
            marginBottom: e.marginXS,
            marginInlineStart: e.marginSM + P,
            fontSize: o
          },
          [`${E}-with-icon ${E}-description`]: {
            marginInlineStart: e.marginSM + P,
            fontSize: b
          },
          [`${E}-icon`]: {
            position: 'absolute',
            fontSize: P,
            lineHeight: 0,
            [`&-success${t}`]: { color: s },
            [`&-info${t}`]: { color: u },
            [`&-warning${t}`]: { color: c },
            [`&-error${t}`]: { color: l }
          },
          [`${E}-close`]: {
            position: 'absolute',
            top: e.notificationPaddingVertical,
            insetInlineEnd: e.notificationPaddingHorizontal,
            color: e.colorIcon,
            outline: 'none',
            width: e.notificationCloseButtonSize,
            height: e.notificationCloseButtonSize,
            borderRadius: e.borderRadiusSM,
            transition: `background-color ${e.motionDurationMid}, color ${e.motionDurationMid}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            '&:hover': {
              color: e.colorIconHover,
              backgroundColor: e.wireframe ? 'transparent' : e.colorFillContent
            }
          },
          [`${E}-btn`]: { float: 'right', marginTop: e.marginSM }
        }
      },
      { [`${E}-pure-panel`]: { margin: 0 } }
    ]
  },
  Hi = Dn(
    'Notification',
    e => {
      const t = e.paddingMD,
        n = e.paddingLG,
        r = kt(e, {
          notificationBg: e.colorBgElevated,
          notificationPaddingVertical: t,
          notificationPaddingHorizontal: n,
          notificationPadding: `${e.paddingMD}px ${e.paddingContentHorizontalLG}px`,
          notificationMarginBottom: e.margin,
          notificationMarginEdge: e.marginLG,
          animationMaxHeight: 150,
          notificationIconSize: e.fontSizeLG * e.lineHeightLG,
          notificationCloseButtonSize: e.controlHeightLG * 0.55
        })
      return [ef(r)]
    },
    e => ({ zIndexPopup: e.zIndexPopupBase + 50, width: 384 })
  )
function tf(e, t) {
  return (
    t ||
    C('span', { class: `${e}-close-x` }, [
      C(Gn, { class: `${e}-close-icon` }, null)
    ])
  )
}
C(Bt, null, null),
  C(Dt, null, null),
  C(Ft, null, null),
  C(Ht, null, null),
  C(Vn, null, null)
const nf = { success: Dt, info: Bt, error: Ft, warning: Ht }
function rf(e) {
  let {
      prefixCls: t,
      icon: n,
      type: r,
      message: o,
      description: i,
      btn: a
    } = e,
    s = null
  if (n) s = C('span', { class: `${t}-icon` }, [Te(n)])
  else if (r) {
    const u = nf[r]
    s = C(u, { class: `${t}-icon ${t}-icon-${r}` }, null)
  }
  return C('div', { class: U({ [`${t}-with-icon`]: s }), role: 'alert' }, [
    s,
    C('div', { class: `${t}-message` }, [o]),
    C('div', { class: `${t}-description` }, [i]),
    a && C('div', { class: `${t}-btn` }, [a])
  ])
}
function Bi(e, t, n) {
  let r
  switch (
    ((t = typeof t == 'number' ? `${t}px` : t),
    (n = typeof n == 'number' ? `${n}px` : n),
    e)
  ) {
    case 'top':
      r = {
        left: '50%',
        transform: 'translateX(-50%)',
        right: 'auto',
        top: t,
        bottom: 'auto'
      }
      break
    case 'topLeft':
      r = { left: 0, top: t, bottom: 'auto' }
      break
    case 'topRight':
      r = { right: 0, top: t, bottom: 'auto' }
      break
    case 'bottom':
      r = {
        left: '50%',
        transform: 'translateX(-50%)',
        right: 'auto',
        top: 'auto',
        bottom: n
      }
      break
    case 'bottomLeft':
      r = { left: 0, top: 'auto', bottom: n }
      break
    default:
      r = { right: 0, top: 'auto', bottom: n }
      break
  }
  return r
}
function of(e) {
  return { name: `${e}-fade` }
}
var af =
  (globalThis && globalThis.__rest) ||
  function(e, t) {
    var n = {}
    for (var r in e)
      Object.prototype.hasOwnProperty.call(e, r) &&
        t.indexOf(r) < 0 &&
        (n[r] = e[r])
    if (e != null && typeof Object.getOwnPropertySymbols == 'function')
      for (var o = 0, r = Object.getOwnPropertySymbols(e); o < r.length; o++)
        t.indexOf(r[o]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(e, r[o]) &&
          (n[r[o]] = e[r[o]])
    return n
  }
const no = 24,
  sf = 4.5,
  lf = M({
    name: 'Holder',
    inheritAttrs: !1,
    props: ['prefixCls', 'class', 'type', 'icon', 'content', 'onAllRemoved'],
    setup(e, t) {
      let { expose: n } = t
      const { getPrefixCls: r, getPopupContainer: o } = Mt('notification', e),
        i = w(() => e.prefixCls || r('notification')),
        a = d => {
          var m, p
          return Bi(
            d,
            (m = e.top) !== null && m !== void 0 ? m : no,
            (p = e.bottom) !== null && p !== void 0 ? p : no
          )
        },
        [, s] = Hi(i),
        u = () => U(s.value, { [`${i.value}-rtl`]: e.rtl }),
        c = () => of(i.value),
        [l, f] = _i({
          prefixCls: i.value,
          getStyles: a,
          getClassName: u,
          motion: c,
          closable: !0,
          closeIcon: tf(i.value),
          duration: sf,
          getContainer: () => {
            var d, m
            return (
              ((d = e.getPopupContainer) === null || d === void 0
                ? void 0
                : d.call(e)) ||
              ((m = o.value) === null || m === void 0 ? void 0 : m.call(o)) ||
              document.body
            )
          },
          maxCount: e.maxCount,
          hashId: s.value,
          onAllRemoved: e.onAllRemoved
        })
      return n(v(v({}, l), { prefixCls: i.value, hashId: s })), f
    }
  })
function cf(e) {
  const t = J(null),
    n = Symbol('notificationHolderKey'),
    r = s => {
      if (!t.value) return
      const { open: u, prefixCls: c, hashId: l } = t.value,
        f = `${c}-notice`,
        { message: d, description: m, icon: p, type: g, btn: S, class: b } = s,
        O = af(s, ['message', 'description', 'icon', 'type', 'btn', 'class'])
      return u(
        v(v({ placement: 'topRight' }, O), {
          content: () =>
            C(
              rf,
              {
                prefixCls: f,
                icon: typeof p == 'function' ? p() : p,
                type: g,
                message: typeof d == 'function' ? d() : d,
                description: typeof m == 'function' ? m() : m,
                btn: typeof S == 'function' ? S() : S
              },
              null
            ),
          class: U(g && `${f}-${g}`, l, b)
        })
      )
    },
    i = {
      open: r,
      destroy: s => {
        var u, c
        s !== void 0
          ? (u = t.value) === null || u === void 0 || u.close(s)
          : (c = t.value) === null || c === void 0 || c.destroy()
      }
    }
  return (
    ['success', 'info', 'warning', 'error'].forEach(s => {
      i[s] = u => r(v(v({}, u), { type: s }))
    }),
    [i, () => C(lf, F(F({ key: n }, e), {}, { ref: t }), null)]
  )
}
function uf(e) {
  return cf(e)
}
globalThis && globalThis.__awaiter
const he = {}
let zi = 4.5,
  Ui = '24px',
  qi = '24px',
  Cn = '',
  Vi = 'topRight',
  Wi = () => document.body,
  Gi = null,
  Sn = !1,
  Xi
function ff(e) {
  const {
    duration: t,
    placement: n,
    bottom: r,
    top: o,
    getContainer: i,
    closeIcon: a,
    prefixCls: s
  } = e
  s !== void 0 && (Cn = s),
    t !== void 0 && (zi = t),
    n !== void 0 && (Vi = n),
    r !== void 0 && (qi = typeof r == 'number' ? `${r}px` : r),
    o !== void 0 && (Ui = typeof o == 'number' ? `${o}px` : o),
    i !== void 0 && (Wi = i),
    a !== void 0 && (Gi = a),
    e.rtl !== void 0 && (Sn = e.rtl),
    e.maxCount !== void 0 && (Xi = e.maxCount)
}
function df(e, t) {
  let {
    prefixCls: n,
    placement: r = Vi,
    getContainer: o = Wi,
    top: i,
    bottom: a,
    closeIcon: s = Gi,
    appContext: u
  } = e
  const { getPrefixCls: c } = Tf(),
    l = c('notification', n || Cn),
    f = `${l}-${r}-${Sn}`,
    d = he[f]
  if (d) {
    Promise.resolve(d).then(p => {
      t(p)
    })
    return
  }
  const m = U(`${l}-${r}`, { [`${l}-rtl`]: Sn === !0 })
  $i.newInstance(
    {
      name: 'notification',
      prefixCls: n || Cn,
      useStyle: Hi,
      class: m,
      style: Bi(r, i ?? Ui, a ?? qi),
      appContext: u,
      getContainer: o,
      closeIcon: p => {
        let { prefixCls: g } = p
        return C('span', { class: `${g}-close-x` }, [
          Te(s, {}, C(Gn, { class: `${g}-close-icon` }, null))
        ])
      },
      maxCount: Xi,
      hasTransitionName: !0
    },
    p => {
      ;(he[f] = p), t(p)
    }
  )
}
const pf = { success: mu, info: vu, error: Cu, warning: hu }
function mf(e) {
  const { icon: t, type: n, description: r, message: o, btn: i } = e,
    a = e.duration === void 0 ? zi : e.duration
  df(e, s => {
    s.notice({
      content: u => {
        let { prefixCls: c } = u
        const l = `${c}-notice`
        let f = null
        if (t) f = () => C('span', { class: `${l}-icon` }, [Te(t)])
        else if (n) {
          const d = pf[n]
          f = () => C(d, { class: `${l}-icon ${l}-icon-${n}` }, null)
        }
        return C('div', { class: f ? `${l}-with-icon` : '' }, [
          f && f(),
          C('div', { class: `${l}-message` }, [
            !r && f
              ? C(
                  'span',
                  { class: `${l}-message-single-line-auto-margin` },
                  null
                )
              : null,
            Te(o)
          ]),
          C('div', { class: `${l}-description` }, [Te(r)]),
          i ? C('span', { class: `${l}-btn` }, [Te(i)]) : null
        ])
      },
      duration: a,
      closable: !0,
      onClose: e.onClose,
      onClick: e.onClick,
      key: e.key,
      style: e.style || {},
      class: e.class
    })
  })
}
const Ne = {
    open: mf,
    close(e) {
      Object.keys(he).forEach(t =>
        Promise.resolve(he[t]).then(n => {
          n.removeNotice(e)
        })
      )
    },
    config: ff,
    destroy() {
      Object.keys(he).forEach(e => {
        Promise.resolve(he[e]).then(t => {
          t.destroy()
        }),
          delete he[e]
      })
    }
  },
  gf = ['success', 'info', 'warning', 'error']
gf.forEach(e => {
  Ne[e] = t => Ne.open(v(v({}, t), { type: e }))
})
Ne.warn = Ne.warning
Ne.useNotification = uf
const Ot = Ne,
  hf = `-ant-${Date.now()}-${Math.random()}`
function yf(e, t) {
  const n = {},
    r = (a, s) => {
      let u = a.clone()
      return (u = (s == null ? void 0 : s(u)) || u), u.toRgbString()
    },
    o = (a, s) => {
      const u = new L(a),
        c = Ze(u.toRgbString())
      ;(n[`${s}-color`] = r(u)),
        (n[`${s}-color-disabled`] = c[1]),
        (n[`${s}-color-hover`] = c[4]),
        (n[`${s}-color-active`] = c[6]),
        (n[`${s}-color-outline`] = u
          .clone()
          .setAlpha(0.2)
          .toRgbString()),
        (n[`${s}-color-deprecated-bg`] = c[0]),
        (n[`${s}-color-deprecated-border`] = c[2])
    }
  if (t.primaryColor) {
    o(t.primaryColor, 'primary')
    const a = new L(t.primaryColor),
      s = Ze(a.toRgbString())
    s.forEach((c, l) => {
      n[`primary-${l + 1}`] = c
    }),
      (n['primary-color-deprecated-l-35'] = r(a, c => c.lighten(35))),
      (n['primary-color-deprecated-l-20'] = r(a, c => c.lighten(20))),
      (n['primary-color-deprecated-t-20'] = r(a, c => c.tint(20))),
      (n['primary-color-deprecated-t-50'] = r(a, c => c.tint(50))),
      (n['primary-color-deprecated-f-12'] = r(a, c =>
        c.setAlpha(c.getAlpha() * 0.12)
      ))
    const u = new L(s[0])
    ;(n['primary-color-active-deprecated-f-30'] = r(u, c =>
      c.setAlpha(c.getAlpha() * 0.3)
    )),
      (n['primary-color-active-deprecated-d-02'] = r(u, c => c.darken(2)))
  }
  return (
    t.successColor && o(t.successColor, 'success'),
    t.warningColor && o(t.warningColor, 'warning'),
    t.errorColor && o(t.errorColor, 'error'),
    t.infoColor && o(t.infoColor, 'info'),
    `
  :root {
    ${Object.keys(n).map(a => `--${e}-${a}: ${n[a]};`).join(`
`)}
  }
  `.trim()
  )
}
function vf(e, t) {
  const n = yf(e, t)
  Fe() ? St(n, `${hf}-dynamic-theme`) : Mn()
}
const bf = e => {
    const [t, n] = Nt()
    return pn(
      w(() => ({
        theme: t.value,
        token: n.value,
        hashId: '',
        path: ['ant-design-icons', e.value]
      })),
      () => [
        {
          [`.${e.value}`]: v(v({}, ql()), {
            [`.${e.value} .${e.value}-icon`]: { display: 'block' }
          })
        }
      ]
    )
  },
  Cf = bf
function Sf(e, t) {
  const n = w(() => (e == null ? void 0 : e.value) || {}),
    r = w(() =>
      n.value.inherit === !1 || !(t != null && t.value) ? ei : t.value
    )
  return w(() => {
    if (!(e != null && e.value)) return t == null ? void 0 : t.value
    const i = v({}, r.value.components)
    return (
      Object.keys(e.value.components || {}).forEach(a => {
        i[a] = v(v({}, i[a]), e.value.components[a])
      }),
      v(v(v({}, r.value), n.value), {
        token: v(v({}, r.value.token), n.value.token),
        components: i
      })
    )
  })
}
var xf =
  (globalThis && globalThis.__rest) ||
  function(e, t) {
    var n = {}
    for (var r in e)
      Object.prototype.hasOwnProperty.call(e, r) &&
        t.indexOf(r) < 0 &&
        (n[r] = e[r])
    if (e != null && typeof Object.getOwnPropertySymbols == 'function')
      for (var o = 0, r = Object.getOwnPropertySymbols(e); o < r.length; o++)
        t.indexOf(r[o]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(e, r[o]) &&
          (n[r[o]] = e[r[o]])
    return n
  }
const wf = 'ant'
function $e() {
  return D.prefixCls || wf
}
function Ki() {
  return D.iconPrefixCls || jn
}
const nr = Qe({}),
  D = Qe({})
$t(() => {
  v(D, nr),
    (D.prefixCls = $e()),
    (D.iconPrefixCls = Ki()),
    (D.getPrefixCls = (e, t) => t || (e ? `${D.prefixCls}-${e}` : D.prefixCls)),
    (D.getRootPrefixCls = () => (D.prefixCls ? D.prefixCls : $e()))
})
let tn
const Of = e => {
    tn && tn(),
      (tn = $t(() => {
        v(nr, Qe(e)), v(D, Qe(e))
      })),
      e.theme && vf($e(), e.theme)
  },
  Tf = () => ({
    getPrefixCls: (e, t) => t || (e ? `${$e()}-${e}` : $e()),
    getIconPrefixCls: Ki,
    getRootPrefixCls: () => (D.prefixCls ? D.prefixCls : $e())
  }),
  Ye = M({
    compatConfig: { MODE: 3 },
    name: 'AConfigProvider',
    inheritAttrs: !1,
    props: xs(),
    setup(e, t) {
      let { slots: n } = t
      const r = Po(),
        o = (x, A) => {
          const { prefixCls: N = 'ant' } = e
          if (A) return A
          const ue = N || r.getPrefixCls('')
          return x ? `${ue}-${x}` : ue
        },
        i = w(() => e.iconPrefixCls || r.iconPrefixCls.value || jn),
        a = w(() => i.value !== r.iconPrefixCls.value),
        s = w(() => {
          var x
          return (
            e.csp || ((x = r.csp) === null || x === void 0 ? void 0 : x.value)
          )
        }),
        u = Cf(i),
        c = Sf(
          w(() => e.theme),
          w(() => {
            var x
            return (x = r.theme) === null || x === void 0 ? void 0 : x.value
          })
        ),
        l = x => (e.renderEmpty || n.renderEmpty || r.renderEmpty || oc)(x),
        f = w(() => {
          var x, A
          return (x = e.autoInsertSpaceInButton) !== null && x !== void 0
            ? x
            : (A = r.autoInsertSpaceInButton) === null || A === void 0
            ? void 0
            : A.value
        }),
        d = w(() => {
          var x
          return (
            e.locale ||
            ((x = r.locale) === null || x === void 0 ? void 0 : x.value)
          )
        })
      le(
        d,
        () => {
          nr.locale = d.value
        },
        { immediate: !0 }
      )
      const m = w(() => {
          var x
          return (
            e.direction ||
            ((x = r.direction) === null || x === void 0 ? void 0 : x.value)
          )
        }),
        p = w(() => {
          var x, A
          return (x = e.space) !== null && x !== void 0
            ? x
            : (A = r.space) === null || A === void 0
            ? void 0
            : A.value
        }),
        g = w(() => {
          var x, A
          return (x = e.virtual) !== null && x !== void 0
            ? x
            : (A = r.virtual) === null || A === void 0
            ? void 0
            : A.value
        }),
        S = w(() => {
          var x, A
          return (x = e.dropdownMatchSelectWidth) !== null && x !== void 0
            ? x
            : (A = r.dropdownMatchSelectWidth) === null || A === void 0
            ? void 0
            : A.value
        }),
        b = w(() => {
          var x
          return e.getTargetContainer !== void 0
            ? e.getTargetContainer
            : (x = r.getTargetContainer) === null || x === void 0
            ? void 0
            : x.value
        }),
        O = w(() => {
          var x
          return e.getPopupContainer !== void 0
            ? e.getPopupContainer
            : (x = r.getPopupContainer) === null || x === void 0
            ? void 0
            : x.value
        }),
        T = w(() => {
          var x
          return e.pageHeader !== void 0
            ? e.pageHeader
            : (x = r.pageHeader) === null || x === void 0
            ? void 0
            : x.value
        }),
        P = w(() => {
          var x
          return e.input !== void 0
            ? e.input
            : (x = r.input) === null || x === void 0
            ? void 0
            : x.value
        }),
        E = w(() => {
          var x
          return e.pagination !== void 0
            ? e.pagination
            : (x = r.pagination) === null || x === void 0
            ? void 0
            : x.value
        }),
        $ = w(() => {
          var x
          return e.form !== void 0
            ? e.form
            : (x = r.form) === null || x === void 0
            ? void 0
            : x.value
        }),
        y = w(() => {
          var x
          return e.select !== void 0
            ? e.select
            : (x = r.select) === null || x === void 0
            ? void 0
            : x.value
        }),
        _ = w(() => e.componentSize),
        I = w(() => e.componentDisabled),
        q = w(() => {
          var x, A
          return (x = e.wave) !== null && x !== void 0
            ? x
            : (A = r.wave) === null || A === void 0
            ? void 0
            : A.value
        }),
        ne = {
          csp: s,
          autoInsertSpaceInButton: f,
          locale: d,
          direction: m,
          space: p,
          virtual: g,
          dropdownMatchSelectWidth: S,
          getPrefixCls: o,
          iconPrefixCls: i,
          theme: w(() => {
            var x, A
            return (x = c.value) !== null && x !== void 0
              ? x
              : (A = r.theme) === null || A === void 0
              ? void 0
              : A.value
          }),
          renderEmpty: l,
          getTargetContainer: b,
          getPopupContainer: O,
          pageHeader: T,
          input: P,
          pagination: E,
          form: $,
          select: y,
          componentSize: _,
          componentDisabled: I,
          transformCellText: w(() => e.transformCellText),
          wave: q
        },
        re = w(() => {
          const x = c.value || {},
            { algorithm: A, token: N } = x,
            ue = xf(x, ['algorithm', 'token']),
            Kt = A && (!Array.isArray(A) || A.length > 0) ? Bo(A) : void 0
          return v(v({}, ue), { theme: Kt, token: v(v({}, jt), N) })
        }),
        Xt = w(() => {
          var x, A
          let N = {}
          return (
            d.value &&
              (N =
                ((x = d.value.Form) === null || x === void 0
                  ? void 0
                  : x.defaultValidateMessages) ||
                ((A = Ae.Form) === null || A === void 0
                  ? void 0
                  : A.defaultValidateMessages) ||
                {}),
            e.form &&
              e.form.validateMessages &&
              (N = v(v({}, N), e.form.validateMessages)),
            N
          )
        })
      ws(ne), Ss({ validateMessages: Xt }), ic(_), Os(I)
      const qe = x => {
        var A, N
        let ue = a.value
          ? u((A = n.default) === null || A === void 0 ? void 0 : A.call(n))
          : (N = n.default) === null || N === void 0
          ? void 0
          : N.call(n)
        if (e.theme) {
          const Kt = (function() {
            return ue
          })()
          ue = C(Ql, { value: re.value }, { default: () => [Kt] })
        }
        return C(
          Tu,
          { locale: d.value || x, ANT_MARK__: vn },
          { default: () => [ue] }
        )
      }
      return (
        $t(() => {
          m.value &&
            (Yu.config({ rtl: m.value === 'rtl' }),
            Ot.config({ rtl: m.value === 'rtl' }))
        }),
        () => C(Ao, { children: (x, A, N) => qe(N) }, null)
      )
    }
  })
Ye.config = Of
Ye.install = function(e) {
  e.component(Ye.name, Ye)
}
function Ji(e, t) {
  return function() {
    return e.apply(t, arguments)
  }
}
const { toString: Pf } = Object.prototype,
  { getPrototypeOf: rr } = Object,
  zt = (e => t => {
    const n = Pf.call(t)
    return e[n] || (e[n] = n.slice(8, -1).toLowerCase())
  })(Object.create(null)),
  te = e => ((e = e.toLowerCase()), t => zt(t) === e),
  Ut = e => t => typeof t === e,
  { isArray: ze } = Array,
  at = Ut('undefined')
function Ef(e) {
  return (
    e !== null &&
    !at(e) &&
    e.constructor !== null &&
    !at(e.constructor) &&
    X(e.constructor.isBuffer) &&
    e.constructor.isBuffer(e)
  )
}
const Yi = te('ArrayBuffer')
function $f(e) {
  let t
  return (
    typeof ArrayBuffer < 'u' && ArrayBuffer.isView
      ? (t = ArrayBuffer.isView(e))
      : (t = e && e.buffer && Yi(e.buffer)),
    t
  )
}
const _f = Ut('string'),
  X = Ut('function'),
  Qi = Ut('number'),
  qt = e => e !== null && typeof e == 'object',
  Af = e => e === !0 || e === !1,
  yt = e => {
    if (zt(e) !== 'object') return !1
    const t = rr(e)
    return (
      (t === null ||
        t === Object.prototype ||
        Object.getPrototypeOf(t) === null) &&
      !(Symbol.toStringTag in e) &&
      !(Symbol.iterator in e)
    )
  },
  Rf = te('Date'),
  If = te('File'),
  jf = te('Blob'),
  kf = te('FileList'),
  Nf = e => qt(e) && X(e.pipe),
  Mf = e => {
    let t
    return (
      e &&
      ((typeof FormData == 'function' && e instanceof FormData) ||
        (X(e.append) &&
          ((t = zt(e)) === 'formdata' ||
            (t === 'object' &&
              X(e.toString) &&
              e.toString() === '[object FormData]'))))
    )
  },
  Lf = te('URLSearchParams'),
  [Ff, Df, Hf, Bf] = ['ReadableStream', 'Request', 'Response', 'Headers'].map(
    te
  ),
  zf = e =>
    e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '')
function st(e, t, { allOwnKeys: n = !1 } = {}) {
  if (e === null || typeof e > 'u') return
  let r, o
  if ((typeof e != 'object' && (e = [e]), ze(e)))
    for (r = 0, o = e.length; r < o; r++) t.call(null, e[r], r, e)
  else {
    const i = n ? Object.getOwnPropertyNames(e) : Object.keys(e),
      a = i.length
    let s
    for (r = 0; r < a; r++) (s = i[r]), t.call(null, e[s], s, e)
  }
}
function Zi(e, t) {
  t = t.toLowerCase()
  const n = Object.keys(e)
  let r = n.length,
    o
  for (; r-- > 0; ) if (((o = n[r]), t === o.toLowerCase())) return o
  return null
}
const ea = (() =>
    typeof globalThis < 'u'
      ? globalThis
      : typeof self < 'u'
      ? self
      : typeof window < 'u'
      ? window
      : global)(),
  ta = e => !at(e) && e !== ea
function xn() {
  const { caseless: e } = (ta(this) && this) || {},
    t = {},
    n = (r, o) => {
      const i = (e && Zi(t, o)) || o
      yt(t[i]) && yt(r)
        ? (t[i] = xn(t[i], r))
        : yt(r)
        ? (t[i] = xn({}, r))
        : ze(r)
        ? (t[i] = r.slice())
        : (t[i] = r)
    }
  for (let r = 0, o = arguments.length; r < o; r++)
    arguments[r] && st(arguments[r], n)
  return t
}
const Uf = (e, t, n, { allOwnKeys: r } = {}) => (
    st(
      t,
      (o, i) => {
        n && X(o) ? (e[i] = Ji(o, n)) : (e[i] = o)
      },
      { allOwnKeys: r }
    ),
    e
  ),
  qf = e => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e),
  Vf = (e, t, n, r) => {
    ;(e.prototype = Object.create(t.prototype, r)),
      (e.prototype.constructor = e),
      Object.defineProperty(e, 'super', { value: t.prototype }),
      n && Object.assign(e.prototype, n)
  },
  Wf = (e, t, n, r) => {
    let o, i, a
    const s = {}
    if (((t = t || {}), e == null)) return t
    do {
      for (o = Object.getOwnPropertyNames(e), i = o.length; i-- > 0; )
        (a = o[i]), (!r || r(a, e, t)) && !s[a] && ((t[a] = e[a]), (s[a] = !0))
      e = n !== !1 && rr(e)
    } while (e && (!n || n(e, t)) && e !== Object.prototype)
    return t
  },
  Gf = (e, t, n) => {
    ;(e = String(e)),
      (n === void 0 || n > e.length) && (n = e.length),
      (n -= t.length)
    const r = e.indexOf(t, n)
    return r !== -1 && r === n
  },
  Xf = e => {
    if (!e) return null
    if (ze(e)) return e
    let t = e.length
    if (!Qi(t)) return null
    const n = new Array(t)
    for (; t-- > 0; ) n[t] = e[t]
    return n
  },
  Kf = (e => t => e && t instanceof e)(
    typeof Uint8Array < 'u' && rr(Uint8Array)
  ),
  Jf = (e, t) => {
    const r = (e && e[Symbol.iterator]).call(e)
    let o
    for (; (o = r.next()) && !o.done; ) {
      const i = o.value
      t.call(e, i[0], i[1])
    }
  },
  Yf = (e, t) => {
    let n
    const r = []
    for (; (n = e.exec(t)) !== null; ) r.push(n)
    return r
  },
  Qf = te('HTMLFormElement'),
  Zf = e =>
    e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function(n, r, o) {
      return r.toUpperCase() + o
    }),
  ro = (({ hasOwnProperty: e }) => (t, n) => e.call(t, n))(Object.prototype),
  ed = te('RegExp'),
  na = (e, t) => {
    const n = Object.getOwnPropertyDescriptors(e),
      r = {}
    st(n, (o, i) => {
      let a
      ;(a = t(o, i, e)) !== !1 && (r[i] = a || o)
    }),
      Object.defineProperties(e, r)
  },
  td = e => {
    na(e, (t, n) => {
      if (X(e) && ['arguments', 'caller', 'callee'].indexOf(n) !== -1) return !1
      const r = e[n]
      if (X(r)) {
        if (((t.enumerable = !1), 'writable' in t)) {
          t.writable = !1
          return
        }
        t.set ||
          (t.set = () => {
            throw Error("Can not rewrite read-only method '" + n + "'")
          })
      }
    })
  },
  nd = (e, t) => {
    const n = {},
      r = o => {
        o.forEach(i => {
          n[i] = !0
        })
      }
    return ze(e) ? r(e) : r(String(e).split(t)), n
  },
  rd = () => {},
  od = (e, t) => (e != null && Number.isFinite((e = +e)) ? e : t),
  nn = 'abcdefghijklmnopqrstuvwxyz',
  oo = '0123456789',
  ra = { DIGIT: oo, ALPHA: nn, ALPHA_DIGIT: nn + nn.toUpperCase() + oo },
  id = (e = 16, t = ra.ALPHA_DIGIT) => {
    let n = ''
    const { length: r } = t
    for (; e--; ) n += t[(Math.random() * r) | 0]
    return n
  }
function ad(e) {
  return !!(
    e &&
    X(e.append) &&
    e[Symbol.toStringTag] === 'FormData' &&
    e[Symbol.iterator]
  )
}
const sd = e => {
    const t = new Array(10),
      n = (r, o) => {
        if (qt(r)) {
          if (t.indexOf(r) >= 0) return
          if (!('toJSON' in r)) {
            t[o] = r
            const i = ze(r) ? [] : {}
            return (
              st(r, (a, s) => {
                const u = n(a, o + 1)
                !at(u) && (i[s] = u)
              }),
              (t[o] = void 0),
              i
            )
          }
        }
        return r
      }
    return n(e, 0)
  },
  ld = te('AsyncFunction'),
  cd = e => e && (qt(e) || X(e)) && X(e.then) && X(e.catch),
  h = {
    isArray: ze,
    isArrayBuffer: Yi,
    isBuffer: Ef,
    isFormData: Mf,
    isArrayBufferView: $f,
    isString: _f,
    isNumber: Qi,
    isBoolean: Af,
    isObject: qt,
    isPlainObject: yt,
    isReadableStream: Ff,
    isRequest: Df,
    isResponse: Hf,
    isHeaders: Bf,
    isUndefined: at,
    isDate: Rf,
    isFile: If,
    isBlob: jf,
    isRegExp: ed,
    isFunction: X,
    isStream: Nf,
    isURLSearchParams: Lf,
    isTypedArray: Kf,
    isFileList: kf,
    forEach: st,
    merge: xn,
    extend: Uf,
    trim: zf,
    stripBOM: qf,
    inherits: Vf,
    toFlatObject: Wf,
    kindOf: zt,
    kindOfTest: te,
    endsWith: Gf,
    toArray: Xf,
    forEachEntry: Jf,
    matchAll: Yf,
    isHTMLForm: Qf,
    hasOwnProperty: ro,
    hasOwnProp: ro,
    reduceDescriptors: na,
    freezeMethods: td,
    toObjectSet: nd,
    toCamelCase: Zf,
    noop: rd,
    toFiniteNumber: od,
    findKey: Zi,
    global: ea,
    isContextDefined: ta,
    ALPHABET: ra,
    generateString: id,
    isSpecCompliantForm: ad,
    toJSONObject: sd,
    isAsyncFn: ld,
    isThenable: cd
  }
function R(e, t, n, r, o) {
  Error.call(this),
    Error.captureStackTrace
      ? Error.captureStackTrace(this, this.constructor)
      : (this.stack = new Error().stack),
    (this.message = e),
    (this.name = 'AxiosError'),
    t && (this.code = t),
    n && (this.config = n),
    r && (this.request = r),
    o && (this.response = o)
}
h.inherits(R, Error, {
  toJSON: function() {
    return {
      message: this.message,
      name: this.name,
      description: this.description,
      number: this.number,
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      config: h.toJSONObject(this.config),
      code: this.code,
      status:
        this.response && this.response.status ? this.response.status : null
    }
  }
})
const oa = R.prototype,
  ia = {}
;[
  'ERR_BAD_OPTION_VALUE',
  'ERR_BAD_OPTION',
  'ECONNABORTED',
  'ETIMEDOUT',
  'ERR_NETWORK',
  'ERR_FR_TOO_MANY_REDIRECTS',
  'ERR_DEPRECATED',
  'ERR_BAD_RESPONSE',
  'ERR_BAD_REQUEST',
  'ERR_CANCELED',
  'ERR_NOT_SUPPORT',
  'ERR_INVALID_URL'
].forEach(e => {
  ia[e] = { value: e }
})
Object.defineProperties(R, ia)
Object.defineProperty(oa, 'isAxiosError', { value: !0 })
R.from = (e, t, n, r, o, i) => {
  const a = Object.create(oa)
  return (
    h.toFlatObject(
      e,
      a,
      function(u) {
        return u !== Error.prototype
      },
      s => s !== 'isAxiosError'
    ),
    R.call(a, e.message, t, n, r, o),
    (a.cause = e),
    (a.name = e.name),
    i && Object.assign(a, i),
    a
  )
}
const ud = null
function wn(e) {
  return h.isPlainObject(e) || h.isArray(e)
}
function aa(e) {
  return h.endsWith(e, '[]') ? e.slice(0, -2) : e
}
function io(e, t, n) {
  return e
    ? e
        .concat(t)
        .map(function(o, i) {
          return (o = aa(o)), !n && i ? '[' + o + ']' : o
        })
        .join(n ? '.' : '')
    : t
}
function fd(e) {
  return h.isArray(e) && !e.some(wn)
}
const dd = h.toFlatObject(h, {}, null, function(t) {
  return /^is[A-Z]/.test(t)
})
function Vt(e, t, n) {
  if (!h.isObject(e)) throw new TypeError('target must be an object')
  ;(t = t || new FormData()),
    (n = h.toFlatObject(
      n,
      { metaTokens: !0, dots: !1, indexes: !1 },
      !1,
      function(g, S) {
        return !h.isUndefined(S[g])
      }
    ))
  const r = n.metaTokens,
    o = n.visitor || l,
    i = n.dots,
    a = n.indexes,
    u = (n.Blob || (typeof Blob < 'u' && Blob)) && h.isSpecCompliantForm(t)
  if (!h.isFunction(o)) throw new TypeError('visitor must be a function')
  function c(p) {
    if (p === null) return ''
    if (h.isDate(p)) return p.toISOString()
    if (!u && h.isBlob(p))
      throw new R('Blob is not supported. Use a Buffer instead.')
    return h.isArrayBuffer(p) || h.isTypedArray(p)
      ? u && typeof Blob == 'function'
        ? new Blob([p])
        : Buffer.from(p)
      : p
  }
  function l(p, g, S) {
    let b = p
    if (p && !S && typeof p == 'object') {
      if (h.endsWith(g, '{}'))
        (g = r ? g : g.slice(0, -2)), (p = JSON.stringify(p))
      else if (
        (h.isArray(p) && fd(p)) ||
        ((h.isFileList(p) || h.endsWith(g, '[]')) && (b = h.toArray(p)))
      )
        return (
          (g = aa(g)),
          b.forEach(function(T, P) {
            !(h.isUndefined(T) || T === null) &&
              t.append(
                a === !0 ? io([g], P, i) : a === null ? g : g + '[]',
                c(T)
              )
          }),
          !1
        )
    }
    return wn(p) ? !0 : (t.append(io(S, g, i), c(p)), !1)
  }
  const f = [],
    d = Object.assign(dd, {
      defaultVisitor: l,
      convertValue: c,
      isVisitable: wn
    })
  function m(p, g) {
    if (!h.isUndefined(p)) {
      if (f.indexOf(p) !== -1)
        throw Error('Circular reference detected in ' + g.join('.'))
      f.push(p),
        h.forEach(p, function(b, O) {
          ;(!(h.isUndefined(b) || b === null) &&
            o.call(t, b, h.isString(O) ? O.trim() : O, g, d)) === !0 &&
            m(b, g ? g.concat(O) : [O])
        }),
        f.pop()
    }
  }
  if (!h.isObject(e)) throw new TypeError('data must be an object')
  return m(e), t
}
function ao(e) {
  const t = {
    '!': '%21',
    "'": '%27',
    '(': '%28',
    ')': '%29',
    '~': '%7E',
    '%20': '+',
    '%00': '\0'
  }
  return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function(r) {
    return t[r]
  })
}
function or(e, t) {
  ;(this._pairs = []), e && Vt(e, this, t)
}
const sa = or.prototype
sa.append = function(t, n) {
  this._pairs.push([t, n])
}
sa.toString = function(t) {
  const n = t
    ? function(r) {
        return t.call(this, r, ao)
      }
    : ao
  return this._pairs
    .map(function(o) {
      return n(o[0]) + '=' + n(o[1])
    }, '')
    .join('&')
}
function pd(e) {
  return encodeURIComponent(e)
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}
function la(e, t, n) {
  if (!t) return e
  const r = (n && n.encode) || pd,
    o = n && n.serialize
  let i
  if (
    (o
      ? (i = o(t, n))
      : (i = h.isURLSearchParams(t) ? t.toString() : new or(t, n).toString(r)),
    i)
  ) {
    const a = e.indexOf('#')
    a !== -1 && (e = e.slice(0, a)),
      (e += (e.indexOf('?') === -1 ? '?' : '&') + i)
  }
  return e
}
class md {
  constructor() {
    this.handlers = []
  }
  use(t, n, r) {
    return (
      this.handlers.push({
        fulfilled: t,
        rejected: n,
        synchronous: r ? r.synchronous : !1,
        runWhen: r ? r.runWhen : null
      }),
      this.handlers.length - 1
    )
  }
  eject(t) {
    this.handlers[t] && (this.handlers[t] = null)
  }
  clear() {
    this.handlers && (this.handlers = [])
  }
  forEach(t) {
    h.forEach(this.handlers, function(r) {
      r !== null && t(r)
    })
  }
}
const so = md,
  ca = {
    silentJSONParsing: !0,
    forcedJSONParsing: !0,
    clarifyTimeoutError: !1
  },
  gd = typeof URLSearchParams < 'u' ? URLSearchParams : or,
  hd = typeof FormData < 'u' ? FormData : null,
  yd = typeof Blob < 'u' ? Blob : null,
  vd = {
    isBrowser: !0,
    classes: { URLSearchParams: gd, FormData: hd, Blob: yd },
    protocols: ['http', 'https', 'file', 'blob', 'url', 'data']
  },
  ir = typeof window < 'u' && typeof document < 'u',
  bd = (e => ir && ['ReactNative', 'NativeScript', 'NS'].indexOf(e) < 0)(
    typeof navigator < 'u' && navigator.product
  ),
  Cd = (() =>
    typeof WorkerGlobalScope < 'u' &&
    self instanceof WorkerGlobalScope &&
    typeof self.importScripts == 'function')(),
  Sd = (ir && window.location.href) || 'http://localhost',
  xd = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        hasBrowserEnv: ir,
        hasStandardBrowserEnv: bd,
        hasStandardBrowserWebWorkerEnv: Cd,
        origin: Sd
      },
      Symbol.toStringTag,
      { value: 'Module' }
    )
  ),
  Q = { ...xd, ...vd }
function wd(e, t) {
  return Vt(
    e,
    new Q.classes.URLSearchParams(),
    Object.assign(
      {
        visitor: function(n, r, o, i) {
          return Q.isNode && h.isBuffer(n)
            ? (this.append(r, n.toString('base64')), !1)
            : i.defaultVisitor.apply(this, arguments)
        }
      },
      t
    )
  )
}
function Od(e) {
  return h
    .matchAll(/\w+|\[(\w*)]/g, e)
    .map(t => (t[0] === '[]' ? '' : t[1] || t[0]))
}
function Td(e) {
  const t = {},
    n = Object.keys(e)
  let r
  const o = n.length
  let i
  for (r = 0; r < o; r++) (i = n[r]), (t[i] = e[i])
  return t
}
function ua(e) {
  function t(n, r, o, i) {
    let a = n[i++]
    if (a === '__proto__') return !0
    const s = Number.isFinite(+a),
      u = i >= n.length
    return (
      (a = !a && h.isArray(o) ? o.length : a),
      u
        ? (h.hasOwnProp(o, a) ? (o[a] = [o[a], r]) : (o[a] = r), !s)
        : ((!o[a] || !h.isObject(o[a])) && (o[a] = []),
          t(n, r, o[a], i) && h.isArray(o[a]) && (o[a] = Td(o[a])),
          !s)
    )
  }
  if (h.isFormData(e) && h.isFunction(e.entries)) {
    const n = {}
    return (
      h.forEachEntry(e, (r, o) => {
        t(Od(r), o, n, 0)
      }),
      n
    )
  }
  return null
}
function Pd(e, t, n) {
  if (h.isString(e))
    try {
      return (t || JSON.parse)(e), h.trim(e)
    } catch (r) {
      if (r.name !== 'SyntaxError') throw r
    }
  return (n || JSON.stringify)(e)
}
const ar = {
  transitional: ca,
  adapter: ['xhr', 'http', 'fetch'],
  transformRequest: [
    function(t, n) {
      const r = n.getContentType() || '',
        o = r.indexOf('application/json') > -1,
        i = h.isObject(t)
      if ((i && h.isHTMLForm(t) && (t = new FormData(t)), h.isFormData(t)))
        return o ? JSON.stringify(ua(t)) : t
      if (
        h.isArrayBuffer(t) ||
        h.isBuffer(t) ||
        h.isStream(t) ||
        h.isFile(t) ||
        h.isBlob(t) ||
        h.isReadableStream(t)
      )
        return t
      if (h.isArrayBufferView(t)) return t.buffer
      if (h.isURLSearchParams(t))
        return (
          n.setContentType(
            'application/x-www-form-urlencoded;charset=utf-8',
            !1
          ),
          t.toString()
        )
      let s
      if (i) {
        if (r.indexOf('application/x-www-form-urlencoded') > -1)
          return wd(t, this.formSerializer).toString()
        if ((s = h.isFileList(t)) || r.indexOf('multipart/form-data') > -1) {
          const u = this.env && this.env.FormData
          return Vt(s ? { 'files[]': t } : t, u && new u(), this.formSerializer)
        }
      }
      return i || o ? (n.setContentType('application/json', !1), Pd(t)) : t
    }
  ],
  transformResponse: [
    function(t) {
      const n = this.transitional || ar.transitional,
        r = n && n.forcedJSONParsing,
        o = this.responseType === 'json'
      if (h.isResponse(t) || h.isReadableStream(t)) return t
      if (t && h.isString(t) && ((r && !this.responseType) || o)) {
        const a = !(n && n.silentJSONParsing) && o
        try {
          return JSON.parse(t)
        } catch (s) {
          if (a)
            throw s.name === 'SyntaxError'
              ? R.from(s, R.ERR_BAD_RESPONSE, this, null, this.response)
              : s
        }
      }
      return t
    }
  ],
  timeout: 0,
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
  maxContentLength: -1,
  maxBodyLength: -1,
  env: { FormData: Q.classes.FormData, Blob: Q.classes.Blob },
  validateStatus: function(t) {
    return t >= 200 && t < 300
  },
  headers: {
    common: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': void 0
    }
  }
}
h.forEach(['delete', 'get', 'head', 'post', 'put', 'patch'], e => {
  ar.headers[e] = {}
})
const sr = ar,
  Ed = h.toObjectSet([
    'age',
    'authorization',
    'content-length',
    'content-type',
    'etag',
    'expires',
    'from',
    'host',
    'if-modified-since',
    'if-unmodified-since',
    'last-modified',
    'location',
    'max-forwards',
    'proxy-authorization',
    'referer',
    'retry-after',
    'user-agent'
  ]),
  $d = e => {
    const t = {}
    let n, r, o
    return (
      e &&
        e
          .split(
            `
`
          )
          .forEach(function(a) {
            ;(o = a.indexOf(':')),
              (n = a
                .substring(0, o)
                .trim()
                .toLowerCase()),
              (r = a.substring(o + 1).trim()),
              !(!n || (t[n] && Ed[n])) &&
                (n === 'set-cookie'
                  ? t[n]
                    ? t[n].push(r)
                    : (t[n] = [r])
                  : (t[n] = t[n] ? t[n] + ', ' + r : r))
          }),
      t
    )
  },
  lo = Symbol('internals')
function Ge(e) {
  return (
    e &&
    String(e)
      .trim()
      .toLowerCase()
  )
}
function vt(e) {
  return e === !1 || e == null ? e : h.isArray(e) ? e.map(vt) : String(e)
}
function _d(e) {
  const t = Object.create(null),
    n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g
  let r
  for (; (r = n.exec(e)); ) t[r[1]] = r[2]
  return t
}
const Ad = e => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim())
function rn(e, t, n, r, o) {
  if (h.isFunction(r)) return r.call(this, t, n)
  if ((o && (t = n), !!h.isString(t))) {
    if (h.isString(r)) return t.indexOf(r) !== -1
    if (h.isRegExp(r)) return r.test(t)
  }
}
function Rd(e) {
  return e
    .trim()
    .toLowerCase()
    .replace(/([a-z\d])(\w*)/g, (t, n, r) => n.toUpperCase() + r)
}
function Id(e, t) {
  const n = h.toCamelCase(' ' + t)
  ;['get', 'set', 'has'].forEach(r => {
    Object.defineProperty(e, r + n, {
      value: function(o, i, a) {
        return this[r].call(this, t, o, i, a)
      },
      configurable: !0
    })
  })
}
class Wt {
  constructor(t) {
    t && this.set(t)
  }
  set(t, n, r) {
    const o = this
    function i(s, u, c) {
      const l = Ge(u)
      if (!l) throw new Error('header name must be a non-empty string')
      const f = h.findKey(o, l)
      ;(!f || o[f] === void 0 || c === !0 || (c === void 0 && o[f] !== !1)) &&
        (o[f || u] = vt(s))
    }
    const a = (s, u) => h.forEach(s, (c, l) => i(c, l, u))
    if (h.isPlainObject(t) || t instanceof this.constructor) a(t, n)
    else if (h.isString(t) && (t = t.trim()) && !Ad(t)) a($d(t), n)
    else if (h.isHeaders(t)) for (const [s, u] of t.entries()) i(u, s, r)
    else t != null && i(n, t, r)
    return this
  }
  get(t, n) {
    if (((t = Ge(t)), t)) {
      const r = h.findKey(this, t)
      if (r) {
        const o = this[r]
        if (!n) return o
        if (n === !0) return _d(o)
        if (h.isFunction(n)) return n.call(this, o, r)
        if (h.isRegExp(n)) return n.exec(o)
        throw new TypeError('parser must be boolean|regexp|function')
      }
    }
  }
  has(t, n) {
    if (((t = Ge(t)), t)) {
      const r = h.findKey(this, t)
      return !!(r && this[r] !== void 0 && (!n || rn(this, this[r], r, n)))
    }
    return !1
  }
  delete(t, n) {
    const r = this
    let o = !1
    function i(a) {
      if (((a = Ge(a)), a)) {
        const s = h.findKey(r, a)
        s && (!n || rn(r, r[s], s, n)) && (delete r[s], (o = !0))
      }
    }
    return h.isArray(t) ? t.forEach(i) : i(t), o
  }
  clear(t) {
    const n = Object.keys(this)
    let r = n.length,
      o = !1
    for (; r--; ) {
      const i = n[r]
      ;(!t || rn(this, this[i], i, t, !0)) && (delete this[i], (o = !0))
    }
    return o
  }
  normalize(t) {
    const n = this,
      r = {}
    return (
      h.forEach(this, (o, i) => {
        const a = h.findKey(r, i)
        if (a) {
          ;(n[a] = vt(o)), delete n[i]
          return
        }
        const s = t ? Rd(i) : String(i).trim()
        s !== i && delete n[i], (n[s] = vt(o)), (r[s] = !0)
      }),
      this
    )
  }
  concat(...t) {
    return this.constructor.concat(this, ...t)
  }
  toJSON(t) {
    const n = Object.create(null)
    return (
      h.forEach(this, (r, o) => {
        r != null && r !== !1 && (n[o] = t && h.isArray(r) ? r.join(', ') : r)
      }),
      n
    )
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]()
  }
  toString() {
    return Object.entries(this.toJSON()).map(([t, n]) => t + ': ' + n).join(`
`)
  }
  get [Symbol.toStringTag]() {
    return 'AxiosHeaders'
  }
  static from(t) {
    return t instanceof this ? t : new this(t)
  }
  static concat(t, ...n) {
    const r = new this(t)
    return n.forEach(o => r.set(o)), r
  }
  static accessor(t) {
    const r = (this[lo] = this[lo] = { accessors: {} }).accessors,
      o = this.prototype
    function i(a) {
      const s = Ge(a)
      r[s] || (Id(o, a), (r[s] = !0))
    }
    return h.isArray(t) ? t.forEach(i) : i(t), this
  }
}
Wt.accessor([
  'Content-Type',
  'Content-Length',
  'Accept',
  'Accept-Encoding',
  'User-Agent',
  'Authorization'
])
h.reduceDescriptors(Wt.prototype, ({ value: e }, t) => {
  let n = t[0].toUpperCase() + t.slice(1)
  return {
    get: () => e,
    set(r) {
      this[n] = r
    }
  }
})
h.freezeMethods(Wt)
const Z = Wt
function on(e, t) {
  const n = this || sr,
    r = t || n,
    o = Z.from(r.headers)
  let i = r.data
  return (
    h.forEach(e, function(s) {
      i = s.call(n, i, o.normalize(), t ? t.status : void 0)
    }),
    o.normalize(),
    i
  )
}
function fa(e) {
  return !!(e && e.__CANCEL__)
}
function Ue(e, t, n) {
  R.call(this, e ?? 'canceled', R.ERR_CANCELED, t, n),
    (this.name = 'CanceledError')
}
h.inherits(Ue, R, { __CANCEL__: !0 })
function da(e, t, n) {
  const r = n.config.validateStatus
  !n.status || !r || r(n.status)
    ? e(n)
    : t(
        new R(
          'Request failed with status code ' + n.status,
          [R.ERR_BAD_REQUEST, R.ERR_BAD_RESPONSE][
            Math.floor(n.status / 100) - 4
          ],
          n.config,
          n.request,
          n
        )
      )
}
function jd(e) {
  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e)
  return (t && t[1]) || ''
}
function kd(e, t) {
  e = e || 10
  const n = new Array(e),
    r = new Array(e)
  let o = 0,
    i = 0,
    a
  return (
    (t = t !== void 0 ? t : 1e3),
    function(u) {
      const c = Date.now(),
        l = r[i]
      a || (a = c), (n[o] = u), (r[o] = c)
      let f = i,
        d = 0
      for (; f !== o; ) (d += n[f++]), (f = f % e)
      if (((o = (o + 1) % e), o === i && (i = (i + 1) % e), c - a < t)) return
      const m = l && c - l
      return m ? Math.round((d * 1e3) / m) : void 0
    }
  )
}
function Nd(e, t) {
  let n = 0
  const r = 1e3 / t
  let o = null
  return function() {
    const a = this === !0,
      s = Date.now()
    if (a || s - n > r)
      return (
        o && (clearTimeout(o), (o = null)), (n = s), e.apply(null, arguments)
      )
    o ||
      (o = setTimeout(
        () => ((o = null), (n = Date.now()), e.apply(null, arguments)),
        r - (s - n)
      ))
  }
}
const Tt = (e, t, n = 3) => {
    let r = 0
    const o = kd(50, 250)
    return Nd(i => {
      const a = i.loaded,
        s = i.lengthComputable ? i.total : void 0,
        u = a - r,
        c = o(u),
        l = a <= s
      r = a
      const f = {
        loaded: a,
        total: s,
        progress: s ? a / s : void 0,
        bytes: u,
        rate: c || void 0,
        estimated: c && s && l ? (s - a) / c : void 0,
        event: i,
        lengthComputable: s != null
      }
      ;(f[t ? 'download' : 'upload'] = !0), e(f)
    }, n)
  },
  Md = Q.hasStandardBrowserEnv
    ? (function() {
        const t = /(msie|trident)/i.test(navigator.userAgent),
          n = document.createElement('a')
        let r
        function o(i) {
          let a = i
          return (
            t && (n.setAttribute('href', a), (a = n.href)),
            n.setAttribute('href', a),
            {
              href: n.href,
              protocol: n.protocol ? n.protocol.replace(/:$/, '') : '',
              host: n.host,
              search: n.search ? n.search.replace(/^\?/, '') : '',
              hash: n.hash ? n.hash.replace(/^#/, '') : '',
              hostname: n.hostname,
              port: n.port,
              pathname:
                n.pathname.charAt(0) === '/' ? n.pathname : '/' + n.pathname
            }
          )
        }
        return (
          (r = o(window.location.href)),
          function(a) {
            const s = h.isString(a) ? o(a) : a
            return s.protocol === r.protocol && s.host === r.host
          }
        )
      })()
    : (function() {
        return function() {
          return !0
        }
      })(),
  Ld = Q.hasStandardBrowserEnv
    ? {
        write(e, t, n, r, o, i) {
          const a = [e + '=' + encodeURIComponent(t)]
          h.isNumber(n) && a.push('expires=' + new Date(n).toGMTString()),
            h.isString(r) && a.push('path=' + r),
            h.isString(o) && a.push('domain=' + o),
            i === !0 && a.push('secure'),
            (document.cookie = a.join('; '))
        },
        read(e) {
          const t = document.cookie.match(
            new RegExp('(^|;\\s*)(' + e + ')=([^;]*)')
          )
          return t ? decodeURIComponent(t[3]) : null
        },
        remove(e) {
          this.write(e, '', Date.now() - 864e5)
        }
      }
    : {
        write() {},
        read() {
          return null
        },
        remove() {}
      }
function Fd(e) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e)
}
function Dd(e, t) {
  return t ? e.replace(/\/?\/$/, '') + '/' + t.replace(/^\/+/, '') : e
}
function pa(e, t) {
  return e && !Fd(t) ? Dd(e, t) : t
}
const co = e => (e instanceof Z ? { ...e } : e)
function we(e, t) {
  t = t || {}
  const n = {}
  function r(c, l, f) {
    return h.isPlainObject(c) && h.isPlainObject(l)
      ? h.merge.call({ caseless: f }, c, l)
      : h.isPlainObject(l)
      ? h.merge({}, l)
      : h.isArray(l)
      ? l.slice()
      : l
  }
  function o(c, l, f) {
    if (h.isUndefined(l)) {
      if (!h.isUndefined(c)) return r(void 0, c, f)
    } else return r(c, l, f)
  }
  function i(c, l) {
    if (!h.isUndefined(l)) return r(void 0, l)
  }
  function a(c, l) {
    if (h.isUndefined(l)) {
      if (!h.isUndefined(c)) return r(void 0, c)
    } else return r(void 0, l)
  }
  function s(c, l, f) {
    if (f in t) return r(c, l)
    if (f in e) return r(void 0, c)
  }
  const u = {
    url: i,
    method: i,
    data: i,
    baseURL: a,
    transformRequest: a,
    transformResponse: a,
    paramsSerializer: a,
    timeout: a,
    timeoutMessage: a,
    withCredentials: a,
    withXSRFToken: a,
    adapter: a,
    responseType: a,
    xsrfCookieName: a,
    xsrfHeaderName: a,
    onUploadProgress: a,
    onDownloadProgress: a,
    decompress: a,
    maxContentLength: a,
    maxBodyLength: a,
    beforeRedirect: a,
    transport: a,
    httpAgent: a,
    httpsAgent: a,
    cancelToken: a,
    socketPath: a,
    responseEncoding: a,
    validateStatus: s,
    headers: (c, l) => o(co(c), co(l), !0)
  }
  return (
    h.forEach(Object.keys(Object.assign({}, e, t)), function(l) {
      const f = u[l] || o,
        d = f(e[l], t[l], l)
      ;(h.isUndefined(d) && f !== s) || (n[l] = d)
    }),
    n
  )
}
const ma = e => {
    const t = we({}, e)
    let {
      data: n,
      withXSRFToken: r,
      xsrfHeaderName: o,
      xsrfCookieName: i,
      headers: a,
      auth: s
    } = t
    ;(t.headers = a = Z.from(a)),
      (t.url = la(pa(t.baseURL, t.url), e.params, e.paramsSerializer)),
      s &&
        a.set(
          'Authorization',
          'Basic ' +
            btoa(
              (s.username || '') +
                ':' +
                (s.password ? unescape(encodeURIComponent(s.password)) : '')
            )
        )
    let u
    if (h.isFormData(n)) {
      if (Q.hasStandardBrowserEnv || Q.hasStandardBrowserWebWorkerEnv)
        a.setContentType(void 0)
      else if ((u = a.getContentType()) !== !1) {
        const [c, ...l] = u
          ? u
              .split(';')
              .map(f => f.trim())
              .filter(Boolean)
          : []
        a.setContentType([c || 'multipart/form-data', ...l].join('; '))
      }
    }
    if (
      Q.hasStandardBrowserEnv &&
      (r && h.isFunction(r) && (r = r(t)), r || (r !== !1 && Md(t.url)))
    ) {
      const c = o && i && Ld.read(i)
      c && a.set(o, c)
    }
    return t
  },
  Hd = typeof XMLHttpRequest < 'u',
  Bd =
    Hd &&
    function(e) {
      return new Promise(function(n, r) {
        const o = ma(e)
        let i = o.data
        const a = Z.from(o.headers).normalize()
        let { responseType: s } = o,
          u
        function c() {
          o.cancelToken && o.cancelToken.unsubscribe(u),
            o.signal && o.signal.removeEventListener('abort', u)
        }
        let l = new XMLHttpRequest()
        l.open(o.method.toUpperCase(), o.url, !0), (l.timeout = o.timeout)
        function f() {
          if (!l) return
          const m = Z.from(
              'getAllResponseHeaders' in l && l.getAllResponseHeaders()
            ),
            g = {
              data:
                !s || s === 'text' || s === 'json'
                  ? l.responseText
                  : l.response,
              status: l.status,
              statusText: l.statusText,
              headers: m,
              config: e,
              request: l
            }
          da(
            function(b) {
              n(b), c()
            },
            function(b) {
              r(b), c()
            },
            g
          ),
            (l = null)
        }
        'onloadend' in l
          ? (l.onloadend = f)
          : (l.onreadystatechange = function() {
              !l ||
                l.readyState !== 4 ||
                (l.status === 0 &&
                  !(l.responseURL && l.responseURL.indexOf('file:') === 0)) ||
                setTimeout(f)
            }),
          (l.onabort = function() {
            l && (r(new R('Request aborted', R.ECONNABORTED, o, l)), (l = null))
          }),
          (l.onerror = function() {
            r(new R('Network Error', R.ERR_NETWORK, o, l)), (l = null)
          }),
          (l.ontimeout = function() {
            let p = o.timeout
              ? 'timeout of ' + o.timeout + 'ms exceeded'
              : 'timeout exceeded'
            const g = o.transitional || ca
            o.timeoutErrorMessage && (p = o.timeoutErrorMessage),
              r(
                new R(
                  p,
                  g.clarifyTimeoutError ? R.ETIMEDOUT : R.ECONNABORTED,
                  o,
                  l
                )
              ),
              (l = null)
          }),
          i === void 0 && a.setContentType(null),
          'setRequestHeader' in l &&
            h.forEach(a.toJSON(), function(p, g) {
              l.setRequestHeader(g, p)
            }),
          h.isUndefined(o.withCredentials) ||
            (l.withCredentials = !!o.withCredentials),
          s && s !== 'json' && (l.responseType = o.responseType),
          typeof o.onDownloadProgress == 'function' &&
            l.addEventListener('progress', Tt(o.onDownloadProgress, !0)),
          typeof o.onUploadProgress == 'function' &&
            l.upload &&
            l.upload.addEventListener('progress', Tt(o.onUploadProgress)),
          (o.cancelToken || o.signal) &&
            ((u = m => {
              l &&
                (r(!m || m.type ? new Ue(null, e, l) : m),
                l.abort(),
                (l = null))
            }),
            o.cancelToken && o.cancelToken.subscribe(u),
            o.signal &&
              (o.signal.aborted ? u() : o.signal.addEventListener('abort', u)))
        const d = jd(o.url)
        if (d && Q.protocols.indexOf(d) === -1) {
          r(new R('Unsupported protocol ' + d + ':', R.ERR_BAD_REQUEST, e))
          return
        }
        l.send(i || null)
      })
    },
  zd = (e, t) => {
    let n = new AbortController(),
      r
    const o = function(u) {
      if (!r) {
        ;(r = !0), a()
        const c = u instanceof Error ? u : this.reason
        n.abort(c instanceof R ? c : new Ue(c instanceof Error ? c.message : c))
      }
    }
    let i =
      t &&
      setTimeout(() => {
        o(new R(`timeout ${t} of ms exceeded`, R.ETIMEDOUT))
      }, t)
    const a = () => {
      e &&
        (i && clearTimeout(i),
        (i = null),
        e.forEach(u => {
          u &&
            (u.removeEventListener
              ? u.removeEventListener('abort', o)
              : u.unsubscribe(o))
        }),
        (e = null))
    }
    e.forEach(u => u && u.addEventListener && u.addEventListener('abort', o))
    const { signal: s } = n
    return (
      (s.unsubscribe = a),
      [
        s,
        () => {
          i && clearTimeout(i), (i = null)
        }
      ]
    )
  },
  Ud = zd,
  qd = function*(e, t) {
    let n = e.byteLength
    if (!t || n < t) {
      yield e
      return
    }
    let r = 0,
      o
    for (; r < n; ) (o = r + t), yield e.slice(r, o), (r = o)
  },
  Vd = async function*(e, t, n) {
    for await (const r of e)
      yield* qd(ArrayBuffer.isView(r) ? r : await n(String(r)), t)
  },
  uo = (e, t, n, r, o) => {
    const i = Vd(e, t, o)
    let a = 0
    return new ReadableStream(
      {
        type: 'bytes',
        async pull(s) {
          const { done: u, value: c } = await i.next()
          if (u) {
            s.close(), r()
            return
          }
          let l = c.byteLength
          n && n((a += l)), s.enqueue(new Uint8Array(c))
        },
        cancel(s) {
          return r(s), i.return()
        }
      },
      { highWaterMark: 2 }
    )
  },
  fo = (e, t) => {
    const n = e != null
    return r =>
      setTimeout(() => t({ lengthComputable: n, total: e, loaded: r }))
  },
  Gt =
    typeof fetch == 'function' &&
    typeof Request == 'function' &&
    typeof Response == 'function',
  ga = Gt && typeof ReadableStream == 'function',
  On =
    Gt &&
    (typeof TextEncoder == 'function'
      ? (e => t => e.encode(t))(new TextEncoder())
      : async e => new Uint8Array(await new Response(e).arrayBuffer())),
  Wd =
    ga &&
    (() => {
      let e = !1
      const t = new Request(Q.origin, {
        body: new ReadableStream(),
        method: 'POST',
        get duplex() {
          return (e = !0), 'half'
        }
      }).headers.has('Content-Type')
      return e && !t
    })(),
  po = 64 * 1024,
  Tn =
    ga &&
    !!(() => {
      try {
        return h.isReadableStream(new Response('').body)
      } catch {}
    })(),
  Pt = { stream: Tn && (e => e.body) }
Gt &&
  (e => {
    ;['text', 'arrayBuffer', 'blob', 'formData', 'stream'].forEach(t => {
      !Pt[t] &&
        (Pt[t] = h.isFunction(e[t])
          ? n => n[t]()
          : (n, r) => {
              throw new R(
                `Response type '${t}' is not supported`,
                R.ERR_NOT_SUPPORT,
                r
              )
            })
    })
  })(new Response())
const Gd = async e => {
    if (e == null) return 0
    if (h.isBlob(e)) return e.size
    if (h.isSpecCompliantForm(e))
      return (await new Request(e).arrayBuffer()).byteLength
    if (h.isArrayBufferView(e)) return e.byteLength
    if ((h.isURLSearchParams(e) && (e = e + ''), h.isString(e)))
      return (await On(e)).byteLength
  },
  Xd = async (e, t) => {
    const n = h.toFiniteNumber(e.getContentLength())
    return n ?? Gd(t)
  },
  Kd =
    Gt &&
    (async e => {
      let {
        url: t,
        method: n,
        data: r,
        signal: o,
        cancelToken: i,
        timeout: a,
        onDownloadProgress: s,
        onUploadProgress: u,
        responseType: c,
        headers: l,
        withCredentials: f = 'same-origin',
        fetchOptions: d
      } = ma(e)
      c = c ? (c + '').toLowerCase() : 'text'
      let [m, p] = o || i || a ? Ud([o, i], a) : [],
        g,
        S
      const b = () => {
        !g &&
          setTimeout(() => {
            m && m.unsubscribe()
          }),
          (g = !0)
      }
      let O
      try {
        if (
          u &&
          Wd &&
          n !== 'get' &&
          n !== 'head' &&
          (O = await Xd(l, r)) !== 0
        ) {
          let $ = new Request(t, { method: 'POST', body: r, duplex: 'half' }),
            y
          h.isFormData(r) &&
            (y = $.headers.get('content-type')) &&
            l.setContentType(y),
            $.body && (r = uo($.body, po, fo(O, Tt(u)), null, On))
        }
        h.isString(f) || (f = f ? 'cors' : 'omit'),
          (S = new Request(t, {
            ...d,
            signal: m,
            method: n.toUpperCase(),
            headers: l.normalize().toJSON(),
            body: r,
            duplex: 'half',
            withCredentials: f
          }))
        let T = await fetch(S)
        const P = Tn && (c === 'stream' || c === 'response')
        if (Tn && (s || P)) {
          const $ = {}
          ;['status', 'statusText', 'headers'].forEach(_ => {
            $[_] = T[_]
          })
          const y = h.toFiniteNumber(T.headers.get('content-length'))
          T = new Response(uo(T.body, po, s && fo(y, Tt(s, !0)), P && b, On), $)
        }
        c = c || 'text'
        let E = await Pt[h.findKey(Pt, c) || 'text'](T, e)
        return (
          !P && b(),
          p && p(),
          await new Promise(($, y) => {
            da($, y, {
              data: E,
              headers: Z.from(T.headers),
              status: T.status,
              statusText: T.statusText,
              config: e,
              request: S
            })
          })
        )
      } catch (T) {
        throw (b(),
        T && T.name === 'TypeError' && /fetch/i.test(T.message)
          ? Object.assign(new R('Network Error', R.ERR_NETWORK, e, S), {
              cause: T.cause || T
            })
          : R.from(T, T && T.code, e, S))
      }
    }),
  Pn = { http: ud, xhr: Bd, fetch: Kd }
h.forEach(Pn, (e, t) => {
  if (e) {
    try {
      Object.defineProperty(e, 'name', { value: t })
    } catch {}
    Object.defineProperty(e, 'adapterName', { value: t })
  }
})
const mo = e => `- ${e}`,
  Jd = e => h.isFunction(e) || e === null || e === !1,
  ha = {
    getAdapter: e => {
      e = h.isArray(e) ? e : [e]
      const { length: t } = e
      let n, r
      const o = {}
      for (let i = 0; i < t; i++) {
        n = e[i]
        let a
        if (
          ((r = n),
          !Jd(n) && ((r = Pn[(a = String(n)).toLowerCase()]), r === void 0))
        )
          throw new R(`Unknown adapter '${a}'`)
        if (r) break
        o[a || '#' + i] = r
      }
      if (!r) {
        const i = Object.entries(o).map(
          ([s, u]) =>
            `adapter ${s} ` +
            (u === !1
              ? 'is not supported by the environment'
              : 'is not available in the build')
        )
        let a = t
          ? i.length > 1
            ? `since :
` +
              i.map(mo).join(`
`)
            : ' ' + mo(i[0])
          : 'as no adapter specified'
        throw new R(
          'There is no suitable adapter to dispatch the request ' + a,
          'ERR_NOT_SUPPORT'
        )
      }
      return r
    },
    adapters: Pn
  }
function an(e) {
  if (
    (e.cancelToken && e.cancelToken.throwIfRequested(),
    e.signal && e.signal.aborted)
  )
    throw new Ue(null, e)
}
function go(e) {
  return (
    an(e),
    (e.headers = Z.from(e.headers)),
    (e.data = on.call(e, e.transformRequest)),
    ['post', 'put', 'patch'].indexOf(e.method) !== -1 &&
      e.headers.setContentType('application/x-www-form-urlencoded', !1),
    ha
      .getAdapter(e.adapter || sr.adapter)(e)
      .then(
        function(r) {
          return (
            an(e),
            (r.data = on.call(e, e.transformResponse, r)),
            (r.headers = Z.from(r.headers)),
            r
          )
        },
        function(r) {
          return (
            fa(r) ||
              (an(e),
              r &&
                r.response &&
                ((r.response.data = on.call(
                  e,
                  e.transformResponse,
                  r.response
                )),
                (r.response.headers = Z.from(r.response.headers)))),
            Promise.reject(r)
          )
        }
      )
  )
}
const ya = '1.7.2',
  lr = {}
;['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach(
  (e, t) => {
    lr[e] = function(r) {
      return typeof r === e || 'a' + (t < 1 ? 'n ' : ' ') + e
    }
  }
)
const ho = {}
lr.transitional = function(t, n, r) {
  function o(i, a) {
    return (
      '[Axios v' +
      ya +
      "] Transitional option '" +
      i +
      "'" +
      a +
      (r ? '. ' + r : '')
    )
  }
  return (i, a, s) => {
    if (t === !1)
      throw new R(
        o(a, ' has been removed' + (n ? ' in ' + n : '')),
        R.ERR_DEPRECATED
      )
    return (
      n &&
        !ho[a] &&
        ((ho[a] = !0),
        console.warn(
          o(
            a,
            ' has been deprecated since v' +
              n +
              ' and will be removed in the near future'
          )
        )),
      t ? t(i, a, s) : !0
    )
  }
}
function Yd(e, t, n) {
  if (typeof e != 'object')
    throw new R('options must be an object', R.ERR_BAD_OPTION_VALUE)
  const r = Object.keys(e)
  let o = r.length
  for (; o-- > 0; ) {
    const i = r[o],
      a = t[i]
    if (a) {
      const s = e[i],
        u = s === void 0 || a(s, i, e)
      if (u !== !0)
        throw new R('option ' + i + ' must be ' + u, R.ERR_BAD_OPTION_VALUE)
      continue
    }
    if (n !== !0) throw new R('Unknown option ' + i, R.ERR_BAD_OPTION)
  }
}
const En = { assertOptions: Yd, validators: lr },
  fe = En.validators
class Et {
  constructor(t) {
    ;(this.defaults = t),
      (this.interceptors = { request: new so(), response: new so() })
  }
  async request(t, n) {
    try {
      return await this._request(t, n)
    } catch (r) {
      if (r instanceof Error) {
        let o
        Error.captureStackTrace
          ? Error.captureStackTrace((o = {}))
          : (o = new Error())
        const i = o.stack ? o.stack.replace(/^.+\n/, '') : ''
        try {
          r.stack
            ? i &&
              !String(r.stack).endsWith(i.replace(/^.+\n.+\n/, '')) &&
              (r.stack +=
                `
` + i)
            : (r.stack = i)
        } catch {}
      }
      throw r
    }
  }
  _request(t, n) {
    typeof t == 'string' ? ((n = n || {}), (n.url = t)) : (n = t || {}),
      (n = we(this.defaults, n))
    const { transitional: r, paramsSerializer: o, headers: i } = n
    r !== void 0 &&
      En.assertOptions(
        r,
        {
          silentJSONParsing: fe.transitional(fe.boolean),
          forcedJSONParsing: fe.transitional(fe.boolean),
          clarifyTimeoutError: fe.transitional(fe.boolean)
        },
        !1
      ),
      o != null &&
        (h.isFunction(o)
          ? (n.paramsSerializer = { serialize: o })
          : En.assertOptions(
              o,
              { encode: fe.function, serialize: fe.function },
              !0
            )),
      (n.method = (n.method || this.defaults.method || 'get').toLowerCase())
    let a = i && h.merge(i.common, i[n.method])
    i &&
      h.forEach(
        ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
        p => {
          delete i[p]
        }
      ),
      (n.headers = Z.concat(a, i))
    const s = []
    let u = !0
    this.interceptors.request.forEach(function(g) {
      ;(typeof g.runWhen == 'function' && g.runWhen(n) === !1) ||
        ((u = u && g.synchronous), s.unshift(g.fulfilled, g.rejected))
    })
    const c = []
    this.interceptors.response.forEach(function(g) {
      c.push(g.fulfilled, g.rejected)
    })
    let l,
      f = 0,
      d
    if (!u) {
      const p = [go.bind(this), void 0]
      for (
        p.unshift.apply(p, s),
          p.push.apply(p, c),
          d = p.length,
          l = Promise.resolve(n);
        f < d;

      )
        l = l.then(p[f++], p[f++])
      return l
    }
    d = s.length
    let m = n
    for (f = 0; f < d; ) {
      const p = s[f++],
        g = s[f++]
      try {
        m = p(m)
      } catch (S) {
        g.call(this, S)
        break
      }
    }
    try {
      l = go.call(this, m)
    } catch (p) {
      return Promise.reject(p)
    }
    for (f = 0, d = c.length; f < d; ) l = l.then(c[f++], c[f++])
    return l
  }
  getUri(t) {
    t = we(this.defaults, t)
    const n = pa(t.baseURL, t.url)
    return la(n, t.params, t.paramsSerializer)
  }
}
h.forEach(['delete', 'get', 'head', 'options'], function(t) {
  Et.prototype[t] = function(n, r) {
    return this.request(
      we(r || {}, { method: t, url: n, data: (r || {}).data })
    )
  }
})
h.forEach(['post', 'put', 'patch'], function(t) {
  function n(r) {
    return function(i, a, s) {
      return this.request(
        we(s || {}, {
          method: t,
          headers: r ? { 'Content-Type': 'multipart/form-data' } : {},
          url: i,
          data: a
        })
      )
    }
  }
  ;(Et.prototype[t] = n()), (Et.prototype[t + 'Form'] = n(!0))
})
const bt = Et
class cr {
  constructor(t) {
    if (typeof t != 'function')
      throw new TypeError('executor must be a function.')
    let n
    this.promise = new Promise(function(i) {
      n = i
    })
    const r = this
    this.promise.then(o => {
      if (!r._listeners) return
      let i = r._listeners.length
      for (; i-- > 0; ) r._listeners[i](o)
      r._listeners = null
    }),
      (this.promise.then = o => {
        let i
        const a = new Promise(s => {
          r.subscribe(s), (i = s)
        }).then(o)
        return (
          (a.cancel = function() {
            r.unsubscribe(i)
          }),
          a
        )
      }),
      t(function(i, a, s) {
        r.reason || ((r.reason = new Ue(i, a, s)), n(r.reason))
      })
  }
  throwIfRequested() {
    if (this.reason) throw this.reason
  }
  subscribe(t) {
    if (this.reason) {
      t(this.reason)
      return
    }
    this._listeners ? this._listeners.push(t) : (this._listeners = [t])
  }
  unsubscribe(t) {
    if (!this._listeners) return
    const n = this._listeners.indexOf(t)
    n !== -1 && this._listeners.splice(n, 1)
  }
  static source() {
    let t
    return {
      token: new cr(function(o) {
        t = o
      }),
      cancel: t
    }
  }
}
const Qd = cr
function Zd(e) {
  return function(n) {
    return e.apply(null, n)
  }
}
function ep(e) {
  return h.isObject(e) && e.isAxiosError === !0
}
const $n = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511
}
Object.entries($n).forEach(([e, t]) => {
  $n[t] = e
})
const tp = $n
function va(e) {
  const t = new bt(e),
    n = Ji(bt.prototype.request, t)
  return (
    h.extend(n, bt.prototype, t, { allOwnKeys: !0 }),
    h.extend(n, t, null, { allOwnKeys: !0 }),
    (n.create = function(o) {
      return va(we(e, o))
    }),
    n
  )
}
const k = va(sr)
k.Axios = bt
k.CanceledError = Ue
k.CancelToken = Qd
k.isCancel = fa
k.VERSION = ya
k.toFormData = Vt
k.AxiosError = R
k.Cancel = k.CanceledError
k.all = function(t) {
  return Promise.all(t)
}
k.spread = Zd
k.isAxiosError = ep
k.mergeConfig = we
k.AxiosHeaders = Z
k.formToJSON = e => ua(h.isHTMLForm(e) ? new FormData(e) : e)
k.getAdapter = ha.getAdapter
k.HttpStatusCode = tp
k.default = k
const np = k,
  ce = np.create({
    baseURL: window.wcv_avp.rest_url,
    headers: { 'Content-Type': 'application/json' }
  }),
  rp = window.wpApiSettings.nonce
ce.interceptors.request.use(
  e => ((e.headers['X-WP-Nonce'] = rp), e),
  async e => await Promise.reject(e)
)
ce.interceptors.response.use(
  e => e,
  async e => (
    (e.response.status === 401 ||
      e.response.status === 403 ||
      e.response.status === 500) &&
      Ot.error({ message: e.response.data.message, description: e.message }),
    await Promise.reject(e)
  )
)
const op = async e => (await ce.get('/vendors', { params: e })).data,
  ip = async e => (await ce.get(`/vendors/settings/${e}`)).data,
  ap = async e => (await ce.get(`/vendors/settings/${e}`)).data,
  sp = async (e, t) =>
    (await ce.post(`/vendors/settings/${e}`, { changes: t })).data,
  lp = async (e, t) => (await ce.post(`/vendors/action/${e}/${t}`)).data,
  cp = async (e, t, n, r) =>
    (
      await ce.post(`/vendors/action/${e}/${t}`, {
        customMessage: n || '',
        useCustomMessage: r || !1
      })
    ).data,
  up = async e => (await ce.get(`/vendors/details/${e}`)).data,
  fp = {
    getVendors: op,
    getVendor: ip,
    getVendorDetails: up,
    getVendorSettings: ap,
    saveSettings: sp,
    setVendorStatus: lp,
    setVendorApproval: cp
  },
  dp = window.wcv_avp.html_settings,
  pp = {
    plugins:
      'charmap colorpicker compat3x directionality fullscreen hr image lists media paste tabfocus textcolor wordpress wpautoresize wpdialogs wpeditimage wpemoji wpgallery wplink wptextpattern wpview',
    toolbar1:
      'formatselect bold italic | bullist numlist | blockquote | alignleft aligncenter alignright | link unlink | wp_more | spellchecker',
    wp_theme: !0
  },
  qp = (e, t = {}) => {
    window.wp.editor.initialize(e, {
      tinymce: { ...pp, ...t },
      mediaButtons: dp.use_media,
      quicktags: !0
    })
  },
  Vp = e => {
    window.wp.editor.remove(e)
  },
  de = e => window.wcv_avp.i18n[e],
  ba = So('spinerStore', () => ({ showSpinner: H(!1) })),
  Ca = So('vendorEditStore', () => {
    const e = ba(),
      t = H({}),
      n = fp,
      r = H(!1),
      o = H([
        {
          title: de('openHDay'),
          dataIndex: 'day',
          key: 'day',
          width: '25%',
          align: 'center'
        },
        {
          title: de('openHFrom'),
          dataIndex: 'open',
          key: 'open',
          width: '20%',
          align: 'center'
        },
        {
          title: de('openHTo'),
          dataIndex: 'close',
          key: 'close',
          width: '20%',
          align: 'center'
        },
        {
          title: de('openHEnable'),
          dataIndex: 'status',
          key: 'status',
          width: '15%',
          align: 'center'
        },
        {
          title: de('actions'),
          dataIndex: 'actions',
          key: 'actions',
          width: '20%',
          align: 'center'
        }
      ]),
      i = H(''),
      a = H(''),
      s = H('')
    return {
      vendorSettings: t,
      openingHoursColumns: o,
      showPopup: r,
      modalTitle: i,
      modalContent: a,
      featureSlug: s,
      saveSettings: async l => {
        e.showSpinner = !0
        const f = await n.saveSettings(l, t.value)
        return (
          f.success
            ? Ot.success({ message: de('success'), description: f.message })
            : Ot.error({ message: de('error'), description: f.message }),
          (e.showSpinner = !1),
          f
        )
      },
      fetchVendorSettings: async l => {
        e.showSpinner = !0
        const f = await n.getVendorSettings(l)
        ;(t.value = f), (e.showSpinner = !1)
      }
    }
  }),
  mp = ja({
    history: ka(),
    routes: [
      {
        name: 'vendor',
        path: '/',
        component: async () =>
          await Ct(
            () => import('./components/VendorTable.4e5f4e8c.js'),
            [
              window.wcv_avp.pluginDirUrl +
                '/dist/components/VendorTable.4e5f4e8c.js',
              window.wcv_avp.pluginDirUrl + '/dist/common/vendor.84fc1123.js',
              window.wcv_avp.pluginDirUrl +
                '/dist/common/VendorStore.d737faa9.js',
              window.wcv_avp.pluginDirUrl + '/dist/common/antd.7f3c63f7.js',
              window.wcv_avp.pluginDirUrl +
                '/dist/common/initDefaultProps.71991ecc.js',
              window.wcv_avp.pluginDirUrl +
                '/dist/common/_plugin-vue_export-helper.c27b6911.js',
              window.wcv_avp.pluginDirUrl + '/dist/common/index.60678172.js',
              window.wcv_avp.pluginDirUrl + '/dist/common/index.e3da6296.js',
              window.wcv_avp.pluginDirUrl + '/dist/common/index.109b4b21.js',
              window.wcv_avp.pluginDirUrl +
                '/dist/common/responsiveObserve.eb3c0da1.js',
              window.wcv_avp.pluginDirUrl + '/dist/common/index.6a48a719.js',
              window.wcv_avp.pluginDirUrl +
                '/dist/assets/VendorTable-0c918a86.css'
            ],
            import.meta.url
          )
      },
      {
        name: 'vendor-edit',
        path: '/vendor-edit/:id',
        component: async () =>
          await Ct(
            () => import('./common/VendorEdit.9f7f9a17.js').then(e => e.V),
            [
              window.wcv_avp.pluginDirUrl +
                '/dist/common/VendorEdit.9f7f9a17.js',
              window.wcv_avp.pluginDirUrl + '/dist/common/vendor.84fc1123.js',
              window.wcv_avp.pluginDirUrl +
                '/dist/common/VendorStore.d737faa9.js',
              window.wcv_avp.pluginDirUrl + '/dist/common/antd.7f3c63f7.js',
              window.wcv_avp.pluginDirUrl +
                '/dist/common/initDefaultProps.71991ecc.js',
              window.wcv_avp.pluginDirUrl + '/dist/common/index.ebb33149.js',
              window.wcv_avp.pluginDirUrl +
                '/dist/common/ActionButton.265b9cc4.js',
              window.wcv_avp.pluginDirUrl + '/dist/common/hasIn.ec097647.js',
              window.wcv_avp.pluginDirUrl + '/dist/common/index.380800ce.js',
              window.wcv_avp.pluginDirUrl + '/dist/common/index.7f1c23e8.js',
              window.wcv_avp.pluginDirUrl + '/dist/common/index.4e3cad7b.js'
            ],
            import.meta.url
          ),
        props: e => ({ id: Number(e.params.id) }),
        beforeEnter: async (e, t, n) => {
          const r = Ca(),
            o = ba()
          ;(o.showSpinner = !0),
            await r.fetchVendorSettings(Number(e.params.id)),
            r.vendorSettings.error ? n(t.path) : n(),
            (o.showSpinner = !1)
        }
      }
    ],
    linkActiveClass: 'active',
    linkExactActiveClass: 'active'
  }),
  Sa = {},
  gp = (e, t) => {
    Sa[e] = t
  },
  Wp = e => Sa[e] ?? null
window.wcv_avp_vue = Na
window.wcv_avp_pinia = Ma
window.wcv_avp = window.wcv_avp || {}
window.wcv_avp.registerComponent = gp
window.wcv_avp.stores = { useVendorEditStore: Ca }
window.wcv_avp.utils = { getI18n: de }
const ur = La(Qa),
  hp = Fa()
ur.use(hp)
ur.use(mp)
ur.mount('#avp')
export {
  Vn as $,
  ae as A,
  Pc as B,
  Gn as C,
  wo as D,
  Ms as E,
  Bp as F,
  Op as G,
  Fe as H,
  St as I,
  Do as J,
  _c as K,
  Ao as L,
  Ec as M,
  Tp as N,
  Sp as O,
  Tc as P,
  Pp as Q,
  xp as R,
  bs as S,
  Ce as T,
  Rp as U,
  _p as V,
  zp as W,
  $p as X,
  vs as Y,
  jp as Z,
  v as _,
  Mt as a,
  Nt as a0,
  $o as a1,
  gs as a2,
  Gl as a3,
  Fp as a4,
  ql as a5,
  sn as a6,
  Ft as a7,
  fp as a8,
  Ot as a9,
  Mp as aa,
  Ae as ab,
  Ht as ac,
  Ep as ad,
  bp as ae,
  yi as af,
  Dt as ag,
  ic as ah,
  Os as ai,
  Np as aj,
  Bt as ak,
  Up as al,
  Ye as am,
  D as an,
  Po as ao,
  vr as ap,
  Vp as aq,
  qp as ar,
  Hp as as,
  ii as at,
  Wp as au,
  hs as av,
  Ts as aw,
  We as ax,
  F as b,
  de as c,
  Ct as d,
  U as e,
  Ee as f,
  Dn as g,
  kp as h,
  Lp as i,
  Dp as j,
  Cs as k,
  Jt as l,
  kt as m,
  Ap as n,
  W as o,
  Rn as p,
  hr as q,
  Qo as r,
  yr as s,
  Cp as t,
  ba as u,
  Mn as v,
  In as w,
  wp as x,
  Ip as y,
  Ca as z
}

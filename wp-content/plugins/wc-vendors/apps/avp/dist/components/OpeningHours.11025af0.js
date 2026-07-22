import {
  d as F,
  L,
  r as P,
  o as a,
  a as u,
  w as d,
  u as e,
  c as v,
  Y as y,
  N as c,
  F as m,
  Z as f,
  Q as g
} from '../common/vendor.84fc1123.js'
import { z as R, c as h } from '../main.491ba5c0.js'
import { B as w, S as $ } from '../common/VendorStore.d737faa9.js'
import { G as j, H as A, r as D, F as K } from '../common/antd.7f3c63f7.js'
import { S as O } from '../common/index.109b4b21.js'
import { P as G } from '../common/index.ebb33149.js'
import { S as Q } from '../common/DynamicControl.627d1dc9.js'
import { T as Y } from '../common/index.60678172.js'
import '../common/initDefaultProps.71991ecc.js'
import '../common/ActionButton.265b9cc4.js'
import '../common/index.4e3cad7b.js'
import '../common/_plugin-vue_export-helper.c27b6911.js'
import '../common/index.380800ce.js'
import '../common/index.7f1c23e8.js'
import '../common/VendorEdit.9f7f9a17.js'
import '../common/hasIn.ec097647.js'
import '../common/index.e3da6296.js'
import '../common/responsiveObserve.eb3c0da1.js'
const me = F({
  __name: 'OpeningHours',
  setup(Z) {
    var b, x, S
    const T = R(),
      U = window.wcv_avp.opening_times,
      k = window.wcv_avp.opening_days,
      { vendorSettings: p, openingHoursColumns: H } = L(T)
    p.value.store_opening_hours = Array.isArray(
      (b = p.value) == null ? void 0 : b.store_opening_hours
    )
      ? (x = p.value) == null
        ? void 0
        : x.store_opening_hours
      : []
    const I = (S = p.value) == null ? void 0 : S.store_opening_hours,
      V = h('confirmRemove'),
      l = P([]),
      _ = U.map(o => {
        let n = Object.keys(o)
        return { value: n[0], label: o[n[0]] }
      }),
      B = Object.keys(k).map(o => ({ value: o, label: k[o] })),
      N = o => {
        l.value.indexOf(o) === -1
          ? l.value.push(o)
          : l.value.splice(l.value.indexOf(o), 1)
      },
      z = o => {
        var n, t
        ;(t = (n = p.value) == null ? void 0 : n.store_opening_hours) == null ||
          t.splice(o, 1)
      },
      E = () => {
        var o, n, t, s
        ;(n = (o = p.value) == null ? void 0 : o.store_opening_hours) == null ||
          n.push({ day: 'sunday', open: '00:00', close: '23:30', status: '1' }),
          l.value.push(
            ((s = (t = p.value) == null ? void 0 : t.store_opening_hours) ==
            null
              ? void 0
              : s.length) - 1
          )
      },
      C = o => {
        let n = _.find(s => s.value === o)
        return n ? n.label : ''
      }
    return (o, n) => (
      a(),
      u(
        e(Y),
        {
          columns: e(H),
          dataSource: e(I),
          pagination: !1,
          rowKey: t => t.day,
          bordered: '',
          tableLayout: 'auto'
        },
        {
          headerCell: d(({ column: t }) => [
            t.dataIndex === 'actions'
              ? (a(),
                u(
                  e(w),
                  {
                    key: 0,
                    type: 'primary',
                    size: 'middle',
                    onClick: n[0] || (n[0] = s => E())
                  },
                  { default: d(() => [v(e(j))]), _: 1 }
                ))
              : y('', !0)
          ]),
          bodyCell: d(({ record: t, column: s, index: r }) => [
            s.dataIndex === 'day'
              ? (a(),
                c(
                  m,
                  { key: 0 },
                  [
                    l.value.includes(r)
                      ? (a(),
                        u(
                          e(O),
                          {
                            key: 0,
                            options: e(B),
                            value: t.day,
                            'onUpdate:value': i => (t.day = i),
                            style: { width: '100px' }
                          },
                          null,
                          8,
                          ['options', 'value', 'onUpdate:value']
                        ))
                      : (a(), c(m, { key: 1 }, [f(g(e(k)[t.day]), 1)], 64))
                  ],
                  64
                ))
              : s.dataIndex === 'open'
              ? (a(),
                c(
                  m,
                  { key: 1 },
                  [
                    l.value.includes(r)
                      ? (a(),
                        u(
                          e(O),
                          {
                            key: 0,
                            options: e(_),
                            value: t.open,
                            'onUpdate:value': i => (t.open = i),
                            style: { width: '100px' }
                          },
                          null,
                          8,
                          ['options', 'value', 'onUpdate:value']
                        ))
                      : (a(), c(m, { key: 1 }, [f(g(C(t.open)), 1)], 64))
                  ],
                  64
                ))
              : s.dataIndex === 'close'
              ? (a(),
                c(
                  m,
                  { key: 2 },
                  [
                    l.value.includes(r)
                      ? (a(),
                        u(
                          e(O),
                          {
                            key: 0,
                            options: e(_),
                            value: t.close,
                            'onUpdate:value': i => (t.close = i),
                            style: { width: '100px' }
                          },
                          null,
                          8,
                          ['options', 'value', 'onUpdate:value']
                        ))
                      : (a(), c(m, { key: 1 }, [f(g(C(t.close)), 1)], 64))
                  ],
                  64
                ))
              : y('', !0),
            s.dataIndex === 'actions'
              ? (a(),
                u(
                  e($),
                  { key: 3, size: 'small' },
                  {
                    default: d(() => [
                      v(
                        e(w),
                        { onClick: i => N(r) },
                        {
                          default: d(() => [
                            l.value.includes(r)
                              ? (a(), u(e(A), { key: 0 }))
                              : (a(), u(e(D), { key: 1 }))
                          ]),
                          _: 2
                        },
                        1032,
                        ['onClick']
                      ),
                      l.value.includes(r)
                        ? y('', !0)
                        : (a(),
                          u(
                            e(G),
                            {
                              key: 0,
                              title: e(V),
                              onConfirm: i => z(r),
                              okText: e(h)('ok'),
                              cancelText: e(h)('cancel')
                            },
                            {
                              default: d(() => [
                                v(
                                  e(w),
                                  { danger: '' },
                                  { default: d(() => [v(e(K))]), _: 1 }
                                )
                              ]),
                              _: 2
                            },
                            1032,
                            ['title', 'onConfirm', 'okText', 'cancelText']
                          ))
                    ]),
                    _: 2
                  },
                  1024
                ))
              : s.dataIndex === 'status'
              ? (a(),
                u(
                  e(Q),
                  {
                    key: 4,
                    size: 'small',
                    checked: t.status,
                    'onUpdate:checked': i => (t.status = i),
                    checkedValue: '1',
                    unCheckedValue: '0'
                  },
                  null,
                  8,
                  ['checked', 'onUpdate:checked']
                ))
              : y('', !0)
          ]),
          _: 1
        },
        8,
        ['columns', 'dataSource', 'rowKey']
      )
    )
  }
})
export { me as default }

import {
  d as V,
  W as g,
  e as x,
  o as n,
  N as U,
  c,
  w as u,
  Z as I,
  Q as S,
  u as t,
  a as s,
  Y as l,
  F as q
} from '../common/vendor.84fc1123.js'
import { c as o } from '../main.491ba5c0.js'
import {
  _ as C,
  I as T,
  S as b,
  b as w,
  a as R
} from '../common/DynamicControl.627d1dc9.js'
import { B as p } from '../common/VendorStore.d737faa9.js'
import { a as B } from '../common/index.109b4b21.js'
import { P as N } from '../common/index.ebb33149.js'
import { F } from '../common/antd.7f3c63f7.js'
import { T as $ } from '../common/index.60678172.js'
import '../common/index.4e3cad7b.js'
import '../common/_plugin-vue_export-helper.c27b6911.js'
import '../common/index.380800ce.js'
import '../common/index.7f1c23e8.js'
import '../common/initDefaultProps.71991ecc.js'
import '../common/ActionButton.265b9cc4.js'
import '../common/VendorEdit.9f7f9a17.js'
import '../common/hasIn.ec097647.js'
import '../common/index.e3da6296.js'
import '../common/responsiveObserve.eb3c0da1.js'
const te = V({
  __name: 'ShippingTableRates',
  props: {
    rates: { type: Object, required: !0, default: () => [] },
    currency: String
  },
  setup(y) {
    const m = y,
      { rates: i, currency: k } = g(m),
      f = x(() => [
        { title: o('region'), dataIndex: 'region', key: 'region' },
        { title: o('country'), dataIndex: 'country', key: 'country' },
        { title: o('state'), dataIndex: 'state', key: 'state' },
        { title: o('postcode'), dataIndex: 'postcode', key: 'postcode' },
        { title: o('shippingFee'), dataIndex: 'fee', key: 'fee' },
        {
          title: o('qtyOverride'),
          dataIndex: 'qty_override',
          key: 'qty_override'
        },
        { title: o('actions'), key: 'action', dataIndex: 'action' }
      ]),
      _ = () => {
        i.value.push({
          region: '',
          country: '',
          state: '',
          postcode: '',
          fee: 0,
          qty_override: 'no'
        })
      },
      v = d => {
        i.value.splice(d, 1)
      }
    return (d, O) => (
      n(),
      U(
        q,
        null,
        [
          c(
            t(p),
            { type: 'primary', style: { 'margin-bottom': '8px' }, onClick: _ },
            { default: u(() => [I(S(t(o)('addRow')), 1)]), _: 1 }
          ),
          c(
            t($),
            { dataSource: t(i), columns: f.value },
            {
              bodyCell: u(({ record: e, index: h, column: r }) => [
                r.key === 'action'
                  ? (n(),
                    s(
                      t(N),
                      {
                        key: 0,
                        onConfirm: a => v(h),
                        title: t(o)('confirmRemove'),
                        okText: t(o)('ok'),
                        cancelText: t(o)('cancel')
                      },
                      {
                        default: u(() => [
                          c(
                            t(p),
                            { danger: '' },
                            { default: u(() => [c(t(F))]), _: 1 }
                          )
                        ]),
                        _: 2
                      },
                      1032,
                      ['onConfirm', 'title', 'okText', 'cancelText']
                    ))
                  : l('', !0),
                r.key === 'country'
                  ? (n(),
                    s(
                      C,
                      {
                        key: 1,
                        selectedValue: e.country,
                        'onUpdate:selectedValue': a => (e.country = a),
                        continent: e.region,
                        showSearch: !0
                      },
                      null,
                      8,
                      ['selectedValue', 'onUpdate:selectedValue', 'continent']
                    ))
                  : l('', !0),
                r.key === 'postcode'
                  ? (n(),
                    s(
                      t(B),
                      {
                        key: 2,
                        value: e.postcode,
                        'onUpdate:value': a => (e.postcode = a)
                      },
                      null,
                      8,
                      ['value', 'onUpdate:value']
                    ))
                  : l('', !0),
                r.key === 'fee'
                  ? (n(),
                    s(
                      t(T),
                      {
                        key: 3,
                        value: e.fee,
                        'onUpdate:value': a => (e.fee = a),
                        addonAfter: t(k)
                      },
                      null,
                      8,
                      ['value', 'onUpdate:value', 'addonAfter']
                    ))
                  : l('', !0),
                r.key === 'qty_override'
                  ? (n(),
                    s(
                      t(b),
                      {
                        key: 4,
                        size: 'small',
                        checked: e.qty_override,
                        'onUpdate:checked': a => (e.qty_override = a),
                        checkedValue: 'yes',
                        unCheckedValue: 'no'
                      },
                      null,
                      8,
                      ['checked', 'onUpdate:checked']
                    ))
                  : l('', !0),
                r.key === 'region'
                  ? (n(),
                    s(
                      w,
                      {
                        key: 5,
                        selectedValue: e.region,
                        'onUpdate:selectedValue': a => (e.region = a),
                        showSearch: !0
                      },
                      null,
                      8,
                      ['selectedValue', 'onUpdate:selectedValue']
                    ))
                  : l('', !0),
                r.key === 'state'
                  ? (n(),
                    s(
                      R,
                      {
                        key: 6,
                        country: e.country,
                        selectedValue: e.state,
                        'onUpdate:selectedValue': a => (e.state = a),
                        showSearch: !0
                      },
                      null,
                      8,
                      ['country', 'selectedValue', 'onUpdate:selectedValue']
                    ))
                  : l('', !0)
              ]),
              _: 1
            },
            8,
            ['dataSource', 'columns']
          )
        ],
        64
      )
    )
  }
})
export { te as default }

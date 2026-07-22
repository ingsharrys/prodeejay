import {
  d as m,
  W as _,
  o as b,
  a as h,
  w as r,
  c as a,
  u as e
} from '../common/vendor.84fc1123.js'
import { F as o, I as u, S as p } from '../common/DynamicControl.627d1dc9.js'
import { c as i } from '../main.491ba5c0.js'
import { C as s, R as g } from '../common/index.6a48a719.js'
import '../common/antd.7f3c63f7.js'
import '../common/VendorStore.d737faa9.js'
import '../common/initDefaultProps.71991ecc.js'
import '../common/index.4e3cad7b.js'
import '../common/_plugin-vue_export-helper.c27b6911.js'
import '../common/index.109b4b21.js'
import '../common/index.380800ce.js'
import '../common/index.7f1c23e8.js'
import '../common/ActionButton.265b9cc4.js'
import '../common/VendorEdit.9f7f9a17.js'
import '../common/index.ebb33149.js'
import '../common/hasIn.ec097647.js'
import '../common/responsiveObserve.eb3c0da1.js'
const R = m({
  __name: 'ShippingFlat',
  props: {
    rates: { type: Object, required: !0, default: () => ({}) },
    currency: String
  },
  setup(f) {
    const c = f,
      { rates: n, currency: d } = _(c)
    return (k, l) => (
      b(),
      h(e(g), null, {
        default: r(() => [
          a(
            e(s),
            { span: 12, xs: { span: 24 } },
            {
              default: r(() => [
                a(
                  o,
                  {
                    label: e(i)('defautNationalShippingFee'),
                    description: e(i)('defautNationalShippingFeeDesc')
                  },
                  {
                    default: r(() => [
                      a(
                        e(u),
                        {
                          value: e(n).national,
                          'onUpdate:value':
                            l[0] || (l[0] = t => (e(n).national = t)),
                          addonAfter: e(d)
                        },
                        null,
                        8,
                        ['value', 'addonAfter']
                      )
                    ]),
                    _: 1
                  },
                  8,
                  ['label', 'description']
                ),
                a(
                  o,
                  {
                    label: e(i)('nationalMinCharge'),
                    description: e(i)('nationalMinChargeDesc')
                  },
                  {
                    default: r(() => [
                      a(
                        e(u),
                        {
                          value: e(n).national_min_charge,
                          'onUpdate:value':
                            l[1] ||
                            (l[1] = t => (e(n).national_min_charge = t)),
                          addonAfter: e(d)
                        },
                        null,
                        8,
                        ['value', 'addonAfter']
                      )
                    ]),
                    _: 1
                  },
                  8,
                  ['label', 'description']
                ),
                a(
                  o,
                  {
                    label: e(i)('nationalMaxCharge'),
                    description: e(i)('nationalMaxChargeDesc')
                  },
                  {
                    default: r(() => [
                      a(
                        e(u),
                        {
                          value: e(n).national_max_charge,
                          'onUpdate:value':
                            l[2] ||
                            (l[2] = t => (e(n).national_max_charge = t)),
                          addonAfter: e(d)
                        },
                        null,
                        8,
                        ['value', 'addonAfter']
                      )
                    ]),
                    _: 1
                  },
                  8,
                  ['label', 'description']
                ),
                a(
                  o,
                  {
                    label: e(i)('nationalFreeOrder'),
                    description: e(i)('nationalFreeOrderDesc')
                  },
                  {
                    default: r(() => [
                      a(
                        e(u),
                        {
                          value: e(n).national_free_shipping_order,
                          'onUpdate:value':
                            l[3] ||
                            (l[3] = t =>
                              (e(n).national_free_shipping_order = t)),
                          addonAfter: e(d)
                        },
                        null,
                        8,
                        ['value', 'addonAfter']
                      )
                    ]),
                    _: 1
                  },
                  8,
                  ['label', 'description']
                ),
                a(
                  o,
                  { label: e(i)('nationalFreeShipping') },
                  {
                    default: r(() => [
                      a(
                        e(p),
                        {
                          size: 'small',
                          checked: e(n).national_free,
                          'onUpdate:checked':
                            l[4] || (l[4] = t => (e(n).national_free = t)),
                          checkedValue: 'yes',
                          unCheckedValue: 'no'
                        },
                        null,
                        8,
                        ['checked']
                      )
                    ]),
                    _: 1
                  },
                  8,
                  ['label']
                ),
                a(
                  o,
                  { label: e(i)('nationalChargeOne') },
                  {
                    default: r(() => [
                      a(
                        e(p),
                        {
                          size: 'small',
                          checked: e(n).national_qty_override,
                          'onUpdate:checked':
                            l[5] ||
                            (l[5] = t => (e(n).national_qty_override = t)),
                          checkedValue: 'yes',
                          unCheckedValue: 'no'
                        },
                        null,
                        8,
                        ['checked']
                      )
                    ]),
                    _: 1
                  },
                  8,
                  ['label']
                ),
                a(
                  o,
                  { label: e(i)('disableNationalShipping') },
                  {
                    default: r(() => [
                      a(
                        e(p),
                        {
                          size: 'small',
                          checked: e(n).national_disable,
                          'onUpdate:checked':
                            l[6] || (l[6] = t => (e(n).national_disable = t)),
                          checkedValue: 'yes',
                          unCheckedValue: 'no'
                        },
                        null,
                        8,
                        ['checked']
                      )
                    ]),
                    _: 1
                  },
                  8,
                  ['label']
                )
              ]),
              _: 1
            }
          ),
          a(
            e(s),
            { span: 12, xs: { span: 24 } },
            {
              default: r(() => [
                a(
                  o,
                  {
                    label: e(i)('defautInternationalShippingFee'),
                    description: e(i)('defautInternationalShippingFeeDesc')
                  },
                  {
                    default: r(() => [
                      a(
                        e(u),
                        {
                          value: e(n).international,
                          'onUpdate:value':
                            l[7] || (l[7] = t => (e(n).international = t)),
                          addonAfter: e(d)
                        },
                        null,
                        8,
                        ['value', 'addonAfter']
                      )
                    ]),
                    _: 1
                  },
                  8,
                  ['label', 'description']
                ),
                a(
                  o,
                  {
                    label: e(i)('internationalMinCharge'),
                    description: e(i)('internationalMinChargeDesc')
                  },
                  {
                    default: r(() => [
                      a(
                        e(u),
                        {
                          value: e(n).international_min_charge,
                          'onUpdate:value':
                            l[8] ||
                            (l[8] = t => (e(n).international_min_charge = t)),
                          addonAfter: e(d)
                        },
                        null,
                        8,
                        ['value', 'addonAfter']
                      )
                    ]),
                    _: 1
                  },
                  8,
                  ['label', 'description']
                ),
                a(
                  o,
                  {
                    label: e(i)('internationalMaxCharge'),
                    description: e(i)('internationalMaxChargeDesc')
                  },
                  {
                    default: r(() => [
                      a(
                        e(u),
                        {
                          value: e(n).international_max_charge,
                          'onUpdate:value':
                            l[9] ||
                            (l[9] = t => (e(n).international_max_charge = t)),
                          addonAfter: e(d)
                        },
                        null,
                        8,
                        ['value', 'addonAfter']
                      )
                    ]),
                    _: 1
                  },
                  8,
                  ['label', 'description']
                ),
                a(
                  o,
                  {
                    label: e(i)('internationalFreeOrder'),
                    description: e(i)('internationalFreeOrderDesc')
                  },
                  {
                    default: r(() => [
                      a(
                        e(u),
                        {
                          value: e(n).international_free_shipping_order,
                          'onUpdate:value':
                            l[10] ||
                            (l[10] = t =>
                              (e(n).international_free_shipping_order = t)),
                          addonAfter: e(d)
                        },
                        null,
                        8,
                        ['value', 'addonAfter']
                      )
                    ]),
                    _: 1
                  },
                  8,
                  ['label', 'description']
                ),
                a(
                  o,
                  { label: e(i)('internationalFreeShipping') },
                  {
                    default: r(() => [
                      a(
                        e(p),
                        {
                          size: 'small',
                          checked: e(n).international_free,
                          'onUpdate:checked':
                            l[11] ||
                            (l[11] = t => (e(n).international_free = t)),
                          checkedValue: 'yes',
                          unCheckedValue: 'no'
                        },
                        null,
                        8,
                        ['checked']
                      )
                    ]),
                    _: 1
                  },
                  8,
                  ['label']
                ),
                a(
                  o,
                  { label: e(i)('internationalChargeOne') },
                  {
                    default: r(() => [
                      a(
                        e(p),
                        {
                          size: 'small',
                          checked: e(n).international_qty_override,
                          'onUpdate:checked':
                            l[12] ||
                            (l[12] = t =>
                              (e(n).international_qty_override = t)),
                          checkedValue: 'yes',
                          unCheckedValue: 'no'
                        },
                        null,
                        8,
                        ['checked']
                      )
                    ]),
                    _: 1
                  },
                  8,
                  ['label']
                ),
                a(
                  o,
                  { label: e(i)('disableInternationalShipping') },
                  {
                    default: r(() => [
                      a(
                        e(p),
                        {
                          size: 'small',
                          checked: e(n).international_disable,
                          'onUpdate:checked':
                            l[13] ||
                            (l[13] = t => (e(n).international_disable = t)),
                          checkedValue: 'yes',
                          unCheckedValue: 'no'
                        },
                        null,
                        8,
                        ['checked']
                      )
                    ]),
                    _: 1
                  },
                  8,
                  ['label']
                )
              ]),
              _: 1
            }
          )
        ]),
        _: 1
      })
    )
  }
})
export { R as default }

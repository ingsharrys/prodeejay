import {
  d as o,
  L as _,
  o as u,
  N as g,
  c as t,
  w as i,
  u as e,
  F as f
} from '../common/vendor.84fc1123.js'
import { z as m, c as l } from '../main.491ba5c0.js'
import { _ as h, F as r, a as v } from '../common/DynamicControl.627d1dc9.js'
import { a as n } from '../common/index.109b4b21.js'
import '../common/antd.7f3c63f7.js'
import '../common/VendorStore.d737faa9.js'
import '../common/initDefaultProps.71991ecc.js'
import '../common/index.4e3cad7b.js'
import '../common/_plugin-vue_export-helper.c27b6911.js'
import '../common/index.380800ce.js'
import '../common/index.7f1c23e8.js'
import '../common/ActionButton.265b9cc4.js'
import '../common/VendorEdit.9f7f9a17.js'
import '../common/index.ebb33149.js'
import '../common/hasIn.ec097647.js'
const $ = o({
  __name: 'ShippingAddress',
  setup(b) {
    const d = m(),
      { vendorSettings: s } = _(d)
    return (y, a) => (
      u(),
      g(
        f,
        null,
        [
          t(
            r,
            { label: e(l)('shippingCountry') },
            {
              default: i(() => [
                t(
                  h,
                  {
                    selectedValue: e(s).shipping_flat_rate.shipping_address
                      .country,
                    'onUpdate:selectedValue':
                      a[0] ||
                      (a[0] = p =>
                        (e(s).shipping_flat_rate.shipping_address.country = p))
                  },
                  null,
                  8,
                  ['selectedValue']
                )
              ]),
              _: 1
            },
            8,
            ['label']
          ),
          t(
            r,
            { label: e(l)('shippingState') },
            {
              default: i(() => [
                t(
                  v,
                  {
                    selectedValue: e(s).shipping_flat_rate.shipping_address
                      .state,
                    'onUpdate:selectedValue':
                      a[1] ||
                      (a[1] = p =>
                        (e(s).shipping_flat_rate.shipping_address.state = p)),
                    country: e(s).shipping_flat_rate.shipping_address.country
                  },
                  null,
                  8,
                  ['selectedValue', 'country']
                )
              ]),
              _: 1
            },
            8,
            ['label']
          ),
          t(
            r,
            { label: e(l)('shippingCity') },
            {
              default: i(() => [
                t(
                  e(n),
                  {
                    value: e(s).shipping_flat_rate.shipping_address.city,
                    'onUpdate:value':
                      a[2] ||
                      (a[2] = p =>
                        (e(s).shipping_flat_rate.shipping_address.city = p))
                  },
                  null,
                  8,
                  ['value']
                )
              ]),
              _: 1
            },
            8,
            ['label']
          ),
          t(
            r,
            { label: e(l)('shippingPostcode') },
            {
              default: i(() => [
                t(
                  e(n),
                  {
                    value: e(s).shipping_flat_rate.shipping_address.postcode,
                    'onUpdate:value':
                      a[3] ||
                      (a[3] = p =>
                        (e(s).shipping_flat_rate.shipping_address.postcode = p))
                  },
                  null,
                  8,
                  ['value']
                )
              ]),
              _: 1
            },
            8,
            ['label']
          ),
          t(
            r,
            { label: e(l)('shippingAddress1') },
            {
              default: i(() => [
                t(
                  e(n),
                  {
                    value: e(s).shipping_flat_rate.shipping_address.address1,
                    'onUpdate:value':
                      a[4] ||
                      (a[4] = p =>
                        (e(s).shipping_flat_rate.shipping_address.address1 = p))
                  },
                  null,
                  8,
                  ['value']
                )
              ]),
              _: 1
            },
            8,
            ['label']
          ),
          t(
            r,
            { label: e(l)('shippingAddress2') },
            {
              default: i(() => [
                t(
                  e(n),
                  {
                    value: e(s).shipping_flat_rate.shipping_address.address2,
                    'onUpdate:value':
                      a[5] ||
                      (a[5] = p =>
                        (e(s).shipping_flat_rate.shipping_address.address2 = p))
                  },
                  null,
                  8,
                  ['value']
                )
              ]),
              _: 1
            },
            8,
            ['label']
          )
        ],
        64
      )
    )
  }
})
export { $ as default }

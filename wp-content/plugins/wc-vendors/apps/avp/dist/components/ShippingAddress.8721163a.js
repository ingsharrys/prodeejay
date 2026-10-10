import {
  d as o,
  L as _,
  o as u,
  Q as g,
  c as t,
  w as i,
  u as e,
  F as f
} from '../common/vendor.0c3875d9.js'
import { B as m, j as l } from '../main.2aa0af6a.js'
import { _ as h, F as n, a as v } from '../common/DynamicControl.c9fef987.js'
import { a as r } from '../common/index.53baf982.js'
import '../common/antd.16e70afa.js'
import '../common/VendorStore.5e4919cf.js'
import '../common/initDefaultProps.6051a836.js'
import '../common/index.c802b557.js'
import '../common/_plugin-vue_export-helper.c27b6911.js'
import '../common/index.5d97157e.js'
import '../common/VendorEdit.465a2363.js'
import '../common/index.1eb2a6c7.js'
import '../common/hasIn.0c866627.js'
const R = o({
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
            n,
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
            n,
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
            n,
            { label: e(l)('shippingCity') },
            {
              default: i(() => [
                t(
                  e(r),
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
            n,
            { label: e(l)('shippingPostcode') },
            {
              default: i(() => [
                t(
                  e(r),
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
            n,
            { label: e(l)('shippingAddress1') },
            {
              default: i(() => [
                t(
                  e(r),
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
            n,
            { label: e(l)('shippingAddress2') },
            {
              default: i(() => [
                t(
                  e(r),
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
export { R as default }

import {
  d as D,
  W as $,
  K as M,
  o as a,
  N as i,
  u as e,
  F as c,
  O as r,
  Q as n,
  Z as _,
  a as v,
  w as u,
  Y as l,
  a0 as f,
  a5 as h,
  c as k,
  R as V
} from '../../common/vendor.84fc1123.js'
import { c as o } from '../../main.491ba5c0.js'
import { u as N, S as B } from '../../common/VendorStore.d737faa9.js'
import { q as E, r as H } from '../../common/antd.7f3c63f7.js'
import { T as w } from '../../common/index.4e3cad7b.js'
import { P } from '../../common/index.ebb33149.js'
import { _ as q } from '../../common/_plugin-vue_export-helper.c27b6911.js'
import '../../common/initDefaultProps.71991ecc.js'
import '../../common/ActionButton.265b9cc4.js'
const j = ['innerHTML'],
  F = ['innerHTML'],
  U = ['href'],
  z = ['href'],
  A = ['title'],
  K = { href: '#', type: 'primary', class: 'vendor-action-edit' },
  Q = ['href'],
  W = ['href'],
  Y = { href: '#', type: 'primary', class: 'vendor-action-reactive' },
  Z = D({
    __name: 'VendorTableCell',
    props: {
      record: { type: Object, required: !0 },
      column: { type: Object, required: !0 }
    },
    emits: ['showVendorDetails', 'approve', 'deny'],
    setup(C, { emit: y }) {
      const T = C,
        b = N(),
        I = window.wcv_avp.view_products_url,
        L = window.wcv_avp.view_orders_url,
        { record: t, column: p } = $(T),
        S = async (d, s) => {
          await b.setVendorStatus(d, s)
        },
        O = d => {
          y('approve', d)
        },
        R = d => {
          y('deny', d)
        },
        g = d => {
          y('showVendorDetails', d)
        }
      return (d, s) => {
        const x = M('RouterLink')
        return (
          a(),
          i(
            c,
            null,
            [
              e(p).dataIndex === 'commission_due'
                ? (a(),
                  i(
                    'span',
                    { key: 0, innerHTML: e(t).commission_due.formatted },
                    null,
                    8,
                    j
                  ))
                : e(p).dataIndex === 'commission_rate'
                ? (a(),
                  i(
                    c,
                    { key: 1 },
                    [
                      r(
                        'span',
                        { innerHTML: e(t).commission_rate.formatted },
                        null,
                        8,
                        F
                      ),
                      r(
                        'span',
                        null,
                        ' (' + n(e(t).commission_rate.level) + ') ',
                        1
                      )
                    ],
                    64
                  ))
                : e(p).dataIndex === 'registered_date'
                ? (a(), i(c, { key: 2 }, [_(n(e(t).registered_date), 1)], 64))
                : e(p).dataIndex === 'status'
                ? (a(),
                  i(
                    c,
                    { key: 3 },
                    [
                      e(t).status.value === 'active'
                        ? (a(),
                          v(
                            e(w),
                            { key: 0, color: 'green' },
                            {
                              default: u(() => [_(n(e(o)('active')), 1)]),
                              _: 1
                            }
                          ))
                        : e(t).status.value === 'inactive'
                        ? (a(),
                          v(
                            e(w),
                            { key: 1 },
                            {
                              default: u(() => [_(n(e(o)('inactive')), 1)]),
                              _: 1
                            }
                          ))
                        : e(t).status.value === 'pending'
                        ? (a(),
                          v(
                            e(w),
                            { key: 2, color: 'orange' },
                            {
                              default: u(() => [_(n(e(o)('pending')), 1)]),
                              _: 1
                            }
                          ))
                        : l('', !0)
                    ],
                    64
                  ))
                : e(p).dataIndex === 'displayname'
                ? (a(),
                  i(
                    'a',
                    {
                      key: 4,
                      href: `/wp-admin/user-edit.php?user_id=${e(t).id}`,
                      target: "'_blank'"
                    },
                    n(e(t).displayname),
                    9,
                    U
                  ))
                : e(p).dataIndex === 'shopname'
                ? (a(),
                  i(
                    c,
                    { key: 5 },
                    [
                      f(
                        r(
                          'a',
                          { href: e(t).shop_link, target: "'_blank'" },
                          n(e(t).shopname),
                          9,
                          z
                        ),
                        [
                          [
                            h,
                            e(t).shopname !== '' &&
                              e(t).status.value !== 'inactive'
                          ]
                        ]
                      ),
                      f(r('span', null, '(' + n(e(o)('na')) + ')', 513), [
                        [h, e(t).shopname === '']
                      ]),
                      f(r('span', null, n(e(t).shopname), 513), [
                        [h, e(t).status.value === 'inactive']
                      ]),
                      e(t).status.value === 'pending'
                        ? (a(),
                          i(
                            'a',
                            {
                              key: 0,
                              href: '#',
                              type: 'primary',
                              class: 'tc-vendor-eye-icon',
                              title: e(o)('reviewVendor'),
                              onClick: s[0] || (s[0] = m => g(e(t).id))
                            },
                            [k(e(E))],
                            8,
                            A
                          ))
                        : l('', !0),
                      e(t).status.value !== 'inactive' &&
                      e(t).status.value !== 'pending'
                        ? (a(),
                          v(
                            x,
                            {
                              key: 1,
                              to: {
                                name: 'vendor-edit',
                                params: { id: e(t).id }
                              },
                              class: 'tc-shop-name-edit',
                              title: e(o)('edit')
                            },
                            { default: u(() => [k(e(H))]), _: 1 },
                            8,
                            ['to', 'title']
                          ))
                        : l('', !0)
                    ],
                    64
                  ))
                : l('', !0),
              e(p).dataIndex === 'action'
                ? (a(),
                  v(
                    e(B),
                    { key: 6, align: 'center', size: 'small' },
                    {
                      default: u(() => [
                        e(t).status.value === 'pending'
                          ? (a(),
                            i(
                              c,
                              { key: 0 },
                              [
                                r(
                                  'a',
                                  {
                                    href: '#',
                                    type: 'primary',
                                    class: 'vendor-action-review',
                                    onClick: s[1] || (s[1] = m => g(e(t).id))
                                  },
                                  n(e(o)('review')),
                                  1
                                ),
                                r(
                                  'a',
                                  {
                                    href: '#',
                                    type: 'primary',
                                    class: 'vendor-action-approve',
                                    onClick:
                                      s[2] ||
                                      (s[2] = V(m => O(e(t).id), ['prevent']))
                                  },
                                  n(e(o)('approve')),
                                  1
                                ),
                                r(
                                  'a',
                                  {
                                    href: '#',
                                    type: 'danger',
                                    class: 'vendor-action-deny',
                                    onClick:
                                      s[3] ||
                                      (s[3] = V(m => R(e(t).id), ['prevent']))
                                  },
                                  n(e(o)('deny')),
                                  1
                                )
                              ],
                              64
                            ))
                          : l('', !0),
                        e(t).status.value === 'active'
                          ? (a(),
                            i(
                              c,
                              { key: 1 },
                              [
                                k(
                                  x,
                                  {
                                    type: 'primary',
                                    to: {
                                      name: 'vendor-edit',
                                      params: { id: e(t).id }
                                    }
                                  },
                                  {
                                    default: u(() => [
                                      r('a', K, n(e(o)('edit')), 1)
                                    ]),
                                    _: 1
                                  },
                                  8,
                                  ['to']
                                ),
                                r(
                                  'a',
                                  { href: e(I) + e(t).id, type: 'primary' },
                                  n(e(o)('viewProducts')),
                                  9,
                                  Q
                                ),
                                r(
                                  'a',
                                  { href: e(L) + e(t).id, type: 'primary' },
                                  n(e(o)('viewOrders')),
                                  9,
                                  W
                                )
                              ],
                              64
                            ))
                          : l('', !0),
                        e(t).status.value === 'inactive'
                          ? (a(),
                            v(
                              e(P),
                              {
                                key: 2,
                                title: e(o)('confirmReactive'),
                                'ok-text': e(o)('yes'),
                                'cancel-text': e(o)('no'),
                                onConfirm:
                                  s[4] || (s[4] = m => S(e(t).id, 'activate'))
                              },
                              {
                                default: u(() => [
                                  r('a', Y, n(e(o)('reactive')), 1)
                                ]),
                                _: 1
                              },
                              8,
                              ['title', 'ok-text', 'cancel-text']
                            ))
                          : l('', !0)
                      ]),
                      _: 1
                    }
                  ))
                : l('', !0)
            ],
            64
          )
        )
      }
    }
  })
const re = q(Z, [['__scopeId', 'data-v-df24bf96']])
export { re as default }

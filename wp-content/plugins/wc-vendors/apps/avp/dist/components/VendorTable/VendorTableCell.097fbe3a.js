import {
  d as $,
  L as M,
  Y as E,
  K as H,
  o as a,
  Q as r,
  u as e,
  F as _,
  R as c,
  S as s,
  U as d,
  a as f,
  w as o,
  W as p,
  a1 as g,
  a5 as x,
  c as l,
  _ as b,
  a6 as N,
  a7 as P
} from '../../common/vendor.0c3875d9.js'
import { j as n } from '../../main.2aa0af6a.js'
import { u as j, B as m, S as q } from '../../common/VendorStore.5e4919cf.js'
import { q as U, r as F } from '../../common/antd.16e70afa.js'
import { T as V } from '../../common/index.c802b557.js'
import { P as A } from '../../common/index.1eb2a6c7.js'
import { _ as K } from '../../common/_plugin-vue_export-helper.c27b6911.js'
import '../../common/initDefaultProps.6051a836.js'
const h = y => (N('data-v-6a1f10ce'), (y = y()), P(), y),
  Q = ['innerHTML'],
  W = ['innerHTML'],
  Y = { class: 'commission-level' },
  G = ['href'],
  J = ['href'],
  X = ['title'],
  Z = h(() => c('span', { class: 'action-divider' }, null, -1)),
  ee = h(() => c('span', { class: 'action-divider' }, null, -1)),
  te = h(() => c('span', { class: 'action-divider' }, null, -1)),
  ae = h(() => c('span', { class: 'action-divider' }, null, -1)),
  se = $({
    __name: 'VendorTableCell',
    props: {
      record: { type: Object, required: !0 },
      column: { type: Object, required: !0 }
    },
    emits: ['showVendorDetails', 'approve', 'deny'],
    setup(y, { emit: w }) {
      const T = y,
        I = j(),
        { selectedVendorIds: L } = M(I),
        z = window.wcv_avp.view_products_url,
        R = window.wcv_avp.view_orders_url,
        { record: t, column: v } = E(T),
        B = async (u, i) => {
          await I.setVendorStatus(u, i)
        },
        D = u => {
          w('approve', u)
        },
        O = u => {
          w('deny', u)
        },
        C = u => {
          w('showVendorDetails', u)
        }
      return (u, i) => {
        const S = H('RouterLink')
        return (
          a(),
          r(
            _,
            null,
            [
              e(v).dataIndex === 'commission_due'
                ? (a(),
                  r(
                    'span',
                    { key: 0, innerHTML: e(t).commission_due.formatted },
                    null,
                    8,
                    Q
                  ))
                : e(v).dataIndex === 'commission_rate'
                ? (a(),
                  r(
                    _,
                    { key: 1 },
                    [
                      c(
                        'span',
                        { innerHTML: e(t).commission_rate.formatted },
                        null,
                        8,
                        W
                      ),
                      c(
                        'span',
                        Y,
                        ' (' + s(e(t).commission_rate.level) + ') ',
                        1
                      )
                    ],
                    64
                  ))
                : e(v).dataIndex === 'registered_date'
                ? (a(), r(_, { key: 2 }, [d(s(e(t).registered_date), 1)], 64))
                : e(v).dataIndex === 'status'
                ? (a(),
                  r(
                    _,
                    { key: 3 },
                    [
                      e(t).status.value === 'active'
                        ? (a(),
                          f(
                            e(V),
                            { key: 0, color: 'green' },
                            {
                              default: o(() => [d(s(e(n)('active')), 1)]),
                              _: 1
                            }
                          ))
                        : e(t).status.value === 'inactive'
                        ? (a(),
                          f(
                            e(V),
                            { key: 1 },
                            {
                              default: o(() => [d(s(e(n)('inactive')), 1)]),
                              _: 1
                            }
                          ))
                        : e(t).status.value === 'pending'
                        ? (a(),
                          f(
                            e(V),
                            { key: 2, color: 'orange' },
                            {
                              default: o(() => [d(s(e(n)('pending')), 1)]),
                              _: 1
                            }
                          ))
                        : p('', !0)
                    ],
                    64
                  ))
                : e(v).dataIndex === 'displayname'
                ? (a(),
                  r(
                    'a',
                    {
                      key: 4,
                      href: `/wp-admin/user-edit.php?user_id=${e(t).id}`,
                      target: "'_blank'"
                    },
                    s(e(t).displayname),
                    9,
                    G
                  ))
                : e(v).dataIndex === 'shopname'
                ? (a(),
                  r(
                    _,
                    { key: 5 },
                    [
                      g(
                        c(
                          'a',
                          { href: e(t).shop_link, target: "'_blank'" },
                          s(e(t).shopname),
                          9,
                          J
                        ),
                        [
                          [
                            x,
                            e(t).shopname !== '' &&
                              e(t).status.value !== 'inactive'
                          ]
                        ]
                      ),
                      g(c('span', null, '(' + s(e(n)('na')) + ')', 513), [
                        [x, e(t).shopname === '']
                      ]),
                      g(c('span', null, s(e(t).shopname), 513), [
                        [x, e(t).status.value === 'inactive']
                      ]),
                      e(t).status.value === 'pending'
                        ? (a(),
                          r(
                            'button',
                            {
                              key: 0,
                              type: 'button',
                              class: 'row-icon-btn tc-vendor-eye-icon',
                              title: e(n)('reviewVendor'),
                              onClick: i[0] || (i[0] = k => C(e(t).id))
                            },
                            [l(e(U))],
                            8,
                            X
                          ))
                        : p('', !0),
                      e(t).status.value !== 'inactive' &&
                      e(t).status.value !== 'pending'
                        ? (a(),
                          f(
                            S,
                            {
                              key: 1,
                              to: {
                                name: 'vendor-edit',
                                params: { id: e(t).id }
                              },
                              class: 'row-icon-btn tc-shop-name-edit',
                              title: e(n)('edit')
                            },
                            { default: o(() => [l(e(F))]), _: 1 },
                            8,
                            ['to', 'title']
                          ))
                        : p('', !0)
                    ],
                    64
                  ))
                : p('', !0),
              e(v).dataIndex === 'action' && !e(L).includes(e(t).id)
                ? (a(),
                  f(
                    e(q),
                    { key: 6, align: 'center', size: 4 },
                    {
                      default: o(() => [
                        e(t).status.value === 'pending'
                          ? (a(),
                            r(
                              _,
                              { key: 0 },
                              [
                                l(
                                  e(m),
                                  {
                                    type: 'link',
                                    size: 'small',
                                    class: 'vendor-action-review',
                                    onClick: i[1] || (i[1] = k => C(e(t).id))
                                  },
                                  {
                                    default: o(() => [d(s(e(n)('review')), 1)]),
                                    _: 1
                                  }
                                ),
                                Z,
                                l(
                                  e(m),
                                  {
                                    type: 'link',
                                    size: 'small',
                                    class: 'vendor-action-approve',
                                    onClick:
                                      i[2] ||
                                      (i[2] = b(k => D(e(t).id), ['prevent']))
                                  },
                                  {
                                    default: o(() => [
                                      d(s(e(n)('approve')), 1)
                                    ]),
                                    _: 1
                                  }
                                ),
                                ee,
                                l(
                                  e(m),
                                  {
                                    type: 'link',
                                    size: 'small',
                                    danger: '',
                                    class: 'vendor-action-deny',
                                    onClick:
                                      i[3] ||
                                      (i[3] = b(k => O(e(t).id), ['prevent']))
                                  },
                                  {
                                    default: o(() => [d(s(e(n)('deny')), 1)]),
                                    _: 1
                                  }
                                )
                              ],
                              64
                            ))
                          : p('', !0),
                        e(t).status.value === 'active'
                          ? (a(),
                            r(
                              _,
                              { key: 1 },
                              [
                                l(
                                  S,
                                  {
                                    to: {
                                      name: 'vendor-edit',
                                      params: { id: e(t).id }
                                    }
                                  },
                                  {
                                    default: o(() => [
                                      l(
                                        e(m),
                                        {
                                          type: 'link',
                                          size: 'small',
                                          class: 'vendor-action-edit'
                                        },
                                        {
                                          default: o(() => [
                                            d(s(e(n)('edit')), 1)
                                          ]),
                                          _: 1
                                        }
                                      )
                                    ]),
                                    _: 1
                                  },
                                  8,
                                  ['to']
                                ),
                                te,
                                l(
                                  e(m),
                                  {
                                    type: 'link',
                                    size: 'small',
                                    href: e(z) + e(t).id
                                  },
                                  {
                                    default: o(() => [
                                      d(s(e(n)('viewProducts')), 1)
                                    ]),
                                    _: 1
                                  },
                                  8,
                                  ['href']
                                ),
                                ae,
                                l(
                                  e(m),
                                  {
                                    type: 'link',
                                    size: 'small',
                                    href: e(R) + e(t).id
                                  },
                                  {
                                    default: o(() => [
                                      d(s(e(n)('viewOrders')), 1)
                                    ]),
                                    _: 1
                                  },
                                  8,
                                  ['href']
                                )
                              ],
                              64
                            ))
                          : p('', !0),
                        e(t).status.value === 'inactive'
                          ? (a(),
                            f(
                              e(A),
                              {
                                key: 2,
                                title: e(n)('confirmReactive'),
                                'ok-text': e(n)('yes'),
                                'cancel-text': e(n)('no'),
                                onConfirm:
                                  i[4] || (i[4] = k => B(e(t).id, 'activate'))
                              },
                              {
                                default: o(() => [
                                  l(
                                    e(m),
                                    {
                                      type: 'link',
                                      size: 'small',
                                      class: 'vendor-action-reactive'
                                    },
                                    {
                                      default: o(() => [
                                        d(s(e(n)('reactive')), 1)
                                      ]),
                                      _: 1
                                    }
                                  )
                                ]),
                                _: 1
                              },
                              8,
                              ['title', 'ok-text', 'cancel-text']
                            ))
                          : p('', !0)
                      ]),
                      _: 1
                    }
                  ))
                : p('', !0)
            ],
            64
          )
        )
      }
    }
  })
const pe = K(se, [['__scopeId', 'data-v-6a1f10ce']])
export { pe as default }

import {
  c as n,
  f as de,
  r as Y,
  F as N,
  d as Z,
  m as ce,
  l as ue,
  p as me,
  a4 as ne,
  e as fe,
  o as f,
  a as $,
  w as d,
  O as j,
  u as l,
  N as h,
  Z as v,
  Q as p,
  Y as G,
  _ as pe
} from '../common/vendor.84fc1123.js'
import {
  R as be,
  ad as ye,
  X as ve,
  _ as S,
  g as ge,
  m as Se,
  i as he,
  r as $e,
  P as O,
  a as xe,
  b as ae,
  f as Ce,
  v as De,
  c as o
} from '../main.491ba5c0.js'
import { e as Ie, S as we, B as U } from '../common/VendorStore.d737faa9.js'
import { S as _e } from '../common/index.e3da6296.js'
import { u as Be, r as oe } from '../common/responsiveObserve.eb3c0da1.js'
import { M as Me } from '../common/index.7f1c23e8.js'
import { T as q } from '../common/index.4e3cad7b.js'
import { I as Le } from '../common/index.380800ce.js'
import { _ as Pe } from '../common/_plugin-vue_export-helper.c27b6911.js'
import '../common/antd.7f3c63f7.js'
import '../common/initDefaultProps.71991ecc.js'
import '../common/ActionButton.265b9cc4.js'
function A(e) {
  return e != null
}
const Te = e => {
    const {
        itemPrefixCls: t,
        component: a,
        span: i,
        labelStyle: s,
        contentStyle: c,
        bordered: b,
        label: r,
        content: u,
        colon: m
      } = e,
      y = a
    return b
      ? n(
          y,
          {
            class: [{ [`${t}-item-label`]: A(r), [`${t}-item-content`]: A(u) }],
            colSpan: i
          },
          {
            default: () => [
              A(r) && n('span', { style: s }, [r]),
              A(u) && n('span', { style: c }, [u])
            ]
          }
        )
      : n(
          y,
          { class: [`${t}-item`], colSpan: i },
          {
            default: () => [
              n('div', { class: `${t}-item-container` }, [
                (r || r === 0) &&
                  n(
                    'span',
                    {
                      class: [
                        `${t}-item-label`,
                        { [`${t}-item-no-colon`]: !m }
                      ],
                      style: s
                    },
                    [r]
                  ),
                (u || u === 0) &&
                  n('span', { class: `${t}-item-content`, style: c }, [u])
              ])
            ]
          }
        )
  },
  Q = Te,
  je = e => {
    const t = (m, y, E) => {
        let { colon: x, prefixCls: P, bordered: D } = y,
          {
            component: I,
            type: z,
            showLabel: H,
            showContent: R,
            labelStyle: w,
            contentStyle: _
          } = E
        return m.map((C, T) => {
          var B, M
          const V = C.props || {},
            {
              prefixCls: W = P,
              span: J = 1,
              labelStyle: K = V['label-style'],
              contentStyle: ee = V['content-style'],
              label: te = (M =
                (B = C.children) === null || B === void 0
                  ? void 0
                  : B.label) === null || M === void 0
                ? void 0
                : M.call(B)
            } = V,
            le = be(C),
            k = ye(C),
            X = ve(C),
            { key: F } = C
          return typeof I == 'string'
            ? n(
                Q,
                {
                  key: `${z}-${String(F) || T}`,
                  class: k,
                  style: X,
                  labelStyle: S(S({}, w), K),
                  contentStyle: S(S({}, _), ee),
                  span: J,
                  colon: x,
                  component: I,
                  itemPrefixCls: W,
                  bordered: D,
                  label: H ? te : null,
                  content: R ? le : null
                },
                null
              )
            : [
                n(
                  Q,
                  {
                    key: `label-${String(F) || T}`,
                    class: k,
                    style: S(S(S({}, w), X), K),
                    span: 1,
                    colon: x,
                    component: I[0],
                    itemPrefixCls: W,
                    bordered: D,
                    label: te
                  },
                  null
                ),
                n(
                  Q,
                  {
                    key: `content-${String(F) || T}`,
                    class: k,
                    style: S(S(S({}, _), X), ee),
                    span: J * 2 - 1,
                    component: I[1],
                    itemPrefixCls: W,
                    bordered: D,
                    content: le
                  },
                  null
                )
              ]
        })
      },
      { prefixCls: a, vertical: i, row: s, index: c, bordered: b } = e,
      { labelStyle: r, contentStyle: u } = de(re, {
        labelStyle: Y({}),
        contentStyle: Y({})
      })
    return i
      ? n(N, null, [
          n('tr', { key: `label-${c}`, class: `${a}-row` }, [
            t(s, e, {
              component: 'th',
              type: 'label',
              showLabel: !0,
              labelStyle: r.value,
              contentStyle: u.value
            })
          ]),
          n('tr', { key: `content-${c}`, class: `${a}-row` }, [
            t(s, e, {
              component: 'td',
              type: 'content',
              showContent: !0,
              labelStyle: r.value,
              contentStyle: u.value
            })
          ])
        ])
      : n('tr', { key: c, class: `${a}-row` }, [
          t(s, e, {
            component: b ? ['th', 'td'] : 'td',
            type: 'item',
            showLabel: !0,
            showContent: !0,
            labelStyle: r.value,
            contentStyle: u.value
          })
        ])
  },
  Ne = je,
  ze = e => {
    const {
      componentCls: t,
      descriptionsSmallPadding: a,
      descriptionsDefaultPadding: i,
      descriptionsMiddlePadding: s,
      descriptionsBg: c
    } = e
    return {
      [`&${t}-bordered`]: {
        [`${t}-view`]: {
          border: `${e.lineWidth}px ${e.lineType} ${e.colorSplit}`,
          '> table': { tableLayout: 'auto', borderCollapse: 'collapse' }
        },
        [`${t}-item-label, ${t}-item-content`]: {
          padding: i,
          borderInlineEnd: `${e.lineWidth}px ${e.lineType} ${e.colorSplit}`,
          '&:last-child': { borderInlineEnd: 'none' }
        },
        [`${t}-item-label`]: {
          backgroundColor: c,
          '&::after': { display: 'none' }
        },
        [`${t}-row`]: {
          borderBottom: `${e.lineWidth}px ${e.lineType} ${e.colorSplit}`,
          '&:last-child': { borderBottom: 'none' }
        },
        [`&${t}-middle`]: {
          [`${t}-item-label, ${t}-item-content`]: { padding: s }
        },
        [`&${t}-small`]: {
          [`${t}-item-label, ${t}-item-content`]: { padding: a }
        }
      }
    }
  },
  Ae = e => {
    const {
      componentCls: t,
      descriptionsExtraColor: a,
      descriptionItemPaddingBottom: i,
      descriptionsItemLabelColonMarginRight: s,
      descriptionsItemLabelColonMarginLeft: c,
      descriptionsTitleMarginBottom: b
    } = e
    return {
      [t]: S(S(S({}, $e(e)), ze(e)), {
        '&-rtl': { direction: 'rtl' },
        [`${t}-header`]: {
          display: 'flex',
          alignItems: 'center',
          marginBottom: b
        },
        [`${t}-title`]: S(S({}, he), {
          flex: 'auto',
          color: e.colorText,
          fontWeight: e.fontWeightStrong,
          fontSize: e.fontSizeLG,
          lineHeight: e.lineHeightLG
        }),
        [`${t}-extra`]: {
          marginInlineStart: 'auto',
          color: a,
          fontSize: e.fontSize
        },
        [`${t}-view`]: {
          width: '100%',
          borderRadius: e.borderRadiusLG,
          table: { width: '100%', tableLayout: 'fixed' }
        },
        [`${t}-row`]: {
          '> th, > td': { paddingBottom: i },
          '&:last-child': { borderBottom: 'none' }
        },
        [`${t}-item-label`]: {
          color: e.colorText,
          fontWeight: 'normal',
          fontSize: e.fontSize,
          lineHeight: e.lineHeight,
          textAlign: 'start',
          '&::after': {
            content: '":"',
            position: 'relative',
            top: -0.5,
            marginInline: `${c}px ${s}px`
          },
          [`&${t}-item-no-colon::after`]: { content: '""' }
        },
        [`${t}-item-no-label`]: { '&::after': { margin: 0, content: '""' } },
        [`${t}-item-content`]: {
          display: 'table-cell',
          flex: 1,
          color: e.colorText,
          fontSize: e.fontSize,
          lineHeight: e.lineHeight,
          wordBreak: 'break-word',
          overflowWrap: 'break-word'
        },
        [`${t}-item`]: {
          paddingBottom: 0,
          verticalAlign: 'top',
          '&-container': {
            display: 'flex',
            [`${t}-item-label`]: {
              display: 'inline-flex',
              alignItems: 'baseline'
            },
            [`${t}-item-content`]: {
              display: 'inline-flex',
              alignItems: 'baseline'
            }
          }
        },
        '&-middle': {
          [`${t}-row`]: { '> th, > td': { paddingBottom: e.paddingSM } }
        },
        '&-small': {
          [`${t}-row`]: { '> th, > td': { paddingBottom: e.paddingXS } }
        }
      })
    }
  },
  Oe = ge('Descriptions', e => {
    const t = e.colorFillAlter,
      a = e.fontSizeSM * e.lineHeightSM,
      i = e.colorText,
      s = `${e.paddingXS}px ${e.padding}px`,
      c = `${e.padding}px ${e.paddingLG}px`,
      b = `${e.paddingSM}px ${e.paddingLG}px`,
      r = e.padding,
      u = e.marginXS,
      m = e.marginXXS / 2,
      y = Se(e, {
        descriptionsBg: t,
        descriptionsTitleMarginBottom: a,
        descriptionsExtraColor: i,
        descriptionItemPaddingBottom: r,
        descriptionsSmallPadding: s,
        descriptionsDefaultPadding: c,
        descriptionsMiddlePadding: b,
        descriptionsItemLabelColonMarginRight: u,
        descriptionsItemLabelColonMarginLeft: m
      })
    return [Ae(y)]
  })
O.any
const Ee = () => ({
    prefixCls: String,
    label: O.any,
    labelStyle: { type: Object, default: void 0 },
    contentStyle: { type: Object, default: void 0 },
    span: { type: Number, default: 1 }
  }),
  He = Z({
    compatConfig: { MODE: 3 },
    name: 'ADescriptionsItem',
    props: Ee(),
    setup(e, t) {
      let { slots: a } = t
      return () => {
        var i
        return (i = a.default) === null || i === void 0 ? void 0 : i.call(a)
      }
    }
  }),
  se = { xxxl: 3, xxl: 3, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }
function Re(e, t) {
  if (typeof e == 'number') return e
  if (typeof e == 'object')
    for (let a = 0; a < oe.length; a++) {
      const i = oe[a]
      if (t[i] && e[i] !== void 0) return e[i] || se[i]
    }
  return 3
}
function ie(e, t, a) {
  let i = e
  return (a === void 0 || a > t) && ((i = Ie(e, { span: t })), De()), i
}
function Ve(e, t) {
  const a = Ce(e),
    i = []
  let s = [],
    c = t
  return (
    a.forEach((b, r) => {
      var u
      const m = (u = b.props) === null || u === void 0 ? void 0 : u.span,
        y = m || 1
      if (r === a.length - 1) {
        s.push(ie(b, c, m)), i.push(s)
        return
      }
      y < c
        ? ((c -= y), s.push(b))
        : (s.push(ie(b, c, y)), i.push(s), (c = t), (s = []))
    }),
    i
  )
}
const We = () => ({
    prefixCls: String,
    bordered: { type: Boolean, default: void 0 },
    size: { type: String, default: 'default' },
    title: O.any,
    extra: O.any,
    column: { type: [Number, Object], default: () => se },
    layout: String,
    colon: { type: Boolean, default: void 0 },
    labelStyle: { type: Object, default: void 0 },
    contentStyle: { type: Object, default: void 0 }
  }),
  re = Symbol('descriptionsContext'),
  L = Z({
    compatConfig: { MODE: 3 },
    name: 'ADescriptions',
    inheritAttrs: !1,
    props: We(),
    slots: Object,
    Item: He,
    setup(e, t) {
      let { slots: a, attrs: i } = t
      const { prefixCls: s, direction: c } = xe('descriptions', e)
      let b
      const r = Y({}),
        [u, m] = Oe(s),
        y = Be()
      ce(() => {
        b = y.value.subscribe(x => {
          typeof e.column == 'object' && (r.value = x)
        })
      }),
        ue(() => {
          y.value.unsubscribe(b)
        }),
        me(re, {
          labelStyle: ne(e, 'labelStyle'),
          contentStyle: ne(e, 'contentStyle')
        })
      const E = fe(() => Re(e.column, r.value))
      return () => {
        var x, P, D
        const {
            size: I,
            bordered: z = !1,
            layout: H = 'horizontal',
            colon: R = !0,
            title: w = (x = a.title) === null || x === void 0
              ? void 0
              : x.call(a),
            extra: _ = (P = a.extra) === null || P === void 0
              ? void 0
              : P.call(a)
          } = e,
          C = (D = a.default) === null || D === void 0 ? void 0 : D.call(a),
          T = Ve(C, E.value)
        return u(
          n(
            'div',
            ae(
              ae({}, i),
              {},
              {
                class: [
                  s.value,
                  {
                    [`${s.value}-${I}`]: I !== 'default',
                    [`${s.value}-bordered`]: !!z,
                    [`${s.value}-rtl`]: c.value === 'rtl'
                  },
                  i.class,
                  m.value
                ]
              }
            ),
            [
              (w || _) &&
                n('div', { class: `${s.value}-header` }, [
                  w && n('div', { class: `${s.value}-title` }, [w]),
                  _ && n('div', { class: `${s.value}-extra` }, [_])
                ]),
              n('div', { class: `${s.value}-view` }, [
                n('table', null, [
                  n('tbody', null, [
                    T.map((B, M) =>
                      n(
                        Ne,
                        {
                          key: M,
                          index: M,
                          colon: R,
                          prefixCls: s.value,
                          vertical: H === 'vertical',
                          bordered: z,
                          row: B
                        },
                        null
                      )
                    )
                  ])
                ])
              ])
            ]
          )
        )
      }
    }
  })
L.install = function(e) {
  return e.component(L.name, L), e.component(L.Item.name, L.Item), e
}
const g = L,
  ke = { key: 0, class: 'vendor-detail-loading' },
  Xe = { key: 1, class: 'vendor-detail-content' },
  Fe = ['href'],
  Ge = { key: 1 },
  Ue = ['href'],
  qe = { key: 1 },
  Qe = ['innerHTML'],
  Ye = ['innerHTML'],
  Ze = { key: 1 },
  Je = { key: 2, class: 'vendor-detail-error' },
  Ke = { class: 'modal-footer' },
  et = Z({
    __name: 'VendorDetailModal',
    props: {
      visible: { type: Boolean, required: !0 },
      vendorDetails: { type: Object, default: null },
      loading: { type: Boolean, default: !1 }
    },
    emits: ['close', 'approve', 'deny'],
    setup(e, { emit: t }) {
      const a = e,
        i = () => {
          t('close')
        },
        s = r => {
          r && r.preventDefault(),
            a.vendorDetails && t('approve', a.vendorDetails.id)
        },
        c = r => {
          r && r.preventDefault(),
            a.vendorDetails && t('deny', a.vendorDetails.id)
        },
        b = r => {
          if (!r) return o('na')
          const u = [
            r.address1,
            r.address2,
            r.city,
            r.state,
            r.country,
            r.postcode
          ].filter(m => m && m.trim() !== '')
          return u.length > 0 ? u.join(', ') : o('na')
        }
      return (r, u) => (
        f(),
        $(
          l(Me),
          {
            open: e.visible,
            title: l(o)('vendorDetails'),
            width: '800px',
            'destroy-on-close': !0,
            onCancel: i
          },
          {
            footer: d(() => [
              j('div', Ke, [
                n(l(we), null, {
                  default: d(() => [
                    e.vendorDetails &&
                    e.vendorDetails.status.value === 'pending'
                      ? (f(),
                        h(
                          N,
                          { key: 0 },
                          [
                            n(
                              l(U),
                              {
                                type: 'primary',
                                class: 'approve-button',
                                onClick: s
                              },
                              {
                                default: d(() => [v(p(l(o)('approve')), 1)]),
                                _: 1
                              }
                            ),
                            n(
                              l(U),
                              { danger: '', class: 'deny-button', onClick: c },
                              {
                                default: d(() => [v(p(l(o)('deny')), 1)]),
                                _: 1
                              }
                            )
                          ],
                          64
                        ))
                      : G('', !0),
                    n(
                      l(U),
                      { onClick: i },
                      { default: d(() => [v(p(l(o)('close')), 1)]), _: 1 }
                    )
                  ]),
                  _: 1
                })
              ])
            ]),
            default: d(() => [
              e.loading
                ? (f(),
                  h('div', ke, [
                    n(l(_e), { size: 'large' }),
                    j('p', null, p(l(o)('loading')) + '...', 1)
                  ]))
                : e.vendorDetails
                ? (f(),
                  h('div', Xe, [
                    n(
                      l(g),
                      { column: 1, bordered: '' },
                      {
                        default: d(() => [
                          n(
                            l(g).Item,
                            { label: l(o)('shopName') },
                            {
                              default: d(() => [
                                v(p(e.vendorDetails.shopname || l(o)('na')), 1)
                              ]),
                              _: 1
                            },
                            8,
                            ['label']
                          ),
                          n(
                            l(g).Item,
                            { label: l(o)('owner') },
                            {
                              default: d(() => [
                                v(
                                  p(e.vendorDetails.displayname || l(o)('na')),
                                  1
                                )
                              ]),
                              _: 1
                            },
                            8,
                            ['label']
                          ),
                          n(
                            l(g).Item,
                            { label: l(o)('firstName') },
                            {
                              default: d(() => [
                                v(
                                  p(e.vendorDetails.first_name || l(o)('na')),
                                  1
                                )
                              ]),
                              _: 1
                            },
                            8,
                            ['label']
                          ),
                          n(
                            l(g).Item,
                            { label: l(o)('lastName') },
                            {
                              default: d(() => [
                                v(p(e.vendorDetails.last_name || l(o)('na')), 1)
                              ]),
                              _: 1
                            },
                            8,
                            ['label']
                          ),
                          n(
                            l(g).Item,
                            { label: l(o)('email') },
                            {
                              default: d(() => [
                                e.vendorDetails.email
                                  ? (f(),
                                    h(
                                      'a',
                                      {
                                        key: 0,
                                        href: `mailto:${e.vendorDetails.email}`
                                      },
                                      p(e.vendorDetails.email),
                                      9,
                                      Fe
                                    ))
                                  : (f(), h('span', Ge, p(l(o)('na')), 1))
                              ]),
                              _: 1
                            },
                            8,
                            ['label']
                          ),
                          n(
                            l(g).Item,
                            { label: l(o)('website') },
                            {
                              default: d(() => [
                                e.vendorDetails.website
                                  ? (f(),
                                    h(
                                      'a',
                                      {
                                        key: 0,
                                        href: e.vendorDetails.website,
                                        target: '_blank'
                                      },
                                      p(e.vendorDetails.website),
                                      9,
                                      Ue
                                    ))
                                  : (f(), h('span', qe, p(l(o)('na')), 1))
                              ]),
                              _: 1
                            },
                            8,
                            ['label']
                          ),
                          n(
                            l(g).Item,
                            { label: l(o)('status') },
                            {
                              default: d(() => [
                                e.vendorDetails.status.value === 'active'
                                  ? (f(),
                                    $(
                                      l(q),
                                      { key: 0, color: 'green' },
                                      {
                                        default: d(() => [
                                          v(p(l(o)('active')), 1)
                                        ]),
                                        _: 1
                                      }
                                    ))
                                  : e.vendorDetails.status.value === 'inactive'
                                  ? (f(),
                                    $(
                                      l(q),
                                      { key: 1 },
                                      {
                                        default: d(() => [
                                          v(p(l(o)('inactive')), 1)
                                        ]),
                                        _: 1
                                      }
                                    ))
                                  : e.vendorDetails.status.value === 'pending'
                                  ? (f(),
                                    $(
                                      l(q),
                                      { key: 2, color: 'orange' },
                                      {
                                        default: d(() => [
                                          v(p(l(o)('pending')), 1)
                                        ]),
                                        _: 1
                                      }
                                    ))
                                  : G('', !0)
                              ]),
                              _: 1
                            },
                            8,
                            ['label']
                          ),
                          n(
                            l(g).Item,
                            { label: l(o)('registeredDate') },
                            {
                              default: d(() => [
                                v(
                                  p(
                                    e.vendorDetails.registered_date ||
                                      l(o)('na')
                                  ),
                                  1
                                )
                              ]),
                              _: 1
                            },
                            8,
                            ['label']
                          ),
                          n(
                            l(g).Item,
                            { label: l(o)('address') },
                            {
                              default: d(() => [
                                v(p(b(e.vendorDetails.address)), 1)
                              ]),
                              _: 1
                            },
                            8,
                            ['label']
                          ),
                          e.vendorDetails.description
                            ? (f(),
                              $(
                                l(g).Item,
                                { key: 0, label: l(o)('description') },
                                {
                                  default: d(() => [
                                    j(
                                      'div',
                                      {
                                        innerHTML: e.vendorDetails.description
                                      },
                                      null,
                                      8,
                                      Qe
                                    )
                                  ]),
                                  _: 1
                                },
                                8,
                                ['label']
                              ))
                            : (f(),
                              $(
                                l(g).Item,
                                { key: 1, label: l(o)('description') },
                                {
                                  default: d(() => [v(p(l(o)('na')), 1)]),
                                  _: 1
                                },
                                8,
                                ['label']
                              )),
                          e.vendorDetails.seller_info
                            ? (f(),
                              $(
                                l(g).Item,
                                { key: 2, label: l(o)('sellerInfo') },
                                {
                                  default: d(() => [
                                    j(
                                      'div',
                                      {
                                        innerHTML: e.vendorDetails.seller_info
                                      },
                                      null,
                                      8,
                                      Ye
                                    )
                                  ]),
                                  _: 1
                                },
                                8,
                                ['label']
                              ))
                            : (f(),
                              $(
                                l(g).Item,
                                { key: 3, label: l(o)('sellerInfo') },
                                {
                                  default: d(() => [v(p(l(o)('na')), 1)]),
                                  _: 1
                                },
                                8,
                                ['label']
                              )),
                          e.vendorDetails.additional_details &&
                          e.vendorDetails.additional_details.length > 0
                            ? (f(!0),
                              h(
                                N,
                                { key: 4 },
                                pe(
                                  e.vendorDetails.additional_details || [],
                                  (m, y) => (
                                    f(),
                                    $(
                                      l(g).Item,
                                      { key: y, label: m.label },
                                      {
                                        default: d(() => [
                                          m.type === 'custom_image'
                                            ? (f(),
                                              h(
                                                N,
                                                { key: 0 },
                                                [
                                                  m.value
                                                    ? (f(),
                                                      $(
                                                        l(Le),
                                                        {
                                                          key: 0,
                                                          src: m.value,
                                                          width: 150
                                                        },
                                                        null,
                                                        8,
                                                        ['src']
                                                      ))
                                                    : (f(),
                                                      h(
                                                        'p',
                                                        Ze,
                                                        p(l(o)('na')),
                                                        1
                                                      ))
                                                ],
                                                64
                                              ))
                                            : (f(),
                                              h(
                                                N,
                                                { key: 1 },
                                                [
                                                  v(
                                                    p(
                                                      Array.isArray(m.value)
                                                        ? m.value.join(', ')
                                                        : m.value
                                                        ? m.value
                                                        : l(o)('na')
                                                    ),
                                                    1
                                                  )
                                                ],
                                                64
                                              ))
                                        ]),
                                        _: 2
                                      },
                                      1032,
                                      ['label']
                                    )
                                  )
                                ),
                                128
                              ))
                            : G('', !0)
                        ]),
                        _: 1
                      }
                    )
                  ]))
                : (f(),
                  h('div', Je, [
                    j(
                      'p',
                      null,
                      p(l(o)('error')) + ': Unable to load vendor details',
                      1
                    )
                  ]))
            ]),
            _: 1
          },
          8,
          ['open', 'title']
        )
      )
    }
  })
const ft = Pe(et, [['__scopeId', 'data-v-6e038cc1']])
export { ft as default }

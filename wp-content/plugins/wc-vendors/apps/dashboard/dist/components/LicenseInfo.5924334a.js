import {
  d as T,
  g as x,
  o as n,
  a as g,
  I as p,
  J as c,
  c as r,
  u as t,
  L as h,
  Q as i,
  H as l,
  F as w,
  S as b,
  a1 as v
} from '../common/vendor.0319ebde.js'
import {
  j as A,
  k as a,
  a7 as z,
  n as y,
  a8 as R,
  l as j
} from '../common/Dashboard.071f9192.js'
import { c as V } from '../common/createLucideIcon.226fd43f.js'
import { S as k, C as q } from '../common/index.f1e5ace8.js'
import { T as S } from '../common/index.5b4de55e.js'
import { B } from '../common/index.5693d46f.js'
import { B as E } from '../common/index.bc1c100b.js'
import { S as F } from '../common/settings.d3f5f10e.js'
import '../main.8014daeb.js'
import '../common/antd.ecdb83f5.js'
import '../common/shallowequal.234d6013.js'
/**
 * @license lucide-vue-next v0.483.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const K = V('KeyIcon', [
    [
      'path',
      {
        d: 'm15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4',
        key: 'g0fldk'
      }
    ],
    ['path', { d: 'm21 2-9.6 9.6', key: '1j0ho8' }],
    ['circle', { cx: '7.5', cy: '15.5', r: '5.5', key: 'yqb3hr' }]
  ]),
  H = { class: 'header' },
  J = { class: 'title' },
  M = { class: 'license-list' },
  O = { class: 'license-status' },
  Q = { class: 'license-name' },
  U = { key: 0, class: 'license-desc' },
  $ = { class: 'license-action-link' },
  G = ['href', 'title'],
  W = { key: 2 },
  X = { key: 1, class: 'license-status-row' },
  Y = { class: 'license-label' },
  Z = { class: 'license-value' },
  ee = { class: 'license-status' },
  se = { class: 'footer' },
  te = { class: 'text' },
  ae = T({
    __name: 'LicenseInfo',
    setup(ce) {
      const d = A(),
        L = x(() => {
          var s
          return (
            ((s = d.dashboardData) == null ? void 0 : s.data.license_status) ||
            []
          )
        }),
        m = x(() => !d.dashboardData),
        o = s => s.installed === !0,
        u = s => (o(s) ? s.status === 'active' || s.active === !0 : !1),
        I = s => (o(s) ? (u(s) ? 'success' : 'error') : 'default'),
        C = s =>
          o(s)
            ? u(s)
              ? a().licenses.active
              : a().licenses.inactive
            : a().licenses.notInstalled,
        P = () => {
          var s
          return (
            ((s = window.wcv_dashboard_data) == null
              ? void 0
              : s.pricing_url) || '#'
          )
        },
        D = () => {
          window.location.href = window.wcv_dashboard_data.manage_licenses_url
        },
        f = s =>
          s.need_to_activate
            ? Object.values(s.need_to_activate).join(', ')
            : '',
        N = async s => {
          try {
            const _ = await z(s)
            if (_.success) {
              y.success({
                message: a().licenses.success,
                description: _.data || a().licenses.pluginActivatedSuccessfully,
                placement: 'topRight',
                duration: 4
              })
              const e = await R()
              d.dashboardData &&
                d.dashboardData.data &&
                (d.dashboardData.data.license_status = e)
            } else
              y.error({
                message: a().licenses.error,
                description: _.data || a().licenses.failedToActivatePlugin,
                placement: 'topRight',
                duration: 4
              })
          } catch {
            y.error({
              message: a().licenses.error,
              description: a().licenses.unexpectedError,
              placement: 'topRight',
              duration: 4
            })
          }
        }
      return (s, _) => (
        n(),
        g(
          t(q),
          { class: 'license-info-card' },
          {
            default: p(() => [
              c('div', H, [
                c('div', J, [
                  r(t(K), { class: 'icon', size: 24 }),
                  h(' ' + i(t(a)().licenses.title), 1)
                ])
              ]),
              c('div', M, [
                m.value
                  ? (n(),
                    l(
                      w,
                      { key: 0 },
                      b(3, e =>
                        c('div', { key: e, class: 'license-item' }, [
                          r(t(k), {
                            active: '',
                            paragraph: { rows: 1 },
                            title: { width: '50%' }
                          }),
                          c('div', O, [
                            r(t(k).Button, {
                              active: '',
                              size: 'small',
                              shape: 'round',
                              style: { width: '80px' }
                            })
                          ])
                        ])
                      ),
                      64
                    ))
                  : (n(!0),
                    l(
                      w,
                      { key: 1 },
                      b(
                        L.value,
                        e => (
                          n(),
                          l('div', { key: e.key, class: 'license-item' }, [
                            c('div', Q, i(e.name), 1),
                            o(e)
                              ? v('', !0)
                              : (n(),
                                l('div', U, [
                                  r(
                                    t(S).Text,
                                    {
                                      style: {
                                        color: '#8c8c8c',
                                        fontSize: '12px'
                                      }
                                    },
                                    {
                                      default: p(() => [h(i(e.desc), 1)]),
                                      _: 2
                                    },
                                    1024
                                  )
                                ])),
                            c('div', $, [
                              o(e)
                                ? !u(e) && o(e) && f(e).length === 0
                                  ? (n(),
                                    g(
                                      t(B),
                                      {
                                        key: 1,
                                        type: 'link',
                                        style: { padding: 0 },
                                        class: 'license-action-link',
                                        title: t(a)().licenses.activate,
                                        onClick: ne => N(e.basename || '')
                                      },
                                      {
                                        default: p(() => [
                                          h(i(t(a)().licenses.activate), 1)
                                        ]),
                                        _: 2
                                      },
                                      1032,
                                      ['title', 'onClick']
                                    ))
                                  : v('', !0)
                                : (n(),
                                  l(
                                    'a',
                                    {
                                      key: 0,
                                      href: e.upgrade_link || P(),
                                      class: 'license-action-link',
                                      title: t(a)().licenses.getNow
                                    },
                                    i(t(a)().licenses.getNow),
                                    9,
                                    G
                                  )),
                              f(e).length > 0 && !u(e) && o(e)
                                ? (n(),
                                  l('div', W, [
                                    r(
                                      t(S).Text,
                                      {
                                        style: {
                                          color: '#8c8c8c',
                                          fontSize: '12px'
                                        }
                                      },
                                      {
                                        default: p(() => [
                                          h(
                                            i(
                                              t(a)().licenses.requires +
                                                ': ' +
                                                f(e) +
                                                ' ' +
                                                t(a)().licenses.toBeActive
                                            ),
                                            1
                                          )
                                        ]),
                                        _: 2
                                      },
                                      1024
                                    )
                                  ]))
                                : v('', !0)
                            ]),
                            o(e) && u(e) && e.expires
                              ? (n(),
                                l('div', X, [
                                  c('div', Y, i(t(a)().licenses.expires), 1),
                                  c('div', Z, i(e.expires || '-'), 1)
                                ]))
                              : v('', !0),
                            c('div', ee, [
                              r(t(E), { status: I(e), text: C(e) }, null, 8, [
                                'status',
                                'text'
                              ])
                            ])
                          ])
                        )
                      ),
                      128
                    ))
              ]),
              c('div', se, [
                m.value
                  ? (n(),
                    g(t(k).Button, {
                      key: 0,
                      active: '',
                      block: '',
                      style: { height: '32px' }
                    }))
                  : (n(),
                    g(
                      t(B),
                      { key: 1, type: 'default', block: '', onClick: D },
                      {
                        default: p(() => [
                          r(t(F), {
                            class: 'icon',
                            size: 17,
                            style: {
                              marginRight: '8px',
                              verticalAlign: 'middle'
                            }
                          }),
                          h(),
                          c('span', te, i(t(a)().licenses.manage), 1)
                        ]),
                        _: 1
                      }
                    ))
              ])
            ]),
            _: 1
          }
        )
      )
    }
  })
const fe = j(ae, [['__scopeId', 'data-v-a4e7426c']])
export { fe as default }

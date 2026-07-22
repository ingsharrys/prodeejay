import {
  d as v,
  r as f,
  o,
  a as l,
  I as m,
  J as e,
  c as i,
  u as a,
  L as p,
  Q as c,
  H as d,
  F as g,
  S as x,
  $ as M,
  a0 as H
} from '../common/vendor.0319ebde.js'
import { k as C, l as I } from '../common/Dashboard.071f9192.js'
import { c as s } from '../common/createLucideIcon.226fd43f.js'
import { C as L } from '../common/index.f1e5ace8.js'
import { S as w } from '../common/settings.d3f5f10e.js'
import '../main.8014daeb.js'
import '../common/antd.ecdb83f5.js'
import '../common/shallowequal.234d6013.js'
/**
 * @license lucide-vue-next v0.483.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const u = s('BookOpenIcon', [
  ['path', { d: 'M12 7v14', key: '1akyts' }],
  [
    'path',
    {
      d:
        'M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z',
      key: 'ruj8y'
    }
  ]
])
/**
 * @license lucide-vue-next v0.483.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const b = s('CircleHelpIcon', [
  ['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
  ['path', { d: 'M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3', key: '1u773s' }],
  ['path', { d: 'M12 17h.01', key: 'p32p05' }]
])
/**
 * @license lucide-vue-next v0.483.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const _ = s('ExternalLinkIcon', [
  ['path', { d: 'M15 3h6v6', key: '1q9fwt' }],
  ['path', { d: 'M10 14 21 3', key: 'gplh6r' }],
  [
    'path',
    {
      d: 'M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6',
      key: 'a6xqqp'
    }
  ]
])
/**
 * @license lucide-vue-next v0.483.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const z = s('FileTextIcon', [
  [
    'path',
    {
      d: 'M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z',
      key: '1rqfz7'
    }
  ],
  ['path', { d: 'M14 2v4a2 2 0 0 0 2 2h4', key: 'tnqrlb' }],
  ['path', { d: 'M10 9H8', key: 'b1mrlr' }],
  ['path', { d: 'M16 13H8', key: 't4e002' }],
  ['path', { d: 'M16 17H8', key: 'z1uh3a' }]
])
/**
 * @license lucide-vue-next v0.483.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const B = s('TrendingUpIcon', [
    ['polyline', { points: '22 7 13.5 15.5 8.5 10.5 2 17', key: '126l90' }],
    ['polyline', { points: '16 7 22 7 22 13', key: 'kwv8wd' }]
  ]),
  F = { class: 'header' },
  V = { class: 'title' },
  q = { class: 'resource-list' },
  S = ['href'],
  T = { class: 'resource-text' },
  E = { class: 'resource-title' },
  N = { class: 'resource-description' },
  D = v({
    __name: 'HelpFulLinks',
    setup(O) {
      const h = f(window.wcv_dashboard_data.helpful_resources),
        r = {
          guide: u,
          settings: w,
          growth: B,
          documentation: z,
          support: b,
          default: _
        },
        k = n => r[n] || r.default
      return (n, U) => (
        o(),
        l(
          a(L),
          { class: 'helpful-links-card' },
          {
            default: m(() => [
              e('div', F, [
                e('div', V, [
                  i(a(u), { class: 'icon', size: 24 }),
                  p(' ' + c(a(C)().resources.title), 1)
                ])
              ]),
              e('div', q, [
                (o(!0),
                d(
                  g,
                  null,
                  x(
                    h.value,
                    (t, y) => (
                      o(),
                      d('div', { key: y, class: 'resource-item' }, [
                        e(
                          'a',
                          {
                            href: t.url,
                            class: 'resource-content',
                            target: '_blank',
                            rel: 'noopener'
                          },
                          [
                            e(
                              'div',
                              {
                                class: 'icon-container',
                                style: M({ backgroundColor: t.iconBg })
                              },
                              [
                                (o(),
                                l(
                                  H(k(t.type)),
                                  { size: 20, color: t.iconColor },
                                  null,
                                  8,
                                  ['color']
                                ))
                              ],
                              4
                            ),
                            e('div', T, [
                              e('div', E, [
                                p(c(t.title) + ' ', 1),
                                i(a(_), { class: 'icon', size: 12 })
                              ]),
                              e('div', N, c(t.description), 1)
                            ])
                          ],
                          8,
                          S
                        )
                      ])
                    )
                  ),
                  128
                ))
              ])
            ]),
            _: 1
          }
        )
      )
    }
  })
const P = I(D, [['__scopeId', 'data-v-a7cb337c']])
export { P as default }

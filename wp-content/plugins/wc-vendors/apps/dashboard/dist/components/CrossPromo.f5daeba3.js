import {
  d as P,
  r as g,
  g as s,
  o as y,
  a as b,
  I as l,
  c as i,
  u as t,
  L as c,
  Q as d,
  $ as R,
  a2 as T,
  a1 as z
} from '../common/vendor.0319ebde.js'
import {
  k as e,
  aa as N,
  n as u,
  a7 as D,
  l as V
} from '../common/Dashboard.071f9192.js'
import { T as C } from '../common/index.4c904157.js'
import { A as E } from '../common/index.69d3efbf.js'
import { T as k } from '../common/index.5b4de55e.js'
import { B as L } from '../common/index.5693d46f.js'
import { w as O, x as q } from '../common/antd.ecdb83f5.js'
import { C as Q } from '../common/index.f1e5ace8.js'
import { S as w } from '../common/index.5492ac28.js'
import '../main.8014daeb.js'
import '../common/shallowequal.234d6013.js'
const $ = P({
  __name: 'CrossPromo',
  setup(j) {
    const p = g(!1),
      m = g(!1),
      h = g(!1),
      _ = g(!1),
      o = s(() => {
        var a
        return (
          ((a = window.wcv_dashboard_data) == null
            ? void 0
            : a.promotion_plugin) || null
        )
      }),
      v = s(() => {
        var a
        return h.value || ((a = o.value) == null ? void 0 : a.isInstalled) || !1
      }),
      f = s(() => {
        var a
        return _.value || ((a = o.value) == null ? void 0 : a.isActive) || !1
      }),
      n = s(() => f.value),
      x = async () => {
        var a
        if (o.value) {
          p.value = !0
          try {
            const r = await N(o.value.slug)
            r.success
              ? (u.success({
                  message: e().promo.installSuccessfully,
                  description: e().promo.installAndActivateSuccessfully,
                  placement: 'topRight',
                  duration: 4
                }),
                (h.value = !0),
                (_.value = !0),
                (a = window.wcv_dashboard_data) != null &&
                  a.promotion_plugin &&
                  ((window.wcv_dashboard_data.promotion_plugin.isInstalled = !0),
                  (window.wcv_dashboard_data.promotion_plugin.isActive = !0)))
              : u.error({
                  message: e().promo.installFailed,
                  description: r.data || e().promo.installAndActivateFailed,
                  placement: 'topRight',
                  duration: 4
                })
          } catch (r) {
            u.error({
              message: e().promo.installFailed,
              description:
                r instanceof Error
                  ? r.message
                  : e().promo.installAndActivateFailed,
              placement: 'topRight',
              duration: 4
            })
          } finally {
            p.value = !1
          }
        }
      },
      S = async () => {
        var a
        if (o.value) {
          m.value = !0
          try {
            const r = await D(o.value.basename)
            r.success
              ? (u.success({
                  message: e().promo.activateSuccessfully,
                  description: r.data || e().promo.pluginActivatedSuccessfully,
                  placement: 'topRight',
                  duration: 4
                }),
                (_.value = !0),
                (a = window.wcv_dashboard_data) != null &&
                  a.promotion_plugin &&
                  (window.wcv_dashboard_data.promotion_plugin.isActive = !0))
              : u.error({
                  message: e().promo.activateFailed,
                  description: r.data || e().promo.activateFailed,
                  placement: 'topRight',
                  duration: 4
                })
          } catch (r) {
            u.error({
              message: e().promo.activateFailed,
              description:
                r instanceof Error ? r.message : e().promo.activateFailed,
              placement: 'topRight',
              duration: 4
            })
          } finally {
            m.value = !1
          }
        }
      },
      F = s(() =>
        n.value
          ? { backgroundColor: '#d1d5db', borderColor: '#d1d5db' }
          : v.value && !f.value
          ? { backgroundColor: '#f59e0b', borderColor: '#f59e0b' }
          : { backgroundColor: '#16a34a', borderColor: '#16a34a' }
      ),
      B = () => {
        n.value || (v.value ? f.value || S() : x())
      },
      A = s(() => p.value || m.value),
      I = s(() =>
        p.value
          ? e().promo.installing
          : m.value
          ? e().promo.activating
          : n.value
          ? e().promo.activated
          : v.value
          ? f.value
            ? ''
            : e().promo.activateNowButton
          : e().promo.installAndActivateButton
      )
    return (a, r) =>
      o.value
        ? (y(),
          b(
            t(Q),
            { key: 0, class: 'promo-card' },
            {
              default: l(() => [
                i(
                  t(w),
                  { direction: 'vertical', size: 12, style: { width: '100%' } },
                  {
                    default: l(() => [
                      i(
                        t(w),
                        {
                          size: 8,
                          wrap: '',
                          style: { 'margin-bottom': '18px' }
                        },
                        {
                          default: l(() => [
                            i(
                              t(C),
                              {
                                bordered: !1,
                                class: 'plugin-tag',
                                color:
                                  o.value.type === 'free'
                                    ? 'geekblue'
                                    : 'yellow'
                              },
                              {
                                default: l(() => [
                                  c(
                                    d(
                                      o.value.type === 'free'
                                        ? t(e)().promo.free
                                        : t(e)().promo.premium
                                    ),
                                    1
                                  )
                                ]),
                                _: 1
                              },
                              8,
                              ['color']
                            ),
                            i(
                              t(C),
                              {
                                bordered: !1,
                                class: 'plugin-tag',
                                color: 'gold'
                              },
                              {
                                default: l(() => [
                                  c(d(t(e)().promo.recommended), 1)
                                ]),
                                _: 1
                              }
                            )
                          ]),
                          _: 1
                        }
                      ),
                      i(
                        t(w),
                        { size: 12, align: 'start' },
                        {
                          default: l(() => [
                            i(
                              t(E),
                              {
                                src: o.value.icon,
                                shape: 'square',
                                alt: o.value.name,
                                size: 'large'
                              },
                              null,
                              8,
                              ['src', 'alt']
                            ),
                            i(
                              t(k).Title,
                              {
                                level: 5,
                                style: {
                                  'margin-bottom': '0',
                                  'margin-top': '0',
                                  'line-height': '1.2'
                                }
                              },
                              {
                                default: l(() => [c(d(o.value.name), 1)]),
                                _: 1
                              }
                            )
                          ]),
                          _: 1
                        }
                      ),
                      i(
                        t(k).Paragraph,
                        { type: 'secondary', style: { 'margin-bottom': '0' } },
                        {
                          default: l(() => [c(d(o.value.description), 1)]),
                          _: 1
                        }
                      ),
                      i(
                        t(L),
                        {
                          type: n.value ? 'default' : 'primary',
                          block: '',
                          loading: A.value,
                          disabled: n.value,
                          onClick: B,
                          style: R(F.value)
                        },
                        T(
                          { default: l(() => [c(' ' + d(I.value), 1)]), _: 2 },
                          [
                            !n.value && !A.value
                              ? {
                                  name: 'icon',
                                  fn: l(() => [
                                    v.value
                                      ? (y(), b(t(q), { key: 1 }))
                                      : (y(), b(t(O), { key: 0 }))
                                  ]),
                                  key: '0'
                                }
                              : void 0
                          ]
                        ),
                        1032,
                        ['type', 'loading', 'disabled', 'style']
                      )
                    ]),
                    _: 1
                  }
                )
              ]),
              _: 1
            }
          ))
        : z('', !0)
  }
})
const ae = V($, [['__scopeId', 'data-v-a4fdef20']])
export { ae as default }

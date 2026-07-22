import { z as l, au as v, d as e } from '../main.491ba5c0.js'
import {
  d,
  L as c,
  W as E,
  b as P,
  r as f,
  o as D,
  a as R,
  a9 as T,
  aa as V,
  ab as O,
  u as A
} from '../common/vendor.84fc1123.js'
import '../common/antd.7f3c63f7.js'
const I = (m, _) => {
    const i = m[_]
    return i
      ? typeof i == 'function'
        ? i()
        : Promise.resolve(i)
      : new Promise((u, o) => {
          ;(typeof queueMicrotask == 'function' ? queueMicrotask : setTimeout)(
            o.bind(null, new Error('Unknown variable dynamic import: ' + _))
          )
        })
  },
  L = d({
    __name: 'DynamicComponent',
    props: { name: String, params: Object },
    setup(m) {
      const _ = m,
        i = l(),
        { vendorSettings: u } = c(i),
        { name: o, params: n } = E(_),
        p = n == null ? void 0 : n.value,
        s = P(() => {
          const t = v((o == null ? void 0 : o.value) ?? '')
          return t
            ? Promise.resolve(t)
            : I(
                Object.assign({
                  './Admin.vue': () =>
                    e(
                      () => import('./Admin.8f6492e9.js'),
                      [
                        window.wcv_avp.pluginDirUrl +
                          '/dist/components/Admin.8f6492e9.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/vendor.84fc1123.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/_plugin-vue_export-helper.c27b6911.js'
                      ],
                      import.meta.url
                    ),
                  './CommissionTiers.vue': () =>
                    e(
                      () => import('./CommissionTiers.f1aa37fe.js'),
                      [
                        window.wcv_avp.pluginDirUrl +
                          '/dist/components/CommissionTiers.f1aa37fe.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/vendor.84fc1123.js',
                        window.wcv_avp.pluginDirUrl + '/dist/main.491ba5c0.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/antd.7f3c63f7.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/index.109b4b21.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/VendorStore.d737faa9.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/initDefaultProps.71991ecc.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/DynamicControl.627d1dc9.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/index.4e3cad7b.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/_plugin-vue_export-helper.c27b6911.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/index.380800ce.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/index.7f1c23e8.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/ActionButton.265b9cc4.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/VendorEdit.9f7f9a17.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/index.ebb33149.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/hasIn.ec097647.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/assets/DynamicControl-ec409874.css',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/index.60678172.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/index.e3da6296.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/responsiveObserve.eb3c0da1.js'
                      ],
                      import.meta.url
                    ),
                  './DynamicComponent.vue': () =>
                    e(
                      () => Promise.resolve().then(() => y),
                      void 0,
                      import.meta.url
                    ),
                  './DynamicControl.vue': () =>
                    e(
                      () =>
                        import('../common/DynamicControl.627d1dc9.js').then(
                          r => r.D
                        ),
                      [
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/DynamicControl.627d1dc9.js',
                        window.wcv_avp.pluginDirUrl + '/dist/main.491ba5c0.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/vendor.84fc1123.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/antd.7f3c63f7.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/VendorStore.d737faa9.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/initDefaultProps.71991ecc.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/index.4e3cad7b.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/_plugin-vue_export-helper.c27b6911.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/index.109b4b21.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/index.380800ce.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/index.7f1c23e8.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/ActionButton.265b9cc4.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/VendorEdit.9f7f9a17.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/index.ebb33149.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/hasIn.ec097647.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/assets/DynamicControl-ec409874.css'
                      ],
                      import.meta.url
                    ),
                  './GMap.vue': () =>
                    e(
                      () => import('./GMap.aa29eec4.js'),
                      [
                        window.wcv_avp.pluginDirUrl +
                          '/dist/components/GMap.aa29eec4.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/vendor.84fc1123.js',
                        window.wcv_avp.pluginDirUrl + '/dist/main.491ba5c0.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/antd.7f3c63f7.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/VendorStore.d737faa9.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/initDefaultProps.71991ecc.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/_plugin-vue_export-helper.c27b6911.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/assets/GMap-86d63f51.css'
                      ],
                      import.meta.url
                    ),
                  './OpeningHours.vue': () =>
                    e(
                      () => import('./OpeningHours.11025af0.js'),
                      [
                        window.wcv_avp.pluginDirUrl +
                          '/dist/components/OpeningHours.11025af0.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/vendor.84fc1123.js',
                        window.wcv_avp.pluginDirUrl + '/dist/main.491ba5c0.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/antd.7f3c63f7.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/VendorStore.d737faa9.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/initDefaultProps.71991ecc.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/index.109b4b21.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/index.ebb33149.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/ActionButton.265b9cc4.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/DynamicControl.627d1dc9.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/index.4e3cad7b.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/_plugin-vue_export-helper.c27b6911.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/index.380800ce.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/index.7f1c23e8.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/VendorEdit.9f7f9a17.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/hasIn.ec097647.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/assets/DynamicControl-ec409874.css',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/index.60678172.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/index.e3da6296.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/responsiveObserve.eb3c0da1.js'
                      ],
                      import.meta.url
                    ),
                  './ShippingAddress.vue': () =>
                    e(
                      () => import('./ShippingAddress.b4c95bf0.js'),
                      [
                        window.wcv_avp.pluginDirUrl +
                          '/dist/components/ShippingAddress.b4c95bf0.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/vendor.84fc1123.js',
                        window.wcv_avp.pluginDirUrl + '/dist/main.491ba5c0.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/antd.7f3c63f7.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/DynamicControl.627d1dc9.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/VendorStore.d737faa9.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/initDefaultProps.71991ecc.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/index.4e3cad7b.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/_plugin-vue_export-helper.c27b6911.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/index.109b4b21.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/index.380800ce.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/index.7f1c23e8.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/ActionButton.265b9cc4.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/VendorEdit.9f7f9a17.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/index.ebb33149.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/hasIn.ec097647.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/assets/DynamicControl-ec409874.css'
                      ],
                      import.meta.url
                    ),
                  './ShippingFlat.vue': () =>
                    e(
                      () => import('./ShippingFlat.45e16ad1.js'),
                      [
                        window.wcv_avp.pluginDirUrl +
                          '/dist/components/ShippingFlat.45e16ad1.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/vendor.84fc1123.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/DynamicControl.627d1dc9.js',
                        window.wcv_avp.pluginDirUrl + '/dist/main.491ba5c0.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/antd.7f3c63f7.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/VendorStore.d737faa9.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/initDefaultProps.71991ecc.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/index.4e3cad7b.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/_plugin-vue_export-helper.c27b6911.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/index.109b4b21.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/index.380800ce.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/index.7f1c23e8.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/ActionButton.265b9cc4.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/VendorEdit.9f7f9a17.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/index.ebb33149.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/hasIn.ec097647.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/assets/DynamicControl-ec409874.css',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/index.6a48a719.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/responsiveObserve.eb3c0da1.js'
                      ],
                      import.meta.url
                    ),
                  './ShippingTableRates.vue': () =>
                    e(
                      () => import('./ShippingTableRates.53cdca88.js'),
                      [
                        window.wcv_avp.pluginDirUrl +
                          '/dist/components/ShippingTableRates.53cdca88.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/vendor.84fc1123.js',
                        window.wcv_avp.pluginDirUrl + '/dist/main.491ba5c0.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/antd.7f3c63f7.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/DynamicControl.627d1dc9.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/VendorStore.d737faa9.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/initDefaultProps.71991ecc.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/index.4e3cad7b.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/_plugin-vue_export-helper.c27b6911.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/index.109b4b21.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/index.380800ce.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/index.7f1c23e8.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/ActionButton.265b9cc4.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/VendorEdit.9f7f9a17.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/index.ebb33149.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/hasIn.ec097647.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/assets/DynamicControl-ec409874.css',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/index.60678172.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/index.e3da6296.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/responsiveObserve.eb3c0da1.js'
                      ],
                      import.meta.url
                    ),
                  './Spinner.vue': () =>
                    e(
                      () => import('./Spinner.939733c4.js'),
                      [
                        window.wcv_avp.pluginDirUrl +
                          '/dist/components/Spinner.939733c4.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/vendor.84fc1123.js',
                        window.wcv_avp.pluginDirUrl + '/dist/main.491ba5c0.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/antd.7f3c63f7.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/index.e3da6296.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/initDefaultProps.71991ecc.js'
                      ],
                      import.meta.url
                    ),
                  './VendorApprovalModal.vue': () =>
                    e(
                      () => import('./VendorApprovalModal.23fdc782.js'),
                      [
                        window.wcv_avp.pluginDirUrl +
                          '/dist/components/VendorApprovalModal.23fdc782.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/vendor.84fc1123.js',
                        window.wcv_avp.pluginDirUrl + '/dist/main.491ba5c0.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/antd.7f3c63f7.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/index.e3da6296.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/initDefaultProps.71991ecc.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/VendorStore.d737faa9.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/hasIn.ec097647.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/index.109b4b21.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/index.6a48a719.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/responsiveObserve.eb3c0da1.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/index.60678172.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/index.7f1c23e8.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/ActionButton.265b9cc4.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/_plugin-vue_export-helper.c27b6911.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/assets/VendorApprovalModal-60c96757.css'
                      ],
                      import.meta.url
                    ),
                  './VendorDetailModal.vue': () =>
                    e(
                      () => import('./VendorDetailModal.b4577690.js'),
                      [
                        window.wcv_avp.pluginDirUrl +
                          '/dist/components/VendorDetailModal.b4577690.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/vendor.84fc1123.js',
                        window.wcv_avp.pluginDirUrl + '/dist/main.491ba5c0.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/antd.7f3c63f7.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/VendorStore.d737faa9.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/initDefaultProps.71991ecc.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/index.e3da6296.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/responsiveObserve.eb3c0da1.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/index.7f1c23e8.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/ActionButton.265b9cc4.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/index.4e3cad7b.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/index.380800ce.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/_plugin-vue_export-helper.c27b6911.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/assets/VendorDetailModal-010bd40d.css'
                      ],
                      import.meta.url
                    ),
                  './VendorEdit.vue': () =>
                    e(
                      () =>
                        import('../common/VendorEdit.9f7f9a17.js').then(
                          r => r.V
                        ),
                      [
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/VendorEdit.9f7f9a17.js',
                        window.wcv_avp.pluginDirUrl + '/dist/main.491ba5c0.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/vendor.84fc1123.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/antd.7f3c63f7.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/VendorStore.d737faa9.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/initDefaultProps.71991ecc.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/index.ebb33149.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/ActionButton.265b9cc4.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/hasIn.ec097647.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/index.380800ce.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/index.7f1c23e8.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/index.4e3cad7b.js'
                      ],
                      import.meta.url
                    ),
                  './VendorTable.vue': () =>
                    e(
                      () => import('./VendorTable.4e5f4e8c.js'),
                      [
                        window.wcv_avp.pluginDirUrl +
                          '/dist/components/VendorTable.4e5f4e8c.js',
                        window.wcv_avp.pluginDirUrl + '/dist/main.491ba5c0.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/vendor.84fc1123.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/antd.7f3c63f7.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/VendorStore.d737faa9.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/initDefaultProps.71991ecc.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/_plugin-vue_export-helper.c27b6911.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/index.60678172.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/index.e3da6296.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/index.109b4b21.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/responsiveObserve.eb3c0da1.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/index.6a48a719.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/assets/VendorTable-0c918a86.css'
                      ],
                      import.meta.url
                    )
                }),
                `./${o == null ? void 0 : o.value}.vue`
              )
        }),
        a = f({})
      if (n != null && n.value)
        for (let t in p) {
          let r = p[t]
          t === 'rates'
            ? (a.value[t] = u == null ? void 0 : u.value[r])
            : (a.value[t] = r)
        }
      else a.value = {}
      return (t, r) => (D(), R(O(A(s)), T(V({ ...a.value })), null, 16))
    }
  }),
  y = Object.freeze(
    Object.defineProperty({ __proto__: null, default: L }, Symbol.toStringTag, {
      value: 'Module'
    })
  )
export { L as default }

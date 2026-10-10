import { B as l, au as v, k as e } from '../main.2aa0af6a.js'
import {
  d,
  L as c,
  Y as E,
  b as P,
  r as f,
  o as D,
  a as R,
  ac as T,
  ad as V,
  ae as O,
  u as A
} from '../common/vendor.0c3875d9.js'
import '../common/antd.16e70afa.js'
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
                      () => import('./Admin.a922f9f7.js'),
                      [
                        window.wcv_avp.pluginDirUrl +
                          '/dist/components/Admin.a922f9f7.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/vendor.0c3875d9.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/_plugin-vue_export-helper.c27b6911.js'
                      ],
                      import.meta.url
                    ),
                  './CommissionTiers.vue': () =>
                    e(
                      () => import('./CommissionTiers.782ad4ff.js'),
                      [
                        window.wcv_avp.pluginDirUrl +
                          '/dist/components/CommissionTiers.782ad4ff.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/vendor.0c3875d9.js',
                        window.wcv_avp.pluginDirUrl + '/dist/main.2aa0af6a.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/antd.16e70afa.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/index.53baf982.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/VendorStore.5e4919cf.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/initDefaultProps.6051a836.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/DynamicControl.c9fef987.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/index.c802b557.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/_plugin-vue_export-helper.c27b6911.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/index.5d97157e.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/VendorEdit.465a2363.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/index.1eb2a6c7.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/hasIn.0c866627.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/assets/DynamicControl-ec409874.css',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/index.f0b806a1.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/index.7f13b839.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/responsiveObserve.fd3184f5.js'
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
                        import('../common/DynamicControl.c9fef987.js').then(
                          r => r.D
                        ),
                      [
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/DynamicControl.c9fef987.js',
                        window.wcv_avp.pluginDirUrl + '/dist/main.2aa0af6a.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/vendor.0c3875d9.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/antd.16e70afa.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/VendorStore.5e4919cf.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/initDefaultProps.6051a836.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/index.c802b557.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/_plugin-vue_export-helper.c27b6911.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/index.53baf982.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/index.5d97157e.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/VendorEdit.465a2363.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/index.1eb2a6c7.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/hasIn.0c866627.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/assets/DynamicControl-ec409874.css'
                      ],
                      import.meta.url
                    ),
                  './GMap.vue': () =>
                    e(
                      () => import('./GMap.154f5333.js'),
                      [
                        window.wcv_avp.pluginDirUrl +
                          '/dist/components/GMap.154f5333.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/vendor.0c3875d9.js',
                        window.wcv_avp.pluginDirUrl + '/dist/main.2aa0af6a.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/antd.16e70afa.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/VendorStore.5e4919cf.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/initDefaultProps.6051a836.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/_plugin-vue_export-helper.c27b6911.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/assets/GMap-86d63f51.css'
                      ],
                      import.meta.url
                    ),
                  './OpeningHours.vue': () =>
                    e(
                      () => import('./OpeningHours.abbfa353.js'),
                      [
                        window.wcv_avp.pluginDirUrl +
                          '/dist/components/OpeningHours.abbfa353.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/vendor.0c3875d9.js',
                        window.wcv_avp.pluginDirUrl + '/dist/main.2aa0af6a.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/antd.16e70afa.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/VendorStore.5e4919cf.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/initDefaultProps.6051a836.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/index.53baf982.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/index.1eb2a6c7.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/DynamicControl.c9fef987.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/index.c802b557.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/_plugin-vue_export-helper.c27b6911.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/index.5d97157e.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/VendorEdit.465a2363.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/hasIn.0c866627.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/assets/DynamicControl-ec409874.css',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/index.f0b806a1.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/index.7f13b839.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/responsiveObserve.fd3184f5.js'
                      ],
                      import.meta.url
                    ),
                  './ShippingAddress.vue': () =>
                    e(
                      () => import('./ShippingAddress.8721163a.js'),
                      [
                        window.wcv_avp.pluginDirUrl +
                          '/dist/components/ShippingAddress.8721163a.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/vendor.0c3875d9.js',
                        window.wcv_avp.pluginDirUrl + '/dist/main.2aa0af6a.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/antd.16e70afa.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/DynamicControl.c9fef987.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/VendorStore.5e4919cf.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/initDefaultProps.6051a836.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/index.c802b557.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/_plugin-vue_export-helper.c27b6911.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/index.53baf982.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/index.5d97157e.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/VendorEdit.465a2363.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/index.1eb2a6c7.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/hasIn.0c866627.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/assets/DynamicControl-ec409874.css'
                      ],
                      import.meta.url
                    ),
                  './ShippingFlat.vue': () =>
                    e(
                      () => import('./ShippingFlat.859deccb.js'),
                      [
                        window.wcv_avp.pluginDirUrl +
                          '/dist/components/ShippingFlat.859deccb.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/vendor.0c3875d9.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/DynamicControl.c9fef987.js',
                        window.wcv_avp.pluginDirUrl + '/dist/main.2aa0af6a.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/antd.16e70afa.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/VendorStore.5e4919cf.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/initDefaultProps.6051a836.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/index.c802b557.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/_plugin-vue_export-helper.c27b6911.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/index.53baf982.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/index.5d97157e.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/VendorEdit.465a2363.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/index.1eb2a6c7.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/hasIn.0c866627.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/assets/DynamicControl-ec409874.css',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/index.f39d6e9e.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/responsiveObserve.fd3184f5.js'
                      ],
                      import.meta.url
                    ),
                  './ShippingTableRates.vue': () =>
                    e(
                      () => import('./ShippingTableRates.19fd0e52.js'),
                      [
                        window.wcv_avp.pluginDirUrl +
                          '/dist/components/ShippingTableRates.19fd0e52.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/vendor.0c3875d9.js',
                        window.wcv_avp.pluginDirUrl + '/dist/main.2aa0af6a.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/antd.16e70afa.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/DynamicControl.c9fef987.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/VendorStore.5e4919cf.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/initDefaultProps.6051a836.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/index.c802b557.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/_plugin-vue_export-helper.c27b6911.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/index.53baf982.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/index.5d97157e.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/VendorEdit.465a2363.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/index.1eb2a6c7.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/hasIn.0c866627.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/assets/DynamicControl-ec409874.css',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/index.f0b806a1.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/index.7f13b839.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/responsiveObserve.fd3184f5.js'
                      ],
                      import.meta.url
                    ),
                  './Spinner.vue': () =>
                    e(
                      () => import('./Spinner.98b720f0.js'),
                      [
                        window.wcv_avp.pluginDirUrl +
                          '/dist/components/Spinner.98b720f0.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/vendor.0c3875d9.js',
                        window.wcv_avp.pluginDirUrl + '/dist/main.2aa0af6a.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/antd.16e70afa.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/index.7f13b839.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/initDefaultProps.6051a836.js'
                      ],
                      import.meta.url
                    ),
                  './VendorApprovalModal.vue': () =>
                    e(
                      () => import('./VendorApprovalModal.c561a636.js'),
                      [
                        window.wcv_avp.pluginDirUrl +
                          '/dist/components/VendorApprovalModal.c561a636.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/vendor.0c3875d9.js',
                        window.wcv_avp.pluginDirUrl + '/dist/main.2aa0af6a.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/antd.16e70afa.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/index.7f13b839.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/initDefaultProps.6051a836.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/VendorStore.5e4919cf.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/hasIn.0c866627.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/index.53baf982.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/index.f39d6e9e.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/responsiveObserve.fd3184f5.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/index.f0b806a1.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/_plugin-vue_export-helper.c27b6911.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/assets/VendorApprovalModal-10a46a18.css'
                      ],
                      import.meta.url
                    ),
                  './VendorDetailModal.vue': () =>
                    e(
                      () => import('./VendorDetailModal.3ce293e6.js'),
                      [
                        window.wcv_avp.pluginDirUrl +
                          '/dist/components/VendorDetailModal.3ce293e6.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/vendor.0c3875d9.js',
                        window.wcv_avp.pluginDirUrl + '/dist/main.2aa0af6a.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/antd.16e70afa.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/VendorStore.5e4919cf.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/initDefaultProps.6051a836.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/index.7f13b839.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/responsiveObserve.fd3184f5.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/index.c802b557.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/index.5d97157e.js',
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
                        import('../common/VendorEdit.465a2363.js').then(
                          r => r.V
                        ),
                      [
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/VendorEdit.465a2363.js',
                        window.wcv_avp.pluginDirUrl + '/dist/main.2aa0af6a.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/vendor.0c3875d9.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/antd.16e70afa.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/VendorStore.5e4919cf.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/initDefaultProps.6051a836.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/index.1eb2a6c7.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/hasIn.0c866627.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/index.5d97157e.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/index.c802b557.js'
                      ],
                      import.meta.url
                    ),
                  './VendorTable.vue': () =>
                    e(
                      () => import('./VendorTable.9b3bdb93.js'),
                      [
                        window.wcv_avp.pluginDirUrl +
                          '/dist/components/VendorTable.9b3bdb93.js',
                        window.wcv_avp.pluginDirUrl + '/dist/main.2aa0af6a.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/vendor.0c3875d9.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/antd.16e70afa.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/VendorStore.5e4919cf.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/initDefaultProps.6051a836.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/_plugin-vue_export-helper.c27b6911.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/index.f0b806a1.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/index.7f13b839.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/index.53baf982.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/responsiveObserve.fd3184f5.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/common/index.f39d6e9e.js',
                        window.wcv_avp.pluginDirUrl +
                          '/dist/assets/VendorTable-cd3a65c8.css'
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

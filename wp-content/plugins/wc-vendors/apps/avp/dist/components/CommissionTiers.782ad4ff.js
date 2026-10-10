import {
  d as O,
  L as b,
  o as d,
  a as m,
  w as l,
  u as e,
  W as v,
  c as u,
  U as s,
  S as p
} from '../common/vendor.0c3875d9.js'
import { B as I, j as t } from '../main.2aa0af6a.js'
import { a as h, S as i } from '../common/index.53baf982.js'
import { B as _ } from '../common/VendorStore.5e4919cf.js'
import { F as S } from '../common/antd.16e70afa.js'
import { I as f } from '../common/DynamicControl.c9fef987.js'
import { P as C } from '../common/index.1eb2a6c7.js'
import { T as g } from '../common/index.f0b806a1.js'
import '../common/initDefaultProps.6051a836.js'
import '../common/index.c802b557.js'
import '../common/_plugin-vue_export-helper.c27b6911.js'
import '../common/index.5d97157e.js'
import '../common/VendorEdit.465a2363.js'
import '../common/hasIn.0c866627.js'
import '../common/index.7f13b839.js'
import '../common/responsiveObserve.fd3184f5.js'
const J = O({
  __name: 'CommissionTiers',
  setup(w) {
    const k = I(),
      { vendorSettings: o } = b(k),
      x = [
        { title: t('name'), dataIndex: 'name', key: 'name' },
        { title: t('rules'), dataIndex: 'rule', key: 'rule' },
        { title: t('sales'), dataIndex: 'value', key: 'value' },
        { title: t('type'), dataIndex: 'type', key: 'type' },
        { title: t('amount'), dataIndex: 'amount', key: 'amount' },
        { title: t('percentage'), dataIndex: 'percent', key: 'percent' },
        { title: t('fee'), dataIndex: 'fee', key: 'fee' },
        { title: t('action'), key: 'action' }
      ],
      U = () => {
        o.value.commission_tiers.hasOwnProperty(o.value.commission_type)
          ? o.value.commission_tiers[o.value.commission_type].push({
              name: '',
              rule: '',
              value: 0,
              type: '',
              amount: 0,
              percent: 0,
              fee: 0
            })
          : (o.value.commission_tiers[o.value.commission_type] = [
              {
                name: '',
                rule: '',
                value: 0,
                type: '',
                amount: 0,
                percent: 0,
                fee: 0
              }
            ])
      },
      T = y => {
        const c = o.value.commission_tiers[o.value.commission_type].indexOf(y)
        o.value.commission_tiers[o.value.commission_type].splice(c, 1)
      }
    return (y, c) => (
      d(),
      m(
        e(g),
        {
          columns: x,
          dataSource: e(o).commission_tiers[e(o).commission_type],
          bordered: ''
        },
        {
          bodyCell: l(({ record: a, column: r }) => [
            r.key === 'name'
              ? (d(),
                m(
                  e(h),
                  {
                    key: 0,
                    value: a.name,
                    'onUpdate:value': n => (a.name = n)
                  },
                  null,
                  8,
                  ['value', 'onUpdate:value']
                ))
              : v('', !0),
            r.key === 'rule'
              ? (d(),
                m(
                  e(i),
                  {
                    key: 1,
                    value: a.rule,
                    'onUpdate:value': n => (a.rule = n),
                    style: { width: '150px' }
                  },
                  {
                    default: l(() => [
                      u(
                        e(i).Option,
                        { value: '' },
                        {
                          default: l(() => [
                            s(' --- ' + p(e(t)('select')) + ' --- ', 1)
                          ]),
                          _: 1
                        }
                      ),
                      u(
                        e(i).Option,
                        { value: 'less_than' },
                        { default: l(() => [s(p(e(t)('lessThan')), 1)]), _: 1 }
                      ),
                      u(
                        e(i).Option,
                        { value: 'up_to' },
                        { default: l(() => [s(p(e(t)('upTo')), 1)]), _: 1 }
                      ),
                      u(
                        e(i).Option,
                        { value: 'more_than' },
                        { default: l(() => [s(p(e(t)('moreThan')), 1)]), _: 1 }
                      )
                    ]),
                    _: 2
                  },
                  1032,
                  ['value', 'onUpdate:value']
                ))
              : v('', !0),
            r.key === 'value'
              ? (d(),
                m(
                  e(f),
                  {
                    key: 2,
                    value: a.value,
                    'onUpdate:value': n => (a.value = n)
                  },
                  null,
                  8,
                  ['value', 'onUpdate:value']
                ))
              : v('', !0),
            r.key === 'type'
              ? (d(),
                m(
                  e(i),
                  {
                    key: 3,
                    value: a.type,
                    'onUpdate:value': n => (a.type = n),
                    style: { width: '150px' }
                  },
                  {
                    default: l(() => [
                      u(
                        e(i).Option,
                        { value: '' },
                        {
                          default: l(() => [
                            s(' --- ' + p(e(t)('select')) + ' --- ', 1)
                          ]),
                          _: 1
                        }
                      ),
                      u(
                        e(i).Option,
                        { value: 'fixed' },
                        { default: l(() => [s(p(e(t)('fixed')), 1)]), _: 1 }
                      ),
                      u(
                        e(i).Option,
                        { value: 'fixed_fee' },
                        { default: l(() => [s(p(e(t)('fixedFee')), 1)]), _: 1 }
                      ),
                      u(
                        e(i).Option,
                        { value: 'percent' },
                        {
                          default: l(() => [s(p(e(t)('percentage')), 1)]),
                          _: 1
                        }
                      ),
                      u(
                        e(i).Option,
                        { value: 'percent_fee' },
                        {
                          default: l(() => [s(p(e(t)('percentageFee')), 1)]),
                          _: 1
                        }
                      )
                    ]),
                    _: 2
                  },
                  1032,
                  ['value', 'onUpdate:value']
                ))
              : v('', !0),
            r.key === 'amount'
              ? (d(),
                m(
                  e(f),
                  {
                    key: 4,
                    value: a.amount,
                    'onUpdate:value': n => (a.amount = n),
                    disabled: ['percent', 'percent_fee', ''].includes(a.type)
                  },
                  null,
                  8,
                  ['value', 'onUpdate:value', 'disabled']
                ))
              : v('', !0),
            r.key === 'percent'
              ? (d(),
                m(
                  e(f),
                  {
                    key: 5,
                    value: a.percent,
                    'onUpdate:value': n => (a.percent = n),
                    disabled: ['fixed', 'fixed_fee', ''].includes(a.type)
                  },
                  null,
                  8,
                  ['value', 'onUpdate:value', 'disabled']
                ))
              : v('', !0),
            r.key === 'fee'
              ? (d(),
                m(
                  e(f),
                  {
                    key: 6,
                    value: a.fee,
                    'onUpdate:value': n => (a.fee = n),
                    disabled: ['percent', 'fixed', ''].includes(a.type)
                  },
                  null,
                  8,
                  ['value', 'onUpdate:value', 'disabled']
                ))
              : v('', !0),
            r.key === 'action'
              ? (d(),
                m(
                  e(C),
                  {
                    key: 7,
                    onConfirm: T,
                    okText: e(t)('ok'),
                    cancelText: e(t)('cancel'),
                    title: e(t)('confirmRemove')
                  },
                  {
                    default: l(() => [
                      u(
                        e(_),
                        { danger: '' },
                        { default: l(() => [u(e(S))]), _: 1 }
                      )
                    ]),
                    _: 1
                  },
                  8,
                  ['okText', 'cancelText', 'title']
                ))
              : v('', !0)
          ]),
          footer: l(() => [
            u(
              e(_),
              { type: 'primary', onClick: U },
              { default: l(() => [s(p(e(t)('addRow')), 1)]), _: 1 }
            )
          ]),
          _: 1
        },
        8,
        ['dataSource']
      )
    )
  }
})
export { J as default }

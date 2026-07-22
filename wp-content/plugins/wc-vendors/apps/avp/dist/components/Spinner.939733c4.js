import {
  d as s,
  L as t,
  o as a,
  a as p,
  w as i,
  M as m,
  u as e
} from '../common/vendor.84fc1123.js'
import { u as f } from '../main.491ba5c0.js'
import { S as u } from '../common/index.e3da6296.js'
import '../common/antd.7f3c63f7.js'
import '../common/initDefaultProps.71991ecc.js'
const g = s({
  __name: 'Spinner',
  setup(c) {
    const n = f(),
      { showSpinner: o } = t(n)
    return (r, S) => (
      a(),
      p(
        e(u),
        { spinning: e(o) },
        { default: i(() => [m(r.$slots, 'default')]), _: 3 },
        8,
        ['spinning']
      )
    )
  }
})
export { g as default }

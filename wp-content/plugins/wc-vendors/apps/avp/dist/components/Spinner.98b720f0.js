import {
  d as s,
  L as t,
  o as a,
  a as p,
  w as i,
  M as m,
  u as e
} from '../common/vendor.0c3875d9.js'
import { u as f } from '../main.2aa0af6a.js'
import { S as u } from '../common/index.7f13b839.js'
import '../common/antd.16e70afa.js'
import '../common/initDefaultProps.6051a836.js'
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

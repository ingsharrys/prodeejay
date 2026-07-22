import { h as tt, n as Et, c as g } from './vendor.84fc1123.js'
function s(t, e) {
  Tt(t) && (t = '100%')
  var r = Bt(t)
  return (
    (t = e === 360 ? t : Math.min(e, Math.max(0, parseFloat(t)))),
    r && (t = parseInt(String(t * e), 10) / 100),
    Math.abs(t - e) < 1e-6
      ? 1
      : (e === 360
          ? (t = (t < 0 ? (t % e) + e : t % e) / parseFloat(String(e)))
          : (t = (t % e) / parseFloat(String(e))),
        t)
  )
}
function H(t) {
  return Math.min(1, Math.max(0, t))
}
function Tt(t) {
  return typeof t == 'string' && t.indexOf('.') !== -1 && parseFloat(t) === 1
}
function Bt(t) {
  return typeof t == 'string' && t.indexOf('%') !== -1
}
function wt(t) {
  return (t = parseFloat(t)), (isNaN(t) || t < 0 || t > 1) && (t = 1), t
}
function A(t) {
  return t <= 1 ? ''.concat(Number(t) * 100, '%') : t
}
function p(t) {
  return t.length === 1 ? '0' + t : String(t)
}
function Ft(t, e, r) {
  return { r: s(t, 255) * 255, g: s(e, 255) * 255, b: s(r, 255) * 255 }
}
function et(t, e, r) {
  ;(t = s(t, 255)), (e = s(e, 255)), (r = s(r, 255))
  var n = Math.max(t, e, r),
    a = Math.min(t, e, r),
    i = 0,
    o = 0,
    c = (n + a) / 2
  if (n === a) (o = 0), (i = 0)
  else {
    var l = n - a
    switch (((o = c > 0.5 ? l / (2 - n - a) : l / (n + a)), n)) {
      case t:
        i = (e - r) / l + (e < r ? 6 : 0)
        break
      case e:
        i = (r - t) / l + 2
        break
      case r:
        i = (t - e) / l + 4
        break
    }
    i /= 6
  }
  return { h: i, s: o, l: c }
}
function T(t, e, r) {
  return (
    r < 0 && (r += 1),
    r > 1 && (r -= 1),
    r < 1 / 6
      ? t + (e - t) * (6 * r)
      : r < 1 / 2
      ? e
      : r < 2 / 3
      ? t + (e - t) * (2 / 3 - r) * 6
      : t
  )
}
function Vt(t, e, r) {
  var n, a, i
  if (((t = s(t, 360)), (e = s(e, 100)), (r = s(r, 100)), e === 0))
    (a = r), (i = r), (n = r)
  else {
    var o = r < 0.5 ? r * (1 + e) : r + e - r * e,
      c = 2 * r - o
    ;(n = T(c, o, t + 1 / 3)), (a = T(c, o, t)), (i = T(c, o, t - 1 / 3))
  }
  return { r: n * 255, g: a * 255, b: i * 255 }
}
function R(t, e, r) {
  ;(t = s(t, 255)), (e = s(e, 255)), (r = s(r, 255))
  var n = Math.max(t, e, r),
    a = Math.min(t, e, r),
    i = 0,
    o = n,
    c = n - a,
    l = n === 0 ? 0 : c / n
  if (n === a) i = 0
  else {
    switch (n) {
      case t:
        i = (e - r) / c + (e < r ? 6 : 0)
        break
      case e:
        i = (r - t) / c + 2
        break
      case r:
        i = (t - e) / c + 4
        break
    }
    i /= 6
  }
  return { h: i, s: l, v: o }
}
function $t(t, e, r) {
  ;(t = s(t, 360) * 6), (e = s(e, 100)), (r = s(r, 100))
  var n = Math.floor(t),
    a = t - n,
    i = r * (1 - e),
    o = r * (1 - a * e),
    c = r * (1 - (1 - a) * e),
    l = n % 6,
    u = [r, o, i, i, c, r][l],
    m = [c, r, r, o, i, i][l],
    y = [i, i, c, r, r, o][l]
  return { r: u * 255, g: m * 255, b: y * 255 }
}
function I(t, e, r, n) {
  var a = [
    p(Math.round(t).toString(16)),
    p(Math.round(e).toString(16)),
    p(Math.round(r).toString(16))
  ]
  return n &&
    a[0].startsWith(a[0].charAt(1)) &&
    a[1].startsWith(a[1].charAt(1)) &&
    a[2].startsWith(a[2].charAt(1))
    ? a[0].charAt(0) + a[1].charAt(0) + a[2].charAt(0)
    : a.join('')
}
function Rt(t, e, r, n, a) {
  var i = [
    p(Math.round(t).toString(16)),
    p(Math.round(e).toString(16)),
    p(Math.round(r).toString(16)),
    p(It(n))
  ]
  return a &&
    i[0].startsWith(i[0].charAt(1)) &&
    i[1].startsWith(i[1].charAt(1)) &&
    i[2].startsWith(i[2].charAt(1)) &&
    i[3].startsWith(i[3].charAt(1))
    ? i[0].charAt(0) + i[1].charAt(0) + i[2].charAt(0) + i[3].charAt(0)
    : i.join('')
}
function It(t) {
  return Math.round(parseFloat(t) * 255).toString(16)
}
function rt(t) {
  return f(t) / 255
}
function f(t) {
  return parseInt(t, 16)
}
function _t(t) {
  return { r: t >> 16, g: (t & 65280) >> 8, b: t & 255 }
}
var _ = {
  aliceblue: '#f0f8ff',
  antiquewhite: '#faebd7',
  aqua: '#00ffff',
  aquamarine: '#7fffd4',
  azure: '#f0ffff',
  beige: '#f5f5dc',
  bisque: '#ffe4c4',
  black: '#000000',
  blanchedalmond: '#ffebcd',
  blue: '#0000ff',
  blueviolet: '#8a2be2',
  brown: '#a52a2a',
  burlywood: '#deb887',
  cadetblue: '#5f9ea0',
  chartreuse: '#7fff00',
  chocolate: '#d2691e',
  coral: '#ff7f50',
  cornflowerblue: '#6495ed',
  cornsilk: '#fff8dc',
  crimson: '#dc143c',
  cyan: '#00ffff',
  darkblue: '#00008b',
  darkcyan: '#008b8b',
  darkgoldenrod: '#b8860b',
  darkgray: '#a9a9a9',
  darkgreen: '#006400',
  darkgrey: '#a9a9a9',
  darkkhaki: '#bdb76b',
  darkmagenta: '#8b008b',
  darkolivegreen: '#556b2f',
  darkorange: '#ff8c00',
  darkorchid: '#9932cc',
  darkred: '#8b0000',
  darksalmon: '#e9967a',
  darkseagreen: '#8fbc8f',
  darkslateblue: '#483d8b',
  darkslategray: '#2f4f4f',
  darkslategrey: '#2f4f4f',
  darkturquoise: '#00ced1',
  darkviolet: '#9400d3',
  deeppink: '#ff1493',
  deepskyblue: '#00bfff',
  dimgray: '#696969',
  dimgrey: '#696969',
  dodgerblue: '#1e90ff',
  firebrick: '#b22222',
  floralwhite: '#fffaf0',
  forestgreen: '#228b22',
  fuchsia: '#ff00ff',
  gainsboro: '#dcdcdc',
  ghostwhite: '#f8f8ff',
  goldenrod: '#daa520',
  gold: '#ffd700',
  gray: '#808080',
  green: '#008000',
  greenyellow: '#adff2f',
  grey: '#808080',
  honeydew: '#f0fff0',
  hotpink: '#ff69b4',
  indianred: '#cd5c5c',
  indigo: '#4b0082',
  ivory: '#fffff0',
  khaki: '#f0e68c',
  lavenderblush: '#fff0f5',
  lavender: '#e6e6fa',
  lawngreen: '#7cfc00',
  lemonchiffon: '#fffacd',
  lightblue: '#add8e6',
  lightcoral: '#f08080',
  lightcyan: '#e0ffff',
  lightgoldenrodyellow: '#fafad2',
  lightgray: '#d3d3d3',
  lightgreen: '#90ee90',
  lightgrey: '#d3d3d3',
  lightpink: '#ffb6c1',
  lightsalmon: '#ffa07a',
  lightseagreen: '#20b2aa',
  lightskyblue: '#87cefa',
  lightslategray: '#778899',
  lightslategrey: '#778899',
  lightsteelblue: '#b0c4de',
  lightyellow: '#ffffe0',
  lime: '#00ff00',
  limegreen: '#32cd32',
  linen: '#faf0e6',
  magenta: '#ff00ff',
  maroon: '#800000',
  mediumaquamarine: '#66cdaa',
  mediumblue: '#0000cd',
  mediumorchid: '#ba55d3',
  mediumpurple: '#9370db',
  mediumseagreen: '#3cb371',
  mediumslateblue: '#7b68ee',
  mediumspringgreen: '#00fa9a',
  mediumturquoise: '#48d1cc',
  mediumvioletred: '#c71585',
  midnightblue: '#191970',
  mintcream: '#f5fffa',
  mistyrose: '#ffe4e1',
  moccasin: '#ffe4b5',
  navajowhite: '#ffdead',
  navy: '#000080',
  oldlace: '#fdf5e6',
  olive: '#808000',
  olivedrab: '#6b8e23',
  orange: '#ffa500',
  orangered: '#ff4500',
  orchid: '#da70d6',
  palegoldenrod: '#eee8aa',
  palegreen: '#98fb98',
  paleturquoise: '#afeeee',
  palevioletred: '#db7093',
  papayawhip: '#ffefd5',
  peachpuff: '#ffdab9',
  peru: '#cd853f',
  pink: '#ffc0cb',
  plum: '#dda0dd',
  powderblue: '#b0e0e6',
  purple: '#800080',
  rebeccapurple: '#663399',
  red: '#ff0000',
  rosybrown: '#bc8f8f',
  royalblue: '#4169e1',
  saddlebrown: '#8b4513',
  salmon: '#fa8072',
  sandybrown: '#f4a460',
  seagreen: '#2e8b57',
  seashell: '#fff5ee',
  sienna: '#a0522d',
  silver: '#c0c0c0',
  skyblue: '#87ceeb',
  slateblue: '#6a5acd',
  slategray: '#708090',
  slategrey: '#708090',
  snow: '#fffafa',
  springgreen: '#00ff7f',
  steelblue: '#4682b4',
  tan: '#d2b48c',
  teal: '#008080',
  thistle: '#d8bfd8',
  tomato: '#ff6347',
  turquoise: '#40e0d0',
  violet: '#ee82ee',
  wheat: '#f5deb3',
  white: '#ffffff',
  whitesmoke: '#f5f5f5',
  yellow: '#ffff00',
  yellowgreen: '#9acd32'
}
function O(t) {
  var e = { r: 0, g: 0, b: 0 },
    r = 1,
    n = null,
    a = null,
    i = null,
    o = !1,
    c = !1
  return (
    typeof t == 'string' && (t = Nt(t)),
    typeof t == 'object' &&
      (d(t.r) && d(t.g) && d(t.b)
        ? ((e = Ft(t.r, t.g, t.b)),
          (o = !0),
          (c = String(t.r).substr(-1) === '%' ? 'prgb' : 'rgb'))
        : d(t.h) && d(t.s) && d(t.v)
        ? ((n = A(t.s)),
          (a = A(t.v)),
          (e = $t(t.h, n, a)),
          (o = !0),
          (c = 'hsv'))
        : d(t.h) &&
          d(t.s) &&
          d(t.l) &&
          ((n = A(t.s)),
          (i = A(t.l)),
          (e = Vt(t.h, n, i)),
          (o = !0),
          (c = 'hsl')),
      Object.prototype.hasOwnProperty.call(t, 'a') && (r = t.a)),
    (r = wt(r)),
    {
      ok: o,
      format: t.format || c,
      r: Math.min(255, Math.max(e.r, 0)),
      g: Math.min(255, Math.max(e.g, 0)),
      b: Math.min(255, Math.max(e.b, 0)),
      a: r
    }
  )
}
var Dt = '[-\\+]?\\d+%?',
  qt = '[-\\+]?\\d*\\.\\d+%?',
  v = '(?:'.concat(qt, ')|(?:').concat(Dt, ')'),
  B = '[\\s|\\(]+('
    .concat(v, ')[,|\\s]+(')
    .concat(v, ')[,|\\s]+(')
    .concat(v, ')\\s*\\)?'),
  F = '[\\s|\\(]+('
    .concat(v, ')[,|\\s]+(')
    .concat(v, ')[,|\\s]+(')
    .concat(v, ')[,|\\s]+(')
    .concat(v, ')\\s*\\)?'),
  h = {
    CSS_UNIT: new RegExp(v),
    rgb: new RegExp('rgb' + B),
    rgba: new RegExp('rgba' + F),
    hsl: new RegExp('hsl' + B),
    hsla: new RegExp('hsla' + F),
    hsv: new RegExp('hsv' + B),
    hsva: new RegExp('hsva' + F),
    hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
    hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
    hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
    hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
  }
function Nt(t) {
  if (((t = t.trim().toLowerCase()), t.length === 0)) return !1
  var e = !1
  if (_[t]) (t = _[t]), (e = !0)
  else if (t === 'transparent')
    return { r: 0, g: 0, b: 0, a: 0, format: 'name' }
  var r = h.rgb.exec(t)
  return r
    ? { r: r[1], g: r[2], b: r[3] }
    : ((r = h.rgba.exec(t)),
      r
        ? { r: r[1], g: r[2], b: r[3], a: r[4] }
        : ((r = h.hsl.exec(t)),
          r
            ? { h: r[1], s: r[2], l: r[3] }
            : ((r = h.hsla.exec(t)),
              r
                ? { h: r[1], s: r[2], l: r[3], a: r[4] }
                : ((r = h.hsv.exec(t)),
                  r
                    ? { h: r[1], s: r[2], v: r[3] }
                    : ((r = h.hsva.exec(t)),
                      r
                        ? { h: r[1], s: r[2], v: r[3], a: r[4] }
                        : ((r = h.hex8.exec(t)),
                          r
                            ? {
                                r: f(r[1]),
                                g: f(r[2]),
                                b: f(r[3]),
                                a: rt(r[4]),
                                format: e ? 'name' : 'hex8'
                              }
                            : ((r = h.hex6.exec(t)),
                              r
                                ? {
                                    r: f(r[1]),
                                    g: f(r[2]),
                                    b: f(r[3]),
                                    format: e ? 'name' : 'hex'
                                  }
                                : ((r = h.hex4.exec(t)),
                                  r
                                    ? {
                                        r: f(r[1] + r[1]),
                                        g: f(r[2] + r[2]),
                                        b: f(r[3] + r[3]),
                                        a: rt(r[4] + r[4]),
                                        format: e ? 'name' : 'hex8'
                                      }
                                    : ((r = h.hex3.exec(t)),
                                      r
                                        ? {
                                            r: f(r[1] + r[1]),
                                            g: f(r[2] + r[2]),
                                            b: f(r[3] + r[3]),
                                            format: e ? 'name' : 'hex'
                                          }
                                        : !1)))))))))
}
function d(t) {
  return !!h.CSS_UNIT.exec(String(t))
}
var Pr = (function() {
    function t(e, r) {
      e === void 0 && (e = ''), r === void 0 && (r = {})
      var n
      if (e instanceof t) return e
      typeof e == 'number' && (e = _t(e)), (this.originalInput = e)
      var a = O(e)
      ;(this.originalInput = e),
        (this.r = a.r),
        (this.g = a.g),
        (this.b = a.b),
        (this.a = a.a),
        (this.roundA = Math.round(100 * this.a) / 100),
        (this.format = (n = r.format) !== null && n !== void 0 ? n : a.format),
        (this.gradientType = r.gradientType),
        this.r < 1 && (this.r = Math.round(this.r)),
        this.g < 1 && (this.g = Math.round(this.g)),
        this.b < 1 && (this.b = Math.round(this.b)),
        (this.isValid = a.ok)
    }
    return (
      (t.prototype.isDark = function() {
        return this.getBrightness() < 128
      }),
      (t.prototype.isLight = function() {
        return !this.isDark()
      }),
      (t.prototype.getBrightness = function() {
        var e = this.toRgb()
        return (e.r * 299 + e.g * 587 + e.b * 114) / 1e3
      }),
      (t.prototype.getLuminance = function() {
        var e = this.toRgb(),
          r,
          n,
          a,
          i = e.r / 255,
          o = e.g / 255,
          c = e.b / 255
        return (
          i <= 0.03928
            ? (r = i / 12.92)
            : (r = Math.pow((i + 0.055) / 1.055, 2.4)),
          o <= 0.03928
            ? (n = o / 12.92)
            : (n = Math.pow((o + 0.055) / 1.055, 2.4)),
          c <= 0.03928
            ? (a = c / 12.92)
            : (a = Math.pow((c + 0.055) / 1.055, 2.4)),
          0.2126 * r + 0.7152 * n + 0.0722 * a
        )
      }),
      (t.prototype.getAlpha = function() {
        return this.a
      }),
      (t.prototype.setAlpha = function(e) {
        return (
          (this.a = wt(e)), (this.roundA = Math.round(100 * this.a) / 100), this
        )
      }),
      (t.prototype.isMonochrome = function() {
        var e = this.toHsl().s
        return e === 0
      }),
      (t.prototype.toHsv = function() {
        var e = R(this.r, this.g, this.b)
        return { h: e.h * 360, s: e.s, v: e.v, a: this.a }
      }),
      (t.prototype.toHsvString = function() {
        var e = R(this.r, this.g, this.b),
          r = Math.round(e.h * 360),
          n = Math.round(e.s * 100),
          a = Math.round(e.v * 100)
        return this.a === 1
          ? 'hsv('
              .concat(r, ', ')
              .concat(n, '%, ')
              .concat(a, '%)')
          : 'hsva('
              .concat(r, ', ')
              .concat(n, '%, ')
              .concat(a, '%, ')
              .concat(this.roundA, ')')
      }),
      (t.prototype.toHsl = function() {
        var e = et(this.r, this.g, this.b)
        return { h: e.h * 360, s: e.s, l: e.l, a: this.a }
      }),
      (t.prototype.toHslString = function() {
        var e = et(this.r, this.g, this.b),
          r = Math.round(e.h * 360),
          n = Math.round(e.s * 100),
          a = Math.round(e.l * 100)
        return this.a === 1
          ? 'hsl('
              .concat(r, ', ')
              .concat(n, '%, ')
              .concat(a, '%)')
          : 'hsla('
              .concat(r, ', ')
              .concat(n, '%, ')
              .concat(a, '%, ')
              .concat(this.roundA, ')')
      }),
      (t.prototype.toHex = function(e) {
        return e === void 0 && (e = !1), I(this.r, this.g, this.b, e)
      }),
      (t.prototype.toHexString = function(e) {
        return e === void 0 && (e = !1), '#' + this.toHex(e)
      }),
      (t.prototype.toHex8 = function(e) {
        return e === void 0 && (e = !1), Rt(this.r, this.g, this.b, this.a, e)
      }),
      (t.prototype.toHex8String = function(e) {
        return e === void 0 && (e = !1), '#' + this.toHex8(e)
      }),
      (t.prototype.toHexShortString = function(e) {
        return (
          e === void 0 && (e = !1),
          this.a === 1 ? this.toHexString(e) : this.toHex8String(e)
        )
      }),
      (t.prototype.toRgb = function() {
        return {
          r: Math.round(this.r),
          g: Math.round(this.g),
          b: Math.round(this.b),
          a: this.a
        }
      }),
      (t.prototype.toRgbString = function() {
        var e = Math.round(this.r),
          r = Math.round(this.g),
          n = Math.round(this.b)
        return this.a === 1
          ? 'rgb('
              .concat(e, ', ')
              .concat(r, ', ')
              .concat(n, ')')
          : 'rgba('
              .concat(e, ', ')
              .concat(r, ', ')
              .concat(n, ', ')
              .concat(this.roundA, ')')
      }),
      (t.prototype.toPercentageRgb = function() {
        var e = function(r) {
          return ''.concat(Math.round(s(r, 255) * 100), '%')
        }
        return { r: e(this.r), g: e(this.g), b: e(this.b), a: this.a }
      }),
      (t.prototype.toPercentageRgbString = function() {
        var e = function(r) {
          return Math.round(s(r, 255) * 100)
        }
        return this.a === 1
          ? 'rgb('
              .concat(e(this.r), '%, ')
              .concat(e(this.g), '%, ')
              .concat(e(this.b), '%)')
          : 'rgba('
              .concat(e(this.r), '%, ')
              .concat(e(this.g), '%, ')
              .concat(e(this.b), '%, ')
              .concat(this.roundA, ')')
      }),
      (t.prototype.toName = function() {
        if (this.a === 0) return 'transparent'
        if (this.a < 1) return !1
        for (
          var e = '#' + I(this.r, this.g, this.b, !1),
            r = 0,
            n = Object.entries(_);
          r < n.length;
          r++
        ) {
          var a = n[r],
            i = a[0],
            o = a[1]
          if (e === o) return i
        }
        return !1
      }),
      (t.prototype.toString = function(e) {
        var r = !!e
        e = e ?? this.format
        var n = !1,
          a = this.a < 1 && this.a >= 0,
          i = !r && a && (e.startsWith('hex') || e === 'name')
        return i
          ? e === 'name' && this.a === 0
            ? this.toName()
            : this.toRgbString()
          : (e === 'rgb' && (n = this.toRgbString()),
            e === 'prgb' && (n = this.toPercentageRgbString()),
            (e === 'hex' || e === 'hex6') && (n = this.toHexString()),
            e === 'hex3' && (n = this.toHexString(!0)),
            e === 'hex4' && (n = this.toHex8String(!0)),
            e === 'hex8' && (n = this.toHex8String()),
            e === 'name' && (n = this.toName()),
            e === 'hsl' && (n = this.toHslString()),
            e === 'hsv' && (n = this.toHsvString()),
            n || this.toHexString())
      }),
      (t.prototype.toNumber = function() {
        return (
          (Math.round(this.r) << 16) +
          (Math.round(this.g) << 8) +
          Math.round(this.b)
        )
      }),
      (t.prototype.clone = function() {
        return new t(this.toString())
      }),
      (t.prototype.lighten = function(e) {
        e === void 0 && (e = 10)
        var r = this.toHsl()
        return (r.l += e / 100), (r.l = H(r.l)), new t(r)
      }),
      (t.prototype.brighten = function(e) {
        e === void 0 && (e = 10)
        var r = this.toRgb()
        return (
          (r.r = Math.max(
            0,
            Math.min(255, r.r - Math.round(255 * -(e / 100)))
          )),
          (r.g = Math.max(
            0,
            Math.min(255, r.g - Math.round(255 * -(e / 100)))
          )),
          (r.b = Math.max(
            0,
            Math.min(255, r.b - Math.round(255 * -(e / 100)))
          )),
          new t(r)
        )
      }),
      (t.prototype.darken = function(e) {
        e === void 0 && (e = 10)
        var r = this.toHsl()
        return (r.l -= e / 100), (r.l = H(r.l)), new t(r)
      }),
      (t.prototype.tint = function(e) {
        return e === void 0 && (e = 10), this.mix('white', e)
      }),
      (t.prototype.shade = function(e) {
        return e === void 0 && (e = 10), this.mix('black', e)
      }),
      (t.prototype.desaturate = function(e) {
        e === void 0 && (e = 10)
        var r = this.toHsl()
        return (r.s -= e / 100), (r.s = H(r.s)), new t(r)
      }),
      (t.prototype.saturate = function(e) {
        e === void 0 && (e = 10)
        var r = this.toHsl()
        return (r.s += e / 100), (r.s = H(r.s)), new t(r)
      }),
      (t.prototype.greyscale = function() {
        return this.desaturate(100)
      }),
      (t.prototype.spin = function(e) {
        var r = this.toHsl(),
          n = (r.h + e) % 360
        return (r.h = n < 0 ? 360 + n : n), new t(r)
      }),
      (t.prototype.mix = function(e, r) {
        r === void 0 && (r = 50)
        var n = this.toRgb(),
          a = new t(e).toRgb(),
          i = r / 100,
          o = {
            r: (a.r - n.r) * i + n.r,
            g: (a.g - n.g) * i + n.g,
            b: (a.b - n.b) * i + n.b,
            a: (a.a - n.a) * i + n.a
          }
        return new t(o)
      }),
      (t.prototype.analogous = function(e, r) {
        e === void 0 && (e = 6), r === void 0 && (r = 30)
        var n = this.toHsl(),
          a = 360 / r,
          i = [this]
        for (n.h = (n.h - ((a * e) >> 1) + 720) % 360; --e; )
          (n.h = (n.h + a) % 360), i.push(new t(n))
        return i
      }),
      (t.prototype.complement = function() {
        var e = this.toHsl()
        return (e.h = (e.h + 180) % 360), new t(e)
      }),
      (t.prototype.monochromatic = function(e) {
        e === void 0 && (e = 6)
        for (
          var r = this.toHsv(), n = r.h, a = r.s, i = r.v, o = [], c = 1 / e;
          e--;

        )
          o.push(new t({ h: n, s: a, v: i })), (i = (i + c) % 1)
        return o
      }),
      (t.prototype.splitcomplement = function() {
        var e = this.toHsl(),
          r = e.h
        return [
          this,
          new t({ h: (r + 72) % 360, s: e.s, l: e.l }),
          new t({ h: (r + 216) % 360, s: e.s, l: e.l })
        ]
      }),
      (t.prototype.onBackground = function(e) {
        var r = this.toRgb(),
          n = new t(e).toRgb(),
          a = r.a + n.a * (1 - r.a)
        return new t({
          r: (r.r * r.a + n.r * n.a * (1 - r.a)) / a,
          g: (r.g * r.a + n.g * n.a * (1 - r.a)) / a,
          b: (r.b * r.a + n.b * n.a * (1 - r.a)) / a,
          a
        })
      }),
      (t.prototype.triad = function() {
        return this.polyad(3)
      }),
      (t.prototype.tetrad = function() {
        return this.polyad(4)
      }),
      (t.prototype.polyad = function(e) {
        for (
          var r = this.toHsl(), n = r.h, a = [this], i = 360 / e, o = 1;
          o < e;
          o++
        )
          a.push(new t({ h: (n + o * i) % 360, s: r.s, l: r.l }))
        return a
      }),
      (t.prototype.equals = function(e) {
        return this.toRgbString() === new t(e).toRgbString()
      }),
      t
    )
  })(),
  P = 2,
  nt = 0.16,
  Wt = 0.05,
  Ut = 0.05,
  Qt = 0.15,
  xt = 5,
  Ct = 4,
  Gt = [
    { index: 7, opacity: 0.15 },
    { index: 6, opacity: 0.25 },
    { index: 5, opacity: 0.3 },
    { index: 5, opacity: 0.45 },
    { index: 5, opacity: 0.65 },
    { index: 5, opacity: 0.85 },
    { index: 4, opacity: 0.9 },
    { index: 3, opacity: 0.95 },
    { index: 2, opacity: 0.97 },
    { index: 1, opacity: 0.98 }
  ]
function at(t) {
  var e = t.r,
    r = t.g,
    n = t.b,
    a = R(e, r, n)
  return { h: a.h * 360, s: a.s, v: a.v }
}
function j(t) {
  var e = t.r,
    r = t.g,
    n = t.b
  return '#'.concat(I(e, r, n, !1))
}
function Zt(t, e, r) {
  var n = r / 100,
    a = {
      r: (e.r - t.r) * n + t.r,
      g: (e.g - t.g) * n + t.g,
      b: (e.b - t.b) * n + t.b
    }
  return a
}
function it(t, e, r) {
  var n
  return (
    Math.round(t.h) >= 60 && Math.round(t.h) <= 240
      ? (n = r ? Math.round(t.h) - P * e : Math.round(t.h) + P * e)
      : (n = r ? Math.round(t.h) + P * e : Math.round(t.h) - P * e),
    n < 0 ? (n += 360) : n >= 360 && (n -= 360),
    n
  )
}
function ot(t, e, r) {
  if (t.h === 0 && t.s === 0) return t.s
  var n
  return (
    r ? (n = t.s - nt * e) : e === Ct ? (n = t.s + nt) : (n = t.s + Wt * e),
    n > 1 && (n = 1),
    r && e === xt && n > 0.1 && (n = 0.1),
    n < 0.06 && (n = 0.06),
    Number(n.toFixed(2))
  )
}
function ct(t, e, r) {
  var n
  return (
    r ? (n = t.v + Ut * e) : (n = t.v - Qt * e),
    n > 1 && (n = 1),
    Number(n.toFixed(2))
  )
}
function D(t) {
  for (
    var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
      r = [],
      n = O(t),
      a = xt;
    a > 0;
    a -= 1
  ) {
    var i = at(n),
      o = j(O({ h: it(i, a, !0), s: ot(i, a, !0), v: ct(i, a, !0) }))
    r.push(o)
  }
  r.push(j(n))
  for (var c = 1; c <= Ct; c += 1) {
    var l = at(n),
      u = j(O({ h: it(l, c), s: ot(l, c), v: ct(l, c) }))
    r.push(u)
  }
  return e.theme === 'dark'
    ? Gt.map(function(m) {
        var y = m.index,
          z = m.opacity,
          k = j(Zt(O(e.backgroundColor || '#141414'), O(r[y]), z * 100))
        return k
      })
    : r
}
var V = {
    red: '#F5222D',
    volcano: '#FA541C',
    orange: '#FA8C16',
    gold: '#FAAD14',
    yellow: '#FADB14',
    lime: '#A0D911',
    green: '#52C41A',
    cyan: '#13C2C2',
    blue: '#1890FF',
    geekblue: '#2F54EB',
    purple: '#722ED1',
    magenta: '#EB2F96',
    grey: '#666666'
  },
  C = {},
  $ = {}
Object.keys(V).forEach(function(t) {
  ;(C[t] = D(V[t])),
    (C[t].primary = C[t][5]),
    ($[t] = D(V[t], { theme: 'dark', backgroundColor: '#141414' })),
    ($[t].primary = $[t][5])
})
var jr = C.gold,
  Lr = C.blue,
  Yt = {
    icon: {
      tag: 'svg',
      attrs: { viewBox: '64 64 896 896', focusable: 'false' },
      children: [
        {
          tag: 'path',
          attrs: {
            d:
              'M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z'
          }
        }
      ]
    },
    name: 'down',
    theme: 'outlined'
  }
const kr = Yt
var Jt = {
  icon: {
    tag: 'svg',
    attrs: { viewBox: '0 0 1024 1024', focusable: 'false' },
    children: [
      {
        tag: 'path',
        attrs: {
          d:
            'M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z'
        }
      }
    ]
  },
  name: 'loading',
  theme: 'outlined'
}
const Er = Jt
var Xt = {
  icon: {
    tag: 'svg',
    attrs: { viewBox: '64 64 896 896', focusable: 'false' },
    children: [
      {
        tag: 'path',
        attrs: {
          d:
            'M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 00-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z'
        }
      }
    ]
  },
  name: 'check',
  theme: 'outlined'
}
const Kt = Xt
var te = {
  icon: {
    tag: 'svg',
    attrs: { viewBox: '64 64 896 896', focusable: 'false' },
    children: [
      {
        tag: 'path',
        attrs: {
          d:
            'M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z'
        }
      }
    ]
  },
  name: 'close',
  theme: 'outlined'
}
const Tr = te
var ee = {
  icon: {
    tag: 'svg',
    attrs: { viewBox: '64 64 896 896', focusable: 'false' },
    children: [
      {
        tag: 'path',
        attrs: {
          d:
            'M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z'
        }
      }
    ]
  },
  name: 'close-circle',
  theme: 'filled'
}
const Br = ee
var re = {
  icon: {
    tag: 'svg',
    attrs: { viewBox: '64 64 896 896', focusable: 'false' },
    children: [
      {
        tag: 'path',
        attrs: {
          d:
            'M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0011.6 0l43.6-43.5a8.2 8.2 0 000-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z'
        }
      }
    ]
  },
  name: 'search',
  theme: 'outlined'
}
const Fr = re
var ne = {
  icon: {
    tag: 'svg',
    attrs: { viewBox: '64 64 896 896', focusable: 'false' },
    children: [
      {
        tag: 'path',
        attrs: {
          d:
            'M699 353h-46.9c-10.2 0-19.9 4.9-25.9 13.3L469 584.3l-71.2-98.8c-6-8.3-15.6-13.3-25.9-13.3H325c-6.5 0-10.3 7.4-6.5 12.7l124.6 172.8a31.8 31.8 0 0051.7 0l210.6-292c3.9-5.3.1-12.7-6.4-12.7z'
        }
      },
      {
        tag: 'path',
        attrs: {
          d:
            'M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z'
        }
      }
    ]
  },
  name: 'check-circle',
  theme: 'outlined'
}
const Vr = ne
var ae = {
  icon: {
    tag: 'svg',
    attrs: { viewBox: '64 64 896 896', focusable: 'false' },
    children: [
      {
        tag: 'path',
        attrs: {
          d:
            'M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z'
        }
      },
      {
        tag: 'path',
        attrs: {
          d:
            'M464 688a48 48 0 1096 0 48 48 0 10-96 0zm24-112h48c4.4 0 8-3.6 8-8V296c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8z'
        }
      }
    ]
  },
  name: 'exclamation-circle',
  theme: 'outlined'
}
const $r = ae
var ie = {
  icon: {
    tag: 'svg',
    attrs: { viewBox: '64 64 896 896', focusable: 'false' },
    children: [
      {
        tag: 'path',
        attrs: {
          d:
            'M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z'
        }
      },
      {
        tag: 'path',
        attrs: {
          d:
            'M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z'
        }
      }
    ]
  },
  name: 'info-circle',
  theme: 'outlined'
}
const Rr = ie
var oe = {
  icon: {
    tag: 'svg',
    attrs: { viewBox: '64 64 896 896', focusable: 'false' },
    children: [
      {
        tag: 'path',
        attrs: {
          d:
            'M685.4 354.8c0-4.4-3.6-8-8-8l-66 .3L512 465.6l-99.3-118.4-66.1-.3c-4.4 0-8 3.5-8 8 0 1.9.7 3.7 1.9 5.2l130.1 155L340.5 670a8.32 8.32 0 00-1.9 5.2c0 4.4 3.6 8 8 8l66.1-.3L512 564.4l99.3 118.4 66 .3c4.4 0 8-3.5 8-8 0-1.9-.7-3.7-1.9-5.2L553.5 515l130.1-155c1.2-1.4 1.8-3.3 1.8-5.2z'
        }
      },
      {
        tag: 'path',
        attrs: {
          d:
            'M512 65C264.6 65 64 265.6 64 513s200.6 448 448 448 448-200.6 448-448S759.4 65 512 65zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z'
        }
      }
    ]
  },
  name: 'close-circle',
  theme: 'outlined'
}
const Ir = oe
var ce = {
  icon: {
    tag: 'svg',
    attrs: { viewBox: '64 64 896 896', focusable: 'false' },
    children: [
      {
        tag: 'path',
        attrs: {
          d:
            'M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z'
        }
      }
    ]
  },
  name: 'check-circle',
  theme: 'filled'
}
const _r = ce
var le = {
  icon: {
    tag: 'svg',
    attrs: { viewBox: '64 64 896 896', focusable: 'false' },
    children: [
      {
        tag: 'path',
        attrs: {
          d:
            'M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z'
        }
      }
    ]
  },
  name: 'exclamation-circle',
  theme: 'filled'
}
const Dr = le
var se = {
  icon: {
    tag: 'svg',
    attrs: { viewBox: '64 64 896 896', focusable: 'false' },
    children: [
      {
        tag: 'path',
        attrs: {
          d:
            'M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 010-96 48.01 48.01 0 010 96z'
        }
      }
    ]
  },
  name: 'info-circle',
  theme: 'filled'
}
const qr = se
var ue = {
  icon: {
    tag: 'svg',
    attrs: { viewBox: '64 64 896 896', focusable: 'false' },
    children: [
      {
        tag: 'path',
        attrs: {
          d:
            'M176 511a56 56 0 10112 0 56 56 0 10-112 0zm280 0a56 56 0 10112 0 56 56 0 10-112 0zm280 0a56 56 0 10112 0 56 56 0 10-112 0z'
        }
      }
    ]
  },
  name: 'ellipsis',
  theme: 'outlined'
}
const Nr = ue
var fe = {
  icon: {
    tag: 'svg',
    attrs: { viewBox: '64 64 896 896', focusable: 'false' },
    children: [
      {
        tag: 'path',
        attrs: {
          d:
            'M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z'
        }
      }
    ]
  },
  name: 'right',
  theme: 'outlined'
}
const Wr = fe
var he = {
  icon: {
    tag: 'svg',
    attrs: { viewBox: '64 64 896 896', focusable: 'false' },
    children: [
      { tag: 'defs', attrs: {}, children: [{ tag: 'style', attrs: {} }] },
      {
        tag: 'path',
        attrs: {
          d: 'M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z'
        }
      },
      {
        tag: 'path',
        attrs: {
          d: 'M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z'
        }
      }
    ]
  },
  name: 'plus',
  theme: 'outlined'
}
const de = he
var ge = {
  icon: {
    tag: 'svg',
    attrs: { viewBox: '64 64 896 896', focusable: 'false' },
    children: [
      {
        tag: 'path',
        attrs: {
          d:
            'M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 000 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z'
        }
      }
    ]
  },
  name: 'left',
  theme: 'outlined'
}
const Ur = ge
var ve = {
  icon: {
    tag: 'svg',
    attrs: { viewBox: '64 64 896 896', focusable: 'false' },
    children: [
      {
        tag: 'path',
        attrs: {
          d:
            'M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z'
        }
      },
      {
        tag: 'path',
        attrs: {
          d:
            'M623.6 316.7C593.6 290.4 554 276 512 276s-81.6 14.5-111.6 40.7C369.2 344 352 380.7 352 420v7.6c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V420c0-44.1 43.1-80 96-80s96 35.9 96 80c0 31.1-22 59.6-56.1 72.7-21.2 8.1-39.2 22.3-52.1 40.9-13.1 19-19.9 41.8-19.9 64.9V620c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8v-22.7a48.3 48.3 0 0130.9-44.8c59-22.7 97.1-74.7 97.1-132.5.1-39.3-17.1-76-48.3-103.3zM472 732a40 40 0 1080 0 40 40 0 10-80 0z'
        }
      }
    ]
  },
  name: 'question-circle',
  theme: 'outlined'
}
const Qr = ve
var pe = {
  icon: {
    tag: 'svg',
    attrs: { viewBox: '64 64 896 896', focusable: 'false' },
    children: [
      {
        tag: 'path',
        attrs: {
          d:
            'M880 184H712v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H384v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H144c-17.7 0-32 14.3-32 32v664c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V216c0-17.7-14.3-32-32-32zm-40 656H184V460h656v380zM184 392V256h128v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h256v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h128v136H184z'
        }
      }
    ]
  },
  name: 'calendar',
  theme: 'outlined'
}
const Gr = pe
var be = {
  icon: {
    tag: 'svg',
    attrs: { viewBox: '64 64 896 896', focusable: 'false' },
    children: [
      {
        tag: 'path',
        attrs: {
          d:
            'M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z'
        }
      },
      {
        tag: 'path',
        attrs: {
          d:
            'M686.7 638.6L544.1 535.5V288c0-4.4-3.6-8-8-8H488c-4.4 0-8 3.6-8 8v275.4c0 2.6 1.2 5 3.3 6.5l165.4 120.6c3.6 2.6 8.6 1.8 11.2-1.7l28.6-39c2.6-3.7 1.8-8.7-1.8-11.2z'
        }
      }
    ]
  },
  name: 'clock-circle',
  theme: 'outlined'
}
const Zr = be
var me = {
  icon: {
    tag: 'svg',
    attrs: { viewBox: '0 0 1024 1024', focusable: 'false' },
    children: [
      {
        tag: 'path',
        attrs: {
          d:
            'M873.1 596.2l-164-208A32 32 0 00684 376h-64.8c-6.7 0-10.4 7.7-6.3 13l144.3 183H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h695.9c26.8 0 41.7-30.8 25.2-51.8z'
        }
      }
    ]
  },
  name: 'swap-right',
  theme: 'outlined'
}
const Yr = me
var ye = {
  icon: {
    tag: 'svg',
    attrs: { viewBox: '64 64 896 896', focusable: 'false' },
    children: [
      {
        tag: 'path',
        attrs: {
          d:
            'M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z'
        }
      }
    ]
  },
  name: 'eye',
  theme: 'outlined'
}
const Oe = ye
var Se = {
  icon: {
    tag: 'svg',
    attrs: { viewBox: '64 64 896 896', focusable: 'false' },
    children: [
      {
        tag: 'path',
        attrs: {
          d:
            'M942.2 486.2Q889.47 375.11 816.7 305l-50.88 50.88C807.31 395.53 843.45 447.4 874.7 512 791.5 684.2 673.4 766 512 766q-72.67 0-133.87-22.38L323 798.75Q408 838 512 838q288.3 0 430.2-300.3a60.29 60.29 0 000-51.5zm-63.57-320.64L836 122.88a8 8 0 00-11.32 0L715.31 232.2Q624.86 186 512 186q-288.3 0-430.2 300.3a60.3 60.3 0 000 51.5q56.69 119.4 136.5 191.41L112.48 835a8 8 0 000 11.31L155.17 889a8 8 0 0011.31 0l712.15-712.12a8 8 0 000-11.32zM149.3 512C232.6 339.8 350.7 258 512 258c54.54 0 104.13 9.36 149.12 28.39l-70.3 70.3a176 176 0 00-238.13 238.13l-83.42 83.42C223.1 637.49 183.3 582.28 149.3 512zm246.7 0a112.11 112.11 0 01146.2-106.69L401.31 546.2A112 112 0 01396 512z'
        }
      },
      {
        tag: 'path',
        attrs: {
          d:
            'M508 624c-3.46 0-6.87-.16-10.25-.47l-52.82 52.82a176.09 176.09 0 00227.42-227.42l-52.82 52.82c.31 3.38.47 6.79.47 10.25a111.94 111.94 0 01-112 112z'
        }
      }
    ]
  },
  name: 'eye-invisible',
  theme: 'outlined'
}
const Jr = Se
var we = {
  icon: {
    tag: 'svg',
    attrs: { viewBox: '64 64 896 896', focusable: 'false' },
    children: [
      { tag: 'defs', attrs: {}, children: [{ tag: 'style', attrs: {} }] },
      {
        tag: 'path',
        attrs: {
          d:
            'M672 418H144c-17.7 0-32 14.3-32 32v414c0 17.7 14.3 32 32 32h528c17.7 0 32-14.3 32-32V450c0-17.7-14.3-32-32-32zm-44 402H188V494h440v326z'
        }
      },
      {
        tag: 'path',
        attrs: {
          d:
            'M819.3 328.5c-78.8-100.7-196-153.6-314.6-154.2l-.2-64c0-6.5-7.6-10.1-12.6-6.1l-128 101c-4 3.1-3.9 9.1 0 12.3L492 318.6c5.1 4 12.7.4 12.6-6.1v-63.9c12.9.1 25.9.9 38.8 2.5 42.1 5.2 82.1 18.2 119 38.7 38.1 21.2 71.2 49.7 98.4 84.3 27.1 34.7 46.7 73.7 58.1 115.8a325.95 325.95 0 016.5 140.9h74.9c14.8-103.6-11.3-213-81-302.3z'
        }
      }
    ]
  },
  name: 'rotate-left',
  theme: 'outlined'
}
const Xr = we
var xe = {
  icon: {
    tag: 'svg',
    attrs: { viewBox: '64 64 896 896', focusable: 'false' },
    children: [
      { tag: 'defs', attrs: {}, children: [{ tag: 'style', attrs: {} }] },
      {
        tag: 'path',
        attrs: {
          d:
            'M480.5 251.2c13-1.6 25.9-2.4 38.8-2.5v63.9c0 6.5 7.5 10.1 12.6 6.1L660 217.6c4-3.2 4-9.2 0-12.3l-128-101c-5.1-4-12.6-.4-12.6 6.1l-.2 64c-118.6.5-235.8 53.4-314.6 154.2A399.75 399.75 0 00123.5 631h74.9c-.9-5.3-1.7-10.7-2.4-16.1-5.1-42.1-2.1-84.1 8.9-124.8 11.4-42.2 31-81.1 58.1-115.8 27.2-34.7 60.3-63.2 98.4-84.3 37-20.6 76.9-33.6 119.1-38.8z'
        }
      },
      {
        tag: 'path',
        attrs: {
          d:
            'M880 418H352c-17.7 0-32 14.3-32 32v414c0 17.7 14.3 32 32 32h528c17.7 0 32-14.3 32-32V450c0-17.7-14.3-32-32-32zm-44 402H396V494h440v326z'
        }
      }
    ]
  },
  name: 'rotate-right',
  theme: 'outlined'
}
const Kr = xe
var Ce = {
  icon: {
    tag: 'svg',
    attrs: { viewBox: '64 64 896 896', focusable: 'false' },
    children: [
      {
        tag: 'path',
        attrs: {
          d:
            'M637 443H519V309c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v134H325c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h118v134c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V519h118c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8zm284 424L775 721c122.1-148.9 113.6-369.5-26-509-148-148.1-388.4-148.1-537 0-148.1 148.6-148.1 389 0 537 139.5 139.6 360.1 148.1 509 26l146 146c3.2 2.8 8.3 2.8 11 0l43-43c2.8-2.7 2.8-7.8 0-11zM696 696c-118.8 118.7-311.2 118.7-430 0-118.7-118.8-118.7-311.2 0-430 118.8-118.7 311.2-118.7 430 0 118.7 118.8 118.7 311.2 0 430z'
        }
      }
    ]
  },
  name: 'zoom-in',
  theme: 'outlined'
}
const tn = Ce
var Me = {
  icon: {
    tag: 'svg',
    attrs: { viewBox: '64 64 896 896', focusable: 'false' },
    children: [
      {
        tag: 'path',
        attrs: {
          d:
            'M637 443H325c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h312c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8zm284 424L775 721c122.1-148.9 113.6-369.5-26-509-148-148.1-388.4-148.1-537 0-148.1 148.6-148.1 389 0 537 139.5 139.6 360.1 148.1 509 26l146 146c3.2 2.8 8.3 2.8 11 0l43-43c2.8-2.7 2.8-7.8 0-11zM696 696c-118.8 118.7-311.2 118.7-430 0-118.7-118.8-118.7-311.2 0-430 118.8-118.7 311.2-118.7 430 0 118.7 118.8 118.7 311.2 0 430z'
        }
      }
    ]
  },
  name: 'zoom-out',
  theme: 'outlined'
}
const en = Me
var ze = {
  icon: {
    tag: 'svg',
    attrs: { viewBox: '64 64 896 896', focusable: 'false' },
    children: [
      {
        tag: 'path',
        attrs: {
          d:
            'M847.9 592H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h605.2L612.9 851c-4.1 5.2-.4 13 6.3 13h72.5c4.9 0 9.5-2.2 12.6-6.1l168.8-214.1c16.5-21 1.6-51.8-25.2-51.8zM872 356H266.8l144.3-183c4.1-5.2.4-13-6.3-13h-72.5c-4.9 0-9.5 2.2-12.6 6.1L150.9 380.2c-16.5 21-1.6 51.8 25.1 51.8h696c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z'
        }
      }
    ]
  },
  name: 'swap',
  theme: 'outlined'
}
const rn = ze
var He = {
  icon: {
    tag: 'svg',
    attrs: { viewBox: '64 64 896 896', focusable: 'false' },
    children: [
      {
        tag: 'path',
        attrs: {
          d:
            'M890.5 755.3L537.9 269.2c-12.8-17.6-39-17.6-51.7 0L133.5 755.3A8 8 0 00140 768h75c5.1 0 9.9-2.5 12.9-6.6L512 369.8l284.1 391.6c3 4.1 7.8 6.6 12.9 6.6h75c6.5 0 10.3-7.4 6.5-12.7z'
        }
      }
    ]
  },
  name: 'up',
  theme: 'outlined'
}
const nn = He
var Ae = {
  icon: {
    tag: 'svg',
    attrs: { viewBox: '64 64 896 896', focusable: 'false' },
    children: [
      {
        tag: 'path',
        attrs: {
          d:
            'M272.9 512l265.4-339.1c4.1-5.2.4-12.9-6.3-12.9h-77.3c-4.9 0-9.6 2.3-12.6 6.1L186.8 492.3a31.99 31.99 0 000 39.5l255.3 326.1c3 3.9 7.7 6.1 12.6 6.1H532c6.7 0 10.4-7.7 6.3-12.9L272.9 512zm304 0l265.4-339.1c4.1-5.2.4-12.9-6.3-12.9h-77.3c-4.9 0-9.6 2.3-12.6 6.1L490.8 492.3a31.99 31.99 0 000 39.5l255.3 326.1c3 3.9 7.7 6.1 12.6 6.1H836c6.7 0 10.4-7.7 6.3-12.9L576.9 512z'
        }
      }
    ]
  },
  name: 'double-left',
  theme: 'outlined'
}
const an = Ae
var Pe = {
  icon: {
    tag: 'svg',
    attrs: { viewBox: '64 64 896 896', focusable: 'false' },
    children: [
      {
        tag: 'path',
        attrs: {
          d:
            'M533.2 492.3L277.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H188c-6.7 0-10.4 7.7-6.3 12.9L447.1 512 181.7 851.1A7.98 7.98 0 00188 864h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.1c9.1-11.7 9.1-27.9 0-39.5zm304 0L581.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H492c-6.7 0-10.4 7.7-6.3 12.9L751.1 512 485.7 851.1A7.98 7.98 0 00492 864h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.1c9.1-11.7 9.1-27.9 0-39.5z'
        }
      }
    ]
  },
  name: 'double-right',
  theme: 'outlined'
}
const on = Pe
var je = {
  icon: {
    tag: 'svg',
    attrs: { viewBox: '0 0 1024 1024', focusable: 'false' },
    children: [
      {
        tag: 'path',
        attrs: {
          d:
            'M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z'
        }
      }
    ]
  },
  name: 'caret-down',
  theme: 'outlined'
}
const cn = je
var Le = {
  icon: {
    tag: 'svg',
    attrs: { viewBox: '0 0 1024 1024', focusable: 'false' },
    children: [
      {
        tag: 'path',
        attrs: {
          d:
            'M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z'
        }
      }
    ]
  },
  name: 'caret-up',
  theme: 'outlined'
}
const ln = Le
var ke = {
  icon: {
    tag: 'svg',
    attrs: { viewBox: '64 64 896 896', focusable: 'false' },
    children: [
      {
        tag: 'path',
        attrs: {
          d:
            'M349 838c0 17.7 14.2 32 31.8 32h262.4c17.6 0 31.8-14.3 31.8-32V642H349v196zm531.1-684H143.9c-24.5 0-39.8 26.7-27.5 48l221.3 376h348.8l221.3-376c12.1-21.3-3.2-48-27.7-48z'
        }
      }
    ]
  },
  name: 'filter',
  theme: 'filled'
}
const sn = ke
var Ee = {
  icon: {
    tag: 'svg',
    attrs: { viewBox: '64 64 896 896', focusable: 'false' },
    children: [
      {
        tag: 'path',
        attrs: {
          d:
            'M854.6 288.6L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM790.2 326H602V137.8L790.2 326zm1.8 562H232V136h302v216a42 42 0 0042 42h216v494z'
        }
      }
    ]
  },
  name: 'file',
  theme: 'outlined'
}
const un = Ee
var Te = {
  icon: {
    tag: 'svg',
    attrs: { viewBox: '64 64 896 896', focusable: 'false' },
    children: [
      {
        tag: 'path',
        attrs: {
          d:
            'M328 544h368c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H328c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8z'
        }
      },
      {
        tag: 'path',
        attrs: {
          d:
            'M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 728H184V184h656v656z'
        }
      }
    ]
  },
  name: 'minus-square',
  theme: 'outlined'
}
const fn = Te
var Be = {
  icon: {
    tag: 'svg',
    attrs: { viewBox: '64 64 896 896', focusable: 'false' },
    children: [
      {
        tag: 'path',
        attrs: {
          d:
            'M328 544h152v152c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V544h152c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H544V328c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v152H328c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8z'
        }
      },
      {
        tag: 'path',
        attrs: {
          d:
            'M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 728H184V184h656v656z'
        }
      }
    ]
  },
  name: 'plus-square',
  theme: 'outlined'
}
const hn = Be
var Fe = {
  icon: {
    tag: 'svg',
    attrs: { viewBox: '0 0 1024 1024', focusable: 'false' },
    children: [
      {
        tag: 'path',
        attrs: {
          d:
            'M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z'
        }
      }
    ]
  },
  name: 'caret-down',
  theme: 'filled'
}
const dn = Fe
var Ve = {
  icon: {
    tag: 'svg',
    attrs: { viewBox: '64 64 896 896', focusable: 'false' },
    children: [
      {
        tag: 'path',
        attrs: {
          d:
            'M928 444H820V330.4c0-17.7-14.3-32-32-32H473L355.7 186.2a8.15 8.15 0 00-5.5-2.2H96c-17.7 0-32 14.3-32 32v592c0 17.7 14.3 32 32 32h698c13 0 24.8-7.9 29.7-20l134-332c1.5-3.8 2.3-7.9 2.3-12 0-17.7-14.3-32-32-32zM136 256h188.5l119.6 114.4H748V444H238c-13 0-24.8 7.9-29.7 20L136 643.2V256zm635.3 512H159l103.3-256h612.4L771.3 768z'
        }
      }
    ]
  },
  name: 'folder-open',
  theme: 'outlined'
}
const gn = Ve
var $e = {
  icon: {
    tag: 'svg',
    attrs: { viewBox: '64 64 896 896', focusable: 'false' },
    children: [
      {
        tag: 'path',
        attrs: {
          d:
            'M880 298.4H521L403.7 186.2a8.15 8.15 0 00-5.5-2.2H144c-17.7 0-32 14.3-32 32v592c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V330.4c0-17.7-14.3-32-32-32zM840 768H184V256h188.5l119.6 114.4H840V768z'
        }
      }
    ]
  },
  name: 'folder',
  theme: 'outlined'
}
const vn = $e
var Re = {
  icon: {
    tag: 'svg',
    attrs: { viewBox: '64 64 896 896', focusable: 'false' },
    children: [
      {
        tag: 'path',
        attrs: {
          d:
            'M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z'
        }
      }
    ]
  },
  name: 'delete',
  theme: 'outlined'
}
const Ie = Re
var _e = {
  icon: {
    tag: 'svg',
    attrs: { viewBox: '64 64 896 896', focusable: 'false' },
    children: [
      {
        tag: 'path',
        attrs: {
          d:
            'M864 170h-60c-4.4 0-8 3.6-8 8v518H310v-73c0-6.7-7.8-10.5-13-6.3l-141.9 112a8 8 0 000 12.6l141.9 112c5.3 4.2 13 .4 13-6.3v-75h498c35.3 0 64-28.7 64-64V178c0-4.4-3.6-8-8-8z'
        }
      }
    ]
  },
  name: 'enter',
  theme: 'outlined'
}
const pn = _e
var De = {
  icon: {
    tag: 'svg',
    attrs: { viewBox: '64 64 896 896', focusable: 'false' },
    children: [
      {
        tag: 'path',
        attrs: {
          d:
            'M832 64H296c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h496v688c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V96c0-17.7-14.3-32-32-32zM704 192H192c-17.7 0-32 14.3-32 32v530.7c0 8.5 3.4 16.6 9.4 22.6l173.3 173.3c2.2 2.2 4.7 4 7.4 5.5v1.9h4.2c3.5 1.3 7.2 2 11 2H704c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32zM350 856.2L263.9 770H350v86.2zM664 888H414V746c0-22.1-17.9-40-40-40H232V264h432v624z'
        }
      }
    ]
  },
  name: 'copy',
  theme: 'outlined'
}
const bn = De
var qe = {
  icon: {
    tag: 'svg',
    attrs: { viewBox: '64 64 896 896', focusable: 'false' },
    children: [
      {
        tag: 'path',
        attrs: {
          d:
            'M257.7 752c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 000-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 009.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9zm67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z'
        }
      }
    ]
  },
  name: 'edit',
  theme: 'outlined'
}
const Ne = qe
var We = {
  icon: {
    tag: 'svg',
    attrs: { viewBox: '64 64 896 896', focusable: 'false' },
    children: [
      {
        tag: 'path',
        attrs: {
          d:
            'M888.3 757.4h-53.8c-4.2 0-7.7 3.5-7.7 7.7v61.8H197.1V197.1h629.8v61.8c0 4.2 3.5 7.7 7.7 7.7h53.8c4.2 0 7.7-3.4 7.7-7.7V158.7c0-17-13.7-30.7-30.7-30.7H158.7c-17 0-30.7 13.7-30.7 30.7v706.6c0 17 13.7 30.7 30.7 30.7h706.6c17 0 30.7-13.7 30.7-30.7V765.1c0-4.3-3.5-7.7-7.7-7.7zm18.6-251.7L765 393.7c-5.3-4.2-13-.4-13 6.3v76H438c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h314v76c0 6.7 7.8 10.5 13 6.3l141.9-112a8 8 0 000-12.6z'
        }
      }
    ]
  },
  name: 'export',
  theme: 'outlined'
}
const Ue = We
var Qe = {
  icon: {
    tag: 'svg',
    attrs: { viewBox: '64 64 896 896', focusable: 'false' },
    children: [
      {
        tag: 'path',
        attrs: {
          d:
            'M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 708c-22.1 0-40-17.9-40-40s17.9-40 40-40 40 17.9 40 40-17.9 40-40 40zm62.9-219.5a48.3 48.3 0 00-30.9 44.8V620c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8v-21.5c0-23.1 6.7-45.9 19.9-64.9 12.9-18.6 30.9-32.8 52.1-40.9 34-13.1 56-41.6 56-72.7 0-44.1-43.1-80-96-80s-96 35.9-96 80v7.6c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V420c0-39.3 17.2-76 48.4-103.3C430.4 290.4 470 276 512 276s81.6 14.5 111.6 40.7C654.8 344 672 380.7 672 420c0 57.8-38.1 109.8-97.1 132.5z'
        }
      }
    ]
  },
  name: 'question-circle',
  theme: 'filled'
}
const Ge = Qe
var lt = [],
  x = [],
  Ze =
    'insert-css: You need to provide a CSS string. Usage: insertCss(cssString[, options]).'
function Ye() {
  var t = document.createElement('style')
  return t.setAttribute('type', 'text/css'), t
}
function Je(t, e) {
  if (((e = e || {}), t === void 0)) throw new Error(Ze)
  var r = e.prepend === !0 ? 'prepend' : 'append',
    n = e.container !== void 0 ? e.container : document.querySelector('head'),
    a = lt.indexOf(n)
  a === -1 && ((a = lt.push(n) - 1), (x[a] = {}))
  var i
  return (
    x[a] !== void 0 && x[a][r] !== void 0
      ? (i = x[a][r])
      : ((i = x[a][r] = Ye()),
        r === 'prepend'
          ? n.insertBefore(i, n.childNodes[0])
          : n.appendChild(i)),
    t.charCodeAt(0) === 65279 && (t = t.substr(1, t.length)),
    i.styleSheet ? (i.styleSheet.cssText += t) : (i.textContent += t),
    i
  )
}
function st(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? Object(arguments[e]) : {},
      n = Object.keys(r)
    typeof Object.getOwnPropertySymbols == 'function' &&
      (n = n.concat(
        Object.getOwnPropertySymbols(r).filter(function(a) {
          return Object.getOwnPropertyDescriptor(r, a).enumerable
        })
      )),
      n.forEach(function(a) {
        Xe(t, a, r[a])
      })
  }
  return t
}
function Xe(t, e, r) {
  return (
    e in t
      ? Object.defineProperty(t, e, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0
        })
      : (t[e] = r),
    t
  )
}
function ut(t) {
  return (
    typeof t == 'object' &&
    typeof t.name == 'string' &&
    typeof t.theme == 'string' &&
    (typeof t.icon == 'object' || typeof t.icon == 'function')
  )
}
function q(t, e, r) {
  return r
    ? tt(
        t.tag,
        st({ key: e }, r, t.attrs),
        (t.children || []).map(function(n, a) {
          return q(
            n,
            ''
              .concat(e, '-')
              .concat(t.tag, '-')
              .concat(a)
          )
        })
      )
    : tt(
        t.tag,
        st({ key: e }, t.attrs),
        (t.children || []).map(function(n, a) {
          return q(
            n,
            ''
              .concat(e, '-')
              .concat(t.tag, '-')
              .concat(a)
          )
        })
      )
}
function Mt(t) {
  return D(t)[0]
}
function zt(t) {
  return t ? (Array.isArray(t) ? t : [t]) : []
}
var Ke = `
.anticon {
  display: inline-block;
  color: inherit;
  font-style: normal;
  line-height: 0;
  text-align: center;
  text-transform: none;
  vertical-align: -0.125em;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.anticon > * {
  line-height: 1;
}

.anticon svg {
  display: inline-block;
}

.anticon::before {
  display: none;
}

.anticon .anticon-icon {
  display: block;
}

.anticon[tabindex] {
  cursor: pointer;
}

.anticon-spin::before,
.anticon-spin {
  display: inline-block;
  -webkit-animation: loadingCircle 1s infinite linear;
  animation: loadingCircle 1s infinite linear;
}

@-webkit-keyframes loadingCircle {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes loadingCircle {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
`,
  ft = !1,
  tr = function() {
    var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : Ke
    Et(function() {
      ft ||
        (typeof window < 'u' &&
          window.document &&
          window.document.documentElement &&
          Je(e, { prepend: !0 }),
        (ft = !0))
    })
  },
  er = ['icon', 'primaryColor', 'secondaryColor']
function rr(t, e) {
  if (t == null) return {}
  var r = nr(t, e),
    n,
    a
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(t)
    for (a = 0; a < i.length; a++)
      (n = i[a]),
        !(e.indexOf(n) >= 0) &&
          Object.prototype.propertyIsEnumerable.call(t, n) &&
          (r[n] = t[n])
  }
  return r
}
function nr(t, e) {
  if (t == null) return {}
  var r = {},
    n = Object.keys(t),
    a,
    i
  for (i = 0; i < n.length; i++)
    (a = n[i]), !(e.indexOf(a) >= 0) && (r[a] = t[a])
  return r
}
function L(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? Object(arguments[e]) : {},
      n = Object.keys(r)
    typeof Object.getOwnPropertySymbols == 'function' &&
      (n = n.concat(
        Object.getOwnPropertySymbols(r).filter(function(a) {
          return Object.getOwnPropertyDescriptor(r, a).enumerable
        })
      )),
      n.forEach(function(a) {
        ar(t, a, r[a])
      })
  }
  return t
}
function ar(t, e, r) {
  return (
    e in t
      ? Object.defineProperty(t, e, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0
        })
      : (t[e] = r),
    t
  )
}
var M = { primaryColor: '#333', secondaryColor: '#E6E6E6', calculated: !1 }
function ir(t) {
  var e = t.primaryColor,
    r = t.secondaryColor
  ;(M.primaryColor = e), (M.secondaryColor = r || Mt(e)), (M.calculated = !!r)
}
function or() {
  return L({}, M)
}
var S = function(e, r) {
  var n = L({}, e, r.attrs),
    a = n.icon,
    i = n.primaryColor,
    o = n.secondaryColor,
    c = rr(n, er),
    l = M
  if (
    (i && (l = { primaryColor: i, secondaryColor: o || Mt(i) }),
    tr(),
    ut(a),
    !ut(a))
  )
    return null
  var u = a
  return (
    u &&
      typeof u.icon == 'function' &&
      (u = L({}, u, { icon: u.icon(l.primaryColor, l.secondaryColor) })),
    q(
      u.icon,
      'svg-'.concat(u.name),
      L({}, c, {
        'data-icon': u.name,
        width: '1em',
        height: '1em',
        fill: 'currentColor',
        'aria-hidden': 'true'
      })
    )
  )
}
S.props = {
  icon: Object,
  primaryColor: String,
  secondaryColor: String,
  focusable: String
}
S.inheritAttrs = !1
S.displayName = 'IconBase'
S.getTwoToneColors = or
S.setTwoToneColors = ir
const W = S
function cr(t, e) {
  return fr(t) || ur(t, e) || sr(t, e) || lr()
}
function lr() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}
function sr(t, e) {
  if (t) {
    if (typeof t == 'string') return ht(t, e)
    var r = Object.prototype.toString.call(t).slice(8, -1)
    if (
      (r === 'Object' && t.constructor && (r = t.constructor.name),
      r === 'Map' || r === 'Set')
    )
      return Array.from(t)
    if (r === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
      return ht(t, e)
  }
}
function ht(t, e) {
  ;(e == null || e > t.length) && (e = t.length)
  for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r]
  return n
}
function ur(t, e) {
  var r =
    t == null
      ? null
      : (typeof Symbol < 'u' && t[Symbol.iterator]) || t['@@iterator']
  if (r != null) {
    var n = [],
      a = !0,
      i = !1,
      o,
      c
    try {
      for (
        r = r.call(t);
        !(a = (o = r.next()).done) && (n.push(o.value), !(e && n.length === e));
        a = !0
      );
    } catch (l) {
      ;(i = !0), (c = l)
    } finally {
      try {
        !a && r.return != null && r.return()
      } finally {
        if (i) throw c
      }
    }
    return n
  }
}
function fr(t) {
  if (Array.isArray(t)) return t
}
function Ht(t) {
  var e = zt(t),
    r = cr(e, 2),
    n = r[0],
    a = r[1]
  return W.setTwoToneColors({ primaryColor: n, secondaryColor: a })
}
function hr() {
  var t = W.getTwoToneColors()
  return t.calculated ? [t.primaryColor, t.secondaryColor] : t.primaryColor
}
var dr = [
  'class',
  'icon',
  'spin',
  'rotate',
  'tabindex',
  'twoToneColor',
  'onClick'
]
function gr(t, e) {
  return mr(t) || br(t, e) || pr(t, e) || vr()
}
function vr() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}
function pr(t, e) {
  if (t) {
    if (typeof t == 'string') return dt(t, e)
    var r = Object.prototype.toString.call(t).slice(8, -1)
    if (
      (r === 'Object' && t.constructor && (r = t.constructor.name),
      r === 'Map' || r === 'Set')
    )
      return Array.from(t)
    if (r === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
      return dt(t, e)
  }
}
function dt(t, e) {
  ;(e == null || e > t.length) && (e = t.length)
  for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r]
  return n
}
function br(t, e) {
  var r =
    t == null
      ? null
      : (typeof Symbol < 'u' && t[Symbol.iterator]) || t['@@iterator']
  if (r != null) {
    var n = [],
      a = !0,
      i = !1,
      o,
      c
    try {
      for (
        r = r.call(t);
        !(a = (o = r.next()).done) && (n.push(o.value), !(e && n.length === e));
        a = !0
      );
    } catch (l) {
      ;(i = !0), (c = l)
    } finally {
      try {
        !a && r.return != null && r.return()
      } finally {
        if (i) throw c
      }
    }
    return n
  }
}
function mr(t) {
  if (Array.isArray(t)) return t
}
function gt(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? Object(arguments[e]) : {},
      n = Object.keys(r)
    typeof Object.getOwnPropertySymbols == 'function' &&
      (n = n.concat(
        Object.getOwnPropertySymbols(r).filter(function(a) {
          return Object.getOwnPropertyDescriptor(r, a).enumerable
        })
      )),
      n.forEach(function(a) {
        N(t, a, r[a])
      })
  }
  return t
}
function N(t, e, r) {
  return (
    e in t
      ? Object.defineProperty(t, e, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0
        })
      : (t[e] = r),
    t
  )
}
function yr(t, e) {
  if (t == null) return {}
  var r = Or(t, e),
    n,
    a
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(t)
    for (a = 0; a < i.length; a++)
      (n = i[a]),
        !(e.indexOf(n) >= 0) &&
          Object.prototype.propertyIsEnumerable.call(t, n) &&
          (r[n] = t[n])
  }
  return r
}
function Or(t, e) {
  if (t == null) return {}
  var r = {},
    n = Object.keys(t),
    a,
    i
  for (i = 0; i < n.length; i++)
    (a = n[i]), !(e.indexOf(a) >= 0) && (r[a] = t[a])
  return r
}
Ht('#1890ff')
var w = function(e, r) {
  var n,
    a = gt({}, e, r.attrs),
    i = a.class,
    o = a.icon,
    c = a.spin,
    l = a.rotate,
    u = a.tabindex,
    m = a.twoToneColor,
    y = a.onClick,
    z = yr(a, dr),
    k =
      ((n = { anticon: !0 }),
      N(n, 'anticon-'.concat(o.name), !!o.name),
      N(n, i, i),
      n),
    At = c === '' || c || o.name === 'loading' ? 'anticon-spin' : '',
    E = u
  E === void 0 && y && ((E = -1), (z.tabindex = E))
  var Pt = l
      ? {
          msTransform: 'rotate('.concat(l, 'deg)'),
          transform: 'rotate('.concat(l, 'deg)')
        }
      : void 0,
    jt = zt(m),
    K = gr(jt, 2),
    Lt = K[0],
    kt = K[1]
  return g(
    'span',
    gt({ role: 'img', 'aria-label': o.name }, z, { onClick: y, class: k }),
    [
      g(
        W,
        { class: At, icon: o, primaryColor: Lt, secondaryColor: kt, style: Pt },
        null
      )
    ]
  )
}
w.props = { spin: Boolean, rotate: Number, icon: Object, twoToneColor: String }
w.displayName = 'AntdIcon'
w.inheritAttrs = !1
w.getTwoToneColor = hr
w.setTwoToneColor = Ht
const b = w
function vt(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? Object(arguments[e]) : {},
      n = Object.keys(r)
    typeof Object.getOwnPropertySymbols == 'function' &&
      (n = n.concat(
        Object.getOwnPropertySymbols(r).filter(function(a) {
          return Object.getOwnPropertyDescriptor(r, a).enumerable
        })
      )),
      n.forEach(function(a) {
        Sr(t, a, r[a])
      })
  }
  return t
}
function Sr(t, e, r) {
  return (
    e in t
      ? Object.defineProperty(t, e, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0
        })
      : (t[e] = r),
    t
  )
}
var U = function(e, r) {
  var n = vt({}, e, r.attrs)
  return g(b, vt({}, n, { icon: Kt }), null)
}
U.displayName = 'CheckOutlined'
U.inheritAttrs = !1
const mn = U
function pt(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? Object(arguments[e]) : {},
      n = Object.keys(r)
    typeof Object.getOwnPropertySymbols == 'function' &&
      (n = n.concat(
        Object.getOwnPropertySymbols(r).filter(function(a) {
          return Object.getOwnPropertyDescriptor(r, a).enumerable
        })
      )),
      n.forEach(function(a) {
        wr(t, a, r[a])
      })
  }
  return t
}
function wr(t, e, r) {
  return (
    e in t
      ? Object.defineProperty(t, e, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0
        })
      : (t[e] = r),
    t
  )
}
var Q = function(e, r) {
  var n = pt({}, e, r.attrs)
  return g(b, pt({}, n, { icon: Ie }), null)
}
Q.displayName = 'DeleteOutlined'
Q.inheritAttrs = !1
const yn = Q
function bt(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? Object(arguments[e]) : {},
      n = Object.keys(r)
    typeof Object.getOwnPropertySymbols == 'function' &&
      (n = n.concat(
        Object.getOwnPropertySymbols(r).filter(function(a) {
          return Object.getOwnPropertyDescriptor(r, a).enumerable
        })
      )),
      n.forEach(function(a) {
        xr(t, a, r[a])
      })
  }
  return t
}
function xr(t, e, r) {
  return (
    e in t
      ? Object.defineProperty(t, e, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0
        })
      : (t[e] = r),
    t
  )
}
var G = function(e, r) {
  var n = bt({}, e, r.attrs)
  return g(b, bt({}, n, { icon: Ne }), null)
}
G.displayName = 'EditOutlined'
G.inheritAttrs = !1
const On = G
function mt(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? Object(arguments[e]) : {},
      n = Object.keys(r)
    typeof Object.getOwnPropertySymbols == 'function' &&
      (n = n.concat(
        Object.getOwnPropertySymbols(r).filter(function(a) {
          return Object.getOwnPropertyDescriptor(r, a).enumerable
        })
      )),
      n.forEach(function(a) {
        Cr(t, a, r[a])
      })
  }
  return t
}
function Cr(t, e, r) {
  return (
    e in t
      ? Object.defineProperty(t, e, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0
        })
      : (t[e] = r),
    t
  )
}
var Z = function(e, r) {
  var n = mt({}, e, r.attrs)
  return g(b, mt({}, n, { icon: Ue }), null)
}
Z.displayName = 'ExportOutlined'
Z.inheritAttrs = !1
const Sn = Z
function yt(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? Object(arguments[e]) : {},
      n = Object.keys(r)
    typeof Object.getOwnPropertySymbols == 'function' &&
      (n = n.concat(
        Object.getOwnPropertySymbols(r).filter(function(a) {
          return Object.getOwnPropertyDescriptor(r, a).enumerable
        })
      )),
      n.forEach(function(a) {
        Mr(t, a, r[a])
      })
  }
  return t
}
function Mr(t, e, r) {
  return (
    e in t
      ? Object.defineProperty(t, e, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0
        })
      : (t[e] = r),
    t
  )
}
var Y = function(e, r) {
  var n = yt({}, e, r.attrs)
  return g(b, yt({}, n, { icon: Oe }), null)
}
Y.displayName = 'EyeOutlined'
Y.inheritAttrs = !1
const wn = Y
function Ot(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? Object(arguments[e]) : {},
      n = Object.keys(r)
    typeof Object.getOwnPropertySymbols == 'function' &&
      (n = n.concat(
        Object.getOwnPropertySymbols(r).filter(function(a) {
          return Object.getOwnPropertyDescriptor(r, a).enumerable
        })
      )),
      n.forEach(function(a) {
        zr(t, a, r[a])
      })
  }
  return t
}
function zr(t, e, r) {
  return (
    e in t
      ? Object.defineProperty(t, e, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0
        })
      : (t[e] = r),
    t
  )
}
var J = function(e, r) {
  var n = Ot({}, e, r.attrs)
  return g(b, Ot({}, n, { icon: de }), null)
}
J.displayName = 'PlusOutlined'
J.inheritAttrs = !1
const xn = J
function St(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? Object(arguments[e]) : {},
      n = Object.keys(r)
    typeof Object.getOwnPropertySymbols == 'function' &&
      (n = n.concat(
        Object.getOwnPropertySymbols(r).filter(function(a) {
          return Object.getOwnPropertyDescriptor(r, a).enumerable
        })
      )),
      n.forEach(function(a) {
        Hr(t, a, r[a])
      })
  }
  return t
}
function Hr(t, e, r) {
  return (
    e in t
      ? Object.defineProperty(t, e, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0
        })
      : (t[e] = r),
    t
  )
}
var X = function(e, r) {
  var n = St({}, e, r.attrs)
  return g(b, St({}, n, { icon: Ge }), null)
}
X.displayName = 'QuestionCircleFilled'
X.inheritAttrs = !1
const Cn = X
export {
  vn as $,
  Fr as A,
  Jr as B,
  Tr as C,
  kr as D,
  $r as E,
  yn as F,
  xn as G,
  mn as H,
  Rr as I,
  an as J,
  on as K,
  Er as L,
  cn as M,
  ln as N,
  sn as O,
  de as P,
  Qr as Q,
  Wr as R,
  rn as S,
  Pr as T,
  nn as U,
  un as V,
  fn as W,
  hn as X,
  dn as Y,
  tn as Z,
  gn as _,
  Br as a,
  Lr as b,
  Vr as c,
  Ir as d,
  _r as e,
  Dr as f,
  D as g,
  qr as h,
  pn as i,
  jr as j,
  bn as k,
  Ne as l,
  Kt as m,
  Nr as n,
  Ur as o,
  Oe as p,
  wn as q,
  On as r,
  Xr as s,
  Kr as t,
  en as u,
  Gr as v,
  Zr as w,
  Yr as x,
  Cn as y,
  Sn as z
}

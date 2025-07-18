// @bun
var __create = Object.create;
var __getProtoOf = Object.getPrototypeOf;
var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __toESM = (mod, isNodeMode, target) => {
  target = mod != null ? __create(__getProtoOf(mod)) : {};
  const to = isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target;
  for (let key of __getOwnPropNames(mod))
    if (!__hasOwnProp.call(to, key))
      __defProp(to, key, {
        get: () => mod[key],
        enumerable: true
      });
  return to;
};
var __commonJS = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);
var __require = import.meta.require;

// node_modules/name-util/dist/index.js
var require_dist = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.nextName = exports.capitalizeWords = exports.capitalize = exports.toClassName = exports.toCamelCase = exports.toUnderscoredName = exports.toDashedName = undefined;
  function toDashedName(key) {
    var _a;
    var matches = (_a = key.match(/[A-Z]/g)) !== null && _a !== undefined ? _a : [];
    return matches.reduce(function(accumulator, letter) {
      return accumulator.replace(new RegExp(letter, "g"), "-".concat(letter.toLowerCase()));
    }, key).replace(/(-|_|\s)+/g, "-").replace(/-+/g, "-").replace(/^-+|-+$/g, "").trim();
  }
  exports.toDashedName = toDashedName;
  function toUnderscoredName(key) {
    var matches = key.match(/[A-Z]/g) || [];
    return matches.reduce(function(accumulator, letter) {
      return accumulator.replace(new RegExp(letter, "g"), "-".concat(letter.toLowerCase()));
    }, key).replace(/(-|_|\s)+/g, "_").replace(/_+/g, "_").replace(/^_+|_+$/g, "").trim();
  }
  exports.toUnderscoredName = toUnderscoredName;
  function toCamelCase(key) {
    var matches = key.match(/(-|_|\s+)[a-zA-Z0-9]/g) || [];
    var name = matches.reduce(function(accumulator, letter) {
      return accumulator.replace(new RegExp(letter, "g"), letter.replace(/-|_|\s+/g, "").toUpperCase());
    }, key.replace(/^[0-9]+/g, "")).replace(/(-|_|\s)+/g, "").replace(/^(-|_)+|(-|_)+$/g, "").trim();
    return "".concat(name.substr(0, 1).toLowerCase()).concat(name.substr(1));
  }
  exports.toCamelCase = toCamelCase;
  function toClassName(key) {
    return capitalize(toCamelCase(key).replace(/[_-\s]+/g, ""));
  }
  exports.toClassName = toClassName;
  function capitalize(key) {
    if (key === undefined)
      return key;
    key = key.trim();
    return key.substring(0, 1).toUpperCase() + key.substr(1);
  }
  exports.capitalize = capitalize;
  function capitalizeWords(key) {
    if (key === undefined)
      return key;
    key = key.trim();
    return toDashedName(key).split("-").map(capitalize).join(" ");
  }
  exports.capitalizeWords = capitalizeWords;
  function nextName(names, prefix) {
    var counter = names.reduce(function(a, i) {
      var regExp = new RegExp(prefix + "(\\d+)");
      var output = regExp.exec(i);
      var value = output ? output[1] : null;
      var counter2 = value ? parseInt(value) : 0;
      return !isNaN(counter2) ? Math.max(counter2 + 1, a) : a;
    }, 1);
    return "".concat(prefix).concat(counter);
  }
  exports.nextName = nextName;
});

// node_modules/color-name/index.js
var require_color_name = __commonJS((exports, module) => {
  module.exports = {
    aliceblue: [240, 248, 255],
    antiquewhite: [250, 235, 215],
    aqua: [0, 255, 255],
    aquamarine: [127, 255, 212],
    azure: [240, 255, 255],
    beige: [245, 245, 220],
    bisque: [255, 228, 196],
    black: [0, 0, 0],
    blanchedalmond: [255, 235, 205],
    blue: [0, 0, 255],
    blueviolet: [138, 43, 226],
    brown: [165, 42, 42],
    burlywood: [222, 184, 135],
    cadetblue: [95, 158, 160],
    chartreuse: [127, 255, 0],
    chocolate: [210, 105, 30],
    coral: [255, 127, 80],
    cornflowerblue: [100, 149, 237],
    cornsilk: [255, 248, 220],
    crimson: [220, 20, 60],
    cyan: [0, 255, 255],
    darkblue: [0, 0, 139],
    darkcyan: [0, 139, 139],
    darkgoldenrod: [184, 134, 11],
    darkgray: [169, 169, 169],
    darkgreen: [0, 100, 0],
    darkgrey: [169, 169, 169],
    darkkhaki: [189, 183, 107],
    darkmagenta: [139, 0, 139],
    darkolivegreen: [85, 107, 47],
    darkorange: [255, 140, 0],
    darkorchid: [153, 50, 204],
    darkred: [139, 0, 0],
    darksalmon: [233, 150, 122],
    darkseagreen: [143, 188, 143],
    darkslateblue: [72, 61, 139],
    darkslategray: [47, 79, 79],
    darkslategrey: [47, 79, 79],
    darkturquoise: [0, 206, 209],
    darkviolet: [148, 0, 211],
    deeppink: [255, 20, 147],
    deepskyblue: [0, 191, 255],
    dimgray: [105, 105, 105],
    dimgrey: [105, 105, 105],
    dodgerblue: [30, 144, 255],
    firebrick: [178, 34, 34],
    floralwhite: [255, 250, 240],
    forestgreen: [34, 139, 34],
    fuchsia: [255, 0, 255],
    gainsboro: [220, 220, 220],
    ghostwhite: [248, 248, 255],
    gold: [255, 215, 0],
    goldenrod: [218, 165, 32],
    gray: [128, 128, 128],
    green: [0, 128, 0],
    greenyellow: [173, 255, 47],
    grey: [128, 128, 128],
    honeydew: [240, 255, 240],
    hotpink: [255, 105, 180],
    indianred: [205, 92, 92],
    indigo: [75, 0, 130],
    ivory: [255, 255, 240],
    khaki: [240, 230, 140],
    lavender: [230, 230, 250],
    lavenderblush: [255, 240, 245],
    lawngreen: [124, 252, 0],
    lemonchiffon: [255, 250, 205],
    lightblue: [173, 216, 230],
    lightcoral: [240, 128, 128],
    lightcyan: [224, 255, 255],
    lightgoldenrodyellow: [250, 250, 210],
    lightgray: [211, 211, 211],
    lightgreen: [144, 238, 144],
    lightgrey: [211, 211, 211],
    lightpink: [255, 182, 193],
    lightsalmon: [255, 160, 122],
    lightseagreen: [32, 178, 170],
    lightskyblue: [135, 206, 250],
    lightslategray: [119, 136, 153],
    lightslategrey: [119, 136, 153],
    lightsteelblue: [176, 196, 222],
    lightyellow: [255, 255, 224],
    lime: [0, 255, 0],
    limegreen: [50, 205, 50],
    linen: [250, 240, 230],
    magenta: [255, 0, 255],
    maroon: [128, 0, 0],
    mediumaquamarine: [102, 205, 170],
    mediumblue: [0, 0, 205],
    mediumorchid: [186, 85, 211],
    mediumpurple: [147, 112, 219],
    mediumseagreen: [60, 179, 113],
    mediumslateblue: [123, 104, 238],
    mediumspringgreen: [0, 250, 154],
    mediumturquoise: [72, 209, 204],
    mediumvioletred: [199, 21, 133],
    midnightblue: [25, 25, 112],
    mintcream: [245, 255, 250],
    mistyrose: [255, 228, 225],
    moccasin: [255, 228, 181],
    navajowhite: [255, 222, 173],
    navy: [0, 0, 128],
    oldlace: [253, 245, 230],
    olive: [128, 128, 0],
    olivedrab: [107, 142, 35],
    orange: [255, 165, 0],
    orangered: [255, 69, 0],
    orchid: [218, 112, 214],
    palegoldenrod: [238, 232, 170],
    palegreen: [152, 251, 152],
    paleturquoise: [175, 238, 238],
    palevioletred: [219, 112, 147],
    papayawhip: [255, 239, 213],
    peachpuff: [255, 218, 185],
    peru: [205, 133, 63],
    pink: [255, 192, 203],
    plum: [221, 160, 221],
    powderblue: [176, 224, 230],
    purple: [128, 0, 128],
    rebeccapurple: [102, 51, 153],
    red: [255, 0, 0],
    rosybrown: [188, 143, 143],
    royalblue: [65, 105, 225],
    saddlebrown: [139, 69, 19],
    salmon: [250, 128, 114],
    sandybrown: [244, 164, 96],
    seagreen: [46, 139, 87],
    seashell: [255, 245, 238],
    sienna: [160, 82, 45],
    silver: [192, 192, 192],
    skyblue: [135, 206, 235],
    slateblue: [106, 90, 205],
    slategray: [112, 128, 144],
    slategrey: [112, 128, 144],
    snow: [255, 250, 250],
    springgreen: [0, 255, 127],
    steelblue: [70, 130, 180],
    tan: [210, 180, 140],
    teal: [0, 128, 128],
    thistle: [216, 191, 216],
    tomato: [255, 99, 71],
    turquoise: [64, 224, 208],
    violet: [238, 130, 238],
    wheat: [245, 222, 179],
    white: [255, 255, 255],
    whitesmoke: [245, 245, 245],
    yellow: [255, 255, 0],
    yellowgreen: [154, 205, 50]
  };
});

// node_modules/color-convert/conversions.js
var require_conversions = __commonJS((exports, module) => {
  var cssKeywords = require_color_name();
  var reverseKeywords = {};
  for (const key of Object.keys(cssKeywords)) {
    reverseKeywords[cssKeywords[key]] = key;
  }
  var convert = {
    rgb: { channels: 3, labels: "rgb" },
    hsl: { channels: 3, labels: "hsl" },
    hsv: { channels: 3, labels: "hsv" },
    hwb: { channels: 3, labels: "hwb" },
    cmyk: { channels: 4, labels: "cmyk" },
    xyz: { channels: 3, labels: "xyz" },
    lab: { channels: 3, labels: "lab" },
    lch: { channels: 3, labels: "lch" },
    hex: { channels: 1, labels: ["hex"] },
    keyword: { channels: 1, labels: ["keyword"] },
    ansi16: { channels: 1, labels: ["ansi16"] },
    ansi256: { channels: 1, labels: ["ansi256"] },
    hcg: { channels: 3, labels: ["h", "c", "g"] },
    apple: { channels: 3, labels: ["r16", "g16", "b16"] },
    gray: { channels: 1, labels: ["gray"] }
  };
  module.exports = convert;
  for (const model of Object.keys(convert)) {
    if (!("channels" in convert[model])) {
      throw new Error("missing channels property: " + model);
    }
    if (!("labels" in convert[model])) {
      throw new Error("missing channel labels property: " + model);
    }
    if (convert[model].labels.length !== convert[model].channels) {
      throw new Error("channel and label counts mismatch: " + model);
    }
    const { channels, labels } = convert[model];
    delete convert[model].channels;
    delete convert[model].labels;
    Object.defineProperty(convert[model], "channels", { value: channels });
    Object.defineProperty(convert[model], "labels", { value: labels });
  }
  convert.rgb.hsl = function(rgb) {
    const r = rgb[0] / 255;
    const g = rgb[1] / 255;
    const b = rgb[2] / 255;
    const min = Math.min(r, g, b);
    const max = Math.max(r, g, b);
    const delta = max - min;
    let h;
    let s;
    if (max === min) {
      h = 0;
    } else if (r === max) {
      h = (g - b) / delta;
    } else if (g === max) {
      h = 2 + (b - r) / delta;
    } else if (b === max) {
      h = 4 + (r - g) / delta;
    }
    h = Math.min(h * 60, 360);
    if (h < 0) {
      h += 360;
    }
    const l = (min + max) / 2;
    if (max === min) {
      s = 0;
    } else if (l <= 0.5) {
      s = delta / (max + min);
    } else {
      s = delta / (2 - max - min);
    }
    return [h, s * 100, l * 100];
  };
  convert.rgb.hsv = function(rgb) {
    let rdif;
    let gdif;
    let bdif;
    let h;
    let s;
    const r = rgb[0] / 255;
    const g = rgb[1] / 255;
    const b = rgb[2] / 255;
    const v = Math.max(r, g, b);
    const diff = v - Math.min(r, g, b);
    const diffc = function(c) {
      return (v - c) / 6 / diff + 1 / 2;
    };
    if (diff === 0) {
      h = 0;
      s = 0;
    } else {
      s = diff / v;
      rdif = diffc(r);
      gdif = diffc(g);
      bdif = diffc(b);
      if (r === v) {
        h = bdif - gdif;
      } else if (g === v) {
        h = 1 / 3 + rdif - bdif;
      } else if (b === v) {
        h = 2 / 3 + gdif - rdif;
      }
      if (h < 0) {
        h += 1;
      } else if (h > 1) {
        h -= 1;
      }
    }
    return [
      h * 360,
      s * 100,
      v * 100
    ];
  };
  convert.rgb.hwb = function(rgb) {
    const r = rgb[0];
    const g = rgb[1];
    let b = rgb[2];
    const h = convert.rgb.hsl(rgb)[0];
    const w = 1 / 255 * Math.min(r, Math.min(g, b));
    b = 1 - 1 / 255 * Math.max(r, Math.max(g, b));
    return [h, w * 100, b * 100];
  };
  convert.rgb.cmyk = function(rgb) {
    const r = rgb[0] / 255;
    const g = rgb[1] / 255;
    const b = rgb[2] / 255;
    const k = Math.min(1 - r, 1 - g, 1 - b);
    const c = (1 - r - k) / (1 - k) || 0;
    const m = (1 - g - k) / (1 - k) || 0;
    const y = (1 - b - k) / (1 - k) || 0;
    return [c * 100, m * 100, y * 100, k * 100];
  };
  function comparativeDistance(x, y) {
    return (x[0] - y[0]) ** 2 + (x[1] - y[1]) ** 2 + (x[2] - y[2]) ** 2;
  }
  convert.rgb.keyword = function(rgb) {
    const reversed = reverseKeywords[rgb];
    if (reversed) {
      return reversed;
    }
    let currentClosestDistance = Infinity;
    let currentClosestKeyword;
    for (const keyword of Object.keys(cssKeywords)) {
      const value = cssKeywords[keyword];
      const distance = comparativeDistance(rgb, value);
      if (distance < currentClosestDistance) {
        currentClosestDistance = distance;
        currentClosestKeyword = keyword;
      }
    }
    return currentClosestKeyword;
  };
  convert.keyword.rgb = function(keyword) {
    return cssKeywords[keyword];
  };
  convert.rgb.xyz = function(rgb) {
    let r = rgb[0] / 255;
    let g = rgb[1] / 255;
    let b = rgb[2] / 255;
    r = r > 0.04045 ? ((r + 0.055) / 1.055) ** 2.4 : r / 12.92;
    g = g > 0.04045 ? ((g + 0.055) / 1.055) ** 2.4 : g / 12.92;
    b = b > 0.04045 ? ((b + 0.055) / 1.055) ** 2.4 : b / 12.92;
    const x = r * 0.4124 + g * 0.3576 + b * 0.1805;
    const y = r * 0.2126 + g * 0.7152 + b * 0.0722;
    const z = r * 0.0193 + g * 0.1192 + b * 0.9505;
    return [x * 100, y * 100, z * 100];
  };
  convert.rgb.lab = function(rgb) {
    const xyz = convert.rgb.xyz(rgb);
    let x = xyz[0];
    let y = xyz[1];
    let z = xyz[2];
    x /= 95.047;
    y /= 100;
    z /= 108.883;
    x = x > 0.008856 ? x ** (1 / 3) : 7.787 * x + 16 / 116;
    y = y > 0.008856 ? y ** (1 / 3) : 7.787 * y + 16 / 116;
    z = z > 0.008856 ? z ** (1 / 3) : 7.787 * z + 16 / 116;
    const l = 116 * y - 16;
    const a = 500 * (x - y);
    const b = 200 * (y - z);
    return [l, a, b];
  };
  convert.hsl.rgb = function(hsl) {
    const h = hsl[0] / 360;
    const s = hsl[1] / 100;
    const l = hsl[2] / 100;
    let t2;
    let t3;
    let val;
    if (s === 0) {
      val = l * 255;
      return [val, val, val];
    }
    if (l < 0.5) {
      t2 = l * (1 + s);
    } else {
      t2 = l + s - l * s;
    }
    const t1 = 2 * l - t2;
    const rgb = [0, 0, 0];
    for (let i = 0;i < 3; i++) {
      t3 = h + 1 / 3 * -(i - 1);
      if (t3 < 0) {
        t3++;
      }
      if (t3 > 1) {
        t3--;
      }
      if (6 * t3 < 1) {
        val = t1 + (t2 - t1) * 6 * t3;
      } else if (2 * t3 < 1) {
        val = t2;
      } else if (3 * t3 < 2) {
        val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
      } else {
        val = t1;
      }
      rgb[i] = val * 255;
    }
    return rgb;
  };
  convert.hsl.hsv = function(hsl) {
    const h = hsl[0];
    let s = hsl[1] / 100;
    let l = hsl[2] / 100;
    let smin = s;
    const lmin = Math.max(l, 0.01);
    l *= 2;
    s *= l <= 1 ? l : 2 - l;
    smin *= lmin <= 1 ? lmin : 2 - lmin;
    const v = (l + s) / 2;
    const sv = l === 0 ? 2 * smin / (lmin + smin) : 2 * s / (l + s);
    return [h, sv * 100, v * 100];
  };
  convert.hsv.rgb = function(hsv) {
    const h = hsv[0] / 60;
    const s = hsv[1] / 100;
    let v = hsv[2] / 100;
    const hi = Math.floor(h) % 6;
    const f = h - Math.floor(h);
    const p = 255 * v * (1 - s);
    const q = 255 * v * (1 - s * f);
    const t = 255 * v * (1 - s * (1 - f));
    v *= 255;
    switch (hi) {
      case 0:
        return [v, t, p];
      case 1:
        return [q, v, p];
      case 2:
        return [p, v, t];
      case 3:
        return [p, q, v];
      case 4:
        return [t, p, v];
      case 5:
        return [v, p, q];
    }
  };
  convert.hsv.hsl = function(hsv) {
    const h = hsv[0];
    const s = hsv[1] / 100;
    const v = hsv[2] / 100;
    const vmin = Math.max(v, 0.01);
    let sl;
    let l;
    l = (2 - s) * v;
    const lmin = (2 - s) * vmin;
    sl = s * vmin;
    sl /= lmin <= 1 ? lmin : 2 - lmin;
    sl = sl || 0;
    l /= 2;
    return [h, sl * 100, l * 100];
  };
  convert.hwb.rgb = function(hwb) {
    const h = hwb[0] / 360;
    let wh = hwb[1] / 100;
    let bl = hwb[2] / 100;
    const ratio = wh + bl;
    let f;
    if (ratio > 1) {
      wh /= ratio;
      bl /= ratio;
    }
    const i = Math.floor(6 * h);
    const v = 1 - bl;
    f = 6 * h - i;
    if ((i & 1) !== 0) {
      f = 1 - f;
    }
    const n = wh + f * (v - wh);
    let r;
    let g;
    let b;
    switch (i) {
      default:
      case 6:
      case 0:
        r = v;
        g = n;
        b = wh;
        break;
      case 1:
        r = n;
        g = v;
        b = wh;
        break;
      case 2:
        r = wh;
        g = v;
        b = n;
        break;
      case 3:
        r = wh;
        g = n;
        b = v;
        break;
      case 4:
        r = n;
        g = wh;
        b = v;
        break;
      case 5:
        r = v;
        g = wh;
        b = n;
        break;
    }
    return [r * 255, g * 255, b * 255];
  };
  convert.cmyk.rgb = function(cmyk) {
    const c = cmyk[0] / 100;
    const m = cmyk[1] / 100;
    const y = cmyk[2] / 100;
    const k = cmyk[3] / 100;
    const r = 1 - Math.min(1, c * (1 - k) + k);
    const g = 1 - Math.min(1, m * (1 - k) + k);
    const b = 1 - Math.min(1, y * (1 - k) + k);
    return [r * 255, g * 255, b * 255];
  };
  convert.xyz.rgb = function(xyz) {
    const x = xyz[0] / 100;
    const y = xyz[1] / 100;
    const z = xyz[2] / 100;
    let r;
    let g;
    let b;
    r = x * 3.2406 + y * -1.5372 + z * -0.4986;
    g = x * -0.9689 + y * 1.8758 + z * 0.0415;
    b = x * 0.0557 + y * -0.204 + z * 1.057;
    r = r > 0.0031308 ? 1.055 * r ** (1 / 2.4) - 0.055 : r * 12.92;
    g = g > 0.0031308 ? 1.055 * g ** (1 / 2.4) - 0.055 : g * 12.92;
    b = b > 0.0031308 ? 1.055 * b ** (1 / 2.4) - 0.055 : b * 12.92;
    r = Math.min(Math.max(0, r), 1);
    g = Math.min(Math.max(0, g), 1);
    b = Math.min(Math.max(0, b), 1);
    return [r * 255, g * 255, b * 255];
  };
  convert.xyz.lab = function(xyz) {
    let x = xyz[0];
    let y = xyz[1];
    let z = xyz[2];
    x /= 95.047;
    y /= 100;
    z /= 108.883;
    x = x > 0.008856 ? x ** (1 / 3) : 7.787 * x + 16 / 116;
    y = y > 0.008856 ? y ** (1 / 3) : 7.787 * y + 16 / 116;
    z = z > 0.008856 ? z ** (1 / 3) : 7.787 * z + 16 / 116;
    const l = 116 * y - 16;
    const a = 500 * (x - y);
    const b = 200 * (y - z);
    return [l, a, b];
  };
  convert.lab.xyz = function(lab) {
    const l = lab[0];
    const a = lab[1];
    const b = lab[2];
    let x;
    let y;
    let z;
    y = (l + 16) / 116;
    x = a / 500 + y;
    z = y - b / 200;
    const y2 = y ** 3;
    const x2 = x ** 3;
    const z2 = z ** 3;
    y = y2 > 0.008856 ? y2 : (y - 16 / 116) / 7.787;
    x = x2 > 0.008856 ? x2 : (x - 16 / 116) / 7.787;
    z = z2 > 0.008856 ? z2 : (z - 16 / 116) / 7.787;
    x *= 95.047;
    y *= 100;
    z *= 108.883;
    return [x, y, z];
  };
  convert.lab.lch = function(lab) {
    const l = lab[0];
    const a = lab[1];
    const b = lab[2];
    let h;
    const hr = Math.atan2(b, a);
    h = hr * 360 / 2 / Math.PI;
    if (h < 0) {
      h += 360;
    }
    const c = Math.sqrt(a * a + b * b);
    return [l, c, h];
  };
  convert.lch.lab = function(lch) {
    const l = lch[0];
    const c = lch[1];
    const h = lch[2];
    const hr = h / 360 * 2 * Math.PI;
    const a = c * Math.cos(hr);
    const b = c * Math.sin(hr);
    return [l, a, b];
  };
  convert.rgb.ansi16 = function(args, saturation = null) {
    const [r, g, b] = args;
    let value = saturation === null ? convert.rgb.hsv(args)[2] : saturation;
    value = Math.round(value / 50);
    if (value === 0) {
      return 30;
    }
    let ansi = 30 + (Math.round(b / 255) << 2 | Math.round(g / 255) << 1 | Math.round(r / 255));
    if (value === 2) {
      ansi += 60;
    }
    return ansi;
  };
  convert.hsv.ansi16 = function(args) {
    return convert.rgb.ansi16(convert.hsv.rgb(args), args[2]);
  };
  convert.rgb.ansi256 = function(args) {
    const r = args[0];
    const g = args[1];
    const b = args[2];
    if (r === g && g === b) {
      if (r < 8) {
        return 16;
      }
      if (r > 248) {
        return 231;
      }
      return Math.round((r - 8) / 247 * 24) + 232;
    }
    const ansi = 16 + 36 * Math.round(r / 255 * 5) + 6 * Math.round(g / 255 * 5) + Math.round(b / 255 * 5);
    return ansi;
  };
  convert.ansi16.rgb = function(args) {
    let color = args % 10;
    if (color === 0 || color === 7) {
      if (args > 50) {
        color += 3.5;
      }
      color = color / 10.5 * 255;
      return [color, color, color];
    }
    const mult = (~~(args > 50) + 1) * 0.5;
    const r = (color & 1) * mult * 255;
    const g = (color >> 1 & 1) * mult * 255;
    const b = (color >> 2 & 1) * mult * 255;
    return [r, g, b];
  };
  convert.ansi256.rgb = function(args) {
    if (args >= 232) {
      const c = (args - 232) * 10 + 8;
      return [c, c, c];
    }
    args -= 16;
    let rem;
    const r = Math.floor(args / 36) / 5 * 255;
    const g = Math.floor((rem = args % 36) / 6) / 5 * 255;
    const b = rem % 6 / 5 * 255;
    return [r, g, b];
  };
  convert.rgb.hex = function(args) {
    const integer = ((Math.round(args[0]) & 255) << 16) + ((Math.round(args[1]) & 255) << 8) + (Math.round(args[2]) & 255);
    const string = integer.toString(16).toUpperCase();
    return "000000".substring(string.length) + string;
  };
  convert.hex.rgb = function(args) {
    const match = args.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
    if (!match) {
      return [0, 0, 0];
    }
    let colorString = match[0];
    if (match[0].length === 3) {
      colorString = colorString.split("").map((char) => {
        return char + char;
      }).join("");
    }
    const integer = parseInt(colorString, 16);
    const r = integer >> 16 & 255;
    const g = integer >> 8 & 255;
    const b = integer & 255;
    return [r, g, b];
  };
  convert.rgb.hcg = function(rgb) {
    const r = rgb[0] / 255;
    const g = rgb[1] / 255;
    const b = rgb[2] / 255;
    const max = Math.max(Math.max(r, g), b);
    const min = Math.min(Math.min(r, g), b);
    const chroma = max - min;
    let grayscale;
    let hue;
    if (chroma < 1) {
      grayscale = min / (1 - chroma);
    } else {
      grayscale = 0;
    }
    if (chroma <= 0) {
      hue = 0;
    } else if (max === r) {
      hue = (g - b) / chroma % 6;
    } else if (max === g) {
      hue = 2 + (b - r) / chroma;
    } else {
      hue = 4 + (r - g) / chroma;
    }
    hue /= 6;
    hue %= 1;
    return [hue * 360, chroma * 100, grayscale * 100];
  };
  convert.hsl.hcg = function(hsl) {
    const s = hsl[1] / 100;
    const l = hsl[2] / 100;
    const c = l < 0.5 ? 2 * s * l : 2 * s * (1 - l);
    let f = 0;
    if (c < 1) {
      f = (l - 0.5 * c) / (1 - c);
    }
    return [hsl[0], c * 100, f * 100];
  };
  convert.hsv.hcg = function(hsv) {
    const s = hsv[1] / 100;
    const v = hsv[2] / 100;
    const c = s * v;
    let f = 0;
    if (c < 1) {
      f = (v - c) / (1 - c);
    }
    return [hsv[0], c * 100, f * 100];
  };
  convert.hcg.rgb = function(hcg) {
    const h = hcg[0] / 360;
    const c = hcg[1] / 100;
    const g = hcg[2] / 100;
    if (c === 0) {
      return [g * 255, g * 255, g * 255];
    }
    const pure = [0, 0, 0];
    const hi = h % 1 * 6;
    const v = hi % 1;
    const w = 1 - v;
    let mg = 0;
    switch (Math.floor(hi)) {
      case 0:
        pure[0] = 1;
        pure[1] = v;
        pure[2] = 0;
        break;
      case 1:
        pure[0] = w;
        pure[1] = 1;
        pure[2] = 0;
        break;
      case 2:
        pure[0] = 0;
        pure[1] = 1;
        pure[2] = v;
        break;
      case 3:
        pure[0] = 0;
        pure[1] = w;
        pure[2] = 1;
        break;
      case 4:
        pure[0] = v;
        pure[1] = 0;
        pure[2] = 1;
        break;
      default:
        pure[0] = 1;
        pure[1] = 0;
        pure[2] = w;
    }
    mg = (1 - c) * g;
    return [
      (c * pure[0] + mg) * 255,
      (c * pure[1] + mg) * 255,
      (c * pure[2] + mg) * 255
    ];
  };
  convert.hcg.hsv = function(hcg) {
    const c = hcg[1] / 100;
    const g = hcg[2] / 100;
    const v = c + g * (1 - c);
    let f = 0;
    if (v > 0) {
      f = c / v;
    }
    return [hcg[0], f * 100, v * 100];
  };
  convert.hcg.hsl = function(hcg) {
    const c = hcg[1] / 100;
    const g = hcg[2] / 100;
    const l = g * (1 - c) + 0.5 * c;
    let s = 0;
    if (l > 0 && l < 0.5) {
      s = c / (2 * l);
    } else if (l >= 0.5 && l < 1) {
      s = c / (2 * (1 - l));
    }
    return [hcg[0], s * 100, l * 100];
  };
  convert.hcg.hwb = function(hcg) {
    const c = hcg[1] / 100;
    const g = hcg[2] / 100;
    const v = c + g * (1 - c);
    return [hcg[0], (v - c) * 100, (1 - v) * 100];
  };
  convert.hwb.hcg = function(hwb) {
    const w = hwb[1] / 100;
    const b = hwb[2] / 100;
    const v = 1 - b;
    const c = v - w;
    let g = 0;
    if (c < 1) {
      g = (v - c) / (1 - c);
    }
    return [hwb[0], c * 100, g * 100];
  };
  convert.apple.rgb = function(apple) {
    return [apple[0] / 65535 * 255, apple[1] / 65535 * 255, apple[2] / 65535 * 255];
  };
  convert.rgb.apple = function(rgb) {
    return [rgb[0] / 255 * 65535, rgb[1] / 255 * 65535, rgb[2] / 255 * 65535];
  };
  convert.gray.rgb = function(args) {
    return [args[0] / 100 * 255, args[0] / 100 * 255, args[0] / 100 * 255];
  };
  convert.gray.hsl = function(args) {
    return [0, 0, args[0]];
  };
  convert.gray.hsv = convert.gray.hsl;
  convert.gray.hwb = function(gray) {
    return [0, 100, gray[0]];
  };
  convert.gray.cmyk = function(gray) {
    return [0, 0, 0, gray[0]];
  };
  convert.gray.lab = function(gray) {
    return [gray[0], 0, 0];
  };
  convert.gray.hex = function(gray) {
    const val = Math.round(gray[0] / 100 * 255) & 255;
    const integer = (val << 16) + (val << 8) + val;
    const string = integer.toString(16).toUpperCase();
    return "000000".substring(string.length) + string;
  };
  convert.rgb.gray = function(rgb) {
    const val = (rgb[0] + rgb[1] + rgb[2]) / 3;
    return [val / 255 * 100];
  };
});

// node_modules/color-convert/route.js
var require_route = __commonJS((exports, module) => {
  var conversions = require_conversions();
  function buildGraph() {
    const graph = {};
    const models = Object.keys(conversions);
    for (let len = models.length, i = 0;i < len; i++) {
      graph[models[i]] = {
        distance: -1,
        parent: null
      };
    }
    return graph;
  }
  function deriveBFS(fromModel) {
    const graph = buildGraph();
    const queue = [fromModel];
    graph[fromModel].distance = 0;
    while (queue.length) {
      const current = queue.pop();
      const adjacents = Object.keys(conversions[current]);
      for (let len = adjacents.length, i = 0;i < len; i++) {
        const adjacent = adjacents[i];
        const node = graph[adjacent];
        if (node.distance === -1) {
          node.distance = graph[current].distance + 1;
          node.parent = current;
          queue.unshift(adjacent);
        }
      }
    }
    return graph;
  }
  function link(from, to) {
    return function(args) {
      return to(from(args));
    };
  }
  function wrapConversion(toModel, graph) {
    const path = [graph[toModel].parent, toModel];
    let fn = conversions[graph[toModel].parent][toModel];
    let cur = graph[toModel].parent;
    while (graph[cur].parent) {
      path.unshift(graph[cur].parent);
      fn = link(conversions[graph[cur].parent][cur], fn);
      cur = graph[cur].parent;
    }
    fn.conversion = path;
    return fn;
  }
  module.exports = function(fromModel) {
    const graph = deriveBFS(fromModel);
    const conversion = {};
    const models = Object.keys(graph);
    for (let len = models.length, i = 0;i < len; i++) {
      const toModel = models[i];
      const node = graph[toModel];
      if (node.parent === null) {
        continue;
      }
      conversion[toModel] = wrapConversion(toModel, graph);
    }
    return conversion;
  };
});

// node_modules/color-convert/index.js
var require_color_convert = __commonJS((exports, module) => {
  var conversions = require_conversions();
  var route = require_route();
  var convert = {};
  var models = Object.keys(conversions);
  function wrapRaw(fn) {
    const wrappedFn = function(...args) {
      const arg0 = args[0];
      if (arg0 === undefined || arg0 === null) {
        return arg0;
      }
      if (arg0.length > 1) {
        args = arg0;
      }
      return fn(args);
    };
    if ("conversion" in fn) {
      wrappedFn.conversion = fn.conversion;
    }
    return wrappedFn;
  }
  function wrapRounded(fn) {
    const wrappedFn = function(...args) {
      const arg0 = args[0];
      if (arg0 === undefined || arg0 === null) {
        return arg0;
      }
      if (arg0.length > 1) {
        args = arg0;
      }
      const result = fn(args);
      if (typeof result === "object") {
        for (let len = result.length, i = 0;i < len; i++) {
          result[i] = Math.round(result[i]);
        }
      }
      return result;
    };
    if ("conversion" in fn) {
      wrappedFn.conversion = fn.conversion;
    }
    return wrappedFn;
  }
  models.forEach((fromModel) => {
    convert[fromModel] = {};
    Object.defineProperty(convert[fromModel], "channels", { value: conversions[fromModel].channels });
    Object.defineProperty(convert[fromModel], "labels", { value: conversions[fromModel].labels });
    const routes = route(fromModel);
    const routeModels = Object.keys(routes);
    routeModels.forEach((toModel) => {
      const fn = routes[toModel];
      convert[fromModel][toModel] = wrapRounded(fn);
      convert[fromModel][toModel].raw = wrapRaw(fn);
    });
  });
  module.exports = convert;
});

// node_modules/ansi-styles/index.js
var require_ansi_styles = __commonJS((exports, module) => {
  var wrapAnsi16 = (fn, offset) => (...args) => {
    const code = fn(...args);
    return `\x1B[${code + offset}m`;
  };
  var wrapAnsi256 = (fn, offset) => (...args) => {
    const code = fn(...args);
    return `\x1B[${38 + offset};5;${code}m`;
  };
  var wrapAnsi16m = (fn, offset) => (...args) => {
    const rgb = fn(...args);
    return `\x1B[${38 + offset};2;${rgb[0]};${rgb[1]};${rgb[2]}m`;
  };
  var ansi2ansi = (n) => n;
  var rgb2rgb = (r, g, b) => [r, g, b];
  var setLazyProperty = (object, property, get) => {
    Object.defineProperty(object, property, {
      get: () => {
        const value = get();
        Object.defineProperty(object, property, {
          value,
          enumerable: true,
          configurable: true
        });
        return value;
      },
      enumerable: true,
      configurable: true
    });
  };
  var colorConvert;
  var makeDynamicStyles = (wrap, targetSpace, identity, isBackground) => {
    if (colorConvert === undefined) {
      colorConvert = require_color_convert();
    }
    const offset = isBackground ? 10 : 0;
    const styles = {};
    for (const [sourceSpace, suite] of Object.entries(colorConvert)) {
      const name = sourceSpace === "ansi16" ? "ansi" : sourceSpace;
      if (sourceSpace === targetSpace) {
        styles[name] = wrap(identity, offset);
      } else if (typeof suite === "object") {
        styles[name] = wrap(suite[targetSpace], offset);
      }
    }
    return styles;
  };
  function assembleStyles() {
    const codes = new Map;
    const styles = {
      modifier: {
        reset: [0, 0],
        bold: [1, 22],
        dim: [2, 22],
        italic: [3, 23],
        underline: [4, 24],
        inverse: [7, 27],
        hidden: [8, 28],
        strikethrough: [9, 29]
      },
      color: {
        black: [30, 39],
        red: [31, 39],
        green: [32, 39],
        yellow: [33, 39],
        blue: [34, 39],
        magenta: [35, 39],
        cyan: [36, 39],
        white: [37, 39],
        blackBright: [90, 39],
        redBright: [91, 39],
        greenBright: [92, 39],
        yellowBright: [93, 39],
        blueBright: [94, 39],
        magentaBright: [95, 39],
        cyanBright: [96, 39],
        whiteBright: [97, 39]
      },
      bgColor: {
        bgBlack: [40, 49],
        bgRed: [41, 49],
        bgGreen: [42, 49],
        bgYellow: [43, 49],
        bgBlue: [44, 49],
        bgMagenta: [45, 49],
        bgCyan: [46, 49],
        bgWhite: [47, 49],
        bgBlackBright: [100, 49],
        bgRedBright: [101, 49],
        bgGreenBright: [102, 49],
        bgYellowBright: [103, 49],
        bgBlueBright: [104, 49],
        bgMagentaBright: [105, 49],
        bgCyanBright: [106, 49],
        bgWhiteBright: [107, 49]
      }
    };
    styles.color.gray = styles.color.blackBright;
    styles.bgColor.bgGray = styles.bgColor.bgBlackBright;
    styles.color.grey = styles.color.blackBright;
    styles.bgColor.bgGrey = styles.bgColor.bgBlackBright;
    for (const [groupName, group] of Object.entries(styles)) {
      for (const [styleName, style] of Object.entries(group)) {
        styles[styleName] = {
          open: `\x1B[${style[0]}m`,
          close: `\x1B[${style[1]}m`
        };
        group[styleName] = styles[styleName];
        codes.set(style[0], style[1]);
      }
      Object.defineProperty(styles, groupName, {
        value: group,
        enumerable: false
      });
    }
    Object.defineProperty(styles, "codes", {
      value: codes,
      enumerable: false
    });
    styles.color.close = "\x1B[39m";
    styles.bgColor.close = "\x1B[49m";
    setLazyProperty(styles.color, "ansi", () => makeDynamicStyles(wrapAnsi16, "ansi16", ansi2ansi, false));
    setLazyProperty(styles.color, "ansi256", () => makeDynamicStyles(wrapAnsi256, "ansi256", ansi2ansi, false));
    setLazyProperty(styles.color, "ansi16m", () => makeDynamicStyles(wrapAnsi16m, "rgb", rgb2rgb, false));
    setLazyProperty(styles.bgColor, "ansi", () => makeDynamicStyles(wrapAnsi16, "ansi16", ansi2ansi, true));
    setLazyProperty(styles.bgColor, "ansi256", () => makeDynamicStyles(wrapAnsi256, "ansi256", ansi2ansi, true));
    setLazyProperty(styles.bgColor, "ansi16m", () => makeDynamicStyles(wrapAnsi16m, "rgb", rgb2rgb, true));
    return styles;
  }
  Object.defineProperty(module, "exports", {
    enumerable: true,
    get: assembleStyles
  });
});

// node_modules/has-flag/index.js
var require_has_flag = __commonJS((exports, module) => {
  module.exports = (flag, argv = process.argv) => {
    const prefix = flag.startsWith("-") ? "" : flag.length === 1 ? "-" : "--";
    const position = argv.indexOf(prefix + flag);
    const terminatorPosition = argv.indexOf("--");
    return position !== -1 && (terminatorPosition === -1 || position < terminatorPosition);
  };
});

// node_modules/supports-color/index.js
var require_supports_color = __commonJS((exports, module) => {
  var os = __require("os");
  var tty = __require("tty");
  var hasFlag = require_has_flag();
  var { env } = process;
  var forceColor;
  if (hasFlag("no-color") || hasFlag("no-colors") || hasFlag("color=false") || hasFlag("color=never")) {
    forceColor = 0;
  } else if (hasFlag("color") || hasFlag("colors") || hasFlag("color=true") || hasFlag("color=always")) {
    forceColor = 1;
  }
  if ("FORCE_COLOR" in env) {
    if (env.FORCE_COLOR === "true") {
      forceColor = 1;
    } else if (env.FORCE_COLOR === "false") {
      forceColor = 0;
    } else {
      forceColor = env.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(env.FORCE_COLOR, 10), 3);
    }
  }
  function translateLevel(level) {
    if (level === 0) {
      return false;
    }
    return {
      level,
      hasBasic: true,
      has256: level >= 2,
      has16m: level >= 3
    };
  }
  function supportsColor(haveStream, streamIsTTY) {
    if (forceColor === 0) {
      return 0;
    }
    if (hasFlag("color=16m") || hasFlag("color=full") || hasFlag("color=truecolor")) {
      return 3;
    }
    if (hasFlag("color=256")) {
      return 2;
    }
    if (haveStream && !streamIsTTY && forceColor === undefined) {
      return 0;
    }
    const min = forceColor || 0;
    if (env.TERM === "dumb") {
      return min;
    }
    if (process.platform === "win32") {
      const osRelease = os.release().split(".");
      if (Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586) {
        return Number(osRelease[2]) >= 14931 ? 3 : 2;
      }
      return 1;
    }
    if ("CI" in env) {
      if (["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "GITHUB_ACTIONS", "BUILDKITE"].some((sign) => (sign in env)) || env.CI_NAME === "codeship") {
        return 1;
      }
      return min;
    }
    if ("TEAMCITY_VERSION" in env) {
      return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
    }
    if (env.COLORTERM === "truecolor") {
      return 3;
    }
    if ("TERM_PROGRAM" in env) {
      const version = parseInt((env.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
      switch (env.TERM_PROGRAM) {
        case "iTerm.app":
          return version >= 3 ? 3 : 2;
        case "Apple_Terminal":
          return 2;
      }
    }
    if (/-256(color)?$/i.test(env.TERM)) {
      return 2;
    }
    if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
      return 1;
    }
    if ("COLORTERM" in env) {
      return 1;
    }
    return min;
  }
  function getSupportLevel(stream) {
    const level = supportsColor(stream, stream && stream.isTTY);
    return translateLevel(level);
  }
  module.exports = {
    supportsColor: getSupportLevel,
    stdout: translateLevel(supportsColor(true, tty.isatty(1))),
    stderr: translateLevel(supportsColor(true, tty.isatty(2)))
  };
});

// node_modules/chalk/source/util.js
var require_util = __commonJS((exports, module) => {
  var stringReplaceAll = (string, substring, replacer) => {
    let index = string.indexOf(substring);
    if (index === -1) {
      return string;
    }
    const substringLength = substring.length;
    let endIndex = 0;
    let returnValue = "";
    do {
      returnValue += string.substr(endIndex, index - endIndex) + substring + replacer;
      endIndex = index + substringLength;
      index = string.indexOf(substring, endIndex);
    } while (index !== -1);
    returnValue += string.substr(endIndex);
    return returnValue;
  };
  var stringEncaseCRLFWithFirstIndex = (string, prefix, postfix, index) => {
    let endIndex = 0;
    let returnValue = "";
    do {
      const gotCR = string[index - 1] === "\r";
      returnValue += string.substr(endIndex, (gotCR ? index - 1 : index) - endIndex) + prefix + (gotCR ? `\r
` : `
`) + postfix;
      endIndex = index + 1;
      index = string.indexOf(`
`, endIndex);
    } while (index !== -1);
    returnValue += string.substr(endIndex);
    return returnValue;
  };
  module.exports = {
    stringReplaceAll,
    stringEncaseCRLFWithFirstIndex
  };
});

// node_modules/chalk/source/templates.js
var require_templates = __commonJS((exports, module) => {
  var TEMPLATE_REGEX = /(?:\\(u(?:[a-f\d]{4}|\{[a-f\d]{1,6}\})|x[a-f\d]{2}|.))|(?:\{(~)?(\w+(?:\([^)]*\))?(?:\.\w+(?:\([^)]*\))?)*)(?:[ \t]|(?=\r?\n)))|(\})|((?:.|[\r\n\f])+?)/gi;
  var STYLE_REGEX = /(?:^|\.)(\w+)(?:\(([^)]*)\))?/g;
  var STRING_REGEX = /^(['"])((?:\\.|(?!\1)[^\\])*)\1$/;
  var ESCAPE_REGEX = /\\(u(?:[a-f\d]{4}|{[a-f\d]{1,6}})|x[a-f\d]{2}|.)|([^\\])/gi;
  var ESCAPES = new Map([
    ["n", `
`],
    ["r", "\r"],
    ["t", "\t"],
    ["b", "\b"],
    ["f", "\f"],
    ["v", "\v"],
    ["0", "\x00"],
    ["\\", "\\"],
    ["e", "\x1B"],
    ["a", "\x07"]
  ]);
  function unescape(c) {
    const u = c[0] === "u";
    const bracket = c[1] === "{";
    if (u && !bracket && c.length === 5 || c[0] === "x" && c.length === 3) {
      return String.fromCharCode(parseInt(c.slice(1), 16));
    }
    if (u && bracket) {
      return String.fromCodePoint(parseInt(c.slice(2, -1), 16));
    }
    return ESCAPES.get(c) || c;
  }
  function parseArguments(name, arguments_) {
    const results = [];
    const chunks = arguments_.trim().split(/\s*,\s*/g);
    let matches;
    for (const chunk of chunks) {
      const number = Number(chunk);
      if (!Number.isNaN(number)) {
        results.push(number);
      } else if (matches = chunk.match(STRING_REGEX)) {
        results.push(matches[2].replace(ESCAPE_REGEX, (m, escape, character) => escape ? unescape(escape) : character));
      } else {
        throw new Error(`Invalid Chalk template style argument: ${chunk} (in style '${name}')`);
      }
    }
    return results;
  }
  function parseStyle(style) {
    STYLE_REGEX.lastIndex = 0;
    const results = [];
    let matches;
    while ((matches = STYLE_REGEX.exec(style)) !== null) {
      const name = matches[1];
      if (matches[2]) {
        const args = parseArguments(name, matches[2]);
        results.push([name].concat(args));
      } else {
        results.push([name]);
      }
    }
    return results;
  }
  function buildStyle(chalk, styles) {
    const enabled = {};
    for (const layer of styles) {
      for (const style of layer.styles) {
        enabled[style[0]] = layer.inverse ? null : style.slice(1);
      }
    }
    let current = chalk;
    for (const [styleName, styles2] of Object.entries(enabled)) {
      if (!Array.isArray(styles2)) {
        continue;
      }
      if (!(styleName in current)) {
        throw new Error(`Unknown Chalk style: ${styleName}`);
      }
      current = styles2.length > 0 ? current[styleName](...styles2) : current[styleName];
    }
    return current;
  }
  module.exports = (chalk, temporary) => {
    const styles = [];
    const chunks = [];
    let chunk = [];
    temporary.replace(TEMPLATE_REGEX, (m, escapeCharacter, inverse, style, close, character) => {
      if (escapeCharacter) {
        chunk.push(unescape(escapeCharacter));
      } else if (style) {
        const string = chunk.join("");
        chunk = [];
        chunks.push(styles.length === 0 ? string : buildStyle(chalk, styles)(string));
        styles.push({ inverse, styles: parseStyle(style) });
      } else if (close) {
        if (styles.length === 0) {
          throw new Error("Found extraneous } in Chalk template literal");
        }
        chunks.push(buildStyle(chalk, styles)(chunk.join("")));
        chunk = [];
        styles.pop();
      } else {
        chunk.push(character);
      }
    });
    chunks.push(chunk.join(""));
    if (styles.length > 0) {
      const errMessage = `Chalk template literal is missing ${styles.length} closing bracket${styles.length === 1 ? "" : "s"} (\`}\`)`;
      throw new Error(errMessage);
    }
    return chunks.join("");
  };
});

// node_modules/chalk/source/index.js
var require_source = __commonJS((exports, module) => {
  var ansiStyles = require_ansi_styles();
  var { stdout: stdoutColor, stderr: stderrColor } = require_supports_color();
  var {
    stringReplaceAll,
    stringEncaseCRLFWithFirstIndex
  } = require_util();
  var { isArray } = Array;
  var levelMapping = [
    "ansi",
    "ansi",
    "ansi256",
    "ansi16m"
  ];
  var styles = Object.create(null);
  var applyOptions = (object, options = {}) => {
    if (options.level && !(Number.isInteger(options.level) && options.level >= 0 && options.level <= 3)) {
      throw new Error("The `level` option should be an integer from 0 to 3");
    }
    const colorLevel = stdoutColor ? stdoutColor.level : 0;
    object.level = options.level === undefined ? colorLevel : options.level;
  };

  class ChalkClass {
    constructor(options) {
      return chalkFactory(options);
    }
  }
  var chalkFactory = (options) => {
    const chalk2 = {};
    applyOptions(chalk2, options);
    chalk2.template = (...arguments_) => chalkTag(chalk2.template, ...arguments_);
    Object.setPrototypeOf(chalk2, Chalk.prototype);
    Object.setPrototypeOf(chalk2.template, chalk2);
    chalk2.template.constructor = () => {
      throw new Error("`chalk.constructor()` is deprecated. Use `new chalk.Instance()` instead.");
    };
    chalk2.template.Instance = ChalkClass;
    return chalk2.template;
  };
  function Chalk(options) {
    return chalkFactory(options);
  }
  for (const [styleName, style] of Object.entries(ansiStyles)) {
    styles[styleName] = {
      get() {
        const builder = createBuilder(this, createStyler(style.open, style.close, this._styler), this._isEmpty);
        Object.defineProperty(this, styleName, { value: builder });
        return builder;
      }
    };
  }
  styles.visible = {
    get() {
      const builder = createBuilder(this, this._styler, true);
      Object.defineProperty(this, "visible", { value: builder });
      return builder;
    }
  };
  var usedModels = ["rgb", "hex", "keyword", "hsl", "hsv", "hwb", "ansi", "ansi256"];
  for (const model of usedModels) {
    styles[model] = {
      get() {
        const { level } = this;
        return function(...arguments_) {
          const styler = createStyler(ansiStyles.color[levelMapping[level]][model](...arguments_), ansiStyles.color.close, this._styler);
          return createBuilder(this, styler, this._isEmpty);
        };
      }
    };
  }
  for (const model of usedModels) {
    const bgModel = "bg" + model[0].toUpperCase() + model.slice(1);
    styles[bgModel] = {
      get() {
        const { level } = this;
        return function(...arguments_) {
          const styler = createStyler(ansiStyles.bgColor[levelMapping[level]][model](...arguments_), ansiStyles.bgColor.close, this._styler);
          return createBuilder(this, styler, this._isEmpty);
        };
      }
    };
  }
  var proto = Object.defineProperties(() => {}, {
    ...styles,
    level: {
      enumerable: true,
      get() {
        return this._generator.level;
      },
      set(level) {
        this._generator.level = level;
      }
    }
  });
  var createStyler = (open, close, parent) => {
    let openAll;
    let closeAll;
    if (parent === undefined) {
      openAll = open;
      closeAll = close;
    } else {
      openAll = parent.openAll + open;
      closeAll = close + parent.closeAll;
    }
    return {
      open,
      close,
      openAll,
      closeAll,
      parent
    };
  };
  var createBuilder = (self, _styler, _isEmpty) => {
    const builder = (...arguments_) => {
      if (isArray(arguments_[0]) && isArray(arguments_[0].raw)) {
        return applyStyle(builder, chalkTag(builder, ...arguments_));
      }
      return applyStyle(builder, arguments_.length === 1 ? "" + arguments_[0] : arguments_.join(" "));
    };
    Object.setPrototypeOf(builder, proto);
    builder._generator = self;
    builder._styler = _styler;
    builder._isEmpty = _isEmpty;
    return builder;
  };
  var applyStyle = (self, string) => {
    if (self.level <= 0 || !string) {
      return self._isEmpty ? "" : string;
    }
    let styler = self._styler;
    if (styler === undefined) {
      return string;
    }
    const { openAll, closeAll } = styler;
    if (string.indexOf("\x1B") !== -1) {
      while (styler !== undefined) {
        string = stringReplaceAll(string, styler.close, styler.open);
        styler = styler.parent;
      }
    }
    const lfIndex = string.indexOf(`
`);
    if (lfIndex !== -1) {
      string = stringEncaseCRLFWithFirstIndex(string, closeAll, openAll, lfIndex);
    }
    return openAll + string + closeAll;
  };
  var template;
  var chalkTag = (chalk2, ...strings) => {
    const [firstString] = strings;
    if (!isArray(firstString) || !isArray(firstString.raw)) {
      return strings.join(" ");
    }
    const arguments_ = strings.slice(1);
    const parts = [firstString.raw[0]];
    for (let i = 1;i < firstString.length; i++) {
      parts.push(String(arguments_[i - 1]).replace(/[{}\\]/g, "\\$&"), String(firstString.raw[i]));
    }
    if (template === undefined) {
      template = require_templates();
    }
    return template(chalk2, parts.join(""));
  };
  Object.defineProperties(Chalk.prototype, styles);
  var chalk = Chalk();
  chalk.supportsColor = stdoutColor;
  chalk.stderr = Chalk({ level: stderrColor ? stderrColor.level : 0 });
  chalk.stderr.supportsColor = stderrColor;
  module.exports = chalk;
});

// node_modules/ansi-colors/symbols.js
var require_symbols = __commonJS((exports, module) => {
  var isHyper = typeof process !== "undefined" && process.env.TERM_PROGRAM === "Hyper";
  var isWindows = typeof process !== "undefined" && process.platform === "win32";
  var isLinux = typeof process !== "undefined" && process.platform === "linux";
  var common = {
    ballotDisabled: "\u2612",
    ballotOff: "\u2610",
    ballotOn: "\u2611",
    bullet: "\u2022",
    bulletWhite: "\u25E6",
    fullBlock: "\u2588",
    heart: "\u2764",
    identicalTo: "\u2261",
    line: "\u2500",
    mark: "\u203B",
    middot: "\xB7",
    minus: "\uFF0D",
    multiplication: "\xD7",
    obelus: "\xF7",
    pencilDownRight: "\u270E",
    pencilRight: "\u270F",
    pencilUpRight: "\u2710",
    percent: "%",
    pilcrow2: "\u2761",
    pilcrow: "\xB6",
    plusMinus: "\xB1",
    question: "?",
    section: "\xA7",
    starsOff: "\u2606",
    starsOn: "\u2605",
    upDownArrow: "\u2195"
  };
  var windows = Object.assign({}, common, {
    check: "\u221A",
    cross: "\xD7",
    ellipsisLarge: "...",
    ellipsis: "...",
    info: "i",
    questionSmall: "?",
    pointer: ">",
    pointerSmall: "\xBB",
    radioOff: "( )",
    radioOn: "(*)",
    warning: "\u203C"
  });
  var other = Object.assign({}, common, {
    ballotCross: "\u2718",
    check: "\u2714",
    cross: "\u2716",
    ellipsisLarge: "\u22EF",
    ellipsis: "\u2026",
    info: "\u2139",
    questionFull: "\uFF1F",
    questionSmall: "\uFE56",
    pointer: isLinux ? "\u25B8" : "\u276F",
    pointerSmall: isLinux ? "\u2023" : "\u203A",
    radioOff: "\u25EF",
    radioOn: "\u25C9",
    warning: "\u26A0"
  });
  module.exports = isWindows && !isHyper ? windows : other;
  Reflect.defineProperty(module.exports, "common", { enumerable: false, value: common });
  Reflect.defineProperty(module.exports, "windows", { enumerable: false, value: windows });
  Reflect.defineProperty(module.exports, "other", { enumerable: false, value: other });
});

// node_modules/ansi-colors/index.js
var require_ansi_colors = __commonJS((exports, module) => {
  var isObject = (val) => val !== null && typeof val === "object" && !Array.isArray(val);
  var ANSI_REGEX = /[\u001b\u009b][[\]#;?()]*(?:(?:(?:[^\W_]*;?[^\W_]*)\u0007)|(?:(?:[0-9]{1,4}(;[0-9]{0,4})*)?[~0-9=<>cf-nqrtyA-PRZ]))/g;
  var hasColor = () => {
    if (typeof process !== "undefined") {
      return process.env.FORCE_COLOR !== "0";
    }
    return false;
  };
  var create = () => {
    const colors = {
      enabled: hasColor(),
      visible: true,
      styles: {},
      keys: {}
    };
    const ansi = (style2) => {
      let open = style2.open = `\x1B[${style2.codes[0]}m`;
      let close = style2.close = `\x1B[${style2.codes[1]}m`;
      let regex = style2.regex = new RegExp(`\\u001b\\[${style2.codes[1]}m`, "g");
      style2.wrap = (input2, newline) => {
        if (input2.includes(close))
          input2 = input2.replace(regex, close + open);
        let output = open + input2 + close;
        return newline ? output.replace(/\r*\n/g, `${close}$&${open}`) : output;
      };
      return style2;
    };
    const wrap = (style2, input2, newline) => {
      return typeof style2 === "function" ? style2(input2) : style2.wrap(input2, newline);
    };
    const style = (input2, stack) => {
      if (input2 === "" || input2 == null)
        return "";
      if (colors.enabled === false)
        return input2;
      if (colors.visible === false)
        return "";
      let str = "" + input2;
      let nl = str.includes(`
`);
      let n = stack.length;
      if (n > 0 && stack.includes("unstyle")) {
        stack = [...new Set(["unstyle", ...stack])].reverse();
      }
      while (n-- > 0)
        str = wrap(colors.styles[stack[n]], str, nl);
      return str;
    };
    const define = (name, codes, type) => {
      colors.styles[name] = ansi({ name, codes });
      let keys = colors.keys[type] || (colors.keys[type] = []);
      keys.push(name);
      Reflect.defineProperty(colors, name, {
        configurable: true,
        enumerable: true,
        set(value) {
          colors.alias(name, value);
        },
        get() {
          let color = (input2) => style(input2, color.stack);
          Reflect.setPrototypeOf(color, colors);
          color.stack = this.stack ? this.stack.concat(name) : [name];
          return color;
        }
      });
    };
    define("reset", [0, 0], "modifier");
    define("bold", [1, 22], "modifier");
    define("dim", [2, 22], "modifier");
    define("italic", [3, 23], "modifier");
    define("underline", [4, 24], "modifier");
    define("inverse", [7, 27], "modifier");
    define("hidden", [8, 28], "modifier");
    define("strikethrough", [9, 29], "modifier");
    define("black", [30, 39], "color");
    define("red", [31, 39], "color");
    define("green", [32, 39], "color");
    define("yellow", [33, 39], "color");
    define("blue", [34, 39], "color");
    define("magenta", [35, 39], "color");
    define("cyan", [36, 39], "color");
    define("white", [37, 39], "color");
    define("gray", [90, 39], "color");
    define("grey", [90, 39], "color");
    define("bgBlack", [40, 49], "bg");
    define("bgRed", [41, 49], "bg");
    define("bgGreen", [42, 49], "bg");
    define("bgYellow", [43, 49], "bg");
    define("bgBlue", [44, 49], "bg");
    define("bgMagenta", [45, 49], "bg");
    define("bgCyan", [46, 49], "bg");
    define("bgWhite", [47, 49], "bg");
    define("blackBright", [90, 39], "bright");
    define("redBright", [91, 39], "bright");
    define("greenBright", [92, 39], "bright");
    define("yellowBright", [93, 39], "bright");
    define("blueBright", [94, 39], "bright");
    define("magentaBright", [95, 39], "bright");
    define("cyanBright", [96, 39], "bright");
    define("whiteBright", [97, 39], "bright");
    define("bgBlackBright", [100, 49], "bgBright");
    define("bgRedBright", [101, 49], "bgBright");
    define("bgGreenBright", [102, 49], "bgBright");
    define("bgYellowBright", [103, 49], "bgBright");
    define("bgBlueBright", [104, 49], "bgBright");
    define("bgMagentaBright", [105, 49], "bgBright");
    define("bgCyanBright", [106, 49], "bgBright");
    define("bgWhiteBright", [107, 49], "bgBright");
    colors.ansiRegex = ANSI_REGEX;
    colors.hasColor = colors.hasAnsi = (str) => {
      colors.ansiRegex.lastIndex = 0;
      return typeof str === "string" && str !== "" && colors.ansiRegex.test(str);
    };
    colors.alias = (name, color) => {
      let fn = typeof color === "string" ? colors[color] : color;
      if (typeof fn !== "function") {
        throw new TypeError("Expected alias to be the name of an existing color (string) or a function");
      }
      if (!fn.stack) {
        Reflect.defineProperty(fn, "name", { value: name });
        colors.styles[name] = fn;
        fn.stack = [name];
      }
      Reflect.defineProperty(colors, name, {
        configurable: true,
        enumerable: true,
        set(value) {
          colors.alias(name, value);
        },
        get() {
          let color2 = (input2) => style(input2, color2.stack);
          Reflect.setPrototypeOf(color2, colors);
          color2.stack = this.stack ? this.stack.concat(fn.stack) : fn.stack;
          return color2;
        }
      });
    };
    colors.theme = (custom) => {
      if (!isObject(custom))
        throw new TypeError("Expected theme to be an object");
      for (let name of Object.keys(custom)) {
        colors.alias(name, custom[name]);
      }
      return colors;
    };
    colors.alias("unstyle", (str) => {
      if (typeof str === "string" && str !== "") {
        colors.ansiRegex.lastIndex = 0;
        return str.replace(colors.ansiRegex, "");
      }
      return "";
    });
    colors.alias("noop", (str) => str);
    colors.none = colors.clear = colors.noop;
    colors.stripColor = colors.unstyle;
    colors.symbols = require_symbols();
    colors.define = define;
    return colors;
  };
  module.exports = create();
  module.exports.create = create;
});

// node_modules/enquirer/lib/utils.js
var require_utils = __commonJS((exports) => {
  var toString = Object.prototype.toString;
  var colors = require_ansi_colors();
  var onExitCalled = false;
  var onExitCallbacks = new Set;
  var complements = {
    yellow: "blue",
    cyan: "red",
    green: "magenta",
    black: "white",
    blue: "yellow",
    red: "cyan",
    magenta: "green",
    white: "black"
  };
  exports.longest = (arr, prop) => {
    return arr.reduce((a, v) => Math.max(a, prop ? v[prop].length : v.length), 0);
  };
  exports.hasColor = (str) => !!str && colors.hasColor(str);
  var isObject = exports.isObject = (val) => {
    return val !== null && typeof val === "object" && !Array.isArray(val);
  };
  exports.nativeType = (val) => {
    return toString.call(val).slice(8, -1).toLowerCase().replace(/\s/g, "");
  };
  exports.isAsyncFn = (val) => {
    return exports.nativeType(val) === "asyncfunction";
  };
  exports.isPrimitive = (val) => {
    return val != null && typeof val !== "object" && typeof val !== "function";
  };
  exports.resolve = (context, value, ...rest) => {
    if (typeof value === "function") {
      return value.call(context, ...rest);
    }
    return value;
  };
  exports.scrollDown = (choices = []) => [...choices.slice(1), choices[0]];
  exports.scrollUp = (choices = []) => [choices.pop(), ...choices];
  exports.reorder = (arr = []) => {
    let res = arr.slice();
    res.sort((a, b) => {
      if (a.index > b.index)
        return 1;
      if (a.index < b.index)
        return -1;
      return 0;
    });
    return res;
  };
  exports.swap = (arr, index, pos) => {
    let len = arr.length;
    let idx = pos === len ? 0 : pos < 0 ? len - 1 : pos;
    let choice = arr[index];
    arr[index] = arr[idx];
    arr[idx] = choice;
  };
  exports.width = (stream, fallback = 80) => {
    let columns = stream && stream.columns ? stream.columns : fallback;
    if (stream && typeof stream.getWindowSize === "function") {
      columns = stream.getWindowSize()[0];
    }
    if (process.platform === "win32") {
      return columns - 1;
    }
    return columns;
  };
  exports.height = (stream, fallback = 20) => {
    let rows = stream && stream.rows ? stream.rows : fallback;
    if (stream && typeof stream.getWindowSize === "function") {
      rows = stream.getWindowSize()[1];
    }
    return rows;
  };
  exports.wordWrap = (str, options = {}) => {
    if (!str)
      return str;
    if (typeof options === "number") {
      options = { width: options };
    }
    let { indent = "", newline = `
` + indent, width = 80 } = options;
    let spaces = (newline + indent).match(/[^\S\n]/g) || [];
    width -= spaces.length;
    let source = `.{1,${width}}([\\s\\u200B]+|$)|[^\\s\\u200B]+?([\\s\\u200B]+|$)`;
    let output = str.trim();
    let regex = new RegExp(source, "g");
    let lines = output.match(regex) || [];
    lines = lines.map((line) => line.replace(/\n$/, ""));
    if (options.padEnd)
      lines = lines.map((line) => line.padEnd(width, " "));
    if (options.padStart)
      lines = lines.map((line) => line.padStart(width, " "));
    return indent + lines.join(newline);
  };
  exports.unmute = (color) => {
    let name = color.stack.find((n) => colors.keys.color.includes(n));
    if (name) {
      return colors[name];
    }
    let bg = color.stack.find((n) => n.slice(2) === "bg");
    if (bg) {
      return colors[name.slice(2)];
    }
    return (str) => str;
  };
  exports.pascal = (str) => str ? str[0].toUpperCase() + str.slice(1) : "";
  exports.inverse = (color) => {
    if (!color || !color.stack)
      return color;
    let name = color.stack.find((n) => colors.keys.color.includes(n));
    if (name) {
      let col = colors["bg" + exports.pascal(name)];
      return col ? col.black : color;
    }
    let bg = color.stack.find((n) => n.slice(0, 2) === "bg");
    if (bg) {
      return colors[bg.slice(2).toLowerCase()] || color;
    }
    return colors.none;
  };
  exports.complement = (color) => {
    if (!color || !color.stack)
      return color;
    let name = color.stack.find((n) => colors.keys.color.includes(n));
    let bg = color.stack.find((n) => n.slice(0, 2) === "bg");
    if (name && !bg) {
      return colors[complements[name] || name];
    }
    if (bg) {
      let lower = bg.slice(2).toLowerCase();
      let comp = complements[lower];
      if (!comp)
        return color;
      return colors["bg" + exports.pascal(comp)] || color;
    }
    return colors.none;
  };
  exports.meridiem = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    let hrs = hours === 0 ? 12 : hours;
    let min = minutes < 10 ? "0" + minutes : minutes;
    return hrs + ":" + min + " " + ampm;
  };
  exports.set = (obj = {}, prop = "", val) => {
    return prop.split(".").reduce((acc, k, i, arr) => {
      let value = arr.length - 1 > i ? acc[k] || {} : val;
      if (!exports.isObject(value) && i < arr.length - 1)
        value = {};
      return acc[k] = value;
    }, obj);
  };
  exports.get = (obj = {}, prop = "", fallback) => {
    let value = obj[prop] == null ? prop.split(".").reduce((acc, k) => acc && acc[k], obj) : obj[prop];
    return value == null ? fallback : value;
  };
  exports.mixin = (target, b) => {
    if (!isObject(target))
      return b;
    if (!isObject(b))
      return target;
    for (let key of Object.keys(b)) {
      let desc = Object.getOwnPropertyDescriptor(b, key);
      if (hasOwnProperty.call(desc, "value")) {
        if (hasOwnProperty.call(target, key) && isObject(desc.value)) {
          let existing = Object.getOwnPropertyDescriptor(target, key);
          if (isObject(existing.value) && existing.value !== desc.value) {
            target[key] = exports.merge({}, target[key], b[key]);
          } else {
            Reflect.defineProperty(target, key, desc);
          }
        } else {
          Reflect.defineProperty(target, key, desc);
        }
      } else {
        Reflect.defineProperty(target, key, desc);
      }
    }
    return target;
  };
  exports.merge = (...args) => {
    let target = {};
    for (let ele of args)
      exports.mixin(target, ele);
    return target;
  };
  exports.mixinEmitter = (obj, emitter) => {
    let proto = emitter.constructor.prototype;
    for (let key of Object.keys(proto)) {
      let val = proto[key];
      if (typeof val === "function") {
        exports.define(obj, key, val.bind(emitter));
      } else {
        exports.define(obj, key, val);
      }
    }
  };
  var onExit = (quit, code) => {
    if (onExitCalled)
      return;
    onExitCalled = true;
    onExitCallbacks.forEach((fn) => fn());
    if (quit === true) {
      process.exit(128 + code);
    }
  };
  var onSigTerm = onExit.bind(null, true, 15);
  var onSigInt = onExit.bind(null, true, 2);
  exports.onExit = (callback) => {
    if (onExitCallbacks.size === 0) {
      process.once("SIGTERM", onSigTerm);
      process.once("SIGINT", onSigInt);
      process.once("exit", onExit);
    }
    onExitCallbacks.add(callback);
    return () => {
      onExitCallbacks.delete(callback);
      if (onExitCallbacks.size === 0) {
        process.off("SIGTERM", onSigTerm);
        process.off("SIGINT", onSigInt);
        process.off("exit", onExit);
      }
    };
  };
  exports.define = (obj, key, value) => {
    Reflect.defineProperty(obj, key, { value });
  };
  exports.defineExport = (obj, key, fn) => {
    let custom;
    Reflect.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      set(val) {
        custom = val;
      },
      get() {
        return custom ? custom() : fn();
      }
    });
  };
});

// node_modules/ansi-regex/index.js
var require_ansi_regex = __commonJS((exports, module) => {
  module.exports = ({ onlyFirst = false } = {}) => {
    const pattern = [
      "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)",
      "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))"
    ].join("|");
    return new RegExp(pattern, onlyFirst ? undefined : "g");
  };
});

// node_modules/strip-ansi/index.js
var require_strip_ansi = __commonJS((exports, module) => {
  var ansiRegex = require_ansi_regex();
  module.exports = (string) => typeof string === "string" ? string.replace(ansiRegex(), "") : string;
});

// node_modules/enquirer/lib/combos.js
var require_combos = __commonJS((exports) => {
  exports.ctrl = {
    a: "first",
    b: "backward",
    c: "cancel",
    d: "deleteForward",
    e: "last",
    f: "forward",
    g: "reset",
    i: "tab",
    k: "cutForward",
    l: "reset",
    n: "newItem",
    m: "cancel",
    j: "submit",
    p: "search",
    r: "remove",
    s: "save",
    u: "undo",
    w: "cutLeft",
    x: "toggleCursor",
    v: "paste"
  };
  exports.shift = {
    up: "shiftUp",
    down: "shiftDown",
    left: "shiftLeft",
    right: "shiftRight",
    tab: "prev"
  };
  exports.fn = {
    up: "pageUp",
    down: "pageDown",
    left: "pageLeft",
    right: "pageRight",
    delete: "deleteForward"
  };
  exports.option = {
    b: "backward",
    f: "forward",
    d: "cutRight",
    left: "cutLeft",
    up: "altUp",
    down: "altDown"
  };
  exports.keys = {
    pageup: "pageUp",
    pagedown: "pageDown",
    home: "home",
    end: "end",
    cancel: "cancel",
    delete: "deleteForward",
    backspace: "delete",
    down: "down",
    enter: "submit",
    escape: "cancel",
    left: "left",
    space: "space",
    number: "number",
    return: "submit",
    right: "right",
    tab: "next",
    up: "up"
  };
});

// node_modules/enquirer/lib/queue.js
var require_queue = __commonJS((exports, module) => {
  module.exports = class Queue {
    _queue = [];
    _executing = false;
    _jobRunner = null;
    constructor(jobRunner) {
      this._jobRunner = jobRunner;
    }
    enqueue = (...args) => {
      this._queue.push(args);
      this._dequeue();
    };
    destroy() {
      this._queue.length = 0;
      this._jobRunner = null;
    }
    _dequeue() {
      if (this._executing || !this._queue.length)
        return;
      this._executing = true;
      this._jobRunner(...this._queue.shift());
      setTimeout(() => {
        this._executing = false;
        this._dequeue();
      });
    }
  };
});

// node_modules/enquirer/lib/keypress.js
var require_keypress = __commonJS((exports, module) => {
  var readline = __require("readline");
  var combos = require_combos();
  var Queue = require_queue();
  var metaKeyCodeRe = /^(?:\x1b)([a-zA-Z0-9])$/;
  var fnKeyRe = /^(?:\x1b+)(O|N|\[|\[\[)(?:(\d+)(?:;(\d+))?([~^$])|(?:1;)?(\d+)?([a-zA-Z]))/;
  var keyName = {
    OP: "f1",
    OQ: "f2",
    OR: "f3",
    OS: "f4",
    "[11~": "f1",
    "[12~": "f2",
    "[13~": "f3",
    "[14~": "f4",
    "[[A": "f1",
    "[[B": "f2",
    "[[C": "f3",
    "[[D": "f4",
    "[[E": "f5",
    "[15~": "f5",
    "[17~": "f6",
    "[18~": "f7",
    "[19~": "f8",
    "[20~": "f9",
    "[21~": "f10",
    "[23~": "f11",
    "[24~": "f12",
    "[A": "up",
    "[B": "down",
    "[C": "right",
    "[D": "left",
    "[E": "clear",
    "[F": "end",
    "[H": "home",
    OA: "up",
    OB: "down",
    OC: "right",
    OD: "left",
    OE: "clear",
    OF: "end",
    OH: "home",
    "[1~": "home",
    "[2~": "insert",
    "[3~": "delete",
    "[4~": "end",
    "[5~": "pageup",
    "[6~": "pagedown",
    "[[5~": "pageup",
    "[[6~": "pagedown",
    "[7~": "home",
    "[8~": "end",
    "[a": "up",
    "[b": "down",
    "[c": "right",
    "[d": "left",
    "[e": "clear",
    "[2$": "insert",
    "[3$": "delete",
    "[5$": "pageup",
    "[6$": "pagedown",
    "[7$": "home",
    "[8$": "end",
    Oa: "up",
    Ob: "down",
    Oc: "right",
    Od: "left",
    Oe: "clear",
    "[2^": "insert",
    "[3^": "delete",
    "[5^": "pageup",
    "[6^": "pagedown",
    "[7^": "home",
    "[8^": "end",
    "[Z": "tab"
  };
  function isShiftKey(code) {
    return ["[a", "[b", "[c", "[d", "[e", "[2$", "[3$", "[5$", "[6$", "[7$", "[8$", "[Z"].includes(code);
  }
  function isCtrlKey(code) {
    return ["Oa", "Ob", "Oc", "Od", "Oe", "[2^", "[3^", "[5^", "[6^", "[7^", "[8^"].includes(code);
  }
  var keypress = (s = "", event = {}) => {
    let parts;
    let key = {
      name: event.name,
      ctrl: false,
      meta: false,
      shift: false,
      option: false,
      sequence: s,
      raw: s,
      ...event
    };
    if (Buffer.isBuffer(s)) {
      if (s[0] > 127 && s[1] === undefined) {
        s[0] -= 128;
        s = "\x1B" + String(s);
      } else {
        s = String(s);
      }
    } else if (s !== undefined && typeof s !== "string") {
      s = String(s);
    } else if (!s) {
      s = key.sequence || "";
    }
    key.sequence = key.sequence || s || key.name;
    if (s === "\r") {
      key.raw = undefined;
      key.name = "return";
    } else if (s === `
`) {
      key.name = "enter";
    } else if (s === "\t") {
      key.name = "tab";
    } else if (s === "\b" || s === "\x7F" || s === "\x1B\x7F" || s === "\x1B\b") {
      key.name = "backspace";
      key.meta = s.charAt(0) === "\x1B";
    } else if (s === "\x1B" || s === "\x1B\x1B") {
      key.name = "escape";
      key.meta = s.length === 2;
    } else if (s === " " || s === "\x1B ") {
      key.name = "space";
      key.meta = s.length === 2;
    } else if (s <= "\x1A") {
      key.name = String.fromCharCode(s.charCodeAt(0) + 97 - 1);
      key.ctrl = true;
    } else if (s.length === 1 && s >= "0" && s <= "9") {
      key.name = "number";
    } else if (s.length === 1 && s >= "a" && s <= "z") {
      key.name = s;
    } else if (s.length === 1 && s >= "A" && s <= "Z") {
      key.name = s.toLowerCase();
      key.shift = true;
    } else if (parts = metaKeyCodeRe.exec(s)) {
      key.meta = true;
      key.shift = /^[A-Z]$/.test(parts[1]);
    } else if (parts = fnKeyRe.exec(s)) {
      let segs = [...s];
      if (segs[0] === "\x1B" && segs[1] === "\x1B") {
        key.option = true;
      }
      let code = [parts[1], parts[2], parts[4], parts[6]].filter(Boolean).join("");
      let modifier = (parts[3] || parts[5] || 1) - 1;
      key.ctrl = !!(modifier & 4);
      key.meta = !!(modifier & 10);
      key.shift = !!(modifier & 1);
      key.code = code;
      key.name = keyName[code];
      key.shift = isShiftKey(code) || key.shift;
      key.ctrl = isCtrlKey(code) || key.ctrl;
    }
    return key;
  };
  keypress.listen = (options = {}, onKeypress) => {
    let { stdin } = options;
    if (!stdin || stdin !== process.stdin && !stdin.isTTY) {
      throw new Error("Invalid stream passed");
    }
    let rl = readline.createInterface({ terminal: true, input: stdin });
    readline.emitKeypressEvents(stdin, rl);
    const queue = new Queue((buf, key) => onKeypress(buf, keypress(buf, key), rl));
    let isRaw = stdin.isRaw;
    if (stdin.isTTY)
      stdin.setRawMode(true);
    stdin.on("keypress", queue.enqueue);
    rl.resume();
    let off = () => {
      if (stdin.isTTY)
        stdin.setRawMode(isRaw);
      stdin.removeListener("keypress", queue.enqueue);
      queue.destroy();
      rl.pause();
      rl.close();
    };
    return off;
  };
  keypress.action = (buf, key, customActions) => {
    let obj = { ...combos, ...customActions };
    if (key.ctrl) {
      key.action = obj.ctrl[key.name];
      return key;
    }
    if (key.option && obj.option) {
      key.action = obj.option[key.name];
      return key;
    }
    if (key.shift) {
      key.action = obj.shift[key.name];
      return key;
    }
    key.action = obj.keys[key.name];
    return key;
  };
  module.exports = keypress;
});

// node_modules/enquirer/lib/timer.js
var require_timer = __commonJS((exports, module) => {
  module.exports = (prompt) => {
    prompt.timers = prompt.timers || {};
    let timers = prompt.options.timers;
    if (!timers)
      return;
    for (let key of Object.keys(timers)) {
      let opts = timers[key];
      if (typeof opts === "number") {
        opts = { interval: opts };
      }
      create(prompt, key, opts);
    }
  };
  function create(prompt, name, options = {}) {
    let timer = prompt.timers[name] = { name, start: Date.now(), ms: 0, tick: 0 };
    let ms = options.interval || 120;
    timer.frames = options.frames || [];
    timer.loading = true;
    let interval = setInterval(() => {
      timer.ms = Date.now() - timer.start;
      timer.tick++;
      prompt.render();
    }, ms);
    timer.stop = () => {
      timer.loading = false;
      clearInterval(interval);
    };
    Reflect.defineProperty(timer, "interval", { value: interval });
    prompt.once("close", () => timer.stop());
    return timer.stop;
  }
});

// node_modules/enquirer/lib/state.js
var require_state = __commonJS((exports, module) => {
  var { define, width } = require_utils();

  class State {
    constructor(prompt) {
      let options = prompt.options;
      define(this, "_prompt", prompt);
      this.type = prompt.type;
      this.name = prompt.name;
      this.message = "";
      this.header = "";
      this.footer = "";
      this.error = "";
      this.hint = "";
      this.input = "";
      this.cursor = 0;
      this.index = 0;
      this.lines = 0;
      this.tick = 0;
      this.prompt = "";
      this.buffer = "";
      this.width = width(options.stdout || process.stdout);
      Object.assign(this, options);
      this.name = this.name || this.message;
      this.message = this.message || this.name;
      this.symbols = prompt.symbols;
      this.styles = prompt.styles;
      this.required = new Set;
      this.cancelled = false;
      this.submitted = false;
    }
    clone() {
      let state = { ...this };
      state.status = this.status;
      state.buffer = Buffer.from(state.buffer);
      delete state.clone;
      return state;
    }
    set color(val) {
      this._color = val;
    }
    get color() {
      let styles = this.prompt.styles;
      if (this.cancelled)
        return styles.cancelled;
      if (this.submitted)
        return styles.submitted;
      let color = this._color || styles[this.status];
      return typeof color === "function" ? color : styles.pending;
    }
    set loading(value) {
      this._loading = value;
    }
    get loading() {
      if (typeof this._loading === "boolean")
        return this._loading;
      if (this.loadingChoices)
        return "choices";
      return false;
    }
    get status() {
      if (this.cancelled)
        return "cancelled";
      if (this.submitted)
        return "submitted";
      return "pending";
    }
  }
  module.exports = State;
});

// node_modules/enquirer/lib/styles.js
var require_styles = __commonJS((exports, module) => {
  var utils = require_utils();
  var colors = require_ansi_colors();
  var styles = {
    default: colors.noop,
    noop: colors.noop,
    set inverse(custom) {
      this._inverse = custom;
    },
    get inverse() {
      return this._inverse || utils.inverse(this.primary);
    },
    set complement(custom) {
      this._complement = custom;
    },
    get complement() {
      return this._complement || utils.complement(this.primary);
    },
    primary: colors.cyan,
    success: colors.green,
    danger: colors.magenta,
    strong: colors.bold,
    warning: colors.yellow,
    muted: colors.dim,
    disabled: colors.gray,
    dark: colors.dim.gray,
    underline: colors.underline,
    set info(custom) {
      this._info = custom;
    },
    get info() {
      return this._info || this.primary;
    },
    set em(custom) {
      this._em = custom;
    },
    get em() {
      return this._em || this.primary.underline;
    },
    set heading(custom) {
      this._heading = custom;
    },
    get heading() {
      return this._heading || this.muted.underline;
    },
    set pending(custom) {
      this._pending = custom;
    },
    get pending() {
      return this._pending || this.primary;
    },
    set submitted(custom) {
      this._submitted = custom;
    },
    get submitted() {
      return this._submitted || this.success;
    },
    set cancelled(custom) {
      this._cancelled = custom;
    },
    get cancelled() {
      return this._cancelled || this.danger;
    },
    set typing(custom) {
      this._typing = custom;
    },
    get typing() {
      return this._typing || this.dim;
    },
    set placeholder(custom) {
      this._placeholder = custom;
    },
    get placeholder() {
      return this._placeholder || this.primary.dim;
    },
    set highlight(custom) {
      this._highlight = custom;
    },
    get highlight() {
      return this._highlight || this.inverse;
    }
  };
  styles.merge = (options = {}) => {
    if (options.styles && typeof options.styles.enabled === "boolean") {
      colors.enabled = options.styles.enabled;
    }
    if (options.styles && typeof options.styles.visible === "boolean") {
      colors.visible = options.styles.visible;
    }
    let result = utils.merge({}, styles, options.styles);
    delete result.merge;
    for (let key of Object.keys(colors)) {
      if (!hasOwnProperty.call(result, key)) {
        Reflect.defineProperty(result, key, { get: () => colors[key] });
      }
    }
    for (let key of Object.keys(colors.styles)) {
      if (!hasOwnProperty.call(result, key)) {
        Reflect.defineProperty(result, key, { get: () => colors[key] });
      }
    }
    return result;
  };
  module.exports = styles;
});

// node_modules/enquirer/lib/symbols.js
var require_symbols2 = __commonJS((exports, module) => {
  var isWindows = process.platform === "win32";
  var colors = require_ansi_colors();
  var utils = require_utils();
  var symbols = {
    ...colors.symbols,
    upDownDoubleArrow: "\u21D5",
    upDownDoubleArrow2: "\u2B0D",
    upDownArrow: "\u2195",
    asterisk: "*",
    asterism: "\u2042",
    bulletWhite: "\u25E6",
    electricArrow: "\u2301",
    ellipsisLarge: "\u22EF",
    ellipsisSmall: "\u2026",
    fullBlock: "\u2588",
    identicalTo: "\u2261",
    indicator: colors.symbols.check,
    leftAngle: "\u2039",
    mark: "\u203B",
    minus: "\u2212",
    multiplication: "\xD7",
    obelus: "\xF7",
    percent: "%",
    pilcrow: "\xB6",
    pilcrow2: "\u2761",
    pencilUpRight: "\u2710",
    pencilDownRight: "\u270E",
    pencilRight: "\u270F",
    plus: "+",
    plusMinus: "\xB1",
    pointRight: "\u261E",
    rightAngle: "\u203A",
    section: "\xA7",
    hexagon: { off: "\u2B21", on: "\u2B22", disabled: "\u2B22" },
    ballot: { on: "\u2611", off: "\u2610", disabled: "\u2612" },
    stars: { on: "\u2605", off: "\u2606", disabled: "\u2606" },
    folder: { on: "\u25BC", off: "\u25B6", disabled: "\u25B6" },
    prefix: {
      pending: colors.symbols.question,
      submitted: colors.symbols.check,
      cancelled: colors.symbols.cross
    },
    separator: {
      pending: colors.symbols.pointerSmall,
      submitted: colors.symbols.middot,
      cancelled: colors.symbols.middot
    },
    radio: {
      off: isWindows ? "( )" : "\u25EF",
      on: isWindows ? "(*)" : "\u25C9",
      disabled: isWindows ? "(|)" : "\u24BE"
    },
    numbers: ["\u24EA", "\u2460", "\u2461", "\u2462", "\u2463", "\u2464", "\u2465", "\u2466", "\u2467", "\u2468", "\u2469", "\u246A", "\u246B", "\u246C", "\u246D", "\u246E", "\u246F", "\u2470", "\u2471", "\u2472", "\u2473", "\u3251", "\u3252", "\u3253", "\u3254", "\u3255", "\u3256", "\u3257", "\u3258", "\u3259", "\u325A", "\u325B", "\u325C", "\u325D", "\u325E", "\u325F", "\u32B1", "\u32B2", "\u32B3", "\u32B4", "\u32B5", "\u32B6", "\u32B7", "\u32B8", "\u32B9", "\u32BA", "\u32BB", "\u32BC", "\u32BD", "\u32BE", "\u32BF"]
  };
  symbols.merge = (options) => {
    let result = utils.merge({}, colors.symbols, symbols, options.symbols);
    delete result.merge;
    return result;
  };
  module.exports = symbols;
});

// node_modules/enquirer/lib/theme.js
var require_theme = __commonJS((exports, module) => {
  var styles = require_styles();
  var symbols = require_symbols2();
  var utils = require_utils();
  module.exports = (prompt) => {
    prompt.options = utils.merge({}, prompt.options.theme, prompt.options);
    prompt.symbols = symbols.merge(prompt.options);
    prompt.styles = styles.merge(prompt.options);
  };
});

// node_modules/enquirer/lib/ansi.js
var require_ansi = __commonJS((exports, module) => {
  var isTerm = process.env.TERM_PROGRAM === "Apple_Terminal";
  var stripAnsi = require_strip_ansi();
  var utils = require_utils();
  var ansi = module.exports = exports;
  var ESC = "\x1B[";
  var BEL = "\x07";
  var hidden = false;
  var code = ansi.code = {
    bell: BEL,
    beep: BEL,
    beginning: `${ESC}G`,
    down: `${ESC}J`,
    esc: ESC,
    getPosition: `${ESC}6n`,
    hide: `${ESC}?25l`,
    line: `${ESC}2K`,
    lineEnd: `${ESC}K`,
    lineStart: `${ESC}1K`,
    restorePosition: ESC + (isTerm ? "8" : "u"),
    savePosition: ESC + (isTerm ? "7" : "s"),
    screen: `${ESC}2J`,
    show: `${ESC}?25h`,
    up: `${ESC}1J`
  };
  var cursor = ansi.cursor = {
    get hidden() {
      return hidden;
    },
    hide() {
      hidden = true;
      return code.hide;
    },
    show() {
      hidden = false;
      return code.show;
    },
    forward: (count = 1) => `${ESC}${count}C`,
    backward: (count = 1) => `${ESC}${count}D`,
    nextLine: (count = 1) => `${ESC}E`.repeat(count),
    prevLine: (count = 1) => `${ESC}F`.repeat(count),
    up: (count = 1) => count ? `${ESC}${count}A` : "",
    down: (count = 1) => count ? `${ESC}${count}B` : "",
    right: (count = 1) => count ? `${ESC}${count}C` : "",
    left: (count = 1) => count ? `${ESC}${count}D` : "",
    to(x, y) {
      return y ? `${ESC}${y + 1};${x + 1}H` : `${ESC}${x + 1}G`;
    },
    move(x = 0, y = 0) {
      let res = "";
      res += x < 0 ? cursor.left(-x) : x > 0 ? cursor.right(x) : "";
      res += y < 0 ? cursor.up(-y) : y > 0 ? cursor.down(y) : "";
      return res;
    },
    strLen(str) {
      var realLength = 0, len = str.length, charCode = -1;
      for (var i = 0;i < len; i++) {
        charCode = str.charCodeAt(i);
        if (charCode >= 0 && charCode <= 128)
          realLength += 1;
        else
          realLength += 2;
      }
      return realLength;
    },
    restore(state = {}) {
      let { after, cursor: cursor2, initial, input: input2, prompt, size, value } = state;
      initial = utils.isPrimitive(initial) ? String(initial) : "";
      input2 = utils.isPrimitive(input2) ? String(input2) : "";
      value = utils.isPrimitive(value) ? String(value) : "";
      if (size) {
        let codes = ansi.cursor.up(size) + ansi.cursor.to(this.strLen(prompt));
        let diff = input2.length - cursor2;
        if (diff > 0) {
          codes += ansi.cursor.left(diff);
        }
        return codes;
      }
      if (value || after) {
        let pos = !input2 && !!initial ? -this.strLen(initial) : -this.strLen(input2) + cursor2;
        if (after)
          pos -= this.strLen(after);
        if (input2 === "" && initial && !prompt.includes(initial)) {
          pos += this.strLen(initial);
        }
        return ansi.cursor.move(pos);
      }
    }
  };
  var erase = ansi.erase = {
    screen: code.screen,
    up: code.up,
    down: code.down,
    line: code.line,
    lineEnd: code.lineEnd,
    lineStart: code.lineStart,
    lines(n) {
      let str = "";
      for (let i = 0;i < n; i++) {
        str += ansi.erase.line + (i < n - 1 ? ansi.cursor.up(1) : "");
      }
      if (n)
        str += ansi.code.beginning;
      return str;
    }
  };
  ansi.clear = (input2 = "", columns = process.stdout.columns) => {
    if (!columns)
      return erase.line + cursor.to(0);
    let width = (str) => [...stripAnsi(str)].length;
    let lines = input2.split(/\r?\n/);
    let rows = 0;
    for (let line of lines) {
      rows += 1 + Math.floor(Math.max(width(line) - 1, 0) / columns);
    }
    return (erase.line + cursor.prevLine()).repeat(rows - 1) + erase.line + cursor.to(0);
  };
});

// node_modules/enquirer/lib/prompt.js
var require_prompt = __commonJS((exports, module) => {
  var Events = __require("events");
  var stripAnsi = require_strip_ansi();
  var keypress = require_keypress();
  var timer = require_timer();
  var State = require_state();
  var theme = require_theme();
  var utils = require_utils();
  var ansi = require_ansi();

  class Prompt extends Events {
    constructor(options = {}) {
      super();
      this.name = options.name;
      this.type = options.type;
      this.options = options;
      theme(this);
      timer(this);
      this.state = new State(this);
      this.initial = [options.initial, options.default].find((v) => v != null);
      this.stdout = options.stdout || process.stdout;
      this.stdin = options.stdin || process.stdin;
      this.scale = options.scale || 1;
      this.term = this.options.term || process.env.TERM_PROGRAM;
      this.margin = margin(this.options.margin);
      this.setMaxListeners(0);
      setOptions(this);
    }
    async keypress(input2, event = {}) {
      this.keypressed = true;
      let key = keypress.action(input2, keypress(input2, event), this.options.actions);
      this.state.keypress = key;
      this.emit("keypress", input2, key);
      this.emit("state", this.state.clone());
      const fn = this.options[key.action] || this[key.action] || this.dispatch;
      if (typeof fn === "function") {
        return await fn.call(this, input2, key);
      }
      this.alert();
    }
    alert() {
      delete this.state.alert;
      if (this.options.show === false) {
        this.emit("alert");
      } else {
        this.stdout.write(ansi.code.beep);
      }
    }
    cursorHide() {
      this.stdout.write(ansi.cursor.hide());
      const releaseOnExit = utils.onExit(() => this.cursorShow());
      this.on("close", () => {
        this.cursorShow();
        releaseOnExit();
      });
    }
    cursorShow() {
      this.stdout.write(ansi.cursor.show());
    }
    write(str) {
      if (!str)
        return;
      if (this.stdout && this.state.show !== false) {
        this.stdout.write(str);
      }
      this.state.buffer += str;
    }
    clear(lines = 0) {
      let buffer = this.state.buffer;
      this.state.buffer = "";
      if (!buffer && !lines || this.options.show === false)
        return;
      this.stdout.write(ansi.cursor.down(lines) + ansi.clear(buffer, this.width));
    }
    restore() {
      if (this.state.closed || this.options.show === false)
        return;
      let { prompt, after, rest } = this.sections();
      let { cursor, initial = "", input: input2 = "", value = "" } = this;
      let size = this.state.size = rest.length;
      let state = { after, cursor, initial, input: input2, prompt, size, value };
      let codes = ansi.cursor.restore(state);
      if (codes) {
        this.stdout.write(codes);
      }
    }
    sections() {
      let { buffer, input: input2, prompt } = this.state;
      prompt = stripAnsi(prompt);
      let buf = stripAnsi(buffer);
      let idx = buf.indexOf(prompt);
      let header = buf.slice(0, idx);
      let rest = buf.slice(idx);
      let lines = rest.split(`
`);
      let first = lines[0];
      let last = lines[lines.length - 1];
      let promptLine = prompt + (input2 ? " " + input2 : "");
      let len = promptLine.length;
      let after = len < first.length ? first.slice(len + 1) : "";
      return { header, prompt: first, after, rest: lines.slice(1), last };
    }
    async submit() {
      this.state.submitted = true;
      this.state.validating = true;
      if (this.options.onSubmit) {
        await this.options.onSubmit.call(this, this.name, this.value, this);
      }
      let result = this.state.error || await this.validate(this.value, this.state);
      if (result !== true) {
        let error = `
` + this.symbols.pointer + " ";
        if (typeof result === "string") {
          error += result.trim();
        } else {
          error += "Invalid input";
        }
        this.state.error = `
` + this.styles.danger(error);
        this.state.submitted = false;
        await this.render();
        await this.alert();
        this.state.validating = false;
        this.state.error = undefined;
        return;
      }
      this.state.validating = false;
      await this.render();
      await this.close();
      this.value = await this.result(this.value);
      this.emit("submit", this.value);
    }
    async cancel(err) {
      this.state.cancelled = this.state.submitted = true;
      await this.render();
      await this.close();
      if (typeof this.options.onCancel === "function") {
        await this.options.onCancel.call(this, this.name, this.value, this);
      }
      this.emit("cancel", await this.error(err));
    }
    async close() {
      this.state.closed = true;
      try {
        let sections = this.sections();
        let lines = Math.ceil(sections.prompt.length / this.width);
        if (sections.rest) {
          this.write(ansi.cursor.down(sections.rest.length));
        }
        this.write(`
`.repeat(lines));
      } catch (err) {}
      this.emit("close");
    }
    start() {
      if (!this.stop && this.options.show !== false) {
        this.stop = keypress.listen(this, this.keypress.bind(this));
        this.once("close", this.stop);
        this.emit("start", this);
      }
    }
    async skip() {
      this.skipped = this.options.skip === true;
      if (typeof this.options.skip === "function") {
        this.skipped = await this.options.skip.call(this, this.name, this.value);
      }
      return this.skipped;
    }
    async initialize() {
      let { format, options, result } = this;
      this.format = () => format.call(this, this.value);
      this.result = () => result.call(this, this.value);
      if (typeof options.initial === "function") {
        this.initial = await options.initial.call(this, this);
      }
      if (typeof options.onRun === "function") {
        await options.onRun.call(this, this);
      }
      if (typeof options.onSubmit === "function") {
        let onSubmit = options.onSubmit.bind(this);
        let submit = this.submit.bind(this);
        delete this.options.onSubmit;
        this.submit = async () => {
          await onSubmit(this.name, this.value, this);
          return submit();
        };
      }
      await this.start();
      await this.render();
    }
    render() {
      throw new Error("expected prompt to have a custom render method");
    }
    run() {
      return new Promise(async (resolve, reject) => {
        this.once("submit", resolve);
        this.once("cancel", reject);
        if (await this.skip()) {
          this.render = () => {};
          return this.submit();
        }
        await this.initialize();
        this.emit("run");
      });
    }
    async element(name, choice, i) {
      let { options, state, symbols, timers } = this;
      let timer2 = timers && timers[name];
      state.timer = timer2;
      let value = options[name] || state[name] || symbols[name];
      let val = choice && choice[name] != null ? choice[name] : await value;
      if (val === "")
        return val;
      let res = await this.resolve(val, state, choice, i);
      if (!res && choice && choice[name]) {
        return this.resolve(value, state, choice, i);
      }
      return res;
    }
    async prefix() {
      let element = await this.element("prefix") || this.symbols;
      let timer2 = this.timers && this.timers.prefix;
      let state = this.state;
      state.timer = timer2;
      if (utils.isObject(element))
        element = element[state.status] || element.pending;
      if (!utils.hasColor(element)) {
        let style = this.styles[state.status] || this.styles.pending;
        return style(element);
      }
      return element;
    }
    async message() {
      let message = await this.element("message");
      if (!utils.hasColor(message)) {
        return this.styles.strong(message);
      }
      return message;
    }
    async separator() {
      let element = await this.element("separator") || this.symbols;
      let timer2 = this.timers && this.timers.separator;
      let state = this.state;
      state.timer = timer2;
      let value = element[state.status] || element.pending || state.separator;
      let ele = await this.resolve(value, state);
      if (utils.isObject(ele))
        ele = ele[state.status] || ele.pending;
      if (!utils.hasColor(ele)) {
        return this.styles.muted(ele);
      }
      return ele;
    }
    async pointer(choice, i) {
      let val = await this.element("pointer", choice, i);
      if (typeof val === "string" && utils.hasColor(val)) {
        return val;
      }
      if (val) {
        let styles = this.styles;
        let focused = this.index === i;
        let style = focused ? styles.primary : (val2) => val2;
        let ele = await this.resolve(val[focused ? "on" : "off"] || val, this.state);
        let styled = !utils.hasColor(ele) ? style(ele) : ele;
        return focused ? styled : " ".repeat(ele.length);
      }
    }
    async indicator(choice, i) {
      let val = await this.element("indicator", choice, i);
      if (typeof val === "string" && utils.hasColor(val)) {
        return val;
      }
      if (val) {
        let styles = this.styles;
        let enabled = choice.enabled === true;
        let style = enabled ? styles.success : styles.dark;
        let ele = val[enabled ? "on" : "off"] || val;
        return !utils.hasColor(ele) ? style(ele) : ele;
      }
      return "";
    }
    body() {
      return null;
    }
    footer() {
      if (this.state.status === "pending") {
        return this.element("footer");
      }
    }
    header() {
      if (this.state.status === "pending") {
        return this.element("header");
      }
    }
    async hint() {
      if (this.state.status === "pending" && !this.isValue(this.state.input)) {
        let hint = await this.element("hint");
        if (!utils.hasColor(hint)) {
          return this.styles.muted(hint);
        }
        return hint;
      }
    }
    error(err) {
      return !this.state.submitted ? err || this.state.error : "";
    }
    format(value) {
      return value;
    }
    result(value) {
      return value;
    }
    validate(value) {
      if (this.options.required === true) {
        return this.isValue(value);
      }
      return true;
    }
    isValue(value) {
      return value != null && value !== "";
    }
    resolve(value, ...args) {
      return utils.resolve(this, value, ...args);
    }
    get base() {
      return Prompt.prototype;
    }
    get style() {
      return this.styles[this.state.status];
    }
    get height() {
      return this.options.rows || utils.height(this.stdout, 25);
    }
    get width() {
      return this.options.columns || utils.width(this.stdout, 80);
    }
    get size() {
      return { width: this.width, height: this.height };
    }
    set cursor(value) {
      this.state.cursor = value;
    }
    get cursor() {
      return this.state.cursor;
    }
    set input(value) {
      this.state.input = value;
    }
    get input() {
      return this.state.input;
    }
    set value(value) {
      this.state.value = value;
    }
    get value() {
      let { input: input2, value } = this.state;
      let result = [value, input2].find(this.isValue.bind(this));
      return this.isValue(result) ? result : this.initial;
    }
    static get prompt() {
      return (options) => new this(options).run();
    }
  }
  function setOptions(prompt) {
    let isValidKey = (key) => {
      return prompt[key] === undefined || typeof prompt[key] === "function";
    };
    let ignore = [
      "actions",
      "choices",
      "initial",
      "margin",
      "roles",
      "styles",
      "symbols",
      "theme",
      "timers",
      "value"
    ];
    let ignoreFn = [
      "body",
      "footer",
      "error",
      "header",
      "hint",
      "indicator",
      "message",
      "prefix",
      "separator",
      "skip"
    ];
    for (let key of Object.keys(prompt.options)) {
      if (ignore.includes(key))
        continue;
      if (/^on[A-Z]/.test(key))
        continue;
      let option = prompt.options[key];
      if (typeof option === "function" && isValidKey(key)) {
        if (!ignoreFn.includes(key)) {
          prompt[key] = option.bind(prompt);
        }
      } else if (typeof prompt[key] !== "function") {
        prompt[key] = option;
      }
    }
  }
  function margin(value) {
    if (typeof value === "number") {
      value = [value, value, value, value];
    }
    let arr = [].concat(value || []);
    let pad = (i) => i % 2 === 0 ? `
` : " ";
    let res = [];
    for (let i = 0;i < 4; i++) {
      let char = pad(i);
      if (arr[i]) {
        res.push(char.repeat(arr[i]));
      } else {
        res.push("");
      }
    }
    return res;
  }
  module.exports = Prompt;
});

// node_modules/enquirer/lib/roles.js
var require_roles = __commonJS((exports, module) => {
  var utils = require_utils();
  var roles = {
    default(prompt, choice) {
      return choice;
    },
    checkbox(prompt, choice) {
      throw new Error("checkbox role is not implemented yet");
    },
    editable(prompt, choice) {
      throw new Error("editable role is not implemented yet");
    },
    expandable(prompt, choice) {
      throw new Error("expandable role is not implemented yet");
    },
    heading(prompt, choice) {
      choice.disabled = "";
      choice.indicator = [choice.indicator, " "].find((v) => v != null);
      choice.message = choice.message || "";
      return choice;
    },
    input(prompt, choice) {
      throw new Error("input role is not implemented yet");
    },
    option(prompt, choice) {
      return roles.default(prompt, choice);
    },
    radio(prompt, choice) {
      throw new Error("radio role is not implemented yet");
    },
    separator(prompt, choice) {
      choice.disabled = "";
      choice.indicator = [choice.indicator, " "].find((v) => v != null);
      choice.message = choice.message || prompt.symbols.line.repeat(5);
      return choice;
    },
    spacer(prompt, choice) {
      return choice;
    }
  };
  module.exports = (name, options = {}) => {
    let role = utils.merge({}, roles, options.roles);
    return role[name] || role.default;
  };
});

// node_modules/enquirer/lib/types/array.js
var require_array = __commonJS((exports, module) => {
  var stripAnsi = require_strip_ansi();
  var Prompt = require_prompt();
  var roles = require_roles();
  var utils = require_utils();
  var { reorder, scrollUp, scrollDown, isObject, swap } = utils;

  class ArrayPrompt extends Prompt {
    constructor(options) {
      super(options);
      this.cursorHide();
      this.maxSelected = options.maxSelected || Infinity;
      this.multiple = options.multiple || false;
      this.initial = options.initial || 0;
      this.delay = options.delay || 0;
      this.longest = 0;
      this.num = "";
    }
    async initialize() {
      if (typeof this.options.initial === "function") {
        this.initial = await this.options.initial.call(this);
      }
      await this.reset(true);
      await super.initialize();
    }
    async reset() {
      let { choices, initial, autofocus, suggest } = this.options;
      this.state._choices = [];
      this.state.choices = [];
      this.choices = await Promise.all(await this.toChoices(choices));
      this.choices.forEach((ch) => ch.enabled = false);
      if (typeof suggest !== "function" && this.selectable.length === 0) {
        throw new Error("At least one choice must be selectable");
      }
      if (isObject(initial))
        initial = Object.keys(initial);
      if (Array.isArray(initial)) {
        if (autofocus != null)
          this.index = this.findIndex(autofocus);
        initial.forEach((v) => this.enable(this.find(v)));
        await this.render();
      } else {
        if (autofocus != null)
          initial = autofocus;
        if (typeof initial === "string")
          initial = this.findIndex(initial);
        if (typeof initial === "number" && initial > -1) {
          this.index = Math.max(0, Math.min(initial, this.choices.length));
          this.enable(this.find(this.index));
        }
      }
      if (this.isDisabled(this.focused)) {
        await this.down();
      }
    }
    async toChoices(value, parent) {
      this.state.loadingChoices = true;
      let choices = [];
      let index = 0;
      let toChoices = async (items, parent2) => {
        if (typeof items === "function")
          items = await items.call(this);
        if (items instanceof Promise)
          items = await items;
        for (let i = 0;i < items.length; i++) {
          let choice = items[i] = await this.toChoice(items[i], index++, parent2);
          choices.push(choice);
          if (choice.choices) {
            await toChoices(choice.choices, choice);
          }
        }
        return choices;
      };
      return toChoices(value, parent).then((choices2) => {
        this.state.loadingChoices = false;
        return choices2;
      });
    }
    async toChoice(ele, i, parent) {
      if (typeof ele === "function")
        ele = await ele.call(this, this);
      if (ele instanceof Promise)
        ele = await ele;
      if (typeof ele === "string")
        ele = { name: ele };
      if (ele.normalized)
        return ele;
      ele.normalized = true;
      let origVal = ele.value;
      let role = roles(ele.role, this.options);
      ele = role(this, ele);
      if (typeof ele.disabled === "string" && !ele.hint) {
        ele.hint = ele.disabled;
        ele.disabled = true;
      }
      if (ele.disabled === true && ele.hint == null) {
        ele.hint = "(disabled)";
      }
      if (ele.index != null)
        return ele;
      ele.name = ele.name || ele.key || ele.title || ele.value || ele.message;
      ele.message = ele.message || ele.name || "";
      ele.value = [ele.value, ele.name].find(this.isValue.bind(this));
      ele.input = "";
      ele.index = i;
      ele.cursor = 0;
      utils.define(ele, "parent", parent);
      ele.level = parent ? parent.level + 1 : 1;
      if (ele.indent == null) {
        ele.indent = parent ? parent.indent + "  " : ele.indent || "";
      }
      ele.path = parent ? parent.path + "." + ele.name : ele.name;
      ele.enabled = !!(this.multiple && !this.isDisabled(ele) && (ele.enabled || this.isSelected(ele)));
      if (!this.isDisabled(ele)) {
        this.longest = Math.max(this.longest, stripAnsi(ele.message).length);
      }
      let choice = { ...ele };
      ele.reset = (input2 = choice.input, value = choice.value) => {
        for (let key of Object.keys(choice))
          ele[key] = choice[key];
        ele.input = input2;
        ele.value = value;
      };
      if (origVal == null && typeof ele.initial === "function") {
        ele.input = await ele.initial.call(this, this.state, ele, i);
      }
      return ele;
    }
    async onChoice(choice, i) {
      this.emit("choice", choice, i, this);
      if (typeof choice.onChoice === "function") {
        await choice.onChoice.call(this, this.state, choice, i);
      }
    }
    async addChoice(ele, i, parent) {
      let choice = await this.toChoice(ele, i, parent);
      this.choices.push(choice);
      this.index = this.choices.length - 1;
      this.limit = this.choices.length;
      return choice;
    }
    async newItem(item, i, parent) {
      let ele = { name: "New choice name?", editable: true, newChoice: true, ...item };
      let choice = await this.addChoice(ele, i, parent);
      choice.updateChoice = () => {
        delete choice.newChoice;
        choice.name = choice.message = choice.input;
        choice.input = "";
        choice.cursor = 0;
      };
      return this.render();
    }
    indent(choice) {
      if (choice.indent == null) {
        return choice.level > 1 ? "  ".repeat(choice.level - 1) : "";
      }
      return choice.indent;
    }
    dispatch(s, key) {
      if (this.multiple && this[key.name])
        return this[key.name]();
      this.alert();
    }
    focus(choice, enabled) {
      if (typeof enabled !== "boolean")
        enabled = choice.enabled;
      if (enabled && !choice.enabled && this.selected.length >= this.maxSelected) {
        return this.alert();
      }
      this.index = choice.index;
      choice.enabled = enabled && !this.isDisabled(choice);
      return choice;
    }
    space() {
      if (!this.multiple)
        return this.alert();
      if (!this.focused)
        return;
      this.toggle(this.focused);
      return this.render();
    }
    a() {
      if (this.maxSelected < this.choices.length)
        return this.alert();
      let enabled = this.selectable.every((ch) => ch.enabled);
      this.choices.forEach((ch) => ch.enabled = !enabled);
      return this.render();
    }
    i() {
      if (this.choices.length - this.selected.length > this.maxSelected) {
        return this.alert();
      }
      this.choices.forEach((ch) => ch.enabled = !ch.enabled);
      return this.render();
    }
    g() {
      if (!this.choices.some((ch) => !!ch.parent))
        return this.a();
      const focused = this.focused;
      this.toggle(focused.parent && !focused.choices ? focused.parent : focused);
      return this.render();
    }
    toggle(choice, enabled) {
      if (!choice.enabled && this.selected.length >= this.maxSelected) {
        return this.alert();
      }
      if (typeof enabled !== "boolean")
        enabled = !choice.enabled;
      choice.enabled = enabled;
      if (choice.choices) {
        choice.choices.forEach((ch) => this.toggle(ch, enabled));
      }
      let parent = choice.parent;
      while (parent) {
        let choices = parent.choices.filter((ch) => this.isDisabled(ch));
        parent.enabled = choices.every((ch) => ch.enabled === true);
        parent = parent.parent;
      }
      reset(this, this.choices);
      this.emit("toggle", choice, this);
      return choice;
    }
    enable(choice) {
      if (this.selected.length >= this.maxSelected)
        return this.alert();
      choice.enabled = !this.isDisabled(choice);
      choice.choices && choice.choices.forEach(this.enable.bind(this));
      return choice;
    }
    disable(choice) {
      choice.enabled = false;
      choice.choices && choice.choices.forEach(this.disable.bind(this));
      return choice;
    }
    number(n) {
      this.num += n;
      let number = (num) => {
        let i = Number(num);
        if (i > this.choices.length - 1)
          return this.alert();
        let focused = this.focused;
        let choice = this.choices.find((ch) => i === ch.index);
        if (!choice.enabled && this.selected.length >= this.maxSelected) {
          return this.alert();
        }
        if (this.visible.indexOf(choice) === -1) {
          let choices = reorder(this.choices);
          let actualIdx = choices.indexOf(choice);
          if (focused.index > actualIdx) {
            let start = choices.slice(actualIdx, actualIdx + this.limit);
            let end = choices.filter((ch) => !start.includes(ch));
            this.choices = start.concat(end);
          } else {
            let pos = actualIdx - this.limit + 1;
            this.choices = choices.slice(pos).concat(choices.slice(0, pos));
          }
        }
        this.index = this.choices.indexOf(choice);
        this.toggle(this.focused);
        return this.render();
      };
      clearTimeout(this.numberTimeout);
      return new Promise((resolve) => {
        let len = this.choices.length;
        let num = this.num;
        let handle = (val = false, res) => {
          clearTimeout(this.numberTimeout);
          if (val)
            res = number(num);
          this.num = "";
          resolve(res);
        };
        if (num === "0" || num.length === 1 && Number(num + "0") > len) {
          return handle(true);
        }
        if (Number(num) > len) {
          return handle(false, this.alert());
        }
        this.numberTimeout = setTimeout(() => handle(true), this.delay);
      });
    }
    home() {
      this.choices = reorder(this.choices);
      this.index = 0;
      return this.render();
    }
    end() {
      let pos = this.choices.length - this.limit;
      let choices = reorder(this.choices);
      this.choices = choices.slice(pos).concat(choices.slice(0, pos));
      this.index = this.limit - 1;
      return this.render();
    }
    first() {
      this.index = 0;
      return this.render();
    }
    last() {
      this.index = this.visible.length - 1;
      return this.render();
    }
    prev() {
      if (this.visible.length <= 1)
        return this.alert();
      return this.up();
    }
    next() {
      if (this.visible.length <= 1)
        return this.alert();
      return this.down();
    }
    right() {
      if (this.cursor >= this.input.length)
        return this.alert();
      this.cursor++;
      return this.render();
    }
    left() {
      if (this.cursor <= 0)
        return this.alert();
      this.cursor--;
      return this.render();
    }
    up() {
      let len = this.choices.length;
      let vis = this.visible.length;
      let idx = this.index;
      if (this.options.scroll === false && idx === 0) {
        return this.alert();
      }
      if (len > vis && idx === 0) {
        return this.scrollUp();
      }
      this.index = (idx - 1 % len + len) % len;
      if (this.isDisabled() && !this.allChoicesAreDisabled()) {
        return this.up();
      }
      return this.render();
    }
    down() {
      let len = this.choices.length;
      let vis = this.visible.length;
      let idx = this.index;
      if (this.options.scroll === false && idx === vis - 1) {
        return this.alert();
      }
      if (len > vis && idx === vis - 1) {
        return this.scrollDown();
      }
      this.index = (idx + 1) % len;
      if (this.isDisabled() && !this.allChoicesAreDisabled()) {
        return this.down();
      }
      return this.render();
    }
    scrollUp(i = 0) {
      this.choices = scrollUp(this.choices);
      this.index = i;
      if (this.isDisabled()) {
        return this.up();
      }
      return this.render();
    }
    scrollDown(i = this.visible.length - 1) {
      this.choices = scrollDown(this.choices);
      this.index = i;
      if (this.isDisabled()) {
        return this.down();
      }
      return this.render();
    }
    async shiftUp() {
      if (this.options.sort === true) {
        this.sorting = true;
        this.swap(this.index - 1);
        await this.up();
        this.sorting = false;
        return;
      }
      return this.scrollUp(this.index);
    }
    async shiftDown() {
      if (this.options.sort === true) {
        this.sorting = true;
        this.swap(this.index + 1);
        await this.down();
        this.sorting = false;
        return;
      }
      return this.scrollDown(this.index);
    }
    pageUp() {
      if (this.visible.length <= 1)
        return this.alert();
      this.limit = Math.max(this.limit - 1, 0);
      this.index = Math.min(this.limit - 1, this.index);
      this._limit = this.limit;
      if (this.isDisabled()) {
        return this.up();
      }
      return this.render();
    }
    pageDown() {
      if (this.visible.length >= this.choices.length)
        return this.alert();
      this.index = Math.max(0, this.index);
      this.limit = Math.min(this.limit + 1, this.choices.length);
      this._limit = this.limit;
      if (this.isDisabled()) {
        return this.down();
      }
      return this.render();
    }
    swap(pos) {
      swap(this.choices, this.index, pos);
    }
    allChoicesAreDisabled(choices = this.choices) {
      return choices.every((choice) => this.isDisabled(choice));
    }
    isDisabled(choice = this.focused) {
      let keys = ["disabled", "collapsed", "hidden", "completing", "readonly"];
      if (choice && keys.some((key) => choice[key] === true)) {
        return true;
      }
      return choice && choice.role === "heading";
    }
    isEnabled(choice = this.focused) {
      if (Array.isArray(choice))
        return choice.every((ch) => this.isEnabled(ch));
      if (choice.choices) {
        let choices = choice.choices.filter((ch) => !this.isDisabled(ch));
        return choice.enabled && choices.every((ch) => this.isEnabled(ch));
      }
      return choice.enabled && !this.isDisabled(choice);
    }
    isChoice(choice, value) {
      return choice.name === value || choice.index === Number(value);
    }
    isSelected(choice) {
      if (Array.isArray(this.initial)) {
        return this.initial.some((value) => this.isChoice(choice, value));
      }
      return this.isChoice(choice, this.initial);
    }
    map(names = [], prop = "value") {
      return [].concat(names || []).reduce((acc, name) => {
        acc[name] = this.find(name, prop);
        return acc;
      }, {});
    }
    filter(value, prop) {
      let isChoice = (ele, i) => [ele.name, i].includes(value);
      let fn = typeof value === "function" ? value : isChoice;
      let choices = this.options.multiple ? this.state._choices : this.choices;
      let result = choices.filter(fn);
      if (prop) {
        return result.map((ch) => ch[prop]);
      }
      return result;
    }
    find(value, prop) {
      if (isObject(value))
        return prop ? value[prop] : value;
      let isChoice = (ele, i) => [ele.name, i].includes(value);
      let fn = typeof value === "function" ? value : isChoice;
      let choice = this.choices.find(fn);
      if (choice) {
        return prop ? choice[prop] : choice;
      }
    }
    findIndex(value) {
      return this.choices.indexOf(this.find(value));
    }
    async submit() {
      let choice = this.focused;
      if (!choice)
        return this.alert();
      if (choice.newChoice) {
        if (!choice.input)
          return this.alert();
        choice.updateChoice();
        return this.render();
      }
      if (this.choices.some((ch) => ch.newChoice)) {
        return this.alert();
      }
      let { reorder: reorder2, sort } = this.options;
      let multi = this.multiple === true;
      let value = this.selected;
      if (value === undefined) {
        return this.alert();
      }
      if (Array.isArray(value) && reorder2 !== false && sort !== true) {
        value = utils.reorder(value);
      }
      this.value = multi ? value.map((ch) => ch.name) : value.name;
      return super.submit();
    }
    set choices(choices = []) {
      this.state._choices = this.state._choices || [];
      this.state.choices = choices;
      for (let choice of choices) {
        if (!this.state._choices.some((ch) => ch.name === choice.name)) {
          this.state._choices.push(choice);
        }
      }
      if (!this._initial && this.options.initial) {
        this._initial = true;
        let init = this.initial;
        if (typeof init === "string" || typeof init === "number") {
          let choice = this.find(init);
          if (choice) {
            this.initial = choice.index;
            this.focus(choice, true);
          }
        }
      }
    }
    get choices() {
      return reset(this, this.state.choices || []);
    }
    set visible(visible) {
      this.state.visible = visible;
    }
    get visible() {
      return (this.state.visible || this.choices).slice(0, this.limit);
    }
    set limit(num) {
      this.state.limit = num;
    }
    get limit() {
      let { state, options, choices } = this;
      let limit = state.limit || this._limit || options.limit || choices.length;
      return Math.min(limit, this.height);
    }
    set value(value) {
      super.value = value;
    }
    get value() {
      if (typeof super.value !== "string" && super.value === this.initial) {
        return this.input;
      }
      return super.value;
    }
    set index(i) {
      this.state.index = i;
    }
    get index() {
      return Math.max(0, this.state ? this.state.index : 0);
    }
    get enabled() {
      return this.filter(this.isEnabled.bind(this));
    }
    get focused() {
      let choice = this.choices[this.index];
      if (choice && this.state.submitted && this.multiple !== true) {
        choice.enabled = true;
      }
      return choice;
    }
    get selectable() {
      return this.choices.filter((choice) => !this.isDisabled(choice));
    }
    get selected() {
      return this.multiple ? this.enabled : this.focused;
    }
  }
  function reset(prompt, choices) {
    if (choices instanceof Promise)
      return choices;
    if (typeof choices === "function") {
      if (utils.isAsyncFn(choices))
        return choices;
      choices = choices.call(prompt, prompt);
    }
    for (let choice of choices) {
      if (Array.isArray(choice.choices)) {
        let items = choice.choices.filter((ch) => !prompt.isDisabled(ch));
        choice.enabled = items.every((ch) => ch.enabled === true);
      }
      if (prompt.isDisabled(choice) === true) {
        delete choice.enabled;
      }
    }
    return choices;
  }
  module.exports = ArrayPrompt;
});

// node_modules/enquirer/lib/prompts/select.js
var require_select = __commonJS((exports, module) => {
  var ArrayPrompt = require_array();
  var utils = require_utils();

  class SelectPrompt extends ArrayPrompt {
    constructor(options) {
      super(options);
      this.emptyError = this.options.emptyError || "No items were selected";
    }
    async dispatch(s, key) {
      if (this.multiple) {
        return this[key.name] ? await this[key.name](s, key) : await super.dispatch(s, key);
      }
      this.alert();
    }
    separator() {
      if (this.options.separator)
        return super.separator();
      let sep = this.styles.muted(this.symbols.ellipsis);
      return this.state.submitted ? super.separator() : sep;
    }
    pointer(choice, i) {
      return !this.multiple || this.options.pointer ? super.pointer(choice, i) : "";
    }
    indicator(choice, i) {
      return this.multiple ? super.indicator(choice, i) : "";
    }
    choiceMessage(choice, i) {
      let message = this.resolve(choice.message, this.state, choice, i);
      if (choice.role === "heading" && !utils.hasColor(message)) {
        message = this.styles.strong(message);
      }
      return this.resolve(message, this.state, choice, i);
    }
    choiceSeparator() {
      return ":";
    }
    async renderChoice(choice, i) {
      await this.onChoice(choice, i);
      let focused = this.index === i;
      let pointer = await this.pointer(choice, i);
      let check = await this.indicator(choice, i) + (choice.pad || "");
      let hint = await this.resolve(choice.hint, this.state, choice, i);
      if (hint && !utils.hasColor(hint)) {
        hint = this.styles.muted(hint);
      }
      let ind = this.indent(choice);
      let msg = await this.choiceMessage(choice, i);
      let line = () => [this.margin[3], ind + pointer + check, msg, this.margin[1], hint].filter(Boolean).join(" ");
      if (choice.role === "heading") {
        return line();
      }
      if (choice.disabled) {
        if (!utils.hasColor(msg)) {
          msg = this.styles.disabled(msg);
        }
        return line();
      }
      if (focused) {
        msg = this.styles.em(msg);
      }
      return line();
    }
    async renderChoices() {
      if (this.state.loading === "choices") {
        return this.styles.warning("Loading choices");
      }
      if (this.state.submitted)
        return "";
      let choices = this.visible.map(async (ch, i) => await this.renderChoice(ch, i));
      let visible = await Promise.all(choices);
      if (!visible.length)
        visible.push(this.styles.danger("No matching choices"));
      let result = this.margin[0] + visible.join(`
`);
      let header;
      if (this.options.choicesHeader) {
        header = await this.resolve(this.options.choicesHeader, this.state);
      }
      return [header, result].filter(Boolean).join(`
`);
    }
    format() {
      if (!this.state.submitted || this.state.cancelled)
        return "";
      if (Array.isArray(this.selected)) {
        return this.selected.map((choice) => this.styles.primary(choice.name)).join(", ");
      }
      return this.styles.primary(this.selected.name);
    }
    async render() {
      let { submitted, size } = this.state;
      let prompt = "";
      let header = await this.header();
      let prefix = await this.prefix();
      let separator = await this.separator();
      let message = await this.message();
      if (this.options.promptLine !== false) {
        prompt = [prefix, message, separator, ""].join(" ");
        this.state.prompt = prompt;
      }
      let output = await this.format();
      let help = await this.error() || await this.hint();
      let body = await this.renderChoices();
      let footer = await this.footer();
      if (output)
        prompt += output;
      if (help && !prompt.includes(help))
        prompt += " " + help;
      if (submitted && !output && !body.trim() && this.multiple && this.emptyError != null) {
        prompt += this.styles.danger(this.emptyError);
      }
      this.clear(size);
      this.write([header, prompt, body, footer].filter(Boolean).join(`
`));
      this.write(this.margin[2]);
      this.restore();
    }
  }
  module.exports = SelectPrompt;
});

// node_modules/enquirer/lib/prompts/autocomplete.js
var require_autocomplete = __commonJS((exports, module) => {
  var Select = require_select();
  var highlight = (input2, color) => {
    const regex = input2 ? new RegExp(input2, "ig") : /$^/;
    return (str) => {
      return input2 ? str.replace(regex, (match) => color(match)) : str;
    };
  };

  class AutoComplete extends Select {
    constructor(options) {
      super(options);
      this.cursorShow();
    }
    moveCursor(n) {
      this.state.cursor += n;
    }
    dispatch(ch) {
      return this.append(ch);
    }
    space(ch) {
      return this.options.multiple ? super.space(ch) : this.append(ch);
    }
    append(ch) {
      let { cursor, input: input2 } = this.state;
      this.input = input2.slice(0, cursor) + ch + input2.slice(cursor);
      this.moveCursor(1);
      return this.complete();
    }
    delete() {
      let { cursor, input: input2 } = this.state;
      if (!input2)
        return this.alert();
      this.input = input2.slice(0, cursor - 1) + input2.slice(cursor);
      this.moveCursor(-1);
      return this.complete();
    }
    deleteForward() {
      let { cursor, input: input2 } = this.state;
      if (input2[cursor] === undefined)
        return this.alert();
      this.input = `${input2}`.slice(0, cursor) + `${input2}`.slice(cursor + 1);
      return this.complete();
    }
    number(ch) {
      return this.append(ch);
    }
    async complete() {
      this.completing = true;
      this.choices = await this.suggest(this.input, this.state._choices);
      this.state.limit = undefined;
      this.index = Math.min(Math.max(this.visible.length - 1, 0), this.index);
      await this.render();
      this.completing = false;
    }
    suggest(input2 = this.input, choices = this.state._choices) {
      if (typeof this.options.suggest === "function") {
        return this.options.suggest.call(this, input2, choices);
      }
      let str = input2.toLowerCase();
      return choices.filter((ch) => ch.message.toLowerCase().includes(str));
    }
    pointer() {
      return "";
    }
    format() {
      if (!this.focused)
        return this.input;
      if (this.options.multiple && this.state.submitted) {
        return this.selected.map((ch) => this.styles.primary(ch.message)).join(", ");
      }
      if (this.state.submitted) {
        let value = this.value = this.input = this.focused.value;
        return this.styles.primary(value);
      }
      return this.input;
    }
    async render() {
      if (this.state.status !== "pending")
        return super.render();
      const hl = this.options.highlight || this.styles.complement;
      const style = (input2, color2) => {
        if (!input2)
          return input2;
        if (hl.stack)
          return hl(input2);
        return hl.call(this, input2);
      };
      const color = highlight(this.input, style);
      const choices = this.choices;
      this.choices = choices.map((ch) => ({ ...ch, message: color(ch.message) }));
      await super.render();
      this.choices = choices;
    }
    submit() {
      if (this.options.multiple) {
        this.value = this.selected.map((ch) => ch.name);
      }
      return super.submit();
    }
  }
  module.exports = AutoComplete;
});

// node_modules/enquirer/lib/placeholder.js
var require_placeholder = __commonJS((exports, module) => {
  var utils = require_utils();
  module.exports = (prompt, options = {}) => {
    prompt.cursorHide();
    let { input: input2 = "", initial = "", pos, showCursor = true, color } = options;
    let style = color || prompt.styles.placeholder;
    let inverse = utils.inverse(prompt.styles.primary);
    let blinker = (str) => inverse(prompt.styles.black(str));
    let output = input2;
    let char = " ";
    let reverse = blinker(char);
    if (prompt.blink && prompt.blink.off === true) {
      blinker = (str) => str;
      reverse = "";
    }
    if (showCursor && pos === 0 && initial === "" && input2 === "") {
      return blinker(char);
    }
    if (showCursor && pos === 0 && (input2 === initial || input2 === "")) {
      return blinker(initial[0]) + style(initial.slice(1));
    }
    initial = utils.isPrimitive(initial) ? `${initial}` : "";
    input2 = utils.isPrimitive(input2) ? `${input2}` : "";
    let placeholder = initial && initial.startsWith(input2) && initial !== input2;
    let cursor = placeholder ? blinker(initial[input2.length]) : reverse;
    if (pos !== input2.length && showCursor === true) {
      output = input2.slice(0, pos) + blinker(input2[pos]) + input2.slice(pos + 1);
      cursor = "";
    }
    if (showCursor === false) {
      cursor = "";
    }
    if (placeholder) {
      let raw = prompt.styles.unstyle(output + cursor);
      return output + cursor + style(initial.slice(raw.length));
    }
    return output + cursor;
  };
});

// node_modules/enquirer/lib/prompts/form.js
var require_form = __commonJS((exports, module) => {
  var stripAnsi = require_strip_ansi();
  var SelectPrompt = require_select();
  var placeholder = require_placeholder();

  class FormPrompt extends SelectPrompt {
    constructor(options) {
      super({ ...options, multiple: true });
      this.type = "form";
      this.initial = this.options.initial;
      this.align = [this.options.align, "right"].find((v) => v != null);
      this.emptyError = "";
      this.values = {};
    }
    async reset(first) {
      await super.reset();
      if (first === true)
        this._index = this.index;
      this.index = this._index;
      this.values = {};
      this.choices.forEach((choice) => choice.reset && choice.reset());
      return this.render();
    }
    dispatch(char) {
      return !!char && this.append(char);
    }
    append(char) {
      let choice = this.focused;
      if (!choice)
        return this.alert();
      let { cursor, input: input2 } = choice;
      choice.value = choice.input = input2.slice(0, cursor) + char + input2.slice(cursor);
      choice.cursor++;
      return this.render();
    }
    delete() {
      let choice = this.focused;
      if (!choice || choice.cursor <= 0)
        return this.alert();
      let { cursor, input: input2 } = choice;
      choice.value = choice.input = input2.slice(0, cursor - 1) + input2.slice(cursor);
      choice.cursor--;
      return this.render();
    }
    deleteForward() {
      let choice = this.focused;
      if (!choice)
        return this.alert();
      let { cursor, input: input2 } = choice;
      if (input2[cursor] === undefined)
        return this.alert();
      let str = `${input2}`.slice(0, cursor) + `${input2}`.slice(cursor + 1);
      choice.value = choice.input = str;
      return this.render();
    }
    right() {
      let choice = this.focused;
      if (!choice)
        return this.alert();
      if (choice.cursor >= choice.input.length)
        return this.alert();
      choice.cursor++;
      return this.render();
    }
    left() {
      let choice = this.focused;
      if (!choice)
        return this.alert();
      if (choice.cursor <= 0)
        return this.alert();
      choice.cursor--;
      return this.render();
    }
    space(ch, key) {
      return this.dispatch(ch, key);
    }
    number(ch, key) {
      return this.dispatch(ch, key);
    }
    next() {
      let ch = this.focused;
      if (!ch)
        return this.alert();
      let { initial, input: input2 } = ch;
      if (initial && initial.startsWith(input2) && input2 !== initial) {
        ch.value = ch.input = initial;
        ch.cursor = ch.value.length;
        return this.render();
      }
      return super.next();
    }
    prev() {
      let ch = this.focused;
      if (!ch)
        return this.alert();
      if (ch.cursor === 0)
        return super.prev();
      ch.value = ch.input = "";
      ch.cursor = 0;
      return this.render();
    }
    separator() {
      return "";
    }
    format(value) {
      return !this.state.submitted ? super.format(value) : "";
    }
    pointer() {
      return "";
    }
    indicator(choice) {
      return choice.input ? "\u29BF" : "\u2299";
    }
    async choiceSeparator(choice, i) {
      let sep = await this.resolve(choice.separator, this.state, choice, i) || ":";
      return sep ? " " + this.styles.disabled(sep) : "";
    }
    async renderChoice(choice, i) {
      await this.onChoice(choice, i);
      let { state, styles } = this;
      let { cursor, initial = "", name, input: input2 = "" } = choice;
      let { muted, submitted, primary, danger } = styles;
      let focused = this.index === i;
      let validate = choice.validate || (() => true);
      let sep = await this.choiceSeparator(choice, i);
      let msg = choice.message;
      if (this.align === "right")
        msg = msg.padStart(this.longest + 1, " ");
      if (this.align === "left")
        msg = msg.padEnd(this.longest + 1, " ");
      let value = this.values[name] = input2 || initial;
      let color = input2 ? "success" : "dark";
      if (await validate.call(choice, value, this.state) !== true) {
        color = "danger";
      }
      let style = styles[color];
      let indicator = style(await this.indicator(choice, i)) + (choice.pad || "");
      let indent = this.indent(choice);
      let line = () => [indent, indicator, msg + sep, input2].filter(Boolean).join(" ");
      if (state.submitted) {
        msg = stripAnsi(msg);
        input2 = submitted(input2);
        return line();
      }
      if (choice.format) {
        input2 = await choice.format.call(this, input2, choice, i);
      } else {
        let color2 = this.styles.muted;
        let options = { input: input2, initial, pos: cursor, showCursor: focused, color: color2 };
        input2 = placeholder(this, options);
      }
      if (!this.isValue(input2)) {
        input2 = this.styles.muted(this.symbols.ellipsis);
      }
      if (choice.result) {
        this.values[name] = await choice.result.call(this, value, choice, i);
      }
      if (focused) {
        msg = primary(msg);
      }
      if (choice.error) {
        input2 += (input2 ? " " : "") + danger(choice.error.trim());
      } else if (choice.hint) {
        input2 += (input2 ? " " : "") + muted(choice.hint.trim());
      }
      return line();
    }
    async submit() {
      this.value = this.values;
      return super.base.submit.call(this);
    }
  }
  module.exports = FormPrompt;
});

// node_modules/enquirer/lib/types/auth.js
var require_auth = __commonJS((exports, module) => {
  var FormPrompt = require_form();
  var defaultAuthenticate = () => {
    throw new Error("expected prompt to have a custom authenticate method");
  };
  var factory = (authenticate = defaultAuthenticate) => {

    class AuthPrompt extends FormPrompt {
      constructor(options) {
        super(options);
      }
      async submit() {
        this.value = await authenticate.call(this, this.values, this.state);
        super.base.submit.call(this);
      }
      static create(authenticate2) {
        return factory(authenticate2);
      }
    }
    return AuthPrompt;
  };
  module.exports = factory();
});

// node_modules/enquirer/lib/prompts/basicauth.js
var require_basicauth = __commonJS((exports, module) => {
  var AuthPrompt = require_auth();
  function defaultAuthenticate(value, state) {
    if (value.username === this.options.username && value.password === this.options.password) {
      return true;
    }
    return false;
  }
  var factory = (authenticate = defaultAuthenticate) => {
    const choices = [
      { name: "username", message: "username" },
      {
        name: "password",
        message: "password",
        format(input2) {
          if (this.options.showPassword) {
            return input2;
          }
          let color = this.state.submitted ? this.styles.primary : this.styles.muted;
          return color(this.symbols.asterisk.repeat(input2.length));
        }
      }
    ];

    class BasicAuthPrompt extends AuthPrompt.create(authenticate) {
      constructor(options) {
        super({ ...options, choices });
      }
      static create(authenticate2) {
        return factory(authenticate2);
      }
    }
    return BasicAuthPrompt;
  };
  module.exports = factory();
});

// node_modules/enquirer/lib/types/boolean.js
var require_boolean = __commonJS((exports, module) => {
  var Prompt = require_prompt();
  var { isPrimitive, hasColor } = require_utils();

  class BooleanPrompt extends Prompt {
    constructor(options) {
      super(options);
      this.cursorHide();
    }
    async initialize() {
      let initial = await this.resolve(this.initial, this.state);
      this.input = await this.cast(initial);
      await super.initialize();
    }
    dispatch(ch) {
      if (!this.isValue(ch))
        return this.alert();
      this.input = ch;
      return this.submit();
    }
    format(value) {
      let { styles, state } = this;
      return !state.submitted ? styles.primary(value) : styles.success(value);
    }
    cast(input2) {
      return this.isTrue(input2);
    }
    isTrue(input2) {
      return /^[ty1]/i.test(input2);
    }
    isFalse(input2) {
      return /^[fn0]/i.test(input2);
    }
    isValue(value) {
      return isPrimitive(value) && (this.isTrue(value) || this.isFalse(value));
    }
    async hint() {
      if (this.state.status === "pending") {
        let hint = await this.element("hint");
        if (!hasColor(hint)) {
          return this.styles.muted(hint);
        }
        return hint;
      }
    }
    async render() {
      let { input: input2, size } = this.state;
      let prefix = await this.prefix();
      let sep = await this.separator();
      let msg = await this.message();
      let hint = this.styles.muted(this.default);
      let promptLine = [prefix, msg, hint, sep].filter(Boolean).join(" ");
      this.state.prompt = promptLine;
      let header = await this.header();
      let value = this.value = this.cast(input2);
      let output = await this.format(value);
      let help = await this.error() || await this.hint();
      let footer = await this.footer();
      if (help && !promptLine.includes(help))
        output += " " + help;
      promptLine += " " + output;
      this.clear(size);
      this.write([header, promptLine, footer].filter(Boolean).join(`
`));
      this.restore();
    }
    set value(value) {
      super.value = value;
    }
    get value() {
      return this.cast(super.value);
    }
  }
  module.exports = BooleanPrompt;
});

// node_modules/enquirer/lib/prompts/confirm.js
var require_confirm = __commonJS((exports, module) => {
  var BooleanPrompt = require_boolean();

  class ConfirmPrompt extends BooleanPrompt {
    constructor(options) {
      super(options);
      this.default = this.options.default || (this.initial ? "(Y/n)" : "(y/N)");
    }
  }
  module.exports = ConfirmPrompt;
});

// node_modules/enquirer/lib/prompts/editable.js
var require_editable = __commonJS((exports, module) => {
  var Select = require_select();
  var Form = require_form();
  var form = Form.prototype;

  class Editable extends Select {
    constructor(options) {
      super({ ...options, multiple: true });
      this.align = [this.options.align, "left"].find((v) => v != null);
      this.emptyError = "";
      this.values = {};
    }
    dispatch(char, key) {
      let choice = this.focused;
      let parent = choice.parent || {};
      if (!choice.editable && !parent.editable) {
        if (char === "a" || char === "i")
          return super[char]();
      }
      return form.dispatch.call(this, char, key);
    }
    append(char, key) {
      return form.append.call(this, char, key);
    }
    delete(char, key) {
      return form.delete.call(this, char, key);
    }
    space(char) {
      return this.focused.editable ? this.append(char) : super.space();
    }
    number(char) {
      return this.focused.editable ? this.append(char) : super.number(char);
    }
    next() {
      return this.focused.editable ? form.next.call(this) : super.next();
    }
    prev() {
      return this.focused.editable ? form.prev.call(this) : super.prev();
    }
    async indicator(choice, i) {
      let symbol = choice.indicator || "";
      let value = choice.editable ? symbol : super.indicator(choice, i);
      return await this.resolve(value, this.state, choice, i) || "";
    }
    indent(choice) {
      return choice.role === "heading" ? "" : choice.editable ? " " : "  ";
    }
    async renderChoice(choice, i) {
      choice.indent = "";
      if (choice.editable)
        return form.renderChoice.call(this, choice, i);
      return super.renderChoice(choice, i);
    }
    error() {
      return "";
    }
    footer() {
      return this.state.error;
    }
    async validate() {
      let result = true;
      for (let choice of this.choices) {
        if (typeof choice.validate !== "function") {
          continue;
        }
        if (choice.role === "heading") {
          continue;
        }
        let val = choice.parent ? this.value[choice.parent.name] : this.value;
        if (choice.editable) {
          val = choice.value === choice.name ? choice.initial || "" : choice.value;
        } else if (!this.isDisabled(choice)) {
          val = choice.enabled === true;
        }
        result = await choice.validate(val, this.state);
        if (result !== true) {
          break;
        }
      }
      if (result !== true) {
        this.state.error = typeof result === "string" ? result : "Invalid Input";
      }
      return result;
    }
    submit() {
      if (this.focused.newChoice === true)
        return super.submit();
      if (this.choices.some((ch) => ch.newChoice)) {
        return this.alert();
      }
      this.value = {};
      for (let choice of this.choices) {
        let val = choice.parent ? this.value[choice.parent.name] : this.value;
        if (choice.role === "heading") {
          this.value[choice.name] = {};
          continue;
        }
        if (choice.editable) {
          val[choice.name] = choice.value === choice.name ? choice.initial || "" : choice.value;
        } else if (!this.isDisabled(choice)) {
          val[choice.name] = choice.enabled === true;
        }
      }
      return this.base.submit.call(this);
    }
  }
  module.exports = Editable;
});

// node_modules/enquirer/lib/types/string.js
var require_string = __commonJS((exports, module) => {
  var Prompt = require_prompt();
  var keypress = require_keypress();
  var placeholder = require_placeholder();
  var { isPrimitive } = require_utils();

  class StringPrompt extends Prompt {
    constructor(options) {
      super(options);
      this.initial = isPrimitive(this.initial) ? String(this.initial) : "";
      if (this.initial)
        this.cursorHide();
      this.state.prevCursor = 0;
      this.state.clipboard = [];
      this.keypressTimeout = this.options.keypressTimeout !== undefined ? this.options.keypressTimeout : null;
    }
    async keypress(input2, key = input2 ? keypress(input2, {}) : {}) {
      const now = Date.now();
      const elapsed = now - this.lastKeypress;
      this.lastKeypress = now;
      const isEnterKey = key.name === "return" || key.name === "enter";
      let prev = this.state.prevKeypress;
      let append;
      this.state.prevKeypress = key;
      if (this.keypressTimeout != null && isEnterKey) {
        if (elapsed < this.keypressTimeout) {
          return this.submit();
        }
        this.state.multilineBuffer = this.state.multilineBuffer || "";
        this.state.multilineBuffer += input2;
        append = true;
        prev = null;
      }
      if (append || this.options.multiline && isEnterKey) {
        if (!prev || prev.name !== "return") {
          return this.append(`
`, key);
        }
      }
      return super.keypress(input2, key);
    }
    moveCursor(n) {
      this.cursor += n;
    }
    reset() {
      this.input = this.value = "";
      this.cursor = 0;
      return this.render();
    }
    dispatch(ch, key) {
      if (!ch || key.ctrl || key.code)
        return this.alert();
      this.append(ch);
    }
    append(ch) {
      let { cursor, input: input2 } = this.state;
      this.input = `${input2}`.slice(0, cursor) + ch + `${input2}`.slice(cursor);
      this.moveCursor(String(ch).length);
      this.render();
    }
    insert(str) {
      this.append(str);
    }
    delete() {
      let { cursor, input: input2 } = this.state;
      if (cursor <= 0)
        return this.alert();
      this.input = `${input2}`.slice(0, cursor - 1) + `${input2}`.slice(cursor);
      this.moveCursor(-1);
      this.render();
    }
    deleteForward() {
      let { cursor, input: input2 } = this.state;
      if (input2[cursor] === undefined)
        return this.alert();
      this.input = `${input2}`.slice(0, cursor) + `${input2}`.slice(cursor + 1);
      this.render();
    }
    cutForward() {
      let pos = this.cursor;
      if (this.input.length <= pos)
        return this.alert();
      this.state.clipboard.push(this.input.slice(pos));
      this.input = this.input.slice(0, pos);
      this.render();
    }
    cutLeft() {
      let pos = this.cursor;
      if (pos === 0)
        return this.alert();
      let before = this.input.slice(0, pos);
      let after = this.input.slice(pos);
      let words = before.split(" ");
      this.state.clipboard.push(words.pop());
      this.input = words.join(" ");
      this.cursor = this.input.length;
      this.input += after;
      this.render();
    }
    paste() {
      if (!this.state.clipboard.length)
        return this.alert();
      this.insert(this.state.clipboard.pop());
      this.render();
    }
    toggleCursor() {
      if (this.state.prevCursor) {
        this.cursor = this.state.prevCursor;
        this.state.prevCursor = 0;
      } else {
        this.state.prevCursor = this.cursor;
        this.cursor = 0;
      }
      this.render();
    }
    first() {
      this.cursor = 0;
      this.render();
    }
    last() {
      this.cursor = this.input.length - 1;
      this.render();
    }
    next() {
      let init = this.initial != null ? String(this.initial) : "";
      if (!init || !init.startsWith(this.input))
        return this.alert();
      this.input = this.initial;
      this.cursor = this.initial.length;
      this.render();
    }
    prev() {
      if (!this.input)
        return this.alert();
      this.reset();
    }
    backward() {
      return this.left();
    }
    forward() {
      return this.right();
    }
    right() {
      if (this.cursor >= this.input.length)
        return this.alert();
      this.moveCursor(1);
      return this.render();
    }
    left() {
      if (this.cursor <= 0)
        return this.alert();
      this.moveCursor(-1);
      return this.render();
    }
    isValue(value) {
      return !!value;
    }
    async format(input2 = this.value) {
      let initial = await this.resolve(this.initial, this.state);
      if (!this.state.submitted) {
        return placeholder(this, { input: input2, initial, pos: this.cursor });
      }
      return this.styles.submitted(input2 || initial);
    }
    async render() {
      let size = this.state.size;
      let prefix = await this.prefix();
      let separator = await this.separator();
      let message = await this.message();
      let prompt = [prefix, message, separator].filter(Boolean).join(" ");
      this.state.prompt = prompt;
      let header = await this.header();
      let output = await this.format();
      let help = await this.error() || await this.hint();
      let footer = await this.footer();
      if (help && !output.includes(help))
        output += " " + help;
      prompt += " " + output;
      this.clear(size);
      this.write([header, prompt, footer].filter(Boolean).join(`
`));
      this.restore();
    }
  }
  module.exports = StringPrompt;
});

// node_modules/enquirer/lib/completer.js
var require_completer = __commonJS((exports, module) => {
  var unique = (arr) => arr.filter((v, i) => arr.lastIndexOf(v) === i);
  var compact = (arr) => unique(arr).filter(Boolean);
  module.exports = (action, data = {}, value = "") => {
    let { past = [], present = "" } = data;
    let rest, prev;
    switch (action) {
      case "prev":
      case "undo":
        rest = past.slice(0, past.length - 1);
        prev = past[past.length - 1] || "";
        return {
          past: compact([value, ...rest]),
          present: prev
        };
      case "next":
      case "redo":
        rest = past.slice(1);
        prev = past[0] || "";
        return {
          past: compact([...rest, value]),
          present: prev
        };
      case "save":
        return {
          past: compact([...past, value]),
          present: ""
        };
      case "remove":
        prev = compact(past.filter((v) => v !== value));
        present = "";
        if (prev.length) {
          present = prev.pop();
        }
        return {
          past: prev,
          present
        };
      default: {
        throw new Error(`Invalid action: "${action}"`);
      }
    }
  };
});

// node_modules/enquirer/lib/prompts/input.js
var require_input = __commonJS((exports, module) => {
  var Prompt = require_string();
  var completer = require_completer();

  class Input4 extends Prompt {
    constructor(options) {
      super(options);
      let history = this.options.history;
      if (history && history.store) {
        let initial = history.values || this.initial;
        this.autosave = !!history.autosave;
        this.store = history.store;
        this.data = this.store.get("values") || { past: [], present: initial };
        this.initial = this.data.present || this.data.past[this.data.past.length - 1];
      }
    }
    completion(action) {
      if (!this.store)
        return this.alert();
      this.data = completer(action, this.data, this.input);
      if (!this.data.present)
        return this.alert();
      this.input = this.data.present;
      this.cursor = this.input.length;
      return this.render();
    }
    altUp() {
      return this.completion("prev");
    }
    altDown() {
      return this.completion("next");
    }
    prev() {
      this.save();
      return super.prev();
    }
    save() {
      if (!this.store)
        return;
      this.data = completer("save", this.data, this.input);
      this.store.set("values", this.data);
    }
    submit() {
      if (this.store && this.autosave === true) {
        this.save();
      }
      return super.submit();
    }
  }
  module.exports = Input4;
});

// node_modules/enquirer/lib/prompts/invisible.js
var require_invisible = __commonJS((exports, module) => {
  var StringPrompt = require_string();

  class InvisiblePrompt extends StringPrompt {
    format() {
      return "";
    }
  }
  module.exports = InvisiblePrompt;
});

// node_modules/enquirer/lib/prompts/list.js
var require_list = __commonJS((exports, module) => {
  var StringPrompt = require_string();

  class ListPrompt extends StringPrompt {
    constructor(options = {}) {
      super(options);
      this.sep = this.options.separator || /, */;
      this.initial = options.initial || "";
    }
    split(input2 = this.value) {
      return input2 ? String(input2).split(this.sep) : [];
    }
    format() {
      let style = this.state.submitted ? this.styles.primary : (val) => val;
      return this.list.map(style).join(", ");
    }
    async submit(value) {
      let result = this.state.error || await this.validate(this.list, this.state);
      if (result !== true) {
        this.state.error = result;
        return super.submit();
      }
      this.value = this.list;
      return super.submit();
    }
    get list() {
      return this.split();
    }
  }
  module.exports = ListPrompt;
});

// node_modules/enquirer/lib/prompts/multiselect.js
var require_multiselect = __commonJS((exports, module) => {
  var Select = require_select();

  class MultiSelect extends Select {
    constructor(options) {
      super({ ...options, multiple: true });
    }
  }
  module.exports = MultiSelect;
});

// node_modules/enquirer/lib/types/number.js
var require_number = __commonJS((exports, module) => {
  var StringPrompt = require_string();

  class NumberPrompt extends StringPrompt {
    constructor(options = {}) {
      super({ style: "number", ...options });
      this.min = this.isValue(options.min) ? this.toNumber(options.min) : -Infinity;
      this.max = this.isValue(options.max) ? this.toNumber(options.max) : Infinity;
      this.delay = options.delay != null ? options.delay : 1000;
      this.float = options.float !== false;
      this.round = options.round === true || options.float === false;
      this.major = options.major || 10;
      this.minor = options.minor || 1;
      this.initial = options.initial != null ? options.initial : "";
      this.input = String(this.initial);
      this.cursor = this.input.length;
      this.cursorShow();
    }
    append(ch) {
      if (!/[-+.]/.test(ch) || ch === "." && this.input.includes(".")) {
        return this.alert("invalid number");
      }
      return super.append(ch);
    }
    number(ch) {
      return super.append(ch);
    }
    next() {
      if (this.input && this.input !== this.initial)
        return this.alert();
      if (!this.isValue(this.initial))
        return this.alert();
      this.input = this.initial;
      this.cursor = String(this.initial).length;
      return this.render();
    }
    up(number) {
      let step = number || this.minor;
      let num = this.toNumber(this.input);
      if (num > this.max + step)
        return this.alert();
      this.input = `${num + step}`;
      return this.render();
    }
    down(number) {
      let step = number || this.minor;
      let num = this.toNumber(this.input);
      if (num < this.min - step)
        return this.alert();
      this.input = `${num - step}`;
      return this.render();
    }
    shiftDown() {
      return this.down(this.major);
    }
    shiftUp() {
      return this.up(this.major);
    }
    format(input2 = this.input) {
      if (typeof this.options.format === "function") {
        return this.options.format.call(this, input2);
      }
      return this.styles.info(input2);
    }
    toNumber(value = "") {
      return this.float ? +value : Math.round(+value);
    }
    isValue(value) {
      return /^[-+]?[0-9]+((\.)|(\.[0-9]+))?$/.test(value);
    }
    submit() {
      let value = [this.input, this.initial].find((v) => this.isValue(v));
      this.value = this.toNumber(value || 0);
      return super.submit();
    }
  }
  module.exports = NumberPrompt;
});

// node_modules/enquirer/lib/prompts/password.js
var require_password = __commonJS((exports, module) => {
  var StringPrompt = require_string();

  class PasswordPrompt extends StringPrompt {
    constructor(options) {
      super(options);
      this.cursorShow();
    }
    format(input2 = this.input) {
      if (!this.keypressed)
        return "";
      let color = this.state.submitted ? this.styles.primary : this.styles.muted;
      return color(this.symbols.asterisk.repeat(input2.length));
    }
  }
  module.exports = PasswordPrompt;
});

// node_modules/enquirer/lib/prompts/scale.js
var require_scale = __commonJS((exports, module) => {
  var stripAnsi = require_strip_ansi();
  var ArrayPrompt = require_array();
  var utils = require_utils();

  class LikertScale extends ArrayPrompt {
    constructor(options = {}) {
      super(options);
      this.widths = [].concat(options.messageWidth || 50);
      this.align = [].concat(options.align || "left");
      this.linebreak = options.linebreak || false;
      this.edgeLength = options.edgeLength || 3;
      this.newline = options.newline || `
   `;
      let start = options.startNumber || 1;
      if (typeof this.scale === "number") {
        this.scaleKey = false;
        this.scale = Array(this.scale).fill(0).map((v, i) => ({ name: i + start }));
      }
    }
    async reset() {
      this.tableized = false;
      await super.reset();
      return this.render();
    }
    tableize() {
      if (this.tableized === true)
        return;
      this.tableized = true;
      let longest = 0;
      for (let ch of this.choices) {
        longest = Math.max(longest, ch.message.length);
        ch.scaleIndex = ch.initial || 2;
        ch.scale = [];
        for (let i = 0;i < this.scale.length; i++) {
          ch.scale.push({ index: i });
        }
      }
      this.widths[0] = Math.min(this.widths[0], longest + 3);
    }
    async dispatch(s, key) {
      if (this.multiple) {
        return this[key.name] ? await this[key.name](s, key) : await super.dispatch(s, key);
      }
      this.alert();
    }
    heading(msg, item, i) {
      return this.styles.strong(msg);
    }
    separator() {
      return this.styles.muted(this.symbols.ellipsis);
    }
    right() {
      let choice = this.focused;
      if (choice.scaleIndex >= this.scale.length - 1)
        return this.alert();
      choice.scaleIndex++;
      return this.render();
    }
    left() {
      let choice = this.focused;
      if (choice.scaleIndex <= 0)
        return this.alert();
      choice.scaleIndex--;
      return this.render();
    }
    indent() {
      return "";
    }
    format() {
      if (this.state.submitted) {
        let values = this.choices.map((ch) => this.styles.info(ch.index));
        return values.join(", ");
      }
      return "";
    }
    pointer() {
      return "";
    }
    renderScaleKey() {
      if (this.scaleKey === false)
        return "";
      if (this.state.submitted)
        return "";
      let scale = this.scale.map((item) => `   ${item.name} - ${item.message}`);
      let key = ["", ...scale].map((item) => this.styles.muted(item));
      return key.join(`
`);
    }
    renderScaleHeading(max) {
      let keys = this.scale.map((ele) => ele.name);
      if (typeof this.options.renderScaleHeading === "function") {
        keys = this.options.renderScaleHeading.call(this, max);
      }
      let diff = this.scaleLength - keys.join("").length;
      let spacing = Math.round(diff / (keys.length - 1));
      let names = keys.map((key) => this.styles.strong(key));
      let headings = names.join(" ".repeat(spacing));
      let padding = " ".repeat(this.widths[0]);
      return this.margin[3] + padding + this.margin[1] + headings;
    }
    scaleIndicator(choice, item, i) {
      if (typeof this.options.scaleIndicator === "function") {
        return this.options.scaleIndicator.call(this, choice, item, i);
      }
      let enabled = choice.scaleIndex === item.index;
      if (item.disabled)
        return this.styles.hint(this.symbols.radio.disabled);
      if (enabled)
        return this.styles.success(this.symbols.radio.on);
      return this.symbols.radio.off;
    }
    renderScale(choice, i) {
      let scale = choice.scale.map((item) => this.scaleIndicator(choice, item, i));
      let padding = this.term === "Hyper" ? "" : " ";
      return scale.join(padding + this.symbols.line.repeat(this.edgeLength));
    }
    async renderChoice(choice, i) {
      await this.onChoice(choice, i);
      let focused = this.index === i;
      let pointer = await this.pointer(choice, i);
      let hint = await choice.hint;
      if (hint && !utils.hasColor(hint)) {
        hint = this.styles.muted(hint);
      }
      let pad = (str) => this.margin[3] + str.replace(/\s+$/, "").padEnd(this.widths[0], " ");
      let newline = this.newline;
      let ind = this.indent(choice);
      let message = await this.resolve(choice.message, this.state, choice, i);
      let scale = await this.renderScale(choice, i);
      let margin = this.margin[1] + this.margin[3];
      this.scaleLength = stripAnsi(scale).length;
      this.widths[0] = Math.min(this.widths[0], this.width - this.scaleLength - margin.length);
      let msg = utils.wordWrap(message, { width: this.widths[0], newline });
      let lines = msg.split(`
`).map((line) => pad(line) + this.margin[1]);
      if (focused) {
        scale = this.styles.info(scale);
        lines = lines.map((line) => this.styles.info(line));
      }
      lines[0] += scale;
      if (this.linebreak)
        lines.push("");
      return [ind + pointer, lines.join(`
`)].filter(Boolean);
    }
    async renderChoices() {
      if (this.state.submitted)
        return "";
      this.tableize();
      let choices = this.visible.map(async (ch, i) => await this.renderChoice(ch, i));
      let visible = await Promise.all(choices);
      let heading = await this.renderScaleHeading();
      return this.margin[0] + [heading, ...visible.map((v) => v.join(" "))].join(`
`);
    }
    async render() {
      let { submitted, size } = this.state;
      let prefix = await this.prefix();
      let separator = await this.separator();
      let message = await this.message();
      let prompt = "";
      if (this.options.promptLine !== false) {
        prompt = [prefix, message, separator, ""].join(" ");
        this.state.prompt = prompt;
      }
      let header = await this.header();
      let output = await this.format();
      let key = await this.renderScaleKey();
      let help = await this.error() || await this.hint();
      let body = await this.renderChoices();
      let footer = await this.footer();
      let err = this.emptyError;
      if (output)
        prompt += output;
      if (help && !prompt.includes(help))
        prompt += " " + help;
      if (submitted && !output && !body.trim() && this.multiple && err != null) {
        prompt += this.styles.danger(err);
      }
      this.clear(size);
      this.write([header, prompt, key, body, footer].filter(Boolean).join(`
`));
      if (!this.state.submitted) {
        this.write(this.margin[2]);
      }
      this.restore();
    }
    submit() {
      this.value = {};
      for (let choice of this.choices) {
        this.value[choice.name] = choice.scaleIndex;
      }
      return this.base.submit.call(this);
    }
  }
  module.exports = LikertScale;
});

// node_modules/enquirer/lib/interpolate.js
var require_interpolate = __commonJS((exports, module) => {
  var stripAnsi = require_strip_ansi();
  var clean = (str = "") => {
    return typeof str === "string" ? str.replace(/^['"]|['"]$/g, "") : "";
  };

  class Item {
    constructor(token) {
      this.name = token.key;
      this.field = token.field || {};
      this.value = clean(token.initial || this.field.initial || "");
      this.message = token.message || this.name;
      this.cursor = 0;
      this.input = "";
      this.lines = [];
    }
  }
  var tokenize = async (options = {}, defaults = {}, fn = (token) => token) => {
    let unique = new Set;
    let fields = options.fields || [];
    let input2 = options.template;
    let tabstops = [];
    let items = [];
    let keys = [];
    let line = 1;
    if (typeof input2 === "function") {
      input2 = await input2();
    }
    let i = -1;
    let next = () => input2[++i];
    let peek = () => input2[i + 1];
    let push = (token) => {
      token.line = line;
      tabstops.push(token);
    };
    push({ type: "bos", value: "" });
    while (i < input2.length - 1) {
      let value = next();
      if (/^[^\S\n ]$/.test(value)) {
        push({ type: "text", value });
        continue;
      }
      if (value === `
`) {
        push({ type: "newline", value });
        line++;
        continue;
      }
      if (value === "\\") {
        value += next();
        push({ type: "text", value });
        continue;
      }
      if ((value === "$" || value === "#" || value === "{") && peek() === "{") {
        let n = next();
        value += n;
        let token = { type: "template", open: value, inner: "", close: "", value };
        let ch;
        while (ch = next()) {
          if (ch === "}") {
            if (peek() === "}")
              ch += next();
            token.value += ch;
            token.close = ch;
            break;
          }
          if (ch === ":") {
            token.initial = "";
            token.key = token.inner;
          } else if (token.initial !== undefined) {
            token.initial += ch;
          }
          token.value += ch;
          token.inner += ch;
        }
        token.template = token.open + (token.initial || token.inner) + token.close;
        token.key = token.key || token.inner;
        if (hasOwnProperty.call(defaults, token.key)) {
          token.initial = defaults[token.key];
        }
        token = fn(token);
        push(token);
        keys.push(token.key);
        unique.add(token.key);
        let item = items.find((item2) => item2.name === token.key);
        token.field = fields.find((ch2) => ch2.name === token.key);
        if (!item) {
          item = new Item(token);
          items.push(item);
        }
        item.lines.push(token.line - 1);
        continue;
      }
      let last = tabstops[tabstops.length - 1];
      if (last.type === "text" && last.line === line) {
        last.value += value;
      } else {
        push({ type: "text", value });
      }
    }
    push({ type: "eos", value: "" });
    return { input: input2, tabstops, unique, keys, items };
  };
  module.exports = async (prompt) => {
    let options = prompt.options;
    let required = new Set(options.required === true ? [] : options.required || []);
    let defaults = { ...options.values, ...options.initial };
    let { tabstops, items, keys } = await tokenize(options, defaults);
    let result = createFn("result", prompt, options);
    let format = createFn("format", prompt, options);
    let isValid = createFn("validate", prompt, options, true);
    let isVal = prompt.isValue.bind(prompt);
    return async (state = {}, submitted = false) => {
      let index = 0;
      state.required = required;
      state.items = items;
      state.keys = keys;
      state.output = "";
      let validate = async (value, state2, item, index2) => {
        let error = await isValid(value, state2, item, index2);
        if (error === false) {
          return "Invalid field " + item.name;
        }
        return error;
      };
      for (let token of tabstops) {
        let value = token.value;
        let key = token.key;
        if (token.type !== "template") {
          if (value)
            state.output += value;
          continue;
        }
        if (token.type === "template") {
          let item = items.find((ch) => ch.name === key);
          if (options.required === true) {
            state.required.add(item.name);
          }
          let val = [item.input, state.values[item.value], item.value, value].find(isVal);
          let field = item.field || {};
          let message = field.message || token.inner;
          if (submitted) {
            let error = await validate(state.values[key], state, item, index);
            if (error && typeof error === "string" || error === false) {
              state.invalid.set(key, error);
              continue;
            }
            state.invalid.delete(key);
            let res = await result(state.values[key], state, item, index);
            state.output += stripAnsi(res);
            continue;
          }
          item.placeholder = false;
          let before = value;
          value = await format(value, state, item, index);
          if (val !== value) {
            state.values[key] = val;
            value = prompt.styles.typing(val);
            state.missing.delete(message);
          } else {
            state.values[key] = undefined;
            val = `<${message}>`;
            value = prompt.styles.primary(val);
            item.placeholder = true;
            if (state.required.has(key)) {
              state.missing.add(message);
            }
          }
          if (state.missing.has(message) && state.validating) {
            value = prompt.styles.warning(val);
          }
          if (state.invalid.has(key) && state.validating) {
            value = prompt.styles.danger(val);
          }
          if (index === state.index) {
            if (before !== value) {
              value = prompt.styles.underline(value);
            } else {
              value = prompt.styles.heading(stripAnsi(value));
            }
          }
          index++;
        }
        if (value) {
          state.output += value;
        }
      }
      let lines = state.output.split(`
`).map((l) => " " + l);
      let len = items.length;
      let done = 0;
      for (let item of items) {
        if (state.invalid.has(item.name)) {
          item.lines.forEach((i) => {
            if (lines[i][0] !== " ")
              return;
            lines[i] = state.styles.danger(state.symbols.bullet) + lines[i].slice(1);
          });
        }
        if (prompt.isValue(state.values[item.name])) {
          done++;
        }
      }
      state.completed = (done / len * 100).toFixed(0);
      state.output = lines.join(`
`);
      return state.output;
    };
  };
  function createFn(prop, prompt, options, fallback) {
    return (value, state, item, index) => {
      if (typeof item.field[prop] === "function") {
        return item.field[prop].call(prompt, value, state, item, index);
      }
      return [fallback, value].find((v) => prompt.isValue(v));
    };
  }
});

// node_modules/enquirer/lib/prompts/snippet.js
var require_snippet = __commonJS((exports, module) => {
  var stripAnsi = require_strip_ansi();
  var interpolate = require_interpolate();
  var Prompt = require_prompt();

  class SnippetPrompt extends Prompt {
    constructor(options) {
      super(options);
      this.cursorHide();
      this.reset(true);
    }
    async initialize() {
      this.interpolate = await interpolate(this);
      await super.initialize();
    }
    async reset(first) {
      this.state.keys = [];
      this.state.invalid = new Map;
      this.state.missing = new Set;
      this.state.completed = 0;
      this.state.values = {};
      if (first !== true) {
        await this.initialize();
        await this.render();
      }
    }
    moveCursor(n) {
      let item = this.getItem();
      this.cursor += n;
      item.cursor += n;
    }
    dispatch(ch, key) {
      if (!key.code && !key.ctrl && ch != null && this.getItem()) {
        this.append(ch, key);
        return;
      }
      this.alert();
    }
    append(ch, key) {
      let item = this.getItem();
      let prefix = item.input.slice(0, this.cursor);
      let suffix = item.input.slice(this.cursor);
      this.input = item.input = `${prefix}${ch}${suffix}`;
      this.moveCursor(1);
      this.render();
    }
    delete() {
      let item = this.getItem();
      if (this.cursor <= 0 || !item.input)
        return this.alert();
      let suffix = item.input.slice(this.cursor);
      let prefix = item.input.slice(0, this.cursor - 1);
      this.input = item.input = `${prefix}${suffix}`;
      this.moveCursor(-1);
      this.render();
    }
    increment(i) {
      return i >= this.state.keys.length - 1 ? 0 : i + 1;
    }
    decrement(i) {
      return i <= 0 ? this.state.keys.length - 1 : i - 1;
    }
    first() {
      this.state.index = 0;
      this.render();
    }
    last() {
      this.state.index = this.state.keys.length - 1;
      this.render();
    }
    right() {
      if (this.cursor >= this.input.length)
        return this.alert();
      this.moveCursor(1);
      this.render();
    }
    left() {
      if (this.cursor <= 0)
        return this.alert();
      this.moveCursor(-1);
      this.render();
    }
    prev() {
      this.state.index = this.decrement(this.state.index);
      this.getItem();
      this.render();
    }
    next() {
      this.state.index = this.increment(this.state.index);
      this.getItem();
      this.render();
    }
    up() {
      this.prev();
    }
    down() {
      this.next();
    }
    format(value) {
      let color = this.state.completed < 100 ? this.styles.warning : this.styles.success;
      if (this.state.submitted === true && this.state.completed !== 100) {
        color = this.styles.danger;
      }
      return color(`${this.state.completed}% completed`);
    }
    async render() {
      let { index, keys = [], submitted, size } = this.state;
      let newline = [this.options.newline, `
`].find((v) => v != null);
      let prefix = await this.prefix();
      let separator = await this.separator();
      let message = await this.message();
      let prompt = [prefix, message, separator].filter(Boolean).join(" ");
      this.state.prompt = prompt;
      let header = await this.header();
      let error = await this.error() || "";
      let hint = await this.hint() || "";
      let body = submitted ? "" : await this.interpolate(this.state);
      let key = this.state.key = keys[index] || "";
      let input2 = await this.format(key);
      let footer = await this.footer();
      if (input2)
        prompt += " " + input2;
      if (hint && !input2 && this.state.completed === 0)
        prompt += " " + hint;
      this.clear(size);
      let lines = [header, prompt, body, footer, error.trim()];
      this.write(lines.filter(Boolean).join(newline));
      this.restore();
    }
    getItem(name) {
      let { items, keys, index } = this.state;
      let item = items.find((ch) => ch.name === keys[index]);
      if (item && item.input != null) {
        this.input = item.input;
        this.cursor = item.cursor;
      }
      return item;
    }
    async submit() {
      if (typeof this.interpolate !== "function")
        await this.initialize();
      await this.interpolate(this.state, true);
      let { invalid, missing, output, values } = this.state;
      if (invalid.size) {
        let err = "";
        for (let [key, value] of invalid)
          err += `Invalid ${key}: ${value}
`;
        this.state.error = err;
        return super.submit();
      }
      if (missing.size) {
        this.state.error = "Required: " + [...missing.keys()].join(", ");
        return super.submit();
      }
      let lines = stripAnsi(output).split(`
`);
      let result = lines.map((v) => v.slice(1)).join(`
`);
      this.value = { values, result };
      return super.submit();
    }
  }
  module.exports = SnippetPrompt;
});

// node_modules/enquirer/lib/prompts/sort.js
var require_sort = __commonJS((exports, module) => {
  var hint = "(Use <shift>+<up/down> to sort)";
  var Prompt = require_select();

  class Sort extends Prompt {
    constructor(options) {
      super({ ...options, reorder: false, sort: true, multiple: true });
      this.state.hint = [this.options.hint, hint].find(this.isValue.bind(this));
    }
    indicator() {
      return "";
    }
    async renderChoice(choice, i) {
      let str = await super.renderChoice(choice, i);
      let sym = this.symbols.identicalTo + " ";
      let pre = this.index === i && this.sorting ? this.styles.muted(sym) : "  ";
      if (this.options.drag === false)
        pre = "";
      if (this.options.numbered === true) {
        return pre + `${i + 1} - ` + str;
      }
      return pre + str;
    }
    get selected() {
      return this.choices;
    }
    submit() {
      this.value = this.choices.map((choice) => choice.value);
      return super.submit();
    }
  }
  module.exports = Sort;
});

// node_modules/enquirer/lib/prompts/survey.js
var require_survey = __commonJS((exports, module) => {
  var ArrayPrompt = require_array();

  class Survey extends ArrayPrompt {
    constructor(options = {}) {
      super(options);
      this.emptyError = options.emptyError || "No items were selected";
      this.term = process.env.TERM_PROGRAM;
      if (!this.options.header) {
        let header = ["", "4 - Strongly Agree", "3 - Agree", "2 - Neutral", "1 - Disagree", "0 - Strongly Disagree", ""];
        header = header.map((ele) => this.styles.muted(ele));
        this.state.header = header.join(`
   `);
      }
    }
    async toChoices(...args) {
      if (this.createdScales)
        return false;
      this.createdScales = true;
      let choices = await super.toChoices(...args);
      for (let choice of choices) {
        choice.scale = createScale(5, this.options);
        choice.scaleIdx = 2;
      }
      return choices;
    }
    dispatch() {
      this.alert();
    }
    space() {
      let choice = this.focused;
      let ele = choice.scale[choice.scaleIdx];
      let selected = ele.selected;
      choice.scale.forEach((e) => e.selected = false);
      ele.selected = !selected;
      return this.render();
    }
    indicator() {
      return "";
    }
    pointer() {
      return "";
    }
    separator() {
      return this.styles.muted(this.symbols.ellipsis);
    }
    right() {
      let choice = this.focused;
      if (choice.scaleIdx >= choice.scale.length - 1)
        return this.alert();
      choice.scaleIdx++;
      return this.render();
    }
    left() {
      let choice = this.focused;
      if (choice.scaleIdx <= 0)
        return this.alert();
      choice.scaleIdx--;
      return this.render();
    }
    indent() {
      return "   ";
    }
    async renderChoice(item, i) {
      await this.onChoice(item, i);
      let focused = this.index === i;
      let isHyper = this.term === "Hyper";
      let n = !isHyper ? 8 : 9;
      let s = !isHyper ? " " : "";
      let ln = this.symbols.line.repeat(n);
      let sp = " ".repeat(n + (isHyper ? 0 : 1));
      let dot = (enabled) => (enabled ? this.styles.success("\u25C9") : "\u25EF") + s;
      let num = i + 1 + ".";
      let color = focused ? this.styles.heading : this.styles.noop;
      let msg = await this.resolve(item.message, this.state, item, i);
      let indent = this.indent(item);
      let scale = indent + item.scale.map((e, i2) => dot(i2 === item.scaleIdx)).join(ln);
      let val = (i2) => i2 === item.scaleIdx ? color(i2) : i2;
      let next = indent + item.scale.map((e, i2) => val(i2)).join(sp);
      let line = () => [num, msg].filter(Boolean).join(" ");
      let lines = () => [line(), scale, next, " "].filter(Boolean).join(`
`);
      if (focused) {
        scale = this.styles.cyan(scale);
        next = this.styles.cyan(next);
      }
      return lines();
    }
    async renderChoices() {
      if (this.state.submitted)
        return "";
      let choices = this.visible.map(async (ch, i) => await this.renderChoice(ch, i));
      let visible = await Promise.all(choices);
      if (!visible.length)
        visible.push(this.styles.danger("No matching choices"));
      return visible.join(`
`);
    }
    format() {
      if (this.state.submitted) {
        let values = this.choices.map((ch) => this.styles.info(ch.scaleIdx));
        return values.join(", ");
      }
      return "";
    }
    async render() {
      let { submitted, size } = this.state;
      let prefix = await this.prefix();
      let separator = await this.separator();
      let message = await this.message();
      let prompt = [prefix, message, separator].filter(Boolean).join(" ");
      this.state.prompt = prompt;
      let header = await this.header();
      let output = await this.format();
      let help = await this.error() || await this.hint();
      let body = await this.renderChoices();
      let footer = await this.footer();
      if (output || !help)
        prompt += " " + output;
      if (help && !prompt.includes(help))
        prompt += " " + help;
      if (submitted && !output && !body && this.multiple && this.type !== "form") {
        prompt += this.styles.danger(this.emptyError);
      }
      this.clear(size);
      this.write([prompt, header, body, footer].filter(Boolean).join(`
`));
      this.restore();
    }
    submit() {
      this.value = {};
      for (let choice of this.choices) {
        this.value[choice.name] = choice.scaleIdx;
      }
      return this.base.submit.call(this);
    }
  }
  function createScale(n, options = {}) {
    if (Array.isArray(options.scale)) {
      return options.scale.map((ele) => ({ ...ele }));
    }
    let scale = [];
    for (let i = 1;i < n + 1; i++)
      scale.push({ i, selected: false });
    return scale;
  }
  module.exports = Survey;
});

// node_modules/enquirer/lib/prompts/toggle.js
var require_toggle = __commonJS((exports, module) => {
  var BooleanPrompt = require_boolean();

  class TogglePrompt extends BooleanPrompt {
    async initialize() {
      await super.initialize();
      this.value = this.initial = this.resolve(this.options.initial);
      this.disabled = this.options.disabled || "no";
      this.enabled = this.options.enabled || "yes";
      await this.render();
    }
    reset() {
      this.value = this.initial;
      this.render();
    }
    delete() {
      this.alert();
    }
    toggle() {
      this.value = !this.value;
      this.render();
    }
    enable() {
      if (this.value === true)
        return this.alert();
      this.value = true;
      this.render();
    }
    disable() {
      if (this.value === false)
        return this.alert();
      this.value = false;
      this.render();
    }
    up() {
      this.toggle();
    }
    down() {
      this.toggle();
    }
    right() {
      this.toggle();
    }
    left() {
      this.toggle();
    }
    next() {
      this.toggle();
    }
    prev() {
      this.toggle();
    }
    dispatch(ch = "", key) {
      switch (ch.toLowerCase()) {
        case " ":
          return this.toggle();
        case "1":
        case "y":
        case "t":
          return this.enable();
        case "0":
        case "n":
        case "f":
          return this.disable();
        default: {
          return this.alert();
        }
      }
    }
    format() {
      let active = (str) => this.styles.primary.underline(str);
      let value = [
        this.value ? this.disabled : active(this.disabled),
        this.value ? active(this.enabled) : this.enabled
      ];
      return value.join(this.styles.muted(" / "));
    }
    async render() {
      let { size } = this.state;
      let header = await this.header();
      let prefix = await this.prefix();
      let separator = await this.separator();
      let message = await this.message();
      let output = await this.format();
      let help = await this.error() || await this.hint();
      let footer = await this.footer();
      let prompt = [prefix, message, separator, output].join(" ");
      this.state.prompt = prompt;
      if (help && !prompt.includes(help))
        prompt += " " + help;
      this.clear(size);
      this.write([header, prompt, footer].filter(Boolean).join(`
`));
      this.write(this.margin[2]);
      this.restore();
    }
  }
  module.exports = TogglePrompt;
});

// node_modules/enquirer/lib/prompts/quiz.js
var require_quiz = __commonJS((exports, module) => {
  var SelectPrompt = require_select();

  class Quiz extends SelectPrompt {
    constructor(options) {
      super(options);
      if (typeof this.options.correctChoice !== "number" || this.options.correctChoice < 0) {
        throw new Error("Please specify the index of the correct answer from the list of choices");
      }
    }
    async toChoices(value, parent) {
      let choices = await super.toChoices(value, parent);
      if (choices.length < 2) {
        throw new Error("Please give at least two choices to the user");
      }
      if (this.options.correctChoice > choices.length) {
        throw new Error("Please specify the index of the correct answer from the list of choices");
      }
      return choices;
    }
    check(state) {
      return state.index === this.options.correctChoice;
    }
    async result(selected) {
      return {
        selectedAnswer: selected,
        correctAnswer: this.options.choices[this.options.correctChoice].value,
        correct: await this.check(this.state)
      };
    }
  }
  module.exports = Quiz;
});

// node_modules/enquirer/lib/prompts/index.js
var require_prompts = __commonJS((exports) => {
  var utils = require_utils();
  var define = (key, fn) => {
    utils.defineExport(exports, key, fn);
    utils.defineExport(exports, key.toLowerCase(), fn);
  };
  define("AutoComplete", () => require_autocomplete());
  define("BasicAuth", () => require_basicauth());
  define("Confirm", () => require_confirm());
  define("Editable", () => require_editable());
  define("Form", () => require_form());
  define("Input", () => require_input());
  define("Invisible", () => require_invisible());
  define("List", () => require_list());
  define("MultiSelect", () => require_multiselect());
  define("Numeral", () => require_number());
  define("Password", () => require_password());
  define("Scale", () => require_scale());
  define("Select", () => require_select());
  define("Snippet", () => require_snippet());
  define("Sort", () => require_sort());
  define("Survey", () => require_survey());
  define("Text", () => require_input());
  define("Toggle", () => require_toggle());
  define("Quiz", () => require_quiz());
});

// node_modules/enquirer/lib/types/index.js
var require_types = __commonJS((exports, module) => {
  module.exports = {
    ArrayPrompt: require_array(),
    AuthPrompt: require_auth(),
    BooleanPrompt: require_boolean(),
    NumberPrompt: require_number(),
    StringPrompt: require_string()
  };
});

// node_modules/enquirer/index.js
var require_enquirer = __commonJS((exports, module) => {
  var assert = __require("assert");
  var Events = __require("events");
  var utils = require_utils();

  class Enquirer extends Events {
    constructor(options, answers) {
      super();
      this.options = utils.merge({}, options);
      this.answers = { ...answers };
    }
    register(type, fn) {
      if (utils.isObject(type)) {
        for (let key of Object.keys(type))
          this.register(key, type[key]);
        return this;
      }
      assert.equal(typeof fn, "function", "expected a function");
      const name = type.toLowerCase();
      if (fn.prototype instanceof this.Prompt) {
        this.prompts[name] = fn;
      } else {
        this.prompts[name] = fn(this.Prompt, this);
      }
      return this;
    }
    async prompt(questions = []) {
      for (let question of [].concat(questions)) {
        try {
          if (typeof question === "function")
            question = await question.call(this);
          await this.ask(utils.merge({}, this.options, question));
        } catch (err) {
          return Promise.reject(err);
        }
      }
      return this.answers;
    }
    async ask(question) {
      if (typeof question === "function") {
        question = await question.call(this);
      }
      let opts = utils.merge({}, this.options, question);
      let { type, name } = question;
      let { set, get } = utils;
      if (typeof type === "function") {
        type = await type.call(this, question, this.answers);
      }
      if (!type)
        return this.answers[name];
      if (type === "number")
        type = "numeral";
      assert(this.prompts[type], `Prompt "${type}" is not registered`);
      let prompt = new this.prompts[type](opts);
      let value = get(this.answers, name);
      prompt.state.answers = this.answers;
      prompt.enquirer = this;
      if (name) {
        prompt.on("submit", (value2) => {
          this.emit("answer", name, value2, prompt);
          set(this.answers, name, value2);
        });
      }
      let emit = prompt.emit.bind(prompt);
      prompt.emit = (...args) => {
        this.emit.call(this, ...args);
        return emit(...args);
      };
      this.emit("prompt", prompt, this);
      if (opts.autofill && value != null) {
        prompt.value = prompt.input = value;
        if (opts.autofill === "show") {
          await prompt.submit();
        }
      } else {
        value = prompt.value = await prompt.run();
      }
      return value;
    }
    use(plugin) {
      plugin.call(this, this);
      return this;
    }
    set Prompt(value) {
      this._Prompt = value;
    }
    get Prompt() {
      return this._Prompt || this.constructor.Prompt;
    }
    get prompts() {
      return this.constructor.prompts;
    }
    static set Prompt(value) {
      this._Prompt = value;
    }
    static get Prompt() {
      return this._Prompt || require_prompt();
    }
    static get prompts() {
      return require_prompts();
    }
    static get types() {
      return require_types();
    }
    static get prompt() {
      const fn = (questions, ...rest) => {
        let enquirer = new this(...rest);
        let emit = enquirer.emit.bind(enquirer);
        enquirer.emit = (...args) => {
          fn.emit(...args);
          return emit(...args);
        };
        return enquirer.prompt(questions);
      };
      utils.mixinEmitter(fn, new Events);
      return fn;
    }
  }
  utils.mixinEmitter(Enquirer, new Events);
  var prompts = Enquirer.prompts;
  for (let name of Object.keys(prompts)) {
    let key = name.toLowerCase();
    let run = (options) => new prompts[name](options).run();
    Enquirer.prompt[key] = run;
    Enquirer[key] = run;
    if (!Enquirer[name]) {
      Reflect.defineProperty(Enquirer, name, { get: () => prompts[name] });
    }
  }
  var define = (name) => {
    utils.defineExport(Enquirer, name, () => Enquirer.types[name]);
  };
  define("ArrayPrompt");
  define("AuthPrompt");
  define("BooleanPrompt");
  define("NumberPrompt");
  define("StringPrompt");
  module.exports = Enquirer;
});

// src/cli-input-builder.ts
var import_name_util = __toESM(require_dist(), 1);

// src/cli-types.ts
function isCommand(cmd) {
  return cmd?.kind === "Command" /* Command */;
}
function isInput(cmd) {
  return cmd?.kind === "Input" /* Input */;
}

// src/cli-input-builder.ts
function isInputBuilder(inputOrBuilder) {
  return inputOrBuilder instanceof BaseInputBuilder;
}

class BaseInputBuilder {
  input;
  constructor(name) {
    this.input = {
      kind: "Input" /* Input */,
      name: import_name_util.toDashedName(name),
      type: "Boolean" /* Boolean */
    };
  }
  description(description) {
    this.input.description = description;
    return this;
  }
  default(defaultValue) {
    this.input.default = defaultValue;
    return this;
  }
  prompt(message) {
    this.input.shouldPrompt = true;
    this.input.promptMessage = message;
    return this;
  }
  toInput() {
    return this.input;
  }
}

class NonBooleanInputBuilder extends BaseInputBuilder {
  constructor(input) {
    super(input.name);
    this.input = input;
  }
  required(isRequired = true) {
    this.input.isRequired = isRequired;
    return this;
  }
  choices(values) {
    this.input.choices = values;
    return this;
  }
}

class InputBuilder extends BaseInputBuilder {
  constructor(name) {
    super(name);
  }
  string() {
    return new NonBooleanInputBuilder({
      ...this.input,
      type: "String" /* String */
    });
  }
  number() {
    return new NonBooleanInputBuilder({
      ...this.input,
      type: "Number" /* Number */
    });
  }
}
function input(name) {
  return new InputBuilder(name);
}

// src/cli-command-builder.ts
function isCommandBuilder(cmd) {
  return cmd instanceof CommandBuilderBase;
}
function allInputs(cmd) {
  return [...cmd.arguments, ...Object.values(cmd.inputs).filter(isInput)].filter((i) => !["version", "help", "doc"].includes(i.name));
}

class CommandBuilderBase {
  cmd;
  constructor(name) {
    this.cmd = {
      kind: "Command" /* Command */,
      name,
      arguments: [],
      inputs: {
        help: input("help").description("Show help").toInput(),
        doc: input("doc").description("Generate documentation").toInput()
      }
    };
  }
  description(description) {
    this.cmd.description = description;
    return this;
  }
  option(inputOrBuilder) {
    const input2 = isInputBuilder(inputOrBuilder) ? inputOrBuilder.toInput() : inputOrBuilder;
    this.cmd.inputs[input2.name] = input2;
    return this;
  }
  load(loader) {
    this.cmd.loader = loader;
    return this;
  }
  handle(action) {
    this.cmd.handler = action;
    return this;
  }
  toCommand() {
    return this.cmd;
  }
}

class CommandBuilderWithInnerCommands extends CommandBuilderBase {
  constructor(command) {
    super(command.name);
    this.cmd = command;
  }
  command(commandOrBuilder) {
    const command = isCommandBuilder(commandOrBuilder) ? commandOrBuilder.toCommand() : commandOrBuilder;
    this.cmd.arguments.push({ ...command, inputs: { ...this.cmd.inputs, ...command.inputs } });
    return this;
  }
}

class CommandBuilderWithArguments extends CommandBuilderBase {
  constructor(command) {
    super(command.name);
    this.cmd = command;
  }
  argument(inputOrBuilder) {
    const arg = isInputBuilder(inputOrBuilder) ? inputOrBuilder.toInput() : inputOrBuilder;
    if (arg.type === "Boolean" /* Boolean */) {
      arg.type = "String" /* String */;
    }
    if (arg.isRequired) {
      for (const currentArg of this.cmd.arguments) {
        if (isInput(currentArg))
          currentArg.isRequired = true;
      }
    }
    this.cmd.arguments.push(arg);
    return this;
  }
}

class CommandBuilder extends CommandBuilderBase {
  command(inputOrBuilder) {
    return new CommandBuilderWithInnerCommands(this.cmd).command(inputOrBuilder);
  }
  argument(inputOrBuilder) {
    return new CommandBuilderWithArguments(this.cmd).argument(inputOrBuilder);
  }
}
function command(name) {
  return new CommandBuilder(name);
}

// src/cli-builder.ts
class Cli extends CommandBuilder {
  constructor(name) {
    super(name);
  }
  version(version) {
    this.cmd.version = version;
    if (!this.cmd.inputs["version"]) {
      this.option(input("version").description("Show version"));
    }
    return this;
  }
}
function cli(name) {
  return new Cli(name);
}

// src/cli-runner.ts
var import_chalk2 = __toESM(require_source(), 1);
var import_name_util3 = __toESM(require_dist(), 1);

// src/cli-error.ts
class CliError extends Error {
  message;
  command;
  parentCommands;
  constructor(message, command2, parentCommands) {
    super(message);
    this.message = message;
    this.command = command2;
    this.parentCommands = parentCommands;
  }
}

// src/cli-help.ts
var import_chalk = __toESM(require_source(), 1);
var SPACER = "   ";
var NEW_LINE = `
`;
var AVAILABLE_WIDTH = typeof jest !== "undefined" ? 80 : (process?.stdout?.columns ?? 80) - SPACER.length;
var COMMON_OPTIONS = ["version", "help", "doc"];
function extractInputs(command2, commonOptions = false) {
  return Object.values(command2.inputs).filter((i) => COMMON_OPTIONS.includes(String(i.name)) === commonOptions).sort((a, b) => {
    if (COMMON_OPTIONS.includes(String(a.name)))
      return 1;
    if (COMMON_OPTIONS.includes(String(b.name)))
      return -1;
    if (a === b)
      return 0;
    return 1;
  });
}
function maxNumberOfColumns(...lines) {
  return lines.reduce((line, currentLine) => {
    return line.length < currentLine?.length ? currentLine : line;
  }, []).length;
}
function calculateColumnWidth(noOfColumns, ...lines) {
  const widths = lines.reduce((width, cols) => {
    return width.map((w, index) => Math.max(w, cols?.[index]?.length ?? 0));
  }, new Array(noOfColumns).fill(0));
  let availableWidth = AVAILABLE_WIDTH - SPACER.length * noOfColumns;
  return widths.map((w) => {
    const possibleWidth = Math.min(availableWidth, w);
    availableWidth -= possibleWidth;
    return possibleWidth;
  });
}
function generateSpaces(length) {
  if (length < 1)
    return "";
  return new Array(length).fill(" ").join("");
}
function fitToColumn(content, widths, index) {
  const availableWidth = widths[index];
  const padding = widths.reduce((a, w, i) => a + (i < index ? w : 0), -SPACER.length * 2 - 1);
  const lines = [];
  let currentLine = "";
  for (const word of content.split(" ")) {
    const nextLine = [currentLine, word].filter((i) => i !== "").join(" ");
    if (nextLine.length < availableWidth) {
      currentLine = nextLine;
    } else {
      lines.push(nextLine);
      currentLine = "";
    }
  }
  if (currentLine !== "")
    lines.push(currentLine);
  return lines.map((l, i) => generateSpaces(i === 0 ? 0 : padding) + l.padEnd(availableWidth)).join(NEW_LINE);
}
function toColumn(lines) {
  const noOfColumns = maxNumberOfColumns(...lines);
  const widths = calculateColumnWidth(noOfColumns, ...lines);
  return lines.map((column) => {
    return column.map((content, index) => fitToColumn(content, widths, index)).join(SPACER);
  });
}
function joinWithSpace(...lines) {
  return lines.filter((i) => !!i).join(" ");
}
function formatCommand(...lines) {
  return [
    SPACER,
    lines.map((value) => value instanceof Array ? value.join(NEW_LINE) : value).join(NEW_LINE + NEW_LINE),
    SPACER
  ].join(NEW_LINE);
}
function toRequired(content, isRequired = true) {
  return isRequired ? `<${content}>` : `[${content}]`;
}
function toInputHelp(input2) {
  return [import_chalk.yellow(input2.name), input2.description ?? ""];
}
function toOptionType(input2) {
  if (input2.choices?.length) {
    return `=<${input2.choices?.join("|")}>`;
  }
  return input2.type === "String" /* String */ ? "=<string>" : input2.type === "Number" /* Number */ ? "=<number>" : "";
}
function toOptionHelp(input2) {
  return [
    import_chalk.yellow(`--${input2.name}${toOptionType(input2)}`),
    `${input2.isRequired ? import_chalk.red("[Required] ") : ""}${input2.description ?? ""}`
  ];
}
function toInputNames(command2) {
  const hasInputs = !!Object.values(command2.inputs).length;
  return hasInputs ? extractInputs(command2).map((input2) => {
    const option = `--${input2.name}${toOptionType(input2)}`;
    return import_chalk.yellow(input2.isRequired ? option : `[${option}]`);
  }) : [];
}
function toCommonInputNames(command2) {
  const hasInputs = !!Object.values(command2.inputs).length;
  return hasInputs ? extractInputs(command2, true).map((input2) => {
    const option = `--${input2.name}${toOptionType(input2)}`;
    return import_chalk.yellow(input2.isRequired ? option : `[${option}]`);
  }) : [];
}
function toInputsHelp(command2) {
  const inputs = extractInputs(command2);
  const hasInputs = !!inputs.length;
  return hasInputs ? [hasInputs ? [import_chalk.gray("OPTIONS")] : undefined, ...inputs.map(toOptionHelp)] : [];
}
function toCommonInputsHelp(command2) {
  const hasInputs = !!Object.values(command2.inputs).length;
  return hasInputs ? [hasInputs ? [import_chalk.gray("COMMON")] : undefined, ...extractInputs(command2, true).map(toOptionHelp)] : [];
}
function toArgumentNames(command2) {
  const commandArgs = command2.arguments.filter((i) => i.kind === "Input" /* Input */);
  const hasArguments = !!commandArgs.length;
  return hasArguments ? commandArgs.map((input2) => import_chalk.yellow(toRequired(input2.name, !!input2.isRequired))) : [];
}
function toArgumentsHelp(command2) {
  const commandArgs = command2.arguments.filter(isInput);
  const hasArguments = !!commandArgs.length;
  return hasArguments ? [hasArguments ? [import_chalk.gray("ARGUMENTS")] : undefined, ...commandArgs.map(toInputHelp)] : [];
}
function toCommandsHelp(command2) {
  const commands = command2.arguments.filter(isCommand);
  const hasCommands = !!commands.length;
  return hasCommands ? [[import_chalk.gray("COMMANDS")], ...commands.map(toInputHelp)] : [];
}
function toCommandNames(command2) {
  const commands = command2.arguments.filter(isCommand);
  const hasCommands = !!commands.length;
  return hasCommands ? commands.map((command3) => command3.name) : [];
}
function toHelp(command2, prefix, includeCommonInputs) {
  const commands = toCommandsHelp(command2);
  const args = toArgumentsHelp(command2);
  const inputs = toInputsHelp(command2);
  const commonInputs = includeCommonInputs ? toCommonInputsHelp(command2) : [];
  return formatCommand(...toColumn([
    [
      joinWithSpace(prefix ? import_chalk.green(prefix) : "", command2.name ? import_chalk.green(command2.name) : ""),
      joinWithSpace(commands.length ? toRequired(toCommandNames(command2).join("|")) : "", args.length ? toArgumentNames(command2).join(" ") : "", inputs.length ? toInputNames(command2).join(" ") : "", includeCommonInputs ? toCommonInputNames(command2).join(" ") : "")
    ]
  ]), ...toColumn([...commands, ...args, ...inputs, ...commonInputs].filter((i) => !!i)));
}
function showHelp(command2, prefix) {
  const help = toHelp(command2, prefix, true);
  console.log(help);
  return help;
}
function toDocumentation(command2, prefix, includeCommonInputs) {
  const title = [prefix, command2.name].join(" ").trim();
  const indentation = title.split(" ").length;
  const titleSize = new Array(indentation).fill("#").join("");
  const indent = new Array(Math.max(0, indentation - 2)).fill(">").join("");
  let docs = [
    `${titleSize} ${title}`,
    ...command2.description ? ["", command2.description, ""] : [],
    "```sh",
    ...toHelp(command2, prefix, includeCommonInputs).split(`
`),
    "```",
    ""
  ].map((i) => `${indent}${i}`);
  for (const subcommand of command2.arguments.filter((arg) => arg.kind === "Command" /* Command */)) {
    docs = docs.concat(toDocumentation(subcommand, `${prefix} ${command2.name}`.trim(), false));
  }
  return docs;
}
function showDocumentation(command2, prefix) {
  const docs = toDocumentation(command2, prefix, true).join(`
`);
  console.log(docs);
  return docs;
}

// src/cli-prompt.ts
var import_enquirer = __toESM(require_enquirer(), 1);
var import_name_util2 = __toESM(require_dist(), 1);
function nonEmpty(array) {
  return array.filter((i) => !!i);
}
async function prompt(...inputOrBuilders) {
  const prompts = nonEmpty(inputOrBuilders.map((inputOrBuilder) => {
    const input2 = isInputBuilder(inputOrBuilder) ? inputOrBuilder.toInput() : inputOrBuilder;
    const isBoolean = input2.type === "Boolean" /* Boolean */;
    const isNumber = input2.type === "Number" /* Number */;
    const isMultiChoice = !!input2.choices?.length;
    const choices = [...input2.choices ?? []].map((i) => `${i}`);
    return {
      type: isMultiChoice ? "autocomplete" : isBoolean ? "confirm" : isNumber ? "numeral" : "input",
      name: import_name_util2.toCamelCase(input2.name),
      message: input2.promptMessage ?? import_name_util2.capitalize(import_name_util2.toDashedName(input2.name).replace(/-/g, " ")),
      ...isMultiChoice ? { choices, initial: choices.findIndex((choice) => choice === input2.default) ?? 0 } : {}
    };
  }));
  return await import_enquirer.prompt(prompts);
}

// src/cli-expected-error.ts
class CliExpectedError extends Error {
  message;
  constructor(message) {
    super(message);
    this.message = message;
  }
}

// src/cli-runner.ts
function toValues(value) {
  return [
    value.slice(0, -1).map((v) => `"${v}"`).join(", "),
    `"${value.slice(-1)}"`
  ].join(" or ");
}
function parseValue(value, input2, command2, parentCommands) {
  const { type, choices } = input2;
  switch (type) {
    case "String" /* String */:
      if (choices?.length && !choices.includes(value)) {
        throw new CliError(`Invalid value "${value}" for the input "--${input2.name}". You must provide ${toValues(choices)}`, command2, parentCommands);
      }
      return value;
    case "Number" /* Number */: {
      const targetValue = typeof value === "number" ? value : typeof value === "string" ? parseInt(value, undefined) : undefined;
      if (targetValue && !isNaN(targetValue))
        return targetValue;
      throw new CliError(`Invalid value "${value}" for the input "--${input2.name}". You must provide a ${input2.type.toLocaleLowerCase()}`, command2, parentCommands);
    }
    case "Boolean" /* Boolean */:
      if (typeof value === "string")
        return value === "true";
      if (typeof value === "boolean")
        return value;
  }
}
function toOptionName(arg) {
  const [name, value = true] = arg.split("=");
  return [name.replace(/^--/g, ""), value];
}
function parseInput(command2, args, argIndex = 0, props = {}, parentCommands = []) {
  const currentArg = args[argIndex];
  const [option, value = true] = toOptionName(currentArg);
  const input2 = command2.inputs[option];
  if (!input2)
    return;
  if (input2.type !== "Boolean" /* Boolean */ && !/.+=.+/.test(currentArg)) {
    const nextValue = args[argIndex + 1];
    if (typeof nextValue === "undefined" || /^--.*/.test(nextValue)) {
      throw new CliError(`Missing value for the option "--${option}"`, command2, parentCommands);
    }
    return parseCommand(command2, args, argIndex + 2, { ...props, [import_name_util3.toCamelCase(option)]: parseValue(nextValue, input2, command2, parentCommands) }, parentCommands);
  }
  return parseCommand(command2, args, argIndex + 1, { ...props, [import_name_util3.toCamelCase(option)]: parseValue(value, input2, command2, parentCommands) }, parentCommands);
}
function parseCommand(command2, args, argIndex = 0, props = {}, parentCommands = []) {
  const currentArg = args[argIndex];
  if (!currentArg)
    return [command2, props, parentCommands];
  const input2 = parseInput(command2, args, argIndex, props, parentCommands);
  if (input2)
    return input2;
  if (/^--.+/.test(currentArg))
    throw new CliError(`Invalid option "${currentArg}"`, command2, parentCommands);
  for (const input3 of command2.arguments) {
    if (isCommand(input3) && input3.name === currentArg) {
      return parseCommand(input3, args.slice(argIndex + 1), 0, props, [...parentCommands, command2]);
    }
  }
  const cmdArg = command2.arguments[argIndex];
  if (isInput(cmdArg)) {
    return parseCommand(command2, args, argIndex + 1, {
      ...props,
      [import_name_util3.toCamelCase(String(cmdArg.name))]: parseValue(currentArg, cmdArg, command2, parentCommands)
    }, parentCommands);
  }
  throw new CliError(`Invalid argument "${currentArg}"`, command2, parentCommands);
}
async function promptAllMissingValues(command2, props, parentCommands) {
  const nextProps = { ...props };
  const inputs = allInputs(command2).filter((input2) => input2.shouldPrompt);
  for (const input2 of inputs) {
    const key = import_name_util3.toCamelCase(input2.name);
    if (typeof props[key] === "undefined") {
      const nextValue = await prompt(input2);
      nextProps[key] = parseValue(nextValue[key], input2, command2, parentCommands);
    }
  }
  return nextProps;
}
function validateMissingArgs(command2, props, parentCommands) {
  for (const input2 of Object.values(command2.inputs)) {
    if (input2.isRequired && typeof props[import_name_util3.toCamelCase(input2.name)] === "undefined") {
      throw new CliError(`Missing a required input "--${input2.name}"`, command2, parentCommands);
    }
  }
  for (const input2 of command2.arguments) {
    if (isInput(input2) && input2.isRequired && typeof props[import_name_util3.toCamelCase(String(input2.name))] === "undefined") {
      throw new CliError(`Missing a required argument "<${String(input2.name)}>"`, command2, parentCommands);
    }
  }
}
function showCliHelp(command2, commands) {
  const prefix = commands.map(({ name }) => name).join(" ");
  return typeof jest !== "undefined" ? toHelp(command2, prefix) : showHelp(command2, prefix);
}
function showDoc(command2, commands) {
  const prefix = commands.map(({ name }) => name).join(" ");
  return typeof jest !== "undefined" ? toDocumentation(command2, prefix).join(`
`) : showDocumentation(command2, prefix);
}
async function parseInitialValues(command2, parsedProps) {
  const props = allInputs(command2).reduce((a, i) => {
    const key = import_name_util3.toCamelCase(i.name);
    return { ...a, [key]: a[key] ?? i.default };
  }, parsedProps);
  const loadedProps = await command2?.loader?.(props) ?? {};
  return allInputs(command2).reduce((a, i) => {
    const key = import_name_util3.toCamelCase(i.name);
    return { ...a, [key]: a[key] ?? loadedProps[key] ?? i.default };
  }, parsedProps);
}
async function runCli(commandOrBuilder, args = process.argv.slice(2)) {
  try {
    const inputCommand = isCommandBuilder(commandOrBuilder) ? commandOrBuilder.toCommand() : commandOrBuilder;
    const [command2, parsedProps, commands] = parseCommand(inputCommand, args);
    if (parsedProps.version)
      return console.log(inputCommand.version ?? "Unknown");
    if (parsedProps.help)
      return showCliHelp(command2, commands);
    if (parsedProps.doc)
      return showDoc(command2, commands);
    const initialProps = await parseInitialValues(command2, parsedProps);
    const props = await promptAllMissingValues(command2, initialProps, commands);
    validateMissingArgs(command2, props, commands);
    if (!command2.handler)
      return showCliHelp(command2, commands);
    return await command2.handler(props);
  } catch (e) {
    if (e instanceof CliError) {
      console.error(import_chalk2.red(`
Error: ${e.message}
`));
      const commandText = [...e.parentCommands, e.command].map((c) => c.name).join(" ");
      return console.log(import_chalk2.yellow(`Run "${commandText} --help" to see help`));
    }
    if (e instanceof CliExpectedError) {
      console.log("");
      console.error(import_chalk2.red(`ERROR: ${e.message}`));
      process.exit(1);
    }
    throw e;
  }
}

// src/commands/init.command.ts
import * as fs from "fs";
import * as path from "path";
var init_command_default = command("init").argument(input("name").description("Name of the project to initialize").string().required()).handle(async ({ name }) => {
  console.log(`Initializing new project '${name}'...`);
  const projectPath = path.resolve(process.cwd(), name);
  if (fs.existsSync(projectPath)) {
    const packageJsonPath = path.join(projectPath, "package.json");
    if (fs.existsSync(packageJsonPath)) {
      try {
        const packageJsonContent2 = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));
        if (packageJsonContent2.bin) {
          console.error(`Error: Project '${name}' is already initialized.`);
          process.exit(1);
        }
      } catch (error) {
        console.error("Error parsing package.json:", error);
        process.exit(1);
      }
    }
  } else {
    fs.mkdirSync(projectPath, { recursive: true });
  }
  const packageJsonContent = {
    name,
    version: "1.0.0",
    description: "",
    main: "dist/cli.js",
    bin: {
      [name]: "bin/cli"
    },
    scripts: {
      build: "bun build ./src/cli.ts --outdir ./dist --target bun",
      start: "bun run ./src/cli.ts"
    },
    keywords: [],
    author: "",
    license: "ISC"
  };
  fs.writeFileSync(path.join(projectPath, "package.json"), JSON.stringify(packageJsonContent, null, 2));
  const binDirPath = path.join(projectPath, "bin");
  fs.mkdirSync(binDirPath, { recursive: true });
  const cliExecutableContent = `#!/usr/bin/env bun

const { spawn } = await import('child_process')
const { resolve } = await import('path')
const os = await import('os')

const cli = resolve(__dirname, '..', 'dist', 'cli.js')
const args = process.argv.slice(2)
const bunPath = resolve(os.homedir(), '.bun', 'bin', 'bun')

const child = spawn(bunPath, [cli, ...args], {
  detached: false,
  stdio: 'inherit',
  cwd: process.cwd(),
})

child.on('exit', (code, signal) => {
  process.exit(code)
})
`;
  const cliExecutablePath = path.join(binDirPath, "cli");
  fs.writeFileSync(cliExecutablePath, cliExecutableContent);
  fs.chmodSync(cliExecutablePath, 493);
  const srcDirPath = path.join(projectPath, "src");
  const commandsDirPath = path.join(srcDirPath, "commands");
  fs.mkdirSync(commandsDirPath, { recursive: true });
  const cliTsContent = `#!/usr/bin/env bun
console.log('Hello from the new CLI!')`;
  fs.writeFileSync(path.join(srcDirPath, "cli.ts"), cliTsContent);
  const initCommandTsContent = `import { command } from '../cli-command-builder'
import { input } from '../cli-input-builder'

interface Props {
  name: string
}

export default command<Props>('init')
  .argument(input('name').description('Name of the project to initialize').string().required())
  .handle(async ({ name }) => {
    console.log('Init command executed in new project!', name)
  })
`;
  fs.writeFileSync(path.join(commandsDirPath, "init.command.ts"), initCommandTsContent);
  console.log("\u2705 Project initialized successfully!");
});

// src/cli.ts
var program = cli("clifer").version("0.1").command(init_command_default);
runCli(program).catch((e) => console.error(e));

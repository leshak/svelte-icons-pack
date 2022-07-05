"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _loaderUtils = require("loader-utils");

var _cheerio = _interopRequireDefault(require("cheerio"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function convertIconData(svg, multiColor) {
  var $svg = _cheerio["default"].load(svg, {
    xmlMode: true
  })("svg"); // filter/convert attributes
  // 1. remove class attr
  // 2. convert to camelcase ex: fill-opacity => fillOpacity


  var attrConverter = function attrConverter(
  /** @type {{[key: string]: string}} */
  attribs,
  /** @type string */
  tagName) {
    return attribs && Object.keys(attribs).filter(function (name) {
      return !["class"].concat(_toConsumableArray(tagName === "svg" ? ["xmlns", "xmlns:xlink", "xml:space", "width", "height"] : [])).includes(name);
    }).reduce(function (obj, name) {
      var newName = name; //camelcase(name);

      switch (newName) {
        // case "fill":
        //   if (
        //     attribs[name] === "none" ||
        //     attribs[name] === "currentColor" ||
        //     multiColor
        //   ) {
        //     obj[newName] = attribs[name];
        //   }
        //   break;
        default:
          obj[newName] = attribs[name];
          break;
      }

      return obj;
    }, {});
  }; // convert to [ { tag: 'path', attr: { d: 'M436 160c6.6 ...', ... }, child: { ... } } ]


  var elementToTree = function elementToTree(
  /** @type {Cheerio} */
  element) {
    return element.filter(function (_, e) {
      return e.tagName && !["style"].includes(e.tagName);
    }).map(function (_, e) {
      return {
        tag: e.tagName,
        attr: attrConverter(e.attribs, e.tagName),
        child: e.children && e.children.length ? elementToTree((0, _cheerio["default"])(e.children)) : undefined
      };
    }).get();
  };

  var tree = elementToTree($svg);
  return tree[0]; // like: [ { tag: 'path', attr: { d: 'M436 160c6.6 ...', ... }, child: { ... } } ]
}

function filterAttr(attr) {
  if (["p-id", "t", "style", "id"].includes(attr)) return false;
  return true;
}

function tagTreeToString(tagData) {
  if (["defs"].includes(tagData.tag)) return "";
  return "<".concat(tagData.tag).concat(Object.keys(tagData.attr).filter(filterAttr).map(function (k) {
    return " ".concat(k, "=\"").concat(tagData.attr[k], "\"");
  }).join(""), ">").concat((tagData.child || []).map(function (t) {
    return tagTreeToString(t);
  }).filter(function (x) {
    return !!x;
  }).join("\n"), "</").concat(tagData.tag, ">");
}

function generateSvgIconInfo(iconData) {
  return {
    a: iconData.attr,
    c: (iconData.child || []).map(function (t) {
      return tagTreeToString(t);
    }).filter(function (x) {
      return !!x;
    }).join("")
  };
}

function _default(content) {
  var options = (0, _loaderUtils.getOptions)(this);
  console.log("options", options);
  var svg = convertIconData(content);
  var svgDecoded = generateSvgIconInfo(svg);
  return "module.exports = " + JSON.stringify(svgDecoded);
}
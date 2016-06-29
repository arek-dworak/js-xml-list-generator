(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    create: function create(input) {
        return CodeMirror.fromTextArea(input, {
            lineNumbers: true,
            mode: 'xml',
            htmlMode: false,
            matchClosing: true
        });
    }
};

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (Editor, file) {

    this.file = null;
    this.Editor = null;
    this.request = new XMLHttpRequest();

    this.construct = function (Editor, file) {
        var _this = this;

        this.file = file;
        this.Editor = Editor;

        this.request.open('GET', file);
        this.request.onload = function () {
            _this.Editor.setValue(_this.request.response);
        };
    };

    this.load = function () {
        this.request.send();
    };

    this.construct(Editor, file);
};

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = XMLListGenerator;
function XMLListGenerator(Editor, output) {
    this.Editor = null;
    this.ouput = null;

    this.constructor = function (Editor, output) {
        this.Editor = Editor;
        this.output = output;

        this.bind();
    };

    this.bind = function () {
        var _this = this;

        CodeMirror.on(this.Editor, 'change', function () {
            var xml = new DOMParser().parseFromString(_this.Editor.getValue(), "text/xml");

            console.log(xml);
        });
    };

    this.constructor(Editor, output);
};

},{}],4:[function(require,module,exports){
'use strict';

var _XMLListGenerator = require('./XMLListGenerator');

var _XMLListGenerator2 = _interopRequireDefault(_XMLListGenerator);

var _EditorFactory = require('./EditorFactory');

var _EditorFactory2 = _interopRequireDefault(_EditorFactory);

var _XMLDataLoader = require('./XMLDataLoader');

var _XMLDataLoader2 = _interopRequireDefault(_XMLDataLoader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var $ = document.querySelector.bind(document);


window.addEventListener('load', function () {

    var Editor = _EditorFactory2.default.create($('#xml'));
    var ListGenerator = new _XMLListGenerator2.default(Editor, $('#list'), $('.error'));
    var DataLoader = new _XMLDataLoader2.default(Editor, '/items.xml');

    DataLoader.load();
}, false);

},{"./EditorFactory":1,"./XMLDataLoader":2,"./XMLListGenerator":3}]},{},[4]);

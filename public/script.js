(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
    function _class(input, output) {
        _classCallCheck(this, _class);

        this.input = input;
        this.output = output;
        this.bind();
    }

    _createClass(_class, [{
        key: "bind",
        value: function bind() {
            //this.input.
        }
    }]);

    return _class;
}();

exports.default = _class;
;

},{}],2:[function(require,module,exports){
'use strict';

var _XMLListGenerator = require('./XMLListGenerator');

var _XMLListGenerator2 = _interopRequireDefault(_XMLListGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var $ = document.querySelector.bind(document);


window.addEventListener('load', function () {

    var input = $('#xml');
    var output = $('#list');
    var Editor = EditorFactory.create(input);
    var ListGenerator = new _XMLListGenerator2.default(input, output);
    var DataLoader = new XMLDataLoader(input, '/items.xml');

    DataLoader.load();

    var editor = CodeMirror.fromTextArea(input, {
        lineNumbers: true,
        mode: 'xml',
        htmlMode: false,
        matchClosing: true
    });

    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/items.xml');
    xhr.onload = function () {
        console.log(xhr);
    };
    xhr.send();
}, false);

},{"./XMLListGenerator":1}]},{},[2]);

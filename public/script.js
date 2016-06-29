(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    create: function create(input) {
        return CodeMirror.fromTextArea(input, {
            lineNumbers: true,
            mode: input.dataset.mode,
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
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (Editor, JsonOutput, HtmlListOutput, DepthSelect) {
    this.Editor = null;
    this.JsonOutput = null;
    this.DepthSelect = null;
    this.HtmlListOutput = null;

    this.event_handlers = {
        options_generated: function options_generated() {}
    };

    this.xml = null;

    this.constructor = function (Editor, JsonOutput, HtmlListOutput, DepthSelect) {
        this.Editor = Editor;
        this.JsonOutput = JsonOutput;
        this.DepthSelect = DepthSelect;
        this.HtmlListOutput = HtmlListOutput;

        this.bind();
    };

    this.on = function (name, callback) {
        this.event_handlers[name] = callback;
    };

    this.fire = function (name) {
        this.event_handlers[name].call();
    };

    this.off = function (name) {
        this.event_handlers[name] = function () {};
    };

    this.bind = function () {
        var _this = this;

        var GenerateList = function GenerateList() {
            var node_list = _this.findNodeList();
            _this.generateJsonOutput(node_list);
            _this.generateHtmlOutput(node_list);
        };

        CodeMirror.on(this.Editor, 'change', function () {
            _this.loadXML();
            _this.generateDepthOptions(_this.findMaxDepth());
            _this.fire('options_generated');

            GenerateList();
        });

        this.DepthSelect.addEventListener("change", GenerateList);
    };

    this.loadXML = function () {
        this.xml = new DOMParser().parseFromString(this.Editor.getValue(), "text/xml");
    };

    this.findMaxDepth = function () {
        var traverseChildren = function traverseChildren(node, depth) {
            var kids_max_depth = depth;
            for (var i = 0; i < node.length; i++) {
                var child = node[i];
                var kid_depth = traverseChildren(child.children, depth + 1);
                kids_max_depth = kids_max_depth < kid_depth ? kid_depth : kids_max_depth;
            }
            return kids_max_depth;
        };

        return traverseChildren(this.xml.children, 0);
    };

    this.generateDepthOptions = function (max_depth) {
        var current_max_depth = this.DepthSelect.children.length;

        if (max_depth > current_max_depth) // add options
            {
                for (var i = current_max_depth + 1; i <= max_depth; i++) {
                    var option = document.createElement("option");
                    option.text = "Level " + i;
                    option.value = i;
                    this.DepthSelect.add(option);
                }
            } else if (max_depth < current_max_depth) // remove options
            {
                for (var _i = current_max_depth - 1; _i >= max_depth; _i--) {
                    this.DepthSelect.remove(_i);
                }
            }
    };

    this.findNodeList = function () {
        var node_list = [];

        var target_depth = this.DepthSelect.value,
            traverseNodes = function traverseNodes(node, current_depth, node_list) {
            if (current_depth == target_depth) {
                node_list.push({
                    name: node.nodeName,
                    children: node.children.length
                });

                return node_list;
            }

            for (var i = 0; i < node.children.length; i++) {
                var child = node.children[i];
                traverseNodes(child, current_depth + 1, node_list);
            }

            return node_list;
        };

        return traverseNodes(this.xml, 0, node_list);
    };

    this.generateJsonOutput = function (node_list) {
        this.JsonOutput.setValue(JSON.stringify(node_list, null, 2));
    };

    this.generateHtmlOutput = function (node_list) {
        this.HtmlListOutput.innerHTML = '';
        var List = document.createElement("ul");

        for (var i = 0; i < node_list.length; i++) {
            var node = node_list[i],
                ListElement = document.createElement("li");
            ListElement.innerHTML = '( ' + node.children + ' ) ' + node.name;
            List.appendChild(ListElement);
        }

        this.HtmlListOutput.appendChild(List);
    };

    this.constructor(Editor, JsonOutput, HtmlListOutput, DepthSelect);
};

;

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

    var Editor = _EditorFactory2.default.create($('#editor')),
        JSONOutput = _EditorFactory2.default.create($('#json_output')),
        DataLoader = new _XMLDataLoader2.default(Editor, '/items.xml'),
        ListGenerator = new _XMLListGenerator2.default(Editor, JSONOutput, $('#list'), $('#depth'));

    ListGenerator.on('options_generated', function () {
        ListGenerator.DepthSelect.value = 2;
        ListGenerator.off('options_generated');
    });

    DataLoader.load();
}, false);

},{"./EditorFactory":1,"./XMLDataLoader":2,"./XMLListGenerator":3}]},{},[4]);

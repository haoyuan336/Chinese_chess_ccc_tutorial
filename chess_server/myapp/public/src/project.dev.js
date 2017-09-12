require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"chess":[function(require,module,exports){
"use strict";
cc._RF.push(module, '18535HHApFGl6nG45zwlZJF', 'chess');
// Script/node/chess.js

'use strict';

var _defines = require('./../defines');

var _defines2 = _interopRequireDefault(_defines);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

cc.Class({
    extends: cc.Component,

    properties: {},

    // use this for initialization
    onLoad: function onLoad() {

        // chessSprite.spriteFrame = this.chess_sprite_frame;
        // chessSprite.spriteFrame.setRect(cc.Rect(0,0,100, 100));


    },
    initWithData: function initWithData(data) {
        var _this = this;

        this.x = data.index_pos.x;
        this.y = data.index_pos.y;

        console.log('data = ' + JSON.stringify(data));
        cc.loader.loadRes("./chinesechess_corner", cc.SpriteFrame, function (err, spriteFrame) {
            // console.log("error = " + err);
            var chessNameList = _defines2.default.chessList;
            var chessColorList = _defines2.default.chessColor;
            console.log("chess color liet = " + JSON.stringify(chessColorList));
            var chessName = data.chess_name;
            var chessColor = data.chess_color;
            _this.chessName = chessName;
            var indexX = 0;
            for (var i = 0; i < chessNameList.length; i++) {
                if (chessName === chessNameList[i]) {
                    indexX = i;
                }
            }
            var indexY = 0;
            for (var j = 0; j < chessColorList.length; j++) {
                if (chessColor === chessColorList[j]) {
                    indexY = j;
                }
            }

            console.log("index x= " + indexX);
            console.log("index y = " + indexY);
            var sp = spriteFrame;
            _this.node.addComponent(cc.Sprite).spriteFrame = sp.clone();
            _this.node.scale = {
                x: 50 / 350,
                y: 50 / 250
            };
            _this.node.getComponent(cc.Sprite).spriteFrame.setRect(cc.rect(50 * indexX, 50 * indexY, 50, 50));
            if (indexY === 1) {
                _this.node.rotation = 180;
            }
        });
    },
    getChessName: function getChessName() {
        return this.chessName;
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

cc._RF.pop();
},{"./../defines":"defines"}],"control_pos":[function(require,module,exports){
"use strict";
cc._RF.push(module, '5584c39Jk1IlrhbDrtT8ig/', 'control_pos');
// Script/node/control_pos.js

"use strict";

var _global = require("./../global");

var _global2 = _interopRequireDefault(_global);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

cc.Class({
    extends: cc.Component,

    properties: {
        sprite_frame: {
            default: null,
            type: cc.SpriteFrame
        }
    },

    // use this for initialization
    onLoad: function onLoad() {
        var _this = this;

        var sprite = this.node.addComponent(cc.Sprite);
        sprite.spriteFrame = this.sprite_frame.clone();
        sprite.spriteFrame.setRect(cc.rect(0, 2 * 50, 50, 50));
        this.node.scale = {
            x: 50 / 350,
            y: 50 / 250
        };
        this.node.opacity = 0;

        this.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            console.log("touch start");
        });
        this.node.on(cc.Node.EventType.TOUCH_END, function (event) {
            console.log("touch end");
            _global2.default.event.fire("touch_pos", {
                x: _this.x,
                y: _this.y
            });
        });

        _global2.default.event.on("choose_chess", this.chooseChess.bind(this));
    },
    chooseChess: function chooseChess(target) {
        this.node.opacity = 0;
        var chessJS = target.getComponent("chess");
        if (this.x === chessJS.x && this.y === chessJS.y) {
            this.node.opacity = 255;
        }
    },
    initWithPos: function initWithPos(x, y) {
        this.x = x;
        this.y = y;
    }
});

cc._RF.pop();
},{"./../global":"global"}],"defines":[function(require,module,exports){
"use strict";
cc._RF.push(module, '86752rCjvdIWp75FJGdUzbV', 'defines');
// Script/defines.js

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Created by chuhaoyuan on 2017/9/7.
 */
var defines = {};
defines.chessList = ["shuai", "shi", "xiang", "ma", "che", "pao", "bing"];
// defines.chessMap = {
//   "shuai" : 0,
// };
defines.chessColor = ["red", "black"];
exports.default = defines;
module.exports = exports["default"];

cc._RF.pop();
},{}],"event_listener":[function(require,module,exports){
"use strict";
cc._RF.push(module, '953a2pK/YtPvq1euwM22Vxq', 'event_listener');
// Script/tools/event_listener.js

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Created by chu on 2017/9/11 0011.
 */
var EventListener = function EventListener(obj) {
  var Regisiter = {};
  obj.on = function (name, method) {
    if (!Regisiter.hasOwnProperty(name)) {
      Regisiter[name] = [];
    }
    Regisiter[name].push(method);
  };
  obj.fire = function (name) {
    if (Regisiter.hasOwnProperty(name)) {
      var handlerList = Regisiter[name];
      for (var i = 0; i < handlerList.length; i++) {
        var handler = handlerList[i];
        var args = [];
        for (var j = 1; j < arguments.length; j++) {
          args.push(arguments[j]);
        }
        handler.apply(this, args);
      }
    }
  };
  obj.off = function (name, method) {
    if (Regisiter.hasOwnProperty(name)) {
      var handler = Regisiter[name];
      for (var i = 0; i < handler.length; i++) {
        if (handler[i] === method) {
          handler.splice(i, 1);
        }
      }
    }
  };
  obj.removeAllListeners = function () {
    Regisiter = {};
  };

  return obj;
};
exports.default = EventListener;
module.exports = exports["default"];

cc._RF.pop();
},{}],"game_controller":[function(require,module,exports){
"use strict";
cc._RF.push(module, '61b35uosodC1qCtwW5+zFjf', 'game_controller');
// Script/game_controller.js

'use strict';

var _defines = require('./defines');

var _defines2 = _interopRequireDefault(_defines);

var _global = require('./global');

var _global2 = _interopRequireDefault(_global);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

cc.Class({
    extends: cc.Component,

    properties: {
        chess_prefab: {
            default: null,
            type: cc.Prefab
        },
        control_pos_prefab: {
            default: null,
            type: cc.Prefab
        }
    },

    // use this for initialization
    onLoad: function onLoad() {
        var _this = this;

        this.chessNodeList = [];
        this.controlPointList = [];
        for (var i = 0; i < 10; i++) {
            for (var j = 0; j < 9; j++) {
                var controlNode = cc.instantiate(this.control_pos_prefab);
                controlNode.parent = this.node;
                controlNode.indexX = j;
                controlNode.indexY = i;
                controlNode.position = {
                    x: j * 50 + (9 - 1) * -0.5 * 50,
                    y: i * 50 + (10 - 1) * -0.5 * 50
                };
                controlNode.getComponent("control_pos").initWithPos(j, i);
                this.controlPointList.push(controlNode);
            }
        }

        this.initChess();

        _global2.default.event.on("touch_pos", function (data) {
            if (!!_this.chessNode) {
                // this.chessNode
            }

            for (var _i = 0; _i < _this.chessNodeList.length; _i++) {
                var chess = _this.chessNodeList[_i];
                var chessJS = chess.getComponent("chess");
                if (chessJS.x === data.x && chessJS.y === data.y) {
                    var name = chess.getComponent("chess").getChessName();
                    console.log(" 找到了棋子" + name);
                    _global2.default.event.fire("choose_chess", chess);
                    _this.chessNode = chess;
                }
            }
        });
    },

    initChess: function initChess() {
        var _this2 = this;

        cc.loader.loadRes("./config/chess_board_config", function (err, result) {
            console.log("result = " + JSON.stringify(result));
            for (var i = 0; i < 2; i++) {
                for (var j in result) {
                    var chessConfig = result[j];
                    var pos = chessConfig.pos;
                    var x = pos.x;
                    var y = pos.y;
                    if (i === 1) {
                        y = 9 - pos.y;
                    }
                    var index = y * 9 + x;
                    console.log("index= " + index);
                    var node = _this2.controlPointList[index];
                    var chessNode = cc.instantiate(_this2.chess_prefab);
                    chessNode.parent = _this2.node;
                    chessNode.getComponent("chess").initWithData({
                        chess_name: chessConfig.chess_name,
                        chess_color: _defines2.default.chessColor[i],
                        index_pos: {
                            x: x,
                            y: y
                        }
                    });

                    _this2.chessNodeList.push(chessNode);
                    chessNode.position = node.position;
                }
            }
        });
    }

});

cc._RF.pop();
},{"./defines":"defines","./global":"global"}],"global":[function(require,module,exports){
"use strict";
cc._RF.push(module, '7b226Y4nIlLlr6JIEcv4AVH', 'global');
// Script/global.js

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _event_listener = require('./tools/event_listener');

var _event_listener2 = _interopRequireDefault(_event_listener);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var global = {}; /**
                  * Created by chu on 2017/9/11 0011.
                  */

global.event = (0, _event_listener2.default)({});
exports.default = global;
module.exports = exports['default'];

cc._RF.pop();
},{"./tools/event_listener":"event_listener"}]},{},["defines","game_controller","global","chess","control_pos","event_listener"]);

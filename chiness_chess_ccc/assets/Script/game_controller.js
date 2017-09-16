import defines from './defines'
import global from './global'
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
    onLoad: function () {

        this.chessNodeList = [];
        this.controlPointList = [];
        for (let i = 0 ; i < 10 ; i ++){
            for (let j = 0 ; j < 9 ; j ++){
                var controlNode = cc.instantiate(this.control_pos_prefab);
                controlNode.parent = this.node;
                controlNode.indexX = j;
                controlNode.indexY = i;
                controlNode.position = {
                    x: j * 50 + (9 - 1) * - 0.5 * 50,
                    y: i * 50 + (10 - 1) * - 0.5 * 50
                };
                controlNode.getComponent("control_pos").initWithPos(j, i);
                this.controlPointList.push(controlNode);
            }
        }

        this.initChess();




        global.event.on("touch_pos", (data)=>{



            var chooseChess = undefined;
            for (let i = 0 ; i < this.chessNodeList.length ; i ++){
                let chess =  this.chessNodeList[i];
                let chessJS = chess.getComponent("chess");
                if (chessJS.x === data.x && chessJS.y === data.y){
                    var name = chess.getComponent("chess").getChessName();
                    console.log(" 找到了棋子" + name);
                    // global.event.fire("choose_chess", chess);
                    chooseChess = chess;
                }
            }


            if (this.chessNode !== undefined && chooseChess === undefined){
                // this.chessNode
                let chessJs = this.chessNode.getComponent("chess");
                chessJs.nextStep(data, this.chessNodeList, (value)=>{
                    console.log("value = " + value);
                    if (value === true){
                        let index = data.y * 9 + data.x;
                        let position = this.controlPointList[index];
                        this.chessNode.position = position;
                        chessJs.setXY(data.x, data.y);
                        this.chessNode = undefined;
                        global.event.fire("move_over", data);
                    }

                });


            }
            if (this.chessNode === undefined && chooseChess !== undefined){
                this.chessNode = chooseChess;
                global.event.fire("choose_chess", chooseChess);
            }
            if (this.chessNode !== undefined && chooseChess !== undefined){
                let chessColor1 = this.chessNode.getComponent("chess").getChessColor();
                let chessColor2 = chooseChess.getComponent("chess").getChessColor();
                if (chessColor1 === chessColor2){
                    this.chessNode = chooseChess;
                    global.event.fire("choose_chess", chooseChess);
                }else {
                    this.chessNode.getComponent("chess").isCanKill(data, this.chessNodeList, (value)=>{
                        if (value){
                            let index = data.y * 9 + data.x;
                            let position = this.controlPointList[index];
                            this.chessNode.position = position;
                            this.chessNode.getComponent("chess").setXY(data.x, data.y);
                            this.chessNode = undefined;
                            global.event.fire("move_over", data);
                        }

                    });
                }
            }

        });
    },

    initChess: function () {
        cc.loader.loadRes("./config/chess_board_config",  (err, result)=> {
           console.log("result = " + JSON.stringify(result));
            for (var i = 0 ; i < 2 ; i ++){
               for (var j in result){
                   var chessConfig = result[j];
                   let pos = chessConfig.pos;
                   let x = pos.x;
                   let y = pos.y;
                   if (i === 1 ){
                       y = 9 - pos.y;
                   }
                   var index = y * 9 + x;
                   console.log("index= " + index);
                   var node = this.controlPointList[index];
                   var chessNode = cc.instantiate(this.chess_prefab);
                   chessNode.parent = this.node;
                   console.log("chess config = " + JSON.stringify(chessConfig));
                   chessNode.getComponent("chess").initWithData({
                       image_name: chessConfig.image_name,
                       chess_name: chessConfig.chess_name,
                       chess_color: defines.chessColor[i],
                       index_pos: {
                           x: x,
                           y: y
                       }
                   });

                   this.chessNodeList.push(chessNode);
                   chessNode.position = node.position;


               }
            }
        });

    }

});

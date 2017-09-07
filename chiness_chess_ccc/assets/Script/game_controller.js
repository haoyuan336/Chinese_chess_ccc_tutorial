import defines from './defines'
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
                }
                this.controlPointList.push(controlNode);
            }
        }

        this.initChess();



        // for (var j = 0 ; j < defines.chessColor.length ; j ++){
        //     for (var i = 0 ; i < defines.chessList.length ; i ++){
        //         let chess = cc.instantiate(this.chess_prefab);
        //         chess.parent = this.node;
        //         chess.getComponent("chess").initWithData({"chess_name": defines.chessList[i],"chess_color": defines.chessColor[j]});
        //         chess.position = {
        //             x: 50 * i,
        //             y: 50 * j
        //         }
        //     }
        // }

    },

    initChess: function () {
        cc.loader.loadRes("./config/chess_board_config",  (err, result)=> {
           console.log("result = " + JSON.stringify(result));
            for (var i = 0 ; i < 2 ; i ++){
               for (var j in result){
                   var chessConfig = result[j];
                   var chessNode = cc.instantiate(this.chess_prefab);
                   chessNode.parent = this.node;
                   chessNode.getComponent("chess").initWithData({chess_name: chessConfig.chess_name,
                       chess_color: defines.chessColor[i]});
                   let pos = chessConfig.pos;
                   let indexY =   pos.y * 9;
                   if (i === 1 ){
                       indexY  = (9 - pos.y ) * 9;


                       console.log('index y = ' + indexY);
                   }
                   chessNode.position = this.controlPointList[indexY + pos.x];
               }
            }
        });

    }

});

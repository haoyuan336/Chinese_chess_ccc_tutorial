import defines from './../defines'
import global from './../global'
cc.Class({
    extends: cc.Component,

    properties: {
    },

    // use this for initialization
    onLoad: function () {




        // chessSprite.spriteFrame = this.chess_sprite_frame;
        // chessSprite.spriteFrame.setRect(cc.Rect(0,0,100, 100));


    },
    initWithData: function (data) {

        this.x = data.index_pos.x;
        this.y = data.index_pos.y;

        console.log('data = ' + JSON.stringify(data));
        cc.loader.loadRes("./chinesechess_corner", cc.SpriteFrame, (err, spriteFrame)=>{
            // console.log("error = " + err);
            const chessColorList = defines.chessColor;
            console.log("chess color liet = " + JSON.stringify(chessColorList));
            var chessName = data.chess_name;
            var chessColor = data.chess_color;
            console.log("chess color = " + chessColor);
            var imageName = data.image_name;
            this.chessName = chessName;
            this.chessColor = chessColor;
            var indexX = defines.chessMap[imageName];
            console.log("chess map = " + JSON.stringify(defines.chessMap));
            console.log("image name = " + imageName);
            console.log("index x = " + indexX);
            var indexY = 0;
            for (let j = 0 ; j < chessColorList.length ; j ++){
                if (chessColor === chessColorList[j]){
                    indexY = j;
                }
            }

            console.log("index x= " + indexX);
            console.log("index y = " + indexY);
            var sp = spriteFrame;
            this.node.addComponent(cc.Sprite).spriteFrame = sp.clone();
            this.node.scale = {
                x: 50 / 350,
                y: 50 / 250
            };
            this.node.getComponent(cc.Sprite).spriteFrame.setRect(cc.rect( 50 * indexX,50 * indexY,50,50));
            if (indexY === 1){
                this.node.rotation = 180;
            }
        });

    },
    getChessName: function () {
        return this.chessName;
    },
    getChessColor: function () {

        // console.log("chess color = " + this.chessColor);
        return this.chessColor;
    },
    nextStep: function (data, beKillChess) {
        console.log("next step = " + JSON.stringify(data));
        cc.loader.loadRes("./config/chess_board_config",  (err, result)=> {
            if (this.isCanNextStep(result[this.chessName], data)){
                if (beKillChess){
                    global.event.fire("move_to_next_pos",this.node, data, beKillChess);
                }
                global.event.fire("move_to_next_pos", this.node, data);
            }
            // this.isCanNextStep(result[this.chessName], data);
        });
    },
    isCanNextStep: function (config, data) {
        console.log('config = ' + JSON.stringify(config));
        var rule = config.rule;
        if (rule.hasOwnProperty("speed")){
            let speedList = rule["speed"];
            let rect = rule["limit"];
            for (let i = 0 ; i < speedList.length ; i ++){
                let speed = speedList[i];
                let x = this.x + speed.x;
                let y = this.y + speed.y;

                // console.log("x y = " + x + ',' + y);
                // console.log('rect =  ' + JSON.stringify(rect));


                if (x === data.x && y === data.y){
                    console.log(" 可以走这一步");
                    if (x < rect.x || y < rect.y || x > (rect.x + rect.width) || y > (rect.y + rect.height)){
                        console.log("超出界限了");
                        return false;
                    }
                    return true;
                }
            }
        }


    },
    setXY: function (x, y) {
        this.x = x;
        this.y = y;
    }

});

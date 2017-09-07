import defines from './../defines'
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


        console.log('data = ' + JSON.stringify(data));
        cc.loader.loadRes("./chinesechess_corner", cc.SpriteFrame, (err, spriteFrame)=>{
            // console.log("error = " + err);
            const chessNameList = defines.chessList;
            const chessColorList = defines.chessColor;
            console.log("chess color liet = " + JSON.stringify(chessColorList));
            var chessName = data.chess_name;
            var chessColor = data.chess_color;
            var indexX = 0;
            for (let i = 0 ; i < chessNameList.length ; i ++){
                if (chessName === chessNameList[i]){
                    indexX = i;
                }
            }
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

    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

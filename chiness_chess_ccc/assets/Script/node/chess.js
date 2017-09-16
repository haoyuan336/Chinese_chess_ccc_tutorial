import defines from './../defines'
import global from './../global'
cc.Class({
    extends: cc.Component,

    properties: {
    },

    // use this for initialization
    onLoad: function () {
    },
    initWithData: function (data) {

        this.x = data.index_pos.x;
        this.y = data.index_pos.y;

        console.log('data = ' + JSON.stringify(data));
        cc.loader.loadRes("./chinesechess_corner", cc.SpriteFrame, (err, spriteFrame)=>{
            // console.log("error = " + err);
            const chessColorList = defines.chessColor;
            var chessName = data.chess_name;
            var chessColor = data.chess_color;
            var imageName = data.image_name;
            this.chessName = chessName;
            this.chessType = imageName;
            this.chessColor = chessColor;
            var indexX = defines.chessMap[imageName];
            var indexY = 0;
            for (let j = 0 ; j < chessColorList.length ; j ++){
                if (chessColor === chessColorList[j]){
                    indexY = j;
                }
            }
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
    nextStep: function (data, chessNodeList, cb) {
        cc.loader.loadRes("./config/chess_rule_config",  (err, result)=> {
            if (this.isCanNextStep(result[this.chessType], data)){
                // if (cb){
                //     cb(true);
                // }
                if (this.checkSpeicalLimit(data, chessNodeList)){

                }
            }
        });
    },

    isCanKill: function (data, chessNodeList, cb) {

    },



    isCanNextStep: function (config, data) {
        console.log('config = ' + JSON.stringify(config));
        if (this.checkSpeed(config, data)){
            return true;
        }
        if (this.checkSpeedDis(config, data)){
            return true;
        }
        if (this.checkRequire(config, data)){
            return true;
        }
    },
    checkSpeed: function (config, data) {
        if (config.hasOwnProperty("speed")){
            let speedList = config["speed"];
            for (let i = 0 ; i < speedList.length ; i ++){
                let speed = speedList[i];
                let x = this.x + speed.x;
                let y = this.y + speed.y;
                if (x === data.x && y === data.y){
                    if (config.hasOwnProperty("limit")){
                        let limitMap = config["limit"];
                        let limit = limitMap[this.chessColor];

                        console.log("limit = " + JSON.stringify(limit));
                        console.log("x = " + x);
                        console.log("y = " + y);
                        if (x >= limit.xmin && x <= limit.xmax && y >= limit.ymin && y <= limit.ymax){

                        }else {
                            console.log("超出了界限");
                            return false;
                        }

                    }
                    console.log(" 可以走这一步");
                    return true;
                }
            }
        }
    },
    checkSpeedDis: function (config, data) {
        if (config.hasOwnProperty("speeddis")){
            var speedDisList = config['speeddis'];
            for (let i = 0 ; i < speedDisList.length ; i ++){
                let speedDis = speedDisList[i];
                for (let j = 0; j < speedDis.x.length ; j ++){
                    let disX = speedDis.x[j];
                    for (let h = 0 ; h < speedDis.y.length ; h ++){
                        let disY = speedDis.y[h];
                        let x = this.x + disX;
                        let y = this.y + disY;
                        if (x === data.x && y === data.y){
                            console.log("可以走这一步");

                            return true;
                        }
                    }
                }
            }
        }
    },
    checkRequire: function (config, data) {
        //有限制的走法 兵
        if (config.hasOwnProperty("speedLimit")){
            var speedLimitConfig = config["speedLimit"];
            let speedLimitList = speedLimitConfig[this.chessColor];
            for (let i = 0 ; i < speedLimitList.length; i ++){
                let speedLimit = speedLimitList[i];
                let require = speedLimit.require;



                console.log("require = " + JSON.stringify(require));

                if (this.y >= require.ymin && this.y <= require.ymax){
                    let speedList = speedLimit.speedlist;
                    for (let j = 0 ; j < speedList.length ; j ++){
                        let speed = speedList[j];
                        console.log("this.x = " + this.x);
                        console.log("this.y = " + this.y);
                        let x = this.x + speed.x;
                        let y = this.y + speed.y;
                        console.log("speed = " + JSON.stringify(speed));
                        console.log("x = " + x);
                        console.log("y = " + y);
                        console.log("data = " + JSON.stringify(data));
                        if (x === data.x && y === data.y){
                            console.log("可以走这一步");
                            return true;
                        }
                    }

                }

            }

        }
    },
    checkSpeicalLimit: function () {

    },
    setXY: function (x, y) {
        this.x = x;
        this.y = y;
    }

});

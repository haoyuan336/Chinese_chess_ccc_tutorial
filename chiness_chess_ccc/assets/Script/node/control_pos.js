import global from './../global'
cc.Class({
    extends: cc.Component,

    properties: {
        sprite_frame: {
            default: null,
            type: cc.SpriteFrame
        }
    },

    // use this for initialization
    onLoad: function () {
        let sprite =  this.node.addComponent(cc.Sprite);
        sprite.spriteFrame = this.sprite_frame.clone();
        sprite.spriteFrame.setRect(cc.rect(0,2 * 50,50,50));
        this.node.scale = {
            x: 50 / 350,
            y: 50 / 250
        };
        this.node.opacity = 0;


        this.node.on(cc.Node.EventType.TOUCH_START, (event)=>{
            console.log("touch start");
        });
        this.node.on(cc.Node.EventType.TOUCH_END, (event)=>{
            console.log("touch end");
            global.event.fire("touch_pos", {
                x: this.x,
                y: this.y
            })
        });

        global.event.on("choose_chess", this.chooseChess.bind(this));
        global.event.on("move_to_next_pos", ()=>{
            this.node.opacity = 0;
        });
    },
    chooseChess: function (target) {
        this.node.opacity = 0;
        let chessJS = target.getComponent("chess");
        if (this.x === chessJS.x && this.y === chessJS.y){
            this.node.opacity = 255;
        }
    },
    initWithPos: function (x, y) {
        this.x = x;
        this.y = y;
    }
});

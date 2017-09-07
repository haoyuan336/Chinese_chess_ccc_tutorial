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
        }
    },

});

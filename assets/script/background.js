// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    update(dt) {

    
         if (this.node.y > 1500) {
             this.node.y = 1500;
         }
         else if (this.node.y < -1500) {
             this.node.y = -1500;
         }

         if (this.node.y <= 1109 && this.node.y >= -1500) {
             if (this.node.x > 275) {
                 this.node.x = 275;
             }
             else if (this.node.x < -285) {
                 this.node.x = -285;
             }
         }
         
         if (this.node.y > 1109 && this.node.y <= 1500) {
             if (this.node.x > 400) {
                 this.node.x = 400;
             }
             if (this.node.x < -411) {
                 this.node.x = -411;
             }

             if (this.node.x <= -285 && this.node.x >= -411) {
                 if (this.node.y < 1109) {
                     this.node.y = 1109;
                 }
             }
             if (this.node.x >= 275 && this.node.x <= 400) {
                 if (this.node.y < 1109) {
                     this.node.y = 1109;
                 }
             }
         }
    },
});

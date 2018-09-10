// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
var JoystickInfo = require('JoystickBG1');
var tempAngle1;
cc.Class({
    extends: cc.Component,

    properties: {
        joystickInfo: {

            default: null,
            type: JoystickInfo,
            displayName: 'move from',
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = false;
        cc.director.getCollisionManager().enabledDrawBoundingBox = false;
        this.touchingNumber = 0;
        tempAngle1 = this.joystickInfo.publicAngle;
    },

    onCollisionEnter: function (other) {
        if (
            (this.joystickInfo.publicAngle >= 90 && this.joystickInfo.publicAngle <= 180)
            || (this.joystickInfo.publicAngle <= -90 && this.joystickInfo.publicAngle >= -180)
        ) {
            this.joystickInfo.flagx = 0;//left
        }

    },

    onCollisionStay: function (other) {
    if ((this.joystickInfo.publicAngle <= 90 && this.joystickInfo.publicAngle >= 0)
                || (this.joystickInfo.publicAngle <= 0 && this.joystickInfo.publicAngle >= -90)) this.joystickInfo.flagx = 1;
        
    },

    onCollisionExit: function () {
        this.touchingNumber--;
        this.joystickInfo.flagx = 1;
        this.joystickInfo.flagy = 1;
    },

    start() {

    },

    // update (dt) {},
});

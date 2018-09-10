var JoystickInfo = require('JoystickBG1');
var tempAngle1;
var Ani = require('animationNotFirst');
cc.Class({
    extends: cc.Component,

    properties: {
        joystickInfo: {

            default: null,
            type: JoystickInfo,
            displayName: 'move from',
        },

        ani: {

            default: null,
            type: Ani,
            displayName: 'hero node',
        },

        unlockAudio:
        {
            default:null,
            url:cc.AudioClip,
        }

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = false;
        cc.director.getCollisionManager().enabledDrawBoundingBox = false;
        this.touchingNumber = 0;
    },

    onCollisionEnter: function (other) {
        var myAnimation = this.getComponent(cc.Animation);
        if (this.ani._keyflag == 0) {
            if (
                (this.joystickInfo.publicAngle >= 0 && this.joystickInfo.publicAngle <= 180)
            ) 
            {
                this.joystickInfo.flagy = 0;//left
            }
        }
        else if (this.ani._keyflag == 1) 
        {
            myAnimation.play('Unlock');
            cc.audioEngine.play(this.unlockAudio,false);
            setTimeout(() => {
                this.node.destroy();
            }, 1000);
            
        }
    },

    onCollisionStay: function (other) {
        if (this.joystickInfo.publicAngle <= 0 && this.joystickInfo.publicAngle >= -180) this.joystickInfo.flagy = 1;

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
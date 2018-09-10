// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
var JoystickBG = require('JoystickBG1');

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
        characterToCal: {
            default: null,
            type: cc.Node,
            displayName: '主角', //use to calculate the distance
        },
        medalAudio:{
            default:null,
            url:cc.AudioClip,
        },

        _characterWorldPos: 0,
        _spineWorldPos: 0,
        _stopMove : 0,
        _correspondY: 0,
        _time1 : 0,
        _time2 : 0,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {
        this._time1 = (new Date()).valueOf();
        this._time2 = this._time1;
        this._characterWorldPos = 0;
        this._spineWorldPos = 0;
        this._stopMove = 0;
        this._correspondY = 0;
        cc.log("Successfully load");
    },


    start() {

    },

    update(dt) {
        var myAnimation = this.getComponent(cc.Animation);
        this._characterWorldPos = this.characterToCal.convertToWorldSpaceAR(this.characterToCal.getPosition());
        this._spineWorldPos = this.node.convertToWorldSpaceAR(this.characterToCal.getPosition());


        if (Math.abs(this._characterWorldPos.y - this._spineWorldPos.y) < 40 || this._correspondY == 1)
        {
             if(this._correspondY == 0 )
             {
                 this._time1 = (new Date()).valueOf();
             }
            this._correspondY = 1;
            this._time2 = (new Date()).valueOf();
            if (this._time2 - this._time1 >= 500 && this._stopMove == 0) {
                cc.audioEngine.play(this.medalAudio,false);
                myAnimation.play('spine');
                this._stopMove = 1;
            }
        }
        else
        {
            this._correspondY = 0;
        }
        
    },
});

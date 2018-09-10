// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
var JoystickInfo1 = require('JoystickBG1');
var JoystickInfo2 = require('JoystickBG2');

cc.Class({
    extends: cc.Component,

    properties: {
        joystickInfo1: {

            default: null,
            type: JoystickInfo1,
            displayName: '移动信息来源',
        },
        joystickInfo2: {

            default: null,
            type: JoystickInfo2,
            displayName: '方向信息来源',
        },
        finalLight:{
            default:null,
            type:cc.Node,
            displayName:'灯光',
        },
        blackShade:{
            default:null,
            type:cc.Node,
            displayName:'黑幕',
        },
        guide3:
        {
            default:null,
            type:cc.Node,
            displayName:'guide3',
        },
        guide4:
        {
            default:null,
            type:cc.Node,
            displayName:'guide4',
        },
        turnHead:
        {
            default:null,
            url:cc.AudioClip,
        },
        walkingAudio:
        {
            default:null,
            url:cc.AudioClip,
        },
        torchSwitch:
        {
            default:null,
            url:cc.AudioClip,
        },
        _timeStart: 0,
        _timeLimit: 0,
        _havePlayed: 0,
        _tempAngle1: 1,
        _tempAngle2: 1,
        ifDead: 0,
        _ifPlayedMusic1:0,
        _ifPlayedMusic2:0,
        _ifPlayedMusic3:0,
        _ifPlayedMusic4:0,
        _ifPlayedMusic5:0,

    },


    onLoad: function () {
        // this._tempAngle1 = this.joystickInfo.publicAngle;
        // this._tempAngle2 = this.joystickInfo.publicAngle;
        // if (this._tempAngle1 <= -45 && this._tempAngle1 >= -135) {
        //     this._tempAngle1 = 1;
        // }
        // else {
        //     this._tempAngle1 = 0;
        // }
        this._tempAngle1 = 1;
        this._tempAngle2 = this._tempAngle1;

        this._timeStart = (new Date()).valueOf();
        this._timeLimit = this._timeStart + 6000;
        this._havePlayed = 0;
        this.blackShade.opacity = 0;
        this.finalLight.opacity = 0;
        this.guide3.opacity = 0;
        this.guide4.opacity = 0;
        this.ifDead = 0;
        this._ifPlayedMusic1 = 0;
        this._ifPlayedMusic2 = 0;
        this._ifPlayedMusic3 = 0;
        this._ifPlayedMusic4 = 0;
        this._ifPlayedMusic5 = 0;
    },

    update: function (dt) {
        var myAnimation = this.getComponent(cc.Animation);
        this._timeStart = (new Date()).valueOf();

        if ((this._timeStart < this._timeLimit - 3900) && this._havePlayed == 0) {
            myAnimation.play('TestBack');
            myAnimation.playAdditive('FirstIn');
            cc.audioEngine.play(this.walkingAudio,false);
            this._havePlayed = 1;

        }
        else if ((this._timeStart > this._timeLimit - 3900) && (this._timeStart < this._timeLimit - 2800)) {
            this.blackShade.opacity = 200;
            myAnimation.stop();

        }
        else if((this._timeStart > this._timeLimit - 2800) && (this._timeStart < this._timeLimit - 2550))
        {
            if(this._ifPlayedMusic1 == 0)
            {
                cc.audioEngine.play(this.turnHead,false);
                this._ifPlayedMusic1 = 1;
            }
            myAnimation.play('TestLeft');
        }
        else if((this._timeStart > this._timeLimit - 2550) && (this._timeStart < this._timeLimit - 2300))
        {
            if(this._ifPlayedMusic2 == 0)
            {
                cc.audioEngine.play(this.turnHead,false);
                this._ifPlayedMusic2 = 1;
            }
            myAnimation.play('TestRight');
        }
        else if((this._timeStart > this._timeLimit - 2300) && (this._timeStart < this._timeLimit - 2050))
        {
            if(this._ifPlayedMusic3 == 0)
            {
                cc.audioEngine.play(this.turnHead,false);
                this._ifPlayedMusic3 = 1;
            }
            myAnimation.play('TestLeft');
        }
        else if((this._timeStart > this._timeLimit - 2050) && (this._timeStart < this._timeLimit - 1600))
        {
            if(this._ifPlayedMusic4 == 0)
            {
                cc.audioEngine.play(this.turnHead,false);
                this._ifPlayedMusic4 = 1;
            }
            myAnimation.play('TestRight');
        }
        else if((this._timeStart > this._timeLimit - 1600) && (this._timeStart < this._timeLimit - 300))
        {
            myAnimation.play('TestBack');
        }
        else if((this._timeStart > this._timeLimit - 300) && (this._timeStart < this._timeLimit ))
        {
            if(this._ifPlayedMusic5 == 0)
            {
                cc.audioEngine.play(this.torchSwitch, false);
                this.blackShade.opacity = 0;
                this.finalLight.opacity = 200;
                this._ifPlayedMusic5 = 1;
            }
        }
        else if (this._timeStart > this._timeLimit && this._timeStart < this._timeLimit + 5000)
        {
            myAnimation.stop();
            this.guide3.opacity = 255;
            this.guide4.opacity = 255;
        }
        else if (this._timeStart > this._timeLimit + 5000 && this.ifDead == 0) {
            if(this.guide3.opacity == 255)
            {
                this.guide3.opacity = 0;
                this.guide4.opacity = 0;
            }
            if (this.joystickInfo1._ifMove == 0) {

                if (this.joystickInfo2.publicAngle <= -45 && this.joystickInfo2.publicAngle >= -135) {
                    this._tempAngle1 = 1;//back
                }
                else if (
                    (this.joystickInfo2.publicAngle <= -135 && this.joystickInfo2.publicAngle >= -180)
                    || (this.joystickInfo2.publicAngle <= 180 && this.joystickInfo2.publicAngle >= 135)
                ) {
                    this._tempAngle1 = 2;//right
                }
                else if (this.joystickInfo2.publicAngle <= 135 && this.joystickInfo2.publicAngle >= 45) {
                    this._tempAngle1 = 3;//front
                }
                else if (
                    (this.joystickInfo2.publicAngle >= 0 && this.joystickInfo2.publicAngle <= 45)
                    || (this.joystickInfo2.publicAngle <= 0 && this.joystickInfo2.publicAngle >= -45)
                ) {
                    this._tempAngle1 = 4;//left
                }

                switch (this._tempAngle1) {
                    case 1:
                        myAnimation.play('TestBack');
                        cc.log("turnBackOK");
                        break;
                    case 2:
                        myAnimation.play('TestRight');
                        cc.log("turnRightOK");
                        break;
                    case 3:
                        myAnimation.play('TestFront');
                        cc.log("turnFrontOK");
                        break;
                    case 4:
                        myAnimation.play('TestLeft');
                        cc.log("turnLeftOK");
                        break;
                    default:
                        break;
                }
                
            }
            else if (this.joystickInfo1._ifMove == 1) {

                if (this.joystickInfo2.publicAngle <= -45 && this.joystickInfo2.publicAngle >= -135) {
                    this._tempAngle1 = 1;//back
                }
                else if (
                    (this.joystickInfo2.publicAngle <= -135 && this.joystickInfo2.publicAngle >= -180)
                    || (this.joystickInfo2.publicAngle <= 180 && this.joystickInfo2.publicAngle >= 135)
                ) {
                    this._tempAngle1 = 2;//right
                }
                else if (this.joystickInfo2.publicAngle <= 135 && this.joystickInfo2.publicAngle >= 45) {
                    this._tempAngle1 = 3;//front
                }
                else if (
                    (this.joystickInfo2.publicAngle >= 0 && this.joystickInfo2.publicAngle <= 45)
                    || (this.joystickInfo2.publicAngle <= 0 && this.joystickInfo2.publicAngle >= -45)
                ) {
                    this._tempAngle1 = 4;//left
                }


                if (this._tempAngle1 === this._tempAngle2) {

                    // console.log('No turn and ok');//use to debug
                }
                else {
                    switch (this._tempAngle1) {
                        case 1:
                            myAnimation.play('TestBack');
                            this._tempAngle2 = this._tempAngle1;
                            //console.log("turnBackOK");
                            break;
                        case 2:
                            myAnimation.play('TestRight');
                            this._tempAngle2 = this._tempAngle1;
                            // console.log("turnRightOK");
                            break;
                        case 3:
                            myAnimation.play('TestFront');
                            this._tempAngle2 = this._tempAngle1;
                            // console.log("turnFrontOK");
                            break;
                        case 4:
                            myAnimation.play('TestLeft');
                            this._tempAngle2 = this._tempAngle1;
                            // console.log("turnLeftOK");
                            break;
                        default:
                            break;
                    }

                }

            }
        }
        else
        {
            ;
        }


    }



});

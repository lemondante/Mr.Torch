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
var Character1 = require('animation');


var time1 = (new Date()).valueOf();
var time2 = time1;
var tempAngle1;
var tempAngle2;

//about the ghost node




var characterWorldPos;
var ghostWorldPos;
var angleAboutGhostAndCharacter;
var distanceBetweenGhostAndCharacter;
var chaseModeOff = 1;
//about running after


cc.Class({
    extends: cc.Component,

    properties: {
        _faceAngle: {
            default: null,
            displayName: '当前面朝方向角度',
        },
       
        // scriptOfJoystickOne: {
        //     default: null,
        //     type: JoystickBG,
        //     displayName: '摇杆1维持相对位置',
        // },
        //当幽灵挂载在背景下时不需要这个节点
        characterToCal: {
            default: null,
            type: cc.Node,
            displayName: '主角',//use to calculate the distance

        },
        dieAudio:
        {
            default:null,
            url:cc.AudioClip,
        },
        ghostFindYou:
        {
            default:null,
            url:cc.AudioClip,
        },
        _ifAudioPlayed: 0,
        speedGhost: 1,          //速度
        speedUpGhost: 4,
        ifGhostMove: 0,
        _ifDead: 0,
    },



    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {
        this.ifGhostMove = 0;
        this._ifDead = 0;

        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = false;
        cc.director.getCollisionManager().enabledDrawBoundingBox = false;
        this.touchingNumber = 0;

        var myAnimation = this.getComponent(cc.Animation);
       
        myAnimation.play('GhostFront');
        time1 = (new Date()).valueOf();
        time2 = time1;
        this._faceAngle = (Math.random() * 360) - 180;
        tempAngle1 = this._faceAngle;
        tempAngle2 = this._faceAngle;
        if (tempAngle1 <= -45 && tempAngle1 >= -135) {
            tempAngle1 = 1;
        }
        else {
            tempAngle1 = 0;
        }
        tempAngle2 = tempAngle1;
    },

    onCollisionEnter: function (other) {
        this.touchingNumber++;

        var myAnimation = this.getComponent(cc.Animation);
        this.ifGhostMove = 0;
        time2 = time1;
        myAnimation.play('Dizzyghostfront');

    },

    onCollisionStay: function (other) {
        console.log('on collision stay');
    },

    onCollisionExit: function () {
        this.touchingNumber--;

        if (this.touchingNumber === 0) {
            this.node.color = cc.Color.WHITE;
        }
        var myAnimation = this.getComponent(cc.Animation);
        myAnimation.play('GhostFront');
        this.ifGhostMove = 1;
    },

    start() {

    },
    //全方向移动
    _allDirectionsMove: function () {
        if (this.ifGhostMove) {
            this.node.x -= Math.cos(this._faceAngle * (Math.PI / 180)) * this.speedGhost;
            this.node.y -= Math.sin(this._faceAngle * (Math.PI / 180)) * this.speedGhost;
        }
    },

    _allDirectionsChasing: function () {
        if (this.ifGhostMove) {
            this.node.x -= Math.cos(this._faceAngle * (Math.PI / 180)) * this.speedUpGhost;
            this.node.y -= Math.sin(this._faceAngle * (Math.PI / 180)) * this.speedUpGhost;
        }
    },
    

    
    update: function (dt) {
        var characterAnimation = this.characterToCal.getComponent(cc.Animation);
        var characterOneScript = this.characterToCal.getComponent(Character1);
        cc.log(this.ifGhostMove);

        characterWorldPos = this.characterToCal.convertToWorldSpaceAR(this.characterToCal.getPosition());
        ghostWorldPos = this.node.convertToWorldSpaceAR(this.characterToCal.getPosition());
        angleAboutGhostAndCharacter = Math.atan2(ghostWorldPos.y - characterWorldPos.y, ghostWorldPos.x - characterWorldPos.x) * (180 / Math.PI);
        distanceBetweenGhostAndCharacter =
            Math.sqrt((ghostWorldPos.x - characterWorldPos.x) * (ghostWorldPos.x - characterWorldPos.x)
                + (ghostWorldPos.y - characterWorldPos.y) * (ghostWorldPos.y - characterWorldPos.y));
        
                if (distanceBetweenGhostAndCharacter < 40 && this._ifDead == 0) 
                {
                    characterAnimation.play('TestDeath');
                    characterOneScript.ifDead = 1;
                    this._ifDead = 1;
                    cc.audioEngine.play(this.dieAudio,false);
                    
                    setTimeout(() => {
                        cc.director.loadScene('GameLose');
                    }, 1500); 
                }
          
        if (distanceBetweenGhostAndCharacter <= 400) {
            chaseModeOff = 0;
            if (this._ifAudioPlayed == 0)
            {
                cc.audioEngine.play(this.ghostFindYou,false);
                this._ifAudioPlayed = 1;
            }
            
        }
        else
        {
            chaseModeOff = 1;
            this._ifAudioPlayed = 0;
        }

        if (this.ifGhostMove) {
            time1 = (new Date()).valueOf();

            if (chaseModeOff)
            {
                if (time1 - time2 >= 1000) {
                    this._faceAngle = Math.random() * 360 - 180;
                    time2 = time1;
                }
              
                this._allDirectionsMove();
                //random wandering code above
    
                var myAnimation = this.getComponent(cc.Animation);
                //animation code
    
                if (this._faceAngle <= -45 && this._faceAngle >= -135) {
                    tempAngle1 = 1;//back
                }
                else if (
                    (this._faceAngle <= -135 && this._faceAngle >= -180)
                    || (this._faceAngle <= 180 && this._faceAngle >= 135)
                ) {
                    tempAngle1 = 2;//right
                }
                else if (this._faceAngle <= 135 && this._faceAngle >= 45) {
                    tempAngle1 = 3;//front
                }
                else if (
                    (this._faceAngle >= 0 && this._faceAngle <= 45)
                    || (this._faceAngle <= 0 && this._faceAngle >= -45)
                ) {
                    tempAngle1 = 4;//left
                }
    
    
                if (tempAngle1 === tempAngle2) {
    
                    // console.log('No turn and ok');//use to debug
                }
                else {
                    switch (tempAngle1) {
                        case 1:
                            myAnimation.play('GhostBack');
                            tempAngle2 = tempAngle1;
                            // console.log("ghostTurnBackOK");
                            break;
                        case 2:
                            myAnimation.play('GhostRight');
                            tempAngle2 = tempAngle1;
                            //console.log("ghostTurnRightOK");
                            break;
                        case 3:
                            myAnimation.play('GhostFront');
                            tempAngle2 = tempAngle1;
                            // console.log("GhostTurnFrontOK");
                            break;
                        case 4:
                            myAnimation.play('GhostLeft');
                            tempAngle2 = tempAngle1;
                            //  console.log("ghostTurnLeftOK");
                            break;
                        default:
                            break;
                    }
                }
            
            }
            else
            {
                //chasing code
                this._faceAngle = angleAboutGhostAndCharacter;
                this._allDirectionsChasing();
    
                var myAnimation = this.getComponent(cc.Animation);
                //animation code
    
                if (this._faceAngle <= -45 && this._faceAngle >= -135) {
                    tempAngle1 = 1;//back
                }
                else if (
                    (this._faceAngle <= -135 && this._faceAngle >= -180)
                    || (this._faceAngle <= 180 && this._faceAngle >= 135)
                ) {
                    tempAngle1 = 2;//right
                }
                else if (this._faceAngle <= 135 && this._faceAngle >= 45) {
                    tempAngle1 = 3;//front
                }
                else if (
                    (this._faceAngle >= 0 && this._faceAngle <= 45)
                    || (this._faceAngle <= 0 && this._faceAngle >= -45)
                ) {
                    tempAngle1 = 4;//left
                }
    
    
                if (tempAngle1 === tempAngle2) {
    
                    // console.log('No turn and ok');//use to debug
                }
                else {
                    switch (tempAngle1) {
                        case 1:
                            myAnimation.play('GhostBack');
                            tempAngle2 = tempAngle1;
                            // console.log("ghostTurnBackOK");
                            break;
                        case 2:
                            myAnimation.play('GhostRight');
                            tempAngle2 = tempAngle1;
                            //console.log("ghostTurnRightOK");
                            break;
                        case 3:
                            myAnimation.play('GhostFront');
                            tempAngle2 = tempAngle1;
                            // console.log("GhostTurnFrontOK");
                            break;
                        case 4:
                            myAnimation.play('GhostLeft');
                            tempAngle2 = tempAngle1;
                            //  console.log("ghostTurnLeftOK");
                            break;
                        default:
                            break;
                    }
                }
            
            }
        }
        else {
            ;
        }

    },
});

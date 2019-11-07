/**
 * 消息结构体
 * [data:3@1572244594719@0,49.9.35.60.53.65.18.24.59.39.38.45.19.36.8.22.44@1,17@2,17@&
 * 
 * [command:4] [data:4@0,@34@4191@100000.0@0@&
 *
 * [command:5] [data:5@0,4197,逍遥の人,100000.0,0,idle,,0,,,,,,,@@@&]
   [command:5] [data:5@1,1571971039314,慧质兰心,20000.0,1,idle,http://scmj01.dl.hoolaigames.com/headIcon/boy/2920.png,0,10117562,,天津和平,,,,@@@&
 */ 


 /**
  * 
  */

  
/** 
 /**小王*/
 //public static const p65:int=65;
 /**大王*/
 //public static const p66:int=66;
 
 /**方片 1 -- 13*/
 /*
 public static const p1:int=1;  1
 public static const p2:int=2;  2
 public static const p3:int=3;  3
 public static const p4:int=4;  4
 public static const p5:int=5;  5
 public static const p6:int=6;  6
 public static const p7:int=7;  7
 public static const p8:int=8;  8
 public static const p9:int=9;  9
 public static const p10:int=10;10
 public static const p11:int=11;J
 public static const p12:int=12;Q
 public static const p13:int=13;K
 */
 /**红桃 1 -- 13*/
 /*
 public static const p17:int=17;1
 public static const p18:int=18;2
 public static const p19:int=19;3
 public static const p20:int=20;4
 public static const p21:int=21;5
 public static const p22:int=22;6
 public static const p23:int=23;7
 public static const p24:int=24;8
 public static const p25:int=25;9
 public static const p26:int=26;10
 public static const p27:int=27;J
 public static const p28:int=28;Q
 public static const p29:int=29;K
 */
 /**黑桃 1 -- 13*/
 /*
 public static const p33:int=33;1
 public static const p34:int=34;2
 public static const p35:int=35;3
 public static const p36:int=36;4
 public static const p37:int=37;5
 public static const p38:int=38;6
 public static const p39:int=39;7
 public static const p40:int=40;8
 public static const p41:int=41;9
 public static const p42:int=42;10
 public static const p43:int=43;J
 public static const p44:int=44;Q
 public static const p45:int=45;K
 */
 /**梅花 1 -- 13*/
 /*
 public static const p49:int=49;1
 public static const p50:int=50;2
 public static const p51:int=51;3
 public static const p52:int=52;4
 public static const p53:int=53;5
 public static const p54:int=54;6
 public static const p55:int=55;7
 public static const p56:int=56;8
 public static const p57:int=57;9
 public static const p58:int=58;10
 public static const p59:int=59;J
 public static const p60:int=60;Q
 public static const p61:int=61;K
 */

/**

import gamePaiTouchEvent from "./gamePaiTouchEvent";
import gameDdzPlayerCardControl from "./gameDdzPlayerCardControl";
import playerCardViewD from "./playerCardViewD";
import gamePaiItem from "./gamePaiItem";

/**
 * 滑动选中牌
 */

/**

const {ccclass, property} = cc._decorator;

@ccclass
export default class gameCardAreaControl extends cc.Component {

    private _touchBegan:any
    private _touchMoved:any

    onLoad () {
        cc.log('打印滑动选牌')
        //this.onTouchEvent()
    }

    start () {
    }

    onTouchEvent () {
        cc.log('添加滑动选牌监听')
        this.node.on(cc.Node.EventType.TOUCH_START, this.touchBegan, this);
        //this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.touchCancel, this);
        //this.node.on(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.touchMoved, this);
    }

    offTouchEvent() {
        this.node.off(cc.Node.EventType.TOUCH_START, this.touchBegan, this);
        this.node.off(cc.Node.EventType.TOUCH_CANCEL, this.touchCancel, this);
        this.node.off(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
        this.node.off(cc.Node.EventType.TOUCH_MOVE, this.touchMoved, this);
    }

    /**
        /**
     * 开始点击  TOUCH_START回调函数
     * */
    /**
    touchBegan (event) {
        cc.log("Touch begin");
        var touches = event.getTouches();
        var touchLoc = touches[0].getLocation();
        //cc.log("touch begin location: "+touchLoc);
        this._touchBegan = this.node.convertToNodeSpaceAR(touchLoc);
        let cardArr = gameDdzPlayerCardControl.Instance.view.d_player_sp.getComponent(playerCardViewD).getShouPaiNode()//shouPai //this.node.children
        this._getCardForTouch( this._touchBegan, cardArr);
    }
*/

    /**
     * 移动  TOUCH_MOVE回调函数
     * */
    /**
    touchMoved (event){
        cc.log("Touch move");
        var touches = event.getTouches();
        var touchLoc = touches[0].getLocation();
        this._touchMoved = this.node.convertToNodeSpaceAR(touchLoc);
        let cardArr = gameDdzPlayerCardControl.Instance.view.d_player_sp.getComponent(playerCardViewD).getShouPaiNode()//shouPai //this.node.children
        this._getCardForTouch(this._touchMoved, cardArr);
        //this._checkSelectCardReserve(this._touchBegan, this._touchMoved);
    }


    touchCancel(){

    }

    /**
     * 点击结束  TOUCH_END回调函数
     * */
    /**
    touchEnd(event) {
        cc.log("Touch end");
        var touches = event.getTouches();
        var touchLoc = touches[0].getLocation();
        let cardArr = gameDdzPlayerCardControl.Instance.view.d_player_sp.getComponent(playerCardViewD).getShouPaiNode() //this.node.children
        for (var k in cardArr) {
            cc.log('打印节点', k, cardArr[k].active)
            let t_sc = cardArr[k].getComponent(gamePaiTouchEvent)

            // t_sc.isSelect = !t_sc.isSelect
            // t_sc.setIsSelect(t_sc.isSelect)
            
            // if (t_sc.isSelect == true) {
            //     if (t_sc.isMoveUp == true) {
            //         cc.log('xxxxxxxx')
            //         t_sc.setIsSelect(false)
            //     }else{
            //         cc.log('yyyyyyyy')
            //         t_sc.setIsSelect(true)
            //     }
            // }

            //cardArr[k].y = posx + 30
            //cardArr[k].getComponent("Card").setMaskShowing(false);
            // if (cardArr[k].isChiose === true) {
            //     this.game.cardArr[k].isChiose = false;
            //     // to 2
            //     if (this.game.cardArr[k].status === SITDOWN) {
            //         this.game.cardArr[k].status = STANDUP;
            //         this.game.cardArr[k].y += 19;
            //     } else {
            //         this.game.cardArr[k].status = SITDOWN;
            //         this.game.cardArr[k].y -= 19;
            //     }
            // }
        }
    }


         /**
     * Touch begin
     * 当前触摸的点 是否在牌的区域
     * */
    /**
    _getCardForTouch (touch, cardArr) {
        cc.log('_getCardForTouch')
        cardArr.reverse();      //to 1
        for (var k in cardArr) {
            var box = cardArr[k].getBoundingBox();   //获取card覆盖坐标范围
            //cc.log('打印覆盖', touch, box)
            let isin = box.contains(touch) //box.rectContainsPoint(touch)

            if (isin == true) {      //判断触摸的点，是否在当前牌的范围内
                
                let pai_sc = cardArr[k].getComponent(gamePaiItem)
                let mian = pai_sc.getPaiMian()
                //cc.log('判断是否在框里面', isin,k, mian)
                let t_sc = cardArr[k].getComponent(gamePaiTouchEvent)
                t_sc.isSelect = !t_sc.isSelect
                t_sc.setIsSelect(t_sc.isSelect)
                //cardArr[k].getComponent("Card").setMaskShowing(true);  //显示阴影遮罩
                //cc.log("CCC touch select: "+k);
                cardArr.reverse();
                return cardArr[k];
            }
        }
        cardArr.reverse();
    }

        /**
     * Touch move
     *
     * */
    /**
    _checkSelectCardReserve(touchBegan, touchMoved) {
        cc.log('_checkSelectCardReserve')
        //获取左边的点 为起始点
        var p1 = touchBegan.x < touchMoved.x ? touchBegan : touchMoved;
        //滑动的宽度
        var width = Math.abs(touchBegan.x - touchMoved.x);
        //滑动的高度 最小设置为5
        var height = Math.abs(touchBegan.y - touchMoved.y) > 5 ? Math.abs(touchBegan.y - touchMoved.y) : 5;
        //根据滑动 获取矩形框
        var rect = cc.rect(p1.x, p1.y, width, height);

        let cardArr = gameDdzPlayerCardControl.Instance.view.d_player_sp.getComponent(playerCardViewD).getShouPaiNode() //shouPai //this.node.children

        for (let i = 0; i < cardArr.length; i++) {
            //判断矩形是否相交
            let box = cardArr[i].getBoundingBox()
            let isin = box.intersects(rect)
            if (isin == false) {
                //不相交 设置为反选状态
                let t_sc = cardArr[i].getComponent(gamePaiTouchEvent)
                t_sc.isSelect = false

            }
        }

        //如果是从右向左滑动
        if (p1 === touchMoved) {
            for (let i = cardArr.length - 1; i >= 0; i--) {
                //从右往左滑时，滑到一定距离，又往右滑
                //这是要判断反选
                if (cardArr[i].x - p1.x < 24) {  //
                    let t_sc = cardArr[i].getComponent(gamePaiTouchEvent)
                    t_sc.isSelect = false
                }
            }
        }
    }


    
}
*/


// CardArea.js（绑定在handCardArea节点上）、

// var Main = require("Main");
// cc.Class({
//     extends: cc.Component,

//     properties: {
//         _touchBegan: null,
//         _touchMoved: null,

//         //用于调用Main场景上的脚本的方法，同时可以传递数据
//         game:{
//             default : null,
//             type: Main,
//         }
//     },

//  onTouchEvent: function () {
//         this.node.on(cc.Node.EventType.TOUCH_START, this.touchBegan, this);
//         this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.touchCancel, this);
//         this.node.on(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
//         this.node.on(cc.Node.EventType.TOUCH_MOVE, this.touchMoved, this);
//     },

//     offTouchEvent: function () {
//         this.node.off(cc.Node.EventType.TOUCH_START, this.touchBegan, this);
//         this.node.off(cc.Node.EventType.TOUCH_CANCEL, this.touchCancel, this);
//         this.node.off(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
//         this.node.off(cc.Node.EventType.TOUCH_MOVE, this.touchMoved, this);
//     },

//     onLoad () {
//         this.onTouchEvent();
//     },

//     onDestroy(){
//         this.offTouchEvent();
//     },
   
//      /**
//      * Touch begin
//      * 当前触摸的点 是否在牌的区域
//      * */
//     _getCardForTouch: function (touch, cardArr) {
//         cardArr.reverse();      //to 1
//         for (var k in cardArr) {
//             var box = cardArr[k].getBoundingBox();   //获取card覆盖坐标范围
//             if (cc.rectContainsPoint(box, touch)) {      //判断触摸的点，是否在当前牌的范围内
//                 cardArr[k].isChiose = true;
//                 cardArr[k].getComponent("Card").setMaskShowing(true);  //显示阴影遮罩
//                 cc.log("CCC touch select: "+k);

//                 cardArr.reverse();
//                 return cardArr[k];
//             }
//         }
//         cardArr.reverse();
//     },

//     /**
//      * Touch move
//      *
//      * */
//     _checkSelectCardReserve(touchBegan, touchMoved) {
//         //获取左边的点 为起始点
//         var p1 = touchBegan.x < touchMoved.x ? touchBegan : touchMoved;
//         //滑动的宽度
//         var width = Math.abs(touchBegan.x - touchMoved.x);
//         //滑动的高度 最小设置为5
//         var height = Math.abs(touchBegan.y - touchMoved.y) > 5 ? Math.abs(touchBegan.y - touchMoved.y) : 5;
//         //根据滑动 获取矩形框
//         var rect = cc.rect(p1.x, p1.y, width, height);

//         for (let i = 0; i < this.game.cardArr.length; i++) {
//             //判断矩形是否相交
//             if (!cc.rectIntersectsRect(this.game.cardArr[i].getBoundingBox(), rect)) {
//                 //不相交 设置为反选状态
//                 this.game.cardArr[i].isChiose = false;
//                 this.game.cardArr[i].getComponent("Card").setMaskShowing(false);
//             }
//         }

//         //如果是从右向左滑动
//         if (p1 === touchMoved) {
//             for (let i = this.game.cardArr.length - 1; i >= 0; i--) {
//                 //从右往左滑时，滑到一定距离，又往右滑
//                 //这是要判断反选
//                 if (this.game.cardArr[i].x - p1.x < 24) {  //
//                     this.game.cardArr[i].getComponent("Card").setMaskShowing(false);
//                     this.game.cardArr[i].isChiose = false;
//                 }
//             }
//         }

//     },

//     /**
//      * 开始点击  TOUCH_START回调函数
//      * */
//     touchBegan: function (event) {
//         cc.log("Touch begin");
//         var touches = event.getTouches();
//         var touchLoc = touches[0].getLocation();
//         cc.log("touch begin location: "+touchLoc);
//         this._touchBegan = this.node.convertToNodeSpace(touchLoc);
//         this._getCardForTouch( this._touchBegan, this.game.cardArr);
//     },

//     /**
//      * 移动  TOUCH_MOVE回调函数
//      * */
//     touchMoved: function (event) {
//         cc.log("Touch move");
//         var touches = event.getTouches();
//         var touchLoc = touches[0].getLocation();
//         this._touchMoved = this.node.convertToNodeSpace(touchLoc);
//         this._getCardForTouch(this._touchMoved, this.game.cardArr);
//         this._checkSelectCardReserve(this._touchBegan, this._touchMoved);
//     },

//     touchCancel: function () {

//     },

//     /**
//      * 点击结束  TOUCH_END回调函数
//      * */
//     touchEnd: function (event) {
//         cc.log("Touch end");
//         var touches = event.getTouches();
//         var touchLoc = touches[0].getLocation();
//         for (var k in this.game.cardArr) {
//             this.game.cardArr[k].getComponent("Card").setMaskShowing(false);
//             if (this.game.cardArr[k].isChiose === true) {
//                 this.game.cardArr[k].isChiose = false;
//                 // to 2
//                 if (this.game.cardArr[k].status === SITDOWN) {
//                     this.game.cardArr[k].status = STANDUP;
//                     this.game.cardArr[k].y += 19;
//                 } else {
//                     this.game.cardArr[k].status = SITDOWN;
//                     this.game.cardArr[k].y -= 19;
//                 }
//             }
//         }
//     },

/*
log：[10:03:12:271][WebSocketManage.ts->ReceiveMessage: ] msg: 返回消息处理  [command:9] [data:9@2;13;6,52,36,4@&
]
gameDdzPlayerCardControl.ts:129 打印剩余手牌数 9
LogHelp.ts:93 log：[10:03:12:272][WebSocketManage.ts->ReceiveMessage: ] msg: 返回消息处理  [command:20] [data:20@0@&
]
playerCardViewD.ts:158 执行牌回位
LogHelp.ts:93 log：[10:03:17:549][WebSocketCore.ts->SendMessage: ] msg: key:game_socket_type_ddz，发送： 5@22,54,38,20,22,20,

*/
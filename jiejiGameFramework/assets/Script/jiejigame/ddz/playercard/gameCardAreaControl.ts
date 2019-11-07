import gamePaiTouchEvent from "./gamePaiTouchEvent";
import gameDdzPlayerCardControl from "./gameDdzPlayerCardControl";
import playerCardViewD from "./playerCardViewD";
import gamePaiItem from "./gamePaiItem";

/**
 * 滑动选中牌
 */



const {ccclass, property} = cc._decorator;

@ccclass
export default class gameCardAreaControl extends cc.Component {

    private _touchBegan:any
    private _touchMoved:any

    onLoad () {
        //this.onTouchEvent()
    }

    start () {
    }

    onTouchEvent () {
        this.node.on(cc.Node.EventType.TOUCH_START, this.touchBegan, this);
        //this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.touchCancel, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
        //this.node.on(cc.Node.EventType.TOUCH_MOVE, this.touchMoved, this);
    }

    offTouchEvent() {
        this.node.off(cc.Node.EventType.TOUCH_START, this.touchBegan, this);
        this.node.off(cc.Node.EventType.TOUCH_CANCEL, this.touchCancel, this);
        this.node.off(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
        this.node.off(cc.Node.EventType.TOUCH_MOVE, this.touchMoved, this);
    }

        /**
     * 开始点击  TOUCH_START回调函数
     * */
    touchBegan (event) {
        cc.log("Touch begin");
        var touches = event.getTouches();
        var touchLoc = touches[0].getLocation();
        //cc.log("touch begin location: "+touchLoc);
        this._touchBegan = this.node.convertToNodeSpaceAR(touchLoc);
        //let cardArr = gameDdzPlayerCardControl.Instance.view.d_player_sp.getComponent(playerCardViewD).getShouPaiNode()//shouPai //this.node.children
        //this._getCardForTouch( this._touchBegan, cardArr);
    }

    /**
     * 移动  TOUCH_MOVE回调函数
     * */
    touchMoved (event){
        //cc.log("Touch move");
        var touches = event.getTouches();
        var touchLoc = touches[0].getLocation();
        this._touchMoved = this.node.convertToNodeSpaceAR(touchLoc);
        //let cardArr = gameDdzPlayerCardControl.Instance.view.d_player_sp.getComponent(playerCardViewD).getShouPaiNode()//shouPai //this.node.children
        //this._getCardForTouch(this._touchMoved, cardArr);
        //this._checkSelectCardReserve(this._touchBegan, this._touchMoved);
    }

    /**取消 */
    touchCancel(){
        
    }

    /**
     * 点击结束  TOUCH_END回调函数
     * */
    touchEnd(event) {
        cc.log("Touch End");
        var touches = event.getTouches();
        var touchLoc = touches[0].getLocation();
        this._touchMoved = this.node.convertToNodeSpaceAR(touchLoc);
        this._checkSelectCardReserve(this._touchBegan, this._touchMoved);
    }


         /**
     * Touch begin
     * 当前触摸的点 是否在牌的区域
     * */
    _getCardForTouch (touch, cardArr) {
        //cc.log('_getCardForTouch')

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

        if (width < 60) { //滑动距离小于 60  默认是点击一张
            this._getCardForTouch( this._touchBegan, cardArr);
            return
        }

        for (let i = 0; i < cardArr.length; i++) {
            //判断矩形是否相交
            let box = cardArr[i].getBoundingBox()
            //box.x -= 50
            box.width = 66
            cc.log('打印卡片的覆盖',  box)
            let isin = box.intersects(rect)
            if (isin == true) {
                let t_sc = cardArr[i].getComponent(gamePaiTouchEvent)
                t_sc.isSelect = !t_sc.isSelect
                t_sc.setIsSelect(t_sc.isSelect)
            }
        }
    }
}
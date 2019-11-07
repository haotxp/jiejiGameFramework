import gameDdzDeskPaiDuiView from "./gameDdzDeskPaiDuiView"
import ScheduleMgr from "../../../utils/ScheduleMgr"
import gameDdzPlayerCardControl from "../playercard/gameDdzPlayerCardControl"


export default class gameDdzDeskPaiDuiControl {

    public static Instance:gameDdzDeskPaiDuiControl = null
    private view:gameDdzDeskPaiDuiView
    private paiIndex:number = 0

    private pos:Array<cc.Vec2> = [cc.v2(0,-500),cc.v2(500,0),cc.v2(-500,0),cc.v2(0,500)]

    constructor(v:gameDdzDeskPaiDuiView){
        this.view = v

        gameDdzDeskPaiDuiControl.Instance = this
    }

    /**
     * 发牌
     */
    playFaPai(){
        //cc.log('打印开始发牌')
        this.resetData()
        this.view.show()
        let _time = 0.06
        let paishu = this.view.paiAmount-1 
        ScheduleMgr.Instance.schedule(this.onUpdateTime, this.view, _time, paishu)
    }

    onUpdateTime(){
        let inst = gameDdzDeskPaiDuiControl.Instance
        let dir = 0
        if (inst.paiIndex == inst.view.paiAmount-1) {
            dir = 3
        }
        else{
            dir = inst.paiIndex%3
        }
        let _pos = inst.pos[dir]
        let move = cc.moveBy(0.3, _pos)
        let callback = function(_node:cc.Node){
            _node.stopAllActions()
            _node.active = false
            _node.position = cc.v2(0,0)
        }
        let seq = cc.sequence(move, cc.callFunc(callback))
        inst.view.paiArr[inst.paiIndex].runAction(seq)
        inst.paiIndex ++
    }

    /**重置数据 */
    resetData(){
        this.paiIndex = 0
    }

    /**show view*/
    show(){
        this.view.show()
    }

    /**hide view */
    hide(){
        this.view.hide()
    }
}

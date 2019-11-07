import { UIBase } from "../../../components/UIBase";
import gameDdzBottomControl from "./gameDdzBottomControl";


const {ccclass, property} = cc._decorator;

@ccclass
export default class gameDdzBottomView extends UIBase {
    private beishu:cc.Label = null
    public btn_duihua:cc.Node = null
    public duihuakuang:cc.Node = null
    public chatNode:Array<cc.Node>
    public jiantou:cc.Node = null
    private comp:gameDdzBottomControl = null

    Awake(){
        this.chatNode = []
        this.beishu = this.node.getChildByName('beishu').getChildByName('shu').getComponent(cc.Label)
        this.btn_duihua = this.node.getChildByName('btn_duihua')
        this.duihuakuang = this.node.getChildByName('duihuakuang')
        this.jiantou = this.node.getChildByName('jiantou')
        this.jiantou.angle = 180
        for (let index = 0; index < 6; index++) {
            let huaNode = this.duihuakuang.getChildByName('chat'+ index)
            this.chatNode.push(huaNode)
        }
        this.duihuakuang.active = false
        this.comp = new gameDdzBottomControl(this)
    }

    setBeiShu(shu:string|number){
        this.beishu.string = String(shu)
    }

    /**重置 */
    resetData(){
        this.beishu.string = '0'
    }

    /**show */
    show(){
        this.resetData()
        this.Show()
    }

    /**hide */
    hide(){
        this.Hide()
    }
}
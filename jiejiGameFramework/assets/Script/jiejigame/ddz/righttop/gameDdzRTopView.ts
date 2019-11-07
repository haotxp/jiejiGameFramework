import { UIBase } from "../../../components/UIBase";
import gameDdzRTopControl from "./gameDdzRTopControl";


const {ccclass, property} = cc._decorator;

@ccclass
export default class gameDdzRTopView extends UIBase {

    public tuoguan:cc.Node = null
    public yinxiao:cc.Toggle = null
    public btn_goBackHall:cc.Node = null
    private comp:gameDdzRTopControl = null
    Awake(){
        this.tuoguan = this.node.getChildByName('tuoguan')
        this.yinxiao = this.node.getChildByName('btn_yinxiao').getComponent(cc.Toggle)
        this.btn_goBackHall = this.node.getChildByName('btn_getback')
        this.comp = new gameDdzRTopControl(this)
        this.resetData()
    }

    /**重置 */
    resetData(){

    }

    /**show */
    show(){
        this.Show()
    }

    /**hide */
    hide(){
        this.Hide()
    }
}
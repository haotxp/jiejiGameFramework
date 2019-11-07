import { UIBase } from "../../../components/UIBase";
import gameDdzTuoGuanControl from "./gameDdzTuoGuanControl";


const {ccclass, property} = cc._decorator;

@ccclass
export default class gameDdzTuoGuanView extends UIBase {

    public untuoguan:cc.Node = null

    private comp:gameDdzTuoGuanControl = null
    Awake(){
        this.untuoguan = this.node.getChildByName('untuoguan')
        this.comp = new gameDdzTuoGuanControl(this)
        this.resetData()
    }

    /**重置 */
    resetData(){
        this.hide()
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
import { UIBase } from "../../../components/UIBase";
import gameDdzTopControl from "./gameDdzTopControl";


const {ccclass, property} = cc._decorator;

@ccclass
export default class gameDdzTopView extends UIBase {
    public anpai:cc.Node
    public mingpai:cc.Node
    private comp:gameDdzTopControl = null
    Awake(){
        this.anpai = this.node.getChildByName('dipai').getChildByName('anpai')
        this.mingpai = this.node.getChildByName('dipai').getChildByName('mingpai')
        this.comp = new gameDdzTopControl(this)
        this.resetData()
    }

    /**重置 */
    resetData(){
        this.anpai.active = false
        this.mingpai.active = false
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
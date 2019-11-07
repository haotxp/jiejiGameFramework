import { UIBase } from "../../../components/UIBase";
import gameDdzGameOverControl from "./gameDdzGameOverControl";


const {ccclass, property} = cc._decorator;

@ccclass
export default class gameDdzGameOverView extends UIBase {
    public contiue:cc.Node
    public mingpai:cc.Node
    public win:cc.Node
    public lose:cc.Node
    private comp:gameDdzGameOverControl = null
    Awake(){
        this.contiue = this.node.getChildByName('btn').getChildByName('mingpai')
        this.contiue.active = false
        this.contiue = this.node.getChildByName('btn').getChildByName('contiue')
        this.contiue.active = true
        this.win = this.node.getChildByName('win')
        this.lose = this.node.getChildByName('lose')

        this.hide()
        this.comp = new gameDdzGameOverControl(this)
    }

    /**重置 */
    resetData(){
        
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
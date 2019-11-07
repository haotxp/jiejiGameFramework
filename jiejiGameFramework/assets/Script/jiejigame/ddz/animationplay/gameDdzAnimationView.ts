import { UIBase } from "../../../components/UIBase";
import gameDdzAnimationControl from "./gameDdzAnimationControl";


const {ccclass, property} = cc._decorator;

@ccclass
export default class gameDdzAnimationView extends UIBase {
    public airplane:cc.Node
    public spring:cc.Node
    public zhadan:cc.Node
    public rocket:cc.Node

    private comp:gameDdzAnimationControl = null
    Awake(){
        this.airplane = this.node.getChildByName('airplane')
        this.spring = this.node.getChildByName('spring')
        this.zhadan = this.node.getChildByName('zhadan')
        this.rocket = this.node.getChildByName('rocket')
        this.comp = new gameDdzAnimationControl(this)
        this.show()
        this.resetData()
    }

    /**重置 */
    resetData(){
        this.airplane.active = false
        this.spring.active = false
        this.zhadan.active = false
        this.rocket.active = false
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
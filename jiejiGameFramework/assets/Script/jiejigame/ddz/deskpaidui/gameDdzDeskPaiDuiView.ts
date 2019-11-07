import { UIBase } from "../../../components/UIBase";
import gameDdzDeskPaiDuiControl from "./gameDdzDeskPaiDuiControl";

const {ccclass, property} = cc._decorator;

@ccclass
export default class gameDdzDeskPaiDuiView extends UIBase {

    public paiArr:Array<cc.Node> = []
    
    public paiAmount:number = 10 //动作效果牌数

    private comp:gameDdzDeskPaiDuiControl = null
    Awake(){
        this.paiArr = []
        let pai = this.node.getChildByName('pai')
        pai.removeFromParent()
        for (let index = 0; index < this.paiAmount; index++) {
            let zipai = cc.instantiate(pai)
            this.node.addChild(zipai)
            this.paiArr.push(zipai)
        }
        
        //cc.log('打印牌组', this.paiArr)
        this.hide()
        this.comp = new gameDdzDeskPaiDuiControl(this)
    }

    resetPaiDui(){
        for (let index = 0; index < this.paiArr.length; index++) {
            const element = this.paiArr[index];
            element.active = true
            element.position = cc.v2(0,0)
        }
    }

    /**重置 */
    resetData(){
        this.resetPaiDui()
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
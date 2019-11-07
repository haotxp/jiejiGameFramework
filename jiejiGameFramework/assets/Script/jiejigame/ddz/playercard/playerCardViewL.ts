import gamePaiItem from "./gamePaiItem";
import gameDdzPlayerCardControl from "./gameDdzPlayerCardControl";
import { DdzPlayerDirType } from "../../../Define/Define";
import gameDdzPlayerInfoControl from "../playerinfo/gameDdzPlayerInfoControl";

const {ccclass, property} = cc._decorator;

@ccclass
export default class playerCardViewL extends cc.Component {
    private shouPai:cc.Node
    private outPai:Array<cc.Node>

    awake(){
        this.outPai = []
        this.shouPai = this.node.getChildByName('shoupai')
        for (let index = 0; index < 20; index++) {
            let pai = this.node.getChildByName('outpai_0').getChildByName('pai_' + index)
            pai.active = false
            pai.addComponent(gamePaiItem)
            this.outPai.push(pai)
        }
    }

    setShouPaiShu(num:number){
        this.shouPai.active = true
        let shu = this.shouPai.getChildByName('shu').getComponent(cc.Label)
        shu.string = String(num)
    }

    /**重置出牌 */
    resetOutPai(){
        for (let index = 0; index < this.outPai.length; index++) {
            const element = this.outPai[index];
            element.active = false
            element.removeAllChildren()
        }
    }

    /**显示出牌 */
    showOutPai(index:number, mian:string,length:number){
        //this.resetOutPai()
        this.outPai[index].active = true
        let sc = this.outPai[index].getComponent(gamePaiItem)
        sc.shePaiMian(mian)

        if (gameDdzPlayerInfoControl.Instance.dizhuDir == DdzPlayerDirType.LEFT) {
            this.outPai[index].removeAllChildren()
            if (index == (length-1)) {
                this.setDiZhuBiaoQian(index)
            }
        }

        let dir = DdzPlayerDirType.LEFT
        gameDdzPlayerCardControl.Instance.playermodel[dir].setSpAmount(-1)
        let shu = gameDdzPlayerCardControl.Instance.playermodel[dir].getSpAmount()
        this.setShouPaiShu(shu)
    }

     /**设置出牌的地主标签 */
     setDiZhuBiaoQian(index:number){
        //cc.log('打印添加地主标记')
        cc.loader.loadRes('desk/dizhu', cc.SpriteFrame, function(err,assect){
            let node = new cc.Node()
            let sp = node.addComponent(cc.Sprite)
            sp.spriteFrame = assect
            node.position = cc.v2(53,79)
            this.outPai[index].addChild(node)
        }.bind(this))
    }

    resetData(){
        this.shouPai.active = false
        let shu = this.shouPai.getChildByName('shu').getComponent(cc.Label)
        shu.string = '0'
    }
}

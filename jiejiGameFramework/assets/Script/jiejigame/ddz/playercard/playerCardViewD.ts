import gamePaiItem from "./gamePaiItem";
import gamePaiTouchEvent from "./gamePaiTouchEvent";
import gameDdzPlayerInfoControl from "../playerinfo/gameDdzPlayerInfoControl";
import { PlayerDirectionType, ShengYu } from "../../../Define/Define";
import { ElementOfTiShiUtil } from "../util/ElementOfTiShiUtil";
import gameDdzPlayerCardControl from "./gameDdzPlayerCardControl";
import { GameAudioMgr } from "../../../manager/GameAudioMgr";
import UserMgr from "../../../manager/UserMgr";

const {ccclass, property} = cc._decorator;

@ccclass
export default class playerCardViewD extends cc.Component {

    public shouPai:Array<cc.Node>
    public shouPai_bei:Array<cc.Node>
    private outPai:Array<cc.Node>

    //53,79
    private s_dz_biao:cc.Node
    private c_dz_biao:cc.Node

    awake(){
        this.shouPai = []
        this.shouPai_bei = []
        this.outPai = []
        //this.shouPai = this.node.getChildByName('shoupai')
        for (let index = 0; index < 20; index++) {
            let pai = this.node.getChildByName('shoupai').getChildByName('pai_' + index)
            pai.active = false
            pai.addComponent(gamePaiItem)
            pai.addComponent(gamePaiTouchEvent) 
            this.shouPai.push(pai)

            let pai_bei = this.node.getChildByName('shoupai_bei').getChildByName('pai_' + index)
            pai_bei.active = false
            this.shouPai_bei.push(pai_bei)
        }
        for (let index = 0; index < 20; index++) {
            let pai = this.node.getChildByName('outpai_0').getChildByName('pai_' + index)
            pai.active = false
            pai.addComponent(gamePaiItem)
            this.outPai.push(pai)
        }
    }

    setShouPaiShu(){
        
    }

    resetData(){
        for (let index = 0; index < this.shouPai.length; index++) {
            const element = this.shouPai[index];
            element.active = false

            const element_bei = this.shouPai_bei[index]
            element_bei.active = false
        }
    }

    /**
     * 显示手牌
     * @param index 
     * @param mian 
     */
    showPai(index:number, mian:string){
        //cc.log('显示手牌')
        this.shouPai[index].active = true
        let sc = this.shouPai[index].getComponent(gamePaiItem)
        sc.shePaiMian(mian)

        this.shouPai_bei[index].active = true
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
    showOutPai(index:number, mian:string, length:number){
        this.outPai[index].active = true
        let sc = this.outPai[index].getComponent(gamePaiItem)
        sc.shePaiMian(mian)
        if (gameDdzPlayerInfoControl.Instance.dizhuDir == PlayerDirectionType.DOWN) {
            this.outPai[index].removeAllChildren()
            if (index == (length-1)) {
                this.setDiZhuBiaoQian(index)
            }
        }
        for (let index = 0; index < this.shouPai.length; index++) {
            const element = this.shouPai[index];
            let s_sc = element.getComponent(gamePaiItem)
            let t_sc = element.getComponent(gamePaiTouchEvent)
            if (mian == s_sc.getPaiMian()) {
                element.active = false
                t_sc.setIsSelect(false)

                const element_bei = this.shouPai_bei[index]
                element_bei.active = false
            }
        }
        gameDdzPlayerCardControl.Instance.playermodel[PlayerDirectionType.DOWN].setSpAmount(-1)
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

    /**获取选中的手牌 */
    getSelectShouPai(){
        /**选中的牌号*/
        let xuhao = ''
        let xuhaoarr:Array<string> = []
        for (let index = 0; index < this.shouPai.length; index++) {
            const element = this.shouPai[index];
            let tsc = element.getComponent(gamePaiTouchEvent)
            let msc = element.getComponent(gamePaiItem)
            let isselect = tsc.getIsSelect()
            if (isselect == true) {
                let index = xuhaoarr.indexOf(msc.getPaiMian())
                cc.log('判断是否重复的牌', index, xuhao, msc.getPaiMian())
                if (index == null || index == -1) {
                    xuhao = xuhao + msc.getPaiMian() + ','
                    xuhaoarr.push(msc.getPaiMian())
                } 
            }
        }
        cc.log('打印选中的牌=', xuhao)

        return xuhao
    }

    /**设置提示牌 */
    setTiShiPai(tishi:ElementOfTiShiUtil){
        let cards = tishi.cards
        this.resetTiShiPai()
        for (let index = 0; index < cards.length; index++) {
            const cardno = cards[index];
            for (let inde = 0; inde < this.shouPai.length; inde++) {
                const cardnode = this.shouPai[inde];
                let p_cardsc = cardnode.getComponent(gamePaiItem)
                let t_cardsc = cardnode.getComponent(gamePaiTouchEvent)
                let cardmian = p_cardsc.getPaiMian()
                if (Number(cardno) == Number(cardmian)) {
                    t_cardsc.setIsSelect(true)
                }
            }
        }
    }

    /**牌回位 */
    resetTiShiPai(){
        cc.log('执行牌回位')
        for (let inde = 0; inde < this.shouPai.length; inde++) {
            const cardnode = this.shouPai[inde];
            let t_cardsc = cardnode.getComponent(gamePaiTouchEvent)
            if (t_cardsc.isSelect == true) {
                t_cardsc.setIsSelect(false)
            }
        }
    }

    /**
     * 获取显示的手牌节点
     */
    getShouPaiNode(){
        let arr:Array<cc.Node> = []
        for (let index = 0; index < this.shouPai.length; index++) {
            const element = this.shouPai[index];
            if (element.active == true) {
                arr.push(element)
            }
        }
        return arr
    }
}

import gameDdzPlayerCardView from "./gameDdzPlayerCardView"
import gameDdzPlayerModel from "../model/gameDdzPlayerModel"
import ScheduleMgr from "../../../utils/ScheduleMgr"
import playerCardViewD from "./playerCardViewD"
import { DdzPlayerDirType, Define, CardType, PlayerDirectionType, ShengYu } from "../../../Define/Define"
import playerCardViewL from "./playerCardViewL"
import playerCardViewR from "./playerCardViewR"
import gameCardAreaControl from "./gameCardAreaControl"
import gameDdzOperationControl from "../operation/gameDdzOperationControl"
import UserMgr from "../../../manager/UserMgr"
import { GameAudioMgr } from "../../../manager/GameAudioMgr"
import gameDdzAnimationControl from "../animationplay/gameDdzAnimationControl"


export default class gameDdzPlayerCardControl {

    public static Instance:gameDdzPlayerCardControl = null
    public view:gameDdzPlayerCardView
    public playermodel:Array<gameDdzPlayerModel>
    private paiIndex = 0
    public outPaiData:string = null

    constructor(v:gameDdzPlayerCardView){
        this.view = v
        this.playermodel = []
        gameDdzPlayerCardControl.Instance = this
    }

    /**添加手牌数据 */
    addPlayerCardData(data:string[]){
        for (let index = 0; index < data.length; index++) {
            let _data = data[index];
            let pai = _data.split(',')
            let dir = Number(pai[0])
            let model = new gameDdzPlayerModel(dir)
            switch(dir){
                case DdzPlayerDirType.DOWN:
                    model.setSprr(pai[1])
                break
                case DdzPlayerDirType.RIGHT:
                    model.setSpAmount(Number(pai[1]))
                break
                case DdzPlayerDirType.LEFT:
                    model.setSpAmount(Number(pai[1]))
                break
            }
            this.playermodel[dir] = model
        }
        this.resetData()
        let shoupaishu = 17
        this.show()
        ScheduleMgr.Instance.schedule(this.showShouPai.bind(this), this.view, 0.03, (shoupaishu-1))
    }

    /**展示手牌 */
    showShouPai(){
        //cc.log('打印展示手牌', this.paiIndex)
        let d_sprr = this.playermodel[0].getSprr()
        let d_sc = this.view.d_player_sp.getComponent(playerCardViewD)
        d_sc.showPai(this.paiIndex, d_sprr[this.paiIndex])

        let l_sc = this.view.l_player_sp.getComponent(playerCardViewL)
        l_sc.setShouPaiShu(this.paiIndex+1)
        
        let r_sc = this.view.r_player_sp.getComponent(playerCardViewR)
        r_sc.setShouPaiShu(this.paiIndex+1)
        
        if (this.paiIndex >= 16) {
            ScheduleMgr.Instance.unschedule(this.showShouPai,this.view)
        }
        this.paiIndex ++
    }

    /**
     * 展示出牌
     * @param data 2;2;59,43   
     */
    showOutPai(data:string){
        this.outPaiData = data
        let realSmg = data.split(';')
        if (realSmg.length > 0) {
            let dir:number = Number(realSmg[0]) 
            
            let paiData = realSmg[2].split(',')

            let d_sc = this.view.d_player_sp.getComponent(playerCardViewD)
            d_sc.resetOutPai()
            let l_sc = this.view.l_player_sp.getComponent(playerCardViewL)
            l_sc.resetOutPai()
            let r_sc = this.view.r_player_sp.getComponent(playerCardViewR)
            r_sc.resetOutPai()
            
            switch(dir){
                case DdzPlayerDirType.DOWN:
                    for (let index = 0; index < paiData.length; index++) {
                        const element = paiData[index];
                        d_sc.showOutPai(index, element, paiData.length)
                        this.playermodel[DdzPlayerDirType.DOWN].popSprr(element)
                    }
                break
                case DdzPlayerDirType.RIGHT:
                    for (let index = 0; index < paiData.length; index++) {
                        const element = paiData[index];
                        r_sc.showOutPai(index, element,paiData.length)
                    }
                break
                case DdzPlayerDirType.LEFT:
                    for (let index = 0; index < paiData.length; index++) {
                        const element = paiData[index];
                        l_sc.showOutPai(index, element,paiData.length)
                    }
                break
            }


            gameDdzOperationControl.Instance.recordPlayerPass[dir] = true

            /**播放音效 */
            let player = UserMgr.Instance.getPlayer(dir)
            let cardType = Number(realSmg[1]) //牌型
            let sounName = Define.getSoundName(Number(cardType), Number(paiData[0]), player.sex)
            GameAudioMgr.Instance.PlaySound(sounName)
            let sounNameEx = Define.getSoundNameEx(cardType)
            if (sounNameEx != '') {
                GameAudioMgr.Instance.PlaySound(sounNameEx)
            }

            let shu = gameDdzPlayerCardControl.Instance.playermodel[dir].getSpAmount()
            cc.log('打印剩余手牌数', shu)
            let sex = player.sex
            let __strPath = ''
            if (sex == 0) {
                __strPath = "girl/" 
            } else {
                __strPath = "boy/" 
            }
            if (shu == 2) {
                GameAudioMgr.Instance.PlaySound(__strPath + ShengYu.pai2)
            }
            else if (shu == 1) {
                GameAudioMgr.Instance.PlaySound(__strPath + ShengYu.pai1)
            }
            

            /**播放动画 */
            switch(cardType){
                case CardType.feijiBudai:
                case CardType.feijiDaiEr:
                case CardType.feijiDaiYi:
                    gameDdzAnimationControl.Instance.showAirPlane()
                break
                case CardType.zhadan:
                    gameDdzAnimationControl.Instance.showZhaDan()
                break
                case CardType.wangzha:
                    gameDdzAnimationControl.Instance.showRocket()
                break
            }
        }
    }

    /**
     * 重置出牌
     */
    resetOutPai(){
        let d_sc = this.view.d_player_sp.getComponent(playerCardViewD)
        d_sc.resetOutPai()
        let l_sc = this.view.l_player_sp.getComponent(playerCardViewL)
        l_sc.resetOutPai()
        let r_sc = this.view.r_player_sp.getComponent(playerCardViewR)
        r_sc.resetOutPai()
    }

    /**游戏结束 展出未出完的牌*/
    gameOverShowShouPai(data:string){
        let realSmg = data.split(';')
        if (realSmg.length > 0) {
            for (let index = 0; index < realSmg.length; index++) {
                const element = realSmg[index];
                let _data = element.split('/')
                let dir = Number(_data[0]) 
                //cc.log('打印是否存在', _data[1])
                let d_sc = this.view.d_player_sp.getComponent(playerCardViewD)
                let l_sc = this.view.l_player_sp.getComponent(playerCardViewL)
                let r_sc = this.view.r_player_sp.getComponent(playerCardViewR)
                if (_data[1] == ''|| _data[1] == null) {
                    switch(dir){
                        case DdzPlayerDirType.RIGHT:
                            r_sc.resetData()
                        break
                        case DdzPlayerDirType.LEFT:
                            l_sc.resetData()
                        break
                    }
                }
                else{
                    let paiData = _data[1].split(',')
                    switch(dir){
                        case DdzPlayerDirType.DOWN:
                            for (let index = 0; index < paiData.length; index++) {
                                const element = paiData[index];
                                d_sc.showOutPai(index, element,paiData.length)
                            }
                        break
                        case DdzPlayerDirType.RIGHT:
                            for (let index = 0; index < paiData.length; index++) {
                                const element = paiData[index];
                                r_sc.showOutPai(index, element,paiData.length)
                                r_sc.resetData()
                            }
                        break
                        case DdzPlayerDirType.LEFT:
                            for (let index = 0; index < paiData.length; index++) {
                                const element = paiData[index];
                                l_sc.showOutPai(index, element,paiData.length)
                                l_sc.resetData()
                            }
                        break
                    }
                }
            }
        }

        /**游戏结束取消手牌的监听 */
        let sc = this.view.dsp_parent.getComponent(gameCardAreaControl)
        sc.offTouchEvent()
    }

    /**设置手牌数 */
    resetShouPaiShu(dir:number, shu:number){
        //1，2位置拿到地主后
        //cc.log('打印地主方位', dir)
        switch(dir){
            case DdzPlayerDirType.RIGHT:
                let r_sc = this.view.r_player_sp.getComponent(playerCardViewR)
                r_sc.setShouPaiShu(shu)
                break
            case DdzPlayerDirType.LEFT:
                let l_sc = this.view.l_player_sp.getComponent(playerCardViewL)
                l_sc.setShouPaiShu(shu)
                break
        }
    }

    /**重新刷新手牌  dir=0 */
    resetShouPai(){
        //拿到三张底牌后 重新排列
        let d_sprr = this.playermodel[0].getSprr()
        for (let index = 0; index < d_sprr.length; index++) {
            let d_sc = this.view.d_player_sp.getComponent(playerCardViewD)
            d_sc.showPai(index, d_sprr[index])
        }
    }

    /**重置 */
    resetData(){
        //cc.log('打印手牌重置')
        ScheduleMgr.Instance.unschedule(this.showShouPai,this.view)
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

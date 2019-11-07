import gameDdzTopView from "./gameDdzTopView"
import gameDdzPlayerCardControl from "../playercard/gameDdzPlayerCardControl"
import gameDdzPlayerInfoControl from "../playerinfo/gameDdzPlayerInfoControl"
import gameCardAreaControl from "../playercard/gameCardAreaControl"


export default class gameDdzTopControl {

    public static Instance:gameDdzTopControl = null
    private view:gameDdzTopView

    constructor(v:gameDdzTopView){
        this.view = v

        gameDdzTopControl.Instance = this
    }

    /**设置底牌 */
    setDiPai(data?:string){
        if (data) {
            this.view.mingpai.active = true
            this.view.anpai.active = false
            let realSmg = data.split(',')
            if (realSmg.length > 0) {
                let dir = Number(realSmg[0])
                for (let index = 0; index < 3; index++) {
                    let paimian = realSmg[index+1]
                    let pai:cc.Sprite = this.view.mingpai.getChildByName('pai_' + (index)).getComponent(cc.Sprite)
                    cc.loader.loadRes('pai/' + paimian, cc.SpriteFrame, function(err, asset){
                        if (err) {
                            cc.log('底牌加载资源错误')
                            return
                        }
                        pai.spriteFrame = asset
                    }.bind(this))

                    if (dir == 0) {
                        gameDdzPlayerCardControl.Instance.playermodel[dir].addSprr(paimian)
                    }
                    gameDdzPlayerCardControl.Instance.playermodel[dir].setSpAmount(1)
                    let paishu = gameDdzPlayerCardControl.Instance.playermodel[dir].getSpAmount()
                    //cc.log('打印牌数', paishu)
                    gameDdzPlayerCardControl.Instance.resetShouPaiShu(dir, paishu)       
                }
                if (dir == 0) {
                    gameDdzPlayerCardControl.Instance.resetShouPai()
                }
                gameDdzPlayerInfoControl.Instance.setPlayerDiZhuHead(dir)
            }

            /**发完底牌添加 手牌的监听方法 */
            // let sc = gameDdzPlayerCardControl.Instance.view.dsp_parent.getComponent(gameCardAreaControl)
            // sc.onTouchEvent()
            let sc = gameDdzPlayerCardControl.Instance.view.d_player_sp.getChildByName('shoupai_bei').getComponent(gameCardAreaControl)
            sc.onTouchEvent()

        }else{
            this.view.mingpai.active = false
            this.view.anpai.active = true
        }
    }

    resetData(){
        this.view.resetData()
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

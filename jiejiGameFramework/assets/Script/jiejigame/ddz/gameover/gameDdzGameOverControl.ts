import gameDdzGameOverView from "./gameDdzGameOverView"
import UserMgr from "../../../manager/UserMgr"
import gameDdzPlayerInfoControl from "../playerinfo/gameDdzPlayerInfoControl"
import gameDdzTopControl from "../top/gameDdzTopControl"
import gameDdzBottomControl from "../bottom/gameDdzBottomControl"
import GameDdzNetMgr from "../net/GameDdzNetMgr"
import { GameAudioMgr } from "../../../manager/GameAudioMgr"
import gameDdzAnimationControl from "../animationplay/gameDdzAnimationControl"


export default class gameDdzGameOverControl {

    public static Instance:gameDdzGameOverControl = null
    private view:gameDdzGameOverView

    constructor(v:gameDdzGameOverView){
        this.view = v
        this.view.contiue.on('click', this.contiueCallBack, this)
        gameDdzGameOverControl.Instance = this
    }

    contiueCallBack(){
        gameDdzTopControl.Instance.resetData()
        gameDdzPlayerInfoControl.Instance.resetHead()
        let data = 'wait'
        GameDdzNetMgr.Instance.updatePlayerState(data)
        this.hide()
    }

    //[data:12@0/;1/58,26,10;2/45,55,23,38,22@0,1;1,0;2,1@0,12000.0;1,-24000.0;2,12000.0@0,0,1,1@@&
    show(alldata:Array<string>){
        let data2 = alldata[2] //0,1;1,1;2,0
        let realSmg2 = data2.split(';')
        let zidata = realSmg2[0].split(',')
        let w_L = Number(zidata[1])
        let parentNode:cc.Node = null
        if (w_L == 1) {
            this.view.win.active = true
            this.view.lose.active = false
            parentNode = this.view.win
            GameAudioMgr.Instance.PlaySound('Win')
        }else{
            this.view.win.active = false
            this.view.lose.active = true
            parentNode = this.view.lose
        }

        let data3 = alldata[3]
        let realSmg = data3.split(';')
        if (realSmg.length > 0) {
            for (let index = 0; index < realSmg.length; index++) {
                const element = realSmg[index];
                let _data = element.split(',')
                let dir = Number(_data[0])
                let player = UserMgr.Instance.getPlayer(dir)
                let jin = Number(_data[1])
                player.haveMoney = player.haveMoney + jin
                gameDdzPlayerInfoControl.Instance.setPlayerMoneyZi(dir, player.haveMoney)

                let playerNode = parentNode.getChildByName('player' + dir)
                let namestr = playerNode.getChildByName('nicheng').getComponent(cc.Label)
                namestr.string = player.nickName
                let dizhu = playerNode.getChildByName('dizhu').getComponent(cc.Label)
                dizhu.string = '1000'
                
                let jinstr = playerNode.getChildByName('jinbi').getComponent(cc.Label)
                jinstr.string = String(jin) 

                if (dir == gameDdzPlayerInfoControl.Instance.dizhuDir) {
                    playerNode.getChildByName('dizhubiao').active = true
                    let beishu = playerNode.getChildByName('beishu').getComponent(cc.Label)
                    beishu.string = String(gameDdzBottomControl.Instance.beishu*2) 
                }else{
                    playerNode.getChildByName('dizhubiao').active = false
                    let beishu = playerNode.getChildByName('beishu').getComponent(cc.Label)
                    beishu.string = String(gameDdzBottomControl.Instance.beishu) 
                }
            }
        }

        /**判断春天 */
        let chuntiandata = alldata[4]
        let realSmg3 = chuntiandata.split(',')
        let chun = Number(realSmg3[0]) + Number(realSmg3[1])
        if (chun >= 1) {
            gameDdzAnimationControl.Instance.showSpring()
        }

        this.view.show()
    }

    getIsShow(){
        return this.view.node.active
    }

    /**hide view */
    hide(){
        this.view.hide()
    }
}

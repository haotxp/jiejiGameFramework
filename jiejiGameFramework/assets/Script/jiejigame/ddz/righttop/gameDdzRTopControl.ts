import gameDdzRTopView from "./gameDdzRTopView"
import GameDdzNetMgr from "../net/GameDdzNetMgr"
import UserMgr from "../../../manager/UserMgr"
import { GameAudioMgr } from "../../../manager/GameAudioMgr"
import AlertPanelManager from "../../../manager/AlertPanelManager"
import { Define } from "../../../Define/Define"

export default class gameDdzRTopControl {

    public static Instance:gameDdzRTopControl = null
    private view:gameDdzRTopView

    constructor(v:gameDdzRTopView){
        this.view = v
        this.view.tuoguan.on('click', this.tuoguanCallBack, this)
        this.view.yinxiao.node.on('click', this.yinxiaoCallBack, this)
        this.view.btn_goBackHall.on("click", this.onClickBackHallBtn, this)
        gameDdzRTopControl.Instance = this
    }

    tuoguanCallBack(){
        GameDdzNetMgr.Instance.tuoGuan('')
    }

    yinxiaoCallBack(){
        cc.log('音效开关')
        let kaiguan = this.view.yinxiao.isChecked
        if (kaiguan == true) {
            GameAudioMgr.Instance.pauseAll()
        }else{
            GameAudioMgr.Instance.resumeAll()
        }
    }

    private onClickBackHallBtn() {

        AlertPanelManager.Instance.show("是否退出游戏？", function () {
            cc.game.end()
            let json = {
              type: "gotoLobby",
              data: ""
            };

            Define.postMessageToLobby(JSON.stringify(json));
        }, function () {
            
        });

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

import gameDdzTuoGuanView from "./gameDdzTuoGuanView"
import GameDdzNetMgr from "../net/GameDdzNetMgr"


export default class gameDdzTuoGuanControl {

    public static Instance:gameDdzTuoGuanControl = null
    private view:gameDdzTuoGuanView

    constructor(v:gameDdzTuoGuanView){
        this.view = v
        this.view.untuoguan.on('click', this.untuoguanCallBack, this)

        gameDdzTuoGuanControl.Instance = this
    }

    untuoguanCallBack(){
        GameDdzNetMgr.Instance.unTuoGuan('')
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

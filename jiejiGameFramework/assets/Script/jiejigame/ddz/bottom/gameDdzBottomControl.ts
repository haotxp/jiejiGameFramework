import gameDdzBottomView from "./gameDdzBottomView"
import GameDdzNetMgr from "../net/GameDdzNetMgr"
import gameDdzPlayerInfoControl from "../playerinfo/gameDdzPlayerInfoControl"


export default class gameDdzBottomControl {

    public static Instance:gameDdzBottomControl = null
    private view:gameDdzBottomView
    public beishu:number = 0

    constructor(v:gameDdzBottomView){
        this.view = v
        this.beishu = 0
        this.view.btn_duihua.on('click', this.openDuiHuaCallBack, this)
        for (let index = 0; index < this.view.chatNode.length; index++) {
            const element = this.view.chatNode[index];
            element.on('click', this.huaCallBack, this)
        }
        gameDdzBottomControl.Instance = this
    }

    updataBeiShu(data:string){
        if (Number(data) > this.beishu) {
            this.beishu = Number(data)
        }
        this.view.setBeiShu(this.beishu)
    }

    openDuiHuaCallBack(){
        this.view.duihuakuang.active = !this.view.duihuakuang.active
        if (this.view.duihuakuang.active == true) {
            this.view.jiantou.angle = 0
        }
        else{
            this.view.jiantou.angle = 180
        }
    }

    hideDuiHuaKuang(){
        this.view.duihuakuang.active = false
    }

    huaCallBack(event){
        let nodeName = event.node.name
        //cc.log('打印节点名称', nodeName)
        if (gameDdzPlayerInfoControl.Instance.canTalk == false) {
            return
        }
        switch(nodeName){
            case 'chat0':
                GameDdzNetMgr.Instance.chat('0')
                    break
            case 'chat1':
                GameDdzNetMgr.Instance.chat('1')
                    break
            case 'chat2':
                GameDdzNetMgr.Instance.chat('2')
                    break
            case 'chat3':
                GameDdzNetMgr.Instance.chat('3')
                    break
            case 'chat4':
                GameDdzNetMgr.Instance.chat('4')
                    break
            case 'chat5':
                GameDdzNetMgr.Instance.chat('5')
                    break
        }
    }

    resetBeiShu(){
        this.beishu = 0
        this.view.setBeiShu(this.beishu)
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

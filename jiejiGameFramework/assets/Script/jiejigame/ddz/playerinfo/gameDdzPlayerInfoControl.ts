import gameDdzPlayerInfoView from "./gameDdzPlayerInfoView"
import gameDdzOperationControl from "../operation/gameDdzOperationControl"
import gameDdzPlayerCardControl from "../playercard/gameDdzPlayerCardControl"
import { OperationType, DdzPlayerDirType, Define } from "../../../Define/Define"
import gameDdzBottomControl from "../bottom/gameDdzBottomControl"
import gameDdzTopControl from "../top/gameDdzTopControl"
import UserMgr, { Player } from "../../../manager/UserMgr"
import Utility from "../../../utils/Utility"
import { GameAudioMgr } from "../../../manager/GameAudioMgr"

export default class gameDdzPlayerInfoControl {

    public static Instance:gameDdzPlayerInfoControl = null
    private view:gameDdzPlayerInfoView
    public dizhuDir:number = -1
    public canTalk:boolean = true
    public jiaofenshu:number = 0
    constructor(v:gameDdzPlayerInfoView){
        this.view = v

        gameDdzPlayerInfoControl.Instance = this
    }

    /**
     * 加入桌子
     * @param data 0,4196,年少无知,100000.0,0,idle,,0,,,,,,,@@@&
     */
    playerJoinDesk(data:string){
        let p_data = data.split(',')
        if (p_data.length > 0) {
            let dir = Number(p_data[0])
            this.view.setPlayerInfo(dir, p_data)

            let player: Player = UserMgr.Instance.getPlayer(dir);
            player.playerId = p_data[1];
            player.nickName = p_data[2];
            player.haveMoney = Number(p_data[2]);
            player.headUrl = '';
            let sex = Utility.getRangeRandom(0, 1) //0女 1男
            player.sex = sex
            player.loginDays = 0;
            player.token = '';
            player.hallConfig = '';
            UserMgr.Instance.joinPlayer(dir, player);
        }
    }

    /**
     * 推出桌子
     * @param data 
     */
    playerExitDesk(data:string){
        let realSmg = data.split(',')
        if (realSmg.length > 0) {
            this.view.setPlayerInfo(Number(realSmg[0]), null)
        }
    }

    /**
     * 设置头像
     * @param dir 地主方位
     */
    setPlayerDiZhuHead(dir:number){
        let nong:Array<string> = ['newddzgame_gaming_ui_player_role02','newddzgame_gaming_ui_player_role04']
        let di:Array<string> = ['newddzgame_gaming_ui_player_role01','newddzgame_gaming_ui_player_role03']
        this.dizhuDir = dir
        for (let index = 0; index < 3; index++) {
            let playerdata = UserMgr.Instance.getPlayer(index)
            let sex = playerdata.sex
            let headurl = 'desk/head/'
            if (dir == index) {
                headurl = headurl + di[sex]
            }else{
                headurl = headurl + nong[sex]
            }
            cc.loader.loadRes(headurl, cc.SpriteFrame, function(err, asset){
                if (err) {
                    cc.log('加载头像资源失败')
                    return 
                }
                let playernode = this.view.player_arr[index]
                let icon:cc.Sprite = playernode.getChildByName('touxiang').getChildByName('icon').getComponent(cc.Sprite)
                icon.spriteFrame = asset
            }.bind(this))
        }

        let _playernode = this.view.player_arr[dir]
        let dizhumao:cc.Node = _playernode.getChildByName('dizhumao')
        dizhumao.active = true
        dizhumao.position = this.view.dz_mao_bPos[dir]
        dizhumao.stopAllActions()
        let callback = function(){

        }
        let move = cc.moveTo(0.5, this.view.dz_mao_ePos[0])
        dizhumao.runAction(cc.sequence(move, cc.callFunc(callback)))
    }

    /**
     * 设置准备状态
     * @param data 
     */
    setPlayerState(data:string){
        let realSmg = data.split(',')
        let dir = Number(realSmg[0])
        let state = realSmg[1]
        let playernode = this.view.player_arr[dir]
        if (state == 'wait') {
            let ready:cc.Label = playernode.getChildByName('ready').getComponent(cc.Label)
            ready.string = '已准备'
            //gameDdzOperationControl.Instance.hideLimitTime(dir)
            if (dir == 0) {
                gameDdzOperationControl.Instance.showOperation(dir,OperationType.kong)
            }
            gameDdzBottomControl.Instance.resetBeiShu()
            gameDdzPlayerCardControl.Instance.resetOutPai()
        }
    }

    /**
     * 设置叫分
     * @param data 
     */
    setJiaoFen(data:string){
        let realSmg = data.split(',')
        if (realSmg.length > 0) {
            let dir = Number(realSmg[0]) 
            let fenshu = Number(realSmg[1])
            let str = ''
            let player = UserMgr.Instance.getPlayer(dir)
            if (fenshu <= 0) {
                str = '' + '不叫'
            }
            else{
                str = '' + fenshu + '分'
            }
            let playernode = this.view.player_arr[dir]
            let fen:cc.Label = playernode.getChildByName('fen').getComponent(cc.Label)
            fen.string = str
            let move = cc.moveBy(1, cc.v2(0,100))
            let pos = fen.node.position
            let callback = function(){
                fen.string = ''
                fen.node.position = pos
            }
            fen.node.runAction(cc.sequence(move, cc.callFunc(callback)))

            let sounName = Define.soundJiaoDiZhu(fenshu,this.jiaofenshu,player.sex)
            GameAudioMgr.Instance.PlaySound(sounName)
            if (this.jiaofenshu < fenshu) {
                this.jiaofenshu = fenshu
            }
        }
        
    }

    /**开始游戏，隐藏准备 等待字样 */
    setPlayerGameing(){
        for (let index = 0; index < 3; index++) {
            let playernode = this.view.player_arr[index];
            let ready:cc.Label = playernode.getChildByName('ready').getComponent(cc.Label)
            ready.string = ''
            let fen:cc.Label = playernode.getChildByName('fen').getComponent(cc.Label)
            fen.string = ''
        }
        this.dizhuDir = -1
        this.jiaofenshu = 0
        this.view.resetHead()
        gameDdzBottomControl.Instance.updataBeiShu('0')
        gameDdzTopControl.Instance.resetData()
    }

    resetHead(){
        this.view.resetHead()
    }

    /**更新玩家钱 */
    updataPlayerMoney(dir:number, money:number){
        let player = UserMgr.Instance.getPlayer(dir)
        player.haveMoney = money
        this.setPlayerMoneyZi(dir, money)
    }   

    setPlayerMoneyZi(dir:number, money:number){
        let jin = money
        let jinstr = ''
        if (jin > 10000) {
            jin = jin/10000
            jinstr = jinstr + jin + '万'
        }
        else{
            jinstr = jinstr + jin
        }
        let playernode = this.view.player_arr[dir]
        let jinbi:cc.Label = playernode.getChildByName('jibidi').getChildByName('jibi').getComponent(cc.Label)
        jinbi.string = jinstr
    }

    /**播放说话 */
    playChat(data:string){
        let realSmg = data.split(';')
        if (realSmg.length > 0) {
            this.canTalk = false
            let dir = Number(realSmg[0])
            let key = Number(realSmg[1]) + 1
            GameAudioMgr.Instance.PlaySound('Chat/' + String(key))
            let playernode = this.view.player_arr[dir]
            let chat:cc.Label = playernode.getChildByName('shuohua').getComponent(cc.Label)
            chat.string = Define.chatStr[Number(realSmg[1])]
            chat.node.active = true
            let deltime = cc.delayTime(3)
            let self = this
            let callback = function(){
                self.canTalk = true
                chat.node.active = false
            }
            chat.node.runAction(cc.sequence(deltime, cc.callFunc(callback)))
            gameDdzBottomControl.Instance.hideDuiHuaKuang()
        }
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

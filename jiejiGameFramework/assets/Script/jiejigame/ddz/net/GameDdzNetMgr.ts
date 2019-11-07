import WebSocketManage from '../../../net/WebSocketManage';
import { GameSocketType, Define, OperationType} from '../../../Define/Define';
import { Utils } from '../../../utils/Utils';
import { NotificationManage } from '../../../Notification/NotificationManage';
import { GameAudioMgr } from '../../../manager/GameAudioMgr';
import AlertPanelManager from '../../../manager/AlertPanelManager';
import LogHelp from '../../../Log/LogHelp';
import TipsManager from '../../../manager/TipsManager';
import GameMainStart from '../main/GameStart';
import SocketEnumDdz from './SocketEnumDdz';
import gameDdzOperationControl from '../operation/gameDdzOperationControl';
import gameDdzPlayerInfoControl from '../playerinfo/gameDdzPlayerInfoControl';
import gameDdzPlayerCardControl from '../playercard/gameDdzPlayerCardControl';
import gameDdzDeskPaiDuiControl from '../deskpaidui/gameDdzDeskPaiDuiControl';
import gameDdzBottomControl from '../bottom/gameDdzBottomControl';
import gameDdzTopControl from '../top/gameDdzTopControl';
import gameDdzTuoGuanControl from '../tuoguan/gameDdzTuoGuanControl';
import gameDdzGameOverControl from '../gameover/gameDdzGameOverControl';
import UserMgr from '../../../manager/UserMgr';



const {ccclass, property} = cc._decorator;

/**
 * 统一消息处理
 */
@ccclass
export default class GameDdzNetMgr extends cc.Component {

    private static __instance: GameDdzNetMgr;
    public static get Instance() {
        if (null == this.__instance) {
            this.__instance = new GameDdzNetMgr();
        }
        return this.__instance;
    }

    /** 自己的方位 */
    public directionDown: number = -1;
    /** 庄的方位 */
    public directionZhuang: number = -1;

    /**是否开启托管模式 */
    public isTuoGuan:boolean = false

    /**
     * 开始连接socket
     */
    public connecting() {
        cc.log('开始链接socke')
        WebSocketManage.Instance.CreateWebSocket(GameSocketType.SocketType_DDZ,
            Define.DDZ__WEB__SOCKET__URL,
            this.onConnectedSuccessCB.bind(this),
            this.onUnusualCloseCB.bind(this));
    }

    /**
     * 关闭游戏连接
     */
    public closeConnected(){
        cc.log("关闭游戏链接")
        WebSocketManage.Instance.CloseWebSocker(GameSocketType.SocketType_DDZ);
    }
   
    /**
     * 连接成功
     * @param key 
     */
    public onConnectedSuccessCB(){
        LogHelp.log("连接成功");
        this.joinDesk()
    }

    /**
     * 异常关闭网络
     */
    public onUnusualCloseCB(){
        console.log("异常网络关闭", WebSocketManage.Instance.isConnecting(GameSocketType.SocketType_DDZ) );
        if (WebSocketManage.Instance.isConnecting(GameSocketType.SocketType_DDZ) == 0) {
            WebSocketManage.Instance.ReconnectWebSocker(GameSocketType.SocketType_DDZ);
        }
    }

    public joinDesk(){
        if (WebSocketManage.Instance.isConnecting(GameSocketType.SocketType_DDZ) == -1){
            this.connecting()
            return;
        }
        if (WebSocketManage.Instance.isConnecting(GameSocketType.SocketType_DDZ) == 0) {
            WebSocketManage.Instance.ReconnectWebSocker(GameSocketType.SocketType_DDZ);
            return;
        }
        let json = {
            // "playerId": GameMainStart.Instance.currentPlayer.playerId,
            // "token": Utils.GetLocalStorage(Define.STORAGE_TOKEN)

            "platform": "qzone",
            "data": {"playerId": GameMainStart.Instance.currentPlayer.playerId, "token":Utils.GetLocalStorage(Define.STORAGE_TOKEN)}
        }
        // 连接成功后，发送进入桌子请求
        //this.SendMessage(SocketEnumZfb.JOINDESK, JSON.stringify(json));
        //发送
        this.SendMessage(SocketEnumDdz.JOINDESK, JSON.stringify(json));
    }

    /**
     * 3更新玩家状态
     * @param data
     */
    public updatePlayerState(data:string = ''){
        this.SendMessage(SocketEnumDdz.UPDATEPLAYERSTATE, data)
    }

    /**
     * 4叫分
     * @param data 
     */
    public jiaoFen(data:string = ''){
        this.SendMessage(SocketEnumDdz.JIAOFEN, data)
    }

    /**
     * 5 出牌
     * @param command 
     * @param data 
     */
    public putPoker(data:string = ''){
        this.SendMessage(SocketEnumDdz.PUTPOKER, data)
    } 

    /**
     * 6 过
     * @param data 
     */
    public pass(data:string = ''){
        this.SendMessage(SocketEnumDdz.PASS, data)
    }

    /**
     * 8 聊天
     * @param data 
     */
    public chat(data:string = ''){
        this.SendMessage(SocketEnumDdz.CHAT, data)
    }

    /**
     * 9托管
     * @param data 
     */
    public tuoGuan(data:string = ''){
        this.SendMessage(SocketEnumDdz.TUOGUAN, data)
    }

    /**
     * 10 取消托管
     * @param data 
     */
    public unTuoGuan(data:string = ''){
        this.SendMessage(SocketEnumDdz.UNTUOGUAN, data)
    }

    /**
     * 统一发送消息
     * 
     * @param command 
     * @param data 
     */
    public SendMessage(command: number, data: string = "") {
        // LogHelp.log(command + '，data: ' + data);
        data = command + "@" + data;

        WebSocketManage.Instance.SendMessage(GameSocketType.SocketType_DDZ, command, data);
    }

    //==========================接收消息处理=============

    /**
     * 注册消息
     */
    public AddRegisterMessage() {
        //NotificationManage.Register(SocketEnumDdz.warnI, this.doNothingI.bind(this), this, GameSocketType.SocketType_DDZ)
        //NotificationManage.Register(SocketEnumDdz.errorI, this.doNothingI.bind(this), this, GameSocketType.SocketType_DDZ)
        //NotificationManage.Register(SocketEnumDdz.infoI, this.doNothingI.bind(this), this, GameSocketType.SocketType_DDZ)
        //NotificationManage.Register(SocketEnumDdz.timeI, this.doNothingI.bind(this), this, GameSocketType.SocketType_DDZ)
        NotificationManage.Register(SocketEnumDdz.fapaiwanbiI, this.fapaiwanbiI.bind(this), this, GameSocketType.SocketType_DDZ)
        NotificationManage.Register(SocketEnumDdz.beginGameI, this.beginGameI.bind(this), this, GameSocketType.SocketType_DDZ)
        NotificationManage.Register(SocketEnumDdz.initDeskI, this.initDeskI.bind(this), this, GameSocketType.SocketType_DDZ)
        NotificationManage.Register(SocketEnumDdz.joinDeskI, this.joinDeskI.bind(this), this, GameSocketType.SocketType_DDZ)
        NotificationManage.Register(SocketEnumDdz.exitDeskI, this.exitDeskI.bind(this), this, GameSocketType.SocketType_DDZ)
        NotificationManage.Register(SocketEnumDdz.updatePlayerStateI, this.updatePlayerStateI.bind(this), this, GameSocketType.SocketType_DDZ)
        NotificationManage.Register(SocketEnumDdz.jiaofenI, this.jiaofenI.bind(this), this, GameSocketType.SocketType_DDZ)
        NotificationManage.Register(SocketEnumDdz.putPokerI, this.putPokerI.bind(this), this, GameSocketType.SocketType_DDZ)
        NotificationManage.Register(SocketEnumDdz.passI, this.passI.bind(this), this, GameSocketType.SocketType_DDZ)
        //NotificationManage.Register(SocketEnumDdz.showOperationI, this.doNothingI.bind(this), this, GameSocketType.SocketType_DDZ)
        NotificationManage.Register(SocketEnumDdz.gameOverI, this.gameOverI.bind(this), this, GameSocketType.SocketType_DDZ)
        NotificationManage.Register(SocketEnumDdz.chatI, this.chatI.bind(this), this, GameSocketType.SocketType_DDZ)
        NotificationManage.Register(SocketEnumDdz.tuoguanI, this.tuoguanI.bind(this), this, GameSocketType.SocketType_DDZ)
        NotificationManage.Register(SocketEnumDdz.untuoguanI, this.untuoguanI.bind(this), this, GameSocketType.SocketType_DDZ)
        NotificationManage.Register(SocketEnumDdz.showLimitTimeI, this.showLimitTimeI.bind(this), this, GameSocketType.SocketType_DDZ)
        NotificationManage.Register(SocketEnumDdz.unShowLimitTimeI, this.unShowLimitTimeI.bind(this), this, GameSocketType.SocketType_DDZ)
        NotificationManage.Register(SocketEnumDdz.fadipaiI, this.fadipaiI.bind(this), this, GameSocketType.SocketType_DDZ)
        NotificationManage.Register(SocketEnumDdz.qingJiaofenI, this.qingJiaofenI.bind(this), this, GameSocketType.SocketType_DDZ)
        NotificationManage.Register(SocketEnumDdz.qingChupaiI, this.qingChupaiI.bind(this), this, GameSocketType.SocketType_DDZ)
        NotificationManage.Register(SocketEnumDdz.updateBeiShuI, this.updateBeiShuI.bind(this), this, GameSocketType.SocketType_DDZ)
        NotificationManage.Register(SocketEnumDdz.updateMoneyI, this.updateMoneyI.bind(this), this, GameSocketType.SocketType_DDZ)
        //NotificationManage.Register(SocketEnumDdz.updateZaDanJiFenI, this.doNothingI.bind(this), this, GameSocketType.SocketType_DDZ)

        //提示
        NotificationManage.Register(SocketEnumDdz.newTishiI, this.newTishiI.bind(this), this, GameSocketType.SocketType_DDZ)

  
    }

    /**
     * 2 发牌完毕
     * @param command 
     * @param data 
     */
    private fapaiwanbiI(command:string, data:string){
        let realSmg = data.split('@')
        if (realSmg.length > 0) {
            if (realSmg[1] == '') {
                gameDdzTopControl.Instance.setDiPai()
            }
            else{
                TipsManager.Instance.createTips(realSmg[1])
            }
        }
    }

    /**3
     * 开始游戏
     * @param command 
     * @param data [data:3@1571987071914@0,34.5.60.65.42.52.29.13.28.26.1.9.54.17.38.36.10@1,17@2,17@&
     */
    private beginGameI(command:string, data:string){
        let realSmg = data.split('@')
        if (realSmg.length > 0) {
            gameDdzPlayerInfoControl.Instance.setPlayerGameing()
            gameDdzOperationControl.Instance.showOperation(0, OperationType.kong)
            gameDdzDeskPaiDuiControl.Instance.playFaPai()
            gameDdzPlayerCardControl.Instance.addPlayerCardData([realSmg[2], realSmg[3], realSmg[4]])
        }
    }

    /**
     * 4初始化桌子
     * @param command 
     * @param data [data:4@0,@34@4191@100000.0@0@&
     */
    private initDeskI(command:string, data:string){
        //cc.log('打印初始化桌子')
        let realSmg = data.split('@')
        if (realSmg.length > 0) {
            //gameDdzOperationControl.Instance.resetData()
            gameDdzPlayerCardControl.Instance.resetData()
            gameDdzOperationControl.Instance.showOperation(0,OperationType.ready0)
            gameDdzBottomControl.Instance.resetBeiShu()
        }
    }

    /**
     * 5加入桌子
     * @param command 
     * @param data [data:5@0,4196,年少无知,100000.0,0,idle,,0,,,,,,,@@@&
     */
    private joinDeskI(command:string, data:string){
        //cc.log('打印加入桌子')
        let realSmg = data.split('@')
        if (realSmg.length > 0) {
            gameDdzPlayerInfoControl.Instance.playerJoinDesk(realSmg[1])
        }
    }

    /**
     * 6 退出桌子
     * @param command 
     * @param data 
     */
    private exitDeskI(command:string, data:string){
        let realSmg = data.split('@')
        if (realSmg.length > 0) {
            gameDdzPlayerInfoControl.Instance.playerExitDesk(realSmg[1])
        }
    }

    /**
     * 7更新玩家状态 
     * @param command 
     * @param data  [data:7@1,wait@&]
     */
    private updatePlayerStateI(command:string, data:string){
        let realSmg = data.split('@')
        if (realSmg.length > 0) {
            gameDdzPlayerInfoControl.Instance.setPlayerState(realSmg[1])
        }
    }

    /**
     * 8叫分
     * @param command 
     * @param data 
     */
    private jiaofenI(command:string, data:string){
        let realSmg = data.split('@')
        if (realSmg.length > 0) {
            gameDdzPlayerInfoControl.Instance.setJiaoFen(realSmg[1])
        }
    }

    /**
     * 9出牌
     * @param command 
     * @param data [data:9@2;2;59,43@&
     */
    private putPokerI(command:string, data:string){
        let realSmg = data.split('@')
        if (realSmg.length > 0) {
            GameAudioMgr.Instance.PlaySound('PutCards')
            gameDdzPlayerCardControl.Instance.showOutPai(realSmg[1])
        }
    }

    /**
     * 过
     * @param command 
     * @param data 
     */
    private passI(command:string, data:string){
        let realSmg = data.split('@')
        if (realSmg.length > 0) {
            let dir = Number(realSmg[1])
            gameDdzOperationControl.Instance.recordPlayerPass[dir] = false
            
            let player = UserMgr.Instance.getPlayer(dir)
            let sounName = Define.soundPass(player.sex)
            GameAudioMgr.Instance.PlaySound(sounName)
        }
    }
    /**
     * 12游戏结束
     * @param command 
     * @param data [data:12@0/18,2,33,1,45,60,28,27,26,10,57,56,40,24,39,4,51;
     *                      1/;
     *                      2/29,13,12,43,58,41,55,23
     * @0,1;1,1;2,0
     * @0,1000.0;1,1000.0;2,-2000.0@0,0,0,0@@&
     */
    private gameOverI(command:string, data:string){
        let realSmg = data.split('@')
        if (realSmg.length > 0) {
            gameDdzGameOverControl.Instance.show(realSmg)
            //gameDdzOperationControl.Instance.showOperation(0,OperationType.ready0)
            gameDdzOperationControl.Instance.showOperation(0,OperationType.kong)
            gameDdzPlayerCardControl.Instance.gameOverShowShouPai(realSmg[1])
            gameDdzOperationControl.Instance.recordPlayerPass = [false,false,false]
        }
    }

    /**
     * 13 聊天
     * @param command 
     * @param data 
     */
    private chatI(command:string, data:string){
        let realSmg = data.split('@')
        if (realSmg.length > 0) {
            gameDdzPlayerInfoControl.Instance.playChat(realSmg[1])
        }
    }

    /**
     * 14 托管
     * @param command 
     * @param data 
     */
    private tuoguanI(command:string, data:string){
        let realSmg = data.split('@')
        if (realSmg.length > 0) {
            gameDdzTuoGuanControl.Instance.show()
        }
    }

    /**
     * 15取消托管
     * @param command 
     * @param data 
     */
    private untuoguanI(command:string, data:string){
        let realSmg = data.split('@')
        if (realSmg.length > 0) {
            gameDdzTuoGuanControl.Instance.hide()
        }
    }

    /**
     * 16 计时
     * @param command 
     * @param data [data:16@0,10@&
     */
    private showLimitTimeI(command:string, data:string){
        let realSmg = data.split('@')
        if (realSmg.length > 0) {
            gameDdzOperationControl.Instance.setLimitTime(realSmg[1])
        }
    }

    /**
     * 17 取消计时
     * @param command 
     * @param data 
     */
    private unShowLimitTimeI(command:string, data:string){

    }

    /**
     * 18 发底牌
     * @param command 
     * @param data 
     */
    private fadipaiI(command:string, data:string){
        let realSmg = data.split('@')
        if (realSmg.length > 0) {
            gameDdzTopControl.Instance.setDiPai(realSmg[1])
        }
    }

    /**
     * 19 请叫分
     * @param command 
     * @param data [data:19@1@&
     */
    private qingJiaofenI(command:string, data:string){
        let realSmg = data.split('@')
        if (realSmg.length > 0) {
            gameDdzOperationControl.Instance.showOperation(Number(realSmg[1]), OperationType.qingjiaofen)
        }
    }

    /**
     * 20显示出牌方位
     * @param command 
     * @param data  [data:20@0@&
     */
    private qingChupaiI(command:string, data:string){
        let realSmg = data.split('@')
        if (realSmg.length > 0) {
            gameDdzOperationControl.Instance.showOperation(Number(realSmg[1]), OperationType.qingchupai)
        }
    }

    /**
     * 30 更新倍数
     * @param command 
     * @param data 
     */
    private updateBeiShuI(command:string, data:string){
        let realSmg = data.split('@')
        if (realSmg.length > 0) {
            gameDdzBottomControl.Instance.updataBeiShu(realSmg[1])
        }
    }

    /**
     * 34 更新钱
     * @param command 
     * @param data 
     */
    private updateMoneyI(command:string, data:string){
        let realSmg = data.split('@')
        if (realSmg.length > 0) {
            gameDdzOperationControl.Instance.showOperation(0,OperationType.kong)
            let moneyData = realSmg[1].split(',')
            for (let index = 0; index < moneyData.length; index++) {
                const element = moneyData[index];
                gameDdzPlayerInfoControl.Instance.updataPlayerMoney(index, Number(element))
            }
        }
    }

    //
    private doNothingI(command:string, data:string){
        LogHelp.err("消息没有处理:  " + data);
    }


    /**
     * 42 超时等待提示 错误提示
     * 
     * @param command 
     * @param data 
     */
    private newTishiI(command: string, data: string) {
        let realSmg = data.split('@');
        if (realSmg.length > 0) {
            let tishiAry: Array<string> = realSmg[1].split(';');
            if (tishiAry.length > 1) {
                var strT: string = tishiAry[1];
                var tipsType: number = -1;

                if (tishiAry.length >= 3) {
                    tipsType = Number(tishiAry[2]);
                }

                //等待超时弹出面板方法
                if (tipsType == SocketEnumDdz.Tishi_returnHall) {
                    AlertPanelManager.Instance.show(strT, () => {
                        // LogHelp.log("点击返回大厅2")
                        GameDdzNetMgr.Instance.joinDesk()
                        //点击返回大厅
                    }, () => {
                        //点击返回大厅
                    });
                }else{
                    AlertPanelManager.Instance.show(strT, () => {
                        // LogHelp.log("点击返回大厅2")
                        //点击返回大厅
                    }, () => {
                        //点击返回大厅
                    });
                }

                // if (tishiAry[3] == null || tishiAry[3] == "") {
                    
                // }
                // else {
                //     //等待超时弹出面板方法
                //     if (tipsType == SocketEnumDdz.Tishi_returnHall) {
                //         AlertPanelManager.Instance.show(strT, () => {
                //             // LogHelp.log("点击返回大厅2")
                //             GameDdzNetMgr.Instance.joinDesk()
                //             //点击返回大厅
                //         }, () => {
                //             //点击返回大厅
                //         });
                //     }else{
                //         AlertPanelManager.Instance.show(strT, () => {
                //             // LogHelp.log("点击返回大厅2")
                //             //点击返回大厅
                //         }, () => {
                //             //点击返回大厅
                //         });
                //     }
                    
                // }
            }else{
                // TipsManager.instance.showTipsMiddle(new MiddleTips(), tishiAry[0].toString());
            }
        }
    }
}

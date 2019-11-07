import { Utils } from '../../../utils/Utils';
import { Define, PlayerDirectionType } from '../../../Define/Define';
import HTTP from '../../../net/HTTP';
import SocketEnumDdz from '../net/SocketEnumDdz';
import LogHelp from '../../../Log/LogHelp';
import { Player, ServerConfig } from '../../../manager/UserMgr';
import UserMgr from '../../../manager/UserMgr';
import Utility from '../../../utils/Utility';
import GameDdzNetMgr from '../net/GameDdzNetMgr';

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameMainStart extends cc.Component {

    private static __instance: GameMainStart;
    public static get Instance() {
        if (null == this.__instance) {
            this.__instance = new GameMainStart();
        }
        return this.__instance;
    }

    private signinParams: object = null

    // private signinParams: string = '{"username":"blockgames11","token":"8ecef50ac8defbe3bc641a3b3bb6e6ee","txID":"314375c0694768e3c3690570b3409da58b0beabc24fdb6b66e72f674ff0feb7d"}';

    // private loginParams: string = '{ "verNum": "0.0.1", "txID": "781578bb948b15c09203ffbb604f297fa4a9fd9e2119a53466045e4539262c23", "token": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJibG9ja2dhbWVzMTEiLCJhdXRoIjoiUk9MRV9DTElFTlQiLCJpYXQiOjE1NTU5MjE5NDcsImV4cCI6MTU2MTEwNTk0N30.26pYyHRz0_rTZlVCE9cIGBHYktE8UyIU8N1ye0SGfBM", "appId": "10000", "username": "blockgames11" }';

    // private baseUrl: string = 'http://localhost:8999/';

    private baseUrl: string = 'http://140.143.193.253:8999/';
    //private baseUrl:string ='http://123.206.67.98:9999/'; 
    //private baseUrl:string ='http://47.244.16.24:8999/'; 
    //private baseUrl:string ='http://192.168.50.247:8999/';
    //private baseUrl: string = 'https://api.twomahjong.com/';

    

    public currentPlayer: Player = null;

    public Awake() {

    }

    enterGame(){
        
    }

    /**
     * 游戏登陆 网络链接
     * @param token token
     */
    onGameLogin(token: string){
        let verNum = "1.0.0"
        let appId = "10001"
        let username = "10001"
        let msgType = ""
        if (Define.isDebug) {
            verNum = "0.0.2"
            appId = "20000"
            username = (100000 + Math.round(Math.random() * 10000)).toString()
            msgType = SocketEnumDdz.MESSAGE_GAME_LOGIN_DEV
        } else {
            verNum = "1.0.0"
            appId = "10001"
            username = this.signinParams['account']
            msgType = SocketEnumDdz.MESSAGE_GAME_LOGIN_PROD
        }

        var obj = {
            "verNum": "1.0.0",
            "token": token,
            "appId": "10001",
            "username": username
        };
        
        Utils.SetLocalStorage(Define.STORAGE_APP_ID, '10001');
        Utils.SetLocalStorage(Define.STORAGE_VER_NUM, '1.0.0');

        cc.log('登陆大厅', this.baseUrl + msgType, obj, token)

        HTTP.Instance.httpPost(this.baseUrl + msgType, obj, token, (resp) => {
            var repData = JSON.parse(resp);

            cc.log("-------------------repData==---------",repData);

            if(repData.code == HTTP.SUCCESS){
                var returnData = repData.data;
                //cc.log('登陆成功', returnData)
                let player: Player = UserMgr.Instance.getPlayer(PlayerDirectionType.DOWN);
                player.haveMoney = returnData.haveMoney;
                player.nickName = returnData.nickName;
                player.playerId = returnData.playerId;
                player.headUrl = returnData.headUrl;
                player.loginDays = returnData.loginDays;
                let sex = Utility.getRangeRandom(0, 1)
                player.sex = sex

                player.token = returnData.token;
                player.hallConfig = returnData.hallConfig;
                this.currentPlayer = player;
                UserMgr.Instance.joinPlayer(PlayerDirectionType.DOWN, player);
                
                // 存储当前用户ID
                Utils.SetLocalStorage(Define.STORAGE_TOKEN, player.token)
                Utils.SetLocalStorage(Define.STORAGE_PLAYER_ID, player.playerId);
                // LogHelp.log(player.playerId + "  :  " + player.haveMoney);

                this.onGetServerConfig();
            }else{
                if (repData != -1) {
                    console.error(repData.msg);
                }
            }
        });
    }

    onGetServerConfig(){
        let obj = {
            "gameType": "twoPeople",
            "token": Utils.GetLocalStorage(Define.STORAGE_TOKEN),
            "appId": Utils.GetLocalStorage(Define.STORAGE_APP_ID), 
            "verNum": Utils.GetLocalStorage(Define.STORAGE_VER_NUM)
        };

        //cc.log('获取中发白的服务器列表')

        cc.log("打印token", Utils.GetLocalStorage(Define.STORAGE_TOKEN))

        HTTP.Instance.httpPost(this.baseUrl + SocketEnumDdz.MESSAGE_GAME_SERVER_CONFIG, obj, Utils.GetLocalStorage(Define.STORAGE_TOKEN), (resp) => {
            // LogHelp.log(resp);
            let data = JSON.parse(resp);
            if (data.code == HTTP.SUCCESS){
                let room = data.data;

                let conf : ServerConfig = UserMgr.Instance.initailServerConfig(room.room1);

                //Define.SCMJ__WEB__SOCKET__URL = 'ws://' + conf.servers + '/websocket';

                cc.log('打印链接地址', Define.DDZ__WEB__SOCKET__URL)

                GameDdzNetMgr.Instance.connecting();
            }else{
                if (data != -1){
                    console.error(data.msg);
                }
            }
        });
    }

}

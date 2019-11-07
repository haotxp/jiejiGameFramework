import { GameSocketType } from "../Define/Define";
import LogHelp from "../Log/LogHelp";
import { NotificationManage } from "../Notification/NotificationManage";
import WebSocketCore from '../net/WebSocketCore';

export default class WebSocketManage {
    private _webSocketList: { [key: string]: SocketParams } = {};
    private static instance: WebSocketManage = null;
    /**
     * 获取实例的静态方法实例
     * @return
     */
    public static get Instance(): WebSocketManage {
        if (!this.instance) {
            this.instance = new WebSocketManage();
        }
        return this.instance;
    }

    constructor() {
    }

    public Initial() {

    }

    // 通过类型获取不同的websocket链接
    public GetWebSocketByType(key: string): WebSocketCore {
        if (this._webSocketList[key]) {
            return this._webSocketList[key].socket;
        }
        else {
            LogHelp.warn('key: ' + key + ' 没有创建此链接,获取websocket异常!');
            return null;
        }
    }

    /**
     * 创建一个websocket连接
     * @param {websocket标识符} key 
     * @param {建立连接的服务器地址} url 
     */
    public CreateWebSocket(key: string, url: string, successCbFun: Function, closeCB ?:Function) {
        if (!this._webSocketList[key] || this._webSocketList[key]['url'] != url) {
            var websocket: WebSocketCore = new WebSocketCore();
            websocket.InitWebSocket(key, url, this.SuccessCallback.bind(this), this.ReceiveMessage.bind(this), this.UnusualCloseCallback.bind(this));

            let s = new SocketParams()
            s.socket = websocket
            s.url = url
            s.key = key
            s.successCb = successCbFun
            if (closeCB) {
                s.closeCb = closeCB
            }
            
            this._webSocketList[key] = s;
            LogHelp.log('创建一个websocket连接1 key： ' + key);
        }
        else {
            var websocket: WebSocketCore = new WebSocketCore();
            websocket.InitWebSocket(key, url, this.SuccessCallback.bind(this), this.ReceiveMessage.bind(this));

            this._webSocketList[key].socket = websocket;
            LogHelp.log('创建一个websocket连接2 key： ' + key);
        }
    }

    /**
     * 关闭连接
     * @param key 
     */
    public CloseWebSocker(key: string) {
        if (this._webSocketList[key]) {
            this._webSocketList[key].socket.CloseWebSocket();
            this._webSocketList[key].socket = null
            this._webSocketList[key].successCb = null
            this._webSocketList[key].errCb = null
            this._webSocketList[key].closeCb = null

            delete this._webSocketList[key]
            cc.log("关闭网络")
        }
    }

    /**
     * 重连
     * @param key 
     */
    public ReconnectWebSocker(key: string) {
        if (this._webSocketList[key]) {
            this._webSocketList[key].socket.Reconnect(this._webSocketList[key]['url']);
        }
    }

    /**
     * websocket 是否是连接中 1:连接中 0：已经断开 -1：没有此socket
     * @param key 
     */
    public isConnecting(key: string) {
        if (this._webSocketList[key] != null) {
            if (this._webSocketList[key].socket.isConnecting()) {
                return 1
            }else{
                return 0
            }
        }
        return -1
    }

    /**
     * 异常关闭回调
     */
    public UnusualCloseCallback(key: string){
        LogHelp.log('异常网络关闭' +  key)
        //this._webSocketList[key].closeCb.call(this, key);
        
        if (this._webSocketList[key]) {
            this._webSocketList[key].closeCb.call(this, key);
        }
        else {
            LogHelp.warn('SendMessageByType : key ' + key + ' 没有创建此链接,发消息异常!');
        }
    }

    /**
     * 连接成功回调处理
     * 
     * @param key 
     */
    public SuccessCallback(key: string) {
        // LogHelp.log('key '+ key);
        if (this._webSocketList[key]) {
            this._webSocketList[key].successCb.call(this, key);
        }
        else {
            LogHelp.warn('SendMessageByType : key ' + key + ' 没有创建此链接,发消息异常!');
        }
    }

    /**
    * websocket 发送消息
    * @param {websocket标识符} key 
    * @param {发送的消息数据 } data 
    */
    public SendMessage(key: string, command: number, data: string) {
        // LogHelp.log('发送消息 command: ' + command + '  data: ' + data);
        if (this._webSocketList[key]) {
            this._webSocketList[key].socket.SendMessage(command, data);
        }
        else {
            LogHelp.warn('key:' + key + ' 没有创建此链接,发消息异常!');
        }
    }

    /**
     *  广播 websocket 返回消息处理
     * 
     * @param {消息号} command 
     * @param {消息数据 } data 
     */
    public ReceiveMessage(key: string, command: number, data: string) {
        LogHelp.log("返回消息处理  [command:" + command + "] [data:" + data + "]");
        switch (key) {
            case GameSocketType.SocketType_ZFB:
                NotificationManage.Send(command, GameSocketType.SocketType_ZFB, data);
                break;
            case GameSocketType.SocketType_MTL:
                NotificationManage.Send(command, GameSocketType.SocketType_MTL, data);
                break;
            case GameSocketType.SocketType_Horse:
                NotificationManage.Send(command, GameSocketType.SocketType_Horse, data);
                break;
            case GameSocketType.SocketType_SCMahjong:
                NotificationManage.Send(command, GameSocketType.SocketType_SCMahjong, data);
                break;
            case GameSocketType.SocketType_DDZ:
                    NotificationManage.Send(command, GameSocketType.SocketType_DDZ, data);
                break
            default:
                break;
        }
    }

}

export class SocketParams {
    public socket: WebSocketCore
    public url: string
    public key: string
    public successCb: Function
    public closeCb: Function
    public errCb: Function
}


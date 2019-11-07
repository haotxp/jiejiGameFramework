import LogHelp from "../Log/LogHelp";


export default class WebSocketCore
{
    public _webSocket:WebSocket;
    
    /**
     * 连接成功回调
     */
    private _successCbFun:Function;
    /**
     * 接收数据回调
     */
    private _receiveCbFun:Function;

    /**
     * 接受异常关闭网络
     */
    private _closeCbFun:Function;

    private _key:string;

    /**
     * 初始化websock
     * 
     * @param key 
     * @param url 
     * @param successcbFun 连接成功回调
     * @param receiveCbFun 接收数据回调
     */
    public InitWebSocket(key:string, url:string , successcbFun: Function ,receiveCbFun: Function, closeCbFun ?: Function)
    {
        LogHelp.log('初始化websock key:' + key + ' url:' + url);
        this._key = key;
        this._successCbFun = successcbFun;
        this._receiveCbFun = receiveCbFun;
        this._webSocket = new WebSocket(url);
        this._webSocket.binaryType = 'arraybuffer';

        this._webSocket.onopen = this.onOpen.bind(this);

        if (closeCbFun) {
            this._closeCbFun = closeCbFun
        }

        this._webSocket.onclose = this.onClose.bind(this);
        
        this._webSocket.onmessage = this.onMessage.bind(this);
        this._webSocket.onerror = this.onError.bind(this);
    }

    /**
     * 重连
     * @param url 
     */
    public Reconnect(url:string)
    {
        console.log('重连', url)
        this._webSocket = new WebSocket(url);
    }

    /**
     * 网络连接成功
     * @param ev 
     */
    private onOpen(ev: Event)
    {
        LogHelp.log('key:'+ this._key +'，网络连接成功');
        if(this._successCbFun != null)
        {
            this._successCbFun(this._key);
        }
        else
        {
            LogHelp.log('key:'+ this._key +'，this._successCbFun: ' + this._successCbFun );
        }
    }

    /**
     * 网络连接关闭
     * @param ev 
     */
    private onClose(ev: CloseEvent)
    {
        let code:number = ev.code;
        var reason = ev.reason;
        var wasClean = ev.wasClean;
        LogHelp.warn('key:'+ this._key +'，网络连接关闭onClose : code: ' + code + ',reason: ' + reason + ' ,wasClean : '+wasClean);
        // if (this._closeCbFun) {
        //     this._closeCbFun(this._key)
        // }
    }

    /**
     * 数据接收
     * @param ev 
     */
    private onMessage(ev: MessageEvent) {
        let data: string = ev.data;
        // console.log('数据接收:  ' + data);
        if (data != null && data != "" && this._receiveCbFun != null && data.indexOf("@") != -1 ){
            let realSmg = data.split('@');
            if (realSmg.length > 0){
                this._receiveCbFun(this._key, realSmg[0], data);
            }
        }
    }

    /**
     * 网络异常
     * @param ev 
     */
    private onError(ev: Event)
    {
        LogHelp.err('key:'+ this._key +'，网络连接出现异常！！  ev.data: ' + ev.type);
    }

    /**
     * 发送数据
     * 
     * @param command 
     * @param data 
     */
    public SendMessage(command: number, data: string) {
        if (data != null && data != "" && this._webSocket.readyState == 1) {
            this._webSocket.send(data);
            LogHelp.log('key:' + this._key + '，发送： ' + data);
        }
    }
    
    /**
     * 关闭连接
     */
    public CloseWebSocket()
    {
        this._webSocket.close();
    }
    
    public isConnecting(){
        return this._webSocket.readyState == 1
    }
    
}

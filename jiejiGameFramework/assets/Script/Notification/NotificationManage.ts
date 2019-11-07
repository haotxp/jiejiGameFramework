import { GameSocketType } from '../Define/Define';
import LogHelp from '../Log/LogHelp';

/**
 * 事件
 */
export class NotificationManage 
{
    /** 监听数组 */
    private static listeners = {};
 
    /** 
     * 注册事件
     * @param id 事件id
     * @param callback 回调函数
     * @param context 上下文
     */
    public static Register(id: number, callback: Function, context: any, type: GameSocketType) 
    {
        let notify = NotificationManage.listeners[type];
        if (!notify) 
        {
            NotificationManage.listeners[type] = [];
        }
        let observers: Observer[] = NotificationManage.listeners[type][id];
        if (!observers) 
        {
            NotificationManage.listeners[type][id] = [];
        }
        NotificationManage.listeners[type][id].push(new Observer(callback, context));
    }
 
    /**
     * 移除事件
     * @param id 事件id
     * @param callback 回调函数
     * @param context 上下文
     */
    public static Remove(id: number, callback: Function, context: any, type: GameSocketType) 
    {
        let observers: Observer[] = NotificationManage.listeners[type][id];
        if (!observers) return;
        let length = observers.length;
        for (let i = 0; i < length; i++) 
        {
            let observer = observers[i];
            if (observer.compar(context)) 
            {
                observers.splice(i, 1);
                break;
            }
        }
        if (observers.length == 0) 
        {
            delete NotificationManage.listeners[type][id];
        }
    }
 
    /**
     * 发送事件
     * @param id 事件名称
     */
    public static Send(id: number, type: GameSocketType, ...args: any[]) 
    {
        if (NotificationManage.listeners && NotificationManage.listeners[type] && NotificationManage.listeners[type][id]){
            let observers: Observer[] = NotificationManage.listeners[type][id];
            if (!observers) return;
            let length = observers.length;
            for (let i = 0; i < length; i++) {
                let observer = observers[i];
                observer.notify(id, ...args);
            }
        }else{
            LogHelp.err("消息没有注册:  type: " + type + "  msgID: " + id);
        }
    }
}
 
/**
 * 观察者
 */
class Observer 
{
    /** 回调函数 */
    private callback: Function = null;
    /** 上下文 */
    private context: any = null;
 
    constructor(callback: Function, context: any) 
    {
        let self = this;
        self.callback = callback;
        self.context = context;
    }
 
    /**
     * 发送通知
     * @param args 不定参数
     */
    notify(...args: any[]): void 
    {
        let self = this;
        self.callback.call(self.context, ...args);
    }
 
    /**
     * 上下文比较
     * @param context 上下文
     */
    compar(context: any): boolean 
    {
        return context == this.context;
    }
}

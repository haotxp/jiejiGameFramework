
/** 定时器管理器 衍生版*/
/*涂小平 2019-7-25
*以 node/component 作为 scheduler 的 target 
*/

const { ccclass, property } = cc._decorator;
@ccclass

export default class ScheduleMgrOtc {
    public static readonly Instance: ScheduleMgrOtc = new ScheduleMgrOtc();
    private constructor() { }
     /** Node字典 */
     private dictNode: { [key: string]: { ["node"]: cc.Node, ["executeNum"]: number } } = {};

     /**
     * 指定回调函数，调用对象等信息来添加一个新的定时器。
     * @param callback 回调
     * @param target 定时器添加的对象
     * @param interval 间隔时间
     * @param repeat 重复次数
     * @param delay 延迟时间
     */
    public schedule(callback: Function, target: any, interval: number, repeat: number, delay: number = 0) {
        target.schedule(callback, interval, repeat,delay,false)
    }

    /**
     * 取消定时器
     * @param callback 回调
     * @param target 定时器添加的对象
     */
    public unschedule(callback: Function, target: any) {
        target.unschedule(callback);
    }

    /**
     * 取消所有定时器
     * @param target 定时器添加的对象
     */
    public unscheduleAllCallbacks(target: any) {
        target.unscheduleAllCallbacks();
    }
}

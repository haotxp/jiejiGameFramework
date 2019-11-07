/** 定时器管理器 */
export default class ScheduleMgr {
    public static readonly Instance: ScheduleMgr = new ScheduleMgr();
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
        cc.director.getScheduler().schedule(callback, target, interval, repeat, delay, false);
    }

    /**
     * 指执行一次的定时器
     * @param callback 回调
     * @param target 定时器添加的对象
     * @param delay 延迟时间
     */
    public scheduleOnce(callback: Function, target: any, delay: number) {
        this.schedule(callback, target, 0, 0, delay);
    }

    /**
     * 取消定时器
     * @param callback 回调
     * @param target 定时器添加的对象
     */
    public unschedule(callback: Function, target: any) {
        cc.director.getScheduler().unschedule(callback, target);
    }

    /**
     * 取消所有定时器
     * @param target 定时器添加的对象
     */
    public unscheduleAllCallbacks(target: any) {
        cc.director.getScheduler().unscheduleAllForTarget(target);
    }

    /**
     * 根据Key创建定时器
     * @param callback 回调函数
     * @param key 关键字
     * @param interval 间隔时间
     * @param repeat 重复次数
     * @param delay 延迟时间
     */
    public scheduleByKey(callback: Function, key: string, interval: number, repeat: number, delay: number = 0) {
        let node = new cc.Node();
        this.dictNode[key] = { "node": node, "executeNum": 0 };
        this.schedule(function () {
            if (callback) {
                callback();
                console.log("执行定时器回调")
            }
            if (ScheduleMgr.Instance.dictNode[key]) {
                ScheduleMgr.Instance.dictNode[key]["executeNum"]++;
                if (ScheduleMgr.Instance.dictNode[key]["executeNum"] >= repeat + 1) {
                    // 播放完毕 移除
                    ScheduleMgr.Instance.dictNode[key]["node"].destroy();
                    delete ScheduleMgr.Instance.dictNode[key];
                    console.log("指定完毕，移除定时器")
                }
            }
        }, node, interval, repeat, delay);
    }

    /**
     * 根据Key创建只执行一次的定时器
     * @param callback 回调函数
     * @param key 关键字
     * @param delay 延迟时间
     */
    public scheduleOnceByKey(callback: Function, key: string, delay: number) {
        this.scheduleByKey(callback, key, 0, 0, delay);
    }

    /**
     * 根据Key取消定时器
     * @param key 关键字
     * @param cb 取消定时器回调
     */
    public unscheduleByKey(key: string, cb: Function = null) {
        if (this.dictNode[key]) {
            this.unscheduleAllCallbacks(this.dictNode[key]["node"]);
            this.dictNode[key]["node"].destroy();
            delete this.dictNode[key];
            if (cb) {
                cb();
            }
        }
    }
}

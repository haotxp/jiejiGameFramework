import Alert from '../components/Alert';

export default class AlertPanelManager {

    private static _instance: AlertPanelManager
    public static get Instance() {
        if (null == this._instance) {
            this._instance = new AlertPanelManager();
        }
        return this._instance;
    }

    private pool: cc.NodePool = null;
    private prefab: cc.Prefab = null;
    public poolName: string = "AlertPanel";

    public Initial() {
        this.pool = new cc.NodePool(this.poolName);
        if (this.prefab) return;

        cc.loader.loadRes('DDZPreloading/AlertPanel', (err, prefab) => {
            if (err) {
                cc.log('加载提示框pre失败')
                return
            }
            this.prefab = prefab;
        });
    }

    public show(msg: string,
        onConfimCB: Function = null,
        onCloseCB: Function = null,
        params: any = null) {
        if (msg == null || msg == "") {
            return;
        }

        let node: cc.Node = null;
        if (this.pool.size() == 0) {
            node = cc.instantiate(this.prefab);
        } else {
            node = this.pool.get();
        }
        let view: Alert = node.getComponent("Alert");
        if (view == null || view == undefined) {
            view = node.addComponent(Alert)
        }
        view.Awake();
        view.tips(msg, onConfimCB, onCloseCB, params);

        node.setContentSize(cc.winSize)
        node.addComponent(cc.BlockInputEvents)
        node.parent = cc.director.getScene();
    }
}

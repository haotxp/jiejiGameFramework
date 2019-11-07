import TipsCtrl from '../components/TipsCtrl';
import LogHelp from '../Log/LogHelp';
const {ccclass, property} = cc._decorator;

@ccclass
export default class TipsManager extends cc.Component {
    private static __instance: TipsManager;
    public static get Instance() {
        if (null == this.__instance) {
            this.__instance = new TipsManager();
        }
        return this.__instance;
    }

    private tipsPrefab: cc.Prefab = null;

    public pool: cc.NodePool = null;
    public poolName: string = "TipUI";

    public Initial() {
        this.pool = new cc.NodePool(this.poolName);
        if (this.tipsPrefab) return;

        cc.loader.loadRes('tips/Tips', (err, prefab) => {
            this.tipsPrefab = prefab;
        });
    }

    public createTips(content: string) {
        // LogHelp.log("######createTips")
        let node: cc.Node = this.pool.get();
        if (node == null) {
            node = cc.instantiate(this.tipsPrefab);
        } 

        let tipsCtrl: TipsCtrl = node.getComponent('TipsCtrl');
        tipsCtrl.Awake()
        if (content != null && content != "") {
            tipsCtrl.setContent(content);
        }
        node.active = true

        let del = cc.delayTime(3)
        let callback = function(){
            node.removeFromParent(true)
        }
        let seq = cc.sequence(del, cc.callFunc(callback))
        node.runAction(seq)

        node.parent = cc.director.getScene();
        // node.parent = cc.director.getScene().getChildByName('Canvas');
    }
}

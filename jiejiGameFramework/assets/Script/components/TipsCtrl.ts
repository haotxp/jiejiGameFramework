import { Utils } from '../utils/Utils';
import TipsManager from '../manager/TipsManager';
import { UIBase } from './UIBase';
import LogHelp from '../Log/LogHelp';
const {ccclass, property} = cc._decorator;

@ccclass
export default class TipsCtrl extends UIBase {

    
    private content: cc.Label = null;

    public Awake () {
        if (this.content == null || this.content == undefined) {
            this.content = Utils.FindComponentByName(this.node, "Content", cc.Label)
        }
    }

    public onDestroySelf() {
        // LogHelp.log("onDestroySelfonDestroySelfonDestroySelf@@@")
        // this.node.active = false
        // TipsManager.Instance.pool.put(this.node)
        this.node.destroy();
    }

    public setContent(str) {
        if (str) {
            this.content.string = str;
        }
    }

}

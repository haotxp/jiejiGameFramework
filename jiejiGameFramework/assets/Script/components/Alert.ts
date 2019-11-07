import { UIBase } from './UIBase';

const {ccclass, property} = cc._decorator;

/**
 * 通用提示框
 */
@ccclass
export default class Alert extends UIBase {
    public tipsMsg: cc.Label;
    public btn_cancel: cc.Button;
    public btn_ok: cc.Button;
    public btn_close: cc.Button;

    private onConfimCB: Function = null;
    private onCloseCB: Function = null;
    private params: any = null;

    public Awake(){
        this.tipsMsg = this.FindChildByName("msg", cc.Label);
        this.btn_cancel = this.FindChildByName("btn_cancel", cc.Button);
        this.btn_ok = this.FindChildByName("btn_ok", cc.Button);
        this.btn_close = this.FindChildByName("btn_close", cc.Button);

        this.tipsMsg.string = "";
        this.btn_cancel.node.on("click", this.onClickBtnCancel, this);
        this.btn_ok.node.on("click", this.onClickBtnOk, this);
        this.btn_close.node.on("click", this.onClickBtnClose, this);
    }

    public tips(msg: string, 
        onConfimCB: Function = null, 
        onCloseCB: Function = null, 
        params: any = null){
        if(msg == null || msg == ""){
            return;
        }

        if (onConfimCB != null) {
            this.onConfimCB = onConfimCB;
        }

        if (onCloseCB != null) {
            this.onCloseCB = onCloseCB;
        }

        if (params != null) {
            this.params = params;
        }

        this.tipsMsg.string = msg;
        this.Show();
    }

    private onClickBtnOk(){
        this.Hide();
        if (this.onCloseCB != null) {
            this.onConfimCB(this.params);
        }
    }

    private onClickBtnCancel() {
        this.Hide();
        if (this.onCloseCB != null) {
            this.onCloseCB(this.params);
        }
    }

    private onClickBtnClose() {
        this.Hide();
        if (this.onCloseCB != null) {
            this.onCloseCB(this.params);
        }
    }

    public Hide(){
        this.node.destroy()
        // this.node.getParent().active = false
        // super.Hide();
        // this.node.removeFromParent(false)
    }

}

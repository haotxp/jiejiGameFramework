import { UIBase } from '../components/UIBase';
import { Utils } from '../utils/Utils';
import { GameLoadResourceMgr } from '../Load/GameLoadResourceMgr';
import TweenMgr from '../utils/TweenMgr';

export class UIManager {

    private static instance: UIManager = null;
    private uiMap: Map<string, cc.Node> = new Map<string, cc.Node>();

    private __canvas: cc.Canvas;
    /**
     * UI显示层
     */
    private uiRoot: cc.Node = null;
    /**
     * UI显示层悲剧
     */
    private uiBg: cc.Node = null;

    public static get Instance() {
        if (this.instance == null) {
            this.instance = new UIManager();
        }
        return this.instance;
    }

    constructor() {
       this.Initial()
    }

    public Initial() {
        this.__canvas = cc.find("Canvas").getComponent(cc.Canvas);
        // 初始化UI层
        this.uiRoot = Utils.FindChildNodeByName(this.__canvas.node, "game_top_ui_layer");
        this.uiRoot.active = true;
        this.uiBg = Utils.FindChildNodeByName(this.uiRoot, "bg");
        this.uiBg.active = true;
    }

    /**
     * 显示UI
     * @param uiClass 
     * @param uiShow 
     * @param data 
     */
    public Show(url: string, uiShow: UIShowType = UIShowType.scaleIn, data?: any) {
        let ui = this.getUI(url, uiShow, data);
        if(ui != null){
            this.UIInitAndShow(ui, uiShow, data);
        }

        return ui;
    }

    public hide(url: string) {
        let ui = this.uiMap.get(url)
        if (ui != null) {
            ui.active = false
            ui.removeFromParent(false)

            TweenMgr.moveBy(ui, 0.5, 0, -320 - ui.height / 2)
        }
    }

    public clearAllUI() {
        this.uiMap.forEach((value: cc.Node) => {
            if (value != null) {
                value.active = false
                value.removeFromParent(false)
            }
        })
    }

    /**
     * 初始化UI并显示
     * @param ui 
     * @param uiShow 
     * @param data 
     */
    private UIInitAndShow(ui: cc.Node, uiShow: UIShowType, data?: any) {
        ui.active = true;

        let classcp: UIBase = ui.getComponent("UIBase")
        if (data == null) { 
            classcp.Awake() 
        } else {
            classcp.Awake(data) ;
        } 
        this.uiBg.active = true;
        this.uiRoot.active = true;
        
        this.uiRoot.addChild(ui);
        ui.y = 320 + ui.height
        TweenMgr.moveTo(ui, 0.5, 0, 0)
    }

    /**
     * 获取UI
     */
    private getUI(url: string, uiShow: UIShowType, data?: any) {

        let ui = this.uiMap.get(url)
        if(ui == null){
            let pref = GameLoadResourceMgr.Instance.GetTempLoadResourceControl().GetPrefabByUrl(url)
            ui = Utils.PrefabInstantiate(pref);

            this.uiMap.set(url, ui)
        }
        return ui
    }

}

/**
 * ui显示方式
 */
export enum UIShowType {
    none = -1,
    scaleIn = 1,
}

export enum UIHideType {
    none = -1,
    scaleOut = 1,
}

export enum UITypeId {
    AlertUI = "AlertPanel",  //提示
    ResultPanel = "ResultPanel",  //结算UI
}

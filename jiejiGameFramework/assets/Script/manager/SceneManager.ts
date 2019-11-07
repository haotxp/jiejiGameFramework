import LogHelp from '../Log/LogHelp';
const {ccclass, property} = cc._decorator;

@ccclass
export default class SceneManager extends cc.Component {

    private static __instance: SceneManager;
    public static get Instance() {
        if (null == this.__instance) {
            this.__instance = new SceneManager();
        }
        return this.__instance;
    }

    /**
     * 当前场景
     */
    @property
    currentScene: string = '';

    public Initial(){

    }

    public switchScene(scene: string, cp: Function){
        // LogHelp.log(" switchScene: " + scene);
        if (this.currentScene == scene){
            return;
        }
        cc.director.loadScene(scene, cp);
    }

}


import { Player, ServerConfig } from '../../../manager/UserMgr';


const {ccclass, property} = cc._decorator;

@ccclass
export default class GameMainStart extends cc.Component {

    private static __instance: GameMainStart;
    public static get Instance() {
        if (null == this.__instance) {
            this.__instance = new GameMainStart();
        }
        return this.__instance;
    }

    private signinParams: object = null


    public currentPlayer: Player = null;

    public Awake() {

    }

    enterGame(){

    }

}

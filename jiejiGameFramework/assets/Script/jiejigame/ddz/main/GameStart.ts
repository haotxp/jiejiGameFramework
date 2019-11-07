import { Utils } from '../../../utils/Utils';
import { Define, PlayerDirectionType } from '../../../Define/Define';
import HTTP from '../../../net/HTTP';
import LogHelp from '../../../Log/LogHelp';
import { Player, ServerConfig } from '../../../manager/UserMgr';
import UserMgr from '../../../manager/UserMgr';
import Utility from '../../../utils/Utility';

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

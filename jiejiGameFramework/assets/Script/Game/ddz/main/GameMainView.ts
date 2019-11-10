import GameMainController from './GameMainController';
import { UIBase } from '../../../components/UIBase';


const {ccclass, property} = cc._decorator;

@ccclass
export default class GameMainView extends UIBase {

    private comp: GameMainController;

    start() {
        this.Awake();
    }

    public Awake() {
        // let pl:gameDdzPlayerInfoView = this.FindChildByName('player_info', gameDdzPlayerInfoView)
        // pl.Awake()

        // let pc:gameDdzPlayerCardView = this.FindChildByName('player_shoupai', gameDdzPlayerCardView)
        // pc.Awake()

        this.comp = new GameMainController();
        this.comp.initailView(this);
    }

}

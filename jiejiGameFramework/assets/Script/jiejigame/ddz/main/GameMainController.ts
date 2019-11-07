import GameMainView from './GameMainView';
import GameMainStart from './GameStart';
import GameDdzNetMgr from '../net/GameDdzNetMgr';
const {ccclass, property} = cc._decorator;

/**
 * 游戏主类 入口
 */
@ccclass
export default class GameMainController extends cc.Component {

    public static Instance: GameMainController = null;
    public view: GameMainView;

    public initailView(v: GameMainView){
        GameMainController.Instance = this;
        this.view = v;

        //添加注册网络消息
        //GameDdzNetMgr.Instance.AddRegisterMessage();

        // 进入游戏 login
        //GameMainStart.Instance.Awake();
        
        cc.log('Awake')
        GameMainStart.Instance.enterGame()
        //GameMainStart.Instance.onGameLogin("")
    }
}

import { UIBase } from "../../../components/UIBase";
import gameDdzPlayerCardControl from "./gameDdzPlayerCardControl";
import playerCardViewD from "./playerCardViewD";
import playerCardViewR from "./playerCardViewR";
import playerCardViewL from "./playerCardViewL";




const {ccclass, property} = cc._decorator;

@ccclass
export default class gameDdzPlayerCardView extends UIBase {

    /**底部玩家 */
    public d_player_sp:cc.Node = null
    /**左边玩家 */
    public l_player_sp:cc.Node = null
    /**右边玩家 */
    public r_player_sp:cc.Node = null

    /**手牌父节点 */
    public dsp_parent:cc.Node = null

    private comp:gameDdzPlayerCardControl = null
    Awake(){
        this.d_player_sp = this.node.getChildByName('pl_0')
        let d_sc = this.d_player_sp.getComponent(playerCardViewD)
        d_sc.awake()

        this.dsp_parent = this.d_player_sp.getChildByName('shoupai')

        this.r_player_sp = this.node.getChildByName('pl_1')
        let r_sc = this.r_player_sp.getComponent(playerCardViewR)
        r_sc.awake()

        this.l_player_sp = this.node.getChildByName('pl_2')
        let l_sc = this.l_player_sp.getComponent(playerCardViewL)
        l_sc.awake()

        this.hide()
        this.comp = new gameDdzPlayerCardControl(this)
    }

    /**重置 */
    resetData(){
        let d_sc = this.d_player_sp.getComponent(playerCardViewD)
        d_sc.resetData()
        let l_sc = this.l_player_sp.getComponent(playerCardViewL)
        l_sc.resetData()
        let r_sc = this.r_player_sp.getComponent(playerCardViewR)
        r_sc.resetData()
    }

    /**show */
    show(){
        this.resetData()
        this.Show()
    }

    /**hide */
    hide(){
        this.Hide()
    }
}
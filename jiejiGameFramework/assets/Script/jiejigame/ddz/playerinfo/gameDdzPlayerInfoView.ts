import { UIBase } from "../../../components/UIBase";
import gameDdzPlayerInfoControl from "./gameDdzPlayerInfoControl";
import { Utils } from "../../../Utils/Utils";
import Utility from "../../../utils/Utility";

const {ccclass, property} = cc._decorator;

@ccclass
export default class gameDdzPlayerInfoView extends UIBase {
    /**玩家信息 ui 节点 */
    public player_arr:Array<cc.Node> = null 
    private comp:gameDdzPlayerInfoControl = null

    public dz_mao_bPos:Array<cc.Vec2> = [cc.v2(535,455),cc.v2(-440,75),cc.v2(485,75)]
    public dz_mao_ePos:Array<cc.Vec2> = [cc.v2(0,70)]

    Awake(){
        this.player_arr = []
        for (let index = 0; index < 3; index++) {
            let player = this.FindNodeByName('player' + index)            
            this.player_arr.push(player)
            this.setPlayerInfo(index, null)
        }
        this.comp = new gameDdzPlayerInfoControl(this)
    }

    /**
     * 设置玩家信息
     * @param dir 
     * @param data 
     */
    setPlayerInfo(dir:number, data:string[]){
        let playernode = this.player_arr[dir]
        let icon:cc.Sprite = playernode.getChildByName('touxiang').getChildByName('icon').getComponent(cc.Sprite)
        let name:cc.Label = playernode.getChildByName('Name').getComponent(cc.Label)
        let jinbi:cc.Label = playernode.getChildByName('jibidi').getChildByName('jibi').getComponent(cc.Label)
        let dizhumao:cc.Node = playernode.getChildByName('dizhumao')
        let ready:cc.Label = playernode.getChildByName('ready').getComponent(cc.Label)
        let fen:cc.Label = playernode.getChildByName('fen').getComponent(cc.Label)
        let shuohua:cc.Label = playernode.getChildByName('shuohua').getComponent(cc.Label)
        if(data == null){
            icon.spriteFrame = null
            name.string = ''
            jinbi.string = ''
            dizhumao.active = false
            ready.string = ''
            fen.string = ''
            shuohua.string = ''
        }
        else{
            let playerdata = data
            //cc.log('打印数据', playerdata)
            let self = this
            cc.loader.loadRes('desk/default', cc.SpriteFrame, function(err,asset){
                if (err) {
                    return
                }
                icon.spriteFrame = asset
            })
            name.string = playerdata[2]
            let jin = Number(playerdata[3])
            let jinstr = ''
            if (jin > 10000) {
                jin = jin/10000
                jinstr = jinstr + jin + '万'
            }
            else{
                jinstr = jinstr + jin
            }
            jinbi.string = jinstr
            dizhumao.active = false
            ready.string = '等待...'
        }
    }

    resetHead(){
        for (let index = 0; index < 3; index++) {
            let playernode = this.player_arr[index]
            let icon:cc.Sprite = playernode.getChildByName('touxiang').getChildByName('icon').getComponent(cc.Sprite)
            cc.loader.loadRes('desk/default', cc.SpriteFrame, function(err,asset){
                if (err) {
                    return
                }
                icon.spriteFrame = asset
            })
            let dizhumao:cc.Node = playernode.getChildByName('dizhumao')
            dizhumao.active = false
        }
    }

    /**重置 */
    resetData(){

    }

    /**show */
    show(){
        this.Show()
    }

    /**hide */
    hide(){
        this.Hide()
    }
}
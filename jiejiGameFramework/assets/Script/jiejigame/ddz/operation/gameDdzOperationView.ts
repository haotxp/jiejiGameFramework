import { UIBase } from "../../../components/UIBase";
import gameDdzOperationControl from "./gameDdzOperationControl";
import { OperationType } from "../../../Define/Define";



const {ccclass, property} = cc._decorator;

@ccclass
export default class gameDdzOperationView extends UIBase {

    private comp:gameDdzOperationControl = null

    /**操作方位 */
    public operationDir:Array<cc.Node> = []

    public d_mingpai:cc.Node = null
    public d_bujiao:cc.Node = null
    public d_buchu:cc.Node = null
    public d_jiao:cc.Node = null
    public d_tishi:cc.Node = null
    public d_chupai:cc.Node = null
    public d_begin:cc.Node = null
    public d_naozhong:cc.Node = null
    public d_jiaofen:cc.Node = null

    public naozhongArr:Array<cc.Node> = []

    Awake(){
        this.operationDir = []
        let down = this.node.getChildByName('down')
        down.active = false
        this.operationDir.push(down)

        let right = this.node.getChildByName('right')
        right.active = false
        this.operationDir.push(right)

        let left = this.node.getChildByName('left')
        left.active = false
        this.operationDir.push(left)

        this.d_mingpai = this.operationDir[0].getChildByName('mingpai')
        this.d_bujiao = this.operationDir[0].getChildByName('bujiao')
        this.d_buchu = this.operationDir[0].getChildByName('buchu')
        this.d_jiao = this.operationDir[0].getChildByName('jiao')
        this.d_tishi = this.operationDir[0].getChildByName('tishi')
        this.d_chupai = this.operationDir[0].getChildByName('chupai')
        this.d_begin = this.operationDir[0].getChildByName('begin')
        this.d_naozhong = this.operationDir[0].getChildByName('naozhong')
        this.d_jiaofen = this.operationDir[0].getChildByName('jiaofen')

        this.naozhongArr = []
        let d_naozhong = this.operationDir[0].getChildByName('naozhong')
        this.naozhongArr.push(d_naozhong)
        let r_naozhong = this.operationDir[1].getChildByName('naozhong')
        this.naozhongArr.push(r_naozhong)
        let l_naozhong = this.operationDir[2].getChildByName('naozhong')
        this.naozhongArr.push(l_naozhong)
        
        //this.hide()
        this.comp = new gameDdzOperationControl(this)
    }

    /**重置 */
    resetData(){
        this.hide()
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
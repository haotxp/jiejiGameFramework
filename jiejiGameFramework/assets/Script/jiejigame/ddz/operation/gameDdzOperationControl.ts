import gameDdzOperationView from "./gameDdzOperationView"
import GameDdzNetMgr from "../net/GameDdzNetMgr"
import { OperationType, DdzPlayerDirType, PlayerDirectionType } from "../../../Define/Define"
import gameDdzPlayerCardControl from "../playercard/gameDdzPlayerCardControl"
import playerCardViewD from "../playercard/playerCardViewD"
import playerCardViewR from "../playercard/playerCardViewR"
import playerCardViewL from "../playercard/playerCardViewL"
import ScheduleMgr from "../../../utils/ScheduleMgr"
import TiShiUtil from "../util/TiShiUtil"
import { ElementOfTiShiUtil } from "../util/ElementOfTiShiUtil"
import { GameAudioMgr } from "../../../manager/GameAudioMgr"
import gameDdzPlayerInfoControl from "../playerinfo/gameDdzPlayerInfoControl"
import gameDdzGameOverControl from "../gameover/gameDdzGameOverControl"



export default class gameDdzOperationControl {

    public static Instance:gameDdzOperationControl = null
    private view:gameDdzOperationView

    /**提示牌组 */
    private tishiCardArr:Array<any> = []
    /**提示组合 序号 */
    private tishiIndex:number = 0

    /**操作方位 闹钟方位 */
    private naozhongdir = -1

    /**记录玩家 出牌还是不出牌 false 不出 */
    public recordPlayerPass:Array<boolean> = [false, false, false]
    
    /**操作限时 */
    private cutTime = 15

    constructor(v:gameDdzOperationView){
        this.view = v
        this.recordPlayerPass = [false, false, false]
        this.view.d_mingpai.on('click', this.btnClickCallBack, this)
        this.view.d_bujiao.on('click', this.btnClickCallBack, this)
        this.view.d_buchu.on('click', this.btnClickCallBack, this)
        this.view.d_jiao.on('click', this.btnClickCallBack, this)
        this.view.d_tishi.on('click', this.btnClickCallBack, this)
        this.view.d_chupai.on('click', this.btnClickCallBack, this)
        this.view.d_begin.on('click', this.btnClickCallBack, this)
        for (let index = 0; index < 3; index++) {
            let fennode = this.view.d_jiaofen.getChildByName(String(index+1) + 'fen')
            fennode.on('click', this.jiaoFenClickCallBack, this)
        }
        gameDdzOperationControl.Instance = this
    }

    /**
     * 按钮点击回调
     * @param event 
     */
    btnClickCallBack(event){
        switch(event.node.name){
            case 'mingpai':

            break
            case 'bujiao':
                GameDdzNetMgr.Instance.jiaoFen('0')
            break
            case 'buchu':
                GameDdzNetMgr.Instance.pass('')
                let pcvD = gameDdzPlayerCardControl.Instance.view.d_player_sp.getComponent(playerCardViewD)
                pcvD.resetTiShiPai()
            break
            case 'jiao':

            break
            case 'tishi':
                if (this.tishiCardArr.length > 0) {
                    if (this.tishiIndex >= this.tishiCardArr.length) {
                        this.tishiIndex = 0
                    }
                    let tishipai = this.tishiCardArr[this.tishiIndex]
                    //cc.log('打印提示的出牌组', tishipai)
                    let pcvD = gameDdzPlayerCardControl.Instance.view.d_player_sp.getComponent(playerCardViewD)
                    pcvD.setTiShiPai(tishipai)
                    this.tishiIndex ++
                }
                else{
                    this.tishiCardArr = this.getTiShiPai() //TiShiUtil.Instance.getTiShiCards(_sp,_sp.length,_op,_op.length, outCardType)
                    if (this.tishiCardArr.length > 0) {
                        if (this.tishiIndex >= this.tishiCardArr.length) {
                            this.tishiIndex = 0
                        }
                        let tishipai:ElementOfTiShiUtil = this.tishiCardArr[this.tishiIndex]
                        //cc.log('打印提示的出牌组', tishipai)
                        let pcvD = gameDdzPlayerCardControl.Instance.view.d_player_sp.getComponent(playerCardViewD)
                        pcvD.setTiShiPai(tishipai)
                        this.tishiIndex ++
                    }
                    else{
                        GameDdzNetMgr.Instance.pass('')
                        let pcvD = gameDdzPlayerCardControl.Instance.view.d_player_sp.getComponent(playerCardViewD)
                        pcvD.resetTiShiPai()
                    }
                }
            break
            case 'chupai':
                let d_sc = gameDdzPlayerCardControl.Instance.view.d_player_sp.getComponent(playerCardViewD)
                let xuhao = d_sc.getSelectShouPai()
                //cc.log('打印选中的手牌', xuhao)
                if (xuhao == '') {
                    return
                }
                GameDdzNetMgr.Instance.putPoker(xuhao)
            break
            case 'begin':
                //cc.log('点击开始游戏')
                let data = 'wait'
                GameDdzNetMgr.Instance.updatePlayerState(data)
            break
        }
    }

    /**
     * 叫分
     * @param event 
     */
    jiaoFenClickCallBack(event){
        switch(event.node.name){
            case '1fen':
                GameDdzNetMgr.Instance.jiaoFen('1')
            break
            case '2fen':
                GameDdzNetMgr.Instance.jiaoFen('2')
            break
            case '3fen':
                GameDdzNetMgr.Instance.jiaoFen('3')
            break
        }
    }

    /**
     * 展示操作界面
     * @param type 
     */
    showOperation(dir:number,type:number){
        this.tishiIndex = 0
        this.tishiCardArr = []
        this.setOperation(dir,type)
        this.show()
    }

    /**
     * 计时
     * @param data 
     */
    setLimitTime(data:string){
        let realSmg = data.split(',')
        if (realSmg.length > 0) {
            let dir:number = Number(realSmg[0])
            let time = realSmg[1] 
            this.setTimeShu(dir, time)
        }
    }

    /**
     * 设置操作类型
     * @param type 
     */
    setOperation(dir:number,type:number){
        //cc.log('打印出牌方位', dir, type)
        if (type == OperationType.kong) {
            for (let index = 0; index < 3; index++) {
                this.view.operationDir[index].active = false
            }
            return
        }
        for (let index = 0; index < 3; index++) {
            if (dir == index) {
                this.view.operationDir[index].active = true    
            }else{
                this.view.operationDir[index].active = false
            }
        }
        this.naozhongdir = dir
        ScheduleMgr.Instance.unschedule(this.addTimeFun, this.view)
        switch(dir){
            case DdzPlayerDirType.DOWN:
                this.view.d_mingpai.active = false
                this.view.d_bujiao.active = false
                this.view.d_buchu.active = false
                this.view.d_jiao.active = false
                this.view.d_tishi.active = false
                this.view.d_chupai.active = false
                this.view.d_begin.active = false
                this.view.d_naozhong.active = false
                this.view.d_jiaofen.active = false
                switch(type){
                    case OperationType.ready0:
                        this.view.d_begin.active = true
                        break
                    case OperationType.ready1:
                        this.view.d_begin.active = true
                        this.addTime(DdzPlayerDirType.DOWN)
                        this.view.d_naozhong.active = true
                        break
                    case OperationType.qingjiaofen:
                            this.addTime(DdzPlayerDirType.DOWN,5)
                            this.view.d_naozhong.active = true
                            this.view.d_bujiao.active = true
                            this.view.d_jiaofen.active = true
                            let fenshuarr = [1,2,3]
                            for (let index = 0; index < 3; index++) {
                                let fennode = this.view.d_jiaofen.getChildByName(String(index+1) + 'fen')
                                let fenshu = fenshuarr[index] 
                                if (fenshu > gameDdzPlayerInfoControl.Instance.jiaofenshu) {
                                    fennode.active = true
                                }else{
                                    fennode.active = false
                                }
                            }
                        break
                    case OperationType.qingchupai:
                        if (this.recordPlayerPass[1] == false && this.recordPlayerPass[2] == false) {
                            gameDdzPlayerCardControl.Instance.outPaiData = ''
                        }
                        else{
                            this.tishiCardArr = this.getTiShiPai()
                            this.view.d_tishi.active = true
                            this.view.d_buchu.active = true
                        }
                        this.addTime(DdzPlayerDirType.DOWN)
                        this.view.d_naozhong.active = true
                        this.view.d_chupai.active = true
                        let d_sc = gameDdzPlayerCardControl.Instance.view.d_player_sp.getComponent(playerCardViewD)
                        d_sc.resetOutPai()                       
                        break
                    default:
                        break
                }
            break
            case DdzPlayerDirType.RIGHT:
                let r_naozhong = this.view.operationDir[dir].getChildByName('naozhong')
                this.addTime(DdzPlayerDirType.RIGHT)
                r_naozhong.active = true
                switch(type){
                    case OperationType.qingchupai:
                        let r_sc = gameDdzPlayerCardControl.Instance.view.r_player_sp.getComponent(playerCardViewR)
                        r_sc.resetOutPai()
                    break
                }
            case DdzPlayerDirType.LEFT:
                let l_naozhong = this.view.operationDir[dir].getChildByName('naozhong')
                this.addTime(DdzPlayerDirType.LEFT)
                l_naozhong.active = true
                switch(type){
                    case OperationType.qingchupai:                            
                        let l_sc = gameDdzPlayerCardControl.Instance.view.l_player_sp.getComponent(playerCardViewL)
                        l_sc.resetOutPai()                            
                    break
                }
                break
            break
        }
    }

    /**获取提示牌 */
    getTiShiPai(){
        let sp = gameDdzPlayerCardControl.Instance.playermodel[DdzPlayerDirType.DOWN].getSprr()
        let outCards = gameDdzPlayerCardControl.Instance.outPaiData
        //cc.log('打印提示出牌', this.tishiCardArr)
        let outData = outCards.split(';')
        let outCardType =Number(outData[1])
        let op = outData[2].split(',')
        let _sp:Array<number> = []
        let _op:Array<number> = []
        for (let index = 0; index < sp.length; index++) {
            _sp[index] = Number(sp[index])
        }
        for (let index = 0; index < op.length; index++) {
            _op[index] = Number(op[index])
        }
        return TiShiUtil.Instance.getTiShiCards(_sp,_sp.length,_op,_op.length, outCardType)
    }

    addTime(dir:number,_time?:number){
        let countTime:number = 0
        
        if (_time) {
            countTime = _time
            this.cutTime = _time
        }else{
            this.cutTime = 18
            countTime = 18
        }

        let target = this.view

        let naozhongshu = this.view.operationDir[dir].getChildByName('naozhong').getChildByName('shu').getComponent(cc.Label)
        naozhongshu.string = String(countTime)
        ScheduleMgr.Instance.schedule(this.addTimeFun, target, 1, countTime)
    }

    addTimeFun(){
        //cc.log('打印计时器回调', gameDdzOperationControl.Instance.cutTime)
        gameDdzOperationControl.Instance.cutTime = gameDdzOperationControl.Instance.cutTime - 1
        if (gameDdzOperationControl.Instance.cutTime <= 0) {
            gameDdzOperationControl.Instance.cutTime = 0
        }
        else if (gameDdzOperationControl.Instance.cutTime < 5) {
            GameAudioMgr.Instance.PlaySound('timer')
        }
        let data = String(gameDdzOperationControl.Instance.naozhongdir) + ',' + String(gameDdzOperationControl.Instance.cutTime) 
        gameDdzOperationControl.Instance.setLimitTime(data)
    }

    /**
     * 设置计时数
     * @param num 
     */
    setTimeShu(dir:number ,num:string|number){
        for (let index = 0; index < this.view.naozhongArr.length; index++) {
            const element = this.view.naozhongArr[index];
            if (dir == index) {
                element.active = true
                let shu = element.getChildByName('shu').getComponent(cc.Label)
                shu.string = String(num)
            }
            else{
                element.active = false
            }
        }
    }

    hideTime(dir:number){
        let element = this.view.naozhongArr[dir];
        element.active = false
    }

    /**
     * 隐藏计时
     * @param dir 
     */
    hideLimitTime(dir:number){
        this.hideTime(dir)
    }

    /**重置 */
    resetData(){
        this.view.resetData()
    }

    /**show view*/
    show(){
        this.view.show()
    }

    /**hide view */
    hide(){
        this.view.hide()
    }
}

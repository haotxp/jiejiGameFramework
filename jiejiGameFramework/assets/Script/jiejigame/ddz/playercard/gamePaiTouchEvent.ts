
import Utility from "../../../utils/Utility";
import gameDdzPlayerCardControl from "./gameDdzPlayerCardControl";
import playerCardViewD from "./playerCardViewD";


const {ccclass, property} = cc._decorator;

@ccclass
export default class gamePaiTouchEvent extends cc.Component {

    isMoveUp:boolean = false

    selectXuHao:number = -1

    public isSelect:boolean = false

    

    private begin_pos:cc.Vec2
    private end_pos:cc.Vec2

    start () {
        this.isMoveUp = false
        this.isSelect = false
        this.selectXuHao = -1

        this.node.on('click', this.click, this)
    }

    public click(event){
        this.isSelect = !this.isSelect
        cc.log('点击牌', this.isSelect)
        this.setIsSelect(this.isSelect)
    }

    /**设置是否选中 */
    public setIsSelect(select:boolean){
        this.isSelect = select
        if (this.isSelect == true) {
            let poy = this.node.y
            this.node.y = poy + 30
            this.isMoveUp = true
            this.node.color = cc.Color.GRAY
        }
        else {
            let poy = this.node.y
            this.node.y = poy - 30
            this.isMoveUp = false
            this.node.color = cc.Color.WHITE
        }
    }

    public getIsSelect(){
        return this.isSelect
    }
}

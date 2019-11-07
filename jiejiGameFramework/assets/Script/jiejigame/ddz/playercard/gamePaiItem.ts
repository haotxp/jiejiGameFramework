

const {ccclass, property} = cc._decorator;

@ccclass
export default class gamePaiItem extends cc.Component {
    private paimian:string = null
    shePaiMian(mian:string){
        //cc.log('加载牌面', mian)
        let pai = this.getComponent(cc.Sprite)
        pai.spriteFrame = null
        let paiPath = 'pai/' + mian
        cc.loader.loadRes(paiPath, cc.SpriteFrame, function(err, asset){
            if (err) {
                cc.log('加载牌面资源出错')
                return
            }
            pai.spriteFrame = asset
        }.bind(this))
        this.paimian = mian
        this.node.y = 0
    }

    /**获取牌面 */
    getPaiMian(){
        return this.paimian
    }
}

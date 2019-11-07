/**玩家牌数据存储 */

export default class gameDdzPlayerModel {
    public dir:number = -1

    /**手牌 */
    private sprr:Array<string>

    /**出牌 */
    private outrr:Array<string>

    /**牌数 */
    private spAmount:number = 0
    
    constructor(dir:number){
        this.dir = dir
        this.resetData()
    }

    /**重置 */
    resetData(){
        this.sprr = []
        this.outrr = []
        this.spAmount = 0
    }

    /**
     * 设置手牌
     * @param data 
     */
    setSprr(data:string){
        let pai = data.split('.')
        this.sprr = pai
        //cc.log('打印手牌', this.sprr)
        this.sortSprr()
        this.setSpAmount(this.sprr.length)
    }

    /**获取手牌 */
    getSprr(){
        return this.sprr
    }

    /**
     * 添加一张手牌
     * @param no 
     */
    addSprr(no:string){
        this.sprr.push(no)
        this.sortSprr()
    }

    /**
     * 删除一张手牌
     * @param no 
     */
    popSprr(no:string){
        for (let index = 0; index < this.sprr.length; index++) {
            const element = this.sprr[index];
            if (element == no) {
                this.sprr.splice(index, 1)
            }
        }
    }

    /**设置牌数 */
    setSpAmount(shu:number){
        this.spAmount = this.spAmount + shu
    }

    /**获取手牌数量 */
    getSpAmount(){
        return this.spAmount
    }
    
    /**对 手牌排序 低--高  dir = 1 高--低 */
    sortSprr(){
        for(let i=0;i<this.sprr.length;i++){
            let tem:string = ''
            for(let j=i+1;j<this.sprr.length;j++){
                let sp1 = this.getCardLogicValue(Number(this.sprr[i]))
                let sp2 = this.getCardLogicValue(Number(this.sprr[j]))
                //cc.log('打印逻辑数字', sp1, sp2)
               if(sp1 < sp2){
                   tem = this.sprr[j];
                   this.sprr[j]= this.sprr[i];
                   this.sprr[i] = tem;
               }
            }
        }
    }

    private getCardLogicValue(bCardData:number):number
    {
        var cardColor:number=this.getCardColor(bCardData);
        var cardValue:number=this.getCardValue(bCardData);
        //cc.log('打印', cardColor, cardValue)
        if(cardColor == 0x40)
        {
            return cardValue+0x10; 
        }
        if(cardValue==1)
        {
            return 14;
        }
        return ((cardValue!=2)?cardValue : (cardValue +14));
    }
    private getCardValue(bcardData:number):number
    {
        return (bcardData&15)
    }
    
    private getCardColor(bcardData:number):number
    {
        return (bcardData&240)
    }
}

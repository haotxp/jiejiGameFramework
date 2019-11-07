
export class TagAnalyseResultUtil
{
    /**对子的个数*/
    public bDoubleCount:number;   
    /**存放对子的点数 */ 
    public bDoubleLogicVolue:Array<any>= new Array(20);  
    /**四张牌的个数*/
    public bFourCount:number;
    public bFourLogicVolue :Array<any>=new Array(5);//] new byte[5];
    /**单张牌的个数*/
    public bSignedCount:number;
    public bSingleLogicVolue:Array<any> =new Array(20);
    /**三张牌的个数*/
    public bThreeCount:number;
    public bThreeLogicVolue :Array<any> =  new Array(6);
    /**存放对子牌的数据*/
    public m_bDCardData:Array<any>  = new Array(20);        
    /**存放四张牌的数据*/
    public m_bFCardData:Array<any>  = new Array(20);
    /**存放单牌的数据*/
    public m_bSCardData:Array<any>  = new Array(20);
    /**存放三张牌的数据*/
    public m_bTCardData:Array<any>  = new Array(20);

    constructor(){
        this.init()
    }
    
    public init():void
    {
        this.bFourCount = 0;                        //将个数初始化为0
        this.bThreeCount = 0;
        this.bDoubleCount = 0;
        this.bSignedCount = 0;
        var index :number= 0;
        for (index = 0; index < 5; index++)        //将存放点数的数组的内容初始化为0
        {
            this.bFourLogicVolue[index] = 0;
        }
        for (index = 0; index < 6; index++)
        {
            this.bThreeLogicVolue[index] = 0;
        }
        for (index = 0; index < 10; index++)
        {
            this.bDoubleLogicVolue[index] = 0;
        }
        for (index = 0; index < 20; index++)     //将存放牌的分析结果的数组内容初始化为0
        {
            this.m_bSCardData[index] = 0;      
            this.m_bDCardData[index] = 0;
            this.m_bTCardData[index] = 0;
            this.m_bFCardData[index] = 0;
            this.bSingleLogicVolue[0] = 0;
        }
    }
}

import { GameLogicUtil } from "./GameLogicUtil";
import { TagAnalyseResultUtil } from "./TagAnalyseResultUtil";
import { ElementOfTiShiUtil } from "./ElementOfTiShiUtil";

/**
 * 出牌提示
 */

export default class TiShiUtil {
    public gc:GameLogicUtil=new GameLogicUtil();
    public AnalyseResult:TagAnalyseResultUtil = new TagAnalyseResultUtil();
    public tishi:Array<any>= new Array();

    public static _instance:TiShiUtil = null
    public static get Instance(){
        if (this._instance == null) {
            this._instance = new TiShiUtil()
        }
        return this._instance
    }

    /**
     * 提示可出的牌的数组
     * @param cardData自己手牌数组
     * @param cardCount自己手牌数组长度
     * @param outCards上家出牌数组
     * @param outCount上家出牌数组长度
     * @return 
     * 
     */		
    public getTiShiCards(cardData:Array<any>,cardCount:number,outCards:Array<any>, outCount:number, cardType:number)
    {
        this.tishi=new Array();
        this.AnalyseResult.init();
        //this.gc.SorteCard(cardData, cardCount);
        //this.gc.SorteCard(outCards, outCount);
        this.gc.AnalysebCardData(cardData, cardCount, this.AnalyseResult);
        
        switch(cardType){ //this.gc.GetCardType(outCards)
            case 1: //单牌
                this.checkSingleCards(outCards, outCount, this.tishi, this.AnalyseResult);
                this.checkFourCards(outCards, outCount, this.tishi, this.AnalyseResult);
                break;
            case 2: //对牌
                this.checkDoubleCards(outCards, outCount, this.tishi, this.AnalyseResult);
                this.checkFourCards(outCards, outCount, this.tishi, this.AnalyseResult);
                break;
            case 3: //三张
                this.checkThreeZeroCards(outCards, outCount, this.tishi, this.AnalyseResult);
                this.checkFourCards(outCards, outCount, this.tishi, this.AnalyseResult);
                break;
            case 4: //单顺
                this.checkSingleShunCards(outCards, outCount, this.tishi, this.AnalyseResult);
                this.checkFourCards(outCards, outCount, this.tishi, this.AnalyseResult);
                break;
            case 5: //连对
                this.checkLianDuiCards(outCards, outCount, this.tishi, this.AnalyseResult);
                this.checkFourCards(outCards, outCount, this.tishi, this.AnalyseResult);
                break;
            case 6: //飞机
                this.checkFlyZeroCards(outCards, outCount, this.tishi, this.AnalyseResult);
                this.checkFourCards(outCards, outCount, this.tishi, this.AnalyseResult);
                break;
            case 7: //飞机带一张
                this.checkFlyOneCards(outCards, outCount, this.tishi, this.AnalyseResult);
                this.checkFourCards(outCards, outCount, this.tishi, this.AnalyseResult);
                break;
            case 8: //飞机带两张
                this.checkFlyTwoCards(outCards, outCount, this.tishi, this.AnalyseResult);
                this.checkFourCards(outCards, outCount, this.tishi, this.AnalyseResult);
                break;	
            case 9: //四带二
                this.checkFourTwoCards(outCards, outCount, this.tishi, this.AnalyseResult);
                this.checkFourCards(outCards, outCount, this.tishi, this.AnalyseResult);
                break;
            case 10: //四带两对
                this.checkFourTwoDuiCards(outCards, outCount, this.tishi, this.AnalyseResult);
                this.checkFourCards(outCards, outCount, this.tishi, this.AnalyseResult);
                break;
            case 11: //和其他炸弹比大小
                this.checkFourZeroCards(outCards, outCount, this.tishi, this.AnalyseResult);
                break;	
            case 12: 
                break;
            case 13: //三带一
                this.checkThreeOneCards(outCards, outCount, this.tishi, this.AnalyseResult);
                this.checkFourCards(outCards, outCount, this.tishi, this.AnalyseResult);
                break;
            case 14: //三带二
                this.checkThreeTwoCards(outCards, outCount, this.tishi, this.AnalyseResult);
                this.checkFourCards(outCards, outCount, this.tishi, this.AnalyseResult);
                break;
            
        }
        
        var count:number=0;//判断是否有火箭
        for(var b:number=0;b<cardData.length;b++){
            if(cardData[b]== 65 || cardData[b]== 66){
                count++;
            }
        }
        if(count>=2){
            var elem:ElementOfTiShiUtil=new ElementOfTiShiUtil();
            elem.cards.push(Number(65));
            elem.cards.push(Number(66));
            this.tishi.push(elem);
        }
        return this.tishi;
    }
    

    /**
     * 三张 
     * @param outCards
     * @param outCount
     * @param tishi
     * @param result
     * 
     */		
    public checkThreeZeroCards(outCards:Array<any>, outCount:number,tishi:Array<any>,result:TagAnalyseResultUtil):void{
        for (var i:number = result.bThreeCount-1; i >=0 ; i--) {
            if(result.bThreeLogicVolue[i]>this.gc.GetCardLogicValue(outCards[0])){
                var elem:ElementOfTiShiUtil=new ElementOfTiShiUtil();
                elem.cards.push(result.m_bTCardData[i*3]);
                elem.cards.push(result.m_bTCardData[i*3+1]);
                elem.cards.push(result.m_bTCardData[i*3+2]);
                tishi.push(elem);
            }
        }
    }
    /**
     * 三带一 
     * @param outCards
     * @param outCount
     * @param tishi
     * @param result
     * 
     */		
    public checkThreeOneCards(outCards:Array<any>, outCount:number,tishi:Array<any>, result:TagAnalyseResultUtil):void{
        var result1:TagAnalyseResultUtil=new TagAnalyseResultUtil();
        this.gc.SorteCard(outCards, outCount);
        this.gc.AnalysebCardData(outCards, outCount, result1);
        
        for (var i:number = result.bThreeCount-1; i >=0 ; i--) {
            if(result.bThreeLogicVolue[i]>result1.bThreeLogicVolue[0]){
                var elem:ElementOfTiShiUtil=new ElementOfTiShiUtil();
                elem.cards.push(result.m_bTCardData[i*3]);
                elem.cards.push(result.m_bTCardData[i*3+1]);
                elem.cards.push(result.m_bTCardData[i*3+2]);
                
                if(result.bSignedCount>0 && result.bSingleLogicVolue[result.bSignedCount-1]<17){
                    elem.cards.push(result.m_bSCardData[result.bSignedCount-1]);					
                }else if(result.bDoubleCount>0){
                    elem.cards.push(result.m_bDCardData[(result.bDoubleCount-1)*2]);					
                }else if(result.bFourCount>0){
                    elem.cards.push(result.m_bFCardData[(result.bFourCount-1)*4]);					
                }
                tishi.push(elem);				
            }
        }
    }
    /**
     * 三带二 
     * @param outCards
     * @param outCount
     * @param tishi
     * @param result
     * 
     */		
    public checkThreeTwoCards( outCards:Array<any>, outCount:number,tishi:Array<any>, result:TagAnalyseResultUtil):void{
        var result1:TagAnalyseResultUtil=new TagAnalyseResultUtil();
        this.gc.SorteCard(outCards, outCount);
        this.gc.AnalysebCardData(outCards, outCount, result1);
        
        for (var i  :number= result.bThreeCount-1; i >=0 ; i--) {
            if(result.bThreeLogicVolue[i]>result1.bThreeLogicVolue[0]){
                var elem:ElementOfTiShiUtil=new ElementOfTiShiUtil();
                elem.cards.push(result.m_bTCardData[i*3]);
                elem.cards.push(result.m_bTCardData[i*3+1]);
                elem.cards.push(result.m_bTCardData[i*3+2]);
                
                if(result.bDoubleCount>0){
                    elem.cards.push(result.m_bDCardData[(result.bDoubleCount-1)*2]);
                    elem.cards.push(result.m_bDCardData[(result.bDoubleCount-1)*2+1]);
                    tishi.push(elem);
                }else if(result.bFourCount>0){
                    elem.cards.push(result.m_bFCardData[(result.bFourCount-1)*4]);
                    elem.cards.push(result.m_bFCardData[(result.bFourCount-1)*4+1]);
                    tishi.push(elem);
                }
            }
        }
    }
    /**
     * 飞机 
     * @param outCards
     * @param outCount
     * @param tishi
     * @param result
     * 
     */		
    public checkFlyZeroCards(outCards:Array<any>, outCount:number, tishi:Array<any>, result:TagAnalyseResultUtil):void
    {
        var result1:TagAnalyseResultUtil=new TagAnalyseResultUtil();
        this.gc.SorteCard(outCards, outCount);
        this.gc.AnalysebCardData(outCards, outCount, result1);
        
        var index:number = result.bThreeCount-1;
        for (var i :number= index; i >= (result1.bThreeCount-1); i--) {
            if(result.bThreeLogicVolue[i]>result1.bThreeLogicVolue[result1.bThreeCount-1])
            {
                if(result.bThreeLogicVolue[i]==(result.bThreeLogicVolue[i-result1.bThreeCount+1]-(result1.bThreeCount-1)))
                {				
                    var elem:ElementOfTiShiUtil=new ElementOfTiShiUtil();
                    for (var j2:number = 0; j2 < result1.bThreeCount; j2++)
                    {
                        elem.cards.push(result.m_bTCardData[(i-j2)*3]);
                        elem.cards.push(result.m_bTCardData[(i-j2)*3+1]);
                        elem.cards.push(result.m_bTCardData[(i-j2)*3+2]);
                    }
                    tishi.push(elem);
                }
            }
        }
    }
    
    /**
     * 飞机带一张 
     * @param outCards
     * @param outCount
     * @param tishi
     * @param result
     * 
     */		
    public checkFlyOneCards(outCards:Array<any>,outCount:number,tishi:Array<any>,result:TagAnalyseResultUtil):void
    {
        var result1:TagAnalyseResultUtil=new TagAnalyseResultUtil();
        this.gc.SorteCard(outCards, outCount);
        this.gc.AnalysebCardData(outCards, outCount, result1);
        
        var index:number = result.bThreeCount-1;
        for (var i :number= index; i >= (result1.bThreeCount-1); i--) 
        {
            if(result.bThreeLogicVolue[i]>result1.bThreeLogicVolue[result1.bThreeCount-1])
            {
                
                if(result.bThreeLogicVolue[i]==(result.bThreeLogicVolue[i-result1.bThreeCount+1]-(result1.bThreeCount-1)))
                {				
                    var elem:ElementOfTiShiUtil=new ElementOfTiShiUtil();
                    for (var j2:number = 0; j2 < result1.bThreeCount; j2++)
                    {
                        elem.cards.push(result.m_bTCardData[(i-j2)*3]);
                        elem.cards.push(result.m_bTCardData[(i-j2)*3+1]);
                        elem.cards.push(result.m_bTCardData[(i-j2)*3+2]);
                    }
                    var arr:Array<any>=new Array();
                    for (var j:number = 0; j < result.bSignedCount; j++)
                    {
                        arr.push(result.m_bSCardData[j]);
                    }
                    
                    for (var q:number = 0; q < result.bDoubleCount*2; q++)
                    {
                        arr.push(result.m_bDCardData[q]);
                    }
                    
                    for (var w:number = 0; w < result.bFourCount*4; w++)
                    {
                        arr.push(result.m_bFCardData[w]);
                    }
                    
                    this.gc.SorteCardArray(arr);
//						ShowCards.show(arr,arr.length);
                    if(arr.length>=result1.bThreeCount)
                    {
                        for (var e:number = 1; e <= result1.bThreeCount; e++)
                        {
                            elem.cards.push(arr[arr.length-e]);
                        }
                        tishi.push(elem);	
                    }
                    
                }
            }
        }
    }
    /**
     * 飞机带对 
     * @param outCards
     * @param outCount
     * @param tishi
     * @param result
     * 
     */		
    public checkFlyTwoCards(outCards:Array<any>, outCount:number, tishi:Array<any>, result:TagAnalyseResultUtil):void
    {
        var result1:TagAnalyseResultUtil=new TagAnalyseResultUtil();
        this.gc.SorteCard(outCards, outCount);
        this.gc.AnalysebCardData(outCards, outCount, result1);
        
        var index:number = result.bThreeCount-1;
        for (var i:number = index; i >= (result1.bThreeCount-1); i--) {
            if(result.bThreeLogicVolue[i]>result1.bThreeLogicVolue[result1.bThreeCount-1]){
                
                if(result.bThreeLogicVolue[i]==(result.bThreeLogicVolue[i-result1.bThreeCount+1]-(result1.bThreeCount-1))){				
                    var elem:ElementOfTiShiUtil=new ElementOfTiShiUtil();
                    for (var j2:number = 0; j2 < result1.bThreeCount; j2++) {
                        elem.cards.push(result.m_bTCardData[(i-j2)*3]);
                        elem.cards.push(result.m_bTCardData[(i-j2)*3+1]);
                        elem.cards.push(result.m_bTCardData[(i-j2)*3+2]);
                    }
                    if(result.bDoubleCount>=result1.bThreeCount){
                        for (var j:number = 1; j <= result1.bThreeCount; j++) {
                            elem.cards.push(result.m_bDCardData[(result.bDoubleCount-j)*2]);
                            elem.cards.push(result.m_bDCardData[(result.bDoubleCount-j)*2+1]);
                        }
                        tishi.push(elem);
                    }
                }
            }
        }
    }
    /**
     * 要和其他的炸弹比大小
     * @param outCards
     * @param outCount
     * @param tishi
     * @param result
     * 
     */		
    public checkFourZeroCards(outCards:Array<any>, outCount:number,tishi:Array<any>, result:TagAnalyseResultUtil):void
    {//要和其他的炸弹比大小
        for (var i :number= result.bFourCount-1; i >=0 ; i--) {
            if(result.bFourLogicVolue[i]>this.gc.GetCardLogicValue(outCards[0])){
                var elem:ElementOfTiShiUtil=new ElementOfTiShiUtil();
                elem.cards.push(result.m_bFCardData[i*4]);
                elem.cards.push(result.m_bFCardData[i*4+1]);
                elem.cards.push(result.m_bFCardData[i*4+2]);
                elem.cards.push(result.m_bFCardData[i*4+3]);
                tishi.push(elem);
            }
        }
    }
    /**
     * 和非炸弹的牌型比大小
     * @param outCards
     * @param outCount
     * @param tishi
     * @param result
     * 
     */		
    public checkFourCards(outCards:Array<any>, outCount:number,tishi:Array<any>, result:TagAnalyseResultUtil):void
    {//和非炸弹的牌型比大小
        for (var i :number= result.bFourCount-1; i >=0 ; i--) {			
            var elem:ElementOfTiShiUtil=new ElementOfTiShiUtil();
            elem.cards.push(result.m_bFCardData[i*4]);
            elem.cards.push(result.m_bFCardData[i*4+1]);
            elem.cards.push(result.m_bFCardData[i*4+2]);
            elem.cards.push(result.m_bFCardData[i*4+3]);
            tishi.push(elem);	
            
        }
    }
    /**
     * 四带二
     * @param outCards
     * @param outCount
     * @param tishi
     * @param result
     * 
     */		
    public checkFourTwoCards(outCards:Array<any>, outCount:number,tishi:Array<any>, result:TagAnalyseResultUtil):void
    {//四带二
        var result1:TagAnalyseResultUtil=new TagAnalyseResultUtil();
        this.gc.SorteCard(outCards, outCount);
        this.gc.AnalysebCardData(outCards, outCount, result1);
        
        for (var i:number =  result.bFourCount-1; i >0; i--) {
            if(result.bFourLogicVolue[i]>result1.bFourLogicVolue[0]){
                var elem:ElementOfTiShiUtil=new ElementOfTiShiUtil();
                elem.cards.push(result.m_bFCardData[i*4]);
                elem.cards.push(result.m_bFCardData[i*4+1]);
                elem.cards.push(result.m_bFCardData[i*4+2]);
                elem.cards.push(result.m_bFCardData[i*4+3]);
                
                if(result.bSignedCount>=2 && result.bSingleLogicVolue[result.bSignedCount-2]<17){
                    elem.cards.push(result.m_bSCardData[result.bSignedCount-1]);
                    elem.cards.push(result.m_bSCardData[result.bSignedCount-2]);
                    tishi.push(elem);
                }else if(result.bDoubleCount>0){
                    elem.cards.push(result.m_bDCardData[(result.bDoubleCount-1)*2]);
                    elem.cards.push(result.m_bDCardData[(result.bDoubleCount-1)*2+1]);
                    tishi.push(elem);
                }
            }
        }
    }
    /**
     * 四带两对
     * @param outCards
     * @param outCount
     * @param tishi
     * @param result
     * 
     */		
    public checkFourTwoDuiCards(outCards:Array<any>, outCount:number,tishi:Array<any>, result:TagAnalyseResultUtil):void
    {
        var result1:TagAnalyseResultUtil=new TagAnalyseResultUtil();
        this.gc.SorteCard(outCards, outCount);
        this.gc.AnalysebCardData(outCards, outCount, result1);
        
        for (var i :number= result.bFourCount-1; i >=0 ; i--) {
            if(result.bFourLogicVolue[i]>result1.bFourLogicVolue[0]){
                var elem:ElementOfTiShiUtil=new ElementOfTiShiUtil();
                elem.cards.push(result.m_bFCardData[i*4]);
                elem.cards.push(result.m_bFCardData[i*4+1]);
                elem.cards.push(result.m_bFCardData[i*4+2]);
                elem.cards.push(result.m_bFCardData[i*4+3]);
                
                if(result.bDoubleCount>=2){
                    elem.cards.push(result.m_bDCardData[(result.bDoubleCount-1)*2]);
                    elem.cards.push(result.m_bDCardData[(result.bDoubleCount-1)*2+1]);
                    elem.cards.push(result.m_bDCardData[(result.bDoubleCount-2)*2]);
                    elem.cards.push(result.m_bDCardData[(result.bDoubleCount-2)*2+1]);
                    tishi.push(elem);
                }
            }
        }
    }
    /**
     * 连队 
     * @param outCards
     * @param outCount
     * @param tishi
     * @param result
     * 
     */		
    public checkLianDuiCards(outCards:Array<any>,outCount:number,tishi:Array<any>,result:TagAnalyseResultUtil):void
    {
        var result1:TagAnalyseResultUtil=new TagAnalyseResultUtil();
        this.gc.SorteCard(outCards, outCount);
        this.gc.AnalysebCardData(outCards, outCount, result1); 
        
        var i:number=0;
        var j:number=0;
        var j2:number=0;
        var j3:number=0;
        var j4:number=0;
        
        for (i = 0; i < result.bThreeCount; i++) {   //将三个的给放到对子的result中
            j = 0;
            for (j = 0; j < result.bDoubleCount; j++) {
                if(result.bThreeLogicVolue[i] > result.bDoubleLogicVolue[j]){
                    for (j2 = result.bDoubleCount*2-1; j2 > j*2-1; j2--) {
                        result.m_bDCardData[j2+2]=result.m_bDCardData[j2];						
                    }
                    result.m_bDCardData[j*2]=result.m_bTCardData[i*3];
                    result.m_bDCardData[j*2+1]=result.m_bTCardData[i*3+1];
                    
                    for (j3 = result.bDoubleCount-1; j3 > j-1; j3--) {
                        result.bDoubleLogicVolue[j3+1]=result.bDoubleLogicVolue[j3];
                    }
                    result.bDoubleLogicVolue[j]=result.bThreeLogicVolue[i];
                    
                    result.bDoubleCount++;
                    
                    break;
                }
            }
            if(j == result.bDoubleCount){
                result.m_bDCardData[j*2]=result.m_bTCardData[i*3];
                result.m_bDCardData[j*2+1]=result.m_bTCardData[i*3+1];
                
                result.bDoubleLogicVolue[j]=result.bThreeLogicVolue[i];
                result.bDoubleCount++;
            }
        }
        //将四个的给放到对子的result中
        for (i = 0; i < result.bFourCount; i++) 
        {  
            j = 0;
            for (j = 0; j < result.bDoubleCount; j++) {
                if(result.bFourLogicVolue[i] > result.bDoubleLogicVolue[j]){
                    for (j2 = result.bDoubleCount*2-1; j2 > j*2-1; j2--) 
                    {
                        result.m_bDCardData[j2+2]=result.m_bDCardData[j2];						
                    }
                    result.m_bDCardData[j*2]=result.m_bFCardData[i*4];
                    result.m_bDCardData[j*2+1]=result.m_bFCardData[i*4+1];
                    
                    for (j2 = result.bDoubleCount-1; j2 > j-1; j2--) 
                    {
                        result.bDoubleLogicVolue[j2+1]=result.bDoubleLogicVolue[j2];
                    }
                    result.bDoubleLogicVolue[j]=result.bFourLogicVolue[i];
                    
                    result.bDoubleCount++;
                    
                    break;
                }
            }
            if(j == result.bDoubleCount){
                result.m_bDCardData[j*2]=result.m_bFCardData[i*4];
                result.m_bDCardData[j*2+1]=result.m_bFCardData[i*4+1];
                
                result.bDoubleLogicVolue[j]=result.bFourLogicVolue[i];
                result.bDoubleCount++;
            }
        }
        //
        
        var index:number = result.bDoubleCount-1;
        
        for (var d:number = index; d >= (result1.bDoubleCount-1); d--) {
            if(result.bDoubleLogicVolue[d]>result1.bDoubleLogicVolue[result1.bDoubleCount-1]){
                
                if(result.bDoubleLogicVolue[d]==(result.bDoubleLogicVolue[d-result1.bDoubleCount+1]-(result1.bDoubleCount-1))){				
                    var elem:ElementOfTiShiUtil=new ElementOfTiShiUtil();
                    for (j4 = 0; j4 < result1.bDoubleCount; j4++) {
                        elem.cards.push(result.m_bDCardData[(d-j4)*2]);
                        elem.cards.push(result.m_bDCardData[(d-j4)*2+1]);
                        
                    }
                    tishi.push(elem);
                }
            }
        }
    }
    
    /**
     * 检查单张牌 
     * @param outCards
     * @param outCount
     * @param tishi
     * @param result
     * 
     */		
    public checkSingleCards(outCards:Array<any>, outCount:number, tishi:Array<any>, result:TagAnalyseResultUtil):void
    {
        
        var arr:Array<any>=new Array();
        for (var i:number = 0; i < result.bSignedCount; i++) {
            arr.push(result.m_bSCardData[i]);
        }
        for (var j:number = 0; j < result.bDoubleCount;j++) {
            if(arr.indexOf(result.m_bDCardData[j*2])<0){
                arr.push(result.m_bDCardData[j*2]);
            }
        }
        for (var q:number = 0; q < result.bThreeCount; q++) {
            if(arr.indexOf(result.m_bTCardData[q*3])<0){
                arr.push(result.m_bTCardData[q*3]);
            }
        }
        for (var w:number = 0; w < result.bFourCount; w++) {
            if(arr.indexOf(result.m_bFCardData[w*4])<0){
                arr.push(result.m_bFCardData[w*4]);
            }
        }    	
        this.gc.SorteCard(arr,arr.length);
        for (var e:number = arr.length-1; e >=0 ; e--) {
            if(this.gc.GetCardLogicValue(arr[e])>this.gc.GetCardLogicValue(outCards[0])){
                var elem1:ElementOfTiShiUtil=new ElementOfTiShiUtil();
                elem1.cards.push(arr[e]);
                tishi.push(elem1);
            }
        }
        
    }
    /**
     * 查两张牌 
     * @param outCards
     * @param outCount
     * @param tishi
     * @param result
     * 
     */		
    public checkDoubleCards(outCards:Array<any>, outCount:number, tishi:Array<any>, result:TagAnalyseResultUtil):void
    {
        for (var i:number = result.bDoubleCount-1; i >=0 ; i--) {
            if(result.bDoubleLogicVolue[i]>this.gc.GetCardLogicValue(outCards[0])){
                var elem:ElementOfTiShiUtil=new ElementOfTiShiUtil();
                elem.cards.push(result.m_bDCardData[i*2]);
                elem.cards.push(result.m_bDCardData[i*2+1]);
                tishi.push(elem);
            }
        }
        for (var q:number = result.bThreeCount-1; q >=0 ; q--) {
            if(result.bThreeLogicVolue[q]>this.gc.GetCardLogicValue(outCards[0])){
                var elem2:ElementOfTiShiUtil=new ElementOfTiShiUtil();
                elem2.cards.push(result.m_bTCardData[q*3]);
                elem2.cards.push(result.m_bTCardData[q*3+1]);
                tishi.push(elem2);
            }
        }
    }
    /**
     * 单顺
     * @param outCards
     * @param outCount
     * @param tishi
     * @param result
     * 
     */		
    public checkSingleShunCards(outCards:Array<any>,outCount:number,tishi:Array<any>,result:TagAnalyseResultUtil):void
    {
        var res:TagAnalyseResultUtil=new TagAnalyseResultUtil();
        this.gc.SorteCard(outCards, outCount);
        this.gc.AnalysebCardData(outCards, outCount, res); 
        
        var arr:Array<any>=new Array();
        /** 去掉大小王 */
        for (var i :number = 0; i < result.bSignedCount; i++) {
            if(result.m_bSCardData[i] != 65 && result.m_bSCardData[i] != 66){
                arr.push(result.m_bSCardData[i]);
            }
        }
        for (var q:number = 0; q < result.bDoubleCount; q++) {
            if(arr.indexOf(result.m_bDCardData[q*2])<0){
                arr.push(result.m_bDCardData[q*2]);
            }
        }
        for (var w:number  = 0; w < result.bThreeCount; w++) {
            if(arr.indexOf(result.m_bTCardData[w*3])<0){
                arr.push(result.m_bTCardData[w*3]);
            }
        }
        for (var e :number= 0; e < result.bFourCount; e++) {
            if(arr.indexOf(result.m_bFCardData[e*4])<0){
                arr.push(result.m_bFCardData[e*4]);
            }
        }    	
        /** 排序 */
        this.gc.SorteCard(arr,arr.length);
        
        var index :number= arr.length-1;
        var len:number =  res.bSignedCount-1;
        
        for (var r:number= index; r >= len;r--)
        {
            var PokV:number = this.gc.GetCardLogicValue(arr[r]);
            
            if(PokV > res.bSingleLogicVolue[len])
            {
                
                var pkCount:number = arr[r-res.bSignedCount+1];
                
                var num2:number = this.gc.GetCardLogicValue(pkCount) - len;
                
                if(PokV==num2)
                {
                    var elem:ElementOfTiShiUtil=new ElementOfTiShiUtil();
                    for (var j2:number = 0; j2 < res.bSignedCount; j2++) 
                    {
                        elem.cards.push(arr[r-j2]);		
                    }
                    tishi.push(elem);
                }
            }
        }
    }
}






// /**
    //  * 获取出牌提示
    //  * @param cardData 自己手牌
    //  * @param outCardDdata  服务器下发的出牌数据 
    //  * 方位；牌型；牌组[]
    //  * 2;13;52,51,35,19
    //  */
    // public getTiShiCards(cardData:Array<string>, outCardData:string){
    //     let tishi:Array<string> = []
    //     let outData = outCardData.split(';')
    //     let outCardType =Number(outData[1])
    //     let outCards = outData[2].split(',')
    //     switch(outCardType){
    //         case 1: //单张
    //             this.checkSingleCards(cardData, outCards, tishi)
    //         break
    //     }

    //     return tishi
    // }


    // /**
    //  * 检查单张牌
    //  * @param cardData 
    //  * @param outCards 
    //  * @param tishi 
    //  */
    // private checkSingleCards(cardData:Array<string>, outCards:Array<string>, tishi:Array<string>){
    //     let outcard = Number(outCards[0])
    //     for (let index = 0; index < cardData.length; index++) {
    //         let card = Number(cardData[index])
    //         if (this.getCardLogicValue(card) > this.getCardLogicValue(outcard)) {
    //             tishi.push(cardData[index])
    //         }
    //     }
    // }


    // private getCardLogicValue(bCardData:number):number
    // {
    //     var cardColor:number=this.getCardColor(bCardData);
    //     var cardValue:number=this.getCardValue(bCardData);
    //     //cc.log('打印', cardColor, cardValue)
    //     if(cardColor == 0x40)
    //     {
    //         return cardValue+0x10; 
    //     }
    //     if(cardValue==1)
    //     {
    //         return 14;
    //     }
    //     return ((cardValue!=2)?cardValue : (cardValue +14));
    // }
    // private getCardValue(bcardData:number):number
    // {
    //     return (bcardData&15)
    // }
    
    // private getCardColor(bcardData:number):number
    // {
    //     return (bcardData&240)
    // }

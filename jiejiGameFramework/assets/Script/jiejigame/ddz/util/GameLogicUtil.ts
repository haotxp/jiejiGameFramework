import { TagAnalyseResultUtil } from "./TagAnalyseResultUtil";
import { CharacterWrapperUtil } from "./CharacterWrapperUtil";

	

export class GameLogicUtil
{
    private static _instance:GameLogicUtil;
    public m_bCardListData:Array<any>=[ 
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 0x11, 0x12, 0x13, 
        20, 0x15, 0x16, 0x17, 0x18, 0x19, 0x1a, 0x1b, 0x1c, 0x1d, 0x21, 0x22, 0x23, 0x24, 0x25, 0x26, 
        0x27, 40, 0x29, 0x2a, 0x2b, 0x2c, 0x2d, 0x31, 50, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 
        0x3a, 0x3b, 60, 0x3d, 0x41, 0x42];

    // public  GameLogicUtil()
    // {
    // }

    public static get instance():GameLogicUtil
    {
        if(!this._instance)
            this._instance=new GameLogicUtil();
        return this._instance;
    }
    /**
     * 对牌型进行分析，分析结果将保存到tagAnalyseResult的对象中 
     * @param bCardData
     * @param bCardCount
     * @param AnalyseResult
     * 
     */
    public AnalysebCardData(bCardData:Array<any>,  bCardCount:number,  AnalyseResult:TagAnalyseResultUtil):void      //对牌型进行分析，分析结果将保存到tagAnalyseResult的对象中
    {                                                                     //cardData已经是排好序的了
        var num :number= 1;
        var num2:number = 0;
        var cardLogicValue:number = this.GetCardLogicValue(bCardData[0]);   //取得第一张牌的点数
        AnalyseResult.init();                                     
        for (var i:number = 1; i < bCardCount; i++)
        {
            num2 = this.GetCardLogicValue(bCardData[i]);             //取得对应的点数
            if (num2 == cardLogicValue)
            {
                num++;
            }
            if ((num2 != cardLogicValue) || (i == (bCardCount - 1)))  //i == (bCardCount - 1)说明是最后一张牌了
            {
                switch (num)
                {
                    case 2:
                    {
                        var num5:number = AnalyseResult.bDoubleCount * 2;             //为什么是*2不是+2？因为初始值是0。加2好像也不行。  //确定目标数组的位置
                        var num6:number = (i - 2) + (((i != (bCardCount - 1)) || (num2 != cardLogicValue)) ? 0 : 1);     //确定原数组的拷贝位置
                        this.CopyArray(AnalyseResult.m_bDCardData, bCardData, 2, num5, num6);
                        AnalyseResult.bDoubleLogicVolue[AnalyseResult.bDoubleCount++] = cardLogicValue;  //把对子的点数放到存放对子的数组里
                        break;
                    }
                    case 3:
                    {
                        var num7:number = AnalyseResult.bThreeCount * 3;
                        var num8:number = (i - 3) + (((i != (bCardCount - 1)) || (num2 != cardLogicValue)) ? 0 : 1);
                        this.CopyArray(AnalyseResult.m_bTCardData, bCardData, 3, num7, num8);
                        AnalyseResult.bThreeLogicVolue[AnalyseResult.bThreeCount++] =cardLogicValue;
                        break;
                    }
                    case 4:
                    {
                        var num9:number = AnalyseResult.bFourCount * 4;
                        var num10 :number= (i - 4) + (((i != (bCardCount - 1)) || (num2 != cardLogicValue)) ? 0 : 1);
                        this.CopyArray(AnalyseResult.m_bFCardData, bCardData, 4, num9, num10);
                        AnalyseResult.bFourLogicVolue[AnalyseResult.bFourCount++] = cardLogicValue;
                        break;
                    }
                }
            }
            if (num2 != cardLogicValue)                   //表示num2和前一张牌点数不同
            {
                if (num == 1)                           //表示前一张牌是一张单牌
                {
                    if (i != (bCardCount - 1))         //表示num2对应的i，不是最好一张牌
                    {
                        AnalyseResult.m_bSCardData[AnalyseResult.bSignedCount++] = bCardData[i - 1];    //将单牌数量加1 ，且将牌复制到AnalyseResultCardData中
                    }
                    else                //表示num2对应的i指向最后一张牌，且和前一张牌不同，则将最后两张牌都复制到AnalyseResultCardData中
                    {
                        AnalyseResult.m_bSCardData[AnalyseResult.bSignedCount++] = bCardData[i - 1];
                        AnalyseResult.m_bSCardData[AnalyseResult.bSignedCount++] = bCardData[i];
                    }
                }
                else if (i == (bCardCount - 1))    //num不等1，且指向最后一张，且不等于前一张，这个情况是啥？？？
                {
                    AnalyseResult.m_bSCardData[AnalyseResult.bSignedCount++] = bCardData[i];
                }
                num = 1;                         //计数器置1
                cardLogicValue = num2;            //cardLogicValue置为num2
            }
        }
        for (var j :number= 0; j < AnalyseResult.bSignedCount; j = j + 1)    //将单牌的CardLogicValue值赋值到分析结果AnalyseResult.bSingleLogicVolue
        {
            AnalyseResult.bSingleLogicVolue[j] = this.GetCardLogicValue(AnalyseResult.m_bSCardData[j]);
        }
        
        if (bCardCount == 1)                     //CardData只有一张牌的情况
        { 
            AnalyseResult.bSignedCount++;
            AnalyseResult.m_bSCardData[0] = bCardData[0];
            AnalyseResult.bSingleLogicVolue[0] = this.GetCardLogicValue(AnalyseResult.m_bSCardData[0]);
        }
        
        
    }
    
    public Cmp( lp:number,  rp:number):number
    {
        if (lp < rp)
        {
            return -1;
        }
        if (lp == rp)
        {
            return 0;
        }
        return 1;
    }
    
    /**
     *比较牌的大小
        * @param bFirstList 上一轮出的牌
        * @param bNextList 本轮要出的牌
        * @return 0 可出牌 -1 大不过 1牌型不正确
        * 
        */		
    public CompareCard( bNextList:Array<any>,bFirstList:Array<any>) :number        //比较牌的大小
    {
        var cardType:number = this.GetCardType(bNextList);                                         //判断牌的类型
        var num2 :number= this.GetCardType(bFirstList);
        switch (num2)
        {
            case 0:
                return 1;
                
            case 12:           //12表示火箭，返回true表示first大于next
                return 0;
                
            default:
                if ((num2 == 11) && (cardType != 11))   //first是炸弹，大于next返回true
                {
                    return 0;
                }
                if ((num2 != 11) && (cardType == 11))   //next是炸弹，first小于next，返回false
                {
                    return -1;
                }
                if ((num2 != cardType) || (bFirstList.length!= bNextList.length))  //不是一个牌型，或张数不同
                {
                    return 1;
                }
                switch (cardType)  //能进入下面判断的牌肯定是牌型相同，张数相同
                {
                    // 1 单牌，2 对子，3 三条，4 单顺，5 连对，6 飞机不带， ，11 四个的炸弹
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 11:
                    {
                        var cardLogicValue:number = this.GetCardLogicValue(bFirstList[0]);
                        var num4:number = this.GetCardLogicValue(bNextList[0]);
                        if((cardLogicValue > num4))//返回true表示first大于next
                        {
                            return 0;
                        }else
                        {
                            return -1;
                        }
                            ;   
                    }
                        
                        //7表示飞机带一，8 飞机带二，13 三带一，14 三代二
                    case 7:
                    case 8:
                    case 13:
                    case 14:
                    {
                        var analyseResult :TagAnalyseResultUtil= new TagAnalyseResultUtil();
                        var result2 :TagAnalyseResultUtil= new TagAnalyseResultUtil();
                        this.AnalysebCardData(bNextList, bNextList.length, analyseResult);
                        this.AnalysebCardData(bFirstList, bFirstList.length, result2);
                        if((result2.bThreeLogicVolue[0] > analyseResult.bThreeLogicVolue[0]))
                            return 0;//返回true表示first大于next
                        else
                            return -1;
                    }
                        
                        //9 四代二，10 四代两对
                    case 9:
                    case 10:
                    {
                        var result3 :TagAnalyseResultUtil= new TagAnalyseResultUtil();
                        var result4:TagAnalyseResultUtil = new TagAnalyseResultUtil();
                        this.AnalysebCardData(bNextList, bNextList.length, result3);
                        this.AnalysebCardData(bFirstList, bFirstList.length, result4);
                        if((result4.bFourLogicVolue[0] > result3.bFourLogicVolue[0]))
                            return 0 ;
                        else
                            return -1;
                    }
                }
                break;
        }
        return 1;
    }
    
    
    public CopyArray(dst:Array<any>,src:Array<any>,  length:number,  dst_offset:number,  src_offset:number):void  //将原数组中的条子复制到analyseResultCardData中
    {
        if ((length == 0) && (src != null))
        {
            length = src.length;
        }
        for (var i :number= 0; i < length; i++)
        {
            dst[dst_offset + i] = src[src_offset + i];
        }
        
    }
    
    public CopyMemory(data1:Array<any>,  data2:Array<any>,  count:number):void
    {
        for (var i:number = 0; i < count; i++)
        {
            data1[i] = data2[i];
        }
    }
    
    public GetCardColor( bCardData:number) :number                             //取得花色
    {
        return (bCardData & 240);                                       //240=0xF0=11110000
    }
    /**
     * 取得点数
     * @param bCardData
     * @return 
     * 
     */		
    public GetCardLogicValue( bCardData:number) :number               
    {
        var cardColor :number= this.GetCardColor(bCardData);
        var cardValue :number= this.GetCardValue(bCardData);
        if (cardColor == 0x40)                                           //如果是大小王则返回cardvalue+16
        {
            return (cardValue + 0x10);
        }
        if (cardValue == 1)                                               //如果是A就返回14
        {
            return 14;
        }
        return ((cardValue != 2) ? cardValue : (cardValue + 14));         //如果是2就返回2+14=16，否则返回点数
    }                                                                 //这样大小王的cardvalue是17,18，主2的value是16，A的value是14
    
    public GetCardValue( bCardData:number):number                           //获得牌的点数
    {
        return (bCardData & 15);
    }
    /**
     *判断是否能成牌  
        * @param bCardData
        * @return  0为不能成排  其他可成
        * 
        */		
    public GetCardType(bCardData:Array<any>) :number         //判断牌的类型
    {
        //0 不成牌不能出，1 单牌，2 对子，3 三条，4 单顺，5 连对，6  三条不带，或飞机不带，7表示飞机带一，8 飞机带二,9 四代二
        // 10 四代两对 ，11 四个的炸弹，12 大小王，13 三带一，14 三代二  ，15 是啥？
        var f1:Boolean=true;
        var f2:Boolean=true;
        var num2:number;
        
        while(f1){
            //System.out.println("-----------");
            switch (bCardData.length)
            {
                case 1:                 //单牌
                    return 1;
                    
                case 2:
                    if ((bCardData[0] != 0x42) || (bCardData[1] != 0x41))        //不是大王或小王
                    {
                        return ((this.GetCardLogicValue(bCardData[0]) != this.GetCardLogicValue(bCardData[1])) ? 0 : 2);
                    }                                //如果是对子返回2，否则返回0
                    return 12;                       //大小王返回12
                    
                case 3:
                case 4:                           //出的牌是3或4张则执行此逻辑
                {
                    var num:number = this.GetCardLogicValue(bCardData[0]);    //取得第一张牌的逻辑值
                    num2 = 1;
                    num2 = 1;
                    while (num2 < bCardData.length)  ///num2记录了相同点数的牌的张数
                    {
                        //System.out.println("*******");
                        if (num != this.GetCardLogicValue(bCardData[num2]))
                        {
                            break;
                        }
                        num2++;
                    }
                    break;
                }
                default:                        //出的牌大于4张则执行Label_00B0位置的逻辑
                    f2=false;
                    break;
            }
            if(!f2){
                break;
            }
            if (num2 == bCardData.length)           //如果num2是牌的张数，则表示点数都一样
            {
                return ((bCardData.length != 3) ? 11 : 3);   //四个的炸弹返回11，三条返回3
            }
            if (bCardData.length == 3)  //如果牌的张数为3，说明不是三条，返回0
            {
                return 0;
            }
            break;              //结束掉死循环，刚发现的bug的地方
        }
        //出的牌大于4张
        if (bCardData.length < 4)
        {
            return 0;
        }
        var analyseResult:TagAnalyseResultUtil = new TagAnalyseResultUtil();
        this.AnalysebCardData(bCardData, bCardData.length, analyseResult);
        if (analyseResult.bFourCount > 0)          //表示有炸弹
        {
            if ((analyseResult.bFourCount == 1) && (bCardData.length == 6))   //有一个炸弹，牌数是6张
            {
                return 9;
            }
            if (((analyseResult.bFourCount == 1) && (analyseResult.bDoubleCount == 2)) && (bCardData.length == 8))
            {                                                           //有一个炸弹，2个对子
                return 10;
            }
            return 0;                //否则返回0
        }
        if (analyseResult.bThreeCount > 0)           //有三条
        {
            //读程序技巧，下面的原则都满足上面的逻辑
            if (analyseResult.bThreeCount > 1)       //至少有2个三条
            {
                if (analyseResult.bThreeLogicVolue[0] == 15)             ///15表示啥？？？？？？？？？？？？？？？？？？
                {
                    return 0;
                }
                for (var j:number = 1; j < analyseResult.bThreeCount; j++)    //判断飞机
                {
                    if (analyseResult.bThreeLogicVolue[j] != (analyseResult.bThreeLogicVolue[0] - j))
                    {
                        return 0;    //不是飞机返回0
                    }
                }
            }
            //以下语句表示三条都是顺子
            if ((analyseResult.bThreeCount * 3) == bCardData.length)           //表示牌是三条不带，或飞机不带
            {
                return 6;
            }
            if (analyseResult.bThreeCount == (bCardData.length - (analyseResult.bThreeCount * 3)))  //表示是否是每个三条都带一个单牌
            {
                if (analyseResult.bThreeCount == 1)   //表示三带一返回13
                {
                    return 13;
                }
                return 7;                             //飞机带一返回7
            }
            if ((analyseResult.bDoubleCount != analyseResult.bThreeCount) || (bCardData.length != ((analyseResult.bThreeCount * 3) + (analyseResult.bDoubleCount * 2))))
            {                                         //对子数不等于三条数或对子或三条的张数不等于总张数则返回0
                return 0;
            }
            if (analyseResult.bThreeCount == 1)       //上面的语句没有返回0表示每个三条都带一个对子，返回14
            {
                return 14;                      //三代二是14
            }
            return 8;                            //否则返回8，飞机带二
        }
        if (analyseResult.bDoubleCount >= 3)     //对子数大于等于3
        {
            if (analyseResult.bDoubleLogicVolue[0] != 15)
            {
                for (var k:number = 1; k < analyseResult.bDoubleCount; k++)   //判断连对
                {
                    if (analyseResult.bDoubleLogicVolue[k] != (analyseResult.bDoubleLogicVolue[0] - k))
                    {
                        return 0;    //不是连对返回0
                    }
                }
                if ((analyseResult.bDoubleCount * 2) == bCardData.length)     //表示牌都是连对，返回5
                {
                    return 5;
                }
            }
            return 0;         //否则返回0
        }
        if ((analyseResult.bSignedCount < 5) || (analyseResult.bSignedCount != bCardData.length))  //单牌数小于5或单牌数不等于牌数返回0
        {
            return 0;
        }
        var cardLogicValue:number = this.GetCardLogicValue(bCardData[0]);
        if (cardLogicValue >= 15)
        {
            return 0;
        }
        for (var i:number = 1; i < analyseResult.bSignedCount; i++)
        {
            if (this.GetCardLogicValue(bCardData[i]) != (cardLogicValue - i))    //判断顺子
            {
                return 0;  //没有返回0
            }
        }
        return 4;      //表示有顺子，返回4
    }
    
    
    public GetCharacterWrapper( bCardData:Array<any>):CharacterWrapperUtil
    {
        var wrapper:CharacterWrapperUtil = new CharacterWrapperUtil();
        wrapper.m_modeType = this.GetCardType(bCardData);
        switch (wrapper.m_modeType)
        {
            case 1:
            case 2:
            case 3:
                wrapper.m_tokenCard = this.GetCardLogicValue(bCardData[0]);
                wrapper.m_modeNum = 1;
                return wrapper;
                
            case 4:
                wrapper.m_tokenCard =this.GetCardLogicValue(bCardData[0]);
                wrapper.m_modeNum = bCardData.length;
                return wrapper;
                
            case 5:
                wrapper.m_tokenCard =this.GetCardLogicValue(bCardData[0]);
                wrapper.m_modeNum =(bCardData.length / 2);
                return wrapper;
                
            case 6:
                wrapper.m_tokenCard =this.GetCardLogicValue(bCardData[0]);
                wrapper.m_modeNum =(bCardData.length / 3);
                return wrapper;
                
            case 7:
            case 8:
            {
                var analyseResult :TagAnalyseResultUtil= new TagAnalyseResultUtil();
                this.AnalysebCardData(bCardData, bCardData.length, analyseResult);
                wrapper.m_tokenCard = analyseResult.bThreeLogicVolue[0];
                wrapper.m_modeNum =analyseResult.bThreeCount;
                return wrapper;
            }
            case 9:
            case 10:
            {
                var result3 :TagAnalyseResultUtil= new TagAnalyseResultUtil();
                this.AnalysebCardData(bCardData, bCardData.length, result3);
                wrapper.m_tokenCard = result3.bFourLogicVolue[0];
                wrapper.m_modeNum = 1;
                return wrapper;
            }
            case 11:
                wrapper.m_tokenCard =this.GetCardLogicValue(bCardData[0]);
                wrapper.m_modeNum = 1;
                return wrapper;
                
            case 12:
                wrapper.m_tokenCard =this.GetCardLogicValue(bCardData[0]);
                wrapper.m_modeNum = 1;
                return wrapper;
                
            case 13:
            case 14:
            {
                var result :TagAnalyseResultUtil= new TagAnalyseResultUtil();
                this.AnalysebCardData(bCardData, bCardData.length, result);
                wrapper.m_tokenCard = result.bThreeLogicVolue[0];
                wrapper.m_modeNum = 1;
                return wrapper;
            }
        }
        return wrapper;
    }
    
    public RandCards( cards:Array<any>,  count:number)  :  void  //洗牌
    {
        var num:number = 0x36;
        while (num > 1)
        {
            var index :number= Math.floor(Math.random()*num-1);
            var num3:number = this.m_bCardListData[num - 1];
            this.m_bCardListData[num - 1] = this.m_bCardListData[index];
            this.m_bCardListData[index] = num3;
            num--;
        }
        for (var i :number= 0; i < count; i++)
        {
            cards[i] = this.m_bCardListData[i];
        }
    }
    
    
    public RemoveCards( cards:Array<any>,  count:number,  cards2:Array<any>,  count2:number):void
    {			
        if (count >= count2)
        {
            var buffer:Array<any> = new Array(20);
            var num:number = 0;
            for (var i:number = 0; i < count; i++)
            {
                var index:number = 0;	                  
                while (index < count2)
                {
                    if (cards2[index] == cards[i])
                    {
                        break;
                    }
                    index++;
                }
                
                if (index == count2)
                {
                    buffer[num++] = cards[i];
                }
            }
            if (count == (num + count2))
            {
                for (var j :number= 0; j < num; j++)
                {
                    cards[j] = buffer[j];
                }
            }
        }
    }
    
    
    private CompareCardH( card1:number,  card2:number):Boolean   //两张单牌的比花色和大小
    {
        var num:number = card1 / 0x10;
        var num2:number = card1 % 0x10;
        var num3:number = card2 / 0x10;
        var num4:number = card2 % 0x10;
        if ((num == 4) && (num3 == 4))                 //代表两张牌是大小王，返回值说明card1比card2大
        {
            return (num2 > num4);
        }
        if ((num != 4) && (num3 != 4))
        {
            switch (num2)
            {
                case 1:
                case 2:
                    num2 += 13;                        //代表A和主2，加13表示大于k
                    break;
            }
            if ((num4 == 1) || (num4 == 2))           //代表A和主2，加13表示大于k
            {
                num4 += 13;
            }
            if (num2 != num4)
            {
                return (num2 > num4);
            }
        }
        return (num > num3);                      //返回值代表两张牌颜色的比较结果
    }
    /**
     * 冒泡排序，将点数从大到小排序
     * @param cards
     * @param count
     * 
     */		
    public SorteCard(cards:Array<any>,  count:number):void
    {
        var index:number = 0;
        var num2:number = 0;
        if (count > 0)
        {
            while (num2 != count)                             
            {
                index = num2;
                for (var i :number= num2; i < count; i++)             //找到了index对应的牌的最大的位置
                {
                    if (!this.CompareCardH(cards[index], cards[i]))
                    {
                        index = i;
                    }
                }
                var num4:number = cards[index];                     //交换位置
                cards[index] = cards[num2];
                cards[num2] =num4;
                num2 = num2 + 1;                    
            }
        }
    }
    
    public ZeroMemory(data1:Array<any>,  shu:number,  count:number):void
    {
        for (var i:number = 0; i < count; i++)
        {
            data1[i] = shu;
        }
    }
    
    public SorteCardArray(arr:Array<any>):void// byte[] cards, int count             //鍐掓场鎺掑簭锛屽皢鐐规暟浠庡ぇ鍒板皬鎺掑簭
    {
        var count:number = arr.length;
        var cards:Array<any>=new Array(count); 
        for (var i :number= 0; i < arr.length; i++) {
            cards[i]=arr[i];
        }
        var index:number = 0;
        var num2 :number= 0;
        if (count > 0)
        {
            while (num2 != count)                             
            {
                index = num2;
                for ( var q:number = num2; q < count; q++)             //鎵惧埌浜唅ndex瀵瑰簲鐨勭墝鐨勬渶澶х殑浣嶇疆
                {
                    if (!this.CompareCardH(cards[index], cards[q]))
                    {
                        index = q;
                    }
                }
                var num4 :number= cards[index];                     //浜ゆ崲浣嶇疆
                cards[index] = cards[num2];
                cards[num2] = num4;
                num2 = num2 + 1;                    
            }
        }
        
        arr=new Array();
        for (var b:number=0;b< cards.length;b++) {
            arr.push(cards[b]);
        }
    }
}

import Utility from "../utils/Utility";
import gameCardAreaControl from "../jiejigame/ddz/playercard/gameCardAreaControl";

/**
 * 玩家方位 前端显示方位
 */
export enum PlayerDirectionType {
    CENTER = -1,   //中心
    DOWN = 0,   //下方，自己
    RIGHT = 1,  //右边
    UP = 2,     //上方
    LEFT = 3,   //左边
}

export enum DdzPlayerDirType{
    DOWN = 0,   //下方，自己
    RIGHT = 1,  //右边
    LEFT = 2,   //左边
}

/**
 * 玩家game状态
 */
export enum GamePlayerStatus {
    IDLE = "idle",  
    WAIT = "wait",    // 等待中
    GAMING = "gameing"     // 游戏中
}

/**
 * 动画名称
 */
export enum GameAnimationNames {
    BEGIN = "begin",    // 开始
    END = "gameend",    // 结束游戏
    CHI = "chi",     // 吃
    GANG = "gang",     // 杠
    HU = "hu",     // 胡
    PENG = "peng",     // 碰
    TING = "ting"    // 听
}

/**
 * 游戏缓冲池名字
 */
export enum GamePoolsName {
    OPTION_MAHJONG = "option_mahjongs",   // 吃 听 麻将
    OPTION_MAHJONG_TIPS = "option_mahjongs_tips",   // 听麻将低版
    POOL_MAHJONG_PGC_DOWN = "mahjong_pool_pgc_down",   // 麻将碰杠吃
    POOL_MAHJONG_HU_DOWN = "mahjong_pool_hu_down",   // 麻将胡
    POOL_MAHJONG_PGC_UP = "mahjong_pool_pgc_up",   // 麻将碰杠吃
    POOL_MAHJONG_HU_UP = "mahjong_pool_hu_up",   // 麻将胡

    POOL_MTL_ANI = "mtl_pool_ani",   // 摩天轮动物
    POOL_MTL_COLOR = "mtl_pool_color",   // 摩天轮颜色
    POOL_MTL_RECORD_ITEM = "mtl_pool_record_item",   // 摩天轮开奖记录item
    POOL_ZFB_PAOCAI_ITEM = "zfb_pool_baocai_item",  //爆彩排行榜item
    POOL_ZFB_CHIP_ITEM = 'zfb_pool_chip_item',      //筹码
    POOL_ZFB_ZOUSHI_ITEM = 'zfb_pool_zoushi_item',      //筹码
    POOL_SCMJ_PAI_ITEM1 = 'scmj_pai_item1', //四川麻将 麻将1
    POOL_SCMJ_PAI_ITEM2 = 'scmj_pai_item2' //四川麻将 麻将2
}

export enum GameSceneName {
    GAMESCENE = 'gameScene' //斗地主
}

/**
 * 游戏默认字符 
 */
export enum GameDefaultStr{
    PLAYER_NAME = 'Game player',
    PLAYER_GOLD = '999999',
    GAME_TIME = '30',
    PROGRESS_NUM = 1,

}

/**
 * 游戏 Socket 类型
 */
export enum GameSocketType {
    /** 大厅 */
    SocketType_Hall = 'game_socket_type_hall',
    /** 二人麻将 */
    SocketType_Twomahjong = 'game_socket_type_twomahjong',
    /** 四川麻将 */
    SocketType_SCMahjong = 'game_socket_type_scmahjong',
    /** 斗牛 */
    SocketType_CorridaGame = 'game_socket_type_corrida',
    /** 中发白 */
    SocketType_ZFB = 'game_socket_type_zfb',
    /** 摩天轮 */
    SocketType_MTL = 'game_socket_type_mtl',
    /** 跑马 */
    SocketType_Horse = 'game_socket_type_horse',
    /**斗地主 */
    SocketType_DDZ = 'game_socket_type_ddz'
}


export enum GameType {
    Game_NONE = -1,
    Game_ZFB = 0,  //中发白
    Game_MTL = 1,  //摩天轮
    Game_DZPK = 2,  //德州扑克
    Game_PPT = 3,  //跑跑堂
    Game_SGJ = 4,  //水果机
    Game_TWOMAHJONG = 5,  //二人麻将
    Game_SCMAHJONG = 6,  //四川麻将
    Game_CARRIDA = 7,  //斗牛
    Game_DDZ = 8, //斗地主
}

export enum eGameLevel {
    Level_1 = 0,  //初级场
    Level_2 = 1,  //中级场
    Level_3 = 2,  //高级场
}

export enum SoundType {
    BG, //背景音乐
    EFFECT, //音效
}

/**
 * 当前操作类型
 */
export enum OperationType {
    kong = -1, //
    ready0 = 0, //准备开始游戏
    ready1 = 1, //准备开始游戏+倒计时
    qingjiaofen = 2, //请叫分
    qingchupai = 3, //请出牌
}

/**牌型 */
export enum CardType{
    orientation = -1,
		/**单牌*/
		danpai = 1,
		/**对子*/
		duizi = 2,
		/**三条*/
		santiao = 3,
		/**单顺*/
		shunzi = 4,
		/**连对*/
		liandui = 5,
		/**三条不带 或飞机不带*/
		feijiBudai = 6,
		/**飞机带1*/
		feijiDaiYi = 7,
		/**飞机带2*/
		feijiDaiEr = 8,
		/**四带二*/
		siDaiEr = 9,
		/**四带两对*/
		siDaiDui = 10,
		/**普通炸*/
		zhadan = 11,
		/**王炸*/
		wangzha = 12,
		/**三带一*/
		sanDaiYi = 13,
		/**三代二*/
		sanDaiEr = 14
}

/**单张音效 */
export enum DanPai{
  pai1_A = '1_A',
  pai1_2 = '1_2',
  pai1_3 = '1_3',
  pai1_4 = '1_4',
  pai1_5 = '1_5',
  pai1_6 = '1_6',
  pai1_7 = '1_7',
  pai1_8 = '1_8',
  pai1_9 = '1_9',
  pai1_10 = '1_10',
  pai1_J = '1_J',
  pai1_Q = '1_Q',
  pai1_K = '1_K',
}
/**对子音效 */
export enum DuiZi{
  pai2_A = '2_A',
  pai2_2 = '2_2',
  pai2_3 = '2_3',
  pai2_4 = '2_4',
  pai2_5 = '2_5',
  pai2_6 = '2_6',
  pai2_7 = '2_7',
  pai2_8 = '2_8',
  pai2_9 = '2_9',
  pai2_10 = '2_10',
  pai2_J = '2_J',
  pai2_Q = '2_Q',
  pai2_K = '2_K',
}
/**三条 */
export enum SanTiao{
  pai3_A = '3_A',
  pai3_2 = '3_2',
  pai3_3 = '3_3',
  pai3_4 = '3_4',
  pai3_5 = '3_5',
  pai3_6 = '3_6',
  pai3_7 = '3_7',
  pai3_8 = '3_8',
  pai3_9 = '3_9',
  pai3_10 = '3_10',
  pai3_J = '3_J',
  pai3_Q = '3_Q',
  pai3_K = '3_K',
}

/**剩余手牌 */
export enum ShengYu{
  pai1 = 'Remain1',
  pai2 = 'Remain2'
}

/**过 */
export enum Pass{
  pass0 = 'Pass0',
  pass1 = 'Pass1',
  pass2 = 'Pass2',
  pass3 = 'Pass3',
}

export enum OtherSound{
  shunzi = '1S',
  liandui = '2S',
  feijiBudai = '3S',
  feijiDaiYi = '3SD1',
  feijiDaiEr = '3SD2',
  siDaiEr = '4D1',
  siDaiDui = '4D2',
  zhadan = '4',
  wangzha = 'HJ',
  sanDaiYi = '3D1',
  sanDaiEr = '3D2'
}

export enum QianDiZhu{
  bujiao = 'PassCallLord',
  buqiang = 'PassRob',
  jiao = 'CallLord',
  qiang = 'Rob'
}

export class Define {
         /**
          * 当前是哪个游戏 血战 血流
          */
         public static currentGameType: any = -1;

         public static currentMahjongType:any = -1

         public static baseScore:number = 1000

         /** 是否为调试 */
         public static isDebug: boolean = false;

         /**
          * 本地存储常量Storage
          */
         public static readonly STORAGE_PARAMS = "params"; //初始化登陆参数
         public static readonly STORAGE_TOKEN = "token";
         public static readonly STORAGE_PLAYER_ID = "player_id";
         public static readonly STORAGE_APP_ID = "app_id";
         public static readonly STORAGE_VER_NUM = "ver_num";


         //斗地主
         public static DDZ__WEB__SOCKET__URL = "ws://140.143.193.253:5701/websocket"
         //public static DDZ__WEB__SOCKET__URL ="ws://192.168.50.248:7702/websocket"


         //预加载资源路径
         public static __PRELOADING__PATH = "Preloading/";
         public static __PRELOADING__PATH1 = "Atlas/";
         public static __AUDIO__PATH = "/sounds/";
         public static __MTLPRELOADING_ATLAS_PATH = "Texture/mtl";

         //大厅预加载资源路径
         public static __HALL__PRELOADING__PATH = "HallPreloading/";
 
         //斗地主
         public static __DDZ__PRELOADING__PATH = "DDZPreloading/";


         /**
          * 自己方位对应的显示表 4人麻将
          */
         private static readonly deskAzimuthTable: {
           [index: number]: { [index: number]: number };
         } = {
           0: { 0: 0, 1: 1, 2: 2, 3: 3 },
           1: { 1: 0, 2: 1, 3: 2, 0: 3 },
           2: { 2: 0, 3: 1, 0: 2, 1: 3 },
           3: { 3: 0, 0: 1, 1: 2, 2: 3 }
         };
         /**
          * 自己方位对应的显示表 2人麻将
          */
         private static readonly deskAzimuthTableTwomj: {
           [index: number]: { [index: number]: number };
         } = {
           0: { 0: PlayerDirectionType.DOWN, 1: PlayerDirectionType.UP },
           1: { 1: PlayerDirectionType.DOWN, 0: PlayerDirectionType.UP }
         };

         /**
          * 根据自己和玩家的实际方位获取显示方位
          * @param myAzimuth            自己实际方位
          * @param otherAzimuth        他人实际方位
          * @return                    他人显示方位
          * 自己的显示坐标永远为0方位
          * 所以算法为 大于自己的减自己 小于自己的加自己
          */
         public static getPlayerAzimuthViewByAzimuth(
           myAzimuth: number,
           otherAzimuth: number
         ) {
           return Define.deskAzimuthTable[myAzimuth][otherAzimuth];
         }

         /**
          * 根据自己和玩家的实际方位获取显示方位
          * @param myAzimuth            自己实际方位
          * @param otherAzimuth        他人实际方位
          * @return                    他人显示方位
          * 自己的显示坐标永远为0方位
          * 所以算法为 大于自己的减自己 小于自己的加自己
          */
         public static getPlayerAzimuthViewByAzimuthTwomj(
           myAzimuth: number,
           otherAzimuth: number
         ) {
           return Define.deskAzimuthTableTwomj[myAzimuth][otherAzimuth];
         }

         /**
          * 推送消息到浏览器大厅
          * getLocalStorage  recharge  withdraw wallet  showDialogMessage gotoLobby
          * @param data 
          *     let json = {
                type: "recharge",   类型
                data: "params"
                };
                JSON.stringify(json)
          */
         public static postMessageToLobby(data: string) {
           let json = {
             type: "recharge",
             data: "params"
           };
           if (cc.sys.isBrowser) {
             window.parent.postMessage(data, "*");
           }
         }

         public static chatStr:Array<string> = [
           '和你合作真是太愉快了！',
           '快点啊，等到花儿都谢了！',
           '你的牌打的真是太好了！',
           '很高兴认识大家！',
           '快发点好牌吧!',
           '朋友你在跟我开玩笑吗？',
         ]

         public static danpaiArr:Array<string> = [DanPai.pai1_A,DanPai.pai1_2,DanPai.pai1_3,DanPai.pai1_4,DanPai.pai1_5,
                                                  DanPai.pai1_6,DanPai.pai1_7,DanPai.pai1_8,DanPai.pai1_9,DanPai.pai1_10,
                                                  DanPai.pai1_J,DanPai.pai1_Q,DanPai.pai1_K]

         public static duiziArr:Array<string> = [DuiZi.pai2_A,DuiZi.pai2_2,DuiZi.pai2_3,DuiZi.pai2_4,DuiZi.pai2_5,
                                                  DuiZi.pai2_6,DuiZi.pai2_7,DuiZi.pai2_8,DuiZi.pai2_9,DuiZi.pai2_10,
                                                  DuiZi.pai2_J,DuiZi.pai2_Q,DuiZi.pai2_K] 
        public static santiaoArr:Array<string> = [SanTiao.pai3_A,SanTiao.pai3_2,SanTiao.pai3_3,SanTiao.pai3_4,SanTiao.pai3_5,
                                                  SanTiao.pai3_6,SanTiao.pai3_7,SanTiao.pai3_8,SanTiao.pai3_9,SanTiao.pai3_10,
                                                  SanTiao.pai3_J,SanTiao.pai3_Q,SanTiao.pai3_K]   
                                                  
        public static shengyuArr:Array<string> = [ShengYu.pai1,ShengYu.pai2]  
        
        public static passArr:Array<string> = [Pass.pass0,Pass.pass1,Pass.pass2,Pass.pass3]
                                                
        public static getSoundName_danPai(n:number, sex:number){
          let result: string = ""; 
          let sex_path = ''
          if (sex == 0) {
            sex_path = 'girl/'
          }
          else{
            sex_path = 'boy/'
          }
           switch(n){
             case 65:
               result = sex_path + '1_SmallJoker' 
             break
             case 66:
               result = sex_path + '1_BigJoker'
             break
             default:
                for (var i:number=0;i<13;i++){
                  if ((i+1) == (n%16)){	
                    result = sex_path + this.danpaiArr[i]
                  }
                }
               break
           }
           return result
         }
         
         /**
         * 对子
         * @param n
         * @param sex
         */
        public static getSoundName_duizi(n:number, sex:number){
          let result:string = ''
          let sex_path = ''
          if (sex == 0) {
            sex_path = 'girl/'
          }
          else{
            sex_path = 'boy/'
          }
          for (var i:number=0;i<13;i++){
            if ((i+1) == (n%16)){	
              result = sex_path + this.duiziArr[i]
            }
          }
          return result
        }

        /**
         * 三条
         * @param n
         * @param sex
         */
        public static getSoundName_santiao(n:number,sex:number){
          let result:string = ''
          let sex_path = ''
          if (sex == 0) {
            sex_path = 'girl/'
          }
          else{
            sex_path = 'boy/'
          }
          for (var i:number=0;i<13;i++){
            if ((i+1) == (n%16)){	
              result = sex_path + this.santiaoArr[i]
            }
          }
          return result
        }

        /**
         * 播放剩余牌的声音
         * @param n
         * @param sex
         * 
         */		
        public static soundRest(n:number,sex:number){
          let result:string = ''
          let sex_path = ''
          if (sex == 0) {
            sex_path = 'girl/'
          }
          else{
            sex_path = 'boy/'
          }
          result = sex_path + this.shengyuArr[n-1]
          return result
        }

        /**
         * 播放过的声音
         * @param sex
         */
        public static soundPass(sex:number){
          let result:string = ''
          let sex_path = ''
          if (sex == 0) {
            sex_path = 'girl/'
          }
          else{
            sex_path = 'boy/'
          }
          let n:number = Utility.getRangeRandom(0,3)
          result = sex_path + this.passArr[n]
          return result
        }

        public static soundJiaoDiZhu(fen:number, jiaofen:number,sex:number){
          //cc.log('打印叫地主参数', fen, jiaofen,sex)
          let result:string = ''
          let sex_path = ''
          if (sex == 0) {
            sex_path = 'girl/'
          }
          else{
            sex_path = 'boy/'
          }
          if (jiaofen<=0) {
            if (fen <= 0) {
              result = sex_path + QianDiZhu.bujiao
            }
            else{
              result = sex_path + QianDiZhu.jiao
            }
          }
          else{
            if (fen <= 0) {
              result = sex_path + QianDiZhu.buqiang
            }
            else{
              result = sex_path + QianDiZhu.qiang
            }
          }
          //cc.log('打印叫地主声音', result)
          return result
        }

        public static getOtherSoundName(cardType:number, sex:number){
          let result:string = ''
          let sex_path = ''
          if (sex == 0) {
            sex_path = 'girl/'
          }
          else{
            sex_path = 'boy/'
          }
          switch(cardType){
            case CardType.shunzi:
                result = sex_path + OtherSound.shunzi
              break
            case CardType.liandui:
                result = sex_path + OtherSound.liandui
              break
            case CardType.feijiBudai:
              result = sex_path + OtherSound.feijiBudai  
            break
            case CardType.feijiDaiYi:
              result = sex_path + OtherSound.feijiDaiYi
            break
            case CardType.feijiDaiEr:
              result = sex_path + OtherSound.feijiDaiEr  
            break
            case CardType.siDaiEr:
              result = sex_path + OtherSound.siDaiEr  
            break
            case CardType.siDaiDui:
              result = sex_path + OtherSound.siDaiDui  
            break
            case CardType.zhadan:
              result = sex_path + OtherSound.zhadan  
            break
            case CardType.wangzha:
              result = sex_path + OtherSound.wangzha  
            break
            case CardType.sanDaiYi:
              result = sex_path + OtherSound.sanDaiYi
            break
            case CardType.sanDaiEr:
              result = sex_path + OtherSound.sanDaiEr  
            break

          }
          return result
        }

         /**
          * 获取声音文件名
          * @param cardType
          * @param n
          */
         public static getSoundName(cardType:number,n:any,sex:number): string {
           let result: string = "";

           switch (cardType) {
             case CardType.danpai:
                result = this.getSoundName_danPai(n,sex)
               break
             case CardType.duizi:
                result = this.getSoundName_duizi(n,sex)
             break
             case CardType.santiao:
                result = this.getSoundName_santiao(n,sex)
               break
              case CardType.shunzi:
              case CardType.liandui:    
              case CardType.feijiBudai:
              case CardType.feijiDaiYi:
              case CardType.feijiDaiEr:
              case CardType.siDaiEr:
              case CardType.siDaiDui:
              case CardType.zhadan:
              case CardType.wangzha:
              case CardType.sanDaiYi:
              case CardType.sanDaiEr:
                result = this.getOtherSoundName(cardType, sex)
              break
           }
           return result;
         }         

         public static getSoundNameEx(cardType:number){
          let result: string = "";
           switch(cardType){
            case CardType.shunzi:
                case CardType.shunzi:
                    result = '1S' 
                break
                case CardType.liandui:   
                  result = '2S' 
                break
                case CardType.feijiBudai:
                case CardType.feijiDaiYi:
                case CardType.feijiDaiEr:
                  result = '3SD'
                break
                //case CardType.siDaiEr:
                //case CardType.siDaiDui:
                case CardType.zhadan:
                  result = '4'
                break
                case CardType.wangzha:
                  result = 'HJ'
                break
           }
           return result
         }
      }

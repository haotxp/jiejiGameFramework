
const {ccclass, property} = cc._decorator;

/**
 * 消息号
 */
@ccclass
export default class SocketEnumDdz extends cc.Component {
    //======================http============================

    //登陆获取token
    public static readonly MESSAGE_CONFIG_GET_SERVER: string =
        "gameLogin/signin";
    //游戏登陆
    //public static readonly MESSAGE_GAME_LOGIN: string = "gameHall/onLoginDev";
    // public static readonly MESSAGE_GAME_LOGIN: string = "gameHall/onLogin";
     //游戏登陆
     public static readonly MESSAGE_GAME_LOGIN_DEV: string = "gameHall/onLoginDev";
     public static readonly MESSAGE_GAME_LOGIN_PROD: string = "gameHall/onLogin";
    //获取大厅配置文件
    public static readonly MESSAGE_GAME_HALL_CONFIG: string =
        "gameHall/getHallConfig";
    //获取服务器配置文件
    public static readonly MESSAGE_GAME_SERVER_CONFIG: string =
        "gameHall/getServerConfig";
    //获取用户余额
    public static readonly MESSAGE_GAME_PLAYER_BALANCE: string =
        "gameHall/getBalance";

    //==========================client===================================
		/**换桌*/
		public static readonly  CHANGEDESK:number= -1;
		/**加入桌子*/
		public static readonly  JOINDESK:number = 1;
		/**退出桌子*/
		public static readonly  EXITDESK :number= 2;
		/**更新玩家状态*/
		public static readonly  UPDATEPLAYERSTATE :number= 3;
		/**叫分*/
		public static readonly  JIAOFEN :number= 4;
		/**出牌*/
		public static readonly  PUTPOKER :number= 5;
		/**过*/
		public static readonly  PASS :number= 6;
		/**继续游戏*/
		public static readonly  CONTINUEGAME :number= 7;
		/**聊天*/	
		public static readonly  CHAT:number = 8;
		/**托管*/
		public static readonly  TUOGUAN:number = 9;
		/**取消托管*/
		public static readonly  UNTUOGUAN :number= 10;
		/**更新牌样式*/
		public static readonly  UPDATEPOKERSTYLE:number = 11;
		public static readonly  NEWMATCHRANK:number = 12;	
		/**连胜tips*/
		public static readonly  LIANSHENGTIPS:number = 13;	
		/**查看所有配置*/
		public static readonly  READALLCONFIG :number= 14;
		/**更新所有配置*/
		public static readonly  UPDATEALLCONFIG :number= 15;
		/** 比赛加入大厅 */
		public static readonly  JOINHALL:number= 70;
		/** 比赛加入游戏大厅 */
		public static readonly  JOINMATCHHALL:number= 71;
		/** 请求盈利信息 */
		public static readonly  PROFITRECORD:number= -11;
		/** 请求礼物 */
		public static readonly  GIVEGIFT:number= -12;
		
		//====================server=================
		/**警告*/
		public static readonly  warnI:number = -2;
		/**错误*/
		public static readonly  errorI:number = -1;
		/**信息*/
		public static readonly  infoI:number = 0;
		/**时间*/
		public static readonly  timeI:number = 1;
		/**发牌完毕*/
		public static readonly  fapaiwanbiI:number = 2;
		/**开始游戏*/
		public static readonly  beginGameI :number= 3;
		/**初始化牌桌*/
		public static readonly  initDeskI :number= 4;
		/**加入游戏*/
		public static readonly  joinDeskI:number = 5;
		/**退出游戏*/
		public static readonly  exitDeskI :number= 6;
		/**更新玩家状态*/
		public static readonly  updatePlayerStateI :number= 7;
		/**叫分*/
		public static readonly  jiaofenI :number= 8;
		/**出牌*/		
		public static readonly  putPokerI :number= 9;
		/**过*/
		public static readonly  passI:number = 10;	
		/**显示提示*/
		public static readonly  showOperationI :number= 11;	
		/**游戏结束*/
		public static readonly  gameOverI:number = 12;
		/**聊天*/
		public static readonly  chatI :number= 13;
		/**托管*/
		public static readonly  tuoguanI:number = 14;
		/**取消托管*/
		public static readonly  untuoguanI :number= 15;
		/**显示剩余时间*/
		public static readonly  showLimitTimeI:number = 16;
		/**取消显示剩余时间*/
		public static readonly  unShowLimitTimeI:number = 17;
		/**发底牌*/
		public static readonly  fadipaiI :number = 18;
		/**请叫分*/
		public static readonly  qingJiaofenI :number = 19;
		/**显示出牌方位*/
		public static readonly  qingChupaiI :number=20;
		/**更新倍数*/
		public static readonly  updateBeiShuI:number=30;
		/** 更新钱 */
		public static readonly  updateMoneyI:number = 34;
		/** 更新积分 */
		public static readonly  updateZaDanJiFenI:number=35;
		/** 处理砸蛋积分 */
		public static readonly  dealZaDanJiFenI:number=36;
		
		public static readonly  newTishiI:number = 42;
		public static readonly  newMatchRankI :number= 43;
		public static readonly  onlineNumI :number= 44;
		public static readonly  levelUp:number=47;
		/**
		 * 比赛开始
		 * */
		public static readonly  matchAttendOKI:number=48;
		/**
		 * 比赛结束
		 * */
		public static readonly  matchOverI:number=49;
		public static readonly  readAllConfigI:number=50;
		
		/** 更新面板数据 */
		public static readonly matchJoinInfoI:number = 70;
		/** 更新面板排名 */
		public static readonly matchRankInfoI:number = 71;
		/** 比赛结束信息 */
		public static readonly matchGameOverInfoI:number = 72;
		/** 比赛等待信息 */
		public static readonly matchWaitInfoI:number = 73;
		/** 比赛等待匹配玩家 */
		public static readonly matchWaitMateI:number = 74;
		/** 比赛更新玩家积分 */
		public static readonly matchSourceInfoI:number = 75;
		/** 比赛奖励 */
		public static readonly matchPriseI:number = 76;
		/** 报名失败提示 */
		public static readonly matchErrorTISHI:number = 77;
		
		//====================更新个人信息中相关内容==================
		/** 盈利信息 */
		public static readonly  profitRecordI:number= -11;
		/** 礼物 */
		public static readonly giveGiftI:number=-12;
		/** 送完礼物后更新玩家信息 */
		public static readonly updatePlayerInfoAfterGiveGiftI:number=-30;
		//====================更新大厅桌子相关信息==================
		public static readonly  Hall_DeskInitI:number = 44;
		public static readonly  Hall_DeskJoinI:number = 45;
		public static readonly  Hall_DeskExitI :number= 46;
		//====================更新大厅桌子相关信息==================
		public static readonly getSupplyMoneyI:number = -10;//输光补助
		
		//====================提示框按钮类�?=================
		public static readonly  Tishi_wozhidaola:number = 0;
		public static readonly  Tishi_returnHall:number = 1;
		public static readonly  Tishi_cancel :number= 2;
		public static readonly  Tishi_reconn :number= 3;
		public static readonly  Tishi_gotoNextMatch :number= 4;
		public static readonly  Tishi_exitMatch :number= 5;
		public static readonly  Tishi_changeDesk :number= 6;
		public static readonly  Tishi_continueGame:number=7;
		//====================提示框按钮类�?=================

    start() {}
}

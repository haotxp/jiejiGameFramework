// import { debug } from "util";
// import { BagControl } from "../Data/BagControl";
// import { FishingRoomControl } from "../Data/FishingRoomControl";
// import { HallLoginInfoControl, LoginInfoControl } from "../Data/LoginInfoControl";
// import { PropertyControl } from "../Data/PropertyControl";
// import { EngUnit } from "../Define/EngUnit";
// import LogHelp from "../Log/LogHelp";
// import { CommonApp } from "../Net/proto/ProtoControlHall";
// import { GameTableMgr } from "./GameTableMgr";
// import { SGJDataControl } from "../Data/SGJDataControl";


// export class GameDataMgr 
// {
//     private static __instance : GameDataMgr;
//     public static GetInstance()
//     {
//         if(!this.__instance)
//         {
//             this.__instance = new GameDataMgr();
//         }

//         return this.__instance;
//     }

//     //玩家属性
//     private __propertyControl : PropertyControl;
//     public GetPropertyControl()
//     {
//         return this.__propertyControl;
//     }

//     //玩家背包
//     private __bagControl : BagControl;
//     public GetBagControl()
//     {
//         return this.__bagControl;
//     }

//     //进入游戏房间信息
//     private __loginInfoControl : LoginInfoControl;
//     public GetLoginInfoControl()
//     {
//         return this.__loginInfoControl;
//     }

//     //进入小游戏大厅数据
//     private __hallInfoControl : HallLoginInfoControl;
//     public GetHallLoginInfoControl()
//     {
//         return this.__hallInfoControl;
//     }

//     //加入渔场房间信息
//     private __fishingInfoControl : FishingRoomControl;
//     public GetFishingRoomControl()
//     {
//         return this.__fishingInfoControl;
//     }

//     //水果机数据
//     private __sgjDataControl : SGJDataControl;
//     public GetSGJDataControl()
//     {
//         return this.__sgjDataControl;
//     }

//     constructor()
//     {
//         this.__propertyControl = new PropertyControl();
//         this.__bagControl = new BagControl();
//         this.__loginInfoControl = new LoginInfoControl();
//         this.__fishingInfoControl = new FishingRoomControl();
//         this.__hallInfoControl = new HallLoginInfoControl();
//         this.__sgjDataControl = new SGJDataControl();
//     }

//     public InitMyPlayer(data:any)
//     {
//         this.__propertyControl.selfSdk = data.selfSdk;
//         this.__propertyControl.nickName = data.nickName;
//         this.__propertyControl.openID = data.uid; //接入平台的用户唯一标识
//         this.__propertyControl.accessToken = data.accessToken;
//         this.__propertyControl.channelId = data.channelId; //渠道唯一标识
//         this.__propertyControl.channel = data.channel; //渠道
//         this.__propertyControl.productId = data.productId; //产品唯一标识
//         this.__propertyControl.channelUid = data.channelUid; //渠道的用户id
//     }

//     public UpdatePropertyData(__info : CommonApp.FishCommonProto.PersonalInfo)
//     {
//         let __dataInfo:CommonApp.FishCommonProto.IMessageInitPlayerInfo  = __info.playerData;
//         if (__dataInfo!=null)
//         {
//             this.__propertyControl.openID = __dataInfo.openId;

//             this.__propertyControl.userID = __dataInfo.userId as Long;

//             this.__propertyControl.nickName = __dataInfo.nickName;

//             this.__propertyControl.headImgUrl = __dataInfo.headImgUrl;

//             this.__propertyControl.level = __dataInfo.level;

//             this.__propertyControl.exp = __dataInfo.exp;

//             this.__propertyControl.hp = __dataInfo.hp;

//             this.__propertyControl.gameGold = __dataInfo.gameGold;

//             this.__propertyControl.sex = __dataInfo.sex;

//             this.__propertyControl.isNewUser = __dataInfo.isNewUser;

//             this.__propertyControl.isTodayFirstEnter = __dataInfo.isTodayFirstEnter;

//             this.__propertyControl.cangBaoTuAmount = __dataInfo.cangBaoTuAmount;

//             this.__propertyControl.firstRechargeStatus = __dataInfo.firstRechargeStatus;

//             this.__propertyControl.diamond = __dataInfo.diamond;

//             this.__propertyControl.vipExp = __dataInfo.vipExp;

//             this.__propertyControl.monthCardStatus = __dataInfo.monthCardStatus;

//             this.__propertyControl.vipDailyHelp = __dataInfo.vipDailyHelp;

//             this.__propertyControl.checkInStatus = __dataInfo.checkInStatus;

//             this.__propertyControl.maxCannon = __dataInfo.maxCannon;

//             let __nTempValue:number = this.__propertyControl.maxCannon;
//             let __nTempIndex:number = 0;
//             if (__nTempValue < 100)
//             {
//                 __nTempIndex = 1;
//             }
//             else if (__nTempValue < 1000 && __nTempValue >= 100)
//             {
//                 __nTempIndex = 2;
//             }
//             else if (__nTempValue >= 1000)
//             {
//                 __nTempIndex = 3;
//             }
//             this.__propertyControl.cannonLevel = __nTempIndex;

//             this.__propertyControl.gem = __dataInfo.gem;

//             this.__propertyControl.weekCardStatus = __dataInfo.weekCardStatus;

//             this.__propertyControl.cannonId = __dataInfo.cannonId;

//             this.__propertyControl.wishingTimes = __dataInfo.wishingTimes;

//             this.__propertyControl.joinGameCount = __dataInfo.joinGameCount;

//             this.__propertyControl.bindMobileState = __dataInfo.bindMobileState;

//             this.__propertyControl.showWingTips = __dataInfo.showWingTips;

//             this.__propertyControl.showQQ = __dataInfo.showQQ;

//             this.__propertyControl.loginCount = __dataInfo.loginCount;

//             this.__propertyControl.betaLotteryStatus = __dataInfo.betaLotteryStatus;

//             this.__propertyControl.masterPoint = __dataInfo.masterPoint;

//             this.__propertyControl.activitys = __dataInfo.activitys;

//             this.__propertyControl.diamond = __dataInfo.diamond;

//             this.__propertyControl.allVipExp = __dataInfo.vipExp;

//             let tmp:number = Number(__dataInfo.gem);

//             this.__propertyControl.telephoneCount = tmp;
//             this.__propertyControl.lottery = 0;
//             this.__propertyControl.wezf = __dataInfo.wyzf;
//             this.RefershVip(this.__propertyControl.allVipExp as number);

//             // 玩家信息 bi报送
//             // BiReportHelper.Instance.user();
//         }
//     }

//     public RefershVip(__nAllVipExp:number)
//     {
//         let __configInfo = GameTableMgr.GetInstace().GetTableConfigVIP().GetVIPInfoByCurrLevelExp(__nAllVipExp);
//         if(null != __configInfo)
//         {
//             this.__propertyControl.allVipExp = __nAllVipExp;
//             this.__propertyControl.vipExp = __configInfo.__nExp;
//             this.__propertyControl.maxVipExp = GameTableMgr.GetInstace().GetTableConfigVIP().GetVipExpByLv(__configInfo.__nLevel + 1);
//             this.__propertyControl.vipLevel = __configInfo.__nLevel;
//         }
//         else
//         {
//             this.__propertyControl.allVipExp = __nAllVipExp;
//             this.__propertyControl.vipExp = 0;
//             this.__propertyControl.vipLevel = 0;
//         }
//     }

// }
import Utility from "../utils/Utility";


/**
 * 游戏缓冲池名字
 */
export enum GamePoolsName {

}

export enum GameSceneName {

  GAMESCENE = 'gameScene' //游戏场景
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



export enum GameType {
  Game_NONE = -1,
  Game_MUBAN = 0, //游戏模板
  //Game_ZFB = 0,  
}

/**等级 */
export enum eGameLevel {
  Level_1 = 0,  //初级场
  Level_2 = 1,  //中级场
  Level_3 = 2,  //高级场
}

/**声音类型 */
export enum SoundType {
  BG, //背景音乐
  EFFECT, //音效
}

/**方位 */
export enum PlayerDirectionType{
  DOWN = 0, //底部位置 自己的方位
  LEFT = 1, //左边
  UP = 2, //顶部
  RIGHT = 3, //右边
}

/**游戏消息类型 */
export enum GameSocketType{

}

/**
 * 定义一些常量，方法
 * 
 */
export class Define{

  /**是否调试 */
  public static isDebug:boolean = false

  /**当前游戏类型 */
  public static currentGameType:any = -1

  /**音效路径 */
  public static __AUDIO__PATH = 'sounds/'


  public static baseScore:number = 1000

  public static  __PRELOADING__PATH = ''



}


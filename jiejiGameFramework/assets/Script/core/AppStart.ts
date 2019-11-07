
import UserMgr from "../manager/UserMgr";
import HTTP from "../net/HTTP";
import SceneManager from "../manager/SceneManager";
import WebSocketManage from "../Net/WebSocketManage";
import LogHelp from '../Log/LogHelp';
import { GameAudioMgr } from '../manager/GameAudioMgr';
import { UIManager } from '../manager/UIManager';
import { GameLoadResourceMgr } from '../Load/GameLoadResourceMgr';
import { Define, GameSceneName, GameType } from '../Define/Define';
import { Utils } from '../utils/Utils';
import { Base64 } from 'js-base64'
import TipsManager from '../manager/TipsManager';
import AlertPanelManager from '../manager/AlertPanelManager';
import i18n = require('../utils/i18n/i18n');

const { ccclass, property } = cc._decorator;

@ccclass
export default class AppStart extends cc.Component {

  private static Instance: AppStart;
  private progress_bar: cc.ProgressBar = null;
  private urlParams = {}

  onLoad() {
    AppStart.Instance = this

    this.progress_bar = Utils.FindComponentByName(this.node, "loadingbar", cc.ProgressBar)
    this.progress_bar.progress = 0

    if (!cc.sys.isNative && cc.sys.isMobile) {
      var canvas = this.node.getComponent(cc.Canvas);
      canvas.fitHeight = true;
      canvas.fitWidth = true;
    }
    cc.view.setOrientation(cc.macro.ORIENTATION_LANDSCAPE)
    // cc.view.setResizeCallback(this.onResizeCallback);
    cc.view.enableAutoFullScreen(true);
    cc.view.resizeWithBrowserSize(true)
    //屏幕旋转回调
    // window.addEventListener('orientationchange', this.onResizeCallback);

    this.initManager();

    let pageParams = this.urlParse()
    console.log("读取页面参数： " + pageParams);
    let isHaveParams = false;
    if (pageParams != null && pageParams["data"] != null) {
      isHaveParams = true;
      Define.isDebug = false; // 设置调试状态

      let data = Base64.decode(pageParams["data"]);
      console.log("读取页面参数data： " + data);
      this.urlParams = JSON.parse(data);
      Utils.SetLocalStorage(Define.STORAGE_PARAMS, data);
    } else {
      // 设置调试状态
      Define.isDebug = true;
      Define.currentGameType = GameType.Game_DDZ
    }

    // Define.isDebug = false
    if (Define.isDebug == true) {
      LogHelp.OPENLOGFLAG = true
    } else {
      LogHelp.OPENLOGFLAG = false
    }

    //===========当前进了哪个游戏============
    if (isHaveParams && this.urlParams != null) {
      // let appId = this.urlParams.appId;
      // let verNum = this.urlParams.verNum;
      // let token = this.urlParams.token;
      // let playerId = this.urlParams.playerId;
      // // console.log(appId, verNum, token, playerId);

      // Utils.SetLocalStorage(Define.STORAGE_APP_ID, appId);
      // Utils.SetLocalStorage(Define.STORAGE_VER_NUM, verNum);
      // // 存储当前用户ID
      // Utils.SetLocalStorage(Define.STORAGE_TOKEN, token)
      // Utils.SetLocalStorage(Define.STORAGE_PLAYER_ID, playerId);

      // Define.currentGameType = this.urlParams.key;
    }

    let resUrl = ""
    let scenceUrl = ""

    if (Define.currentGameType == GameType.Game_DDZ) {
      resUrl = Define.__DDZ__PRELOADING__PATH
      scenceUrl = GameSceneName.GAMESCENE
    }

    //=======================
    // 检查更新
    this.showSplash(function () {
      // this.getServerInfo();
      this.progress_bar.progress = 0
      GameLoadResourceMgr.Instance.GetTempLoadResourceControl().LoadTempResource(resUrl,
        () => {
          SceneManager.Instance.switchScene(scenceUrl, () => {
            // UIManager.Instance.Initial();
            LogHelp.log("加载完成")
            GameAudioMgr.Instance.PlaySoundBG("Background0.mp3", true);
            // TipsManager.Instance.createTips("加载完成")
          });
        }, (num: number) => {
          //cc.log("打印进度数据", num)
          this.progress_bar.progress = num
          // let n = Number(num.toFixed()) * 100
          // // LogHelp.log("正在拼命加载中…………" + n + "%…………")
          // this.progress_label.string = i18n.t('loading.loading') + n + "%…………";  //"正在拼命加载中" + n + "%…………";
        });
    }.bind(this));
  }

  showSplash(callback: Function) {
    let self = this;
    let SHOW_TIME = 3000;
    let FADE_TIME = 500;

    if (true || cc.sys.os != cc.sys.OS_IOS || !cc.sys.isNative) {
      //this.splash.active = true;
      // if (this.splash.getComponent(cc.Sprite).spriteFrame == null) {
      //     callback();
      //     return;
      // }
      let t = Date.now();
      let fn = function () {
        let dt = Date.now() - t;
        if (dt < SHOW_TIME) {
          setTimeout(fn, 33);
        }
        else {
          let op = (1 - ((dt - SHOW_TIME) / FADE_TIME)) * 255;
          if (op < 0) {
            //self.splash.opacity = 0;
            callback();
          }
          else {
            //self.splash.opacity = op;
            setTimeout(fn, 33);
          }
        }
      };
      setTimeout(fn, 33);
    }
    else {
      //this.splash.active = false;
      callback();
    }
  }

  private initManager() {
    LogHelp.log("初始化");

    // 初始化websock
    WebSocketManage.Instance.Initial();
    // 用户管理
    UserMgr.Instance.Initial();
    // 初始化http
    HTTP.Instance.Initial();
    // 初始化场景
    SceneManager.Instance.Initial();
    // 初始化音频
    GameAudioMgr.Instance.Initial();

    TipsManager.Instance.Initial();

    AlertPanelManager.Instance.Initial();
  }

  urlParse() {
    let params = {};
    if (window.location == null) {
      return params;
    }
    let name, value;
    let str = window.location.href; //取得整个地址栏
    let num = str.indexOf("?")
    str = str.substr(num + 1); //取得所有参数   stringvar.substr(start [, length ]

    let arr = str.split("&"); //各个参数放到数组里
    for (let i = 0; i < arr.length; i++) {
      num = arr[i].indexOf("=");
      if (num > 0) {
        name = arr[i].substring(0, num);
        value = arr[i].substr(num + 1);
        params[name] = value;
      }
    }
    return params;
  }

  update(dt: number) {
    //this._updateFillRange(dt);
  }

  private speed: number = 500;

  private _updateFillRange(dt: number) {
    // let rotation = -this.loading.node.angle + (dt * this.speed);
    // rotation = rotation < 360 ? rotation : 0;
    // this.loading.node.angle = -rotation;
  }
}

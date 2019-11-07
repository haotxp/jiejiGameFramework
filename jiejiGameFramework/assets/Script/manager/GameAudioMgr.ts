import { Utils } from '../utils/Utils';
import { Define, SoundType, GameType } from '../Define/Define';
import LogHelp from '../Log/LogHelp';


export class EffectAudioItem
{
    public __strSoundName : string = "";
    public __nSoundId : number = 1;
    public __resClip : cc.AudioClip;

    public Release()
    {
        cc.loader.release(this.__resClip);
    }
}

export class GameAudioMgr
{
    private static __instance : GameAudioMgr;
    public static get Instance()
    {
        if(null == this.__instance)
        {
            this.__instance = new GameAudioMgr();
        }
        return this.__instance;
    }

    private readonly __Key__Audio__Status : string = "AudioStatus" ;
    private readonly __Key__Bksound__Volume : string = "bksoundvolume" ;
    private readonly __Key__Effectsound__Volume : string = "effectsoundvolume" ;

    private audioStatus: number = 1

    //背景音量
    private __fBkSoundVolume : number = 1;
    //背景音乐id
    private __nBkSoundId : number = -1;

    //音效音量
    private __fEffectSoundVolume : number = 1;
    //所有音效
    private __effectSoundArray : Array<EffectAudioItem> = new Array<EffectAudioItem>();
    

    //心跳检测
    private __fRunningTime : number = 0;
    private readonly __F__CHECKTIME : number = 60;

    public Initial()
    {
        this.__fBkSoundVolume = Utils.GetLocalStorage(this.__Key__Bksound__Volume);
        this.__fEffectSoundVolume = Utils.GetLocalStorage(this.__Key__Effectsound__Volume);
        this.audioStatus = Utils.GetLocalStorage(this.__Key__Audio__Status);

        if(this.__fBkSoundVolume == null || this.__fBkSoundVolume == undefined){
            this.__fBkSoundVolume = 1
        }
        if(this.__fEffectSoundVolume == null || this.__fEffectSoundVolume == undefined){
            this.__fEffectSoundVolume = 1
        }

        if(this.audioStatus == null || this.audioStatus == undefined){
            this.audioStatus = 1
        }
    }

    public Tick(__fTime : number)
    {
        this.__fRunningTime += __fTime;
        if(this.__fRunningTime >= this.__F__CHECKTIME)
        {
            for(let i = 0 ; i < this.__effectSoundArray.length ; ++i)
            {
                let __nId = this.__effectSoundArray[i].__nSoundId;
                if(!cc.audioEngine.isLoop(__nId) && this.CaleSoundIsPlayend(__nId))
                {
                    this.__effectSoundArray[i].Release();
                    this.__effectSoundArray.splice(i,1);
                    i--;
                }
            }
            this.__fRunningTime = 0;
        }
    }

    /**
     * 播放背景音乐
     * @param __strSoundName 
     * @param __bLoop 
     */
    public PlaySoundBG(__strSoundName: string, __bLoop: boolean = false) {
        if (this.audioStatus == 0) return
        let __strPath = Define.__AUDIO__PATH  + __strSoundName;

        this.Play(SoundType.BG, __strPath, __bLoop);
    }

    public PlaySoundCommon(__strSoundName: string, __bLoop: boolean = false) {
        if (this.audioStatus == 0) return
        let __strPath = Define.__AUDIO__PATH + __strSoundName;

        if (Define.currentGameType == GameType.Game_MTL){
            
        } 
        else if (Define.currentGameType == GameType.Game_ZFB) {
            __strPath = Define.__AUDIO__PATH + "zfb/" + __strSoundName;
            //cc.log("打印播放路径=", __strPath)
        }
        else if (Define.currentGameType == GameType.Game_PPT) 
        {

        }
        else if (Define.currentGameType == GameType.Game_SCMAHJONG) {
            __strPath = Define.__AUDIO__PATH + __strSoundName;
        }
        else if (Define.currentGameType == GameType.Game_DDZ){
            __strPath = Define.__AUDIO__PATH + __strSoundName;
        }

        this.Play(SoundType.EFFECT, __strPath, __bLoop);
    }

    /**
     * 播放背景音乐
     * @param __eSoundType      类型 背景音乐还是音效
     * @param __strSoundName    音乐名字
     * @param __bLoop           是否循环播放
     */
    public PlaySound(__strSoundName : string, sex: number = 0, __bLoop : boolean = false)
    {
        if (this.audioStatus == 0) return

        let __strPath = Define.__AUDIO__PATH;
        // if (sex == 0) {
        //     __strPath += "girl/" + __strSoundName;
        // } else {
        //     __strPath += "boy/" + __strSoundName;
        // }
        __strPath += __strSoundName;
        this.Play(SoundType.EFFECT, __strPath, __bLoop);
    }

    private Play(__eSoundType: SoundType, __strPath: string, __bLoop: boolean = false){
        cc.loader.loadRes(__strPath, function (__error, __clip) {
            if (__error) {
                LogHelp.err(__error);
                return;
            }
            if (__eSoundType == SoundType.BG) {
                if (this.__nBkSoundId >= 0) {
                    this.StopBkSound();
                    this.__nBkSoundId = -1;
                    this.__strBkSoundName = "";
                }
                this.__strBkSoundName = __strPath;
                this.__nBkSoundId = cc.audioEngine.play(__clip, __bLoop, this.__fBkSoundVolume);
            }
            else {
                let __item = new EffectAudioItem();
                __item.__strSoundName = __strPath;
                __item.__resClip = __clip;
                __item.__nSoundId = cc.audioEngine.play(__clip, __bLoop, this.__fEffectSoundVolume);
                this.__effectSoundArray.push(__item);
            }
        }.bind(this));
    }

    //设置背景音乐音量
    public SetBkSoundVolume(__fValue : number)
    {
        if(this.__nBkSoundId >= 0)
        {
            cc.audioEngine.setVolume(this.__nBkSoundId,__fValue);
        }
    }

    //暂停背景音乐
    public PauseBkSound()
    {
        if(this.__nBkSoundId >= 0)
        {
            cc.audioEngine.pause(this.__nBkSoundId);
        }
    }

    //恢复背景音乐
    public ResumeBkSound()
    {
        if(this.__nBkSoundId >= 0)
        {
            cc.audioEngine.resume(this.__nBkSoundId);
        }
    }

    //停止背景音乐
    public StopBkSound()
    {
        if(this.__nBkSoundId >= 0)
        {
            cc.audioEngine.stop(this.__nBkSoundId);
        }
    }

    //设置背景音乐音量
    public SetEffectSoundVolume(__fValue : number)
    {
        for(let i = 0 ; i < this.__effectSoundArray.length ; ++i)
        {
            cc.audioEngine.setVolume(this.__effectSoundArray[i].__nSoundId,__fValue);
        }
    }

    //暂停音效
    public PauseEffectSound()
    {
        for(let i = 0 ; i < this.__effectSoundArray.length ; ++i)
        {
            let __nId = this.__effectSoundArray[i].__nSoundId;
            if(cc.audioEngine.isLoop(__nId) || this.CaleSoundIsPlayend(__nId))
            {
                continue;
            }
            cc.audioEngine.pause(__nId);
        }
    }
    
    //恢复音效
    public ResumeEffectSound()
    {
        for(let i = 0 ; i < this.__effectSoundArray.length ; ++i)
        {
            let __nId = this.__effectSoundArray[i].__nSoundId;
            if(cc.audioEngine.isLoop(__nId) || this.CaleSoundIsPlayend(__nId))
            {
                continue;
            }
            cc.audioEngine.resume(__nId);
        }
    }

    //计算音乐是否播放完毕
    private CaleSoundIsPlayend(__nId : number)
    {
        let __runningTime = cc.audioEngine.getCurrentTime(__nId);
        let __allTime = cc.audioEngine.getDuration(__nId);
        if(__runningTime >= __allTime)
        {
            return true;
        }
        return false;
    }

    public Save()
    {
        Utils.SetLocalStorage(this.__Key__Bksound__Volume, this.__fBkSoundVolume);
        Utils.SetLocalStorage(this.__Key__Effectsound__Volume, this.__fEffectSoundVolume);
    }

    public pauseAll() {
        this.audioStatus = 0
        Utils.SetLocalStorage(this.__Key__Audio__Status, 0);
        
        cc.audioEngine.pauseAll();
    }

    public resumeAll() {
        this.audioStatus = 1
        Utils.SetLocalStorage(this.__Key__Audio__Status, 1);

        cc.audioEngine.resumeAll();
    }
    
}
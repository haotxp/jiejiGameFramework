import { Define } from "../Define/Define";
import { LoadResource } from "./LoadResource";
import LogHelp from '../Log/LogHelp';


export class TempLoadResourceControl
{
    public PreloadingCompleteCallBack : Function;
    public PreloadingProgressCallBack : Function;
    
    //预设load资源管理
    private __prefabAssetMap : Map<string,cc.Prefab> = new Map<string,cc.Prefab>();
    //图集资源管理
    private __spriteFrameAssetMap : Map<string,cc.SpriteFrame> = new Map<string,cc.SpriteFrame>();
    //动画资源
    private __animationClipMap : Map<string,cc.AnimationClip> = new Map<string,cc.AnimationClip>();
    // spine
    private __spineClipMap: Map<string, sp.SkeletonData> = new Map<string, sp.SkeletonData>();
    // SpriteAtlas
    // private __atlasClipMap: Map<string, cc.SpriteAtlas> = new Map<string, cc.SpriteAtlas>();
    //当前临时资源路径
    private __currentLoadUrl : string = "";
    private __endFunctionCallBack : Function;
    private __progressFunctionCallBack : Function;

    /**
     * 预加载资源
     * 
     * @param __strUrl 
     * @param __successFunction
     * @param _progressFunction
     */
    public LoadTempResource(__strUrl:string, __successFunction : Function, _progressFunction: Function = null)
    {
        this.__currentLoadUrl = __strUrl;
        this.__endFunctionCallBack = __successFunction;
        this.__progressFunctionCallBack = _progressFunction;
        let __loadResource = new LoadResource(__strUrl, 
            this.LoadingResDirCallback.bind(this), 
            this.LoadingResDirProgressCallback.bind(this));
        __loadResource.BeginLoadResDic();
    }

    private LoadingResDirCallback(__strUrl:string,
        __resources: any[], 
        __strUrls: string[])
    {
        cc.log("打印加载资源路径", __strUrl, __resources, __strUrls)
        for (let index = 0; index < __strUrls.length; index++) 
        {
            let __strTempUrl = __strUrls[index];
            let __oTempResource = __resources[index];
            
            if(__oTempResource instanceof cc.Prefab)
            {
                if(!this.__prefabAssetMap.has(__oTempResource.name))
                    this.__prefabAssetMap.set(__oTempResource.name,__oTempResource);
            }
            else if(__oTempResource instanceof cc.SpriteFrame)
            {
                if(!this.__spriteFrameAssetMap.has(__oTempResource.name))
                {
                    this.__spriteFrameAssetMap.set(__oTempResource.name,__oTempResource);
                }
            }
            else if(__oTempResource instanceof cc.AnimationClip)
            {
                if(!this.__animationClipMap.has(__oTempResource.name))
                {
                    this.__animationClipMap.set(__oTempResource.name,__oTempResource);
                }
            }
            else if (__oTempResource instanceof sp.SkeletonData) {
                if (!this.__spineClipMap.has(__oTempResource.name)) {
                    this.__spineClipMap.set(__oTempResource.name, __oTempResource);
                }
            }
            else if (__oTempResource instanceof cc.SpriteAtlas) {
                let sprFrames = __oTempResource.getSpriteFrames();
                if (sprFrames != null) {
                    sprFrames.forEach((value: cc.SpriteFrame, index: number) => {
                        // LogHelp.log(value.name);
                        // this.spriteFrameAssetMap[value.name] = value;
                        if (!this.__spriteFrameAssetMap.has(value.name)) {
                            this.__spriteFrameAssetMap.set(value.name, value);
                        }
                    });
                }
            }
            else{
                // LogHelp.log("message: " + __strTempUrl + ',Dir 加载完成后返回：' + (__oTempResource));
            }
        }
        if(null != this.PreloadingCompleteCallBack)
        {
            this.PreloadingCompleteCallBack();
        }
        if(null != this.__endFunctionCallBack)
        {
            this.__endFunctionCallBack();
        }
    }

    private LoadingResDirProgressCallback(__strUrl:string,
        __nCompletedCount: number, 
        __nTotalCount: number,
        __resource:any) 
    {
        // LogHelp.log("LoadingResDirProgressCallback")
        if(null != this.PreloadingProgressCallBack)
        {
            this.PreloadingProgressCallBack(__nCompletedCount / __nTotalCount);
        }

        if (null != this.__progressFunctionCallBack) {
            this.__progressFunctionCallBack(__nCompletedCount / __nTotalCount);
        }
    }
    
    //通过URL得到预设
    public GetPrefabByUrl(__strUrl:string)
    {
        if(this.__prefabAssetMap.has(__strUrl))
        {
            return this.__prefabAssetMap.get(__strUrl);
        }
        return null;
    }

    //得到sprite
    public GetSpriteFrameByURL(__strUrl:string)
    {
        if(this.__spriteFrameAssetMap.has(__strUrl))
        {
            return this.__spriteFrameAssetMap.get(__strUrl);
        }
        return null;
    }

    //得到动作片
    public GetAnimationClipByUrl(__strUrl : string)
    {
        if(this.__animationClipMap.has(__strUrl))
        {
            return this.__animationClipMap.get(__strUrl);
        }
        return null;
    }

    /**
     * 获取spine SkeletonData
     * @param value 
     */
    public getSkeletonDataRes(url: string) {  
        return this.__spineClipMap.get(url);
    }

    /**
     * 根据数值获取花色资源
     * @param value 
     */
    public getHuaseByValue(value: number) {
        let url = Define.getSpriteName(value);
        if (this.__spriteFrameAssetMap.has(url)) {
            return this.__spriteFrameAssetMap.get(url);
        }
        return null;
    }

    //释放临时资源
    public Destroy()
    {
        this.__animationClipMap.clear();
        this.__prefabAssetMap.clear();
        this.__spriteFrameAssetMap.clear();
        this.__spineClipMap.clear()
        cc.loader.releaseResDir(this.__currentLoadUrl);
    }
}

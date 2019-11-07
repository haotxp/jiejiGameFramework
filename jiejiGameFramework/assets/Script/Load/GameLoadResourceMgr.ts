import { Define } from "../Define/Define";
import { LoadResource } from "./LoadResource";
import { TempLoadResourceControl } from "./TempLoadResourceControl";


/**
 * 预加载资源管理 (常驻)
 */
export class GameLoadResourceMgr
{
    private static __instance : GameLoadResourceMgr;
    public static get Instance()
    {
        if(null == this.__instance)
        {
            this.__instance = new GameLoadResourceMgr();
        }
        return this.__instance;
    }

    /**
     * 临时资源管理  加载各个场景 单独的资源管理
     */
    private __tempLoadResourceControl : TempLoadResourceControl;
    public GetTempLoadResourceControl()
    {
        return this.__tempLoadResourceControl;
    }

    private PreloadingCompleteCallBack : Function = null;
    private PreloadingProgressCallBack: Function = null;
    
    //UI预设和Text文件一次性加载进来
    //Text 资源管理
    private __dataAssetMap : Map<string,any> = new Map<string,any>();
    //预设load资源管理
    private __prefabAssetMap : Map<string,cc.Prefab> = new Map<string,cc.Prefab>();

    constructor()
    {
        this.__tempLoadResourceControl = new TempLoadResourceControl();
    }

    /**
     * 预加载资源
     * 
     * @param completeCB 加载完成回调方法
     * @param progressCB 加载进度回调
     */
    public PreloadingResource(
        completeCB: Function = null, 
        progressCB: Function = null, 
        errCB: Function = null)
    {
        if (completeCB != null){
            this.PreloadingCompleteCallBack = completeCB;
        }
        if (progressCB != null) {
            this.PreloadingProgressCallBack = progressCB;
        }
        let __loadResource = new LoadResource(Define.__PRELOADING__PATH, this.LoadingResDirCallback.bind(this), this.LoadingResDirProgressCallback.bind(this));
        // __loadResource.LoadCompleteCallback = this.LoadingResDirCallback.bind(this);
        // __loadResource.LoadProgressCallback = this.LoadingResDirProgressCallback.bind(this);
        __loadResource.BeginLoadResDic();
    }

    /**
     * 加载完成回调方法
     * 
     * @param __strUrl 
     * @param __resources 
     * @param __strUrls 
     */
    private LoadingResDirCallback(
        __strUrl:string,
        __resources: any[], 
        __strUrls: string[])
    {
        for (let index = 0; index < __strUrls.length; index++) 
        {
            let __strTempUrl = __strUrls[index];
            let __strArray : string[] = __strTempUrl.split("/");

            let __strResName  = __strArray[__strArray.length - 1];
            let __oTempResource = __resources[index];

            if(__oTempResource instanceof cc.Prefab)//处理预设体
            {
                if(!this.__prefabAssetMap.has(__strResName))
                    this.__prefabAssetMap.set(__strResName, __oTempResource);
            }
            else if(__oTempResource instanceof cc.AnimationClip)//处理动画
            {
                
            }
            else//其他资源管理器
            {
                if(!this.__dataAssetMap.has(__strResName))
                    this.__dataAssetMap.set(__strResName, __oTempResource);
            }
        }
        if(null != this.PreloadingCompleteCallBack)
        {
            this.PreloadingCompleteCallBack();
        }
    }

    /**
     * 进度回调函数
     * 
     * @param __strUrl 
     * @param __nCompletedCount 
     * @param __nTotalCount 
     * @param __resource 
     */
    private LoadingResDirProgressCallback(__strUrl:string,
        __nCompletedCount: number, 
        __nTotalCount: number,
        __resource:any) 
    {
        if(null != this.PreloadingProgressCallBack)
        {
            this.PreloadingProgressCallBack(__nCompletedCount / __nTotalCount);
        }
    }

    /**
     * 通过url得到textasset
     * 
     * @param __strUrl url
     */
    public GetDataAssetByUrl(__strUrl:string)
    {
        if(this.__dataAssetMap.has(__strUrl))
        {
            return this.__dataAssetMap.get(__strUrl);
        }
        return null;
    }
    
    /**
     * 通过URL得到预设
     * 
     * @param __strUrl url
     */
    public GetPrefabByUrl(__strUrl:string)
    {
        if(this.__prefabAssetMap.has(__strUrl))
        {
            return this.__prefabAssetMap.get(__strUrl);
        }
        return this.__tempLoadResourceControl.GetPrefabByUrl(__strUrl);
    }

}
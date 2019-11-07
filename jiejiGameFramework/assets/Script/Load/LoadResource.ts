import LogHelp from "../Log/LogHelp";

/**
 * 资源加载器
 */
export class LoadResource
{
    private __strUrl:string = '';

    //加载进度回调
    private LoadProgressCallback:Function = null;
    //加载完成回调
    private LoadCompleteCallback:Function = null;
    //加载报错回调
    private LoadErrorCallBack : Function = null;

    constructor(
        __url:string, 
        compCB: Function, 
        progressCB: Function = null, 
        errCB:Function = null) 
    {
        this.__strUrl = __url;
        if (compCB != null){
            this.LoadCompleteCallback = compCB;
        }

        if (progressCB != null) {
            this.LoadProgressCallback = progressCB;
        }

        if (errCB != null) {
            this.LoadErrorCallBack = errCB;
        }
    }

    public BeginLoad()
    {
        cc.loader.loadRes(this.__strUrl, this.ProgressCallback.bind(this),this.CompleteCallback.bind(this));
    }

    /**
     * 加载目录
     */
    public BeginLoadResDic()
    {
        cc.log("打印加载目录", this.__strUrl)
        cc.loader.loadResDir(this.__strUrl, this.ProgressCallback.bind(this),this.CompleteCallbackByDir.bind(this));
    }

    private ProgressCallback(__nCompletedCount: number, __nTotalCount: number, __item: any)
    {
        if(null != this.LoadProgressCallback)
        {
            this.LoadProgressCallback(this.__strUrl, __nCompletedCount,  __nTotalCount,__item);
        }
    }

    private CompleteCallback(__error: Error, __resource: any)
    {
        if(__error)
        {
            LogHelp.err("error.message: " + __error.message + ',加载完成后返回异常：' + this.__strUrl);
            if(this.LoadErrorCallBack != null)
            {
                this.LoadErrorCallBack();
            }
        }
        else
        {
            if (this.LoadCompleteCallback != null) 
            {
                this.LoadCompleteCallback(this.__strUrl , __resource);
            }
        }
    }

    private CompleteCallbackByDir(__error: Error, __resource: any[], __urls: string[])
    {
        if(__error)
        {
            LogHelp.err("error.message: " + __error.message + ',Dir 加载完成后返回异常：' + this.__strUrl);
            if(this.LoadErrorCallBack != null)
            {
                this.LoadErrorCallBack();
            }
        }
        else
        {
            if (this.LoadCompleteCallback != null) 
            {
                this.LoadCompleteCallback(this.__strUrl ,__resource , __urls);
            }
        }
    }
}

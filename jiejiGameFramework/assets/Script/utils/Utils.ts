import { GameLoadResourceMgr } from "../Load/GameLoadResourceMgr";
import { DefineString } from "../Define/DefineString";


export class Utils
{
    /**
     * 根据路径查找node并且得到上面组件
     * 
     * @param __node 
     * @param __path 
     * @param type 
     */
    public static FindComponentByPath<T extends cc.Component>(__node : cc.Node, __path:string,type:{prototype: T}):T
    {
        return cc.find(__path,__node).getComponent(type);
    }

    /**
     * 根据名字查找node并且得到上面组件
     * 
     * @param __node 
     * @param __path 
     * @param type 
     */
    public static FindComponentByName<T extends cc.Component>(__node : cc.Node, __path:string,type:{prototype: T}):T
    {
        let __tempNode = Utils.FindChildNodeByName(__node,__path);
        if(null == __tempNode)
            return null;
        return __tempNode.getComponent(type);
    }

    /**
     * 设置父物体关系
     * 
     * @param __parent 
     * @param __child 
     * @param __bResetPos 
     */
    public static SetParent(__parent: cc.Node,__child : cc.Node,__bResetPos : boolean) 
    {
        __child.parent = __parent;
        if(__bResetPos)
        {
            __child.setPosition(0,0);
        }
    }

    /**
     * 根据传入的层级关系查找节点
     * 
     * @param __node 
     * @param __path 
     */
    public static FindChildNodeByPath(__node : cc.Node,__path:string)
    {
        return cc.find(__path,__node);
    }

    /**
     * 根据名字查找节点
     * 
     * @param __node 
     * @param __path 
     */
    public static FindChildNodeByName(__node:cc.Node,__path:string)
    {
        for (let i = 0; i < __node.childrenCount; i++) 
        {
            if(__node.children[i].name == __path)
            {
                return __node.children[i];
            }
            let __tempNode = Utils.FindChildNodeByName(__node.children[i],__path);
            if(null != __tempNode)
            {
                return __tempNode;
            }
        }
        return null;
    }

    /**
     * 在某个父物体下面创建新的节点
     * 
     * @param __childNode 
     * @param __parentNode 
     */
    public static AddChildNode(__childNode:cc.Node,__parentNode:cc.Node)
    {
        let __newNode = Utils.NodeInstantiate(__childNode);
        Utils.SetParent(__parentNode,__newNode,true);
        return __newNode;
    }

    /**
     * 在某个父物体下面创建预设体
     * 
     * @param __prefab 
     * @param __parentNode 
     */
    public static AddChildPrefab(__prefab:cc.Prefab,__parentNode:cc.Node)
    {
        let __newNode = Utils.PrefabInstantiate(__prefab);
        Utils.SetParent(__parentNode,__newNode,true);
        return __newNode;
    }

    /**
     * 创建一个新的节点
     * 
     * @param __nodeName 
     */
    public static NewNode(__nodeName:string)
    {
        return new cc.Node(__nodeName);
    }

    /**
     * 在一个节点下面创建一个新的节点
     * 
     * @param __nodeName 
     * @param __node 
     */
    public static NewNodeToParent(__nodeName:string,__node : cc.Node)
    {
        let __newNode = new cc.Node(__nodeName);
        Utils.SetParent(__node,__newNode,true);
        return __newNode;
    }

    /**
     * 克隆一个新的节点
     * 
     * @param __node 
     */
    public static NodeInstantiate(__node:cc.Node)
    {
        return cc.instantiate<cc.Node>(__node);
    }

    /**
     * 克隆一个新的预设体
     * 
     * @param __prefab 
     */
    public static PrefabInstantiate(__prefab:cc.Prefab)
    {
        return cc.instantiate(__prefab);
    }
    
    /**
     * 克隆任意类型的object
     * 
     * @param __t 
     */
    public static Instantiate<T>(__t : T)
    {
        return cc.instantiate<T>(__t);
    }

    /**
     * 设置该节点不被销毁
     * 
     * @param __node 
     */
    public static SetNodeDontDestroy(__node:cc.Node)
    {
        cc.game.addPersistRootNode(__node);
    }

    /**
     * 取消该节点不被销毁的状态
     * 
     * @param __node 
     */
    public static CancleNodeDontDestroy(__node:cc.Node)
    {
        cc.game.removePersistRootNode(__node);
    }

    /**
     * 设置node的坐标位置
     * 
     * @param __node 
     * @param __fX 
     * @param __fY 
     */
    public static SetNodePosition(__node:cc.Node,__fX:number,__fY:number)
    {
        __node.setPosition(__fX,__fY);
    }

    //设置节点state
    public static SetNodeActive(__node : cc.Node,__bState : boolean)
    {
        __node.active = __bState;
    }

    /**
     * 设置按钮带参数的回调
     */
    public static SetButtonIndexCallBack(__btn:cc.Button,
        __node:cc.Node,
        __strComponent:string,
        __strHandler:string,
        __strIndex:string)
    {
        __btn.clickEvents = [null]; 
        __btn.clickEvents[0] = new cc.Component.EventHandler();
        __btn.clickEvents[0].target = __node;
        __btn.clickEvents[0].component  = __strComponent;
        __btn.clickEvents[0].handler = __strHandler;
        __btn.clickEvents[0].customEventData = __strIndex;
    }

    /**
     * 设置Toggle带参数的回调
     * 
     * @param __toggle 
     * @param __node 
     * @param __strComponent 
     * @param __strHandler 
     * @param __strIndex 
     */
    public static SetToggleIndexCallBack(__toggle:cc.Toggle,
        __node:cc.Node,
        __strComponent:string,
        __strHandler:string,
        __strIndex:string)
    {
        __toggle.clickEvents = [null]; 
        __toggle.clickEvents[0] = new cc.Component.EventHandler();
        __toggle.clickEvents[0].target = __node;
        __toggle.clickEvents[0].component  = __strComponent;
        __toggle.clickEvents[0].handler = __strHandler;
        __toggle.clickEvents[0].customEventData = __strIndex;
    }

    /**
     * 设置Slider带参数的回调
     * 
     * @param __slider 
     * @param __node 
     * @param __strComponent 
     * @param __strHandler 
     * @param __strIndex 
     */
    public static SetSliderIndexCallBack(__slider:cc.Slider,
        __node:cc.Node,
        __strComponent:string,
        __strHandler:string,
        __strIndex:string)
    {
        __slider.slideEvents = [null]; 
        __slider.slideEvents[0] = new cc.Component.EventHandler();
        __slider.slideEvents[0].target = __node;
        __slider.slideEvents[0].component  = __strComponent;
        __slider.slideEvents[0].handler = __strHandler;
        __slider.slideEvents[0].customEventData = __strIndex;
    }

    /**
     * 设置EditBox带参数的回调
     * 
     * @param __editorBox 
     * @param __node 
     * @param __strComponent 
     * @param __strHandler 
     * @param __strIndex 
     */
    public static SetEditBoxIndexCallBack(__editorBox:cc.EditBox,
        __node:cc.Node,
        __strComponent:string,
        __strHandler:string,
        __strIndex:string)
    {
        __editorBox.editingDidBegan = [null]; 
        __editorBox.editingDidBegan[0] = new cc.Component.EventHandler();
        __editorBox.editingDidBegan[0].target = __node;
        __editorBox.editingDidBegan[0].component  = __strComponent;
        __editorBox.editingDidBegan[0].handler = __strHandler;
        __editorBox.editingDidBegan[0].customEventData = __strIndex;
    }

    public static SetUISpriteFrame(__sprite:cc.Sprite,__iconPath:string)
    {
        __sprite.spriteFrame = GameLoadResourceMgr.Instance.GetTempLoadResourceControl().GetSpriteFrameByURL(__iconPath);
    }

    public  static LookAt(target:cc.Vec2,node:cc.Node):number
    {
        let tmp:cc.Vec2=new cc.Vec2(target.x-node.position.x,target.y-node.position.y);
        let angel:number=Math.atan2(tmp.x,tmp.y)*(180/Math.PI);
        return angel;
    }

    public static GetCurrentTime()
    {
        return Date.now();
    }

    //复制
    public static CopeHandler()
    {
        //TODO......................
    }

    public static FormattedName(__string : string, __nLength : number)
    {
        let __strTempValue = DefineString.__TEXT__EMPTY;
        if (__string.length > __nLength)
        {
            __strTempValue = __string.substring(0 , __nLength);
            if(__strTempValue != DefineString.__TEXT__EMPTY)
                __strTempValue += "...";
        }
        else
        {
            __strTempValue = __string;
        }
        return __strTempValue;
    }

    //=====================数据存储 start=========================

    /**
     * 获取存储数据
     * 
     * @param __key
     */
    public static GetLocalStorage(__key : string) : any
    {
        return cc.sys.localStorage.getItem(__key);
    }
    
    /**
     * 存储数据
     * 
     * @param __key 
     * @param __value 数据类型：string | number | Long
     */
    public static SetLocalStorage(__key : string, __value : string | number)
    {
        cc.sys.localStorage.setItem(__key,__value);
    }

    /**
     * 移除数据
     * @param __key 
     */
    public static RemoveLocalStorage(__key : string)
    {
        cc.sys.localStorage.removeItem(__key);
    }

    //=====================数据存储 end=========================

    /**
     * 获取时间
     * 
     * @param __time 
     */
    public static CaleTimeFormatText(__time : number)
    {
        let __date = new Date(__time as number);
        return __date.toTimeString();
    }

}
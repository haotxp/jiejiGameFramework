export class GamePoolMgr
{
    private static __instance : GamePoolMgr;
    public static get Instance()
    {
        if(null == this.__instance)
        {
            this.__instance = new GamePoolMgr();
        }
        return this.__instance;
    }

    /**
     * 池子
     */
    private __NodePool : Map<string,PoolNode> = new Map<string,PoolNode>();

    /**
     * 存入池子
     * 
     * @param __strPoolName 
     * @param __node 
     */
    public PutNode(__strPoolName : string , __node : cc.Node)
    {
        if(null != __node)
        {
            __node.removeFromParent();
            __node.cleanup();
            __node.active = false;
            __node.position = cc.Vec2.ZERO
        }

        if (this.__NodePool.has(__strPoolName))
        {
            this.__NodePool.get(__strPoolName).Put(__node);
        }
        else
        {
            let __pool = new PoolNode(__strPoolName);
            __pool.Put(__node);
            this.__NodePool.set(__strPoolName, __pool);
        }
    }

    /**
     * 从池子中获得
     * 
     * @param __strPoolName 
     */
    public GetNode(__strPoolName : string)
    {
        if (this.__NodePool.has(__strPoolName))
        {
            let __tempNode = this.__NodePool.get(__strPoolName).Get();
            if(null != __tempNode)
            {
                __tempNode.active = true;
            }
            return __tempNode;
        }
        return null;
    }

    /**
     * 清除对象池
     */
    public ClearPool()
    {
        this.__NodePool.forEach((value , key) =>
        {
            value.Clear();
        });
        this.__NodePool.clear();
    }
    
}

export class PoolNode {
    private __pool: cc.NodePool;
    private __string: string;

    constructor(__strName: string) {
        this.__string = __strName;
        this.__pool = new cc.NodePool(__strName);
    }

    public Put(__node: cc.Node) {
        this.__pool.put(__node);
    }

    public Get() {
        return this.__pool.get();
    }

    public Size() {
        return this.__pool.size();
    }

    public Clear() {
        this.__pool.clear();
    }
}
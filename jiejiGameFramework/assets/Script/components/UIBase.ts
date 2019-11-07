import { Utils } from "../Utils/Utils";

const {ccclass, property} = cc._decorator;

@ccclass
export class UIBase extends cc.Component 
{
    public FindChild<T extends cc.Component>(path:string,type:{prototype: T}):T
    {
        return cc.find(path,this.node).getComponent(type);
    }
    
    public FindNode(path:string):cc.Node
    {
        return cc.find(path,this.node);
    }
    
    public FindChildByName<T extends cc.Component>(path:string,type:{prototype: T}):T
    {
        return Utils.FindComponentByName<T>(this.node,path,type);
    }

    public FindComponentByPath<T extends cc.Component>(__path:string,type:{prototype: T}):T
    {
        return Utils.FindComponentByPath(this.node, __path, type);
    }
    
    public FindNodeByName(path:string):cc.Node
    {
        return Utils.FindChildNodeByName(this.node,path);
    }

    public FindClass(className:string):any
    {
        return this.node.getComponent(className);
    }

    //仅仅打开的时候 执行一次 (隐藏再打开不执行)
    public Awake(data: any = null)
    {

    }

    //每次打开该界面都会执行一次
    public Show()
    {
        this.node.active = true;
    }
    
    // //消息注册
    // public AddRegisterMessage()
    // {

    // }
    
    // //移除消息
    // public RemoveRegisterMessage()
    // {

    // }

    public Hide()
    {
        this.node.active = false;
    }

    public reset(){
        
    }

    public Destroy()
    {
        this.node.destroy();
    }
}

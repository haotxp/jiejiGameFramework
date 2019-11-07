const {ccclass, property} = cc._decorator;

@ccclass
export default class NotificationConstant
{
    private static initNum:number = 40000;
    private static getTypeNum():number
    {
        return  ++NotificationConstant.initNum;
    }
    public static MESSAGE_PANEL_BAG:number = NotificationConstant.getTypeNum();
}

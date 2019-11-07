const {ccclass, property} = cc._decorator;

@ccclass
export default class UISpriteFrame extends cc.Component 
{
    @property(cc.SpriteFrame)
    spriteFrame : cc.SpriteFrame[] = [];

    @property
    frameRateTime : number = 0;
    @property
    bDefaultPlay : boolean = false;
    @property
    bLoop : boolean = false;
    @property
    bSpriteFrameSize : boolean = true;

    private __sprite : cc.Sprite;

    private __bRunning : boolean = false;
    private __fRunningTime : number = 0;
    private __nSpriteIndex : number = 0;

    onLoad () 
    {
        this.__sprite = this.node.getComponent(cc.Sprite);
        if(null == this.__sprite)
        {
            this.__sprite = this.node.addComponent(cc.Sprite);
        }
    }

    start () 
    {
        if(this.bDefaultPlay)
        {
            this.__bRunning = true;
        }
    }

    update (dt) 
    {
        if(!this.__bRunning || this.frameRateTime <= 0)
        {
            return;
        }
        this.__fRunningTime += dt;
        if(this.__fRunningTime >= this.frameRateTime)
        {
            this.__sprite.spriteFrame = this.spriteFrame[this.__nSpriteIndex];
            if(this.bSpriteFrameSize)
            {
                this.__sprite.node.setContentSize(this.__sprite.spriteFrame.getOriginalSize());
            }
            this.__nSpriteIndex++;
            this.__fRunningTime = 0;
            if(this.__nSpriteIndex >= this.spriteFrame.length)
            {
                this.__nSpriteIndex = 0;
                if(!this.bLoop)
                {
                    this.__bRunning = false;
                }
            }
        }
    }

    public StopPlay()
    {
        this.__bRunning = false;
        this.__nSpriteIndex = 0;
        this.__fRunningTime = 0;
    }
}

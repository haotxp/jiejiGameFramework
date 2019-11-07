import gameDdzAnimationView from "./gameDdzAnimationView"


export default class gameDdzAnimationControl {

    public static Instance:gameDdzAnimationControl = null
    private view:gameDdzAnimationView

    constructor(v:gameDdzAnimationView){
        this.view = v
        gameDdzAnimationControl.Instance = this
    }

    /**
     * 展示飞机动画
     */
   showAirPlane(){
       this.view.airplane.active = true
       let plane_ani = this.view.airplane.getComponent(cc.Animation)
       let onFinished = function(){
            this.view.airplane.active = false
            plane_ani.off('finished',  onFinished,  this);
       }
       plane_ani.on('finished',  onFinished,  this);
       plane_ani.play('moveto')
   }

   /**
    * 展示春天动画
    */
   showSpring(){
       this.view.spring.active = true
       let spring_ani = this.view.spring.getChildByName('ani').getComponent(cc.Animation)
       let onFinished = function(){
            this.view.spring.active = false
            spring_ani.off('finished',  onFinished,  this);
       }
       spring_ani.on('finished',  onFinished,  this);
       spring_ani.play('spring')
   }

   /**
    * 播放炸弹
    */
   showZhaDan(){
       this.view.zhadan.active = true
       let zhadan_ani = this.view.zhadan.getComponent(cc.Animation)
       let onFinished = function(){
            this.view.zhadan.active = false
            zhadan_ani.off('finished',  onFinished,  this);
       }
       zhadan_ani.on('finished',  onFinished,  this);
       zhadan_ani.play('zhandanmoveto')
   }

   /**
    * 播放火箭
    */
   showRocket(){
        this.view.rocket.active = true
        let rocket_ani = this.view.rocket.getComponent(cc.Animation)
        let onFinished = function(){
            this.view.rocket.active = false
            rocket_ani.off('finished',  onFinished,  this);
        }
        rocket_ani.on('finished',  onFinished,  this);
        rocket_ani.play('move2')
   }
}

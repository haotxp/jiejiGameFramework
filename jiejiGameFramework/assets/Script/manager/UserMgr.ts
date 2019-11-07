import { PlayerDirectionType, Define, GamePlayerStatus } from '../Define/Define';

const { ccclass, property } = cc._decorator;

@ccclass
export default class UserMgr extends cc.Component {

    private static __instance: UserMgr;
    public static get Instance() {
        if (null == this.__instance) {
            this.__instance = new UserMgr();
        }
        return this.__instance;
    }

    /**
     * 所有玩家
     */
    private players : Map<number, Player> = null;

    /**
     * 服务器配置
     */
    public serverConfig: ServerConfig = null;

    public Initial() {
        this.players = new Map<number, Player>();
    }

    /**
     * 添加用户数据
     * 
     * @param dir 用户方位
     * @param playerData 用户数据
     */
    public joinPlayer(dir: PlayerDirectionType, playerData: Player) {
        if (playerData != null){
            this.players[dir] = playerData;
        }
    }

    /**
     * 根据方位获取用户
     * 
     * @param dir 方位
     */
    public getPlayer(dir: PlayerDirectionType): Player {
        let player: Player = this.players[dir];
        if(player == null){
            player = new Player();
            this.players[dir] = player;
        }

        return player;
    }

    /**
     * 根据方位获取用户
     * 
     * @param dir 方位
     */
    public getPlayerByServerPos(dir: number): Player {
        let player: Player = this.players[dir];
        this.players.forEach(p => {
            if(p.direction == dir){
                player = p;
            }
        });

        return player;
    }

    /**
     * 初始化服务器配置文件
     * @param config 
     */
    public initailServerConfig(config: any){
        if (this.serverConfig == null) {
            this.serverConfig = new ServerConfig();
        }
        this.serverConfig.baseNum = config.baseNum;
        this.serverConfig.info = config.info;
        this.serverConfig.isOpen = config.isOpen;
        this.serverConfig.limitNum = config.limitNum;

        this.serverConfig.name = config.name;
        this.serverConfig.operationTime = config.operationTime;
        this.serverConfig.servers = config.servers;

        return this.serverConfig;
    }

}

/**
 * 玩家对象
 */
export class Player {
    /**拥有钱 */
    public haveMoney: number;

    /**大厅配置文件 */
    public hallConfig: string;

    /**用户名 */
    public nickName: string;

    /**用户头像地址 */
    public headUrl: string;

    /**用户性别 */
    public sex: number;

    /**登陆天数 */
    public loginDays: number;

    /**用户ID */
    public playerId: string;

    /**token */
    public token: string;


    //==================临时属性======================

    /** 当前玩家的方位 服务器 */
    public direction: number = -1;

    /** 当前玩家的显示方位 前端显示 */
    public posView: number = -1;

    /** 当前玩家的状态 */
    public status: GamePlayerStatus = GamePlayerStatus.IDLE;

    /** 不花数量 */
    public buhua: number = 0;

}

/**
 * 服务器配置
 */
export class ServerConfig {

    /**现在上线 */
    public limitNum: number;
    /**是否开启 */
    public isOpen: number;

    /**服务器配置 */
    public servers: string;
    /**场次名字 */
    public name: string;
    /**坐费 */
    public baseNum: string;
    /**描述 */
    public info: string;

    /**场次时间 */
    public operationTime: number;

}

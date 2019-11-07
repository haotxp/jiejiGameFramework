import { Define } from '../Define/Define';
const {ccclass, property} = cc._decorator;

@ccclass
export default class WalletView extends cc.Component {
  public static Instance: WalletView = null;

  @property(cc.Button)
  btn_recharge: cc.Button = null;

  @property(cc.Button)
  btn_withdraw: cc.Button = null;

  @property(cc.Button)
  btn_wallet: cc.Button = null;

  onLoad() {
    WalletView.Instance = this;

    this.btn_recharge.node.on("click", this.onClickRechargeBtn, this);
    this.btn_withdraw.node.on("click", this.onClickWithdrawBtn, this);
    this.btn_wallet.node.on("click", this.onClickWalletBtn, this);
  }
  onClickWalletBtn() {
    let json = {
      type: "wallet",
      data: ""
    };

    Define.postMessageToLobby(JSON.stringify(json));
  }
  onClickWithdrawBtn() {
    let json = {
      type: "withdraw",
      data: ""
    };

    Define.postMessageToLobby(JSON.stringify(json));
  }
  onClickRechargeBtn() {
    let json = {
      type: "recharge",
      data: ""
    };

    Define.postMessageToLobby(JSON.stringify(json));
  }

  public hide() {
    this.node.active = false;
  }

  public show() {
    this.node.active = true;
  }
}

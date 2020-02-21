const userinfo = cc.Class({
    extends: cc.Component,
    properties: {
        loveNum: cc.Node,
        moneyNum: cc.Node,
        saveMaxNum: cc.Node,
        saveNowNum: cc.Node,
        receiveMoney: cc.Node,
        receiveBt: cc.Node,
        carNum: cc.Node,
        carTime: cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.saveMaxNum.getComponent(cc.Label).string = Global.saveMaxNum;
        this.moneyNum.getComponent(cc.Label).string = Global.money;
        this.receiveMoney.getComponent(cc.Label).string = Global.receiveMoney;
        this.carNum.getComponent(cc.Label).string = Global.carPeople + '人';
        this.carTime.getComponent(cc.Label).string = Global.carTime + '秒';
    },

    start() {

    },
    addLove() {
        let num = Global.love;
        num += 20;
        Global.love = num;
        this.loveNum.getComponent(cc.Label).string = num;
    },
    addMoney(data) {
        let num = Global.money;
        num += data;
        Global.money = num;
        this.moneyNum.getComponent(cc.Label).string = num;
    },
    addSaveNowNum() {
        let num = Global.saveNowNum;
        num += 1;
        Global.saveNowNum = num;
        if (Global.saveNowNum >= Global.saveMaxNum) {
            this.receiveBt.getComponent(cc.Button).interactable = true;
        } else {
            this.receiveBt.getComponent(cc.Button).interactable = false;
        }
        this.saveNowNum.getComponent(cc.Label).string = num;
    },
    reduceMoney(data) {
        let num = Global.money;
        num -= data;
        Global.money = num;
        this.saveNowNum.getComponent(cc.Label).string = num;
    },
    receiveClick() {
        let num = Global.money;
        num += Global.receiveMoney;
        Global.money = num;
        Global.saveNowNum -= Global.saveMaxNum
        if (Global.saveNowNum >= Global.saveMaxNum) {
            this.receiveBt.getComponent(cc.Button).interactable = true;
        } else {
            this.receiveBt.getComponent(cc.Button).interactable = false;
        }
        this.saveNowNum.getComponent(cc.Label).string = Global.saveNowNum;
        this.moneyNum.getComponent(cc.Label).string = num;
    }
    // update (dt) {},
});

export default userinfo;
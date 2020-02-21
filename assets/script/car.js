// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        anim: cc.Animation,
        content: cc.Node,
        door: cc.Node,
        bottomLayout: cc.Node,
        patient: cc.Prefab,
        Road: cc.Node,
        names: {
            default: [],
            type: [cc.String]
        },
        maxNum: cc.Node,
        nowNum: cc.Node,
    },
    onLoad() {
        this.maxNum.getComponent(cc.Label).string = Global.maxPeople
        // '扁鹊', '华佗', '吹哨人', '药神'
    },
    whetherMax() {
        clearTimeout(this.peopleOut)
        this.anim.pause();
        this.peopleOut = setTimeout(() => {
            if (Global.people >= Global.maxPeople) {
                this.anim.pause();
            } else {
                this.anim.resume();
            }
        }, Global.carTime * 1000)
    },
    createPeople: function () {
        this.anim.pause();
        this.scheduleCar();
    },

    //获取随机开始位置
    getStartPeoplePosition: function () {
        let randX = this.door.x + Math.random() * 100 - 50;
        let randY = this.door.y;
        return cc.v2(randX, randY);
    },

    setJumpAction: function () {
        let jumpUp = cc.moveBy(10, cc.v2(0, 900));
        let jumpDown = cc.moveBy(10, cc.v2(0, -900));
        return cc.repeatForever(cc.sequence(jumpDown, jumpUp));
    },

    getRoadPeoplePosition: function () {
        let randX = this.door.x;
        let randY = this.door.y - 300;
        return cc.v2(randX, randY);
    },

    //获取终点位置
    getEndPeoplePosition: function () {
        let randX = this.bottomLayout.x;
        let randY = this.bottomLayout.y - 230;
        return cc.v2(randX, randY);
    },

    scheduleCar: function () {
        // 以秒为单位的时间间隔
        const interval = 1;
        // 重复次数
        const repeat = Global.carPeople - 1;
        // 开始延时
        const delay = 1;
        let onCarPeople = Global.carPeople
        this.schedule(() => {
            let names = Global.names
            let people = cc.instantiate(this.patient);
            this.Road.addChild(people);
            people.setPosition(this.getStartPeoplePosition());
            let label = people.getChildByName("status");
            let rand = Math.floor(Math.random() * names.length);
            label.getComponent(cc.Label).string = names[rand];
            onCarPeople -= 1;
            Global.people += 1;
            this.nowNum.getComponent(cc.Label).string = Global.people
            if (onCarPeople == 0) {
                onCarPeople = Global.carPeople
                this.resumeCar();
            }
            let seq = this.setJumpAction();
            // // 执行动作
            people.runAction(seq);
        }, interval, repeat, delay);
    },

    resumeCar: function () {
        this.anim.resume();
    },

    start() {

    },

    // update (dt) {},
});

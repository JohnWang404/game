

cc.Class({
    extends: cc.Component,
    properties: {
        patient: {
            type: cc.Node,
            default: null
        },
    },

    onLoad() {
        let { patient } = this;
        //添加变量判断用户当前鼠标是不是处于按下状态
        let mouseDown = false;
        //当用户点击的时候记录鼠标点击状态
        patient.on(cc.Node.EventType.TOUCH_START, (event) => {
            let findName = patient.getChildByName('status').getComponent(cc.Label).string
            let allDepartment = this.node.parent.parent.getChildByName('Content').getChildByName('View').getChildByName('AllDepartment').children
            mouseDown = true;
            let starPosition = this.patient.getPosition();
            this.starPositionX = starPosition.x
            this.starPositionY = starPosition.y
            for (let i = 0; i < allDepartment.length; i++) {
                if (allDepartment[i].name == findName && !allDepartment[i].children[1].active) {
                    this.positionX = allDepartment[i].x;
                    this.positionY = allDepartment[i].y;
                } else if (allDepartment[i].name !== findName && !allDepartment[i].children[1].active) {
                    allDepartment[i].children[0].getChildByName('Mask').active = true
                }
            }
        });
        //只有当用户鼠标按下才能拖拽
        let act = null;
        patient.on(cc.Node.EventType.TOUCH_MOVE, (event) => {
            act = cc.director.getActionManager();
            act.pauseTarget(patient)
            // this.node.stopAllActions()
            if (!mouseDown) return;
            //获取鼠标距离上一次点的信息
            let delta = event.getDelta();
            //增加限定条件
            let minX = -patient.parent.width / 2 + patient.width / 2;
            let maxX = patient.parent.width / 2 - patient.width / 2;
            let minY = -patient.parent.height / 2 + patient.height / 2;
            let maxY = patient.parent.height / 2 - patient.height / 2;
            let moveX = patient.x + delta.x;
            let moveY = patient.y + delta.y;
            if (moveY < minY) {
                moveY = minY;
            } else if (moveY > maxY) {
                moveY = maxY;
            }
            //移动节点
            patient.x = moveX;
            patient.y = moveY;
        });
        //当鼠标抬起的时候恢复状态
        patient.on(cc.Node.EventType.TOUCH_END, (event) => {
            let findName = patient.getChildByName('status').getComponent(cc.Label).string
            let allDepartment = this.node.parent.parent.getChildByName('Content').getChildByName('View').getChildByName('AllDepartment').children
            let activeDepartment = null
            for (let i = 0; i < allDepartment.length; i++) {
                if (allDepartment[i].name == findName && !allDepartment[i].children[1].active) {
                    activeDepartment = allDepartment[i]
                } else if (allDepartment[i].name !== findName && !allDepartment[i].children[1].active) {
                    allDepartment[i].children[0].getChildByName('Mask').active = false
                }
            }
            let endPosition = patient.getPosition();
            if ((this.positionX - activeDepartment.width / 2 < endPosition.x && endPosition.x < this.positionX + activeDepartment.width / 2) && (this.positionY - activeDepartment.height / 2 < endPosition.y && endPosition.y < this.positionY + activeDepartment.height / 2)) {
                Global.people -= 1
                let header = patient.parent.parent.getChildByName('Header')
                header.getComponent('userinfo').addSaveNowNum();
                header.getComponent("userinfo").addLove()
                patient.parent.getChildByName('PeopleNum').getChildByName('NowNum').getComponent(cc.Label).string = Global.people
                if (Global.maxPeople - Global.people > 0) {
                    patient.parent.getChildByName('Car').getComponent('car').whetherMax()
                }
                patient.destroy();

                activeDepartment.children[0].getChildByName('Reward').active = true
                let spawn = cc.moveBy(1, 0, 30)
                activeDepartment.children[0].getChildByName('Reward').runAction(spawn);
                let opacityNum = 255
                let setOpacity = setInterval(() => {
                    opacityNum -= 12.25
                    activeDepartment.children[0].getChildByName('Reward').opacity = opacityNum
                }, 50)
                setTimeout(() => {
                    clearInterval(setOpacity)
                    let spawn = cc.moveBy(0, 0, -30)
                    activeDepartment.children[0].getChildByName('Reward').runAction(spawn);
                    activeDepartment.children[0].getChildByName('Reward').active = false
                }, 1000)
                patient.active = false
            } else {
                patient.x = this.starPositionX
                patient.y = this.starPositionY
                act.resumeTarget(patient)
            }
            mouseDown = false;
        });
        cc.director.getCollisionManager().enabled = true;
    },
    setJumpAction() {
        let jumpUp = cc.moveBy(10, cc.v2(0, 800));
        let jumpDown = cc.moveBy(10, cc.v2(0, -800));
        return cc.repeatForever(cc.sequence(jumpDown, jumpUp));
    },
    start() {

    },
    // update(dt) {
    // }
});

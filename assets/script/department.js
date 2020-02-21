
cc.Class({
    extends: cc.Component,
    properties: {
        departmentAtlas: cc.SpriteAtlas,
        Title: cc.Node,
        Produce: cc.Node,
        Name: cc.Node,
        Photo: cc.Node,
        Timeout: cc.Node,
        Level: cc.Node,
        UpdateBt: cc.Node,
        m_Title: cc.Node,
        m_Produce: cc.Node,
        m_Name: cc.Node,
        m_Photo: cc.Node,
        m_UnlockBt: cc.Node,
    },

    ctor() {
        this.gold = null;
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
    },
    start() {

    },
    init(data) {
        this.node.name = data.name;
        this.initData = data
        this.Title.getComponent(cc.Label).string = data.title
        this.Name.getComponent(cc.Label).string = data.name
        this.Photo.getComponent(cc.Sprite).spriteFrame = this.departmentAtlas.getSpriteFrame(data.photo)
        this.m_Title.getComponent(cc.Label).string = data.title
        this.m_Produce.getComponent(cc.Label).string = data.produce
        this.m_UnlockBt.getChildByName('Money').getComponent(cc.Label).string = this.initData.unlockedMoney
        this.m_Name.getComponent(cc.Label).string = data.name
        if (data.unlocked == true) {
            this.node.children[1].active = false
            this.setActiveDepartment()
        } else {
            this.node.children[0].active = false
            this.node.children[1].active = true
        }
    },
    setActiveDepartment() {
        let time = this.initData.timeout
        this.Timeout.getComponent(cc.Label).string = this.changeTimeType(this.initData.timeout)
        this.Produce.getComponent(cc.Label).string = this.initData.produce
        this.Level.getChildByName('LevelNum').getComponent(cc.Label).string = 'Lv.' + this.initData.level
        let levelProgress = (this.initData.level / 100).toString()
        let levelProgressArr = levelProgress.split(".")
        this.Level.getComponent(cc.ProgressBar).progress = '0.' + levelProgressArr[1]
        this.UpdateBt.getChildByName('Money').getComponent(cc.Label).string = this.initData.updateMoney
        this.timeInterval = setInterval(() => {
            time -= 1
            this.Timeout.getComponent(cc.Label).string = this.changeTimeType(time)
            if (time == 0) {
                time = this.initData.timeout
                this.changeMoney('add', this.initData.produce)
            }
        }, 1000)
    },
    unlockedClick() {
        if (Global.money > this.initData.unlockedMoney) {
            this.changeMoney('reduce', this.initData.unlockedMoney)
            this.node.children[0].active = true
            this.node.children[1].active = false
            Global.names.push(this.initData.name)
            this.setActiveDepartment()
        } else {
            cc.log('钱不够！')
        }
    },
    updateClick() {
        if (Global.money > this.initData.updateMoney) {
            this.initData.level += 1
            this.changeMoney('reduce', this.initData.updateMoney)
            this.initData.timeout -= 1
            this.initData.produce += 10
            this.initData.updateMoney += 100
            if (this.initData.timeout == 0) {
                this.initData.timeout = 1
            }
            clearInterval(this.timeInterval)
            this.setActiveDepartment()
        } else {
            cc.log('钱不够！')
        }

    },
    changeMoney(type, num) {
        if (type == 'add') {
            let money = this.node.parent.parent.parent.parent.getChildByName('Header')
            money.getComponent("userinfo").addMoney(num)
        } else {
            let money = this.node.parent.parent.parent.parent.getChildByName('Header')
            money.getComponent("userinfo").reduceMoney(num)
        }
    },
    changeTimeType(time) {
        let h = parseInt(time / 3600)
        let m = parseInt(time / 60)
        let s = time % 60
        if (h < 10) {
            h = '0' + h
        }
        if (m < 10) {
            m = '0' + m
        }
        if (s < 10) {
            s = '0' + s
        }
        let timeStr = h + ':' + m + ':' + s
        return timeStr
    }
    // update (dt) {},
});
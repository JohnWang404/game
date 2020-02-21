const { departments } = require("./departmentConfig");
cc.Class({
    extends: cc.Component,
    properties: {
        m_Patient: cc.Prefab,
        m_Department: cc.Prefab,
        departmentContent: cc.Node,
    },
    onLoad() {
        this.loadDepartment()
    },
    loadDepartment() {
        this.departmentContent.height = Math.ceil(departments.length / 2) * 350
        this.departmentContent.setPosition(0, - ((Math.ceil(departments.length / 2) - 3) * 175))
        for (let i = 0; i < departments.length; i++) {
            let newDepartment = cc.instantiate(this.m_Department);
            newDepartment.getComponent("department").init(departments[i])
            //newDepartment.getComponent("userinfo").init()
            this.departmentContent.addChild(newDepartment);
        }
    },
    start() {

    },

    // update (dt) {},
});

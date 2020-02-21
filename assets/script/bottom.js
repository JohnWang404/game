// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        education: cc.Prefab,
        ambulance: cc.Prefab,
        donate: cc.Prefab,
        task: cc.Prefab,
        promote: cc.Prefab,
    },

    ambulanceBtn: function(){
        let ambulance = cc.instantiate(this.ambulance);
        this.node.parent.addChild(ambulance);  
    },
    
    educationBtn: function(){
        let education = cc.instantiate(this.education);
        this.node.parent.addChild(education);  
    },

    donateBtn: function(){
        let donate = cc.instantiate(this.donate);
        this.node.parent.addChild(donate);  
    },

    taskBtn: function(){
        let task = cc.instantiate(this.task);
        this.node.parent.addChild(task);  
    },

    promoteBtn: function(){
        let promote = cc.instantiate(this.promote);
        this.node.parent.addChild(promote);  
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {},
});

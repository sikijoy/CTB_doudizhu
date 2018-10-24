import global from '../global'

cc.Class({
    extends: cc.Component,

    properties: {
        roomId_labele: {default: null, type: cc.Label},
        turnCount_lable: {default: null, type: cc.Label},
        houseCardCount_lable: {default:null, type: cc.Label},
        nornalBombRate_lable: {default: null, type: cc.Label},
        kingBombRate_lable: {default: null, type: cc.Label},



    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {
        this.roomId_labele.string = '房间号：' + global.playerDataManage.playerData.roomID;
        this.turnCount_lable.string = '局数：' + global.playerDataManage.playerData.turnCount;
        this.houseCardCount_lable.string = '消耗房卡：' + global.playerDataManage.playerData.houseCardCount;
        //console.log(JSON.stringify(global.playerDataManage.playerData));
        this.nornalBombRate_lable.string = '炸弹' + global.playerDataManage.playerData.special_rule.normal_bomb;
        this.kingBombRate_lable.string = '王炸' + global.playerDataManage.playerData.special_rule.king_bomb;
     },

    start () {

    },



    Dissolve_btnClick(event, custom) {
        console.log('room dissolve ');


    },
    wx_invite_btnClick(event, custom) {
              console.log('微信邀请');
    },

    ChatBtnClick(even, custiom){

        console.log('聊天');
    },

    // update (dt) {},
});

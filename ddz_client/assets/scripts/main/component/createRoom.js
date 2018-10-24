import global from '../../global'

cc.Class({
    extends: cc.Component,

    properties: {
      createRoom_config: null,

    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {
         this.createRoom_config = {turnCount: 5, houseCardCount: 1,special_rule: {"king_bomb": 3, "normal_bomb": 2}}
     },

    start () {

    },

    onBtnClick(event, customData) {
        let self = this;
        switch(customData) {
            case 'close':
                this.node.destroy();
                break;
            case 'create_room':
                console.log("create room success");

                global.socket.createRoom(self.createRoom_config,(err, event) => {
                    if(err) console.log('create err' + err);
                    else{
                        console.log('create room data = ' + JSON.stringify(event));

                        global.socket.joinRoom(event.data, (err, resp) => {

                            global.playerDataManage.playerData.joinRoomSuccess(global.playerDataManage.resManager.resources[defines.gameConfig.createRoomConfig], resp);
                            if(err){
                                console.log('client creatroom err =' + err);
                            }else cc.director.loadScene('gameSence');
                        });
                    }

                });
                this.node.destroy();
                break;
            default:
                break;

        }
        let  gameConfig = global.playerDataManage.resManager.resources[defines.gameConfig.createRoomConfig];
        if(customData.indexOf('count1') ===0 ){
            this.createRoom_config.houseCardCount = gameConfig.house_card_count['house_card_count1'];
        }else if(customData.indexOf('count2') ===0 ){
            this.createRoom_config.houseCardCount = gameConfig.house_card_count['house_card_count2'];
        }
        if(customData.indexOf('count') ===0)
        this.createRoom_config.turnCount = gameConfig.turn_count[customData];
        if(customData.indexOf('type') ===0 )
        this.createRoom_config.special_rule = gameConfig.special_rule[customData]



    },
    // update (dt) {},
});

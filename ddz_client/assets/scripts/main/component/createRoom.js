import global from '../../global'

cc.Class({
    extends: cc.Component,

    properties: {
      createRoom_config: null,

    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {
         this.createRoom_config = {turnCount: 5, special_rule: {"king_bomb": 3, "normal_bomb": 2}}
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

            if(customData.indexOf('count1') ===0){
                this.createRoom_config.turnCount = 5;
            }
            if(customData.indexOf('type1') ===0){
                this.createRoom_config.special_rule = {"king_bomb": 3, "normal_bomb": 2};
            }
        }

    },
    // update (dt) {},
});

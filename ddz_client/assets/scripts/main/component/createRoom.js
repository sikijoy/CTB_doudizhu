import global from '../../global'

cc.Class({
    extends: cc.Component,

    properties: {
      
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {},

    start () {

    },

    onBtnClick(event, customData) {
        switch(customData) {
            case 'close':
                this.node.destroy();
                break;
            case 'create_room':
                console.log("create room success");

                global.socket.createRoom('create room',(err, event) => {
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
        }

    },
    // update (dt) {},
});

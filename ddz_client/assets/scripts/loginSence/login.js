import global from '../global'


cc.Class({
    extends: cc.Component,

    properties: {
        make_node: {default: null, type: cc.Node},
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {
        // cc.loader.loadResArray(['config/createRoom'], (err, res) => {
        //     console.log('res =' + JSON.stringify(res));
        //     global.socket.init();  //建立连接
        // });

        let gameConfig = defines.gameConfig;
        let resList = [];
        for (let i in gameConfig){
            resList.push(gameConfig[i]);
        }
        global.playerDataManage.resManager.loadList(resList, () => {
           console.log('加载资源成功');
           console.log('resource = ' + JSON.stringify(global.playerDataManage.resManager.resources));

           global.socket.init();
        });
     },

    start () {


    },


    onBtnClick(event, customData) {
        if(customData === 'wxLogin') {
            global.socket.login(
                global.playerDataManage.playerData.uniqueID,
                global.playerDataManage.playerData.uid,
                global.playerDataManage.playerData.gameName,
                global.playerDataManage.playerData.headUrl,
                global.playerDataManage.playerData.houseCardCount,function(err, data){
                    if(err) console.log('login err' + err);
                    else {
                        //console.log('login data = ' + JSON.stringify(data));
                        global.playerDataManage.playerData.wxLoginSuccess(data);
                        console.log(global.playerDataManage.playerData);
                        cc.director.loadScene('main');
                    }

                });
            console.log('微信登陆');
            
        }


    },

    // update (dt) {},
});

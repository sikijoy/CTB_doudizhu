import global from '../global'

cc.Class({
    extends: cc.Component,

    properties: {
        tipstr: {default: null, type: cc.Label},                            //弹幕label
        barrage_str: '',                                                    //data 弹幕 string
        barrage_back: {default: null, type: cc.Node},                       //弹幕 背景节点
        scheduler: null,                                                    //弹幕计时器
        joinRoomPrefabs : {default: null, type: cc.Prefab},                 //加入房间 预设

    },


     onLoad () {
        global.socket.init();                                               //建立连接
        // global.socket.onLogin();
        this.login_btn = cc.find('New Button',this.node);
     },

    start () {
      /*
      let clinet_socket = io('http://127.0.0.1:3000');
      clinet_socket.on('welcome', (data) => {
      console.log(data);
      });
      */

      this.login_btn.on('click', () => this.LoginBtnClick('wx'), this);
      this.scheduler = cc.director.getScheduler();
      this.Barrage(this.barrage_str);


    },

    LoginBtnClick(event, customData)
    {
        console.log(customData);
        switch (customData) {
            case 'wx':
                global.socket.login(
                    global.playerDataManage.playerData.uniqueID,
                    global.playerDataManage.playerData.uid,
                    global.playerDataManage.playerData.gameName,
                    global.playerDataManage.playerData.headUrl,
                    global.playerDataManage.playerData.houseCardCount,function(err, data){
                        if(err) console.log('login err' + err);
                        else console.log('login data = ' + JSON.stringify(data));

                    });
            case 'joinRoom': let joinRoom = cc.instantiate(this.joinRoomPrefabs);
                             joinRoom.parent = this.node;

                break;
            default:
                break;
        }

    },

     update (dt) {
        
     },

    Barrage(barrage_str){
        this.tipstr.string = barrage_str;
        this.scheduler.scheduleUpdate(this, 10, false, (dt) => {
            this.tipstr.node.position = cc.v2(this.tipstr.node.position.x - 4, this.tipstr.node.position.y);
            if(this.tipstr.node.position.x < -1200){
                this.tipstr.node.position = cc.v2(1200, this.tipstr.node.position.y);
            }
        });
    },




});

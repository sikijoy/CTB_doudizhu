import global from '../global'

cc.Class({
    extends: cc.Component,

    properties: {
        tipstr: {default: null, type: cc.Label},                            //弹幕label
        barrage_str: '',                                                    //data 弹幕 string
        barrage_back: {default: null, type: cc.Node},                       //弹幕 背景节点
        scheduler: null,                                                    //弹幕计时器
        joinRoomPrefabs : {default: null, type: cc.Prefab},                 //加入房间 预设
        createRoomPrefabs: {default: null, type: cc.Prefab},                //

        player_img: {default: null, type: cc.Sprite},                       //玩家 图片
        player_id_label: {default: null, type: cc.Label},                   //玩家id
        player_name: {default: null, type: cc.Label},                        //玩家 名字
        player_house_count: {default: null, type: cc.Label},                 //玩家房卡

    },


     onLoad () {
                                                     
        // global.socket.onLogin();
        this.login_btn = cc.find('New Button',this.node);
        this.PlayInit();

     },

    start () {
      /*
      let clinet_socket = io('http://127.0.0.1:3000');
      clinet_socket.on('welcome', (data) => {
      console.log(data);
      });
      */

      this.login_btn.on('click', () => this.BtnClick('wx'), this);
      this.scheduler = cc.director.getScheduler();
      this.Barrage(this.barrage_str);


    },

    //按钮点击 事件
    BtnClick(event, customData)
    {
        console.log(customData);
        switch (customData) {
            case 'wx':
               
                break;
            case 'joinRoom': let joinRoom = cc.instantiate(this.joinRoomPrefabs);
                             joinRoom.parent = this.node;

                break;
            case 'createRoom': let createRoom = cc.instantiate(this.createRoomPrefabs);
                               createRoom.parent = this.node;
                               
                break;
            default:
                break;
        }

    },

     update (dt) {
        
     },


    // 弹幕 移动
    Barrage(barrage_str) {
        this.tipstr.string = barrage_str;
        this.scheduler.scheduleUpdate(this, 10, false, (dt) => {
            this.tipstr.node.position = cc.v2(this.tipstr.node.position.x - 4, this.tipstr.node.position.y);
            if(this.tipstr.node.position.x < -1200){
                this.tipstr.node.position = cc.v2(1200, this.tipstr.node.position.y);
            }
        });
    },


    //玩家 初始化
    PlayInit(){
        this.player_id_label.string = global.playerDataManage.playerData.uid;
        this.player_name.string = global.playerDataManage.playerData.gameName;
        this.player_house_count.string = global.playerDataManage.playerData.houseCardCount;
        let url = global.playerDataManage.playerData.headUrl;
        this.loadImg(this.player_img, url);
    },


    //远程加载图片
    //动态加载图片的方法
    loadImg (target_sprite, url){
        cc.loader.load(url, (err, texture) => {
            if(err) console.log('load img err =' + err);
            else {
                var sprite = new cc.SpriteFrame(texture);
                let old_width = target_sprite.node.width;
                let old_height = target_sprite.node.height;
                target_sprite.spriteFrame = sprite;
                target_sprite.node.scale = {
                    x: old_width / target_sprite.node.width,
                    y: old_height / target_sprite.node.height
                };
            }
        });
    },


});

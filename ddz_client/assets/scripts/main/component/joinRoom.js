

cc.Class({
    extends: cc.Component,

    properties: {
        roomId_labels: {default: [], type: cc.Label },                   //房间号 label数组
        roomId_str: {default:''},                                        //data 房间号 字符串

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {},

    start () {
        this.InitializationUI();

    },

    onButtonClick(event, customData) {
       // console.log('custom data = ' + customData);
        let regPos = /^\d+(\.\d+)?$/;                         //非负浮点数
        if(customData === 'close') {
            this.Close();

        }else if(customData === 'clear') {
            this.ClearRoomId();

        }else if(customData === 'back') {
            this.BackRoomId();
        } //else if(customData === '0' || customData === '1' || customData === '2' || customData === '3' || customData === '4' || customData === '5' || customData === '6' ||
        // customData === '7' || customData === '8' || customData === '9'){
        else if(regPos.test(customData)) {
            this.InPutRoomId(customData);
            //console.log('custom data = ' + customData);
        }

    },


    //初始化 界面ui
    InitializationUI () {
        this.ClearRoomId();
    },


    //关闭模块
    Close () {
        this.node.active = false;
        this.node.destroy();
    },


    //清空roomid字符串
    ClearRoomId () {
        this.roomId_str = '';
        for(let i = 0; i < this.roomId_labels.length; i++) {            
            this.roomId_labels[i].string = '';
        } 
    },


    //退回一个roomid字符串
    BackRoomId () {
        if(this.roomId_str.length === 0) return;
        this.roomId_str = this.roomId_str.substring(0, this.roomId_str.length - 1);
        //console.log('roomId_str = ' + this.roomId_str );
        this.roomId_labels[this.roomId_str.length].string = ''; 
    },


    //输入roomid字符串
    InPutRoomId(customData) {
        if(this.roomId_str.length >= 6) return;                  //注意这里 超出密码长度时候 字符串还未加长度 所以是7-1 
        else{
            this.roomId_str += customData;
            this.roomId_labels[this.roomId_str.length - 1].string = customData;
            if(this.roomId_str.length === 6) {                   //密码正好输入完成  自动触发 加入房间
                this.JoinRoom();                                 //加入房间                             
            }                                                 
        } 
    },

    JoinRoom() {
        console.log("加入房间");
    },



    // update (dt) {},
});

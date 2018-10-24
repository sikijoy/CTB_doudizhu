let PlayerData = function(){
    let that = {};
    that.uid = '100000' + Math.floor(Math.random() * 1000);
    that.uniqueID = '100000';
    that.gameName = '张世勇' + Math.floor(Math.random() * 10);
    that.headUrl = 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3712522495,1070174743&fm=200&gp=0.jpg';
    that.houseCardCount = 2;
    /*
    for (let i = 0; i < 7; i++){
        that.uniqueID += Math.floor(Math.random() * 10);
    }
    */
    that.wxLoginSuccess = function (event) {
        
        that.uniqueID = event.data.uniqueID;
        that.uid = event.data.uid;
        that.gameName = event.data.gameName;
        that.headUrl = event.data.headUrl;
        that.houseCardCount = event.data.houseCardCount;

    }
    that.onInitPlayerInfo = function (data){
        //监听服务器发来的初始化用户消息     //包含用户昵称,用户id,用户头像，房卡数量



    }

    that.joinRoomSuccess = function (config, event){
            console.log('data= ' + JSON.stringify(event));
            let roomConfig = event.data.data;
            that.turnCount = roomConfig.turnCount;
            that.houseCardCount = roomConfig.houseCardCount;
            that.special_rule = roomConfig.special_rule;
            that.roomID = roomConfig.roomID;
    };
    return that;
}
export default PlayerData;
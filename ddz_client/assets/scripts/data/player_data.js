let PlayerData = function(){
    let that = {};
    that.uid = '100000' + Math.floor(Math.random() * 1000);
    that.uniqueID = '100000';
    that.gameName = '张世勇' + Math.floor(Math.random() * 10);
    that.headUrl = 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=415293130,2419074865&fm=27&gp=0.jpg';
    that.houseCardCount = 0;
    /*
    for (let i = 0; i < 7; i++){
        that.uniqueID += Math.floor(Math.random() * 10);
    }
    */
    that.wxLoginSuccess = function (data) {
        that.uniqueID = data.uniqueID;
        that.gameName = data.gameName;
        that.headUrl = data.headUrl;

    }
    that.LoginSuccess = function (data){
        console.log('data = ' + JSON.stringify(data));
    }
    return that;
}
export default PlayerData;
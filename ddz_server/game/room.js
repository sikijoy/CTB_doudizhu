const Room = function (roomid, resp) {
    let that = {};
    let _roomID = roomid;
    let _playerList = [];
    that.joinPlayer = function (player, callback){
        if(callback){
            callback(null, resp)
        }
        _playerList.push(player);
    }

    Object.defineProperty(that, 'roomID', {
        get: function(){
            return _roomID;
        }
    });


    return that;

}


module.exports = Room;
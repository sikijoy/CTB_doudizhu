//const roomConfig = require("./../createRoom");
const Room = function (roomid, resp) {
    let that = {};
    let _roomID = roomid;
    let _playerList = [];
    let _turnCount = resp.turnCount;
    let _houseCardCount = resp.houseCardCount;
    let _specialRule = resp.special_rule;

    let _kingBomRate = _specialRule.king_bomb;
    let _normal_bomb = _specialRule.normal;
    console.log('room resp =' + JSON.stringify(resp));

    //玩家进入房间
    that.joinPlayer = function (player, callback){
        resp.roomID = _roomID;
        //resp.room = that;

        if(callback){
            callback(null, {resp: resp, room: that});
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
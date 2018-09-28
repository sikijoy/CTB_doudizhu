const Room =require('./room');
let _roomList = [];
exports.createRoom = function (data, callback) {
    console.log('server create room =' + JSON.stringify(data));
    let roomID = '';
    for(let i = 0; i < 6; i++){
        roomID  += Math.floor(Math.random() * 10);
    }
    console.log('roomid =', + roomID);
    let _room = Room(roomID, data);
    _roomList.push(_room);

    if(callback){
        callback(null, roomID);
    }
}

exports.joinRoom = function (roomID, player, callback) {
    for(let i = 0; i < _roomList.length; i++){
        let room = _roomList[i];
        if(room.roomID === roomID){
            room.joinPlayer(player, callback);
            return;
        }
    }

    //没有找到房间id
    if(callback){
        callback('this room is undefind');
    }
}
const Player = function (socket, data) {
    let that ={};
    let _socket = socket;
    let _uid = data.uid;
    let _ganmeName = data.gameName;
    let _headUrl = data.headUrl;
    let _houseCardCount = data.houseCardCount;
    let _callBackIndex = data.callBackIndex;
    _socket.emit('notify', {msg: 'login', callBackIndex: _callBackIndex, data: "welcome"});

    return that;
}

let _playerList = [];

function CreatePlayer (socket, data) {
    console.log('创建玩家 data = ' + JSON.stringify(data));
    let player = Player(socket, data);
    _playerList.push(player);
}

exports.createPlayer =  CreatePlayer;
const Player = function (socket, data) {
    let that ={};
    let _socket = socket;
    let _uniqueID = data.uniqueID;
    let _uid = data.uid;
    let _ganmeName = data.gameName;
    let _headUrl = data.headUrl;
    let _houseCardCount = data.houseCardCount;
    let _callBackIndex = data.callBackIndex;

    const notiyi = function (msg, index, data) {
        _socket.emit('notify', {msg: msg, callBackIndex: index, data: data});
    }

    // _socket.emit('notify', {msg: 'login', callBackIndex: _callBackIndex, data: {
    //         uniqueID: _uniqueID,
    //         uid: _uid,
    //         gameName: _ganmeName,
    //         headUrl: _headUrl,
    //         houseCardCount: _houseCardCount
    //     }});

     notiyi('login', data.callBackIndex, {
        uniqueID: _uniqueID,
        uid: _uid,
        gameName: _ganmeName,
        headUrl: _headUrl,
        houseCardCount: _houseCardCount
    });

    _socket.on('notify', (event) => {
        let msg = event.msg;
        let callBackIndex = event.callBackIndex;
        let data = event.data;

        switch (msg) {
            case 'create_room':
                console.log("创建房间");
                notiyi('create_room', callBackIndex, 'create room success');
                break;


            default:

                break;
        }
    });

    return that;
}


let _playerList = [];

function CreatePlayer (socket, data) {
    console.log('创建玩家 data = ' + JSON.stringify(data));
    let player = Player(socket, data);
    _playerList.push(player);
}

exports.createPlayer =  CreatePlayer;
const gameController = require('./gameController');

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

    // _socket.emit('notify', {msg: 'login', callBa ckIndex: _callBackIndex, data: {
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
            case 'createRoom':
                console.log("创建房间");
              //  notiyi('create_room', callBackIndex, 'create room success');
                gameController.createRoom(data, (err, resp) => {
                    if(err) console.log('创建房间失败' + err);
                    else{
                        notiyi('careatRoom', callBackIndex, {roomID: resp})
        }
    });
                break;

            case 'joinRoom':
                gameController.joinRoom(data.roomID, that, (err, resp) => {
                    notiyi('joinRoom', callBackIndex, {err: err, data: resp});
                });
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
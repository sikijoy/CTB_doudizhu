import defines from '../defines'
import EventListener from './../uitility/eventListener'

const Socket_Controller = function ( ) {
    let self = this;
    let that = {};
    let _socket = undefined;
    let _callBackMap = {};
    let _callBackIndex = 1;
    let _event = EventListener({});

    that.init = function () {
        _socket = io(defines.serverUrl);
        _socket.on('notify', (event) => {
           console.log('notify =' + JSON.stringify(event));
           let msg = event.msg;
            _event.emit(msg, event.data);
           let callBackIndex = event.callBackIndex;
           let callBack = _callBackMap[callBackIndex];
           if(callBack) callBack(null,event);
        });
    };

    function Notify (msg, data){
        _socket.emit('notify',  {msg: msg, callBackIndex: _callBackIndex, data: data});
        console.log('event =' + JSON.stringify(data));
        _callBackIndex ++;
    }

    function Resquest (msg, data, callback){
        _callBackMap[_callBackIndex] = callback;
        Notify(msg, data);
    }

    that.login = function (unique, uid, nickname, head, house_card_count,callback) {
        Resquest('login',{uniqueID: unique, uid: uid, gameName: nickname, headUrl: head,
                houseCardCount: house_card_count}, callback);

    }

    that.createRoom = function(data, callback){
        Resquest('createRoom', data, callback);
    }

    // that.onLogin = function (data) {
    //     _socket.on('login', (data) => {
    //         console.log('login = ' + JSON.stringify(data));
    //     });
    // };

    that.joinRoom = function (roomID, callback) {
        Resquest('joinRoom', roomID, callback);
    }
        
    return that;
}
export default Socket_Controller;
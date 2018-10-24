import  global from  './../global'

cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {
        global.socket.notifyGameSenceLoadEnd();

     },

    start () {

    },

    // update (dt) {},
});

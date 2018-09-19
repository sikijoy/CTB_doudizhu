

cc.Class({
    extends: cc.Component,

    properties: {
      
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {},

    start () {

    },

    onBtnClick(event, customData) {
        switch(customData) {
            case 'close':
                this.node.destroy();
                break;
            case 'create':
                console.log("create room success");
               // cc.director.loadScene('gameSence');

                break;
            case '':
        }

    },
    // update (dt) {},
});

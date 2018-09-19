const EventListener = function (obj) {
    let Register = {};

    // 监听事件
    obj.on = function (type , method){
        if (Register.hasOwnProperty(type)) {
            Register[type].push(method);
        }
        else{
            Register[type] = method;
        }
    }


    // 触发事件
    obj.emit = function (type) {
        if(Register.hasOwnProperty(type)){
            let  handlerList = Register[type];
            for(let i = 0; i < handlerList.length; i++){
                let args = [];
                let handler = handlerList[i];
                for (let j = 1; j < arguments.length; j++){
                    args.push(arguments[i]);
                }
                handler.call(obj,args);
            }
        }
    }


    // 移除事件
    obj.removeListener = function () {

    }


    // 移除所有事件
    obj.removeAllListener = function () {

    }

    return obj;
}

module.exports = EventListener;


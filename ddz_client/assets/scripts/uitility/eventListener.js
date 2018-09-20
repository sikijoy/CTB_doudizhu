const EventListener = function (obj) {
    let Regist = {};
    obj.regist = {};
    obj.on = function (type, method){
        if(Regist.hasOwnProperty(type))
        {
            Regist[type].push(method);    
        }else{
            Regist[type] = method
        }
    }


    obj.emit = function (type) {
        let handlist = [];
        if(Regist.hasOwnProperty(type)){
            handlist = Regist[type];
            for (let i = 0; i < handlist.length; i++)
            {
                let args = [];
                let handler = handlist[i];
                for (let j = 1; j < arguments.length; j++)
                {
                    args.push(arguments[j]);
                }
                handler.apply(this, args);
            }
        }
    }
    
    obj.removeListener = function (type, method) {
        
    }

    obj.removeAllListener = function () {

    }


    return obj;

}

export default EventListener;
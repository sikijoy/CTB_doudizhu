const socket = require('socket.io');
let mysql_client = require('./utility/mysqldb');
const playerController = require('./game/player');

const app = socket.listen(3000);
mysql_client.connect();        //与数据库建立连接

/*mysql_client.CheackPlayer("100000", (err, callback) => {

});
//let test_data = {unique_id: '100001', uid: '12346', game_name: '张世勇', head_url: 'sina.com', house_card_count: 5}
let test_data2 = {uid: '12346', game_name: '张世勇', head_url: 'sina.com', house_card_count: 5};
//mysql_client.insertPlayer(test_data);
mysql_client.updatePlayer( 'unique_id', '100001', test_data2);
*/

app.on('connection', (socket) => {
    console.log('a client connect');

    socket.emit('welcome', 'hello world');

    //收到玩家登陆消息
    socket.on('notify',(event) => {
       console.log('a user login = ' + JSON.stringify(event));
       let eventData = event.data;
       let callBackIndex = event.callBackIndex;
       let msg = event.msg;
       switch (msg) {
           case 'login':
               mysql_client.cheackPlayer(eventData.uniqueID, (err, sql_resulet) =>{
               if(err) consoel.log('err', err);
               if(sql_resulet.length === 0) {  //数据库中没有该玩家

                   console.log('数据库中没有该玩家,玩家不存在');
                   //插入玩家数据
                   mysql_client.insertPlayer({
                       unique_id: eventData.uniqueID,
                       uid: eventData.uid,
                       game_name: eventData.gameName,
                       head_url: eventData.headUrl,
                       house_card_count: 5
                   });

                   playerController.createPlayer(socket, {
                       uniqueID: eventData.uniqueID,
                       uid: eventData.uid,
                       gameName: eventData.gameName,
                       headUrl: eventData.headUrl,
                       houseCardCount: 5,
                       callBackIndex: callBackIndex
                   });

               }else {     //数据库中有该玩家
                           //更新玩家数据
                   console.log('数据库中有该玩家  更新玩家数据');
                   mysql_client.updatePlayer('unique_id', eventData.uniqueID, {
                       game_name: eventData.gameName,
                       head_url: eventData.headUrl,
                       house_card_count: eventData.houseCardCount
                   });

                   playerController.createPlayer(socket, {
                       uid: sql_resulet[0].uid,
                       gameName: eventData.gameName,
                       headUrl: eventData.headUrl,
                       houseCardCount: sql_resulet[0].house_card_count,
                       callBackIndex: callBackIndex
                   });

               }

           });
               break;
           default:
               break;

       }


    });

});
console.log('listing 3000 success');
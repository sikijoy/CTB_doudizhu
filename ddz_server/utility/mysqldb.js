const mysql = require('mysql');
//创建一个连接池,我们每次要发送 sql语句给mysql server都通过这个链接池来获得链接对象;
//链接对象的有效性就由这个连接池来负责管理
//避免mysql在一段时间后,没有数据通讯的情况下回自动关闭链接通道
let connect_pool = undefined;
let Connect = () => {
    connect_pool = mysql.createPool({
        host: "127.0.0.1",         //数据库服务器的ip地址
        port: 3306,                //my.cnf指定了的端口,默认的mysql的端口是3306，
        database: "ctb_doudizhu",   //要连接的数据库
        user: "root",
        password: "456123ok",
    });
}


//callback 1:error, 2:rowdata, 3:每个字段说明
//异步的mysql的操作能够提升我们服务器的吞吐量
function mysql_exec(sql, callback){
    //getConnection 是从这个连接池里面获得mysql的连接通道,连接句柄
    //这是个异步获取的,如果有结果了,就会调用一个回调函数
    //是否有错误,如果没有错误error = null,如果成功后面，
    //conn就是我们连接池返回给我们的和mysql server进行通讯的句柄
    connect_pool.getConnection((err, conn) => {
        if(err){  //如果有错误信息
            if(callback) callback(err, null, null);
            return ;
        }

        //发送数据库的cmd到我们mysql server;
        //query向服务器发送sql语句命令, 又返回的话, 就会调用我们的回调函数
        conn.query(sql, (sql_err, sql_resulet, fields_desic) => {
            if(sql_err){
                if(callback){
                    callback(sql_err, null, null);
                }
                return;
            }
            //sql_result返回给我们的信息
            //end

            //fileds_desic每个字段的描述
            //end

            if(callback){
                callback(null, sql_resulet, fields_desic);
            }
        });
        //end
    });
}

//用来封装插入sql语句
function InsertSql (table, data) {
    let sql_string = 'insert into ' + table;
    let keystr = '(';
    let vaulestr = 'values (';
    for (let key in data) {
        keystr += key + ',';
        if((typeof(data[key])).indexOf('string') === 0){
            vaulestr += "'" + data[key] + "',";
        }else vaulestr += data[key] + ",";
    }
    keystr = keystr.substring(0, keystr.length - 1);
    vaulestr = vaulestr.substring(0, vaulestr.length - 1);
    keystr += ') ';
    sql_string += keystr + vaulestr + ');';


    return sql_string;
}

//封装更新sql语句
//UPDATE table_name SET field1=new-value1, field2=new-value2
function UpdateSql (table, mainKey, mainValue, data) {
    let sql_str = 'update ' + table + ' set ';
    for (let i in data) {
        if((typeof (data[i])).indexOf('string') ===0){
            sql_str += i + '=' + "'" + data[i] + "'" + ','
        }else sql_str += i + '=' + data[i] + ','
    }

    if((typeof (mainValue)).indexOf('string') ===0){
        sql_str = sql_str.substring(0, sql_str.length - 1) + ' where ' + mainKey + "='" + mainValue + "';";
    }else sql_str = sql_str.substring(0, sql_str.length - 1) + ' where ' + mainKey + '=' + mainValue + ';';

    return sql_str;
}


//查找玩家数据
function CheackPlayer (unique_id, callback) {
    let sql = 'select * from t_playerinfo where unique_id = ' + unique_id + ';';
    mysql_exec(sql, (err, sql_resulet, fields_desic) => {
        if(err) console.log('err' + err);
        console.log('cheack player = ' + JSON.stringify(sql_resulet));
        callback(err, sql_resulet)
    });
}

//插入玩家数据
function InsertPlayer(data) {
    let sql = InsertSql('t_playerinfo', data);
    console.log('sql = ',sql);
    mysql_exec(sql, (err, sql_resulet, fields_desic) => {
       if(err) console.log('insert player info err = ' + err);
       else {
           console.log('res = ' + JSON.stringify(sql_resulet));
       }
    });
}

//更新玩家数据
function UpdatePlayer(mainKey, mainValue, data) {
    let sql = UpdateSql('t_playerinfo', mainKey, mainValue, data);
    console.log('sql = ', sql);
    mysql_exec(sql, (err, sql_resulet, fields_desic) => {
        if(err) console.log('updatePlayer err' + err);
        else console.log('updataPlayerinfo success = ' + JSON.stringify(sql_resulet));

    });
}

exports.connect = Connect;
exports.cheackPlayer = CheackPlayer;
exports.insertPlayer = InsertPlayer;
exports.updatePlayer = UpdatePlayer;
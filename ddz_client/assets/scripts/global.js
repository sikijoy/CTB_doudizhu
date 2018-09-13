import SocketController from './data/socket_controller'
import PlayerDataManage from './data/dataManage'
const  global = {};
global.socket = SocketController();
global.playerDataManage = PlayerDataManage();

export default global;
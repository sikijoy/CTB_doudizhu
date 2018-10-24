import PlayerData from './player_data'
import ResManager from './../uitility/resource_manage'

const playerDataManage = function () {
    let that = {};
    that.playerData = PlayerData();
    that.resManager = ResManager();
    return that;
}
export default playerDataManage;
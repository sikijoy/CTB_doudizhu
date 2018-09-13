import PlayerData from './player_data'
const playerDataManage = function () {
    let that = {};
    that.playerData = PlayerData();
    return that;
}
export default playerDataManage;
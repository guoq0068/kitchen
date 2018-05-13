/**
 * 负责把本地信息同步到后台服务器
 */
var upRoleInfo = function(openid, roleid) {
  wx.request({
    url: 'https://www.vtuanba.cn/role/update_role_info',
    method : 'POST',
    header: {
      'content-type': 'application/json'
    },
    data: {
      'openid' : openid,
      'roleid' : roleid
    },
    success: function (res) {
      console.log(res);
    }
  })
}


module.exports = {
  upRoleInfo : upRoleInfo
}
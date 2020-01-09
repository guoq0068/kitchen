//index.js
//获取应用实例
const app = getApp()
var  wxlogin = require("../../utils/login.js");
var  serverinfomgr = require("../../utils/serverinfomgr.js")
var  HTTP_PORT = 80;
var  HTTP_PORT_DEV = 8080;

var HTTPS_PORT = 443;
var HTTPS_PORT_DEV = 446;


var http_port = HTTP_PORT_DEV;
var https_port = HTTPS_PORT_DEV;
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userArray : null,
    index   :  0,
    openId : 0,

  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../main/main'
    })
  },
  onLoad: function () {
    //wxlogin.login(this); 
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
         
        }
      })
    }
    this.getUserType();
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  getUserType: function() {
    var _this = this;
    wx.request({
      url: 'https://www.vtuanba.cn:' + https_port +'/users',
      success: function(res) {
        
        var tempArray = new Array();
        for(var index =0 ;index < res.data.length; index++) {
          tempArray[index] = res.data[index].name;
        }
        _this.setData({

          userArray : tempArray
          
        })
        _this.setData({
          index: parseInt(res.data.length / 2),


        })
      }
    })
  },
  getConfigData : function() {

  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  bindIdConfirm : function(e) {
    serverinfomgr.upRoleInfo(this.data.openId, this.data.index);
  },
})

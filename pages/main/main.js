// pages/main/main.js

var utils = require("../../utils/util.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    addrs:["4号楼","9号楼","乐天新玛特"],
    addrIndex:0,
    names:[["阮老板","王老板","安老板"],["狂人","我住隔壁"],["快乐","春园"]],
    selectnames:[],
    nameIndex:0,
    categorys:["1荤1素","2荤1素"],
    categoryIndex : 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAddrData();
    this.setData(
      { selectnames: this.data.names[this.data.addrIndex] }
    )
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
 
    

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  bindAddrChange: function(e) {
    console.log(e.detail.value);
    this.setData( {
      addrIndex: parseInt(e.detail.value)
    });

    this.setData(
      { 
        selectnames: this.data.names[e.detail.value],
        nameIndex: 0
      },
        
        
    );
  },

  bindNameChange : function(e) {
    this.setData({
      nameIndex : parseInt(e.detail.value)
    })
  },

  bindCateChange : function(e) {
    this.setData(
      {
        categoryIndex: parseInt(e.detail.value)
      }
    );
  },

  formSubmit : function(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    var data = e.detail.value;
    data.select_addr    = this.data.addrIndex + 1;
    data.select_category = this.data.categoryIndex + 1;
    data.select_name    = this.data.selectnames[this.data.nameIndex];
    console.log(data);
    var content = this.data.addrs[this.data.addrIndex] + ' ' +
                  data.select_name + ', ' +
                  this.data.categorys[this.data.categoryIndex] + data.food_num + '份, ' +
                  '米饭' + data.rice_num + '份,' + '馒头 ' + data.mantou_num + "份."; 
    wx.request({
      url    : "https://www.vtuanba.cn:" + utils.https_port + "/order/confirm",
      method : 'post',
      data   :  data,
      header: {

        "Content-Type": "application/x-www-form-urlencoded"

      },
      success : (res) => {
        wx.showModal({
          title: '信息提交成功',
          content: content,
          confirmText: "拷贝信息",
          cancelText: "取消",
          success: function (res) {
            console.log(res);
            if (res.confirm) {
              wx.setClipboardData({
                data: content,
              })
            } else {
              console.log('用户点击辅助操作')
            }
          }
        });

        console.log(res);
      },
      fail : (res) => {
        console.log(res);
      }
    })
  },


  getAddrData : function() {
    var that = this;
    wx.request({
      url : "https://www.vtuanba.cn:" + utils.https_port + "/order/getaddrname",
      success : function(res) {
        var data = res.data;
        that.setData(
          {
            addrs:  data.addrs,
            categorys : data.cates,
            names : data.names,
            selectnames : data.names[0]
          }
        );
      } 
    })
  }

})
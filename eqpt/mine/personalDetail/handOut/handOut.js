// eqpt/mine/personalDetail/handOut/handOut.js
var baseurl = require('../../../../config.js').requestUrl
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    image: '',
    userID: '',
    src: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.miniCode();
  },
  //生成二维码
  miniCode: function () {
    var me = this;
    wx.request({
      url: baseurl + '/qureyToken',
      method: "POST",
      data: {

      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {

        wx.request({
          url: baseurl + '/getQRcode',
          method: "POST",
          data: {
            fun: "handOut",
            userID: app.globalData.userInfo.userID,
            token: res.data.token,
            page: "eqpt/mine/personalDetail/handOut/handIn"
          },
          header: {
            'content-type': 'application/json'
          },
          success: function (op) {

            me.setData({
              src: op.data.src
            })

          }
        })
      }
    })
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

    app.getUserFromDB(function (){
     
      var pages = getCurrentPages();
      var prevPage = pages[pages.length - 1];  //上一个页面

      //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
      prevPage.setData({
        "userInfo.fMyDept": app.globalData.userInfo.fMyDept,
        "userInfo.fMyDeptID": app.globalData.userInfo.fMyDeptID,
      })

    });
 
    console.log("返回时，走我了吗onUnload")
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
  
  }
})
//index.js
//获取应用实例
const app = getApp()
var GP
Page({
  data: {
      playerTab:["奇境课堂","舞台选取","自定义"],
      pptList: [
          { url: 'http://img.12xiong.top/emoji_default.gif' },
          { url: 'http://qiniu.308308.com/hx_245_2018_01_18_08_47_14.jpg' },
          { url: 'http://qiniu.308308.com/hx_245_2018_01_18_08_47_14.jpg' },
          { imaurlge_url: 'http://qiniu.308308.com/hx_245_2018_01_18_08_47_14.jpg' },
          { url: 'http://qiniu.308308.com/hx_245_2018_01_18_08_47_14.jpg' },
      ],
      showRoom: true,
  },
  //事件处理函数
  clickTab: function(e) {
      var is_room 
    if(e.detail == 0)
        is_room = true
    else
        is_room = false
    this.setData({
        showRoom:is_room 
    })
  },
    sendPPT(e) {
        var imageUrl = e.detail
        GP.setData({
            bgImageUrl: imageUrl
        })
    },





  onLoad: function () {
        GP = this
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
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})

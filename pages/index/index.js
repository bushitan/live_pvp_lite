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
      config:{},
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

    // 点击推流框
    clickPusher(e){
        wx.showActionSheet({
            itemList: ['转向'],
            itemColor: '',
            success: function(res) {},
            fail: function(res) {},
            complete: function(res) {},
        })
    },




    onLoad: function () {
        GP = this
        GP.onInit()

        var obj = {
            a:function(){
                console.log(this)
            }
        }
        var b = obj.a
        b()
    },

    onInit(){
        GP.setData({
            background:{
                url:"../../images/1.jpg",
                width:"100vw",
                height:"100vh",
            },
            pusher:{
                url:"rtmp://video-center.alivecdn.com/AppName/StreamName?vhost=live.12xiong.top",
                cover_url:"../../images/pusher_logo.png",
                x: "125rpx",
                y: "480rpx",
                width: "125rpx",
                height: "150rpx",
            },
            player: {
                url: "rtmp://video-center.alivecdn.com/AppName/StreamName?vhost=live.12xiong.top",
                cover_url: "../../images/pusher_logo.png",
                x: "80rpx",
                y: "600rpx",
                width: "120px",
                height: "50px",
            },
        })
    },

    getUserInfo: function(e) {
        console.log(e)
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
        })
    },
    onShareAppMessage(){}
})

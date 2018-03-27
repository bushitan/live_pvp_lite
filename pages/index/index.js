//index.js
//获取应用实例
const APP = getApp()

var Scripte = require('scripte.js');
var GP
Page({
    data: {
        //权限
        isMember:false,//是否会员
        isHost:true , //是否房主

        //页面显示
        show:{
            stage: true, //直播舞台
            menu: true, //菜单
            theme:false, //更换主题
            story: false, //故事菜单
            member:false,  //会员支付
        },


        playerTab:["选故事","会员"],
        pptList: [
            { url: 'http://img.12xiong.top/emoji_default.gif' },
            { url: '../../images/1.jpg' },
            { url: 'http://qiniu.308308.com/hx_245_2018_01_18_08_47_14.jpg' },
            { imaurlge_url: 'http://qiniu.308308.com/hx_245_2018_01_18_08_47_14.jpg' },
            { url: 'http://qiniu.308308.com/hx_245_2018_01_18_08_47_14.jpg' },
        ],
    },


    /**
     * 1 选故事 
     */
    //点击标签
    clickTab: function (e) {
        if (e.detail == 0)
            Scripte.ShowStory()
        else
            Scripte.ShowMember()

    },
    //点击图片，选择场景
    clickStoryImage(e) {
        var imageUrl = e.detail
        var background = GP.data.config.background
        background.url = imageUrl
        GP.setData({
            // showRoom: true,
            background: background
        })
        Scripte.ShowStage()
    },

    /**
     * 2 会员
     */
    payMember() {
        console.log("打开会员支付")
    },
    toTeacherPhone() {
        console.log("跳转到名师电话")
    },

    /**
     * 3 舞台
     */
    stageClose() {
        Scripte.ShowStory()
    },
    //点击背景图，打开菜单
    menuSwitch(){
        Scripte.MenuSwitch()
    },
    //打开主题
    themeOpen() {
        Scripte.ShowTheme()
    },
    //关闭主题
    themeClose() {
        Scripte.CloseTheme()
    },
    //选择主题
    themeConfirm() {
        GP.setData({
            showRoom: false,
        })
    },
    next() {
        console.log("下一页")},
    back() { 
        console.log("上一页")
    },

    //分享好友
    onShareAppMessage() { },


























   

    // 点击推流框
    clickPusher(e){
        // wx.showActionSheet({
        //     itemList: ['转向'],
        //     itemColor: '',
        //     success: function(res) {},
        //     fail: function(res) {},
        //     complete: function(res) {},
        // })
    },




    onLoad: function () {
        GP = this
        GP.onInit()

        Scripte.Init(APP,GP)
    },

    onInit(){
        var storyList = [
            {
                name: "吃火锅",
                summary: "一家人温馨的小故事",
                list: [
                    { url: 'http://img.12xiong.top/emoji_default.gif' ,
                        config: {
                            background: {
                                url: "../../images/1.jpg",
                                audio_url: "",
                                width: "100vw",
                                height: "100vh",
                            },
                            pusher: {
                                url: "rtmp://video-center.alivecdn.com/AppName/StreamName?vhost=live.12xiong.top",
                                cover_url: "../../images/pusher_logo.png",
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
                        },
                    },
                    { url: '../../images/1.jpg' },
                    { url: 'http://qiniu.308308.com/hx_245_2018_01_18_08_47_14.jpg' },
                ],                
            },
            {
                name: "春游",
                summary: "一起出去玩拉拉",
                list: [
                    { url: 'http://qiniu.308308.com/hx_245_2018_01_18_08_47_14.jpg' },
                    { url: 'http://img.12xiong.top/emoji_default.gif' },
                    { url: '../../images/1.jpg' },
                ],
            },
        ]

        GP.setData({
            config: storyList[0].list[0].config,
            storyList: storyList,
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
    
})

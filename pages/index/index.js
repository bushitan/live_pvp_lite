//index.js
//获取应用实例
const APP = getApp()
var API = require('../../utils/api.js');
var Scripte = require('scripte.js');
var JMessage = require('../../utils/im/jm.js')

var teacher = "live_app_3"
var student = 'live_pvp_user_5'
var GP
Page({
    data: {
        //权限
        isMember:false,//是否会员
        
        storyList:[],//场景的二维数组
        stage:{},//当前场景
        rol:0,
        col:0,

        userName: "live_app_3",//老师
        // userName:'live_pvp_user_5', //学生
        //页面显示
        show:{
            stage: false, //直播舞台
            menu: false, //菜单
            theme:false, //更换主题
            story: true, //故事菜单
            member: false,  //会员支付
        },


        playerTab:["选故事","会员"],
        
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
        var rol = e.detail.rol
        var col = e.detail.col
        GP.setData({
            rol:rol,
            col:col,
            stage: GP.data.storyList[rol].list[col],
        })

        var options = "col=" + col + "&rol=" + rol
        wx.navigateTo({
            url: '/pages/teacher/teacher?' + options,
        })

        return
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


    //分享好友
    onShareAppMessage() {
        return {
            title:"我给你讲个故事",
            path: "/pages/index/index?room_key=" + GP.data.roomKey,
        }
    },


    onLoad: function (options) {


        GP = this
        GP.checkTimeOut(options)
        // GP.onInit()
        Scripte.Init(APP, GP, API, JMessage)
        GP.getStoryList()
        GP.checkMember()
     
    },
    //次数超时的提示
    checkTimeOut(options){
        if (options.time_out != undefined)
            wx.showModal({
                title: '老师今天的次数已经用光',
                content: '你可以再邀请他一次，每天有2次机会哦',
            })
    },
    //获取故事列表
    getStoryList() {
        API.Request({
            url: API.PVP_STORY_GET_LIST,
            success: function (res) {
                console.log(res.data)
                APP.globalData.storyList = res.data.stage_list
                GP.setData({
                    storyList: res.data.stage_list,
                })
                // wx.setStorageSync("story_list", res.data.stage_list)
            },
        })
     },
     //检测是否会员
    checkMember() { 
        API.Request({
            url: API.PVP_MEMBER_CHECK,
            success: function (res) {
                console.log(res.data)
                APP.globalData.isMember = res.data.is_member
                GP.setData({
                    isMember: res.data.is_member,
                })
                // wx.setStorageSync("story_list", res.data.stage_list)
            },
        })
    },

    
})




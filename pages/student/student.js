// pages/student/student.js
const APP = getApp()
var API = require('../../utils/api.js');
var KEY = require('../../utils/key.js');
// var Scripte = require('scripte.js');
// var JMessage = require('../../utils/im/jm.js')

var teacher = "live_app_3"
var student = 'live_pvp_user_5'
var bushitan = "bushitan"
var GP

Page({

    /**
     * 页面的初始数据
     */
    data: {
        showTool: true,
    },
    stageClose() {
        wx.navigateTo({
            url: '/pages/index/index',
        })
    },
    menuSwitch() {
        GP.setData({
            showTool: !GP.data.showTool,
        })
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        GP = this
        APP.globalData.currentPage = this //当前页面设置为全局变量
        if (options.room_key == undefined)
            GP.joinFail()
        else{
            var room_key = options.room_key
            GP.joinRoom(room_key)
        }
    },
    joinRoom(room_key){
        API.Request({
            url: API.PVP_ROOM_JOIN,
            data: {
                room_key: room_key,
            },
            success: function (res) {
                //TODO 成功，进入房间，学生身份
                if (res.data.is_alive == true) {
                    // GP.joinSuccess()
                } else {
                    // GP.joinFail()
                    GP.joinSuccess()

                }
            },
        })
    },

    //监听消息
    getMessage(body) {
        if (text == "stage") {
            GP.getStageChange(body.stage)
        }
        if (text == "time_out") {
            GP.getTimeOut()
        }

    },
    //1改变场景
    getStageChange(stage){
        var custom = stage
        console.log(custom)
        wx.showToast({
            title: '设置主题成功',
            icon: "success",
        })
        GP.setData({
            stage: custom
        })
        console.log(GP)
    },
    //2房主到时间，踢下线
    getTimeOut(){
        wx.showModal({
            title: '房主时间到，请重新连接',
            success(){
                GP.stageClose()
            },
        })
    },



    //加入房间成功，初始化IM
    joinSuccess() {
        var user_info = wx.getStorageSync(KEY.USER_INFO)
        var userName = "live_pvp_user_" + user_info.user_id
        var passWord = "123"
        if (APP.globalData.JMessage == null) //IM 不存在，初始化
            APP.onInitIMStudent(userName, passWord , bushitan)
    },

    joinFail(){
        wx.showModal({
            title: '温馨提示',
            content: '房间已经过期，您可以选择任意一个故事，重新邀请好友',
        })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
    
    }
})
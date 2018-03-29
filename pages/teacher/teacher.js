// pages/teacher/teacher.js
const APP = getApp()
var API = require('../../utils/api.js');
var KEY = require('../../utils/key.js');
// var Scripte = require('scripte.js');
// var JMessage = require('../../utils/im/jm.js')

var teacher = "live_app_3"
var student = 'live_pvp_user_5'
var GP
var intervarID


Page({

    /**
     * 页面的初始数据
     */
    data: {

        isMember: false,//是否会员
        
        isTeacher: true, //是否房主
        showTheme:false,
        showTool:true,
    },

    /**
     * 1 菜单功能
     */
    //点击背景图，打开菜单
    stageClose() {
        wx.navigateBack({})
    },
    // 换主题
    themeSwitch() {
        GP.setData({ 
            showTheme: !GP.data.showTheme,
            showTool: GP.data.showTheme,
        })
    },
    menuSwitch(){
        GP.setData({
            showTool: !GP.data.showTool,
        })
    },
    // 选择
    clickStoryImage(e) {
        // GP.setData({ showTheme: true })
        var rol = e.detail.rol
        var col = e.detail.col
        GP.setData({
            rol: rol,
            col: col,
            stage: GP.data.storyList[rol].list[col],
            showTheme: false,
            showTool: true,
        })

        //4 im 更换主题，想学生发送消息
        if (GP.globalData.student_name == null){
            wx.showToast({
                title: '对方不在线，请邀请好友',
                icon:"loading",
            })
        }
        else
            GP.sendStage()
    },
    next() {
        // console.log("下一页")
        var rol = GP.data.rol
        var col = GP.data.col
        if (col < GP.data.storyList[rol].list.length - 1) {//不是最后一页
            var temp_col = col + 1
            GP.setData({
                col: temp_col,
                stage: GP.data.storyList[rol].list[temp_col],
            })
        }
    },
    back() {
        // console.log("下一页")
        var rol = GP.data.rol
        var col = GP.data.col
        if (col > 0) {//不是最后一页
            var temp_col = col - 1
            GP.setData({
                col: temp_col,
                stage: GP.data.storyList[rol].list[temp_col],
            })
        }

    },



    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        GP = this
        APP.globalData.currentPage = this //当前页面设置为全局变量
        console.log(options.col, options.rol)
        var rol = parseInt(options.rol)
        var col = parseInt(options.col)
        var _stage = APP.globalData.storyList[rol].list[col]
        GP.setData({
            rol:rol,
            col:col,
            stage: _stage,
            storyList: APP.globalData.storyList,

            isMember: APP.globalData.isMember, //是否会员
        })
        
        GP.createRoomSuccess()

        
    },
    /**
     * 2 IM功能
     */
    //1 创建房间成功，初始化IM
    createRoomSuccess() {
        var user_info = wx.getStorageSync(KEY.USER_INFO)
        var userName = "live_app_3"
        // var userName = "bushitan"
        var passWord = "123"
        if (APP.globalData.JMessage == null) //IM 不存在，初始化
            APP.onInitIMTeacher(userName, passWord)
    },

    //2 监听学生上线消息
    getMessage(body) {
        if (text == "on") { //接收学生的上线信息
            GP.getStudentOnline(body.student_name )
        }

    },
    //1 提示学生上线
    getStudentOnline(student_name){
        wx.showModal({
            title: '学生上线',
        })
        //2 存储学生信息
        APP.globalData.student_name = student_name //学生名字
        //3发送回复
        GP.sendStage()
    },



    //3 像学生发送舞台信息
    sendStage() {

        var t_call = {
            text: "stage",
            stage: GP.data.stage
        }
        APP.globalData.JMessage.sendSingleCustom(APP.globalData.student_name, t_call)
    },
    

    // 倒计时
    SetCountDown() {
        var memberTempLive = wx.getStorageSync(KEY.MEMBER_TEMP_LIVE)
        if (memberTempLive === "" || memberTempLive==0 ){
            //TODO 踢人下线
        }
        else{

            memberTempLive--
            wx.setStorageSync(KEY.MEMBER_TEMP_LIVE, memberTempLive)
        }

        var leftTime = 2
        intervarID = setInterval(
            function () {
                // GP.setData({
                //     clock: '录音倒计时：' + leftTime + "秒"
                // })
                console.log(leftTime)
                leftTime = leftTime - 1
                if (leftTime == 0) {
                    clearInterval(intervarID);
                    GP.getOut() //踢下线
                   
                }
            },
            1000
        )
    },

    //踢出去
    getOut(){
        wx.showModal({
            title: '时间到',
        })
        var t_call = {
            text: "time_out",
        }
        APP.globalData.JMessage.sendSingleCustom(APP.globalData.student_name, t_call)
    },



    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        GP.SetCountDown()


        var _live = 1 //每日免费次数
        var _today = new Date().getDay()
        var tempLive = wx.getStorageSync(KEY.MEMBER_TEMP_LIVE)
        var path = "/pages/student/student?room_key=" + GP.data.roomKey //原始分享路径


        var refreshDay = wx.getStorageSync(KEY.MEMBER_REFRESH_DAY)
        if (refreshDay != _today) {  //日期不一样，重置次数
            tempLive = _live
            refreshDay = _today
            wx.setStorageSync(KEY.MEMBER_TEMP_LIVE, tempLive)
            wx.setStorageSync(KEY.MEMBER_REFRESH_DAY, refreshDay)
        }

        if (tempLive <= 0) { //分享次数没有，让学生直接跳到首页
            path = "/pages/index/index?time_out=true" //让受邀请的用户直接进入首页
        }
        return {
            title: "我给你讲个故事",
            path: path,
            success:function(res){
                if (tempLive <= 0) {
                    wx.showModal({
                        title: '临时次数已到',
                        content: '成为会员可以无限次使用哦',
                    })
                }
            },
        }
    }
})
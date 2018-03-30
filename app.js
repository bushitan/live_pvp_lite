//app.js

var JMessage = require('utils/im/jm.js')
var KEY = require('utils/key.js')
var API = require('utils/api.js');
var GP
App({
    onLaunch: function () {
        //初始化故事列表
        GP = this
        // GP.globalData.storyList = wx.getStorageSync("story_list")
        GP.globalData.storyList =[{ "list": [{ "pusher_height": "150rpx", "stage_id": 1, "pusher_x": "125rpx", "stage_background": "../../images/1.jpg", "pusher_width": "125rpx", "stage_orientation": 1, "stage_audio": "", "player_width": "120px", "stage_cover": "../../images/pusher_logo.png", "pusher_image": "../../images/pusher_logo.png", "stage_height": "", "player_height": "50px", "player_y": "600rpx", "stage_width": "100vw", "player_image": "../../images/1.jpg", "player_x": "80rpx", "pusher_y": "480rpx" }, { "pusher_height": "", "stage_id": 2, "pusher_x": "", "stage_background": "../../images/pusher_logo.png", "pusher_width": "", "stage_orientation": 0, "stage_audio": "", "player_width": "", "stage_cover": "../../images/1.jpg", "pusher_image": "", "stage_height": "", "player_height": "", "player_y": "", "stage_width": "", "player_image": "", "player_x": "", "pusher_y": "" }, { "pusher_height": "", "stage_id": 3, "pusher_x": "", "stage_background": "../../images/pusher_logo.png", "pusher_width": "", "stage_orientation": 0, "stage_audio": "../../images/1.jpg", "player_width": "", "stage_cover": "../../images/1.jpg", "pusher_image": "", "stage_height": "", "player_height": "", "player_y": "", "stage_width": "", "player_image": "", "player_x": "", "pusher_y": "" }], "name": "次火锅", "description": "一家人温馨吃火锅" }]
        // GP.onIM()
    },

    //学生登录IM
    onInitIMStudent(username, password, teacher_name){
        //初始化IM
        JMessage.init("", username, password, GP.studentSuccess);
        GP.globalData.teacher_name = teacher_name//老师名字
        GP.globalData.student_name = username //学生名字
    },
    studentSuccess(){
        var s_say = { text: "on", student_name: GP.globalData.student_name}
        JMessage.sendSingleCustom(GP.globalData.teacher_name, s_say) //学生打招呼
        GP.listen()
    },
    //教师登录IM
    onInitIMTeacher(username, password) {
        //初始化IM
        JMessage.init("", username, password, GP.teacherSuccess);
    },
    teacherSuccess() {

        // var s_say = { text: "on", student_name:'1' }
        // JMessage.sendSingleCustom('bushitan', s_say) //学生打招呼

        GP.listen()
    },


    listen() {      
        GP.globalData.JMessage = JMessage
        // GP.globalData.currentPage.getMessage({})
        //监听单聊信息
        JMessage.JIM.onMsgReceive(function (data) {
            var body = data.messages[0].content.msg_body
            console.log(body)
            var text = body.text
            GP.globalData.currentPage.getMessage(body)
            // if (text == "on") { //接收学生的上线信息
            //     GP.globalData.currentPage.getMessage(body.student_name)
            // }
            // if (text == "stage") {//接收老师的同步信息
            //     GP.globalData.currentPage.getMessage(body.stage)
            // } 
            // if (text == "stage") {//接收老师的同步信息
            //     GP.globalData.currentPage.getMessage(body.stage)
            // }
        })
    },

    globalData: {
        userInfo: null, 
        currentPage:null,//当前页面
        isMember:false,
        // stage:null,//当前舞台
        storyList:[],//故事列表
        JMessage: null,//IM系统
        teacher_name: "",//教师名字
        student_name: "",//学生名字
    }
})
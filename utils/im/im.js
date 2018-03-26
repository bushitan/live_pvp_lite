

var JMessage = require('jmessage-wxapplet-sdk-1.4.0.min.js')
var RANDOM = require('random.js')
var MD5 = require('md5.js')
var appKey = "12101be04a3f9c65a1cd24b3"
var Key = "f803e0a4a08c48a31456b4ed"

// 在任意Object对象中定义一个getter
// getter的返回值中包含该Object的引用
// 使用console.log打印该Object对象
// 此时类型转换函数JSON.stringify抛出`converting circular structure to JSON`异常
// 极光的IM使用console.log() 的坑逼！

/**
 * arg:
 *_GP : 全局变量，
 * username:用户名字
 * password: 密码
 * loginSuccessFun：登陆成功函数
 * loginFailFun: 登陆失败函数
 */

var username 
var password 
function Jim(_GP, username, password, loginSuccessFun, loginFailFun){
    var that = this
    this.GP = _GP
    username = username
    password = password
    this.loginSuccessFun = loginSuccessFun
    this.loginFailFun = loginFailFun
    this.jim = new JMessage({
        // debug : true
    })
    var timestamp = new Date().getTime()
    var _random = RANDOM.Get32()
    var signature = MD5.hex_md5("appkey=" + appKey + "&timestamp=" + timestamp + "&random_str=" + _random + "&key=" + Key + "")
    // console.log(signature)

    // console.log("11")
    // console.log(_GP)
    // console.log(this._GP)
    // console.log(this)
    // console.log(that)
    //初始化
    this.jim.init({
        "appkey": appKey,
        "random_str": _random,
        "signature": signature,
        "timestamp": timestamp
    }).onSuccess(function (data) {
        // console.log(data)
        // console.log("222")
        // console.log(this)
        // console.log(that)
        // console.log("that")
        that.register()
    }).onFail(function (data) {
            console.log(data)
        //TODO
    });  

    //用户注册
    this.register = function(){
        // console.log(this)
        this.jim.register({
            'username': username,
            'password': password,
        }).onSuccess(function (data) {
            // console.log(data)
            that.login()
        }).onFail(function (data) {
            console.log('注册失败', data)
            if (data.code == 882002){
                that.login()
            }
        });
    }

    //用户登录
    this.login = function () {
        console.log('准备登录')
        this.jim.login({
            'username': username,
            'password': password,
        }).onSuccess(function (data) {
          console.log('登录成功', data)
            that.loginSuccessFun(data)
        }).onFail(function (data) {
          console.log('登录失败', data)
            if (tha.loginFailFun != undefined)
                that.loginFailFun(data)
        });
    }

    //返回钩子
    return this.jim
}




module.exports = {
    Jim: Jim,
}


        // var appKey = "12101be04a3f9c65a1cd24b3"
        // var Key = "f803e0a4a08c48a31456b4ed"
        // var timestamp = new Date().getTime()
        // var _random = RANDOM.Get32()

        // var signature = MD5.hex_md5("appkey=" + appKey + "&timestamp=" + timestamp + "&random_str=" + _random+"&key=" + Key+"")
        // console.log(signature)
        // jim.init({
        //     "appkey": appKey,
        //     "random_str": _random,
        //     "signature": signature,
        //     "timestamp": timestamp
        // }).onSuccess(function (data) {
        //     console.log(data)
        //     GP.register()

        //     jim.isInit()
        //     jim.isConnect()
        // }).onFail(function (data) {
        //     //TODO
        // });  

    // register(){
    //     jim.register({
    //         'username': 'bushitan',
    //         'password': 'w3214560',
    //         'extras': { 'key1': 'val1', 'key2': 'val2' },
    //         'address': '深圳'
    //     }).onSuccess(function (data) {
    //         console.log(data)
    //         //data.code 返回码
    //         //data.message 描述
    //         GP.login()
    //     }).onFail(function (data) {
    //         // 同上
    //         console.log(data)
    //         GP.login()
    //     });
    // },

    // login(){
    //     jim.login({
    //         'username': 'bushitan',
    //         'password': 'w3214560'
    //     }).onSuccess(function (data) {
    //         console.log(data)
    //         GP.inChatRoom()

    //         // 监听信息
    //         console.log("信息监听",data)
    //         jim.onMsgReceive(function (data) {
    //             console.log("监听",data)
    //         });
    //          //data.code 返回码
    //         //data.message 描述
    //         //data.online_list[] 在线设备列表
    //         //data.online_list[].platform  Android,ios,pc,web
    //         //data.online_list[].mtime 最近一次登录时间
    //         //data.online_list[].isOnline 是否在线 true or false
    //         //data.online_list[].isLogin 是否登录 true or false
    //         //data.online_list[].flag 该设备是否被当前登录设备踢出 true or false
    //     }).onFail(function (data) {
    //         // 同上
    //         console.log(data)
    //     });
    // },

    // inChatRoom() {
    //     console.log("inChatRoom")
    //     jim.enterChatroom({
    //         'id': '12510285'
    //     }).onSuccess(function (data) {
    //         console.log("进入成功", data)
    //         jim.onRoomMsg(function (data) {
    //             console.log("聊天室监听", data)
    //             // data.room_id 聊天室 id
    //             // data.msg_id 消息 id
    //             // data.ctime_ms 消息生成时间
    //             // data.content
    //         });
    //         //data.code 返回码
    //         //data.message 描述
    //         //data.id 聊天室 id
    //         }).onFail(function (data) {
    //             console.log("进入失败", data)

    //         //data.code 返回码
    //         //data.message 描述
    //     });
    // },

    // sendMsg(){
    //     jim.sendChatroomMsg({
    //         'target_rid': '12510285',
    //         'content': 'disaidhsoadfih fhdj  djgbfkdghkj'
    //     }).onSuccess(function (data,msg) {
    //         console.log(data)
    //         //data.code 返回码
    //         //data.message 描述
    //         //data.room_id 目标聊天室 id
    //         //data.msg_id 发送成功后的消息 id
    //         //data.ctime_ms 消息生成时间,毫秒
    //     }).onFail(function (data) {
    //         //data.code 返回码
    //         //data.message 描述
    //     });
    // },

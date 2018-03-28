
module.exports = new (function() {
    var that = this
    var APP = null
    var GP = null
    var API = null
    this.Init = function (_APP, _GP, _API){
        APP = _APP
        GP = _GP
        API = _API
    }

    //获取故事列表
    this.RequestStoryList = function(){
        API.Request({
            url: API.PVP_STORY_GET_LIST,
            success: function (res) {
                console.log(res.data)
                GP.setData({
                    storyList: res.data.stage_list,
                    // config: res.data.stage_list[0],
                    // config: storyList[0].list[0].config,
                    // storyList: storyList,
                })
                // GP.jmInit() //IM登陆  
            },
        })
    }

    //加入IM
    this.jmInit = function () {

    }
    //获取故事列表
    this.RequestRoomCreate = function () {
        API.Request({
            url: API.PVP_ROOM_CREATE,
            success: function (res) {
                // console.log(res.data)
                GP.setData({
                    roomKey: res.data.room_key, //房间秘钥
                    roomConfig: res.data.room_config, //房间推流、拉流配置
                })

                // that.RequestRoomJoin(res.data.room_key)
                // that.RequestRoomJoin(res.data.room_key)
                //TODO 进入房间，房主身份
            },
        })
    }

    //获取故事列表
    this.RequestRoomJoin = function (room_key) {
        API.Request({
            url: API.PVP_ROOM_JOIN,
            data:{
                room_key: room_key,
            },
            success: function (res) {
                // console.log(res.data)
                //TODO 成功，进入房间，学生身份
                if (res.data.is_alive == true){
                    //TODO 成功，进入房间，学生身份
                    // that.ShowStage()
                    GP.inStageStudent()
                    
                } else{
                    // wx.showModal({
                    //     title: '温馨提示',
                    //     content: '房间已经过期，您可以选择任意一个故事，重新邀请好友',
                    // })
                }

                

            },
        })
    }



    /**
     * 页面显示控制
     */
    function baseShow(){
        return {
            stage: false, //直播舞台
            menu: false, //工具
            theme: false,//更换主题
            story: false, //故事菜单
            member: false,  //会员支付
        }
    }
    // 打开选故事页面
    this.ShowStory = function () {
        var _show = baseShow()
        _show.story = true
        GP.setData({ show: _show })
    }
    // 打开会员页面
    this.ShowMember = function () {
        var _show = baseShow()
        _show.member = true
        GP.setData({ show: _show })
    }

    // 打开舞台
    this.ShowStage = function () {
        var _show = baseShow()
        _show.stage = true
        _show.menu = true
        GP.setData({ show: _show })
    }

    //菜单切换
    this.MenuSwitch = function () {
        var _show = GP.data.show
        _show.menu = !_show.menu
        GP.setData({ show: _show })
    }

    //显示主题
    this.ShowTheme = function () {
        var _show = baseShow()
        _show.theme = true
        _show.stage = true
        GP.setData({ show: _show })
    }
    //关闭主题
    this.CloseTheme = function () {
        var _show = baseShow()
        _show.stage = true
        _show.menu = true
        console.log(_show)
        GP.setData({ show: _show })
    }
    
})
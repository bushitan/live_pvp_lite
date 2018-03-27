
module.exports = new (function() {
    var APP = null
    var GP = null

    this.Init = function(_APP,_GP){
        APP = _APP
        GP = _GP
    }

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
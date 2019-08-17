//app.js
const TOKEN = 'token'
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    const token = wx.getStorageSync(TOKEN)
    // 判断token是否有值
    if(token &&token.length !==0) {
      // 已经有token验证是否过期
      console.log(token)
      this.check_token(token)
    } else {
      // 没有token进行登录操作
      
      this.login()
    }
    
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  check_token (token) {
    wx.request({
      url: 'http://123.207.32.32:3000/auth',
      method: 'post',
      header: {
        token
      },
      success:res=>{
        if(!res.data.errCode) {
          this.globalData.token = token
        } else {
          this.login()
        }
      },
      fail: err => {
        console.log(err)
      }
    })
  },
  login() {
    wx.login({
      success: (res) => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        const code = res.code
        wx.request({
          url: 'http://123.207.32.32:3000/login',
          data: {
            code
          },
          method: 'post',
          success: (res) => {
            const token = res.data.token
            this.globalData.token = token
            wx.setStorageSync(TOKEN,token )
          }
        })
      }
    })
  },
  globalData: {
    userInfo: null,
    token: '',
    cartList: []
  }
})
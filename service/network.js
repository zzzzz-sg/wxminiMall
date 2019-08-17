import {baseUrl,timeout} from './config.js'

export default function (options) {
  return new Promise ((resolve,reject)=> {
    wx.showLoading({
      title: '数据加载中ing',
    })
    wx.request({
      url: baseUrl + options.url,
      method:options.method ||'get',
      data: options.data ||{},
      success:resolve,
      fail:reject,
      complete:res =>{
        wx.hideLoading()
      }
    })
  })
}
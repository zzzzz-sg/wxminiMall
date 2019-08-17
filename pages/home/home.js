// pages/home/home.js
import { getMultidata, getGoodsData } from '../../service/home.js'
const types = ['pop', 'new', 'sell']
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners: [],
    recommend: [],
    titles: ['流行','新款','精选'],
    currentType: 'pop',
    topPosition:0,
    showbackicon:false,
    goods:{
      pop:{
        page:0,
        list:[]
      },
      new: {
        page: 0,
        list: []
      },
      sell: {
        page: 0,
        list: []
      }
    },
    isTop: false
  },
  // 下拉加载更多
  loadMore() {
    this._getGoodsData(this.data.currentType)
  },
  // 点击按钮返回顶部
  backtop() {
    this.setData({
      showbackicon:false,
      topPosition:0
    })
  },
  // 接受子组件自定义事件
  TabClick(e) {
    let currentType = ''
    switch(e.detail.index) {
      case 0:
        currentType = 'pop'
        break;
      case 1:
        currentType = 'new'
        break;
      case 2:
        currentType = 'sell'
        break;
    }
    this.setData({
      currentType
    })
  },
  // tab-control滑动到顶部触发的事件
  scrollPosition (e) {
    if(e.detail.scrollTop >=512) {
      this.setData({
        isTop:true,
        showbackicon:true
      })
    }
    else {
      this.setData({
        isTop:false
      })
    }
    // this.setData({
    //   isTop:!isTop
    // })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 请求multidata数据
    getMultidata().then(res => {
      const banners = res.data.data.banner.list
      const recommend = res.data.data.recommend.list

      this.setData({
        banners,
        recommend
      })
    }),
    // 请求goods数据
    this._getGoodsData('pop')
    this._getGoodsData('new')
    this._getGoodsData('sell')
  },
  // 网络请求函数
  _getGoodsData(type) {
    // 
    const page = this.data.goods[type].page + 1
    getGoodsData(type, page).then(res => {
      const list = res.data.data.list
      // 2.将数据临时获取
      const goods = this.data.goods;
      goods[type].list.push(...list)
      goods[type].page += 1;
      // 3.最新的goods设置到goods中
      this.setData({
        goods: goods
      })
    })},


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
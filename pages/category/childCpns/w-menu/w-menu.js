// pages/category/childCpns/w-menu/w-menu.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    categories: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentIndex:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    changeIndex (e) {
      const currentIndex = e.target.dataset.index
      this.setData ({
        currentIndex
      })
      this.triggerEvent('menuclick', { currentIndex }, {})
    }
  }
})

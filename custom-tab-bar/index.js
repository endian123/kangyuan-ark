Component({
  data: {
    selected: 0,
    list: [
      { pagePath: '/pages/service/service', text: '服务' },
      { pagePath: '/pages/mine/mine', text: '我的' }
    ]
  },
  methods: {
    switchTab(e) {
      const { index, path } = e.currentTarget.dataset
      wx.switchTab({ url: path })
      this.setData({ selected: index })
    }
  }
})

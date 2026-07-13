Page({
  data: {
    timeSlots: [
      { id: 1, label: '上午 08:00-12:00', enabled: true },
      { id: 2, label: '下午 14:00-18:00', enabled: true },
      { id: 3, label: '晚间 19:00-21:00', enabled: false }
    ],
    weekdays: [
      { id: 1, label: '周一', selected: true },
      { id: 2, label: '周二', selected: true },
      { id: 3, label: '周三', selected: true },
      { id: 4, label: '周四', selected: true },
      { id: 5, label: '周五', selected: true },
      { id: 6, label: '周六', selected: false },
      { id: 7, label: '周日', selected: false }
    ],
    remark: ''
  },

  goBack() {
    wx.navigateBack()
  },

  toggleTime(e) {
    const { id } = e.currentTarget.dataset
    const timeSlots = this.data.timeSlots.map(t => {
      if (t.id === id) t.enabled = !t.enabled
      return t
    })
    this.setData({ timeSlots })
  },

  toggleDay(e) {
    const { id } = e.currentTarget.dataset
    const weekdays = this.data.weekdays.map(d => {
      if (d.id === id) d.selected = !d.selected
      return d
    })
    this.setData({ weekdays })
  },

  onRemarkInput(e) {
    this.setData({ remark: e.detail.value })
  },

  saveSetting() {
    wx.showLoading({ title: '保存中...' })
    setTimeout(() => {
      wx.hideLoading()
      wx.showToast({ title: '保存成功', icon: 'success' })
      setTimeout(() => wx.navigateBack(), 1500)
    }, 1000)
  }
})
Page({
  data: {
    user: {
      avatar: '',
      name: '王陪护',
      phone: '138****8888',
      status: 'unsettled' // unsettled / auditing / settled / rejected
    }
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 1 })
    }
  },

  goSettleIn() {
    wx.navigateTo({ url: '/pages/settlein/settlein' })
  },

  goVolumeDetail() {
    wx.showToast({ title: '服务单量详情', icon: 'none' })
  },

  goSettings() {
    wx.navigateTo({ url: '/pages/settings/settings' })
  },

  goServiceTime() {
    wx.navigateTo({ url: '/pages/servicetime/servicetime' })
  },

  goSmsList() {
    wx.navigateTo({ url: '/pages/smslist/smslist' })
  },

  showPrivacy() {
    wx.showModal({
      title: '隐私协议',
      content: '本协议说明我们如何收集、使用和保护您的个人信息。您在使用本服务时，我们会严格遵循相关法律法规，仅收集提供服务所必需的信息。',
      showCancel: false,
      confirmText: '我知道了'
    })
  },

  contactService() {
    wx.makePhoneCall({ phoneNumber: '4001234567' })
  }
})
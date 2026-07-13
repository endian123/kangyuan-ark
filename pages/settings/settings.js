Page({
  data: {
    userStatus: 'unsettled'
  },

  onShow() {
    // 实际项目中应从全局或本地存储读取状态
    this.setData({ userStatus: getApp().globalData.userStatus || 'unsettled' })
  },

  showPrivacy() {
    wx.showModal({
      title: '隐私协议',
      content: '本协议说明我们如何收集、使用和保护您的个人信息。您在使用本服务时，我们会严格遵循相关法律法规，仅收集提供服务所必需的信息。',
      showCancel: false,
      confirmText: '我知道了'
    })
  },

  signContract() {
    if (this.data.userStatus !== 'auditing' && this.data.userStatus !== 'settled') {
      wx.showToast({ title: '请先通过入驻审核', icon: 'none' })
      return
    }
    wx.navigateTo({ url: '/pages/signcontract/signcontract' })
  },

  contactService() {
    wx.makePhoneCall({ phoneNumber: '4001234567' })
  }
})

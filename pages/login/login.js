Page({
  data: {
    agreed: false,
    showPhoneModal: false,
    phone: '',
    code: '',
    codeSent: false,
    countdown: 0,
    canSubmit: false
  },

  onAgreeChange() {
    this.setData({ agreed: !this.data.agreed })
  },

  showPrivacy() {
    wx.showModal({
      title: '用户协议与隐私政策',
      content: '我们重视用户隐私保护，仅收集必要信息用于提供服务。您的个人信息将严格保密，不会泄露给第三方。',
      showCancel: false,
      confirmText: '我知道了'
    })
  },

  // 微信一键授权
  onGetPhoneNumber(e) {
    if (!this.data.agreed) {
      wx.showToast({ title: '请先同意协议', icon: 'none' })
      return
    }
    if (e.detail.errMsg === 'getPhoneNumber:ok') {
      // 模拟获取手机号成功
      wx.showLoading({ title: '登录中...' })
      setTimeout(() => {
        wx.hideLoading()
        wx.setStorageSync('isLoggedIn', true)
        wx.setStorageSync('userPhone', '138****8888')
        wx.switchTab({ url: '/pages/service/service' })
      }, 1500)
    } else {
      wx.showToast({ title: '授权失败', icon: 'none' })
    }
  },

  // 手机号登录
  onManualLogin() {
    if (!this.data.agreed) {
      wx.showToast({ title: '请先同意协议', icon: 'none' })
      return
    }
    this.setData({ showPhoneModal: true })
  },

  closePhoneModal() {
    this.setData({ showPhoneModal: false })
  },

  onPhoneInput(e) {
    const phone = e.detail.value
    this.setData({ phone, canSubmit: phone.length === 11 && this.data.code.length >= 4 })
  },

  onCodeInput(e) {
    const code = e.detail.value
    this.setData({ code, canSubmit: this.data.phone.length === 11 && code.length >= 4 })
  },

  getVerifyCode() {
    if (this.data.codeSent && this.data.countdown > 0) return
    if (this.data.phone.length !== 11) {
      wx.showToast({ title: '请输入正确手机号', icon: 'none' })
      return
    }
    // 模拟发送验证码
    wx.showToast({ title: '验证码已发送', icon: 'success' })
    this.setData({ codeSent: true, countdown: 60 })
    const timer = setInterval(() => {
      if (this.data.countdown <= 0) {
        clearInterval(timer)
        this.setData({ codeSent: false })
      } else {
        this.setData({ countdown: this.data.countdown - 1 })
      }
    }, 1000)
  },

  submitPhoneLogin() {
    if (!this.data.canSubmit) return
    wx.showLoading({ title: '登录中...' })
    setTimeout(() => {
      wx.hideLoading()
      wx.setStorageSync('isLoggedIn', true)
      wx.setStorageSync('userPhone', this.data.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2'))
      wx.switchTab({ url: '/pages/service/service' })
    }, 1500)
  }
})
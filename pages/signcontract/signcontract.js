Page({
  data: {
    signImage: '',
    ctx: null,
    canvasWidth: 0,
    canvasHeight: 0,
    submitting: false
  },

  onReady() {
    const query = wx.createSelectorQuery()
    query.select('#contractSignCanvas').boundingClientRect()
    query.exec((res) => {
      if (res[0]) {
        this.setData({
          canvasWidth: res[0].width,
          canvasHeight: res[0].height
        })
        const ctx = wx.createCanvasContext('contractSignCanvas', this)
        ctx.setStrokeStyle('#333')
        ctx.setLineWidth(3)
        ctx.setLineCap('round')
        ctx.setLineJoin('round')
        this.setData({ ctx })
      }
    })
  },

  touchStart(e) {
    const { ctx } = this.data
    const { x, y } = e.touches[0]
    ctx.moveTo(x, y)
  },

  touchMove(e) {
    const { ctx } = this.data
    const { x, y } = e.touches[0]
    ctx.lineTo(x, y)
    ctx.stroke()
    ctx.draw(true)
    ctx.moveTo(x, y)
  },

  clearSign() {
    const { ctx } = this.data
    const { canvasWidth, canvasHeight } = this.data
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)
    ctx.draw()
    this.setData({ signImage: '' })
  },

  saveSign() {
    wx.canvasToTempFilePath({
      canvasId: 'contractSignCanvas',
      success: (res) => {
        this.setData({ signImage: res.tempFilePath })
        wx.showToast({ title: '签名已保存', icon: 'success' })
      }
    }, this)
  },

  submitSign() {
    if (!this.data.signImage) {
      wx.showToast({ title: '请先进行签名', icon: 'none' })
      return
    }
    this.setData({ submitting: true })
    setTimeout(() => {
      this.setData({ submitting: false })
      getApp().globalData.userStatus = 'settled'
      wx.showModal({
        title: '签署成功',
        content: '您已成功签署《康元方舟陪诊师入驻电子协议》，正式开通接单权限。',
        showCancel: false,
        success: () => {
          wx.navigateBack({ delta: 2 })
        }
      })
    }, 1200)
  }
})

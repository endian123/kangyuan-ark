Page({
  data: {
    orderId: '',
    form: {
      status: 'completed',
      expert: '',
      disease: '',
      doctorAdvice: '',
      exam: '',
      medicine: '',
      remark: '',
      voucher: '',
      signature: ''
    },
    ctx: null,
    canvasWidth: 0,
    canvasHeight: 0,
    submitting: false
  },

  onLoad(options) {
    this.setData({ orderId: options.id || '' })
  },

  onReady() {
    const query = wx.createSelectorQuery()
    query.select('#signCanvas').boundingClientRect()
    query.exec((res) => {
      if (res[0]) {
        this.setData({
          canvasWidth: res[0].width,
          canvasHeight: res[0].height
        })
        const ctx = wx.createCanvasContext('signCanvas', this)
        ctx.setStrokeStyle('#333')
        ctx.setLineWidth(3)
        ctx.setLineCap('round')
        ctx.setLineJoin('round')
        this.setData({ ctx })
      }
    })
  },

  onInput(e) {
    const { field } = e.currentTarget.dataset
    this.setData({ [`form.${field}`]: e.detail.value })
  },

  chooseImage() {
    wx.chooseImage({
      count: 1,
      success: (res) => {
        this.setData({ 'form.voucher': res.tempFilePaths[0] })
      }
    })
  },

  previewVoucher() {
    if (!this.data.form.voucher) return
    wx.previewImage({ urls: [this.data.form.voucher] })
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
    const { ctx, canvasWidth, canvasHeight } = this.data
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)
    ctx.draw()
    this.setData({ 'form.signature': '' })
  },

  saveSign() {
    wx.canvasToTempFilePath({
      canvasId: 'signCanvas',
      success: (res) => {
        this.setData({ 'form.signature': res.tempFilePath })
        wx.showToast({ title: '签名已保存', icon: 'success' })
      }
    }, this)
  },

  submit() {
    const { form } = this.data
    if (!form.disease || !form.doctorAdvice) {
      wx.showToast({ title: '请填写疾病名称和医生建议', icon: 'none' })
      return
    }
    if (!form.signature) {
      wx.showToast({ title: '请进行用户签名', icon: 'none' })
      return
    }

    this.setData({ submitting: true })
    setTimeout(() => {
      this.setData({ submitting: false })
      wx.showModal({
        title: '回填提交成功',
        content: '工单信息已保存，可继续结束服务。',
        showCancel: false,
        success: () => {
          wx.navigateBack()
        }
      })
    }, 1200)
  }
})

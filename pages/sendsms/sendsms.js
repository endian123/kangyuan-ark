Page({
  data: {
    order: {
      patient: '张阿姨',
      phone: '138****1234'
    },
    templates: [
      { id: 1, name: '预约提醒', preview: '您好，您的陪诊服务已预约成功，请准时到达。', content: '您好，您的陪诊服务已预约成功，就诊时间：{date}，地点：{hospital}，请准时到达。如有疑问请联系陪诊师。' },
      { id: 2, name: '服务进行中', preview: '您的陪诊服务正在进行中，如有问题请联系陪诊师。', content: '您的陪诊服务正在进行中，陪诊师将全程陪同您完成就诊。如有任何问题，请随时联系陪诊师。' },
      { id: 3, name: '服务完成', preview: '您的陪诊服务已完成，感谢您的信任与支持。', content: '您的陪诊服务已完成，感谢您的信任与支持。祝您早日康复，如有后续需求欢迎再次联系我们。' },
      { id: 4, name: '自定义模板', preview: '点击编辑自定义短信内容', content: '' }
    ],
    selectedTemplate: 1,
    smsContent: '',
    sending: false
  },

  onLoad(options) {
    if (options.order) {
      try {
        const order = JSON.parse(decodeURIComponent(options.order))
        this.setData({ order })
      } catch (e) {}
    }
    // 初始化默认模板内容
    this.initContent()
  },

  initContent() {
    const { templates, selectedTemplate } = this.data
    const tpl = templates.find(t => t.id === selectedTemplate)
    if (tpl && tpl.content) {
      this.setData({ smsContent: tpl.content })
    }
  },

  goBack() {
    wx.navigateBack()
  },

  selectTemplate(e) {
    const id = e.currentTarget.dataset.id
    const { templates } = this.data
    const tpl = templates.find(t => t.id === id)

    this.setData({
      selectedTemplate: id,
      smsContent: tpl ? tpl.content : ''
    })
  },

  onContentInput(e) {
    this.setData({ smsContent: e.detail.value })
  },

  sendSms() {
    const { smsContent, sending, order } = this.data
    if (!smsContent || sending) return

    this.setData({ sending: true })
    setTimeout(() => {
      this.setData({ sending: false })
      wx.showModal({
        title: '发送成功',
        content: `短信已发送至 ${order.phone}`,
        showCancel: false,
        success: () => {
          wx.navigateBack()
        }
      })
    }, 1500)
  }
})
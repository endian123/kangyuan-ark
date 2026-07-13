Page({
  data: {
    currentTab: 0,
    smsList: [
      { id: 1, patient: '张阿姨', phone: '138****1234', content: '您好，您的陪诊服务已预约成功，将于明天上午08:30在协和医院心内科就诊，请准时到达。', time: '2026-07-10 14:30', status: 'sent' },
      { id: 2, patient: '李大爷', phone: '139****5678', content: '温馨提示：您明天的陪诊服务将在协和医院骨科进行，陪诊师已就位，联系电话138****8888。', time: '2026-07-10 12:00', status: 'sent' },
      { id: 3, patient: '王先生', phone: '137****9012', content: '您的检查陪诊服务已完成，检查报告将在3个工作日内出具，请留意短信通知。', time: '2026-07-09 16:00', status: 'sending' }
    ],
    filteredSms: []
  },

  onLoad() {
    this.filterSms()
  },

  goBack() {
    wx.navigateBack()
  },

  switchTab(e) {
    const idx = e.currentTarget.dataset.idx
    this.setData({ currentTab: idx })
    this.filterSms()
  },

  filterSms() {
    const { currentTab, smsList } = this.data
    let filtered = smsList
    if (currentTab === 1) {
      filtered = smsList.filter(s => s.status === 'sent')
    } else if (currentTab === 2) {
      filtered = smsList.filter(s => s.status === 'sending')
    }
    this.setData({ filteredSms: filtered })
  }
})
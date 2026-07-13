const app = getApp()

Page({
  data: {
    tabs: ['待服务', '服务中', '服务完成', '全部'],
    activeTab: 0,
    orders: [],
    showSignModal: false,
    signType: 'start',
    currentOrder: null,
    location: null,
    signLoading: false,
    modalMsg: '',
    showSmsModal: false,
    smsOrder: null,
    smsTemplate: 1
  },

  onLoad() {
    this.loadOrders()
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 0 })
    }
  },

  loadOrders() {
    const list = [
      {
        id: 'WO20260710001',
        status: 'wait',
        statusText: '待服务',
        tagClass: 'tag-wait',
        patient: '张阿姨',
        phone: '138****1234',
        hospital: '协和医院',
        dept: '心内科',
        date: '2026-07-10 08:30',
        service: '全程陪诊',
        price: '¥280',
        age: 62,
        gender: '女',
        address: '北京市东城区帅府园1号',
        remark: '需轮椅协助，请提前30分钟到达',
        createTime: '2026-07-09 18:30'
      },
      {
        id: 'WO20260710002',
        status: 'running',
        statusText: '服务中',
        tagClass: 'tag-running',
        patient: '李大爷',
        phone: '139****5678',
        hospital: '协和医院',
        dept: '骨科',
        date: '2026-07-10 09:00',
        service: '取药陪诊',
        price: '¥180',
        age: 71,
        gender: '男',
        address: '北京市东城区帅府园1号',
        remark: '已取号，骨科门诊3楼',
        createTime: '2026-07-09 20:00'
      },
      {
        id: 'WO20260710003',
        status: 'done',
        statusText: '服务完成',
        tagClass: 'tag-done',
        patient: '王先生',
        phone: '137****9012',
        hospital: '同仁医院',
        dept: '眼科',
        date: '2026-07-09 14:00',
        service: '检查陪诊',
        price: '¥220',
        age: 45,
        gender: '男',
        address: '北京市东城区东交民巷1号',
        remark: '眼底检查已完成',
        exam: '眼底照相、OCT',
        medicine: '玻璃酸钠滴眼液',
        createTime: '2026-07-08 10:00'
      }
    ]
    this.setData({ orders: list })
  },

  switchTab(e) {
    this.setData({ activeTab: Number(e.currentTarget.dataset.index) })
  },

  filteredOrders() {
    const { activeTab, orders } = this.data
    const map = ['wait', 'running', 'done']
    if (activeTab === 3) return orders
    return orders.filter(o => o.status === map[activeTab])
  },

  callPhone(e) {
    const phone = e.currentTarget.dataset.phone
    wx.makePhoneCall({ phoneNumber: phone.replace(/\*+/g, '') || '10086' })
  },

  viewDetail(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({ url: `/pages/orderdetail/orderdetail?id=${id}` })
  },

  openSignModal(e) {
    const { type, id } = e.currentTarget.dataset
    const order = this.data.orders.find(o => o.id === id)
    this.setData({
      showSignModal: true,
      signType: type,
      currentOrder: order,
      modalMsg: '',
      location: null
    })
  },

  closeSignModal() {
    this.setData({ showSignModal: false, signLoading: false })
  },

  getLocationAndSign() {
    this.setData({ signLoading: true, modalMsg: '正在获取定位...' })
    const hospital = app.globalData.hospital

    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        const { latitude, longitude } = res
        const distance = this.getDistance(latitude, longitude, hospital.lat, hospital.lng)
        const inRange = distance <= 500
        const action = this.data.signType === 'start' ? '签到成功' : '结束服务签到成功'

        if (inRange) {
          this.setData({
            modalMsg: `定位匹配成功，距离 ${Math.round(distance)} 米，${action}`,
            location: { latitude, longitude, distance }
          })
          setTimeout(() => {
            this.closeSignModal()
            if (this.data.signType === 'start') {
              wx.showToast({ title: '已开始服务', icon: 'success' })
            } else {
              wx.showToast({ title: '服务已结束', icon: 'success' })
            }
          }, 1200)
        } else {
          this.setData({
            modalMsg: `当前距离 ${hospital.name} 约 ${Math.round(distance)} 米，超出签到范围，请到达医院后再试。`,
            signLoading: false,
            location: { latitude, longitude, distance }
          })
        }
      },
      fail: () => {
        this.setData({
          modalMsg: '定位获取失败，请检查定位权限。',
          signLoading: false
        })
      }
    })
  },

  getDistance(lat1, lng1, lat2, lng2) {
    const rad = d => d * Math.PI / 180
    const R = 6371000
    const dLat = rad(lat2 - lat1)
    const dLng = rad(lng2 - lng1)
    const a = Math.sin(dLat / 2) ** 2 +
      Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLng / 2) ** 2
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  },

  goFill(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({ url: `/pages/fillorder/fillorder?id=${id}` })
  },

  // 发送短信 - 跳转到发送短信页面
  goSendSms(e) {
    const item = e.currentTarget.dataset.item
    wx.navigateTo({
      url: `/pages/sendsms/sendsms?order=${encodeURIComponent(JSON.stringify(item))}`
    })
  },

  // 保留弹窗方式（兼容）
  openSmsModal(e) {
    const item = e.currentTarget.dataset.item
    this.setData({
      showSmsModal: true,
      smsOrder: item,
      smsTemplate: 1
    })
  },

  closeSmsModal() {
    this.setData({ showSmsModal: false })
  },

  selectTemplate(e) {
    const id = e.currentTarget.dataset.id
    this.setData({ smsTemplate: id })
  },

  sendSms() {
    const { smsOrder, smsTemplate } = this.data
    wx.showLoading({ title: '发送中...' })
    setTimeout(() => {
      wx.hideLoading()
      wx.showToast({ title: '发送成功', icon: 'success' })
      this.closeSmsModal()
    }, 1000)
  }
})
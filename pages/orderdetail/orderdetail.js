Page({
  data: {
    order: null
  },

  onLoad(options) {
    const id = options.id || ''
    this.loadOrderDetail(id)
  },

  loadOrderDetail(id) {
    const orders = [
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
    const order = orders.find(o => o.id === id)
    this.setData({ order })
  },

  callPhone() {
    const phone = this.data.order.phone
    wx.makePhoneCall({ phoneNumber: phone.replace(/\*+/g, '') || '10086' })
  },

  goFill() {
    wx.navigateTo({ url: `/pages/fillorder/fillorder?id=${this.data.order.id}` })
  },

  openSign() {
    wx.showModal({
      title: '开始服务签到',
      content: `目标医院：${this.data.order.hospital}。请确认已到达医院附近（500米内）。`,
      success: (res) => {
        if (res.confirm) {
          wx.showToast({ title: '签到成功', icon: 'success' })
        }
      }
    })
  }
})

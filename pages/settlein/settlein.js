Page({
  data: {
    form: {
      name: '',
      phone: '',
      gender: '1',
      birth: '',
      idCard: '',
      city: '',
      availableTime: '',
      idCardFront: '',
      idCardBack: '',
      agreed: false
    },
    preferHospitals: [],
    eduCerts: [{ date: '', image: '' }],
    qualCerts: [{ date: '', image: '' }],
    idCardRecognizing: false,
    idCardRecognized: false,
    showHospitalPicker: false,
    hospitals: [
      { id: 1, name: '协和医院', address: '北京市东城区帅府园1号' },
      { id: 2, name: '同仁医院', address: '北京市东城区东交民巷1号' },
      { id: 3, name: '北京医院', address: '北京市东城区东单大华路1号' },
      { id: 4, name: '北大人民医院', address: '北京市西城区西直门南大街11号' },
      { id: 5, name: '北大第一医院', address: '北京市西城区西什库大街8号' },
      { id: 6, name: '朝阳医院', address: '北京市朝阳区工人体育场南路8号' },
      { id: 7, name: '天坛医院', address: '北京市丰台区南四环西路119号' },
      { id: 8, name: '安贞医院', address: '北京市朝阳区安贞路2号' }
    ],
    submitting: false
  },

  onInput(e) {
    const { field } = e.currentTarget.dataset
    this.setData({ [`form.${field}`]: e.detail.value })
  },

  onGenderChange(e) {
    this.setData({ 'form.gender': e.detail.value })
  },

  onAgreeChange() {
    this.setData({ 'form.agreed': !this.data.form.agreed })
  },

  getPhone() {
    wx.showToast({ title: '已获取微信授权手机号', icon: 'none' })
    this.setData({ 'form.phone': '138****8888' })
  },

  chooseImage(e) {
    const { field } = e.currentTarget.dataset
    wx.chooseImage({
      count: 1,
      success: (res) => {
        this.setData({ [`form.${field}`]: res.tempFilePaths[0] })
        if (field === 'idCardFront') {
          this.recognizeIdCard()
        }
      }
    })
  },

  recognizeIdCard() {
    this.setData({ idCardRecognizing: true, idCardRecognized: false })
    setTimeout(() => {
      this.setData({
        'form.name': '张陪护',
        'form.gender': '1',
        'form.birth': '1990-05',
        'form.idCard': '110101199005152345',
        idCardRecognizing: false,
        idCardRecognized: true
      })
      wx.showToast({ title: '身份证信息已识别', icon: 'success' })
    }, 1500)
  },

  previewImage(e) {
    const { url } = e.currentTarget.dataset
    if (!url) return
    wx.previewImage({ urls: [url] })
  },

  // 偏好医院
  openHospitalPicker() {
    this.setData({ showHospitalPicker: true })
  },

  closeHospitalPicker() {
    this.setData({ showHospitalPicker: false })
  },

  toggleHospital(e) {
    const { id } = e.currentTarget.dataset
    const hospitals = this.data.hospitals
    const hospital = hospitals.find(h => h.id === id)
    let preferHospitals = this.data.preferHospitals.slice()
    const index = preferHospitals.findIndex(h => h.id === id)
    if (index > -1) {
      preferHospitals.splice(index, 1)
    } else {
      preferHospitals.push(hospital)
    }
    this.setData({ preferHospitals })
  },

  removeHospital(e) {
    const { id } = e.currentTarget.dataset
    const preferHospitals = this.data.preferHospitals.filter(h => h.id !== id)
    this.setData({ preferHospitals })
  },

  // 学历证书
  addEduCert() {
    const certs = this.data.eduCerts
    certs.push({ date: '', image: '' })
    this.setData({ eduCerts: certs })
  },

  removeEduCert(e) {
    const { index } = e.currentTarget.dataset
    const certs = this.data.eduCerts
    certs.splice(index, 1)
    this.setData({ eduCerts: certs })
  },

  // 资质证书
  addQualCert() {
    const certs = this.data.qualCerts
    certs.push({ date: '', image: '' })
    this.setData({ qualCerts: certs })
  },

  removeQualCert(e) {
    const { index } = e.currentTarget.dataset
    const certs = this.data.qualCerts
    certs.splice(index, 1)
    this.setData({ qualCerts: certs })
  },

  onCertDateChange(e) {
    const { index, type } = e.currentTarget.dataset
    const val = e.detail.value
    if (type === 'edu') {
      const certs = this.data.eduCerts
      certs[index].date = val
      this.setData({ eduCerts: certs })
    } else {
      const certs = this.data.qualCerts
      certs[index].date = val
      this.setData({ qualCerts: certs })
    }
  },

  chooseCertImage(e) {
    const { index, type } = e.currentTarget.dataset
    wx.chooseImage({
      count: 1,
      success: (res) => {
        if (type === 'edu') {
          const certs = this.data.eduCerts
          certs[index].image = res.tempFilePaths[0]
          this.setData({ eduCerts: certs })
        } else {
          const certs = this.data.qualCerts
          certs[index].image = res.tempFilePaths[0]
          this.setData({ qualCerts: certs })
        }
      }
    })
  },

  submit() {
    const { form, eduCerts, qualCerts, preferHospitals } = this.data
    if (!form.name || !form.phone || !form.idCard || !form.city || !form.availableTime) {
      wx.showToast({ title: '请完善必填信息', icon: 'none' })
      return
    }
    if (!form.idCardFront || !form.idCardBack) {
      wx.showToast({ title: '请上传身份证正反面', icon: 'none' })
      return
    }
    if (!form.agreed) {
      wx.showToast({ title: '请同意入驻协议与隐私条款', icon: 'none' })
      return
    }

    this.setData({ submitting: true })
    setTimeout(() => {
      this.setData({ submitting: false })
      getApp().globalData.userStatus = 'auditing'
      wx.showModal({
        title: '提交成功',
        content: '您的入驻申请已提交，工作人员将在 1-3 个工作日内完成审核。',
        showCancel: false,
        success: () => {
          wx.navigateBack()
        }
      })
    }, 1200)
  }
})
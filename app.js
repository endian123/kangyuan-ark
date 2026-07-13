App({
  onLaunch() {
    console.log('康元方舟陪同端小程序启动')
  },
  globalData: {
    userInfo: null,
    hospital: {
      name: '协和医院',
      lat: 39.9105,
      lng: 116.4134
    }
  }
})

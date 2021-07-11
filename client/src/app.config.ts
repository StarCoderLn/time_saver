export default {
  pages: [
    'pages/home/index',
    'pages/WeRun/index',
    'pages/WeLocate/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#178fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'white'
  },
  cloud: true,
  permission: {
    'scope.userLocation': {
      'desc': '获取你的位置信息将用于导航'
    }
  }
}

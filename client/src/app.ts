import React, { Component } from 'react'
import Taro, { Config } from '@tarojs/taro'

import "./app.scss"

class App extends Component {

  componentDidMount () {
    if (process.env.TARO_ENV === 'weapp') {
      // 调用云函数需要在这里配置对应的环境 ID
      Taro.cloud.init({
        env: 'miniprogram-1-0gnl3gry4e088f22'
      })
    }
  }

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // this.props.children 是将要会渲染的页面
  render () {
    return this.props.children
  }
}

export default App

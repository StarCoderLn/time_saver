import Taro from '@tarojs/taro';

import { useEffect } from 'react';

export default function Index() {
  Taro.showLoading({
    title: '加载中...',
    mask: true,
  });

  useEffect(() => {
    // 获取当前地理位置
    Taro.getLocation({
      type: "gcj02",
      success: res => {
        Taro.hideLoading();
        const latitude = res.latitude;
        const longitude = res.longitude;
        // 选择地理位置
        Taro.chooseLocation({
          latitude,
          longitude,
          success: res => {
            // 打开所选择的地理位置
            Taro.openLocation({
              latitude,
              longitude,
              name: res.name,
              address: res.address,
            })
          }
        }).catch(() => {
          Taro.navigateBack();
        })
      }
    })
  })

  return null;
}
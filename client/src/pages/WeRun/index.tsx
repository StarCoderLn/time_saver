import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';
import { useState, useEffect } from 'react';

import { AtList, AtListItem, AtCard } from 'taro-ui';

import { formatDate } from '@/utils/date';

interface DataType {
  step: string;
  timestamp: number;
  date: string;
}

export default function Index() {
  const [stepList, setStepList] = useState<Array<DataType>>([]);

  Taro.showLoading({
    title: '加载中...',
    mask: true,
  });

  useEffect(() => {
    Taro.getWeRunData({
      success: res => {
        Taro.cloud.callFunction({
          name: 'getWeRun',
          data: {
            werundata: wx.cloud.CloudID(res.cloudID)
          },
          success: async res => {
            const stepInfoList = res?.result?.data?.stepInfoList;
            stepInfoList.map(item => {
              item.date = formatDate(item.timestamp)
            });
            await setStepList(stepInfoList);
            Taro.hideLoading();
          }
        });
      }
    })
  }, stepList);

  return (
    <View>
      {
        stepList.length ? (
          <AtCard
            title='近一个月的微信运动步数如下：'>
            <AtList>
              {
                stepList.map(item => <AtListItem title={`${item.step}步`} extraText={item.date} />)
              }
            </AtList>
          </AtCard>
        ) : ''
      }
    </View>
  )
}
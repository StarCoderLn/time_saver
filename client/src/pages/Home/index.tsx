import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';

import { AtGrid } from 'taro-ui';

import { AtGridItem } from 'taro-ui/types/grid';

import './index.scss';

export default function Index() {
  const dataList: Array<AtGridItem> = [
    {
      iconInfo: {
        value: 'icon icon-runlog',
        color: '#178fff',
        size: 40
      },
      value: '查看步数',
      type: 'run'
    },
    {
      iconInfo: {
        value: 'icon icon-dingwei',
        color: '#178fff',
        size: 40
      },
      value: '查看位置',
      type: 'locate'
    },
  ];

  const handleItemClick = (item: AtGridItem) => {
    const urlMap = {
      'run': '/pages/WeRun/index',
      'locate': '/pages/WeLocate/index'
    };
    void Taro.navigateTo({
      url: urlMap[item.type]
    })
  }

  return (
    <View>
      <AtGrid
        hasBorder={false}
        data={dataList}
        onClick={handleItemClick} />
    </View>
  )
}